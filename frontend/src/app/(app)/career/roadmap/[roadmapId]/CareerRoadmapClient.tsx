'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { careersApi } from '@/api';
import { CareerRoadmapStep } from '@/types';
import { QUERY_KEYS } from '@/lib/constants';
import styles from './CareerRoadmapClient.module.css';

// ─── Icons ────────────────────────────────────
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D4A62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

// ─── Level label ──────────────────────────────
const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
};

// ─── Step component ───────────────────────────
function RoadmapStep({
  step,
  index,
  isLast,
  prevTechLabel,
}: {
  step: CareerRoadmapStep;
  index: number;
  isLast: boolean;
  prevTechLabel: string | null;
}) {
  const router = useRouter();
  const { status, pathTemplate, userPath } = step;

  const stepClass = `${styles.step} ${styles[status.toLowerCase()]}`;
  const indClass = `${styles.stepInd} ${styles[`ind${status.charAt(0) + status.slice(1).toLowerCase()}`]}`;

  function renderIndicator() {
    if (status === 'COMPLETED') return <IconCheck />;
    if (status === 'IN_PROGRESS') return <IconClock />;
    if (status === 'AVAILABLE') return <IconBolt />;
    return <IconLock />;
  }

  function renderBadge() {
    if (status === 'COMPLETED') return <span className={`${styles.badge} ${styles.badgeCompleted}`}>Completado</span>;
    if (status === 'IN_PROGRESS') return <span className={`${styles.badge} ${styles.badgeProgress}`}>En progreso</span>;
    if (status === 'AVAILABLE' && !pathTemplate) return <span className={`${styles.badge} ${styles.badgeSoon}`}>Próximamente</span>;
    if (status === 'AVAILABLE') return <span className={`${styles.badge} ${styles.badgeAvailable}`}>Disponible</span>;
    return <span className={`${styles.badge} ${styles.badgeLocked}`}>Bloqueado</span>;
  }

  function renderProgress() {
    if (!userPath) return null;
    const { completed, total, percentage } = userPath.progress;
    return (
      <div className={styles.stepProgress}>
        <div className={styles.stepProgressRow}>
          <span>Progreso en la ruta</span>
          <span>{completed} de {total} módulos</span>
        </div>
        <div className={styles.stepProgressBar}>
          <div className={styles.stepProgressFill} style={{ width: `${percentage}%`, background: '#22D3EE' }} />
        </div>
      </div>
    );
  }

  function renderFooter() {
     if (status === 'SKIPPED') {
    return (
      <div className={styles.stepFooter}>
        <p className={styles.stepUnlockHint}>
          Declaraste conocimiento previo en esta tecnología.
        </p>
        {pathTemplate && (
          <button
            className={`${styles.stepCta} ${styles.ctaStart}`}
            onClick={() => router.push(`/paths/${pathTemplate.slug}`)}
            type="button"
          >
            Revisar de todas formas →
          </button>
        )}
      </div>
    );
  }
    // Step sin ruta en catálogo
    if (!pathTemplate) {
      if (status === 'LOCKED' && prevTechLabel) {
        return (
          <div className={styles.stepFooter}>
            <p className={styles.stepUnlockHint}>Se desbloquea al completar {prevTechLabel}</p>
          </div>
        );
      }
      if (status === 'AVAILABLE') {
        return (
          <div className={styles.stepFooter}>
            <p className={styles.stepUnlockHint}>La ruta de aprendizaje para esta tecnología estará disponible pronto.</p>
          </div>
        );
      }
      return null;
    }

    // Step con ruta en catálogo
    return (
      <div className={styles.stepFooter}>
        <div className={styles.stepPathInfo}>
          <div>
            <p className={styles.stepPathName}>{pathTemplate.title}</p>
            <p className={styles.stepPathLevel}>
              {LEVEL_LABELS[pathTemplate.level] ?? pathTemplate.level}
            </p>
          </div>
        </div>

        {status === 'AVAILABLE' && (
          <button
            className={`${styles.stepCta} ${styles.ctaStart}`}
            onClick={() => router.push(`/paths/${pathTemplate.slug}`)}
            type="button"
          >
            Empezar ruta →
          </button>
        )}

        {status === 'IN_PROGRESS' && (
          <button
            className={`${styles.stepCta} ${styles.ctaContinue}`}
            onClick={() => router.push(`/paths/${pathTemplate.slug}`)}
            type="button"
          >
            Continuar →
          </button>
        )}

        {status === 'LOCKED' && prevTechLabel && (
          <p className={styles.stepUnlockHint}>Se desbloquea al completar {prevTechLabel}</p>
        )}
      </div>
    );
  }

  return (
    <div className={styles.stepWrap}>
      <div className={stepClass}>
        {/* Indicador circular */}
        <div className={indClass}>
          {renderIndicator()}
        </div>

        {/* Card */}
        <div className={styles.stepCard}>
          <div className={styles.stepTop}>
            <span className={styles.stepOrder}>Paso {index + 1}</span>
            {renderBadge()}
          </div>
          <h3 className={styles.stepTitle}>{step.techLabel}</h3>

          {renderProgress()}
          {renderFooter()}
        </div>
      </div>

      {/* Línea conectora entre steps */}
      {!isLast && (
        <div className={`${styles.connector} ${styles[`connector${status.charAt(0) + status.slice(1).toLowerCase()}`]}`} />
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────
export default function CareerRoadmapClient({ roadmapId }: { roadmapId: string }) {
  const router = useRouter();
  console.log('Rendering CareerRoadmapClient with roadmapId:', roadmapId);
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.careerRoadmap(roadmapId),
    queryFn: () => careersApi.getRoadmap(roadmapId),
  });

  const roadmap = data?.roadmap;

  const completedSteps = roadmap?.steps.filter((s) => s.status === 'COMPLETED').length ?? 0;
  const totalSteps = roadmap?.steps.length ?? 0;
  const progressPct = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.skeleton} />
          <div className={styles.skeleton} style={{ height: 120, marginTop: 12 }} />
          <div className={styles.skeleton} style={{ height: 120, marginTop: 12 }} />
        </div>
      </div>
    );
  }

  if (isError || !roadmap) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.errorState}>
            <p className={styles.errorText}>No se pudo cargar tu ruta de carrera.</p>
            <button className={styles.errorBtn} onClick={() => router.push('/career')} type="button">
              Volver al inicio
            </button>
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
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Tu ruta de carrera
          </div>
          <h1 className={styles.headerTitle}>
            Tu camino hacia<br />{roadmap.careerTitle}
          </h1>
          <p className={styles.headerSub}>
            Completa cada tecnología en orden para avanzar. Los pasos se desbloquean automáticamente.
          </p>

          {/* Progreso general */}
          <div className={styles.progressWrap}>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>
                {completedSteps} de {totalSteps} pasos completados
              </span>
              <span className={styles.progressPct}>{progressPct}%</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </header>

        {/* Timeline */}
        <div className={styles.timeline}>
          {roadmap.steps.map((step, i) => (
            <RoadmapStep
              key={step.id}
              step={step}
              index={i}
              isLast={i === roadmap.steps.length - 1}
              prevTechLabel={i > 0 ? roadmap.steps[i - 1].techLabel : null}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className={styles.footerNote}>
          <div className={styles.footerNoteIcon}>
            <IconInfo />
          </div>
          <p className={styles.footerNoteText}>
            Los pasos se desbloquean automáticamente cuando completas el anterior. Cada vez que termines una ruta de aprendizaje, tu progreso aquí se actualiza solo.
          </p>
        </div>
      </div>
    </div>
  );
}