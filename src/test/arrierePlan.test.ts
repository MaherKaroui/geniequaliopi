import { afterEach, describe, expect, it, vi } from "vitest";
import { ceder, garderActif } from "@/lib/arrierePlan";

describe("génération en onglet masqué", () => {
  afterEach(() => vi.restoreAllMocks());

  it("ceder ne dépend ni de requestAnimationFrame ni des timers quand l'onglet est masqué", async () => {
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    // Onglet masqué : Chrome ne déclenche jamais rAF et bride les timers.
    const raf = vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 0);
    const timer = vi.spyOn(window, "setTimeout");
    for (let i = 0; i < 20; i++) await ceder();
    expect(raf).not.toHaveBeenCalled();
    expect(timer).not.toHaveBeenCalled();
  });

  it("garderActif renvoie le résultat du travail", async () => {
    await expect(garderActif(async () => 42)).resolves.toBe(42);
  });
});
