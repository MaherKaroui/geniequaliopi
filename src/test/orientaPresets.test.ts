import { describe, it, expect } from 'vitest';
import { getFormationPreset, presetEvalPack, presetContentPack } from '@/lib/formationPresets/registry';
import { hasExactDedicatedContent } from '@/lib/formationPresets/catalog';
import { SAMPLE_FORMATIONS } from '@/lib/sampleData';
import { VTEST_FORMATIONS, PBNC_FORMATIONS } from '@/lib/orientaFormations';
import { getTPBesoin } from '@/lib/formationPresets/builtinTP';
import { getCourseChapters } from '@/lib/courseContent';
import { getRNCPByCode } from '@/lib/rncpData';
import { answersForQCM, studentAnswerFromCorrection } from '@/lib/aiEvalPack';

const ALL = [...VTEST_FORMATIONS, ...PBNC_FORMATIONS];
const T = ALL.map(f => f.intitule);
const people = Array.from({ length: 40 }, (_, i) => ({ nom: `NOM${i}`, prenom: `P${i}` }) as any);

describe('Parcours Orienta Campus : VTest RS6905 et Product Builder No-Code RNCP41480', () => {
  it('9 formations au catalogue avec contenu dédié, durées des parcours', () => {
    expect(ALL.map(f => parseInt(f.duree))).toEqual([21, 21, 30, 50, 420, 105, 105, 105, 105]);
    for (const f of ALL) {
      expect(SAMPLE_FORMATIONS).toContain(f);
      expect(hasExactDedicatedContent(f), f.intitule).toBe(true);
      expect(f.modalites).toBe('distanciel');
    }
    expect(VTEST_FORMATIONS.every(f => f.codeRNCP === 'RS6905')).toBe(true);
    expect(PBNC_FORMATIONS.every(f => f.codeRNCP === 'RNCP41480')).toBe(true);
  });
  it('l\'exemple VTest existant garde son contenu (preset trouvé par intitulé seulement)', () => {
    expect(getFormationPreset({ intitule: 'Anglais Professionnel – Certification VTest Business English (RS6905)', codeRNCP: 'RS6905' })).toBeNull();
  });
  it.each(T)('%s : besoins et réponses différents, QCM valides, début < fin', (t) => {
    expect(new Set(people.map((s, i) => getTPBesoin(t, undefined, s.nom, s.prenom, i))).size).toBe(40);
    const e = getFormationPreset({ intitule: t })!.data.evaluations!;
    expect(e.exercices).toHaveLength(10);
    expect(e.questionsOuvertesDebut).toHaveLength(10);
    expect(e.questionsOuvertesFin).toHaveLength(10);
    for (const c of e.qcmCompetences) expect(c.questions, c.competence).toHaveLength(10);
    const qo = e.questionsOuvertesFin[0].reponseAttendue;
    expect(new Set(people.map((s, i) => people.map((_, q) => studentAnswerFromCorrection(qo, s, i, q)).join('|'))).size).toBe(40);
    const pack = presetEvalPack({ intitule: t })!;
    for (const q of [...pack.qcmDebut, ...pack.qcmFin, ...e.qcmCompetences.flatMap(c => c.questions)]) {
      expect(q.options).toHaveLength(4); expect(q.correctIndex).toBeGreaterThanOrEqual(0); expect(q.correctIndex).toBeLessThan(4);
    }
    const score = (m: 'debut' | 'fin', qs: typeof pack.qcmDebut) => people.reduce((n, s, i) => n + answersForQCM(qs, i, s, m).filter((a, k) => a === qs[k].correctIndex).length, 0);
    expect(score('debut', pack.qcmDebut)).toBeLessThan(score('fin', pack.qcmFin));
    const fin = e.evaluationFinale;
    expect(fin.grille.reduce((n, g) => n + g.points, 0)).toBe(20);
  });
  it.each(T)('%s : support de cours de plus de 60 pages, sans mention d\'un organisme', (t) => {
    const pack = presetContentPack({ intitule: t })!;
    expect(pack.chapters.length).toBeGreaterThanOrEqual(10);
    const html = pack.chapters.flatMap(ch => ch.sections.map(s => s.contentHtml)).join('');
    expect(html.length).toBeGreaterThan(500_000);
    expect(html).not.toMatch(/<script|<img/i);
    expect(html).not.toMatch(/ORIENTA|Orienta|Rahma GARY|orienta-campus/);
    expect(getCourseChapters(t).length).toBe(pack.chapters.length);
    expect(getFormationPreset({ intitule: t })!.data.sources?.veille.reglementaire.length).toBeGreaterThan(0);
  });
  it('compétences officielles : 4 pour le VTest, 32 pour le titre PBNC, fiches à jour', () => {
    expect(getFormationPreset({ intitule: VTEST_FORMATIONS[0].intitule })!.data.plan!.competences).toHaveLength(4);
    expect(getFormationPreset({ intitule: PBNC_FORMATIONS[0].intitule })!.data.plan!.competences).toHaveLength(32);
    expect(PBNC_FORMATIONS.slice(1).map(f => getFormationPreset({ intitule: f.intitule })!.data.plan!.competences.length)).toEqual([10, 5, 9, 8]);
    const rs = getRNCPByCode('RS6905')!;
    expect(rs.dateEcheance).toBe('28/11/2027');
    expect(rs.resume).toMatch(/A2 au niveau C1/);
    const pb = getRNCPByCode('RNCP41480')!;
    expect(pb.blocsCompetences.map(b => b.competences.length)).toEqual([10, 5, 9, 8]);
    expect(pb.blocsCompetences.flatMap(b => b.competences).some(c => c.includes('…'))).toBe(false);
  });
  it('intitulés d\'Orienta Campus reconnus', () => {
    expect(getFormationPreset({ intitule: 'Product Builder No-Code — titre complet (420 h)' })?.id).toMatch(/^pbnc-420-/);
    expect(getFormationPreset({ intitule: 'Product builder no-code' })?.id).toMatch(/^pbnc-420-/);
    expect(getFormationPreset({ intitule: 'Product Builder No-Code — Bloc 3 : Développer (105 h)' })?.id).toMatch(/^pbnc-bc03-/);
    expect(getFormationPreset({ intitule: 'Anglais professionnel VTest — Parcours B2 — 30 h' })?.id).toMatch(/^vtest-b2-/);
  });
});
