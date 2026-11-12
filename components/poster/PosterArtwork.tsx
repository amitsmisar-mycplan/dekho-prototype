import { posterDesign, fitTitle, type PosterTitle } from '@/lib/poster-art';
export type PosterArtProps = { title: PosterTitle; variant?: 'poster' | 'backdrop'; serviceColor?: string; serviceName?: string; showTypography?: boolean; renderedWidth?: number };
/** Hook-free renderer also used by the server-generated social card. */
export function GeneratedPosterSvg({ title, variant = 'poster', serviceColor, serviceName, definitionId: id, showTypography = true, renderedWidth }: PosterArtProps & { definitionId: string }) {
  const design = posterDesign(title); const wide = variant === 'backdrop';
  const w = wide ? 800 : 300, h = 450;
  const minimum = !wide && renderedWidth ? 18 * w / renderedWidth : 18;
  const { lines, fontSize, widths } = fitTitle(title.title, wide ? 270 : 252, minimum, wide ? 34 : Math.max(49, minimum));
  const baseline = wide ? 295 : 350 - (lines.length - 1) * fontSize * .94;
  const stroke = '#F5F3FA';
  return <svg className={`generated-art generated-art-${variant}`} width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${title.title} · generated ${variant}${serviceName ? ` · On your ${serviceName}` : ''}`} preserveAspectRatio="xMidYMid slice" data-art-id={title.id} data-motif={design.motif}>
    <defs>
      {[...design.palette, design.accent].map((color, i) => <radialGradient id={`${id}-blob-${i}`} key={i}><stop stopColor={color}/><stop offset="1" stopColor={color} stopOpacity="0"/></radialGradient>)}
      <linearGradient id={`${id}-shade`} x2="0" y2="1"><stop stopColor="#0B0A10" stopOpacity=".05"/><stop offset=".5" stopColor="#0B0A10" stopOpacity=".08"/><stop offset=".78" stopColor="#0B0A10" stopOpacity=".78"/><stop offset="1" stopColor="#0B0A10" stopOpacity=".96"/></linearGradient>
      <radialGradient id={`${id}-vignette`}><stop offset=".42" stopColor="#000" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity=".48"/></radialGradient>
      <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed={design.seed % 997} stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    </defs>
    <rect width={w} height={h} fill={design.palette[1]}/>
    {design.blobs.map((blob, i) => <ellipse key={i} cx={blob.x * w / 100} cy={blob.y * h / 100} rx={w * .85} ry={h * .75} fill={`url(#${id}-blob-${i})`} opacity={i === 2 ? .32 : 1}/>)}
    <g transform={`translate(${wide ? 370 : 0},${wide ? -25 : 0}) scale(${wide ? 1.38 : 1}) translate(${design.position.x},${design.position.y}) rotate(${design.tilt}) scale(${design.scale}) translate(-150,-150)`} stroke={stroke} fill="none" opacity=".76">
      {design.motif === 'thriller' && <g><path d="M18 236 228 26 272 26 62 236Z" fill={design.accent} stroke="none"/><path d="M70 254 280 44M5 193 194 4" strokeWidth="2"/><path d="M28 230 236 22" strokeWidth="13"/></g>}
      {design.motif === 'crime' && <g strokeWidth="2"><rect x="45" y="38" width="158" height="166" fill={design.accent} fillOpacity=".28"/><rect x="88" y="78" width="158" height="166"/><path d="M45 120H246M124 38V244" strokeDasharray="3 8"/><rect x="73" y="64" width="158" height="166" strokeWidth="13" opacity=".17"/></g>}
      {design.motif === 'comedy' && <g><circle cx="76" cy="164" r="45" fill={design.accent} strokeWidth="2"/><circle cx="178" cy="76" r="35" strokeWidth="14"/><circle cx="236" cy="183" r="26" fill={stroke}/><path d="M36 224Q150 264 270 224M46 238Q150 278 260 238" strokeWidth="2"/></g>}
      {design.motif === 'drama' && <g><path d="M20 168H280" strokeWidth="3"/><path d="M20 176H280M20 190H280M20 212H280M20 244H280" opacity=".45"/><path d="M52 166 142 66 247 166Z" fill={design.accent} fillOpacity=".5" stroke="none"/><path d="M142 66V166" strokeWidth="1"/></g>}
      {design.motif === 'sci-fi' && <g transform="rotate(-28 150 145)">{[35, 58, 81, 104].map((r, i) => <ellipse key={r} cx="150" cy="145" rx={r} ry={r * .67} strokeWidth={i === 2 ? 12 : 2} stroke={i === 2 ? design.accent : stroke}/>)}<path d="M18 145H282M150 28V262" opacity=".4"/></g>}
      {design.motif === 'romance' && <g><circle cx="111" cy="139" r="75" strokeWidth="2" fill={design.accent} fillOpacity=".4"/><circle cx="188" cy="139" r="75" strokeWidth="2"/><path d="M149 74Q226 139 149 204Q72 139 149 74" fill={stroke} fillOpacity=".3" stroke="none"/></g>}
    </g>
    <rect width={w} height={h} fill={`url(#${id}-vignette)`}/><rect width={w} height={h} fill={`url(#${id}-shade)`}/>
    <rect width={w} height={h} filter={`url(#${id}-grain)`} opacity={0.07} style={{ mixBlendMode: 'soft-light' }}/>
    {showTypography && <g fill="#F5F3FA" fontFamily="var(--font-display), sans-serif">
      {!wide && <text x="25" y="31" fontFamily="var(--font-ui), sans-serif" fontSize="10" letterSpacing="2.5" opacity=".9">{title.genres[0]?.toUpperCase() ?? 'CINEMA'}</text>}
      {title.type === 'series' && <g><rect x="24" y={baseline - fontSize - 23} width="148" height="23" fill="#0B0A10"/><text x="32" y={baseline - fontSize - 7} fontFamily="var(--font-ui), sans-serif" fontSize="11" letterSpacing="1.3">SERIES · {title.seasons && title.seasons > 1 ? `S1–S${title.seasons}` : 'S1'}</text></g>}
      <text x="24" y={baseline} fontSize={fontSize} fontWeight="800" letterSpacing={fontSize * -.045}>{lines.map((line, i) => <tspan key={i} x="24" dy={i ? fontSize * .94 : 0} textLength={widths[i]} lengthAdjust="spacingAndGlyphs">{line}</tspan>)}</text>
      {!wide && <path d={`M24 399H${w - 24}`} stroke="#F5F3FA" strokeOpacity=".35"/>}
      {!wide && <text x="24" y="425" fontFamily="var(--font-ui), sans-serif" fontSize="11" letterSpacing="1.5">{title.originalLanguage.toUpperCase()} · {title.year || 'TONIGHT'}</text>}
      {!wide && serviceColor && <circle cx={w - 30} cy="420" r="5" fill={serviceColor}><title>{`On your ${serviceName}`}</title></circle>}
    </g>}
  </svg>;
}
