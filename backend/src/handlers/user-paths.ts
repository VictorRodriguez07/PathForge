import { APIGatewayProxyEventV2 } from "aws-lambda";
import { prisma } from "../infrastructure/prisma";
import { requireAuth, UnauthorizedError } from "../shared/auth.middleware";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const auth = await requireAuth(event);

    const user = await prisma.user.findUniqueOrThrow({
      where: { cognitoId: auth.user!.cognitoId },
      select: { id: true },
    });

   const careerRecommendation = await prisma.careerRecommendation.findFirst({
  where: { userId: user.id },
  select: { id: true },
});
    const userPaths = await prisma.userPath.findMany({
      where: {
        userId: user.id,
        status: { in: ["ACTIVE", "PAUSED"] },
      },
      include: {
        pathTemplate: {
          select: {
            title: true,
            slug: true,
            level: true,
            subject: {
              select: { name: true, slug: true, iconUrl: true },
            },
          },
        },
        moduleProgress: {
          select: { status: true },
        },
      },
      orderBy: { startedAt: "desc" },
    });

    const paths = userPaths.map((up) => {
      const total = up.moduleProgress.length;
      const completed = up.moduleProgress.filter(
        (m) => m.status === "COMPLETED"
      ).length;

      return {
        id: up.id,
        status: up.status,
        weeklyHours: up.weeklyHours,
        currentLevel: up.currentLevel,
        goal: up.goal,
        startedAt: up.startedAt,
        isCustom: up.isCustom,
        title: up.isCustom
          ? up.customTitle
          : up.pathTemplate?.title ?? "Ruta sin título",
        slug: up.pathTemplate?.slug ?? null,
        level: up.pathTemplate?.level ?? up.currentLevel,
        subject: up.pathTemplate?.subject ?? null,
        progress: {
          completed,
          total,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        },
      };
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths, hasCareerDiscovery: !!careerRecommendation }),
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