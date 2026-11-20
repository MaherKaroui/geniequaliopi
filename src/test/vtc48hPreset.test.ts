import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_VTC48, VTC48_EXERCICES, VTC48_QCM_COMPETENCES, VTC48_QCM_DEBUT, VTC48_QCM_FIN,
  VTC48_QCM_DEBUT_EXPLICATIONS, VTC48_VIDEOS,
  VTC48_CONTENT_PACK, VTC48_EVAL_PACK, VTC48_VEILLE_PACK, seedVTC48AICaches,
} from "@/lib/vtc48hPreset";
import {
  isVTC48Formation, getVTC48AutoAnswers, getVTC48EvalBesoins, getVTC48Besoin, pickVTC48ExerciceAnswer,
  vtc48NoteDebutSur20, vtc48BonnesQcmDebut, vtc48ReponsesQcmDebut, vtc48NoteExercice, vtc48Seed,
  VTC48_QUESTIONS_OUVERTES,
} from "@/lib/vtc48hHumanized";
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
 * Formation certifiante au Répertoire spécifique : seul le code RS5637 est autorisé. Aucun code RNCP, aucun
 * autre code RS (taxi RS5635…), aucun titre professionnel, aucun jury, aucun TOEIC.
 */
const INTERDITS = /RNCP\s?\d|\bRS\s?(?!5637\b)\d{3,4}|TOEIC/i;
const INTERDITS_SOURCES = new RegExp(`${INTERDITS.source}|\\bRNCP\\b|\\bjury|titre professionnel`, "i");

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
const MOTS_EXERCICES = [
  /carte professionnelle/, /réservation/, /micro-entreprise|SASU|EURL|\bSAS\b|statut/, /seuil/, /alert/i,
  /pause/, /anglais/, /client/, /plateforme/, /factur/,
];

/** Autres détecteurs de formations exemples : aucun ne doit capter cet intitulé. */
const AUTRES = [isHYG14Formation, isCOH21Formation, isGSC35Formation, isIAP21Formation, isMSP21Formation, isANG40Formation, isARH41366Formation, isLRBFormation, isTVTEFormation, isWM14Formation, isRPMSFormation];

const LETTRE_INDEX: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

describe("Préparation à l'examen VTC (RS5637) – 48 h — formation exemple certifiante", () => {
  it("données de la formation : RS5637, 48 h sur 7 jours (6 × 7 h + 6 h), distanciel, 480 € par stagiaire, 1 à 12 stagiaires", () => {
    const f = FORMATION_VTC48;
    expect(f.intitule).toBe("Préparation à l'examen d'accès à la profession de conducteur VTC (RS5637) – 48 h");
    expect(f.codeRNCP).toBe("RS5637");
    expect(f.duree).toMatch(/^48 heures/);
    expect(f.duree).toMatch(/7 jours/);
    expect(f.duree).toMatch(/jours 1 à 6 de 7 h \(09h00 – 12h30 \/ 13h30 – 17h00\)/);
    expect(f.duree).toMatch(/jour 7 de 6 h \(09h00 – 12h30 \/ 13h30 – 16h00\)/);
    expect(f.dureeSaisiePrioritaire).toBe(true);
    expect(f.modalites).toBe("distanciel");
    expect(f.tarif).toBe("480 € net de taxes par stagiaire");
    expect(f.lieu).toBe("");
    expect(f.formateur).toBe("");
    expect(f.prerequis).toMatch(/permis B hors période probatoire/);
    expect(f.publicVise).toMatch(/1 à 12 stagiaires/);
    expect(f.moyensPedagogiques).toMatch(/classe virtuelle/);
    expect(f.moyensPedagogiques).toMatch(/Samir/);
    expect(f.moyensPedagogiques).toMatch(/conduite réelle en véhicule n'est pas incluse/);
    expect(f.objectifs).toMatch(/Répertoire spécifique sous le code RS5637/);
    expect(f.objectifs).toMatch(/chambres de métiers et de l'artisanat/);
    for (const k of ["C1", "C2", "C3", "C4", "C5", "C6"]) expect(f.objectifs).toContain(k);
    // Programme « Module N — Titre (Cx, N h) : a ; b ; c », 48 h au total
    const heures = [...f.programme.matchAll(/^Module (\d) — [^\n]+\((C\d), (\d+) h\) : [^\n]+;/gm)];
    expect(heures.map(m => m[1])).toEqual(["1", "2", "3", "4", "5", "6"]);
    expect(heures.map(m => m[2])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    expect(heures.reduce((t, m) => t + parseInt(m[3]), 0)).toBe(48);
    expect(f.programme).not.toContain("Module 7");
    // Rythme aligné sur les émargements : 7 jours, « JOUR N — … (7 h) », le dernier de 6 h
    const jours = [...f.programme.matchAll(/^JOUR (\d) — [^\n]+\((\d) h\)$/gm)];
    expect(jours.map(m => m[1])).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
    expect(jours.map(m => parseInt(m[2]))).toEqual([7, 7, 7, 7, 7, 7, 6]);
    // Aucun reste de l'ancien rythme en séances de 4 h
    const textes = [f.duree, f.programme, f.methodesEvaluation, f.delaiAcces, f.moyensPedagogiques].join(" ");
    expect(textes).not.toMatch(/séance|13h00/i);
    expect(f.dateDebut).toBe("2026-12-01");
    expect(f.dateFin).toBe("2026-12-08");
    expect(f.methodesEvaluation).toMatch(/certificat de réalisation/);
    expect(f.methodesEvaluation).toMatch(/arrêté du 6 avril 2017/);
    expect(f.methodesEvaluation).toMatch(/s'inscrit lui-même/);
    // Les dates de la session précèdent la fin d'enregistrement de la fiche RS5637 (31/12/2026)
    expect(f.dateFin <= "2026-12-31").toBe(true);
    expect(f.tauxSatisfaction).toBeUndefined();
    expect(f.nombreAvisSatisfaction).toBeUndefined();
  });

  it("sélection : variantes VTC reconnues, taxi et autres formations jamais captés", () => {
    expect(isVTC48Formation(FORMATION_VTC48.intitule, FORMATION_VTC48.codeRNCP)).toBe(true);
    for (const v of [
      "Préparation à l'examen VTC – 48 h", "Formation VTC 48h", "Chauffeur VTC – 48 h", "Habilitation VTC – Préparation à l'examen (RS5637) – 48 heures",
      "Conducteur de voiture de transport avec chauffeur – 48 h", "VOITURE DE TRANSPORT AVEC CHAUFFEUR 48H", "Préparation RS5637 (48 h)",
    ]) expect(isVTC48Formation(v), v).toBe(true);
    expect(isVTC48Formation("Préparation à l'examen – 48 h", "RS5637")).toBe(true);
    expect(isVTC48Formation("Préparation à l'examen – 48 heures", "RS 5637")).toBe(true);
    // Sans la durée de 48 h dans l'intitulé : jamais capté (autres formations VTC, dossiers d'autres organismes)
    for (const v of [
      "Préparation à l'examen VTC", "Formation VTC", "Habilitation VTC – Préparation à l'examen (RS5637)", "Préparation VTC – 35 h",
      "Conducteur de voiture de transport avec chauffeur", "Préparation RS5637", "Formation VTC – 148 h",
    ]) expect(isVTC48Formation(v), v).toBe(false);
    expect(isVTC48Formation("Préparation à l'examen", "RS5637")).toBe(false);
    expect(isVTC48Formation("Habilitation VTC – Préparation à l'examen (RS5637)", "RS5637")).toBe(false);
    for (const v of [
      "Préparation à l'examen de conducteur de taxi", "Taxi / VTC – examen commun", "Examen taxi (RS5635)", "Conducteur de VMDTR",
      "Formation continue VTC – 14 h", "Chauffeur PL (poids lourd)", "Conducteur de travaux", "Enseignant de la conduite et de la sécurité routière",
      "Transport de personnes à mobilité réduite", "Gérer son centre de formation – 35 h", "Hygiène alimentaire en restauration commerciale – 14 h",
      "Bilan de compétences – reconversion VTC", "",
    ]) expect(isVTC48Formation(v), v).toBe(false);
    expect(isVTC48Formation(undefined)).toBe(false);
    // Un autre code de répertoire saisi l'emporte sur l'intitulé
    expect(isVTC48Formation("Préparation VTC – 48 h", "RS5635")).toBe(false);
    expect(isVTC48Formation("Formation VTC – 48 h", "RNCP12345")).toBe(false);
    // Aucun autre preset ne capte l'intitulé
    for (const is of AUTRES) expect(is(FORMATION_VTC48.intitule, FORMATION_VTC48.codeRNCP), is.name).toBe(false);
    // Le preset ne capte que les formations VTC de la liste d'exemples, et aucune fiche du référentiel hors RS5637
    // Seule la nouvelle formation exemple est captée : l'ancienne « Habilitation VTC – Préparation à l'examen (RS5637) » ne l'est plus
    const captees = SAMPLE_FORMATIONS.filter(f => isVTC48Formation(f.intitule, f.codeRNCP));
    expect(captees.map(f => f.intitule)).toEqual([FORMATION_VTC48.intitule]);
    const ancienne = SAMPLE_FORMATIONS.find(f => f.intitule === "Habilitation VTC – Préparation à l'examen (RS5637)");
    expect(ancienne).toBeDefined();
    expect(isVTC48Formation(ancienne!.intitule, ancienne!.codeRNCP)).toBe(false);
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_VTC48.intitule)).toHaveLength(1);
    // Aucune fiche du référentiel (intitulés officiels sans durée) n'est captée
    expect(RNCP_FICHES.filter(f => isVTC48Formation(f.intitule, f.code)).map(f => f.code)).toEqual([]);
  });

  it("6 QCM de 10 questions (un par compétence), au format du générateur, sans « A) » dans les énoncés", () => {
    expect(VTC48_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    for (const ex of VTC48_QCM_COMPETENCES) {
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
    expect(VTC48_EXERCICES).toHaveLength(10);
    VTC48_EXERCICES.forEach((e, i) => expect(e.titre).toMatch(new RegExp(`^Exercice ${i + 1} — C[1-6]`)));
    expect(VTC48_QCM_DEBUT).toHaveLength(10);
    expect(VTC48_QCM_DEBUT_EXPLICATIONS).toHaveLength(10);
    expect(VTC48_QCM_FIN).toHaveLength(10);
    for (const q of [...VTC48_QCM_DEBUT, ...VTC48_QCM_FIN]) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
    }
    expect(new Set(VTC48_QCM_DEBUT.map(q => q.correctIndex)).size).toBe(4);
    expect(new Set(VTC48_QCM_FIN.map(q => q.correctIndex)).size).toBeGreaterThanOrEqual(3);
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = VTC48_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = VTC48_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/conditions d'accès/);
    expect(fin[1]).toMatch(/réservation préalable/);
    expect(fin[2]).toMatch(/statut/);
    expect(fin[3]).toMatch(/seuil de rentabilité/);
    expect(fin[4]).toMatch(/accident/);
    expect(fin[5]).toMatch(/sécurité/);
    expect(fin[6]).toMatch(/anglais/);
    expect(fin[7]).toMatch(/commercial/);
    expect(fin[8]).toMatch(/plateformes/);
    expect(fin[9]).toMatch(/épreuve pratique/);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getVTC48AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getVTC48AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getVTC48AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(vtc48Seed("MARTIN", "Sophie")).toBe(vtc48Seed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    VTC48_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickVTC48ExerciceAnswer(FORMATION_VTC48.intitule, "RS5637", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickVTC48ExerciceAnswer(FORMATION_VTC48.intitule, "RS5637", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickVTC48ExerciceAnswer(FORMATION_VTC48.intitule, "", 0, 0, { ...noms[0], entreprise: "VTC TEST" }, VTC48_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/VTC TEST/);
    expect(pickVTC48ExerciceAnswer("Préparation à l'examen de conducteur de taxi", "RS5635", 0, 0, noms[0], "C1")).toBeNull();
    // Accords : aucune forme féminine dans une copie au masculin
    const copies = (civilite: string) => VTC48_EXERCICES.flatMap((ex, ei) => Array.from({ length: 8 }, (_, i) =>
      pickVTC48ExerciceAnswer(FORMATION_VTC48.intitule, "", ei, i, { ...noms[i], civilite }, ex.titre))).join(" ");
    const masc = copies("M.");
    const fem = copies("Mme");
    expect(masc).toMatch(/conducteur salarié /);
    expect(fem).toMatch(/conductrice salariée /);
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, 7 jours de 09h00 à 17h00", () => {
    const besoins = noms.map((s, i) => getVTC48EvalBesoins(s, true, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /7 jours/.test(b.disponibilites) && /17h00/.test(b.disponibilites) && !/séance|13h00/.test(b.disponibilites))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getVTC48Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    expect(getVTC48EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => vtc48NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    for (let i = 0; i < 100; i++) {
      const tot = getVTC48AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      const rep = vtc48ReponsesQcmDebut(VTC48_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === VTC48_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(vtc48BonnesQcmDebut(VTC48_QCM_DEBUT.length, i));
      expect(rep).toHaveLength(10);
      rep.forEach((r, qi) => { expect(r).toBeGreaterThanOrEqual(0); expect(r).toBeLessThan(VTC48_QCM_DEBUT[qi].options.length); });
      expect(bonnes).toBeGreaterThanOrEqual(2);
      expect(bonnes).toBeLessThanOrEqual(6);
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 5 }, (_, i) => vtc48NoteExercice(i, ex, true))).size).toBe(5);
      expect(new Set(Array.from({ length: 6 }, (_, i) => vtc48NoteExercice(i, ex, false))).size).toBe(6);
      expect(Math.max(...Array.from({ length: 12 }, (_, i) => vtc48NoteExercice(i, ex, true)))).toBeLessThanOrEqual(10);
    }
  });

  it("certifiante RS5637 : aucun code RNCP ni autre code RS, aucun jury, aucun barème d'examen ni statistique inventés", () => {
    const sources = [
      "src/lib/vtc48hPreset.ts", "src/lib/vtc48hHumanized.ts", "src/lib/courseContentVtc48h.ts",
    ];
    for (const p of sources) expect(lire(p).replace(/codeRNCP/g, ""), p).not.toMatch(INTERDITS_SOURCES);
    expect(lire("src/lib/vtc48hHumanized.ts")).not.toMatch(/[A-D]\)/);
    const packs = JSON.stringify([VTC48_CONTENT_PACK, VTC48_EVAL_PACK, VTC48_VEILLE_PACK, VTC48_QUESTIONS_OUVERTES, FORMATION_VTC48])
      .replace(/codeRNCP/g, "").replace(/https?:\/\/[^"]+/g, "");
    expect(packs).not.toMatch(INTERDITS_SOURCES);
    // Aucun coefficient, aucune durée d'épreuve, aucune note éliminatoire écrits de mémoire
    expect(packs).not.toMatch(/coefficient \d|\bcoef\.? ?\d|note éliminatoire (de|inférieure)|(?<!\d)\d{1,2} ?\/ ?20(?!\d)/i);
    // Aucune statistique ni taux de satisfaction ou de réussite inventés
    expect(packs).not.toMatch(/\d+\s?%/);
    expect(packs).not.toMatch(/taux de (satisfaction|réussite)/i);
    // Veille : fiche RS5637 de France Compétences et fin d'enregistrement au 31/12/2026
    const regl = JSON.stringify(VTC48_VEILLE_PACK.reglementaire);
    expect(regl).toContain("https://www.francecompetences.fr/recherche/rs/5637/");
    expect(regl).toMatch(/31\/12\/2026/);
    expect(regl).toMatch(/arrêté du 6 avril 2017/);
    expect(JSON.stringify(VTC48_VEILLE_PACK)).toMatch(/artisanat\.fr/);
    expect(JSON.stringify(VTC48_VEILLE_PACK)).toMatch(/ecologie\.gouv\.fr/);
    // Vidéos : recherches YouTube uniquement, jamais d'identifiant de vidéo inventé
    for (const v of VTC48_VIDEOS) expect(v.url).toMatch(/^https:\/\/www\.youtube\.com\/results\?search_query=/);
    // Fil rouge fictif
    expect(packs).toMatch(/Samir/);
    expect(packs).toMatch(/fictif/);
  });
});

describe("Préparation à l'examen VTC (RS5637) – 48 h — câblage", () => {
  it("le support de cours compte 6 chapitres (un par compétence), avant la banque « VTC » générique", async () => {
    const { getCourseChapters, getYoutubeVideos } = await import("@/lib/courseContent");
    const { getVtc48hChapters } = await import("@/lib/courseContentVtc48h");
    const chapitres = getVtc48hChapters();
    expect(chapitres).toHaveLength(6);
    for (const titre of [FORMATION_VTC48.intitule, "Formation VTC – 48 h", "Habilitation VTC – Préparation à l'examen (RS5637) – 48 heures"]) {
      expect(getCourseChapters(titre), titre).toEqual(chapitres);
    }
    // Les autres formations VTC (autre durée, dont l'ancienne formation exemple) gardent leur support
    for (const titre of ["Formation VTC", "Habilitation VTC – Préparation à l'examen (RS5637)"]) {
      expect(getCourseChapters(titre)[0]?.title, titre).not.toBe(chapitres[0].title);
    }
    for (const c of chapitres) {
      expect(c.sections.length, c.title).toBeGreaterThan(0);
      expect(c.sections.every(s => !s.content.includes("${")), c.title).toBe(true);
    }
    expect(JSON.stringify(chapitres)).not.toMatch(/RNCP\s?\d|\bRS\s?(?!5637\b)\d{3,4}|TOEIC/i);
    expect(getYoutubeVideos(FORMATION_VTC48.intitule)).toBe(VTC48_CONTENT_PACK.ressources.videos);
    // Le taxi et les autres formations de conduite gardent leur support et leurs vidéos
    expect(getCourseChapters("Préparation à l'examen de conducteur de taxi")[0]?.title).not.toBe(chapitres[0].title);
    expect(getYoutubeVideos("Préparation à l'examen de conducteur de taxi")).not.toBe(VTC48_VIDEOS);
  }, 60_000);

  it("l'évaluation utilise les mises en situation et QCM du preset ; les autres formations gardent leur contenu", { timeout: 60_000 }, async () => {
    const { getEvalContent, hasEvalContentDedie } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_VTC48.intitule);
    expect(ev.exercices[0].titre).toBe(VTC48_EXERCICES[0].titre);
    expect(ev.qcmPositionnement).toEqual(VTC48_QCM_DEBUT);
    expect(ev.competences).toHaveLength(6);
    expect(JSON.stringify(ev)).not.toMatch(INTERDITS);
    expect(hasEvalContentDedie("Formation VTC – 48 h")).toBe(true);
    expect(getEvalContent("Formation VTC – 48 h").exercices[0].titre).toBe(VTC48_EXERCICES[0].titre);
    expect(getEvalContent("Formation VTC").exercices[0]?.titre).not.toBe(VTC48_EXERCICES[0].titre);
    expect(getEvalContent("Habilitation VTC – Préparation à l'examen (RS5637)").qcmPositionnement).not.toEqual(VTC48_QCM_DEBUT);
    for (const f of SAMPLE_FORMATIONS.filter(x => !isVTC48Formation(x.intitule, x.codeRNCP))) {
      expect(getEvalContent(f.intitule).qcmPositionnement, f.intitule).not.toEqual(VTC48_QCM_DEBUT);
    }
  });

  // « jury » et « à titre professionnel » restent possibles ici : rubriques génériques des fiches RS
  // (composition des jurys, taux d'obtention) et texte du support (aptitude à la conduite à titre professionnel).
  it("dossier AF complet généré pour cet intitulé : aucun code RNCP, aucun autre code RS, aucun TOEIC", async () => {
    const { getFullCatalog, generateDocumentById } = await import("@/lib/documentGenerator");
    const org: OrganismeInfo = {
      nom: "ORGANISME TEST VTC", siret: "912 345 678 00019", adresse: "1 rue de l'Essai", codePostal: "94000", ville: "Créteil",
      telephone: "01 00 00 00 00", email: "contact@organisme-test.fr", siteWeb: "", nda: "11 94 99999 94",
      dirigeant: "Paul TESTARD", responsablePedagogique: "Paul TESTARD", referentHandicap: "Paul TESTARD",
      referentQualite: "Paul TESTARD", poleAdministratif: "Paul TESTARD", relationEntreprises: "Paul TESTARD",
      referentMobilite: "Paul TESTARD", domainesFormation: "Transport de personnes", typesActions: ["actions-formation"],
      certifications: "", outilsUtilises: "Google Meet, Zoom", version: "1", dateMaj: "2026-11-20",
    };
    const f = { ...FORMATION_VTC48, formateur: "Paul TESTARD", lieu: "Google Meet / Zoom" };
    const stagiaires: StagiaireInfo[] = [
      { civilite: "Mme", nom: "ALPHA", prenom: "Claire", email: "claire.alpha@exemple.fr", telephone: "06 10 20 30 40", entreprise: "", poste: "Demandeuse d'emploi", dateNaissance: "1985-04-12", financeur: "Personnel" },
      { civilite: "M.", nom: "BRAVO", prenom: "Julien", email: "julien.bravo@exemple.fr", telephone: "06 11 21 31 41", entreprise: "", poste: "Salarié en reconversion", dateNaissance: "1990-09-03", financeur: "Personnel" },
      { civilite: "M.", nom: "CHARLIE", prenom: "Yanis", email: "yanis.charlie@exemple.fr", telephone: "06 12 22 32 42", entreprise: "", poste: "Futur chauffeur VTC", dateNaissance: "1995-01-27", financeur: "Personnel" },
    ];
    seedVTC48AICaches(f);
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
