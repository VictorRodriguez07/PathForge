import { APIGatewayProxyEventV2 } from "aws-lambda";
import { prisma } from "../infrastructure/prisma";
import { requireAuth, UnauthorizedError } from "../shared/auth.middleware";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const auth = await requireAuth(event);
    const userPathId = event.pathParameters?.id;

    if (!userPathId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "ID requerido" }),
      };
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: { cognitoId: auth.user!.cognitoId },
      select: { id: true },
    });

    const userPath = await prisma.userPath.findFirst({
  where: { id: userPathId, userId: user.id },
  include: {
    pathTemplate: {
      include: {
        subject: { select: { name: true, slug: true, iconUrl: true } },
        modules: {
          orderBy: { orderIndex: "asc" },
          include: {
            concepts: {
              include: { concept: true },
            },
          },
        },
      },
    },
    moduleProgress: {
  include: {
    module: {
      include: {
        concepts: {
          include: { concept: true },
        },
      },
    },
  },
},
  },
});

    if (!userPath) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Ruta no encontrada" }),
      };
    }

    const modules = userPath.isCustom
      ? userPath.moduleProgress
          .map((mp) => mp.module)
          .sort((a, b) => a.orderIndex - b.orderIndex)
      : (userPath.pathTemplate?.modules ?? []);

    const total = modules.length;
    const completed = userPath.moduleProgress.filter((m) => m.status === "COMPLETED").length;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: {
          id: userPath.id,
          status: userPath.status,
          isCustom: userPath.isCustom,
          title: userPath.isCustom ? userPath.customTitle : userPath.pathTemplate?.title ?? "Ruta sin título",
          description: userPath.isCustom ? null : userPath.pathTemplate?.title ?? null,
          level: userPath.pathTemplate?.level ?? userPath.currentLevel,
          goal: userPath.goal,
          weeklyHours: userPath.weeklyHours,
          slug: userPath.pathTemplate?.slug ?? null,
          subject: userPath.pathTemplate?.subject ?? null,
          modules,
          moduleProgress: userPath.moduleProgress.map((mp) => ({
            moduleId: mp.moduleId,
            status: mp.status,
          })),
          progress: {
            completed,
            total,
            percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
          },
        },
      }),
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: error.message }),
      };
    }

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};