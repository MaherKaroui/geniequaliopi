import { afterEach, describe, expect, it, vi } from "vitest";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
import { installerContenu } from "@/lib/izilearn/contenu";
import { definirPlateforme } from "@/lib/izilearn/plateforme";
import type { IzPayload } from "@/lib/izilearn/types";

// Payload tel que l'envoie CRM LMS pour ses deux formations LILATE (données de la table formations).
const FORMATIONS = {
  en: { intitule: "Anglais professionnel — LILATE", code: "RS7314", dialogue: /\b(you|please|thank)\b/i },
  fle: { intitule: "Français langue étrangère — LILATE", code: "RS6916", dialogue: /\b(vous|bonjour|merci)\b/i },
};

function payload(k: keyof typeof FORMATIONS): IzPayload {
  const f = FORMATIONS[k];
  const jours = ["2026-09-28", "2026-09-29", "2026-09-30", "2026-10-01", "2026-10-02"];
  return {
    version: 1,
    source: { app: "crmlms", url: "https://crmlms.lovable.app", orgId: "o", sessionId: "s" },
    organisme: { id: "o", nom: "ORGANISME TEST", siret: "12345678900011", nda: "11000000000", adresse: "1 rue de Paris", codePostal: "75001", ville: "Paris", email: "contact@organisme-test.fr", dirigeant: "Jean MARTIN" },
    formation: {
      id: "f", intitule: f.intitule, code: f.code, codeCertification: f.code, typeAction: "actions-formation", dureeHeures: 30,
      objectifs: "Communiquer en situation professionnelle : accueillir, recueillir, transmettre, exploiter des documents.",
      modules: [{ titre: "Positionnement" }, { titre: "Accueil" }], blocs: [{ code: f.code, intitule: f.intitule, competences: ["C1 — Accueillir", "C2 — Recueillir", "C3 — Transmettre", "C4 — Consulter"] }],
    },
    session: { id: "s", code: `${f.code}-20260928`, dateDebut: jours[0], dateFin: jours[4], modalite: "distanciel", formateur: "Paul DURAND" },
    creneaux: jours.map((j) => ({ id: j, debut: `${j}T09:00:00`, fin: `${j}T12:00:00`, demiJournee: "matin" as const, mode: "distanciel" })),
    apprenants: ["Léa|MARTIN", "Mai|NGUYEN", "Omar|BENALI"].map((x, i) => {
      const [prenom, nom] = x.split("|");
      return { inscriptionId: `e${i}`, contactId: `c${i}`, prenom, nom, statut: "inscrit", signatures: [], connexions: [] };
    }),
  };
}

describe("CRM LMS → Génie Qualiopi : formations LILATE", () => {
  afterEach(() => { vi.useRealTimers(); definirPlateforme("izilearn"); });

  for (const k of ["en", "fle"] as const) {
    it(`${FORMATIONS[k].code} : support LILATE et copies propres à chaque stagiaire`, () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-10-20T10:00:00Z"));
      const cx = contexte(payload(k));
      installerContenu(cx.p, cx.f);
      const pieces = planPieces(cx);
      const support = pieces.find((p) => p.categorie === "support")!.rendre();
      expect(support).toMatch(FORMATIONS[k].dialogue);
      for (const cat of ["exercices", "examen_final", "positionnement"] as const) {
        const copies = pieces.filter((p) => p.categorie === cat).map((p) => p.rendre().replace(/MARTIN|NGUYEN|BENALI|Léa|Mai|Omar/g, ""));
        expect(copies.length, cat).toBeGreaterThanOrEqual(3);
        expect(new Set(copies).size, `${cat} : copies identiques entre stagiaires`).toBe(copies.length);
      }
      for (const p of pieces.filter((x) => !x.pdf)) expect(p.rendre()).not.toContain("IZILearn");
    });
  }
});
