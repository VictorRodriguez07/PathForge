import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ZodError } from "zod";
import { careerDiscoverySchema } from "../schemas/career.schema";
import { discoverCareers } from "../services/career-discovery.service";
import { optionalAuth } from "../shared/auth.middleware";
import { prisma } from "../infrastructure/prisma";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const auth = await optionalAuth(event);
    const body = JSON.parse(event.body ?? "{}");
    const input = careerDiscoverySchema.parse(body);
    const recommendations = discoverCareers(input);

    let savedToProfile = false;

    if (auth.isAuthenticated && auth.user) {
      const dbUser = await prisma.user.findUnique({
        where: { cognitoId: auth.user.cognitoId },
        select: { id: true },
      });

      if (dbUser) {
        await prisma.careerRecommendation.create({
          data: {
            userId: dbUser.id,
            recommendations: JSON.parse(JSON.stringify(recommendations)),
            userProfile: {
              experienceLevel: input.experienceLevel,
              objective: input.objective,
              weeklyHours: input.weeklyHours,
            },
          },
        });
        savedToProfile = true;
      }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recommendations,
        userProfile: {
          experienceLevel: input.experienceLevel,
          objective: input.objective,
          weeklyHours: input.weeklyHours,
        },
        generatedAt: new Date().toISOString(),
        savedToProfile,
      }),
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Datos inválidos",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        }),
      };
    }

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};