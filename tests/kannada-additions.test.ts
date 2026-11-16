import { expect, it } from 'vitest';
import { dataSource, hasAdsOffer, hasOriginalAudio, JsonDataSource, selectableLanguages } from '../lib/data';
import { titleRecommendations, versionLabel } from '../lib/title-details';
import { defaultPreferences } from '../lib/preferences';
import { MIN_TITLES_PER_LANGUAGE } from '../lib/catalog-config';

it('adds five complete, verified Kannada films with explicitly illustrative ratings and search evidence', async () => {
  const titles = await dataSource.listTitles();
  const added = titles.filter(t => t.verifiedAt === '2026-11-16');
  expect(added).toHaveLength(5);
  for (const t of added) {
    expect(t.languages).toEqual(['Kannada']);
    expect(t.cast).toHaveLength(4);
    expect(t.tmdbRatingIllustrative).toBe(true);
    expect(t.sourceUrl).toBe(`https://www.justwatch.com/in/search?q=${encodeURIComponent(t.title)}`);
    expect(t.providers.every(o => o.verifiedAt === t.verifiedAt)).toBe(true);
    expect((await dataSource.searchTitles(t.aliases[0])).map(r => r.id)).toContain(t.id);
  }
  expect(MIN_TITLES_PER_LANGUAGE).toBe(4);
  expect(selectableLanguages(titles)).toContain('Kannada');
  expect(selectableLanguages(titles)).not.toContain('Bengali');
  expect(selectableLanguages(titles)).not.toContain('Marathi');
});
it('preserves the five verified provider assignments and distinguishes dubs from original languages', async () => {
  const kgf = (await dataSource.getTitle('k-g-f-chapter-2'))!;
  expect(kgf.providers.map(o => [o.providerId,o.type])).toEqual([['prime-video','stream'],['prime-video','rent']]);
  const su = (await dataSource.getTitle('su-from-so'))!;
  expect(su.providers).toHaveLength(1);
  expect(su.providers[0]).toMatchObject({providerId:'jiohotstar',type:'stream',languages:['Kannada','Telugu','Malayalam']});
  expect(hasOriginalAudio(su,su.providers[0])).toBe(true);
  expect(su.languages).toEqual(['Kannada']);
  const kirik = (await dataSource.getTitle('kirik-party'))!;
  expect(kirik.providers).toHaveLength(1);
  expect(kirik.providers[0]).toMatchObject({providerId:'jiohotstar',type:'free',ads:true});
  expect(hasAdsOffer(kirik)).toBe(true);
  for(const [id,providerId] of [['sapta-saagaradaache-ello-side-a','prime-video'],['garuda-gamana-vrishabha-vahana','zee5']]) {
    const t=(await dataSource.getTitle(id))!;expect(t.providers).toHaveLength(1);expect(t.providers[0]).toMatchObject({providerId,type:'stream'});
  }
});
it('pins Chapter 1 first for Chapter 2, without duplicates or a remake label', async () => {
  const chapter2 = (await dataSource.getTitle('k-g-f-chapter-2'))!;
  const chapter1 = (await dataSource.getTitle('k-g-f-chapter-1'))!;
  expect(chapter2.sequelOf).toBe(chapter1.id);
  expect(chapter2.remakeOf).toBeUndefined();
  const recommendations = titleRecommendations(chapter2,await dataSource.getSimilar(chapter2.id,73),[chapter1],{...defaultPreferences(),services:['netflix']},true);
  expect(recommendations[0]).toMatchObject({title:{id:chapter1.id},because:'Previous chapter'});
  expect(recommendations.filter(r=>r.title.id===chapter1.id)).toHaveLength(1);
  expect(versionLabel(chapter1,chapter2)).toBe('Next chapter');
});
it('rejects dangling and self sequel links', async () => {
  const titles=await dataSource.listTitles(), providers=await dataSource.listProviders(), info=await dataSource.getCatalogInfo();
  for (const id of ['missing',titles[0].id]) {
    titles[0].sequelOf=id;expect(()=>new JsonDataSource({...info,titles},providers)).toThrow('sequel reference');
  }
});
