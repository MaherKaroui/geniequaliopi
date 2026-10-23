import { describe, it, expect } from "vitest";
import { generateDocumentById } from "@/lib/documentGenerator";
const o: any = { nom: "KNOWLEDGE ACADEMY", siret: "99449196700026", nda: "11923009192", adresse: "112 avenue de la Liberté" };
const f: any = { intitule: "TP Exploitant en transport routier de marchandises", duree: "744", dateDebut: "2026-10-09", dateFin: "2027-10-22", objectifs: "", programme: "", formateur: "Silvère AHONZO" };
const s: any = [{ prenom: "Nathan", nom: "LUBAMBA MPUNGI", civilite: "M.", dateDebut: "2026-10-09", dateFin: "2027-10-22" }];
describe("évaluation des besoins d'une formation TP intégrée", () => {
  it("reste le document Qualiopi rempli, pas la trame vierge", () => {
    const html = generateDocumentById("x", "trame_eval_besoins_combine", { stagiaireIdx: 0 }, o, f, s);
    expect(html).not.toMatch(/<div style="min-height:50px"><\/div>/);
    expect(html.length).toBeGreaterThan(8000);
  });
});
