import { dataSource } from '@/lib/data';
import { HomeScreen } from '@/components/home-screen';
export default async function Home() {
  const [titles, providers] = await Promise.all([dataSource.listTitles(), dataSource.listProviders()]);
  return <HomeScreen titles={titles} providers={providers}/>;
}
