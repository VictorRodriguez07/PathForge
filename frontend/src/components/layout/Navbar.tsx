'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import styles from './Navbar.module.css';

const LogoMark = () => (
  <img src="/logo.png" alt="PathForge" width={22} height={22} />
);

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.push('/auth');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const navLinks = [
    { href: '/dashboard', label: 'Inicio' },
    { href: '/paths', label: 'Roadmaps' },
      { href: '/career', label: 'Descubre tu carrera' },
    { href: '/exercises', label: 'Ejercicios' },
    { href: '/leaderboard', label: 'Ranking' },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/dashboard" className={styles.logo}>
          <div className={styles.logoMark}>
            <LogoMark />
          </div>
          <span className={styles.logoName}>
            Path<span className={styles.logoCyan}>Forge</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname.startsWith(link.href) ? styles.navLinkActive : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.right}>
        <div className={styles.userMenu}>
          <div className={styles.avatar} aria-label={user?.name ?? 'Usuario'}>
            {initials}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name ?? 'Usuario'}</span>
            <button className={styles.logoutBtn} onClick={handleLogout} type="button">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}