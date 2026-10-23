import { describe, expect, it } from "vitest";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
import type { IzApprenant, IzPayload, IzSlot } from "@/lib/izilearn/types";

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
  inscriptionId: `e${i}`, contactId: `c${i}`, civilite: "M.", prenom: `Prenom${i}`, nom: `NOM${i}`,
  email: `a${i}@exemple.fr`, statut: "inscrit", signatures: [], connexions: [], ...extra,
});
function payload(): IzPayload {
  const slots = creneaux("2026-09-07", 3);
  const fin = slots[slots.length - 1].debut.slice(0, 10);
  return {
    version: 1,
    source: { app: "izilearn", url: "http://localhost:5173", orgId: "o", sessionId: "s" },
    organisme: { id: "o", nom: "ORGANISME TEST", siret: "12345678900011", nda: "11000000000", adresse: "1 rue de Paris", codePostal: "75001", ville: "Paris", email: "c@o.fr", dirigeant: "Jean MARTIN" },
    formation: { id: "f", intitule: "Gérer un projet digital", typeAction: "actions-formation", objectifs: "Cadrer un projet\nPiloter le planning", dureeHeures: 21, tarif: "1 500 €", modules: [], blocs: [] },
    session: { id: "s", code: "S1", dateDebut: "2026-09-07", dateFin: fin, modalite: "presentiel", formateur: "Paul DURAND" },
    creneaux: slots,
    apprenants: [apprenant(1, { entreprise: { nom: "ACME" } })],
  };
}
describe("besoins izilearn", () => {
  it("rendu rempli", () => {
    const piece = planPieces(contexte(payload())).find((x) => x.id === "besoins_0");
    const html = piece?.rendre() || "";
    console.log("SOURCE:", piece?.source);
    console.log("LEN:", html.length);
    console.log("HAS PARTIE APPRENANT:", html.includes("PARTIE APPRENANT"));
    console.log("HAS diplome answer table:", /<td>[^<]{20,}<\/td>/.test(html));
    console.log("SNIPPET:", html.replace(/\s+/g, " ").slice(0, 600));
  });
});
