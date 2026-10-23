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
  it("conserve les champs AcroForm et les données simples CERFA explicites", () => {
    const cerfaChamps = { "Zone de texte 8_18": "1050993066087", "Case #C3#A0 cocher 3": true };
    const s = versStagiaire({ ...base, nir: "1050993066087", nomNaissance: "DUPONT",
      nationalite: "1", departementNaissance: "93", communeNaissance: "Saint-Denis",
      codePostal: "93200", commune: "Saint-Denis", dateNaissanceCerfa: "2005-09-06",
      dateNaissance: "2001-01-01", adresse: "12 rue Exemple, 75001 Paris", cerfaChamps }, p);
    expect(s.cerfaChamps).toEqual(cerfaChamps);
    expect(s.nir).toBe("1050993066087");
    expect(s.cerfa?.nomNaissance).toBe("DUPONT");
    expect(s.nationalite).toBe("1");
    expect(s.departementNaissance).toBe("93");
    expect(s.communeNaissance).toBe("Saint-Denis");
    expect(s.codePostal).toBe("93200");
    expect(s.commune).toBe("Saint-Denis");
    expect(s.dateNaissance).toBe("2005-09-06");
  });
  it("reconnaît les clés lisibles apprenti du contrat", () => {
    const s = versStagiaire({ ...base, cerfa: { apprenti_nir: "1050993066087",
      apprenti_commune_naissance: "Saint-Denis" } }, p);
    expect(s.nir).toBe("1050993066087");
    expect(s.communeNaissance).toBe("Saint-Denis");
  });
});
