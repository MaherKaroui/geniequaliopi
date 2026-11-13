import { it, expect } from "vitest";
import { generateDocumentById } from "@/lib/documentGenerator";

const o: any = { nom: "TEST OF", adresse: "1 rue A", codePostal: "75001", ville: "Paris", siret: "12345678901234", nda: "11111111111", email: "t@t.fr", dirigeant: "Jean Test", version: "1", dateMaj: "2025-03-09" };
const programme = [
  "Jour 1 – Découverte (7h) :", "09h00–12h30 : Accueil et découverte de l'interface", "13h30–17h00 : Création d'un document",
  "Jour 2 – Mise en forme (7h) :", "09h00–12h30 : Mise en forme du texte", "13h30–17h00 : Paragraphes et listes",
  "Jour 3 – Mise en page (7h) :", "09h00–12h30 : Tableaux et images", "13h30–17h00 : Évaluation finale et bilan de formation",
].join("\n");
const f: any = { intitule: "Initiation Word", objectifs: "Obj", duree: "21 heures (3 jours)", modalites: "distanciel", programme, dateDebut: "2025-11-25", dateFin: "2025-11-27", formateur: "Jean Test" };

it("déroulé : un tableau par jour du programme et en-têtes lisibles quel que soit le thème", () => {
  const html = generateDocumentById("af_c2i5_deroule_pedagogique_0", "deroule_pedagogique_detaille", { fi: 0 }, o, f, []);
  expect(html).toContain("21 heures — 3 jours");
  expect(html).toContain("Jour 3 – Mise en page");
  // En-têtes en <thead>/<th> (répétés à chaque page du PDF), blanc sur bleu posé sur la cellule
  // elle-même : le td{color} du thème ne peut plus les assombrir.
  expect((html.match(/<thead><tr><th style="[^"]*background:#1e3a7b;color:#fff/g) || []).length).toBe(3);
  expect(html).not.toMatch(/<tr style="background:#1e3a7b[^>]*>\s*<td/);
});
