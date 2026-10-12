/**
 * Pièces ajoutées au dossier BDC pour l'aligner sur le format de référence « MMF - BDC »
 * (skill /bdc) : process manquants, accusé de réception des informations, informations
 * pratiques à distance, fiche de compétences du consultant, réseau d'acteurs socio-économiques.
 *
 * Règle : ces pièces ne contiennent que des données du dossier (organisme, consultant,
 * planning, dates) ; tout ce que seul l'intéressé peut renseigner reste à compléter.
 */
import type { BdcContext, Beneficiaire, Prestation } from "./bdcModel";
import { fmtDateFR, prestationFor, seancesFor, typeContrat } from "./bdcModel";

const NBSP = " ";

function consultantNom(ctx: BdcContext): string {
  return ctx.prestation.consultant.nom || ctx.organisme.representantLegal.nom || "le consultant";
}

function ajouterJours(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

/** Date de signature de la convention : 14 jours ouvrés avant la première séance (comme le reste du dossier). */
export function dateConventionBC(p: Prestation): Date {
  const d = new Date(p.dateDebut);
  let reste = 14;
  while (reste > 0) {
    d.setDate(d.getDate() - 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) reste--;
  }
  return d;
}

const distanciel = (p: Prestation) => p.modalite === "distanciel" || p.modalite === "mixte";

// ───────────────────────────── IND 2 — Process suivi à six mois ─────────────────────────────

export function mdProcessSuivi6Mois(ctx: BdcContext, today: Date = new Date()): string {
  const c = consultantNom(ctx);
  const lignes = ctx.beneficiaires.map((b) => {
    const p = prestationFor(ctx, b);
    const etat = p.dateSuivi6Mois.getTime() <= today.getTime()
      ? "échéance atteinte : compte rendu de suivi à classer"
      : p.dateFin.getTime() <= today.getTime() ? "bilan terminé, suivi programmé" : "bilan en cours";
    return `| ${b.prenom} ${b.nom} | ${fmtDateFR(p.dateFin)} | ${fmtDateFR(p.dateSuivi6Mois)} | ${etat} |`;
  });
  return `# PROCESS — SUIVI À SIX MOIS

_Indicateur 2 — Résultats de la prestation : mise en œuvre du projet six mois après le bilan._

## 1. Cadre

Un entretien de suivi est proposé au bénéficiaire six mois après la remise du document de synthèse. Il est inclus dans le prix de la prestation et n'est pas décompté de la durée d'accompagnement. Il a pour objet d'évaluer la mise en œuvre effective du plan d'action et d'apporter, si besoin, un appui complémentaire.

## 2. Déroulé

| Échéance | Action | Responsable | Trace |
|---|---|---|---|
| Dernière séance | Programmation de la date de l'entretien de suivi, inscrite au document de synthèse | ${c} | Document de synthèse |
| J − 30 | Premier contact par courriel pour confirmer la date et la modalité | ${c} | Courriel archivé, tableau de relance |
| J − 7 | Relance en l'absence de réponse | ${c} | Tableau de relance |
| Jour J | Entretien de suivi (téléphone ou visioconférence, 30 à 45 minutes) | ${c} | Compte rendu de suivi |
| J + 7 | Recueil du questionnaire de satisfaction à froid | ${c} | Questionnaire renseigné par le bénéficiaire |
| J + 15 | Seconde relance, puis clôture en « sollicité sans réponse » | ${c} | Tableau de relance |
| Annuel | Agrégation des résultats dans les indicateurs de résultats | ${c} | Enquête à 6 mois, tableau de bord |

## 3. Contenu de l'entretien

- Réalisation effective de chacune des étapes du plan d'action.
- Obstacles rencontrés et appuis mobilisés.
- Pertinence du projet avec six mois de recul : confirmé, ajusté ou abandonné.
- Situation professionnelle à la date de l'entretien.
- Appui complémentaire : ressources, dispositifs de financement, acteurs de l'accompagnement.

## 4. Règle de non-réponse

Après deux relances sans réponse, la situation est documentée en « sollicité sans réponse », avec la date et le canal de chaque sollicitation. Aucune réponse n'est produite à la place du bénéficiaire.

## 5. Échéancier au ${fmtDateFR(today)}

| Bénéficiaire | Fin du bilan | Suivi à six mois | Situation |
|---|---|---|---|
${lignes.join("\n") || "| — | — | — | Aucun bilan engagé |"}
`;
}

// ───────────────────────────── IND 5 — Process définition des objectifs ─────────────────────────────

export function mdProcessObjectifs(): string {
  return `# PROCESS — DÉFINITION DES OBJECTIFS DE LA PRESTATION

_Indicateur 5 — Objectifs opérationnels et évaluables, adaptés au bénéficiaire._

## 1. Principe

Les objectifs du bilan sont formalisés par écrit avant la contractualisation, à partir de l'analyse du besoin. Ils sont opérationnels, évaluables, individualisés, et repris à l'identique dans la convention, le programme et l'évaluation de l'atteinte des objectifs portée au document de synthèse.

## 2. Règles de rédaction

- Chaque objectif complète la phrase : « À l'issue du bilan, le bénéficiaire sera en capacité de… ».
- Chaque objectif est associé à un résultat observable et à la preuve qui permettra d'en évaluer l'atteinte.
- Les objectifs déclinent les trois finalités légales du bilan (art. L6313-4 du Code du travail) selon la situation du bénéficiaire.
- Quatre objectifs au plus, pour rester évaluables.

## 3. Chaîne de cohérence

| Étape | Document | Ce qui y figure |
|---|---|---|
| Expression du besoin | Fiche préalable au bilan | Les attentes exprimées par le bénéficiaire |
| Analyse partagée | Fiche d'analyse du besoin | Les besoins identifiés et validés conjointement |
| Formalisation | Outil préparatoire | Les objectifs retenus |
| Contractualisation | Convention de prestation | Les objectifs repris à l'identique |
| Mise en œuvre | Programme des 3 phases, fiche pédagogique | Le rattachement de chaque séance aux objectifs |
| Évaluation | Document de synthèse | L'atteinte de chaque objectif, avec observation motivée |

## 4. Révision en cours de prestation

Si l'entretien intermédiaire montre que les objectifs ne correspondent plus à la situation du bénéficiaire, ils sont révisés par écrit, signés des deux parties, et l'évaluation porte sur les objectifs révisés.
`;
}

// ───────────────────────────── IND 8 — Process positionnement à l'entrée ─────────────────────────────

export function mdProcessPositionnement(ctx: BdcContext): string {
  const c = consultantNom(ctx);
  return `# PROCESS — POSITIONNEMENT À L'ENTRÉE

_Indicateur 8 — Détermination des acquis à l'entrée et adaptation de la prestation._

## 1. Principe

Le positionnement à l'entrée d'un bilan ne porte pas sur des connaissances académiques : il établit où en est le bénéficiaire dans sa démarche (capacité à nommer ses compétences, recul sur son parcours, clarté du projet, connaissance du marché du travail). Il détermine l'intensité à donner à chaque étape de la phase d'investigation.

## 2. Déroulé

| Étape | Action | Responsable | Trace |
|---|---|---|---|
| 1 | Envoi du test de positionnement par courriel | ${c} | Courriel archivé |
| 2 | Réponses rédigées par le bénéficiaire lui-même | Le bénéficiaire | Test de positionnement renseigné |
| 3 | Lecture par le consultant et repérage des axes à renforcer | ${c} | Appréciation du consultant |
| 4 | Restitution au bénéficiaire lors de la phase préliminaire | ${c} | Fiche pédagogique |
| 5 | Report des axes retenus dans le programme individualisé | ${c} | Fiche pédagogique, planning |

## 3. Exploitation

| Constat | Adaptation apportée |
|---|---|
| Axe peu développé | Temps de séance accru, outils complémentaires, travail personnel guidé spécifique |
| Axe maîtrisé | Traitement allégé ; le temps libéré est reporté sur les axes les plus faibles |

Le test de positionnement d'entrée et l'évaluation de l'atteinte des objectifs portée au document de synthèse sont deux outils distincts : le premier établit un point de départ, le second évalue l'atteinte des objectifs contractualisés.
`;
}

// ───────────────────────────── IND 9 — Process information des publics ─────────────────────────────

export function mdProcessInformationPublics(ctx: BdcContext): string {
  const o = ctx.organisme;
  const dist = distanciel(ctx.prestation);
  return `# PROCESS — INFORMATION DES PUBLICS BÉNÉFICIAIRES

_Indicateur 9 — Information sur les conditions de déroulement de la prestation._

## 1. Principe

Avant le démarrage de la prestation, ${o.raisonSociale} informe le bénéficiaire des conditions concrètes de déroulement de son bilan : calendrier, ${dist ? "modalité de connexion" : "lieu"}, interlocuteurs, droits et obligations, accessibilité et voies de réclamation.

## 2. Documents remis et moment de la remise

| Document | Contenu | Moment de la remise | Preuve |
|---|---|---|---|
| Livret d'accueil du bénéficiaire | Interlocuteur, déroulement des 3 phases, modalités, accessibilité, confidentialité, droits, réclamation | À la signature de la convention | Accusé de réception signé |
| Planning prévisionnel signé | Dates, horaires, durées, modalité et objet de chaque séance | Annexé à la convention | Planning signé des deux parties |
${dist ? "| Informations pratiques — prestation à distance | Prérequis techniques, connexion, assistance, émargement à distance | À la signature de la convention | Accusé de réception signé |\n" : ""}| Informations périphériques | Accès, transports, accessibilité, restauration, hébergement | Sur demande ou en cas de séance en présentiel | Courriel d'envoi |
| Règlement intérieur | Règles applicables pendant la prestation, procédure disciplinaire | À la signature de la convention | Accusé de réception signé |
| Courriel de début de prestation | Date, heure et modalités de la première séance | Avant la première séance, après l'expiration du délai de rétractation | Courriel archivé |

## 3. Déroulé

1. À la signature de la convention, le livret d'accueil, le planning prévisionnel${dist ? ", les informations pratiques" : ""} et le règlement intérieur sont remis contre accusé de réception signé.
2. Le délai de rétractation de 14 jours calendaires (contrat signé par le bénéficiaire) ou le délai d'acceptation de 10 jours (convention tripartite) court à compter de la signature ou de la transmission.
3. Avant la première séance, le courriel de début de prestation rappelle la date, l'heure et les modalités.
4. Lors de la première séance, le consultant reprend le cadre déontologique, les modalités et les voies de réclamation.

**Traçabilité :** l'accusé de réception des informations, signé par le bénéficiaire, est classé dans son dossier individuel.
`;
}

export function mdInformationsPratiquesDistance(ctx: BdcContext): string {
  const o = ctx.organisme;
  return `# INFORMATIONS PRATIQUES — PRESTATION À DISTANCE

_Indicateur 9 — Modalité : distanciel synchrone (visioconférence)._

## 1. Plateforme

Les entretiens se déroulent en visioconférence synchrone. Un lien de connexion nominatif est adressé par courriel avant chaque séance.

## 2. Prérequis techniques

| Élément | Exigence minimale |
|---|---|
| Connexion internet | Connexion stable permettant la vidéo |
| Matériel | Ordinateur, tablette ou smartphone équipé d'une caméra et d'un micro |
| Navigateur | Version à jour de Chrome, Edge, Firefox ou Safari |
| Environnement | Lieu calme garantissant la confidentialité des échanges |

## 3. Procédure de connexion

1. Ouvrir le courriel reçu avant la séance.
2. Cliquer sur le lien à l'heure prévue.
3. Autoriser l'accès à la caméra et au micro, vérifier le son et l'image.

## 4. Assistance technique

En cas de difficulté, contacter le consultant${o.emailContact ? ` à ${o.emailContact}` : ""}. Une séance empêchée par un incident technique est reprogrammée sans frais ; elle n'est ni décomptée ni facturée.

## 5. Émargement à distance

Chaque séance donne lieu à une feuille d'émargement précisant la date, les horaires, la durée et la modalité, signée par le bénéficiaire et le consultant.

## 6. Confidentialité

- Aucune séance n'est enregistrée.
- Le consultant s'assure au début de chaque séance qu'aucun tiers n'assiste à l'entretien.
- Les documents de travail sont échangés par courriel nominatif.
`;
}

// ───────────────────────────── IND 9 — Accusé de réception (par bénéficiaire) ─────────────────────────────

export function mdAccuseReception(ctx: BdcContext, b: Beneficiaire): string {
  const o = ctx.organisme;
  const p = prestationFor(ctx, b);
  const seances = seancesFor(ctx, b);
  const conv = dateConventionBC(p);
  const contrat = typeContrat(p);
  const dist = distanciel(p);
  const delai = contrat.type === "bipartite"
    ? `Mon délai de rétractation de 14 jours calendaires à compter de la signature du contrat, expirant le ${fmtDateFR(ajouterJours(conv, 14))}.`
    : "Mon délai de 10 jours pour accepter la convention tripartite ; l'absence de réponse vaut refus et ne peut me être reprochée.";
  const docs = [
    "Fiche de présentation du bilan de compétences",
    "Cadre légal et réglementaire du bilan de compétences",
    "Programme détaillé des 3 phases",
    `${contrat.type === "bipartite" ? "Contrat" : "Convention"} de prestation et conditions générales de vente`,
    "Clauses contractuelles spécifiques au bilan de compétences",
    `Planning prévisionnel des ${seances.length} séances`,
    "Livret d'accueil du bénéficiaire",
    ...(dist ? ["Informations pratiques — prestation à distance"] : []),
    "Règlement intérieur",
    "Engagements déontologiques du consultant",
  ];
  return `# ACCUSÉ DE RÉCEPTION DES INFORMATIONS

_Indicateur 9 — Preuve de la remise des documents d'information._

| | |
|---|---|
| Organisme | ${o.raisonSociale}${o.siret ? ` — SIRET ${o.siret}` : ""}${o.nda ? ` — NDA ${o.nda}` : ""} |
| Consultant référent | ${consultantNom(ctx)} — Consultant en bilan de compétences |
| Bénéficiaire | ${b.prenom} ${b.nom} |
| Période de la prestation | du ${fmtDateFR(p.dateDebut)} au ${fmtDateFR(p.dateFin)} |
| Durée | ${p.dureeEntretiensH} heures d'accompagnement individuel, réparties sur ${seances.length} séances |
| Modalité | ${p.modalite === "distanciel" ? "Distanciel synchrone (visioconférence)" : p.modalite === "mixte" ? "Mixte (présentiel et visioconférence)" : "Présentiel"} |

Je soussigné(e) ${b.prenom} ${b.nom} reconnais avoir reçu, préalablement au démarrage de mon bilan de compétences, les documents suivants, et avoir pu poser toutes les questions utiles à leur compréhension.

| Document remis | Reçu | Date de remise |
|---|---|---|
${docs.map((d) => `| ${d} | ☐ | ${fmtDateFR(conv)} |`).join("\n")}

**Points expressément portés à ma connaissance**

- Le caractère volontaire de ma démarche et la possibilité d'y mettre fin à tout moment.
- ${delai}
- La confidentialité des échanges et le secret professionnel auquel est tenu le consultant.
- La propriété exclusive du document de synthèse, qui ne peut être transmis à un tiers sans mon accord écrit.
- La destruction des documents à l'issue du bilan, sauf accord écrit de ma part pour une conservation de trois ans au plus (art. R6313-7 du Code du travail).
- Les voies de réclamation et de médiation.
- La possibilité de demander une adaptation à tout moment de la prestation.

Fait le ${fmtDateFR(conv)}, en deux exemplaires.

Signature du bénéficiaire :${NBSP}______________________
`;
}

// ───────────────────────────── IND 21 — Fiche de compétences du consultant ─────────────────────────────

export function mdFicheCompetencesConsultant(ctx: BdcContext): string {
  const o = ctx.organisme;
  const c = consultantNom(ctx);
  return `# FICHE DE COMPÉTENCES DU CONSULTANT

_Indicateur 21 — Justification des compétences de l'intervenant, à accompagner du CV et des justificatifs._

> **Pièce à finaliser avant l'audit.** Les rubriques « Formation et diplômes » et « Parcours professionnel » ne peuvent être renseignées que par l'intéressé. Le curriculum vitae et les copies des diplômes et certifications sont joints au dossier : leur absence constitue un écart à l'indicateur 21.

## 1. Identification

| | |
|---|---|
| Nom et prénom | ${c} |
| Fonction | Consultant en bilan de compétences |
| Organisme | ${o.raisonSociale}${o.siret ? ` — SIRET ${o.siret}` : ""}${o.nda ? ` — NDA ${o.nda}` : ""} |

## 2. Formation et diplômes

| Année | Diplôme, titre ou certification | Organisme délivrant | Justificatif joint |
|---|---|---|---|
| | À compléter par l'intéressé | | ☐ |
| | | | ☐ |
| | | | ☐ |

## 3. Parcours professionnel

| Période | Fonction | Structure | Activités principales |
|---|---|---|---|
| | À compléter par l'intéressé | | |
| | | | |
| | | | |

## 4. Compétences mobilisées dans la fonction de consultant

| Domaine | Éléments de preuve mobilisables | Niveau |
|---|---|---|
| Conduite des trois phases du bilan | Programme des 3 phases, fiches pédagogiques, dossiers individuels | ☐ 1 ☐ 2 ☐ 3 |
| Analyse du besoin et formalisation des objectifs | Fiches d'analyse du besoin, outils préparatoires | ☐ 1 ☐ 2 ☐ 3 |
| Outils d'investigation et restitution | Tests et restitutions écrites | ☐ 1 ☐ 2 ☐ 3 |
| Cadre légal et réglementaire | Cadre légal, clauses contractuelles spécifiques | ☐ 1 ☐ 2 ☐ 3 |
| Dispositifs de financement | Registres de veille | ☐ 1 ☐ 2 ☐ 3 |
| Accueil des situations de handicap | Process handicap, catalogue des adaptations | ☐ 1 ☐ 2 ☐ 3 |
| Conduite d'entretien à distance | Fiches pédagogiques, émargements | ☐ 1 ☐ 2 ☐ 3 |

_Échelle : 1 = en apprentissage — 2 = autonome — 3 = capable de transmettre._

## 5. Actualisation des compétences

Les actions de formation et de veille suivies sont tracées dans le plan de développement des compétences du consultant (indicateur 22) et dans les registres de veille (indicateurs 23 à 25).

## 6. Pièces à joindre

| Pièce | Jointe |
|---|---|
| Curriculum vitae daté et signé | ☐ |
| Copie des diplômes, titres et certifications | ☐ |
| Attestations d'expérience en accompagnement ou en bilan de compétences | ☐ |
| Attestations des formations suivies au cours des 12 derniers mois | ☐ |

Le consultant ${c}, pour attestation de l'exactitude des informations — le ____ / ____ / ________
`;
}

// ───────────────────────────── IND 5 — Objectifs individualisés (par bénéficiaire) ─────────────────────────────

/**
 * Objectifs individualisés du bilan : les trois finalités légales servent de cadre ; la
 * formulation propre au bénéficiaire (« À l'issue du bilan, je serai en capacité de… ») est
 * écrite avec lui lors de l'entretien préalable — seule son attente déclarée est reprise.
 */
export function mdObjectifsIndividualises(ctx: BdcContext, b: Beneficiaire): string {
  const p = prestationFor(ctx, b);
  const attente = b.profil.declare ? b.profil.attente : "";
  const Z = "______________________________________________";
  return `# OBJECTIFS INDIVIDUALISÉS DU BILAN DE COMPÉTENCES

_Indicateur 5 — Objectifs opérationnels et évaluables, formalisés avec le bénéficiaire avant la contractualisation._

| | |
|---|---|
| Bénéficiaire | ${b.prenom} ${b.nom} |
| Consultant | ${consultantNom(ctx)} |
| Période prévue | du ${fmtDateFR(p.dateDebut)} au ${fmtDateFR(p.dateFin)} |
| Attente exprimée | ${attente || Z} |

**À l'issue du bilan, le bénéficiaire sera en capacité de :**

| N° | Objectif (formulé avec le bénéficiaire) | Finalité légale (art. L6313-4) | Résultat observable | Preuve de l'atteinte |
|---|---|---|---|---|
| 1 | | Analyser ses compétences professionnelles et personnelles, ses aptitudes et motivations | | Document de synthèse, § 2 |
| 2 | | Définir un projet professionnel (et, le cas échéant, un projet de formation) | | Document de synthèse, § 3 |
| 3 | | Utiliser ses atouts comme instrument de négociation pour un emploi, un parcours qualifiant ou une évolution de carrière | | Plan d'action daté |
| 4 | | | | |

Objectifs repris à l'identique dans le ${typeContrat(p).type === "bipartite" ? "contrat" : "convention"} de prestation et évalués dans le document de synthèse (§ 4).

Fait le ____ / ____ / ________

| Signature du bénéficiaire | Signature du consultant |
|---|---|
| ${b.prenom} ${b.nom} | ${consultantNom(ctx)} |
`;
}

// ───────────────────────────── IND 21 — CV du consultant (trame) ─────────────────────────────

/** CV du consultant : rempli par l'intéressé (ou remplacé par son CV signé) — rien n'est préfabriqué. */
export function mdCVConsultant(ctx: BdcContext): string {
  const c = consultantNom(ctx);
  const ligne = "| | | | |";
  return `# CURRICULUM VITAE DU CONSULTANT — ${c.toUpperCase()}

_Indicateur 21 — À compléter et signer par le consultant, ou à remplacer par son CV daté et signé. Joindre les copies des diplômes et attestations._

| | |
|---|---|
| Nom et prénom | ${c} |
| Fonction exercée pour l'organisme | Consultant en bilan de compétences |
| Statut | ☐ Dirigeant ☐ Salarié ☐ Sous-traitant (contrat au registre IND 27) |

## Diplômes, titres et certifications

| Année | Intitulé | Organisme délivrant | Copie jointe |
|---|---|---|---|
${ligne}
${ligne}
${ligne}

## Expérience en accompagnement, orientation ou bilan de compétences

| Période | Fonction | Structure | Publics accompagnés / nombre de bilans |
|---|---|---|---|
${ligne}
${ligne}
${ligne}

## Autres expériences professionnelles

| Période | Fonction | Structure | Activités |
|---|---|---|---|
${ligne}
${ligne}

## Formations suivies au cours des trois dernières années

| Date | Intitulé | Organisme | Durée |
|---|---|---|---|
${ligne}
${ligne}

Je certifie l'exactitude des informations ci-dessus — ${c}, le ____ / ____ / ________
`;
}

// ───────────────────────────── IND 24 — Réseau d'acteurs socio-économiques ─────────────────────────────

export function mdReseauActeurs(ctx: BdcContext): string {
  const premiere = ctx.beneficiaires
    .flatMap((b) => seancesFor(ctx, b).filter((s) => s.phase === 2))
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
  return `# RÉSEAU D'ACTEURS SOCIO-ÉCONOMIQUES

_Indicateur 24 — Veille sur les compétences, les métiers et les emplois : sources de terrain mobilisées pendant la phase d'investigation._

## 1. Principe

Pour un organisme de bilan de compétences, les relations avec les acteurs socio-économiques sont le support direct de la phase d'investigation : exploration des métiers, enquêtes auprès de professionnels, vérification de la faisabilité des projets. Les informations recueillies alimentent le registre de veille sur les emplois, les métiers et les compétences.

## 2. Acteurs mobilisables

| Acteur | Nature de la relation | Apport pour les bénéficiaires | Trace |
|---|---|---|---|
| France Travail | Ressources publiques et orientation | Données sur le marché du travail, fiches ROME, immersion (PMSMP) | Fiches métiers annexées aux documents de synthèse |
| Conseil en évolution professionnelle (CEP) | Relais après le bilan | Poursuite gratuite de l'accompagnement du projet | Orientation inscrite au plan d'action |
| Professionnels des métiers explorés | Enquêtes métier | Confrontation du projet aux conditions réelles d'exercice | Comptes rendus d'enquêtes métier |
| OPCO et branches professionnelles | Travaux des observatoires de branche | Métiers en tension, certifications de la branche | Registre de veille (indicateur 24) |
| Organismes de formation du territoire | Parcours de formation accessibles | Durée, coût, prérequis et financement d'un projet de formation | Plans d'action |
| Agefiph, Cap emploi, MDPH | Adaptation et compensation | Solutions de compensation et accompagnement spécialisé | Contacts et suivi handicap (indicateur 26) |

## 3. Effets constatés sur les prestations

| N° | Relation mobilisée | Effet produit | Date | Trace |
|---|---|---|---|---|
| 24-01 | | | | |
| 24-02 | | | | |
| 24-03 | | | | |

_Tableau alimenté au fil de l'eau : chaque enquête métier, chaque mise en relation et chaque orientation vers un partenaire y est reportée avec ce qu'elle a produit.${premiere ? ` Les premières lignes sont attendues à partir de la première séance d'investigation (${fmtDateFR(premiere.date)}).` : ""}_
`;
}
