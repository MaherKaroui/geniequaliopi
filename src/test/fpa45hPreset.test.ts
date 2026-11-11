import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_FPA45, FPA45_EXERCICES, FPA45_QCM_COMPETENCES, FPA45_QCM_DEBUT, FPA45_QCM_FIN,
  FPA45_QCM_DEBUT_EXPLICATIONS, FPA45_EXERCICES_COMPLETS, FPA45_VIDEOS,
  FPA45_CONTENT_PACK, FPA45_EVAL_PACK, FPA45_VEILLE_PACK, seedFPA45AICaches,
} from "@/lib/fpa45hPreset";
import {
  isFPA45Formation, getFPA45AutoAnswers, getFPA45EvalBesoins, getFPA45Besoin, pickFPA45ExerciceAnswer,
  fpa45NoteDebutSur20, fpa45BonnesQcmDebut, fpa45ReponsesQcmDebut, fpa45NoteExercice, fpa45Seed,
  FPA45_QUESTIONS_OUVERTES,
} from "@/lib/fpa45hHumanized";
import { isDRI47Formation } from "@/lib/droitInstitutions47hHumanized";
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
import { getRNCPByCode } from "@/lib/rncpData";
import type { OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";

const lire = (p: string) => readFileSync(resolve(process.cwd(), p), "utf-8");

/**
 * Formation certifiante (RNCP37275) : le code, le CPF, le jury et le titre sont attendus.
 * Interdits : nom de l'organisme réel, affirmation d'un agrément de centre d'examen, promesse de réussite,
 * ancien code RNCP247 présenté comme actif.
 */
const INTERDITS = /PASSE LE PERMIS|\bYM\b|(nous sommes|notre organisme est|l'organisme est|organisme de formation est|Horizon Compétences est) (un )?centre (d'examen )?agr[ée][ée]|r[ée]ussite garantie|100 % de r[ée]ussite|TOEIC/i;
/** Dans les sources propres à ce preset : aucune mention de « centre agréé » (les chapitres en parlent pour décrire la session). */
const AGREMENT = /centre (d'examen )?agr[ée][ée]|organisme agr[ée][ée]/i;
/** Autres codes de répertoire que celui de la formation (RNCP247 n'apparaît que comme fiche remplacée). */
const AUTRES_CODES = /RNCP(?!37275|247\b)\d{3,6}|\bRS\s?\d{3,4}/;

const DOCS_ORGANISME = /^af_c(1i2|5i21|5i22|6i23|7i32)_/;

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

/** Mot attendu dans chacune des 8 copies de chaque mise en situation (C1 à C6). */
const MOTS_EXERCICES = [
  /RNCP37275|CCP|action de formation|acteurs|Qualiopi|obligations|CPF/, /objectif|demande/, /progression|séquence|scénario/,
  /consigne|séance|clôtur|parole|groupe/, /grille|feedback|remédiation|Kirkpatrick/, /accueil|référent handicap|contrat pédagogique|positionnement|Paul/,
  /tutorat|relance|tuteur|distance|connexion|canaux/, /RGPD|RGAA|règlement intérieur|indicateurs|décret|violences|Qualiopi/, /Kolb|veille|analyse|amélioration|responsabilité sociale/,
  /capsule|dossier professionnel|CCP|jury|PowerPoint|Genially/,
];

/** Autres détecteurs de formations exemples : aucun ne doit capter cet intitulé. */
const AUTRES = [isDRI47Formation, isCOH21Formation, isGSC35Formation, isIAP21Formation, isMSP21Formation, isANG40Formation, isARH41366Formation, isLRBFormation, isTVTEFormation, isWM14Formation, isRPMSFormation];

const LETTRE_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

describe("Formation de formateur professionnel pour adultes (TP FPA – RNCP37275) — formation exemple certifiante", () => {
  it("données de la formation : 45 h à distance, 2 870 €, RNCP37275 certifiante, 6 modules 2/12/12/9/7/3 h", () => {
    const f = FORMATION_FPA45;
    expect(f.intitule).toBe("Formation de formateur professionnel pour adultes (TP FPA – RNCP37275)");
    expect(f.codeRNCP).toBe("RNCP37275");
    expect(f.duree).toBe("45 heures");
    expect(f.dureeSaisiePrioritaire).toBe(true);
    expect(f.modalites).toBe("distanciel");
    expect(f.lieu).toBe("Google Meet / Zoom");
    expect(f.tarif).toBe("2 870 €");
    expect(f.nombreParticipants).toBe("1");
    expect(f.formateur).toBe("");
    expect(f.dateDebut).toBe("2025-04-07");
    expect(f.dateFin).toBe("2025-04-17");
    expect(f.prerequis).toMatch(/niveau 4/);
    expect(f.prerequis).toMatch(/3 ans d'expérience/);
    expect(f.prerequis).toMatch(/niveau 3/);
    expect(f.prerequis).toMatch(/3 à 5 ans/);
    expect(f.prerequis).toMatch(/bureautique/);
    expect(f.prerequis).toMatch(/français à l'oral et à l'écrit/);
    expect(f.delaiAcces).toBe("14 jours minimum entre la demande d'inscription et l'entrée en formation (11 jours ouvrés minimum pour un financement CPF).");
    expect(f.publicVise).toMatch(/reconversion/);
    expect(f.objectifs).toMatch(/^Formation certifiante\. Objectif général : /);
    for (const k of ["C1", "C2", "C3", "C4", "C5", "C6"]) expect(f.objectifs).toContain(`- ${k} — `);
    for (let m = 1; m <= 6; m++) expect(f.programme).toContain(`Module ${m}`);
    const heures = [...f.programme.matchAll(/\(C\d, (\d+) h\)/g)].map(m => parseInt(m[1]));
    expect(heures).toEqual([2, 12, 12, 9, 7, 3]);
    expect(heures.reduce((a, b) => a + b, 0)).toBe(45);
    // Place des mises en situation, du cas intermédiaire et de l'évaluation finale
    const modules = f.programme.split("\n");
    expect(modules[0]).toMatch(/mise en situation 1 /);
    expect(modules[1]).toMatch(/mises en situation 2 et 3/);
    expect(modules[2]).toMatch(/mises en situation 4 et 5/);
    expect(modules[2]).toMatch(/cas pratique intermédiaire/);
    expect(modules[3]).toMatch(/mises en situation 6 et 7/);
    expect(modules[4]).toMatch(/mises en situation 8 et 9/);
    expect(modules[5]).toMatch(/mise en situation 10/);
    expect(modules[5]).toMatch(/évaluation finale interne/);
    const me = f.methodesEvaluation;
    for (const t of [/positionnement/, /QCM de 10 questions à la fin de chaque module/, /cas pratique intermédiaire/, /évaluation finale interne/, /à chaud/, /à froid/, /attestation de fin de formation/i]) expect(me).toMatch(t);
    for (const t of ["RNCP37275BC01", "RNCP37275BC02", "RNCP37275BC03", "RNCP37275BC04", "8 à 12 pages", "oral de 25 min", "soit 35 min",
      "5 à 8 pages", "oral de 20 min", "soit 30 min", "7 à 10 pages", "entretien technique de 20 min", "soit 45 min",
      "tirage au sort d'un sujet parmi 6", "45 min de préparation", "10 à 15 pages", "soit 1 h 20", "DREETS", "Le passage des épreuves est obligatoire"]) {
      expect(me, t).toContain(t);
    }
    expect(me.toLowerCase().indexOf("attestation de fin de formation")).toBeGreaterThan(0);
    expect(me.toLowerCase().indexOf("attestation de fin de formation")).toBeLessThan(me.indexOf("RNCP37275BC01"));
    expect(f.moyensPedagogiques).toMatch(/Google Meet \/ Zoom/);
    expect(f.moyensPedagogiques).toMatch(/formateur unique/);
    expect(f.moyensPedagogiques).toMatch(/6 chapitres/);
    expect(f.moyensPedagogiques).toMatch(/PowerPoint, Canva, Genially/);
    expect(f.moyensPedagogiques).toMatch(/dossier professionnel/);
    expect(f.moyensPedagogiques).toMatch(/personnes et situations fictives/);
    // Aucune donnée de satisfaction inventée
    expect(f.tauxSatisfaction).toBeUndefined();
    expect(f.nombreAvisSatisfaction).toBeUndefined();
  });

  it("sélection par l'intitulé ou le code : variantes reconnues, aucune confusion avec une autre formation", () => {
    expect(isFPA45Formation(FORMATION_FPA45.intitule, FORMATION_FPA45.codeRNCP)).toBe(true);
    for (const v of [
      "Formateur professionnel pour adultes", "FORMATEUR PROFESSIONNEL D'ADULTES", "Formateur professionnel d’adultes – 45 h",
      "Titre professionnel Formateur professionnel d'adultes", "Formatrice professionnelle d'adultes", "TP FPA", "tp-fpa 45 h",
      "Préparation au RNCP37275", "Formation 37275", "formateur professionnel pour adultes (tp fpa)",
    ]) expect(isFPA45Formation(v), v).toBe(true);
    expect(isFPA45Formation("Formation de formateurs", "RNCP37275")).toBe(true);
    expect(isFPA45Formation("", "37275")).toBe(true);
    for (const v of [
      "Formateur PRAP", "Formateur SST", "Formateur", "Formation de formateurs", "Formateur occasionnel", "Initiation Word",
      "Gérer son centre de formation – 35 h", "Enseignement : fondamentaux du droit et des institutions", "Anglais Professionnel – 40 h",
      "Formateur PRAP IBC", "Devenir formateur SST", "Formation professionnelle continue", "FPA",
      "TP - Responsable de petite ou moyenne structure (RPMS)", "",
    ]) expect(isFPA45Formation(v), v).toBe(false);
    expect(isFPA45Formation("Formateur PRAP", "RNCP37274")).toBe(false);
    expect(isFPA45Formation("Formateur PRAP", "372750")).toBe(false);
    expect(isFPA45Formation(undefined)).toBe(false);
    for (const is of AUTRES) expect(is(FORMATION_FPA45.intitule, ""), is.name).toBe(false);
    const autresExemples = SAMPLE_FORMATIONS.filter(f => f.intitule !== FORMATION_FPA45.intitule);
    expect(autresExemples.filter(f => isFPA45Formation(f.intitule, f.codeRNCP)).map(f => f.intitule)).toEqual([]);
  });

  it("10 mises en situation (C1 à C6) et 6 QCM de 10 questions, au format du générateur, sans « A) » dans les énoncés", () => {
    expect(FPA45_EXERCICES).toHaveLength(10);
    const comps = FPA45_EXERCICES.map(e => e.titre.match(/C\d/)![0]);
    expect(comps).toEqual(["C1", "C2", "C2", "C3", "C3", "C4", "C4", "C5", "C5", "C6"]);
    expect(FPA45_EXERCICES.map(e => e.titre.match(/^Exercice (\d+)/)![1])).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
    expect(FPA45_EXERCICES.every(e => /fictiv/i.test(e.consigne))).toBe(true);
    expect(FPA45_EXERCICES.every(e => e.points === 20)).toBe(true);
    expect(FPA45_EXERCICES.every(e => /Inès|Logistique Morvaine|Horizon Compétences/.test(e.consigne))).toBe(true);
    expect(FPA45_EXERCICES_COMPLETS).toHaveLength(16);
    expect(FPA45_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    for (const ex of FPA45_QCM_COMPETENCES) {
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
    expect(FPA45_QCM_DEBUT).toHaveLength(10);
    expect(FPA45_QCM_DEBUT_EXPLICATIONS).toHaveLength(10);
    for (const q of [...FPA45_QCM_DEBUT, ...FPA45_QCM_FIN]) {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
      expect(new Set(q.options).size).toBe(q.options.length);
    }
    expect(new Set(FPA45_QCM_DEBUT.map(q => q.correctIndex)).size).toBe(3);
    expect(FPA45_QCM_FIN).toHaveLength(12);
    expect(FPA45_QCM_FIN.every(q => q.options.length === 4)).toBe(true);
    expect(new Set(FPA45_QCM_FIN.map(q => q.correctIndex)).size).toBe(4);
    expect(FPA45_EVAL_PACK.qcmDebut).toBe(FPA45_QCM_DEBUT);
    expect(FPA45_EVAL_PACK.qcmFin).toBe(FPA45_QCM_FIN);
    expect(FPA45_EVAL_PACK.exerciceIntermediaire.titre).toMatch(/fin du module 3/);
    expect(FPA45_EVAL_PACK.evaluationFinale.titre).toMatch(/module 6/);
    expect(FPA45_EVAL_PACK.evaluationFinale.exercices.length).toBeGreaterThanOrEqual(4);
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = FPA45_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = FPA45_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/titre FPA/);
    expect(fin[1]).toMatch(/demande/i);
    expect(fin[2]).toMatch(/progression|scénario/i);
    expect(fin[3]).toMatch(/animez/i);
    expect(fin[4]).toMatch(/évaluez/i);
    expect(fin[5]).toMatch(/accueillez/i);
    expect(fin[6]).toMatch(/tutorat/i);
    expect(fin[7]).toMatch(/réglementation|qualité/i);
    expect(fin[8]).toMatch(/veille/i);
    expect(fin[9]).toMatch(/épreuves/i);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getFPA45AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.every(sc => sc <= 0.5))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getFPA45AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getFPA45AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(fpa45Seed("MARTIN", "Sophie")).toBe(fpa45Seed("martin", "SOPHIE"));
  });

  it("accords M. / Mme dans les copies et les besoins", () => {
    for (let i = 0; i < 12; i++) {
      const h = getFPA45EvalBesoins({ nom: "N" + i, prenom: "Paul", civilite: "M." }, true, i);
      const f = getFPA45EvalBesoins({ nom: "N" + i, prenom: "Paul", civilite: "Mme" }, true, i);
      const tH = Object.values(h).join(" ");
      const tF = Object.values(f).join(" ");
      expect(tH, `M. ${i}`).not.toMatch(/formatrice|la salariée/);
      expect(tF, `Mme ${i}`).not.toMatch(/le salarié/);
      expect(f.projetPro, `Mme ${i}`).not.toMatch(/\bformateur\b/);
      expect(h.projetPro, `M. ${i}`).not.toMatch(/\bformatrice\b/);
    }
    const prodF = FPA45_EXERCICES.map((ex, ei) => pickFPA45ExerciceAnswer(FORMATION_FPA45.intitule, "", ei, 7, { nom: "X", prenom: "Ana", civilite: "Mme" }, ex.titre)).join(" ");
    expect(prodF).not.toMatch(/eueur|\{|\}/);
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    FPA45_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickFPA45ExerciceAnswer(FORMATION_FPA45.intitule, "", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickFPA45ExerciceAnswer(FORMATION_FPA45.intitule, "", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickFPA45ExerciceAnswer(FORMATION_FPA45.intitule, "", 0, 0, { ...noms[0], entreprise: "SARL TEST" }, FPA45_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/SARL TEST/);
    expect(pickFPA45ExerciceAnswer("Formateur PRAP", "", 0, 0, noms[0], "C1")).toBeNull();
    expect(pickFPA45ExerciceAnswer("Initiation Word", "", 0, 0, noms[0], "C1")).toBeNull();
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, 45 heures, financement CPF", () => {
    const besoins = noms.map((s, i) => getFPA45EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /45 heures/.test(b.disponibilites))).toBe(true);
    expect(besoins.every(b => /compte personnel de formation/.test(b.budget) && /11 jours ouvrés/.test(b.budget))).toBe(true);
    // Diplômes conformes aux prérequis : un diplôme et des années d'expérience
    expect(besoins.every(b => /expérience/.test(b.diplome))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getFPA45Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getFPA45EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
    expect(getFPA45EvalBesoins(noms[0], false, 0).budget).toMatch(/Mon Compte Formation/);
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => fpa45NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    for (let i = 0; i < 100; i++) {
      const tot = getFPA45AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(5);
      const rep = fpa45ReponsesQcmDebut(FPA45_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === FPA45_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(fpa45BonnesQcmDebut(FPA45_QCM_DEBUT.length, i));
      expect(rep).toHaveLength(10);
      rep.forEach((r, qi) => { expect(r).toBeGreaterThanOrEqual(0); expect(r).toBeLessThan(FPA45_QCM_DEBUT[qi].options.length); });
      expect(bonnes).toBeGreaterThanOrEqual(2);
      expect(bonnes).toBeLessThanOrEqual(6);
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 4 }, (_, i) => fpa45NoteExercice(i, ex, true))).size).toBe(4);
      expect(new Set(Array.from({ length: 6 }, (_, i) => fpa45NoteExercice(i, ex, false))).size).toBe(6);
      expect(Math.max(...Array.from({ length: 12 }, (_, i) => fpa45NoteExercice(i, ex, true)))).toBeLessThanOrEqual(10);
    }
  });

  it("veille : fiche RNCP37275, CPF, Qualiopi 2026, sources officielles uniquement", () => {
    const regl = JSON.stringify(FPA45_VEILLE_PACK.reglementaire);
    expect(regl).toMatch(/RNCP37275/);
    expect(regl).toMatch(/29\/04\/2028/);
    expect(regl).toMatch(/11 jours ouvrés/);
    expect(regl).toMatch(/2026-728/);
    expect(regl).toMatch(/33 indicateurs/);
    expect(regl).toMatch(/1er novembre 2026/);
    expect(regl).toMatch(/DREETS/);
    for (const k of ["reglementaire", "metier", "technologique"] as const) {
      expect(FPA45_VEILLE_PACK[k].length).toBeGreaterThanOrEqual(3);
      FPA45_VEILLE_PACK[k].forEach(r => {
        expect(r.lien).toMatch(/^https:\/\//);
        expect(r.exploitation).toMatch(/^Preuve : .+ Action : /);
        expect(r.date).toMatch(/^[A-ZÉ][a-zéû]+ 2026$/);
      });
    }
    // Liens limités aux sites officiels autorisés (et aux recherches YouTube des vidéos)
    const liens = JSON.stringify([FPA45_CONTENT_PACK, FPA45_VEILLE_PACK]).match(/https?:\/\/[^"\s<]+/g) || [];
    expect(liens.length).toBeGreaterThan(10);
    const AUTORISES = /^https:\/\/(www\.)?(legifrance\.gouv\.fr|travail-emploi\.gouv\.fr|francecompetences\.fr\/recherche\/rncp\/37275\/|moncompteformation\.gouv\.fr|centre-inffo\.fr|agefiph\.fr|cnil\.fr|accessibilite\.numerique\.gouv\.fr|numerique\.gouv\.fr|youtube\.com\/results\?search_query=)/;
    expect(liens.filter(l => !AUTORISES.test(l))).toEqual([]);
    expect(FPA45_VIDEOS).toHaveLength(10);
  });

  it("fiche RNCP37275 du référentiel local conforme à France Compétences", () => {
    const fiche = getRNCPByCode("RNCP37275")!;
    expect(fiche).toBeTruthy();
    expect(fiche.intitule).toMatch(/Formateur professionnel d'adultes/);
    expect(fiche.niveau).toMatch(/5/);
    expect(fiche.certificateur).toMatch(/MINIST[ÈE]RE DU TRAVAIL/i);
    expect(fiche.dateEnregistrement).toBe("29/04/2023");
    expect(fiche.dateEcheance).toBe("29/04/2028");
    expect(fiche.codeNSF).toMatch(/^333/);
    expect(fiche.codesROME.join(" ")).toMatch(/K2111/);
    expect(fiche.resume).toMatch(/RNCP247/);
    expect(fiche.blocsCompetences).toHaveLength(4);
    expect(fiche.blocsCompetences.map(b => b.titre.match(/RNCP37275BC0\d/)![0])).toEqual(["RNCP37275BC01", "RNCP37275BC02", "RNCP37275BC03", "RNCP37275BC04"]);
    expect(fiche.blocsCompetences.map(b => b.competences.length)).toEqual([3, 3, 4, 3]);
    expect(fiche.blocsCompetences[0].modalitesEval).toMatch(/35 min/);
    expect(fiche.blocsCompetences[1].modalitesEval).toMatch(/30 min/);
    expect(fiche.blocsCompetences[2].modalitesEval).toMatch(/45 min/);
    expect(fiche.blocsCompetences[3].modalitesEval).toMatch(/1 h 20/);
    const volumes = fiche.blocsCompetences.flatMap(b => b.matieres.map(m => parseInt(m.volume)));
    expect(volumes.reduce((a, b) => a + b, 0)).toBe(45);
  });

  it("sources et packs : aucun organisme réel, aucun agrément affirmé, aucune statistique inventée", () => {
    const sources = ["src/lib/fpa45hPreset.ts", "src/lib/fpa45hHumanized.ts", "src/lib/courseContentFPA45h.ts"];
    for (const p of sources) expect(lire(p), p).not.toMatch(INTERDITS);
    for (const p of sources) expect(lire(p), p).not.toMatch(AGREMENT);
    for (const p of sources) expect(lire(p), p).not.toMatch(/\/\/ BOUCHON/);
    expect(lire("src/lib/fpa45hHumanized.ts")).not.toMatch(/[A-D]\)/);
    const packs = JSON.stringify([FPA45_CONTENT_PACK, FPA45_EVAL_PACK, FPA45_VEILLE_PACK, FPA45_QUESTIONS_OUVERTES, FORMATION_FPA45])
      .replace(/https?:\/\/[^"]+/g, "");
    expect(packs).not.toMatch(INTERDITS);
    // Seul RNCP37275 est cité (RNCP247 en tant que fiche remplacée) ; les QCM de fin citent RS7013 / RNCP41480 comme distracteurs.
    expect(JSON.stringify([FPA45_CONTENT_PACK, FPA45_VEILLE_PACK, FORMATION_FPA45, FPA45_EVAL_PACK.exerciceIntermediaire, FPA45_EVAL_PACK.evaluationFinale])).not.toMatch(AUTRES_CODES);
    expect(packs).not.toMatch(/\d+\s?%/);
    expect(packs).not.toMatch(/taux de satisfaction/i);
    expect(packs).toMatch(/personnes et situations fictives/i);
  });
});

describe("Formation de formateur professionnel pour adultes (TP FPA – RNCP37275) — câblage", () => {
  it("le support de cours compte 6 chapitres (un par module), au moins 500 000 caractères", async () => {
    const dir = resolve(process.cwd(), "src/lib/fpa45h");
    expect(existsSync(dir)).toBe(true);
    const fichiers = readdirSync(dir).filter(f => f.endsWith(".ts"));
    for (const f of fichiers) {
      const t = lire(`src/lib/fpa45h/${f}`);
      expect(t, f).not.toMatch(INTERDITS);
      expect(t, f).not.toMatch(/\/\/ BOUCHON/);
    }
    const { getFPA45hChapters } = await import("@/lib/courseContentFPA45h");
    expect(getFPA45hChapters()).toHaveLength(6);
    const { getCourseChapters, getYoutubeVideos } = await import("@/lib/courseContent");
    for (const titre of [FORMATION_FPA45.intitule, "Formateur professionnel d'adultes", "TP FPA"]) {
      expect(getCourseChapters(titre), titre).toHaveLength(6);
    }
    const chapitres = getCourseChapters(FORMATION_FPA45.intitule);
    const html = chapitres.flatMap(c => c.sections.map(s => s.content)).join("");
    expect(html.length).toBeGreaterThanOrEqual(500_000);
    expect(chapitres.map(c => c.title.match(/Module (\d)/i)![1])).toEqual(["1", "2", "3", "4", "5", "6"]);
    for (const c of chapitres) {
      expect(c.sections.length, c.title).toBeGreaterThan(3);
      expect(c.sections.every(s => !s.content.includes("${")), c.title).toBe(true);
    }
    expect(JSON.stringify(chapitres)).not.toMatch(INTERDITS);
    expect(getYoutubeVideos(FORMATION_FPA45.intitule)).toBe(FPA45_CONTENT_PACK.ressources.videos);
    expect(getCourseChapters("Formateur PRAP")[0]?.title).not.toBe(chapitres[0].title);
  }, 60_000);

  it("l'évaluation utilise les exercices et QCM du preset ; « Formateur PRAP » garde son contenu", { timeout: 60_000 }, async () => {
    const { getEvalContent, hasEvalContentDedie } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_FPA45.intitule);
    expect(ev.exercices[0].titre).toBe(FPA45_EXERCICES[0].titre);
    expect(ev.exercices).toHaveLength(16);
    expect(ev.qcmPositionnement).toEqual(FPA45_QCM_DEBUT);
    expect(ev.qcmFinal).toEqual(FPA45_QCM_FIN);
    expect(ev.competences).toHaveLength(6);
    expect(JSON.stringify(ev)).not.toMatch(INTERDITS);
    expect(hasEvalContentDedie(FORMATION_FPA45.intitule)).toBe(true);
    expect(getEvalContent("TP FPA").exercices[0].titre).toBe(FPA45_EXERCICES[0].titre);
    expect(getEvalContent("Formateur PRAP").exercices[0]?.titre).not.toBe(FPA45_EXERCICES[0].titre);
    expect(getEvalContent("Initiation Word").exercices[0]?.titre).not.toBe(FPA45_EXERCICES[0].titre);
  });

  it("la formation exemple figure une seule fois dans le catalogue d'exemples", () => {
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_FPA45.intitule)).toHaveLength(1);
  });

  it("dossier AF complet généré pour cet intitulé : aucun organisme réel ni agrément affirmé, code RNCP37275 présent", async () => {
    const { getFullCatalog, generateDocumentById } = await import("@/lib/documentGenerator");
    const org: OrganismeInfo = {
      nom: "ORGANISME TEST FPA", siret: "912 345 678 00019", adresse: "1 rue de l'Essai", codePostal: "75011", ville: "Paris",
      telephone: "01 00 00 00 00", email: "contact@organisme-test.fr", siteWeb: "", nda: "11 75 99999 75",
      dirigeant: "Paul TESTARD", responsablePedagogique: "Paul TESTARD", referentHandicap: "Paul TESTARD",
      referentQualite: "Paul TESTARD", poleAdministratif: "Paul TESTARD", relationEntreprises: "Paul TESTARD",
      referentMobilite: "Paul TESTARD", domainesFormation: "Formation de formateurs", typesActions: ["actions-formation"],
      certifications: "", outilsUtilises: "Google Meet, Zoom", version: "1", dateMaj: "2026-11-05",
    };
    const f = { ...FORMATION_FPA45, formateur: "Paul TESTARD" };
    const stagiaires: StagiaireInfo[] = [
      { civilite: "Mme", nom: "ALPHA", prenom: "Claire", email: "claire.alpha@exemple.fr", telephone: "06 10 20 30 40", entreprise: "", poste: "Responsable d'équipe logistique", dateNaissance: "1985-04-12", financeur: "CPF" },
    ];
    seedFPA45AICaches(f);
    const fuites: string[] = [];
    const catalogue = getFullCatalog(org, f, stagiaires);
    expect(catalogue.length).toBeGreaterThan(50);
    let generes = 0;
    let avecCode = 0;
    for (const d of catalogue) {
      let html = "";
      try { html = generateDocumentById(d.id, d.template, d.params, org, f, stagiaires) || ""; } catch { continue; }
      if (html) generes++;
      if (/RNCP\s?37275/.test(html)) avecCode++;
      if (DOCS_ORGANISME.test(d.id)) continue;
      const texte = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      const m = texte.match(new RegExp(`.{0,60}(${INTERDITS.source}).{0,60}`, "i"));
      if (m) fuites.push(`${d.id} — ${d.nom} : …${m[0]}…`);
    }
    expect(generes).toBeGreaterThan(50);
    expect(avecCode).toBeGreaterThan(0);
    expect(fuites).toEqual([]);
  }, 600_000);
});
