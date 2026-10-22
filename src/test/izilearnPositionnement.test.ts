import { afterEach, describe, expect, it } from "vitest";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
import { reponsesPositionnement } from "@/lib/izilearn/positionnement";
import { getEvalContent, getQuestionsOuvertes } from "@/lib/evalContent";
import { clearFormationPresets, getFormationPreset, registerFormationPreset } from "@/lib/formationPresets/registry";
import type { IzPayload } from "@/lib/izilearn/types";

const title = "TP Exploitant en transport routier de marchandises";
function session(): IzPayload {
  return {
    version: 1, source: { app: "izilearn", url: "http://localhost:8080", orgId: "test", sessionId: "test" },
    organisme: { id: "test", nom: "Organisme de contrôle", email: "test@example.org" },
    formation: { id: "test", intitule: title, typeAction: "actions-formation", dureeHeures: 14, objectifs: "Planifier les transports\nContrôler les documents", modules: [], blocs: [] },
    session: { id: "test", dateDebut: "2026-09-01", dateFin: "2026-09-02", modalite: "presentiel", formateur: "Formateur de contrôle" },
    creneaux: [], apprenants: Array.from({ length: 40 }, (_, i) => ({ inscriptionId: `e${i}`, contactId: `c${i}`, nom: `NOM${i}`, prenom: `Prénom${i}`, statut: "inscrit", signatures: [], connexions: [] })),
  };
}
afterEach(clearFormationPresets);
describe("Positionnement IZILearn proposé", () => {
  it("produit 40 sélections QCM distinctes sur le titre transport", () => {
    const qs = getEvalContent(title).qcmPositionnement;
    const copies = Array.from({ length: 40 }, (_, i) => reponsesPositionnement(qs, i));
    expect(new Set(copies.map(c => c.join(","))).size).toBe(40);
    for (const c of copies) expect(c).toHaveLength(qs.length);
  });
  it("remplit 40 copies ouvertes différentes sans compter les noms dans la comparaison", () => {
    const pieces = planPieces(contexte(session())).filter(p => p.categorie === "positionnement");
    const copies = pieces.map(p => p.rendre());
    const answers = copies.map(h => [...h.matchAll(/Réponse du stagiaire \(proposée\) :<\/strong> ([\s\S]*?)<\/p>/g)].map(m => m[1]).join("|"));
    expect(pieces).toHaveLength(40);
    expect(answers.every(a => a.trim().length > 0)).toBe(true);
    expect(new Set(answers).size).toBe(40);
    expect(copies.every(h => h.includes("☒"))).toBe(true);
  });
  it("conserve un résultat enregistré de zéro et n’ajoute aucune réponse proposée", () => {
    const p = session();
    p.apprenants[0].positionnement = [{ titre: "Test réel", date: "2026-09-01", score: 0, max: 10, appreciation: "À reprendre" }];
    const html = planPieces(contexte(p)).find(p => p.id === "positionnement_0")?.rendre() ?? "";
    expect(html).toContain("0 / 10");
    expect(html).toContain("À reprendre");
    expect(html).not.toContain("Réponse du stagiaire (proposée)");
  });
  it("ne laisse pas le questionnaire vide quand les questions ouvertes du preset sont absentes", () => {
    const base = getFormationPreset({ intitule: title });
    if (!base?.data.evaluations) throw new Error("Preset transport absent");
    registerFormationPreset({ ...base, id: "empty-open", updated_at: "2099", data: { ...base.data, evaluations: { ...base.data.evaluations, questionsOuvertesDebut: [], questionsOuvertesFin: [] } } });
    expect(getQuestionsOuvertes(title, "Planifier les transports", "Documents de transport").debut.length).toBeGreaterThan(0);
    expect(getQuestionsOuvertes(title).fin.length).toBeGreaterThan(0);
  });
});