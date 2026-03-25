import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import AuthPage from '../pages/auth/AuthPage';
//Rutas protegidas, solo accesibles si el usuario está autenticado. Si no, redirige a la página de autenticación, además de usar replace para evitar que el usuario pueda volver a la ruta protegida usando el botón de atrás del navegador.
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <Navigate to="/paths" replace />,
  },
  {
    path: '/paths',
    lazy: async () => {
      const { default: Component } = await import('../pages/paths/PathsPage');
      return {
        element: (
          <ProtectedRoute>
            <Component />
          </ProtectedRoute>
        ),
      };
    },
  },
  {
    path: '/paths/:slug',
    lazy: async () => {
      const { default: Component } = await import('../pages/paths/PathDetailPage');
      return {
        element: (
          <ProtectedRoute>
            <Component />
          </ProtectedRoute>
        ),
      };
    },
  },
  {
    path: '/exercises',
    lazy: async () => {
      const { default: Component } = await import('../pages/exercises/ExercisesPage');
      return {
        element: (
          <ProtectedRoute>
            <Component />
          </ProtectedRoute>
        ),
      };
    },
  },
  {
    path: '/exercises/:slug',
    lazy: async () => {
      const { default: Component } = await import('../pages/exercises/ExerciseDetailPage');
      return {
        element: (
          <ProtectedRoute>
            <Component />
          </ProtectedRoute>
        ),
      };
    },
  },
]);
