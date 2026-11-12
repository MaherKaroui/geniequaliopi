import { describe, it, expect } from "vitest";
import { resolveFormation, actualiserFormation } from "@/lib/formationResolue";
import { FORMATIONS_TEST } from "./dossierAudit.harness";

const ANCIENNE = {
  ...FORMATIONS_TEST.vae,
  intitule: "Accompagnement VAE – CAP Esthétique Cosmétique Parfumerie (RNCP39030)",
  codeRNCP: "RNCP39030",
  objectifs: "Constituer le livret 1 de recevabilité, rédiger le livret 2 en lien avec le référentiel RNCP31041.",
  prerequis: "Justifier d'au moins 1 an d'expérience (1 607 heures) en rapport direct avec la certification visée.",
  programme: "(6h) : aide à la constitution du livret 1 (recevabilité)\n(8h) : Rédaction approfondie du livret 2",
  moyensPedagogiques: "Référentiel RNCP31041 complet, modèles de livrets 1 et 2 (Cerfa 12818*02)",
};

describe("VAE — textes de formation mis à jour à la génération", () => {
  it("code RNCP périmé remplacé, terminologie de la réforme, aucune durée minimale", () => {
    const f = resolveFormation(ANCIENNE, { typesActions: ["vae"] });
    const tout = [f.objectifs, f.prerequis, f.programme, f.moyensPedagogiques].join(" ");
    expect(tout).not.toMatch(/RNCP31041|[Ll]ivrets? [12]|1 ?607|au moins 1 an|Cerfa/);
    expect(f.objectifs).toMatch(/dossier de faisabilité/);
    expect(f.objectifs).toMatch(/dossier de validation en lien avec le référentiel RNCP39030/);
    expect(f.prerequis).toMatch(/^Justifier d'une expérience en rapport direct/);
    expect(f.prerequis).toMatch(/Aucune durée minimale/);
    expect(f.moyensPedagogiques).toBe("Référentiel RNCP39030 complet, modèles de dossiers de faisabilité et de validation");
  });

  it("hors VAE : seul le code RNCP périmé est remplacé", () => {
    const f = actualiserFormation({ ...ANCIENNE, objectifs: "Préparer le livret 2 du RNCP31041" }, false);
    expect(f.objectifs).toBe("Préparer le livret 2 du RNCP39030");
  });
});
