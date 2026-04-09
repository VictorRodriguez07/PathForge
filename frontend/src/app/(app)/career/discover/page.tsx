import { Metadata } from 'next';
import CareerDiscoveryClient from '../CareerDiscoveryClient';

export const metadata: Metadata = {
  title: 'Descubre tu carrera | PathForge',
  description: 'Responde unas preguntas y descubre qué perfil técnico se adapta a ti.',
};

export default function CareerDiscoverPage() {
  return <CareerDiscoveryClient />;
}