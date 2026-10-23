import { describe, it, expect } from 'vitest';
import { getFormationPreset, presetEvalPack, presetContentPack } from '@/lib/formationPresets/registry';
import { hasExactDedicatedContent } from '@/lib/formationPresets/catalog';
import { SAMPLE_FORMATIONS } from '@/lib/sampleData';
import { getTPBesoin } from '@/lib/formationPresets/builtinTP';
import { getCourseChapters } from '@/lib/courseContent';
import { isARH41366Formation } from '@/lib/arh41366Humanized';
import { answersForQCM, studentAnswerFromCorrection } from '@/lib/aiEvalPack';

const F = [
  ['TP Gestionnaire des opérations de transport routier de marchandises', 'RNCP40990'],
  ['TP Exploitant en transport routier de marchandises', 'RNCP40992'],
  ['TP Gestionnaire comptable et fiscal', 'RNCP37949'],
  ['TP Gestionnaire de paie', 'RNCP37948'],
  ['TP Comptable assistant', 'RNCP37121'],
  ['TP Secrétaire comptable', 'RNCP37123'],
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
  it.each(F)('%s : support de cours de plus de 60 pages', (t, c) => {
    const pack = presetContentPack({ intitule: t, codeRNCP: c })!;
    expect(pack.chapters.length).toBeGreaterThanOrEqual(15);
    const html = pack.chapters.flatMap(ch => ch.sections.map(s => s.contentHtml)).join('');
    expect(html.length).toBeGreaterThan(500_000);
    expect(html).not.toMatch(/<script|<img/i);
    expect(getCourseChapters(t).length).toBe(pack.chapters.length);
  });
  it.each(['TP Assistant ressources humaines', 'Assistant ressources humaines', 'TP - Assistant ressources humaines'])('%s : support RNCP41366 existant', (t) => {
    expect(isARH41366Formation(t)).toBe(true);
    expect(getCourseChapters(t).flatMap(c => c.sections.map(s => s.content)).join('').length).toBeGreaterThan(500_000);
  });
  it('« Assistant ressources humaines et paie » : pas confondu avec le titre RNCP41366', () => {
    expect(isARH41366Formation('Assistant ressources humaines et paie')).toBe(false);
  });
  it('catalogue : les titres professionnels sont proposés et reconnus', () => {
    for (const t of ['TP Exploitant en transport routier de marchandises', 'TP Gestionnaire comptable et fiscal', 'TP Gestionnaire de paie', 'TP Comptable assistant', 'TP Secrétaire comptable']) {
      const f = SAMPLE_FORMATIONS.find(x => x.intitule === t)!;
      expect(f, t).toBeTruthy();
      expect(hasExactDedicatedContent(f)).toBe(true);
    }
  });
});
