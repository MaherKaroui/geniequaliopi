import { describe, expect, it } from "vitest";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
import { applyLearnerSignatures } from "@/lib/izilearn/documentSignature";
import type { IzPayload } from "@/lib/izilearn/types";

describe("Preuves d'émargement IZILearn", () => {
  it("préserve une signature de créneau sans signer les autres demi-journées avec la signature réutilisable", () => {
    const p: IzPayload = {
      version: 1, source: { app: "izilearn", url: "http://localhost:8080", orgId: "test", sessionId: "test" },
      organisme: { id: "test", nom: "Centre TEST" },
      formation: { id: "test", intitule: "Projet", typeAction: "actions-formation", modules: [], blocs: [] },
      session: { id: "test", dateDebut: "2020-01-06", dateFin: "2020-01-06", modalite: "presentiel" },
      creneaux: [
        { id: "m", debut: "2020-01-06T09:00:00", fin: "2020-01-06T12:30:00", demiJournee: "matin", mode: "presentiel" },
        { id: "a", debut: "2020-01-06T13:30:00", fin: "2020-01-06T17:00:00", demiJournee: "apres_midi", mode: "presentiel" },
      ],
      apprenants: [{ inscriptionId: "test", contactId: "test", prenom: "Camille", nom: "TEST", statut: "inscrit", signatureUrl: "data:image/png;base64,aGVsbG8=", connexions: [], signatures: [{ slotId: "m", statut: "present", signeLe: "2020-01-06T09:02:00", svg: "<svg xmlns='http://www.w3.org/2000/svg'/>" }] }],
    };
    const cx = contexte(p);
    const piece = planPieces(cx).find((x) => x.id === "emargement_0");
    if (!piece) throw new Error("Émargement absent");
    const doc = new DOMParser().parseFromString(applyLearnerSignatures(piece.rendre(), piece, cx), "text/html");
    const rows = doc.querySelectorAll("table tr");
    expect(rows).toHaveLength(3);
    // Créneau signé dans IZILearn : signature horodatée conservée.
    expect(rows[1].querySelectorAll("td")[2].querySelectorAll("img")).toHaveLength(1);
    expect(doc.body.textContent).toContain("signé le 06/01/2020 à 09:02");
    // Autre demi-journée passée : remplissage automatique Qualiopi avec la signature réutilisable.
    expect(rows[2].querySelectorAll("td")[2].querySelectorAll("img")).toHaveLength(1);
    expect(rows[2].querySelectorAll("td")[2].textContent).not.toContain("signé le");
  });
});