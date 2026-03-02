import { APIGatewayProxyEventV2 } from "aws-lambda";
import { CognitoJwtVerifier } from "aws-jwt-verify";

//instancia del verificador de JWT de cognito, utilizando la configuración de variables de entorno para el ID del grupo de usuarios, el uso del token y el ID del cliente. 
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env["COGNITO_USER_POOL_ID"] ?? "",
  tokenUse: "access",
  clientId: process.env["COGNITO_CLIENT_ID"] ?? "",
});

//interfas para representar al usuario autenticado, con propiedades para el ID de Cognito y el email del usuario.
export interface AuthenticatedUser {
  cognitoId: string;
  email: string;
}

//interfas para representar la estrcutura del objeto que debe seguirse, con propiedades para el usuario autenticado (o null si no hay un usuario autenticado) y un booleano que indica si el usuario está autenticado o no.
export interface AuthContext {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
}


function extractToken(event: APIGatewayProxyEventV2): string | null {
  //header de autorización puede venir en mayúscula o minúscula, por lo que se verifica ambos casos para extraer el token correctamente.
  const authHeader = event.headers?.authorization ?? 
                     event.headers?.Authorization;
  
  if (!authHeader) return null;
  
  //guardamos el token en una variable. Usamos el método split para dividir el header en dos partes (["Bearer", "eyJraWQi..."])
  const parts = authHeader.split(" ");
  
  //validamos que el header tenga el formato correcto (dos partes o posiciones y que su primer posición sea "Bearer" sin importar mayúsculas o minúsculas). Si no cumple con este formato, se retorna null indicando que no se pudo extraer un token válido.
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") return null;
  
  //retornamos solo el token del array
  return parts[1];
}

//Funcion utilizada para endpoints que requieren autenticación obligatoria.
export async function requireAuth(event: APIGatewayProxyEventV2): Promise<AuthContext> {
  const token = extractToken(event);

  if (!token) {
    throw new UnauthorizedError("Token no proporcionado");
  }

  try {
    const payload = await verifier.verify(token);
    return {
      user: {
        cognitoId: payload.sub,
        email: payload.username as string,
      },
      isAuthenticated: true,
    };
  } catch {
    throw new UnauthorizedError("Token inválido o expirado");
  }
}

//Funcion utilizada para endpoints que permiten acceso tanto a usuarios autenticados como no autenticados, retornando un objeto con la información del usuario autenticado (si existe) y un booleano que indica si el usuario está autenticado o no.
export async function optionalAuth(
  event: APIGatewayProxyEventV2
): Promise<AuthContext> {
  const token = extractToken(event);

  if (!token) {
    return { user: null, isAuthenticated: false };
  }

  try {
    const payload = await verifier.verify(token);
    return {
      user: {
        cognitoId: payload.sub,
        email: payload.username as string,
      },
      isAuthenticated: true,
    };
  } catch {
    return { user: null, isAuthenticated: false };
  }
}

//Clase personalizada de error para manejar casos de autenticación no autorizada, extendiendo la clase base Error y estableciendo el nombre del error como "UnauthorizedError" para facilitar su identificación en el manejo de errores. Esta clase se utiliza para lanzar errores específicos cuando un token no es proporcionado, es inválido o ha expirado durante el proceso de autenticación.
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}