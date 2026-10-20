import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createOpenAI } from 'npm:@ai-sdk/openai@3';
import { streamText, Output, jsonSchema } from 'npm:ai@6';
import { zodToJsonSchema } from 'npm:zod-to-json-schema@3';
import { z } from 'npm:zod@3';
import { finalOnlyOutput } from './final-only-output.ts';
import { createLovableAiGatewayRunIdFetch } from './run-id.ts';
import { bodySchema,planSchema,evalSchema,chapterSchema,sourcesSchema } from './schema.ts';
import { cleanHtml,verifySource,loadOfficialReference } from './sources.ts';
const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const json=(v:unknown,status=200)=>new Response(JSON.stringify(v),{status,headers:{...corsHeaders,'Content-Type':'application/json'}});
const sleep=(n:number)=>new Promise(resolve=>setTimeout(resolve,n));
class PresetError extends Error {constructor(message:string,public status=400,public terminal=false){super(message);}}
function scrub(value:unknown):unknown {if(typeof value==='string')return /<\/?[a-z]/i.test(value)?cleanHtml(value):value;if(Array.isArray(value))return value.map(scrub);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,scrub(v)]));return value;}
Deno.serve(async req=>{
 if(req.method==='OPTIONS')return new Response('ok',{headers:corsHeaders});
 const url=Deno.env.get('SUPABASE_URL'),anon=Deno.env.get('SUPABASE_ANON_KEY'),service=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 if(!url||!anon||!service)return json({error:'Configuration de génération indisponible'},500);
 const token=req.headers.get('Authorization')?.replace(/^Bearer /i,'');if(!token)return json({error:'Connexion requise'},401);
 const auth=createClient(url,anon);const {data:{user},error:authError}=await auth.auth.getUser(token);if(authError||!user)return json({error:'Connexion requise'},401);
 const db=createClient(url,service);
 try{
 const input=bodySchema.parse(await req.json());
 if(input.action==='start'){
  const f=input.formation,code=(f.codeRNCP??'').toUpperCase().replace(/\s/g,'');
  if(code&&!/^(RNCP|RS)\d+$/.test(code))throw new PresetError('Code RNCP/RS invalide');
  const reference=await loadOfficialReference(code);
  const identity=normalize(f.intitule);const {data:existing}=await db.from('formation_presets').select('*').eq('intitule_normalise',identity).eq('code_rncp',code).maybeSingle();
  if(existing)return json({preset:existing});
  const hours=Number(f.duree.replace(',','.').match(/\d+(?:\.\d+)?/)?.[0]);if(!hours||hours<=0)throw new PresetError('Renseignez une durée en heures positive avant de créer la formation.');
  const {data,error}=await db.from('formation_presets').insert({intitule:f.intitule,intitule_normalise:identity,code_rncp:code,duree_heures:hours,type_action:f.typeAction,created_by:user.id,data:{input:f,reference},progression:{completed:[],leases:{},paused:false}}).select('*').single();
  if(error)throw error;return json({preset:data});
 }
 const {data:p,error}=await db.from('formation_presets').select('*').eq('id',input.id).single();if(error||!p)throw new PresetError('Formation introuvable',404);
 if(p.created_by!==user.id)throw new PresetError('Seul le créateur peut modifier ou valider cette formation.',403);
 if(input.action==='resume'){
  if(Object.values(p.progression.leases??{}).some((l:any)=>new Date(l.expires).getTime()>Date.now()))throw new PresetError('Une génération est encore réservée ; réessayez après la fin du traitement.',409);
  if(p.progression.error?.terminal)throw new PresetError(p.progression.error.message,p.progression.error.status,true);
  const {data,error}=await db.from('formation_presets').update({statut:'generation',progression:{...p.progression,paused:false,error:null}}).eq('id',p.id).select('*').single();if(error)throw error;return json({preset:data});
 }
 if(input.action==='regenerate'){
  if(p.progression.paused)throw new PresetError(p.progression.error?.message??'Génération suspendue');
  if(Object.values(p.progression.leases??{}).some((l:any)=>new Date(l.expires).getTime()>Date.now()))throw new PresetError('Un chapitre est déjà en cours.',409);
  if(!p.data.plan?.chapters[input.index])throw new PresetError('Chapitre introuvable');
  const key=`chapter_${input.index}`,data={...p.data};delete data[key];
  const {data:updated,error}=await db.from('formation_presets').update({data,statut:'generation',progression:{...p.progression,completed:p.progression.completed.filter((s:string)=>s!==key),leases:{},paused:false}}).eq('id',p.id).select('*').single();if(error)throw error;return json({preset:updated});
 }
 if(input.action==='validate'||input.action==='finalize'){
  if(p.progression.paused)throw new PresetError(p.progression.error?.message??'Génération suspendue');
  if(Object.values(p.progression.leases??{}).some((l:any)=>new Date(l.expires).getTime()>Date.now()))throw new PresetError('Des chapitres sont encore en cours.',409);
  const plan=p.data.plan;if(!plan||!p.data.evaluations||!p.data.sources||plan.chapters.some((_:unknown,i:number)=>!p.data[`chapter_${i}`]))throw new PresetError('Terminez toutes les étapes avant la validation.');
  const count=plan.chapters.reduce((n:number,_:unknown,i:number)=>n+p.data[`chapter_${i}`].sections.reduce((t:number,s:any)=>t+s.contentHtml.length,0),0);
  if(count<500000)throw new PresetError(`Le support contient ${count.toLocaleString('fr-FR')} caractères sur 500 000 attendus ; régénérez les chapitres incomplets.`);
  const {data,error}=await db.from('formation_presets').update({statut:input.action==='validate'?'valide':'brouillon',progression:{...p.progression,characters:count}}).eq('id',p.id).select('*').single();if(error)throw error;return json({preset:data});
 }
 if(input.action!=='step')throw new PresetError('Action inconnue');
 const step=input.step,done=new Set(p.progression.completed);
 if(step!=='plan'&&!done.has('plan'))throw new PresetError('La fiche doit être générée en premier.');
 if(step.startsWith('chapter_')&&!done.has('evaluations'))throw new PresetError('Les évaluations doivent être générées avant les chapitres.');
 const index=Number(step.replace('chapter_',''));if(step.startsWith('chapter_')&&!p.data.plan.chapters[index])throw new PresetError('Chapitre invalide');
 if(step==='sources'&&p.data.plan.chapters.some((_:unknown,i:number)=>!done.has(`chapter_${i}`)))throw new PresetError('Terminez le support avant les sources.');
 const apiKey=Deno.env.get('LOVABLE_API_KEY');if(!apiKey)throw new PresetError('Configuration IA indisponible',401);
 const lease=crypto.randomUUID();const {data:claim,error:claimError}=await db.rpc('claim_formation_preset_step',{p_id:p.id,p_user:user.id,p_step:step,p_lease:lease});if(claimError)throw claimError;
 if(!claim.claimed){if(claim.reason==='completed')return json({preset:p});throw new PresetError(claim.reason==='busy'?'Une génération est déjà en cours.':'Génération suspendue ou terminée.',409);}
 const encoder=new TextEncoder();
 const stream=new ReadableStream({async start(controller){
  const send=(v:unknown)=>{try{controller.enqueue(encoder.encode(JSON.stringify(v)+'\n'));}catch{/* reader closed; checkpoints remain */}};
  send({type:'started',step});
  const heartbeat=setInterval(()=>send({type:'heartbeat',step}),4000);
  try{
   const schema=step==='plan'?planSchema:step==='evaluations'?evalSchema:step==='sources'?sourcesSchema:chapterSchema;
   const wireSchema=zodToJsonSchema(schema, { target:'openAi', $refStrategy:'none' });
   const normalizeSchema=(value:any)=>{if(!value||typeof value!=='object')return;if(value.exclusiveMinimum===true){value.exclusiveMinimum=value.minimum;delete value.minimum;}if(value.exclusiveMaximum===true){value.exclusiveMaximum=value.maximum;delete value.maximum;}if(value.type==='object'&&value.properties){value.additionalProperties=false;value.required=Object.keys(value.properties);}for(const child of Object.values(value))normalizeSchema(child);};normalizeSchema(wireSchema);
   const scope=step==='plan'?'Rédige la fiche pédagogique et un plan de EXACTEMENT 16 chapitres de 6 à 12 sections chacun. Pas de dates de session, tarif, formateur ou stagiaires inventés.':step==='evaluations'?'Rédige les 10 mises en situation corrigées, 10 QCM par compétence EXACTEMENT, 10 questions pour chaque positionnement, questions ouvertes, cas intermédiaire et examen avec grille. Aucune réponse réelle de stagiaire.':step==='sources'?'Trouve uniquement des références réelles et pertinentes avec URL HTTPS et titre exact de la page. Sources réglementaires officielles, métier et technologie. Date réelle de publication si connue, sinon vide. Exploitation = action possible, jamais preuve réalisée. Vidéos YouTube réelles uniquement ; si incertain renvoie des listes vides. N’insère aucun lien dans les champs HTML des ressources, ceux-ci sont ajoutés après vérification.':`Rédige le chapitre ${index+1}/16 : ${JSON.stringify(p.data.plan.chapters[index])}. Rédige un véritable support professionnel très détaillé d’au moins 32 000 caractères HTML (idéalement 35 000), PAS de remplissage répétitif. Chaque section contient théorie approfondie, démarches, exemples pédagogiques fictifs clairement désignés et exercices. Termine avec 10 questions de quiz corrigées et un cas pratique avec corrigé. Aucune image ni URL inventée.`;
   const system='Tu rédiges un contenu pédagogique français, jamais des preuves d’audit réalisées. Corrigés réservés à l’usage pédagogique, aucune réponse, note, appréciation, satisfaction, présence ou signature de stagiaire. Ne fabrique aucun bloc RNCP/RS, certificateur ou date : seule la référence officielle fournie est autorisée. Si une donnée est inconnue, laisse vide. HTML sûr : p, listes, titres, tables, sans scripts ni attributs actifs. Respecte intégralement le schéma.';
   let generated:any,attempt=0;
   while(attempt<3){
    attempt++;
    const gateway=createLovableAiGatewayRunIdFetch(req.headers.get('X-Lovable-AIG-Run-ID')??undefined);
    const provider=createOpenAI({apiKey,baseURL:'https://ai.gateway.lovable.dev/v1',headers:{'Lovable-API-Key':apiKey,'X-Lovable-AIG-SDK':'vercel-ai-sdk'},fetch:gateway.fetch});
    try{
     const result=streamText({model:provider.responses('openai/gpt-6-astra'),system,messages:[{role:'user',content:JSON.stringify({input:p.data.input,reference:p.data.reference,competences:p.data.plan?.competences,scope})}],output:finalOnlyOutput(Output.object({schema:jsonSchema(wireSchema)})),abortSignal:req.signal,maxRetries:0,providerOptions:{openai:{forceReasoning:true,reasoningEffort:'low',reasoningSummary:'auto',store:false,include:['reasoning.encrypted_content']}}});
     let emitted=0;for await(const chunk of result.fullStream){if(chunk.type==='error')throw chunk.error;if(chunk.type==='text-delta'){emitted+=chunk.text.length;if(emitted%2000<chunk.text.length)send({type:'progress',step,characters:emitted});}}
     generated=await result.output;if(!generated)throw new PresetError('La génération n’a fourni aucun contenu ; demande terminée.',400,true);
     break;
    }catch(err:any){
     const status=err.statusCode??err.status??500;const message=err.message??'Échec de génération';
     if(req.signal.aborted||err.name==='AbortError')throw new PresetError('Génération interrompue ; les étapes déjà enregistrées sont conservées.',499);
     if(status!==429&&status<500)throw new PresetError(message,status,status===403);
     if(/refus|denied|account|configuration|unavailable|not.available/i.test(message))throw new PresetError(message,status,true);
     if(attempt>=3)throw new PresetError(message,status);
     const wait=(status===429?6000:2000)*2**(attempt-1);send({type:'retry',attempt,wait});await sleep(wait);
    }
   }
   generated=schema.parse(generated);
   generated=scrub(generated);
   if(step==='plan'){generated.reference=p.data.reference;generated.formation={...generated.formation,duree:p.data.input.duree};if(p.data.reference?.blocs?.length)generated.competences=p.data.reference.blocs.flatMap((b:any)=>b.competences?.length?b.competences:[b.libelle]);}
   if(step==='evaluations'){
    const expected=p.data.plan.competences;
    if(generated.qcmCompetences.length!==expected.length||expected.some((s:string)=>!generated.qcmCompetences.some((q:any)=>q.competence===s)))throw new PresetError('Les QCM ne couvrent pas exactement toutes les compétences.');
   }
   if(step.startsWith('chapter_')){
    const count=generated.sections.reduce((n:number,s:any)=>n+s.contentHtml.length,0);if(count<31250)throw new PresetError(`Chapitre trop court (${count} caractères) ; reprenez ce chapitre.`);
    const quiz='<h3>Quiz corrigé du chapitre</h3>'+generated.quiz.map((q:any)=>`<p><strong>${q.question}</strong></p><ol>${q.options.map((o:string)=>`<li>${o}</li>`).join('')}</ol><p>Corrigé : ${q.options[q.correctIndex]} — ${q.explication}</p>`).join('');
    generated.sections.push({title:'Quiz et cas pratique corrigés',contentHtml:cleanHtml(quiz+`<h3>${generated.casPratique.titre}</h3><p>${generated.casPratique.consigne}</p><h4>Corrigé pédagogique</h4><p>${generated.casPratique.reponseAttendue}</p>`)});
   }
   if(step==='sources'){
    for(const kind of ['reglementaire','metier','technologique']){const valid=[];for(const row of generated.veille[kind]){if(await verifySource(row.lien,row.titre))valid.push(row);}generated.veille[kind]=valid;}
    const videos=[];for(const v of generated.ressources.videos)if(await verifySource(v.url,v.title,true))videos.push(v);generated.ressources.videos=videos;
    for(const key of ['supportsHtml','outilsHtml','ressourcesComplHtml'])generated.ressources[key]=generated.ressources[key].replace(/<a\b[^>]*>(.*?)<\/a>/gis,'$1');
   }
   const {error:saveError}=await db.rpc('finish_formation_preset_step',{p_id:p.id,p_user:user.id,p_step:step,p_lease:lease,p_result:generated});if(saveError)throw saveError;
   const {data:latest}=await db.from('formation_presets').select('*').eq('id',p.id).single();send({type:'complete',preset:latest});
  }catch(err:any){
   const status=err.status??err.statusCode??500;const failure={message:err.message??'Génération interrompue',status,terminal:err.terminal??false};
   await db.rpc('finish_formation_preset_step',{p_id:p.id,p_user:user.id,p_step:step,p_lease:lease,p_result:{},p_error:failure});send({type:'error',...failure});
  }finally{clearInterval(heartbeat);try{controller.close();}catch{}}
 }});
 return new Response(stream,{headers:{...corsHeaders,'Content-Type':'application/x-ndjson','Cache-Control':'no-cache'}});
 }catch(err:any){return json({error:err instanceof z.ZodError?'Informations de formation invalides':err.message??'Erreur de génération'},err.status??400);}
});
