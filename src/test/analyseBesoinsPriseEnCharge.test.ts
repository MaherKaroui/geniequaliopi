import { describe, expect, it } from "vitest";
import { generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

/** Renvoie la cellule « Prise en charge » (4e colonne) de la ligne d'un stagiaire. */
function priseEnCharge(html: string, nom: string): string {
  const ligne = html
    .split(/<tr[^>]*>/i)
    .find((r) => r.includes(nom));
  if (!ligne) throw new Error(`ligne introuvable pour ${nom}`);
  const cells = [...ligne.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim(),
  );
  return cells[3] ?? "";
}

describe("prise en charge de l'analyse des besoins (IND 4)", () => {
  const formation = FORMATIONS_TEST["actions-formation"];

  const html = generateDocumentById(
    "analyse_besoin", "analyse_besoin", { fi: 0 }, ORG_TEST, formation, STAGIAIRES_TEST,
  );

  it("attribue l'OPCO à un stagiaire avec entreprise", () => {
    expect(priseEnCharge(html, "ALPHA")).toBe("OPCO");
    expect(priseEnCharge(html, "BRAVO")).toBe("OPCO");
  });

  it("attribue le financement personnel à un stagiaire sans entreprise", () => {
    expect(priseEnCharge(html, "CHARLIE")).toBe("Financement personnel");
  });

  it("traite une entreprise vide ou en blancs comme sans entreprise", () => {
    const sansEntreprise = STAGIAIRES_TEST.map((s) => ({ ...s, entreprise: "   " }));
    const doc = generateDocumentById(
      "analyse_besoin", "analyse_besoin", { fi: 0 }, ORG_TEST, formation, sansEntreprise,
    );
    expect(priseEnCharge(doc, "ALPHA")).toBe("Financement personnel");
  });
});
