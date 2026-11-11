import type { NextConfig } from 'next';
const config: NextConfig = { devIndicators: false, images: { remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org', pathname: '/t/p/**' }] } };
export default config;
