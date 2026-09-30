import { describe, it, expect } from "vitest";
import { genContratFormationProStagiaire, natureActionLabel } from "@/lib/generatorsV2";

const o: any = { nom: "TEST OF", adresse: "1 rue A", codePostal: "75001", ville: "Paris", siret: "12345678901234", nda: "11111111111", email: "t@t.fr", dirigeant: "Jean Test", referentHandicap: "Ref H", version: "1", dateMaj: "2026-09-30" };
const baseF: any = { intitule: "Formation Test", objectifs: "Obj", prerequis: "", duree: "35 heures", modalites: "Présentiel", tarif: "2 100 € TTC", programme: "Prog", methodesEvaluation: "Eval", moyensPedagogiques: "Moyens", publicVise: "Tous", delaiAcces: "15 jours", dateDebut: "2026-10-05", dateFin: "2026-10-09", lieu: "Paris", nombreParticipants: "5", formateur: "Form" };
const s: any = [{ civilite: "Mme", nom: "DUPONT", prenom: "Marie", email: "m@t.fr", telephone: "", entreprise: "", poste: "", dateNaissance: "" }];

describe("typeAction contrat", () => {
  it("VAE", () => {
    const html = genContratFormationProStagiaire(o, { ...baseF, typeAction: "vae" }, s, 0);
    expect(html).toContain("CONTRAT D'ACCOMPAGNEMENT VAE");
    expect(html).toContain("Validation des acquis de l'expérience");
    expect(html).toContain("bénéficiaire");
    expect(html).not.toContain("Action de formation (article L.6313-1");
  });
  it("bilans de compétences", () => {
    const html = genContratFormationProStagiaire(o, { ...baseF, typeAction: "bilans-competences" }, s, 0);
    expect(html).toContain("CONTRAT DE BILAN DE COMPÉTENCES");
    expect(html).toContain("Bilan de compétences (articles L.6313-4");
  });
  it("apprentissage", () => {
    expect(natureActionLabel({ ...baseF, typeAction: "apprentissage" })).toContain("apprentissage");
  });
  it("défaut = action de formation", () => {
    const html = genContratFormationProStagiaire(o, { ...baseF }, s, 0);
    expect(html).toContain("CONTRAT DE FORMATION PROFESSIONNELLE");
    expect(html).toContain("Action de formation (article L.6313-1 du Code du travail)");
  });
});
