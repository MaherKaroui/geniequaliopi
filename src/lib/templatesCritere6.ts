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

  if (type === "commercial") {
    const yr = veilleYear(f, 0);
    const yrPrev = veilleYear(f, 12);
    return [
      [
        `<a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006904070">Légifrance – Art. L6316-1</a>`,
        "Article L6316-1 du Code du travail (Qualité des actions de formation)",
        `Version en vigueur ${yrPrev}`,
        "Définit l'obligation de certification Qualiopi pour les prestataires de formation souhaitant accéder aux fonds publics ou mutualisés",
        "Vérification annuelle du maintien de la certification Qualiopi + mise à jour des procédures internes. Nous avons préparé l'audit de surveillance."
      ],
      [
        `<a href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049757543">Légifrance – Contrôles OF</a>`,
        "Renforcement des contrôles des organismes de formation",
        yrPrev,
        "Accentuation des contrôles, lutte contre la fraude",
        "Mise en place d'un système de traçabilité renforcé (émargements, mails)"
      ],
      [
        `<a href="https://www.francecompetences.fr/">France Compétences – Certifications RS</a>`,
        "Réforme des certifications RS",
        yrPrev,
        "Renforcement des exigences d'enregistrement et de renouvellement",
        "Vérification de la demande des certifications RS"
      ],
      [
        `<a href="https://www.moncompteformation.gouv.fr/">Mon Compte Formation – CPF</a>`,
        "Décret relatif au CPF et à la régulation des formations",
        yrPrev,
        "Encadrement plus strict des pratiques commerciales CPF",
        "En attente de validation du RS pour pouvoir faire la demande du EDOF"
      ],
      [
        `<a href="https://grand-est.dreets.gouv.fr/Le-controle-de-la-formation-professionnelle-17841">DREETS – Contrôle formation pro</a>`,
        "Contrôle des organismes de formation",
        yrPrev,
        "Précise les modalités de contrôle administratif et financier",
        "Préparation dossier conformité (conventions, factures, preuves d'exécution)"
      ],
      [
        `<a href="https://of.moncompteformation.gouv.fr/espace-public/actualites/loi-de-finances-2026-les-evolutions-concernant-le-cpfv">MCF – Loi de finances</a>`,
        "Évolutions financement formation professionnelle",
        yr,
        "Ajustements des financements OPCO et CPF",
        "Adaptation des offres de formation aux priorités de financement"
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
      <tr style="background:#fff"><td>Dirigeant</td><td>Dirigeant<br>${tamponHtml}</td></tr>
    </table>` });
}

export function genContratSousTraitanceV2(o: OrganismeInfo, f: FormationInfo, stagiaires: import("@/types/qualiopi").StagiaireInfo[]) {
  const stagList = stagiaires.map(s => `${s.prenom} ${s.nom}${s.poste ? ' – ' + s.poste : ''}`).join(', ') || "___";
  const dateMaj = (o as any).dateMaj ? new Date((o as any).dateMaj).toLocaleDateString("fr-FR") : new Date().toLocaleDateString("fr-FR");
  // Sous-traitant info from formation or org
  const sousTraitantNom = "VICTOR ACADEMY";
  const sousTraitantForme = "SASU – Société par Actions Simplifiée Unipersonnelle";
  const sousTraitantSiret = "910 645 563 00016";
  const sousTraitantSiren = "910 645 563";
  const sousTraitantAdresse = "5 Allée Watteau, 95200 SARCELLES";
  const sousTraitantDirigeant = "Monsieur Jeganathan SOFIANE";
  const sousTraitantQualite = "Dirigeant";

  return buildDocument({ org: o, title: "CONTRAT DE SOUS-TRAITANCE EN FORMATION PROFESSIONNELLE", subtitle: "Conformément aux articles L.6351-1 et suivants du Code du travail et au Référentiel National Qualité (Qualiopi)", sections: [
    { heading: "ENTRE LES SOUSSIGNÉS", content: `
      <p><strong>1. LE DONNEUR D'ORDRE :</strong></p>
      <p><strong>${o.nom}</strong></p>
      <p>Forme juridique : Organisme de formation</p>
      <p>SIRET : ${o.siret}</p>
      <p>Numéro de Déclaration d'Activité (NDA) : ${o.nda}</p>
      <p>Siège social : ${o.adresse}, ${o.codePostal} ${o.ville}</p>
      <p>Représenté par : <strong>${o.dirigeant}</strong>, en qualité de Dirigeant</p>
      <p>Ci-après dénommé <strong>« le Donneur d'ordre »</strong></p>
      <br/>
      <p><strong>2. LE SOUS-TRAITANT :</strong></p>
      <p><strong>${sousTraitantNom}</strong></p>
      <p>Forme juridique : ${sousTraitantForme}</p>
      <p>SIRET : ${sousTraitantSiret} | SIREN : ${sousTraitantSiren}</p>
      <p>Siège social : ${sousTraitantAdresse}</p>
      <p>Représenté par : <strong>${sousTraitantDirigeant}</strong>, en qualité de ${sousTraitantQualite}</p>
      <p>Ci-après dénommé <strong>« le Sous-traitant »</strong></p>
      <br/>
      <p style="font-style:italic">Ci-après désignés ensemble « les Parties ».</p>
    ` },
    { heading: "PRÉAMBULE", content: `
      <p>Le Donneur d'ordre, <strong>${o.nom}</strong>, est un organisme de formation professionnelle déclaré auprès de la DREETS sous le numéro ${o.nda}.</p>
      <p>Le Sous-traitant, <strong>${sousTraitantNom}</strong>, est un organisme de formation professionnelle disposant de formateurs salariés qualifiés dans le domaine de l'enseignement du Français Langue Étrangère (FLE).</p>
      <p>Le Donneur d'ordre souhaite confier au Sous-traitant, qui l'accepte, la réalisation de prestations de formation en sous-traitance, dans les conditions définies ci-après.</p>
      <p>Le présent contrat est conclu dans le cadre des articles <strong>L.6351-1 et suivants du Code du travail</strong> relatifs à la sous-traitance en formation professionnelle.</p>
    ` },
    { heading: "ARTICLE 1 – OBJET DU CONTRAT", content: `
      <p>Le présent contrat a pour objet de définir les conditions dans lesquelles le Donneur d'ordre confie au Sous-traitant la réalisation de prestations de formation professionnelle continue au bénéfice de ses apprenants.</p>
      <p>Le Sous-traitant s'engage à réaliser les prestations de formation par l'intermédiaire de ses <strong>formateurs salariés</strong>, conformément aux programmes, objectifs pédagogiques et conditions définis par le Donneur d'ordre.</p>
      <p><strong>Il est expressément convenu que les formateurs intervenant dans le cadre du présent contrat sont des salariés du Sous-traitant et non du Donneur d'ordre.</strong></p>
    ` },
    { heading: "ARTICLE 2 – DESCRIPTION DE LA FORMATION", content: `
      <table>
        <tr><th style="width:40%">Élément</th><th>Détail</th></tr>
        <tr><td><strong>Intitulé de la formation</strong></td><td>${f.intitule}</td></tr>
        <tr><td><strong>Type de formation</strong></td><td>Formation en Langue Française – Français Langue Étrangère (FLE)</td></tr>
        <tr><td><strong>Public visé</strong></td><td>Adultes</td></tr>
        <tr><td><strong>Durée totale</strong></td><td>À définir selon le groupe</td></tr>
        <tr><td><strong>Dates prévisionnelles</strong></td><td>Sessions : Dates individuelles par stagiaire</td></tr>
        <tr><td><strong>Modalités</strong></td><td>${f.modalites || "Présentiel et/ou distanciel (à adapter selon les besoins)"}</td></tr>
        <tr><td><strong>Lieu de formation</strong></td><td>${f.lieu || `${o.adresse}, ${o.codePostal} ${o.ville}`}</td></tr>
        <tr><td><strong>Horaires</strong></td><td>De 9h00 à 12h30 et de 13h30 à 17h00</td></tr>
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
    { heading: "ARTICLE 3 – STATUT DES FORMATEURS", content: `
      <p>Les formateurs mis à disposition par le Sous-traitant pour assurer les prestations objet du présent contrat sont <strong>exclusivement des salariés du Sous-traitant</strong>.</p>
      <p>Le Sous-traitant assume seul la qualité d'employeur vis-à-vis de ses formateurs. Il est seul responsable :</p>
      <ul>
        <li>Du versement de leur rémunération et des charges sociales afférentes</li>
        <li>De leurs conditions de travail</li>
        <li>De leur déclaration et de leur couverture sociale</li>
        <li>De leur formation continue et du maintien de leurs compétences</li>
      </ul>
      <p><strong>Aucun lien de subordination</strong> n'existe ni ne saurait exister entre le Donneur d'ordre et les formateurs salariés du Sous-traitant. Le Donneur d'ordre ne peut en aucun cas donner des directives aux formateurs sur l'organisation de leur travail, ni exercer un pouvoir disciplinaire à leur égard.</p>
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
      <p>En contrepartie de la réalisation des prestations de formation, le Donneur d'ordre versera au Sous-traitant la somme de : <strong>50 € HT</strong> par heure de formation dispensée.</p>
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
    const sigHtml = o.signatureUrl ? `<img src="${o.signatureUrl}" alt="Signature" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : "";
    const tamponHtml = o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
    return `<p style="margin-top:30px;text-align:center;font-weight:600">Fait en deux exemplaires originaux, à <strong>${o.ville || "MONTPELLIER"}</strong>, le <strong>${dateMaj}</strong></p>
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
        <p class="sig-label">Pour le Sous-traitant – ${sousTraitantNom}</p>
        <p>Représenté par : <strong>${sousTraitantDirigeant}</strong></p>
        <p>Qualité : ${sousTraitantQualite}</p>
        <p>Date : ${dateMaj}</p>
        <p style="margin-top:15px">Signature et cachet :</p>
        ${tamponHtml}
        <p style="font-size:11px;color:#888;margin-top:8px;font-style:italic">Lu et approuvé – Bon pour accord</p>
      </div>
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
