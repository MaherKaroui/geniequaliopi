import { describe, it, expect } from "vitest";
import {
  FORMATION_MSP21, MSP21_EXERCICES, MSP21_QCM_COMPETENCES, MSP21_QCM_DEBUT, MSP21_QCM_FIN,
  MSP21_CONTENT_PACK, MSP21_EVAL_PACK, MSP21_VEILLE_PACK, MSP21_EXERCICES_COMPLETS,
} from "@/lib/msp21Preset";
import {
  isMSP21Formation, getMSP21AutoAnswers, getMSP21EvalBesoins, getMSP21Besoin, pickMSP21ExerciceAnswer,
  msp21NoteDebutSur20, msp21BonnesQcmDebut, msp21ReponsesQcmDebut, msp21NoteExercice, msp21Seed,
  MSP21_QUESTIONS_OUVERTES,
} from "@/lib/msp21Humanized";
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";

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

const COMPETENCES = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11"];

describe("Techniques de maquillage semi-permanent (RS6459) – 21 h — formation exemple certifiante", () => {
  it("intitulé, code RS, durée, modalités et tarif conformes au BPF 2025 et aux sessions réelles", () => {
    expect(FORMATION_MSP21.intitule).toBe("Techniques de maquillage semi-permanent (RS6459) – 21 h");
    expect(FORMATION_MSP21.codeRNCP).toBe("RS6459");
    expect(FORMATION_MSP21.duree).toBe("21 heures (3 jours de 7 h)");
    expect(FORMATION_MSP21.modalites).toBe("présentiel");
    expect(FORMATION_MSP21.tarif).toBe("2 097 € par stagiaire");
    expect(FORMATION_MSP21.dateDebut).toBe("2025-03-19");
    expect(FORMATION_MSP21.dateFin).toBe("2025-03-21");
    for (const j of ["JOUR 1", "JOUR 2", "JOUR 3"]) expect(FORMATION_MSP21.programme).toContain(j);
    expect(FORMATION_MSP21.programme).not.toContain("JOUR 4");
    for (const c of COMPETENCES) expect(FORMATION_MSP21.objectifs).toContain(c);
    expect(FORMATION_MSP21.prerequis).toMatch(/hygiène et (de )?salubrité/);
    expect(FORMATION_MSP21.methodesEvaluation).toMatch(/jury/);
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_MSP21.intitule)).toHaveLength(1);
    const tout = JSON.stringify([FORMATION_MSP21, MSP21_CONTENT_PACK, MSP21_EVAL_PACK, MSP21_VEILLE_PACK]);
    expect(tout).not.toMatch(/\b56 ?h\b|8 jours|1 863/);
  });

  it("isMSP21Formation : vrai pour RS6459, faux pour les autres formations beauté", () => {
    expect(isMSP21Formation(FORMATION_MSP21.intitule, FORMATION_MSP21.codeRNCP)).toBe(true);
    expect(isMSP21Formation("Formation en Maquillage Semi-Permanent - (RS6459)")).toBe(true);
    expect(isMSP21Formation("Autre intitulé", "RS6459")).toBe(true);
    expect(isMSP21Formation("Maquilleur professionnel")).toBe(false);
    expect(isMSP21Formation("Techniques de prothésie ongulaire (RS7302)")).toBe(false);
    expect(isMSP21Formation("Pose de vernis semi-permanent")).toBe(false);
    expect(isMSP21Formation(undefined)).toBe(false);
    const autres = SAMPLE_FORMATIONS.filter(f => f.intitule !== FORMATION_MSP21.intitule && isMSP21Formation(f.intitule, f.codeRNCP));
    expect(autres.map(f => f.intitule)).toEqual([]);
  });

  it("11 QCM de 10 questions au format du générateur, 10 mises en situation sur 20", () => {
    expect(MSP21_QCM_COMPETENCES.map(q => q.titre.match(/C\d+/)![0])).toEqual(COMPETENCES);
    for (const ex of MSP21_QCM_COMPETENCES) {
      const { questions, correct } = parseQCM(ex.consigne, ex.reponseAttendue);
      expect(questions, ex.titre).toHaveLength(10);
      questions.forEach(q => {
        expect(q.opts, `${ex.titre} Q${q.num}`).toHaveLength(4);
        expect(q.enonce, `${ex.titre} Q${q.num}`).not.toMatch(/[A-D]\)/);
        expect(correct[q.num], `${ex.titre} Q${q.num}`).toMatch(/^[A-D]$/);
      });
      expect(new Set(Object.values(correct)).size, ex.titre).toBeGreaterThanOrEqual(3);
    }
    expect(MSP21_EXERCICES).toHaveLength(10);
    expect(MSP21_EXERCICES_COMPLETS).toHaveLength(21);
    MSP21_EXERCICES.forEach((ex, i) => {
      expect(ex.titre).toMatch(new RegExp(`^Exercice ${i + 1} — `));
      expect(ex.points).toBe(20);
      expect(ex.reponseAttendue).toMatch(/Barème/);
    });
    for (const qcm of [MSP21_QCM_DEBUT, MSP21_QCM_FIN]) {
      expect(qcm).toHaveLength(10);
      qcm.forEach(q => expect(q.options).toHaveLength(4));
    }
    expect(MSP21_EVAL_PACK.exerciceIntermediaire.titre).toMatch(/jour 2/);
    expect(MSP21_EVAL_PACK.exerciceIntermediaire.questions).toHaveLength(4);
    for (const k of ["reglementaire", "metier", "technologique"] as const) {
      MSP21_VEILLE_PACK[k].forEach(r => expect(r.lien).toMatch(/^https:\/\//));
    }
  });

  it("moteur humanisé : 12 stagiaires, 12 réponses différentes à chaque question", () => {
    for (const k of ["debut", "fin"] as const) expect(MSP21_QUESTIONS_OUVERTES[k]).toHaveLength(10);
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getMSP21AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
    }
    expect(msp21Seed("VIDAL", "Laura")).toBe(msp21Seed("vidal", "LAURA"));
  });

  it("mises en situation : 8 copies différentes par exercice", () => {
    MSP21_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickMSP21ExerciceAnswer(FORMATION_MSP21.intitule, "RS6459", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach(p => expect(p!).not.toMatch(/\{|\}/));
    });
    expect(pickMSP21ExerciceAnswer("Maquilleur professionnel", "", 0, 0, noms[0], "C1")).toBeNull();
  });

  it("besoins, positionnement et notes propres à chaque stagiaire", () => {
    const besoins = noms.map((s, i) => getMSP21EvalBesoins(s, false, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    const principaux = noms.map((s, i) => getMSP21Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(principaux).size).toBe(12);
    for (let i = 0; i < 50; i++) {
      expect(msp21NoteDebutSur20(i)).toBeLessThanOrEqual(12);
      const rep = msp21ReponsesQcmDebut(MSP21_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === MSP21_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(msp21BonnesQcmDebut(MSP21_QCM_DEBUT.length, i));
    }
    for (let ex = 0; ex < 21; ex++) {
      expect(new Set(Array.from({ length: 6 }, (_, i) => msp21NoteExercice(i, ex, true))).size).toBe(6);
    }
  });
});

describe("Maquillage semi-permanent RS6459 – 21 h — câblage", () => {
  it("l'évaluation utilise les exercices et QCM du preset", async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_MSP21.intitule);
    expect(ev.exercices[0].titre).toBe(MSP21_EXERCICES[0].titre);
    expect(ev.qcmPositionnement).toEqual(MSP21_QCM_DEBUT);
    expect(ev.qcmFinal).toEqual(MSP21_QCM_FIN);
    expect(getEvalContent("Maquilleur professionnel").qcmPositionnement).not.toEqual(MSP21_QCM_DEBUT);
  });

  it("le support de cours couvre C1 à C11 et dépasse 60 pages", async () => {
    const { getCourseChapters } = await import("@/lib/courseContent");
    const { getMSP21Chapters } = await import("@/lib/courseContentMSP21");
    const chapitres = getCourseChapters(FORMATION_MSP21.intitule);
    expect(chapitres).toEqual(getMSP21Chapters());
    expect(chapitres.length).toBe(13);
    const html = chapitres.flatMap(c => c.sections.map(s => s.content)).join(" ");
    expect(html.length).toBeGreaterThan(500000);
    const texte = html.replace(/<[^>]+>/g, " ");
    for (const c of COMPETENCES) expect(texte).toContain(c);
    expect(texte.length).toBeGreaterThan(60 * 3000);
    expect(texte).toMatch(/Ligne & Teint|Ligne &amp; Teint/);
    expect(texte).not.toMatch(/\b56 ?h\b|8 jours/);
    expect(texte).not.toMatch(/BROWS STREET|DAMOTTE/i);
  });
});
