import { describe, expect, it } from "vitest";
import { isEmbeddedBDC } from "@/lib/bdc/embedMode";

describe("BDC-only embedded entry", () => {
  it("opens only the explicit standalone Bilan entry", () => {
    expect(isEmbeddedBDC("/bilan-competences", "?embed=1")).toBe(true);
  });

  it("keeps the ordinary Bilan entry protected", () => {
    expect(isEmbeddedBDC("/bilan-competences", "")).toBe(false);
    expect(isEmbeddedBDC("/bilan-competences", "?embed=0")).toBe(false);
  });

  it("does not unlock other tools or administration", () => {
    for (const route of ["/", "/admin", "/rapide", "/auth", "/vae", "/controle-ey", "/bilan-competences/autre"]) {
      expect(isEmbeddedBDC(route, "?embed=1")).toBe(false);
    }
  });
});