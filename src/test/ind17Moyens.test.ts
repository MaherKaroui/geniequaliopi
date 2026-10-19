import { describe, expect, it } from "vitest";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const org = { ...ORG_TEST, typesActions: ["actions-formation" as const] };
const formation = FORMATIONS_TEST["actions-formation"];

describe("IND 17 — moyens et environnement", () => {
  it("ne produit plus la pièce « JUSTIFICATIFS DES OUTILS ET LICENCES »", () => {
    const catalog = getFullCatalog(org, formation, STAGIAIRES_TEST);
    const outils = catalog.filter((d) => d.critere === 4 && d.indicateur === 17
      && /JUSTIFICATIFS DES OUTILS/i.test(d.titre));
    expect(outils).toHaveLength(0);
  });

  it("déscriptif des moyens : une seule signature, le dirigeant avec son tampon", () => {
    const piece = getFullCatalog(org, formation, STAGIAIRES_TEST)
      .find((d) => d.template === "moyens_environnement_af");
    if (!piece) throw new Error("Descriptif des moyens absent du catalogue");
    const html = generateDocumentById(piece.id, piece.template, piece.params, org, formation, STAGIAIRES_TEST);
    expect(html).toContain("signature-block-1");
    expect(html).toContain("Le dirigeant");
    expect(html.match(/class="sig-box"/g)).toHaveLength(1);
    expect(html).not.toContain("Le responsable pédagogique");
  });

  it("avec un tampon enregistré, c'est le tampon qui apparaît sous le dirigeant", () => {
    const orgTampon = { ...org, tamponUrl: "/images/tampon-test.png" };
    const piece = getFullCatalog(orgTampon, formation, STAGIAIRES_TEST)
      .find((d) => d.template === "moyens_environnement_af");
    if (!piece) throw new Error("Descriptif des moyens absent du catalogue");
    const html = generateDocumentById(piece.id, piece.template, piece.params, orgTampon, formation, STAGIAIRES_TEST);
    expect(html).toContain('src="/images/tampon-test.png"');
    expect(html).toContain('alt="Tampon"');
  });
});
