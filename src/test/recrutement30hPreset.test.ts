import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_REC30, REC30_EXERCICES, REC30_QCM_COMPETENCES, REC30_EXERCICES_COMPLETS, REC30_QCM_DEBUT, REC30_QCM_FIN,
  REC30_QCM_DEBUT_EXPLICATIONS, REC30_VIDEOS,
  REC30_CONTENT_PACK, REC30_EVAL_PACK, REC30_VEILLE_PACK, seedREC30AICaches,
} from "@/lib/recrutement30hPreset";
import {
  isREC30Formation, getREC30AutoAnswers, getREC30EvalBesoins, getREC30Besoin,
  rec30NoteDebutSur20, rec30BonnesQcmDebut, rec30ReponsesQcmDebut, rec30NoteExercice, rec30Seed,
  REC30_QUESTIONS_OUVERTES,
} from "@/lib/recrutement30hHumanized";
import { isECO21Formation } from "@/lib/ecommerce21hHumanized";
import { isVTC48Formation } from "@/lib/vtc48hHumanized";
import { isHYG14Formation } from "@/lib/hygieneAlimentaire14hHumanized";
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
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";
import { RNCP_FICHES } from "@/lib/rncpData";
import type { OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";

const lire = (p: string) => readFileSync(resolve(process.cwd(), p), "utf-8");

/**
 * Formation certifiante au Répertoire spécifique : seul le code RS6168 est autorisé dans le dossier. Aucun code
 * RNCP, aucun autre code RS, aucun TOEIC. Seule exception : la veille réglementaire cite la fiche RS7332 qui
 * remplace RS6168 à son échéance du 23/11/2025.
 */
const INTERDITS = /RNCP\s?\d|\bRS\s?(?!6168\b)\d{3,4}|TOEIC/i;
const INTERDITS_HORS_VEILLE = /RNCP\s?\d|\bRS\s?(?!6168\b|7332\b)\d{3,4}|TOEIC/i;
const INTERDITS_SOURCES = new RegExp(`${INTERDITS_HORS_VEILLE.source}|\\bRNCP\\b|titre professionnel`, "i");

/** Procédures générales de l'organisme : elles décrivent toute l'activité de l'organisme. */
const DOCS_ORGANISME = /^af_c(1i2|5i21|5i22|6i23|7i32)_/;
const HORS_FORMATION = /TOEIC|VTest/i;

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

/** Autres détecteurs de formations exemples : aucun ne doit capter cet intitulé. */
const AUTRES = [isECO21Formation, isVTC48Formation, isHYG14Formation, isCOH21Formation, isGSC35Formation, isIAP21Formation, isMSP21Formation, isANG40Formation, isARH41366Formation, isLRBFormation, isTVTEFormation, isWM14Formation, isRPMSFormation];

const LETTRE_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
const COMPETENCES = ["C1", "C2", "C3", "C4", "C5", "C6"];

describe("Recruter et intégrer ses collaborateurs (CP-FFP) – RS6168, 30 h — formation certifiante", () => {
  it("données de la formation : RS6168, 30 h en 6 modules de 5 h, distanciel, 3 000 € net de taxe, INEA CONSEIL", () => {
    const f = FORMATION_REC30;
    expect(f.intitule).toBe("Recruter et intégrer ses collaborateurs (CP-FFP)");
    expect(f.codeRNCP).toBe("RS6168");
    expect(f.duree).toBe("30 heures (6 modules de 5 h)");
    expect(f.dureeSaisiePrioritaire).toBe(true);
    expect(f.modalites).toBe("distanciel");
    expect(f.tarif).toMatch(/^3 000 € net de taxe/);
    expect(f.lieu).toBe("Google Meet / Zoom");
    expect(f.formateur).toBe("Rahma GARY");
    expect(f.publicVise).toMatch(/Managers et opérationnels amenés à recruter et intégrer des collaborateurs/);
    expect(f.objectifs).toMatch(/Répertoire spécifique sous le code RS6168/);
    expect(f.objectifs).toMatch(/INEA CONSEIL/);
    for (const k of COMPETENCES) expect(f.objectifs).toContain(`- ${k} — `);
    expect(f.objectifs).not.toContain("C7");
    // Programme « Module N — Titre (Cx, 5 h) : … », 30 h au total, un module par compétence dans l'ordre
    const modules = [...f.programme.matchAll(/^Module (\d) — [^\n]+\((C\d), (\d+) h\) : [^\n]+;/gm)];
    expect(modules.map(m => m[1])).toEqual(["1", "2", "3", "4", "5", "6"]);
    expect(modules.map(m => m[2])).toEqual(COMPETENCES);
    expect(modules.reduce((t, m) => t + parseInt(m[3]), 0)).toBe(30);
    expect(f.programme).not.toContain("Module 7");
    expect(f.programme).toMatch(/France Travail/);
    expect(f.programme).toMatch(/cooptation/);
    expect(f.programme).toMatch(/rapport d'étonnement/);
    expect(f.programme).toMatch(/Agefiph/);
    expect(f.programme).toMatch(/préparation des épreuves E1, E2 et E3/);
    // Les trois épreuves et le jury de la fiche
    expect(f.methodesEvaluation).toMatch(/E1, étude de cas pratique sur un recrutement à effectuer/);
    expect(f.methodesEvaluation).toMatch(/E2, mise en situation orale lors d'une simulation de recrutement/);
    expect(f.methodesEvaluation).toMatch(/E3, étude de cas pratique sur l'intégration d'un collaborateur/);
    expect(f.methodesEvaluation).toMatch(/Jury de 3 membres/);
    expect(f.methodesEvaluation).toMatch(/INEA CONSEIL/);
    expect(f.methodesEvaluation).toMatch(/Pas de validation partielle/);
    expect(f.methodesEvaluation).toMatch(/certificat de réalisation/);
    expect(f.delaiAcces).toMatch(/11 jours ouvrés/);
    // Session exemple antérieure à l'échéance de la fiche (23/11/2025)
    expect(f.dateDebut < f.dateFin).toBe(true);
    expect(f.dateFin <= "2025-11-23").toBe(true);
    // Indicateurs et satisfaction vides
    expect(f.tauxSatisfaction).toBeUndefined();
    expect(f.nombreAvisSatisfaction).toBeUndefined();
    expect(f.tauxAssiduite).toBeUndefined();
    expect(f.nombreStagiairesFormes).toBeUndefined();
  });

  it("sélection : RS6168 ou « recruter et intégrer ses collaborateurs » + « CP-FFP » ; RS7332, ARH et autres RH jamais captés", () => {
    expect(isREC30Formation(FORMATION_REC30.intitule, FORMATION_REC30.codeRNCP)).toBe(true);
    for (const v of [
      "Recruter et intégrer ses collaborateurs (CP-FFP)", "RECRUTER ET INTEGRER SES COLLABORATEURS - CP FFP",
      "Recruter et intégrer ses collaborateurs – CP-FFP – 30 h", "Préparation RS6168", "Certification RS 6168",
    ]) expect(isREC30Formation(v), v).toBe(true);
    expect(isREC30Formation("Formation recrutement", "RS6168")).toBe(true);
    expect(isREC30Formation("Formation", "RS 6168")).toBe(true);
    for (const v of [
      "Recruter et intégrer ses collaborateurs", "Recruter et intégrer ses collaborateurs (RS7332)", "Recruter et intégrer ses collaborateurs – RS7332 (CP-FFP)",
      "Assistant ressources humaines", "Assistant(e) ressources humaines – RNCP41366", "Recrutement et intégration – 14 h",
      "Recruter sans discriminer", "Management d'équipe", "Cohésion d'équipe en entreprise – 21 h", "Manager une équipe (CP-FFP)",
      "Bilan de compétences", "",
    ]) expect(isREC30Formation(v), v).toBe(false);
    expect(isREC30Formation(undefined)).toBe(false);
    // Un autre code de répertoire saisi l'emporte sur l'intitulé (dont RS7332, la fiche qui remplace RS6168)
    expect(isREC30Formation(FORMATION_REC30.intitule, "RS7332")).toBe(false);
    expect(isREC30Formation(FORMATION_REC30.intitule, "RNCP41366")).toBe(false);
    // Aucun autre preset ne capte l'intitulé
    for (const is of AUTRES) expect(is(FORMATION_REC30.intitule, FORMATION_REC30.codeRNCP), is.name).toBe(false);
    // Seule la formation exemple est captée dans la liste d'exemples, et aucune fiche du référentiel hors RS6168
    const captees = SAMPLE_FORMATIONS.filter(f => isREC30Formation(f.intitule, f.codeRNCP));
    expect(captees.map(f => f.intitule)).toEqual([FORMATION_REC30.intitule]);
    expect(RNCP_FICHES.filter(f => isREC30Formation(f.intitule, f.code) && f.code !== "RS6168").map(f => f.code)).toEqual([]);
  });

  it("10 QCM à la place des exercices pratiques + 6 QCM par compétence, au format lettré du générateur", () => {
    expect(REC30_EXERCICES).toHaveLength(10);
    REC30_EXERCICES.forEach((e, i) => expect(e.titre).toMatch(new RegExp(`^QCM ${i + 1} — C[1-6] : `)));
    const comp = REC30_EXERCICES.map(e => e.titre.match(/C\d/)![0]);
    expect(comp).toEqual(["C1", "C1", "C2", "C2", "C3", "C3", "C4", "C4", "C5", "C6"]);
    expect(REC30_QCM_COMPETENCES.map(q => q.titre.match(/^QCM (C\d) — /)![1])).toEqual(COMPETENCES);
    expect(REC30_EXERCICES_COMPLETS).toEqual([...REC30_EXERCICES, ...REC30_QCM_COMPETENCES]);
    const enonces = new Set<string>();
    for (const ex of REC30_EXERCICES_COMPLETS) {
      // Détection « QCM du preset » (document rempli par stagiaire, jamais la trame vierge)
      expect(ex.titre, ex.titre).toMatch(/^QCM\b/);
      expect(ex.reponseAttendue, ex.titre).toMatch(/^(\s*\d+\s*-\s*[A-D])+\s*$/);
      expect(ex.consigne.startsWith("Cochez la bonne réponse pour chacune des 10 questions :\n\n1) ")).toBe(true);
      const { questions, correct } = parseQCM(ex.consigne, ex.reponseAttendue);
      expect(questions, ex.titre).toHaveLength(10);
      expect(ex.points).toBe(10);
      questions.forEach((q, qi) => {
        expect(q.num).toBe(qi + 1);
        expect([2, 4], `${ex.titre} Q${q.num}`).toContain(q.opts.length);
        expect(q.enonce.length, `${ex.titre} Q${q.num}`).toBeGreaterThan(10);
        expect(q.enonce, `${ex.titre} Q${q.num}`).not.toMatch(/[A-D]\)/);
        q.opts.forEach(o => expect(o.length, `${ex.titre} Q${q.num}`).toBeGreaterThan(0));
        expect(correct[q.num], `${ex.titre} Q${q.num}`).toMatch(/^[A-D]$/);
        expect(LETTRE_INDEX[correct[q.num]], `${ex.titre} Q${q.num}`).toBeLessThan(q.opts.length);
        expect(enonces.has(q.enonce), `${ex.titre} Q${q.num} en double`).toBe(false);
        enonces.add(q.enonce);
      });
      // Aucune « X) » parasite dans les textes : chaque question compte exactement ses options
      expect((ex.consigne.match(/[A-D]\)/g) || []).length, ex.titre).toBe(questions.reduce((t, q) => t + q.opts.length, 0));
      expect(new Set(Object.values(correct)).size, ex.titre).toBeGreaterThanOrEqual(3);
    }
    expect(REC30_QCM_DEBUT).toHaveLength(10);
    expect(REC30_QCM_DEBUT_EXPLICATIONS).toHaveLength(10);
    expect(REC30_QCM_FIN).toHaveLength(10);
    for (const q of [...REC30_QCM_DEBUT, ...REC30_QCM_FIN]) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
    expect(new Set(REC30_QCM_DEBUT.map(q => q.correctIndex)).size).toBe(4);
    expect(new Set(REC30_QCM_FIN.map(q => q.correctIndex)).size).toBe(4);
  });

  it("évaluations : cas intermédiaire en 4 questions et évaluation finale calquée sur E1, E2, E3 avec grille", () => {
    const ei = REC30_EVAL_PACK.exerciceIntermediaire;
    expect(ei.questions).toHaveLength(4);
    expect(ei.contexte).toMatch(/fictifs/);
    const fin = REC30_EVAL_PACK.evaluationFinale;
    expect(fin.exercices).toHaveLength(5);
    expect(fin.exercices.map(e => e.titre.match(/— (E\d)/)![1])).toEqual(["E1", "E1", "E2", "E2", "E3"]);
    expect(fin.exercices.flatMap(e => e.titre.match(/C\d/g)!)).toEqual(COMPETENCES);
    fin.exercices.forEach(e => expect(e.reponseAttendue, e.titre).toMatch(/Grille : /));
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des QCM d'entraînement", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = REC30_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = REC30_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/fiche de poste/);
    expect(fin[1]).toMatch(/grille/);
    expect(fin[2]).toMatch(/offre/);
    expect(fin[3]).toMatch(/canaux/);
    expect(fin[4]).toMatch(/trié/);
    expect(fin[5]).toMatch(/entretien/);
    expect(fin[6]).toMatch(/atouts/);
    expect(fin[7]).toMatch(/objections/);
    expect(fin[8]).toMatch(/intégration/);
    expect(fin[9]).toMatch(/handicap/);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question, aucun corrigé recopié", () => {
    const corriges = [...REC30_QUESTIONS_OUVERTES.debut, ...REC30_QUESTIONS_OUVERTES.fin].map(q => q.reponseAttendue);
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getREC30AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r) && !corriges.includes(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getREC30AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getREC30AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(rec30Seed("MARTIN", "Sophie")).toBe(rec30Seed("martin", "SOPHIE"));
    // Accords
    const fins = (civilite: string) => noms.map((s, i) => getREC30AutoAnswers(s.nom, s.prenom, civilite, false, 10, i).reponses.join(" ")).join(" ");
    expect(fins("Mme")).toMatch(/aidée/);
    expect(fins("M.")).not.toMatch(/aidée|cohérente/);
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, 6 modules de 5 h", () => {
    const besoins = noms.map((s, i) => getREC30EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}|undefined/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /6 modules/.test(b.disponibilites))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getREC30Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getREC30EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
    const projets = (civilite: string) => noms.map((s, i) => getREC30EvalBesoins({ ...s, civilite }, false, i).projetPro).join(" ");
    expect(projets("M.")).toMatch(/mener seul /);
    expect(projets("Mme")).toMatch(/mener seule /);
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => rec30NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    for (let i = 0; i < 100; i++) {
      const tot = getREC30AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      const rep = rec30ReponsesQcmDebut(REC30_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === REC30_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(rec30BonnesQcmDebut(REC30_QCM_DEBUT.length, i));
      expect(rep).toHaveLength(10);
      expect(bonnes).toBeGreaterThanOrEqual(2);
      expect(bonnes).toBeLessThanOrEqual(6);
    }
  });

  it("QCM d'entraînement : notes différentes d'un stagiaire à l'autre, jamais plus de 10", () => {
    for (let ex = 0; ex < REC30_EXERCICES_COMPLETS.length; ex++) {
      expect(new Set(Array.from({ length: 5 }, (_, i) => rec30NoteExercice(i, ex, true))).size).toBe(5);
      expect(Math.max(...Array.from({ length: 12 }, (_, i) => rec30NoteExercice(i, ex, true)))).toBeLessThanOrEqual(10);
      expect(Math.min(...Array.from({ length: 12 }, (_, i) => rec30NoteExercice(i, ex, true)))).toBeGreaterThanOrEqual(6);
    }
  });

  it("certifiante RS6168 : aucun code RNCP ni autre code RS hors RS7332 en veille, aucun barème ni statistique inventés, veille complète", () => {
    const sources = ["src/lib/recrutement30hPreset.ts", "src/lib/recrutement30hHumanized.ts", "src/lib/courseContentRecrutement30h.ts"];
    for (const p of sources) expect(lire(p).replace(/codeRNCP/g, ""), p).not.toMatch(INTERDITS_SOURCES);
    expect(lire("src/lib/recrutement30hHumanized.ts")).not.toMatch(/[A-D]\)/);
    const packs = JSON.stringify([REC30_CONTENT_PACK, REC30_EVAL_PACK, REC30_QUESTIONS_OUVERTES, FORMATION_REC30])
      .replace(/codeRNCP/g, "").replace(/https?:\/\/[^"]+/g, "");
    expect(packs).not.toMatch(INTERDITS);
    expect(JSON.stringify(REC30_VEILLE_PACK).replace(/https?:\/\/[^"]+/g, "")).not.toMatch(INTERDITS_HORS_VEILLE);
    const tout = packs + JSON.stringify(REC30_VEILLE_PACK);
    // Aucun barème, aucun seuil de réussite écrits : renvoi au certificateur
    expect(tout).not.toMatch(/coefficient \d|\bcoef\.? ?\d|note éliminatoire|seuil de réussite|(?<!\d)\d{1,2} ?\/ ?20(?!\d)/i);
    // Aucune statistique ni taux de satisfaction ou de réussite ; seuls pourcentages : l'obligation d'emploi (6 %) et « 100 % à distance »
    expect(tout.replace(/6 % de l'effectif|100 % (à distance|pré-remplis)/g, "")).not.toMatch(/\d+\s?%/);
    expect(tout).not.toMatch(/taux de (satisfaction|réussite)/i);
    // Veille réglementaire : échéance de RS6168 et remplacement par RS7332, non-discrimination, CNIL, OETH, directive 2023/970
    const regl = JSON.stringify(REC30_VEILLE_PACK.reglementaire);
    expect(regl).toContain("https://www.francecompetences.fr/recherche/rs/6168/");
    expect(regl).toMatch(/23\/11\/2025/);
    expect(regl).toMatch(/remplacée par la fiche RS7332/);
    expect(regl).toMatch(/L1132-1/);
    expect(regl).toMatch(/L1221-6/);
    expect(regl).toMatch(/L5331-2/);
    expect(regl).toMatch(/Défenseur des droits/);
    expect(regl).toMatch(/CNIL/);
    expect(regl).toMatch(/2 ans après le dernier contact/);
    expect(regl).toMatch(/au moins 20 salariés[^"]*6 % de l'effectif/);
    expect(regl).toMatch(/L5213-6/);
    expect(regl).toMatch(/250 salariés/);
    expect(regl).toMatch(/2023\/970/);
    expect(regl).toMatch(/au plus tard le 7 juin 2026/);
    expect(regl).toMatch(/à surveiller/);
    expect(REC30_VEILLE_PACK.metier.length).toBeGreaterThan(0);
    expect(REC30_VEILLE_PACK.technologique.length).toBeGreaterThan(0);
    for (const r of [...REC30_VEILLE_PACK.reglementaire, ...REC30_VEILLE_PACK.metier, ...REC30_VEILLE_PACK.technologique]) {
      expect(r.lien).toMatch(/^https:\/\//);
      expect(r.date).toMatch(/^(Septembre|Octobre|Novembre) 2025$/);
      expect(r.exploitation).toMatch(/^Preuve : .+ Action : /);
    }
    // Vidéos : uniquement des recherches YouTube déjà présentes dans le dépôt, jamais d'identifiant inventé
    const depot = lire("src/lib/courseContent.ts") + lire("src/lib/arh41366Preset.ts") + lire("src/lib/rpmsPreset.ts");
    for (const v of REC30_VIDEOS) {
      expect(v.url).toMatch(/^https:\/\/www\.youtube\.com\/results\?search_query=/);
      expect(depot, v.url).toContain(v.url);
    }
    // Fil rouge fictif
    expect(packs).toMatch(/Atelier Lumen/);
    expect(packs).toMatch(/fictifs/);
  });
});

describe("Recruter et intégrer ses collaborateurs (CP-FFP) – RS6168, 30 h — câblage", () => {
  it("le support de cours compte 6 chapitres (un par compétence), au moins 500 000 caractères", async () => {
    const { getCourseChapters, getYoutubeVideos } = await import("@/lib/courseContent");
    const { getRecrutement30hChapters } = await import("@/lib/courseContentRecrutement30h");
    const chapitres = getRecrutement30hChapters();
    expect(chapitres).toHaveLength(6);
    chapitres.forEach((c, i) => {
      expect(c.title, c.title).toMatch(new RegExp(`^Chapitre ${i + 1} – .+\\(C${i + 1}\\)$`));
      expect(c.sections.length, c.title).toBeGreaterThan(0);
      expect(c.sections.every(s => s.title && s.content && !s.content.includes("${") && !/undefined/.test(s.content)), c.title).toBe(true);
    });
    const total = chapitres.reduce((t, c) => t + c.title.length + c.description.length + c.sections.reduce((u, s) => u + s.title.length + s.content.length, 0), 0);
    expect(total).toBeGreaterThanOrEqual(500_000);
    for (const titre of [FORMATION_REC30.intitule, "Préparation RS6168"]) {
      expect(getCourseChapters(titre), titre).toEqual(chapitres);
    }
    for (const titre of ["Assistant ressources humaines", "Management d'équipe", "Recruter et intégrer ses collaborateurs"]) {
      expect(getCourseChapters(titre)[0]?.title, titre).not.toBe(chapitres[0].title);
    }
    expect(JSON.stringify(chapitres)).not.toMatch(INTERDITS_HORS_VEILLE);
    expect(getYoutubeVideos(FORMATION_REC30.intitule)).toBe(REC30_CONTENT_PACK.ressources.videos);
    expect(getYoutubeVideos("Assistant ressources humaines")).not.toBe(REC30_VIDEOS);
  }, 60_000);

  it("l'évaluation utilise les QCM du preset ; les autres formations gardent leur contenu", { timeout: 60_000 }, async () => {
    const { getEvalContent, hasEvalContentDedie } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_REC30.intitule);
    expect(ev.exercices.map(e => e.titre)).toEqual(REC30_EXERCICES_COMPLETS.map(e => e.titre));
    expect(ev.qcmPositionnement).toEqual(REC30_QCM_DEBUT);
    expect(ev.qcmFinal).toEqual(REC30_QCM_FIN);
    expect(ev.competences).toHaveLength(6);
    expect(ev.appreciations).toHaveLength(6);
    expect(JSON.stringify(ev)).not.toMatch(INTERDITS);
    expect(hasEvalContentDedie("Préparation RS6168")).toBe(true);
    for (const t of ["Assistant ressources humaines", "Management d'équipe", "Recruter et intégrer ses collaborateurs", "Formation e-commerce"]) {
      expect(getEvalContent(t).qcmPositionnement, t).not.toEqual(REC30_QCM_DEBUT);
    }
    for (const f of SAMPLE_FORMATIONS.filter(x => !isREC30Formation(x.intitule, x.codeRNCP))) {
      expect(getEvalContent(f.intitule).qcmPositionnement, f.intitule).not.toEqual(REC30_QCM_DEBUT);
    }
  });

  const org: OrganismeInfo = {
    nom: "ORIENTA CONSULT", siret: "934 018 565 00010", adresse: "21 C rue Jacques Cartier", codePostal: "78960", ville: "Voisins-le-Bretonneux",
    telephone: "01 00 00 00 00", email: "contact@organisme-test.fr", siteWeb: "", nda: "11 78 87209 78",
    dirigeant: "Rahma GARY", responsablePedagogique: "Rahma GARY", referentHandicap: "Rahma GARY",
    referentQualite: "Rahma GARY", poleAdministratif: "Rahma GARY", relationEntreprises: "Rahma GARY",
    referentMobilite: "Rahma GARY", domainesFormation: "Ressources humaines", typesActions: ["actions-formation"],
    certifications: "", outilsUtilises: "Google Meet, Zoom", version: "1", dateMaj: "2025-10-01",
  };
  // Dossier de production : intitulé et code exacts, stagiaires réels entre octobre et décembre 2025 (ici fictifs).
  const formationDossier = { ...FORMATION_REC30, dateDebut: "2025-10-20", dateFin: "2025-12-12" };
  const stagiaires: StagiaireInfo[] = [
    { civilite: "Mme", nom: "ALPHA", prenom: "Claire", email: "claire.alpha@exemple.fr", telephone: "06 10 20 30 40", entreprise: "", poste: "Responsable d'équipe", dateNaissance: "1985-04-12", financeur: "CPF", dateDebutFormation: "2025-10-20", dateFinFormation: "2025-11-14" } as StagiaireInfo,
    { civilite: "M.", nom: "BRAVO", prenom: "Julien", email: "julien.bravo@exemple.fr", telephone: "06 11 21 31 41", entreprise: "", poste: "Gérant", dateNaissance: "1990-09-03", financeur: "CPF", dateDebutFormation: "2025-11-03", dateFinFormation: "2025-11-28" } as StagiaireInfo,
    { civilite: "M.", nom: "CHARLIE", prenom: "Yanis", email: "yanis.charlie@exemple.fr", telephone: "06 12 22 32 42", entreprise: "", poste: "Chef de service", dateNaissance: "1995-01-27", financeur: "CPF", dateDebutFormation: "2025-11-17", dateFinFormation: "2025-12-12" } as StagiaireInfo,
  ];

  it("document QCM de chaque stagiaire rempli : réponses cochées propres au stagiaire, aucun corrigé recopié", async () => {
    const { generateDocumentById } = await import("@/lib/documentGenerator");
    seedREC30AICaches(formationDossier);
    for (const exerciceIdx of [0, 9, 10, 15]) {
      const reponses = stagiaires.map((_, si) => {
        const txt = generateDocumentById(`ex_${si}`, "exercices_stagiaire", { fi: 0, stagiaireIdx: si, exerciceIdx }, org, formationDossier, stagiaires).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
        expect(txt).not.toMatch(/undefined|EXERCICES PRATIQUES/);
        expect(REC30_EXERCICES_COMPLETS.some(e => txt.includes(e.titre)), `QCM ${exerciceIdx}`).toBe(true);
        const lettres = [...txt.matchAll(/Réponse du stagiaire : ([A-D])\b/g)].map(m => m[1]);
        expect(lettres, `QCM ${exerciceIdx} stagiaire ${si}`).toHaveLength(10);
        return lettres.join("");
      });
      expect(new Set(reponses).size, `QCM ${exerciceIdx}`).toBeGreaterThan(1);
    }
  }, 120_000);

  it("dossier AF complet généré pour cet intitulé : aucun code RNCP, aucun autre code RS (RS7332 seulement en veille), aucun « undefined »", async () => {
    const { getFullCatalog, generateDocumentById } = await import("@/lib/documentGenerator");
    const f = { ...formationDossier };
    seedREC30AICaches(f);
    const fuites: string[] = [];
    const undef: string[] = [];
    const avecRS7332: string[] = [];
    const catalogue = getFullCatalog(org, f, stagiaires);
    expect(catalogue.length).toBeGreaterThan(50);
    let generes = 0;
    for (const d of catalogue) {
      let html = "";
      try { html = generateDocumentById(d.id, d.template, d.params, org, f, stagiaires) || ""; } catch { continue; }
      if (html) generes++;
      const texte = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      const re = DOCS_ORGANISME.test(d.id) ? HORS_FORMATION : INTERDITS_HORS_VEILLE;
      const m = texte.match(new RegExp(`.{0,60}(${re.source}).{0,60}`, "i"));
      if (m) fuites.push(`${d.id} — ${d.nom} : …${m[0]}…`);
      if (/\bRS\s?7332\b/.test(texte)) avecRS7332.push(`${d.id} — ${d.nom}`);
      const u = texte.match(/.{0,60}\bundefined\b.{0,60}/);
      if (u) undef.push(`${d.id} — ${d.nom} : …${u[0]}…`);
    }
    expect(generes).toBeGreaterThan(50);
    expect(fuites).toEqual([]);
    expect(undef).toEqual([]);
    // RS7332 n'apparaît que là où l'échéance de RS6168 est expliquée : veille réglementaire (IND 23) et support de cours (IND 19)
    expect(avecRS7332.length).toBeGreaterThan(0);
    expect(avecRS7332.every(x => /veille|i23|support_cours/i.test(x)), avecRS7332.join("\n")).toBe(true);
  }, 600_000);
});
