import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter, Mukta } from 'next/font/google';
import type { CSSProperties } from 'react';
import { AppShell } from '@/components/app-shell';
import { brand } from '@/lib/brand';
import './globals.css';
const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-display', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-ui', display: 'swap' });
const mukta = Mukta({ subsets: ['devanagari', 'latin'], weight: ['400', '600'], variable: '--font-devanagari', display: 'swap' });
export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), title: { default: `${brand.name} — ${brand.tagline}`, template: `%s · ${brand.name}` }, description: 'Less scrolling, more movie nights. A mobile-first prototype for picking what to watch together in India.' };
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) { const vars = Object.fromEntries(Object.entries(brand.colors).map(([key, value]) => [`--${key}`, value])); return <html lang="en" className={`${display.variable} ${inter.variable} ${mukta.variable}`} style={vars as CSSProperties}><body><AppShell>{children}</AppShell></body></html>; }
