import { describe, it, expect } from "vitest";
import { buildBdcContext, prestationFor, seancesFor, repartitionHeures } from "@/lib/bdc/bdcModel";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";
import { estJourFormation } from "@/lib/joursFeries";

describe("planning BC par bénéficiaire", () => {
  it("dates propres, heures conformes à la répartition unique, aucun jour férié", () => {
    const futur = { ...STAGIAIRES_TEST[0], nom: "DELTA", prenom: "Nora", email: "n@d.fr", dateDebutFormation: "2026-11-02", dateFinFormation: "2027-01-15", financeur: "Entreprise", entreprise: "Delta SAS" };
    const ctx = buildBdcContext({ ...ORG_TEST, typesActions: ["bilans-competences"] }, FORMATIONS_TEST["bilans-competences"], [...STAGIAIRES_TEST, futur]);
    for (const b of ctx.beneficiaires) {
      const p = prestationFor(ctx, b);
      const s = seancesFor(ctx, b);
      const rh = repartitionHeures(p.dureeTotaleH);
      const parPhase = [1, 2, 3].map((ph) => s.filter((x) => x.phase === ph).reduce((a, x) => a + x.duree, 0));
      expect(parPhase).toEqual([rh.p1, rh.p2, rh.p3]);
      for (const x of s) {
        expect(x.date >= p.dateDebut && x.date <= p.dateFin, `${b.nom} ${x.date.toISOString()}`).toBe(true);
        expect(estJourFormation(x.date, p.dateDebut, p.dateFin), `${b.nom} férié ${x.date.toDateString()}`).toBe(true);
      }
    }
    const nora = ctx.beneficiaires.find((b) => b.nom === "DELTA")!;
    expect(prestationFor(ctx, nora).origineDemande).toBe("employeur");
    expect(prestationFor(ctx, nora).dateDebut.getFullYear()).toBe(2026);
    expect(prestationFor(ctx, nora).dateDebut.getMonth()).toBe(10);
  });
});
