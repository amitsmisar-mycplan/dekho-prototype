import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { brand } from '@/lib/brand';
import { dataSource } from '@/lib/data';
import { GeneratedPosterSvg } from '@/components/poster/PosterArtwork';
import { fitTitle } from '@/lib/poster-art';
import { parseVerdict } from '@/lib/polls/verdict-card';
import { formatCopy } from '@/lib/copy';
import { checkinCopy as c } from '@/.generated/copy/checkin';
export const runtime='nodejs';
const fonts=Promise.all([['Bricolage Grotesque','BricolageGrotesque-800.ttf',800],['Inter','Inter-400.ttf',400],['Inter','Inter-600.ttf',600]].map(async([name,file,weight])=>({name:String(name),data:await readFile(path.join(process.cwd(),'public/fonts',String(file))),weight:weight as 400|600|800,style:'normal' as const})));
export async function POST(request:Request,context:{params:Promise<{id:string}>}) {
 const body=await request.text();if(body.length>4096)return new Response(formatCopy(c.invalid),{status:413});
 let card;try{card=parseVerdict(JSON.parse(body));}catch{return new Response(formatCopy(c.invalid),{status:400});}
 const {id}=await context.params;
 if(!card||card.pollId!==id)return new Response(formatCopy(c.invalid),{status:400});
 const title=await dataSource.getTitle(card.titleId);if(!title)return new Response(formatCopy(c.invalid),{status:404});
 const story=new URL(request.url).searchParams.get('format')==='story',width=story?1080:1200,height=story?1920:630,posterW=story?460:300;
 const fit=fitTitle(title.title,252,18,45);
 return new ImageResponse(<div style={{display:'flex',flexDirection:story?'column':'row',width,height,padding:story?'70px 80px':'40px 50px',background:'radial-gradient(circle at 20% 20%, #24524A, #0B0A10 70%)',color:'#F5F3FA',gap:story?40:50,fontFamily:'Inter'}}>
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0,width:story?'100%':320}}><div style={{display:'flex',fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:story?64:40,marginBottom:24}}>{brand.name}<span style={{color:brand.colors.marigold}}>{'.'}</span></div><div style={{display:'flex',width:posterW,height:posterW*1.5,overflow:'hidden',borderRadius:26,position:'relative',boxShadow:'0 20px 70px #0008'}}><div style={{display:'flex',width:300,height:450,flexShrink:0,transform:`scale(${posterW/300})`,transformOrigin:'top left'}}><GeneratedPosterSvg title={title} definitionId="verdict-poster" showTypography={false}/><div style={{display:'flex',flexDirection:'column',position:'absolute',left:24,right:24,bottom:65,fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:fit.fontSize,lineHeight:1}}>{fit.lines.map((line,i)=><div key={i} style={{display:'flex'}}>{line}</div>)}</div></div></div></div>
  <div style={{display:'flex',flex:1,flexDirection:'column',justifyContent:'center',gap:story?30:20}}><div style={{display:'flex',color:brand.colors.teal,fontSize:story?28:20}}>{formatCopy(c.verdict)}</div><div style={{display:'flex',fontFamily:'Bricolage Grotesque',fontWeight:800,fontSize:story?62:card.group.length>35?38:48,lineHeight:1.06}}>{formatCopy(c.shareSummary,{...card})}</div><div style={{display:'flex',fontSize:story?30:22,color:'#D2CCDF'}}>{title.title}</div>{card.take&&<div style={{display:'flex',fontSize:story?34:25,borderLeft:'4px solid #21D4C4',paddingLeft:22,lineHeight:1.3}}>{card.take}</div>}<div style={{display:'flex',marginTop:story?34:15,paddingTop:25,borderTop:'1px solid #FFFFFF40',fontSize:story?30:23,color:brand.colors.marigold}}>{formatCopy(c.nextTag)}</div></div>
 </div>,{width,height,fonts:await fonts});
}
