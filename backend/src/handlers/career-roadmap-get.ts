import { APIGatewayProxyEventV2 } from "aws-lambda";
import { requireAuth, UnauthorizedError } from "../shared/auth.middleware";
import { getCareerRoadmap } from "../services/career-roadmap.service";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const auth = await requireAuth(event);

    const roadmapId = event.pathParameters?.roadmapId;
    if (!roadmapId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "roadmapId es requerido" }),
      };
    }

    const roadmap = await getCareerRoadmap(auth.user!.cognitoId, roadmapId);

    return {
      statusCode: 200,
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

    if (error instanceof Error && error.message === "Roadmap no encontrado") {
      return {
        statusCode: 404,
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