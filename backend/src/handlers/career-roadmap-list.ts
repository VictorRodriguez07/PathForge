import { APIGatewayProxyEventV2 } from "aws-lambda";
import { requireAuth, UnauthorizedError } from "../shared/auth.middleware";
import { getUserCareerRoadmaps } from "../services/career-roadmap.service";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const auth = await requireAuth(event);

    const roadmaps = await getUserCareerRoadmaps(auth.user!.cognitoId);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roadmaps }),
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
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