import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'Mi Dashboard',
  description: 'Tu progreso en PathForge — rutas activas, módulos completados y tu camino como developer.',
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardClient />;
}