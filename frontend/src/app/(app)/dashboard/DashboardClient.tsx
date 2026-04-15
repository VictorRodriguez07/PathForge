'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth.store';
import { usersApi } from '@/api';
import { UserPathSummary } from '@/types';
import { QUERY_KEYS } from '@/lib/constants';
import styles from './DashboardClient.module.css';
import { resolveSubjectFromTitle } from '@/lib/path-utils';

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
  none: 'Sin experiencia',
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

const GOAL_LABELS: Record<string, string> = {
  frontend: 'Frontend Developer',
  backend: 'Backend Developer',
  fullstack: 'Full-Stack Developer',
  devops: 'DevOps Engineer',
  data_science: 'Data Scientist',
  get_job: 'Conseguir empleo',
  personal_project: 'Proyecto personal',
  certification: 'Certificación',
  specialize: 'Especializarme',
  improve_job: 'Mejorar en mi trabajo',
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

function PathCard({ path, onContinue }: { path: UserPathSummary; onContinue: (path: UserPathSummary) => void }) {
  const isCustom = path.isCustom;
  const icon = path.subject?.iconUrl
    ? { iconUrl: path.subject.iconUrl, name: path.subject.name }
    : resolveSubjectFromTitle(path.title);

  return (
    <article className={`${styles.pathCard} ${isCustom ? styles.pathCardCustom : ''}`}>
      <div className={styles.pathCardInner}>
        <div className={styles.pathCardHead}>
          <div className={styles.pathIconWrap}>
            {icon.iconUrl ? (
              <img src={icon.iconUrl} alt={icon.name} width={26} height={26} />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            )}
          </div>
          <div className={styles.pathMeta}>
            <div className={styles.pathTitle}>{path.title}</div>
            <div className={styles.pathSub}>
              {LEVEL_LABELS[path.level] ?? path.level}
              <span className={styles.pathDot} />
              {GOAL_LABELS[path.goal] ?? path.goal}
            </div>
          </div>
          {isCustom && <span className={styles.badgeCustom}>Mi Ruta</span>}
        </div>

        <div className={styles.pathProgress}>
          <div className={styles.pathProgressTop}>
            <span className={styles.pathProgressLabel}>
              {path.progress.completed} de {path.progress.total} módulos
            </span>
            <span className={styles.pathProgressPct} style={{ color: isCustom ? '#22D3EE' : '#3B82F6' }}>
              {path.progress.percentage}%
            </span>
          </div>
          <div className={styles.pathProgressTrack}>
            <div
              className={styles.pathProgressFill}
              style={{
                width: `${path.progress.percentage}%`,
                background: isCustom
                  ? 'linear-gradient(90deg, #06B6D4, #22D3EE)'
                  : 'linear-gradient(90deg, #2563EB, #3B82F6)',
              }}
            />
          </div>
        </div>

        <button
          className={`${styles.pathCta} ${isCustom ? styles.pathCtaCustom : ''}`}
          onClick={() => onContinue(path)}
          type="button"
        >
          {path.progress.percentage === 0 ? 'Empezar' : 'Continuar'} →
        </button>
      </div>
    </article>
  );
}

function CareerDiscoveryBanner({ onStart }: { onStart: () => void }) {
  return (
    <div className={styles.cdBanner}>
      <div className={styles.cdBannerGlow} aria-hidden="true" />
      <div className={styles.cdBannerContent}>
        <div className={styles.cdBannerLeft}>
          <div className={styles.cdBannerBadge}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Recomendado para ti
          </div>
          <h2 className={styles.cdBannerTitle}>Descubre tu carrera ideal en tech</h2>
          <p className={styles.cdBannerDesc}>
            Responde 4 preguntas rápidas y obtén un roadmap personalizado basado en tu perfil, experiencia y objetivos.
          </p>
          <div className={styles.cdBannerPills}>
            <span className={styles.cdPill}>2 minutos</span>
            <span className={styles.cdPill}>Gratis</span>
            <span className={styles.cdPill}>Ruta incluida</span>
          </div>
          <button className={styles.cdBannerCta} onClick={onStart} type="button">
            Descubrir mi carrera ideal →
          </button>
        </div>
        <div className={styles.cdBannerRight} aria-hidden="true">
          <div className={styles.cdPreviewCard}>
            <div className={styles.cdPreviewRank}>#1 recomendación</div>
            <div className={styles.cdPreviewTitle}>Frontend Developer</div>
            <div className={styles.cdPreviewBar}><div className={styles.cdPreviewFill} /></div>
            <div className={styles.cdPreviewMeta}>91 pts · 11 meses · Demanda muy alta</div>
          </div>
          <div className={styles.cdPreviewCard} style={{ opacity: 0.45, transform: 'scale(0.94)', marginTop: -6 }}>
            <div className={styles.cdPreviewRank}>#2 recomendación</div>
            <div className={styles.cdPreviewTitle}>Full-Stack Developer</div>
            <div className={styles.cdPreviewBar}><div className={styles.cdPreviewFill} style={{ background: '#475569', width: '78%' }} /></div>
            <div className={styles.cdPreviewMeta}>84 pts · 19 meses · Demanda muy alta</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareerDiscoveryBannerCompact({ onStart }: { onStart: () => void }) {
  return (
    <div className={styles.cdCompact}>
      <div className={styles.cdCompactLeft}>
        <div className={styles.cdCompactIcon}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <div>
          <p className={styles.cdCompactTitle}>¿Estás en la carrera correcta?</p>
          <p className={styles.cdCompactDesc}>4 preguntas · 2 minutos · Ruta personalizada</p>
        </div>
      </div>
      <button className={styles.cdCompactCta} onClick={onStart} type="button">
        Descubrir ahora →
      </button>
    </div>
  );
}

export default function DashboardClient() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const { data: pathsData, isLoading } = useQuery({
    queryKey: QUERY_KEYS.learningPaths(),
    queryFn: () => usersApi.getMyPaths(),
  });

  const activePaths = pathsData?.paths ?? [];
  const hasActivePaths = activePaths.length > 0;
  const hasCareerDiscovery = pathsData?.hasCareerDiscovery ?? false;

  const totalModulesCompleted = activePaths.reduce((acc, p) => acc + p.progress.completed, 0);
  const totalModules = activePaths.reduce((acc, p) => acc + p.progress.total, 0);
  const overallProgress = totalModules > 0 ? Math.round((totalModulesCompleted / totalModules) * 100) : 0;

  const handleContinuePath = (path: UserPathSummary) => {
    if (path.slug) {
      router.push(`/paths/${path.slug}`);
    } else if (path.isCustom) {
      router.push('/paths');
    }
  };

  const handleCreatePath = () => router.push('/paths/custom');
  const handleStartCareer = () => router.push('/career');

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.content}>

        {/* ── Header ── */}
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.headerLeft}>
              <p className={styles.greeting}>{getGreeting()},</p>
              <h1 className={styles.userName}>{user?.name?.split(' ')[0] ?? 'Developer'}</h1>
              <p className={styles.headerSub}>
                {hasActivePaths
                  ? `Tienes ${activePaths.length} ruta${activePaths.length > 1 ? 's' : ''} activa${activePaths.length > 1 ? 's' : ''}. Sigue adelante.`
                  : 'Bienvenido a PathForge. ¿Listo para empezar?'}
              </p>
            </div>

            {hasActivePaths && (
              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <div className={styles.statCardInner}>
                    <span className={styles.statNum}>{activePaths.length}</span>
                    <span className={styles.statLabel}>Rutas activas</span>
                  </div>
                  <div className={styles.statAccent} style={{ background: '#2563EB' }} />
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statCardInner}>
                    <span className={styles.statNum}>{totalModulesCompleted}</span>
                    <span className={styles.statLabel}>Módulos completados</span>
                  </div>
                  <div className={styles.statAccent} style={{ background: '#10B981' }} />
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statCardInner}>
                    <span className={styles.statNum}>{overallProgress}%</span>
                    <span className={styles.statLabel}>Progreso general</span>
                  </div>
                  <div className={styles.statAccent} style={{ background: '#22D3EE' }} />
                </div>
              </div>
            )}
          </div>

          {/* Barra de progreso global solo si hay rutas */}
          {hasActivePaths && totalModules > 0 && (
            <div className={styles.globalProgress}>
              <div className={styles.globalProgressTop}>
                <span className={styles.globalProgressLabel}>Progreso global</span>
                <span className={styles.globalProgressFraction}>{totalModulesCompleted} / {totalModules} módulos</span>
              </div>
              <div className={styles.globalProgressTrack}>
                <div className={styles.globalProgressFill} style={{ width: `${overallProgress}%` }} />
              </div>
            </div>
          )}
        </header>

        {/* ── Main ── */}
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.skeleton} />
            <div className={styles.skeleton} style={{ height: 120 }} />
          </div>
        ) : hasActivePaths ? (
          <div className={styles.mainLayout}>
            {/* Columna principal */}
            <div className={styles.mainCol}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Tus rutas activas</h2>
                <Link href="/paths" className={styles.sectionLink}>Ver catálogo →</Link>
              </div>
              <div className={styles.pathsList}>
                {activePaths.map((path) => (
                  <PathCard key={path.id} path={path} onContinue={handleContinuePath} />
                ))}
              </div>

              {!hasCareerDiscovery && <CareerDiscoveryBannerCompact onStart={handleStartCareer} />}
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Acciones rápidas</h3>
                <div className={styles.actionsList}>
                  <Link href="/paths" className={styles.actionItem}>
                    <div className={styles.actionItemIcon} style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div className={styles.actionItemText}>
                      <span className={styles.actionItemTitle}>Explorar rutas</span>
                      <span className={styles.actionItemDesc}>Catálogo completo</span>
                    </div>
                    <span className={styles.actionItemArrow}>→</span>
                  </Link>

                  <button className={styles.actionItem} onClick={handleCreatePath} type="button">
                    <div className={styles.actionItemIcon} style={{ background: 'rgba(34,211,238,0.1)', color: '#22D3EE' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div className={styles.actionItemText}>
                      <span className={styles.actionItemTitle}>Crear Mi Ruta</span>
                      <span className={styles.actionItemDesc}>Personalizada a tu medida</span>
                    </div>
                    <span className={styles.actionItemArrow}>→</span>
                  </button>

                  <Link href="/exercises" className={styles.actionItem}>
                    <div className={styles.actionItemIcon} style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <div className={styles.actionItemText}>
                      <span className={styles.actionItemTitle}>Practicar código</span>
                      <span className={styles.actionItemDesc}>Ejercicios y retos</span>
                    </div>
                    <span className={styles.actionItemArrow}>→</span>
                  </Link>

                  <Link href="/career" className={styles.actionItem}>
                    <div className={styles.actionItemIcon} style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <div className={styles.actionItemText}>
                      <span className={styles.actionItemTitle}>Mis roadmaps</span>
                      <span className={styles.actionItemDesc}>Carreras y progreso</span>
                    </div>
                    <span className={styles.actionItemArrow}>→</span>
                  </Link>
                </div>
              </div>

              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Tu nivel</h3>
                <div className={styles.levelCard}>
                  <div className={styles.levelCircle}>
                    <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
                      <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                      <circle
                        cx="28" cy="28" r="24" fill="none"
                        stroke="#3B82F6" strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 24}`}
                        strokeDashoffset={`${2 * Math.PI * 24 * (1 - overallProgress / 100)}`}
                        transform="rotate(-90 28 28)"
                      />
                    </svg>
                    <span className={styles.levelPct}>{overallProgress}%</span>
                  </div>
                  <div className={styles.levelInfo}>
                    <span className={styles.levelLabel}>Progreso total</span>
                    <span className={styles.levelSub}>{totalModulesCompleted} módulos completados</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* Usuario sin rutas */
          <div className={styles.emptyLayout}>
            {!hasCareerDiscovery && <CareerDiscoveryBanner onStart={handleStartCareer} />}

            <div className={styles.emptyActions}>
              <h2 className={styles.sectionTitle} style={{ marginBottom: 16 }}>¿Por dónde empezar?</h2>
              <div className={styles.actionsGrid}>
                <Link href="/paths" className={styles.actionCard}>
                  <div className={styles.actionCardIcon} style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className={styles.actionCardText}>
                    <div className={styles.actionCardTitle}>Explorar rutas</div>
                    <div className={styles.actionCardDesc}>Ver todas las rutas del catálogo</div>
                  </div>
                </Link>

                <button className={styles.actionCard} onClick={handleCreatePath} type="button">
                  <div className={styles.actionCardIcon} style={{ background: 'rgba(34,211,238,0.1)', color: '#22D3EE' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className={styles.actionCardText}>
                    <div className={styles.actionCardTitle}>Crear Mi Ruta</div>
                    <div className={styles.actionCardDesc}>Ruta personalizada a tu medida</div>
                  </div>
                </button>

                <Link href="/exercises" className={styles.actionCard}>
                  <div className={styles.actionCardIcon} style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div className={styles.actionCardText}>
                    <div className={styles.actionCardTitle}>Practicar código</div>
                    <div className={styles.actionCardDesc}>Ejercicios y retos de código</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}