import env from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { randomUUID, randomBytes } from 'node:crypto';
env.loadEnvConfig(process.cwd(), false, { info() {}, error() {} });
const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if(!url||!key)throw new Error('Set the Supabase project URL and public key first.');
let role='';try{role=JSON.parse(Buffer.from(key.split('.')[1],'base64url').toString()).role??'';}catch{}
if(key.startsWith('sb_secret_')||role==='service_role')throw new Error('Use an anon/publishable key, never a secret key.');
const client=()=>createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{'x-dekho-device':randomUUID()}}});
const a=client(),b=client(),created=[];
const assert=(ok,message)=>{if(!ok)throw new Error(message);};
const rpc=async(c,name,args)=>{const r=await c.rpc(name,args);if(r.error)throw new Error(`${name} failed (${r.error.code}). Check 002_groups.sql in the SQL editor.`);return r.data;};
async function create(c,group){const id=randomBytes(6).toString('base64url');const p=await rpc(c,'create_poll',{p_id:id,p_name:'P7b groups verification — safe to delete',p_note:'Automated group isolation check.',p_creator_name:'Verification host',p_title_ids:['aavesham','drishyam-2'],p_deadline:new Date(Date.now()+600000).toISOString(),p_group_name:group});created.push([c,id]);return p;}
async function finish(c,p,voted=true){if(voted)await rpc(c,'vote_on_poll',{p_id:p.id,p_title_id:'aavesham',p_voter_name:'Verification voter',p_value:1});await rpc(c,'close_poll',{p_id:p.id});}
try{
 const first=await create(a,'College gang');assert(first.groupName==='College gang'&&first.createdAt,'Creation did not return group and timestamp.');await finish(a,first);
 const second=await create(a,' college   GANG ');assert(second.groupName==='college GANG','Group whitespace was not normalized.');await finish(a,second);
 const flat=await create(a,'Flatmates');await finish(a,flat);
 const empty=await create(a,'College gang');await finish(a,empty,false);
 const other=await create(b,'College gang');await finish(b,other);
 const open=await create(a,'College gang');
 assert(await rpc(a,'poll_streak',{p_id:second.id})===2,'Group streak included another group/creator, an empty night or an open poll.');
 assert(await rpc(a,'poll_streak',{p_id:flat.id})===1,'Flatmates streak was mixed with College gang.');
 const mine=await rpc(a,'my_polls',{});assert(mine.length===5&&mine.every(p=>p.groupName!==undefined)&&!mine.some(p=>p.id===other.id),'Creator history lost group names or included another creator.');
 const guest=client();assert((await rpc(guest,'read_poll',{p_id:first.id})).groupName==='College gang','Group name missing on another phone.');await guest.removeAllChannels();
 const invalid=await a.rpc('create_poll',{p_id:randomBytes(6).toString('base64url'),p_name:'Must not exist',p_note:'',p_creator_name:'Verification host',p_title_ids:['aavesham','drishyam-2'],p_deadline:new Date(Date.now()+600000).toISOString(),p_group_name:'x'.repeat(61)});assert(Boolean(invalid.error),'Oversized group name was accepted.');
 await finish(a,open,false);
 console.log('PASS: group creation/readback, case/space matching, group/creator isolation, empty/open exclusion, My polls and length validation.');
 console.log('Six labelled, closed verification polls may be removed in Table Editor.');
}catch(error){console.error(error instanceof Error?error.message:'Group verification failed.');process.exitCode=1;}
finally{for(const[c,id]of created)await c.rpc('close_poll',{p_id:id});await Promise.all([a.removeAllChannels(),b.removeAllChannels()]);}
