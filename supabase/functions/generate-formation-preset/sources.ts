import sanitizeHtml from 'npm:sanitize-html@2';
import { resolve } from 'node:dns/promises';
import { isIP } from 'node:net';
export const cleanHtml=(html:string)=>sanitizeHtml(html,{allowedTags:['p','br','strong','em','ul','ol','li','h2','h3','h4','table','thead','tbody','tr','th','td','blockquote','pre','code','a'],allowedAttributes:{a:['href','title'],td:['colspan','rowspan'],th:['colspan','rowspan']},allowedSchemes:['https'],disallowedTagsMode:'discard'});
const privateIP=(ip:string)=>ip.includes(':') || /^(0\.|10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.|192\.0\.|198\.(18|19)\.|2[2-5]\d\.)/.test(ip);
// Limit egress to established public reference providers, never model-supplied arbitrary hosts.
const trustedHosts = new Set(['www.legifrance.gouv.fr','legifrance.gouv.fr','www.service-public.fr','service-public.fr','travail-emploi.gouv.fr','www.francecompetences.fr','francecompetences.fr','www.cnil.fr','cnil.fr','www.inrs.fr','inrs.fr','www.urssaf.fr','urssaf.fr','www.francetravail.fr','francetravail.fr','www.onisep.fr','onisep.fr','support.microsoft.com','learn.microsoft.com','support.google.com','developers.google.com','www.youtube.com','youtube.com','youtu.be']);
export async function verifySource(url:string,title:string,video=false):Promise<boolean>{
 try{
  const u=new URL(url);if(u.protocol!=='https:'||u.username||u.password||u.port||isIP(u.hostname)||u.hostname==='localhost')return false;
  if(!trustedHosts.has(u.hostname))return false;
  if(video && !['www.youtube.com','youtube.com','youtu.be'].includes(u.hostname))return false;
  const ips=await resolve(u.hostname,'A');if(!ips.length||ips.some(privateIP))return false;
  const r=await fetch(u.href,{redirect:'manual',headers:{'User-Agent':'FormationSourceVerifier/1.0'}});
  if(!r.ok||r.status>=300||!r.headers.get('content-type')?.includes('text/html')){await r.body?.cancel();return false;}
  const reader=r.body?.getReader();if(!reader)return false;let text='',bytes=0;const decoder=new TextDecoder();
  while(bytes<350000){const x=await reader.read();if(x.done)break;bytes+=x.value.length;text+=decoder.decode(x.value,{stream:true});}await reader.cancel();
  const words=title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().match(/[a-z]{5,}/g)??[];
  const pageTitle=text.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]??'';
  const normalized=pageTitle.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  return words.length>0&&words.filter(w=>normalized.includes(w)).length>=Math.ceil(words.length/2);
 }catch{return false;}
}
export async function loadOfficialReference(code:string){
 if(!code)return null;const match=code.match(/^(RNCP|RS)(\d+)$/);if(!match)throw new Error('Code RNCP/RS invalide');
 const shard=match[1]+match[2].slice(0,match[1]==='RNCP'?3:2);
 const r=await fetch(`https://geniequaliopi.lovable.app/france-competences/fiches/${shard}.fcz`);
 if(!r.ok)throw new Error('Fiche France Compétences synchronisée indisponible');
 const bytes=new Uint8Array(await r.arrayBuffer());
 const body=new Response(bytes).body;if(!body)throw new Error('Fiche absente');
 const content=bytes[0]===31&&bytes[1]===139?await new Response(body.pipeThrough(new DecompressionStream('gzip'))).text():new TextDecoder().decode(bytes);
 const fiche=JSON.parse(content)[code];if(!fiche||fiche.c!==code)throw new Error('Code absent des fiches France Compétences synchronisées');
 return {code:fiche.c,intitule:fiche.i,blocs:fiche.blocs,capacites:fiche.capacites,certificateurs:fiche.cert,dateDecision:fiche.dateDecision,dateFin:fiche.fin,url:fiche.url};
}
