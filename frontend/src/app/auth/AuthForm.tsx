'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Map,
  Terminal,
  BarChart3,
  Compass,
  BookOpen,
  Code2,
  Trophy,
} from 'lucide-react';
import { authApi } from '@/api';
import { useAuthStore } from '@/stores/auth.store';
import styles from './AuthForm.module.css';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe tener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe tener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe tener al menos un símbolo'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const STR_COLORS = ['', '#EF4444', '#F97316', '#FBBF24', '#10B981'];
const STR_LABELS = [
  'Usa mayúsculas, números y símbolos',
  'Muy débil',
  'Débil',
  'Buena',
  'Fuerte ✓',
];

function calcStrength(val: string): number {
  if (!val) return 0;
  let s = 0;
  if (val.length >= 8) s++;
  if (/[A-Z]/.test(val)) s++;
  if (/[0-9]/.test(val)) s++;
  if (/[^A-Za-z0-9]/.test(val)) s++;
  return s;
}

const LOGIN_FEATURES = [
  { icon: Map,      color: '#3B82F6', bg: 'rgba(59,130,246,0.1)',  label: 'Rutas adaptadas a tu nivel y objetivos' },
  { icon: Terminal, color: '#22D3EE', bg: 'rgba(34,211,238,0.1)',  label: 'Ejecución de código en tiempo real' },
  { icon: BarChart3,color: '#10B981', bg: 'rgba(16,185,129,0.1)',  label: 'Ranking y progreso visible en tu perfil' },
  { icon: Compass,  color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', label: 'Descubre tu carrera ideal en tech' },
];

const REGISTER_FEATURES = [
  { icon: Compass,  color: '#3B82F6', bg: 'rgba(59,130,246,0.1)',  label: 'Descubre tu camino profesional ideal' },
  { icon: BookOpen, color: '#22D3EE', bg: 'rgba(34,211,238,0.1)',  label: 'Accede a rutas de aprendizaje curadas' },
  { icon: Code2,    color: '#10B981', bg: 'rgba(16,185,129,0.1)',  label: 'Practica con retos reales de código' },
  { icon: Trophy,   color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', label: 'Compite en el leaderboard global' },
];

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const LogoMark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

function getErrorMessage(error: unknown, fallback: string): string {
  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'data' in error.response
  ) {
    const data = error.response.data as { message?: string };
    return data.message ?? fallback;
  }
  return fallback;
}

export default function AuthForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [serverError, setServerError] = useState<string | null>(null);
  const [pwValue, setPwValue] = useState('');

  const isRegister = mode === 'register';
  const features = isRegister ? REGISTER_FEATURES : LOGIN_FEATURES;
  const strength = calcStrength(pwValue);
  const strLabel = pwValue.length === 0 ? STR_LABELS[0] : STR_LABELS[strength];
  const strColor = pwValue.length === 0 ? 'var(--c-muted)' : STR_COLORS[strength];

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleModeChange = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setServerError(null);
    setPwValue('');
    loginForm.reset();
    registerForm.reset();
  };

  const onLogin = async (data: LoginFormData) => {
    try {
      setServerError(null);
      const response = await authApi.login(data);
      setAuth(response.user, response.tokens);
      router.push('/dashboard');
    } catch (error: unknown) {
      setServerError(getErrorMessage(error, 'Error al iniciar sesión. Intenta de nuevo.'));
    }
  };

  const onRegister = async (data: RegisterFormData) => {
    try {
      setServerError(null);
      const response = await authApi.register(data);
      setAuth(response.user, response.tokens);
      router.push('/dashboard');
    } catch (error: unknown) {
      setServerError(getErrorMessage(error, 'Error al crear la cuenta. Intenta de nuevo.'));
    }
  };

  return (
    <div className={styles.root}>
      {/* Background */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.grid} />
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      {/* Desktop nav */}
      <nav className={styles.nav} aria-label="Modo de acceso">
        <button
          className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
          onClick={() => handleModeChange('login')}
          type="button"
        >
          Iniciar sesión
        </button>
        <button
          className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
          onClick={() => handleModeChange('register')}
          type="button"
        >
          Registrarse
        </button>
      </nav>

      {/* Mobile topbar */}
      <div className={styles.topbar} aria-label="Navegación móvil">
        <div className={styles.topbarLogo}>
         <div className={styles.topbarMark}>
            <img src="/logo.png" alt="" width={20} height={20} />
        </div>
          <span className={styles.topbarName}>
            Path<span className={styles.topbarCyan}>Forge</span>
          </span>
        </div>
        <div className={styles.topbarTabs}>
          <button
            className={`${styles.topbarTab} ${mode === 'login' ? styles.topbarTabActive : ''}`}
            onClick={() => handleModeChange('login')}
            type="button"
          >
            Entrar
          </button>
          <button
            className={`${styles.topbarTab} ${mode === 'register' ? styles.topbarTabActive : ''}`}
            onClick={() => handleModeChange('register')}
            type="button"
          >
            Registro
          </button>
        </div>
      </div>

      {/* Mobile mini-hero */}
      <div className={styles.miniHero}>
        <div className={styles.miniBadge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          {isRegister ? 'Gratis para siempre · Sin tarjeta' : '1,200+ developers activos'}
        </div>
        <h1 className={styles.miniHeadline}>
          {isRegister ? (
            <>Empieza a forjar tu <em className={styles.em}>carrera.</em></>
          ) : (
            <>Tu camino al siguiente <em className={styles.em}>nivel.</em></>
          )}
        </h1>
        <p className={styles.miniDesc}>
          {isRegister
            ? 'Únete a miles de developers construyendo su camino profesional.'
            : 'Rutas personalizadas, retos reales y una comunidad que te impulsa.'}
        </p>
        <div className={styles.miniFeats} role="list">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.label} className={styles.miniFeat} role="listitem">
                <Icon size={14} color={feat.color} strokeWidth={2} aria-hidden="true" />
                <span>{feat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main layout */}
      <div className={styles.layout}>

        {/* Left panel */}
        <section className={styles.left} aria-label="Características de PathForge">
          <div className={styles.leftTop}>
            <div className={styles.logo}>
              <div className={styles.logoMark} aria-hidden="true">
                <img src="/logo.png" alt="" width={60} height={60} />
                </div>
              <span className={styles.logoName}>
                Path<span className={styles.logoCyan}>Forge</span>
              </span>
            </div>

            <div className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              {isRegister ? 'Gratis para siempre · Sin tarjeta' : '1,200+ developers activos'}
            </div>

            <h1 className={styles.headline}>
              {isRegister ? (
                <>Empieza a<br />forjar tu <em className={styles.em}>carrera.</em></>
              ) : (
                <>Tu camino al<br />siguiente <em className={styles.em}>nivel.</em></>
              )}
            </h1>

            <p className={styles.description}>
              {isRegister
                ? 'Únete a miles de developers construyendo su camino profesional con PathForge.'
                : 'Rutas personalizadas, retos reales y una comunidad que te impulsa a crecer como developer.'}
            </p>

            <ul className={styles.features} role="list">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <li key={feat.label} className={styles.feature}>
                    <div
                      className={styles.featureIcon}
                      style={{ background: feat.bg }}
                      aria-hidden="true"
                    >
                      <Icon size={15} color={feat.color} strokeWidth={2} />
                    </div>
                    <span className={styles.featureLabel}>{feat.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Snippet — tamaño intrínseco, no se estira */}
         <div className={styles.snippet} aria-hidden="true">
  <div className={styles.snippetDots}>
    <span className={styles.dotRed} />
    <span className={styles.dotYellow} />
    <span className={styles.dotGreen} />
  </div>
  <pre className={styles.snippetCode}>
    <span className={styles.cCmt}>{'// PathForge'}</span>{'\n'}
    <span className={styles.cKw}>const</span>{' '}
    <span className={styles.cVar}>path</span>{' = '}
    <span className={styles.cKw}>await</span>{'\n  '}
    <span className={styles.cFn}>generateRoadmap</span>
    {'(\n    '}
    <span className={styles.cStr}>&quot;Full-stack dev&quot;</span>
    {'\n  );\n'}
    <span className={styles.cCmt}>{'// ✓ 12 etapas listas'}</span>
  </pre>
</div>
        </section>

        {/* Right panel */}
        <section
          className={styles.right}
          aria-label={isRegister ? 'Formulario de registro' : 'Formulario de inicio de sesión'}
        >
          <div className={styles.card} key={mode}>
            <header className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                {isRegister ? 'Crea tu cuenta' : 'Bienvenido de vuelta'}
              </h2>
              <p className={styles.cardSub}>
                {isRegister ? (
                  <>
                    ¿Ya tienes cuenta?{' '}
                    <button className={styles.cardSubLink} type="button" onClick={() => handleModeChange('login')}>
                      Inicia sesión
                    </button>
                  </>
                ) : (
                  <>
                    ¿No tienes cuenta?{' '}
                    <button className={styles.cardSubLink} type="button" onClick={() => handleModeChange('register')}>
                      Créala gratis
                    </button>
                  </>
                )}
              </p>
            </header>

            {/* Google */}
            <button className={styles.googleBtn} type="button">
                <GoogleIcon />
                <span>Continuar con Google</span>
            </button>

            <div className={styles.divider} aria-hidden="true">
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>
                {isRegister ? 'o regístrate con email' : 'o continúa con email'}
              </span>
              <div className={styles.dividerLine} />
            </div>

            {serverError && (
              <div className={styles.errorBanner} role="alert" aria-live="polite">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {serverError}
              </div>
            )}

            {isRegister ? (
              <form className={styles.form} onSubmit={registerForm.handleSubmit(onRegister)} noValidate>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="reg-name">Nombre completo</label>
                  <input
                    id="reg-name"
                    className={`${styles.input} ${registerForm.formState.errors.name ? styles.inputError : ''}`}
                    type="text"
                    placeholder="Tu nombre"
                    autoComplete="name"
                    {...registerForm.register('name')}
                  />
                  {registerForm.formState.errors.name && (
                    <span className={styles.fieldError} role="alert">
                      {registerForm.formState.errors.name.message}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="reg-email">Email</label>
                  <input
                    id="reg-email"
                    className={`${styles.input} ${registerForm.formState.errors.email ? styles.inputError : ''}`}
                    type="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    {...registerForm.register('email')}
                  />
                  {registerForm.formState.errors.email && (
                    <span className={styles.fieldError} role="alert">
                      {registerForm.formState.errors.email.message}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="reg-password">Contraseña</label>
                  <input
                    id="reg-password"
                    className={`${styles.input} ${registerForm.formState.errors.password ? styles.inputError : ''}`}
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    autoComplete="new-password"
                    {...registerForm.register('password', {
                      onChange: (e) => setPwValue(e.target.value),
                    })}
                  />
                  <div className={styles.strengthBars} aria-hidden="true">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={styles.strengthBar}
                        style={{
                          background: strength >= i ? strColor : undefined,
                          transform: strength >= i ? 'scaleY(1.5)' : 'scaleY(1)',
                        }}
                      />
                    ))}
                  </div>
                  <span className={styles.strengthLabel} style={{ color: strColor }}>
                    {strLabel}
                  </span>
                  {registerForm.formState.errors.password && (
                    <span className={styles.fieldError} role="alert">
                      {registerForm.formState.errors.password.message}
                    </span>
                  )}
                </div>

                <button className={styles.submitBtn} type="submit" disabled={registerForm.formState.isSubmitting}>
                  {registerForm.formState.isSubmitting ? 'Creando cuenta...' : 'Crear cuenta gratis →'}
                </button>

                <p className={styles.terms}>
                  Al registrarte aceptas nuestros{' '}
                  <span className={styles.termsLink}>Términos de uso</span>
                  {' '}y{' '}
                  <span className={styles.termsLink}>Política de privacidad</span>
                </p>
              </form>
            ) : (
              <form className={styles.form} onSubmit={loginForm.handleSubmit(onLogin)} noValidate>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="login-email">Email</label>
                  <input
                    id="login-email"
                    className={`${styles.input} ${loginForm.formState.errors.email ? styles.inputError : ''}`}
                    type="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    {...loginForm.register('email')}
                  />
                  {loginForm.formState.errors.email && (
                    <span className={styles.fieldError} role="alert">
                      {loginForm.formState.errors.email.message}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="login-password">Contraseña</label>
                  <input
                    id="login-password"
                    className={`${styles.input} ${loginForm.formState.errors.password ? styles.inputError : ''}`}
                    type="password"
                    placeholder="Tu contraseña"
                    autoComplete="current-password"
                    {...loginForm.register('password')}
                  />
                  {loginForm.formState.errors.password && (
                    <span className={styles.fieldError} role="alert">
                      {loginForm.formState.errors.password.message}
                    </span>
                  )}
                </div>

                <div className={styles.forgotRow}>
                  <button className={styles.forgotBtn} type="button">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button className={styles.submitBtn} type="submit" disabled={loginForm.formState.isSubmitting}>
                  {loginForm.formState.isSubmitting ? 'Ingresando...' : 'Iniciar sesión →'}
                </button>

                <p className={styles.terms}>
                  Al ingresar aceptas nuestros{' '}
                  <span className={styles.termsLink}>Términos de uso</span>
                  {' '}y{' '}
                  <span className={styles.termsLink}>Política de privacidad</span>
                </p>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}