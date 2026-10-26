import { it, expect } from "vitest";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
it("certificat", () => {
  const p: any = { version: 1, source: { app: "crmlms", url: "", orgId: "o", sessionId: "s" }, organisme: { id: "o", nom: "ORG", dirigeant: "Jean MARTIN" }, formation: { id: "f", intitule: "Anglais", typeAction: "actions-formation", dureeHeures: 14, modules: [], blocs: [] }, session: { id: "s", dateDebut: "2026-01-02", dateFin: "2026-01-03", modalite: "distanciel" }, creneaux: [], apprenants: [{ inscriptionId: "e", contactId: "c", prenom: "Ana", nom: "LOPEZ", statut: "x", signatures: [], connexions: [] }] };
  const c = planPieces(contexte(p)).find((x) => x.categorie === "certificat");
  const h = c!.rendre(); expect(h).toMatch(/CERTIFICAT DE R[ÉE]ALISATION/i); expect(h).toContain("LOPEZ");
});
it("certificat en A4 portrait standard", () => {
  const p: any = { version: 1, source: { app: "crmlms", url: "", orgId: "o", sessionId: "s" }, organisme: { id: "o", nom: "ORG" }, formation: { id: "f", intitule: "Anglais", typeAction: "actions-formation", dureeHeures: 14, modules: [], blocs: [] }, session: { id: "s", dateDebut: "2026-01-02", dateFin: "2026-01-03", modalite: "distanciel" }, creneaux: [], apprenants: [{ inscriptionId: "e", contactId: "c", prenom: "Ana", nom: "LOPEZ", statut: "x", signatures: [], connexions: [] }] };
  const h = planPieces(contexte(p)).find((x) => x.categorie === "certificat")!.rendre();
  expect(h).not.toMatch(/pdf-page-size/);
});
