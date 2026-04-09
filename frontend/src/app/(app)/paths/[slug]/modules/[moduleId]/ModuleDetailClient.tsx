'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Lock,
} from 'lucide-react';
import { learningPathsApi } from '@/api';
import { QUERY_KEYS } from '@/lib/constants';
import styles from './ModuleDetailClient.module.css';

interface Props {
  slug: string;
  moduleId: string;
}

export default function ModuleDetailClient({ slug, moduleId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: path, isLoading: loadingPath } = useQuery({
    queryKey: QUERY_KEYS.learningPath(slug),
    queryFn: () => learningPathsApi.getBySlug(slug),
  });

  const { data: progress, isLoading: loadingProgress, isError: progressError } = useQuery({
    queryKey: QUERY_KEYS.learningPathProgress(slug),
    queryFn: () => learningPathsApi.getProgress(slug),
    retry: false,
  });

  const completeMutation = useMutation({
    mutationFn: () => learningPathsApi.completeModule(progress!.pathId, moduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.learningPathProgress(slug) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myLearningPaths() });
      toast.success('¡Módulo completado! Sigue avanzando.');
      router.push(`/paths/${slug}`);
    },
    onError: () => toast.error('No se pudo marcar el módulo como completado.'),
  });

  const isEnrolled = !!progress && !progressError && progress.status === 'ACTIVE';
  const modules = (path?.modules ?? []).slice().sort((a, b) => a.orderIndex - b.orderIndex);
  const currentIndex = modules.findIndex((m) => m.id === moduleId);
  const currentModule = modules[currentIndex];
  const nextModule = modules[currentIndex + 1] ?? null;
  const prevModule = modules[currentIndex - 1] ?? null;

  const moduleProgressEntry = progress?.modules.find((m) => m.moduleId === moduleId);
  const isCompleted = moduleProgressEntry?.status === 'COMPLETED';
  const isActive = moduleProgressEntry?.status === 'IN_PROGRESS' || currentIndex === 0;

  if (loadingPath || loadingProgress) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.skeleton} style={{ height: 32, width: 140, marginBottom: 24 }} />
          <div className={styles.skeleton} style={{ height: 80 }} />
          <div className={styles.skeleton} style={{ height: 200, marginTop: 16 }} />
          <div className={styles.skeleton} style={{ height: 200, marginTop: 16 }} />
        </div>
      </div>
    );
  }

  if (!currentModule || !path) {
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <div className={styles.errorState}>
            <p>Módulo no encontrado.</p>
            <button onClick={() => router.push(`/paths/${slug}`)} type="button">
              Volver a la ruta
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

        {/* Back + breadcrumb */}
        <button className={styles.back} onClick={() => router.push(`/paths/${slug}`)} type="button">
          <ArrowLeft size={15} />
          {path.title}
        </button>

        {/* Module header */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.moduleNum}>Módulo {currentIndex + 1} de {modules.length}</span>
            {isCompleted && (
              <span className={styles.completedBadge}>
                <CheckCircle2 size={12} />
                Completado
              </span>
            )}
          </div>
          <h1 className={styles.title}>{currentModule.title}</h1>
          {currentModule.description && (
            <p className={styles.desc}>{currentModule.description}</p>
          )}
          <div className={styles.metaRow}>
            <div className={styles.metaChip}>
              <Clock size={13} />
              <span>{currentModule.durationDays} días estimados</span>
            </div>
          </div>
        </div>

        {/* Module map — position in path */}
        <div className={styles.pathStrip}>
          {modules.map((mod, i) => {
            const entry = progress?.modules.find((m) => m.moduleId === mod.id);
            const isCurrent = mod.id === moduleId;
            const isDone = entry?.status === 'COMPLETED';
            const isAccessible = isDone || isCurrent || (i === 0);

            return (
              <button
                key={mod.id}
                className={`${styles.stripNode} ${isCurrent ? styles.stripActive : ''} ${isDone ? styles.stripDone : ''} ${!isAccessible ? styles.stripLocked : ''}`}
                onClick={() => isAccessible && router.push(`/paths/${slug}/modules/${mod.id}`)}
                disabled={!isAccessible}
                type="button"
                title={mod.title}
              >
                {isDone ? (
                  <CheckCircle2 size={14} />
                ) : !isAccessible ? (
                  <Lock size={12} />
                ) : (
                  <span className={styles.stripNum}>{i + 1}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content area */}
        <div className={styles.moduleContent}>
          <div className={styles.contentPlaceholder}>
            <div className={styles.placeholderIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
              </svg>
            </div>
            <p className={styles.placeholderTitle}>Contenido del módulo</p>
            <p className={styles.placeholderDesc}>
              El material de estudio para este módulo estará disponible próximamente. Mientras tanto, puedes investigar los conceptos de <strong>{currentModule.title}</strong> por tu cuenta.
            </p>
          </div>
        </div>

        {/* Action footer */}
        <div className={styles.footer}>
          {/* Previous */}
          <div className={styles.footerLeft}>
            {prevModule && (
              <button
                className={styles.navBtn}
                onClick={() => router.push(`/paths/${slug}/modules/${prevModule.id}`)}
                type="button"
              >
                <ArrowLeft size={14} />
                Anterior
              </button>
            )}
          </div>

          {/* Complete CTA */}
          <div className={styles.footerCenter}>
            {isEnrolled && !isCompleted && (
              <button
                className={styles.completeBtn}
                onClick={() => completeMutation.mutate()}
                disabled={completeMutation.isPending}
                type="button"
              >
                {completeMutation.isPending ? (
                  <Loader2 size={14} className={styles.spin} />
                ) : (
                  <CheckCircle2 size={14} />
                )}
                Marcar como completado
              </button>
            )}
            {isCompleted && (
              <div className={styles.completedState}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>Módulo completado</span>
              </div>
            )}
          </div>

          {/* Next */}
          <div className={styles.footerRight}>
            {nextModule && (
              <button
                className={styles.navBtn}
                onClick={() => {
                  if (isCompleted) router.push(`/paths/${slug}/modules/${nextModule.id}`);
                  else toast.warning('Completa este módulo primero.');
                }}
                type="button"
              >
                Siguiente
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}