//archivo que contiene la lógica de negocio relacionada con la autenticación y registro de usuarios, utilizando AWS Cognito para la gestión de usuarios y Prisma para la persistencia de datos en la base de datos.
import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminInitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from '../infrastructure/cognito';
import { prisma } from "../infrastructure/prisma";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";


// Configuración de variables de entorno para Cognito
const USER_POOL_ID = process.env["COGNITO_USER_POOL_ID"] ?? "";
const CLIENT_ID = process.env["COGNITO_CLIENT_ID"] ?? "";

// Función para registrar un nuevo usuario
export const registerUser = async (data: RegisterInput) => {
// Verificar si ya existe un usuario con el mismo email en la base de datos
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Ya existe una cuenta con este email");
  }

  //función para crear el nuevo usuario en cognito, utilizando el comando AdminCreateUserCommand para crear el usuario con una contraseña temporal, y luego el comando AdminSetUserPasswordCommand para establecer la contraseña permanente.
  const cognitoUser = await cognitoClient.send(
    new AdminCreateUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: data.email,
      MessageAction: "SUPPRESS",
      TemporaryPassword: data.password,
      UserAttributes: [
        { Name: "email", Value: data.email },
        { Name: "name", Value: data.name },
        { Name: "email_verified", Value: "true" },
      ],
    })
  );


  //funcion para establecer la contraseña permanente del usuario recién creado en Cognito, utilizando el comando AdminSetUserPasswordCommand para establecer la contraseña permanente.
  await cognitoClient.send(
    new AdminSetUserPasswordCommand({
    UserPoolId: USER_POOL_ID,
    Username: data.email,
    Password: data.password,
    Permanent: true,
    })
  );
  const cognitoId = cognitoUser.User?.Username ?? data.email;

  //función para guardar el nuevo usuario en la base de datos utilizando Prisma, creando un nuevo registro en la tabla de usuarios con el email y nombre proporcionados.
  const user = await prisma.user.create({
  data: {
    cognitoId,
    email: data.email,
    name: data.name,
  },
  select: {
    id: true,
    email: true,
    name: true,
    role: true,
    createdAt: true,
  },
});

  return user;
};

// Función para autenticar un usuario existente, utilizando el comando AdminInitiateAuthCommand para iniciar el proceso de autenticación con Cognito, y luego verificando que se hayan recibido los tokens de acceso, ID y actualización. Si la autenticación es exitosa, se busca el usuario en la base de datos utilizando Prisma y se devuelve la información del usuario junto con los tokens de autenticación.
export const loginUser = async (data: LoginInput) => {
  const authResult = await cognitoClient.send(
    new AdminInitiateAuthCommand({
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
      AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: data.email,
        PASSWORD: data.password,
      },
    })
  );

  //token que recibimos de Cognito después de la autenticación. Contiene el AccessToken, IdToken y RefreshToken que se utilizan para mantener la sesión del usuario y acceder a los recursos protegidos.
  const tokens = authResult.AuthenticationResult;

  if (!tokens?.AccessToken || !tokens?.IdToken || !tokens?.RefreshToken) {
    throw new Error("Error al autenticar");
  }

  //buscamos que el usuario exista en base de datos
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Si la autenticación es exitosa, se devuelve la información del usuario junto con los tokens de autenticación.
  return {
    user,
    tokens: {
      accessToken: tokens.AccessToken,
      idToken: tokens.IdToken,
      refreshToken: tokens.RefreshToken,
    },
  };
};