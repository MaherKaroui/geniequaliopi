import type { OrganismeInfo } from "@/types/qualiopi";
import { buildDocument } from "./docBuilder";

/** Identités demandées, sans reprendre les données administratives des presets. */
export const FORMATIONS_CENTRE_IND22 = [
  {
    id: "gestion_centre",
    nom: "Gérer son centre",
    objectif: "Piloter l’activité du centre de formation, organiser le suivi administratif et pédagogique, suivre les obligations déclaratives et la démarche qualité.",
    famille: "qualite" as const,
  },
  {
    id: "make_airtable",
    nom: "Automatisation Make et Airtable",
    objectif: "Structurer les données dans Airtable, relier les outils avec Make et automatiser le suivi des inscriptions, des dossiers et des relances.",
    famille: "numerique" as const,
  },
] as const;

export function genProjetAttestationCentreInd22(o: OrganismeInfo, formationId: string): string {
  const formation = FORMATIONS_CENTRE_IND22.find((item) => item.id === formationId);
  if (!formation) throw new Error("Formation IND 22 inconnue");
  const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return buildDocument({
    org: o,
    title: "PROJET D’ATTESTATION DE FORMATION",
    subtitle: `Indicateur 22 — ${formation.nom}`,
    sections: [
      { heading: "Préparation", content: `<p>Projet préparé le ${date} pour ${o.nom}. Ce document n’est pas une attestation délivrée par IZIBUSINESS et ne constitue pas une preuve de réalisation.</p>` },
      { heading: "Formation", content: `<p><strong>Intitulé :</strong> ${formation.nom}<br><strong>Prestataire indiqué :</strong> IZIBUSINESS<br><strong>Intervenante indiquée :</strong> Nadine DENDANI</p>` },
      { heading: "Informations nécessaires à l’émission", content: "<p>Nom du participant, dates et durée effectivement suivies à confirmer auprès d’IZIBUSINESS. Aucune date de session, durée, réussite ou assiduité n’a été déduite du dossier des apprenants.</p>" },
      { heading: "Validation par le prestataire", content: "<p>À faire vérifier et signer par IZIBUSINESS avant utilisation comme justificatif IND 22. Aucune signature ni aucun tampon n’est apposé sur ce projet.</p>" },
    ],
  });
}