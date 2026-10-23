import { describe, it, expect } from "vitest";
import { versStagiaire } from "@/lib/izilearn/mapping";

const base = { inscriptionId: "i", contactId: "c", prenom: "Léa", nom: "MARTIN", statut: "inscrit", signatures: [], connexions: [] };
const p = { session: { dateDebut: "2026-09-01", dateFin: "2027-08-31", modalite: "presentiel" } } as never;

describe("CERFA IZILearn", () => {
  it("reprend IDCC, APE, effectif et NIR transmis", () => {
    const s = versStagiaire({ ...base, nir: "2 99 05 75 112 233 45",
      entreprise: { nom: "ACME", idcc: "1486", code_ape: "6202A", effectif: 12, telephone: "0102030405" } } as never, p);
    expect(s.nir).toBe("2 99 05 75 112 233 45");
    expect(s.cerfa?.idcc).toBe("1486");
    expect(s.cerfa?.codeApe).toBe("6202A");
    expect(s.cerfa?.effectif).toBe("12");
    expect(s.cerfa?.telephoneEmployeur).toBe("0102030405");
  });
  it("laisse vide ce qui n'est pas transmis", () => {
    const s = versStagiaire({ ...base, entreprise: { nom: "ACME" } } as never, p);
    expect(s.nir).toBeUndefined();
    expect(s.cerfa?.idcc).toBe("");
  });
});
