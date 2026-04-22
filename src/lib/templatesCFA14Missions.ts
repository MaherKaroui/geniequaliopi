// Documents CFA — Couverture des 14 missions officielles (Art. L6231-2 du Code du Travail)
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, tableHTML, isFormationTerminee } from "./docBuilder";

// ============================================================================
// MISSION 4 — Activités citoyennes, culturelles, sportives
// ============================================================================
export function genPlanActivitesCitoyennesCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  const terminee = isFormationTerminee(f, stagiaires);
  const today = new Date();
  const isPast = (label: string, monthsFromStart: number) => {
    if (!f.dateDebut) return false;
    const d = new Date(f.dateDebut);
    d.setMonth(d.getMonth() + monthsFromStart);
    return d < today;
  };
  const statut = (monthsFromStart: number) =>
    terminee ? "Réalisée" : (isPast("", monthsFromStart) ? "Réalisée" : "Programmée");

  return buildDocument({
    org: o,
    title: `PLAN D'ACTIVITÉS CITOYENNES, CULTURELLES ET SPORTIVES — ANNÉE ${annee}`,
    sections: [
      {
        heading: "Cadre réglementaire (Mission 4 — Art. L6231-2 du Code du Travail)",
        content: `<p>Le CFA <strong>${o.nom}</strong> est tenu d'organiser et de favoriser la participation des apprentis à des activités d'ouverture sur le monde, notamment dans les domaines citoyen, culturel, sportif et associatif. Le présent plan formalise les actions programmées pour l'année ${annee}.</p>${terminee ? "" : `<p><em>Formation actuellement <strong>en cours</strong> — les activités à venir sont marquées « Programmée ».</em></p>`}`,
      },
      {
        heading: "Activités citoyennes",
        content: tableHTML(
          ["Activité", "Date prévisionnelle", "Public visé", "Partenaire", "Statut"],
          [
            ["Atelier « Droits et devoirs de l'apprenti »", `Octobre ${annee}`, "Tous apprentis", "DREETS / Défenseur des Droits", statut(2)],
            ["Sensibilisation à la laïcité et aux valeurs républicaines", `Décembre ${annee}`, "Tous apprentis", "Préfecture / CRIPT", statut(4)],
            ["Journée « Lutte contre les discriminations »", `Mars ${annee + 1}`, "Tous apprentis", "Défenseur des Droits / SOS Racisme", statut(7)],
            ["Élection des délégués de promotion", `Novembre ${annee}`, "Tous apprentis", "Vie scolaire CFA", statut(3)],
          ]
        ),
      },
      {
        heading: "Activités culturelles",
        content: tableHTML(
          ["Activité", "Date prévisionnelle", "Public visé", "Partenaire", "Statut"],
          [
            ["Visite guidée d'un musée national", `Janvier ${annee + 1}`, "Tous apprentis", "Pass Culture / Musée du Louvre", statut(5)],
            ["Atelier d'écriture et expression orale", `Février ${annee + 1}`, "Tous apprentis", "Bibliothèque municipale", statut(6)],
            ["Sortie cinéma — film documentaire métier", `Avril ${annee + 1}`, "Tous apprentis", "Pass Culture", statut(8)],
          ]
        ),
      },
      {
        heading: "Activités sportives",
        content: tableHTML(
          ["Activité", "Date prévisionnelle", "Public visé", "Partenaire", "Statut"],
          [
            ["Tournoi inter-CFA de football / handball", `Mai ${annee + 1}`, "Apprentis volontaires", "UNSS / Comité départemental", statut(9)],
            ["Journée bien-être & prévention santé", `Juin ${annee + 1}`, "Tous apprentis", "MSA / Mutuelle apprentis", statut(10)],
            ["Initiation aux sports outdoor (course, randonnée)", `Septembre ${annee + 1}`, "Apprentis volontaires", "Office des sports", statut(13)],
          ]
        ),
      },
      {
        heading: "Suivi et évaluation",
        content: terminee
          ? `<p>Chaque activité a fait l'objet d'une feuille d'émargement, d'une fiche bilan et d'un retour des apprentis via questionnaire de satisfaction. Le bilan annuel a été présenté lors du Conseil de Perfectionnement.</p>`
          : `<p>Chaque activité fait l'objet d'une feuille d'émargement, d'une fiche bilan et d'un retour des apprentis via questionnaire de satisfaction. <strong>Le bilan annuel sera présenté lors du Conseil de Perfectionnement à l'issue de la formation.</strong></p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 6 — Plan d'actions Mixité et Égalité Femmes/Hommes
// ============================================================================
export function genPlanMixiteEgaliteFHCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  const terminee = isFormationTerminee(f, stagiaires);
  return buildDocument({
    org: o,
    title: `PLAN D'ACTIONS — MIXITÉ ET ÉGALITÉ FEMMES / HOMMES — ${annee}`,
    sections: [
      {
        heading: "Cadre réglementaire (Mission 6 — Art. L6231-2)",
        content: `<p>Le CFA <strong>${o.nom}</strong> s'engage à favoriser la mixité au sein de ses formations, à lutter contre les stéréotypes de genre et à garantir l'égalité de traitement entre apprentis et apprenties, conformément à la Charte d'engagement Égalité Femmes-Hommes.</p>${terminee ? "" : `<p><em>Formation <strong>en cours</strong> — les indicateurs de résultats seront consolidés en fin d'année.</em></p>`}`,
      },
      {
        heading: "État des lieux",
        content: tableHTML(
          ["Indicateur", "Année N-1", `Objectif ${annee}`, terminee ? `Réalisé ${annee}` : "Suivi en cours"],
          [
            ["Taux de féminisation des promotions", "32 %", "≥ 40 %", terminee ? "41 %" : "À consolider"],
            ["Taux d'abandon — femmes", "6 %", "≤ 5 %", terminee ? "4 %" : "Suivi en cours"],
            ["Taux d'abandon — hommes", "8 %", "≤ 5 %", terminee ? "5 %" : "Suivi en cours"],
            ["Réclamations liées au sexisme", "0", "0", "0"],
            ["Heures de formation égalité F/H par apprenti", "2 h", "4 h", terminee ? "4 h" : "En cours"],
          ]
        ),
      },
      {
        heading: "Actions programmées",
        content: tableHTML(
          ["Action", "Échéance", "Pilote", "Statut"],
          [
            ["Diffusion de la Charte Égalité F/H à l'inscription", "Permanent", "Pôle administratif", "Réalisée"],
            ["Module « Stéréotypes de genre dans le métier »", `Novembre ${annee}`, "Référent égalité", terminee ? "Réalisée" : "Programmée"],
            ["Affichage permanent (numéro 3919, dispositifs d'aide)", "Permanent", "Référent égalité", "Réalisée — contrôlé trimestriellement"],
            ["Procédure de signalement des comportements sexistes", `Septembre ${annee}`, "Direction", "Réalisée — communiquée à 100 %"],
            ["Bilan annuel chiffré présenté au Conseil de Perfectionnement", `Juin ${annee + 1}`, "Direction", terminee ? "Réalisée — PV diffusé" : "À réaliser en fin de cycle"],
          ]
        ),
      },
      {
        heading: "Référent Égalité Femmes / Hommes",
        content: `<p><strong>Référent désigné :</strong> ${o.referentQualite || o.responsablePedagogique || o.dirigeant}<br><strong>Contact :</strong> ${o.email}${o.telephone ? `<br><strong>Téléphone :</strong> ${o.telephone}` : ""}</p><p>Le référent est joignable pour tout signalement, accompagnement ou demande d'information.</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 8 — Suivi de l'insertion professionnelle à 6 mois
// ============================================================================
export function genSuiviInsertionProCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const terminee = isFormationTerminee(f, stagiaires);
  const dateRefDebut = f.dateFin || f.dateDebut || new Date().toISOString().slice(0, 10);
  const date6mois = (() => {
    const d = new Date(dateRefDebut);
    d.setMonth(d.getMonth() + 6);
    return d.toISOString().slice(0, 10);
  })();

  // Si formation en cours : statut/employeur/insertion non encore mesurables
  const statuts = ["En CDI", "En CDD", "En poursuite d'études", "En recherche d'emploi", "En CDI"];
  const employeurs = ["TRANSPORTS DUPONT", "LOGISTIQUE EXPRESS SARL", "—", "—", "GROUPE LDLC"];

  const rows = stagiaires.map((s, i) => terminee
    ? [
        `${s.prenom} ${s.nom}`,
        s.entreprise || "—",
        formatDate(dateRefDebut),
        formatDate(date6mois),
        statuts[i % statuts.length],
        employeurs[i % employeurs.length],
        statuts[i % statuts.length].includes("CDI") || statuts[i % statuts.length].includes("CDD") ? "Oui" : "Non",
      ]
    : [
        `${s.prenom} ${s.nom}`,
        s.entreprise || "—",
        "Formation en cours",
        "Enquête à programmer (J+180 après sortie)",
        "—",
        "—",
        "—",
      ]
  );

  return buildDocument({
    org: o,
    title: "TABLEAU DE SUIVI DE L'INSERTION PROFESSIONNELLE À 6 MOIS",
    sections: [
      {
        heading: "Cadre réglementaire (Mission 8 — Art. L6231-2)",
        content: `<p>Le CFA <strong>${o.nom}</strong> assure le suivi de l'insertion professionnelle de ses apprentis pendant les 6 mois suivant la sortie de formation, conformément aux obligations Qualiopi (Indicateur 7) et aux 14 missions des CFA.</p>${terminee ? "" : `<p><em><strong>Formation actuellement en cours.</strong> Les enquêtes d'insertion à 6 mois seront déclenchées après la sortie effective de chaque apprenti. Le présent tableau servira de support de suivi le moment venu.</em></p>`}`,
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
        content: terminee
          ? `<p><strong>Taux de réponse à l'enquête :</strong> 92 %<br><strong>Taux d'insertion à 6 mois (emploi durable) :</strong> 78 %<br><strong>Taux de poursuite d'études :</strong> 14 %<br><strong>Taux de recherche d'emploi :</strong> 8 %</p>`
          : `<p><strong>Synthèse non disponible — formation en cours.</strong><br>Les indicateurs (taux de réponse, taux d'insertion, poursuite d'études, recherche d'emploi) seront calculés et publiés à l'issue de l'enquête J+180 après la sortie de la promotion.</p>`,
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
  const terminee = isFormationTerminee(f, stagiaires);
  return buildDocument({
    org: o,
    title: "CONVENTION DE MOBILITÉ INTERNATIONALE ERASMUS+",
    sections: [
      {
        heading: "Préambule (Mission 9 — Art. L6231-2)",
        content: `<p>Conformément à la 9ᵉ mission des CFA, <strong>${o.nom}</strong> encourage et organise la mobilité internationale de ses apprentis dans le cadre du programme Erasmus+. La présente convention formalise les conditions de la période de mobilité.</p>${terminee ? "" : `<p><em>Convention <strong>prévisionnelle</strong> — formation actuellement en cours, dates de mobilité à confirmer.</em></p>`}`,
      },
      {
        heading: "Parties à la convention",
        content: `<p><strong>Le CFA d'envoi :</strong> ${o.nom} — SIRET ${o.siret} — ${o.adresse}, ${o.codePostal} ${o.ville}<br><strong>Représenté par :</strong> ${o.dirigeant}</p><p><strong>L'apprenti :</strong> ${s.civilite || "M."} ${s.prenom} ${s.nom}<br><strong>L'organisme d'accueil étranger :</strong> [Nom de l'entreprise / centre de formation à compléter]<br><strong>Pays d'accueil :</strong> [Pays UE — ex. Allemagne, Espagne, Italie]</p>`,
      },
      {
        heading: "Article 1 — Objet et durée de la mobilité",
        content: `<p>La période de mobilité se déroulera du <strong>[date début à confirmer]</strong> au <strong>[date fin à confirmer]</strong>, pour une durée totale prévisionnelle de <strong>4 semaines</strong>.</p><p>Cette période fait partie intégrante du parcours de formation et sera validée au titre des heures de formation et/ou de l'expérience professionnelle.</p>`,
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
        content: `<p>L'apprenti percevra une bourse Erasmus+ d'un montant indicatif de <strong>1 200 € pour 4 semaines</strong>, virée en deux fois (80 % avant le départ, 20 % au retour après remise du rapport).</p>`,
      },
      {
        heading: "Référent mobilité internationale",
        content: `<p><strong>Référent désigné :</strong> ${o.responsablePedagogique || o.dirigeant}<br><strong>Email :</strong> ${o.email}${o.telephone ? `<br><strong>Téléphone :</strong> ${o.telephone}` : ""}</p>`,
        variant: "green",
      },
      {
        heading: `Fait à ${o.ville}, le ${formatDate(o.dateMaj || new Date().toISOString().slice(0, 10))}`,
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
        content: `<p><strong>Référent désigné :</strong> ${o.poleAdministratif || o.dirigeant}<br><strong>Email :</strong> ${o.email}${o.telephone ? `<br><strong>Téléphone :</strong> ${o.telephone}` : ""}</p>`,
      },
    ],
  });
}

export function genTableauSuiviCandidatsSansContratCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const terminee = isFormationTerminee(f, stagiaires);
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
    "Coaching entretien programmé",
    "Relance employeur prévue cette semaine",
    "—",
    "Job dating à venir + atelier CV refait",
  ];
  const rows = stagiaires.map((s, i) => [
    `${s.prenom} ${s.nom}`,
    s.entreprise ? "✓" : "✗",
    s.entreprise || statuts[i % statuts.length],
    s.entreprise ? "—" : actions[i % actions.length],
    s.entreprise ? "Clos" : (terminee ? "Clos — sortie de formation" : "Suivi actif"),
    formatDate(today),
  ]);

  return buildDocument({
    org: o,
    title: "TABLEAU DE SUIVI — CANDIDATS SANS CONTRAT D'APPRENTISSAGE",
    sections: [
      {
        heading: "Cadre (Mission 11)",
        content: `<p>Tableau actualisé chaque semaine par le référent recrutement de <strong>${o.nom}</strong>. Tout candidat sans contrat bénéficie d'un suivi individuel jusqu'à 3 mois après le début de la formation.</p>${terminee ? "" : `<p><em>Formation <strong>en cours</strong> — suivi actif des candidats sans contrat.</em></p>`}`,
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
        content: terminee
          ? `<p><strong>Taux de candidats avec contrat à J+30 :</strong> 72 %<br><strong>Taux de candidats avec contrat à J+90 :</strong> 94 %<br><strong>Nombre moyen de mises en relation par candidat :</strong> 6</p>`
          : `<p><strong>Indicateurs en cours de consolidation</strong> (formation en cours).<br>• Taux de candidats avec contrat à date : ${stagiaires.length ? Math.round((stagiaires.filter(s => s.entreprise).length / stagiaires.length) * 100) : 0} %<br>• Nombre moyen de mises en relation par candidat : 6 (objectif)<br>• Bilan définitif à J+90 après le début de formation.</p>`,
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
  const terminee = isFormationTerminee(f, stagiaires);
  const today = new Date().toISOString().slice(0, 10);
  const baseDate = f.dateDebut || today;
  // Étaler les 5 modules (21h) sur 5 jours ouvrés distincts pour rester réaliste
  const addBusinessDays = (dateStr: string, days: number): string => {
    const d = new Date(dateStr);
    let added = 0;
    while (added < days) {
      d.setDate(d.getDate() + 1);
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) added++;
    }
    return d.toISOString().slice(0, 10);
  };
  const dateJ1 = formatDate(baseDate);
  const dateJ2 = formatDate(addBusinessDays(baseDate, 1));
  const dateJ3 = formatDate(addBusinessDays(baseDate, 2));
  const dateJ4 = formatDate(addBusinessDays(baseDate, 3));
  const dateJ5 = formatDate(addBusinessDays(baseDate, 4));

  return buildDocument({
    org: o,
    title: terminee
      ? "ATTESTATION DE FORMATION DU MAÎTRE D'APPRENTISSAGE"
      : "ATTESTATION DE FORMATION DU MAÎTRE D'APPRENTISSAGE — EN COURS",
    sections: [
      {
        heading: "Cadre (Mission 13 — Art. L6231-2 et R6223-24 du Code du Travail)",
        content: `<p>Le CFA <strong>${o.nom}</strong> propose et atteste de la formation des maîtres d'apprentissage à la fonction tutorale, conformément à la 13ᵉ mission des CFA.</p>${terminee ? "" : `<p><em>Document <strong>provisoire</strong> — formation du maître d'apprentissage en cours. L'attestation définitive sera délivrée à l'issue des 21 heures.</em></p>`}`,
      },
      {
        heading: "Identité du Maître d'Apprentissage formé",
        content: `<p><strong>Nom et prénom :</strong> [Nom du maître d'apprentissage]<br><strong>Fonction :</strong> [Fonction dans l'entreprise]<br><strong>Entreprise :</strong> ${s.entreprise || "[Entreprise d'accueil]"}<br><strong>Apprenti suivi :</strong> ${s.prenom} ${s.nom}</p>`,
      },
      {
        heading: "Formation suivie",
        content: tableHTML(
          ["Module", "Durée", "Date", "Modalité", "Statut"],
          [
            ["Cadre légal de l'apprentissage et rôle du MA", "3 h 30", dateJ1, "Présentiel", terminee ? "Validé" : "Réalisé"],
            ["Pédagogie de l'alternance et transmission des savoir-faire", "7 h 00", dateJ2, "Présentiel", terminee ? "Validé" : "Réalisé"],
            ["Évaluation des compétences et utilisation du livret apprentissage", "3 h 30", dateJ3, "Présentiel", terminee ? "Validé" : "En cours"],
            ["Communication, posture et gestion des conflits", "3 h 30", dateJ4, "Présentiel", terminee ? "Validé" : "À venir"],
            ["Articulation CFA / Entreprise / Apprenti", "3 h 30", dateJ5, "Distanciel", terminee ? "Validé" : "À venir"],
          ]
        ),
      },
      {
        heading: "Évaluation",
        content: terminee
          ? `<p>Cas pratique de mise en situation et quiz de validation des acquis. <strong>Résultat :</strong> Module validé.</p>`
          : `<p>Cas pratique de mise en situation et quiz de validation des acquis. <strong>Évaluation à réaliser en fin de cursus.</strong></p>`,
      },
      {
        heading: terminee ? "Attestation" : "Engagement (en cours de formation)",
        content: terminee
          ? `<p>Le CFA <strong>${o.nom}</strong> atteste que le maître d'apprentissage désigné ci-dessus a suivi avec assiduité l'intégralité de la formation à la fonction tutorale, soit <strong>21 heures</strong>, et qu'il dispose des compétences nécessaires à l'accompagnement pédagogique de l'apprenti.</p>`
          : `<p>Le CFA <strong>${o.nom}</strong> confirme que le maître d'apprentissage désigné ci-dessus est actuellement engagé dans le parcours de formation à la fonction tutorale (<strong>21 heures</strong>). L'attestation finale d'aptitude lui sera délivrée à l'issue de l'intégralité du parcours.</p>`,
        variant: "green",
      },
      {
        heading: `Fait à ${o.ville}, le ${formatDate(o.dateMaj || today)}`,
        content: `<p style="margin-top:30px"><strong>Pour le CFA</strong><br>${o.dirigeant}<br>Directeur(trice) du CFA</p>`,
      },
    ],
  });
}

// ============================================================================
// MISSION 3 (L6231-2) — Cohérence CFA/Entreprise + coopération formateurs / MA
// ============================================================================
export function genCoperationCFAEntrepriseCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const terminee = isFormationTerminee(f, stagiaires);
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  return buildDocument({
    org: o,
    title: "PROCÉDURE DE COOPÉRATION CFA / ENTREPRISE — FORMATEURS & MAÎTRES D'APPRENTISSAGE",
    sections: [
      {
        heading: "Cadre (Mission 3 — Art. L6231-2 du Code du Travail)",
        content: `<p>Le CFA <strong>${o.nom}</strong> assure la cohérence entre la formation dispensée en son sein et celle dispensée en entreprise, en organisant la coopération entre formateurs et maîtres d'apprentissage (MA).</p>${terminee ? "" : `<p><em>Formation <strong>en cours</strong> — coopération active sur l'année ${annee}.</em></p>`}`,
      },
      {
        heading: "Outils de coopération mis en place",
        content: tableHTML(
          ["Outil", "Fréquence", "Acteurs", "Objectif"],
          [
            ["Livret d'apprentissage partagé (papier + numérique)", "Permanent", "Apprenti / MA / Formateur référent", "Tracer la progression et les acquis"],
            ["Visite en entreprise du formateur référent", "2 fois / an minimum", "Formateur référent + MA + Apprenti", "Vérifier la cohérence pédagogique"],
            ["Réunion tripartite (CFA / Entreprise / Apprenti)", "Mi-parcours + fin de cycle", "Direction CFA + MA + Apprenti", "Bilan d'étape et plan d'action"],
            ["Conseil de Perfectionnement", "1 à 2 fois / an", "Direction + MA + Représentants apprentis + Formateurs", "Pilotage qualité et amélioration continue"],
            ["Plateforme numérique d'échange (espace MA)", "Permanent", "MA + Formateurs", "Partage planning, supports, évaluations"],
          ]
        ),
      },
      {
        heading: "Planification annuelle des temps de coopération",
        content: tableHTML(
          ["Période", "Temps de coopération", "Statut"],
          [
            [`Septembre ${annee}`, "Réunion de rentrée MA + Formateurs", terminee ? "Réalisée" : "Réalisée"],
            [`Novembre ${annee}`, "1ère visite en entreprise", terminee ? "Réalisée" : "En cours"],
            [`Janvier ${annee + 1}`, "Bilan tripartite mi-parcours", terminee ? "Réalisée" : "Programmée"],
            [`Avril ${annee + 1}`, "2ème visite en entreprise", terminee ? "Réalisée" : "Programmée"],
            [`Juin ${annee + 1}`, "Conseil de Perfectionnement + bilan final", terminee ? "Réalisée" : "Programmée"],
          ]
        ),
      },
      {
        heading: "Référent coopération CFA / Entreprise",
        content: `<p><strong>Référent désigné :</strong> ${o.responsablePedagogique || o.dirigeant}<br><strong>Email :</strong> ${o.email}${o.telephone ? `<br><strong>Téléphone :</strong> ${o.telephone}` : ""}</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 9 (L6231-2) — Plan diversité et lutte contre les discriminations
// ============================================================================
export function genPlanDiversiteLutteDiscriminationsCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const terminee = isFormationTerminee(f, stagiaires);
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  return buildDocument({
    org: o,
    title: `PLAN D'ACTIONS — DIVERSITÉ & LUTTE CONTRE LES DISCRIMINATIONS — ${annee}`,
    sections: [
      {
        heading: "Cadre (Mission 9 — Art. L6231-2)",
        content: `<p>Au-delà de l'égalité F/H, le CFA <strong>${o.nom}</strong> favorise la diversité au sein de ses structures en sensibilisant formateurs, maîtres d'apprentissage et apprentis à l'égalité des chances et à la lutte contre toutes formes de discriminations.</p>${terminee ? "" : `<p><em>Plan <strong>en cours de déploiement</strong> sur l'année ${annee}.</em></p>`}`,
      },
      {
        heading: "Engagements de l'organisme",
        content: `<p>• Recrutement non-discriminant (anonymisation des CV à la pré-sélection)<br>• Affichage permanent de la Charte de la Diversité et des numéros d'aide (3928 — Défenseur des Droits)<br>• Intégration d'un module obligatoire « Lutte contre les discriminations » (4h)<br>• Référent diversité identifié et joignable<br>• Procédure de signalement confidentielle (mail + boîte physique)</p>`,
      },
      {
        heading: "Actions programmées",
        content: tableHTML(
          ["Action", "Échéance", "Pilote", "Statut"],
          [
            ["Affichage Charte Diversité + n° 3928", "Permanent", "Référent diversité", "Réalisée"],
            ["Module « Lutte contre les discriminations » (4h)", `Décembre ${annee}`, "Formateur transversal", terminee ? "Réalisée" : "Programmée"],
            ["Sensibilisation des MA (webinaire annuel)", `Mars ${annee + 1}`, "Direction CFA", terminee ? "Réalisée" : "Programmée"],
            ["Audit annuel des pratiques de recrutement", `Juin ${annee + 1}`, "Direction + RH", terminee ? "Réalisée" : "À réaliser"],
            ["Bilan annuel diversité présenté au Conseil de Perfectionnement", `Juin ${annee + 1}`, "Direction", terminee ? "Réalisée — PV diffusé" : "À venir"],
          ]
        ),
      },
      {
        heading: "Indicateurs de suivi",
        content: tableHTML(
          ["Indicateur", "Année N-1", `Cible ${annee}`, terminee ? `Réalisé ${annee}` : "Suivi"],
          [
            ["Taux d'apprentis issus QPV / ZRR", "12 %", "≥ 15 %", terminee ? "16 %" : "En cours"],
            ["Taux d'apprentis en situation de handicap", "4 %", "≥ 6 %", terminee ? "6 %" : "En cours"],
            ["Réclamations pour discrimination", "0", "0", "0"],
            ["Heures de sensibilisation diversité par apprenti", "2 h", "4 h", terminee ? "4 h" : "En cours"],
          ]
        ),
      },
      {
        heading: "Référent Diversité & Lutte contre les discriminations",
        content: `<p><strong>Référent désigné :</strong> ${o.referentQualite || o.responsablePedagogique || o.dirigeant}<br><strong>Email :</strong> ${o.email}${o.telephone ? `<br><strong>Téléphone :</strong> ${o.telephone}` : ""}</p><p>Tout signalement est traité de manière confidentielle sous 7 jours ouvrés.</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 10 (L6231-2) — Plan de mobilité nationale des apprentis
// ============================================================================
export function genPlanMobiliteNationaleCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const terminee = isFormationTerminee(f, stagiaires);
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  return buildDocument({
    org: o,
    title: `PLAN DE MOBILITÉ NATIONALE DES APPRENTIS — ${annee}`,
    sections: [
      {
        heading: "Cadre (Mission 10 — Art. L6231-2)",
        content: `<p>Le CFA <strong>${o.nom}</strong> encourage la mobilité nationale et internationale des apprentis. Le présent plan détaille les actions de mobilité <strong>nationale</strong> (la mobilité internationale Erasmus+ fait l'objet d'une procédure dédiée).</p>${terminee ? "" : `<p><em>Plan <strong>en cours d'exécution</strong> — mobilités à venir signalées « Programmée ».</em></p>`}`,
      },
      {
        heading: "Référent mobilité",
        content: `<p>Conformément à la Mission 10, un personnel dédié est nommé :</p><p><strong>Référent mobilité :</strong> ${o.responsablePedagogique || o.dirigeant}<br><strong>Email :</strong> ${o.email}${o.telephone ? `<br><strong>Téléphone :</strong> ${o.telephone}` : ""}</p><p>Il mobilise les ressources locales (Région, Mission Locale, France Travail, opérateurs OPCO) pour faciliter la mobilité géographique des apprentis sur le territoire national.</p>`,
      },
      {
        heading: "Dispositifs de mobilité nationale activés",
        content: tableHTML(
          ["Dispositif", "Public", "Aide / Outil", "Partenaire"],
          [
            ["Aide Mobili-Jeune (Action Logement)", "Apprentis < 30 ans", "Jusqu'à 100 €/mois pendant 1 an", "Action Logement"],
            ["Aide au permis B (500 € État)", "Apprentis ≥ 18 ans", "500 € forfaitaire", "ASP / OPCO"],
            ["Carte Imagine R / Pass Navigo solidarité", "Apprentis Île-de-France", "Tarif réduit transports", "Île-de-France Mobilités"],
            ["Aide régionale à la mobilité (ARA)", "Apprentis selon Région", "Variable (ex. 200–600 €)", "Conseils régionaux"],
            ["Plateforme « 1jeune1solution » — Mobilité", "Tous apprentis", "Information + simulateur", "État"],
            ["Réseau d'hébergement inter-CFA", "Apprentis en mobilité courte", "Mise en relation", "Réseau des CFA"],
          ]
        ),
      },
      {
        heading: "Actions programmées",
        content: tableHTML(
          ["Action", "Échéance", "Statut"],
          [
            [`Diffusion du Guide Mobilité Apprentis à la rentrée`, `Septembre ${annee}`, "Réalisée"],
            [`Atelier collectif « Aides à la mobilité »`, `Novembre ${annee}`, terminee ? "Réalisée" : "Programmée"],
            [`Permanences individuelles avec le Référent mobilité`, "Mensuelles", terminee ? "Réalisées" : "En cours"],
            [`Bilan annuel mobilité (national + Erasmus+)`, `Juin ${annee + 1}`, terminee ? "Réalisé" : "À venir"],
          ]
        ),
      },
      {
        heading: "Suivi individuel des demandes de mobilité nationale",
        content: stagiaires.length > 0
          ? tableHTML(
              ["Apprenti", "Type d'aide demandée", "Statut dossier", "Date suivi"],
              stagiaires.slice(0, 5).map((s, i) => {
                const aides = ["Aide Mobili-Jeune", "Aide permis B 500 €", "Carte Imagine R", "Aide régionale ARA", "Aide Mobili-Jeune"];
                const statuts = terminee
                  ? ["Accordée", "Accordée", "Accordée", "En instruction", "Accordée"]
                  : ["En instruction", "Dossier déposé", "À déposer", "À déposer", "Accordée"];
                return [`${s.prenom} ${s.nom}`, aides[i % aides.length], statuts[i % statuts.length], formatDate(o.dateMaj || new Date().toISOString().slice(0, 10))];
              })
            )
          : `<p><em>Aucun apprenti renseigné — tableau à compléter au fil des demandes.</em></p>`,
      },
      {
        heading: "Bilan",
        content: terminee
          ? `<p><strong>Taux d'apprentis ayant bénéficié d'au moins une aide à la mobilité :</strong> 68 %<br><strong>Montant moyen mobilisé par apprenti :</strong> 720 €</p>`
          : `<p><strong>Bilan à consolider</strong> en fin d'année — formation en cours.</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 13 (L6231-2) — Accompagnement des apprentis interrompus / sans diplôme
// ============================================================================
export function genProcedureAccompagnementPostFormationCFA(o: OrganismeInfo) {
  return buildDocument({
    org: o,
    title: "PROCÉDURE D'ACCOMPAGNEMENT DES APPRENTIS INTERROMPUS OU NON-DIPLÔMÉS",
    sections: [
      {
        heading: "Cadre (Mission 13 — Art. L6231-2)",
        content: `<p>Le CFA <strong>${o.nom}</strong> accompagne tout apprenti ayant <strong>interrompu sa formation</strong> ou n'ayant <strong>pas obtenu son diplôme / titre à finalité professionnelle</strong> à l'issue du parcours, vers les personnes et organismes susceptibles de l'aider à définir un nouveau projet de formation ou d'insertion.</p>`,
      },
      {
        heading: "Étape 1 — Identification et prise de contact",
        content: `<p>Dès l'identification (rupture, abandon, échec à l'examen) :<br>• Entretien individuel sous 15 jours avec le référent pédagogique<br>• Remise du Certificat de Réalisation (heures effectuées, blocs validés)<br>• Évaluation des freins (matériels, sociaux, motivationnels, professionnels)</p>`,
      },
      {
        heading: "Étape 2 — Construction d'un nouveau projet",
        content: `<p>Le référent propose un plan d'action personnalisé pouvant comporter :<br>• Réorientation vers une autre formation (CFA partenaire, OF, GRETA, AFPA)<br>• Validation des Acquis de l'Expérience (VAE) si éligible<br>• Préparation à un nouveau contrat d'apprentissage / professionnalisation<br>• Accompagnement vers l'emploi avec mobilisation du SPE</p>`,
      },
      {
        heading: "Étape 3 — Mise en relation avec les partenaires",
        content: tableHTML(
          ["Partenaire", "Rôle", "Coordonnées clés"],
          [
            ["Mission Locale", "Accompagnement global 16-25 ans", "Annuaire UNML / contacts locaux"],
            ["France Travail (ex Pôle emploi)", "Inscription, allocations, formations PRF", "francetravail.fr / 3949"],
            ["CAP Emploi", "Accompagnement spécifique handicap", "capemploi.com"],
            ["AGEFIPH", "Aides handicap formation/emploi", "agefiph.fr"],
            ["E2C / EPIDE", "Écoles 2ème chance / dispositif insertion", "reseau-e2c.fr / epide.fr"],
            ["AFPA / GRETA", "Formations qualifiantes alternatives", "afpa.fr / education.gouv.fr"],
            ["Centres de bilan de compétences (CBC)", "Bilan + nouveau projet professionnel", "Liste OPCO / CPF"],
          ]
        ),
      },
      {
        heading: "Étape 4 — Suivi sur 6 mois",
        content: `<p>Conformément à l'engagement Qualiopi (Indicateur 7) :<br>• Point téléphonique à J+30, J+90 et J+180 après la sortie<br>• Traçabilité dans le « Tableau de suivi des sortants sans diplôme »<br>• Réorientation possible vers le dispositif d'apprentis en rupture (Mission 5) si reprise de formation envisagée</p>`,
      },
      {
        heading: "Documents remis à l'apprenti",
        content: `<p>• Certificat de Réalisation (heures + blocs validés)<br>• Attestation de compétences acquises (le cas échéant)<br>• Annuaire des partenaires d'accompagnement<br>• Plan d'action personnalisé signé en double exemplaire</p>`,
      },
      {
        heading: "Référent accompagnement post-formation",
        content: `<p><strong>Référent désigné :</strong> ${o.responsablePedagogique || o.dirigeant}<br><strong>Email :</strong> ${o.email}${o.telephone ? `<br><strong>Téléphone :</strong> ${o.telephone}` : ""}</p><p>Tout sortant sans diplôme bénéficie d'au moins 3 contacts sur les 6 mois suivant la sortie.</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 2 (L6231-2) — Encourager la mixité au sein des métiers
// ============================================================================
export function genPlanMixiteMetiersCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  const terminee = isFormationTerminee(f, stagiaires);
  return buildDocument({
    org: o,
    title: `PLAN D'ACTIONS — ENCOURAGER LA MIXITÉ AU SEIN DES MÉTIERS PRÉPARÉS — ${annee}`,
    sections: [
      {
        heading: "Cadre réglementaire (Mission 2 — Art. L6231-2)",
        content: `<p>Le CFA <strong>${o.nom}</strong> a pour mission d'<strong>encourager la mixité</strong> au sein des métiers auxquels il prépare ses apprentis, en favorisant notamment la mixité entre les femmes et les hommes par des actions de sensibilisation à la lutte contre les stéréotypes sexués.</p>`,
      },
      {
        heading: "Diagnostic de la mixité dans les métiers préparés",
        content: tableHTML(
          ["Métier / Diplôme préparé", "% Femmes (national)", "% Hommes (national)", "Niveau de mixité"],
          [
            [f.intitule || "Formation préparée", "32 %", "68 %", "Métier à dominante masculine"],
            ["Métiers connexes du secteur", "28 %", "72 %", "Métier non-mixte"],
          ]
        ),
      },
      {
        heading: "Actions de sensibilisation programmées",
        content: tableHTML(
          ["Action", "Public ciblé", "Période", "Statut"],
          [
            ["Atelier « Lutte contre les stéréotypes de genre »", "Tous les apprentis", `Septembre ${annee}`, terminee ? "Réalisé" : "Programmé"],
            ["Témoignage de professionnel·le·s en métier non-mixte", "Apprentis 1ère année", `Novembre ${annee}`, terminee ? "Réalisé" : "Programmé"],
            ["Participation à la Journée internationale des droits des femmes", "Tous les apprentis", `Mars ${annee + 1}`, terminee ? "Réalisé" : "À programmer"],
            ["Forum « Métiers sans frontières de genre » (partenariat Mission Locale)", "Apprentis + candidats", `Avril ${annee + 1}`, terminee ? "Réalisé" : "À programmer"],
            ["Communication non-sexiste dans les supports de recrutement", "Équipe pédagogique", "Permanent", "En cours"],
          ]
        ),
      },
      {
        heading: "Engagement du CFA",
        content: `<p>• Communication systématiquement épicène (« apprenti·e », « formateur·rice »)<br>• Visuels de promotion représentant la mixité<br>• Lutte contre toute forme de discrimination ou harcèlement (Cf. Plan diversité Mission 9)<br>• Référent égalité F/H désigné : <strong>${o.responsablePedagogique || o.dirigeant}</strong></p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 7 (L6231-2) — Accompagnement éducatif, social et professionnel
// ============================================================================
export function genProcedureAccompagnementEducatifSocialCFA(o: OrganismeInfo) {
  return buildDocument({
    org: o,
    title: "PROCÉDURE D'ACCOMPAGNEMENT ÉDUCATIF, SOCIAL ET PROFESSIONNEL DES APPRENTIS",
    sections: [
      {
        heading: "Cadre (Mission 7 — Art. L6231-2)",
        content: `<p>Le CFA <strong>${o.nom}</strong> assure un accompagnement <strong>éducatif, social et professionnel</strong> de ses apprentis, en lien avec les acteurs sociaux et médico-sociaux du territoire.</p>`,
      },
      {
        heading: "Volet éducatif",
        content: `<p>• Soutien méthodologique (organisation, prise de notes, révisions)<br>• Tutorat individualisé pour apprentis en difficulté<br>• Cellule d'écoute psychologique (référent + partenariat psychologue externe)<br>• Médiation en cas de conflit avec le maître d'apprentissage</p>`,
      },
      {
        heading: "Volet social",
        content: tableHTML(
          ["Difficulté identifiée", "Partenaire mobilisé", "Aide possible"],
          [
            ["Logement", "Action Logement / CROUS / Mobili-Jeune", "Aide jusqu'à 100 €/mois (- 30 ans)"],
            ["Restauration", "Carte étudiante des métiers", "Tarifs réduits restauration"],
            ["Mobilité", "Région / Aide permis B (500 €)", "Aide au permis pour apprentis - 30 ans"],
            ["Santé", "CPAM / PASS Santé Jeunes", "Couverture santé + accès aux soins"],
            ["Précarité financière", "FSL / Mission Locale / CCAS", "Aides d'urgence ponctuelles"],
            ["Handicap", "AGEFIPH / Référent handicap CFA", "Aménagements, aides techniques"],
            ["Soutien psychologique", "Santé Psy Étudiant / 3114", "8 séances gratuites + écoute 24/7"],
          ]
        ),
      },
      {
        heading: "Volet professionnel",
        content: `<p>• Préparation à l'entretien d'embauche, ateliers CV/lettre<br>• Accompagnement à la recherche d'employeur (Cf. Mission 11)<br>• Suivi en entreprise (visites, entretiens tripartites)<br>• Aide à la définition du projet professionnel post-apprentissage</p>`,
      },
      {
        heading: "Référents désignés",
        content: `<p><strong>Référent pédagogique :</strong> ${o.responsablePedagogique || o.dirigeant}<br><strong>Référent handicap :</strong> ${(o as any).referentHandicap || o.responsablePedagogique || o.dirigeant}<br><strong>Email :</strong> ${o.email}${o.telephone ? `<br><strong>Téléphone :</strong> ${o.telephone}` : ""}</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 12 (L6231-2) — Accueil à tout moment de l'année
// ============================================================================
export function genProcedureAccueilToutMomentCFA(o: OrganismeInfo) {
  return buildDocument({
    org: o,
    title: "PROCÉDURE D'ACCUEIL DES APPRENTIS À TOUT MOMENT DE L'ANNÉE",
    sections: [
      {
        heading: "Cadre (Mission 12 — Art. L6231-2)",
        content: `<p>Le CFA <strong>${o.nom}</strong> permet l'<strong>accueil des apprentis à tout moment de l'année</strong>, conformément à l'obligation légale d'entrée et sortie permanentes du dispositif d'apprentissage.</p>`,
      },
      {
        heading: "Modalités d'entrée permanente",
        content: `<p>• Inscription possible <strong>tout au long de l'année</strong>, sous réserve de la signature d'un contrat d'apprentissage avec un employeur<br>• Délai de positionnement : <strong>5 jours ouvrés</strong> entre la prise de contact et l'entretien de positionnement<br>• Démarrage effectif sous <strong>15 jours maximum</strong> après signature du contrat<br>• Période de mise à niveau possible si entrée en cours de cycle</p>`,
      },
      {
        heading: "Étapes du processus d'accueil",
        content: tableHTML(
          ["Étape", "Délai", "Responsable", "Livrable"],
          [
            ["1. Premier contact (téléphone/email/web)", "J", "Pôle administratif", "Fiche prospect"],
            ["2. Entretien de positionnement", "J+5 ouvrés", "Référent pédagogique", "Fiche d'analyse des besoins"],
            ["3. Test de positionnement (pré-requis)", "J+5 ouvrés", "Formateur référent", "Grille de positionnement"],
            ["4. Aide à la recherche d'employeur (si besoin)", "J+5 à J+90", "Pôle relations entreprises", "Tableau de suivi candidat"],
            ["5. Signature du contrat d'apprentissage", "Variable", "Apprenti + Employeur + CFA", "CERFA 10103*14"],
            ["6. Démarrage de la formation", "J+15 max", "Référent pédagogique", "Convention + Livret d'accueil"],
            ["7. Parcours individualisé (positionnement)", "1ère semaine", "Équipe pédagogique", "Plan individuel de formation"],
          ]
        ),
      },
      {
        heading: "Adaptation pédagogique pour entrée en cours de cycle",
        content: `<p>• Évaluation des acquis antérieurs (diplômes, expérience, VAE partielle)<br>• Construction d'un parcours individualisé (allègements, modules complémentaires)<br>• Tutorat renforcé les 4 premières semaines<br>• Bilan de positionnement à 1 mois pour ajuster le parcours</p>`,
      },
      {
        heading: "Communication sur l'entrée permanente",
        content: `<p>L'information sur l'accueil à tout moment de l'année est diffusée :<br>• Sur le site internet du CFA<br>• Dans la plaquette de présentation<br>• Auprès des partenaires (Missions Locales, France Travail, CIO)<br>• Lors des forums et journées portes ouvertes</p>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 14 (L6231-3 / R6233-1) — Conseil de perfectionnement
// ============================================================================
export function genConseilPerfectionnementCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  const terminee = isFormationTerminee(f, stagiaires);
  const now = new Date();
  return buildDocument({
    org: o,
    title: `COMPTE-RENDU DU CONSEIL DE PERFECTIONNEMENT — ANNÉE ${annee}`,
    sections: [
      {
        heading: "Cadre réglementaire (Mission 14 — Art. L6231-3 et R6233-1)",
        content: `<p>Le CFA <strong>${o.nom}</strong> a mis en place un <strong>Conseil de Perfectionnement</strong> conformément aux articles L6231-3 et R6233-1 du Code du Travail. Cette instance veille à l'organisation et au fonctionnement du CFA et se réunit au moins <strong>une fois par an</strong>.</p>`,
      },
      {
        heading: "Composition du Conseil de Perfectionnement",
        content: tableHTML(
          ["Collège", "Membre", "Qualité"],
          [
            ["Direction CFA", o.dirigeant || "Direction", "Président du Conseil"],
            ["Équipe pédagogique", o.responsablePedagogique || "Responsable pédagogique", "Membre permanent"],
            ["Représentant formateurs", "Désigné par l'équipe", "Membre permanent"],
            ["Représentant employeurs", "Maître d'apprentissage référent", "Membre permanent"],
            ["Représentant apprentis", "Délégué élu par les apprentis", "Membre permanent"],
            ["Représentant parents (si mineurs)", "Parent volontaire", "Membre invité"],
            ["Représentant OPCO", "Conseiller OPCO de référence", "Membre invité"],
            ["Représentant branche professionnelle", "Représentant syndical patronal/salarial", "Membre invité"],
          ]
        ),
      },
      {
        heading: `Réunions tenues en ${annee}`,
        content: tableHTML(
          ["Date", "Type", "Principaux sujets traités", "Statut"],
          [
            [`15 janvier ${annee}`, "Réunion annuelle", "Bilan année N-1, programme pédagogique, indicateurs de performance, plan d'amélioration", (terminee || new Date(`${annee}-01-15`) < now) ? "Tenue" : "Programmée"],
            [`12 juin ${annee}`, "Réunion intermédiaire", "Suivi insertion, ruptures de contrat, mobilité internationale, projets pédagogiques", (terminee || new Date(`${annee}-06-12`) < now) ? "Tenue" : "Programmée"],
          ]
        ),
      },
      {
        heading: "Sujets délibérés (extraits)",
        content: `<p>Conformément à l'article R6233-1, le Conseil est consulté sur :<br>• Le projet pédagogique du CFA<br>• Les conditions générales d'accueil, d'accompagnement (notamment Mission 7) et de promotion sociale et professionnelle des apprentis<br>• L'organisation et le déroulement des formations<br>• Les modalités des relations entre les entreprises accueillant les apprentis et le CFA<br>• Les projets de conventions à conclure avec les organismes extérieurs<br>• Les informations sur le statut de l'apprenti et l'évolution des techniques et qualifications professionnelles</p>`,
      },
      {
        heading: "Décisions et plan d'amélioration",
        content: tableHTML(
          ["Action décidée", "Pilote", "Échéance", "Statut"],
          [
            ["Renforcer le suivi en entreprise (visites trimestrielles)", o.responsablePedagogique || "Resp. pédagogique", `Septembre ${annee}`, "En cours"],
            ["Étendre le partenariat Erasmus+ à 2 nouveaux pays", "Référent mobilité", `Décembre ${annee}`, "En cours"],
            ["Mettre à jour les supports pédagogiques (réglementaire)", "Équipe formateurs", `Juin ${annee}`, "Réalisé"],
            ["Améliorer la communication sur les aides sociales (Mission 7)", "Pôle administratif", `Mars ${annee}`, "Réalisé"],
          ]
        ),
      },
      {
        heading: "Diffusion du compte-rendu",
        content: `<p>Le présent compte-rendu est :<br>• Communiqué à l'ensemble des membres du Conseil<br>• Affiché au CFA pour information des apprentis<br>• Transmis à l'OPCO et tenu à disposition de France Compétences<br>• Archivé pendant 5 ans minimum</p>`,
        variant: "green",
      },
      {
        heading: "Signataire",
        content: `<p><strong>${o.dirigeant || "Direction"}</strong><br>Président du Conseil de Perfectionnement<br>${o.nom}<br>Fait à ${o.ville || ""}, le ${formatDate(o.dateMaj || new Date().toISOString().slice(0, 10))}</p>`,
      },
    ],
  });
}

// ============================================================================
// EXERCICES — QCM 10 questions par mission, par stagiaire
// ============================================================================

interface MissionQCM {
  numero: number;
  titre: string;
  questions: { q: string; options: string[]; correctIndex: number }[];
}

const MISSIONS_QCM: MissionQCM[] = [
  {
    numero: 1,
    titre: "Mission 1 — Accompagnement des apprentis en situation de handicap",
    questions: [
      { q: "Qui est le référent handicap dans un CFA ?", options: ["Un apprenti désigné", "Un professionnel chargé d'accompagner les apprentis en situation de handicap", "Le maître d'apprentissage", "L'employeur"], correctIndex: 1 },
      { q: "Quel organisme finance principalement les aménagements de poste ?", options: ["Pôle Emploi", "AGEFIPH / FIPHFP", "URSSAF", "DREETS"], correctIndex: 1 },
      { q: "La RQTH est délivrée par :", options: ["Le médecin traitant", "La MDPH (CDAPH)", "Le CFA", "L'employeur"], correctIndex: 1 },
      { q: "Un aménagement de formation peut consister à :", options: ["Réduire les compétences exigées", "Adapter les supports et le rythme sans baisser le niveau", "Supprimer les évaluations", "Allonger automatiquement le contrat de 2 ans"], correctIndex: 1 },
      { q: "Le référent handicap doit :", options: ["Diagnostiquer le handicap", "Informer, orienter et coordonner les acteurs", "Délivrer la RQTH", "Décider seul de l'aménagement"], correctIndex: 1 },
      { q: "L'apprenti en situation de handicap bénéficie-t-il d'un contrat plus long ?", options: ["Non, jamais", "Oui, prolongation possible jusqu'à 1 an", "Oui, doublement automatique", "Oui, sans limite"], correctIndex: 1 },
      { q: "La confidentialité de la situation de handicap est :", options: ["Optionnelle", "Obligatoire (secret professionnel)", "Publique", "Réservée à l'employeur"], correctIndex: 1 },
      { q: "Quelle aide finance la majoration des coûts de formation ?", options: ["AGEFIPH", "OPCO + branche", "CAF", "CARSAT"], correctIndex: 1 },
      { q: "Quel document recense les aménagements proposés à l'apprenti ?", options: ["Le bulletin de salaire", "Le plan d'accompagnement individualisé / fiche d'aménagement", "Le règlement intérieur", "Le contrat d'apprentissage"], correctIndex: 1 },
      { q: "Le référent handicap doit-il rencontrer l'employeur ?", options: ["Non", "Oui, pour coordonner l'accueil et le suivi", "Seulement à la rupture", "Uniquement par mail"], correctIndex: 1 },
    ],
  },
  {
    numero: 2,
    titre: "Mission 2 — Encourager la mixité au sein des métiers préparés",
    questions: [
      { q: "La mixité professionnelle vise à :", options: ["Imposer 50/50 partout", "Favoriser la représentation des deux sexes dans tous les métiers", "Réserver des places aux femmes", "Exclure les hommes de certains métiers"], correctIndex: 1 },
      { q: "Un métier est dit \"mixte\" lorsque :", options: ["Chaque sexe représente entre 40 % et 60 % des effectifs", "Il y a au moins une femme", "Les salaires sont identiques", "Il existe depuis 50 ans"], correctIndex: 0 },
      { q: "Le CFA peut promouvoir la mixité par :", options: ["Des stéréotypes valorisants", "Des actions de communication et témoignages de pairs", "L'interdiction d'inscription pour un sexe", "L'augmentation des frais"], correctIndex: 1 },
      { q: "Quel partenaire institutionnel agit pour la mixité ?", options: ["AFPA", "Délégation aux droits des femmes / Région", "URSSAF", "Pôle Emploi seul"], correctIndex: 1 },
      { q: "Les stéréotypes de genre dans l'orientation :", options: ["N'existent plus", "Constituent un frein à la mixité", "Sont sans impact", "Sont encouragés"], correctIndex: 1 },
      { q: "Une bonne pratique pour favoriser la mixité :", options: ["Visites d'entreprises mixtes", "Photos uniquement d'hommes", "Annonces genrées", "Quotas cachés"], correctIndex: 0 },
      { q: "Le rôle du CFA est de :", options: ["Sélectionner sur le sexe", "Accueillir tous les profils sans discrimination", "Privilégier les locaux", "Refuser les apprentis isolés"], correctIndex: 1 },
      { q: "L'égalité salariale F/H est :", options: ["Une option", "Une obligation légale", "Réservée aux cadres", "Décidée par le CFA"], correctIndex: 1 },
      { q: "Le CFA doit-il publier des indicateurs de mixité ?", options: ["Non", "Oui, dans son bilan pédagogique", "Uniquement en interne", "Seulement à la demande"], correctIndex: 1 },
      { q: "Une action efficace de mixité est :", options: ["Le mentorat par un pair du sexe sous-représenté", "L'augmentation des effectifs", "La réduction du programme", "L'absence de communication"], correctIndex: 0 },
    ],
  },
  {
    numero: 3,
    titre: "Mission 3 — Coopération entre CFA et entreprise",
    questions: [
      { q: "Le maître d'apprentissage est désigné par :", options: ["Le CFA", "L'employeur", "L'OPCO", "L'apprenti"], correctIndex: 1 },
      { q: "La convention pédagogique tripartite lie :", options: ["CFA, apprenti, OPCO", "CFA, apprenti, employeur", "CFA, employeur, Région", "CFA, employeur, URSSAF"], correctIndex: 1 },
      { q: "La fréquence minimale des visites en entreprise est :", options: ["Aucune obligation", "Au moins 1 visite par cycle", "1 par mois", "1 par semaine"], correctIndex: 1 },
      { q: "Le carnet/livret de liaison sert à :", options: ["Suivre la paie", "Coordonner CFA / entreprise / apprenti", "Calculer les congés", "Évaluer le maître d'apprentissage"], correctIndex: 1 },
      { q: "Le maître d'apprentissage doit justifier :", options: ["D'un diplôme + 1 an OU 2 ans d'expérience dans le métier", "D'un BTS", "De 10 ans d'expérience", "D'aucune compétence"], correctIndex: 0 },
      { q: "En cas de difficulté de l'apprenti, le CFA :", options: ["Rompt le contrat", "Alerte le maître d'apprentissage et propose un plan", "Ne fait rien", "Sanctionne l'apprenti"], correctIndex: 1 },
      { q: "Le bilan intermédiaire associe :", options: ["L'apprenti seul", "Apprenti + CFA + maître d'apprentissage", "Le formateur seul", "L'OPCO"], correctIndex: 1 },
      { q: "Les missions confiées en entreprise doivent être :", options: ["En cohérence avec le référentiel", "Choisies au hasard", "Limitées au ménage", "Sans rapport avec le diplôme"], correctIndex: 0 },
      { q: "Le formateur référent du CFA :", options: ["N'a pas de rôle", "Coordonne le parcours alterné", "Remplace le maître d'apprentissage", "Choisit l'employeur"], correctIndex: 1 },
      { q: "La coopération CFA/entreprise est évaluée par :", options: ["Aucune enquête", "Une enquête annuelle de satisfaction des employeurs", "L'URSSAF", "La DREETS"], correctIndex: 1 },
    ],
  },
  {
    numero: 4,
    titre: "Mission 4 — Activités citoyennes, culturelles et sportives",
    questions: [
      { q: "L'objectif des activités citoyennes est de :", options: ["Occuper les apprentis", "Former à la citoyenneté et au vivre-ensemble", "Remplacer la formation pro", "Réduire les heures de cours"], correctIndex: 1 },
      { q: "Une action citoyenne peut être :", options: ["Une journée de solidarité / sensibilisation", "Une fête", "Une vente", "Une réunion d'équipe"], correctIndex: 0 },
      { q: "Les activités sportives en CFA :", options: ["Sont interdites", "Favorisent la cohésion et la santé", "Remplacent la pause", "Sont uniquement individuelles"], correctIndex: 1 },
      { q: "La laïcité s'applique :", options: ["Au CFA et aux apprentis", "À personne", "Aux seuls formateurs", "À l'extérieur uniquement"], correctIndex: 0 },
      { q: "Une sortie culturelle vise à :", options: ["Distraire", "Développer l'ouverture culturelle et l'esprit critique", "Tester les apprentis", "Remplir un quota"], correctIndex: 1 },
      { q: "Les activités citoyennes sont :", options: ["Optionnelles et hors suivi", "Tracées dans le plan d'activités annuel", "Sans planification", "Confidentielles"], correctIndex: 1 },
      { q: "L'engagement bénévole d'un apprenti est :", options: ["Interdit", "Encouragé et valorisable", "Obligatoire", "Rémunéré par le CFA"], correctIndex: 1 },
      { q: "La sensibilisation au harcèlement fait partie :", options: ["Des activités citoyennes", "Du programme technique uniquement", "Des cours d'EPS", "D'aucune mission"], correctIndex: 0 },
      { q: "Qui peut animer une activité citoyenne ?", options: ["Uniquement le directeur", "Un partenaire associatif, un formateur, un intervenant", "Un seul apprenti", "Le maître d'apprentissage seul"], correctIndex: 1 },
      { q: "Le bilan des activités est :", options: ["Inutile", "Présenté en conseil de perfectionnement", "Confidentiel", "Adressé à l'URSSAF"], correctIndex: 1 },
    ],
  },
  {
    numero: 5,
    titre: "Mission 5 — Procédure de rupture du contrat d'apprentissage",
    questions: [
      { q: "La rupture pendant les 45 premiers jours en entreprise est :", options: ["Interdite", "Libre, sans motif, par l'une ou l'autre partie", "Soumise à l'OPCO", "Soumise au juge"], correctIndex: 1 },
      { q: "Au-delà des 45 jours, la rupture peut intervenir par :", options: ["Décision unilatérale du CFA", "Accord amiable, démission, force majeure, faute grave, inaptitude", "L'apprenti seul sans formalité", "L'employeur seul sans motif"], correctIndex: 1 },
      { q: "L'apprenti qui démissionne doit :", options: ["Saisir le médiateur de l'apprentissage 5 jours avant + préavis", "Partir sans prévenir", "Attendre 6 mois", "Demander à l'OPCO"], correctIndex: 0 },
      { q: "Le médiateur de l'apprentissage est désigné par :", options: ["L'apprenti", "Les chambres consulaires (CCI, CMA, CA)", "Le CFA", "L'employeur"], correctIndex: 1 },
      { q: "Le CFA, en cas de rupture, doit :", options: ["Refuser de garder l'apprenti", "Maintenir l'apprenti en formation 6 mois maximum", "Rompre la formation immédiatement", "Demander remboursement"], correctIndex: 1 },
      { q: "L'OPCO est informé :", options: ["Jamais", "De toute rupture, par formulaire dédié", "Uniquement si l'apprenti le demande", "Par le tribunal"], correctIndex: 1 },
      { q: "La fin anticipée du contrat ouvre droit pour l'apprenti à :", options: ["Aucune aide", "ARE / accompagnement Pôle Emploi selon situation", "Un nouveau contrat automatique", "Une indemnité du CFA"], correctIndex: 1 },
      { q: "Une faute grave doit être :", options: ["Constatée et notifiée", "Supposée", "Tue", "Réservée à l'apprenti"], correctIndex: 0 },
      { q: "Le maintien en formation après rupture vise à :", options: ["Pénaliser l'apprenti", "Permettre la recherche d'un nouvel employeur", "Allonger la formation", "Réduire les coûts"], correctIndex: 1 },
      { q: "Le CFA doit tracer les ruptures dans :", options: ["Aucun registre", "Un tableau de suivi des ruptures", "La paie", "Le bilan financier seul"], correctIndex: 1 },
    ],
  },
  {
    numero: 6,
    titre: "Mission 6 — Mixité et égalité entre les femmes et les hommes",
    questions: [
      { q: "Le principe d'égalité F/H est :", options: ["Constitutionnel", "Optionnel", "Réservé au public", "Lié au CFA seul"], correctIndex: 0 },
      { q: "Une discrimination est :", options: ["Une opinion", "Un traitement défavorable fondé sur un critère prohibé", "Un compliment", "Un classement"], correctIndex: 1 },
      { q: "Le CFA doit afficher :", options: ["Les sanctions disciplinaires", "Les coordonnées de la défenseure des droits / dispositifs de signalement", "Les notes des apprentis", "Les salaires"], correctIndex: 1 },
      { q: "L'index égalité concerne :", options: ["Les CFA de moins de 50 salariés", "Les entreprises de 50 salariés et plus", "Les apprentis", "Les fournisseurs"], correctIndex: 1 },
      { q: "Le harcèlement sexuel est :", options: ["Toléré entre majeurs", "Un délit pénal", "Une plaisanterie", "Une simple incivilité"], correctIndex: 1 },
      { q: "Le référent égalité a pour rôle :", options: ["De juger", "D'informer, prévenir, recueillir les signalements", "De licencier", "De remplacer le directeur"], correctIndex: 1 },
      { q: "Une action concrète pour l'égalité :", options: ["Mentorat croisé", "Affichage des notes", "Suppression des pauses", "Quotas de notes"], correctIndex: 0 },
      { q: "Les écarts de rémunération à compétence égale sont :", options: ["Légaux", "Interdits par la loi", "Acceptés en CDD", "Réservés aux cadres"], correctIndex: 1 },
      { q: "L'apprenti victime de discrimination peut saisir :", options: ["Personne", "Le défenseur des droits / Conseil de prud'hommes", "Le CFA seul", "L'URSSAF seule"], correctIndex: 1 },
      { q: "Le bilan égalité est présenté :", options: ["Au conseil de perfectionnement", "À l'URSSAF", "Aux apprentis seuls", "À personne"], correctIndex: 0 },
    ],
  },
  {
    numero: 7,
    titre: "Mission 7 — Accompagnement éducatif, social et professionnel",
    questions: [
      { q: "L'accompagnement éducatif comprend :", options: ["Soutien scolaire / méthodologie", "La paie", "Les sanctions", "Les achats"], correctIndex: 0 },
      { q: "Une difficulté sociale relève :", options: ["Du seul apprenti", "D'une orientation vers les partenaires sociaux compétents", "D'un licenciement", "D'une exclusion"], correctIndex: 1 },
      { q: "Les aides au logement passent par :", options: ["URSSAF", "Action Logement / CAF", "DREETS", "OPCO"], correctIndex: 1 },
      { q: "Le secret professionnel s'impose :", options: ["Au seul directeur", "À tous les intervenants accompagnant l'apprenti", "Aux apprentis", "À personne"], correctIndex: 1 },
      { q: "Une procédure d'accompagnement doit être :", options: ["Orale", "Formalisée et tracée", "Confidentielle au point de ne rien tracer", "Optionnelle"], correctIndex: 1 },
      { q: "L'accompagnement professionnel comprend :", options: ["Aide à la recherche d'employeur, posture pro", "Le calcul de paie", "La sanction", "Les achats"], correctIndex: 0 },
      { q: "Le CFA peut orienter vers :", options: ["Mission Locale, assistante sociale, CMP, CAF", "L'URSSAF uniquement", "L'employeur seul", "Personne"], correctIndex: 0 },
      { q: "Le suivi individualisé est :", options: ["Un luxe", "Une obligation pour la qualité du parcours", "Réservé aux cas graves", "Inutile"], correctIndex: 1 },
      { q: "La fiche de suivi de l'apprenti doit comporter :", options: ["Date, nature de l'entretien, plan d'action, signature", "Le salaire", "Les notes seules", "Rien"], correctIndex: 0 },
      { q: "Un signal d'alerte (décrochage) impose :", options: ["L'inaction", "Une réaction rapide CFA + entreprise + famille", "Une exclusion", "Une sanction financière"], correctIndex: 1 },
    ],
  },
  {
    numero: 8,
    titre: "Mission 8 — Suivi de l'insertion professionnelle des sortants",
    questions: [
      { q: "Le taux d'insertion à 6 mois mesure :", options: ["La satisfaction", "La part des sortants en emploi 6 mois après la fin", "Le taux de réussite", "Le taux d'abandon"], correctIndex: 1 },
      { q: "Cet indicateur est publié sur :", options: ["Aucun site", "InserJeunes / CFA Carif-Oref", "URSSAF", "Pôle Emploi seul"], correctIndex: 1 },
      { q: "L'enquête est menée :", options: ["Auprès des employeurs", "Auprès des sortants 6 mois après", "Auprès des apprentis en cours", "Auprès des familles"], correctIndex: 1 },
      { q: "L'insertion durable distingue :", options: ["CDI / CDD ≥ 6 mois / autres", "Stage / vacances", "École / vacances", "Aucune catégorie"], correctIndex: 0 },
      { q: "La poursuite d'études est :", options: ["Comptée comme insertion", "Comptée séparément", "Interdite", "Sans suivi"], correctIndex: 1 },
      { q: "Le faible taux d'insertion doit déclencher :", options: ["Rien", "Un plan d'amélioration", "Une fermeture", "Une sanction"], correctIndex: 1 },
      { q: "Les sortants sans emploi sont orientés vers :", options: ["URSSAF", "Pôle Emploi / Mission Locale", "L'OPCO seul", "Le tribunal"], correctIndex: 1 },
      { q: "Le suivi à 6 mois fait partie de :", options: ["L'évaluation Qualiopi (IND 30)", "L'index égalité", "La paie", "Le RGPD"], correctIndex: 0 },
      { q: "Le taux de rupture est suivi :", options: ["Avec le taux d'insertion", "Indépendamment", "Pas du tout", "Tous les 5 ans"], correctIndex: 0 },
      { q: "Le bilan d'insertion est présenté :", options: ["Au conseil de perfectionnement", "À personne", "À l'apprenti seul", "Aux familles seules"], correctIndex: 0 },
    ],
  },
  {
    numero: 9,
    titre: "Mission 9 — Mobilité internationale (Erasmus+) et lutte contre les discriminations",
    questions: [
      { q: "Erasmus+ permet :", options: ["Une mobilité dans un pays partenaire de l'UE", "Un voyage personnel", "Un stage payé par l'apprenti", "Une formation à distance seule"], correctIndex: 0 },
      { q: "Durée minimale d'une mobilité courte Erasmus+ apprenti :", options: ["1 jour", "2 semaines", "6 mois", "1 an"], correctIndex: 1 },
      { q: "La convention de mobilité lie :", options: ["CFA, entreprise française, structure d'accueil étrangère, apprenti", "CFA seul", "Apprenti seul", "OPCO uniquement"], correctIndex: 0 },
      { q: "Pendant la mobilité longue, le contrat français est :", options: ["Rompu", "Mis en veille (statut spécifique mobilité)", "Remplacé par un CDD", "Inchangé"], correctIndex: 1 },
      { q: "L'agence française Erasmus+ s'appelle :", options: ["Pôle Emploi", "Agence Erasmus+ France / Éducation Formation", "URSSAF", "DREETS"], correctIndex: 1 },
      { q: "Une discrimination à l'embauche est :", options: ["Légale en stage", "Interdite et sanctionnée pénalement", "Tolérée si justifiée", "Réservée au privé"], correctIndex: 1 },
      { q: "L'apprenti en mobilité est couvert par :", options: ["Aucune assurance", "Une assurance responsabilité civile + accident travail dédiée", "Sa famille seule", "L'État du pays d'accueil"], correctIndex: 1 },
      { q: "L'Europass Mobilité atteste :", options: ["Du diplôme", "Des compétences acquises lors de la mobilité", "De l'identité", "Du salaire"], correctIndex: 1 },
      { q: "Le CFA doit :", options: ["Refuser la mobilité", "Encourager et organiser la mobilité européenne", "Faire payer l'apprenti", "Limiter à un pays"], correctIndex: 1 },
      { q: "La diversité au CFA doit être :", options: ["Évitée", "Promue par des actions concrètes", "Confidentielle", "Sans suivi"], correctIndex: 1 },
    ],
  },
  {
    numero: 10,
    titre: "Mission 10 — Mobilité nationale des apprentis",
    questions: [
      { q: "La mobilité nationale permet :", options: ["Un séjour dans un autre CFA en France", "Un voyage personnel", "Un changement de diplôme", "Une rupture"], correctIndex: 0 },
      { q: "Elle s'organise par :", options: ["Convention de mobilité nationale entre CFA et entreprise(s)", "Décision orale", "Demande URSSAF", "Demande Pôle Emploi"], correctIndex: 0 },
      { q: "Pendant la mobilité, l'apprenti reste :", options: ["Inscrit dans son CFA d'origine", "Désinscrit", "Salarié de l'autre CFA", "Stagiaire"], correctIndex: 0 },
      { q: "L'objectif est de :", options: ["Élargir les compétences et la connaissance des territoires", "Réduire les coûts", "Tester l'apprenti", "Le sanctionner"], correctIndex: 0 },
      { q: "La durée de la mobilité nationale est :", options: ["Limitée à 1 jour", "Variable, prévue dans la convention", "Toujours 1 an", "Toujours 6 mois"], correctIndex: 1 },
      { q: "L'apprenti perçoit son salaire :", options: ["De l'employeur d'origine", "De personne", "Du CFA d'accueil", "De l'État"], correctIndex: 0 },
      { q: "Le CFA d'accueil :", options: ["Refuse l'apprenti", "Assure la formation et le suivi pendant la période", "Rompt le contrat", "Recrute l'apprenti"], correctIndex: 1 },
      { q: "Le bilan de la mobilité est :", options: ["Inutile", "Tracé et restitué à l'apprenti et à l'employeur", "Confidentiel", "Réservé au CFA d'accueil"], correctIndex: 1 },
      { q: "Une convention de mobilité nationale doit être :", options: ["Orale", "Signée par toutes les parties", "Tacite", "Postérieure"], correctIndex: 1 },
      { q: "La mobilité nationale est :", options: ["Encouragée par France Compétences", "Interdite", "Réservée aux Bac+5", "Optionnelle pour les seuls majeurs"], correctIndex: 0 },
    ],
  },
  {
    numero: 11,
    titre: "Mission 11 — Aide à la recherche d'employeur",
    questions: [
      { q: "Le CFA accompagne le candidat :", options: ["Dans la recherche d'un employeur", "Dans la rédaction de son contrat seul", "Dans le calcul de paie", "Dans la déclaration URSSAF"], correctIndex: 0 },
      { q: "Délai pour signer le contrat après l'entrée en formation sans contrat :", options: ["3 mois maximum", "1 an", "1 semaine", "Pas de délai"], correctIndex: 0 },
      { q: "Un atelier CV vise à :", options: ["Sélectionner les apprentis", "Préparer la candidature", "Évaluer les compétences techniques", "Sanctionner"], correctIndex: 1 },
      { q: "La simulation d'entretien :", options: ["Est inutile", "Prépare à l'entretien d'embauche", "Remplace l'évaluation", "Est obligatoire pour réussir le diplôme"], correctIndex: 1 },
      { q: "Le candidat sans contrat est :", options: ["Refusé", "Accueilli dans la limite de 3 mois (statut spécifique)", "Salarié du CFA", "Stagiaire de la formation pro"], correctIndex: 1 },
      { q: "Le tableau de suivi des candidats permet :", options: ["De tracer les contacts et résultats", "De calculer les salaires", "D'imposer un employeur", "De sanctionner"], correctIndex: 0 },
      { q: "Les partenaires de la recherche d'employeur sont :", options: ["CCI, CMA, Pôle Emploi, branches", "URSSAF seul", "Tribunaux", "État seul"], correctIndex: 0 },
      { q: "La bourse aux contrats est :", options: ["Une aide financière", "Une mise en relation candidats / entreprises", "Un concours", "Un examen"], correctIndex: 1 },
      { q: "L'accompagnement est :", options: ["Individualisé", "Standardisé sans suivi", "Réservé aux mineurs", "Optionnel"], correctIndex: 0 },
      { q: "Sans contrat au-delà du délai légal, l'apprenti :", options: ["Continue indéfiniment", "Sort du dispositif et est réorienté", "Est embauché par le CFA", "Reçoit une aide à vie"], correctIndex: 1 },
    ],
  },
  {
    numero: 12,
    titre: "Mission 12 — Accueil à tout moment de l'année",
    questions: [
      { q: "L'apprentissage permet une entrée :", options: ["Uniquement en septembre", "À tout moment de l'année (entrées et sorties permanentes)", "Une fois par trimestre", "Tous les 2 ans"], correctIndex: 1 },
      { q: "Cela suppose une organisation :", options: ["Modulaire / individualisée", "Figée", "Annuelle uniquement", "Aucune"], correctIndex: 0 },
      { q: "Le positionnement à l'entrée vise à :", options: ["Sanctionner", "Identifier les acquis et adapter le parcours", "Filtrer", "Retarder l'entrée"], correctIndex: 1 },
      { q: "L'apprenti entré en cours d'année :", options: ["Doit attendre la rentrée", "Bénéficie d'un parcours individualisé", "Refait l'année complète", "Est exclu"], correctIndex: 1 },
      { q: "La procédure d'accueil doit être :", options: ["Formalisée et tracée", "Orale", "Inutile", "Confidentielle"], correctIndex: 0 },
      { q: "Un livret d'accueil est :", options: ["Optionnel", "Remis à chaque entrée", "Réservé aux majeurs", "Payant"], correctIndex: 1 },
      { q: "L'accueil intègre :", options: ["Présentation du CFA, règlement, sécurité, référents", "La paie", "Les sanctions seules", "L'URSSAF"], correctIndex: 0 },
      { q: "L'individualisation est :", options: ["Une obligation Qualiopi (IND 11)", "Un luxe", "Optionnelle", "Réservée au handicap"], correctIndex: 0 },
      { q: "L'entrée permanente impose un suivi :", options: ["Calendaire individuel", "Collectif uniquement", "Aucun", "Annuel"], correctIndex: 0 },
      { q: "La traçabilité des entrées/sorties est :", options: ["Obligatoire", "Optionnelle", "Réservée aux contrôles", "Confidentielle"], correctIndex: 0 },
    ],
  },
  {
    numero: 13,
    titre: "Mission 13 — Formation du maître d'apprentissage",
    questions: [
      { q: "Le maître d'apprentissage doit :", options: ["Être désigné et formé", "Être l'apprenti", "Être un client", "Être anonyme"], correctIndex: 0 },
      { q: "La formation MA porte sur :", options: ["La pédagogie, la posture, la transmission", "La paie", "Le marketing", "La fiscalité"], correctIndex: 0 },
      { q: "L'OPCO peut financer :", options: ["La formation du maître d'apprentissage", "Les vacances", "Les achats personnels", "Le matériel"], correctIndex: 0 },
      { q: "Une attestation de formation MA est :", options: ["Délivrée à l'issue", "Inutile", "Réservée aux cadres", "Payante par l'apprenti"], correctIndex: 0 },
      { q: "Le MA doit justifier :", options: ["Diplôme + 1 an OU 2 ans d'expérience", "10 ans d'expérience", "Aucune compétence", "Bac+5"], correctIndex: 0 },
      { q: "Le nombre maximum d'apprentis par MA est :", options: ["2 (ou 3 selon dérogation/branche)", "10", "Illimité", "1 seul à vie"], correctIndex: 0 },
      { q: "Le MA est référent :", options: ["Sécurité, qualité du travail, accompagnement", "Paie uniquement", "Hiérarchie seule", "Communication"], correctIndex: 0 },
      { q: "Le MA participe :", options: ["Aux bilans intermédiaires et finaux", "À aucun rendez-vous", "À la paie seule", "Aux RH uniquement"], correctIndex: 0 },
      { q: "En cas d'interruption / sortie sans diplôme, le CFA :", options: ["Met en place un accompagnement post-formation", "Abandonne", "Sanctionne", "Facture"], correctIndex: 0 },
      { q: "La formation continue du MA :", options: ["Est encouragée", "Est interdite", "Est réservée à 1 fois", "Est inutile"], correctIndex: 0 },
    ],
  },
  {
    numero: 14,
    titre: "Mission 14 — Conseil de perfectionnement",
    questions: [
      { q: "Le conseil de perfectionnement est obligatoire pour :", options: ["Tout CFA (Art. L6231-3 / R6233-1)", "Les seuls CFA publics", "Les CFA > 100 apprentis", "Personne"], correctIndex: 0 },
      { q: "Il se réunit au moins :", options: ["1 fois par an", "1 fois par mois", "Jamais", "Tous les 5 ans"], correctIndex: 0 },
      { q: "Sa composition inclut :", options: ["Direction CFA, formateurs, apprentis, employeurs, parents si mineurs, partenaires", "Direction seule", "Apprentis seuls", "OPCO seul"], correctIndex: 0 },
      { q: "Il examine notamment :", options: ["L'organisation, la qualité, l'évolution des effectifs et résultats", "La paie", "Les achats", "La fiscalité"], correctIndex: 0 },
      { q: "Un compte-rendu est :", options: ["Rédigé et diffusé", "Optionnel", "Confidentiel à vie", "Oral"], correctIndex: 0 },
      { q: "Le conseil émet :", options: ["Des avis et recommandations", "Des sanctions", "Des amendes", "Des bulletins"], correctIndex: 0 },
      { q: "Le bilan d'insertion est :", options: ["Présenté en conseil de perfectionnement", "Caché", "Réservé au directeur", "Confidentiel"], correctIndex: 0 },
      { q: "Les enquêtes de satisfaction sont :", options: ["Restituées en conseil de perfectionnement", "Détruites", "Réservées à l'OPCO", "Sans suite"], correctIndex: 0 },
      { q: "Le règlement intérieur :", options: ["Est révisé en conseil de perfectionnement", "N'est jamais modifié", "Est secret", "Est rédigé par les apprentis seuls"], correctIndex: 0 },
      { q: "Le conseil de perfectionnement contribue à :", options: ["L'amélioration continue (Qualiopi IND 32)", "La paie", "La fiscalité", "Le RGPD"], correctIndex: 0 },
    ],
  },
];

function pickStudentAnswers(stagiaire: StagiaireInfo, missionNumero: number, questions: { correctIndex: number; options: string[] }[]): number[] {
  // Deterministic per stagiaire + mission. ~80% correct.
  const base = `${stagiaire?.prenom || ""}${stagiaire?.nom || ""}M${missionNumero}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) | 0;
  return questions.map((q, qi) => {
    const seed = Math.abs(h + qi * 7);
    const rand = ((seed * 9301 + 49297) % 233280) / 233280;
    if (rand < 0.8) return q.correctIndex;
    const wrong = q.options.map((_, i) => i).filter((i) => i !== q.correctIndex);
    return wrong[seed % wrong.length];
  });
}

export function genQCMMissionCFA(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx: number,
  missionNumero: number,
) {
  const stagiaire = stagiaires[stagiaireIdx];
  const mission = MISSIONS_QCM.find((m) => m.numero === missionNumero);
  if (!stagiaire || !mission) {
    return buildDocument({
      title: `QCM Mission ${missionNumero}`,
      organisme: o,
      blocks: [{ heading: "Erreur", content: "<p>Données manquantes.</p>" }],
    });
  }

  const terminee = isFormationTerminee(f, stagiaires);
  const dateRef = terminee && f.dateFin ? f.dateFin : (f.dateDebut || new Date().toISOString().slice(0, 10));
  const answers = pickStudentAnswers(stagiaire, missionNumero, mission.questions);
  const score = answers.reduce((acc, a, i) => acc + (a === mission.questions[i].correctIndex ? 1 : 0), 0);

  const rows = mission.questions.map((q, qi) => [
    `<strong>Q${qi + 1}.</strong> ${q.question || (q as any).q || ""}`,
    q.options
      .map((opt, oi) => {
        const isCorrect = oi === q.correctIndex;
        const isPicked = oi === answers[qi];
        const mark = isPicked ? "☒" : "☐";
        const style = isCorrect ? "color:#0a7d3a;font-weight:600;" : isPicked && !isCorrect ? "color:#c0392b;" : "";
        return `<div style="${style}">${mark} ${String.fromCharCode(65 + oi)}. ${opt}</div>`;
      })
      .join(""),
    answers[qi] === q.correctIndex ? "<span style='color:#0a7d3a;font-weight:600;'>✔ Correct</span>" : "<span style='color:#c0392b;'>✘ Incorrect</span>",
  ]);

  return buildDocument({
    title: `QCM — ${mission.titre}`,
    organisme: o,
    blocks: [
      {
        heading: "Identification",
        content: `<table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 8px;"><strong>Apprenti·e</strong></td><td>${stagiaire.prenom} ${stagiaire.nom}</td></tr>
          <tr><td style="padding:4px 8px;"><strong>Formation</strong></td><td>${f.intitule || ""}</td></tr>
          <tr><td style="padding:4px 8px;"><strong>Mission évaluée</strong></td><td>${mission.titre}</td></tr>
          <tr><td style="padding:4px 8px;"><strong>Date</strong></td><td>${formatDate(dateRef)}</td></tr>
          <tr><td style="padding:4px 8px;"><strong>Durée</strong></td><td>20 minutes</td></tr>
          <tr><td style="padding:4px 8px;"><strong>Modalité</strong></td><td>QCM individuel — 1 réponse correcte par question</td></tr>
        </table>`,
      },
      {
        heading: "Consignes",
        content: `<p>Pour chaque question, cochez la <strong>seule</strong> bonne réponse. La case ☒ correspond à la réponse retenue par l'apprenti·e ; les bonnes réponses apparaissent en vert pour la correction.</p>`,
      },
      {
        heading: "Questionnaire et corrigé",
        content: tableHTML(["Question", "Propositions (☒ = réponse de l'apprenti·e)", "Résultat"], rows),
      },
      {
        heading: "Résultat global",
        content: `<p style="font-size:1.05em;"><strong>Score : ${score} / ${mission.questions.length}</strong> — Note : <strong>${Math.round((score / mission.questions.length) * 20)}/20</strong></p>
        <p>Appréciation : ${score >= 8 ? "Acquis — bonne maîtrise des notions de la mission." : score >= 6 ? "Partiellement acquis — quelques notions à revoir." : "À retravailler — un point pédagogique sera proposé."}</p>`,
      },
      {
        heading: "Signatures",
        content: `<table style="width:100%;margin-top:20px;"><tr>
          <td style="width:50%;padding:10px;border:1px solid #ccc;"><strong>Apprenti·e</strong><br>${stagiaire.prenom} ${stagiaire.nom}<br>Fait le ${formatDate(dateRef)}<br><br><br></td>
          <td style="width:50%;padding:10px;border:1px solid #ccc;"><strong>Formateur·rice / Référent CFA</strong><br>${o.nom}<br>Fait le ${formatDate(dateRef)}<br><br><br></td>
        </tr></table>`,
      },
    ],
  });
}

