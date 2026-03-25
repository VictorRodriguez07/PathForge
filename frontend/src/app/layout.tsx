import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import QueryProvider from '@/components/providers/QueryProvider';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--ff-h',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--ff-b',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pathforge.dev'),
  title: {
    default: 'PathForge — Rutas de aprendizaje para developers',
    template: '%s | PathForge',
  },
  description:
    'Descubre tu camino profesional en tecnología, aprende con roadmaps curados y practica con ejercicios reales de código.',
  keywords: [
    'aprender programación',
    'roadmap developer',
    'rutas de aprendizaje',
    'ejercicios de código',
    'carrera en tecnología',
    'aprender JavaScript',
    'aprender Python',
    'aprender AWS',
  ],
  authors: [{ name: 'PathForge' }],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://pathforge.dev',
    siteName: 'PathForge',
    title: 'PathForge — Rutas de aprendizaje para developers',
    description:
      'Descubre tu camino profesional en tecnología, aprende con roadmaps curados y practica con ejercicios reales de código.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PathForge — Plataforma de aprendizaje para developers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PathForge — Rutas de aprendizaje para developers',
    description:
      'Descubre tu camino profesional en tecnología, aprende con roadmaps curados y practica con ejercicios reales de código.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}