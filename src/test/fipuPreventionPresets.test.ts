import { describe, it, expect } from 'vitest';
import { getFormationPreset, presetEvalPack, presetContentPack } from '@/lib/formationPresets/registry';
import { hasExactDedicatedContent } from '@/lib/formationPresets/catalog';
import { SAMPLE_FORMATIONS } from '@/lib/sampleData';
import { FIPU_FORMATIONS } from '@/lib/fipuFormations';
import { getTPBesoin } from '@/lib/formationPresets/builtinTP';
import { getCourseChapters } from '@/lib/courseContent';
import { answersForQCM, studentAnswerFromCorrection } from '@/lib/aiEvalPack';

const T = FIPU_FORMATIONS.map(f => f.intitule);
const people = Array.from({ length: 40 }, (_, i) => ({ nom: `NOM${i}`, prenom: `P${i}` }) as any);

describe('Formations de prévention INRS (TMS Pros, PRAP)', () => {
  it('8 formations au catalogue, avec contenu dédié et sans code ni mention RNCP / RS / CPF', () => {
    expect(T).toHaveLength(8);
    for (const f of FIPU_FORMATIONS) {
      expect(SAMPLE_FORMATIONS).toContain(f);
      expect(hasExactDedicatedContent(f), f.intitule).toBe(true);
      expect(f.codeRNCP).toBeUndefined();
      expect(`${f.objectifs} ${f.methodesEvaluation}`).not.toMatch(/RNCP|\bRS\d|CPF|France Comp/);
    }
  });
  it.each(T)('%s : 40 besoins et réponses différents, QCM valides, début < fin', (t) => {
    expect(new Set(people.map((s, i) => getTPBesoin(t, undefined, s.nom, s.prenom, i))).size).toBe(40);
    const e = getFormationPreset({ intitule: t })!.data.evaluations!;
    const qo = e.questionsOuvertesFin[0].reponseAttendue;
    expect(new Set(people.map((s, i) => people.map((_, q) => studentAnswerFromCorrection(qo, s, i, q)).join('|'))).size).toBe(40);
    const pack = presetEvalPack({ intitule: t })!;
    for (const q of [...pack.qcmDebut, ...pack.qcmFin]) { expect(q.options).toHaveLength(4); expect(q.correctIndex).toBeGreaterThanOrEqual(0); expect(q.correctIndex).toBeLessThan(4); }
    const score = (m: 'debut' | 'fin', qs: typeof pack.qcmDebut) => people.reduce((n, s, i) => n + answersForQCM(qs, i, s, m).filter((a, k) => a === qs[k].correctIndex).length, 0);
    expect(score('debut', pack.qcmDebut)).toBeLessThan(score('fin', pack.qcmFin));
  });
  it.each(T)('%s : support de cours de plus de 60 pages', (t) => {
    const pack = presetContentPack({ intitule: t })!;
    expect(pack.chapters.length).toBeGreaterThanOrEqual(10);
    const html = pack.chapters.flatMap(ch => ch.sections.map(s => s.contentHtml)).join('');
    expect(html.length).toBeGreaterThan(500_000);
    expect(html).not.toMatch(/<script|<img|RNCP|\bCPF\b/i);
    expect(getCourseChapters(t).length).toBe(pack.chapters.length);
  });
  it('formes courtes et apostrophe droite reconnues', () => {
    expect(getFormationPreset({ intitule: 'PRAP IBC' })?.id).toMatch(/^fipu-prap-ibc-/);
    expect(getFormationPreset({ intitule: 'Acteur PRAP 2S' })?.id).toMatch(/^fipu-prap-2s-/);
    expect(getFormationPreset({ intitule: "Devenir personne ressource du projet de prévention des TMS de l'entreprise" })?.id).toMatch(/^fipu-tms-pr-/);
  });
});
