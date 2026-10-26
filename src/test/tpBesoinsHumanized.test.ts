import { describe, expect, it } from "vitest";
import { getTPEvalBesoins, getTPBesoinsPrincipal, tpBesoinsCle } from "@/lib/tpBesoinsHumanized";
import { generateDocumentById } from "@/lib/documentGenerator";
import { FORMATION_TP_ETRM, FORMATION_TP_GCF, FORMATION_TP_GP, FORMATION_TP_CA, FORMATION_TP_SC } from "@/lib/tpFormations";

const TITRES = [
  ["TP Exploitant en transport routier de marchandises", "RNCP40992", "etrm"],
  ["TP Gestionnaire comptable et fiscal", "RNCP37949", "gcf"],
  ["TP Gestionnaire de paie", "RNCP37948", "gp"],
  ["TP Comptable assistant", "RNCP37121", "ca"],
  ["TP Secrétaire comptable", "RNCP37123", "sc"],
] as const;
const PRENOMS = ["Anne", "Hugo", "Léa", "Karim", "Inès", "Paul", "Yanis", "Sarah", "Omar", "Julie"];
const gens = Array.from({ length: 40 }, (_, i) => ({
  nom: `NOM${i}`, prenom: PRENOMS[i % 10], civilite: i % 2 ? "M." : "Mme", entreprise: i % 3 ? "ACME SAS" : "",
}));

describe("Évaluation des besoins — TP ETRM, GCF, paie, comptable assistant, secrétaire comptable", () => {
  it.each(TITRES)("%s : détecté par l'intitulé seul et par le code", (t, code, cle) => {
    expect(tpBesoinsCle(t)).toBe(cle);
    expect(tpBesoinsCle(undefined, code)).toBe(cle);
  });

  it("le Gestionnaire de paie hors titre professionnel garde la branche « paie » générique", () => {
    expect(tpBesoinsCle("Gestionnaire de paie – initiation")).toBeNull();
  });

  it.each(TITRES)("%s : 40 apprenants, 40 réponses différentes, sans balise restante", (t, code) => {
    const sets = gens.map((s, i) => getTPEvalBesoins(s, !!s.entreprise, i, t, code));
    const besoins = gens.map((s, i) => getTPBesoinsPrincipal(t, code, s.nom, s.prenom, s.civilite, i));
    expect(new Set(sets.map((r) => r.objectif + r.projetPro)).size).toBe(40);
    expect(new Set(sets.map((r) => r.attentes + r.projetPro)).size).toBe(40);
    expect(new Set(besoins).size).toBe(40);
    for (const r of sets) {
      const txt = Object.values(r).join(" ");
      expect(txt).not.toMatch(/[{}]|undefined|qu'(?=[BCDFGJKLMNPQRSTVWXZ])/);
      expect(r.objectif).toContain(code);
    }
  });

  it("le générateur Qualiopi (et donc IZILearn) utilise ces réponses", () => {
    const o = { nom: "ORGANISME TEST", siret: "12345678900011", nda: "11000000000", adresse: "1 rue de Paris" } as never;
    const fs = [FORMATION_TP_ETRM, FORMATION_TP_GCF, FORMATION_TP_GP, FORMATION_TP_CA, FORMATION_TP_SC];
    fs.forEach((f, i) => {
      const html = generateDocumentById("x", "trame_eval_besoins_combine", { stagiaireIdx: 1 }, o, f, gens as never);
      expect(html).toContain(`le titre professionnel ${TITRES[i][0].replace(/^TP /, "")} (${TITRES[i][1]})`);
    });
  });
});
