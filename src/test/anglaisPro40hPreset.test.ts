import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_ANG40, ANG40_EXERCICES, ANG40_QCM_COMPETENCES, ANG40_QCM_DEBUT, ANG40_QCM_FIN,
  ANG40_CONTENT_PACK, ANG40_EVAL_PACK, ANG40_VEILLE_PACK, seedANG40AICaches,
} from "@/lib/anglaisPro40hPreset";
import {
  isANG40Formation, getANG40AutoAnswers, getANG40EvalBesoins, getANG40Besoin, pickANG40ExerciceAnswer,
  ang40NoteDebutSur20, ang40BonnesQcmDebut, ang40ReponsesQcmDebut, ang40NoteExercice, ang40Seed,
  ANG40_QUESTIONS_OUVERTES,
} from "@/lib/anglaisPro40hHumanized";
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";
import type { OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";

const TOEIC = SAMPLE_FORMATIONS.find(f => f.intitule === "Anglais Professionnel – Préparation TOEIC")!;
const lire = (p: string) => readFileSync(resolve(process.cwd(), p), "utf-8");

/**
 * Mots interdits pour une formation non certifiante : aucun examen externe, aucun code de répertoire,
 * aucun jury, aucune éligibilité annoncée. « non certifiante » ne contient pas « certification ».
 */
const INTERDITS = /TOEIC|VTest|RNCP|\bRS\s?\d|certification|\bCPF\b|France Compétences|\bjury/i;

/** Examens externes : interdits partout, y compris dans les procédures générales de l'organisme. */
const EXAMENS = /TOEIC|VTest|Linguaskill|TOEFL|IELTS|RS\s?6905/i;

/**
 * Procédures générales de l'organisme (indicateurs de performance, fiches de poste, plan de
 * développement des compétences de l'équipe, veille, analyse des risques) : elles décrivent toute
 * l'activité de l'organisme (financements CPF, formations certifiantes éventuelles) et ne parlent
 * pas de cette formation. Seuls les examens externes y sont contrôlés.
 */
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

/** Mot attendu dans chacune des 8 copies de chaque mise en situation (diagnostic puis C1 à C6). */
const MOTS_EXERCICES = [/niveau/, /company/, /glossaire/, /Dear/, /action points/, /message/, /visio/, /point/, /slide/, /objection/];

describe("Anglais Professionnel – 40 h — formation exemple non certifiante", () => {
  it("données de la convention et du BPF : 40 h, 6 jours, présentiel, 1 000 € HT, salariés, A2", () => {
    const f = FORMATION_ANG40;
    expect(f.intitule).toBe("Anglais Professionnel – 40 h");
    expect(f.codeRNCP).toBe("");
    expect(f.duree).toMatch(/40 heures/);
    expect(f.duree).toMatch(/6 jours/);
    expect(f.modalites).toBe("présentiel");
    expect(f.tarif).toMatch(/1 000 € HT/);
    expect(f.tarif).toMatch(/261-4-4° a du CGI/);
    expect(f.prerequis).toMatch(/A2/);
    expect(f.publicVise).toMatch(/Salariés/);
    expect(f.moyensPedagogiques).toMatch(/locaux de l'entreprise cliente/);
    expect(f.objectifs).toMatch(/non certifiante/);
    for (const k of ["C1", "C2", "C3", "C4", "C5", "C6"]) expect(f.objectifs).toContain(k);
    for (const j of ["JOUR 1", "JOUR 2", "JOUR 3", "JOUR 4", "JOUR 5", "JOUR 6"]) expect(f.programme).toContain(j);
    expect(f.methodesEvaluation).toMatch(/attestation de fin de formation/);
    expect(f.methodesEvaluation).toMatch(/certificat de réalisation/);
    // Aucune donnée de satisfaction inventée
    expect(f.tauxSatisfaction).toBeUndefined();
    expect(f.nombreAvisSatisfaction).toBeUndefined();
  });

  it("sélection par l'intitulé : le preset 40 h ne capte ni l'exemple TOEIC ni les autres formations d'anglais", () => {
    expect(isANG40Formation(FORMATION_ANG40.intitule, FORMATION_ANG40.codeRNCP)).toBe(true);
    expect(isANG40Formation("Anglais professionnel 40h")).toBe(true);
    expect(TOEIC).toBeTruthy();
    expect(isANG40Formation(TOEIC.intitule, TOEIC.codeRNCP)).toBe(false);
    expect(isANG40Formation("Anglais Niveau A1 – Débutant")).toBe(false);
    expect(isANG40Formation("Anglais Professionnel – Certification VTest Business English (RS6905)")).toBe(false);
    expect(isANG40Formation("Anglais 140 h")).toBe(false);
    expect(isANG40Formation("Excel – 40 h")).toBe(false);
    expect(isANG40Formation(undefined)).toBe(false);
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_ANG40.intitule)).toHaveLength(1);
  });

  it("6 QCM de 10 questions au format du générateur, sans « A) » dans les énoncés", () => {
    expect(ANG40_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    for (const ex of ANG40_QCM_COMPETENCES) {
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
    expect(ANG40_EXERCICES).toHaveLength(10);
    expect(ANG40_QCM_DEBUT).toHaveLength(10);
    expect(ANG40_QCM_FIN).toHaveLength(10);
    for (const q of [...ANG40_QCM_DEBUT, ...ANG40_QCM_FIN]) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = ANG40_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = ANG40_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/diagnostic/i);
    expect(fin[1]).toMatch(/présent/i);
    expect(fin[3]).toMatch(/email/i);
    expect(fin[4]).toMatch(/compte rendu/i);
    expect(fin[5]).toMatch(/téléphon/i);
    expect(fin[6]).toMatch(/visioconférence/i);
    expect(fin[7]).toMatch(/réunion/i);
    expect(fin[8]).toMatch(/présentation/i);
    expect(fin[9]).toMatch(/négociation/i);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getANG40AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getANG40AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getANG40AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(ang40Seed("MARTIN", "Sophie")).toBe(ang40Seed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    ANG40_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickANG40ExerciceAnswer(FORMATION_ANG40.intitule, "", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickANG40ExerciceAnswer(FORMATION_ANG40.intitule, "", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickANG40ExerciceAnswer(FORMATION_ANG40.intitule, "", 0, 0, { ...noms[0], entreprise: "SARL TEST" }, ANG40_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/SARL TEST/);
    expect(pickANG40ExerciceAnswer(TOEIC.intitule, TOEIC.codeRNCP, 0, 0, noms[0], "C1")).toBeNull();
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, six jours dans les locaux de l'entreprise", () => {
    const besoins = noms.map((s, i) => getANG40EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /six jours/.test(b.disponibilites))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getANG40Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getANG40EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => ang40NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    for (let i = 0; i < 100; i++) {
      const tot = getANG40AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      expect(ang40BonnesQcmDebut(10, i) * 2).toBeLessThanOrEqual(12);
      const rep = ang40ReponsesQcmDebut(ANG40_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === ANG40_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(ang40BonnesQcmDebut(ANG40_QCM_DEBUT.length, i));
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 6 }, (_, i) => ang40NoteExercice(i, ex, true))).size).toBe(6);
      expect(new Set(Array.from({ length: 6 }, (_, i) => ang40NoteExercice(i, ex, false))).size).toBe(6);
    }
  });

  it("formation non certifiante : aucun examen externe, code de répertoire, jury ou CPF dans les sources et les packs", () => {
    const sources = [
      "src/lib/anglaisPro40hPreset.ts", "src/lib/anglaisPro40hHumanized.ts", "src/lib/courseContentAnglaisPro40h.ts",
      ...readdirSync(resolve(process.cwd(), "src/lib/anglaisPro40h")).filter(f => f.endsWith(".ts")).map(f => `src/lib/anglaisPro40h/${f}`),
    ];
    for (const p of sources) expect(lire(p).replace(/codeRNCP/g, ""), p).not.toMatch(INTERDITS);
    expect(lire("src/lib/anglaisPro40hHumanized.ts")).not.toMatch(/[A-D]\)/);
    const packs = JSON.stringify([ANG40_CONTENT_PACK, ANG40_EVAL_PACK, ANG40_VEILLE_PACK, ANG40_QUESTIONS_OUVERTES]);
    expect(packs).not.toMatch(INTERDITS);
  });
});

describe("Anglais Professionnel – 40 h — câblage", () => {
  it("le support de cours compte 6 chapitres, plus de 500 000 caractères, un quiz et un cas pratique par chapitre", async () => {
    const { getCourseChapters } = await import("@/lib/courseContent");
    const chapitres = getCourseChapters(FORMATION_ANG40.intitule);
    expect(chapitres).toHaveLength(6);
    const html = chapitres.flatMap(c => c.sections.map(s => s.content)).join("");
    expect(html.length).toBeGreaterThanOrEqual(500_000);
    // ≈ 3 000 caractères de texte par page A4 : plus de 60 pages
    expect(html.replace(/<[^>]+>/g, " ").length).toBeGreaterThan(60 * 3000);
    for (const c of chapitres) {
      expect(c.sections.some(s => /quiz/i.test(s.title)), c.title).toBe(true);
      expect(c.sections.some(s => /cas pratique/i.test(s.title)), c.title).toBe(true);
      expect(c.sections.every(s => !s.content.includes("${")), c.title).toBe(true);
    }
    expect(JSON.stringify(chapitres)).not.toMatch(INTERDITS);
  }, 60_000);

  it("l'évaluation utilise les exercices et QCM du preset ; l'exemple TOEIC garde son contenu", { timeout: 60_000 }, async () => {
    const { getEvalContent, getQuestionsOuvertes } = await import("@/lib/evalContent") as typeof import("@/lib/evalContent") & { getQuestionsOuvertes?: unknown };
    const ev = getEvalContent(FORMATION_ANG40.intitule);
    expect(ev.exercices[0].titre).toBe(ANG40_EXERCICES[0].titre);
    expect(ev.qcmPositionnement).toEqual(ANG40_QCM_DEBUT);
    expect(JSON.stringify(ev)).not.toMatch(INTERDITS);
    void getQuestionsOuvertes;
    const evToeic = getEvalContent(TOEIC.intitule);
    expect(evToeic.exercices[0].titre).not.toBe(ANG40_EXERCICES[0].titre);
    const { getCourseChapters } = await import("@/lib/courseContent");
    expect(getCourseChapters(TOEIC.intitule)).not.toHaveLength(6);
  });

  it("dossier AF complet généré pour cet intitulé : aucune mention TOEIC, VTest, RNCP, RS, CPF, France Compétences ou jury", async () => {
    const { getFullCatalog, generateDocumentById } = await import("@/lib/documentGenerator");
    const org: OrganismeInfo = {
      nom: "ORGANISME TEST ANGLAIS", siret: "912 345 678 00019", adresse: "1 rue de l'Essai", codePostal: "75011", ville: "Paris",
      telephone: "01 00 00 00 00", email: "contact@organisme-test.fr", siteWeb: "", nda: "11 75 99999 75",
      dirigeant: "Paul TESTARD", responsablePedagogique: "Paul TESTARD", referentHandicap: "Paul TESTARD",
      referentQualite: "Paul TESTARD", poleAdministratif: "Paul TESTARD", relationEntreprises: "Paul TESTARD",
      referentMobilite: "Paul TESTARD", domainesFormation: "Langues", typesActions: ["actions-formation"],
      certifications: "", outilsUtilises: "Microsoft Teams", version: "1", dateMaj: "2026-11-02",
    };
    const f = { ...FORMATION_ANG40, formateur: "Paul TESTARD", lieu: "Locaux de l'entreprise cliente, Lyon" };
    const stagiaires: StagiaireInfo[] = [
      { civilite: "Mme", nom: "ALPHA", prenom: "Claire", email: "claire.alpha@exemple.fr", telephone: "06 10 20 30 40", entreprise: "Société Alpha", poste: "Assistante export", dateNaissance: "1990-04-12", financeur: "Entreprise" },
      { civilite: "M.", nom: "BRAVO", prenom: "Julien", email: "julien.bravo@exemple.fr", telephone: "06 11 21 31 41", entreprise: "Société Alpha", poste: "Acheteur", dateNaissance: "1988-09-03", financeur: "Entreprise" },
      { civilite: "Mme", nom: "CHARLIE", prenom: "Inès", email: "ines.charlie@exemple.fr", telephone: "06 12 22 32 42", entreprise: "Société Alpha", poste: "Technicienne SAV", dateNaissance: "1985-01-27", financeur: "Entreprise" },
    ];
    seedANG40AICaches(f);
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
      const re = DOCS_ORGANISME.test(d.id) ? EXAMENS : INTERDITS;
      const m = texte.match(new RegExp(`.{0,60}(${re.source}).{0,60}`, "i"));
      if (m) fuites.push(`${d.id} — ${d.nom} : …${m[0]}…`);
    }
    expect(generes).toBeGreaterThan(50);
    expect(fuites).toEqual([]);
  }, 600_000);
});
