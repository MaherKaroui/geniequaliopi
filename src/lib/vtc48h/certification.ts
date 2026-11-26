/**
 * IND 16 pour la préparation VTC (RS5637) : l'examen T3P est organisé par la chambre de métiers et
 * de l'artisanat (CMA) et le candidat s'y inscrit lui-même sur exament3p.fr. L'organisme ne convoque
 * donc personne : il accompagne l'inscription et conserve la convocation émise par la CMA.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, tableHTML, formatDate, getStagiaireDateDebut, getStagiaireDateFin } from "../docBuilder";

const CERTIF = "RS5637 — Habilitation pour l'accès à la profession de conducteur de voiture de transport avec chauffeur (VTC)";
const ORGANISATEUR = "Chambre de métiers et de l'artisanat (CMA) de la région du candidat — inscription sur exament3p.fr";

export function genProcedureCertificationVTC48(o: OrganismeInfo, f: FormationInfo): string {
  const resp = o.responsablePedagogique || o.dirigeant;
  return buildDocument({ org: o, title: "PROCÉDURE D'ACCOMPAGNEMENT À L'EXAMEN VTC", subtitle: CERTIF, sections: [
    { heading: "1. Objet", content: `<p>Cette procédure décrit comment <strong>${o.nom}</strong> accompagne les stagiaires de la formation <strong>${f.intitule}</strong> jusqu'à l'examen d'accès à la profession de conducteur VTC. La certification est délivrée par le ministère chargé des transports ; l'examen est organisé par la CMA. <strong>${o.nom} n'organise pas l'examen, n'émet aucune convocation et ne transmet aucun dossier de candidature : le candidat s'inscrit lui-même.</strong></p>` },
    { heading: "2. Étapes", content: tableHTML(["Étape", "Action", "Responsable", "Preuve conservée"], [
      ["1", "Information sur l'examen dès l'entretien préalable : épreuves d'admissibilité A à G, épreuve pratique d'admission, calendrier et frais publiés par la CMA", resp, "Compte rendu d'entretien, programme"],
      ["2", "Atelier d'inscription en fin de formation (jour 20) : création du compte et dépôt de la candidature par le stagiaire sur exament3p.fr", "Formateur", "Fiche d'accompagnement à l'inscription signée"],
      ["3", "Demande d'aménagement d'épreuves adressée par le candidat à la CMA, si besoin", o.referentHandicap || resp, "Copie de la demande (le cas échéant)"],
      ["4", "Réception de la convocation émise par la CMA ; le stagiaire en transmet une copie à l'organisme", "Stagiaire", "Convocation CMA ou récapitulatif d'inscription exament3p"],
      ["5", "Recueil du résultat (relevé de notes de la CMA) et proposition d'une remise à niveau en cas d'échec", resp, "Fiche de suivi de la présentation à la certification"],
    ]), variant: "green" },
    { heading: "3. Pièces émises par la CMA (à joindre, jamais à reproduire)", content: `<ul><li>Récapitulatif d'inscription exament3p.fr</li><li>Convocation aux épreuves d'admissibilité, puis à l'épreuve pratique d'admission</li><li>Relevé de notes / résultat de l'examen</li></ul>` },
  ] });
}

export function genInscriptionExamenVTC48(o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo): string {
  const fin = getStagiaireDateFin(s, f);
  const nom = `${s.civilite ? s.civilite + " " : ""}${s.prenom} ${s.nom}`;
  return buildDocument({ org: o, title: "FICHE D'ACCOMPAGNEMENT À L'INSCRIPTION À L'EXAMEN VTC", subtitle: `${nom} — ${CERTIF}`, sections: [
    { heading: "Stagiaire et parcours", content: tableHTML(["Élément", "Détail"], [
      ["Stagiaire", nom],
      ["Formation suivie", `${f.intitule}, du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(fin)}`],
      ["Certification visée", CERTIF],
      ["Organisateur de l'examen", ORGANISATEUR],
    ]) },
    { heading: "Accompagnement réalisé par l'organisme", content: `<p>Le ${formatDate(fin)}, lors de l'atelier d'inscription, le formateur a présenté le déroulé de l'examen et accompagné ${nom} dans le dépôt de sa candidature sur exament3p.fr. L'inscription, le choix de la session et le paiement des frais d'examen sont faits par le candidat lui-même auprès de la CMA.</p>` },
    { heading: "Pièces à joindre (émises par la CMA)", content: `<p>☐ Récapitulatif d'inscription exament3p.fr &nbsp;&nbsp; ☐ Convocation de la CMA aux épreuves d'admissibilité &nbsp;&nbsp; ☐ Convocation à l'épreuve pratique d'admission &nbsp;&nbsp; ☐ Résultat de l'examen</p><p><em>${o.nom} n'émet pas de convocation : seules les pièces de la CMA font foi.</em></p>`, variant: "orange" },
  ], stagiaires: [s], signatures: { type: "2", labels: ["Le formateur", "Le stagiaire"], names: [f.formateur || o.dirigeant, `${s.prenom} ${s.nom}`], dates: [formatDate(fin), formatDate(fin)], noOrgSignature: true } });
}
