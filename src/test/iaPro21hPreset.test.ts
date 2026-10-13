import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_IAP21, IAP21_EXERCICES, IAP21_QCM_COMPETENCES, IAP21_QCM_DEBUT, IAP21_QCM_FIN,
  IAP21_CONTENT_PACK, IAP21_EVAL_PACK, IAP21_VEILLE_PACK, IAP21_EXERCICES_COMPLETS,
} from "@/lib/iaPro21hPreset";
import {
  isIAP21Formation, getIAP21AutoAnswers, getIAP21EvalBesoins, getIAP21Besoin, pickIAP21ExerciceAnswer,
  iap21NoteDebutSur20, iap21BonnesQcmDebut, iap21ReponsesQcmDebut, iap21NoteExercice, iap21Seed,
  IAP21_QUESTIONS_OUVERTES,
} from "@/lib/iaPro21hHumanized";
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

/** Mot attendu dans chacune des 8 copies de chaque mise en situation (diagnostic puis C1 à C5). */
const MOTS_EXERCICES = [/riorités/, /hallucination/i, /outil/i, /contexte/i, /itér/i, /relecture/i, /vérifi/i, /Copilot/, /automatis/i, /RGPD/];

const INTERDITS_NON_CERTIFIANT = /certification|RNCP\d|\bRS\d{3,}|jury|\bCPF\b|France Compétences/i;

const INTITULE_RS_IA_GENERATIVE = "Création de contenus rédactionnels et visuels par l'usage responsable de l'intelligence artificielle générative";
const INTITULE_TVTE = "Techniques de vente dans le secteur des travaux énergétiques – 35 h";

describe("Intelligence artificielle – 21 h — formation exemple non certifiante", () => {
  it("intitulé, durée, modalités, public et tarif conformes à la fiche", () => {
    expect(FORMATION_IAP21.intitule).toBe("Intelligence artificielle : intégrer les outils d'IA dans son activité professionnelle – 21 h");
    expect(FORMATION_IAP21.duree).toBe("21 heures (3 jours de 7 h)");
    expect(FORMATION_IAP21.modalites).toBe("présentiel");
    expect(FORMATION_IAP21.lieu).toBe("");
    expect(FORMATION_IAP21.codeRNCP || "").toBe("");
    expect(FORMATION_IAP21.tarif).toBe("455 € HT par stagiaire");
    expect(FORMATION_IAP21.publicVise).toMatch(/OPCO/);
    expect(FORMATION_IAP21.publicVise).toMatch(/plan de développement des compétences/);
    expect(FORMATION_IAP21.methodesEvaluation).toMatch(/attestation de fin de formation/);
    expect(FORMATION_IAP21.dateDebut).toBe("2026-09-28");
    const jours = (new Date(FORMATION_IAP21.dateFin).getTime() - new Date(FORMATION_IAP21.dateDebut).getTime()) / 86400000 + 1;
    expect(jours).toBe(3);
    for (const j of ["JOUR 1", "JOUR 2", "JOUR 3"]) expect(FORMATION_IAP21.programme).toContain(j);
    for (const c of ["C1", "C2", "C3", "C4", "C5"]) expect(FORMATION_IAP21.objectifs).toContain(c);
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_IAP21.intitule)).toHaveLength(1);
  });

  it("isIAP21Formation : vrai pour l'intitulé, faux pour les autres formations du catalogue", () => {
    expect(isIAP21Formation(FORMATION_IAP21.intitule, FORMATION_IAP21.codeRNCP)).toBe(true);
    expect(isIAP21Formation("INTÉGRER LES OUTILS D’IA DANS SON ACTIVITÉ")).toBe(true);
    expect(isIAP21Formation("Intelligence artificielle – 21h")).toBe(true);
    expect(isIAP21Formation(INTITULE_RS_IA_GENERATIVE)).toBe(false);
    expect(isIAP21Formation(INTITULE_TVTE)).toBe(false);
    expect(isIAP21Formation("Intelligence artificielle générative – 28 h")).toBe(false);
    expect(isIAP21Formation("Intelligence artificielle – 210 h")).toBe(false);
    expect(isIAP21Formation(undefined)).toBe(false);
    const autres = SAMPLE_FORMATIONS.filter(f => f.intitule !== FORMATION_IAP21.intitule && isIAP21Formation(f.intitule, f.codeRNCP));
    expect(autres.map(f => f.intitule)).toEqual([]);
  });

  it("5 QCM de 10 questions au format du générateur, sans « A) » dans les énoncés", () => {
    expect(IAP21_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5"]);
    for (const ex of IAP21_QCM_COMPETENCES) {
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
    expect(IAP21_EXERCICES).toHaveLength(10);
    expect(IAP21_EXERCICES_COMPLETS).toHaveLength(15);
    IAP21_EXERCICES.forEach((ex, i) => {
      expect(ex.titre).toMatch(new RegExp(`^Exercice ${i + 1} — `));
      expect(ex.points).toBe(20);
      expect(ex.reponseAttendue).toMatch(/Barème/);
    });
    expect(IAP21_EXERCICES.slice(1).map(e => e.titre.match(/C\d/)![0])).toEqual(["C1", "C1", "C2", "C2", "C3", "C3", "C4", "C4", "C5"]);
    for (const qcm of [IAP21_QCM_DEBUT, IAP21_QCM_FIN]) {
      expect(qcm).toHaveLength(10);
      qcm.forEach(q => {
        expect(q.options).toHaveLength(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
      });
    }
    expect(IAP21_EVAL_PACK.exerciceIntermediaire.questions).toHaveLength(4);
    expect(IAP21_EVAL_PACK.evaluationFinale.exercices).toHaveLength(5);
    expect(IAP21_CONTENT_PACK.ressources.videos.length).toBeGreaterThanOrEqual(8);
    IAP21_CONTENT_PACK.ressources.videos.forEach(v =>
      expect(v.url).toMatch(/^https:\/\/(www\.youtube\.com\/results\?search_query=|www\.cnil\.fr\/|digital-strategy\.ec\.europa\.eu\/|eur-lex\.europa\.eu\/|www\.service-public\.fr\/|entreprendre\.service-public\.fr\/)/));
  });

  it("veille : règlement européen sur l'IA aux bonnes dates, sources officielles", () => {
    const regl = JSON.stringify(IAP21_VEILLE_PACK.reglementaire);
    for (const d of ["1er août 2024", "2 février 2025", "2 août 2025", "2 août 2026"]) expect(regl).toContain(d);
    expect(regl).toMatch(/2024\/1689/);
    expect(regl).toMatch(/omnibus/);
    expect(regl).toMatch(/proposition/);
    expect(regl).toMatch(/CNIL/);
    expect(regl).toMatch(/[Dd]roit d'auteur/);
    for (const k of ["reglementaire", "metier", "technologique"] as const) {
      expect(IAP21_VEILLE_PACK[k].length).toBeGreaterThanOrEqual(4);
      IAP21_VEILLE_PACK[k].forEach(r => {
        expect(r.lien).toMatch(/^https:\/\//);
        expect(r.exploitation).toMatch(/^Preuve : .+ Action : /);
        expect(r.date).toMatch(/^[A-ZÉ][a-zéû]+ 2026$/);
      });
    }
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = IAP21_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    // Ordre : diagnostic, C1 fonctionnement, C1 outils, C2 requête, C2 itération, C3 écrits,
    // C3 vérification, C4 outils de travail, C4 automatisation, C5 conformité
    const fin = IAP21_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/diagnostic/i);
    expect(fin[1]).toMatch(/hallucination/i);
    expect(fin[2]).toMatch(/outils/i);
    expect(fin[3]).toMatch(/requête/i);
    expect(fin[4]).toMatch(/itération/i);
    expect(fin[5]).toMatch(/mail client|compte rendu/i);
    expect(fin[6]).toMatch(/vérifiez/i);
    expect(fin[7]).toMatch(/outils de travail/i);
    expect(fin[8]).toMatch(/automatisation/i);
    expect(fin[9]).toMatch(/RGPD/);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getIAP21AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getIAP21AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getIAP21AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(iap21Seed("MARTIN", "Sophie")).toBe(iap21Seed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    IAP21_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickIAP21ExerciceAnswer(FORMATION_IAP21.intitule, "", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickIAP21ExerciceAnswer(FORMATION_IAP21.intitule, "", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickIAP21ExerciceAnswer(FORMATION_IAP21.intitule, "", 0, 0, { ...noms[0], entreprise: "SARL TEST" }, IAP21_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/^J'ai rattaché l'exercice à la situation de SARL TEST\./);
    expect(pickIAP21ExerciceAnswer(INTITULE_TVTE, "", 0, 0, noms[0], "C1")).toBeNull();
    expect(pickIAP21ExerciceAnswer(INTITULE_RS_IA_GENERATIVE, "", 0, 0, noms[0], "C1")).toBeNull();
    // Accords : une stagiaire n'est jamais « conducteur », « dirigeant », « technicien »…
    const fem = Array.from({ length: 8 }, (_, i) => pickIAP21ExerciceAnswer(FORMATION_IAP21.intitule, "", 0, i, { nom: "X" + i, prenom: "Julie", civilite: "Mme" }, IAP21_EXERCICES[0].titre)).join(" ");
    expect(fem).not.toMatch(/\bconducteur\b|\bdirigeant\b|\btechnicien\b|\badministratif\b|\bcommercial\b|\bchargé(?!e)|\bassistant\b/i);
    const masc = Array.from({ length: 8 }, (_, i) => pickIAP21ExerciceAnswer(FORMATION_IAP21.intitule, "", 0, i, { nom: "Y" + i, prenom: "Karim", civilite: "M." }, IAP21_EXERCICES[0].titre)).join(" ");
    expect(masc).not.toMatch(/\bconductrice\b|\bdirigeante\b|\btechnicienne\b|\badministrative\b|\bcommerciale\b|\bchargée\b/i);
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, salariés financés par l'employeur", () => {
    const besoins = noms.map((s, i) => getIAP21EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /trois jours|trois journées/.test(b.disponibilites))).toBe(true);
    expect(besoins.every(b => /plan de développement des compétences/.test(b.budget))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getIAP21Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    // 16 profils : 16 stagiaires consécutifs ont 16 besoins différents
    const seize = Array.from({ length: 16 }, (_, i) => getIAP21Besoin("N" + i, "P", "M.", i));
    expect(new Set(seize).size).toBe(16);
    expect(getIAP21EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => iap21NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    const ouv = Array.from({ length: 8 }, (_, i) =>
      getIAP21AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0));
    expect(new Set(ouv).size).toBe(8);
    for (let i = 0; i < 100; i++) {
      const tot = getIAP21AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      expect(iap21NoteDebutSur20(i)).toBeLessThanOrEqual(12);
      expect(iap21BonnesQcmDebut(10, i) * 2).toBeLessThanOrEqual(12);
      const rep = iap21ReponsesQcmDebut(IAP21_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === IAP21_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(iap21BonnesQcmDebut(IAP21_QCM_DEBUT.length, i));
      expect(bonnes * 2).toBeLessThanOrEqual(12);
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 15; ex++) {
      expect(new Set(Array.from({ length: 6 }, (_, i) => iap21NoteExercice(i, ex, true))).size).toBe(6);
      expect(new Set(Array.from({ length: 6 }, (_, i) => iap21NoteExercice(i, ex, false))).size).toBe(6);
    }
  });

  it("formation non certifiante : aucune mention de certification, RNCP, RS, jury, CPF ou France Compétences", () => {
    const preset = lire("src/lib/iaPro21hPreset.ts");
    const moteur = lire("src/lib/iaPro21hHumanized.ts");
    for (const src of [preset, moteur]) expect(src).not.toMatch(INTERDITS_NON_CERTIFIANT);
    expect(moteur).not.toMatch(/[A-D]\)/);
    const textes = [
      ...IAP21_QUESTIONS_OUVERTES.debut, ...IAP21_QUESTIONS_OUVERTES.fin,
    ].map(q => q.question + " " + q.reponseAttendue).join(" ");
    expect(textes).not.toMatch(/[A-D]\)/);
  });

  it("aucun texte du preset ni des copies ne parle de RNCP, CPF, jury ou formation certifiante", () => {
    const { codeRNCP: _code, ...champs } = FORMATION_IAP21;
    void _code;
    const copies = IAP21_EXERCICES.flatMap((ex, ei) =>
      noms.slice(0, 8).map((s, i) => pickIAP21ExerciceAnswer(FORMATION_IAP21.intitule, "", ei, i, s, ex.titre) || ""));
    const reponses = noms.flatMap((s, i) => [
      ...getIAP21AutoAnswers(s.nom, s.prenom, s.civilite, true, 10, i).reponses,
      ...getIAP21AutoAnswers(s.nom, s.prenom, s.civilite, false, 10, i).reponses,
      ...Object.values(getIAP21EvalBesoins(s, true, i)),
    ]);
    const tout = [
      ...Object.values(champs).map(String),
      JSON.stringify(IAP21_CONTENT_PACK), JSON.stringify(IAP21_EVAL_PACK), JSON.stringify(IAP21_VEILLE_PACK),
      JSON.stringify(IAP21_QUESTIONS_OUVERTES), ...copies, ...reponses,
    ].join(" ");
    const sansNegation = tout.replace(/non certifiante/gi, "");
    expect(sansNegation).not.toMatch(/RNCP|\bCPF\b|jury|certifiant|certification|France Compétences/i);
    expect(tout).toMatch(/non certifiante/);
    expect(tout).not.toMatch(/EMI EVOLUTION/i);
  });
});

describe("IA – intégrer les outils d'IA 21 h — câblage", () => {
  it("l'évaluation utilise les exercices et QCM du preset", async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_IAP21.intitule);
    expect(ev.exercices[0].titre).toBe(IAP21_EXERCICES[0].titre);
    expect(ev.qcmPositionnement).toEqual(IAP21_QCM_DEBUT);
    expect(ev.qcmFinal).toEqual(IAP21_QCM_FIN);
  });

  it("la formation IA générative (RS6776) garde son contenu", async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    const { getCourseChapters } = await import("@/lib/courseContent");
    const { getIAPro21hChapters } = await import("@/lib/courseContentIAPro21h");
    const rs = "Création de contenus rédactionnels et visuels par l'usage responsable de l'intelligence artificielle générative";
    expect(getEvalContent(rs).qcmPositionnement).not.toEqual(IAP21_QCM_DEBUT);
    expect(getCourseChapters(rs)).not.toEqual(getIAPro21hChapters());
  });

  it("le support de cours couvre C1 à C5 et compte plus de 60 pages de texte", async () => {
    const { getCourseChapters } = await import("@/lib/courseContent");
    const { getIAPro21hChapters } = await import("@/lib/courseContentIAPro21h");
    const chapitres = getCourseChapters(FORMATION_IAP21.intitule);
    expect(chapitres).toEqual(getIAPro21hChapters());
    expect(chapitres.length).toBe(8);
    const texte = chapitres.flatMap(c => c.sections.map(s => s.content.replace(/<[^>]+>/g, " "))).join(" ");
    for (const c of ["C1", "C2", "C3", "C4", "C5"]) expect(texte).toContain(c);
    expect(texte.length).toBeGreaterThan(60 * 3000);
    expect(texte).not.toMatch(/France Compétences|\bjury\b|\bCPF\b|RNCP\d/);
    expect(texte).not.toMatch(/EMI EVOLUTION/i);
    expect(texte).toMatch(/Thermia Rénov/);
  });
});
