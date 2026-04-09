import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z, ZodError } from "zod";
import { requireAuth, UnauthorizedError } from "../shared/auth.middleware";
import { createCareerRoadmap } from "../services/career-roadmap.service";

const createRoadmapSchema = z.object({
  careerRecommendationId: z.string().uuid(),
  careerIndex: z.number().int().min(0).max(2),
});

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const auth = await requireAuth(event);

    const body = JSON.parse(event.body ?? "{}");
    const { careerRecommendationId, careerIndex } = createRoadmapSchema.parse(body);

    const roadmap = await createCareerRoadmap(
      auth.user!.cognitoId,
      careerRecommendationId,
      careerIndex
    );

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roadmap }),
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: error.message }),
      };
    }

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

    if (error instanceof Error) {
      return {
        statusCode: 400,
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