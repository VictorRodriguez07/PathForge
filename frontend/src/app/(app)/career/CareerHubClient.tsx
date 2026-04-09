'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  ChevronRight,
  Compass,
  Trophy,
  Circle,
  Flame,
} from 'lucide-react';
import { careersApi } from '@/api/careers.api';
import type { CareerRoadmapSummary } from '@/types/career.types';
import styles from './CareerHubClient.module.css';

const CAREER_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Full-Stack',
  devops: 'DevOps',
  mobile: 'Mobile',
  qa: 'QA',
  data_science: 'Data Science',
  cloud: 'Cloud',
};

type FilterKey = 'all' | 'ACTIVE' | 'COMPLETED' | 'ABANDONED';

function ProgressBar({ value }: { value: number }) {
  return (
    <div className={styles.progressTrack}>
      <div
        className={styles.progressFill}
        style={{
          width: `${value}%`,
          background: value === 100 ? '#10b981' : '#3b82f6',
        }}
      />
    </div>
  );
}

function CompletedCard({ roadmap }: { roadmap: CareerRoadmapSummary }) {
  return (
    <Link href={`/career/roadmap/${roadmap.id}`} className={`${styles.card} ${styles.cardCompleted}`}>
      <div className={styles.completedGlow} aria-hidden="true" />
      <div className={styles.cardHead}>
        <div className={styles.cardIconWrap}>
          <Trophy size={18} color="#10b981" />
        </div>
        <span className={styles.badgeCompletedFull}>
          <Trophy size={11} />
          Completada
        </span>
      </div>
      <h3 className={styles.cardTitle}>{roadmap.careerTitle}</h3>
      <p className={styles.cardSlug}>
        {CAREER_LABELS[roadmap.careerSlug] ?? roadmap.careerSlug}
      </p>
      <div className={styles.completedStats}>
        <div className={styles.completedStat}>
          <span className={styles.completedStatNum}>{roadmap.totalSteps}</span>
          <span className={styles.completedStatLabel}>tecnologías</span>
        </div>
        <div className={styles.completedStatDivider} />
        <div className={styles.completedStat}>
          <span className={styles.completedStatNum}>100%</span>
          <span className={styles.completedStatLabel}>completado</span>
        </div>
      </div>
      <div className={styles.completedTrack}>
        <div className={styles.completedFill} />
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.completedReview}>Ver roadmap</span>
        <ChevronRight size={13} color="#10b981" />
      </div>
    </Link>
  );
}

function ActiveCard({ roadmap }: { roadmap: CareerRoadmapSummary }) {
  const pct =
    roadmap.totalSteps > 0
      ? Math.round((roadmap.completedSteps / roadmap.totalSteps) * 100)
      : 0;

  return (
    <Link href={`/career/roadmap/${roadmap.id}`} className={`${styles.card} ${styles.cardActive}`}>
      <div className={styles.cardHead}>
        <div className={styles.cardIconWrap}>
          <Flame size={18} color="#3b82f6" />
        </div>
        <span className={styles.badgeActive}>
          <Circle size={7} fill={pct > 0 ? '#3b82f6' : 'transparent'} color="#3b82f6" />
          {pct > 0 ? 'En progreso' : 'Sin iniciar'}
        </span>
      </div>
      <h3 className={styles.cardTitle}>{roadmap.careerTitle}</h3>
      <p className={styles.cardSlug}>
        {CAREER_LABELS[roadmap.careerSlug] ?? roadmap.careerSlug}
      </p>
      <div className={styles.cardMeta}>
        <span>{roadmap.totalSteps} tecnologías</span>
        <span className={styles.dot} />
        <span>{roadmap.completedSteps} completadas</span>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.progressWrap}>
          <div className={styles.progressLabels}>
            <span>Progreso</span>
            <span>{roadmap.completedSteps}/{roadmap.totalSteps}</span>
          </div>
          <ProgressBar value={pct} />
        </div>
        <span className={styles.ctaPill}>
          {pct === 0 ? 'Empezar' : 'Continuar'}
          <ChevronRight size={12} />
        </span>
      </div>
    </Link>
  );
}

function RoadmapCard({ roadmap }: { roadmap: CareerRoadmapSummary }) {
  if (roadmap.status === 'COMPLETED') return <CompletedCard roadmap={roadmap} />;
  return <ActiveCard roadmap={roadmap} />;
}

export default function CareerHubClient() {
  const router = useRouter();
  const [roadmaps, setRoadmaps] = useState<CareerRoadmapSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>('all');

  useEffect(() => {
    careersApi
      .getMyRoadmaps()
      .then(({ roadmaps }) => setRoadmaps(roadmaps))
      .catch(() => setError('No se pudieron cargar tus carreras.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.skeleton} style={{ height: 160, marginBottom: '2rem' }} />
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.skeleton} style={{ height: 200 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.errorState}>
            <p>{error}</p>
            <button type="button" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const active = roadmaps.filter((r) => r.status === 'ACTIVE');
  const completed = roadmaps.filter((r) => r.status === 'COMPLETED');
  const abandoned = roadmaps.filter((r) => r.status === 'ABANDONED');

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'Todas' },
    { key: 'ACTIVE', label: `Activas${active.length ? ` · ${active.length}` : ''}` },
    { key: 'COMPLETED', label: `Completadas${completed.length ? ` · ${completed.length}` : ''}` },
    ...(abandoned.length > 0
      ? [{ key: 'ABANDONED' as const, label: `Pausadas · ${abandoned.length}` }]
      : []),
  ];

  const filtered =
    filter === 'all'
      ? roadmaps.filter((r) => r.status !== 'ABANDONED')
      : roadmaps.filter((r) => r.status === filter);

  return (
    <div className={styles.page}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBadge}>
            <Compass size={12} />
            Orientación profesional
          </div>
          <h1 className={styles.heroTitle}>
            {roadmaps.length === 0 ? '¿Qué perfil técnico quieres ser?' : 'Mis rutas de carrera'}
          </h1>
          <p className={styles.heroDesc}>
            {roadmaps.length === 0
              ? 'PathForge analiza tu perfil y construye un roadmap de tecnologías ordenado para que llegues donde quieres.'
              : `${active.length} carrera${active.length !== 1 ? 's' : ''} activa${active.length !== 1 ? 's' : ''}${completed.length > 0 ? ` · ${completed.length} completada${completed.length !== 1 ? 's' : ''}` : ''}. Sigue avanzando.`}
          </p>
          <button
            className={styles.heroCta}
            onClick={() => router.push('/career/discover')}
            type="button"
          >
            <Plus size={15} />
            {roadmaps.length === 0 ? 'Descubrir mi carrera' : 'Explorar otra carrera'}
          </button>
          {roadmaps.length === 0 && (
            <span className={styles.heroHint}>Toma menos de 3 minutos</span>
          )}
        </div>

        {roadmaps.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Aún no tienes rutas de carrera. Descubre cuál se adapta a ti.</p>
          </div>
        ) : (
          <>
            <div className={styles.filters}>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`${styles.filterBtn} ${filter === f.key ? styles.filterActive : ''}`}
                  onClick={() => setFilter(f.key)}
                  type="button"
                >
                  {f.label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No tienes carreras en esta categoría.</p>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((r) => (
                  <RoadmapCard key={r.id} roadmap={r} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}