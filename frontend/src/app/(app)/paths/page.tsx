import { Metadata } from 'next';
import PathsCatalogClient from './PathsCatalogClient';

export const metadata: Metadata = {
  title: 'Roadmaps | PathForge',
  description: 'Explora rutas de aprendizaje por tecnología o crea la tuya personalizada.',
};

export default function PathsPage() {
  return <PathsCatalogClient />;
}