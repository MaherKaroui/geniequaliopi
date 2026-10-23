import { it, expect } from "vitest";
import { esc } from "@/lib/izilearn/trames";
it("les balises HTML du texte ne s'affichent jamais", () => {
  const h = esc("<p>Ligne 1<br>Ligne 2</p><ul><li><strong>A</strong></li></ul>&lt;br&gt;x");
  expect(h).not.toMatch(/&lt;|&gt;/);
  expect(h).toContain("Ligne 1<br>Ligne 2");
  expect(h).not.toMatch(/<(?!br>)/);
});
