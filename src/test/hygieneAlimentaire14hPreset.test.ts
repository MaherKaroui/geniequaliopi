import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_HYG14, HYG14_EXERCICES, HYG14_QCM_COMPETENCES, HYG14_QCM_DEBUT, HYG14_QCM_FIN,
  HYG14_QCM_DEBUT_EXPLICATIONS, HYG14_VIDEOS,
  HYG14_CONTENT_PACK, HYG14_EVAL_PACK, HYG14_VEILLE_PACK, seedHYG14AICaches,
} from "@/lib/hygieneAlimentaire14hPreset";
import {
  isHYG14Formation, getHYG14AutoAnswers, getHYG14EvalBesoins, getHYG14Besoin, pickHYG14ExerciceAnswer,
  hyg14NoteDebutSur20, hyg14BonnesQcmDebut, hyg14ReponsesQcmDebut, hyg14NoteExercice, hyg14Seed,
  HYG14_QUESTIONS_OUVERTES,
} from "@/lib/hygieneAlimentaire14hHumanized";
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
 * Formation non certifiante : aucun code de répertoire, aucun certificateur, aucun jury, aucune
 * éligibilité au compte personnel de formation annoncée. « non certifiante » est autorisé.
 */
const INTERDITS = /RNCP|\bRS\s?\d{3,4}|\bCPF\b|France Compétences|\bjury|formation certifiante|titre professionnel|TOEIC/i;
const INTERDITS_SOURCES = new RegExp(`${INTERDITS.source}|certificateur`, "i");

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

/** Mot attendu dans chacune des 8 copies de chaque mise en situation (C1 à C6). */
const MOTS_EXERCICES = [/[Dd]anger/, /temp[ée]rature/, /germe/, /obligation/, /contr[ôo]le/, /pratique/, /°C/, /HACCP/, /tra[çc]abilit/, /plan d'action/];

/** Autres détecteurs de formations exemples : aucun ne doit capter cet intitulé. */
const AUTRES = [isCOH21Formation, isGSC35Formation, isIAP21Formation, isMSP21Formation, isANG40Formation, isARH41366Formation, isLRBFormation, isTVTEFormation, isWM14Formation, isRPMSFormation];

const LETTRE_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

describe("Hygiène alimentaire en restauration commerciale – 14 h — formation exemple non certifiante", () => {
  it("données de la formation : 14 h, 2 jours de 7 h, distanciel, 140 € par stagiaire, 1 à 12 participants", () => {
    const f = FORMATION_HYG14;
    expect(f.intitule).toBe("Hygiène alimentaire en restauration commerciale – 14 h");
    expect(f.codeRNCP).toBe("");
    expect(f.duree).toMatch(/^14 heures/);
    expect(f.duree).toMatch(/2 jours/);
    expect(f.duree).toMatch(/9h00 – 12h30/);
    expect(f.duree).toMatch(/13h30 – 17h00/);
    expect(f.dureeSaisiePrioritaire).toBe(true);
    expect(f.modalites).toBe("distanciel");
    expect(f.tarif).toBe("140 € net de taxes par stagiaire");
    expect(f.lieu).toBe("");
    expect(f.formateur).toBe("");
    expect(f.prerequis).toMatch(/français/);
    expect(f.publicVise).toMatch(/1 à 12 participants/);
    expect(f.publicVise).toMatch(/food-trucks/);
    expect(f.moyensPedagogiques).toMatch(/classe virtuelle/);
    expect(f.moyensPedagogiques).toMatch(/Comptoir Gourmand/);
    expect(f.objectifs).toMatch(/non certifiante/);
    expect(f.objectifs).toMatch(/décret n° 2011-731/);
    for (const k of ["C1", "C2", "C3", "C4", "C5", "C6"]) expect(f.objectifs).toContain(k);
    for (const j of ["JOUR 1", "JOUR 2"]) expect(f.programme).toContain(j);
    for (let m = 1; m <= 4; m++) expect(f.programme).toMatch(new RegExp(`Module ${m} — [^\\n]+\\(C\\d(, C\\d)?, 3 h 30\\) :`));
    expect(f.programme).not.toContain("Module 5");
    expect(f.methodesEvaluation).toMatch(/certificat de réalisation/);
    expect(f.methodesEvaluation).toMatch(/arrêté du 5 octobre 2011/);
    expect(f.tauxSatisfaction).toBeUndefined();
    expect(f.nombreAvisSatisfaction).toBeUndefined();
  });

  it("sélection par l'intitulé : variantes reconnues, aucune formation de restauration existante captée", () => {
    expect(isHYG14Formation(FORMATION_HYG14.intitule, FORMATION_HYG14.codeRNCP)).toBe(true);
    for (const v of [
      "hygiène alimentaire", "Hygiene alimentaire", "HYGIÈNE ALIMENTAIRE EN RESTAURATION COMMERCIALE",
      "Formation HACCP", "HACCP – 14 h", "Hygiène et sécurité alimentaire en restauration", "Hygiène alimentaire – 14 h",
    ]) expect(isHYG14Formation(v), v).toBe(true);
    for (const v of [
      "CAP Production et service en restauration (rapide, collective, cafétéria)", "TP Employé Polyvalent en Restauration",
      "Employé polyvalent de restauration", "CAP Cuisine", "Bac pro Cuisine – HACCP", "BTS Management en hôtellerie-restauration",
      "Hygiène et stérilisation en institut de beauté", "Restauration commerciale – service en salle", "Cuisine du monde",
      "Gérer son centre de formation – 35 h", "Cohésion d'équipe en entreprise – 21 h", "",
    ]) expect(isHYG14Formation(v), v).toBe(false);
    expect(isHYG14Formation(undefined)).toBe(false);
    // Un intitulé court qui porte un code de répertoire n'est pas la formation exemple
    expect(isHYG14Formation("Hygiène alimentaire", "RNCP12345")).toBe(false);
    // Aucun autre preset ne capte l'intitulé, et le preset ne capte aucun autre exemple ni aucune fiche du référentiel
    for (const is of AUTRES) expect(is(FORMATION_HYG14.intitule, ""), is.name).toBe(false);
    const autresExemples = SAMPLE_FORMATIONS.filter(f => f.intitule !== FORMATION_HYG14.intitule);
    expect(autresExemples.filter(f => isHYG14Formation(f.intitule, f.codeRNCP)).map(f => f.intitule)).toEqual([]);
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_HYG14.intitule)).toHaveLength(1);
    expect(RNCP_FICHES.filter(f => isHYG14Formation(f.intitule, "")).map(f => f.intitule)).toEqual([]);
  });

  it("6 QCM de 10 questions (un par compétence), au format du générateur, sans « A) » dans les énoncés", () => {
    expect(HYG14_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    for (const ex of HYG14_QCM_COMPETENCES) {
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
    expect(HYG14_EXERCICES).toHaveLength(10);
    HYG14_EXERCICES.forEach((e, i) => expect(e.titre).toMatch(new RegExp(`^Exercice ${i + 1} — C[1-6]`)));
    expect(HYG14_QCM_DEBUT).toHaveLength(10);
    expect(HYG14_QCM_DEBUT_EXPLICATIONS).toHaveLength(10);
    expect(HYG14_QCM_FIN).toHaveLength(10);
    for (const q of [...HYG14_QCM_DEBUT, ...HYG14_QCM_FIN]) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
    expect(new Set(HYG14_QCM_DEBUT.map(q => q.correctIndex)).size).toBe(4);
    expect(new Set(HYG14_QCM_FIN.map(q => q.correctIndex)).size).toBeGreaterThanOrEqual(3);
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = HYG14_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = HYG14_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/TIAC/);
    expect(fin[1]).toMatch(/multiplication/);
    expect(fin[2]).toMatch(/germes/);
    expect(fin[3]).toMatch(/obligations/);
    expect(fin[4]).toMatch(/contrôle/);
    expect(fin[5]).toMatch(/bonnes pratiques/);
    expect(fin[6]).toMatch(/températures/);
    expect(fin[7]).toMatch(/HACCP/);
    expect(fin[8]).toMatch(/traçabilité/);
    expect(fin[9]).toMatch(/plan d'action/);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getHYG14AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getHYG14AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getHYG14AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(hyg14Seed("MARTIN", "Sophie")).toBe(hyg14Seed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    HYG14_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickHYG14ExerciceAnswer(FORMATION_HYG14.intitule, "", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickHYG14ExerciceAnswer(FORMATION_HYG14.intitule, "", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickHYG14ExerciceAnswer(FORMATION_HYG14.intitule, "", 0, 0, { ...noms[0], entreprise: "SNACK TEST" }, HYG14_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/SNACK TEST/);
    expect(pickHYG14ExerciceAnswer("CAP Cuisine", "", 0, 0, noms[0], "C1")).toBeNull();
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, deux jours de 9h00 à 17h00", () => {
    const besoins = noms.map((s, i) => getHYG14EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /deux jours/.test(b.disponibilites))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getHYG14Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getHYG14EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => hyg14NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    for (let i = 0; i < 100; i++) {
      const tot = getHYG14AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      const rep = hyg14ReponsesQcmDebut(HYG14_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === HYG14_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(hyg14BonnesQcmDebut(HYG14_QCM_DEBUT.length, i));
      expect(rep).toHaveLength(10);
      rep.forEach((r, qi) => { expect(r).toBeGreaterThanOrEqual(0); expect(r).toBeLessThan(HYG14_QCM_DEBUT[qi].options.length); });
      expect(bonnes).toBeGreaterThanOrEqual(2);
      expect(bonnes).toBeLessThanOrEqual(6);
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 5 }, (_, i) => hyg14NoteExercice(i, ex, true))).size).toBe(5);
      expect(new Set(Array.from({ length: 6 }, (_, i) => hyg14NoteExercice(i, ex, false))).size).toBe(6);
      expect(Math.max(...Array.from({ length: 12 }, (_, i) => hyg14NoteExercice(i, ex, true)))).toBeLessThanOrEqual(10);
    }
  });

  it("formation non certifiante : aucun code de répertoire, certificateur, jury ou CPF dans les sources et les packs", () => {
    const sources = [
      "src/lib/hygieneAlimentaire14hPreset.ts", "src/lib/hygieneAlimentaire14hHumanized.ts", "src/lib/courseContentHygieneAlimentaire14h.ts",
      ...readdirSync(resolve(process.cwd(), "src/lib/hygieneAlimentaire14h")).filter(f => f.endsWith(".ts")).map(f => `src/lib/hygieneAlimentaire14h/${f}`),
    ];
    for (const p of sources) expect(lire(p).replace(/codeRNCP/g, ""), p).not.toMatch(INTERDITS_SOURCES);
    expect(lire("src/lib/hygieneAlimentaire14hHumanized.ts")).not.toMatch(/[A-D]\)/);
    const packs = JSON.stringify([HYG14_CONTENT_PACK, HYG14_EVAL_PACK, HYG14_VEILLE_PACK, HYG14_QUESTIONS_OUVERTES, FORMATION_HYG14])
      .replace(/codeRNCP/g, "").replace(/https?:\/\/[^"]+/g, "");
    expect(packs).not.toMatch(INTERDITS_SOURCES);
    expect(packs).not.toMatch(/certification/i);
    // Aucune statistique ni taux de satisfaction inventés
    expect(packs).not.toMatch(/\d+\s?%/);
    expect(packs).not.toMatch(/taux de satisfaction/i);
    // Rappel de l'enregistrement de l'organisme auprès de la DRAAF (liste ROFHYA) dans la veille réglementaire
    expect(JSON.stringify(HYG14_VEILLE_PACK.reglementaire)).toMatch(/DRAAF/);
    expect(JSON.stringify(HYG14_VEILLE_PACK.reglementaire)).toMatch(/ROFHYA/);
    // Vidéos : liens YouTube déjà référencés dans le dépôt ou recherches YouTube, jamais d'identifiant inventé
    for (const v of HYG14_VIDEOS) expect(v.url).toMatch(/^https:\/\/www\.youtube\.com\/(results\?search_query=|watch\?v=(eEf5_T9Q4ZM|DkaTrRlRrDk)$)/);
  });
});

describe("Hygiène alimentaire en restauration commerciale – 14 h — câblage", () => {
  it("le support de cours compte 6 chapitres (un par compétence)", async () => {
    const { getCourseChapters, getYoutubeVideos } = await import("@/lib/courseContent");
    for (const titre of [FORMATION_HYG14.intitule, "Hygiène alimentaire", "Formation HACCP"]) {
      expect(getCourseChapters(titre), titre).toHaveLength(6);
    }
    const chapitres = getCourseChapters(FORMATION_HYG14.intitule);
    expect(chapitres.map(c => c.title.match(/^Chapitre (\d)/)![1])).toEqual(["1", "2", "3", "4", "5", "6"]);
    for (const c of chapitres) {
      expect(c.sections.length, c.title).toBeGreaterThanOrEqual(10);
      expect(c.sections.some(s => /quiz/i.test(s.title)), c.title).toBe(true);
      expect(c.sections.some(s => /cas pratique/i.test(s.title)), c.title).toBe(true);
      expect(c.sections.every(s => !s.content.includes("${")), c.title).toBe(true);
    }
    const html = chapitres.flatMap(c => c.sections.map(s => s.content)).join("");
    expect(html.length).toBeGreaterThanOrEqual(450_000);
    expect(html).toMatch(/Comptoir Gourmand/);
    expect(html).toMatch(/DRAAF/);
    expect(JSON.stringify(chapitres)).not.toMatch(INTERDITS);
    expect(getYoutubeVideos(FORMATION_HYG14.intitule)).toBe(HYG14_CONTENT_PACK.ressources.videos);
    // Les formations de restauration gardent leur support et leurs vidéos
    expect(getCourseChapters("TP Employé Polyvalent en Restauration")[0]?.title).not.toBe(chapitres[0].title);
    expect(getYoutubeVideos("TP Employé Polyvalent en Restauration")).not.toBe(HYG14_VIDEOS);
  }, 60_000);

  it("l'évaluation utilise les mises en situation et QCM du preset ; la restauration garde son contenu", { timeout: 60_000 }, async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_HYG14.intitule);
    expect(ev.exercices[0].titre).toBe(HYG14_EXERCICES[0].titre);
    expect(ev.qcmPositionnement).toEqual(HYG14_QCM_DEBUT);
    expect(ev.competences).toHaveLength(6);
    expect(JSON.stringify(ev)).not.toMatch(INTERDITS);
    expect(getEvalContent("Formation HACCP").exercices[0].titre).toBe(HYG14_EXERCICES[0].titre);
    expect(getEvalContent("TP Employé Polyvalent en Restauration").exercices[0].titre).not.toBe(HYG14_EXERCICES[0].titre);
  });

  it("dossier AF complet généré pour cet intitulé : aucune mention RNCP, RS, CPF, France Compétences ou jury", async () => {
    const { getFullCatalog, generateDocumentById } = await import("@/lib/documentGenerator");
    const org: OrganismeInfo = {
      nom: "ORGANISME TEST HYGIENE", siret: "912 345 678 00019", adresse: "1 rue de l'Essai", codePostal: "49000", ville: "Angers",
      telephone: "02 00 00 00 00", email: "contact@organisme-test.fr", siteWeb: "", nda: "52 49 99999 49",
      dirigeant: "Paul TESTARD", responsablePedagogique: "Paul TESTARD", referentHandicap: "Paul TESTARD",
      referentQualite: "Paul TESTARD", poleAdministratif: "Paul TESTARD", relationEntreprises: "Paul TESTARD",
      referentMobilite: "Paul TESTARD", domainesFormation: "Hygiène alimentaire et restauration", typesActions: ["actions-formation"],
      certifications: "", outilsUtilises: "Google Meet, Zoom", version: "1", dateMaj: "2026-11-20",
    };
    const f = { ...FORMATION_HYG14, formateur: "Paul TESTARD", lieu: "Google Meet / Zoom" };
    const stagiaires: StagiaireInfo[] = [
      { civilite: "Mme", nom: "ALPHA", prenom: "Claire", email: "claire.alpha@exemple.fr", telephone: "06 10 20 30 40", entreprise: "Snack Alpha", poste: "Gérante", dateNaissance: "1980-04-12", financeur: "Entreprise" },
      { civilite: "M.", nom: "BRAVO", prenom: "Julien", email: "julien.bravo@exemple.fr", telephone: "06 11 21 31 41", entreprise: "Snack Alpha", poste: "Cuisinier", dateNaissance: "1988-09-03", financeur: "Entreprise" },
      { civilite: "Mme", nom: "CHARLIE", prenom: "Inès", email: "ines.charlie@exemple.fr", telephone: "06 12 22 32 42", entreprise: "", poste: "Porteuse de projet", dateNaissance: "1995-01-27", financeur: "Personnel" },
    ];
    seedHYG14AICaches(f);
    const fuites: string[] = [];
    const catalogue = getFullCatalog(org, f, stagiaires);
    expect(catalogue.length).toBeGreaterThan(50);
    let generes = 0;
    for (const d of catalogue) {
      let html = "";
      try { html = generateDocumentById(d.id, d.template, d.params, org, f, stagiaires) || ""; } catch { continue; }
      if (html) generes++;
      const texte = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")
        .replace(/certification\s+(qualit[ée]\s+)?(«\s*)?Qualiopi/gi, "")
        .replace(/marque de certification/gi, "");
      const re = DOCS_ORGANISME.test(d.id) ? HORS_FORMATION : INTERDITS;
      const m = texte.match(new RegExp(`.{0,60}(${re.source}).{0,60}`, "i"));
      if (m) fuites.push(`${d.id} — ${d.nom} : …${m[0]}…`);
      if (/cuisine pédagogique équipée/i.test(texte)) fuites.push(`${d.id} — ${d.nom} : ressources « restauration » génériques`);
    }
    expect(generes).toBeGreaterThan(50);
    expect(fuites).toEqual([]);
  }, 600_000);
});
