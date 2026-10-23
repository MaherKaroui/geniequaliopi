import { describe, expect, it } from "vitest";
import {
  isLilateFormation, lilateLangue, lilateNiveau, lilateBonnesQcmDebut, lilateReponsesQcmDebut,
  getLilateAutoAnswers, pickLilateExerciceAnswer, getLilateEvalBesoins, getLilateBesoin,
} from "@/lib/lilateHumanized";
import { getQuestionsOuvertes, generateStagiaireOpenAnswers } from "@/lib/evalContent";
import { getFormationPreset, presetEvalPack } from "@/lib/formationPresets/registry";
import { FORMATION_LILATE_EN_RS6118, SAMPLE_FORMATIONS } from "@/lib/sampleData";
import lilateEn from "@/data/tpPresets/lilate-en.json";
import lilateFle from "@/data/tpPresets/lilate-fle.json";

const FORMATIONS = [
  { intitule: "Anglais professionnel — préparation au test LILATE (RS7314)", code: "RS7314", langue: "en" as const, exos: lilateEn.exercices },
  { intitule: "Test d’aptitude à travailler en anglais – LILATE (RS6118)", code: "RS6118", langue: "en" as const, exos: lilateEn.exercices },
  { intitule: "Français professionnel (FLE) — préparation au test LILATE (RS6916)", code: "RS6916", langue: "fle" as const, exos: lilateFle.exercices },
];
const STAGIAIRES = ["MARTIN Léa", "DIALLO Moussa", "NGUYEN Linh", "PEREIRA Ana", "BENALI Karim", "DUPONT Julie", "SILVA Tiago", "KOWALSKI Piotr", "TRAN Mai", "HADDAD Sami", "ROSSI Giulia", "MOREAU Paul"]
  .map((x, i) => { const [nom, prenom] = x.split(" "); return { nom, prenom, civilite: i % 2 ? "M." : "Mme" }; });

describe("LILATE : moteur de réponses humanisées", () => {
  it("détecte les trois formations par intitulé et par code", () => {
    for (const f of FORMATIONS) {
      expect(isLilateFormation(f.intitule)).toBe(true);
      expect(isLilateFormation("Intitulé saisi autrement", f.code.toLowerCase())).toBe(true);
      expect(lilateLangue(f.intitule, f.code)).toBe(f.langue);
      expect(lilateLangue(f.intitule)).toBe(f.langue);
    }
    expect(isLilateFormation("RS6118 - Test d’aptitude à travailler en anglais")).toBe(true);
    expect(isLilateFormation("Anglais professionnel TOEIC")).toBe(false);
    expect(isLilateFormation("Techniques de maquillage semi-permanent (RS6459)", "RS6459")).toBe(false);
  });

  it("RS6118 : preset et entrée catalogue distincts, réservés aux sessions antérieures au 24/10/2025", () => {
    expect(getFormationPreset({ intitule: "RS6118 - Test d’aptitude à travailler en anglais" })?.code_rncp).toBe("RS6118");
    expect(getFormationPreset({ intitule: "x", codeRNCP: "rs6118" })?.code_rncp).toBe("RS6118");
    expect(getFormationPreset({ intitule: "RS7314 - Test d’aptitude à travailler en anglais - LILATE" })?.code_rncp).toBe("RS7314");
    expect(getFormationPreset({ intitule: "RS6916 - Test d'aptitude à travailler en français langue étrangère - LILATE" })?.code_rncp).toBe("RS6916");
    expect(presetEvalPack({ intitule: FORMATION_LILATE_EN_RS6118.intitule })?.qcmDebut).toHaveLength(10);
    expect(SAMPLE_FORMATIONS).toContain(FORMATION_LILATE_EN_RS6118);
    expect(FORMATION_LILATE_EN_RS6118.codeRNCP).toBe("RS6118");
    expect(FORMATION_LILATE_EN_RS6118.methodesEvaluation).toMatch(/24\/10\/2025.*RS7314/);
  });

  for (const f of FORMATIONS) {
    it(`${f.code} : 12 stagiaires → copies toutes différentes, fin supérieure au début`, () => {
      const qo = getQuestionsOuvertes(f.intitule);
      expect(qo.debut.length).toBeGreaterThanOrEqual(10);
      for (const moment of ["debut", "fin"] as const) {
        const qs = moment === "debut" ? qo.debut : qo.fin;
        const copies = STAGIAIRES.map((s, i) => generateStagiaireOpenAnswers(qs, i, moment === "debut", s, { intitule: f.intitule, codeRNCP: f.code }));
        for (let q = 0; q < qs.length; q++) expect(new Set(copies.map((c) => c[q].reponse)).size).toBe(12);
      }
      STAGIAIRES.forEach((s, i) => {
        const deb = getLilateAutoAnswers(qo.debut, s.nom, s.prenom, s.civilite, true, i, f.langue).scores.reduce((a, b) => a + b, 0);
        const fin = getLilateAutoAnswers(qo.fin, s.nom, s.prenom, s.civilite, false, i, f.langue).scores.reduce((a, b) => a + b, 0);
        expect(fin).toBeGreaterThan(deb);
      });
      for (let ei = 0; ei < f.exos.length; ei++) {
        const reps = STAGIAIRES.map((s, i) => pickLilateExerciceAnswer(f.intitule, f.code, ei, i, s, f.exos[ei].titre));
        expect(reps.every(Boolean)).toBe(true);
        expect(new Set(reps).size).toBe(12);
      }
      const besoins = STAGIAIRES.map((s, i) => getLilateEvalBesoins(s, false, i, f.intitule, f.code));
      expect(new Set(besoins.map((b) => `${b.objectif}|${b.diplome}|${b.handicap}`)).size).toBe(12);
      expect(besoins.every((b) => /LINGUEO/.test(b.objectif) && !/garanti|réussite assurée/i.test(b.objectif))).toBe(true);
    });
  }

  it("QCM de début cohérent avec le niveau estimé et déterministe", () => {
    const qs = lilateEn.qcmDebut;
    const seuil = { A1: [0, 3], A2: [4, 5], B1: [6, 7], B2: [8, 9] } as const;
    STAGIAIRES.forEach((s, i) => {
      const n = lilateBonnesQcmDebut(10, i, s.nom, s.prenom);
      const [min, max] = seuil[lilateNiveau(i, s.nom, s.prenom)];
      expect(n).toBeGreaterThanOrEqual(min);
      expect(n).toBeLessThanOrEqual(max);
      const rep = lilateReponsesQcmDebut(qs, i, s.nom, s.prenom);
      expect(rep.filter((r, k) => r === qs[k].correctIndex).length).toBe(n);
      expect(lilateReponsesQcmDebut(qs, i, s.nom, s.prenom)).toEqual(rep);
    });
    expect(new Set(STAGIAIRES.map((s, i) => lilateBonnesQcmDebut(10, i, s.nom, s.prenom))).size).toBeGreaterThanOrEqual(5);
    expect(getLilateBesoin(FORMATIONS[0].intitule, "RS7314", "MARTIN", "Léa", "Mme", 0)).toBe(getLilateBesoin(FORMATIONS[0].intitule, "RS7314", "MARTIN", "Léa", "Mme", 0));
  });
});
