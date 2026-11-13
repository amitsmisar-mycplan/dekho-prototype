import { describe, expect, it } from 'vitest';
import { momentAt, momentLine } from '../lib/copy/moments';
import { copy } from '../lib/copy';
const storage=()=>{const m=new Map<string,string>();return{getItem:(k:string)=>m.get(k)??null,setItem:(k:string,v:string)=>{m.set(k,v);}};};
describe('contextual voice',()=>{
 it('uses explicit local-time boundaries with late-night precedence',()=>{
  expect(momentAt(new Date(2026,10,13,16,59))).toBe('anytime');expect(momentAt(new Date(2026,10,13,17))).toBe('friday');expect(momentAt(new Date(2026,10,13,23))).toBe('late');
  expect(momentAt(new Date(2026,10,14,4,59))).toBe('late');expect(momentAt(new Date(2026,10,14,5))).toBe('anytime');expect(momentAt(new Date(2026,10,14,12))).toBe('weekend');expect(momentAt(new Date(2026,10,15,16,59))).toBe('weekend');expect(momentAt(new Date(2026,10,15,17))).toBe('anytime');expect(momentAt(new Date(2026,10,16,20))).toBe('weekday');
 });
 it('rotates three variants per moment/channel without consecutive repeats',()=>{
  for(const date of [new Date(2026,10,13,18),new Date(2026,10,14,14),new Date(2026,10,16,20),new Date(2026,10,16,23),new Date(2026,10,16,9)])for(const kind of ['greeting','share'] as const){const saved=storage();const lines=Array.from({length:7},()=>momentLine(kind,date,'indianEnglish',{name:'Amit, ',group:'College gang',link:'https://example.test/p/12345678'},saved));expect(new Set(lines).size).toBe(3);lines.slice(1).forEach((line,i)=>expect(line).not.toBe(lines[i]));}
 });
 it('avoids identical share wording across context boundaries and keeps rendering pure without storage',()=>{
  const saved=storage(),args={group:'College gang',link:'https://example.test/p/12345678'};
  momentLine('share',new Date(2026,10,16,20),'indianEnglish',args,saved);
  const previous=momentLine('share',new Date(2026,10,16,20),'indianEnglish',args,saved);
  expect(momentLine('share',new Date(2026,10,17,9),'indianEnglish',args,saved)).not.toBe(previous);
  const date=new Date(2026,10,13,18);expect(momentLine('greeting',date,'hinglish',{name:''})).toBe(momentLine('greeting',date,'hinglish',{name:''}));
 });
 it('keeps buttons, money, privacy and deletion clear, with plain translated vote errors',()=>{
  expect(copy.shortlist.add_to_shortlist.indianEnglish).toBe('Add to shortlist');expect(copy.title.watch_on.indianEnglish).toBe('Watch on ');expect(copy.pollCreate.copy_link.hinglish).toBe('Copy link');expect(copy.common.price.hinglish).toBe('₹{amount}{suffix}');
  expect(copy.voter.could_not_save_try_again.hinglish).toBe('Vote save nahi hua. Ek baar phir try karein.');
  for(const [screen,entries]of Object.entries(copy)){if(screen==='kit')continue;for(const line of Object.values(entries)){expect(line.indianEnglish).not.toMatch(/\b(lit|vibe check|OG)\b/);expect(line.hinglish).not.toMatch(/\b(lit|vibe check|OG)\b/);}}
 });
});
