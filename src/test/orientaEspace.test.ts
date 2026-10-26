import { afterEach, describe, expect, it } from "vitest";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
import { origineAutorisee } from "@/lib/izilearn/bridge";
import { definirPlateforme } from "@/lib/izilearn/plateforme";
import { installerContenu } from "@/lib/izilearn/contenu";
import { intituleOrienta } from "@/lib/izilearn/orienta";
import { PBNC_FORMATIONS, VTEST_FORMATIONS } from "@/lib/orientaFormations";
import type { IzPayload } from "@/lib/izilearn/types";

const payload = (code: string, intitule: string, cert: string): IzPayload => ({
  version: 1,
  source: { app: "orienta", url: "https://orienta-campus.lovable.app", orgId: "o", sessionId: "s" },
  organisme: { id: "o", nom: "ORGANISME TEST", siret: "12345678900011", nda: "11000000000", adresse: "1 rue de Paris", codePostal: "75001", ville: "Paris", email: "contact@organisme-test.fr", dirigeant: "Jean MARTIN" },
  formation: { id: "f", intitule, code, codeCertification: cert, typeAction: "actions-formation", dureeHeures: 21, modules: [{ titre: "Module 1" }], blocs: [] },
  session: { id: "s", code: "S1", dateDebut: "2026-11-02", dateFin: "2026-12-18", modalite: "distanciel", formateur: "Paul DURAND" },
  creneaux: [],
  apprenants: [{ inscriptionId: "e1", contactId: "c1", prenom: "Ana", nom: "LOPEZ", statut: "inscrit", signatures: [], connexions: [{ debut: "2026-11-02T09:00:00", fin: "2026-11-02T10:00:00", secondes: 3600, source: "lms" }] }],
});

describe("Espace Orienta Campus", () => {
  afterEach(() => definirPlateforme("izilearn"));

  it("accepte uniquement les origines Orienta Campus pour /orienta", () => {
    expect(origineAutorisee("https://orienta-campus.lovable.app", "orienta")).toBe(true);
    expect(origineAutorisee("https://id-preview--9cd33bca-1e4c-42ac-9e72-b4f116584093.lovable.app", "orienta")).toBe(true);
    expect(origineAutorisee("https://orienta-campus.lovable.app.evil.com", "orienta")).toBe(false);
    expect(origineAutorisee("https://izilearn.netlify.app", "orienta")).toBe(false);
    expect(origineAutorisee("https://orienta-campus.lovable.app", "izilearn")).toBe(false);
  });

  it("rattache les parcours d'Orienta Campus aux formations du catalogue", () => {
    expect(intituleOrienta("A2-21H", "Parcours A2 — 21 h")).toBe(VTEST_FORMATIONS[0].intitule);
    expect(intituleOrienta("C1-50H", "Parcours C1 — 50 h")).toBe(VTEST_FORMATIONS[3].intitule);
    expect(intituleOrienta("PBNC-420H", "Product Builder No-Code — titre complet (420 h)")).toBe(PBNC_FORMATIONS[0].intitule);
    expect(intituleOrienta("PBNC-BC03-105H", "x")).toBe(PBNC_FORMATIONS[3].intitule);
    expect(intituleOrienta("", "Product Builder No-Code — Bloc 2 : Piloter (105 h)")).toBe(PBNC_FORMATIONS[2].intitule);
    expect(intituleOrienta("ZZ-1", "Atelier interne")).toBe("Atelier interne");
  });

  it.each([["B1-21H", "Parcours B1 — 21 h", "RS6905"], ["PBNC-BC01-105H", "Product Builder No-Code — Bloc 1 : Concevoir (105 h)", "RNCP41480"]] as const)(
    "%s : contenu dédié du catalogue, pièces au nom d'Orienta Campus", (code, titre, cert) => {
      definirPlateforme("orienta");
      const cx = contexte(payload(code, titre, cert));
      expect(cx.f.codeRNCP).toBe(cert);
      expect(installerContenu(cx.p, cx.f)).toBe("dedie");
      const pieces = planPieces(cx);
      expect(pieces.find((x) => x.categorie === "support")?.rendre()).toContain(cert === "RS6905" ? "B1-M1" : "Analyse du besoin et cadrage du projet");
      expect(pieces.find((x) => x.categorie === "connexion")?.rendre()).toContain("ORGANISME TEST");
      for (const p of pieces.filter((x) => !x.pdf)) expect(p.rendre()).not.toContain("IZILearn");
    });
});
