import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { dataSource } from '@/lib/data';
import { decodePoll } from '@/lib/polls';
import { resolvePoll } from '@/lib/polls/server';
import { brand } from '@/lib/brand';
import { fitTitle } from '@/lib/poster-art';
import { deadlineLabel, pollNameLockup, posterSlots, uniqueMotifs } from '@/lib/polls/og';
import { GeneratedPosterSvg } from '@/components/poster/PosterArtwork';
export const runtime = 'nodejs';
const fonts = Promise.all([
  ['Bricolage Grotesque', 'BricolageGrotesque-800.ttf', 800],
  ['Inter', 'Inter-400.ttf', 400], ['Inter', 'Inter-600.ttf', 600],
].map(async ([name, file, weight]) => ({ name: String(name), data: await readFile(path.join(process.cwd(), 'public/fonts', String(file))), weight: weight as 400 | 600 | 800, style: 'normal' as const })));
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const encoded = new URL(request.url).searchParams.get('poll') ?? undefined;
  const snapshot = id.startsWith('ogdemo') ? decodePoll(encoded, id) : await resolvePoll(id, encoded);
  if (!snapshot) return new Response('A complete poll link is required.', { status: 400 });
  const catalog = await dataSource.listTitles();
  const found = snapshot.titleIds.map((id) => catalog.find((t) => t.id === id));
  if (found.some((title) => !title)) return new Response('Unknown title.', { status: 404 });
  const titles = found.map((title) => title!);
  const motifs = uniqueMotifs(titles), slots = posterSlots(titles.length), name = pollNameLockup(snapshot.name);
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: brand.colors.bg, color: brand.colors.text, fontFamily: 'Inter', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 760, height: 760, left: -150, top: -65, borderRadius: 380, background: 'radial-gradient(circle, #21465099, #0B0A1000)' }}/>
      {titles.map((title, index) => {
        const slot = slots[index], fit = fitTitle(title.title, 252, 28, 45);
        return <div key={title.id} style={{ display: 'flex', position: 'absolute', ...slot, transform: `rotate(${titles.length === 4 ? 0 : (index - (titles.length - 1) / 2) * 2}deg)`, borderRadius: 14, overflow: 'hidden', border: '1px solid #F5F3FA50', boxShadow: '0 10px 24px #0007' }}>
          <div style={{ display: 'flex', width: 300, height: 450, transform: `scale(${slot.width / 300})`, transformOrigin: 'top left', flexShrink: 0 }}>
            <GeneratedPosterSvg title={title} motifOverride={motifs[index]} definitionId={`poll-${index}`} showTypography={false}/>
            <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', left: 24, right: 24, bottom: 65, fontFamily: 'Bricolage Grotesque', fontWeight: 800, fontSize: fit.fontSize, lineHeight: 1.05, letterSpacing: -1.5 }}>
              {fit.lines.map((line, i) => <div style={{ display: 'flex' }} key={i}>{line}</div>)}
            </div>
            <div style={{ display: 'flex', position: 'absolute', left: 24, bottom: 24, fontSize: 11, letterSpacing: 1 }}>{title.originalLanguage.toUpperCase()} · {title.year}</div>
          </div>
        </div>;
      })}
      <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', left: 740, top: 48, width: 420, height: 534, justifyContent: 'center' }}>
        <div style={{ display: 'flex', fontFamily: 'Bricolage Grotesque', fontWeight: 800, fontSize: 42, marginBottom: 28 }}>{brand.name}<span style={{ color: brand.colors.marigold }}>.</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Bricolage Grotesque', fontSize: name.fontSize, fontWeight: 800, lineHeight: 1.05, marginBottom: 22 }}>
          {name.lines.map((line, i) => <div key={i} style={{ display: 'flex', whiteSpace: 'nowrap' }}>{line}</div>)}
        </div>
        <div style={{ display: 'flex', color: '#C9C4D6', fontSize: 20, lineHeight: 1.5, marginBottom: 24 }}>{titles.map((t) => t.title).join(' · ')}</div>
        <div style={{ display: 'flex', alignSelf: 'flex-start', background: '#21D4C419', border: '1px solid #21D4C460', color: brand.colors.teal, borderRadius: 24, padding: '10px 16px', fontWeight: 600, fontSize: 18, marginBottom: 24 }}>{deadlineLabel(snapshot.deadline)}</div>
        <div style={{ display: 'flex', fontSize: 23, lineHeight: 1.4, flexDirection: 'column' }}><div style={{ display: 'flex' }}>Vote in 10 seconds,</div><div style={{ display: 'flex' }}>no app needed</div></div>
      </div>
    </div>, { width: 1200, height: 630, fonts: await fonts });
}
