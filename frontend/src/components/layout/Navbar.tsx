'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import styles from './Navbar.module.css';

const LogoMark = () => (
  <img src="/logo.png" alt="PathForge" width={22} height={22} />
);

const IconHome = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconPaths = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const IconCareer = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconCode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const navLinks = [
  { href: '/dashboard', label: 'Inicio',     Icon: IconHome   },
  { href: '/paths',     label: 'Rutas',      Icon: IconPaths  },
  { href: '/career',    label: 'Carreras',   Icon: IconCareer },
  { href: '/exercises', label: 'Ejercicios', Icon: IconCode   },
];

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, clearAuth } = useAuthStore();

  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    clearAuth();
    router.push('/auth');
  };

  // Cierra dropdown al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Bloquea scroll del body cuando el sheet está abierto
  useEffect(() => {
    document.body.style.overflow = bottomSheetOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [bottomSheetOpen]);

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <>
      {/* ── Desktop navbar ── */}
      <header className={styles.navbar}>
        <div className={styles.left}>
          <Link href="/dashboard" className={styles.logo}>
            <div className={styles.logoMark}><LogoMark /></div>
            <span className={styles.logoName}>
              Path<span className={styles.logoCyan}>Forge</span>
            </span>
          </Link>
          <nav className={styles.nav} aria-label="Navegación principal">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.navLink} ${pathname.startsWith(href) ? styles.navLinkActive : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.right}>
          <div className={styles.userMenu} ref={dropdownRef}>
            <button
              className={styles.avatarBtn}
              onClick={() => setDropdownOpen((v) => !v)}
              aria-label="Menú de usuario"
              aria-expanded={dropdownOpen}
              type="button"
            >
              <div className={styles.avatar}>{initials}</div>
              <span className={styles.userName}>{user?.name ?? 'Usuario'}</span>
              <svg
                className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className={styles.dropdown} role="menu">
                <div className={styles.dropdownHeader}>
                  <span className={styles.dropdownName}>{user?.name ?? 'Usuario'}</span>
                  <span className={styles.dropdownEmail}>{user?.email ?? ''}</span>
                </div>
                <div className={styles.dropdownDivider} />
                <button
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                  role="menuitem"
                  type="button"
                >
                  <IconLogout />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile bottom tab bar ── */}
      <nav className={styles.mobileNav} aria-label="Navegación principal móvil">
        {navLinks.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`${styles.mobileTab} ${active ? styles.mobileTabActive : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className={styles.mobileTabIcon}><Icon /></span>
              <span className={styles.mobileTabLabel}>{label}</span>
            </Link>
          );
        })}
        <button
          className={styles.mobileTab}
          onClick={() => setBottomSheetOpen(true)}
          type="button"
          aria-label="Menú de perfil"
        >
          <span className={styles.mobileTabIcon}><IconUser /></span>
          <span className={styles.mobileTabLabel}>{initials}</span>
        </button>
      </nav>

      {/* ── Mobile bottom sheet ── */}
      {bottomSheetOpen && (
        <>
          <div
            className={styles.sheetOverlay}
            onClick={() => setBottomSheetOpen(false)}
            aria-hidden="true"
          />
          <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="Menú de usuario">
            <div className={styles.sheetHandle} />
            <div className={styles.sheetUserInfo}>
              <div className={styles.sheetAvatar}>{initials}</div>
              <div className={styles.sheetUserText}>
                <span className={styles.sheetUserName}>{user?.name ?? 'Usuario'}</span>
                <span className={styles.sheetUserEmail}>{user?.email ?? ''}</span>
              </div>
            </div>
            <div className={styles.sheetDivider} />
            <button
              className={styles.sheetLogout}
              onClick={handleLogout}
              type="button"
            >
              <IconLogout />
              Cerrar sesión
            </button>
            <button
              className={styles.sheetCancel}
              onClick={() => setBottomSheetOpen(false)}
              type="button"
            >
              Cancelar
            </button>
          </div>
        </>
      )}
    </>
  );
}