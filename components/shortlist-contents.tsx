'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { dataSource } from '@/lib/data';
import { usePrototype } from '@/lib/store';
import { Button } from '@/components/ui';
export function ShortlistContents({ ids, onNavigate }: { ids: string[]; onNavigate: () => void }) {
  const [names, setNames] = useState<Record<string, string>>({});
  useEffect(() => { let active = true; dataSource.listTitles().then((titles) => { if (active) setNames(Object.fromEntries(titles.map((t) => [t.id, t.title]))); }); return () => { active = false; }; }, []);
  return <><p className="muted">Up to four picks. Zero endless debates.</p>{ids.map((id) => <div className="shortlist-row" key={id}>{names[id] ? <Link href={`/t/${id}`} onClick={onNavigate}>{names[id]}</Link> : <strong>{id}</strong>}<Button variant="ghost" onClick={() => usePrototype.getState().toggleShortlist(id)}>Remove</Button></div>)}<p className="prototype-note">Poll creation and sharing arrive in a later phase.</p></>;
}
