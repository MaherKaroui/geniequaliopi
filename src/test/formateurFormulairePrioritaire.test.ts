import { describe, expect, it } from "vitest";
import { generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const formation = { ...FORMATIONS_TEST.vae, typeAction: "actions-formation" as const,
  dateDebut: "2026-03-02", dateFin: "2026-03-06" };
const stagiaire = { ...STAGIAIRES_TEST[0], formateur: "Philippe Martin",
  dateDebutFormation: "2026-03-02", dateFinFormation: "2026-03-06" };

describe("formateur du formulaire Formation", () => {
  it("la feuille d'émargement reprend le formateur saisi, pas celui rattaché au stagiaire", () => {
    const html = generateDocumentById("emarg", "emargement_stagiaire", { stagiaireIdx: 0 },
      ORG_TEST, { ...formation, formateur: "Karim BENALI" }, [stagiaire]);
    expect(html).toContain("Karim BENALI");
    expect(html).not.toContain("Philippe Martin");
  });

  it("sans formateur saisi, le formateur du stagiaire reste utilisé", () => {
    const html = generateDocumentById("emarg", "emargement_stagiaire", { stagiaireIdx: 0 },
      ORG_TEST, { ...formation, formateur: "" }, [stagiaire]);
    expect(html).toContain("Philippe Martin");
  });
});
