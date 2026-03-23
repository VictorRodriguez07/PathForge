import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ZodError } from "zod";
import { confirmCustomPathSchema } from "../schemas/custom-path.schema";
import { confirmCustomPath } from "../services/custom-learning-path.service";
import { requireAuth, UnauthorizedError } from "../shared/auth.middleware";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const auth = await requireAuth(event);
    const body = JSON.parse(event.body ?? "{}");
    const { input, generatedPath } = confirmCustomPathSchema.parse(body);
    const userPathId = await confirmCustomPath(
      auth.user!.cognitoId,
      input,
      generatedPath
    );

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userPathId,
        message: "Ruta personalizada creada exitosamente",
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