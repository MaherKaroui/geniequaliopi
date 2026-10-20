import { useEffect, useState, useSyncExternalStore } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Plus, Play, Check, RefreshCw, Eye } from 'lucide-react';
import { toast } from 'sonner';
import type { FormationInfo } from '@/types/qualiopi';
import { hasExactDedicatedContent } from '@/lib/formationPresets/catalog';
import { getFormationPreset, subscribePresets, presetRevision, type FormationPreset } from '@/lib/formationPresets/registry';
import { loadFormationPreset, nextPresetStep, nextPresetSteps, presetAction, readPreset } from '@/lib/formationPresets/client';
import DOMPurify from 'dompurify';

export default function FormationPresetControl({formation,onApply,onContentChange}:{formation:FormationInfo;onApply?:(f:FormationInfo)=>void;onContentChange?:()=>void}) {
 const {user}=useAuth();useSyncExternalStore(subscribePresets,presetRevision);
 const [preset,setPreset]=useState<FormationPreset|null>(null),[busy,setBusy]=useState(false),[label,setLabel]=useState(''),[error,setError]=useState(''),[preview,setPreview]=useState<number|null>(null),[checking,setChecking]=useState(false);
 useEffect(()=>{let active=true;setPreset(null);setError('');if(!formation.intitule.trim())return;setChecking(true);const timer=setTimeout(()=>{loadFormationPreset(formation).then(p=>{if(active){setPreset(p);onContentChange?.();}}).catch(e=>{if(active)setError(e.message);}).finally(()=>{if(active)setChecking(false);});},300);return()=>{active=false;clearTimeout(timer);};},[formation.intitule,formation.codeRNCP,user?.id]);
 const current=preset ?? getFormationPreset(formation);
 const known=hasExactDedicatedContent(formation);
 async function run(regenerate?:number){
  setBusy(true);setError('');try{
   let p=current;
   if(!p)p=await presetAction({action:'start',formation:{intitule:formation.intitule,codeRNCP:formation.codeRNCP??'',duree:formation.duree,typeAction:formation.typeAction??'actions-formation',modalites:formation.modalites,objectifs:formation.objectifs,programme:formation.programme}});
   else if(regenerate!==undefined)p=await presetAction({action:'regenerate',id:p.id,index:regenerate});
   else if(p.progression.paused)p=await presetAction({action:'resume',id:p.id});
   setPreset(p);
   for(let budget=0;budget<20;budget++){
    const steps=nextPresetSteps(p);const step=steps[0];if(!step)break;
    const chapter=step.startsWith('chapter_')?Number(step.slice(8))+1:null;
    setLabel(chapter?`Chapitre ${chapter} / ${p.data.plan?.chapters.length}`:step==='plan'?'Fiche et plan du support':step==='evaluations'?'Évaluations et mises en situation':'Veilles et ressources');
    if(steps.length>1){
     const results=await Promise.allSettled(steps.map(step=>presetAction({action:'step',id:p.id,step})));
     p=await readPreset(p.id);setPreset(p);const failure=results.find(r=>r.status==='rejected');if(failure?.status==='rejected')throw failure.reason;
    }else{p=await presetAction({action:'step',id:p.id,step},event=>{if(event.type==='retry')setLabel(`Nouvel essai ${event.attempt} / 3`);});setPreset(p);}
   }
   if(!nextPresetStep(p)){p=await presetAction({action:'finalize',id:p.id});setPreset(p);onApply?.({...formation,...p.data.plan?.formation,duree:formation.duree,intitule:formation.intitule,codeRNCP:formation.codeRNCP});onContentChange?.();toast.success('Formation enregistrée en brouillon');}
  }catch(e){const message=e instanceof Error?e.message:'Génération interrompue';setError(message);toast.error(message);if(current)readPreset(current.id).then(setPreset).catch(()=>{});}finally{setBusy(false);setLabel('');}
 }
 async function validate(){if(!current)return;setBusy(true);try{const p=await presetAction({action:'validate',id:current.id});setPreset(p);onContentChange?.();toast.success('Formation validée');}catch(e){setError(e instanceof Error?e.message:'Validation impossible');}finally{setBusy(false);}}
 if(formation.intitule.trim().length<3||(!current&&known))return null;
 const total=(current?.data.plan?.chapters.length??16)+3,done=current?.progression.completed.length??0;
 const owner=Boolean(user&&(!current||current.created_by===user.id));
 return <section className="space-y-3 border-t border-border pt-3">
  {!current&&<p className="text-sm text-muted-foreground">Cette formation n'a pas de contenu dédié : les documents utiliseront un contenu générique.</p>}
  <div className="flex flex-wrap items-center gap-2">
   {current&&<Badge variant="outline">{current.statut==='valide'?'Formation validée':current.statut==='brouillon'?'Brouillon':'Génération en cours'}</Badge>}
   {(!current||current.statut==='generation')&&<Button type="button" variant="outline" disabled={busy||checking||!owner} onClick={()=>run()}>{busy?<Loader2 className="mr-2 h-4 w-4 animate-spin"/>:current?<Play className="mr-2 h-4 w-4"/>:<Plus className="mr-2 h-4 w-4"/>}{current?'Reprendre la génération':'Créer cette formation'}</Button>}
   {current?.statut==='brouillon'&&<Button type="button" disabled={busy||!owner} onClick={validate}><Check className="mr-2 h-4 w-4"/>Valider la formation</Button>}
   {!user&&<p className="text-sm text-muted-foreground">Connexion requise pour créer ou modifier une formation.</p>}
  </div>
  {(busy||current?.statut==='generation')&&<div className="space-y-1"><p className="text-sm">{label||`${done} / ${total} étapes enregistrées`}</p><Progress value={100*done/total}/></div>}
  {error&&<p role="alert" className="text-sm text-destructive">{error}</p>}
  {current?.data.plan&&<details><summary className="cursor-pointer text-sm font-medium">Chapitres du support</summary><ul className="mt-2 divide-y divide-border">{current.data.plan.chapters.map((ch,i)=><li key={i} className="flex items-center justify-between gap-2 py-2"><span className="min-w-0 text-sm">{i+1}. {ch.title}</span><div className="flex shrink-0 gap-1"><Button type="button" variant="ghost" size="icon" title="Voir le chapitre" aria-label={`Voir le chapitre ${i+1}`} disabled={!current.data[`chapter_${i}`]} onClick={()=>setPreview(i)}><Eye className="h-4 w-4"/></Button><Button type="button" variant="ghost" size="icon" title="Régénérer ce chapitre" aria-label={`Régénérer le chapitre ${i+1}`} disabled={busy||!owner} onClick={()=>run(i)}><RefreshCw className="h-4 w-4"/></Button></div></li>)}</ul></details>}
  <Dialog open={preview!==null} onOpenChange={open=>{if(!open)setPreview(null);}}><DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto"><DialogHeader><DialogTitle>{preview!==null?current?.data.plan?.chapters[preview]?.title:''}</DialogTitle></DialogHeader>{preview!==null&&<article dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(((current?.data[`chapter_${preview}`] as {sections:{title:string;contentHtml:string}[]}|undefined)?.sections??[]).map(s=>`<h3>${s.title}</h3>${s.contentHtml}`).join(''))}}/>}</DialogContent></Dialog>
 </section>;
}
