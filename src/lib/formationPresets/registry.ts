import type { FormationInfo } from '@/types/qualiopi';
import type { AIContentPack } from '@/lib/aiContentPack';
import type { FormationEvalContent, QuestionOuverte } from '@/lib/evalContent';
import type { AIEvalPack } from '@/lib/aiEvalPack';
import type { AIVeillePack } from '@/lib/aiVeillePack';

export interface PresetPlan {
 formation: Partial<FormationInfo>;
 competences: string[];
 besoins: AIContentPack['besoins'];
 chapters: { title: string; description: string; sections: string[] }[];
 reference: unknown;
}
export interface PresetEvaluations {
 exercices: (FormationEvalContent['exercices'][number] & { points: number })[];
 qcmCompetences: { competence: string; questions: (FormationEvalContent['qcmFinal'][number] & { explication: string })[] }[];
 qcmDebut: FormationEvalContent['qcmPositionnement'];
 qcmFin: FormationEvalContent['qcmFinal'];
 questionsOuvertesDebut: QuestionOuverte[];
 questionsOuvertesFin: QuestionOuverte[];
 exerciceIntermediaire: AIEvalPack['exerciceIntermediaire'];
 evaluationFinale: AIEvalPack['evaluationFinale'] & { grille: { critere: string; points: number }[] };
}
export interface FormationPreset {
 id: string; intitule: string; intitule_normalise: string; code_rncp: string | null;
 duree_heures: number; type_action: string; statut: 'generation' | 'brouillon' | 'valide'; created_by: string;
 data: { plan?: PresetPlan; evaluations?: PresetEvaluations; sources?: { veille: AIVeillePack; ressources: AIContentPack['ressources'] }; [key: string]: unknown };
 progression: { completed: string[]; leases: Record<string, { id: string; expires: string }>; paused: boolean; error?: { message: string; status: number; terminal?: boolean } | null };
 updated_at?: string;
}
export const normaliseTitle = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const normaliseCode = (value?: string | null) => (value ?? '').toUpperCase().replace(/\s/g, '');
const entries = new Map<string, FormationPreset>();
const overrides = new Map<string, AIContentPack>();
const listeners = new Set<() => void>();
let revision = 0;
export function notifyPresets() { revision++; listeners.forEach(fn => fn()); }
export const subscribePresets = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export const presetRevision = () => revision;
export function registerFormationPreset(p: FormationPreset) { entries.set(p.id, p); notifyPresets(); }
export function clearFormationPresets() { entries.clear(); overrides.clear(); notifyPresets(); }
export function unregisterFormationPreset(id: string) { entries.delete(id); notifyPresets(); }
export function setIzilearnContentOverride(title: string, pack: AIContentPack | null) {
 const key = normaliseTitle(title); if (pack) overrides.set(key, pack); else overrides.delete(key);
}
export function getFormationPreset(f: Pick<FormationInfo, 'intitule'> & { codeRNCP?: string }): FormationPreset | null {
 const code = normaliseCode(f.codeRNCP); const title = normaliseTitle(f.intitule);
 const all = [...entries.values()].filter(p => p.statut !== 'generation' && p.data.evaluations && p.data.plan);
 // Resolve by explicit code first; title-only consumers get aliases from loadFormationPreset.
 const rank = (a: FormationPreset, b: FormationPreset) => Number(b.statut === 'valide') - Number(a.statut === 'valide') || (b.updated_at ?? '').localeCompare(a.updated_at ?? '');
 return (code ? all.filter(p => normaliseCode(p.code_rncp) === code).sort(rank)[0] : undefined) ?? all.filter(p => p.intitule_normalise === title).sort(rank)[0] ?? null;
}
export function presetContentPack(f: Pick<FormationInfo,'intitule'> & { codeRNCP?: string }): AIContentPack | null {
 const override = overrides.get(normaliseTitle(f.intitule)); if (override) return override;
 const p = getFormationPreset(f); const plan = p?.data.plan; const evaluations = p?.data.evaluations;
 if (!p || !plan || !evaluations) return null;
 return { besoins: plan.besoins, chapters: plan.chapters.flatMap((_,i) => {
  const ch = p.data[`chapter_${i}`] as AIContentPack['chapters'][number] | undefined;
  return ch ? [ch] : [];
 }), exercises: evaluations.exercices, ressources: p.data.sources?.ressources ?? { supportsHtml:'', outilsHtml:'', ressourcesComplHtml:'', videos:[] } };
}
export function presetEvalContent(title: string): FormationEvalContent | null {
 const p = getFormationPreset({intitule:title}); const e = p?.data.evaluations;
 return e ? { qcmPositionnement:e.qcmDebut, qcmFinal:e.qcmFin, exercices:e.exercices, competences:p?.data.plan?.competences ?? [], appreciations:[], questionsOuvertesDebut:e.questionsOuvertesDebut, questionsOuvertesFin:e.questionsOuvertesFin } : null;
}
export function presetEvalPack(f: Pick<FormationInfo,'intitule'> & { codeRNCP?: string }): AIEvalPack | null {
 const e=getFormationPreset(f)?.data.evaluations; return e ? {qcmDebut:e.qcmDebut,qcmFin:e.qcmFin,exerciceIntermediaire:e.exerciceIntermediaire,evaluationFinale:e.evaluationFinale} : null;
}
export function hasPresetContent(title: string) { return Boolean(getFormationPreset({intitule:title})); }
