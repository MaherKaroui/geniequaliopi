/**
 * Preset complet « Préparation à la Certification en langue française Le Robert (RS7013) »
 * — formation certifiante inscrite au Répertoire spécifique (fiche RS7013, certificateur SEJER,
 * nom commercial « Certification Le Robert », enregistrement du 31/01/2025, échéance 31/01/2030) :
 * 21 h réparties sur 3 jours (3 journées de 7 h), 100 % à distance en classe virtuelle.
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - J1 accueil, positionnement, présentation de l'épreuve ; C1 orthographe lexicale et d'usage,
 *    homophones grammaticaux, dictée de mots, accords ; J2 C1 participe passé, conjugaison et modes,
 *    ponctuation, rédaction et relecture d'écrits professionnels, cas intermédiaire ; J3 C2 vocabulaire,
 *    registres, construction des phrases, compréhension d'enregistrements, examen blanc, évaluation
 *    finale interne, préparation de l'inscription à la certification
 *  - AUCUN stagiaire pré-importé
 *  - Pack contenu : analyse des besoins, 10 mises en situation corrigées (diagnostic de départ puis
 *    C1 et C2) et 2 QCM de 10 questions, un par compétence
 *  - Pack évaluation : QCM de positionnement début / fin, cas intermédiaire, évaluation finale interne
 *    (examen blanc reprenant les 5 types d'exercices de l'épreuve)
 *  - Pack veille (réglementaire / métier / technologique)
 * Seules les données de la fiche RS7013 sont citées pour la certification : la durée de l'épreuve,
 * son prix et ses conditions pratiques de passage sont précisés lors de l'inscription auprès du
 * certificateur. Fil rouge : Société Ardoise & Plume, PME de services FICTIVE (Nantes) ; Inès
 * (assistante de direction), Karim (conseiller commercial) et Mme Delorme (directrice) sont fictifs.
 * Les réponses propres à chaque stagiaire sont dans `robertRS7013Humanized.ts`.
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
export const FORMATION_LRB: FormationInfo = {
  intitule: "Préparation à la Certification en langue française Le Robert (RS7013)",
  codeRNCP: "RS7013",
  objectifs:
    "Formation certifiante préparant à la Certification en langue française Le Robert, enregistrée au Répertoire spécifique sous le code RS7013 (certificateur : SEJER, « Certification Le Robert »), qui mesure le niveau de maîtrise de la langue française en contexte professionnel : respect des règles de la langue, précision de l'expression orale et écrite. Objectif général : fiabiliser son français écrit et oral au travail et le faire attester par la certification.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- C1 — Rédiger des écrits professionnels conformes aux règles de la langue française, dans le but de communiquer efficacement à l'écrit : orthographe lexicale et d'usage (accents, consonnes doubles, h muet, mots invariables, pluriels particuliers, homophones lexicaux), homophones grammaticaux (a/à, et/est, ou/où, ce/se, ses/ces/c'est/s'est, leur/leurs, quel(le)/qu'elle, peu/peut, sans/s'en), accords dans le groupe nominal (adjectifs de couleur, nombres, tout, même, demi) et accord du verbe avec son sujet, accord du participe passé (avec être, avec avoir, verbes pronominaux, participe suivi d'un infinitif, avec en), conjugaison et emploi des modes et des temps (futur et conditionnel, subjonctif, impératif, passé simple, concordance des temps, après que suivi de l'indicatif), ponctuation et typographie, rédaction et relecture des écrits courants : courriel, compte rendu, courrier.\n- C2 — S'exprimer de manière adéquate en contexte professionnel (registre de langue, vocabulaire sélectionné, construction des phrases), dans le but de se faire comprendre et de communiquer efficacement : choix du vocabulaire (paronymes, impropriétés, pléonasmes, anglicismes et équivalents français, expressions figées), construction des phrases (constructions verbales, prépositions, pronoms relatifs, négation, interrogation directe et indirecte, concordance), registres de langue et formules de politesse, compréhension d'un message oral et restitution écrite ou orale.\nLa formation prépare aux 5 types d'exercices de l'épreuve : dictée de mots et d'expressions, phrases à compléter en insérant un mot, phrases à compléter après avoir écouté un enregistrement, questions à choix multiple, phrases à corriger si elles comportent une erreur.",
  prerequis:
    "Prérequis de la certification RS7013 : avoir le français pour langue maternelle ou avoir acquis le niveau A2 du Cadre européen commun de référence pour les langues (CECRL), et ne pas être en situation d'analphabétisme. Formation à distance : disposer d'un ordinateur équipé d'une webcam, d'un micro et d'un casque ou d'écouteurs, d'une connexion internet stable et d'une adresse électronique personnelle. Un entretien préalable et un test de positionnement vérifient l'adéquation du projet avec la formation.",
  duree: "21 heures réparties sur 3 jours (3 journées de 7 h)",
  modalites: "distanciel",
  tarif: "",
  programme:
    "JOUR 1 — ACCUEIL ET POSITIONNEMENT · L'ÉPREUVE LE ROBERT · C1 : ORTHOGRAPHE LEXICALE, HOMOPHONES ET ACCORDS (7 h)\nMatin : accueil en classe virtuelle, présentation des objectifs, du déroulé des trois journées, du règlement intérieur et des modalités d'évaluation, analyse des besoins, test de positionnement (QCM de 10 questions et 10 questions ouvertes). Présentation de la Certification en langue française Le Robert : épreuve en ligne de 350 questions à correction automatique, 5 types d'exercices, score sur 1 000 points, niveaux de score, prérequis, absence de validation partielle. Mise en situation : diagnostic de départ de ses écrits professionnels. C1 : orthographe lexicale et d'usage (accents, consonnes doubles, h muet, mots invariables, pluriels particuliers, homophones lexicaux, rectifications de l'orthographe de 1990), dictée de mots et d'expressions.\nAprès-midi : C1 : homophones grammaticaux et tests de remplacement ; accords dans le groupe nominal (adjectifs de couleur, nombres, tout, même, demi) et accord du verbe avec son sujet dans les cas difficiles. Mises en situation : dictée de mots et d'expressions ; phrases à compléter ; phrases à corriger.\n\nJOUR 2 — C1 : PARTICIPE PASSÉ, CONJUGAISON ET MODES, PONCTUATION · RÉDACTION ET RELECTURE D'ÉCRITS PROFESSIONNELS (7 h)\nMatin : C1 : accord du participe passé avec être et avec avoir, verbes pronominaux, participe passé suivi d'un infinitif, participe passé avec en ; conjugaison et emploi des modes et des temps (futur et conditionnel, subjonctif après « il faut que » et « bien que », impératif, passé simple, concordance des temps, « après que » suivi de l'indicatif). Mises en situation : accorder les participes passés ; conjuguer et choisir le mode.\nAprès-midi : C1 : ponctuation et typographie française (espaces, majuscules, abréviations, nombres et symboles) ; rédaction et relecture d'un courriel, d'un compte rendu et d'un courrier sur le cas fil rouge Ardoise & Plume (entreprise fictive). Mise en situation : relire et corriger un courriel professionnel. Cas pratique intermédiaire.\n\nJOUR 3 — C2 : VOCABULAIRE, REGISTRES ET CONSTRUCTION DES PHRASES · EXAMEN BLANC ET ÉVALUATION FINALE (7 h)\nMatin : C2 : vocabulaire et précision lexicale (paronymes, impropriétés, pléonasmes, anglicismes et équivalents français, expressions figées), construction des phrases (constructions verbales, prépositions, pronoms relatifs, négation, interrogation directe et indirecte), registres de langue et formules de politesse, compréhension d'un message oral et restitution. Mises en situation : choisir le mot juste ; corriger la construction des phrases ; restituer un message oral et adapter son registre.\nAprès-midi : examen blanc reprenant les 5 types d'exercices de l'épreuve (les items « après écoute » sont lus par la formatrice ou le formateur), correction expliquée et évaluation finale interne, plan de révision individuel, préparation de l'inscription à la certification auprès du certificateur, bilan et questionnaire de satisfaction à chaud.",
  methodesEvaluation:
    "Analyse des besoins et test de positionnement à l'entrée (10 questions ouvertes + QCM de 10 questions), mises en situation tout au long de la formation (10 mises en situation corrigées : diagnostic de départ puis C1 et C2), un QCM de 10 questions par compétence (C1 et C2), cas pratique intermédiaire à la fin de la journée 2, test de positionnement de fin (10 questions ouvertes + QCM de 10 questions). Évaluation finale interne lors de la journée 3 : examen blanc reprenant les 5 types d'exercices de l'épreuve (dictée de mots et d'expressions, phrases à compléter en insérant un mot, phrases à compléter après écoute, questions à choix multiple, phrases à corriger), corrigé et commenté. Certification : passage de la Certification en langue française Le Robert (RS7013), épreuve en ligne de 350 questions à correction automatique, score sur 1 000 points ; la certification est délivrée à partir de 450 points, avec un niveau correspondant au score obtenu (450 à 599, 600 à 749, 750 à 899, 900 et plus) ; en dessous de 450 points, elle n'est pas délivrée et une formation complémentaire est conseillée ; pas de validation partielle. La date, la durée et les conditions pratiques de passage sont précisées lors de l'inscription auprès du certificateur. Attestation de fin de formation mentionnant les objectifs, la nature, la durée et les résultats de l'évaluation des acquis. Questionnaires de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Formation 100 % à distance, en classe virtuelle synchrone (Google Meet / Zoom) avec la formatrice ou le formateur : partage d'écran, tableau blanc partagé, documents collaboratifs, sondages et quiz en direct, travail en sous-groupes ; lecture à voix haute des dictées et des enregistrements par la formatrice ou le formateur. Outils de référence présentés et utilisés en séance : dictionnaire de langue (Le Robert en ligne ou version papier), conjugueur, ressources officielles (base FranceTerme du ministère de la Culture, rubrique « Dire, ne pas dire » de l'Académie française). Support de cours numérique remis à chaque stagiaire, cahier d'exercices et corrigés, fiches mémo, examen blanc corrigé ; travail sur le cas fil rouge Société Ardoise & Plume (entreprise fictive) puis sur les écrits professionnels de chaque stagiaire. Émargement numérique par demi-journée et relevé des connexions. Groupe de 8 personnes au plus. Assistance technique et pédagogique par courriel pendant la formation et jusqu'au passage de la certification.",
  publicVise:
    "Salariés, demandeurs d'emploi, agents publics, travailleurs indépendants et toute personne qui écrit dans son travail et veut fiabiliser son français et le faire attester. Niveau A2 du CECRL au minimum ou français langue maternelle. Formation certifiante (Répertoire spécifique RS7013), mobilisable au titre du compte personnel de formation lorsque l'organisme remplit les conditions requises (certification qualité Qualiopi au titre des actions de formation et accord du certificateur pour préparer à la certification).",
  delaiAcces:
    "Selon le financement : compte personnel de formation (Mon Compte Formation) : délai légal de 11 jours ouvrés entre la validation de la demande et l'entrée en formation ; financement par l'employeur : 15 jours après la signature de la convention ; financement personnel : entrée possible à l'expiration du délai de rétractation de 10 jours suivant la signature du contrat de formation professionnelle. Sous réserve de places disponibles.",
  dateDebut: "2026-11-23",
  dateFin: "2026-11-25",
  lieu: "",
  nombreParticipants: "8",
  formateur: "",
};

// ---------------------------------------------------------------------------
// Analyse des besoins (pack contenu)
// ---------------------------------------------------------------------------
const BESOINS_LIST = [
  "Comprendre le fonctionnement de la Certification en langue française Le Robert : épreuve, types d'exercices, barème et niveaux de score.",
  "Éviter les fautes d'orthographe lexicale et d'usage dans ses courriels et ses documents.",
  "Distinguer sans hésiter les homophones grammaticaux (a/à, et/est, ces/ses/c'est/s'est, leur/leurs…).",
  "Maîtriser les accords dans le groupe nominal et l'accord du verbe avec son sujet.",
  "Accorder correctement le participe passé, y compris avec les verbes pronominaux.",
  "Choisir le bon mode et le bon temps : futur ou conditionnel, subjonctif, concordance des temps.",
  "Respecter la ponctuation et la typographie françaises dans les écrits professionnels.",
  "Choisir le mot juste et éviter paronymes, impropriétés, pléonasmes et anglicismes.",
  "Construire des phrases claires et correctes à l'écrit comme à l'oral, dans le registre adapté.",
  "Atteindre le score visé à la certification et disposer d'un plan de révision.",
];

const SYNTHESE_HTML = `
<p>L'analyse des besoins conduite avec chaque stagiaire (entretien préalable, présentation des écrits du poste, test de positionnement) fait apparaître un groupe hétérogène de professionnels qui écrivent chaque jour dans leur travail : assistantes et assistants, conseillers commerciaux, techniciens, agents d'accueil, agents publics, demandeurs d'emploi en reconversion, travailleurs indépendants. La plupart ont le français pour langue maternelle ; quelques-uns l'ont appris plus tard et disposent au minimum du niveau A2 exigé par la certification. Trois besoins sont partagés par la quasi-totalité du groupe.</p>
<ul>
  <li><strong>Fiabiliser l'écrit (C1)</strong> : homophones grammaticaux, accord du participe passé, accords dans le groupe nominal, conjugaison du futur, du conditionnel et du subjonctif, ponctuation et typographie sont les principales sources d'erreurs relevées dans les écrits apportés.</li>
  <li><strong>Gagner en précision et en aisance (C2)</strong> : paronymes, pléonasmes, anglicismes, constructions verbales et registres de langue mal choisis nuisent à la clarté des messages, à l'écrit comme à l'oral.</li>
  <li><strong>Réussir la certification</strong> : l'épreuve, ses 5 types d'exercices et ses niveaux de score sont mal connus ; chacun souhaite connaître son niveau de départ, fixer un score cible réaliste et s'entraîner dans les conditions de l'épreuve.</li>
</ul>
<p>Les stagiaires souhaitent repartir avec des règles claires, des tests de vérification simples, un examen blanc corrigé et un plan de révision individuel jusqu'au passage de la certification.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>Écrits de chaque stagiaire</strong> : les mises en situation sont réalisées sur le cas fil rouge Société Ardoise & Plume (entreprise fictive) puis sur des écrits apportés par chaque stagiaire, anonymisés au préalable.</li>
  <li><strong>Niveaux hétérogènes</strong> : exercices gradués (bases, approfondissement, niveau expert), binômes de relecture, score cible fixé avec chacun selon son niveau de départ et ses besoins professionnels.</li>
  <li><strong>Stagiaires dont le français n'est pas la langue maternelle</strong> : rappel des bases de conjugaison et des constructions verbales, lecture plus lente des dictées et des enregistrements, fiches de vocabulaire professionnel.</li>
  <li><strong>Distanciel</strong> : test technique de connexion avant la première journée, pauses régulières, alternance d'exposés courts et d'exercices, documents déposés à l'avance dans l'espace partagé.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au démarrage, supports remis à l'avance en version numérique, taille d'affichage et lecteur d'écran sur demande, temps majoré pour les exercices ; les aménagements de l'épreuve de certification se demandent auprès du certificateur lors de l'inscription.</li>
</ul>`;

/** 10 mises en situation (diagnostic de départ puis C1 et C2), corrigés formateur. */
export const LRB_EXERCICES: AIContentExercise[] = [
  {
    titre: "Exercice 1 — Diagnostic de départ : mes écrits professionnels et mon score cible",
    consigne:
      "Cas fil rouge : Société Ardoise & Plume, PME de services à Nantes (entreprise fictive). 1. Décrivez les écrits et les situations orales de votre poste (types de documents, destinataires, fréquence) et les difficultés que vous rencontrez en français. 2. Les dix phrases suivantes sont extraites de courriels d'Ardoise & Plume ; certaines peuvent être correctes. Corrigez celles qui comportent une erreur : a. « Je vous ai envoyer le devis hier. » b. « Les documents que vous m'avez demandé sont joints. » c. « Il faut qu'il prend contact avec nous. » d. « Ont vous rappellera demain. » e. « Merci de nous retourner le bon de commande signer. » f. « Quelque soit votre choix, nous nous adapterons. » g. « Malgré qu'il soit absent, il a répondu. » h. « Les factures ci-joint sont à régler avant la fin du mois. » i. « Si j'aurais su, je vous aurais prévenu. » j. « Ils se sont rendu compte de l'erreur. » 3. Rédigez en cinq à huit lignes un courriel à un client pour l'informer d'un retard de livraison. 4. Indiquez le score que vous visez à la Certification Le Robert et le niveau qui lui correspond. 5. Concluez par trois forces, trois points de vigilance et trois priorités pour les trois journées.",
    reponseAttendue:
      "Situation décrite concrètement : courriels, comptes rendus, courriers, devis, notes internes, échanges téléphoniques et réunions ; difficultés reliées à des règles précises.\nCorrections : a. « Je vous ai envoyé le devis hier. » (participe passé après « avoir », test : « je vous ai pris ») ; b. « Les documents que vous m'avez demandés » (COD « que », mis pour « documents », placé avant le verbe) ; c. « Il faut qu'il prenne contact » (subjonctif après « il faut que ») ; d. « On vous rappellera demain. » (pronom « on », test : remplacer par « il ») ; e. « le bon de commande signé » (participe passé employé comme adjectif, test : « le bon de commande rempli ») ; f. « Quel que soit votre choix » (« quel » s'accorde avec le sujet « choix ») ; g. « Bien qu'il soit absent » (« malgré que » est à éviter dans une langue surveillée) ; h. « Les factures ci-jointes » (placé après le nom, « ci-joint » s'accorde) ; i. « Si j'avais su » (pas de conditionnel après « si » exprimant une condition) ; j. phrase correcte : « rendu » reste invariable, car le COD est « compte ».\nCourriel : objet explicite, formule d'appel adaptée, annonce du retard, nouvelle date, excuses, solution proposée, formule de politesse, sans faute.\nScore cible justifié : 450 à 599 (règles les plus courantes), 600 à 749 (rédiger et communiquer par écrit de façon autonome), 750 à 899 (aisance, production et correction fiables de tous documents), 900 et plus (expertise) ; en dessous de 450 points, la certification n'est pas délivrée.\nForces, points de vigilance et priorités tirés des erreurs constatées et reliés aux compétences C1 et C2.\nBarème : situation 3, corrections 8, courriel 4, score cible 2, conclusion 3.",
    points: 20,
  },
  {
    titre: "Exercice 2 — C1 : orthographe lexicale et d'usage, dictée de mots et d'expressions",
    consigne:
      "1. La formatrice ou le formateur dicte quinze mots et expressions du quotidien d'Ardoise & Plume (entreprise fictive) ; écrivez-les. 2. Choisissez la bonne orthographe : a. dilemme ou dilemne ; b. occurrence ou occurence ; c. rémunération ou rénumération ; d. parmi ou parmis ; e. connexion ou connection. 3. Écrivez au pluriel : un travail, un détail, un bijou, un pneu, un journal, un bal. 4. Complétez avec l'homophone qui convient : a. Vous êtes (censé / sensé) connaître la procédure. b. Nous n'avons pas (davantage / d'avantage) de temps. c. Le dossier est (près / prêt) à partir. d. Le projet est en bonne (voie / voix). e. Nous tiendrons (compte / conte) de vos remarques. f. La (cession / session) de formation commence lundi. 5. Énoncez trois règles ou astuces qui vous permettront d'éviter ces erreurs.",
    reponseAttendue:
      "Dictée (texte lu par la formatrice ou le formateur, puis corrigé) : un rendez-vous, des rendez-vous ; un accueil chaleureux ; la correspondance ; un événement (la graphie « évènement », issue des rectifications de l'orthographe de 1990, est également admise) ; un dilemme ; une occurrence ; la rémunération ; un acompte ; ci-joint ; néanmoins ; quelquefois ; aujourd'hui ; d'ores et déjà ; au fur et à mesure ; un intervalle.\nOrthographe : dilemme, occurrence, rémunération (de la famille de « rémunérer »), parmi (toujours sans s), connexion.\nPluriels : des travaux, des détails, des bijoux (comme bijou, caillou, chou, genou, hibou, joujou, pou), des pneus, des journaux, des bals.\nHomophones lexicaux : a. censé (supposé) ; b. davantage (plus) ; c. prêt (préparé) ; d. voie (chemin) ; e. compte (de « compter ») ; f. session (période).\nRègles et astuces : rattacher le mot à sa famille (rémunérer, connecter → connexion), retenir les listes d'exceptions, vérifier dans un dictionnaire en cas de doute, connaître les graphies rectifiées admises.\nBarème : dictée 6, orthographe 3, pluriels 3, homophones lexicaux 4, règles 4.",
    points: 20,
  },
  {
    titre: "Exercice 3 — C1 : homophones grammaticaux",
    consigne:
      "Complétez les phrases suivantes, extraites des écrits d'Ardoise & Plume (entreprise fictive), puis indiquez pour chacune le test de remplacement qui justifie votre choix. 1. Karim … rappelé le client … dix heures. (a / à) 2. Le devis … prêt … il sera envoyé ce soir. (est / et) 3. Indiquez-nous le jour … vous serez disponible : mardi … jeudi. (ou / où) 4. … document … trouve dans le dossier partagé. (ce / se) 5. … dossiers-là sont urgents ; Inès a classé … propres notes ; … le dernier délai ; elle … trompée de destinataire. (ces / ses / c'est / s'est) 6. Nous … avons transmis … rapports annuels. (leur / leurs) 7. … que soit la décision, Mme Delorme pense … sera bien accueillie. (quelle / qu'elle) 8. Le client … attendre jusqu'à demain, mais il nous reste … de temps. (peut / peu) 9. Il ne peut pas … passer : nous ne signerons pas … son accord. (s'en / sans)",
    reponseAttendue:
      "1. Karim a rappelé le client à dix heures (« a » se remplace par « avait » ; « à » est une préposition).\n2. Le devis est prêt et il sera envoyé ce soir (« est » se remplace par « était » ; « et » par « et puis »).\n3. le jour où vous serez disponible : mardi ou jeudi (« ou » se remplace par « ou bien » ; « où » indique le lieu ou le temps).\n4. Ce document se trouve dans le dossier partagé (« ce » se remplace par « cela » ou précède un nom ; « se » est un pronom réfléchi : « je me trouve »).\n5. Ces dossiers-là (démonstratif, renforcé par « -là ») ; ses propres notes (possessif : « les siennes ») ; c'est le dernier délai (« cela est ») ; elle s'est trompée (pronominal : « je me suis trompée »).\n6. Nous leur avons transmis leurs rapports annuels (« leur » pronom devant le verbe, invariable ; « leurs » déterminant pluriel devant un nom pluriel).\n7. Quelle que soit la décision (« quel » accordé avec « décision ») ; pense qu'elle sera bien accueillie (« qu'il » au masculin).\n8. Le client peut attendre (« pouvait ») ; il nous reste peu de temps (« beaucoup »).\n9. Il ne peut pas s'en passer (« je ne peux pas m'en passer ») ; sans son accord (contraire : « avec »).\nBarème : a/à et est/et 4, ou/où et ce/se 4, série ces/ses/c'est/s'est 4, leur/leurs et quelle/qu'elle 4, peut/peu, s'en/sans et tests de remplacement 4.",
    points: 20,
  },
  {
    titre: "Exercice 4 — C1 : accords dans le groupe nominal et accord du verbe avec son sujet",
    consigne:
      "Les phrases suivantes sont extraites de documents d'Ardoise & Plume (entreprise fictive). Certaines sont correctes. Corrigez les autres et justifiez chaque correction par la règle. 1. « Nous proposons des fauteuils marrons et des chaises bleu clair. » 2. « Le devis concerne trois cents vingt classeurs et quatre-vingt-cinq agendas. » 3. « Les équipes, tout entières mobilisées, ont tenu le délai. » 4. « Les clients eux-même s'en plaignent. » 5. « La réunion a duré deux heures et demi. » 6. « La plupart des clients est satisfaite. » 7. « C'est nous qui a préparé le dossier. » 8. « Le personnel des deux agences sont convoqués à la réunion. » 9. « Chacun des collaborateurs ont reçu son badge. » 10. « La facture s'élève à mille deux cents euros. »",
    reponseAttendue:
      "1. « des fauteuils marron et des chaises bleu clair » : un nom employé comme adjectif de couleur (marron, orange, cerise) reste invariable, de même qu'un adjectif de couleur composé (bleu clair).\n2. « trois cent vingt classeurs » : « cent » ne prend pas de s quand il est suivi d'un autre nombre ; « quatre-vingt-cinq » est correct (« vingt » ne prend un s que s'il termine le nombre et qu'il est multiplié). Les rectifications de 1990 admettent le trait d'union entre tous les éléments : « trois-cent-vingt ».\n3. Phrase correcte : « tout », adverbe, reste invariable devant un adjectif féminin commençant par une voyelle (« tout entières ») ; il varie devant un adjectif féminin commençant par une consonne ou un h aspiré (« toutes contentes »).\n4. « eux-mêmes » : « même » placé après un pronom pluriel s'accorde et se lie à lui par un trait d'union.\n5. « deux heures et demie » : placé après le nom, « demi » s'accorde en genre seulement ; placé devant le nom, il est invariable et suivi d'un trait d'union (« une demi-heure »).\n6. « La plupart des clients sont satisfaits » : après « la plupart de », le verbe s'accorde avec le complément.\n7. « C'est nous qui avons préparé » : le verbe s'accorde avec l'antécédent du pronom relatif « qui ».\n8. « Le personnel des deux agences est convoqué » : le verbe s'accorde avec le noyau du sujet, « personnel », au singulier.\n9. « Chacun des collaborateurs a reçu son badge » : « chacun » est singulier.\n10. Phrase correcte : « mille » est invariable ; « cents » prend un s, car il est multiplié et termine le nombre.\nBarème : groupe nominal et couleurs 4, nombres 4, tout, même et demi 6, accord sujet-verbe 6.",
    points: 20,
  },
  {
    titre: "Exercice 5 — C1 : accorder le participe passé",
    consigne:
      "Inès, assistante de direction d'Ardoise & Plume (entreprise fictive), relit le compte rendu de la réunion commerciale. Écrivez le participe passé du verbe entre parenthèses, correctement accordé, et justifiez par la règle. 1. Les offres que nous avons (recevoir) sont intéressantes. 2. Les candidates sont (arriver) à l'heure. 3. Inès a (envoyer) les factures ce matin. 4. Karim et Mme Delorme se sont (téléphoner) hier soir. 5. Les deux commerciales se sont (partager) les dossiers. 6. Les clientes se sont (plaindre) du retard. 7. La comptable que j'ai (entendre) présenter le bilan était convaincante. 8. Les mesures que nous avons (faire) appliquer ont porté leurs fruits. 9. Des réclamations, nous en avons (recevoir) beaucoup cette semaine. 10. Les deux heures que la réunion a (durer) ont paru longues.",
    reponseAttendue:
      "1. reçues : avec « avoir », le participe passé s'accorde avec le COD placé avant le verbe (« que », mis pour « offres »).\n2. arrivées : avec « être », le participe passé s'accorde avec le sujet.\n3. envoyé : le COD « les factures » est placé après le verbe ; pas d'accord.\n4. téléphoné : « se » est complément d'objet indirect (téléphoner à quelqu'un) ; pas d'accord.\n5. partagé : le COD « les dossiers » est placé après le verbe ; « se » est complément indirect (partager entre elles).\n6. plaintes : « se plaindre » est un verbe essentiellement pronominal ; le participe passé s'accorde avec le sujet.\n7. entendue : la comptable fait l'action de présenter ; le COD placé avant est aussi le sujet de l'infinitif, d'où l'accord.\n8. fait : suivi d'un infinitif, « fait » reste toujours invariable ; les rectifications de 1990 étendent cette invariabilité à « laissé ».\n9. reçu : avec le pronom « en », le participe passé reste invariable.\n10. duré : « deux heures » est un complément de mesure et non un COD ; pas d'accord.\nBarème : avec être 3, avec avoir 5, verbes pronominaux 6, suivi d'un infinitif 3, avec en et compléments de mesure 3.",
    points: 20,
  },
  {
    titre: "Exercice 6 — C1 : conjuguer et choisir le mode et le temps",
    consigne:
      "Mme Delorme, directrice d'Ardoise & Plume (entreprise fictive), prépare des courriers. Conjuguez le verbe entre parenthèses et justifiez le mode et le temps choisis. 1. Si vous le souhaitez, nous (pouvoir) vous rappeler demain. 2. Si nous avions reçu le devis, nous l'(signer) aussitôt. 3. Il faut que vous nous (faire) parvenir le dossier avant vendredi. 4. Bien que le délai (être) court, nous tiendrons l'échéance. 5. Nous lancerons la commande après que le client (signer) le devis. 6. Karim affirmait qu'il (envoyer) le devis la veille. 7. Impératif, 2e personne du singulier : (envoyer)-moi le fichier ; (penser)-y. 8. Futur simple : nous (envoyer) le colis lundi ; je (courir) le risque ; vous (acquérir) de l'expérience. 9. Passé simple, 3e personne : le directeur (convaincre) les associés ; ils (venir) à la réunion. 10. Corrigez : « Si j'aurais le temps, je relirais le rapport. »",
    reponseAttendue:
      "1. pourrons : « si » suivi du présent appelle le futur dans la principale.\n2. aurions signé : « si » suivi du plus-que-parfait appelle le conditionnel passé.\n3. fassiez : subjonctif après « il faut que ».\n4. soit : subjonctif après « bien que ».\n5. aura signé : « après que » se construit avec l'indicatif ; le futur antérieur marque l'antériorité par rapport au futur de la principale.\n6. avait envoyé : concordance des temps ; le plus-que-parfait marque l'antériorité dans un récit au passé.\n7. Envoie-moi le fichier (pas de s à l'impératif des verbes en -er) ; penses-y (s ajouté devant « y » et « en » pour la liaison).\n8. enverrons ; courrai ; acquerrez (deux r au futur pour ces trois verbes).\n9. convainquit ; vinrent.\n10. « Si j'avais le temps, je relirais le rapport » : pas de conditionnel après « si » exprimant une condition ; imparfait dans la subordonnée, conditionnel présent dans la principale.\nBarème : futur et conditionnel 5, subjonctif 4, après que et concordance 4, impératif 3, passé simple 4.",
    points: 20,
  },
  {
    titre: "Exercice 7 — C1 : ponctuation, typographie et relecture d'un courriel professionnel",
    consigne:
      "Inès a rédigé ce courriel pour un client d'Ardoise & Plume (entreprise fictive) : « Bonjour Mr Lefèvre, Suite à notre échange de Mardi dernier je vous confirme que votre commande N°2451 sera livrée le Lundi 7 Décembre a 14h30.Le montant total s'élève à 1250€ TTC . Pourriez vous nous confirmer l'adresse de livraison? Nous restons à votre disposition pour tout renseignement complémentaire, Cordialement Inès ». 1. Repérez et corrigez toutes les erreurs (ponctuation, espaces, majuscules, abréviations, nombres, accents, traits d'union, formules). 2. Énoncez les règles de typographie française que vous avez appliquées. 3. Rédigez, en huit à dix lignes, la réponse d'Ardoise & Plume à un client qui se plaint d'un retard de facturation, dans un registre soutenu et sans faute.",
    reponseAttendue:
      "Courriel corrigé : « Bonjour Monsieur Lefèvre, / À la suite de notre échange de mardi dernier, je vous confirme que votre commande n° 2451 sera livrée le lundi 7 décembre à 14 h 30. Le montant total s'élève à 1 250 € TTC. Pourriez-vous nous confirmer l'adresse de livraison ? Nous restons à votre disposition pour tout renseignement complémentaire. / Cordialement, / Inès, assistante de direction, Ardoise & Plume ».\nRègles : « Monsieur » en toutes lettres dans la formule d'appel, abréviation « M. » et non « Mr » ; « à la suite de » préférable à « suite à » ; virgule après le complément placé en tête de phrase ; jours et mois sans majuscule ; « n° » en minuscule suivi d'une espace ; « à » préposition avec accent grave ; heures notées « 14 h 30 » ; espace après le point et aucune espace avant ; nombres séparés par tranches de trois chiffres avec une espace insécable, symbole « € » après le nombre et séparé de lui par une espace ; trait d'union dans l'inversion « Pourriez-vous » ; espace insécable avant le point d'interrogation, le point d'exclamation, les deux-points et le point-virgule ; point final à la phrase et non virgule ; signature complète.\nRéponse rédigée : formule d'appel, accusé de réception de la réclamation, explication factuelle, excuses, mesure corrective et délai, formule de politesse adaptée ; aucune faute.\nBarème : repérage et correction 8, règles 6, réponse rédigée 6.",
    points: 20,
  },
  {
    titre: "Exercice 8 — C2 : choisir le mot juste (paronymes, impropriétés, pléonasmes, anglicismes)",
    consigne:
      "Karim, conseiller commercial d'Ardoise & Plume (entreprise fictive), relit ses messages. 1. Choisissez le paronyme qui convient : a. Le départ du directeur est (éminent / imminent). b. La (conjecture / conjoncture) économique est difficile. c. Nous demandons une (prolongation / prolongement) du délai. d. Il s'agit d'une (infraction / effraction) au règlement. e. Il a (évoqué / invoqué) un cas de force majeure pour justifier son retard. f. Nous attendons l'(acception / acceptation) de votre offre. 2. Corrigez les pléonasmes : monter en haut, prévoir à l'avance, au jour d'aujourd'hui, collaborer ensemble, voire même, comme par exemple. 3. Corrigez les impropriétés : « Nous devons pallier à ce manque. » ; « Je me rappelle de votre demande. » ; « Ce résultat s'avère faux. » ; « Nous avons solutionné le problème. » 4. Remplacez les anglicismes par un équivalent français : e-mail, deadline, meeting, feedback, brainstorming, newsletter, benchmarking. 5. Expliquez comment vous vérifierez à l'avenir le sens et l'usage d'un mot.",
    reponseAttendue:
      "Paronymes : a. imminent (qui va se produire très prochainement ; « éminent » signifie remarquable) ; b. conjoncture (situation d'ensemble ; une conjecture est une supposition) ; c. prolongation (dans le temps ; le prolongement est dans l'espace) ; d. infraction (violation d'une règle ; l'effraction est le bris d'une clôture) ; e. invoqué (faire valoir un argument ; « évoquer » signifie rappeler, mentionner) ; f. acceptation (fait d'accepter ; l'acception est le sens d'un mot).\nPléonasmes : monter ; prévoir ; aujourd'hui ; collaborer ; voire ; comme ou par exemple.\nImpropriétés : « pallier ce manque » (verbe transitif direct) ; « je me rappelle votre demande » ou « je me souviens de votre demande » ; « ce résultat se révèle faux » (« s'avérer » signifie se révéler vrai) ; « nous avons résolu le problème », préférable en langue soignée.\nAnglicismes : courriel ; date limite ou échéance ; réunion ; retour d'information ou avis ; remue-méninges ; lettre d'information ; parangonnage ou étude comparative ; « courriel », « remue-méninges » et « parangonnage » font partie des termes recommandés publiés par la Commission d'enrichissement de la langue française (base FranceTerme).\nVérification : dictionnaire de langue (définition, exemples, constructions), base FranceTerme pour les équivalents des termes anglais, rubrique « Dire, ne pas dire » de l'Académie française.\nBarème : paronymes 6, pléonasmes 3, impropriétés 4, anglicismes 5, vérification 2.",
    points: 20,
  },
  {
    titre: "Exercice 9 — C2 : construire des phrases correctes et claires",
    consigne:
      "Les phrases suivantes ont été relevées dans les échanges d'Ardoise & Plume (entreprise fictive). Corrigez-les et justifiez chaque correction. 1. « Le dossier que je vous ai parlé est prêt. » 2. « C'est de cela dont il s'agit. » 3. « Le projet que nous travaillons dessus avance bien. » 4. « Je me demande qu'est-ce qu'il veut. » 5. « On a pas reçu le colis. » 6. « Quand a-t'il appelé ? » 7. « Nous allons au fournisseur demain matin. » 8. « Le client est intéressé de recevoir notre offre. » 9. Réécrivez dans un registre soutenu la question « Vous avez reçu le devis ? ». 10. Réécrivez en deux ou trois phrases claires : « Suite à la réunion de mardi où Mme Delorme a annoncé que le budget qui avait été prévu pour le salon dont nous avions parlé serait réduit nous devons revoir le stand ce qui implique de rappeler le prestataire avant vendredi. »",
    reponseAttendue:
      "1. « Le dossier dont je vous ai parlé » : on parle de quelque chose ; « dont » remplace un complément introduit par « de ».\n2. « C'est de cela qu'il s'agit » ou « C'est cela dont il s'agit » : « de » et « dont » font double emploi.\n3. « Le projet sur lequel nous travaillons » : on travaille sur quelque chose ; le relatif « lequel » s'emploie après une préposition.\n4. « Je me demande ce qu'il veut » : l'interrogation indirecte n'utilise ni « est-ce que » ni l'inversion ni le point d'interrogation.\n5. « On n'a pas reçu le colis » : la négation écrite est complète (« ne… pas ») ; « n' » s'élide devant une voyelle.\n6. « Quand a-t-il appelé ? » : le t euphonique est encadré de traits d'union, sans apostrophe.\n7. « Nous allons chez le fournisseur » : « chez » devant une personne, « à » devant un lieu.\n8. « Le client est intéressé par notre offre » ou « souhaite recevoir notre offre ».\n9. « Avez-vous reçu le devis ? » (inversion du sujet, registre soutenu) ; « Est-ce que vous avez reçu le devis ? » appartient au registre courant.\n10. Exemple : « À la suite de la réunion de mardi, Mme Delorme a annoncé une réduction du budget prévu pour le salon. Nous devons donc revoir le stand et rappeler le prestataire avant vendredi. »\nBarème : pronoms relatifs 5, interrogation et négation 5, constructions verbales et prépositions 5, phrase réécrite 5.",
    points: 20,
  },
  {
    titre: "Exercice 10 — C2 : comprendre un message oral, le restituer et adapter son registre",
    consigne:
      "La formatrice ou le formateur lit le message laissé sur la messagerie d'Inès (transcription lue, entreprise fictive) : « Bonjour Inès, c'est Mme Delorme. Je vous appelle au sujet de la réunion avec le cabinet Vasseur, qui est avancée à jeudi dix heures au lieu de vendredi. Pouvez-vous prévenir Karim, réserver la salle du premier étage et envoyer l'ordre du jour aux participants avant mercredi midi ? N'oubliez pas de joindre le compte rendu de la dernière réunion. Merci. » 1. Relevez les informations essentielles (qui, quoi, quand, où, actions à mener). 2. Rédigez le message écrit d'Inès à Karim, dans un registre courant professionnel. 3. Transposez dans un registre soutenu : « Ça marche, je m'en occupe. » ; « Vous pouvez me rappeler ? » ; « Y a un souci avec la facture. » ; « Je vous envoie le truc demain. » ; « On s'est planté sur la date. » 4. Choisissez et justifiez la formule de politesse finale d'un courrier adressé à une cliente, puis celle d'un courriel à un partenaire habituel. 5. Restituez oralement le message en une minute (exercice observé).",
    reponseAttendue:
      "Informations : réunion avec le cabinet Vasseur avancée à jeudi 10 h au lieu de vendredi ; actions d'Inès : prévenir Karim, réserver la salle du premier étage, envoyer l'ordre du jour aux participants avant mercredi midi en joignant le compte rendu de la dernière réunion.\nMessage à Karim : « Bonjour Karim, la réunion avec le cabinet Vasseur est avancée à jeudi 10 h, salle du premier étage. L'ordre du jour et le compte rendu de la dernière réunion te seront envoyés avant mercredi midi. Bonne journée, Inès » ; informations complètes, claires et sans faute, tutoiement ou vouvoiement selon l'usage de l'entreprise.\nTranspositions : « C'est entendu, je m'en charge. » ; « Pourriez-vous me rappeler ? » ; « La facture présente une anomalie. » ; « Je vous adresserai le document demain. » ; « Nous nous sommes trompés de date. »\nFormules : courrier à une cliente : « Je vous prie d'agréer, Madame, l'expression de mes salutations distinguées. » (la formule d'appel « Madame » est reprise à l'identique) ; courriel à un partenaire habituel : « Bien cordialement » ou « Cordialement ».\nRestitution orale : message reformulé fidèlement, ordonné, sans omission, débit et registre adaptés.\nBarème : informations 5, message écrit 5, transpositions 5, formules de politesse 3, restitution orale 2.",
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
  ["« Les lettres que j'ai … hier sont parties ce matin. »", ["écrit", "écrite", "écrites", "écrits"], 2],
  ["« Il faut que vous … présent à neuf heures. »", ["êtes", "serez", "soyiez", "soyez"], 3],
  ["Quelle phrase est correcte ?", ["Quelque soit votre choix, nous l'accepterons.", "Quelle que soit votre décision, nous l'accepterons.", "Quelque soient vos choix, nous les accepterons.", "Quel que soit votre décision, nous l'accepterons."], 1],
  ["« … les factures du mois de mars. » (en tête de phrase)", ["Ci-jointes", "Ci-joint", "Ci-joints", "Ci-jointe"], 1],
  ["Quel pluriel est correct ?", ["des travails", "des détaux", "des pneux", "des bijoux"], 3],
  ["« Les deux collègues se sont … les dossiers. »", ["partagées", "partagés", "partagé", "partager"], 2],
  ["« Le rendez-vous est fixé à dix heures et … »", ["demi", "demis", "demie", "demies"], 2],
  ["« Les clients que nous avons appelé ont accepté l'offre. » Que faut-il corriger ?", ["« appelé » doit s'écrire « appelés »", "« ont » doit s'écrire « on »", "« accepté » doit s'écrire « acceptés »", "La phrase est correcte"], 0],
  ["« Si nous … le devis plus tôt, nous l'aurions signé. »", ["aurions reçu", "avions reçu", "aurons reçu", "avons reçu"], 1],
  ["En typographie française, une espace insécable se place :", ["avant le point", "avant la virgule", "avant le point-virgule, les deux-points, le point d'interrogation et le point d'exclamation", "après la parenthèse ouvrante"], 2],
];

const QCM_C2: Q[] = [
  ["« La … économique impose de réduire les coûts. »", ["conjecture", "conjoncture", "jointure", "conjugaison"], 1],
  ["Quelle expression est un pléonasme ?", ["prévoir à l'avance", "prévoir un budget", "avancer la date", "monter l'escalier"], 0],
  ["Quel est l'équivalent français recommandé de « e-mail » (message électronique) ?", ["télémessage", "pourriel", "lettre web", "courriel"], 3],
  ["« Nous devons … ce manque de personnel. »", ["pallier à", "palier", "pallier", "palier à"], 2],
  ["Quelle phrase est correcte ?", ["Le dossier que je vous ai parlé est prêt.", "Le dossier où je vous ai parlé est prêt.", "Le dossier duquel je vous ai parlé de est prêt.", "Le dossier dont je vous ai parlé est prêt."], 3],
  ["Quelle interrogation indirecte est correcte ?", ["Je me demande ce qu'il veut.", "Je me demande qu'est-ce qu'il veut.", "Je me demande qu'il veut quoi.", "Je me demande est-ce qu'il veut."], 0],
  ["Quelle formulation relève du registre soutenu ?", ["Vous pouvez me rappeler ?", "Tu me rappelles ?", "Pourriez-vous me rappeler ?", "Rappelez-moi, quoi."], 2],
  ["Quelle phrase respecte la négation complète de la langue écrite ?", ["On a pas reçu le colis.", "On n'a pas reçu le colis.", "On a reçu pas le colis.", "On a point pas reçu le colis."], 1],
  ["« Il a … un cas de force majeure pour justifier son absence. »", ["évoqué", "provoqué", "convoqué", "invoqué"], 3],
  ["Quelle formule convient à la fin d'un courrier adressé à une cliente ?", ["Bisous.", "À plus.", "Je vous prie d'agréer, Madame, l'expression de mes salutations distinguées.", "Salut."], 2],
];

export const LRB_QCM_COMPETENCES: AIContentExercise[] = [
  qcmExercice("QCM C1 — Rédiger des écrits professionnels conformes aux règles de la langue française", QCM_C1),
  qcmExercice("QCM C2 — S'exprimer de manière adéquate en contexte professionnel", QCM_C2),
];

/**
 * Ordre volontaire : les 10 mises en situation d'abord (diagnostic puis C1 et C2), alignées sur les
 * 10 questions de positionnement et sur les copies de `robertRS7013Humanized.ts` ; les 2 QCM ensuite.
 */
export const LRB_EXERCICES_COMPLETS: AIContentExercise[] = [...LRB_EXERCICES, ...LRB_QCM_COMPETENCES];

const RESSOURCES_SUPPORTS_HTML = `
<ul>
  <li><strong>Support de cours « Préparation à la Certification en langue française Le Robert »</strong> : présentation de l'épreuve et méthode de préparation, compétences C1 (écrits conformes aux règles de la langue) et C2 (expression adaptée au contexte professionnel), entraînement à l'épreuve et examen blanc ; quiz et cas pratiques corrigés pour chaque chapitre ; fil rouge Société Ardoise & Plume (entreprise fictive).</li>
  <li><strong>Cahier d'exercices</strong> : test de positionnement, 10 mises en situation professionnelles (diagnostic de départ puis C1 et C2) ; <strong>corrigés formateur</strong> remis après correction.</li>
  <li><strong>2 QCM de 10 questions</strong>, un par compétence (C1 et C2), corrigés en séance.</li>
  <li><strong>Examen blanc</strong> reprenant les 5 types d'exercices de l'épreuve, avec corrigé expliqué et grille de lecture des niveaux de score.</li>
  <li><strong>Fiches mémo</strong> : homophones grammaticaux et tests de remplacement, accords, participe passé, conjugaison, typographie française, paronymes et pléonasmes, formules de politesse, glossaire grammatical, plan de révision individuel.</li>
</ul>`;

const RESSOURCES_OUTILS_HTML = `
<ul>
  <li><strong>Classe virtuelle</strong> (Google Meet / Zoom) : partage d'écran, tableau blanc, documents collaboratifs, sondages et quiz en direct, salles de sous-groupes.</li>
  <li><strong>Matériel du stagiaire</strong> : ordinateur avec webcam, micro, casque ou écouteurs, connexion internet stable.</li>
  <li><strong>Outils de référence</strong> : dictionnaire de langue (Le Robert en ligne ou version papier), conjugueur, base FranceTerme, rubrique « Dire, ne pas dire » de l'Académie française.</li>
  <li><strong>Traitement de texte</strong> pour la rédaction et la relecture des écrits professionnels ; les correcteurs automatiques et les outils d'intelligence artificielle sont présentés comme des aides à vérifier, jamais comme une référence.</li>
  <li><strong>Jeux de documents fictifs</strong> d'Ardoise & Plume : courriels, comptes rendus, courriers, messages vocaux transcrits.</li>
</ul>`;

const RESSOURCES_COMPL_HTML = `
<ul>
  <li><strong>Certification Le Robert</strong> : <a href="https://certification.lerobert.com">https://certification.lerobert.com</a> — site du certificateur : présentation de la certification et inscription.</li>
  <li><strong>France Compétences — fiche RS7013</strong> : <a href="https://www.francecompetences.fr/recherche/rs/7013/">https://www.francecompetences.fr/recherche/rs/7013/</a> — compétences attestées, modalités d'évaluation, prérequis, dates d'enregistrement.</li>
  <li><strong>Mon Compte Formation</strong> : <a href="https://www.moncompteformation.gouv.fr/">https://www.moncompteformation.gouv.fr/</a> — compte personnel de formation, inscription et financement.</li>
  <li><strong>Ministère de la Culture — FranceTerme</strong> : <a href="https://www.culture.gouv.fr/">https://www.culture.gouv.fr/</a> — termes recommandés par la Commission d'enrichissement de la langue française.</li>
  <li><strong>Académie française</strong> : <a href="https://www.academie-francaise.fr/">https://www.academie-francaise.fr/</a> — rubrique « Dire, ne pas dire », rectifications de l'orthographe.</li>
</ul>`;

/** Recherches YouTube (même principe que les vidéos dynamiques du générateur) et pages officielles. */
export const LRB_VIDEOS = [
  { title: "La Certification Le Robert : présentation", description: "Site du certificateur : présentation de la certification et inscription.", url: "https://certification.lerobert.com" },
  { title: "Fiche France Compétences RS7013", description: "Compétences attestées, modalités d'évaluation, prérequis et dates d'enregistrement.", url: "https://www.francecompetences.fr/recherche/rs/7013/" },
  { title: "Les homophones grammaticaux", description: "Recherche YouTube : a/à, et/est, ces/ses/c'est/s'est et tests de remplacement.", url: "https://www.youtube.com/results?search_query=homophones+grammaticaux+a+%C3%A0+et+est+ces+ses" },
  { title: "L'accord du participe passé", description: "Recherche YouTube : avec être, avec avoir, verbes pronominaux.", url: "https://www.youtube.com/results?search_query=accord+du+participe+pass%C3%A9+avoir+%C3%AAtre+pronominaux" },
  { title: "Futur ou conditionnel ?", description: "Recherche YouTube : choisir entre -rai et -rais.", url: "https://www.youtube.com/results?search_query=futur+ou+conditionnel+rai+rais+orthographe" },
  { title: "Le subjonctif après « il faut que » et « bien que »", description: "Recherche YouTube : emploi du subjonctif.", url: "https://www.youtube.com/results?search_query=emploi+du+subjonctif+il+faut+que+bien+que" },
  { title: "La typographie française", description: "Recherche YouTube : espaces, majuscules, nombres et abréviations.", url: "https://www.youtube.com/results?search_query=typographie+fran%C3%A7aise+espace+ins%C3%A9cable+ponctuation" },
  { title: "Paronymes et pléonasmes", description: "Recherche YouTube : choisir le mot juste au travail.", url: "https://www.youtube.com/results?search_query=paronymes+pl%C3%A9onasmes+fran%C3%A7ais+professionnel" },
  { title: "Rédiger un courriel professionnel", description: "Recherche YouTube : structure, registre et formules de politesse.", url: "https://www.youtube.com/results?search_query=r%C3%A9diger+un+courriel+professionnel+formules+de+politesse" },
  { title: "Mon Compte Formation", description: "Compte personnel de formation : inscription et financement.", url: "https://www.moncompteformation.gouv.fr/" },
];

export const LRB_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS_LIST,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: LRB_EXERCICES_COMPLETS,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: LRB_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM de positionnement début / fin
// ---------------------------------------------------------------------------
export const LRB_QCM_DEBUT: AIQCMQuestion[] = [
  { question: "« Je vous … envoyé le devis hier. »", options: ["est", "ai", "es", "et"], correctIndex: 1 },
  { question: "Quelle orthographe est correcte ?", options: ["un rendez-vous", "un rendevous", "un rendez vous", "un rendé-vous"], correctIndex: 0 },
  { question: "« Il faut qu'il … le dossier avant midi. »", options: ["prend", "prenne", "prendra", "prenait"], correctIndex: 1 },
  { question: "« Les techniciens … partis à huit heures. »", options: ["on", "son", "ont", "sont"], correctIndex: 3 },
  { question: "« Nous … avons répondu hier. »", options: ["leurs", "leur", "leures", "l'heure"], correctIndex: 1 },
  { question: "Quelle formule d'appel convient pour écrire à une cliente ?", options: ["Salut, ça va ?", "Bonjour Madame,", "Coucou !", "Hello,"], correctIndex: 1 },
  { question: "Quelle expression est un pléonasme ?", options: ["monter l'escalier", "descendre au sous-sol", "monter en haut", "entrer dans la salle"], correctIndex: 2 },
  { question: "Le score de la Certification Le Robert est calculé sur :", options: ["100 points", "500 points", "1 000 points", "20 points"], correctIndex: 2 },
  { question: "« Elle s'est … de destinataire. »", options: ["trompé", "trompée", "trompés", "tromper"], correctIndex: 1 },
  { question: "Quel mot est correctement orthographié ?", options: ["occurence", "ocurrence", "occurance", "occurrence"], correctIndex: 3 },
];

export const LRB_QCM_FIN: AIQCMQuestion[] = [
  { question: "« Les décisions qu'ils ont … prendre étaient difficiles. »", options: ["dû", "dus", "dues", "due"], correctIndex: 0 },
  { question: "« Bien que le délai … court, nous tiendrons l'échéance. »", options: ["est", "soit", "sera", "était"], correctIndex: 1 },
  { question: "« Nous lancerons la commande après que le client … le devis. »", options: ["ait signé", "signerait", "signât", "aura signé"], correctIndex: 3 },
  { question: "« Les clientes se sont … du retard. »", options: ["plaint", "plaints", "plaintes", "plainte"], correctIndex: 2 },
  { question: "« … que soient vos contraintes, nous trouverons une solution. »", options: ["Quelque", "Quelles", "Quels", "Quelle"], correctIndex: 1 },
  { question: "Quelle écriture d'une somme respecte la typographie française ?", options: ["1250€", "1 250 €", "1.250 €", "€ 1 250"], correctIndex: 1 },
  { question: "La Certification Le Robert est délivrée à partir de :", options: ["300 points", "600 points", "450 points", "750 points"], correctIndex: 2 },
  { question: "« C'est de cela … il s'agit. »", options: ["dont", "qu'", "que", "duquel"], correctIndex: 1 },
  { question: "Quel est l'équivalent recommandé de « brainstorming » ?", options: ["brainstormage", "tempête cérébrale", "remue-méninges", "cogitation de masse"], correctIndex: 2 },
  { question: "Quelle phrase est correcte ?", options: ["Ils se sont rendus compte de l'erreur.", "Ils s'en sont rendus compte.", "Ils se sont rendus comptes de l'erreur.", "Ils se sont rendu compte de l'erreur."], correctIndex: 3 },
];

export const LRB_EVAL_PACK: AIEvalPack = {
  qcmDebut: LRB_QCM_DEBUT,
  qcmFin: LRB_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (fin de la journée 2) — le compte rendu de réunion d'Ardoise & Plume",
    contexte:
      "Cas fictif. Inès, assistante de direction de la Société Ardoise & Plume (entreprise fictive, Nantes), doit diffuser avant ce soir le compte rendu de la réunion commerciale. Son brouillon contient notamment : « Les objectifs que Mme Delorme a fixé pour le trimestre ont été présenté. Karim a rappeler que les clients se sont plaint des délais. Il faut que l'équipe prend des mesures, ont fera le point Lundi prochain a 9h00. »",
    questions: [
      { question: "Repérez et corrigez les erreurs d'accord du participe passé du brouillon, en justifiant chaque correction.", reponseAttendue: "« Les objectifs que Mme Delorme a fixés » (COD « que », mis pour « objectifs », placé avant le verbe « avoir ») ; « ont été présentés » (avec « être », accord avec le sujet « objectifs ») ; « se sont plaints » (verbe essentiellement pronominal, accord avec le sujet « clients »).", points: 5 },
      { question: "Repérez et corrigez les erreurs de conjugaison, d'homophones et de mode.", reponseAttendue: "« Karim a rappelé » (participe passé après « avoir », test : « a pris ») ; « Il faut que l'équipe prenne des mesures » (subjonctif après « il faut que ») ; « on fera le point » (pronom « on », test : « il fera ») ; « à 9 h » (préposition « à » avec accent grave).", points: 5 },
      { question: "Corrigez la typographie de la dernière phrase et énoncez les règles appliquées.", reponseAttendue: "« On fera le point lundi prochain à 9 h. » : pas de majuscule aux jours de la semaine ; heure notée avec « h » entouré d'espaces, les minutes nulles pouvant être omises ; point final. Dans un compte rendu, on préfère « nous ferons le point » au registre courant « on ».", points: 5 },
      { question: "Réécrivez le passage sous la forme d'un paragraphe de compte rendu clair, au registre professionnel.", reponseAttendue: "Exemple : « Les objectifs fixés par Mme Delorme pour le trimestre ont été présentés. Karim a rappelé que des clients s'étaient plaints des délais. L'équipe doit prendre des mesures ; un point d'étape aura lieu lundi prochain à 9 h. » Phrases courtes, temps cohérents, registre neutre, aucune faute.", points: 5 },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale interne — examen blanc reprenant les 5 types d'exercices de la Certification Le Robert (jour 3)",
    exercices: [
      {
        titre: "Partie 1 — Dictée de mots et d'expressions (C1)",
        consigne: "Écrivez les vingt mots et expressions dictés par la formatrice ou le formateur (vocabulaire professionnel courant, mots invariables, pluriels particuliers, homophones lexicaux).",
        reponseAttendue: "Orthographe exacte de chaque mot ou expression, accents et traits d'union compris ; graphies rectifiées de 1990 acceptées. Critères de la grille : exactitude, régularité, vigilance sur les mots invariables et les consonnes doubles.",
        points: 20,
      },
      {
        titre: "Partie 2 — Phrases à compléter en insérant un mot (C1)",
        consigne: "Complétez vingt phrases professionnelles avec le mot qui convient : homophone grammatical, participe passé accordé, verbe conjugué au mode et au temps attendus.",
        reponseAttendue: "Choix justes et accords exacts : homophones identifiés par le test de remplacement, participes passés accordés selon l'auxiliaire et la place du COD, mode et temps conformes à la construction. Critères de la grille : exactitude, application des règles.",
        points: 20,
      },
      {
        titre: "Partie 3 — Phrases à compléter après écoute d'un enregistrement (C2)",
        consigne: "Écoutez dix courts messages professionnels lus par la formatrice ou le formateur (transcriptions de l'examen blanc), puis complétez les phrases qui en reprennent le contenu.",
        reponseAttendue: "Informations fidèlement restituées (personnes, dates, heures, actions), mots exacts et correctement orthographiés, registre conservé. Critères de la grille : compréhension, précision, orthographe.",
        points: 20,
      },
      {
        titre: "Partie 4 — Questions à choix multiple (C1 et C2)",
        consigne: "Répondez à vingt questions à choix multiple portant sur l'orthographe, la grammaire, le vocabulaire, la construction des phrases et les registres de langue.",
        reponseAttendue: "Bonnes réponses justifiées lors de la correction collective : accords, conjugaison, paronymes, pléonasmes, anglicismes, constructions verbales, formules de politesse. Critères de la grille : exactitude, rapidité de décision.",
        points: 20,
      },
      {
        titre: "Partie 5 — Phrases à corriger, puis QCM de fin (C1 et C2)",
        consigne: "Lisez vingt phrases ; corrigez celles qui comportent une erreur et indiquez « correcte » pour les autres. Répondez ensuite au QCM de fin, puis établissez avec la formatrice ou le formateur votre plan de révision et votre score cible.",
        reponseAttendue: "Erreurs repérées et corrigées sans en créer de nouvelles, phrases correctes reconnues comme telles, plan de révision fondé sur les erreurs de l'examen blanc et score cible cohérent avec les niveaux de la certification (450, 600, 750 et 900 points). Critères de la grille : vigilance, justesse des corrections, réalisme du plan.",
        points: 20,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
export const LRB_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.francecompetences.fr/recherche/rs/7013/",
      titreLien: "France Compétences — fiche RS7013",
      titre: "Certification en langue française Le Robert : enregistrement au Répertoire spécifique jusqu'au 31/01/2030",
      date: "Octobre 2026",
      commentaire: "Relecture de la fiche RS7013 : certificateur SEJER (« Certification Le Robert »), enregistrement par décision du 31/01/2025 pour cinq ans, échéance au 31/01/2030, dernière délivrance possible le 30/07/2030 ; la fiche remplace la RS5800. Compétences attestées, épreuve en ligne de 350 questions, score sur 1 000 points, certification délivrée à partir de 450 points, pas de validation partielle, prérequis (français langue maternelle ou niveau A2 du CECRL, ne pas être en situation d'analphabétisme).",
      exploitation: "Preuve : copie datée de la fiche archivée au dossier qualité. Action : vérification de la fiche formation, du chapitre 1 du support et des niveaux de score cités dans l'examen blanc.",
    },
    {
      lien: "https://www.moncompteformation.gouv.fr/",
      titreLien: "Mon Compte Formation",
      titre: "Compte personnel de formation : inscription et délai de 11 jours ouvrés avant l'entrée en formation",
      date: "Septembre 2026",
      commentaire: "Suivi des règles de la plateforme : l'entrée en formation intervient au plus tôt 11 jours ouvrés après la validation de la demande d'inscription ; participation forfaitaire du titulaire depuis le 2 mai 2024 (décret n° 2024-394 du 29 avril 2024), dont le montant se vérifie sur le site officiel.",
      exploitation: "Preuve : capture datée de la page d'information. Action : mise à jour du délai d'accès de la fiche formation et des informations remises aux stagiaires lors de l'inscription.",
    },
    {
      lien: "https://www.francecompetences.fr/",
      titreLien: "France Compétences",
      titre: "Répertoire spécifique : règles d'enregistrement, de renouvellement et de fin de validité des certifications",
      date: "Juillet 2026",
      commentaire: "Suivi des publications de France Compétences sur le Répertoire spécifique : une certification n'est mobilisable que pendant sa période d'enregistrement ; l'échéance et la date de dernière délivrance de la fiche RS7013 sont reportées dans le calendrier de l'organisme.",
      exploitation: "Preuve : note de veille datée. Action : alerte calendrier fixée avant l'échéance du 31/01/2030 et vérification de la fiche avant chaque nouvelle session.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — décret n° 2026-728 du 1er août 2026",
      titre: "Référentiel national qualité : 33 indicateurs à compter du 1er novembre 2026",
      date: "Août 2026",
      commentaire: "Le décret n° 2026-728 du 1er août 2026 fait évoluer le référentiel national qualité à compter du 1er novembre 2026 : 33 indicateurs au lieu de 32, indicateur 32 complété par une analyse des risques sur la qualité des formations. Pour une formation certifiante, les indicateurs propres aux certifications (information sur la certification, adéquation de la préparation à ses exigences) restent au cœur de l'audit.",
      exploitation: "Preuve : fiche mémo datée archivée au dossier qualité. Action : mise à jour de l'autodiagnostic qualité de l'organisme et du plan d'amélioration.",
    },
    {
      lien: "https://www.economie.gouv.fr/dgccrf",
      titreLien: "DGCCRF",
      titre: "Interdiction du démarchage pour le compte personnel de formation",
      date: "Juin 2026",
      commentaire: "Rappels de l'administration sur l'interdiction du démarchage pour le compte personnel de formation issue de la loi n° 2022-1587 du 19 décembre 2022 et sur les pratiques commerciales trompeuses : aucune promesse de réussite à la certification ni de financement non vérifié.",
      exploitation: "Preuve : note de veille. Action : relecture des supports de communication et de la page de présentation de la formation.",
    },
  ],
  metier: [
    {
      lien: "https://certification.lerobert.com",
      titreLien: "Certification Le Robert",
      titre: "Informations du certificateur sur l'épreuve et l'inscription",
      date: "Octobre 2026",
      commentaire: "Suivi du site du certificateur : présentation de la certification, inscription des candidats, conditions de passage. Les éléments pratiques qui ne figurent pas sur la fiche RS7013 (date, durée, conditions de passage) sont communiqués aux stagiaires tels qu'ils sont précisés lors de l'inscription.",
      exploitation: "Preuve : capture datée. Action : mise à jour de la fiche d'information remise aux stagiaires avant l'inscription.",
    },
    {
      lien: "https://www.culture.gouv.fr/",
      titreLien: "Ministère de la Culture — FranceTerme",
      titre: "Termes recommandés par la Commission d'enrichissement de la langue française",
      date: "Septembre 2026",
      commentaire: "Consultation de la base FranceTerme, qui recense les termes recommandés publiés au Journal officiel pour remplacer des termes étrangers (par exemple courriel, remue-méninges, parangonnage). Les nouvelles listes utiles au vocabulaire professionnel sont intégrées au chapitre sur la précision lexicale.",
      exploitation: "Preuve : extrait daté. Action : mise à jour de la fiche « anglicismes et équivalents français » et de l'exercice 8.",
    },
    {
      lien: "https://www.academie-francaise.fr/",
      titreLien: "Académie française",
      titre: "Rubrique « Dire, ne pas dire » et rectifications de l'orthographe de 1990",
      date: "Août 2026",
      commentaire: "Lecture régulière des avis de l'Académie française sur les usages critiqués (« suite à », « pallier à », « malgré que ») et rappel des rectifications de l'orthographe de 1990 : les graphies rectifiées et les graphies traditionnelles sont admises.",
      exploitation: "Preuve : note de veille datée. Action : mise à jour des corrigés pour signaler les deux graphies admises.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance — loi n° 94-665 du 4 août 1994",
      titre: "Emploi de la langue française dans la vie professionnelle",
      date: "Mai 2026",
      commentaire: "Rappel du cadre de l'emploi de la langue française, notamment la loi n° 94-665 du 4 août 1994 relative à l'emploi de la langue française et l'article L.1321-6 du Code du travail sur la rédaction en français des documents comportant des obligations pour le salarié. Ce cadre explique l'importance d'écrits professionnels fiables.",
      exploitation: "Preuve : extrait archivé. Action : actualisation de l'introduction du chapitre 7 sur la communication professionnelle.",
    },
  ],
  technologique: [
    {
      lien: "https://www.cnil.fr/fr",
      titreLien: "CNIL",
      titre: "Intelligence artificielle, correcteurs en ligne et protection des données personnelles",
      date: "Septembre 2026",
      commentaire: "Recommandations de la CNIL sur l'usage des outils d'intelligence artificielle et des services en ligne : ne pas y saisir de données personnelles de clients ou de collègues, vérifier les conditions d'utilisation et la conservation des textes soumis. Les correcteurs et outils d'IA sont présentés en formation comme des aides dont chaque proposition se vérifie.",
      exploitation: "Preuve : journal de veille. Action : mise à jour de la fiche « bon usage des correcteurs et de l'IA » du support.",
    },
    {
      lien: "https://www.cnil.fr/fr",
      titreLien: "CNIL — RGPD",
      titre: "Classes virtuelles et données des stagiaires",
      date: "Juillet 2026",
      commentaire: "Application du règlement général sur la protection des données aux formations à distance : information des stagiaires, enregistrement des séances seulement avec leur accord, durée de conservation définie, accès limité aux documents déposés.",
      exploitation: "Preuve : note de veille. Action : mise à jour de l'information remise aux stagiaires avant la première classe virtuelle.",
    },
    {
      lien: "https://cyber.gouv.fr/",
      titreLien: "ANSSI — cyber.gouv.fr",
      titre: "Sécurité des outils de visioconférence et des documents partagés",
      date: "Juin 2026",
      commentaire: "Bonnes pratiques de l'agence nationale : liens de réunion non publics, salle d'attente, mises à jour des applications, partage des documents par un espace à accès restreint.",
      exploitation: "Preuve : extrait archivé. Action : mise à jour de la procédure de préparation des classes virtuelles.",
    },
    {
      lien: "https://www.francenum.gouv.fr/",
      titreLien: "France Num",
      titre: "Outils numériques collaboratifs pour la formation à distance",
      date: "Mai 2026",
      commentaire: "Guides publics sur la visioconférence, les documents collaboratifs et les quiz en ligne ; les outils sont présentés sans prix, leurs offres changeant souvent.",
      exploitation: "Preuve : synthèse archivée. Action : actualisation de la liste des outils de la classe virtuelle.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Amorçage des caches (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedLRBAICaches(f: FormationInfo = FORMATION_LRB): void {
  try {
    setCachedContentPack(f, LRB_CONTENT_PACK);
    setCachedEvalPack(f, LRB_EVAL_PACK);
    setCachedVeillePack(f, LRB_VEILLE_PACK);
  } catch {
    /* stockage indisponible : ignoré */
  }
}
