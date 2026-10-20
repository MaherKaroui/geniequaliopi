import { supabase } from '@/integrations/supabase/client';
import type { FormationInfo } from '@/types/qualiopi';
import { registerFormationPreset, normaliseCode, normaliseTitle, type FormationPreset } from './registry';
export async function loadFormationPreset(f: Pick<FormationInfo,'intitule'> & {codeRNCP?:string}): Promise<FormationPreset | null> {
 if (!f.intitule.trim()) return null;
 const code=normaliseCode(f.codeRNCP);
 let result = code ? await supabase.from('formation_presets').select('*').eq('code_rncp',code).order('updated_at',{ascending:false}).limit(1).maybeSingle() : null;
 if (!result?.data) result=await supabase.from('formation_presets').select('*').eq('intitule_normalise',normaliseTitle(f.intitule)).order('updated_at',{ascending:false}).limit(1).maybeSingle();
 if (result.error) throw result.error;
 if (!result.data) return null;
 const p=result.data as unknown as FormationPreset; registerFormationPreset(p); return p;
}
export async function readPreset(id: string) {
 const {data,error}=await supabase.from('formation_presets').select('*').eq('id',id).single();
 if (error) throw error; const p=data as unknown as FormationPreset; registerFormationPreset(p); return p;
}
export async function presetAction(body: Record<string,unknown>, onProgress?: (event: Record<string,unknown>)=>void): Promise<FormationPreset> {
 const {data:{session}}=await supabase.auth.getSession();
 if (!session) throw new Error('Connectez-vous pour créer ou modifier une formation.');
 const response=await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-formation-preset`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.access_token}`,apikey:import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY},body:JSON.stringify(body)});
 if (!response.ok) {const e=await response.json().catch(()=>({error:'Erreur de génération'})); throw new Error(e.error || e.message);}
 if (!response.headers.get('content-type')?.includes('ndjson')) {const {preset,error}=await response.json(); if(error) throw new Error(error); registerFormationPreset(preset);return preset;}
 const reader=response.body?.getReader(); if (!reader) throw new Error('Flux de génération absent');
 let buffer='',preset:FormationPreset | undefined; const decoder=new TextDecoder();
 while(true) {const {value,done}=await reader.read(); if(done)break; buffer+=decoder.decode(value,{stream:true});const lines=buffer.split('\n');buffer=lines.pop() ?? '';for(const line of lines){if(!line.trim())continue;const event=JSON.parse(line);onProgress?.(event);if(event.type==='error')throw new Error(event.message);if(event.preset)preset=event.preset;}}
 if(!preset)throw new Error('Génération interrompue : les étapes enregistrées sont conservées.');registerFormationPreset(preset);return preset;
}
export { nextPresetStep, nextPresetSteps } from './steps';
