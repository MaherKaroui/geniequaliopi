/**
 * Preset complet « Cohésion d'équipe en entreprise – 21 h » — formation professionnelle NON certifiante
 * (aucun titre ni répertoire visé, non éligible au compte personnel de formation).
 * Données reprises du contenu de la formation (même contenu que la formation IZILearn) :
 * 21 heures sur 3 jours (7 h par jour, 9h00 – 12h30 / 13h30 – 17h00), présentiel intra-entreprise,
 * 4 à 12 participants (salariés, managers et dirigeants d'une même équipe ou de services qui travaillent
 * ensemble), aucun prérequis, espace e-learning complémentaire (capsules vidéo sous-titrées, fiches, QCM).
 * Tarif non renseigné (aucune source) : à saisir dans le dossier.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - 6 modules de 3 h 30 (C1 à C6 = modules 1 à 6) ; fil rouge Maison Lumen, entreprise FICTIVE
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées (les ateliers de la formation)
 *    et 6 QCM de 6 questions, un par module (questions du contenu source)
 *  - Pack évaluation : QCM de positionnement début / fin (questions de l'évaluation finale des acquis),
 *    cas pratique intermédiaire, évaluation finale interne
 *  - Pack veille (réglementaire / métier / technologique)
 * Évaluation interne uniquement : attestation de fin de formation et certificat de réalisation.
 * Le support de cours (6 chapitres) est dans `cohesionEquipe21h/` ; les réponses propres à chaque
 * stagiaire dans `cohesionEquipe21hHumanized.ts`. Aucune donnée de satisfaction n'est pré-remplie.
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
export const FORMATION_COH21: FormationInfo = {
  intitule: "Cohésion d'équipe en entreprise – 21 h",
  codeRNCP: "",
  objectifs:
    "Formation professionnelle non certifiante. Objectif général : renforcer la cohésion d'une équipe de travail en donnant à ses membres des repères communs et des outils concrets pour se connaître, communiquer, coopérer, traverser les désaccords et faire vivre des règles partagées.\nÀ l'issue de la formation, le participant sera capable de :\n- C1 — Expliquer ce qui distingue une équipe d'un groupe et repérer le stade de développement de son équipe.\n- C2 — Identifier ses préférences de fonctionnement et celles de ses collègues pour mieux coopérer.\n- C3 — Pratiquer l'écoute active, la reformulation et un feedback constructif, y compris à distance.\n- C4 — Clarifier les rôles et choisir un mode de décision adapté pour coopérer efficacement.\n- C5 — Traiter un désaccord ou une tension avant qu'il ne devienne un conflit.\n- C6 — Construire la charte d'équipe et un plan d'action collectif et individuel à 30, 60 et 90 jours.",
  prerequis: "Aucun prérequis.",
  duree: "21 heures réparties sur 3 jours (7 h par jour : 9h00 – 12h30 et 13h30 – 17h00)",
  dureeSaisiePrioritaire: true,
  modalites: "présentiel",
  tarif: "",
  programme:
    "JOUR 1 — SE CONNAÎTRE POUR MIEUX TRAVAILLER ENSEMBLE (7 h)\nModule 1 — Ce qui fait une équipe (C1, 3 h 30) : positionnement « Où en est notre équipe ? » ; atelier d'ouverture (se présenter, partager ses attentes, poser les règles du groupe) ; groupe ou équipe, ingrédients de la cohésion ; les étapes de vie d'une équipe selon Tuckman ; la sécurité psychologique (Edmondson) et le rôle de chacun et du manager dans la cohésion ; atelier « Où en est notre équipe ? Diagnostic partagé » ; QCM.\nModule 2 — Se connaître soi et les autres (C2, 3 h 30) : préférences de fonctionnement avec l'outil maison des cinq curseurs, forces et complémentarités ; diversité des profils et des générations ; biais de perception et premières impressions ; intégration des nouveaux arrivants ; ateliers « Mes curseurs de fonctionnement et nos complémentarités » et « Premières impressions et parcours d'intégration » ; QCM.\nJOUR 2 — COMMUNIQUER ET COOPÉRER (7 h)\nModule 3 — Communiquer efficacement (C3, 3 h 30) : retour sur le jour 1 ; écoute active, questionnement, faits, opinions et ressentis ; feedback structuré (SBI, DESC), communication non violente ; communication écrite et à distance ; ateliers « Le trio d'écoute » et « Jeux de rôle : le feedback chez Maison Lumen » ; QCM.\nModule 4 — Coopérer et décider ensemble (C4, 3 h 30) : confiance, engagement et rôles clairs ; matrice RACI ; modes de décision et décision par consentement ; réunions utiles ; intelligence collective, entraide et équipe hybride ; ateliers « Construire la matrice RACI de notre équipe » et défi coopératif « Lumière sur le salon » suivi d'une décision par consentement ; QCM.\nJOUR 3 — FAIRE DURER LA COHÉSION (7 h)\nModule 5 — Désaccords et tensions : les transformer (C5, 3 h 30) : retour sur le jour 2 ; désaccord utile ou conflit ; sources de tensions et signaux faibles ; les cinq modes de gestion des conflits (Thomas et Kilmann) ; conversation difficile, médiation et alerte ; ateliers « Décoder les tensions de Maison Lumen » et « Conversations difficiles et médiation en jeux de rôle » ; QCM.\nModule 6 — Charte d'équipe et plan d'action (C6, 3 h 30) : écrire une charte d'équipe qui vit ; rituels, reconnaissance, accueil et lien en hybride ; plan d'action SMART à 30, 60 et 90 jours ; atelier « Construire la charte et le plan d'action de l'équipe » ; QCM ; évaluation finale des acquis ; bilan de la formation et suites.",
  methodesEvaluation:
    "Positionnement en ouverture : questionnaire « Où en est notre équipe ? » (8 questions, sans bonne ni mauvaise réponse, résultats anonymes et agrégés) et test de positionnement (10 questions ouvertes + QCM 10 questions) ; observation des ateliers et livrables produits par le groupe (10 mises en situation corrigées) ; un QCM corrigé à la fin de chaque module (C1 à C6) ; cas pratique intermédiaire en fin de jour 2 ; évaluation finale des acquis en fin de jour 3 (QCM de 15 questions sur l'ensemble des modules) et plan d'action individuel SMART à 30, 60 et 90 jours ; test de positionnement de fin. Évaluation à chaud (questionnaire de satisfaction en fin de formation) et évaluation à froid à 90 jours (participants et manager). Formation non certifiante : attestation de fin de formation mentionnant les objectifs et le niveau d'acquisition, et certificat de réalisation.",
  moyensPedagogiques:
    "Formation en présentiel intra-entreprise, sur trois journées. Méthodes actives : capsules vidéo, apports courts (fiches à retenir), ateliers minutés en sous-groupes, trios et binômes (diagnostic partagé, outil maison des cinq curseurs, trio d'écoute, jeux de rôle de feedback, matrice RACI, défi coopératif, décision par consentement, analyse de tensions, conversations difficiles et médiation, construction de la charte d'équipe), QCM corrigés. Fil rouge : Maison Lumen, entreprise fictive. Matériel : paperboard ou tableau blanc, Post-it, gommettes, feutres, fiches de travail ; variante distanciel prévue pour chaque atelier (tableau blanc collaboratif, salles de sous-groupes). Espace e-learning complémentaire : capsules vidéo sous-titrées, fiches à retenir et QCM, accessibles avant, pendant et après les journées. Livrables remis à l'équipe : charte d'équipe version 1, plan d'action collectif, plan d'action individuel.",
  publicVise:
    "Salariés, managers et dirigeants d'une même équipe ou de services qui travaillent ensemble. Groupe de 4 à 12 participants. Formation organisée en intra-entreprise, au titre du plan de développement des compétences de l'entreprise (convention de formation avec l'entreprise).",
  delaiAcces: "Après signature de la convention de formation avec l'entreprise ; les dates des trois journées sont fixées avec l'entreprise.",
  dateDebut: "2026-11-23",
  dateFin: "2026-11-25",
  lieu: "",
  nombreParticipants: "12",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Partager un même diagnostic de l'équipe : groupe ou équipe, étape de développement, niveau de sécurité psychologique.",
  "Mieux connaître les façons de fonctionner de chacun et transformer les différences en complémentarités.",
  "Réussir l'intégration des nouveaux arrivants et limiter l'effet des premières impressions.",
  "Écouter et reformuler avant de répondre, distinguer faits, opinions et ressentis.",
  "Oser donner et recevoir un feedback, positif ou correctif, de façon structurée.",
  "Clarifier qui fait quoi sur les projets communs et qui décide.",
  "Tenir des réunions utiles et organiser le travail hybride sans exclure les personnes à distance.",
  "Traiter un désaccord ou une tension avant qu'il ne s'installe, et savoir quand alerter.",
  "Se donner des règles communes écrites et des rituels qui font vivre la cohésion.",
  "Repartir avec un plan d'action collectif et individuel suivi à 30, 60 et 90 jours.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins est conduite avec l'entreprise avant la formation (entretien avec la direction ou le manager de l'équipe, questionnaire préalable) puis avec le groupe à l'ouverture : questionnaire de positionnement « Où en est notre équipe ? », sans bonne ni mauvaise réponse, dont les résultats sont présentés de façon anonyme et agrégée, et recueil des attentes et des inquiétudes de chacun. Les participants appartiennent à une même équipe ou à des services qui travaillent ensemble ; leurs métiers, leur ancienneté et leurs modes de travail (sur site, en déplacement, en télétravail) sont souvent différents.</p>
<ul>
  <li><strong>Se connaître et partager un diagnostic (C1, C2)</strong> : l'équipe a besoin de mettre des mots communs sur son fonctionnement, ses ingrédients solides et fragiles, et sur les façons de travailler de chacun.</li>
  <li><strong>Communiquer et coopérer (C3, C4)</strong> : écoute, feedback, rôles et décisions sont les leviers attendus pour réduire les malentendus entre métiers et rendre les réunions et le travail à distance plus efficaces.</li>
  <li><strong>Faire durer la cohésion (C5, C6)</strong> : l'équipe veut savoir traiter les désaccords avant qu'ils ne se dégradent et se doter d'une charte et d'un plan d'action réellement suivis.</li>
</ul>
<p>Le cas de Maison Lumen, entreprise fictive, sert de point de départ à chaque atelier pour faciliter la prise de parole, avant la transposition à la situation réelle de l'équipe.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Situation réelle de l'équipe</strong> : les ateliers partent du cas fictif Maison Lumen puis sont transposés aux projets, réunions et règles réels de l'équipe (matrice RACI sur un projet connu de tous, décision par consentement sur un vrai sujet d'organisation, charte de l'équipe).</li>
  <li><strong>Place du manager</strong> : la personne qui encadre l'équipe participe comme les autres membres ; elle prend elle aussi des engagements et ne commente pas les positions de ses collaborateurs pendant les ateliers.</li>
  <li><strong>Parole de chacun</strong> : écrire avant de parler, tours de parole commençant par les nouveaux arrivants et les plus discrets, droit de ne pas se positionner publiquement.</li>
  <li><strong>Travail hybride</strong> : variante distanciel prévue pour chaque atelier ; règles propres aux échanges à distance travaillées dans la charte.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, supports transmis à l'avance sur demande, capsules vidéo sous-titrées, aménagement des ateliers et de l'évaluation finale sur demande.</li>
</ul>`;

/** 10 mises en situation (les ateliers de la formation, C1 à C6), corrigés formateur. */
export const COH21_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — C1 : diagnostic partagé, où en est notre équipe ?",
    consigne:
      "1. À partir du cas Maison Lumen (service Projets clients, entreprise fictive), indiquez si le service fonctionne comme un groupe ou comme une équipe, et sur quels indices. 2. Situez-le dans les étapes de Tuckman et dites ce qui l'y a ramené. 3. Relevez les signes qui montrent que la sécurité psychologique est fragile. 4. Transposez à votre équipe : à quelle étape la situez-vous, avec un fait concret ; quels ingrédients de la cohésion (but commun, rôles, règles, confiance, communication, reconnaissance) sont solides, à consolider, fragiles ? 5. Rédigez une fiche « Je peux… » : un comportement concret que vous pouvez adopter dès la semaine prochaine pour l'un des deux ingrédients prioritaires.",
    reponseAttendue:
      "Distinction groupe / équipe argumentée par des indices observables (but commun et responsabilité partagée du résultat, ou objectifs juxtaposés et reproches entre bureau d'études et pose).\nÉtape de Tuckman justifiée : la tension (storming) relancée par l'organisation hybride et l'arrivée de Léo et Maëlle ; la tension est une étape normale, pas un échec.\nSignaux de sécurité psychologique fragile repérés (silence de Maëlle sur l'erreur de cotes, peur de signaler un problème).\nTransposition à son équipe appuyée sur un fait, sans jugement de personnes ; ingrédients classés vert / orange / rouge.\nFiche « Je peux… » concrète, réalisable sans attendre personne, datée.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C2 : mes curseurs de fonctionnement et nos complémentarités",
    consigne:
      "1. Positionnez-vous de 1 à 5 sur les cinq curseurs de l'outil maison (rythme : démarrer vite ou préparer avant d'agir ; niveau de détail : vue d'ensemble ou précision ; échange : réfléchir en parlant ou seul d'abord ; organisation : planifier ou s'adapter ; cadre : consignes précises ou autonomie), avec pour chacun un exemple récent de votre vie professionnelle. 2. Complétez : « Ce que j'apporte à l'équipe grâce à ce fonctionnement », « Ce qui peut gêner les autres », « Ce dont j'ai besoin des autres ». 3. Repérez avec un collègue une complémentarité utile au travail réel et une friction fréquente qui s'explique par vos préférences. 4. Formulez un besoin concret et positif pour le panneau « Ce dont j'ai besoin de vous ».",
    reponseAttendue:
      "Cinq positions illustrées chacune par un exemple concret et récent ; aucune étiquette (« je suis un lent », « c'est une rapide ») ; rappel qu'une préférence est une tendance qui varie selon les situations et ne dit rien des compétences.\nTrois lignes de synthèse honnêtes : apport, gêne possible, besoin.\nComplémentarité exploitable dans le travail réel (par exemple un binôme rapide et préparé pour les devis urgents) et friction relue à la lumière des préférences, sans reproche.\nBesoin formulé de façon concrète et positive (« recevoir l'ordre du jour la veille », « que l'on m'appelle plutôt qu'un long message écrit »).",
    points: 20,
  },
  {
    titre: "Exercice 3 — C2 : premières impressions et parcours d'intégration",
    consigne:
      "1. Pour chacune des phrases entendues chez Maison Lumen à propos de Léo et de Maëlle (par exemple « Léo part tous les jours à dix-sept heures trente, il n'est pas impliqué »), séparez le fait observable de l'interprétation, nommez le biais probable (effet de halo, effet de primauté, biais de confirmation, biais d'affinité, erreur fondamentale d'attribution) et proposez une question à poser directement à la personne. 2. Concevez le parcours d'intégration du prochain arrivant de votre équipe en quatre temps (avant l'arrivée, premier jour, premières semaines, fin de la période d'intégration) : actions, responsable, durée, ce que l'arrivant doit avoir compris. Prévoyez obligatoirement un référent, une immersion dans un autre métier de l'équipe, l'accueil compte tenu du télétravail et un rapport d'étonnement.",
    reponseAttendue:
      "Faits et interprétations correctement séparés (« part à dix-sept heures trente » est un fait, « pas impliqué » une interprétation) ; biais nommés à bon escient ; questions ouvertes et directes plutôt que des suppositions.\nParcours en quatre temps complet et réaliste (temps disponible, périodes de forte activité, télétravail), avec un responsable pour chaque action.\nRéférent désigné et rôle précisé ; immersion dans un autre métier ; accueil à distance organisé (accès aux outils testés avant l'arrivée, premier appel de bienvenue) ; rapport d'étonnement en fin de période, exploité par l'équipe.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C3 : le trio d'écoute, reformuler et repérer faits, opinions et ressentis",
    consigne:
      "En trio (narrateur, écoutant, observateur), à partir d'une fiche de situation Maison Lumen (Thomas et le plan modifié reçu à 8 h 30 pour une pose à 9 h ; Maëlle, nouvelle arrivante, qui n'ose pas poser sa question ; Élodie qui reçoit les informations du client par bribes) : 1. L'écoutant écoute pendant 6 minutes sans conseiller ni donner son avis, pose des questions ouvertes ou de précision et reformule au moins deux fois, dont un ressenti. 2. L'observateur remplit la grille. 3. Les rôles tournent. 4. Pour la situation de Thomas, identifiez le fait central, une opinion, un ressenti, et l'effet du mot « toujours ». 5. Notez une formule de reformulation que vous voulez réutiliser.",
    reponseAttendue:
      "Écoute sans interruption, sans conseil ni jugement ; questions ouvertes (« Qu'est-ce qui vous a posé problème sur ce chantier ? ») et de précision.\nAu moins deux reformulations exactes, dont une d'un ressenti (« Si je vous comprends bien, le plan est arrivé trop tard pour que vous l'intégriez, et vous vous êtes senti mis en difficulté devant le client ? »).\nSituation de Thomas : fait central = plan modifié reçu à 8 h 30 pour une pose à 9 h, bureau injoignable ; opinion = « au bureau, ils ne se rendent pas compte » ; ressenti = gêne devant le client ; « toujours » généralise et ferme le dialogue.\nGrille d'observation renseignée avec des exemples entendus ; formule de reformulation personnelle notée.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C3 : donner et recevoir un feedback structuré (SBI ou DESC)",
    consigne:
      "En trio (émetteur, récepteur, observateur), jouez deux scénarios Maison Lumen, par exemple « Le chantier Bertin » (Thomas à Élodie) et « Le devis corrigé en silence » (Maëlle à Bruno), ou « Le feedback positif » (Inès à Léo). 1. Préparez votre feedback avec la fiche : méthode choisie, situation et faits sans opinion, comportement observé, impact ou ressenti, demande concrète et négociable, phrase d'ouverture. 2. Donnez-le en 5 minutes. 3. En récepteur, reformulez avant de répondre et ne contre-attaquez pas. 4. Rédigez pour vous un feedback réel, positif ou correctif, à donner à un collègue dans les deux semaines.",
    reponseAttendue:
      "Fiche de préparation complète : faits décrits sans généralisation (pas de « toujours »), impact ou ressenti exprimé en « je », demande concrète et négociable (par exemple : toute modification tardive signalée par téléphone).\nFeedback donné en privé, de vive voix, avec une phrase d'ouverture qui annonce le sujet et l'intention.\nRécepteur : reformulation avant de donner sa version, pas de justification immédiate ni de contre-attaque ; accord ou solution trouvée.\nFeedback positif précis (le tableau partagé des dates de pose créé par Léo et son effet), reçu sans être minimisé.\nFeedback réel préparé selon SBI (situation, comportement, impact) ou DESC (décrire, exprimer, suggérer, conclure).",
    points: 20,
  },
  {
    titre: "Exercice 6 — C4 : construire la matrice RACI d'un projet de l'équipe",
    consigne:
      "1. Choisissez un projet que tout le monde connaît (à défaut, le projet fictif « Rénovation éclairage Bertin » de Maison Lumen) et listez 8 à 12 tâches formulées par un verbe. 2. Remplissez seul et en silence la grille RACI comme les choses se passent aujourd'hui (R réalise, A approuve et rend des comptes, C est consulté avant, I est informé après). 3. Comparez avec les grilles des autres, repérez les lignes où les positions divergent. 4. Arbitrez en vous demandant ce qui serait le plus utile pour le client et pour l'équipe, avec un seul A par ligne. 5. Rédigez deux ou trois phrases sur les écarts découverts et désignez un gardien de la matrice.",
    reponseAttendue:
      "Tâches concrètes formulées par un verbe (« valider le plan final » plutôt que « gérer la conception »).\nGrille individuelle remplie selon la réalité actuelle, puis écarts repérés et discutés sans chercher qui a raison.\nRègles respectées : un seul A par tâche, au moins un R, pas trop de C ; le responsable hiérarchique ne s'attribue pas tous les A (« qui a réellement l'information pour décider ? »).\nMatrice validée, écarts formulés en deux ou trois phrases réutilisables dans la charte, gardien de la matrice désigné.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C4 : défi coopératif et décision par consentement",
    consigne:
      "1. Défi « Lumière sur le salon » : en équipe, avec le seul matériel fourni et des cartes-indices réparties entre les membres (dont une personne « en télétravail » qui ne touche pas le matériel), construisez en 20 minutes une structure en papier qui porte la lampe à au moins 60 cm du sol et éclaire la cible, en intégrant le changement demandé par le client à mi-parcours. 2. Débriefez : circulation de l'information, rôles apparus, façon de décider, place de la personne à distance. 3. Prenez une vraie décision d'organisation par consentement : proposition en deux ou trois phrases, questions de clarification, tour de réactions, tour d'objections et bonification, validation avec période d'essai, responsable et date de bilan.",
    reponseAttendue:
      "Trois enseignements du défi tirés de faits observés : information des cartes partagée ou oubliée, rôles choisis ou subis (animateur, gardien du temps), mode de décision réellement utilisé, personne à distance sollicitée ou mise à l'écart, réaction au changement du client.\nDécision par consentement conduite dans l'ordre des étapes ; distinction entre une objection argumentée (« en quoi cela nuirait-il à l'équipe ? ») et une simple préférence.\nDécision rédigée : texte, période d'essai, responsable du suivi, date de bilan ; chacun peut la redire avec ses mots.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C5 : décoder une tension, source, signaux faibles et mode de gestion",
    consigne:
      "Pour deux scénarios Maison Lumen (par exemple « Deux urgences pour une seule Inès » et « La date promise »), remplissez la grille d'analyse : 1. source principale de la tension (tâches, relations, valeurs, organisation) et source secondaire ; 2. signaux faibles visibles avant ou pendant la scène ; 3. marche de l'escalade atteinte (gêne, malentendu, crispation, affrontement, rupture) ; 4. mode de gestion adopté par chaque personne selon Thomas et Kilmann (compétition, collaboration, compromis, évitement, accommodation) ; 5. mode qui vous paraît le plus adapté et pourquoi ; 6. première action concrète, qui la fait, quand.",
    reponseAttendue:
      "Source correctement identifiée : deux priorités contradictoires sans règle d'arbitrage relèvent de l'organisation ; le remède porte sur le système (règle de priorité, RACI) plutôt que sur les personnes.\nSignaux faibles repérés (retrait, réponse sèche, repas pris seul, passage à l'écrit avec copies) ; marche de l'escalade justifiée.\nModes de gestion nommés à bon escient ; pour « La date promise », différence explicite entre le compromis de Sonia (« on coupe la poire en deux ») et une collaboration qui respecte la sécurité et la relation client (par exemple un phasage de la pose ou un renfort ponctuel).\nPremière action concrète, avec un responsable et une date ; analyse d'un système, pas recherche d'un coupable.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C5 : préparer et conduire une conversation difficile, médiation ou alerte",
    consigne:
      "1. Préparez une conversation difficile avec la fiche en cinq questions (faits, effets, version probable de l'autre, objectif, moment et lieu), par exemple Thomas et Élodie après le plan modifié reçu la veille au soir. 2. Jouez-la en trio : annoncez le sujet et l'intention, décrivez les faits sans jugement, exprimez l'effet, laissez l'autre donner sa version et reformulez, passez des positions aux besoins, concluez par un accord précis et daté. 3. Classez les six cartes « Médiation ou alerte ? » et justifiez. 4. Préparez une conversation réelle que vous comptez avoir dans les quinze prochains jours.",
    reponseAttendue:
      "Fiche de préparation complète ; un seul sujet par conversation, faits récents, objectif concret (une règle claire pour les modifications de dernière minute).\nConversation conduite dans l'ordre : sujet et intention annoncés, faits sans généralisation, effet exprimé, version de l'autre écoutée et reformulée, besoins explicités, accord précis et daté.\nCartes : les désaccords sur le rangement, l'outil de suivi des plans ou un client relèvent de la conversation ou de la médiation ; les messages moqueurs répétés et les remarques répétées sur la tenue d'une nouvelle arrivée relèvent de l'alerte ; la collègue qui pleure chaque matin relève de l'alerte au titre de la santé (médecin du travail, manager ou RH avec son accord, services d'urgence en cas de danger immédiat).\nOrientation sans enquête personnelle vers les bons interlocuteurs : manager, RH ou direction, CSE, médecin du travail.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C6 : charte d'équipe et plan d'action SMART à 30, 60 et 90 jours",
    consigne:
      "1. Contribuez à la charte de l'équipe : proposez une formulation de la raison d'être, deux valeurs, et traduisez l'une d'elles en comportements observables (« concrètement, cela veut dire que… »). 2. Proposez une règle de fonctionnement pour l'un des domaines de la charte (communication, réunions et rituels, décisions, désaccords, travail hybride, accueil des nouveaux), en vous appuyant sur les livrables des jours précédents. 3. Rédigez votre plan d'action individuel : deux ou trois actions SMART (ce que je vais faire, comment je saurai que c'est fait, ce dont j'ai besoin, pourquoi c'est utile, échéance), votre binôme de suivi et vos dates de point à 30, 60 et 90 jours.",
    reponseAttendue:
      "Raison d'être courte (« Nous … pour … ») ; valeurs traduites en comportements visibles « lundi matin », jamais en slogans (par exemple : ce qui est promis au client a d'abord été validé avec la personne qui réalise).\nRègle de fonctionnement précise et applicable, reliée à un livrable antérieur (matrice RACI, décision par consentement, premiers réflexes face aux tensions), adoptée par consentement.\nActions individuelles SMART : quoi, qui, comment vérifier, pour quand (par exemple : « D'ici quarante-cinq jours, rédiger avec un collègue un livret d'accueil de deux pages, relu par les derniers arrivés »).\nBinôme de suivi et trois dates de point ; à 30 jours on démarre, à 60 on installe, à 90 on évalue et on ajuste.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par module (questions du contenu source, 6 par module)
// Format lu par le générateur d'exercices : « 1) … A) …   B) … » + « 1-B  2-C … ».
// Aucune parenthèse fermante après A, B, C ou D dans les énoncés (le parseur s'en servirait).
// Les questions à plusieurs réponses du contenu source sont posées ici sous forme de choix unique
// (« lequel ne… pas ? »), avec les mêmes propositions.
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
  ["Qu'est-ce qui distingue principalement une équipe d'un simple groupe de travail ?", ["Le fait de travailler dans le même bureau", "Un but commun dont les membres se sentent collectivement responsables", "L'existence d'un responsable hiérarchique", "Un nombre de personnes inférieur à dix"], 1],
  ["Dans le modèle de Tuckman, comment s'appelle l'étape où les désaccords sur les priorités et les façons de faire apparaissent ?", ["La formation, forming", "La normalisation, norming", "La tension, storming", "La performance, performing"], 2],
  ["Vrai ou faux : une équipe qui traverse une phase de tension a échoué et doit être réorganisée.", VF, 1],
  ["Selon Amy Edmondson, la sécurité psychologique correspond à :", ["Une croyance partagée que l'on peut poser une question, signaler une erreur ou exprimer un désaccord sans être humilié ni sanctionné", "Une ambiance dans laquelle tout le monde est d'accord", "La garantie de conserver son emploi", "L'absence d'exigence sur les résultats"], 0],
  ["Parmi ces comportements, lequel fragilise la sécurité psychologique dans une équipe ?", ["Remercier un collègue qui signale un problème", "Le manager qui reconnaît avoir validé un plan trop vite", "Poser des questions ouvertes et laisser parler les plus discrets", "Chercher immédiatement qui est responsable d'une erreur"], 3],
  ["Qui est responsable de la cohésion d'une équipe ?", ["Uniquement le manager", "Uniquement le service des ressources humaines", "Chaque membre, le manager ayant un rôle particulier pour créer le cadre", "Personne : elle dépend du hasard des personnalités"], 2],
];

const QCM_C2: Q[] = [
  ["Pourquoi l'outil des cinq curseurs de fonctionnement ne classe-t-il pas les personnes dans des types ?", ["Parce que les préférences décrivent des tendances qui varient selon les situations et ne disent rien des compétences", "Parce qu'il n'existe aucune différence de fonctionnement entre les personnes", "Parce que seul un test commercial certifié peut décrire une personne", "Parce que les types servent uniquement au recrutement"], 0],
  ["Vrai ou faux : une préférence de fonctionnement indique ce qu'une personne sait faire ou ne sait pas faire.", VF, 1],
  ["Bruno remarque que Maëlle s'est trompée de référence lors de sa première semaine. Depuis, il doute de tout ce qu'elle fait. De quel biais s'agit-il principalement ?", ["Le biais d'affinité", "L'effet de halo", "L'effet de mode", "Le biais d'optimisme"], 1],
  ["Quelle pratique n'aide pas à corriger une première impression ?", ["Décrire les faits observés avant de les interpréter", "Poser directement la question à la personne concernée", "Croiser son avis avec celui d'autres collègues", "Se fier à sa première impression, qui est généralement la bonne"], 3],
  ["Que retenir sur les différences entre générations au travail ?", ["Chaque génération partage des valeurs identiques chez tous ses membres", "Les plus jeunes sont toujours moins engagés que leurs aînés", "Les écarts s'expliquent souvent davantage par le moment de vie, l'ancienneté ou le métier que par l'année de naissance", "Les plus anciens refusent par nature le changement"], 2],
  ["Laquelle de ces propositions décrit le mieux une intégration réussie d'un nouvel arrivant ?", ["Laisser le nouvel arrivant observer seul pendant un mois pour qu'il se fasse sa propre idée", "Un parcours préparé avec un référent, des missions progressives, des points réguliers et un rapport d'étonnement", "Lui transmettre toutes les procédures par écrit le premier jour", "Confier l'intégration uniquement au service des ressources humaines"], 1],
];

const QCM_C3: Q[] = [
  ["Que fait d'abord une personne qui pratique l'écoute active ?", ["Elle propose rapidement une solution", "Elle cherche à comprendre et vérifie sa compréhension", "Elle donne son avis pour montrer son intérêt"], 1],
  ["Laquelle de ces questions est une question ouverte ?", ["Le plan est-il validé ?", "Vous préférez jeudi ou vendredi ?", "Qu'est-ce qui vous a posé problème sur ce chantier ?"], 2],
  ["Dans la phrase « Lundi, le plan est arrivé à 8 h 30 ; vous ne pensez jamais au terrain et ça m'a stressé », quel élément est absent ?", ["Un fait", "Une opinion", "Un ressenti", "Une demande"], 3],
  ["Dans la méthode DESC, que signifie la lettre S ?", ["Suggérer une solution", "Sanctionner", "Synthétiser l'échange"], 0],
  ["Vrai ou faux : selon la communication non violente de Marshall Rosenberg, une demande doit pouvoir être discutée ou refusée par l'autre.", VF, 0],
  ["Bruno veut signaler à un collègue une erreur dans un devis. Quel canal est le plus adapté ?", ["Un message sur le canal de toute l'équipe", "Un courriel avec la responsable en copie", "Un échange oral en privé, puis une information neutre si nécessaire"], 2],
];

const QCM_C4: Q[] = [
  ["Selon Patrick Lencioni, 2002, quel dysfonctionnement se trouve à la base des autres ?", ["L'inattention aux résultats", "L'absence de confiance", "Le manque de réunions"], 1],
  ["Dans une matrice RACI, que signifie la lettre C ?", ["La personne consultée avant la décision ou la réalisation", "La personne qui contrôle la tâche", "La personne chargée de communiquer au client"], 0],
  ["Vrai ou faux : dans une matrice RACI, il est conseillé d'avoir plusieurs personnes en A sur une même tâche pour partager la responsabilité.", VF, 1],
  ["Dans une décision par consentement, quand la décision est-elle adoptée ?", ["Quand la majorité vote pour", "Quand tout le monde est enthousiaste", "Quand personne n'a d'objection majeure et argumentée"], 2],
  ["Lequel de ces éléments ne rend pas une réunion plus efficace ?", ["Un ordre du jour minuté envoyé à l'avance", "Un mode de décision annoncé pour chaque point à trancher", "Inviter systématiquement toute l'équipe à toutes les réunions", "Un relevé de décisions avec responsable et échéance"], 2],
  ["Dans une équipe hybride comme celle de Maison Lumen, quelle mesure aide le plus à ne pas exclure les personnes à distance ?", ["Placer les informations dans un espace partagé et leur donner la parole en premier en réunion", "Prendre les décisions importantes à la machine à café", "Supprimer toutes les réunions en visio"], 0],
];

const QCM_C5: Q[] = [
  ["Qu'est-ce qui distingue principalement un désaccord utile d'un conflit dégradé ?", ["Le désaccord utile se règle toujours par un vote", "Le désaccord utile porte sur le travail, le conflit dégradé glisse vers la personne", "Le conflit dégradé n'existe que dans les grandes entreprises", "Le désaccord utile se discute uniquement par écrit"], 1],
  ["Inès reçoit le même matin deux priorités opposées de Karim et de Sonia. Quelle est la source principale de cette tension ?", ["Les valeurs", "Les relations", "L'organisation", "La personnalité d'Inès"], 2],
  ["Parmi ces éléments, lequel n'est pas un signal faible d'une tension qui s'installe ?", ["Une réunion qui commence à l'heure", "Une personne habituellement active se tait en réunion", "L'apparition du « eux » et du « nous » dans les échanges", "Des mails de plus en plus nombreux avec des personnes en copie"], 0],
  ["Selon le modèle de Thomas et Kilmann, quel mode combine une forte affirmation de soi et une forte coopération ?", ["Le compromis", "La compétition", "L'accommodation", "La collaboration"], 3],
  ["Vrai ou faux : lors d'une conversation difficile, il est conseillé d'aborder en une seule fois tous les griefs accumulés depuis des mois pour « vider son sac ».", VF, 1],
  ["Une collègue vous confie qu'un collègue lui envoie depuis plusieurs semaines des messages dénigrants. Quelle est la conduite adaptée ?", ["Organiser vous-même une médiation entre eux deux", "L'écouter, noter les faits et l'orienter vers le manager, les RH ou la direction, le CSE ou le médecin du travail", "Lui conseiller d'attendre que cela passe", "Mener votre propre enquête auprès de l'équipe"], 1],
];

const QCM_C6: Q[] = [
  ["Quelle est la meilleure façon d'élaborer une charte d'équipe ?", ["Le manager la rédige seul puis la présente", "On reprend la charte d'une autre entreprise", "L'équipe la co-construit et la révise régulièrement", "Le service RH l'impose à toutes les équipes"], 2],
  ["Pourquoi traduire chaque valeur de la charte en comportements observables ?", ["Pour qu'elle guide réellement les actions et ne reste pas un slogan", "Pour que la charte soit plus longue", "Pour pouvoir sanctionner les écarts", "Parce que c'est une obligation légale"], 0],
  ["Laquelle de ces pratiques n'est pas un rituel d'équipe tel que présenté dans ce module ?", ["La météo d'équipe en début de point", "Le point court sur l'avancement et les blocages", "La rétrospective régulière sur le fonctionnement", "L'entretien annuel d'évaluation individuel"], 3],
  ["Vrai ou faux : lors d'une rétrospective, l'équipe analyse son fonctionnement et non les personnes.", VF, 0],
  ["Laquelle de ces actions est formulée de façon SMART ?", ["Mieux communiquer avec le bureau d'études", "D'ici quarante-cinq jours, Inès et Bruno rédigent un livret d'accueil de deux pages, relu par Léo et Maëlle", "Être plus à l'écoute des nouveaux", "Faire des efforts sur les réunions"], 1],
  ["Dans un plan d'action à 30, 60 et 90 jours, que fait-on de préférence à 90 jours ?", ["On lance les premières actions simples", "On abandonne le plan, la formation étant loin", "On rédige une nouvelle charte de zéro", "On relit la charte, on évalue ce qui a changé et on ajuste"], 3],
];

export const COH21_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Ce qui fait une équipe", QCM_C1),
  qcmExercice("QCM C2 — Se connaître soi et les autres", QCM_C2),
  qcmExercice("QCM C3 — Communiquer efficacement", QCM_C3),
  qcmExercice("QCM C4 — Coopérer et décider ensemble", QCM_C4),
  qcmExercice("QCM C5 — Désaccords et tensions : les transformer", QCM_C5),
  qcmExercice("QCM C6 — Charte d'équipe et plan d'action", QCM_C6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (C1 à C6), alignées sur les 10 questions de
 * positionnement et sur les copies de `cohesionEquipe21hHumanized.ts` ; les 6 QCM ensuite.
 */
export const COH21_EXERCICES_COMPLETS: AIContentExercise[] = [...COH21_EXERCICES, ...COH21_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Cohésion d'équipe en entreprise – 21 h » (6 chapitres, un par module de 3 h 30)</strong> : textes des capsules vidéo, fiches à retenir, ateliers minutés et QCM corrigés de chaque module ; fil rouge Maison Lumen, entreprise fictive.</li>
  <li><strong>Espace e-learning complémentaire</strong> : capsules vidéo sous-titrées, fiches à retenir et QCM, accessibles avant, pendant et après les journées.</li>
  <li><strong>Fiches de travail des ateliers</strong> : fiche « Mes curseurs de fonctionnement », gabarit du parcours d'intégration et modèle de rapport d'étonnement, grille d'observation de l'écoute, fiche de préparation SBI / DESC, grille RACI, grille d'analyse des tensions, fiche de préparation d'une conversation difficile, cartes « Médiation ou alerte ? ».</li>
  <li><strong>Modèles</strong> : charte d'équipe, plan d'action individuel et plan d'action collectif à 30, 60 et 90 jours.</li>
  <li><strong>Livrables de l'équipe</strong> : règles du groupe, carte de l'équipe, matrice RACI, décision par consentement, premiers réflexes face aux tensions, charte d'équipe version 1, mis au propre et transmis par le formateur.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Salle de l'entreprise</strong> permettant de travailler en sous-groupes et en trios, avec de l'espace au sol ou au mur pour la frise de Tuckman et les lignes des curseurs.</li>
  <li><strong>Matériel d'animation</strong> : paperboard ou tableau blanc, Post-it de plusieurs couleurs, gommettes, feutres, ruban adhésif ; matériel du défi coopératif (feuilles A4, ruban adhésif, ciseaux, lampe, mètre ruban, minuteur).</li>
  <li><strong>Variante distanciel</strong> : outil de visioconférence avec salles de sous-groupes, tableau blanc collaboratif, documents et tableur partagés.</li>
  <li><strong>Espace e-learning</strong> de la formation (capsules sous-titrées, fiches, QCM).</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>INRS — risques psychosociaux</strong> : <a href="https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html">https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html</a> — repères pour prévenir les risques psychosociaux et identifier les bons interlocuteurs.</li>
  <li><strong>Anact — qualité de vie et des conditions de travail</strong> : <a href="https://www.anact.fr/">https://www.anact.fr/</a> — ressources sur l'organisation du travail, le travail hybride et le dialogue au sein des équipes.</li>
  <li><strong>Légifrance — Code du travail</strong> : <a href="https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/">https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/</a> — obligation de sécurité de l'employeur, harcèlement moral, droit à la déconnexion.</li>
  <li><strong>Service-public.fr — télétravail dans le secteur privé</strong> : <a href="https://www.service-public.fr/particuliers/vosdroits/F13851">https://www.service-public.fr/particuliers/vosdroits/F13851</a> — cadre du télétravail utile pour les règles de l'équipe hybride.</li>
</ul>`;

const yt = (q: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
export const COH21_VIDEOS = [
  { title: "Groupe ou équipe : quelle différence ?", description: "But commun, complémentarité, responsabilité partagée.", url: yt("différence groupe équipe travail") },
  { title: "Les étapes de développement d'une équipe (Tuckman)", description: "Formation, tension, normalisation, performance.", url: yt("modèle de Tuckman étapes équipe") },
  { title: "La sécurité psychologique au travail", description: "Oser poser une question, signaler une erreur, exprimer un désaccord.", url: yt("sécurité psychologique équipe Edmondson") },
  { title: "Les biais de perception entre collègues", description: "Effet de halo, effet de primauté, biais de confirmation.", url: yt("biais cognitifs effet de halo travail") },
  { title: "L'écoute active et la reformulation", description: "Comprendre avant de répondre, vérifier sa compréhension.", url: yt("écoute active reformulation") },
  { title: "Donner un feedback constructif", description: "Méthodes SBI et DESC, feedback positif et correctif.", url: yt("feedback constructif méthode DESC") },
  { title: "La communication non violente", description: "Observation, sentiment, besoin, demande.", url: yt("communication non violente Rosenberg") },
  { title: "La matrice RACI", description: "Clarifier qui réalise, approuve, est consulté, est informé.", url: yt("matrice RACI explication") },
  { title: "La décision par consentement", description: "Proposition, clarification, réactions, objections, validation.", url: yt("décision par consentement") },
  { title: "Les modes de gestion des conflits (Thomas et Kilmann)", description: "Compétition, collaboration, compromis, évitement, accommodation.", url: yt("Thomas Kilmann modes gestion des conflits") },
];

export const COH21_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: COH21_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: COH21_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement début / fin (questions de l'évaluation finale des acquis)
// ---------------------------------------------------------------------------
export const COH21_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Qu'est-ce qui distingue une équipe d'un simple groupe de personnes ?", options: ["Le fait de travailler dans le même bureau", "Un objectif commun et une interdépendance dans le travail", "Le même responsable hiérarchique", "Le même métier"], correctIndex: 1 },
  { question: "Dans le modèle de Tuckman (1965), quelle étape suit la formation (forming) ?", options: ["La normalisation (norming)", "La tension, ou turbulence (storming)", "La performance (performing)", "La dissolution (adjourning)"], correctIndex: 1 },
  { question: "Selon Amy Edmondson (1999), la sécurité psychologique d'une équipe, c'est :", options: ["L'absence de tout désaccord", "La croyance partagée qu'on peut prendre des risques interpersonnels, comme poser une question ou signaler une erreur, sans être humilié", "La garantie de l'emploi", "Le fait que le manager prenne toutes les décisions"], correctIndex: 1 },
  { question: "Quelle réponse relève de l'écoute active ?", options: ["« Moi aussi, ça m'est arrivé, je vais vous raconter. »", "« Si je vous comprends bien, le plan est arrivé trop tard pour que vous l'intégriez ? »", "« Vous auriez dû lire vos mails. »", "« Ce n'est pas grave. »"], correctIndex: 1 },
  { question: "Quelles sont, dans l'ordre, les quatre étapes de la communication non violente de Marshall Rosenberg ?", options: ["Observation, sentiment, besoin, demande", "Problème, cause, solution, décision", "Fait, opinion, jugement, sanction", "Écoute, reformulation, question, conclusion"], correctIndex: 0 },
  { question: "Dans une matrice RACI, que désigne la lettre A ?", options: ["La personne qui réalise la tâche", "La personne qui approuve et rend compte du résultat, une seule par tâche", "Toutes les personnes informées", "Les personnes consultées avant la décision"], correctIndex: 1 },
  { question: "Dans une décision par consentement, une proposition est adoptée quand :", options: ["Tout le monde est enthousiaste", "La majorité a voté pour", "Personne n'a d'objection argumentée", "Le manager l'a validée seul"], correctIndex: 2 },
  { question: "Un technicien et une conceptrice s'opposent régulièrement parce qu'aucune règle ne fixe le délai de transmission des plans modifiés. Quelle est la source principale ?", options: ["Les valeurs", "L'organisation", "La personnalité", "Les relations familiales"], correctIndex: 1 },
  { question: "Dans le modèle de Thomas et Kilmann (1974), quel mode consiste à mettre le sujet de côté sans défendre ni ses intérêts ni ceux de l'autre ?", options: ["La compétition", "L'évitement", "La collaboration", "Le compromis"], correctIndex: 1 },
  { question: "Que signifie le T de SMART dans un plan d'action à 30, 60 et 90 jours ?", options: ["Transparent", "Temporellement défini : l'action a une échéance", "Testé par le manager", "Transversal"], correctIndex: 1 },
];

export const COH21_QCM_FIN: AIQCMQuestion[] = [
  { question: "Parmi ces phénomènes, lequel n'est pas un biais cognitif qui influence notre regard sur les autres ?", options: ["Le biais de confirmation", "L'effet de halo", "L'écoute active", "L'erreur fondamentale d'attribution"], correctIndex: 2 },
  { question: "Dans le modèle de Tuckman (1965), quelle étape suit la formation (forming) ?", options: ["La normalisation (norming)", "La tension, ou turbulence (storming)", "La performance (performing)", "La dissolution (adjourning)"], correctIndex: 1 },
  { question: "Selon Amy Edmondson (1999), la sécurité psychologique d'une équipe, c'est :", options: ["L'absence de tout désaccord", "La croyance partagée qu'on peut prendre des risques interpersonnels, comme poser une question ou signaler une erreur, sans être humilié", "La garantie de l'emploi", "Le fait que le manager prenne toutes les décisions"], correctIndex: 1 },
  { question: "Un feedback correctif efficace n'est pas :", options: ["Factuel et précis", "Donné rapidement après les faits", "Donné en public pour servir d'exemple", "Centré sur l'effet observé plutôt que sur la personne"], correctIndex: 2 },
  { question: "Quelles sont, dans l'ordre, les quatre étapes de la communication non violente de Marshall Rosenberg ?", options: ["Observation, sentiment, besoin, demande", "Problème, cause, solution, décision", "Fait, opinion, jugement, sanction", "Écoute, reformulation, question, conclusion"], correctIndex: 0 },
  { question: "Dans une matrice RACI, que désigne la lettre A ?", options: ["La personne qui réalise la tâche", "La personne qui approuve et rend compte du résultat, une seule par tâche", "Toutes les personnes informées", "Les personnes consultées avant la décision"], correctIndex: 1 },
  { question: "Qu'est-ce qui ne rend pas une réunion plus utile ?", options: ["Un objectif annoncé et un ordre du jour", "Un animateur et un gardien du temps", "Un relevé de décisions avec responsables et échéances", "Inviter toute l'entreprise par précaution"], correctIndex: 3 },
  { question: "Dans une décision par consentement, une proposition est adoptée quand :", options: ["Tout le monde est enthousiaste", "La majorité a voté pour", "Personne n'a d'objection argumentée", "Le manager l'a validée seul"], correctIndex: 2 },
  { question: "Dans le modèle de Thomas et Kilmann (1974), quel mode consiste à mettre le sujet de côté sans défendre ni ses intérêts ni ceux de l'autre ?", options: ["La compétition", "L'évitement", "La collaboration", "Le compromis"], correctIndex: 1 },
  { question: "Que signifie le T de SMART dans un plan d'action à 30, 60 et 90 jours ?", options: ["Transparent", "Temporellement défini : l'action a une échéance", "Testé par le manager", "Transversal"], correctIndex: 1 },
];

export const COH21_EVAL_PACK: AIEvalPack = {
  qcmDebut: COH21_QCM_DEBUT,
  qcmFin: COH21_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du jour 2) — le chantier Bertin chez Maison Lumen, entreprise fictive",
    contexte:
      "Thomas, technicien poseur, arrive lundi à 9 h chez le client Bertin. Le plan modifié, avec deux suspensions déplacées, lui est arrivé à 8 h 30 par message ; il a appelé le bureau sans réponse, Élodie, la conceptrice, était en télétravail. Il a improvisé les percements et le client a semblé douter du sérieux de l'équipe. De retour, il dit : « Franchement, c'est toujours pareil : au bureau, ils ne se rendent pas compte. » De son côté, Élodie a reçu la demande de modification par l'intermédiaire de Karim le vendredi soir et l'a traitée le lundi à 7 h 45 ; la date de pose n'apparaît pas dans son outil.",
    questions: [
      { question: "Dans les propos de Thomas, distinguez les faits, les opinions et les ressentis. Que change le mot « toujours » ?", reponseAttendue: "Faits : plan modifié reçu à 8 h 30 pour une pose à 9 h, bureau injoignable, percements improvisés. Opinion : « au bureau, ils ne se rendent pas compte ». Ressenti : gêne et agacement devant le client. « Toujours » généralise, met l'autre sur la défensive et ferme le dialogue.", points: 5 },
      { question: "Vous êtes le collègue à qui Thomas raconte la scène. Rédigez deux reformulations, dont une d'un ressenti, et une question ouverte.", reponseAttendue: "« Si je vous comprends bien, le plan est arrivé trop tard pour que vous l'intégriez ? » ; « Vous vous êtes senti mis en difficulté devant le client. » ; question ouverte : « Qu'est-ce qui vous aurait permis de travailler sereinement ce matin-là ? ». Aucun conseil ni jugement avant d'avoir vérifié sa compréhension.", points: 5 },
      { question: "Préparez le feedback de Thomas à Élodie selon la méthode DESC.", reponseAttendue: "Décrire les faits sans généraliser (plan reçu à 8 h 30 par message pour une pose à 9 h) ; exprimer l'effet en « je » (je me suis retrouvé à improviser devant le client) ; suggérer une solution concrète et négociable (toute modification tardive signalée par téléphone) ; conclure sur les conséquences positives (on évite d'avoir l'air désorganisés devant le client). Feedback donné en privé, de vive voix.", points: 5 },
      { question: "Proposez une règle d'équipe sur la transmission des modifications de plan et indiquez comment la faire adopter.", reponseAttendue: "Règle précise (par exemple : toute modification reçue après la veille de la pose est signalée par téléphone à la personne qui pose, et la date de pose est visible par la conception) ; responsabilités clarifiées dans la matrice RACI ; adoption par consentement : proposition, clarification, réactions, objections argumentées, validation avec période d'essai, responsable et date de bilan.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — QCM des acquis, analyse d'une tension et plan d'action (jour 3), grille d'acquisition des compétences C1 à C6",
    exercices: [
      {
        titre: "Partie 1 — Évaluation finale des acquis : QCM de 15 questions sur les six modules (C1 à C6, 30 minutes)",
        consigne: "Répondez individuellement aux 15 questions de l'évaluation finale (équipe et groupe, étapes de Tuckman, sécurité psychologique, biais cognitifs, styles, écoute active, communication non violente, feedback, matrice RACI, consentement, réunions, sources de tension, modes de Thomas et Kilmann, alerte, plan SMART). Correction commentée en groupe.",
        reponseAttendue: "Réponses attendues : objectif commun et interdépendance ; la tension (storming) suit la formation ; sécurité psychologique = pouvoir prendre des risques interpersonnels sans être humilié ; biais de confirmation, effet de halo et erreur fondamentale d'attribution (l'écoute active n'est pas un biais) ; un outil de connaissance de soi ne classe pas dans une case définitive ; la reformulation relève de l'écoute active ; observation, sentiment, besoin, demande ; feedback correctif factuel, rapide, centré sur l'effet, jamais en public ; A = une seule personne qui approuve et rend compte ; consentement = aucune objection argumentée ; objectif, ordre du jour, rôles et relevé de décisions ; absence de règle = organisation ; évitement ; propos dénigrants répétés = alerte, pas médiation ; T = temporellement défini.",
        points: 20,
      },
      {
        titre: "Partie 2 — Analyse d'une tension (C5)",
        consigne: "Scénario « La date promise » (Maison Lumen, entreprise fictive) : Karim promet une pose en dix jours pour signer avec un hôtel ; Thomas estime qu'il en faut quinze pour respecter la sécurité et la finition ; le ton monte et Sonia propose « douze jours, on coupe la poire en deux ». Identifiez la source de la tension, les modes de gestion adoptés et proposez une issue plus adaptée.",
        reponseAttendue: "Source analysée (organisation et tâches : engagement de date pris sans consulter la pose) ; modes nommés (compétition de Karim et de Thomas, compromis de Sonia) ; explication du risque du compromis, qui ne satisfait personne ; proposition d'une collaboration qui respecte la sécurité et la relation client (phasage de la pose, renfort ponctuel) ; première action avec un responsable et une date.",
        points: 20,
      },
      {
        titre: "Partie 3 — Préparer une conversation difficile (C3, C5)",
        consigne: "Remplissez la fiche de préparation en cinq questions (faits, effets, version probable de l'autre, objectif, moment et lieu) pour une conversation que vous comptez avoir, puis rédigez la phrase d'ouverture et la conclusion visée.",
        reponseAttendue: "Un seul sujet ; faits récents décrits sans jugement ni généralisation ; effet exprimé en « je » ; hypothèse sur la version de l'autre ; objectif concret ; moment et lieu adaptés, en privé ; phrase d'ouverture qui annonce le sujet et l'intention ; conclusion par un accord précis et daté. Situations d'alerte reconnues et orientées vers les bons interlocuteurs.",
        points: 20,
      },
      {
        titre: "Partie 4 — Contribution à la charte d'équipe (C1, C2, C4, C6)",
        consigne: "Proposez une valeur de l'équipe traduite en au moins deux comportements observables, et une règle de fonctionnement pour l'un des domaines de la charte (communication, réunions et rituels, décisions, désaccords, travail hybride, accueil des nouveaux).",
        reponseAttendue: "Valeur traduite en comportements visibles au quotidien, pas en slogan ; règle précise et applicable (canal, délai, responsable, mode de décision annoncé) ; lien avec un livrable de la formation (matrice RACI, décision par consentement, parcours d'intégration, premiers réflexes face aux tensions).",
        points: 20,
      },
      {
        titre: "Partie 5 — Plan d'action individuel SMART à 30, 60 et 90 jours (C6)",
        consigne: "Rédigez deux ou trois actions individuelles au format SMART (ce que je vais faire, comment je saurai que c'est fait, ce dont j'ai besoin, pourquoi c'est utile, échéance), désignez votre binôme de suivi et fixez vos dates de point à 30, 60 et 90 jours.",
        reponseAttendue: "Actions spécifiques, mesurables, atteignables, réalistes et temporellement définies ; indicateur de réalisation pour chacune ; binôme de suivi désigné ; trois dates de point ; logique démarrer à 30 jours, installer à 60 jours, évaluer et ajuster à 90 jours.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const COH21_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000037385728/",
      titreLien: "Légifrance — Code du travail, actions concourant au développement des compétences",
      titre: "Définition de l'action de formation et obligations de l'organisme",
      date: "Octobre 2026",
      commentaire: "Articles L. 6313-1 et suivants : l'action de formation est un parcours pédagogique permettant d'atteindre un objectif professionnel ; programme, convention avec l'entreprise, émargement, attestation de fin de formation et certificat de réalisation.",
      exploitation: "Preuve : fiche mémo archivée au dossier qualité. Action : vérification de la convention intra-entreprise, du programme et des documents de fin de formation remis à l'entreprise et aux participants.",
    },
    {
      lien: "https://travail-emploi.gouv.fr/",
      titreLien: "Ministère du Travail — référentiel national qualité",
      titre: "Évolution du référentiel national qualité au 1er novembre 2026",
      date: "Novembre 2026",
      commentaire: "Le référentiel national qualité applicable aux organismes de formation évolue au 1er novembre 2026 ; suivi des indicateurs relatifs à l'analyse des besoins, au positionnement, à l'évaluation des acquis et à la satisfaction.",
      exploitation: "Preuve : note interne datée. Action : mise à jour de la procédure d'analyse des besoins avec l'entreprise et du questionnaire de positionnement de la formation.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/",
      titreLien: "Légifrance — Code du travail, article L. 4121-1",
      titre: "Obligation de sécurité de l'employeur et santé mentale",
      date: "Septembre 2026",
      commentaire: "L'employeur prend les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des travailleurs : le module 5 distingue les tensions ordinaires, qui relèvent de la conversation ou de la médiation, des situations qui imposent d'alerter.",
      exploitation: "Preuve : cartes « Médiation ou alerte ? » relues au regard du texte. Action : rappel systématique des interlocuteurs (manager, RH ou direction, CSE, médecin du travail) dans l'atelier.",
    },
    {
      lien: "https://agefiph.fr/",
      titreLien: "Agefiph — compensation du handicap en formation",
      titre: "Accueil des personnes en situation de handicap en formation",
      date: "Juillet 2026",
      commentaire: "Aménagements possibles en formation présentielle : supports adaptés, capsules sous-titrées, aménagement des ateliers et des mises en situation ; rôle du référent handicap.",
      exploitation: "Preuve : question systématique dans l'analyse des besoins. Action : procédure d'adaptation appliquée aux ateliers et à l'évaluation finale.",
    },
  ],
  metier: [
    {
      lien: "https://www.inrs.fr/risques/psychosociaux/ce-qu-il-faut-retenir.html",
      titreLien: "INRS — risques psychosociaux",
      titre: "Prévention des risques psychosociaux dans les équipes",
      date: "Octobre 2026",
      commentaire: "Repères de l'INRS sur les risques psychosociaux, les facteurs liés à l'organisation du travail et les acteurs de la prévention : cohérent avec l'approche du module 5, qui cherche d'abord les causes organisationnelles d'une tension.",
      exploitation: "Preuve : fiche ressource déposée dans l'espace e-learning. Action : renvoi vers ces repères dans la partie « alerter » du module 5.",
    },
    {
      lien: "https://www.anact.fr/",
      titreLien: "Anact — qualité de vie et des conditions de travail",
      titre: "Organisation du travail, travail hybride et dialogue dans les équipes",
      date: "Septembre 2026",
      commentaire: "Ressources de l'Anact sur l'organisation du travail et le travail hybride : utiles pour les règles de l'équipe hybride travaillées dans la charte (présence commune, disponibilité, délai de réponse).",
      exploitation: "Preuve : sélection de ressources ajoutée aux supports. Action : exemples de règles hybrides discutés lors de l'atelier charte (C6).",
    },
    {
      lien: "https://doi.org/10.2307/2666999",
      titreLien: "Edmondson, A. (1999), Administrative Science Quarterly",
      titre: "Sécurité psychologique et comportements d'apprentissage dans les équipes",
      date: "Août 2026",
      commentaire: "Article de référence d'Amy Edmondson sur la sécurité psychologique, cité dans le module 1 avec son autrice et sa date, sans reproduction de son texte.",
      exploitation: "Preuve : référence vérifiée et citée dans la fiche à retenir du module 1. Action : contrôle des citations d'auteurs (Tuckman, Edmondson, Thomas et Kilmann, Rosenberg, Lencioni) lors de la mise à jour annuelle.",
    },
  ],
  technologique: [
    {
      lien: "https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072050/",
      titreLien: "Légifrance — Code du travail, article L. 2242-17 (droit à la déconnexion)",
      titre: "Messagerie, disponibilité et déconnexion dans l'équipe hybride",
      date: "Octobre 2026",
      commentaire: "Le droit à la déconnexion fait partie de la négociation sur la qualité de vie et des conditions de travail : les règles d'usage de la messagerie et de disponibilité adoptées dans la charte doivent rester compatibles avec les accords de l'entreprise.",
      exploitation: "Preuve : point de vigilance ajouté au modèle de charte. Action : vérification avec le manager des accords existants avant d'adopter une règle de disponibilité.",
    },
    {
      lien: "https://www.service-public.fr/particuliers/vosdroits/F13851",
      titreLien: "Service-public.fr — télétravail dans le secteur privé",
      titre: "Cadre du télétravail et organisation de l'équipe",
      date: "Septembre 2026",
      commentaire: "Rappel du cadre du télétravail (accord collectif, charte ou accord individuel) : les jours de présence commune et les rituels hybrides décidés par l'équipe s'inscrivent dans ce cadre.",
      exploitation: "Preuve : fiche mémo jointe aux supports du module 4. Action : variante distanciel des ateliers vérifiée à chaque session.",
    },
    {
      lien: "https://www.cnil.fr/fr/reglement-europeen-protection-donnees",
      titreLien: "CNIL — RGPD",
      titre: "Données personnelles dans les outils collaboratifs et l'espace e-learning",
      date: "Août 2026",
      commentaire: "Tableaux blancs collaboratifs, photos des livrables et résultats du positionnement contiennent des données personnelles : information des participants, finalité pédagogique, anonymisation des résultats de positionnement, conservation limitée.",
      exploitation: "Preuve : mention d'information ajoutée au livret d'accueil. Action : résultats du positionnement présentés uniquement de façon agrégée et anonyme.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedCOH21AICaches(f: FormationInfo = FORMATION_COH21): void {
  try {
    setCachedContentPack(f, COH21_CONTENT_PACK);
    setCachedEvalPack(f, COH21_EVAL_PACK);
    setCachedVeillePack(f, COH21_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
