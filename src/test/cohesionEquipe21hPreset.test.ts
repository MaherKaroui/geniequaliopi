import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_COH21, COH21_EXERCICES, COH21_QCM_COMPETENCES, COH21_QCM_DEBUT, COH21_QCM_FIN,
  COH21_CONTENT_PACK, COH21_EVAL_PACK, COH21_VEILLE_PACK, seedCOH21AICaches,
} from "@/lib/cohesionEquipe21hPreset";
import {
  isCOH21Formation, getCOH21AutoAnswers, getCOH21EvalBesoins, getCOH21Besoin, pickCOH21ExerciceAnswer,
  coh21NoteDebutSur20, coh21BonnesQcmDebut, coh21ReponsesQcmDebut, coh21NoteExercice, coh21Seed,
  COH21_QUESTIONS_OUVERTES,
} from "@/lib/cohesionEquipe21hHumanized";
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
 * Formation non certifiante : aucun code de répertoire, aucun certificateur, aucun jury, aucune
 * éligibilité au compte personnel de formation annoncée. « non certifiante » est autorisé.
 */
const INTERDITS = /RNCP|\bRS\s?\d{3,4}|\bCPF\b|France Compétences|\bjury|formation certifiante|titre professionnel|TOEIC/i;
/** Dans les sources et les packs du preset : pas non plus de certificateur. */
const INTERDITS_SOURCES = new RegExp(`${INTERDITS.source}|certificateur`, "i");

/**
 * Procédures générales de l'organisme (indicateurs, fiches de poste, plan de développement des
 * compétences de l'équipe pédagogique, veille, risques) : elles décrivent toute l'activité de
 * l'organisme et ne parlent pas de cette formation. Seul le certificateur y est contrôlé.
 */
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

/** Mot attendu dans chacune des 8 copies de chaque atelier (C1 à C6). */
const MOTS_EXERCICES = [/étape/, /[Cc]urseur/, /intégration/, /reformul/, /feedback/, /RACI/, /consentement/, /[Mm]ode/, /conversation/, /SMART/];

/** Autres détecteurs de formations exemples : aucun ne doit capter cet intitulé. */
const AUTRES = [isGSC35Formation, isIAP21Formation, isMSP21Formation, isANG40Formation, isARH41366Formation, isLRBFormation, isTVTEFormation, isWM14Formation, isRPMSFormation];

describe("Cohésion d'équipe en entreprise – 21 h — formation exemple non certifiante", () => {
  it("données de la formation : 21 h, 3 jours de 7 h, présentiel intra-entreprise, 4 à 12 participants, aucun prérequis", () => {
    const f = FORMATION_COH21;
    expect(f.intitule).toBe("Cohésion d'équipe en entreprise – 21 h");
    expect(f.codeRNCP).toBe("");
    expect(f.duree).toMatch(/^21 heures/);
    expect(f.duree).toMatch(/3 jours/);
    expect(f.duree).toMatch(/9h00 – 12h30/);
    expect(f.duree).toMatch(/13h30 – 17h00/);
    expect(f.dureeSaisiePrioritaire).toBe(true);
    expect(f.modalites).toBe("présentiel");
    expect(f.tarif).toBe("");
    expect(f.prerequis).toMatch(/Aucun/);
    expect(f.publicVise).toMatch(/4 à 12 participants/);
    expect(f.publicVise).toMatch(/managers et dirigeants/);
    expect(f.moyensPedagogiques).toMatch(/e-learning/);
    expect(f.moyensPedagogiques).toMatch(/Maison Lumen, entreprise fictive/);
    expect(f.objectifs).toMatch(/non certifiante/);
    for (const k of ["C1", "C2", "C3", "C4", "C5", "C6"]) expect(f.objectifs).toContain(k);
    expect(f.objectifs).toContain("Construire la charte d'équipe et un plan d'action collectif et individuel à 30, 60 et 90 jours");
    for (const j of ["JOUR 1", "JOUR 2", "JOUR 3"]) expect(f.programme).toContain(j);
    for (let m = 1; m <= 6; m++) expect(f.programme).toContain(`Module ${m}`);
    expect(f.methodesEvaluation).toMatch(/attestation de fin de formation/);
    expect(f.methodesEvaluation).toMatch(/certificat de réalisation/);
    // Aucune donnée de satisfaction inventée
    expect(f.tauxSatisfaction).toBeUndefined();
    expect(f.nombreAvisSatisfaction).toBeUndefined();
  });

  it("sélection par l'intitulé : variantes reconnues, aucune confusion avec une autre formation", () => {
    expect(isCOH21Formation(FORMATION_COH21.intitule, FORMATION_COH21.codeRNCP)).toBe(true);
    for (const v of [
      "cohésion d'équipe", "Cohésion d'équipe", "cohesion equipe", "COHESION D EQUIPE", "Cohésion d’équipe – 21 h",
      "Cohésion de l'équipe et communication", "Renforcer la cohésion des équipes", "Cohesion d'equipe en entreprise",
    ]) expect(isCOH21Formation(v), v).toBe(true);
    for (const v of [
      "Management d'équipe", "Animer une équipe – 14 h", "Gestion des conflits en entreprise", "Communication en entreprise",
      "Gérer son centre de formation – 35 h", "Anglais Professionnel – 40 h", "Excel – 21 h", "Intelligence artificielle – 21 h",
      "Cohésion sociale et insertion", "Équipe de cohésion", "",
    ]) expect(isCOH21Formation(v), v).toBe(false);
    expect(isCOH21Formation(undefined)).toBe(false);
    // Aucun autre preset ne capte l'intitulé, et le preset ne capte aucun autre exemple
    for (const is of AUTRES) expect(is(FORMATION_COH21.intitule, ""), is.name).toBe(false);
    const autresExemples = SAMPLE_FORMATIONS.filter(f => f.intitule !== FORMATION_COH21.intitule);
    expect(autresExemples.filter(f => isCOH21Formation(f.intitule, f.codeRNCP)).map(f => f.intitule)).toEqual([]);
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_COH21.intitule)).toHaveLength(1);
  });

  it("6 QCM (un par module) repris du contenu source, au format du générateur, sans « A) » dans les énoncés", () => {
    expect(COH21_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    for (const ex of COH21_QCM_COMPETENCES) {
      const { questions, correct } = parseQCM(ex.consigne, ex.reponseAttendue);
      expect(questions, ex.titre).toHaveLength(6);
      expect(ex.points).toBe(6);
      questions.forEach(q => {
        expect(q.opts.length, `${ex.titre} Q${q.num}`).toBeGreaterThanOrEqual(2);
        expect(q.opts.length, `${ex.titre} Q${q.num}`).toBeLessThanOrEqual(4);
        expect(q.enonce.length, `${ex.titre} Q${q.num}`).toBeGreaterThan(10);
        expect(q.enonce, `${ex.titre} Q${q.num}`).not.toMatch(/[A-D]\)/);
        expect(correct[q.num], `${ex.titre} Q${q.num}`).toMatch(/^[A-D]$/);
        expect(LETTRE_INDEX[correct[q.num]], `${ex.titre} Q${q.num}`).toBeLessThan(q.opts.length);
      });
      expect(new Set(Object.values(correct)).size, ex.titre).toBeGreaterThanOrEqual(2);
    }
    expect(COH21_EXERCICES).toHaveLength(10);
    expect(COH21_QCM_DEBUT).toHaveLength(10);
    expect(COH21_QCM_FIN).toHaveLength(10);
    for (const q of [...COH21_QCM_DEBUT, ...COH21_QCM_FIN]) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des ateliers", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = COH21_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = COH21_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/diagnostic/i);
    expect(fin[1]).toMatch(/préférences/i);
    expect(fin[2]).toMatch(/arrivant/i);
    expect(fin[3]).toMatch(/écoute/i);
    expect(fin[4]).toMatch(/feedback/i);
    expect(fin[5]).toMatch(/rôles/i);
    expect(fin[6]).toMatch(/décide/i);
    expect(fin[7]).toMatch(/tension/i);
    expect(fin[8]).toMatch(/conversation difficile/i);
    expect(fin[9]).toMatch(/charte/i);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getCOH21AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getCOH21AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getCOH21AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(coh21Seed("MARTIN", "Sophie")).toBe(coh21Seed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par atelier, tirées de la bonne banque", () => {
    COH21_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickCOH21ExerciceAnswer(FORMATION_COH21.intitule, "", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickCOH21ExerciceAnswer(FORMATION_COH21.intitule, "", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickCOH21ExerciceAnswer(FORMATION_COH21.intitule, "", 0, 0, { ...noms[0], entreprise: "SARL TEST" }, COH21_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/SARL TEST/);
    expect(pickCOH21ExerciceAnswer("Management d'équipe", "", 0, 0, noms[0], "C1")).toBeNull();
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, trois jours de 9h00 à 17h00", () => {
    const besoins = noms.map((s, i) => getCOH21EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /trois jours/.test(b.disponibilites))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getCOH21Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getCOH21EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => coh21NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    for (let i = 0; i < 100; i++) {
      const tot = getCOH21AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      expect(coh21BonnesQcmDebut(10, i) * 2).toBeLessThanOrEqual(12);
      const rep = coh21ReponsesQcmDebut(COH21_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === COH21_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(coh21BonnesQcmDebut(COH21_QCM_DEBUT.length, i));
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 4 }, (_, i) => coh21NoteExercice(i, ex, true))).size).toBe(4);
      expect(new Set(Array.from({ length: 6 }, (_, i) => coh21NoteExercice(i, ex, false))).size).toBe(6);
      expect(Math.max(...Array.from({ length: 12 }, (_, i) => coh21NoteExercice(i, ex, true)))).toBeLessThanOrEqual(6);
    }
  });

  it("formation non certifiante : aucun code de répertoire, certificateur, jury ou CPF dans les sources et les packs", () => {
    const sources = [
      "src/lib/cohesionEquipe21hPreset.ts", "src/lib/cohesionEquipe21hHumanized.ts", "src/lib/courseContentCohesionEquipe21h.ts",
      ...readdirSync(resolve(process.cwd(), "src/lib/cohesionEquipe21h")).filter(f => f.endsWith(".ts")).map(f => `src/lib/cohesionEquipe21h/${f}`),
    ];
    for (const p of sources) expect(lire(p).replace(/codeRNCP/g, ""), p).not.toMatch(INTERDITS_SOURCES);
    expect(lire("src/lib/cohesionEquipe21hHumanized.ts")).not.toMatch(/[A-D]\)/);
    const packs = JSON.stringify([COH21_CONTENT_PACK, COH21_EVAL_PACK, COH21_VEILLE_PACK, COH21_QUESTIONS_OUVERTES, FORMATION_COH21])
      .replace(/codeRNCP/g, "").replace(/https?:\/\/[^"]+/g, "");
    expect(packs).not.toMatch(INTERDITS_SOURCES);
    expect(packs).not.toMatch(/certification/i);
    // Aucune statistique ni taux de satisfaction inventés
    expect(packs).not.toMatch(/\d+\s?%/);
    expect(packs).not.toMatch(/taux de satisfaction/i);
  });
});

const LETTRE_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

describe("Cohésion d'équipe en entreprise – 21 h — câblage", () => {
  it("le support de cours compte 6 chapitres (un par module), repris du contenu source", async () => {
    const { getCourseChapters, getYoutubeVideos } = await import("@/lib/courseContent");
    for (const titre of [FORMATION_COH21.intitule, "Cohésion d'équipe", "cohesion equipe"]) {
      const chapitres = getCourseChapters(titre);
      expect(chapitres, titre).toHaveLength(6);
    }
    const chapitres = getCourseChapters(FORMATION_COH21.intitule);
    const html = chapitres.flatMap(c => c.sections.map(s => s.content)).join("");
    expect(html.length).toBeGreaterThanOrEqual(300_000);
    expect(chapitres.map(c => c.title.match(/module (\d)/)![1])).toEqual(["1", "2", "3", "4", "5", "6"]);
    for (const c of chapitres) {
      expect(c.sections.some(s => /quiz corrigé/i.test(s.title)), c.title).toBe(true);
      expect(c.sections.some(s => /^\d\.\d+ – Atelier/.test(s.title)), c.title).toBe(true);
      expect(c.sections.some(s => /Capsule vidéo/.test(s.title)), c.title).toBe(true);
      expect(c.sections.every(s => !s.content.includes("${")), c.title).toBe(true);
    }
    expect(chapitres[0].sections.some(s => /Positionnement/.test(s.title))).toBe(true);
    expect(chapitres[5].sections.some(s => /Évaluation finale des acquis/.test(s.title))).toBe(true);
    expect(html).toMatch(/Maison Lumen est une entreprise fictive/);
    expect(JSON.stringify(chapitres)).not.toMatch(INTERDITS);
    expect(getYoutubeVideos(FORMATION_COH21.intitule)).toBe(COH21_CONTENT_PACK.ressources.videos);
  }, 60_000);

  it("l'évaluation utilise les ateliers et QCM du preset ; « Management d'équipe » garde son contenu", { timeout: 60_000 }, async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_COH21.intitule);
    expect(ev.exercices[0].titre).toBe(COH21_EXERCICES[0].titre);
    expect(ev.qcmPositionnement).toEqual(COH21_QCM_DEBUT);
    expect(ev.competences).toHaveLength(6);
    expect(JSON.stringify(ev)).not.toMatch(INTERDITS);
    expect(getEvalContent("Cohésion de l'équipe").exercices[0].titre).toBe(COH21_EXERCICES[0].titre);
    const evMgt = getEvalContent("Management d'équipe");
    expect(evMgt.exercices[0].titre).not.toBe(COH21_EXERCICES[0].titre);
    const { getCourseChapters } = await import("@/lib/courseContent");
    expect(getCourseChapters("Management d'équipe")[0]?.title).not.toBe(getCourseChapters(FORMATION_COH21.intitule)[0].title);
  });

  it("dossier AF complet généré pour cet intitulé : aucune mention RNCP, RS, CPF, France Compétences ou jury", async () => {
    const { getFullCatalog, generateDocumentById } = await import("@/lib/documentGenerator");
    const org: OrganismeInfo = {
      nom: "ORGANISME TEST COHESION", siret: "912 345 678 00019", adresse: "1 rue de l'Essai", codePostal: "49000", ville: "Angers",
      telephone: "02 00 00 00 00", email: "contact@organisme-test.fr", siteWeb: "", nda: "52 49 99999 49",
      dirigeant: "Paul TESTARD", responsablePedagogique: "Paul TESTARD", referentHandicap: "Paul TESTARD",
      referentQualite: "Paul TESTARD", poleAdministratif: "Paul TESTARD", relationEntreprises: "Paul TESTARD",
      referentMobilite: "Paul TESTARD", domainesFormation: "Management et relations de travail", typesActions: ["actions-formation"],
      certifications: "", outilsUtilises: "Microsoft Teams", version: "1", dateMaj: "2026-11-04",
    };
    const f = { ...FORMATION_COH21, formateur: "Paul TESTARD", lieu: "Locaux de l'entreprise cliente, Angers" };
    const stagiaires: StagiaireInfo[] = [
      { civilite: "Mme", nom: "ALPHA", prenom: "Claire", email: "claire.alpha@exemple.fr", telephone: "06 10 20 30 40", entreprise: "Société Alpha", poste: "Responsable d'équipe", dateNaissance: "1980-04-12", financeur: "Entreprise" },
      { civilite: "M.", nom: "BRAVO", prenom: "Julien", email: "julien.bravo@exemple.fr", telephone: "06 11 21 31 41", entreprise: "Société Alpha", poste: "Chargé d'affaires", dateNaissance: "1988-09-03", financeur: "Entreprise" },
      { civilite: "Mme", nom: "CHARLIE", prenom: "Inès", email: "ines.charlie@exemple.fr", telephone: "06 12 22 32 42", entreprise: "Société Alpha", poste: "Assistante ADV", dateNaissance: "1995-01-27", financeur: "Entreprise" },
    ];
    seedCOH21AICaches(f);
    const fuites: string[] = [];
    const catalogue = getFullCatalog(org, f, stagiaires);
    expect(catalogue.length).toBeGreaterThan(50);
    let generes = 0;
    for (const d of catalogue) {
      let html = "";
      try { html = generateDocumentById(d.id, d.template, d.params, org, f, stagiaires) || ""; } catch { continue; }
      if (html) generes++;
      // Les mentions de la marque qualité de l'organisme (« certification Qualiopi ») ne concernent pas la formation.
      const texte = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")
        .replace(/certification\s+(qualit[ée]\s+)?(«\s*)?Qualiopi/gi, "")
        .replace(/marque de certification/gi, "");
      const re = DOCS_ORGANISME.test(d.id) ? HORS_FORMATION : INTERDITS;
      const m = texte.match(new RegExp(`.{0,60}(${re.source}).{0,60}`, "i"));
      if (m) fuites.push(`${d.id} — ${d.nom} : …${m[0]}…`);
    }
    expect(generes).toBeGreaterThan(50);
    expect(fuites).toEqual([]);
  }, 600_000);
});
