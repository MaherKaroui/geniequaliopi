import { describe, it, expect, vi } from "vitest";

// html2canvas ne fonctionne pas sous jsdom : le rendu PDF est remplacé par le HTML source,
// ce qui permet de contrôler le contenu exact de chaque pièce PDF.
vi.mock("@/lib/pdfExport", () => ({
  htmlToPdfBlob: async (html: string) => new Blob([html], { type: "application/pdf" }),
  getActivePdfOptions: () => ({}),
}));
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
    for (const ind of [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32]) {
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

  it("produit le support de cours Manager (exercices corrigés, veille) pour le profil Manager", async () => {
    const org = { ...ORG_TEST, typesActions: ["bilans-competences" as const] };
    const blob = await buildBDCNTConseilsZip(org, { ...FORMATIONS_TEST["bilans-competences"], intitule: "Bilan de compétences – Manager : évaluer et développer ses compétences managériales" }, STAGIAIRES_TEST.slice(0, 1));
    const textes = await textesZip(blob);
    const support = Object.keys(textes).find((n) => /Support de cours Manager/i.test(n));
    expect(support).toBeTruthy();
    expect(textes[support!]).toMatch(/Corrigé 13/);
    expect(Object.keys(textes).some((n) => /Pâtisserie/i.test(n))).toBe(false);
  }, 600_000);

  it("suit l'arborescence « MMF - BDC » : PDF, remap des indicateurs, pied de page unique", async () => {
    const org = { ...ORG_TEST, typesActions: ["bilans-competences" as const] };
    const blob = await buildBDCNTConseilsZip(org, FORMATIONS_TEST["bilans-competences"], STAGIAIRES_TEST.slice(0, 2));
    const textes = await textesZip(blob);
    const noms = Object.keys(textes);
    // Toutes les pièces documentaires en PDF ; seuls les tableaux restent en .xlsx
    expect(noms.filter((n) => !/\.(pdf|xlsx)$/i.test(n) && n !== "LISEZMOI.txt")).toEqual([]);
    expect(noms.some((n) => /\.docx?$/i.test(n))).toBe(false);
    // Aucun indicateur 16 ni 28 pour le bilan
    expect(noms.some((n) => /Indicateur_(16|28)\//.test(n))).toBe(false);
    // Nommage « Indicateur N - Libellé » cohérent avec le dossier
    for (const n of noms.filter((x) => x.startsWith("Critere_"))) {
      const m = n.match(/^Critere_(\d)\/Indicateur_(\d+)\/(?:Bénéficiaire - [^/]+\/)?Indicateur (\d+) - [^/]+$/);
      expect(m, n).toBeTruthy();
      expect(m![2]).toBe(m![3]);
    }
    const attendus = [
      "Critere_1/Indicateur_1/Indicateur 1 - Process de diffusion de l'information.pdf",
      "Critere_1/Indicateur_2/Indicateur 2 - Process Suivi à 6 mois.pdf",
      "Critere_1/Indicateur_2/Bénéficiaire - Claire ALPHA/Indicateur 2 - Compte rendu de suivi à 6 mois.pdf",
      "Critere_2/Indicateur_6/Indicateur 6 - Programme des 3 phases du bilan de compétences.pdf",
      "Critere_2/Indicateur_6/Indicateur 6 - Phase 2 - Phase d'investigation.pdf",
      "Critere_2/Indicateur_8/Bénéficiaire - Claire ALPHA/Indicateur 8 - Test de positionnement.pdf",
      "Critere_3/Indicateur_9/Indicateur 9 - Process Information des publics.pdf",
      "Critere_3/Indicateur_9/Indicateur 9 - Conditions générales de vente.pdf",
      "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Convention de prestation.pdf",
      "Critere_3/Indicateur_9/Bénéficiaire - Claire ALPHA/Indicateur 9 - Accusé de réception des informations.pdf",
      "Critere_3/Indicateur_11/Bénéficiaire - Claire ALPHA/Indicateur 11 - Document de synthèse (copie anonymisée).pdf",
      "Critere_5/Indicateur_21/Indicateur 21 - Fiche de compétences du consultant.pdf",
      "Critere_6/Indicateur_24/Indicateur 24 - Réseau d'acteurs socio-économiques.pdf",
    ];
    for (const a of attendus) expect(noms, a).toContain(a);
    // Pièces collectives versées une seule fois, hors dossier bénéficiaire
    expect(noms.filter((n) => /Conditions générales de vente/.test(n))).toHaveLength(1);
    // Une seule version et une seule date de mise à jour (celle de la V1) sur chaque PDF
    for (const n of noms.filter((x) => x.endsWith(".pdf"))) {
      const t = textes[n];
      expect(t.split("Version 1 · Mise à jour du 3 février 2025").length - 1, n).toBe(1);
      expect(/V\d+ \d{1,2} \w+ \d{4}/.test(t), n).toBe(false);
    }
    // Rétractation : 14 jours partout ; conservation : trois ans au plus
    for (const [n, t] of Object.entries(textes)) {
      expect(/r[ée]tractation de (4|7|10) jours/i.test(t), n).toBe(false);
      expect(/conserv[^.]{0,80}(un|1) an/i.test(t), n).toBe(false);
    }
    // Entretien annuel = trame vierge (pas de faits inventés)
    const annuel = textes["Critere_5/Indicateur_22/Indicateur 22 - Compte rendu d'entretien annuel.pdf"];
    expect(annuel).not.toMatch(/salons|audit de surveillance|8\/10/);
  }, 600_000);

  it("n'emploie le CPF que si l'organisme est certifié Qualiopi « bilans de compétences »", async () => {
    const claire = STAGIAIRES_TEST.slice(0, 1);
    const nonCertifie = { ...ORG_TEST, typesActions: ["bilans-competences" as const] };
    const t1 = await textesZip(await buildBDCNTConseilsZip(nonCertifie, FORMATIONS_TEST["bilans-competences"], claire));
    const conv1 = Object.keys(t1).find((n) => /Claire ALPHA\/.*Convention de prestation/.test(n))!;
    expect(t1[conv1]).toMatch(/finance personnellement/);
    const certifie = { ...nonCertifie, numeroCertificatQualiopi: "TEST-001", dateObtentionQualiopi: "2025-06-01", certifications: "Actions de formation, bilans de compétences" };
    const t2 = await textesZip(await buildBDCNTConseilsZip(certifie, FORMATIONS_TEST["bilans-competences"], claire));
    const conv2 = Object.keys(t2).find((n) => /Claire ALPHA\/.*Convention de prestation/.test(n))!;
    expect(t2[conv2]).toMatch(/compte personnel de formation/i);
  }, 600_000);
});
