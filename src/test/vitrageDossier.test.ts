import { describe, it } from "vitest";
import { generateDocumentById } from "@/lib/documentGenerator";
const txt = (h: string) => String(h).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
describe("dossier ceos", () => {
  it("rend", () => {
    const o: any = { nom: "CEOS ACADEMY", siret: "123", nda: "11", adresse: "Paris", email: "a@b.c" };
    const f: any = {
      intitule: "remplacement et réparation de vitrage automobile",
      codeRNCP: "RNCP36223", dateDebut: "2026-05-04", dateFin: "2026-06-19",
      duree: "105", modalite: "Présentiel", objectifs: "Remplacer un vitrage", programme: "Jour 1 – Sécurité\n09h00 – 12h00 : Théorie",
    };
    const st: any[] = [
      { civilite: "M.", nom: "DUPONT", prenom: "Marc", entreprise: "X", poste: "Poseur" },
      { civilite: "Mme", nom: "MARTIN", prenom: "Sophie", entreprise: "", poste: "Reconversion" },
    ];
    
    for (const si of [0,1]) {
      for (const id of ["test_positionnement_debut_stagiaire","test_positionnement_fin_stagiaire","exercices_stagiaire","analyse_besoins"]) {
        try { console.log("###", si, id, txt(generateDocumentById(id, "", { stagiaireIdx: si, exerciceIdx: 0 }, o, f, st)).slice(0, 700)); }
        catch (e: any) { console.log("###", si, id, "ERR", e.message); }
      }
    }
  });
});
