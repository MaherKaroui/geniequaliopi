import { describe, expect, it, vi, afterEach } from "vitest";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
import { plannedSessionDay, unitesExercices } from "@/lib/izilearn/trames";
import { installerContenu } from "@/lib/izilearn/contenu";
import type { IzApprenant, IzPayload, IzSlot } from "@/lib/izilearn/types";
import { mailPourCapture } from "@/lib/izilearn/mailCapture";

function creneaux(debut: string, nbJours: number): IzSlot[] {
  const out: IzSlot[] = [];
  const d = new Date(`${debut}T00:00:00`);
  while (out.length < nbJours * 2) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      const j = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      out.push({ id: `${j}-m`, debut: `${j}T09:00:00`, fin: `${j}T12:30:00`, demiJournee: "matin", mode: "presentiel" });
      out.push({ id: `${j}-a`, debut: `${j}T13:30:00`, fin: `${j}T17:00:00`, demiJournee: "apres_midi", mode: "presentiel" });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

const apprenant = (i: number, extra: Partial<IzApprenant> = {}): IzApprenant => ({
  inscriptionId: `e${i}`, contactId: `c${i}`, civilite: i % 2 ? "Mme" : "M.", prenom: `Prénom${i}`, nom: `NOM${i}`,
  email: `a${i}@exemple.fr`, statut: "inscrit", signatures: [], connexions: [], ...extra,
});

function payload(type: IzPayload["formation"]["typeAction"], nbJours: number, modalite = "presentiel"): IzPayload {
  const slots = creneaux("2026-11-02", nbJours);
  const fin = slots[slots.length - 1].debut.slice(0, 10);
  return {
    version: 1,
    source: { app: "izilearn", url: "http://localhost:5173", orgId: "o", sessionId: "s" },
    organisme: { id: "o", nom: "ORGANISME TEST", siret: "12345678900011", nda: "11000000000", adresse: "1 rue de Paris", codePostal: "75001", ville: "Paris", email: "contact@organisme-test.fr", dirigeant: "Jean MARTIN" },
    formation: {
      id: "f", intitule: "Gérer un projet digital", typeAction: type, objectifs: "Cadrer un projet\nPiloter le planning\nRendre compte", dureeHeures: nbJours * 7,
      tarif: "1 500 €", modules: [{ titre: "Cadrage", objectifs: "Note de cadrage" }, { titre: "Planification" }, { titre: "Pilotage" }], blocs: [],
    },
    session: { id: "s", code: "S1", dateDebut: "2026-11-02", dateFin: fin, modalite, formateur: "Paul DURAND" },
    creneaux: slots,
    apprenants: [
      apprenant(1, { entreprise: { nom: "ACME" }, signatures: [{ slotId: slots[0].id, statut: "present", signeLe: "2026-11-02T09:05:00", svg: "<svg xmlns='http://www.w3.org/2000/svg'/>" }] }),
      apprenant(2, { besoins: { titre: "Besoins", date: "2026-10-01", reponses: [{ question: "Objectif ?", reponse: "Évoluer" }] } }),
    ],
  };
}

describe("Espace IZILearn", () => {
  afterEach(() => vi.useRealTimers());

  it("ajoute un examen final par apprenant sans inventer les résultats après la formation", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-03-05T13:48:00Z"));
    const exams = planPieces(contexte(payload("actions-formation", 3))).filter((x) => x.categorie === "examen_final");
    expect(exams.map((x) => x.apprenantIdx)).toEqual([0, 1]);
    // Session terminée sans examen IZILearn : QCM final corrigé Qualiopi rempli automatiquement.
    expect(exams.map((x) => x.source)).toEqual(["document", "document"]);
    expect(exams[0].rendre()).toContain("☒");
    expect(exams[0].rendre()).toContain("Questions ouvertes");
    expect(exams[0].rendre()).not.toContain("Date : ____");
    expect(exams[0].rendre()).toContain("Évaluation des acquis");
    expect(exams[0].rendre()).toContain("<td>X</td>");
    expect(exams[0].rendre()).toMatch(/Score :<\/strong> \d+ \/ \d+/);
    expect(exams[0].rendre()).not.toContain("Réponse du stagiaire");
    expect(exams[0].rendre()).not.toContain("Atteint</td>");
  });

  it("remplit automatiquement l'examen final d'une session terminée, le laisse vierge avant", () => {
    const p = payload("actions-formation", 3);
    p.formation.contenu = {
      chapitres: [], exercices: [], positionnement: [],
      examenFinal: [
        { question: "E1 ?", options: ["A", "B", "C"], correctIndex: 1 },
        { question: "E2 ?", options: ["A", "B", "C"], correctIndex: 0 },
        { question: "E3 ?", options: ["A", "B", "C"], correctIndex: 2 },
        { question: "E4 ?", options: ["A", "B", "C"], correctIndex: 1 },
      ],
    };
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-20T13:48:00Z"));
    const futur = planPieces(contexte(p)).find((x) => x.id === "examen_final_0");
    expect(futur?.source).toBe("trame");
    expect(futur?.rendre()).not.toContain("☒");
    expect(futur?.rendre()).toContain("______ / 4");
    vi.setSystemTime(new Date("2026-11-05T13:48:00Z"));
    const passe = planPieces(contexte(p)).find((x) => x.id === "examen_final_0");
    expect(passe?.source).toBe("document");
    const html = passe?.rendre() || "";
    expect(html).toContain("☒");
    expect(html).toMatch(/Score :<\/strong> \d+ \/ 4/);
    expect(html).toMatch(/Note finale :<\/strong> \d+ \/ 20/);
    expect(html).toContain("Corrigé (réservé au formateur)");
  });

  it("conserve la note finale réelle de zéro sans reprendre le test de début", () => {
    const p = payload("actions-formation", 3);
    p.apprenants[0].positionnement = [{ titre: "Test de début", date: "2026-11-02", score: 9, max: 10 }];
    p.apprenants[0].examenFinal = [{ titre: "Examen enregistré", date: "2026-11-04", score: 0, max: 20, reussi: false, appreciation: "Compétences à retravailler" }];
    const exam = planPieces(contexte(p)).find((x) => x.id === "examen_final_0");
    expect(exam?.source).toBe("izilearn");
    expect(exam?.rendre()).toContain("0 / 20");
    expect(exam?.rendre()).toContain("Non atteint");
    expect(exam?.rendre()).not.toContain("9 / 10");
  });

  it("utilise les questions finales IZILearn sans résultats préremplis", () => {
    const p = payload("actions-formation", 3);
    p.formation.contenu = { chapitres: [], exercices: [], positionnement: [], examenFinal: [{ question: "Livrable final du projet ?", options: ["Bilan du projet", "Planning initial"] }] };
    const exam = planPieces(contexte(p)).find((x) => x.id === "examen_final_0");
    expect(exam?.rendre()).toContain("Livrable final du projet ?");
    expect(exam?.rendre()).toContain("Planning initial");
    expect(exam?.source).toBe("trame");
  });

  it("applique une MAJ commune sans remplacer les dates de session et de preuves", () => {
    const p = payload("actions-formation", 3, "hybride");
    p.formation.miseAJour = "2026-09-01";
    const cx = contexte(p, "2026-10-20");
    expect(cx.o.dateMaj).toBe("2026-10-20");
    expect(cx.f.dateDebut).toBe("2026-11-02");
    expect(cx.p.apprenants[0].signatures[0].signeLe).toBe("2026-11-02T09:05:00");
    const pieces = planPieces(cx);
    for (const piece of pieces) {
      expect(piece.rendre(), piece.id).toContain("20 octobre 2026");
      if (piece.mail) expect(mailPourCapture(piece.mail, cx.o).messages[0].body).toBe(piece.mail.corpsHtml);
    }
  });

  it("reprend automatiquement le mail dans une capture sans inventer de réponse du stagiaire", () => {
    const cx = contexte(payload("actions-formation", 3));
    const modele = planPieces(cx).find((p) => p.mail?.key === "af_convocation")?.mail;
    if (!modele) throw new Error("Convocation absente");
    const capture = mailPourCapture(modele, cx.o);
    expect(capture.messages).toHaveLength(1);
    expect(capture.messages[0].fromEmail).toBe("contact@organisme-test.fr");
    expect(capture.messages[0].toEmail).toBe("a1@exemple.fr");
    expect(capture.messages[0].date).toEqual(modele.dateEnvoi);
    expect(capture.messages[0].atts.map((a) => a.name)).toEqual(modele.piecesJointes);
    expect(capture.messages[0].atts.every((a) => a.size === "")).toBe(true);
  });

  it("génère les mails même sans adresses, sans inventer de destinataire", () => {
    const p = payload("actions-formation", 3, "distanciel");
    p.organisme.email = "";
    p.apprenants = [apprenant(1, { email: "" })];
    const mails = planPieces(contexte(p)).filter((x) => x.mail);
    expect(mails.length).toBeGreaterThan(0);
    expect(mails.every((x) => x.mail?.destinataireEmail === "")).toBe(true);
    expect(mails.some((x) => x.mail?.key === "af_convocation")).toBe(true);
  });

  it("ne présente pas un lien Meet fictif comme l’accès réel de la session", () => {
    const mails = planPieces(contexte(payload("actions-formation", 3, "distanciel"))).filter((x) => x.mail);
    const connexion = mails.find((x) => x.mail?.key === "af_connexion");
    expect(connexion).toBeDefined();
    expect(connexion?.mail?.corpsHtml).not.toContain("https://meet.google.com/");
    expect(connexion?.mail?.destinataireEmail).toBe("a1@exemple.fr");
  });

  it("ne laisse pas un questionnaire vide importé bloquer le remplissage Qualiopi", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-03-05T13:48:00Z"));
    const p = payload("actions-formation", 3);
    const vide = { titre: "Questionnaire", date: "2026-11-04", reponses: [{ question: "Avis", reponse: "  " }] };
    p.apprenants[0].besoins = vide;
    p.apprenants[0].besoinsEntreprise = vide;
    p.apprenants[0].positionnement = [{ titre: "Test", date: "2026-11-02", score: null, appreciation: "" }];
    p.apprenants[0].bilanChaud = vide;
    p.apprenants[0].bilanFroid = vide;
    const pieces = planPieces(contexte(p));
    for (const id of ["besoins_0", "positionnement_0", "bilan_chaud_0", "bilan_froid_0"]) {
      expect(pieces.find((x) => x.id === id)?.source, id).toBe("document");
    }
  });

  it("conserve un résultat réel de zéro et une réponse négative", () => {
    const p = payload("actions-formation", 3);
    p.apprenants[0].positionnement = [{ titre: "Test", date: "2026-11-02", score: 0, max: 10, reussi: false }];
    p.apprenants[0].besoins = { titre: "Besoins", date: "2026-10-01", reponses: [{ question: "Adaptation ?", reponse: "Non" }] };
    const pieces = planPieces(contexte(p));
    expect(pieces.find((x) => x.id === "positionnement_0")?.rendre()).toContain("0 / 10");
    expect(pieces.find((x) => x.id === "besoins_0")?.source).toBe("izilearn");
  });

  it("additionne seulement les temps enregistrés sans transformer les horaires prévus en connexions", () => {
    const p = payload("actions-formation", 1, "distanciel");
    p.apprenants[0].connexions = [
      { debut: "2026-11-02T09:05:00", fin: "2026-11-02T10:05:00", secondes: 3600, source: "meet" },
      { debut: "2026-11-02T13:35:00", fin: "2026-11-02T15:05:00", secondes: 5400, source: "lms" },
    ];
    const html = planPieces(contexte(p)).find((x) => x.id === "connexion_0")?.rendre();
    expect(html).toContain("2 h 30");
    expect(html).toContain("09:05");
    expect(html).toContain("15:05");
    expect(html).toContain("Total connecté :</strong> 2h30min");
  });

  it("complète la déconnexion depuis le début et la durée réellement enregistrés", () => {
    const p = payload("actions-formation", 1, "distanciel");
    p.apprenants[0].connexions = [
      { debut: "2026-11-02T09:05:00", secondes: 3600, source: "meet" },
      { debut: "2026-11-02T13:35:00", secondes: 5400, source: "lms" },
    ];
    const html = planPieces(contexte(p)).find((x) => x.id === "connexion_0")?.rendre();
    expect(html).toContain("10:05");
    expect(html).toContain("15:05");
    expect(html).toContain("2 h 30");
    expect(html).not.toContain("17:00");
  });

  it("reprend les deux blocs horaires Qualiopi sans relevé ni créneau IZILearn", () => {
    const p = payload("actions-formation", 1, "distanciel");
    p.creneaux = [];
    const cx = contexte(p);
    const a = p.apprenants[1], s = cx.stagiaires[1];
    const blocks = plannedSessionDay({ ...cx, a, s }, new Date("2026-11-02T00:00:00"));
    expect(blocks.map(({ start, end, seconds }) => ({ start, end, seconds }))).toEqual([
      { start: "09:00", end: "12:30", seconds: 12600 },
      { start: "13:30", end: "17:00", seconds: 12600 },
    ]);
    expect(a.connexions).toEqual([]);
    expect(a.signatures).toEqual([]);
  });

  it("donne priorité aux créneaux saisis plutôt qu’aux horaires proposés", () => {
    const p = payload("actions-formation", 1, "distanciel");
    p.creneaux = [{ id: "custom", debut: "2026-11-02T10:00:00", fin: "2026-11-02T11:15:00", demiJournee: "matin", mode: "distanciel" }];
    const cx = contexte(p);
    const blocks = plannedSessionDay({ ...cx, a: p.apprenants[1], s: cx.stagiaires[1] }, new Date("2026-11-02T00:00:00"));
    expect(blocks.map(({ start, end, seconds }) => ({ start, end, seconds }))).toEqual([
      { start: "10:00", end: "11:15", seconds: 4500 },
    ]);
  });

  it("remplit les besoins et le positionnement avec les mêmes générateurs que Qualiopi", () => {
    const pieces = planPieces(contexte(payload("actions-formation", 3)));
    const besoins = pieces.find((p) => p.id === "besoins_0");
    const test = pieces.find((p) => p.id === "positionnement_0");
    expect(besoins?.source).toBe("document");
    expect(besoins?.rendre()).toContain("ACME");
    expect(test?.source).toBe("document");
    expect(test?.rendre()).toContain("Réponse du stagiaire");
  });

  it("conserve les réponses, notes, signatures et connexions importées", () => {
    const p = payload("actions-formation", 3, "distanciel");
    p.apprenants[0].positionnement = [{ titre: "Test réel", date: "2026-11-02", score: 3, max: 10, appreciation: "À approfondir" }];
    p.apprenants[0].bilanChaud = { titre: "Retour réel", date: "2026-11-04", reponses: [{ question: "Avis", reponse: "Organisation à améliorer" }] };
    p.apprenants[0].connexions = [{ debut: "2026-11-02T09:00:00", fin: "2026-11-02T10:00:00", secondes: 3600, source: "meet" }];
    const pieces = planPieces(contexte(p));
    expect(pieces.find((x) => x.id === "positionnement_0")?.rendre()).toContain("3 / 10");
    expect(pieces.find((x) => x.id === "positionnement_0")?.rendre()).toContain("À approfondir");
    expect(pieces.find((x) => x.id === "bilan_chaud_0")?.rendre()).toContain("Organisation à améliorer");
    expect(pieces.find((x) => x.id === "connexion_0")?.rendre()).toContain("1 h 00");
  });

  it("laisse les exercices futurs et bilans non échus vides, remplit ceux échus", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-20T13:48:00Z"));
    const p = payload("actions-formation", 3);
    const future = planPieces(contexte(p));
    expect(future.find((x) => x.id === "exercices_0_ex0")?.source).toBe("trame");
    expect(future.find((x) => x.id === "bilan_chaud_0")?.source).toBe("trame");
    expect(future.find((x) => x.id === "bilan_froid_0")?.source).toBe("trame");
    vi.setSystemTime(new Date("2026-11-05T13:48:00Z"));
    const held = planPieces(contexte(p));
    expect(held.find((x) => x.id === "exercices_0_ex0")?.source).toBe("document");
    expect(held.find((x) => x.id === "bilan_chaud_0")?.source).toBe("document");
    expect(held.find((x) => x.id === "bilan_froid_0")?.source).toBe("trame");
    vi.setSystemTime(new Date("2027-02-05T13:48:00Z"));
    expect(planPieces(contexte(p)).find((x) => x.id === "bilan_froid_0")?.source).toBe("document");
  });
  it("formation inconnue : support de cours et exercices tirés du contenu IZILearn", () => {
    const p = payload("actions-formation", 3);
    p.formation.contenu = {
      chapitres: [{ titre: "Cadrer le projet", description: "Bases", sections: [{ titre: "La note de cadrage", html: "<p>MARQUEUR_LECON_IZILEARN</p>" }] }],
      exercices: [{ titre: "Rédiger une note", consigne: "MARQUEUR_CONSIGNE_IZILEARN", reponseAttendue: "CORRIGE_SECRET" }],
      positionnement: [{ question: "Qu'est-ce qu'un jalon ?", options: ["Une étape clé", "Un budget"] }],
      brouillonIA: true,
    };
    const cx = contexte(p);
    expect(installerContenu(cx.p, cx.f)).toBe("izilearn");
    const pieces = planPieces(cx);
    expect(pieces.find((x) => x.id === "support")!.rendre()).toContain("MARQUEUR_LECON_IZILEARN");
    const ex = pieces.find((x) => x.categorie === "exercices" && x.source === "trame")!.rendre();
    expect(ex).toContain("Qu'est-ce qu'un jalon ?");
    expect(ex).toContain("Une étape clé");
    expect(ex).not.toContain("CORRIGE_SECRET");
    expect(ex).not.toContain("MARQUEUR_CONSIGNE_IZILEARN");
  });

  it("chaque période reçoit un QCM différent, sans réponses pré-remplies", () => {
    const p = payload("actions-formation", 3);
    p.formation.contenu = {
      chapitres: [], exercices: [],
      positionnement: [
        { question: "Q1 ?", options: ["A", "B"] }, { question: "Q2 ?", options: ["A", "B"] },
        { question: "Q3 ?", options: ["A", "B"] }, { question: "Q4 ?", options: ["A", "B"] },
        { question: "Q5 ?", options: ["A", "B"] }, { question: "Q6 ?", options: ["A", "B"] },
      ],
    };
    const qcms = planPieces(contexte(p)).filter((x) => x.categorie === "exercices" && x.apprenantIdx === 0);
    expect(qcms.length).toBe(3);
    const htmls = qcms.map((x) => x.rendre());
    for (const h of htmls) {
      expect(h).toContain("QCM D'ÉVALUATION");
      expect(h).not.toContain("Consigne");
    }
    // Chaque QCM contient des questions que les autres n'ont pas.
    expect(htmls[0]).toContain("Q1 ?");
    expect(htmls[0]).not.toContain("Q4 ?");
    expect(htmls[1]).toContain("Q4 ?");
    expect(htmls[1]).not.toContain("Q1 ?");
  });

  it("remplit les QCM passés même si IZILearn n'envoie pas la bonne réponse", () => {
    const p = payload("actions-formation", 3);
    p.formation.contenu = { chapitres: [], exercices: [], positionnement: [{ question: "Q1 ?", options: ["A", "B"] }, { question: "Q2 ?", options: ["A", "B"] }] };
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-05T13:48:00Z"));
    const qcms = planPieces(contexte(p)).filter((x) => x.categorie === "exercices" && x.apprenantIdx === 0);
    for (const q of qcms) { expect(q.rendre()).toContain("☒"); expect(q.rendre()).not.toMatch(/Appréciation du formateur :<\/strong><\/p><div/); }
    vi.useRealTimers();
  });

  it("remplit automatiquement les QCM des périodes passées, laisse les futures vierges", () => {
    const p = payload("actions-formation", 3);
    p.formation.contenu = {
      chapitres: [], exercices: [],
      positionnement: [
        { question: "Q1 ?", options: ["A", "B", "C"], correctIndex: 1 },
        { question: "Q2 ?", options: ["A", "B", "C"], correctIndex: 0 },
        { question: "Q3 ?", options: ["A", "B", "C"], correctIndex: 2 },
        { question: "Q4 ?", options: ["A", "B", "C"], correctIndex: 1 },
        { question: "Q5 ?", options: ["A", "B", "C"], correctIndex: 0 },
        { question: "Q6 ?", options: ["A", "B", "C"], correctIndex: 2 },
      ],
    };
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-20T13:48:00Z"));
    const futur = planPieces(contexte(p)).filter((x) => x.categorie === "exercices" && x.apprenantIdx === 0);
    for (const q of futur) {
      expect(q.rendre()).not.toContain("☒");
      expect(q.rendre()).toContain("______ /");
    }
    vi.setSystemTime(new Date("2026-11-05T13:48:00Z"));
    const passes = planPieces(contexte(p)).filter((x) => x.categorie === "exercices" && x.apprenantIdx === 0);
    for (const q of passes) {
      const html = q.rendre();
      expect(html).toContain("☒");
      expect(html).toMatch(/Score :<\/strong> \d+ \/ \d+/);
      expect(html).toContain("Corrigé (réservé au formateur)");
    }
  });

  it("rythme des exercices : jour si court, semaine si long ou CFA", () => {
    const court = contexte(payload("actions-formation", 5));
    expect(unitesExercices(court.p, court.stagiaires[0], court.f).map((u) => u.type)).toEqual(Array(5).fill("jour"));
    const long = contexte(payload("actions-formation", 20));
    expect(unitesExercices(long.p, long.stagiaires[0], long.f)).toHaveLength(4);
    const cfa = contexte(payload("apprentissage", 5));
    const u = unitesExercices(cfa.p, cfa.stagiaires[0], cfa.f);
    expect(u).toHaveLength(1);
    expect(u[0].type).toBe("semaine");
  });

  for (const type of ["actions-formation", "apprentissage"] as const) {
    it(`génère toutes les pièces et conserve les preuves IZILearn (${type})`, () => {
      const cx = contexte(payload(type, 3, "hybride"));
      const pieces = planPieces(cx);
      const cats = new Set(pieces.map((p) => p.categorie));
      for (const k of ["programme", "besoins", "positionnement", "convocation", "convention", "cgv", "ri", "livret", "support", "exercices", "emargement", "connexion", "bilan_chaud", "bilan_froid", "mails"]) {
        expect(cats.has(k as never), k).toBe(true);
      }
      for (const p of pieces.filter((x) => !x.pdf)) {
        const html = p.rendre();
        expect(html.length, p.titre).toBeGreaterThan(300);
        if (p.categorie === "emargement" || p.categorie === "connexion") {
          expect(html, p.titre).not.toMatch(/Réponse du stagiaire/);
        }
      }
      const em = pieces.find((p) => p.id === "emargement_0")!;
      expect(em.source).toBe("izilearn");
      expect(em.rendre()).toContain("signé le 02/11/2026");
      expect(pieces.find((p) => p.id === "besoins_1")!.rendre()).toContain("Évoluer");
      // Mails : uniquement des messages de l'organisme
      for (const p of pieces.filter((x) => x.mail)) expect(p.mail!.destinataireEmail).not.toBe("contact@organisme-test.fr");
    });
  }
});

describe("CERFA IZILearn", () => {
  it("ajoute un CERFA par apprenant pour une formation en apprentissage", () => {
    const pieces = planPieces(contexte(payload("apprentissage", 5)));
    const cerfas = pieces.filter((x) => x.categorie === "cerfa");
    expect(cerfas.length).toBe(payload("apprentissage", 5).apprenants.length);
    expect(cerfas.every((x) => typeof x.pdf === "function")).toBe(true);
  });
  it("ajoute le CERFA quand l'organisme a un code UAI (CFA)", () => {
    const p = payload("actions-formation", 5);
    p.organisme.uai = "0942677Z";
    expect(planPieces(contexte(p)).some((x) => x.categorie === "cerfa")).toBe(true);
  });
  it("pas de CERFA hors CFA", () => {
    const p = payload("actions-formation", 5);
    p.organisme.uai = undefined;
    expect(planPieces(contexte(p)).some((x) => x.categorie === "cerfa")).toBe(false);
  });
});
