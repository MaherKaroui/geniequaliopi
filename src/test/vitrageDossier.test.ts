import { describe, it } from "vitest";
import { generateDocumentById } from "@/lib/documentGenerator";
const txt = (h: string) => String(h).split("</style>").pop()!.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
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
    
    for (const si of [0]) {
      const h = txt(generateDocumentById("x","exercices_stagiaire",{stagiaireIdx:si,exerciceIdx:0},o,f,st));
      console.log("EX>>>", h.slice(0,2200));
    }
  });
});
