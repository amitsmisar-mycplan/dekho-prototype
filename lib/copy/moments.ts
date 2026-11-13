import { formatCopy, type Tone } from '@/lib/copy';
import { momentsCopy } from '@/.generated/copy/moments';
export type Moment = 'weekday' | 'friday' | 'weekend' | 'late' | 'anytime';
export type MomentKind = 'greeting' | 'share';
export type RotationStorage = Pick<Storage,'getItem'|'setItem'>;
/** Browser-local time; late night wins before day-specific cases. Boundaries are explicit. */
export function momentAt(date: Date): Moment {
 const hour=date.getHours(),day=date.getDay();
 if(hour>=23||hour<5)return 'late';
 if(day===5&&hour>=17)return 'friday';
 if((day===0||day===6)&&hour>=12&&hour<17)return 'weekend';
 if(day>=1&&day<=4&&hour>=17)return 'weekday';
 return 'anytime';
}
const memory=new Map<string,string>();
const fallback:RotationStorage={getItem:key=>memory.get(key)??null,setItem:(key,value)=>{memory.set(key,value);}};
export function browserRotation():RotationStorage {
 return {getItem(key){try{return sessionStorage.getItem(key)??fallback.getItem(key);}catch{return fallback.getItem(key);}},setItem(key,value){fallback.setItem(key,value);try{sessionStorage.setItem(key,value);}catch{/* In-memory rotation still works when storage is unavailable. */}}};
}
/** One call per new greeting visit/context or explicit share action, never per render. */
export function momentLine(kind:MomentKind,date:Date,tone:Tone,params:Record<string,unknown>,storage?:RotationStorage) {
 const moment=momentAt(date),key=`dekho-copy:${kind}:${moment}`;
 let index=0;
 if(storage){
  const raw=storage.getItem(key),previous=raw===null?-1:Number(raw);
  index=Number.isInteger(previous)&&previous>=0?(previous+1)%3:0;
  const last=storage.getItem(`dekho-copy:${kind}:last`) as keyof typeof momentsCopy|null;
  const candidate=()=>`${kind}_${moment}_${index}` as keyof typeof momentsCopy;
  if(last&&momentsCopy[last]?.indianEnglish===momentsCopy[candidate()].indianEnglish)index=(index+1)%3;
  storage.setItem(key,String(index));storage.setItem(`dekho-copy:${kind}:last`,candidate());
 }
 const line=momentsCopy[`${kind}_${moment}_${index}` as keyof typeof momentsCopy];
 return formatCopy(line,params,tone);
}
