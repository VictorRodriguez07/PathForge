//archivo para configurar el cliente del servicio de cognito de AWS utilizado para autenticación de usuarios.
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

//Creación de una instancia del cliente de Cognito Identity Provider, configurada con la región especificada en las variables de entorno o con un valor predeterminado.
export const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env["AWS_REGION"] ?? "us-east-1",
});