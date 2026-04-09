'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Zap, Trophy, Clock, Users, CheckCircle2, AlertCircle, Filter } from 'lucide-react';
import { exercisesApi } from '@/api';
import { Exercise, Difficulty } from '@/types';
import styles from './ExercisesCatalogClient.module.css';

type FilterDifficulty = 'ALL' | Difficulty;

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  EASY: 'Fácil',
  MEDIUM: 'Medio',
  HARD: 'Difícil',
};

const FILTERS: { value: FilterDifficulty; label: string }[] = [
  { value: 'ALL',    label: 'Todos'  },
  { value: 'EASY',   label: 'Fácil'  },
  { value: 'MEDIUM', label: 'Medio'  },
  { value: 'HARD',   label: 'Difícil'},
];

/** Formatea segundos a "Xm", "1h 30m", etc. */
function formatTime(seconds: number): string {
  if (seconds < 60)  return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/** Formatea submissions (1200 → "1.2k") */
function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}

function DifficultyPip({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`${styles.diffPip} ${styles[`diff${difficulty}`]}`}>
      {DIFFICULTY_LABELS[difficulty]}
    </span>
  );
}

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const router = useRouter();
  // isSolved: usa el campo que venga de la API; si no existe, false
  const isSolved = (exercise as any).isSolved ?? false;

  const handleNav = () => router.push(`/exercises/${exercise.slug}`);

  return (
    <div
      className={`${styles.card} ${isSolved ? styles.cardSolved : ''}`}
      onClick={handleNav}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleNav()}
      aria-label={`${exercise.title} — ${DIFFICULTY_LABELS[exercise.difficulty]}${isSolved ? ' — Resuelto' : ''}`}
    >
      {/* Top row: icon + solved badge | difficulty pill */}
      <div className={styles.cardTop}>
        <div className={styles.cardTopLeft}>
          <div className={styles.cardIcon}>
            {exercise.subject.iconUrl
              ? <img src={exercise.subject.iconUrl} alt={exercise.subject.name} width={22} height={22} />
              : <Zap size={16} color="#22d3ee" />
            }
          </div>
          {isSolved && (
            <span className={styles.solvedBadge}>
              <CheckCircle2 size={10} />
              Resuelto
            </span>
          )}
        </div>
        <DifficultyPip difficulty={exercise.difficulty} />
      </div>

      {/* Title & subject */}
      <h3 className={styles.cardTitle}>{exercise.title}</h3>
      <p className={styles.cardSubject}>{exercise.subject.name}</p>

      {/* Meta row con labels contextuales */}
      <div className={styles.cardMeta}>
        <div className={styles.metaItem} title={`${exercise.points} puntos`}>
          <Trophy size={12} />
          <span>{exercise.points} pts</span>
        </div>
        <div className={styles.metaItem} title="Tiempo límite">
          <Clock size={12} />
          <span>{formatTime(exercise.timeLimit)}</span>
        </div>
        <div className={styles.metaItem} title="Intentos totales">
          <Users size={12} />
          <span>{formatCount(exercise._count.submissions)}</span>
        </div>
      </div>

      {/* Footer: CTA */}
      <div className={styles.cardFooter}>
        <span className={isSolved ? styles.ctaSolved : styles.cta}>
          {isSolved
            ? <><CheckCircle2 size={11} /> Ver solución</>
            : <>Resolver <ChevronRight size={12} className={styles.ctaIcon} /></>
          }
        </span>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonTop}>
        <div className={styles.skeletonIcon} />
        <div className={styles.skeletonPip} />
      </div>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonSub} />
      <div className={styles.skeletonMeta} />
      <div className={styles.skeletonFooter} />
    </div>
  );
}

export default function ExercisesCatalogClient() {
  const [filter, setFilter] = useState<FilterDifficulty>('ALL');

  const { data: exercises, isLoading, isError } = useQuery({
    queryKey: ['exercises'],
    queryFn: exercisesApi.getAll,
  });

  const filtered = filter === 'ALL'
    ? (exercises ?? [])
    : (exercises ?? []).filter((e) => e.difficulty === filter);

  const counts = {
    ALL:    exercises?.length ?? 0,
    EASY:   exercises?.filter((e) => e.difficulty === 'EASY').length   ?? 0,
    MEDIUM: exercises?.filter((e) => e.difficulty === 'MEDIUM').length ?? 0,
    HARD:   exercises?.filter((e) => e.difficulty === 'HARD').length   ?? 0,
  };

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.skeletonHero} />
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (isError) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.errorState}>
            <AlertCircle size={32} color="rgba(148,163,184,0.3)" />
            <p>No se pudieron cargar los ejercicios.</p>
            <button onClick={() => window.location.reload()} type="button">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Nominal ── */
  return (
    <div className={styles.page}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.content}>
        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroBadge}><Zap size={12} /> Code Challenges</div>
          <h1 className={styles.heroTitle}>Practica con ejercicios reales</h1>
          <p className={styles.heroDesc}>
            Resuelve problemas de programación, ejecuta tu código contra casos de prueba y sube al ranking.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{counts.ALL}</span>
              <span className={styles.heroStatLabel}>ejercicios</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={`${styles.heroStatNum} ${styles.easy}`}>{counts.EASY}</span>
              <span className={styles.heroStatLabel}>fáciles</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={`${styles.heroStatNum} ${styles.medium}`}>{counts.MEDIUM}</span>
              <span className={styles.heroStatLabel}>medios</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={`${styles.heroStatNum} ${styles.hard}`}>{counts.HARD}</span>
              <span className={styles.heroStatLabel}>difíciles</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${filter === f.value ? styles.filterActive : ''} ${f.value !== 'ALL' ? styles[`filter${f.value}`] : ''}`}
              onClick={() => setFilter(f.value)}
              type="button"
              aria-pressed={filter === f.value}
            >
              {f.label}
              <span className={styles.filterCount}>{counts[f.value]}</span>
            </button>
          ))}
        </div>

        {/* Grid or empty */}
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Filter size={20} color="rgba(148,163,184,0.3)" />
            </div>
            <p>No hay ejercicios para esta dificultad.</p>
            <p className={styles.emptyHint}>Prueba con otro filtro o vuelve más tarde.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}