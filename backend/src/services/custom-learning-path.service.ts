import { prisma } from "../infrastructure/prisma";
import { CustomPathInput } from "../schemas/custom-path.schema";

interface GeneratedModule {
  moduleId: string;
  title: string;
  orderIndex: number;
  durationDays: number;
  concepts: string[];
  isNew: boolean;
}

export interface GeneratedPath {
  title: string;
  description: string;
  estimatedMonths: number;
  weeklyHours: number;
  totalModules: number;
  skippedModules: number;
  modules: GeneratedModule[];
  subjectId: string;
  level: string;
  goal: string;
}

export async function generateCustomPath(cognitoId: string,input: CustomPathInput): Promise<GeneratedPath> {
  const user = await prisma.user.findUniqueOrThrow({
    where: { cognitoId },
    select: { id: true },
  });

  const subject = await prisma.subject.findUniqueOrThrow({
    where: { slug: input.subjectSlug },
  });

  // Obtener todos los módulos disponibles para esta tecnología
  const pathTemplate = await prisma.pathTemplate.findFirst({
    where: {
      subjectId: subject.id,
      level: mapObjectiveToLevel(input.currentLevel),
    },
    include: {
      modules: {
        orderBy: { orderIndex: "asc" },
        include: {
          concepts: {
            include: {
              concept: true,
            },
          },
        },
      },
    },
  });

  // Si no hay template para ese nivel exacto, buscar el más cercano
  const allTemplates = await prisma.pathTemplate.findMany({
    where: { subjectId: subject.id },
    include: {
      modules: {
        orderBy: { orderIndex: "asc" },
        include: {
          concepts: {
            include: {
              concept: true,
            },
          },
        },
      },
    },
  });

  const template = pathTemplate ?? allTemplates[0];
  if (!template) throw new Error("NO_TEMPLATE_FOUND");

  // Obtener conceptos que el usuario ya domina
  const masteredConceptSlugs = new Set(input.masteredConcepts ?? []);

  // Filtrar y seleccionar módulos según el perfil
  const selectedModules: GeneratedModule[] = [];
  let skippedCount = 0;
  let orderIndex = 1;

  for (const module of template.modules) {
    const moduleConcepts = module.concepts.map((c) => c.concept);

    // Determinar si el módulo debe incluirse
    const shouldSkip = shouldSkipModule(
      moduleConcepts,
      masteredConceptSlugs,
      input.currentLevel,
      input.objective
    );

    if (shouldSkip) {
      skippedCount++;
      continue;
    }

    // Ajustar duración según horas disponibles
    const adjustedDuration = adjustDuration(
      module.durationDays,
      input.weeklyHours
    );

    selectedModules.push({
      moduleId: module.id,
      title: module.title,
      orderIndex: orderIndex++,
      durationDays: adjustedDuration,
      concepts: moduleConcepts.map((c) => c.name),
      isNew: !moduleConcepts.some((c) => masteredConceptSlugs.has(c.slug)),
    });
  }

  // Si el objetivo requiere módulos avanzados de otros templates
  if (
    input.objective === "specialize" ||
    input.objective === "certification"
  ) {
    const advancedTemplates = allTemplates.filter(
      (t) => t.level === "ADVANCED" && t.id !== template.id
    );

    for (const advTemplate of advancedTemplates) {
      for (const module of advTemplate.modules) {
        const moduleConcepts = module.concepts.map((c) => c.concept);
        const isAlreadyIncluded = selectedModules.some(
          (m) => m.moduleId === module.id
        );

        if (!isAlreadyIncluded && moduleConcepts.length > 0) {
          const adjustedDuration = adjustDuration(
            module.durationDays,
            input.weeklyHours
          );

          selectedModules.push({
            moduleId: module.id,
            title: module.title,
            orderIndex: orderIndex++,
            durationDays: adjustedDuration,
            concepts: moduleConcepts.map((c) => c.name),
            isNew: true,
          });
        }
      }
    }
  }

  // Calcular duración total estimada
  const totalDays = selectedModules.reduce((sum, m) => sum + m.durationDays, 0);
  const estimatedMonths = Math.ceil(totalDays / 30);

  return {
    title: buildPathTitle(subject.name, input.currentLevel, input.objective),
    description: buildPathDescription(subject.name, input.objective, skippedCount),
    estimatedMonths,
    weeklyHours: input.weeklyHours,
    totalModules: selectedModules.length,
    skippedModules: skippedCount,
    modules: selectedModules,
    subjectId: subject.id,
    level: mapObjectiveToLevel(input.currentLevel),
    goal: input.objective,
  };
}

export async function confirmCustomPath(cognitoId: string,input: CustomPathInput,generatedPath: GeneratedPath): Promise<string> {
  const user = await prisma.user.findUniqueOrThrow({
    where: { cognitoId },
    select: { id: true },
  });

  const userPath = await prisma.userPath.create({
    data: {
      userId: user.id,
      pathTemplateId: null,
      weeklyHours: input.weeklyHours,
      currentLevel: generatedPath.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
      goal: input.objective,
      status: "ACTIVE",
      isCustom: true,
      customTitle: generatedPath.title,
    },
  });

  await prisma.moduleProgress.createMany({
    data: generatedPath.modules.map((module) => ({
      userPathId: userPath.id,
      moduleId: module.moduleId,
      status: "PENDING" as const,
    })),
  });

  return userPath.id;
}

// ─── Helpers ────────────────────────────────────────────────────

function shouldSkipModule( moduleConcepts: { slug: string; level: string }[], masteredSlugs: Set<string>,currentLevel: string, objective: string): boolean {
  if (moduleConcepts.length === 0) return false;

  // Si el usuario domina TODOS los conceptos del módulo, omitirlo
  const allMastered = moduleConcepts.every((c) => masteredSlugs.has(c.slug));
  if (allMastered) return true;

  // Si el nivel actual es avanzado y el objetivo no es repasar, omitir módulos básicos
  if (currentLevel === "advanced" && objective !== "get_job") {
    const allBasic = moduleConcepts.every((c) => c.level === "BEGINNER");
    if (allBasic) return true;
  }

  return false;
}

function adjustDuration(baseDays: number, weeklyHours: number): number {
  const STANDARD_HOURS = 20;
  const factor = STANDARD_HOURS / weeklyHours;
  return Math.round(baseDays * factor);
}

function mapObjectiveToLevel(currentLevel: string): "BEGINNER" | "INTERMEDIATE" | "ADVANCED" {
  switch (currentLevel) {
    case "none":
    case "beginner":
      return "BEGINNER";
    case "intermediate":
      return "INTERMEDIATE";
    case "advanced":
      return "ADVANCED";
    default:
      return "BEGINNER";
  }
}

function buildPathTitle(
  subjectName: string,
  currentLevel: string,
  objective: string
): string {
  const levelLabel: Record<string, string> = {
    none: "desde Cero",
    beginner: "para Principiantes",
    intermediate: "Nivel Intermedio",
    advanced: "Avanzado",
  };

  const objectiveLabel: Record<string, string> = {
    get_job: "— Enfocado en Empleo",
    personal_project: "— Proyecto Personal",
    certification: "— Preparación para Certificación",
    specialize: "— Especialización",
    improve_job: "",
  };

  return `${subjectName} ${levelLabel[currentLevel] ?? ""} ${objectiveLabel[objective] ?? ""}`.trim();
}

function buildPathDescription(
  subjectName: string,
  objective: string,
  skippedModules: number
): string {
  const base = `Ruta personalizada de ${subjectName}`;
  const skip = skippedModules > 0
    ? ` Omitimos ${skippedModules} módulo(s) que ya dominas.`
    : "";

  const objectiveText: Record<string, string> = {
    get_job: " diseñada para conseguir empleo lo antes posible.",
    personal_project: " enfocada en construir tu proyecto personal.",
    certification: " optimizada para prepararte para la certificación.",
    specialize: " para llevarte a un nivel de especialización profesional.",
    improve_job: " para mejorar tu desempeño en tu trabajo actual.",
  };

  return `${base}${objectiveText[objective] ?? "."}${skip}`;
}