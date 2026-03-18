import { APIGatewayProxyEventV2 } from "aws-lambda";
import { getLearningPathBySlug } from "../services/learning-path.service";

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

    const path = await getLearningPathBySlug(slug);

    if (!path) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Ruta no encontrada" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};