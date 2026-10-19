// Critère 6 — IND 23-27 generators (based on real SELECT FORMATION documents)
import { mot } from "./resolveurFormation";
import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, subtractBusinessDays, cachetDirigeantHtml } from "./docBuilder";
import { entreesVeille, genVeilleExploitee } from "./veilleExploitee";
import { genVeilleSourcee } from "./piecesAF2026";
import type { TypePrestation } from "./qualite2026";




// ===== IND 23 / 24 / 25 — veilles exploitées =====
// L'ancien moteur datait les textes « date de début − n mois » (dates inventées) et citait des
// textes non vérifiés. Les veilles sont désormais produites par veilleExploitee.ts : parution
// réelle, source officielle, analyse d'impact et action propres à la formation saisie.

function typeDepuisOrganisme(o: OrganismeInfo): TypePrestation {
  const t = o.typesActions || [];
  return t.includes("apprentissage") ? "CFA" : t.includes("vae") ? "VAE" : t.includes("bilans-competences") ? "BC" : "AF";
}

/** Lignes de la veille réglementaire (utilisées par le générateur de preuves IND 23). */
export function getVeilleReglementaireRowsForFormation(f: FormationInfo, o?: OrganismeInfo): string[][] {
  const org = o || ({ nom: "", dateMaj: "", typesActions: ["actions-formation"] } as unknown as OrganismeInfo);
  return entreesVeille(org, f, "reglementaire", typeDepuisOrganisme(org)).map((e) => [
    `<a href="${e.url}">${e.source}</a>`, e.titre, e.parution, e.resume, `Impact : ${e.impact} Action : ${e.action}`,
  ]);
}

export function genVeilleReglementaireV2(o: OrganismeInfo, f: FormationInfo) {
  return genVeilleExploitee(o, f, "reglementaire", typeDepuisOrganisme(o));
}

export function genVeilleMetierV2(o: OrganismeInfo, f: FormationInfo) {
  return genVeilleExploitee(o, f, "metier", typeDepuisOrganisme(o));
}

export function genVeilleTechnologiqueV2(o: OrganismeInfo, f: FormationInfo) {
  return genVeilleExploitee(o, f, "technologique", typeDepuisOrganisme(o));
}

export function genVeilleHandicap(o: OrganismeInfo, f?: FormationInfo) {
  // Sources handicap réelles, consultées au plus tard à la date de MAJ (plus de dates inventées).
  return genVeilleSourcee(o, f || ({ intitule: "" } as FormationInfo), "handicap");
}

// ===== IND 27 — PARTENAIRES, CONTRAT SOUS-TRAITANCE, CHARTE QUALITÉ =====

export function genListePartenairesV2(o: OrganismeInfo) {
  const tamponHtml = o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
  return buildDocument({ org: o, title: "LES PARTENAIRES", sections: [
    { heading: "", content: `<p>${o.nom} s'attache à développer constamment son réseau de partenaires afin d'assurer une très grande employabilité à ses étudiants.</p>` },
  ], extraHtml: `<h2>Les partenaires de ${o.nom}</h2>
    <table>
      <tr><th>Partenaire</th><th>${o.dirigeant}</th></tr>
      <tr style="background:#fff"><td>Dirigeant</td><td>Dirigeant<br>${tamponHtml}</td></tr>
    </table>` });
}

export function genContratSousTraitanceV2(o: OrganismeInfo, f: FormationInfo, stagiaires: import("@/types/qualiopi").StagiaireInfo[]) {
  const stagList = stagiaires.map(s => `${s.prenom} ${s.nom}${s.poste ? ' – ' + s.poste : ''}`).join(', ') || "___";
  const dateMaj = (o as any).dateMaj ? new Date((o as any).dateMaj).toLocaleDateString("fr-FR") : new Date().toLocaleDateString("fr-FR");
  const formateurNom = f.formateur || "";
  const firstSession = stagiaires[0];
  const formationTitle = f.intitule || "Formation professionnelle continue";
  const formationType = (f as any).typeFormation || formationTitle;
  const formationDuration = (firstSession as any)?.duree || f.duree || "À définir selon le groupe";
  const formationDates = firstSession?.dateDebutFormation && firstSession?.dateFinFormation
    ? `Du ${formatDate(firstSession.dateDebutFormation)} au ${formatDate(firstSession.dateFinFormation)}`
    : f.dateDebut && f.dateFin
      ? `Du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}`
      : "Sessions : Dates individuelles par stagiaire";
  const formationHours = (firstSession as any)?.horaires || (f as any).horaires || "De 9h00 à 12h30 et de 13h30 à 17h00";
  // Find the matching stagiaire for this formateur to get their specific signature
  const matchingStagiaire = stagiaires.find(s => s.formateur === formateurNom);
  const fmtSigUrl = matchingStagiaire?.formateurSignatureUrl || f.formateurSignatureUrl;

  // Sous-traitant personne physique (formateur indépendant). L'ancienne détection d'un autre
  // organisme par le prénom du formateur (données figées d'un ancien client) est supprimée :
  // un sous-traitant société est identifié par ses propres pièces (Kbis, NDA) dans le registre IND 27.
  const isVictorAcademy = false;

  // Infos sous-traitant selon le cas
  const sousTraitantNom = formateurNom || "Le Sous-traitant";
  const sousTraitantType = isVictorAcademy ? "société" : "personne physique";

  // Bloc d'identification du sous-traitant
  let sousTraitantBlock = "";
  if (isVictorAcademy) {
    sousTraitantBlock = `
      <p><strong>${sousTraitantNom}</strong></p>
      <p>Forme juridique : SASU – Société par Actions Simplifiée Unipersonnelle</p>
      <p>SIRET : …………………………</p>
      <p>Représenté par : …………………………</p>
      <p>Ci-après dénommé <strong>« le Sous-traitant »</strong></p>
      <br/><p><strong>Formateur désigné :</strong> ${formateurNom}</p>
    `;
  } else {
    sousTraitantBlock = `
      <p><strong>Monsieur/Madame ${formateurNom}</strong></p>
      <p>Formateur indépendant – Personne physique</p>
      <p>Ci-après dénommé(e) <strong>« le Sous-traitant »</strong></p>
    `;
  }

  // Bloc signature sous-traitant
  const sousTraitantSignLabel = isVictorAcademy ? `Pour le Sous-traitant – ${sousTraitantNom}` : `Pour le Sous-traitant – ${formateurNom}`;
  const sousTraitantSignRepresentant = formateurNom;
  const sousTraitantSignQualite = isVictorAcademy ? "Dirigeant" : "Formateur indépendant";

  // Préambule adapté
  const preambuleSousTraitant = isVictorAcademy
    ? `Le Sous-traitant est un organisme de formation professionnelle.`
    : `Le Sous-traitant, <strong>${formateurNom}</strong>, est un formateur indépendant (personne physique) qualifié dans le domaine de la formation professionnelle.`;

  const preambuleFormateur = isVictorAcademy
    ? `<p>Le formateur désigné pour l'exécution de la présente prestation est <strong>${formateurNom}</strong>, salarié du Sous-traitant.</p>`
    : "";

  // Article 1 adapté
  const art1Intermediaire = isVictorAcademy
    ? `son formateur salarié <strong>${formateurNom}</strong>`
    : `<strong>${formateurNom}</strong>, en qualité de formateur indépendant`;
  const art1Statut = isVictorAcademy
    ? `<p><strong>Il est expressément convenu que le formateur ${formateurNom} intervenant dans le cadre du présent contrat est un salarié du Sous-traitant et non du Donneur d'ordre.</strong></p>`
    : `<p><strong>Il est expressément convenu que ${formateurNom} intervient en qualité de prestataire indépendant et qu'aucun lien de subordination n'existe entre le Donneur d'ordre et le Sous-traitant.</strong></p>`
    + `<p>Les exigences du référentiel national qualité (article L.6316-3 du Code du travail, décret n° 2026-728 du 1er août 2026) sont transmises au Sous-traitant par l'annexe « Clauses qualité Qualiopi », qui fait partie intégrante du présent contrat et en assure la traçabilité (indicateur 27). Ces clauses s'appliquent également en cas d'intervention en portage salarial.</p>`;

  return buildDocument({ org: o, title: "CONTRAT DE SOUS-TRAITANCE EN FORMATION PROFESSIONNELLE", subtitle: "Conformément aux articles L.6351-1 et suivants du Code du travail et au Référentiel National Qualité (Qualiopi)", sections: [
    { heading: "ENTRE LES SOUSSIGNÉS", content: `
      <p><strong>1. LE DONNEUR D'ORDRE :</strong></p>
      <p><strong>${o.nom}</strong></p>
      <p>Forme juridique : Organisme de formation</p>
      <p>SIRET : ${o.siret}</p>
      ${o.nda ? `<p>Numéro de Déclaration d'Activité (NDA) : ${o.nda}</p>` : ""}
      <p>Siège social : ${o.adresse}, ${o.codePostal} ${o.ville}</p>
      <p>Représenté par : <strong>${o.dirigeant}</strong>, en qualité de Dirigeant</p>
      <p>Ci-après dénommé <strong>« le Donneur d'ordre »</strong></p>
      <br/>
      <p><strong>2. LE SOUS-TRAITANT :</strong></p>
      ${sousTraitantBlock}
      <br/>
      <p style="font-style:italic">Ci-après désignés ensemble « les Parties ».</p>
    ` },
    { heading: "PRÉAMBULE", content: `
      <p>Le Donneur d'ordre, <strong>${o.nom}</strong>, est un organisme de formation professionnelle${o.nda ? ` déclaré auprès de la DREETS sous le numéro ${o.nda}` : ""}.</p>
      <p>${preambuleSousTraitant}</p>
      <p>Le Donneur d'ordre souhaite confier au Sous-traitant, qui l'accepte, la réalisation de prestations de formation en sous-traitance, dans les conditions définies ci-après.</p>
      ${preambuleFormateur}
      <p>Le présent contrat est conclu dans le cadre des articles <strong>L.6351-1 et suivants du Code du travail</strong> relatifs à la sous-traitance en formation professionnelle.</p>
    ` },
    { heading: "ARTICLE 1 – OBJET DU CONTRAT", content: `
      <p>Le présent contrat a pour objet de définir les conditions dans lesquelles le Donneur d'ordre confie au Sous-traitant la réalisation de prestations de formation professionnelle continue au bénéfice de ses apprenants.</p>
      <p>Le Sous-traitant s'engage à réaliser les prestations de formation par l'intermédiaire de ${art1Intermediaire}, conformément aux programmes, objectifs pédagogiques et conditions définis par le Donneur d'ordre.</p>
      ${art1Statut}
    ` },
    { heading: "ARTICLE 2 – DESCRIPTION DE LA FORMATION", content: `
      <table>
        <tr><th style="width:40%">Élément</th><th>Détail</th></tr>
        <tr><td><strong>Intitulé de la formation</strong></td><td>${formationTitle}</td></tr>
        <tr><td><strong>Type de formation</strong></td><td>${formationType}</td></tr>
        <tr><td><strong>Public visé</strong></td><td>${f.publicVise || "Adultes"}</td></tr>
        <tr><td><strong>Durée totale</strong></td><td>${formationDuration}</td></tr>
        <tr><td><strong>Dates prévisionnelles</strong></td><td>${formationDates}</td></tr>
        <tr><td><strong>Modalités</strong></td><td>${f.modalites || "Présentiel et/ou distanciel (à adapter selon les besoins)"}</td></tr>
        <tr><td><strong>Lieu de formation</strong></td><td>${f.lieu || `${o.adresse}, ${o.codePostal} ${o.ville}`}</td></tr>
        <tr><td><strong>Horaires</strong></td><td>${formationHours}</td></tr>
      </table>
      <p style="margin-top:10px"><strong>Modules de formation :</strong></p>
      <ul>
        <li>Compréhension orale et écrite du français</li>
        <li>Expression orale : communication en situation professionnelle et quotidienne</li>
        <li>Expression écrite : rédaction de documents courants</li>
        <li>Grammaire, conjugaison et vocabulaire en contexte</li>
        <li>Préparation aux certifications (le cas échéant)</li>
      </ul>
    ` },
    { heading: "ARTICLE 3 – STATUT DU SOUS-TRAITANT", content: isVictorAcademy ? `
      <p>Les formateurs mis à disposition par le Sous-traitant pour assurer les prestations objet du présent contrat sont <strong>exclusivement des salariés du Sous-traitant</strong>.</p>
      <p>Le Sous-traitant assume seul la qualité d'employeur vis-à-vis de ses formateurs. Il est seul responsable :</p>
      <ul>
        <li>Du versement de leur rémunération et des charges sociales afférentes</li>
        <li>De leurs conditions de travail</li>
        <li>De leur déclaration et de leur couverture sociale</li>
        <li>De leur formation continue et du maintien de leurs compétences</li>
      </ul>
      <p><strong>Aucun lien de subordination</strong> n'existe ni ne saurait exister entre le Donneur d'ordre et les formateurs salariés du Sous-traitant. Le Donneur d'ordre ne peut en aucun cas donner des directives aux formateurs sur l'organisation de leur travail, ni exercer un pouvoir disciplinaire à leur égard.</p>
    ` : `
      <p>Le Sous-traitant, <strong>${formateurNom}</strong>, intervient en qualité de <strong>personne physique – formateur indépendant</strong>.</p>
      <p>Le Sous-traitant exerce son activité de manière indépendante et est seul responsable :</p>
      <ul>
        <li>De ses obligations fiscales et sociales</li>
        <li>De sa couverture sociale et de son assurance professionnelle</li>
        <li>Du maintien et du développement de ses compétences</li>
      </ul>
      <p><strong>Aucun lien de subordination</strong> n'existe ni ne saurait exister entre le Donneur d'ordre et le Sous-traitant. Le Donneur d'ordre ne peut en aucun cas donner des directives au Sous-traitant sur l'organisation de son travail, ni exercer un pouvoir disciplinaire à son égard.</p>
    `, variant: "green" },
    { heading: "ARTICLE 4 – OBLIGATIONS DU SOUS-TRAITANT", content: `
      <p>Le Sous-traitant s'engage à :</p>
      <p><strong>4.1 – Qualité de la prestation :</strong></p>
      <ul>
        <li>Réaliser la formation dans le respect des objectifs pédagogiques définis conjointement avec le Donneur d'ordre</li>
        <li>Mettre à disposition des formateurs qualifiés, compétents et expérimentés dans le domaine du FLE</li>
        <li>Respecter le programme de formation validé par le Donneur d'ordre</li>
        <li>Adapter les méthodes pédagogiques au public cible</li>
      </ul>
      <p><strong>4.2 – Documents et justificatifs :</strong></p>
      <ul>
        <li>Fournir au Donneur d'ordre, avant le début de la formation : les <strong>CV détaillés et diplômes</strong> de chaque formateur intervenant</li>
        <li>Communiquer une copie de son extrait K-bis ou avis SIRENE à jour</li>
        <li>Fournir son récépissé de déclaration d'activité de formation</li>
        <li>Transmettre une attestation d'assurance responsabilité civile professionnelle en cours de validité</li>
      </ul>
      <p><strong>4.3 – Évaluations :</strong></p>
      <ul>
        <li>Réaliser les évaluations des acquis des stagiaires conformément à l'article <strong>L.6353-1 du Code du travail</strong></li>
        <li>Mettre en place des évaluations de positionnement en début de formation</li>
        <li>Réaliser des évaluations intermédiaires et sommatives tout au long du parcours</li>
        <li>Remettre au Donneur d'ordre les résultats des évaluations et les bilans pédagogiques</li>
      </ul>
      <p><strong>4.4 – Conformité Qualiopi :</strong></p>
      <ul>
        <li>Respecter strictement les exigences du <strong>Référentiel National Qualité (Qualiopi)</strong></li>
        <li>Se conformer aux indicateurs applicables du RNQ, notamment en matière de traçabilité, d'évaluation et d'amélioration continue</li>
        <li>Se tenir informé des évolutions du référentiel et s'y conformer</li>
        <li>Participer, le cas échéant, aux audits de surveillance ou de renouvellement du Donneur d'ordre</li>
      </ul>
      <p><strong>4.5 – Confidentialité et non-démarchage :</strong></p>
      <ul>
        <li>Ne pas démarcher directement ou indirectement les clients et prospects du Donneur d'ordre</li>
        <li>Respecter la confidentialité des informations transmises dans le cadre du contrat</li>
      </ul>
    ` },
    { heading: "ARTICLE 5 – OBLIGATIONS DU DONNEUR D'ORDRE", content: `
      <p><strong>${o.nom}</strong> s'engage à :</p>
      <ul>
        <li>Assurer la <strong>gestion administrative</strong> de la formation : inscriptions, convocations, conventions, facturation</li>
        <li>Transmettre au Sous-traitant tous les <strong>documents nécessaires</strong> à la réalisation de la prestation (programme validé, listes de stagiaires, supports pédagogiques le cas échéant)</li>
        <li>Fournir les moyens matériels et logistiques nécessaires (salles, équipements, accès aux outils de visioconférence pour le distanciel)</li>
        <li>Transmettre une copie des feuilles de présence signées par les stagiaires</li>
        <li>Transmettre les questionnaires de satisfaction remplis par les stagiaires</li>
        <li>Informer le Sous-traitant de toute modification, annulation ou report au moins <strong>7 jours ouvrés</strong> avant la date prévue</li>
      </ul>
    ` },
    { heading: "ARTICLE 6 – MODALITÉS FINANCIÈRES", content: `
      <p><strong>6.1 – Rémunération :</strong></p>
      <p>En contrepartie de la réalisation des prestations de formation, le Donneur d'ordre versera au Sous-traitant la rémunération horaire convenue entre les Parties et précisée dans le bon de commande de chaque session (montant HT par heure de formation dispensée).</p>
      <p><strong>6.2 – Facturation et paiement :</strong></p>
      <ul>
        <li>Le Sous-traitant adressera une facture à l'issue de chaque session de formation</li>
        <li>Le paiement sera effectué par virement bancaire dans un délai de <strong>30 jours</strong> à réception de la facture et des pièces justificatives (feuilles d'émargement, bilans pédagogiques)</li>
      </ul>
      <p><strong>6.3 – Frais annexes :</strong></p>
      <p>Les éventuels frais de déplacement, hébergement et restauration du formateur seront à la charge du <strong>Sous-traitant</strong>, sauf accord écrit contraire entre les Parties.</p>
    ` },
    { heading: "ARTICLE 7 – ABSENCE DE LIEN DE SUBORDINATION", content: `
      <p>Le présent contrat constitue un <strong>contrat de prestation de services</strong> et ne saurait en aucun cas être assimilé à un contrat de travail.</p>
      <p>Le Sous-traitant exerce son activité de manière <strong>indépendante</strong>. Il conserve l'entière liberté dans l'organisation de son travail et de celui de ses formateurs salariés, sous réserve du respect des objectifs pédagogiques et du calendrier convenus.</p>
      <p>Aucun lien de subordination juridique n'existe entre le Donneur d'ordre et le Sous-traitant, ni entre le Donneur d'ordre et les formateurs salariés du Sous-traitant.</p>
    `, variant: "green" },
    { heading: "ARTICLE 8 – ASSURANCE RESPONSABILITÉ CIVILE PROFESSIONNELLE", content: `
      <p>Le Sous-traitant déclare avoir souscrit une police d'assurance <strong>Responsabilité Civile Professionnelle (RCP)</strong> couvrant les dommages pouvant résulter de l'exécution des prestations objet du présent contrat.</p>
      <p>Le Sous-traitant s'engage à maintenir cette assurance en vigueur pendant toute la durée du contrat et à fournir une attestation d'assurance sur simple demande du Donneur d'ordre.</p>
    ` },
    { heading: "ARTICLE 9 – PROPRIÉTÉ INTELLECTUELLE", content: `
      <p>Les supports pédagogiques, cours, exercices et tout contenu créé par le Sous-traitant ou ses formateurs dans le cadre de l'exécution du présent contrat restent la <strong>propriété intellectuelle du Sous-traitant</strong>.</p>
      <p>Le Donneur d'ordre s'interdit de reproduire, diffuser, modifier ou exploiter ces contenus sans l'accord préalable et écrit du Sous-traitant.</p>
      <p>Réciproquement, les outils, marques, méthodologies et supports propres au Donneur d'ordre restent sa propriété exclusive.</p>
    ` },
    { heading: "ARTICLE 10 – CLAUSE DE CONFORMITÉ QUALIOPI", content: `
      <p>Le Donneur d'ordre étant engagé dans une démarche de certification <strong>Qualiopi</strong> conformément à l'article L.6316-3 du Code du travail, le Sous-traitant s'engage expressément à :</p>
      <ul>
        <li>Respecter l'ensemble des indicateurs du <strong>Référentiel National Qualité</strong> applicables à la sous-traitance</li>
        <li>Fournir tous les documents et preuves nécessaires aux audits de certification</li>
        <li>Coopérer pleinement lors des audits de surveillance ou de renouvellement</li>
        <li>Se conformer aux procédures qualité du Donneur d'ordre</li>
        <li>Signaler sans délai toute non-conformité identifiée</li>
      </ul>
      <p>Le non-respect de cette clause constitue un <strong>manquement grave</strong> susceptible d'entraîner la résiliation immédiate du contrat.</p>
    `, variant: "orange" },
    { heading: "ARTICLE 11 – DOCUMENTS À FOURNIR AVANT LA FORMATION", content: `
      <p>Le Sous-traitant devra remettre au Donneur d'ordre, <strong>au plus tard 15 jours avant le début de la formation</strong>, les documents suivants :</p>
      <table>
        <tr><th style="width:5%">N°</th><th>Document</th><th style="width:15%">Statut</th></tr>
        <tr><td>1</td><td>Contrat de sous-traitance signé</td><td>Fourni</td></tr>
        <tr><td>2</td><td>Extrait K-bis ou avis SIRENE à jour</td><td>Fourni</td></tr>
        <tr><td>3</td><td>Récépissé de déclaration d'activité de formation</td><td>Fourni</td></tr>
        <tr><td>4</td><td>CV détaillé(s) du/des formateur(s)</td><td>Fourni</td></tr>
        <tr><td>5</td><td>Copie des diplômes et certifications des formateurs</td><td>Fourni</td></tr>
        <tr><td>6</td><td>Attestation d'assurance RCP en cours de validité</td><td>Fourni</td></tr>
        <tr><td>7</td><td>Présentation des méthodes et moyens pédagogiques</td><td>Fourni</td></tr>
        <tr><td>8</td><td>Programme détaillé de la formation</td><td>Fourni</td></tr>
      </table>
    `, variant: "green" },
    { heading: "ARTICLE 12 – DURÉE ET RÉSILIATION", content: `
      <p>Le présent contrat est conclu pour la durée de la prestation de formation visée à l'article 2.</p>
      <p>Il pourra être résilié de plein droit par l'une ou l'autre des Parties en cas de manquement grave de l'autre Partie à l'une de ses obligations, après mise en demeure restée sans effet dans un délai de <strong>15 jours</strong>.</p>
      <p>En cas de résiliation, les prestations déjà réalisées seront rémunérées au prorata temporis.</p>
    ` },
    { heading: "ARTICLE 13 – DROIT APPLICABLE ET LITIGES", content: `
      <p>Le présent contrat est soumis au <strong>droit français</strong>.</p>
      <p>En cas de litige relatif à l'interprétation ou à l'exécution du présent contrat, les Parties s'engagent à rechercher une solution amiable. À défaut d'accord dans un délai de 30 jours, le litige sera soumis aux tribunaux compétents de <strong>${o.ville || "MONTPELLIER"}</strong>.</p>
    ` },
  ], extraHtml: (() => {
    const sigHtml = (o.signatureUrl || o.tamponUrl) ? `<img src="${(o.signatureUrl || o.tamponUrl)}" alt="Signature" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : "";
    const tamponHtml = o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
    return `<p style="margin-top:30px;text-align:center;font-weight:600">Fait en deux exemplaires originaux, à <strong>${o.ville || "……………"}</strong>, le <strong>${dateMaj}</strong></p>
    <div class="signature-block-2" style="margin-top:30px">
      <div class="sig-box">
        <p class="sig-label">Pour le Donneur d'ordre – ${o.nom}</p>
        <p>Représenté par : <strong>${o.dirigeant}</strong></p>
        <p>Qualité : Dirigeant</p>
        <p>Date : ${dateMaj}</p>
        <p style="margin-top:15px">Signature et cachet :</p>
        ${sigHtml}
        <p style="font-size:11px;color:#888;margin-top:8px;font-style:italic">Lu et approuvé – Bon pour accord</p>
      </div>
      <div class="sig-box">
        <p class="sig-label">${sousTraitantSignLabel}</p>
        <p>Représenté par : <strong>${sousTraitantSignRepresentant}</strong></p>
        <p>Qualité : ${sousTraitantSignQualite}</p>
        <p>Date : ${dateMaj}</p>
        <p style="margin-top:15px">Signature :</p>
        ${fmtSigUrl ? `<img src="${fmtSigUrl}" alt="Signature formateur" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : ""}
        <p style="font-size:11px;color:#888;margin-top:8px;font-style:italic">Lu et approuvé – Bon pour accord</p>
      </div>
    </div>`;
  })() });
}

export function genChecklistFormateur(o: OrganismeInfo, f: FormationInfo, sessionDates?: { debut?: string; fin?: string }) {
  const sessDebut = sessionDates?.debut || f.dateDebut;
  const sessFin = sessionDates?.fin || f.dateFin;
  const dateDoc = sessDebut ? formatDate(sessDebut) : new Date().toLocaleDateString("fr-FR");
  const dateSig = sessFin ? formatDate(sessFin) : dateDoc;
  const formateurNom = f.formateur || "—";
  const tamponHtml = o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
  const fmtSigUrl = (f as any).formateurSignatureUrl;
  const sessionLabel = sessDebut && sessFin ? `Session du ${formatDate(sessDebut)} au ${formatDate(sessFin)}` : "";

  const sections: { titre: string; items: string[] }[] = [
    { titre: "1. Préparation pédagogique", items: [
      "Programme de formation lu, compris et respecté",
      "Objectifs pédagogiques identifiés et reformulés aux stagiaires",
      "Supports pédagogiques préparés, à jour et adaptés au public",
      "Séquençage / progression pédagogique respecté",
      "Modalités pédagogiques adaptées (présentiel / distanciel / mixte)",
      "Matériel et outils numériques (vidéoprojecteur, plateforme LMS) testés avant la session",
    ]},
    { titre: "2. Évaluations administrées", items: [
      "Test de positionnement de DÉBUT réalisé et corrigé",
      "QCM / quiz intermédiaires passés à chaque étape clé",
      "Exercices pratiques / mises en situation effectués",
      "Test de positionnement de FIN réalisé et corrigé",
      "Grille d'acquisition des compétences renseignée et signée",
      "Bilan à CHAUD distribué et collecté en fin de formation",
      "Bilan à FROID prévu (3 à 6 mois après la fin)",
    ]},
    { titre: "3. Suivi des stagiaires", items: [
      "Feuilles d'émargement signées chaque demi-journée",
      "Suivi individualisé des acquis (forces / axes de progrès)",
      "Réponse apportée aux besoins spécifiques exprimés par les stagiaires",
      "Adaptation du rythme aux niveaux et profils du groupe",
      "Repérage et accompagnement des stagiaires en difficulté",
      "Prise en compte des situations de handicap (référent PSH informé si besoin)",
      "Communication régulière avec le référent pédagogique",
    ]},
    { titre: "4. Conditions matérielles et accueil", items: [
      "Salle propre, rangée et accueillante avant l'arrivée des stagiaires",
      "Disposition adaptée à la modalité pédagogique (U, îlots, frontal)",
      "Vérification du matériel (chaises, tables, prises, connexion Wi-Fi)",
      "Affichage du règlement intérieur et des consignes de sécurité visible",
      "Issues de secours et consignes incendie connues",
      "Pause(s) organisée(s), eau / café à disposition si prévu",
    ]},
    { titre: "5. Documents administratifs et qualité", items: [
      "Convocations envoyées et confirmées",
      "Livret d'accueil remis aux stagiaires",
      "Programme de formation remis (papier ou numérique)",
      "Règlement intérieur remis et expliqué",
      "Attestations d'assiduité / certificats de réalisation préparés en fin de session",
      "Traçabilité Qualiopi assurée (signatures, évaluations, comptes-rendus)",
    ]},
    { titre: "6. Posture du formateur", items: [
      "Ponctualité et tenue professionnelle",
      "Bienveillance, écoute active et neutralité",
      "Reformulation et vérification de la compréhension",
      "Encouragement à la participation et à la prise de parole",
      "Gestion des conflits / désaccords de manière constructive",
      "Respect de la confidentialité et du RGPD",
    ]},
    { titre: "7. Clôture de la formation", items: [
      "Synthèse des acquis présentée au groupe",
      "Remise des supports finaux et ressources complémentaires",
      "Information sur les suites de parcours / certifications possibles",
      "Collecte des bilans à chaud signés",
      "Remontée d'informations au responsable pédagogique (points forts / axes d'amélioration)",
    ]},
  ];

  const sectionsHtml = sections.map(sec => `
    <div class="section" style="margin-top:18px">
      <h3 style="border-bottom:2px solid #1e3a8a;padding-bottom:4px;color:#1e3a8a">${sec.titre}</h3>
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#1e3a8a;color:#fff">
            <th style="padding:6px;text-align:left;border:1px solid #1e3a8a;width:60%">Point de contrôle</th>
            <th style="padding:6px;text-align:center;border:1px solid #1e3a8a;width:8%">Conforme</th>
            <th style="padding:6px;text-align:center;border:1px solid #1e3a8a;width:8%">Non conforme</th>
            <th style="padding:6px;text-align:center;border:1px solid #1e3a8a;width:8%">N/A</th>
            <th style="padding:6px;text-align:left;border:1px solid #1e3a8a;width:16%">Observations</th>
          </tr>
        </thead>
        <tbody>
          ${sec.items.map((item, i) => `
            <tr style="background:${i % 2 === 0 ? "#f0f6ff" : "#ffffff"}">
              <td style="padding:6px;border:1px solid #cbd5e1">${item}</td>
              <td style="padding:6px;border:1px solid #cbd5e1;text-align:center;font-weight:bold;color:#16a34a">X</td>
              <td style="padding:6px;border:1px solid #cbd5e1;text-align:center">☐</td>
              <td style="padding:6px;border:1px solid #cbd5e1;text-align:center">☐</td>
              <td style="padding:6px;border:1px solid #cbd5e1">RAS</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `).join("");

  return buildDocument({
    org: o,
    title: "Checklist Formateur — Contrôle qualité de la prestation",
    subtitle: sessionLabel ? `${formateurNom} — ${f.intitule || ""} — ${sessionLabel}` : `${formateurNom} — ${f.intitule || ""}`,
    sections: [
      { heading: "Identification", content: `
        <p>
          <strong>Formateur :</strong> ${formateurNom}<br>
          <strong>Formation :</strong> ${f.intitule || "—"}<br>
          <strong>Période :</strong> du ${formatDate(sessDebut)} au ${formatDate(sessFin)}<br>
          <strong>Modalité :</strong> ${f.modalites || "Présentiel"}<br>
          <strong>Date de la checklist :</strong> ${dateDoc}
        </p>
        <p style="font-style:italic;color:#475569;font-size:12px">
          Cette checklist est complétée par le formateur en début et tout au long de la formation,
          puis transmise au responsable pédagogique pour archivage Qualiopi (Critère 6 — IND 27).
          Elle garantit la conformité de la prestation : respect du programme, des supports, des évaluations,
          du suivi des stagiaires et des conditions matérielles d'accueil.
        </p>
      ` },
    ],
    extraHtml: `
      ${sectionsHtml}
      <div class="section" style="margin-top:20px">
        <h3 style="color:#1e3a8a">Synthèse / commentaires libres du formateur</h3>
        <p>La formation s'est déroulée conformément au programme prévu. Les stagiaires ont été assidus,
        impliqués et les objectifs pédagogiques ont été atteints. Les supports, les évaluations et le
        suivi individualisé ont permis une progression mesurable. Aucune non-conformité majeure à signaler.
        Les conditions matérielles (salle, matériel, accueil) étaient conformes aux exigences qualité.</p>
      </div>
      <div class="signature-block-2" style="margin-top:25px">
        <div class="sig-box">
          <p class="sig-label">Le Formateur</p>
          <p>Nom : ${formateurNom}</p>
          <p>Date : ${dateSig}</p>
          <p style="margin-top:20px">Signature :</p>
          ${fmtSigUrl ? `<img src="${fmtSigUrl}" alt="Signature formateur" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : ""}
        </div>
        <div class="sig-box">
          <p class="sig-label">Le Responsable Pédagogique</p>
          <p>Nom : ${o.responsablePedagogique || o.dirigeant}</p>
          <p>Date : ${dateSig}</p>
          <p style="margin-top:20px">Cachet :</p>
          ${cachetDirigeantHtml(o)}
        </div>
      </div>
    `
  });
}

export function genCharteQualiteFormateurExterne(o: OrganismeInfo) {
  const dateMaj = (o as any).dateMaj ? new Date((o as any).dateMaj).toLocaleDateString("fr-FR") : new Date().toLocaleDateString("fr-FR");
  const tamponHtml = o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
  return buildDocument({ org: o, title: "Charte Qualité Formateur externe", sections: [
    { heading: "", content: `<p>Dans le cadre de la sous-traitance des actions de formation, pour chaque prestation de formation,</p><p><strong>Le Partenaire :</strong></p><ul><li>S'engage au respect du Référentiel national qualité QUALIOPI.</li><li>Le Partenaire devra s'informer des mises à jour et s'y conformer.</li></ul>` },
  ], extraHtml: `<div class="signature-block-2">
    <div class="sig-box"><p class="sig-label">Pour le partenaire</p><p>Nom : ________________________</p><p>Date : ________________________</p><p style="margin-top:20px">Signature :</p></div>
    <div class="sig-box"><p class="sig-label">Pour ${o.nom}</p><p>Nom : ${o.dirigeant}</p><p>Date : ${dateMaj}</p>${tamponHtml}</div>
  </div>` });
}
