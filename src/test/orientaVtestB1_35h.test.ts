import { describe, it, expect } from 'vitest';
import { getFormationPreset, presetEvalPack } from '@/lib/formationPresets/registry';
import { hasExactDedicatedContent } from '@/lib/formationPresets/catalog';

// Intitulé du dossier ORIENTA CONSULT (Génie Qualiopi) : parcours B1 de 35 h du site orienta-consult.fr
const INTITULE = 'Anglais professionnel – Niveau B1 – VTest Business English (RS6905)';

describe('ORIENTA CONSULT : VTest B1 – 35 h, exercices en QCM', () => {
  it('le dossier B1 trouve son contenu dédié, même avec le code RS6905', () => {
    const p = getFormationPreset({ intitule: INTITULE, codeRNCP: 'RS6905' });
    expect(p?.duree_heures).toBe(35);
    expect(hasExactDedicatedContent({ intitule: INTITULE, codeRNCP: 'RS6905' })).toBe(true);
    expect(presetEvalPack({ intitule: INTITULE })).not.toBeNull();
  });

  it('10 QCM de 10 questions, au format lu par le générateur d\'exercices', () => {
    const ex = getFormationPreset({ intitule: INTITULE })!.data.evaluations!.exercices;
    expect(ex).toHaveLength(10);
    for (const e of ex) {
      expect(e.titre).toMatch(/^QCM \d+ — /);
      const blocs = e.consigne.split(/\n\s*\n/).filter(b => /^\d+\)/.test(b.trim()));
      expect(blocs, e.titre).toHaveLength(10);
      for (const b of blocs) expect([...b.matchAll(/([A-D])\)\s/g)].map(m => m[1]), b).toEqual(['A', 'B', 'C', 'D']);
      expect(e.reponseAttendue).toMatch(/^(\d+-[A-D]\s*){10}$/);
    }
  });

  it('le parcours B1 de 21 h d\'Orienta Campus garde ses exercices pratiques', () => {
    const ex = getFormationPreset({ intitule: 'VTest Business English (RS6905) — Parcours B1 — 21 h' })!.data.evaluations!.exercices;
    expect(ex.some(e => /^QCM/.test(e.titre))).toBe(false);
  });
});
