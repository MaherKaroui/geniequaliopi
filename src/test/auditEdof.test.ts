import { describe, expect, it } from "vitest";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { basename, join } from "path";
import { PDFDocument } from "pdf-lib";
import { analyserEdof, chargerReferentiels, joursOuvres, lireDossiersEdof, nomRapport } from "@/lib/auditEdof/analyse";
import { genererRapportEdof } from "@/lib/auditEdof/rapportPdf";
import { setFranceCompetencesReader } from "@/lib/franceCompetences";
import { fetchEntreprise } from "@/lib/bpfAnalyse";

setFranceCompetencesReader(async (p) => {
  const f = join(__dirname, "../../public/france-competences", p);
  return existsSync(f) ? new Uint8Array(readFileSync(f)) : null;
});

const ENTETE = "NUMERO_DOSSIER;CIVILITE;NOM;PRENOM;DATE_DE_NAISSANCE;ADRESSE_POSTALE;ADRESSE_CODE_POSTAL;ADRESSE_VILLE;COURRIEL;NUMERO_TELEPHONE_PORTABLE;CODE_CERTIF/THEM;INTITULE_CERTIF/THEM;NUMERO_FORMATION;NUMERO_ACTION;NUMERO_SESSION;INTITULE_FORMATION;DATE_DEBUT_SESSION;DATE_FIN_SESSION;LIEU_FORMATION_VILLE;STATUT_DOSSIER;DATE_DERNIERE_ACTION;EN_CONTROLE;DATE_INSCRIPTION;TAUX_REALISATION_SAISI;CAS_FORCE_MAJEURE_TITULAIRE;MONTANT_FORMATION;MONTANT_FACTURABLE;MONTANT_FACTURE";
const L = (n: string, nom: string, prenom: string, naiss: string, cert: string, action: string, inscr: string, debut: string, fin: string, statut: string, prix: string, derniere: string, adr = "1 rue des Essais", tel = "0600000000") =>
  `${n};Madame;${nom};${prenom};${naiss};${adr};75011;PARIS;${prenom.toLowerCase()}@exemple.fr;${tel}${n};${cert};Certification ${cert};F1;${action};S1;Formation ${cert};${debut};${fin};;${statut};${derniere};NON;${inscr};100.00;NON;${prix};${prix};`;

// Stagiaires fictifs.
const CSV = [
  ENTETE,
  L("1", "TESTA", "ALICE", "01/01/1990", "RS6905", "1", "01/09/2025", "01/10/2025", "15/10/2025", "Service fait validé", "1500.00", "20/10/2025"),
  L("2", "TESTB", "BRUNO", "02/02/1985", "RS6905", "1", "05/09/2025", "06/10/2025", "20/10/2025", "Service fait validé", "1873.42", "25/10/2025"),
  L("3", "TESTC", "CLAIRE", "03/03/1980", "RS6905", "1", "10/01/2026", "02/02/2026", "13/02/2026", "Service fait validé", "1500.00", "20/02/2026"),
  L("4", "TESTC", "CLAIRE", "03/03/1980", "RS6905", "1", "08/01/2026", "02/02/2026", "13/02/2026", "Refus titulaire", "2000.00", "09/01/2026"),
  L("5", "TESTC", "CLAIRE", "03/03/1980", "RNCP41480", "B1", "10/01/2026", "05/02/2026", "20/02/2026", "Service fait validé", "4500.00", "25/02/2026"),
  L("6", "TESTD", "DAVID", "04/04/1992", "RS6905", "1", "20/03/2026", "25/03/2026", "31/03/2026", "Validé", "1500.00", "21/03/2026"),
  L("7", "TESTE", "EMMA", "05/05/1995", "RS6905", "1", "01/04/2026", "05/05/2026", "15/05/2026", "Annulé sans suite", "1500.00", "10/06/2026"),
].join("\n");

describe("audit EDOF", () => {
  it("jours ouvrés : week-ends et fériés exclus (numpy busday_count)", () => {
    expect(joursOuvres("2026-05-01", "2026-05-11")).toBe(4); // 1er et 8 mai fériés, week-end
    expect(joursOuvres("2025-12-22", "2026-01-05")).toBe(8);
  });

  it("calcule CA par année, prix, recréations, multi-certifications et délais", async () => {
    const ds = lireDossiersEdof(new TextEncoder().encode(CSV).buffer);
    expect(ds).toHaveLength(7);
    const a = analyserEdof(ds, { siret: "12345678900011", nomFichier: "Export_Tous les dossiers_12345678900011_20260601.csv", referentiels: await chargerReferentiels(ds), dateRapport: "2026-06-02" });
    expect(a.dateExport).toBe("2026-06-01");
    expect(a.ca).toBeCloseTo(1500 + 1873.42 + 1500 + 4500);
    expect(a.caParAnnee[2025]).toBeCloseTo(3373.42);
    expect(a.caParAnnee[2026]).toBe(6000);
    const ids = a.constats.map((c) => c.id);
    expect(ids).toEqual(expect.arrayContaining(["prix", "recreations", "multi", "delai", "annulations", "habilitation"]));
    expect(a.constats.find((c) => c.id === "prix")!.niveau).toBe("ÉLEVÉ"); // 1 873,42 € : montant à centimes
    expect(a.constats.find((c) => c.id === "recreations")!.niveau).toBe("ÉLEVÉ"); // refus à 2 000 € puis 1 500 €
    expect(a.constats.find((c) => c.id === "delai")!.ampleur).toBe("1 dossier"); // TESTD : 3 jours ouvrés
    expect(a.constats.find((c) => c.id === "habilitation")!.constat).toContain("RS6905"); // SIRET fictif absent des partenaires
    expect(a.constats[0].niveau).toBe("ÉLEVÉ");
    expect(nomRapport({ ...a, organisme: "ESSAI FORMATION" })).toBe("Audit_EDOF_2025-2026_ESSAI_FORMATION.pdf");
    const pdf = await PDFDocument.load(await genererRapportEdof(a));
    expect(pdf.getPageCount()).toBeGreaterThan(4);
  });

  // Export réel (jamais versionné) : AUDIT_EDOF_CSV=<chemin> AUDIT_OUT=<dossier> npx vitest run src/test/auditEdof.test.ts
  it.runIf(!!process.env.AUDIT_EDOF_CSV)("rapport sur un export réel", async () => {
    const f = process.env.AUDIT_EDOF_CSV!;
    const buf = readFileSync(f);
    const ds = lireDossiersEdof(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
    const siret = basename(f).match(/(\d{14})/)?.[1] || "";
    const entreprise = await fetchEntreprise(siret).catch(() => null);
    const a = analyserEdof(ds, { siret, nomFichier: basename(f), entreprise, referentiels: await chargerReferentiels(ds) });
    const out = process.env.AUDIT_OUT || ".";
    mkdirSync(out, { recursive: true });
    writeFileSync(join(out, nomRapport(a)), await genererRapportEdof(a));
    writeFileSync(join(out, nomRapport(a).replace(".pdf", ".json")), JSON.stringify({ ...a, dossiers: a.dossiers.length }, null, 1));
  }, 60000);
});
