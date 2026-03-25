import { APIGatewayProxyEventV2 } from "aws-lambda";
import { registerUser, loginUser } from "../services/auth.service";
import { registerSchema } from "../schemas/auth.schema";
import { ZodError } from "zod";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const body = JSON.parse(event.body ?? "{}");
    const data = registerSchema.parse(body);

    await registerUser(data);

    const result = await loginUser({
      email: data.email,
      password: data.password,
    });

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Usuario registrado exitosamente",
        user: result.user,
        tokens: result.tokens,
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