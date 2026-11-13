
import { formatCopy } from '@/lib/copy';
import { titleCopy } from '@/.generated/copy/title';
import { notFound } from 'next/navigation';
import { dataSource } from '@/lib/data';
import { TitlePreview } from '@/components/title-preview';
import { brand } from '@/lib/brand';
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const title = await dataSource.getTitle(slug);
  return { title: title ? formatCopy(titleCopy['value_tonight_on_value_2'], { p1: title.title, p2: brand.name }) : formatCopy(titleCopy['title_not_found']), ...(title ? { openGraph: { images: [{ url: `/t/${title.slug}/opengraph-image`, width: 1200, height: 630 }] } } : {}) };
}
export default async function TitlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const title = await dataSource.getTitle(slug);
  if (!title) notFound();
  const [providers, offers, similar, titles] = await Promise.all([dataSource.listProviders(), dataSource.getProviders(title.id), dataSource.getSimilar(title.id, 68), dataSource.listTitles()]);
  const versions = titles.filter((candidate) => candidate.id === title.remakeOf || candidate.remakeOf === title.id);
  return <TitlePreview key={title.id} title={title} providers={providers} offers={offers} similar={similar} versions={versions}/>;
}
