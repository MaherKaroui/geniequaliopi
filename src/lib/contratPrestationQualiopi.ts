import type { OrganismeInfo } from "@/types/qualiopi";
import { buildDocument, formatDate } from "./docBuilder";
import type { ActionType } from "./docCatalog";

const esc = (value: string) => String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const FD_CERTIF_PRESTATAIRE = {
  nom: "FD CERTIF EXPERT", forme: "Société par actions simplifiée (SAS)",
  siren: "988018479", siret: "98801847900010", tva: "FR65988018479",
  adresse: "15 RUE AUGUSTE GERVAIS, 92130 ISSY-LES-MOULINEAUX",
  capital: "100,00 €", rcs: "Nanterre", dateImmatriculation: "2025-06-18",
  representante: "Madame Nadine Dendani", qualite: "Présidente",
  signatureUrl: "/images/FD_CERTIF_TAMPON.png",
} as const;

const PERIMETRES: Record<ActionType, string> = {
  "actions-formation": "actions de formation",
  apprentissage: "actions de formation par apprentissage (CFA)",
  "bilans-competences": "bilans de compétences",
  vae: "actions permettant de faire valider les acquis de l'expérience (VAE)",
};

/** Conditions du modèle fourni ; la date de MAJ du dossier fixe la prise d'effet. */
export function conditionsPrestationQualiopi(o: OrganismeInfo, action?: ActionType) {
  const debut = /^\d{4}-\d{2}-\d{2}$/.test(o.dateMaj || "") ? o.dateMaj : new Date().toISOString().slice(0, 10);
  const fin = new Date(`${debut}T12:00:00Z`);
  // Même jour cinq ans plus tard, borné au dernier jour du mois (29 février).
  const mois = fin.getUTCMonth();
  fin.setUTCFullYear(fin.getUTCFullYear() + 5);
  if (fin.getUTCMonth() !== mois) fin.setUTCDate(0);
  fin.setUTCDate(fin.getUTCDate() - 1);
  const types = action ? [action] : o.typesActions.length ? o.typesActions : ["actions-formation" as const];
  return { debut, fin: fin.toISOString().slice(0, 10), dureeAnnees: 5, miseEnDemeureJours: 30,
    types, perimetre: types.map(t => PERIMETRES[t]).join(" ; "), prestataire: FD_CERTIF_PRESTATAIRE };
}

/** Prestation qualité externe distincte des contrats de formateurs et de bénéficiaires. */
export function genContratPrestationQualiopi(o: OrganismeInfo, action?: ActionType): string {
  const c = conditionsPrestationQualiopi(o, action);
  const p = c.prestataire;
  const date = formatDate(c.debut);
  const adresse = [o.adresse, [o.codePostal, o.ville].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const siret = (o.siret || "").replace(/\s/g, "");
  const signatures = () => `<div class="signature-block-2">
    <div class="sig-box"><p class="sig-label">Pour le Donneur d’ordre : ${esc(o.nom)}</p>${o.dirigeant ? `<p>${esc(o.dirigeant)}, représentant de l’organisme</p>` : ""}<p>Date : ${date}</p><p>Signature et cachet :</p>${o.tamponUrl ? `<img src="${esc(o.tamponUrl)}" alt="Tampon du donneur d'ordre" style="max-height:70px;max-width:180px;object-fit:contain" />` : o.signatureUrl ? `<img src="${esc(o.signatureUrl)}" alt="Signature du donneur d'ordre" style="max-height:70px;max-width:180px;object-fit:contain" />` : ""}</div>
    <div class="sig-box"><p class="sig-label">Pour le Prestataire : ${p.nom}</p><p>${p.representante}, ${p.qualite}</p><p>Date : ${date}</p><p>Signature et cachet :</p><img src="${p.signatureUrl}" alt="Signature et tampon FD CERTIF EXPERT" style="max-height:70px;max-width:180px;object-fit:contain" /></div>
  </div>`;
  return buildDocument({ org: o,
    title: "CONTRAT DE SOUS-TRAITANCE DE PRESTATION DE SERVICES ET MANDAT DE REPRÉSENTATION",
    subtitle: `Accompagnement qualité Qualiopi — ${c.perimetre}`,
    sections: [
      { heading: "Entre les soussignés", content: `<p><strong>Le Donneur d’ordre : ${esc(o.nom)}</strong>${adresse ? `<br>Adresse : ${esc(adresse)}` : ""}${siret ? `<br>SIRET : ${esc(o.siret)}${siret.length === 14 ? `<br>SIREN : ${siret.slice(0, 9)}` : ""}` : ""}${o.nda ? `<br>Numéro de déclaration d’activité : ${esc(o.nda)}` : ""}${o.dirigeant ? `<br>Représenté par ${esc(o.dirigeant)}` : ""}<br>Ci-après dénommé « le Donneur d’ordre ».</p><p><strong>ET</strong></p><p><strong>Le Prestataire : ${p.nom}</strong><br>${p.forme}<br>SIREN : ${p.siren}<br>SIRET : ${p.siret}<br>Numéro de TVA : ${p.tva}<br>Adresse : ${p.adresse}<br>Capital social : ${p.capital}<br>Inscrite au RCS ${p.rcs} sous le numéro ${p.siren} le ${formatDate(p.dateImmatriculation)}<br>Représentée par ${p.representante}, ${p.qualite}<br>Ci-après dénommée « le Prestataire ».</p><p>Il a été convenu ce qui suit :</p>` },
      { heading: "Article 1 — Objet du contrat", content: `<p>Le Donneur d’ordre confie au Prestataire des prestations de services d’accompagnement qualité relatives à ses ${c.perimetre}, en fonction de ses besoins et des indicateurs du Référentiel national qualité applicables.</p><ul><li><strong>Référente qualité externe :</strong> supervision et suivi des processus qualité, actualisation du système documentaire et suivi de la conformité Qualiopi.</li><li><strong>Accompagnement aux audits Qualiopi :</strong> préparation, suivi et représentation dans les limites du mandat défini à l’article 5.</li><li><strong>Accompagnement du centre :</strong> conseil et appui dans la mise en œuvre des démarches qualité et l’amélioration continue.</li></ul><p>Le présent contrat ne confie pas au Prestataire l’exécution des formations, des bilans ou de l’accompagnement VAE auprès des personnes. Ces interventions éventuelles nécessitent un contrat distinct. La responsabilité du Donneur d’ordre et la décision du certificateur restent inchangées.</p>` },
      { heading: "Article 2 — Durée du contrat", content: `<p>Le présent contrat est conclu pour une durée de <strong>cinq (5) ans</strong>, du <strong>${date}</strong> au <strong>${formatDate(c.fin)}</strong>, sauf résiliation anticipée dans les conditions prévues à l’article 8. Toute prolongation fait l’objet d’un accord écrit des parties.</p>` },
      { heading: "Article 3 — Rémunération", content: `<p>La rémunération des prestations est fixée dans un acte séparé sous forme d’une grille de prix, établie conjointement par les parties et annexée au présent contrat. Le périmètre facturé, les modalités de facturation et les délais de paiement sont précisés dans cet acte. Aucun montant n’est déduit du tarif des formations ou prestations destinées aux bénéficiaires.</p>` },
      { heading: "Article 4 — Obligations du Prestataire", content: `<ul><li>Fournir des prestations conformes aux exigences de qualité convenues et au Référentiel national qualité applicable au périmètre du Donneur d’ordre.</li><li>Participer à un entretien annuel avec le Donneur d’ordre pour vérifier le respect des engagements Qualiopi et suivre les actions d’amélioration.</li><li>Mettre à jour ses compétences et connaissances pour répondre aux missions confiées.</li><li>Respecter les plannings et consignes convenus, informer le Donneur d’ordre des difficultés et assurer la traçabilité des travaux.</li></ul><p>Le Donneur d’ordre fournit des informations exactes et les pièces nécessaires, désigne un interlocuteur disponible et valide les documents et actions proposés. Aucun justificatif de réalisation ou de conformité ne doit être fabriqué.</p>` },
      { heading: "Article 5 — Mandat de représentation et conformité Qualiopi", content: `<p>Le Donneur d’ordre mandate expressément le Prestataire, représenté par ${p.representante}, pour représenter <strong>${esc(o.nom)}</strong> lors des audits de certification Qualiopi portant sur les ${c.perimetre}.</p><ul><li>Préparation des documents nécessaires à l’audit à partir des pièces du Donneur d’ordre.</li><li>Coordination avec les auditeurs et représentation du Donneur d’ordre lors des audits, selon les modalités acceptées par le certificateur.</li><li>Appui à la mise en œuvre et au suivi des actions correctives, en collaboration avec le Donneur d’ordre.</li></ul><p>Ce mandat n’autorise ni engagement financier, ni signature d’un contrat au nom du Donneur d’ordre, ni modification de son périmètre de certification sans autorisation écrite. Le Prestataire ne garantit pas l’obtention ou le maintien de la certification, qui relève du certificateur.</p><p>La charte qualité Qualiopi figurant en annexe 1 précise ses engagements. L’entretien annuel permet d’en évaluer le respect. En cas de non-conformité, des mesures correctives sont demandées ; à défaut de régularisation, le contrat peut être résilié conformément à l’article 8.</p>` },
      { heading: "Article 6 — Indépendance des parties", content: `<p>Le Prestataire exerce son activité de manière indépendante, sans lien de subordination avec le Donneur d’ordre. Il conserve la responsabilité de ses déclarations sociales et fiscales, de l’organisation de ses moyens et du respect de ses obligations professionnelles. Le présent contrat n’est pas un contrat de travail.</p>` },
      { heading: "Article 7 — Confidentialité et données personnelles", content: `<p>Le Prestataire préserve la confidentialité des informations, documents et données auxquels il accède pendant et après l’exécution du contrat. Les accès sont limités aux besoins de la mission et protégés conformément au RGPD. Les données ne sont utilisées que sur instruction du Donneur d’ordre ; toute sous-traitance de traitement nécessite les garanties et l’accord requis. Les incidents sont signalés sans délai et les données sont restituées ou supprimées à l’issue de la mission, sous réserve des obligations légales de conservation.</p>${c.types.includes("bilans-competences") ? "<p>Pour les bilans de compétences, les résultats détaillés et documents de synthèse restent confidentiels : leur communication à un tiers nécessite l’accord du bénéficiaire. Le contrôle qualité repose prioritairement sur des preuves administratives et anonymisées.</p>" : ""}` },
      { heading: "Article 8 — Résiliation", content: `<p>Le contrat peut être résilié par l’une ou l’autre des parties en cas de non-respect des obligations contractuelles après une mise en demeure restée sans effet pendant <strong>30 jours</strong>, de faute grave ou de cessation d’activité ou liquidation judiciaire, sous réserve des règles impératives applicables. La résiliation est notifiée par lettre recommandée avec accusé de réception.</p><p>Les parties organisent la restitution des documents et la clôture des accès. Les prestations effectivement réalisées sont réglées selon l’acte tarifaire convenu ; la confidentialité demeure applicable après la résiliation.</p>` },
      { heading: "Article 9 — Loi applicable et juridiction compétente", content: `<p>Le présent contrat est soumis au droit français. Les parties recherchent une solution amiable à tout différend relatif à son exécution ou à son interprétation. À défaut d’accord, le litige est soumis à la juridiction compétente selon les règles de droit commun.</p>` },
      { heading: "Article 10 — Annexes", content: `<p>Les documents suivants font partie intégrante du présent contrat :</p><ul><li>Annexe 1 : Charte qualité Qualiopi, reproduite ci-après.</li><li>Annexe 2 : Grille de prix et modalités de facturation et de paiement, acte séparé à établir et à accepter par les parties.</li></ul><p>Fait${o.ville ? ` à ${esc(o.ville)}` : ""}, le ${date}, en deux exemplaires originaux.</p>${signatures()}` },
      { heading: "Annexe 1 — Charte qualité Qualiopi", content: `<p>${p.nom}, représentée par ${p.representante}, s’engage à respecter les exigences Qualiopi applicables aux ${c.perimetre} du Donneur d’ordre :</p><ol><li><strong>Information des publics :</strong> contribuer à une information claire et accessible sur les prestations, objectifs, modalités et résultats.</li><li><strong>Identification des besoins :</strong> participer à l’analyse des besoins du Donneur d’ordre pour adapter les services rendus.</li><li><strong>Conception des prestations :</strong> contribuer à des prestations adaptées et cohérentes avec les objectifs définis.</li><li><strong>Mobilisation des ressources :</strong> mobiliser les moyens techniques et humains nécessaires à la qualité des missions confiées.</li><li><strong>Compétences du Prestataire :</strong> maintenir et actualiser ses compétences professionnelles.</li><li><strong>Suivi et évaluation :</strong> participer au suivi de la satisfaction des parties prenantes et à l’évaluation des prestations.</li><li><strong>Amélioration continue :</strong> signaler les dysfonctionnements et proposer des actions correctives suivies.</li></ol><p>Un entretien annuel avec le Donneur d’ordre vérifie ces engagements. Tout manquement entraîne une demande de correction ou une résiliation dans les conditions de l’article 8.</p><p><strong>Acceptation de la charte :</strong></p>${signatures()}` },
      { heading: "Annexe 2 — Grille de prix (acte séparé)", content: "<p>À établir conjointement par les parties : missions retenues, unités de facturation, prix et régime de TVA, modalités de facturation et de paiement. Cet acte tarifaire doit être accepté et joint au contrat ; aucune grille de prix signée n’est présumée exister.</p>" },
    ],
  });
}