/**
 * Preset complet « Techniques de vente dans le secteur des travaux énergétiques – 35 h » — formation
 * professionnelle NON certifiante (catégorie « autres formations professionnelles » du BPF, spécialité 227
 * « Énergie, génie climatique »), telle que déclarée au BPF 2025 de l'organisme : salariés d'employeurs
 * privés, financement OPCO au titre du plan de développement des compétences, présentiel.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - Formation 35 h (5 jours de 7 h) : J1 C1 cadre technique et réglementaire, J2 C2 découverte des
 *    besoins, J3 C3 argumentaire et proposition, J4 C4 objections + C5 prospection sans démarchage
 *    téléphonique, J5 C6 conclusion et fidélisation + évaluation finale et coaching personnalisé
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées (diagnostic de départ puis
 *    C1 à C6) et 6 QCM de 10 questions, un par compétence
 *  - Pack évaluation : QCM de positionnement début / fin, cas intermédiaire, évaluation finale
 *    interne (jeu de rôle filmé ou observé + dossier de vente)
 *  - Pack veille (réglementaire / métier / technologique)
 * Fil rouge : Thermia Rénov, SAS FICTIVE de rénovation énergétique (Saint-Genis-Laval) ; tous ses
 * chiffres sont fictifs. Les barèmes des aides ne sont jamais chiffrés : ils changent souvent et se
 * vérifient sur france-renov.gouv.fr / service-public.fr.
 * Le support de cours est dans `ventesEnergie35h/` ; les réponses propres à chaque stagiaire dans
 * `ventesEnergie35hHumanized.ts`.
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
export const FORMATION_TVTE: FormationInfo = {
  intitule: "Techniques de vente dans le secteur des travaux énergétiques – 35 h",
  codeRNCP: "",
  objectifs:
    "Formation professionnelle non certifiante. Objectif général : vendre des travaux de rénovation énergétique (isolation, pompe à chaleur, chauffe-eau thermodynamique, solaire, ventilation) de façon efficace, loyale et conforme à la réglementation, auprès des particuliers comme des professionnels.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- C1 — Situer l'offre de travaux énergétiques dans son cadre technique et réglementaire : transition énergétique, DPE et audit énergétique, qualification RGE, principaux gestes de travaux, aides publiques (MaPrimeRénov', CEE, éco-PTZ, TVA à taux réduit, aides locales) et rôle de Mon Accompagnateur Rénov'.\n- C2 — Identifier les besoins et attentes des clients particuliers (B2C) et professionnels (B2B) : entretien de découverte, écoute active, questionnement, motivations d'achat (SONCAS), visite technique, typologies de logements et de bâtiments tertiaires, décret tertiaire.\n- C3 — Élaborer un argumentaire et une proposition commerciale adaptée : méthode CAP / BAC, bénéfices économiques et environnementaux, reste à charge, temps de retour, devis conforme.\n- C4 — Négocier et traiter les objections (prix, confiance, délai, aides, technique) par la reformulation et des méthodes structurées.\n- C5 — Prospecter et développer un portefeuille clients dans le respect de l'interdiction du démarchage téléphonique en rénovation énergétique (loi n° 2020-901 du 24 juillet 2020) : prescripteurs, partenariats, salons, parrainage, réseaux sociaux, site, avis clients, RGPD.\n- C6 — Conclure la vente et fidéliser : closing, contrat hors établissement conforme (droit de rétractation de 14 jours, aucun paiement avant 7 jours, formulaire de rétractation), suivi de chantier, réception, satisfaction et recommandation.",
  prerequis:
    "Aucun prérequis de diplôme. Exercer ou être appelé(e) à exercer une fonction commerciale ou de conseil client dans une entreprise de travaux énergétiques (commercial, conseiller en rénovation énergétique, technico-commercial, assistant commercial). Savoir lire un devis et utiliser un tableur simple.",
  duree: "35 heures réparties sur 5 jours (7 h/jour)",
  modalites: "présentiel",
  tarif: "Sur devis",
  programme:
    "JOUR 1 — C1 : SITUER L'OFFRE DE TRAVAUX ÉNERGÉTIQUES DANS SON CADRE (7 h)\nAccueil, présentation des objectifs, test de positionnement. Transition énergétique et enjeux pour les clients ; DPE (étiquettes A à G, opposabilité), audit énergétique, calendrier d'interdiction de location des passoires thermiques ; qualification RGE et ses organismes ; principaux gestes : isolation des combles, des murs et des planchers, pompe à chaleur, chauffe-eau thermodynamique, solaire thermique et photovoltaïque, ventilation ; panorama des aides (MaPrimeRénov', CEE, éco-PTZ, TVA à taux réduit, aides locales) et rôle de Mon Accompagnateur Rénov'. Mises en situation : diagnostic de sa pratique commerciale ; situer le projet de M. et Mme Ferrand ; construire le plan de financement de principe.\n\nJOUR 2 — C2 : IDENTIFIER LES BESOINS DES CLIENTS B2C ET B2B (7 h)\nÉtapes de l'entretien de vente ; préparation ; écoute active, questions ouvertes, reformulation ; motivations d'achat (SONCAS) ; visite technique et relevés ; typologies de logements (maison individuelle, copropriété) et de bâtiments tertiaires ; besoins des professionnels et décret tertiaire. Mises en situation : entretien de découverte filmé avec les Ferrand ; analyse du besoin de la SCI Les Tilleuls.\n\nJOUR 3 — C3 : ÉLABORER L'ARGUMENTAIRE ET LA PROPOSITION COMMERCIALE (7 h)\nCaractéristiques, avantages, preuves (CAP) et bénéfices client (BAC) ; argumenter sur le confort, les économies, la valeur du bien et l'environnement sans promesse invérifiable ; calcul du reste à charge et du temps de retour ; structure d'une proposition ; mentions du devis ; présentation orale de la proposition. Mises en situation : argumentaire chiffré ; proposition commerciale et devis conforme.\n\nJOUR 4 — C4 : NÉGOCIER ET TRAITER LES OBJECTIONS · C5 : PROSPECTER DANS LE RESPECT DE LA RÉGLEMENTATION (7 h)\nC4 (3 h 30) : typologie des objections (prix, confiance et fraudes, délai, aides, technique), écoute et reformulation, méthodes de traitement, concessions et contreparties, posture de conseil. Jeux de rôle.\nC5 (3 h 30) : interdiction du démarchage téléphonique en rénovation énergétique (art. L. 223-1 du code de la consommation) ; prescripteurs (architectes, agences immobilières, syndics, bureaux d'études), partenariats, salons, parrainage, réseaux sociaux, site et avis clients ; RGPD ; plan de prospection. Mise en situation : plan de prospection sur 3 mois.\n\nJOUR 5 — C6 : CONCLURE ET FIDÉLISER · ÉVALUATION FINALE (7 h)\nSignaux d'achat et techniques de conclusion ; contrat conclu hors établissement : information précontractuelle, droit de rétractation de 14 jours, formulaire de rétractation, aucun paiement avant l'expiration d'un délai de 7 jours ; suivi de chantier, réception des travaux, mesure de la satisfaction, parrainage. Mise en situation : conclusion et plan de fidélisation. Évaluation finale interne (jeu de rôle complet observé + dossier de vente), coaching personnalisé, bilan et questionnaire de satisfaction.",
  methodesEvaluation:
    "Évaluation des besoins et test de positionnement à l'entrée (10 questions ouvertes + QCM 10 questions), mises en situation tout au long de la formation (10 mises en situation corrigées : diagnostic de départ puis C1 à C6), un quiz de 10 questions par compétence, cas pratique intermédiaire, test de positionnement de fin (10 questions ouvertes + QCM 10 questions). Évaluation finale interne le jour 5 : jeu de rôle complet d'un rendez-vous de vente observé par le formateur avec grille d'observation, et dossier de vente écrit (découverte, argumentaire, plan de financement de principe, devis, conclusion conforme). Formation non certifiante : attestation de fin de formation mentionnant les objectifs, la nature, la durée et les résultats de l'évaluation des acquis. Questionnaires de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Formation en présentiel, dans les locaux de l'organisme ou de l'entreprise cliente : salle équipée d'un vidéoprojecteur et d'un paperboard, poste informatique ou ordinateur portable par stagiaire, caméra ou smartphone pour filmer les jeux de rôle ; support de cours remis à chaque stagiaire, cahier d'exercices et corrigés, modèles (guide d'entretien de découverte, fiche visite technique, trame de devis, plan de financement de principe, grille de traitement des objections, plan de prospection, check-list de conclusion) ; jeux de rôle en binôme et en trinôme sur le cas fil rouge Thermia Rénov et sur les dossiers réels des stagiaires ; feuilles d'émargement signées par demi-journée. Suivi par mail et téléphone après la formation pour la mise en œuvre des acquis.",
  publicVise:
    "Salariés d'entreprises de travaux énergétiques : commerciaux, conseillers en rénovation énergétique, technico-commerciaux, assistants commerciaux et chefs d'entreprise artisanale qui assurent eux-mêmes la vente. Formation financée par l'employeur avec l'appui de son OPCO au titre du plan de développement des compétences (convention de formation avec l'entreprise).",
  delaiAcces: "14 jours après signature de la convention de formation avec l'entreprise, sous réserve de places disponibles.",
  dateDebut: "2026-11-16",
  dateFin: "2026-11-20",
  lieu: "",
  nombreParticipants: "8",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Maîtriser le vocabulaire technique et réglementaire (DPE, RGE, gestes de travaux) pour être crédible face au client.",
  "Expliquer clairement les aides publiques et le rôle de Mon Accompagnateur Rénov' sans avancer de montant erroné.",
  "Conduire un entretien de découverte structuré au lieu de présenter tout de suite un produit.",
  "Comprendre les besoins des clients professionnels, notamment les obligations du décret tertiaire.",
  "Construire un argumentaire centré sur les bénéfices du client et chiffrer un reste à charge réaliste.",
  "Rédiger une proposition commerciale et un devis complets et conformes.",
  "Répondre aux objections sur le prix et sur la confiance, dans un secteur marqué par les fraudes.",
  "Trouver des clients sans démarchage téléphonique, interdit pour la rénovation énergétique.",
  "Conclure la vente dans les règles du contrat hors établissement (rétractation, absence de paiement avant 7 jours).",
  "Fidéliser les clients et obtenir des recommandations après chantier.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins conduite avec l'entreprise employeur et avec chaque stagiaire (entretien préalable, test de positionnement, échange sur les dossiers en cours) fait apparaître un groupe de salariés d'entreprises de travaux énergétiques aux profils variés : commerciaux expérimentés venus d'autres secteurs, conseillers techniques devenus vendeurs, assistants commerciaux et jeunes recrues. Trois besoins sont partagés par la quasi-totalité du groupe.</p>
<ul>
  <li><strong>La maîtrise du cadre (C1)</strong> : les stagiaires connaissent les produits mais expliquent mal le DPE, la qualification RGE et le fonctionnement des aides ; certains annoncent des montants d'aide non vérifiés.</li>
  <li><strong>La méthode de vente (C2 à C4)</strong> : l'entretien commence souvent par la présentation du produit, sans découverte des besoins ; les objections sur le prix et sur la confiance sont mal traitées.</li>
  <li><strong>La conformité (C5, C6)</strong> : l'interdiction du démarchage téléphonique et les règles du contrat hors établissement (rétractation, absence de paiement pendant 7 jours) sont connues de façon approximative.</li>
</ul>
<p>Les employeurs attendent en complément une hausse du taux de transformation des devis, moins d'annulations après signature et des dossiers d'aides complets ; les stagiaires souhaitent des outils directement utilisables en rendez-vous (guide de découverte, trame d'argumentaire, réponses aux objections).</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Dossiers réels</strong> : les mises en situation sont réalisées sur le cas fil rouge Thermia Rénov (entreprise fictive) puis transposées sur un dossier client réel de chaque stagiaire, anonymisé ; elles alimentent l'évaluation finale du jour 5.</li>
  <li><strong>Profils techniques</strong> : renforcement sur la découverte des besoins et l'argumentation orientée bénéfices ; jeux de rôle supplémentaires.</li>
  <li><strong>Profils commerciaux venus d'autres secteurs</strong> : fiches techniques simplifiées par geste de travaux et lexique du DPE et des aides.</li>
  <li><strong>Vente aux professionnels</strong> : atelier dédié au décret tertiaire et aux bâtiments tertiaires pour les stagiaires concernés.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, salle accessible aux personnes à mobilité réduite, supports remis à l'avance et en version numérique, jeux de rôle aménagés (observation au lieu du jeu filmé, temps majoré) sur demande.</li>
</ul>`;

/** 10 mises en situation (diagnostic de départ puis C1 à C6), corrigés formateur. */
export const TVTE_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — Diagnostic de départ : ma pratique commerciale actuelle",
    consigne:
      "Pour votre poste (ou, à défaut, celui de Karim, conseiller commercial débutant chez Thermia Rénov, SAS fictive de rénovation énergétique qualifiée RGE, 14 salariés, Saint-Genis-Laval) : 1. Décrivez votre portefeuille d'offres (gestes de travaux vendus, clients B2C / B2B, panier moyen indicatif). 2. Décrivez le déroulé type de vos rendez-vous, de la prise de contact à la signature. 3. Indiquez d'où viennent vos contacts aujourd'hui. 4. Donnez vos indicateurs : nombre de rendez-vous, taux de transformation des devis, taux d'annulation après signature. 5. Concluez par 3 forces, 3 points à améliorer et 3 priorités de progrès pour la semaine de formation.",
    reponseAttendue:
      "Portefeuille décrit avec précision (gestes, cibles, ordre de grandeur des montants, part B2C / B2B).\nDéroulé réel du rendez-vous, avec identification honnête des étapes absentes (souvent : découverte, reformulation, conclusion).\nOrigine des contacts identifiée ; signalement de toute source non conforme (appels téléphoniques à froid vers des particuliers, interdits pour la rénovation énergétique).\nIndicateurs chiffrés ou, à défaut, constat de leur absence et décision de les suivre.\nForces, points à améliorer et priorités tirés des constats et reliés aux compétences C1 à C6.\nBarème : portefeuille 4, déroulé 5, origine des contacts 3, indicateurs 4, conclusion 4.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 : situer le projet Ferrand dans son cadre technique et réglementaire",
    consigne:
      "M. et Mme Ferrand habitent une maison de 1978 de 120 m² chauffée par une chaudière au fioul ; leur DPE indique l'étiquette F. Ils envisagent de louer la maison dans quelques années. 1. Expliquez-leur simplement ce que mesure le DPE et ce qu'implique l'étiquette F, y compris pour une future location. 2. Proposez un bouquet de travaux cohérent (ordre des gestes : enveloppe puis équipements) et justifiez-le. 3. Expliquez la qualification RGE et pourquoi elle compte pour eux. 4. Indiquez dans quels cas un audit énergétique est obligatoire ou recommandé. 5. Listez les points techniques à vérifier lors de la visite.",
    reponseAttendue:
      "DPE : estimation de la consommation d'énergie et des émissions de gaz à effet de serre, étiquettes de A à G, document opposable depuis le 1er juillet 2021 ; étiquette F = passoire thermique ; calendrier de la loi Climat et résilience : logements G exclus de la location depuis 2025, F à partir de 2028, E à partir de 2034.\nBouquet logique : isolation de l'enveloppe d'abord (combles, murs, planchers bas, menuiseries si nécessaire), ventilation adaptée, puis remplacement de la chaudière fioul par une pompe à chaleur dimensionnée sur les besoins réduits, chauffe-eau thermodynamique en option.\nRGE : qualification de l'entreprise (Qualibat, Qualit'EnR, Qualifelec) exigée pour que le client bénéficie de la plupart des aides ; vérification sur france-renov.gouv.fr.\nAudit énergétique réglementaire : obligatoire à la vente des maisons et immeubles en monopropriété classés F ou G (depuis 2023) puis E (depuis 2025) ; exigé ou recommandé pour une rénovation d'ampleur.\nPoints de visite : isolation existante, menuiseries, ventilation, émetteurs de chaleur, réseau hydraulique, puissance électrique, emplacement de l'unité extérieure et nuisances sonores, ballon d'eau chaude.\nBarème : DPE 5, bouquet 5, RGE 3, audit 3, visite 4.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C1 : expliquer les aides et construire un plan de financement de principe",
    consigne:
      "Toujours pour les Ferrand (revenus intermédiaires, propriétaires occupants) : 1. Présentez les aides mobilisables (MaPrimeRénov' par geste ou rénovation d'ampleur, CEE, éco-PTZ, TVA à taux réduit, aides locales) en expliquant le principe de chacune. 2. Expliquez le rôle de Mon Accompagnateur Rénov' et quand il intervient. 3. Construisez un plan de financement de principe (coût TTC, aides estimées, reste à charge, prêt éventuel) en indiquant d'où viennent les montants. 4. Rédigez les trois phrases de précaution à dire au client sur les aides.",
    reponseAttendue:
      "Principes exacts : MaPrimeRénov' versée par l'Anah selon les revenus du ménage et le projet ; CEE financés par les fournisseurs d'énergie (obligés) sous forme de primes ; éco-PTZ = prêt sans intérêts pour financer des travaux de rénovation énergétique ; TVA à 5,5 % pour les travaux d'amélioration de la qualité énergétique de logements achevés depuis plus de deux ans ; aides locales variables selon la collectivité.\nMon Accompagnateur Rénov' : accompagnement obligatoire pour la rénovation d'ampleur aidée par MaPrimeRénov' ; il aide le ménage à définir le projet et à monter le dossier.\nPlan de financement de principe clair, avec montants issus des simulateurs officiels et du barème en vigueur, sans montant inventé ; mention « barème en vigueur à vérifier sur france-renov.gouv.fr ».\nPrécautions : les aides sont soumises à conditions et à l'accord de l'organisme ; la demande se fait en principe avant le début des travaux ; le montant définitif est notifié par l'organisme, pas par l'entreprise.\nBarème : aides 7, Mon Accompagnateur Rénov' 3, plan de financement 6, précautions 4.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C2 : conduire l'entretien de découverte d'un client particulier",
    consigne:
      "En binôme, jouez l'entretien de découverte de Thermia Rénov chez Mme Lopez (appartement de 68 m² en copropriété, chauffage électrique, factures élevées, inquiète des arnaques) puis échangez les rôles. 1. Préparez le guide d'entretien : objectifs, questions ouvertes par thème (logement, usages, confort, budget, projet, décideurs, délais). 2. Pendant le jeu, pratiquez l'écoute active et notez les motivations du client selon SONCAS. 3. Rédigez la reformulation de synthèse. 4. Indiquez ce qui relève de la copropriété et ce qui relève de Mme Lopez. 5. Autoévaluez-vous avec la grille d'observation.",
    reponseAttendue:
      "Guide d'entretien structuré, questions ouvertes (« Comment… ? », « Qu'est-ce qui… ? »), entonnoir du général au précis, budget et décideurs abordés sans gêne.\nÉcoute active : silences, relances, prise de notes, reformulations partielles ; le vendeur parle moins que la cliente.\nSONCAS correctement identifié : Sécurité (peur des arnaques, besoin de garanties), Argent (factures), Confort (froid l'hiver), éventuellement Nouveauté ou Sympathie ; arguments futurs reliés à ces motivations.\nReformulation fidèle, validée par la cliente, qui sert de base à la proposition.\nCopropriété : parties communes et travaux collectifs (isolation des façades, toiture) votés en assemblée générale ; parties privatives (équipements de chauffage, menuiseries selon le règlement) à la décision de la copropriétaire.\nBarème : guide 5, écoute active 4, SONCAS 4, reformulation 4, copropriété 3.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C2 : analyser le besoin d'un client professionnel soumis au décret tertiaire",
    consigne:
      "La SCI Les Tilleuls possède un immeuble de bureaux de 1 200 m² loué à trois entreprises ; le gérant reçoit un rappel sur ses obligations. 1. Expliquez au gérant ce qu'impose le décret tertiaire (bâtiments concernés, objectifs, déclaration). 2. Identifiez les interlocuteurs et leurs attentes (propriétaire, locataires, gestionnaire). 3. Préparez 10 questions de découverte propres au B2B. 4. Proposez une démarche commerciale en étapes (diagnostic, plan d'actions, propositions). 5. Indiquez les différences entre une vente B2B et une vente B2C dans ce secteur.",
    reponseAttendue:
      "Décret tertiaire (dispositif Éco Énergie Tertiaire) : bâtiments ou parties de bâtiments à usage tertiaire de 1 000 m² et plus ; réduction de la consommation d'énergie finale de 40 % en 2030, 50 % en 2040 et 60 % en 2050 par rapport à une année de référence qui ne peut être antérieure à 2010, ou atteinte d'une valeur absolue ; déclaration annuelle des consommations sur la plateforme OPERAT de l'ADEME ; obligations partagées entre propriétaire et locataires.\nInterlocuteurs : propriétaire (valeur du patrimoine, coût), locataires (confort, charges), gestionnaire (données, planning).\nQuestions B2B pertinentes : consommations par usage, année de référence, données OPERAT, contrats d'exploitation, budget, calendrier de décision, circuit de validation.\nDémarche : collecte des données, diagnostic ou audit, plan d'actions hiérarchisé (pilotage, régulation, éclairage, isolation, équipements), propositions chiffrées, suivi des résultats.\nB2B : plusieurs décideurs, cycle long, raisonnement en coût global et retour sur investissement, cahier des charges ; B2C : décision familiale, émotion, confiance, aides aux ménages, protections du code de la consommation.\nBarème : décret tertiaire 6, interlocuteurs 3, questions 4, démarche 4, différences 3.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C3 : bâtir l'argumentaire et chiffrer le reste à charge et le temps de retour",
    consigne:
      "À partir de la découverte des Ferrand : 1. Construisez 5 arguments selon la méthode CAP (caractéristique, avantage, preuve) puis traduisez-les en bénéfices client (BAC), chacun relié à une motivation SONCAS. 2. Calculez le reste à charge à partir des données du cas (coût TTC fictif de 24 000 € pour isolation + pompe à chaleur, aides estimées fournies par le simulateur, éco-PTZ éventuel). 3. Estimez le temps de retour simple à partir d'une économie annuelle estimée par l'étude thermique fictive du cas. 4. Listez les promesses à ne jamais faire.",
    reponseAttendue:
      "Arguments précis, chacun avec une preuve (étude thermique, fiche technique, avis clients vérifiables, qualification RGE, garanties) et un bénéfice exprimé du point de vue du client (confort, maîtrise des factures, valeur du bien, sortie du fioul, impact environnemental).\nReste à charge = coût TTC − aides estimées ; calcul juste, hypothèses écrites, aides présentées comme estimations sous réserve d'accord de l'organisme.\nTemps de retour simple = reste à charge / économie annuelle estimée ; résultat présenté comme un ordre de grandeur qui dépend des prix de l'énergie et des usages.\nPromesses interdites : « travaux gratuits » ou « à 1 € », montant d'aide garanti, économies garanties sans étude, se présenter comme mandaté par l'État ou un organisme public.\nBarème : arguments CAP 6, bénéfices BAC 4, reste à charge 4, temps de retour 3, promesses interdites 3.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C3 : rédiger la proposition commerciale et un devis conforme",
    consigne:
      "Rédigez la proposition commerciale de Thermia Rénov pour les Ferrand : 1. Structure de la proposition (rappel du besoin, solution, bénéfices, plan de financement de principe, planning, garanties, prochaines étapes). 2. Devis détaillé : liste des mentions obligatoires et des mentions exigées pour les aides (qualification RGE, caractéristiques et performances des équipements et des isolants). 3. Préparez la présentation orale de la proposition en 10 minutes. 4. Relisez le devis d'un autre stagiaire avec la check-list et signalez 3 corrections.",
    reponseAttendue:
      "Proposition claire, centrée sur le client, qui reprend ses mots de la découverte.\nDevis : date, identité et coordonnées de l'entreprise, numéro SIRET, assurance décennale et son assureur, désignation précise des travaux, quantités, prix unitaires et totaux HT, taux de TVA, TTC, durée de validité, délai d'exécution, conditions de paiement ; pour les aides : mention de la qualification RGE (organisme, numéro, domaine), marques, références et performances des équipements, résistance thermique des isolants et surfaces.\nPrésentation orale structurée, plan de financement présenté avec précaution, prochaine étape proposée.\nRelecture rigoureuse avec corrections justifiées.\nBarème : structure 5, devis 8, présentation 4, relecture 3.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C4 : traiter les objections et négocier",
    consigne:
      "En trinôme (vendeur, client, observateur), traitez les 6 objections suivantes : « C'est trop cher », « J'ai vu une publicité pour des travaux à 1 € », « On m'a déjà arnaqué », « Je veux réfléchir et attendre l'an prochain », « Je ne suis pas sûr d'avoir droit aux aides », « Une pompe à chaleur, ça ne chauffe pas quand il fait froid ». 1. Pour chacune, écrivez la réponse en 4 temps : écouter, reformuler, répondre (argument ou preuve), vérifier. 2. Préparez une négociation : marge de manœuvre, concessions possibles et contreparties. 3. L'observateur remplit la grille et donne un conseil d'amélioration.",
    reponseAttendue:
      "Méthode appliquée : écoute sans interrompre, reformulation ou question de clarification, réponse adaptée (preuve, comparaison en coût global, témoignage vérifiable, rappel des garanties), vérification de l'adhésion.\nPrix : coût global et reste à charge, mensualisation, valeur créée ; « travaux à 1 € » : explication loyale de la fin des offres de ce type et des pratiques frauduleuses signalées par les pouvoirs publics ; confiance : qualification RGE vérifiable, assurances, références, aucun paiement avant 7 jours en vente hors établissement ; délai : coût de l'attente, calendrier des aides présenté avec précaution ; aides : orientation vers France Rénov' et simulation officielle ; technique : dimensionnement, coefficient de performance selon la température, appoint éventuel.\nNégociation : concessions limitées et toujours en échange d'une contrepartie (signature, recommandation, planning) ; aucune pression ni fausse urgence.\nObservation précise et constructive.\nBarème : six objections 12 (2 chacune), négociation 5, observation 3.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C5 : construire un plan de prospection conforme sans démarchage téléphonique",
    consigne:
      "Nadia, directrice commerciale de Thermia Rénov, vous demande un plan de prospection sur 3 mois. 1. Rappelez ce qu'interdit l'article L. 223-1 du code de la consommation pour la rénovation énergétique et ce qui reste possible. 2. Proposez au moins 6 actions de prospection conformes (prescripteurs, partenariats, salons, parrainage, réseaux sociaux, site et avis, réunions d'information). 3. Pour chaque action : cible, message, moyens, coût, indicateur. 4. Indiquez les règles RGPD applicables au fichier de prospects et aux emails. 5. Fixez les objectifs chiffrés du plan.",
    reponseAttendue:
      "Interdiction exacte : toute prospection commerciale de consommateurs par voie téléphonique ayant pour objet la vente d'équipements ou la réalisation de travaux pour des logements en vue d'économies d'énergie ou de production d'énergies renouvelables est interdite (loi n° 2020-901 du 24 juillet 2020, art. L. 223-1 du code de la consommation), sauf sollicitations dans le cadre de l'exécution d'un contrat en cours ; sanctions par amende administrative ; rappeler un client qui a lui-même demandé à être rappelé reste possible.\nActions conformes : prescripteurs (architectes, agences immobilières, notaires, syndics, bureaux d'études), partenariats avec des artisans non concurrents, salons et foires, réunions publiques, parrainage clients, contenus sur les réseaux sociaux, site avec formulaire de demande, fiche Google et avis clients vérifiables.\nTableau d'actions complet et réaliste.\nRGPD : information des personnes, base légale, durée de conservation, consentement préalable pour la prospection par email des particuliers, droit d'opposition, registre ; pour les autres sollicitations téléphoniques hors rénovation énergétique, consentement préalable du consommateur exigé depuis le 11 août 2026 (fin du système d'opposition Bloctel).\nObjectifs chiffrés : demandes entrantes, rendez-vous, devis, signatures.\nBarème : réglementation 6, actions 5, tableau 4, RGPD 3, objectifs 2.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C6 : conclure la vente dans les règles et fidéliser",
    consigne:
      "Fin du rendez-vous chez les Ferrand, à leur domicile. 1. Repérez les signaux d'achat dans le dialogue fourni et choisissez la technique de conclusion adaptée. 2. Listez ce que vous devez remettre et expliquer avant la signature d'un contrat conclu hors établissement (information précontractuelle, droit de rétractation, formulaire). 3. Indiquez ce que vous ne pouvez pas faire pendant les 7 premiers jours. 4. Construisez le plan de suivi jusqu'à la réception des travaux et au-delà (étapes, interlocuteur, mesure de la satisfaction). 5. Proposez une démarche de recommandation et de parrainage.",
    reponseAttendue:
      "Signaux d'achat (questions sur le planning, sur la mise en service, accord des deux conjoints) ; conclusion par l'alternative, la récapitulation des bénéfices ou la question directe, sans pression.\nHors établissement : information précontractuelle complète remise sur papier ou support durable, contrat daté et signé, droit de rétractation de 14 jours expliqué, formulaire type de rétractation joint ; si le client demande que les travaux commencent avant la fin du délai, demande expresse écrite.\nAucun paiement ni contrepartie, sous quelque forme que ce soit, avant l'expiration d'un délai de 7 jours à compter de la conclusion du contrat ; aucun chèque encaissé ni prélèvement pendant ce délai.\nSuivi : confirmation écrite, dossier d'aides, planification, chantier, réception des travaux avec procès-verbal (avec ou sans réserves), mise en service, explication des réglages, questionnaire de satisfaction, entretien annuel.\nRecommandation : demande au bon moment (après la réception réussie), parrainage encadré, avis clients authentiques, sans faux avis.\nBarème : conclusion 4, information et rétractation 6, délai de 7 jours 3, suivi 4, recommandation 3.",
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
  ["Le DPE classe les logements :", ["De 1 à 10", "De A à G", "En trois niveaux : bas, moyen, haut", "De 0 à 100"], 1],
  ["Depuis le 1er juillet 2021, le DPE est :", ["Opposable", "Facultatif", "Réservé aux logements neufs", "Supprimé"], 0],
  ["Selon le calendrier de la loi Climat et résilience, les logements classés F sont exclus de la location à partir de :", ["2023", "2025", "2028", "2040"], 2],
  ["La mention RGE signifie :", ["Rénovation Garantie par l'État", "Réseau Général de l'Énergie", "Règlement Général des Entreprises", "Reconnu Garant de l'Environnement"], 3],
  ["Pour que le client bénéficie de la plupart des aides à la rénovation, l'entreprise doit en principe être :", ["Qualifiée RGE pour les travaux concernés", "Inscrite à Bloctel", "Agréée par la mairie", "Membre d'un syndicat professionnel"], 0],
  ["Dans une rénovation performante, on traite en général en premier :", ["Le système de chauffage", "L'isolation de l'enveloppe du bâtiment", "La décoration", "L'éclairage"], 1],
  ["Les CEE sont financés par :", ["Les communes", "Les banques", "Les fournisseurs d'énergie soumis à obligation", "Les clients eux-mêmes"], 2],
  ["Le taux réduit de TVA de 5,5 % s'applique aux travaux d'amélioration de la qualité énergétique :", ["De tout bâtiment, neuf compris", "Des seuls bureaux", "Des seules résidences secondaires de moins d'un an", "Des logements achevés depuis plus de deux ans"], 3],
  ["Mon Accompagnateur Rénov' intervient notamment :", ["Pour une rénovation d'ampleur aidée par MaPrimeRénov'", "Pour vendre les équipements", "Pour encaisser les aides à la place du client", "Pour réaliser la publicité de l'entreprise"], 0],
  ["Le montant d'une aide publique à annoncer au client :", ["Est garanti par l'entreprise", "Est une estimation à vérifier selon le barème en vigueur et confirmée par l'organisme", "Est toujours le même pour tous les ménages", "N'a pas besoin d'être vérifié"], 1],
];

const QCM_C2: Q[] = [
  ["L'objectif principal de l'entretien de découverte est de :", ["Présenter tout le catalogue", "Comprendre la situation, les besoins et les motivations du client", "Annoncer le prix au plus vite", "Faire signer le jour même"], 1],
  ["Une question ouverte :", ["Appelle une réponse développée", "Appelle oui ou non", "Impose une réponse", "Est interdite en vente"], 0],
  ["Dans SONCAS, le A correspond à :", ["Achat", "Avantage", "Argent", "Accompagnement"], 2],
  ["Un client qui insiste sur les garanties et la peur des arnaques exprime surtout une motivation de :", ["Nouveauté", "Sympathie", "Orgueil", "Sécurité"], 3],
  ["La reformulation sert à :", ["Vérifier qu'on a bien compris et obtenir l'accord du client", "Remplir le temps", "Contredire le client", "Annoncer le prix"], 0],
  ["Lors de la visite technique d'une maison pour une pompe à chaleur, on vérifie notamment :", ["La couleur des volets", "Les émetteurs de chaleur, l'isolation et l'emplacement de l'unité extérieure", "Le nombre de voitures", "La surface du jardin uniquement"], 1],
  ["En copropriété, l'isolation des façades est :", ["Une décision individuelle de chaque copropriétaire", "Interdite", "Décidée en assemblée générale des copropriétaires", "Décidée par le locataire"], 2],
  ["Le décret tertiaire concerne les bâtiments à usage tertiaire d'une surface d'au moins :", ["100 m²", "300 m²", "500 m²", "1 000 m²"], 3],
  ["Les consommations soumises au décret tertiaire se déclarent sur la plateforme :", ["OPERAT de l'ADEME", "Bloctel", "Legifrance", "La plateforme de l'URSSAF"], 0],
  ["Par rapport à la vente aux particuliers, la vente aux professionnels se caractérise souvent par :", ["Un seul décideur et une décision immédiate", "Plusieurs décideurs et un cycle de décision plus long", "L'absence de devis", "L'absence de négociation"], 1],
];

const QCM_C3: Q[] = [
  ["Dans la méthode CAP, le P signifie :", ["Prix", "Promotion", "Preuve", "Produit"], 2],
  ["Un bénéfice client exprime :", ["Une caractéristique technique", "Le prix catalogue", "Le nom de la marque", "Ce que la solution apporte concrètement au client"], 3],
  ["Le reste à charge se calcule par :", ["Coût TTC des travaux moins les aides estimées", "Coût HT plus la TVA", "Aides moins coût", "Économie annuelle multipliée par dix"], 0],
  ["Le temps de retour simple se calcule par :", ["Coût TTC × économie annuelle", "Reste à charge / économie annuelle estimée", "Économie annuelle / coût", "Montant des aides / 12"], 1],
  ["Parmi ces affirmations, laquelle est interdite face à un client ?", ["« Voici l'estimation des aides selon le simulateur officiel »", "« Les économies dépendent de vos usages »", "« Nous sommes mandatés par l'État pour faire ces travaux »", "« Le montant définitif sera notifié par l'organisme »"], 2],
  ["Sur un devis de travaux ouvrant droit aux aides, il faut notamment indiquer :", ["La date de naissance du client", "Le salaire du commercial", "La marge de l'entreprise", "La qualification RGE et les caractéristiques des équipements et isolants"], 3],
  ["La garantie décennale couvre :", ["Les dommages qui compromettent la solidité de l'ouvrage ou le rendent impropre à sa destination, pendant 10 ans", "Uniquement les petits équipements pendant 1 an", "La perte d'exploitation du client", "Les aides non versées"], 0],
  ["Un argument efficace est :", ["Le même pour tous les clients", "Relié à une motivation exprimée par le client lors de la découverte", "Uniquement technique", "Fondé sur l'urgence"], 1],
  ["Pour illustrer la preuve d'un argument, on peut utiliser :", ["Une rumeur", "Une promesse orale", "Une étude thermique, une fiche technique ou des avis clients vérifiables", "Un montant d'aide garanti"], 2],
  ["Une proposition commerciale bien construite commence par :", ["Le prix", "Les conditions générales", "La liste des concurrents", "Le rappel du besoin et de la situation du client"], 3],
];

const QCM_C4: Q[] = [
  ["La première étape du traitement d'une objection est de :", ["Répondre immédiatement", "Écouter sans interrompre", "Baisser le prix", "Changer de sujet"], 1],
  ["Face à « c'est trop cher », il est pertinent de :", ["Raisonner en coût global et en reste à charge", "Accorder une remise immédiate", "Mettre fin au rendez-vous", "Critiquer les concurrents"], 0],
  ["Une concession en négociation doit :", ["Être accordée sans condition", "Être annoncée dès le début", "Être obtenue en échange d'une contrepartie", "Être systématique"], 2],
  ["Face à un client qui a déjà été victime d'une fraude, on rassure en premier lieu par :", ["Une remise exceptionnelle", "Une signature rapide", "La promesse de travaux gratuits", "Des éléments vérifiables : qualification RGE, assurances, références"], 3],
  ["Reformuler une objection permet de :", ["Vérifier sa nature réelle et montrer qu'on a compris", "Gagner du temps sans répondre", "Mettre le client en défaut", "L'ignorer"], 0],
  ["« Une pompe à chaleur ne chauffe pas quand il fait froid » est une objection :", ["De prix", "Technique", "De délai", "De confiance envers les aides"], 1],
  ["Créer une fausse urgence pour faire signer :", ["Est une bonne technique de conclusion", "Est recommandé en fin de mois", "Est une pratique commerciale déloyale à proscrire", "Est obligatoire en vente à domicile"], 2],
  ["Face à « je veux réfléchir », la bonne réaction est de :", ["Insister jusqu'à la signature", "Partir sans rien proposer", "Baisser le prix de moitié", "Identifier ce qui reste à éclaircir et convenir d'une prochaine étape"], 3],
  ["Face à « je ne suis pas sûr d'avoir droit aux aides », le vendeur :", ["Oriente vers le simulateur officiel ou l'espace France Rénov' et présente les aides comme des estimations", "Garantit le montant", "Promet de payer la différence", "Conseille de ne pas déclarer ses revenus"], 0],
  ["L'objectif d'une négociation réussie est :", ["Gagner contre le client", "Un accord durable et équilibré pour le client et l'entreprise", "Vendre au prix le plus bas", "Éviter toute question"], 1],
];

const QCM_C5: Q[] = [
  ["Pour la rénovation énergétique, la prospection téléphonique des consommateurs est :", ["Libre", "Interdite, sauf dans le cadre de l'exécution d'un contrat en cours", "Autorisée le samedi", "Autorisée si le numéro n'est pas sur Bloctel"], 1],
  ["Cette interdiction résulte de :", ["La loi n° 2020-901 du 24 juillet 2020", "La loi Climat et résilience", "Le RGPD", "Le décret tertiaire"], 0],
  ["Elle est codifiée à l'article :", ["L. 121-1 du code du travail", "1240 du code civil", "L. 223-1 du code de la consommation", "R. 111-20 du code de la construction"], 2],
  ["Un prescripteur est :", ["Un concurrent direct", "Un fournisseur d'énergie", "Un client mécontent", "Un professionnel qui recommande l'entreprise à ses propres clients"], 3],
  ["Parmi ces actions, laquelle est conforme pour trouver des clients particuliers ?", ["Un stand dans une foire locale", "Des appels à froid sur un fichier acheté", "Des appels en se présentant comme un organisme public", "Des SMS envoyés sans consentement"], 0],
  ["Pour envoyer un email de prospection à un particulier, il faut en principe :", ["Son adresse postale", "Son consentement préalable", "Son avis d'imposition", "L'accord de sa mairie"], 1],
  ["Le parrainage consiste à :", ["Acheter des avis", "Appeler les voisins d'un client", "Encourager un client satisfait à recommander l'entreprise à son entourage", "Proposer des travaux gratuits"], 2],
  ["Les avis clients publiés en ligne doivent être :", ["Rédigés par les salariés", "Achetés à une agence", "Filtrés pour ne garder que les positifs", "Authentiques, issus de vrais clients"], 3],
  ["Depuis le 11 août 2026, hors rénovation énergétique, le démarchage téléphonique d'un consommateur suppose :", ["Son consentement préalable, qui remplace l'ancienne liste d'opposition Bloctel", "Qu'il ne soit pas inscrit sur Bloctel", "Un label RGE", "Aucune condition"], 0],
  ["Un plan de prospection efficace précise pour chaque action :", ["Uniquement son coût", "La cible, le message, les moyens, le coût et l'indicateur de résultat", "Le nom des concurrents", "Le numéro de SIRET des prospects"], 1],
];

const QCM_C6: Q[] = [
  ["Un signal d'achat est par exemple :", ["Le client regarde sa montre", "Le client demande quand les travaux pourraient commencer", "Le client ne pose aucune question", "Le client refuse le devis"], 1],
  ["Pour un contrat conclu hors établissement, le délai de rétractation du consommateur est de :", ["14 jours", "7 jours", "30 jours", "Il n'existe pas"], 0],
  ["En démarchage à domicile, le professionnel ne peut recevoir aucun paiement avant l'expiration d'un délai de :", ["24 heures", "3 jours", "7 jours", "30 jours"], 2],
  ["Le contrat hors établissement doit être accompagné :", ["D'une remise exceptionnelle", "D'un chèque de caution", "D'une attestation de domicile", "Du formulaire type de rétractation"], 3],
  ["Si le client souhaite que les travaux démarrent avant la fin du délai de rétractation, il doit :", ["En faire la demande expresse", "Payer la totalité d'avance", "Renoncer à toute garantie", "Signer une reconnaissance de dette"], 0],
  ["La réception des travaux :", ["Est une simple formalité orale", "Marque le point de départ des garanties et peut être prononcée avec ou sans réserves", "Est réalisée par le fournisseur d'énergie", "Est facultative"], 1],
  ["La technique de conclusion par l'alternative consiste à :", ["Menacer de retirer l'offre", "Imposer une date", "Proposer un choix entre deux options qui supposent toutes deux l'accord", "Parler du prix en dernier"], 2],
  ["Le meilleur moment pour demander une recommandation est :", ["Avant la signature", "Au premier appel", "Pendant le chantier, en cas de problème", "Après une réception des travaux réussie"], 3],
  ["La mesure de la satisfaction client sert à :", ["Améliorer le service et obtenir des avis et recommandations", "Remplacer la réception des travaux", "Justifier une hausse de prix", "Contourner le droit de rétractation"], 0],
  ["Après la mise en service d'une pompe à chaleur, la fidélisation passe notamment par :", ["L'absence de contact", "La proposition d'un contrat d'entretien et un suivi régulier", "Un démarchage téléphonique annuel", "La suppression de la garantie"], 1],
];

export const TVTE_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Situer l'offre de travaux énergétiques dans son cadre technique et réglementaire", QCM_C1),
  qcmExercice("QCM C2 — Identifier les besoins et attentes des clients B2C et B2B", QCM_C2),
  qcmExercice("QCM C3 — Élaborer un argumentaire et une proposition commerciale adaptée", QCM_C3),
  qcmExercice("QCM C4 — Négocier et traiter les objections", QCM_C4),
  qcmExercice("QCM C5 — Prospecter et développer un portefeuille clients dans le respect de la réglementation", QCM_C5),
  qcmExercice("QCM C6 — Conclure la vente et fidéliser", QCM_C6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (diagnostic puis C1 à C6), alignées sur les
 * 10 questions de positionnement et sur les copies de `ventesEnergie35hHumanized.ts` ; les 6 QCM ensuite.
 */
export const TVTE_EXERCICES_COMPLETS: AIContentExercise[] = [...TVTE_EXERCICES, ...TVTE_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Techniques de vente dans le secteur des travaux énergétiques »</strong> : organisation de la formation, compétences C1 à C6 et évaluation finale ; quiz et cas pratique corrigés pour chaque compétence ; fil rouge Thermia Rénov (entreprise fictive).</li>
  <li><strong>Cahier d'exercices</strong> : test de positionnement, 10 mises en situation professionnelles (diagnostic de départ puis C1 à C6) ; <strong>corrigés formateur</strong> remis après correction.</li>
  <li><strong>6 QCM de 10 questions</strong>, un par compétence (C1 à C6), corrigés en séance.</li>
  <li><strong>Grille d'observation du jeu de rôle final</strong> et grille d'autoévaluation, critères par compétence.</li>
  <li><strong>Modèles</strong> : guide d'entretien de découverte, fiche visite technique, grille SONCAS, trame d'argumentaire CAP / BAC, plan de financement de principe, check-list du devis, fiche de traitement des objections, plan de prospection, check-list de conclusion hors établissement, questionnaire de satisfaction.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Salle de formation</strong> : vidéoprojecteur, paperboard, connexion internet, travail en binômes et trinômes ; caméra ou smartphone pour filmer les jeux de rôle (avec l'accord des participants).</li>
  <li><strong>Simulateurs officiels</strong> : simulateur d'aides de France Rénov', annuaire des professionnels RGE, observatoire DPE de l'ADEME.</li>
  <li><strong>Outils commerciaux</strong> : tableur pour le reste à charge et le temps de retour, trame de devis, logiciel de CRM de démonstration.</li>
  <li><strong>Documentation technique</strong> : fiches produits de pompes à chaleur, d'isolants et de chauffe-eau thermodynamiques (performances, caractéristiques exigées pour les aides).</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>France Rénov'</strong> : <a href="https://france-renov.gouv.fr/">https://france-renov.gouv.fr/</a> — aides, simulateur, annuaire RGE, Mon Accompagnateur Rénov'.</li>
  <li><strong>Service-Public.fr</strong> : <a href="https://www.service-public.fr/">https://www.service-public.fr/</a> — démarchage, contrats hors établissement, droit de rétractation, aides au logement.</li>
  <li><strong>DGCCRF</strong> : <a href="https://www.economie.gouv.fr/dgccrf">https://www.economie.gouv.fr/dgccrf</a> — pratiques commerciales trompeuses et fraudes dans la rénovation énergétique.</li>
  <li><strong>ADEME</strong> : <a href="https://www.ademe.fr/">https://www.ademe.fr/</a> — DPE, plateforme OPERAT du décret tertiaire, guides techniques.</li>
  <li><strong>Anah</strong> : <a href="https://www.anah.gouv.fr/">https://www.anah.gouv.fr/</a> — MaPrimeRénov' et accompagnement des ménages.</li>
  <li><strong>CNIL</strong> : <a href="https://www.cnil.fr/">https://www.cnil.fr/</a> — prospection commerciale et RGPD.</li>
</ul>`;

const TVTE_VIDEOS = [
  { title: "Comprendre le DPE", description: "Étiquettes, méthode et conséquences pour les propriétaires.", url: "https://www.youtube.com/results?search_query=comprendre+le+DPE+diagnostic+performance+%C3%A9nerg%C3%A9tique" },
  { title: "MaPrimeRénov' et Mon Accompagnateur Rénov'", description: "Principes des aides et parcours du ménage.", url: "https://www.youtube.com/results?search_query=MaPrimeR%C3%A9nov+Mon+Accompagnateur+R%C3%A9nov" },
  { title: "La qualification RGE", description: "Pourquoi elle conditionne les aides du client.", url: "https://www.youtube.com/results?search_query=qualification+RGE+entreprise" },
  { title: "L'entretien de découverte en vente", description: "Questions ouvertes, écoute active, reformulation.", url: "https://www.youtube.com/results?search_query=entretien+de+d%C3%A9couverte+vente+questions+ouvertes" },
  { title: "La méthode SONCAS", description: "Identifier les motivations d'achat.", url: "https://www.youtube.com/results?search_query=m%C3%A9thode+SONCAS+vente" },
  { title: "Le décret tertiaire expliqué", description: "Bâtiments concernés, objectifs et OPERAT.", url: "https://www.youtube.com/results?search_query=d%C3%A9cret+tertiaire+expliqu%C3%A9" },
  { title: "Argumenter avec la méthode CAP", description: "Caractéristiques, avantages, preuves et bénéfices client.", url: "https://www.youtube.com/results?search_query=m%C3%A9thode+CAP+argumentaire+vente" },
  { title: "Traiter les objections clients", description: "Écouter, reformuler, répondre, vérifier.", url: "https://www.youtube.com/results?search_query=traiter+les+objections+vente" },
  { title: "Démarchage et rénovation énergétique : vos droits", description: "Interdiction du démarchage téléphonique et contrats hors établissement.", url: "https://www.youtube.com/results?search_query=d%C3%A9marchage+r%C3%A9novation+%C3%A9nerg%C3%A9tique+droits" },
  { title: "Conclure une vente sans pression", description: "Signaux d'achat et techniques de conclusion.", url: "https://www.youtube.com/results?search_query=conclure+une+vente+signaux+d%27achat" },
];

export const TVTE_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: TVTE_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: TVTE_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement début / fin
// ---------------------------------------------------------------------------
export const TVTE_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Que signifie DPE ?", options: ["Diagnostic de performance énergétique", "Dossier de prêt écologique", "Déclaration préalable d'électricité", "Devis pour énergie"], correctIndex: 0 },
  { question: "Que signifie la mention RGE ?", options: ["Rénovation garantie par l'État", "Reconnu garant de l'environnement", "Réseau général de l'énergie", "Règlement général des entreprises"], correctIndex: 1 },
  { question: "Une pompe à chaleur air/eau sert principalement à :", options: ["Ventiler le logement", "Produire de l'électricité", "Chauffer le logement et parfois l'eau chaude", "Isoler les murs"], correctIndex: 2 },
  { question: "MaPrimeRénov' est :", options: ["Un crédit à la consommation", "Une assurance habitation", "Un label de qualité", "Une aide publique à la rénovation énergétique"], correctIndex: 3 },
  { question: "Lors d'un premier rendez-vous, il vaut mieux commencer par :", options: ["Découvrir la situation et les besoins du client", "Annoncer le prix", "Présenter tout le catalogue", "Faire signer un bon de commande"], correctIndex: 0 },
  { question: "Une question ouverte est par exemple :", options: ["« Vous avez froid ? »", "« Comment se passe l'hiver dans votre maison ? »", "« Vous signez aujourd'hui ? »", "« C'est bien votre adresse ? »"], correctIndex: 1 },
  { question: "Le reste à charge d'un client correspond à :", options: ["Le montant des aides", "Le coût de l'énergie", "Le coût des travaux moins les aides", "La TVA"], correctIndex: 2 },
  { question: "Face à l'objection « c'est trop cher », il faut d'abord :", options: ["Baisser le prix", "Partir", "Critiquer la concurrence", "Écouter et faire préciser l'objection"], correctIndex: 3 },
  { question: "Appeler des particuliers au hasard pour leur proposer des travaux d'isolation est :", options: ["Interdit", "Recommandé", "Autorisé le week-end", "Obligatoire"], correctIndex: 0 },
  { question: "Après une vente signée au domicile du client, celui-ci peut se rétracter pendant :", options: ["24 heures", "14 jours", "2 mois", "Il ne peut pas se rétracter"], correctIndex: 1 },
];

export const TVTE_QCM_FIN: AIQCMQuestion[] = [
  { question: "Selon la loi Climat et résilience, les logements classés G sont exclus de la location depuis :", options: ["2023", "2025", "2028", "2034"], correctIndex: 1 },
  { question: "Pour une rénovation d'ampleur aidée par MaPrimeRénov', le ménage doit être accompagné par :", options: ["Son banquier", "L'installateur", "Mon Accompagnateur Rénov'", "Son assureur"], correctIndex: 2 },
  { question: "Dans SONCAS, une cliente inquiète des arnaques exprime une motivation de :", options: ["Sécurité", "Nouveauté", "Orgueil", "Sympathie"], correctIndex: 0 },
  { question: "Le décret tertiaire fixe pour 2030 une réduction de la consommation d'énergie finale de :", options: ["10 %", "20 %", "60 %", "40 %"], correctIndex: 3 },
  { question: "Dans la méthode CAP, le P signifie :", options: ["Preuve", "Prix", "Produit", "Promesse"], correctIndex: 0 },
  { question: "Le temps de retour simple d'un investissement se calcule par :", options: ["Coût × économie annuelle", "Reste à charge / économie annuelle estimée", "Aides / coût", "Économie / 12"], correctIndex: 1 },
  { question: "Une concession accordée en négociation doit être :", options: ["Gratuite", "Systématique", "Échangée contre une contrepartie", "Annoncée dès le début"], correctIndex: 2 },
  { question: "La prospection téléphonique des consommateurs pour des travaux de rénovation énergétique est interdite par :", options: ["Le RGPD", "Le décret tertiaire", "La loi Climat et résilience", "L'article L. 223-1 du code de la consommation"], correctIndex: 3 },
  { question: "Après la signature d'un contrat hors établissement, aucun paiement ne peut être reçu avant :", options: ["7 jours", "24 heures", "3 jours", "30 jours"], correctIndex: 0 },
  { question: "La réception des travaux :", options: ["Est facultative", "Fait courir les garanties et peut comporter des réserves", "Se fait par téléphone", "Est réalisée par l'Anah"], correctIndex: 1 },
];

export const TVTE_EVAL_PACK: AIEvalPack = {
  qcmDebut: TVTE_QCM_DEBUT,
  qcmFin: TVTE_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du jour 3) — préparer le rendez-vous de M. Garnier",
    contexte:
      "Cas fictif. M. Garnier, retraité, vit dans une maison de 1965 de 95 m² chauffée au gaz, étiquette E. Il a contacté Thermia Rénov par le formulaire du site après avoir lu un avis client. Il veut « faire des économies » mais craint de se faire « avoir » ; sa fille l'accompagnera au rendez-vous.",
    questions: [
      { question: "Situez le projet dans son cadre : DPE, gestes pertinents, qualification nécessaire.", reponseAttendue: "Étiquette E : logement énergivore, interdiction de location prévue en 2034 ; gestes : isolation des combles et des murs, ventilation, puis pompe à chaleur ou chaudière performante selon l'étude ; entreprise qualifiée RGE pour les gestes concernés afin d'ouvrir droit aux aides ; aides présentées comme estimations à vérifier sur france-renov.gouv.fr.", points: 5 },
      { question: "Préparez 8 questions de découverte et indiquez les motivations SONCAS probables.", reponseAttendue: "Questions ouvertes sur le confort, les factures, les usages, le budget, les délais, les décideurs (place de la fille), les expériences passées ; motivations probables : Sécurité (peur de l'arnaque), Argent (économies), Confort ; Sympathie à construire.", points: 5 },
      { question: "Construisez deux arguments CAP / BAC reliés à ces motivations.", reponseAttendue: "Ex. qualification RGE vérifiable en ligne (caractéristique) → garanties et accès aux aides (avantage) → numéro de qualification et attestation d'assurance remis (preuve) → « vous savez à qui vous avez affaire » (bénéfice sécurité) ; isolation des combles → moins de déperditions → étude thermique → factures réduites et maison plus confortable.", points: 5 },
      { question: "Comment répondez-vous à « On m'a déjà proposé des travaux à 1 € au téléphone » ?", reponseAttendue: "Écoute, reformulation ; rappel loyal que le démarchage téléphonique pour ces travaux est interdit et que les offres de ce type ont donné lieu à de nombreuses fraudes signalées par les pouvoirs publics ; présentation des preuves de sérieux (RGE, assurances, références) et du droit de rétractation ; vérification de l'adhésion.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — jeu de rôle complet observé et dossier de vente (jour 5)",
    exercices: [
      {
        titre: "Partie 1 — Préparation et cadre du projet (C1)",
        consigne: "À partir du dossier client tiré au sort (fictif), présentez la situation du logement ou du bâtiment, les gestes pertinents, la qualification nécessaire et le plan de financement de principe.",
        reponseAttendue: "Lecture juste du DPE ou des données du bâtiment, bouquet de travaux cohérent (enveloppe puis équipements), qualification RGE adaptée, aides présentées dans leur principe avec renvoi au barème en vigueur, aucun montant inventé.",
        points: 20,
      },
      {
        titre: "Partie 2 — Entretien de découverte (C2)",
        consigne: "Conduisez l'entretien de découverte face au formateur ou à un stagiaire jouant le client, puis reformulez.",
        reponseAttendue: "Questions ouvertes structurées, écoute active, motivations SONCAS identifiées, contraintes B2C ou B2B prises en compte (copropriété, décret tertiaire le cas échéant), reformulation validée par le client.",
        points: 20,
      },
      {
        titre: "Partie 3 — Argumentation et proposition (C3)",
        consigne: "Présentez la solution, les arguments, le reste à charge et le temps de retour, puis remettez le devis.",
        reponseAttendue: "Arguments CAP / BAC reliés aux motivations, preuves vérifiables, calculs justes et présentés avec précaution, devis complet avec les mentions exigées, aucune promesse interdite.",
        points: 20,
      },
      {
        titre: "Partie 4 — Objections et négociation (C4)",
        consigne: "Traitez les objections soulevées par le client et menez la négociation.",
        reponseAttendue: "Écoute, reformulation, réponse adaptée, vérification ; concessions limitées avec contreparties ; posture de conseil, aucune pression ni fausse urgence.",
        points: 20,
      },
      {
        titre: "Partie 5 — Conclusion conforme, fidélisation et prospection (C5, C6)",
        consigne: "Concluez le rendez-vous, expliquez les règles du contrat hors établissement, présentez le suivi et indiquez comment ce client pourra devenir prescripteur ; remettez votre plan de prospection.",
        reponseAttendue: "Conclusion adaptée aux signaux d'achat, information sur la rétractation de 14 jours et le formulaire, aucun paiement avant 7 jours, plan de suivi jusqu'à la réception et au-delà, démarche de recommandation, plan de prospection sans démarchage téléphonique et conforme au RGPD.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const TVTE_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — article L. 223-1 du code de la consommation",
      titre: "Interdiction de la prospection téléphonique pour les travaux de rénovation énergétique",
      date: "Septembre 2026",
      commentaire: "Texte issu de la loi n° 2020-901 du 24 juillet 2020 : interdiction de la prospection téléphonique des consommateurs pour la vente d'équipements ou de travaux d'économies d'énergie ou de production d'énergies renouvelables, sauf contrat en cours ; suivi des évolutions ultérieures des règles de prospection (loi n° 2025-594 du 30 juin 2025 contre toutes les fraudes aux aides publiques et ses mesures d'application).",
      exploitation: "Preuve : fiche mémo archivée au dossier Qualiopi. Action : mise à jour de l'exercice 9 (plan de prospection) et du QCM C5.",
    },
    {
      lien: "https://france-renov.gouv.fr/",
      titreLien: "France Rénov'",
      titre: "MaPrimeRénov', éco-PTZ et accompagnement : conditions en vigueur",
      date: "Août 2026",
      commentaire: "Suivi des conditions d'accès aux aides (rénovation par geste, rénovation d'ampleur, rôle de Mon Accompagnateur Rénov') ; les barèmes changent régulièrement et ne sont jamais recopiés dans les supports sans date de vérification.",
      exploitation: "Preuve : note de veille datée. Action : actualisation de l'exercice 3 (plan de financement de principe) et du chapitre C1.",
    },
    {
      lien: "https://www.ecologie.gouv.fr/",
      titreLien: "Ministère de la Transition écologique",
      titre: "Dispositif des certificats d'économies d'énergie (CEE) : sixième période",
      date: "Juillet 2026",
      commentaire: "Évolution des fiches d'opérations standardisées et des bonifications, contrôles renforcés ; incidences sur les primes que le client peut obtenir.",
      exploitation: "Preuve : synthèse archivée. Action : mise à jour de la présentation des CEE au jour 1.",
    },
    {
      lien: "https://www.economie.gouv.fr/dgccrf",
      titreLien: "DGCCRF",
      titre: "Pratiques commerciales trompeuses et fraudes dans la rénovation énergétique",
      date: "Juin 2026",
      commentaire: "Alertes et résultats d'enquêtes sur le secteur (usurpation de l'identité d'organismes publics, fausses promesses d'aides, non-respect du droit de rétractation) et rappel des règles des contrats hors établissement.",
      exploitation: "Preuve : extrait archivé. Action : intégration aux objections de l'exercice 8 et à l'exercice 10 (conclusion conforme).",
    },
    {
      lien: "https://operat.ademe.fr/",
      titreLien: "OPERAT — ADEME",
      titre: "Décret tertiaire : déclarations annuelles et modulations des objectifs",
      date: "Mai 2026",
      commentaire: "Suivi des échéances de déclaration des consommations sur OPERAT et des arrêtés de valeurs absolues par catégorie d'activité.",
      exploitation: "Preuve : note de veille diffusée. Action : mise à jour de l'exercice 5 (SCI Les Tilleuls).",
    },
  ],
  metier: [
    {
      lien: "https://www.anah.gouv.fr/",
      titreLien: "Anah",
      titre: "Bilans d'activité MaPrimeRénov' et attentes des ménages",
      date: "Août 2026",
      commentaire: "Nombre de dossiers, gestes les plus financés, profils de ménages : données utilisées pour contextualiser la découverte des besoins.",
      exploitation: "Preuve : chiffres datés et sourcés dans le support. Action : actualisation de l'introduction du jour 1.",
    },
    {
      lien: "https://www.capeb.fr/",
      titreLien: "CAPEB",
      titre: "Conjoncture de l'artisanat du bâtiment et de la rénovation énergétique",
      date: "Juillet 2026",
      commentaire: "Notes de conjoncture sur l'activité de rénovation énergétique et les difficultés de recrutement de commerciaux techniques.",
      exploitation: "Preuve : note de veille. Action : présentation du contexte du marché au jour 1.",
    },
    {
      lien: "https://www.qualibat.com/",
      titreLien: "Qualibat",
      titre: "Évolution des qualifications RGE et des contrôles de réalisation",
      date: "Juin 2026",
      commentaire: "Règles d'attribution et de contrôle des qualifications RGE, utiles pour expliquer au client ce que garantit la mention et comment la vérifier.",
      exploitation: "Preuve : extrait archivé. Action : mise à jour de l'exercice 2 et de l'argumentaire de confiance.",
    },
    {
      lien: "https://www.francetravail.fr/",
      titreLien: "France Travail",
      titre: "Compétences recherchées pour les postes de conseiller commercial en rénovation énergétique",
      date: "Mai 2026",
      commentaire: "Relevé des compétences demandées dans les offres d'emploi de conseiller en rénovation énergétique et de technico-commercial en génie climatique.",
      exploitation: "Preuve : extraction datée. Action : ajustement des priorités de la formation.",
    },
  ],
  technologique: [
    {
      lien: "https://www.ademe.fr/",
      titreLien: "ADEME",
      titre: "Pompes à chaleur, isolation et ventilation : guides et retours d'expérience",
      date: "Septembre 2026",
      commentaire: "Guides techniques sur le dimensionnement des pompes à chaleur, les performances saisonnières et l'importance de l'isolation et de la ventilation.",
      exploitation: "Preuve : journal de veille. Action : mise à jour des arguments techniques et de l'objection « une pompe à chaleur ne chauffe pas quand il fait froid ».",
    },
    {
      lien: "https://www.afpac.org/",
      titreLien: "AFPAC",
      titre: "Marché et innovations des pompes à chaleur",
      date: "Août 2026",
      commentaire: "Suivi des chiffres du marché, des fluides frigorigènes et des évolutions réglementaires européennes sur les équipements.",
      exploitation: "Preuve : note de veille. Action : actualisation des fiches produits utilisées en atelier.",
    },
    {
      lien: "https://www.qualit-enr.org/",
      titreLien: "Qualit'EnR",
      titre: "Photovoltaïque en autoconsommation et solaire thermique",
      date: "Juillet 2026",
      commentaire: "Bonnes pratiques d'installation et d'information du client sur la production, l'autoconsommation et la revente du surplus.",
      exploitation: "Preuve : synthèse archivée. Action : mise à jour de l'argumentaire photovoltaïque.",
    },
    {
      lien: "https://www.cnil.fr/",
      titreLien: "CNIL",
      titre: "Outils de gestion de la relation client et protection des données des prospects",
      date: "Juin 2026",
      commentaire: "Recommandations sur les CRM, la durée de conservation des données de prospects et la prospection par email.",
      exploitation: "Preuve : note de veille. Action : mise à jour de la partie RGPD de l'exercice 9.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedTVTEAICaches(f: FormationInfo = FORMATION_TVTE): void {
  try {
    setCachedContentPack(f, TVTE_CONTENT_PACK);
    setCachedEvalPack(f, TVTE_EVAL_PACK);
    setCachedVeillePack(f, TVTE_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
