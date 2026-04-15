import Navbar from '@/components/layout/Navbar';
import { Toaster } from 'sonner';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-base)' }}>
      <Navbar />
        <main style={{ paddingBottom: 'var(--mobile-nav-h, 0px)' }}>{children}</main>
      <Toaster position="bottom-right" theme="dark" richColors />
    </div>
  );
}