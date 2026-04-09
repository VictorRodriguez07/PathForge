'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Clock, Zap, ChevronRight, Trophy, Lock } from 'lucide-react';
import { learningPathsApi } from '@/api';
import { LearningPath, UserLearningPath } from '@/types';
import { QUERY_KEYS } from '@/lib/constants';
import { useAuthStore } from '@/stores/auth.store';
import { resolveSubjectFromTitle } from '@/lib/path-utils';
import styles from './PathsCatalogClient.module.css';

type FilterGoal = 'all' | 'frontend' | 'backend' | 'devops' | 'data_science' | 'mobile' | 'qa' | 'fullstack';

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
};

const GOAL_LABELS: Record<FilterGoal, string> = {
  all: 'Todas', frontend: 'Frontend', backend: 'Backend', devops: 'DevOps',
  data_science: 'Data Science', mobile: 'Mobile', qa: 'QA', fullstack: 'Full Stack',
};

const FILTERS: FilterGoal[] = ['all', 'frontend', 'backend', 'devops', 'data_science', 'mobile', 'qa', 'fullstack'];

// ─── Custom path card ─────────────────────────────
function CustomPathCard({ userPath }: { userPath: UserLearningPath }) {
  const router = useRouter();
  const resolved = resolveSubjectFromTitle(userPath.title);
  const pct = userPath.progress.percentage;
  const isCompleted = userPath.status === 'COMPLETED';

  function handleClick() {
    // Custom paths no tienen slug — navegar por userPathId cuando el backend lo soporte
    // Por ahora, no hay página de detalle para rutas custom, ir a /paths
    router.push(`/paths/custom/${userPath.id}`);
  }

  return (
    <div
      className={`${styles.customCard} ${isCompleted ? styles.customCardCompleted : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className={styles.customCardHead}>
        <div className={styles.customCardIcon}>
          {resolved.iconUrl
            ? <img src={resolved.iconUrl} alt={resolved.name} />
            : <Zap size={18} color="#22d3ee" />
          }
        </div>
        <div className={styles.customCardBadges}>
          <span className={styles.badgeMiRuta}>Mi Ruta</span>
          {isCompleted && <span className={styles.badgeCompletedSmall}><Trophy size={10} /> Completada</span>}
        </div>
      </div>
      <h3 className={styles.customCardTitle}>{userPath.title}</h3>
      <div className={styles.customCardMeta}>
        <span>{LEVEL_LABELS[userPath.level] ?? userPath.level}</span>
        <span className={styles.dot} />
        <span>{userPath.weeklyHours}h / semana</span>
      </div>
      <div className={styles.customCardFooter}>
        <div className={styles.progressWrap}>
          <div className={styles.progressLabels}>
            <span>Progreso</span>
            <span>{userPath.progress.completed}/{userPath.progress.total}</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${pct}%`, background: isCompleted ? '#10b981' : '#22d3ee' }}
            />
          </div>
        </div>
        {!isCompleted && (
          <span className={styles.ctaPill}>
            {pct === 0 ? 'Empezar' : 'Continuar'} <ChevronRight size={12} />
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Catalog path card ────────────────────────────
interface CatalogCardProps {
  path: LearningPath;
  enrolledInfo: { completed: number; total: number; pct: number; status: string } | null;
}

function CatalogCard({ path, enrolledInfo }: CatalogCardProps) {
  const router = useRouter();
  const isCompleted = enrolledInfo?.status === 'COMPLETED';
  const isActive = enrolledInfo?.status === 'ACTIVE';
  const pct = enrolledInfo?.pct ?? 0;

  if (isCompleted) {
    return (
      <div
        className={`${styles.card} ${styles.cardCompleted}`}
        onClick={() => router.push(`/paths/${path.slug}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && router.push(`/paths/${path.slug}`)}
      >
        {/* Completion glow overlay */}
        <div className={styles.completedGlow} aria-hidden="true" />

        <div className={styles.cardHead}>
          <div className={styles.cardIcon}>
            {path.subject.iconUrl
              ? <img src={path.subject.iconUrl} alt={path.subject.name} />
              : <span className={styles.cardIconFallback}>{path.subject.name[0]}</span>
            }
          </div>
          <div className={styles.completedBadgeGroup}>
            <span className={styles.badgeCompletedFull}>
              <Trophy size={13} /> Completada
            </span>
          </div>
        </div>

        <h3 className={styles.cardTitle}>{path.title}</h3>
        <p className={styles.cardDesc}>{path.description}</p>

        <div className={styles.completedStats}>
          <div className={styles.completedStat}>
            <span className={styles.completedStatNum}>{path._count.modules}</span>
            <span className={styles.completedStatLabel}>módulos</span>
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
          <span className={styles.completedReview}>Ver módulos</span>
          <ChevronRight size={13} color="#10b981" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardEnrolled : ''}`}
      onClick={() => router.push(`/paths/${path.slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && router.push(`/paths/${path.slug}`)}
    >
      <div className={styles.cardHead}>
        <div className={styles.cardIcon}>
          {path.subject.iconUrl
            ? <img src={path.subject.iconUrl} alt={path.subject.name} />
            : <span className={styles.cardIconFallback}>{path.subject.name[0]}</span>
          }
        </div>
        <span className={`${styles.levelBadge} ${styles[`level${path.level}`]}`}>
          {LEVEL_LABELS[path.level]}
        </span>
      </div>

      <h3 className={styles.cardTitle}>{path.title}</h3>
      <p className={styles.cardDesc}>{path.description}</p>

      <div className={styles.cardMeta}>
        <div className={styles.metaItem}><BookOpen size={13} /><span>{path._count.modules} módulos</span></div>
        <div className={styles.metaItem}><Clock size={13} /><span>{path.weeklyHours}h / semana</span></div>
      </div>

      <div className={styles.cardFooter}>
        {isActive ? (
          <>
            <div className={styles.progressWrap}>
              <div className={styles.progressLabels}>
                <span>Progreso</span>
                <span>{enrolledInfo!.completed}/{enrolledInfo!.total}</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${pct}%` }} />
              </div>
            </div>
            <span className={styles.ctaPill}>Continuar <ChevronRight size={12} /></span>
          </>
        ) : (
          <>
            <span className={styles.notEnrolled}>No inscrito</span>
            <span className={styles.ctaPill}>Ver ruta <ChevronRight size={12} /></span>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────
export default function PathsCatalogClient() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterGoal>('all');
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data: paths, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.learningPaths(),
    queryFn: learningPathsApi.getAll,
  });

 const { data: myPaths } = useQuery({
    queryKey: QUERY_KEYS.myLearningPaths(),
    queryFn: learningPathsApi.getMyPaths,
    enabled: isAuthenticated,
  });

  // Separar rutas custom de las de catálogo
  const customPaths = (myPaths ?? []).filter((up) => up.isCustom);
  const catalogEnrolled = (myPaths ?? []).filter((up) => !up.isCustom);

  // Map para lookup rápido: slug → info
  const enrolledMap = new Map(
    catalogEnrolled
      .filter((up) => up.slug !== null)
      .map((up) => [
        up.slug,
        {
          completed: up.progress.completed,
          total: up.progress.total,
          pct: up.progress.percentage,
          status: up.status,
        },
      ])
  );

  const filtered = activeFilter === 'all'
    ? (paths ?? [])
    : (paths ?? []).filter((p) => p.goal === activeFilter);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.skeleton} style={{ height: 180 }} />
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeleton} style={{ height: 200 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.errorState}>
            <p>No se pudieron cargar las rutas.</p>
            <button onClick={() => window.location.reload()} type="button">Reintentar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.content}>

        {/* Hero — crear ruta personalizada */}
        <div className={styles.hero}>
          <div className={styles.heroBadge}><Zap size={12} /> Personalizado para ti</div>
          <h1 className={styles.heroTitle}>¿No sabes por dónde empezar?</h1>
          <p className={styles.heroDesc}>
            Responde unas preguntas sobre tu nivel actual y objetivos. PathForge genera
            una ruta de aprendizaje adaptada exactamente a ti.
          </p>
          <button className={styles.heroCta} onClick={() => router.push('/paths/custom')} type="button">
            Crear mi ruta personalizada
          </button>
          <span className={styles.heroHint}>Toma menos de 3 minutos</span>
        </div>

        {/* Mis rutas personalizadas */}
        {customPaths.length > 0 && (
          <div className={styles.myPathsSection}>
            <div className={styles.myPathsHeader}>
              <h2 className={styles.myPathsTitle}>Mis rutas personalizadas</h2>
              <span className={styles.myPathsCount}>{customPaths.length}</span>
            </div>
            <div className={styles.customGrid}>
              {customPaths.map((up) => (
                <CustomPathCard key={up.id} userPath={up} />
              ))}
            </div>
          </div>
        )}

        {/* Divisor */}
        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>
            {customPaths.length > 0 ? 'catálogo de rutas' : 'o elige una ruta del catálogo'}
          </span>
          <div className={styles.dividerLine} />
        </div>

        {/* Filtros */}
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(f)}
              type="button"
            >
              {GOAL_LABELS[f]}
            </button>
          ))}
        </div>

        {/* Grid catálogo */}
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No hay rutas disponibles para esta área todavía.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((path) => (
              <CatalogCard
                key={path.id}
                path={path}
                enrolledInfo={enrolledMap.get(path.slug) ?? null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}