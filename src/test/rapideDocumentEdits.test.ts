import { describe, it, expect } from "vitest";
import { rapideDocumentEditKey, resolveRapideDocument, sanitizeRapideDocument } from "@/lib/rapideDocumentEdits";
import type { FormationInfo, StagiaireInfo } from "@/types/qualiopi";

const person = (nom: string): StagiaireInfo => ({ civilite: "", nom, prenom: "Test", email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "" });
describe("Corrections du pack rapide", () => {
  it("reprend la correction après sauvegarde et rechargement plutôt que la régénération", () => {
    const key = rapideDocumentEditKey("programme", "actions-formation");
    const formation = JSON.parse(JSON.stringify({ rapideDocumentEdits: { [key]: "<html><head></head><body><p>Durée corrigée : 21 heures</p></body></html>" } })) as FormationInfo;
    const result = resolveRapideDocument(formation, key, () => "Durée : 35 heures");
    expect(result).toContain("Durée corrigée : 21 heures");
    expect(result).not.toContain("35 heures");
  });
  it("ne transfère pas une correction à une autre personne ou type d'action", () => {
    expect(rapideDocumentEditKey("contrat", "vae", [person("A")])).not.toBe(rapideDocumentEditKey("contrat", "vae", [person("B")]));
    expect(rapideDocumentEditKey("programme", "vae")).not.toBe(rapideDocumentEditKey("programme", "bilans-competences"));
  });
  it("conserve l'identité après réorganisation des destinataires", () => {
    expect(rapideDocumentEditKey("devis", "vae", [person("A"), person("B")])).toBe(rapideDocumentEditKey("devis", "vae", [person("B"), person("A")]));
  });
  it("préserve styles et tampon mais retire le contenu actif", () => {
    const html = sanitizeRapideDocument('<html><head><style>p {font-weight:bold}</style></head><body contenteditable="true"><img src="data:image/png;base64,AAAA" onerror="alert(1)"><script>alert(1)</script><p>Correction</p></body></html>');
    expect(html).toContain("<style>"); expect(html).toContain("data:image/png");
    expect(html).not.toMatch(/onerror|<script|contenteditable/);
  });
});