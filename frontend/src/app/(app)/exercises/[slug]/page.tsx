import ExerciseDetailClient from './ExerciseDetailClient';

interface Props {

  params: Promise<{ slug: string }>;

}

export default async function ExerciseDetailPage({ params }: Props) {

  const { slug } = await params;

  return <ExerciseDetailClient slug={slug} />;

}