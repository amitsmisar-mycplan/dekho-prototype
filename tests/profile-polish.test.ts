import { afterEach, expect, it, vi } from 'vitest';
import { clearPrototypeData } from '../lib/prototype-reset';
import { localPollStore } from '../lib/polls/local';
import { voterIdentity } from '../lib/polls/identity';
import { normalizePreferences } from '../lib/preferences';
import manifest from '../app/manifest';
function storage() { const values = new Map<string,string>(); return { get length() { return values.size; }, key: (i:number) => [...values.keys()][i] ?? null, getItem: (k:string) => values.get(k) ?? null, setItem: (k:string,v:string) => {values.set(k,v);}, removeItem: (k:string) => {values.delete(k);}, clear: () => values.clear() }; }
afterEach(() => vi.unstubAllGlobals());
it('reset clears all prototype identity/data but keeps unrelated origin storage', () => {
 const local=storage(), session=storage();
 const keys=['dekho-prototype-v0','dekho-polls-v0','dekho-voter','dekho-private-device-v1','dekho-splash-seen'];
 keys.forEach(k=>local.setItem(k,'saved')); local.setItem('another-app','keep'); session.setItem('dekho-tester-brand','WatchAdda'); session.setItem('another-tab-tool','keep');
 clearPrototypeData(local,session); keys.forEach(k=>expect(local.getItem(k)).toBeNull()); expect(local.getItem('another-app')).toBe('keep'); expect(session.getItem('dekho-tester-brand')).toBeNull(); expect(session.getItem('another-tab-tool')).toBe('keep');
});
it('local poll history includes owned open and finished polls, never imported friends’ polls', async () => {
 const local=storage(); vi.stubGlobal('localStorage',local); vi.stubGlobal('window',new EventTarget()); vi.stubGlobal('BroadcastChannel',undefined);
 const me=voterIdentity(); const input={titleIds:['vikram','kaithi'],deadline:new Date(Date.now()+3600000).toISOString(),expectedVoters:0,name:'Movie night',note:'',creator:{id:me.id,name:'Amit'}};
 const open=await localPollStore.createPoll(input), finished=await localPollStore.createPoll(input); await localPollStore.closePoll(finished.id,me.id);
 await localPollStore.createPoll({...input,creator:{id:'other-device',name:'Riya'}});
 const mine=await localPollStore.getMyPolls(); expect(mine.map(p=>p.id)).toEqual([finished.id,open.id]); expect(mine[0].closedAt).toBeTruthy();
});
it('discards legacy placeholder names while preserving real names',()=>{ expect(normalizePreferences({name:'WatchTogether'}).name).toBe(''); expect(normalizePreferences({name:' Amit '}).name).toBe('Amit'); });
it('offers standalone install metadata and standard maskable/Apple-compatible icon sizes',()=>{const m=manifest();expect(m.display).toBe('standalone'); expect(m.start_url).toBe('/');expect(m.icons?.some(i=>i.sizes==='192x192')).toBe(true);expect(m.icons?.some(i=>i.sizes==='512x512'&&i.purpose==='maskable')).toBe(true);});
