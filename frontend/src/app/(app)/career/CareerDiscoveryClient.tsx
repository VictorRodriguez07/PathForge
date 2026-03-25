'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { careersApi } from '@/api';
import {
  CareerDiscoveryInput,
  CareerDiscoveryResponse,
  ExperienceLevel,
  WorkPreference,
  CareerObjective,
  KnownTechnology,
  ProjectType,
  Industry,
} from '@/types';
import {
  EXPERIENCE_LEVEL_OPTIONS,
  TECHNOLOGY_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  WORK_PREFERENCE_OPTIONS,
  OBJECTIVE_OPTIONS,
  INDUSTRY_OPTIONS,
  MARKET_DEMAND_LABELS,
  REMOTE_LABELS,
} from '@/lib/career-constants';
import {
  Clock,
  TrendingUp,
  DollarSign,
  Globe,
  Layers,
  RefreshCw,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Wifi,
  WifiOff,
} from 'lucide-react';
import styles from './CareerDiscoveryClient.module.css';

const TOTAL_STEPS = 4;

interface FormState {
  experienceLevel: ExperienceLevel | null;
  knownTechnologies: KnownTechnology[];
  projectTypes: ProjectType[];
  workPreference: WorkPreference | null;
  objective: CareerObjective | null;
  industries: Industry[];
  weeklyHours: number;
  openToRemote: boolean;
}

const INITIAL_STATE: FormState = {
  experienceLevel: null,
  knownTechnologies: [],
  projectTypes: [],
  workPreference: null,
  objective: null,
  industries: [],
  weeklyHours: 15,
  openToRemote: true,
};

function StepIndicator({ current }: { current: number }) {
  const steps = ['Experiencia', 'Intereses', 'Objetivo', 'Disponibilidad'];
  return (
    <div className={styles.steps}>
      {steps.map((label, i) => {
        const idx = i + 1;
        const isDone = idx < current;
        const isActive = idx === current;
        return (
          <div key={label} className={styles.stepItem}>
            <div className={`${styles.stepCircle} ${isDone ? styles.stepDone : isActive ? styles.stepActive : styles.stepIdle}`}>
              {isDone ? (
                <CheckCircle2 size={13} strokeWidth={2.5} />
              ) : (
                <span>{idx}</span>
              )}
            </div>
            <span className={`${styles.stepLabel} ${isDone ? styles.stepLabelDone : isActive ? styles.stepLabelActive : styles.stepLabelIdle}`}>
              {label}
            </span>
            {i < steps.length - 1 && (
              <div className={`${styles.stepLine} ${isDone ? styles.stepLineDone : styles.stepLineIdle}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Step1({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.stepQLabel}>Paso 1 de 4</div>
      <h2 className={styles.stepTitle}>¿Cuál es tu nivel de experiencia en programación?</h2>
      <p className={styles.stepSub}>Sé honesto — esto nos ayuda a darte recomendaciones reales y alcanzables.</p>
      <div className={styles.levelGrid}>
        {EXPERIENCE_LEVEL_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.levelCard} ${form.experienceLevel === opt.value ? styles.levelCardSel : ''}`}
            onClick={() => setForm({ ...form, experienceLevel: opt.value as ExperienceLevel })}
          >
            <div className={styles.levelCardName}>{opt.label}</div>
            <div className={styles.levelCardDesc}>{opt.desc}</div>
          </button>
        ))}
      </div>

      <div className={styles.techSection}>
        <div className={styles.sectionLabel}>Tecnologías que ya conoces <span className={styles.optional}>(opcional)</span></div>
        <div className={styles.chips}>
          {TECHNOLOGY_OPTIONS.map((tech) => {
            const selected = form.knownTechnologies.includes(tech.value as KnownTechnology);
            return (
              <button
                key={tech.value}
                type="button"
                className={`${styles.chip} ${selected ? styles.chipSel : ''}`}
                onClick={() => {
                  const techs = selected
                    ? form.knownTechnologies.filter((t) => t !== tech.value)
                    : [...form.knownTechnologies, tech.value as KnownTechnology];
                  setForm({ ...form, knownTechnologies: techs });
                }}
              >
                {tech.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step2({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.stepQLabel}>Paso 2 de 4</div>
      <h2 className={styles.stepTitle}>¿Qué tipo de proyectos te emocionan?</h2>
      <p className={styles.stepSub}>Selecciona todos los que apliquen. Esto define el camino que más disfrutarás.</p>

      <div className={styles.sectionLabel}>Tipos de proyecto <span className={styles.required}>*</span></div>
      <div className={styles.iconChips}>
        {PROJECT_TYPE_OPTIONS.map((opt) => {
          const selected = form.projectTypes.includes(opt.value as ProjectType);
          const Icon = opt.Icon;
          return (
            <button
              key={opt.value}
              type="button"
              className={`${styles.iconChip} ${selected ? styles.iconChipSel : ''}`}
              onClick={() => {
                const types = selected
                  ? form.projectTypes.filter((t) => t !== opt.value)
                  : [...form.projectTypes, opt.value as ProjectType];
                setForm({ ...form, projectTypes: types });
              }}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.sectionLabel} style={{ marginTop: 24 }}>¿Con qué tipo de trabajo te identificas más? <span className={styles.required}>*</span></div>
      <div className={styles.prefCards}>
        {WORK_PREFERENCE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.prefCard} ${form.workPreference === opt.value ? styles.prefCardSel : ''}`}
            onClick={() => setForm({ ...form, workPreference: opt.value as WorkPreference })}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step3({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.stepQLabel}>Paso 3 de 4</div>
      <h2 className={styles.stepTitle}>¿Cuál es tu objetivo principal?</h2>
      <p className={styles.stepSub}>Tu objetivo define la urgencia y enfoque de tu ruta de aprendizaje.</p>

      <div className={styles.objectiveCards}>
        {OBJECTIVE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.objectiveCard} ${form.objective === opt.value ? styles.objectiveCardSel : ''}`}
            onClick={() => setForm({ ...form, objective: opt.value as CareerObjective })}
          >
            <div className={styles.objectiveCheck}>
              {form.objective === opt.value && <CheckCircle2 size={16} color="#3B82F6" />}
            </div>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.sectionLabel} style={{ marginTop: 24 }}>¿En qué industrias te gustaría trabajar? <span className={styles.required}>*</span></div>
      <div className={styles.iconChips}>
        {INDUSTRY_OPTIONS.map((opt) => {
          const selected = form.industries.includes(opt.value as Industry);
          const Icon = opt.Icon;
          return (
            <button
              key={opt.value}
              type="button"
              className={`${styles.iconChip} ${selected ? styles.iconChipSel : ''}`}
              onClick={() => {
                const inds = selected
                  ? form.industries.filter((i) => i !== opt.value)
                  : [...form.industries, opt.value as Industry];
                setForm({ ...form, industries: inds });
              }}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step4({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.stepQLabel}>Paso 4 de 4</div>
      <h2 className={styles.stepTitle}>¿Cuánto tiempo puedes dedicar?</h2>
      <p className={styles.stepSub}>Esto nos permite calcular estimaciones de tiempo reales para tu caso.</p>

      <div className={styles.hoursSection}>
        <div className={styles.hoursDisplay}>
          <span className={styles.hoursNum}>{form.weeklyHours}</span>
          <span className={styles.hoursUnit}>horas por semana</span>
        </div>
        <input
          type="range"
          min={5}
          max={40}
          step={1}
          value={form.weeklyHours}
          onChange={(e) => setForm({ ...form, weeklyHours: Number(e.target.value) })}
          className={styles.hoursSlider}
        />
        <div className={styles.hoursHints}>
          <span>5h — A tu ritmo</span>
          <span>20h — Dedicación media</span>
          <span>40h — Tiempo completo</span>
        </div>
      </div>

      <div className={styles.remoteSection}>
        <div className={styles.remoteLabel}>
          <div className={styles.remoteLabelText}>
            <span className={styles.remoteLabelTitle}>¿Estás abierto a trabajo remoto?</span>
            <span className={styles.remoteLabelDesc}>Amplia las oportunidades laborales internacionales</span>
          </div>
          <button
            type="button"
            className={`${styles.toggle} ${form.openToRemote ? styles.toggleOn : ''}`}
            onClick={() => setForm({ ...form, openToRemote: !form.openToRemote })}
            aria-label="Toggle trabajo remoto"
          >
            <div className={styles.toggleKnob} />
          </button>
        </div>
        <div className={styles.remoteHint}>
          {form.openToRemote ? (
            <><Wifi size={13} color="#10B981" /> <span style={{ color: '#10B981' }}>Abierto a trabajo remoto e internacional</span></>
          ) : (
            <><WifiOff size={13} color="#3D4A62" /> <span style={{ color: '#3D4A62' }}>Solo trabajo presencial o local</span></>
          )}
        </div>
      </div>
    </div>
  );
}

function canProceed(step: number, form: FormState): boolean {
  if (step === 1) return form.experienceLevel !== null;
  if (step === 2) return form.projectTypes.length > 0 && form.workPreference !== null;
  if (step === 3) return form.objective !== null && form.industries.length > 0;
  return true;
}

function ResultsBadge({ value, type }: { value: string; type: 'demand' | 'remote' }) {
  const isGreen = type === 'demand'
    ? value === 'very_high'
    : value === 'excellent';
  const isAmber = type === 'demand'
    ? value === 'high'
    : value === 'good';
  const label = type === 'demand' ? MARKET_DEMAND_LABELS[value] : REMOTE_LABELS[value];
  return (
    <span className={`${styles.dataBadge} ${isGreen ? styles.dataBadgeGreen : isAmber ? styles.dataBadgeAmber : styles.dataBadgeMuted}`}>
      {label}
    </span>
  );
}

function ResultsView({
  results,
  onRedo,
}: {
  results: CareerDiscoveryResponse;
  onRedo: () => void;
}) {
  const router = useRouter();
  const rankMeta = [
    { badge: 'Mejor match', badgeClass: styles.badgeGold },
    { badge: 'Alta compatibilidad', badgeClass: styles.badgeSilver },
    { badge: 'Alternativa', badgeClass: styles.badgeBronze },
  ];

  const handleCreatePath = (career: string) => {
    router.push(`/paths?career=${career}`);
  };

  return (
    <div className={styles.resultsWrap}>
      <div className={styles.resultsTop}>
        <div>
          <div className={styles.resultsBadge}>
            <CheckCircle2 size={12} />
            Análisis completado
          </div>
          <h1 className={styles.resultsTitle}>Estas son tus carreras ideales</h1>
          <p className={styles.resultsSub}>
            Basado en tu experiencia, intereses y objetivos. Elige la que más resuene contigo.
          </p>
        </div>
        <button className={styles.redoBtn} onClick={onRedo} type="button">
          <RefreshCw size={13} />
          Repetir análisis
        </button>
      </div>

      <div className={styles.careersGrid}>
        {results.recommendations.map((rec, i) => {
          const meta = rankMeta[i] ?? rankMeta[2];
          const isTop = i === 0;
          return (
            <article
              key={rec.career}
              className={`${styles.careerCard} ${isTop ? styles.careerCardTop : i === 1 ? styles.careerCardSecond : styles.careerCardThird}`}
            >
              <div className={styles.cardTopBar}>
                <span className={styles.rankLabel}>#{i + 1} recomendación</span>
                <span className={`${styles.rankBadge} ${meta.badgeClass}`}>{meta.badge}</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.careerName}>{rec.title}</h3>

                <div className={styles.scoreSection}>
                  <div className={`${styles.scoreBig} ${isTop ? styles.scoreBigBlue : i === 1 ? styles.scoreBigGray : styles.scoreBigDim}`}>
                    {rec.score}
                  </div>
                  <div className={styles.scoreInfo}>
                    <div className={styles.scoreInfoLabel}>Compatibilidad con tu perfil</div>
                    <div className={styles.compatBar}>
                      <div
                        className={styles.compatFill}
                        style={{
                          width: `${rec.compatibility}%`,
                          background: isTop ? '#3B82F6' : i === 1 ? '#7C8DB0' : '#3D4A62',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.dataRows}>
                  <div className={styles.dataRow}>
                    <span className={styles.dataKey}><Clock size={12} />Tiempo estimado</span>
                    <span className={styles.dataVal}>{rec.estimatedMonths} meses</span>
                  </div>
                  <div className={styles.dataRow}>
                    <span className={styles.dataKey}><TrendingUp size={12} />Demanda laboral</span>
                    <ResultsBadge value={rec.marketDemand} type="demand" />
                  </div>
                  <div className={styles.dataRow}>
                    <span className={styles.dataKey}><DollarSign size={12} />Salario promedio</span>
                    <span className={styles.dataVal}>{rec.averageSalary}</span>
                  </div>
                  <div className={styles.dataRow}>
                    <span className={styles.dataKey}><Globe size={12} />Trabajo remoto</span>
                    <ResultsBadge value={rec.remoteOpportunities} type="remote" />
                  </div>
                </div>

                {rec.gapAnalysis.length > 0 && (
                  <div className={styles.gapSection}>
                    <div className={styles.gapTitle}>
                      <Layers size={11} />
                      Lo que necesitas aprender
                    </div>
                    <div className={styles.gapChips}>
                      {rec.gapAnalysis.map((gap) => (
                        <span key={gap} className={styles.gapChip}>{gap}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.cardCta}>
                <button
                  className={`${styles.ctaMain} ${isTop ? styles.ctaMainActive : styles.ctaMainInactive}`}
                  onClick={() => handleCreatePath(rec.career)}
                  type="button"
                >
                  Crear mi ruta →
                </button>
                <button className={styles.ctaSec} type="button">
                  Ver más
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default function CareerDiscoveryClient() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [results, setResults] = useState<CareerDiscoveryResponse | null>(null);

  const { mutate: discover, isPending, error } = useMutation({
    mutationFn: (input: CareerDiscoveryInput) => careersApi.discover(input),
    onSuccess: (data) => setResults(data),
  });

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      discover({
        experienceLevel: form.experienceLevel!,
        knownTechnologies: form.knownTechnologies,
        projectTypes: form.projectTypes,
        workPreference: form.workPreference!,
        weeklyHours: form.weeklyHours,
        objective: form.objective!,
        industries: form.industries,
        openToRemote: form.openToRemote,
      });
    }
  };

  const handleRedo = () => {
    setResults(null);
    setStep(1);
    setForm(INITIAL_STATE);
  };

  if (results) {
    return (
      <div className={styles.page}>
        <div className={styles.bgOrb1} aria-hidden="true" />
        <div className={styles.bgOrb2} aria-hidden="true" />
        <ResultsView results={results} onRedo={handleRedo} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgOrb1} aria-hidden="true" />
      <div className={styles.bgOrb2} aria-hidden="true" />

      <div className={styles.formWrap}>
        <StepIndicator current={step} />

        {step === 1 && <Step1 form={form} setForm={setForm} />}
        {step === 2 && <Step2 form={form} setForm={setForm} />}
        {step === 3 && <Step3 form={form} setForm={setForm} />}
        {step === 4 && <Step4 form={form} setForm={setForm} />}

        {error && (
          <div className={styles.errorBanner} role="alert">
            Error al procesar tu perfil. Intenta de nuevo.
          </div>
        )}

        <div className={styles.btnRow}>
          {step > 1 && (
            <button
              className={styles.btnGhost}
              onClick={() => setStep(step - 1)}
              type="button"
            >
              <ChevronLeft size={15} /> Atrás
            </button>
          )}
          <button
            className={styles.btnPrimary}
            onClick={handleNext}
            disabled={!canProceed(step, form) || isPending}
            type="button"
          >
            {isPending ? 'Analizando tu perfil...' : step === TOTAL_STEPS ? 'Ver mis resultados →' : 'Continuar'}
            {!isPending && step < TOTAL_STEPS && <ChevronRight size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}