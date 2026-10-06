import { describe, it, expect } from "vitest";
import { FORMATION_RPMS, RPMS_QCM_COMPETENCES, RPMS_EXERCICES_COMPLETS, seedRPMSAICaches } from "@/lib/rpmsPreset";
import { isRPMSFormation, getRPMSAutoAnswers, getRPMSEvalBesoins, getRPMSBesoin, pickRPMSExerciceAnswer } from "@/lib/rpmsHumanized";
import { getEvalContent, getQuestionsOuvertes, generateStagiaireOpenAnswers } from "@/lib/evalContent";
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";
import { genExercicesStagiaire } from "@/lib/generatorsV2";
import { ORG_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const ANCIEN_RPMS = SAMPLE_FORMATIONS.find(f => f.intitule === "TP Responsable de Petite et Moyenne Structure")!;

/** Copie du parseur QCM de genExercicesStagiaire (format « 1) … A) …   B) … »). */
function parseQCM(consigne: string, reponseAttendue: string) {
  const blocks = consigne.split(/\n\s*\n/).map(b => b.trim()).filter(b => /^\d+\)/.test(b));
  const questions = blocks.map(b => {
    const m = b.match(/^(\d+)\)\s*([\s\S]*)/)!;
    const rest = m[2];
    const opts = [...rest.matchAll(/([A-D])\)\s*([^\n]*?)(?=\s{2,}[A-D]\)|$)/g)].map(x => x[2].trim());
    const enonce = rest.slice(0, rest.search(/[A-D]\)/)).trim();
    return { num: parseInt(m[1]), enonce, opts };
  });
  const correct: Record<number, string> = {};
  [...reponseAttendue.matchAll(/(\d+)\s*[-–]\s*([A-D])/g)].forEach(x => { correct[parseInt(x[1])] = x[2]; });
  return { questions, correct };
}

describe("TP RPMS RNCP38575 — formation exemple", () => {
  it("figure dans le sélecteur à côté de l'ancien exemple, inchangé", () => {
    expect(SAMPLE_FORMATIONS).toContain(FORMATION_RPMS);
    expect(ANCIEN_RPMS).toBeTruthy();
    expect(isRPMSFormation(ANCIEN_RPMS.intitule, ANCIEN_RPMS.codeRNCP)).toBe(false);
    expect(getEvalContent(ANCIEN_RPMS.intitule).exercices).toHaveLength(4);
    expect(isRPMSFormation(FORMATION_RPMS.intitule, FORMATION_RPMS.codeRNCP)).toBe(true);
    expect(FORMATION_RPMS.referentiel?.blocs.map(b => b.code)).toEqual(["RNCP38575BC01", "RNCP38575BC02", "RNCP38575BC03"]);
  });

  it("propose 10 mises en situation puis un QCM de 10 questions par compétence CP1 à CP9", () => {
    const ev = getEvalContent(FORMATION_RPMS.intitule);
    expect(ev.exercices).toHaveLength(19);
    expect(RPMS_QCM_COMPETENCES.map(q => q.titre.match(/CP\d/)![0])).toEqual(["CP1", "CP2", "CP3", "CP4", "CP5", "CP6", "CP7", "CP8", "CP9"]);
    for (const ex of RPMS_QCM_COMPETENCES) {
      const { questions, correct } = parseQCM(ex.consigne, ex.reponseAttendue);
      expect(questions, ex.titre).toHaveLength(10);
      questions.forEach(q => {
        expect(q.opts, `${ex.titre} Q${q.num}`).toHaveLength(4);
        expect(q.enonce.length, `${ex.titre} Q${q.num}`).toBeGreaterThan(10);
        expect(correct[q.num], `${ex.titre} Q${q.num}`).toMatch(/^[A-D]$/);
      });
      // Les bonnes réponses ne sont pas toutes à la même lettre
      expect(new Set(Object.values(correct)).size, ex.titre).toBeGreaterThanOrEqual(3);
    }
  });

  it("positionnement : 10 questions par test, réponses différentes d'un stagiaire à l'autre", () => {
    const qo = getQuestionsOuvertes(FORMATION_RPMS.intitule);
    expect(qo.debut).toHaveLength(10);
    expect(qo.fin).toHaveLength(10);
    const copies = STAGIAIRES_TEST.slice(0, 4).map((s, i) =>
      generateStagiaireOpenAnswers(qo.debut, i, true, s, FORMATION_RPMS).map(a => a.reponse).join("|"));
    expect(new Set(copies).size).toBe(copies.length);
    const fin = getRPMSAutoAnswers("MARTIN", "Sophie", "Mme", false);
    expect(fin.scores.every(sc => sc >= 0.5)).toBe(true);
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire", () => {
    const rep = STAGIAIRES_TEST.slice(0, 4).map((s, i) => getRPMSEvalBesoins(s, false, i));
    expect(new Set(rep.map(r => r.objectif)).size).toBe(rep.length);
    expect(new Set(rep.map(r => r.diplome)).size).toBe(rep.length);
    expect(rep.every(r => !/\{|\}/.test(Object.values(r).join(" ")))).toBe(true);
  });

  it("mises en situation : copie du stagiaire tirée de la banque de la compétence", () => {
    const s = STAGIAIRES_TEST[0];
    const cp7 = pickRPMSExerciceAnswer(FORMATION_RPMS.intitule, "RNCP38575", 8, 0, s, RPMS_EXERCICES_COMPLETS[7].titre);
    expect(cp7).toMatch(/FR|BFR|trésorerie|délai/);
    const autre = pickRPMSExerciceAnswer(FORMATION_RPMS.intitule, "RNCP38575", 8, 1, STAGIAIRES_TEST[1], RPMS_EXERCICES_COMPLETS[7].titre);
    expect(autre).not.toBe(cp7);
    expect(pickRPMSExerciceAnswer(ANCIEN_RPMS.intitule, ANCIEN_RPMS.codeRNCP, 0, 0, s, "CP1")).toBeNull();
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question, aucune copie d'exercice identique sur 8", () => {
    const noms = Array.from({ length: 12 }, (_, i) => ({ nom: `NOM${i}`, prenom: i % 2 ? "Julie" : "Karim", civilite: i % 2 ? "Mme" : "M." }));
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getRPMSAutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
    }
    RPMS_EXERCICES_COMPLETS.slice(0, 10).forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickRPMSExerciceAnswer(FORMATION_RPMS.intitule, "RNCP38575", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
    });
    const besoins = noms.map((s, i) => getRPMSEvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    // Le besoin principal de l'analyse des besoins correspond au profil de l'évaluation des besoins
    const b0 = getRPMSBesoin(noms[3].nom, noms[3].prenom, noms[3].civilite, 3);
    expect(b0.length).toBeGreaterThan(20);
  });

  it("le générateur d'exercices rend les QCM par compétence avec la réponse du stagiaire", () => {
    const f = { ...FORMATION_RPMS, formateur: "Formateur Test", dateDebut: "2025-09-01", dateFin: "2026-08-28" };
    seedRPMSAICaches(f);
    const stagiaires = STAGIAIRES_TEST.slice(0, 2).map(s => ({ ...s, dateDebutFormation: "", dateFinFormation: "" }));
    const html = Array.from({ length: 20 }, (_, i) => genExercicesStagiaire(ORG_TEST, f, stagiaires, 0, i)).join("\n");
    expect(html).toContain("QCM CP7");
    expect(html).toContain("Réponse du stagiaire");
    expect(html).toContain("Exercice 8 — CP7");
  });
});
