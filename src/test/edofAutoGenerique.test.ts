import { beforeAll, describe, expect, it } from "vitest";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { PDFDocument } from "pdf-lib";
import { setFranceCompetencesReader } from "@/lib/franceCompetences";
import { formationRealisee, grouperSessions, lireExportEdof } from "@/lib/edofAuto/candidats";
import { construireSujet, genererReponsesGeneriques, type SourceReferentiel } from "@/lib/edofAuto/generique";
import { genererPack, resoudreReferentiels } from "@/lib/edofAuto/pack";
import type { Jure } from "@/lib/edofAuto/rs7650Pdf";

const ENTETE = "NUMERO_DOSSIER;CIVILITE;NOM;PRENOM;DATE_DE_NAISSANCE;ADRESSE_POSTALE;ADRESSE_CODE_POSTAL;ADRESSE_VILLE;COURRIEL;NUMERO_TELEPHONE_PORTABLE;CODE_CERTIF/THEM;INTITULE_CERTIF/THEM;DATE_DEBUT_SESSION;DATE_FIN_SESSION;STATUT_DOSSIER";
const l = (n: string, nom: string, prenom: string, code: string, intitule: string, debut: string, fin: string, statut = "Service fait validé") =>
  `${n};Madame;${nom};${prenom};01/02/1990;5 rue Test;75001;PARIS;${prenom.toLowerCase()}@exemple.fr;0600000000;${code};${intitule};${debut};${fin};${statut}`;

// Candidats fictifs
const CSV = [
  ENTETE,
  l("200000000001", "ALPHA", "Anne", "RS7332", "Recruter et intégrer ses collaborateurs", "03/03/2026", "05/03/2026"),
  l("200000000002", "BETA", "Bruno", "RS7332", "Recruter et intégrer ses collaborateurs", "03/03/2026", "05/03/2026"),
  l("200000000003", "GAMMA", "Carla", "RNCP41480", "Product builder no-code", "01/02/2026", "30/04/2026"),
  l("200000000004", "DELTA", "Denis", "CPF200", "Accompagnement VAE", "01/02/2026", "30/04/2026"),
  l("200000000005", "EPSILON", "Eva", "RS6168", "Recruter et intégrer ses collaborateurs (CP-FFP)", "01/02/2026", "03/02/2026"),
].join("\n");

const jury: Jure[] = [
  { civilite: "Mme", nom: "Juré Un", statut: "Jury", qualite: "Représentante du certificateur" },
  { civilite: "M.", nom: "Juré Deux", statut: "Jury", qualite: "Professionnel externe" },
  { civilite: "Mme", nom: "Juré Trois", statut: "Jury", qualite: "Professionnel externe" },
];
const centre = { nom: "CENTRE D'ESSAI", adresse: "1 rue de l'Essai 75001 Paris", ville: "Paris" };

describe("Automatisation EDOF — toutes certifications", () => {
  beforeAll(() => {
    setFranceCompetencesReader(async (p) => {
      const f = join(process.cwd(), "public", "france-competences", p);
      return existsSync(f) ? new Uint8Array(readFileSync(f)) : null;
    });
  });
  const exp = lireExportEdof(new TextEncoder().encode(CSV).buffer, "Export_Tous les dossiers_93401856500010_20261027.csv");
  const candidats = exp.candidats.filter((c) => formationRealisee(c.statut));

  it("trouve un référentiel pour toutes les formations, même sans fiche active", async () => {
    const refs = await resoudreReferentiels(candidats);
    expect(Object.keys(refs).sort()).toEqual(["CPF200", "RNCP41480", "RS6168", "RS7332"]);
    expect((refs.RS7332 as SourceReferentiel).origine).toContain("fiche France Compétences RS7332");
    expect((refs.RS6168 as SourceReferentiel).origine).toMatch(/RS7332|remplaçante/); // fiche échue → fiche active au même intitulé
    expect((refs.CPF200 as SourceReferentiel).origine).toContain("intitulé");
    expect((refs.CPF200 as SourceReferentiel).unites[0].competences[0]).toMatch(/parcours/); // compétences VAE
  });

  it("construit un sujet et des copies différentes au-dessus du seuil", async () => {
    const refs = await resoudreReferentiels(candidats);
    for (const code of ["RS7332", "RNCP41480", "CPF200", "RS6168"]) {
      const sujet = construireSujet(refs[code] as SourceReferentiel);
      expect(sujet.competences.length).toBeGreaterThan(0);
      expect(sujet.qcm.length).toBeGreaterThan(0);
      sujet.qcm.forEach((q) => expect(q.options[q.bonne]).toBeTruthy());
      const reps = candidats.filter((c) => c.codeCertif === "RS7332").map((c) => genererReponsesGeneriques(sujet, c));
      for (const r of reps) {
        expect(r.noteTheo).toBeGreaterThanOrEqual(sujet.seuil);
        expect(r.noteTheo).toBeLessThanOrEqual(sujet.noteMax);
        expect(r.admis).toBe(true);
      }
      expect(JSON.stringify(reps[0])).not.toBe(JSON.stringify(reps[1]));
    }
    expect(construireSujet(refs.RNCP41480 as SourceReferentiel).unites).toHaveLength(4);
  });

  it("génère 4 PDF par candidat et un PV par session, pour chaque formation", async () => {
    const refs = await resoudreReferentiels(candidats);
    const sessions = grouperSessions(candidats);
    const ctx = Object.fromEntries(Object.keys(refs).map((k) => [k, { centre, jury }]));
    const pack = await genererPack(sessions, ctx, refs);
    expect(pack.filter((f) => f.chemin.startsWith("RS7332/"))).toHaveLength(2 * 4 + 1);
    for (const code of ["RNCP41480", "CPF200", "RS6168"]) expect(pack.filter((f) => f.chemin.startsWith(`${code}/`))).toHaveLength(4 + 1);
    for (const f of pack) expect((await PDFDocument.load(f.donnees)).getPageCount()).toBeGreaterThan(0);
    const out = process.env.EDOF_OUT;
    if (out) for (const f of pack) { const p = join(out, f.chemin); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, f.donnees); }
  }, 120000);
});
