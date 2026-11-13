import { brand } from '@/lib/brand';
import { encodePoll } from '@/lib/polls';
export default function OgKitPage() {
  return <div style={{ padding: '24px 16px' }}><h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32 }}>Poll share cards</h1><p className="muted">{brand.name} · 1200 × 630. Open an image for full size. The outline marks the centered square crop; all posters stay inside it. Deadlines use India time.</p>
    {[2, 3, 4].map((count) => {
      const snapshot = { id: `ogdemo0${count}`, name: 'Friday movie night', note: '', titleIds: ['aavesham', 'kumbalangi-nights', 'the-family-man', 'pushpa-the-rise'].slice(0, count), deadline: '2030-01-04T15:30:00.000Z' };
      const src = `/p/${snapshot.id}/opengraph-image?poll=${encodePoll(snapshot)}`;
      return <section key={count} style={{ marginTop: 32 }}><h2>{count} titles</h2><a href={src} target="_blank" rel="noreferrer" aria-label={`Open ${count}-title OG image`} style={{ display: 'block', position: 'relative', marginTop: 12 }}>
        {/* Native image intentionally exercises the actual ImageResponse endpoint. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={1200} height={630} alt={`${count} generated posters and Friday movie night poll details`} style={{ width: '100%', height: 'auto', borderRadius: 12 }}/>
        <span aria-hidden="true" style={{ position: 'absolute', pointerEvents: 'none', top: 0, bottom: 0, left: '23.75%', width: '52.5%', border: '1px dashed #21D4C4' }}/>
      </a></section>;
    })}
  </div>;
}
