import { describe, it, expect } from "vitest";
import { mot } from "@/lib/resolveurFormation";
import { getEvalContent, hasEvalContentDedie } from "@/lib/evalContent";
import { getCourseChapters } from "@/lib/courseContent";
import { isECSRFormation } from "@/lib/documentGenerator";
import type { FormationInfo } from "@/types/qualiopi";

const formation = (intitule: string) => ({ intitule } as FormationInfo);
const premierChapitre = (intitule: string) => (getCourseChapters(intitule)[0]?.title || "").toLowerCase();

describe("reconnaissance du domaine d'une formation", () => {
  it("reconnaît les mots entiers et les radicaux autorisés", () => {
    expect(mot("cap esthétique cosmétique parfumerie", "cap")).toBe(true);
    expect(mot("accueil des publics en situation de handicap", "cap")).toBe(false);
    expect(mot("développer sa capacité à manager", "cap")).toBe(false);
    expect(mot("les principes du droit du travail", "cip")).toBe(false);
    expect(mot("créer son entreprise", "epr")).toBe(false);
    expect(mot("réflexologie plantaire", "fle")).toBe(false);
    expect(mot("créer un site avec wordpress", "word")).toBe(false);
    expect(mot("excellence commerciale", "excel")).toBe(false);
    expect(mot("assistant administratif", "admin")).toBe(false);
    expect(mot("esthéticienne", "esthét")).toBe(true);
  });

  it("ne capture plus les intitulés pièges", () => {
    for (const t of ["Conducteur de travaux", "Chauffeur PL (poids lourd)"]) {
      expect(isECSRFormation(formation(t))).toBe(false);
      expect(getEvalContent(t).qcmFinal.some((q) => /vtc|t3p/i.test(q.question))).toBe(false);
    }
    expect(hasEvalContentDedie("Accompagner les personnes en situation de handicap")).toBe(false);
    expect(hasEvalContentDedie("Développer sa capacité d'écoute")).toBe(false);
    expect(hasEvalContentDedie("Les principes de la comptabilité")).toBe(false);
    expect(hasEvalContentDedie("Réflexologie plantaire")).toBe(false);
    expect(hasEvalContentDedie("Créer un site avec WordPress")).toBe(false);
    expect(hasEvalContentDedie("Excellence relationnelle")).toBe(false);
    expect(premierChapitre("Créer et gérer son entreprise")).not.toMatch(/restauration|hygiène alimentaire/);
  });

  it("garde les vraies correspondances", () => {
    expect(hasEvalContentDedie("Initiation Word")).toBe(true);
    expect(hasEvalContentDedie("Excel Professionnel – Niveau Avancé")).toBe(true);
    expect(hasEvalContentDedie("CAP Esthétique Cosmétique Parfumerie")).toBe(true);
    expect(hasEvalContentDedie("Bureautique : Word, Excel, PowerPoint")).toBe(true);
    expect(hasEvalContentDedie("Marketing digital et réseaux sociaux")).toBe(true);
    expect(hasEvalContentDedie("Informatique : maintenance et réseau")).toBe(true);
    expect(getEvalContent("Massage postpartum").qcmFinal.length).toBeGreaterThan(0);
    expect(isECSRFormation(formation("Formation VTC – RS5637"))).toBe(true);
  });

  it("chaque exercice dédié porte un corrigé", () => {
    for (const t of ["Initiation Word", "Informatique", "Digital Marketing", "Bureautique", "CAP Esthétique"]) {
      const c = getEvalContent(t);
      expect(c.exercices.length).toBeGreaterThanOrEqual(6);
      c.exercices.forEach((e) => expect(e.reponseAttendue.length).toBeGreaterThan(40));
      c.qcmFinal.forEach((q) => expect(q.correctIndex).toBeLessThan(q.options.length));
    }
  });
});
