import { describe, expect, it } from "vitest";
import { decouperModuleEnLigne, generateDocumentById, repartirMinutes } from "@/lib/documentGenerator";
import data from "./fixtures/derouleBeam.json";

describe("déroulé pédagogique — modules écrits sur une ligne", () => {
  it("découpe titre, volume et séquences hors parenthèses", () => {
    const m = decouperModuleEnLigne("Module 2 — Les branches du droit (C2, 8 h) : droit public (constitutionnel, fiscal) et droit privé ; droit de l'Union (primaire et dérivé : règlement, directive) ; QCM C2.");
    expect(m?.titre).toBe("Module 2 — Les branches du droit (C2, 8 h)");
    expect(m?.heures).toBe(8);
    expect(m?.elements.map((e) => e.titre)).toEqual(["Droit public", "Droit de l'Union", "QCM C2"]);
  });

  it("répartit le volume par pas de 15 min, somme exacte", () => {
    const parts = repartirMinutes(["QCM de positionnement", "a", "b", "c", "Mises en situation 1 et 2", "QCM C1"], 480);
    expect(parts.reduce((x, y) => x + y, 0)).toBe(480);
    expect(parts.every((p) => p % 15 === 0)).toBe(true);
  });

  it("produit 6 modules (47 h), en-têtes lisibles, sans jour inventé", () => {
    const html = generateDocumentById("deroule_pedagogique_detaille", "deroule_pedagogique_detaille", undefined, data.o as any, data.f as any, []);
    expect(html).toContain("47 heures — 6 modules");
    expect(html).not.toContain("Consolidation des acquis");
    expect(html).not.toMatch(/<td>(8|7) h\)/);
    expect(html).not.toMatch(/<tr style="background:#1e3a7b[^>]*>\s*<td/);
    expect((html.match(/<thead><tr><th style="[^"]*color:#fff/g) || []).length).toBe(6);
    const minutes = [...html.matchAll(/<tr style="background[^>]*>\s*<td>[^<]*<\/td>\s*<td>(\d+)h(\d+)<\/td>/g)]
      .reduce((t, m) => t + Number(m[1]) * 60 + Number(m[2]), 0);
    expect(minutes).toBe(47 * 60);
  });
});
