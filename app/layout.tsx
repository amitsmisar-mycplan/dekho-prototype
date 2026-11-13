
import { formatCopy } from '@/lib/copy';
import { commonCopy } from '@/.generated/copy/common';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { CSSProperties } from 'react';
import { brand } from '@/lib/brand';
import './globals.css';
const display = localFont({ src: '../public/fonts/BricolageGrotesque-variable.woff2', weight: '200 800', variable: '--font-display', display: 'swap' });
const inter = localFont({ src: '../public/fonts/Inter-variable.woff2', weight: '100 900', variable: '--font-ui', display: 'swap' });
const mukta = localFont({ src: [{ path: '../public/fonts/Mukta-400.woff2', weight: '400' }, { path: '../public/fonts/Mukta-600.woff2', weight: '600' }], preload: false, variable: '--font-devanagari', display: 'swap' });
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: brand.colors.bg };
export const metadata: Metadata = { applicationName: brand.name, appleWebApp: { capable: true, title: brand.name, statusBarStyle: 'black-translucent' }, icons: { apple: '/app-icons/180' }, metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), title: { default: `${brand.name} — ${brand.tagline}`, template: formatCopy(commonCopy['s_value'], { p1: brand.name }) }, description: formatCopy(commonCopy['less_scrolling_more_movie_nights_a_mobile_first_prototype_for_pic']) };
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) { const vars = Object.fromEntries(Object.entries(brand.colors).map(([key, value]) => [`--${key}`, value])); return <html lang="en" className={`${display.variable} ${inter.variable} ${mukta.variable}`} style={vars as CSSProperties}><body>{children}</body></html>; }
