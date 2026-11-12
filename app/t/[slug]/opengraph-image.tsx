import { ImageResponse } from 'next/og';
import { dataSource } from '@/lib/data';
import { brand } from '@/lib/brand';
export const alt = 'Tonight’s movie pick';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const title = await dataSource.getTitle((await params).slug);
  if (!title) return new Response('Title not found', { status: 404 });
  const offers = await dataSource.getProviders(title.id);
  const offer = offers.find((o) => o.type === 'stream' || o.type === 'free') ?? offers[0];
  // Fetch only validated TMDb paths; missing artwork retains the same palette poster as the app.
  let poster: string | null = null;
  if (title.posterPath) {
    try { const response = await fetch(`https://image.tmdb.org/t/p/w500${title.posterPath}`, { signal: AbortSignal.timeout(4000) }); if (response.ok) poster = `data:image/jpeg;base64,${Buffer.from(await response.arrayBuffer()).toString('base64')}`; } catch { /* Offline palette fallback. */ }
  }
  return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: brand.colors.bg, color: brand.colors.text, padding: 55, gap: 55, alignItems: 'center' }}><div style={{ display: 'flex', width: 310, height: 465, borderRadius: 28, overflow: 'hidden', background: `linear-gradient(145deg, ${title.palette[0]}, ${title.palette[1]})`, alignItems: 'flex-end', padding: poster ? 0 : 28, fontSize: 38 }}>{poster ? <img src={poster} alt="" width="310" height="465"/> : title.title}</div><div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 22 }}><div style={{ display: 'flex', color: brand.colors.marigold, fontSize: 30 }}>{brand.name} · Tonight’s contender</div><div style={{ display: 'flex', fontSize: title.title.length > 30 ? 48 : 64, fontWeight: 700 }}>{title.title}</div><div style={{ display: 'flex', fontSize: 28, color: brand.colors.muted }}>{title.year} · {title.originalLanguage}</div><div style={{ display: 'flex', fontSize: 34, color: brand.colors.teal }}>on {offer?.provider.name ?? 'your next movie night'}</div><div style={{ display: 'flex', fontSize: 20, color: brand.colors.muted }}>India · Availability is illustrative</div></div></div>, size);
}
