export const colors = { bg: '#0B0A10', surface: '#16141F', marigold: '#FFB627', pink: '#FF3D7F', teal: '#21D4C4', text: '#F5F3FA', muted: '#9C97AD' } as const;
const brands = {
    Dekho: { name: 'Dekho', tagline: 'Kya dekhein? Sorted.' },
    WatchAdda: { name: 'WatchAdda', tagline: "Your group's movie adda." },
} as const;
export const brand = { ...brands[process.env.NEXT_PUBLIC_BRAND === 'WatchAdda' ? 'WatchAdda' : 'Dekho'], colors, wordmarkGradient: `linear-gradient(110deg, ${colors.marigold}, ${colors.pink})` };
