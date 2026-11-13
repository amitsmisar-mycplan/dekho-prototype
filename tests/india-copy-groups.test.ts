import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { copy, text, toneForLanguages } from '../lib/copy';
import { groupPolls, recentGroups } from '../lib/polls/groups';
import { encodePoll, decodePoll, parseSnapshot } from '../lib/polls/share';
import { resultCard, encodeResult, decodeResult } from '../lib/polls/result-card';
import { createPrototypeStore } from '../lib/store';
import type { Poll } from '../lib/polls/types';
const hindi = /[\u0900-\u097f]|\b(kya|dekhein|yaar|paisa|vasool|chalo|bas|apna|timepass|adda|kuch|bhi|thoda|abhi|baaki|dil|khush)\b/i;
describe('India copy contract', () => {
 it('selects Hinglish only when Hindi is among viewing languages', () => { expect(toneForLanguages([])).toBe('indianEnglish'); expect(toneForLanguages(['Tamil','English'])).toBe('indianEnglish'); expect(toneForLanguages(['Malayalam','Hindi'])).toBe('hinglish'); });
 it('keeps Indian English Hindi-free with Roman Hinglish and context for every string', () => {
  for (const entries of Object.values(copy)) {
   for(const line of Object.values(entries)){expect(line.context?.length).toBeGreaterThan(5);expect(line.hinglish).not.toMatch(/[\u0900-\u097f]/);}
   for(const line of Object.values(entries)){expect(line.indianEnglish).not.toMatch(hindi);expect(line.indianEnglish).not.toMatch(/binge-worthy|date night|\bcouch\b|snacks are sorted|y'all|\bawesome\b|\bTV shows?\b/i);expect(line.hinglish.match(/\{\w+\}/g)??[]).toEqual(line.indianEnglish.match(/\{\w+\}/g)??[]);}
  }
 });
 it('formats group share text with at most one emoji and preserves supplied content as text', () => { const line=text('pollCreate','value_vote_for_tonight_s_picture_value',{p1:'College gang',p2:'https://example.test/p/abcd1234'}); expect(line).toContain('College gang, vote');expect(line.match(/\p{Extended_Pictographic}/gu)??[]).toHaveLength(0);expect(text('profile','group_summary',{group:'<Flatmates>',count:4,nights:'movie nights',winner:'Aavesham'})).toBe('<Flatmates> · 4 movie nights · last: Aavesham'); });
 it('has no literal JSX prose, labels, alt text or placeholders outside the copy catalogue', () => {
  const files:string[]=[];const walk=(dir:string)=>{for(const e of readdirSync(dir,{withFileTypes:true})){ if(e.isDirectory()) walk(path.join(dir,e.name)); else if(e.name.endsWith('.tsx')) files.push(path.join(dir,e.name)); }};walk('components');walk('app');
  const violations:string[]=[];for(const file of files){const sf=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);const visit=(node:ts.Node)=>{if(ts.isJsxText(node)&&node.text.trim())violations.push(file+': '+node.text.trim());if(ts.isJsxAttribute(node)&&['aria-label','alt','placeholder','title','eyebrow'].includes(node.name.getText(sf))&&node.initializer&&ts.isStringLiteral(node.initializer)&&node.initializer.text.trim())violations.push(file+': '+node.initializer.text);ts.forEachChild(node,visit);};visit(sf);}expect(violations).toEqual([]);
 });
});
const fixture=(id:string,groupName:string,createdAt:string,extra:Partial<Poll>={}):Poll=>({id,name:'Movie night',note:'',titleIds:['vikram','kaithi'],deadline:'2030-01-01T00:00:00.000Z',createdAt,groupName,votes:{},expectedVoters:0,creator:{id:'creator01',name:'Amit'},...extra});
describe('named groups',()=>{
 it('round-trips groups in local poll/result links and reads older unnamed snapshots',()=>{const p=fixture('abcd1234','College gang','2026-11-13T00:00:00Z',{ballots:{riya:{name:'Riya',ratings:{vikram:{score:1}}}}});expect(decodePoll(encodePoll(p),p.id)?.groupName).toBe('College gang');expect(decodeResult(encodeResult(resultCard(p)))?.poll.groupName).toBe('College gang');expect(parseSnapshot({...p,groupName:undefined})?.groupName).toBeUndefined();expect(parseSnapshot({...p,groupName:'x'.repeat(61)})).toBeNull();});
 it('groups case/whitespace variants, counts voted finished nights and uses TMDb to select the latest winner',()=>{const ballots={a:{name:'A',ratings:{vikram:{score:1 as const},kaithi:{score:1 as const}}}};const polls=[fixture('aaaa0001','College gang','2026-11-10T00:00:00Z',{closedAt:'2026-11-10T01:00:00Z',ballots}),fixture('aaaa0002',' college   GANG ','2026-11-12T00:00:00Z',{closedAt:'2026-11-12T01:00:00Z',ballots}),fixture('aaaa0003','Flatmates','2026-11-13T00:00:00Z'),fixture('aaaa0004','College gang','2026-11-13T00:00:01Z',{closedAt:'2026-11-13T01:00:00Z'})];const groups=groupPolls(polls,{vikram:8,kaithi:9},Date.parse('2026-11-14'));expect(groups).toHaveLength(2);expect(groups.find(g=>g.polls.length===3)).toMatchObject({nights:2,lastWinner:'kaithi'});expect(groups.find(g=>g.name==='Flatmates')?.nights).toBe(0);});
 it('uses completion time for the last winner, even when an older-created poll finishes later',()=>{ const polls=[fixture('aaaa1001','College gang','2026-11-10T00:00:00Z',{closedAt:'2026-11-14T00:00:00Z',votes:{one:'vikram'}}),fixture('aaaa1002','College gang','2026-11-12T00:00:00Z',{closedAt:'2026-11-13T00:00:00Z',votes:{one:'kaithi'}})];expect(groupPolls(polls,{},Date.parse('2026-11-15'))[0].lastWinner).toBe('vikram');});
 it('deduplicates recent names, persists them and keeps the latest eight',async()=>{const values=new Map<string,string>();const storage={getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>{values.set(k,v);},removeItem:(k:string)=>{values.delete(k);}};const store=createPrototypeStore(storage);store.getState().rememberGroup('College gang');store.getState().rememberGroup(' college   GANG ');store.getState().rememberGroup('Flatmates');const restored=createPrototypeStore(storage);await restored.persist.rehydrate();expect(restored.getState().groupNames).toEqual(['Flatmates','college GANG']);expect(recentGroups(Array.from({length:12},(_,i)=>'Group '+i))).toHaveLength(8);});
});
