import { describe, it, expect } from "vitest";
import { FORMATION_TVTE } from "@/lib/ventesEnergie35hPreset";
import { parseObjectifsCompetences, objectifsPedagogiquesHtml, competencesDeveloppeesHtml } from "@/lib/objectifsCompetences";
import { genProgrammeNDA } from "@/lib/ndaDocuments";

const texte = (h: string) => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

describe("Programme : sections 4 et 5 distinctes (EMI EVOLUTION / TVTE)", () => {
  const oc = parseObjectifsCompetences(FORMATION_TVTE.objectifs, FORMATION_TVTE.programme);
  const s4 = objectifsPedagogiquesHtml(oc);
  const s5 = competencesDeveloppeesHtml(oc);
  if (process.env.SHOW) console.log("S4:", texte(s4), "\n\nS5:", texte(s5));

  it("objectif général isolé, 6 compétences C1–C6 rattachées aux jours", () => {
    expect(oc.general).toMatch(/^vendre des travaux de rénovation énergétique/);
    expect(oc.competences.map(c => c.code)).toEqual(["C1", "C2", "C3", "C4", "C5", "C6"]);
    expect(oc.competences.map(c => c.sequence)).toEqual(["Jour 1", "Jour 2", "Jour 3", "Jour 4", "Jour 4", "Jour 5"]);
    expect(oc.competences.every(c => c.contenus.length > 0)).toBe(true);
  });

  it("la section 5 n'est plus la copie de la section 4", () => {
    expect(texte(s4)).not.toEqual(texte(s5));
    expect(s5).not.toContain("Objectif général");
    expect(s4).not.toContain("SONCAS"); // le détail ne figure qu'en section 5
    expect(s5).toContain("SONCAS");
    expect(s4).not.toMatch(/non certifiante|capable de/);
  });

  it("programme NDA : sections distinctes", () => {
    const html = genProgrammeNDA({ nom: "EMI EVOLUTION" } as never, FORMATION_TVTE, []);
    const s4n = html.split("4. Objectifs pédagogiques")[1].split("5. Compétences")[0];
    const s5n = html.split("5. Compétences développées")[1].split("6. Public")[0];
    expect(texte(s4n)).not.toEqual(texte(s5n));
  });
});
