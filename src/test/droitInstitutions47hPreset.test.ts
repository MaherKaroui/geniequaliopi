import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_DRI47, DRI47_EXERCICES, DRI47_QCM_COMPETENCES, DRI47_QCM_DEBUT, DRI47_QCM_FIN,
  DRI47_QCM_DEBUT_EXPLICATIONS, DRI47_EXERCICES_COMPLETS,
  DRI47_CONTENT_PACK, DRI47_EVAL_PACK, DRI47_VEILLE_PACK, seedDRI47AICaches,
} from "@/lib/droitInstitutions47hPreset";
import {
  isDRI47Formation, getDRI47AutoAnswers, getDRI47EvalBesoins, getDRI47Besoin, pickDRI47ExerciceAnswer,
  dri47NoteDebutSur20, dri47BonnesQcmDebut, dri47ReponsesQcmDebut, dri47NoteExercice, dri47Seed,
  DRI47_QUESTIONS_OUVERTES,
} from "@/lib/droitInstitutions47hHumanized";
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
 * Formation non certifiante : aucun code de répertoire, aucun certificateur, aucun jury, aucune
 * éligibilité au compte personnel de formation annoncée. « non certifiante » est autorisé.
 */
const INTERDITS = /RNCP|\bRS\s?\d{3,4}|\bCPF\b|France Compétences|\bjury|formation certifiante|titre professionnel|TOEIC/i;
/** Dans les sources, les packs et le support de cours : pas non plus de certificateur. */
const INTERDITS_SOURCES = new RegExp(`${INTERDITS.source}|certificateur`, "i");

/**
 * Procédures générales de l'organisme (indicateurs, fiches de poste, plan de développement des
 * compétences de l'équipe pédagogique, veille, risques) : elles décrivent toute l'activité de
 * l'organisme et ne parlent pas de cette formation. Seul le certificateur y est contrôlé.
 */
/**
 * Vocabulaire juridique légitime du module 6 (jury criminel de la cour d'assises) et mention négative
 * sur l'attestation (« ni un diplôme, ni un titre professionnel ») : neutralisés avant le contrôle,
 * ils ne parlent ni de certification ni de jury d'examen.
 */
const neutraliserDroit = (t: string) => t
  .replace(/\bjury (criminel|populaire)\b/gi, "")
  .replace(/\b(avec|sans) jury\b/gi, "")
  .replace(/<strong>jury<\/strong> criminel/gi, "")
  .replace(/ni un diplôme, ni un titre professionnel/gi, "");
/** Support de cours : aucune mention RNCP, code RS, CPF, France Compétences ou certificateur. */
const INTERDITS_SUPPORT = /RNCP|\bRS\s?\d{3,4}|\bCPF\b|France Compétences|certificateur|formation certifiante|\bjury|titre professionnel/i;

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
const MOTS_EXERCICES = [/hiérarchie|constitutionnalité/, /en vigueur|rétroactiv/, /droit (public|privé)/, /contrat/, /Président/, /navette|constitutionnalité|49/, /préfet/, /[Ll]ibert/, /règlement|directive/, /tribunal/];

/** Autres détecteurs de formations exemples : aucun ne doit capter cet intitulé. */
const AUTRES = [isCOH21Formation, isGSC35Formation, isIAP21Formation, isMSP21Formation, isANG40Formation, isARH41366Formation, isLRBFormation, isTVTEFormation, isWM14Formation, isRPMSFormation];

const LETTRE_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

describe("Enseignement : fondamentaux du droit et des institutions — formation exemple non certifiante", () => {
  it("données de la formation : 47 h à distance, 3 667 €, aucun prérequis juridique, 6 modules", () => {
    const f = FORMATION_DRI47;
    expect(f.intitule).toBe("Enseignement : fondamentaux du droit et des institutions");
    expect(f.codeRNCP).toBe("");
    expect(f.duree).toBe("47 heures");
    expect(f.dureeSaisiePrioritaire).toBe(true);
    expect(f.modalites).toBe("distanciel");
    expect(f.lieu).toBe("Google Meet / Zoom");
    expect(f.tarif).toBe("3 667 € (TVA non applicable, art. 261-4-4° a du CGI)");
    expect(f.nombreParticipants).toBe("1");
    expect(f.formateur).toBe("");
    expect(f.dateDebut).toBe("2025-12-22");
    expect(f.dateFin).toBe("2025-12-30");
    expect(f.prerequis).toMatch(/Aucun prérequis juridique/);
    expect(f.prerequis).toMatch(/B2/);
    expect(f.delaiAcces).toMatch(/14 jours/);
    expect(f.publicVise).toMatch(/salarié, particulier/);
    expect(f.objectifs).toMatch(/non certifiante/);
    for (const k of ["C1", "C2", "C3", "C4", "C5", "C6"]) expect(f.objectifs).toContain(k);
    for (let m = 1; m <= 6; m++) expect(f.programme).toContain(`Module ${m}`);
    // Heures par module : 5 × 8 h + 7 h = 47 h
    const heures = [...f.programme.matchAll(/\(C\d, (\d+) h\)/g)].map(m => parseInt(m[1]));
    expect(heures).toEqual([8, 8, 8, 8, 8, 7]);
    expect(heures.reduce((a, b) => a + b, 0)).toBe(47);
    expect(f.methodesEvaluation).toMatch(/attestation de fin de formation/);
    expect(f.methodesEvaluation).toMatch(/certificat de réalisation/);
    expect(f.moyensPedagogiques).toMatch(/personnes et situations fictives/);
    // Aucune donnée de satisfaction inventée
    expect(f.tauxSatisfaction).toBeUndefined();
    expect(f.nombreAvisSatisfaction).toBeUndefined();
  });

  it("sélection par l'intitulé : variantes reconnues, aucune confusion avec une autre formation", () => {
    expect(isDRI47Formation(FORMATION_DRI47.intitule, FORMATION_DRI47.codeRNCP)).toBe(true);
    for (const v of [
      "Fondamentaux du droit", "fondamentaux du droit et des institutions", "ENSEIGNEMENT : FONDAMENTAUX DU DROIT ET DES INSTITUTIONS",
      "Droit et institutions", "Droit et des institutions – 47 h", "Les fondamentaux du droit – 47 h", "Introduction au droit et aux institutions : droit et institutions",
    ]) expect(isDRI47Formation(v), v).toBe(true);
    for (const v of [
      "Droit du travail", "Bases du droit du travail pour dirigeants", "Enseignement de la conduite", "Droit des affaires",
      "Institutions européennes", "Gérer son centre de formation – 35 h", "Cohésion d'équipe en entreprise – 21 h",
      "Anglais Professionnel – 40 h", "Excel – 21 h", "Droits et devoirs des apprentis", "",
    ]) expect(isDRI47Formation(v), v).toBe(false);
    expect(isDRI47Formation(undefined)).toBe(false);
    for (const is of AUTRES) expect(is(FORMATION_DRI47.intitule, ""), is.name).toBe(false);
    const autresExemples = SAMPLE_FORMATIONS.filter(f => f.intitule !== FORMATION_DRI47.intitule);
    expect(autresExemples.filter(f => isDRI47Formation(f.intitule, f.codeRNCP)).map(f => f.intitule)).toEqual([]);
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_DRI47.intitule)).toHaveLength(1);
  });

  it("10 mises en situation (C1 à C6) et 6 QCM de 10 questions, au format du générateur, sans « A) » dans les énoncés", () => {
    expect(DRI47_EXERCICES).toHaveLength(10);
    const comps = DRI47_EXERCICES.map(e => e.titre.match(/C\d/)![0]);
    expect(new Set(comps)).toEqual(new Set(["C1", "C2", "C3", "C4", "C5", "C6"]));
    expect(DRI47_EXERCICES.every(e => /fictiv/i.test(e.consigne))).toBe(true);
    expect(DRI47_EXERCICES_COMPLETS).toHaveLength(16);
    expect(DRI47_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    for (const ex of DRI47_QCM_COMPETENCES) {
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
    expect(DRI47_QCM_DEBUT).toHaveLength(10);
    expect(DRI47_QCM_DEBUT_EXPLICATIONS).toHaveLength(10);
    for (const q of [...DRI47_QCM_DEBUT, ...DRI47_QCM_FIN]) {
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
      expect(new Set(q.options).size).toBe(q.options.length);
    }
    expect(new Set(DRI47_QCM_DEBUT.map(q => q.correctIndex)).size).toBe(3);
    expect(DRI47_QCM_FIN.length).toBeGreaterThanOrEqual(10);
    expect(DRI47_QCM_FIN.length).toBeLessThanOrEqual(15);
    expect(DRI47_QCM_FIN.every(q => q.options.length === 4)).toBe(true);
    expect(new Set(DRI47_QCM_FIN.map(q => q.correctIndex)).size).toBe(4);
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = DRI47_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = DRI47_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/hiérarchie des normes/i);
    expect(fin[1]).toMatch(/règlement/i);
    expect(fin[2]).toMatch(/branche/i);
    expect(fin[3]).toMatch(/contrat/i);
    expect(fin[4]).toMatch(/Président/);
    expect(fin[5]).toMatch(/législative/i);
    expect(fin[6]).toMatch(/collectivités/i);
    expect(fin[7]).toMatch(/citoyen/i);
    expect(fin[8]).toMatch(/Union européenne/);
    expect(fin[9]).toMatch(/juridiction/i);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getDRI47AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.every(sc => sc <= 0.5))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getDRI47AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getDRI47AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(dri47Seed("MARTIN", "Sophie")).toBe(dri47Seed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    DRI47_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickDRI47ExerciceAnswer(FORMATION_DRI47.intitule, "", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickDRI47ExerciceAnswer(FORMATION_DRI47.intitule, "", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickDRI47ExerciceAnswer(FORMATION_DRI47.intitule, "", 0, 0, { ...noms[0], entreprise: "SARL TEST" }, DRI47_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/SARL TEST/);
    expect(pickDRI47ExerciceAnswer("Droit du travail", "", 0, 0, noms[0], "C1")).toBeNull();
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, 47 heures en classe virtuelle", () => {
    const besoins = noms.map((s, i) => getDRI47EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /47 heures/.test(b.disponibilites))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getDRI47Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getDRI47EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => dri47NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    for (let i = 0; i < 100; i++) {
      const tot = getDRI47AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(5);
      const rep = dri47ReponsesQcmDebut(DRI47_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === DRI47_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(dri47BonnesQcmDebut(DRI47_QCM_DEBUT.length, i));
      expect(rep).toHaveLength(10);
      rep.forEach((r, qi) => { expect(r).toBeGreaterThanOrEqual(0); expect(r).toBeLessThan(DRI47_QCM_DEBUT[qi].options.length); });
      expect(bonnes).toBeGreaterThanOrEqual(2);
      expect(bonnes).toBeLessThanOrEqual(6);
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 4 }, (_, i) => dri47NoteExercice(i, ex, true))).size).toBe(4);
      expect(new Set(Array.from({ length: 6 }, (_, i) => dri47NoteExercice(i, ex, false))).size).toBe(6);
      expect(Math.max(...Array.from({ length: 12 }, (_, i) => dri47NoteExercice(i, ex, true)))).toBeLessThanOrEqual(10);
    }
  });

  it("formation non certifiante : aucun code de répertoire, certificateur, jury ou CPF dans les sources et les packs", () => {
    const sources = [
      "src/lib/droitInstitutions47hPreset.ts", "src/lib/droitInstitutions47hHumanized.ts", "src/lib/courseContentDroitInstitutions47h.ts",
      ...readdirSync(resolve(process.cwd(), "src/lib/droitInstitutions47h")).filter(f => f.endsWith(".ts")).map(f => `src/lib/droitInstitutions47h/${f}`),
    ];
    for (const p of sources) expect(neutraliserDroit(lire(p).replace(/codeRNCP/g, "")), p).not.toMatch(INTERDITS_SOURCES);
    for (const p of sources) expect(lire(p), p).not.toMatch(/\/\/ BOUCHON/);
    expect(lire("src/lib/droitInstitutions47hHumanized.ts")).not.toMatch(/[A-D]\)/);
    const packs = JSON.stringify([DRI47_CONTENT_PACK, DRI47_EVAL_PACK, DRI47_VEILLE_PACK, DRI47_QUESTIONS_OUVERTES, FORMATION_DRI47])
      .replace(/codeRNCP/g, "").replace(/https?:\/\/[^"]+/g, "");
    expect(packs).not.toMatch(INTERDITS_SOURCES);
    expect(packs).not.toMatch(/certification/i);
    // Aucune statistique ni taux de satisfaction inventés
    expect(packs).not.toMatch(/\d+\s?%/);
    expect(packs).not.toMatch(/taux de satisfaction/i);
    // Liens limités aux sites officiels autorisés (et aux recherches YouTube des vidéos)
    const liens = JSON.stringify([DRI47_CONTENT_PACK, DRI47_VEILLE_PACK]).match(/https?:\/\/[^"\s<]+/g) || [];
    const AUTORISES = /^https:\/\/(www\.)?(legifrance\.gouv\.fr|conseil-constitutionnel\.fr|conseil-etat\.fr|courdecassation\.fr|vie-publique\.fr|service-public\.fr|europa\.eu|eur-lex\.europa\.eu|echr\.coe\.int|assemblee-nationale\.fr|senat\.fr|youtube\.com\/results)/;
    expect(liens.filter(l => !AUTORISES.test(l))).toEqual([]);
  });
});

describe("Enseignement : fondamentaux du droit et des institutions — câblage", () => {
  it("le support de cours compte 6 chapitres (un par module), au moins 500 000 caractères", async () => {
    const { getCourseChapters, getYoutubeVideos } = await import("@/lib/courseContent");
    for (const titre of [FORMATION_DRI47.intitule, "Fondamentaux du droit", "Droit et institutions"]) {
      expect(getCourseChapters(titre), titre).toHaveLength(6);
    }
    const chapitres = getCourseChapters(FORMATION_DRI47.intitule);
    const html = chapitres.flatMap(c => c.sections.map(s => s.content)).join("");
    expect(html.length).toBeGreaterThanOrEqual(500_000);
    expect(chapitres.map(c => c.title.match(/Module (\d)/i)![1])).toEqual(["1", "2", "3", "4", "5", "6"]);
    for (const c of chapitres) {
      expect(c.sections.length, c.title).toBeGreaterThan(3);
      expect(c.sections.every(s => !s.content.includes("${")), c.title).toBe(true);
    }
    const support = JSON.stringify(chapitres);
    expect(support).not.toMatch(/France Compétences|certificateur|RNCP|\bCPF\b/i);
    expect(neutraliserDroit(support)).not.toMatch(INTERDITS_SUPPORT);
    expect(getYoutubeVideos(FORMATION_DRI47.intitule)).toBe(DRI47_CONTENT_PACK.ressources.videos);
  }, 60_000);

  it("l'évaluation utilise les exercices et QCM du preset ; « Droit du travail » garde son contenu", { timeout: 60_000 }, async () => {
    const { getEvalContent, hasEvalContentDedie } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_DRI47.intitule);
    expect(ev.exercices[0].titre).toBe(DRI47_EXERCICES[0].titre);
    expect(ev.exercices).toHaveLength(16);
    expect(ev.qcmPositionnement).toEqual(DRI47_QCM_DEBUT);
    expect(ev.qcmFinal).toEqual(DRI47_QCM_FIN);
    expect(ev.competences).toHaveLength(6);
    expect(JSON.stringify(ev)).not.toMatch(INTERDITS);
    expect(hasEvalContentDedie(FORMATION_DRI47.intitule)).toBe(true);
    expect(getEvalContent("Droit et institutions").exercices[0].titre).toBe(DRI47_EXERCICES[0].titre);
    expect(getEvalContent("Droit du travail").exercices[0]?.titre).not.toBe(DRI47_EXERCICES[0].titre);
    const { getCourseChapters } = await import("@/lib/courseContent");
    expect(getCourseChapters("Droit du travail")[0]?.title).not.toBe(getCourseChapters(FORMATION_DRI47.intitule)[0].title);
  });

  it("dossier AF complet généré pour cet intitulé : aucune mention RNCP, RS, CPF, France Compétences ou jury", async () => {
    const { getFullCatalog, generateDocumentById } = await import("@/lib/documentGenerator");
    const org: OrganismeInfo = {
      nom: "ORGANISME TEST DROIT", siret: "912 345 678 00019", adresse: "1 rue de l'Essai", codePostal: "75011", ville: "Paris",
      telephone: "01 00 00 00 00", email: "contact@organisme-test.fr", siteWeb: "", nda: "11 75 99999 75",
      dirigeant: "Paul TESTARD", responsablePedagogique: "Paul TESTARD", referentHandicap: "Paul TESTARD",
      referentQualite: "Paul TESTARD", poleAdministratif: "Paul TESTARD", relationEntreprises: "Paul TESTARD",
      referentMobilite: "Paul TESTARD", domainesFormation: "Droit et institutions", typesActions: ["actions-formation"],
      certifications: "", outilsUtilises: "Google Meet, Zoom", version: "1", dateMaj: "2026-11-05",
    };
    const f = { ...FORMATION_DRI47, formateur: "Paul TESTARD" };
    const stagiaires: StagiaireInfo[] = [
      { civilite: "Mme", nom: "ALPHA", prenom: "Claire", email: "claire.alpha@exemple.fr", telephone: "06 10 20 30 40", entreprise: "", poste: "Assistante administrative", dateNaissance: "1990-04-12", financeur: "Personnel" },
    ];
    seedDRI47AICaches(f);
    const fuites: string[] = [];
    const catalogue = getFullCatalog(org, f, stagiaires);
    expect(catalogue.length).toBeGreaterThan(50);
    let generes = 0;
    for (const d of catalogue) {
      let html = "";
      try { html = generateDocumentById(d.id, d.template, d.params, org, f, stagiaires) || ""; } catch { continue; }
      if (html) generes++;
      // Les mentions de la marque qualité de l'organisme (« certification Qualiopi ») ne concernent pas la formation.
      const texte = neutraliserDroit(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "))
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
