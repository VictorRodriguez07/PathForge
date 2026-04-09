'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import {
  ArrowLeft, Play, Send, CheckCircle2, XCircle,
  Clock, Zap, Trophy, ChevronDown, Loader2, RotateCcw,
} from 'lucide-react';
import { exercisesApi } from '@/api';
import { RunResult, SubmissionStatus, SupportedLanguage } from '@/types';
import styles from './ExerciseDetailClient.module.css';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
};

const DEFAULT_CODE: Record<SupportedLanguage, string> = {
  javascript: `// Escribe tu solución aquí
function solution() {
  // Tu código
}`,
  typescript: `// Escribe tu solución aquí
function solution(): void {
  // Tu código
}`,
  python: `# Escribe tu solución aquí
def solution():
    # Tu código
    pass`,
};

const STATUS_CONFIG: Record<SubmissionStatus, { label: string; color: string; bg: string }> = {
  PENDING:             { label: 'Evaluando...',      color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  ACCEPTED:            { label: 'Aceptado',          color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  WRONG_ANSWER:        { label: 'Respuesta incorrecta', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  TIME_LIMIT_EXCEEDED: { label: 'Tiempo excedido',   color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  RUNTIME_ERROR:       { label: 'Error en ejecución', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  COMPILE_ERROR:       { label: 'Error de compilación', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
};

function MarkdownDescription({ text }: { text: string }) {
  // Render básico de markdown: code blocks, bold, inline code
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className={styles.codeBlock}>
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} className={styles.descBold}>{line.slice(2, -2)}</p>);
    } else if (line.trim() === '') {
      elements.push(<br key={i} />);
    } else {
      // inline code
      const parts = line.split(/(`[^`]+`)/g);
      elements.push(
        <p key={i} className={styles.descP}>
          {parts.map((part, j) =>
            part.startsWith('`') && part.endsWith('`')
              ? <code key={j} className={styles.inlineCode}>{part.slice(1, -1)}</code>
              : part
          )}
        </p>
      );
    }
    i++;
  }

  return <div className={styles.description}>{elements}</div>;
}

export default function ExerciseDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('javascript');
  const [code, setCode] = useState(DEFAULT_CODE['javascript']);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [runResults, setRunResults] = useState<RunResult[] | null>(null);
  const [runStats, setRunStats] = useState<{ passed: number; total: number } | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus | null>(null);
  const [submissionDetails, setSubmissionDetails] = useState<{
    passedTests: number; totalTests: number; executionMs: number | null; errorMessage: string | null;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'results'>('description');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: exercise, isLoading, isError } = useQuery({
    queryKey: ['exercise', slug],
    queryFn: () => exercisesApi.getBySlug(slug),
  });

  const runMutation = useMutation({
    mutationFn: () => exercisesApi.run(slug, code, language),
    onSuccess: (data) => {
      setRunResults(data.results);
      setRunStats({ passed: data.passedTests, total: data.totalTests });
      setSubmissionStatus(null);
      setActiveTab('results');
    },
    onError: () => toast.error('Error al ejecutar el código.'),
  });

  const submitMutation = useMutation({
    mutationFn: () => exercisesApi.submit(slug, code, language),
    onSuccess: (data) => {
      setSubmissionStatus('PENDING');
      setRunResults(null);
      setActiveTab('results');
      pollSubmission(data.submissionId);
    },
    onError: () => toast.error('Error al enviar la solución.'),
  });

  const pollSubmission = useCallback((submissionId: string) => {
    let attempts = 0;
    const MAX = 20;

    pollRef.current = setInterval(async () => {
      attempts++;
      try {
        const submission = await exercisesApi.getSubmission(submissionId);
        if (submission.status !== 'PENDING') {
          clearInterval(pollRef.current!);
          setSubmissionStatus(submission.status);
          setSubmissionDetails({
            passedTests: submission.passedTests,
            totalTests: submission.totalTests,
            executionMs: submission.executionMs,
            errorMessage: submission.errorMessage,
          });
          if (submission.status === 'ACCEPTED') {
            toast.success(`¡Solución aceptada! +${exercise?.points ?? 0} puntos`);
          } else {
            toast.error(STATUS_CONFIG[submission.status]?.label ?? 'Error');
          }
        }
      } catch {
        // silencioso
      }
      if (attempts >= MAX) clearInterval(pollRef.current!);
    }, 1500);
  }, [exercise?.points]);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang]);
    setShowLangMenu(false);
    setRunResults(null);
    setSubmissionStatus(null);
  };

  const handleReset = () => {
    setCode(DEFAULT_CODE[language]);
    setRunResults(null);
    setSubmissionStatus(null);
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />
        <div className={styles.loadingWrap}>
          <Loader2 size={24} color="#3b82f6" className={styles.spin} />
        </div>
      </div>
    );
  }

  if (isError || !exercise) {
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <div className={styles.errorState}>
            <p>No se pudo cargar el ejercicio.</p>
            <button onClick={() => router.push('/exercises')} type="button">Volver</button>
          </div>
        </div>
      </div>
    );
  }

  const isRunning = runMutation.isPending;
  const isSubmitting = submitMutation.isPending || submissionStatus === 'PENDING';
  const diffColor = exercise.difficulty === 'EASY' ? '#10b981' : exercise.difficulty === 'MEDIUM' ? '#f59e0b' : '#ef4444';

  return (
    <div className={styles.page}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.back} onClick={() => router.push('/exercises')} type="button">
          <ArrowLeft size={15} /> Ejercicios
        </button>

        <div className={styles.topCenter}>
          <div className={styles.exerciseIcon}>
            {exercise.subject.iconUrl
              ? <img src={exercise.subject.iconUrl} alt={exercise.subject.name} width={18} height={18} />
              : <Zap size={14} color="#22d3ee" />
            }
          </div>
          <span className={styles.exerciseTitle}>{exercise.title}</span>
          <span className={styles.diffBadge} style={{ color: diffColor, borderColor: `${diffColor}40`, background: `${diffColor}12` }}>
            {exercise.difficulty === 'EASY' ? 'Fácil' : exercise.difficulty === 'MEDIUM' ? 'Medio' : 'Difícil'}
          </span>
        </div>

        <div className={styles.topRight}>
          <div className={styles.metaChip}><Trophy size={12} />{exercise.points} pts</div>
          <div className={styles.metaChip}><Clock size={12} />{exercise.timeLimit}s</div>
        </div>
      </div>

      {/* Main split layout */}
      <div className={styles.split}>
        {/* Left — description + results */}
        <div className={styles.leftPanel}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'description' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('description')}
              type="button"
            >
              Problema
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'results' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('results')}
              type="button"
            >
              Resultados
              {runResults && (
                <span className={`${styles.tabBadge} ${runStats?.passed === runStats?.total ? styles.tabBadgeGreen : styles.tabBadgeRed}`}>
                  {runStats?.passed}/{runStats?.total}
                </span>
              )}
              {submissionStatus && submissionStatus !== 'PENDING' && (
                <span className={`${styles.tabBadge} ${submissionStatus === 'ACCEPTED' ? styles.tabBadgeGreen : styles.tabBadgeRed}`}>
                  {submissionStatus === 'ACCEPTED' ? '✓' : '✗'}
                </span>
              )}
            </button>
          </div>

          <div className={styles.panelScroll}>
            {activeTab === 'description' && (
              <div className={styles.descWrap}>
                <MarkdownDescription text={exercise.description} />

                {exercise.testCases.length > 0 && (
                  <div className={styles.testCasesSection}>
                    <p className={styles.testCasesTitle}>Casos de prueba públicos</p>
                    {exercise.testCases.map((tc, i) => (
                      <div key={tc.id} className={styles.testCase}>
                        <span className={styles.testCaseNum}>Caso {i + 1}</span>
                        <div className={styles.testCaseRow}>
                          <span className={styles.tcLabel}>Input</span>
                          <code className={styles.tcCode}>{tc.input}</code>
                        </div>
                        <div className={styles.testCaseRow}>
                          <span className={styles.tcLabel}>Expected</span>
                          <code className={styles.tcCode}>{tc.expected}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'results' && (
              <div className={styles.resultsWrap}>
                {/* Run results */}
                {runResults && !submissionStatus && (
                  <>
                    <div className={`${styles.resultSummary} ${runStats?.passed === runStats?.total ? styles.summaryGreen : styles.summaryRed}`}>
                      {runStats?.passed === runStats?.total
                        ? <CheckCircle2 size={18} />
                        : <XCircle size={18} />
                      }
                      <span>{runStats?.passed} de {runStats?.total} casos pasaron</span>
                    </div>
                    {runResults.map((r, i) => (
                      <div key={r.testCaseId} className={`${styles.resultCase} ${r.passed ? styles.resultPassed : styles.resultFailed}`}>
                        <div className={styles.resultCaseHead}>
                          {r.passed ? <CheckCircle2 size={14} color="#10b981" /> : <XCircle size={14} color="#ef4444" />}
                          <span>Caso {i + 1}</span>
                        </div>
                        <div className={styles.resultRow}>
                          <span className={styles.tcLabel}>Output</span>
                          <code className={styles.tcCode}>{r.output}</code>
                        </div>
                        <div className={styles.resultRow}>
                          <span className={styles.tcLabel}>Expected</span>
                          <code className={styles.tcCode}>{r.expected}</code>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Submit pending */}
                {submissionStatus === 'PENDING' && (
                  <div className={styles.pendingWrap}>
                    <Loader2 size={24} color="#f59e0b" className={styles.spin} />
                    <p>Evaluando tu solución...</p>
                    <span>Esto puede tomar unos segundos</span>
                  </div>
                )}

                {/* Submit result */}
                {submissionStatus && submissionStatus !== 'PENDING' && (
                  <>
                    <div className={`${styles.resultSummary} ${submissionStatus === 'ACCEPTED' ? styles.summaryGreen : styles.summaryRed}`}>
                      {submissionStatus === 'ACCEPTED'
                        ? <CheckCircle2 size={18} />
                        : <XCircle size={18} />
                      }
                      <span>{STATUS_CONFIG[submissionStatus].label}</span>
                    </div>
                    {submissionDetails && (
                      <div className={styles.submissionDetails}>
                        <div className={styles.subDetailRow}>
                          <span>Tests pasados</span>
                          <strong>{submissionDetails.passedTests} / {submissionDetails.totalTests}</strong>
                        </div>
                        {submissionDetails.executionMs && (
                          <div className={styles.subDetailRow}>
                            <span>Tiempo</span>
                            <strong>{submissionDetails.executionMs}ms</strong>
                          </div>
                        )}
                        {submissionStatus === 'ACCEPTED' && (
                          <div className={styles.acceptedPoints}>
                            <Trophy size={16} color="#f59e0b" />
                            <span>+{exercise.points} puntos ganados</span>
                          </div>
                        )}
                        {submissionDetails.errorMessage && (
                          <pre className={styles.errorMsg}>{submissionDetails.errorMessage}</pre>
                        )}
                      </div>
                    )}
                  </>
                )}

                {!runResults && !submissionStatus && (
                  <div className={styles.noResults}>
                    <Zap size={28} color="rgba(148,163,184,0.2)" />
                    <p>Ejecuta tu código para ver los resultados</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right — editor */}
        <div className={styles.rightPanel}>
          <div className={styles.editorBar}>
            <div className={styles.langSelector} onClick={() => setShowLangMenu(!showLangMenu)}>
              <span>{LANGUAGE_LABELS[language]}</span>
              <ChevronDown size={13} />
              {showLangMenu && (
                <div className={styles.langMenu}>
                  {(Object.keys(LANGUAGE_LABELS) as SupportedLanguage[]).map((lang) => (
                    <button
                      key={lang}
                      className={`${styles.langOption} ${lang === language ? styles.langOptionActive : ''}`}
                      onClick={(e) => { e.stopPropagation(); handleLanguageChange(lang); }}
                      type="button"
                    >
                      {LANGUAGE_LABELS[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className={styles.resetBtn} onClick={handleReset} type="button" title="Resetear código">
              <RotateCcw size={13} />
            </button>
          </div>

          <div className={styles.editorWrap}>
            <MonacoEditor
              height="100%"
              language={language}
              value={code}
              onChange={(val) => setCode(val ?? '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                renderLineHighlight: 'line',
                tabSize: 2,
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 },
                smoothScrolling: true,
                cursorBlinking: 'smooth',
              }}
            />
          </div>

          <div className={styles.actionBar}>
            <button
              className={styles.runBtn}
              onClick={() => runMutation.mutate()}
              disabled={isRunning || isSubmitting}
              type="button"
            >
              {isRunning
                ? <Loader2 size={14} className={styles.spin} />
                : <Play size={14} fill="currentColor" />
              }
              {isRunning ? 'Ejecutando...' : 'Ejecutar'}
            </button>

            <button
              className={styles.submitBtn}
              onClick={() => submitMutation.mutate()}
              disabled={isRunning || isSubmitting}
              type="button"
            >
              {isSubmitting && submissionStatus === 'PENDING'
                ? <Loader2 size={14} className={styles.spin} />
                : <Send size={14} />
              }
              {isSubmitting && submissionStatus === 'PENDING' ? 'Enviando...' : 'Enviar solución'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}