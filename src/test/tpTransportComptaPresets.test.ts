import { describe, it, expect } from 'vitest';
import { getFormationPreset, presetEvalPack } from '@/lib/formationPresets/registry';
import { getTPBesoin } from '@/lib/formationPresets/builtinTP';
import { answersForQCM, studentAnswerFromCorrection } from '@/lib/aiEvalPack';

const F = [
  ['TP Gestionnaire des opérations de transport routier de marchandises', 'RNCP40990'],
  ['TP Exploitant en transport routier de marchandises', 'RNCP40992'],
  ['TP Gestionnaire comptable et fiscal', 'RNCP37949'],
  ['TP Gestionnaire de paie', 'RNCP37948'],
];
const people = Array.from({ length: 40 }, (_, i) => ({ nom: `NOM${i}`, prenom: `P${i}` }) as any);

describe('Titres professionnels transport / comptabilité / paie', () => {
  it.each(F)('%s : trouvé par intitulé, sans « TP » et par code', (t, c) => {
    expect(getFormationPreset({ intitule: t })).toBeTruthy();
    expect(getFormationPreset({ intitule: t.replace(/^TP /, '') })).toBeTruthy();
    expect(getFormationPreset({ intitule: 'x', codeRNCP: c })?.code_rncp).toBe(c);
  });
  it('formation sans rapport : non reconnue', () => {
    expect(getFormationPreset({ intitule: 'Anglais professionnel' })?.created_by).not.toBe('builtin');
  });
  it.each(F)('%s : 40 besoins et 40 réponses ouvertes différents, QCM valides, début < fin', (t) => {
    expect(new Set(people.map((s, i) => getTPBesoin(t, undefined, s.nom, s.prenom, i))).size).toBe(40);
    const e = getFormationPreset({ intitule: t })!.data.evaluations!;
    const qo = e.questionsOuvertesFin[0].reponseAttendue;
    expect(new Set(people.map((s, i) => people.map((_, q) => studentAnswerFromCorrection(qo, s, i, q)).join('|'))).size).toBe(40);
    const pack = presetEvalPack({ intitule: t })!;
    for (const q of [...pack.qcmDebut, ...pack.qcmFin]) { expect(q.options).toHaveLength(4); expect(q.correctIndex).toBeGreaterThanOrEqual(0); expect(q.correctIndex).toBeLessThan(4); }
    const score = (m: 'debut' | 'fin', qs: typeof pack.qcmDebut) => people.reduce((n, s, i) => n + answersForQCM(qs, i, s, m).filter((a, k) => a === qs[k].correctIndex).length, 0);
    expect(score('debut', pack.qcmDebut)).toBeLessThan(score('fin', pack.qcmFin));
  });
});
