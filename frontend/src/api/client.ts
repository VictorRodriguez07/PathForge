//archivo para configurar una instancia de Axios que se utilizará para realizar solicitudes a la API. Incluye interceptores para agregar el token de autenticación a las solicitudes y manejar errores de autenticación.
import axios from 'axios';
import { API_BASE_URL } from '../lib/constants';


// Instancia de Axios para realizar solicitudes a la API. Usa la URL base definida en las variables de entorno para ser reutilizada al llamar al backend.
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//Intercepta las peticiones por axios para agregar el token de autenticación en el encabezado Authorization si está presente en el localStorage.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//maneja las respuestas de error, específicamente para el caso de un error 401 (no autorizado). Si se detecta un error 401, se eliminan los tokens de autenticación del localStorage y se redirige al usuario a la página de autenticación.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('idToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);