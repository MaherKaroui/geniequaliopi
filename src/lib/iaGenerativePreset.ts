/**
 * Preset "Création de contenus rédactionnels et visuels par l'usage responsable
 * de l'intelligence artificielle générative" (RS6776).
 * Pack IA pré-rempli : besoins, contenu, évaluations (IND 11), veille.
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import type { AIContentPack } from "./aiContentPack";
import type { AIEvalPack } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";

export function isIAGenerativeFormation(intitule: string): boolean {
  const t = (intitule || "").toLowerCase();
  return (
    t.includes("création de contenus") ||
    t.includes("creation de contenus") ||
    t.includes("contenus rédactionnels") ||
    t.includes("contenus redactionnels") ||
    t.includes("intelligence artificielle générative") ||
    t.includes("intelligence artificielle generative") ||
    t.includes("ia générative") ||
    t.includes("ia generative") ||
    t.includes("rs6776") ||
    t.includes("inkrea")
  );
}

// ---------------------------------------------------------------------------
// Organisme
// ---------------------------------------------------------------------------
export const IA_GENERATIVE_ORG: OrganismeInfo = {
  nom: "IZIBUSINESS",
  siret: "892 035 320 00019",
  adresse: "6 rue d'Armaillé",
  codePostal: "75017",
  ville: "PARIS",
  telephone: "01 84 88 07 42",
  email: "contact@izibusiness.fr",
  siteWeb: "https://www.izibusiness.fr",
  nda: "11 75 65432 75",
  dirigeant: "Nadine DENDANI",
  responsablePedagogique: "Nadine DENDANI",
  referentHandicap: "Nadine DENDANI",
  referentQualite: "Nadine DENDANI",
  poleAdministratif: "Nadine DENDANI",
  relationEntreprises: "",
  referentMobilite: "",
  domainesFormation: "Intelligence artificielle générative, création de contenus, communication digitale, prompt engineering, accessibilité numérique",
  typesActions: ["actions-formation"],
  certifications: "Qualiopi",
  outilsUtilises: "ChatGPT, Google Gemini, Microsoft Copilot, Adobe Firefly, Midjourney, DALL-E, Canva IA, Claude, Mistral",
  version: "1",
  dateMaj: new Date().toISOString().slice(0, 10),
};

// ---------------------------------------------------------------------------
// Formation
// ---------------------------------------------------------------------------
export const FORMATION_IA_GENERATIVE: FormationInfo = {
  intitule: "Création de contenus rédactionnels et visuels par l'usage responsable de l'intelligence artificielle générative",
  objectifs:
    `Utiliser l'Intelligence Artificielle Générative de façon efficace, sécurisée, inclusive et réglementaire pour créer des contenus rédactionnels et visuels et gagner en productivité.
À l'issue de la formation, le/la stagiaire sera capable de :
- Définir une stratégie d'implémentation de l'IA générative adaptée à son poste de travail.
- Rédiger des prompts optimaux structurés (Rôle, Cible, Objectif, Contexte, Format).
- Garantir la confidentialité des données professionnelles et appliquer les bonnes pratiques de sécurité.
- Produire des contenus rédactionnels et visuels inclusifs et accessibles.
- Optimiser itérativement les contenus générés par l'IA pour les adapter aux critères de qualité définis.`,
  prerequis:
    `Maîtrise de l'outil informatique et du français écrit. Aucun prérequis technique en IA. Motivation pour intégrer l'IA générative dans un workflow professionnel de création de contenus.`,
  duree: "24 heures (sur 3 jours, présentiel ou distanciel)",
  modalites: "présentiel",
  tarif: "1 490 € TTC (éligible CPF, OPCO, financement personnel)",
  programme:
    "Module 1 (4 h) — Stratégie d'implémentation de l'IA générative : panorama des outils (ChatGPT, Gemini, Copilot, Firefly, Midjourney, DALL-E, Canva IA), analyse du contexte professionnel, plan d'intégration.\nModule 2 (7 h) — Prompt engineering : structure Rôle-Cible-Objectif-Contexte-Format, itération conversationnelle, few-shot prompting, chain-of-thought, optimisation des résultats.\nModule 3 (3 h) — Confidentialité des données professionnelles : identification des données sensibles, risques de fuite, anonymisation, paramétrage de confidentialité, politiques de sécurité.\nModule 4 (3 h) — Production de contenus inclusifs : accessibilité visuelle (textes alternatifs), accessibilité auditive (sous-titrage, transcription), accessibilité cognitive (FALC, langage simple).\nModule 5 (7 h) — Optimisation des contenus générés : affinage itératif, critères de qualité (contrainte, contexte, style, format), production finale rédactionnelle et visuelle.",
  methodesEvaluation:
    "Test de positionnement à l'entrée (QCM 10 questions), exercice pratique intermédiaire (4 questions ouvertes), test de positionnement final (QCM 10 questions), évaluation finale sur 10 exercices pratiques (IND 11), attestation de fin de formation, questionnaire de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Postes individuels équipés d'accès aux outils d'IA générative, supports de cours numériques 50 pages, fiches mémo prompt engineering, templates de prompts par cas d'usage, guide éthique/RGPD/AI Act, exercices de création rédactionnelle et visuelle, grille d'évaluation de la qualité des productions IA, plateforme e-learning.",
  publicVise:
    "Salariés et demandeurs d'emploi du secteur tertiaire dont le métier inclut la production de contenus rédactionnels ou visuels : community managers, chargés de communication, assistants administratifs, freelances, entrepreneurs.",
  delaiAcces: "14 jours minimum entre la validation de l'inscription et le démarrage",
  dateDebut: "2026-09-07",
  dateFin: "2026-09-09",
  lieu: "IZIBUSINESS — 6 rue d'Armaillé, 75017 PARIS (présentiel) + classe virtuelle Google Meet",
  nombreParticipants: "6",
  formateur: "Nadine DENDANI",
  codeRNCP: "RS6776",
};

// ---------------------------------------------------------------------------
// Stagiaires (6 profils cohérents avec la création de contenus IA)
// ---------------------------------------------------------------------------
export const STAGIAIRES_IA_GENERATIVE: StagiaireInfo[] = [
  { civilite: "Mme", nom: "DURAND", prenom: "Léa", email: "lea.durand.ia@gmail.com", telephone: "06 12 34 56 78", entreprise: "TPE Com'Léa (3 salariés)", poste: "Community manager freelance", dateNaissance: "1992-04-18", adresse: "12 rue de la République", codePostal: "75011", commune: "PARIS", dateDebutFormation: "2026-09-07", dateFinFormation: "2026-09-09", tarifFormation: "1490" },
  { civilite: "M.", nom: "MARTIN", prenom: "Karim", email: "karim.martin.assistant@gmail.com", telephone: "07 23 45 67 89", entreprise: "Cabinet d'expertise comptable Fiduciaire Martin (12 salariés)", poste: "Assistant administratif / communication interne", dateNaissance: "1987-11-03", adresse: "8 avenue de la Grande-Armée", codePostal: "75017", commune: "PARIS", dateDebutFormation: "2026-09-07", dateFinFormation: "2026-09-09", tarifFormation: "1490" },
  { civilite: "Mme", nom: "BERNARD", prenom: "Sophie", email: "sophie.bernard.com@gmail.com", telephone: "06 34 56 78 90", entreprise: "", poste: "Demandeur d'emploi — projet chargée de communication", dateNaissance: "1990-07-22", adresse: "25 rue du Faubourg Saint-Antoine", codePostal: "75012", commune: "PARIS", dateDebutFormation: "2026-09-07", dateFinFormation: "2026-09-09", tarifFormation: "1490" },
  { civilite: "M.", nom: "PETIT", prenom: "Thomas", email: "thomas.petit.web@gmail.com", telephone: "07 45 67 89 01", entreprise: "Agence web PixelCréa (8 salariés)", poste: "Rédacteur web / SEO", dateNaissance: "1995-02-10", adresse: "14 rue Oberkampf", codePostal: "75011", commune: "PARIS", dateDebutFormation: "2026-09-07", dateFinFormation: "2026-09-09", tarifFormation: "1490" },
  { civilite: "Mme", nom: "ROBERT", prenom: "Aïcha", email: "aicha.robert.rh@gmail.com", telephone: "06 56 78 90 12", entreprise: "Association Solidarité Emploi (15 salariés)", poste: "Chargée de communication interne et RH", dateNaissance: "1988-09-29", adresse: "7 rue de Belleville", codePostal: "75020", commune: "PARIS", dateDebutFormation: "2026-09-07", dateFinFormation: "2026-09-09", tarifFormation: "1490" },
  { civilite: "M.", nom: "RICHARD", prenom: "Lucas", email: "lucas.richard.auto@gmail.com", telephone: "07 67 89 01 23", entreprise: "", poste: "Auto-entrepreneur — création de contenus pour PME", dateNaissance: "1993-12-05", adresse: "18 boulevard Voltaire", codePostal: "75011", commune: "PARIS", dateDebutFormation: "2026-09-07", dateFinFormation: "2026-09-09", tarifFormation: "1490" },
];

// ---------------------------------------------------------------------------
// Content pack
// ---------------------------------------------------------------------------
const IA_GENERATIVE_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: [
      "Je perds trop de temps à rédiger des posts LinkedIn et des newsletters, j'aimerais que l'IA m'aide à aller plus vite sans que ça fasse robot.",
      "Je ne sais pas quels outils choisir entre ChatGPT, Gemini, Copilot et Midjourney, il y en a trop et je ne comprends pas les différences.",
      "J'ai peur de mettre des données confidentielles dans ChatGPT, on m'a dit que c'était dangereux mais je ne sais pas comment faire autrement.",
      "Mes visuels pour les réseaux sociaux ne sont pas assez professionnels, j'aimerais savoir créer des images rapidement avec l'IA.",
      "Je ne sais pas écrire des prompts efficaces, mes résultats sont souvent trop génériques ou hors sujet.",
      "Je veux comprendre le cadre juridique : droit d'auteur, AI Act, RGPD, pour ne pas avoir de problème avec mon employeur ou mes clients.",
      "J'aimerais rendre mes contenus accessibles à tout le monde, notamment aux personnes en situation de handicap, mais je ne sais pas par où commencer.",
      "Je dois produire beaucoup de contenu en très peu de temps, j'ai besoin d'un workflow IA fiable et reproductible.",
      "Je veux apprendre à itérer avec l'IA pour affiner les résultats, pas juste accepter la première proposition.",
      "Je ne sais pas comment justifier le choix d'un outil IA à mon manager ou à un client, j'ai besoin d'un cadre stratégique.",
    ],
    syntheseHtml:
      "6 stagiaires sur 6 souhaitent intégrer l'IA générative dans leur workflow de création de contenus.<br>5 sur 6 citent le gain de productivité comme motivation principale (rédaction de posts, newsletters, visuels).<br>4 sur 6 expriment une incertitude sur le choix des outils et leurs différences (ChatGPT, Gemini, Copilot, Midjourney, DALL-E).<br>4 sur 6 mentionnent la crainte des fuites de données et le besoin de règles de sécurité claires.<br>3 sur 6 identifient la création de visuels professionnels comme un axe prioritaire.<br>5 sur 6 reconnaissent ne pas maîtriser le prompt engineering et obtenir des résultats trop génériques.<br>3 sur 6 soulèvent explicitement la question de l'accessibilité et de l'inclusion dans les contenus.<br>Tous attendent une formation concrète, orientée cas d'usage, avec des templates réutilisables immédiatement.",
    adaptationsHtml:
      "• Progression par cas pratiques réels : post LinkedIn, newsletter, visuel réseau social, email client, fiche produit.<br>• Module dédié au choix et paramétrage des outils selon le contexte professionnel (B2B, B2C, association, freelance).<br>• Atelier sécurité des données : identification des informations sensibles, anonymisation, paramétrage confidentialité, charte d'usage.<br>• Fiches mémo « Prompt engineering » et templates Rôle-Cible-Objectif-Contexte-Format remis en main propre.<br>• Module accessibilité numérique appliqué aux contenus IA : textes alternatifs, sous-titrage, langage simple, FALC.<br>• Veille réglementaire intégrée : AI Act, RGPD, droit d'auteur, obligation de transparence.<br>• Exercices d'itération conversationnelle pour apprendre à affiner les résultats de l'IA.<br>• Restitution sous forme de plan stratégique personnalisé par stagiaire pour justifier l'usage de l'IA auprès du manager/client.",
  },
  chapters: [], // Servi par getIAChapters (courseContent.ts).
  exercises: [], // Rempli par l'éval pack ci-dessous.
  ressources: {
    supportsHtml: "<p>• Support de cours PDF : fondamentaux de l'IA générative, prompt engineering, création de contenus rédactionnels et visuels<br>• Fiches méthodologiques par outil (ChatGPT, Gemini, Copilot, Firefly, Midjourney, DALL-E, Canva IA)<br>• Templates de prompts efficaces par cas d'usage<br>• Guide de bonnes pratiques éthiques, RGPD et AI Act<br>• Exercices de création de contenus rédactionnels et visuels<br>• Grille d'évaluation de la qualité des productions IA</p>\n",
    outilsHtml: "<p>• ChatGPT (OpenAI) : texte, code, images<br>• Google Gemini : recherche, multimodal, intégration Workspace<br>• Microsoft Copilot : intégration Office 365<br>• Adobe Firefly : images et design sécurisés en droits<br>• Midjourney / DALL-E : génération d'images créatives<br>• Canva IA : création de visuels marketing</p>\n",
    ressourcesComplHtml: "<p>• CNIL — Intelligence artificielle et protection des données : https://www.cnil.fr/fr/intelligence-artificielle<br>• Commission européenne — AI Act : https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai<br>• France compétences — RS6776 : https://www.francecompetences.fr/recherche/rncp/rs6776</p>\n",
    videos: [],
  },
};

// ---------------------------------------------------------------------------
// Eval pack
// ---------------------------------------------------------------------------
const q = (question: string, options: string[], correctIndex: number) => ({ question, options, correctIndex });

export const IA_GENERATIVE_EVAL_PACK: AIEvalPack = {
  qcmDebut: [
    q("L'IA générative est principalement capable de :", ["Analyser uniquement des tableaux Excel", "Créer du contenu nouveau à partir d'instructions", "Réparer du matériel informatique", "Gérer des bases de données SQL"], 1),
    q("Parmi ces outils, lequel est spécialisé dans la génération d'images ?", ["ChatGPT", "Microsoft Copilot", "Midjourney", "Claude"], 2),
    q("La structure de rédaction de prompt Rôle-Cible-Objectif-Contexte-Format sert à :", ["Rendre le prompt plus long", "Obtenir des résultats plus pertinents et exploitables", "Éviter de payer l'abonnement", "Créer un compte utilisateur"], 1),
    q("Quelle est la principale différence entre ChatGPT et Google Gemini ?", ["ChatGPT ne fonctionne pas en français", "Gemini est intégré à l'écosystème Google Workspace", "ChatGPT est gratuit et Gemini est payant", "Gemini ne génère que du texte"], 1),
    q("Dans un contexte professionnel, quelle donnée peut être insérée sans risque dans un outil d'IA générative public ?", ["La liste des salaires de l'entreprise", "Un communiqué de presse déjà publié", "Les coordonnées bancaires d'un client", "Le dossier médical d'un salarié"], 1),
    q("Le prompt engineering correspond à :", ["La réparation de serveurs", "L'art de formuler des instructions pour obtenir le meilleur résultat de l'IA", "L'installation de logiciels bureautiques", "La traduction automatique de documents"], 1),
    q("L'AI Act européen classe les usages de l'IA selon :", ["Leur prix", "Leur niveau de risque", "Leur pays d'origine", "Leur date de création"], 1),
    q("Pour rendre une image générée accessible à une personne malvoyante, on ajoute :", ["Un filtre Instagram", "Un texte alternatif (alt text)", "Un logo en bas à droite", "Un effet 3D"], 1),
    q("La technique « few-shot prompting » consiste à :", ["Donner plusieurs exemples dans le prompt pour guider l'IA", "Poser plusieurs questions en même temps", "Utiliser plusieurs outils simultanément", "Payer plusieurs abonnements"], 0),
    q("Quel est le risque principal d'utiliser un contenu généré par IA sans vérification ?", ["Le fichier est trop lourd", "Les hallucinations et informations incorrectes", "L'ordinateur ralentit", "Le texte est automatiquement protégé par copyright"], 1),
  ],
  qcmFin: [
    q("Dans un plan d'implémentation IA, la première étape est :", ["Achecher un abonnement premium", "Analyser le contexte professionnel et identifier les tâches optimisables", "Supprimer tous les outils existants", "Former tous les collègues immédiatement"], 1),
    q("Un prompt optimal pour obtenir un post LinkedIn doit impérativement préciser :", ["La couleur préférée du rédacteur", "Le ton, la cible, l'objectif et le format", "Le nom du formateur", "La taille de l'entreprise"], 1),
    q("Pour anonymiser une donnée sensible avant de l'insérer dans un prompt, on peut :", ["Remplacer les noms et informations identifiantes par des placeholders", "Mettre le texte en gras", "Utiliser uniquement des majuscules", "Envoyer le prompt par email d'abord"], 0),
    q("L'usage de l'IA générative pour créer une image ressemblant à une vraie personne sans son accord relève :", ["D'une bonne pratique marketing", "D'un risque éthique et juridique majeur (deepfake)", "D'une obligation légale", "D'un gain de productivité recommandé"], 1),
    q("Le chain-of-thought prompting consiste à :", ["Générer une image à partir d'un texte", "Demander à l'IA de détailler son raisonnement étape par étape", "Traduire un document en plusieurs langues", "Créer une chaîne de caractères aléatoires"], 1),
    q("Pour un contenu accessible aux handicaps cognitifs, on privilégie :", ["Un vocabulaire complexe et technique", "Un langage simple, structuré et hiérarchisé", "Des images uniquement", "Des abréviations professionnelles"], 1),
    q("La mention obligatoire « Image générée par IA » s'applique principalement :", ["Aux documents internes confidentiels", "Aux contenus diffusés au public pour respecter l'obligation de transparence", "Aux emails personnels", "Aux notes de frais"], 1),
    q("Lorsqu'un résultat de l'IA est partiellement satisfaisant, la bonne pratique est :", ["Accepter le résultat tel quel", "Itérer en affinant le prompt et en enrichissant le contexte", "Changer d'ordinateur", "Supprimer le compte"], 1),
    q("Un visuel généré pour une campagne publicitaire doit être vérifié concernant :", ["Le nombre de likes attendus", "Les droits d'utilisation, l'exactitude des informations et la conformité à la charte graphique", "La météo du jour", "Le nombre de pixels"], 1),
    q("L'indicateur de performance principal d'une stratégie IA générative est :", ["Le nombre d'outils utilisés", "Le gain de productivité mesurable et la qualité des contenus produits", "Le nombre de prompts écrits", "La vitesse de génération"], 1),
  ],
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire — Intégration responsable de l'IA dans un workflow de communication",
    contexte:
      "Vous êtes community manager dans une PME de 25 salariés du secteur de la formation professionnelle. Votre manager vous demande de produire 4 posts LinkedIn et 1 newsletter hebdomadaire tout en réduisant votre temps de rédaction. Vous devez proposer une stratégie d'usage de l'IA générative sécurisée, choisir les outils adaptés, rédiger un prompt structuré et identifier les données sensibles à protéger.",
    questions: [
      { question: "Identifiez 3 tâches de votre métier qui peuvent être optimisées par l'IA générative et justifiez votre choix.", reponseAttendue: "1) Rédaction de brouillons de posts LinkedIn : l'IA permet de générer rapidement des variantes à partir d'un brief. 2) Création de visuels d'accompagnement : outils comme Canva IA ou Midjourney accélèrent la production d'images. 3) Reformulation et adaptation de ton : l'IA permet d'adapter un même contenu à différentes cibles (prospects, clients, partenaires). Justification : ces tâches sont répétitives, peuvent être standardisées et ne nécessitent pas de décision stratégique finale sans validation humaine.", points: 4 },
      { question: "Rédigez un prompt structuré (Rôle-Cible-Objectif-Contexte-Format) pour générer un post LinkedIn annonçant une nouvelle formation IA.", reponseAttendue: "Rôle : Tu es un community manager expert en formation professionnelle. Cible : dirigeants de TPE-PME intéressés par la productivité. Objectif : Rédiger un post LinkedIn engageant qui annonce notre nouvelle formation 'Création de contenus avec l'IA générative'. Contexte : formation de 24 h éligible CPF, sessions en présentiel à Paris, prochaine session du 7 au 9 septembre 2026. Format : accroche de 2 lignes, 3 arguments à puces, call-to-action avec lien en commentaire, ton professionnel mais accessible, longueur 150 mots.", points: 4 },
      { question: "Listez 5 données que vous ne devez JAMAIS insérer dans un outil d'IA générative public et proposez une alternative.", reponseAttendue: "Données à ne jamais insérer : 1) coordonnées bancaires, 2) données de santé, 3) mots de passe et identifiants, 4) contrats avec clauses confidentielles, 5) liste des salaires. Alternative : anonymiser/remplacer par des placeholders (ex : [NOM_CLIENT], [MONTANT_CONTRAT]), utiliser une version locale/entreprise de l'outil si disponible, ou rédiger manuellement les parties sensibles après génération du brouillon.", points: 4 },
      { question: "Proposez 3 critères pour évaluer la qualité d'un contenu généré par IA avant publication.", reponseAttendue: "1) Exactitude factuelle : vérifier chaque chiffre, date et nom, car l'IA peut halluciner. 2) Alignement avec la charte éditoriale et le ton de la marque : le contenu doit ressembler à ce que l'entreprise publierait habituellement. 3) Conformité juridique et éthique : pas de contenu discriminatoire, respect du droit d'auteur, mention de l'IA si obligatoire, vérification des droits d'utilisation des visuels.", points: 4 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale — 10 exercices pratiques (IND 11)",
    exercices: [
      {
        titre: "Plan stratégique d'implémentation de l'IA générative",
        consigne: "Vous êtes chargé(e) de communication dans une association de 15 salariés. Rédigez un plan stratégique d'implémentation de l'IA générative sur votre poste de travail : contexte, 3 tâches optimisables, outils choisis avec justification, règles de sécurité et indicateurs de suivi.",
        reponseAttendue: "CONTEXTE : Association Solidarité Emploi, 15 salariés, budget communication limité, besoin de produire 4 posts LinkedIn + 1 newsletter par semaine. TÂCHES OPTIMISABLES : 1) Rédaction de brouillons de posts LinkedIn (gain estimé 30 min/semaine). 2) Création de visuels d'accompagnement (gain estimé 45 min/semaine). 3) Reformulation de contenus existants pour différentes cibles (gain estimé 20 min/semaine). OUTILS CHOISIS : ChatGPT pour les textes (polyvalent, bon en français), Canva IA pour les visuels (facile à prendre en main, droits d'usage clairs), Microsoft Copilot pour l'intégration Office. JUSTIFICATION : ces outils couvrent l'ensemble du workflow, sont accessibles financièrement et respectent les contraintes de l'association. RÈGLES DE SÉCURITÉ : aucune donnée personnelle des bénéficiaires dans les prompts, anonymisation systématique, validation humaine obligatoire avant publication, compte professionnel dédié. INDICATEURS : temps gagné par semaine, taux de validation en première proposition, nombre de publications réalisées, taux d'engagement.",
        points: 5,
      },
      {
        titre: "Prompt engineering — post LinkedIn",
        consigne: "Rédigez un prompt structuré (Rôle-Cible-Objectif-Contexte-Format) pour obtenir un post LinkedIn engageant annonçant une formation en ligne sur l'IA générative. Précisez ensuite comment vous itéreriez si le premier résultat est trop formel.",
        reponseAttendue: "PROMPT : Rôle : Tu es un community manager spécialisé dans la formation professionnelle. Cible : indépendants et TPE de moins de 10 salariés. Objectif : Rédiger un post LinkedIn qui donne envie de s'inscrire à notre formation en ligne 'Maîtriser l'IA générative pour votre communication'. Contexte : formation de 24 h, éligible CPF, prix 1 490 € TTC, prochaine session du 7 au 9 septembre 2026, format distanciel avec replay. Format : accroche personnelle, 3 bénéfices à puces, 1 témoignage fictif, call-to-action clair, 140 mots maximum, ton chaleureux et professionnel. ITÉRATION SI TROP FORMEL : 'Merci, peux-tu réécrire le même post avec un ton plus conversationnel, comme si je parlais à un entrepreneur que je connais ? Ajoute une petite anecdote sur le gain de temps et supprime le jargon marketing.'",
        points: 5,
      },
      {
        titre: "Prompt engineering — image publicitaire",
        consigne: "Rédigez un prompt en anglais pour générer une image professionnelle illustrant une formation IA générative. Le visuel doit être inclusif, moderne et utilisable sur un site web. Expliquez comment vous vérifierez les droits d'utilisation.",
        reponseAttendue: "PROMPT EN ANGLAIS : 'A diverse group of 4 professionals in a bright modern coworking space, looking at a laptop screen showing colorful AI-generated content, friendly and collaborative atmosphere, natural lighting, inclusive representation, clean corporate style, no text, no logos, suitable for a training website banner, high resolution, photorealistic.' VÉRIFICATION DES DROITS : utiliser un outil commercialisant des contenus libres de droits (Adobe Firefly, Canva IA avec licence pro) ou vérifier les conditions d'utilisation de la plateforme. S'assurer que l'image ne reproduit pas une œuvre protégée identifiable. Conserver une trace de la licence. Mentionner l'origine IA si la réglementation ou la charte éditoriale l'exige.",
        points: 5,
      },
      {
        titre: "Sécurité et confidentialité des données",
        consigne: "Un collègue vous envoie un brouillon de newsletter généré par IA contenant le nom, l'adresse email et le motif d'accompagnement d'un bénéficiaire. Quelles sont les 4 actions immédiates à mener et quelle réponse écrivez-vous à votre collègue ?",
        reponseAttendue: "ACTIONS IMMÉDIATES : 1) Ne pas valider ce brouillon et retirer les données personnelles. 2) Vérifier si le prompt a été inséré dans un outil public (risque de fuite). 3) Signaler l'incident au référent RGPD/données de l'organisation. 4) Réécrire le contenu avec des placeholders anonymisés. RÉPONSE AU COLLÈGUE : 'Bonjour [prénom], merci pour ce brouillon. Pour respecter le RGPD, je ne peux pas utiliser de données personnelles dans les prompts IA publics. J'ai remplacé les informations identifiantes par des placeholders. À l'avenir, anonymisons systématiquement les contenus avant toute utilisation d'IA, et privilégions les outils avec option confidentialité activée. Je te joins notre fiche mémo sécurité.'",
        points: 5,
      },
      {
        titre: "Anonymisation d'un prompt à risque",
        consigne: "Vous devez demander à l'IA de rédiger un email de relance à un client retardataire. Le client s'appelle M. Bernard Dupont, il doit 12 450 € HT et son entreprise est SARL Dupont Construction. Proposez une version anonymisée du prompt.",
        reponseAttendue: "VERSION ANONYMISÉE : 'Rédige un email professionnel de relance pour un client en retard de paiement. Remplace les éléments suivants par des placeholders : [CIVILITÉ NOM DU CLIENT], [MONTANT DÛ], [FORME JURIDIQUE ET NOM DE L'ENTREPRISE]. Le ton doit être ferme mais courtois, rappeler l'échéance dépassée, proposer un échelonnement et demander une date de règlement. Ne mentionne aucune donnée réelle.' EXEMPLE DE RÉSULTAT UTILISABLE : 'Madame, Monsieur, Nous vous informons qu'une somme de [MONTANT DÛ] HT reste due par [FORME JURIDIQUE ET NOM DE L'ENTREPRISE] depuis le [DATE ÉCHÉANCE]. Nous vous proposons un échelonnement sur 3 mois. Merci de nous indiquer votre accord et la date de règlement souhaitée.' Puis remplacement manuel des placeholders en interne.",
        points: 5,
      },
      {
        titre: "Accessibilité d'un visuel généré",
        consigne: "Vous avez généré une infographie avec Canva IA pour une publication sur les droits des salariés. Expliquez comment vous la rendez accessible aux personnes en situation de handicap visuel, auditif et cognitif.",
        reponseAttendue: "HANDICAP VISUEL : rédiger un texte alternatif (alt text) décrivant le contenu visuel et la hiérarchie de l'information, vérifier le contraste des couleurs (ratio minimum 4,5:1), privilégier des polices lisibles et une taille suffisante. HANDICAP AUDITIF : si l'infographie est intégrée dans une vidéo, ajouter une transcription textuelle complète et des sous-titres ; si elle est diffusée seule, s'assurer que tous les éléments sonores éventuels ont une alternative textuelle. HANDICAP COGNITIF : structurer l'information avec des titres clairs, un langage simple (FALC si pertinent), une progression logique, éviter les abréviations non expliquées et les métaphores complexes, utiliser des pictogrammes explicites. VÉRIFICATION FINALE : relire le contenu à voix haute, tester avec un lecteur d'écran, faire relire par une personne non experte.",
        points: 5,
      },
      {
        titre: "Accessibilité d'un texte généré",
        consigne: "L'IA a produit le texte suivant : 'L'optimisation synergétique des processus communicationnels via l'IA générative permet d'accroître l'efficacité opérationnelle tout en réduisant les coûts inhérents à la production de contenus.' Réécrivez-le pour une personne en situation de handicap cognitif (langage simple) et justifiez vos choix.",
        reponseAttendue: "VERSION SIMPLIFIÉE : 'L'intelligence artificielle générative aide à créer plus vite des contenus (textes, images). Cela permet de gagner du temps et d'économiser de l'argent.' JUSTIFICATION : suppression des mots complexes ('synergétique', 'inhérents', 'opérationnelle'), phrases courtes, sujet-action-résultat clair, vocabulaire courant, pas d'abréviation. Cette version respecte les principes FALC : phrase courte, structure simple, mots familiers, idée par phrase. Elle peut être complétée par un visuel simple si le support le permet.",
        points: 4,
      },
      {
        titre: "Optimisation itérative d'un résultat IA",
        consigne: "Vous demandez à l'IA de rédiger une fiche produit pour une formation. Le premier résultat est trop long, trop générique et ne mentionne pas les modalités distanciel. Rédigez les 3 prompts successifs que vous enverriez pour affiner le résultat.",
        reponseAttendue: "PROMPT 1 (raccourcir) : 'Merci, peux-tu réécrire cette fiche produit en 120 mots maximum en gardant les éléments essentiels : public, objectifs, durée et prix ?' PROMPT 2 (personnaliser) : 'Peux-tu maintenant adapter le ton pour une cible de dirigeants de TPE très pragmatiques, qui veulent comprendre rapidement ce qu'ils vont apprendre ?' PROMPT 3 (ajouter une information manquante) : 'Ajoute une section Modalités précisant que la formation est en distanciel synchrone sur 3 jours, avec replay disponible pendant 30 jours, et que les stagiaires repartent avec des templates réutilisables.'",
        points: 4,
      },
      {
        titre: "Éthique et transparence — mention IA",
        consigne: "Vous avez utilisé l'IA pour générer 80 % d'un article de blog. Rédigez une note explicative destinée à la publication indiquant le recours à l'IA et justifiant la validation humaine finale.",
        reponseAttendue: "NOTE EXPLICATIVE : 'Cet article a été rédigé avec l'aide d'outils d'intelligence artificielle générative. L'IA a permis de structurer les idées, proposer un plan et générer un brouillon à partir de sources validées. Toutes les informations factuelles ont été vérifiées, les sources citées ont été contrôlées et le contenu final a été relu et validé par [Prénom NOM], [fonction], avant publication. Cette démarche garantit la fiabilité du contenu tout en respectant les obligations de transparence du Règlement européen sur l'IA (AI Act).' JUSTIFICATION : transparence envers le lecteur, responsabilité éditoriale, conformité réglementaire, maintien de la confiance.",
        points: 5,
      },
      {
        titre: "Cas final — production d'une campagne complète",
        consigne: "Vous devez lancer une campagne de 3 posts LinkedIn + 1 visuel pour promouvoir une formation IA générative. Décrivez votre workflow complet : choix des outils, rédaction des prompts, sécurité, vérification, accessibilité et publication.",
        reponseAttendue: "WORKFLOW COMPLET : 1) BRIEF : objectif = 3 posts sur 10 jours + 1 visuel, cible = dirigeants de TPE, ton = professionnel accessible. 2) OUTILS : ChatGPT pour les brouillons de texte, Canva IA pour le visuel, Google Sheets pour le planning. 3) PROMPTS : structure Rôle-Cible-Objectif-Contexte-Format pour chaque post, avec angles différents (peur du retard, gain de temps, conformité). 4) SÉCURITÉ : aucune donnée client réelle, placeholders utilisés, compte professionnel. 5) VÉRIFICATION : relecture des faits, vérification de l'orthographe, alignement avec la charte éditoriale, contrôle des droits du visuel. 6) ACCESSIBILITÉ : alt text sur le visuel, langage simple, contraste vérifié, transcription textuelle si besoin. 7) PUBLICATION : programmation sur LinkedIn, mention IA si obligatoire, suivi des indicateurs (impressions, clics, inscriptions). 8) RETOUR D'EXPÉRIENCE : analyse des performances après 15 jours pour ajuster la prochaine campagne.",
        points: 5,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Veille pack
// ---------------------------------------------------------------------------
const IA_GENERATIVE_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    { lien: "https://www.cnil.fr/fr/intelligence-artificielle", titreLien: "CNIL — Intelligence artificielle", titre: "Recommandations CNIL 2025 sur l'IA générative et la protection des données", date: "Mars 2026", commentaire: "La CNIL rappelle l'obligation d'informer les personnes dont les données sont utilisées pour entraîner ou interroger des modèles d'IA, et la nécessité de réaliser une analyse d'impact pour les traitements à haut risque.", exploitation: "Preuve : synthèse CNIL téléchargée. Action : intégrée au module sécurité et confidentialité des données." },
    { lien: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", titreLien: "Commission européenne — AI Act", titre: "Entrée en application progressive de l'AI Act européen", date: "Février 2026", commentaire: "Les obligations de transparence pour les chatbots et les systèmes de génération de contenus sont renforcées : mention obligatoire, information sur les données d'entraînement et interdiction des deepfakes à des fins de manipulation.", exploitation: "Preuve : fiche réglementaire européenne. Action : mise à jour du guide éthique et AI Act remis aux stagiaires." },
    { lien: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050050994", titreLien: "Legifrance — droit d'auteur et IA", titre: "Jurisprudence récente sur la protection des œuvres générées par IA", date: "Janvier 2026", commentaire: "Les contenus entièrement générés par IA sans intervention humaine créative significative ne bénéficient pas de la protection du droit d'auteur en France. La transparence sur l'origine des contenus est encouragée.", exploitation: "Preuve : article de veille juridique. Action : cas pratique sur les droits d'utilisation des visuels IA." },
  ],
  metier: [
    { lien: "https://www.francetravail.fr/", titreLien: "France Travail — études emploi", titre: "Les métiers de la communication les plus recherchés en 2026", date: "Janvier 2026", commentaire: "Les profils maîtrisant l'IA générative pour la création de contenus sont de plus en plus demandés par les TPE-PME et les agences de communication. La maîtrise du prompt engineering est citée comme compétence clé.", exploitation: "Preuve : étude France Travail. Action : orientation professionnelle et valorisation des compétences en fin de formation." },
    { lien: "https://www.hubspot.com/marketing-statistics", titreLien: "HubSpot — marketing statistics", titre: "L'IA générative réduit de 30 % le temps de production de contenus marketing", date: "Décembre 2025", commentaire: "Les équipes utilisant l'IA générative avec une validation humaine constatent un gain de productivité significatif tout en maintenant la qualité perçue par les audiences.", exploitation: "Preuve : synthèse HubSpot. Action : argumentaire ROI pour le plan stratégique d'implémentation." },
  ],
  technologique: [
    { lien: "https://openai.com/chatgpt", titreLien: "OpenAI — ChatGPT", titre: "Nouvelles capacités multimodales de ChatGPT", date: "Février 2026", commentaire: "ChatGPT permet désormais de générer et d'éditer des images directement dans la conversation, facilitant les workflows texte + visuel.", exploitation: "Preuve : capture d'écran et test. Action : démonstration en module 2 et 5." },
    { lien: "https://www.anthropic.com/claude", titreLien: "Anthropic — Claude", titre: "Claude améliore la gestion des contextes longs et la fiabilité des réponses", date: "Mars 2026", commentaire: "Claude se distingue par sa capacité à respecter des consignes complexes sur de longs documents, utile pour l'analyse de briefs et la reformulation de contenus techniques.", exploitation: "Preuve : test comparatif. Action : intégré à l'atelier choix des outils." },
  ],
};

// ---------------------------------------------------------------------------
// Commentaires humanisés pour les QCM
// ---------------------------------------------------------------------------
export const IA_QCM_HUMAN_COMMENTS: { debut: string[][]; fin: string[][] } = {
  debut: [
    ["Je crois que c'est créer du contenu à partir d'instructions, mais je ne savais pas que ça s'appelait comme ça.", "Pour moi l'IA générative c'est ce qui fait les images et les textes, donc créer du contenu nouveau.", "Je dirais créer du contenu, les autres choix n'ont rien à voir avec de l'IA.", "J'ai entendu dire que ChatGPT générait du texte, donc je réponds créer du contenu."],
    ["Midjourney je crois, c'est celui que mon neveu utilise pour faire des images.", "Je pense Midjourney, les autres sont plutôt du texte.", "C'est Midjourney, j'en ai vu des exemples sur LinkedIn.", "Je dirais Midjourney, même si je ne l'ai jamais ouvert."],
    ["C'est pour avoir des meilleurs résultats, la structure aide l'IA à comprendre.", "Je pense que c'est pour être plus précis dans ce qu'on demande.", "Obtenir des résultats pertinents, c'est le but de bien écrire le prompt.", "J'ai vu ça dans une vidéo, la structure Rôle-Contexte-Format."],
    ["Gemini est Google, donc forcément intégré à Google Workspace.", "Je dirais Gemini s'intègre à Google Workspace, c'est logique.", "ChatGPT c'est Microsoft ? Non, Copilot c'est Microsoft. Donc Gemini = Google.", "Je pense que Gemini est lié à Google, c'est ce que j'ai retenu."],
    ["Un communiqué de presse déjà publié, c'est public donc pas de risque.", "Je dirais le communiqué de presse, les autres sont confidentiels.", "Les salaires, coordonnées bancaires et dossiers médicaux c'est très privé.", "Le communiqué de presse, c'est fait pour être diffusé."],
    ["C'est formuler les instructions, le mot 'prompt' c'est l'instruction qu'on donne.", "Prompt engineering = bien écrire ce qu'on demande à l'IA.", "Je dirais formuler des instructions pour obtenir le meilleur résultat.", "J'ai retenu que c'était l'art de bien demander à l'IA."],
    ["Niveau de risque, c'est ce que j'ai vu dans le module AI Act.", "Je pense que c'est classé par risque, comme les médicaments.", "Leur niveau de risque, c'est la base de l'AI Act.", "Je dirais le niveau de risque, les autres n'ont pas de sens."],
    ["Un texte alternatif, c'est ce qui décrit l'image pour les malvoyants.", "Je dirais texte alternatif, j'ai appris ça pour l'accessibilité.", "Alt text, c'est la description de l'image.", "Le texte alternatif, les autres choix n'ont rien à voir."],
    ["Few-shot, c'est donner des exemples, j'ai retenu 'few' = quelques.", "Je pense que c'est donner plusieurs exemples pour guider l'IA.", "C'est donner des exemples dans le prompt, ça me paraît logique.", "Few-shot prompting = exemples, c'est ce que la formatrice a dit."],
    ["Hallucinations, c'est quand l'IA invente des informations.", "Je dirais hallucinations et informations incorrectes, c'est le gros risque.", "L'IA peut dire n'importe quoi, donc vérifier est obligatoire.", "Je pense aux hallucinations, c'est le terme qu'on a vu en formation."],
  ],
  fin: [
    ["Analyser le contexte d'abord, c'est la première étape de la stratégie.", "Je dirais analyser le contexte professionnel, on ne peut pas choisir d'outils sans savoir quoi faire.", "La première étape c'est l'analyse, pas l'achat.", "On commence par identifier les tâches optimisables, c'est logique."],
    ["Le ton, la cible, l'objectif et le format, c'est la structure du prompt.", "Je pense qu'il faut préciser le ton et la cible surtout.", "Ton, cible, objectif, format : c'est ce qui fait un bon prompt LinkedIn.", "Les autres éléments ne servent pas à obtenir un bon post."],
    ["Remplacer par des placeholders, c'est l'anonymisation.", "Je dirais placeholders, comme [NOM] ou [MONTANT].", "Anonymiser c'est enlever les vraies données, donc remplacer.", "C'est la seule méthode sûre pour un outil public."],
    ["C'est un risque éthique et juridique majeur, les deepfakes sont interdits.", "Je dirais risque éthique et juridique, on ne doit pas imiter quelqu'un sans accord.", "C'est un deepfake, c'est très problématique.", "La réponse est clairement le risque juridique."],
    ["Chain-of-thought c'est demander le raisonnement étape par étape.", "Je pense que c'est détailler le raisonnement de l'IA.", "C'est faire réfléchir l'IA pas à pas, j'ai retenu ça.", "Le raisonnement étape par étape, c'est bien ça."],
    ["Langage simple et structuré, c'est la base pour le handicap cognitif.", "Je dirais langage simple, pas de jargon.", "FALC = facile à lire et comprendre, donc simple.", "Une structure claire avec des mots simples."],
    ["Pour les contenus publics, il faut mentionner que c'est de l'IA.", "Je pense que c'est pour les contenus diffusés au public.", "L'AI Act impose la transparence envers le public.", "Les documents internes ou perso ne sont pas concernés."],
    ["Itérer en affinant le prompt, c'est la bonne pratique.", "Je dirais qu'on améliore le prompt progressivement.", "On ne se contente pas du premier résultat, on reformule.", "C'est l'itération, la clé du prompt engineering."],
    ["Vérifier les droits, l'exactitude et la charte graphique.", "Je pense surtout aux droits d'utilisation et à la conformité.", "Un visuel public doit être légal et cohérent avec la marque.", "Les likes et la météo n'ont aucun rapport."],
    ["Le gain de productivité et la qualité, c'est ce qu'on mesure.", "Je dirais le gain de productivité mesurable.", "Le nombre d'outils ne veut rien dire, c'est le résultat qui compte.", "La qualité des contenus et le temps gagné."],
  ],
};

export function pickIAComment(mode: "debut" | "fin", qi: number, seed: number): string {
  const bank = mode === "debut" ? IA_QCM_HUMAN_COMMENTS.debut : IA_QCM_HUMAN_COMMENTS.fin;
  const list = bank[qi % bank.length];
  if (!list || !list.length) return "";
  return list[Math.abs(seed + qi * 7) % list.length];
}

// ---------------------------------------------------------------------------
// Seeder : pré-remplit tous les caches AI pour la formation IA générative.
// ---------------------------------------------------------------------------
export function seedIAGenerativeAICaches(): void {
  try {
    setCachedContentPack(FORMATION_IA_GENERATIVE, IA_GENERATIVE_CONTENT_PACK);
    setCachedEvalPack(FORMATION_IA_GENERATIVE, IA_GENERATIVE_EVAL_PACK);
    setCachedVeillePack(FORMATION_IA_GENERATIVE, IA_GENERATIVE_VEILLE_PACK);
  } catch {
    /* sessionStorage indisponible : ignoré */
  }
}
