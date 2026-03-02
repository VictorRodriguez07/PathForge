//handler para verificar el estado de la función (lambda) eb producción, esto es útil para monitoreo y para verificar que la función esté desplegada correctamente.
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { optionalAuth } from "../shared/auth.middleware";

export const handler = async (event: APIGatewayProxyEventV2) => {
  const auth = await optionalAuth(event);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: "ok",
      stage: process.env["STAGE"],
      authenticated: auth.isAuthenticated,
      user: auth.user?.email ?? null,
    }),
  };
};