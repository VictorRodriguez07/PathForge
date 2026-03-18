import { APIGatewayProxyEventV2 } from "aws-lambda";
import { getLearningPathProgress } from "../services/learning-path.service";
import { requireAuth, UnauthorizedError } from "../shared/auth.middleware";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const auth = await requireAuth(event);
    const slug = event.pathParameters?.slug;

    if (!slug) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Slug requerido" }),
      };
    }

    const progress = await getLearningPathProgress(auth.user!.cognitoId, slug);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(progress),
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: error.message }),
      };
    }

    if (error instanceof Error) {
      if (error.message === "PATH_NOT_FOUND") {
        return {
          statusCode: 404,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Ruta no encontrada" }),
        };
      }
      if (error.message === "NOT_ENROLLED") {
        return {
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "No estás inscrito en esta ruta" }),
        };
      }
    }

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};