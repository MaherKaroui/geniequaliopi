/**
 * Preset complet « Créer et développer une e-boutique professionnelle (RS6475) – 21 h »
 * — formation CERTIFIANTE préparant à la certification inscrite au Répertoire spécifique sous le code RS6475
 * « Créer et développer une e-boutique professionnelle » (certificateur : DIDACTIZ, SIRET 89061404300028 ;
 * décision d'enregistrement du 21/12/2023 pour 3 ans, échéance de la fiche au 21/12/2026, dernière délivrance
 * possible au 21/06/2027 : à surveiller en veille). NSF 320 / 326w ; Formacodes 31090 Développement web,
 * 34530 E-commerce, 46343 Conception site web.
 * Évaluation certificative (fiche) : épreuve 1 = QCM de 20 minutes sur les connaissances théoriques et pratiques ;
 * épreuve 2 = mise en situation professionnelle de 2 h 45 (sujet tiré au sort, création d'une boutique en ligne
 * avec une gamme de produits puis d'un site avec choix d'installation, manipulations en direct), devant un jury
 * de 2 membres extérieurs à l'organisme certificateur. Aucun barème ni seuil n'est publié : renvoi au règlement
 * du certificateur.
 * 21 heures sur 4 semaines, 100 % à distance : 6 classes virtuelles synchrones de 3 h 30 (09h00 – 12h30,
 * Google Meet / Zoom) + plateforme e-learning accessible 24 h/24. Tarif : 1 250 € net de TVA.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - 7 modules, compétences C1 à C7 ; fil rouge FICTIF : Inès, créatrice de bougies et savons artisanaux à Toulon,
 *    qui ouvre sa boutique en ligne « Lueur d'Inès » (nom fictif), et ses clients fictifs
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées et 7 QCM de 10 questions (un par compétence)
 *  - Pack évaluation : QCM de positionnement de début (10 questions, corrigé expliqué), QCM de fin (10 questions),
 *    cas pratique intermédiaire (fin du module 4, séance 4), évaluation finale interne (séance 6)
 *  - Pack veille (réglementaire / métier / technologique)
 * Le support de cours (7 chapitres) est dans `ecommerce21h/` ; les réponses propres à chaque stagiaire dans
 * `ecommerce21hHumanized.ts`. Aucune donnée de satisfaction ni aucun taux de réussite n'est pré-rempli.
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
export const FORMATION_ECO21: FormationInfo = {
  intitule: "Créer et développer une e-boutique professionnelle (RS6475) – 21 h",
  codeRNCP: "RS6475",
  objectifs:
    "Formation certifiante préparant à la certification « Créer et développer une e-boutique professionnelle », enregistrée au Répertoire spécifique sous le code RS6475 (certificateur : DIDACTIZ). Objectif général : concevoir, mettre en ligne, promouvoir et piloter une boutique en ligne professionnelle, accessible à tous et conforme à la réglementation, et se préparer aux deux épreuves de la certification.\nÀ l'issue de la formation, le stagiaire sera capable de :\n- C1 — Concevoir un site de e-commerce avec des outils attrayants, simples d'accès et faciles d'utilisation, notamment pour les publics en situation de handicap.\n- C2 — Gérer un site de e-commerce avec les technologies et plateformes appropriées pour développer tout type de clientèle, y compris les personnes en situation de handicap.\n- C3 — Développer une stratégie de marketing en ligne (moteurs de recherche, réseaux sociaux, publicité en ligne, articles suivant un planning de publication) pour promouvoir une e-boutique.\n- C4 — Rendre son site accessible à tous en s'appuyant sur une connaissance actualisée du RGAA.\n- C5 — Optimiser la disponibilité des produits par la gestion des stocks et des processus de livraison en anticipant les ruptures.\n- C6 — Indexer et analyser les données statistiques du site (fréquentation, pertinence des actions de communication…) avec un outil adapté pour ajuster et fidéliser.\n- C7 — Sécuriser les données sensibles des clients et de l'entreprise en s'appuyant sur la réglementation (RGPD) pour prévenir les fuites de données.",
  prerequis:
    "Maîtriser le français (niveau B1). Disposer d'un ordinateur et d'un mobile personnels avec un accès à Internet. Maîtriser une suite bureautique et les bases de l'informatique, disposer d'un logiciel client FTP (par exemple FileZilla) et maîtriser l'environnement web (navigateur, comptes en ligne, messagerie). Un entretien préalable vérifie le projet de boutique en ligne et les prérequis.",
  duree: "21 heures sur 4 semaines (6 classes virtuelles de 3 h 30)",
  dureeSaisiePrioritaire: true,
  modalites: "distanciel",
  tarif: "1 250 € net de TVA par stagiaire (exonération de TVA, article 261-4-4°a du CGI)",
  programme:
    "SÉANCE 1 — Semaine 1, classe virtuelle de 09h00 à 12h30 (3 h 30)\nModule 1 — Concevoir une e-boutique attrayante, simple d'accès et facile d'utilisation (C1, 3 h 30) : 09h00 – 12h30 ; accueil, présentation du fil rouge (Inès, créatrice de bougies et savons artisanaux à Toulon, et sa boutique « Lueur d'Inès », personnage et nom fictifs), des deux épreuves de la certification et QCM de positionnement ; choisir sa solution : Shopify, WooCommerce (WordPress), PrestaShop ; arborescence, page d'accueil, navigation et parcours d'achat ; charte graphique, thème et visuels (Canva) ; fiches produits attrayantes et lisibles par tous, dont les personnes en situation de handicap.\nSÉANCE 2 — Semaine 1, classe virtuelle de 09h00 à 12h30 (3 h 30)\nModule 2 — Gérer un site de e-commerce avec les technologies et plateformes appropriées (C2, 3 h 30) : 09h00 – 12h30 ; installation et paramétrage de la boutique : nom de domaine, hébergement, client FTP, thème et extensions ciblées ; catalogue, variantes et prix ; moyens de paiement, DSP2 et authentification forte (3-D Secure) ; modes et frais de livraison ; mentions légales (LCEN), conditions générales de vente, information précontractuelle, droit de rétractation de 14 jours, garantie légale de conformité, médiation de la consommation ; service client pour tout type de clientèle.\nSÉANCE 3 — Semaine 2, classe virtuelle de 09h00 à 12h30 (3 h 30)\nModule 3 — Développer une stratégie de marketing en ligne pour promouvoir l'e-boutique (C3, 3 h 30) : 09h00 – 12h30 ; référencement naturel : mots-clés, balises, contenus, Google Search Console ; réseaux sociaux et Meta Business Suite ; publicité en ligne : objectifs, ciblage, budget ; articles et planning de publication ; emailing dans le respect du consentement.\nSÉANCE 4 — Semaine 2, classe virtuelle de 09h00 à 12h30 (3 h 30)\nModule 4 — Rendre son site accessible à tous en s'appuyant sur le RGAA (C4, 2 h 30) : 09h00 – 11h30 ; RGAA 4.1 et WCAG 2.1 ; European Accessibility Act applicable depuis le 28 juin 2025 aux services de commerce électronique et exemption des microentreprises de services ; contrastes, textes alternatifs, navigation au clavier, formulaires, vidéos sous-titrées ; tests simples avec les outils du navigateur ; déclaration d'accessibilité ; cas pratique intermédiaire (C1 à C4).\nModule 5 — Optimiser la disponibilité des produits : stocks et livraison (C5, 2 h 30) : sur deux séances, 11h30 – 12h30 en séance 4 puis 09h00 – 10h30 en séance 5 ; suivi des stocks dans la plateforme, stock de sécurité et point de commande ; anticipation des ruptures et des pics saisonniers.\nSÉANCE 5 — Semaine 3, classe virtuelle de 09h00 à 12h30 (3 h 30)\nModule 5 (suite et fin, 1 h 30) : 09h00 – 10h30 ; préparation des commandes, transporteurs et points relais, suivi des colis, retours et remboursements ; information du client en cas de retard ou de rupture.\nModule 6 — Indexer et analyser les données statistiques du site pour ajuster et fidéliser (C6, 3 h) : sur deux séances, 10h30 – 12h30 en séance 5 puis 09h00 – 10h00 en séance 6 ; indexation du site et suivi dans Google Search Console ; mesure d'audience avec Google Analytics 4 ou Matomo ; indicateurs clés : sessions, sources de trafic, taux de conversion, panier moyen, abandon de panier.\nSÉANCE 6 — Semaine 4, classe virtuelle de 09h00 à 12h30 (3 h 30)\nModule 6 (suite et fin, 1 h) : 09h00 – 10h00 ; analyse de la pertinence des actions de communication, tableau de bord, actions d'ajustement et de fidélisation.\nModule 7 — Sécuriser les données sensibles des clients et de l'entreprise : RGPD (C7, 2 h 30) : 10h00 – 12h30 ; RGPD et loi Informatique et Libertés : bases légales, information des clients, registre des traitements, durées de conservation, droits des personnes ; cookies et recommandations de la CNIL ; sécurité : mots de passe, double authentification, mises à jour, sauvegardes, données de carte et norme PCI DSS ; conduite à tenir en cas de violation de données ; préparation aux deux épreuves du certificateur (QCM de 20 minutes et mise en situation professionnelle de 2 h 45) ; évaluation finale ; bilan de la formation.",
  methodesEvaluation:
    "Positionnement en ouverture : QCM de positionnement de 10 questions (une seule bonne réponse chacune, corrigé et expliqué), comparé à l'évaluation finale pour mesurer la progression, et 10 questions ouvertes de positionnement ; 10 mises en situation corrigées sur le fil rouge d'Inès et de sa boutique « Lueur d'Inès » (personnage et nom fictifs), puis sur le projet de chaque stagiaire ; un QCM corrigé de 10 questions par compétence (C1 à C7) ; cas pratique intermédiaire en fin de module 4 (séance 4) ; évaluation finale interne en séance 6 (QCM d'entraînement et présentation commentée de la boutique du stagiaire) ; test de positionnement de fin. Évaluation à chaud (questionnaire de satisfaction en fin de formation) et évaluation à froid. Certification RS6475 délivrée par le certificateur DIDACTIZ à l'issue de deux épreuves : épreuve 1, QCM sur les connaissances théoriques et pratiques (20 minutes) ; épreuve 2, mise en situation professionnelle (2 h 45) : sur un sujet tiré au sort, le candidat est interrogé sur son projet et réalise en direct des manipulations sur le logiciel ; il crée une boutique en ligne avec une gamme de produits, puis un site en faisant des choix d'installation (thèmes, extensions ciblées…). Jury de 2 membres, experts de la communication et des métiers du numérique, extérieurs à l'organisme certificateur. Les modalités de notation et de délivrance sont celles du règlement du certificateur. L'organisme remet un certificat de réalisation et une attestation de fin de formation.",
  moyensPedagogiques:
    "Formation entièrement à distance : 6 classes virtuelles synchrones de 3 h 30 (Google Meet ou Zoom) avec le formateur en direct, partage d'écran et démonstrations sur les plateformes de vente en ligne, caméra et micro des stagiaires actifs. Méthodes actives : apports courts illustrés, démonstrations puis manipulations guidées sur Shopify, WooCommerce (WordPress) ou PrestaShop, mises en situation sur le fil rouge d'Inès, créatrice de bougies et savons artisanaux à Toulon, et de sa boutique « Lueur d'Inès » (personnage et nom fictifs), transposition au projet de chaque stagiaire, sondages et QCM corrigés en direct, travail en sous-groupes dans des salles virtuelles. Plateforme e-learning de l'organisme accessible 24 h/24 pendant la formation : support de cours en 7 chapitres, vidéos, fiches à retenir, exercices et QCM d'entraînement, replays des classes virtuelles, modèles de documents. Outils présentés de façon neutre : Shopify, WooCommerce, PrestaShop, Google Search Console, Google Analytics 4, Matomo, Meta Business Suite, Canva, client FTP (FileZilla). Ressources officielles : Légifrance (LCEN, code de la consommation), CNIL, référentiel RGAA, fiche France Compétences RS6475.",
  publicVise:
    "Porteurs de projet e-commerce, entrepreneurs, indépendants, salariés ou demandeurs d'emploi souhaitant développer une activité de vente en ligne. Accessibilité : formation ouverte aux personnes en situation de handicap ; le référent handicap de l'organisme étudie avec chaque stagiaire, au cas par cas, les adaptations utiles.",
  delaiAcces:
    "Inscription sur session, au plus tard 14 jours ouvrables avant le démarrage, sous réserve de places disponibles, de l'entretien préalable et de la signature de la convention ou du contrat de formation. En financement CPF, un délai légal minimum de 11 jours ouvrés s'applique entre la validation du dossier et l'entrée en formation. Financements possibles : CPF, OPCO, France Travail, Agefice ou FIF-PL. Les liens des classes virtuelles et les accès à la plateforme e-learning sont envoyés avant la première séance.",
  dateDebut: "2026-11-30",
  dateFin: "2026-12-21",
  lieu: "Google Meet / Zoom",
  nombreParticipants: "12",
  formateur: "Say LY",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Choisir la solution de vente en ligne adaptée à son projet : Shopify, WooCommerce (WordPress) ou PrestaShop.",
  "Concevoir une boutique attrayante, simple d'accès et facile à utiliser, y compris pour les personnes en situation de handicap.",
  "Installer et paramétrer la boutique : catalogue, paiement sécurisé, livraison, thème et extensions ciblées.",
  "Connaître les obligations légales du vendeur en ligne : mentions légales, conditions générales de vente, droit de rétractation, garantie légale de conformité, médiation.",
  "Être visible : référencement naturel, réseaux sociaux, publicité en ligne et planning de publication.",
  "Rendre son site accessible à tous en appliquant le RGAA et savoir si l'European Accessibility Act s'applique à son entreprise.",
  "Gérer ses stocks et ses livraisons sans rupture ni retard.",
  "Mesurer la fréquentation et l'efficacité de ses actions avec un outil statistique, puis ajuster et fidéliser.",
  "Protéger les données des clients et de l'entreprise conformément au RGPD, y compris pour les cookies.",
  "Se préparer aux deux épreuves de la certification : QCM et mise en situation professionnelle sur le logiciel.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins est conduite avant la formation (entretien préalable avec chaque candidat, vérification des prérequis : français niveau B1, ordinateur et mobile avec accès à Internet, bases de l'informatique et de l'environnement web, logiciel client FTP) puis à l'ouverture de la première classe virtuelle : QCM de positionnement de 10 questions sur les notions clés des sept compétences (comparé à l'évaluation finale pour mesurer la progression), 10 questions ouvertes de positionnement et tour de table sur le projet de boutique, les produits à vendre et l'expérience du numérique. Les stagiaires sont des porteurs de projet, des entrepreneurs, des indépendants, des salariés ou des demandeurs d'emploi qui veulent développer une activité de vente en ligne.</p>
<ul>
  <li><strong>Conception et gestion (C1, C2)</strong> : beaucoup hésitent entre les plateformes et sous-estiment le paramétrage du paiement, de la livraison et des pages légales ; la formation alterne démonstrations et manipulations guidées.</li>
  <li><strong>Visibilité et pilotage (C3, C6)</strong> : le référencement, la publicité et la lecture des statistiques sont souvent découverts en formation ; les exercices partent des chiffres fictifs de la boutique d'Inès, puis du projet de chacun.</li>
  <li><strong>Accessibilité, logistique et données (C4, C5, C7)</strong> : le RGAA, la gestion des stocks et le RGPD sont rarement connus ; ce sont pourtant des points évalués et des obligations pour le vendeur.</li>
</ul>
<p>Inès, créatrice de bougies et savons artisanaux à Toulon, et sa boutique « Lueur d'Inès » (personnage et nom fictifs) servent de point de départ à chaque mise en situation, avant la transposition au projet réel de chaque stagiaire.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Projet de chaque stagiaire</strong> : chaque mise en situation est transposée à la boutique réelle ou en projet du stagiaire (produits, clientèle, plateforme choisie).</li>
  <li><strong>Choix de plateforme</strong> : démonstrations sur Shopify, WooCommerce et PrestaShop ; chacun manipule la solution qu'il a retenue, avec un compte d'essai si besoin.</li>
  <li><strong>Préparation aux épreuves</strong> : QCM d'entraînement corrigés sur la plateforme e-learning et entraînement à la présentation du projet et aux manipulations en direct.</li>
  <li><strong>Classe virtuelle</strong> : test de connexion proposé avant la première séance, replays disponibles, pauses régulières, sondages et sous-groupes pour faire participer chacun.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage ; supports transmis à l'avance sur demande, sous-titres activables, adaptations étudiées au cas par cas ; information sur les aménagements d'épreuves à demander au certificateur.</li>
</ul>`;

/** 10 mises en situation (C1 à C7) sur le fil rouge d'Inès (fictif), corrigés formateur. */
export const ECO21_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — C1 : choisir la plateforme et concevoir l'arborescence de « Lueur d'Inès »",
    consigne:
      "Inès, 38 ans, crée des bougies et des savons artisanaux dans son atelier de Toulon (personnage fictif). Elle vend sur les marchés et veut ouvrir sa boutique en ligne « Lueur d'Inès » (nom fictif) avec une quarantaine de produits. 1. Comparez Shopify, WooCommerce (WordPress) et PrestaShop selon la prise en main, le coût, la liberté de personnalisation et la maintenance, puis recommandez une solution. 2. Proposez l'arborescence de la boutique (menus, catégories, pages). 3. Décrivez la page d'accueil et le parcours d'achat, de l'arrivée sur le site à la confirmation de commande. 4. Donnez trois règles pour que la boutique soit attrayante, simple d'accès et facile à utiliser, notamment pour les personnes en situation de handicap.",
    reponseAttendue:
      "Comparaison : Shopify, solution hébergée par abonnement, prise en main rapide, maintenance et sécurité assurées par l'éditeur, personnalisation encadrée par les thèmes et applications ; WooCommerce, extension de WordPress, très personnalisable, nécessite un hébergement, des mises à jour et des sauvegardes gérées par le vendeur ; PrestaShop, solution open source dédiée au e-commerce, riche en fonctions, demande davantage de compétences techniques et d'hébergement. Recommandation argumentée pour Inès, qui débute seule : une solution hébergée ou un WordPress bien encadré, selon son budget et son autonomie technique.\nArborescence : Accueil ; Bougies (parfumées, végétales, coffrets) ; Savons (corps, visage, coffrets) ; Idées cadeaux ; L'atelier (histoire, fabrication) ; Contact ; pages Livraison et retours, Mentions légales, CGV, Politique de confidentialité, Accessibilité.\nPage d'accueil et parcours : promesse claire, produits phares, réassurance (paiement sécurisé, livraison, retours), accès au menu et à la recherche ; parcours : page catégorie, fiche produit, panier, identification ou commande sans compte, livraison, paiement, confirmation par courriel.\nRègles : navigation simple et cohérente sur toutes les pages, contrastes suffisants et textes lisibles, boutons explicites, images avec texte alternatif, site utilisable au clavier et sur mobile, formulaires courts avec étiquettes visibles.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 : rédiger une fiche produit attrayante et lisible par tous",
    consigne:
      "Inès vend une bougie végétale parfumée au figuier, 180 g, mèche en coton, environ 40 heures de combustion, au prix de 24 € TTC (données fictives). 1. Rédigez le titre et la description de la fiche produit. 2. Listez les informations indispensables à l'acheteur. 3. Proposez trois photos et rédigez le texte alternatif de la photo principale. 4. Indiquez deux éléments de réassurance à afficher près du bouton « Ajouter au panier ». 5. Expliquez ce qui rend la fiche utilisable par une personne aveugle qui navigue avec un lecteur d'écran.",
    reponseAttendue:
      "Titre clair et précis : « Bougie végétale parfumée Figuier – 180 g ». Description : bénéfices et ambiance, puis caractéristiques : cire végétale, mèche en coton, parfum, poids, durée de combustion indicative, fabrication artisanale à Toulon, conseils d'utilisation et de sécurité.\nInformations indispensables : prix TTC, caractéristiques essentielles, disponibilité, frais et délais de livraison, conditions de retour, avis éventuels, précautions d'emploi.\nPhotos : produit seul sur fond neutre, produit en situation, détail de la texture ou de l'emballage ; texte alternatif de la photo principale, par exemple « Bougie végétale Figuier dans un pot en verre ambré, couvercle en bois » : il décrit l'information utile, sans répéter « image de ».\nRéassurance : paiement sécurisé, délai et frais de livraison, retours possibles sous 14 jours, contact du service client.\nAccessibilité : titres structurés, textes alternatifs, bouton « Ajouter au panier » nommé explicitement, choix des variantes et quantités utilisables au clavier, prix et disponibilité lisibles sous forme de texte et pas seulement en image ou en couleur.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C2 : paramétrer le paiement, la livraison et les pages légales de la boutique",
    consigne:
      "La boutique d'Inès est installée ; il reste à la paramétrer avant l'ouverture. 1. Choisissez les moyens de paiement et expliquez ce que changent la DSP2 et l'authentification forte (3-D Secure) pour le client. 2. Proposez deux modes de livraison et leurs règles de frais. 3. Listez les pages et informations légales obligatoires avant l'ouverture. 4. Expliquez au client, en deux phrases, le droit de rétractation et la garantie légale de conformité. 5. Citez deux extensions ou applications ciblées utiles au démarrage et une précaution avant de les installer.",
    reponseAttendue:
      "Paiement : carte bancaire via un prestataire de paiement reconnu, éventuellement portefeuille électronique ; avec la DSP2, l'authentification forte impose au client de confirmer son identité (par exemple dans l'application de sa banque) lors du paiement en ligne, ce qui réduit la fraude ; le site ne stocke pas lui-même les numéros de carte, confiés au prestataire conforme à la norme PCI DSS.\nLivraison : point relais et domicile, par exemple, avec frais affichés avant la commande et délai indicatif ; règle éventuelle de livraison offerte à partir d'un montant, annoncée clairement.\nPages et informations légales : mentions légales (LCEN : identité de l'entreprise, coordonnées, hébergeur), conditions générales de vente, information précontractuelle (caractéristiques, prix TTC, frais, délais, modalités de paiement), droit de rétractation et formulaire type, garanties légales, coordonnées du médiateur de la consommation, politique de confidentialité et gestion des cookies.\nDroit de rétractation : le client dispose de 14 jours pour changer d'avis sans avoir à se justifier (article L221-18 du code de la consommation), selon les modalités indiquées dans les CGV. Garantie légale de conformité : pendant 2 ans, le vendeur répond des défauts de conformité du produit.\nExtensions : avis clients, gestion des colis, bandeau de cookies, sauvegarde ; précaution : installer uniquement des extensions nécessaires, d'éditeurs fiables, à jour, et tester sur une copie du site.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C3 : référencement naturel de la boutique sur les moteurs de recherche",
    consigne:
      "Inès veut que sa boutique apparaisse quand un internaute cherche une bougie artisanale. 1. Proposez cinq mots-clés ou expressions, dont deux expressions locales ou de longue traîne. 2. Rédigez la balise title et la meta description de la page catégorie « Bougies végétales ». 3. Donnez trois actions sur les contenus et la structure des pages. 4. Expliquez à quoi sert Google Search Console et les deux premières actions à y faire. 5. Proposez un sujet d'article de blog relié à un mot-clé.",
    reponseAttendue:
      "Mots-clés : « bougie artisanale », « bougie végétale parfumée », « savon artisanal », « bougie artisanale Toulon », « coffret cadeau bougie et savon fait main » ; choix guidé par l'intention de recherche et la concurrence.\nBalise title : « Bougies végétales artisanales parfumées – Lueur d'Inès » ; meta description : « Bougies en cire végétale coulées à la main à Toulon : parfums naturels, longue combustion. Livraison en point relais ou à domicile. » Elles sont uniques pour chaque page et de longueur raisonnable.\nActions : une page par catégorie avec un texte d'introduction utile, titres structurés, adresses de pages lisibles, textes alternatifs des images, liens internes entre catégories et fiches, pages rapides sur mobile.\nGoogle Search Console : outil gratuit qui montre comment Google explore et indexe le site et sur quelles requêtes il apparaît ; d'abord valider la propriété du site, puis soumettre le plan du site (sitemap) et vérifier l'indexation des pages.\nArticle : « Comment faire durer sa bougie végétale plus longtemps ? », relié au mot-clé « bougie végétale », avec un lien vers la catégorie.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C3 : réseaux sociaux, publicité en ligne et planning de publication",
    consigne:
      "Pour le lancement de la boutique, Inès dispose de quatre semaines et d'un budget publicitaire de 150 € (donnée fictive). 1. Choisissez deux réseaux sociaux et justifiez ce choix. 2. Construisez un planning de publication sur quatre semaines (rythme, thèmes, formats). 3. Paramétrez une campagne publicitaire : objectif, cible, budget, durée, indicateur suivi. 4. Expliquez comment Meta Business Suite et Canva l'aident. 5. Citez deux règles à respecter pour une campagne d'emailing.",
    reponseAttendue:
      "Réseaux : Instagram et Facebook, par exemple, adaptés à des produits visuels, à une clientèle de particuliers et à la vente de cadeaux ; choix justifié par la cible et le temps disponible, plutôt qu'une présence partout.\nPlanning : deux à trois publications par semaine, thèmes alternés (coulisses de l'atelier, présentation d'un produit, conseils d'utilisation, avis clients, annonce du lancement), formats variés (photo, carrousel, vidéo courte) ; dates et heures notées dans un calendrier éditorial, articles de blog intégrés au planning.\nCampagne : objectif (trafic vers la boutique ou ventes), cible géographique et centres d'intérêt cohérents, budget réparti sur la période, visuel et message clairs, lien vers la page concernée ; indicateur suivi : clics, coût par clic, ventes attribuées.\nOutils : Meta Business Suite permet de programmer les publications, de répondre aux messages et de suivre les statistiques ; Canva permet de créer des visuels cohérents avec la charte de la boutique.\nEmailing : envoi aux seules personnes qui y ont consenti (ou clients pour des produits analogues, avec possibilité de s'opposer), lien de désinscription simple dans chaque message, identité de l'expéditeur claire.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C4 : vérifier l'accessibilité d'une page produit avec le RGAA",
    consigne:
      "Le formateur présente la fiche produit d'un savon de la boutique d'Inès : texte gris clair sur fond blanc, photo sans texte alternatif, bouton représenté par une simple icône de panier, menu qui ne s'ouvre qu'au survol de la souris, vidéo de fabrication sans sous-titres, champ « Quantité » sans étiquette. 1. Relevez les défauts d'accessibilité et proposez une correction pour chacun. 2. Expliquez ce que sont le RGAA et les WCAG. 3. L'European Accessibility Act s'applique-t-il à la boutique d'Inès, qui travaille seule, et à quelle date est-il entré en application pour le commerce électronique ? 4. Décrivez trois tests simples réalisables sans outil payant.",
    reponseAttendue:
      "Défauts et corrections : contraste insuffisant, à renforcer ; photo sans texte alternatif, à décrire ; bouton icône sans nom, à nommer « Ajouter au panier » ; menu au survol, à rendre utilisable au clavier et au toucher ; vidéo sans sous-titres, à sous-titrer ; champ sans étiquette, à associer à une étiquette visible.\nRGAA : référentiel général d'amélioration de l'accessibilité, version 4.1, fondé sur les WCAG 2.1 au niveau double A ; il traduit en critères vérifiables les règles d'accessibilité des contenus web (images, couleurs, liens, formulaires, navigation, multimédia…).\nEuropean Accessibility Act : directive européenne 2019/882, applicable depuis le 28 juin 2025 aux services de commerce électronique ; les microentreprises de services (moins de 10 salariés et chiffre d'affaires ou bilan annuel n'excédant pas 2 M€) en sont exemptées : Inès, seule, est donc exemptée, mais rendre sa boutique accessible reste une bonne pratique, attendue par la certification, qui élargit sa clientèle.\nTests simples : naviguer sur toute la page avec la touche Tabulation et vérifier que le focus reste visible ; vérifier les contrastes avec un outil gratuit ; agrandir le texte à 200 pour cent sans perte de contenu ; écouter la page avec le lecteur d'écran intégré au système.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C5 : anticiper les ruptures de stock avant les fêtes",
    consigne:
      "Données fictives : la bougie Figuier se vend en moyenne à 6 exemplaires par jour en décembre ; Inès a besoin de 10 jours pour refaire un lot (commande de cire et de parfums, coulage, séchage) ; elle veut garder un stock de sécurité de 20 bougies ; il en reste 95. 1. Calculez le point de commande (stock d'alerte). 2. Dans combien de jours doit-elle lancer un nouveau lot si les ventes se maintiennent ? 3. Quels réglages de la plateforme l'aident à éviter de vendre un produit indisponible ? 4. Que doit-elle faire et dire au client si une commande ne peut pas être livrée dans le délai annoncé ? 5. Proposez deux actions pour fiabiliser la préparation et l'expédition des colis.",
    reponseAttendue:
      "Point de commande : consommation pendant le délai de réapprovisionnement plus stock de sécurité, soit 6 × 10 + 20 = 80 bougies.\nDélai : il reste 95 bougies, soit 15 au-dessus du point de commande ; à 6 ventes par jour, le seuil est atteint en 2 à 3 jours (77 bougies au troisième jour) : elle lance le nouveau lot au plus tard le troisième jour.\nRéglages : suivi des stocks activé par produit et par variante, alerte de stock bas par courriel, mise en indisponibilité automatique ou précommande clairement annoncée, affichage de la disponibilité sur la fiche produit.\nRetard ou rupture : prévenir le client au plus vite, indiquer un nouveau délai ou proposer un autre produit, ou l'annulation et le remboursement ; respecter les règles du code de la consommation sur la livraison et le délai annoncé ; garder une trace des échanges.\nPréparation et expédition : liste de préparation et vérification de chaque commande, emballage protecteur adapté au verre, suivi de colis transmis au client, choix de transporteurs ou de points relais fiables, procédure de retour simple.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C6 : analyser les statistiques du premier mois de la boutique",
    consigne:
      "Données fictives du premier mois, relevées dans Google Analytics 4 : 2 000 sessions, 40 commandes, 1 400 € de chiffre d'affaires ; sources de trafic : réseaux sociaux 900 sessions et 10 commandes, recherche naturelle 600 sessions et 18 commandes, publicité 300 sessions et 6 commandes, accès direct 200 sessions et 6 commandes ; 120 paniers créés. 1. Calculez le taux de conversion global et le panier moyen. 2. Calculez le taux de conversion de chaque source et commentez. 3. Calculez la part des paniers abandonnés et proposez deux actions. 4. Expliquez ce qu'apporte Google Search Console en complément et citez une alternative à Google Analytics. 5. Proposez trois ajustements pour le mois suivant.",
    reponseAttendue:
      "Taux de conversion global : 40 / 2 000 = 0,02, soit 2 pour cent ; panier moyen : 1 400 / 40 = 35 €.\nPar source : réseaux sociaux 10 / 900, environ 1,1 pour cent ; recherche naturelle 18 / 600 = 3 pour cent ; publicité 6 / 300 = 2 pour cent ; accès direct 6 / 200 = 3 pour cent. Les réseaux sociaux apportent beaucoup de visites mais convertissent peu ; la recherche naturelle et l'accès direct sont les plus efficaces ; la publicité est à juger au regard de son coût.\nPaniers abandonnés : 120 paniers pour 40 commandes, soit 80 paniers abandonnés, deux sur trois ; actions : afficher les frais de livraison dès la fiche produit, simplifier la commande (commande sans compte), relance des paniers abandonnés auprès des clients qui ont accepté d'être recontactés.\nSearch Console : requêtes, impressions, clics et indexation dans Google, utiles pour le référencement ; alternative de mesure d'audience : Matomo.\nAjustements : renforcer les contenus et le référencement des catégories qui convertissent, revoir le message et la cible des publications sociales, tester un visuel ou une page d'arrivée différente pour la publicité, suivre un tableau de bord mensuel.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C6 : fidéliser la clientèle à partir des données",
    consigne:
      "Après trois mois, Inès compte 150 clients dont 30 ont commandé au moins deux fois (données fictives). 1. Proposez trois segments de clients à partir des données de la boutique. 2. Construisez une action de fidélisation pour chaque segment. 3. Définissez trois indicateurs pour mesurer l'effet de ces actions. 4. Expliquez comment recueillir et utiliser les avis clients. 5. Indiquez les précautions à prendre pour utiliser les données des clients dans ces actions.",
    reponseAttendue:
      "Segments : clients d'une seule commande, clients réguliers, clients inactifs depuis plusieurs mois ; ou segmentation par produit acheté (bougies, savons, coffrets).\nActions : courriel de remerciement et conseil d'utilisation après la première commande ; avantage ou avant-première pour les clients réguliers ; message de relance avec une nouveauté saisonnière pour les inactifs ; programme de parrainage simple.\nIndicateurs : taux de clients qui commandent à nouveau, panier moyen par segment, taux d'ouverture et de clic des courriels, chiffre d'affaires issu des actions de fidélisation.\nAvis clients : demande d'avis après la livraison, affichage honnête des avis, réponse courtoise aux avis négatifs, utilisation des remarques pour améliorer les produits et le service.\nPrécautions : envoyer des messages commerciaux dans le respect du consentement ou du droit d'opposition, lien de désinscription, données limitées au nécessaire et conservées pendant une durée définie, information des clients dans la politique de confidentialité.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C7 : sécuriser les données de la boutique et se conformer au RGPD",
    consigne:
      "La boutique d'Inès collecte les nom, adresse, courriel et téléphone des clients, l'historique des commandes et des cookies de mesure d'audience et de publicité. Elle partage un seul mot de passe administrateur avec un ami qui l'aide, et n'a jamais fait de sauvegarde. 1. Listez les traitements de données et leur finalité. 2. Corrigez sa gestion des accès et de la sécurité. 3. Décrivez un bandeau de cookies conforme aux recommandations de la CNIL. 4. Indiquez ce que doit contenir la politique de confidentialité. 5. Un courriel suspect demande à Inès de « confirmer ses identifiants » de la plateforme : que fait-elle, et que faire en cas de fuite de données ?",
    reponseAttendue:
      "Traitements : gestion des commandes et de la livraison, service client, comptabilité et facturation, prospection commerciale par courriel, mesure d'audience et publicité ; chacun a une finalité, une base légale, des destinataires et une durée de conservation, notés dans un registre des traitements.\nAccès et sécurité : un compte nominatif par personne avec des droits limités, mots de passe longs et uniques, double authentification, mises à jour régulières du site, du thème et des extensions, sauvegardes régulières testées, données de carte jamais stockées par la boutique mais confiées au prestataire de paiement conforme à la norme PCI DSS.\nCookies : consentement préalable pour les cookies non nécessaires (publicité, et mesure d'audience non exemptée), bandeau clair avec des boutons « Tout accepter » et « Tout refuser » présentés de façon équivalente, refuser aussi facile qu'accepter, choix modifiable à tout moment, aucun dépôt avant le choix.\nPolitique de confidentialité : identité du responsable de traitement, finalités et bases légales, données collectées, destinataires, durées de conservation, droits des personnes (accès, rectification, effacement, opposition…) et façon de les exercer, droit de réclamation auprès de la CNIL.\nHameçonnage : ne pas cliquer, vérifier directement sur la plateforme, signaler le message, changer le mot de passe en cas de doute ; en cas de violation de données : contenir l'incident, documenter, notifier la CNIL dans les 72 heures lorsque la violation présente un risque pour les personnes, et informer les clients concernés si le risque est élevé.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par compétence (10 questions chacun)
// Format lu par le générateur d'exercices : « 1) … A) …   B) … » + « 1-B  2-C … ».
// Aucune parenthèse fermante après A, B, C ou D dans les énoncés et les options (le parseur s'en servirait).
// ---------------------------------------------------------------------------
type Q = [question: string, options: string[], correct: number];
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

const VF = ["Vrai", "Faux"];

const QCM_C1: Q[] = [
  ["Quelle solution de vente en ligne est une extension du logiciel WordPress ?", ["Shopify", "WooCommerce", "PrestaShop", "Canva"], 1],
  ["Qu'appelle-t-on l'arborescence d'une boutique en ligne ?", ["La liste des fournisseurs", "Le nom de domaine", "L'organisation des pages et des catégories du site", "Le logo de la boutique"], 2],
  ["Quel élément rend une fiche produit plus facile à comprendre pour tous ?", ["Un titre précis, des caractéristiques claires et un prix TTC visible", "Un texte entièrement en majuscules", "Une description cachée dans une image", "Le plus grand nombre possible d'animations"], 0],
  ["À quoi sert le texte alternatif d'une image ?", ["À accélérer le paiement", "À protéger l'image contre la copie", "À changer la couleur de l'image", "À décrire l'information de l'image aux personnes qui ne la voient pas"], 3],
  ["Pourquoi limiter le nombre d'étapes du parcours d'achat ?", ["Pour réduire les abandons de panier", "Pour augmenter les frais de livraison", "Pour éviter d'afficher les prix", "Pour ne pas collecter l'adresse de livraison"], 0],
  ["Quel outil permet de créer simplement des visuels cohérents avec la charte de la boutique ?", ["FileZilla", "Matomo", "Canva", "Google Search Console"], 2],
  ["Une boutique « responsive » est une boutique :", ["Qui répond automatiquement aux avis", "Dont l'affichage s'adapte aux écrans, notamment au mobile", "Qui n'accepte que les paiements par carte", "Qui ne vend qu'en France"], 1],
  ["Quel choix de couleurs facilite la lecture pour tous ?", ["Un texte gris clair sur fond blanc", "Un texte rouge sur fond vert", "Une information transmise uniquement par la couleur", "Un contraste suffisant entre le texte et le fond"], 3],
  ["Que doit indiquer clairement un bouton d'action sur une fiche produit ?", ["L'action réalisée, par exemple « Ajouter au panier »", "Le nom du développeur du site", "Le code du thème", "Rien, une icône suffit toujours"], 0],
  ["Vrai ou faux : une boutique attrayante peut se passer d'une navigation simple si ses photos sont belles.", VF, 1],
];

const QCM_C2: Q[] = [
  ["Quelle loi impose les mentions légales d'un site professionnel ?", ["La loi pour la confiance dans l'économie numérique de 2004, ou LCEN", "La loi sur l'eau", "Le code de la route", "La loi sur la formation professionnelle"], 0],
  ["De combien de jours dispose un consommateur pour se rétracter après un achat en ligne, dans le cas général ?", ["7 jours", "10 jours", "14 jours", "30 jours"], 2],
  ["Quelle est la durée de la garantie légale de conformité pour un bien neuf vendu à un consommateur ?", ["6 mois", "2 ans", "1 an", "5 ans"], 1],
  ["Que doit obligatoirement proposer un vendeur professionnel à ses clients consommateurs en cas de litige ?", ["Un bon de réduction", "Un rendez-vous au magasin", "Un remboursement immédiat sans condition", "Le recours gratuit à un médiateur de la consommation"], 3],
  ["Avec la DSP2, l'authentification forte du client lors d'un paiement en ligne sert à :", ["Réduire la fraude en confirmant l'identité du payeur", "Supprimer les frais de livraison", "Afficher les prix hors taxes", "Remplacer les conditions générales de vente"], 0],
  ["Quel outil sert à transférer des fichiers vers l'hébergement d'un site ?", ["Un tableur", "Un logiciel client FTP comme FileZilla", "Un réseau social", "Un outil de mesure d'audience"], 1],
  ["Avant d'installer une extension sur la boutique, il est recommandé de :", ["L'installer directement sur le site en ligne sans vérifier", "En installer plusieurs qui font la même chose", "Vérifier qu'elle est utile, fiable, à jour, et la tester sur une copie du site", "Désactiver les sauvegardes"], 2],
  ["Quelle information doit être donnée au client avant la validation de sa commande ?", ["Le chiffre d'affaires de la boutique", "Le nom de l'hébergeur du prestataire de paiement", "La liste des fournisseurs", "Le prix total TTC, frais de livraison compris"], 3],
  ["Pourquoi proposer plusieurs modes de livraison, par exemple point relais et domicile ?", ["Pour répondre aux attentes de clientèles différentes", "Pour cacher les frais", "Pour allonger les délais", "Parce que c'est interdit de n'en proposer qu'un"], 0],
  ["Vrai ou faux : une boutique en ligne qui vend à des particuliers doit afficher ses conditions générales de vente.", VF, 0],
];

const QCM_C3: Q[] = [
  ["Que désigne le référencement naturel ?", ["La publicité payante sur les moteurs de recherche", "L'amélioration de la visibilité d'un site dans les résultats non payants des moteurs de recherche", "L'envoi de courriels promotionnels", "L'achat de fichiers clients"], 1],
  ["Qu'est-ce qu'une expression de longue traîne ?", ["Une requête précise de plusieurs mots, moins recherchée mais souvent mieux ciblée", "Un mot très court et très concurrentiel", "Une publicité vidéo", "Un lien cassé"], 0],
  ["Quelle balise donne le titre d'une page affiché dans les résultats des moteurs de recherche ?", ["La balise image", "La balise de tableau", "La balise title", "La balise de pied de page"], 2],
  ["À quoi sert Google Search Console ?", ["À créer des visuels", "À gérer les stocks", "À encaisser les paiements", "À suivre l'indexation du site et les requêtes qui y mènent dans Google"], 3],
  ["Quel outil permet de programmer des publications sur Facebook et Instagram ?", ["Meta Business Suite", "FileZilla", "PrestaShop", "Matomo"], 0],
  ["Un planning de publication sert à :", ["Fixer les prix", "Organiser à l'avance les thèmes, les formats et les dates des contenus", "Déclarer la TVA", "Gérer les retours"], 1],
  ["Pour une campagne de publicité en ligne, il faut d'abord définir :", ["La couleur du logo", "Le nom de l'hébergeur", "L'objectif, la cible et le budget", "Le transporteur"], 2],
  ["Quel indicateur mesure le coût moyen d'un clic sur une publicité ?", ["Le panier moyen", "Le stock de sécurité", "Le délai de livraison", "Le coût par clic"], 3],
  ["En prospection par courriel auprès de particuliers, il faut en principe :", ["Le consentement préalable de la personne et un lien de désinscription dans chaque message", "Acheter un fichier d'adresses", "Écrire sans identifier l'expéditeur", "Envoyer le même message chaque jour"], 0],
  ["Vrai ou faux : publier régulièrement des articles utiles reliés à ses mots-clés peut améliorer le référencement naturel.", VF, 0],
];

const QCM_C4: Q[] = [
  ["Que signifie RGAA ?", ["Règlement général des achats en ligne", "Référentiel général d'amélioration de l'accessibilité", "Registre général des abonnés", "Répertoire des garanties d'achat"], 1],
  ["Sur quelles règles internationales le RGAA 4.1 est-il fondé ?", ["Les WCAG 2.1", "La norme PCI DSS", "La DSP2", "Le RGPD"], 0],
  ["Depuis quelle date l'European Accessibility Act s'applique-t-il aux services de commerce électronique ?", ["1er janvier 2024", "25 mai 2018", "28 juin 2025", "21 juin 2004"], 2],
  ["Quelles entreprises de services sont exemptées des exigences de l'European Accessibility Act ?", ["Toutes les entreprises françaises", "Les entreprises qui vendent des bougies", "Les entreprises de plus de 250 salariés", "Les microentreprises : moins de 10 salariés et chiffre d'affaires ou bilan n'excédant pas 2 M€"], 3],
  ["Quel test simple vérifie qu'une page est utilisable sans souris ?", ["Naviguer avec la touche Tabulation et vérifier que le focus reste visible", "Changer de navigateur", "Vider le panier", "Imprimer la page"], 0],
  ["Une vidéo de présentation d'un produit est accessible lorsqu'elle :", ["Démarre automatiquement avec le son", "Comporte des sous-titres et, si besoin, une transcription", "Est très longue", "N'a pas de bouton pause"], 1],
  ["Un champ de formulaire est accessible lorsqu'il :", ["N'a qu'un texte d'exemple qui disparaît à la saisie", "Est signalé uniquement par une couleur", "Est associé à une étiquette visible qui indique ce qu'il faut saisir", "Est caché dans une image"], 2],
  ["Pourquoi une information ne doit-elle pas être transmise uniquement par la couleur ?", ["Parce que les couleurs coûtent cher", "Parce que les moteurs de recherche l'interdisent", "Parce que la couleur ralentit le site", "Parce que certaines personnes ne distinguent pas les couleurs"], 3],
  ["Quel document public présente le niveau d'accessibilité d'un site et les moyens de signaler une difficulté ?", ["La déclaration d'accessibilité", "Les conditions générales de vente", "Le registre des traitements", "Le bon de livraison"], 0],
  ["Vrai ou faux : rendre son site accessible permet aussi d'élargir sa clientèle.", VF, 0],
];

const QCM_C5: Q[] = [
  ["Qu'est-ce qu'une rupture de stock ?", ["Un colis abîmé", "L'absence de produit disponible pour répondre à la demande", "Un retour client", "Une promotion"], 1],
  ["Comment calcule-t-on simplement le point de commande, ou stock d'alerte ?", ["Prix de vente multiplié par la quantité", "Stock actuel moins les retours", "Consommation pendant le délai de réapprovisionnement plus stock de sécurité", "Chiffre d'affaires divisé par le nombre de commandes"], 2],
  ["À quoi sert le stock de sécurité ?", ["À absorber une hausse imprévue des ventes ou un retard d'approvisionnement", "À réduire le prix de vente", "À remplacer l'inventaire", "À calculer la TVA"], 0],
  ["Avec 6 ventes par jour, 10 jours de délai de réapprovisionnement et un stock de sécurité de 20 unités, le point de commande est de :", ["26 unités", "60 unités", "36 unités", "80 unités"], 3],
  ["Quel réglage de la plateforme évite de vendre un produit qui n'est plus en stock ?", ["L'ajout d'un filtre photo", "Le suivi des stocks avec mise en indisponibilité automatique", "Le changement de thème", "La désactivation des courriels"], 1],
  ["Quelle période demande une anticipation particulière des stocks pour des bougies et savons artisanaux ?", ["Les fêtes de fin d'année", "Le changement d'heure", "Les jours fériés uniquement", "Aucune période"], 0],
  ["Si une commande ne peut pas être livrée dans le délai annoncé, le vendeur doit d'abord :", ["Ne rien dire et attendre", "Supprimer la commande sans prévenir", "Prévenir le client et lui proposer une solution : nouveau délai, autre produit ou remboursement", "Augmenter le prix"], 2],
  ["Qu'est-ce qu'un point relais ?", ["Un entrepôt du fabricant", "Un réseau social", "Un mode de paiement", "Un commerce partenaire où le client retire son colis"], 3],
  ["Quel document aide à préparer une commande sans erreur ?", ["Une liste de préparation vérifiée article par article", "La politique de confidentialité", "La déclaration d'accessibilité", "Le planning de publication"], 0],
  ["Vrai ou faux : transmettre au client le numéro de suivi de son colis améliore sa confiance.", VF, 0],
];

const QCM_C6: Q[] = [
  ["Comment calcule-t-on le taux de conversion d'une boutique en ligne ?", ["Nombre de produits divisé par le nombre de catégories", "Nombre de commandes divisé par le nombre de sessions", "Chiffre d'affaires divisé par le stock", "Nombre d'avis divisé par le nombre de photos"], 1],
  ["Comment calcule-t-on le panier moyen ?", ["Chiffre d'affaires divisé par le nombre de commandes", "Nombre de visites divisé par le nombre de pages", "Stock divisé par les ventes", "Nombre de clics divisé par le budget"], 0],
  ["Quel outil de mesure d'audience peut remplacer Google Analytics 4 ?", ["FileZilla", "Canva", "Matomo", "WooCommerce"], 2],
  ["Que montre la répartition du trafic par source ?", ["Le nombre de produits en stock", "Le délai de livraison", "La couleur dominante du site", "D'où viennent les visiteurs : recherche, réseaux sociaux, publicité, accès direct"], 3],
  ["Que signifie l'indexation d'une page par un moteur de recherche ?", ["Son enregistrement dans l'index du moteur, qui lui permet d'apparaître dans les résultats", "Sa suppression du site", "Son impression", "Son paiement"], 0],
  ["Un panier abandonné correspond à :", ["Un colis perdu", "Un panier créé par un visiteur sans commande finalisée", "Un produit en rupture", "Un retour remboursé"], 1],
  ["Quel indicateur suit la fidélité de la clientèle ?", ["Le nombre de photos par fiche", "Le poids moyen des colis", "La part des clients qui commandent à nouveau", "Le nombre de catégories"], 2],
  ["Pourquoi comparer le taux de conversion de chaque source de trafic ?", ["Pour changer de logo", "Pour calculer les frais de port", "Pour fixer la TVA", "Pour juger quelles actions de communication sont les plus pertinentes"], 3],
  ["À quelle fréquence est-il utile de suivre un tableau de bord de la boutique ?", ["Régulièrement, par exemple chaque mois, pour ajuster les actions", "Une seule fois à l'ouverture", "Jamais, les ventes suffisent", "Uniquement en cas de contrôle"], 0],
  ["Vrai ou faux : beaucoup de visites venant des réseaux sociaux garantissent beaucoup de ventes.", VF, 1],
];

const QCM_C7: Q[] = [
  ["Quel texte européen encadre la protection des données personnelles ?", ["La DSP2", "Le règlement général sur la protection des données, ou RGPD", "La LCEN", "La directive sur l'accessibilité"], 1],
  ["Quelle autorité française contrôle l'application du RGPD ?", ["La CNIL", "La DGCCRF", "La Banque de France", "France Compétences"], 0],
  ["Selon la CNIL, pour les cookies publicitaires, il faut :", ["Les déposer dès l'arrivée du visiteur", "Cacher le bouton de refus", "Recueillir le consentement préalable, refuser devant être aussi simple qu'accepter", "Les rendre obligatoires pour commander"], 2],
  ["Quelle norme encadre la sécurité des données de carte bancaire ?", ["Le RGAA", "Les WCAG", "La LCEN", "La norme PCI DSS"], 3],
  ["Quelle mesure renforce la protection du compte administrateur de la boutique ?", ["La double authentification avec un mot de passe long et unique", "Un mot de passe partagé entre plusieurs personnes", "Un mot de passe noté sur le site", "Le même mot de passe partout"], 0],
  ["Que doit contenir le registre des traitements ?", ["La liste des produits", "Les traitements de données avec leur finalité, les données, les destinataires et la durée de conservation", "Les factures fournisseurs", "Le planning de publication"], 1],
  ["Un courriel vous demande de « confirmer vos identifiants » via un lien inconnu. Il s'agit probablement :", ["D'une mise à jour obligatoire", "D'une offre commerciale", "D'une tentative d'hameçonnage", "D'un message du transporteur"], 2],
  ["En cas de violation de données présentant un risque pour les personnes, le responsable de traitement notifie la CNIL :", ["Dans un délai d'un an", "Jamais", "Seulement si un client se plaint", "Dans les 72 heures après en avoir pris connaissance"], 3],
  ["Pourquoi faire des sauvegardes régulières du site ?", ["Pour pouvoir restaurer la boutique après une panne, une erreur ou une attaque", "Pour améliorer le référencement", "Pour réduire les frais de livraison", "Pour remplacer les mises à jour"], 0],
  ["Vrai ou faux : la boutique peut conserver les données de ses clients sans limite de durée.", VF, 1],
];

export const ECO21_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Concevoir une e-boutique attrayante, simple et accessible", QCM_C1),
  qcmExercice("QCM C2 — Gérer un site de e-commerce : plateformes, paiement, livraison et obligations", QCM_C2),
  qcmExercice("QCM C3 — Stratégie de marketing en ligne", QCM_C3),
  qcmExercice("QCM C4 — Accessibilité et RGAA", QCM_C4),
  qcmExercice("QCM C5 — Gestion des stocks et des livraisons", QCM_C5),
  qcmExercice("QCM C6 — Statistiques, analyse et fidélisation", QCM_C6),
  qcmExercice("QCM C7 — Sécurité des données et RGPD", QCM_C7),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (C1 à C7), alignées sur les 10 questions de
 * positionnement et sur les copies de `ecommerce21hHumanized.ts` ; les 7 QCM ensuite.
 */
export const ECO21_EXERCICES_COMPLETS: AIContentExercise[] = [...ECO21_EXERCICES, ...ECO21_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Créer et développer une e-boutique professionnelle (RS6475) – 21 h » (7 chapitres, un par compétence C1 à C7)</strong> : cours détaillé, tableaux, captures commentées, exemples tirés du fil rouge d'Inès et de sa boutique « Lueur d'Inès » (personnage et nom fictifs), encadrés « À retenir », quiz et cas pratiques corrigés.</li>
  <li><strong>Plateforme e-learning</strong> accessible 24 h/24 : support de cours, vidéos, fiches à retenir, exercices et QCM d'entraînement, replays des classes virtuelles.</li>
  <li><strong>Modèles de documents</strong> : arborescence type, trame de fiche produit, check-list d'ouverture de la boutique (pages légales, paiement, livraison), calendrier éditorial, grille d'audit d'accessibilité inspirée du RGAA, tableau de suivi des stocks et du point de commande, tableau de bord mensuel, modèle de registre des traitements et de politique de confidentialité.</li>
  <li><strong>Fiches de travail des mises en situation</strong> : comparatif des plateformes, paramétrage du paiement et de la livraison, mots-clés et balises, plan de communication, calculs de stock, lecture des statistiques, plan de fidélisation, plan de sécurité.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Classe virtuelle</strong> : Google Meet ou Zoom, avec partage d'écran, salles de sous-groupes, sondages et conversation écrite ; test de connexion proposé avant la première séance.</li>
  <li><strong>Plateformes de vente en ligne</strong> présentées de façon neutre : Shopify, WooCommerce (WordPress), PrestaShop, avec comptes d'essai ou environnements de démonstration.</li>
  <li><strong>Outils du marketing et de l'analyse</strong> : Google Search Console, Google Analytics 4 ou Matomo, Meta Business Suite, Canva.</li>
  <li><strong>Matériel du stagiaire</strong> : ordinateur et mobile personnels avec accès à Internet, suite bureautique, logiciel client FTP (par exemple FileZilla).</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>France Compétences — fiche RS6475</strong> : <a href="https://www.francecompetences.fr/recherche/rs/6475/">https://www.francecompetences.fr/recherche/rs/6475/</a> — compétences attestées, modalités d'évaluation, certificateur, date d'échéance de l'enregistrement.</li>
  <li><strong>Légifrance</strong> : <a href="https://www.legifrance.gouv.fr/">https://www.legifrance.gouv.fr/</a> — loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), code de la consommation (information précontractuelle, droit de rétractation, garantie légale de conformité, médiation).</li>
  <li><strong>CNIL</strong> : <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees">https://www.cnil.fr/fr/reglement-europeen-protection-donnees</a> — RGPD, recommandations sur les cookies et autres traceurs, sécurité des données.</li>
  <li><strong>Accessibilité numérique — RGAA</strong> : <a href="https://accessibilite.numerique.gouv.fr/">https://accessibilite.numerique.gouv.fr/</a> — référentiel, critères et méthode de test.</li>
  <li><strong>Entreprendre.service-public.fr</strong> : <a href="https://entreprendre.service-public.fr/">https://entreprendre.service-public.fr/</a> — obligations du vendeur en ligne, mentions obligatoires, création d'entreprise.</li>
  <li><strong>PCI Security Standards Council</strong> : <a href="https://www.pcisecuritystandards.org/">https://www.pcisecuritystandards.org/</a> — norme PCI DSS de sécurité des données de carte.</li>
</ul>`;

/**
 * Vidéos : uniquement des recherches YouTube déjà utilisées ailleurs dans le dépôt (preset webmarketing),
 * sur le référencement, l'accessibilité, la publicité, les réseaux sociaux et la mesure d'audience.
 * Aucune vidéo précise imposée, aucun identifiant inventé.
 */
export const ECO21_VIDEOS = [
  { title: "Les leviers d'acquisition digitale", description: "SEO, SEA, réseaux sociaux, emailing : avantages et limites pour promouvoir une boutique en ligne.", url: "https://www.youtube.com/results?search_query=leviers+acquisition+digitale+TPE" },
  { title: "Audit sémantique et recherche de mots-clés", description: "Intention de recherche et page cible : choisir les mots-clés des catégories et des fiches produits.", url: "https://www.youtube.com/results?search_query=audit+s%C3%A9mantique+mots+cl%C3%A9s+SEO" },
  { title: "Google Search Console : prise en main", description: "Indexation, performances et sitemap de la boutique.", url: "https://www.youtube.com/results?search_query=google+search+console+tutoriel" },
  { title: "Stratégie social media pour TPE", description: "Choisir ses réseaux et sa ligne éditoriale.", url: "https://www.youtube.com/results?search_query=strat%C3%A9gie+r%C3%A9seaux+sociaux+TPE" },
  { title: "Google Ads pour débutants", description: "Structure de compte, mots-clés et suivi des conversions.", url: "https://www.youtube.com/results?search_query=google+ads+d%C3%A9butant+tutoriel" },
  { title: "Accessibilité numérique : les bases", description: "RGAA, WCAG et bonnes pratiques de contenu.", url: "https://www.youtube.com/results?search_query=accessibilit%C3%A9+num%C3%A9rique+RGAA+bases" },
  { title: "Google Analytics 4 et tableau de bord Looker Studio", description: "Suivre les conversions et piloter la boutique.", url: "https://www.youtube.com/results?search_query=GA4+looker+studio+tableau+de+bord" },
];

export const ECO21_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: ECO21_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: ECO21_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement de début (10 questions, corrigé expliqué) et QCM de fin (10 questions)
// ---------------------------------------------------------------------------
export const ECO21_POSITIONNEMENT_TITRE = "Positionnement — vos repères de départ avant de créer votre e-boutique";
export const ECO21_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Laquelle de ces solutions permet de créer une boutique en ligne ?", options: ["FileZilla", "Shopify", "Matomo", "Google Search Console"], correctIndex: 1 },
  { question: "À quoi sert le texte alternatif d'une image sur un site ?", options: ["À compresser l'image", "À la protéger contre la copie", "À décrire l'image aux personnes qui ne la voient pas", "À changer son format"], correctIndex: 2 },
  { question: "Combien de jours un consommateur a-t-il, en général, pour se rétracter après un achat en ligne ?", options: ["14 jours", "3 jours", "30 jours", "Aucun délai"], correctIndex: 0 },
  { question: "Que désigne le référencement naturel ?", options: ["La publicité payante", "L'achat de fichiers clients", "L'envoi de colis", "La visibilité d'un site dans les résultats non payants des moteurs de recherche"], correctIndex: 3 },
  { question: "Quel outil permet de programmer des publications sur les réseaux sociaux de Meta ?", options: ["Meta Business Suite", "PrestaShop", "FileZilla", "Matomo"], correctIndex: 0 },
  { question: "Que signifie RGAA ?", options: ["Règlement général des achats en ligne", "Référentiel général d'amélioration de l'accessibilité", "Registre général des abonnés", "Répertoire des garanties"], correctIndex: 1 },
  { question: "À quoi sert un stock de sécurité ?", options: ["À réduire les prix", "À remplacer l'inventaire", "À éviter la rupture en cas de hausse des ventes ou de retard", "À calculer la TVA"], correctIndex: 2 },
  { question: "Comment calcule-t-on le taux de conversion d'une boutique ?", options: ["Visites divisées par produits", "Stock divisé par ventes", "Chiffre d'affaires divisé par visites", "Commandes divisées par sessions"], correctIndex: 3 },
  { question: "Quel règlement européen protège les données personnelles des clients ?", options: ["Le RGPD", "La LCEN", "Le RGAA", "La DSP2"], correctIndex: 0 },
  { question: "Pour les cookies publicitaires, que recommande la CNIL ?", options: ["Les déposer sans rien demander", "Recueillir le consentement, refuser devant être aussi simple qu'accepter", "Les rendre obligatoires", "Cacher le bouton de refus"], correctIndex: 1 },
];

/** Explications du corrigé du positionnement, dans l'ordre des questions. */
export const ECO21_QCM_DEBUT_EXPLICATIONS: string[] = [
  "Shopify, WooCommerce (WordPress) et PrestaShop sont des solutions de vente en ligne ; FileZilla est un client FTP, Matomo un outil de mesure d'audience, Search Console un outil de suivi du référencement (module 1).",
  "Le texte alternatif décrit l'information portée par l'image pour les personnes aveugles ou malvoyantes qui utilisent un lecteur d'écran ; il sert aussi au référencement (modules 1 et 4).",
  "Le droit de rétractation est de 14 jours dans le cas général (article L221-18 du code de la consommation) ; il doit être présenté dans les CGV (module 2).",
  "Le référencement naturel vise les résultats non payants ; la publicité sur les moteurs de recherche relève du référencement payant (module 3).",
  "Meta Business Suite permet de programmer les publications Facebook et Instagram, de répondre aux messages et de suivre les statistiques (module 3).",
  "Le RGAA, référentiel général d'amélioration de l'accessibilité, traduit en critères vérifiables les règles d'accessibilité des WCAG (module 4).",
  "Le stock de sécurité absorbe une hausse imprévue des ventes ou un retard de réapprovisionnement ; il entre dans le calcul du point de commande (module 5).",
  "Le taux de conversion rapporte le nombre de commandes au nombre de sessions ; le panier moyen rapporte le chiffre d'affaires au nombre de commandes (module 6).",
  "Le RGPD (règlement UE 2016/679) et la loi Informatique et Libertés encadrent les données personnelles ; la CNIL en contrôle l'application (module 7).",
  "Les cookies non nécessaires exigent un consentement préalable ; refuser doit être aussi simple qu'accepter, et le choix doit pouvoir être modifié (module 7).",
];

export const ECO21_QCM_FIN: AIQCMQuestion[] = [
  { question: "Quelle solution de vente en ligne est une extension de WordPress ?", options: ["WooCommerce", "Shopify", "PrestaShop", "Canva"], correctIndex: 0 },
  { question: "Quelle loi impose les mentions légales d'un site professionnel ?", options: ["Le code de la route", "La loi sur l'eau", "La LCEN de 2004", "Le RGAA"], correctIndex: 2 },
  { question: "Quelle est la durée de la garantie légale de conformité pour un bien neuf vendu à un consommateur ?", options: ["6 mois", "2 ans", "5 ans", "10 ans"], correctIndex: 1 },
  { question: "À quoi sert Google Search Console ?", options: ["À créer des visuels", "À encaisser les paiements", "À gérer les stocks", "À suivre l'indexation du site et les requêtes qui y mènent"], correctIndex: 3 },
  { question: "Depuis quelle date l'European Accessibility Act s'applique-t-il aux services de commerce électronique ?", options: ["28 juin 2025", "25 mai 2018", "1er janvier 2027", "21 juin 2004"], correctIndex: 0 },
  { question: "Avec 6 ventes par jour, 10 jours de délai et 20 unités de stock de sécurité, quel est le point de commande ?", options: ["36", "60", "80", "26"], correctIndex: 2 },
  { question: "2 000 sessions ont donné 40 commandes. Quel est le taux de conversion ?", options: ["4 pour cent", "2 pour cent", "20 pour cent", "0,5 pour cent"], correctIndex: 1 },
  { question: "Quelle norme encadre la sécurité des données de carte bancaire ?", options: ["Le RGAA", "La LCEN", "Les WCAG", "La norme PCI DSS"], correctIndex: 3 },
  { question: "En cas de violation de données présentant un risque pour les personnes, dans quel délai faut-il notifier la CNIL ?", options: ["72 heures", "1 mois", "1 an", "Jamais"], correctIndex: 0 },
  { question: "Quelles sont les deux épreuves de la certification RS6475 ?", options: ["Un oral de langue et un dossier écrit", "Un QCM de 20 minutes et une mise en situation professionnelle de 2 h 45", "Un mémoire et une soutenance", "Un stage et un rapport"], correctIndex: 1 },
];

export const ECO21_EVAL_PACK: AIEvalPack = {
  qcmDebut: ECO21_QCM_DEBUT,
  qcmFin: ECO21_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du module 4, séance 4) — la boutique d'Inès avant l'ouverture, cas fictif",
    contexte:
      "Inès s'apprête à ouvrir « Lueur d'Inès » (nom fictif). Sa page d'accueil présente un diaporama de photos sans texte alternatif et un menu qui ne s'ouvre qu'au survol de la souris. Ses fiches produits indiquent le prix hors taxes, sans frais de livraison. Il n'existe ni mentions légales, ni conditions générales de vente. Elle compte publier sur Instagram « quand elle aura le temps » et a choisi un seul mot-clé : « bougie ».",
    questions: [
      { question: "Quels défauts de conception et d'accessibilité relevez-vous, et comment les corriger ?", reponseAttendue: "Photos sans texte alternatif : rédiger des textes alternatifs utiles ; menu au survol : le rendre utilisable au clavier et au toucher ; vérifier aussi les contrastes, les intitulés des boutons et l'affichage sur mobile, en s'appuyant sur les critères du RGAA.", points: 5 },
      { question: "Quelles informations et pages obligatoires manquent avant l'ouverture ?", reponseAttendue: "Prix TTC et frais de livraison affichés avant la commande ; mentions légales (LCEN) ; conditions générales de vente avec information précontractuelle, droit de rétractation de 14 jours, garantie légale de conformité et coordonnées du médiateur de la consommation ; politique de confidentialité et gestion des cookies.", points: 5 },
      { question: "Que proposez-vous pour sa stratégie de marketing en ligne ?", reponseAttendue: "Plusieurs mots-clés précis, dont des expressions de longue traîne et locales ; balises title et meta description propres à chaque page ; planning de publication sur un ou deux réseaux adaptés, avec des thèmes et des formats prévus ; éventuellement une petite campagne publicitaire avec objectif, cible, budget et indicateur suivi.", points: 5 },
      { question: "L'European Accessibility Act s'applique-t-il à Inès, et pourquoi rendre malgré tout sa boutique accessible ?", reponseAttendue: "Applicable depuis le 28 juin 2025 au commerce électronique, il exempte les microentreprises de services (moins de 10 salariés et chiffre d'affaires ou bilan n'excédant pas 2 M€) : Inès, seule, est exemptée. L'accessibilité reste attendue par la certification, élargit la clientèle et améliore l'expérience de tous.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — QCM d'entraînement et présentation commentée de la boutique du stagiaire (séance 6), grille d'acquisition des compétences C1 à C7",
    exercices: [
      {
        titre: "Partie 1 — QCM d'entraînement sur les sept compétences (C1 à C7)",
        consigne: "Sur la plateforme e-learning, répondez au QCM d'entraînement dans un temps limité de 20 minutes, comme pour l'épreuve 1 du certificateur. Correction commentée en classe virtuelle, compétence par compétence. Les modalités officielles de notation sont celles du règlement du certificateur.",
        reponseAttendue: "Réponses justes sur les notions clés : choix de plateforme, ergonomie et accessibilité ; paramétrage, paiement, livraison et obligations du vendeur ; référencement, réseaux sociaux, publicité et planning ; RGAA et European Accessibility Act ; stocks et livraisons ; statistiques et fidélisation ; RGPD, cookies et sécurité. Le stagiaire identifie les notions à retravailler avant l'épreuve.",
        points: 20,
      },
      {
        titre: "Partie 2 — Présentation du projet et de la boutique (C1, C2)",
        consigne: "Présentez votre projet, la plateforme choisie et l'arborescence de votre boutique, puis montrez en direct, par partage d'écran, l'ajout d'un produit avec ses variantes et le paramétrage d'un mode de livraison.",
        reponseAttendue: "Projet clair et cohérent ; choix de plateforme argumenté ; arborescence logique ; fiche produit complète et accessible ; manipulation réalisée sans erreur, avec explication des choix d'installation (thème, extensions ciblées).",
        points: 20,
      },
      {
        titre: "Partie 3 — Plan de visibilité et lecture des statistiques (C3, C6)",
        consigne: "Présentez vos mots-clés, votre planning de publication sur un mois et une action publicitaire, puis interprétez le tableau de statistiques fictif remis par le formateur et proposez deux ajustements.",
        reponseAttendue: "Mots-clés pertinents et balises rédigées ; planning réaliste et daté ; campagne avec objectif, cible, budget et indicateur ; calculs justes du taux de conversion et du panier moyen ; ajustements argumentés.",
        points: 20,
      },
      {
        titre: "Partie 4 — Accessibilité, stocks et livraison (C4, C5)",
        consigne: "Réalisez trois tests d'accessibilité sur une page de votre boutique et proposez les corrections ; calculez le point de commande d'un produit à partir des données fournies et décrivez votre procédure en cas de retard de livraison.",
        reponseAttendue: "Tests pertinents (clavier, contrastes, textes alternatifs ou formulaires) et corrections conformes au RGAA ; point de commande juste ; réglages de stock adaptés ; information du client et solutions proposées en cas de retard.",
        points: 20,
      },
      {
        titre: "Partie 5 — Sécurité des données et RGPD (C7)",
        consigne: "Présentez le registre simplifié des traitements de votre boutique, votre bandeau de cookies et vos mesures de sécurité, puis expliquez la conduite à tenir en cas de fuite de données.",
        reponseAttendue: "Traitements, finalités et durées de conservation identifiés ; bandeau conforme aux recommandations de la CNIL ; comptes nominatifs, double authentification, mises à jour et sauvegardes ; conduite à tenir en cas de violation, dont la notification à la CNIL dans les 72 heures lorsque la violation présente un risque.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const ECO21_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.francecompetences.fr/recherche/rs/6475/",
      titreLien: "France Compétences — fiche RS6475 « Créer et développer une e-boutique professionnelle »",
      titre: "Échéance de l'enregistrement de la fiche RS6475 au 21/12/2026",
      date: "Novembre 2026",
      commentaire: "La fiche RS6475 (certificateur : DIDACTIZ) a été enregistrée par décision du 21/12/2023 pour 3 ans : l'enregistrement arrive à échéance le 21/12/2026 et la dernière date de délivrance possible de la certification est le 21/06/2027. Le renouvellement n'est pas acquis : l'organisme doit surveiller la publication d'une décision de renouvellement ou d'une fiche qui lui succède avant d'ouvrir des sessions dont la certification serait délivrée après ces dates.",
      exploitation: "Preuve : capture datée de la fiche classée au dossier qualité. Action : contrôle mensuel de la fiche jusqu'à la décision de renouvellement ; information des stagiaires sur la certification visée et sur les dates limites ; contact avec le certificateur pour connaître le calendrier des épreuves.",
    },
    {
      lien: "https://accessibilite.numerique.gouv.fr/",
      titreLien: "Accessibilité numérique — European Accessibility Act (directive 2019/882) et RGAA 4.1",
      titre: "European Accessibility Act applicable au commerce électronique depuis le 28 juin 2025",
      date: "Octobre 2026",
      commentaire: "La directive européenne 2019/882 s'applique depuis le 28 juin 2025 aux services de commerce électronique ; les microentreprises de services (moins de 10 salariés et chiffre d'affaires ou bilan annuel n'excédant pas 2 M€) en sont exemptées. Le RGAA 4.1, fondé sur les WCAG 2.1, sert de référence pour vérifier l'accessibilité d'une boutique en ligne.",
      exploitation: "Preuve : chapitre 4 et mise en situation 6 mis à jour avec la date de consultation. Action : chaque stagiaire vérifie si son entreprise est concernée et applique la grille d'audit à sa propre boutique.",
    },
    {
      lien: "https://www.cnil.fr/fr/reglement-europeen-protection-donnees",
      titreLien: "CNIL — RGPD, cookies et autres traceurs",
      titre: "RGPD et recommandations de la CNIL sur les cookies",
      date: "Octobre 2026",
      commentaire: "Le RGPD (règlement UE 2016/679) et la loi Informatique et Libertés encadrent les données des clients ; pour les cookies non nécessaires, la CNIL recommande un consentement préalable, un refus aussi simple que l'acceptation et un choix modifiable à tout moment. Ces règles sont reprises dans le chapitre 7 et dans la mise en situation 10.",
      exploitation: "Preuve : modèle de bandeau et de politique de confidentialité mis à jour dans les ressources. Action : relecture des recommandations de la CNIL avant chaque session et correction des modèles si besoin.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — LCEN (loi n° 2004-575 du 21 juin 2004) et code de la consommation",
      titre: "Obligations du vendeur en ligne : mentions légales, information précontractuelle, rétractation, garantie, médiation",
      date: "Septembre 2026",
      commentaire: "La LCEN impose les mentions légales des sites professionnels ; le code de la consommation encadre l'information précontractuelle, le droit de rétractation de 14 jours (article L221-18), la garantie légale de conformité de 2 ans et la médiation de la consommation obligatoire. Toute évolution est reportée dans le chapitre 2 et la check-list d'ouverture de la boutique.",
      exploitation: "Preuve : chapitre 2 et check-list datés. Action : relecture des textes cités avant chaque session.",
    },
  ],
  metier: [
    {
      lien: "https://entreprendre.service-public.fr/",
      titreLien: "Entreprendre.service-public.fr — vendre en ligne",
      titre: "Démarches et obligations des entrepreneurs qui vendent en ligne",
      date: "Octobre 2026",
      commentaire: "Les fiches officielles présentent les obligations des vendeurs en ligne et les démarches de création d'entreprise. Le support y renvoie plutôt que de figer des seuils ou des montants qui évoluent.",
      exploitation: "Preuve : liens cités dans les ressources complémentaires. Action : vérification des fiches avant chaque session et transmission aux stagiaires qui créent leur entreprise.",
    },
    {
      lien: "https://www.economie.gouv.fr/",
      titreLien: "Ministère de l'Économie — commerce en ligne et protection du consommateur",
      titre: "Pratiques commerciales en ligne : avis clients, prix, livraison",
      date: "Septembre 2026",
      commentaire: "Les pages du ministère de l'Économie rappellent les règles applicables au commerce en ligne et à la protection des consommateurs (information sur les prix et la livraison, avis en ligne). Elles servent de référence pour les mises en situation sur la fiche produit, la livraison et la fidélisation.",
      exploitation: "Preuve : mises en situation 2, 7 et 9. Action : mise à jour des corrigés en cas d'évolution des règles.",
    },
    {
      lien: "https://www.francecompetences.fr/recherche/rs/6475/",
      titreLien: "France Compétences — fiche RS6475, modalités d'évaluation",
      titre: "Préparation aux deux épreuves du certificateur",
      date: "Novembre 2026",
      commentaire: "La fiche décrit une épreuve 1 sous forme de QCM de 20 minutes et une épreuve 2 de mise en situation professionnelle de 2 h 45, devant un jury de 2 membres extérieurs à l'organisme certificateur. La préparation de la séance 6 suit ces modalités, sans barème ni seuil inventés.",
      exploitation: "Preuve : partie préparation aux épreuves du chapitre 7. Action : relecture des modalités de la fiche et du règlement du certificateur avant chaque session.",
    },
  ],
  technologique: [
    {
      lien: "https://www.banque-france.fr/",
      titreLien: "Banque de France — paiement en ligne et authentification forte",
      titre: "DSP2 et authentification forte du payeur (3-D Secure)",
      date: "Septembre 2026",
      commentaire: "La deuxième directive sur les services de paiement impose l'authentification forte du payeur pour les paiements en ligne ; le parcours de paiement de la boutique doit l'intégrer sans dégrader l'expérience d'achat. Le formateur montre le paramétrage chez les prestataires de paiement des plateformes présentées.",
      exploitation: "Preuve : mise en situation 3 et chapitre 2. Action : vérification du parcours de paiement de test de chaque boutique en séance 2.",
    },
    {
      lien: "https://www.pcisecuritystandards.org/",
      titreLien: "PCI Security Standards Council — norme PCI DSS",
      titre: "Sécurité des données de carte et des comptes de la boutique",
      date: "Octobre 2026",
      commentaire: "La norme PCI DSS encadre la sécurité des données de carte : la boutique confie ces données à un prestataire de paiement conforme et ne les stocke pas. Comptes nominatifs, double authentification, mises à jour et sauvegardes complètent la prévention des fuites de données.",
      exploitation: "Preuve : check-list de sécurité du chapitre 7. Action : contrôle de la check-list sur la boutique de chaque stagiaire en séance 6.",
    },
    {
      lien: "https://accessibilite.numerique.gouv.fr/",
      titreLien: "Accessibilité numérique — outils et méthode de test",
      titre: "Thèmes, extensions et accessibilité des boutiques en ligne",
      date: "Août 2026",
      commentaire: "Les thèmes et extensions des plateformes évoluent souvent : une mise à jour peut corriger ou dégrader l'accessibilité d'une boutique. Les tests simples (clavier, contrastes, textes alternatifs, formulaires) sont refaits après chaque changement de thème ou d'extension.",
      exploitation: "Preuve : grille d'audit dans les ressources. Action : nouvelle vérification de la boutique de démonstration avant chaque session.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedECO21AICaches(f: FormationInfo = FORMATION_ECO21): void {
  try {
    setCachedContentPack(f, ECO21_CONTENT_PACK);
    setCachedEvalPack(f, ECO21_EVAL_PACK);
    setCachedVeillePack(f, ECO21_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
