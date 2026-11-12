import { dataSource } from '@/lib/data';
import { SearchScreen } from '@/components/search-screen';
export default async function SearchPage() {
  const [titles, providers] = await Promise.all([dataSource.listTitles(), dataSource.listProviders()]);
  return <SearchScreen titles={titles} providers={providers}/>;
}
