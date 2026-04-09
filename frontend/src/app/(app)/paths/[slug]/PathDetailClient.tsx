'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  ArrowLeft, BookOpen, Clock, CheckCircle2, Lock,
  Play, Star, Loader2, ChevronRight, Trophy,
} from 'lucide-react';
import { learningPathsApi } from '@/api';
import { LearningPathModule, PathModuleProgress } from '@/types';
import { QUERY_KEYS } from '@/lib/constants';
import { useAuthStore } from '@/stores/auth.store';
import styles from './PathDetailClient.module.css';

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
};
const GOAL_LABELS: Record<string, string> = {
  frontend: 'Frontend', backend: 'Backend', devops: 'DevOps',
  data_science: 'Data Science', mobile: 'Mobile', qa: 'QA', fullstack: 'Full Stack',
};

// ── Constantes del mapa ────────────────────────────────────────────────────
const ZIG   = [0, 1, 0, -1] as const;
const W     = 300;        // viewBox width
const NODE_R = 42;        // FIX: era 34, subido para dar más presencia visual
const STEP_H = 140;       // FIX: reducido de 150 → menos espacio muerto
const AMP   = 85;         // amplitud zig-zag

// ── Colores por estado (centralizados para no repetir magic strings) ───────
const STATE_COLORS = {
  done:   { fill: 'rgba(16,185,129,0.18)',  stroke: '#10b981', text: '#d1fae5',  sub: 'rgba(209,250,233,0.55)' },
  active: { fill: 'rgba(59,130,246,0.22)',  stroke: '#3b82f6', text: '#bfdbfe',  sub: 'rgba(191,219,254,0.55)' },
  locked: { fill: 'rgba(255,255,255,0.03)', stroke: '#1e3a5f', text: 'rgba(100,116,139,0.6)', sub: 'rgba(100,116,139,0.3)' },
} as const;

type ModuleStatus = 'COMPLETED' | 'IN_PROGRESS' | 'LOCKED';

function getModuleStatus(
  moduleId: string,
  progress: PathModuleProgress[],
  index: number,
  modules: LearningPathModule[],
): ModuleStatus {
  const found = progress.find((p) => p.moduleId === moduleId);
  if (found?.status === 'COMPLETED') return 'COMPLETED';
  if (found?.status === 'IN_PROGRESS') return 'IN_PROGRESS';
  if (index === 0) return 'IN_PROGRESS';
  const prev = modules[index - 1];
  const prevDone = progress.find((p) => p.moduleId === prev?.id)?.status === 'COMPLETED';
  return prevDone ? 'IN_PROGRESS' : 'LOCKED';
}

// ── Confirm modal ──────────────────────────────────────────────────────────
function UnenrollConfirm({ onConfirm, onCancel, loading }: {
  onConfirm: () => void; onCancel: () => void; loading: boolean;
}) {
  return (
    <div className={styles.confirmOverlay}>
      <div className={styles.confirmBox}>
        <p className={styles.confirmTitle}>¿Abandonar esta ruta?</p>
        <p className={styles.confirmDesc}>
          Tu progreso se conserva, pero la ruta quedará inactiva. Puedes volver a inscribirte cuando quieras.
        </p>
        <div className={styles.confirmActions}>
          <button className={styles.confirmCancel} onClick={onCancel} disabled={loading} type="button">
            Mantener inscripción
          </button>
          <button className={styles.confirmDanger} onClick={onConfirm} disabled={loading} type="button">
            {loading ? <Loader2 size={13} className={styles.spin} /> : 'Sí, abandonar'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PathMap ────────────────────────────────────────────────────────────────
interface PathMapProps {
  modules: LearningPathModule[];
  progress: PathModuleProgress[];
  isEnrolled: boolean;
  isCompleted: boolean;
  pathSlug: string;
}

function PathMap({ modules, progress, isEnrolled, isCompleted, pathSlug }: PathMapProps) {
  const router = useRouter();

  const cx = (i: number) => W / 2 + ZIG[i % 4] * AMP;
  const cy = (i: number) => NODE_R + 20 + i * STEP_H;
  const totalH = cy(modules.length - 1) + NODE_R + 40;

  const statuses: ModuleStatus[] = modules.map((m, i) => {
    if (!isEnrolled && !isCompleted) return 'LOCKED';
    return getModuleStatus(m.id, progress, i, modules);
  });

  const cardSide = (i: number): 'left' | 'right' => ZIG[i % 4] >= 0 ? 'right' : 'left';

  return (
    <div className={styles.mapWrap}>
      <svg
        width="100%"
        viewBox={`0 0 ${W} ${totalH}`}
        xmlns="http://www.w3.org/2000/svg"
        className={styles.mapSvg}
      >
        <defs>
          {/* Glow filter para nodo activo */}
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Conectores ── */}
        {modules.map((_, i) => {
          if (i === modules.length - 1) return null;
          const x1 = cx(i), y1 = cy(i) + NODE_R + 4;
          const x2 = cx(i + 1), y2 = cy(i + 1) - NODE_R - 4;
          const midY = (y1 + y2) / 2;
          const status = statuses[i];
          const isDone   = status === 'COMPLETED';
          const isActive = status === 'IN_PROGRESS';
          return (
            <path
              key={`conn-${i}`}
              d={`M${x1} ${y1} C${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
              fill="none"
              stroke={isDone ? '#10b981' : isActive ? '#3b82f6' : 'rgba(255,255,255,0.07)'}
              strokeWidth={isDone ? 2.5 : isActive ? 2 : 1.5}
              strokeDasharray={isDone || isActive ? 'none' : '5 5'}
              opacity={isDone ? 0.8 : isActive ? 0.5 : 1}
            />
          );
        })}

        {/* ── Nodos ── */}
        {modules.map((mod, i) => {
          const x = cx(i), y = cy(i);
          const status  = statuses[i];
          const isDone   = status === 'COMPLETED';
          const isActive = status === 'IN_PROGRESS';
          const isLocked = status === 'LOCKED';
          const isLast   = i === modules.length - 1;
          const canNav   = (isEnrolled || isCompleted) && (isDone || isActive);
          const colors   = isDone ? STATE_COLORS.done : isActive ? STATE_COLORS.active : STATE_COLORS.locked;

          // Texto del módulo (lado opuesto al zig-zag para no superponerse con activeCard)
          const labelSide = cardSide(i) === 'left' ? 'right' : 'left';
          const labelX    = labelSide === 'right' ? x + NODE_R + 14 : x - NODE_R - 14;
          const labelAnchor = labelSide === 'right' ? 'start' : 'end';

          return (
            <g key={mod.id}>
              {/* Pulse ring — sólo nodo activo */}
              {isActive && !isCompleted && (
                <circle
                  cx={x} cy={y}
                  r={NODE_R + 10}
                  fill={colors.fill}
                  className={styles.pulseRing}
                />
              )}

              {/* Halo exterior */}
              <circle
                cx={x} cy={y}
                r={NODE_R + 5}
                fill={isDone ? 'rgba(16,185,129,0.06)' : isActive ? 'rgba(59,130,246,0.09)' : 'rgba(255,255,255,0.015)'}
              />

              {/* Círculo principal */}
              <circle
                cx={x} cy={y}
                r={NODE_R}
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth={isActive ? 2.5 : 1.5}
                style={{ cursor: canNav ? 'pointer' : 'default' }}
                filter={isActive ? 'url(#glow)' : undefined}
                onClick={() => canNav && router.push(`/paths/${pathSlug}/modules/${mod.id}`)}
              />

              {/* Hover ring — sólo nodos navegables, via CSS no es posible en SVG inline, lo simulamos con opacity */}
              {canNav && (
                <circle
                  cx={x} cy={y}
                  r={NODE_R}
                  fill="transparent"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={1}
                  style={{ cursor: 'pointer', pointerEvents: 'none' }}
                />
              )}

              {/* Número de paso — FIX: era casi invisible (0.1 opacity) */}
              <text
                x={labelX}
                y={y - 10}
                textAnchor={labelAnchor}
                fontSize={10}
                fontWeight={600}
                fill={colors.sub}
                fontFamily="inherit"
                letterSpacing="0.06em"
              >
                {String(i + 1).padStart(2, '0')}
              </text>

              {/* Título del módulo — FIX: era #334155/#1e2d4a sobre dark bg = ilegible */}
              <text
                x={labelX}
                y={y + 4}
                textAnchor={labelAnchor}
                fontSize={12}
                fontWeight={500}
                fill={colors.text}
                fontFamily="inherit"
              >
                {mod.title.length > 22 ? mod.title.slice(0, 20) + '…' : mod.title}
              </text>

              {/* Duración */}
              <text
                x={labelX}
                y={y + 18}
                textAnchor={labelAnchor}
                fontSize={10}
                fill={colors.sub}
                fontFamily="inherit"
              >
                {mod.durationDays}d
              </text>

              {/* Icono central en el nodo */}
              <foreignObject
                x={x - 14} y={y - 14}
                width={28} height={28}
                style={{ pointerEvents: 'none' }}
              >
                <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isDone   && <CheckCircle2 size={22} color="#10B981" />}
                  {isActive && !isCompleted && <Play size={20} color="#3B82F6" fill="#3B82F6" />}
                  {isLocked && !isLast && <Lock size={18} color="rgba(100,116,139,0.4)" />}
                  {isLocked &&  isLast && <Star size={20} color="rgba(100,116,139,0.4)" />}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* ── Active cards (fuera del SVG) ── */}
      {modules.map((mod, i) => {
        if (statuses[i] !== 'IN_PROGRESS' || !isEnrolled || isCompleted) return null;
        const x = cx(i), y = cy(i);
        const side = cardSide(i);
        const topPct = (y / totalH) * 100;
        return (
          <div
            key={`card-${mod.id}`}
            className={`${styles.activeCard} ${side === 'left' ? styles.activeCardLeft : styles.activeCardRight}`}
            style={{ top: `calc(${topPct}% - 10px)` }}
          >
            <p className={styles.activeCardTitle}>{mod.title}</p>
            <p className={styles.activeCardMeta}>{mod.durationDays} días estimados</p>
            <button
              className={styles.activeCardBtn}
              onClick={() => router.push(`/paths/${pathSlug}/modules/${mod.id}`)}
              type="button"
            >
              Continuar <ChevronRight size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function PathDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: path, isLoading: loadingPath, isError: errorPath } = useQuery({
    queryKey: QUERY_KEYS.learningPath(slug),
    queryFn: () => learningPathsApi.getBySlug(slug),
  });

  const { data: progress, isError: progressError } = useQuery({
    queryKey: QUERY_KEYS.learningPathProgress(slug),
    queryFn: () => learningPathsApi.getProgress(slug),
    enabled: isAuthenticated,
    retry: false,
  });

  const enrollMutation = useMutation({
    mutationFn: () => learningPathsApi.enroll(slug, { weeklyHours: path?.weeklyHours ?? 10 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.learningPathProgress(slug) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myLearningPaths() });
      toast.success('¡Inscripción exitosa! Ya puedes empezar.');
    },
    onError: () => toast.error('No se pudo completar la inscripción.'),
  });

  const unenrollMutation = useMutation({
    mutationFn: () => learningPathsApi.unenroll(progress!.pathId),
    onSuccess: () => {
      setShowConfirm(false);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.learningPathProgress(slug) });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.myLearningPaths() });
      toast.warning('Inscripción cancelada. Tu progreso se conserva.');
      router.push('/paths');
    },
    onError: () => {
      setShowConfirm(false);
      toast.error('No se pudo cancelar la inscripción.');
    },
  });

  // ── Estados de inscripción ─────────────────────────────────────────────
  const hasProgress  = !!progress && !progressError;
  const isActive     = hasProgress && progress.status === 'ACTIVE';
  const isCompleted  = hasProgress && progress.status === 'COMPLETED';
  const isEnrolled   = isActive;
  const hasAnyRecord = isActive || isCompleted;

  const modules        = (path?.modules ?? []).slice().sort((a, b) => a.orderIndex - b.orderIndex);
  const moduleProgress = progress?.modules ?? [];
  const completedCount = hasProgress ? (progress?.completedModules ?? 0) : 0;
  const totalModules   = modules.length;
  const progressPct    = hasProgress ? (progress?.progress ?? 0) : 0;

  // ── Loading ────────────────────────────────────────────────────────────
  if (loadingPath) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.skeleton} style={{ height: 32, width: 120, marginBottom: 24 }} />
          <div className={styles.skeleton} style={{ height: 120 }} />
          <div className={styles.skeleton} style={{ height: 80, marginTop: 16 }} />
          <div className={styles.skeleton} style={{ height: 500, marginTop: 16 }} />
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────
  if (errorPath || !path) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.errorState}>
            <p>No se pudo cargar esta ruta de aprendizaje.</p>
            <button onClick={() => router.push('/paths')} type="button">
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Nominal ────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      {showConfirm && (
        <UnenrollConfirm
          onConfirm={() => unenrollMutation.mutate()}
          onCancel={() => setShowConfirm(false)}
          loading={unenrollMutation.isPending}
        />
      )}

      <div className={styles.content}>
        {/* Back */}
        <button className={styles.back} onClick={() => router.push('/paths')} type="button">
          <ArrowLeft size={15} /> Volver al catálogo
        </button>

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroIcon}>
            {path.subject.iconUrl
              ? <img src={path.subject.iconUrl} alt={path.subject.name} />
              : <span className={styles.heroIconFallback}>{path.subject.name[0]}</span>
            }
          </div>
          <div className={styles.heroInfo}>
            <div className={styles.heroTop}>
              <span className={`${styles.badge} ${styles[`level${path.level}`]}`}>
                {LEVEL_LABELS[path.level]}
              </span>
              {GOAL_LABELS[path.goal] && (
                <span className={`${styles.badge} ${styles.badgeGoal}`}>
                  {GOAL_LABELS[path.goal]}
                </span>
              )}
              {isCompleted && (
                <span className={styles.badgeCompleted}>
                  <Trophy size={11} /> Completada
                </span>
              )}
            </div>
            <h1 className={styles.heroTitle}>{path.title}</h1>
            <p className={styles.heroDesc}>{path.description}</p>
          </div>
        </div>

        {/* Meta chips */}
        <div className={styles.metaRow}>
          <div className={styles.metaChip}>
            <BookOpen size={14} /><span>{totalModules} módulos</span>
          </div>
          <div className={styles.metaChip}>
            <Clock size={14} /><span>{path.weeklyHours}h / semana</span>
          </div>
        </div>

        {/* Estado 1: No inscrito */}
        {!hasAnyRecord && (
          <div className={styles.ctaBlock}>
            <div className={styles.ctaLeft}>
              <strong>Empieza cuando quieras</strong>
              Completa cada módulo para desbloquear el siguiente.
            </div>
            <button
              className={styles.ctaBtn}
              onClick={() => enrollMutation.mutate()}
              disabled={enrollMutation.isPending}
              type="button"
            >
              {enrollMutation.isPending
                ? <Loader2 size={14} className={styles.spin} />
                : <><span>Inscribirme</span><ChevronRight size={14} /></>
              }
            </button>
          </div>
        )}

        {/* Estado 2: Activo con progreso */}
        {isActive && (
          <div className={styles.progressBlock}>
            <div className={styles.progressHeader}>
              <span>Tu progreso</span>
              <strong>{progressPct}%</strong>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
            </div>
            <div className={styles.progressMeta}>
              {completedCount} de {totalModules} módulos completados
            </div>
          </div>
        )}

        {/* Estado 3: Completada */}
        {isCompleted && (
          <div className={styles.completionBlock}>
            <div className={styles.completionLeft}>
              <div className={styles.completionTrophy}>
                <Trophy size={32} color="#f59e0b" />
              </div>
            </div>
            <div className={styles.completionRight}>
              <p className={styles.completionTitle}>¡Ruta completada!</p>
              <p className={styles.completionSub}>
                Terminaste todos los {totalModules} módulos de esta ruta. Eso es un logro real — pocos llegan hasta aquí.
              </p>
              <div className={styles.completionStats}>
                <div className={styles.completionStat}>
                  <span className={styles.completionStatNum}>{totalModules}</span>
                  <span className={styles.completionStatLabel}>módulos</span>
                </div>
                <div className={styles.completionStatDivider} />
                <div className={styles.completionStat}>
                  <span className={styles.completionStatNum}>100%</span>
                  <span className={styles.completionStatLabel}>completado</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section label */}
        <p className={styles.sectionTitle}>
          {isCompleted ? 'Módulos completados' : isActive ? 'Tu camino' : 'Módulos del curso'}
        </p>

        {/* Mapa */}
        <PathMap
          modules={modules}
          progress={moduleProgress}
          isEnrolled={isActive}
          isCompleted={isCompleted}
          pathSlug={slug}
        />

        {/* Abandonar */}
        {isActive && (
          <div className={styles.unenrollWrap}>
            <button className={styles.unenrollBtn} onClick={() => setShowConfirm(true)} type="button">
              Abandonar ruta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}