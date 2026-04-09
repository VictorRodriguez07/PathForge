import { Metadata } from 'next';
import ModuleDetailClient from './ModuleDetailClient';

interface Props {
  params: Promise<{ slug: string; moduleId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Módulo | ${slug} | PathForge`,
  };
}

export default async function ModuleDetailPage({ params }: Props) {
  const { slug, moduleId } = await params;
  return <ModuleDetailClient slug={slug} moduleId={moduleId} />;
}