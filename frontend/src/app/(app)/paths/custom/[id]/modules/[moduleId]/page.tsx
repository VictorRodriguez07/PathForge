import CustomModuleDetailClient from './CustomModuleDetailClient';

interface Props {
  params: Promise<{ id: string; moduleId: string }>;
}

export default async function CustomModuleDetailPage({ params }: Props) {
  const { id, moduleId } = await params;
  return <CustomModuleDetailClient userPathId={id} moduleId={moduleId} />;
}