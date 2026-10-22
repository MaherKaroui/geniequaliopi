import { describe, it, expect, vi } from "vitest";

// html2canvas ne fonctionne pas sous jsdom : le PDF est remplacé par son HTML source.
vi.mock("@/lib/pdfExport", () => ({
  htmlToPdfBlob: async (html: string) => new Blob([html], { type: "application/pdf" }),
  getActivePdfOptions: () => ({}),
}));
import JSZip from "jszip";
import { buildBDCNexusZip } from "@/lib/bdc/nexus/bdcNexusZip";
import { planifier, heuresPhases, fmt } from "@/lib/bdc/nexus/nexusModele";
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";

const NEXUS: OrganismeInfo = {
  nom: "NEXUS FORMATION", siret: "93398977400015", adresse: "20 rue Lavoisier", codePostal: "95300", ville: "PONTOISE",
  telephone: "07 62 06 41 51", email: "nexus_formation@outlook.fr", siteWeb: "", nda: "11950917295",
  dirigeant: "ABDELLAH SALAM", responsablePedagogique: "ABDELLAH SALAM", referentHandicap: "ABDELLAH SALAM",
  referentQualite: "FD Certif Expert ( Externe )", poleAdministratif: "ABDELLAH SALAM", relationEntreprises: "ABDELLAH SALAM", referentMobilite: "ABDELLAH SALAM",
  domainesFormation: "", typesActions: ["bilans-competences"], certifications: "Actions de formation, Actions de formation par apprentissage",
  numeroCertificatQualiopi: "CW202525-3993", organismeCertificateur: "BCI France", dateObtentionQualiopi: "2025-07-25", dateFinValiditeQualiopi: "2028-07-24",
  outilsUtilises: "Google Meet", version: "1", dateMaj: "2026-01-05",
};
const MANAGER: FormationInfo = {
  intitule: "Bilan de compétences — Manager : évaluer et développer ses compétences managériales",
  objectifs: "", prerequis: "Aucun", duree: "22 heures", modalites: "distanciel", tarif: "1 990 € net de taxe",
  programme: "", methodesEvaluation: "", moyensPedagogiques: "", publicVise: "", delaiAcces: "",
  dateDebut: "2026-02-10", dateFin: "2026-04-17", lieu: "Google Meet", nombreParticipants: "1", formateur: "ABDELLAH SALAM", codeRNCP: "",
} as FormationInfo;
const LOUIS: StagiaireInfo = {
  civilite: "M.", nom: "VINCENT", prenom: "Louis", email: "louisvincent@orange.fr", telephone: "07 39 08 85 09",
  adresse: "157 rue Jean Jaurès", codePostal: "92700", commune: "Colombes", entreprise: "", poste: "",
  dateNaissance: "2002-06-22", financeur: "Personnel", dateDebutFormation: "2026-02-10", dateFinFormation: "2026-04-17",
};

async function textes(blob: Blob): Promise<Record<string, string>> {
  const zip = await JSZip.loadAsync(blob as unknown as Blob);
  const out: Record<string, string> = {};
  for (const [nom, f] of Object.entries(zip.files)) {
    if (f.dir) continue;
    out[nom.normalize("NFC")] = (await f.async("string")).replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ");
  }
  return out;
}

describe("planning NEXUS", () => {
  it("22 h = 2 / 16 / 4 h en 8 séances, du premier au dernier jour saisis", () => {
    expect(heuresPhases(22)).toEqual({ p1: 2, p2: 16, p3: 4 });
    const s = planifier(new Date(2026, 1, 10), new Date(2026, 3, 17), 22);
    expect(s.map((x) => x.duree)).toEqual([2, 3, 3, 3, 3, 4, 2, 2]);
    expect(fmt(s[0].date)).toBe("10/02/2026");
    expect(fmt(s[7].date)).toBe("17/04/2026");
    for (let i = 1; i < s.length; i++) expect(s[i].date.getTime()).toBeGreaterThan(s[i - 1].date.getTime());
    expect(s.every((x) => x.date.getDay() !== 0 && x.date.getDay() !== 6)).toBe(true);
  });
  it.each([12, 18, 24])("%i h : la somme des séances égale la durée", (h) => {
    const s = planifier(new Date(2026, 2, 2), new Date(2026, 4, 29), h);
    expect(s.reduce((a, x) => a + x.duree, 0)).toBe(h);
    expect(s[0].roles).toEqual(["PRELIM"]);
    expect(s.flatMap((x) => x.roles)).toEqual(expect.arrayContaining(["TEST", "COMP", "MI", "PISTES", "ENQ", "CONC2"]));
  });
});

describe("dossier BDC au format NEXUS", () => {
  it("reprend la chronologie et les données du dossier NEXUS, sans variable non résolue", async () => {
    const t = await textes(await buildBDCNexusZip(NEXUS, MANAGER, [LOUIS]));
    for (const [n, x] of Object.entries(t)) expect(x, n).not.toMatch(/\{\{|\}\}/);
    const conv = t["Critere_3/Indicateur_9/Bénéficiaire - Louis VINCENT/Indicateur 9 - Convention de prestation.pdf"];
    expect(conv).toMatch(/CONVENTION DE RÉALISATION/);
    expect(conv).toMatch(/Phase préliminaire : 2 h — Phase d'investigation : 16 h — Phase de conclusion : 4 h/);
    expect(conv).toMatch(/entretien préalable du 12\/01\/2026/);
    expect(conv).toMatch(/signé le 20\/01\/2026, le délai de rétractation expire le 03\/02\/2026/);
    expect(conv).toMatch(/1 990,00 € net de taxe/);
    expect(conv).toMatch(/manager de proximité/);
    const convoc = t["Critere_3/Indicateur_9/Bénéficiaire - Louis VINCENT/Indicateur 9 - Convocation.pdf"];
    expect(convoc).toMatch(/Adressée le 04\/02\/2026/);
    const emarg = t["Critere_3/Indicateur_11/Bénéficiaire - Louis VINCENT/Indicateur 11 - Feuilles d'emargement par seance.pdf"];
    expect(emarg.match(/Séance n° \d+ sur 8/g)).toHaveLength(8);
    expect(t["Critere_7/Indicateur_30/Bénéficiaire - Louis VINCENT/Indicateur 30 - Questionnaire de satisfaction entreprise.pdf"]).toMatch(/Non applicable/);
    // Copie anonymisée : ni nom ni signature du bénéficiaire
    const synth = t["Critere_2/Indicateur_5/Bénéficiaire - Louis VINCENT/Indicateur 5 - Document de synthese (copie anonymisee).pdf"];
    expect(synth).not.toMatch(/VINCENT/);
    expect(synth).toMatch(/L\. V\./);
  }, 600_000);

  it("adapte la convention au financement (CPF certifié, employeur, OPCO) et à une durée de 12 h", async () => {
    const certifie = { ...NEXUS, certifications: "Actions de formation, Bilans de compétences" };
    const f12 = { ...MANAGER, intitule: "Bilan de compétences", duree: "12 heures", tarif: "" };
    const bens: StagiaireInfo[] = [
      { ...LOUIS, financeur: "CPF" },
      { ...LOUIS, nom: "DUPONT", prenom: "Anne", civilite: "Mme", financeur: "Entreprise", entreprise: "Alpha SAS", dateDebutFormation: "2026-03-02", dateFinFormation: "2026-04-30" },
      { ...LOUIS, nom: "MARTIN", prenom: "Paul", financeur: "OPCO", entreprise: "Beta SARL", dateDebutFormation: "2027-01-11", dateFinFormation: "2027-03-12" },
    ];
    const t = await textes(await buildBDCNexusZip(certifie, f12, bens));
    for (const [n, x] of Object.entries(t)) expect(x, n).not.toMatch(/\{\{|\}\}/);
    const conv = (p: string) => t[`Critere_3/Indicateur_9/Bénéficiaire - ${p}/Indicateur 9 - Convention de prestation.pdf`];
    expect(conv("Louis VINCENT")).toMatch(/CONTRAT DE PRESTATION/);
    expect(conv("Louis VINCENT")).toMatch(/Mon Compte Formation/);
    expect(conv("Anne DUPONT")).toMatch(/CONVENTION TRIPARTITE/);
    expect(conv("Anne DUPONT")).toMatch(/Alpha SAS/);
    expect(conv("Paul MARTIN")).toMatch(/OPCO/);
    expect(conv("Louis VINCENT")).toMatch(/Prix indiqué au devis personnalisé/);
    expect(conv("Louis VINCENT")).toMatch(/12 heures d'accompagnement individuel/);
    // Bilan futur : synthèse et certificat non émis par anticipation, émargement non coché
    const futur = "Paul MARTIN";
    expect(t[`Critere_2/Indicateur_5/Bénéficiaire - ${futur}/Indicateur 5 - Document de synthese (copie anonymisee).pdf`]).toMatch(/Bilan en cours/);
    expect(t[`Critere_3/Indicateur_9/Bénéficiaire - ${futur}/Indicateur 9 - Certificat de realisation.pdf`]).toMatch(/n'est pas émis par anticipation/);
    expect(t[`Critere_3/Indicateur_11/Bénéficiaire - ${futur}/Indicateur 11 - Feuilles d'emargement par seance.pdf`]).not.toMatch(/☒ Présent/);
    expect(t[`Critere_7/Indicateur_30/Bénéficiaire - Anne DUPONT/Indicateur 30 - Questionnaire de satisfaction entreprise.pdf`]).toMatch(/Destinataire Alpha SAS/);
  }, 600_000);
});
