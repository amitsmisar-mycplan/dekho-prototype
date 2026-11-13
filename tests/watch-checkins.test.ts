import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { checkinDue, closedTime, validCheckin, verdict, winnerId, type Checkin } from '../lib/polls/checkins';
import { pollStore, getCheckins, saveCheckin, getCheckinPolls, getGroupRating } from '../lib/polls';
import { voterIdentity } from '../lib/polls/identity';
import { parseVerdict, verdictMood, verdictPreview } from '../lib/polls/verdict-card';
import type { Poll } from '../lib/polls/types';
const now=Date.parse('2026-11-15T12:00:00Z'),hour=3600000;
const poll:Poll={id:'test1234',name:'Night',note:'',titleIds:['vikram','kaithi'],deadline:new Date(now+hour).toISOString(),closedAt:new Date(now-6*hour).toISOString(),votes:{},expectedVoters:0,ballots:{me:{name:'Amit',ratings:{vikram:{score:1},kaithi:{score:1}}},other:{name:'Riya',ratings:{vikram:{score:1},kaithi:{score:1}}}}};
const row:Checkin={device:'me',titleId:'kaithi',name:'Amit',watched:true,rating:2,take:'Worth it',createdAt:new Date(now).toISOString()};
beforeEach(()=>{const values=new Map<string,string>();vi.stubGlobal('localStorage',{getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>values.set(k,v),removeItem:(k:string)=>values.delete(k)});vi.stubGlobal('window',new EventTarget());vi.stubGlobal('BroadcastChannel',undefined);});
afterEach(()=>{vi.unstubAllGlobals();vi.useRealTimers();});
describe('post-watch timing and summaries',()=>{
 it('derives verdict headlines from watched ratings, validates counts and preserves attribution',()=>{
  for(const mood of ['loved','liked','split'] as const){const card=verdictPreview(mood);expect(verdictMood(card)).toBe(mood);expect(parseVerdict(card)?.takes[0]).toEqual({name:'Amit',take:'A brilliant film for our group.'});}
  expect(verdictMood({watched:4,loved:2,liked:1})).toBe('liked');
  expect(verdictMood({watched:4,loved:2,liked:0})).toBe('split');
  expect(parseVerdict({...verdictPreview('loved'),liked:1})).toBeNull();
  expect(parseVerdict({...verdictPreview('loved'),takes:[{name:'',take:'Good'}]})).toBeNull();
 });
 it('shows only participating devices, six hours after the effective finish',()=>{expect(checkinDue(poll,'me',[],now-1)).toBe(false);expect(checkinDue(poll,'me',[],now)).toBe(true);expect(checkinDue(poll,'stranger',[],now,true)).toBe(false);expect(checkinDue({...poll,closedAt:undefined},'me',[],now,true)).toBe(false);expect(checkinDue(poll,'me',[],now-5*hour,true)).toBe(true);expect(closedTime({...poll,deadline:new Date(now-8*hour).toISOString()})).toBe(now-8*hour);});
 it('dismisses skips and completed reviews, snoozes Not yet even in demo',()=>{expect(checkinDue(poll,'me',[row],now,true)).toBe(false);expect(checkinDue(poll,'me',[{...row,watched:false,rating:null}],now,true)).toBe(false);const later={...row,watched:null,rating:null,take:''};expect(checkinDue(poll,'me',[later],now,true)).toBe(false);expect(checkinDue(poll,'me',[later],now+24*hour)).toBe(true);});
 it('counts loved only among watched, uses all voters as denominator and ranks top take',()=>{const rows=[row,{...row,device:'other',name:'Riya',watched:false,rating:null,take:''}];expect(verdict(poll,rows)).toMatchObject({total:2,watched:1,loved:1});expect(verdict(poll,rows).takes).toEqual([row]);expect(winnerId(poll,{vikram:8,kaithi:9})).toBe('kaithi');expect(winnerId({...poll,ballots:{}},{})).toBeUndefined();});
 it('rejects invalid rating/take combinations and forged card totals',()=>{expect(validCheckin({watched:true,rating:null,take:''})).toBe(false);expect(validCheckin({watched:false,rating:2,take:''})).toBe(false);expect(validCheckin({watched:null,rating:null,take:'No'})).toBe(false);expect(validCheckin({watched:true,rating:1,take:'x'.repeat(81)})).toBe(false);const card={pollId:'test1234',titleId:'kaithi',group:'College gang',total:2,watched:1,loved:1,liked:0,takes:[{name:'Amit',take:'Excellent'}]};expect(parseVerdict(card)).toEqual(card);expect(parseVerdict({...card,loved:2})).toBeNull();expect(parseVerdict({...card,takes:[{name:'Amit',take:'x'.repeat(81)}]})).toBeNull();});
 it('saves one check-in per device/poll, excludes open polls/nonvoters and feeds title satisfaction',async()=>{
  const me=voterIdentity().id;const p=await pollStore.createPoll({name:'Movie night',note:'',groupName:'College gang',titleIds:['vikram','kaithi'],deadline:new Date(Date.now()+hour).toISOString(),expectedVoters:0,creator:{id:me,name:'Amit'}});
  await expect(saveCheckin(p.id,{watched:true,rating:2,take:''})).rejects.toThrow();
  await pollStore.rateTitle(p.id,me,'Amit','vikram',{score:1});await pollStore.rateTitle(p.id,me,'Amit','kaithi',{score:-1});
  await expect(saveCheckin(p.id,{watched:true,rating:2,take:''})).rejects.toThrow();await pollStore.closePoll(p.id,me);
  await saveCheckin(p.id,{watched:null,rating:null,take:''});expect(await getGroupRating('vikram')).toBeNull();
  await saveCheckin(p.id,{watched:true,rating:2,take:'Excellent'});expect(await getCheckins(p.id)).toHaveLength(1);expect(await getGroupRating('vikram')).toEqual({votes:1,percent:100});
  await saveCheckin(p.id,{watched:true,rating:-1,take:'Changed my mind'});expect(await getCheckins(p.id)).toHaveLength(1);expect(await getGroupRating('vikram')).toEqual({votes:1,percent:0});expect((await getCheckinPolls()).map(p=>p.id)).toContain(p.id);
  localStorage.removeItem('dekho-voter');await expect(saveCheckin(p.id,{watched:true,rating:1,take:''})).rejects.toThrow();
 });
});
