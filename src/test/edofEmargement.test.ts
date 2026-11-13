import { describe, expect, it } from "vitest";
import { writeFileSync } from "fs";
import { PDFDocument } from "pdf-lib";
import type { EdofCandidat } from "@/lib/edofAuto/candidats";
import { docEmargement, planningEmargement } from "@/lib/edofAuto/emargement";

// Stagiaire fictive
const c: EdofCandidat = {
  numeroDossier: "400000000001", civilite: "Mme", nom: "EXEMPLE", prenom: "Camille", dateNaissance: "", adresse: "", codePostal: "", ville: "",
  email: "", telephone: "", codeCertif: "RS7650", intitule: "Mettre en valeur le regard", numeroSession: "", dateDebut: "2026-11-02", dateFin: "2026-11-07",
  lieuVille: "", statut: "Service fait déclaré", dateInscription: "", dureeHeures: 41,
};
const total = (p: { minutes: number }[]) => p.reduce((n, x) => n + x.minutes, 0);

describe("feuille d'émargement EDOF", () => {
  it("41 h du lundi 02/11 au samedi 07/11/2026 : 5 jours de 7 h puis 6 h le samedi", () => {
    const p = planningEmargement(c);
    expect(total(p)).toBe(41 * 60);
    expect(new Set(p.map((x) => x.date)).size).toBe(6);
    expect(p.at(-1)).toMatchObject({ date: "2026-11-07", libelle: "Après-midi", debut: "13h30", fin: "16h00" });
  });

  it("sans volume (export CSV) : 7 h par jour ouvré, jours fériés exclus", () => {
    const p = planningEmargement({ ...c, dureeHeures: undefined, dateDebut: "2026-11-09", dateFin: "2026-11-13" });
    expect(p.some((x) => x.date === "2026-11-11")).toBe(false);
    expect(total(p)).toBe(4 * 7 * 60);
  });

  it("produit un PDF", async () => {
    const pdf = await docEmargement({ centre: { nom: "CENTRE D'ESSAI", adresse: "1 rue de l'Essai 93250 Villemomble", ville: "Villemomble" }, jury: [], formateur: "Formateur Exemple" }, c);
    expect((await PDFDocument.load(pdf)).getPageCount()).toBeGreaterThan(0);
    if (process.env.EDOF_OUT) writeFileSync(`${process.env.EDOF_OUT}/emargement.pdf`, pdf);
  });
});
