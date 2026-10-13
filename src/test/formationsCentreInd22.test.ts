import { describe, expect, it } from "vitest";
import { planDevActions } from "@/lib/templatesCritere5";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

describe("formations du centre IND 22", () => {
  it.each(["actions-formation", "apprentissage", "vae", "bilans-competences"] as const)("inclut les deux actions et projets pour %s", (type) => {
    const o = { ...ORG_TEST, typesActions: [type] };
    const f = FORMATIONS_TEST[type];
    const actions = planDevActions(o, f, [], STAGIAIRES_TEST);
    for (const nom of ["Gérer son centre", "Automatisation Make et Airtable"]) {
      const action = actions.find((a) => a.nom === nom);
      expect(action?.prestataire).toBe("IZIBUSINESS — Nadine DENDANI");
      expect(action?.periode).toBe("Dates effectives à confirmer");
      expect(action?.duree).toBe("À confirmer sur l’attestation");
    }
    const pieces = getFullCatalog(o, f, STAGIAIRES_TEST).filter((d) => d.template === "projet_attestation_centre_ind22");
    expect(pieces.map((d) => d.params?.formationId).sort()).toEqual(["gestion_centre", "make_airtable"]);
    expect(pieces.every((d) => d.critere === 5 && d.indicateur === 22)).toBe(true);
    for (const piece of pieces) {
      const html = generateDocumentById(piece.id, piece.template, piece.params, o, f, STAGIAIRES_TEST);
      expect(html).not.toContain("izibusiness_tampon");
      expect(html).not.toContain("signatureUrl");
    }
  });
});