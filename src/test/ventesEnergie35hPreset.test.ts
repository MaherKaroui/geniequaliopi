import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { FORMATION_TVTE, TVTE_EXERCICES, TVTE_QCM_COMPETENCES, TVTE_QCM_DEBUT, TVTE_QCM_FIN } from "@/lib/ventesEnergie35hPreset";
import {
  isTVTEFormation, getTVTEAutoAnswers, getTVTEEvalBesoins, getTVTEBesoin, pickTVTEExerciceAnswer,
  tvteNoteDebutSur20, tvteBonnesQcmDebut, tvteReponsesQcmDebut, tvteNoteExercice, tvteSeed,
  TVTE_QUESTIONS_OUVERTES,
} from "@/lib/ventesEnergie35hHumanized";
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";

const lire = (p: string) => readFileSync(resolve(process.cwd(), p), "utf-8");

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

const noms = Array.from({ length: 12 }, (_, i) => ({
  nom: `NOM${i}`, prenom: i % 2 ? "Julie" : "Karim", civilite: i % 2 ? "Mme" : "M.", entreprise: "",
}));

/** Mot attendu dans chacune des 8 copies de chaque mise en situation (diagnostic puis C1 à C6). */
const MOTS_EXERCICES = [/riorités/, /DPE/, /MaPrimeRénov'/, /SONCAS/, /tertiaire/, /reste à charge/i, /[Dd]evis/, /objection/i, /démarchage/, /rétractation/];

const INTERDITS_NON_CERTIFIANT = /certification|RNCP\d|\bRS\d{3,}|jury|\bCPF\b|France Compétences/i;

describe("Techniques de vente – travaux énergétiques 35 h — formation exemple non certifiante", () => {
  it("intitulé, durée, modalités, public et tarif conformes au BPF", () => {
    expect(FORMATION_TVTE.intitule).toBe("Techniques de vente dans le secteur des travaux énergétiques – 35 h");
    expect(FORMATION_TVTE.duree).toMatch(/^35 heures/);
    expect(FORMATION_TVTE.modalites).toBe("présentiel");
    expect(FORMATION_TVTE.lieu).toBe("");
    expect(FORMATION_TVTE.codeRNCP || "").toBe("");
    expect(FORMATION_TVTE.tarif).toBe("Sur devis");
    expect(FORMATION_TVTE.publicVise).toMatch(/OPCO/);
    expect(FORMATION_TVTE.publicVise).toMatch(/plan de développement des compétences/);
    expect(FORMATION_TVTE.methodesEvaluation).toMatch(/attestation de fin de formation/);
    const jours = (new Date(FORMATION_TVTE.dateFin).getTime() - new Date(FORMATION_TVTE.dateDebut).getTime()) / 86400000 + 1;
    expect(jours).toBe(5);
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_TVTE.intitule)).toHaveLength(1);
  });

  it("isTVTEFormation : vrai pour l'intitulé, faux pour les autres formations du catalogue", () => {
    expect(isTVTEFormation(FORMATION_TVTE.intitule, FORMATION_TVTE.codeRNCP)).toBe(true);
    expect(isTVTEFormation("Techniques de vente – travaux énergétiques")).toBe(true);
    expect(isTVTEFormation("TECHNIQUES DE VENTE EN RÉNOVATION ÉNERGÉTIQUE")).toBe(true);
    expect(isTVTEFormation("Techniques de vente")).toBe(false);
    expect(isTVTEFormation("Énergies renouvelables")).toBe(false);
    expect(isTVTEFormation(undefined)).toBe(false);
    const autres = SAMPLE_FORMATIONS.filter(f => f.intitule !== FORMATION_TVTE.intitule && isTVTEFormation(f.intitule, f.codeRNCP));
    expect(autres.map(f => f.intitule)).toEqual([]);
  });

  it("6 QCM de 10 questions au format du générateur, sans « A) » dans les énoncés", () => {
    expect(TVTE_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    for (const ex of TVTE_QCM_COMPETENCES) {
      const { questions, correct } = parseQCM(ex.consigne, ex.reponseAttendue);
      expect(questions, ex.titre).toHaveLength(10);
      questions.forEach(q => {
        expect(q.opts, `${ex.titre} Q${q.num}`).toHaveLength(4);
        expect(q.enonce.length, `${ex.titre} Q${q.num}`).toBeGreaterThan(10);
        expect(q.enonce, `${ex.titre} Q${q.num}`).not.toMatch(/[A-D]\)/);
        expect(correct[q.num], `${ex.titre} Q${q.num}`).toMatch(/^[A-D]$/);
      });
      expect(new Set(Object.values(correct)).size, ex.titre).toBeGreaterThanOrEqual(3);
    }
    expect(TVTE_EXERCICES).toHaveLength(10);
    for (const qcm of [TVTE_QCM_DEBUT, TVTE_QCM_FIN]) {
      expect(qcm).toHaveLength(10);
      qcm.forEach(q => {
        expect(q.options).toHaveLength(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
      });
    }
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = TVTE_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    // Ordre : diagnostic, C1 cadre, C1 aides, C2 B2C, C2 B2B, C3 argumentaire, C3 devis, C4, C5, C6
    const fin = TVTE_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/diagnostic/i);
    expect(fin[1]).toMatch(/DPE/);
    expect(fin[2]).toMatch(/aides/i);
    expect(fin[3]).toMatch(/découverte/i);
    expect(fin[4]).toMatch(/tertiaire/i);
    expect(fin[5]).toMatch(/reste à charge/i);
    expect(fin[6]).toMatch(/devis/i);
    expect(fin[7]).toMatch(/objections/i);
    expect(fin[8]).toMatch(/prospection/i);
    expect(fin[9]).toMatch(/concluez/i);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getTVTEAutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getTVTEAutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getTVTEAutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(tvteSeed("MARTIN", "Sophie")).toBe(tvteSeed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    TVTE_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickTVTEExerciceAnswer(FORMATION_TVTE.intitule, "", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickTVTEExerciceAnswer(FORMATION_TVTE.intitule, "", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickTVTEExerciceAnswer(FORMATION_TVTE.intitule, "", 0, 0, { ...noms[0], entreprise: "SARL TEST" }, TVTE_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/^J'ai rattaché l'exercice à la situation de SARL TEST\./);
    expect(pickTVTEExerciceAnswer("Développer son activité avec le webmarketing – 14 h", "", 0, 0, noms[0], "C1")).toBeNull();
    // Accords : une stagiaire n'est jamais « conseiller » ni « vendeur »
    const fem = Array.from({ length: 8 }, (_, i) => pickTVTEExerciceAnswer(FORMATION_TVTE.intitule, "", 0, i, { nom: "X" + i, prenom: "Julie", civilite: "Mme" }, TVTE_EXERCICES[0].titre)).join(" ");
    expect(fem).not.toMatch(/\bconseiller\b|\bVendeur\b|commercial dans/);
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, salariés financés par l'employeur", () => {
    const besoins = noms.map((s, i) => getTVTEEvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /cinq jours|cinq journées/.test(b.disponibilites))).toBe(true);
    expect(besoins.every(b => /plan de développement des compétences/.test(b.budget))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getTVTEBesoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getTVTEEvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => tvteNoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    const ouv = Array.from({ length: 8 }, (_, i) =>
      getTVTEAutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0));
    expect(new Set(ouv).size).toBe(8);
    for (let i = 0; i < 100; i++) {
      const tot = getTVTEAutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      expect(tvteNoteDebutSur20(i)).toBeLessThanOrEqual(12);
      expect(tvteBonnesQcmDebut(10, i) * 2).toBeLessThanOrEqual(12);
      const rep = tvteReponsesQcmDebut(TVTE_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === TVTE_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(tvteBonnesQcmDebut(TVTE_QCM_DEBUT.length, i));
      expect(bonnes * 2).toBeLessThanOrEqual(12);
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 6 }, (_, i) => tvteNoteExercice(i, ex, true))).size).toBe(6);
      expect(new Set(Array.from({ length: 6 }, (_, i) => tvteNoteExercice(i, ex, false))).size).toBe(6);
    }
  });

  it("formation non certifiante : aucune mention de certification, RNCP, RS, jury, CPF ou France Compétences", () => {
    const preset = lire("src/lib/ventesEnergie35hPreset.ts");
    const moteur = lire("src/lib/ventesEnergie35hHumanized.ts");
    for (const src of [preset, moteur]) expect(src).not.toMatch(INTERDITS_NON_CERTIFIANT);
    expect(moteur).not.toMatch(/[A-D]\)/);
    const textes = [
      ...TVTE_QUESTIONS_OUVERTES.debut, ...TVTE_QUESTIONS_OUVERTES.fin,
    ].map(q => q.question + " " + q.reponseAttendue).join(" ");
    expect(textes).not.toMatch(/[A-D]\)/);
  });
});

describe("Techniques de vente – travaux énergétiques 35 h — câblage", () => {
  it("l'évaluation utilise les exercices et QCM du preset", async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_TVTE.intitule);
    expect(ev.exercices[0].titre).toBe(TVTE_EXERCICES[0].titre);
    expect(ev.qcmPositionnement).toEqual(TVTE_QCM_DEBUT);
    expect(ev.qcmFinal).toEqual(TVTE_QCM_FIN);
  });

  it("les autres formations commerciales gardent leur contenu", async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    expect(getEvalContent("Développer son activité avec le webmarketing – 14 h").qcmPositionnement).not.toEqual(TVTE_QCM_DEBUT);
    expect(getEvalContent("TP Négociateur technico-commercial").qcmPositionnement).not.toEqual(TVTE_QCM_DEBUT);
  });

  // Le support de cours (ventesEnergie35h/partie1..4) est rédigé à part : ce test ne passe que
  // lorsque les quatre parties existent.
  it("le support de cours couvre C1 à C6 et compte plus de 60 pages de texte", async () => {
    const { getCourseChapters } = await import("@/lib/courseContent");
    const { getVentesEnergie35hChapters } = await import("@/lib/courseContentVentesEnergie35h");
    const chapitres = getCourseChapters(FORMATION_TVTE.intitule);
    expect(chapitres).toEqual(getVentesEnergie35hChapters());
    expect(chapitres.length).toBeGreaterThanOrEqual(6);
    const texte = chapitres.flatMap(c => c.sections.map(s => s.content.replace(/<[^>]+>/g, " "))).join(" ");
    for (const c of ["C1", "C2", "C3", "C4", "C5", "C6"]) expect(texte).toContain(c);
    // ≈ 3 000 caractères de texte par page A4
    expect(texte.length).toBeGreaterThan(60 * 3000);
    expect(texte).not.toMatch(/France Compétences|\bjury\b|\bCPF\b|RNCP\d/);
    expect(texte).toMatch(/Thermia Rénov/);
  });
});
