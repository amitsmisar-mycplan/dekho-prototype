import { formatCopy } from './copy';
import { brandCopy } from '@/.generated/copy/brand';
export const colors = { bg: '#0B0A10', surface: '#16141F', marigold: '#FFB627', pink: '#FF3D7F', teal: '#21D4C4', text: '#F5F3FA', muted: '#9C97AD' } as const;
export const brands = {
    Dekho: { name: 'Dekho', tagline: formatCopy(brandCopy['dekho_tagline']) },
    WatchAdda: { name: 'WatchAdda', tagline: formatCopy(brandCopy['watchadda_tagline']) },
} as const;
export const brand = { ...brands[process.env.NEXT_PUBLIC_BRAND === 'WatchAdda' ? 'WatchAdda' : 'Dekho'], colors, wordmarkGradient: `linear-gradient(110deg, ${colors.marigold}, ${colors.pink})` };

export type BrandName = keyof typeof brands;
