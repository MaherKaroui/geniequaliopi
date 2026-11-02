import { describe, it, expect } from "vitest";
import { generateDocumentById } from "@/lib/documentGenerator";

const o: any = { nom: "SELECT FORMATION", siret: "99449196700026", nda: "11923009192", responsablePedagogique: "Nadine DENDANI", dirigeant: "Nadine DENDANI", ville: "Paris" };
const s: any = [{ prenom: "Nathan", nom: "LUBAMBA", civilite: "M.", email: "nathan@mail.fr", dateDebut: "2026-10-09", dateFin: "2027-10-22" }];
const base: any = { intitule: "TP Exploitant en transport routier de marchandises", codeRNCP: "RS6905", duree: "744", dateDebut: "2026-10-09", dateFin: "2027-10-22", objectifs: "", programme: "", formateur: "Silvère AHONZO" };

const trame = (modalites: string) =>
  generateDocumentById("x", "trame_eval_besoins_combine", { stagiaireIdx: 0 }, o, { ...base, modalites }, s);

describe("volet « Formation à distance » de l'évaluation des besoins", () => {
  it("apparaît avec « Oui » coché pour une formation à distance", () => {
    const html = trame("Distanciel");
    expect(html).toContain("FORMATION À DISTANCE");
    expect(html).toContain("Compétences et équipement numériques vérifiés (connexion, ordinateur, utilisation de la plateforme)");
    expect(html).toContain("☒ Oui");
    expect(html).toContain("☐ Non");
  });

  it("apparaît aussi en mixte (une partie de la formation est à distance)", () => {
    expect(trame("Mixte : présentiel + plateforme")).toContain("FORMATION À DISTANCE");
  });

  it("n'apparaît pas en présentiel seul", () => {
    expect(trame("Présentiel")).not.toContain("FORMATION À DISTANCE");
  });

  it("figure aussi dans la trame CFA (partie apprenant) et dans la trame générale", () => {
    const f: any = { ...base, modalites: "Distanciel", rythmeAlternance: "3 semaines entreprise / 1 semaine CFA" };
    const cfa = generateDocumentById("x", "trame_eval_besoins_stagiaire", { stagiaireIdx: 0 }, o, f, s);
    expect(cfa).toContain("FORMATION À DISTANCE");
    expect(cfa).toContain("☒ Oui");
    const generale = generateDocumentById("x", "trame_eval_besoins", undefined, o, { ...base, modalites: "e-learning" }, s);
    expect(generale).toContain("FORMATION À DISTANCE");
    expect(generale).toContain("☒ Oui");
  });
});
