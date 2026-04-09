import { Metadata } from 'next';
import CareerHubClient from './CareerHubClient';

export const metadata: Metadata = {
  title: 'Carreras | PathForge',
  description: 'Gestiona tus rutas de carrera activas o descubre una nueva.',
};

export default function CareerPage() {
  return <CareerHubClient />;
}