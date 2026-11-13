
import { formatCopy } from '@/lib/copy';
import { installCopy } from '@/.generated/copy/install';
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { brand } from '@/lib/brand';
export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  const pixels = Number(size);
  if (![180, 192, 512].includes(pixels)) return new Response(formatCopy(installCopy['icon_not_found']), { status: 404 });
  return new ImageResponse(<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: brand.colors.bg, color: brand.colors.text }}><div style={{ display: 'flex', alignItems: 'baseline', fontFamily: 'Bricolage Grotesque', fontSize: pixels * .55, fontWeight: 800, letterSpacing: -pixels * .035 }}>{brand.name[0]}<span style={{ color: brand.colors.marigold }}>{formatCopy(installCopy['separator'])}</span></div></div>, { width: pixels, height: pixels, fonts: [{ name: 'Bricolage Grotesque', data: await readFile(path.join(process.cwd(), 'public/fonts/BricolageGrotesque-800.ttf')), weight: 800, style: 'normal' }], headers: { 'Cache-Control': 'public, max-age=86400' } });
}
