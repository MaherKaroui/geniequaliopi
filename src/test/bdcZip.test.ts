import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildBDCNTConseilsZip } from "@/lib/bdc/bdcNTConseilsZip";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";
import type { StagiaireInfo } from "@/types/qualiopi";

/** Texte brut de chaque fichier du ZIP (docx / xlsx : XML internes ; autres : texte). */
async function textesZip(blob: Blob): Promise<Record<string, string>> {
  const zip = await JSZip.loadAsync(blob as unknown as Blob);
  const out: Record<string, string> = {};
  for (const [nom, f] of Object.entries(zip.files)) {
    if (f.dir) continue;
    const data = await f.async("uint8array");
    let texte = "";
    if (/\.(docx|xlsx)$/i.test(nom)) {
      try {
        const inner = await JSZip.loadAsync(data);
        for (const [n2, f2] of Object.entries(inner.files)) {
          if (/\.xml$/i.test(n2) || /\.html?$/i.test(n2)) texte += " " + (await f2.async("string"));
        }
      } catch {
        texte = new TextDecoder().decode(data); // fichier HTML (Word / Excel)
      }
    } else {
      texte = new TextDecoder().decode(data);
    }
    out[nom] = texte.replace(/<[^>]+>/g, " ").replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ");
  }
  return out;
}

const INTERDITS = ["NT CONSEILS", "NT Conseils", "NANTERRE", "Nanterre", "ÎLE DE FRANCE", "ILE-DE-FRANCE", "évidence pro", "FORMALERTE", "Marion LAURENT", "VTest", "FONGECIF", "OPACIF", "Galaoui", "ZOCLY", "ANTTOISSE", "Pôle emploi", "Pâtisserie", "Cake Design", "détruits au terme d'un an", "[à compléter]", "undefined", "NaN"];

describe("ZIP d'audit bilan de compétences", () => {
  it("ne contient aucune donnée d'un autre organisme ni pièce hors référentiel", async () => {
    const futur: StagiaireInfo = { ...STAGIAIRES_TEST[0], nom: "DELTA", prenom: "Nora", email: "nora.delta@exemple.fr", dateDebutFormation: "2026-11-02", dateFinFormation: "2027-01-15", financeur: "Entreprise", entreprise: "Delta SAS" };
    const org = { ...ORG_TEST, typesActions: ["bilans-competences" as const] };
    const blob = await buildBDCNTConseilsZip(org, FORMATIONS_TEST["bilans-competences"], [...STAGIAIRES_TEST, futur]);
    const textes = await textesZip(blob);
    const noms = Object.keys(textes);
    expect(noms.some((n) => /00_CONTROLE/.test(n))).toBe(false);
    expect(noms.some((n) => /Indicateur_8\//.test(n))).toBe(false);
    for (const ind of [1, 2, 4, 5, 6, 9, 10, 11, 12, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32]) {
      expect(noms.some((n) => new RegExp(`/Indicateur_${ind}/`).test(n)), `IND ${ind} couvert`).toBe(true);
    }
    const fuites: string[] = [];
    for (const [nom, t] of Object.entries(textes)) {
      for (const x of INTERDITS) if (t.includes(x)) fuites.push(`${nom} → ${x}`);
    }
    expect(fuites).toEqual([]);
    // Bilan futur : synthèse non rédigée, questionnaire à chaud vierge
    const synthFutur = noms.find((n) => /Nora DELTA\/.*Document de synthèse/.test(n));
    expect(synthFutur).toBeTruthy();
    expect(textes[synthFutur!]).toMatch(/Bilan en cours/);
    // Convention tripartite pour un financement entreprise, contrat pour le CPF
    const convFutur = noms.find((n) => /Nora DELTA\/.*Convention de prestation/.test(n))!;
    expect(textes[convFutur]).toMatch(/CONVENTION TRIPARTITE/);
    const convCpf = noms.find((n) => /Claire ALPHA\/.*Convention de prestation/.test(n))!;
    expect(textes[convCpf]).toMatch(/CONTRAT DE PRESTATION/);
  }, 600_000);

  it("réserve le support de cours au profil Pâtisserie", async () => {
    const org = { ...ORG_TEST, typesActions: ["bilans-competences" as const] };
    const blob = await buildBDCNTConseilsZip(org, { ...FORMATIONS_TEST["bilans-competences"], intitule: "Bilan de compétences — Pâtisserie & Cake Design" }, STAGIAIRES_TEST.slice(0, 1));
    const noms = Object.keys(await textesZip(blob));
    expect(noms.some((n) => /Support de cours/i.test(n))).toBe(true);
  }, 600_000);
});
