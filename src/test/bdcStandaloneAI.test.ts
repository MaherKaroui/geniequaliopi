import { it, expect } from "vitest";
import { applyBdcAI } from "@/lib/bdc/standaloneAI";
import { emptyBdcData } from "@/lib/bdc/standaloneTypes";
import { buildStandaloneBdcDocument } from "@/lib/bdc/standaloneDocuments";
it("reprend les contenus IA sans modifier identité, prix, durée, présences ni signatures", () => {
  const d = emptyBdcData(); d.formation.duree = "22"; d.formation.tarif = "1990"; d.beneficiaire.nom = "TEST"; d.organisme.tamponUrl = "tampon-fourni";
  const result = applyBdcAI(d, { besoins: "Analyse personnalisée", programme: "Trois phases adaptées", duree: "24", tarif: "0", nom: "Inventé", tamponUrl: "Inventé" });
  expect(result.declarations.besoins).toBe("Analyse personnalisée"); expect(result.formation.programme).toBe("Trois phases adaptées");
  expect(result.formation.duree).toBe("22"); expect(result.formation.tarif).toBe("1990"); expect(result.beneficiaire).toEqual(d.beneficiaire); expect(result.organisme).toEqual(d.organisme); expect(result.sessions).toEqual([]);
});
it("intègre les contenus rédigés sans mention de proposition IA et garde les signatures", () => {
  const d = emptyBdcData(); d.beneficiaire.signatureUrl = "data:image/png;base64,TESTSIGNATURE";
  const generated = applyBdcAI(d, { besoins: "Demande exprimée", reponses: { besoins_1: "Je souhaite évoluer vers la formation." } });
  const html = buildStandaloneBdcDocument(generated, "besoins");
  expect(html).not.toContain("PROPOSITION RÉDIGÉE AVEC IA");
  expect(html).toContain("Je souhaite évoluer vers la formation.");
  expect(html).toContain("TESTSIGNATURE");
});
it("n'écrit un compte rendu que pour une séance passée avec présence confirmée", () => {
  const d = emptyBdcData();
  const base = { phase: 1 as const, heureDebut: "09:00", heureFin: "12:00", duree: 3, modalite: "presentiel" as const, objet: "x", compteRendu: "" };
  d.sessions = [{ ...base, numero: 1, date: "2026-01-05", presence: true }, { ...base, numero: 2, date: "2026-01-06", presence: false }, { ...base, numero: 3, date: "2099-01-05", presence: true }];
  const r = applyBdcAI(d, { comptesRendus: [1, 2, 3].map(numero => ({ numero, texte: `CR ${numero}` })) }, new Date("2026-06-01"));
  expect(r.sessions.map(s => s.compteRendu)).toEqual(["CR 1", "", ""]);
});
it("règle de paiement automatique pour un financement personnel sans somme avant rétractation", () => {
  const d = emptyBdcData(); d.organisme.nom = "ORG"; d.beneficiaire.financeur = "Personnel";
  const html = buildStandaloneBdcDocument(d, "contrat");
  expect(html).toContain("Aucune somme n’est exigée avant l’expiration du délai de rétractation");
  expect(html).toContain("30 %");
});
