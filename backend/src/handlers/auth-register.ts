import { APIGatewayProxyEventV2 } from "aws-lambda";
import { registerUser } from "../services/auth.service";
import { registerSchema } from "../schemas/auth.schema";
import { ZodError } from "zod";

//Funcion principal de entrada para el registro de usuarios.
export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const body = JSON.parse(event.body ?? "{}");
    //Llamada a la función para la validación de los datos de entrada del registro de usuarios, utilizando el esquema definido en registerSchema.
    const data = registerSchema.parse(body);
    //Llamada a la función de servicio para registrar el nuevo usuario, pasando los datos validados. Si el registro es exitoso, se devuelve una respuesta con el usuario registrado.
    const user = await registerUser(data);

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Usuario registrado exitosamente",
        user,
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