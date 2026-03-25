export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  cognitoId: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'ADMIN';
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}