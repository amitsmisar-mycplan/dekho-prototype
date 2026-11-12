import { notFound } from 'next/navigation';
import { dataSource } from '@/lib/data';
import { TitlePreview } from '@/components/title-preview';
import { brand } from '@/lib/brand';
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const title = await dataSource.getTitle(slug);
  return { title: title ? `${title.title} — tonight on ${brand.name}` : 'Title not found' };
}
export default async function TitlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const title = await dataSource.getTitle(slug);
  if (!title) notFound();
  return <TitlePreview title={title} providers={await dataSource.listProviders()}/>;
}
