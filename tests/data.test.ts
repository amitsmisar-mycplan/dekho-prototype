import { describe, expect, it } from 'vitest';
import { dataSource, JsonDataSource, similarity, type Title } from '../lib/data';
import { selectArtworkMatch, validImagePath, type TmdbCandidate } from '../scripts/tmdb-match';

async function fixture() {
  const info = await dataSource.getCatalogInfo();
  const { titleCount: _count, ...metadata } = info;
  void _count;
  return { catalog: { ...metadata, titles: await dataSource.listTitles() }, providers: await dataSource.listProviders() };
}
describe('catalog integrity', () => {
  it('contains 60 unique titles, 10 providers and all eight languages', async () => {
    const titles = await dataSource.listTitles();
    expect(titles).toHaveLength(60);
    expect(new Set(titles.map((t) => t.id)).size).toBe(60);
    expect(new Set(titles.map((t) => t.slug)).size).toBe(60);
    expect(await dataSource.listProviders()).toHaveLength(10);
    expect(Object.fromEntries(['Hindi', 'English', 'Malayalam', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi'].map((language) => [language, titles.filter((t) => t.originalLanguage === language).length]))).toEqual({ Hindi: 18, English: 12, Malayalam: 8, Tamil: 7, Telugu: 7, Kannada: 3, Bengali: 3, Marathi: 2 });
    expect((await dataSource.getCatalogInfo()).illustrative).toBe(true);
    expect(titles.some((t) => t.type === 'series')).toBe(true);
  });
  it('rejects broken provider references, unsafe URLs, duplicate ids and invalid ratings', async () => {
    const { catalog, providers } = await fixture();
    const badProvider = structuredClone(catalog); badProvider.titles[0].providers[0].providerId = 'missing';
    expect(() => new JsonDataSource(badProvider, providers)).toThrow('provider reference');
    const badLink = structuredClone(catalog); badLink.titles[0].providers[0].deepLink = 'javascript:alert(1)';
    expect(() => new JsonDataSource(badLink, providers)).toThrow('unsafe provider link');
    const badRating = structuredClone(catalog); badRating.titles[0].tmdbRating = NaN;
    expect(() => new JsonDataSource(badRating, providers)).toThrow('rating');
    expect(() => new JsonDataSource({ ...catalog, titles: [...catalog.titles, catalog.titles[0]] }, providers)).toThrow('duplicate');
  });
  it('returns isolated data so callers cannot mutate subsequent searches', async () => {
    const panchayat = (await dataSource.getTitle('panchayat'))!;
    panchayat.title = 'Changed'; panchayat.cast.length = 0;
    const providers = await dataSource.listProviders(); providers[0].name = 'Changed';
    expect((await dataSource.getTitle('panchayat'))?.title).toBe('Panchayat');
    expect((await dataSource.getTitle('panchayat'))?.cast).toHaveLength(4);
    expect((await dataSource.listProviders())[0].name).toBe('Netflix');
  });
});
describe('search', () => {
  it.each(['panchayat', 'panchayath', '  PANCHAYAT  ', 'पंचायत', 'panchayt'])('finds Panchayat for %s', async (query) => {
    expect((await dataSource.searchTitles(query))[0]?.slug).toBe('panchayat');
  });
  it('matches aliases, cast names, accents, punctuation and multiword typos', async () => {
    expect((await dataSource.searchTitles('lapata ladies'))[0]?.title).toBe('Laapataa Ladies');
    expect((await dataSource.searchTitles('manjumel boy'))[0]?.title).toBe('Manjummel Boys');
    expect((await dataSource.searchTitles('Fahadh Faasil')).some((t) => t.title === 'Joji')).toBe(true);
    expect((await dataSource.searchTitles('Timothée Chalamet')).map((t) => t.title)).toContain('Dune');
    expect((await dataSource.searchTitles('K.G.F'))[0]?.title).toBe('K.G.F: Chapter 1');
    expect((await dataSource.searchTitles('12 fail'))[0]?.title).toBe('12th Fail');
  });
  it('returns empty results for blank, punctuation and unrelated queries', async () => {
    for (const query of ['', '  ', '!!!', 'zzzzzzzz', 'panchayat zzzzzz']) expect(await dataSource.searchTitles(query)).toEqual([]);
    expect(await dataSource.getTitle('unknown')).toBeNull();
  });
});
describe('explainable similarity', () => {
  it('ranks Malayalam thrillers first for a Malayalam thriller', async () => {
    const results = await dataSource.getSimilar('drishyam-2-malayalam', 5);
    expect(results.slice(0, 3).map((r) => r.title.title).sort()).toEqual(['Anjaam Pathiraa', 'Iratta', 'Joji']);
    expect(results.slice(0, 3).every((r) => r.title.originalLanguage === 'Malayalam' && r.title.genres.includes('Thriller'))).toBe(true);
    expect(results.every((r) => r.title.id !== 'drishyam-2-malayalam' && r.score >= 0 && r.score <= 1 && r.because.length > 0)).toBe(true);
    expect(await dataSource.getSimilar('drishyam-2-malayalam', 5)).toEqual(results);
  });
  it('uses the specified weight budget without awarding nonexistent people matches', async () => {
    const source = (await dataSource.getTitle('joji'))!;
    const same: Title = { ...source, id: 'same', slug: 'same' };
    expect(similarity(source, same).score).toBe(1);
    const sameDirectorOnly = { ...same, cast: ['A', 'B', 'C', 'D'], tmdbRating: 5.5 };
    expect(similarity(source, sameDirectorOnly).score).toBe(0.775);
    expect(similarity(source, sameDirectorOnly).because).toContain('Same director');
    expect(similarity(source, sameDirectorOnly).because).not.toContain('With ');
    expect(similarity(source, sameDirectorOnly).because).not.toContain('Similar rating band');
    const unrelated = { ...sameDirectorOnly, director: 'Other', languages: ['English'] as Title['languages'], genres: ['Animation'] };
    expect(similarity(source, unrelated).score).toBe(0);
  });
  it('handles unknown titles and invalid limits without odd slices', async () => {
    expect(await dataSource.getSimilar('missing')).toEqual([]);
    for (const limit of [0, -1, NaN, Infinity]) expect(await dataSource.getSimilar('joji', limit)).toEqual([]);
    expect(await dataSource.getSimilar('joji', 2.9)).toHaveLength(2);
  });
  it('provides three reproducible recommendation samples', async () => {
    for (const slug of ['drishyam-2-malayalam', 'vikram', 'knives-out']) {
      const title = await dataSource.getTitle(slug);
      const results = await dataSource.getSimilar(slug, 5);
      expect(results).toHaveLength(5);
      console.info(`\n${title?.title}:\n${results.map((r) => `${r.title.title} (${r.score}) — ${r.because}`).join('\n')}`);
    }
  });
});
describe('providers and mood picks', () => {
  it('sorts your services first and preserves rent/buy INR prices and offer types', async () => {
    const offers = await dataSource.getProviders('oppenheimer', ['prime-video']);
    expect(offers.map((o) => o.type)).toEqual(['rent', 'buy', 'stream']);
    expect(offers[0].onYourServices).toBe(true);
    expect(offers[0].priceInr).toBe(149);
    expect(offers[1].priceInr).toBe(499);
    expect(offers[2].onYourServices).toBe(false);
    expect((await dataSource.getProviders('jersey')).some((o) => o.type === 'free')).toBe(true);
    expect(await dataSource.getProviders('missing')).toEqual([]);
  });
  it('falls back to provider homepage if an offer has no deep link', async () => {
    const { catalog, providers } = await fixture();
    delete catalog.titles[0].providers[0].deepLink;
    const source = new JsonDataSource(catalog, providers);
    expect((await source.getProviders('panchayat'))[0].deepLink).toBe('https://www.primevideo.com/');
  });
  it('keeps moods and language filters honest and prioritizes included access', async () => {
    const picks = await dataSource.getMoodPicks('Edge-of-seat', { languages: ['Malayalam'], services: ['prime-video'] }, 8);
    expect(picks.length).toBeGreaterThan(0);
    expect(picks.every((t) => t.languages.includes('Malayalam') && t.moods.includes('Edge-of-seat'))).toBe(true);
    expect(picks[0].providers.some((p) => p.providerId === 'prime-video' && p.type === 'stream')).toBe(true);
    expect(await dataSource.getMoodPicks('Family', { languages: ['Malayalam'] })).toEqual([]);
    expect(await dataSource.getMoodPicks('Laugh', {}, 0)).toEqual([]);
  });
});
describe('optional TMDb artwork matching', () => {
  const target = { title: 'Drishyam 2 (Malayalam)', aliases: [], type: 'movie' as const, originalLanguage: 'Malayalam', year: 2021 };
  const result: TmdbCandidate = { id: 1, title: 'Drishyam 2', original_language: 'ml', release_date: '2021-02-19', poster_path: '/poster.jpg', backdrop_path: null };
  it('matches exact title, year and language without selecting a Hindi remake', () => {
    expect(selectArtworkMatch(target, [result, { ...result, id: 2, original_language: 'hi', release_date: '2022-11-18' }])).toEqual(result);
    expect(selectArtworkMatch(target, [{ ...result, original_language: 'hi' }])).toBeNull();
    expect(selectArtworkMatch(target, [{ ...result, release_date: '2022-01-01' }])).toBeNull();
  });
  it('skips ambiguous results and rejects unsafe paths', () => {
    expect(selectArtworkMatch(target, [result, { ...result, id: 2 }])).toBeNull();
    expect(validImagePath('/abc-123.jpg')).toBe(true);
    for (const path of ['https://example.com/poster.jpg', '//evil.test/a.jpg', '/../a.jpg', null]) expect(validImagePath(path)).toBe(false);
  });
  it('uses first-air date and TV names for series', () => {
    expect(selectArtworkMatch({ ...target, title: 'Panchayat', type: 'series', year: 2020, originalLanguage: 'Hindi' }, [{ ...result, title: undefined, name: 'Panchayat', original_language: 'hi', first_air_date: '2020-04-03' }])?.id).toBe(1);
  });
});
