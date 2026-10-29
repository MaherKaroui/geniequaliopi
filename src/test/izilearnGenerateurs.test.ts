import { describe, expect, it } from "vitest";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
import { alertesGenerateur, versBdcData, versVAEData } from "@/lib/izilearn/generateurs";
import type { IzPayload } from "@/lib/izilearn/types";

function payload(type: IzPayload["formation"]["typeAction"]): IzPayload {
  return {
    version: 1,
    source: { app: "izilearn", url: "http://localhost:5173", orgId: "o", sessionId: "s" },
    organisme: { id: "o", nom: "ORGANISME TEST", siret: "12345678900011", nda: "11000000000", adresse: "1 rue de Paris", codePostal: "75001", ville: "Paris", email: "contact@organisme-test.fr", dirigeant: "Jean MARTIN" },
    formation: { id: "f", intitule: type === "vae" ? "Accompagnement VAE" : "Bilan de compétences", typeAction: type, dureeHeures: 24, tarif: "1 800 €", modules: [], blocs: [] },
    session: { id: "s", dateDebut: "2027-03-01", dateFin: "2027-04-30", modalite: "presentiel", formateur: "Paul DURAND" },
    creneaux: [{ id: "1", debut: "2027-03-02T09:00:00", fin: "2027-03-02T12:00:00", demiJournee: "matin", mode: "presentiel" }],
    apprenants: [
      { inscriptionId: "e1", contactId: "c1", civilite: "Mme", prenom: "Léa", nom: "BERNARD", email: "lea@exemple.fr", financeur: "cpf", statut: "inscrit", signatures: [], connexions: [],
        besoins: { titre: "Besoins", date: "2027-02-01", reponses: [{ question: "Objectif ?", reponse: "Changer de métier" }] } },
      { inscriptionId: "e2", contactId: "c2", civilite: "M.", prenom: "Marc", nom: "PETIT", email: "marc@exemple.fr", financeur: "cpf", statut: "inscrit", signatures: [], connexions: [] },
    ],
  };
}

describe("IZILearn × générateurs VAE et bilan de compétences", () => {
  it("bilan de compétences : uniquement les pièces du générateur BC, une série par bénéficiaire", () => {
    const cx = contexte(payload("bilans-competences"));
    const pieces = planPieces(cx);
    expect(new Set(pieces.map((p) => p.categorie))).toEqual(new Set(["bdc"]));
    expect(pieces.filter((p) => p.apprenantIdx === 0)).toHaveLength(18);
    expect(pieces.filter((p) => p.apprenantIdx === 1)).toHaveLength(18);
    const d = versBdcData(cx, 0);
    expect(d.sessions.length).toBeGreaterThan(0);
    expect(d.dateSignature < d.formation.dateDebut).toBe(true);
    expect(d.declarations.besoins).toContain("Changer de métier");
    expect(d.jours).toEqual(["mardi"]);
    expect(alertesGenerateur(cx)).toEqual([]);
    expect(pieces[0].rendre()).toContain("BERNARD");
  });

  it("VAE : uniquement les pièces du générateur VAE, financement personnel", () => {
    const cx = contexte(payload("vae"));
    const pieces = planPieces(cx);
    expect(new Set(pieces.map((p) => p.categorie))).toEqual(new Set(["vae"]));
    expect(pieces.filter((p) => p.apprenantIdx === 1)).toHaveLength(12);
    const d = versVAEData(cx, 0);
    expect(d.session.financement).toBe("Financement personnel");
    expect(d.session.dateSignature < d.session.dateDebut).toBe(true);
    expect(pieces.find((p) => p.fichier.startsWith("Convention_"))?.rendre()).toContain("BERNARD");
    expect(alertesGenerateur(cx)[0]).toMatch(/RNCP/);
  });

  it("action de formation : plan AF inchangé", () => {
    const cats = new Set(planPieces(contexte(payload("actions-formation"))).map((p) => p.categorie));
    expect(cats.has("programme")).toBe(true);
    expect(cats.has("vae") || cats.has("bdc")).toBe(false);
  });
});

import { certificationDepuisIntitule } from "@/lib/izilearn/generateurs";
describe("certification lue dans l'intitulé VAE", () => {
  it.each([
    ["ACCOMPAGNEMENT VAE – TITRE PROFESSIONNEL MAÇON (RNCP NIVEAU 3)", "TITRE PROFESSIONNEL MAÇON", "3", ""],
    ["VAE – TP Responsable d’Établissement Marchand (REM) – Niveau 6", "TP Responsable d’Établissement Marchand (REM)", "6", ""],
    ["Titre professionnel Agent magasinier - RNCP 40216", "Titre professionnel Agent magasinier", "", "40216"],
    ["Titre visé :  Vae Installateur thermique et sanitaire", "Installateur thermique et sanitaire", "", ""],
    ["Accompagnement à la Validation des Acquis de l’Expérience (VAE)  Titre Professionnel Assistant(e) de Vie aux Familles (ADVF)", "Titre Professionnel Assistant(e) de Vie aux Familles (ADVF)", "", ""],
  ])("%s", (src, titre, niveau, rncp) => {
    expect(certificationDepuisIntitule(src)).toEqual({ intitule: titre, niveau, rncp });
  });
});
