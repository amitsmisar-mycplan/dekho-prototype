'use client';
import { formatCopy } from '@/lib/copy';
import { voterCopy } from '@/.generated/copy/voter';

import Link from 'next/link';
export default function PollError({ reset }: { reset: () => void }) { return <div className="vote-page poll-missing" role="alert"><div className="state-symbol" aria-hidden="true">{formatCopy(voterCopy['separator_5'])}</div><h1>{formatCopy(voterCopy['a_little_intermission'])}</h1><p>{formatCopy(voterCopy['the_movie_night_couldn_t_load_check_your_connection_and_give_it_a'])}</p><button className="button button-primary" onClick={reset}>{formatCopy(voterCopy['try_again'])}</button><Link className="text-action" href="/">{formatCopy(voterCopy['back_to_tonight'])}</Link></div>; }
