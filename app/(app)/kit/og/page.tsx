
import { checkinCopy as c } from '@/.generated/copy/checkin';
import { formatCopy } from '@/lib/copy';
import { kitCopy } from '@/.generated/copy/kit';
import { brand } from '@/lib/brand';
import { encodePoll } from '@/lib/polls';
export default function OgKitPage() {
  return <div style={{ padding: '24px 16px' }}><h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32 }}>{formatCopy(kitCopy['poll_share_cards'])}</h1><p className="muted">{brand.name} {formatCopy(kitCopy['1200_630_open_an_image_for_full_size_the_outline_marks_the_center'])}</p>
    {[2, 3, 4].map((count) => {
      const snapshot = { id: `ogdemo0${count}`, name: formatCopy(kitCopy['friday_movie_night']), note: '', titleIds: ['aavesham', 'kumbalangi-nights', 'the-family-man', 'pushpa-the-rise'].slice(0, count), deadline: '2030-01-04T15:30:00.000Z' };
      const src = `/p/${snapshot.id}/opengraph-image?poll=${encodePoll(snapshot)}`;
      return <section key={count} style={{ marginTop: 32 }}><h2>{count} {formatCopy(kitCopy['titles'])}</h2><a href={src} target="_blank" rel="noreferrer" aria-label={formatCopy(kitCopy['open_value_title_og_image'], { p1: count })} style={{ display: 'block', position: 'relative', marginTop: 12 }}>
        {/* Native image intentionally exercises the actual ImageResponse endpoint. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={1200} height={630} alt={formatCopy(kitCopy['value_generated_posters_and_friday_movie_night_poll_details'], { p1: count })} style={{ width: '100%', height: 'auto', borderRadius: 12 }}/>
        <span aria-hidden="true" style={{ position: 'absolute', pointerEvents: 'none', top: 0, bottom: 0, left: '23.75%', width: '52.5%', border: '1px dashed #21D4C4' }}/>
      </a></section>;
    })}
    <h2 style={{marginTop:40}}>{formatCopy(c.verdictPreviews)}</h2>
    {(['loved','liked','split'] as const).map(mood=><section key={mood} style={{marginTop:28}}><h3>{formatCopy(c[mood==='loved'?'previewLoved':mood==='liked'?'previewLiked':'previewSplit'])}</h3>{(['wide','story'] as const).map(format=>{const src=`/p/verdict1/verdict-image?preview=${mood}&format=${format}`;return <a key={format} href={src} target="_blank" rel="noreferrer" style={{display:'block',marginTop:12}}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width={format==='wide'?1200:1080} height={format==='wide'?630:1920} alt={formatCopy(c.previewAlt,{mood,format})} style={{width:'100%',height:'auto',borderRadius:12}}/>
    </a>;})}</section>)}
  </div>;
}
