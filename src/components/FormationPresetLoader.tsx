import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { clearFormationPresets, registerFormationPreset, type FormationPreset } from '@/lib/formationPresets/registry';
export default function FormationPresetLoader(){
 useEffect(()=>{
  let stopped=false, generation=0;
  const load=async()=>{const version=++generation;clearFormationPresets();const {data,error}=await supabase.from('formation_presets').select('*').in('statut',['brouillon','valide']);if(!stopped&&version===generation&&!error)data?.forEach(p=>registerFormationPreset(p as unknown as FormationPreset));};
  void load();const {data:{subscription}}=supabase.auth.onAuthStateChange(event=>{if(event==='SIGNED_IN'||event==='SIGNED_OUT')void load();});
  return()=>{stopped=true;subscription.unsubscribe();};
 },[]);return null;
}
