// Documents CFA — Couverture des 14 missions officielles (Art. L6231-2 du Code du Travail)
import { dateQCMMission } from "./calendrierMissionsCFA";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, tableHTML, isFormationTerminee } from "./docBuilder";

// ============================================================================
// MISSION 4 — Activités citoyennes, culturelles, sportives
// ============================================================================
export function genPlanActivitesCitoyennesCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  const terminee = isFormationTerminee(f, stagiaires);
  const today = new Date();

  // Dates calculées automatiquement à l'intérieur de la fenêtre [dateDebut, dateFin]
  const MOIS_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const d1 = f.dateDebut ? new Date(f.dateDebut) : null;
  const d2 = f.dateFin ? new Date(f.dateFin) : null;
  const totalMs = d1 && d2 ? d2.getTime() - d1.getTime() : 0;
  const at = (ratio: number): Date | null => {
    if (!d1 || !d2 || totalMs <= 0) return null;
    const r = Math.max(0, Math.min(1, ratio));
    return new Date(d1.getTime() + totalMs * r);
  };
  const periode = (d: Date | null, fallback: string) => d ? `${MOIS_FR[d.getMonth()]} ${d.getFullYear()}` : fallback;
  const statut = (d: Date | null) => {
    if (terminee) return "Réalisée";
    if (!d) return "Programmée";
    if (d.getTime() < today.getTime() - 7 * 24 * 3600 * 1000) return "Réalisée";
    if (Math.abs(d.getTime() - today.getTime()) <= 30 * 24 * 3600 * 1000) return "En cours";
    return "Programmée";
  };
  const cell = (ratio: number, fallback: string) => {
    const d = at(ratio);
    return { p: periode(d, fallback), s: statut(d) };
  };

  // Répartition : citoyennes (5%, 15%, 25%, 55%), culturelles (35%, 45%, 70%), sportives (60%, 80%, 95%)
  const c1 = cell(0.05, `Septembre ${annee}`);
  const c2 = cell(0.15, `Octobre ${annee}`);
  const c3 = cell(0.25, `Novembre ${annee}`);
  const c4 = cell(0.55, `Mars ${annee + 1}`);
  const cu1 = cell(0.35, `Janvier ${annee + 1}`);
  const cu2 = cell(0.45, `Février ${annee + 1}`);
  const cu3 = cell(0.70, `Avril ${annee + 1}`);
  const sp1 = cell(0.60, `Mai ${annee + 1}`);
  const sp2 = cell(0.80, `Juin ${annee + 1}`);
  const sp3 = cell(0.95, `Juillet ${annee + 1}`);

  return buildDocument({
    org: o,
    title: `PLAN D'ACTIVITÉS CITOYENNES, CULTURELLES ET SPORTIVES — ANNÉE ${annee}`,
    sections: [
      {
        heading: "Cadre réglementaire (Mission 4 — Art. L6231-2 du Code du Travail)",
        content: `<p>Le CFA <strong>${o.nom}</strong> est tenu d'organiser et de favoriser la participation des apprentis à des activités d'ouverture sur le monde, notamment dans les domaines citoyen, culturel, sportif et associatif. Le présent plan formalise les actions programmées sur l'année ${annee} — <em>dates calculées automatiquement sur la base du calendrier de la formation (${f.dateDebut ? formatDate(f.dateDebut) : "—"} → ${f.dateFin ? formatDate(f.dateFin) : "—"})</em>.</p>${terminee ? "" : `<p><em>Formation actuellement <strong>en cours</strong> — les activités à venir sont marquées « Programmée ».</em></p>`}`,
      },
      {
        heading: "Activités citoyennes",
        content: tableHTML(
          ["Activité", "Date prévisionnelle", "Public visé", "Partenaire", "Statut"],
          [
            ["Atelier « Droits et devoirs de l'apprenti »", c1.p, "Tous apprentis", "DREETS / Défenseur des Droits", c1.s],
            ["Élection des délégués de promotion", c2.p, "Tous apprentis", "Vie scolaire CFA", c2.s],
            ["Sensibilisation à la laïcité et aux valeurs républicaines", c3.p, "Tous apprentis", "Préfecture / CRIPT", c3.s],
            ["Journée « Lutte contre les discriminations »", c4.p, "Tous apprentis", "Défenseur des Droits / SOS Racisme", c4.s],
          ]
        ),
      },
      {
        heading: "Activités culturelles",
        content: tableHTML(
          ["Activité", "Date prévisionnelle", "Public visé", "Partenaire", "Statut"],
          [
            ["Visite guidée d'un musée national", cu1.p, "Tous apprentis", "Pass Culture / Musée du Louvre", cu1.s],
            ["Atelier d'écriture et expression orale", cu2.p, "Tous apprentis", "Bibliothèque municipale", cu2.s],
            ["Sortie cinéma — film documentaire métier", cu3.p, "Tous apprentis", "Pass Culture", cu3.s],
          ]
        ),
      },
      {
        heading: "Activités sportives",
        content: tableHTML(
          ["Activité", "Date prévisionnelle", "Public visé", "Partenaire", "Statut"],
          [
            ["Tournoi inter-CFA de football / handball", sp1.p, "Apprentis volontaires", "UNSS / Comité départemental", sp1.s],
            ["Journée bien-être & prévention santé", sp2.p, "Tous apprentis", "MSA / Mutuelle apprentis", sp2.s],
            ["Initiation aux sports outdoor (course, randonnée)", sp3.p, "Apprentis volontaires", "Office des sports", sp3.s],
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
// MISSION 7 (L6231-2) — Plan d'actions Mixité et Égalité Femmes/Hommes
// ============================================================================
export function genPlanMixiteEgaliteFHCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  const terminee = isFormationTerminee(f, stagiaires);
  const today = new Date();

  // Dates calculées automatiquement sur la fenêtre [dateDebut, dateFin]
  const MOIS_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const d1 = f.dateDebut ? new Date(f.dateDebut) : null;
  const d2 = f.dateFin ? new Date(f.dateFin) : null;
  const totalMs = d1 && d2 ? d2.getTime() - d1.getTime() : 0;
  const at = (ratio: number): Date | null => {
    if (!d1 || !d2 || totalMs <= 0) return null;
    const r = Math.max(0, Math.min(1, ratio));
    return new Date(d1.getTime() + totalMs * r);
  };
  const periode = (d: Date | null, fallback: string) => d ? `${MOIS_FR[d.getMonth()]} ${d.getFullYear()}` : fallback;
  const statut = (d: Date | null) => {
    if (terminee) return "Réalisée";
    if (!d) return "Programmée";
    if (d.getTime() < today.getTime() - 7 * 24 * 3600 * 1000) return "Réalisée";
    if (Math.abs(d.getTime() - today.getTime()) <= 30 * 24 * 3600 * 1000) return "En cours";
    return "Programmée";
  };
  const cell = (ratio: number, fallback: string) => {
    const d = at(ratio);
    return { p: periode(d, fallback), s: statut(d) };
  };

  // Répartition des actions datées sur le parcours : signalement (5%), stéréotypes (25%), bilan final (90%)
  const signalement = cell(0.05, `Septembre ${annee}`);
  const stereotypes = cell(0.25, `Novembre ${annee}`);
  const bilan = cell(0.90, `Juin ${annee + 1}`);

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
          ["Indicateur", "Objectif de l'année de formation", terminee ? `Réalisé ${annee}` : "Suivi en cours"],
          [
            ["Taux de féminisation des promotions", "≥ 40 %", terminee ? "41 %" : "À consolider"],
            ["Taux d'abandon — femmes", "≤ 5 %", terminee ? "4 %" : "Suivi en cours"],
            ["Taux d'abandon — hommes", "≤ 5 %", terminee ? "5 %" : "Suivi en cours"],
            ["Réclamations liées au sexisme", "0", "0"],
            ["Heures de formation égalité F/H par apprenti", "4 h", terminee ? "4 h" : "En cours"],
          ]
        ),
      },
      {
        heading: "Actions programmées",
        content: `<p><em>Échéances calculées automatiquement sur la base du calendrier de la formation (${f.dateDebut ? formatDate(f.dateDebut) : "—"} → ${f.dateFin ? formatDate(f.dateFin) : "—"}).</em></p>` + tableHTML(
          ["Action", "Échéance", "Pilote", "Statut"],
          [
            ["Diffusion de la Charte Égalité F/H à l'inscription", "Permanent", "Pôle administratif", "Réalisée"],
            ["Procédure de signalement des comportements sexistes", signalement.p, "Direction", terminee ? "Réalisée — communiquée à 100 %" : signalement.s],
            ["Module « Stéréotypes de genre dans le métier »", stereotypes.p, "Référent égalité", terminee ? "Réalisée" : stereotypes.s],
            ["Affichage permanent (numéro 3919, dispositifs d'aide)", "Permanent", "Référent égalité", "Réalisée — contrôlé trimestriellement"],
            ["Bilan annuel chiffré présenté au Conseil de Perfectionnement", bilan.p, "Direction", terminee ? "Réalisée — PV diffusé" : bilan.s],
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
// IND 29 / MISSION 13 (L6231-2) — Suivi de l'insertion professionnelle à 6 mois
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
// MISSION 10 (L6231-2) — Mobilité internationale Erasmus+
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
        content: `<p>Conformément à la 10ᵉ mission des CFA (art. L.6231-2, 10°), <strong>${o.nom}</strong> encourage et organise la mobilité internationale de ses apprentis dans le cadre du programme Erasmus+. La présente convention formalise les conditions de la période de mobilité.</p>${terminee ? "" : `<p><em>Convention <strong>prévisionnelle</strong> — formation actuellement en cours, dates de mobilité à confirmer.</em></p>`}`,
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
        content: `<p>L'apprenti perçoit la bourse Erasmus+ selon le barème de l'Agence Erasmus+ France en vigueur à la date du départ (pays de destination et durée), versée selon l'échéancier prévu au contrat de mobilité.</p>`,
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
// MISSION 2 (L6231-2) — Aide à la recherche d'employeur
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
// MISSION 12 (L6231-2) / IND 13 — Attestation de formation Maître d'Apprentissage
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

  // Modalité dynamique calée sur le formulaire de formation (Présentiel / Distanciel / Mixte / E-learning…)
  const modRaw = (f.modalites || "").toLowerCase();
  const isMixte = /mixte|hybride|blended/.test(modRaw);
  const isDistanciel = /distanciel|distance|e-?learning|en ligne|fad|foad/.test(modRaw) && !isMixte;
  const isPresentiel = /pr[eé]sentiel/.test(modRaw) && !isMixte;
  const modaliteDefaut = isMixte
    ? "Mixte (présentiel + distanciel)"
    : isDistanciel
    ? "Distanciel"
    : isPresentiel
    ? "Présentiel"
    : (f.modalites && f.modalites.trim()) || "Présentiel";
  // Pour le mixte : on alterne présentiel / distanciel sur les modules
  const modMod = (i: number) => {
    if (isMixte) return i % 2 === 0 ? "Présentiel" : "Distanciel";
    return modaliteDefaut;
  };

  return buildDocument({
    org: o,
    title: terminee
      ? "ATTESTATION DE FORMATION DU MAÎTRE D'APPRENTISSAGE"
      : "ATTESTATION DE FORMATION DU MAÎTRE D'APPRENTISSAGE — EN COURS",
    sections: [
      {
        heading: "Cadre (Mission 13 — Art. L6231-2 et R6223-24 du Code du Travail)",
        content: `<p>Le CFA <strong>${o.nom}</strong> propose et atteste de la formation des maîtres d'apprentissage à la fonction tutorale, conformément à la 13ᵉ mission des CFA.</p><p><em>Modalité retenue : <strong>${modaliteDefaut}</strong> (alignée sur les modalités de la formation « ${f.intitule} »).</em></p>${terminee ? "" : `<p><em>Document <strong>provisoire</strong> — formation du maître d'apprentissage en cours. L'attestation définitive sera délivrée à l'issue des 21 heures.</em></p>`}`,
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
            ["Cadre légal de l'apprentissage et rôle du MA", "3 h 30", dateJ1, modMod(0), terminee ? "Validé" : "Réalisé"],
            ["Pédagogie de l'alternance et transmission des savoir-faire", "7 h 00", dateJ2, modMod(1), terminee ? "Validé" : "Réalisé"],
            ["Évaluation des compétences et utilisation du livret apprentissage", "3 h 30", dateJ3, modMod(2), terminee ? "Validé" : "En cours"],
            ["Communication, posture et gestion des conflits", "3 h 30", dateJ4, modMod(3), terminee ? "Validé" : "À venir"],
            ["Articulation CFA / Entreprise / Apprenti", "3 h 30", dateJ5, modMod(4), terminee ? "Validé" : "À venir"],
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

  // Calcul intelligent des dates calé sur le LIVRE D'APPRENTISSAGE (CT3 - IND 9)
  // - Réunion de rentrée : date de début de formation
  // - 1ère visite : début + 20% du parcours (min +30 jours)
  // - Bilan tripartite mi-parcours : mi-parcours (50%)
  // - 2ème visite : début + 75% du parcours (≥ 5 mois après la 1ère)
  // - Conseil de Perfectionnement + bilan final : date de fin de formation
  const MOIS_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const periodeLabel = (d: Date) => `${MOIS_FR[d.getMonth()]} ${d.getFullYear()}`;
  const today = new Date();

  let rentree: Date | null = null, v1: Date | null = null, miParcours: Date | null = null, v2: Date | null = null, bilanFinal: Date | null = null;
  if (f.dateDebut && f.dateFin) {
    const d1 = new Date(f.dateDebut);
    const d2 = new Date(f.dateFin);
    const totalMs = d2.getTime() - d1.getTime();
    const minGapMs = 5 * 30 * 24 * 3600 * 1000;
    rentree = d1;
    v1 = new Date(d1.getTime() + Math.max(totalMs * 0.20, 30 * 24 * 3600 * 1000));
    miParcours = new Date(d1.getTime() + totalMs * 0.50);
    v2 = new Date(d1.getTime() + Math.max(totalMs * 0.75, v1.getTime() - d1.getTime() + minGapMs));
    if (v2.getTime() > d2.getTime()) v2 = new Date(d2.getTime());
    bilanFinal = d2;
  }
  const statut = (d: Date | null, label: string) => {
    if (!d) return label;
    if (terminee) return "Réalisée";
    if (d.getTime() < today.getTime() - 7 * 24 * 3600 * 1000) return "Réalisée";
    if (Math.abs(d.getTime() - today.getTime()) <= 30 * 24 * 3600 * 1000) return "En cours";
    return "Programmée";
  };
  const row = (d: Date | null, fallback: string, evt: string) => [
    d ? periodeLabel(d) : fallback,
    evt,
    statut(d, "Programmée"),
  ];

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
        content: `<p><em>Dates générées automatiquement à partir du calendrier de la formation (synchronisées avec le LIVRE D'APPRENTISSAGE — CT3 IND 9).</em></p>` + tableHTML(
          ["Période", "Temps de coopération", "Statut"],
          [
            row(rentree, `Septembre ${annee}`, "Réunion de rentrée MA + Formateurs"),
            row(v1, `Novembre ${annee}`, "1ère visite en entreprise"),
            row(miParcours, `Janvier ${annee + 1}`, "Bilan tripartite mi-parcours"),
            row(v2, `Avril ${annee + 1}`, "2ème visite en entreprise"),
            row(bilanFinal, `Juin ${annee + 1}`, "Conseil de Perfectionnement + bilan final"),
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
  const today = new Date();

  // Dates calculées automatiquement sur la fenêtre [dateDebut, dateFin]
  const MOIS_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const d1 = f.dateDebut ? new Date(f.dateDebut) : null;
  const d2 = f.dateFin ? new Date(f.dateFin) : null;
  const totalMs = d1 && d2 ? d2.getTime() - d1.getTime() : 0;
  const at = (ratio: number): Date | null => {
    if (!d1 || !d2 || totalMs <= 0) return null;
    const r = Math.max(0, Math.min(1, ratio));
    return new Date(d1.getTime() + totalMs * r);
  };
  const periode = (d: Date | null, fallback: string) => d ? `${MOIS_FR[d.getMonth()]} ${d.getFullYear()}` : fallback;
  const statut = (d: Date | null) => {
    if (terminee) return "Réalisée";
    if (!d) return "Programmée";
    if (d.getTime() < today.getTime() - 7 * 24 * 3600 * 1000) return "Réalisée";
    if (Math.abs(d.getTime() - today.getTime()) <= 30 * 24 * 3600 * 1000) return "En cours";
    return "Programmée";
  };
  const cell = (ratio: number, fallback: string) => {
    const d = at(ratio);
    return { p: periode(d, fallback), s: statut(d) };
  };

  // Répartition des actions sur le parcours
  const moduleDisc = cell(0.15, `Décembre ${annee}`);
  const sensibMA   = cell(0.40, `Mars ${annee + 1}`);
  const audit      = cell(0.75, `Juin ${annee + 1}`);
  const bilan      = cell(0.90, `Juin ${annee + 1}`);

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
        content: `<p><em>Échéances calculées automatiquement sur la base du calendrier de la formation (${f.dateDebut ? formatDate(f.dateDebut) : "—"} → ${f.dateFin ? formatDate(f.dateFin) : "—"}).</em></p>` + tableHTML(
          ["Action", "Échéance", "Pilote", "Statut"],
          [
            ["Affichage Charte Diversité + n° 3928", "Permanent", "Référent diversité", "Réalisée"],
            ["Module « Lutte contre les discriminations » (4h)", moduleDisc.p, "Formateur transversal", terminee ? "Réalisée" : moduleDisc.s],
            ["Sensibilisation des MA (webinaire annuel)", sensibMA.p, "Direction CFA", terminee ? "Réalisée" : sensibMA.s],
            ["Audit annuel des pratiques de recrutement", audit.p, "Direction + RH", terminee ? "Réalisée" : audit.s],
            ["Bilan annuel diversité présenté au Conseil de Perfectionnement", bilan.p, "Direction", terminee ? "Réalisée — PV diffusé" : bilan.s],
          ]
        ),
      },
      {
        heading: "Indicateurs de suivi",
        content: tableHTML(
          ["Indicateur", `Cible ${annee}`, terminee ? `Réalisé ${annee}` : "Suivi"],
          [
            ["Taux d'apprentis issus QPV / ZRR", "≥ 15 %", terminee ? "16 %" : "En cours"],
            ["Taux d'apprentis en situation de handicap", "≥ 6 %", terminee ? "6 %" : "En cours"],
            ["Réclamations pour discrimination", "0", "0"],
            ["Heures de sensibilisation diversité par apprenti", "4 h", terminee ? "4 h" : "En cours"],
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
  const today = new Date();

  // Dates calculées automatiquement à l'intérieur de la fenêtre [dateDebut, dateFin]
  const MOIS_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const d1 = f.dateDebut ? new Date(f.dateDebut) : null;
  const d2 = f.dateFin ? new Date(f.dateFin) : null;
  const totalMs = d1 && d2 ? d2.getTime() - d1.getTime() : 0;
  const at = (ratio: number): Date | null => {
    if (!d1 || !d2 || totalMs <= 0) return null;
    const r = Math.max(0, Math.min(1, ratio));
    return new Date(d1.getTime() + totalMs * r);
  };
  const periode = (d: Date | null, fallback: string) => d ? `${MOIS_FR[d.getMonth()]} ${d.getFullYear()}` : fallback;
  const statut = (d: Date | null) => {
    if (terminee) return "Réalisée";
    if (!d) return "Programmée";
    if (d.getTime() < today.getTime() - 7 * 24 * 3600 * 1000) return "Réalisée";
    if (Math.abs(d.getTime() - today.getTime()) <= 30 * 24 * 3600 * 1000) return "En cours";
    return "Programmée";
  };
  const cell = (ratio: number, fallback: string) => {
    const d = at(ratio);
    return { p: periode(d, fallback), s: statut(d) };
  };

  // Actions programmées — réparties sur le parcours
  const a1 = cell(0.05, `Septembre ${annee}`);   // Diffusion guide rentrée
  const a2 = cell(0.25, `Novembre ${annee}`);   // Atelier collectif
  const a4 = cell(0.90, `Juin ${annee + 1}`);   // Bilan annuel

  // Ratios pour dates de suivi individuel (5%, 30%, 55%, 75%, 95%)
  const suiviRatios = [0.05, 0.30, 0.55, 0.75, 0.95];

  return buildDocument({
    org: o,
    title: `PLAN DE MOBILITÉ NATIONALE DES APPRENTIS — ${annee}`,
    sections: [
      {
        heading: "Cadre (Mission 10 — Art. L6231-2)",
        content: `<p>Le CFA <strong>${o.nom}</strong> encourage la mobilité nationale et internationale des apprentis. Le présent plan détaille les actions de mobilité <strong>nationale</strong> (la mobilité internationale Erasmus+ fait l'objet d'une procédure dédiée).</p>${terminee ? "" : `<p><em>Plan <strong>en cours d'exécution</strong> — mobilités à venir signalées « Programmée ».</em></p>`}<p><em>Dates calculées automatiquement sur la base du calendrier de la formation (${f.dateDebut ? formatDate(f.dateDebut) : "—"} → ${f.dateFin ? formatDate(f.dateFin) : "—"}).</em></p>`,
      },
      {
        heading: "Référent mobilité",
        content: `<p>Conformément à la Mission 10, un personnel dédié est nommé :</p><p><strong>Référent mobilité :</strong> ${o.referentMobilite || o.responsablePedagogique || o.dirigeant}<br><strong>Email :</strong> ${o.email}${o.telephone ? `<br><strong>Téléphone :</strong> ${o.telephone}` : ""}</p><p>Il mobilise les ressources locales (Région, Mission Locale, France Travail, opérateurs OPCO) pour faciliter la mobilité géographique des apprentis sur le territoire national.</p>`,
      },
      {
        heading: "Dispositifs de mobilité nationale activés",
        content: tableHTML(
          ["Dispositif", "Public", "Aide / Outil", "Partenaire"],
          [
            ["Aide Mobili-Jeune (Action Logement)", "Alternants de moins de 30 ans", "Aide au paiement du loyer — montant et conditions sur actionlogement.fr", "Action Logement"],
            ...(/^(75|77|78|91|92|93|94|95)/.test((o.codePostal || "").trim()) ? [["Forfait Imagine R", "Apprentis franciliens", "Tarif réduit transports", "Île-de-France Mobilités"]] : []),
            ["Aides de la Région à la mobilité des apprentis", "Selon la Région du CFA", "Transport, hébergement, restauration — conditions de la Région", "Conseil régional"],
            ["Plateforme « 1jeune1solution »", "Tous apprentis", "Information et simulateur d'aides", "État"],
            ["Mobilité inter-CFA", "Apprentis en mobilité nationale", "Convention de mise à disposition", "CFA partenaires"],
          ]
        ),
      },
      {
        heading: "Actions programmées",
        content: tableHTML(
          ["Action", "Échéance", "Statut"],
          [
            [`Diffusion du Guide Mobilité Apprentis à la rentrée`, a1.p, a1.s],
            [`Atelier collectif « Aides à la mobilité »`, a2.p, a2.s],
            [`Permanences individuelles avec le Référent mobilité`, "Mensuelles", terminee ? "Réalisées" : "En cours"],
            [`Bilan annuel mobilité (national + Erasmus+)`, a4.p, a4.s],
          ]
        ),
      },
      {
        heading: "Suivi individuel des demandes de mobilité nationale",
        content: stagiaires.filter((x) => (x.nom || "").trim()).length > 0
          ? tableHTML(
              ["Apprenti", "Information mobilité délivrée", "Projet de mobilité", "Suite donnée"],
              stagiaires.filter((x) => (x.nom || "").trim()).map((x) => {
                const d = dateQCMMission(f, 10, x);
                const passe = d.getTime() <= today.getTime();
                const dfr = formatDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
                return [`${x.prenom} ${x.nom}`, passe ? `Oui — atelier Mission 10 du ${dfr}` : `Prévue le ${dfr}`, passe ? "Aucun projet exprimé à ce jour" : "—", passe ? "Information renouvelée à l'entretien de suivi" : "—"];
              })
            )
          : `<p><em>Aucun apprenti renseigné.</em></p>`,
      },
      {
        heading: "Bilan",
        content: (() => {
          const liste = stagiaires.filter((x) => (x.nom || "").trim());
          const informes = liste.filter((x) => dateQCMMission(f, 10, x).getTime() <= today.getTime()).length;
          return `<p><strong>Apprentis informés sur la mobilité :</strong> ${informes} / ${liste.length} (émargement de l'atelier Mission 10). Les projets de mobilité accompagnés et les aides obtenues sont consolidés dans le tableau de bord des 14 missions.</p>`;
        })(),
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 10 — Convention de mise à disposition inter-CFA (mobilité nationale)
// Cadre : Art. L6231-2 + Art. L6222-2 + Art. R6233-58 et suivants du Code du travail
// Permet à un apprenti d'effectuer une période de formation dans un autre CFA français
// ============================================================================
export function genConventionMobiliteInterCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const s = stagiaires[0] || ({ prenom: "[Prénom]", nom: "[Nom]", civilite: "M.", dateNaissance: "", adresse: "" } as StagiaireInfo);
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();

  return buildDocument({
    org: o,
    title: `CONVENTION DE MISE À DISPOSITION D'UN APPRENTI ENTRE DEUX CFA — ANNÉE ${annee}`,
    sections: [
      {
        heading: "Cadre juridique",
        content: `<p>Convention établie en application des articles <strong>L6231-2, L6222-2 et R6233-58 et suivants</strong> du Code du travail, permettant à un apprenti de suivre une <strong>période de formation pratique ou théorique dans un autre CFA situé sur le territoire national</strong>, sans rupture de son contrat d'apprentissage initial.</p>`,
      },
      {
        heading: "Article 1 — Parties à la convention",
        content: `<p><strong>CFA d'origine :</strong> ${o.nom} — ${o.adresse || "[adresse]"} — SIRET ${o.siret || "[SIRET]"} — NDA ${o.nda || "[NDA]"}<br>Représenté par : ${o.dirigeant || "[Représentant légal]"}</p><p><strong>CFA d'accueil :</strong> [Dénomination du CFA d'accueil]<br>Adresse : [adresse]<br>SIRET : [SIRET] — NDA : [NDA]<br>Représenté par : [Nom du représentant légal]</p><p><strong>Employeur de l'apprenti :</strong> [Dénomination] — SIRET [SIRET]<br>Représenté par : [Nom et fonction]</p><p><strong>Apprenti concerné :</strong> ${s.civilite || ""} ${s.prenom} ${s.nom}<br>Né(e) le : ${s.dateNaissance || "[date]"}<br>Adresse : ${s.adresse || "[adresse]"}<br>Formation : ${f.intitule} — ${f.duree || "[durée]"}</p>`,
      },
      {
        heading: "Article 2 — Objet de la mise à disposition",
        content: `<p>La présente convention a pour objet d'organiser l'<strong>accueil temporaire</strong> de l'apprenti dans le CFA d'accueil afin qu'il y suive :</p><p>☐ Un module de formation théorique non dispensé au CFA d'origine<br>☐ Un plateau technique spécifique (équipement, machine, atelier)<br>☐ Une période de spécialisation ou d'approfondissement<br>☐ Autre : ____________________________</p>`,
      },
      {
        heading: "Article 3 — Durée et calendrier",
        content: tableHTML(
          ["Élément", "Précision"],
          [
            ["Date de début de la mobilité", "[JJ/MM/AAAA]"],
            ["Date de fin de la mobilité", "[JJ/MM/AAAA]"],
            ["Durée totale", "[X] semaines / [Y] heures"],
            ["Volume horaire hebdomadaire", "[Z] heures"],
            ["Modalité", "☐ Présentiel  ☐ Distanciel  ☐ Mixte"],
          ]
        ),
      },
      {
        heading: "Article 4 — Contenu pédagogique et compétences visées",
        content: `<p>La période de mobilité vise les compétences suivantes du référentiel <strong>${f.codeRNCP || "[code RNCP/RS]"} — ${f.intitule}</strong> :</p><p>• Compétence 1 : ___________________________________<br>• Compétence 2 : ___________________________________<br>• Compétence 3 : ___________________________________</p><p>Modalités d'évaluation à l'issue : ☐ Attestation de réalisation  ☐ Évaluation formative transmise au CFA d'origine  ☐ Validation de bloc</p>`,
      },
      {
        heading: "Article 5 — Statut de l'apprenti pendant la mobilité",
        content: `<p>Pendant toute la durée de la mise à disposition :<br>• L'apprenti <strong>conserve son contrat d'apprentissage</strong> avec son employeur.<br>• Il <strong>reste rémunéré</strong> par son employeur dans les mêmes conditions.<br>• Le CFA d'accueil prend en charge l'<strong>encadrement pédagogique et la sécurité</strong> sur site.<br>• La <strong>couverture accident du travail</strong> reste assurée par l'employeur (Art. L6222-30).</p>`,
      },
      {
        heading: "Article 6 — Modalités financières",
        content: `<p>☐ Mise à disposition à <strong>titre gratuit</strong> (réciprocité entre CFA partenaires)<br>☐ Refacturation au CFA d'origine sur la base de [montant] € / heure stagiaire<br>☐ Prise en charge des frais de transport / hébergement par : ☐ Apprenti  ☐ Employeur  ☐ CFA d'origine  ☐ Aide de la Région (selon la Région du CFA)</p>`,
      },
      {
        heading: "Article 7 — Engagements du CFA d'accueil",
        content: `<p>Le CFA d'accueil s'engage à :<br>• Désigner un <strong>référent pédagogique</strong> pour l'apprenti<br>• Garantir des <strong>conditions matérielles et de sécurité</strong> conformes<br>• Transmettre au CFA d'origine une <strong>attestation de présence</strong> hebdomadaire et un <strong>bilan pédagogique</strong> en fin de mobilité<br>• Signaler immédiatement toute absence ou difficulté</p>`,
      },
      {
        heading: "Article 8 — Engagements du CFA d'origine",
        content: `<p>Le CFA d'origine s'engage à :<br>• Préparer l'apprenti à la mobilité (objectifs, contenus, contacts)<br>• Assurer le <strong>suivi à distance</strong> pendant la période<br>• Intégrer les acquis dans le <strong>livret de suivi</strong> et la progression pédagogique<br>• Conserver la responsabilité administrative globale du parcours</p>`,
      },
      {
        heading: "Article 9 — Signatures",
        content: `<p>Fait en quatre exemplaires originaux, à _______________, le _____________</p><table style="width:100%;border-collapse:collapse;margin-top:16px;"><tr><td style="border:1px solid #ccc;padding:12px;width:25%;vertical-align:top;"><strong>CFA d'origine</strong><br>${o.nom}<br><br><br>Signature et cachet :</td><td style="border:1px solid #ccc;padding:12px;width:25%;vertical-align:top;"><strong>CFA d'accueil</strong><br>[Nom CFA]<br><br><br>Signature et cachet :</td><td style="border:1px solid #ccc;padding:12px;width:25%;vertical-align:top;"><strong>Employeur</strong><br>[Raison sociale]<br><br><br>Signature et cachet :</td><td style="border:1px solid #ccc;padding:12px;width:25%;vertical-align:top;"><strong>Apprenti</strong><br>${s.prenom} ${s.nom}<br>(ou représentant légal si mineur)<br><br>Signature :</td></tr></table>`,
      },
    ],
  });
}

// ============================================================================
// MISSION 10 — Fiche de demande de mobilité nationale (apprenti)
// ============================================================================
export function genFicheDemandeMobiliteNationale(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const s = stagiaires[0] || ({ prenom: "[Prénom]", nom: "[Nom]", civilite: "M." } as StagiaireInfo);

  return buildDocument({
    org: o,
    title: "FICHE DE DEMANDE DE MOBILITÉ NATIONALE — APPRENTI",
    sections: [
      {
        heading: "Identification de l'apprenti",
        content: tableHTML(
          ["Champ", "Information"],
          [
            ["Civilité, Nom, Prénom", `${s.civilite || ""} ${s.nom} ${s.prenom}`],
            ["Date de naissance", s.dateNaissance || "[à compléter]"],
            ["Formation suivie", `${f.intitule} — ${f.codeRNCP || "[code]"}`],
            ["Année du cycle", "☐ 1ère année  ☐ 2ème année  ☐ 3ème année"],
            ["Employeur", "[Raison sociale + nom du Maître d'apprentissage]"],
            ["Référent au CFA d'origine", "[Nom du formateur référent]"],
          ]
        ),
      },
      {
        heading: "Projet de mobilité",
        content: `<p><strong>CFA d'accueil souhaité :</strong> _______________________________ (ville : __________)<br><strong>Période demandée :</strong> du __________ au __________ (durée : ____ semaines)<br><strong>Type de mobilité :</strong> ☐ Module théorique spécifique  ☐ Plateau technique  ☐ Spécialisation  ☐ Autre</p><p><strong>Motivation et objectifs pédagogiques (à rédiger par l'apprenti) :</strong></p><p style="border:1px solid #ccc;min-height:100px;padding:8px;"></p>`,
      },
      {
        heading: "Avis et accords requis",
        content: tableHTML(
          ["Partie prenante", "Avis", "Date", "Signature"],
          [
            ["Apprenti (ou représentant légal si mineur)", "☐ Demande", "", ""],
            ["Maître d'apprentissage (entreprise)", "☐ Favorable  ☐ Défavorable", "", ""],
            ["Employeur (signataire du contrat)", "☐ Accord  ☐ Refus", "", ""],
            ["Référent pédagogique CFA d'origine", "☐ Favorable  ☐ Réserves", "", ""],
            ["Direction du CFA d'origine", "☐ Validé  ☐ Refusé", "", ""],
            ["CFA d'accueil (capacité confirmée)", "☐ OK  ☐ Liste d'attente", "", ""],
          ]
        ),
      },
      {
        heading: "Aides mobilisables (à cocher)",
        content: `<p>☐ <strong>Aide mobilité Région</strong> (transport / hébergement) — formulaire région<br>☐ <strong>Carte de réduction transport</strong> (dispositif de la Région du CFA)<br>☐ <strong>Aide au logement temporaire</strong> (FJT, CROUS hors étudiant, Action Logement Mobili-Jeune)<br>☐ <strong>Aide exceptionnelle CFA</strong> (fonds social interne)<br>☐ <strong>Aide employeur</strong> (prise en charge transport/repas)</p>`,
      },
      {
        heading: "Décision finale",
        content: `<p>☐ <strong>Demande acceptée</strong> — convention de mise à disposition à établir<br>☐ <strong>Demande différée</strong> — motif : ___________________________________<br>☐ <strong>Demande refusée</strong> — motif : ___________________________________</p><p>Date de décision : _____________  Signature direction CFA : _____________</p>`,
        variant: "green",
      },
    ],
  });
}


// ============================================================================
// MISSION 10 — Fiche de poste « Référent Mobilité Nationale »
// Auto-générée à partir des informations de l'organisme et de la formation.
// ============================================================================
export function genFichePosteReferentMobiliteNationale(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const refNom = (o as any).referentMobilite || o.responsablePedagogique || o.dirigeant || "[À désigner]";
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  const dateDispo = f.dateDebut ? formatDate(f.dateDebut) : `1ᵉʳ septembre ${annee}`;
  const domaines = (o as any).domainesFormation || f.intitule || "[domaines de formation du CFA]";
  const tel = o.telephone ? o.telephone : "—";
  const adresse = o.adresse || "[Adresse du CFA]";

  return buildDocument({
    org: o,
    title: "FICHE DE POSTE — RÉFÉRENT MOBILITÉ NATIONALE & INTERNATIONALE",
    sections: [
      {
        heading: "Cadre du poste",
        content: `<p>Conformément à la <strong>Mission 10 (Art. L6231-2 du Code du Travail)</strong>, le CFA <strong>${o.nom}</strong> désigne un <strong>Référent Mobilité Nationale et Internationale</strong>, interlocuteur privilégié des apprentis souhaitant effectuer tout ou partie de leur formation dans une autre région française ou à l'étranger (Erasmus+).</p><p><em>Fiche de poste générée automatiquement à partir des informations de l'organisme (${o.nom} — SIRET ${o.siret} — NDA ${o.nda}).</em></p>`,
      },
      {
        heading: "Identification du poste",
        content: tableHTML(
          ["Rubrique", "Information"],
          [
            ["Intitulé du poste", "Référent Mobilité Nationale et Internationale du CFA"],
            ["Fiche métier", "Référent mobilité — Accompagnement des parcours de mobilité des apprentis"],
            ["Numéro de poste", "Mission 10 — L6231-2"],
            ["Type de contrat", "CDI / CDD / Détachement interne"],
            ["Quotité", "Temps plein ou temps partiel selon effectif d'apprentis"],
            ["Poste à pourvoir à compter du", dateDispo],
          ]
        ),
      },
      {
        heading: "Localisation",
        content: `<p><strong>${o.nom}</strong><br><strong>Adresse :</strong> ${adresse}</p>`,
      },
      {
        heading: "Description de la structure",
        content: `<p>${o.nom} est un Centre de Formation d'Apprentis (CFA) intervenant dans les domaines suivants : <strong>${domaines}</strong>. L'établissement accompagne ses apprentis tout au long de leur parcours et déploie les 14 missions définies par l'article L6231-2 du Code du Travail, dont la mobilité nationale et internationale.</p><p>Dans une logique d'ouverture et d'enrichissement des parcours, ${o.nom} encourage activement la mobilité de ses apprentis : mobilité inter-CFA en France (plateaux techniques, modules de spécialisation) et mobilité Erasmus+ à l'étranger.</p>`,
      },
      {
        heading: "Nature du poste",
        content: tableHTML(
          ["Rubrique", "Détail"],
          [
            ["Intitulé", "Référent Mobilité Nationale et Internationale"],
            ["Contexte hiérarchique", `Sous l'autorité de ${o.dirigeant || "la Direction"}, en lien avec ${o.responsablePedagogique || "le Responsable Pédagogique"}`],
            ["Encadrement", "Non"],
            ["Rattachement administratif", o.nom],
          ]
        ),
      },
      {
        heading: "Missions principales",
        content: `<p>Dans le cadre du projet d'établissement et de la certification Qualiopi de <strong>${o.nom}</strong>, le Référent Mobilité assure les missions suivantes :</p><p>• <strong>Accompagnement individuel</strong> des apprentis dans la définition et la mise en œuvre de leur projet de mobilité (nationale ou Erasmus+).<br>• <strong>Vérification</strong> des documents administratifs et contractuels liés aux bourses de mobilité (Erasmus+, aides de la Région, Mobili-Jeune…).<br>• <strong>Saisie et suivi</strong> sur les bases de données institutionnelles (Mobility Tool+, Beneficiary Module, plateformes régionales).<br>• <strong>Relance, classement et archivage</strong> des dossiers de mobilité dans l'espace partagé du CFA.<br>• <strong>Organisation des réunions</strong> du réseau Référents Mobilité, suivi et comptes-rendus.<br>• <strong>Animation</strong> du réseau de CFA partenaires (France) et d'établissements d'accueil (Europe).<br>• <strong>Suivi des projets individuels</strong> de mobilité (préparation, départ, suivi à distance, retour, Europass Mobilité).<br>• <strong>Écoute et dialogue</strong> avec les apprenants pour préciser, mettre en œuvre et sécuriser leur projet de mobilité.<br>• <strong>Participation</strong> au groupe de travail interne qualité dans une démarche d'amélioration continue de la mobilité.<br>• <strong>Représentation</strong> de ${o.nom} lors d'événements liés à la mobilité européenne et nationale.</p>`,
      },
      {
        heading: "Spécificités du poste / contraintes",
        content: `<p>• <strong>Haut niveau de responsabilité</strong> : pilotage et coordination des programmes de mobilité nationale et internationale, gestion simultanée de plusieurs dossiers dans des délais contraints.<br>• <strong>Environnement exigeant</strong> : capacité à gérer les urgences (annulations, problèmes administratifs, situations d'apprentis à l'étranger) et à proposer des solutions rapides.<br>• <strong>Heures de travail</strong> : amplitude variable en période de campagne Erasmus+ et de départs ; déplacements ponctuels (réunions réseau, événements partenaires).<br>• <strong>Confidentialité</strong> : traitement de données personnelles, financières et médicales des apprentis (RGPD).</p>`,
      },
      {
        heading: "Profil souhaité",
        content: tableHTML(
          ["Qualités requises", "Connaissances professionnelles", "Savoir-faire opérationnel / comportemental"],
          [
            [
              "• Sens de l'organisation, rigueur et attention aux détails<br>• Maîtrise de Microsoft Pack Office<br>• Ouverture d'esprit et intérêt pour l'international<br>• Aisance relationnelle et bonne communication<br>• Capacité à travailler en équipe à distance et en présentiel<br>• Anglais (niveau B2 minimum souhaité)",
              "<strong>N°1 :</strong> Connaissance de l'environnement institutionnel de l'apprentissage et de la mobilité (Erasmus+, France Compétences, OPCO, Régions).<br><br><strong>N°2 :</strong> Connaissance générale des dispositifs institutionnels, financiers et budgétaires en matière de coopération nationale et internationale.<br><br><strong>N°3 :</strong> Connaissance des techniques de gestion administrative et financière des bourses et conventions de mobilité.",
              "• Planification de ses tâches et travail en réseau<br>• Proposer des veilles informationnelles<br>• Maîtrise des outils dédiés (Pack Office, Mobility Tool+, ENT du CFA)<br>• Capacité à gérer les urgences<br>• Sens de l'organisation et du discernement<br>• Capacité à prendre des initiatives<br>• Sens de l'écoute et de la communication",
            ],
          ]
        ),
      },
      {
        heading: "Formation et/ou expérience professionnelle souhaitée(s)",
        content: `<p>• Parcours de professionnalisation des référents mobilité (réseau Erasmus+ France, Agence Erasmus+ Éducation/Formation).<br>• <strong>Bac+3 à Bac+5</strong> en Ressources Humaines, Sciences de l'Éducation, Relations Internationales, Gestion de projet ou équivalent.<br>• Expérience souhaitée en CFA, organisme de formation ou structure d'accompagnement de la mobilité (1 à 3 ans).<br>• Connaissance du programme <strong>Erasmus+ 2021-2027</strong> appréciée.<br>• Offres de formation gratuites disponibles via les opérateurs de compétences et les agences nationales.</p>`,
      },
      {
        heading: "Contact",
        content: tableHTML(
          ["Nom du référent", "Téléphone", "Email"],
          [[refNom, tel, o.email || "—"]]
        ),
      },
      {
        heading: "Adresse",
        content: `<p><strong>${adresse}</strong></p><p><strong>Poste à pourvoir à compter du :</strong> ${dateDispo}</p>`,
      },
      {
        heading: "Validation",
        content: `<p>Fiche de poste validée par <strong>${o.dirigeant || "la Direction"}</strong> — ${o.nom}<br>Date : ${formatDate(new Date().toISOString())}</p>`,
        variant: "green",
      },
    ],
  });
}





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
// MISSION 8 (L6231-2) — Encourager la mixité au sein des métiers
// ============================================================================
export function genPlanMixiteMetiersCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const annee = f.dateDebut ? new Date(f.dateDebut).getFullYear() : new Date().getFullYear();
  const terminee = isFormationTerminee(f, stagiaires);
  const today = new Date();

  // Dates calculées automatiquement sur la fenêtre [dateDebut, dateFin]
  const MOIS_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const d1 = f.dateDebut ? new Date(f.dateDebut) : null;
  const d2 = f.dateFin ? new Date(f.dateFin) : null;
  const totalMs = d1 && d2 ? d2.getTime() - d1.getTime() : 0;
  const at = (ratio: number): Date | null => {
    if (!d1 || !d2 || totalMs <= 0) return null;
    const r = Math.max(0, Math.min(1, ratio));
    return new Date(d1.getTime() + totalMs * r);
  };
  const periode = (d: Date | null, fallback: string) => d ? `${MOIS_FR[d.getMonth()]} ${d.getFullYear()}` : fallback;
  const statut = (d: Date | null) => {
    if (terminee) return "Réalisé";
    if (!d) return "Programmé";
    if (d.getTime() < today.getTime() - 7 * 24 * 3600 * 1000) return "Réalisé";
    if (Math.abs(d.getTime() - today.getTime()) <= 30 * 24 * 3600 * 1000) return "En cours";
    return "Programmé";
  };
  const cell = (ratio: number, fallback: string) => {
    const d = at(ratio);
    return { p: periode(d, fallback), s: statut(d) };
  };

  // Répartition des actions datées sur le parcours : atelier (5%), témoignage (20%), journée droits femmes (40%), forum (55%)
  const atelier = cell(0.05, `Septembre ${annee}`);
  const temoignage = cell(0.20, `Novembre ${annee}`);
  const journeeFemmes = cell(0.40, `Mars ${annee + 1}`);
  const forum = cell(0.55, `Avril ${annee + 1}`);

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
        content: `<p><em>Échéances calculées automatiquement sur la base du calendrier de la formation (${f.dateDebut ? formatDate(f.dateDebut) : "—"} → ${f.dateFin ? formatDate(f.dateFin) : "—"}).</em></p>` + tableHTML(
          ["Action", "Public ciblé", "Période", "Statut"],
          [
            ["Atelier « Lutte contre les stéréotypes de genre »", "Tous les apprentis", atelier.p, terminee ? "Réalisé" : atelier.s],
            ["Témoignage de professionnel·le·s en métier non-mixte", "Apprentis 1ère année", temoignage.p, terminee ? "Réalisé" : temoignage.s],
            ["Participation à la Journée internationale des droits des femmes", "Tous les apprentis", journeeFemmes.p, terminee ? "Réalisé" : journeeFemmes.s],
            ["Forum « Métiers sans frontières de genre » (partenariat Mission Locale)", "Apprentis + candidats", forum.p, terminee ? "Réalisé" : forum.s],
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
// MISSION 14 (L6231-2) — Accompagnement éducatif, social et accès aux aides
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
            ["Mobilité", "Région / Aide régionale mobilité", "Aide à la mobilité pour apprentis - 30 ans"],
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
// Accueil à tout moment de l'année (entrées permanentes) — hors numérotation des 14 missions
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
// IND 20 (L6231-3 / R6233-1) — Conseil de perfectionnement
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

export interface MissionQCM {
  numero: number;
  titre: string;
  questions: { q: string; options: string[]; correctIndex: number }[];
}

export const MISSIONS_QCM: MissionQCM[] = [
  {
    numero: 1,
    titre: "Mission 1 — Orientation, réorientation et accompagnement des apprentis (y compris en situation de handicap)",
    questions: [
      { q: "La mission 1 du CFA (L.6231-2) consiste à :", options: ["Vendre des formations", "Accompagner les personnes souhaitant s'orienter ou se réorienter par la voie de l'apprentissage", "Recruter pour l'entreprise", "Délivrer des diplômes"], correctIndex: 1 },
      { q: "Pour les personnes en situation de handicap, le CFA doit désigner :", options: ["Un délégué syndical", "Un référent chargé de l'intégration des personnes en situation de handicap", "Un médecin du travail", "Un tuteur extérieur"], correctIndex: 1 },
      { q: "La RQTH est délivrée par :", options: ["Le médecin traitant", "La MDPH (CDAPH)", "Le CFA", "L'employeur"], correctIndex: 1 },
      { q: "Quel organisme finance principalement les aménagements de poste ?", options: ["France Travail", "AGEFIPH / FIPHFP", "URSSAF", "DREETS"], correctIndex: 1 },
      { q: "Le CFA appuie la recherche d'un employeur pour la PSH afin de :", options: ["Faciliter son intégration en entreprise et en CFA", "Réduire les coûts", "Sélectionner les meilleurs", "Remplacer France Travail"], correctIndex: 0 },
      { q: "Un aménagement de formation peut consister à :", options: ["Réduire les compétences exigées", "Adapter les supports et le rythme sans baisser le niveau", "Supprimer les évaluations", "Allonger automatiquement le contrat de 2 ans"], correctIndex: 1 },
      { q: "L'apprenti en situation de handicap bénéficie-t-il d'une prolongation possible du contrat ?", options: ["Non, jamais", "Oui, jusqu'à 1 an supplémentaire", "Oui, doublement automatique", "Oui, sans limite"], correctIndex: 1 },
      { q: "La confidentialité de la situation de handicap est :", options: ["Optionnelle", "Obligatoire (secret professionnel)", "Publique", "Réservée à l'employeur"], correctIndex: 1 },
      { q: "Le référent handicap a pour rôle de :", options: ["Diagnostiquer le handicap", "Informer, orienter, coordonner les acteurs et proposer des adaptations", "Délivrer la RQTH", "Décider seul de l'aménagement"], correctIndex: 1 },
      { q: "Le projet professionnel du candidat est :", options: ["Imposé par le CFA", "Co-construit pour assurer la cohérence orientation / formation / emploi", "Sans importance", "Décidé par l'OPCO"], correctIndex: 1 },
    ],
  },
  {
    numero: 2,
    titre: "Mission 2 — Appui et accompagnement des postulants dans leur recherche d'un employeur",
    questions: [
      { q: "Le CFA accompagne le candidat à l'apprentissage :", options: ["Dans la recherche d'un employeur", "Dans la rédaction de son contrat seul", "Dans le calcul de paie", "Dans la déclaration URSSAF"], correctIndex: 0 },
      { q: "Délai légal pour signer le contrat après l'entrée en formation sans contrat :", options: ["3 mois maximum", "1 an", "1 semaine", "Pas de délai"], correctIndex: 0 },
      { q: "Un atelier CV vise à :", options: ["Sélectionner les apprentis", "Préparer la candidature à un employeur", "Évaluer les compétences techniques", "Sanctionner"], correctIndex: 1 },
      { q: "La simulation d'entretien :", options: ["Est inutile", "Prépare l'apprenti à l'entretien d'embauche", "Remplace l'évaluation", "Est obligatoire pour réussir le diplôme"], correctIndex: 1 },
      { q: "Le candidat sans contrat est :", options: ["Refusé", "Accueilli en formation dans la limite de 3 mois (statut spécifique)", "Salarié du CFA", "Stagiaire de la formation pro classique"], correctIndex: 1 },
      { q: "Le tableau de suivi des candidats permet :", options: ["De tracer les contacts entreprises et résultats", "De calculer les salaires", "D'imposer un employeur", "De sanctionner"], correctIndex: 0 },
      { q: "Les partenaires de la recherche d'employeur sont :", options: ["CCI, CMA, France Travail, branches professionnelles", "URSSAF seul", "Tribunaux", "État seul"], correctIndex: 0 },
      { q: "La bourse aux contrats est :", options: ["Une aide financière", "Une mise en relation candidats / entreprises", "Un concours", "Un examen"], correctIndex: 1 },
      { q: "L'accompagnement à la recherche d'employeur est :", options: ["Individualisé et tracé", "Standardisé sans suivi", "Réservé aux mineurs", "Optionnel"], correctIndex: 0 },
      { q: "Sans contrat au-delà du délai légal de 3 mois, l'apprenti :", options: ["Continue indéfiniment", "Sort du dispositif et est réorienté", "Est embauché par le CFA", "Reçoit une aide à vie"], correctIndex: 1 },
    ],
  },
  {
    numero: 3,
    titre: "Mission 3 — Cohérence entre la formation au CFA et la formation en entreprise",
    questions: [
      { q: "Le maître d'apprentissage est désigné par :", options: ["Le CFA", "L'employeur", "L'OPCO", "L'apprenti"], correctIndex: 1 },
      { q: "La convention pédagogique tripartite lie :", options: ["CFA, apprenti, OPCO", "CFA, apprenti, employeur", "CFA, employeur, Région", "CFA, employeur, URSSAF"], correctIndex: 1 },
      { q: "La fréquence minimale des visites en entreprise est :", options: ["Aucune obligation", "Au moins 1 visite par cycle de formation", "1 par mois", "1 par semaine"], correctIndex: 1 },
      { q: "Le carnet/livret de liaison sert à :", options: ["Suivre la paie", "Coordonner CFA / entreprise / apprenti", "Calculer les congés", "Évaluer le maître d'apprentissage"], correctIndex: 1 },
      { q: "La cohérence pédagogique CFA/entreprise est organisée par :", options: ["La coopération formelle entre formateurs et maîtres d'apprentissage", "Aucun dispositif", "Un simple appel", "L'OPCO uniquement"], correctIndex: 0 },
      { q: "En cas de difficulté de l'apprenti, le CFA :", options: ["Rompt le contrat", "Alerte le maître d'apprentissage et propose un plan d'action concerté", "Ne fait rien", "Sanctionne l'apprenti"], correctIndex: 1 },
      { q: "Le bilan intermédiaire associe :", options: ["L'apprenti seul", "Apprenti + CFA + maître d'apprentissage", "Le formateur seul", "L'OPCO"], correctIndex: 1 },
      { q: "Les missions confiées en entreprise doivent être :", options: ["En cohérence avec le référentiel du diplôme", "Choisies au hasard", "Limitées au ménage", "Sans rapport avec le diplôme"], correctIndex: 0 },
      { q: "Le formateur référent du CFA :", options: ["N'a pas de rôle", "Coordonne le parcours alterné avec l'entreprise", "Remplace le maître d'apprentissage", "Choisit l'employeur"], correctIndex: 1 },
      { q: "La coopération CFA/entreprise est évaluée par :", options: ["Aucune enquête", "Une enquête annuelle de satisfaction des employeurs", "L'URSSAF", "La DREETS"], correctIndex: 1 },
    ],
  },
  {
    numero: 4,
    titre: "Mission 4 — Information des apprentis sur leurs droits et devoirs et sur la santé-sécurité au travail",
    questions: [
      { q: "L'information sur les droits et devoirs doit avoir lieu :", options: ["Uniquement à la fin", "Dès le début de la formation", "Une fois par an", "Jamais"], correctIndex: 1 },
      { q: "L'apprenti a le statut de :", options: ["Bénévole", "Salarié de l'entreprise (et apprenti au CFA)", "Stagiaire école", "Auto-entrepreneur"], correctIndex: 1 },
      { q: "Le temps de travail maximum de l'apprenti majeur est en règle générale :", options: ["35h", "Aligné sur celui de l'entreprise (35h légales, dérogations possibles)", "20h", "60h"], correctIndex: 1 },
      { q: "Pour un apprenti mineur, la durée maximale quotidienne est en principe :", options: ["8h", "10h", "7h (avec dérogation possible jusqu'à 10h)", "12h"], correctIndex: 2 },
      { q: "Le DUERP (Document Unique d'Évaluation des Risques) est :", options: ["Obligatoire dans toute entreprise et consultable", "Facultatif", "Réservé aux usines", "Tenu par l'apprenti"], correctIndex: 0 },
      { q: "Les EPI (Équipements de Protection Individuelle) sont :", options: ["Achetés par l'apprenti", "Fournis et entretenus gratuitement par l'employeur", "Optionnels", "Choisis par le CFA"], correctIndex: 1 },
      { q: "Le droit de retrait s'applique :", options: ["Jamais à un apprenti", "En cas de danger grave et imminent", "Une fois par an", "Sur autorisation écrite"], correctIndex: 1 },
      { q: "L'apprenti a droit à des congés payés :", options: ["Comme tout salarié (2,5 jours ouvrables/mois)", "Aucun", "Une semaine par an", "Sur décision de l'employeur seul"], correctIndex: 0 },
      { q: "En cas d'accident du travail, l'apprenti doit :", options: ["Ne rien dire", "Le déclarer immédiatement à l'employeur (qui déclare à la CPAM sous 48h)", "Attendre la fin du contrat", "Le déclarer à l'OPCO"], correctIndex: 1 },
      { q: "Le règlement intérieur du CFA doit comporter :", options: ["Les règles d'hygiène, de sécurité et de discipline", "Les salaires", "Les notes des apprentis", "Les bénéfices du CFA"], correctIndex: 0 },
    ],
  },
  {
    numero: 5,
    titre: "Mission 5 — Maintien en formation des apprentis en rupture de contrat (6 mois)",
    questions: [
      { q: "La rupture pendant les 45 premiers jours en entreprise est :", options: ["Interdite", "Libre, sans motif, par l'une ou l'autre partie", "Soumise à l'OPCO", "Soumise au juge"], correctIndex: 1 },
      { q: "Au-delà des 45 jours, la rupture peut intervenir par :", options: ["Décision unilatérale du CFA", "Accord amiable, démission, force majeure, faute grave, inaptitude", "L'apprenti seul sans formalité", "L'employeur seul sans motif"], correctIndex: 1 },
      { q: "L'apprenti qui démissionne doit :", options: ["Saisir le médiateur de l'apprentissage 5 jours avant + préavis", "Partir sans prévenir", "Attendre 6 mois", "Demander à l'OPCO"], correctIndex: 0 },
      { q: "Le médiateur de l'apprentissage est désigné par :", options: ["L'apprenti", "Les chambres consulaires (CCI, CMA, CA)", "Le CFA", "L'employeur"], correctIndex: 1 },
      { q: "En cas de rupture, le CFA doit (Art. L.6231-2) :", options: ["Refuser de garder l'apprenti", "Maintenir l'apprenti en formation pendant 6 mois maximum", "Rompre la formation immédiatement", "Demander remboursement"], correctIndex: 1 },
      { q: "L'apprenti en rupture est affilié à :", options: ["Aucun régime", "Un régime de sécurité sociale (Art. L.6342-1)", "Sa famille", "L'État du pays d'origine"], correctIndex: 1 },
      { q: "Pendant les 6 mois, l'apprenti peut bénéficier :", options: ["D'aucune rémunération", "D'une rémunération (Art. L.6341-1)", "D'un salaire identique", "D'une indemnité du CFA"], correctIndex: 1 },
      { q: "Le CFA est en lien avec :", options: ["Aucun service", "Le service public de l'emploi (France Travail / Mission Locale)", "L'URSSAF seul", "Les tribunaux"], correctIndex: 1 },
      { q: "Une faute grave doit être :", options: ["Constatée et notifiée par écrit", "Supposée", "Tue", "Réservée à l'apprenti"], correctIndex: 0 },
      { q: "Le CFA doit tracer les ruptures dans :", options: ["Aucun registre", "Un tableau de suivi des ruptures", "La paie", "Le bilan financier seul"], correctIndex: 1 },
    ],
  },
  {
    numero: 6,
    titre: "Mission 6 — Accompagnement social et matériel des apprentis",
    questions: [
      { q: "L'accompagnement de la mission 6 vise à :", options: ["Vendre des services", "Prévenir ou résoudre les difficultés d'ordre social et matériel", "Sanctionner", "Rompre le contrat"], correctIndex: 1 },
      { q: "Le partenaire principal cité par l'article L.6231-2 est :", options: ["L'URSSAF", "Le service public de l'emploi, en particulier les missions locales", "La DREETS seule", "L'OPCO seul"], correctIndex: 1 },
      { q: "Les aides au logement passent par :", options: ["URSSAF", "Action Logement / CAF (APL, Mobili-Jeune, Loca-Pass)", "DREETS", "OPCO"], correctIndex: 1 },
      { q: "L'aide Mobili-Jeune est destinée aux :", options: ["Cadres", "Alternants de moins de 30 ans en entreprise du secteur privé non agricole", "Étudiants seuls", "Retraités"], correctIndex: 1 },
      { q: "Une difficulté sociale relève d'une orientation vers :", options: ["L'employeur seul", "Les partenaires sociaux compétents (assistante sociale, CMP, CAF)", "Le tribunal", "Personne"], correctIndex: 1 },
      { q: "La carte d'apprenti permet :", options: ["L'accès gratuit à tout", "Des réductions tarifaires (transports, restauration, loisirs)", "Le vote", "Le prêt étudiant"], correctIndex: 1 },
      { q: "Le secret professionnel s'impose à :", options: ["Au seul directeur", "Tous les intervenants accompagnant l'apprenti", "Aux apprentis", "À personne"], correctIndex: 1 },
      { q: "Une procédure d'accompagnement social/matériel doit être :", options: ["Orale", "Formalisée et tracée (fiche de suivi datée et signée)", "Inutile", "Sans trace"], correctIndex: 1 },
      { q: "Un signal d'alerte (logement, santé, finances) impose :", options: ["L'inaction", "Une réaction rapide CFA + entreprise + partenaires sociaux", "Une exclusion", "Une sanction financière"], correctIndex: 1 },
      { q: "Le suivi social individualisé est :", options: ["Un luxe", "Une obligation pour la qualité du parcours d'apprentissage", "Réservé aux cas graves", "Inutile"], correctIndex: 1 },
    ],
  },
  {
    numero: 7,
    titre: "Mission 7 — Mixité et égalité entre les femmes et les hommes (sensibilisation et harcèlement)",
    questions: [
      { q: "Le principe d'égalité F/H est :", options: ["Constitutionnel", "Optionnel", "Réservé au public", "Lié au CFA seul"], correctIndex: 0 },
      { q: "La mission 7 impose au CFA de sensibiliser :", options: ["Les seuls formateurs", "Les formateurs, les maîtres d'apprentissage et les apprentis", "Les seuls apprentis", "Personne"], correctIndex: 1 },
      { q: "Une discrimination est :", options: ["Une opinion", "Un traitement défavorable fondé sur un critère prohibé", "Un compliment", "Un classement"], correctIndex: 1 },
      { q: "Le CFA doit afficher :", options: ["Les sanctions disciplinaires", "Les coordonnées du Défenseur des droits / dispositifs de signalement du harcèlement", "Les notes des apprentis", "Les salaires"], correctIndex: 1 },
      { q: "Le harcèlement sexuel au travail est :", options: ["Toléré entre majeurs", "Un délit pénal", "Une plaisanterie", "Une simple incivilité"], correctIndex: 1 },
      { q: "Le référent égalité / harcèlement a pour rôle :", options: ["De juger", "D'informer, prévenir et recueillir les signalements", "De licencier", "De remplacer le directeur"], correctIndex: 1 },
      { q: "Le CFA doit lutter contre :", options: ["La répartition sexuée des métiers", "La concurrence", "Les vacances", "Les pauses"], correctIndex: 0 },
      { q: "Les écarts de rémunération à compétence égale F/H sont :", options: ["Légaux", "Interdits par la loi", "Acceptés en CDD", "Réservés aux cadres"], correctIndex: 1 },
      { q: "L'apprenti victime de harcèlement peut saisir :", options: ["Personne", "Le Défenseur des droits / Conseil de prud'hommes / référent harcèlement", "Le CFA seul", "L'URSSAF seule"], correctIndex: 1 },
      { q: "Le bilan égalité / sensibilisation est présenté :", options: ["Au conseil de perfectionnement", "À l'URSSAF", "Aux apprentis seuls", "À personne"], correctIndex: 0 },
    ],
  },
  {
    numero: 8,
    titre: "Mission 8 — Encourager la mixité des métiers et l'égalité professionnelle (actions d'information)",
    questions: [
      { q: "La mixité des métiers vise à :", options: ["Imposer 50/50 partout", "Favoriser la représentation des deux sexes dans tous les métiers", "Réserver des places aux femmes", "Exclure les hommes de certains métiers"], correctIndex: 1 },
      { q: "Un métier est dit « mixte » lorsque :", options: ["Chaque sexe représente entre 40 % et 60 % des effectifs", "Il y a au moins une femme", "Les salaires sont identiques", "Il existe depuis 50 ans"], correctIndex: 0 },
      { q: "La mission 8 impose au CFA d'organiser :", options: ["Des sanctions", "Des actions d'information à destination des apprentis sur la mixité des métiers et l'égalité pro", "Des concours", "Des fêtes seules"], correctIndex: 1 },
      { q: "Le CFA peut promouvoir la mixité des métiers par :", options: ["Des stéréotypes valorisants", "Des actions de communication, témoignages de pairs, visites d'entreprises", "L'interdiction d'inscription pour un sexe", "L'augmentation des frais"], correctIndex: 1 },
      { q: "Quel partenaire institutionnel agit pour la mixité ?", options: ["AFPA", "Délégation aux droits des femmes / Région / branche professionnelle", "URSSAF", "France Travail seul"], correctIndex: 1 },
      { q: "Les stéréotypes de genre dans l'orientation :", options: ["N'existent plus", "Constituent un frein à la mixité des métiers", "Sont sans impact", "Sont encouragés"], correctIndex: 1 },
      { q: "L'index égalité professionnelle concerne :", options: ["Les CFA de moins de 50 salariés", "Les entreprises de 50 salariés et plus", "Les apprentis", "Les fournisseurs"], correctIndex: 1 },
      { q: "Une bonne pratique pour la mixité des métiers :", options: ["Visites d'entreprises mixtes, marraines / parrains de promo", "Photos uniquement d'hommes", "Annonces genrées", "Quotas cachés"], correctIndex: 0 },
      { q: "Le CFA doit-il publier des indicateurs de mixité ?", options: ["Non", "Oui, dans son bilan pédagogique annuel", "Uniquement en interne", "Seulement à la demande"], correctIndex: 1 },
      { q: "Une action efficace de mixité est :", options: ["Le mentorat par un pair du sexe sous-représenté dans le métier", "L'augmentation des effectifs", "La réduction du programme", "L'absence de communication"], correctIndex: 0 },
    ],
  },
  {
    numero: 9,
    titre: "Mission 9 — Diversité et lutte contre toutes les formes de discriminations",
    questions: [
      { q: "La diversité au sein du CFA va au-delà :", options: ["De l'égalité F/H", "Du temps de travail", "Du diplôme", "Du règlement"], correctIndex: 0 },
      { q: "Combien de critères de discrimination sont reconnus en droit français ?", options: ["5", "Plus de 25 (origine, âge, handicap, religion, orientation, etc.)", "10", "Aucun"], correctIndex: 1 },
      { q: "Sensibiliser à l'égalité des chances signifie :", options: ["Donner les mêmes droits d'accès et de réussite à chacun, quelles que soient ses origines", "Donner plus à certains", "Sélectionner sur le diplôme", "Refuser les étrangers"], correctIndex: 0 },
      { q: "Le CFA doit mener une politique d'orientation qui :", options: ["Met en avant les avantages de la diversité", "Sélectionne sur l'apparence", "Privilégie un genre", "Refuse les profils atypiques"], correctIndex: 0 },
      { q: "La discrimination indirecte est :", options: ["Une règle apparemment neutre qui désavantage en pratique un groupe protégé", "Une insulte directe", "Un compliment", "Une promotion"], correctIndex: 0 },
      { q: "Le testing est :", options: ["Une méthode pour révéler des discriminations à l'embauche / à l'inscription", "Une évaluation pédagogique", "Un test médical", "Une note de stage"], correctIndex: 0 },
      { q: "Le Défenseur des droits peut être saisi :", options: ["Gratuitement, par toute personne s'estimant discriminée", "Uniquement par avocat", "Sur dossier payant", "Par le CFA seul"], correctIndex: 0 },
      { q: "La Charte de la Diversité est :", options: ["Un engagement volontaire des employeurs et CFA en faveur de la non-discrimination", "Une loi pénale", "Un certificat ISO", "Un diplôme"], correctIndex: 0 },
      { q: "Sanction pénale maximale pour discrimination en France :", options: ["Aucune", "3 ans d'emprisonnement et 45 000 € d'amende", "1 mois", "Avertissement"], correctIndex: 1 },
      { q: "La traçabilité des actions diversité passe par :", options: ["Aucun document", "Un plan d'actions diversité présenté au conseil de perfectionnement", "L'URSSAF", "Le bulletin de paie"], correctIndex: 1 },
    ],
  },
  {
    numero: 10,
    titre: "Mission 10 — Mobilité nationale et internationale des apprentis",
    questions: [
      { q: "La mission 10 impose au CFA de :", options: ["Interdire la mobilité", "Encourager la mobilité nationale et internationale des apprentis", "Limiter à un seul stage", "Refuser Erasmus+"], correctIndex: 1 },
      { q: "Le CFA doit nommer :", options: ["Aucun référent", "Un personnel dédié, qui peut comprendre un référent mobilité", "Un avocat", "Un comptable"], correctIndex: 1 },
      { q: "Au niveau international, le CFA mobilise :", options: ["Aucun programme", "Les programmes de l'Union européenne (Erasmus+)", "Les visas touristiques", "Les billets perso"], correctIndex: 1 },
      { q: "Durée minimale d'une mobilité courte Erasmus+ d'un apprenti :", options: ["1 jour", "10 jours", "6 mois", "1 an"], correctIndex: 1 },
      { q: "Pendant la mobilité longue (>4 semaines), le contrat français est :", options: ["Rompu", "Mis en veille (statut spécifique mobilité)", "Remplacé par un CDD", "Inchangé totalement"], correctIndex: 1 },
      { q: "L'agence française Erasmus+ s'appelle :", options: ["France Travail", "Agence Erasmus+ France / Éducation Formation", "URSSAF", "DREETS"], correctIndex: 1 },
      { q: "L'Europass Mobilité atteste :", options: ["Du diplôme", "Des compétences acquises lors de la mobilité européenne", "De l'identité", "Du salaire"], correctIndex: 1 },
      { q: "La mobilité nationale s'organise par :", options: ["Une convention de mobilité entre CFA d'origine et CFA / entreprise d'accueil", "Une décision orale", "Une demande URSSAF", "Une demande France Travail"], correctIndex: 0 },
      { q: "Pendant la mobilité, l'apprenti reste :", options: ["Inscrit dans son CFA d'origine", "Désinscrit", "Salarié de l'autre CFA", "Stagiaire"], correctIndex: 0 },
      { q: "La mention de la période de mobilité doit figurer :", options: ["Nulle part", "Dans le contenu de la formation, le cas échéant", "Sur la paie", "Sur le diplôme uniquement"], correctIndex: 1 },
    ],
  },
  {
    numero: 11,
    titre: "Mission 11 — Suivi et accompagnement des apprentis en formation à distance",
    questions: [
      { q: "La mission 11 concerne :", options: ["Tous les apprentis", "Les apprentis dont la formation est dispensée en tout ou partie à distance", "Les seuls apprentis en présentiel", "Les apprentis en mobilité"], correctIndex: 1 },
      { q: "L'article de référence pour la formation à distance est :", options: ["L.6211-2 (2°) du Code du travail", "L.1234-1", "R.1111-1", "Aucun"], correctIndex: 0 },
      { q: "Une formation à distance impose au CFA :", options: ["Aucun suivi", "Un suivi pédagogique et un accompagnement individualisé tracés", "Un simple envoi de PDF", "Une autoformation libre"], correctIndex: 1 },
      { q: "Une assistance technique doit être :", options: ["Inexistante", "Disponible et accessible (hotline, mail, FAQ)", "Payante par l'apprenti", "Réservée aux cadres"], correctIndex: 1 },
      { q: "Le LMS (Learning Management System) sert à :", options: ["Faire la paie", "Diffuser les contenus, suivre la progression et tracer les connexions", "Stocker des fichiers personnels", "Recruter"], correctIndex: 1 },
      { q: "La traçabilité des connexions doit comporter :", options: ["Date, heure, durée, modules consultés", "Aucune donnée", "Le salaire", "Les notes seules"], correctIndex: 0 },
      { q: "Une classe virtuelle doit être :", options: ["Programmée, animée par un formateur, et faire l'objet d'émargement", "Optionnelle sans suivi", "Sans formateur", "Réservée aux pauses"], correctIndex: 0 },
      { q: "L'évaluation à distance peut prendre la forme de :", options: ["QCM en ligne, devoir écrit, oral en visio", "Aucune évaluation", "Une seule évaluation finale en présentiel", "Une signature"], correctIndex: 0 },
      { q: "L'accompagnement individualisé à distance s'appuie sur :", options: ["Des points individuels réguliers (visio / téléphone)", "Aucun contact", "Le seul mail collectif", "L'OPCO"], correctIndex: 0 },
      { q: "La preuve d'assiduité à distance est :", options: ["Le relevé de connexion + travaux rendus + émargements visio", "La parole de l'apprenti", "Un seul mail", "Sans objet"], correctIndex: 0 },
    ],
  },
  {
    numero: 12,
    titre: "Mission 12 — Évaluation des compétences acquises par les apprentis (y compris contrôle continu)",
    questions: [
      { q: "La mission 12 impose au CFA :", options: ["Aucune évaluation", "D'évaluer les compétences acquises, y compris sous forme de contrôle continu", "Une seule note finale", "Une auto-évaluation libre"], correctIndex: 1 },
      { q: "Les règles d'évaluation sont définies par :", options: ["Le CFA seul", "Chaque organisme certificateur (référentiel du diplôme / titre)", "L'OPCO", "L'URSSAF"], correctIndex: 1 },
      { q: "Le contrôle continu (CCF) consiste à :", options: ["Une note unique à la fin", "Évaluer progressivement les compétences en situation de formation", "Sanctionner", "Refaire l'année"], correctIndex: 1 },
      { q: "Une grille d'évaluation doit être :", options: ["Orale", "Critériée, communiquée à l'apprenti, et tracée", "Confidentielle", "Inutile"], correctIndex: 1 },
      { q: "Le livret de suivi des compétences sert à :", options: ["Faire la paie", "Tracer la progression compétence par compétence", "Sanctionner", "Calculer les congés"], correctIndex: 1 },
      { q: "L'évaluation en milieu professionnel est réalisée par :", options: ["Le CFA seul", "Le maître d'apprentissage et/ou le tuteur, en lien avec le formateur", "L'apprenti seul", "L'OPCO"], correctIndex: 1 },
      { q: "Le PV d'examen doit comporter :", options: ["Date, jury, notes, signatures", "Le salaire", "Le RIB", "Rien"], correctIndex: 0 },
      { q: "Un apprenti peut redoubler s'il :", options: ["N'a pas validé son diplôme et le souhaite", "Le décide unilatéralement", "Manque une journée", "Est en désaccord"], correctIndex: 0 },
      { q: "Une évaluation est valide si :", options: ["Elle respecte le référentiel du certificateur et est tracée", "Le CFA décide seul", "Elle est orale et non documentée", "Aucune trace"], correctIndex: 0 },
      { q: "Les résultats d'évaluation sont restitués :", options: ["À personne", "À l'apprenti et à l'employeur (bilan régulier)", "À l'URSSAF", "Au tribunal"], correctIndex: 1 },
    ],
  },
  {
    numero: 13,
    titre: "Mission 13 — Accompagnement post-formation des apprentis (interruption ou non-obtention du diplôme)",
    questions: [
      { q: "La mission 13 vise les apprentis :", options: ["Ayant interrompu leur formation OU n'ayant pas obtenu le diplôme à l'issue", "Diplômés uniquement", "Mineurs uniquement", "En mobilité"], correctIndex: 0 },
      { q: "L'objectif de la mission 13 est :", options: ["Sanctionner", "Orienter vers les personnes/organismes pouvant définir un projet de poursuite de formation", "Rompre le contrat", "Facturer"], correctIndex: 1 },
      { q: "Les organismes ressources sont notamment :", options: ["Mission Locale, France Travail, CIO, OPCO, organismes de formation", "URSSAF seul", "Le CFA seul", "Aucun"], correctIndex: 0 },
      { q: "Un apprenti non diplômé peut bénéficier :", options: ["D'aucune aide", "D'une orientation vers une nouvelle formation, VAE, repassage", "D'une exclusion à vie", "D'une amende"], correctIndex: 1 },
      { q: "L'accompagnement post-formation doit être :", options: ["Tracé (entretien, fiche de suivi, plan d'action)", "Oral et non documenté", "Confidentiel sans suite", "Optionnel"], correctIndex: 0 },
      { q: "L'entretien post-formation porte sur :", options: ["Le projet de poursuite, les freins, les ressources mobilisables", "La paie passée", "Les vacances", "Le règlement"], correctIndex: 0 },
      { q: "La VAE (Validation des Acquis de l'Expérience) peut être proposée :", options: ["Pour valider tout ou partie d'un diplôme grâce à l'expérience", "Aux seuls cadres", "Aux mineurs uniquement", "Jamais"], correctIndex: 0 },
      { q: "Le repassage des épreuves :", options: ["Est possible selon les règles du certificateur", "Est interdit", "Est automatique", "Est payant et libre"], correctIndex: 0 },
      { q: "Le suivi post-formation s'inscrit dans :", options: ["L'IND 30 Qualiopi (insertion / suite de parcours)", "La paie", "L'URSSAF", "La fiscalité"], correctIndex: 0 },
      { q: "Le bilan post-formation est :", options: ["Présenté en conseil de perfectionnement", "Caché", "Réservé au directeur", "Détruit"], correctIndex: 0 },
    ],
  },
  {
    numero: 14,
    titre: "Mission 14 — Accompagnement des apprentis dans l'accès aux aides auxquelles ils peuvent prétendre",
    questions: [
      { q: "La mission 14 impose au CFA de :", options: ["Verser les aides", "Accompagner les apprentis dans leurs démarches d'accès aux aides légales et réglementaires", "Refuser les aides", "Sanctionner"], correctIndex: 1 },
      { q: "L'aide Mobili-Jeune est versée par :", options: ["Action Logement", "L'État seul", "L'URSSAF", "Le CFA"], correctIndex: 0 },
      { q: "L'APL (Aide Personnalisée au Logement) est gérée par :", options: ["La CAF", "L'employeur", "Le CFA", "L'OPCO"], correctIndex: 0 },
      { q: "L'aide au premier équipement professionnel est financée par :", options: ["La Région ou l'OPCO selon les cas", "L'apprenti seul", "L'URSSAF", "Personne"], correctIndex: 0 },
      { q: "La prime d'activité peut être versée :", options: ["Aux apprentis dont le revenu dépasse un certain seuil", "Aux seuls cadres", "Jamais", "Sur dossier payant"], correctIndex: 0 },
      { q: "Le CFA doit informer les apprentis :", options: ["Dès l'entrée et tout au long du parcours sur les aides mobilisables", "Une fois en fin de parcours", "Jamais", "À la rupture seulement"], correctIndex: 0 },
      { q: "Une fiche récapitulative des aides est :", options: ["Remise et expliquée à chaque apprenti", "Inutile", "Confidentielle", "Réservée à l'employeur"], correctIndex: 0 },
      { q: "L'accompagnement aux démarches comprend notamment :", options: ["L'aide à la constitution de dossiers (CAF, Action Logement, ASP)", "Le calcul de la paie", "La rédaction du contrat", "L'embauche"], correctIndex: 0 },
    ],
  },
];

/**
 * Réponses d'un apprenti au QCM d'une mission : déterministes par apprenti, différentes
 * d'un apprenti à l'autre, et cohérentes avec son profil (un apprenti RQTH connaît mieux
 * la mission 1 et les aides, un mineur a eu l'information renforcée santé-sécurité, un
 * apprenti sans entreprise a suivi l'atelier de recherche d'employeur, etc.).
 */
export function pickStudentAnswers(stagiaire: StagiaireInfo, missionNumero: number, questions: { correctIndex: number; options: string[] }[]): number[] {
  const base = `${stagiaire?.prenom || ""}|${stagiaire?.nom || ""}|${stagiaire?.dateNaissance || ""}`;
  let h = 2166136261;
  for (let i = 0; i < base.length; i++) { h ^= base.charCodeAt(i); h = Math.imul(h, 16777619); }
  const niveau = 0.66 + (((h >>> 0) % 1000) / 1000) * 0.26; // de 66 % à 92 % selon l'apprenti
  const naissance = new Date(stagiaire?.dateNaissance || "");
  const age = isNaN(naissance.getTime()) ? 30 : (Date.now() - naissance.getTime()) / (365.25 * 86400000);
  const bonus =
    (stagiaire?.rqth === "oui" && (missionNumero === 1 || missionNumero === 14) ? 0.12 : 0) +
    (age < 18 && missionNumero === 4 ? 0.1 : 0) +
    (!(stagiaire?.entreprise || "").trim() && missionNumero === 2 ? 0.1 : 0) +
    ((stagiaire?.entreprise || "").trim() && missionNumero === 3 ? 0.06 : 0);
  const taux = Math.min(0.97, niveau + bonus);
  return questions.map((q, qi) => {
    let x = (h ^ Math.imul(missionNumero * 97 + qi * 131, 2654435761)) >>> 0;
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    const rand = ((x >>> 0) % 10000) / 10000;
    if (rand < taux) return q.correctIndex;
    const wrong = q.options.map((_, i) => i).filter((i) => i !== q.correctIndex);
    return wrong[(x >>> 0) % wrong.length];
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
      org: o,
      sections: [{ heading: "Erreur", content: "<p>Données manquantes.</p>" }],
    });
  }

  // Date du QCM = dernier jour école de la semaine dédiée à la mission, dans le
  // calendrier d'alternance réel de l'apprenti (source commune avec les mails).
  const dq = dateQCMMission(f, missionNumero, stagiaire);
  const dateRef = `${dq.getFullYear()}-${String(dq.getMonth() + 1).padStart(2, "0")}-${String(dq.getDate()).padStart(2, "0")}`;

  // Si la date du QCM n'est pas encore passée (formation pas encore arrivée à cette
  // semaine d'école), on laisse la copie vierge : pas de réponse cochée, pas de score,
  // pas de signature. Conforme à la règle « formation non terminée → pas de QCM rempli ».
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const qcmDate = new Date(dateRef);
  const isFuture = qcmDate.getTime() > today.getTime();

  const answers = isFuture
    ? mission.questions.map(() => -1)
    : pickStudentAnswers(stagiaire, missionNumero, mission.questions);
  const score = isFuture
    ? 0
    : answers.reduce((acc, a, i) => acc + (a === mission.questions[i].correctIndex ? 1 : 0), 0);

  const rows = mission.questions.map((q, qi) => [
    `<strong>Q${qi + 1}.</strong> ${q.q}`,
    q.options
      .map((opt, oi) => {
        const isPicked = !isFuture && oi === answers[qi];
        const mark = isPicked ? "☒" : "☐";
        // En mode vierge (avenir) : pas de surlignage de la bonne réponse
        const isCorrect = !isFuture && oi === q.correctIndex;
        const style = isCorrect ? "color:#0a7d3a;font-weight:600;" : isPicked && !isCorrect ? "color:#c0392b;" : "";
        return `<div style="${style}">${mark} ${String.fromCharCode(65 + oi)}. ${opt}</div>`;
      })
      .join(""),
    isFuture
      ? "<span style='color:#777;'>— À compléter —</span>"
      : (answers[qi] === q.correctIndex ? "<span style='color:#0a7d3a;font-weight:600;'>✔ Correct</span>" : "<span style='color:#c0392b;'>✘ Incorrect</span>"),
  ]);

  const questionsTableHtml = `<h2>Questionnaire${isFuture ? "" : " et corrigé"}</h2>${tableHTML(["Question", `Propositions ${isFuture ? "(☐ à cocher par l'apprenti·e le jour du QCM)" : "(☒ = réponse de l'apprenti·e)"}`, "Résultat"], rows)}`;

  const resultatGlobalHtml = isFuture
    ? `<h2>Résultat global</h2><div class="section"><p style="font-size:1.05em;color:#777;"><strong>QCM à passer le ${formatDate(dateRef)}</strong> — non encore réalisé à ce jour.</p>
        <p>Score et appréciation seront renseignés à l'issue de la session.</p></div>`
    : `<h2>Résultat global</h2><div class="section"><p style="font-size:1.05em;"><strong>Score : ${score} / ${mission.questions.length}</strong> — Note : <strong>${Math.round((score / mission.questions.length) * 20)}/20</strong></p>
        <p>Appréciation : ${score >= 8 ? "Acquis — bonne maîtrise des notions de la mission." : score >= 6 ? "Partiellement acquis — quelques notions à revoir." : "À retravailler — un point pédagogique sera proposé."}</p></div>`;

  const formateurNom = (stagiaire as any).formateurAssigne || (f as any).formateur || o.dirigeant || o.nom;
  const sigApp = !isFuture && (stagiaire as any).signatureUrl ? `<img src="${(stagiaire as any).signatureUrl}" alt="signature" style="max-height:60px;margin-top:6px;">` : "";
  const sigForm = !isFuture && (o as any).signatureUrl ? `<img src="${(o as any).signatureUrl}" alt="signature" style="max-height:60px;margin-top:6px;">` : "";
  const dateCell = isFuture ? "Fait le ……………" : `Fait le <strong>${formatDate(dateRef)}</strong>`;
  const signaturesHtml = `<h2>Signatures</h2><table style="width:100%;margin-top:20px;border-collapse:collapse;"><tr>
    <td style="width:50%;padding:12px;border:1px solid #ccc;vertical-align:top;"><strong>Apprenti·e</strong><br>${stagiaire.prenom} ${stagiaire.nom}<br>${dateCell}${sigApp}<br><br></td>
    <td style="width:50%;padding:12px;border:1px solid #ccc;vertical-align:top;"><strong>Formateur·rice / Référent CFA</strong><br>${formateurNom}<br>${dateCell}${sigForm}<br><br></td>
  </tr></table>`;

  return buildDocument({
    title: `QCM — ${mission.titre}`,
    org: o,
    sections: [
      {
        heading: "Identification",
        content: `<table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 8px;"><strong>Apprenti·e</strong></td><td>${stagiaire.prenom} ${stagiaire.nom}</td></tr>
          <tr><td style="padding:4px 8px;"><strong>Formation</strong></td><td>${f.intitule || ""}</td></tr>
          <tr><td style="padding:4px 8px;"><strong>Mission évaluée</strong></td><td>${mission.titre}</td></tr>
          <tr><td style="padding:4px 8px;"><strong>Date${isFuture ? " prévue" : ""}</strong></td><td>${formatDate(dateRef)}${isFuture ? " <em>(à venir)</em>" : ""}</td></tr>
          <tr><td style="padding:4px 8px;"><strong>Durée</strong></td><td>20 minutes</td></tr>
          <tr><td style="padding:4px 8px;"><strong>Modalité</strong></td><td>QCM individuel — 1 réponse correcte par question</td></tr>
          <tr><td style="padding:4px 8px;"><strong>Statut</strong></td><td>${isFuture ? "⏳ <strong>À compléter</strong> — QCM non encore passé" : "✔ Réalisé"}</td></tr>
        </table>`,
      },
      {
        heading: "Consignes",
        content: isFuture
          ? `<p>Pour chaque question, l'apprenti·e devra cocher la <strong>seule</strong> bonne réponse à l'aide de la case ☐. Le formateur procédera ensuite à la correction.</p>`
          : `<p>Pour chaque question, cochez la <strong>seule</strong> bonne réponse. La case ☒ correspond à la réponse retenue par l'apprenti·e ; les bonnes réponses apparaissent en vert pour la correction.</p>`,
      },
    ],
    extraHtml: questionsTableHtml + resultatGlobalHtml + signaturesHtml,
  });
}

// ============================================================================
// CHAPEAU 14 MISSIONS — Procédure de communication & mise en œuvre
// ============================================================================
export function genProcedureCommunication14MissionsCFA(o: OrganismeInfo) {
  const dMaj = (o.dateMaj || new Date().toISOString()).slice(0, 10);
  const annee = new Date(dMaj).getFullYear() || new Date().getFullYear();
  return buildDocument({
    org: o,
    title: "PROCÉDURE — COMMUNICATION ET MISE EN ŒUVRE DES 14 MISSIONS DU CFA",
    sections: [
      {
        heading: "1. Objectif de la procédure",
        content: `<p>Cette procédure définit les modalités de communication et de mise en œuvre des 14 missions du CFA <strong>${o.nom}</strong> auprès des apprentis, des entreprises d'accueil et des formateurs.</p><p>Elle vise à garantir :</p><ul><li>La compréhension des droits et obligations de chaque partie</li><li>L'accompagnement effectif des apprentis tout au long du parcours</li><li>La conformité réglementaire au regard de l'article L6231-2 du Code du travail</li></ul>`,
      },
      {
        heading: "2. Organisation de la communication",
        content: `<p>Une campagne annuelle de communication est mise en place sur l'année ${annee} et s'appuie sur trois canaux complémentaires :</p><ul><li>Newsletters thématiques</li><li>Webinaires animés par l'équipe pédagogique et le référent CFA</li><li>Exercices pratiques de mise en situation</li></ul>`,
      },
      {
        heading: "3. Newsletters",
        content: `<p>Chaque mission est communiquée via une newsletter dédiée, envoyée aux apprentis, aux entreprises d'accueil et aux formateurs.</p><ul><li><strong>1 mission = 1 newsletter</strong></li><li><strong>14 newsletters sur l'année</strong></li><li>Diffusion : 1 envoi toutes les 3 à 4 semaines</li></ul>`,
      },
      {
        heading: "4. Contenu des newsletters",
        content: `<p>Chaque newsletter présente, de façon claire et opérationnelle :</p><ul><li>Présentation de la mission</li><li>Explication concrète et exemples</li><li>Droits et devoirs des apprentis et des entreprises</li><li>Aides disponibles (financières, sociales, pédagogiques)</li><li>Contacts utiles (référent handicap, mobilité, recrutement, social)</li></ul>`,
        variant: "green",
      },
      {
        heading: "5. Missions abordées (Art. L6231-2)",
        content: `<ol>${MISSIONS_QCM.map((m) => `<li>${m.titre.replace(/^Mission \d+ — /, "")}</li>`).join("")}</ol><p>Numérotation identique à celle de l'article L.6231-2 (1° à 14°) ; chaque mission dispose d'une fiche mission, d'une newsletter, d'un visuel, d'un atelier émargé et d'un QCM individuel corrigé.</p>`,
      },
      {
        heading: "6. Webinaires",
        content: `<ul><li>1 à 2 webinaires par mois</li><li>Programmation sur l'année complète</li><li>Présentation détaillée des missions</li><li>Échanges et questions / réponses avec les participants</li></ul>`,
      },
      {
        heading: "7. Exercices pratiques",
        content: `<p>Des cas pratiques sont proposés à l'issue de chaque mission afin de :</p><ul><li>Vérifier les acquis</li><li>Mettre les apprentis en situation</li><li>Évaluer la compréhension de la mission communiquée</li></ul>`,
      },
      {
        heading: "8. Accompagnement des apprentis",
        content: `<p>Le CFA <strong>${o.nom}</strong> mobilise un réseau d'aides concrètes :</p><ul><li>Aide à la recherche d'entreprise</li><li>Aides CAF</li><li>Aide au logement</li><li>Aide au transport</li><li>Épicerie solidaire</li><li>Orientation vers les Missions locales</li></ul>`,
      },
      {
        heading: "9. Handicap",
        content: `<ul><li>Référent handicap désigné : <strong>${(o as any).referentHandicap || o.poleAdministratif || o.dirigeant}</strong></li><li>Adaptation des parcours (rythme, supports, modalités d'évaluation)</li><li>Accompagnement personnalisé en lien avec l'AGEFIPH / Cap Emploi</li></ul>`,
      },
      {
        heading: "10. Suivi",
        content: `<ul><li>Suivi des newsletters envoyées et des taux d'ouverture</li><li>Participation aux webinaires</li><li>Résultats des exercices pratiques</li><li>Fiches de suivi individuelles des apprenants</li></ul>`,
      },
      {
        heading: "11. Indicateurs",
        content: `<ul><li>Taux de participation aux webinaires</li><li>Taux de lecture des newsletters</li><li>Taux de réussite aux exercices</li><li>Taux de satisfaction global</li></ul>`,
      },
      {
        heading: "12. Amélioration continue",
        content: `<p>Les résultats (tableau de bord des 14 missions) sont analysés chaque trimestre en réunion pédagogique et présentés au moins une fois par an au conseil de perfectionnement, afin d'améliorer le dispositif (contenu, fréquence, supports, accessibilité).</p>`,
        variant: "green",
      },
      {
        heading: "13. Validation",
        content: `<p><strong>Responsable :</strong> ${o.dirigeant} — Direction<br><strong>Date :</strong> ${formatDate(dMaj)}<br><strong>Version :</strong> V${o.version || "1"}</p>`,
      },
    ],
  });
}


// ============================================================================
// PLANNING DE DIFFUSION DES 14 MISSIONS CFA
// 1 mission diffusée par semaine école — cohérent avec les mails QCM hebdo
// ============================================================================
const MISSIONS_PLANNING: { num: number; titre: string; thematique: string; supports: string; canal: string }[] = [
  { num: 1,  titre: "Orientation, réorientation & Handicap",                thematique: "Accueil, projet pro, RQTH, référent handicap",       supports: "Affiche A3 Mission 1 + Livret référent handicap + QCM",                  canal: "Salle commune + ENT + Mail apprenti" },
  { num: 2,  titre: "Aide à la recherche d'un employeur",                   thematique: "CV, lettre, simulations d'entretien, suivi candidats", supports: "Affiche A3 Mission 2 + Procédure aide recherche + QCM",                   canal: "Atelier CV + ENT + Mail apprenti" },
  { num: 3,  titre: "Cohérence CFA / Entreprise",                           thematique: "Maître d'apprentissage, visites, livret",            supports: "Affiche A3 Mission 3 + Procédure coopération + QCM",                       canal: "Réunion MA + ENT + Mail apprenti" },
  { num: 4,  titre: "Droits, devoirs & Santé-Sécurité au travail",          thematique: "Code du travail, prévention, RPS",                   supports: "Affiche A3 Mission 4 + Note d'information SST + QCM",                      canal: "Affichage atelier + ENT + Mail apprenti" },
  { num: 5,  titre: "Rupture de contrat",                                   thematique: "Procédure de rupture, maintien 6 mois en formation", supports: "Affiche A3 Mission 5 + Procédure maintien 6 mois + QCM",                   canal: "Entretien individuel + ENT + Mail apprenti" },
  { num: 6,  titre: "Accompagnement social & matériel",                     thematique: "Aides régionales, transport, santé psy, logement",   supports: "Affiche A3 Mission 6 + Procédure d'accompagnement social + liste des aides de la Région du CFA + QCM",    canal: "Référent social + ENT + Mail apprenti" },
  { num: 7,  titre: "Mixité Femmes – Hommes",                               thematique: "Plan mixité, lutte contre stéréotypes",              supports: "Affiche A3 Mission 7 + Plan d'actions mixité F/H + QCM",                  canal: "Salle commune + ENT + Mail apprenti" },
  { num: 8,  titre: "Égalité professionnelle & mixité des métiers",         thematique: "Mixité dans les métiers préparés, témoignages",      supports: "Affiche A3 Mission 8 + Plan mixité des métiers + QCM",                    canal: "Forum métiers + ENT + Mail apprenti" },
  { num: 9,  titre: "Diversité & lutte contre les discriminations",         thematique: "Charte diversité, cellule d'écoute",                 supports: "Affiche A3 Mission 9 + Plan diversité + QCM",                              canal: "Affichage + ENT + Mail apprenti" },
  { num: 10, titre: "Mobilité nationale & internationale",                  thematique: "Erasmus+, mobilité inter-CFA",                       supports: "Affiche A3 Mission 10 + Convention inter-CFA + Fiche demande + QCM",       canal: "Réunion d'information + ENT + Mail apprenti" },
  { num: 11, titre: "Suivi de la formation à distance",                     thematique: "LMS, connexion, accompagnement pédagogique distant", supports: "Affiche A3 Mission 11 + Procédure suivi distance + QCM",                  canal: "Mail + LMS + ENT" },
  { num: 12, titre: "Évaluation des compétences acquises",                  thematique: "Modalités d'évaluation, livret, jurys",              supports: "Affiche A3 Mission 12 + Attestation formation MA + QCM",                  canal: "Réunion pédagogique + ENT + Mail apprenti" },
  { num: 13, titre: "Accompagnement post-formation",                        thematique: "Insertion, suivi à 6 mois, réseau alumni",           supports: "Affiche A3 Mission 13 + Procédure accompagnement post-formation + QCM",   canal: "Mail + ENT + Entretien individuel" },
  { num: 14, titre: "Accès aux aides des apprentis",                        thematique: "Logement (CAF, Action Logement), transport, 1er équipement, prime d'activité", supports: "Affiche A3 Mission 14 + Procédure accès aux aides + QCM",                  canal: "Référent social + ENT + Mail apprenti" },
];

function fmtLongFRPlanning(d: Date): string {
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export function genPlanningDiffusion14MissionsCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const dateDebut = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const lundi0 = new Date(dateDebut);
  const day = (lundi0.getDay() + 6) % 7;
  lundi0.setDate(lundi0.getDate() - day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const terminee = isFormationTerminee(f, stagiaires);
  const cycleJours = 28; // 1 sem école / 3 sem entreprise

  const rows = MISSIONS_PLANNING.map((m) => {
    const debutSem = new Date(lundi0);
    debutSem.setDate(debutSem.getDate() + (m.num - 1) * cycleJours);
    const finSem = new Date(debutSem);
    finSem.setDate(finSem.getDate() + 4);
    const isPast = debutSem.getTime() <= today.getTime();
    const statut = terminee || isPast
      ? `<span style="color:#15803d;font-weight:600;">✓ Diffusé</span>`
      : `<span style="color:#1d4ed8;font-weight:600;">◷ Programmé</span>`;
    return [
      `S${String(m.num).padStart(2, "0")}`,
      `Du ${fmtLongFRPlanning(debutSem)}<br>au ${fmtLongFRPlanning(finSem)}`,
      `<strong>Mission ${m.num}</strong><br>${m.titre}`,
      m.thematique,
      m.supports,
      m.canal,
      "Référent CFA / Équipe pédagogique",
      statut,
    ];
  });

  const intro = `
    <p>Le présent planning formalise la <strong>diffusion hebdomadaire des 14 missions du CFA</strong> (Art. <strong>L.6231-2 du Code du Travail</strong>) auprès des apprentis, des maîtres d'apprentissage et de l'équipe pédagogique de <strong>${o.nom}</strong>.</p>
    <p>Chaque mission est diffusée durant une <strong>semaine école dédiée</strong>, selon le rythme d'alternance de la formation <strong>${f.intitule || ""}</strong>. La diffusion s'appuie sur trois canaux complémentaires : <em>affichage physique</em> (visuels A3 en salle commune et en atelier), <em>environnement numérique de travail</em> (ENT / LMS) et <em>communication directe</em> (mail hebdomadaire + QCM de la semaine).</p>
  `;

  const suivi = `
    <p>Le suivi de diffusion est tracé via :</p>
    <ul>
      <li>les <strong>mails hebdomadaires</strong> d'envoi du QCM mission (1 mail = 1 mission, archivés dans la section MAIL du dossier Qualiopi) ;</li>
      <li>les <strong>QCM mission</strong> retournés par les apprentis (10 questions, durée ≈ 15 min) ;</li>
      <li>les <strong>visuels A3</strong> affichés en présentiel et photographiés pour preuves (dossier <em>VISUELS_14_MISSIONS</em>) ;</li>
      <li>les <strong>fiches de présence</strong> aux temps d'information collectifs (forum métiers, réunions MA, atelier CV…).</li>
    </ul>
    <p>Un bilan annuel de la diffusion est présenté lors du <strong>Conseil de Perfectionnement</strong> (Mission 14 — Art. R.6233-1).</p>
  `;

  return buildDocument({
    org: o,
    title: "PLANNING DE DIFFUSION DES 14 MISSIONS DU CFA",
    subtitle: `Formation : ${f.intitule || ""} — Rythme : 1 mission diffusée par semaine école`,
    sections: [
      { heading: "Cadre réglementaire et objectifs", content: intro },
      {
        heading: "Calendrier de diffusion des 14 missions",
        content: tableHTML(
          ["Semaine", "Période de diffusion", "Mission", "Thématique", "Supports diffusés", "Canal", "Responsable", "Statut"],
          rows
        ),
      },
      { heading: "Modalités de suivi et preuves", content: suivi, variant: "green" },
      {
        heading: "Validation",
        content: `<p><strong>Responsable :</strong> ${o.dirigeant || "Direction"} — Direction<br><strong>Établissement :</strong> ${o.nom} — SIRET ${o.siret || ""} — NDA ${o.nda || ""}<br><strong>Version :</strong> V1</p>`,
      },
    ],
  });
}


// ============================================================================
// SITE WEB — Page « Les 14 missions du CFA »
// Version simple basée sur buildDocument : nom de l'organisme automatique
// et pagination correcte à l'export PDF.
// Texte officiel : Art. L.6231-2 du Code du travail (source DREETS Normandie).
// ============================================================================
export function genSiteWeb14MissionsCFA(o: OrganismeInfo) {
  const nom = o.nom || "Centre de Formation d'Apprentis";
  const missions: { n: number; titre: string; texte: string }[] = [
    { n: 1, titre: "Orientation et accompagnement (y compris handicap)",
      texte: `Accompagner les personnes, y compris celles en situation de handicap, souhaitant s'orienter ou se réorienter par la voie de l'apprentissage, en développant leurs connaissances et leurs compétences et en facilitant leur intégration en emploi, en cohérence avec leur projet professionnel.` },
    { n: 2, titre: "Aide à la recherche d'un employeur",
      texte: `Appui et accompagnement des « postulants à l'apprentissage » dans leur recherche d'un employeur.` },
    { n: 3, titre: "Cohérence formation CFA / entreprise",
      texte: `Assurer la cohérence entre la formation dispensée en leur sein et celle dispensée au sein de l'entreprise, en particulier en organisant la coopération entre les formateurs et les maîtres d'apprentissage.` },
    { n: 4, titre: "Information droits, devoirs, santé et sécurité au travail",
      texte: `Informer, dès le début de leur formation, les apprentis de leurs droits et devoirs en tant qu'apprentis et en tant que salariés et des règles applicables en matière de santé et de sécurité en milieu professionnel.` },
    { n: 5, titre: "Apprentis en rupture de contrat",
      texte: `Concernant les apprentis en rupture de contrat. L'objectif est de permettre « la poursuite de leur formation pendant six mois tout en les accompagnant dans la recherche d'un nouvel employeur, en lien avec le service public de l'emploi », sachant qu'ils sont « affiliés à un régime de sécurité sociale » et peuvent bénéficier d'une rémunération comme stagiaires de la formation professionnelle.` },
    { n: 6, titre: "Accompagnement social et matériel",
      texte: `Apporter, en lien avec le service public de l'emploi, en particulier avec les missions locales, un accompagnement aux apprentis pour prévenir ou résoudre les difficultés d'ordre social et matériel susceptibles de mettre en péril le déroulement du contrat d'apprentissage.` },
    { n: 7, titre: "Mixité et égalité Femmes – Hommes",
      texte: `Favoriser la mixité au sein de leurs structures en sensibilisant les formateurs, les maîtres d'apprentissage et les apprentis à la question de l'égalité entre les femmes et les hommes, ainsi qu'à la prévention du harcèlement sexuel au travail, et en menant une politique d'orientation et de promotion des formations qui met en avant les avantages de la mixité. Les CFA « participent à la lutte contre la répartition sexuée des métiers ».` },
    { n: 8, titre: "Mixité des métiers et égalité professionnelle",
      texte: `Encourager la mixité des métiers et l'égalité professionnelle entre les femmes et les hommes en organisant des actions d'information sur ces sujets à destination des apprentis.` },
    { n: 9, titre: "Diversité et lutte contre les discriminations",
      texte: `Favoriser, au-delà de l'égalité entre les femmes et les hommes, la diversité au sein de leurs structures en sensibilisant les formateurs, les maîtres d'apprentissage et les apprentis à l'égalité des chances et à la lutte contre toutes formes de discriminations et en menant une politique d'orientation et de promotion des formations qui met en avant les avantages de la diversité.` },
    { n: 10, titre: "Mobilité nationale et internationale",
      texte: `Encourager la mobilité nationale et internationale des apprentis en nommant un personnel dédié, qui peut comprendre un référent mobilité mobilisant, au niveau national, les ressources locales et, au niveau international, les programmes de l'Union européenne, et en mentionnant, le cas échéant, dans le contenu de la formation, la période de mobilité.` },
    { n: 11, titre: "Suivi et accompagnement de la formation à distance",
      texte: `Assurer le suivi et l'accompagnement des apprentis quand la formation prévue est dispensée en tout ou partie à distance.` },
    { n: 12, titre: "Évaluation des compétences acquises",
      texte: `Mission d'évaluation « des compétences acquises par les apprentis, y compris sous la forme d'un contrôle continu, dans le respect des règles définies par chaque organisme certificateur ».` },
    { n: 13, titre: "Accompagnement vers la poursuite de formation",
      texte: `Accompagner les apprentis ayant interrompu leur formation et ceux n'ayant pas, à l'issue de leur formation, obtenu de diplôme ou de titre à finalité professionnelle vers les personnes et les organismes susceptibles de les accompagner dans la définition d'un projet de poursuite de formation.` },
    { n: 14, titre: "Accès aux aides des apprentis",
      texte: `Accompagnement des apprentis « dans leurs démarches pour accéder aux aides auxquelles ils peuvent prétendre au regard de la législation et de la réglementation en vigueur ».` },
  ];

  const sections = missions.map(m => ({
    heading: `Mission ${m.n.toString().padStart(2, "0")} — ${m.titre}`,
    content: `<p>${m.texte}</p>`,
  }));

  sections.unshift({
    heading: "Présentation",
    content: `<p>Le centre de formation d'apprentis <strong>${nom}</strong> s'engage à accomplir l'ensemble des <strong>14 missions</strong> prévues par l'<strong>article L.6231-2 du Code du travail</strong>, au service de la réussite et de l'insertion professionnelle de ses apprentis.</p>`,
  });




  return buildDocument({
    org: o,
    title: "LES 14 MISSIONS DU CFA",
    sections,
  });
}



// ============================================================================
// SITE WEB — Page « Atelier CV »
// Version simple basée sur buildDocument : nom de l'organisme automatique.
// ============================================================================
export function genSiteWebAtelierCVCFA(o: OrganismeInfo) {
  const nom = o.nom || "notre CFA";
  return buildDocument({
    org: o,
    title: "ATELIER CV — APPRENTIS",
    sections: [
      {
        heading: "Pourquoi cet atelier ?",
        content: `<p>Un bon CV est votre première porte d'entrée vers l'entreprise. <strong>${nom}</strong> vous accompagne pour construire un CV percutant, adapté à votre projet d'apprentissage et aux attentes des recruteurs.</p>`,
      },
      {
        heading: "Objectifs",
        content: `<ul><li>Identifier vos compétences, expériences et qualités à valoriser</li><li>Structurer un CV clair, lisible et professionnel (1 page)</li><li>Adapter votre CV à chaque offre / chaque secteur d'activité</li><li>Éviter les erreurs classiques (fautes, photo inadaptée, surcharge)</li><li>Repartir avec un CV finalisé, prêt à être diffusé</li></ul>`,
      },
      {
        heading: "Programme — 3 heures",
        content: `<ul><li><strong>Séquence 1 — Mes atouts (45 min) :</strong> bilan personnel, parcours, compétences, savoir-être, centres d'intérêt.</li><li><strong>Séquence 2 — Structurer le CV (45 min) :</strong> état civil, accroche, expériences, formation, compétences, langues, hobbies.</li><li><strong>Séquence 3 — Mise en page (45 min) :</strong> modèles modernes, couleurs, typographie, photo, export PDF (Canva, Word, LinkedIn).</li><li><strong>Séquence 4 — Relecture & feedback (45 min) :</strong> relecture croisée, retour individuel du formateur, plan d'envoi.</li></ul>`,
      },
      {
        heading: "Les 10 règles d'or du CV",
        content: `<ol><li>Une seule page, aérée et lisible</li><li>Une accroche claire en haut (« Apprenti(e) en … recherche entreprise »)</li><li>Coordonnées professionnelles (email sérieux, téléphone joignable)</li><li>Photo sobre et professionnelle (facultative)</li><li>Expériences classées de la plus récente à la plus ancienne</li><li>Verbes d'action + résultats concrets (chiffres, livrables)</li><li>Mots-clés du métier visé / de l'offre</li><li>Aucune faute d'orthographe (faire relire)</li><li>Format PDF nommé : <em>CV_Nom_Prenom.pdf</em></li><li>Mise à jour à chaque nouvelle expérience</li></ol>`,
      },
      {
        heading: "Pour qui ?",
        content: `<p>Tous les apprentis et candidats à l'apprentissage de <strong>${nom}</strong>, quel que soit le niveau ou la filière.</p>`,
      },
      {
        heading: "Modalités pratiques",
        content: `<ul><li><strong>Durée :</strong> 3 heures</li><li><strong>Format :</strong> en présentiel au CFA ou en visio</li><li><strong>Tarif :</strong> gratuit pour les apprentis et candidats inscrits</li><li><strong>Inscription :</strong> auprès du référent recrutement de ${nom}</li></ul>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// SITE WEB — Page « Atelier préparation entretien »
// ============================================================================
export function genSiteWebAtelierEntretienCFA(o: OrganismeInfo) {
  const nom = o.nom || "notre CFA";
  return buildDocument({
    org: o,
    title: "ATELIER PRÉPARATION ENTRETIEN — APPRENTIS",
    sections: [
      {
        heading: "Pourquoi cet atelier ?",
        content: `<p>L'entretien de recrutement est l'étape décisive de votre recherche d'apprentissage. <strong>${nom}</strong> vous prépare à vous présenter, argumenter et convaincre votre futur employeur.</p>`,
      },
      {
        heading: "Objectifs",
        content: `<ul><li>Préparer un pitch personnel clair (présentation 1 à 2 minutes)</li><li>Anticiper les questions classiques et les questions pièges</li><li>Travailler la posture, la voix et le langage non verbal</li><li>Gérer le stress et les silences</li><li>Conclure l'entretien et faire un suivi (mail de remerciement)</li></ul>`,
      },
      {
        heading: "Programme — 3 heures",
        content: `<ul><li><strong>Séquence 1 — Se présenter (45 min) :</strong> construire son pitch (règle des 3 P : Présentation / Parcours / Projet).</li><li><strong>Séquence 2 — Questions types (45 min) :</strong> les 20 questions les plus posées (motivation, qualités/défauts, prétentions, disponibilité, projet à 3 ans).</li><li><strong>Séquence 3 — Simulations (45 min) :</strong> mises en situation filmées, jeu de rôle recruteur / candidat, débriefing.</li><li><strong>Séquence 4 — Posture & suivi (45 min) :</strong> langage non verbal, tenue, gestion du stress, mail de remerciement.</li></ul>`,
      },
      {
        heading: "Les 10 réflexes gagnants",
        content: `<ol><li>Se renseigner sur l'entreprise (site web, actu, produits, valeurs)</li><li>Préparer son pitch et l'avoir répété à voix haute</li><li>Arriver 10 minutes en avance</li><li>Tenue soignée et adaptée au secteur</li><li>Téléphone éteint, regard franc, poignée de main ferme</li><li>Sourire et écouter avant de répondre</li><li>Donner des exemples concrets (situations vécues, résultats)</li><li>Préparer 2 ou 3 questions à poser au recruteur</li><li>Remercier en fin d'entretien et demander les prochaines étapes</li><li>Envoyer un mail de remerciement dans les 24 h</li></ol>`,
      },
      {
        heading: "Pour qui ?",
        content: `<p>Tous les apprentis et candidats à l'apprentissage de <strong>${nom}</strong>, en recherche active d'entreprise.</p>`,
      },
      {
        heading: "Modalités pratiques",
        content: `<ul><li><strong>Durée :</strong> 3 heures (simulations filmées)</li><li><strong>Format :</strong> en présentiel au CFA, groupes de 6 à 10 personnes</li><li><strong>Tarif :</strong> gratuit pour les apprentis et candidats inscrits</li><li><strong>Inscription :</strong> auprès du référent recrutement de ${nom}</li></ul>`,
        variant: "green",
      },
    ],
  });
}

// ============================================================================
// MISSION 1 — Livret d'accueil des apprenants en situation de handicap
// (orientation / réorientation) — sans signatures ni dates
// ============================================================================
export function genLivretReferentHandicapCFA(o: OrganismeInfo) {
  const nom = o.nom || "notre CFA";
  return buildDocument({
    org: o,
    title: "LIVRET D'ACCUEIL DES APPRENANTS EN SITUATION DE HANDICAP",
    sections: [
      {
        heading: "Introduction",
        content: `<p>Le CFA <strong>${nom}</strong> s'inscrit dans une politique d'égalité des chances afin de permettre à tous les apprenants d'accéder à ses formations et de développer leur potentiel. Tous les apprenants en situation de handicap sont accompagnés tout au long de leur formation.</p>
<p>Le CFA <strong>${nom}</strong> s'engage ainsi, pour tout étudiant présentant une situation de handicap à :</p>
<ul>
  <li>Prendre en compte ses besoins ;</li>
  <li>Étudier des aménagements spécifiques pour son accompagnement tout au long de sa formation ;</li>
  <li>Faire le lien entre les différents services de l'école ;</li>
  <li>L'accompagner dans ses démarches.</li>
</ul>
<p>Le CFA <strong>${nom}</strong> se donne pour mission de déployer les moyens humains, matériels et techniques dont il dispose pour favoriser l'accueil, l'accompagnement et l'insertion professionnelle des apprenants en situation de handicap. Toutefois, la réussite de l'apprenant reste de sa responsabilité.</p>
<p>Vous retrouverez dans ce livret les informations essentielles sur l'accessibilité de nos formations, le dispositif d'accompagnement déployé pour les apprenants en situation de handicap, ainsi que les aménagements mis en place.</p>`,
      },
      {
        heading: "1. Qu'est-ce que le handicap ?",
        content: `<p>Est considéré comme un handicap :</p>
<ul>
  <li>Toute limitation d'activité ou restriction de participation à la vie en société subie dans son environnement par une personne en raison d'une altération substantielle, durable ou définitive d'une ou plusieurs fonctions physiques, sensorielles, mentales, cognitives ou psychiques, d'un polyhandicap ou d'un trouble de santé invalidant ;</li>
  <li>L'incapacité d'une personne à vivre et à agir dans son environnement en raison de déficiences physiques, mentales ou sensorielles, se traduisant par des difficultés de déplacement, d'expression ou de compréhension.</li>
</ul>
<p>Afin de bénéficier du dispositif d'accompagnement et des aménagements spécifiques, l'apprenant est invité à se munir d'un document officiel attestant de sa situation de handicap, ou à engager les démarches nécessaires à sa reconnaissance.</p>
<p><strong>Reconnaissances officielles :</strong></p>
<ul>
  <li><strong>RQTH</strong> (MDPH) — Reconnaissance de la Qualité de Travailleur Handicapé : ouvre droit à des aides spécifiques et à un tiers temps.</li>
  <li><strong>PPS</strong> (MDPH) — Projet Personnalisé de Scolarisation : aménagements spécifiques de la scolarité.</li>
  <li><strong>AAH</strong> (CDAPH) — Allocation aux Adultes Handicapés : aide financière minimum de ressources.</li>
  <li><strong>AEEH</strong> (CDAPH) — Allocation d'Éducation de l'Enfant Handicapé (&lt; 20 ans).</li>
  <li><strong>ALD</strong> (Sécurité sociale, attestation AMELI) — Affection de Longue Durée (maladies chroniques).</li>
</ul>`,
      },
      {
        heading: "2. Qui m'accompagne ?",
        content: `<p>L'apprenant dispose au sein du CFA <strong>${nom}</strong> d'un <strong>Référent Handicap${o.referentHandicap ? ` : ${o.referentHandicap}` : ""}</strong>, placé sous la responsabilité de la Direction.</p>
<p>Sa mission est de veiller à la prise en compte de l'accueil des apprenants en situation de handicap par l'ensemble des acteurs de l'établissement : équipe administrative, équipe pédagogique, accompagnateurs. Il veille à un accompagnement équitable.</p>
<p>Il est l'interlocuteur privilégié de l'apprenant, de sa famille et des équipes pédagogiques pour la prise en compte de la situation de handicap à l'école et en entreprise.</p>`,
      },
      {
        heading: "3. Comment se déroule ma formation ?",
        content: `<p><strong>Un accompagnement en 3 étapes.</strong></p>
<p><strong>• Quand parler de mon handicap ?</strong><br>
À tout instant, dès la candidature. Il suffit de l'indiquer dans l'espace prévu sur le dossier de candidature ou d'inscription. Le Responsable des admissions en informe le Référent handicap. L'apprenant peut également écrire directement au Référent handicap par mail.</p>
<p><strong>• Mise en place des aménagements</strong><br>
Lors de l'entretien avec le Référent handicap, les aménagements nécessaires sont déterminés conjointement, en fonction de la situation. L'attestation de reconnaissance du handicap sera demandée pour formaliser ces aménagements.</p>
<p><strong>• Suivi de la formation</strong><br>
Tout au long de la formation, le Référent handicap reste à l'écoute, en lien avec la direction et les intervenants. Il peut, sur demande, orienter l'apprenant vers d'autres structures d'accompagnement partenaires. Le Référent handicap s'engage à respecter la confidentialité des échanges et ne transmet aucune information sans l'accord de l'apprenant.</p>`,
      },
      {
        heading: "4. Les outils mis à ma disposition",
        content: `<p>Un espace numérique dédié est mis à disposition de chaque apprenant inscrit au CFA <strong>${nom}</strong>, accessible depuis un ordinateur, une tablette ou un smartphone avec connexion internet. Il centralise :</p>
<ul>
  <li>Une boîte mail</li>
  <li>Tous les documents annuels</li>
  <li>Le planning des cours</li>
  <li>Les supports de cours</li>
  <li>Les relevés de notes</li>
  <li>Les actualités de l'école</li>
</ul>`,
      },
      {
        heading: "5. Apprentissage et handicap",
        content: `<p>Pour tout apprenant en situation de handicap inscrit en apprentissage, le CFA <strong>${nom}</strong> met en place un accompagnement spécifique tout au long de la formation :</p>
<ul>
  <li><strong>Information</strong> sur les métiers, formations proposées, offres de contrats et préparation à l'apprentissage ;</li>
  <li><strong>Échanges avec l'employeur</strong> et les partenaires impliqués tout au long du parcours ;</li>
  <li><strong>Parcours de formation adapté et contractualisé</strong> en fonction de la situation individuelle ;</li>
  <li><strong>Suivi du parcours et ajustements</strong> en fonction de l'évolution des besoins, en concertation avec l'employeur et les partenaires ;</li>
  <li><strong>Information sur la suite du parcours</strong> : France Travail, Cap emploi, Missions Locales, réseau formation, techniques de recherche d'emploi ;</li>
  <li><strong>Bilan de fin de formation</strong> (aménagements mis en place, pistes envisagées) communiqué avant la sortie du CFA.</li>
</ul>`,
      },
      {
        heading: "6. Partenariats",
        content: `<p>Le CFA <strong>${nom}</strong> met en place des partenariats afin d'accompagner l'apprenant en situation de handicap dans sa démarche de recherche d'alternance et d'insertion professionnelle : <strong>AGEFIPH, Cap emploi, MDPH, Mission Locale, Resp'Handicap, RHF</strong> et missions handicap des OPCO.</p>`,
      },
      {
        heading: "7. Contacts utiles",
        content: `<ul>
  <li><strong>Référent Handicap :</strong> ${o.referentHandicap || "—"}</li>
  <li><strong>Direction pédagogique :</strong> ${o.dirigeant || "—"}</li>
  <li><strong>Email :</strong> ${o.email || "—"}</li>
  ${o.telephone ? `<li><strong>Téléphone :</strong> ${o.telephone}</li>` : ""}
  ${o.adresse ? `<li><strong>Adresse :</strong> ${o.adresse}</li>` : ""}
  ${o.siteWeb ? `<li><strong>Site web :</strong> ${o.siteWeb}</li>` : ""}
</ul>`,
        variant: "green",
      },
    ],
  });
}


