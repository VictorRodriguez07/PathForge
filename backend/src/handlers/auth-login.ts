import { APIGatewayProxyEventV2 } from "aws-lambda";
import { loginUser } from "../services/auth.service";
import { loginSchema } from "../schemas/auth.schema";
import { ZodError } from "zod";

//Funcion principal de entrada para el inicio de sesión de usuarios.
export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const body = JSON.parse(event.body ?? "{}");
    //Llamada a la función para la validación de los datos de entrada del inicio de sesión de usuarios, utilizando el esquema definido en loginSchema.
    const data = loginSchema.parse(body);
    //Llamada a la función de servicio para iniciar sesión, pasando los datos validados. Si el inicio de sesión es exitoso, se devuelve una respuesta con el resultado del inicio de sesión.
    const result = await loginUser(data);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Login exitoso",
        ...result,
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
        statusCode: 401,
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