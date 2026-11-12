import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { dataSource } from '../lib/data';
import { posterDesign, posterSeed, titleLockup } from '../lib/poster-art';
import { GeneratedPoster } from '../components/poster/GeneratedPoster';
describe('generated key art', () => {
  it('is deterministic with distinct seeds for all 68 titles and all blob centres inside the canvas', async () => {
    const titles = await dataSource.listTitles();
    expect(titles).toHaveLength(68);
    expect(new Set(titles.map((t) => posterSeed(t.id))).size).toBe(68);
    for (const title of titles) {
      const design = posterDesign(title); expect(design).toEqual(posterDesign(structuredClone(title)));
      expect(design.blobs).toHaveLength(3); expect(design.blobs.every((p) => p.x >= 0 && p.x <= 100 && p.y >= 0 && p.y <= 100)).toBe(true);
      const lines = titleLockup(title.title); expect(lines.join(' ')).toBe(title.title); expect(lines.length).toBeLessThanOrEqual(3);
      if (title.title.includes(' ')) expect(lines.length).toBeGreaterThanOrEqual(2);
    }
  });
  it('uses primary mood and genre without changing with user preferences', async () => {
    const title = (await dataSource.getTitle('vikram'))!;
    for (const [mood, color] of Object.entries({ 'Edge-of-seat': '#9D243C', 'Feel-good': '#E5AD51', 'Mind-bender': '#8855CE', Family: '#268F88', Laugh: '#E47C39' })) {
      expect(posterDesign({ ...title, moods: [mood as typeof title.moods[number]] }).accent).toBe(color);
    }
    for (const genre of ['Thriller', 'Crime', 'Comedy', 'Drama', 'Romance']) expect(posterDesign({ ...title, genres: [genre] }).motif).toBe(genre.toLowerCase());
    expect(posterDesign({ ...title, genres: ['Science Fiction'] }).motif).toBe('sci-fi');
  });
  it('renders every title without external images, with film grain, metadata and stable aspect ratios', async () => {
    for (const title of await dataSource.listTitles()) {
      const html = renderToStaticMarkup(createElement(GeneratedPoster, { title }));
      expect(html).toContain('viewBox="0 0 300 450"'); expect(html).toContain('feTurbulence'); expect(html).toContain('opacity="0.07"');
      expect(html).toContain(title.originalLanguage.toUpperCase()); expect(html).toContain(String(title.year));
      expect(html).not.toMatch(/<image|<img|https?:\/\//);
      if (title.type === 'series') expect(html).toContain('SERIES · S1');
    }
    const title = (await dataSource.getTitle('panchayat'))!;
    const html = renderToStaticMarkup(createElement(GeneratedPoster, { title, variant: 'backdrop', serviceColor: '#65CFFF', serviceName: 'Prime Video' }));
    expect(html).toContain('viewBox="0 0 800 450"'); expect(html).toContain('On your Prime Video'); expect(html).toContain('SERIES · S1–S3');
  });
  it('allocates separate SVG definitions when the same title is rendered twice', async () => {
    const title = (await dataSource.getTitle('vikram'))!;
    const html = renderToStaticMarkup(createElement('div', null, createElement(GeneratedPoster, { title }), createElement(GeneratedPoster, { title })));
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
