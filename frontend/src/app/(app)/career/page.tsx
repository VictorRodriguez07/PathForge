import type { Metadata } from 'next';
import CareerDiscoveryClient from './CareerDiscoveryClient';

export const metadata: Metadata = {
  title: 'Descubre tu carrera ideal',
  description:
    'Responde algunas preguntas y descubre qué carrera en tecnología es perfecta para ti según tu perfil, experiencia y objetivos.',
  robots: { index: false, follow: false },
};

export default function CareerDiscoveryPage() {
  return <CareerDiscoveryClient />;
}