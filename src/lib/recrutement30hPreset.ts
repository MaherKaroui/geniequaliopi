/**
 * Preset complet « Recruter et intégrer ses collaborateurs (CP-FFP) » — formation CERTIFIANTE préparant à la
 * certification inscrite au Répertoire spécifique sous le code RS6168 (certificateur : INEA CONSEIL,
 * SIRET 50282228100015 ; enregistrement du 23/11/2022, échéance au 23/11/2025 : fiche inactive depuis,
 * remplacée par la fiche RS7332 « Recruter et intégrer ses collaborateurs » — à suivre en veille).
 * NSF 315 Ressources humaines ; Formacodes 33060 Recrutement, 33003 Conduite entretien recrutement,
 * 33072 Intégration salarié, 32142 Management participatif. Pas de validation partielle.
 * Évaluation certificative (fiche) : E1 étude de cas pratique sur un recrutement à effectuer ; E2 mise en
 * situation orale lors d'une simulation de recrutement ; E3 étude de cas pratique sur l'intégration d'un
 * collaborateur. Jury de 3 membres : un représentant d'INEA CONSEIL et deux experts extérieurs exerçant une
 * fonction de recrutement (DRH, chef d'entreprise) et/ou certifiés. Aucun barème publié : renvoi au certificateur.
 * Organisme : ORIENTA CONSULT ; formatrice Rahma GARY ; 30 h = 6 modules de 5 h (un module par compétence,
 * C1 à C6), 100 % à distance en classes virtuelles (Google Meet / Zoom) ; 3 000 € net de taxe ; CPF.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - fil rouge FICTIF : Sophie, gérante d'« Atelier Lumen », PME fictive de 18 salariés (fabrication et pose de
 *    luminaires sur mesure) à Saint-Quentin-en-Yvelines, qui recrute un(e) chargé(e) de clientèle puis
 *    l'intègre ; une candidate bénéficiaire de la RQTH dans le module 6
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 QCM d'entraînement de 10 questions (à la place des exercices
 *    pratiques : deux par module pour les modules 1 à 4, un pour les modules 5 et 6) puis un QCM de
 *    10 questions par compétence (C1 à C6)
 *  - Pack évaluation : QCM de positionnement de début et de fin (10 questions), cas pratique intermédiaire
 *    (fin du module 3), évaluation finale interne calquée sur les épreuves E1, E2 et E3
 *  - Pack veille (réglementaire / métier / technologique)
 * Le support de cours (6 chapitres) est dans `recrutement30h/` ; les réponses propres à chaque stagiaire dans
 * `recrutement30hHumanized.ts`. Aucune donnée de satisfaction ni aucun taux de réussite n'est pré-rempli.
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
export const FORMATION_REC30: FormationInfo = {
  intitule: "Recruter et intégrer ses collaborateurs (CP-FFP)",
  codeRNCP: "RS6168",
  objectifs:
    "Formation certifiante préparant à la certification « Recruter et intégrer ses collaborateurs (CP-FFP) », enregistrée au Répertoire spécifique sous le code RS6168 (certificateur : INEA CONSEIL). Objectif général : conduire un recrutement de bout en bout, de l'analyse du besoin à l'intégration du nouveau collaborateur, dans le respect des règles de non-discrimination et d'inclusion, et se préparer aux trois épreuves de la certification.\nÀ l'issue de la formation, le stagiaire sera capable de :\n- C1 — Définir les critères de recrutement en fonction des besoins de l'entreprise, des missions et du poste de travail et élaborer une grille de décision structurée afin de cibler les compétences des candidats.\n- C2 — Diffuser une offre de recrutement engageante sur les canaux de recrutement variés pour attirer les profils adaptés en s'aidant des outils digitaux.\n- C3 — Mener un entretien de recrutement chaleureux et structuré pour faire émerger les potentiels du candidat, afin de sélectionner un candidat adapté au poste, dans le respect des règles de non-discrimination et d'inclusion.\n- C4 — Présenter les atouts de l'entreprise et du poste de manière convaincante afin d'encourager le candidat à rejoindre l'entreprise.\n- C5 — Intégrer le collaborateur au sein de l'équipe en créant des moments dédiés pour le motiver et créer une ambiance favorable au travail.\n- C6 — Accueillir et accompagner les collaborateurs en situation de handicap en mettant en place les aménagements et conditions de travail nécessaires pour favoriser l'intégration et la performance.",
  prerequis:
    "Être manager ou opérationnel amené à recruter et intégrer des collaborateurs dans le cadre de ses fonctions. Disposer d'un ordinateur avec caméra, micro et connexion Internet pour suivre les classes virtuelles. Un entretien préalable vérifie la situation professionnelle du candidat et ses besoins.",
  duree: "30 heures (6 modules de 5 h)",
  dureeSaisiePrioritaire: true,
  modalites: "distanciel",
  tarif: "3 000 € net de taxe par stagiaire",
  programme:
    "Formation 100 % à distance en classes virtuelles (Google Meet / Zoom), 6 modules de 5 h, un module par compétence. Fil rouge : Sophie, gérante d'« Atelier Lumen », PME de 18 salariés qui fabrique et pose des luminaires sur mesure à Saint-Quentin-en-Yvelines (personnage et entreprise fictifs), recrute un(e) chargé(e) de clientèle puis intègre la personne retenue.\nModule 1 — Définir les critères de recrutement et la grille de décision (C1, 5 h) : accueil, présentation de la certification et de ses trois épreuves, QCM de positionnement ; analyse du besoin, du poste et des missions ; rédaction de la fiche de poste ; compétences recherchées (savoirs, savoir-faire, savoir-être) ; critères indispensables et souhaitables ; élaboration d'une grille de décision structurée et pondérée, identique pour tous les candidats.\nModule 2 — Diffuser une offre de recrutement engageante (C2, 5 h) : rédaction d'une offre claire, attractive et non discriminante (offre en français, sans limite d'âge, critères en lien direct avec le poste) ; choix des canaux : job boards, réseaux sociaux professionnels, France Travail, cooptation, écoles et réseaux locaux ; outils digitaux de diffusion et de suivi des candidatures ; mesure des retombées.\nModule 3 — Mener un entretien de recrutement structuré et inclusif (C3, 5 h) : tri des candidatures à partir de la grille ; préparation de l'entretien (guide, questions, répartition des rôles, accueil du candidat, entretien à distance) ; conduite d'un entretien chaleureux et structuré ; questions comportementales et méthode STAR ; règles de non-discrimination (articles L1132-1, L1221-6 et L1221-8 du Code du travail) et d'inclusion ; prise de notes factuelle ; cas pratique intermédiaire (C1 à C3).\nModule 4 — Présenter les atouts de l'entreprise et du poste (C4, 5 h) : atouts de l'entreprise et du poste, marque employeur et proposition de valeur ; argumentation adaptée aux motivations du candidat ; traitement des objections (salaire, horaires, trajet, évolution) ; décision collégiale à partir de la grille ; proposition d'embauche et retour courtois et rapide aux candidats non retenus ; conservation des données des candidats (CNIL).\nModule 5 — Intégrer le collaborateur au sein de l'équipe (C5, 5 h) : parcours d'intégration : pré-boarding, premier jour, premières semaines, fin de la période d'essai ; formalités d'embauche (DPAE, contrat, visite d'information et de prévention) ; rôle du manager et du tuteur ; moments dédiés (accueil d'équipe, déjeuner, points réguliers) ; rapport d'étonnement ; bilan de fin de période d'essai.\nModule 6 — Accueillir et accompagner un collaborateur en situation de handicap (C6, 5 h) : accueil d'une candidate bénéficiaire de la RQTH dans le fil rouge ; aménagement raisonnable du poste et des conditions de travail (article L5213-6) ; acteurs : Agefiph, Cap emploi, médecin du travail, référent handicap ; obligation d'emploi des travailleurs handicapés ; sensibilisation de l'équipe et suivi ; préparation des épreuves E1, E2 et E3 ; évaluation finale ; bilan de la formation.",
  methodesEvaluation:
    "Positionnement en ouverture : QCM de positionnement de 10 questions (une seule bonne réponse chacune, corrigé et expliqué), comparé au QCM de fin pour mesurer la progression, et 10 questions ouvertes ; 10 QCM d'entraînement de 10 questions corrigés au fil des modules (deux par module pour les modules 1 à 4, un pour les modules 5 et 6) et un QCM de 10 questions par compétence (C1 à C6), sur le fil rouge de Sophie et d'« Atelier Lumen » (personnage et entreprise fictifs) ; cas pratique intermédiaire en fin de module 3 ; évaluation finale interne en module 6, calquée sur les trois épreuves ; test de positionnement de fin. Évaluation à chaud (questionnaire de satisfaction en fin de formation) et évaluation à froid. Certification RS6168 délivrée par INEA CONSEIL à l'issue de trois épreuves : E1, étude de cas pratique sur un recrutement à effectuer ; E2, mise en situation orale lors d'une simulation de recrutement ; E3, étude de cas pratique sur l'intégration d'un collaborateur. Jury de 3 membres : un représentant d'INEA CONSEIL et deux experts extérieurs exerçant une fonction de recrutement (DRH, chef d'entreprise) et/ou certifiés. Pas de validation partielle. Les modalités de notation et de délivrance sont celles du certificateur. L'organisme remet un certificat de réalisation et une attestation de fin de formation.",
  moyensPedagogiques:
    "Formation entièrement à distance en classes virtuelles synchrones (Google Meet ou Zoom) avec la formatrice en direct, partage d'écran, caméra et micro des stagiaires actifs. Méthodes actives : apports courts illustrés, études de cas sur le fil rouge de Sophie, gérante d'« Atelier Lumen » (personnage et entreprise fictifs), transposition aux recrutements réels de chaque stagiaire, jeux de rôle d'entretien en sous-groupes, QCM d'entraînement corrigés en direct, retours individualisés. Supports remis : support de cours en 6 chapitres, modèles de fiche de poste, de grille de décision, d'offre d'emploi, de guide d'entretien, de parcours d'intégration et de rapport d'étonnement. Ressources officielles : Légifrance (Code du travail), CNIL, Défenseur des droits, Agefiph, France Travail, fiche France Compétences RS6168.",
  publicVise:
    "Managers et opérationnels amenés à recruter et intégrer des collaborateurs dans le cadre de leurs fonctions : dirigeants de TPE et de PME, responsables d'équipe, chefs de service, personnes chargées du recrutement. Accessibilité : formation ouverte aux personnes en situation de handicap ; le référent handicap de l'organisme étudie avec chaque stagiaire, au cas par cas, les adaptations utiles.",
  delaiAcces:
    "Inscription sous réserve de places disponibles, de l'entretien préalable et de la signature de la convention ou du contrat de formation. En financement CPF, un délai légal minimum de 11 jours ouvrés s'applique entre la validation du dossier et l'entrée en formation. Les liens des classes virtuelles sont envoyés avant le premier module.",
  dateDebut: "2025-10-13",
  dateFin: "2025-11-07",
  lieu: "Google Meet / Zoom",
  nombreParticipants: "8",
  formateur: "Rahma GARY",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Analyser un besoin de recrutement et rédiger une fiche de poste précise.",
  "Définir des critères de recrutement en lien direct avec le poste et construire une grille de décision structurée.",
  "Rédiger une offre d'emploi engageante et non discriminante.",
  "Choisir les canaux de diffusion adaptés : job boards, réseaux sociaux, France Travail, cooptation, et utiliser les outils digitaux.",
  "Trier les candidatures avec méthode et préparer un guide d'entretien.",
  "Conduire un entretien chaleureux et structuré, avec des questions comportementales, sans aucune question discriminante.",
  "Présenter les atouts de l'entreprise et du poste et répondre aux objections du candidat.",
  "Prendre une décision objective et répondre à tous les candidats, en respectant les règles de la CNIL.",
  "Organiser l'intégration du nouveau collaborateur : pré-boarding, premier jour, premières semaines, rôle du tuteur.",
  "Accueillir un collaborateur en situation de handicap : aménagements, acteurs à mobiliser, suivi ; se préparer aux épreuves E1, E2 et E3.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins est conduite avant la formation (entretien préalable avec chaque candidat, vérification de sa situation : manager ou opérationnel amené à recruter et intégrer des collaborateurs, équipement pour les classes virtuelles) puis à l'ouverture du module 1 : QCM de positionnement de 10 questions sur les notions clés des six compétences (comparé au QCM de fin pour mesurer la progression), 10 questions ouvertes et tour de table sur les recrutements passés et à venir de chacun.</p>
<ul>
  <li><strong>Préparer le recrutement (C1, C2)</strong> : beaucoup de stagiaires recrutent « au feeling », sans fiche de poste ni grille de décision, et rédigent des offres peu attractives ; la formation part de leurs propres offres.</li>
  <li><strong>Conduire l'entretien et convaincre (C3, C4)</strong> : les règles de non-discrimination sont souvent mal connues et l'entretien est peu structuré ; les jeux de rôle en sous-groupes préparent l'épreuve E2.</li>
  <li><strong>Intégrer et inclure (C5, C6)</strong> : l'intégration se limite souvent au premier jour ; l'accueil d'un collaborateur en situation de handicap et les acteurs à mobiliser sont rarement connus.</li>
</ul>
<p>Sophie, gérante d'« Atelier Lumen » (personnage et entreprise fictifs, PME de 18 salariés qui fabrique et pose des luminaires sur mesure), sert de point de départ à chaque étude de cas, avant la transposition aux recrutements réels de chaque stagiaire.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Recrutements réels</strong> : chaque étude de cas est transposée à un poste que le stagiaire recrute ou a recruté (fiche de poste, offre, guide d'entretien, parcours d'intégration).</li>
  <li><strong>Entraînement aux épreuves</strong> : QCM corrigés à chaque module, jeux de rôle d'entretien filmés avec l'accord des participants, études de cas préparant E1 et E3.</li>
  <li><strong>Classe virtuelle</strong> : test de connexion proposé avant le premier module, pauses régulières, sous-groupes pour faire participer chacun.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage ; supports transmis à l'avance sur demande, adaptations étudiées au cas par cas ; information sur les aménagements d'épreuves à demander au certificateur.</li>
</ul>`;

// ---------------------------------------------------------------------------
// QCM (10 questions chacun)
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

// ----- QCM d'entraînement (remplacent les exercices pratiques) -----

const QCM_1: Q[] = [
  ["Avant de rédiger une offre, Sophie doit d'abord :", ["Fixer le salaire le plus bas possible", "Analyser le besoin : pourquoi recruter, pour quelles missions et dans quelle équipe", "Publier une annonce sur tous les sites", "Demander des CV à ses amis"], 1],
  ["La fiche de poste décrit principalement :", ["La finalité du poste, les missions, les compétences requises et les conditions de travail", "La vie privée du futur salarié", "Le règlement intérieur complet", "Les résultats financiers de l'entreprise"], 0],
  ["Parmi ces éléments, lequel relève du savoir-être ?", ["Maîtriser un logiciel de devis", "Connaître les gammes de luminaires", "Le sens du service et l'écoute du client", "Détenir un permis de conduire"], 2],
  ["Pour le poste de chargé(e) de clientèle d'Atelier Lumen, quelle mission est cohérente ?", ["Fabriquer les luminaires à l'atelier", "Tenir la comptabilité de l'entreprise", "Poser les luminaires chez les clients", "Accueillir les demandes des clients, établir les devis et suivre les commandes"], 3],
  ["Pourquoi faire participer l'équipe à l'analyse du poste ?", ["Pour recueillir les attentes concrètes et faciliter l'intégration future", "Pour éviter de rédiger la fiche de poste", "Pour choisir le candidat à la place du manager", "Ce n'est jamais utile"], 0],
  ["Un remplacement à l'identique d'un salarié qui part est l'occasion de :", ["Reprendre l'ancienne annonce sans la relire", "Réinterroger le contenu du poste et les besoins actuels", "Supprimer la fiche de poste", "Recruter sans entretien"], 1],
  ["Le lieu de travail, les horaires et le type de contrat font partie :", ["Des critères discriminatoires", "Des informations confidentielles à cacher", "Des conditions de travail à préciser dans la fiche de poste", "Des données à ne jamais communiquer au candidat"], 2],
  ["Une compétence « indispensable » est une compétence :", ["Que le candidat peut acquérir plus tard sans difficulté", "Qui n'a aucun lien avec le poste", "Que l'on choisit selon l'âge du candidat", "Sans laquelle le poste ne peut pas être tenu dès la prise de fonction"], 3],
  ["Quel document aide à repérer les compétences attendues d'un métier ?", ["Une fiche métier de référence, par exemple celles de France Travail", "Le profil personnel du candidat sur un réseau social", "Le relevé bancaire de l'entreprise", "Un horoscope professionnel"], 0],
  ["Vrai ou faux : une fiche de poste précise facilite à la fois le recrutement, l'intégration et l'évaluation du collaborateur.", VF, 0],
];

const QCM_2: Q[] = [
  ["Un critère de recrutement doit être :", ["Lié à la personnalité supposée du candidat", "En lien direct et nécessaire avec l'emploi proposé", "Fondé sur le lieu de résidence", "Choisi après les entretiens"], 1],
  ["Une grille de décision structurée permet surtout :", ["D'évaluer tous les candidats sur les mêmes critères et de comparer objectivement", "De recruter plus vite sans entretien", "De remplacer la fiche de poste", "D'éliminer les candidats les plus âgés"], 0],
  ["Que signifie pondérer les critères de la grille ?", ["Les classer par ordre alphabétique", "Les supprimer après le premier entretien", "Donner plus de poids aux critères les plus importants pour le poste", "Les cacher aux recruteurs"], 2],
  ["Lequel de ces critères est discriminatoire au sens de l'article L1132-1 du Code du travail ?", ["La maîtrise d'un logiciel de devis", "L'expérience de la relation client", "La capacité à rédiger un courriel clair", "La situation de famille du candidat"], 3],
  ["Pour chaque critère de la grille, il est utile de définir :", ["Des indicateurs observables et une échelle d'appréciation", "Le prénom du candidat idéal", "Uniquement une impression générale", "Un critère d'apparence physique"], 0],
  ["Distinguer critères « indispensables » et « souhaitables » sert à :", ["Rendre la grille plus longue", "Ne pas écarter un bon candidat pour un critère secondaire", "Justifier un refus discriminatoire", "Éviter de rencontrer les candidats"], 1],
  ["La grille de décision doit être construite :", ["Après avoir rencontré les candidats", "Par un seul recruteur, en secret", "Avant le tri des candidatures, à partir de la fiche de poste", "Seulement si un candidat conteste"], 2],
  ["Pourquoi utiliser la même grille pour tous les candidats ?", ["Pour gagner du temps à l'impression", "Parce que la loi impose un modèle unique de grille", "Pour que les candidats se ressemblent", "Pour limiter les biais et pouvoir justifier la décision"], 3],
  ["Quel biais consiste à juger un candidat sur une première impression ?", ["L'effet de halo ou de première impression", "Le biais de confirmation statistique", "L'effet de cooptation", "Le biais d'archivage"], 0],
  ["Vrai ou faux : « avoir moins de 35 ans » peut figurer parmi les critères de la grille si l'équipe est jeune.", VF, 1],
];

const QCM_3: Q[] = [
  ["Une offre d'emploi engageante commence de préférence par :", ["La liste des sanctions disciplinaires", "Un intitulé clair du poste et ce qui le rend intéressant", "Les exigences d'âge et de situation familiale", "Le chiffre d'affaires détaillé de l'entreprise"], 1],
  ["Selon le Code du travail, une offre d'emploi diffusée en France doit en principe être rédigée :", ["En français", "En anglais", "Dans la langue de l'employeur", "Sans aucune règle de langue"], 0],
  ["Une offre peut-elle mentionner une limite d'âge maximale ?", ["Oui, toujours", "Oui, si l'équipe est jeune", "Non, sauf exceptions prévues par les textes", "Oui, pour les postes de relation client"], 2],
  ["Quelle formulation est conforme ?", ["Jeune femme dynamique pour l'accueil", "Homme pour la pose des luminaires", "Candidat de nationalité française exigée", "Chargé(e) de clientèle H/F"], 3],
  ["Les éléments qui rendent l'offre attractive sont notamment :", ["Les missions concrètes, l'équipe, les conditions de travail et la rémunération proposée", "Un texte très long sans structure", "Des abréviations internes", "L'absence de toute information sur le poste"], 0],
  ["Les qualités demandées dans l'offre doivent :", ["Être nombreuses pour décourager les candidats", "Correspondre aux critères de la fiche de poste", "Porter sur la vie privée", "Reprendre l'offre d'un concurrent"], 1],
  ["Indiquer le salaire ou une fourchette de rémunération dans l'offre :", ["Est interdit en France", "Ne sert à rien", "Rend l'offre plus transparente et attire des candidatures plus ciblées", "Oblige à embaucher le premier candidat"], 2],
  ["Une mention comme « accessible aux personnes en situation de handicap » dans une offre :", ["Est discriminatoire", "Est interdite par la CNIL", "Oblige l'entreprise à recruter cette personne", "Signale une démarche inclusive et encourage les candidatures"], 3],
  ["Avant de publier l'offre, il est utile de :", ["La faire relire par une personne qui connaît le poste", "La publier sans titre", "Retirer les missions", "Supprimer les modalités de candidature"], 0],
  ["Vrai ou faux : l'offre doit indiquer clairement comment et à qui postuler.", VF, 0],
];

const QCM_4: Q[] = [
  ["Un job board est :", ["Un tableau d'affichage dans l'atelier", "Un site d'offres d'emploi en ligne", "Un logiciel de paie", "Un réseau de transport"], 1],
  ["La cooptation consiste à :", ["Recruter grâce aux recommandations des salariés de l'entreprise", "Publier une offre dans un journal", "Faire passer un test de personnalité", "Recruter uniquement des stagiaires"], 0],
  ["France Travail peut aider l'employeur à :", ["Rédiger le contrat de travail à sa place", "Choisir le candidat final", "Diffuser son offre et présélectionner des candidats", "Payer le salaire du nouveau collaborateur"], 2],
  ["Pour un poste de chargé(e) de clientèle, un réseau social professionnel permet surtout :", ["De vérifier la vie privée des candidats", "De consulter leurs opinions politiques", "De noter les candidats sur leur photo", "De diffuser l'offre et de rechercher des profils"], 3],
  ["Pourquoi diversifier les canaux de diffusion ?", ["Pour toucher des profils variés et ne pas dépendre d'un seul canal", "Pour recevoir moins de candidatures", "Parce qu'un seul canal est interdit", "Pour éviter de lire les CV"], 0],
  ["Un logiciel de suivi des candidatures sert à :", ["Remplacer l'entretien", "Centraliser les candidatures, suivre leur statut et répondre aux candidats", "Collecter des données sans en informer les candidats", "Fixer automatiquement les salaires"], 1],
  ["Selon l'article L1221-9 du Code du travail, aucune information concernant un candidat ne peut être collectée :", ["Par courriel", "Par téléphone", "Par un dispositif qui n'a pas été porté préalablement à sa connaissance", "Pendant un entretien"], 2],
  ["Quel indicateur aide à juger l'efficacité d'un canal de diffusion ?", ["Le nombre de couleurs de l'annonce", "La longueur du titre", "Le nombre de salariés en congés", "Le nombre de candidatures pertinentes reçues par canal"], 3],
  ["Les écoles, les salons et les réseaux locaux d'entreprises sont utiles pour :", ["Toucher des candidats proches du bassin d'emploi", "Contourner les règles de non-discrimination", "Éviter de publier une offre", "Recruter sans entretien"], 0],
  ["Vrai ou faux : la cooptation dispense l'employeur d'appliquer la même grille de décision aux candidats recommandés.", VF, 1],
];

const QCM_5: Q[] = [
  ["Le tri des candidatures se fait de préférence :", ["Selon l'apparence de la photo", "À partir des critères de la grille de décision", "Selon la consonance du nom", "Selon l'adresse du candidat"], 1],
  ["Selon l'article L1221-6 du Code du travail, les informations demandées au candidat doivent :", ["Avoir un lien direct et nécessaire avec l'emploi proposé ou l'évaluation des aptitudes professionnelles", "Porter sur sa famille", "Concerner ses opinions", "Permettre de connaître son état de santé"], 0],
  ["Un guide d'entretien contient notamment :", ["Le salaire de chaque salarié", "Des questions sur la religion", "Le déroulé, les questions prévues pour chaque critère et l'espace de prise de notes", "Les coordonnées personnelles des autres candidats"], 2],
  ["Avant un entretien à distance, il faut :", ["Envoyer le lien au dernier moment", "Laisser le candidat deviner l'heure", "Prévoir un entretien sans caméra ni son", "Envoyer le lien, tester l'outil et prévoir une solution de secours"], 3],
  ["Un pré-entretien téléphonique court sert à :", ["Vérifier quelques points clés et la motivation avant l'entretien approfondi", "Prendre la décision finale", "Négocier le contrat", "Demander la situation familiale"], 0],
  ["Selon l'article L1221-8, avant d'utiliser une méthode ou technique d'aide au recrutement, l'employeur doit :", ["Ne rien dire au candidat", "En informer expressément le candidat au préalable", "Obtenir l'accord de France Travail", "La faire valider par le médecin du travail"], 1],
  ["Répartir les rôles entre deux recruteurs consiste par exemple à :", ["Poser les mêmes questions deux fois", "Interrompre le candidat à tour de rôle", "Confier à l'un la conduite de l'entretien et à l'autre la prise de notes", "Laisser le candidat seul"], 2],
  ["Un bon accueil du candidat comprend :", ["Le faire attendre sans explication", "Commencer par une question piège", "Couper sa caméra", "Le saluer, présenter les participants et annoncer le déroulé"], 3],
  ["Pour comparer les candidats, il est préférable de :", ["Prévoir la même trame d'entretien pour tous", "Improviser à chaque entretien", "Choisir le dernier candidat rencontré", "Se fier uniquement au CV"], 0],
  ["Vrai ou faux : on peut écarter une candidature parce que le candidat habite dans un quartier jugé « difficile ».", VF, 1],
];

const QCM_6: Q[] = [
  ["Une question comportementale porte sur :", ["Les projets familiaux du candidat", "Une situation réellement vécue par le candidat et ce qu'il a fait", "Ses opinions politiques", "Son lieu de naissance"], 1],
  ["Que signifie la méthode STAR ?", ["Situation, Tâche, Action, Résultat", "Salaire, Temps, Avantages, Retraite", "Sélection, Tri, Analyse, Refus", "Style, Ton, Attitude, Regard"], 0],
  ["Quelle question est interdite en entretien ?", ["Comment avez-vous géré un client mécontent ?", "Quel logiciel de devis connaissez-vous ?", "Avez-vous l'intention d'avoir des enfants prochainement ?", "Qu'est-ce qui vous attire dans ce poste ?"], 2],
  ["Un candidat qui s'estime victime de discrimination à l'embauche peut notamment saisir :", ["La CAF", "La médecine du travail", "L'URSSAF", "Le Défenseur des droits"], 3],
  ["Un entretien « chaleureux » se traduit par :", ["Une écoute active, des reformulations et un climat bienveillant", "Des questions déstabilisantes", "Un recruteur qui parle la plupart du temps", "L'absence de structure"], 0],
  ["Lors de la prise de notes, il faut noter :", ["Des impressions sur le physique", "Des faits et des exemples cités par le candidat, critère par critère", "Des suppositions sur sa vie privée", "Des surnoms"], 1],
  ["Une question de relance utile après une réponse vague est :", ["Vous êtes sûr de vous ?", "Vous êtes marié ?", "Pouvez-vous me donner un exemple précis ?", "Quel âge avez-vous ?"], 2],
  ["L'inclusion en entretien consiste notamment à :", ["Poser des questions différentes selon l'origine", "Écarter les parcours atypiques", "Refuser tout aménagement", "Proposer les aménagements nécessaires et évaluer chaque candidat sur ses compétences"], 3],
  ["À la fin de l'entretien, le recruteur :", ["Laisse le candidat poser ses questions et annonce les prochaines étapes et le délai de réponse", "Annonce un refus sans explication", "Demande le numéro de sécurité sociale", "Évoque les autres candidats par leur nom"], 0],
  ["Vrai ou faux : refuser un candidat en raison de son état de santé, sans lien avec l'aptitude constatée par le médecin du travail, est une discrimination.", VF, 0],
];

const QCM_7: Q[] = [
  ["La marque employeur désigne :", ["Le logo imprimé sur les fiches de paie", "L'image de l'entreprise en tant qu'employeur, auprès des candidats et des salariés", "Le nom commercial des produits", "Le contrat de travail type"], 1],
  ["Pour présenter les atouts d'Atelier Lumen, Sophie s'appuie d'abord sur :", ["Des éléments concrets et vrais : savoir-faire, projets, équipe, conditions de travail", "Des promesses qu'elle ne pourra pas tenir", "La critique des concurrents", "Un discours identique pour tous, sans écouter le candidat"], 0],
  ["Adapter son argumentation au candidat, c'est :", ["Mentir sur le poste", "Parler uniquement du salaire", "Relier les atouts du poste aux motivations exprimées par le candidat", "Éviter ses questions"], 2],
  ["Quel atout est spécifique au poste de chargé(e) de clientèle d'Atelier Lumen ?", ["L'existence d'un parking public dans la ville", "La météo de la région", "Le nombre d'habitants du département", "Le suivi de projets de luminaires sur mesure, du devis à la pose"], 3],
  ["La proposition de valeur employeur résume :", ["Ce que l'entreprise offre à ses collaborateurs et ce qui la distingue", "Le montant du capital social", "La liste des fournisseurs", "Le règlement intérieur"], 0],
  ["Le témoignage d'un salarié de l'équipe pendant le processus de recrutement permet :", ["De remplacer l'entretien", "De rendre la présentation de l'entreprise plus concrète et crédible", "De vérifier la vie privée du candidat", "De négocier le salaire à la place du manager"], 1],
  ["Présenter honnêtement les contraintes du poste sert à :", ["Décourager tous les candidats", "Respecter une obligation de la CNIL", "Éviter une déception et un départ rapide après l'embauche", "Réduire le salaire"], 2],
  ["Une visite de l'atelier, sur place ou à distance par vidéo, permet surtout :", ["De faire signer le contrat immédiatement", "D'obtenir des informations personnelles", "D'éviter de parler des missions", "De montrer l'environnement de travail et l'équipe"], 3],
  ["La qualité de l'expérience vécue par les candidats pendant le recrutement :", ["Influence l'image de l'entreprise, même auprès des candidats non retenus", "N'a aucune importance", "Ne concerne que les grandes entreprises", "Est fixée par la loi"], 0],
  ["Vrai ou faux : décrire le poste de façon plus flatteuse que la réalité améliore durablement le recrutement.", VF, 1],
];

const QCM_8: Q[] = [
  ["Face à l'objection « le trajet est trop long », Sophie peut :", ["Ignorer l'objection", "Écouter, reformuler puis présenter les solutions réelles : horaires, transports, télétravail partiel si le poste le permet", "Promettre un avantage qu'elle ne peut pas accorder", "Mettre fin à l'entretien"], 1],
  ["Traiter une objection commence par :", ["L'écoute et la reformulation de la préoccupation du candidat", "La contradiction immédiate", "Un changement de sujet", "Une baisse de la rémunération"], 0],
  ["La décision finale de recrutement se prend de préférence :", ["Sur une intuition", "Selon la sympathie ressentie", "En confrontant les évaluations de la grille entre les recruteurs", "En choisissant le candidat le plus jeune"], 2],
  ["Une proposition d'embauche précise notamment :", ["Les opinions de l'employeur", "Les coordonnées des autres candidats", "Le dossier médical du candidat", "Le poste, la rémunération, la date de début et le type de contrat"], 3],
  ["Les candidats non retenus doivent recevoir :", ["Une réponse rapide et courtoise", "Aucune réponse", "Une réponse seulement s'ils relancent", "Un message citant le candidat retenu"], 0],
  ["Selon la CNIL, les données d'un candidat non retenu peuvent être conservées au maximum :", ["10 ans", "2 ans après le dernier contact, sauf opposition du candidat", "Sans limite de durée", "1 semaine"], 1],
  ["Pour conserver le CV d'un candidat non retenu en vue d'un autre poste, l'entreprise doit :", ["Le transmettre à d'autres employeurs", "Le publier en ligne", "En informer le candidat, qui peut s'y opposer, et respecter la durée de conservation", "Le garder sans le dire"], 2],
  ["Un retour personnalisé à un candidat non retenu après un entretien porte sur :", ["Sa vie privée", "Son apparence", "Son origine", "Des éléments factuels liés aux critères du poste"], 3],
  ["Si le candidat retenu refuse la proposition, Sophie :", ["Revient à la grille et recontacte le candidat suivant le mieux évalué", "Recommence sans fiche de poste", "Embauche le dernier candidat rencontré", "Abandonne le recrutement"], 0],
  ["Vrai ou faux : la négociation de l'offre doit rester cohérente avec la grille de rémunération de l'entreprise et l'équité entre salariés.", VF, 0],
];

const QCM_9: Q[] = [
  ["Le pré-boarding désigne :", ["La période d'essai", "La période entre l'acceptation de l'offre et l'arrivée du collaborateur", "Le premier entretien annuel", "La fin du contrat"], 1],
  ["Quelle formalité l'employeur doit-il accomplir avant toute embauche ?", ["La déclaration préalable à l'embauche, ou DPAE, auprès de l'URSSAF", "Une déclaration à la mairie", "Une demande d'autorisation à France Travail", "Un dépôt au tribunal"], 0],
  ["La période d'essai d'un contrat à durée indéterminée :", ["Est automatique sans écrit", "Peut durer un an", "Doit être expressément prévue dans la lettre d'engagement ou le contrat de travail", "Est interdite"], 2],
  ["Pour un employé en contrat à durée indéterminée, la durée maximale initiale de la période d'essai prévue par le Code du travail est de :", ["1 semaine", "6 mois", "1 an", "2 mois"], 3],
  ["La visite d'information et de prévention du nouveau salarié est réalisée :", ["Par le service de prévention et de santé au travail, dans les 3 mois suivant la prise de poste dans le cas général", "Par le manager, le premier jour", "Par France Travail", "Uniquement à la demande du salarié"], 0],
  ["Le tuteur ou référent d'intégration :", ["Remplace le manager", "Accompagne le nouveau collaborateur au quotidien et répond à ses questions", "Évalue la période d'essai seul", "Signe le contrat de travail"], 1],
  ["Le premier jour, il est essentiel que :", ["Le poste de travail ne soit pas prêt", "Le nouveau collaborateur reste seul", "Le poste, les accès et le programme de la journée soient prêts", "Le planning des congés de l'équipe soit présenté en priorité"], 2],
  ["Le rapport d'étonnement consiste à :", ["Sanctionner le nouveau collaborateur", "Noter les absences", "Évaluer les autres salariés", "Recueillir le regard neuf du nouvel arrivant sur l'entreprise après quelques semaines"], 3],
  ["Parmi ces moments dédiés, lequel favorise l'intégration dans l'équipe ?", ["Un déjeuner d'accueil avec l'équipe", "Un contrôle surprise", "Une réunion sans le nouvel arrivant", "L'envoi du règlement intérieur sans explication"], 0],
  ["Vrai ou faux : des points réguliers avec le manager pendant la période d'essai aident à ajuster l'intégration et à préparer le bilan.", VF, 0],
];

const QCM_10: Q[] = [
  ["Qui reconnaît la qualité de travailleur handicapé, ou RQTH ?", ["Le médecin traitant seul", "La commission des droits et de l'autonomie des personnes handicapées, au sein de la MDPH", "L'employeur", "France Compétences"], 1],
  ["L'obligation d'emploi des travailleurs handicapés s'applique aux entreprises :", ["D'au moins 20 salariés, à hauteur de 6 % de l'effectif", "De plus de 1 000 salariés uniquement", "De moins de 10 salariés", "Seulement dans le secteur public"], 0],
  ["Atelier Lumen compte 18 salariés. Au regard de l'obligation d'emploi :", ["Elle doit employer 6 travailleurs handicapés", "Elle doit verser une contribution annuelle", "Elle n'est pas assujettie à l'obligation d'emploi, mais doit respecter la non-discrimination", "Elle doit nommer un référent handicap"], 2],
  ["Selon l'article L5213-6 du Code du travail, l'employeur prend les mesures appropriées pour permettre l'accès à l'emploi d'un travailleur handicapé :", ["Seulement si le salarié paie l'aménagement", "Jamais pendant la période d'essai", "Uniquement dans les grandes entreprises", "Sauf si ces mesures entraînent des charges disproportionnées, compte tenu des aides"], 3],
  ["Quel acteur peut financer des aides à l'aménagement du poste dans une entreprise privée ?", ["L'Agefiph", "La CNIL", "Le Défenseur des droits", "L'URSSAF"], 0],
  ["Le médecin du travail intervient notamment pour :", ["Choisir le candidat", "Préconiser des aménagements de poste adaptés à l'état de santé du salarié", "Fixer le salaire", "Rédiger l'offre d'emploi"], 1],
  ["Un référent handicap doit être désigné obligatoirement dans les entreprises :", ["De plus de 10 salariés", "De plus de 50 salariés", "D'au moins 250 salariés", "Uniquement dans la fonction publique"], 2],
  ["La collaboratrice recrutée par Sophie bénéficie de la RQTH. Elle :", ["Doit obligatoirement en informer ses collègues", "Doit déclarer son handicap dans le CV", "Perd sa RQTH en signant le contrat", "Choisit librement d'en informer ou non son employeur"], 3],
  ["Cap emploi accompagne :", ["Les personnes en situation de handicap et les employeurs dans le recrutement et le maintien dans l'emploi", "Uniquement les entreprises de plus de 250 salariés", "Les candidats à la certification", "Les organismes de formation"], 0],
  ["Vrai ou faux : refuser un aménagement raisonnable à un travailleur handicapé peut constituer une discrimination.", VF, 0],
];

/** 10 QCM d'entraînement, à la place des exercices pratiques (deux par module pour les modules 1 à 4, un pour les modules 5 et 6). */
export const REC30_EXERCICES: AIContentExercise[] = [
  qcmExercice("QCM 1 — C1 : analyser le besoin et rédiger la fiche de poste", QCM_1),
  qcmExercice("QCM 2 — C1 : critères de recrutement et grille de décision structurée", QCM_2),
  qcmExercice("QCM 3 — C2 : rédiger une offre engageante et non discriminante", QCM_3),
  qcmExercice("QCM 4 — C2 : canaux de recrutement et outils digitaux", QCM_4),
  qcmExercice("QCM 5 — C3 : trier les candidatures et préparer l'entretien", QCM_5),
  qcmExercice("QCM 6 — C3 : conduire un entretien structuré, chaleureux et non discriminant", QCM_6),
  qcmExercice("QCM 7 — C4 : présenter les atouts de l'entreprise et du poste", QCM_7),
  qcmExercice("QCM 8 — C4 : objections, décision et réponse aux candidats", QCM_8),
  qcmExercice("QCM 9 — C5 : construire le parcours d'intégration", QCM_9),
  qcmExercice("QCM 10 — C6 : accueillir un collaborateur en situation de handicap", QCM_10),
];

// ----- QCM de révision, un par compétence -----

const QCM_C1: Q[] = [
  ["Quelle est la première question à se poser avant un recrutement ?", ["Quel est le profil de mon meilleur ami ?", "Quel besoin de l'entreprise ce recrutement doit-il couvrir ?", "Combien de candidats puis-je refuser ?", "Quelle photo mettre dans l'annonce ?"], 1],
  ["Le contexte du recrutement d'Atelier Lumen est la hausse des demandes de devis. Le poste doit donc d'abord :", ["Absorber et suivre ces demandes avec qualité", "Remplacer le gérant", "Réduire le nombre de clients", "Gérer la paie"], 0],
  ["Les savoir-faire désignent :", ["Les opinions du candidat", "Ses loisirs", "Les compétences techniques mises en œuvre dans les missions", "Sa situation familiale"], 2],
  ["Dans une grille de décision, une échelle d'appréciation peut être :", ["Bon ou mauvais selon l'humeur", "Une note sur la tenue vestimentaire", "Un classement par âge", "Non démontré, partiellement démontré, démontré, démontré avec exemples"], 3],
  ["Quel critère est en lien direct avec le poste de chargé(e) de clientèle ?", ["Savoir établir un devis et expliquer une offre à un client", "Être propriétaire de son logement", "Avoir un nom facile à prononcer", "Être sans enfant"], 0],
  ["Faire valider la fiche de poste par le gérant et l'équipe permet :", ["D'éviter d'en parler aux candidats", "De partager une vision commune du poste et des attentes", "De supprimer la grille", "D'allonger le recrutement sans raison"], 1],
  ["Un critère « souhaitable » est par exemple :", ["Savoir accueillir un client", "Être disponible aux horaires du poste", "Connaître déjà le secteur de l'éclairage", "Savoir lire un bon de commande"], 2],
  ["Quel est le risque d'une grille de décision trop longue ?", ["Aucun risque", "Rendre le recrutement plus équitable", "Remplacer l'entretien", "Diluer les critères essentiels et compliquer la comparaison"], 3],
  ["Pour limiter les biais, la grille est complétée :", ["Pendant ou juste après chaque entretien, avec des faits observés", "Une semaine plus tard, de mémoire", "Par le candidat lui-même", "Uniquement pour le candidat préféré"], 0],
  ["Vrai ou faux : la grille de décision sert aussi à expliquer la décision aux candidats et à l'équipe.", VF, 0],
];

const QCM_C2: Q[] = [
  ["Une offre « engageante » est une offre qui :", ["Promet tout au candidat", "Donne envie de postuler en décrivant concrètement le poste, l'équipe et ce que l'entreprise offre", "Ne mentionne aucune mission", "Exige dix ans d'expérience pour tous les postes"], 1],
  ["Quelle mention est interdite dans une offre d'emploi ?", ["Une préférence liée au sexe du candidat, sauf exception légale", "Le lieu de travail", "Le type de contrat", "Les missions principales"], 0],
  ["Pourquoi adapter le texte de l'offre au canal de diffusion ?", ["Pour cacher des informations", "Pour changer les missions selon le site", "Parce que chaque canal a son format et son public", "Pour payer moins de taxes"], 2],
  ["La cooptation présente un risque si elle est le seul canal :", ["Elle coûte toujours très cher", "Elle est interdite", "Elle oblige à recruter un cadre", "Elle peut réduire la diversité des profils"], 3],
  ["Pour suivre les candidatures reçues sur plusieurs sites, Sophie peut utiliser :", ["Un outil de suivi des candidatures ou un tableau partagé tenu à jour", "Des notes sur des papiers volants", "Sa mémoire uniquement", "Les réseaux sociaux personnels des candidats"], 0],
  ["Publier l'offre sur le site de l'entreprise permet notamment :", ["De ne plus répondre aux candidats", "De valoriser la marque employeur et de renvoyer les candidats vers une page complète", "De collecter des données sans information", "D'éviter de rédiger l'offre"], 1],
  ["Les données collectées lors d'une candidature en ligne doivent être :", ["Les plus nombreuses possible", "Partagées avec des partenaires commerciaux", "Limitées à ce qui est nécessaire pour évaluer la candidature", "Conservées sans limite"], 2],
  ["Une offre accessible au plus grand nombre est une offre :", ["En image uniquement", "Avec des abréviations internes", "Sans contact pour postuler", "Lisible, structurée et compréhensible sans jargon"], 3],
  ["Quand relancer la diffusion d'une offre ?", ["Lorsque les candidatures pertinentes manquent après une période définie", "Chaque jour sans analyse", "Jamais", "Après l'embauche"], 0],
  ["Vrai ou faux : demander une photo obligatoire dans l'offre est une bonne pratique pour trier plus vite.", VF, 1],
];

const QCM_C3: Q[] = [
  ["Un entretien structuré repose sur :", ["Une conversation libre sans préparation", "Des questions préparées à partir des critères et posées à tous les candidats", "Des questions sur la vie privée", "Un test d'apparence"], 1],
  ["Au début d'un entretien, il est recommandé de :", ["Mettre le candidat à l'aise et présenter le déroulé", "Commencer par les points faibles du CV", "Annoncer les autres candidats", "Parler de sa propre carrière pendant longtemps"], 0],
  ["Quelle question permet de faire émerger le potentiel d'un candidat au parcours atypique ?", ["Pourquoi n'êtes-vous pas marié ?", "D'où viennent vos parents ?", "Racontez-moi une situation où vous avez appris rapidement une nouvelle tâche.", "Quelle est votre religion ?"], 2],
  ["L'écoute active consiste à :", ["Préparer sa question suivante pendant que le candidat parle", "Interrompre pour gagner du temps", "Juger la réponse avant la fin", "Écouter, reformuler et relancer pour approfondir"], 3],
  ["Une mise en situation pendant l'entretien, par exemple répondre à l'appel d'un client fictif :", ["Permet d'observer une compétence en lien avec le poste", "Est interdite", "Remplace la grille", "Doit porter sur la vie privée"], 0],
  ["Si un candidat évoque spontanément sa situation familiale, le recruteur :", ["Note l'information dans la grille", "Ne la prend pas en compte et revient aux compétences", "Pose d'autres questions sur ses enfants", "Écarte la candidature"], 1],
  ["Le candidat demande comment se passe la suite. Le recruteur :", ["Ne répond pas", "Promet le poste", "Annonce les étapes et le délai de réponse", "Dit qu'il ne sait pas"], 2],
  ["Pendant un entretien en visioconférence, le recruteur veille à :", ["Lire ses courriels", "Couper sa caméra", "Être interrompu par ses collègues", "Regarder la caméra, limiter les distractions et vérifier que le candidat entend bien"], 3],
  ["La sélection du candidat se fonde sur :", ["Les preuves recueillies au regard des critères de la grille", "La ressemblance avec le recruteur", "La première impression", "L'âge"], 0],
  ["Vrai ou faux : un test ou une méthode d'aide au recrutement doit rester pertinent au regard de la finalité poursuivie.", VF, 0],
];

const QCM_C4: Q[] = [
  ["Pour convaincre un candidat, il est plus efficace de :", ["Parler sans arrêt de l'entreprise", "Questionner ses motivations puis relier les atouts du poste à ce qui compte pour lui", "Insister sur les sanctions", "Éviter de parler du poste"], 1],
  ["Parmi ces atouts d'Atelier Lumen, lequel est concret et vérifiable ?", ["Des projets de luminaires sur mesure suivis du devis à la pose", "Une ambiance « exceptionnelle » sans exemple", "Des promotions promises à tous", "Un salaire « imbattable » sans chiffre"], 0],
  ["Le candidat hésite à cause de la rémunération. Sophie :", ["Le laisse partir sans échange", "Promet une augmentation qu'elle ne peut pas garantir", "Présente la rémunération et les éléments du package réellement proposés, avec transparence", "Le critique"], 2],
  ["Une bonne présentation du poste mentionne aussi :", ["Les secrets de fabrication", "Les salaires des collègues", "La vie privée du gérant", "Les perspectives d'évolution et de formation réellement possibles"], 3],
  ["Le délai entre l'entretien et la proposition d'embauche :", ["Doit être court et annoncé, pour ne pas perdre un bon candidat", "N'a aucune importance", "Doit être le plus long possible", "Est fixé par la CNIL"], 0],
  ["Une réponse négative à un candidat :", ["Peut être envoyée sans relecture", "Reste courtoise, rapide et respectueuse de la candidature", "Doit détailler les autres candidatures", "Est inutile après un entretien"], 1],
  ["Pour une petite entreprise comme Atelier Lumen, un atout souvent apprécié des candidats est :", ["L'anonymat", "L'absence d'interlocuteur", "La proximité avec la direction et la variété des missions", "Le grand nombre de niveaux hiérarchiques"], 2],
  ["Faire rencontrer l'équipe au candidat finaliste permet :", ["De demander à l'équipe de choisir seule", "De contourner la grille", "De poser des questions personnelles", "De vérifier la compatibilité de part et d'autre et de rassurer le candidat"], 3],
  ["La promesse d'embauche ou l'offre écrite :", ["Engage l'entreprise, d'où l'importance d'en vérifier le contenu", "N'a jamais de valeur", "Peut être modifiée après l'arrivée sans accord", "Est facultative pour un CDI"], 0],
  ["Vrai ou faux : les candidats non retenus peuvent garder une image positive de l'entreprise si le processus a été respectueux.", VF, 0],
];

const QCM_C5: Q[] = [
  ["L'intégration d'un nouveau collaborateur commence :", ["Le jour de la fin de la période d'essai", "Dès l'acceptation de la proposition d'embauche", "Après le premier mois", "Seulement si le salarié le demande"], 1],
  ["Un livret d'accueil présente notamment :", ["L'entreprise, l'organisation, les interlocuteurs, les règles de sécurité et les informations pratiques", "Les salaires de chacun", "Les évaluations des autres salariés", "Les données de santé de l'équipe"], 0],
  ["Pendant le pré-boarding, Sophie peut :", ["Ne donner aucune nouvelle", "Modifier le poste sans prévenir", "Envoyer le programme du premier jour et un message de bienvenue", "Annuler l'embauche sans motif"], 2],
  ["Les objectifs des premières semaines doivent être :", ["Très ambitieux et vagues", "Identiques à ceux d'un salarié expérimenté", "Cachés", "Progressifs, clairs et partagés avec le collaborateur"], 3],
  ["Le rôle du manager dans l'intégration est de :", ["Fixer le cap, présenter l'équipe, faire des points réguliers et donner du retour", "Déléguer tout au tuteur", "Attendre la fin de la période d'essai", "Intervenir seulement en cas de faute"], 0],
  ["Un point d'étape à la fin du premier mois sert à :", ["Rompre la période d'essai sans échange", "Faire le bilan, ajuster les objectifs et recueillir le ressenti du collaborateur", "Calculer les congés", "Changer de tuteur systématiquement"], 1],
  ["Pour motiver le nouveau collaborateur, il est utile de :", ["Lui confier uniquement des tâches sans intérêt", "Le comparer aux autres", "Reconnaître ses progrès et lui donner rapidement une mission utile", "Éviter de lui parler"], 2],
  ["Le rapport d'étonnement est utile à l'entreprise car il :", ["Remplace l'entretien annuel", "Sert de sanction", "Évite toute formation", "Fait remonter des pistes d'amélioration vues avec un regard neuf"], 3],
  ["La rupture de la période d'essai à l'initiative de l'employeur :", ["Doit respecter un délai de prévenance et ne pas être fondée sur un motif discriminatoire", "Peut être fondée sur l'état de grossesse", "Est interdite", "Se fait sans aucune règle"], 0],
  ["Vrai ou faux : un premier jour bien préparé contribue à fidéliser le collaborateur.", VF, 0],
];

const QCM_C6: Q[] = [
  ["L'aménagement raisonnable peut porter sur :", ["Le salaire uniquement", "Le poste, les horaires, les outils ou l'organisation du travail", "La suppression du contrat", "La nationalité"], 1],
  ["Avant l'arrivée de la collaboratrice bénéficiaire de la RQTH, Sophie peut :", ["Échanger avec elle sur ses besoins, avec son accord, et anticiper les aménagements", "Informer toute l'équipe de son handicap sans son accord", "Changer son poste sans la consulter", "Ne rien prévoir"], 0],
  ["Pour évaluer les aménagements nécessaires, l'employeur s'appuie notamment sur :", ["Le Défenseur des droits", "Les avis des clients", "Les préconisations du médecin du travail", "Les réseaux sociaux"], 2],
  ["Sensibiliser l'équipe à l'accueil d'un collègue en situation de handicap consiste à :", ["Révéler son diagnostic", "Lui attribuer un surnom", "Réduire ses missions sans raison", "Partager des repères sur l'inclusion sans dévoiler d'information de santé"], 3],
  ["Un handicap peut être :", ["Visible ou invisible, par exemple une maladie chronique ou un trouble auditif", "Uniquement moteur", "Toujours visible", "Toujours incompatible avec un poste de relation client"], 0],
  ["Pendant l'entretien de recrutement d'une candidate RQTH, le recruteur :", ["Lui demande son diagnostic", "Évalue ses compétences comme pour les autres et propose les aménagements nécessaires à l'entretien", "Réduit la durée de l'entretien", "Pose des questions sur ses traitements"], 1],
  ["Le suivi de l'intégration d'un collaborateur en situation de handicap comprend :", ["Aucun point particulier", "Un contrôle médical par le manager", "Des points réguliers pour vérifier que les aménagements sont adaptés et les ajuster", "Une mise à l'écart de l'équipe"], 2],
  ["L'Agefiph intervient auprès :", ["Des seuls employeurs publics", "Des organismes de formation uniquement", "Des syndicats", "Des employeurs privés et des personnes en situation de handicap"], 3],
  ["Dans la fonction publique, le fonds qui finance les aides liées au handicap est :", ["Le FIPHFP", "L'Agefiph", "L'URSSAF", "La CAF"], 0],
  ["Vrai ou faux : une entreprise de moins de 20 salariés n'est soumise à aucune règle en matière de handicap au travail.", VF, 1],
];

export const REC30_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Définir les critères de recrutement et la grille de décision", QCM_C1),
  qcmExercice("QCM C2 — Diffuser une offre de recrutement engageante", QCM_C2),
  qcmExercice("QCM C3 — Mener un entretien de recrutement structuré et inclusif", QCM_C3),
  qcmExercice("QCM C4 — Présenter les atouts de l'entreprise et du poste", QCM_C4),
  qcmExercice("QCM C5 — Intégrer le collaborateur au sein de l'équipe", QCM_C5),
  qcmExercice("QCM C6 — Accueillir et accompagner un collaborateur en situation de handicap", QCM_C6),
];

/**
 * Ordre volontaire : les 10 QCM d'entraînement d'abord (C1 à C6), alignés sur les 10 questions ouvertes de
 * positionnement de `recrutement30hHumanized.ts` ; les 6 QCM par compétence ensuite.
 */
export const REC30_EXERCICES_COMPLETS: AIContentExercise[] = [...REC30_EXERCICES, ...REC30_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Recruter et intégrer ses collaborateurs (CP-FFP) » (6 chapitres, un par compétence C1 à C6)</strong> : cours détaillé, tableaux, exemples tirés du fil rouge de Sophie et d'« Atelier Lumen » (personnage et entreprise fictifs), encadrés « À retenir », quiz et cas pratiques corrigés.</li>
  <li><strong>Modèles de documents</strong> : fiche de poste, grille de décision structurée et pondérée, offre d'emploi, guide d'entretien avec questions comportementales, courriels de réponse aux candidats, parcours d'intégration, livret d'accueil, rapport d'étonnement, check-list d'accueil d'un collaborateur en situation de handicap.</li>
  <li><strong>QCM d'entraînement corrigés</strong> : 10 QCM au fil des modules et un QCM par compétence.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Classe virtuelle</strong> : Google Meet ou Zoom, avec partage d'écran, salles de sous-groupes, sondages et conversation écrite ; test de connexion proposé avant le premier module.</li>
  <li><strong>Outils de recrutement présentés de façon neutre</strong> : job boards, réseaux sociaux professionnels, espace recruteur de France Travail, outils de suivi des candidatures, outils de visioconférence pour les entretiens à distance.</li>
  <li><strong>Matériel du stagiaire</strong> : ordinateur avec caméra, micro et connexion Internet, suite bureautique.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>France Compétences — fiche RS6168</strong> : <a href="https://www.francecompetences.fr/recherche/rs/6168/">https://www.francecompetences.fr/recherche/rs/6168/</a> — compétences attestées, modalités d'évaluation, certificateur, date d'échéance de l'enregistrement.</li>
  <li><strong>Légifrance — Code du travail</strong> : <a href="https://www.legifrance.gouv.fr/">https://www.legifrance.gouv.fr/</a> — non-discrimination (article L1132-1), recrutement (articles L1221-6 à L1221-9), offres d'emploi (articles L5331-2 et L5331-4), période d'essai (articles L1221-19 et suivants), travailleurs handicapés (article L5213-6).</li>
  <li><strong>CNIL</strong> : <a href="https://www.cnil.fr/">https://www.cnil.fr/</a> — données personnelles des candidats et recrutement.</li>
  <li><strong>Défenseur des droits</strong> : <a href="https://www.defenseurdesdroits.fr/">https://www.defenseurdesdroits.fr/</a> — lutte contre les discriminations à l'embauche.</li>
  <li><strong>Agefiph</strong> : <a href="https://www.agefiph.fr/">https://www.agefiph.fr/</a> — aides et services pour l'emploi des personnes en situation de handicap.</li>
  <li><strong>Entreprendre.service-public.fr</strong> : <a href="https://entreprendre.service-public.fr/">https://entreprendre.service-public.fr/</a> — formalités d'embauche, déclaration préalable à l'embauche, période d'essai.</li>
</ul>`;

/**
 * Vidéos : uniquement des recherches YouTube déjà utilisées ailleurs dans le dépôt (recrutement, entretien,
 * formalités d'embauche). Aucune vidéo précise imposée, aucun identifiant inventé.
 */
export const REC30_VIDEOS = [
  { title: "Recruter en PME : fiche de poste et intégration", description: "Recherche YouTube : de l'analyse du poste à l'accueil du nouveau collaborateur.", url: "https://www.youtube.com/results?search_query=recruter+en+pme+fiche+de+poste+onboarding" },
  { title: "Conduire un entretien de recrutement", description: "Recherche YouTube : guide d'entretien structuré et questions comportementales.", url: "https://www.youtube.com/results?search_query=conduire+entretien+de+recrutement+structur%C3%A9" },
  { title: "DPAE et formalités d'embauche", description: "Recherche YouTube : déclaration préalable à l'embauche et formalités de l'employeur.", url: "https://www.youtube.com/results?search_query=DPAE+formalit%C3%A9s+embauche+employeur" },
];

export const REC30_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: REC30_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: REC30_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement de début et de fin (10 questions)
// ---------------------------------------------------------------------------
export const REC30_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "Quel document décrit les missions, les compétences requises et les conditions de travail d'un poste ?", options: ["Le règlement intérieur", "La fiche de poste", "Le bulletin de paie", "Le registre du personnel"], correctIndex: 1 },
  { question: "À quoi sert une grille de décision dans un recrutement ?", options: ["À évaluer tous les candidats sur les mêmes critères", "À fixer les congés", "À calculer le salaire net", "À rédiger le contrat"], correctIndex: 0 },
  { question: "Une offre d'emploi peut-elle fixer un âge maximal pour postuler ?", options: ["Oui, librement", "Oui, si l'entreprise est petite", "Non, sauf exceptions prévues par les textes", "Oui, pour les postes de bureau"], correctIndex: 2 },
  { question: "Qu'est-ce que la cooptation ?", options: ["Un test de logique", "Une aide de l'État", "Un contrat de travail", "Un recrutement par recommandation des salariés"], correctIndex: 3 },
  { question: "Quelle question est interdite en entretien d'embauche ?", options: ["Êtes-vous enceinte ?", "Quelle expérience avez-vous de la relation client ?", "Pourquoi ce poste vous intéresse-t-il ?", "Quels logiciels utilisez-vous ?"], correctIndex: 0 },
  { question: "Que signifie la méthode STAR utilisée en entretien ?", options: ["Statut, Titre, Ancienneté, Rémunération", "Situation, Tâche, Action, Résultat", "Sélection, Tri, Accueil, Recrutement", "Savoir, Technique, Aptitude, Réussite"], correctIndex: 1 },
  { question: "La marque employeur, c'est :", options: ["Le logo des produits", "Le nom du dirigeant", "L'image de l'entreprise auprès des candidats et des salariés", "Le numéro SIRET"], correctIndex: 2 },
  { question: "Quelle déclaration l'employeur doit-il faire avant l'embauche d'un salarié ?", options: ["Une déclaration à la mairie", "Une déclaration fiscale annuelle", "Une déclaration à la CNIL", "La déclaration préalable à l'embauche, ou DPAE"], correctIndex: 3 },
  { question: "Qu'est-ce qu'un rapport d'étonnement ?", options: ["Le regard du nouvel arrivant sur l'entreprise après quelques semaines", "Un avertissement disciplinaire", "Un bilan comptable", "Une enquête de satisfaction client"], correctIndex: 0 },
  { question: "Que signifie RQTH ?", options: ["Registre de qualification des techniciens", "Reconnaissance de la qualité de travailleur handicapé", "Règlement de qualité du travail en entreprise", "Revenu de qualification du travail"], correctIndex: 1 },
];

/** Explications du corrigé du positionnement, dans l'ordre des questions. */
export const REC30_QCM_DEBUT_EXPLICATIONS: string[] = [
  "La fiche de poste précise la finalité, les missions, les compétences et les conditions de travail ; elle sert au recrutement, à l'intégration et à l'évaluation (module 1).",
  "La grille de décision structurée applique les mêmes critères, liés au poste, à tous les candidats : elle limite les biais et permet de justifier la décision (module 1).",
  "L'article L5331-2 du Code du travail interdit de mentionner une limite d'âge maximale dans une offre, sauf exceptions prévues par les textes (module 2).",
  "La cooptation repose sur les recommandations des salariés ; elle complète les autres canaux sans dispenser d'appliquer la même grille (module 2).",
  "La grossesse fait partie des critères protégés par l'article L1132-1 du Code du travail ; les questions doivent avoir un lien direct et nécessaire avec l'emploi (article L1221-6) (module 3).",
  "STAR : Situation, Tâche, Action, Résultat ; la méthode structure les questions comportementales sur des situations réellement vécues (module 3).",
  "La marque employeur est l'image de l'entreprise en tant qu'employeur ; elle s'appuie sur des atouts concrets et vrais (module 4).",
  "La déclaration préalable à l'embauche (DPAE) est faite auprès de l'URSSAF avant la prise de poste (module 5).",
  "Le rapport d'étonnement recueille le regard neuf du nouveau collaborateur après quelques semaines ; il nourrit l'amélioration du parcours d'intégration (module 5).",
  "La reconnaissance de la qualité de travailleur handicapé est attribuée par la commission des droits et de l'autonomie des personnes handicapées, au sein de la MDPH (module 6).",
];

export const REC30_QCM_FIN: AIQCMQuestion[] = [
  { question: "Un critère de recrutement doit être :", options: ["En lien direct et nécessaire avec l'emploi", "Fondé sur l'âge", "Lié au lieu de résidence", "Choisi après les entretiens"], correctIndex: 0 },
  { question: "Pourquoi pondérer les critères de la grille de décision ?", options: ["Pour la rendre plus longue", "Pour écarter certains profils", "Pour donner plus de poids aux critères essentiels du poste", "Pour la cacher aux recruteurs"], correctIndex: 2 },
  { question: "Selon le Code du travail, une offre d'emploi diffusée en France est en principe rédigée :", options: ["En anglais", "En français", "Dans la langue du dirigeant", "Sans règle"], correctIndex: 1 },
  { question: "Avant d'utiliser une méthode d'aide au recrutement, l'employeur doit :", options: ["L'utiliser sans prévenir", "Demander l'accord de l'URSSAF", "La faire valider par le médecin du travail", "En informer expressément le candidat"], correctIndex: 3 },
  { question: "Un candidat qui s'estime discriminé à l'embauche peut saisir :", options: ["Le Défenseur des droits", "La CAF", "Le service des impôts", "France Compétences"], correctIndex: 0 },
  { question: "Selon la CNIL, les données d'un candidat non retenu sont conservées au maximum :", options: ["6 mois", "10 ans", "2 ans après le dernier contact, sauf opposition", "Sans limite"], correctIndex: 2 },
  { question: "Le pré-boarding désigne :", options: ["La période d'essai", "La période entre l'acceptation de l'offre et l'arrivée", "Le premier entretien annuel", "Le départ en retraite"], correctIndex: 1 },
  { question: "L'obligation d'emploi des travailleurs handicapés concerne les entreprises :", options: ["De moins de 20 salariés", "De plus de 1 000 salariés uniquement", "Du seul secteur public", "D'au moins 20 salariés, à hauteur de 6 % de l'effectif"], correctIndex: 3 },
  { question: "Quel acteur finance des aides à l'aménagement de poste dans le secteur privé ?", options: ["L'Agefiph", "La CNIL", "L'URSSAF", "Le Défenseur des droits"], correctIndex: 0 },
  { question: "Quelles sont les trois épreuves de la certification RS6168 ?", options: ["Un QCM, un mémoire et un stage", "Une étude de cas sur un recrutement, une simulation orale de recrutement et une étude de cas sur l'intégration", "Un oral de langue, un écrit et un dossier", "Un test de personnalité et deux entretiens"], correctIndex: 1 },
];

export const REC30_EVAL_PACK: AIEvalPack = {
  qcmDebut: REC30_QCM_DEBUT,
  qcmFin: REC30_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin du module 3) — le recrutement du chargé de clientèle d'Atelier Lumen, cas fictif",
    contexte:
      "Sophie, gérante d'« Atelier Lumen » (personnage et entreprise fictifs), a rédigé seule une annonce : « Recherche jeune commercial dynamique, moins de 30 ans, photo obligatoire, pour accueillir nos clients. » Elle ne dispose ni de fiche de poste, ni de grille de décision. Elle a publié l'annonce sur un seul site et compte demander en entretien aux candidats s'ils ont des enfants, « pour connaître leurs disponibilités ».",
    questions: [
      { question: "Quels éléments de l'annonce posent problème, et comment la réécrire ?", reponseAttendue: "Mentions discriminatoires ou interdites : sexe sous-entendu par « jeune commercial », limite d'âge (article L5331-2), photo obligatoire sans lien avec le poste ; réécriture : intitulé « Chargé(e) de clientèle H/F », missions concrètes, compétences recherchées, conditions de travail, rémunération ou fourchette, modalités de candidature, mention d'ouverture aux personnes en situation de handicap.", points: 5 },
      { question: "Quels documents Sophie doit-elle préparer avant de trier les candidatures ?", reponseAttendue: "Une fiche de poste (finalité, missions, compétences, conditions de travail) et une grille de décision structurée et pondérée, avec des critères indispensables et souhaitables, en lien direct avec le poste, identique pour tous les candidats.", points: 5 },
      { question: "Quels canaux de diffusion lui conseillez-vous ?", reponseAttendue: "Plusieurs canaux complémentaires : job boards, réseaux sociaux professionnels, espace recruteur de France Travail, cooptation par l'équipe, réseaux locaux ; suivi des candidatures dans un outil ou un tableau, et information des candidats sur le traitement de leurs données.", points: 5 },
      { question: "La question sur les enfants est-elle possible ? Que proposez-vous à la place ?", reponseAttendue: "Non : la situation de famille est un critère protégé (article L1132-1) et la question n'a pas de lien direct et nécessaire avec l'emploi (article L1221-6). À la place : présenter les horaires du poste et demander au candidat s'ils lui conviennent, puis poser des questions comportementales sur ses expériences de relation client.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne (module 6) — calquée sur les épreuves E1, E2 et E3 du certificateur, grille d'acquisition des compétences C1 à C6",
    exercices: [
      {
        titre: "Partie 1 — E1 étude de cas sur un recrutement à effectuer : critères et grille de décision (C1)",
        consigne: "À partir du cas remis par la formatrice (recrutement d'un poste dans une PME fictive), analysez le besoin, rédigez la fiche de poste et construisez la grille de décision structurée et pondérée.",
        reponseAttendue: "Besoin analysé (contexte, finalité, missions) ; fiche de poste complète ; critères en lien direct avec le poste, indispensables et souhaitables, pondérés, avec indicateurs observables. Grille : acquis si la fiche et la grille sont complètes, cohérentes et sans critère discriminatoire ; en cours d'acquisition si un élément manque ; non acquis si un critère discriminatoire subsiste.",
        points: 20,
      },
      {
        titre: "Partie 2 — E1 suite : offre de recrutement et plan de diffusion (C2)",
        consigne: "Rédigez l'offre d'emploi correspondant au cas et présentez votre plan de diffusion : canaux retenus, outils digitaux, suivi des candidatures et indicateurs.",
        reponseAttendue: "Offre claire, engageante, en français, sans limite d'âge ni mention discriminatoire ; canaux variés et justifiés ; outil de suivi des candidatures ; information des candidats sur leurs données ; indicateurs de retombées. Grille : acquis, en cours d'acquisition ou non acquis selon la conformité et l'attractivité de l'offre et la pertinence du plan.",
        points: 20,
      },
      {
        titre: "Partie 3 — E2 mise en situation orale : simulation d'entretien de recrutement (C3)",
        consigne: "En classe virtuelle, conduisez un entretien de recrutement d'environ vingt minutes avec un candidat joué par la formatrice ou un autre stagiaire, à partir de votre guide d'entretien et de votre grille.",
        reponseAttendue: "Accueil chaleureux et déroulé annoncé ; questions comportementales préparées et relances (méthode STAR) ; écoute active et reformulation ; aucune question discriminante ; prise de notes factuelle ; conclusion avec les prochaines étapes. Grille : acquis si l'entretien est structuré, bienveillant et conforme ; en cours d'acquisition si la structure ou les relances sont fragiles ; non acquis en cas de question discriminante.",
        points: 20,
      },
      {
        titre: "Partie 4 — E2 suite : présenter les atouts de l'entreprise et du poste (C4)",
        consigne: "En fin de simulation, présentez les atouts de l'entreprise et du poste, traitez deux objections soulevées par le candidat et annoncez la suite du processus.",
        reponseAttendue: "Atouts concrets et vrais reliés aux motivations du candidat ; objections écoutées, reformulées et traitées avec transparence ; contraintes du poste présentées honnêtement ; délai de réponse annoncé. Grille : acquis, en cours d'acquisition ou non acquis selon la force de conviction, l'honnêteté et l'adaptation au candidat.",
        points: 20,
      },
      {
        titre: "Partie 5 — E3 étude de cas sur l'intégration d'un collaborateur, dont un collaborateur en situation de handicap (C5, C6)",
        consigne: "À partir du cas remis, construisez le parcours d'intégration (pré-boarding, premier jour, premières semaines, bilan de période d'essai) et le plan d'accueil d'une collaboratrice bénéficiaire de la RQTH : aménagements, acteurs mobilisés, sensibilisation de l'équipe et suivi.",
        reponseAttendue: "Parcours daté avec formalités (DPAE, contrat, visite d'information et de prévention), rôle du manager et du tuteur, moments dédiés, rapport d'étonnement et points d'étape ; accueil inclusif : échange sur les besoins avec l'accord de la personne, aménagement raisonnable, médecin du travail, Agefiph, Cap emploi, référent handicap s'il existe, confidentialité, suivi des aménagements. Grille : acquis, en cours d'acquisition ou non acquis selon la complétude du parcours et la pertinence des aménagements.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const REC30_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.francecompetences.fr/recherche/rs/6168/",
      titreLien: "France Compétences — fiche RS6168 « Recruter et intégrer ses collaborateurs (CP-FFP) »",
      titre: "Échéance de l'enregistrement de la fiche RS6168 au 23/11/2025 et remplacement par la fiche RS7332",
      date: "Novembre 2025",
      commentaire: "La fiche RS6168 (certificateur : INEA CONSEIL), enregistrée le 23/11/2022, arrive à échéance le 23/11/2025 : elle devient inactive et est remplacée par la fiche RS7332 « Recruter et intégrer ses collaborateurs ». L'organisme vérifie, pour chaque session, la fiche en vigueur et les conditions de passage des épreuves auprès du certificateur.",
      exploitation: "Preuve : captures datées des deux fiches classées au dossier qualité. Action : information des stagiaires sur la certification visée et sur l'échéance ; contact avec le certificateur sur le calendrier des épreuves ; mise à jour du programme et des supports avant toute nouvelle session.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — Code du travail : non-discrimination et recrutement",
      titre: "Non-discrimination à l'embauche : articles L1132-1, L1221-6 à L1221-9, L5331-2 et L5331-4 du Code du travail",
      date: "Octobre 2025",
      commentaire: "L'article L1132-1 interdit d'écarter un candidat en raison notamment de son origine, de son sexe, de son âge, de sa situation de famille, de sa grossesse, de son état de santé ou de son handicap. Les informations demandées doivent avoir un lien direct et nécessaire avec l'emploi (L1221-6), le candidat est informé des méthodes de recrutement (L1221-8) et aucune information ne peut être collectée par un dispositif qui ne lui a pas été présenté (L1221-9). L'offre ne fixe pas de limite d'âge (L5331-2) et est rédigée en français (L5331-4). Le Défenseur des droits peut être saisi par un candidat.",
      exploitation: "Preuve : chapitres 2 et 3 et QCM 3, 5 et 6 datés. Action : relecture des articles avant chaque session ; vérification des offres et des guides d'entretien des stagiaires pendant les modules 2 et 3.",
    },
    {
      lien: "https://www.cnil.fr/",
      titreLien: "CNIL — données personnelles des candidats",
      titre: "Recrutement et RGPD : information des candidats et durée de conservation",
      date: "Octobre 2025",
      commentaire: "La CNIL rappelle que les candidats doivent être informés du traitement de leurs données, que seules les données nécessaires sont collectées et que les données d'un candidat non retenu sont conservées au maximum 2 ans après le dernier contact, sauf opposition de sa part.",
      exploitation: "Preuve : modèle de courriel de réponse aux candidats et chapitre 4 mis à jour. Action : vérification de la mention d'information dans les offres et les outils de suivi des candidatures des stagiaires.",
    },
    {
      lien: "https://www.agefiph.fr/",
      titreLien: "Agefiph — obligation d'emploi et aides aux employeurs",
      titre: "Obligation d'emploi des travailleurs handicapés, aménagement raisonnable et référent handicap",
      date: "Septembre 2025",
      commentaire: "Les entreprises d'au moins 20 salariés sont soumises à l'obligation d'emploi des travailleurs handicapés à hauteur de 6 % de l'effectif. Tout employeur prend les mesures appropriées pour permettre l'accès à l'emploi et le maintien dans l'emploi d'un travailleur handicapé, sauf charges disproportionnées compte tenu des aides (article L5213-6) ; un référent handicap est obligatoire à partir de 250 salariés. L'Agefiph, Cap emploi et le médecin du travail accompagnent l'employeur.",
      exploitation: "Preuve : chapitre 6 et QCM 10 datés. Action : vérification des aides en vigueur sur le site de l'Agefiph avant chaque session ; check-list d'accueil d'un collaborateur en situation de handicap mise à jour.",
    },
    {
      lien: "https://eur-lex.europa.eu/eli/dir/2023/970/oj",
      titreLien: "EUR-Lex — directive (UE) 2023/970 sur la transparence des rémunérations",
      titre: "Transparence des rémunérations dès le recrutement : directive (UE) 2023/970, transposition attendue au plus tard le 7 juin 2026",
      date: "Novembre 2025",
      commentaire: "La directive (UE) 2023/970 renforce l'égalité de rémunération entre les femmes et les hommes ; elle prévoit notamment l'information des candidats sur la rémunération initiale ou sa fourchette et interdit d'interroger un candidat sur ses rémunérations passées. Elle doit être transposée en droit français au plus tard le 7 juin 2026 : les modalités précises dépendront du texte de transposition, à surveiller.",
      exploitation: "Preuve : encadré de veille du chapitre 2. Action : les stagiaires sont invités à indiquer dès maintenant une rémunération ou une fourchette dans leurs offres ; suivi de la transposition et mise à jour des supports dès la publication du texte français.",
    },
  ],
  metier: [
    {
      lien: "https://www.francetravail.fr/",
      titreLien: "France Travail — espace employeur",
      titre: "Diffuser une offre et être accompagné dans un recrutement",
      date: "Octobre 2025",
      commentaire: "L'espace employeur de France Travail permet de déposer une offre, de rechercher des profils et d'être accompagné dans la présélection ; les fiches métiers aident à préciser les compétences d'un poste. Ces ressources sont utilisées dans les modules 1 et 2.",
      exploitation: "Preuve : liens cités dans les ressources complémentaires et dans le chapitre 2. Action : vérification des services proposés avant chaque session.",
    },
    {
      lien: "https://www.defenseurdesdroits.fr/",
      titreLien: "Défenseur des droits — recruter sans discriminer",
      titre: "Guides et outils pour des recrutements sans discrimination",
      date: "Septembre 2025",
      commentaire: "Le Défenseur des droits publie des repères pour les employeurs : critères objectifs, questions à proscrire, traçabilité des décisions. Ils servent de référence pour les grilles de décision et les guides d'entretien construits en formation.",
      exploitation: "Preuve : grille de décision et guide d'entretien modèles. Action : relecture des repères avant chaque session et mise à jour des modèles.",
    },
    {
      lien: "https://entreprendre.service-public.fr/",
      titreLien: "Entreprendre.service-public.fr — embaucher un salarié",
      titre: "Formalités d'embauche : DPAE, contrat, période d'essai, visite d'information et de prévention",
      date: "Octobre 2025",
      commentaire: "Les fiches officielles présentent les formalités de l'employeur lors d'une embauche : déclaration préalable à l'embauche, contrat de travail, période d'essai et suivi de l'état de santé. Le support y renvoie plutôt que de figer des délais ou des montants qui évoluent.",
      exploitation: "Preuve : chapitre 5 et QCM 9 datés. Action : vérification des fiches avant chaque session.",
    },
  ],
  technologique: [
    {
      lien: "https://www.cnil.fr/",
      titreLien: "CNIL — outils numériques et intelligence artificielle dans le recrutement",
      titre: "Outils de tri automatisé des candidatures : vigilance et information des candidats",
      date: "Novembre 2025",
      commentaire: "Les outils de suivi des candidatures et de tri automatisé se diffusent, y compris dans les petites entreprises. Le règlement européen sur l'intelligence artificielle classe les systèmes d'IA utilisés pour le recrutement parmi les systèmes à haut risque, avec des obligations applicables de manière progressive ; la décision finale reste humaine et les candidats sont informés des outils utilisés.",
      exploitation: "Preuve : encadré du chapitre 2. Action : chaque stagiaire vérifie les outils qu'il utilise et l'information donnée aux candidats.",
    },
    {
      lien: "https://www.francetravail.fr/",
      titreLien: "France Travail — recrutement à distance",
      titre: "Entretiens en visioconférence et intégration à distance",
      date: "Octobre 2025",
      commentaire: "Les entretiens à distance et les outils collaboratifs facilitent les recrutements, mais demandent une préparation : test de l'outil, solution de secours, accessibilité pour les candidats, cadre de confidentialité. Le module 3 entraîne les stagiaires à conduire un entretien en visioconférence.",
      exploitation: "Preuve : check-list d'entretien à distance du chapitre 3. Action : mise à jour de la check-list selon les évolutions des outils de visioconférence.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedREC30AICaches(f: FormationInfo = FORMATION_REC30): void {
  try {
    setCachedContentPack(f, REC30_CONTENT_PACK);
    setCachedEvalPack(f, REC30_EVAL_PACK);
    setCachedVeillePack(f, REC30_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
