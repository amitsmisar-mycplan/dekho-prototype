import CatalogLab from '@/components/catalog-lab';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Catalog lab' };
export default async function CatalogPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <CatalogLab query={typeof params.q === 'string' ? params.q.slice(0, 160) : ''} slug={typeof params.title === 'string' ? params.title : 'drishyam-2-malayalam'} service={typeof params.service === 'string' ? params.service : ''} language={typeof params.language === 'string' ? params.language : ''}/>;
}
