import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_IAE67, IAE67_EXERCICES, IAE67_QCM_COMPETENCES, IAE67_EXERCICES_COMPLETS, IAE67_QCM_DEBUT, IAE67_QCM_FIN,
  IAE67_QCM_DEBUT_EXPLICATIONS, IAE67_VIDEOS,
  IAE67_CONTENT_PACK, IAE67_EVAL_PACK, IAE67_VEILLE_PACK, seedIAE67AICaches,
} from "@/lib/iaEntreprise67hPreset";
import {
  isIAE67Formation, getIAE67AutoAnswers, getIAE67EvalBesoins, getIAE67Besoin,
  iae67NoteDebutSur20, iae67BonnesQcmDebut, iae67ReponsesQcmDebut, iae67NoteExercice, iae67Seed,
  IAE67_QUESTIONS_OUVERTES,
} from "@/lib/iaEntreprise67hHumanized";
import { FORMATION_IAP21 } from "@/lib/iaPro21hPreset";
import { isREC30Formation } from "@/lib/recrutement30hHumanized";
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
import type { OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";

const lire = (p: string) => readFileSync(resolve(process.cwd(), p), "utf-8");

/**
 * Action de formation NON CERTIFIANTE : aucun code de répertoire, aucune certification, aucun certificateur,
 * aucun jury, aucune épreuve, aucun CPF, aucune mention de France Compétences.
 */
const INTERDITS = /RNCP|\bRS\s?\d{3,4}|RS6|\bCPF\b|France Compétences|\bjury|certification|certificateur|épreuve|formation certifiante|titre professionnel|TOEIC/i;
/** Dans les documents générés : pas de code de répertoire (les procédures générales peuvent citer la certification Qualiopi). */
const CODES = /RNCP\s?\d|\bRS\s?\d{3,4}|TOEIC/i;

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
  nom: `NOM${i}`, prenom: i % 2 ? "Julie" : "Karim", civilite: i % 2 ? "Mme" : "M.", entreprise: "ARVELIA TEST",
}));

/** Autres détecteurs de formations exemples : aucun ne doit capter cet intitulé. */
const AUTRES = [isREC30Formation, isECO21Formation, isVTC48Formation, isHYG14Formation, isCOH21Formation, isGSC35Formation, isIAP21Formation, isMSP21Formation, isANG40Formation, isARH41366Formation, isLRBFormation, isTVTEFormation, isWM14Formation, isRPMSFormation];

const LETTRE_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
const COMPETENCES = ["C1", "C2", "C3", "C4", "C5", "C6"];
const IA_GENERATIVE = "Création de contenus rédactionnels et visuels par l'usage responsable de l'intelligence artificielle générative";

describe("Intelligence artificielle en entreprise – 67 h — action de formation non certifiante", () => {
  it("données de la formation : 67 h en 10 jours (9 × 7 h + 1 × 4 h), distanciel, 840 € HT, aucun code", () => {
    const f = FORMATION_IAE67;
    expect(f.intitule).toBe("Intelligence artificielle en entreprise : déployer les usages de l'IA dans les métiers – 67 h");
    expect(f.codeRNCP).toBe("");
    expect(f.duree).toBe("67 heures (10 jours : 9 × 7 h + 1 × 4 h)");
    expect(f.dureeSaisiePrioritaire).toBe(true);
    expect(f.modalites).toBe("distanciel");
    expect(f.tarif).toBe("840 € HT par stagiaire");
    expect(f.lieu).toBe("Google Meet / Zoom");
    expect(f.formateur).toBe("Julien LOUBINOUX");
    expect(f.nombreParticipants).toBe("6");
    expect(f.dateDebut).toBe("2025-03-03");
    expect(f.dateFin).toBe("2025-03-14");
    expect(f.publicVise).toMatch(/Salariés et managers d'entreprise/);
    expect(f.prerequis).toMatch(/Aucun prérequis technique/);
    expect(f.prerequis).toMatch(/entretien préalable/);
    for (const k of COMPETENCES) expect(f.objectifs).toContain(`- ${k} — `);
    expect(f.objectifs).not.toContain("C7");
    expect(f.objectifs).toMatch(/UE 2024\/1689/);
    // Programme « Jour N — Titre (compétences, N h) : … » : 10 jours, 67 h au total, 9 × 7 h puis 4 h
    const jours = [...f.programme.matchAll(/^Jour (\d+) — [^\n]+?\((C[^)]*), (\d) h\) : [^\n]+/gm)];
    expect(jours.map(m => m[1])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
    expect(jours.map(m => parseInt(m[3]))).toEqual([7, 7, 7, 7, 7, 7, 7, 7, 7, 4]);
    expect(jours.reduce((t, m) => t + parseInt(m[3]), 0)).toBe(67);
    expect(jours.map(m => m[2].match(/C\d/)![0])).toEqual(["C1", "C1", "C2", "C3", "C3", "C4", "C5", "C6", "C1", "C1"]);
    expect(f.programme).toMatch(/cas pratique intermédiaire \(C1 à C3\)/);
    expect(f.programme).toMatch(/2 février 2025/);
    expect(f.programme).toMatch(/2 août 2026/);
    expect(f.programme).toMatch(/personnage et entreprise fictifs/);
    // Évaluation interne, attestation et certificat de réalisation
    expect(f.methodesEvaluation).toMatch(/évaluation finale interne/);
    expect(f.methodesEvaluation).toMatch(/attestation de fin de formation/);
    expect(f.methodesEvaluation).toMatch(/certificat de réalisation/);
    expect(f.delaiAcces).toMatch(/plan de développement des compétences/);
    // Aucune mention de répertoire, de certification ni de CPF dans la formation
    const tout = JSON.stringify(f).replace(/codeRNCP/g, "");
    for (const mot of [/RNCP/i, /RS6/i, /\bCPF\b/i, /certification/i, /certificateur/i, /jury/i, /épreuve/i, /France Compétences/i]) {
      expect(tout, String(mot)).not.toMatch(mot);
    }
    // Indicateurs et satisfaction vides
    expect(f.tauxSatisfaction).toBeUndefined();
    expect(f.nombreAvisSatisfaction).toBeUndefined();
    expect(f.tauxAssiduite).toBeUndefined();
    expect(f.nombreStagiairesFormes).toBeUndefined();
  });

  it("dates : 10 jours ouvrés du lundi 3 au vendredi 14 mars 2025", () => {
    const d0 = new Date(FORMATION_IAE67.dateDebut + "T12:00:00Z");
    const d1 = new Date(FORMATION_IAE67.dateFin + "T12:00:00Z");
    expect(d0.getUTCDay()).toBe(1);
    expect(d1.getUTCDay()).toBe(5);
    let ouvres = 0;
    for (let d = new Date(d0); d <= d1; d.setUTCDate(d.getUTCDate() + 1)) if (d.getUTCDay() % 6 !== 0) ouvres++;
    expect(ouvres).toBe(10);
  });

  it("sélection : « intelligence artificielle en entreprise » ou « IA en entreprise » + 67 h ; jamais IA 21 h ni IA générative", () => {
    expect(isIAE67Formation(FORMATION_IAE67.intitule, FORMATION_IAE67.codeRNCP)).toBe(true);
    for (const v of [
      "Intelligence artificielle en entreprise : déployer les usages de l'IA dans les métiers – 67 h",
      "INTELLIGENCE ARTIFICIELLE EN ENTREPRISE – 67H", "IA en entreprise - 67 h", "L’IA en entreprise (67 h)",
      "Intelligence artificielle en entreprise : déployer les usages de l’IA dans les métiers - 67h",
    ]) expect(isIAE67Formation(v), v).toBe(true);
    for (const v of [
      FORMATION_IAP21.intitule, IA_GENERATIVE, "Intelligence artificielle en entreprise", "Intelligence artificielle en entreprise – 21 h",
      "IA en entreprise – 14 h", "Intelligence artificielle – 67 h", "Intégrer les outils d'IA dans son activité professionnelle – 21 h",
      "IA générative – 67 h", "Formation IA", "",
    ]) expect(isIAE67Formation(v), v).toBe(false);
    expect(isIAE67Formation(undefined)).toBe(false);
    // Un code de répertoire saisi exclut la formation (non certifiante)
    expect(isIAE67Formation(FORMATION_IAE67.intitule, "RS6776")).toBe(false);
    expect(isIAE67Formation(FORMATION_IAE67.intitule, "RNCP37000")).toBe(false);
    // Exclusion croisée avec l'IA 21 h et l'IA générative
    expect(isIAP21Formation(FORMATION_IAE67.intitule, FORMATION_IAE67.codeRNCP)).toBe(false);
    expect(isIAE67Formation(FORMATION_IAP21.intitule, FORMATION_IAP21.codeRNCP)).toBe(false);
    expect(isIAE67Formation(IA_GENERATIVE, "RS6776")).toBe(false);
    // Aucun autre preset ne capte l'intitulé
    for (const is of AUTRES) expect(is(FORMATION_IAE67.intitule, FORMATION_IAE67.codeRNCP), is.name).toBe(false);
    // Seule la formation exemple est captée dans la liste d'exemples
    const captees = SAMPLE_FORMATIONS.filter(f => isIAE67Formation(f.intitule, f.codeRNCP));
    expect(captees.map(f => f.intitule)).toEqual([FORMATION_IAE67.intitule]);
  });

  it("10 mises en situation (QCM d'entraînement) + 6 QCM par compétence, au format lettré du générateur", () => {
    expect(IAE67_EXERCICES).toHaveLength(10);
    IAE67_EXERCICES.forEach((e, i) => expect(e.titre).toMatch(new RegExp(`^QCM ${i + 1} — C[1-6] : `)));
    const comp = IAE67_EXERCICES.map(e => e.titre.match(/C\d/)![0]);
    expect(comp).toEqual(["C1", "C1", "C2", "C2", "C3", "C3", "C4", "C5", "C6", "C6"]);
    expect(IAE67_QCM_COMPETENCES.map(q => q.titre.match(/^QCM (C\d) — /)![1])).toEqual(COMPETENCES);
    expect(IAE67_EXERCICES_COMPLETS).toEqual([...IAE67_EXERCICES, ...IAE67_QCM_COMPETENCES]);
    const enonces = new Set<string>();
    for (const ex of IAE67_EXERCICES_COMPLETS) {
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
      expect((ex.consigne.match(/[A-D]\)/g) || []).length, ex.titre).toBe(questions.reduce((t, q) => t + q.opts.length, 0));
      expect(new Set(Object.values(correct)).size, ex.titre).toBeGreaterThanOrEqual(3);
    }
    expect(IAE67_QCM_DEBUT).toHaveLength(10);
    expect(IAE67_QCM_DEBUT_EXPLICATIONS).toHaveLength(10);
    expect(IAE67_QCM_FIN).toHaveLength(10);
    for (const q of [...IAE67_QCM_DEBUT, ...IAE67_QCM_FIN]) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
    expect(new Set(IAE67_QCM_DEBUT.map(q => q.correctIndex)).size).toBe(4);
    expect(new Set(IAE67_QCM_FIN.map(q => q.correctIndex)).size).toBe(4);
  });

  it("évaluations : cas intermédiaire en fin de jour 5 (4 questions) et évaluation finale interne du jour 10 (C1 à C6, grille)", () => {
    const ei = IAE67_EVAL_PACK.exerciceIntermediaire;
    expect(ei.titre).toMatch(/fin du jour 5/);
    expect(ei.questions).toHaveLength(4);
    expect(ei.contexte).toMatch(/fictifs/);
    const fin = IAE67_EVAL_PACK.evaluationFinale;
    expect(fin.titre).toMatch(/jour 10/);
    expect(fin.exercices).toHaveLength(5);
    expect(fin.exercices.flatMap(e => e.titre.match(/C\d/g)!)).toEqual(COMPETENCES);
    expect(fin.exercices.reduce((t, e) => t + e.points, 0)).toBe(100);
    fin.exercices.forEach(e => expect(e.reponseAttendue, e.titre).toMatch(/Grille : /));
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = IAE67_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = IAE67_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/limites de l'IA/);
    expect(fin[1]).toMatch(/outils/);
    expect(fin[2]).toMatch(/prompt/);
    expect(fin[3]).toMatch(/vérifiez/);
    expect(fin[4]).toMatch(/relation client/);
    expect(fin[5]).toMatch(/reporting/);
    expect(fin[6]).toMatch(/automatisation/);
    expect(fin[7]).toMatch(/légales/);
    expect(fin[8]).toMatch(/cas d'usage/);
    expect(fin[9]).toMatch(/feuille de route/);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question, aucun corrigé recopié", () => {
    const corriges = [...IAE67_QUESTIONS_OUVERTES.debut, ...IAE67_QUESTIONS_OUVERTES.fin].map(q => q.reponseAttendue);
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getIAE67AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r) && !corriges.includes(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.every(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getIAE67AutoAnswers("MARTIN", "Claire", "Mme", true);
    expect(getIAE67AutoAnswers("Martin", "claire", "Mme", true)).toEqual(a);
    expect(iae67Seed("MARTIN", "Claire")).toBe(iae67Seed("martin", "CLAIRE"));
    // Accords
    const fins = (civilite: string) => noms.map((s, i) => getIAE67AutoAnswers(s.nom, s.prenom, civilite, false, 10, i).reponses.join(" ")).join(" ");
    expect(fins("Mme")).toMatch(/convaincue|habituée|décidée/);
    expect(fins("M.")).not.toMatch(/convaincue|habituée|décidée/);
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire salarié, financement employeur, 10 jours", () => {
    const besoins = noms.map((s, i) => getIAE67EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}|undefined/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /10 jours/.test(b.disponibilites))).toBe(true);
    expect(besoins.every(b => /plan de développement des compétences/.test(b.budget))).toBe(true);
    expect(JSON.stringify(besoins)).not.toMatch(INTERDITS);
    expect(JSON.stringify(noms.map((s, i) => getIAE67EvalBesoins(s, false, i)))).not.toMatch(/\bCPF\b/);
    const besoinsPrincipaux = noms.map((s, i) => getIAE67Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getIAE67EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
    expect(getIAE67EvalBesoins(noms[0], true, 0).raisonSociale).toBe("ARVELIA TEST");
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => iae67NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    for (let i = 0; i < 100; i++) {
      const tot = getIAE67AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((x, y) => x + y, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      const rep = iae67ReponsesQcmDebut(IAE67_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === IAE67_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(iae67BonnesQcmDebut(IAE67_QCM_DEBUT.length, i));
      expect(rep).toHaveLength(10);
      expect(bonnes).toBeGreaterThanOrEqual(2);
      expect(bonnes).toBeLessThanOrEqual(6);
    }
  });

  it("QCM d'entraînement : notes différentes d'un stagiaire à l'autre, entre 6 et 10", () => {
    for (let ex = 0; ex < IAE67_EXERCICES_COMPLETS.length; ex++) {
      expect(new Set(Array.from({ length: 5 }, (_, i) => iae67NoteExercice(i, ex, true))).size).toBe(5);
      expect(Math.max(...Array.from({ length: 12 }, (_, i) => iae67NoteExercice(i, ex, true)))).toBeLessThanOrEqual(10);
      expect(Math.min(...Array.from({ length: 12 }, (_, i) => iae67NoteExercice(i, ex, true)))).toBeGreaterThanOrEqual(6);
    }
  });

  it("non certifiante : sources et packs sans code ni certification, aucune statistique inventée, veille réelle", () => {
    const sources = ["src/lib/iaEntreprise67hPreset.ts", "src/lib/iaEntreprise67hHumanized.ts", "src/lib/courseContentIAEntreprise67h.ts"];
    for (const p of sources) expect(lire(p).replace(/codeRNCP/g, ""), p).not.toMatch(INTERDITS);
    expect(lire("src/lib/iaEntreprise67hHumanized.ts")).not.toMatch(/[A-D]\)/);
    const packs = JSON.stringify([IAE67_CONTENT_PACK, IAE67_EVAL_PACK, IAE67_VEILLE_PACK, IAE67_QUESTIONS_OUVERTES, FORMATION_IAE67])
      .replace(/codeRNCP/g, "").replace(/https?:\/\/[^"]+/g, "");
    expect(packs).not.toMatch(INTERDITS);
    // Aucun barème inventé, aucune statistique ni taux ; seul pourcentage : « 100 % » (à distance, pré-remplis)
    expect(packs).not.toMatch(/coefficient \d|note éliminatoire|seuil de réussite|(?<!\d)\d{1,2} ?\/ ?20(?!\d)/i);
    expect(packs.replace(/100 %/g, "")).not.toMatch(/\d+\s?%/);
    expect(packs).not.toMatch(/taux de (satisfaction|réussite)/i);
    // Veille réglementaire : règlement (UE) 2024/1689 et son calendrier, reports proposés non définitifs, CNIL, RGPD, droit d'auteur
    const regl = JSON.stringify(IAE67_VEILLE_PACK.reglementaire);
    expect(regl).toContain("https://eur-lex.europa.eu/eli/reg/2024/1689/oj");
    expect(regl).toMatch(/2 février 2025/);
    expect(regl).toMatch(/article 4/);
    expect(regl).toMatch(/2 août 2025/);
    expect(regl).toMatch(/2 août 2026/);
    expect(regl).toMatch(/fin 2025/);
    expect(regl).toMatch(/aucune nouvelle date n'est présentée comme définitive/);
    expect(regl).toMatch(/CNIL/);
    expect(regl).toMatch(/2016\/679/);
    expect(regl).toMatch(/2019\/790/);
    expect(JSON.stringify(IAE67_VEILLE_PACK.technologique)).toMatch(/ANSSI/);
    expect(IAE67_VEILLE_PACK.metier.length).toBeGreaterThan(0);
    expect(IAE67_VEILLE_PACK.technologique.length).toBeGreaterThan(0);
    for (const r of [...IAE67_VEILLE_PACK.reglementaire, ...IAE67_VEILLE_PACK.metier, ...IAE67_VEILLE_PACK.technologique]) {
      expect(r.lien).toMatch(/^https:\/\//);
      expect(r.date).toMatch(/^(Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre) 2025$/);
      expect(r.exploitation).toMatch(/^Preuve : .+ Action : /);
    }
    // Vidéos : uniquement des recherches YouTube déjà présentes dans le dépôt, jamais d'identifiant inventé
    const depot = lire("src/lib/iaPro21hPreset.ts");
    for (const v of IAE67_VIDEOS) {
      expect(v.url).toMatch(/^https:\/\/www\.youtube\.com\/results\?search_query=/);
      expect(depot, v.url).toContain(v.url);
    }
    // Fil rouge fictif
    expect(packs).toMatch(/Arvelia Services/);
    expect(packs).toMatch(/fictifs/);
  });

  it("amorçage des caches sans erreur ni appel réseau", () => {
    expect(() => seedIAE67AICaches()).not.toThrow();
  });
});

describe("Intelligence artificielle en entreprise – 67 h — câblage", () => {
  it("le support de cours compte 9 chapitres, au moins 500 000 caractères", async () => {
    const { getCourseChapters, getYoutubeVideos } = await import("@/lib/courseContent");
    const { getIAEntreprise67hChapters } = await import("@/lib/courseContentIAEntreprise67h");
    const chapitres = getIAEntreprise67hChapters();
    expect(chapitres).toHaveLength(9);
    for (const titre of [FORMATION_IAE67.intitule, "IA en entreprise – 67 h"]) {
      expect(getCourseChapters(titre), titre).toEqual(chapitres);
    }
    for (const titre of [FORMATION_IAP21.intitule, IA_GENERATIVE, "Intelligence artificielle"]) {
      expect(getCourseChapters(titre), titre).not.toEqual(chapitres);
    }
    expect(getYoutubeVideos(FORMATION_IAE67.intitule)).toBe(IAE67_CONTENT_PACK.ressources.videos);
    expect(getYoutubeVideos(IA_GENERATIVE)).not.toBe(IAE67_VIDEOS);
    // Contenu rédigé (les chapitres sont livrés à part) : titres, sections, taille totale
    chapitres.forEach((c, i) => {
      expect(c.title, c.title).toMatch(new RegExp(`^Chapitre ${i + 1} – .+\\(C[^)]*\\)$`));
      expect(c.sections.length, c.title).toBeGreaterThan(0);
      expect(c.sections.every(s => s.title && s.content && !s.content.includes("${") && !/undefined/.test(s.content)), c.title).toBe(true);
    });
    const total = chapitres.reduce((t, c) => t + c.title.length + c.description.length + c.sections.reduce((u, s) => u + s.title.length + s.content.length, 0), 0);
    expect(total).toBeGreaterThanOrEqual(500_000);
    // Le support peut parler des certifications de sécurité d'un fournisseur d'outil : seuls les codes, le CPF,
    // le jury et France Compétences y sont interdits.
    expect(JSON.stringify(chapitres)).not.toMatch(/RNCP|\bRS\s?\d{3,4}|\bCPF\b|France Compétences|\bjury|formation certifiante|titre professionnel|TOEIC/i);
  }, 60_000);

  it("l'évaluation utilise les QCM du preset ; l'IA 21 h et l'IA générative gardent leur contenu", { timeout: 60_000 }, async () => {
    const { getEvalContent, hasEvalContentDedie } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_IAE67.intitule);
    expect(ev.exercices.map(e => e.titre)).toEqual(IAE67_EXERCICES_COMPLETS.map(e => e.titre));
    expect(ev.qcmPositionnement).toEqual(IAE67_QCM_DEBUT);
    expect(ev.qcmFinal).toEqual(IAE67_QCM_FIN);
    expect(ev.competences).toHaveLength(6);
    expect(ev.appreciations).toHaveLength(6);
    expect(JSON.stringify(ev)).not.toMatch(INTERDITS);
    expect(hasEvalContentDedie("IA en entreprise – 67 h")).toBe(true);
    for (const t of [FORMATION_IAP21.intitule, IA_GENERATIVE, "Intelligence artificielle"]) {
      expect(getEvalContent(t).qcmPositionnement, t).not.toEqual(IAE67_QCM_DEBUT);
    }
    for (const f of SAMPLE_FORMATIONS.filter(x => !isIAE67Formation(x.intitule, x.codeRNCP))) {
      expect(getEvalContent(f.intitule).qcmPositionnement, f.intitule).not.toEqual(IAE67_QCM_DEBUT);
    }
  });

  const org: OrganismeInfo = {
    nom: "ORGANISME TEST", siret: "000 000 000 00000", adresse: "1 rue de l'Exemple", codePostal: "94000", ville: "Créteil",
    telephone: "01 00 00 00 00", email: "contact@organisme-test.fr", siteWeb: "", nda: "11 94 00000 94",
    dirigeant: "Julien LOUBINOUX", responsablePedagogique: "Julien LOUBINOUX", referentHandicap: "Julien LOUBINOUX",
    referentQualite: "Julien LOUBINOUX", poleAdministratif: "Julien LOUBINOUX", relationEntreprises: "Julien LOUBINOUX",
    referentMobilite: "Julien LOUBINOUX", domainesFormation: "Formations générales", typesActions: ["actions-formation"],
    certifications: "", outilsUtilises: "Google Meet, Zoom", version: "1", dateMaj: "2025-02-01",
  };
  const formationDossier = { ...FORMATION_IAE67 };
  const stagiaires: StagiaireInfo[] = [
    { civilite: "Mme", nom: "ALPHA", prenom: "Claire", email: "claire.alpha@exemple.fr", telephone: "06 10 20 30 40", entreprise: "ENTREPRISE TEST", poste: "Assistante de direction", dateNaissance: "1985-04-12", financeur: "Employeur", dateDebutFormation: "2025-03-03", dateFinFormation: "2025-03-14" } as StagiaireInfo,
    { civilite: "M.", nom: "BRAVO", prenom: "Julien", email: "julien.bravo@exemple.fr", telephone: "06 11 21 31 41", entreprise: "ENTREPRISE TEST", poste: "Responsable commercial", dateNaissance: "1990-09-03", financeur: "Employeur", dateDebutFormation: "2025-03-03", dateFinFormation: "2025-03-14" } as StagiaireInfo,
  ];

  it("document QCM de chaque stagiaire rempli : réponses cochées propres au stagiaire, aucun corrigé recopié", async () => {
    const { generateDocumentById } = await import("@/lib/documentGenerator");
    seedIAE67AICaches(formationDossier);
    for (const exerciceIdx of [0, 9, 10, 15]) {
      const reponses = stagiaires.map((_, si) => {
        const txt = generateDocumentById(`ex_${si}`, "exercices_stagiaire", { fi: 0, stagiaireIdx: si, exerciceIdx }, org, formationDossier, stagiaires).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
        expect(txt).not.toMatch(/undefined|EXERCICES PRATIQUES/);
        expect(IAE67_EXERCICES_COMPLETS.some(e => txt.includes(e.titre)), `QCM ${exerciceIdx}`).toBe(true);
        const lettres = [...txt.matchAll(/Réponse du stagiaire : ([A-D])\b/g)].map(m => m[1]);
        expect(lettres, `QCM ${exerciceIdx} stagiaire ${si}`).toHaveLength(10);
        return lettres.join("");
      });
      expect(new Set(reponses).size, `QCM ${exerciceIdx}`).toBeGreaterThan(1);
    }
  }, 120_000);

  it("dossier AF complet généré pour cet intitulé : aucun code RNCP / RS, aucun « undefined »", async () => {
    const { getFullCatalog, generateDocumentById } = await import("@/lib/documentGenerator");
    const f = { ...formationDossier };
    seedIAE67AICaches(f);
    const fuites: string[] = [];
    const undef: string[] = [];
    const catalogue = getFullCatalog(org, f, stagiaires);
    expect(catalogue.length).toBeGreaterThan(50);
    let generes = 0;
    for (const d of catalogue) {
      let html = "";
      try { html = generateDocumentById(d.id, d.template, d.params, org, f, stagiaires) || ""; } catch { continue; }
      if (html) generes++;
      const texte = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      const m = texte.match(new RegExp(`.{0,60}(${CODES.source}).{0,60}`, "i"));
      if (m) fuites.push(`${d.id} — ${d.nom} : …${m[0]}…`);
      const u = texte.match(/.{0,60}\bundefined\b.{0,60}/);
      if (u) undef.push(`${d.id} — ${d.nom} : …${u[0]}…`);
    }
    expect(generes).toBeGreaterThan(50);
    expect(fuites).toEqual([]);
    expect(undef).toEqual([]);
  }, 600_000);
});
