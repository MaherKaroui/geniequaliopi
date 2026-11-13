import { describe, expect, it } from "vitest";
import { lireDossierPdfEdof } from "@/lib/edofAuto/candidats";

// Texte tel que pdf.js le sort d'un « Export_PDF_dossier_n_… » (dossier fictif).
const texte = [
  "DOSSIER N° 400000000001 - MARTIN-DUPONT CAMILLE Notifications (1)  Vous avez fait une erreur en déclarant le service fait ?  Poser des extensions de cils  Certification :   Mettre en valeur le regard par la pose d'extensions et le rehaussement de cils  Session du 02/11/2026 au 07/11/2026  TITULAIRE  Titulaire  MARTIN-DUPONT Camille Anne  Sans diplôme ou diplôme national du Brevet (NIVEAU 2)  camille.exemple@exemple.fr  06 12 34 56 78  10 Rue de l’Exemple 75011 PARIS  ACTION  Synthèse de l'action  Poser des extensions de cils  Session du 02/11/2026 au 07/11/2026  Par CENTRE EXEMPLE FORMATION  40 RUE DU CENTRE 93450 L ILE ST DENIS  41.0 heures de formation au total - en présentiel  Description de l'offre  Objectif pédagogique  certification RS7650.  13/11/2026 - 13:53   Dossier N° 400000000001 - MARTIN-DUPONT Camille Anne Page 1/4 https://of.moncompteformation.gouv.fr",
  "Identifiants  Offre  Abd1  Action  Abd4  Session  Ad8  13/11/2026 - 13:53   Dossier N° 400000000001 - MARTIN-DUPONT Camille Anne Page 3/4",
  "HISTORIQUE  Date   Evènement   Auteur 12-10-2026 à 13:26   Envoi demande d'inscription   Titulaire 02-11-2026 à 08:45   Déclaration Entrée en Formation   Organisme 09-11-2026 à 10:00   Déclaration Sortie de formation   Organisme 09-11-2026 à 10:00   Déclaration service fait   Organisme Taux de réalisation : 100 %",
].join("\n");

describe("dossier EDOF exporté en PDF", () => {
  it("lit le stagiaire, la session, la certification et l'organisme", () => {
    const d = lireDossierPdfEdof(texte)!;
    expect(d.candidat).toMatchObject({
      numeroDossier: "400000000001", nom: "MARTIN-DUPONT", prenom: "Camille Anne", civilite: "", dateNaissance: "",
      adresse: "10 Rue de l'Exemple", codePostal: "75011", ville: "PARIS", email: "camille.exemple@exemple.fr", telephone: "06 12 34 56 78",
      codeCertif: "RS7650", intitule: "Mettre en valeur le regard par la pose d'extensions et le rehaussement de cils",
      numeroSession: "Ad8", dateDebut: "2026-11-02", dateFin: "2026-11-07", dateInscription: "2026-10-12", statut: "Service fait déclaré",
    });
    expect(d.centre).toEqual({ nom: "CENTRE EXEMPLE FORMATION", adresse: "40 RUE DU CENTRE 93450 L ILE ST DENIS", ville: "L ILE ST DENIS" });
  });

  it("refuse un PDF qui n'est pas un dossier EDOF", () => {
    expect(lireDossierPdfEdof("Facture n° 12 — Total 1 500 €")).toBeNull();
  });
});
