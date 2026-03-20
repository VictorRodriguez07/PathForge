import { APIGatewayProxyEventV2 } from "aws-lambda";
import { getAllExercises } from "../services/exercise.service";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const exercises = await getAllExercises();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exercises }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};