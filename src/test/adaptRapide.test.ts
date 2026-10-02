import { it, expect } from "vitest";
import { generateDocumentById } from "@/lib/documentGenerator";
import { adaptHtmlToTypeAction } from "@/lib/adaptTypeAction";
const o: any = { nom: "TEST OF", adresse: "1 rue A", codePostal: "75001", ville: "Paris", siret: "12345678901234", nda: "11111111111", email: "t@t.fr", dirigeant: "Jean Test", version: "1", dateMaj: "2026-09-30" };
const f: any = { intitule: "Formation Test", objectifs: "Obj", duree: "35 heures", modalites: "Présentiel", tarif: "2100", programme: "Prog", dateDebut: "2026-10-05", dateFin: "2026-10-09", lieu: "Paris", formateur: "Form" };
const s: any = [{ civilite: "Mme", nom: "DUPONT", prenom: "Marie", email: "m@t.fr", telephone: "" }];
for (const [k, t] of [["programme","programme_formation"],["ri","reglement_interieur_stagiaire"],["cgv","cgv_stagiaire"],["emargement","emargement_stagiaire"]]) {
  it(k, () => {
    const raw = generateDocumentById(k, t, { fi: 0, stagiaireIdx: 0 }, o, { ...f, typeAction: "vae" }, s);
    const html = adaptHtmlToTypeAction(raw, "vae");
    const txt = html.replace(/<[^>]+>/g, " ");
    console.log(k, /stagiaire/i.test(raw), /bénéficiaire/i.test(txt));
    expect(/\bstagiaires?\b/i.test(txt)).toBe(false);
  });
}
