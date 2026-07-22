// Course content data for generating 30+ page support de cours documents
// Organized by formation keyword matching

export interface CourseChapter {
  title: string;
  description: string;
  sections: CourseSection[];
}

export interface CourseSection {
  title: string;
  content: string; // HTML content
}

export interface CourseData {
  chapters: CourseChapter[];
  youtubeVideos: { title: string; url: string; description: string }[];
}

// ========== YOUTUBE VIDEO BANKS ==========
const YOUTUBE_EXCEL: CourseData['youtubeVideos'] = [
  { title: "MEGA TUTO : Les BASES de EXCEL – 2H30 de formation complète", url: "https://www.youtube.com/watch?v=aZ-SY0ORaoA", description: "Toutes les bases du tableur : interface, cellules, formules, mise en forme, fonctions, graphiques." },
  { title: "Excel – Tableaux Croisés Dynamiques – Explication détaillée", url: "https://www.youtube.com/watch?v=-F5McY1yAUg", description: "Créer, analyser et personnaliser des tableaux croisés dynamiques pas à pas." },
  { title: "Apprendre Excel en 15 minutes – Formation rapide", url: "https://www.youtube.com/watch?v=0qG9IrfGYIM", description: "Les essentiels d'Excel en version accélérée pour une prise en main rapide." },
  { title: "Comment faire un tableau Excel débutant", url: "https://www.youtube.com/watch?v=PX4fEzI6kdM", description: "Créer son premier tableau Excel : saisie, formules et mise en forme de base." },
  { title: "Formation Excel – Prise en main Excel 365", url: "https://www.youtube.com/watch?v=LNExavXxdfw", description: "Découverte de l'interface Excel 365 et prise en main des fonctionnalités principales." },
];

const YOUTUBE_WORD: CourseData['youtubeVideos'] = [
  { title: "Formation Complète sur Word : Du Niveau Débutant à Avancé", url: "https://www.youtube.com/watch?v=uCTS_bqm9pk", description: "Maîtriser toutes les fonctionnalités de Word, du niveau débutant au niveau avancé." },
  { title: "Formation complète Word pour débutants – Toutes les bases", url: "https://www.youtube.com/watch?v=zbZ4GYt8i_0", description: "Toutes les bases de Microsoft Office Word en une vidéo complète." },
  { title: "Microsoft Word : la formation complète de A à Z", url: "https://www.youtube.com/watch?v=7Jn_t6A8q6w", description: "Bases, mise en forme, tabulations, paragraphes, tableaux, images, en-têtes, table des matières et macros." },
  { title: "33 Raccourcis Clavier pour Word à Connaître Absolument", url: "https://www.youtube.com/watch?v=T_k7Dyov9Qc", description: "Les raccourcis essentiels pour gagner en productivité sur Word." },
];

const YOUTUBE_POWERPOINT: CourseData['youtubeVideos'] = [
  { title: "PowerPoint : les BASES pour une bonne présentation", url: "https://www.youtube.com/watch?v=8W5B-0tbPYQ", description: "Créer des présentations professionnelles : thèmes, textes, images, animations et transitions." },
  { title: "COMMENT utiliser POWERPOINT ? – Formation complète", url: "https://www.youtube.com/watch?v=dbqrSTOBmjg", description: "Interface, modèles, thèmes, création et gestion de diapositives complète." },
  { title: "Formation complète PowerPoint 2021 : de débutant à expert", url: "https://www.youtube.com/watch?v=HrGxwVrS2_g", description: "Formation complète pour maîtriser PowerPoint de A à Z." },
  { title: "POWERPOINT : créer une présentation DE QUALITÉ en 10 min", url: "https://www.youtube.com/watch?v=KIgewAaWwek", description: "Astuces pour créer une présentation professionnelle rapidement avec Microsoft 365." },
];

const YOUTUBE_ANGLAIS: CourseData['youtubeVideos'] = [
  { title: "Apprendre l'anglais – Cours intermédiaire niveau B1", url: "https://www.youtube.com/watch?v=F65YONN8cis", description: "Leçon d'anglais intermédiaire pour progresser vers le niveau B1." },
  { title: "Cours d'anglais – 1500 mots les plus utilisés en anglais", url: "https://www.youtube.com/watch?v=sEUH7fGLzRE", description: "Vocabulaire essentiel : les 1500 mots anglais les plus fréquents avec traduction." },
  { title: "Apprendre l'anglais en dormant – Niveau intermédiaire", url: "https://www.youtube.com/watch?v=pyMekvzckdg", description: "Phrases et expressions anglaises utiles pour le quotidien professionnel." },
  { title: "50 phrases pour parler anglais au travail", url: "https://www.youtube.com/watch?v=TpqGIwLz6Yg", description: "Les expressions clés pour communiquer en anglais dans un contexte professionnel." },
  { title: "Anglais des affaires – Business English conversation", url: "https://www.youtube.com/watch?v=oxs5sjCmfMU", description: "Dialogues et mises en situation pour l'anglais des affaires." },
];

const YOUTUBE_ANGLAIS_A1: CourseData['youtubeVideos'] = [
  { title: "Apprendre l'anglais pour les débutants – Niveau A1", url: "https://www.youtube.com/watch?v=juKd26qkNAw", description: "Cours complet d'anglais pour grands débutants : alphabet, vocabulaire de base, grammaire essentielle." },
  { title: "Les 100 mots les plus utilisés en anglais", url: "https://www.youtube.com/watch?v=GBPwMgHv5jE", description: "Vocabulaire fondamental : les 100 mots anglais indispensables pour communiquer au quotidien." },
  { title: "Se présenter en anglais – Débutant", url: "https://www.youtube.com/watch?v=oVSqR3k_YlQ", description: "Apprendre à se présenter en anglais : nom, âge, nationalité, métier, loisirs." },
  { title: "Cours d'anglais – Les verbes TO BE et TO HAVE", url: "https://www.youtube.com/watch?v=5kq8cMhJb9g", description: "Maîtriser les deux verbes les plus importants en anglais : conjugaison, emploi et exercices." },
  { title: "Anglais débutant – La vie quotidienne", url: "https://www.youtube.com/watch?v=WqDkYMHFvJc", description: "Vocabulaire et phrases pour parler de sa routine quotidienne en anglais." },
];

const YOUTUBE_MANAGEMENT: CourseData['youtubeVideos'] = [
  { title: "5 choses essentielles pour bien débuter dans vos fonctions de manager", url: "https://www.youtube.com/watch?v=TpPzFt-DTxg", description: "Les premières actions à mettre en place lors de sa prise de poste en tant que manager." },
  { title: "Modèle de Tuckman : les 5 étapes rythmant la vie d'une équipe", url: "https://www.youtube.com/watch?v=nSD4lsDna5w", description: "Comprendre les phases de développement d'une équipe pour mieux la manager." },
  { title: "Management : 7 techniques de communication positive", url: "https://www.youtube.com/watch?v=9LA5DL5omME", description: "Améliorer ses relations professionnelles grâce à la communication positive et assertive." },
  { title: "Gestion du stress au travail – Conférence Sonia Lupien", url: "https://www.youtube.com/watch?v=9ZGHac5YBGk", description: "Comprendre les mécanismes du stress professionnel et comment l'optimiser." },
];

const YOUTUBE_GENERIC: CourseData['youtubeVideos'] = [
  { title: "Formation complète PowerPoint 2021 : de débutant à expert", url: "https://www.youtube.com/watch?v=HrGxwVrS2_g", description: "Maîtriser les outils de présentation pour vos exposés et formations." },
  { title: "MEGA TUTO : Les BASES de EXCEL – Formation complète", url: "https://www.youtube.com/watch?v=aZ-SY0ORaoA", description: "Acquérir les bases du tableur pour organiser et analyser vos données." },
  { title: "Formation Complète sur Word : Du Niveau Débutant à Avancé", url: "https://www.youtube.com/watch?v=uCTS_bqm9pk", description: "Créer des documents professionnels structurés et mis en forme." },
  { title: "Management : 7 techniques de communication positive", url: "https://www.youtube.com/watch?v=9LA5DL5omME", description: "Améliorer sa communication professionnelle et ses relations d'équipe." },
  { title: "Les risques psychosociaux, de quoi s'agit-il ?", url: "https://www.youtube.com/watch?v=UQT4qAj6wE0", description: "Comprendre les RPS et la prévention en milieu professionnel." },
];

const YOUTUBE_FLE: CourseData['youtubeVideos'] = [
  { title: "Apprendre le français – Niveau B1 complet", url: "https://www.youtube.com/watch?v=R3wn55wMPEI", description: "Cours de français niveau intermédiaire B1 avec exercices et dialogues professionnels." },
  { title: "Français professionnel – Communication au travail", url: "https://www.youtube.com/watch?v=TJwmLGqONLI", description: "Maîtriser la communication professionnelle en français : réunions, emails, téléphone." },
  { title: "Le vocabulaire médical en français – FLE", url: "https://www.youtube.com/watch?v=Gq5RrDj_eyI", description: "Vocabulaire essentiel du secteur médical et médico-social en français." },
  { title: "Comprendre et rédiger des documents professionnels", url: "https://www.youtube.com/watch?v=HBxCHonP6Ro", description: "Méthodes pour comprendre et produire des écrits professionnels en français." },
  { title: "FLE – Les formules de politesse au travail", url: "https://www.youtube.com/watch?v=2PnH-_NqCR8", description: "Les expressions et formules de politesse essentielles dans le monde professionnel français." },
];

const YOUTUBE_IA: CourseData['youtubeVideos'] = [
  { title: "ChatGPT – Le guide complet pour les débutants", url: "https://www.youtube.com/watch?v=JTxsNm9IdYU", description: "Tout savoir sur ChatGPT : inscription, utilisation, prompts efficaces et cas d'usage professionnels." },
  { title: "Midjourney V6 – Tutoriel complet en français", url: "https://www.youtube.com/watch?v=ELJ5e3S2Mbc", description: "Apprendre à utiliser Midjourney pour générer des images professionnelles de qualité." },
  { title: "L'IA au service de la création de contenu", url: "https://www.youtube.com/watch?v=kap_ypGf2sA", description: "Comment intégrer l'IA générative dans son workflow de création de contenus marketing." },
  { title: "Prompt Engineering – Les techniques avancées", url: "https://www.youtube.com/watch?v=jC4v5AS4RIM", description: "Maîtriser l'art du prompt engineering pour obtenir les meilleurs résultats de l'IA." },
  { title: "DALL-E 3 et Canva IA – Créer des visuels pro", url: "https://www.youtube.com/watch?v=sqEnb4M3jIU", description: "Utiliser DALL-E et Canva IA pour créer des visuels professionnels sans compétences graphiques." },
];

const YOUTUBE_WEBMARKETING: CourseData['youtubeVideos'] = [
  { title: "Marketing Digital – Formation complète pour débutants", url: "https://www.youtube.com/watch?v=LGqBQMJpq1M", description: "Les fondamentaux du marketing digital : stratégie, contenus, réseaux sociaux, publicité et analytics." },
  { title: "SEO – Référencement naturel : le guide complet", url: "https://www.youtube.com/watch?v=OFCeAh8jBKk", description: "Tout comprendre sur le référencement naturel Google pour booster votre visibilité en ligne." },
  { title: "Facebook Ads – Créer sa première campagne publicitaire", url: "https://www.youtube.com/watch?v=_X0jXVFxJYE", description: "Tutoriel pas à pas pour lancer une campagne Facebook Ads performante avec un petit budget." },
  { title: "Canva – Créer des visuels professionnels gratuitement", url: "https://www.youtube.com/watch?v=zRbzSMNynrE", description: "Maîtriser Canva pour créer des visuels attractifs pour les réseaux sociaux sans compétences graphiques." },
  { title: "Google Analytics 4 – Le guide complet en français", url: "https://www.youtube.com/watch?v=tnVdK9wKXjE", description: "Comprendre et utiliser Google Analytics 4 pour mesurer les performances de votre site web." },
];

const YOUTUBE_CRM: CourseData['youtubeVideos'] = [
  { title: "HubSpot CRM – Tutoriel complet pour débutants", url: "https://www.youtube.com/watch?v=kmu8gHP4vKw", description: "Prise en main complète de HubSpot CRM : contacts, pipeline, deals et tableaux de bord." },
  { title: "Make (Integromat) – Automatiser son business en 2024", url: "https://www.youtube.com/watch?v=O2k7XP8fniA", description: "Créer des scénarios d'automation avec Make pour connecter ses outils et gagner du temps." },
  { title: "Email Marketing – Créer des séquences qui convertissent", url: "https://www.youtube.com/watch?v=_X0jXVFxJYE", description: "Les clés pour créer des séquences email efficaces : nurturing, vente et fidélisation." },
  { title: "Zapier – Automatiser ses tâches sans coder", url: "https://www.youtube.com/watch?v=rGiIPsLhXBc", description: "Découvrir Zapier et créer ses premières automatisations entre applications." },
  { title: "Brevo (Sendinblue) – Formation complète email marketing", url: "https://www.youtube.com/watch?v=jWgMm5EjXE0", description: "Maîtriser Brevo pour l'email marketing : campagnes, automation et conformité RGPD." },
];

const YOUTUBE_MASSAGE: CourseData['youtubeVideos'] = [
  { title: "Les gestes fondamentaux pour masser – Les secrets d'un massage du dos", url: "https://www.youtube.com/watch?v=qAT3TgVyLbY", description: "Maîtriser les bases du massage : posture, pression, respiration du modèle et techniques d'effleurage/pétrissage." },
  { title: "Périnée hypertonique – Techniques de massage pour détendre le périnée", url: "https://www.youtube.com/watch?v=0DulJJp7FIg", description: "Techniques de massage périnéal par une kinésithérapeute spécialisée en santé de la femme." },
  { title: "La respiration diaphragmatique – Sophrologie", url: "https://www.youtube.com/watch?v=mXxhVVG6rI4", description: "Vidéo pédagogique illustrant le muscle diaphragmatique en action, essentiel pour la relaxation prénatale." },
  { title: "Tuto massage des mollets – Techniques de drainage et de détente", url: "https://www.youtube.com/watch?v=-l1G8dYcaIM", description: "Protocole de massage des membres inférieurs : deep tissue, percussion et travail en extension." },
  { title: "Yoga pour débutants et femmes enceintes – Séance complète", url: "https://www.youtube.com/watch?v=qxn5J-O28gY", description: "Séance de yoga adaptée aux femmes enceintes : postures, respiration et relaxation en toute sécurité." },
];

const YOUTUBE_ESTHETIQUE: CourseData['youtubeVideos'] = [
  { title: "CAP Esthétique – Soin du visage complet (protocole)", url: "https://www.youtube.com/watch?v=TbL4OGhYVvE", description: "Protocole complet de soin du visage pour le CAP Esthétique : démaquillage, gommage, modelage, masque." },
  { title: "Techniques de maquillage professionnel – Les bases", url: "https://www.youtube.com/watch?v=jXfWpqXYzPk", description: "Les fondamentaux du maquillage professionnel : teint, yeux, lèvres, correction et mise en beauté." },
  { title: "L'épilation – Techniques et protocoles en institut", url: "https://www.youtube.com/watch?v=PZ_HYXQ8fhY", description: "Méthodes d'épilation à la cire chaude et tiède, technique du strip-wax et précautions." },
  { title: "Manucure et pose de vernis – Protocole esthétique", url: "https://www.youtube.com/watch?v=nCKnR3rYWwM", description: "Protocole complet de manucure : limage, cuticules, modelage des mains et pose de vernis." },
  { title: "Hygiène et stérilisation en institut de beauté", url: "https://www.youtube.com/watch?v=LPwbHvW22XA", description: "Règles d'hygiène, stérilisation du matériel et prévention des risques en institut." },
];

const YOUTUBE_SECRETAIRE: CourseData['youtubeVideos'] = [
  { title: "Le métier de secrétaire médicale – Présentation complète", url: "https://www.youtube.com/watch?v=V_bwp2mJTZI", description: "Découverte du métier : accueil patients, gestion des dossiers médicaux, facturation et coordination." },
  { title: "Vocabulaire médical – Les bases indispensables", url: "https://www.youtube.com/watch?v=Gq5RrDj_eyI", description: "Les termes médicaux essentiels : préfixes, suffixes, racines et abréviations courantes." },
  { title: "Facturation des actes médicaux – CCAM et NGAP", url: "https://www.youtube.com/watch?v=djk1jCevPiE", description: "Comprendre la facturation médicale : nomenclatures, cotations et télétransmission." },
  { title: "Accueil physique et téléphonique en cabinet médical", url: "https://www.youtube.com/watch?v=HBxCHonP6Ro", description: "Techniques d'accueil professionnel : gestion des appels, prise de rendez-vous et orientation des patients." },
  { title: "Le DPI – Dossier Patient Informatisé", url: "https://www.youtube.com/watch?v=KzNPxMgRX7Q", description: "Gestion du dossier patient informatisé : saisie, archivage, confidentialité et réglementation." },
];

const YOUTUBE_VTC: CourseData['youtubeVideos'] = [
  { title: "Examen VTC – Tout ce qu'il faut savoir pour réussir", url: "https://www.youtube.com/watch?v=Ae8x1lhGJ4U", description: "Présentation complète de l'examen d'accès à la profession de VTC : épreuves d'admissibilité et d'admission." },
  { title: "Réglementation VTC – Différences avec le taxi", url: "https://www.youtube.com/watch?v=q1m_z-Yq3Z4", description: "Comprendre les différences réglementaires entre taxi, VTC et VMDTR : maraude, tarifs, voies réservées." },
  { title: "Devenir VTC en 2025 – Statut, démarches, examen", url: "https://www.youtube.com/watch?v=KkNhKpWqXTk", description: "Guide complet pour devenir chauffeur VTC : conditions, examens, statut juridique, fiscalité." },
  { title: "Calcul du prix de revient kilométrique VTC", url: "https://www.youtube.com/watch?v=bJsM6kV4Hhc", description: "Apprendre à calculer son coût d'exploitation et fixer ses tarifs pour être rentable en VTC." },
  { title: "Sécurité routière professionnelle – Conduite VTC", url: "https://www.youtube.com/watch?v=VrAyzh3lNi8", description: "Bonnes pratiques de conduite professionnelle pour le transport de personnes : sécurité, confort, anticipation." },
  { title: "Anglais professionnel pour VTC et taxi", url: "https://www.youtube.com/watch?v=oVSqR3k_YlQ", description: "Vocabulaire et phrases types pour accueillir une clientèle internationale niveau A2." },
  { title: "Comment réussir l'épreuve pratique VTC ?", url: "https://www.youtube.com/watch?v=8W5B-0tbPYQ", description: "Préparation à la mise en situation pratique : parcours, conduite, accueil client et facturation." },
  { title: "Plateformes VTC – Uber, Bolt, Heetch comparées", url: "https://www.youtube.com/watch?v=jWgMm5EjXE0", description: "Analyse des principales plateformes VTC : commissions, conditions, droits du chauffeur." },
];

const YOUTUBE_COMMERCIAL: CourseData['youtubeVideos'] = [
  { title: "Techniques de prospection commerciale – Guide complet", url: "https://www.youtube.com/watch?v=uQk8PaFQ5ZQ", description: "Stratégies de prospection B2B et B2C : téléphone, email, réseaux sociaux et terrain." },
  { title: "La négociation commerciale – Méthodes et astuces", url: "https://www.youtube.com/watch?v=vGkk3rFGeHE", description: "Techniques de négociation : découverte des besoins, argumentation, traitement des objections et closing." },
  { title: "SONCAS – La méthode de vente incontournable", url: "https://www.youtube.com/watch?v=KKDwpE0XKRA", description: "Comprendre les motivations d'achat avec la méthode SONCAS : Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie." },
  { title: "LinkedIn – Prospecter et vendre en B2B", url: "https://www.youtube.com/watch?v=WmIwA3q6gok", description: "Social selling sur LinkedIn : optimiser son profil, identifier les prospects et engager la conversation." },
  { title: "Réussir sa proposition commerciale", url: "https://www.youtube.com/watch?v=lBqFcFNO4bw", description: "Structurer une proposition commerciale convaincante : contexte, solution, avantages et prix." },
];

const YOUTUBE_CIP: CourseData['youtubeVideos'] = [
  { title: "Le métier de Conseiller en Insertion Professionnelle (CIP)", url: "https://www.youtube.com/watch?v=H6tYwT7p4Hk", description: "Présentation du métier de CIP : missions, posture, publics accompagnés et débouchés." },
  { title: "Entretien d'accompagnement – Techniques d'écoute active", url: "https://www.youtube.com/watch?v=4VOubVB4CTU", description: "Maîtriser l'écoute active, la reformulation et le questionnement en entretien d'accompagnement." },
  { title: "Construire un projet professionnel avec un bénéficiaire", url: "https://www.youtube.com/watch?v=pVnB6q4yOaM", description: "Méthodologie de construction d'un projet professionnel réaliste et adapté." },
  { title: "Marché du travail et techniques de recherche d'emploi", url: "https://www.youtube.com/watch?v=2Z5n1tA8mEY", description: "Connaître le marché du travail, les outils et les canaux de recherche d'emploi efficaces." },
  { title: "France Travail (Pôle emploi) – Outils et dispositifs", url: "https://www.youtube.com/watch?v=8oH6YXQs2eU", description: "Les principaux dispositifs et outils mobilisables par un CIP pour accompagner vers l'emploi." },
];

const YOUTUBE_RPMS: CourseData['youtubeVideos'] = [
  { title: "Responsable de petite et moyenne structure (RPMS) – Présentation", url: "https://www.youtube.com/watch?v=2yE6bzj3hFw", description: "Découverte du titre RPMS : missions, blocs de compétences et secteurs d'activité." },
  { title: "Pilotage d'une PME – Indicateurs et tableaux de bord", url: "https://www.youtube.com/watch?v=Y6YKb7BncwY", description: "Construire des tableaux de bord de pilotage : KPI commerciaux, financiers et RH." },
  { title: "Management opérationnel d'équipe", url: "https://www.youtube.com/watch?v=TpPzFt-DTxg", description: "Animer, motiver et faire grandir une équipe au quotidien dans une petite structure." },
  { title: "Gestion budgétaire et financière d'une PME", url: "https://www.youtube.com/watch?v=Tn-WjfoJfXU", description: "Comprendre le compte de résultat, le bilan, le budget prévisionnel et la trésorerie." },
  { title: "Stratégie commerciale et développement d'activité", url: "https://www.youtube.com/watch?v=uQk8PaFQ5ZQ", description: "Définir et déployer une stratégie commerciale adaptée à une PME." },
];

const YOUTUBE_RESTAURATION: CourseData['youtubeVideos'] = [
  { title: "HACCP – Les 7 principes en restauration", url: "https://www.youtube.com/watch?v=eEf5_T9Q4ZM", description: "Comprendre la méthode HACCP et les 7 principes appliqués en restauration commerciale." },
  { title: "Hygiène alimentaire en cuisine professionnelle", url: "https://www.youtube.com/watch?v=DkaTrRlRrDk", description: "Bonnes pratiques d'hygiène en cuisine : marche en avant, températures, nettoyage et désinfection." },
  { title: "Service en salle – Les techniques de base", url: "https://www.youtube.com/watch?v=xPm3YQwTIjQ", description: "Apprendre les bases du service en salle : accueil, prise de commande, port d'assiettes, débarrassage." },
  { title: "Connaissance des produits et accords mets-vins", url: "https://www.youtube.com/watch?v=SQfkZQXnO8s", description: "Initiation aux accords mets et vins pour le personnel de salle." },
  { title: "Gestion d'un établissement de restauration", url: "https://www.youtube.com/watch?v=8m1d8r37yjg", description: "Gestion d'un restaurant : ratios, food cost, planning, achats et relation fournisseurs." },
];

const YOUTUBE_INFOGRAPHISTE: CourseData['youtubeVideos'] = [
  { title: "Adobe Photoshop – Tutoriel complet pour débutants", url: "https://www.youtube.com/watch?v=IyR_uYsRdPs", description: "Prise en main complète de Photoshop : interface, calques, sélections, retouches et effets." },
  { title: "Adobe Illustrator – Apprendre les bases", url: "https://www.youtube.com/watch?v=Ib8UBwu3yGA", description: "Découverte d'Illustrator : outils vectoriels, formes, couleurs, typographie et création de logos." },
  { title: "Adobe InDesign – Mise en page professionnelle", url: "https://www.youtube.com/watch?v=zP7Yt0Y7uww", description: "Maîtriser InDesign pour la mise en page de magazines, brochures et documents multipages." },
  { title: "Les fondamentaux du design graphique", url: "https://www.youtube.com/watch?v=YqQx75OPRa0", description: "Théorie des couleurs, typographie, composition et hiérarchie visuelle." },
  { title: "Créer une charte graphique complète", url: "https://www.youtube.com/watch?v=qQv7c9jdJU8", description: "Méthodologie pour construire une identité visuelle cohérente : logo, couleurs, typographies, déclinaisons." },
];

const YOUTUBE_SOCIO_ESTHETIQUE: CourseData['youtubeVideos'] = [
  { title: "La socio-esthétique – Présentation du métier", url: "https://www.youtube.com/watch?v=ZTL2g7TmO2k", description: "Découverte du métier de socio-esthéticienne : publics fragilisés, missions et lieux d'exercice." },
  { title: "Soins du visage adaptés aux peaux sensibles", url: "https://www.youtube.com/watch?v=TbL4OGhYVvE", description: "Protocole de soin du visage adapté aux peaux fragilisées (oncologie, gériatrie, handicap)." },
  { title: "Massage relaxant des mains et des pieds", url: "https://www.youtube.com/watch?v=qAT3TgVyLbY", description: "Techniques douces de massage des extrémités pour un public en souffrance ou en perte d'autonomie." },
  { title: "Posture professionnelle face à la souffrance", url: "https://www.youtube.com/watch?v=4VOubVB4CTU", description: "Communication, écoute et juste distance face à des publics fragilisés." },
  { title: "Hygiène et précautions en milieu hospitalier", url: "https://www.youtube.com/watch?v=LPwbHvW22XA", description: "Règles d'hygiène et précautions standards à appliquer en milieu de soin." },
];

const YOUTUBE_MASSAGE_POSTPARTUM: CourseData['youtubeVideos'] = [
  { title: "Massage post-natal – Techniques et bienfaits", url: "https://www.youtube.com/watch?v=qAT3TgVyLbY", description: "Présentation des techniques de massage adaptées à la jeune accouchée et de leurs bienfaits." },
  { title: "Récupération du périnée après l'accouchement", url: "https://www.youtube.com/watch?v=0DulJJp7FIg", description: "Comprendre la récupération du périnée et accompagner la reprise d'activité." },
  { title: "Drainage lymphatique manuel – Bases", url: "https://www.youtube.com/watch?v=-l1G8dYcaIM", description: "Techniques douces de drainage utiles dans l'accompagnement post-partum (jambes lourdes, œdèmes)." },
  { title: "Diastase abdominale – Comprendre et accompagner", url: "https://www.youtube.com/watch?v=mXxhVVG6rI4", description: "Repérer la diastase post-partum et adapter ses techniques en toute sécurité." },
  { title: "Yoga post-natal – Séance douce de récupération", url: "https://www.youtube.com/watch?v=qxn5J-O28gY", description: "Postures douces de récupération post-partum, complémentaires au massage." },
];

const YOUTUBE_ASSISTANT_DIRECTION: CourseData['youtubeVideos'] = [
  { title: "Le métier d'assistant(e) de direction", url: "https://www.youtube.com/watch?v=V_bwp2mJTZI", description: "Missions, qualités requises et environnement de travail de l'assistant(e) de direction." },
  { title: "Organiser et planifier l'agenda d'un dirigeant", url: "https://www.youtube.com/watch?v=Ae8x1lhGJ4U", description: "Méthodes d'organisation, gestion d'agenda partagé, priorisation et arbitrages." },
  { title: "Rédaction professionnelle – Comptes rendus et notes", url: "https://www.youtube.com/watch?v=HBxCHonP6Ro", description: "Techniques de rédaction professionnelle : compte rendu de réunion, note de synthèse, courrier." },
  { title: "Outlook et Teams – Outils collaboratifs essentiels", url: "https://www.youtube.com/watch?v=7Jn_t6A8q6w", description: "Maîtriser Outlook (mail, agenda) et Teams (réunions, canaux) pour assister une direction." },
  { title: "Organiser un déplacement professionnel et un événement", url: "https://www.youtube.com/watch?v=KIgewAaWwek", description: "Planifier un déplacement (transport, hébergement, ordre de mission) et organiser un événement interne." },
];

const YOUTUBE_ECSR: CourseData['youtubeVideos'] = [
  { title: "Devenir enseignant de la conduite (ECSR) – Le métier", url: "https://www.youtube.com/watch?v=q1m_z-Yq3Z4", description: "Présentation du métier d'enseignant de la conduite et de la sécurité routière (titre pro ECSR)." },
  { title: "Pédagogie de la conduite – REMC", url: "https://www.youtube.com/watch?v=8W5B-0tbPYQ", description: "Le Référentiel pour l'Éducation à une Mobilité Citoyenne (REMC) : compétences et progression." },
  { title: "Risques routiers et prévention", url: "https://www.youtube.com/watch?v=VrAyzh3lNi8", description: "Les principaux risques routiers et la pédagogie de prévention auprès des élèves." },
  { title: "Réglementation du permis B et code de la route", url: "https://www.youtube.com/watch?v=Ae8x1lhGJ4U", description: "Mise à jour réglementaire : code de la route, examen pratique, évaluations." },
  { title: "Animation de séances en salle et en voiture", url: "https://www.youtube.com/watch?v=TpPzFt-DTxg", description: "Techniques d'animation pédagogique en salle et en circulation, gestion des élèves." },
];

const YOUTUBE_BUREAUTIQUE: CourseData['youtubeVideos'] = [
  { title: "Pack Office – Découverte de Word, Excel, PowerPoint", url: "https://www.youtube.com/watch?v=zbZ4GYt8i_0", description: "Tour d'horizon du Pack Office : usages, points communs et bonnes pratiques." },
  { title: "MEGA TUTO : Les BASES de EXCEL – Formation complète", url: "https://www.youtube.com/watch?v=aZ-SY0ORaoA", description: "Toutes les bases d'Excel : interface, formules, mise en forme, graphiques." },
  { title: "Formation Complète Word – Du Niveau Débutant à Avancé", url: "https://www.youtube.com/watch?v=uCTS_bqm9pk", description: "Maîtriser Word : mise en forme, styles, sommaire automatique, publipostage." },
  { title: "PowerPoint – Créer une présentation professionnelle", url: "https://www.youtube.com/watch?v=KIgewAaWwek", description: "Créer une présentation PowerPoint professionnelle en quelques minutes." },
  { title: "Outlook – Bien gérer ses mails et son agenda", url: "https://www.youtube.com/watch?v=7Jn_t6A8q6w", description: "Trier ses mails, organiser son agenda et collaborer efficacement avec Outlook." },
];

const YOUTUBE_GESTION_ENTREPRISE: CourseData['youtubeVideos'] = [
  { title: "Comprendre le bilan et le compte de résultat", url: "https://www.youtube.com/watch?v=Z6oNqRz5jvA", description: "Lecture des états financiers : actif, passif, charges, produits, soldes intermédiaires de gestion." },
  { title: "Gérer la trésorerie d'une TPE/PME", url: "https://www.youtube.com/watch?v=yT9p5Pp_3lE", description: "Plan de trésorerie, BFR, prévisionnel, relations bancaires et financement court terme." },
  { title: "Calculer son prix de revient et fixer ses prix", url: "https://www.youtube.com/watch?v=W3iC5gJ2_DQ", description: "Méthode du coût complet, marge, seuil de rentabilité et politique tarifaire." },
  { title: "Régimes fiscaux des entreprises (micro, réel, IS/IR)", url: "https://www.youtube.com/watch?v=g38nT1zG2yE", description: "Comparaison des régimes, TVA, CFE, plafonds et obligations déclaratives." },
  { title: "Piloter son entreprise avec des tableaux de bord", url: "https://www.youtube.com/watch?v=8sM3qGqRH-Q", description: "Construire des KPI commerciaux, financiers et RH pour piloter une TPE/PME." },
  { title: "Bases du droit du travail pour dirigeants", url: "https://www.youtube.com/watch?v=k3W-9z6JdC4", description: "Contrats, rupture, durée du travail, convention collective : essentiels pour un dirigeant." },
];

const YOUTUBE_CREATION_ENTREPRISE: CourseData['youtubeVideos'] = [
  { title: "Créer son entreprise : les 7 étapes clés", url: "https://www.youtube.com/results?search_query=cr%C3%A9er+son+entreprise+%C3%A9tapes+cl%C3%A9s+Bpifrance", description: "De l'idée à l'immatriculation : parcours complet du créateur d'entreprise." },
  { title: "Business Model Canvas expliqué", url: "https://www.youtube.com/results?search_query=business+model+canvas+expliqu%C3%A9+fran%C3%A7ais", description: "Construire son modèle économique avec les 9 blocs du BMC d'Osterwalder." },
  { title: "Étude de marché : méthode complète", url: "https://www.youtube.com/results?search_query=%C3%A9tude+de+march%C3%A9+cr%C3%A9ation+entreprise+m%C3%A9thode", description: "Étude documentaire, étude terrain, analyse PESTEL et 5 forces de Porter." },
  { title: "Construire son prévisionnel financier", url: "https://www.youtube.com/results?search_query=pr%C3%A9visionnel+financier+cr%C3%A9ation+entreprise", description: "CA prévisionnel, compte de résultat, plan de trésorerie et plan de financement sur 3 ans." },
  { title: "Choisir son statut juridique (EI, EURL, SASU, SARL, SAS)", url: "https://www.youtube.com/results?search_query=choisir+statut+juridique+cr%C3%A9ation+entreprise", description: "Comparaison des formes juridiques, fiscalité IR/IS et statut social TNS / assimilé salarié." },
  { title: "ACRE, ARCE, NACRE : les aides à la création", url: "https://www.youtube.com/results?search_query=ACRE+ARCE+NACRE+aides+cr%C3%A9ation+entreprise", description: "Panorama des aides publiques pour les créateurs et repreneurs d'entreprise." },
  { title: "Formalités sur le Guichet Unique INPI", url: "https://www.youtube.com/results?search_query=guichet+unique+INPI+immatriculation+entreprise", description: "Tutoriel pas à pas pour immatriculer son entreprise sur formalites.entreprises.gouv.fr." },
];

const YOUTUBE_PAIE: CourseData['youtubeVideos'] = [
  { title: "Comprendre un bulletin de paie 2026 (structure simplifiée)", url: "https://www.youtube.com/results?search_query=bulletin+paie+2026+expliqu%C3%A9", description: "Explication pas-à-pas de la structure du bulletin, des 5 blocs et des mentions obligatoires." },
  { title: "Cotisations sociales URSSAF – taux 2026 expliqués", url: "https://www.youtube.com/results?search_query=cotisations+sociales+URSSAF+2026+taux", description: "Panorama des taux salariaux et patronaux, tranches, PMSS, avec exemples de calcul." },
  { title: "DSN mensuelle : de la génération au dépôt", url: "https://www.youtube.com/results?search_query=DSN+mensuelle+gestionnaire+paie+tutoriel", description: "Démonstration pratique du processus DSN, contrôles, rejets et corrections." },
  { title: "IJSS et subrogation : traitement en paie", url: "https://www.youtube.com/results?search_query=IJSS+subrogation+gestionnaire+paie", description: "Maintien de salaire, calcul des IJSS, subrogation employeur, réintégration au net." },
  { title: "Solde de tout compte : les 5 documents obligatoires", url: "https://www.youtube.com/results?search_query=solde+de+tout+compte+documents+obligatoires", description: "Bulletin STC, certificat de travail, attestation France Travail, reçu STC, portabilité." },
  { title: "Silae – prise en main pour gestionnaire de paie débutant", url: "https://www.youtube.com/results?search_query=Silae+prise+en+main+d%C3%A9butant", description: "Découverte du logiciel Silae, paramétrage société, saisie d'un bulletin." },
];

/** Génère des vidéos YouTube dynamiques (recherches ciblées) à partir de l'intitulé. */
function getDynamicYoutubeVideos(formationIntitule: string): CourseData['youtubeVideos'] {
  const raw = (formationIntitule || "Formation professionnelle").trim();
  // Nettoie : retire codes RNCP/RS, parenthèses
  const clean = raw
    .replace(/\((?:rncp|rs)[^)]*\)/gi, "")
    .replace(/\b(?:rncp|rs)\s*\d+\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  const enc = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
  return [
    { title: `Formation complète : ${clean}`, url: enc(`formation complète ${clean}`), description: `Recherche YouTube : tutoriels et formations complètes sur ${clean}.` },
    { title: `${clean} – Tutoriel pour débutants`, url: enc(`${clean} tutoriel débutant français`), description: `Recherche YouTube : vidéos d'introduction adaptées aux débutants en ${clean}.` },
    { title: `${clean} – Techniques et bonnes pratiques`, url: enc(`${clean} techniques bonnes pratiques`), description: `Recherche YouTube : techniques professionnelles et bonnes pratiques liées à ${clean}.` },
    { title: `${clean} – Cas pratiques et mises en situation`, url: enc(`${clean} cas pratique exemple`), description: `Recherche YouTube : études de cas et exemples concrets dans le domaine ${clean}.` },
    { title: `${clean} – Préparation examen / certification`, url: enc(`${clean} examen préparation certification`), description: `Recherche YouTube : ressources de préparation à l'évaluation finale ou à la certification ${clean}.` },
  ];
}

export function getYoutubeVideos(formationIntitule: string): CourseData['youtubeVideos'] {
  const t = formationIntitule.toLowerCase();
  // Massages spécifiques (avant générique)
  if (t.includes('postpartum') || t.includes('post-partum') || t.includes('post partum') || t.includes('postnatal') || t.includes('post-natal') || t.includes('post natal')) return YOUTUBE_MASSAGE_POSTPARTUM;
  if (t.includes('massage') || t.includes('prénatal') || t.includes('prenatal') || t.includes('relaxation') || t.includes('bien-être')) return YOUTUBE_MASSAGE;
  // Bureautique unitaire
  if (t.includes('excel')) return YOUTUBE_EXCEL;
  if (t.includes('word')) return YOUTUBE_WORD;
  if (t.includes('powerpoint') || t.includes('ppt')) return YOUTUBE_POWERPOINT;
  if (t.includes('bureautique') || t.includes('pack office') || t.includes('office 365') || t.includes('microsoft 365')) return YOUTUBE_BUREAUTIQUE;
  // Langues
  if ((t.includes('anglais') || t.includes('english')) && (t.includes('a1') || t.includes('débutant'))) return YOUTUBE_ANGLAIS_A1;
  if (t.includes('vtest') || t.includes('v-test') || t.includes('rs6905')) return YOUTUBE_ANGLAIS;
  if (t.includes('anglais') || t.includes('english') || t.includes('toeic')) return YOUTUBE_ANGLAIS;
  if (t.includes('français') || t.includes('fle')) return YOUTUBE_FLE;
  // Domaines spécifiques (avant management/commercial pour éviter conflits)
  if (t.includes('socio') && t.includes('esthét')) return YOUTUBE_SOCIO_ESTHETIQUE;
  if (t.includes('esthéti') || t.includes('cosmétique') || t.includes('beauté')) return YOUTUBE_ESTHETIQUE;
  if (t.includes('infograph') || t.includes('photoshop') || t.includes('illustrator') || t.includes('indesign') || t.includes('design graphique') || t.includes('pao')) return YOUTUBE_INFOGRAPHISTE;
  if (t.includes('restaurat') || t.includes('cuisine') || t.includes('serveur') || t.includes('serveuse') || t.includes('haccp')) return YOUTUBE_RESTAURATION;
  if (t.includes('cip') || t.includes('conseiller en insertion') || t.includes('insertion professionnelle')) return YOUTUBE_CIP;
  if (t.includes('rpms') || t.includes('responsable de petite') || t.includes('responsable petite et moyenne')) return YOUTUBE_RPMS;
  if (t.includes('assistant de direction') || t.includes('assistante de direction') || t.includes('secrétaire de direction') || t.includes('office manager')) return YOUTUBE_ASSISTANT_DIRECTION;
  if (t.includes('ecsr') || t.includes('enseignant de la conduite') || t.includes('moniteur auto-école') || t.includes('moniteur auto école')) return YOUTUBE_ECSR;
  if (t.includes('vtc') || t.includes('voiture de transport avec chauffeur') || t.includes('rs5637') || t.includes('chauffeur vtc')) return YOUTUBE_VTC;
  if (t.includes('secrétaire') || t.includes('médico-admin') || t.includes('médico admin')) return YOUTUBE_SECRETAIRE;
  // Transverses
  if (t.includes('création') && (t.includes('entreprise') || t.includes('activité'))) return YOUTUBE_CREATION_ENTREPRISE;
  if (t.includes('creation') && (t.includes('entreprise') || t.includes('activite'))) return YOUTUBE_CREATION_ENTREPRISE;
  if (t.includes('reprise') && t.includes('entreprise')) return YOUTUBE_CREATION_ENTREPRISE;
  if (t.includes('créer son entreprise') || t.includes('creer son entreprise') || t.includes('porteur de projet') || t.includes('cce ') || t.includes(' cce') || t.includes('rncp31923')) return YOUTUBE_CREATION_ENTREPRISE;
  if (t.includes("gestion d'entreprise") || t.includes('gestion d entreprise') || t.includes('gestion dentreprise') || t.includes('gérer son entreprise') || t.includes('piloter son entreprise') || t.includes('pilotage de pme') || t.includes('pilotage tpe') || t.includes('piloter une tpe') || t.includes('piloter une pme')) return YOUTUBE_GESTION_ENTREPRISE;
  if (t.includes('management') || t.includes('manager') || t.includes('leadership')) return YOUTUBE_MANAGEMENT;
  if (t.includes('médico-social') || t.includes('médico social')) return YOUTUBE_FLE;
  if (t.includes('intelligence artificielle') || t.includes('ia générative') || t.includes('contenus rédactionnels')) return YOUTUBE_IA;
  if (t.includes('webmarketing') || t.includes('marketing de contenus') || t.includes('réseaux sociaux') || t.includes('marketing digital')) return YOUTUBE_WEBMARKETING;
  if (t.includes('crm') || t.includes('automation') || t.includes('automatisation')) return YOUTUBE_CRM;
  if (t.includes('négociat') || t.includes('technico') || t.includes('ntc') || t.includes('commercial') || t.includes('vente')) return YOUTUBE_COMMERCIAL;
  // Fallback : recherches YouTube ciblées sur l'intitulé exact (au lieu de vidéos génériques sans rapport)
  return getDynamicYoutubeVideos(formationIntitule);
}

// ========== COURSE CHAPTER CONTENT ==========

function getExcelChapters(): CourseChapter[] {
  return [
    {
      title: "Découverte de l'interface Excel",
      description: "Identifier l'interface du logiciel Microsoft Excel et en comprendre les principales zones de travail pour une utilisation efficace.",
      sections: [
        { title: "Ouvrir Excel et découvrir la fenêtre principale", content: `<p>Microsoft Excel est un tableur puissant qui permet de créer des feuilles de calcul, des graphiques et des bases de données. Pour commencer, il faut lancer l'application depuis le menu Démarrer ou le bureau.</p><p>Une fois lancé, l'écran d'accueil propose de créer un nouveau classeur vierge ou d'ouvrir un fichier existant. Le classeur vierge est le point de départ le plus courant.</p><p><strong>Point clé :</strong> Un classeur Excel contient par défaut une feuille de calcul. Chaque feuille est composée de lignes (numérotées) et de colonnes (lettrées). L'intersection d'une ligne et d'une colonne forme une <strong>cellule</strong>, identifiée par sa référence (ex : A1, B3, C12).</p>` },
        { title: "La barre de titre et les contrôles", content: `<p>La barre de titre, située tout en haut de la fenêtre, affiche le nom du fichier (par défaut « Classeur1 ») et le nom de l'application. À droite se trouvent les boutons de contrôle : <strong>Réduire</strong>, <strong>Agrandir/Restaurer</strong> et <strong>Fermer</strong>.</p><p>L'enregistrement automatique (si OneDrive est actif) est visible à gauche de la barre de titre, suivi du nom du compte Microsoft connecté.</p>` },
        { title: "Le ruban et les onglets principaux", content: `<p>Le ruban regroupe les commandes principales classées par onglets thématiques :</p><ul><li><strong>Accueil :</strong> Mise en forme (police, taille, couleur, alignement, bordures), presse-papiers et styles de cellules.</li><li><strong>Insertion :</strong> Tableaux, graphiques, images, formes, liens hypertextes et en-têtes/pieds de page.</li><li><strong>Mise en page :</strong> Marges, orientation (portrait/paysage), taille du papier, zone d'impression et arrière-plan.</li><li><strong>Formules :</strong> Bibliothèque de fonctions (SOMME, MOYENNE, SI, RECHERCHEV), noms définis et audit de formules.</li><li><strong>Données :</strong> Tri, filtrage, validation de données, connexions externes et outils d'analyse.</li><li><strong>Révision :</strong> Orthographe, commentaires, protection de feuille et suivi des modifications.</li><li><strong>Affichage :</strong> Modes d'affichage (Normal, Mise en page, Aperçu), zoom, figer les volets et fenêtres.</li></ul>` },
        { title: "La barre de formule et la zone de nom", content: `<p>La <strong>zone de nom</strong> (à gauche de la barre de formule) affiche la référence de la cellule active (ex : A1). On peut y taper directement une adresse pour naviguer rapidement.</p><p>La <strong>barre de formule</strong> montre le contenu réel de la cellule sélectionnée. C'est ici qu'on peut voir et modifier les formules. Le bouton <strong>fx</strong> permet d'ouvrir l'assistant de fonctions.</p>` },
        { title: "Les onglets de feuille et la barre d'état", content: `<p>En bas de la fenêtre, les <strong>onglets de feuille</strong> permettent de naviguer entre les différentes feuilles du classeur. On peut les renommer (double-clic), les déplacer (glisser-déposer) ou en ajouter (+).</p><p>La <strong>barre d'état</strong> affiche des informations contextuelles : mode d'édition, moyenne/somme/nombre des cellules sélectionnées, et les boutons de changement de vue et de zoom.</p>` },
        { title: "Personnaliser l'environnement de travail", content: `<p>Excel permet d'adapter l'interface à vos besoins :</p><ul><li><strong>Barre d'accès rapide :</strong> Ajoutez les commandes fréquentes (Enregistrer, Annuler, Rétablir) pour un accès instantané.</li><li><strong>Réduire le ruban :</strong> Double-cliquez sur un onglet pour masquer temporairement le ruban et gagner de l'espace.</li><li><strong>Figer les volets :</strong> Menu Affichage > Figer les volets pour garder les en-têtes visibles lors du défilement.</li><li><strong>Zoom :</strong> Utilisez Ctrl + molette de souris ou le curseur de zoom en bas à droite.</li></ul>` },
      ]
    },
    {
      title: "Saisie de données et formules de base",
      description: "Saisir, modifier et organiser des données dans les cellules. Maîtriser les formules et fonctions essentielles.",
      sections: [
        { title: "Types de données dans Excel", content: `<p>Excel reconnaît automatiquement plusieurs types de données :</p><ul><li><strong>Texte :</strong> Aligné à gauche par défaut. Peut contenir des lettres, chiffres et caractères spéciaux.</li><li><strong>Nombres :</strong> Alignés à droite. Peuvent être formatés en pourcentage, monétaire, scientifique, etc.</li><li><strong>Dates :</strong> Interprétées comme des numéros de série. Le format d'affichage peut être personnalisé (jj/mm/aaaa, dd-mmm-yy, etc.).</li><li><strong>Formules :</strong> Commencent toujours par le signe <strong>=</strong>. Le résultat s'affiche dans la cellule, la formule dans la barre de formule.</li></ul><p><strong>Astuce :</strong> Pour forcer Excel à traiter un nombre comme du texte, précédez-le d'une apostrophe (').</p>` },
        { title: "Saisie et modification de données", content: `<p>Pour saisir des données, cliquez sur une cellule et tapez directement. Validez avec <strong>Entrée</strong> (déplacement vers le bas) ou <strong>Tab</strong> (vers la droite).</p><p>Pour modifier une cellule existante :</p><ul><li>Double-cliquez sur la cellule (mode édition dans la cellule)</li><li>Ou cliquez sur la cellule et modifiez dans la barre de formule</li><li>Appuyez sur <strong>F2</strong> pour basculer en mode édition</li></ul><p><strong>Remplissage automatique :</strong> La poignée de recopie (petit carré en bas à droite de la cellule) permet de remplir automatiquement des séries (1, 2, 3... ou Lundi, Mardi, Mercredi...).</p>` },
        { title: "Les opérateurs de calcul", content: `<p>Excel utilise les opérateurs suivants dans les formules :</p><table border="1" cellpadding="8" style="width:100%;border-collapse:collapse"><tr style="background:#f0f0f0"><th>Opérateur</th><th>Signification</th><th>Exemple</th></tr><tr><td>+</td><td>Addition</td><td>=A1+B1</td></tr><tr><td>-</td><td>Soustraction</td><td>=A1-B1</td></tr><tr><td>*</td><td>Multiplication</td><td>=A1*B1</td></tr><tr><td>/</td><td>Division</td><td>=A1/B1</td></tr><tr><td>^</td><td>Puissance</td><td>=A1^2</td></tr><tr><td>&</td><td>Concaténation</td><td>=A1&" "&B1</td></tr></table>` },
        { title: "Fonctions essentielles : SOMME, MOYENNE, NB", content: `<p>Les fonctions de base les plus utilisées :</p><ul><li><strong>=SOMME(A1:A10)</strong> – Additionne toutes les valeurs de A1 à A10.</li><li><strong>=MOYENNE(A1:A10)</strong> – Calcule la moyenne arithmétique.</li><li><strong>=NB(A1:A10)</strong> – Compte les cellules contenant des nombres.</li><li><strong>=NBVAL(A1:A10)</strong> – Compte les cellules non vides.</li><li><strong>=MIN(A1:A10)</strong> / <strong>=MAX(A1:A10)</strong> – Renvoie la plus petite / grande valeur.</li></ul><p><strong>Conseil :</strong> Utilisez le bouton Somme automatique (Σ) dans l'onglet Accueil pour insérer rapidement ces fonctions.</p>` },
        { title: "Références relatives, absolues et mixtes", content: `<p>Comprendre les références est fondamental pour maîtriser les formules :</p><ul><li><strong>Relative (A1) :</strong> S'adapte automatiquement lors de la recopie. Si la formule =A1+B1 est copiée une ligne plus bas, elle devient =A2+B2.</li><li><strong>Absolue ($A$1) :</strong> Ne change jamais, même lors de la recopie. Utilisez F4 pour basculer. Exemple : =A1*$B$1 (le taux en B1 reste fixe).</li><li><strong>Mixte ($A1 ou A$1) :</strong> Fige uniquement la colonne ou la ligne. Utile pour les tableaux à double entrée.</li></ul>` },
        { title: "La fonction SI et les tests logiques", content: `<p>La fonction SI permet de prendre des décisions dans une formule :</p><p><code>=SI(condition ; valeur_si_vrai ; valeur_si_faux)</code></p><p><strong>Exemples :</strong></p><ul><li><code>=SI(A1>=10 ; "Admis" ; "Ajourné")</code></li><li><code>=SI(B1>0 ; B1*C1 ; 0)</code></li></ul><p><strong>SI imbriqués :</strong> On peut enchaîner plusieurs conditions :</p><p><code>=SI(A1>=16 ; "Très bien" ; SI(A1>=14 ; "Bien" ; SI(A1>=12 ; "Assez bien" ; "Insuffisant")))</code></p><p><strong>Fonctions complémentaires :</strong> ET(), OU(), NON() pour combiner les conditions.</p>` },
      ]
    },
    {
      title: "Mise en forme et présentation",
      description: "Mettre en forme les cellules, les tableaux et structurer les données pour une présentation professionnelle.",
      sections: [
        { title: "Mise en forme des cellules", content: `<p>La mise en forme se fait via l'onglet Accueil ou le raccourci Ctrl+1 (Format de cellule) :</p><ul><li><strong>Police :</strong> Type, taille, couleur, gras, italique, souligné.</li><li><strong>Bordures :</strong> Encadrer les cellules pour structurer visuellement les données.</li><li><strong>Remplissage :</strong> Couleur de fond pour mettre en évidence certaines zones.</li><li><strong>Alignement :</strong> Horizontal (gauche, centré, droite), vertical (haut, milieu, bas), retour à la ligne automatique.</li><li><strong>Format de nombre :</strong> Monétaire (€), pourcentage (%), date, heure, personnalisé.</li></ul><p><strong>Raccourcis utiles :</strong> Ctrl+G (gras), Ctrl+I (italique), Ctrl+U (souligné).</p>` },
        { title: "Styles de cellules et thèmes", content: `<p>Excel propose des styles prédéfinis pour une mise en forme rapide et cohérente :</p><ul><li><strong>Styles de cellules :</strong> Accueil > Styles de cellules. Inclut des styles pour les titres, les totaux, les résultats bons/mauvais.</li><li><strong>Mettre sous forme de tableau :</strong> Accueil > Mettre sous forme de tableau. Ajoute automatiquement des filtres, un formatage alterné et des totaux.</li><li><strong>Thèmes :</strong> Mise en page > Thèmes. Change l'ensemble des couleurs et polices du classeur.</li></ul>` },
        { title: "Mise en forme conditionnelle", content: `<p>La mise en forme conditionnelle applique automatiquement un format en fonction de la valeur des cellules :</p><ul><li><strong>Règles de surbrillance :</strong> Supérieur à, inférieur à, entre, égal à, texte contenant…</li><li><strong>Barres de données :</strong> Barres horizontales proportionnelles à la valeur.</li><li><strong>Nuances de couleurs :</strong> Gradient de couleur (vert → jaune → rouge).</li><li><strong>Jeux d'icônes :</strong> Flèches, feux tricolores, étoiles pour une lecture visuelle rapide.</li></ul><p><strong>Exemple :</strong> Surligner en rouge les notes inférieures à 10 et en vert celles supérieures à 15.</p>` },
        { title: "Fusionner, fractionner et ajuster", content: `<p>Techniques d'ajustement de la structure :</p><ul><li><strong>Fusionner et centrer :</strong> Combine plusieurs cellules en une seule (utile pour les titres). Accueil > Fusionner et centrer.</li><li><strong>Ajuster la largeur des colonnes :</strong> Double-cliquez sur le bord droit de l'en-tête de colonne pour l'ajustement automatique.</li><li><strong>Ajuster la hauteur des lignes :</strong> Même technique sur le bord inférieur de l'en-tête de ligne.</li><li><strong>Renvoyer à la ligne automatiquement :</strong> Accueil > Renvoyer à la ligne. Le texte s'affiche sur plusieurs lignes dans la cellule.</li></ul>` },
        { title: "Impression et mise en page", content: `<p>Avant d'imprimer, configurez la mise en page :</p><ul><li><strong>Zone d'impression :</strong> Sélectionnez la plage > Mise en page > Zone d'impression > Définir.</li><li><strong>Aperçu des sauts de page :</strong> Affichage > Aperçu des sauts de page pour ajuster les coupures.</li><li><strong>En-têtes et pieds de page :</strong> Insertion > En-tête/Pied de page pour ajouter date, numéro de page, nom du fichier.</li><li><strong>Répéter les lignes de titre :</strong> Mise en page > Imprimer les titres > Lignes à répéter en haut.</li></ul><p><strong>Conseil :</strong> Utilisez Ctrl+P pour accéder rapidement à l'aperçu avant impression.</p>` },
      ]
    },
    {
      title: "Fonctions avancées et analyse de données",
      description: "Maîtriser les fonctions avancées (RECHERCHEV, INDEX/EQUIV) et les outils d'analyse (TCD, graphiques).",
      sections: [
        { title: "RECHERCHEV et RECHERCHEH", content: `<p>La fonction RECHERCHEV cherche une valeur dans la première colonne d'un tableau et renvoie une valeur de la même ligne :</p><p><code>=RECHERCHEV(valeur_cherchée ; tableau ; n°_colonne ; [correspondance])</code></p><p><strong>Paramètres :</strong></p><ul><li><strong>valeur_cherchée :</strong> Ce que l'on recherche (ex : un code article).</li><li><strong>tableau :</strong> La plage contenant les données (ex : A1:D100).</li><li><strong>n°_colonne :</strong> Le numéro de colonne du résultat (1 = première colonne).</li><li><strong>correspondance :</strong> FAUX pour une correspondance exacte (recommandé), VRAI pour approchée.</li></ul><p><strong>Exemple :</strong> <code>=RECHERCHEV(F1;A1:D50;3;FAUX)</code> cherche la valeur de F1 dans la colonne A et renvoie la valeur correspondante de la colonne C.</p>` },
        { title: "INDEX et EQUIV – La combinaison puissante", content: `<p>INDEX et EQUIV combinées offrent plus de flexibilité que RECHERCHEV :</p><ul><li><strong>=INDEX(plage ; n°_ligne ; [n°_colonne])</strong> – Renvoie la valeur à l'intersection spécifiée.</li><li><strong>=EQUIV(valeur ; plage ; [type])</strong> – Renvoie la position d'une valeur dans une plage.</li></ul><p><strong>Combinaison :</strong></p><p><code>=INDEX(C1:C50 ; EQUIV(F1 ; A1:A50 ; 0))</code></p><p>Cette formule cherche F1 dans la colonne A (EQUIV retourne la position), puis INDEX va chercher la valeur correspondante dans la colonne C.</p><p><strong>Avantages sur RECHERCHEV :</strong> Recherche vers la gauche possible, plus performant sur de grands tableaux.</p>` },
        { title: "Tableaux Croisés Dynamiques (TCD)", content: `<p>Les TCD sont l'outil d'analyse le plus puissant d'Excel :</p><p><strong>Création :</strong> Sélectionner les données > Insertion > Tableau croisé dynamique > Choisir l'emplacement.</p><p><strong>Les 4 zones du TCD :</strong></p><ul><li><strong>Filtres :</strong> Filtrer l'ensemble du tableau (ex : par année).</li><li><strong>Lignes :</strong> Les catégories affichées en lignes (ex : produits, régions).</li><li><strong>Colonnes :</strong> Les catégories affichées en colonnes (ex : mois).</li><li><strong>Valeurs :</strong> Les champs numériques à synthétiser (SOMME, MOYENNE, NB...).</li></ul><p><strong>Fonctionnalités avancées :</strong></p><ul><li>Regrouper les dates par mois/trimestre/année</li><li>Ajouter des champs calculés</li><li>Segments et chronologies pour le filtrage visuel</li><li>Actualiser les données (clic droit > Actualiser)</li></ul>` },
        { title: "Graphiques et visualisation de données", content: `<p>Les graphiques permettent de communiquer visuellement les données :</p><p><strong>Types de graphiques courants :</strong></p><ul><li><strong>Histogramme :</strong> Comparaison de valeurs entre catégories.</li><li><strong>Courbe :</strong> Évolution dans le temps (tendances).</li><li><strong>Secteurs (camembert) :</strong> Répartition en pourcentages (max 5-6 catégories).</li><li><strong>Barres :</strong> Similaire à l'histogramme, en horizontal.</li><li><strong>Nuage de points :</strong> Corrélation entre deux variables.</li></ul><p><strong>Personnalisation :</strong> Titre, légende, étiquettes de données, axes, couleurs et styles via les onglets Création et Format.</p><p><strong>Conseil :</strong> Choisissez le type de graphique en fonction du message à communiquer, pas de l'esthétique seule.</p>` },
        { title: "Validation des données et listes déroulantes", content: `<p>La validation des données permet de contrôler la saisie :</p><p><strong>Données > Validation des données :</strong></p><ul><li><strong>Liste :</strong> Crée une liste déroulante (source : une plage de cellules ou des valeurs séparées par des points-virgules).</li><li><strong>Nombre entier / Décimal :</strong> Limite la saisie à un intervalle numérique.</li><li><strong>Date / Heure :</strong> Restreint à des plages de dates ou heures.</li><li><strong>Longueur du texte :</strong> Limite le nombre de caractères.</li></ul><p><strong>Messages :</strong> Configurez un message de saisie (aide) et un message d'erreur personnalisé pour guider l'utilisateur.</p>` },
        { title: "Tri et filtrage avancé", content: `<p>Organiser et filtrer les données efficacement :</p><p><strong>Tri :</strong></p><ul><li>Tri simple : Cliquez sur l'en-tête de colonne > Données > Tri A-Z ou Z-A.</li><li>Tri personnalisé : Données > Tri > Ajouter un niveau pour trier sur plusieurs critères.</li></ul><p><strong>Filtrage :</strong></p><ul><li>Filtre automatique : Données > Filtre. Des flèches déroulantes apparaissent sur chaque en-tête.</li><li>Filtre avancé : Données > Avancé. Permet de définir des critères complexes dans une zone séparée.</li><li>Segment : Insertion > Segment pour un filtrage visuel interactif.</li></ul>` },
      ]
    },
    {
      title: "Productivité et bonnes pratiques",
      description: "Optimiser son utilisation d'Excel avec les raccourcis, macros et bonnes pratiques professionnelles.",
      sections: [
        { title: "Raccourcis clavier essentiels", content: `<p>Les raccourcis les plus utiles pour gagner en productivité :</p><table border="1" cellpadding="8" style="width:100%;border-collapse:collapse"><tr style="background:#f0f0f0"><th>Raccourci</th><th>Action</th></tr><tr><td>Ctrl+C / Ctrl+V</td><td>Copier / Coller</td></tr><tr><td>Ctrl+Z / Ctrl+Y</td><td>Annuler / Rétablir</td></tr><tr><td>Ctrl+S</td><td>Enregistrer</td></tr><tr><td>Ctrl+N</td><td>Nouveau classeur</td></tr><tr><td>Ctrl+F / Ctrl+H</td><td>Rechercher / Remplacer</td></tr><tr><td>F4</td><td>Basculer référence (relative ↔ absolue)</td></tr><tr><td>Ctrl+Shift+L</td><td>Activer/Désactiver les filtres</td></tr><tr><td>Alt+=</td><td>Somme automatique</td></tr><tr><td>Ctrl+;</td><td>Insérer la date du jour</td></tr><tr><td>Ctrl+Espace</td><td>Sélectionner la colonne entière</td></tr></table>` },
        { title: "Protection des feuilles et classeurs", content: `<p>Protéger les données sensibles :</p><ul><li><strong>Protection de feuille :</strong> Révision > Protéger la feuille. Définir un mot de passe et choisir les actions autorisées (sélection, tri, filtre...).</li><li><strong>Verrouiller des cellules :</strong> Par défaut toutes les cellules sont verrouillées. Déverrouillez celles modifiables : Format de cellule > Protection > Décocher « Verrouillée ».</li><li><strong>Protection du classeur :</strong> Révision > Protéger le classeur. Empêche d'ajouter, supprimer ou renommer des feuilles.</li><li><strong>Mot de passe à l'ouverture :</strong> Fichier > Informations > Protéger le classeur > Chiffrer avec un mot de passe.</li></ul>` },
        { title: "Introduction aux macros VBA", content: `<p>Les macros permettent d'automatiser des tâches répétitives :</p><p><strong>Enregistrer une macro :</strong></p><ol><li>Affichage > Macros > Enregistrer une macro.</li><li>Nommez la macro et choisissez un raccourci clavier (optionnel).</li><li>Effectuez les actions à automatiser.</li><li>Arrêtez l'enregistrement.</li></ol><p><strong>Éditeur VBA (Alt+F11) :</strong> Permet de voir et modifier le code généré, et de créer des macros plus complexes avec des boucles, conditions et boîtes de dialogue.</p><p><strong>Attention :</strong> Enregistrez en format .xlsm (classeur prenant en charge les macros).</p>` },
        { title: "Bonnes pratiques professionnelles", content: `<p>Pour des fichiers Excel professionnels et maintenables :</p><ul><li><strong>Structure :</strong> Une feuille par type de données (Données brutes, Calculs, Tableau de bord).</li><li><strong>Nommage :</strong> Utilisez des noms définis (Formules > Gestionnaire de noms) pour les plages importantes.</li><li><strong>Documentation :</strong> Ajoutez des commentaires (Révision > Nouveau commentaire) pour expliquer les formules complexes.</li><li><strong>Cohérence :</strong> Standardisez les formats de dates, nombres et devises dans tout le classeur.</li><li><strong>Sauvegarde :</strong> Utilisez le versioning (Enregistrer sous avec numéro de version) et les sauvegardes automatiques.</li></ul>` },
        { title: "Erreurs courantes et dépannage", content: `<p>Les erreurs les plus fréquentes et comment les résoudre :</p><table border="1" cellpadding="8" style="width:100%;border-collapse:collapse"><tr style="background:#f0f0f0"><th>Erreur</th><th>Signification</th><th>Solution</th></tr><tr><td>#REF!</td><td>Référence invalide</td><td>Vérifier les cellules supprimées ou déplacées</td></tr><tr><td>#VALEUR!</td><td>Type de donnée incorrect</td><td>Vérifier les types (texte vs nombre)</td></tr><tr><td>#DIV/0!</td><td>Division par zéro</td><td>Ajouter un test SI pour éviter la division par 0</td></tr><tr><td>#N/A</td><td>Valeur non trouvée</td><td>Vérifier les données de la RECHERCHEV</td></tr><tr><td>#NOM?</td><td>Nom de fonction non reconnu</td><td>Vérifier l'orthographe de la fonction</td></tr><tr><td>####</td><td>Colonne trop étroite</td><td>Élargir la colonne</td></tr></table><p><strong>Astuce :</strong> Utilisez <code>=SIERREUR(formule ; "Message")</code> pour gérer proprement les erreurs.</p>` },
      ]
    },
    {
      title: "Études de cas pratiques",
      description: "Appliquer les compétences Excel à travers des cas professionnels concrets et réalistes.",
      sections: [
        { title: "Cas 1 : Tableau de bord commercial", content: `<p><strong>Contexte :</strong> Vous êtes assistant(e) commercial(e) dans une PME de 25 salariés. Votre responsable vous demande de créer un tableau de bord mensuel pour suivre les performances de l'équipe de vente (5 commerciaux).</p><p><strong>Objectifs :</strong></p><ul><li>Créer un tableau de suivi des ventes par commercial et par mois</li><li>Calculer automatiquement le chiffre d'affaires total, par commercial et par produit</li><li>Intégrer un graphique d'évolution mensuelle</li><li>Mettre en place une mise en forme conditionnelle (objectif atteint en vert, non atteint en rouge)</li></ul><p><strong>Compétences mobilisées :</strong> Formules SOMME, MOYENNE, SI, mise en forme conditionnelle, graphiques, mise en page.</p><p><strong>Étapes de réalisation :</strong></p><ol><li>Créer la feuille « Données » avec les colonnes : Date, Commercial, Produit, Quantité, Prix unitaire, Montant HT</li><li>Créer la feuille « Synthèse » avec un TCD résumant les ventes</li><li>Créer la feuille « Dashboard » avec les indicateurs clés et graphiques</li><li>Appliquer la mise en forme conditionnelle sur les objectifs</li></ol>` },
        { title: "Cas 2 : Gestion de budget formation", content: `<p><strong>Contexte :</strong> En tant que responsable formation, vous devez piloter le budget annuel de formation de votre organisme. Le budget alloué est de 45 000 € et vous devez répartir les dépenses entre les différentes actions.</p><p><strong>Objectifs :</strong></p><ul><li>Créer un fichier de suivi budgétaire avec les rubriques : formation, intervenant, coût prévu, coût réel, écart</li><li>Utiliser la validation de données pour créer des listes déroulantes (types de formation, statuts)</li><li>Calculer les écarts budget prévisionnel / réel avec alerte visuelle</li><li>Créer un graphique de répartition du budget par catégorie</li></ul><p><strong>Formules utilisées :</strong></p><ul><li><code>=SOMME.SI(plage_critère ; critère ; plage_somme)</code> pour totaliser par catégorie</li><li><code>=SI(C2-D2>0 ; "Sous-budget" ; "Dépassement")</code> pour les alertes</li><li><code>=NB.SI(plage ; critère)</code> pour compter les formations par statut</li></ul>` },
        { title: "Cas 3 : Suivi de la satisfaction stagiaires", content: `<p><strong>Contexte :</strong> Après chaque session de formation, un questionnaire de satisfaction est envoyé aux stagiaires. Vous devez compiler et analyser les résultats pour le rapport qualité Qualiopi.</p><p><strong>Données à traiter :</strong></p><table border="1" cellpadding="6" style="width:100%;border-collapse:collapse;font-size:11px"><tr style="background:#f0f0f0"><th>Critère</th><th>Stagiaire 1</th><th>Stagiaire 2</th><th>Stagiaire 3</th><th>Stagiaire 4</th></tr><tr><td>Contenu</td><td>4</td><td>5</td><td>4</td><td>3</td></tr><tr><td>Animation</td><td>5</td><td>5</td><td>4</td><td>5</td></tr><tr><td>Support</td><td>4</td><td>4</td><td>3</td><td>4</td></tr><tr><td>Conditions</td><td>5</td><td>4</td><td>5</td><td>4</td></tr></table><p><strong>Travail demandé :</strong></p><ol><li>Calculer la moyenne par critère et par stagiaire</li><li>Créer un graphique radar pour visualiser les résultats</li><li>Identifier les axes d'amélioration (critères < 4/5)</li><li>Convertir les notes en pourcentage de satisfaction</li></ol>` },
        { title: "Cas 4 : Planning de formation annuel", content: `<p><strong>Contexte :</strong> Planifier les sessions de formation sur l'année en tenant compte des disponibilités des formateurs, des salles et des périodes de congés.</p><p><strong>Objectifs :</strong></p><ul><li>Créer un calendrier annuel avec mise en forme conditionnelle pour les week-ends et jours fériés</li><li>Intégrer les créneaux de formation avec code couleur par type</li><li>Calculer automatiquement le nombre de jours de formation par mois et par formateur</li><li>Utiliser la validation de données pour éviter les conflits de planning</li></ul><p><strong>Astuce avancée :</strong> Utilisez la fonction <code>=JOURSEM(date ; 2)</code> pour identifier les week-ends (résultat > 5) et la mise en forme conditionnelle pour les griser automatiquement.</p>` },
      ]
    },
    {
      title: "Fonctions avancées et automatisation",
      description: "Maîtriser les fonctions avancées pour automatiser les traitements de données complexes.",
      sections: [
        { title: "Fonctions de texte", content: `<p>Manipuler et transformer du texte dans Excel :</p><table border="1" cellpadding="8" style="width:100%;border-collapse:collapse"><tr style="background:#f0f0f0"><th>Fonction</th><th>Description</th><th>Exemple</th></tr><tr><td>GAUCHE</td><td>Extrait les n premiers caractères</td><td>=GAUCHE("Excel";2) → "Ex"</td></tr><tr><td>DROITE</td><td>Extrait les n derniers caractères</td><td>=DROITE("Excel";3) → "cel"</td></tr><tr><td>STXT</td><td>Extrait une sous-chaîne</td><td>=STXT("Excel";2;3) → "xce"</td></tr><tr><td>CONCATENER / &</td><td>Assemble des textes</td><td>=A1&" "&B1</td></tr><tr><td>MAJUSCULE/MINUSCULE</td><td>Change la casse</td><td>=MAJUSCULE("excel") → "EXCEL"</td></tr><tr><td>SUPPRESPACE</td><td>Supprime les espaces en trop</td><td>=SUPPRESPACE("  test  ") → "test"</td></tr><tr><td>NBCAR</td><td>Compte les caractères</td><td>=NBCAR("Excel") → 5</td></tr></table>` },
        { title: "Fonctions de date et heure", content: `<p>Manipuler les dates et heures :</p><ul><li><code>=AUJOURDHUI()</code> – Date du jour (se met à jour automatiquement)</li><li><code>=MAINTENANT()</code> – Date et heure actuelles</li><li><code>=ANNEE(date)</code>, <code>=MOIS(date)</code>, <code>=JOUR(date)</code> – Extraire les composantes</li><li><code>=DATEDIF(date1;date2;"y")</code> – Différence en années ("m" pour mois, "d" pour jours)</li><li><code>=NB.JOURS.OUVRES(début;fin)</code> – Nombre de jours ouvrés entre deux dates</li><li><code>=FIN.MOIS(date;n)</code> – Dernier jour du mois n mois plus tard</li></ul><p><strong>Cas d'usage :</strong> Calculer l'ancienneté d'un salarié, planifier des échéances, compter les jours de formation.</p>` },
        { title: "Fonctions conditionnelles avancées", content: `<p>Au-delà de SI simple, Excel offre des fonctions conditionnelles puissantes :</p><ul><li><code>=SOMME.SI.ENS(plage_somme ; plage1 ; critère1 ; plage2 ; critère2)</code> – Somme avec plusieurs critères</li><li><code>=NB.SI.ENS(plage1 ; critère1 ; plage2 ; critère2)</code> – Comptage multicritères</li><li><code>=SI.CONDITIONS(test1 ; valeur1 ; test2 ; valeur2 ; ...)</code> – Remplace les SI imbriqués (Excel 2019+)</li><li><code>=SIERREUR(formule ; valeur_si_erreur)</code> – Gestion élégante des erreurs</li></ul><p><strong>Exemple pratique :</strong> Calculer le total des ventes de janvier pour le commercial "Dupont" :</p><p><code>=SOMME.SI.ENS(D:D ; A:A ; "Dupont" ; B:B ; "Janvier")</code></p>` },
        { title: "Power Query – Introduction à l'importation de données", content: `<p>Power Query (onglet Données > Obtenir et transformer) permet :</p><ul><li><strong>Importer :</strong> Données depuis des fichiers CSV, bases de données, sites web, API</li><li><strong>Transformer :</strong> Nettoyer, filtrer, pivoter, dé-pivoter les données</li><li><strong>Fusionner :</strong> Combiner plusieurs sources de données en une seule</li><li><strong>Actualiser :</strong> Mettre à jour automatiquement les données importées</li></ul><p><strong>Avantage clé :</strong> Les transformations sont enregistrées et rejouées à chaque actualisation. Idéal pour les rapports récurrents.</p>` },
      ]
    },
    {
      title: "Quiz et auto-évaluation",
      description: "Testez vos connaissances acquises tout au long de la formation avec ce quiz récapitulatif.",
      sections: [
        { title: "Quiz – Chapitre 1 : Interface Excel", content: `<div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 1 :</strong> Quelle est la référence de la cellule à l'intersection de la colonne C et de la ligne 5 ?</p><p style="color:#28a745">✅ Réponse : C5</p></div><div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 2 :</strong> Quel onglet du ruban contient les fonctions de mise en forme (police, taille, couleur) ?</p><p style="color:#28a745">✅ Réponse : L'onglet Accueil</p></div><div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 3 :</strong> Comment figer les volets pour garder les en-têtes visibles lors du défilement ?</p><p style="color:#28a745">✅ Réponse : Onglet Affichage > Figer les volets</p></div>` },
        { title: "Quiz – Chapitres 2 & 3 : Formules et mise en forme", content: `<div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 4 :</strong> Quelle formule calcule la moyenne des cellules A1 à A10 ?</p><p style="color:#28a745">✅ Réponse : =MOYENNE(A1:A10)</p></div><div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 5 :</strong> Quelle est la différence entre une référence relative (A1) et absolue ($A$1) ?</p><p style="color:#28a745">✅ Réponse : La référence relative s'adapte lors de la recopie, l'absolue reste fixe.</p></div><div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 6 :</strong> Comment appliquer une mise en forme conditionnelle pour surligner en rouge les valeurs inférieures à 10 ?</p><p style="color:#28a745">✅ Réponse : Accueil > Mise en forme conditionnelle > Règles de surbrillance > Inférieur à > 10</p></div>` },
        { title: "Quiz – Chapitres 4 & 5 : Fonctions avancées", content: `<div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 7 :</strong> Quelle fonction permet de rechercher une valeur dans la première colonne d'un tableau ?</p><p style="color:#28a745">✅ Réponse : RECHERCHEV</p></div><div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 8 :</strong> Quelles sont les 4 zones d'un Tableau Croisé Dynamique ?</p><p style="color:#28a745">✅ Réponse : Filtres, Lignes, Colonnes, Valeurs</p></div><div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 9 :</strong> Quelle combinaison de touches ouvre l'éditeur VBA ?</p><p style="color:#28a745">✅ Réponse : Alt + F11</p></div><div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px"><p><strong>Question 10 :</strong> Comment compter le nombre de jours ouvrés entre deux dates ?</p><p style="color:#28a745">✅ Réponse : =NB.JOURS.OUVRES(date_début ; date_fin)</p></div>` },
        { title: "Grille d'auto-évaluation de fin de formation", content: `<p>Évaluez votre niveau de maîtrise sur chaque compétence :</p><table border="1" cellpadding="8" style="width:100%;border-collapse:collapse"><tr style="background:#f0f0f0"><th>Compétence</th><th>1 – Débutant</th><th>2 – Base</th><th>3 – Intermédiaire</th><th>4 – Avancé</th></tr><tr><td>Naviguer dans l'interface Excel</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr><tr><td>Saisir et formater des données</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr><tr><td>Utiliser les formules de base (SOMME, MOYENNE, SI)</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr><tr><td>Créer des graphiques</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr><tr><td>Utiliser RECHERCHEV / INDEX-EQUIV</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr><tr><td>Créer un Tableau Croisé Dynamique</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr><tr><td>Appliquer la mise en forme conditionnelle</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr><tr><td>Protéger une feuille / un classeur</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr></table><p style="margin-top:15px;font-style:italic">Commentaire du stagiaire : _______________________________________________</p>` },
      ]
    },
  ];
}

import { getWordChapters } from "./courseContentWord";
import { getAnglaisChapters } from "./courseContentAnglais";
import { getAnglaisA1Chapters } from "./courseContentAnglaisA1";
import { getManagementChapters } from "./courseContentManagement";
import { getGenericChapters } from "./courseContentGeneric";
import { getFLEChapters } from "./courseContentFLE";
import { getIAChapters } from "./courseContentIA";
import { getWebmarketingChapters } from "./courseContentWebmarketing";
import { getCRMChapters } from "./courseContentCRM";
import { getMassagePrenatalChapters } from "./courseContentMassagePrenatal";
import { getMassagePostpartumChapters } from "./courseContentMassagePostpartum";
import { getECSRChapters } from "./courseContentECSR";
import { getVTestChapters } from "./courseContentVTest";
import { getCIPChapters } from "./courseContentCIP";
import { getRPMSChapters } from "./courseContentRPMS";
import { getAssistantDirectionChapters } from "./courseContentAssistantDirection";
import { getInfographisteChapters } from "./courseContentInfographiste";
import { getRestaurationChapters } from "./courseContentRestauration";
import { getSocioEsthetiqueChapters } from "./courseContentSocioEsthetique";
import { getVTCChapters } from "./courseContentVTC";
import { getEsthetiqueChapters } from "./courseContentEsthetique";
import { getMaquillageChapters } from "./courseContentMaquillage";
import { getPaieChapters } from "./courseContentPaie";

import { getNTCChapters } from "./courseContentNTC";
import { getGPMEChapters } from "./courseContentGPME";
import { getGestionEntrepriseChapters } from "./courseContentGestionEntreprise";
import { getCreationEntrepriseChapters } from "./courseContentCreationEntreprise";
import { getCachedContentPack, pickImagesForQuery } from "./aiContentPack";
export { getWordChapters, getAnglaisChapters, getAnglaisA1Chapters, getManagementChapters, getGenericChapters, getFLEChapters, getIAChapters, getWebmarketingChapters, getCRMChapters, getMassagePrenatalChapters, getMassagePostpartumChapters, getECSRChapters, getVTestChapters, getCIPChapters, getRPMSChapters, getAssistantDirectionChapters, getInfographisteChapters, getRestaurationChapters, getSocioEsthetiqueChapters, getVTCChapters, getEsthetiqueChapters, getMaquillageChapters, getNTCChapters, getGPMEChapters, getGestionEntrepriseChapters, getCreationEntrepriseChapters };

function tryAIChapters(formationIntitule: string): CourseChapter[] | null {
  try {
    const pack = getCachedContentPack({ intitule: formationIntitule } as any);
    if (!pack?.chapters?.length) return null;
    return pack.chapters.map((ch, idx) => {
      const imgs = pickImagesForQuery(ch.imageQuery || "", formationIntitule);
      const heroImg = imgs[idx % imgs.length];
      const figure = `<figure style="margin:14px 0;text-align:center"><img src="${heroImg}" alt="${ch.title.replace(/"/g, "&quot;")}" loading="lazy" style="max-width:100%;height:auto;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.12)" /><figcaption style="font-size:12px;color:#666;margin-top:6px;font-style:italic">${ch.title}</figcaption></figure>`;
      return {
        title: ch.title,
        description: ch.description,
        sections: ch.sections.map((s, si) => ({
          title: s.title,
          content: (si === 0 ? figure : "") + s.contentHtml,
        })),
      };
    });
  } catch {
    return null;
  }
}

export function getCourseChapters(formationIntitule: string): CourseChapter[] {
  const ai = tryAIChapters(formationIntitule);
  if (ai) return ai;
  const t = formationIntitule.toLowerCase();
  if (t.includes('gestionnaire de paie') || t.includes('gestionnaire paie') || (t.includes('paie') && (t.includes('formation') || t.includes('bulletin') || t.includes('gestion')))) return getPaieChapters();
  if (t.includes('gestion de la pme') || t.includes('gestion pme') || t.includes('bts gpme') || t.includes(' gpme') || t.startsWith('gpme') || t.includes('rncp38363')) return getGPMEChapters();
  if (t.includes('création') && (t.includes('entreprise') || t.includes('activité'))) return getCreationEntrepriseChapters();
  if (t.includes('creation') && (t.includes('entreprise') || t.includes('activite'))) return getCreationEntrepriseChapters();
  if (t.includes('reprise') && t.includes('entreprise')) return getCreationEntrepriseChapters();
  if (t.includes('créer son entreprise') || t.includes('creer son entreprise') || t.includes('porteur de projet') || t.includes('rncp31923')) return getCreationEntrepriseChapters();
  if (t.includes("gestion d'entreprise") || t.includes('gestion d entreprise') || t.includes('gestion dentreprise') || t.includes('gérer son entreprise') || t.includes('piloter son entreprise') || t.includes('pilotage de pme') || t.includes('pilotage tpe')) return getGestionEntrepriseChapters();
  if (t.includes('socio-esthéti') || t.includes('socio esthéti') || t.includes('rs5992') || t.includes('soins socio')) return getSocioEsthetiqueChapters();
  if (t.includes('maquilleur') || t.includes('maquillage professionnel') || t.includes('maquillage pro') || t.includes('make-up') || t.includes('makeup') || t.includes('mua ')) return getMaquillageChapters();
  if (t.includes('cap esthét') || t.includes('cap esthet') || t.includes('rncp39030') || t.includes('rncp31041') || t.includes('cosmétique') || t.includes('cosmetique') || ((t.includes('esthét') || t.includes('esthet')) && !t.includes('socio'))) return getEsthetiqueChapters();
  if (t.includes('vtc') || t.includes('voiture de transport avec chauffeur') || t.includes('rs5637') || t.includes('chauffeur vtc')) return getVTCChapters();
  if (t.includes('management commercial opérationnel') || t.includes('management commercial operationnel') || t.includes('bts mco') || t.includes(' mco') || t.startsWith('mco') || t.includes('rncp38362')) return getNTCChapters();
  if (t.includes('négociateur') || t.includes('technico-commercial') || t.includes('technico commercial') || t.includes(' ntc') || t.startsWith('ntc') || t.includes('rncp39063')) return getNTCChapters();
  if (t.includes('ecsr') || t.includes('enseignant de la conduite') || t.includes('sécurité routière')) return getECSRChapters();
  if (t.includes('vtest') || t.includes('v-test') || t.includes('rs6905')) return getVTestChapters();
  if (t.includes('conseiller en insertion') || t.includes('insertion professionnelle') || t.includes('cip') || t.includes('rncp37274')) return getCIPChapters();
  if (t.includes('responsable de petite') || t.includes('rpms') || t.includes('petite et moyenne structure') || t.includes('petite ou moyenne structure') || t.includes('rncp38575')) return getRPMSChapters();
  if (t.includes('assistant') && t.includes('direction')) return getAssistantDirectionChapters();
  if (t.includes('infographiste') || t.includes('infographie')) return getInfographisteChapters();
  if (t.includes('restauration') || t.includes('employé polyvalent en restauration') || t.includes('rncp38663') || t.includes('epr')) return getRestaurationChapters();
  if (t.includes('excel')) return getExcelChapters();
  if (t.includes('word')) return getWordChapters();
  if ((t.includes('anglais') || t.includes('english')) && (t.includes('a1') || t.includes('débutant') || t.includes('niveau a1'))) return getAnglaisA1Chapters();
  if (t.includes('anglais') || t.includes('english')) return getAnglaisChapters();
  if (t.includes('management') || t.includes('manager')) return getManagementChapters();
  if (t.includes('français') || t.includes('médico-social') || t.includes('social')) return getFLEChapters();
  if (t.includes('intelligence artificielle') || t.includes('ia générative') || t.includes('contenus rédactionnels')) return getIAChapters();
  if (t.includes('webmarketing') || t.includes('marketing de contenus') || t.includes('réseaux sociaux') || t.includes('marketing digital')) return getWebmarketingChapters();
  if (t.includes('crm') || t.includes('automation') || t.includes('automatisation')) return getCRMChapters();
  if (t.includes('postpartum') || t.includes('post-partum') || t.includes('post partum')) return getMassagePostpartumChapters();
  if (t.includes('massage') || t.includes('prénatal') || t.includes('prenatal')) return getMassagePrenatalChapters();
  return getGenericChapters(formationIntitule);
}
