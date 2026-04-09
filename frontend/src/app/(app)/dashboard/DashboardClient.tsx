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
  return (
    <article className={`${styles.pathCard} ${isCustom ? styles.pathCardCustom : ''}`}>
      <div className={styles.pathCardHeader}>
        <div className={styles.pathCardLeft}>
          {(() => {
            const icon = path.subject?.iconUrl
              ? { iconUrl: path.subject.iconUrl, name: path.subject.name }
              : resolveSubjectFromTitle(path.title);
            return icon.iconUrl ? (
              <div className={styles.pathIcon}>
                <img src={icon.iconUrl} alt={icon.name} width={28} height={28} />
              </div>
            ) : (
              <div className={`${styles.pathIcon} ${styles.pathIconCustom}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            );
          })()}
          <div className={styles.pathCardInfo}>
            <div className={styles.pathCardTop}>
              <h3 className={styles.pathCardTitle}>{path.title}</h3>
              {isCustom && <span className={styles.badgeCustom}>Mi Ruta</span>}
            </div>
            <div className={styles.pathCardMeta}>
              <span>{LEVEL_LABELS[path.level] ?? path.level}</span>
              <span className={styles.metaDot} />
              <span>{GOAL_LABELS[path.goal] ?? path.goal}</span>
              <span className={styles.metaDot} />
              <span>{path.weeklyHours}h/semana</span>
            </div>
          </div>
        </div>
        <div className={styles.pathCardRight}>
          <div className={styles.progressCircleWrap}>
            <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
              <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
              <circle
                cx="26" cy="26" r="22"
                fill="none"
                stroke={isCustom ? '#22D3EE' : '#3B82F6'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - path.progress.percentage / 100)}`}
                transform="rotate(-90 26 26)"
              />
            </svg>
            <span className={styles.progressPercent}>{path.progress.percentage}%</span>
          </div>
        </div>
      </div>

      <div className={styles.pathCardFooter}>
        <div className={styles.progressBarWrap}>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{
                width: `${path.progress.percentage}%`,
                background: isCustom ? '#22D3EE' : '#3B82F6',
              }}
            />
          </div>
          <span className={styles.progressLabel}>
            {path.progress.completed} de {path.progress.total} módulos
          </span>
        </div>
        <button
          className={`${styles.continueBtn} ${isCustom ? styles.continueBtnCustom : ''}`}
          onClick={() => onContinue(path)}
          type="button"
        >
          {path.progress.percentage === 0 ? 'Empezar →' : 'Continuar →'}
        </button>
      </div>
    </article>
  );
}

// Banner grande — usuario nuevo sin rutas activas
function CareerDiscoveryBanner({ onStart }: { onStart: () => void }) {
  return (
    <div className={styles.cdBanner}>
      <div className={styles.cdBannerBg} aria-hidden="true" />
      <div className={styles.cdBannerContent}>
        <div className={styles.cdBannerLeft}>
          <div className={styles.cdBannerBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Recomendado para ti
          </div>
          <h2 className={styles.cdBannerTitle}>¿No sabes por dónde empezar?</h2>
          <p className={styles.cdBannerDesc}>
            Responde 4 preguntas rápidas y descubre qué carrera en tecnología es perfecta para tu perfil, experiencia y objetivos.
          </p>
          <div className={styles.cdBannerMeta}>
            <span className={styles.cdBannerMetaItem}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              2 minutos
            </span>
            <span className={styles.cdBannerMetaItem}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Gratis
            </span>
            <span className={styles.cdBannerMetaItem}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
              Ruta personalizada incluida
            </span>
          </div>
          <div className={styles.cdBannerActions}>
            <button className={styles.cdBannerCta} onClick={onStart} type="button">
              Descubrir mi carrera ideal →
            </button>
            <a href="/paths" className={styles.cdBannerSecondary}>
              Ver catálogo de rutas
            </a>
          </div>
        </div>
        <div className={styles.cdBannerRight} aria-hidden="true">
          <div className={styles.cdBannerCard}>
            <div className={styles.cdBannerCardRank}>#1 recomendación</div>
            <div className={styles.cdBannerCardTitle}>Frontend Developer</div>
            <div className={styles.cdBannerCardBar}>
              <div className={styles.cdBannerCardBarFill} />
            </div>
            <div className={styles.cdBannerCardMeta}>91 pts · 11 meses · Demanda muy alta</div>
          </div>
          <div className={styles.cdBannerCard} style={{ opacity: 0.5, transform: 'scale(0.95)', marginTop: -8 }}>
            <div className={styles.cdBannerCardRank}>#2 recomendación</div>
            <div className={styles.cdBannerCardTitle}>Full-Stack Developer</div>
            <div className={styles.cdBannerCardBar}>
              <div className={styles.cdBannerCardBarFill} style={{ background: '#7C8DB0' }} />
            </div>
            <div className={styles.cdBannerCardMeta}>91 pts · 19 meses · Demanda muy alta</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Banner compacto — usuario con rutas activas pero sin career discovery
function CareerDiscoveryBannerCompact({ onStart }: { onStart: () => void }) {
  return (
    <div className={styles.cdBannerCompact}>
      <div className={styles.cdBannerCompactLeft}>
        <div className={styles.cdBannerCompactIcon} aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <div>
          <p className={styles.cdBannerCompactTitle}>¿Estás en la carrera correcta?</p>
          <p className={styles.cdBannerCompactDesc}>Descubre tu perfil ideal en tech — 4 preguntas, 2 minutos, gratis.</p>
        </div>
      </div>
      <button className={styles.cdBannerCompactCta} onClick={onStart} type="button">
        Descubrir ahora →
      </button>
    </div>
  );
}

export default function DashboardClient() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const { data: pathsData, isLoading } = useQuery({
    queryKey: QUERY_KEYS.learningPaths,
    queryFn: () => usersApi.getMyPaths(),
  });

  const activePaths = pathsData?.paths ?? [];
  const hasActivePaths = activePaths.length > 0;
  const hasCareerDiscovery = pathsData?.hasCareerDiscovery ?? false;

  const totalModulesCompleted = activePaths.reduce((acc, p) => acc + p.progress.completed, 0);
  const totalModules = activePaths.reduce((acc, p) => acc + p.progress.total, 0);
  const overallProgress = totalModules > 0
    ? Math.round((totalModulesCompleted / totalModules) * 100)
    : 0;

  const handleContinuePath = (path: UserPathSummary) => {
  if (path.slug) {
    // Ruta de catálogo — navegar por slug
    router.push(`/paths/${path.slug}`);
  } else if (path.isCustom) {
    // Ruta personalizada — no tiene slug ni página de detalle propia aún
    // Navegar al catálogo donde están listadas en la sección "Mis rutas"
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
      </div>

      <div className={styles.content}>
        {/* Header */}
        <header className={styles.header}>
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
            <div className={styles.headerStats}>
              <div className={styles.statCard}>
                <span className={styles.statNum}>{activePaths.length}</span>
                <span className={styles.statLabel}>Rutas activas</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNum}>{totalModulesCompleted}</span>
                <span className={styles.statLabel}>Módulos completados</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNum}>{overallProgress}%</span>
                <span className={styles.statLabel}>Progreso general</span>
              </div>
            </div>
          )}
        </header>

        {/* Main content */}
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
          </div>
        ) : hasActivePaths ? (
          // Caso: usuario con rutas activas
          <section aria-label="Tus rutas activas">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Tus rutas activas</h2>
              <a href="/paths" className={styles.sectionLink}>Ver catálogo →</a>
            </div>
            <div className={styles.pathsGrid}>
              {activePaths.map((path) => (
                <PathCard key={path.id} path={path} onContinue={handleContinuePath} />
              ))}
            </div>

            {/* Banner compacto entre rutas y quick actions */}
            {!hasCareerDiscovery && (
              <CareerDiscoveryBannerCompact onStart={handleStartCareer} />
            )}

            <div className={styles.quickActions}>
              <h2 className={styles.sectionTitle} style={{ marginBottom: 16 }}>
                ¿Qué quieres hacer?
              </h2>
              <div className={styles.actionsGrid}>
                <a href="/paths" className={styles.actionCard}>
                  <div className={styles.actionIcon} style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.actionTitle}>Explorar rutas</div>
                    <div className={styles.actionDesc}>Ver todas las rutas del catálogo</div>
                  </div>
                </a>
                <button className={styles.actionCard} onClick={handleCreatePath} type="button">
                  <div className={styles.actionIcon} style={{ background: 'rgba(34,211,238,0.1)', color: '#22D3EE' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.actionTitle}>Crear Mi Ruta</div>
                    <div className={styles.actionDesc}>Ruta personalizada a tu medida</div>
                  </div>
                </button>
                <a href="/exercises" className={styles.actionCard}>
                  <div className={styles.actionIcon} style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.actionTitle}>Practicar código</div>
                    <div className={styles.actionDesc}>Ejercicios y retos de código</div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        ) : (
          // Caso: usuario sin rutas activas
          <>
            {!hasCareerDiscovery && (
              <CareerDiscoveryBanner onStart={handleStartCareer} />
            )}
            <div className={styles.quickActions}>
              <h2 className={styles.sectionTitle} style={{ marginBottom: 16 }}>
                ¿Qué quieres hacer?
              </h2>
              <div className={styles.actionsGrid}>
                <a href="/paths" className={styles.actionCard}>
                  <div className={styles.actionIcon} style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.actionTitle}>Explorar rutas</div>
                    <div className={styles.actionDesc}>Ver todas las rutas del catálogo</div>
                  </div>
                </a>
                <button className={styles.actionCard} onClick={handleCreatePath} type="button">
                  <div className={styles.actionIcon} style={{ background: 'rgba(34,211,238,0.1)', color: '#22D3EE' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.actionTitle}>Crear Mi Ruta</div>
                    <div className={styles.actionDesc}>Ruta personalizada a tu medida</div>
                  </div>
                </button>
                <a href="/exercises" className={styles.actionCard}>
                  <div className={styles.actionIcon} style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.actionTitle}>Practicar código</div>
                    <div className={styles.actionDesc}>Ejercicios y retos de código</div>
                  </div>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}