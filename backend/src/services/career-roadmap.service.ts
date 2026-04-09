import { prisma } from "../infrastructure/prisma";
import { GapItem, CareerRecommendation } from "./career-discovery.service";

// ─────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────

export interface RoadmapStepOutput {
  id: string;
  order: number;
  techSlug: string;
  techLabel: string;
  status: "LOCKED" | "AVAILABLE" | "IN_PROGRESS" | "COMPLETED";
  pathTemplate: {
    id: string;
    title: string;
    slug: string;
    level: string;
  } | null;
  userPath: {
    id: string;
    progress: {
      completed: number;
      total: number;
      percentage: number;
    };
  } | null;
}

export interface CareerRoadmapOutput {
  id: string;
  careerSlug: string;
  careerTitle: string;
  status: "ACTIVE" | "COMPLETED" | "ABANDONED";
  steps: RoadmapStepOutput[];
}

export interface CareerRoadmapSummary {
  id: string;
  careerSlug: string;
  careerTitle: string;
  status: "ACTIVE" | "COMPLETED" | "ABANDONED";
  totalSteps: number;
  completedSteps: number;
  createdAt: Date;
}

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

// Normaliza el gapAnalysis que viene del JSON en DB.
// Soporta tanto el formato antiguo (string[]) como el nuevo (GapItem[]).
function normalizeGapAnalysis(raw: unknown): GapItem[] {
  if (!Array.isArray(raw)) return [];

  if (raw.length === 0) return [];

  // Formato nuevo: { slug, label }
  if (typeof raw[0] === "object" && raw[0] !== null && "slug" in raw[0]) {
    return raw as GapItem[];
  }

  // Formato antiguo: string[] — construir GapItem con slug === label
  // El roadmap mostrará el string tal cual sin poder hacer matching con PathTemplate
  return (raw as string[]).map((label) => ({ slug: label, label }));
}

// Construye el output de un step a partir del registro de DB
async function buildStepOutput(step: {
  id: string;
  order: number;
  techSlug: string;
  techLabel: string;
  status: string;
  pathTemplate: {
    id: string;
    title: string;
    slug: string;
    level: string;
  } | null;
  userPath: {
    id: string;
    moduleProgress: { status: string }[];
  } | null;
}): Promise<RoadmapStepOutput> {
  let userPathOutput: RoadmapStepOutput["userPath"] = null;

  if (step.userPath) {
    const total = step.userPath.moduleProgress.length;
    const completed = step.userPath.moduleProgress.filter(
      (m) => m.status === "COMPLETED"
    ).length;
    userPathOutput = {
      id: step.userPath.id,
      progress: {
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      },
    };
  }

  return {
    id: step.id,
    order: step.order,
    techSlug: step.techSlug,
    techLabel: step.techLabel,
    status: step.status as RoadmapStepOutput["status"],
    pathTemplate: step.pathTemplate,
    userPath: userPathOutput,
  };
}

// ─────────────────────────────────────────
// CREAR ROADMAP
// ─────────────────────────────────────────

export async function createCareerRoadmap(
  cognitoId: string,
  careerRecommendationId: string,
  careerIndex: number
): Promise<CareerRoadmapOutput> {
  // 1. Resolver usuario
  const user = await prisma.user.findUniqueOrThrow({
    where: { cognitoId },
    select: { id: true },
  });

  // 2. Buscar la recomendación y validar que pertenece al usuario
  const recommendation = await prisma.careerRecommendation.findFirst({
    where: { id: careerRecommendationId, userId: user.id },
  });

  if (!recommendation) {
    throw new Error("Recomendación no encontrada o no pertenece al usuario");
  }

  // 3. Extraer la recomendación elegida del JSON
  const recommendations = recommendation.recommendations as unknown as CareerRecommendation[];

  if (careerIndex < 0 || careerIndex >= recommendations.length) {
    throw new Error("Índice de carrera inválido");
  }

  const chosen = recommendations[careerIndex];

  // 4. Verificar que no existe ya un roadmap ACTIVE para esa carrera
  const existing = await prisma.careerRoadmap.findFirst({
    where: {
      userId: user.id,
      careerSlug: chosen.career,
      status: "ACTIVE",
    },
    include: {
      steps: {
        orderBy: { order: "asc" },
        include: {
          pathTemplate: {
            select: { id: true, title: true, slug: true, level: true },
          },
          userPath: {
            select: {
              id: true,
              moduleProgress: { select: { status: true } },
            },
          },
        },
      },
    },
  });

  if (existing) {
    const steps = await Promise.all(existing.steps.map(buildStepOutput));
    return {
      id: existing.id,
      careerSlug: existing.careerSlug,
      careerTitle: existing.careerTitle,
      status: existing.status as CareerRoadmapOutput["status"],
      steps,
    };
  }

  // 5. Normalizar gapAnalysis (soporta formato antiguo y nuevo)
  const gapItems = normalizeGapAnalysis(chosen.gapAnalysis);

  if (gapItems.length === 0) {
    throw new Error("Esta carrera no tiene tecnologías pendientes por aprender");
  }

  // 6. Buscar PathTemplates que coincidan con los slugs del gap
  const subjects = await prisma.subject.findMany({
    where: { slug: { in: gapItems.map((g) => g.slug) } },
    select: {
      slug: true,
      pathTemplates: {
        where: { isActive: true },
        select: { id: true, title: true, slug: true, level: true },
        orderBy: { level: "asc" }, // BEGINNER primero
        take: 1, // la más básica disponible
      },
    },
  });

  // Mapa slug → pathTemplate
  const templateBySlug = new Map<string, { id: string; title: string; slug: string; level: string }>();
  for (const subject of subjects) {
    if (subject.pathTemplates.length > 0) {
      templateBySlug.set(subject.slug, subject.pathTemplates[0]);
    }
  }

  // 7. Crear roadmap con sus steps en una transacción
  const roadmap = await prisma.careerRoadmap.create({
    data: {
      userId: user.id,
      careerSlug: chosen.career,
      careerTitle: chosen.title,
      careerRecommendationId: recommendation.id,
      status: "ACTIVE",
      steps: {
        create: gapItems.map((gap, index) => {
          const template = templateBySlug.get(gap.slug);
          return {
            techSlug: gap.slug,
            techLabel: gap.label,
            order: index + 1,
            // Primer step disponible, resto bloqueados
            status: index === 0 ? "AVAILABLE" : "LOCKED",
            pathTemplateId: template?.id ?? null,
          };
        }),
      },
    },
    include: {
      steps: {
        orderBy: { order: "asc" },
        include: {
          pathTemplate: {
            select: { id: true, title: true, slug: true, level: true },
          },
          userPath: {
            select: {
              id: true,
              moduleProgress: { select: { status: true } },
            },
          },
        },
      },
    },
  });

  const steps = await Promise.all(roadmap.steps.map(buildStepOutput));

  return {
    id: roadmap.id,
    careerSlug: roadmap.careerSlug,
    careerTitle: roadmap.careerTitle,
    status: roadmap.status as CareerRoadmapOutput["status"],
    steps,
  };
}

// ─────────────────────────────────────────
// OBTENER ROADMAP POR ID
// ─────────────────────────────────────────

export async function getCareerRoadmap(
  cognitoId: string,
  roadmapId: string
): Promise<CareerRoadmapOutput> {
  const user = await prisma.user.findUniqueOrThrow({
    where: { cognitoId },
    select: { id: true },
  });

  const roadmap = await prisma.careerRoadmap.findFirst({
    where: { id: roadmapId, userId: user.id },
    include: {
      steps: {
        orderBy: { order: "asc" },
        include: {
          pathTemplate: {
            select: { id: true, title: true, slug: true, level: true },
          },
          userPath: {
            select: {
              id: true,
              moduleProgress: { select: { status: true } },
            },
          },
        },
      },
    },
  });

  if (!roadmap) {
    throw new Error("Roadmap no encontrado");
  }

  const steps = await Promise.all(roadmap.steps.map(buildStepOutput));

  return {
    id: roadmap.id,
    careerSlug: roadmap.careerSlug,
    careerTitle: roadmap.careerTitle,
    status: roadmap.status as CareerRoadmapOutput["status"],
    steps,
  };
}

// ─────────────────────────────────────────
// LISTAR ROADMAPS DEL USUARIO
// ─────────────────────────────────────────

export async function getUserCareerRoadmaps(
  cognitoId: string
): Promise<CareerRoadmapSummary[]> {
  const user = await prisma.user.findUniqueOrThrow({
    where: { cognitoId },
    select: { id: true },
  });

  const roadmaps = await prisma.careerRoadmap.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      steps: {
        select: { status: true },
      },
    },
  });

  return roadmaps.map((r: typeof roadmaps[number]) => ({
  id: r.id,
  careerSlug: r.careerSlug,
  careerTitle: r.careerTitle,
  status: r.status as CareerRoadmapSummary["status"],
  totalSteps: r.steps.length,
  completedSteps: r.steps.filter((s: { status: string }) => s.status === "COMPLETED").length,
  createdAt: r.createdAt,
}));
}

// ─────────────────────────────────────────
// PROGRESO ENCADENADO
// ─────────────────────────────────────────

export async function unlockNextStep(userPathId: string): Promise<void> {
  // 1. Buscar si este UserPath está asociado a algún step del roadmap
  const currentStep = await prisma.careerRoadmapStep.findFirst({
    where: { userPathId },
    select: { id: true, order: true, roadmapId: true },
  });

  if (!currentStep) return; // No está en ningún roadmap — no hacer nada

  // 2. Marcar el step actual como COMPLETED
  await prisma.careerRoadmapStep.update({
    where: { id: currentStep.id },
    data: { status: "COMPLETED" },
  });

  // 3. Buscar el siguiente step
  const nextStep = await prisma.careerRoadmapStep.findFirst({
    where: {
      roadmapId: currentStep.roadmapId,
      order: currentStep.order + 1,
    },
    select: { id: true },
  });

  if (nextStep) {
    // 4a. Desbloquear el siguiente step
    await prisma.careerRoadmapStep.update({
      where: { id: nextStep.id },
      data: { status: "AVAILABLE" },
    });
  } else {
    // 4b. No hay más steps — el roadmap está completo
    await prisma.careerRoadmap.update({
      where: { id: currentStep.roadmapId },
      data: { status: "COMPLETED" },
    });
  }
}