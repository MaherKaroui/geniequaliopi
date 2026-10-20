import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_GSC35, GSC35_EXERCICES, GSC35_QCM_COMPETENCES, GSC35_QCM_DEBUT, GSC35_QCM_FIN,
  GSC35_CONTENT_PACK, GSC35_EVAL_PACK, GSC35_VEILLE_PACK, GSC35_EXERCICES_COMPLETS,
} from "@/lib/gererCentre35hPreset";
import {
  isGSC35Formation, getGSC35AutoAnswers, getGSC35EvalBesoins, getGSC35Besoin, pickGSC35ExerciceAnswer,
  gsc35NoteDebutSur20, gsc35BonnesQcmDebut, gsc35ReponsesQcmDebut, gsc35NoteExercice, gsc35Seed,
  GSC35_QUESTIONS_OUVERTES,
} from "@/lib/gererCentre35hHumanized";
import { isIAP21Formation } from "@/lib/iaPro21hHumanized";
import { isMSP21Formation } from "@/lib/msp21Humanized";
import { isARH41366Formation } from "@/lib/arh41366Humanized";
import { isCreationEntrepriseFormation } from "@/lib/creationEntreprisePreset";
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";

const lire = (p: string) => readFileSync(resolve(process.cwd(), p), "utf-8");

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
  nom: `NOM${i}`, prenom: i % 2 ? "Leïla" : "Paul", civilite: i % 2 ? "Mme" : "M.", entreprise: "",
}));

/** Mot attendu dans chacune des 8 copies de chaque mise en situation (diagnostic puis C1 à C6). */
const MOTS_EXERCICES = [
  /riorités/, /déclaration d'activité/, /règlement intérieur/, /objectif/i, /rétractation/,
  /indicateur/i, /non-conformité/i, /coût de revient/i, /bilan pédagogique et financier/, /amélioration/i,
];

/** La formation elle-même n'est pas certifiante : aucun code de répertoire, aucun jury, aucune éligibilité. */
const INTERDITS_NON_CERTIFIANT = /RNCP\s?\d|\bRS\s?\d{3,}|\bjury\b|éligible au (CPF|compte personnel)|cette formation est certifiante/i;

const INTITULE_IAP21 = "Intelligence artificielle : intégrer les outils d'IA dans son activité professionnelle – 21 h";
const INTITULE_TVTE = "Techniques de vente dans le secteur des travaux énergétiques – 35 h";

describe("Gérer son centre de formation – 35 h — formation exemple non certifiante", () => {
  it("intitulé, durée, modalités, public, tarif et délai d'accès conformes à la fiche", () => {
    expect(FORMATION_GSC35.intitule).toBe("Gérer son centre de formation – 35 h");
    expect(FORMATION_GSC35.duree).toBe("35 heures réparties sur 1 mois (5 journées de 7 h, une par semaine)");
    expect(FORMATION_GSC35.modalites).toBe("présentiel");
    expect(FORMATION_GSC35.lieu).toBe("");
    expect(FORMATION_GSC35.formateur).toBe("");
    expect(FORMATION_GSC35.nombreParticipants).toBe("8");
    expect(FORMATION_GSC35.codeRNCP || "").toBe("");
    expect(FORMATION_GSC35.tarif).toBe("1 575 € par stagiaire");
    expect(FORMATION_GSC35.publicVise).toMatch(/propres frais/);
    expect(FORMATION_GSC35.publicVise).toMatch(/L\.6353-3/);
    expect(FORMATION_GSC35.publicVise).not.toMatch(/OPCO|plan de développement des compétences|employeur/);
    expect(FORMATION_GSC35.delaiAcces).toMatch(/rétractation de 10 jours/);
    expect(parseInt(FORMATION_GSC35.delaiAcces)).toBeGreaterThan(10);
    expect(FORMATION_GSC35.methodesEvaluation).toMatch(/attestation de fin de formation/);
    expect(FORMATION_GSC35.objectifs).toMatch(/non certifiante/);
    expect(FORMATION_GSC35.dateDebut).toBe("2026-11-16");
    expect(FORMATION_GSC35.dateFin).toBe("2026-11-20");
    expect(new Date(FORMATION_GSC35.dateDebut).getUTCDay()).toBe(1);
    const jours = (new Date(FORMATION_GSC35.dateFin).getTime() - new Date(FORMATION_GSC35.dateDebut).getTime()) / 86400000 + 1;
    expect(jours).toBe(5);
    for (const n of [1, 2, 3, 4, 5]) expect(FORMATION_GSC35.programme).toContain(`SEMAINE ${n} · JOURNÉE ${n}`);
    for (const c of ["C1", "C2", "C3", "C4", "C5", "C6"]) expect(FORMATION_GSC35.objectifs).toContain(c);
    expect(FORMATION_GSC35.objectifs).toMatch(/2026-728/);
    expect(FORMATION_GSC35.objectifs).toMatch(/33 indicateurs/);
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_GSC35.intitule)).toHaveLength(1);
  });

  it("isGSC35Formation : vrai pour l'intitulé et ses variantes, faux pour les autres formations du catalogue", () => {
    expect(isGSC35Formation(FORMATION_GSC35.intitule, FORMATION_GSC35.codeRNCP)).toBe(true);
    expect(isGSC35Formation("Gérer son centre de formation")).toBe(true);
    expect(isGSC35Formation("GÉRER SON CENTRE DE FORMATION – 35H")).toBe(true);
    expect(isGSC35Formation("gestion d'un centre de formation 35h")).toBe(true);
    expect(isGSC35Formation("Gestion d’un centre de formation")).toBe(true);
    expect(isGSC35Formation("Gérer son entreprise")).toBe(false);
    expect(isGSC35Formation("Gestion d'entreprise")).toBe(false);
    expect(isGSC35Formation("Création d'entreprise – porteurs de projet")).toBe(false);
    expect(isGSC35Formation("Formation de formateurs")).toBe(false);
    expect(isGSC35Formation("Centre de formation d'apprentis : accueil des apprentis")).toBe(false);
    expect(isGSC35Formation("Gestionnaire de paie")).toBe(false);
    expect(isGSC35Formation(INTITULE_IAP21)).toBe(false);
    expect(isGSC35Formation(INTITULE_TVTE)).toBe(false);
    expect(isGSC35Formation(undefined)).toBe(false);
    const autres = SAMPLE_FORMATIONS.filter(f => f.intitule !== FORMATION_GSC35.intitule && isGSC35Formation(f.intitule, f.codeRNCP));
    expect(autres.map(f => f.intitule)).toEqual([]);
    // Aucune autre règle de détection ne capte l'intitulé
    expect(isIAP21Formation(FORMATION_GSC35.intitule)).toBe(false);
    expect(isMSP21Formation(FORMATION_GSC35.intitule)).toBe(false);
    expect(isARH41366Formation(FORMATION_GSC35.intitule)).toBe(false);
    expect(isCreationEntrepriseFormation(FORMATION_GSC35.intitule)).toBe(false);
  });

  it("6 QCM de 10 questions au format du générateur, sans « A) » dans les énoncés", () => {
    expect(GSC35_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    for (const ex of GSC35_QCM_COMPETENCES) {
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
    expect(GSC35_EXERCICES).toHaveLength(10);
    expect(GSC35_EXERCICES_COMPLETS).toHaveLength(16);
    GSC35_EXERCICES.forEach((ex, i) => {
      expect(ex.titre).toMatch(new RegExp(`^Exercice ${i + 1} — `));
      expect(ex.points).toBe(20);
      expect(ex.reponseAttendue).toMatch(/Barème/);
      // Le barème totalise 20 points
      const bareme = ex.reponseAttendue.split("Barème :")[1] || "";
      const total = [...bareme.matchAll(/(\d+)(?=[,.]|$|\s*\()/g)].map(m => parseInt(m[1])).reduce((a, b) => a + b, 0);
      expect(total, ex.titre).toBe(20);
    });
    expect(GSC35_EXERCICES[0].titre).toMatch(/Diagnostic de départ/);
    expect(GSC35_EXERCICES.slice(1).map(e => e.titre.match(/C\d/)![0])).toEqual(["C1", "C1", "C2", "C2", "C3", "C3", "C4", "C5", "C6"]);
    for (const qcm of [GSC35_QCM_DEBUT, GSC35_QCM_FIN]) {
      expect(qcm).toHaveLength(10);
      qcm.forEach(q => {
        expect(q.options).toHaveLength(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
      });
    }
    expect(GSC35_EVAL_PACK.exerciceIntermediaire.questions).toHaveLength(4);
    expect(GSC35_EVAL_PACK.evaluationFinale.exercices).toHaveLength(6);
    expect(GSC35_CONTENT_PACK.ressources.videos.length).toBeGreaterThanOrEqual(8);
    GSC35_CONTENT_PACK.ressources.videos.forEach(v =>
      expect(v.url).toMatch(/^https:\/\/(www\.youtube\.com\/results\?search_query=|www\.cnil\.fr\/|travail-emploi\.gouv\.fr\/|entreprendre\.service-public\.fr\/|www\.service-public\.fr\/|www\.legifrance\.gouv\.fr\/)/));
  });

  it("règles du contrat avec un particulier : 10 jours de rétractation, rien avant, acompte de 30 % au plus", () => {
    const contrat = GSC35_EXERCICES[4].reponseAttendue;
    expect(contrat).toMatch(/dix jours/);
    expect(contrat).toMatch(/30 %/);
    expect(contrat).toMatch(/252 €/); // 30 % de 840 €
    expect(contrat).toMatch(/L\.6353-1/);
    const cout = GSC35_EXERCICES[7].reponseAttendue;
    expect(cout).toMatch(/2 310 €/); // 420 + 1 260 + 90 + 540
    expect(cout).toMatch(/385 €/); // 2 310 / 6
    expect(cout).toMatch(/19 décembre 2022/);
    // L.6353-2 est abrogé : la convention repose sur L.6353-1 et D.6353-1 ; plus de « trente jours » pour la déclaration
    const tout = JSON.stringify([FORMATION_GSC35, GSC35_CONTENT_PACK, GSC35_EVAL_PACK, GSC35_VEILLE_PACK, GSC35_QUESTIONS_OUVERTES]);
    expect(tout).not.toMatch(/L\.6353-2/);
    expect(tout).toMatch(/D\.6353-1/);
    expect(tout).not.toMatch(/trente jours/);
    expect(GSC35_EXERCICES[1].reponseAttendue).toMatch(/deux mois/);
    expect(GSC35_EXERCICES[2].reponseAttendue).toMatch(/30 avril/);
  });

  it("veille : référentiel national qualité 2026, contrat de formation, sources officielles", () => {
    const regl = JSON.stringify(GSC35_VEILLE_PACK.reglementaire);
    expect(regl).toMatch(/2026-728/);
    expect(regl).toMatch(/1er novembre 2026/);
    expect(regl).toMatch(/33 indicateurs/);
    expect(regl).toMatch(/L\.6353-3/);
    expect(regl).toMatch(/Mon Activité Formation/);
    for (const k of ["reglementaire", "metier", "technologique"] as const) {
      expect(GSC35_VEILLE_PACK[k].length).toBeGreaterThanOrEqual(4);
      GSC35_VEILLE_PACK[k].forEach(r => {
        expect(r.lien).toMatch(/^https:\/\//);
        expect(r.exploitation).toMatch(/^Preuve : .+ Action : /);
        expect(r.date).toMatch(/^[A-ZÉ][a-zéû]+ 2026$/);
      });
    }
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = GSC35_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    // Ordre : diagnostic, C1 statut et déclaration, C1 obligations, C2 programme, C2 contrat,
    // C3 référentiel, C3 audit, C4 prix et financement, C5 gestion, C6 pilotage
    const fin = GSC35_QUESTIONS_OUVERTES.fin.map(q => q.question);
    expect(fin[0]).toMatch(/diagnostic/i);
    expect(fin[1]).toMatch(/déclaration d'activité/i);
    expect(fin[2]).toMatch(/obligations légales/i);
    expect(fin[3]).toMatch(/programme/i);
    expect(fin[4]).toMatch(/contrat/i);
    expect(fin[5]).toMatch(/référentiel/i);
    expect(fin[6]).toMatch(/audit/i);
    expect(fin[7]).toMatch(/coût de revient/i);
    expect(fin[8]).toMatch(/bilan pédagogique et financier/i);
    expect(fin[9]).toMatch(/amélioration/i);
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getGSC35AutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getGSC35AutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getGSC35AutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(gsc35Seed("MARTIN", "Sophie")).toBe(gsc35Seed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    GSC35_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickGSC35ExerciceAnswer(FORMATION_GSC35.intitule, "", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickGSC35ExerciceAnswer(FORMATION_GSC35.intitule, "", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickGSC35ExerciceAnswer(FORMATION_GSC35.intitule, "", 0, 0, { ...noms[0], entreprise: "EI TEST" }, GSC35_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/^J'ai rattaché l'exercice à la situation de EI TEST\./);
    expect(pickGSC35ExerciceAnswer(INTITULE_TVTE, "", 0, 0, noms[0], "C1")).toBeNull();
    expect(pickGSC35ExerciceAnswer(INTITULE_IAP21, "", 0, 0, noms[0], "C1")).toBeNull();
    // Accords : une stagiaire n'est jamais « formateur », « dirigeant », « indépendant »…
    const fem = Array.from({ length: 8 }, (_, i) => pickGSC35ExerciceAnswer(FORMATION_GSC35.intitule, "", 0, i, { nom: "X" + i, prenom: "Leïla", civilite: "Mme" }, GSC35_EXERCICES[0].titre)).join(" ");
    expect(fem).not.toMatch(/\bformateur\b|\bdirigeant\b|\bindépendant\b|\bcommercial\b|\bassistant\b|\benseignant\b|\bancien\b/i);
    const masc = Array.from({ length: 8 }, (_, i) => pickGSC35ExerciceAnswer(FORMATION_GSC35.intitule, "", 0, i, { nom: "Y" + i, prenom: "Paul", civilite: "M." }, GSC35_EXERCICES[0].titre)).join(" ");
    expect(masc).not.toMatch(/\bformatrice\b|\bdirigeante\b|\bindépendante\b|\bcommerciale\b|\bassistante\b|\benseignante\b|\bancienne\b/i);
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, financement personnel", () => {
    const besoins = noms.map((s, i) => getGSC35EvalBesoins(s, false, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /par semaine|hebdomadaires|réparties sur un mois|pendant un mois/.test(b.disponibilites))).toBe(true);
    expect(besoins.every(b => /propres frais/.test(b.budget) && /rétractation/.test(b.budget))).toBe(true);
    expect(besoins.every(b => !/employeur|OPCO|plan de développement/.test(b.budget))).toBe(true);
    const besoinsPrincipaux = noms.map((s, i) => getGSC35Besoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    // 16 profils : 16 stagiaires consécutifs ont 16 besoins différents
    const seize = Array.from({ length: 16 }, (_, i) => getGSC35Besoin("N" + i, "P", "M.", i));
    expect(new Set(seize).size).toBe(16);
    expect(getGSC35EvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => gsc35NoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    const ouv = Array.from({ length: 8 }, (_, i) =>
      getGSC35AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0));
    expect(new Set(ouv).size).toBe(8);
    for (let i = 0; i < 100; i++) {
      const tot = getGSC35AutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      expect(gsc35NoteDebutSur20(i)).toBeLessThanOrEqual(12);
      expect(gsc35BonnesQcmDebut(10, i) * 2).toBeLessThanOrEqual(12);
      const rep = gsc35ReponsesQcmDebut(GSC35_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === GSC35_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(gsc35BonnesQcmDebut(GSC35_QCM_DEBUT.length, i));
      expect(bonnes * 2).toBeLessThanOrEqual(12);
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 16; ex++) {
      expect(new Set(Array.from({ length: 6 }, (_, i) => gsc35NoteExercice(i, ex, true))).size).toBe(6);
      expect(new Set(Array.from({ length: 6 }, (_, i) => gsc35NoteExercice(i, ex, false))).size).toBe(6);
    }
  });

  it("formation non certifiante : aucun code de répertoire, aucun jury, aucune éligibilité annoncée", () => {
    const preset = lire("src/lib/gererCentre35hPreset.ts");
    const moteur = lire("src/lib/gererCentre35hHumanized.ts");
    for (const src of [preset, moteur]) expect(src).not.toMatch(INTERDITS_NON_CERTIFIANT);
    expect(moteur).not.toMatch(/[A-D]\)/);
    const textes = [
      ...GSC35_QUESTIONS_OUVERTES.debut, ...GSC35_QUESTIONS_OUVERTES.fin,
    ].map(q => q.question + " " + q.reponseAttendue).join(" ");
    expect(textes).not.toMatch(/[A-D]\)/);
    const { codeRNCP: _code, ...champs } = FORMATION_GSC35;
    void _code;
    const copies = GSC35_EXERCICES.flatMap((ex, ei) =>
      noms.slice(0, 8).map((s, i) => pickGSC35ExerciceAnswer(FORMATION_GSC35.intitule, "", ei, i, s, ex.titre) || ""));
    const reponses = noms.flatMap((s, i) => [
      ...getGSC35AutoAnswers(s.nom, s.prenom, s.civilite, true, 10, i).reponses,
      ...getGSC35AutoAnswers(s.nom, s.prenom, s.civilite, false, 10, i).reponses,
      ...Object.values(getGSC35EvalBesoins(s, true, i)),
    ]);
    const tout = [
      ...Object.values(champs).map(String),
      JSON.stringify(GSC35_CONTENT_PACK), JSON.stringify(GSC35_EVAL_PACK), JSON.stringify(GSC35_VEILLE_PACK),
      JSON.stringify(GSC35_QUESTIONS_OUVERTES), ...copies, ...reponses,
    ].join(" ");
    expect(tout).not.toMatch(INTERDITS_NON_CERTIFIANT);
    expect(tout).toMatch(/non certifiante/);
    // Ni l'organisme réel ni sa dirigeante ne sont cités
    expect(tout).not.toMatch(/DENDANI|Longjumeau|Cathelin|Verlaine/i);
    expect(preset + moteur).not.toMatch(/DENDANI|Longjumeau|Cathelin/i);
  });
});

describe("Gérer son centre de formation – 35 h — câblage", () => {
  it("l'évaluation utilise les exercices et QCM du preset", async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_GSC35.intitule);
    expect(ev.exercices[0].titre).toBe(GSC35_EXERCICES[0].titre);
    expect(ev.qcmPositionnement).toEqual(GSC35_QCM_DEBUT);
    expect(ev.qcmFinal).toEqual(GSC35_QCM_FIN);
    expect(getEvalContent("gestion d'un centre de formation 35h").qcmPositionnement).not.toEqual(GSC35_QCM_DEBUT);
  });

  it("les autres formations gardent leur contenu", async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    for (const f of SAMPLE_FORMATIONS.filter(x => x.intitule !== FORMATION_GSC35.intitule)) {
      expect(getEvalContent(f.intitule).qcmPositionnement, f.intitule).not.toEqual(GSC35_QCM_DEBUT);
    }
  });

  it("le support de cours compte 8 chapitres, plus de 500 000 caractères, un quiz et un cas pratique par chapitre", async () => {
    const { getCourseChapters } = await import("@/lib/courseContent");
    const { getGererCentre35hChapters } = await import("@/lib/courseContentGererCentre35h");
    const chapitres = getGererCentre35hChapters();
    expect(getCourseChapters(FORMATION_GSC35.intitule)).toEqual(chapitres);
    expect(chapitres.length).toBe(8);
    const html = chapitres.flatMap(c => c.sections.map(s => s.content)).join("");
    expect(html.length).toBeGreaterThanOrEqual(500000);
    // Chapitres 1 à 7 : quiz et cas pratique corrigés ; chapitre 8 : QCM de fin corrigé et corrigé type du projet final.
    chapitres.forEach((c, ci) => {
      const dernier = ci === chapitres.length - 1;
      expect(c.sections.some(s => (dernier ? /quiz|QCM/i : /quiz/i).test(s.title)), c.title).toBe(true);
      expect(c.sections.some(s => (dernier ? /cas pratique|projet final/i : /cas pratique/i).test(s.title)), c.title).toBe(true);
    });
    const texte = html.replace(/<[^>]+>/g, " ");
    for (const c of ["C1", "C2", "C3", "C4", "C5", "C6"]) expect(texte).toContain(c);
    expect(texte).toMatch(/Atelier Sésame Formation/);
    // La dirigeante réelle n'est jamais nommée (« la formatrice ») ; le lieu de la session figure dans la fiche formation.
    expect(texte).not.toMatch(/DENDANI|NADINE/);
  });
});
