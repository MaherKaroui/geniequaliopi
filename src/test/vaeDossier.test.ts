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

  it("une seule pièce contractuelle par candidat (indicateur 4, format NEO VOIE), choisie selon le financeur", () => {
    const docs = dossier();
    const contrats = docs.filter(({ d }) => d.template === "vae_contrat_accompagnement" && typeof d.params?.stagiaireIdx === "number");
    expect(contrats).toHaveLength(STAGIAIRES_TEST.length);
    expect(contrats.every(({ d }) => d.indicateur === 4 && d.params?.fichier === "CONTRAT_ACCOMPAGNEMENT_VAE")).toBe(true);
    expect(contrats[0].t).toMatch(/Mon Compte Formation/); // CPF
    expect(contrats[1].t).toMatch(/TRIPARTITE/); // OPCO
    expect(contrats[2].t).toMatch(/rétractation de 10 jours/); // personnel
    expect(docs.filter(({ d }) => d.template === "vae_contrat_accompagnement" && d.params?.trame)).toHaveLength(1);
    expect(docs.some(({ d }) => /convention_tripartite|convention_accompagnement/.test(d.template))).toBe(false);
  });

  it("arborescence NEO VOIE : noms imposés, trames à la racine de l'indicateur, pilotage dans QUALIOPI", () => {
    const cat = getFullCatalog(org, FORMATIONS_TEST.vae, STAGIAIRES_TEST);
    const vae = cat.filter((d) => d.id.startsWith("vae_"));
    expect(vae.every((d) => typeof d.params?.fichier === "string" && /^[A-Z0-9_]+$/.test(d.params.fichier))).toBe(true);
    for (const d of vae.filter((x) => x.params?.trame)) {
      expect(d.params?.fichier).toMatch(/^TRAME_/);
      expect(d.params?.stagiaireIdx).toBeUndefined();
    }
    expect(vae.filter((d) => d.params?.racine === "QUALIOPI").map((d) => d.params?.fichier).sort()).toEqual(
      ["NOTE_POSITION_NOUVEL_ENTRANT_VAE", "NOTICE_UTILISATION_TRAMES_VAE", "SOMMAIRE_DU_DOSSIER", "TABLEAU_APPLICABILITE_INDICATEURS_VAE"]);
    const f = (n: string) => vae.find((d) => d.params?.fichier === n)!;
    expect([f("MAIL_TYPE_SUIVI_POST_JURY").indicateur, f("MAIL_TYPE_CONDITIONS_PRESENTATION_CERTIFICATION").indicateur]).toEqual([16, 16]);
    expect(f("TRAME_ENTRETIEN_FAISABILITE_VAE").indicateur).toBe(4);
    expect(f("CV_CANDIDAT_ORIENTE_CERTIFICATION").indicateur).toBe(4);
  });

  it("CV du candidat : rien d'inventé sans expérience déclarée, rapprochement avec les blocs sinon", () => {
    const cv = (s: StagiaireInfo) => {
      const ss = [s];
      const d = getFullCatalog(org, FORMATIONS_TEST.vae, ss).find((x) => x.template === "vae_cv_candidat" && x.params?.stagiaireIdx === 0)!;
      return texte(generateDocumentById(d.id, d.template, d.params, org, FORMATIONS_TEST.vae, ss) || "");
    };
    const vide = cv(STAGIAIRES_TEST[0]);
    expect(vide).toMatch(/aucune expérience n'a encore été déclarée/);
    expect(vide).not.toMatch(/\d+ ans? d'expérience|Établie/);
    const reel = cv({ ...STAGIAIRES_TEST[0], experiences: [
      { poste: "Esthéticienne", employeur: "Institut Beauté Lumière", debut: "2019-03", fin: "2024-08", activites: "Soins esthétiques du visage et maquillage\nÉpilations sur différentes zones du corps\nConseil et vente de produits cosmétiques" },
    ] });
    expect(reel).toMatch(/Institut Beauté Lumière/);
    expect(reel).toMatch(/5 ans et 6 mois/);
    expect(reel).toMatch(/Établie/);
    expect(reel).not.toMatch(/aucune expérience n'a encore été déclarée/);
    // Métier sans lien avec la certification : le CV le montre au lieu de l'habiller.
    const sansLien = cv({ ...STAGIAIRES_TEST[0], experiences: [
      { poste: "Assistante administrative", employeur: "Société Alpha", debut: "2020-01", fin: "2024-12", activites: "Saisie des factures fournisseurs\nClassement et archivage du courrier" },
    ] });
    expect(sansLien).toMatch(/Aucune activité déclarée en rapport/);
    expect(sansLien).not.toMatch(/Établie/);
  });

  it("aucune réponse ni note n'est rédigée à la place du candidat", () => {
    for (const { d, t } of dossier()) {
      if (d.template === "vae_satisfaction") expect(t, d.id).not.toMatch(/☒/);
      if (/vae_trame_dossier_validation|vae_diagnostic_faisabilite|vae_dossier_faisabilite/.test(d.template)) expect(t, d.id).not.toMatch(/J'exerce depuis|environ \d+ ans/);
    }
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
