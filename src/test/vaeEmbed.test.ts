import { describe, expect, it } from "vitest";
import { isEmbeddedVAE } from "@/lib/vae/embedMode";

describe("VAE-only embedded entry", () => {
  it("opens VAE alone with the explicit integration option", () => {
    expect(isEmbeddedVAE("/vae", "?embed=1")).toBe(true);
  });

  it("keeps the ordinary VAE entry behind the existing gate", () => {
    expect(isEmbeddedVAE("/vae", "")).toBe(false);
    expect(isEmbeddedVAE("/vae", "?embed=0")).toBe(false);
  });

  it("does not grant access to any other tool or administration", () => {
    for (const route of ["/", "/admin", "/rapide", "/auth", "/controle-ey"]) {
      expect(isEmbeddedVAE(route, "?embed=1")).toBe(false);
    }
  });
});