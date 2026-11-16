import { describe, it, expect } from "vitest";
import { ATTESTATION_VARIANTS, choisirDesignAttestation, renderAttestationReussite } from "@/lib/attestationReussiteDesign";

const pieces = {
  color: "#1e3a7b", orgName: "SELECT FORMATION", titre: "DE RÉUSSITE", nomComplet: "Mme Manon CAMARA",
  formationHtml: "<p>FORMATION</p>", detailsHtml: "<p>art. L.6353-1</p>", signatureHtml: "<div>SIGNATURE</div>", dateHtml: "Fait à Paris",
};

describe("attestation de réussite — design variable", () => {
  it("deux stagiaires voisins d'une même session n'ont jamais le même modèle", () => {
    for (let r = 0; r < 12; r++) {
      const a = choisirDesignAttestation("Session A", `p${r}`, r).variant.id;
      const b = choisirDesignAttestation("Session A", `p${r + 1}`, r + 1).variant.id;
      expect(a).not.toBe(b);
    }
  });
  it("un même stagiaire garde le même modèle d'un export à l'autre", () => {
    expect(renderAttestationReussite(pieces, "S", "Manon|CAMARA", 3)).toBe(renderAttestationReussite(pieces, "S", "Manon|CAMARA", 3));
  });
  it("chaque modèle garde tout le contenu de l'attestation", () => {
    for (const v of ATTESTATION_VARIANTS) {
      const html = v.render(pieces, "intro", "#b8962e");
      for (const t of ["Mme Manon CAMARA", "DE RÉUSSITE", "L.6353-1", "SIGNATURE", "Fait à Paris", "FORMATION"]) expect(html.toLowerCase()).toContain(t.toLowerCase());
    }
  });
});
