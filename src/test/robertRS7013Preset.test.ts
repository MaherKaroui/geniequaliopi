import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import {
  FORMATION_LRB, LRB_EXERCICES, LRB_QCM_COMPETENCES, LRB_QCM_DEBUT, LRB_QCM_FIN,
  LRB_CONTENT_PACK, LRB_EVAL_PACK, LRB_VEILLE_PACK, LRB_EXERCICES_COMPLETS, LRB_VIDEOS,
} from "@/lib/robertRS7013Preset";
import {
  isLRBFormation, getLRBAutoAnswers, getLRBEvalBesoins, getLRBBesoin, pickLRBExerciceAnswer,
  lrbNoteDebutSur20, lrbBonnesQcmDebut, lrbReponsesQcmDebut, lrbNoteExercice, lrbSeed,
  LRB_QUESTIONS_OUVERTES,
} from "@/lib/robertRS7013Humanized";
import { isGSC35Formation } from "@/lib/gererCentre35hHumanized";
import { isIAP21Formation } from "@/lib/iaPro21hHumanized";
import { isMSP21Formation } from "@/lib/msp21Humanized";
import { isARH41366Formation } from "@/lib/arh41366Humanized";
import { isLilateFormation } from "@/lib/lilateHumanized";
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";
import { getRNCPByCode } from "@/lib/rncpData";

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
  nom: `NOM${i}`, prenom: i % 2 ? "Inès" : "Karim", civilite: i % 2 ? "Mme" : "M.", entreprise: "",
}));

/** Mot attendu dans chacune des 8 copies de chaque mise en situation (diagnostic puis C1 et C2). */
const MOTS_EXERCICES = [
  /points/, /dictionnaire|orthographe/, /remplace/, /accord/i, /participe/, /subjonctif|conditionnel/,
  /espace|typographi/, /pléonasme|paronyme|anglicisme/i, /phrase/, /registre/,
];

/** Contenus FLE médico-social (RS6674) qui ne doivent jamais apparaître dans la formation Le Robert. */
const FLE_MEDICO_SOCIAL = /médico-social|medico-social|RS6674|transmissions|EHPAD|TV5Monde|français langue étrangère|\bFLE\b/i;

/** Données que la fiche RS7013 ne donne pas : elles ne doivent pas être inventées. */
const NON_FOURNIS = /durée de l'épreuve est|l'épreuve dure|\d+\s?(minutes|min)\b.*épreuve|prix de l'examen|surveillance à distance|télésurveillance|valable \d+ ans|durée de validité de|taux de réussite/i;

/** Mots entiers, lettres accentuées comprises (\b ignore les lettres accentuées). */
const motsEntiers = (mots: string[]) => new RegExp(`(?<!\\p{L})(${mots.join("|")})(?!\\p{L})`, "iu");

const INTITULE_FLE = "Communiquer en français dans les secteurs du social et du médico-social (niveau B1)";

describe("Certification Le Robert (RS7013) — formation exemple", () => {
  it("intitulé, code, durée, modalités, tarif, public et délai d'accès conformes à la fiche", () => {
    expect(FORMATION_LRB.intitule).toBe("Préparation à la Certification en langue française Le Robert (RS7013)");
    expect(FORMATION_LRB.codeRNCP).toBe("RS7013");
    expect(FORMATION_LRB.duree).toBe("21 heures réparties sur 3 jours (3 journées de 7 h)");
    expect(FORMATION_LRB.modalites).toBe("distanciel");
    expect(FORMATION_LRB.lieu).toBe("");
    expect(FORMATION_LRB.formateur).toBe("");
    expect(FORMATION_LRB.tarif).toBe("");
    expect(FORMATION_LRB.nombreParticipants).toBe("8");
    expect(FORMATION_LRB.dateDebut).toBe("2026-11-23");
    expect(FORMATION_LRB.dateFin).toBe("2026-11-25");
    expect(new Date(FORMATION_LRB.dateDebut).getUTCDay()).toBe(1);
    for (const n of [1, 2, 3]) expect(FORMATION_LRB.programme).toContain(`JOUR ${n} — `);
    for (const c of ["C1", "C2"]) expect(FORMATION_LRB.objectifs).toContain(c);
    expect(FORMATION_LRB.prerequis).toMatch(/langue maternelle/);
    expect(FORMATION_LRB.prerequis).toMatch(/A2/);
    expect(FORMATION_LRB.prerequis).toMatch(/analphabétisme/);
    expect(FORMATION_LRB.delaiAcces).toMatch(/11 jours ouvrés/);
    expect(FORMATION_LRB.methodesEvaluation).toMatch(/350 questions/);
    expect(FORMATION_LRB.methodesEvaluation).toMatch(/1 000 points/);
    expect(FORMATION_LRB.methodesEvaluation).toMatch(/450 points/);
    expect(FORMATION_LRB.methodesEvaluation).toMatch(/pas de validation partielle/);
    expect(FORMATION_LRB.moyensPedagogiques).toMatch(/Google Meet \/ Zoom/);
    expect(FORMATION_LRB.publicVise).toMatch(/A2/);
    expect(SAMPLE_FORMATIONS.filter(f => f.intitule === FORMATION_LRB.intitule)).toHaveLength(1);
  });

  it("isLRBFormation : vrai pour l'intitulé, ses variantes et le code, faux pour les autres formations du catalogue", () => {
    expect(isLRBFormation(FORMATION_LRB.intitule, FORMATION_LRB.codeRNCP)).toBe(true);
    expect(isLRBFormation(FORMATION_LRB.intitule)).toBe(true);
    expect(isLRBFormation("Certification Le Robert")).toBe(true);
    expect(isLRBFormation("PRÉPARATION À LA CERTIFICATION LE ROBERT")).toBe(true);
    expect(isLRBFormation("Français professionnel", "RS7013")).toBe(true);
    expect(isLRBFormation("Préparation RS 7013")).toBe(true);
    expect(isLRBFormation(INTITULE_FLE, "RS6674")).toBe(false);
    expect(isLRBFormation("Français langue étrangère – LILATE", "RS6916")).toBe(false);
    expect(isLRBFormation("Formation à Brie-Comte-Robert")).toBe(false);
    expect(isLRBFormation("Gérer son centre de formation – 35 h")).toBe(false);
    expect(isLRBFormation(undefined)).toBe(false);
    const autres = SAMPLE_FORMATIONS.filter(f => f.intitule !== FORMATION_LRB.intitule && isLRBFormation(f.intitule, f.codeRNCP));
    expect(autres.map(f => f.intitule)).toEqual([]);
    // Aucune autre règle de détection ne capte l'intitulé
    expect(isGSC35Formation(FORMATION_LRB.intitule)).toBe(false);
    expect(isIAP21Formation(FORMATION_LRB.intitule)).toBe(false);
    expect(isMSP21Formation(FORMATION_LRB.intitule)).toBe(false);
    expect(isARH41366Formation(FORMATION_LRB.intitule)).toBe(false);
    expect(isLilateFormation(FORMATION_LRB.intitule, FORMATION_LRB.codeRNCP)).toBe(false);
  });

  it("10 mises en situation de 20 points, 2 QCM de 10 questions au format du générateur, QCM début et fin de 10", () => {
    expect(LRB_EXERCICES).toHaveLength(10);
    expect(LRB_EXERCICES_COMPLETS).toHaveLength(12);
    LRB_EXERCICES.forEach((ex, i) => {
      expect(ex.titre).toMatch(new RegExp(`^Exercice ${i + 1} — `));
      expect(ex.points).toBe(20);
      expect(ex.reponseAttendue).toMatch(/Barème/);
      const bareme = ex.reponseAttendue.split("Barème :")[1] || "";
      const total = [...bareme.matchAll(/(\d+)(?=[,.]|$|\s*\()/g)].map(m => parseInt(m[1])).reduce((a, b) => a + b, 0);
      expect(total, ex.titre).toBe(20);
      expect(ex.consigne, ex.titre).toMatch(/fictive|Ardoise & Plume/);
    });
    expect(LRB_EXERCICES[0].titre).toMatch(/Diagnostic de départ/);
    expect(LRB_EXERCICES.slice(1).map(e => e.titre.match(/C\d/)![0])).toEqual(["C1", "C1", "C1", "C1", "C1", "C1", "C2", "C2", "C2"]);
    expect(LRB_QCM_COMPETENCES.map(q => q.titre.match(/C\d/)![0])).toEqual(["C1", "C2"]);
    for (const ex of LRB_QCM_COMPETENCES) {
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
    for (const qcm of [LRB_QCM_DEBUT, LRB_QCM_FIN]) {
      expect(qcm).toHaveLength(10);
      qcm.forEach(q => {
        expect(q.options).toHaveLength(4);
        expect(new Set(q.options).size).toBe(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
      });
      expect(new Set(qcm.map(q => q.correctIndex)).size).toBeGreaterThanOrEqual(3);
    }
    expect(LRB_EVAL_PACK.exerciceIntermediaire.questions).toHaveLength(4);
    expect(LRB_EVAL_PACK.evaluationFinale.exercices).toHaveLength(5);
    expect(LRB_CONTENT_PACK.ressources.videos).toBe(LRB_VIDEOS);
    LRB_VIDEOS.forEach(v =>
      expect(v.url).toMatch(/^https:\/\/(www\.youtube\.com\/results\?search_query=|certification\.lerobert\.com|www\.francecompetences\.fr\/recherche\/rs\/7013\/|www\.moncompteformation\.gouv\.fr\/)/));
  });

  it("règles de langue exactes dans les corrigés et les QCM", () => {
    const corr = (i: number) => LRB_EXERCICES[i].reponseAttendue;
    expect(corr(0)).toMatch(/« Les documents que vous m'avez demandés »/);
    expect(corr(0)).toMatch(/j\. phrase correcte/);
    expect(corr(3)).toMatch(/« des fauteuils marron/);
    expect(corr(3)).toMatch(/« trois cent vingt classeurs »/);
    expect(corr(3)).toMatch(/« deux heures et demie »/);
    expect(corr(4)).toMatch(/4\. téléphoné/);
    expect(corr(4)).toMatch(/6\. plaintes/);
    expect(corr(4)).toMatch(/9\. reçu/);
    expect(corr(4)).toMatch(/10\. duré/);
    expect(corr(5)).toMatch(/5\. aura signé/);
    expect(corr(5)).toMatch(/penses-y/);
    expect(corr(5)).toMatch(/acquerrez/);
    expect(corr(6)).toMatch(/14 h 30/);
    expect(corr(6)).toMatch(/1 250 €/);
    // Les bonnes réponses des QCM : quelques contrôles ciblés
    const bonne = (q: { options: string[]; correctIndex: number }) => q.options[q.correctIndex];
    expect(bonne(LRB_QCM_FIN[0])).toBe("dû");
    expect(bonne(LRB_QCM_FIN[2])).toBe("aura signé");
    expect(bonne(LRB_QCM_FIN[6])).toBe("450 points");
    expect(bonne(LRB_QCM_FIN[9])).toBe("Ils se sont rendu compte de l'erreur.");
    expect(bonne(LRB_QCM_DEBUT[7])).toBe("1 000 points");
    const c1 = parseQCM(LRB_QCM_COMPETENCES[0].consigne, LRB_QCM_COMPETENCES[0].reponseAttendue);
    const opt = (r: ReturnType<typeof parseQCM>, n: number) => r.questions[n - 1].opts["ABCD".indexOf(r.correct[n])];
    expect(opt(c1, 1)).toBe("écrites");
    expect(opt(c1, 6)).toBe("partagé");
    expect(opt(c1, 7)).toBe("demie");
    const c2 = parseQCM(LRB_QCM_COMPETENCES[1].consigne, LRB_QCM_COMPETENCES[1].reponseAttendue);
    expect(opt(c2, 3)).toBe("courriel");
    expect(opt(c2, 4)).toBe("pallier");
  });

  it("aucun contenu FLE médico-social et aucune donnée inventée sur l'épreuve", () => {
    const tout = JSON.stringify([FORMATION_LRB, LRB_CONTENT_PACK, LRB_EVAL_PACK, LRB_VEILLE_PACK, LRB_QUESTIONS_OUVERTES]);
    expect(tout).not.toMatch(FLE_MEDICO_SOCIAL);
    expect(tout).not.toMatch(NON_FOURNIS);
    expect(tout).toMatch(/entreprise fictive/);
    const preset = lire("src/lib/robertRS7013Preset.ts");
    const moteur = lire("src/lib/robertRS7013Humanized.ts");
    expect(moteur).not.toMatch(/[A-D]\)/);
    expect(preset + moteur).not.toMatch(NON_FOURNIS);
  });

  it("veille : fiche RS7013, CPF, Qualiopi 2026, sources officielles", () => {
    const regl = JSON.stringify(LRB_VEILLE_PACK.reglementaire);
    expect(regl).toMatch(/RS7013/);
    expect(regl).toMatch(/31\/01\/2030/);
    expect(regl).toMatch(/11 jours ouvrés/);
    expect(regl).toMatch(/2026-728/);
    expect(regl).toMatch(/33 indicateurs/);
    expect(regl).toMatch(/1er novembre 2026/);
    const metier = JSON.stringify(LRB_VEILLE_PACK.metier);
    expect(metier).toMatch(/Commission d'enrichissement de la langue française/);
    expect(metier).toMatch(/1990/);
    expect(JSON.stringify(LRB_VEILLE_PACK.technologique)).toMatch(/intelligence artificielle/i);
    for (const k of ["reglementaire", "metier", "technologique"] as const) {
      expect(LRB_VEILLE_PACK[k].length).toBeGreaterThanOrEqual(4);
      LRB_VEILLE_PACK[k].forEach(r => {
        expect(r.lien).toMatch(/^https:\/\//);
        expect(r.exploitation).toMatch(/^Preuve : .+ Action : /);
        expect(r.date).toMatch(/^[A-ZÉ][a-zéû]+ 2026$/);
      });
    }
  });

  it("fiche RS7013 du référentiel local conforme à France Compétences", () => {
    const fiche = getRNCPByCode("RS7013")!;
    expect(fiche).toBeTruthy();
    expect(fiche.certificateur).toMatch(/SEJER/);
    expect(fiche.dateEnregistrement).toBe("31/01/2025");
    expect(fiche.dateEcheance).toBe("31/01/2030");
    expect(fiche.codeNSF).toMatch(/^333/);
    expect(fiche.formacodes).toMatch(/15011/);
    expect(fiche.formacodes).toMatch(/15281/);
    expect(fiche.formacodes).toMatch(/15235/);
    expect(fiche.resume).toMatch(/RS5800/);
    expect(fiche.blocsCompetences).toHaveLength(2);
    expect(fiche.blocsCompetences[0].modalitesEval).toMatch(/350 questions/);
  });

  it("questions ouvertes : 10 au début et 10 à la fin, dans l'ordre des mises en situation", () => {
    for (const k of ["debut", "fin"] as const) {
      const qs = LRB_QUESTIONS_OUVERTES[k];
      expect(qs).toHaveLength(10);
      expect(new Set(qs.map(q => q.question)).size).toBe(10);
      qs.forEach(q => {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.reponseAttendue.length).toBeGreaterThan(40);
      });
    }
    const fin = LRB_QUESTIONS_OUVERTES.fin.map(q => q.question);
    [/diagnostic/i, /orthographe/i, /homophones/i, /accords/i, /participe passé/i, /mode/i, /typographie/i, /paronymes/i, /phrases/i, /registre/i]
      .forEach((re, i) => expect(fin[i]).toMatch(re));
  });

  it("groupe de 12 stagiaires : aucune réponse identique à la même question", () => {
    for (const debut of [true, false]) {
      const copies = noms.map((s, i) => getLRBAutoAnswers(s.nom, s.prenom, s.civilite, debut, 10, i));
      for (let q = 0; q < 10; q++) {
        expect(new Set(copies.map(c => c.reponses[q])).size, `${debut ? "début" : "fin"} Q${q + 1}`).toBe(12);
      }
      expect(copies.every(c => c.reponses.every(r => !/\{|\}/.test(r)))).toBe(true);
      if (debut) expect(copies.every(c => c.scores.some(sc => sc < 1))).toBe(true);
      else expect(copies.every(c => c.scores.every(sc => sc >= 0.5))).toBe(true);
    }
    const a = getLRBAutoAnswers("MARTIN", "Sophie", "Mme", true);
    expect(getLRBAutoAnswers("Martin", "sophie", "Mme", true)).toEqual(a);
    expect(lrbSeed("MARTIN", "Sophie")).toBe(lrbSeed("martin", "SOPHIE"));
  });

  it("mises en situation : 8 copies différentes par exercice, tirées de la bonne banque", () => {
    LRB_EXERCICES.forEach((ex, ei) => {
      const prods = noms.slice(0, 8).map((s, i) => pickLRBExerciceAnswer(FORMATION_LRB.intitule, "RS7013", ei, i, s, ex.titre));
      expect(new Set(prods).size, ex.titre).toBe(8);
      prods.forEach((p, i) => {
        expect(p, `${ex.titre} copie ${i}`).toMatch(MOTS_EXERCICES[ei]);
        expect(p!, `${ex.titre} copie ${i}`).not.toMatch(/\{|\}/);
      });
      expect(pickLRBExerciceAnswer(FORMATION_LRB.intitule, "RS7013", ei + 3, 0, noms[0], ex.titre)).toBe(prods[0]);
    });
    const avecEnt = pickLRBExerciceAnswer(FORMATION_LRB.intitule, "", 0, 0, { ...noms[0], entreprise: "SAS TEST" }, LRB_EXERCICES[0].titre);
    expect(avecEnt).toMatch(/^J'ai rattaché l'exercice aux écrits de SAS TEST\./);
    expect(pickLRBExerciceAnswer(INTITULE_FLE, "RS6674", 0, 0, noms[0], "C1")).toBeNull();
    expect(pickLRBExerciceAnswer("Gérer son centre de formation – 35 h", "", 0, 0, noms[0], "C1")).toBeNull();
    // Accords : une stagiaire n'est jamais « technicien », « assistant », « agent »…
    const fem = Array.from({ length: 8 }, (_, i) => pickLRBExerciceAnswer(FORMATION_LRB.intitule, "", 0, i, { nom: "X" + i, prenom: "Inès", civilite: "Mme" }, LRB_EXERCICES[0].titre)).join(" ");
    expect(fem).not.toMatch(motsEntiers(["assistant", "technicien", "agent", "conseiller", "commercial", "chargé", "indépendant", "demandeur", "seul", "appuyé"]));
    const masc = Array.from({ length: 8 }, (_, i) => pickLRBExerciceAnswer(FORMATION_LRB.intitule, "", 0, i, { nom: "Y" + i, prenom: "Karim", civilite: "M." }, LRB_EXERCICES[0].titre)).join(" ");
    expect(masc).not.toMatch(motsEntiers(["assistante", "technicienne", "agente", "conseillère", "commerciale", "chargée", "indépendante", "demandeuse", "seule", "appuyée"]));
  });

  it("évaluation des besoins : réponses propres à chaque stagiaire, financement CPF ou employeur", () => {
    const besoins = noms.map((s, i) => getLRBEvalBesoins(s, false, i));
    expect(new Set(besoins.map(b => b.objectif)).size).toBe(12);
    expect(new Set(besoins.map(b => b.attentes)).size).toBe(12);
    expect(new Set(besoins.map(b => b.diplome)).size).toBe(12);
    expect(besoins.every(b => !/\{|\}/.test(Object.values(b).join(" ")))).toBe(true);
    expect(besoins.every(b => /trois (jours|journées)/.test(b.disponibilites))).toBe(true);
    expect(besoins.every(b => /compte personnel de formation/.test(b.budget) && /11 jours ouvrés/.test(b.budget))).toBe(true);
    expect(getLRBEvalBesoins({ ...noms[0], entreprise: "SAS TEST" }, true, 0).budget).toMatch(/employeur/);
    const besoinsPrincipaux = noms.map((s, i) => getLRBBesoin(s.nom, s.prenom, s.civilite, i));
    expect(new Set(besoinsPrincipaux).size).toBe(12);
    expect(besoinsPrincipaux.every(b => b.length > 20 && !/\{|\}/.test(b))).toBe(true);
    const seize = Array.from({ length: 16 }, (_, i) => getLRBBesoin("N" + i, "P", "M.", i));
    expect(new Set(seize).size).toBe(16);
    expect(getLRBEvalBesoins(noms[0], false, 0).raisonSociale).toBe("/");
  });

  it("positionnement de début : notes différentes, jamais au-dessus de 12/20", () => {
    const notes = Array.from({ length: 8 }, (_, i) => lrbNoteDebutSur20(i));
    expect(new Set(notes).size).toBe(8);
    expect(Math.max(...notes)).toBeLessThanOrEqual(12);
    const ouv = Array.from({ length: 8 }, (_, i) =>
      getLRBAutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0));
    expect(new Set(ouv).size).toBe(8);
    for (let i = 0; i < 100; i++) {
      const tot = getLRBAutoAnswers("NOM" + i, "Prenom", "Mme", true, 10, i).scores.reduce((a, b) => a + b, 0);
      expect(tot, `stagiaire ${i}`).toBeLessThanOrEqual(6);
      expect(lrbBonnesQcmDebut(10, i) * 2).toBeLessThanOrEqual(12);
      const rep = lrbReponsesQcmDebut(LRB_QCM_DEBUT, i, "NOM" + i, "Prenom");
      const bonnes = rep.filter((r, qi) => r === LRB_QCM_DEBUT[qi].correctIndex).length;
      expect(bonnes).toBe(lrbBonnesQcmDebut(LRB_QCM_DEBUT.length, i));
    }
  });

  it("exercices : notes différentes d'un stagiaire à l'autre", () => {
    for (let ex = 0; ex < 12; ex++) {
      expect(new Set(Array.from({ length: 6 }, (_, i) => lrbNoteExercice(i, ex, true))).size).toBe(6);
      expect(new Set(Array.from({ length: 6 }, (_, i) => lrbNoteExercice(i, ex, false))).size).toBe(6);
    }
  });
});

describe("Certification Le Robert (RS7013) — câblage", () => {
  it("l'évaluation utilise les exercices, QCM et questions ouvertes du preset, jamais le contenu FLE", async () => {
    const { getEvalContent, getQuestionsOuvertes } = await import("@/lib/evalContent");
    const ev = getEvalContent(FORMATION_LRB.intitule);
    expect(ev.exercices[0].titre).toBe(LRB_EXERCICES[0].titre);
    expect(ev.qcmPositionnement).toEqual(LRB_QCM_DEBUT);
    expect(ev.qcmFinal).toEqual(LRB_QCM_FIN);
    expect(JSON.stringify(ev)).not.toMatch(FLE_MEDICO_SOCIAL);
    const qo = getQuestionsOuvertes(FORMATION_LRB.intitule);
    expect(qo.debut.map(q => q.question)).toEqual(LRB_QUESTIONS_OUVERTES.debut.map(q => q.question));
    // La formation FLE RS6674 garde son propre contenu
    const fle = SAMPLE_FORMATIONS.find(f => f.codeRNCP === "RS6674");
    if (fle) expect(getEvalContent(fle.intitule).qcmPositionnement).not.toEqual(LRB_QCM_DEBUT);
  }, 60000);

  it("les autres formations gardent leur contenu", async () => {
    const { getEvalContent } = await import("@/lib/evalContent");
    for (const f of SAMPLE_FORMATIONS.filter(x => x.intitule !== FORMATION_LRB.intitule)) {
      expect(getEvalContent(f.intitule).qcmPositionnement, f.intitule).not.toEqual(LRB_QCM_DEBUT);
    }
  }, 60000);

  it("vidéos et ressources : jamais la banque FLE", async () => {
    const { getYoutubeVideos } = await import("@/lib/courseContent");
    expect(getYoutubeVideos(FORMATION_LRB.intitule)).toEqual(LRB_VIDEOS);
    expect(JSON.stringify(LRB_VIDEOS)).not.toMatch(FLE_MEDICO_SOCIAL);
  }, 60000);

  it("le support de cours compte au moins 8 chapitres, plus de 500 000 caractères, un quiz et un cas pratique par chapitre", async () => {
    const { getCourseChapters } = await import("@/lib/courseContent");
    const { getRobertRS7013Chapters } = await import("@/lib/courseContentRobertRS7013");
    const chapitres = getRobertRS7013Chapters();
    expect(getCourseChapters(FORMATION_LRB.intitule)).toEqual(chapitres);
    expect(chapitres.length).toBeGreaterThanOrEqual(8);
    const html = chapitres.flatMap(c => c.sections.map(s => s.content)).join("");
    expect(html.length).toBeGreaterThan(500000);
    chapitres.forEach(c => {
      expect(c.sections.some(s => /quiz/i.test(s.title)), c.title).toBe(true);
      expect(c.sections.some(s => /cas pratique/i.test(s.title)), c.title).toBe(true);
    });
    const texte = html.replace(/<[^>]+>/g, " ");
    expect(texte).toMatch(/Ardoise & Plume|Ardoise &amp; Plume/);
    expect(texte).not.toMatch(/médico-social|RS6674/);
  }, 60000);
});
