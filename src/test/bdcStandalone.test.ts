import { describe, it, expect, vi } from "vitest";
import { emptyBdcData } from "@/lib/bdc/standaloneTypes";
import { validateStandaloneBdc, generateStandaloneBdcPlanning, standaloneBdcContext, bdcFollowupDate, bdcIsFinished } from "@/lib/bdc/standaloneModel";
import { BDC_STANDALONE_DOCUMENTS, buildStandaloneBdcDocument, bdcDocumentTitle } from "@/lib/bdc/standaloneDocuments";
import { readBdcHistory, writeBdcHistory, BDC_HISTORY_KEY } from "@/lib/bdc/standaloneHistory";
import { exportStandaloneBdcZip } from "@/lib/bdc/standaloneExport";
import JSZip from "jszip";

vi.mock("@/lib/pdfExport", () => ({ getActivePdfOptions: () => ({}), htmlToPdfBlob: async (html: string) => new Blob([html], { type: "application/pdf" }) }));
vi.mock("@/lib/wordExport", () => ({ htmlToWordBlob: async (html: string) => new Blob([html], { type: "application/msword" }) }));

function dossier() {
  const d = emptyBdcData();
  Object.assign(d.organisme, { nom: "ORGANISME TEST", adresse: "1 rue Test", codePostal: "75001", ville: "Paris", siret: "12345678901234", dirigeant: "Responsable Test", email: "contact@example.test", nda: "12345678901", dateMaj: "2026-10-19" });
  Object.assign(d.formation, { formateur: "Consultant Test", duree: "22", tarif: "1990", dateDebut: "2026-02-10", dateFin: "2026-04-17" });
  Object.assign(d.beneficiaire, { prenom: "Personne", nom: "TEST", email: "personne@example.test" });
  d.dateEntretien = "2026-01-12"; d.dateSignature = "2026-01-20";
  d.sessions = generateStandaloneBdcPlanning(d);
  return d;
}

describe("Générateur autonome Bilan de compétences", () => {
  it("couvre exactement les 18 pièces demandées", () => {
    expect(BDC_STANDALONE_DOCUMENTS.map(d => d.id)).toEqual(["besoins", "devis", "entretien", "programme", "contrat", "planning", "accueil", "parcours", "competences", "motivations", "metiers", "carnet", "emargement", "seances", "planAction", "synthese", "satisfaction", "suivi"]);
  });
  it("préserve 22 heures sur les trois phases du planning", () => {
    const d = dossier();
    expect(validateStandaloneBdc(d)).toEqual([]);
    expect(d.sessions.reduce((sum, s) => sum + s.duree, 0)).toBe(22);
    expect(new Set(d.sessions.map(s => s.phase))).toEqual(new Set([1, 2, 3]));
    expect(d.sessions.every(s => s.date >= "2026-02-10" && s.date <= "2026-04-17")).toBe(true);
    expect(d.sessions.every(s => s.presence === false && s.compteRendu === "")).toBe(true);
  });
  it("bloque au-delà de 24 heures au lieu de réduire silencieusement", () => {
    const d = dossier(); d.formation.duree = "25";
    expect(validateStandaloneBdc(d).some(v => v.includes("24 heures"))).toBe(true);
    expect(() => generateStandaloneBdcPlanning(d)).toThrow();
  });
  it("alterne les modalités du planning mixte sans modifier ses heures", () => {
    const d = dossier(); d.formation.modalites = "Mixte";
    const sessions = generateStandaloneBdcPlanning(d);
    expect(sessions.map(s => s.modalite)).toEqual(sessions.map((_, i) => i % 2 ? "distanciel" : "presentiel"));
    expect(sessions.reduce((sum, s) => sum + s.duree, 0)).toBe(22);
  });
  it("sans entreprise produit un contrat même avec OPCO", () => {
    const d = dossier(); d.beneficiaire.financeur = "OPCO";
    expect(standaloneBdcContext(d).prestation.origineDemande).toBe("beneficiaire");
    expect(bdcDocumentTitle("contrat", d)).toBe("Contrat de prestation de bilan de compétences");
  });
  it("avec entreprise produit une convention même en financement personnel", () => {
    const d = dossier(); d.beneficiaire.entreprise = "Entreprise TEST";
    expect(standaloneBdcContext(d).prestation.origineDemande).toBe("employeur");
    expect(bdcDocumentTitle("contrat", d)).toBe("Convention tripartite de bilan de compétences");
    expect(validateStandaloneBdc(d).some(e => e.includes("représentant de l’entreprise"))).toBe(true);
  });
  it("les dates et le prix individuels priment", () => {
    const d = dossier(); Object.assign(d.beneficiaire, { dateDebutFormation: "2026-03-02", dateFinFormation: "2026-05-29", tarifFormation: "1500" });
    const p = standaloneBdcContext(d).prestation;
    expect(p.dateDebut.getMonth()).toBe(2); expect(p.dateFin.getMonth()).toBe(4); expect(p.prixHT).toBe(1500);
  });
  it("calcule le suivi à six mois sans débordement de fin de mois", () => {
    const d = dossier(); d.beneficiaire.dateFinFormation = "2026-08-31";
    const date = bdcFollowupDate(d);
    expect(date?.getFullYear()).toBe(2027); expect(date?.getMonth()).toBe(1); expect(date?.getDate()).toBe(28);
  });
  it("ne considère pas le dernier jour encore en cours comme terminé", () => {
    const d = dossier(); expect(bdcIsFinished(d, new Date("2026-04-17T12:00:00"))).toBe(false);
    expect(bdcIsFinished(d, new Date("2026-04-18T12:00:00"))).toBe(true);
  });
  it("ne restitue pas les conclusions ou satisfactions avant la fin", () => {
    const d = dossier(); d.beneficiaire.dateFinFormation = "2099-12-31"; d.declarations.synthese = "SECRET_FINAL_RESULT"; d.declarations.satisfaction = "SECRET_SCORE";
    expect(buildStandaloneBdcDocument(d, "synthese")).not.toContain("SECRET_FINAL_RESULT");
    expect(buildStandaloneBdcDocument(d, "satisfaction")).not.toContain("SECRET_SCORE");
  });
  it("rejette le planning incohérent et ses chevauchements", () => {
    const d = dossier(); d.sessions[1] = { ...d.sessions[0], numero: 2 };
    expect(validateStandaloneBdc(d).some(e => e.includes("chevauchement"))).toBe(true);
    d.sessions[0].heureFin = "23:00";
    expect(validateStandaloneBdc(d).some(e => e.includes("horaires"))).toBe(true);
  });
  it("ne transforme pas les champs déclaratifs absents en un profil inventé", () => {
    const d = dossier(), b = standaloneBdcContext(d).beneficiaires[0];
    expect(b.niveauEtudes).toBe(""); expect(b.profil.attente).toBe(""); expect(b.profil.projet).toBe("");
  });
  it("conserve l’historique séparément et recharge toutes les déclarations", () => {
    const d = dossier(); d.declarations.parcours = "PARCOURS_SAISI";
    const map = new Map<string, string>();
    const storage = { getItem: (key: string) => map.get(key) || null, setItem: (key: string, value: string) => { map.set(key, value); } };
    writeBdcHistory([{ id: "bdc-test", name: "Dossier", updatedAt: "2026-10-19", data: d }], storage);
    expect(map.has(BDC_HISTORY_KEY)).toBe(true);
    expect(readBdcHistory(storage)[0].data.declarations.parcours).toBe("PARCOURS_SAISI");
    expect(readBdcHistory(storage)[0].data.sessions).toEqual(d.sessions);
  });
  it("le ZIP respecte la sélection et l’extension réelle Word", async () => {
    const blob = await exportStandaloneBdcZip(dossier(), "word", () => {}, ["besoins", "programme"]);
    const buffer = await new Promise<ArrayBuffer>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result as ArrayBuffer); reader.onerror = reject; reader.readAsArrayBuffer(blob); });
    const zip = await JSZip.loadAsync(buffer);
    const names = Object.keys(zip.files);
    expect(names).toHaveLength(2);
    expect(names.every(name => name.endsWith(".doc"))).toBe(true);
  });
});