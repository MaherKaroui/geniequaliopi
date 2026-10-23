import { describe, expect, it } from "vitest";
import { contexte, planPieces } from "@/lib/izilearn/pieces";
import type { IzApprenant, IzPayload, IzSlot } from "@/lib/izilearn/types";

function creneaux(debut: string, nbJours: number): IzSlot[] {
  const out: IzSlot[] = [];
  const d = new Date(`${debut}T00:00:00`);
  while (out.length < nbJours * 2) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      const j = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      out.push({ id: `${j}-m`, debut: `${j}T09:00:00`, fin: `${j}T12:30:00`, demiJournee: "matin", mode: "presentiel" });
      out.push({ id: `${j}-a`, debut: `${j}T13:30:00`, fin: `${j}T17:00:00`, demiJournee: "apres_midi", mode: "presentiel" });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

const apprenant = (i: number, extra: Partial<IzApprenant> = {}): IzApprenant => ({
  inscriptionId: `e${i}`, contactId: `c${i}`, civilite: "M.", prenom: `Prenom${i}`, nom: `NOM${i}`,
  email: `a${i}@exemple.fr`, statut: "inscrit", signatures: [], connexions: [], ...extra,
});

function payload(extra: Partial<IzApprenant> = {}): IzPayload {
  const slots = creneaux("2026-09-07", 3);
  const fin = slots[slots.length - 1].debut.slice(0, 10);
  return {
    version: 1,
    source: { app: "izilearn", url: "http://localhost:5173", orgId: "o", sessionId: "s" },
    organisme: { id: "o", nom: "ORGANISME TEST", siret: "12345678900011", nda: "11000000000", adresse: "1 rue de Paris", codePostal: "75001", ville: "Paris", email: "c@o.fr", dirigeant: "Jean MARTIN" },
    formation: { id: "f", intitule: "Gérer un projet digital", typeAction: "actions-formation", objectifs: "Cadrer un projet\nPiloter le planning", dureeHeures: 21, tarif: "1 500 €", modules: [], blocs: [] },
    session: { id: "s", code: "S1", dateDebut: "2026-09-07", dateFin: fin, modalite: "presentiel", formateur: "Paul DURAND" },
    creneaux: slots,
    apprenants: [apprenant(1, { entreprise: { nom: "ACME" }, ...extra })],
  };
}

const renduBesoins = (p: IzPayload) => planPieces(contexte(p)).find((x) => x.id === "besoins_0");

describe("IZILearn — évaluation des besoins remplie comme Qualiopi", () => {
  it("sans réponse enregistrée : document Qualiopi complet, jamais de trame vide", () => {
    const piece = renduBesoins(payload());
    expect(piece?.source).toBe("document");
    const html = piece?.rendre() || "";
    expect(html).toContain("PARTIE APPRENANT");
    expect(html).toContain("PARTIE ENTREPRISE");
    expect(html).not.toContain("Trame à compléter");
    expect(html).not.toContain("Sans réponse");
    // Chaque question a une réponse rédigée (cellule de tableau non vide).
    const cellules = [...html.matchAll(/<td>([^<]{15,})<\/td>/g)].length;
    expect(cellules).toBeGreaterThanOrEqual(8);
  });

  it("une coquille de questionnaire vide ne bloque pas le remplissage", () => {
    const vide = { titre: "Besoins", date: "2026-09-01", reponses: [{ question: "Objectif ?", reponse: "  " }] };
    const piece = renduBesoins(payload({ besoins: vide, besoinsEntreprise: vide }));
    expect(piece?.source).toBe("document");
    expect(piece?.rendre()).toContain("PARTIE APPRENANT");
  });

  it("les réponses réellement enregistrées remplacent les réponses générées, question par question", () => {
    const p = payload({
      besoins: {
        titre: "Besoins", date: "2026-09-01",
        reponses: [
          { question: "Quel objectif professionnel ou personnel souhaitez-vous atteindre grâce à cette formation ?", reponse: "Devenir chef de projet digital confirmé" },
          { question: "Quel est le dernier diplôme ou titre que vous avez obtenu ?", reponse: "" },
        ],
      },
      besoinsEntreprise: {
        titre: "Besoins entreprise", date: "2026-09-01",
        reponses: [{ question: "Quelles sont vos attentes et objectifs pour vous-même et/ou votre salarié dans le cadre de cette formation ?", reponse: "Qu'il pilote seul nos refontes de site" }],
      },
    });
    const piece = renduBesoins(p);
    expect(piece?.source).toBe("izilearn");
    const html = piece?.rendre() || "";
    // Réponses enregistrées présentes…
    expect(html).toContain("Devenir chef de projet digital confirmé");
    expect(html).toContain("Qu'il pilote seul nos refontes de site");
    // …et le reste reste rempli comme Qualiopi (diplôme généré, pas de case vide).
    expect(html).not.toContain("Sans réponse");
    expect(html).not.toContain("Trame à compléter");
    expect(html).toContain("PARTIE ENTREPRISE");
  });

  it("un placeholder « Non renseigné » ne remplace pas la réponse générée", () => {
    const p = payload({
      besoins: {
        titre: "Besoins", date: "2026-09-01",
        reponses: [{ question: "Quel est le dernier diplôme ou titre que vous avez obtenu ?", reponse: "Non renseigné" }],
      },
    });
    const html = renduBesoins(p)?.rendre() || "";
    // La réponse à la question diplôme n'est pas le placeholder : la réponse générée est conservée.
    const m = html.match(/dernier diplôme[\s\S]{0,300}?<td>([^<]*)<\/td>/);
    expect(m?.[1]?.trim().length).toBeGreaterThan(5);
    expect(m?.[1]).not.toBe("Non renseigné");
  });
});
