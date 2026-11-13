'use client';
import { formatCopy } from '@/lib/copy';
import { resultsCopy } from '@/.generated/copy/results';

import { useState } from 'react';
import WinnerReveal from './winner-reveal';
import type { PollOption } from './poll-room';
import type { ResultCard } from '@/lib/polls/result-card';
export function SharedResult({ card, options }: { card: ResultCard; options: PollOption[] }) {
  const [open, setOpen] = useState(true);
  const scores = card.rows.map((r) => ({ ...r, score: r.up - r.down, rating: options.find((o) => o.id === r.id)?.rating ?? 0, takes: r.takes.map((t) => ({ ...t, score: 1 as const })) })).sort((a, b) => b.score - a.score || b.rating - a.rating || card.poll.titleIds.indexOf(a.id) - card.poll.titleIds.indexOf(b.id));
  const winner = options.find((o) => o.id === scores[0]?.id); if (!winner) return <p>{formatCopy(resultsCopy['that_result_is_unavailable'])}</p>;
  return <div className="vote-page"><h1>{formatCopy(resultsCopy['tonight'])}{winner.title}</h1><p>{formatCopy(resultsCopy['a_shared_snapshot_of'])}{card.poll.name}{formatCopy(resultsCopy['separator'])}</p><button className="button button-primary" onClick={() => setOpen(true)}>{formatCopy(resultsCopy['show_result'])}</button>{open && <WinnerReveal poll={{ ...card.poll, votes: {}, expectedVoters: 0 }} options={options} winner={winner} scores={scores} streak={0} onClose={() => setOpen(false)} sharedCard={card}/>}</div>;
}
