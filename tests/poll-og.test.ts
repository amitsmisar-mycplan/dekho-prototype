import { describe, expect, it } from 'vitest';
import { fitTitle } from '../lib/poster-art';
import { dataSource } from '../lib/data';
import { deadlineLabel, pollNameLockup, posterSlots, uniqueMotifs } from '../lib/polls/og';
describe('poll social artwork', () => {
  it('keeps all posters in the central square without overlaps for 2–4 picks', () => {
    for (const count of [2, 3, 4]) {
      const slots = posterSlots(count);
      expect(slots).toHaveLength(count);
      for (const slot of slots) { expect(slot.left).toBeGreaterThanOrEqual(285); expect(slot.left + slot.width).toBeLessThanOrEqual(915); expect(slot.top).toBeGreaterThanOrEqual(0); expect(slot.top + slot.height).toBeLessThanOrEqual(630); }
      slots.forEach((a, i) => slots.slice(i + 1).forEach((b) => expect(a.left + a.width <= b.left || b.left + b.width <= a.left || a.top + a.height <= b.top || b.top + b.height <= a.top).toBe(true)));
    }
  });
  it('preserves every catalog title in the OG lockup', async () => {
    for (const title of await dataSource.listTitles()) expect(fitTitle(title.title, 252, 28, 45).lines.join(' ')).toBe(title.title);
  });
  it('assigns unique motifs even when every genre matches', async () => {
    const titles = (await dataSource.listTitles()).slice(0, 4).map((t) => ({ ...t, genres: ['Thriller'] }));
    expect(new Set(uniqueMotifs(titles)).size).toBe(4);
    expect(uniqueMotifs(titles)).toEqual(uniqueMotifs(titles));
  });
  it('uses at most two explicit poll-name lines and an India deadline', () => {
    for (const name of ['Friday movie night', 'One', 'A very long movie night name that our whole group can enjoy together this evening']) {
      const fit = pollNameLockup(name); expect(fit.lines.length).toBeLessThanOrEqual(2); expect(fit.lines.join(' ')).toBe(name); expect(fit.fontSize).toBeGreaterThan(0);
    }
    expect(deadlineLabel('2030-01-04T15:30:00.000Z')).toBe('Closes 9:00 pm');
  });
});
