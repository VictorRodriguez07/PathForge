'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ArrowLeft, Clock, CheckCircle2, ChevronRight, Loader2, Lock } from 'lucide-react';
import { useState, useRef } from 'react';
import { customPathsApi } from '@/api';
import { learningPathsApi } from '@/api';
import styles from './CustomModuleDetailClient.module.css';

interface Props {
  userPathId: string;
  moduleId: string;
}

export default function CustomModuleDetailClient({ userPathId, moduleId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: path, isLoading } = useQuery({
    queryKey: ['customPath', userPathId],
    queryFn: () => customPathsApi.getById(userPathId),
  });

  const completeMutation = useMutation({
    mutationFn: () => learningPathsApi.completeModule(userPathId, moduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customPath', userPathId] });
      queryClient.invalidateQueries({ queryKey: ['myLearningPaths'] });
      toast.success('¡Módulo completado! Sigue avanzando.');
      router.push(`/paths/custom/${userPathId}`);
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

  const modules = (path?.modules ?? []).slice().sort((a, b) => a.orderIndex - b.orderIndex);
  const currentIndex = modules.findIndex((m) => m.id === moduleId);
  const currentModule = modules[currentIndex];
  const nextModule = modules[currentIndex + 1] ?? null;
  const prevModule = modules[currentIndex - 1] ?? null;

  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const conceptBodyRef = useRef<HTMLDivElement>(null);
  const concepts = currentModule?.concepts?.map(({ concept }) => concept) ?? [];
  const activeConcept = concepts[activeConceptIndex] ?? null;

  const moduleProgressEntry = path?.moduleProgress.find((m) => m.moduleId === moduleId);
  const isCompleted = moduleProgressEntry?.status === 'COMPLETED';
  const isActive = path?.status === 'ACTIVE';

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.skeleton} style={{ height: 32, width: 140, marginBottom: 24 }} />
          <div className={styles.skeleton} style={{ height: 80 }} />
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
            <button onClick={() => router.push(`/paths/custom/${userPathId}`)} type="button">
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
        <button className={styles.back} onClick={() => router.push(`/paths/custom/${userPathId}`)} type="button">
          <ArrowLeft size={15} />
          {path.title}
        </button>

        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.moduleNum}>Módulo {currentIndex + 1} de {modules.length}</span>
            {isCompleted && (
              <span className={styles.completedBadge}>
                <CheckCircle2 size={12} /> Completado
              </span>
            )}
          </div>
          <h1 className={styles.title}>{currentModule.title}</h1>
          <div className={styles.metaRow}>
            <div className={styles.metaChip}>
              <Clock size={13} />
              <span>{currentModule.durationDays} días estimados</span>
            </div>
          </div>
        </div>

        <div className={styles.pathStrip}>
          {modules.map((mod, i) => {
            const entry = path.moduleProgress.find((m) => m.moduleId === mod.id);
            const isCurrent = mod.id === moduleId;
            const isDone = entry?.status === 'COMPLETED';
            const prevEntry = i > 0 ? path.moduleProgress.find((m) => m.moduleId === modules[i - 1].id) : null;
            const isAccessible = isDone || isCurrent || i === 0 || prevEntry?.status === 'COMPLETED';

            return (
              <button
                key={mod.id}
                className={`${styles.stripNode} ${isCurrent ? styles.stripActive : ''} ${isDone ? styles.stripDone : ''} ${!isAccessible ? styles.stripLocked : ''}`}
                onClick={() => isAccessible && router.push(`/paths/custom/${userPathId}/modules/${mod.id}`)}
                disabled={!isAccessible}
                type="button"
                title={mod.title}
              >
                {isDone ? <CheckCircle2 size={14} /> : !isAccessible ? <Lock size={12} /> : <span className={styles.stripNum}>{i + 1}</span>}
              </button>
            );
          })}
        </div>

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

        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            {prevModule && (
              <button className={styles.navBtn} onClick={() => router.push(`/paths/custom/${userPathId}/modules/${prevModule.id}`)} type="button">
                <ArrowLeft size={14} /> Anterior
              </button>
            )}
          </div>

          <div className={styles.footerCenter}>
            {isActive && !isCompleted && (
              <button
                className={styles.completeBtn}
                onClick={() => completeMutation.mutate()}
                disabled={completeMutation.isPending}
                type="button"
              >
                {completeMutation.isPending ? <Loader2 size={14} className={styles.spin} /> : <CheckCircle2 size={14} />}
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

          <div className={styles.footerRight}>
            {nextModule && (
              <button
                className={styles.navBtn}
                onClick={() => {
                  if (isCompleted) router.push(`/paths/custom/${userPathId}/modules/${nextModule.id}`);
                  else toast.warning('Completa este módulo primero.');
                }}
                type="button"
              >
                Siguiente <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}