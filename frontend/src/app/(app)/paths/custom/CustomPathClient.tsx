'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  ArrowLeft, ArrowRight, Check, Loader2,
  Zap, Clock, BookOpen, Target, ChevronRight,
} from 'lucide-react';
import { customPathsApi } from '@/api';
import {
  SubjectSlug, CurrentLevel, Objective,
  CustomPathInput, GeneratedPath,
} from '@/types';
import styles from './CustomPathClient.module.css';

// ─── Step config ──────────────────────────────────
const SUBJECTS: { slug: SubjectSlug; label: string; iconUrl: string }[] = [
  { slug: 'javascript', label: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { slug: 'typescript', label: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { slug: 'react',      label: 'React',      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { slug: 'nodejs',     label: 'Node.js',    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { slug: 'python',     label: 'Python',     iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { slug: 'aws',        label: 'AWS',        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
];

const LEVELS: { value: CurrentLevel; label: string; desc: string }[] = [
  { value: 'none',         label: 'Sin experiencia', desc: 'Nunca he trabajado con esta tecnología' },
  { value: 'beginner',     label: 'Principiante',    desc: 'Conozco los conceptos básicos' },
  { value: 'intermediate', label: 'Intermedio',      desc: 'Puedo construir cosas funcionales' },
  { value: 'advanced',     label: 'Avanzado',        desc: 'Lo uso en proyectos reales' },
];

const OBJECTIVES: { value: Objective; label: string; desc: string }[] = [
  { value: 'get_job',        label: 'Conseguir empleo',     desc: 'Quiero trabajar con esta tecnología' },
  { value: 'personal_project', label: 'Proyecto personal',  desc: 'Tengo algo específico que quiero construir' },
  { value: 'certification',  label: 'Certificación',        desc: 'Prepararme para un examen oficial' },
  { value: 'specialize',     label: 'Especializarme',       desc: 'Profundizar más allá de lo básico' },
  { value: 'improve_job',    label: 'Mejorar en mi trabajo', desc: 'Soy más efectivo en mi rol actual' },
];

const WEEKLY_HOURS = [5, 8, 10, 15, 20];

// ─── Step indicator ───────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className={styles.stepIndicator}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`${styles.stepDot} ${i < current ? styles.stepDotDone : ''} ${i === current ? styles.stepDotActive : ''}`}
        />
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────
export default function CustomPathClient() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Form state
  const [subject, setSubject] = useState<SubjectSlug | null>(null);
  const [level, setLevel] = useState<CurrentLevel | null>(null);
  const [objective, setObjective] = useState<Objective | null>(null);
  const [weeklyHours, setWeeklyHours] = useState<number>(10);
  const [masteredConcepts, setMasteredConcepts] = useState<string[]>([]);
  const [generatedPath, setGeneratedPath] = useState<GeneratedPath | null>(null);

  // Concepts query — fires when subject is selected
  const { data: conceptsData, isLoading: loadingConcepts } = useQuery({
    queryKey: ['concepts', subject],
    queryFn: () => customPathsApi.getConcepts(subject!),
    enabled: !!subject && step === 2,
  });

  const generateMutation = useMutation({
    mutationFn: (input: CustomPathInput) => customPathsApi.generate(input),
    onSuccess: (data) => {
      setGeneratedPath(data.generatedPath);
      setStep(3);
    },
    onError: () => toast.error('No se pudo generar la ruta. Intenta de nuevo.'),
  });

  const confirmMutation = useMutation({
    mutationFn: () => customPathsApi.confirm({
      input: {
        subjectSlug: subject!,
        currentLevel: level!,
        objective: objective!,
        weeklyHours,
        masteredConcepts,
      },
      generatedPath: generatedPath!,
    }),
    onSuccess: () => {
      toast.success('¡Tu ruta personalizada está lista!');
      router.push('/paths');
    },
    onError: () => toast.error('No se pudo confirmar la ruta. Intenta de nuevo.'),
  });

  function handleGenerate() {
    if (!subject || !level || !objective) return;
    generateMutation.mutate({
      subjectSlug: subject,
      currentLevel: level,
      objective,
      weeklyHours,
      masteredConcepts,
    });
  }

  function toggleConcept(slug: string) {
    setMasteredConcepts((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  const canAdvance = [
    !!subject,
    !!level && !!objective,
    true, // concepts step always advanceable
  ][step] ?? false;

  // ── Step 0: Selección de tecnología ──
  if (step === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <button className={styles.back} onClick={() => router.push('/paths')} type="button">
            <ArrowLeft size={15} /> Volver al catálogo
          </button>

          <div className={styles.header}>
            <div className={styles.headerBadge}><Zap size={12} /> Ruta personalizada</div>
            <h1 className={styles.headerTitle}>¿Qué tecnología quieres aprender?</h1>
            <p className={styles.headerDesc}>Selecciona la tecnología y generamos una ruta adaptada a tu nivel y objetivos.</p>
          </div>

          <StepIndicator current={0} total={4} />

          <div className={styles.subjectGrid}>
            {SUBJECTS.map((s) => (
              <button
                key={s.slug}
                className={`${styles.subjectCard} ${subject === s.slug ? styles.subjectCardActive : ''}`}
                onClick={() => setSubject(s.slug)}
                type="button"
              >
                <img src={s.iconUrl} alt={s.label} className={styles.subjectIcon} />
                <span className={styles.subjectLabel}>{s.label}</span>
                {subject === s.slug && <div className={styles.subjectCheck}><Check size={12} /></div>}
              </button>
            ))}
          </div>

          <div className={styles.footer}>
            <button
              className={styles.nextBtn}
              onClick={() => setStep(1)}
              disabled={!canAdvance}
              type="button"
            >
              Siguiente <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 1: Nivel y objetivo ──
  if (step === 1) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <button className={styles.back} onClick={() => setStep(0)} type="button">
            <ArrowLeft size={15} /> Atrás
          </button>

          <div className={styles.header}>
            <h1 className={styles.headerTitle}>Tu punto de partida</h1>
            <p className={styles.headerDesc}>Esto nos ayuda a saltarnos lo que ya sabes y enfocarnos en lo que necesitas.</p>
          </div>

          <StepIndicator current={1} total={4} />

          <p className={styles.fieldLabel}>¿Cuál es tu nivel actual en {subject}?</p>
          <div className={styles.optionList}>
            {LEVELS.map((l) => (
              <button
                key={l.value}
                className={`${styles.optionCard} ${level === l.value ? styles.optionCardActive : ''}`}
                onClick={() => setLevel(l.value)}
                type="button"
              >
                <div className={styles.optionCheck}>
                  {level === l.value && <Check size={12} />}
                </div>
                <div className={styles.optionBody}>
                  <p className={styles.optionTitle}>{l.label}</p>
                  <p className={styles.optionDesc}>{l.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <p className={styles.fieldLabel} style={{ marginTop: '1.75rem' }}>¿Cuál es tu objetivo principal?</p>
          <div className={styles.optionList}>
            {OBJECTIVES.map((o) => (
              <button
                key={o.value}
                className={`${styles.optionCard} ${objective === o.value ? styles.optionCardActive : ''}`}
                onClick={() => setObjective(o.value)}
                type="button"
              >
                <div className={styles.optionCheck}>
                  {objective === o.value && <Check size={12} />}
                </div>
                <div className={styles.optionBody}>
                  <p className={styles.optionTitle}>{o.label}</p>
                  <p className={styles.optionDesc}>{o.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <p className={styles.fieldLabel} style={{ marginTop: '1.75rem' }}>
            ¿Cuántas horas por semana puedes dedicar?
          </p>
          <div className={styles.hoursRow}>
            {WEEKLY_HOURS.map((h) => (
              <button
                key={h}
                className={`${styles.hourBtn} ${weeklyHours === h ? styles.hourBtnActive : ''}`}
                onClick={() => setWeeklyHours(h)}
                type="button"
              >
                {h}h
              </button>
            ))}
          </div>

          <div className={styles.footer}>
            <button
              className={styles.nextBtn}
              onClick={() => setStep(2)}
              disabled={!canAdvance}
              type="button"
            >
              Siguiente <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 2: Conceptos dominados ──
  if (step === 2) {
    const allConcepts = conceptsData
      ? [
          ...conceptsData.concepts.BEGINNER,
          ...conceptsData.concepts.INTERMEDIATE,
          ...conceptsData.concepts.ADVANCED,
        ]
      : [];

    const levelOrder = { BEGINNER: 0, INTERMEDIATE: 1, ADVANCED: 2 };
    const levelLabels = { BEGINNER: 'Principiante', INTERMEDIATE: 'Intermedio', ADVANCED: 'Avanzado' };
    const levelColors = {
      BEGINNER: styles.conceptLevelBeginner,
      INTERMEDIATE: styles.conceptLevelIntermediate,
      ADVANCED: styles.conceptLevelAdvanced,
    };

    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <button className={styles.back} onClick={() => setStep(1)} type="button">
            <ArrowLeft size={15} /> Atrás
          </button>

          <div className={styles.header}>
            <h1 className={styles.headerTitle}>¿Qué conceptos ya dominas?</h1>
            <p className={styles.headerDesc}>
              Marca los que ya conoces bien. Los saltaremos para que tu ruta empiece donde de verdad la necesitas.
            </p>
          </div>

          <StepIndicator current={2} total={4} />

          {loadingConcepts ? (
            <div className={styles.conceptsLoading}>
              <Loader2 size={20} className={styles.spin} />
              <span>Cargando conceptos...</span>
            </div>
          ) : allConcepts.length === 0 ? (
            <div className={styles.conceptsEmpty}>
              <p>No hay conceptos disponibles para esta tecnología aún.</p>
              <p style={{ fontSize: 12, color: '#334155', marginTop: 4 }}>
                Puedes continuar — generaremos la ruta completa.
              </p>
            </div>
          ) : (
            <div className={styles.conceptsList}>
              {(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const).map((lvl) => {
                const group = conceptsData?.concepts[lvl] ?? [];
                if (group.length === 0) return null;
                return (
                  <div key={lvl} className={styles.conceptGroup}>
                    <p className={`${styles.conceptGroupLabel} ${levelColors[lvl]}`}>
                      {levelLabels[lvl]}
                    </p>
                    <div className={styles.conceptItems}>
                      {group.map((c) => (
                        <button
                          key={c.slug}
                          className={`${styles.conceptChip} ${masteredConcepts.includes(c.slug) ? styles.conceptChipActive : ''}`}
                          onClick={() => toggleConcept(c.slug)}
                          type="button"
                        >
                          {masteredConcepts.includes(c.slug) && <Check size={11} />}
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {masteredConcepts.length > 0 && (
            <p className={styles.conceptsCount}>
              {masteredConcepts.length} concepto{masteredConcepts.length !== 1 ? 's' : ''} seleccionado{masteredConcepts.length !== 1 ? 's' : ''}
            </p>
          )}

          <div className={styles.footer}>
            <button
              className={styles.nextBtn}
              onClick={handleGenerate}
              disabled={generateMutation.isPending}
              type="button"
            >
              {generateMutation.isPending ? (
                <><Loader2 size={14} className={styles.spin} /> Generando ruta...</>
              ) : (
                <>Generar mi ruta <Zap size={14} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 3: Preview y confirmación ──
  if (step === 3 && generatedPath) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.content}>
          <button className={styles.back} onClick={() => setStep(2)} type="button">
            <ArrowLeft size={15} /> Ajustar preferencias
          </button>

          <div className={styles.header}>
            <div className={styles.headerBadge}><Check size={12} /> Tu ruta está lista</div>
            <h1 className={styles.headerTitle}>{generatedPath.title}</h1>
            <p className={styles.headerDesc}>{generatedPath.description}</p>
          </div>

          <StepIndicator current={3} total={4} />

          {/* Stats */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <BookOpen size={16} color="#3b82f6" />
              <span className={styles.statNum}>{generatedPath.totalModules}</span>
              <span className={styles.statLabel}>módulos</span>
            </div>
            <div className={styles.statCard}>
              <Clock size={16} color="#22d3ee" />
              <span className={styles.statNum}>{generatedPath.estimatedMonths}</span>
              <span className={styles.statLabel}>meses est.</span>
            </div>
            <div className={styles.statCard}>
              <Target size={16} color="#10b981" />
              <span className={styles.statNum}>{generatedPath.skippedModules}</span>
              <span className={styles.statLabel}>saltados</span>
            </div>
            <div className={styles.statCard}>
              <Zap size={16} color="#f59e0b" />
              <span className={styles.statNum}>{generatedPath.weeklyHours}h</span>
              <span className={styles.statLabel}>por semana</span>
            </div>
          </div>

          {generatedPath.skippedModules > 0 && (
            <div className={styles.skipNote}>
              <Check size={13} color="#10b981" />
              <span>
                Saltamos <strong>{generatedPath.skippedModules} módulo{generatedPath.skippedModules !== 1 ? 's' : ''}</strong> que ya dominas. Tu ruta empieza donde la necesitas.
              </span>
            </div>
          )}

          {/* Module list */}
          <p className={styles.fieldLabel} style={{ marginBottom: '0.75rem' }}>Módulos de tu ruta</p>
          <div className={styles.modulePreviewList}>
            {generatedPath.modules.map((mod, i) => (
              <div key={mod.moduleId} className={`${styles.modulePreview} ${mod.isNew ? styles.modulePreviewNew : ''}`}>
                <span className={styles.modulePreviewNum}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.modulePreviewBody}>
                  <p className={styles.modulePreviewTitle}>{mod.title}</p>
                  <p className={styles.modulePreviewMeta}>{mod.durationDays} días</p>
                </div>
                {mod.isNew && <span className={styles.newBadge}>Nuevo</span>}
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <button
              className={styles.confirmBtn}
              onClick={() => confirmMutation.mutate()}
              disabled={confirmMutation.isPending}
              type="button"
            >
              {confirmMutation.isPending ? (
                <><Loader2 size={14} className={styles.spin} /> Guardando...</>
              ) : (
                <>Empezar esta ruta <ChevronRight size={15} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}