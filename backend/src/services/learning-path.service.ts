import { prisma } from "../infrastructure/prisma";
import { EnrollPathInput } from "../schemas/learning-path.schema";


//funcion que obtiene todas las rutas de aprendizaje activas con su respectiva cantidad de modulos y usuarios inscritos
export async function getAllLearningPaths() {
  return prisma.pathTemplate.findMany({
    where: { isActive: true },
    include: {
      subject: {
        select: { name: true, slug: true, iconUrl: true },
      },
      _count: {
        select: { modules: true, userPaths: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}

//funcion que obtiene una ruta de aprendizaje por su slug
export async function getLearningPathBySlug(slug: string) {
  return prisma.pathTemplate.findUnique({
    where: { slug },
    include: {
      subject: {
        select: { name: true, slug: true, iconUrl: true },
      },
      modules: {
        orderBy: { orderIndex: "asc" },
      },
    },
  });
}

//funcion que permite a un usuario inscribirse en una ruta de aprendizaje, inicializando su progreso en cada modulo como "PENDING"
export async function enrollUserInLearningPath(cognitoId: string, slug: string, input: EnrollPathInput) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { cognitoId },
    select: { id: true },
  });

  const path = await prisma.pathTemplate.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { orderIndex: "asc" },
        select: { id: true },
      },
    },
  });

  if (!path) throw new Error("PATH_NOT_FOUND");

  const existing = await prisma.userPath.findFirst({
    where: { userId: user.id, pathTemplateId: path.id },
  });

  if (existing) {
    if (existing.status !== "ABANDONED") throw new Error("ALREADY_ENROLLED");


    return prisma.userPath.update({
      where: { id: existing.id },
      data: {
        status: "ACTIVE",
        startedAt: new Date(),
        weeklyHours: input.weeklyHours,
      },
    });
  }

  const userPath = await prisma.userPath.create({
    data: {
      userId: user.id,
      pathTemplateId: path.id,
      weeklyHours: input.weeklyHours,
      currentLevel: path.level,
      goal: path.goal,
      status: "ACTIVE",
    },
  });

  await prisma.moduleProgress.createMany({
    data: path.modules.map((module) => ({
      userPathId: userPath.id,
      moduleId: module.id,
      status: "PENDING",
    })),
  });

  return userPath;
}

//funcion que permite a un usuario marcar un modulo como completado, actualizando su progreso y el estado de la ruta si es necesario
export async function completeModule(cognitoId: string,pathId: string,moduleId: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { cognitoId },
    select: { id: true },
  });

  const userPath = await prisma.userPath.findFirst({
    where: { id: pathId, userId: user.id },
  });

  if (!userPath) throw new Error("PATH_NOT_FOUND");
  if (userPath.status !== "ACTIVE") throw new Error("PATH_NOT_ACTIVE");

  await prisma.moduleProgress.updateMany({
    where: { userPathId: pathId, moduleId },
    data: { status: "COMPLETED" },
  });

  const allModules = await prisma.moduleProgress.findMany({
    where: { userPathId: pathId },
    select: { status: true },
  });

  const allCompleted = allModules.every((m) => m.status === "COMPLETED");

  if (allCompleted) {
    await prisma.userPath.update({
      where: { id: pathId },
      data: { status: "COMPLETED" },
    });
  }

  const completed = allModules.filter((m) => m.status === "COMPLETED").length;

  return {
    completedModules: completed,
    totalModules: allModules.length,
    progress: Math.round((completed / allModules.length) * 100),
    pathCompleted: allCompleted,
  };
}

//funcion que obtiene el progreso de un usuario en una ruta de aprendizaje, incluyendo el porcentaje completado, estado e información del módulo
export async function getLearningPathProgress(cognitoId: string, slug: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { cognitoId },
    select: { id: true },
  });

  const path = await prisma.pathTemplate.findUnique({
    where: { slug },
    select: { id: true, title: true },
  });

  if (!path) throw new Error("PATH_NOT_FOUND");

  const userPath = await prisma.userPath.findFirst({
    where: { userId: user.id, pathTemplateId: path.id },
    include: {
      moduleProgress: {
        include: {
          module: {
            select: { title: true, orderIndex: true, durationDays: true },
          },
        },
        orderBy: { module: { orderIndex: "asc" } },
      },
    },
  });

  if (!userPath) throw new Error("NOT_ENROLLED");

  const completed = userPath.moduleProgress.filter(
    (m) => m.status === "COMPLETED"
  ).length;
  const total = userPath.moduleProgress.length;

  return {
    pathId: userPath.id,
    status: userPath.status,
    weeklyHours: userPath.weeklyHours,
    progress: Math.round((completed / total) * 100),
    completedModules: completed,
    totalModules: total,
    modules: userPath.moduleProgress.map((mp) => ({
      moduleId: mp.moduleId,
      title: mp.module.title,
      orderIndex: mp.module.orderIndex,
      durationDays: mp.module.durationDays,
      status: mp.status,
    })),
  };
}

//funcion que permite a un usuario abandonar una ruta de aprendizaje, actualizando el estado de la ruta a "ABANDONED" si no ha sido completada
export async function abandonLearningPath(cognitoId: string, pathId: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { cognitoId },
    select: { id: true },
  });

  const userPath = await prisma.userPath.findFirst({
    where: { id: pathId, userId: user.id },
  });

  if (!userPath) throw new Error("PATH_NOT_FOUND");
  if (userPath.status === "COMPLETED") throw new Error("PATH_ALREADY_COMPLETED");

  await prisma.userPath.update({
    where: { id: pathId },
    data: { status: "ABANDONED" },
  });

  return { message: "Ruta abandonada exitosamente" };
}