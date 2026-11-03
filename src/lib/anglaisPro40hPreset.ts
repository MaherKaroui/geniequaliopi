/**
 * Preset complet « Anglais Professionnel – 40 h » — formation professionnelle NON certifiante
 * (catégorie « autres formations professionnelles » du BPF, cadre F-3 ligne d).
 * Données reprises de la convention de formation et du BPF 2025 de PARTENAIRE FRANCE FORMATION :
 * 40 heures sur 6 jours (5 × 7 h + 1 × 5 h), présentiel dans les locaux de l'entreprise cliente,
 * 1 000 € HT par stagiaire (TVA non applicable, art. 261-4-4° a du CGI), salariés d'entreprises.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - Formation 40 h (6 jours) : C1 vocabulaire et grammaire, C2 écrits professionnels, C3 téléphone
 *    et visioconférence, C4 réunions, C5 présentations, C6 négociation et réclamations
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées (diagnostic de départ puis
 *    C1 à C6) et 6 QCM de 10 questions, un par compétence
 *  - Pack évaluation : QCM de positionnement début / fin, cas intermédiaire, évaluation finale
 *    interne (mise en situation orale + épreuve écrite, grille d'acquisition des compétences)
 *  - Pack veille (réglementaire / métier / technologique)
 * Évaluation interne uniquement : attestation de fin de formation et certificat de réalisation.
 * Le support de cours (6 chapitres) est dans `anglaisPro40h/` ; les réponses propres à chaque
 * stagiaire dans `anglaisPro40hHumanized.ts`. Aucune donnée de satisfaction n'est pré-remplie.
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
export const FORMATION_ANG40: FormationInfo = {
  intitule: "Anglais Professionnel – 40 h",
  codeRNCP: "",
  objectifs:
    "Formation professionnelle non certifiante. Objectif général : communiquer avec aisance et efficacité en anglais dans les situations professionnelles courantes d'un contexte international, à l'écrit comme à l'oral.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- C1 — Identifier et mobiliser le vocabulaire métier et les structures grammaticales clés en anglais dans un contexte professionnel international.\n- C2 — Rédiger des écrits professionnels clairs, fluides et structurés (emails complexes, synthèses, ordres du jour, comptes rendus).\n- C3 — Mener des échanges téléphoniques et visioconférences professionnels avec aisance en appliquant les codes de politesse des affaires.\n- C4 — Animer et participer activement à des réunions professionnelles en sachant reformuler, argumenter, approuver et réfuter avec diplomatie.\n- C5 — Concevoir et délivrer une présentation professionnelle percutante appuyée sur des supports visuels en anglais.\n- C6 — Conduire une négociation commerciale de premier niveau et traiter les objections ou réclamations de partenaires internationaux avec confiance.",
  prerequis:
    "Niveau A2 du CECRL minimum en anglais (vérifié par le test de positionnement d'entrée) ; utilisation courante des outils bureautiques et d'internet.",
  duree: "40 heures réparties sur 6 jours (5 jours de 7 h et 1 jour de 5 h)",
  dureeSaisiePrioritaire: true,
  modalites: "présentiel",
  tarif: "1 000 € HT par stagiaire (TVA non applicable, art. 261-4-4° a du CGI)",
  programme:
    "JOUR 1 — LES FONDAMENTAUX DE L'ANGLAIS PROFESSIONNEL (C1, 7 h)\nAccueil, présentation des objectifs et du déroulé, test de positionnement. Se présenter et présenter son entreprise, son poste et ses missions ; small talk. Vocabulaire métier par fonction (achats, ventes, logistique, finance, ressources humaines, production) ; nombres, dates, prix et unités. Structures grammaticales clés : présent simple et continu, prétérit et present perfect, futurs, modaux de politesse, formulation des questions ; faux amis du monde professionnel. Mises en situation : présentation de soi et de son entreprise, glossaire métier personnel.\nJOUR 2 — LES ÉCRITS PROFESSIONNELS (C2, 7 h)\nPrincipes de l'écrit professionnel en anglais (clarté, concision, registre) ; structure et formules d'un email ; emails complexes : demande, relance, annonce d'un retard, réponse à une réclamation, refus poli ; connecteurs logiques ; synthèse (executive summary) ; ordre du jour (agenda) ; compte rendu de réunion (minutes, action points) ; messagerie instantanée. Mises en situation : email complexe, ordre du jour et compte rendu.\nJOUR 3 — TÉLÉPHONE ET VISIOCONFÉRENCE (C3, 7 h)\nDécrocher, se présenter, filtrer et transférer un appel ; prendre et laisser un message ; épeler, faire répéter, vérifier la compréhension ; fixer, déplacer ou annuler un rendez-vous (fuseaux horaires) ; codes de politesse des affaires et différences culturelles ; préparer et mener une visioconférence (vocabulaire technique, incidents de connexion, partage d'écran) ; suivi écrit de l'appel. Mises en situation : appels téléphoniques en binôme, visioconférence simulée.\nJOUR 4 — LES RÉUNIONS (C4, 7 h)\nRôles en réunion ; ouvrir une réunion et présenter l'ordre du jour ; donner son avis ; approuver et désapprouver avec diplomatie ; reformuler et vérifier la compréhension ; argumenter ; interrompre et reprendre la parole ; proposer et recommander ; décider et répartir les actions ; clore la réunion ; réunions interculturelles et hybrides. Mises en situation : réunion de projet jouée en sous-groupes, avec désaccord à gérer.\nJOUR 5 — LES PRÉSENTATIONS PROFESSIONNELLES (C5, 7 h)\nPréparer une présentation (objectif, public, message clé, structure) ; introduction ; transitions (signposting) ; décrire des graphiques et des tendances ; concevoir des supports visuels efficaces ; persuasion et storytelling ; voix, rythme et langage corporel ; conclure et appeler à l'action ; gérer les questions. Mise en situation : présentation de 5 minutes appuyée sur des diapositives, filmée et débriefée.\nJOUR 6 — NÉGOCIATION, OBJECTIONS ET RÉCLAMATIONS · ÉVALUATION FINALE ET BILAN (C6, 5 h)\nÉtapes d'une négociation commerciale ; vocabulaire commercial (devis, remise, conditions de paiement, délais, garantie) ; faire une offre et une contre-proposition ; traiter les objections (prix, délai, qualité, concurrence) ; traiter une réclamation (excuses, solutions, geste commercial, confirmation écrite). Évaluation finale interne (mise en situation orale et épreuve écrite), test de positionnement de fin, bilan de la formation et plan de progression individuel.",
  methodesEvaluation:
    "Test de positionnement en début de formation (10 questions ouvertes + QCM 10 questions) ; exercices pratiques en cours de formation (10 mises en situation corrigées : diagnostic de départ puis C1 à C6) et un quiz de 10 questions par compétence ; cas pratique intermédiaire ; évaluation finale interne le jour 6 (mise en situation orale de négociation et de traitement d'une réclamation, épreuve écrite : email et compte rendu) ; grille d'acquisition des compétences C1 à C6 renseignée par le formateur ; test de positionnement de fin. Formation non certifiante : attestation de fin de formation mentionnant les objectifs et le niveau d'acquisition des compétences, et certificat de réalisation.",
  moyensPedagogiques:
    "Formation en présentiel dans les locaux de l'entreprise cliente. Méthodes : apports théoriques et méthodologiques, démonstrations commentées, exercices pratiques et mises en situation (jeux de rôle en binôme et en sous-groupes, simulations d'appels, de réunions, de présentations et de négociations) ; support de cours remis à chaque stagiaire. Moyens techniques : salle équipée d'un vidéoprojecteur interactif, d'un tableau blanc et d'un système audio ; ordinateurs portables ; casques avec micro ; plateforme LMS donnant accès aux supports, aux fiches lexique et aux exercices en autonomie. Supports authentiques : études de cas d'entreprises anglophones, podcasts métiers, presse économique, extraits vidéo de réunions.",
  publicVise:
    "Salariés d'entreprises amenés à utiliser l'anglais dans leur activité professionnelle (échanges écrits et oraux avec des clients, fournisseurs, partenaires ou collègues étrangers). Formation organisée pour l'entreprise, dans ses locaux, au titre de son plan de développement des compétences (convention de formation avec l'entreprise).",
  delaiAcces: "14 jours après signature de la convention de formation avec l'entreprise.",
  dateDebut: "2026-11-16",
  dateFin: "2026-11-23",
  lieu: "",
  nombreParticipants: "8",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Gagner en assurance pour se présenter et présenter l'entreprise à des interlocuteurs étrangers.",
  "Enrichir le vocabulaire métier de son service et fiabiliser les structures grammaticales de base (temps, questions, modaux de politesse).",
  "Rédiger plus vite des emails clairs et polis, en particulier pour relancer, annoncer un retard ou répondre à une réclamation.",
  "Savoir rédiger un ordre du jour et un compte rendu de réunion en anglais.",
  "Oser décrocher le téléphone en anglais, comprendre l'interlocuteur et prendre un message fiable.",
  "Être à l'aise en visioconférence : prendre la parole, faire répéter, gérer un incident de connexion.",
  "Participer réellement aux réunions en anglais : donner son avis, reformuler, exprimer un désaccord sans heurter.",
  "Présenter un projet ou des résultats chiffrés en anglais avec des diapositives, et répondre aux questions.",
  "Négocier un prix, un délai ou des conditions avec un client ou un fournisseur étranger.",
  "Traiter une réclamation ou une objection d'un partenaire international avec calme et méthode.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins conduite à l'entrée (questionnaire préalable, entretien avec l'entreprise, test de positionnement du jour 1) fait apparaître un groupe de salariés de services différents (administration des ventes, achats, logistique, service après-vente, comptabilité, gestion de projet) qui utilisent déjà l'anglais dans leur poste, de façon irrégulière et souvent avec appréhension. Les niveaux se situent entre A2 et B1 du CECRL. Trois besoins sont partagés par la quasi-totalité du groupe.</p>
<ul>
  <li><strong>L'oral en temps réel (C3, C4)</strong> : le téléphone, la visioconférence et les réunions sont les situations les plus redoutées ; plusieurs stagiaires préfèrent aujourd'hui écrire un email plutôt qu'appeler.</li>
  <li><strong>L'écrit professionnel (C2)</strong> : les emails sont rédigés en s'appuyant sur des traducteurs automatiques, avec des formules peu adaptées au registre et des relectures longues.</li>
  <li><strong>Le vocabulaire et les structures de base (C1)</strong> : le vocabulaire métier existe en partie, mais les temps (prétérit / present perfect), les questions et les formules de politesse restent fragiles.</li>
</ul>
<p>Les stagiaires en relation avec des clients expriment en complément un besoin sur la négociation et le traitement des réclamations (C6) ; les chefs de projet un besoin sur les présentations (C5). Tous souhaitent repartir avec des phrases types et des modèles directement réutilisables dans leur poste.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Situations réelles de chaque stagiaire</strong> : les mises en situation sont construites sur les échanges réels du poste (emails anonymisés, appels types, réunions habituelles) ; à défaut, sur l'entreprise fil rouge du support de cours.</li>
  <li><strong>Niveaux hétérogènes (A2 à B1)</strong> : binômes de niveaux mixtes, consignes déclinées en deux niveaux d'exigence, fiches lexique et exercices de remise à niveau sur la plateforme LMS pour les stagiaires les plus fragiles.</li>
  <li><strong>Priorité à l'oral</strong> : au moins la moitié du temps de chaque journée consacrée à la pratique orale (jeux de rôle, simulations d'appels et de réunions, présentations filmées).</li>
  <li><strong>Stagiaires plus avancés</strong> : approfondissement sur la négociation, la nuance et le registre ; rôle d'interlocuteur étranger dans les jeux de rôle.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, supports transmis à l'avance sur demande, casques avec réglage du volume, police agrandie, temps majoré et aménagement de l'évaluation finale sur demande.</li>
</ul>`;

/** 10 mises en situation (diagnostic de départ puis C1 à C6), corrigés formateur. */
export const ANG40_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — Diagnostic de départ : mes usages de l'anglais au travail et mon niveau",
    consigne:
      "1. Listez les situations dans lesquelles vous utilisez l'anglais dans votre poste (emails, appels, visioconférences, réunions, présentations, négociations, lecture de documents) avec, pour chacune, la fréquence, les interlocuteurs et votre aisance de 1 à 5. 2. À l'aide de la grille d'autoévaluation du CECRL, situez votre niveau (A2, B1, B2) en compréhension orale, compréhension écrite, expression orale, interaction orale et expression écrite. 3. Décrivez une situation récente où l'anglais vous a posé une difficulté et ce que vous auriez voulu savoir dire. 4. Fixez trois objectifs personnels mesurables pour les 6 jours de formation.",
    reponseAttendue:
      "Inventaire complet des situations du poste avec fréquence, interlocuteurs et note d'aisance argumentée.\nAutoévaluation par activité langagière, cohérente avec le test de positionnement (profil souvent hétérogène : compréhension écrite supérieure à l'expression orale).\nSituation difficile décrite précisément (contexte, blocage, conséquence) et formulations recherchées identifiées.\nTrois objectifs personnels concrets et vérifiables (ex. « mener seul un appel de suivi de commande de 5 minutes », « rédiger une relance en moins de 10 minutes sans traducteur », « présenter mon service en 3 minutes »).",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 : se présenter et présenter son entreprise à un partenaire étranger",
    consigne:
      "Préparez puis présentez à l'oral (2 à 3 minutes) : 1. Vous-même : nom, poste, missions principales, service, ancienneté, interlocuteurs habituels. 2. Votre entreprise : activité, produits ou services, implantations, effectif, chiffres clés, marchés et clients, ce qui la distingue. 3. Une phrase d'ouverture de small talk et une question à poser à votre interlocuteur. Utilisez au moins une fois le présent simple, le présent continu, le present perfect et le prétérit.",
    reponseAttendue:
      "Présentation de soi structurée : « I'm …, I work as … in the … department. I'm responsible for … I've been with the company for … years. »\nPrésentation de l'entreprise : « We design and manufacture … We employ around … people. Our main markets are … We're currently developing … Last year we launched … »\nTemps justes : présent simple pour les faits permanents, présent continu pour les projets en cours, present perfect pour une durée jusqu'à aujourd'hui (for / since), prétérit pour une date passée.\nSmall talk adapté (voyage, météo, événement professionnel) et question ouverte à l'interlocuteur ; débit posé, chiffres et dates prononcés correctement.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C1 : glossaire métier et structures grammaticales clés",
    consigne:
      "1. Construisez votre glossaire métier personnel de 30 termes (anglais / français / phrase d'exemple tirée de votre poste), classés par thème. 2. Repérez 5 faux amis de votre domaine et donnez la bonne traduction. 3. Corrigez les 10 phrases fournies (temps, questions, prépositions, modaux). 4. Transformez 5 demandes directes en demandes polies (could, would, may).",
    reponseAttendue:
      "Glossaire de 30 termes exacts et utiles au poste (ex. purchase order = bon de commande, lead time = délai d'approvisionnement, invoice = facture, shipment = expédition, quotation = devis), avec phrases d'exemple correctes.\nFaux amis expliqués : actually = en fait (et non actuellement), eventually = finalement, to assist = aider, to attend = assister à, a formation ≠ une formation (training), sensible = raisonnable, delay = retard.\nCorrections justifiées : « I have worked here since 2019 », « Did you receive my email? », « on Monday, at 10 a.m., in March », « We look forward to hearing from you ».\nDemandes polies : « Could you send me the invoice, please? », « Would it be possible to move the meeting to Thursday? », « May I ask who's calling? »",
    points: 20,
  },
  {
    titre: "Exercice 4 — C2 : rédiger un email professionnel complexe",
    consigne:
      "Un client étranger attend une livraison qui aura 10 jours de retard à cause d'un composant manquant. Rédigez l'email (150 à 200 mots) qui : 1. annonce le retard et en donne la cause sans entrer dans des détails internes ; 2. présente des excuses adaptées ; 3. propose deux solutions (livraison partielle immédiate ou livraison complète à une date ferme) ; 4. demande une réponse avant une date ; 5. se termine par une formule adaptée. Soignez l'objet, la structure en paragraphes et les connecteurs.",
    reponseAttendue:
      "Objet explicite (« Order 4512 – revised delivery date »).\nSalutation adaptée (« Dear Ms Weber, »), ouverture qui situe le message (« I am writing regarding your order no. 4512. »).\nAnnonce claire et factuelle (« Unfortunately, due to a delay from one of our suppliers, we will not be able to deliver on 12 November as planned. »), excuses sobres (« Please accept our apologies for any inconvenience this may cause. »).\nDeux solutions numérotées avec dates précises, demande de réponse datée (« Could you let us know which option you prefer by Friday 14 November? »).\nConnecteurs (however, therefore, in the meantime), registre neutre à formel, phrases courtes, formule finale (« Kind regards, ») et signature complète ; 150 à 200 mots, aucune faute bloquante.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C2 : ordre du jour et compte rendu de réunion",
    consigne:
      "1. Rédigez en anglais l'ordre du jour d'une réunion de suivi de projet d'une heure avec un partenaire étranger (date, heure avec fuseau horaire, lieu ou lien, participants, objectifs, 4 points avec durée et responsable). 2. À partir des notes de réunion fournies (en français), rédigez le compte rendu en anglais : participants, points discutés, décisions, actions avec responsable et échéance, date de la prochaine réunion.",
    reponseAttendue:
      "Ordre du jour complet : titre, date, heure avec fuseau (« 10:00 a.m. CET / 9:00 a.m. GMT »), lien de visioconférence, participants, objectif, points numérotés avec durée et responsable (« 1. Project status – 15 min – Thomas »), AOB.\nCompte rendu (minutes) structuré : « Attendees », « Apologies », points discutés résumés au prétérit, décisions (« It was agreed that… »), tableau des action points (action / owner / deadline), prochaine réunion.\nStyle neutre et factuel, voix passive utilisée à bon escient, verbes de rapport (agreed, suggested, confirmed), dates au format non ambigu (12 November 2026).",
    points: 20,
  },
  {
    titre: "Exercice 6 — C3 : appel téléphonique, prendre et laisser un message",
    consigne:
      "Jeu de rôle en binôme, trois appels : 1. Vous recevez l'appel d'un fournisseur qui demande un collègue absent : filtrez l'appel, prenez le message complet (nom épelé, société, numéro, objet, rappel souhaité) sur la fiche message. 2. Vous appelez un client pour confirmer une date de livraison et vous tombez sur sa messagerie : laissez un message vocal clair. 3. Vous appelez un partenaire pour déplacer un rendez-vous en tenant compte du décalage horaire. Rédigez ensuite l'email de confirmation du rendez-vous.",
    reponseAttendue:
      "Accueil professionnel (« Good morning, Lumivia, Sofia speaking. How can I help you? »), filtrage (« May I ask who's calling? », « I'm afraid he's not available at the moment. Can I take a message? »).\nFiche message complète et exacte : nom épelé avec l'alphabet téléphonique, société, numéro relu chiffre par chiffre, objet, rappel souhaité, date et heure de l'appel.\nMessage vocal structuré : identité, objet, demande, coordonnées répétées, remerciement.\nReport de rendez-vous poli (« Would it be possible to postpone our meeting to…? »), décalage horaire vérifié, reformulation finale, email de confirmation court et exact ; demandes de répétition utilisées au besoin (« Could you repeat that, please? », « Could you speak a little more slowly? »).",
    points: 20,
  },
  {
    titre: "Exercice 7 — C3 : préparer et mener une visioconférence",
    consigne:
      "Préparez puis animez une visioconférence de 10 minutes avec deux partenaires étrangers (joués par d'autres stagiaires) : 1. invitation écrite (objet, date et fuseau, lien, ordre du jour) ; 2. ouverture (vérification du son et de l'image, tour de présentation) ; 3. partage d'écran et présentation d'un document ; 4. gestion de deux incidents donnés par le formateur (son coupé, connexion instable) ; 5. clôture avec récapitulatif des décisions et suite à donner.",
    reponseAttendue:
      "Invitation complète et claire, heure exprimée dans les deux fuseaux.\nOuverture maîtrisée : « Can everyone hear me? », « Shall we start? », tour de table.\nPartage d'écran annoncé (« I'm going to share my screen. Can you see the document? »).\nIncidents gérés calmement : « I think you're on mute. », « You're breaking up, could you turn off your camera? », « Let me call you back. ».\nClôture : récapitulatif des décisions et des actions, remerciements, annonce du compte rendu ; tours de parole respectés, politesse des affaires appliquée.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C4 : participer à une réunion, reformuler, argumenter et réfuter avec diplomatie",
    consigne:
      "Réunion de projet jouée en sous-groupes de 4 (président de séance, deux participants, secrétaire) sur un sujet donné (choix d'un fournisseur, modification d'un planning) : 1. le président ouvre la réunion et présente l'ordre du jour ; 2. chaque participant donne son avis avec deux arguments ; 3. chacun reformule au moins une fois l'avis d'un autre ; 4. chacun exprime un accord et un désaccord avec diplomatie ; 5. le président fait émerger une décision et répartit les actions. Les rôles tournent.",
    reponseAttendue:
      "Ouverture et cadrage du président (« Let's get started. The purpose of today's meeting is… »).\nAvis nuancés et argumentés (« In my view… because… », « For example… », « As a result… »).\nReformulations exactes (« If I understand you correctly, you're saying that… », « So what you mean is… »).\nAccord et désaccord diplomatiques (« I see your point, but… », « I'm not sure I agree with that. », « That's a fair point; however… »), interruptions polies (« Sorry to interrupt, but… »).\nDécision explicite et action points répartis (« So, we've agreed to… Thomas will… by Friday. »), temps respecté.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C5 : présentation professionnelle appuyée sur des diapositives",
    consigne:
      "Préparez et présentez en 5 minutes, avec 4 à 6 diapositives, un sujet de votre poste (un projet, les résultats de votre service, un nouveau produit, un processus). Votre présentation doit comprendre : une introduction (accroche, objectif, plan), des transitions explicites, la description d'au moins un graphique ou d'une tendance chiffrée, une conclusion avec appel à l'action, puis 3 minutes de questions-réponses avec le groupe.",
    reponseAttendue:
      "Diapositives sobres : une idée par diapositive, titres informatifs, peu de texte, chiffres lisibles, graphique simple.\nIntroduction : accroche, objectif, plan (« Today I'd like to talk about… I've divided my presentation into three parts. »).\nTransitions (« Let's move on to… », « This brings me to… »), description de tendance exacte (« Sales rose by 12% between January and June, then levelled off. »).\nConclusion et appel à l'action (« To sum up… I'd like you to… »), gestion des questions (« That's a good question. », « Let me come back to you on that. »).\nDébit, voix, regard et posture adaptés ; durée respectée.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C6 : négocier et traiter une réclamation d'un partenaire international",
    consigne:
      "Jeu de rôle en binôme (10 minutes), puis écrit : 1. Un client étranger appelle pour une réclamation (produits livrés non conformes) et menace de passer à la concurrence. Écoutez, reformulez, excusez-vous, proposez des solutions. 2. Le client demande une remise de 15 % ; votre marge de manœuvre est de 8 % sous conditions. Traitez l'objection prix, faites une contre-proposition conditionnelle et concluez un accord. 3. Rédigez l'email qui confirme l'accord.",
    reponseAttendue:
      "Écoute active et empathie (« I'm sorry to hear that. I completely understand your frustration. »), reformulation de la réclamation, questions de précision, excuses et engagement (« We'll replace the defective units at our expense. »).\nObjection prix traitée par la méthode écouter – reformuler – valider – répondre ; contre-proposition conditionnelle (« If you could confirm an order of 500 units, we could offer a 6% discount. », « provided that… »).\nAccord récapitulé (« So, to summarise, we've agreed on… »).\nEmail de confirmation précis : conditions, quantités, remise, délais, prochaine étape ; ton ferme et courtois tout au long de l'échange.",
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
  ["« I ___ for this company since 2019. »", ["work", "worked", "have worked", "am working"], 2],
  ["Quelle est la traduction de « bon de commande » ?", ["Purchase order", "Order good", "Command bond", "Delivery note"], 0],
  ["« Actually » signifie :", ["Actuellement", "En fait", "Activement", "Finalement"], 1],
  ["Quelle question est correcte ?", ["Where you work?", "Where do you work?", "Where does you work?", "Where you are working?"], 1],
  ["« We ___ a new product range last year. »", ["launch", "have launched", "are launching", "launched"], 3],
  ["Quelle formule est la plus polie pour une demande ?", ["Send me the file.", "I want the file.", "Could you send me the file, please?", "You must send the file."], 2],
  ["« Delay » signifie :", ["Un retard", "Un délai de livraison prévu", "Une livraison", "Un départ"], 0],
  ["« The meeting is ___ Monday ___ 10 a.m. »", ["in / on", "on / at", "at / in", "on / in"], 1],
  ["Pour parler d'un projet en cours en ce moment, on utilise :", ["Le prétérit", "Le present perfect", "Le présent continu", "Le présent simple"], 2],
  ["Comment dit-on « une formation » au sens d'action de formation professionnelle ?", ["A formation", "A training course", "A form", "A graduation"], 1],
];

const QCM_C2: Q[] = [
  ["Quelle salutation convient à un premier email formel à une personne dont on connaît le nom ?", ["Hi buddy,", "Hello,", "Dear Ms Weber,", "Yo Anna,"], 2],
  ["Quelle formule de fin est adaptée à un email professionnel neutre ?", ["Kind regards,", "Love,", "Cheers mate,", "Bye,"], 0],
  ["« I am writing ___ your order no. 4512. »", ["about to", "regarding", "for to", "with"], 1],
  ["Quel connecteur introduit une opposition ?", ["Therefore", "Furthermore", "As a result", "However"], 3],
  ["Les « minutes » d'une réunion sont :", ["La durée de la réunion", "Le compte rendu de la réunion", "L'ordre du jour", "Les participants"], 1],
  ["Dans un ordre du jour, « AOB » signifie :", ["Any other business : questions diverses", "Action on board", "Agenda of the board", "After office break"], 0],
  ["« Please find ___ the quotation. »", ["attached", "attach", "attaching", "to attach"], 0],
  ["Une « executive summary » est :", ["Un contrat de direction", "Un email informel", "Une synthèse courte placée en tête d'un document", "Un organigramme"], 2],
  ["Quelle phrase annonce poliment une mauvaise nouvelle ?", ["You will not get your order.", "Unfortunately, we will not be able to deliver on time.", "Your order is late, sorry.", "Bad news: no delivery."], 1],
  ["Pour demander une réponse avant une date, on écrit :", ["Answer me quickly.", "I need it now.", "Reply or else.", "Could you let us know by Friday?"], 3],
];

const QCM_C3: Q[] = [
  ["Comment répondre au téléphone de façon professionnelle ?", ["Yes?", "Who are you?", "Good morning, Lumivia, Sofia speaking.", "Hello, what do you want?"], 2],
  ["« Can I take a message? » signifie :", ["Puis-je prendre un message ?", "Pouvez-vous me rappeler ?", "Je vous passe la personne", "Le message est arrivé"], 0],
  ["Pour demander à l'interlocuteur de patienter, on dit :", ["Wait.", "Could you hold on a moment, please?", "Stop talking.", "Don't move."], 1],
  ["Pour faire répéter poliment :", ["What?", "Repeat!", "Huh?", "Sorry, could you repeat that, please?"], 3],
  ["En visioconférence, « You're on mute » signifie :", ["Votre micro est coupé", "Votre caméra est coupée", "Vous êtes en retard", "Vous parlez trop fort"], 0],
  ["« You're breaking up » signifie :", ["Vous raccrochez", "Vous rompez le contrat", "La connexion coupe, votre voix est hachée", "Vous partez en vacances"], 2],
  ["Pour épeler un nom de façon fiable au téléphone, on utilise :", ["L'alphabet phonétique international", "L'alphabet téléphonique (A for Alpha, B for Bravo…)", "Des chiffres", "Des émojis"], 1],
  ["Pour proposer de déplacer un rendez-vous :", ["The meeting is cancelled.", "Change the meeting.", "I can't come, bye.", "Would it be possible to postpone our meeting to Thursday?"], 3],
  ["« I'll put you through » signifie :", ["Je vous passe la personne demandée", "Je vous raccroche au nez", "Je vous rappelle", "Je vous envoie un email"], 0],
  ["Quelle phrase clôt poliment un appel ?", ["OK, bye.", "Thank you for calling. Have a nice day.", "That's all.", "Finished."], 1],
];

const QCM_C4: Q[] = [
  ["Pour ouvrir une réunion, le président dit :", ["Let's get started. The purpose of today's meeting is…", "Everybody quiet!", "Meeting begin.", "Go!"], 0],
  ["Quelle expression reformule l'avis d'un participant ?", ["You are wrong.", "If I understand you correctly, you're saying that…", "Next point.", "I don't care."], 1],
  ["Quelle formule exprime un désaccord avec diplomatie ?", ["That's stupid.", "No way.", "I see your point, but I'm not sure that's the best option.", "You don't understand."], 2],
  ["Pour interrompre poliment :", ["Stop!", "Shut up, please.", "Listen to me.", "Sorry to interrupt, but…"], 3],
  ["« I couldn't agree more » signifie :", ["Je suis tout à fait d'accord", "Je ne suis pas d'accord", "Je ne peux pas répondre", "Je ne suis pas sûr"], 0],
  ["Quel connecteur introduit une conséquence ?", ["Although", "As a result", "Despite", "Whereas"], 1],
  ["Pour faire une suggestion :", ["You must change the plan.", "Change the plan.", "Why don't we review the schedule?", "The plan is bad."], 2],
  ["« Action points » désigne :", ["Les points de fidélité", "Les points de désaccord", "Les pauses", "Les actions à mener avec responsable et échéance"], 3],
  ["Pour ramener une réunion à l'ordre du jour :", ["Let's get back to the main point.", "Be quiet.", "This is boring.", "Change the subject."], 0],
  ["Dans les réunions britanniques, « That's an interesting idea » peut souvent signifier :", ["Un enthousiasme total", "Une réserve polie, voire un désaccord", "Une acceptation immédiate", "Une demande de pause"], 1],
];

const QCM_C5: Q[] = [
  ["Quelle phrase annonce le plan d'une présentation ?", ["I've divided my presentation into three parts.", "That's all.", "Any questions?", "Let me finish."], 0],
  ["« Signposting » désigne :", ["Les panneaux de signalisation de la salle", "Les expressions de transition qui guident l'auditoire", "La signature du support", "La liste des participants"], 1],
  ["« Sales rose sharply » signifie :", ["Les ventes ont légèrement baissé", "Les ventes sont stables", "Les ventes ont fortement augmenté", "Les ventes ont atteint un pic"], 2],
  ["« Sales increased ___ 12%. » (écart de 12 points)", ["of", "at", "to", "by"], 3],
  ["Une bonne diapositive contient :", ["Une idée principale, peu de texte et un titre informatif", "Tout le texte que l'on va dire", "Le plus d'animations possible", "Des paragraphes complets"], 0],
  ["Pour passer à la partie suivante :", ["Stop.", "Let's move on to the next point.", "Next slide please, quick.", "Forget that."], 1],
  ["« To level off » signifie :", ["Chuter", "Doubler", "Se stabiliser", "Fluctuer"], 2],
  ["Face à une question à laquelle on ne sait pas répondre :", ["I don't know.", "That's not my problem.", "Bad question.", "That's a good question. Let me check and come back to you."], 3],
  ["Pour conclure une présentation :", ["To sum up, …", "To begin with, …", "Firstly, …", "By the way, …"], 0],
  ["La règle de trois en présentation consiste à :", ["Parler trois minutes au maximum", "Regrouper le message en trois idées clés", "Utiliser trois couleurs", "Répondre à trois questions"], 1],
];

const QCM_C6: Q[] = [
  ["« Quotation » signifie :", ["Une citation de presse", "Un devis", "Un quota", "Une facture"], 1],
  ["Quelle phrase formule une contre-proposition conditionnelle ?", ["Take it or leave it.", "No discount.", "If you increase the order, we could offer a 5% discount.", "We never negotiate."], 2],
  ["« Provided that » signifie :", ["À condition que", "Bien que", "Parce que", "Avant que"], 0],
  ["Première étape du traitement d'une objection :", ["Baisser immédiatement le prix", "Contredire le client", "Changer de sujet", "Écouter et reformuler l'objection"], 3],
  ["Pour exprimer de l'empathie face à une réclamation :", ["It's not our fault.", "I'm sorry to hear that. I understand your concern.", "Calm down.", "That never happens."], 1],
  ["« Lead time » désigne :", ["Le délai d'approvisionnement ou de livraison", "Le temps de réunion", "Le chef d'équipe", "Le temps de pause"], 0],
  ["La BATNA est :", ["Le prix catalogue", "Le premier prix proposé", "La meilleure solution de repli si la négociation échoue", "Le nom du contrat"], 2],
  ["Pour récapituler un accord :", ["Bye.", "We'll see.", "Maybe later.", "So, to summarise, we've agreed on…"], 3],
  ["« Terms of payment » désigne :", ["Les conditions de paiement", "Les termes techniques", "La durée du contrat", "Le mode de livraison"], 0],
  ["Après un accord négocié par téléphone, il faut :", ["Ne rien faire", "Le confirmer par écrit avec les conditions précises", "Attendre la facture", "Rappeler le lendemain sans rien écrire"], 1],
];

export const ANG40_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Vocabulaire métier et structures grammaticales clés", QCM_C1),
  qcmExercice("QCM C2 — Écrits professionnels", QCM_C2),
  qcmExercice("QCM C3 — Téléphone et visioconférence", QCM_C3),
  qcmExercice("QCM C4 — Réunions professionnelles", QCM_C4),
  qcmExercice("QCM C5 — Présentations professionnelles", QCM_C5),
  qcmExercice("QCM C6 — Négociation, objections et réclamations", QCM_C6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (diagnostic puis C1 à C6), alignées sur les
 * 10 questions de positionnement et sur les copies de `anglaisPro40hHumanized.ts` ; les 6 QCM ensuite.
 */
export const ANG40_EXERCICES_COMPLETS: AIContentExercise[] = [...ANG40_EXERCICES, ...ANG40_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Anglais Professionnel – 40 h » (6 chapitres, un par jour)</strong> : fondamentaux, écrits professionnels, téléphone et visioconférence, réunions, présentations, négociation et réclamations ; quiz et cas pratique corrigés à la fin de chaque chapitre.</li>
  <li><strong>Cahier d'exercices</strong> : test de positionnement, 10 mises en situation professionnelles (diagnostic de départ puis C1 à C6) ; <strong>corrigés formateur</strong> remis après correction.</li>
  <li><strong>6 QCM de 10 questions</strong>, un par compétence (C1 à C6), corrigés.</li>
  <li><strong>Fiches lexique</strong> par fonction (achats, ventes, logistique, finance, ressources humaines, production) et par situation (téléphone, réunion, présentation, négociation).</li>
  <li><strong>Modèles</strong> : emails types, ordre du jour, compte rendu de réunion, fiche message téléphonique, invitation à une visioconférence, trame de présentation, fiche de préparation de négociation.</li>
  <li><strong>Grille d'acquisition des compétences</strong> C1 à C6 et plan de progression individuel.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Salle équipée dans les locaux de l'entreprise</strong> : vidéoprojecteur interactif, tableau blanc, système audio.</li>
  <li><strong>Matériel</strong> : ordinateurs portables, casques avec micro pour les simulations d'appels et les activités d'écoute.</li>
  <li><strong>Plateforme LMS</strong> : supports, fiches lexique, exercices en autonomie entre les séances.</li>
  <li><strong>Supports authentiques</strong> : études de cas d'entreprises anglophones, podcasts métiers, presse économique, extraits vidéo de réunions.</li>
  <li><strong>Outils de visioconférence</strong> (Microsoft Teams, Zoom) pour les simulations de réunions à distance.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>Conseil de l'Europe — CECRL</strong> : <a href="https://www.coe.int/fr/web/common-european-framework-reference-languages">https://www.coe.int/fr/web/common-european-framework-reference-languages</a> — descripteurs des niveaux A1 à C2 et grille d'autoévaluation.</li>
  <li><strong>BBC Learning English</strong> : <a href="https://www.bbc.co.uk/learningenglish">https://www.bbc.co.uk/learningenglish</a> — vidéos, podcasts et exercices, dont des séries consacrées à l'anglais des affaires.</li>
  <li><strong>British Council — LearnEnglish</strong> : <a href="https://learnenglish.britishcouncil.org/">https://learnenglish.britishcouncil.org/</a> — grammaire, vocabulaire et anglais professionnel.</li>
  <li><strong>Oxford Learner's Dictionaries</strong> : <a href="https://www.oxfordlearnersdictionaries.com/">https://www.oxfordlearnersdictionaries.com/</a> — définitions, prononciation audio britannique et américaine, exemples.</li>
  <li><strong>Plain English Campaign</strong> : <a href="https://www.plainenglish.co.uk/">https://www.plainenglish.co.uk/</a> — guides gratuits pour écrire de façon claire et concise.</li>
</ul>`;

const ANG40_VIDEOS = [
  { title: "Se présenter en anglais au travail", description: "Présenter son poste, ses missions et son entreprise.", url: "https://www.youtube.com/results?search_query=introduce+yourself+professional+english" },
  { title: "Les faux amis anglais-français à connaître", description: "Actually, eventually, sensible, to attend…", url: "https://www.youtube.com/results?search_query=faux+amis+anglais+fran%C3%A7ais" },
  { title: "Rédiger un email professionnel en anglais", description: "Structure, formules d'ouverture et de clôture.", url: "https://www.youtube.com/results?search_query=how+to+write+a+professional+email+in+english" },
  { title: "Rédiger un compte rendu de réunion (minutes)", description: "Décisions, actions, responsables et échéances.", url: "https://www.youtube.com/results?search_query=how+to+write+meeting+minutes+english" },
  { title: "Téléphoner en anglais", description: "Accueillir, filtrer, prendre un message.", url: "https://www.youtube.com/results?search_query=telephone+english+phrases+business" },
  { title: "Anglais pour les visioconférences", description: "Expressions pour Teams et Zoom, incidents techniques.", url: "https://www.youtube.com/results?search_query=english+for+video+conferences+phrases" },
  { title: "Exprimer son accord et son désaccord en réunion", description: "Nuancer, reformuler, réfuter avec diplomatie.", url: "https://www.youtube.com/results?search_query=agreeing+and+disagreeing+in+meetings+english" },
  { title: "Faire une présentation en anglais", description: "Introduction, transitions, conclusion, questions.", url: "https://www.youtube.com/results?search_query=business+presentation+english+signposting" },
  { title: "Décrire un graphique en anglais", description: "Tendances, hausses, baisses, prépositions.", url: "https://www.youtube.com/results?search_query=describing+graphs+and+trends+english" },
  { title: "Négocier en anglais", description: "Offre, contre-proposition, objections, accord.", url: "https://www.youtube.com/results?search_query=negotiation+english+phrases+business" },
];

export const ANG40_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: ANG40_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: ANG40_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement début / fin
// ---------------------------------------------------------------------------
export const ANG40_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "« She ___ in the sales department. »", options: ["work", "works", "working", "is work"], correctIndex: 1 },
  { question: "Quelle est la traduction de « facture » ?", options: ["Factory", "Bill of lading", "Invoice", "Fact"], correctIndex: 2 },
  { question: "« We ___ the contract yesterday. »", options: ["signed", "have signed", "sign", "are signing"], correctIndex: 0 },
  { question: "Quelle formule termine un email professionnel ?", options: ["See ya", "Love", "Kisses", "Kind regards"], correctIndex: 3 },
  { question: "« Could you ___ me the report? »", options: ["sending", "send", "sent", "to send"], correctIndex: 1 },
  { question: "Au téléphone, « Hold on, please » signifie :", options: ["Raccrochez", "Rappelez plus tard", "Ne quittez pas", "Parlez plus fort"], correctIndex: 2 },
  { question: "« Eventually » signifie :", options: ["Finalement", "Éventuellement", "Évidemment", "Souvent"], correctIndex: 0 },
  { question: "Quelle phrase exprime poliment un désaccord ?", options: ["You're wrong.", "No.", "Bad idea.", "I'm afraid I don't agree."], correctIndex: 3 },
  { question: "« Sales went up » signifie :", options: ["Les ventes ont baissé", "Les ventes ont augmenté", "Les ventes sont stables", "Les ventes sont arrêtées"], correctIndex: 1 },
  { question: "« Discount » signifie :", options: ["Un décompte", "Une remise", "Un rabais de stock", "Un comptoir"], correctIndex: 1 },
];

export const ANG40_QCM_FIN: AIQCMQuestion[] = [
  { question: "« I ___ here for five years. »", options: ["work", "am working", "have been working", "worked"], correctIndex: 2 },
  { question: "Quelle phrase annonce un retard de façon professionnelle ?", options: ["Unfortunately, the delivery will be delayed by one week.", "Your stuff is late.", "No delivery this week, sorry.", "Delivery problem."], correctIndex: 0 },
  { question: "Dans un compte rendu, la rubrique « Action points » contient :", options: ["Les participants", "Le lieu de la réunion", "Les points de désaccord", "Les actions, leurs responsables et leurs échéances"], correctIndex: 3 },
  { question: "« I'll put you through to Mr Davies » signifie :", options: ["Je vous mets en attente", "Je vous passe M. Davies", "Je rappelle M. Davies", "M. Davies est absent"], correctIndex: 1 },
  { question: "Quelle expression reformule ce qu'a dit un interlocuteur ?", options: ["Next.", "I disagree.", "So what you're saying is…", "Let's vote."], correctIndex: 2 },
  { question: "« That's a fair point; however… » sert à :", options: ["Reconnaître un argument avant de nuancer", "Mettre fin à la réunion", "Demander une pause", "Présenter l'ordre du jour"], correctIndex: 0 },
  { question: "« Profits fell slightly » signifie :", options: ["Les bénéfices ont chuté fortement", "Les bénéfices ont doublé", "Les bénéfices sont stables", "Les bénéfices ont légèrement baissé"], correctIndex: 3 },
  { question: "Quelle phrase formule une contre-proposition ?", options: ["No.", "If you sign today, we could include free delivery.", "That's our final price, forever.", "We'll think about it next year."], correctIndex: 1 },
  { question: "Face à une réclamation, la première étape est :", options: ["Écouter et reformuler le problème", "Proposer une remise immédiatement", "Contester la réclamation", "Transférer l'appel sans explication"], correctIndex: 0 },
  { question: "« Could we move the call to 3 p.m. CET? » sert à :", options: ["Annuler l'appel", "Confirmer l'appel", "Proposer de déplacer l'appel en précisant le fuseau horaire", "Demander le numéro"], correctIndex: 2 },
];

export const ANG40_EVAL_PACK: AIEvalPack = {
  qcmDebut: ANG40_QCM_DEBUT,
  qcmFin: ANG40_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du jour 3) — suivi d'une commande avec un distributeur britannique",
    contexte:
      "Vous travaillez à l'administration des ventes d'une PME industrielle française. Votre distributeur britannique vous a écrit pour signaler qu'une commande de 300 luminaires partira avec une semaine de retard selon votre transporteur, et vous demande un point par téléphone. Vous devez préparer l'appel, le mener, puis confirmer par écrit.",
    questions: [
      { question: "Rédigez les trois premières répliques de l'appel (accueil, présentation, objet de l'appel).", reponseAttendue: "Accueil et identification (« Good morning, this is Sofia Benali from Lumivia. »), vérification de la disponibilité de l'interlocuteur (« Is this a good time to talk? »), objet clairement annoncé (« I'm calling about order 4512 and the delivery date. »), registre poli et direct.", points: 5 },
      { question: "Comment faites-vous répéter puis vérifiez-vous un numéro de commande et une date mal compris ?", reponseAttendue: "« Sorry, could you repeat the order number, please? », « Could you spell that for me? », relecture chiffre par chiffre et date au format non ambigu (« So that's four-five-one-two, delivery on Tuesday 18 November, is that right? »).", points: 5 },
      { question: "Rédigez l'email de confirmation de l'appel (80 à 120 mots).", reponseAttendue: "Objet précis, salutation adaptée, rappel de l'appel (« Further to our phone call this morning… »), nouvelle date ferme, solution retenue, excuses sobres, prochaine étape, formule de fin « Kind regards » et signature complète ; phrases courtes, temps justes.", points: 5 },
      { question: "Le distributeur se plaint vivement du retard. Quelles phrases utilisez-vous pour désamorcer la situation ?", reponseAttendue: "Empathie et excuses (« I completely understand, and I'm very sorry for the inconvenience. »), reformulation (« If I understand correctly, your customer needs the products before the 20th. »), proposition concrète (« What we can do is ship 150 units by express this week. »), engagement de suivi.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — mise en situation orale et épreuve écrite (jour 6), grille d'acquisition des compétences C1 à C6",
    exercices: [
      {
        titre: "Partie 1 — Présentation de soi et de son entreprise (C1, oral)",
        consigne: "Présentez-vous et présentez votre entreprise à un partenaire étranger joué par le formateur (3 minutes), puis répondez à ses questions.",
        reponseAttendue: "Présentation structurée, vocabulaire métier précis, temps grammaticaux justes (présent, present perfect, prétérit), chiffres et dates corrects, small talk adapté, réponses claires aux questions.",
        points: 20,
      },
      {
        titre: "Partie 2 — Email complexe et compte rendu (C2, écrit)",
        consigne: "Rédigez un email de réponse à une réclamation (150 mots) et le compte rendu d'une courte réunion à partir de notes fournies.",
        reponseAttendue: "Email structuré (objet, salutation, excuses, solutions, demande de réponse datée, formule de fin), registre adapté, connecteurs ; compte rendu avec participants, décisions et action points (responsable, échéance).",
        points: 20,
      },
      {
        titre: "Partie 3 — Appel téléphonique et visioconférence (C3, oral)",
        consigne: "Simulation d'un appel entrant (prise de message) puis d'un report de rendez-vous en visioconférence, avec un incident technique.",
        reponseAttendue: "Accueil professionnel, filtrage, message complet et exact (nom épelé, numéro relu), demandes de répétition, report de rendez-vous poli avec fuseau horaire, incident géré avec les expressions adaptées, clôture courtoise.",
        points: 20,
      },
      {
        titre: "Partie 4 — Réunion et présentation (C4, C5, oral)",
        consigne: "Participez à une réunion de 10 minutes (donner son avis, reformuler, approuver, réfuter), puis présentez en 3 minutes une diapositive chiffrée.",
        reponseAttendue: "Avis argumenté, reformulations exactes, accord et désaccord diplomatiques, interruption polie ; présentation structurée (introduction, transition, description de tendance, conclusion), diapositive lisible, réponse aux questions.",
        points: 20,
      },
      {
        titre: "Partie 5 — Négociation et traitement d'une réclamation (C6, oral)",
        consigne: "Jeu de rôle avec le formateur : un client étranger formule une réclamation et une demande de remise. Traitez l'objection et concluez un accord, puis récapitulez-le.",
        reponseAttendue: "Écoute, reformulation, empathie, solutions concrètes ; objection prix traitée avec méthode ; contre-proposition conditionnelle (if / provided that) ; accord récapitulé précisément ; ton ferme et courtois.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const ANG40_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000037385728/",
      titreLien: "Légifrance — Code du travail, actions concourant au développement des compétences",
      titre: "Définition de l'action de formation et obligations de l'organisme",
      date: "Octobre 2026",
      commentaire: "Articles L. 6313-1 et suivants : l'action de formation est un parcours pédagogique permettant d'atteindre un objectif professionnel ; programme, convention avec l'entreprise, émargement, attestation de fin de formation et certificat de réalisation.",
      exploitation: "Preuve : fiche mémo archivée au dossier qualité. Action : vérification de la convention, du programme et des documents de fin de formation remis à l'entreprise et aux stagiaires.",
    },
    {
      lien: "https://travail-emploi.gouv.fr/",
      titreLien: "Ministère du Travail — référentiel national qualité",
      titre: "Évolution du référentiel national qualité au 1er novembre 2026",
      date: "Novembre 2026",
      commentaire: "Le référentiel national qualité applicable aux organismes de formation évolue au 1er novembre 2026 ; suivi des indicateurs relatifs à l'analyse des besoins, au positionnement, à l'évaluation des acquis et à la satisfaction.",
      exploitation: "Preuve : note interne datée. Action : mise à jour de la procédure d'analyse des besoins et du test de positionnement de la formation.",
    },
    {
      lien: "https://www.cnil.fr/fr/reglement-europeen-protection-donnees",
      titreLien: "CNIL — RGPD",
      titre: "Données personnelles des stagiaires et enregistrements des mises en situation",
      date: "Septembre 2026",
      commentaire: "Les présentations filmées et les simulations d'appels enregistrées contiennent des données personnelles (image, voix) : information préalable, finalité pédagogique, durée de conservation limitée, suppression après le débriefing.",
      exploitation: "Preuve : mention d'information ajoutée au livret d'accueil. Action : suppression des vidéos à l'issue du jour 5.",
    },
    {
      lien: "https://agefiph.fr/",
      titreLien: "Agefiph — compensation du handicap en formation",
      titre: "Accueil des personnes en situation de handicap en formation",
      date: "Juillet 2026",
      commentaire: "Aménagements possibles en formation de langue : supports adaptés, réglage audio, temps majoré, aménagement des épreuves orales ; rôle du référent handicap.",
      exploitation: "Preuve : question systématique dans l'analyse des besoins. Action : procédure d'adaptation appliquée à l'évaluation finale.",
    },
  ],
  metier: [
    {
      lien: "https://www.coe.int/fr/web/common-european-framework-reference-languages",
      titreLien: "Conseil de l'Europe — CECRL et volume complémentaire",
      titre: "Descripteurs des niveaux et activités de médiation",
      date: "Octobre 2026",
      commentaire: "Le volume complémentaire du CECRL enrichit les descripteurs (médiation, interaction en ligne) : utile pour décrire le niveau visé dans les situations de visioconférence et de réunion.",
      exploitation: "Preuve : grille de positionnement mise à jour. Action : intégration des descripteurs d'interaction en ligne dans la grille d'acquisition (C3, C4).",
    },
    {
      lien: "https://www.bbc.co.uk/learningenglish",
      titreLien: "BBC Learning English",
      titre: "Ressources audio et vidéo d'anglais des affaires",
      date: "Septembre 2026",
      commentaire: "Séries courtes sur l'anglais au travail (réunions, emails, négociation) exploitables en autonomie entre les séances.",
      exploitation: "Preuve : sélection de ressources déposée sur la plateforme LMS. Action : un épisode proposé chaque soir en travail personnel.",
    },
    {
      lien: "https://www.plainenglish.co.uk/",
      titreLien: "Plain English Campaign",
      titre: "Écrire un anglais clair et concis",
      date: "Août 2026",
      commentaire: "Principes de rédaction claire (phrases courtes, voix active, vocabulaire simple) applicables aux emails et aux comptes rendus.",
      exploitation: "Preuve : check-list de relecture ajoutée au chapitre 2. Action : relecture des emails des stagiaires avec la check-list (C2).",
    },
  ],
  technologique: [
    {
      lien: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689",
      titreLien: "EUR-Lex — règlement (UE) 2024/1689 sur l'intelligence artificielle",
      titre: "Traducteurs automatiques et assistants d'écriture : usage encadré",
      date: "Octobre 2026",
      commentaire: "Les outils de traduction et de rédaction assistée sont largement utilisés par les stagiaires ; obligations de transparence et de maîtrise de l'IA, vigilance sur la confidentialité des données de l'entreprise copiées dans ces outils.",
      exploitation: "Preuve : fiche « bon usage des traducteurs » remise aux stagiaires. Action : exercice de relecture critique d'un email traduit automatiquement (C2).",
    },
    {
      lien: "https://support.microsoft.com/fr-fr/teams",
      titreLien: "Microsoft Teams — aide",
      titre: "Sous-titres en direct et traduction en réunion",
      date: "Septembre 2026",
      commentaire: "Les sous-titres en direct et la traduction des sous-titres dans les outils de visioconférence modifient la pratique des réunions internationales : aide à la compréhension, mais vérification nécessaire des chiffres et des noms propres.",
      exploitation: "Preuve : démonstration intégrée au jour 3. Action : simulation de visioconférence avec sous-titres activés puis désactivés (C3).",
    },
    {
      lien: "https://support.zoom.com/hc/fr",
      titreLien: "Zoom — centre d'aide",
      titre: "Fonctions de visioconférence utiles en réunion",
      date: "Août 2026",
      commentaire: "Partage d'écran, salles de sous-groupes, lever la main, réactions : vocabulaire et usages pratiqués lors des simulations.",
      exploitation: "Preuve : fiche vocabulaire visioconférence mise à jour. Action : utilisation des salles de sous-groupes pour les jeux de rôle en réunion (C4).",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedANG40AICaches(f: FormationInfo = FORMATION_ANG40): void {
  try {
    setCachedContentPack(f, ANG40_CONTENT_PACK);
    setCachedEvalPack(f, ANG40_EVAL_PACK);
    setCachedVeillePack(f, ANG40_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
