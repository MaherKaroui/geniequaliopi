import { describe, it, expect } from "vitest";
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { entreesVeille } from "@/lib/veilleExploitee";
import { dysfonctionnements, nombreIncidents } from "@/lib/registresQualite";
import { generateDocumentById } from "@/lib/documentGenerator";

// Dossier « IN3M FORMA – Préparation à l'examen VTC (RS5637) – 48 h » : 4 sessions de 2025, aucune
// date globale de formation (chaque stagiaire porte les dates de sa session).
const o = {
  nom: "IN3M FORMA", siret: "91830634100028", dirigeant: "Mohamed KADRI", dateMaj: "2025-01-02",
  typesActions: ["actions-formation"], referentQualite: "Mohamed KADRI", responsablePedagogique: "Mohamed KADRI",
  referentHandicap: "Mohamed KADRI", poleAdministratif: "Mohamed KADRI", version: "1", typeAudit: "auto",
} as unknown as OrganismeInfo;
const f = {
  intitule: "Préparation à l'examen d'accès à la profession de conducteur VTC (RS5637) – 48 h", codeRNCP: "RS5637",
  dateDebut: "", dateFin: "", modalites: "distanciel", lieu: "Google Meet", formateur: "BOUYAHIA Aziz", duree: "48",
} as unknown as FormationInfo;
const session = (nom: string, debut: string, fin: string) => ({ nom, prenom: "X", dateDebutFormation: debut, dateFinFormation: fin } as unknown as StagiaireInfo);
const stagiaires = [
  session("THOMAS", "2025-03-03", "2025-03-10"), session("FRANÇOIS", "2025-05-12", "2025-05-19"),
  session("MICHEL", "2025-09-15", "2025-09-22"), session("LIU", "2025-11-17", "2025-11-24"),
];
const today = new Date("2026-11-25T12:00:00");

describe("VTC — veilles sourcées et dysfonctionnements IND 31", () => {
  it("cite les textes VTC réels en veille réglementaire et métier", () => {
    const regl = entreesVeille(o, f, "reglementaire", "AF").map((e) => e.id);
    expect(regl).toEqual(expect.arrayContaining(["R-VTC-EQUIV", "R-VTC-T3P", "R-VTC-PROG", "R-VTC-FC"]));
    const met = entreesVeille(o, f, "metier", "AF");
    expect(met.map((e) => e.id)).toEqual(expect.arrayContaining(["M-VTC-ARPE", "M-VTC-VFE", "M-VTC-SDES"]));
    // Code ROME seul dans le lien Métierscope.
    expect(met.find((e) => e.id === "M-ROME1")?.url).toMatch(/fiche-metier\/N4102$/);
  });

  it("date l'aléa sur la première session et ajoute les événements VTC, dans l'ordre", () => {
    const d = dysfonctionnements(f, stagiaires, today);
    expect(d.map((x) => [x.ref, x.date, x.type])).toEqual([
      ["AC-D01", "03/03/2025", "Externe"],
      ["AC-D02", "10/03/2025", "Interne"],
      ["AC-D03", "17/11/2025", "Externe"],
    ]);
    expect(nombreIncidents(f, stagiaires)).toBe(3);
  });

  it("reprend les mêmes enregistrements dans le suivi IND 31 et le tableau d'amélioration", () => {
    const suivi = generateDocumentById("t", "suivi_dysfonctionnements_excel", {}, o, f, stagiaires);
    const tableau = generateDocumentById("t", "tableau_amelioration_continue_excel", {}, o, f, stagiaires);
    for (const ref of ["AC-D01", "AC-D02", "AC-D03"]) {
      expect(suivi).toContain(ref);
      expect(tableau).toContain(ref);
    }
    expect(suivi).toContain("exament3p.fr");
    expect(tableau).toContain("Décret n° 2026-764");
  });

  it("ne crée aucun événement VTC pour une autre formation", () => {
    const autre = { ...f, intitule: "Initiation Word", codeRNCP: "" } as FormationInfo;
    expect(dysfonctionnements(autre, stagiaires, today).map((x) => x.ref)).toEqual(["AC-D01"]);
  });
});

describe("VTC — évaluation de chaque semaine : 2 mises en situation illustrées et QCM", () => {
  const fSansDuree = { ...f, intitule: "Préparation à l'examen d'accès à la profession de conducteur VTC (RS5637)" } as FormationInfo;
  const doc = (si: number, semaine: number) => generateDocumentById("t", "exercices_stagiaire", { stagiaireIdx: si, exerciceIdx: semaine }, o, fSansDuree, stagiaires);

  it("chaque semaine reprend le plan : la semaine 2 mêle 2 mises en situation et les QCM C2 et C3", () => {
    const s2 = doc(0, 1);
    expect(s2).toContain("ÉVALUATION DE LA SEMAINE – MISES EN SITUATION ET QCM");
    expect(s2).toContain("Exercice 4");
    expect(s2).toContain("Exercice 5");
    expect(s2).toContain("QCM C2");
    expect(s2).toContain("QCM C3");
    expect(s2).not.toContain("Exercice 3");
  });

  it("insère le document illustré avec largeur et hauteur (export Word)", () => {
    const j1 = doc(0, 0);
    expect(j1).toMatch(/<img src="data:image\/jpeg;base64,[^"]+" alt="Document 1 — Sortie de la gare de Lyon[^"]*" width="560" height="309"/);
  });

  it("donne une production différente à chaque stagiaire, avec son observation du document", () => {
    const prods = stagiaires.map((_, si) => doc(si, 0).match(/Travail réalisé par[\s\S]*?<\/p><p>([\s\S]*?)<\/p>/g)?.[1] || "");
    expect(new Set(prods).size).toBe(stagiaires.length);
    expect(prods.some((p) => /document|image|scène/i.test(p))).toBe(true);
  });
});
