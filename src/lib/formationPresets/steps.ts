import type { FormationPreset } from './registry';
export const MAX_PARALLEL_CHAPTERS = 3;
export function nextPresetSteps(p: FormationPreset): string[] {
 const done=new Set(p.progression.completed??[]);
 if(!done.has('plan'))return ['plan'];if(!done.has('evaluations'))return ['evaluations'];
 const pending=(p.data.plan?.chapters??[]).flatMap((_,i)=>done.has(`chapter_${i}`)?[]:[`chapter_${i}`]);
 return pending.length?pending.slice(0,MAX_PARALLEL_CHAPTERS):done.has('sources')?[]:['sources'];
}
export const nextPresetStep=(p:FormationPreset)=>nextPresetSteps(p)[0]??null;
