import { Metadata } from 'next';
import CustomPathClient from './CustomPathClient';

export const metadata: Metadata = {
  title: 'Crear mi ruta | PathForge',
  description: 'Genera una ruta de aprendizaje personalizada según tu nivel y objetivos.',
};

export default function CustomPathPage() {
  return <CustomPathClient />;
}