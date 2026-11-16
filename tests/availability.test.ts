import { afterEach, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import type { SupabaseClient } from '@supabase/supabase-js';
import { dataSource, hasAdsOffer, canPickTonight, hasOriginalAudio, moods, languages, JsonDataSource } from '../lib/data';
import { homeSelections, onServices, offerLabel } from '../lib/discovery';
import { defaultPreferences } from '../lib/preferences';
import { localPollStore } from '../lib/polls/local';
import { createSupabasePollStore } from '../lib/polls/supabase';
const blocked=['article-15','praktan','super-deluxe','ramprasad-ki-tehrvi','belaseshe','court'];
afterEach(()=>vi.unstubAllGlobals());
it('matches all 68 dated checklist rows',async()=>{
 const titles=await dataSource.listTitles(), providers=await dataSource.listProviders();
 const rows=readFileSync('scripts/availability-checklist-firstpass.md','utf8').split('\n').filter(l=>/^\| \d+ \|/.test(l));
 expect(rows).toHaveLength(68);
 let verified=0;
 for(const row of rows){const [,name,year,language,current,correct,,,date]=row.split('|').slice(1,-1).map(s=>s.trim());
 const t=titles.find(t=>String(t.year)===year&&t.originalLanguage===language&&(t.title===name||name===t.title+' (Malayalam)'||(name.startsWith('Glass Onion')&&t.id==='glass-onion')))!;expect(t).toBeTruthy();
 const label=t.providers.map(o=>`${providers.find(p=>p.id===o.providerId)!.name} (${[o.type,...o.ads?['ads']:[],...o.languages?[`${o.languages.join(', ')} only`]:[]].join(', ')})`).join('; ');
 if(!date){expect(t.verifiedAt).toBeNull();expect(label).toBe(current);expect(t.providers.every(o=>o.verifiedAt===null)).toBe(true);continue;}
 verified++;expect(t.verifiedAt).toBe(date);expect(t.providers.every(o=>o.verifiedAt===date)).toBe(true);
 if(correct.startsWith('NONE')){expect(t.providers).toEqual([]);expect(t.availability).toBe(correct.includes('rent/buy')?'rentOnly':'unavailable');}else expect(label).toBe(correct);
 }expect(verified).toBe(68);
});
it('never recommends unavailable or rent-only titles and never puts pending titles in the hero',async()=>{
 const titles=await dataSource.listTitles(), providers=await dataSource.listProviders();const prefs={...defaultPreferences(),services:providers.map(p=>p.id),languages:[...languages]};
 for(const t of titles){const recommendations=await dataSource.getSimilar(t.id,68);expect(recommendations.every(r=>!blocked.includes(r.title.id))).toBe(true);}
 for(const mood of moods)expect((await dataSource.getMoodPicks(mood,prefs,68)).every(t=>!blocked.includes(t.id))).toBe(true);
 const home=homeSelections(titles,prefs);expect(home.hero.every(t=>t.verifiedAt&&!blocked.includes(t.id))).toBe(true);
 expect(titles.filter(t=>!canPickTonight(t)).map(t=>t.id).sort()).toEqual([...blocked].sort());
});
it('keeps Hindi dubs out of original-language service claims and ranks original audio first',async()=>{
 const t=(await dataSource.getTitle('rrr'))!,providers=await dataSource.listProviders();
 const netflix=t.providers.find(o=>o.providerId==='netflix')!;expect(netflix.languages).toEqual(['Hindi']);expect(hasOriginalAudio(t,netflix)).toBe(false);
 expect(onServices(t,['netflix'])).toBe(false);expect(onServices(t,['zee5'])).toBe(true);
 expect(offerLabel(t,providers,{...defaultPreferences(),services:['netflix']}).text).toBe('ZEE5');
 const offers=await dataSource.getProviders(t.id,['netflix']);expect(offers[0].providerId).toBe('zee5');expect(offers.find(o=>o.providerId==='netflix')!.onYourServices).toBe(false);
});
it('limits every free Home rail and mood to original-language ads offers, including sparse languages',async()=>{
 const titles=await dataSource.listTitles();expect(titles.filter(hasAdsOffer)).toHaveLength(15);
 for(const language of languages){const prefs={...defaultPreferences(),freeOnly:true,languages:[language]};const home=homeSelections(titles,prefs);
 for(const t of [...home.eligible,...home.included,...home.hero,...home.trending,...home.free])expect(hasAdsOffer(t)).toBe(true);
 for(const mood of moods)expect((await dataSource.getMoodPicks(mood,prefs,68)).every(hasAdsOffer)).toBe(true);
 }
 expect(homeSelections(titles,{...defaultPreferences(),freeOnly:true,languages:['Bengali']}).eligible).toHaveLength(0);
 const fake={...titles[0],providers:[{providerId:'mx-player',type:'free' as const,verifiedAt:null}]};expect(hasAdsOffer(fake)).toBe(false);
});
it('rejects all six unavailable titles at both PollStore creation boundaries, before any cloud write',async()=>{
 const values=new Map<string,string>();vi.stubGlobal('localStorage',{getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>values.set(k,v)});vi.stubGlobal('window',new EventTarget());vi.stubGlobal('BroadcastChannel',undefined);
 const rpc=vi.fn();const cloud=createSupabasePollStore({rpc} as unknown as SupabaseClient,false);
 for(const id of blocked){const input={name:'Test',note:'',titleIds:[id,'panchayat'],creator:{id:'this-device',name:'Amit'},deadline:new Date(Date.now()+3600000).toISOString(),expectedVoters:0};
 await expect(localPollStore.createPoll(input)).rejects.toThrow();await expect(cloud.createPoll(input)).rejects.toThrow();}
 expect(rpc).not.toHaveBeenCalled();expect(values.get('dekho-polls-v0')).toBeUndefined();
});
it('registers Hoichoi with Bengali affinity and keeps unsupported sources non-rendered',async()=>{
 const providers=await dataSource.listProviders();expect(providers.find(p=>p.id==='hoichoi')).toMatchObject({color:'#EF4136',homepageUrl:'https://www.hoichoi.tv',languageAffinity:['Bengali']});
 expect((await dataSource.getProviders('vinci-da')).map(o=>o.provider.name)).toEqual(['Hoichoi']);
 const t=(await dataSource.getTitle('drishyam-2'))!;expect(t.otherSources?.some(s=>s.name==='Amazon MX Player')).toBe(true);expect(t.providers.some(o=>o.providerId==='mx-player')).toBe(false);
});
it('validates ads and audio metadata without inventing required rental prices',async()=>{
 const info=await dataSource.getCatalogInfo(),titles=await dataSource.listTitles(),providers=await dataSource.listProviders();
 titles[0].providers[0].ads=true;expect(()=>new JsonDataSource({...info,titles},providers)).toThrow('ads');delete titles[0].providers[0].ads;
 titles[0].providers[0].languages=[];expect(()=>new JsonDataSource({...info,titles},providers)).toThrow('offer languages');delete titles[0].providers[0].languages;
 titles[0].providers[0].type='rent';delete titles[0].providers[0].priceInr;expect(()=>new JsonDataSource({...info,titles},providers)).not.toThrow();
});
