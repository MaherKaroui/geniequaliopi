/**
 * Preset complet « Développer son activité avec le webmarketing – 14 h » — formation professionnelle
 * NON certifiante (catégorie « autres formations professionnelles » du BPF, spécialité 321).
 * Programme repris du programme FORMAPOLE (compétences C1 à C6), ramené à 14 h comme la session
 * déclarée au BPF 2025 de l'organisme (1 stagiaire, 14 h, 1 380 €).
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - Formation 14 h (2 jours de 7 h) : C1 objectifs, C2 stratégie, C3 plan d'action, C4 référencement
 *    naturel, C5 réseaux sociaux, C6 pilotage, projet final
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées (diagnostic de départ puis
 *    C1 à C6) et 6 QCM de 10 questions, un par compétence
 *  - Pack évaluation : QCM de positionnement début / fin, cas intermédiaire, évaluation finale
 *    interne (dossier projet + présentation orale au formateur)
 *  - Pack veille (réglementaire / métier / technologique)
 * Le support de cours (8 chapitres) est dans `webmarketing14h/` ; les réponses propres à chaque
 * stagiaire dans `webmarketing14hHumanized.ts`.
 */
import type { FormationInfo } from "@/types/qualiopi";
import type { AIContentPack, AIContentExercise } from "./aiContentPack";
import type { AIEvalPack, AIQCMQuestion } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";

// ---------------------------------------------------------------------------
// Formation
// ---------------------------------------------------------------------------
export const FORMATION_WM14: FormationInfo = {
  intitule: "Développer son activité avec le webmarketing – 14 h",
  codeRNCP: "",
  objectifs:
    "Formation professionnelle non certifiante. Objectifs généraux : mettre en place une stratégie webmarketing ; organiser l'application opérationnelle d'une communication webmarketing ; suivre et évaluer les résultats d'une communication webmarketing.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- C1 — Définir les objectifs webmarketing de l'entreprise par rapport aux résultats souhaités (notoriété, acquisition, fidélisation) et à son positionnement (cible, offre) ; formuler des objectifs SMART.\n- C2 — Concevoir la stratégie webmarketing : choisir les leviers d'acquisition selon le marché, la cible et le budget, et chiffrer ce budget.\n- C3 — Élaborer le plan d'action webmarketing : actions par levier, planning, email marketing, Google Ads, accessibilité des contenus aux personnes en situation de handicap.\n- C4 — Mettre en œuvre le référencement naturel du site : audit sémantique, optimisation technique et éditoriale, indexation, netlinking, suivi.\n- C5 — Mettre en œuvre la communication sur les réseaux sociaux : choix des réseaux, ligne éditoriale, réseaux grand public et professionnels, influenceurs, suivi.\n- C6 — Élaborer un dispositif de pilotage : suivi de l'audience et des résultats, tableaux de bord, rapprochement des ressources mobilisées et des résultats.",
  prerequis:
    "Avoir un projet de développement de son activité par le webmarketing et une appétence pour les outils numériques. Savoir utiliser un ordinateur et naviguer sur internet ; venir si possible avec les accès à son site et à ses comptes (Google, réseaux sociaux) pour travailler sur son entreprise.",
  duree: "14 heures réparties sur 2 jours (7 h/jour)",
  modalites: "présentiel",
  tarif: "1 380 € par stagiaire",
  programme:
    "JOUR 1 — DE L'OBJECTIF AU PLAN D'ACTION (7 h)\nC1 — Définir les objectifs webmarketing de l'entreprise (1 h) : données clés sur le webmarketing ; se fixer des objectifs SMART ; définir les caractéristiques de sa cible webmarketing (persona, parcours client). Cas pratique : préciser son positionnement, sa cible et ses objectifs SMART.\nC2 — Concevoir la stratégie webmarketing de l'entreprise (1 h) : les principaux leviers d'acquisition (site, SEO, SEA, réseaux sociaux, emailing, contenus, avis, partenariats), avantages et inconvénients ; mettre en place un budget ; choisir les leviers en fonction du marché, de la cible et du budget. Cas pratique : grandes lignes de la stratégie et budget.\nC3 — Élaborer le plan d'action webmarketing (2 h) : actions par levier digital ; accessibilité des leviers aux visiteurs en situation de handicap (European Accessibility Act, RGAA, WCAG) ; introduction à l'email marketing (RGPD, segmentation, délivrabilité, scénarios) ; introduction à Google Ads (structure, mots-clés, enchères, suivi des conversions). Cas pratique : plan d'action, planning et mesures d'accessibilité.\nC4 — Mettre en œuvre le référencement naturel du site, partie 1 (3 h) : introduction au référencement ; audit sémantique ; facteurs clés de l'optimisation technique (Core Web Vitals, mobile, HTTPS, balisage) ; soumission et suivi de l'indexation (Google Search Console, sitemap).\n\nJOUR 2 — VISIBILITÉ, RÉSEAUX ET PILOTAGE (7 h)\nC4 — Référencement naturel, partie 2 (1 h) : optimisation éditoriale ; stratégie de netlinking ; suivi du référencement ; référencement local. Cas pratique : plan d'action SEO.\nC5 — Mettre en œuvre la communication sur les réseaux sociaux (4 h) : introduction au web social ; étapes d'une stratégie social media ; choisir ses réseaux selon sa cible ; réseaux grand public et professionnels ; suivi des actions ; communiquer avec les influenceurs (loi du 9 juin 2023). Cas pratique : plan d'action réseaux sociaux.\nC6 — Élaborer un dispositif de pilotage (1 h) : suivi de l'audience et des résultats (Google Analytics 4, Search Console, statistiques des réseaux) ; tableaux de bord ; rapprochement des ressources mobilisées et des résultats. Cas pratique : indicateurs de performance.\nProjet final et bilan (1 h) : présentation orale du plan webmarketing de chaque stagiaire, évaluation de fin de formation, questionnaire de satisfaction.",
  methodesEvaluation:
    "Évaluation des besoins et test de positionnement à l'entrée (10 questions ouvertes + QCM 10 questions), cas pratiques tout au long de la formation (10 mises en situation corrigées : diagnostic de départ puis C1 à C6), un quiz de 10 questions par compétence, cas pratique intermédiaire, test de positionnement de fin (10 questions ouvertes + QCM 10 questions). Évaluation finale interne : dossier projet webmarketing réalisé sur l'entreprise du stagiaire (C1 à C6) et présentation orale au formateur en fin de jour 2. Formation non certifiante : attestation de fin de formation mentionnant les objectifs, la nature, la durée et les résultats de l'évaluation des acquis. Questionnaires de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Formation en présentiel, en salle de formation : poste informatique ou ordinateur personnel connecté à internet par stagiaire, vidéoprojecteur, paperboard, ateliers en sous-groupes et travail sur l'entreprise de chaque stagiaire ; extranet donnant accès aux supports (support de cours en 8 chapitres, cahier d'exercices, corrigés), feuilles d'émargement signées par demi-journée ; outils pratiqués : Google Search Console, Google Analytics 4, Google Business Profile, Google Ads (compte de démonstration), Meta Business Suite, LinkedIn, Canva, Brevo ou Mailchimp (version gratuite), Looker Studio, tableur. Assistance technique et pédagogique par mail et téléphone après la formation pour la mise en œuvre du plan d'action.",
  publicVise:
    "Dirigeants de TPE et de PME, collaborateurs directs, indépendants et porteurs de projet souhaitant intégrer une stratégie webmarketing à leur organisation pour développer leur activité.",
  delaiAcces: "14 jours après validation de l'inscription, sous réserve de places disponibles.",
  dateDebut: "2026-11-02",
  dateFin: "2026-11-03",
  lieu: "",
  nombreParticipants: "8",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Savoir par où commencer : fixer des objectifs webmarketing chiffrés plutôt que « être présent partout ».",
  "Définir précisément sa cible en ligne et ce qu'elle cherche, pour arrêter de communiquer « à tout le monde ».",
  "Choisir les leviers rentables pour son entreprise et répartir un budget limité.",
  "Transformer la stratégie en plan d'action daté, tenable avec le temps disponible au quotidien.",
  "Apparaître sur Google pour les recherches de ses clients, notamment en local.",
  "Comprendre ce que contient la Search Console et corriger les pages non indexées.",
  "Publier régulièrement sur les bons réseaux sociaux sans y passer ses soirées.",
  "Lancer une newsletter ou une première campagne Google Ads sans gaspiller d'argent et en respectant le RGPD.",
  "Mesurer ce que rapporte chaque action (trafic, contacts, ventes) dans un tableau de bord simple.",
  "Repartir avec un plan webmarketing écrit, chiffré et daté pour sa propre entreprise.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins conduite à l'entrée (entretien individuel, test de positionnement, présentation du projet de développement webmarketing de chacun) fait apparaître un groupe de dirigeants et de collaborateurs directs de TPE / PME de secteurs variés (commerce, artisanat, services aux entreprises), avec des niveaux d'usage du numérique hétérogènes. Trois besoins sont partagés par la quasi-totalité du groupe.</p>
<ul>
  <li><strong>La méthode (C1 à C3)</strong> : la présence en ligne existe souvent (site, page Facebook) mais sans objectifs chiffrés, sans cible définie ni plan d'action ; les actions sont menées au coup par coup.</li>
  <li><strong>Le référencement naturel (C4)</strong> : la plupart des sites ne remontent pas sur les recherches locales ou métier ; la Search Console n'est pas installée ou pas consultée.</li>
  <li><strong>La mesure (C6)</strong> : peu de stagiaires savent dire combien de contacts ou de ventes proviennent du web ; Google Analytics 4 est rarement configuré avec des conversions.</li>
</ul>
<p>Les dirigeants expriment en complément un besoin de priorisation compatible avec leur temps disponible ; les collaborateurs un besoin d'outils concrets et de modèles réutilisables ; tous un besoin de repartir avec un plan d'action concret applicable dès la semaine suivant la formation.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Projet réel de chaque stagiaire</strong> : toutes les mises en situation sont réalisées sur l'entreprise du stagiaire (ou sur l'entreprise fil rouge Maison Lenoir s'il ne peut pas utiliser ses données) ; elles alimentent directement le projet final présenté en fin de jour 2.</li>
  <li><strong>Stagiaires peu à l'aise avec les outils</strong> : tutoriels pas à pas (création de la Search Console, de GA4, de la fiche Google Business Profile), séance de prise en main en début de parcours, partage d'écran accompagné.</li>
  <li><strong>Stagiaires déjà avancés</strong> : approfondissement sur Google Ads, l'automatisation emailing et Looker Studio ; rôle de binôme-ressource pendant les ateliers.</li>
  <li><strong>Temps disponible limité</strong> : plan d'action calibré sur 2 à 4 heures par semaine, modèles de calendrier éditorial et de tableau de bord fournis prêts à l'emploi.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, supports compatibles lecteur d'écran, salle accessible aux personnes à mobilité réduite, poste adapté sur demande, temps majoré et aménagement de la présentation finale sur demande.</li>
</ul>`;

/** 10 mises en situation (diagnostic de départ puis C1 à C6), corrigés formateur. */
export const WM14_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — Diagnostic de départ : la présence en ligne de mon entreprise",
    consigne:
      "Pour votre entreprise (ou, à défaut, la boulangerie-pâtisserie Maison Lenoir, Nantes, 6 salariés, qui veut développer le click & collect et le traiteur pour les entreprises), dressez l'état des lieux de la présence en ligne : 1. Inventaire des points de contact (site, fiche Google Business Profile, réseaux sociaux, annuaires, places de marché, newsletter) avec pour chacun l'URL, la date de dernière mise à jour et une note de 1 à 5. 2. Trois concurrents directs comparés sur les mêmes points. 3. Ce que les clients trouvent quand ils cherchent votre activité + votre ville sur Google. 4. Les données de mesure disponibles (GA4, Search Console, statistiques des réseaux). 5. Une conclusion : 3 forces, 3 faiblesses, 3 priorités.",
    reponseAttendue:
      "Inventaire complet et daté : site (mobile, HTTPS, vitesse), fiche Google Business Profile (catégorie, horaires, photos, avis et réponses), réseaux actifs ou abandonnés, annuaires (Pages Jaunes, annuaires locaux), cohérence NAP (nom, adresse, téléphone identiques partout).\nBenchmark de 3 concurrents sur les mêmes critères, avec ce qu'ils font mieux et une opportunité non exploitée.\nRecherche « activité + ville » : position du site et de la fiche dans le pack local, présence d'avis, pages concurrentes devant soi.\nMesure : GA4 et Search Console installés ou non, conversions suivies ou non ; à défaut, priorité n° 1 = installer la mesure.\nConclusion : forces, faiblesses et priorités tirées des constats, sans confondre interne et externe.\nBarème : inventaire 6, benchmark 4, recherche locale 3, mesure 3, conclusion 4.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 : positionnement, cible et objectifs SMART",
    consigne:
      "1. Rédigez la formule de positionnement de l'entreprise (pour [cible], [entreprise] est [catégorie] qui [bénéfice], contrairement à [concurrents] parce que [preuve]). 2. Construisez deux personas (un B2C, un B2B si pertinent) : profil, besoins, freins, recherches tapées sur Google, réseaux utilisés, critères de choix. 3. Décrivez leur parcours client en ligne en 4 étapes (découverte, considération, décision, fidélisation) avec le point de contact clé de chaque étape. 4. Formulez 3 objectifs SMART reliés aux résultats souhaités : notoriété, acquisition, fidélisation.",
    reponseAttendue:
      "Positionnement complet en une phrase, différenciant et prouvé (ex. Maison Lenoir : « Pour les entreprises du quartier Malakoff, Maison Lenoir est le traiteur artisanal qui livre des plateaux faits maison en 24 h, contrairement aux chaînes de restauration livrée, parce que tout est préparé le matin même sur place »).\nPersonas fondés sur des données (clients actuels, avis, questions reçues), avec les requêtes réellement tapées et les canaux utilisés.\nParcours client en 4 étapes avec un point de contact et un contenu adapté à chaque étape.\nObjectifs SMART : spécifique, mesurable (indicateur et valeur cible), atteignable, réaliste au regard des moyens, temporellement défini — ex. « 40 commandes click & collect par mois d'ici le 31 mars », « 15 demandes de devis traiteur B2B par trimestre », « 25 % des clients click & collect qui recommandent dans les 60 jours ».\nBarème : positionnement 4, personas 6, parcours 4, objectifs SMART 6.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C2 : concevoir la stratégie et son budget",
    consigne:
      "À partir de vos objectifs : 1. Comparez au moins 6 leviers d'acquisition (site et SEO, SEO local / fiche Google, Google Ads, réseaux sociaux organiques, publicité sociale, emailing, contenus, avis clients, partenariats, places de marché) : avantages, inconvénients, délai de résultat, coût, temps interne. 2. Retenez 3 à 4 leviers en justifiant le choix par le marché, la cible et le budget. 3. Construisez le budget annuel : coûts externes (outils, publicité, prestataires) et temps interne valorisé. 4. Estimez le résultat attendu (contacts, ventes) et le coût par acquisition visé.",
    reponseAttendue:
      "Tableau comparatif exact : SEO = coût faible mais résultats en plusieurs mois ; Google Ads = résultat immédiat mais coût au clic et arrêt du trafic à l'arrêt du budget ; réseaux organiques = notoriété et proximité, portée limitée et temps important ; emailing = fidélisation à faible coût, base opt-in nécessaire ; avis = confiance et SEO local.\nChoix justifié par la cible (où elle cherche), le marché (concurrence sur les mots-clés), le budget et le temps disponible ; cohérence avec les objectifs SMART.\nBudget ventilé par levier, outils et temps interne valorisé (ex. 3 h/semaine × coût horaire), réserve de test pour la publicité.\nEstimation chiffrée et cohérente des résultats (trafic × taux de conversion × panier moyen) et coût par acquisition visé comparé à la marge par client.\nBarème : comparatif 6, choix justifiés 5, budget 5, estimation 4.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C3 : plan d'action, planning et accessibilité",
    consigne:
      "Déclinez la stratégie retenue en plan d'action sur 6 mois : 1. Pour chaque levier, listez les actions (quoi, qui, quand, coût, indicateur). 2. Construisez un rétroplanning ou un diagramme de Gantt mensuel avec les jalons. 3. Intégrez au moins 6 mesures d'accessibilité pour les visiteurs en situation de handicap (site, emails, publications sociales, vidéos) en citant les références applicables. 4. Identifiez 3 risques du plan et la parade prévue.",
    reponseAttendue:
      "Plan d'action par levier avec actions concrètes, responsable, échéance, coût et indicateur ; actions séquencées (fondations d'abord : mesure, fiche Google, pages clés ; puis contenus et campagnes).\nPlanning lisible avec jalons (mise en ligne, lancement campagne, bilan mensuel) et charge compatible avec le temps disponible.\nAccessibilité : textes alternatifs des images, contrastes suffisants, titres hiérarchisés, liens explicites, formulaires étiquetés, navigation au clavier, sous-titres des vidéos, emails lisibles en texte, hashtags en CamelCase, emojis limités ; références : European Accessibility Act applicable depuis le 28 juin 2025, RGAA 4.1, WCAG 2.1 / 2.2 niveau AA.\nRisques réalistes (manque de temps, budget publicitaire mal calibré, contenus irréguliers) avec parade (batch de production, budget de test plafonné, calendrier éditorial).\nBarème : plan d'action 7, planning 4, accessibilité 6, risques 3.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C3 : concevoir une campagne d'email marketing conforme",
    consigne:
      "1. Expliquez comment constituer la base de contacts en respectant le RGPD, auprès des particuliers comme des professionnels. 2. Proposez une segmentation en 3 segments. 3. Concevez un scénario automatisé de 3 emails (bienvenue, offre, relance) : objectif, objet, contenu, appel à l'action, délai. 4. Listez les conditions de délivrabilité (authentification du domaine, désinscription). 5. Fixez les indicateurs de suivi et leurs seuils d'alerte.",
    reponseAttendue:
      "Base : B2C = consentement préalable, libre et spécifique (case non pré-cochée), sauf clients existants pour des produits analogues avec possibilité d'opposition ; B2B = information et droit d'opposition, message en rapport avec la fonction du destinataire ; preuve du consentement conservée ; lien de désinscription dans chaque envoi ; pas d'achat de fichier non conforme.\nSegmentation pertinente (ex. particuliers click & collect, entreprises traiteur, prospects inscrits sans achat).\nScénario de 3 emails cohérent avec objet court, un seul appel à l'action par email, délais justifiés.\nDélivrabilité : authentification SPF, DKIM et DMARC, désinscription en un clic exigée par Gmail et Yahoo pour les envois en nombre depuis 2024, taux de plainte bas, nettoyage des adresses inactives.\nIndicateurs : taux de délivrabilité, d'ouverture (indicatif depuis la protection de la confidentialité d'Apple Mail), de clic, de conversion, de désinscription et de plainte.\nBarème : RGPD 5, segmentation 3, scénario 6, délivrabilité 3, indicateurs 3.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C3 : préparer une première campagne Google Ads",
    consigne:
      "Avec un budget de test de 300 € sur un mois : 1. Proposez la structure (campagne, groupes d'annonces, thèmes). 2. Choisissez 15 mots-clés avec leur type de correspondance et 10 mots-clés à exclure. 3. Rédigez une annonce responsive (titres et descriptions) et ses composants (lieu, appel, liens annexes). 4. Paramétrez le ciblage géographique, le calendrier et la stratégie d'enchères. 5. Définissez la conversion suivie et les indicateurs pour décider de poursuivre ou non.",
    reponseAttendue:
      "Structure Réseau de Recherche avec groupes thématiques (ex. traiteur entreprise Nantes, plateaux repas, click & collect) ; une page de destination adaptée par groupe.\nMots-clés en correspondance expression ou exacte pour maîtriser le budget, requête large réservée à une stratégie pilotée par les conversions ; mots-clés négatifs (recette, gratuit, emploi, formation, CAP…).\nAnnonce responsive : plusieurs titres de 30 caractères maximum et descriptions de 90 caractères, bénéfice, preuve, appel à l'action ; composants (lieu, appel, liens annexes, accroches).\nCiblage sur la zone de livraison, diffusion aux horaires de prise de commande, budget quotidien d'environ 10 €, enchères au CPC maximum ou « Maximiser les clics » au démarrage puis stratégie orientée conversions quand le volume le permet.\nConversion suivie (demande de devis, commande, appel) avec GA4 ou balise Google Ads et Consent Mode v2 ; indicateurs : CTR, CPC moyen, taux de conversion, coût par conversion comparé à la marge ; règle de décision écrite.\nBarème : structure 4, mots-clés 4, annonce 4, paramétrage 4, mesure 4.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C4 : audit sémantique et audit technique du site",
    consigne:
      "1. Construisez l'audit sémantique : 20 requêtes classées par intention (informationnelle, commerciale, transactionnelle, locale), avec volume estimé, difficulté et page cible. 2. Proposez l'arborescence cible du site (pages à créer, fusionner ou supprimer). 3. Réalisez l'audit technique à partir de PageSpeed Insights et de la Search Console : Core Web Vitals, ergonomie mobile, HTTPS, pages indexées / exclues, sitemap, robots.txt, balises title et meta description, Hn, images. 4. Classez les corrections par priorité (impact × effort).",
    reponseAttendue:
      "Requêtes réalistes issues d'outils (Search Console, Google Keyword Planner, suggestions Google, Ubersuggest) classées par intention, une requête principale par page, pas de cannibalisation.\nArborescence logique, pages locales et pages d'offre, maillage interne prévu.\nAudit technique exact : Core Web Vitals (LCP ≤ 2,5 s, INP ≤ 200 ms — l'INP remplace le FID depuis mars 2024 —, CLS ≤ 0,1), compatibilité mobile, HTTPS, rapport d'indexation des pages et motifs d'exclusion, sitemap XML déclaré, robots.txt ne bloquant pas les pages utiles, balises title uniques, meta descriptions incitatives, un seul H1, images compressées avec attribut alt.\nPriorisation argumentée impact × effort (ex. corriger les pages non indexées et les titles avant le netlinking).\nBarème : audit sémantique 7, arborescence 3, audit technique 7, priorisation 3.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C4 : optimisation éditoriale, netlinking et suivi du référencement",
    consigne:
      "1. Optimisez une page stratégique : title, meta description, H1/H2, plan de contenu, maillage interne, données structurées (LocalBusiness ou Product). 2. Planifiez 6 contenus sur 3 mois répondant aux questions des personas. 3. Proposez une stratégie de netlinking éthique (10 sources de liens réalistes) et les pratiques à proscrire. 4. Optimisez la fiche Google Business Profile. 5. Définissez le suivi : indicateurs Search Console, positions, trafic organique et conversions GA4, fréquence.",
    reponseAttendue:
      "Page optimisée : title ≈ 50-60 caractères avec la requête principale, meta description incitative, H1 unique, plan H2 couvrant les intentions, contenu utile démontrant l'expérience et l'expertise (E-E-A-T), liens internes descriptifs, balisage schema.org valide (test des résultats enrichis).\nCalendrier éditorial de 6 contenus reliés aux requêtes et aux étapes du parcours client.\nNetlinking : annuaires locaux et professionnels sérieux, partenaires, fournisseurs, presse locale, associations, chambres consulaires, événements ; proscrire achat massif de liens, échanges systématiques, réseaux de sites (pénalités Google).\nFiche Google : catégorie principale exacte, horaires, photos, produits / services, publications, réponse à tous les avis, cohérence NAP.\nSuivi mensuel : clics, impressions, CTR et position moyenne dans la Search Console, pages indexées, trafic organique et conversions dans GA4, actions correctives.\nBarème : page 6, calendrier 4, netlinking 4, fiche Google 3, suivi 3.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C5 : plan d'action réseaux sociaux et collaboration avec un influenceur",
    consigne:
      "1. Choisissez 2 ou 3 réseaux (grand public et professionnel) en justifiant par la cible. 2. Définissez la ligne éditoriale : objectifs par réseau, piliers de contenu, ton, formats, fréquence. 3. Construisez le calendrier éditorial d'un mois. 4. Prévoyez la modération et la gestion d'un avis négatif. 5. Préparez une collaboration avec un micro-influenceur local : sélection, brief, contrat, mentions obligatoires. 6. Fixez les indicateurs de suivi et le paramétrage UTM des liens.",
    reponseAttendue:
      "Réseaux choisis selon la cible (ex. Instagram et Facebook pour les particuliers locaux, LinkedIn page entreprise + profil du dirigeant pour le traiteur entreprises), pas de dispersion.\nLigne éditoriale : 3 à 4 piliers (coulisses, produits, clients, expertise), ton, formats adaptés (Reels, carrousels, Stories, posts LinkedIn), fréquence tenable.\nCalendrier d'un mois réaliste, avec temps forts.\nModération : charte, délai de réponse, réponse publique factuelle et courtoise à un avis négatif puis échange en privé.\nInfluence : sélection sur l'audience locale et l'engagement plutôt que le nombre d'abonnés, brief écrit, contrat écrit, mention claire « publicité » ou « collaboration commerciale » conformément à la loi du 9 juin 2023, respect des interdictions de promotion.\nIndicateurs : portée, taux d'engagement, clics, abonnés qualifiés, conversions via liens UTM (source, medium, campaign) suivies dans GA4.\nBarème : choix des réseaux 3, ligne éditoriale 4, calendrier 4, modération 2, influence 4, suivi 3.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C6 : tableau de bord de pilotage et analyse des résultats",
    consigne:
      "À partir des données de trois mois fournies (sessions par source, conversions, dépenses Google Ads, temps passé, statistiques des réseaux et de l'emailing) : 1. Construisez le tableau de bord mensuel (8 à 10 KPI reliés aux objectifs SMART). 2. Calculez pour chaque levier le coût par acquisition et le retour sur investissement en intégrant le temps interne. 3. Rapprochez les ressources mobilisées et les résultats : quels leviers renforcer, réduire ou arrêter ? 4. Rédigez une note de synthèse d'une page pour le dirigeant avec 3 décisions.",
    reponseAttendue:
      "Tableau de bord (tableur ou Looker Studio) avec indicateurs de résultat et d'activité reliés aux objectifs : sessions par canal, conversions (événements clés GA4), taux de conversion, coût par acquisition, chiffre d'affaires attribué, clics et position moyenne Search Console, engagement des réseaux, taux de clic de l'emailing ; comparaison mois par mois et à l'objectif.\nCalculs exacts : CPA = coût total du levier (externe + temps interne valorisé) / conversions ; ROI = (marge générée − coût) / coût ; ROAS = CA attribué / dépense publicitaire.\nRapprochement argumenté ressources / résultats ; limites de l'attribution signalées (données de consentement, parcours multicanal).\nNote de synthèse claire, 3 décisions chiffrées et datées.\nBarème : tableau de bord 6, calculs 5, rapprochement 5, note 4.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par compétence (10 questions chacun)
// Format lu par le générateur d'exercices : « 1) … A) …   B) …   C) …   D) … » + « 1-B  2-C … ».
// Aucune parenthèse fermante après A, B, C ou D dans les énoncés (le parseur s'en servirait).
// ---------------------------------------------------------------------------
type Q = [question: string, options: [string, string, string, string], correct: 0 | 1 | 2 | 3];
const LETTRES = ["A", "B", "C", "D"] as const;

function qcmExercice(titre: string, questions: Q[]): AIContentExercise {
  const consigne =
    `Cochez la bonne réponse pour chacune des ${questions.length} questions :\n\n` +
    questions
      .map(([q, opts], i) => `${i + 1}) ${q}\n  ${opts.map((o, oi) => `${LETTRES[oi]}) ${o}`).join("   ")}`)
      .join("\n\n");
  const reponseAttendue = questions.map(([, , c], i) => `${i + 1}-${LETTRES[c]}`).join("  ");
  return { titre, consigne, reponseAttendue, points: questions.length };
}

const QCM_C1: Q[] = [
  ["Un objectif SMART est :", ["Simple, Moderne, Ambitieux, Rapide, Total", "Spécifique, Mesurable, Atteignable, Réaliste, Temporellement défini", "Stratégique, Mensuel, Annuel, Rentable, Testé", "Suivi, Mesuré, Animé, Révisé, Tracé"], 1],
  ["Lequel de ces objectifs est formulé de façon SMART ?", ["Être plus visible sur internet", "Avoir beaucoup d'abonnés", "Obtenir 15 demandes de devis traiteur par trimestre d'ici le 31 mars", "Faire mieux que les concurrents"], 2],
  ["Un persona est :", ["Le portrait type et semi-fictif d'un client cible, fondé sur des données", "Un concurrent direct", "Un salarié chargé du site", "Un indicateur de rentabilité"], 0],
  ["L'objectif de notoriété se mesure d'abord par :", ["Le taux de marge", "Le nombre de factures", "Le délai de paiement", "La portée, les impressions et les recherches de la marque"], 3],
  ["Dans le parcours client, l'étape où le prospect compare les solutions est :", ["La fidélisation", "La considération", "La découverte", "L'après-vente"], 1],
  ["Une formule de positionnement précise :", ["La cible, la catégorie, le bénéfice et la différence face aux concurrents", "Le budget publicitaire", "Le nombre de salariés", "La liste des réseaux sociaux"], 0],
  ["Pour connaître les requêtes réellement tapées par ses clients, on consulte en priorité :", ["Le bilan comptable", "Le rapport Performances de la Google Search Console", "Le registre du personnel", "Le Kbis"], 1],
  ["Un objectif d'acquisition porte sur :", ["La satisfaction des salariés", "Le nombre de produits en stock", "Le gain de nouveaux contacts ou clients", "La notoriété de la marque employeur"], 2],
  ["Le taux de conversion se calcule par :", ["Visites / conversions", "Chiffre d'affaires / dépenses", "Abonnés / publications", "Conversions / visites × 100"], 3],
  ["Le webmarketing d'une TPE commence par :", ["Des objectifs reliés aux résultats souhaités et à la cible", "L'ouverture d'un compte sur chaque réseau social", "L'achat de publicité", "La refonte complète du site"], 0],
];

const QCM_C2: Q[] = [
  ["Le principal inconvénient du référencement naturel est :", ["Son coût au clic", "Le délai de plusieurs mois avant les résultats", "L'interdiction en B2B", "L'arrêt du trafic dès qu'on arrête de payer"], 1],
  ["Le principal avantage de Google Ads est :", ["La gratuité", "L'absence de suivi nécessaire", "Une visibilité immédiate sur des requêtes choisies", "Un trafic qui continue sans budget"], 2],
  ["SEA désigne :", ["La publicité sur les moteurs de recherche", "L'optimisation du référencement naturel", "La publicité sur les réseaux sociaux", "L'emailing"], 0],
  ["L'emailing est surtout efficace pour :", ["Recruter des abonnés inconnus sans consentement", "Améliorer les Core Web Vitals", "Remplacer le site internet", "Fidéliser et réactiver une base de contacts opt-in"], 3],
  ["Pour une TPE locale, le levier le plus rentable à mettre en place en premier est souvent :", ["Une campagne télévisée", "La fiche Google Business Profile et le référencement local", "Un salon international", "Un achat de fichier"], 1],
  ["Le coût par acquisition se calcule par :", ["Coût total de l'action / nombre de clients ou contacts obtenus", "Chiffre d'affaires / nombre de visites", "Clics / impressions", "Budget / nombre de salariés"], 0],
  ["Pour choisir ses leviers, on croise d'abord :", ["Les goûts du dirigeant et la mode", "Les leviers des grandes marques", "Le marché, la cible, le budget et le temps disponible", "Le nombre de réseaux existants"], 2],
  ["Dans un budget webmarketing de TPE, le temps interne :", ["Est gratuit et ne se compte pas", "Est interdit", "Est remboursé par Google", "Doit être valorisé comme une ressource"], 3],
  ["Les médias « owned » désignent :", ["Les supports appartenant à l'entreprise : site, newsletter, blog", "Les publicités achetées", "Les articles de presse obtenus", "Les avis des clients"], 0],
  ["Le marketing de contenu consiste à :", ["Acheter des liens", "Publier des contenus utiles qui attirent et convainquent la cible", "Envoyer des SMS sans consentement", "Multiplier les publicités"], 1],
];

const QCM_C3: Q[] = [
  ["Depuis quelle date l'European Accessibility Act s'applique-t-il en France à de nombreux services numériques ?", ["1er janvier 2024", "28 juin 2025", "1er septembre 2026", "Il ne s'applique pas"], 1],
  ["Le texte alternatif d'une image sert à :", ["Décrire l'image aux personnes utilisant un lecteur d'écran", "Accélérer le site", "Empêcher la copie", "Afficher une légende décorative"], 0],
  ["Le référentiel général d'amélioration de l'accessibilité se nomme :", ["RGPD", "RGS", "RGAA", "RGE"], 2],
  ["En prospection par email auprès de particuliers, il faut en principe :", ["Une simple information après envoi", "Aucune formalité", "L'accord du maire", "Le consentement préalable du destinataire"], 3],
  ["SPF, DKIM et DMARC servent à :", ["Authentifier le domaine expéditeur et améliorer la délivrabilité", "Mesurer le taux d'ouverture", "Créer des visuels", "Héberger le site"], 0],
  ["Dans Google Ads, un mot-clé négatif :", ["Augmente l'enchère", "Empêche l'annonce de s'afficher sur une requête non pertinente", "Améliore le référencement naturel", "Supprime la campagne"], 1],
  ["Le niveau de qualité Google Ads dépend notamment :", ["Du nombre d'abonnés Instagram", "De l'ancienneté de l'entreprise", "Du CTR attendu, de la pertinence de l'annonce et de l'expérience sur la page de destination", "Du chiffre d'affaires"], 2],
  ["Un diagramme de Gantt sert à :", ["Calculer le ROI", "Choisir les mots-clés", "Rédiger une annonce", "Planifier les actions dans le temps et visualiser les jalons"], 3],
  ["Pour rendre un hashtag lisible par un lecteur d'écran, on l'écrit :", ["En CamelCase, par exemple #MaisonLenoir", "Tout en minuscules", "Avec des emojis", "En majuscules"], 0],
  ["Le Consent Mode v2 de Google sert à :", ["Créer des annonces", "Transmettre les choix de consentement aux outils Google de mesure et de publicité", "Accélérer le site", "Gérer les avis"], 1],
];

const QCM_C4: Q[] = [
  ["Les trois grandes étapes du fonctionnement d'un moteur de recherche sont :", ["Achat, enchère, diffusion", "Exploration, indexation, classement", "Rédaction, publication, partage", "Audit, devis, facture"], 1],
  ["Un audit sémantique sert à :", ["Identifier les requêtes de la cible et les associer aux pages du site", "Mesurer la vitesse du serveur", "Vérifier les factures", "Créer un logo"], 0],
  ["Quel indicateur a remplacé le FID dans les Core Web Vitals en mars 2024 ?", ["Le LCP", "Le CLS", "L'INP", "Le TTFB"], 2],
  ["L'outil gratuit de Google pour suivre l'indexation et les requêtes d'un site est :", ["Google Ads", "Google Business Profile", "Looker Studio", "Google Search Console"], 3],
  ["Le fichier sitemap.xml sert à :", ["Bloquer les robots", "Lister les URL à faire découvrir aux moteurs", "Stocker les mots de passe", "Afficher le menu"], 1],
  ["La balise title d'une page doit être :", ["Unique, descriptive et contenir la requête principale", "Identique sur toutes les pages", "Laissée vide", "Rédigée uniquement en majuscules"], 0],
  ["Une redirection 301 indique :", ["Une erreur serveur", "Une page temporairement indisponible", "Un déplacement permanent de la page", "Une page interdite"], 2],
  ["Le netlinking consiste à :", ["Optimiser les images", "Rédiger des meta descriptions", "Créer des comptes sur les réseaux", "Obtenir des liens d'autres sites vers le sien"], 3],
  ["Pour le référencement local, la cohérence NAP signifie :", ["Nom, adresse et téléphone identiques sur tous les supports", "Nombre d'avis positifs", "Navigation adaptée au mobile", "Nom de domaine en .fr"], 0],
  ["E-E-A-T désigne les critères de qualité :", ["Email, Ergonomie, Accessibilité, Trafic", "Expérience, Expertise, Autorité, Fiabilité", "Engagement, Échange, Audience, Taux", "Édition, Écriture, Archivage, Titre"], 1],
];

const QCM_C5: Q[] = [
  ["La première étape d'une stratégie social media est :", ["Publier tous les jours", "Fixer des objectifs et définir la cible", "Acheter des abonnés", "Créer un compte sur chaque réseau"], 1],
  ["Le réseau le plus adapté pour toucher des décideurs en B2B est :", ["LinkedIn", "Snapchat", "Pinterest", "Twitch"], 0],
  ["Le taux d'engagement mesure :", ["Le nombre d'abonnés", "Le budget dépensé", "Les interactions rapportées à la portée ou aux abonnés", "Le nombre de publications"], 2],
  ["Depuis la loi du 9 juin 2023, un contenu d'influenceur sponsorisé doit porter la mention :", ["« Contenu libre »", "« Avis personnel »", "Aucune mention", "« Publicité » ou « Collaboration commerciale »"], 3],
  ["Un calendrier éditorial sert à :", ["Planifier les publications, leurs thèmes et leurs formats", "Calculer le budget Google Ads", "Suivre l'indexation", "Gérer la paie"], 0],
  ["Face à un avis négatif publié, la bonne pratique est :", ["Le supprimer sans répondre", "Répondre publiquement de façon factuelle et courtoise puis proposer un échange privé", "Répondre avec ironie", "Bloquer tous les commentaires"], 1],
  ["Les paramètres UTM servent à :", ["Accélérer le site", "Créer des visuels", "Identifier la source, le support et la campagne d'un clic dans l'outil d'analyse", "Protéger les données"], 2],
  ["Un micro-influenceur se choisit d'abord sur :", ["Son nombre total d'abonnés", "Son prix le plus bas", "Sa présence sur tous les réseaux", "L'adéquation de son audience avec la cible et la qualité de son engagement"], 3],
  ["Les Reels et les Shorts sont :", ["Des formats vidéo courts verticaux", "Des formats d'emailing", "Des rapports d'audience", "Des campagnes Google Ads"], 0],
  ["Le social selling consiste à :", ["Acheter des fans", "Utiliser les réseaux sociaux pour créer des relations et prospecter", "Vendre ses comptes sociaux", "Publier uniquement des promotions"], 1],
];

const QCM_C6: Q[] = [
  ["L'outil d'analyse d'audience de Google utilisé aujourd'hui est :", ["Universal Analytics", "Google Analytics 4", "Google Ads Editor", "Google Trends"], 1],
  ["Un KPI est :", ["Un indicateur clé de performance relié à un objectif", "Un logiciel de comptabilité", "Un type d'annonce", "Un réseau social"], 0],
  ["Le ROAS se calcule par :", ["Clics / impressions", "Coût / conversions", "Chiffre d'affaires attribué / dépense publicitaire", "Abonnés / publications"], 2],
  ["Dans GA4, une action importante à suivre (devis, commande) est déclarée comme :", ["Une dimension", "Une audience", "Un segment", "Un événement clé"], 3],
  ["Le ROI d'une action webmarketing se calcule par :", ["(Gain − coût) / coût", "Coût / gain", "Gain × coût", "Visites / coût"], 0],
  ["Un tableau de bord efficace pour un dirigeant de TPE contient :", ["Toutes les métriques disponibles", "8 à 10 indicateurs reliés aux objectifs, comparés à la cible", "Uniquement le nombre d'abonnés", "Les données brutes sans commentaire"], 1],
  ["Looker Studio permet de :", ["Créer des annonces", "Héberger un site", "Construire des tableaux de bord à partir de GA4, de la Search Console ou d'un tableur", "Envoyer des emails"], 2],
  ["Rapprocher ressources et résultats consiste à :", ["Compter les publications", "Comparer les réseaux sociaux entre eux", "Calculer le nombre de salariés", "Mettre en regard le budget et le temps engagés par levier avec les conversions obtenues"], 3],
  ["La métrique de GA4 qui mesure la part des sessions engagées est :", ["Le taux d'engagement", "Le CTR", "Le CPC", "Le Quality Score"], 0],
  ["Une revue de performance mensuelle doit aboutir à :", ["Un simple export de chiffres", "Des décisions : renforcer, ajuster ou arrêter certaines actions", "La suppression des comptes", "Un changement de nom de domaine"], 1],
];

export const WM14_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Définir les objectifs webmarketing de l'entreprise", QCM_C1),
  qcmExercice("QCM C2 — Concevoir la stratégie webmarketing de l'entreprise", QCM_C2),
  qcmExercice("QCM C3 — Élaborer le plan d'action webmarketing", QCM_C3),
  qcmExercice("QCM C4 — Mettre en œuvre le référencement naturel du site", QCM_C4),
  qcmExercice("QCM C5 — Mettre en œuvre la communication sur les réseaux sociaux", QCM_C5),
  qcmExercice("QCM C6 — Élaborer un dispositif de pilotage", QCM_C6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (diagnostic puis C1 à C6), alignées sur les
 * 10 questions de positionnement et sur les copies de `webmarketing14hHumanized.ts` ; les 6 QCM ensuite.
 */
export const WM14_EXERCICES_COMPLETS: AIContentExercise[] = [...WM14_EXERCICES, ...WM14_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Développer son activité avec le webmarketing » (8 chapitres)</strong> : le webmarketing et l'organisation de la formation, C1 à C6, projet final ; quiz et cas pratique corrigés à la fin de chaque compétence.</li>
  <li><strong>Cahier d'exercices</strong> : test de positionnement, 10 mises en situation professionnelles (diagnostic de départ puis C1 à C6) réalisées sur l'entreprise du stagiaire ; <strong>corrigés formateur</strong> publiés après correction.</li>
  <li><strong>6 QCM de 10 questions</strong>, un par compétence (C1 à C6), corrigés et notés sur la plateforme.</li>
  <li><strong>Grille d'évaluation du projet final</strong> : critères par compétence C1 à C6 et grille d'autoévaluation.</li>
  <li><strong>Modèles</strong> : fiche persona, matrice des leviers, budget webmarketing, plan d'action et Gantt, audit sémantique, check-list technique SEO, calendrier éditorial, brief influenceur, tableau de bord, trame du dossier projet final.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Salle de formation</strong> : vidéoprojecteur, paperboard, connexion internet, travail en sous-groupes ; extranet pour les supports et les corrigés.</li>
  <li><strong>Outils Google</strong> : Search Console, Analytics 4, Business Profile, Ads (compte de démonstration), PageSpeed Insights, Looker Studio, Keyword Planner.</li>
  <li><strong>Réseaux sociaux</strong> : Meta Business Suite, LinkedIn (page entreprise), Canva pour les visuels.</li>
  <li><strong>Emailing</strong> : Brevo ou Mailchimp en version gratuite.</li>
  <li><strong>Accessibilité</strong> : vérificateurs de contraste, extension WAVE, lecteur d'écran NVDA pour tester ses pages.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>Entreprendre.Service-Public — vendre en ligne</strong> : <a href="https://entreprendre.service-public.fr/">https://entreprendre.service-public.fr/</a> — mentions obligatoires d'un site, vente à distance, avis clients.</li>
  <li><strong>Google Search Central</strong> : <a href="https://developers.google.com/search/docs?hl=fr">https://developers.google.com/search/docs?hl=fr</a> — documentation officielle du référencement.</li>
  <li><strong>CNIL — prospection commerciale</strong> : <a href="https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique">https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique</a> — règles B2C et B2B.</li>
  <li><strong>France Num</strong> : <a href="https://www.francenum.gouv.fr/">https://www.francenum.gouv.fr/</a> — guides numériques pour les TPE / PME.</li>
  <li><strong>Accessibilité numérique — RGAA</strong> : <a href="https://accessibilite.numerique.gouv.fr/">https://accessibilite.numerique.gouv.fr/</a> — critères et méthode de test.</li>
  <li><strong>Économie.gouv — influence commerciale</strong> : <a href="https://www.economie.gouv.fr/influence-commerciale">https://www.economie.gouv.fr/influence-commerciale</a> — obligations issues de la loi du 9 juin 2023.</li>
</ul>`;

const WM14_VIDEOS = [
  { title: "Fixer des objectifs SMART en webmarketing", description: "Relier objectifs, indicateurs et échéances.", url: "https://www.youtube.com/results?search_query=objectifs+SMART+webmarketing" },
  { title: "Construire un persona marketing", description: "Partir des données clients pour décrire la cible.", url: "https://www.youtube.com/results?search_query=construire+persona+marketing" },
  { title: "Les leviers d'acquisition digitale", description: "SEO, SEA, réseaux sociaux, emailing : avantages et limites.", url: "https://www.youtube.com/results?search_query=leviers+acquisition+digitale+TPE" },
  { title: "Accessibilité numérique : les bases", description: "RGAA, WCAG et bonnes pratiques de contenu.", url: "https://www.youtube.com/results?search_query=accessibilit%C3%A9+num%C3%A9rique+RGAA+bases" },
  { title: "Google Ads pour débutants", description: "Structure de compte, mots-clés et suivi des conversions.", url: "https://www.youtube.com/results?search_query=google+ads+d%C3%A9butant+tutoriel" },
  { title: "Google Search Console : prise en main", description: "Indexation, performances et sitemap.", url: "https://www.youtube.com/results?search_query=google+search+console+tutoriel" },
  { title: "Audit sémantique et recherche de mots-clés", description: "Intention de recherche et page cible.", url: "https://www.youtube.com/results?search_query=audit+s%C3%A9mantique+mots+cl%C3%A9s+SEO" },
  { title: "Optimiser sa fiche Google Business Profile", description: "Référencement local et avis clients.", url: "https://www.youtube.com/results?search_query=optimiser+fiche+google+business+profile" },
  { title: "Stratégie social media pour TPE", description: "Choisir ses réseaux et sa ligne éditoriale.", url: "https://www.youtube.com/results?search_query=strat%C3%A9gie+r%C3%A9seaux+sociaux+TPE" },
  { title: "Google Analytics 4 et tableau de bord Looker Studio", description: "Suivre les conversions et piloter.", url: "https://www.youtube.com/results?search_query=GA4+looker+studio+tableau+de+bord" },
];

export const WM14_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: WM14_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: WM14_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement début / fin
// ---------------------------------------------------------------------------
export const WM14_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Que signifie SEO ?", options: ["Search Engine Optimization : référencement naturel", "Social Engagement Online", "Sales Email Operation", "Search Engine Order"], correctIndex: 0 },
  { question: "Qu'est-ce qu'un objectif SMART ?", options: ["Un objectif secret", "Un objectif spécifique, mesurable, atteignable, réaliste et daté", "Un objectif uniquement financier", "Un objectif fixé par Google"], correctIndex: 1 },
  { question: "Qu'est-ce qu'un persona ?", options: ["Un concurrent", "Un influenceur", "Le portrait type d'un client cible", "Un logiciel"], correctIndex: 2 },
  { question: "Google Ads est :", options: ["Le référencement naturel", "Un réseau social", "Un outil d'emailing", "La régie publicitaire de Google"], correctIndex: 3 },
  { question: "Pour envoyer une newsletter à des particuliers, il faut :", options: ["Leur consentement préalable", "Leur adresse postale", "Un numéro de SIRET", "Rien de particulier"], correctIndex: 0 },
  { question: "Quel outil gratuit montre les requêtes qui affichent votre site dans Google ?", options: ["Canva", "Google Search Console", "Excel", "WhatsApp"], correctIndex: 1 },
  { question: "Quel réseau social est le plus orienté professionnel ?", options: ["TikTok", "Snapchat", "LinkedIn", "Pinterest"], correctIndex: 2 },
  { question: "La fiche Google Business Profile sert à :", options: ["Payer ses impôts", "Créer une boutique en ligne", "Gérer la paie", "Apparaître sur Google Maps avec horaires et avis"], correctIndex: 3 },
  { question: "Qu'est-ce qu'un KPI ?", options: ["Un indicateur clé de performance", "Un mot de passe", "Un type de publicité", "Un format d'image"], correctIndex: 0 },
  { question: "Rendre un site accessible signifie :", options: ["Le rendre gratuit", "Le rendre utilisable par les personnes en situation de handicap", "Le traduire en anglais", "Le mettre sur mobile uniquement"], correctIndex: 1 },
];

export const WM14_QCM_FIN: AIQCMQuestion[] = [
  { question: "Quel objectif est formulé de façon SMART ?", options: ["Être plus présent sur les réseaux", "Obtenir 40 commandes en ligne par mois d'ici le 31 mars", "Avoir un beau site", "Battre les concurrents"], correctIndex: 1 },
  { question: "Quel levier donne une visibilité immédiate mais s'arrête avec le budget ?", options: ["Le référencement naturel", "Les avis clients", "Google Ads", "Le blog"], correctIndex: 2 },
  { question: "Quel indicateur a remplacé le FID dans les Core Web Vitals ?", options: ["L'INP", "Le LCP", "Le CLS", "Le CTR"], correctIndex: 0 },
  { question: "Que doit comporter tout email de prospection ?", options: ["Une pièce jointe", "Un code promo", "Une signature manuscrite", "Un moyen simple de se désinscrire"], correctIndex: 3 },
  { question: "À quoi sert le fichier robots.txt ?", options: ["À donner des consignes d'exploration aux robots des moteurs", "À accélérer le site", "À créer des liens", "À gérer les cookies"], correctIndex: 0 },
  { question: "Quelle mention est obligatoire sur un contenu d'influenceur rémunéré ?", options: ["« Avis libre »", "« Publicité » ou « Collaboration commerciale »", "« Offert »", "Aucune"], correctIndex: 1 },
  { question: "Comment se calcule le coût par acquisition ?", options: ["CA / visites", "Clics / impressions", "Coût du levier / nombre de conversions", "Abonnés / coût"], correctIndex: 2 },
  { question: "Dans GA4, une demande de devis à suivre se déclare comme :", options: ["Une dimension", "Un filtre", "Une propriété", "Un événement clé"], correctIndex: 3 },
  { question: "Quelle référence encadre l'accessibilité des sites en France ?", options: ["Le RGAA", "Le RGPD", "Le DSA", "Le Code de commerce"], correctIndex: 0 },
  { question: "Quel outil permet de vérifier qu'une page est bien indexée par Google ?", options: ["Canva", "L'outil d'inspection d'URL de la Search Console", "Meta Business Suite", "Brevo"], correctIndex: 1 },
];

export const WM14_EVAL_PACK: AIEvalPack = {
  qcmDebut: WM14_QCM_DEBUT,
  qcmFin: WM14_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (après C3) — relancer la présence en ligne d'un cabinet de services",
    contexte:
      "Un cabinet de services aux entreprises de 9 salariés constate que son site génère moins de 5 contacts par mois. La page Facebook n'est plus alimentée depuis un an, la newsletter n'a jamais été envoyée et le dirigeant dispose de 3 heures par semaine et d'un budget de 2 400 € pour l'année.",
    questions: [
      { question: "Quels objectifs SMART proposez-vous pour les 6 prochains mois ?", reponseAttendue: "Objectifs reliés au résultat souhaité et mesurables : par exemple 15 demandes de contact qualifiées par mois d'ici 6 mois, 300 abonnés à la page LinkedIn de l'entreprise, une newsletter mensuelle avec 25 % de taux d'ouverture indicatif ; chaque objectif a un indicateur, une valeur cible et une échéance.", points: 5 },
      { question: "Quels leviers retenez-vous avec ce budget et ce temps, et pourquoi ?", reponseAttendue: "Cible B2B : LinkedIn (page entreprise et profil du dirigeant) plutôt que Facebook, SEO sur les pages de services et fiche Google Business Profile, newsletter B2B sur base en intérêt légitime avec droit d'opposition ; Google Ads seulement en test plafonné ; justification par la cible, le budget et le temps disponible.", points: 5 },
      { question: "Proposez le plan d'action des trois premiers mois.", reponseAttendue: "Mois 1 : installation de GA4 avec événements clés et de la Search Console, correction des pages de services, fiche Google ; mois 2 : rythme LinkedIn (1 à 2 publications par semaine), premier article répondant à une question client ; mois 3 : première newsletter, test Google Ads plafonné ; responsable, coût et indicateur pour chaque action.", points: 5 },
      { question: "Quelles mesures d'accessibilité intégrez-vous ?", reponseAttendue: "Textes alternatifs, contrastes suffisants, titres hiérarchisés, liens explicites, formulaires étiquetés, navigation au clavier, sous-titres des vidéos, emails lisibles en texte ; références RGAA 4.1, WCAG niveau AA, European Accessibility Act applicable depuis le 28 juin 2025.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — dossier projet webmarketing sur l'entreprise du stagiaire et présentation orale au formateur (fin du jour 2)",
    exercices: [
      {
        titre: "Partie 1 du dossier projet — Objectifs et stratégie (C1, C2)",
        consigne: "Présentez le diagnostic de départ, le positionnement, la cible et les objectifs SMART de l'entreprise, puis la stratégie webmarketing retenue avec son budget.",
        reponseAttendue: "Diagnostic sourcé, positionnement différenciant, personas fondés sur des données, objectifs SMART reliés aux résultats souhaités (notoriété, acquisition, fidélisation), leviers choisis et justifiés par le marché, la cible et le budget, budget chiffré incluant le temps interne.",
        points: 20,
      },
      {
        titre: "Partie 2 du dossier projet — Plan d'action (C3)",
        consigne: "Présentez le plan d'action par levier, le planning, l'emailing, la campagne Google Ads envisagée et les mesures d'accessibilité.",
        reponseAttendue: "Actions détaillées (responsable, échéance, coût, indicateur), planning réaliste, emailing conforme au RGPD, structure Google Ads cohérente avec suivi des conversions, mesures d'accessibilité concrètes et références applicables.",
        points: 20,
      },
      {
        titre: "Partie 3 du dossier projet — Référencement naturel (C4)",
        consigne: "Présentez l'audit sémantique et technique du site, les optimisations réalisées ou prévues, la stratégie de netlinking et le suivi.",
        reponseAttendue: "Audit sémantique par intention avec pages cibles, audit technique (Core Web Vitals, indexation, balises), optimisations éditoriales, netlinking éthique, référencement local, indicateurs de suivi Search Console et GA4.",
        points: 20,
      },
      {
        titre: "Partie 4 du dossier projet — Réseaux sociaux (C5)",
        consigne: "Présentez le plan d'action réseaux sociaux : choix des réseaux, ligne éditoriale, calendrier, influence, suivi.",
        reponseAttendue: "Réseaux justifiés par la cible, ligne éditoriale et calendrier tenables, modération, collaboration d'influence conforme à la loi du 9 juin 2023, indicateurs et liens UTM.",
        points: 20,
      },
      {
        titre: "Partie 5 et présentation orale — Dispositif de pilotage (C6) et présentation du projet au formateur (20 min)",
        consigne: "Présentez le tableau de bord, le rapprochement des ressources et des résultats, puis présentez oralement votre projet au formateur et répondez à ses questions.",
        reponseAttendue: "Tableau de bord de 8 à 10 KPI reliés aux objectifs, calculs de CPA, ROI et ROAS exacts, décisions argumentées ; présentation structurée dans le temps imparti, diaporama lisible, réponses précises et argumentées aux questions du formateur.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const WM14_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.economie.gouv.fr/dgccrf",
      titreLien: "DGCCRF — pratiques commerciales en ligne",
      titre: "Avis clients en ligne, prix barrés et pratiques commerciales trompeuses",
      date: "Septembre 2026",
      commentaire: "Règles applicables aux avis en ligne (information sur le contrôle des avis, interdiction des faux avis), aux annonces de réduction de prix et aux mentions obligatoires d'un site marchand ; Digital Services Act pour les plateformes.",
      exploitation: "Preuve : fiche mémo archivée au dossier Qualiopi. Action : mise à jour des séquences avis clients (C3) et fiche Google (C4).",
    },
    {
      lien: "https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique",
      titreLien: "CNIL — prospection par courrier électronique",
      titre: "Règles de la prospection par email en B2C et en B2B",
      date: "Août 2026",
      commentaire: "Consentement préalable des particuliers (sauf produits analogues pour des clients existants), droit d'opposition et lien avec la fonction en B2B, désinscription simple, sanctions prononcées par la CNIL.",
      exploitation: "Preuve : fiche mémo remise aux stagiaires. Action : mise à jour de l'exercice 5 (campagne d'email marketing) et de son corrigé.",
    },
    {
      lien: "https://accessibilite.numerique.gouv.fr/",
      titreLien: "Accessibilité numérique — RGAA",
      titre: "European Accessibility Act : obligations applicables depuis le 28 juin 2025",
      date: "Juillet 2026",
      commentaire: "Suivi de l'application de l'EAA aux services numériques (dont le commerce en ligne), exemptions des microentreprises de services, référentiel RGAA 4.1 et critères WCAG.",
      exploitation: "Preuve : synthèse archivée. Action : actualisation de la séquence accessibilité de la C3 et de l'exercice 4.",
    },
    {
      lien: "https://www.economie.gouv.fr/influence-commerciale",
      titreLien: "Économie.gouv — influence commerciale",
      titre: "Loi du 9 juin 2023 sur l'influence commerciale : mentions et interdictions",
      date: "Juin 2026",
      commentaire: "Mentions « publicité » ou « collaboration commerciale », contrat écrit, produits et services dont la promotion est interdite, responsabilité solidaire de l'annonceur.",
      exploitation: "Preuve : extrait réglementaire archivé. Action : intégration au brief influenceur de l'exercice 9.",
    },
    {
      lien: "https://www.cnil.fr/fr/cookies-et-autres-traceurs",
      titreLien: "CNIL — cookies et traceurs",
      titre: "Recueil du consentement aux cookies et mesure d'audience",
      date: "Mai 2026",
      commentaire: "Refuser doit être aussi simple qu'accepter ; outils de mesure exemptés sous conditions ; effet du consentement sur les données de GA4 et de Google Ads (Consent Mode v2).",
      exploitation: "Preuve : note de veille diffusée. Action : mise à jour de la C6 sur les limites de l'attribution.",
    },
  ],
  metier: [
    {
      lien: "https://www.francenum.gouv.fr/",
      titreLien: "France Num",
      titre: "Usages du numérique dans les TPE / PME et guides pratiques",
      date: "Août 2026",
      commentaire: "Baromètre et guides sur la présence en ligne, la vente en ligne et les réseaux sociaux dans les petites entreprises, utilisés pour contextualiser les objectifs des stagiaires.",
      exploitation: "Preuve : guides déposés sur l'extranet. Action : actualisation des données clés du chapitre 1.",
    },
    {
      lien: "https://www.fevad.com/",
      titreLien: "Fevad",
      titre: "Bilan du e-commerce en France",
      date: "Juillet 2026",
      commentaire: "Évolution des ventes en ligne, du nombre de sites marchands et des usages mobiles, utile pour les stagiaires qui développent la vente ou la réservation en ligne.",
      exploitation: "Preuve : chiffres datés et sourcés dans le support. Action : mise à jour du cas fil rouge (click & collect).",
    },
    {
      lien: "https://www.webmarketing-com.com/",
      titreLien: "Webmarketing & co'm",
      titre: "Actualités et ressources webmarketing",
      date: "Juin 2026",
      commentaire: "Suivi des articles de fond et des études de cas sur les leviers digitaux des TPE / PME (SEO, réseaux sociaux, emailing, publicité).",
      exploitation: "Preuve : notes de veille datées. Action : actualisation des exemples des chapitres 3 à 7 et du projet final.",
    },
    {
      lien: "https://www.francetravail.fr/",
      titreLien: "France Travail",
      titre: "Compétences webmarketing recherchées dans les TPE / PME",
      date: "Mai 2026",
      commentaire: "Relevé des compétences demandées sur les postes de chargé de communication digitale et d'assistant marketing en PME, pour relier les compétences travaillées aux besoins des entreprises.",
      exploitation: "Preuve : extraction datée. Action : présentation des usages professionnels du webmarketing au démarrage.",
    },
  ],
  technologique: [
    {
      lien: "https://developers.google.com/search/updates/ranking?hl=fr",
      titreLien: "Google Search Central — mises à jour",
      titre: "Mises à jour de l'algorithme et du classement Google",
      date: "Septembre 2026",
      commentaire: "Suivi des core updates, des règles anti-spam et de la qualité des contenus (contenu utile, E-E-A-T), ainsi que de l'évolution des AI Overviews dans les résultats.",
      exploitation: "Preuve : journal de veille SEO. Action : mise à jour du chapitre 5 et de l'exercice 8.",
    },
    {
      lien: "https://web.dev/articles/vitals?hl=fr",
      titreLien: "web.dev — Core Web Vitals",
      titre: "Signaux Web essentiels : LCP, INP et CLS",
      date: "Août 2026",
      commentaire: "Seuils recommandés et outils de mesure (PageSpeed Insights, rapport Signaux Web essentiels de la Search Console) ; l'INP a remplacé le FID en mars 2024.",
      exploitation: "Preuve : check-list technique actualisée. Action : mise à jour de l'exercice 7 (audit technique).",
    },
    {
      lien: "https://support.google.com/analytics/?hl=fr",
      titreLien: "Aide Google Analytics 4",
      titre: "Évolutions de GA4 : événements clés, rapports, Consent Mode",
      date: "Juillet 2026",
      commentaire: "Suivi des changements d'interface et de vocabulaire de GA4 (événements clés, attribution) et de leurs effets sur les tableaux de bord des stagiaires.",
      exploitation: "Preuve : tutoriel mis à jour sur l'extranet. Action : actualisation de l'exercice 10 et du modèle de tableau de bord.",
    },
    {
      lien: "https://support.google.com/google-ads/?hl=fr",
      titreLien: "Aide Google Ads",
      titre: "Campagnes Performance Max, types de correspondance et automatisation des enchères",
      date: "Juin 2026",
      commentaire: "Veille sur l'automatisation croissante des campagnes Google Ads et sur les réglages qui restent pertinents pour un petit budget de test.",
      exploitation: "Preuve : note de veille. Action : mise à jour de l'exercice 6 (première campagne Google Ads).",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedWM14AICaches(f: FormationInfo = FORMATION_WM14): void {
  try {
    setCachedContentPack(f, WM14_CONTENT_PACK);
    setCachedEvalPack(f, WM14_EVAL_PACK);
    setCachedVeillePack(f, WM14_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
