import { describe, it, expect } from "vitest";
import { cleNir, completerNir, debutNir } from "@/lib/nir";

describe("NIR", () => {
  it("clé = 97 - mod 97", () => expect(cleNir("1850775123456")).toBe(String(97 - Number(1850775123456n % 97n)).padStart(2, "0")));
  it("Corse 2A remplacé par 19", () => expect(cleNir("185072A123456")).toBe(String(97n - (1850719123456n % 97n)).padStart(2, "0")));
  it("ajoute la clé à 13 caractères", () => expect(completerNir("1850775123456")).toHaveLength(15));
  it("début depuis la fiche", () => expect(debutNir("Mme", "1990-04-12", "75")).toBe("2900475"));
});
