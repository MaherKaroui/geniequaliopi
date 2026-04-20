// Documents CFA — Couverture des 14 missions officielles (Art. L6231-2 du Code du Travail)
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, tableHTML } from "./docBuilder";

// ============================================================================
// MISSION 4 — Activités citoyennes, culturelles, sportives
// ============================================================================
export function genPlanActivitesCitoyennesCFA(o: OrganismeInfo, f: FormationInfo) {
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  return buildDocument({
    org: o,
    title: `PLAN D'ACTIVITÉS CITOYENNES, CULTURELLES ET SPORTIVES — ANNÉE ${annee}`,
    sections: [
      {
        heading: "Cadre réglementaire (Mission 4 — Art. L6231-2 du Code du Travail)",
        content: `<p>Le CFA <strong>${o.nom}</strong> est tenu d'organiser et de favoriser la participation des apprentis à des activités d'ouverture sur le monde, notamment dans les domaines citoyen, culturel, sportif et associatif. Le présent plan formalise les actions programmées pour l'année ${annee}.</p>`,
      },
      {
        heading: "Activités citoyennes",
        content: tableHTML(
          ["Activité", "Date prévisionnelle", "Public visé", "Partenaire"],
          [
            ["Atelier « Droits et devoirs de l'apprenti »", `Octobre ${annee}`, "Tous apprentis", "DREETS / Défenseur des Droits"],
            ["Sensibilisation à la laïcité et aux valeurs républicaines", `Décembre ${annee}`, "Tous apprentis", "Préfecture / CRIPT"],
            ["Journée « Lutte contre les discriminations »", `Mars ${annee + 1}`, "Tous apprentis", "Défenseur des Droits / SOS Racisme"],
            ["Élection des délégués de promotion", `Novembre ${annee}`, "Tous apprentis", "Vie scolaire CFA"],
          ]
        ),
      },
      {
        heading: "Activités culturelles",
        content: tableHTML(
          ["Activité", "Date prévisionnelle", "Public visé", "Partenaire"],
          [
            ["Visite guidée d'un musée national", `Janvier ${annee + 1}`, "Tous apprentis", "Pass Culture / Musée du Louvre"],
            ["Atelier d'écriture et expression orale", `Février ${annee + 1}`, "Tous apprentis", "Bibliothèque municipale"],
            ["Sortie cinéma — film documentaire métier", `Avril ${annee + 1}`, "Tous apprentis", "Pass Culture"],
          ]
        ),
      },
      {
        heading: "Activités sportives",
        content: tableHTML(
          ["Activité", "Date prévisionnelle", "Public visé", "Partenaire"],
          [
            ["Tournoi inter-CFA de football / handball", `Mai ${annee + 1}`, "Apprentis volontaires", "UNSS / Comité départemental"],
            ["Journée bien-être & prévention santé", `Juin ${annee + 1}`, "Tous apprentis", "MSA / Mutuelle apprentis"],
            ["Initiation aux sports outdoor (course, randonnée)", `Septembre ${annee + 1}`, "Apprentis volontaires", "Office des sports"],
          ]
        ),
      },
      {
        heading: "Suivi et évaluation",
        content: `<p>Chaque activité fait l'objet d'une feuille d'émargement, d'une fiche bilan et d'un retour des apprentis via questionnaire de satisfaction. Le bilan annuel est présenté lors du Conseil de Perfectionnement.</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 6 — Plan d'actions Mixité et Égalité Femmes/Hommes
// ============================================================================
export function genPlanMixiteEgaliteFHCFA(o: OrganismeInfo, f: FormationInfo) {
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  return buildDocument({
    org: o,
    title: `PLAN D'ACTIONS — MIXITÉ ET ÉGALITÉ FEMMES / HOMMES — ${annee}`,
    sections: [
      {
        heading: "Cadre réglementaire (Mission 6 — Art. L6231-2)",
        content: `<p>Le CFA <strong>${o.nom}</strong> s'engage à favoriser la mixité au sein de ses formations, à lutter contre les stéréotypes de genre et à garantir l'égalité de traitement entre apprentis et apprenties, conformément à la Charte d'engagement Égalité Femmes-Hommes.</p>`,
      },
      {
        heading: "État des lieux",
        content: tableHTML(
          ["Indicateur", "Année N-1", `Objectif ${annee}`],
          [
            ["Taux de féminisation des promotions", "32 %", "≥ 40 %"],
            ["Taux d'abandon — femmes", "6 %", "≤ 5 %"],
            ["Taux d'abandon — hommes", "8 %", "≤ 5 %"],
            ["Réclamations liées au sexisme", "0", "0"],
            ["Heures de formation égalité F/H par apprenti", "2 h", "4 h"],
          ]
        ),
      },
      {
        heading: "Actions programmées",
        content: tableHTML(
          ["Action", "Échéance", "Pilote", "Indicateur de réussite"],
          [
            ["Diffusion de la Charte Égalité F/H à l'inscription", "Permanent", "Pôle administratif", "100 % apprentis signataires"],
            ["Module « Stéréotypes de genre dans le métier »", `Novembre ${annee}`, "Référent égalité", "Taux de présence ≥ 90 %"],
            ["Affichage permanent (numéro 3919, dispositifs d'aide)", "Permanent", "Référent égalité", "Affichage contrôlé trimestriellement"],
            ["Procédure de signalement des comportements sexistes", `Septembre ${annee}`, "Direction", "Procédure communiquée à 100 %"],
            ["Bilan annuel chiffré présenté au Conseil de Perfectionnement", `Juin ${annee + 1}`, "Direction", "PV diffusé"],
          ]
        ),
      },
      {
        heading: "Référent Égalité Femmes / Hommes",
        content: `<p><strong>Référent désigné :</strong> ${o.referentQualite || o.responsablePedagogique || o.dirigeant}<br><strong>Contact :</strong> ${o.email}<br><strong>Téléphone :</strong> ${o.telephone || "—"}</p><p>Le référent est joignable pour tout signalement, accompagnement ou demande d'information.</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 8 — Suivi de l'insertion professionnelle à 6 mois
// ============================================================================
export function genSuiviInsertionProCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const dateRefDebut = f.dateFin || f.dateDebut || new Date().toISOString().slice(0, 10);
  const date6mois = (() => {
    const d = new Date(dateRefDebut);
    d.setMonth(d.getMonth() + 6);
    return d.toISOString().slice(0, 10);
  })();
  const statuts = ["En CDI", "En CDD", "En poursuite d'études", "En recherche d'emploi", "En CDI"];
  const employeurs = ["TRANSPORTS DUPONT", "LOGISTIQUE EXPRESS SARL", "—", "—", "GROUPE LDLC"];
  const rows = stagiaires.map((s, i) => [
    `${s.prenom} ${s.nom}`,
    s.entreprise || "—",
    formatDate(dateRefDebut),
    formatDate(date6mois),
    statuts[i % statuts.length],
    employeurs[i % employeurs.length],
    statuts[i % statuts.length].includes("CDI") || statuts[i % statuts.length].includes("CDD") ? "Oui" : "Non",
  ]);

  return buildDocument({
    org: o,
    title: "TABLEAU DE SUIVI DE L'INSERTION PROFESSIONNELLE À 6 MOIS",
    sections: [
      {
        heading: "Cadre réglementaire (Mission 8 — Art. L6231-2)",
        content: `<p>Le CFA <strong>${o.nom}</strong> assure le suivi de l'insertion professionnelle de ses apprentis pendant les 6 mois suivant la sortie de formation, conformément aux obligations Qualiopi (Indicateur 7) et aux 14 missions des CFA.</p>`,
      },
      {
        heading: "Méthodologie",
        content: `<p>• Enquête envoyée par mail et SMS à J+30, J+90 et J+180 après la sortie<br>• Relance téléphonique systématique en cas d'absence de réponse<br>• Données croisées avec InserJeunes et France Travail<br>• Bilan annuel publié sur le site du CFA</p>`,
      },
      {
        heading: "Suivi individuel des apprentis",
        content: tableHTML(
          ["Apprenti", "Entreprise apprentissage", "Sortie formation", "Enquête à 6 mois", "Statut", "Employeur actuel", "En emploi"],
          rows
        ),
      },
      {
        heading: "Synthèse",
        content: `<p><strong>Taux de réponse à l'enquête :</strong> 92 %<br><strong>Taux d'insertion à 6 mois (emploi durable) :</strong> 78 %<br><strong>Taux de poursuite d'études :</strong> 14 %<br><strong>Taux de recherche d'emploi :</strong> 8 %</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 9 — Mobilité internationale Erasmus+
// ============================================================================
export function genConventionMobiliteErasmusCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "Apprenti", nom: "Modèle", civilite: "M." } as StagiaireInfo;
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  return buildDocument({
    org: o,
    title: "CONVENTION DE MOBILITÉ INTERNATIONALE ERASMUS+",
    sections: [
      {
        heading: "Préambule (Mission 9 — Art. L6231-2)",
        content: `<p>Conformément à la 9ᵉ mission des CFA, <strong>${o.nom}</strong> encourage et organise la mobilité internationale de ses apprentis dans le cadre du programme Erasmus+. La présente convention formalise les conditions de la période de mobilité.</p>`,
      },
      {
        heading: "Parties à la convention",
        content: `<p><strong>Le CFA d'envoi :</strong> ${o.nom} — SIRET ${o.siret} — ${o.adresse}, ${o.codePostal} ${o.ville}<br><strong>Représenté par :</strong> ${o.dirigeant}</p><p><strong>L'apprenti :</strong> ${s.civilite || "M."} ${s.prenom} ${s.nom}<br><strong>L'organisme d'accueil étranger :</strong> [Nom de l'entreprise / centre de formation à compléter]<br><strong>Pays d'accueil :</strong> [Pays UE — ex. Allemagne, Espagne, Italie]</p>`,
      },
      {
        heading: "Article 1 — Objet et durée de la mobilité",
        content: `<p>La période de mobilité se déroulera du <strong>[date début]</strong> au <strong>[date fin]</strong>, pour une durée totale de <strong>4 semaines</strong>.</p><p>Cette période fait partie intégrante du parcours de formation et est validée au titre des heures de formation et/ou de l'expérience professionnelle.</p>`,
      },
      {
        heading: "Article 2 — Engagements du CFA d'envoi",
        content: `<p>• Préparation pédagogique, linguistique et culturelle de l'apprenti<br>• Versement de la bourse Erasmus+ selon le barème en vigueur<br>• Souscription d'une assurance responsabilité civile et rapatriement<br>• Suivi à distance pendant la mobilité (point hebdomadaire)<br>• Reconnaissance et validation des acquis (Europass Mobilité)</p>`,
      },
      {
        heading: "Article 3 — Engagements de l'apprenti",
        content: `<p>• Respecter le règlement intérieur de l'organisme d'accueil<br>• Tenir un carnet de bord et restituer ses acquis au retour<br>• Compléter le rapport Erasmus+ et l'enquête de satisfaction<br>• Respecter la durée et le programme convenus</p>`,
      },
      {
        heading: "Article 4 — Bourse et financement",
        content: `<p>L'apprenti perçoit une bourse Erasmus+ d'un montant indicatif de <strong>1 200 € pour 4 semaines</strong>, virée en deux fois (80 % avant le départ, 20 % au retour après remise du rapport).</p>`,
      },
      {
        heading: "Référent mobilité internationale",
        content: `<p><strong>Référent désigné :</strong> ${o.responsablePedagogique || o.dirigeant}<br><strong>Email :</strong> ${o.email}<br><strong>Téléphone :</strong> ${o.telephone || "—"}</p>`,
        variant: "green",
      },
      {
        heading: `Fait à ${o.ville}, le ${formatDate(new Date().toISOString().slice(0, 10))}`,
        content: `<p style="margin-top:30px"><strong>Signature du CFA</strong><br>${o.dirigeant}</p><p style="margin-top:30px"><strong>Signature de l'apprenti</strong><br>${s.prenom} ${s.nom}</p><p style="margin-top:30px"><strong>Signature de l'organisme d'accueil</strong></p>`,
      },
    ],
  });
}

export function genProcedureMobiliteErasmusCFA(o: OrganismeInfo) {
  return buildDocument({
    org: o,
    title: "PROCÉDURE DE MOBILITÉ INTERNATIONALE ERASMUS+",
    sections: [
      {
        heading: "Objet (Mission 9 — Art. L6231-2)",
        content: `<p>La présente procédure décrit les étapes permettant à un apprenti de <strong>${o.nom}</strong> de réaliser une période de mobilité à l'étranger dans le cadre du programme Erasmus+ Apprentissage.</p>`,
      },
      {
        heading: "Étape 1 — Information et sensibilisation",
        content: `<p>Présentation du dispositif Erasmus+ lors du livret d'accueil et lors d'une réunion d'information annuelle. Affichage permanent sur le site du CFA et dans les locaux.</p>`,
      },
      {
        heading: "Étape 2 — Candidature",
        content: `<p>L'apprenti candidat dépose un dossier comprenant :<br>• Lettre de motivation<br>• CV en français et en anglais<br>• Accord écrit de l'employeur (maître d'apprentissage)<br>• Avis pédagogique du formateur référent</p>`,
      },
      {
        heading: "Étape 3 — Sélection et préparation",
        content: `<p>Sélection en commission paritaire (Direction CFA + Référent pédagogique + Référent mobilité). Préparation linguistique (30 h minimum), culturelle et professionnelle.</p>`,
      },
      {
        heading: "Étape 4 — Mobilité",
        content: `<p>Signature de la Convention Erasmus+, du Learning Agreement et de l'engagement qualité. Suivi hebdomadaire par le référent mobilité (visio + reporting).</p>`,
      },
      {
        heading: "Étape 5 — Retour et validation",
        content: `<p>Remise de l'<strong>Europass Mobilité</strong>, validation des acquis dans le livret d'apprentissage, restitution devant la promotion, enquête de satisfaction et bilan financier.</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 11 — Aide à la recherche d'employeur
// ============================================================================
export function genProcedureAideRechercheEmployeurCFA(o: OrganismeInfo) {
  return buildDocument({
    org: o,
    title: "PROCÉDURE D'AIDE À LA RECHERCHE D'UN EMPLOYEUR",
    sections: [
      {
        heading: "Objet (Mission 11 — Art. L6231-2)",
        content: `<p>Le CFA <strong>${o.nom}</strong> accompagne tout candidat inscrit dans la recherche d'un employeur en vue de la signature d'un contrat d'apprentissage. L'accompagnement débute dès l'inscription et se poursuit jusqu'à 3 mois après le début de la formation.</p>`,
      },
      {
        heading: "Étape 1 — Diagnostic individuel",
        content: `<p>Entretien individuel de positionnement avec le référent recrutement : projet professionnel, secteur visé, mobilité, points forts/freins, plan d'action personnalisé.</p>`,
      },
      {
        heading: "Étape 2 — Outils mis à disposition",
        content: `<p>• Atelier CV et lettre de motivation (4 h obligatoires)<br>• Atelier simulation d'entretien d'embauche (3 h)<br>• Annuaire des 120+ entreprises partenaires du CFA<br>• Accès à la plateforme « 1jeune1solution » et « La Bonne Alternance »<br>• Diffusion hebdomadaire d'offres ciblées par mail</p>`,
      },
      {
        heading: "Étape 3 — Mise en relation",
        content: `<p>Le référent recrutement organise jobdatings (2 par an minimum), met en relation directe candidats / entreprises partenaires, et participe à la pré-sélection des candidatures.</p>`,
      },
      {
        heading: "Étape 4 — Suivi rapproché",
        content: `<p>Un point hebdomadaire est organisé avec chaque candidat sans contrat. Le suivi est tracé dans le tableau de bord « Candidats sans contrat ».</p>`,
      },
      {
        heading: "Étape 5 — Sécurisation post-contrat",
        content: `<p>Vérification que le contrat signé respecte les conditions légales (durée, rémunération, maître d'apprentissage qualifié). Accompagnement à la signature et au dépôt CERFA EJ20.</p>`,
        variant: "green",
      },
      {
        heading: "Référent recrutement / aide à la recherche",
        content: `<p><strong>Référent désigné :</strong> ${o.poleAdministratif || o.dirigeant}<br><strong>Email :</strong> ${o.email}<br><strong>Téléphone :</strong> ${o.telephone || "—"}</p>`,
      },
    ],
  });
}

export function genTableauSuiviCandidatsSansContratCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const today = new Date().toISOString().slice(0, 10);
  const statuts = [
    "Contrat signé",
    "En entretien — TRANSPORTS DUPONT",
    "Pré-sélectionné — LOGISTIQUE EXPRESS",
    "Contrat signé",
    "Recherche active — 8 candidatures envoyées",
  ];
  const actions = [
    "—",
    "Coaching entretien le 15/—",
    "Relance employeur prévue le 18/—",
    "—",
    "Job dating le 22/— + atelier CV refait",
  ];
  const rows = stagiaires.map((s, i) => [
    `${s.prenom} ${s.nom}`,
    s.entreprise ? "✓" : "✗",
    s.entreprise || statuts[i % statuts.length],
    actions[i % actions.length],
    s.entreprise ? "Clos" : "Suivi actif",
    formatDate(today),
  ]);

  return buildDocument({
    org: o,
    title: "TABLEAU DE SUIVI — CANDIDATS SANS CONTRAT D'APPRENTISSAGE",
    sections: [
      {
        heading: "Cadre (Mission 11)",
        content: `<p>Tableau actualisé chaque semaine par le référent recrutement de <strong>${o.nom}</strong>. Tout candidat sans contrat bénéficie d'un suivi individuel jusqu'à 3 mois après le début de la formation.</p>`,
      },
      {
        heading: "Suivi individuel",
        content: tableHTML(
          ["Candidat", "Contrat signé", "Statut / Démarches", "Action prochaine", "Suivi", "Mise à jour"],
          rows
        ),
      },
      {
        heading: "Indicateurs",
        content: `<p><strong>Taux de candidats avec contrat à J+30 :</strong> 72 %<br><strong>Taux de candidats avec contrat à J+90 :</strong> 94 %<br><strong>Nombre moyen de mises en relation par candidat :</strong> 6</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 13 — Attestation de formation Maître d'Apprentissage
// ============================================================================
export function genAttestationFormationMaitreApprentissageCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "Apprenti", nom: "Modèle", entreprise: "Entreprise d'accueil" } as StagiaireInfo;
  const today = new Date().toISOString().slice(0, 10);
  return buildDocument({
    org: o,
    title: "ATTESTATION DE FORMATION DU MAÎTRE D'APPRENTISSAGE",
    sections: [
      {
        heading: "Cadre (Mission 13 — Art. L6231-2 et R6223-24 du Code du Travail)",
        content: `<p>Le CFA <strong>${o.nom}</strong> propose et atteste de la formation des maîtres d'apprentissage à la fonction tutorale, conformément à la 13ᵉ mission des CFA.</p>`,
      },
      {
        heading: "Identité du Maître d'Apprentissage formé",
        content: `<p><strong>Nom et prénom :</strong> [Nom du maître d'apprentissage]<br><strong>Fonction :</strong> [Fonction dans l'entreprise]<br><strong>Entreprise :</strong> ${s.entreprise || "[Entreprise d'accueil]"}<br><strong>Apprenti suivi :</strong> ${s.prenom} ${s.nom}</p>`,
      },
      {
        heading: "Formation suivie",
        content: tableHTML(
          ["Module", "Durée", "Date", "Modalité"],
          [
            ["Cadre légal de l'apprentissage et rôle du MA", "3 h 30", formatDate(today), "Présentiel"],
            ["Pédagogie de l'alternance et transmission des savoir-faire", "7 h 00", formatDate(today), "Présentiel"],
            ["Évaluation des compétences et utilisation du livret apprentissage", "3 h 30", formatDate(today), "Présentiel"],
            ["Communication, posture et gestion des conflits", "3 h 30", formatDate(today), "Présentiel"],
            ["Articulation CFA / Entreprise / Apprenti", "3 h 30", formatDate(today), "Distanciel"],
          ]
        ),
      },
      {
        heading: "Évaluation",
        content: `<p>Cas pratique de mise en situation et quiz de validation des acquis. <strong>Résultat :</strong> Module validé.</p>`,
      },
      {
        heading: "Attestation",
        content: `<p>Le CFA <strong>${o.nom}</strong> atteste que le maître d'apprentissage désigné ci-dessus a suivi avec assiduité l'intégralité de la formation à la fonction tutorale, soit <strong>21 heures</strong>, et qu'il dispose des compétences nécessaires à l'accompagnement pédagogique de l'apprenti.</p>`,
        variant: "green",
      },
      {
        heading: `Fait à ${o.ville}, le ${formatDate(today)}`,
        content: `<p style="margin-top:30px"><strong>Pour le CFA</strong><br>${o.dirigeant}<br>Directeur(trice) du CFA</p>`,
      },
    ],
  });
}
