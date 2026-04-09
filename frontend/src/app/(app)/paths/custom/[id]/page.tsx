import CustomPathDetailClient from './CustomPathDetailClient';

export default async function CustomPathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CustomPathDetailClient id={id} />;
}