import { describe, expect, it } from "vitest";
import { getFullCatalog } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const org = { ...ORG_TEST, typesActions: ["actions-formation" as const] };
const formation = FORMATIONS_TEST["actions-formation"];

describe("IND 22 — attestations de formation continue", () => {
  it("ne produit plus la pièce « ATTESTATIONS DE FORMATION CONTINUE (à joindre) »", () => {
    const catalog = getFullCatalog(org, formation, STAGIAIRES_TEST);
    const attestations = catalog.filter((d) => d.critere === 5 && d.indicateur === 22
      && /ATTESTATIONS DE FORMATION CONTINUE/i.test(d.nom));
    expect(attestations).toHaveLength(0);
  });

  it("conserve les autres pièces IND 22", () => {
    const catalog = getFullCatalog(org, formation, STAGIAIRES_TEST);
    const noms = catalog.filter((d) => d.critere === 5 && d.indicateur === 22).map((d) => d.nom);
    expect(noms.some((n) => /PLAN DE DÉVELOPPEMENT DES COMPÉTENCES/i.test(n))).toBe(true);
    expect(noms.some((n) => /ATTESTATION DE FORMATION \(IZIBUSINESS\)/i.test(n))).toBe(true);
    expect(noms.some((n) => /FICHE D'ENTRETIEN ANNUEL/i.test(n))).toBe(true);
  });
});
