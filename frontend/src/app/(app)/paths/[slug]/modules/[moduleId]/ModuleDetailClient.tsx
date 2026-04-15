'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRef } from 'react';
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

  function navigateConcept(next: number) {
  setActiveConceptIndex(next);
  setTimeout(() => {
    if (conceptBodyRef.current) {
      const top = conceptBodyRef.current.getBoundingClientRect().top + window.scrollY - 400;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, 50);
}
  

  
  const isEnrolled = !!progress && !progressError && progress.status === 'ACTIVE';
  const modules = (path?.modules ?? []).slice().sort((a, b) => a.orderIndex - b.orderIndex);
  const currentIndex = modules.findIndex((m) => m.id === moduleId);
  const currentModule = modules[currentIndex];
  const nextModule = modules[currentIndex + 1] ?? null;
  const prevModule = modules[currentIndex - 1] ?? null;

  const moduleProgressEntry = progress?.modules.find((m) => m.moduleId === moduleId);
  const isCompleted = moduleProgressEntry?.status === 'COMPLETED';
  const isActive = moduleProgressEntry?.status === 'IN_PROGRESS' || currentIndex === 0;
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const conceptBodyRef = useRef<HTMLDivElement>(null);

  const concepts = currentModule?.concepts?.map(({ concept }) => concept) ?? [];
  const activeConcept = concepts[activeConceptIndex] ?? null;

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
  {concepts.length > 0 && activeConcept ? (
    <div className={styles.conceptViewer}>

      {/* Tabs de navegación entre concepts */}
      {concepts.length > 1 && (
        <div className={styles.conceptTabs}>
          {concepts.map((c, i) => (
            <button
              key={c.id}
              className={`${styles.conceptTab} ${i === activeConceptIndex ? styles.conceptTabActive : ''}`}
              onClick={() => navigateConcept(i)}
            >
              <span className={styles.conceptTabNum}>{i + 1}</span>
              <span className={styles.conceptTabName}>{c.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Concept activo */}
      <div className={styles.conceptBody} ref={conceptBodyRef}>

        {/* Header del concept */}
        <div className={styles.conceptHeader}>
          <h2 className={styles.conceptTitle}>{activeConcept.name}</h2>
          {activeConcept.description && (
            <p className={styles.conceptLead}>{activeConcept.description}</p>
          )}
        </div>

        {/* Por qué importa */}
        {activeConcept.whyMatters && (
          <div className={`${styles.conceptSection} ${styles.sectionWhy}`}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionDot} style={{ background: '#f59e0b' }} />
              ¿Por qué importa?
            </div>
            <p className={styles.sectionText}>{activeConcept.whyMatters}</p>
          </div>
        )}

        {/* Explicación */}
        {activeConcept.explanation && (
          <div className={styles.conceptSection}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionDot} style={{ background: '#3b82f6' }} />
              Explicación
            </div>
            <p className={styles.sectionText}>{activeConcept.explanation}</p>
          </div>
        )}

        {/* Ejemplo de código */}
        {activeConcept.codeExample && (
          <div className={styles.conceptSection}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionDot} style={{ background: '#22d3ee' }} />
              Ejemplo de código
            </div>
            <div className={styles.codeWrapper}>
              <pre className={styles.codeBlock}>
                <code>{activeConcept.codeExample}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tips y errores en grid */}
        {(activeConcept.practicalTips.length > 0 || activeConcept.commonMistakes.length > 0) && (
          <div className={styles.tipsGrid}>
            {activeConcept.practicalTips.length > 0 && (
              <div className={`${styles.tipCard} ${styles.tipCardGreen}`}>
                <div className={styles.tipCardHeader}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Tips prácticos
                </div>
                <ul className={styles.tipList}>
                  {activeConcept.practicalTips.map((tip, i) => (
                    <li key={i} className={styles.tipItem}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeConcept.commonMistakes.length > 0 && (
              <div className={`${styles.tipCard} ${styles.tipCardRed}`}>
                <div className={styles.tipCardHeader}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Errores comunes
                </div>
                <ul className={styles.tipList}>
                  {activeConcept.commonMistakes.map((mistake, i) => (
                    <li key={i} className={styles.tipItem}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Navegación entre concepts */}
        {concepts.length > 1 && (
          <div className={styles.conceptNav}>
            <button
              className={styles.conceptNavBtn}
              onClick={() => navigateConcept(Math.max(0, activeConceptIndex - 1))}
              disabled={activeConceptIndex === 0}
            >
              ← Anterior
            </button>
            <span className={styles.conceptNavCount}>
              {activeConceptIndex + 1} / {concepts.length}
            </span>
            <button
              className={styles.conceptNavBtn}
             onClick={() => navigateConcept(Math.min(concepts.length - 1, activeConceptIndex + 1))}
              disabled={activeConceptIndex === concepts.length - 1}
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
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
  )}
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