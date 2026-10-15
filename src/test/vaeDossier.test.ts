import { describe, it, expect } from "vitest";
import { getFullCatalog, generateDocumentById } from "@/lib/documentGenerator";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";
import { calendrierVAE, heuresVAE, certifVAE } from "@/lib/vae/vaeProfil";
import { isRNCPActif } from "@/lib/rncpData";
import type { StagiaireInfo } from "@/types/qualiopi";

const org = { ...ORG_TEST, typesActions: ["vae" as const] };
const texte = (h: string) => h.replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/data:[^"')\s]+/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

function dossier(formation = FORMATIONS_TEST.vae, stagiaires: StagiaireInfo[] = STAGIAIRES_TEST) {
  const cat = getFullCatalog(org, formation, stagiaires);
  return cat.map((d) => ({ d, t: texte(generateDocumentById(d.id, d.template, d.params, org, formation, stagiaires) || "") }));
}

describe("dossier VAE", () => {
  it("couvre les indicateurs applicables à la VAE et aucun indicateur non applicable", () => {
    const catalogue = getFullCatalog(org, FORMATIONS_TEST.vae, STAGIAIRES_TEST);
    expect(catalogue.some((d) => d.template === "indicateur_non_applicable")).toBe(false);
    const inds = new Set(catalogue.map((d) => d.indicateur));
    for (const i of [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32]) expect(inds.has(i), `IND ${i}`).toBe(true);
    for (const i of [7, 8, 13, 14, 15, 20, 28, 29, 33]) expect(inds.has(i), `IND ${i}`).toBe(false);
  });

  it("n'emploie plus la terminologie ni les références périmées et ne simule ni signature ni trace technique", () => {
    for (const { d, t } of dossier()) {
      expect(t, d.id).not.toMatch(/Livret [12]\b|au moins 1 an|1 607 heures|RNCP31041|francevae\.fr|P[ôo]le emploi|L'6423|\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
      // Les pièces communes 2026 (qualite2026.ts) signent via docBuilder, hors périmètre VAE.
      if (!/registre_sous_traitance|clauses_qualite|analyse_risques/.test(d.template)) expect(t, d.id).not.toMatch(/Signé par/);
      expect(t, d.id).not.toMatch(/Certificateur : ATELIER CONTROLE QUALITE/);
    }
  });

  it("ne produit aucune pièce au nom du certificateur", () => {
    for (const { d, t } of dossier()) {
      expect(t, d.id).not.toMatch(/PROCÈS-VERBAL DE JURY|NOTIFICATION DE DÉCISION|CONVOCATION (AU|DEVANT LE) JURY/);
    }
  });

  it("calendrier unique : total = durée, jours ouvrés, bornés par les dates du candidat", () => {
    const f = FORMATIONS_TEST.vae;
    const cal = calendrierVAE(STAGIAIRES_TEST[0], f);
    expect(cal.reduce((a, x) => a + x.duree, 0)).toBe(heuresVAE(f));
    for (const x of cal) {
      expect([0, 6]).not.toContain(x.date.getDay());
      expect(x.date.getTime()).toBeGreaterThanOrEqual(new Date(2026, 1, 2).getTime());
      expect(x.date.getTime()).toBeLessThanOrEqual(new Date(2026, 5, 26).getTime());
    }
  });

  it("une session future n'est jamais présentée comme réalisée", () => {
    const y = new Date().getFullYear() + 1;
    const f = { ...FORMATIONS_TEST.vae, dateDebut: `${y}-02-01`, dateFin: `${y}-05-29` };
    const docs = dossier(f);
    const cert = docs.find(({ d }) => d.template === "vae_certificat_realisation")!;
    expect(cert.t).toMatch(/sera établi/);
    const em = docs.find(({ d }) => d.template === "vae_emargement")!;
    expect(em.t).not.toMatch(/Réalisée/);
    expect(em.t).toMatch(/0 heure\(s\) réalisée\(s\)/);
  });

  it("une seule pièce contractuelle, choisie selon l'entreprise (convention tripartite si entreprise)", () => {
    const docs = dossier();
    const contrats = docs.filter(({ d }) => d.template === "vae_contrat_accompagnement");
    expect(contrats).toHaveLength(STAGIAIRES_TEST.length * 2);
    for (const indicateur of [4, 9]) {
      const contratsIndicateur = contrats.filter(({ d }) => d.indicateur === indicateur);
      expect(contratsIndicateur).toHaveLength(STAGIAIRES_TEST.length);
      expect(contratsIndicateur[0].t).toMatch(/TRIPARTITE/); // ALPHA : entreprise présente → convention tripartite
      expect(contratsIndicateur[0].t).toContain("Société Alpha");
      expect(contratsIndicateur[1].t).toMatch(/TRIPARTITE/); // OPCO
      expect(contratsIndicateur[2].t).toMatch(/rétractation de 10 jours/); // sans entreprise
    }
    expect(docs.some(({ d }) => /convention_tripartite|convention_accompagnement/.test(d.template))).toBe(false);
  });

  it("sans entreprise, un financeur OPCO ne déclenche pas de convention : c'est un contrat", () => {
    const sansEntreprise = { ...STAGIAIRES_TEST[2], entreprise: "", financeur: "OPCO" };
    const docs = dossier(FORMATIONS_TEST.vae, [sansEntreprise]);
    const c9 = docs.find(({ d }) => d.template === "vae_contrat_accompagnement" && d.indicateur === 9)!;
    expect(c9.t).toMatch(/CONTRAT D'ACCOMPAGNEMENT VAE/);
    expect(c9.t).not.toMatch(/TRIPARTITE/);
    expect(c9.t).toMatch(/rétractation de 10 jours/);
    const avecEntreprise = { ...STAGIAIRES_TEST[2], entreprise: "Société Beta", financeur: "Personnel" };
    const docs2 = dossier(FORMATIONS_TEST.vae, [avecEntreprise]);
    const c9b = docs2.find(({ d }) => d.template === "vae_contrat_accompagnement" && d.indicateur === 9)!;
    expect(c9b.t).toMatch(/TRIPARTITE/);
    expect(c9b.t).toContain("Société Beta");
  });

  it("certificateur et blocs issus de la fiche RNCP", () => {
    const c = certifVAE(FORMATIONS_TEST.vae);
    expect(c.certificateur).toMatch(/Éducation nationale/);
    expect(c.blocs.map((b) => b.code)).toEqual(["RNCP39030BC01", "RNCP39030BC02", "RNCP39030BC03", "RNCP39030BC04", "RNCP39030BC05", "RNCP39030BC06", "RNCP39030BC07", "RNCP39030BC08"]);
    expect(isRNCPActif("RNCP31041")).toBe(false);
    expect(isRNCPActif("RNCP39030", new Date(2026, 8, 30))).toBe(true);
  });

  it("dates au format jj/mm/aaaa acceptées sans erreur", () => {
    const f = { ...FORMATIONS_TEST.vae, dateDebut: "02/02/2026", dateFin: "26/06/2026" };
    const docs = dossier(f);
    for (const { d, t } of docs) expect(t, d.id).not.toMatch(/NaN|Invalid Date|undefined/);
  });
});
