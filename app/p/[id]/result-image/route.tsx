import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { dataSource } from '@/lib/data';
import { brand } from '@/lib/brand';
import { parseResult, decodeResult } from '@/lib/polls/result-card';
import { GeneratedPosterSvg } from '@/components/poster/PosterArtwork';
import { fitTitle } from '@/lib/poster-art';
export const runtime = 'nodejs';
const fonts = Promise.all([['Bricolage Grotesque', 'BricolageGrotesque-800.ttf', 800], ['Inter', 'Inter-400.ttf', 400], ['Inter', 'Inter-600.ttf', 600]].map(async ([name, file, weight]) => ({ name: String(name), data: await readFile(path.join(process.cwd(), 'public/fonts', String(file))), weight: weight as 400 | 600 | 800, style: 'normal' as const })));
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, context: Context) { return render(request, context, decodeResult(new URL(request.url).searchParams.get('result') ?? undefined)); }
export async function POST(request: Request, context: Context) { const text = await request.text(); if (text.length > 65000) return new Response('Result too large', { status: 413 }); try { return render(request, context, parseResult(JSON.parse(text))); } catch { return new Response('Invalid result', { status: 400 }); } }
async function render(request: Request, context: Context, card: ReturnType<typeof parseResult>) {
  const { id } = await context.params;
  if (!card || card.poll.id !== id || !card.rows.some((r) => r.up || r.down)) return new Response('A completed result is required', { status: 400 });
  const catalog = await dataSource.listTitles(); if (card.rows.some((r) => !catalog.some((t) => t.id === r.id))) return new Response('Unknown title', { status: 404 });
  const rows = [...card.rows].sort((a, b) => (b.up - b.down) - (a.up - a.down) || catalog.find((t) => t.id === b.id)!.tmdbRating - catalog.find((t) => t.id === a.id)!.tmdbRating || card.poll.titleIds.indexOf(a.id) - card.poll.titleIds.indexOf(b.id));
  const winner = catalog.find((t) => t.id === rows[0].id)!, story = new URL(request.url).searchParams.get('format') === 'story';
  const width = story ? 1080 : 1200, height = story ? 1920 : 630, posterW = story ? 360 : 280, fit = fitTitle(winner.title, 252, 18, 45), takes = rows[0].takes.slice(0, story ? 6 : 3);
  return new ImageResponse(<div style={{ display: 'flex', flexDirection: story ? 'column' : 'row', width, height, padding: story ? '65px 70px' : '40px 45px', background: 'radial-gradient(circle at 20% 30%, #213C43, #0B0A10 65%)', color: brand.colors.text, fontFamily: 'Inter', gap: story ? 28 : 45 }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: story ? '100%' : 300, flexShrink: 0 }}><div style={{ display: 'flex', fontFamily: 'Bricolage Grotesque', fontWeight: 800, fontSize: 42, marginBottom: 25 }}>{brand.name}<span style={{ color: brand.colors.marigold }}>.</span></div><div style={{ display: 'flex', width: posterW, height: posterW * 1.5, borderRadius: 24, overflow: 'hidden', border: '1px solid #FFFFFF55', position: 'relative' }}><div style={{ display: 'flex', width: 300, height: 450, flexShrink: 0, transform: `scale(${posterW / 300})`, transformOrigin: 'top left' }}><GeneratedPosterSvg title={winner} definitionId="result-winner" showTypography={false}/><div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', left: 24, right: 24, bottom: 65, fontFamily: 'Bricolage Grotesque', fontSize: fit.fontSize, lineHeight: 1, fontWeight: 800 }}>{fit.lines.map((line, i) => <div key={i} style={{ display: 'flex' }}>{line}</div>)}</div></div></div></div>
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}><div style={{ display: 'flex', color: brand.colors.teal, fontSize: story ? 24 : 16, marginBottom: 12 }}>{card.poll.name}</div><div style={{ display: 'flex', fontFamily: 'Bricolage Grotesque', fontWeight: 800, fontSize: story ? 58 : winner.title.length > 28 ? 37 : 50, lineHeight: 1.04, marginBottom: 18 }}>Tonight: {winner.title}</div><div style={{ display: 'flex', color: brand.colors.marigold, fontWeight: 600, fontSize: story ? 28 : 22, marginBottom: 20 }}>{rows[0].up} up · {rows[0].down} down · net {rows[0].up - rows[0].down}</div>
      {takes.map((t, i) => <div key={i} style={{ display: 'flex', flexDirection: 'column', marginBottom: 14, paddingLeft: 16, borderLeft: '3px solid #21D4C4', fontSize: story ? 25 : 18 }}><div style={{ display: 'flex' }}>“{t.take}”</div><div style={{ display: 'flex', color: '#BEB8CE', fontSize: story ? 20 : 14, marginTop: 4 }}>{t.name}</div></div>)}
      {rows[0].takes.length > takes.length && <div style={{ display: 'flex', color: '#BEB8CE', fontSize: 16 }}>+{rows[0].takes.length - takes.length} more takes in the result link</div>}
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16, paddingTop: 16, borderTop: '1px solid #FFFFFF30', fontSize: story ? 23 : 16 }}>{rows.slice(1).map((row) => <div key={row.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}><span>{catalog.find((t) => t.id === row.id)!.title}</span><span style={{ marginLeft: 20, color: '#BEB8CE' }}>{row.up} up · {row.down} down</span></div>)}</div>
    </div>
  </div>, { width, height, fonts: await fonts });
}
