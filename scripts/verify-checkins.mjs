import env from '@next/env';
import {createClient} from '@supabase/supabase-js';
import {randomUUID,randomBytes} from 'node:crypto';
env.loadEnvConfig(process.cwd(),false,{info(){},error(){}});
const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if(!url||!key)throw Error('Configure the public Supabase URL and key first.');
let role='';try{role=JSON.parse(Buffer.from(key.split('.')[1],'base64url').toString()).role??'';}catch{}
if(key.startsWith('sb_secret_')||role==='service_role')throw Error('Use a public key, not a service key.');
const make=()=>createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{'x-dekho-device':randomUUID()}}});
const a=make(),b=make(),guest=make();let id;
const assert=(ok,msg)=>{if(!ok)throw Error(msg);};
const rpc=async(c,name,args={})=>{const {data,error}=await c.rpc(name,args);if(error)throw Error(`${name} failed (${error.code}); check the pending migrations.`);return data;};
try{
 // Read-only setup probe before creating any labelled test data.
 await rpc(a,'read_checkins',{p_id:'missing0'});
 id=randomBytes(6).toString('base64url');
 await rpc(a,'create_poll',{p_id:id,p_name:'P10 check-in verification — safe to delete',p_note:'Automated post-watch check.',p_creator_name:'Verification host',p_title_ids:['vikram','kaithi'],p_deadline:new Date(Date.now()+600000).toISOString()});
 const input={p_id:id,p_watched:true,p_rating:2,p_take:'An excellent film'};
 assert(Boolean((await a.rpc('checkin_on_poll',input)).error),'Open poll accepted a check-in.');
 for(const c of [a,b])for(const title of ['vikram','kaithi'])await rpc(c,'vote_on_poll',{p_id:id,p_title_id:title,p_voter_name:c===a?'Verification host':'Verification friend',p_value:title==='vikram'?1:-1});
 await rpc(a,'close_poll',{p_id:id});
 assert(Boolean((await guest.rpc('checkin_on_poll',input)).error),'A nonvoter checked in.');
 await rpc(a,'checkin_on_poll',input);await rpc(b,'checkin_on_poll',{...input,p_watched:null,p_rating:null,p_take:''});
 let rows=await rpc(a,'read_checkins',{p_id:id});assert(rows.length===2&&rows.find(r=>r.device==='this-device')?.rating===2,'Device-scoped check-in was not saved.');
 await rpc(b,'checkin_on_poll',{...input,p_rating:1,p_take:'Good film'});
 rows=await rpc(guest,'read_checkins',{p_id:id});assert(rows.length===2&&rows.every(r=>r.titleId==='vikram')&&rows.every(r=>!/^[0-9a-f-]{36}$/i.test(r.device)),'Public verdict leaked device IDs or winner/upsert mismatch.');
 const rating=await rpc(a,'poll_group_rating',{p_title_id:'vikram'});assert(rating?.votes===2&&rating.percent===100,'Post-watch title score incorrect.');
 assert(await rpc(guest,'poll_group_rating',{p_title_id:'vikram'})===null,'Nonparticipant saw private group score.');
 const mine=await rpc(a,'my_checkin_polls');assert(mine.some(p=>p.id===id),'Voted device cannot discover its finished poll.');
 assert((await rpc(guest,'my_checkin_polls')).length===0,'Nonparticipant saw check-in history.');
 assert(Boolean((await a.rpc('checkin_on_poll',{...input,p_take:'x'.repeat(81)})).error),'Overlong take accepted.');
 assert(Boolean((await a.from('checkins').select('voter_device_id').limit(1)).error),'Raw check-in device IDs are public.');
 console.log('PASS: finished-only, voter-only, isolated upserts, public safe aliases, winner, group score, device discovery and take length.');
 console.log('One labelled closed verification poll remains for optional deletion.');
}catch(e){console.error(e instanceof Error?e.message:'Verification failed.');process.exitCode=1;}
finally{if(id)await a.rpc('close_poll',{p_id:id});await Promise.all([a.removeAllChannels(),b.removeAllChannels(),guest.removeAllChannels()]);}
