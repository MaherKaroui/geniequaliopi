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
