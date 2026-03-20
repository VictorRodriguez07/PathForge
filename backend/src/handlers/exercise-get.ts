import { APIGatewayProxyEventV2 } from "aws-lambda";
import { getExerciseBySlug } from "../services/exercise.service";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const slug = event.pathParameters?.slug;

    if (!slug) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Slug requerido" }),
      };
    }

    const exercise = await getExerciseBySlug(slug);

    if (!exercise) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Ejercicio no encontrado" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exercise }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};