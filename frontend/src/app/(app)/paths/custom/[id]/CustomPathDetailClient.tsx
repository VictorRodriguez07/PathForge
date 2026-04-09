'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Lock, Play, Star, ChevronRight, Trophy, Zap } from 'lucide-react';
import { customPathsApi } from '@/api';
import { LearningPathModule, PathModuleProgress, ModuleStatus } from '@/types';
import { resolveSubjectFromTitle } from '@/lib/path-utils';
import styles from './CustomPathDetailClient.module.css';

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
};

const GOAL_LABELS: Record<string, string> = {
  get_job: 'Conseguir empleo', personal_project: 'Proyecto personal',
  certification: 'Certificación', specialize: 'Especializarme',
  improve_job: 'Mejorar en mi trabajo', frontend: 'Frontend',
  backend: 'Backend', devops: 'DevOps', fullstack: 'Full Stack',
};

const ZIG = [0, 1, 0, -1] as const;
const W = 340;
const NODE_R = 34;
const STEP_H = 150;
const AMP = 100;

function getModuleStatus(
  moduleId: string,
  progress: { moduleId: string; status: ModuleStatus }[],
  index: number,
  modules: { id: string }[]
): 'COMPLETED' | 'IN_PROGRESS' | 'LOCKED' {
  const found = progress.find((p) => p.moduleId === moduleId);
  if (found?.status === 'COMPLETED') return 'COMPLETED';
  if (found?.status === 'IN_PROGRESS') return 'IN_PROGRESS';
  if (index === 0) return 'IN_PROGRESS';
  const prev = modules[index - 1];
  const prevDone = progress.find((p) => p.moduleId === prev?.id)?.status === 'COMPLETED';
  return prevDone ? 'IN_PROGRESS' : 'LOCKED';
}

interface PathMapProps {
  modules: { id: string; title: string; orderIndex: number; durationDays: number }[];
  progress: { moduleId: string; status: ModuleStatus }[];
  isCompleted: boolean;
  userPathId: string;
}

function PathMap({ modules, progress, isCompleted, userPathId }: PathMapProps) {
  const router = useRouter();
  const cx = (i: number) => W / 2 + ZIG[i % 4] * AMP;
  const cy = (i: number) => 50 + i * STEP_H;
  const totalH = cy(modules.length - 1) + 80;

  const statuses = modules.map((m, i) => getModuleStatus(m.id, progress, i, modules));
  const cardSide = (i: number): 'left' | 'right' => ZIG[i % 4] >= 0 ? 'left' : 'right';

  return (
    <div className={styles.mapWrap}>
      <svg width="100%" viewBox={`0 0 ${W} ${totalH}`} xmlns="http://www.w3.org/2000/svg" className={styles.mapSvg}>
        <defs>
          <marker id="dotDone" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <circle cx="3" cy="3" r="2" fill="#22d3ee" opacity="0.6" />
          </marker>
        </defs>

        {modules.map((_, i) => {
          if (i === modules.length - 1) return null;
          const x1 = cx(i); const y1 = cy(i) + NODE_R + 4;
          const x2 = cx(i + 1); const y2 = cy(i + 1) - NODE_R - 4;
          const midY = (y1 + y2) / 2;
          const status = statuses[i];
          const isDone = status === 'COMPLETED';
          const isActive = status === 'IN_PROGRESS';
          return (
            <path
              key={`conn-${i}`}
              d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
              fill="none"
              stroke={isDone ? '#22d3ee' : isActive ? '#22d3ee' : 'rgba(255,255,255,0.06)'}
              strokeWidth={isDone ? 2 : 1.5}
              strokeDasharray={isDone || isActive ? 'none' : '5 5'}
              opacity={isDone ? 0.7 : isActive ? 0.4 : 1}
              markerEnd={isDone ? 'url(#dotDone)' : undefined}
            />
          );
        })}

        {modules.map((mod, i) => {
          const x = cx(i); const y = cy(i);
          const status = statuses[i];
          const isDone = status === 'COMPLETED';
          const isActive = status === 'IN_PROGRESS';
          const isLocked = status === 'LOCKED';
          const isLast = i === modules.length - 1;
          const canNavigate = isDone || isActive;
          const side = cardSide(i);
          const labelX = side === 'left' ? x + NODE_R + 12 : x - NODE_R - 12;
          const labelAnchor = side === 'left' ? 'start' : 'end';

          return (
            <g key={mod.id}>
              {isActive && !isCompleted && (
                <circle cx={x} cy={y} r={NODE_R + 8} fill="rgba(34,211,238,0.08)" className={styles.pulseRing} />
              )}
              <circle cx={x} cy={y} r={NODE_R + 3}
                fill={isDone ? 'rgba(34,211,238,0.05)' : isActive ? 'rgba(34,211,238,0.08)' : 'rgba(255,255,255,0.02)'}
              />
              <circle
                cx={x} cy={y} r={NODE_R}
                fill={isDone ? 'rgba(34,211,238,0.14)' : isActive ? 'rgba(34,211,238,0.2)' : '#080f1e'}
                stroke={isDone ? '#22d3ee' : isActive ? '#22d3ee' : '#1a2740'}
                strokeWidth={isActive ? 2.5 : 1.5}
                style={{ cursor: canNavigate ? 'pointer' : 'default' }}
                onClick={() => canNavigate && router.push(`/paths/custom/${userPathId}/modules/${mod.id}`)}
              />
              <text x={labelX} y={y - 8} textAnchor={labelAnchor} fontSize={10}
                fill="rgba(255,255,255,0.1)" fontFamily="inherit">
                {String(i + 1).padStart(2, '0')}
              </text>
              <text x={labelX} y={y + 8} textAnchor={labelAnchor} fontSize={11}
                fill={isDone ? '#334155' : isActive ? '#64748b' : '#1e2d4a'} fontFamily="inherit">
                {mod.durationDays}d
              </text>
              <foreignObject x={x - 65} y={y + NODE_R + 6} width={130} height={44} style={{ pointerEvents: 'none' }}>
                <p style={{
                  margin: 0, fontSize: 11, fontWeight: 500, textAlign: 'center',
                  lineHeight: 1.4, fontFamily: 'inherit',
                  color: isDone ? '#334155' : isActive ? '#cbd5e1' : '#1e2d4a',
                }}>
                  {mod.title}
                </p>
              </foreignObject>
              <foreignObject x={x - 13} y={y - 13} width={26} height={26} style={{ pointerEvents: 'none' }}>
                <div style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isDone && <CheckCircle2 size={20} color="#22D3EE" />}
                  {isActive && !isCompleted && <Play size={18} color="#22D3EE" fill="#22D3EE" />}
                  {isLocked && !isLast && <Lock size={16} color="#1a2740" />}
                  {isLocked && isLast && <Star size={18} color="#1a2740" />}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {modules.map((mod, i) => {
        if (statuses[i] !== 'IN_PROGRESS' || isCompleted) return null;
        const x = cx(i); const y = cy(i);
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
              onClick={() => router.push(`/paths/custom/${userPathId}/modules/${mod.id}`)}
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

export default function CustomPathDetailClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: path, isLoading, isError } = useQuery({
    queryKey: ['customPath', id],
    queryFn: () => customPathsApi.getById(id),
  });

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.skeleton} style={{ height: 32, width: 120, marginBottom: 24 }} />
          <div className={styles.skeleton} style={{ height: 120 }} />
          <div className={styles.skeleton} style={{ height: 500, marginTop: 16 }} />
        </div>
      </div>
    );
  }

  if (isError || !path) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.errorState}>
            <p>No se pudo cargar esta ruta personalizada.</p>
            <button onClick={() => router.push('/paths')} type="button">Volver al catálogo</button>
          </div>
        </div>
      </div>
    );
  }

  const resolved = resolveSubjectFromTitle(path.title);
  const isCompleted = path.status === 'COMPLETED';
  const isActive = path.status === 'ACTIVE';
  const modules = path.modules;
  const completedCount = path.progress.completed;
  const totalModules = path.progress.total;
  const progressPct = path.progress.percentage;

  return (
    <div className={styles.page}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.content}>
        <button className={styles.back} onClick={() => router.push('/paths')} type="button">
          <ArrowLeft size={15} /> Volver al catálogo
        </button>

        <div className={styles.hero}>
          <div className={styles.heroIcon}>
            {resolved.iconUrl
              ? <img src={resolved.iconUrl} alt={resolved.name} />
              : <Zap size={28} color="#22d3ee" />
            }
          </div>
          <div className={styles.heroInfo}>
            <div className={styles.heroTop}>
              <span className={styles.badgeCustom}>Mi Ruta</span>
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
          </div>
        </div>

        <div className={styles.metaRow}>
          <div className={styles.metaChip}><BookOpen size={14} /><span>{totalModules} módulos</span></div>
          <div className={styles.metaChip}><Clock size={14} /><span>{path.weeklyHours}h / semana</span></div>
        </div>

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
              <span>{completedCount} de {totalModules} módulos completados</span>
            </div>
          </div>
        )}

        {isCompleted && (
          <div className={styles.completionBlock}>
            <div className={styles.completionLeft}>
              <div className={styles.completionTrophy}><Trophy size={32} color="#f59e0b" /></div>
            </div>
            <div className={styles.completionRight}>
              <p className={styles.completionTitle}>¡Ruta completada!</p>
              <p className={styles.completionSub}>
                Terminaste todos los {totalModules} módulos. Es un logro real — pocos llegan hasta aquí.
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

        <p className={styles.sectionTitle}>
          {isCompleted ? 'Módulos completados' : 'Tu camino'}
        </p>

        <PathMap
          modules={modules}
          progress={path.moduleProgress}
          isCompleted={isCompleted}
          userPathId={id}
        />
      </div>
    </div>
  );
}