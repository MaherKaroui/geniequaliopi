import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_MSC70, MSC70_EXERCICES, MSC70_QCM_COMPETENCES, MSC70_QCM_COMPETENCES_EXPLICATIONS,
  MSC70_QCM_COMPETENCES_REPONSES, MSC70_QCM_DEBUT, MSC70_QCM_FIN, MSC70_POSITIONNEMENT_TITRE,
  MSC70_QCM_DEBUT_EXPLICATIONS, MSC70_CONTENT_PACK, MSC70_EVAL_PACK, MSC70_VEILLE_PACK, MSC70_VIDEOS,
  MSC70_EXERCICES_COMPLETS, seedMSC70AICaches,
} from "@/lib/machinerieScenique70hPreset";
import {
  isMSC70Formation, getMSC70AutoAnswers, getMSC70EvalBesoins, getMSC70Besoin, pickMSC70ExerciceAnswer,
  msc70NoteDebutSur20, msc70BonnesQcmDebut, msc70ReponsesQcmDebut, msc70NoteExercice, msc70Seed,
  MSC70_QUESTIONS_OUVERTES,
} from "@/lib/machinerieScenique70hHumanized";
import { isCOH21Formation } from "@/lib/cohesionEquipe21hHumanized";
import { isGSC35Formation } from "@/lib/gererCentre35hHumanized";
import { isIAP21Formation } from "@/lib/iaPro21hHumanized";
import { isMSP21Formation } from "@/lib/msp21Humanized";
import { isANG40Formation } from "@/lib/anglaisPro40hHumanized";
import { isARH41366Formation } from "@/lib/arh41366Humanized";
import { isLRBFormation } from "@/lib/robertRS7013Humanized";
import { isTVTEFormation } from "@/lib/ventesEnergie35hHumanized";
import { isWM14Formation } from "@/lib/webmarketing14hHumanized";
import { isRPMSFormation } from "@/lib/rpmsHumanized";
import { isDRI47Formation } from "@/lib/droitInstitutions47hHumanized";
import { isFPA45Formation } from "@/lib/fpa45hHumanized";

const lire = (p: string) => readFileSync(resolve(process.cwd(), p), "utf-8");

/**
 * Formation non certifiante : aucun code de répertoire, aucun certificateur, aucun jury, aucune
 * éligibilité au compte personnel de formation annoncée. « non certifiante » est autorisé.
 */
const INTERDITS = /RNCP|\bRS\s?\d{3,4}|\bCPF\b|France Compétences|\bjury|formation certifiante|titre professionnel|TOEIC/i;
const INTERDITS_SOURCES = new RegExp(`${INTERDITS.source}|certificateur`, "i");
/** La modalité n'est écrite dans aucun texte (seul le champ `modalites` la porte). */
const MODALITE = /pr[ée]sentiel|distanciel|[àa] distance|en ligne|visioconf/i;

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

const LETTRES = ["A", "B", "C", "D"];

const noms = Array.from({ length: 12 }, (_, i) => ({
  nom: `NOM${i}`, prenom: i % 2 ? "Julie" : "Karim", civilite: i % 2 ? "Mme" : "M.", entreprise: "",
}));

/** Mot attendu dans chacune des 8 copies de chaque mise en situation (C1 à C6). */
const MOTS_EXERCICES = [/prévention/, /contrepoids|pains/, /manœuvre|rideau de fer/i, /brin/, /rebut/, /phases/, /frein/i, /répartition|5\/8|règle du levier/, /table/, /registre/];

/** Autres détecteurs de formations exemples : aucun ne doit capter cet intitulé. */
const AUTRES = [isCOH21Formation, isGSC35Formation, isIAP21Formation, isMSP21Formation, isANG40Formation, isARH41366Formation, isLRBFormation, isTVTEFormation, isWM14Formation, isRPMSFormation, isDRI47Formation, isFPA45Formation];

describe("Machinerie scénique, moteurs et ponts – 70 h — formation exemple non certifiante", () => {
  it("données de la formation : 70 h, 10 jours de 7 h, 6 participants, modalité non écrite, prérequis plateau", () => {
    const f = FORMATION_MSC70;
    expect(f.intitule).toBe("Machinerie scénique, moteurs et ponts : équipements fixes et grils provisoires – 70 h");
    expect(f.codeRNCP).toBe("");
    expect(f.duree).toMatch(/^70 heures/);
    expect(f.duree).toMatch(/10 jours/);
    expect(f.duree).toMatch(/9h00 – 12h30/);
    expect(f.duree).toMatch(/13h30 – 17h00/);
    expect(f.dureeSaisiePrioritaire).toBe(true);
    expect(f.modalites).toBe("distanciel");
    expect(f.tarif).toBe("");
    expect(f.lieu).toBe("");
    expect(f.formateur).toBe("");
    expect(f.nombreParticipants).toBe("6");
    expect(f.prerequis).toMatch(/plateau/);
    expect(f.prerequis).toMatch(/travail en hauteur/);
    expect(f.publicVise).toMatch(/intermittents et permanents/);
    expect(f.publicVise).toMatch(/Afdas/);
    expect(f.delaiAcces.length).toBeGreaterThan(30);
    expect(f.objectifs).toMatch(/non certifiante/);
    for (const k of ["C1", "C2", "C3", "C4", "C5", "C6"]) expect(f.objectifs).toContain(k);
    for (let j = 1; j <= 10; j++) expect(f.programme).toContain(`JOUR ${j} —`);
    expect(f.methodesEvaluation).toMatch(/attestation de fin de formation/);
    expect(f.methodesEvaluation).toMatch(/certificat de réalisation/);
    expect(f.moyensPedagogiques).toMatch(/Théâtre des Quatre Vents/);
    // La modalité n'apparaît dans aucun texte
    for (const k of ["objectifs", "programme", "methodesEvaluation", "moyensPedagogiques", "publicVise", "delaiAcces", "prerequis"] as const) {
      expect(f[k], k).not.toMatch(MODALITE);
    }
    expect(f.tauxSatisfaction).toBeUndefined();
    expect(f.nombreAvisSatisfaction).toBeUndefined();
  });

  it("sélection par l'intitulé : variantes reconnues, aucune confusion avec une autre formation", () => {
    expect(isMSC70Formation(FORMATION_MSC70.intitule, FORMATION_MSC70.codeRNCP)).toBe(true);
    for (const v of [
      "Machinerie scénique", "MACHINERIE", "machinerie de scène – 35 h", "Grils provisoires", "Gril provisoire et accroche",
      "Moteurs et ponts", "moteurs à chaîne et ponts aluminium", "Machinerie scenique, moteurs et ponts",
    ]) expect(isMSC70Formation(v), v).toBe(true);
    for (const v of [
      "Projecteurs automatiques et pupitre grandMA – 70 h", "Cohésion d'équipe en entreprise – 21 h", "Gril de cuisson professionnelle",
      "Ponts thermiques en rénovation", "Moteurs électriques industriels", "Machine à commande numérique", "Travaux provisoires", "",
    ]) expect(isMSC70Formation(v), v).toBe(false);
    expect(isMSC70Formation(undefined)).toBe(false);
    for (const is of AUTRES) expect(is(FORMATION_MSC70.intitule, ""), is.name).toBe(false);
  });

  it("6 QCM de 10 questions (un par compétence) au format du générateur, avec bonne réponse et explication", () => {
    expect(MSC70_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    MSC70_QCM_COMPETENCES.forEach((ex, ci) => {
      const { questions, correct } = parseQCM(ex.consigne, ex.reponseAttendue);
      expect(questions, ex.titre).toHaveLength(10);
      expect(ex.points).toBe(10);
      questions.forEach((q, qi) => {
        expect(q.opts, `${ex.titre} Q${q.num}`).toHaveLength(4);
        expect(q.enonce.length, `${ex.titre} Q${q.num}`).toBeGreaterThan(10);
        expect(q.enonce, `${ex.titre} Q${q.num}`).not.toMatch(/[A-D]\)/);
        // La clé lue par le générateur (explications comprises) est exactement la bonne réponse
        expect(correct[q.num], `${ex.titre} Q${q.num}`).toBe(LETTRES[MSC70_QCM_COMPETENCES_REPONSES[ci][qi]]);
      });
      expect(Object.keys(correct)).toHaveLength(10);
      expect(new Set(Object.values(correct)).size, ex.titre).toBeGreaterThanOrEqual(3);
      expect(MSC70_QCM_COMPETENCES_EXPLICATIONS[ci]).toHaveLength(10);
      MSC70_QCM_COMPETENCES_EXPLICATIONS[ci].forEach(e => expect(e.length).toBeGreaterThan(40));
      expect(ex.reponseAttendue).toMatch(/Explications :/);
    });
    expect(MSC70_EXERCICES).toHaveLength(10);
    expect(MSC70_EXERCICES_COMPLETS).toHaveLength(16);
    MSC70_EXERCICES.forEach((ex, i) => {
      expect(ex.titre).toMatch(new RegExp(`^Exercice ${i + 1} — C[1-6]`));
      expect(ex.consigne).not.toMatch(/[A-D]\)/);
      expect(ex.reponseAttendue.length).toBeGreaterThan(300);
    });
  });

  it("positionnement de début (10 questions expliquées) et QCM de fin (10 questions)", () => {
    expect(MSC70_POSITIONNEMENT_TITRE).toBe("Positionnement — vos repères de départ");
    expect(MSC70_QCM_DEBUT).toHaveLength(10);
    expect(MSC70_QCM_DEBUT_EXPLICATIONS).toHaveLength(10);
    for (const q of MSC70_QCM_DEBUT) {
      expect(q.options).toHaveLength(3);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(3);
    }
    expect(new Set(MSC70_QCM_DEBUT.map(q => q.correctIndex)).size).toBe(3);
    expect(MSC70_QCM_FIN).toHaveLength(10);
    for (const q of MSC70_QCM_FIN) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
    expect(new Set(MSC70_QCM_FIN.map(q => q.correctIndex)).size).toBe(4);
    expect(MSC70_EVAL_PACK.qcmDebut).toBe(MSC70_QCM_DEBUT);
    expect(MSC70_EVAL_PACK.exerciceIntermediaire.questions).toHaveLength(4);
    expect(MSC70_EVAL_PACK.evaluationFinale.exercices).toHaveLength(5);
    expect(MSC70_VIDEOS).toEqual([]);
    expect(MSC70_CONTENT_PACK.besoins.besoinsList).toHaveLength(10);
    for (const k of ["reglementaire", "metier", "technologique"] as const) {
      expect(MSC70_VEILLE_PACK[k].length).toBeGreaterThanOrEqual(3);
      MSC70_VEILLE_PACK[k].forEach(r => {
        expect(r.lien).toMatch(/^https:\/\//);
        expect(r.exploitation).toMatch(/^Preuve : .+ Action : /);
      });
    }
    expect(() => seedMSC70AICaches()).not.toThrow();
  });

  it("exactitude des calculs des corrigés (élingage, contrepoids, répartition, table de charge)", () => {
    const brin = (charge: number, angleSommet: number) => (charge / 2) / Math.cos((angleSommet / 2) * Math.PI / 180);
    expect(Math.round(brin(400, 60))).toBe(231);
    expect(Math.round(brin(400, 90))).toBe(283);
    expect(Math.round(brin(400, 120))).toBe(400);
    expect(Math.round(brin(300, 90))).toBe(212);
    expect(Math.round(brin(100, 60))).toBe(58);
    expect(140 + 4 * 12).toBe(188);
    const total = 12 * 7 + 8 * 32 + 12 * 2;
    expect(total).toBe(364);
    expect(total * 3 / 16).toBeCloseTo(68.25);
    expect(total * 5 / 8).toBe(227.5);
    expect(120 * 8 / 12).toBe(80);
    expect(320 * 5 / 8).toBe(200);
    expect(Math.round((280 / 450 + 120 / 300) * 100) / 100).toBe(1.02);
    const ex = (n: number) => MSC70_EXERCICES[n].reponseAttendue;
    expect(ex(1)).toMatch(/188 kg/);
    expect(ex(1)).toMatch(/18 pains/);
    expect(ex(3)).toMatch(/231 kg/);
    expect(ex(3)).toMatch(/283 kg/);
    expect(ex(7)).toMatch(/364 kg/);
    expect(ex(7)).toMatch(/227,5 kg/);
    expect(ex(7)).toMatch(/262 kg/);
    expect(ex(8)).toMatch(/1,02/);
    expect(MSC70_QCM_FIN[3].options[MSC70_QCM_FIN[3].correctIndex]).toMatch(/283 kg/);
    expect(MSC70_QCM_FIN[6].options[MSC70_QCM_FIN[6].correctIndex]).toBe("200 kg");
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = MSC70_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = MSC70_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/prévention/i);
    expect(fin[1]).toMatch(/contrebalancée/i);
    expect(fin[2]).toMatch(/rideau de fer/i);
    expect(fin[3]).toMatch(/brins/i);
    expect(fin[4]).toMatch(/rebut/i);
    expect(fin[5]).toMatch(/contrôle avant usage/i);
    expect(fin[6]).toMatch(/diagnostiquez/i);
    expect(fin[7]).toMatch(/répartition/i);
    expect(fin[8]).toMatch(/table de charge/i);
    expect(fin[9]).toMatch(/incident|bloqué/i);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getMSC70AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.every(sc => sc <= 0.5))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getMSC70AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getMSC70AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(msc70Seed("MARTIN", "Sophie")).toBe(msc70Seed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque, accords corrects", () => {
    MSC70_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickMSC70ExerciceAnswer(FORMATION_MSC70.intitule, "", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/cintrieur|régisseure|machinistee/);
      });
      expect(pickMSC70ExerciceAnswer(FORMATION_MSC70.intitule, "", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const fem = noms.map((s, i) => pickMSC70ExerciceAnswer(FORMATION_MSC70.intitule, "", 1, i, { ...s, civilite: "Mme" }, MSC70_EXERCICES[1].titre)).join(" ");
    const masc = noms.map((s, i) => pickMSC70ExerciceAnswer(FORMATION_MSC70.intitule, "", 1, i, { ...s, civilite: "M." }, MSC70_EXERCICES[1].titre)).join(" ");
    expect(fem).toMatch(/cintrière/);
    expect(masc).toMatch(/cintrier/);
    const avecEnt = pickMSC70ExerciceAnswer(FORMATION_MSC70.intitule, "", 0, 0, { ...noms[0], entreprise: "SARL TEST" }, MSC70_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/SARL TEST/);
    expect(pickMSC70ExerciceAnswer("Cohésion d'équipe en entreprise – 21 h", "", 0, 0, noms[0], "C1")).toBeNull();
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, dix jours de 9h00 à 17h00", () => {
    const besoins = noms.map((s, i) => getMSC70EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /dix jours/.test(b.disponibilites))).toBe(true);
    expect(besoins.every(b => !MODALITE.test(b.disponibilites))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getMSC70Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getMSC70EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
    expect(getMSC70EvalBesoins(noms[0], false, 0).budget).toMatch(/Afdas/);
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => msc70NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    for (let i = 0; i < 100; i++) {
      const tot = getMSC70AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(5);
      const rep = msc70ReponsesQcmDebut(MSC70_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === MSC70_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(msc70BonnesQcmDebut(MSC70_QCM_DEBUT.length, i));
      expect(rep).toHaveLength(10);
      rep.forEach((r, qi) => { expect(r).toBeGreaterThanOrEqual(0); expect(r).toBeLessThan(MSC70_QCM_DEBUT[qi].options.length); });
      expect(bonnes).toBeGreaterThanOrEqual(2);
      expect(bonnes).toBeLessThanOrEqual(6);
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 5 }, (_, i) => msc70NoteExercice(i, ex, true))).size).toBe(5);
      expect(new Set(Array.from({ length: 6 }, (_, i) => msc70NoteExercice(i, ex, false))).size).toBe(6);
      expect(Math.max(...Array.from({ length: 12 }, (_, i) => msc70NoteExercice(i, ex, true)))).toBeLessThanOrEqual(10);
      expect(Math.min(...Array.from({ length: 12 }, (_, i) => msc70NoteExercice(i, ex, true)))).toBeGreaterThanOrEqual(6);
    }
  });

  it("formation non certifiante, modalité jamais écrite : sources et packs propres", () => {
    const sources = ["src/lib/machinerieScenique70hPreset.ts", "src/lib/machinerieScenique70hHumanized.ts"];
    for (const p of sources) expect(lire(p).replace(/codeRNCP/g, ""), p).not.toMatch(INTERDITS_SOURCES);
    expect(lire("src/lib/machinerieScenique70hHumanized.ts")).not.toMatch(/[A-D]\)/);
    const packs = JSON.stringify([MSC70_CONTENT_PACK, MSC70_EVAL_PACK, MSC70_VEILLE_PACK, MSC70_QUESTIONS_OUVERTES, FORMATION_MSC70])
      .replace(/codeRNCP/g, "").replace(/https?:\/\/[^"]+/g, "");
    expect(packs).not.toMatch(INTERDITS_SOURCES);
    expect(packs).not.toMatch(/certification/i);
    expect(packs).not.toMatch(/\d+\s?%/);
    expect(packs).not.toMatch(/taux de satisfaction/i);
    const textes = JSON.stringify([MSC70_CONTENT_PACK, MSC70_EVAL_PACK, MSC70_VEILLE_PACK, MSC70_QUESTIONS_OUVERTES]).replace(/https?:\/\/[^"]+/g, "");
    expect(textes).not.toMatch(MODALITE);
    // Fil rouge fictif, aucune autre salle réelle
    expect(packs).toMatch(/Théâtre des Quatre Vents/);
  });
});
