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

const QUESTION_ENTREPRISE = "Quel dispositif de financement est mobilisé par l'entreprise";
const QUESTION_BUDGET = "Quel budget avez-vous prévu";

/** Réponse donnée à la question « financement » de la trame IND 4 d'un stagiaire. */
function reponseFinancement(html: string): string {
  const q = [QUESTION_ENTREPRISE, QUESTION_BUDGET].find((x) => html.includes(x));
  if (!q) throw new Error("question de financement introuvable dans la trame");
  const apres = html.slice(html.indexOf(q));
  const m = apres.match(/<td[^>]*>([\s\S]*?)<\/td>/i);
  if (!m) throw new Error("cellule de réponse introuvable");
  return m[1].replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

const trame = (si: number, stagiaires = STAGIAIRES_TEST) =>
  generateDocumentById(
    `af_c2i4_trame_eval_besoins_${si}`, "trame_eval_besoins_combine", { stagiaireIdx: si },
    ORG_TEST, FORMATIONS_TEST["actions-formation"], stagiaires,
  );

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

describe("question « budget » de la trame IND 4", () => {
  const avecEntreprise = trame(0); // ALPHA : Société Alpha, financeur saisi « CPF »
  const sansEntreprise = trame(2); // CHARLIE : aucune entreprise

  it("propose l'OPCO à un stagiaire avec entreprise, malgré un financeur « CPF » saisi", () => {
    expect(avecEntreprise).toContain(QUESTION_ENTREPRISE);
    const reponse = reponseFinancement(avecEntreprise);
    expect(reponse).toContain("OPCO");
    expect(reponse).toContain("Société Alpha");
    expect(reponse).not.toContain("Financement personnel");
  });

  it("répond « Financement personnel » à un stagiaire sans entreprise", () => {
    expect(sansEntreprise).toContain(QUESTION_BUDGET);
    expect(reponseFinancement(sansEntreprise)).toBe("Financement personnel");
  });

  it("ne laisse jamais le champ financeur imposer le CPF sans entreprise", () => {
    const sansEntrepriseMaisCPF = STAGIAIRES_TEST.map((s) => ({
      ...s, entreprise: "", financeur: "CPF",
    }));
    const doc = trame(0, sansEntrepriseMaisCPF);
    expect(reponseFinancement(doc)).toBe("Financement personnel");
  });
});
