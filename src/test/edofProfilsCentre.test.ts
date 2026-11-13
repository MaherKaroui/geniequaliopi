import { describe, expect, it } from "vitest";
import { cleCentre, clePersonne, signaturesDuJury } from "@/lib/edofAuto/profilsCentre";

describe("profil centre EDOF", () => {
  it("reconnaît Academy by Djika quelle que soit l'écriture", () => {
    expect(cleCentre("ACADEMY BY DJIKA (ACADEMY BY DJIKA)")).toBe(cleCentre("Academy by Djika"));
  });
  it("reprend la signature d'un juré par son nom, dans l'ordre affiché", () => {
    const s = { jures: { [clePersonne("Lydia NGHA")]: "A", [clePersonne("Noémie LUBANZADIO BAZU")]: "B", [clePersonne("Cindy TAMBA")]: "C" } };
    const jury = ["NGHA Lydia", "TAMBA Cindy", "LUBANZADIO BAZU Noémie"].map((nom) => ({ civilite: "Mme", nom, statut: "Jury", qualite: "" }));
    expect(signaturesDuJury(jury as any, s)).toEqual(["A", "C", "B"]);
  });
});
