import { APIGatewayProxyEventV2 } from "aws-lambda";
import { completeModule } from "../services/learning-path.service";
import { requireAuth, UnauthorizedError } from "../shared/auth.middleware";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const auth = await requireAuth(event);
    const pathId = event.pathParameters?.pathId;
    const moduleId = event.pathParameters?.moduleId;

    if (!pathId || !moduleId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "pathId y moduleId son requeridos" }),
      };
    }

    const result = await completeModule(auth.user!.cognitoId, pathId, moduleId);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
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
      if (error.message === "PATH_NOT_ACTIVE") {
        return {
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "La ruta no está activa" }),
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