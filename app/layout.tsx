
import { formatCopy } from '@/lib/copy';
import { commonCopy } from '@/.generated/copy/common';
import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Inter, Mukta } from 'next/font/google';
import type { CSSProperties } from 'react';
import { brand } from '@/lib/brand';
import './globals.css';
const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-display', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-ui', display: 'swap' });
const mukta = Mukta({ preload: false, subsets: ['devanagari', 'latin'], weight: ['400', '600'], variable: '--font-devanagari', display: 'swap' });
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: brand.colors.bg };
export const metadata: Metadata = { applicationName: brand.name, appleWebApp: { capable: true, title: brand.name, statusBarStyle: 'black-translucent' }, icons: { apple: '/app-icons/180' }, metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), title: { default: `${brand.name} — ${brand.tagline}`, template: formatCopy(commonCopy['s_value'], { p1: brand.name }) }, description: formatCopy(commonCopy['less_scrolling_more_movie_nights_a_mobile_first_prototype_for_pic']) };
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) { const vars = Object.fromEntries(Object.entries(brand.colors).map(([key, value]) => [`--${key}`, value])); return <html lang="en" className={`${display.variable} ${inter.variable} ${mukta.variable}`} style={vars as CSSProperties}><body>{children}</body></html>; }
