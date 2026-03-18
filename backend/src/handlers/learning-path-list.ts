import { APIGatewayProxyEventV2 } from "aws-lambda";
import { getAllLearningPaths } from "../services/learning-path.service";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const paths = await getAllLearningPaths();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};