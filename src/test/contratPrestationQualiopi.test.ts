import { describe, expect, it } from "vitest";
import { conditionsPrestationQualiopi } from "@/lib/contratPrestationQualiopi";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST, type TypeAction } from "./dossierAudit.harness";

describe("prestation qualité FD Certif Expert", () => {
  it("reprend les cinq ans du modèle à partir de la date de MAJ", () => {
    const c = conditionsPrestationQualiopi({ ...ORG_TEST, dateMaj: "2025-12-29" });
    expect(c.dureeAnnees).toBe(5);
    expect(c.debut).toBe("2025-12-29");
    expect(c.fin).toBe("2030-12-28");
  });
  it("conserve une mise en demeure de 30 jours avant résiliation pour manquement", () => {
    expect(conditionsPrestationQualiopi(ORG_TEST).miseEnDemeureJours).toBe(30);
  });
  it("identifie le prestataire et sa représentante selon le document fourni", () => {
    const p = conditionsPrestationQualiopi(ORG_TEST).prestataire;
    expect(p.siret).toBe("98801847900010");
    expect(p.tva).toBe("FR65988018479");
    expect(p.representante).toBe("Madame Nadine Dendani");
    expect(p.signatureUrl).toBe("/images/FD_CERTIF_TAMPON.png");
  });
  for (const type of Object.keys(FORMATIONS_TEST) as TypeAction[]) {
    it(`inclut une prestation qualité distincte et générable en IND 27 pour ${type}`, () => {
      const org = { ...ORG_TEST, typesActions: [type] };
      const formation = FORMATIONS_TEST[type];
      const pieces = getFullCatalog(org, formation, STAGIAIRES_TEST).filter(d => d.template === "mandat_qualiopi");
      expect(pieces).toHaveLength(1);
      const piece = pieces[0];
      if (!piece) throw new Error("Prestation qualité absente");
      expect(piece.indicateur).toBe(27);
      expect(piece.params?.actionType).toBe(type);
      expect(conditionsPrestationQualiopi(org, piece.params?.actionType).types).toEqual([type]);
      expect(generateDocumentById(piece.id, piece.template, piece.params, org, formation, STAGIAIRES_TEST).length).toBeGreaterThan(1000);
    });
  }
  it("ne rajoute pas FD Certif Expert aux dossiers BC/VAE ayant un autre référent", () => {
    for (const type of ["bilans-competences", "vae"] as const) {
      const org = { ...ORG_TEST, typesActions: [type], referentQualite: "Paul TESTARD" };
      expect(getFullCatalog(org, FORMATIONS_TEST[type], STAGIAIRES_TEST).filter(d => d.template === "mandat_qualiopi")).toHaveLength(0);
    }
  });
});