import { APIGatewayProxyEventV2 } from "aws-lambda";
import { abandonLearningPath } from "../services/learning-path.service";
import { requireAuth, UnauthorizedError } from "../shared/auth.middleware";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const auth = await requireAuth(event);
    const pathId = event.pathParameters?.pathId;

    if (!pathId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "pathId requerido" }),
      };
    }

    const result = await abandonLearningPath(auth.user!.cognitoId, pathId);

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
      if (error.message === "PATH_ALREADY_COMPLETED") {
        return {
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "No puedes abandonar una ruta completada" }),
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