import { cache } from 'react';
import { cloudPollsEnabled } from './config';
import { pollStore } from './index';
import { decodePoll } from './share';
/** Server read for title metadata, SSR options and ID-only links. No device header. */
export const resolvePoll = cache(async (id: string, encoded?: string) => cloudPollsEnabled ? pollStore.getPoll(id) : decodePoll(encoded, id));
