import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ZodError } from "zod";
import { enrollPathSchema } from "../schemas/learning-path.schema";
import { enrollUserInLearningPath } from "../services/learning-path.service";
import { requireAuth } from "../shared/auth.middleware";
import { UnauthorizedError } from "../shared/auth.middleware";

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

    const body = JSON.parse(event.body ?? "{}");
    const input = enrollPathSchema.parse(body);
    const userPath = await enrollUserInLearningPath(auth.user!.cognitoId, slug, input);

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPath }),
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
      if (error.message === "PATH_NOT_FOUND") {
        return {
          statusCode: 404,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Ruta no encontrada" }),
        };
      }
      if (error.message === "ALREADY_ENROLLED") {
        return {
          statusCode: 409,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Ya estás inscrito en esta ruta" }),
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