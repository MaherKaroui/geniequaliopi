import { describe, it, expect } from "vitest";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const texte = (h: string) => h.replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const SIG = "data:image/png;base64,SIGDIRIGEANT", TAMPON = "data:image/png;base64,TAMPONORG";
const f = FORMATIONS_TEST.vae;
const o = { ...ORG_TEST, typesActions: ["vae" as const], typeAudit: "initial" as const, referentQualite: ORG_TEST.dirigeant, signatureUrl: SIG, tamponUrl: TAMPON };
const cat = getFullCatalog(o, f, STAGIAIRES_TEST);
const doc = (tpl: string, n = 0) => {
  const d = cat.filter((x) => x.template === tpl)[n];
  expect(d, tpl).toBeTruthy();
  return generateDocumentById(d.id, d.template, d.params, o, f, STAGIAIRES_TEST);
};

describe("VAE — guide de lecture V10 et signatures", () => {
  it("pièces système visées par le dirigeant : tampon seul, jamais tampon et signature", () => {
    for (const tpl of ["vae_procedure_info", "vae_livret_accueil", "vae_reglement_interieur", "vae_plan_dev_accompagnateurs", "vae_plan_amelioration", "vae_veille_reglementaire", "vae_registre_reclamations"]) {
      const d = cat.find((x) => x.template === tpl);
      if (!d) continue;
      const h = generateDocumentById(d.id, d.template, d.params, o, f, STAGIAIRES_TEST);
      expect(h, tpl).toContain(TAMPON);
      expect(h, tpl).not.toContain(SIG);
    }
  });

  it("accompagnateur = dirigeant sans signature propre : son tampon, à défaut sa signature", () => {
    const fSans = { ...f, formateur: o.dirigeant, formateurSignatureUrl: "" };
    const d = cat.find((x) => x.template === "vae_fiche_suivi_individuel")!;
    expect(generateDocumentById(d.id, d.template, d.params, o, fSans, STAGIAIRES_TEST)).toContain(TAMPON);
    const sansTampon = { ...o, tamponUrl: "" };
    expect(generateDocumentById(d.id, d.template, d.params, sansTampon, fSans, STAGIAIRES_TEST)).toContain(SIG);
  });

  it("IND 12 : procédure violences rappelée au livret d'accueil, au règlement intérieur et à la procédure de réclamation", () => {
    for (const tpl of ["vae_livret_accueil", "vae_reglement_interieur"]) expect(texte(doc(tpl))).toMatch(/référent chargé des signalements/);
    const rec = cat.find((x) => /reclamation/.test(x.template) && /procedure/.test(x.template));
    if (rec) expect(texte(generateDocumentById(rec.id, rec.template, rec.params, o, f, STAGIAIRES_TEST))).toMatch(/registre des signalements/);
  });

  it("IND 22 et 32 : formation VSS au plan de développement, pièces V10 au tableau d'amélioration", () => {
    expect(texte(doc("vae_plan_dev_accompagnateurs"))).toMatch(/violences sexistes et sexuelles/);
    expect(texte(doc("vae_plan_amelioration"))).toMatch(/Audit interne \(IND 32\)/);
  });

  it("droit à l'image : une autorisation par candidat, nominative", () => {
    expect(cat.filter((x) => x.template === "vae_droit_image")).toHaveLength(STAGIAIRES_TEST.length);
    expect(texte(doc("vae_droit_image", 1))).toMatch(/Julien BRAVO/);
  });

  it("pièces V10 sans blancs à remplir ; suivi des heures VAE tiré du calendrier des séances", () => {
    for (const tpl of ["v10_note_veille", "v10_audit_interne", "v10_suivi_heures"]) expect(texte(doc(tpl)), tpl).not.toMatch(/_{4,}/);
    const h = texte(doc("v10_suivi_heures"));
    expect(h).not.toMatch(/À reporter depuis les émargements/);
    expect(h).toMatch(/Claire ALPHA/);
  });
});

describe("VAE — dossier aussi complet que le dossier AF", () => {
  it("pièces communes AF reprises (IND 21, 22, 23, 26, 30, 31, 32), au vocabulaire VAE", () => {
    for (const tpl of ["procedure_recrutement_formateur", "fiche_entretien_annuel_formateur", "procedure_veille_exploitee", "cr_exploitation_veille", "preuves_veille_reglementaire", "veille_sourcee", "relances_appreciations_excel", "procedure_relance_appreciations", "formulaire_reclamation", "suivi_dysfonctionnements_excel", "procedure_amelioration_continue"]) {
      const d = cat.find((x) => x.template === tpl);
      expect(d, tpl).toBeTruthy();
      if (/_excel$/.test(tpl)) continue;
      const h = texte(generateDocumentById(d!.id, d!.template, d!.params, o, f, STAGIAIRES_TEST));
      expect(h.length, tpl).toBeGreaterThan(300);
      expect(h, tpl).not.toMatch(/\bstagiaires?\b|\bformateurs?\b/i);
    }
  });
});
