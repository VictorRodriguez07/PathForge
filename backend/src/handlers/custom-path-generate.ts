import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ZodError } from "zod";
import { customPathSchema } from "../schemas/custom-path.schema";
import { generateCustomPath } from "../services/custom-learning-path.service";
import { requireAuth, UnauthorizedError } from "../shared/auth.middleware";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const auth = await requireAuth(event);
    const body = JSON.parse(event.body ?? "{}");
    const input = customPathSchema.parse(body);
    const generatedPath = await generateCustomPath(auth.user!.cognitoId, input);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ generatedPath }),
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

    if (error instanceof Error && error.message === "NO_TEMPLATE_FOUND") {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "No hay contenido disponible para esta tecnología" }),
      };
    }

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};