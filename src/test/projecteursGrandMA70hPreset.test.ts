import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_GMA70, GMA70_EXERCICES, GMA70_QCM_COMPETENCES, GMA70_EXERCICES_COMPLETS, GMA70_QCM_DEBUT, GMA70_QCM_FIN,
  GMA70_POSITIONNEMENT_TITRE, GMA70_QCM_DEBUT_EXPLICATIONS, GMA70_VIDEOS,
  GMA70_CONTENT_PACK, GMA70_EVAL_PACK, GMA70_VEILLE_PACK, seedGMA70AICaches,
} from "@/lib/projecteursGrandMA70hPreset";
import {
  isGMA70Formation, getGMA70AutoAnswers, getGMA70EvalBesoins, getGMA70Besoin, pickGMA70ExerciceAnswer,
  gma70NoteDebutSur20, gma70BonnesQcmDebut, gma70ReponsesQcmDebut, gma70NoteExercice, gma70Seed,
  GMA70_QUESTIONS_OUVERTES,
} from "@/lib/projecteursGrandMA70hHumanized";
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
/** Dans les sources et les packs du preset : pas non plus de certificateur. */
const INTERDITS_SOURCES = new RegExp(`${INTERDITS.source}|certificateur`, "i");
/** La modalité n'est jamais écrite dans les textes (seul le champ `modalites` la porte). */
const MODALITE = /pr[ée]sentiel|distanciel|\bà distance\b|visio/i;

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
  const cles = [...reponseAttendue.matchAll(/(\d+)\s*[-–]\s*([A-D])/g)];
  cles.forEach(x => { correct[parseInt(x[1])] = x[2]; });
  return { questions, correct, nbCles: cles.length };
}

const LETTRE_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

const noms = Array.from({ length: 12 }, (_, i) => ({
  nom: `NOM${i}`, prenom: i % 2 ? "Julie" : "Karim", civilite: i % 2 ? "Mme" : "M.", entreprise: "",
}));

/** Mot attendu dans chacune des 8 copies de chaque mise en situation (C1 à C6). */
const MOTS_EXERCICES = [/fiche technique/, /parc/, /élingue/, /adresse/, /univers/, /patch/, /preset/, /cue/, /phaser/, /panne/];

/** Autres détecteurs de formations exemples : aucun ne doit capter cet intitulé. */
const AUTRES = [
  isCOH21Formation, isGSC35Formation, isIAP21Formation, isMSP21Formation, isANG40Formation, isARH41366Formation,
  isLRBFormation, isTVTEFormation, isWM14Formation, isRPMSFormation, isDRI47Formation, isFPA45Formation,
];

describe("Projecteurs automatiques et pupitre grandMA – 70 h — formation exemple non certifiante", () => {
  it("données de la formation : 70 h, 10 jours de 7 h, 6 participants, modalité seulement dans le champ dédié", () => {
    const f = FORMATION_GMA70;
    expect(f.intitule).toBe("Projecteurs automatiques et pupitre grandMA – 70 h");
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
    expect(f.prerequis).toMatch(/éclairage scénique/);
    expect(f.publicVise).toMatch(/intermittents et permanents/);
    expect(f.publicVise).toMatch(/Afdas/);
    expect(f.moyensPedagogiques).toMatch(/Théâtre des Quatre Vents, salle fictive/);
    expect(f.objectifs).toMatch(/non certifiante/);
    for (const k of ["C1", "C2", "C3", "C4", "C5", "C6"]) expect(f.objectifs).toContain(k);
    for (let j = 1; j <= 10; j++) expect(f.programme).toContain(`JOUR ${j} —`);
    expect(f.programme).not.toContain("JOUR 11");
    expect(f.methodesEvaluation).toMatch(/attestation de fin de formation/);
    expect(f.methodesEvaluation).toMatch(/certificat de réalisation/);
    const { modalites, ...textes } = f;
    void modalites;
    expect(JSON.stringify(textes)).not.toMatch(MODALITE);
    // Aucune donnée de satisfaction inventée
    expect(f.tauxSatisfaction).toBeUndefined();
    expect(f.nombreAvisSatisfaction).toBeUndefined();
  });

  it("sélection par l'intitulé : « grandma » ou « projecteur » + « automatique », aucune confusion", () => {
    expect(isGMA70Formation(FORMATION_GMA70.intitule, FORMATION_GMA70.codeRNCP)).toBe(true);
    for (const v of [
      "grandMA3 – programmation", "Pupitre GRANDMA", "Projecteurs automatiques", "Projecteur automatique et pupitre",
      "Les projecteurs AUTOMATIQUES en spectacle", "Formation grandma2 onPC",
    ]) expect(isGMA70Formation(v), v).toBe(true);
    for (const v of [
      "Machinerie scénique, moteurs et ponts : équipements fixes et grils provisoires – 70 h", "Éclairage scénique",
      "Projecteurs traditionnels et gradateurs", "Pupitre son numérique", "Cohésion d'équipe en entreprise – 21 h",
      "Démarrage automatique d'un moteur", "Anglais Professionnel – 40 h", "",
    ]) expect(isGMA70Formation(v), v).toBe(false);
    expect(isGMA70Formation(undefined)).toBe(false);
    for (const is of AUTRES) expect(is(FORMATION_GMA70.intitule, ""), is.name).toBe(false);
  });

  it("6 QCM de 10 questions (un par compétence), au format du générateur, avec explications", () => {
    expect(GMA70_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    for (const ex of GMA70_QCM_COMPETENCES) {
      const { questions, correct, nbCles } = parseQCM(ex.consigne, ex.reponseAttendue);
      expect(questions, ex.titre).toHaveLength(10);
      expect(nbCles, `${ex.titre} : clés parasites dans les explications`).toBe(10);
      expect(ex.points).toBe(10);
      questions.forEach(q => {
        expect(q.opts.length, `${ex.titre} Q${q.num}`).toBeGreaterThanOrEqual(2);
        expect(q.opts.length, `${ex.titre} Q${q.num}`).toBeLessThanOrEqual(4);
        expect(q.enonce.length, `${ex.titre} Q${q.num}`).toBeGreaterThan(10);
        expect(q.enonce, `${ex.titre} Q${q.num}`).not.toMatch(/[A-D]\)/);
        expect(correct[q.num], `${ex.titre} Q${q.num}`).toMatch(/^[A-D]$/);
        expect(LETTRE_INDEX[correct[q.num]], `${ex.titre} Q${q.num}`).toBeLessThan(q.opts.length);
        expect(ex.reponseAttendue, `${ex.titre} explication Q${q.num}`).toContain(`Q${q.num} : `);
      });
      expect(new Set(Object.values(correct)).size, ex.titre).toBeGreaterThanOrEqual(3);
    }
    expect(GMA70_EXERCICES).toHaveLength(10);
    GMA70_EXERCICES.forEach((ex, i) => expect(ex.titre).toMatch(new RegExp(`^Exercice ${i + 1} — C[1-6]`)));
    expect(GMA70_EXERCICES_COMPLETS).toHaveLength(16);
    expect(GMA70_VIDEOS).toEqual([]);
    expect(GMA70_CONTENT_PACK.besoins.besoinsList).toHaveLength(10);
    // Positionnement : 10 questions, une seule bonne réponse, explications dans l'ordre
    expect(GMA70_POSITIONNEMENT_TITRE).toBe("Positionnement — vos repères de départ");
    expect(GMA70_QCM_DEBUT).toHaveLength(10);
    expect(GMA70_QCM_DEBUT_EXPLICATIONS).toHaveLength(10);
    for (const q of GMA70_QCM_DEBUT) {
      expect(q.options).toHaveLength(3);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(3);
    }
    expect(new Set(GMA70_QCM_DEBUT.map(q => q.correctIndex)).size).toBe(3);
    expect(GMA70_QCM_FIN).toHaveLength(10);
    for (const q of GMA70_QCM_FIN) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
    expect(GMA70_EVAL_PACK.qcmDebut).toBe(GMA70_QCM_DEBUT);
    expect(GMA70_EVAL_PACK.exerciceIntermediaire.questions.length).toBeGreaterThanOrEqual(4);
    expect(GMA70_EVAL_PACK.evaluationFinale.exercices.length).toBeGreaterThanOrEqual(5);
    for (const k of ["reglementaire", "metier", "technologique"] as const) expect(GMA70_VEILLE_PACK[k].length).toBeGreaterThanOrEqual(3);
  });

  it("calculs techniques des corrigés : adresses DMX et puissance", () => {
    // Perche 3 : 4 spots en 34 canaux puis 4 wash en 22 canaux à partir de 1
    const adresses: number[] = [];
    let a = 1;
    for (const n of [34, 34, 34, 34, 22, 22, 22, 22]) { adresses.push(a); a += n; }
    expect(adresses).toEqual([1, 35, 69, 103, 137, 159, 181, 203]);
    expect(a - 1).toBe(224);
    expect(GMA70_EXERCICES[3].reponseAttendue).toContain("1, 35, 69 et 103");
    expect(GMA70_EXERCICES[3].reponseAttendue).toContain("137, 159, 181 et 203");
    expect(230 * 16).toBe(3680);
    const q4 = GMA70_QCM_FIN[3];
    expect(q4.options[q4.correctIndex]).toBe(String(1 + 3 * 25));
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = GMA70_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = GMA70_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/fiche technique/i);
    expect(fin[1]).toMatch(/parc/i);
    expect(fin[2]).toMatch(/accroch/i);
    expect(fin[3]).toMatch(/adresses/i);
    expect(fin[4]).toMatch(/réseau/i);
    expect(fin[5]).toMatch(/show file/i);
    expect(fin[6]).toMatch(/presets/i);
    expect(fin[7]).toMatch(/cues/i);
    expect(fin[8]).toMatch(/effets/i);
    expect(fin[9]).toMatch(/panne/i);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getGMA70AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.every(sc => sc <= 0.5))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getGMA70AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getGMA70AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(gma70Seed("MARTIN", "Sophie")).toBe(gma70Seed("martin", "SOPHIE"));
    // Accords : féminin et masculin
    const copies = Array.from({ length: 8 }, (_, i) => ({
      fem: pickGMA70ExerciceAnswer(FORMATION_GMA70.intitule, "", 0, i, { nom: "X", prenom: "Julie", civilite: "Mme" }, GMA70_EXERCICES[0].titre)!,
      masc: pickGMA70ExerciceAnswer(FORMATION_GMA70.intitule, "", 0, i, { nom: "X", prenom: "Karim", civilite: "M." }, GMA70_EXERCICES[0].titre)!,
    }));
    const regie = copies.find(c => /régisseuse lumière permanente/.test(c.fem))!;
    expect(regie).toBeDefined();
    expect(regie.masc).toMatch(/régisseur lumière permanent\b/);
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    GMA70_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickGMA70ExerciceAnswer(FORMATION_GMA70.intitule, "", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickGMA70ExerciceAnswer(FORMATION_GMA70.intitule, "", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickGMA70ExerciceAnswer(FORMATION_GMA70.intitule, "", 0, 0, { ...noms[0], entreprise: "SCÈNE TEST" }, GMA70_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/SCÈNE TEST/);
    expect(pickGMA70ExerciceAnswer("Cohésion d'équipe en entreprise – 21 h", "", 0, 0, noms[0], "C1")).toBeNull();
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, dix jours de 9h00 à 17h00", () => {
    const besoins = noms.map((s, i) => getGMA70EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /dix jours/.test(b.disponibilites))).toBe(true);
    expect(besoins.every(b => !MODALITE.test(Object.values(b).join(" ")))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getGMA70Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getGMA70EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
    expect(getGMA70EvalBesoins(noms[0], false, 0).budget).toMatch(/Afdas/);
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => gma70NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    for (let i = 0; i < 100; i++) {
      const tot = getGMA70AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      expect(gma70BonnesQcmDebut(10, i) * 2).toBeLessThanOrEqual(12);
      const rep = gma70ReponsesQcmDebut(GMA70_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === GMA70_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(gma70BonnesQcmDebut(GMA70_QCM_DEBUT.length, i));
      expect(rep).toHaveLength(10);
      rep.forEach((r, qi) => { expect(r).toBeGreaterThanOrEqual(0); expect(r).toBeLessThan(GMA70_QCM_DEBUT[qi].options.length); });
      expect(bonnes).toBeGreaterThanOrEqual(2);
      expect(bonnes).toBeLessThanOrEqual(6);
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 5 }, (_, i) => gma70NoteExercice(i, ex, true))).size).toBe(5);
      expect(new Set(Array.from({ length: 6 }, (_, i) => gma70NoteExercice(i, ex, false))).size).toBe(6);
      expect(Math.max(...Array.from({ length: 12 }, (_, i) => gma70NoteExercice(i, ex, true)))).toBeLessThanOrEqual(10);
    }
  });

  it("formation non certifiante, sans modalité écrite : sources et packs contrôlés", () => {
    for (const p of ["src/lib/projecteursGrandMA70hPreset.ts", "src/lib/projecteursGrandMA70hHumanized.ts"]) {
      expect(lire(p).replace(/codeRNCP/g, ""), p).not.toMatch(INTERDITS_SOURCES);
    }
    expect(lire("src/lib/projecteursGrandMA70hHumanized.ts")).not.toMatch(/[A-D]\)/);
    const packs = JSON.stringify([GMA70_CONTENT_PACK, GMA70_EVAL_PACK, GMA70_VEILLE_PACK, GMA70_QUESTIONS_OUVERTES, FORMATION_GMA70])
      .replace(/codeRNCP/g, "").replace(/https?:\/\/[^"]+/g, "");
    expect(packs).not.toMatch(INTERDITS_SOURCES);
    expect(packs).not.toMatch(/certification/i);
    expect(JSON.stringify([GMA70_CONTENT_PACK, GMA70_EVAL_PACK, GMA70_VEILLE_PACK, GMA70_QUESTIONS_OUVERTES])).not.toMatch(MODALITE);
    // Aucune statistique ni taux de satisfaction inventés
    expect(packs).not.toMatch(/\d+\s?%/);
    expect(packs).not.toMatch(/taux de satisfaction/i);
  });

  it("amorçage des caches sans erreur ni appel réseau", () => {
    expect(() => seedGMA70AICaches()).not.toThrow();
  });
});
