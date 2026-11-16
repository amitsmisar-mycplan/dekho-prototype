import { afterEach, expect, it, vi } from 'vitest';
import { dataSource, selectableLanguages, languages, JsonDataSource } from '../lib/data';
import { homeSelections } from '../lib/discovery';
import { defaultPreferences } from '../lib/preferences';
import { validAvailabilityReport } from '../lib/availability-reports';
import { readFileSync } from 'node:fs';
afterEach(()=>{vi.unstubAllEnvs();vi.resetModules();});
it('hides sparse languages at four and exposes them when the flag is disabled',async()=>{
 const titles=await dataSource.listTitles();expect(selectableLanguages(titles)).toEqual(['Hindi','English','Tamil','Telugu','Malayalam','Kannada']);expect(selectableLanguages(titles,0)).toEqual([...languages]);
 const kannada=titles.filter(t=>t.originalLanguage==='Kannada');expect(kannada).toHaveLength(8);
 expect(selectableLanguages(kannada.slice(0,3))).not.toContain('Kannada');expect(selectableLanguages(kannada.slice(0,4))).toContain('Kannada');
});
it('restores verified titles to hero eligibility, uses Netflix for Glass Onion, and marks Piku for confirmation',async()=>{
 const titles=await dataSource.listTitles();expect((await dataSource.getProviders('glass-onion')).map(o=>o.provider.name)).toEqual(['Netflix']);
 const piku=(await dataSource.getTitle('piku'))!;expect(piku.availabilityNote).toBe('check');expect(piku.providers[0].providerId).toBe('sonyliv');
 const hero=homeSelections(titles,{...defaultPreferences(),languages:['Malayalam'],services:['prime-video']}).hero;
 expect(hero.some(t=>t.id==='drishyam-2-malayalam'||t.id==='joji')).toBe(true);
});
it('stores HTTPS evidence for all 73 titles and rejects unsafe evidence URLs',async()=>{
 const titles=await dataSource.listTitles();expect(titles.every(t=>t.sourceUrl?.startsWith('https://'))).toBe(true);
 // Every source URL was copied directly, without replacing evidence by inferred provider URLs.
 const csv=readFileSync('scripts/india-streaming-68-2026-11-14.csv','utf8');for(const t of titles.filter(t=>t.verifiedAt==='2026-11-14'))expect(csv).toContain(t.sourceUrl!);
 titles[0].sourceUrl='javascript:alert(1)';const providers=await dataSource.listProviders();expect(()=>new JsonDataSource({version:1,region:'IN',illustrative:true,disclaimer:'Test',titles},providers)).toThrow('sourceUrl');
});
const input={titleId:'piku',providerId:'sonyliv',reason:'wrong_app' as const,note:'Could not find it',testerTag:'round-2'};
it('validates reporting limits and reason codes',()=>{
 expect(validAvailabilityReport(input)).toBe(true);expect(validAvailabilityReport({...input,providerId:null})).toBe(true);
 expect(validAvailabilityReport({...input,note:'a'.repeat(501)})).toBe(false);expect(validAvailabilityReport({...input,testerTag:'a'.repeat(41)})).toBe(false);
 expect(validAvailabilityReport({...input,reason:'bad' as never})).toBe(false);
});
it('submits only allowed report fields via RPC and surfaces failed writes',async()=>{
 vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL','https://example.supabase.co');vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY','test');
 const rpc=vi.fn().mockResolvedValue({error:null});vi.doMock('../lib/polls/supabase',()=>({getSupabaseClient:()=>({rpc})}));
 const {submitAvailabilityReport}=await import('../lib/availability-reports');await submitAvailabilityReport(input);
 expect(rpc).toHaveBeenCalledWith('report_availability',{p_title_id:'piku',p_provider_id:'sonyliv',p_reason:'wrong_app',p_note:'Could not find it',p_tester_tag:'round-2'});
 rpc.mockResolvedValue({error:{code:'NETWORK'}});await expect(submitAvailabilityReport(input)).rejects.toThrow();
 rpc.mockClear();await expect(submitAvailabilityReport({...input,providerId:'unknown'})).rejects.toThrow();expect(rpc).not.toHaveBeenCalled();vi.doUnmock('../lib/polls/supabase');
});
