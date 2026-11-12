import { ImageResponse } from 'next/og';
import { dataSource } from '@/lib/data';
import { brand } from '@/lib/brand';
import { fitTitle } from '@/lib/poster-art';
import { GeneratedPosterSvg } from '@/components/poster/PosterArtwork';
export const alt = 'Tonight’s movie pick';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const title = await dataSource.getTitle((await params).slug);
  if (!title) return new Response('Title not found', { status: 404 });
  const lockup = fitTitle(title.title);
  const offers = await dataSource.getProviders(title.id);
  const offer = offers.find((o) => o.type === 'stream' || o.type === 'free') ?? offers[0];
  return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: brand.colors.bg, color: brand.colors.text, padding: 55, gap: 55, alignItems: 'center' }}><div style={{ display: 'flex', position: 'relative', width: 300, height: 450, borderRadius: 24, overflow: 'hidden' }}><GeneratedPosterSvg title={title} definitionId="social-art" showTypography={false}/><div style={{ position: 'absolute', left: 24, right: 24, bottom: 65, display: 'flex', flexDirection: 'column', fontSize: lockup.fontSize, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1 }}>{title.type === 'series' && <div style={{ display: 'flex', fontSize: 11, letterSpacing: 1, marginBottom: 12 }}>SERIES · S1{title.seasons && title.seasons > 1 ? `–S${title.seasons}` : ''}</div>}{lockup.lines.map((line, i) => <div style={{ display: 'flex' }} key={i}>{line}</div>)}</div><div style={{ display: 'flex', position: 'absolute', left: 24, bottom: 23, fontSize: 11, letterSpacing: 1 }}>{title.originalLanguage.toUpperCase()} · {title.year}</div></div><div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 22 }}><div style={{ display: 'flex', color: brand.colors.marigold, fontSize: 30 }}>{brand.name} · Tonight’s contender</div><div style={{ display: 'flex', fontSize: title.title.length > 30 ? 48 : 64, fontWeight: 700 }}>{title.title}</div><div style={{ display: 'flex', fontSize: 28, color: brand.colors.muted }}>{title.year} · {title.originalLanguage}</div><div style={{ display: 'flex', fontSize: 34, color: brand.colors.teal }}>on {offer?.provider.name ?? 'your next movie night'}</div><div style={{ display: 'flex', fontSize: 20, color: brand.colors.muted }}>India · Availability is illustrative</div></div></div>, size);
}
