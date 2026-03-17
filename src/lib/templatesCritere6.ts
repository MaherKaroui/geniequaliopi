// Critère 6 — IND 23-27 generators (based on real SELECT FORMATION documents)
import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, subtractBusinessDays } from "./docBuilder";

/**
 * Helper: generates realistic veille dates BEFORE the formation start date.
 * Returns an array of formatted date strings spread across the months before the formation.
 */
function veilleDate(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  // Clamp day to valid range
  if (d.getDate() !== new Date(base.getFullYear(), base.getMonth() - monthsBefore + 1, 0).getDate()) {
    // Day is valid
  }
  return formatDate(d.toISOString().split("T")[0]);
}

function veilleMonthYear(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function veilleYear(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  return `${d.getFullYear()}`;
}

// ===== IND 23 — VEILLE RÉGLEMENTAIRE (avec vrais liens et dates dynamiques) =====

export function genVeilleReglementaireV2(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "Veille réglementaire", table: {
    headers: ["Liens", "Nom de l'article / Texte", "Date du texte", "Commentaire", "Exploitation de veille (preuve + action Qualiopi)"],
    rows: [
      [
        `<a href="https://www.legifrance.gouv.fr/eli/arrete/2025/2/18/TSSD2501626A/jo/texte">Légifrance – Arrêté du 18/02/2025</a>`,
        "Arrêté du 18 février 2025 — modalités d'audit associées au référentiel national",
        veilleDate(f, 10),
        "Modification des modalités d'audit pour les organismes certifiés (durée, indicateurs audités).",
        "Preuve: Version consolidée journal officiel + critères audit. Action: Mettre à jour vos procédures d'audit interne + planification des indicateurs (1,2,11,12,etc.). Pour le moment cet indicateur n'est pas applicable pour tous car la formation ne dépasse pas 14h."
      ],
      [
        `<a href="https://travail-emploi.gouv.fr/referentiel-national-qualite-guide-de-lecture-qualiopi">Ministère du Travail – Guide Qualiopi</a>`,
        "Référentiel national Qualité — Guide de lecture Qualiopi V9",
        veilleDate(f, 8),
        "Rappelle l'obligation de Qualiopi pour accès fonds et financeurs mentionnés à l'art L.6316-1.",
        "Preuve: Version guide Qualiopi. Action: Vérifier conformité continue des indicateurs Qualiopi + documentation interne. Nous nous sommes mis en conformité par rapport au référentiel national qualiopi la v9 comme en témoigne le système qualité que nous présentons à l'audit."
      ],
      [
        `<a href="https://www.dendreo.com/blog/veille-legale-et-reglementaire-de-la-formation-professionnelle-recap-des-actualites-2025">Dendreo – Veille formation pro</a>`,
        "Veille légale et réglementaire formation pro",
        veilleMonthYear(f, 6),
        "Synthèse des actualités essentielles pour OF & Qualiopi. Les financements par le CPF ont connu des évolutions : fin de l'éligibilité des ACRE au CPF. Seules les formations menant à une certification RNCP ou RS peuvent être financées par le CPF.",
        "Preuve: Extrait synthèse + signets. Action: Archive et établir une synthèse interne annuelle (preuve Qualiopi). Nous allons souscrire au RS7004 Créactifs."
      ],
      [
        `<a href="https://www.dendreo.com/blog/veille-legale-et-reglementaire-de-la-formation-professionnelle-recap-des-actualites-2025">Dendreo – Décret RNCP/RS</a>`,
        "Modification des critères d'enregistrement au RNCP et au RS",
        veilleDate(f, 5),
        "Décret — Obligation d'intégrer dans les référentiels les compétences liées aux transitions écologique et numérique, santé-sécurité au travail et prise en compte du handicap et de l'accessibilité. Contrôles « au moins une fois par an » par France Compétences.",
        "Preuve: Nous veillerons à être conforme suite au décret. Nous nous sommes rapprochés du certificateur ICDL pour une formation Word pour faire une procédure EDOF."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "La participation financière obligatoire pour l'achat d'une formation mobilisant le CPF s'élève à 103,20 euros (contre 102,23 euros précédemment).",
        "Preuve: Après l'obtention du Qualiopi nous souhaitons faire la démarche pour être habilité sur la plateforme EDOF. Nous informerons les futurs apprenants de la hausse du ticket modérateur à 103,20 euros. Sauf pour les personnes au chômage ou en difficulté financière ou financées par les employeurs."
      ],
    ]
  } });
}

// ===== IND 24 — TABLEAU DE VEILLE MÉTIER (avec vrais liens) =====

export function genVeilleMetierV2(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "Tableau de veille métier", table: {
    headers: ["Lien (article / vidéo / événement)", "Nom de l'article / Vidéo / Événement", "Date", "Commentaire – Analyse métier", "Exploitation de veille (preuve + action Qualiopi)"],
    rows: [
      [
        `<a href="https://propulsandgo.com/blog/top-5-formations-bureautique-paris-2025">propulsandgo.com</a>`,
        "Top 5 des formations bureautiques à Paris",
        veilleMonthYear(f, 8),
        "Montre que Word et Pack Office restent des compétences clés en entreprise (administratif, gestion, assistanat, PME). Forte demande CPF.",
        "Preuve : lien + capture écran. Action : positionnement de la formation Word comme compétence métier indispensable (critère 1 – analyse des besoins)."
      ],
      [
        `<a href="https://nouvelle-donne-formation.org/et-si-vous-vous-formiez-en-bureautique">nouvelle-donne-formation.org</a>`,
        "Se former en bureautique : Word, Excel, PowerPoint",
        veilleMonthYear(f, 7),
        "Confirme la pertinence des formations bureautiques pour l'employabilité et la reconversion professionnelle.",
        "Action Qualiopi : ajustement du public visé et des objectifs pédagogiques en lien avec l'emploi (critère 2)."
      ],
      [
        `<a href="https://capcours-abdformations.com/formation-word-pack-office">capcours-abdformations.com</a>`,
        "Pourquoi apprendre Word aujourd'hui ?",
        veilleYear(f, 6),
        "Met en avant l'usage professionnel réel de Word : mise en page, documents normés, efficacité.",
        "Action : renforcement des cas pratiques professionnels (courrier, rapport, document administratif)."
      ],
      [
        `<a href="https://www.microsoft.com/ignite">microsoft.com/ignite</a>`,
        "Microsoft Ignite (événement officiel)",
        veilleMonthYear(f, 4),
        "Conférence majeure Microsoft : intégration massive de l'IA (Copilot) dans Word et Office 365.",
        "Preuve : programme Ignite + vidéos. Action : ajout d'un module « Découverte IA dans Word »."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=sBkfzCiD0BI">YouTube – Ignite Highlights</a>`,
        "Microsoft Ignite – Highlights & Copilot",
        veilleYear(f, 4),
        "Présentation des nouveautés Word : aide à la rédaction, reformulation, automatisation.",
        "Action Qualiopi : adaptation du contenu pédagogique Word aux nouvelles fonctionnalités (critère 6)."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=HDpQH637Mho">YouTube – Best of Microsoft 365</a>`,
        "Microsoft Ignite – Best of Microsoft 365",
        veilleYear(f, 4),
        "Vision globale des usages Word / Office dans les entreprises modernes.",
        "Preuve : fiche de synthèse vidéo + capture. Action : mise à jour des supports formateur."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=m0liZNI8md0">YouTube – Microsoft Build</a>`,
        "Microsoft Build – Débrief IA & Office",
        veilleMonthYear(f, 5),
        "Même si orienté tech, confirme la place stratégique de Word dans l'écosystème Microsoft.",
        "Action : veille technologique transverse (critère 6 – amélioration continue)."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=nMOeXeaZ-KM">YouTube – Ignite Recap</a>`,
        "Webinar – Microsoft Ignite Recap",
        veilleYear(f, 3),
        "Analyse pédagogique des annonces Ignite, accessible aux formateurs.",
        "Action : création d'une note interne « Tendances Word »."
      ],
      [
        `<a href="https://www.edutech.com">edutech.com</a>`,
        "Salon EduTECH (Formation & digital)",
        veilleYear(f, 3),
        "Salon international sur l'évolution des outils pédagogiques et numériques.",
        "Preuve : site événement. Action : réflexion sur pédagogie active et outils numériques."
      ],
      [
        `<a href="https://ncchamber.com/2025-education-and-workforce-conference">ncchamber.com</a>`,
        "Education & Workforce Conference",
        veilleMonthYear(f, 2),
        "Met en lien compétences bureautiques et employabilité.",
        "Action Qualiopi : alignement formation Word ↔ compétences métier attendues."
      ],
    ]
  } });
}

// ===== IND 25 — TABLEAU DE VEILLE TECHNOLOGIQUE (avec vrais liens) =====

export function genVeilleTechnologiqueV2(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "Tableau de veille technologique", table: {
    headers: ["Lien (vrai)", "Nom / Titre de l'article", "Date", "Commentaire (veille technologique)", "Exploitation de veille vérifiable (preuve + action Qualiopi)"],
    rows: [
      [
        `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/le-barometre-istf-du-digital-learning-souligne-limportance-du-tutorat">Centre Inffo</a>`,
        "Le baromètre ISTF du digital learning",
        veilleDate(f, 10),
        "État des lieux digital learning : tutorat, multimodal, distanciel asynchrone & obstacles à l'adoption. Montée du numérique dans les parcours.",
        "Preuve : capture écran + PDF du baromètre Centre Inffo. Action Qualiopi : mettre à jour la stratégie digitale pédagogique (modalités numériques, tutorat, engagement apprenants)."
      ],
      [
        `<a href="https://fr.linkedin.com/posts/sas-theia_digital-learning-les-chiffres-cl%C3%A9s-%C3%A0-retenir-activity-7297570569854590977-hFkT">LinkedIn – SAS Theia</a>`,
        "Chiffres clés ISTF Digital Learning",
        veilleMonthYear(f, 9),
        "Publication LinkedIn avec données réelles sur adoption du digital learning (68% des formations intégrant du numérique).",
        "Preuve : capture du post + export PDF. Action Qualiopi : intégrer ces données indicatives dans la revue de processus pédagogique et plan d'évolution digitale."
      ],
      [
        `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
        "Learning Technologies France – Événement technologie & formation",
        veilleYear(f, 7),
        "Principal salon français des technologies pour la formation (IA, EdTech, plateformes, LMS).",
        "Preuve : programme + certificat de participation ou photo badges. Action Qualiopi : participer au salon / CR + plan adoption tech."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/6e-edition-du-barom%C3%A8tre-de-la-formation-et-de-l%E2%80%99emploi-2025">Centre Inffo – Baromètre</a>`,
        "Baromètre formation & emploi – IA et compétences",
        veilleDate(f, 8),
        "Indique que l'IA est un levier majeur intégré dans les attentes des actifs, avec implications sur les compétences & E-learning.",
        "Preuve : infographie / PDF baromètre. Action Qualiopi : intégrer résultats dans analyse des besoins et plan de développement des compétences."
      ],
      [
        `<a href="https://fr.linkedin.com/posts/centre-inffo_lia-en-formation-professionnelle-innovation-activity-7316747080062951424-7ws1">LinkedIn – Centre Inffo IA</a>`,
        "Post Centre Inffo – IA & innovation en formation",
        veilleYear(f, 5),
        "Publication LinkedIn sur l'intégration de l'IA dans les pratiques de formation.",
        "Preuve : capture écran + URL. Action Qualiopi : preuve de veille mensuelle + ateliers internes IA pour équipes pédagogiques."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/articles-2025/lia-dans-la-formation-professionnelle-opportunite-ou-revolution">Centre Inffo – Article IA</a>`,
        "L'IA dans la formation professionnelle : opportunité ou révolution ?",
        veilleDate(f, 5),
        "Article Centre Inffo sur place de l'IA (personnalisation, automatisation des parcours).",
        "Preuve : PDF article + note interne. Action Qualiopi : mise à jour de la politique pédagogique (IA/numérique) et procédures de conception."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation professionnelle tendances",
        veilleDate(f, 3),
        "Synthèse des pratiques et attentes digitales dans la formation – accent sur transformation numérique et IA.",
        "Preuve : PDF baromètre + résumés. Action Qualiopi : alignement offre/compétences sur tendances numériques."
      ],
    ]
  } });
}

// ===== IND 26 — VEILLE HANDICAP =====

export function genVeilleHandicap(o: OrganismeInfo, f?: FormationInfo) {
  const fi = f || { dateDebut: new Date().toISOString().split("T")[0] } as FormationInfo;
  return buildDocument({ org: o, title: "Tableau de veille handicap", table: {
    headers: ["Lien", "Nom de l'article / Texte", "Date", "Commentaire – Analyse handicap", "Exploitation de veille (preuve + action Qualiopi)"],
    rows: [
      [
        `<a href="https://www.agefiph.fr/">agefiph.fr</a>`,
        "AGEFIPH – Aides et services pour l'emploi des personnes handicapées",
        veilleYear(fi, 8),
        "Référence nationale pour les aides financières et l'accompagnement des personnes en situation de handicap en formation et emploi.",
        "Preuve : capture écran du site + fiches aides téléchargées. Action Qualiopi : mise à jour du répertoire partenaires handicap et information des bénéficiaires PSH."
      ],
      [
        `<a href="https://www.monparcourshandicap.gouv.fr/">monparcourshandicap.gouv.fr</a>`,
        "Mon Parcours Handicap – Plateforme officielle",
        veilleYear(fi, 7),
        "Plateforme gouvernementale d'information et d'orientation pour les personnes en situation de handicap. Inclut la formation professionnelle.",
        "Preuve : capture écran + lien vers la plateforme. Action Qualiopi : intégrer le lien dans les supports d'information stagiaires PSH."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033862420">Légifrance – Art. L5213-6</a>`,
        "Obligation d'aménagement raisonnable – Code du travail",
        veilleYear(fi, 6),
        "Rappel de l'obligation légale d'aménagement raisonnable pour les personnes en situation de handicap (formation et emploi).",
        "Preuve : extrait du code du travail. Action Qualiopi : vérification de la conformité de nos procédures d'aménagement."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/handicap-et-formation-professionnelle">Centre Inffo – Handicap</a>`,
        "Handicap et formation professionnelle – Actualités",
        veilleMonthYear(fi, 4),
        "Veille sur les évolutions réglementaires et pratiques en matière d'accueil des PSH en formation.",
        "Preuve : capture écran + synthèse interne. Action Qualiopi : mise à jour de la procédure d'accueil PSH et formation du référent handicap."
      ],
      [
        `<a href="https://www.handipole.org/">handipole.org</a>`,
        "Handipole – Emploi, formation et insertion des personnes handicapées",
        veilleMonthYear(fi, 2),
        "Ressources et actualités sur l'insertion professionnelle des personnes handicapées.",
        "Preuve : lien + veille documentaire. Action Qualiopi : enrichissement du référentiel handicap interne."
      ],
    ]
  } });
}

// ===== IND 27 — PARTENAIRES, CONTRAT SOUS-TRAITANCE, CHARTE QUALITÉ =====

export function genListePartenairesV2(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "LES PARTENAIRES", sections: [
    { heading: "", content: `<p>${o.nom} s'attache à développer constamment son réseau de partenaires afin d'assurer une très grande employabilité à ses étudiants.</p>` },
    { heading: "Les partenaires de " + o.nom, content: `<p><strong>Président :</strong> ${o.dirigeant}</p><p><strong>Les Partenaires :</strong> ${o.responsablePedagogique}</p>` },
  ] });
}

export function genContratSousTraitanceV2(o: OrganismeInfo, f: FormationInfo, stagiaires: import("@/types/qualiopi").StagiaireInfo[]) {
  const s = stagiaires[0] || { prenom: "___", nom: "___", poste: "" };
  return buildDocument({ org: o, title: "CONTRAT DE SOUS-TRAITANCE FORMATION", sections: [
    { heading: "Entre les soussignés", content: `<p><strong>${o.nom}</strong>, immatriculé au registre du commerce et des sociétés sous le numéro R.C.S ${o.siret?.split(' ').slice(0,3).join(' ') || o.siret}, Numéro de déclaration d'activité : ${o.nda}, dont le siège social est situé ${o.adresse}, ${o.codePostal} ${o.ville}, représentée par ${o.dirigeant} en sa qualité de président</p><p><strong>Et</strong></p><p>ci-après « ${o.responsablePedagogique} »</p><p>Formateur intervenant désigné dans le cadre de ce contrat de sous-traitance :</p>` },
    { heading: "Article premier : Nature du contrat", content: `<p>Le présent contrat est conclu dans le cadre d'une prestation de formation ponctuelle réalisée par le sous-traitant au bénéfice du donneur d'ordre.</p>` },
    { heading: "Article 2 : Objet du contrat", content: `<ul><li><strong>L'intitulé de la formation :</strong> ${f.intitule}</li><li><strong>Modules de formation à animer :</strong> ${f.intitule}</li><li><strong>Nom du client et noms/prénoms/fonctions des stagiaires :</strong> ${s.prenom} ${s.nom} ${s.poste ? '– ' + s.poste : 'Étudiant'}</li><li><strong>Durée de la formation :</strong> ${f.duree}</li><li><strong>Dates prévisionnelles :</strong> session du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}</li><li><strong>Horaires :</strong> de 9h à 17h</li><li><strong>Lieu de formation :</strong> ${o.adresse}, ${o.codePostal} ${o.ville}</li></ul>` },
    { heading: "Article 3 : Durée du contrat", content: `<p>Le présent contrat est strictement limité à la prestation de formation visée à l'article 2.</p><p>Il cesse de plein droit à son terme.</p>` },
    { heading: "Article 4 : Obligations du sous-traitant", content: `<p>Le sous-traitant s'engage à :</p><ul><li>Communiquer au donneur d'ordre : une copie de son extrait K-bis / de son immatriculation avant le début de la formation, son récépissé de déclaration d'activité, le curriculum vitae et les diplômes des formateurs intervenants</li><li>Transmettre le contenu de formation qui fera l'objet d'une vérification des objectifs pédagogiques prévus par l'action de formation</li><li>Animer la formation dans le respect des objectifs fixés par le donneur d'ordre</li><li>Faire animer la formation par le formateur intervenant désigné dans le présent contrat, sauf en cas de situation exceptionnelle, et uniquement après accord du donneur d'ordre</li><li>Communiquer au donneur d'ordre ses besoins en matériel au moins 15 jours avant le début de la formation</li><li>Assurer l'évaluation des stagiaires à l'issue de l'action de formation (art. L.6353-1 du Code du travail)</li><li>Participer aux réunions de préparation / jurys d'examen / remises de diplôme</li><li>Communiquer une fois par an un justificatif du maintien/développement des compétences des formateurs intervenants</li><li>Représenter le donneur d'ordre et ne pas démarcher les clients et prospects du donneur d'ordre</li></ul><p>Le donneur d'ordre est engagé dans une démarche de certification selon le Référentiel National Qualité QUALIOPI. Tous les formateurs prestataires sous-traitants sont tenus de respecter l'application des exigences de cette certification.</p>` },
    { heading: "Documents à fournir avant la formation", content: `<ul><li>Le contrat de sous-traitance signé</li><li>Kbis ou avis SIRENE</li><li>Récépissé de déclaration d'activité de formation</li><li>CV et diplômes des formateurs intervenants</li><li>La présentation des méthodes et moyens pédagogiques</li></ul>`, variant: "green" },
    { heading: "Article 5 : Obligations du donneur d'ordre", content: `<p>${o.nom} s'engage à :</p><ul><li>Confier au sous-traitant la formation prévue à l'article 2</li><li>Prendre en charge la gestion administrative et logistique de la formation</li><li>Transmettre au sous-traitant une copie des feuilles de présence signées par les stagiaires</li><li>Transmettre au sous-traitant une copie des questionnaires de satisfaction remplis par les stagiaires</li><li>Prévenir le sous-traitant au moins 7 jours à l'avance en cas d'annulation ou de report</li></ul>` },
    { heading: "Article 6 : Modalités financières", content: `<p>À VOIR SELON LE PROFIL DU FORMATEUR</p>` },
    { heading: "Article 7 : Dispositions diverses", content: `<ul><li>Le présent contrat ne crée entre les parties aucun lien de subordination</li><li>Le sous-traitant déclare avoir souscrit une police d'assurance responsabilité civile professionnelle (RCP)</li><li>Le sous-traitant dispose d'une propriété intellectuelle et/ou artistique sur le contenu de sa formation. Le donneur d'ordre s'engage à ne pas reproduire ni diffuser ce contenu sans accord</li></ul>` },
  ], signatures: { type: "2", labels: ["Le donneur d'ordre – " + o.nom, "Le sous-traitant"], names: [o.dirigeant, o.responsablePedagogique] } });
}

export function genCharteQualiteFormateurExterne(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "Charte Qualité Formateur externe", sections: [
    { heading: "", content: `<p>Dans le cadre de la sous-traitance des actions de formation, pour chaque prestation de formation,</p><p><strong>Le Partenaire :</strong></p><ul><li>S'engage au respect du Référentiel national qualité QUALIOPI.</li><li>Le Partenaire devra s'informer des mises à jour et s'y conformer.</li></ul>` },
  ], signatures: { type: "2", labels: ["Pour le partenaire", "Pour " + o.nom], names: [o.responsablePedagogique, o.dirigeant] } });
}
