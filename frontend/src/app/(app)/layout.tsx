import Navbar from '@/components/layout/Navbar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-base)' }}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}