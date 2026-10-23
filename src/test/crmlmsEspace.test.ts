import { afterEach, describe, expect, it } from "vitest";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
import { origineAutorisee } from "@/lib/izilearn/bridge";
import { definirPlateforme } from "@/lib/izilearn/plateforme";
import { installerContenu } from "@/lib/izilearn/contenu";
import type { IzPayload } from "@/lib/izilearn/types";

const payload = (app: IzPayload["source"]["app"]): IzPayload => ({
  version: 1,
  source: { app, url: "https://crmlms.lovable.app", orgId: "o", sessionId: "s" },
  organisme: { id: "o", nom: "ORGANISME TEST", siret: "12345678900011", nda: "11000000000", adresse: "1 rue de Paris", codePostal: "75001", ville: "Paris", email: "contact@organisme-test.fr", dirigeant: "Jean MARTIN" },
  formation: { id: "f", intitule: "Anglais professionnel", typeAction: "actions-formation", dureeHeures: 14, modules: [{ titre: "Accueil" }], blocs: [] },
  session: { id: "s", code: "S1", dateDebut: "2026-11-02", dateFin: "2026-11-03", modalite: "distanciel", formateur: "Paul DURAND" },
  creneaux: [],
  apprenants: [{ inscriptionId: "e1", contactId: "c1", prenom: "Ana", nom: "LOPEZ", statut: "inscrit", signatures: [], connexions: [{ debut: "2026-11-02T09:00:00", fin: "2026-11-02T10:00:00", secondes: 3600, source: "lms" }] }],
});

describe("Espace CRM LMS", () => {
  afterEach(() => definirPlateforme("izilearn"));

  it("accepte uniquement les origines CRM LMS pour /crmlms", () => {
    expect(origineAutorisee("https://crmlms.lovable.app", "crmlms")).toBe(true);
    expect(origineAutorisee("https://id-preview--7487037a-cf01-4bbe-9898-0e1b6d13ef37.lovable.app", "crmlms")).toBe(true);
    expect(origineAutorisee("https://izilearn.netlify.app", "crmlms")).toBe(false);
    expect(origineAutorisee("https://crmlms.lovable.app", "izilearn")).toBe(false);
    expect(origineAutorisee("https://crmlms.lovable.app.evil.com", "crmlms")).toBe(false);
  });

  it("nomme CRM LMS dans les pièces, jamais IZILearn", () => {
    const pieces = planPieces(contexte(payload("crmlms")));
    const connexion = pieces.find((x) => x.categorie === "connexion");
    expect(connexion?.rendre()).toContain("CRM LMS");
    for (const p of pieces.filter((x) => !x.pdf)) expect(p.rendre()).not.toContain("IZILearn");
  });

  it("formation LILATE de CRM LMS : support de cours tiré du contenu intégré", () => {
    const pl = payload("crmlms");
    pl.formation = { ...pl.formation, intitule: "Anglais professionnel — LILATE", codeCertification: "RS7314" };
    const cx = contexte(pl);
    installerContenu(cx.p, cx.f);
    const support = planPieces(cx).find((x) => x.categorie === "support");
    expect(support?.rendre()).toContain("Mon projet professionnel en anglais");
  });

  it("garde IZILearn pour les sessions IZILearn", () => {
    const connexion = planPieces(contexte(payload("izilearn"))).find((x) => x.categorie === "connexion");
    expect(connexion?.rendre()).toContain("IZILearn / Google Meet");
  });
});
