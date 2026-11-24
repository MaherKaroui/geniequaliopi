import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_ECO21, ECO21_EXERCICES, ECO21_QCM_COMPETENCES, ECO21_QCM_DEBUT, ECO21_QCM_FIN,
  ECO21_QCM_DEBUT_EXPLICATIONS, ECO21_VIDEOS,
  ECO21_CONTENT_PACK, ECO21_EVAL_PACK, ECO21_VEILLE_PACK, seedECO21AICaches,
} from "@/lib/ecommerce21hPreset";
import {
  isECO21Formation, getECO21AutoAnswers, getECO21EvalBesoins, getECO21Besoin, pickECO21ExerciceAnswer,
  eco21NoteDebutSur20, eco21BonnesQcmDebut, eco21ReponsesQcmDebut, eco21NoteExercice, eco21Seed,
  ECO21_QUESTIONS_OUVERTES,
} from "@/lib/ecommerce21hHumanized";
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
 * Formation certifiante au Répertoire spécifique : seul le code RS6475 est autorisé. Aucun code RNCP, aucun
 * autre code RS, aucun TOEIC. Le jury de 2 membres de la fiche RS6475 est, lui, cité volontairement.
 */
const INTERDITS = /RNCP\s?\d|\bRS\s?(?!6475\b)\d{3,4}|TOEIC/i;
const INTERDITS_SOURCES = new RegExp(`${INTERDITS.source}|\\bRNCP\\b|titre professionnel`, "i");

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

/** Mot attendu dans chacune des 8 copies de chaque mise en situation (C1 à C7). */
const MOTS_EXERCICES = [
  /plateforme|arborescence/, /fiches? produits?/, /paiement|livraison|rétractation|CGV/, /mots?-clés?|référencement|balise/,
  /planning|publication|réseau|campagne/, /accessibilit|RGAA/, /stock/, /conversion|statistique|Analytics|Matomo/,
  /fidélis/, /données|RGPD/,
];

/** Autres détecteurs de formations exemples : aucun ne doit capter cet intitulé. */
const AUTRES = [isVTC48Formation, isHYG14Formation, isCOH21Formation, isGSC35Formation, isIAP21Formation, isMSP21Formation, isANG40Formation, isARH41366Formation, isLRBFormation, isTVTEFormation, isWM14Formation, isRPMSFormation];

const LETTRE_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
const COMPETENCES = ["C1", "C2", "C3", "C4", "C5", "C6", "C7"];

/** « 3 h 30 » → 3,5 ; « 2 h » → 2 */
const heures = (h: string, min?: string) => parseInt(h) + (min ? parseInt(min) / 60 : 0);

describe("Créer et développer une e-boutique professionnelle (RS6475) – 21 h — formation exemple certifiante", () => {
  it("données de la formation : RS6475, 21 h sur 4 semaines (6 classes virtuelles de 3 h 30), distanciel, 1 250 € net de TVA", () => {
    const f = FORMATION_ECO21;
    expect(f.intitule).toBe("Créer et développer une e-boutique professionnelle (RS6475) – 21 h");
    expect(f.codeRNCP).toBe("RS6475");
    expect(f.duree).toBe("21 heures sur 4 semaines (6 classes virtuelles de 3 h 30)");
    expect(f.dureeSaisiePrioritaire).toBe(true);
    expect(f.modalites).toBe("distanciel");
    expect(f.tarif).toMatch(/^1 250 € net de TVA/);
    expect(f.tarif).toMatch(/261-4-4°a du CGI/);
    expect(f.lieu).toBe("Google Meet / Zoom");
    expect(f.formateur).toBe("Say LY");
    expect(f.prerequis).toMatch(/B1/);
    expect(f.prerequis).toMatch(/client FTP/);
    expect(f.publicVise).toMatch(/porteurs de projet e-commerce/i);
    expect(f.moyensPedagogiques).toMatch(/classes virtuelles/);
    expect(f.moyensPedagogiques).toMatch(/24 h\/24/);
    expect(f.moyensPedagogiques).toMatch(/Inès/);
    expect(f.objectifs).toMatch(/Répertoire spécifique sous le code RS6475/);
    expect(f.objectifs).toMatch(/DIDACTIZ/);
    for (const k of COMPETENCES) expect(f.objectifs).toContain(k);
    expect(f.objectifs).not.toContain("C8");
    // Programme « Module N — Titre (Cx, N h [MM]) : … », 21 h au total, découpage de la spécification
    const modules = [...f.programme.matchAll(/^Module (\d) — [^\n]+\((C\d), (\d+) h(?: (\d+))?\) : [^\n]+;/gm)];
    expect(modules.map(m => m[1])).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
    expect(modules.map(m => m[2])).toEqual(COMPETENCES);
    expect(modules.map(m => heures(m[3], m[4]))).toEqual([3.5, 3.5, 3.5, 2.5, 2.5, 3, 2.5]);
    expect(modules.reduce((t, m) => t + heures(m[3], m[4]), 0)).toBe(21);
    expect(f.programme).not.toContain("Module 8");
    // 6 séances de 3 h 30, 09h00 – 12h30, semaines 1, 1, 2, 2, 3, 4
    const seances = [...f.programme.matchAll(/^SÉANCE (\d) — Semaine (\d), classe virtuelle de 09h00 à 12h30 \(3 h 30\)$/gm)];
    expect(seances.map(m => m[1])).toEqual(["1", "2", "3", "4", "5", "6"]);
    expect(seances.map(m => m[2])).toEqual(["1", "1", "2", "2", "3", "4"]);
    // Horaires de la spécification : C4 09h00 – 11h30, C5 11h30 – 12h30 puis 09h00 – 10h30, C6 10h30 – 12h30 puis 09h00 – 10h00, C7 10h00 – 12h30
    expect(f.programme).toMatch(/\(C4, 2 h 30\) : 09h00 – 11h30/);
    expect(f.programme).toMatch(/\(C5, 2 h 30\) : sur deux séances, 11h30 – 12h30 en séance 4 puis 09h00 – 10h30 en séance 5/);
    expect(f.programme).toMatch(/\(C6, 3 h\) : sur deux séances, 10h30 – 12h30 en séance 5 puis 09h00 – 10h00 en séance 6/);
    expect(f.programme).toMatch(/\(C7, 2 h 30\) : 10h00 – 12h30 ;[^\n]+préparation aux deux épreuves du certificateur/);
    const textes = [f.duree, f.programme, f.methodesEvaluation, f.delaiAcces, f.moyensPedagogiques].join(" ");
    expect(textes).not.toMatch(/13h30|17h00/);
    expect(f.dateDebut).toBe("2026-11-30");
    expect(f.dateFin).toBe("2026-12-21");
    // Les dates de la session ne dépassent pas l'échéance de la fiche RS6475 (21/12/2026)
    expect(f.dateFin <= "2026-12-21").toBe(true);
    // Les deux épreuves du certificateur
    expect(f.methodesEvaluation).toMatch(/QCM[^.]*\(20 minutes\)/);
    expect(f.methodesEvaluation).toMatch(/mise en situation professionnelle \(2 h 45\)/);
    expect(f.methodesEvaluation).toMatch(/Jury de 2 membres/);
    expect(f.methodesEvaluation).toMatch(/règlement du certificateur/);
    expect(f.methodesEvaluation).toMatch(/certificat de réalisation/);
    expect(f.delaiAcces).toMatch(/14 jours ouvrables/);
    expect(f.delaiAcces).toMatch(/11 jours ouvrés/);
    // Indicateurs et satisfaction vides
    expect(f.tauxSatisfaction).toBeUndefined();
    expect(f.nombreAvisSatisfaction).toBeUndefined();
    expect(f.tauxAssiduite).toBeUndefined();
    expect(f.nombreStagiairesFormes).toBeUndefined();
  });

  it("sélection : variantes RS6475 / e-boutique 21 h reconnues, autres formations jamais captées", () => {
    expect(isECO21Formation(FORMATION_ECO21.intitule, FORMATION_ECO21.codeRNCP)).toBe(true);
    for (const v of [
      "Créer et développer une e-boutique professionnelle – 21 h", "E-BOUTIQUE PROFESSIONNELLE 21H", "Créer son e-boutique (21 heures)",
      "Préparation RS6475", "Certification RS 6475 – e-commerce",
    ]) expect(isECO21Formation(v), v).toBe(true);
    expect(isECO21Formation("Formation e-commerce", "RS6475")).toBe(true);
    expect(isECO21Formation("Formation", "RS 6475")).toBe(true);
    for (const v of [
      "Formation e-commerce", "E-commerce – 21 h", "Créer et développer une e-boutique professionnelle", "Créer son e-boutique – 35 h",
      "Webmarketing – 14 h", "Développer son activité avec le webmarketing", "Création d'entreprise",
      "Titre Professionnel Négociateur Technico-Commercial", "CRM et relation client – 21 h", "Réseaux sociaux – e-boutique 21 h",
      "Bilan de compétences – e-boutique 21 h", "Gérer son centre de formation – 35 h", "",
    ]) expect(isECO21Formation(v), v).toBe(false);
    expect(isECO21Formation(undefined)).toBe(false);
    // Un autre code de répertoire saisi l'emporte sur l'intitulé
    expect(isECO21Formation("Créer son e-boutique – 21 h", "RS5637")).toBe(false);
    expect(isECO21Formation("Créer son e-boutique – 21 h", "RNCP12345")).toBe(false);
    // Aucun autre preset ne capte l'intitulé
    for (const is of AUTRES) expect(is(FORMATION_ECO21.intitule, FORMATION_ECO21.codeRNCP), is.name).toBe(false);
    // Seule la formation exemple est captée dans la liste d'exemples, et aucune fiche du référentiel hors RS6475
    const captees = SAMPLE_FORMATIONS.filter(f => isECO21Formation(f.intitule, f.codeRNCP));
    expect(captees.map(f => f.intitule)).toEqual([FORMATION_ECO21.intitule]);
    expect(RNCP_FICHES.filter(f => isECO21Formation(f.intitule, f.code) && f.code !== "RS6475").map(f => f.code)).toEqual([]);
  });

  it("7 QCM de 10 questions (un par compétence), au format du générateur, sans « A) » dans les énoncés", () => {
    expect(ECO21_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(COMPETENCES);
    for (const ex of ECO21_QCM_COMPETENCES) {
      const { questions, correct } = parseQCM(ex.consigne, ex.reponseAttendue);
      expect(questions, ex.titre).toHaveLength(10);
      expect(ex.points).toBe(10);
      questions.forEach(q => {
        expect(q.opts.length, `${ex.titre} Q${q.num}`).toBeGreaterThanOrEqual(2);
        expect(q.opts.length, `${ex.titre} Q${q.num}`).toBeLessThanOrEqual(4);
        expect(q.enonce.length, `${ex.titre} Q${q.num}`).toBeGreaterThan(10);
        expect(q.enonce, `${ex.titre} Q${q.num}`).not.toMatch(/[A-D]\)/);
        expect(correct[q.num], `${ex.titre} Q${q.num}`).toMatch(/^[A-D]$/);
        expect(LETTRE_INDEX[correct[q.num]], `${ex.titre} Q${q.num}`).toBeLessThan(q.opts.length);
      });
      expect(new Set(Object.values(correct)).size, ex.titre).toBeGreaterThanOrEqual(3);
    }
    expect(ECO21_EXERCICES).toHaveLength(10);
    ECO21_EXERCICES.forEach((e, i) => expect(e.titre).toMatch(new RegExp(`^Exercice ${i + 1} — C[1-7]`)));
    // Chaque compétence a au moins une mise en situation
    expect(new Set(ECO21_EXERCICES.map(e => e.titre.match(/C\d/)![0]))).toEqual(new Set(COMPETENCES));
    expect(ECO21_QCM_DEBUT).toHaveLength(10);
    expect(ECO21_QCM_DEBUT_EXPLICATIONS).toHaveLength(10);
    expect(ECO21_QCM_FIN).toHaveLength(10);
    for (const q of [...ECO21_QCM_DEBUT, ...ECO21_QCM_FIN]) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
    expect(new Set(ECO21_QCM_DEBUT.map(q => q.correctIndex)).size).toBe(4);
    expect(new Set(ECO21_QCM_FIN.map(q => q.correctIndex)).size).toBeGreaterThanOrEqual(3);
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = ECO21_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = ECO21_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/plateforme/);
    expect(fin[1]).toMatch(/fiche produit/);
    expect(fin[2]).toMatch(/pages légales/);
    expect(fin[3]).toMatch(/référencement/);
    expect(fin[4]).toMatch(/réseaux sociaux/);
    expect(fin[5]).toMatch(/accessibilité/);
    expect(fin[6]).toMatch(/stocks/);
    expect(fin[7]).toMatch(/statistiques/);
    expect(fin[8]).toMatch(/fidélisation/);
    expect(fin[9]).toMatch(/RGPD/);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getECO21AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getECO21AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getECO21AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(eco21Seed("MARTIN", "Sophie")).toBe(eco21Seed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    ECO21_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickECO21ExerciceAnswer(FORMATION_ECO21.intitule, "RS6475", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickECO21ExerciceAnswer(FORMATION_ECO21.intitule, "RS6475", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickECO21ExerciceAnswer(FORMATION_ECO21.intitule, "", 0, 0, { ...noms[0], entreprise: "BOUTIQUE TEST" }, ECO21_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/BOUTIQUE TEST/);
    expect(pickECO21ExerciceAnswer("Webmarketing – 14 h", "", 0, 0, noms[0], "C1")).toBeNull();
    // Accords : aucune forme féminine dans une copie au masculin
    const copies = (civilite: string) => ECO21_EXERCICES.flatMap((ex, ei) => Array.from({ length: 8 }, (_, i) =>
      pickECO21ExerciceAnswer(FORMATION_ECO21.intitule, "", ei, i, { ...noms[i], civilite }, ex.titre))).join(" ");
    expect(copies("M.")).toMatch(/débutant en informatique/);
    expect(copies("Mme")).toMatch(/débutante en informatique/);
    expect(copies("M.")).not.toMatch(/débutante/);
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, 6 classes virtuelles de 09h00 à 12h30", () => {
    const besoins = noms.map((s, i) => getECO21EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /6 classes virtuelles/.test(b.disponibilites) && /09h00/.test(b.disponibilites) && /12h30/.test(b.disponibilites) && !/17h00|13h30/.test(b.disponibilites))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getECO21Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getECO21EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
    // Accords du profil « création d'activité »
    const projets = (civilite: string) => noms.map((s, i) => getECO21EvalBesoins({ ...s, civilite }, false, i).projetPro).join(" ");
    expect(projets("M.")).toMatch(/créateur d'entreprise/);
    expect(projets("Mme")).toMatch(/créatrice d'entreprise/);
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => eco21NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    for (let i = 0; i < 100; i++) {
      const tot = getECO21AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      const rep = eco21ReponsesQcmDebut(ECO21_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === ECO21_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(eco21BonnesQcmDebut(ECO21_QCM_DEBUT.length, i));
      expect(rep).toHaveLength(10);
      rep.forEach((r, qi) => { expect(r).toBeGreaterThanOrEqual(0); expect(r).toBeLessThan(ECO21_QCM_DEBUT[qi].options.length); });
      expect(bonnes).toBeGreaterThanOrEqual(2);
      expect(bonnes).toBeLessThanOrEqual(6);
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 17; ex++) {
      expect(new Set(Array.from({ length: 5 }, (_, i) => eco21NoteExercice(i, ex, true))).size).toBe(5);
      expect(new Set(Array.from({ length: 6 }, (_, i) => eco21NoteExercice(i, ex, false))).size).toBe(6);
      expect(Math.max(...Array.from({ length: 12 }, (_, i) => eco21NoteExercice(i, ex, true)))).toBeLessThanOrEqual(10);
    }
  });

  it("certifiante RS6475 : aucun code RNCP ni autre code RS, aucun barème ni statistique inventés, veille complète", () => {
    const sources = [
      "src/lib/ecommerce21hPreset.ts", "src/lib/ecommerce21hHumanized.ts", "src/lib/courseContentEcommerce21h.ts",
    ];
    for (const p of sources) expect(lire(p).replace(/codeRNCP/g, ""), p).not.toMatch(INTERDITS_SOURCES);
    expect(lire("src/lib/ecommerce21hHumanized.ts")).not.toMatch(/[A-D]\)/);
    const packs = JSON.stringify([ECO21_CONTENT_PACK, ECO21_EVAL_PACK, ECO21_VEILLE_PACK, ECO21_QUESTIONS_OUVERTES, FORMATION_ECO21])
      .replace(/codeRNCP/g, "").replace(/https?:\/\/[^"]+/g, "");
    expect(packs).not.toMatch(INTERDITS_SOURCES);
    // Aucun barème, aucun seuil de réussite écrits : renvoi au règlement du certificateur
    expect(packs).not.toMatch(/coefficient \d|\bcoef\.? ?\d|note éliminatoire|seuil de réussite|(?<!\d)\d{1,2} ?\/ ?20(?!\d)/i);
    // Aucune statistique ni taux de satisfaction ou de réussite (le « plus de 90 » du site n'est pas repris)
    expect(packs).not.toMatch(/\d+\s?%/);
    expect(packs).not.toMatch(/taux de (satisfaction|réussite)/i);
    // Veille réglementaire : fiche RS6475 (échéance 21/12/2026), EAA (28/06/2025), RGAA, RGPD et cookies
    const regl = JSON.stringify(ECO21_VEILLE_PACK.reglementaire);
    expect(regl).toContain("https://www.francecompetences.fr/recherche/rs/6475/");
    expect(regl).toMatch(/21\/12\/2026/);
    expect(regl).toMatch(/21\/06\/2027/);
    expect(regl).toMatch(/28 juin 2025/);
    expect(regl).toMatch(/2019\/882/);
    expect(regl).toMatch(/RGAA/);
    expect(regl).toMatch(/RGPD/);
    expect(regl).toMatch(/cookies/);
    expect(ECO21_VEILLE_PACK.metier.length).toBeGreaterThan(0);
    expect(ECO21_VEILLE_PACK.technologique.length).toBeGreaterThan(0);
    // Vidéos : uniquement des recherches YouTube déjà présentes dans le dépôt, jamais d'identifiant inventé
    const depot = lire("src/lib/webmarketing14hPreset.ts");
    for (const v of ECO21_VIDEOS) {
      expect(v.url).toMatch(/^https:\/\/www\.youtube\.com\/results\?search_query=/);
      expect(depot, v.url).toContain(v.url);
    }
    // Fil rouge fictif
    expect(packs).toMatch(/Inès/);
    expect(packs).toMatch(/fictif/);
  });
});

describe("Créer et développer une e-boutique professionnelle (RS6475) – 21 h — câblage", () => {
  it("le support de cours compte 7 chapitres (un par compétence), avant les règles webmarketing / e-commerce", async () => {
    const { getCourseChapters, getYoutubeVideos } = await import("@/lib/courseContent");
    const { getEcommerce21hChapters } = await import("@/lib/courseContentEcommerce21h");
    const chapitres = getEcommerce21hChapters();
    expect(chapitres).toHaveLength(7);
    chapitres.forEach((c, i) => expect(c.title, c.title).toMatch(new RegExp(`^Chapitre ${i + 1} – `)));
    for (const titre of [FORMATION_ECO21.intitule, "Créer son e-boutique – 21 h", "Préparation RS6475"]) {
      expect(getCourseChapters(titre), titre).toEqual(chapitres);
    }
    // Les autres formations du numérique gardent leur support
    for (const titre of ["Webmarketing – 14 h", "Développer son activité avec le webmarketing", "Formation e-commerce"]) {
      expect(getCourseChapters(titre)[0]?.title, titre).not.toBe(chapitres[0].title);
    }
    for (const c of chapitres) {
      expect(c.sections.length, c.title).toBeGreaterThan(0);
      expect(c.sections.every(s => !s.content.includes("${")), c.title).toBe(true);
    }
    expect(JSON.stringify(chapitres)).not.toMatch(INTERDITS);
    expect(getYoutubeVideos(FORMATION_ECO21.intitule)).toBe(ECO21_CONTENT_PACK.ressources.videos);
    expect(getYoutubeVideos("Développer son activité avec le webmarketing")).not.toBe(ECO21_VIDEOS);
  }, 60_000);

  it("l'évaluation utilise les mises en situation et QCM du preset ; les autres formations gardent leur contenu", { timeout: 60_000 }, async () => {
    const { getEvalContent, hasEvalContentDedie } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_ECO21.intitule);
    expect(ev.exercices[0].titre).toBe(ECO21_EXERCICES[0].titre);
    expect(ev.qcmPositionnement).toEqual(ECO21_QCM_DEBUT);
    expect(ev.competences).toHaveLength(7);
    expect(ev.appreciations).toHaveLength(7);
    expect(JSON.stringify(ev)).not.toMatch(INTERDITS);
    expect(hasEvalContentDedie("Créer son e-boutique – 21 h")).toBe(true);
    expect(getEvalContent("Créer son e-boutique – 21 h").exercices[0].titre).toBe(ECO21_EXERCICES[0].titre);
    for (const t of ["Formation e-commerce", "Webmarketing – 14 h", "Création d'entreprise", "Titre Professionnel Négociateur Technico-Commercial"]) {
      expect(getEvalContent(t).qcmPositionnement, t).not.toEqual(ECO21_QCM_DEBUT);
    }
    for (const f of SAMPLE_FORMATIONS.filter(x => !isECO21Formation(x.intitule, x.codeRNCP))) {
      expect(getEvalContent(f.intitule).qcmPositionnement, f.intitule).not.toEqual(ECO21_QCM_DEBUT);
    }
  });

  it("dossier AF complet généré pour cet intitulé : aucun code RNCP, aucun autre code RS, aucun TOEIC", async () => {
    const { getFullCatalog, generateDocumentById } = await import("@/lib/documentGenerator");
    const org: OrganismeInfo = {
      nom: "ORGANISME TEST E-COMMERCE", siret: "912 345 678 00019", adresse: "1 rue de l'Essai", codePostal: "83000", ville: "Toulon",
      telephone: "04 00 00 00 00", email: "contact@organisme-test.fr", siteWeb: "", nda: "93 83 99999 83",
      dirigeant: "Paul TESTARD", responsablePedagogique: "Paul TESTARD", referentHandicap: "Paul TESTARD",
      referentQualite: "Paul TESTARD", poleAdministratif: "Paul TESTARD", relationEntreprises: "Paul TESTARD",
      referentMobilite: "Paul TESTARD", domainesFormation: "Commerce en ligne", typesActions: ["actions-formation"],
      certifications: "", outilsUtilises: "Google Meet, Zoom", version: "1", dateMaj: "2026-11-24",
    };
    const f = { ...FORMATION_ECO21 };
    const stagiaires: StagiaireInfo[] = [
      { civilite: "Mme", nom: "ALPHA", prenom: "Claire", email: "claire.alpha@exemple.fr", telephone: "06 10 20 30 40", entreprise: "", poste: "Créatrice d'entreprise", dateNaissance: "1985-04-12", financeur: "CPF" },
      { civilite: "M.", nom: "BRAVO", prenom: "Julien", email: "julien.bravo@exemple.fr", telephone: "06 11 21 31 41", entreprise: "", poste: "Commerçant", dateNaissance: "1990-09-03", financeur: "CPF" },
      { civilite: "M.", nom: "CHARLIE", prenom: "Yanis", email: "yanis.charlie@exemple.fr", telephone: "06 12 22 32 42", entreprise: "", poste: "Demandeur d'emploi", dateNaissance: "1995-01-27", financeur: "Personnel" },
    ];
    seedECO21AICaches(f);
    const fuites: string[] = [];
    const catalogue = getFullCatalog(org, f, stagiaires);
    expect(catalogue.length).toBeGreaterThan(50);
    let generes = 0;
    for (const d of catalogue) {
      let html = "";
      try { html = generateDocumentById(d.id, d.template, d.params, org, f, stagiaires) || ""; } catch { continue; }
      if (html) generes++;
      const texte = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      const re = DOCS_ORGANISME.test(d.id) ? HORS_FORMATION : INTERDITS;
      const m = texte.match(new RegExp(`.{0,60}(${re.source}).{0,60}`, "i"));
      if (m) fuites.push(`${d.id} — ${d.nom} : …${m[0]}…`);
    }
    expect(generes).toBeGreaterThan(50);
    expect(fuites).toEqual([]);
  }, 600_000);
});
