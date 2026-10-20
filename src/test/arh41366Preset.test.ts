import { describe, it, expect } from "vitest";
import {
  FORMATION_ARH41366, ARH41366_EXERCICES, ARH41366_QCM_COMPETENCES, ARH41366_QCM_DEBUT, ARH41366_QCM_FIN,
  ARH41366_CONTENT_PACK, ARH41366_EVAL_PACK, ARH41366_VEILLE_PACK, ARH41366_EXERCICES_COMPLETS,
  getARH41366ExerciceCFA,
} from "@/lib/arh41366Preset";
import {
  isARH41366Formation, getARH41366AutoAnswers, getARH41366EvalBesoins, getARH41366Besoin, pickARH41366ExerciceAnswer,
  arh41366NoteDebutSur20, arh41366BonnesQcmDebut, arh41366ReponsesQcmDebut, arh41366NoteExercice, arh41366Seed,
  arh41366MissionEntreprise, ARH41366_QUESTIONS_OUVERTES,
} from "@/lib/arh41366Humanized";
import { isARHFormation, isAncienExempleARH } from "@/lib/arhExercises";
import { RNCP_FICHES } from "@/lib/rncpData";
import { SAMPLE_FORMATIONS, FORMATION_ARH } from "@/lib/sampleData";

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
  nom: `NOM${i}`, prenom: i % 2 ? "Laura" : "Karim", civilite: i % 2 ? "Mme" : "M.", entreprise: "",
}));

const CP = ["CP1", "CP2", "CP3", "CP4", "CP5", "CP6"];

describe("TP ARH RNCP41366 — formation exemple par apprentissage", () => {
  it("intitulé, code, durée, dates, modalités et tarif conformes au brief", () => {
    expect(FORMATION_ARH41366.intitule).toBe("Titre Professionnel Assistant Ressources Humaines (TP ARH) – RNCP41366");
    expect(FORMATION_ARH41366.codeRNCP).toBe("RNCP41366");
    expect(FORMATION_ARH41366.duree).toBe("420 heures");
    expect(FORMATION_ARH41366.dateDebut).toBe("2026-11-02");
    expect(FORMATION_ARH41366.dateFin).toBe("2027-10-29");
    expect(FORMATION_ARH41366.modalites).toBe("distanciel");
    expect(FORMATION_ARH41366.lieu).toBe("Google Meet / Zoom");
    expect(FORMATION_ARH41366.formateur).toBe("");
    expect(FORMATION_ARH41366.rythmeAlternance).toMatch(/1 semaine au CFA \/ 3 semaines en entreprise/);
    expect(FORMATION_ARH41366.tarif.replace("RNCP41366", "")).not.toMatch(/€|\beuros?\b|\d/);
    expect(FORMATION_ARH41366.tarif).toMatch(/OPCO/);
    for (const c of CP) expect(FORMATION_ARH41366.objectifs).toContain(c);
    // Volumes du programme : 14 + 98 + 56 + 56 + 49 + 63 + 49 + 35 = 420 h
    const volumes = [...FORMATION_ARH41366.programme.matchAll(/^(?:MODULE 0|CP\d|PRÉPARATION AU TITRE)[^\n]*\((\d+) h\)$/gm)].map(m => +m[1]);
    expect(volumes).toEqual([14, 98, 56, 56, 49, 63, 49, 35]);
    expect(volumes.reduce((a, b) => a + b, 0)).toBe(420);
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_ARH41366.intitule)).toHaveLength(1);
    const tout = JSON.stringify([FORMATION_ARH41366, ARH41366_CONTENT_PACK, ARH41366_EVAL_PACK, ARH41366_VEILLE_PACK]);
    expect(tout).not.toMatch(/INTERNATIONAL LEARNING|ILBS|tous les 2 ans|tous les 6 ans|Pro-A,/);
  });

  it("détection par « 41366 », l'ancien exemple ARH RNCP35030 n'est pas capté (ni ne capte la nouvelle formation)", () => {
    expect(isARH41366Formation(FORMATION_ARH41366.intitule, FORMATION_ARH41366.codeRNCP)).toBe(true);
    expect(isARH41366Formation("Autre intitulé", "RNCP41366")).toBe(true);
    expect(isARH41366Formation(FORMATION_ARH.intitule, FORMATION_ARH.codeRNCP)).toBe(false);
    expect(isARH41366Formation(undefined)).toBe(false);
    // documentGenerator (ARH_MODULE_EXERCISES) et FormationForm (organisme + 6 stagiaires) : ancien exemple seulement
    expect(isARHFormation(FORMATION_ARH41366.intitule)).toBe(false);
    expect(isARHFormation(FORMATION_ARH.intitule)).toBe(true);
    expect(isAncienExempleARH(FORMATION_ARH41366.intitule, FORMATION_ARH41366.codeRNCP)).toBe(false);
    expect(isAncienExempleARH(FORMATION_ARH.intitule, FORMATION_ARH.codeRNCP)).toBe(true);
    const autres = SAMPLE_FORMATIONS.filter(f => f.intitule !== FORMATION_ARH41366.intitule && isARH41366Formation(f.intitule, f.codeRNCP));
    expect(autres).toEqual([]);
  });

  it("6 QCM de 10 questions au format du générateur, 10 mises en situation sur 20", () => {
    expect(ARH41366_QCM_COMPETENCES.map(q => q.titre.match(/CP\d/)![0])).toEqual(CP);
    for (const ex of ARH41366_QCM_COMPETENCES) {
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
    expect(ARH41366_EXERCICES).toHaveLength(10);
    expect(ARH41366_EXERCICES_COMPLETS).toHaveLength(16);
    ARH41366_EXERCICES.forEach((ex, i) => {
      expect(ex.titre).toMatch(new RegExp(`^Exercice ${i + 1} — `));
      expect(ex.points).toBe(20);
      expect(ex.reponseAttendue).toMatch(/Barème/);
    });
    for (const qcm of [ARH41366_QCM_DEBUT, ARH41366_QCM_FIN]) {
      expect(qcm).toHaveLength(10);
      qcm.forEach(q => {
        expect(q.options).toHaveLength(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
        expect(q.question).not.toMatch(/[A-D]\)/);
      });
    }
    expect(ARH41366_EVAL_PACK.exerciceIntermediaire.questions).toHaveLength(4);
    expect(ARH41366_EVAL_PACK.evaluationFinale.exercices).toHaveLength(6);
    for (const k of ["reglementaire", "metier", "technologique"] as const) {
      ARH41366_VEILLE_PACK[k].forEach(r => expect(r.lien).toMatch(/^https:\/\//));
    }
    expect(JSON.stringify(ARH41366_CONTENT_PACK.ressources)).toContain("https://www.francecompetences.fr/recherche/rncp/41366/");
  });

  it("fiche RNCP41366 : 2 blocs, CP1 à CP6, matières totalisant 420 h", () => {
    const fiche = RNCP_FICHES.find(f => f.code === "RNCP41366")!;
    expect(fiche).toBeTruthy();
    expect(fiche.blocsCompetences).toHaveLength(2);
    expect(fiche.blocsCompetences.flatMap(b => b.competences).map(c => c.slice(0, 3))).toEqual(CP);
    const total = fiche.blocsCompetences.flatMap(b => b.matieres).reduce((a, m) => a + parseInt(m.volume), 0);
    expect(total).toBe(420);
    // Chaque matière alimente des exercices CFA propres au titre
    for (const m of fiche.blocsCompetences.flatMap(b => b.matieres)) {
      const ex = getARH41366ExerciceCFA(m.competence, 0, 0, noms[0]);
      expect(ex, m.competence).not.toBeNull();
      expect(ex!.note).toBeGreaterThanOrEqual(2.5);
    }
    for (const c of fiche.blocsCompetences.flatMap(b => b.competences)) expect(arh41366MissionEntreprise(c), c).not.toBeNull();
    expect(RNCP_FICHES.filter(f => f.code === "RNCP41366")).toHaveLength(1);
  });

  it("moteur humanisé : 12 apprentis, 12 réponses différentes à chaque question", () => {
    for (const k of ["debut", "fin"] as const) expect(ARH41366_QUESTIONS_OUVERTES[k]).toHaveLength(10);
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getARH41366AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (!debut) expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    // Début : 8 notes différentes, toujours au plus 6 / 10
    const tot = (i: number) => getARH41366AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
    expect(new Set(Array.from({ length: 8 }, (_, i) => tot(i))).size).toBe(8);
    for (let i = 0; i < 24; i++) expect(tot(i)).toBeLessThanOrEqual(6);
    expect(arh41366Seed("ROUSSEL", "Nathalie")).toBe(arh41366Seed("roussel", "NATHALIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, sans marqueur d'accord", () => {
    ARH41366_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickARH41366ExerciceAnswer(FORMATION_ARH41366.intitule, "RNCP41366", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach(p => expect(p!).not.toMatch(/\{|\}/));
    });
    expect(pickARH41366ExerciceAnswer(FORMATION_ARH.intitule, FORMATION_ARH.codeRNCP, 0, 0, noms[0], "CP1")).toBeNull();
  });

  it("besoins, positionnement et notes propres à chaque apprenti", () => {
    const besoins = noms.map((s, i) => getARH41366EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => !/€/.test(b.budget) && /OPCO/.test(b.budget))).toBe(true);
    const principaux = noms.map((s, i) => getARH41366Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(principaux).size).toBe(12);
    const notes = Array.from({ length: 8 }, (_, i) => arh41366NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    for (let i = 0; i < 50; i++) {
      expect(arh41366NoteDebutSur20(i)).toBeLessThanOrEqual(12);
      const rep = arh41366ReponsesQcmDebut(ARH41366_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === ARH41366_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(arh41366BonnesQcmDebut(ARH41366_QCM_DEBUT.length, i));
    }
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 6 }, (_, i) => arh41366NoteExercice(i, ex, true))).size).toBe(6);
      expect(new Set(Array.from({ length: 6 }, (_, i) => arh41366NoteExercice(i, ex, false))).size).toBe(6);
    }
    const qcmNotes = Array.from({ length: 6 }, (_, i) => arh41366NoteExercice(i, 3, true));
    expect(Math.min(...qcmNotes)).toBeGreaterThanOrEqual(5);
  });
});

describe("TP ARH RNCP41366 — câblage", () => {
  it("getContentKey route vers ARH41366, pas vers l'ancien contenu", async () => {
    const { getEvalContent, getQuestionsOuvertes, generateStagiaireOpenAnswers } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_ARH41366.intitule);
    expect(ev.exercices[0].titre).toBe(ARH41366_EXERCICES[0].titre);
    expect(ev.exercices).toHaveLength(16);
    expect(ev.qcmPositionnement).toEqual(ARH41366_QCM_DEBUT);
    expect(ev.qcmFinal).toEqual(ARH41366_QCM_FIN);
    expect(getEvalContent(FORMATION_ARH.intitule).qcmPositionnement).not.toEqual(ARH41366_QCM_DEBUT);
    const qo = getQuestionsOuvertes(FORMATION_ARH41366.intitule);
    expect(qo.debut).toEqual(ARH41366_QUESTIONS_OUVERTES.debut);
    const copies = noms.slice(0, 4).map((s, i) =>
      generateStagiaireOpenAnswers(qo.debut, i, true, s, FORMATION_ARH41366).map(a => a.reponse).join("|"));
    expect(new Set(copies).size).toBe(4);
  });

  it("support de cours et vidéos propres au titre, avant les règles RH / paie génériques", async () => {
    const { getCourseChapters, getYoutubeVideos } = await import("@/lib/courseContent");
    const { getARH41366Chapters } = await import("@/lib/courseContentARH41366");
    expect(getCourseChapters(FORMATION_ARH41366.intitule)).toEqual(getARH41366Chapters());
    expect(getYoutubeVideos(FORMATION_ARH41366.intitule)[0].title).toMatch(/assistant ressources humaines/i);
  });
});
