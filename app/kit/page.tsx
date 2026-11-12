import DesignKit from '@/components/design-kit';
import { dataSource } from '@/lib/data';
export default async function KitPage() { const [providers, titles] = await Promise.all([dataSource.listProviders(), dataSource.listTitles()]); return <DesignKit providers={providers} titles={titles}/>; }
