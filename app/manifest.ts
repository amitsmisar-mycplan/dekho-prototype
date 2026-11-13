import type { MetadataRoute } from 'next';
import { brand } from '@/lib/brand';
export default function manifest(): MetadataRoute.Manifest {
  return { id: '/', name: brand.name, short_name: brand.name, description: brand.tagline, start_url: '/', scope: '/', display: 'standalone', orientation: 'portrait', background_color: brand.colors.bg, theme_color: brand.colors.bg, lang: 'en-IN', categories: ['entertainment', 'social'], icons: [{ src: '/app-icons/192', sizes: '192x192', type: 'image/png', purpose: 'any' }, { src: '/app-icons/512', sizes: '512x512', type: 'image/png', purpose: 'any' }, { src: '/app-icons/512', sizes: '512x512', type: 'image/png', purpose: 'maskable' }] };
}
