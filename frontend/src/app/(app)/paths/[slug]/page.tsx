import { Metadata } from 'next';
import PathDetailClient from './PathDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Ruta de aprendizaje | PathForge`,
    description: `Detalle de la ruta ${slug}`,
  };
}

export default async function PathDetailPage({ params }: Props) {
  const { slug } = await params;
  return <PathDetailClient slug={slug} />;
}