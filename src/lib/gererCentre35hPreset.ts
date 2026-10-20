/**
 * Preset complet « Gérer son centre de formation – 35 h »
 * — formation professionnelle continue NON certifiante (catégorie « autres formations professionnelles »
 * du BPF) : porteurs de projet de création d'un organisme de formation, formateurs indépendants,
 * dirigeants et responsables de petits organismes de formation ; particuliers qui financent eux-mêmes
 * leur formation (contrat de formation professionnelle, art. L.6353-3 à L.6353-7 du Code du travail),
 * présentiel, 5 jours de 7 h.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - Formation 35 h : J1 accueil, positionnement, système de formation professionnelle et C1 cadre
 *    juridique et administratif ; J2 C2 offre conforme et contractualisation ; J3 C3 démarche qualité
 *    et Qualiopi, cas intermédiaire ; J4 C4 financement et commercialisation, C5 gestion administrative
 *    et financière ; J5 C6 pilotage et amélioration continue, projet final et évaluation finale
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées (diagnostic de départ puis
 *    C1 à C6) et 6 QCM de 10 questions, un par compétence
 *  - Pack évaluation : QCM de positionnement début / fin, cas intermédiaire, évaluation finale
 *    interne (projet de structuration présenté et observé avec grille + QCM de fin)
 *  - Pack veille (réglementaire / métier / technologique)
 * Fil rouge : Atelier Sésame Formation, organisme de formation FICTIF (entreprise individuelle à Massy,
 * Essonne) créé par Inès MARCHAND (fictive) ; tous ses chiffres sont fictifs. Les montants
 * réglementaires qui changent souvent ne sont pas cités : ils se vérifient sur les sites officiels.
 * Les réponses propres à chaque stagiaire sont dans `gererCentre35hHumanized.ts`.
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
export const FORMATION_GSC35: FormationInfo = {
  intitule: "Gérer son centre de formation – 35 h",
  codeRNCP: "",
  objectifs:
    "Formation professionnelle non certifiante. Objectif général : créer, structurer et piloter un organisme de formation conforme à la réglementation, en maîtrisant son cadre juridique, son offre, sa démarche qualité, son financement, sa gestion administrative et financière et son amélioration continue.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- C1 — Maîtriser le cadre juridique et administratif d'un organisme de formation : définition de l'action de formation (art. L.6313-1 et L.6313-2 du Code du travail), choix du statut (entreprise individuelle, micro-entreprise, SASU ou EURL, association), déclaration d'activité et numéro de déclaration d'activité (art. L.6351-1 et suivants, dépôt sur Mon Activité Formation, délai, caducité), liste publique des organismes de formation, obligations légales (règlement intérieur, bilan pédagogique et financier annuel, comptabilité, conservation des pièces), exonération de TVA (art. 261-4-4° du CGI) et ses conditions, contrôles de l'État et de la Caisse des Dépôts, sanctions.\n- C2 — Concevoir et contractualiser une offre de formation conforme : analyse des besoins, objectifs opérationnels et évaluables, programme (prérequis, durée, modalités, délais d'accès, tarifs, accessibilité, contacts), modalités d'évaluation et de positionnement, convention avec une entreprise (art. L.6353-1 et D.6353-1) et contrat avec une personne physique (art. L.6353-3 à L.6353-7), conditions générales de vente, conditions d'annulation, attestation de fin de formation et certificat de réalisation.\n- C3 — Mettre en place la démarche qualité et préparer la certification Qualiopi : obligation prévue par l'article L.6316-1 pour accéder aux fonds publics et mutualisés, référentiel national qualité (7 critères ; 33 indicateurs à compter du 1er novembre 2026 en application du décret n° 2026-728 du 1er août 2026), guide de lecture, organismes certificateurs accrédités, audit initial, de surveillance et de renouvellement, non-conformités mineures et majeures, preuves attendues, situation du nouvel entrant.\n- C4 — Financer et commercialiser son offre : sources de financement (particulier, entreprise et plan de développement des compétences, OPCO, France Travail, Région, Agefiph ; le compte personnel de formation, réservé aux actions inscrites aux répertoires nationaux et aux organismes certifiés, présenté comme une perspective de développement), calcul du coût de revient et tarification, positionnement, prospection, site internet et mentions obligatoires, réseaux sociaux, devis, pratiques commerciales loyales et interdiction du démarchage pour le compte personnel de formation.\n- C5 — Assurer la gestion administrative et financière : parcours administratif d'un stagiaire (devis, contrat ou convention, convocation, émargement, attestation, facture), facturation et mentions obligatoires, exonération de TVA, trésorerie, tableau de bord, bilan pédagogique et financier (cadres, transmission annuelle, lecture), archivage et durées de conservation, protection des données personnelles (registre, information des personnes, durées), assurance responsabilité civile professionnelle, outils de gestion.\n- C6 — Piloter l'activité, l'équipe pédagogique et l'amélioration continue : recrutement et contractualisation des formateurs (salariés, indépendants, sous-traitance), compétences et développement des formateurs, référent handicap et accessibilité, veilles légale, métier, technologique et handicap, recueil des appréciations, traitement des réclamations et des aléas, indicateurs de résultats publiés, plan d'amélioration et analyse des risques, plan de développement de l'organisme.",
  prerequis:
    "Avoir un projet ou une activité de formation, même débutante (projet de création d'un organisme de formation, activité de formateur indépendant ou responsabilité dans un petit organisme). Maîtrise du français écrit ; usage courant d'un ordinateur, d'un traitement de texte, d'un tableur et d'une messagerie électronique. Un entretien préalable permet de vérifier l'adéquation du projet avec la formation.",
  duree: "35 heures (5 jours de 7 h)",
  modalites: "présentiel",
  tarif: "1 575 € par stagiaire",
  programme:
    "JOUR 1 — ACCUEIL ET POSITIONNEMENT · LE SYSTÈME DE FORMATION PROFESSIONNELLE · C1 : CADRE JURIDIQUE ET ADMINISTRATIF (7 h)\nMatin : accueil, présentation des objectifs, du déroulé des cinq jours, du règlement intérieur et des modalités d'évaluation, analyse des besoins, QCM et questions ouvertes de positionnement. Panorama du système de formation professionnelle : acteurs (France Compétences, OPCO, Caisse des Dépôts, DREETS, Régions, France Travail), loi « pour la liberté de choisir son avenir professionnel » du 5 septembre 2018, place des organismes de formation. Mise en situation : diagnostic de départ de son projet ou de son organisme.\nAprès-midi : C1 : définition de l'action de formation, choix du statut juridique, déclaration d'activité et numéro de déclaration d'activité sur Mon Activité Formation, liste publique des organismes de formation, obligations légales (règlement intérieur, bilan pédagogique et financier, comptabilité, conservation des pièces), exonération de TVA, contrôles et sanctions. Mises en situation : choisir son statut et préparer sa déclaration d'activité ; établir le registre de ses obligations légales.\n\nJOUR 2 — C2 : CONCEVOIR ET CONTRACTUALISER UNE OFFRE DE FORMATION CONFORME (7 h)\nMatin : analyse des besoins, objectifs opérationnels et évaluables, construction du programme (prérequis, durée, modalités, délais d'accès, tarifs, accessibilité, contacts), positionnement et modalités d'évaluation. Mise en situation : rédiger un programme conforme.\nAprès-midi : convention de formation avec une entreprise, contrat de formation professionnelle avec une personne physique (délai de rétractation de dix jours, aucun paiement avant son expiration, acompte limité à 30 % du prix), conditions générales de vente, conditions d'annulation et d'abandon, attestation de fin de formation et certificat de réalisation. Mise en situation : établir le contrat de formation d'un particulier et la convention d'une entreprise.\n\nJOUR 3 — C3 : DÉMARCHE QUALITÉ ET PRÉPARATION DE LA CERTIFICATION QUALIOPI (7 h)\nMatin : obligation de certification qualité pour l'accès aux fonds publics et mutualisés, référentiel national qualité : 7 critères et 33 indicateurs à compter du 1er novembre 2026 (décret n° 2026-728 du 1er août 2026), guide de lecture, preuves attendues, situation du nouvel entrant. Mise en situation : réaliser l'autodiagnostic Qualiopi d'un organisme et la liste des preuves.\nAprès-midi : organismes certificateurs accrédités, audit initial, audit de surveillance, audit de renouvellement, non-conformités mineures et majeures, plan d'actions correctives, organisation documentaire. Mise en situation : préparer un audit et traiter des non-conformités. Cas pratique intermédiaire.\n\nJOUR 4 — C4 : FINANCER ET COMMERCIALISER SON OFFRE · C5 : GESTION ADMINISTRATIVE ET FINANCIÈRE (7 h)\nMatin : C4 : sources de financement (particuliers, entreprises, OPCO, France Travail, Régions, Agefiph, perspective du compte personnel de formation), calcul du coût de revient, tarification, positionnement, prospection, site internet et mentions obligatoires, réseaux sociaux, devis, pratiques commerciales loyales. Mise en situation : calculer le coût de revient et le prix d'une action, et bâtir son plan commercial.\nAprès-midi : C5 : parcours administratif d'un stagiaire, facturation et mentions obligatoires, exonération de TVA, trésorerie et tableau de bord, bilan pédagogique et financier, archivage, protection des données personnelles, assurance, outils de gestion. Mise en situation : organiser le parcours administratif et préparer le bilan pédagogique et financier.\n\nJOUR 5 — C6 : PILOTER L'ACTIVITÉ ET L'AMÉLIORATION CONTINUE · PROJET FINAL ET ÉVALUATION FINALE (7 h)\nMatin : C6 : recrutement et contrats des formateurs, sous-traitance, développement des compétences, référent handicap et accessibilité, veilles, recueil des appréciations, réclamations et aléas, indicateurs de résultats, plan d'amélioration et analyse des risques, plan de développement. Mise en situation : bâtir le tableau de pilotage et le plan d'amélioration.\nAprès-midi : projet final et évaluation finale interne (présentation du dossier de structuration de son organisme, observée avec grille par compétence, et QCM de fin), bilan, plan d'action individuel et questionnaire de satisfaction à chaud.",
  methodesEvaluation:
    "Analyse des besoins et test de positionnement à l'entrée (10 questions ouvertes + QCM 10 questions), mises en situation tout au long de la formation (10 mises en situation corrigées : diagnostic de départ puis C1 à C6), un quiz de 10 questions par compétence, cas pratique intermédiaire à la fin du jour 3, test de positionnement de fin (10 questions ouvertes + QCM 10 questions). Évaluation finale interne le jour 5 : présentation du dossier de structuration de son organisme (cadre juridique, offre et contrat, démarche qualité, financement et tarif, gestion, pilotage), observée par la formatrice avec grille d'évaluation par compétence, et QCM de fin. Formation non certifiante : attestation de fin de formation mentionnant les objectifs, la nature, la durée et les résultats de l'évaluation des acquis. Questionnaires de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Formation en présentiel, en salle, dans les locaux de l'organisme : vidéoprojecteur, paperboard, connexion internet, un poste informatique connecté par stagiaire ou son ordinateur personnel ; démonstrations sur les sites officiels (Mon Activité Formation, liste publique des organismes de formation, Légifrance, travail-emploi.gouv.fr, service-public.fr) ; support de cours remis à chaque stagiaire, cahier d'exercices et corrigés, modèles (check-list de création, trame de programme, trame de contrat de formation avec un particulier, trame de convention, conditions générales de vente, autodiagnostic Qualiopi, calcul du coût de revient, tableau de bord, plan d'amélioration) ; travail sur le cas fil rouge Atelier Sésame Formation (organisme fictif) puis sur le projet de chaque stagiaire ; feuilles d'émargement signées par demi-journée. Groupe de 4 à 8 personnes. Suivi par mail après la formation pour la mise en œuvre du plan d'action.",
  publicVise:
    "Porteurs de projet de création d'un organisme de formation, formateurs indépendants qui veulent structurer leur activité, dirigeants et responsables de petits organismes de formation (entreprises individuelles, TPE), y compris en reconversion professionnelle. Formation suivie par des particuliers à leurs propres frais, au titre d'un contrat de formation professionnelle conclu avec une personne physique (art. L.6353-3 à L.6353-7 du Code du travail).",
  delaiAcces:
    "15 jours après signature du contrat de formation professionnelle (délai de rétractation de 10 jours inclus), sous réserve de places disponibles ; aucun paiement n'est exigé avant la fin du délai de rétractation.",
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
  "Comprendre le système de formation professionnelle, ses acteurs et la place d'un organisme de formation.",
  "Choisir le statut juridique adapté à son projet et réussir sa déclaration d'activité sur Mon Activité Formation.",
  "Connaître et respecter les obligations légales d'un organisme de formation : règlement intérieur, bilan pédagogique et financier, comptabilité, conservation des pièces.",
  "Rédiger un programme de formation conforme, avec des objectifs opérationnels et évaluables.",
  "Établir des contrats de formation avec des particuliers et des conventions avec des entreprises sans erreur juridique.",
  "Comprendre le référentiel national qualité et préparer un premier audit Qualiopi.",
  "Identifier les financements accessibles à son offre et calculer un prix de vente fondé sur le coût de revient.",
  "Communiquer et prospecter de façon loyale, avec un site internet conforme et sans pratique commerciale interdite.",
  "Organiser la gestion administrative et financière : facturation, trésorerie, archivage, protection des données personnelles.",
  "Piloter l'activité, travailler avec des formateurs indépendants et mettre en place l'amélioration continue.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins conduite avec chaque stagiaire (entretien préalable, présentation du projet, test de positionnement) fait apparaître un groupe de particuliers qui financent eux-mêmes leur formation et portent un projet d'organisme de formation à des stades différents : personnes en reconversion qui souhaitent créer leur organisme, formateurs indépendants déjà en activité qui veulent structurer leur offre, dirigeants de petits organismes qui préparent la certification Qualiopi ou veulent diversifier leurs financements. Les niveaux de départ vont d'une méconnaissance complète du cadre réglementaire à une pratique réelle mais peu formalisée. Trois besoins sont partagés par la quasi-totalité du groupe.</p>
<ul>
  <li><strong>Sécuriser le cadre (C1, C2)</strong> : les obligations d'un organisme de formation sont connues par fragments ; la déclaration d'activité, les mentions du programme, le contrat avec un particulier et le délai de rétractation sont souvent mal maîtrisés.</li>
  <li><strong>Préparer la qualité et le financement (C3, C4)</strong> : la certification Qualiopi est perçue comme une étape indispensable mais floue ; le prix de vente est rarement calculé à partir du coût de revient ; les sources de financement et leurs conditions sont confondues.</li>
  <li><strong>Organiser la gestion et le pilotage (C5, C6)</strong> : facturation, bilan pédagogique et financier, archivage, protection des données, relations avec les formateurs indépendants et amélioration continue sont gérés au cas par cas, sans outil ni indicateur.</li>
</ul>
<p>Les stagiaires souhaitent repartir avec un dossier de structuration de leur organisme directement utilisable : statut et démarches, programme et contrat types, autodiagnostic qualité, coût de revient et tarif, tableau de bord, plan d'amélioration et plan d'action à 30, 60 et 90 jours.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Projet de chaque stagiaire</strong> : les mises en situation sont réalisées sur le cas fil rouge Atelier Sésame Formation (organisme fictif) puis transposées au projet ou à l'organisme de chaque stagiaire ; elles alimentent le dossier de structuration présenté à l'évaluation finale du jour 5.</li>
  <li><strong>Porteurs de projet sans activité</strong> : fiches pas à pas pour la création, travail en binôme avec un stagiaire déjà déclaré, exemples commentés de documents types.</li>
  <li><strong>Organismes déjà déclarés</strong> : ateliers d'approfondissement sur l'autodiagnostic Qualiopi, la lecture du bilan pédagogique et financier et le tableau de pilotage.</li>
  <li><strong>Formateurs indépendants sous-traitants</strong> : focus sur le contrat de sous-traitance, les preuves attendues par les organismes donneurs d'ordre et la tarification de la journée de formation.</li>
  <li><strong>Outils</strong> : travail sur les sites officiels et sur un tableur ; aucun logiciel payant n'est exigé ; modèles fournis en format modifiable.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, salle accessible aux personnes à mobilité réduite, supports remis à l'avance et en version numérique, taille d'affichage et lecteur d'écran sur demande, temps majoré pour les exercices.</li>
</ul>`;

/** 10 mises en situation (diagnostic de départ puis C1 à C6), corrigés formateur. */
export const GSC35_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — Diagnostic de départ : mon projet ou mon organisme de formation",
    consigne:
      "Pour votre projet (ou, à défaut, celui d'Inès MARCHAND, créatrice de l'organisme fictif Atelier Sésame Formation, entreprise individuelle à Massy, formations bureautique et accueil) : 1. Présentez le projet ou l'activité : domaines de formation, public visé, modalités, nombre de stagiaires visé ou atteint, intervenants. 2. Indiquez où vous en êtes des démarches : statut, déclaration d'activité, documents existants (programme, contrat, règlement intérieur), démarche qualité. 3. Décrivez vos clients et vos financements actuels ou envisagés. 4. Repérez trois risques juridiques, administratifs ou financiers de votre situation. 5. Concluez par 3 forces, 3 points de vigilance et 3 priorités pour les cinq jours de formation.",
    reponseAttendue:
      "Projet décrit de façon concrète : domaines, public, modalités, volume d'activité visé ou réel, intervenants (seul, avec des formateurs indépendants, en sous-traitance).\nÉtat des démarches exact et honnête : statut choisi ou à choisir, déclaration d'activité faite ou non, documents existants et manquants, démarche qualité engagée ou non.\nClients et financements distingués : particuliers à leurs propres frais, entreprises, financements publics ou mutualisés envisagés et conditions associées (certification qualité notamment).\nRisques repérés et reliés à une cause : absence de contrat conforme avec un particulier, absence de déclaration d'activité, prix inférieur au coût de revient, documents non conservés, absence de règlement intérieur.\nForces, points de vigilance et priorités tirés des constats et reliés aux compétences C1 à C6.\nBarème : projet 4, démarches 5, clients et financements 3, risques 4, conclusion 4.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 : choisir son statut et préparer sa déclaration d'activité",
    consigne:
      "Inès MARCHAND hésite entre rester en entreprise individuelle au régime de la micro-entreprise, créer une SASU ou une EURL, ou s'associer à une association existante. 1. Comparez ces options pour un organisme de formation (responsabilité, régime social et fiscal dans les grandes lignes, formalités, image auprès des clients, capacité à accueillir des associés). 2. Vérifiez que l'activité d'Atelier Sésame Formation relève bien de l'action de formation au sens des articles L.6313-1 et L.6313-2 du Code du travail. 3. Décrivez la déclaration d'activité : moment du dépôt, plateforme, pièces à fournir, délai de réponse de l'administration, numéro de déclaration d'activité et mention obligatoire qui l'accompagne. 4. Expliquez les cas de caducité de la déclaration. 5. Indiquez ce qu'apporte la liste publique des organismes de formation.",
    reponseAttendue:
      "Comparaison argumentée : l'entreprise individuelle et la micro-entreprise sont simples à créer et à gérer, avec des plafonds de chiffre d'affaires et un patrimoine professionnel séparé du patrimoine personnel depuis 2022 ; la SASU ou l'EURL donnent une personne morale distincte, permettent d'accueillir des associés et rassurent certains clients, avec une gestion plus lourde ; l'association convient à un projet non lucratif et collectif ; le choix se vérifie avec un expert-comptable et sur les sites officiels, sans chiffre approximatif.\nAction de formation : parcours pédagogique permettant d'atteindre un objectif professionnel, avec des objectifs, un programme, des moyens et une évaluation des acquis (art. L.6313-1 et L.6313-2) ; des ateliers de développement personnel sans objectif professionnel n'en relèvent pas.\nDéclaration d'activité : déposée en ligne sur Mon Activité Formation dans les trois mois qui suivent la conclusion de la première convention ou du premier contrat de formation, avec la copie de cette première convention ou de ce premier contrat, le programme, une pièce d'identité du dirigeant, l'extrait de casier judiciaire (bulletin n° 3), les justificatifs d'immatriculation et les titres et qualités des intervenants ; depuis le décret n° 2025-728, le préfet de région dispose de deux mois pour enregistrer ou refuser ; le numéro attribué figure sur les documents avec la mention « cet enregistrement ne vaut pas agrément de l'État ».\nCaducité : lorsque le bilan pédagogique et financier ne fait apparaître aucune activité de formation au titre d'un exercice ou lorsqu'il n'a pas été transmis.\nListe publique : elle permet aux clients et aux financeurs de vérifier qu'un organisme est déclaré et, le cas échéant, certifié.\nBarème : statuts 5, action de formation 3, déclaration 6, caducité 3, liste publique 3.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C1 : établir le registre des obligations légales et des contrôles",
    consigne:
      "Atelier Sésame Formation vient d'obtenir son numéro de déclaration d'activité. 1. Rédigez le registre des obligations légales de l'organisme sous forme de tableau (obligation, texte, échéance ou fréquence, preuve conservée) : règlement intérieur, bilan pédagogique et financier, comptabilité, documents remis aux stagiaires, attestation de fin de formation, conservation des pièces, information sur les modifications de la déclaration. 2. Rédigez les rubriques du règlement intérieur applicable aux stagiaires (art. L.6352-3 et suivants). 3. Expliquez les conditions de l'exonération de TVA prévue par l'article 261-4-4° du CGI et ses conséquences sur la facture. 4. Présentez les contrôles possibles (services régionaux de contrôle de la DREETS, Caisse des Dépôts pour les actions financées par le compte personnel de formation) et leurs suites. 5. Listez les sanctions encourues en cas de manquement.",
    reponseAttendue:
      "Registre complet sous forme de tableau, avec pour chaque obligation la source, la fréquence et la preuve conservée : règlement intérieur remis à chaque stagiaire avant l'entrée en formation ; bilan pédagogique et financier transmis chaque année sur Mon Activité Formation avant le 30 avril (art. R.6352-23 du Code du travail ; échéance reportée au 31 mai lors des dernières campagnes) ; comptabilité tenue selon le statut et retraçant distinctement l'activité de formation ; programme, contrat ou convention, convocation, émargements, attestation de fin de formation et factures archivés ; déclaration des modifications de l'organisme à l'administration.\nRèglement intérieur : mesures d'hygiène et de sécurité, règles de discipline et nature des sanctions, garanties de procédure disciplinaire, modalités de représentation des stagiaires pour les actions d'une durée supérieure au seuil fixé par les textes.\nTVA : exonération des prestations de formation professionnelle continue réalisées par un organisme déclaré qui a obtenu l'attestation délivrée par l'administration ; la facture porte la mention de l'exonération et de l'article ; une option pour la TVA reste possible ; toute évolution législative est vérifiée chaque année.\nContrôles : contrôle administratif et financier des services de l'État sur pièces et sur place, avec procédure contradictoire ; contrôle de la Caisse des Dépôts pour les actions financées par le compte personnel de formation ; possibilité de demander le remboursement des sommes indûment perçues.\nSanctions : remboursement au cocontractant des sommes non justifiées, versement au Trésor public, annulation de la déclaration d'activité, amendes administratives (art. L.6356-1 et suivants, qui remplacent les sanctions pénales depuis la loi n° 2026-534 du 27 juin 2026), déréférencement ou suspension par les financeurs.\nBarème : registre 6, règlement intérieur 4, TVA 4, contrôles 3, sanctions 3.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C2 : rédiger un programme de formation conforme",
    consigne:
      "Inès MARCHAND veut proposer une formation « Accueil physique et téléphonique en entreprise – 21 h ». Son brouillon de programme tient en trois lignes : « Apprendre à bien accueillir. Formation en salle. Prix sur demande. » 1. Analysez ce qui manque à ce brouillon au regard du référentiel national qualité et des attentes des financeurs. 2. Rédigez trois objectifs opérationnels et évaluables (verbe d'action, contexte, critère de réussite). 3. Rédigez le programme complet : public, prérequis, durée, modalités et lieu, contenu par séquence, méthodes, modalités de positionnement et d'évaluation, délai d'accès, tarif, accessibilité aux personnes en situation de handicap, contact. 4. Indiquez comment l'analyse des besoins de chaque stagiaire adaptera ce programme. 5. Précisez quels indicateurs de résultats l'organisme publiera.",
    reponseAttendue:
      "Manques repérés : objectifs non évaluables, public et prérequis absents, durée et modalités imprécises, tarif absent, délai d'accès, modalités d'évaluation, accessibilité et contact manquants ; ces informations sont attendues par le référentiel (critère 1) et par tout financeur.\nObjectifs opérationnels et évaluables, par exemple : « accueillir un visiteur selon la procédure de l'entreprise en moins de deux minutes », « traiter un appel entrant en reformulant la demande et en orientant vers le bon interlocuteur », « gérer une situation de mécontentement en appliquant la méthode vue en formation ».\nProgramme complet et cohérent : public, prérequis, durée en heures et en jours, modalités et lieu, séquences avec contenu et méthodes, positionnement à l'entrée, évaluation des acquis, délai d'accès réaliste et tenant compte du délai de rétractation pour un particulier, tarif net ou hors taxe clairement indiqué, référent handicap et modalités d'adaptation, contact identifié.\nAdaptation : l'analyse des besoins et le positionnement ajustent les exemples, le rythme, les exercices et, si nécessaire, la durée, avec une trace écrite.\nIndicateurs : taux de satisfaction, taux d'atteinte des objectifs ou de réussite aux évaluations, taux d'abandon, nombre de stagiaires formés, avec la date et la période de calcul.\nBarème : analyse 3, objectifs 5, programme 7, adaptation 2, indicateurs 3.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C2 : établir le contrat d'un particulier et la convention d'une entreprise",
    consigne:
      "Leïla BENSAÏD, en reconversion, s'inscrit à titre personnel à la formation « Accueil physique et téléphonique » d'Atelier Sésame Formation (prix fictif : 840 €) ; la Société Vergers de l'Yvette (entreprise fictive) inscrit deux salariés à la même formation. 1. Indiquez quel document chaque client signe et pourquoi. 2. Rédigez le contrat de formation professionnelle de Leïla en reprenant les mentions des articles L.6353-3 et L.6353-4 du Code du travail. 3. Expliquez le délai de rétractation, les règles de paiement (montant maximal de l'acompte, échéancier du solde) et les conséquences d'un abandon ou d'une force majeure. 4. Rédigez les clauses essentielles de la convention avec l'entreprise et des conditions générales de vente (annulation, report, absence). 5. Distinguez l'attestation de fin de formation et le certificat de réalisation.",
    reponseAttendue:
      "Documents : contrat de formation professionnelle pour la personne physique qui finance elle-même sa formation (art. L.6353-3) ; convention de formation pour l'entreprise qui achète la formation pour ses salariés (art. L.6353-1 et D.6353-1).\nContrat complet : nature, durée, objet et effectif de l'action ; niveau de connaissances préalables requis ; conditions dans lesquelles la formation est donnée ; diplômes, titres ou références des intervenants ; modalités de paiement et conditions financières prévues en cas de cessation anticipée ou d'abandon ; programme et règlement intérieur remis.\nDélai et paiement : le stagiaire dispose de dix jours à compter de la signature pour se rétracter par lettre recommandée avec avis de réception ; aucune somme ne peut être exigée avant l'expiration de ce délai ; à son expiration, l'acompte ne peut dépasser 30 % du prix convenu, soit 252 € au plus pour Leïla, le solde étant échelonné au fur et à mesure du déroulement de la formation ; en cas d'empêchement par force majeure dûment reconnue, seules les prestations effectivement dispensées sont dues au prorata.\nConvention et CGV : intitulé, objectif, programme, dates, durée, lieu, effectif, prix, modalités de règlement, conditions d'annulation et de report, sanction des absences, mention du numéro de déclaration d'activité ; conditions d'annulation loyales et lisibles, sans clause qui priverait le particulier de ses droits.\nDocuments de fin : l'attestation de fin de formation, remise au stagiaire, mentionne les objectifs, la nature, la durée et les résultats de l'évaluation des acquis ; le certificat de réalisation atteste de l'exécution de l'action auprès du financeur.\nBarème : documents 3, contrat 6, délai et paiement 5, convention et CGV 4, documents de fin 2.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C3 : réaliser l'autodiagnostic Qualiopi et la liste des preuves",
    consigne:
      "Inès MARCHAND veut accéder aux financements des OPCO et de France Travail ; elle prépare la certification Qualiopi d'Atelier Sésame Formation. 1. Expliquez pourquoi la certification est nécessaire (art. L.6316-1 du Code du travail) et dans quels cas elle ne l'est pas. 2. Présentez les 7 critères du référentiel national qualité et les principales évolutions applicables à compter du 1er novembre 2026 (décret n° 2026-728 du 1er août 2026). 3. Réalisez l'autodiagnostic de l'organisme sur dix indicateurs de votre choix (attendu, preuve existante, écart, action). 4. Indiquez les indicateurs qui ne s'appliquent pas à l'organisme et pourquoi. 5. Expliquez la situation particulière du nouvel entrant.",
    reponseAttendue:
      "Obligation : la certification qualité est exigée des prestataires qui veulent bénéficier des fonds publics ou mutualisés (OPCO, État, Régions, France Travail, Caisse des Dépôts, Agefiph) ; un organisme qui ne travaille qu'avec des particuliers à leurs propres frais ou des entreprises sur leurs fonds propres n'y est pas tenu, mais peut s'y engager pour se développer.\nCritères : 1 information du public ; 2 identification des objectifs et adaptation des prestations ; 3 adaptation aux publics, accompagnement, suivi et évaluation ; 4 adéquation des moyens pédagogiques, techniques et d'encadrement ; 5 qualification et développement des compétences des personnels ; 6 inscription dans l'environnement professionnel ; 7 recueil et prise en compte des appréciations et des réclamations. Évolutions : 33 indicateurs au lieu de 32 à compter du 1er novembre 2026, indicateur 32 complété par une analyse des risques sur la qualité des formations, indicateur 27 étendu au portage salarial, nouvel indicateur 33 propre aux CFA ; le guide de lecture applicable est vérifié sur le site du ministère.\nAutodiagnostic précis : pour chaque indicateur retenu, l'attendu, la preuve existante (programme, analyse des besoins, émargements, questionnaires, CV des formateurs, veille), l'écart constaté et l'action datée.\nNon applicables : par exemple les indicateurs propres aux formations certifiantes, à l'apprentissage ou à la sous-traitance quand l'organisme n'est pas concerné, avec la justification attendue par l'auditeur.\nNouvel entrant : organisme qui n'a pas encore réalisé de formation ou ne dispose pas d'un historique suffisant ; certains indicateurs portant sur les résultats ou la mise en œuvre sont vérifiés lors de l'audit de surveillance.\nBarème : obligation 3, critères et évolutions 5, autodiagnostic 7, non applicables 2, nouvel entrant 3.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C3 : préparer l'audit et traiter les non-conformités",
    consigne:
      "L'audit initial d'Atelier Sésame Formation est programmé. 1. Expliquez comment choisir un organisme certificateur et ce que signifie son accréditation. 2. Décrivez le cycle de certification : audit initial, audit de surveillance, audit de renouvellement, durée de validité du certificat. 3. Organisez le classement des preuves (arborescence par critère et par indicateur, dossier par action et par stagiaire). 4. L'auditeur relève deux écarts : aucune trace de recueil des appréciations des financeurs et des CV de formateurs non datés et non signés. Qualifiez chaque écart (non-conformité mineure ou majeure), indiquez les délais et rédigez le plan d'actions correctives. 5. Préparez cinq questions que l'auditeur posera probablement et vos réponses.",
    reponseAttendue:
      "Choix du certificateur : organisme accrédité par le COFRAC ou par un organisme signataire de l'accord européen de reconnaissance multilatérale ; comparaison des devis, des délais, de la durée d'audit et de la proximité ; vérification sur la liste officielle.\nCycle : audit initial ; audit de surveillance entre le 14e et le 22e mois ; audit de renouvellement avant l'échéance du certificat, valable trois ans ; les modalités d'audit (sur site ou à distance, durée) sont fixées par l'organisme certificateur selon les règles applicables.\nClassement : arborescence par critère et par indicateur, renvoi vers les preuves de chaque action, dossier par session et par stagiaire, version et date de chaque document, accès rapide le jour de l'audit.\nÉcarts : l'absence de recueil des appréciations des financeurs est une non-conformité mineure si une partie des appréciations est recueillie, majeure si l'exigence n'est pas du tout prise en compte ; les CV non datés relèvent en général d'une non-conformité mineure ; une non-conformité mineure doit être corrigée et vérifiée lors de l'audit suivant, une non-conformité majeure doit être levée dans le délai fixé par l'organisme certificateur, faute de quoi la certification n'est pas délivrée ou est suspendue ; plan d'actions correctives avec cause, action, responsable, échéance et preuve.\nQuestions préparées et réponses étayées par des preuves : comment analysez-vous les besoins, comment adaptez-vous la formation, comment évaluez-vous les acquis, comment faites-vous votre veille, comment traitez-vous une réclamation.\nBarème : certificateur 3, cycle 4, classement 4, écarts 6, questions 3.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C4 : calculer le coût de revient, fixer le prix et bâtir le plan commercial",
    consigne:
      "Données fictives d'Atelier Sésame Formation pour une session de 21 h avec 6 stagiaires : location de salle 420 €, rémunération d'un formateur indépendant 1 260 €, supports et fournitures 90 €, quote-part des frais fixes (assurance, logiciel, comptabilité, site internet, certification) 540 €. 1. Calculez le coût de revient de la session et par stagiaire. 2. Proposez un prix de vente par stagiaire qui dégage une marge, et calculez le seuil de rentabilité en nombre de stagiaires. 3. Identifiez les financements possibles pour chaque type de client (particulier, entreprise, demandeur d'emploi, personne en situation de handicap) et leurs conditions. 4. Rédigez les mentions obligatoires du site internet et de la page de présentation de la formation. 5. Bâtissez un plan commercial sur trois mois (cibles, canaux, actions, indicateurs) en respectant les règles de pratique commerciale loyale.",
    reponseAttendue:
      "Coût de revient : 420 + 1 260 + 90 + 540 = 2 310 € pour la session, soit 385 € par stagiaire pour 6 stagiaires.\nPrix et seuil : par exemple 480 € par stagiaire, soit 2 880 € de chiffre d'affaires et 570 € de marge pour 6 stagiaires ; seuil de rentabilité = 2 310 / 480 ≈ 4,8, donc 5 stagiaires ; le prix tient compte du marché, du positionnement et de l'exonération de TVA ; aucune vente à perte.\nFinancements : particulier à ses propres frais avec contrat et échéancier ; entreprise sur son plan de développement des compétences, avec prise en charge possible par l'OPCO selon ses critères si l'organisme est certifié ; demandeur d'emploi avec une aide de France Travail ou de la Région, sous condition de certification qualité ; personne en situation de handicap avec des aides de l'Agefiph selon ses critères ; le compte personnel de formation est réservé aux actions inscrites aux répertoires nationaux et proposées par un organisme certifié, ce qui en fait une perspective et non une possibilité immédiate.\nMentions : identité de l'organisme, numéro SIRET, numéro de déclaration d'activité avec la mention qu'il ne vaut pas agrément de l'État, mentions légales du site, conditions générales de vente, programme complet, tarif, délai d'accès, accessibilité, contact, indicateurs de résultats.\nPlan commercial : cibles et canaux cohérents (réseau, partenaires, réseaux sociaux, salons, site), actions datées, devis types, indicateurs (demandes, devis, inscriptions, taux de transformation) ; aucune promesse de financement non vérifiée, aucun démarchage pour le compte personnel de formation, interdit par la loi du 19 décembre 2022, aucun faux avis.\nBarème : coût de revient 4, prix et seuil 4, financements 5, mentions 3, plan commercial 4.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C5 : organiser le parcours administratif et préparer le bilan pédagogique et financier",
    consigne:
      "1. Décrivez, étape par étape, le parcours administratif de Leïla BENSAÏD chez Atelier Sésame Formation, du premier contact à l'archivage (documents, responsable, délai, preuve). 2. Rédigez la facture de Leïla avec ses mentions obligatoires, en tenant compte de l'exonération de TVA et de l'échéancier. 3. Construisez le tableau de bord mensuel de l'organisme (activité, chiffre d'affaires, encaissements, trésorerie, satisfaction). 4. À partir des données fictives de l'année (13 stagiaires particuliers à leurs propres frais, 4 salariés d'entreprises, 455 heures-stagiaires, 1 formateur indépendant), indiquez dans quels cadres du bilan pédagogique et financier ces informations figurent et quand le transmettre. 5. Rédigez les règles d'archivage et de protection des données personnelles de l'organisme.",
    reponseAttendue:
      "Parcours complet : demande et entretien préalable, analyse des besoins et positionnement, envoi du programme et du devis, contrat signé, délai de rétractation respecté, convocation avec les informations pratiques et le règlement intérieur, émargement par demi-journée, évaluations, attestation de fin de formation, questionnaire de satisfaction, facturation selon l'échéancier, archivage du dossier.\nFacture : identité et numéro SIRET de l'organisme, numéro de déclaration d'activité, identité du client, date et numéro unique, intitulé, dates et durée de la formation, prix, mention de l'exonération de TVA au titre de l'article 261-4-4° du CGI, échéances et conditions de paiement, pénalités applicables selon la nature du client.\nTableau de bord : sessions et heures réalisées, stagiaires, chiffre d'affaires facturé et encaissé, charges, trésorerie prévisionnelle, satisfaction, réclamations, avec un suivi mensuel.\nBPF : les produits issus des particuliers et des entreprises figurent dans les ressources par origine de financement ; les stagiaires et les heures-stagiaires dans les données pédagogiques ; le formateur indépendant dans les personnes extérieures et les charges ; la formation figure dans les autres formations professionnelles ; transmission annuelle en ligne sur Mon Activité Formation avant le 30 avril (art. R.6352-23 ; échéance reportée au 31 mai lors des dernières campagnes), sous peine de caducité de la déclaration.\nArchivage et données : dossiers conservés pendant les durées prévues par les textes (comptabilité, contrats, preuves de réalisation), registre des traitements, information des stagiaires sur l'usage de leurs données, collecte limitée au nécessaire, accès restreint, sécurité des fichiers, suppression à l'issue des durées définies.\nBarème : parcours 5, facture 4, tableau de bord 3, BPF 4, archivage et données 4.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C6 : piloter l'équipe pédagogique et le plan d'amélioration continue",
    consigne:
      "Atelier Sésame Formation travaille avec Paul RENAUD, formateur indépendant, et un second intervenant occasionnel ; une stagiaire a adressé une réclamation sur un changement de salle annoncé la veille. 1. Comparez les formes de collaboration avec un formateur (salarié, indépendant en contrat de prestation, sous-traitance) et rédigez les clauses essentielles du contrat avec Paul RENAUD. 2. Décrivez comment l'organisme vérifie et développe les compétences de ses formateurs. 3. Traitez la réclamation : accusé de réception, analyse, réponse, action corrective, trace. 4. Construisez le tableau de pilotage de l'organisme (indicateurs, cibles, fréquence) et le plan d'amélioration, en y intégrant une analyse des risques sur la qualité des formations. 5. Rédigez le plan de développement de l'organisme à un an, y compris le rôle du référent handicap et l'organisation des veilles.",
    reponseAttendue:
      "Collaboration : le salariat crée un lien de subordination et des obligations d'employeur ; l'indépendant intervient en toute autonomie dans le cadre d'un contrat de prestation, sans lien de subordination ; la sous-traitance confie tout ou partie d'une action à un autre organisme, qui reste soumis aux exigences de qualité du donneur d'ordre. Clauses : objet et dates, programme, livrables et preuves attendues (émargements, évaluations), rémunération et facturation, numéro de déclaration d'activité du prestataire s'il en dispose, respect du règlement intérieur, confidentialité et protection des données, assurance, résiliation.\nCompétences : vérification des diplômes, de l'expérience et des références, CV daté et signé, observation en séance, plan de développement des compétences, participation à la veille.\nRéclamation : accusé de réception rapide, analyse des causes (salle réservée tardivement), réponse écrite et circonstanciée, action corrective (procédure de réservation et d'information des stagiaires), enregistrement dans le registre des réclamations et suivi de l'efficacité.\nPilotage : indicateurs (satisfaction, taux d'abandon, atteinte des objectifs, réclamations, délais de réponse, chiffre d'affaires, trésorerie), cibles et fréquence ; plan d'amélioration alimenté par les appréciations, les réclamations, les aléas et les résultats ; analyse des risques sur la qualité des formations (absence d'un formateur, salle indisponible, panne technique, stagiaire en difficulté) avec probabilité, gravité et mesure de prévention.\nPlan de développement : objectifs à un an (offre, certification qualité, financements, partenariats), référent handicap identifié et formé, réseau de partenaires du handicap, organisation des veilles légale, métier, technologique et handicap avec sources, fréquence et traces.\nBarème : collaboration 4, compétences 3, réclamation 4, pilotage et risques 5, plan de développement 4.",
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
  ["La déclaration d'activité d'un organisme de formation se dépose :", ["Auprès du tribunal de commerce", "En ligne sur Mon Activité Formation", "Auprès de l'OPCO", "Auprès de la mairie"], 1],
  ["Elle doit être déposée dans les trois mois qui suivent :", ["La conclusion de la première convention ou du premier contrat de formation", "La création du site internet", "L'obtention de la certification qualité", "Le premier encaissement"], 0],
  ["Le numéro de déclaration d'activité s'accompagne de la mention :", ["« Agréé par l'État »", "« Certifié par l'État »", "« Cet enregistrement ne vaut pas agrément de l'État »", "« Formation garantie »"], 2],
  ["La déclaration d'activité devient caduque notamment lorsque :", ["Le site internet est fermé", "L'organisme change de logo", "Le dirigeant prend des congés", "Le bilan pédagogique et financier n'a pas été transmis"], 3],
  ["L'action de formation est définie comme :", ["Un parcours pédagogique permettant d'atteindre un objectif professionnel", "Toute réunion d'information", "Un atelier de loisirs", "Une conférence publique"], 0],
  ["Le règlement intérieur applicable aux stagiaires fixe notamment :", ["Les tarifs de l'organisme", "Les règles d'hygiène et de sécurité et les règles de discipline", "Le salaire des formateurs", "Le programme des formations"], 1],
  ["L'exonération de TVA prévue par l'article 261-4-4° du CGI concerne :", ["Toutes les entreprises", "Les seules associations", "Les prestations de formation professionnelle continue d'un organisme qui remplit les conditions", "Les ventes de matériel informatique"], 2],
  ["Les services régionaux de contrôle de la DREETS peuvent :", ["Délivrer la certification qualité", "Fixer les prix des formations", "Recruter les formateurs", "Contrôler l'activité et les dépenses de formation des organismes"], 3],
  ["La liste publique des organismes de formation permet de :", ["Vérifier qu'un organisme est déclaré", "Obtenir un financement automatique", "Connaître le chiffre d'affaires des concurrents", "S'inscrire au compte personnel de formation"], 0],
  ["Le statut de micro-entrepreneur pour un organisme de formation :", ["Est interdit", "Est possible, sous réserve des plafonds de chiffre d'affaires du régime", "Impose la création d'une association", "Dispense de déclaration d'activité"], 1],
];

const QCM_C2: Q[] = [
  ["Un objectif opérationnel et évaluable comporte :", ["Un verbe d'action, un contexte et un critère de réussite", "Uniquement un thème", "Le prix de la formation", "Le nom du formateur"], 0],
  ["Une personne physique qui finance elle-même sa formation signe :", ["Une convention tripartite", "Un contrat de formation professionnelle", "Un bon de commande seulement", "Un contrat de travail"], 1],
  ["Le délai de rétractation du stagiaire qui a signé un contrat de formation est de :", ["7 jours", "14 jours", "10 jours", "30 jours"], 2],
  ["Avant l'expiration du délai de rétractation, l'organisme peut exiger :", ["La totalité du prix", "Un acompte de 50 %", "Un chèque de caution", "Aucune somme"], 3],
  ["À l'expiration du délai de rétractation, l'acompte ne peut dépasser :", ["30 % du prix convenu", "50 % du prix convenu", "10 % du prix convenu", "100 % du prix convenu"], 0],
  ["Une entreprise qui inscrit ses salariés signe en principe :", ["Un contrat de formation professionnelle", "Une convention de formation", "Un contrat d'apprentissage", "Un bail"], 1],
  ["Le programme d'une formation doit notamment indiquer :", ["Le chiffre d'affaires de l'organisme", "La liste des anciens stagiaires", "Les prérequis, la durée, les modalités, les délais d'accès et le tarif", "Le salaire du formateur"], 2],
  ["L'attestation de fin de formation mentionne :", ["Le montant de la facture", "L'adresse personnelle du formateur", "Le numéro de sécurité sociale du stagiaire", "Les objectifs, la nature, la durée et les résultats de l'évaluation des acquis"], 3],
  ["Le positionnement à l'entrée sert à :", ["Adapter la formation au niveau et aux besoins du stagiaire", "Fixer le prix", "Remplacer l'évaluation finale", "Choisir la salle"], 0],
  ["En cas de force majeure dûment reconnue empêchant le stagiaire de suivre la formation :", ["Il doit payer la totalité du prix", "Seules les prestations effectivement dispensées sont dues au prorata", "Il perd son acompte dans tous les cas", "L'organisme peut doubler le prix"], 1],
];

const QCM_C3: Q[] = [
  ["La certification qualité est exigée par l'article L.6316-1 du Code du travail pour :", ["Toute formation, quel que soit le client", "Les formations de moins de 7 heures", "Accéder aux fonds publics ou mutualisés", "Ouvrir un compte bancaire"], 2],
  ["Le référentiel national qualité comporte :", ["5 critères", "10 critères", "12 critères", "7 critères"], 3],
  ["À compter du 1er novembre 2026, le référentiel compte :", ["33 indicateurs", "32 indicateurs", "30 indicateurs", "40 indicateurs"], 0],
  ["Le décret qui fait évoluer le référentiel à compter du 1er novembre 2026 est le :", ["Décret n° 2019-564", "Décret n° 2026-728 du 1er août 2026", "Décret n° 2022-1587", "Décret n° 2018-771"], 1],
  ["Le nouvel indicateur 33 du référentiel concerne :", ["Les organismes de bilan de compétences", "Les formations à distance", "Les CFA", "Les organismes certificateurs"], 2],
  ["L'audit de surveillance a lieu :", ["Chaque mois", "Tous les cinq ans", "Uniquement en cas de plainte", "Entre le 14e et le 22e mois suivant la certification"], 3],
  ["Le certificat Qualiopi est valable :", ["3 ans", "1 an", "10 ans", "Sans limite"], 0],
  ["Une non-conformité majeure :", ["Est sans conséquence", "Doit être levée dans le délai fixé, faute de quoi la certification n'est pas délivrée ou est suspendue", "Se corrige seulement au renouvellement", "Concerne uniquement le logo"], 1],
  ["Un organisme certificateur doit être :", ["Une entreprise de conseil", "Un OPCO", "Accrédité par le COFRAC ou un organisme équivalent", "Le service des impôts"], 2],
  ["Le critère 7 du référentiel porte sur :", ["Le prix des formations", "Le recrutement des stagiaires", "La sécurité des locaux", "Le recueil et la prise en compte des appréciations et des réclamations"], 3],
];

const QCM_C4: Q[] = [
  ["Le coût de revient d'une session comprend :", ["Les coûts directs et une quote-part des frais fixes", "Uniquement le salaire du formateur", "Uniquement la location de salle", "Le prix de vente"], 0],
  ["Le seuil de rentabilité d'une session est :", ["Le prix le plus élevé du marché", "Le nombre de stagiaires à partir duquel les recettes couvrent les coûts", "Le nombre maximal de places", "Le montant de la TVA"], 1],
  ["Le compte personnel de formation finance :", ["Toute formation, sans condition", "Uniquement les formations de loisirs", "Les actions inscrites aux répertoires nationaux et proposées par un organisme certifié", "Les frais de création d'entreprise"], 2],
  ["Le démarchage pour le compte personnel de formation est :", ["Encouragé", "Libre par téléphone", "Autorisé le week-end", "Interdit par la loi du 19 décembre 2022"], 3],
  ["Une entreprise finance en général la formation de ses salariés au titre :", ["Du plan de développement des compétences", "De l'assurance chômage", "Du compte épargne temps", "De la taxe foncière"], 0],
  ["La prise en charge d'une formation par un OPCO suppose notamment que l'organisme :", ["Soit une association", "Soit certifié Qualiopi", "Ait plus de dix salariés", "Soit situé en Île-de-France"], 1],
  ["Une personne en situation de handicap peut, selon ses critères, obtenir l'aide de :", ["La Caisse des Dépôts uniquement", "L'URSSAF", "L'Agefiph", "La Banque de France"], 2],
  ["Le site internet d'un organisme de formation doit présenter pour chaque formation :", ["Les avis de concurrents", "Le salaire des formateurs", "La liste des stagiaires", "Le programme, le tarif, le délai d'accès, l'accessibilité et le contact"], 3],
  ["Publier de faux avis de stagiaires constitue :", ["Une pratique commerciale trompeuse", "Une bonne pratique", "Une obligation", "Une option marketing autorisée"], 0],
  ["Un devis de formation précise au minimum :", ["Le nom des autres clients", "L'intitulé, la durée, les dates, le prix et les conditions", "Le chiffre d'affaires de l'organisme", "La marge réalisée"], 1],
];

const QCM_C5: Q[] = [
  ["La feuille d'émargement sert à :", ["Fixer le prix", "Remplacer le contrat", "Prouver la présence des stagiaires", "Évaluer les acquis"], 2],
  ["Le bilan pédagogique et financier est transmis :", ["Tous les trois ans", "Uniquement en cas de contrôle", "À l'OPCO", "Chaque année, en ligne"], 3],
  ["Une facture d'un organisme exonéré de TVA doit mentionner :", ["L'exonération et l'article du CGI qui la fonde", "Un taux de TVA de 20 %", "Le salaire du formateur", "La note du stagiaire"], 0],
  ["Le bilan pédagogique et financier décrit notamment :", ["Le patrimoine du dirigeant", "Les ressources par origine de financement, les stagiaires et les heures de formation", "La liste des concurrents", "Les tarifs de l'année suivante"], 1],
  ["Le registre des traitements de données personnelles :", ["Est facultatif dans tous les cas", "Est tenu par la CNIL", "Recense les traitements de données de l'organisme", "Remplace le règlement intérieur"], 2],
  ["Le principe de minimisation des données impose de :", ["Collecter le plus de données possible", "Conserver les données sans limite", "Partager les données avec les partenaires", "Ne collecter que les données nécessaires"], 3],
  ["Un tableau de trésorerie prévisionnelle permet de :", ["Anticiper les encaissements et les décaissements", "Calculer la note des stagiaires", "Remplacer la comptabilité", "Fixer les objectifs pédagogiques"], 0],
  ["L'assurance responsabilité civile professionnelle couvre :", ["Les congés du dirigeant", "Les dommages causés à des tiers dans le cadre de l'activité", "La baisse du chiffre d'affaires", "Les impôts"], 1],
  ["La convocation d'un stagiaire précise :", ["Le chiffre d'affaires de l'organisme", "Le salaire du formateur", "Les dates, horaires, lieu et informations pratiques", "Les notes des autres stagiaires"], 2],
  ["Les documents d'une action de formation sont archivés pour :", ["Décorer les locaux", "Être revendus", "Être détruits immédiatement", "Pouvoir justifier la réalisation en cas de contrôle"], 3],
];

const QCM_C6: Q[] = [
  ["Un formateur indépendant intervient :", ["Sans lien de subordination, dans le cadre d'un contrat de prestation", "Comme un salarié", "Sans contrat", "Uniquement le week-end"], 0],
  ["En cas de sous-traitance, l'organisme donneur d'ordre :", ["N'a plus aucune obligation", "S'assure que le sous-traitant respecte les exigences de qualité", "Transfère sa certification", "Ne paie pas le sous-traitant"], 1],
  ["Le référent handicap a pour rôle :", ["De fixer les tarifs", "De recruter les stagiaires", "D'accueillir, informer et accompagner les personnes en situation de handicap", "De contrôler la comptabilité"], 2],
  ["Une réclamation doit être :", ["Ignorée si elle est orale", "Transmise au concurrent", "Supprimée après lecture", "Enregistrée, analysée, traitée et suivie"], 3],
  ["Le plan d'amélioration continue est alimenté par :", ["Les appréciations, les réclamations, les aléas et les résultats", "Les publicités des concurrents", "Uniquement l'avis du dirigeant", "Les tarifs des fournisseurs"], 0],
  ["L'analyse des risques sur la qualité des formations, ajoutée à l'indicateur 32 :", ["Concerne uniquement les CFA", "Identifie les risques, leur gravité et les mesures de prévention", "Remplace le plan d'amélioration", "Est facultative pour tous"], 1],
  ["Les veilles attendues d'un organisme de formation portent sur :", ["Uniquement les prix", "Uniquement la météo", "Les évolutions légales, métier, technologiques et l'accessibilité", "Les réseaux sociaux des stagiaires"], 2],
  ["Un indicateur de résultats publié doit être :", ["Arrondi à la hausse", "Invérifiable", "Secret", "Daté et calculé sur une période précisée"], 3],
  ["Le taux d'abandon se calcule en rapportant :", ["Le nombre de stagiaires ayant abandonné au nombre de stagiaires entrés", "Le nombre de formateurs au nombre de salles", "Le chiffre d'affaires au nombre d'heures", "Le nombre de réclamations au nombre de jours"], 0],
  ["Pour vérifier les compétences d'un formateur, l'organisme conserve :", ["Sa photo de vacances", "Son CV daté et signé, ses diplômes et références", "Son relevé bancaire", "Son numéro de sécurité sociale"], 1],
];

export const GSC35_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Maîtriser le cadre juridique et administratif d'un organisme de formation", QCM_C1),
  qcmExercice("QCM C2 — Concevoir et contractualiser une offre de formation conforme", QCM_C2),
  qcmExercice("QCM C3 — Mettre en place la démarche qualité et préparer la certification Qualiopi", QCM_C3),
  qcmExercice("QCM C4 — Financer et commercialiser son offre", QCM_C4),
  qcmExercice("QCM C5 — Assurer la gestion administrative et financière", QCM_C5),
  qcmExercice("QCM C6 — Piloter l'activité, l'équipe pédagogique et l'amélioration continue", QCM_C6),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (diagnostic puis C1 à C6), alignées sur les
 * 10 questions de positionnement et sur les copies de `gererCentre35hHumanized.ts` ; les 6 QCM ensuite.
 */
export const GSC35_EXERCICES_COMPLETS: AIContentExercise[] = [...GSC35_EXERCICES, ...GSC35_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Gérer son centre de formation »</strong> : organisation de la formation et panorama du système de formation professionnelle, compétences C1 à C6, projet final et évaluation finale ; quiz et cas pratiques corrigés pour chaque chapitre ; fil rouge Atelier Sésame Formation (organisme fictif).</li>
  <li><strong>Cahier d'exercices</strong> : test de positionnement, 10 mises en situation professionnelles (diagnostic de départ puis C1 à C6) ; <strong>corrigés formateur</strong> remis après correction.</li>
  <li><strong>6 QCM de 10 questions</strong>, un par compétence (C1 à C6), corrigés en séance.</li>
  <li><strong>Grille d'évaluation du projet final</strong> et grille d'autoévaluation, critères par compétence.</li>
  <li><strong>Modèles</strong> : check-list de création d'un organisme de formation, registre des obligations légales, trame de programme, trame de contrat de formation avec un particulier, trame de convention avec une entreprise, conditions générales de vente, règlement intérieur, autodiagnostic Qualiopi, calcul du coût de revient, tableau de bord, registre des réclamations, plan d'amélioration, plan d'action individuel à 30, 60 et 90 jours.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Salle de formation</strong> : vidéoprojecteur, paperboard, connexion internet, un poste informatique connecté par stagiaire ou ordinateur personnel.</li>
  <li><strong>Sites officiels consultés en séance</strong> : Mon Activité Formation, liste publique des organismes de formation, Légifrance, travail-emploi.gouv.fr, entreprendre.service-public.fr, CNIL.</li>
  <li><strong>Tableur</strong> pour le coût de revient, le seuil de rentabilité, le tableau de bord et la trésorerie prévisionnelle.</li>
  <li><strong>Traitement de texte</strong> pour les programmes, contrats, conventions et procédures, à partir des modèles fournis.</li>
  <li><strong>Jeux de données fictifs</strong> : activité annuelle d'Atelier Sésame Formation, budget d'une session, réclamation, extrait de bilan pédagogique et financier, rapport d'audit simulé.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>Mon Activité Formation</strong> : <a href="https://www.monactiviteformation.emploi.gouv.fr/">https://www.monactiviteformation.emploi.gouv.fr/</a> — déclaration d'activité, modifications, bilan pédagogique et financier.</li>
  <li><strong>Liste publique des organismes de formation</strong> : <a href="https://www.data.gouv.fr/fr/datasets/liste-publique-des-organismes-de-formation-l-6351-7-1-du-code-du-travail/">https://www.data.gouv.fr/fr/datasets/liste-publique-des-organismes-de-formation-l-6351-7-1-du-code-du-travail/</a> — organismes déclarés et certifiés.</li>
  <li><strong>Ministère du Travail — Qualiopi</strong> : <a href="https://travail-emploi.gouv.fr/qualiopi-marque-de-certification-qualite-des-prestataires-de-formation">https://travail-emploi.gouv.fr/qualiopi-marque-de-certification-qualite-des-prestataires-de-formation</a> — référentiel national qualité, guide de lecture, organismes certificateurs.</li>
  <li><strong>Légifrance — Code du travail, sixième partie</strong> : <a href="https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050/">https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050/</a> — textes applicables aux organismes de formation.</li>
  <li><strong>Entreprendre.Service-Public.fr</strong> : <a href="https://entreprendre.service-public.fr/">https://entreprendre.service-public.fr/</a> — statuts, création d'entreprise, facturation, obligations comptables.</li>
  <li><strong>CNIL</strong> : <a href="https://www.cnil.fr/fr">https://www.cnil.fr/fr</a> — protection des données personnelles, registre des traitements, durées de conservation.</li>
</ul>`;

const GSC35_VIDEOS = [
  { title: "Créer son organisme de formation", description: "Les grandes étapes : statut, déclaration d'activité, premières obligations.", url: "https://www.youtube.com/results?search_query=cr%C3%A9er+son+organisme+de+formation+d%C3%A9claration+d%27activit%C3%A9" },
  { title: "La déclaration d'activité sur Mon Activité Formation", description: "Dépôt en ligne, pièces à fournir et suivi de la demande.", url: "https://www.youtube.com/results?search_query=Mon+Activit%C3%A9+Formation+d%C3%A9claration+d%27activit%C3%A9+tutoriel" },
  { title: "Rédiger des objectifs pédagogiques opérationnels", description: "Verbe d'action, contexte et critère de réussite.", url: "https://www.youtube.com/results?search_query=r%C3%A9diger+objectifs+p%C3%A9dagogiques+op%C3%A9rationnels+formation" },
  { title: "Le contrat de formation professionnelle avec un particulier", description: "Mentions, délai de rétractation et règles de paiement.", url: "https://www.youtube.com/results?search_query=contrat+de+formation+professionnelle+particulier+d%C3%A9lai+de+r%C3%A9tractation" },
  { title: "Le référentiel national qualité Qualiopi", description: "Critères, indicateurs et preuves attendues.", url: "https://travail-emploi.gouv.fr/qualiopi-marque-de-certification-qualite-des-prestataires-de-formation" },
  { title: "Préparer son audit Qualiopi", description: "Organisation des preuves et déroulement de l'audit.", url: "https://www.youtube.com/results?search_query=pr%C3%A9parer+audit+Qualiopi+organisme+de+formation" },
  { title: "Calculer le coût de revient d'une formation", description: "Coûts directs, frais fixes et seuil de rentabilité.", url: "https://www.youtube.com/results?search_query=calculer+co%C3%BBt+de+revient+formation+seuil+de+rentabilit%C3%A9" },
  { title: "Le bilan pédagogique et financier", description: "Cadres du formulaire et transmission annuelle.", url: "https://www.youtube.com/results?search_query=bilan+p%C3%A9dagogique+et+financier+organisme+de+formation+remplir" },
  { title: "Protection des données personnelles : les bases", description: "Registre, information des personnes et durées de conservation.", url: "https://www.cnil.fr/fr" },
  { title: "Créer son entreprise : choisir son statut", description: "Entreprise individuelle, micro-entreprise, société.", url: "https://entreprendre.service-public.fr/" },
];

export const GSC35_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: GSC35_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: GSC35_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement début / fin
// ---------------------------------------------------------------------------
export const GSC35_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Pour exercer comme organisme de formation, il faut notamment :", options: ["Déposer une déclaration d'activité", "Obtenir un diplôme d'État de formateur", "Être une association", "Avoir au moins trois salariés"], correctIndex: 0 },
  { question: "Le numéro de déclaration d'activité vaut-il agrément de l'État ?", options: ["Oui, toujours", "Non, il ne vaut pas agrément de l'État", "Oui, après un an", "Oui, pour les associations"], correctIndex: 1 },
  { question: "Qualiopi est :", options: ["Un logiciel de gestion", "Un financement", "La marque de la certification qualité des prestataires de formation", "Un diplôme de formateur"], correctIndex: 2 },
  { question: "Un particulier qui paie lui-même sa formation signe :", options: ["Une convention tripartite", "Un contrat de travail", "Un bail", "Un contrat de formation professionnelle"], correctIndex: 3 },
  { question: "Un programme de formation doit présenter :", options: ["Des objectifs, une durée, des modalités et un tarif", "Uniquement un titre", "Le salaire du formateur", "La liste des stagiaires"], correctIndex: 0 },
  { question: "Le bilan pédagogique et financier est :", options: ["Un document publicitaire", "Un document transmis chaque année à l'administration", "Un contrat de travail", "Une facture"], correctIndex: 1 },
  { question: "La feuille d'émargement sert à :", options: ["Calculer la TVA", "Fixer le prix", "Prouver la présence des stagiaires", "Remplacer le programme"], correctIndex: 2 },
  { question: "Le prix d'une formation devrait être fixé :", options: ["Au hasard", "Uniquement selon la concurrence", "Au plus bas possible", "À partir du coût de revient et du marché"], correctIndex: 3 },
  { question: "Les données personnelles des stagiaires doivent être :", options: ["Protégées et conservées pour une durée définie", "Publiées sur le site", "Vendues à des partenaires", "Conservées sans limite"], correctIndex: 0 },
  { question: "Une réclamation d'un stagiaire doit être :", options: ["Ignorée", "Enregistrée et traitée", "Supprimée", "Transmise à un concurrent"], correctIndex: 1 },
];

export const GSC35_QCM_FIN: AIQCMQuestion[] = [
  { question: "La déclaration d'activité doit être déposée dans les trois mois qui suivent :", options: ["La conclusion de la première convention ou du premier contrat de formation", "La certification qualité", "L'ouverture du compte bancaire", "Le premier bilan pédagogique et financier"], correctIndex: 0 },
  { question: "Le délai de rétractation d'un stagiaire qui a signé un contrat de formation professionnelle est de :", options: ["7 jours", "10 jours", "14 jours", "1 mois"], correctIndex: 1 },
  { question: "À l'expiration du délai de rétractation, l'acompte demandé au particulier ne peut dépasser :", options: ["50 % du prix", "100 % du prix", "30 % du prix", "10 % du prix"], correctIndex: 2 },
  { question: "À compter du 1er novembre 2026, le référentiel national qualité compte :", options: ["7 critères et 32 indicateurs", "6 critères et 30 indicateurs", "8 critères et 33 indicateurs", "7 critères et 33 indicateurs"], correctIndex: 3 },
  { question: "La certification qualité est obligatoire pour :", options: ["Accéder aux fonds publics ou mutualisés", "Toute formation payée par un particulier", "Déclarer son activité", "Ouvrir un site internet"], correctIndex: 0 },
  { question: "L'audit de surveillance a lieu :", options: ["Tous les ans", "Entre le 14e et le 22e mois", "Après cinq ans", "Jamais"], correctIndex: 1 },
  { question: "Le démarchage pour le compte personnel de formation est :", options: ["Autorisé par téléphone", "Autorisé par SMS", "Interdit depuis la loi du 19 décembre 2022", "Obligatoire"], correctIndex: 2 },
  { question: "Une facture d'un organisme exonéré de TVA mentionne :", options: ["Un taux de 20 %", "Le salaire du formateur", "La note du stagiaire", "L'exonération et l'article 261-4-4° du CGI"], correctIndex: 3 },
  { question: "La déclaration d'activité devient caduque notamment si :", options: ["Le bilan pédagogique et financier n'est pas transmis", "L'organisme change d'adresse mail", "Le dirigeant est absent", "Le site internet est modifié"], correctIndex: 0 },
  { question: "L'analyse des risques sur la qualité des formations complète :", options: ["L'indicateur 1", "L'indicateur 32", "Le règlement intérieur", "La facture"], correctIndex: 1 },
];

export const GSC35_EVAL_PACK: AIEvalPack = {
  qcmDebut: GSC35_QCM_DEBUT,
  qcmFin: GSC35_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du jour 3) — l'inscription de Leïla BENSAÏD et le premier audit",
    contexte:
      "Cas fictif. Leïla BENSAÏD, en reconversion, souhaite s'inscrire à titre personnel à une formation d'Atelier Sésame Formation qui commence dans huit jours ; elle propose de payer la totalité du prix le jour de la signature. Dans le même temps, Inès MARCHAND prépare son audit initial Qualiopi et constate que son programme ne mentionne ni le délai d'accès ni l'accessibilité.",
    questions: [
      { question: "Quel document Leïla doit-elle signer et quelles mentions doit-il comporter ?", reponseAttendue: "Un contrat de formation professionnelle (art. L.6353-3) : nature, durée, objet et effectif de l'action, niveau de connaissances préalables, conditions de déroulement, références des intervenants, modalités de paiement et conditions financières en cas d'abandon ; programme et règlement intérieur remis.", points: 5 },
      { question: "L'organisme peut-il accepter le paiement intégral le jour de la signature et maintenir la date de début ?", reponseAttendue: "Non : aucune somme ne peut être exigée avant l'expiration du délai de rétractation de dix jours ; ensuite l'acompte est limité à 30 % du prix et le solde est échelonné ; une entrée dans huit jours ne respecte pas ce délai, il faut proposer une session ultérieure ou attendre la fin du délai.", points: 5 },
      { question: "Quelles informations manquent au programme au regard du référentiel national qualité et comment les rédiger ?", reponseAttendue: "Délai d'accès réaliste, intégrant le délai de rétractation pour un particulier ; accessibilité aux personnes en situation de handicap avec le contact du référent handicap et les modalités d'adaptation ; vérification des autres mentions : prérequis, durée, modalités, tarif, évaluation, contact.", points: 5 },
      { question: "Comment l'auditeur qualifierait-il l'absence de ces mentions et que faire avant l'audit ?", reponseAttendue: "Une non-conformité sur l'information du public (critère 1), mineure ou majeure selon son étendue ; avant l'audit, corriger le programme et le site, dater et versionner le document, conserver la preuve de la correction et l'inscrire au plan d'amélioration.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — présentation du dossier de structuration de son organisme, observée avec grille, et QCM de fin (jour 5)",
    exercices: [
      {
        titre: "Partie 1 — Cadre juridique et administratif (C1)",
        consigne: "Présentez le statut retenu pour votre organisme, l'état de la déclaration d'activité et le registre de vos obligations légales.",
        reponseAttendue: "Statut justifié, déclaration d'activité décrite avec exactitude (plateforme, délai, pièces, mention), obligations légales complètes avec preuves et échéances, exonération de TVA et contrôles expliqués. Critères de la grille : exactitude réglementaire, complétude, réalisme.",
        points: 20,
      },
      {
        titre: "Partie 2 — Offre et contractualisation (C2)",
        consigne: "Présentez le programme d'une de vos formations et le contrat ou la convention correspondant.",
        reponseAttendue: "Objectifs opérationnels et évaluables, programme complet, contrat avec un particulier conforme (mentions, délai de rétractation, acompte limité à 30 %), convention et conditions générales de vente cohérentes. Critères de la grille : conformité, clarté, cohérence.",
        points: 20,
      },
      {
        titre: "Partie 3 — Démarche qualité (C3)",
        consigne: "Présentez votre autodiagnostic au regard du référentiel national qualité et votre calendrier de certification.",
        reponseAttendue: "Critères et indicateurs correctement cités (33 indicateurs à compter du 1er novembre 2026), preuves identifiées, écarts et actions datés, cycle d'audit exact, situation de nouvel entrant le cas échéant. Critères de la grille : maîtrise du référentiel, pertinence des preuves, plan d'actions.",
        points: 20,
      },
      {
        titre: "Partie 4 — Financement et commercialisation (C4)",
        consigne: "Présentez le coût de revient et le prix d'une de vos formations, les financements visés et votre plan commercial.",
        reponseAttendue: "Calcul juste du coût de revient et du seuil de rentabilité, prix argumenté, financements présentés avec leurs conditions réelles, mentions obligatoires du site, plan commercial loyal et chiffré. Critères de la grille : justesse des calculs, réalisme, conformité des pratiques.",
        points: 20,
      },
      {
        titre: "Partie 5 — Gestion administrative et financière (C5)",
        consigne: "Présentez le parcours administratif d'un stagiaire, votre modèle de facture, votre tableau de bord et vos règles d'archivage et de protection des données.",
        reponseAttendue: "Parcours complet et tracé, facture conforme avec mention de l'exonération, tableau de bord utile, bilan pédagogique et financier compris, archivage et protection des données organisés. Critères de la grille : complétude, conformité, opérationnalité.",
        points: 20,
      },
      {
        titre: "Partie 6 — Pilotage et amélioration continue (C6), puis QCM de fin",
        consigne: "Présentez l'organisation de votre équipe pédagogique, votre tableau de pilotage, votre plan d'amélioration avec l'analyse des risques et votre plan d'action individuel ; répondez ensuite au QCM de fin.",
        reponseAttendue: "Formes de collaboration maîtrisées, contrats et preuves attendues, traitement des réclamations, indicateurs pertinents, analyse des risques sur la qualité des formations, veilles organisées, référent handicap identifié, plan d'action daté avec indicateurs. Critères de la grille : cohérence, réalisme, capacité d'amélioration.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const GSC35_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — décret n° 2026-728 du 1er août 2026",
      titre: "Référentiel national qualité : 33 indicateurs à compter du 1er novembre 2026",
      date: "Août 2026",
      commentaire: "Le décret n° 2026-728 du 1er août 2026 fait évoluer le référentiel national qualité à compter du 1er novembre 2026 : 33 indicateurs au lieu de 32, indicateur 32 complété par une analyse des risques sur la qualité des formations, indicateur 27 étendu au portage salarial, nouvel indicateur 33 propre aux CFA. Le guide de lecture applicable est vérifié sur le site du ministère du Travail.",
      exploitation: "Preuve : fiche mémo datée archivée au dossier qualité. Action : mise à jour du chapitre C3, de l'exercice 6, du QCM C3 et de la partie 3 de l'évaluation finale.",
    },
    {
      lien: "https://travail-emploi.gouv.fr/qualiopi-marque-de-certification-qualite-des-prestataires-de-formation",
      titreLien: "Ministère du Travail — Qualiopi",
      titre: "Guide de lecture du référentiel national qualité et liste des organismes certificateurs",
      date: "Septembre 2026",
      commentaire: "Suivi de la page officielle du ministère : guide de lecture en vigueur, foire aux questions, organismes certificateurs accrédités et modalités d'audit. Toute nouvelle version du guide est intégrée dès sa publication.",
      exploitation: "Preuve : note de veille datée. Action : actualisation de l'autodiagnostic Qualiopi et de la liste des preuves de l'exercice 6.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050/",
      titreLien: "Légifrance — Code du travail",
      titre: "Contrat de formation professionnelle avec une personne physique : articles L.6353-3 à L.6353-7",
      date: "Juillet 2026",
      commentaire: "Relecture des articles applicables au contrat conclu avec un particulier qui finance lui-même sa formation : mentions obligatoires, délai de rétractation de dix jours, aucun paiement avant son expiration, acompte limité à 30 % du prix, règles en cas d'abandon ou de force majeure.",
      exploitation: "Preuve : extrait archivé. Action : vérification de la trame de contrat de la boîte à outils et de l'exercice 5.",
    },
    {
      lien: "https://www.monactiviteformation.emploi.gouv.fr/",
      titreLien: "Mon Activité Formation",
      titre: "Campagne annuelle du bilan pédagogique et financier et déclarations d'activité",
      date: "Mai 2026",
      commentaire: "Suivi des informations publiées sur la plateforme : calendrier de la campagne de transmission du bilan pédagogique et financier, notice du formulaire, démarches de déclaration et de modification de l'activité.",
      exploitation: "Preuve : capture datée de la page d'information. Action : mise à jour du chapitre C5 et de l'exercice 9.",
    },
    {
      lien: "https://www.economie.gouv.fr/dgccrf",
      titreLien: "DGCCRF",
      titre: "Pratiques commerciales dans la formation et interdiction du démarchage pour le compte personnel de formation",
      date: "Juin 2026",
      commentaire: "Rappels de l'administration sur les pratiques commerciales trompeuses, les faux avis et l'interdiction du démarchage pour le compte personnel de formation issue de la loi du 19 décembre 2022.",
      exploitation: "Preuve : note de veille. Action : mise à jour des règles de prospection de l'exercice 8 et du chapitre C4.",
    },
  ],
  metier: [
    {
      lien: "https://www.centre-inffo.fr/",
      titreLien: "Centre Inffo",
      titre: "Actualité du droit de la formation et pratiques des organismes",
      date: "Septembre 2026",
      commentaire: "Suivi des analyses et des décryptages publiés sur le droit de la formation professionnelle et sur les pratiques des organismes de formation ; toute information est recoupée avec le texte officiel.",
      exploitation: "Preuve : extrait daté. Action : actualisation des exemples du chapitre 1 et du panorama des acteurs.",
    },
    {
      lien: "https://www.francecompetences.fr/",
      titreLien: "France Compétences",
      titre: "Rapports sur l'usage des fonds de la formation professionnelle",
      date: "Juillet 2026",
      commentaire: "Lecture des publications de l'autorité nationale de financement et de régulation sur les dépenses de formation et les priorités des financeurs, utiles pour situer l'offre d'un petit organisme.",
      exploitation: "Preuve : note de veille. Action : mise à jour de la carte des financements du chapitre C4.",
    },
    {
      lien: "https://www.francetravail.fr/",
      titreLien: "France Travail",
      titre: "Aides à la formation des demandeurs d'emploi et conditions pour les organismes",
      date: "Juin 2026",
      commentaire: "Suivi des conditions de prise en charge des formations des demandeurs d'emploi et des exigences applicables aux organismes, dont la certification qualité.",
      exploitation: "Preuve : extrait archivé. Action : actualisation de l'exercice 8 et du tableau des financements.",
    },
    {
      lien: "https://www.agefiph.fr/",
      titreLien: "Agefiph",
      titre: "Accessibilité des formations et aides aux personnes en situation de handicap",
      date: "Mai 2026",
      commentaire: "Ressources sur l'accueil des personnes en situation de handicap en formation, le rôle du référent handicap et les aides mobilisables selon les critères de l'Agefiph.",
      exploitation: "Preuve : synthèse archivée. Action : mise à jour de la partie accessibilité du chapitre C6 et de l'exercice 10.",
    },
  ],
  technologique: [
    {
      lien: "https://www.cnil.fr/fr",
      titreLien: "CNIL",
      titre: "Protection des données personnelles des stagiaires et outils de gestion en ligne",
      date: "Septembre 2026",
      commentaire: "Recommandations de la CNIL sur le registre des traitements, l'information des personnes, les durées de conservation et le choix des sous-traitants, applicables aux logiciels de gestion et aux plateformes d'émargement.",
      exploitation: "Preuve : journal de veille. Action : mise à jour des règles d'archivage et de protection des données de l'exercice 9.",
    },
    {
      lien: "https://entreprendre.service-public.fr/",
      titreLien: "Entreprendre.Service-Public.fr",
      titre: "Généralisation de la facturation électronique entre entreprises",
      date: "Août 2026",
      commentaire: "Suivi du calendrier officiel de la facturation électronique entre entreprises assujetties et de ses conséquences pour les petits organismes de formation, à vérifier selon la situation de chacun.",
      exploitation: "Preuve : note de veille. Action : actualisation du modèle de facture et du chapitre C5.",
    },
    {
      lien: "https://cyber.gouv.fr/",
      titreLien: "ANSSI — cyber.gouv.fr",
      titre: "Bonnes pratiques de sécurité numérique pour les TPE",
      date: "Juillet 2026",
      commentaire: "Recommandations de l'agence nationale sur les mots de passe, les sauvegardes et la sécurité des messageries, adaptées à un petit organisme qui conserve des dossiers de stagiaires.",
      exploitation: "Preuve : extrait archivé. Action : mise à jour de la check-list de sécurité de la boîte à outils.",
    },
    {
      lien: "https://www.francenum.gouv.fr/",
      titreLien: "France Num",
      titre: "Outils numériques de gestion pour les TPE : signature électronique, émargement, tableaux de bord",
      date: "Juin 2026",
      commentaire: "Guides publics sur les outils numériques utiles à une TPE ; les outils sont présentés sans prix, leurs offres changeant souvent.",
      exploitation: "Preuve : synthèse archivée. Action : actualisation de la liste des outils de gestion du chapitre C5.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedGSC35AICaches(f: FormationInfo = FORMATION_GSC35): void {
  try {
    setCachedContentPack(f, GSC35_CONTENT_PACK);
    setCachedEvalPack(f, GSC35_EVAL_PACK);
    setCachedVeillePack(f, GSC35_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
