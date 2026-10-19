import { it, expect } from "vitest";
import { applyBdcAI } from "@/lib/bdc/standaloneAI";
import { emptyBdcData } from "@/lib/bdc/standaloneTypes";
it("reprend les contenus IA sans modifier identité, prix, durée, présences ni signatures", () => {
  const d = emptyBdcData(); d.formation.duree = "22"; d.formation.tarif = "1990"; d.beneficiaire.nom = "TEST"; d.organisme.tamponUrl = "tampon-fourni";
  const result = applyBdcAI(d, { besoins: "Analyse personnalisée", programme: "Trois phases adaptées", duree: "24", tarif: "0", nom: "Inventé", tamponUrl: "Inventé" });
  expect(result.declarations.besoins).toBe("Analyse personnalisée"); expect(result.formation.programme).toBe("Trois phases adaptées");
  expect(result.formation.duree).toBe("22"); expect(result.formation.tarif).toBe("1990"); expect(result.beneficiaire).toEqual(d.beneficiaire); expect(result.organisme).toEqual(d.organisme); expect(result.sessions).toEqual([]);
});