/**
 * Preset complet « TP Responsable de petite ou moyenne structure » — RNCP38575 (titre professionnel,
 * niveau 5, ministère du Travail, 3 blocs / 9 compétences professionnelles du REAC).
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - Formation 595 h en centre, découpée selon le référentiel : socle commun, AT1 (CP1-CP3),
 *    AT2 (CP4-CP6), AT3 (CP7-CP9), préparation de l'examen
 *  - AUCUN stagiaire pré-importé (les apprentis / stagiaires sont saisis librement)
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées (socle + CP1 à CP9)
 *    puis 9 QCM de 10 questions, un par compétence professionnelle
 *  - Pack évaluation : QCM de positionnement début / fin (10 Q), cas intermédiaire, évaluation finale
 *    conforme aux modalités de la fiche (présentation d'un projet par bloc + entretien technique)
 *  - Pack veille (réglementaire / métier / technologique)
 * Le référentiel (blocs, compétences, dates, modalités) est repris de la fiche France Compétences.
 * Les réponses propres à chaque stagiaire sont produites par `rpmsHumanized.ts`.
 */
import type { FormationInfo, ReferentielAnalyse } from "@/types/qualiopi";
import type { AIContentPack, AIContentExercise } from "./aiContentPack";
import type { AIEvalPack, AIQCMQuestion } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";

// ---------------------------------------------------------------------------
// Référentiel officiel (fiche France Compétences RNCP38575)
// ---------------------------------------------------------------------------
const MODALITE_BLOC =
  "Présentation d'un projet réalisé en amont de la session (30 min) : le candidat présente au jury, à l'appui d'un dossier imprimé et d'un diaporama, le ou les projets réalisés ; la présentation est suivie d'un entretien technique (15 min).";

export const REFERENTIEL_RPMS: ReferentielAnalyse = {
  code: "RNCP38575",
  type: "RNCP",
  intitule: "Responsable de petite ou moyenne structure",
  niveau: 5,
  certificateur: "MINISTÈRE DU TRAVAIL DU PLEIN EMPLOI ET DE L'INSERTION",
  dateFinEnregistrement: "2029-02-08",
  actif: true,
  blocs: [
    { code: "RNCP38575BC01", intitule: "Diriger une structure avec une équipe" },
    { code: "RNCP38575BC02", intitule: "Mettre en œuvre l'objet social de la structure" },
    { code: "RNCP38575BC03", intitule: "Établir et présenter un rapport d'activité de la structure" },
  ],
  prerequis: "Aucun prérequis fixé par la fiche RNCP38575 ; prérequis d'entrée définis par l'organisme (voir fiche formation).",
  publicVise: "Tout public : apprentis, salariés, demandeurs d'emploi, créateurs ou repreneurs d'entreprise.",
  codesRome: ["M1302"],
  metiers: [
    "Manageur, chef, responsable, directeur adjoint ou directeur de proximité, d'agence, d'unité, de centre de profit ou de site",
    "Délégué ou délégué général d'association",
    "Responsable d'établissement ou d'entreprise",
  ],
  secteurs: [
    "Ensemble des entreprises, établissements et associations du secteur marchand ou non marchand, du domaine privé ou public, répondant à la définition de la petite ou moyenne entreprise",
  ],
  modalitesEvaluation: `Pour chacun des trois blocs : ${MODALITE_BLOC} Le jury s'appuie également sur le Dossier Professionnel (DP) et, le cas échéant, sur les résultats des évaluations passées en cours de formation (ECF). Le titre est obtenu en totalité ou par blocs de compétences.`,
};

// ---------------------------------------------------------------------------
// Formation
// ---------------------------------------------------------------------------
export const FORMATION_RPMS: FormationInfo = {
  intitule: "TP Responsable de petite ou moyenne structure – RNCP38575",
  codeRNCP: "RNCP38575",
  objectifs:
    "Préparer le titre professionnel « Responsable de petite ou moyenne structure » (RNCP38575, niveau 5, ministère du Travail).\nÀ l'issue de la formation, l'apprenant(e) sera capable de :\n- AT1 / CP1 — Développer une vision systémique de la structure dans son environnement : diagnostic externe et interne, positionnement, veille stratégique opérationnelle.\n- AT1 / CP2 — Inscrire la structure dans son territoire : acteurs institutionnels et consulaires, réseaux, partenariats, visibilité sur Internet et les réseaux sociaux.\n- AT1 / CP3 — Manager et animer une équipe : recrutement, intégration, animation, entretiens, GEPP, droit du travail, QVCT.\n- AT2 / CP4 — Adapter l'offre de la structure à la demande : étude de marché, segmentation, ciblage, positionnement, mix-marketing.\n- AT2 / CP5 — Organiser et développer la diffusion de l'offre : plan d'actions commerciales, prospection multicanale, CRM, fidélisation, suivi des résultats.\n- AT2 / CP6 — Organiser la production : planification, stocks et achats responsables, qualité, sécurité, environnement.\n- AT3 / CP7 — Analyser le bilan de la structure : bilan fonctionnel, fonds de roulement, BFR, trésorerie, ratios, préconisations.\n- AT3 / CP8 — Analyser le compte de résultat de la structure : SIG, CAF, charges fixes et variables, seuil de rentabilité, mesures correctives.\n- AT3 / CP9 — Rédiger le rapport d'activité de la structure : données financières, RSE, QVCT, parité, handicap, environnement, présentation à la gouvernance.",
  prerequis:
    "Niveau baccalauréat (niveau 4) ou équivalent, ou expérience professionnelle significative dans une fonction d'encadrement, de gestion ou de commerce. Maîtrise du français écrit et oral, des outils bureautiques de base (traitement de texte, tableur, messagerie) et d'une connexion internet stable pour les séances à distance. Pour l'apprentissage : avoir entre 16 et 29 ans révolus (sans limite d'âge pour les personnes en situation de handicap) et un contrat d'apprentissage signé avec une structure d'accueil.",
  duree: "595 heures en centre de formation (85 jours de 7 h) réparties sur 12 mois, en alternance avec l'entreprise",
  modalites: "distanciel",
  tarif: "7 500 € net de taxe par apprenti (exonération de TVA – article 261-4-4°-a du CGI), pris en charge par l'OPCO de l'employeur",
  programme:
    "SOCLE COMMUN — L'ENVIRONNEMENT DU DIRIGEANT DE PME (35 h)\nL'emploi-type RPMS (niveau 5, ROME M1302), les 3 activités-types et 9 compétences du REAC, les compétences transversales ; obligations du dirigeant : facturation électronique (réception obligatoire au 1er septembre 2026, émission pour les PME au 1er septembre 2027), e-reporting, CSRD après la directive Omnibus, DPEF, lois AGEC, Climat et Résilience, Industrie verte, index égalité professionnelle (dès 50 salariés), obligation d'emploi des travailleurs handicapés (6 % dès 20 salariés).\n\nBLOC 1 — DIRIGER UNE STRUCTURE AVEC UNE ÉQUIPE (196 h)\nCP1 — Développer une vision systémique de la structure dans son environnement (56 h) : PESTEL, SWOT, 5 forces de Porter, chaîne de valeur, positionnement, dispositif de veille (périmètre, sources, outils, diffusion, exploitation), responsabilité civile et pénale du dirigeant, sécurité numérique et RGPD.\nCP2 — Inscrire la structure dans son territoire (42 h) : cartographie des acteurs (préfecture, DREETS/DDETS, Région, EPCI, CCI, CMA, Bpifrance, réseaux d'entreprises, France Travail, ESS), visibilité numérique territoriale (Google Business Profile, SEO local, règle NAP, LinkedIn, réseaux sociaux, annuaires), partenariats, mécénat, clauses sociales des marchés publics.\nCP3 — Manager et animer une équipe (98 h) : processus de recrutement (fiche de poste, sourcing, entretien structuré STAR, DPAE, onboarding 90 jours), management situationnel, motivation, conduite de réunion, gestion des conflits (DESC, médiation), entretiens annuel et professionnel, droit du travail (contrats, durée du travail, CSE dès 11 salariés, DUERP), GEPP, QVCT, non-discrimination, handicap.\n\nBLOC 2 — METTRE EN ŒUVRE L'OBJET SOCIAL DE LA STRUCTURE (196 h)\nCP4 — Adapter l'offre de la structure à la demande (56 h) : étude de marché quantitative et qualitative, segmentation, ciblage (matrice attractivité × accessibilité), positionnement, persona, mix-marketing 4P / 7P, fixation des prix, écoconception et accessibilité de l'offre.\nCP5 — Organiser et développer la diffusion de l'offre (70 h) : plan d'actions commerciales 12 mois, objectifs SMART, prospection multicanale (phoning BEBEDC, emailing conforme au RGPD, social selling), CRM et entonnoir de conversion, négociation, CGV et devis, fidélisation (NPS, CSAT, CES), réclamations (méthode CRAC), relations fournisseurs, tableau de bord commercial.\nCP6 — Organiser la production (70 h) : planification (PERT, Gantt, Kanban), gestion des stocks (ABC, Wilson, juste-à-temps), achats responsables (ISO 20400), qualité (PDCA, Ishikawa, 5 Pourquoi, 5S, ISO 9001), TRS, sécurité (DUERP, EPI), environnement (bilan carbone simplifié, tri 5 flux, REP).\n\nBLOC 3 — ÉTABLIR ET PRÉSENTER UN RAPPORT D'ACTIVITÉ DE LA STRUCTURE (154 h)\nCP7 — Analyser le bilan de la structure (56 h) : bilan comptable et bilan fonctionnel, fonds de roulement, BFR, trésorerie nette, ratios d'autonomie, d'indépendance, d'endettement, délais clients et fournisseurs, difficultés et procédures collectives, préconisations.\nCP8 — Analyser le compte de résultat de la structure (56 h) : soldes intermédiaires de gestion, CAF (méthodes additive et soustractive), ratios de rentabilité, charges fixes et variables, marge sur coût variable, seuil de rentabilité, point mort, analyse des écarts N/N-1, mesures correctives.\nCP9 — Rédiger le rapport d'activité de la structure (42 h) : plan type, mot du dirigeant, indicateurs N/N-1/N-2, data-visualisation, volet RSE (environnement, social, sociétal), index égalité, emploi des travailleurs handicapés, QVCT, présentation orale à la gouvernance.\n\nCOMPÉTENCES TRANSVERSALES ET PRÉPARATION DE L'EXAMEN (14 h)\nCommuniquer, évaluer ses actions, traiter l'information, organiser ses actions, résoudre des problèmes ; construction du Dossier Professionnel ; préparation des trois présentations de projet et de l'entretien technique.",
  methodesEvaluation:
    "Évaluation des besoins et test de positionnement à l'entrée (10 questions ouvertes + QCM 10 questions), une mise en situation professionnelle corrigée par compétence (CP1 à CP9) et un QCM de 10 questions par compétence, cas pratique intermédiaire, test de positionnement de fin (10 questions ouvertes + QCM 10 questions), évaluations passées en cours de formation (ECF). Examen conforme à la fiche RNCP38575 : pour chacun des trois blocs, présentation d'un projet réalisé en amont de la session (30 min) suivie d'un entretien technique (15 min) devant un jury de professionnels, sur la base du Dossier Professionnel. Le titre est obtenu en totalité ou par blocs de compétences. Attestation de fin de formation, questionnaires de satisfaction à chaud et à froid, suivi tripartite avec le maître d'apprentissage.",
  moyensPedagogiques:
    "Classes virtuelles en visioconférence (Google Meet / Zoom) avec partage d'écran, plateforme LMS (livret pédagogique en 11 chapitres, cahier d'exercices, corrigés publiés après correction, QCM en ligne), études de cas d'entreprises (PME industrielle, de services, BTP, association), modèles et outils : matrices PESTEL / SWOT, trame de plan d'actions commerciales, tableurs de bilan fonctionnel, de SIG et de seuil de rentabilité, trame de rapport d'activité, CRM en version d'essai (HubSpot Free, Axonaut), outils de veille (Google Alerts, Feedly). Livret d'apprentissage tripartite, visites en entreprise, assistance pédagogique et technique par mail et téléphone sous 48 h ouvrées.",
  publicVise:
    "Apprentis de 16 à 29 ans en contrat d'apprentissage, salariés en évolution vers une fonction de direction, managers de proximité, responsables d'agence ou de site, créateurs et repreneurs d'entreprise, dirigeants d'association, demandeurs d'emploi visant un poste d'encadrement dans une structure de moins de 50 salariés.",
  delaiAcces: "14 jours après signature du contrat d'apprentissage (entrées possibles tout au long de l'année, sous réserve de places disponibles).",
  dateDebut: "2026-11-02",
  dateFin: "2027-10-29",
  lieu: "Google Meet / Zoom",
  nombreParticipants: "12",
  formateur: "",
  rythmeAlternance: "2 jours CFA / 3 jours entreprise",
  referentiel: REFERENTIEL_RPMS,
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Lire un bilan et un compte de résultat pour piloter la structure à partir de ses chiffres réels.",
  "Calculer le seuil de rentabilité et suivre la trésorerie mois par mois.",
  "Recruter, intégrer et animer une équipe en respectant le droit du travail.",
  "Construire un plan d'actions commerciales chiffré et suivre ses indicateurs.",
  "Mettre en place une veille stratégique utile, sans y passer des heures.",
  "Développer la visibilité locale de la structure (fiche Google, réseaux, partenaires du territoire).",
  "Organiser la production ou la prestation pour réduire les erreurs, les retards et les ruptures.",
  "Rédiger et présenter un rapport d'activité clair, y compris le volet RSE.",
  "Connaître les obligations du dirigeant : DUERP, CSE, facturation électronique, index égalité, emploi des travailleurs handicapés.",
  "Préparer le Dossier Professionnel et les présentations de projet devant le jury.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins conduite à l'entrée (entretien individuel, test de positionnement, échange avec le maître d'apprentissage ou l'employeur) fait apparaître un groupe aux profils variés : des apprentis issus d'un bac professionnel ou d'un BTS du commerce et de la gestion, des salariés déjà en position d'encadrement et des porteurs de projet de création ou de reprise. Trois besoins sont partagés par la quasi-totalité du groupe.</p>
<ul>
  <li><strong>L'analyse financière (bloc 3)</strong> : bilan fonctionnel, BFR, SIG et seuil de rentabilité sont mal maîtrisés, alors qu'ils conditionnent la présentation du projet du bloc 3 et le pilotage quotidien.</li>
  <li><strong>Le management d'une équipe (CP3)</strong> : recrutement, entretiens, gestion des conflits et obligations sociales sont souvent abordés de façon intuitive, sans méthode ni connaissance des seuils légaux.</li>
  <li><strong>La formalisation (CP5 et CP9)</strong> : plan d'actions commerciales, tableau de bord et rapport d'activité sont rarement écrits, alors qu'ils servent de support aux projets présentés au jury.</li>
</ul>
<p>Les apprentis expriment en complément un besoin de méthode et de vocabulaire de gestion ; les salariés en poste un besoin de prise de recul stratégique ; les porteurs de projet un besoin de chiffrage (prévisionnel, point mort, trésorerie).</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Apprentis sans expérience d'encadrement</strong> : fiches méthodes (PESTEL, SWOT, bilan fonctionnel, SIG) remises dès le socle commun, exercices d'application sur les données réelles de l'entreprise d'accueil, point mensuel avec le maître d'apprentissage pour choisir les situations du Dossier Professionnel.</li>
  <li><strong>Salariés déjà en poste</strong> : projets de bloc construits sur leur propre structure, travail approfondi sur la stratégie (CP1) et le rapport d'activité (CP9), rôle de binôme-ressource lors des études de cas.</li>
  <li><strong>Porteurs de projet de création ou de reprise</strong> : mises en situation CP7 et CP8 réalisées sur leur prévisionnel, accompagnement sur le plan de financement et le choix du statut.</li>
  <li><strong>Remise à niveau en calcul financier</strong> : deux séances de soutien en classe virtuelle avant le bloc 3, tableurs pré-formatés, corrigés commentés pas à pas.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, supports accessibles (polices agrandies, documents compatibles lecteur d'écran), temps majoré pour les évaluations sur demande, enregistrement des classes virtuelles.</li>
</ul>`;

/** Mises en situation (une par compétence + socle), corrigés issus des corrigés formateur. */
export const RPMS_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — Socle commun : cartographier les obligations du dirigeant de la structure",
    consigne:
      "Pour la structure qui vous accueille (ou une PME de 30 salariés si vous n'êtes pas encore en poste), dressez le tableau des obligations du dirigeant : facturation électronique, représentation du personnel, prévention des risques, égalité professionnelle, emploi des travailleurs handicapés, reporting extra-financier. Pour chacune, indiquez le seuil, l'échéance, le responsable interne et la preuve à conserver.",
    reponseAttendue:
      "Facturation électronique : réception obligatoire pour toutes les entreprises assujetties depuis le 1er septembre 2026, émission obligatoire pour les PME et micro-entreprises au 1er septembre 2027 ; choix d'une plateforme agréée (PDP) ; e-reporting des opérations B2C et internationales.\nCSE : obligatoire dès 11 salariés pendant 12 mois consécutifs ; attributions étendues à partir de 50 salariés ; CSSCT obligatoire dès 300 salariés.\nDUERP : obligatoire dès le premier salarié, mise à jour annuelle (entreprises d'au moins 11 salariés) et à chaque changement important, conservation 40 ans.\nIndex égalité professionnelle : dès 50 salariés, publication au 1er mars.\nObligation d'emploi des travailleurs handicapés : 6 % de l'effectif dès 20 salariés, déclaration via la DSN.\nCSRD : depuis la directive Omnibus de 2025, réservée aux grandes entreprises ; une PME n'y est pas soumise directement mais reçoit les questionnaires RSE de ses clients.\nBarème : 6 obligations × 3 pts (seuil, échéance, preuve) + 2 pts pour la désignation d'un responsable interne.",
    points: 20,
  },
  {
    titre: "Exercice 2 — CP1 : diagnostic stratégique et dispositif de veille d'une PME industrielle",
    consigne:
      "Vous prenez la direction d'une PME industrielle (38 salariés, CA 6,2 M€). 1. Réalisez une analyse PESTEL contextualisée (2 facteurs par dimension). 2. Construisez la matrice SWOT (5 items par case). 3. Appliquez les 5 forces de Porter au secteur. 4. Concevez un dispositif de veille stratégique (5 sources, 2 outils, fréquence, pilote). 5. Identifiez 3 acteurs clés du territoire à rencontrer. 6. Rédigez une note de synthèse de 2 pages avec 4 recommandations stratégiques argumentées.",
    reponseAttendue:
      "PESTEL : 2 facteurs datés et sourcés par dimension, reliés à l'activité industrielle (prix de l'énergie, taux directeur, normes environnementales, facturation électronique, tensions de recrutement…).\nSWOT : 5 items par case ; forces et faiblesses strictement internes, opportunités et menaces strictement externes, sans confusion entre les deux.\nPorter : les 5 forces notées (faible / moyenne / forte) et justifiées par des éléments du secteur.\nVeille : 5 sources fiables (INSEE, CCI, fédération professionnelle, BODACC, INPI…), 2 outils (Google Alerts, Feedly…), fréquence de collecte, pilote nommé, mode de diffusion (réunion de direction, note mensuelle).\nActeurs du territoire : 3 acteurs pertinents avec l'objectif de la rencontre (CCI, Région, Bpifrance, pôle de compétitivité…).\nNote de synthèse : 4 recommandations reliées explicitement aux constats du diagnostic.\nBarème : PESTEL 4, SWOT 4, Porter 3, veille 4, acteurs 1, note de synthèse 4.",
    points: 20,
  },
  {
    titre: "Exercice 3 — CP2 : plan d'inscription territoriale et de visibilité numérique",
    consigne:
      "Une PME de 32 salariés vient de s'implanter en Occitanie. 1. Cartographiez les acteurs institutionnels (préfecture, DREETS, Région, EPCI, CCI, CMA) et leur rôle pour l'entreprise. 2. Construisez un plan de visibilité numérique sur 6 mois : Google Business Profile, SEO local (10 mots-clés), LinkedIn, annuaires. 3. Proposez 8 actions de présence physique sur 12 mois. 4. Proposez 3 partenariats stratégiques et leurs bénéfices. 5. Établissez un budget de 18 000 € HT et 5 KPI mensuels.",
    reponseAttendue:
      "Cartographie : préfecture, DREETS / DDETS, Région Occitanie, EPCI, CCI, CMA, avec le rôle de chacun pour l'entreprise (aides, formalités, emploi, réseaux).\nPlan numérique 6 mois chiffré ; NAP (nom, adresse, téléphone) strictement identique sur tous les supports ; 10 mots-clés locaux cohérents avec l'activité.\n8 actions physiques datées (salon, club d'entreprises, afterwork, forum emploi, porte ouverte…).\n3 partenariats avec bénéfice réciproque (école ou CFA, fournisseur local, association, collectivité).\nBudget total inférieur ou égal à 18 000 € HT, ventilé par action ; 5 KPI mesurables chaque mois (vues de la fiche Google, appels, demandes d'itinéraire, leads, abonnés LinkedIn).\nBarème : cartographie 4, plan numérique 5, actions physiques 4, partenariats 3, budget et KPI 4.",
    points: 20,
  },
  {
    titre: "Exercice 4 — CP3 : recruter, intégrer et réduire le turnover d'une équipe",
    consigne:
      "Agence de 24 collaborateurs : recrutement d'un chef de projet senior et restructuration de l'animation d'équipe (turnover 28 %). 1. Rédigez la fiche de poste complète. 2. Établissez un plan de sourcing multicanal budgété. 3. Construisez une grille d'entretien structurée STAR (8 questions). 4. Planifiez l'onboarding sur 90 jours (J1, S1, M1, M3). 5. Réalisez un Ishikawa 5M des causes du turnover. 6. Construisez un plan managérial sur 6 mois (rituels, entretiens, baromètre QVCT). 7. Planifiez les entretiens professionnels.",
    reponseAttendue:
      "Fiche de poste complète : intitulé, rattachement, missions, compétences, conditions, rémunération, type de contrat.\nSourcing multicanal budgété (France Travail, APEC, jobboards, LinkedIn, cooptation) ; grille STAR de 8 questions comportementales, identiques pour tous les candidats.\nFormalités : DPAE auprès de l'URSSAF dans les 8 jours précédant l'embauche, contrat signé, visite d'information et de prévention, mutuelle.\nOnboarding J1 / S1 / M1 / M3 avec responsable et livrables, bilan de fin de période d'essai.\nIshikawa : causes classées par M (méthode, main-d'œuvre, milieu, matériel, management) ; plan managérial avec rituels, entretiens individuels et baromètre QVCT.\nEntretiens professionnels planifiés ; rappel : dans les entreprises d'au moins 50 salariés, le manquement est sanctionné par un abondement correctif du CPF de 3 000 €.\nBarème : fiche de poste 3, sourcing et STAR 4, onboarding 3, Ishikawa 3, plan managérial 4, entretiens 3.",
    points: 20,
  },
  {
    titre: "Exercice 5 — CP4 : adapter l'offre d'une PME cosmétique bio à sa demande",
    consigne:
      "PME cosmétique bio (28 salariés, CA 1,8 M€). 1. Concevez l'étude de marché (sources, méthode quantitative et qualitative). 2. Segmentez le marché en 3 segments (critères socio-démographiques, psychographiques, comportementaux). 3. Rédigez 2 personas détaillés. 4. Choisissez la cible prioritaire (matrice attractivité × accessibilité). 5. Rédigez la formule de positionnement. 6. Construisez le mix-marketing 7P (3 actions par P). 7. Estimez le potentiel de CA additionnel à 12 mois.",
    reponseAttendue:
      "Étude de marché mixant sources secondaires (INSEE, fédération, études sectorielles, Google Trends) et enquête terrain (questionnaire, entretiens semi-directifs, observation en point de vente).\n3 segments décrits avec les 3 types de critères ; 2 personas réalistes (âge, métier, objectifs, freins, parcours d'achat).\nMatrice attractivité × accessibilité justifiant la cible prioritaire ; formule complète : « Pour [cible], notre offre est [catégorie] qui apporte [bénéfice], différemment de [concurrents] ».\n7P avec 3 actions chacun (produit, prix, distribution, communication, personnel, processus, preuve physique).\nEstimation du CA additionnel argumentée : taille de la cible × taux de pénétration visé × panier moyen × fréquence d'achat.\nBarème : étude 3, segmentation 3, personas 3, ciblage 2, positionnement 2, 7P 5, estimation 2.",
    points: 20,
  },
  {
    titre: "Exercice 6 — CP5 : plan d'actions commerciales d'une agence B2B",
    consigne:
      "Agence de communication B2B (14 salariés, CA 1,1 M€), objectif N+1 : 1,4 M€. 1. Fixez 4 objectifs SMART. 2. Construisez le plan d'actions commerciales sur 12 mois (cibles, actions, moyens, calendrier, KPI). 3. Organisez la prospection multicanale : phoning BEBEDC, emailing conforme au RGPD, social selling LinkedIn. 4. Choisissez un CRM (Axonaut, Sellsy ou HubSpot Free) avec son budget. 5. Construisez l'entonnoir de conversion avec des taux cibles. 6. Bâtissez un plan de fidélisation (NPS, CSAT, programme). 7. Proposez un tableau de bord commercial de 10 KPI.",
    reponseAttendue:
      "Objectif global : passer de 1,1 à 1,4 M€, soit +300 k€ (+27,3 %) ; 4 objectifs SMART cohérents avec ce total (nouveaux clients, panier moyen, fidélisation, taux de transformation).\nPAC 12 mois : cibles, actions, moyens, calendrier trimestriel, KPI.\nPhoning BEBEDC (besoin, enjeux, budget, échéance, décideurs, concurrence), emailing conforme au RGPD (intérêt légitime en B2B, lien de désinscription), social selling LinkedIn.\nCRM choisi avec son coût annuel ; entonnoir suspects → prospects → leads qualifiés → opportunités → clients avec des taux de conversion réalistes (15 à 35 %).\nPlan de fidélisation : NPS (promoteurs 9-10 moins détracteurs 0-6), CSAT, programme de fidélité, gestion des réclamations (méthode CRAC).\nTableau de bord de 10 KPI suivis mensuellement (rendez-vous, devis, taux de signature, CA, marge, panier moyen, NPS…).\nBarème : objectifs 3, PAC 5, prospection 3, CRM 2, entonnoir 3, fidélisation 2, tableau de bord 2.",
    points: 20,
  },
  {
    titre: "Exercice 7 — CP6 : réorganiser la production d'une PME industrielle",
    consigne:
      "PME industrielle (45 salariés, CA 8,5 M€) : taux de rebut 4,8 %, TRS 62 %, ruptures sur les références A. 1. Réalisez une VSM simplifiée. 2. Expliquez le calcul du TRS (disponibilité × performance × qualité). 3. Planifiez un chantier 5S sur 8 semaines. 4. Appliquez la méthode ABC et la formule de Wilson pour les stocks. 5. Analysez le rebut par un Ishikawa 5M et les 5 Pourquoi. 6. Construisez un plan PDCA sur 6 mois (5 actions chiffrées en €). 7. Évaluez une démarche ISO 9001 (coût, durée, gains).",
    reponseAttendue:
      "VSM : flux matière et flux d'information, temps de cycle, stocks intermédiaires, goulet d'étranglement identifié.\nTRS = disponibilité × performance × qualité ; un TRS de 62 % est faible (cible courante 85 %) ; taux de qualité actuel = 1 − 4,8 % = 95,2 %.\n5S (trier, ranger, nettoyer, standardiser, respecter) planifié sur 8 semaines avec un pilote par zone.\nABC : A ≈ 20 % des références pour 80 % de la valeur, suivi serré et stock de sécurité ; Wilson Q* = √(2 × D × Cl / Cs).\nIshikawa (matière, matériel, méthode, main-d'œuvre, milieu) et 5 Pourquoi jusqu'à la cause racine du rebut.\nPDCA avec 5 actions chiffrées en euros ; ISO 9001 : coût, durée de 12 à 18 mois, gains attendus (réduction du rebut, accès à des marchés).\nBarème : VSM 3, TRS 3, 5S 2, stocks 3, Ishikawa et 5 Pourquoi 3, PDCA 4, ISO 9001 2.",
    points: 20,
  },
  {
    titre: "Exercice 8 — CP7 : analyser le bilan d'une PME du BTP",
    consigne:
      "Bilan d'une PME du BTP (50 salariés, CA 7,8 M€). Bilan N (k€) : immobilisations brutes 2 100, amortissements 850, stocks 480, créances TTC 1 920, disponibilités 65, capitaux propres 1 280, dettes LT 720, dettes fournisseurs TTC 980, dettes fiscales et sociales 310, concours bancaires courants 425. 1. Établissez le bilan fonctionnel. 2. Calculez FR, BFR et TN et commentez l'équilibre. 3. Calculez les ratios : autonomie, indépendance, capacité d'endettement (CAF = 240), délai clients (CA TTC = 9 360), délai fournisseurs (achats TTC = 4 200). 4. Comparez aux normes. 5. Relevez 3 faiblesses majeures. 6. Formulez 5 préconisations chiffrées. 7. Évaluez le risque de cessation de paiement à 6 mois.",
    reponseAttendue:
      "Contrôle de l'équilibre : actif brut 2 100 + 480 + 1 920 + 65 = 4 565 k€ ; passif 1 280 + 850 + 720 + 980 + 310 + 425 = 4 565 k€.\nRessources stables = 1 280 + 850 + 720 = 2 850 k€ ; emplois stables = 2 100 k€ ; FR = 750 k€.\nBFR = (480 + 1 920) − (980 + 310) = 1 110 k€ ; TN = 750 − 1 110 = −360 k€ (vérification : 65 − 425).\nAutonomie financière = 1 280 / 3 715 = 34,5 % ; indépendance = 1 280 / 2 000 = 64 % ; capacité d'endettement = 720 / 240 = 3 ans (4,8 ans en intégrant les concours bancaires) ; délai clients = 1 920 / 9 360 × 360 = 74 jours ; délai fournisseurs = 980 / 4 200 × 360 = 84 jours ; BFR = 51 jours de CA HT.\nFaiblesses : trésorerie nette négative financée par le découvert ; délai clients au-delà de 60 jours ; délai fournisseurs au-delà du plafond légal de 60 jours (risque d'amende et de rupture fournisseurs).\nPréconisations : relances et affacturage, acomptes sur chantiers, renforcement des fonds propres ou prêt à moyen terme pour consolider le découvert, réduction des stocks, échéancier fournisseurs conforme.\nRisque de cessation de paiement réel si le découvert autorisé est réduit : plan de trésorerie mensuel à mettre en place.\nBarème : bilan fonctionnel 3, FR-BFR-TN 4, ratios 5, faiblesses 3, préconisations 3, risque 2.",
    points: 20,
  },
  {
    titre: "Exercice 9 — CP8 : analyser le compte de résultat d'une PME de services",
    consigne:
      "Compte de résultat d'une PME de services (CA 2,4 M€, 22 salariés). N (k€) : CA 2 400, achats 720, variation de stocks −30, autres charges externes 380, impôts et taxes 60, personnel 980, dotations aux amortissements 95, charges financières 32, produits financiers 4, résultat exceptionnel +12, IS 28 %. 1. Calculez les SIG. 2. Calculez la CAF par les deux méthodes. 3. Calculez les ratios : taux de VA, taux de marge d'EBE, partage de la VA, marge nette. 4. Hypothèse : seules les consommations d'achats sont variables ; calculez la MCV, son taux et le seuil de rentabilité. 5. Calculez le point mort en jours. 6. Analysez les écarts N/N-1 (CA N-1 = 2 200, EBE N-1 = 285). 7. Formulez 4 préconisations argumentées.",
    reponseAttendue:
      "Consommations en provenance des tiers = 720 − 30 + 380 = 1 070 ; production de l'exercice = 2 400 ; VA = 1 330 ; EBE = 1 330 − 60 − 980 = 290 ; résultat d'exploitation = 290 − 95 = 195 ; résultat courant avant impôt = 195 + 4 − 32 = 167 ; résultat avant IS = 179 ; IS = 50,1 ; résultat net = 128,9 k€.\nCAF additive = 128,9 + 95 = 223,9 ; CAF soustractive = 290 + 4 − 32 + 12 − 50,1 = 223,9 k€.\nTaux de VA = 55,4 % ; taux de marge d'EBE = 12,1 % ; part du personnel dans la VA = 73,7 % ; marge nette = 5,4 %.\nCharges variables = 690 ; MCV = 1 710 (taux 71,25 %) ; charges fixes = 380 + 60 + 980 + 95 + 32 − 4 = 1 543 ; contrôle : 1 710 − 1 543 = 167 ; seuil de rentabilité = 1 543 / 71,25 % = 2 165,6 k€.\nPoint mort = 2 165,6 / 2 400 × 360 = 325 jours (fin novembre).\nÉcarts : CA +200 (+9,1 %), EBE +5 (+1,8 %), taux d'EBE de 12,95 % à 12,1 % : la croissance ne se retrouve pas dans la rentabilité.\nPréconisations : productivité et planification des équipes, révision des prix, maîtrise des charges externes, suivi mensuel du seuil de rentabilité.\nBarème : SIG 5, CAF 3, ratios 3, seuil 4, point mort 1, écarts 2, préconisations 2.",
    points: 20,
  },
  {
    titre: "Exercice 10 — CP9 : rédiger et présenter le rapport d'activité d'une SAS",
    consigne:
      "SAS de 42 salariés (CA 6,9 M€), assemblée des actionnaires dans 5 semaines. 1. Proposez le sommaire en 7 chapitres. 2. Rédigez le mot du dirigeant (1 page). 3. Présentez un tableau N / N-1 / N-2 de 8 KPI et 3 data-visualisations. 4. Rédigez le volet RSE : environnement (bilan carbone Scope 1/2/3, énergie, déchets), social (index égalité, emploi des travailleurs handicapés, QVCT, taux de fréquence et de gravité), sociétal (ancrage territorial, achats responsables). 5. Présentez les perspectives N+1 (3 axes chiffrés). 6. Préparez 12 diapositives (règle 6×6, 25 min) et 5 questions anticipées. 7. Vérifiez les seuils DPEF / CSRD.",
    reponseAttendue:
      "Sommaire en 7 chapitres conforme au plan type (mot du dirigeant, présentation, activité, performance financière, RSE, perspectives, annexes) ; mot du dirigeant d'une page (vision, faits marquants, perspectives).\n8 KPI sur 3 exercices et 3 graphiques lisibles et sourcés.\nRSE : scopes 1/2/3 du bilan carbone, index égalité professionnelle (obligatoire dès 50 salariés : non obligatoire ici, publication volontaire possible), obligation d'emploi de 6 % de travailleurs handicapés (dès 20 salariés : applicable), QVCT, taux de fréquence et de gravité des accidents du travail.\nPerspectives sur 3 axes chiffrés ; 12 diapositives respectant la règle 6×6 ; 5 questions sensibles anticipées (écarts au prévisionnel, départs, contentieux, projets décalés).\nSeuils : une SAS de 42 salariés n'est soumise ni à la DPEF ni à la CSRD ; le volet RSE est volontaire ou demandé par les clients.\nBarème : sommaire et mot 4, KPI et graphiques 4, RSE 5, perspectives 2, diaporama et questions 3, seuils 2.",
    points: 20,
  },
];

// ---------------------------------------------------------------------------
// QCM par compétence professionnelle (10 questions chacun)
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

const QCM_CP1: Q[] = [
  ["Dans l'outil PESTEL, la lettre L désigne :", ["La logistique", "Le leadership", "Le cadre légal", "Le marché local"], 2],
  ["Dans une matrice SWOT, une force est un élément :", ["Interne et favorable", "Externe et favorable", "Externe et défavorable", "Interne et défavorable"], 0],
  ["Lequel de ces éléments ne fait pas partie des 5 forces de Porter ?", ["Le pouvoir de négociation des clients", "La menace des produits de substitution", "La menace des nouveaux entrants", "La rentabilité attendue par les actionnaires"], 3],
  ["La chaîne de valeur de Porter distingue :", ["Les charges fixes et les charges variables", "Les activités principales et les activités de soutien", "L'actif et le passif", "Les clients et les prospects"], 1],
  ["Quel outil gratuit envoie une alerte lorsqu'un concurrent est cité en ligne ?", ["Un tableur", "Un logiciel de paie", "Google Alerts", "Un agenda partagé"], 2],
  ["Le BODACC permet notamment de suivre :", ["Les annonces de créations, cessions et procédures collectives", "Les cours de bourse", "Les offres d'emploi", "Les dépôts de brevets"], 0],
  ["Par rapport à la veille, l'intelligence économique ajoute :", ["La tenue de la comptabilité", "La protection de l'information et l'influence", "La gestion de la paie", "La publicité payante"], 1],
  ["Une approche systémique de la structure consiste à :", ["Analyser chaque service isolément", "Se limiter à l'analyse financière", "Comparer uniquement les prix des concurrents", "Considérer la structure comme un ensemble en interaction avec son environnement"], 3],
  ["En cas de violation de données personnelles présentant un risque, le responsable de traitement notifie la CNIL dans un délai de :", ["24 heures", "72 heures", "15 jours", "1 mois"], 1],
  ["Un diagnostic stratégique sert d'abord à :", ["Fonder un plan d'action stratégique", "Établir les bulletins de paie", "Calculer l'impôt sur les sociétés", "Rédiger les statuts"], 0],
];

const QCM_CP2: Q[] = [
  ["La chambre de métiers et de l'artisanat accompagne principalement :", ["Les banques", "Les entreprises artisanales", "Les sociétés cotées", "Les clubs sportifs"], 1],
  ["Le sigle EPCI désigne :", ["Une école de commerce", "Un organisme de formation", "Un établissement public de coopération intercommunale", "Une caisse de retraite"], 2],
  ["En référencement local, la règle NAP impose :", ["Un nombre minimal d'avis positifs", "Une navigation adaptée au mobile", "Un numéro d'agrément professionnel", "Un nom, une adresse et un téléphone identiques sur tous les supports"], 3],
  ["Quel outil gratuit permet d'apparaître sur Google Maps avec ses horaires et ses avis ?", ["Google Business Profile", "Google Ads", "Google Analytics", "Google Drive"], 0],
  ["Le mécénat d'entreprise ouvre droit à une réduction d'impôt égale à :", ["20 % des versements", "40 % des versements", "60 % des versements, dans la limite du plafond légal", "100 % des versements"], 2],
  ["Bpifrance est :", ["Un syndicat patronal", "La banque publique d'investissement qui finance et garantit les entreprises", "Un éco-organisme", "Une chambre consulaire"], 1],
  ["Le réseau social le plus adapté à la marque employeur en B2B est :", ["Snapchat", "Pinterest", "TikTok", "LinkedIn"], 3],
  ["Les clauses sociales d'insertion des marchés publics permettent :", ["De réserver une part des heures de travail à des personnes éloignées de l'emploi", "De supprimer la mise en concurrence", "De réduire l'impôt sur les sociétés", "De recruter sans contrat de travail"], 0],
  ["Quel indicateur mesure la visibilité d'une fiche d'établissement en ligne ?", ["Le taux d'endettement", "Le nombre de vues, de demandes d'itinéraire et d'appels", "Le capital social", "Le nombre de fournisseurs"], 1],
  ["Le FEDER est :", ["Une taxe locale", "Un label qualité", "Un fonds européen de développement régional", "Une convention collective"], 2],
];

const QCM_CP3: Q[] = [
  ["À partir de quel effectif un CSE doit-il être mis en place ?", ["5 salariés", "11 salariés pendant 12 mois consécutifs", "20 salariés", "50 salariés"], 1],
  ["La DPAE doit être adressée à l'URSSAF :", ["Dans les 8 jours précédant l'embauche", "Dans le mois suivant l'embauche", "À la fin de la période d'essai", "Une fois par an"], 0],
  ["Avec un collaborateur très autonome et compétent, le style de management situationnel adapté est :", ["Directif", "Persuasif", "Participatif", "Délégatif"], 3],
  ["La méthode STAR d'entretien structuré correspond à :", ["Salaire, Temps, Avantages, Retraite", "Situation, Tâche, Action, Résultat", "Stratégie, Talent, Ambition, Rigueur", "Savoir, Technique, Attitude, Réseau"], 1],
  ["Le DUERP est obligatoire :", ["Dès le premier salarié", "À partir de 11 salariés", "À partir de 50 salariés", "Uniquement dans l'industrie"], 0],
  ["La durée maximale d'un CDD, renouvellements inclus, est en principe de :", ["6 mois", "12 mois", "18 mois", "36 mois"], 2],
  ["La méthode DESC sert à :", ["Calculer le seuil de rentabilité", "Formuler une critique constructive : Décrire, Exprimer, Spécifier, Conséquences", "Classer les stocks", "Segmenter un marché"], 1],
  ["Dans une entreprise d'au moins 50 salariés, le manquement aux entretiens professionnels est sanctionné par :", ["Un avertissement de l'inspection du travail", "Une amende de 750 €", "La perte de l'agrément OPCO", "Un abondement correctif du CPF de 3 000 €"], 3],
  ["Selon Herzberg, le salaire est d'abord :", ["Un facteur de motivation", "Un facteur d'hygiène", "Un besoin d'accomplissement", "Un critère de recrutement"], 1],
  ["La GEPP vise à :", ["Anticiper l'évolution des emplois et des compétences", "Tenir la comptabilité", "Gérer la paie", "Planifier la production"], 0],
];

const QCM_CP4: Q[] = [
  ["Une étude qualitative repose principalement sur :", ["Un questionnaire auprès de 1 000 personnes", "Les statistiques de l'INSEE", "Des entretiens semi-directifs et des focus groups", "Le compte de résultat"], 2],
  ["Le sigle STP signifie :", ["Segmentation, Ciblage, Positionnement", "Stratégie, Tarif, Promotion", "Service, Temps, Prix", "Stock, Transport, Production"], 0],
  ["Un persona est :", ["Un concurrent direct", "Le portrait type et fictif d'un client cible", "Un salarié du service commercial", "Un indicateur de rentabilité"], 1],
  ["Le critère RFM de segmentation comportementale correspond à :", ["Revenu, Famille, Métier", "Région, Fréquence, Marque", "Remise, Facture, Marge", "Récence, Fréquence, Montant"], 3],
  ["Les 3 P ajoutés au mix-marketing des services sont :", ["Prix, Place, Promotion", "Personnel, Processus, Preuve physique", "Production, Profit, Planification", "Partenariat, Publicité, Packaging"], 1],
  ["Fixer un prix à partir du coût de revient augmenté d'une marge correspond à la méthode :", ["Du coût majoré", "De la valeur perçue", "De l'alignement sur le marché", "De l'écrémage"], 0],
  ["La matrice attractivité × accessibilité sert à :", ["Calculer le BFR", "Planifier les congés", "Choisir les segments prioritaires", "Évaluer un fournisseur"], 2],
  ["Une formule de positionnement complète précise :", ["Le chiffre d'affaires visé", "Le nombre de salariés", "Le budget publicitaire", "La cible, la catégorie, le bénéfice et la différence face aux concurrents"], 3],
  ["L'écoconception d'une offre consiste à :", ["Réduire ses impacts environnementaux dès sa conception", "Augmenter son prix", "Supprimer l'emballage seulement", "Délocaliser la production"], 0],
  ["Pour estimer un CA additionnel, on multiplie :", ["Le capital par le taux d'IS", "La taille de la cible par le taux de pénétration visé et le panier moyen", "Le nombre de salariés par le SMIC", "Les stocks par le délai clients"], 1],
];

const QCM_CP5: Q[] = [
  ["Un objectif SMART est :", ["Simple, Mesurable, Ambitieux, Rapide, Total", "Spécifique, Mesurable, Atteignable, Réaliste, Temporellement défini", "Stratégique, Moderne, Annuel, Rentable, Testé", "Suivi, Mensuel, Animé, Révisé, Tracé"], 1],
  ["Dans la méthode de découverte BEBEDC, la lettre E du milieu désigne :", ["L'échéance", "L'entreprise", "L'enjeu", "L'effectif"], 0],
  ["En prospection B2B par e-mail, le RGPD exige notamment :", ["Le consentement écrit préalable de chaque salarié", "L'interdiction de tout envoi", "L'envoi depuis une adresse personnelle", "Un message en lien avec la fonction du destinataire et un moyen simple de se désinscrire"], 3],
  ["Le Net Promoter Score se calcule ainsi :", ["% de promoteurs (9-10) moins % de détracteurs (0-6)", "Moyenne des notes de 1 à 5", "Nombre de clients divisé par le nombre de prospects", "CA divisé par le nombre de commandes"], 0],
  ["Un lead qualifié selon BANT a validé :", ["Le bilan, l'actif, la note et la trésorerie", "Le budget, l'autorité, le besoin et le calendrier", "La banque, l'adresse, le nom et le téléphone", "Le besoin uniquement"], 1],
  ["La méthode CRAC de traitement des réclamations enchaîne :", ["Contester, Refuser, Attendre, Clore", "Calculer, Rembourser, Archiver, Classer", "Comprendre, Reformuler, Argumenter et agir, Conclure", "Contacter, Relancer, Appeler, Confirmer"], 2],
  ["Le taux de transformation se calcule par :", ["CA / nombre de salariés", "Clients gagnés / leads qualifiés", "Devis envoyés / CA", "Marge / chiffre d'affaires"], 1],
  ["Lequel de ces outils est un CRM ?", ["Canva", "Excel", "Sellsy", "Doodle"], 2],
  ["Le plan d'actions commerciales est construit en général sur :", ["12 mois", "1 semaine", "10 ans", "1 jour"], 0],
  ["Le ROI d'un salon professionnel se mesure à partir :", ["Du nombre de visiteurs du salon", "Du coût du stand seulement", "Du nombre de brochures distribuées", "Du coût total rapporté aux leads qualifiés et aux signatures"], 3],
];

const QCM_CP6: Q[] = [
  ["Le TRS se calcule par :", ["Disponibilité × Performance × Qualité", "CA / Effectif", "Stock moyen / Achats", "Rebut / Production"], 0],
  ["La méthode PERT permet surtout :", ["De classer les stocks", "D'identifier le chemin critique d'un projet", "De calculer l'EBE", "D'évaluer un fournisseur"], 1],
  ["Dans la méthode ABC, les articles A représentent environ :", ["80 % des références pour 20 % de la valeur", "50 % des références pour 50 % de la valeur", "20 % des références pour 80 % de la valeur", "100 % des références"], 2],
  ["La formule de Wilson détermine :", ["Le seuil de rentabilité", "Le délai fournisseurs", "Le taux de rebut", "La quantité économique de commande"], 3],
  ["Les 5M du diagramme d'Ishikawa sont :", ["Matière, Matériel, Méthode, Main-d'œuvre, Milieu", "Marché, Marge, Mix, Média, Message", "Mois, Mesure, Montant, Moyenne, Médiane", "Manager, Mission, Motivation, Moyens, Mérite"], 0],
  ["La roue de Deming correspond au cycle :", ["Planifier, Recruter, Vendre, Encaisser", "Plan, Do, Check, Act", "Prévoir, Ordonner, Contrôler, Classer", "Produire, Livrer, Facturer, Relancer"], 1],
  ["La première étape d'un chantier 5S est :", ["Nettoyer", "Standardiser", "Trier", "Respecter"], 2],
  ["La norme ISO 20400 porte sur :", ["La qualité", "La sécurité de l'information", "L'environnement", "Les achats responsables"], 3],
  ["Avec la loi AGEC, une entreprise trie séparément :", ["Les 5 flux : papier-carton, métal, plastique, verre, bois", "Uniquement le papier", "Uniquement les déchets dangereux", "Aucun flux en dessous de 50 salariés"], 0],
  ["Le Scope 3 d'un bilan carbone regroupe :", ["Les émissions directes de l'entreprise", "Les émissions indirectes de la chaîne de valeur", "Les émissions liées à l'électricité achetée", "Les émissions des seuls véhicules"], 1],
];

const QCM_CP7: Q[] = [
  ["Le fonds de roulement se calcule par :", ["Actif circulant − dettes fournisseurs", "Ressources stables − emplois stables", "Disponibilités − concours bancaires", "CA − charges"], 1],
  ["La trésorerie nette est égale à :", ["FR − BFR", "BFR − FR", "Capitaux propres − dettes", "Résultat + amortissements"], 0],
  ["Le BFR d'exploitation se calcule par :", ["Capitaux propres − immobilisations", "Résultat net + dotations", "(Stocks + créances clients) − dettes fournisseurs et dettes d'exploitation", "Disponibilités − découvert"], 2],
  ["Le ratio d'autonomie financière rapporte :", ["Les dettes à la CAF", "Les créances au CA", "Le résultat au CA", "Les capitaux propres au total du bilan"], 3],
  ["Le délai de paiement clients en jours se calcule par :", ["(Créances clients TTC / CA TTC) × 360", "(Dettes fournisseurs / achats) × 12", "(Stocks / CA) × 100", "CA / créances"], 0],
  ["Entre professionnels, le délai de paiement convenu ne peut en principe dépasser :", ["30 jours", "60 jours à compter de la date d'émission de la facture", "90 jours", "120 jours"], 1],
  ["Une trésorerie nette négative signifie que :", ["L'entreprise est forcément en liquidation", "Le résultat est négatif", "Le BFR est financé en partie par des concours bancaires", "Les capitaux propres sont négatifs"], 2],
  ["En cas de cessation de paiement, le dirigeant doit la déclarer au tribunal dans un délai de :", ["8 jours", "15 jours", "3 mois", "45 jours"], 3],
  ["La procédure de sauvegarde est ouverte :", ["Avant la cessation de paiement", "Après la liquidation", "Uniquement pour les associations", "Sur décision du CSE"], 0],
  ["La capacité d'endettement est jugée correcte lorsque dettes financières / CAF est :", ["Supérieure à 10 ans", "Inférieure à 4 ans environ", "Égale à zéro", "Supérieure à 100 %"], 1],
];

const QCM_CP8: Q[] = [
  ["La valeur ajoutée se calcule par :", ["CA − charges de personnel", "Résultat net + amortissements", "Marge commerciale + production − consommations en provenance des tiers", "EBE − impôts"], 2],
  ["L'EBE se calcule par :", ["VA + subventions d'exploitation − impôts et taxes − charges de personnel", "CA − achats", "Résultat net − IS", "VA − dotations aux amortissements"], 0],
  ["La CAF par la méthode additive part :", ["De l'EBE", "Du résultat net auquel on ajoute les dotations et retranche les reprises", "Du chiffre d'affaires", "De la trésorerie"], 1],
  ["Le taux de marge sur coût variable se calcule par :", ["CV / CA", "CF / CA", "Résultat / CA", "MCV / CA"], 3],
  ["Le seuil de rentabilité est égal à :", ["Charges fixes / taux de marge sur coût variable", "Charges variables / CA", "CA − charges fixes", "Résultat / taux de MCV"], 0],
  ["Avec CF = 200 000 €, CA = 1 000 000 € et CV = 600 000 €, le seuil de rentabilité est de :", ["400 000 €", "500 000 €", "600 000 €", "800 000 €"], 1],
  ["Dans l'exemple précédent, le point mort est atteint au bout de :", ["90 jours", "120 jours", "180 jours", "300 jours"], 2],
  ["Un loyer de bureau est en principe une charge :", ["Variable", "Exceptionnelle", "Financière", "Fixe"], 3],
  ["Le taux de marge d'EBE rapporte :", ["L'EBE au chiffre d'affaires", "L'EBE aux capitaux propres", "L'EBE aux dettes", "L'EBE aux salaires"], 0],
  ["Si le CA progresse de 9 % et l'EBE de 2 %, on en conclut que :", ["La rentabilité s'améliore fortement", "Les charges progressent plus vite que l'activité", "Le BFR diminue", "La trésorerie est forcément positive"], 1],
];

const QCM_CP9: Q[] = [
  ["Le mot du dirigeant d'un rapport d'activité présente :", ["Le détail des écritures comptables", "La vision, les faits marquants et les perspectives", "La liste des fournisseurs", "Les bulletins de paie"], 1],
  ["L'index de l'égalité professionnelle est obligatoire à partir de :", ["50 salariés", "11 salariés", "20 salariés", "250 salariés"], 0],
  ["L'obligation d'emploi des travailleurs handicapés s'applique à partir de :", ["11 salariés", "50 salariés", "20 salariés, au taux de 6 %", "300 salariés"], 2],
  ["Depuis la directive Omnibus de 2025, la CSRD vise :", ["Toutes les entreprises dès 10 salariés", "Les seules associations", "Les micro-entreprises", "Les grandes entreprises"], 3],
  ["Le Scope 2 d'un bilan carbone correspond :", ["Aux émissions indirectes liées à l'énergie achetée", "Aux déplacements des clients", "Aux émissions des fournisseurs", "À la fin de vie des produits"], 0],
  ["La règle 6×6 d'un diaporama recommande :", ["6 couleurs et 6 polices", "Au plus 6 lignes de 6 mots par diapositive", "6 diapositives de 6 minutes", "6 graphiques par diapositive"], 1],
  ["La norme ISO 26000 comprend :", ["3 questions centrales", "5 questions centrales", "7 questions centrales", "12 questions centrales"], 2],
  ["Le taux de fréquence des accidents du travail rapporte :", ["Les jours perdus aux heures travaillées", "Le coût des accidents au CA", "Le nombre de salariés à l'effectif", "Le nombre d'accidents avec arrêt au million d'heures travaillées"], 3],
  ["La différence entre rapport de gestion et rapport d'activité est que :", ["Le rapport de gestion est un document légal présenté à l'assemblée", "Le rapport d'activité est obligatoire pour toutes les PME", "Ils sont strictement identiques", "Le rapport de gestion est réservé aux associations"], 0],
  ["Avant une assemblée, anticiper les questions sensibles consiste à préparer des réponses sur :", ["La couleur du logo", "Les écarts au prévisionnel, les départs clés et les contentieux", "Le menu du déjeuner", "La liste des invités"], 1],
];

export const RPMS_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM CP1 — Développer une vision systémique de la structure dans son environnement", QCM_CP1),
  qcmExercice("QCM CP2 — Inscrire la structure dans son territoire", QCM_CP2),
  qcmExercice("QCM CP3 — Manager et animer une équipe", QCM_CP3),
  qcmExercice("QCM CP4 — Adapter l'offre de la structure à la demande", QCM_CP4),
  qcmExercice("QCM CP5 — Organiser et développer la diffusion de l'offre", QCM_CP5),
  qcmExercice("QCM CP6 — Organiser la production", QCM_CP6),
  qcmExercice("QCM CP7 — Analyser le bilan de la structure", QCM_CP7),
  qcmExercice("QCM CP8 — Analyser le compte de résultat de la structure", QCM_CP8),
  qcmExercice("QCM CP9 — Rédiger le rapport d'activité de la structure", QCM_CP9),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (socle puis CP1 à CP9). Les questions de
 * positionnement dérivées des 10 premiers exercices suivent ainsi le même ordre que les réponses
 * humanisées (`rpmsHumanized.ts`) ; les 9 QCM par compétence viennent ensuite.
 */
export const RPMS_EXERCICES_COMPLETS: AIContentExercise[] = [...RPMS_EXERCICES, ...RPMS_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Livret pédagogique « TP Responsable de petite ou moyenne structure » (11 chapitres)</strong> : socle commun, CP1 à CP9, compétences transversales et préparation de l'examen.</li>
  <li><strong>Cahier d'exercices</strong> : test de positionnement, 9 mises en situation professionnelles (une par compétence), 4 cas courts, quiz de connaissances ; <strong>corrigés formateur</strong> publiés après correction.</li>
  <li><strong>9 QCM de 10 questions</strong>, un par compétence professionnelle, corrigés et notés sur la plateforme.</li>
  <li><strong>Référentiel RNCP38575</strong> : 3 blocs de compétences, 9 compétences professionnelles, modalités d'évaluation (présentation d'un projet par bloc + entretien technique).</li>
  <li><strong>Trame du Dossier Professionnel</strong> : contexte, objectif, actions, résultats, analyse réflexive, pour chaque compétence.</li>
  <li><strong>Modèles</strong> : matrices PESTEL et SWOT, plan d'actions commerciales, fiche de poste, grille d'entretien STAR, plan d'onboarding, trame de rapport d'activité.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Classe virtuelle</strong> : Google Meet / Zoom avec partage d'écran, tableau blanc collaboratif et salles de sous-groupes pour les études de cas.</li>
  <li><strong>Plateforme LMS</strong> : supports, dépôts des travaux, QCM en ligne, suivi de progression et messagerie formateur.</li>
  <li><strong>Tableurs pré-formatés</strong> : bilan fonctionnel, SIG, CAF, seuil de rentabilité, plan de trésorerie mensuel, tableau de bord commercial.</li>
  <li><strong>CRM en version d'essai</strong> (HubSpot Free, Axonaut) pour construire un entonnoir de conversion.</li>
  <li><strong>Outils de veille</strong> : Google Alerts, Feedly ; <strong>outils de planification</strong> : Trello, GanttProject.</li>
  <li><strong>Outils de data-visualisation</strong> : Looker Studio, Datawrapper pour le rapport d'activité.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>France Compétences — fiche RNCP38575</strong> : <a href="https://www.francecompetences.fr/recherche/rncp/38575/">https://www.francecompetences.fr/recherche/rncp/38575/</a> — blocs, compétences, modalités d'évaluation.</li>
  <li><strong>Entreprendre.Service-Public</strong> : <a href="https://entreprendre.service-public.fr/">https://entreprendre.service-public.fr/</a> — obligations de l'employeur, facturation électronique, seuils d'effectif.</li>
  <li><strong>Bpifrance Création</strong> : <a href="https://bpifrance-creation.fr/">https://bpifrance-creation.fr/</a> — gestion, financement et pilotage des PME.</li>
  <li><strong>Code du travail numérique</strong> : <a href="https://code.travail.gouv.fr/">https://code.travail.gouv.fr/</a> — contrats, durée du travail, CSE, entretiens.</li>
  <li><strong>ADEME — Base Empreinte</strong> : <a href="https://base-empreinte.ademe.fr/">https://base-empreinte.ademe.fr/</a> — facteurs d'émission pour le bilan carbone simplifié.</li>
  <li><strong>INSEE</strong> : <a href="https://www.insee.fr/">https://www.insee.fr/</a> — données sectorielles et territoriales pour le diagnostic et l'étude de marché.</li>
</ul>`;

const RPMS_VIDEOS = [
  { title: "Le titre professionnel Responsable de petite ou moyenne structure", description: "Missions, blocs de compétences et débouchés du RPMS.", url: "https://www.youtube.com/watch?v=2yE6bzj3hFw" },
  { title: "Analyse PESTEL et SWOT : méthode pas à pas", description: "Construire un diagnostic stratégique sans confondre interne et externe.", url: "https://www.youtube.com/results?search_query=analyse+pestel+swot+m%C3%A9thode" },
  { title: "Les 5 forces de Porter expliquées simplement", description: "Évaluer l'attractivité d'un secteur.", url: "https://www.youtube.com/results?search_query=5+forces+de+porter+expliqu%C3%A9es" },
  { title: "Recruter en PME : de la fiche de poste à l'intégration", description: "Sourcing, entretien structuré, DPAE et onboarding.", url: "https://www.youtube.com/results?search_query=recruter+en+pme+fiche+de+poste+onboarding" },
  { title: "Construire un plan d'actions commerciales", description: "Objectifs SMART, actions, calendrier et indicateurs.", url: "https://www.youtube.com/results?search_query=plan+d%27actions+commerciales+m%C3%A9thode" },
  { title: "Le TRS et la démarche Lean en PME", description: "Disponibilité, performance, qualité et 5S.", url: "https://www.youtube.com/results?search_query=TRS+taux+de+rendement+synth%C3%A9tique+lean" },
  { title: "Bilan fonctionnel : FR, BFR et trésorerie nette", description: "Lire l'équilibre financier d'une structure.", url: "https://www.youtube.com/results?search_query=bilan+fonctionnel+FR+BFR+tr%C3%A9sorerie" },
  { title: "Les soldes intermédiaires de gestion et la CAF", description: "De la valeur ajoutée au résultat net.", url: "https://www.youtube.com/results?search_query=soldes+interm%C3%A9diaires+de+gestion+CAF" },
  { title: "Seuil de rentabilité et point mort", description: "Charges fixes, marge sur coût variable, date de rentabilité.", url: "https://www.youtube.com/results?search_query=seuil+de+rentabilit%C3%A9+point+mort+calcul" },
  { title: "Rédiger un rapport d'activité et son volet RSE", description: "Plan type, indicateurs et présentation à la gouvernance.", url: "https://www.youtube.com/results?search_query=rapport+d%27activit%C3%A9+RSE+PME" },
];

export const RPMS_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: RPMS_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: RPMS_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement (cahier d'exercices) et QCM final (corrigés)
// ---------------------------------------------------------------------------
export const RPMS_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Que signifie SWOT ?", options: ["Système de Workflow Opérationnel", "Strengths, Weaknesses, Opportunities, Threats", "Stratégie Webmarketing et Outils", "Suivi Workload et Organisation"], correctIndex: 1 },
  { question: "Qu'est-ce que le BFR ?", options: ["Le Bénéfice Financier Résiduel", "Le Besoin en Fonds de Roulement", "Le Budget Fonctionnel de Recettes", "Le Bilan Financier Restructuré"], correctIndex: 1 },
  { question: "Quel document résume le patrimoine d'une entreprise ?", options: ["Le compte de résultat", "Le bilan", "Le business plan", "Le prévisionnel"], correctIndex: 1 },
  { question: "Que signifie EBE ?", options: ["Excédent Brut d'Exploitation", "Évaluation du Budget d'Entreprise", "État des Bénéfices", "Estimation du Bilan"], correctIndex: 0 },
  { question: "Combien de styles compte le management situationnel (Hersey & Blanchard) ?", options: ["2", "3", "4", "6"], correctIndex: 2 },
  { question: "Quel document d'évaluation des risques est obligatoire dès le premier salarié ?", options: ["Le bilan social", "Le DUERP", "L'index égalité", "Le rapport RSE"], correctIndex: 1 },
  { question: "Que signifie PESTEL ?", options: ["Politique, Économique, Socioculturel, Technologique, Écologique, Légal", "Production, Évaluation, Stratégie, Technique, Engagement, Leadership", "Planification, Exécution, Suivi, Test, Évaluation, Livraison", "Prix, Efficacité, Service, Technologie, Emploi, Logistique"], correctIndex: 0 },
  { question: "Qu'est-ce qu'un tableau de bord de gestion ?", options: ["Un outil comptable obligatoire", "Un document fiscal", "Un outil de pilotage avec indicateurs clés", "Un logiciel de paie"], correctIndex: 2 },
  { question: "À partir de quel effectif un CSE doit-il être mis en place ?", options: ["5 salariés", "11 salariés", "20 salariés", "50 salariés"], correctIndex: 1 },
  { question: "Qu'est-ce que le seuil de rentabilité ?", options: ["Le CA minimum pour couvrir toutes les charges", "Le moment où l'entreprise ferme", "Le bénéfice net maximal", "Le taux d'endettement critique"], correctIndex: 0 },
];

export const RPMS_QCM_FIN: AIQCMQuestion[] = [
  { question: "Comment calcule-t-on le taux de marge brute ?", options: ["CA − charges fixes", "(CA − coût des ventes) / CA", "Résultat net / CA", "EBE / CA"], correctIndex: 1 },
  { question: "Quels sont les 4P du mix marketing ?", options: ["Produit, Prix, Place (distribution), Promotion", "Plan, Politique, Performance, Profit", "Prévision, Production, Pilotage, Performance", "Positionnement, Prospection, Promotion, Partenariat"], correctIndex: 0 },
  { question: "Qu'est-ce que la méthode PDCA ?", options: ["Plan-Do-Check-Act", "Planifier-Développer-Contrôler-Améliorer", "Les deux formulations désignent la roue de Deming", "Aucune des réponses"], correctIndex: 2 },
  { question: "Quelle forme juridique limite la responsabilité des associés à leurs apports ?", options: ["Entreprise individuelle d'avant 2022", "SARL", "Société en nom collectif", "Société en participation"], correctIndex: 1 },
  { question: "Que signifie GEPP ?", options: ["Gestion des Emplois et des Parcours Professionnels", "Guide d'Évaluation du Personnel", "Gestion Économique du Plan de Production", "Grille d'Évaluation du Potentiel"], correctIndex: 0 },
  { question: "Quel outil analyse les 5 forces concurrentielles d'un secteur ?", options: ["La matrice BCG", "Le modèle de Porter", "L'analyse PESTEL", "Le Business Model Canvas"], correctIndex: 1 },
  { question: "Comment calcule-t-on le délai moyen de paiement clients ?", options: ["(Créances clients TTC / CA TTC) × 360", "Créances / dettes × 100", "CA / nombre de clients", "Trésorerie / CA × 360"], correctIndex: 0 },
  { question: "Qu'est-ce que le Balanced Scorecard ?", options: ["Un logiciel de comptabilité", "Un outil de pilotage à 4 perspectives", "Un tableau Excel RH", "Un indicateur boursier"], correctIndex: 1 },
  { question: "Quel document formalise la stratégie et le chiffrage d'un projet d'entreprise ?", options: ["Le bilan comptable", "Le business plan", "La fiche de paie", "L'organigramme"], correctIndex: 1 },
  { question: "Quelle est la durée légale du travail en France ?", options: ["32 h par semaine", "35 h par semaine", "37 h par semaine", "39 h par semaine"], correctIndex: 1 },
];

export const RPMS_EVAL_PACK: AIEvalPack = {
  qcmDebut: RPMS_QCM_DEBUT,
  qcmFin: RPMS_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du bloc 1) — reprise d'une agence de 15 salariés",
    contexte:
      "Vous venez de prendre la responsabilité d'une agence de services de 15 salariés dont le chiffre d'affaires a baissé de 12 % sur l'exercice. Deux collaborateurs sont en conflit ouvert, un poste de commercial est vacant depuis trois mois et l'agence n'apparaît pas sur les recherches locales.",
    questions: [
      { question: "Quels outils de diagnostic mobilisez-vous en priorité et pourquoi ?", reponseAttendue: "PESTEL pour l'environnement (concurrence locale, conjoncture, réglementation), SWOT pour croiser forces et faiblesses internes avec opportunités et menaces externes, analyse des clients perdus (motifs, prix, concurrence). Le diagnostic fonde les priorités du plan d'action ; on ne confond pas interne et externe.", points: 5 },
      { question: "Comment traitez-vous le conflit entre les deux collaborateurs ?", reponseAttendue: "Entretiens individuels pour écouter chaque partie, identification des causes (organisation, relation, valeurs), médiation avec la méthode DESC, solutions concrètes (répartition des tâches, règles de fonctionnement), suivi à J+15 et J+30, traçabilité écrite des engagements.", points: 5 },
      { question: "Comment organisez-vous le recrutement du commercial ?", reponseAttendue: "Fiche de poste, sourcing multicanal (France Travail, jobboards, LinkedIn, cooptation, alternance), entretien structuré STAR identique pour tous les candidats, DPAE dans les 8 jours précédant l'embauche, parcours d'intégration avec formation produit, accompagnement terrain, points hebdomadaires et bilan de fin de période d'essai.", points: 5 },
      { question: "Quelles actions de visibilité territoriale lancez-vous dans les trois premiers mois ?", reponseAttendue: "Création ou mise à jour de la fiche Google Business Profile, cohérence NAP sur tous les supports, page LinkedIn de l'agence, adhésion à un club d'entreprises ou à la CCI, participation à un événement local, sollicitation d'avis clients ; KPI suivis chaque mois (vues, appels, demandes d'itinéraire, leads).", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale — présentation d'un projet par bloc (30 min) et entretien technique (15 min), sur la base du Dossier Professionnel",
    exercices: [
      {
        titre: "Projet bloc 1 — Diriger une structure avec une équipe (CP1, CP2, CP3)",
        consigne: "Présentez au jury, dossier imprimé et diaporama à l'appui, le projet réalisé en amont : diagnostic stratégique de votre structure, plan d'inscription territoriale et plan managérial de l'équipe.",
        reponseAttendue: "Diagnostic PESTEL / SWOT / Porter étayé par des sources, dispositif de veille opérationnel, acteurs du territoire identifiés et actions de visibilité mesurées, organisation de l'équipe (recrutement, intégration, rituels, entretiens, GEPP) conforme au droit du travail, réponses précises aux questions du jury.",
        points: 20,
      },
      {
        titre: "Projet bloc 2 — Mettre en œuvre l'objet social de la structure (CP4, CP5, CP6)",
        consigne: "Présentez le projet réalisé en amont : adaptation de l'offre à la demande, plan d'actions commerciales et organisation de la production ou de la prestation.",
        reponseAttendue: "Étude de marché et segmentation justifiées, positionnement et mix cohérents, plan d'actions commerciales chiffré avec objectifs SMART et indicateurs, organisation de la production (planification, stocks, qualité, sécurité, environnement) adaptée aux résultats commerciaux et aux aléas.",
        points: 20,
      },
      {
        titre: "Projet bloc 3 (partie 1) — Analyser le bilan et le compte de résultat (CP7, CP8)",
        consigne: "Présentez l'analyse financière de la structure : bilan fonctionnel, FR, BFR, trésorerie, ratios, SIG, CAF, seuil de rentabilité et préconisations.",
        reponseAttendue: "Calculs exacts et justifiés, variations des postes expliquées, ratios comparés aux normes du secteur, seuil de rentabilité et point mort interprétés, préconisations argumentées et chiffrées.",
        points: 20,
      },
      {
        titre: "Projet bloc 3 (partie 2) — Rédiger et présenter le rapport d'activité (CP9)",
        consigne: "Présentez le rapport d'activité de la structure comme devant sa gouvernance : faits marquants, indicateurs, volet RSE, perspectives.",
        reponseAttendue: "Rapport structuré selon le plan type, langage clair pour un non-spécialiste, indicateurs N / N-1 lisibles, volet RSE (environnement, social, sociétal) conforme aux seuils applicables, perspectives chiffrées, posture orale adaptée et anticipation des questions sensibles.",
        points: 20,
      },
      {
        titre: "Entretien technique — Dossier Professionnel et compétences transversales",
        consigne: "Répondez aux questions du jury sur les situations décrites dans votre Dossier Professionnel et sur votre pratique de dirigeant.",
        reponseAttendue: "Situations professionnelles décrites selon la trame (contexte, objectif, actions, résultats, analyse réflexive), cohérence entre le DP et les projets présentés, maîtrise des compétences transversales (communiquer, évaluer ses actions, traiter l'information, organiser ses actions, résoudre un problème).",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const RPMS_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.francecompetences.fr/recherche/rncp/38575/",
      titreLien: "France Compétences — RNCP38575",
      titre: "Fiche « Responsable de petite ou moyenne structure » : blocs, compétences et modalités d'évaluation",
      date: "Septembre 2026",
      commentaire: "Vérification trimestrielle de l'enregistrement (fin de validité au 8 février 2029), des trois blocs de compétences et des modalités d'évaluation par présentation d'un projet et entretien technique.",
      exploitation: "Preuve : capture datée de la fiche archivée au dossier Qualiopi. Action : alignement du programme, des mises en situation et de la préparation à l'examen sur le référentiel en vigueur.",
    },
    {
      lien: "https://entreprendre.service-public.fr/",
      titreLien: "Entreprendre.Service-Public — facturation électronique",
      titre: "Généralisation de la facturation électronique : réception au 1er septembre 2026, émission des PME au 1er septembre 2027",
      date: "Août 2026",
      commentaire: "Suivi du calendrier et des obligations : choix d'une plateforme agréée, mentions obligatoires, e-reporting des opérations B2C et internationales.",
      exploitation: "Preuve : note de veille diffusée à l'équipe pédagogique. Action : mise à jour du socle commun et de l'exercice sur les obligations du dirigeant.",
    },
    {
      lien: "https://code.travail.gouv.fr/",
      titreLien: "Code du travail numérique",
      titre: "Entretien professionnel, seuils d'effectif et obligations de l'employeur",
      date: "Juillet 2026",
      commentaire: "Veille sur la réforme de l'entretien professionnel, les seuils (CSE, DUERP, index égalité, obligation d'emploi des travailleurs handicapés) et leurs modalités de calcul.",
      exploitation: "Preuve : fiche mémo des seuils remise aux apprentis. Action : actualisation de la séquence droit du travail de la CP3.",
    },
    {
      lien: "https://eur-lex.europa.eu/",
      titreLien: "EUR-Lex — directive Omnibus",
      titre: "Réduction du périmètre de la CSRD et effets en cascade sur les PME fournisseurs",
      date: "Juin 2026",
      commentaire: "La directive Omnibus de 2025 recentre la CSRD sur les grandes entreprises ; les PME reçoivent néanmoins des questionnaires RSE de leurs clients.",
      exploitation: "Preuve : synthèse archivée. Action : adaptation du volet RSE de la CP9 et du corrigé de l'exercice 10.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance",
      titre: "Délais de paiement interentreprises et sanctions de la DGCCRF",
      date: "Mai 2026",
      commentaire: "Rappel du plafond de 60 jours à compter de l'émission de la facture et des amendes administratives prononcées en cas de dépassement.",
      exploitation: "Preuve : extrait réglementaire archivé. Action : intégration au corrigé de la mise en situation CP7 (délai fournisseurs de 84 jours).",
    },
  ],
  metier: [
    {
      lien: "https://www.francetravail.fr/",
      titreLien: "France Travail",
      titre: "Offres et tensions de recrutement sur les postes de direction de PME (ROME M1302)",
      date: "Août 2026",
      commentaire: "Relevé des offres de responsable d'agence, de site ou de structure, des compétences demandées et des niveaux de rémunération.",
      exploitation: "Preuve : extraction datée jointe au dossier. Action : actualisation de la présentation des débouchés au démarrage.",
    },
    {
      lien: "https://bpifrance-creation.fr/",
      titreLien: "Bpifrance Création",
      titre: "Pilotage financier et prévention des difficultés en PME",
      date: "Juillet 2026",
      commentaire: "Veille sur les outils de prévention (plan de trésorerie, alertes, procédures amiables) et les financements disponibles pour les TPE-PME.",
      exploitation: "Preuve : fiche pratique remise au bloc 3. Action : ajout d'un temps sur la conciliation et le mandat ad hoc dans la CP7.",
    },
    {
      lien: "https://www.insee.fr/",
      titreLien: "INSEE",
      titre: "Démographie des entreprises et défaillances par secteur",
      date: "Juin 2026",
      commentaire: "Suivi des créations, reprises et défaillances de PME, utilisé pour contextualiser les diagnostics stratégiques des apprentis.",
      exploitation: "Preuve : tableau sectoriel mis à jour sur la plateforme. Action : actualisation des données de la mise en situation CP1.",
    },
    {
      lien: "https://www.anact.fr/",
      titreLien: "ANACT",
      titre: "Qualité de vie et des conditions de travail dans les TPE-PME",
      date: "Mai 2026",
      commentaire: "Outils et retours d'expérience sur la QVCT, le dialogue professionnel et la prévention de l'usure, mobilisables par un dirigeant de PME.",
      exploitation: "Preuve : boîte à outils QVCT déposée sur le LMS. Action : intégration d'un baromètre QVCT dans l'exercice CP3.",
    },
  ],
  technologique: [
    {
      lien: "https://www.francenum.gouv.fr/",
      titreLien: "France Num",
      titre: "Outils numériques de gestion pour les TPE-PME : CRM, facturation, pilotage",
      date: "Août 2026",
      commentaire: "Panorama des solutions de gestion commerciale et de facturation compatibles avec la facturation électronique, adaptées aux petites structures.",
      exploitation: "Preuve : comparatif archivé. Action : mise à jour de la liste des CRM proposés dans la CP5.",
    },
    {
      lien: "https://cyber.gouv.fr/",
      titreLien: "ANSSI",
      titre: "Cybersécurité des petites structures : mesures essentielles",
      date: "Juillet 2026",
      commentaire: "Recommandations pour sécuriser les accès, les sauvegardes et la messagerie, et réagir à un incident ; enjeu de responsabilité du dirigeant.",
      exploitation: "Preuve : guide remis aux apprentis. Action : ajout d'un point sécurité numérique dans le diagnostic CP1.",
    },
    {
      lien: "https://base-empreinte.ademe.fr/",
      titreLien: "ADEME — Base Empreinte",
      titre: "Facteurs d'émission pour le bilan carbone simplifié d'une PME",
      date: "Juin 2026",
      commentaire: "Mise à jour des facteurs d'émission utilisés pour estimer les scopes 1, 2 et 3 dans le rapport d'activité.",
      exploitation: "Preuve : tableur de calcul actualisé. Action : mise à jour de l'exercice RSE de la CP9.",
    },
    {
      lien: "https://www.youtube.com/results?search_query=looker+studio+tableau+de+bord+pme",
      titreLien: "Veille outils — data-visualisation",
      titre: "Tableaux de bord et data-visualisation accessibles aux PME",
      date: "Mai 2026",
      commentaire: "Diffusion d'outils gratuits de data-visualisation qui facilitent la présentation des indicateurs à la gouvernance.",
      exploitation: "Preuve : démonstration enregistrée en classe virtuelle. Action : atelier de construction d'un tableau de bord dans la CP9.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedRPMSAICaches(f: FormationInfo = FORMATION_RPMS): void {
  try {
    setCachedContentPack(f, RPMS_CONTENT_PACK);
    setCachedEvalPack(f, RPMS_EVAL_PACK);
    setCachedVeillePack(f, RPMS_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
