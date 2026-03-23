// Critère 6 — IND 23-27 generators (based on real SELECT FORMATION documents)
import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, subtractBusinessDays } from "./docBuilder";

/**
 * Helper: generates realistic veille dates BEFORE the formation start date.
 */
function veilleDate(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
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

// ===== Detection helpers =====
type FormationType = "fle" | "ia" | "word" | "commercial";

function detectFormationType(f: FormationInfo): FormationType {
  const title = (f.intitule || "").toLowerCase();
  if (title.includes("français") || title.includes("fle") || title.includes("social") || title.includes("médico") || title.includes("medico") || title.includes("communiquer en français")) return "fle";
  if (title.includes("intelligence artificielle") || title.includes("ia générative") || title.includes("ia ") || title.includes("contenus rédactionnels") || title.includes("chatgpt") || title.includes("prompt")) return "ia";
  if (title.includes("commercial") || title.includes("conseiller") || title.includes("négociat") || title.includes("vente") || title.includes("relation client") || title.includes("prospection")) return "commercial";
  return "word";
}

// ===== IND 23 — VEILLE RÉGLEMENTAIRE =====

function veilleReglementaireRows(f: FormationInfo, type: FormationType): string[][] {
  const common = [
    [
      `<a href="https://www.legifrance.gouv.fr/eli/arrete/2025/2/18/TSSD2501626A/jo/texte">Légifrance – Arrêté du 18/02/2025</a>`,
      "Arrêté du 18 février 2025 — modalités d'audit associées au référentiel national",
      veilleDate(f, 10),
      "Modification des modalités d'audit pour les organismes certifiés (durée, indicateurs audités).",
      "Preuve: Version consolidée journal officiel + critères audit. Action: Mettre à jour vos procédures d'audit interne + planification des indicateurs."
    ],
    [
      `<a href="https://travail-emploi.gouv.fr/referentiel-national-qualite-guide-de-lecture-qualiopi">Ministère du Travail – Guide Qualiopi</a>`,
      "Référentiel national Qualité — Guide de lecture Qualiopi V9",
      veilleDate(f, 8),
      "Rappelle l'obligation de Qualiopi pour accès fonds et financeurs mentionnés à l'art L.6316-1.",
      "Preuve: Version guide Qualiopi. Action: Vérifier conformité continue des indicateurs Qualiopi + documentation interne. Nous nous sommes mis en conformité par rapport au référentiel national qualiopi la v9."
    ],
    [
      `<a href="https://www.dendreo.com/blog/veille-legale-et-reglementaire-de-la-formation-professionnelle-recap-des-actualites-2025">Dendreo – Veille formation pro</a>`,
      "Veille légale et réglementaire formation pro",
      veilleMonthYear(f, 6),
      "Synthèse des actualités essentielles pour OF & Qualiopi. Les financements par le CPF ont connu des évolutions.",
      "Preuve: Extrait synthèse + signets. Action: Archive et établir une synthèse interne annuelle (preuve Qualiopi)."
    ],
  ];

  if (type === "fle") {
    return [...common,
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901294">Légifrance – Art. L.6321-1 Code du travail</a>`,
        "Obligation de formation des salariés – adaptation au poste de travail",
        veilleDate(f, 5),
        "L'employeur doit assurer l'adaptation des salariés à leur poste, y compris la maîtrise du français professionnel dans les métiers du social et médico-social.",
        "Preuve: Extrait code du travail. Action: Intégrer cette obligation dans le programme FLE professionnel pour justifier le besoin de formation linguistique."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "La participation financière obligatoire pour l'achat d'une formation mobilisant le CPF s'élève à 103,20 euros.",
        "Preuve: Informer les futurs apprenants de la hausse du ticket modérateur. Sauf pour les personnes au chômage ou financées par les employeurs."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033862420">Légifrance – Art. L.1321-6 Code du travail</a>`,
        "Maîtrise du français en milieu professionnel – obligation de l'employeur",
        veilleDate(f, 2),
        "Le règlement intérieur doit être rédigé en français. Les salariés doivent pouvoir comprendre les consignes de sécurité et les protocoles dans leur langue de travail.",
        "Preuve: Article de loi. Action: Adapter le programme de formation FLE aux exigences de compréhension des documents professionnels (protocoles, transmissions)."
      ],
    ];
  }

  if (type === "ia") {
    return [...common,
      [
        `<a href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049757543">Légifrance – Règlement IA européen (AI Act)</a>`,
        "Règlement (UE) 2024/1689 — Intelligence artificielle",
        veilleDate(f, 5),
        "Cadre réglementaire européen sur l'IA : classification des risques, obligations de transparence, interdictions. Applicable progressivement à partir de 2025.",
        "Preuve: Texte du règlement + synthèse interne. Action: Intégrer les obligations de transparence et d'éthique IA dans le programme de formation."
      ],
      [
        `<a href="https://www.cnil.fr/fr/intelligence-artificielle/plan-daction-pour-une-ia-innovante-et-respectueuse-de-la-vie-privee">CNIL – Plan d'action IA</a>`,
        "CNIL – Plan d'action pour une IA respectueuse de la vie privée",
        veilleDate(f, 4),
        "Recommandations de la CNIL sur l'usage de l'IA et la protection des données personnelles (RGPD appliqué à l'IA générative).",
        "Preuve: Publication CNIL. Action: Module sur le respect du RGPD dans l'utilisation de l'IA générative (données personnelles, droit à l'image)."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
        "CPF : Hausse du montant de la participation forfaitaire",
        veilleDate(f, 3),
        "La participation financière obligatoire pour l'achat d'une formation mobilisant le CPF s'élève à 103,20 euros.",
        "Preuve: Informer les futurs apprenants de la hausse du ticket modérateur."
      ],
    ];
  }

  // Default: word/bureautique
  return [...common,
    [
      `<a href="https://www.dendreo.com/blog/veille-legale-et-reglementaire-de-la-formation-professionnelle-recap-des-actualites-2025">Dendreo – Décret RNCP/RS</a>`,
      "Modification des critères d'enregistrement au RNCP et au RS",
      veilleDate(f, 5),
      "Décret — Obligation d'intégrer dans les référentiels les compétences liées aux transitions écologique et numérique.",
      "Preuve: Nous veillerons à être conforme suite au décret. Nous nous sommes rapprochés du certificateur ICDL pour une formation Word."
    ],
    [
      `<a href="https://www.centre-inffo.fr/site-droit-formation/actualites-droit/cpf-hausse-du-montant-de-la-participation-forfaitaire">Centre Inffo – CPF</a>`,
      "CPF : Hausse du montant de la participation forfaitaire",
      veilleDate(f, 3),
      "La participation financière obligatoire pour l'achat d'une formation mobilisant le CPF s'élève à 103,20 euros.",
      "Preuve: Informer les futurs apprenants de la hausse du ticket modérateur à 103,20 euros."
    ],
  ];
}

export function genVeilleReglementaireV2(o: OrganismeInfo, f: FormationInfo) {
  const type = detectFormationType(f);
  return buildDocument({ org: o, title: "Veille réglementaire", table: {
    headers: ["Liens", "Nom de l'article / Texte", "Date du texte", "Commentaire", "Exploitation de veille (preuve + action Qualiopi)"],
    rows: veilleReglementaireRows(f, type)
  } });
}

// ===== IND 24 — TABLEAU DE VEILLE MÉTIER =====

function veilleMetierRows(f: FormationInfo, type: FormationType): string[][] {
  if (type === "fle") {
    return [
      [
        `<a href="https://www.fle.fr/">fle.fr</a>`,
        "Le français langue étrangère – Portail du FLE",
        veilleMonthYear(f, 8),
        "Portail de référence du FLE : actualités, offres de formation, ressources pédagogiques pour l'enseignement du français aux non-francophones.",
        "Preuve : capture écran + lien. Action : veille sur les évolutions pédagogiques FLE et nouveaux supports disponibles."
      ],
      [
        `<a href="https://www.cavilam.com/">cavilam.com – Alliance française Vichy</a>`,
        "CAVILAM – Alliance française : innovations pédagogiques FLE",
        veilleMonthYear(f, 7),
        "Centre de référence en FLE proposant des formations de formateurs et des ressources pédagogiques innovantes (approche actionnelle, numérique).",
        "Action Qualiopi : adapter les méthodes pédagogiques aux dernières approches recommandées par les experts FLE."
      ],
      [
        `<a href="https://www.has-sante.fr/jcms/p_3085043/fr/la-bientraitance-et-le-soutien-a-domicile">HAS – Bientraitance</a>`,
        "HAS – Recommandations de bientraitance dans le secteur médico-social",
        veilleYear(f, 6),
        "Référence sectorielle essentielle : les professionnels du social et médico-social doivent comprendre et communiquer autour des protocoles de bientraitance.",
        "Action : intégrer le vocabulaire de la bientraitance et les protocoles HAS dans les exercices de communication FLE."
      ],
      [
        `<a href="https://solidarites.gouv.fr/le-travail-social">Ministère des Solidarités – Travail social</a>`,
        "Travail social en France – orientations et métiers",
        veilleMonthYear(f, 4),
        "Présentation des métiers du social et du médico-social : aide-soignant, AES, moniteur-éducateur. Contexte de pénurie de main-d'œuvre qualifiée.",
        "Preuve : captures + notes. Action : adapter le contenu FLE aux fiches métiers du social (vocabulaire, situations professionnelles réelles)."
      ],
      [
        `<a href="https://www.france-terre-asile.org/">france-terre-asile.org</a>`,
        "France terre d'asile – Insertion et formation linguistique",
        veilleMonthYear(f, 3),
        "Association de référence sur l'accueil et l'insertion des personnes réfugiées : parcours d'intégration linguistique et professionnelle.",
        "Action Qualiopi : prise en compte des publics allophones dans la conception pédagogique et l'accompagnement (critère 2)."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=eVUxaR4aI1U">YouTube – FLE en milieu professionnel</a>`,
        "Enseigner le FLE en milieu professionnel – retour d'expérience",
        veilleYear(f, 2),
        "Vidéo de partage d'expérience sur l'enseignement du français professionnel dans les secteurs du soin et de l'accompagnement social.",
        "Preuve : fiche synthèse vidéo. Action : enrichir les mises en situation professionnelles (transmissions, accueil usagers)."
      ],
    ];
  }

  if (type === "ia") {
    return [
      [
        `<a href="https://www.blogdumoderateur.com/dossier/intelligence-artificielle/">blogdumoderateur.com</a>`,
        "Blog du Modérateur – Dossier Intelligence Artificielle",
        veilleMonthYear(f, 8),
        "Veille complète sur les outils IA : ChatGPT, Midjourney, DALL-E, Copilot. Usages professionnels pour la création de contenus rédactionnels et visuels.",
        "Preuve : capture écran + lien. Action : mise à jour des outils présentés dans la formation selon les dernières versions disponibles."
      ],
      [
        `<a href="https://openai.com/blog">OpenAI Blog</a>`,
        "OpenAI – Actualités et mises à jour ChatGPT / GPT-4",
        veilleMonthYear(f, 7),
        "Blog officiel d'OpenAI : nouvelles fonctionnalités ChatGPT, GPT-4o, DALL-E 3, améliorations du prompt engineering.",
        "Action Qualiopi : adapter les exercices de prompt engineering aux dernières versions des modèles (critère 6 – amélioration continue)."
      ],
      [
        `<a href="https://www.midjourney.com/">midjourney.com</a>`,
        "Midjourney – Génération d'images par IA",
        veilleYear(f, 6),
        "Outil majeur de génération d'images par IA. Évolution rapide des modèles (v5, v6) avec qualité photographique et styles artistiques.",
        "Action : mise à jour du module création visuelle avec les nouvelles commandes et paramètres Midjourney."
      ],
      [
        `<a href="https://www.canva.com/ai-image-generator/">Canva – IA intégrée</a>`,
        "Canva – Générateur d'images et textes par IA",
        veilleMonthYear(f, 4),
        "Intégration de l'IA générative dans Canva : génération de visuels, reformulation de textes, templates automatisés.",
        "Preuve : captures fonctionnalités. Action : intégrer Canva IA comme outil complémentaire dans les exercices pratiques."
      ],
      [
        `<a href="https://www.youtube.com/watch?v=aircAruvnKk">YouTube – 3Blue1Brown Neural Networks</a>`,
        "3Blue1Brown – Comment fonctionne une IA (vulgarisation)",
        veilleYear(f, 5),
        "Vidéo de vulgarisation sur le fonctionnement des réseaux de neurones, essentiel pour comprendre les fondements de l'IA générative.",
        "Preuve : fiche synthèse vidéo. Action : inclure ces ressources pédagogiques dans le module d'introduction à l'IA."
      ],
      [
        `<a href="https://www.france-num.gouv.fr/guides-et-conseils/strategie-numerique/intelligence-artificielle">France Num – IA pour les TPE/PME</a>`,
        "France Num – Guide IA pour les entreprises",
        veilleMonthYear(f, 3),
        "Guide gouvernemental sur l'adoption de l'IA par les TPE/PME : usages concrets, outils recommandés, bonnes pratiques.",
        "Action Qualiopi : aligner les cas pratiques de la formation sur les usages IA recommandés par France Num."
      ],
    ];
  }

  // Default: word/bureautique
  return [
    [
      `<a href="https://propulsandgo.com/blog/top-5-formations-bureautique-paris-2025">propulsandgo.com</a>`,
      "Top 5 des formations bureautiques à Paris",
      veilleMonthYear(f, 8),
      "Montre que Word et Pack Office restent des compétences clés en entreprise. Forte demande CPF.",
      "Preuve : lien + capture écran. Action : positionnement de la formation Word comme compétence métier indispensable."
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
      `<a href="https://www.edutech.com">edutech.com</a>`,
      "Salon EduTECH (Formation & digital)",
      veilleYear(f, 3),
      "Salon international sur l'évolution des outils pédagogiques et numériques.",
      "Preuve : site événement. Action : réflexion sur pédagogie active et outils numériques."
    ],
  ];
}

export function genVeilleMetierV2(o: OrganismeInfo, f: FormationInfo) {
  const type = detectFormationType(f);
  return buildDocument({ org: o, title: "Tableau de veille métier", table: {
    headers: ["Lien (article / vidéo / événement)", "Nom de l'article / Vidéo / Événement", "Date", "Commentaire – Analyse métier", "Exploitation de veille (preuve + action Qualiopi)"],
    rows: veilleMetierRows(f, type)
  } });
}

// ===== IND 25 — TABLEAU DE VEILLE TECHNOLOGIQUE =====

function veilleTechnoRows(f: FormationInfo, type: FormationType): string[][] {
  const commonDigitalLearning = [
    [
      `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/le-barometre-istf-du-digital-learning-souligne-limportance-du-tutorat">Centre Inffo</a>`,
      "Le baromètre ISTF du digital learning",
      veilleDate(f, 10),
      "État des lieux digital learning : tutorat, multimodal, distanciel asynchrone & obstacles à l'adoption.",
      "Preuve : capture écran + PDF du baromètre Centre Inffo. Action Qualiopi : mettre à jour la stratégie digitale pédagogique."
    ],
    [
      `<a href="https://fr.linkedin.com/posts/sas-theia_digital-learning-les-chiffres-cl%C3%A9s-%C3%A0-retenir-activity-7297570569854590977-hFkT">LinkedIn – SAS Theia</a>`,
      "Chiffres clés ISTF Digital Learning",
      veilleMonthYear(f, 9),
      "Publication LinkedIn avec données réelles sur adoption du digital learning (68% des formations intégrant du numérique).",
      "Preuve : capture du post + export PDF. Action Qualiopi : intégrer ces données dans la revue de processus pédagogique."
    ],
  ];

  if (type === "fle") {
    return [...commonDigitalLearning,
      [
        `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
        "Learning Technologies France – Événement technologie & formation",
        veilleYear(f, 7),
        "Principal salon français des technologies pour la formation (IA, EdTech, plateformes, LMS).",
        "Preuve : programme + certificat de participation. Action Qualiopi : participer au salon / CR + plan adoption tech."
      ],
      [
        `<a href="https://www.tv5monde.com/fiches-pedagogiques">TV5Monde – Fiches pédagogiques FLE</a>`,
        "TV5Monde – Ressources numériques pour le FLE",
        veilleDate(f, 6),
        "Plateforme numérique de référence pour l'enseignement du FLE : vidéos authentiques, exercices interactifs, fiches pédagogiques classées par niveau CECRL.",
        "Preuve : capture écran + sélection de fiches niveau B1. Action Qualiopi : intégrer les ressources TV5Monde dans les supports de formation (compréhension orale/écrite)."
      ],
      [
        `<a href="https://apprendre.tv5monde.com/">apprendre.tv5monde.com</a>`,
        "Apprendre le français avec TV5Monde – plateforme interactive",
        veilleMonthYear(f, 4),
        "Plateforme gratuite d'apprentissage du français : exercices auto-corrigés, vidéos avec sous-titres, progression par niveau.",
        "Preuve : URL + captures. Action : recommander la plateforme aux apprenants pour le travail en autonomie entre les sessions."
      ],
      [
        `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/6e-edition-du-barom%C3%A8tre-de-la-formation-et-de-l%E2%80%99emploi-2025">Centre Inffo – Baromètre</a>`,
        "Baromètre formation & emploi – IA et compétences",
        veilleDate(f, 3),
        "Indique que l'IA est un levier majeur intégré dans les attentes des actifs, avec implications sur les compétences.",
        "Preuve : infographie / PDF baromètre. Action Qualiopi : intégrer résultats dans analyse des besoins et plan de développement."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation professionnelle tendances",
        veilleDate(f, 2),
        "Synthèse des pratiques et attentes digitales dans la formation – accent sur transformation numérique.",
        "Preuve : PDF baromètre + résumés. Action Qualiopi : alignement offre/compétences sur tendances numériques."
      ],
    ];
  }

  if (type === "ia") {
    return [...commonDigitalLearning,
      [
        `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
        "Learning Technologies France – IA & EdTech",
        veilleYear(f, 7),
        "Salon dédié aux technologies de formation : forte présence de l'IA générative dans les solutions pédagogiques présentées.",
        "Preuve : programme + notes de veille. Action Qualiopi : benchmark des outils IA pédagogiques."
      ],
      [
        `<a href="https://huggingface.co/blog">Hugging Face Blog</a>`,
        "Hugging Face – Modèles open source et IA générative",
        veilleDate(f, 6),
        "Plateforme de référence pour les modèles IA open source : Stable Diffusion, LLaMA, Mistral. Démocratisation de l'accès à l'IA.",
        "Preuve : capture blog + exemples de modèles. Action : présenter les alternatives open source dans le module éthique et choix d'outils."
      ],
      [
        `<a href="https://www.anthropic.com/research">Anthropic – Recherche IA</a>`,
        "Anthropic – Recherche sur la sécurité et l'alignement de l'IA",
        veilleMonthYear(f, 4),
        "Publications sur la sécurité de l'IA, l'alignement des modèles et l'usage responsable. Référence pour le volet éthique.",
        "Preuve : articles de recherche + synthèse. Action Qualiopi : enrichir le module « usage responsable de l'IA » avec les dernières recommandations."
      ],
      [
        `<a href="https://fr.linkedin.com/posts/centre-inffo_lia-en-formation-professionnelle-innovation-activity-7316747080062951424-7ws1">LinkedIn – Centre Inffo IA</a>`,
        "Post Centre Inffo – IA & innovation en formation",
        veilleYear(f, 5),
        "Publication LinkedIn sur l'intégration de l'IA dans les pratiques de formation.",
        "Preuve : capture écran + URL. Action Qualiopi : preuve de veille mensuelle + ateliers internes IA."
      ],
      [
        `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
        "Baromètre formation professionnelle – IA et transformation digitale",
        veilleDate(f, 3),
        "Synthèse des pratiques : l'IA générative devient un outil quotidien pour la création de contenus dans les organismes de formation.",
        "Preuve : PDF baromètre. Action Qualiopi : alignement offre/compétences sur tendances IA et numériques."
      ],
    ];
  }

  // Default: word/bureautique
  return [...commonDigitalLearning,
    [
      `<a href="https://www.learningtechnologiesfrance.com/">learningtechnologiesfrance.com</a>`,
      "Learning Technologies France – Événement technologie & formation",
      veilleYear(f, 7),
      "Principal salon français des technologies pour la formation (IA, EdTech, plateformes, LMS).",
      "Preuve : programme + certificat de participation. Action Qualiopi : participer au salon / CR + plan adoption tech."
    ],
    [
      `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/6e-edition-du-barom%C3%A8tre-de-la-formation-et-de-l%E2%80%99emploi-2025">Centre Inffo – Baromètre</a>`,
      "Baromètre formation & emploi – IA et compétences",
      veilleDate(f, 8),
      "Indique que l'IA est un levier majeur intégré dans les attentes des actifs, avec implications sur les compétences & E-learning.",
      "Preuve : infographie / PDF baromètre. Action Qualiopi : intégrer résultats dans analyse des besoins."
    ],
    [
      `<a href="https://fr.linkedin.com/posts/centre-inffo_lia-en-formation-professionnelle-innovation-activity-7316747080062951424-7ws1">LinkedIn – Centre Inffo IA</a>`,
      "Post Centre Inffo – IA & innovation en formation",
      veilleYear(f, 5),
      "Publication LinkedIn sur l'intégration de l'IA dans les pratiques de formation.",
      "Preuve : capture écran + URL. Action Qualiopi : preuve de veille mensuelle."
    ],
    [
      `<a href="https://www.centre-inffo.fr/site-centre-inffo/actualites-centre-inffo/articles-2025/lia-dans-la-formation-professionnelle-opportunite-ou-revolution">Centre Inffo – Article IA</a>`,
      "L'IA dans la formation professionnelle : opportunité ou révolution ?",
      veilleDate(f, 5),
      "Article Centre Inffo sur place de l'IA (personnalisation, automatisation des parcours).",
      "Preuve : PDF article + note interne. Action Qualiopi : mise à jour de la politique pédagogique."
    ],
    [
      `<a href="https://www.talenco.com/nos-publications/barometre-formation-professionnelle-tendances-pratiques-2025/">TalenCo – Baromètre</a>`,
      "Baromètre formation professionnelle tendances",
      veilleDate(f, 3),
      "Synthèse des pratiques et attentes digitales dans la formation.",
      "Preuve : PDF baromètre + résumés. Action Qualiopi : alignement offre/compétences sur tendances numériques."
    ],
  ];
}

export function genVeilleTechnologiqueV2(o: OrganismeInfo, f: FormationInfo) {
  const type = detectFormationType(f);
  return buildDocument({ org: o, title: "Tableau de veille technologique", table: {
    headers: ["Lien (vrai)", "Nom / Titre de l'article", "Date", "Commentaire (veille technologique)", "Exploitation de veille vérifiable (preuve + action Qualiopi)"],
    rows: veilleTechnoRows(f, type)
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
        "Plateforme gouvernementale d'information et d'orientation pour les personnes en situation de handicap.",
        "Preuve : capture écran + lien vers la plateforme. Action Qualiopi : intégrer le lien dans les supports d'information stagiaires PSH."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033862420">Légifrance – Art. L5213-6</a>`,
        "Obligation d'aménagement raisonnable – Code du travail",
        veilleYear(fi, 6),
        "Rappel de l'obligation légale d'aménagement raisonnable pour les personnes en situation de handicap.",
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
  const tamponHtml = o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
  return buildDocument({ org: o, title: "LES PARTENAIRES", sections: [
    { heading: "", content: `<p>${o.nom} s'attache à développer constamment son réseau de partenaires afin d'assurer une très grande employabilité à ses étudiants.</p>` },
  ], extraHtml: `<h2>Les partenaires de ${o.nom}</h2>
    <table>
      <tr><th>Partenaire</th><th>${o.dirigeant}</th></tr>
      <tr style="background:#fff"><td>Président</td><td>Président<br>${tamponHtml}</td></tr>
    </table>` });
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
  ], extraHtml: (() => {
    const sigHtml = o.signatureUrl ? `<img src="${o.signatureUrl}" alt="Signature" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : "";
    const tamponHtml = o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
    return `<div class="signature-block-2">
      <div class="sig-box"><p class="sig-label">Le donneur d'ordre – ${o.nom}</p><p>Nom : ${o.dirigeant}</p><p>Date : ${(o as any).dateMaj ? new Date((o as any).dateMaj).toLocaleDateString("fr-FR") : new Date().toLocaleDateString("fr-FR")}</p><p style="margin-top:20px">Signature :</p>${sigHtml}</div>
      <div class="sig-box"><p class="sig-label">Le sous-traitant</p><p>Nom : ${o.responsablePedagogique}</p><p>Date : ${(o as any).dateMaj ? new Date((o as any).dateMaj).toLocaleDateString("fr-FR") : new Date().toLocaleDateString("fr-FR")}</p><p style="margin-top:20px">Signature :</p>${tamponHtml}</div>
    </div>`;
  })() });
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
