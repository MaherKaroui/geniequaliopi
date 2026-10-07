import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { FORMATION_WM14, WM14_EXERCICES, WM14_QCM_COMPETENCES, WM14_QCM_DEBUT } from "@/lib/webmarketing14hPreset";
import {
  isWM14Formation, getWM14AutoAnswers, getWM14EvalBesoins, getWM14Besoin, pickWM14ExerciceAnswer,
  wm14NoteDebutSur20, wm14BonnesQcmDebut, wm14ReponsesQcmDebut, wm14NoteExercice, wm14Seed,
  WM14_QUESTIONS_OUVERTES,
} from "@/lib/webmarketing14hHumanized";
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";

const ANCIEN_WM = SAMPLE_FORMATIONS.find(f => f.intitule === "Développer son activité avec le webmarketing")!;
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
const MOTS_EXERCICES = [/riorités/, /bjectifs/, /udget/, /RGAA|Accessibility Act/, /désinscription|DKIM/i, /égatifs/, /INP/, /etlinking/, /nfluence/, /ableau de bord/];

describe("Webmarketing 14 h — formation exemple non certifiante", () => {
  it("isWM14Formation : vrai pour l'intitulé 14 h, faux pour l'ancien exemple", () => {
    expect(isWM14Formation(FORMATION_WM14.intitule, FORMATION_WM14.codeRNCP)).toBe(true);
    expect(isWM14Formation("Développer son activité avec le webmarketing – 14 h")).toBe(true);
    expect(isWM14Formation("Webmarketing pour TPE 14h")).toBe(true);
    expect(ANCIEN_WM).toBeTruthy();
    expect(isWM14Formation(ANCIEN_WM.intitule, ANCIEN_WM.codeRNCP)).toBe(false);
    expect(isWM14Formation("Développer son activité avec le webmarketing")).toBe(false);
    expect(isWM14Formation("Excel – 14 h")).toBe(false);
    expect(isWM14Formation("Webmarketing 140 heures")).toBe(false);
    expect(isWM14Formation(undefined)).toBe(false);
  });

  it("6 QCM de 10 questions au format du générateur, sans « A) » dans les énoncés", () => {
    expect(WM14_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    for (const ex of WM14_QCM_COMPETENCES) {
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
    expect(WM14_EXERCICES).toHaveLength(10);
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = WM14_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    // Ordre : diagnostic, C1, C2, C3 plan, C3 emailing, C3 Google Ads, C4 audit, C4 éditorial, C5, C6
    const fin = WM14_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/diagnostic/i);
    expect(fin[1]).toMatch(/SMART/);
    expect(fin[4]).toMatch(/email/i);
    expect(fin[5]).toMatch(/Google Ads/);
    expect(fin[7]).toMatch(/netlinking/i);
    expect(fin[8]).toMatch(/influenceur/i);
    expect(fin[9]).toMatch(/tableau de bord/i);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getWM14AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    // Sans rang de session : l'empreinte du nom donne une copie stable
    const a = getWM14AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getWM14AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(wm14Seed("MARTIN", "Sophie")).toBe(wm14Seed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    WM14_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickWM14ExerciceAnswer(FORMATION_WM14.intitule, "", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      // Le titre seul suffit, même si le rang de l'exercice est décalé
      expect(pickWM14ExerciceAnswer(FORMATION_WM14.intitule, "", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickWM14ExerciceAnswer(FORMATION_WM14.intitule, "", 0, 0, { ...noms[0], entreprise: "SARL TEST" }, WM14_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/^J'ai rattaché l'exercice à la situation de SARL TEST\./);
    expect(pickWM14ExerciceAnswer(ANCIEN_WM.intitule, ANCIEN_WM.codeRNCP, 0, 0, noms[0], "C1")).toBeNull();
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, cohérentes avec le besoin principal", () => {
    const besoins = noms.map((s, i) => getWM14EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /deux jours|deux journées/.test(b.disponibilites))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getWM14Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getWM14EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => wm14NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    const ouv = Array.from({ length: 8 }, (_, i) =>
      getWM14AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0));
    expect(new Set(ouv).size).toBe(8);
    for (let i = 0; i < 100; i++) {
      const tot = getWM14AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      expect(wm14NoteDebutSur20(i)).toBeLessThanOrEqual(12);
      expect(wm14BonnesQcmDebut(10, i) * 2).toBeLessThanOrEqual(12);
      const rep = wm14ReponsesQcmDebut(WM14_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === WM14_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(wm14BonnesQcmDebut(WM14_QCM_DEBUT.length, i));
      expect(bonnes * 2).toBeLessThanOrEqual(12);
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 6 }, (_, i) => wm14NoteExercice(i, ex, true))).size).toBe(6);
      expect(new Set(Array.from({ length: 6 }, (_, i) => wm14NoteExercice(i, ex, false))).size).toBe(6);
    }
  });

  it("formation non certifiante : aucune mention de certification, jury ou CPF, ni « A) » dans les textes du moteur", () => {
    const preset = lire("src/lib/webmarketing14hPreset.ts");
    const moteur = lire("src/lib/webmarketing14hHumanized.ts");
    for (const src of [preset, moteur]) expect(src).not.toMatch(/certification|RS7076|jury|CPF/i);
    expect(moteur).not.toMatch(/[A-D]\)/);
    expect(moteur).not.toMatch(/Universal Analytics/);
    const textes = [
      ...WM14_QUESTIONS_OUVERTES.debut, ...WM14_QUESTIONS_OUVERTES.fin,
    ].map(q => q.question + " " + q.reponseAttendue).join(" ");
    expect(textes).not.toMatch(/[A-D]\)/);
  });
});

describe("Webmarketing 14 h — câblage", () => {
  it("le support de cours compte 8 chapitres et plus de 60 pages de texte", async () => {
    const { getCourseChapters } = await import("@/lib/courseContent");
    const chapitres = getCourseChapters(FORMATION_WM14.intitule);
    expect(chapitres).toHaveLength(8);
    const texte = chapitres.flatMap(c => c.sections.map(s => s.content.replace(/<[^>]+>/g, " "))).join(" ");
    // ≈ 3 000 caractères de texte par page A4
    expect(texte.length).toBeGreaterThan(60 * 3000);
    expect(texte).not.toMatch(/RS7076|France Compétences|\bjury\b|\bCPF\b/);
  });

  it("l'évaluation utilise les exercices et QCM du preset", async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_WM14.intitule);
    expect(ev.exercices[0].titre).toBe(WM14_EXERCICES[0].titre);
    expect(ev.qcmPositionnement).toEqual(WM14_QCM_DEBUT);
  });

  it("l'ancien exemple RS6702 garde son contenu", async () => {
    const { getCourseChapters } = await import("@/lib/courseContent");
    expect(getCourseChapters("Développer son activité avec le webmarketing")).not.toHaveLength(8);
  });
});
