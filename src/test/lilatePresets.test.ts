import { describe, expect, it } from 'vitest';
import { getFormationPreset, presetContentPack, presetEvalPack } from '@/lib/formationPresets/registry';
import { hasExactDedicatedContent } from '@/lib/formationPresets/catalog';
import { getTPBesoin } from '@/lib/formationPresets/builtinTP';
import { getCourseChapters } from '@/lib/courseContent';
import { SAMPLE_FORMATIONS, FORMATION_LILATE_EN, FORMATION_LILATE_FLE } from '@/lib/sampleData';

const CAS = [
  { titre: 'Anglais professionnel — préparation au test LILATE (RS7314)', court: 'LILATE Anglais', crm: 'Anglais professionnel — LILATE', code: 'RS7314' },
  { titre: 'Français professionnel (FLE) — préparation au test LILATE (RS6916)', court: 'LILATE FLE', crm: 'Français langue étrangère — LILATE', code: 'RS6916' },
];

describe('Parcours LILATE de CRM LMS intégrés', () => {
  for (const c of CAS) {
    it(`reconnaît ${c.court} par intitulé, alias et code`, () => {
      for (const intitule of [c.titre, c.court, c.crm]) {
        expect(getFormationPreset({ intitule })?.code_rncp).toBe(c.code);
        expect(hasExactDedicatedContent({ intitule })).toBe(true);
      }
      expect(getFormationPreset({ intitule: 'Intitulé saisi autrement', codeRNCP: c.code.toLowerCase() })?.intitule).toBe(c.titre);
      expect(hasExactDedicatedContent({ intitule: 'Intitulé saisi autrement', codeRNCP: c.code })).toBe(true);
    });
    it(`fournit le support de cours et les évaluations réelles de ${c.court}`, () => {
      const pack = presetContentPack({ intitule: c.titre });
      expect(pack?.chapters).toHaveLength(12);
      expect(pack!.chapters.every((ch) => ch.sections.length && ch.sections.every((s) => s.contentHtml.length > 200))).toBe(true);
      expect(getCourseChapters(c.court)[0].sections[0].content).toContain('<p>');
      const ev = presetEvalPack({ intitule: c.titre });
      expect(ev?.qcmDebut).toHaveLength(10);
      expect(ev?.qcmFin).toHaveLength(10);
      expect(new Set(ev!.qcmFin.map((q) => q.correctIndex)).size).toBeGreaterThan(2);
      expect(getTPBesoin(c.titre, undefined, 'TEST', 'Camille', 0)).toBeTruthy();
    });
  }
  it('ajoute les deux formations au catalogue sans dates ni formateur fictifs', () => {
    expect(SAMPLE_FORMATIONS).toContain(FORMATION_LILATE_EN);
    expect(SAMPLE_FORMATIONS).toContain(FORMATION_LILATE_FLE);
    for (const f of [FORMATION_LILATE_EN, FORMATION_LILATE_FLE]) {
      expect([f.dateDebut, f.dateFin, f.lieu, f.formateur]).toEqual(['', '', '', '']);
      expect(f.duree).toMatch(/^26 heures/);
      expect(f.programme.split('\n')).toHaveLength(12);
    }
  });
});
