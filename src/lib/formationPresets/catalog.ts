import { SAMPLE_FORMATIONS as catalog } from '@/lib/sampleData';
import { normaliseCode, normaliseTitle, getFormationPreset } from './registry';
const legacyTitles = ['Bureautique : Word, Excel, PowerPoint', 'Marketing digital et réseaux sociaux', 'Informatique : maintenance et réseau'];
export function hasExactStaticContent(f: { intitule: string; codeRNCP?: string }): boolean {
 const title = normaliseTitle(f.intitule), code=normaliseCode(f.codeRNCP);
 return Boolean(title && (legacyTitles.some(t=>normaliseTitle(t)===title) || catalog.some(p => normaliseTitle(p.intitule) === title || Boolean(code && normaliseCode(p.codeRNCP) === code))));
}
export const hasExactDedicatedContent = (f: {intitule:string;codeRNCP?:string}) => hasExactStaticContent(f) || Boolean(getFormationPreset(f));
