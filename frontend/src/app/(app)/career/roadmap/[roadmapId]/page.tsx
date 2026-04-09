import CareerRoadmapClient from './CareerRoadmapClient';

interface Props {
  params: Promise<{ roadmapId: string }>;
}

export default async function CareerRoadmapPage({ params }: Props) {
  const { roadmapId } = await params;

  console.log('roadmapId:', roadmapId);

  return <CareerRoadmapClient roadmapId={roadmapId} />;
}