import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { localPollStore as store } from '../lib/polls/local';
import { voterIdentity } from '../lib/polls/identity';
import { scorePoll, tiedWinnerIds } from '../lib/polls/results';
import { winnerId } from '../lib/polls/checkins';
import { resultCard, encodeResult, decodeResult } from '../lib/polls/result-card';
import { parseSnapshot } from '../lib/polls/share';
import { readFileSync } from 'node:fs';
beforeEach(() => { const values = new Map<string,string>(); vi.stubGlobal('localStorage', {getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>values.set(k,v)});vi.stubGlobal('window',new EventTarget());vi.stubGlobal('BroadcastChannel',undefined); });
afterEach(()=>{vi.restoreAllMocks();vi.unstubAllGlobals();});
async function fixture() { const creator=voterIdentity(); const p=await store.createPoll({name:'Test night',note:'',titleIds:['vikram','kaithi','jailer'],deadline:new Date(Date.now()+3600000).toISOString(),creator:{id:creator.id,name:'Amit'},expectedVoters:0});return p; }
it('tosses only tied leaders, closes voting and persists the same winner across result sharing and check-ins',async()=>{
 const p=await fixture();for(const title of p.titleIds)await store.rateTitle(p.id,'riya','Riya',title,{score:title==='jailer'?-1:1});
 vi.spyOn(Math,'random').mockReturnValue(.99);
 const saved=await store.tossPoll(p.id,p.creator!.id);expect(saved).toMatchObject({toss:true,winnerId:'kaithi'});expect(saved.closedAt).toBeTruthy();
 expect(scorePoll(saved,{vikram:10,kaithi:1})[0].id).toBe('kaithi');expect(winnerId(saved,{vikram:10,kaithi:1})).toBe('kaithi');
 vi.mocked(Math.random).mockReturnValue(0);expect(await store.tossPoll(p.id,p.creator!.id)).toEqual(saved);
 expect((await store.getPoll(p.id))?.winnerId).toBe('kaithi');expect(decodeResult(encodeResult(resultCard(saved)))?.poll).toMatchObject({toss:true,winnerId:'kaithi'});
 await expect(store.rateTitle(p.id,'riya','Riya','kaithi',{score:-1})).rejects.toThrow();
});
it('rejects empty polls, non-ties, non-creators and already checked-in nights',async()=>{
 const p=await fixture();expect(tiedWinnerIds(p)).toEqual([]);await expect(store.tossPoll(p.id,p.creator!.id)).rejects.toThrow();
 await store.rateTitle(p.id,'riya','Riya','vikram',{score:1});await expect(store.tossPoll(p.id,p.creator!.id)).rejects.toThrow();
 await store.rateTitle(p.id,'riya','Riya','kaithi',{score:1});await expect(store.tossPoll(p.id,'another-device')).rejects.toThrow();
 localStorage.setItem('dekho-checkins-v1',JSON.stringify({[p.id]:[{watched:true}]}));await expect(store.tossPoll(p.id,p.creator!.id)).rejects.toThrow();
 expect((await store.getPoll(p.id))?.toss).toBeUndefined();
});
it('rejects invalid saved winners and never promotes a lower-scoring forged winner',async()=>{
 const p=await fixture();expect(parseSnapshot({...p,toss:true,winnerId:'unknown'})).toBeNull();expect(parseSnapshot({...p,toss:'yes'})).toBeNull();
 expect(scorePoll({...p,toss:true,winnerId:'jailer',votes:{one:'vikram'}})[0].id).toBe('vikram');
});
it('provides exactly 40 review rows and British spelling in both voices',()=>{
 const rows=readFileSync('docs/copy-review-top40.md','utf8').split('\n').filter(l=>l.startsWith('| '));expect(rows).toHaveLength(42);expect(rows[0]).toContain('Cringe? (Y/N)');
 expect(readFileSync('lib/copy.ts','utf8')).not.toMatch(/\b(favorites?|colors?|canceled|canceling|centered)\b/i);
});
