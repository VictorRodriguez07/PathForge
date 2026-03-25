import type { Metadata } from 'next';
import AuthForm from './AuthForm';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description:
    'Accede a PathForge para continuar tu ruta de aprendizaje como developer. Inicia sesión o crea tu cuenta gratis.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthPage() {
  return (
    <main>
      <AuthForm />
    </main>
  );
}