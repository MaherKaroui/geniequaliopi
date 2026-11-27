import { describe, it, expect } from 'vitest';
import { getFormationPreset, presetEvalPack } from '@/lib/formationPresets/registry';
import { hasExactDedicatedContent } from '@/lib/formationPresets/catalog';
import { generateDocumentById } from '@/lib/documentGenerator';

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

  it('document QCM de chaque stagiaire rempli : questions séparées, réponses cochées propres au stagiaire, note', () => {
    const o: any = { nom: 'ORIENTA CONSULT', siret: '93401856500010', nda: '11788720978', adresse: '21 C rue Jacques Cartier', codePostal: '78960', ville: 'Voisins-le-Bretonneux', dirigeant: 'Rahma GARY', typesActions: ['actions-formation'] };
    const f: any = { intitule: INTITULE, codeRNCP: 'RS6905', duree: '35 heures (10 séances de 3 h 30)', dateDebut: '2026-11-02', dateFin: '2026-11-16', modalites: 'distanciel', formateur: 'Rahma GARY' };
    const st: any[] = ['Inès', 'Yanis', 'Claire', 'Sofia'].map((prenom, i) => ({ nom: `NOM${i}`, prenom, civilite: 'Mme', dateDebutFormation: '2026-11-02', dateFinFormation: '2026-11-16' }));
    const reponses = st.map((_, si) => {
      const txt = generateDocumentById(`ex_${si}`, 'exercices_stagiaire', { fi: 0, stagiaireIdx: si, exerciceIdx: 0 }, o, f, st).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
      expect(txt).not.toMatch(/undefined|EXERCICES PRATIQUES/);
      expect(txt).toMatch(/QCM 1 — Se présenter/);
      const lettres = [...txt.matchAll(/Réponse du stagiaire : ([A-D])\b/g)].map(m => m[1]);
      expect(lettres).toHaveLength(10);
      return lettres.join('');
    });
    expect(new Set(reponses).size).toBeGreaterThan(1);
  });
});

