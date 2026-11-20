/**
 * Preset complet « Préparation à l'examen d'accès à la profession de conducteur VTC (RS5637) – 48 h »
 * — formation CERTIFIANTE préparant à la certification inscrite au Répertoire spécifique sous le code RS5637
 * « Habilitation pour l'accès à la profession de conducteur de voiture de transport avec chauffeur (VTC) »
 * (certificateur : ministère chargé des transports ; enregistrement de droit ; fin d'enregistrement de la fiche
 * au 31/12/2026, à surveiller). L'examen est organisé par les chambres de métiers et de l'artisanat (CMA) :
 * le candidat s'y inscrit lui-même (candidature individuelle) ; l'organisme forme, il n'organise pas l'examen.
 * Textes : code des transports (articles L. 3120-1 et suivants, L. 3120-2-1, L. 3122-1 et suivants,
 * R. 3120-6 et suivants), arrêté du 6 avril 2017 relatif aux programmes et à l'évaluation des épreuves.
 * Les coefficients, durées d'épreuve, notes éliminatoires et frais d'examen ne sont volontairement PAS écrits :
 * ils sont renvoyés à l'arrêté du 6 avril 2017 et au site de la CMA.
 * 48 heures sur 7 jours, samedi inclus : jours 1 à 6 de 7 h (09h00 – 12h30 / 13h30 – 17h00), jour 7 de 6 h
 * (09h00 – 12h30 / 13h30 – 16h00), à distance en classe virtuelle synchrone
 * (Google Meet / Zoom) avec le formateur en direct, espace e-learning (QCM d'entraînement, examens blancs) ;
 * groupe de 1 à 12 ; prérequis : permis B hors période probatoire. Tarif : 480 € net de taxes par stagiaire.
 * La conduite réelle en véhicule n'est pas incluse : le module pratique prépare à l'épreuve d'admission
 * (méthode, itinéraire, accueil, facturation, relation client).
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - 6 modules, compétences C1 à C6 ; fil rouge FICTIF : Samir, futur chauffeur VTC indépendant à Créteil,
 *    et ses clients fictifs
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées et 6 QCM de 10 questions (un par compétence)
 *  - Pack évaluation : QCM de positionnement de début (10 questions, corrigé expliqué), QCM de fin (10 questions),
 *    cas pratique intermédiaire (fin du jour 5), évaluation finale interne (examen blanc, jour 7)
 *  - Pack veille (réglementaire / métier / technologique)
 * Le support de cours (6 chapitres) est dans `vtc48h/` ; les réponses propres à chaque stagiaire dans
 * `vtc48hHumanized.ts`. Aucune donnée de satisfaction ni aucun taux de réussite n'est pré-rempli.
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
export const FORMATION_VTC48: FormationInfo = {
  intitule: "Préparation à l'examen d'accès à la profession de conducteur VTC (RS5637) – 48 h",
  codeRNCP: "RS5637",
  objectifs:
    "Formation certifiante préparant à l'examen d'accès à la profession de conducteur de voiture de transport avec chauffeur (VTC) : certification enregistrée au Répertoire spécifique sous le code RS5637 « Habilitation pour l'accès à la profession de conducteur de voiture de transport avec chauffeur (VTC) » (certificateur : ministère chargé des transports ; examen organisé par les chambres de métiers et de l'artisanat). Objectif général : acquérir les connaissances et les savoir-faire évalués par les épreuves d'admissibilité et par l'épreuve pratique d'admission, et préparer son installation comme conducteur VTC.\nÀ l'issue de la formation, le stagiaire sera capable de :\n- C1 — Appliquer la réglementation du transport public particulier de personnes (T3P) : professions, conditions d'accès, carte professionnelle, registre, contrôles et sanctions (épreuve A).\n- C2 — Gérer son entreprise : statuts juridiques, notions de comptabilité, TVA, charges, prix de revient et seuil de rentabilité (épreuve B).\n- C3 — Conduire en sécurité : code de la route, fatigue et temps de conduite, alcool et stupéfiants, conduite à tenir en cas d'accident et gestes de premiers secours (épreuve C).\n- C4 — S'exprimer et comprendre en langue française (épreuve D) et en anglais dans les situations courantes du métier (épreuve E).\n- C5 — Développer son activité commerciale et appliquer la gestion et la réglementation nationale propres à l'activité VTC (épreuves F et G).\n- C6 — Réaliser une course dans les conditions de l'épreuve pratique d'admission : accueil et prise en charge du client, itinéraire, conduite souple, facturation et relation client.",
  prerequis:
    "Être titulaire du permis B hors période probatoire. Pour la carte professionnelle, après la réussite à l'examen : conditions d'honorabilité (casier judiciaire), formation aux premiers secours (PSC1 ou équivalent) et visite médicale demandées par la préfecture. Lire et comprendre le français. Disposer d'un ordinateur (ou d'une tablette) avec caméra, micro et connexion internet pour la classe virtuelle. Un entretien préalable vérifie le projet et les conditions d'accès à la profession.",
  duree: "48 heures réparties sur 7 jours : jours 1 à 6 de 7 h (09h00 – 12h30 / 13h30 – 17h00) et jour 7 de 6 h (09h00 – 12h30 / 13h30 – 16h00), samedi inclus",
  dureeSaisiePrioritaire: true,
  modalites: "distanciel",
  tarif: "480 € net de taxes par stagiaire",
  programme:
    "JOUR 1 — Accueil, positionnement et réglementation du T3P (7 h)\nModule 1 — Réglementation du transport public particulier de personnes, épreuve A (C1, 10 h) : sur deux jours, 7 h le jour 1 et 3 h le jour 2 ; accueil, présentation du fil rouge (Samir, futur chauffeur VTC indépendant à Créteil, personnage fictif), du déroulé de l'examen organisé par la CMA et QCM de positionnement ; les professions du T3P (taxis, VTC, véhicules motorisés à deux ou trois roues) ; conditions d'accès à la profession (permis B hors période probatoire, honorabilité, examen, carte professionnelle, formation continue) ; registre des exploitants VTC et signalétique ; réservation préalable et interdiction de la maraude.\nJOUR 2 — Fin de la réglementation du T3P et début de la gestion (7 h)\nModule 1 (suite et fin, 3 h) : acteurs du contrôle, infractions et sanctions ; QCM d'entraînement de l'épreuve A.\nModule 2 — Gestion, épreuve B (C2, 8 h) : sur deux jours, 4 h le jour 2 et 4 h le jour 3 ; statuts juridiques (entreprise individuelle, micro-entreprise, EURL, SASU) ; obligations comptables et documents de synthèse (bilan, compte de résultat) ; TVA et régimes sociaux et fiscaux.\nJOUR 3 — Gestion et début de la sécurité routière (7 h)\nModule 2 (suite et fin, 4 h) : charges fixes et variables, amortissement du véhicule ; prix de revient d'une course, marge sur coûts variables et seuil de rentabilité ; QCM d'entraînement de l'épreuve B.\nModule 3 — Sécurité routière, épreuve C (C3, 8 h) : sur deux jours, 3 h le jour 3 et 5 h le jour 4 ; règles du code de la route utiles au conducteur professionnel et permis à points ; vitesse, distances de sécurité et conduite préventive.\nJOUR 4 — Sécurité routière et début du français (7 h)\nModule 3 (suite et fin, 5 h) : alcool, stupéfiants et médicaments ; fatigue, temps de conduite et pauses ; conduite à tenir en cas d'accident (protéger, alerter, secourir), constat amiable et premiers secours ; QCM d'entraînement de l'épreuve C.\nModule 4 — Français et anglais, épreuves D et E (C4, 8 h) : sur deux jours, 2 h le jour 4 et 6 h le jour 5 ; compréhension de textes réglementaires et professionnels ; vocabulaire et orthographe.\nJOUR 5 — Français, anglais et cas pratique intermédiaire (7 h)\nModule 4 (suite et fin, 6 h) : rédaction de messages aux clients ; anglais de l'accueil, du trajet, du paiement et des situations imprévues ; QCM d'entraînement des épreuves D et E ; cas pratique intermédiaire en fin de journée (réglementation, gestion, sécurité routière et anglais).\nModule 5 — Développement commercial et réglementation spécifique VTC, épreuves F et G (C5, 10 h) : sur trois jours, 1 h le jour 5, 7 h le jour 6 et 2 h le jour 7 ; étude de marché et clientèles (particuliers, entreprises, hôtels, événements).\nJOUR 6 — Développement commercial et réglementation spécifique VTC (7 h)\nModule 5 (suite, 7 h) : plateformes de réservation et clientèle directe ; communication et fidélisation ; devis et tableau de bord commercial ; réglementation nationale propre aux VTC : réservation préalable et justificatif, retour au lieu d'établissement, signalétique, relations avec les plateformes et droits issus de la loi d'orientation des mobilités.\nJOUR 7 — Fin du développement commercial, épreuve pratique et examen blanc final (6 h)\nModule 5 (suite et fin, 2 h) : révision des épreuves F et G ; QCM d'entraînement.\nModule 6 — Préparation à l'épreuve pratique d'admission et examen blanc final (C6, 4 h) : le jour 7 ; méthode de l'épreuve pratique (préparation de l'itinéraire, accueil et prise en charge du client, conduite souple, information du client, facturation, prise de congé) ; simulation commentée d'une course ; évaluation finale (examen blanc) ; inscription à l'examen auprès de la CMA (candidature individuelle) ; bilan de la formation.",
  methodesEvaluation:
    "Positionnement en ouverture : QCM de positionnement de 10 questions (une seule bonne réponse chacune, corrigé et expliqué), comparé à l'évaluation finale pour mesurer la progression, et 10 questions ouvertes de positionnement ; 10 mises en situation corrigées sur le fil rouge de Samir (personnage fictif) ; un QCM corrigé de 10 questions par compétence (C1 à C6) ; QCM d'entraînement et examens blancs dans l'espace e-learning ; cas pratique intermédiaire en fin de jour 5 ; évaluation finale interne le jour 7 (examen blanc reprenant les épreuves écrites et simulation de l'épreuve pratique d'admission) ; test de positionnement de fin. Évaluation à chaud (questionnaire de satisfaction en fin de formation) et évaluation à froid. Certification RS5637 délivrée après réussite à l'examen organisé par la chambre de métiers et de l'artisanat, auquel le candidat s'inscrit lui-même ; les épreuves, leurs modalités et leur notation sont fixées par l'arrêté du 6 avril 2017 et précisées par la CMA. L'organisme remet un certificat de réalisation et une attestation de fin de formation.",
  moyensPedagogiques:
    "Formation à distance en classe virtuelle synchrone (Google Meet ou Zoom), formateur en direct pendant les 48 heures, caméra et micro des stagiaires actifs. Méthodes actives : apports courts illustrés, études de cas et mises en situation sur le fil rouge de Samir, futur chauffeur VTC indépendant à Créteil (personnage fictif, clients fictifs), calculs de gestion guidés, jeux de rôle en français et en anglais, simulation commentée d'une course, sondages et QCM corrigés en direct, travail en sous-groupes dans des salles virtuelles, tableau blanc collaboratif. Espace e-learning : support de cours en 6 chapitres, fiches à retenir, QCM d'entraînement par épreuve, examens blancs, modèles de devis et de note de course, vidéos, accessibles pendant toute la formation et jusqu'à la date d'examen choisie par le stagiaire. La conduite réelle en véhicule n'est pas incluse. Ressources officielles : code des transports et arrêté du 6 avril 2017 sur Légifrance, pages du ministère chargé des transports, informations de la CMA sur l'examen.",
  publicVise:
    "Particuliers finançant eux-mêmes leur formation, demandeurs d'emploi, salariés en reconversion et toute personne souhaitant devenir conducteur de voiture de transport avec chauffeur (VTC), à titre indépendant ou salarié. Groupe de 1 à 12 stagiaires.",
  delaiAcces:
    "Inscription possible avant chaque session, sous réserve de places disponibles, de l'entretien préalable et de la signature du contrat ou de la convention de formation ; en financement personnel, l'entrée en formation intervient à l'expiration du délai de rétractation de 10 jours suivant la signature du contrat de formation professionnelle. Le lien de la classe virtuelle et les accès à l'espace e-learning sont envoyés avant le premier jour de formation. L'inscription à l'examen est faite par le stagiaire auprès de la CMA, selon le calendrier publié par celle-ci.",
  dateDebut: "2026-12-01",
  dateFin: "2026-12-08",
  lieu: "",
  nombreParticipants: "12",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Comprendre le déroulé de l'examen VTC organisé par la CMA : épreuves d'admissibilité, épreuve pratique d'admission, inscription individuelle.",
  "Maîtriser la réglementation du transport public particulier de personnes et la différence entre taxi et VTC.",
  "Connaître les conditions d'accès à la profession et les démarches après l'examen : carte professionnelle, registre, assurance.",
  "Choisir un statut juridique adapté à son projet d'installation et en comprendre les conséquences sociales et fiscales.",
  "Savoir calculer un prix de revient et un seuil de rentabilité pour fixer ses prix et juger une offre de plateforme.",
  "Revoir le code de la route et les règles de sécurité propres au transport de passagers.",
  "Savoir réagir en cas d'accident ou de malaise d'un passager.",
  "Améliorer son français écrit et son anglais d'accueil pour les épreuves D et E et pour la clientèle internationale.",
  "Construire un plan de développement commercial qui ne dépende pas d'une seule plateforme.",
  "Se préparer à l'épreuve pratique : accueil, itinéraire, conduite souple, facturation et relation client.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins est conduite avant la formation (entretien préalable avec chaque candidat, vérification du permis B hors période probatoire et du projet professionnel) puis à l'ouverture de la classe virtuelle : QCM de positionnement de 10 questions sur les notions clés des six épreuves (comparé à l'évaluation finale pour mesurer la progression), 10 questions ouvertes de positionnement et tour de table sur l'expérience de conduite, le projet d'installation et le niveau en français et en anglais. Les stagiaires sont surtout des particuliers en reconversion, des demandeurs d'emploi et des salariés qui préparent leur installation comme conducteur VTC indépendant ou salarié.</p>
<ul>
  <li><strong>Réglementation (C1, C5)</strong> : la frontière entre taxi et VTC, la réservation préalable, la carte professionnelle et le registre sont mal connus ; ce sont aussi les épreuves où les erreurs de vocabulaire coûtent cher.</li>
  <li><strong>Gestion (C2)</strong> : la plupart des stagiaires n'ont jamais calculé un prix de revient ni un seuil de rentabilité ; la formation s'appuie sur des calculs guidés à partir du projet de Samir, puis de leur propre projet.</li>
  <li><strong>Sécurité, langues et pratique (C3, C4, C6)</strong> : bons conducteurs, les stagiaires doivent reprendre les règles écrites du code de la route, les premiers secours, l'anglais d'accueil et la méthode de l'épreuve pratique.</li>
</ul>
<p>Samir, futur chauffeur VTC indépendant à Créteil (personnage fictif), sert de point de départ à chaque mise en situation, avant la transposition au projet réel de chaque stagiaire.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Projet de chaque stagiaire</strong> : les calculs de gestion et le plan commercial sont refaits avec les données du projet réel de chacun (indépendant ou salarié, véhicule acheté, loué ou en location avec option d'achat, clientèle visée).</li>
  <li><strong>Entraînement aux épreuves écrites</strong> : QCM d'entraînement par épreuve dans l'espace e-learning, corrigés expliqués, et examens blancs ; le formateur reprend en classe virtuelle les questions les plus souvent manquées.</li>
  <li><strong>Français et anglais</strong> : exercices différenciés selon le niveau relevé au positionnement ; lecture des consignes à voix haute ; vocabulaire professionnel en fiches.</li>
  <li><strong>Classe virtuelle</strong> : test de connexion proposé avant le premier jour de formation, pauses régulières, sondages et sous-groupes pour faire participer chacun.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, supports transmis à l'avance sur demande, sous-titres activables pendant la classe virtuelle ; information sur la demande d'aménagement des épreuves à adresser à la CMA lors de l'inscription à l'examen.</li>
</ul>`;

/** 10 mises en situation (C1 à C6) sur le fil rouge de Samir (fictif), corrigés formateur. */
export const VTC48_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — C1 : les professions du T3P et les conditions d'accès de Samir",
    consigne:
      "Samir, 34 ans, ancien chauffeur-livreur (personnage fictif), veut devenir chauffeur VTC indépendant à Créteil. 1. Citez les professions qui composent le transport public particulier de personnes (T3P) et ce qui distingue le taxi du VTC. 2. Listez les conditions qu'il doit remplir pour accéder à la profession, de l'inscription à l'examen jusqu'à la première course. 3. Classez dans l'ordre les démarches qu'il doit accomplir après la réussite à l'examen. 4. Indiquez qui organise l'examen et qui délivre la carte professionnelle.",
    reponseAttendue:
      "Professions du T3P : taxis, voitures de transport avec chauffeur (VTC), véhicules motorisés à deux ou trois roues. Le taxi peut stationner et circuler sur la voie publique en quête de clients (maraude) dans sa zone de stationnement ; le VTC ne prend en charge un client que sur réservation préalable.\nConditions d'accès : permis B hors période probatoire, conditions d'honorabilité (casier judiciaire), réussite à l'examen d'accès à la profession, aptitude médicale et formation aux premiers secours demandées pour la carte, carte professionnelle en cours de validité, formation continue pour son renouvellement.\nOrdre des démarches : inscription individuelle à l'examen auprès de la CMA, réussite aux épreuves d'admissibilité puis à l'épreuve pratique d'admission, demande de carte professionnelle à la préfecture, création de l'entreprise, inscription au registre des exploitants VTC, assurance adaptée au transport de personnes à titre onéreux, signalétique VTC sur le véhicule.\nL'examen est organisé par les chambres de métiers et de l'artisanat ; la carte professionnelle est délivrée par le préfet.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 : réservation préalable, maraude et contrôle sur la voie publique",
    consigne:
      "Un vendredi soir, Samir dépose un client à la gare de Lyon. 1. Un voyageur lui fait signe et lui demande de l'emmener à Créteil : que doit-il répondre et pourquoi ? 2. Il n'a pas d'autre réservation : où peut-il aller attendre ? 3. Une patrouille le contrôle : quels documents et justificatifs doit-il pouvoir présenter ? 4. Expliquez ce qu'est la « maraude électronique » et pourquoi elle est interdite au VTC.",
    reponseAttendue:
      "Réponse au voyageur : refus poli, car le VTC ne peut prendre en charge un client que sur réservation préalable ; il peut lui proposer de réserver par les canaux habituels ou l'orienter vers la station de taxis.\nAttente : sans nouvelle réservation, retour au lieu d'établissement de l'exploitant ou stationnement dans un lieu hors de la chaussée où le stationnement est autorisé ; jamais de stationnement ni de circulation sur la voie publique en quête de clients, jamais d'arrêt sur une station de taxis.\nDocuments : carte professionnelle de conducteur VTC apposée ou présentée, justificatif de la réservation préalable (papier ou électronique), permis de conduire, documents du véhicule et attestation d'assurance couvrant le transport de personnes à titre onéreux, preuve de l'inscription de l'exploitant au registre, signalétique VTC apposée.\nMaraude électronique : informer un client, avant toute réservation, de la localisation et de la disponibilité d'un véhicule qui se trouve sur la voie publique ; elle reviendrait à pratiquer la maraude réservée aux taxis.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C2 : choisir le statut juridique de l'entreprise de Samir",
    consigne:
      "Samir hésite entre l'entreprise individuelle au régime de la micro-entreprise, l'EURL et la SASU. 1. Présentez pour chaque forme la personnalité juridique, la protection du patrimoine, le régime social du dirigeant et les obligations comptables. 2. Expliquez pourquoi la micro-entreprise ne permet pas de déduire les charges réelles. 3. Recommandez un statut pour démarrer en argumentant au regard de son projet (véhicule acheté à crédit, charges élevées). 4. Indiquez où vérifier les seuils et taux en vigueur.",
    reponseAttendue:
      "Entreprise individuelle : pas de personne morale distincte ; patrimoine professionnel séparé du patrimoine personnel par la loi ; dirigeant travailleur indépendant ; micro-entreprise : comptabilité très simplifiée (livre des recettes, registre des achats selon l'activité), cotisations calculées sur le chiffre d'affaires. EURL : société unipersonnelle, gérant associé unique en principe travailleur indépendant, comptabilité complète. SASU : société par actions simplifiée à associé unique, président assimilé salarié, comptabilité complète.\nMicro-entreprise : impôt et cotisations calculés sur le chiffre d'affaires après un abattement forfaitaire, sans déduction des charges réelles ; elle convient mal à une activité dont les charges (véhicule, carburant, assurance, commissions) sont élevées.\nRecommandation argumentée : le choix dépend du chiffre d'affaires prévu, du niveau des charges et de la protection sociale souhaitée ; avec un véhicule acheté à crédit et des charges élevées, une société ou une entreprise individuelle au régime réel peut être plus adaptée ; conseil d'un expert-comptable recommandé.\nSeuils et taux : à vérifier chaque année sur les sites officiels de l'administration (service-public.fr, URSSAF, impots.gouv.fr), car ils évoluent.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C2 : prix de revient d'une course et seuil de rentabilité de Samir",
    consigne:
      "Données fictives du projet de Samir pour un mois : charges fixes 1 050 € (location du véhicule, assurance, téléphone, logiciel de facturation, expert-comptable) ; course moyenne de 30 € hors taxes ; charges variables par course de 9 € (carburant, entretien, pneus, commission de la plateforme). 1. Classez les charges en fixes ou variables. 2. Calculez la marge sur coûts variables par course. 3. Calculez le nombre de courses par mois qui correspond au seuil de rentabilité. 4. Pour 120 courses par mois, calculez le prix de revient d'une course et le résultat mensuel. 5. Une plateforme propose une course de 14 € : faut-il l'accepter ?",
    reponseAttendue:
      "Charges fixes : location du véhicule, assurance, téléphone, logiciel, expert-comptable ; charges variables : carburant, entretien, pneus, commission.\nMarge sur coûts variables par course : 30 − 9 = 21 €.\nSeuil de rentabilité : 1 050 / 21 = 50 courses par mois (soit 1 500 € de chiffre d'affaires hors taxes) ; à ce niveau, le résultat est nul et Samir ne se rémunère pas encore.\nPour 120 courses : charges fixes par course 1 050 / 120 = 8,75 € ; prix de revient d'une course 8,75 + 9 = 17,75 € ; résultat mensuel 120 × 21 − 1 050 = 1 470 € avant impôt et cotisations personnelles.\nCourse à 14 € : elle couvre les charges variables (9 €) et apporte 5 € de marge, mais reste en dessous du prix de revient complet de 17,75 € ; acceptable ponctuellement pour remplir un temps mort, pas comme prix habituel.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C3 : accident sur l'A86 avec des passagers à bord",
    consigne:
      "Samir conduit deux clients vers l'aéroport d'Orly. Sur l'A86, le véhicule qui le précède percute la glissière ; le conducteur reste immobile dans son véhicule, il respire. 1. Décrivez dans l'ordre les actions à mener selon la méthode « protéger, alerter, secourir ». 2. Indiquez les numéros d'urgence et le contenu du message d'alerte. 3. Que fait-il de ses passagers ? 4. S'il avait lui-même eu un accrochage sans blessé, quel document remplirait-il et comment ? 5. Rappelez pourquoi il ne doit pas déplacer la victime sauf danger immédiat.",
    reponseAttendue:
      "Protéger : ralentir, allumer les feux de détresse, s'arrêter en sécurité au-delà de l'accident, faire sortir les passagers du côté opposé à la circulation et les mettre à l'abri derrière la glissière, gilet de haute visibilité, triangle si cela peut se faire sans danger.\nAlerter : 112 (numéro d'urgence européen), 15 (SAMU), 18 (pompiers), 17 (police ou gendarmerie), 114 par SMS pour les personnes sourdes ou malentendantes ; message : lieu précis (autoroute, sens, point de repère), nature de l'accident, nombre et état des victimes, dangers éventuels ; ne pas raccrocher le premier.\nPassagers : les mettre en sécurité, les rassurer, les informer du retard et organiser la suite de la course quand la situation le permet.\nAccrochage sans blessé : constat amiable rempli et signé par les deux conducteurs, avec un croquis, puis transmis à l'assureur dans les délais prévus par le contrat.\nVictime : ne pas la déplacer sauf danger vital et immédiat (incendie, sur-accident) ; si elle est inconsciente et respire, la placer en position latérale de sécurité et surveiller sa respiration jusqu'à l'arrivée des secours.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C3 : organiser ses journées pour conduire en sécurité",
    consigne:
      "Samir prévoit de travailler de 6 h à 20 h pendant les salons professionnels, avec un café toutes les deux heures et un traitement contre l'allergie qui provoque de la somnolence. 1. Identifiez les risques pour sa sécurité et celle de ses passagers. 2. Proposez une organisation de la journée avec des pauses. 3. Expliquez l'effet de l'alcool, des stupéfiants et de certains médicaments sur la conduite et ce que signifie le pictogramme sur les boîtes de médicaments. 4. Donnez trois règles de conduite préventive pour le transport de passagers.",
    reponseAttendue:
      "Risques : fatigue et baisse de vigilance sur une amplitude trop longue, somnolence liée au médicament, allongement du temps de réaction, risque d'endormissement au volant ; le café ne remplace pas le sommeil.\nOrganisation : amplitude réduite, pause d'environ un quart d'heure toutes les deux heures de conduite, vraie coupure pour le repas, sieste courte en cas de somnolence, planning des réservations qui tient compte des temps de trajet et des pauses.\nAlcool, stupéfiants, médicaments : ils allongent le temps de réaction, réduisent le champ visuel et faussent l'appréciation des distances et des risques ; conduite après usage de stupéfiants interdite ; taux d'alcool limité par le code de la route ; pictogramme de niveau 1, 2 ou 3 sur les boîtes : de « soyez prudent » à « ne pas conduire » ; demander l'avis du médecin ou du pharmacien.\nConduite préventive : respecter les distances de sécurité (au moins deux secondes), anticiper et adapter la vitesse aux conditions, ne jamais tenir le téléphone en main en conduisant, faire attacher les passagers.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C4 : comprendre, écrire et accueillir en français et en anglais",
    consigne:
      "1. Lisez l'extrait d'article du code des transports fourni par le formateur sur la réservation préalable, puis répondez en vos mots : qui est concerné, ce qui est interdit, ce qui est permis. 2. Rédigez le message écrit envoyé à Mme Durand, cliente fictive, pour confirmer sa course du lendemain (heure, lieu de prise en charge, véhicule, contact). 3. En anglais, accueillez M. Smith, client fictif qui arrive à Orly : saluez-le, vérifiez son nom et sa destination, proposez de l'aider avec ses bagages, annoncez la durée estimée du trajet et demandez-lui s'il souhaite une température ou une musique particulière.",
    reponseAttendue:
      "Compréhension : reformulation fidèle, avec le bon vocabulaire (exploitant, conducteur, réservation préalable, voie ouverte à la circulation publique) et sans contresens.\nMessage à la cliente : formule d'appel, rappel de la date, de l'heure et du lieu exact de prise en charge, description du véhicule et de la plaque, nom du conducteur, numéro de contact, formule de politesse ; phrases courtes, sans faute d'orthographe ni abréviation familière.\nAccueil en anglais, par exemple : « Good afternoon, Mr Smith. I'm Samir, your driver. You're going to the Hôtel du Parc in Paris, is that right? Let me help you with your luggage. The journey will take about forty minutes. Would you like the air conditioning on, or any music? Please fasten your seatbelt. » Politesse, phrases simples et justes, prononciation compréhensible.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C5 : le plan de développement commercial de Samir",
    consigne:
      "Samir ne veut pas dépendre d'une seule plateforme. 1. Réalisez une courte étude de marché de son secteur (Créteil, Val-de-Marne, aéroport d'Orly, gares, hôpitaux, zones d'activités) : clientèles, besoins, concurrence. 2. Proposez trois canaux d'acquisition de clients en plus des plateformes et les actions correspondantes. 3. Rédigez le devis d'un transfert aéroport pour une entreprise cliente fictive. 4. Construisez le tableau de bord mensuel qu'il suivra. 5. Proposez deux actions de fidélisation.",
    reponseAttendue:
      "Étude de marché : clientèles identifiées (voyageurs d'affaires, entreprises des zones d'activités, hôtels, particuliers pour les transferts et les événements, patients pour des trajets non médicalisés), besoins (ponctualité, confort, réservation simple, facture), concurrence (autres VTC, taxis, plateformes, transports en commun) et positionnement choisi.\nCanaux : partenariats avec des hôtels et des entreprises, site ou fiche d'établissement avec réservation, recommandation et cartes de visite, réseaux professionnels ; actions précises et datées.\nDevis : identité et coordonnées de l'entreprise, numéro d'inscription au registre, client, date et heure, lieux de prise en charge et de destination, prestation (véhicule, nombre de passagers, bagages, temps d'attente compris), prix, conditions d'annulation, durée de validité du devis.\nTableau de bord : chiffre d'affaires par canal, nombre de courses, kilomètres en charge et à vide, prix moyen, charges, marge, avis clients.\nFidélisation : suivi des clients réguliers, réservation directe facilitée, qualité constante du service, contact après une course importante, sans dénigrer la concurrence.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C5 : réglementation spécifique VTC et relations avec les plateformes",
    consigne:
      "Samir travaille en partie avec une plateforme de réservation. 1. Avant d'accepter une course proposée par l'application, quelles informations la plateforme doit-elle lui communiquer, et peut-il refuser la course ? 2. Comment le prix d'une course VTC est-il fixé, à la différence du taxi ? 3. Quelles obligations doit respecter son véhicule : signalétique, caractéristiques, assurance ? Pour les caractéristiques techniques, indiquez le texte de référence plutôt que des chiffres. 4. Quelle autorité a été créée pour le dialogue social entre plateformes et travailleurs indépendants ?",
    reponseAttendue:
      "Informations : depuis la loi d'orientation des mobilités, la plateforme communique, lorsqu'elle propose une prestation, la distance couverte et le prix minimal garanti, déduction faite des frais de commission ; le conducteur peut refuser une proposition sans pénalité ; il est libre de se connecter ou non et de choisir ses plages horaires.\nPrix : déterminé lors de la réservation préalable ou selon un mode de calcul communiqué au client au moment de la réservation ; le taxi applique un tarif réglementé enregistré au taximètre.\nVéhicule : signalétique distinctive VTC apposée, véhicule répondant aux conditions techniques et de confort fixées par la réglementation (code des transports, partie réglementaire, et arrêtés d'application), assurance couvrant le transport de personnes à titre onéreux, contrôle technique et entretien à jour.\nAutorité : l'Autorité des relations sociales des plateformes d'emploi (ARPE), établissement public créé en 2021.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C6 : simulation d'une course dans les conditions de l'épreuve pratique",
    consigne:
      "Préparez puis présentez oralement la course suivante : Mme Lefèvre, cliente fictive, a réservé un trajet de la gare RER de Créteil-Préfecture à un rendez-vous professionnel à Vincennes ; elle a une valise et souhaite payer par carte. 1. Préparez l'itinéraire principal et un itinéraire de délestage. 2. Décrivez l'accueil et la prise en charge (vérification de la réservation, bagages, installation, ceinture). 3. Décrivez votre conduite et l'information de la cliente pendant le trajet. 4. Décrivez la fin de course : paiement, note ou facture, prise de congé. 5. Listez trois erreurs qui pénaliseraient un candidat.",
    reponseAttendue:
      "Itinéraire : trajet principal et alternative préparés à l'avance, avec l'état de la circulation, les travaux éventuels et le temps estimé ; lecture de carte ou d'application sans manipuler le téléphone en conduisant.\nAccueil : tenue correcte, salutation, présentation, vérification du nom et de la réservation, aide pour la valise, porte tenue, installation confortable, rappel de la ceinture.\nConduite : souple et économique, anticipation, respect strict du code de la route, information de la cliente sur la durée et sur un éventuel changement d'itinéraire, confort proposé (température, musique, silence), discrétion.\nFin de course : arrêt en lieu sûr, paiement par carte, remise d'une note ou facture avec les mentions utiles (identité de l'entreprise, date, lieux de départ et d'arrivée, prix), vérification qu'aucun objet n'est oublié, aide pour la valise, prise de congé courtoise.\nErreurs pénalisantes : infraction au code de la route ou conduite brusque, accueil négligé ou absence de vérification de la réservation, facturation incomplète ou erronée.",
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
  ["Quelles professions composent le transport public particulier de personnes, ou T3P ?", ["Les bus, les cars et les tramways", "Les taxis, les voitures de transport avec chauffeur et les véhicules motorisés à deux ou trois roues", "Les ambulances uniquement", "Le transport léger de marchandises"], 1],
  ["Un conducteur VTC peut-il prendre en charge un client qui lui fait signe dans la rue, sans réservation ?", ["Oui, comme un taxi", "Oui, la nuit seulement", "Non, il ne peut prendre en charge un client que sur réservation préalable", "Oui, s'il porte sa carte professionnelle"], 2],
  ["Qui délivre la carte professionnelle de conducteur VTC ?", ["La chambre de métiers et de l'artisanat", "La plateforme de réservation", "La mairie du domicile", "Le préfet"], 3],
  ["Quelle condition de permis de conduire est exigée pour exercer comme conducteur VTC ?", ["Un permis B hors période probatoire", "Un permis B, même en période probatoire", "Un permis D", "Aucun permis si le véhicule a une boîte automatique"], 0],
  ["Qui organise l'examen d'accès à la profession de conducteur VTC ?", ["France Travail", "Les chambres de métiers et de l'artisanat", "Les auto-écoles", "Les plateformes de réservation"], 1],
  ["Après une course, sans nouvelle réservation, que doit faire le conducteur VTC ?", ["Stationner sur une station de taxis", "Circuler sur la voie publique en quête de clients", "Attendre devant la gare la plus proche", "Retourner au lieu d'établissement de l'exploitant ou stationner hors de la chaussée, là où c'est autorisé"], 3],
  ["Dans quel registre l'exploitant VTC doit-il être inscrit pour exercer ?", ["Le registre des exploitants de voitures de transport avec chauffeur", "Le registre des taxis de la commune", "Le registre des associations", "Aucun registre n'est exigé"], 0],
  ["Qu'appelle-t-on la maraude électronique, interdite aux VTC ?", ["Le paiement par carte bancaire dans le véhicule", "Le fait d'informer un client, avant toute réservation, de la localisation et de la disponibilité d'un véhicule qui se trouve sur la voie publique", "L'utilisation d'un GPS", "L'envoi d'une facture par courriel"], 1],
  ["Que doit porter un véhicule VTC en service ?", ["Un dispositif lumineux « taxi » sur le toit", "Un gyrophare", "Une signalétique distinctive VTC", "Aucun signe distinctif"], 2],
  ["Vrai ou faux : la réussite à l'examen suffit, à elle seule, pour commencer à transporter des clients.", VF, 1],
];

const QCM_C2: Q[] = [
  ["Laquelle de ces charges est une charge fixe pour un conducteur VTC ?", ["Le carburant", "L'assurance du véhicule", "Les péages", "La commission prélevée sur chaque course"], 1],
  ["Pour un conducteur VTC, le carburant est une charge :", ["Fixe", "Exceptionnelle", "Variable, qui dépend des kilomètres parcourus", "Financière"], 2],
  ["Comment calcule-t-on la marge sur coûts variables ?", ["Chiffre d'affaires moins charges variables", "Chiffre d'affaires moins charges fixes", "Charges fixes plus charges variables", "Résultat plus impôts"], 0],
  ["Le seuil de rentabilité est le chiffre d'affaires pour lequel :", ["La TVA devient due", "Le compte bancaire est vide", "Les charges fixes sont nulles", "Le résultat est nul : ni bénéfice ni perte"], 3],
  ["Que comprend le prix de revient complet d'une course ?", ["Uniquement le carburant", "L'ensemble des charges fixes et variables rapportées à la course", "Uniquement la commission de la plateforme", "Le bénéfice souhaité"], 1],
  ["Quel document présente les produits et les charges d'un exercice, et donc le bénéfice ou la perte ?", ["Le compte de résultat", "Le bilan", "Le devis", "Le carnet d'entretien"], 0],
  ["Quel document décrit, à une date donnée, ce que l'entreprise possède et ce qu'elle doit ?", ["Le compte de résultat", "La note de course", "Le relevé kilométrique", "Le bilan"], 3],
  ["Qu'est-ce qu'une SASU ?", ["Une entreprise individuelle sans personnalité morale", "Une association", "Une société par actions simplifiée à associé unique", "Un groupement d'employeurs"], 2],
  ["À quoi sert l'amortissement du véhicule ?", ["À réduire la vitesse du véhicule", "À répartir le coût d'achat du véhicule sur sa durée d'utilisation", "À supprimer l'entretien", "À payer moins d'assurance"], 1],
  ["Samir a 1 500 € de charges fixes par mois et dégage 15 € de marge sur coûts variables par course. Combien de courses doit-il réaliser par mois pour atteindre son seuil de rentabilité ?", ["50", "1 500", "150", "100"], 3],
];

const QCM_C3: Q[] = [
  ["Que signifie la méthode PAS en cas d'accident ?", ["Prévenir, attendre, soigner", "Protéger, alerter, secourir", "Partir, appeler, signaler", "Prudence, attention, sécurité"], 1],
  ["Quel est le numéro d'appel d'urgence européen, utilisable dans tous les pays de l'Union ?", ["15", "17", "112", "3615"], 2],
  ["Quel numéro permet de joindre le SAMU ?", ["15", "18", "17", "114"], 0],
  ["L'usage d'un téléphone tenu en main pendant la conduite est :", ["Autorisé à l'arrêt au feu rouge", "Autorisé pour accepter une course", "Autorisé sur autoroute", "Interdit"], 3],
  ["Pendant un long trajet, il est recommandé de faire une pause :", ["Toutes les deux heures de conduite environ", "Seulement en cas de panne", "Uniquement la nuit", "Jamais avec des passagers à bord"], 0],
  ["Quel document les conducteurs remplissent-ils ensemble après un accrochage sans blessé ?", ["Le procès-verbal", "Le constat amiable", "Le certificat d'immatriculation", "Le relevé d'information"], 1],
  ["Quelle distance minimale faut-il laisser avec le véhicule qui précède ?", ["Un mètre", "La longueur d'un véhicule, quelle que soit la vitesse", "Aucune distance en ville", "La distance parcourue en au moins deux secondes"], 3],
  ["Quel est l'effet de l'alcool sur la conduite ?", ["Il améliore les réflexes", "Il n'a aucun effet en dessous de deux verres", "Il allonge le temps de réaction et réduit le champ visuel", "Il améliore la vision de nuit"], 2],
  ["Face à une victime inconsciente qui respire, après avoir protégé et alerté, que faites-vous ?", ["Vous la placez en position latérale de sécurité et surveillez sa respiration", "Vous lui donnez à boire", "Vous la relevez pour la faire marcher", "Vous la laissez seule pour aller chercher de l'aide"], 0],
  ["Vrai ou faux : un café fort permet de supprimer durablement la fatigue au volant.", VF, 1],
];

const QCM_C4: Q[] = [
  ["Dans la phrase « Le conducteur doit justifier de sa réservation », le verbe « justifier de » signifie :", ["Contester", "Apporter la preuve de", "Oublier", "Annuler"], 1],
  ["Quelle phrase est correctement écrite ?", ["Les clients se sont plaint du retard.", "Les client se sont plaints du retard.", "Les clients se sont plaints du retard.", "Les clients se sont plains du retards."], 2],
  ["Quel est le contraire de « ponctuel » ?", ["Exact", "Précis", "Régulier", "En retard"], 3],
  ["Un client vous dit : « I'd like to go to the airport, please. » Que souhaite-t-il ?", ["Aller à l'aéroport", "Aller à la gare", "Payer par carte", "Annuler sa course"], 0],
  ["Comment demander poliment au client d'attacher sa ceinture, en anglais ?", ["Please open the window.", "Please fasten your seatbelt.", "Please pay now.", "Please get out."], 1],
  ["Que signifie « How much is the fare? » ?", ["Combien de temps dure le trajet ?", "Où est la gare ?", "Quel est le prix de la course ?", "Avez-vous de la monnaie ?"], 2],
  ["Pour demander au client s'il a des bagages, vous dites :", ["Do you have any children?", "Are you hungry?", "Where do you live?", "Do you have any luggage?"], 3],
  ["Comment traduit-on « traffic jam » ?", ["Feu rouge", "Embouteillage", "Rond-point", "Péage"], 1],
  ["Quel message écrit est le plus adapté pour prévenir une cliente de votre arrivée ?", ["Bonjour Madame, votre chauffeur vous attend devant l'entrée principale de la gare.", "Salut, je suis là.", "T où ?", "Dépêchez-vous, je vais partir."], 0],
  ["Que désigne « the receipt » ?", ["La recette de cuisine", "Le rétroviseur", "La réservation", "Le reçu, ou note de la course"], 3],
];

const QCM_C5: Q[] = [
  ["Comment le prix d'une course VTC est-il fixé ?", ["Par un tarif préfectoral, comme celui du taxi", "Lors de la réservation préalable, ou selon un mode de calcul communiqué au client à la réservation", "Au compteur pendant le trajet", "Librement, à l'arrivée"], 1],
  ["Depuis la loi d'orientation des mobilités, avant que le conducteur accepte une course proposée par une plateforme, celle-ci doit lui communiquer :", ["Le nom et l'âge du client", "Le chiffre d'affaires de la plateforme", "La distance de la course et le prix minimal garanti", "Rien de particulier"], 2],
  ["Un conducteur indépendant peut-il refuser une course proposée par une plateforme ?", ["Oui, sans pénalité", "Non, jamais", "Seulement le dimanche", "Seulement en payant une pénalité"], 0],
  ["Quelle autorité, créée en 2021, organise le dialogue social entre plateformes et travailleurs indépendants ?", ["La CNIL", "L'URSSAF", "La chambre de commerce et d'industrie", "L'Autorité des relations sociales des plateformes d'emploi, ou ARPE"], 3],
  ["Lors d'un contrôle, comment le conducteur VTC prouve-t-il qu'il agit sur réservation préalable ?", ["Par une simple déclaration orale", "Par un justificatif de réservation, sur papier ou sur support électronique", "Par le reçu de la course précédente", "Il n'a rien à prouver"], 1],
  ["Qu'appelle-t-on la maraude ?", ["Stationner ou circuler sur la voie publique en quête de clients, ce qui est réservé aux taxis", "Une réservation par téléphone", "Un transfert vers l'aéroport", "Un abonnement d'entreprise"], 0],
  ["Quel outil permet de suivre le chiffre d'affaires par canal : plateformes, clientèle directe, entreprises ?", ["Le carnet d'entretien", "Le certificat d'immatriculation", "Un tableau de bord commercial", "Le GPS"], 2],
  ["Qui peut stationner sur une station de taxis en attente de clients ?", ["Tous les véhicules", "Les VTC qui portent leur signalétique", "Les VTC, le soir seulement", "Uniquement les taxis"], 3],
  ["Quelle action relève de la fidélisation d'un client d'entreprise ?", ["Changer de numéro de téléphone chaque mois", "Proposer un suivi régulier et une réservation directe simple pour ses trajets récurrents", "Refuser ses courses courtes", "Augmenter ses prix sans prévenir"], 1],
  ["Quelles mentions un devis de transfert doit-il comporter au minimum ?", ["Identité de l'entreprise, client, date, lieux de prise en charge et de destination, prestation et prix", "Seulement le prix", "Seulement le nom du conducteur", "Les horaires d'ouverture de l'aéroport"], 0],
];

const QCM_C6: Q[] = [
  ["À l'arrivée du client, quelle attitude est attendue ?", ["Rester au volant et attendre qu'il monte", "Le saluer, vérifier son nom et sa réservation, l'aider avec ses bagages", "Lui demander de payer d'avance", "Allumer la radio"], 1],
  ["Avant le départ, que fait le conducteur ?", ["Il vérifie la destination avec le client et annonce l'itinéraire et la durée estimée", "Il démarre sans parler", "Il demande un pourboire", "Il verrouille les portes sans prévenir"], 0],
  ["Qu'est-ce qu'une conduite souple ?", ["Freiner au dernier moment", "Changer souvent de file", "Anticiper, accélérer et freiner progressivement", "Rouler en permanence à la vitesse maximale autorisée"], 2],
  ["La cliente demande un autre itinéraire que celui du GPS. Que faites-vous ?", ["Vous refusez", "Vous ignorez sa demande", "Vous arrêtez la course", "Vous l'informez des conséquences éventuelles sur la durée, puis respectez son choix si la sécurité le permet"], 3],
  ["En fin de course, que mentionne notamment la note remise au client ?", ["La vitesse moyenne du trajet", "Le numéro de téléphone personnel du client", "L'identité de l'entreprise, la date, les lieux de départ et d'arrivée et le prix", "La marque du carburant"], 2],
  ["Un client pressé s'inquiète d'arriver en retard. Quelle est la meilleure réaction ?", ["Rester calme, l'informer de l'horaire estimé et respecter le code de la route", "Rouler plus vite", "Lui demander de se calmer", "Prendre un itinéraire plus long mais plus rapide sans le prévenir"], 0],
  ["Pendant le trajet, la température et la musique :", ["Sont choisies par le conducteur", "Doivent toujours être éteintes", "Sont imposées par la plateforme", "Sont proposées au client, qui exprime ses préférences"], 3],
  ["Comment le conducteur prépare-t-il son itinéraire ?", ["Il suit toujours le même trajet", "Il consulte l'état de la circulation et les travaux avant le départ et prévoit une solution de délestage", "Il demande au client de le guider", "Il n'utilise jamais d'application de navigation"], 1],
  ["Le client a oublié un objet dans le véhicule. Que faites-vous ?", ["Vous le gardez", "Vous le jetez", "Vous contactez le client ou remettez l'objet selon la procédure prévue", "Vous attendez qu'il vous rappelle dans un mois"], 2],
  ["Vrai ou faux : la prise de congé fait partie de la prestation évaluée à l'épreuve pratique.", VF, 0],
];

export const VTC48_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Réglementation du transport public particulier de personnes", QCM_C1),
  qcmExercice("QCM C2 — Gestion d'entreprise", QCM_C2),
  qcmExercice("QCM C3 — Sécurité routière et premiers secours", QCM_C3),
  qcmExercice("QCM C4 — Français et anglais", QCM_C4),
  qcmExercice("QCM C5 — Développement commercial et réglementation spécifique VTC", QCM_C5),
  qcmExercice("QCM C6 — Préparation à l'épreuve pratique d'admission", QCM_C6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (C1 à C6), alignées sur les 10 questions de
 * positionnement et sur les copies de `vtc48hHumanized.ts` ; les 6 QCM ensuite.
 */
export const VTC48_EXERCICES_COMPLETS: AIContentExercise[] = [...VTC48_EXERCICES, ...VTC48_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Préparation à l'examen d'accès à la profession de conducteur VTC (RS5637) – 48 h » (6 chapitres, un par compétence C1 à C6)</strong> : cours détaillé, tableaux, exemples tirés du fil rouge de Samir (personnage fictif), encadrés « À retenir », quiz corrigés et cas pratiques corrigés.</li>
  <li><strong>Espace e-learning</strong> : support de cours, fiches à retenir, QCM d'entraînement par épreuve, examens blancs corrigés, vidéos, accessibles pendant toute la formation et jusqu'à la date d'examen choisie par le stagiaire.</li>
  <li><strong>Modèles de documents</strong> : devis de transfert, note de course ou facture, tableau de calcul du prix de revient et du seuil de rentabilité, tableau de bord commercial, fiche de préparation d'itinéraire, check-list d'accueil du client.</li>
  <li><strong>Fiches de travail des mises en situation</strong> : conditions d'accès et démarches, comparatif des statuts juridiques, conduite à tenir en cas d'accident, phrases d'accueil en anglais, grille d'auto-évaluation de la course simulée.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Classe virtuelle</strong> : Google Meet ou Zoom, avec partage d'écran, salles de sous-groupes, sondages et conversation écrite ; test de connexion proposé avant le premier jour de formation.</li>
  <li><strong>Tableau blanc collaboratif</strong> pour les calculs de gestion, les plans commerciaux et la préparation des itinéraires.</li>
  <li><strong>Espace e-learning</strong> de la formation (support, fiches, QCM d'entraînement, examens blancs, vidéos).</li>
  <li><strong>Matériel du stagiaire</strong> : ordinateur ou tablette avec caméra, micro et connexion internet ; calculatrice ; application de cartographie pour la préparation des itinéraires.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>Légifrance</strong> : <a href="https://www.legifrance.gouv.fr/">https://www.legifrance.gouv.fr/</a> — code des transports (articles L. 3120-1 et suivants, L. 3120-2-1, L. 3122-1 et suivants, R. 3120-6 et suivants), arrêté du 6 avril 2017 relatif aux programmes et à l'évaluation des épreuves des examens d'accès aux professions de conducteur de taxi et de VTC, code de la route.</li>
  <li><strong>Ministère chargé des transports</strong> : <a href="https://www.ecologie.gouv.fr/">https://www.ecologie.gouv.fr/</a> — transport public particulier de personnes, conditions d'accès à la profession de conducteur VTC, registre des exploitants VTC.</li>
  <li><strong>Chambres de métiers et de l'artisanat — examens taxi, VTC, VMDTR</strong> : <a href="https://www.artisanat.fr/nous-connaitre/vous-accompagner/examens-taxi-vtc-vmdtr">https://www.artisanat.fr/nous-connaitre/vous-accompagner/examens-taxi-vtc-vmdtr</a> — calendrier des sessions, inscription individuelle, déroulement et modalités des épreuves.</li>
  <li><strong>France Compétences — fiche RS5637</strong> : <a href="https://www.francecompetences.fr/recherche/rs/5637/">https://www.francecompetences.fr/recherche/rs/5637/</a> — compétences attestées, modalités d'évaluation, certificateur, date de fin d'enregistrement.</li>
  <li><strong>Service-public.fr</strong> : <a href="https://www.service-public.fr/">https://www.service-public.fr/</a> — création d'entreprise, statuts juridiques, obligations comptables et fiscales.</li>
  <li><strong>Sécurité routière</strong> : <a href="https://www.securite-routiere.gouv.fr/">https://www.securite-routiere.gouv.fr/</a> — règles de conduite, alcool, stupéfiants, médicaments, fatigue.</li>
</ul>`;

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
/** Recherches YouTube ciblées uniquement : aucune vidéo précise imposée, aucun identifiant inventé. */
export const VTC48_VIDEOS = [
  { title: "L'examen VTC : épreuves d'admissibilité et épreuve pratique", description: "Présentation de l'examen organisé par les chambres de métiers et de l'artisanat.", url: yt("examen VTC CMA épreuves admissibilité admission") },
  { title: "La réglementation du T3P : taxi, VTC et deux-roues motorisés", description: "Professions du transport public particulier de personnes, réservation préalable, maraude.", url: yt("réglementation T3P taxi VTC réservation préalable") },
  { title: "Carte professionnelle VTC et registre des exploitants", description: "Démarches après la réussite à l'examen.", url: yt("carte professionnelle VTC registre exploitants démarches") },
  { title: "Calculer son prix de revient et son seuil de rentabilité", description: "Charges fixes, charges variables, marge sur coûts variables.", url: yt("seuil de rentabilité marge sur coûts variables explication") },
  { title: "Choisir son statut juridique : micro-entreprise, EURL ou SASU", description: "Comparaison des statuts pour une activité indépendante.", url: yt("micro-entreprise EURL SASU comparaison statut") },
  { title: "Protéger, alerter, secourir : la conduite à tenir en cas d'accident", description: "Gestes de premiers secours et message d'alerte.", url: yt("protéger alerter secourir accident de la route gestes premiers secours") },
  { title: "Anglais pour chauffeurs : accueillir un client", description: "Phrases utiles pour l'accueil, le trajet et le paiement.", url: yt("English for drivers welcome passenger taxi VTC phrases") },
  { title: "L'épreuve pratique VTC : accueil, itinéraire et facturation", description: "Méthode de préparation de la mise en situation de conduite.", url: yt("épreuve pratique examen VTC accueil client facturation") },
];

export const VTC48_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: VTC48_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: VTC48_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement de début (10 questions, corrigé expliqué) et QCM de fin (10 questions)
// ---------------------------------------------------------------------------
export const VTC48_POSITIONNEMENT_TITRE = "Positionnement — vos repères de départ avant l'examen VTC";
export const VTC48_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Quelle est la principale différence entre un taxi et un VTC ?", options: ["Le VTC peut être hélé dans la rue", "Le VTC ne prend en charge un client que sur réservation préalable", "Le taxi n'a pas besoin de carte professionnelle", "Il n'y a aucune différence"], correctIndex: 1 },
  { question: "Qui organise l'examen d'accès à la profession de conducteur VTC ?", options: ["La préfecture", "Les auto-écoles", "Les chambres de métiers et de l'artisanat", "Les plateformes"], correctIndex: 2 },
  { question: "Quel permis faut-il détenir pour exercer comme conducteur VTC ?", options: ["Un permis B hors période probatoire", "Un permis B probatoire", "Un permis C", "Un permis moto"], correctIndex: 0 },
  { question: "Qu'appelle-t-on une charge fixe ?", options: ["Une charge qui augmente avec chaque course", "Une amende", "Le prix d'une course", "Une charge qui ne dépend pas du nombre de courses réalisées"], correctIndex: 3 },
  { question: "Que représente le seuil de rentabilité ?", options: ["Le chiffre d'affaires à partir duquel l'activité ne fait plus de perte", "Le prix maximal d'une course", "Le montant de l'assurance", "Le nombre de kilomètres par jour"], correctIndex: 0 },
  { question: "Quel numéro d'urgence européen peut-on composer dans toute l'Union européenne ?", options: ["15", "18", "112", "17"], correctIndex: 2 },
  { question: "Comment dit-on « bagages » en anglais ?", options: ["Luggage", "Ticket", "Fare", "Receipt"], correctIndex: 0 },
  { question: "Comment le prix d'une course VTC est-il fixé ?", options: ["Au taximètre", "Par la préfecture", "À l'arrivée, selon l'humeur du conducteur", "À la réservation, ou selon un mode de calcul annoncé à la réservation"], correctIndex: 3 },
  { question: "Peut-on tenir son téléphone en main en conduisant pour accepter une course ?", options: ["Oui, si c'est rapide", "Non, c'est interdit", "Oui, à un feu rouge", "Oui, sur autoroute"], correctIndex: 1 },
  { question: "Que remet-on au client à la fin de la course ?", options: ["Une carte de fidélité obligatoire", "Rien", "Une note ou facture avec les mentions utiles", "Le numéro de la plateforme"], correctIndex: 2 },
];

/** Explications du corrigé du positionnement, dans l'ordre des questions. */
export const VTC48_QCM_DEBUT_EXPLICATIONS: string[] = [
  "Le VTC travaille uniquement sur réservation préalable ; la maraude, c'est-à-dire stationner ou circuler sur la voie publique en quête de clients, est réservée aux taxis (module 1).",
  "L'examen est organisé par les chambres de métiers et de l'artisanat ; le candidat s'y inscrit lui-même. La carte professionnelle est ensuite délivrée par le préfet (module 1).",
  "Le permis B doit être détenu hors période probatoire ; s'y ajoutent les conditions d'honorabilité, l'examen, puis l'aptitude médicale et la formation aux premiers secours pour la carte (module 1).",
  "Une charge fixe, comme l'assurance ou la location du véhicule, ne dépend pas du nombre de courses ; le carburant ou la commission sont des charges variables (module 2).",
  "Au seuil de rentabilité, la marge sur coûts variables couvre exactement les charges fixes : le résultat est nul (module 2).",
  "Le 112 est le numéro d'urgence européen ; en France, le 15 joint le SAMU, le 17 la police ou la gendarmerie, le 18 les pompiers (module 3).",
  "« Luggage » désigne les bagages ; « fare » le prix de la course, « receipt » le reçu (module 4).",
  "Le prix d'une course VTC est déterminé lors de la réservation préalable, ou selon un mode de calcul communiqué à la réservation ; le taximètre est l'outil du taxi (module 5).",
  "Tenir un téléphone en main en conduisant est interdit, même pour accepter une course : on s'arrête en lieu sûr (module 3).",
  "La note ou facture remise au client mentionne notamment l'identité de l'entreprise, la date, les lieux de départ et d'arrivée et le prix ; elle fait partie de l'épreuve pratique (module 6).",
];

export const VTC48_QCM_FIN: AIQCMQuestion[] = [
  { question: "Quelles professions composent le transport public particulier de personnes ?", options: ["Les taxis, les VTC et les véhicules motorisés à deux ou trois roues", "Les bus et les cars", "Les ambulances", "Les déménageurs"], correctIndex: 0 },
  { question: "Sans nouvelle réservation après une course, où le conducteur VTC peut-il attendre ?", options: ["Sur une station de taxis", "En circulant devant les gares", "Au lieu d'établissement de l'exploitant ou dans un lieu hors de la chaussée où le stationnement est autorisé", "Devant un hôtel, en double file"], correctIndex: 2 },
  { question: "Avec 1 050 € de charges fixes mensuelles et 21 € de marge sur coûts variables par course, quel est le seuil de rentabilité ?", options: ["21 courses", "50 courses", "105 courses", "1 050 courses"], correctIndex: 1 },
  { question: "Quel document présente le bénéfice ou la perte de l'exercice ?", options: ["Le bilan", "Le devis", "Le certificat d'immatriculation", "Le compte de résultat"], correctIndex: 3 },
  { question: "Face à une victime inconsciente qui respire, que fait-on après avoir protégé et alerté ?", options: ["On la met en position latérale de sécurité et on surveille sa respiration", "On lui donne à boire", "On la fait marcher", "On la laisse seule"], correctIndex: 0 },
  { question: "Que signifie « Please fasten your seatbelt » ?", options: ["Veuillez ouvrir la fenêtre", "Veuillez payer maintenant", "Veuillez attacher votre ceinture", "Veuillez descendre"], correctIndex: 2 },
  { question: "Depuis la loi d'orientation des mobilités, que doit communiquer la plateforme au conducteur avant qu'il accepte une course ?", options: ["L'identité complète du client", "La distance de la course et le prix minimal garanti", "Les avis des autres conducteurs", "Rien"], correctIndex: 1 },
  { question: "Comment le conducteur VTC justifie-t-il, lors d'un contrôle, qu'il agit sur réservation ?", options: ["Il n'a rien à justifier", "Par la parole du client", "Par sa carte grise", "Par un justificatif de réservation, papier ou électronique"], correctIndex: 3 },
  { question: "Qu'est-ce qu'une conduite souple, attendue à l'épreuve pratique ?", options: ["Anticiper, accélérer et freiner progressivement", "Rouler toujours vite", "Freiner tard", "Changer souvent de file"], correctIndex: 0 },
  { question: "Qui délivre la carte professionnelle après la réussite à l'examen ?", options: ["La CMA", "Le préfet", "La plateforme", "L'auto-école"], correctIndex: 1 },
];

export const VTC48_EVAL_PACK: AIEvalPack = {
  qcmDebut: VTC48_QCM_DEBUT,
  qcmFin: VTC48_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du jour 5) — une semaine difficile pour Samir, futur chauffeur VTC fictif",
    contexte:
      "Samir vient de démarrer son activité à Créteil. Lundi, devant la gare de Lyon, il accepte un voyageur qui l'a hélé sur le trottoir. Mardi, il fixe le prix d'une course pour une entreprise sans connaître son prix de revient : 1 050 € de charges fixes par mois, 9 € de charges variables par course, et une plateforme qui lui propose des courses à 14 €. Mercredi, après onze heures de conduite et un traitement qui provoque de la somnolence, il est témoin d'un accident sur l'A86 ; un conducteur est inconscient mais respire. Jeudi, un client anglophone lui demande « How much is the fare to Orly? ».",
    questions: [
      { question: "Quelle erreur réglementaire Samir a-t-il commise lundi et quelles en sont les conséquences possibles ?", reponseAttendue: "Il a pris en charge un client sans réservation préalable, ce qui revient à pratiquer la maraude réservée aux taxis ; il s'expose à des sanctions pénales et administratives pouvant toucher sa carte professionnelle. Il aurait dû refuser poliment et orienter le voyageur vers une réservation ou vers la station de taxis.", points: 5 },
      { question: "Calculez sa marge sur coûts variables pour une course à 30 €, son seuil de rentabilité, et dites s'il peut accepter habituellement des courses à 14 €.", reponseAttendue: "Marge sur coûts variables : 30 − 9 = 21 € ; seuil de rentabilité : 1 050 / 21 = 50 courses par mois. Une course à 14 € couvre les charges variables et dégage 5 € de marge, mais reste sous le prix de revient complet (17,75 € pour 120 courses par mois) : acceptable ponctuellement, pas comme prix habituel.", points: 5 },
      { question: "Quelles fautes de sécurité relevez-vous mercredi et comment doit-il intervenir sur l'accident ?", reponseAttendue: "Amplitude de conduite excessive sans pauses suffisantes et conduite sous l'effet d'un médicament qui provoque de la somnolence : il aurait dû demander l'avis du médecin ou du pharmacien et ne pas conduire. Intervention : protéger (feux de détresse, arrêt en sécurité, gilet, passagers à l'abri), alerter (112, 15 ou 18, message précis), secourir (position latérale de sécurité, surveillance de la respiration, ne pas déplacer la victime sauf danger immédiat).", points: 5 },
      { question: "Que demande le client jeudi, et comment Samir lui répond-il en anglais en respectant les règles du VTC ?", reponseAttendue: "Il demande le prix de la course jusqu'à Orly. Réponse type : « The price is fixed when you book. I can give you a quote now: it will be … euros. » Le prix est annoncé avant la course, au moment de la réservation, avec une formule polie et des phrases simples.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — examen blanc des épreuves écrites et simulation de l'épreuve pratique d'admission (jour 7), grille d'acquisition des compétences C1 à C6",
    exercices: [
      {
        titre: "Partie 1 — Examen blanc des épreuves écrites (C1 à C5)",
        consigne: "Dans l'espace e-learning, en conditions d'examen et dans le temps fixé par le formateur, répondez à l'examen blanc couvrant la réglementation T3P, la gestion, la sécurité routière, le français, l'anglais, le développement commercial et la réglementation spécifique VTC. Correction commentée en classe virtuelle, épreuve par épreuve. Les modalités officielles (durées, coefficients, notes éliminatoires) sont celles de l'arrêté du 6 avril 2017, rappelées par la CMA lors de l'inscription.",
        reponseAttendue: "Réponses justes sur les notions clés : professions du T3P, réservation préalable, carte professionnelle et registre ; charges fixes et variables, marge sur coûts variables, seuil de rentabilité, documents comptables ; règles du code de la route, alcool, fatigue, conduite à tenir en cas d'accident ; compréhension d'un texte et vocabulaire ; anglais d'accueil ; plan commercial, relations avec les plateformes, obligations propres au VTC. Le stagiaire identifie les épreuves à retravailler avant l'examen.",
        points: 20,
      },
      {
        titre: "Partie 2 — Questions de réglementation et de gestion (C1, C2, C5)",
        consigne: "Expliquez à un futur client d'entreprise ce qui distingue un VTC d'un taxi, puis présentez le prix de revient d'une course de votre projet et le prix que vous lui proposez, en justifiant.",
        reponseAttendue: "Distinction exacte (réservation préalable, prix fixé à la réservation, absence de maraude, retour au lieu d'établissement) ; calcul juste du prix de revient à partir de charges classées ; prix proposé supérieur au prix de revient et cohérent avec le marché ; devis aux mentions complètes.",
        points: 20,
      },
      {
        titre: "Partie 3 — Sécurité et premiers secours (C3)",
        consigne: "À partir d'un scénario d'accident donné par le formateur, décrivez dans l'ordre votre intervention et rédigez le message d'alerte.",
        reponseAttendue: "Ordre protéger, alerter, secourir respecté ; numéros d'urgence justes ; message d'alerte complet (lieu, nature, nombre et état des victimes, dangers) ; gestes adaptés à l'état de la victime ; prise en charge des passagers.",
        points: 20,
      },
      {
        titre: "Partie 4 — Communication en français et en anglais (C4)",
        consigne: "Rédigez un message de confirmation de course à un client, puis jouez en anglais l'accueil d'un client à l'aéroport et l'annonce du prix et de la durée du trajet.",
        reponseAttendue: "Message clair, poli et sans faute avec toutes les informations utiles ; échange en anglais compréhensible et poli : salutation, vérification du nom et de la destination, bagages, durée, prix, ceinture, prise de congé.",
        points: 20,
      },
      {
        titre: "Partie 5 — Simulation commentée de l'épreuve pratique d'admission (C6)",
        consigne: "Présentez la préparation puis le déroulé complet d'une course réservée tirée au sort : itinéraire principal et de délestage, accueil et prise en charge, information du client pendant le trajet, facturation et prise de congé. La conduite réelle en véhicule n'est pas réalisée pendant la formation.",
        reponseAttendue: "Itinéraire préparé avec une alternative ; accueil complet et courtois ; conduite décrite souple et conforme au code de la route ; information du client ; note ou facture aux mentions complètes ; vérification des objets oubliés et prise de congé ; auto-évaluation lucide des points à travailler avant l'épreuve.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const VTC48_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.francecompetences.fr/recherche/rs/5637/",
      titreLien: "France Compétences — fiche RS5637 « Habilitation pour l'accès à la profession de conducteur de voiture de transport avec chauffeur (VTC) »",
      titre: "Fin d'enregistrement de la fiche RS5637 au 31/12/2026",
      date: "Novembre 2026",
      commentaire: "La fiche RS5637, enregistrée de droit (certificateur : ministère chargé des transports), indique une fin d'enregistrement au 31/12/2026. Avant d'ouvrir des sessions dont l'examen aurait lieu en 2027, l'organisme doit vérifier le renouvellement de l'enregistrement ou la fiche qui lui succède, et mettre à jour le code de la certification dans ses programmes et ses supports.",
      exploitation: "Preuve : capture datée de la fiche classée au dossier qualité. Action : contrôle de la fiche au début de chaque mois jusqu'à la publication de la nouvelle fiche ; information des stagiaires sur la certification visée à la date de leur examen.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — arrêté du 6 avril 2017 relatif aux programmes et à l'évaluation des épreuves des examens d'accès aux professions de conducteur de taxi et de VTC",
      titre: "Programmes et évaluation des épreuves de l'examen VTC",
      date: "Novembre 2026",
      commentaire: "L'arrêté du 6 avril 2017 fixe le programme et les modalités d'évaluation des épreuves d'admissibilité et de l'épreuve pratique d'admission. Les durées, coefficients et notes éliminatoires sont repris tels qu'ils figurent dans la version en vigueur, jamais de mémoire.",
      exploitation: "Preuve : version consolidée consultée et datée. Action : vérification à chaque session de la concordance du programme et des examens blancs avec la version en vigueur de l'arrêté.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — code des transports, articles L. 3120-1 et suivants, L. 3122-1 et suivants, R. 3120-6 et suivants",
      titre: "Conditions d'accès à la profession et règles d'exercice du VTC",
      date: "Octobre 2026",
      commentaire: "Le code des transports encadre les professions du T3P, la réservation préalable, l'interdiction de la maraude, le retour au lieu d'établissement, la carte professionnelle, le registre des exploitants et les sanctions. Toute modification est reportée dans les chapitres 1 et 5 du support.",
      exploitation: "Preuve : chapitres 1 et 5 mis à jour avec la date de consultation. Action : relecture des articles cités avant chaque session.",
    },
    {
      lien: "https://www.ecologie.gouv.fr/",
      titreLien: "Ministère chargé des transports — transport public particulier de personnes",
      titre: "Carte professionnelle, registre des exploitants VTC et démarches",
      date: "Septembre 2026",
      commentaire: "Les pages du ministère chargé des transports présentent les conditions d'accès à la profession, la carte professionnelle, le registre des exploitants VTC et la formation continue. Elles servent de référence pour la mise en situation sur les démarches après l'examen.",
      exploitation: "Preuve : fiche mémo datée dans les ressources. Action : mise à jour de la mise en situation 1 et du chapitre 1 en cas de changement de procédure.",
    },
  ],
  metier: [
    {
      lien: "https://www.artisanat.fr/nous-connaitre/vous-accompagner/examens-taxi-vtc-vmdtr",
      titreLien: "Chambres de métiers et de l'artisanat — examens taxi, VTC, VMDTR",
      titre: "Calendrier des sessions et inscription individuelle à l'examen",
      date: "Novembre 2026",
      commentaire: "Les CMA publient le calendrier des sessions, les modalités d'inscription et les informations pratiques de l'examen. Le stagiaire s'inscrit lui-même ; l'organisme l'accompagne pour constituer son dossier et choisir une session compatible avec la fin de sa formation.",
      exploitation: "Preuve : calendrier en vigueur remis aux stagiaires le jour 1. Action : rappel des dates limites d'inscription le jour 4 et le jour 7.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — loi d'orientation des mobilités du 24 décembre 2019 et ordonnances de 2021 sur les plateformes",
      titre: "Droits des conducteurs indépendants qui travaillent avec des plateformes",
      date: "Octobre 2026",
      commentaire: "La plateforme communique au conducteur, avant qu'il accepte une course, la distance et le prix minimal garanti ; le conducteur peut refuser sans pénalité. L'Autorité des relations sociales des plateformes d'emploi organise le dialogue social du secteur.",
      exploitation: "Preuve : mise en situation 9 et QCM C5. Action : suivi des accords conclus dans le secteur et mise à jour du chapitre 5.",
    },
    {
      lien: "https://www.service-public.fr/",
      titreLien: "Service-public.fr — créer et gérer une entreprise",
      titre: "Statuts juridiques, seuils et taux applicables aux indépendants",
      date: "Septembre 2026",
      commentaire: "Les seuils du régime de la micro-entreprise, les taux de cotisations et les règles de TVA évoluent : le support renvoie aux sites officiels plutôt que de figer des montants, et les calculs des stagiaires utilisent les valeurs en vigueur à la date de la formation.",
      exploitation: "Preuve : chapitre 2 sans montant figé, liens officiels cités. Action : vérification des valeurs en vigueur avant chaque session et correction des exemples si besoin.",
    },
  ],
  technologique: [
    {
      lien: "https://www.economie.gouv.fr/",
      titreLien: "Ministère de l'Économie — facturation électronique entre entreprises",
      titre: "Généralisation progressive de la facturation électronique",
      date: "Octobre 2026",
      commentaire: "La facturation électronique entre entreprises se déploie progressivement : les conducteurs VTC qui travaillent pour des clients professionnels doivent anticiper le choix d'un outil de facturation adapté et suivre le calendrier officiel applicable à leur entreprise.",
      exploitation: "Preuve : paragraphe ajouté au chapitre 2. Action : présentation des modèles de note et de facture et des points de vigilance pour la clientèle d'entreprise.",
    },
    {
      lien: "https://www.securite-routiere.gouv.fr/",
      titreLien: "Sécurité routière — téléphone et distractions au volant",
      titre: "Applications de réservation et de navigation : usage sans danger",
      date: "Septembre 2026",
      commentaire: "L'usage du téléphone tenu en main en conduisant est interdit ; les applications de réservation et de navigation doivent être réglées avant le départ et consultées à l'arrêt, sur un support fixe. Point repris dans la préparation de l'épreuve pratique.",
      exploitation: "Preuve : règle intégrée à la check-list d'itinéraire. Action : rappel lors de la simulation de course du jour 7.",
    },
    {
      lien: "https://www.cnil.fr/fr/reglement-europeen-protection-donnees",
      titreLien: "CNIL — RGPD",
      titre: "Données personnelles des clients et des stagiaires",
      date: "Août 2026",
      commentaire: "Fichier clients, historiques de courses, géolocalisation : le conducteur VTC traite des données personnelles et doit en limiter la collecte et la conservation. En formation, les résultats des QCM et les documents transmis par les stagiaires sont aussi des données personnelles.",
      exploitation: "Preuve : mention d'information ajoutée à la convocation et paragraphe du chapitre 5. Action : pas d'enregistrement de la classe virtuelle sans accord des stagiaires ; résultats individuels communiqués au seul stagiaire et au formateur.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedVTC48AICaches(f: FormationInfo = FORMATION_VTC48): void {
  try {
    setCachedContentPack(f, VTC48_CONTENT_PACK);
    setCachedEvalPack(f, VTC48_EVAL_PACK);
    setCachedVeillePack(f, VTC48_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
