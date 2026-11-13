import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { brand } from '@/lib/brand';
import { dataSource, type Title } from '@/lib/data';
import { GeneratedPosterSvg } from '@/components/poster/PosterArtwork';
import { fitTitle, posterDesign } from '@/lib/poster-art';
import { ogMotifs, type OgMotif } from '@/lib/polls/og';
import { parseVerdict, verdictMood, verdictPreview, type VerdictCard } from '@/lib/polls/verdict-card';
import { formatCopy } from '@/lib/copy';
import { checkinCopy as c } from '@/.generated/copy/checkin';
export const runtime='nodejs';
const fonts=Promise.all([['Bricolage Grotesque','BricolageGrotesque-800.ttf',800],['Inter','Inter-400.ttf',400],['Inter','Inter-600.ttf',600]].map(async([name,file,weight])=>({name:String(name),data:await readFile(path.join(process.cwd(),'public/fonts',String(file))),weight:weight as 400|600|800,style:'normal' as const})));
/** Rotate the default motif: the poll card's first poster uses that default. */
function verdictMotif(title: Title): OgMotif { return ogMotifs[(ogMotifs.findIndex(m=>m===posterDesign(title).motif)+1)%ogMotifs.length]; }
function Poster({title,width,id,alternate=false}: {title:Title;width:number;id:string;alternate?:boolean}) {
 const fit=fitTitle(title.title,252,18,45);
 return <div style={{display:'flex',width,height:width*1.5,overflow:'hidden',borderRadius:width<100?10:20,position:'relative',boxShadow:'0 12px 30px #0006',flexShrink:0}}><div style={{display:'flex',width:300,height:450,flexShrink:0,transform:`scale(${width/300})`,transformOrigin:'top left'}}><GeneratedPosterSvg title={title} definitionId={id} showTypography={false} motifOverride={alternate?verdictMotif(title):undefined}/><div style={{display:'flex',flexDirection:'column',position:'absolute',left:24,right:24,bottom:50,fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:fit.fontSize,lineHeight:1}}>{fit.lines.map((line,i)=><div key={i} style={{display:'flex'}}>{line}</div>)}</div></div></div>;
}
export async function GET(request:Request,context:{params:Promise<{id:string}>}) {
 const mood=new URL(request.url).searchParams.get('preview');
 if(!['loved','liked','split'].includes(mood??'')||(await context.params).id!=='verdict1')return new Response(formatCopy(c.invalid),{status:400});
 return render(request,verdictPreview(mood as 'loved'|'liked'|'split'));
}
export async function POST(request:Request,context:{params:Promise<{id:string}>}) {
 const body=await request.text();if(body.length>4096)return new Response(formatCopy(c.invalid),{status:413});
 let card;try{card=parseVerdict(JSON.parse(body));}catch{return new Response(formatCopy(c.invalid),{status:400});}
 if(!card||card.pollId!==(await context.params).id)return new Response(formatCopy(c.invalid),{status:400});
 return render(request,card);
}
async function render(request:Request,card:VerdictCard) {
 const title=await dataSource.getTitle(card.titleId);if(!title)return new Response(formatCopy(c.invalid),{status:404});
 const picks=(await dataSource.getSimilar(title.id,3)).map(p=>p.title);
 const story=new URL(request.url).searchParams.get('format')==='story',width=story?1080:1200,height=story?1920:630;
 const mood=verdictMood(card),count=mood==='loved'?card.loved:card.loved+card.liked;
 const headline=formatCopy(c[`${mood}Headline`],{group:card.group});
 const titleFit=fitTitle(title.title,330,22,story?48:42), groupFit=fitTitle(headline,330,18,story?32:28);
 // The core is exactly the center 630×630 of either format: x=285/y=0 or x=225/y=645.
 const coreX=(width-630)/2,coreY=(height-630)/2;
 return new ImageResponse(<div style={{display:'flex',width,height,background:'radial-gradient(circle at 45% 40%, #24473E, #0B0A10 85%)',color:'#F5F3FA',fontFamily:'Inter',position:'relative'}}>
  <div style={{display:'flex',position:'absolute',left:coreX,top:coreY,width:630,height:630,background:'linear-gradient(135deg,#FFFFFF08,#FFFFFF00)',...(story?{borderLeft:'1px solid #FFFFFF18',borderRight:'1px solid #FFFFFF18'}:{})}}>
   <div style={{display:'flex',position:'absolute',left:26,top:34,fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:40}}>{brand.name}<span style={{color:brand.colors.marigold}}>{'.'}</span></div>
   <div style={{display:'flex',position:'absolute',left:26,top:100,color:brand.colors.teal,fontSize:17}}>{formatCopy(c.verdict)}</div>
   <div style={{display:'flex',position:'absolute',left:24,top:165}}><Poster title={title} width={210} id="verdict-winner" alternate/></div>
   <div style={{display:'flex',flexDirection:'column',position:'absolute',left:260,top:story?150:130,width:344}}>
    <div style={{display:'flex',flexDirection:'column',fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:groupFit.fontSize,lineHeight:1.12}}>{groupFit.lines.map((line,i)=><div key={i} style={{display:'flex'}}>{line}</div>)}</div>
    <div style={{display:'flex',flexDirection:'column',fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:titleFit.fontSize,lineHeight:1.04,color:brand.colors.marigold,marginTop:15}}>{titleFit.lines.map((line,i)=><div key={i} style={{display:'flex'}}>{line}</div>)}</div>
    <div style={{display:'flex',marginTop:30,fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:38,lineHeight:1.1,color:brand.colors.teal}}>{formatCopy(c[`${mood}Stat`],{count,total:card.total})}</div>
    {!story&&card.takes[0]&&<div style={{display:'flex',marginTop:22,fontSize:19,lineHeight:1.35,color:'#D2CCDF'}}>{formatCopy(c.attributedTake,card.takes[0])}</div>}
   </div>
   {story&&<div style={{display:'flex',position:'absolute',left:26,top:548,width:578,borderTop:'1px solid #FFFFFF30',paddingTop:18,fontSize:20,color:'#D2CCDF'}}>{formatCopy(c.summary,{watched:card.watched,total:card.total,loved:card.loved})}</div>}
  </div>
  {story&&<div style={{display:'flex',position:'absolute',left:80,top:80,fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:54}}>{brand.name}<span style={{color:brand.colors.marigold}}>{'.'}</span></div>}
  {story&&<div style={{display:'flex',flexDirection:'column',position:'absolute',left:story?150:24,top:story?180:195,width:story?780:230,...(story?{height:420,justifyContent:'center' as const}:{}),gap:story?44:20}}>{card.takes.slice(0,story?2:1).map((take,i)=><div key={i} style={{display:'flex',fontSize:story?42:24,lineHeight:1.4,borderLeft:'3px solid #21D4C4',paddingLeft:story?24:14}}>{formatCopy(c.attributedTake,take)}</div>)}</div>}
  <div style={{display:'flex',flexDirection:'column',position:'absolute',left:story?225:944,top:story?1360:154,width:story?630:232}}>
   <div style={{display:'flex',fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:story?40:28,marginBottom:story?28:24}}>{formatCopy(c.whatNext)}</div>
   <div style={{display:'flex',gap:story?30:8}}>{picks.map((pick,i)=><Poster key={pick.id} title={pick} width={story?190:72} id={`next-${i}`}/>)}</div>
   <div style={{display:'flex',fontSize:story?32:18,whiteSpace:story?'normal':'nowrap',color:brand.colors.marigold,marginTop:story?26:24,lineHeight:1.2}}>{formatCopy(c.voteNext)}</div>
  </div>
 </div>,{width,height,fonts:await fonts});
}
