/**
 * Preset complet "CQP Opérateur vitrage" — RNCP36223 (branche des services de l'automobile / ANFA).
 *
 * 100 % pré-rempli, AUCUN appel réseau / edge function IA :
 *  - Organisme (IZIBUSINESS FORMATION)
 *  - Formation 90 h — 13 jours ouvrés du 8 au 24 juin 2026
 *  - 6 stagiaires cohérents (profils vitrage / carrosserie / accueil atelier)
 *  - Pack contenu (besoins humanisés, 10 exercices pratiques corrigés, ressources + 11 vidéos)
 *  - Pack évaluation (QCM début/fin 10 Q, cas pratique intermédiaire 4 Q, 5 MSP finales)
 *  - Pack veille (réglementaire / métier / technologique — liens réels)
 *  - Réponses de positionnement écrites à la main, différentes pour chacun des 6 stagiaires
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import type { AIContentPack } from "./aiContentPack";
import type { AIEvalPack, AIQCMQuestion } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";

// ---------------------------------------------------------------------------
// Organisme
// ---------------------------------------------------------------------------
export const VITRAGE_ORG: OrganismeInfo = {
  nom: "IZIBUSINESS FORMATION",
  siret: "892 035 320 00027",
  adresse: "6 rue d'Armaillé",
  codePostal: "75017",
  ville: "PARIS",
  telephone: "01 84 88 07 42",
  email: "formation@izibusiness.fr",
  siteWeb: "https://www.izibusiness.fr",
  nda: "11 75 65432 75",
  dirigeant: "Nadine DENDANI",
  responsablePedagogique: "Nadine DENDANI",
  referentHandicap: "Nadine DENDANI",
  referentQualite: "Nadine DENDANI",
  poleAdministratif: "Nadine DENDANI",
  relationEntreprises: "Nadine DENDANI",
  referentMobilite: "Nadine DENDANI",
  domainesFormation:
    "Services de l'automobile : remplacement et réparation de vitrage, carrosserie, accueil et relation clientèle atelier (NSF 252r)",
  typesActions: ["actions-formation"],
  certifications: "Qualiopi (Actions de formation), préparation au CQP Opérateur vitrage (RNCP36223 — ANFA / branche des services de l'automobile)",
  outilsUtilises:
    "Plateau technique vitrage (véhicules-écoles, pare-brise d'entraînement, tables de pose), systèmes de dépose à fil, lames oscillantes, ventouses simples et doubles, pistolets à cartouche pneumatiques, kits de réparation d'impact (injecteurs, résines, lampes UV), outil de diagnostic et mires de calibrage ADAS, documentation technique constructeur, plateforme LMS",
  version: "1",
  dateMaj: new Date().toISOString().slice(0, 10),
};

// ---------------------------------------------------------------------------
// Formation
// ---------------------------------------------------------------------------
export const FORMATION_VITRAGE: FormationInfo = {
  intitule: "CQP Opérateur vitrage (RNCP36223) — remplacement et réparation de vitrage automobile",
  codeRNCP: "RNCP36223",
  objectifs:
    "Préparer le CQP Opérateur vitrage (RNCP36223), qualification de la branche des services de l'automobile délivrée par l'ANFA.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- Déposer et reposer un vitrage inamovible collé (pare-brise, lunette arrière) dans le respect de la procédure constructeur et du fabricant de colle.\n- Déposer et reposer un vitrage amovible et remettre en service un mécanisme de lève-vitre.\n- Réaliser le diagnostic de réparabilité d'un impact et exécuter une réparation à la résine.\n- Repérer les équipements d'aide à la conduite (ADAS) et déclencher la procédure de calibrage adaptée.\n- Accueillir le client, recueillir son besoin, annoncer un diagnostic en langage clair et traiter le dossier assurance.\n- Appliquer les règles d'hygiène, de sécurité, de manutention et la filière déchets propres au vitrage.",
  prerequis:
    "Aucun diplôme exigé. Maîtrise du français lu et écrit (lecture d'une fiche technique et d'une fiche de données de sécurité). Aptitude au travail manuel et à la station debout prolongée. Une première expérience en atelier automobile est un plus mais n'est pas obligatoire.",
  duree: "90 heures réparties sur 13 jours ouvrés (7 h/jour, dont 60 % de plateau technique)",
  modalites: "présentiel",
  tarif: "2 400 € net de taxe (éligible CPF, OPCO Mobilités, France Travail ou financement personnel)",
  programme:
    "BLOC 1 — REMPLACEMENT DES VITRAGES (49 h)\nJour 1 : le métier d'opérateur vitrage, le CQP et ses 3 blocs, organisation du poste (5S), hygiène, sécurité, EPI, risque chimique lié aux isocyanates, filière déchets du vitrage feuilleté.\nJour 2 : technologie du vitrage automobile — verre feuilleté et film PVB, verre trempé, marquage et homologation ONU R43, vitrages athermiques, acoustiques, chauffants, identification de la référence à partir du VIN.\nJour 3 : outillage de dépose et produits de collage — systèmes à fil, lames oscillantes, ventouses, nettoyant, activateur, primaire, colle polyuréthane monocomposant, temps de flash-off, temps de sécurité au décollage (SDAT).\nJour 4 : dépose d'un pare-brise collé — protection du véhicule, dépose des périphériques, débranchement des capteurs, découpe et extraction à deux.\nJour 5 : préparation de la baie — ravoir à 1-2 mm, contrôle et traitement de la corrosion, primaire anticorrosion, préparation du vitrage neuf.\nJour 6 : encollage et pose — cordon triangulaire continu, cales, pression, contrôle des jeux, essai d'étanchéité, traçabilité du lot de colle et consignes de restitution.\nJour 7 : vitrages amovibles — glaces latérales, custodes, lunette chauffante, dépose de garniture, mécanismes de lève-vitre, réglages et réinitialisation de l'anti-pincement.\n\nBLOC 2 — RÉPARATION D'UN IMPACT (21 h)\nJour 8 : systèmes d'aide à la conduite (ADAS) — repérage des équipements, calibrage statique et dynamique, procès-verbal de calibrage et responsabilités.\nJour 9 : diagnostic de réparabilité — typologie des dommages, critères cumulatifs, règle du doute, traçabilité photographique.\nJour 10 : cycle complet de réparation à la résine — ouverture du point d'impact, cycles vide/pression, polymérisation UV, finition, arasage, polissage, contrôle qualité.\n\nBLOC 3 — ACCUEIL CLIENTÈLE ET RELATION DE SERVICE (14 h)\nJour 11 : accueil, recueil du besoin, examen contradictoire du véhicule, annonce du diagnostic en langage clair, refus argumenté d'une réparation.\nJour 12 : circuit assurance (garantie bris de glace, franchise, cession de créance), proposition d'une prestation additionnelle par le service rendu, traitement d'une réclamation.\n\nÉVALUATION\nJour 13 : évaluation finale — 5 mises en situation professionnelle couvrant les 3 blocs, entretien technique et bilan individuel.",
  methodesEvaluation:
    "Test de positionnement à l'entrée (10 questions ouvertes + QCM 10 questions), exercices pratiques quotidiens avec corrigé formateur et copie stagiaire, cas pratique intermédiaire au jour 7, test de positionnement de fin (10 questions ouvertes + QCM 10 questions), évaluation finale au jour 13 par 5 mises en situation professionnelle conformes au référentiel d'évaluation du CQP Opérateur vitrage (épreuves de 2 h 30, 1 h 15 et 15 min selon les blocs), devant un jury paritaire de branche. Attestation de fin de formation, questionnaires de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Plateau technique équipé de véhicules-écoles et de pare-brise d'entraînement, tables et bancs de pose, outillage professionnel de dépose (fil, lames oscillantes, ventouses simples et doubles), pistolets à cartouche pneumatiques et électriques, kits de réparation d'impact (supports à ventouses, injecteurs, résines, lampes UV), outil de diagnostic et mires pour la démonstration de calibrage ADAS, EPI fournis à chaque stagiaire, photothèque de 40 impacts réels, fiches techniques et fiches de données de sécurité des colles et primaires, salle équipée (vidéoprojecteur, postes informatiques, documentation technique constructeur).",
  publicVise:
    "Monteurs et poseurs de vitrage en poste souhaitant faire reconnaître leur qualification, carrossiers et mécaniciens en évolution de poste, conseillers clientèle d'atelier vitrage, demandeurs d'emploi en reconversion vers les services de l'automobile.",
  delaiAcces: "Inscription possible jusqu'à 14 jours ouvrés avant le démarrage de la session, sous réserve de places disponibles.",
  dateDebut: "2026-06-08",
  dateFin: "2026-06-24",
  lieu: "IZIBUSINESS FORMATION — plateau technique, 6 rue d'Armaillé, 75017 PARIS",
  nombreParticipants: "6",
  formateur: "NADINE DENDANI",
};

// ---------------------------------------------------------------------------
// Stagiaires (6)
// ---------------------------------------------------------------------------
export const STAGIAIRES_VITRAGE: StagiaireInfo[] = [
  { civilite: "M.", nom: "FERREIRA", prenom: "Antonio", email: "antonio.ferreira.pro@gmail.com", telephone: "07 62 41 09 33", entreprise: "GLASS EXPRESS IDF (vitrage automobile, 24 salariés)", poste: "Poseur de vitrage", dateNaissance: "1996-04-17", adresse: "14 rue Émile Zola", codePostal: "93200", commune: "SAINT-DENIS", dateDebutFormation: "2026-06-08", dateFinFormation: "2026-06-24", tarifFormation: "2400" },
  { civilite: "M.", nom: "TRAORÉ", prenom: "Moussa", email: "moussa.traore94@outlook.fr", telephone: "06 51 78 24 60", entreprise: "", poste: "En reconversion (ex-magasinier)", dateNaissance: "1999-01-29", adresse: "3 allée des Peupliers", codePostal: "94400", commune: "VITRY-SUR-SEINE", dateDebutFormation: "2026-06-08", dateFinFormation: "2026-06-24", tarifFormation: "2400" },
  { civilite: "Mme", nom: "CHAUVIN", prenom: "Sandrine", email: "sandrine.chauvin.atelier@gmail.com", telephone: "07 58 30 12 47", entreprise: "AUTO VITRE SERVICES (réseau vitrage, 38 salariés)", poste: "Conseillère clientèle atelier", dateNaissance: "1986-09-05", adresse: "27 avenue de la République", codePostal: "92300", commune: "LEVALLOIS-PERRET", dateDebutFormation: "2026-06-08", dateFinFormation: "2026-06-24", tarifFormation: "2400" },
  { civilite: "M.", nom: "NGUYEN", prenom: "Kevin", email: "kevin.nguyen.meca@gmail.com", telephone: "06 74 92 15 08", entreprise: "SPEED AUTO 77 (entretien rapide, 12 salariés)", poste: "Mécanicien entretien rapide", dateNaissance: "1997-11-12", adresse: "9 rue des Acacias", codePostal: "77500", commune: "CHELLES", dateDebutFormation: "2026-06-08", dateFinFormation: "2026-06-24", tarifFormation: "2400" },
  { civilite: "M.", nom: "BOUZID", prenom: "Sofiane", email: "sofiane.bouzid.mobile@gmail.com", telephone: "07 81 55 63 21", entreprise: "SB VITRAGE MOBILE (entreprise individuelle)", poste: "Technicien vitrage mobile (11 ans d'expérience)", dateNaissance: "1985-02-23", adresse: "41 boulevard Gallieni", codePostal: "93140", commune: "BONDY", dateDebutFormation: "2026-06-08", dateFinFormation: "2026-06-24", tarifFormation: "2400" },
  { civilite: "Mme", nom: "LEMAIRE", prenom: "Julie", email: "julie.lemaire.carross@gmail.com", telephone: "06 63 27 84 19", entreprise: "CARROSSERIE DU PARC (carrosserie-peinture, 17 salariés)", poste: "Carrossière-peintre", dateNaissance: "1992-07-08", adresse: "6 rue Pasteur", codePostal: "95100", commune: "ARGENTEUIL", dateDebutFormation: "2026-06-08", dateFinFormation: "2026-06-24", tarifFormation: "2400" },
];

// ---------------------------------------------------------------------------
// Pack contenu — besoins, exercices, ressources
// ---------------------------------------------------------------------------
const BESOINS: string[] = [
  "Moi ça fait trois ans que je pose des pare-brise mais j'ai tout appris sur le tas, avec un collègue. Je sais faire, mais si on me demande pourquoi on laisse un ou deux millimètres de cordon, je ne sais pas répondre. J'ai besoin de comprendre ce que je fais, pas juste de le refaire.",
  "Je viens du magasinage, je n'ai jamais touché une voiture professionnellement. J'ai besoin de tout : le vocabulaire, l'outillage, les gestes. Mon objectif c'est d'être embauché comme monteur à la fin.",
  "Je suis à l'accueil de l'atelier. Les clients me demandent si leur impact est réparable et je suis obligée d'aller chercher un technicien à chaque fois. Je veux pouvoir répondre moi-même et expliquer clairement pourquoi on remplace.",
  "Je fais de la mécanique rapide et le patron veut qu'on prenne aussi le vitrage. Je vais vite, c'est mon défaut, et là j'ai compris qu'avec la colle on ne peut pas aller vite. Il faut que j'apprenne à contrôler mon travail.",
  "Ça fait onze ans que je fais du vitrage en intervention mobile, à mon compte. Je veux le CQP parce que les assureurs et les flottes demandent maintenant une qualification pour référencer un intervenant. Et je sais que j'ai deux ou trois habitudes à corriger.",
  "Je suis carrossière, la préparation de surface et l'anticorrosion c'est mon quotidien. Par contre le collage structurel et la réparation d'impact, je n'y connais rien. C'est vraiment ces deux parties que je viens chercher.",
  "Ce qui m'inquiète le plus, c'est les caméras derrière les pare-brise. On en voit de plus en plus et je ne sais pas du tout ce qu'il faut faire après le remplacement.",
  "J'aimerais savoir quoi répondre quand un client me demande à quelle heure il peut repartir. Aujourd'hui je dis une heure ou deux au feeling, et je sens bien que ce n'est pas sérieux.",
  "Je voudrais arrêter d'avoir mal au dos. On porte des pare-brise à deux mais pas toujours, et personne ne m'a jamais montré comment faire correctement.",
  "Moi c'est la partie assurance : franchise, cession de créance, bris de glace. Je ne maîtrise pas et ça met le client mal à l'aise quand je bafouille.",
];

const SYNTHESE_HTML = `
<p>Le groupe est constitué de <strong>6 stagiaires</strong> aux profils volontairement hétérogènes, tous positionnés sur le CQP Opérateur vitrage (RNCP36223) :</p>
<ul>
  <li><strong>2 poseurs en poste</strong> (FERREIRA, BOUZID) : gestes acquis mais fondements techniques non formalisés, aucune traçabilité écrite des interventions.</li>
  <li><strong>1 carrossière</strong> (LEMAIRE) : experte en préparation de surface et anticorrosion, découvre le collage structurel et la réparation d'impact.</li>
  <li><strong>1 mécanicien entretien rapide</strong> (NGUYEN) : rapide, mais auto-contrôle insuffisant sur une opération de sécurité.</li>
  <li><strong>1 conseillère clientèle</strong> (CHAUVIN) : excellente relation client, aucune base technique.</li>
  <li><strong>1 personne en reconversion complète</strong> (TRAORÉ) : débutant intégral, objectif d'insertion en sortie de formation.</li>
</ul>
<p><strong>Synthèse chiffrée du positionnement d'entrée</strong> (10 questions ouvertes notées sur 10) :</p>
<table style="width:100%;border-collapse:collapse;font-size:13px">
  <tr style="background:#eaf1fb"><th style="border:1px solid #ccd;padding:6px;text-align:left">Stagiaire</th><th style="border:1px solid #ccd;padding:6px">Score /10</th><th style="border:1px solid #ccd;padding:6px;text-align:left">Besoin dominant</th></tr>
  <tr><td style="border:1px solid #ccd;padding:6px">M. FERREIRA</td><td style="border:1px solid #ccd;padding:6px;text-align:center">4</td><td style="border:1px solid #ccd;padding:6px">Comprendre le « pourquoi » : collage structurel, SDAT, traçabilité</td></tr>
  <tr style="background:#f6f9ff"><td style="border:1px solid #ccd;padding:6px">M. TRAORÉ</td><td style="border:1px solid #ccd;padding:6px;text-align:center">1,5</td><td style="border:1px solid #ccd;padding:6px">Acquisition intégrale : vocabulaire, outillage, gestes de base</td></tr>
  <tr><td style="border:1px solid #ccd;padding:6px">Mme CHAUVIN</td><td style="border:1px solid #ccd;padding:6px;text-align:center">4</td><td style="border:1px solid #ccd;padding:6px">Socle technique pour argumenter un diagnostic devant le client</td></tr>
  <tr style="background:#f6f9ff"><td style="border:1px solid #ccd;padding:6px">M. NGUYEN</td><td style="border:1px solid #ccd;padding:6px;text-align:center">4</td><td style="border:1px solid #ccd;padding:6px">Méthode, auto-contrôle et respect des temps produits</td></tr>
  <tr><td style="border:1px solid #ccd;padding:6px">M. BOUZID</td><td style="border:1px solid #ccd;padding:6px;text-align:center">8,5</td><td style="border:1px solid #ccd;padding:6px">Formalisation, ADAS et correction de deux habitudes à risque</td></tr>
  <tr style="background:#f6f9ff"><td style="border:1px solid #ccd;padding:6px">Mme LEMAIRE</td><td style="border:1px solid #ccd;padding:6px;text-align:center">5</td><td style="border:1px solid #ccd;padding:6px">Collage structurel et réparation d'impact</td></tr>
</table>
<p><strong>Moyenne du groupe à l'entrée : 4,5/10.</strong> Trois besoins transverses ressortent pour 5 stagiaires sur 6 : le temps de sécurité au décollage (SDAT), le calibrage ADAS et la traçabilité écrite de l'intervention.</p>`;

const ADAPTATIONS_HTML = `
<p><strong>Adaptations pédagogiques décidées à l'issue de l'analyse des besoins :</strong></p>
<ul>
  <li><strong>M. TRAORÉ (débutant intégral)</strong> : tutorat renforcé par le formateur sur les 5 premiers jours, binôme systématique avec M. BOUZID sur le plateau technique, fiches de vocabulaire illustrées remises au jour 1, objectifs intermédiaires fractionnés.</li>
  <li><strong>Mme CHAUVIN (profil non technique)</strong> : temps supplémentaire d'observation avant chaque exercice, dispense partielle sur les gestes de force (manutention systématiquement à deux), valorisation de son expertise sur les jours 11 et 12 où elle intervient comme référente du groupe.</li>
  <li><strong>M. BOUZID (expert)</strong> : parcours accéléré sur les jours 1 à 3, mission de tuteur-pair, approfondissement individualisé sur le calibrage ADAS et la construction d'un dossier de référencement assureur.</li>
  <li><strong>Mme LEMAIRE</strong> : allègement du module préparation de surface (compétence déjà maîtrisée), temps réaffecté à la réparation d'impact (jour 10 prolongé).</li>
  <li><strong>M. NGUYEN</strong> : grille d'auto-contrôle imposée après chaque étape, chronométrage supprimé sur les exercices pour casser le réflexe de vitesse.</li>
  <li><strong>M. FERREIRA</strong> : chaque geste maîtrisé est systématiquement suivi d'une question « pourquoi ? » pour ancrer la justification technique.</li>
  <li><strong>Accessibilité</strong> : référent handicap présenté au jour 1 ; supports disponibles en gros caractères et fortement contrastés ; aucun besoin de compensation déclaré à ce jour, la porte reste ouverte à tout moment de la session.</li>
</ul>`;

export const VITRAGE_EXERCICES = [
  {
    titre: "Jour 4 — Exercice 1 : procédure complète de dépose et repose d'un pare-brise collé",
    consigne:
      "Sur le véhicule-école qui vous est attribué, énoncez puis exécutez la procédure complète de dépose et de repose d'un pare-brise collé. Vous rédigez d'abord la procédure dans l'ordre chronologique, puis vous la mettez en œuvre en binôme. Vous justifiez chaque point de contrôle.",
    reponseAttendue:
      "1. Protection du véhicule : housses de sièges, tapis, bâchage de la planche de bord et des ailes.\n2. Identification du vitrage : relevé du VIN, contrôle de la référence, des options (caméra, capteur de pluie, chauffant, athermique) et de l'état de la pièce neuve avant dépose.\n3. Dépose des périphériques : essuie-glaces repérés, grille d'auvent, baguettes et garnitures, rétroviseur intérieur ; débranchement des connecteurs caméra et capteur de pluie sans traction sur les faisceaux.\n4. Découpe du cordon : méthode fil ou lame oscillante selon l'accès et la nature du cordon ; protection de la peinture et de la planche de bord.\n5. Extraction à deux à la ventouse double, dépose sur chevalet.\n6. Préparation de la baie : ravoir du cordon en laissant 1 à 2 mm réguliers ; contrôle de l'absence de corrosion ; en cas de mise à nu, dégraissage, primaire anticorrosion et respect du temps de séchage.\n7. Préparation du vitrage neuf : nettoyant, activateur puis primaire sur la sérigraphie, respect du temps de flash-off indiqué par la fiche technique.\n8. Encollage : cordon triangulaire continu, d'un seul tenant, de section et de hauteur régulières, jonction propre.\n9. Pose : positionnement sur les cales, pression uniforme répartie, contrôle immédiat des jeux et de l'affleurement.\n10. Remontage des périphériques et reconnexion des capteurs.\n11. Calibrage ADAS si le véhicule en est équipé, selon la procédure constructeur.\n12. Essai d'étanchéité à l'eau, contrôle visuel du cordon apparent.\n13. Traçabilité : report sur l'ordre de réparation de la référence du vitrage, du lot de colle et du temps de sécurité au décollage.\n14. Restitution : information du client sur le SDAT, les précautions (pas de lavage haute pression, entrouvrir une vitre en cas de claquement de porte) et remise du PV de calibrage le cas échéant.",
    points: 20,
  },
  {
    titre: "Jour 6 — Exercice 2 : temps de sécurité au décollage (SDAT) et conditions de mise en œuvre",
    consigne:
      "À partir des trois fiches techniques de colle polyuréthane distribuées et du relevé de température et d'hygrométrie du plateau, déterminez le temps de sécurité au décollage applicable à chaque cas et rédigez la phrase que vous direz au client.",
    reponseAttendue:
      "Le temps de sécurité au décollage (SDAT) est le délai minimal, fixé par le fabricant de la colle et non par l'atelier, avant lequel le véhicule ne doit pas être remis en circulation. Il varie selon le produit, la température ambiante, la température du support et l'hygrométrie : plus il fait froid et sec, plus le temps s'allonge.\nIl est déterminant parce que le pare-brise collé participe à la rigidité de la caisse et sert d'appui à l'airbag passager : avant polymérisation suffisante, la tenue en cas de choc n'est pas assurée.\nMéthode : lire la fiche technique du produit utilisé, relever la température et l'hygrométrie réelles, retenir la valeur correspondante du tableau, l'inscrire sur l'ordre de réparation avec l'heure de fin de pose, et annoncer l'heure de restitution au client dès le devis.\nPhrase type : « Votre véhicule sera disponible à partir de 16 h 30. Avant cette heure, le collage n'a pas atteint sa résistance de sécurité : c'est le fabricant de la colle qui fixe ce délai, il varie selon la température du jour. »\nAucune dérogation n'est possible, même à la demande du client.",
    points: 15,
  },
  {
    titre: "Jour 5 — Exercice 3 : ravoir du cordon et traitement d'une mise à nu",
    consigne:
      "Sur la baie d'entraînement, réalisez le ravoir du cordon existant. Vous provoquerez volontairement une mise à nu de la tôle sur une zone de 3 cm et traiterez le défaut selon la procédure.",
    reponseAttendue:
      "Ravoir : raser l'ancien cordon en laissant un résidu régulier de 1 à 2 mm sur tout le pourtour. Ce résidu est conservé parce qu'il constitue le meilleur support d'accroche pour la colle neuve : la colle polyuréthane adhère mieux sur elle-même que sur la peinture ou la tôle.\nOn ne recherche jamais volontairement la mise à nu. Si le cordon est dur, on change de lame plutôt que d'augmenter la pression.\nEn cas de mise à nu accidentelle : dépoussiérage, dégraissage au nettoyant préconisé, application du primaire anticorrosion sur la zone mise à nu uniquement, puis respect intégral du temps de séchage indiqué sur la fiche technique avant toute application de colle.\nEn présence de corrosion existante : traitement complet avant pose (élimination mécanique, dégraissage, primaire anticorrosion). Coller sur une tôle corrodée conduit à un décollement et à une infiltration à court terme, avec perforation de la tôle.\nContrôle final : cordon résiduel régulier, absence de poussière, absence de trace grasse, absence de corrosion visible.",
    points: 15,
  },
  {
    titre: "Jour 9 — Exercice 4 : critères de réparabilité d'un impact et règle du doute",
    consigne:
      "À partir de la photothèque de 40 impacts réels, classez 10 impacts tirés au sort en « réparable » ou « non réparable ». Pour chacun, citez le ou les critères qui fondent votre décision et rédigez la mention à porter sur l'ordre de réparation.",
    reponseAttendue:
      "Les critères de réparabilité sont cumulatifs : un seul critère d'exclusion impose le remplacement.\n1. Taille du dommage dans les limites admises par la procédure de réparation (impact et branches).\n2. Localisation hors du champ de vision direct du conducteur.\n3. Distance suffisante par rapport au bord du vitrage (zone de collage, contraintes maximales).\n4. Absence de fissure ramifiée ou évolutive partant de l'impact.\n5. Hors zone de la caméra ADAS et des capteurs.\n6. Vitrage feuilleté avec film PVB intact (pas de perforation du film, pas de dommage sur la face interne).\n7. Impact propre, sec, non déjà réparé, pas trop ancien (encrassement empêchant la pénétration de la résine).\nMéthode : nettoyer la zone, mesurer avec un gabarit, observer les deux faces en lumière rasante, photographier avec un repère de taille, puis décider.\nRègle du doute : en cas de doute, on ne répare pas — on remplace. Une réparation qui repart en fissure est plus dommageable pour le client et pour l'atelier qu'un remplacement assumé.\nMention sur l'OR : « Impact Ø x mm, situé à y cm du bord, hors/dans champ de vision — décision : réparation / remplacement — motif : critère n° … — photo n° … jointe au dossier. »",
    points: 15,
  },
  {
    titre: "Jour 10 — Exercice 5 : cycle complet de réparation à la résine",
    consigne:
      "Réalisez trois réparations d'impact sur pare-brise d'entraînement. Vous décrirez le cycle complet et vous justifierez le critère d'arrêt des cycles vide/pression.",
    reponseAttendue:
      "1. Conditions préalables : vitrage sec et à température modérée (ni gelé, ni brûlant, jamais en plein soleil). Séchage de l'impact si nécessaire.\n2. Nettoyage de la zone et ouverture du point d'impact pour créer le passage de la résine.\n3. Mise en place de l'injecteur, parfaitement centré sur le point d'impact, sur son support à ventouses.\n4. Cycles alternés de mise sous vide (extraction de l'air emprisonné dans les branches) et de mise en pression (pénétration de la résine).\n5. Critère d'arrêt : on poursuit les cycles tant qu'il subsiste un effet miroir dans une branche. La disparition complète de l'effet miroir dans toutes les branches est le seul critère objectif d'arrêt.\n6. Polymérisation à la lampe UV.\n7. Résine de finition déposée en goutte sur le point d'impact, recouverte du film, puis nouveau passage UV.\n8. Arasage à la lame maintenue bien à plat, puis polissage.\n9. Contrôle qualité des deux côtés du vitrage en lumière rasante, photographie avant/après.\n10. Information du client : la réparation stoppe l'évolution de la fissure et restaure la résistance, mais une trace résiduelle reste visible ; le résultat esthétique n'est jamais garanti à 100 %.",
    points: 15,
  },
  {
    titre: "Jour 8 — Exercice 6 : conséquences d'un remplacement sur les systèmes d'aide à la conduite",
    consigne:
      "Sur le véhicule équipé d'une caméra frontale, repérez l'ensemble des équipements ADAS, indiquez la procédure de calibrage applicable et rédigez le procès-verbal remis au client.",
    reponseAttendue:
      "Le remplacement du pare-brise modifie la position et l'angle de vue de la caméra frontale : un calibrage est obligatoire après chaque remplacement sur un véhicule équipé.\nDeux procédures selon le constructeur, parfois combinées :\n- Calibrage statique : en atelier, sur une aire plane et calibrée, avec mires positionnées à des distances imposées et outil de diagnostic connecté.\n- Calibrage dynamique : sur route, à vitesse et conditions imposées (marquage au sol lisible, luminosité suffisante), avec la valise de diagnostic.\nConséquences d'une absence de calibrage : freinage d'urgence automatique et maintien dans la voie inopérants ou déclenchés à tort, voyants de défaut, responsabilité de l'atelier engagée en cas de sinistre, refus de prise en charge par l'assureur.\nÉquipements à repérer : caméra frontale, capteur de pluie/luminosité, antenne, vitrage chauffant, zone de sérigraphie dédiée, radar éventuellement associé.\nProcès-verbal de calibrage : identification du véhicule (VIN, immatriculation, km), date et heure, référence du vitrage posé, type de calibrage réalisé (statique / dynamique / les deux), outil et version logicielle utilisés, résultat « calibrage validé », nom et visa du technicien. Un exemplaire est remis au client, un exemplaire est archivé au dossier.",
    points: 15,
  },
  {
    titre: "Jour 7 — Exercice 7 : remise en service d'un lève-vitre après remplacement d'une glace latérale",
    consigne:
      "Déposez la garniture de porte, remplacez la glace latérale et remettez le lève-vitre en service. Vous détaillerez les réglages et la procédure de réinitialisation.",
    reponseAttendue:
      "1. Dépose de la garniture de porte et du pare-vapeur avec précaution (agrafes, connecteurs de commandes).\n2. Aspiration complète des débris de verre dans le caisson de porte et dans les coulisses : un seul éclat rayera la glace neuve dès la première descente.\n3. Mise en place de la glace neuve dans ses pinces, serrage au couple préconisé.\n4. Réglages : parallélisme de la glace dans la coulisse, affleurement par rapport au joint et à la carrosserie, butées de course haute et basse.\n5. Réinitialisation de la fonction anti-pincement selon la procédure constructeur : généralement montée complète maintenue quelques secondes puis descente complète maintenue, ou apprentissage via l'outil de diagnostic.\n6. Repose soignée du pare-vapeur avec son mastic butyle : c'est lui qui assure l'étanchéité de la porte et empêche l'eau d'atteindre l'habitacle.\n7. Repose de la garniture, des commandes et du rétroviseur.\n8. Contrôles finaux : essai des commandes en montée/descente et en mode impulsion, test de l'anti-pincement, absence de bruit d'air, nettoyage de l'habitacle.",
    points: 15,
  },
  {
    titre: "Jour 11 — Exercice 8 : annoncer à un client que son impact n'est pas réparable",
    consigne:
      "Jeu de rôle filmé : un client se présente avec un impact situé à 3 cm du bord du pare-brise. Vous conduisez l'entretien complet, de l'accueil à la prise de rendez-vous.",
    reponseAttendue:
      "1. Accueil et reformulation du besoin : « Vous avez pris un impact sur l'autoroute et vous souhaitez savoir s'il peut être réparé, c'est bien cela ? »\n2. Examen contradictoire, avec le client, devant le véhicule.\n3. Montrer physiquement le dommage et nommer le critère bloquant en langage simple : « Votre impact est à trois centimètres du bord. C'est la zone où le pare-brise est collé à la carrosserie et où il travaille le plus. Une résine ne tiendrait pas et la fissure repartirait. »\n4. Énoncer la conséquence concrète : fissure qui traverse, contre-visite au contrôle technique, risque de refus de l'assureur si l'on répare hors critères.\n5. Proposer immédiatement la solution : remplacement, avec délai, durée d'immobilisation, temps de sécurité au décollage et prix.\n6. Vérifier la couverture : garantie bris de glace, montant de la franchise, possibilité de cession de créance pour éviter l'avance de frais.\n7. Proposer un créneau et confirmer par écrit.\nRègle : jamais de refus sans explication, jamais de jargon non traduit, jamais de décision annoncée sans avoir montré le dommage au client.",
    points: 15,
  },
  {
    titre: "Jour 12 — Exercice 9 : proposer une prestation additionnelle sans forcer la vente",
    consigne:
      "À partir de trois constats réels relevés pendant vos interventions de la semaine, construisez et jouez la proposition d'une prestation additionnelle. Un refus client sera simulé.",
    reponseAttendue:
      "Méthode en cinq temps :\n1. Partir d'un constat réel et vérifiable fait sur le véhicule pendant l'intervention (balais fendus, optiques opacifiées, liquide lave-glace à zéro).\n2. Montrer le constat au client.\n3. Expliquer le bénéfice pour lui, pas l'intérêt de l'atelier : « Sur un pare-brise neuf, un balai usé raye le verre et gêne la nuit sous la pluie ; vous partez avec une visibilité parfaite. »\n4. Annoncer clairement le prix et l'impact sur l'immobilisation (souvent nul).\n5. Laisser choisir, accepter le refus sans insistance et le noter pour le passage suivant.\nAlternatives légitimes selon le constat : remplacement des balais, traitement hydrophobe du pare-brise neuf, appoint de liquide lave-glace, rénovation des optiques de phares.\nCe qui est interdit : proposer une prestation sans constat, présenter une option comme obligatoire, insister après un refus, lier la prestation additionnelle à la prise en charge assurance.",
    points: 15,
  },
  {
    titre: "Jour 1 — Exercice 10 : hygiène, sécurité, manutention et filière déchets au poste vitrage",
    consigne:
      "Réalisez l'analyse des risques de votre poste de travail vitrage, listez les EPI et leur justification, et établissez le circuit des déchets de l'atelier.",
    reponseAttendue:
      "EPI et justification :\n- Gants anti-coupure : manipulation de verre feuilleté et trempé, arêtes vives après casse.\n- Gants nitriles : manipulation des nettoyants, activateurs, primaires et colles polyuréthane (sensibilisants cutanés).\n- Lunettes de protection : projection d'éclats à la découpe et au ravoir.\n- Chaussures de sécurité : chute de vitrage, éclats au sol.\n- Vêtement de travail couvrant, protection auditive si outillage pneumatique.\nRisque chimique : les colles polyuréthane monocomposant contiennent des isocyanates, sensibilisants respiratoires et cutanés. Conséquences : travail en zone ventilée, jamais en espace confiné, lecture de la fiche de données de sécurité avant emploi, interdiction de fumer, hygiène des mains.\nManutention : port du vitrage à deux ou à la ventouse double, dos droit, charge près du corps, trajet dégagé et préparé, chevalet positionné avant la dépose. Prévention des TMS : alternance des postures, réglage de la hauteur des tables.\nOrganisation : poste rangé (méthode 5S), sol dégagé, éclairage suffisant, outillage rangé après usage.\nFilière déchets :\n- Pare-brise feuilleté : filière spécifique de recyclage permettant la séparation du verre et du film PVB — interdiction de la benne à verre ménager.\n- Verre trempé : filière verre technique.\n- Cartouches de colle, primaires, chiffons souillés : déchets dangereux, bac dédié, élimination par un prestataire agréé avec bordereau de suivi des déchets.\n- En intervention mobile : bac de collecte embarqué et retour systématique à l'atelier, aucun déchet laissé chez le client.",
    points: 15,
  },
];

const RESSOURCES_SUPPORTS_HTML = `
<p>• <strong>Support de cours numérique et papier « CQP Opérateur vitrage »</strong> de plus de 30 pages, structuré par bloc de compétences (8 chapitres).<br>
• <strong>Référentiel du CQP Opérateur vitrage</strong> (référentiel d'activités, de compétences et d'évaluation, ANFA).<br>
• <strong>Fiche RNCP36223</strong> imprimée et lien France Compétences remis à chaque stagiaire.<br>
• <strong>Fiches techniques et fiches de données de sécurité (FDS)</strong> des colles polyuréthane, primaires, activateurs, nettoyants et résines utilisés sur le plateau.<br>
• <strong>Photothèque de 40 impacts réels</strong> pour l'entraînement au diagnostic de réparabilité.<br>
• <strong>Grilles d'auto-évaluation par bloc</strong> et trames d'ordre de réparation (OR) avec champs de traçabilité (référence vitrage, lot de colle, SDAT, PV de calibrage).</p>`;

const RESSOURCES_OUTILS_HTML = `
<p>• <strong>Plateau technique</strong> : véhicules-écoles, pare-brise d'entraînement, bancs et tables de pose, chevalets.<br>
• <strong>Outillage de dépose</strong> : systèmes à fil, lames oscillantes, couteaux à cordon, ventouses simples et doubles.<br>
• <strong>Encollage</strong> : pistolets à cartouche pneumatiques et électriques, buses de découpe, cales de positionnement.<br>
• <strong>Réparation d'impact</strong> : kits professionnels (supports à ventouses, injecteurs, résines de viscosités différenciées, résine de finition, lampes UV, lames d'arasage).<br>
• <strong>ADAS</strong> : outil de diagnostic et mires pour la démonstration de calibrage statique.<br>
• <strong>EPI fournis à chaque stagiaire</strong> : gants anti-coupure, gants nitriles, lunettes, chaussures de sécurité.<br>
• <strong>Salle</strong> : vidéoprojecteur, ordinateur, accès à la documentation technique constructeur.</p>`;

const RESSOURCES_COMPL_HTML = `
<p><strong>Ressources complémentaires (sites officiels et professionnels) :</strong></p>
<p>• <a href="https://www.francecompetences.fr/recherche/rncp/36223/" style="color:hsl(220,60%,50%);text-decoration:underline">France Compétences — fiche RNCP36223</a><br>
• <a href="https://www.anfa-auto.fr/rnqsa/operateur-vitrage-confirme" style="color:hsl(220,60%,50%);text-decoration:underline">ANFA — qualification opérateur vitrage (RNQSA)</a><br>
• <a href="https://www.inrs.fr/" style="color:hsl(220,60%,50%);text-decoration:underline">INRS</a> — prévention du risque chimique (isocyanates)<br>
• <a href="https://www.legifrance.gouv.fr/" style="color:hsl(220,60%,50%);text-decoration:underline">Légifrance</a> — Code de la route, vitrages et champ de vision<br>
• <a href="https://www.securite-routiere.gouv.fr/" style="color:hsl(220,60%,50%);text-decoration:underline">Sécurité routière</a><br>
• <a href="https://www.saint-gobain-sekurit.com/" style="color:hsl(220,60%,50%);text-decoration:underline">Saint-Gobain Sekurit</a> — technologies de vitrage automobile<br>
• <a href="https://www.sika.com/" style="color:hsl(220,60%,50%);text-decoration:underline">Sika</a> — systèmes de collage pare-brise<br>
• <a href="https://www.franceparebrise.fr/faq/les-interventions-france-pare-brise/les-systemes-de-calibration-adas-quand-et-comment-les-effectuer" style="color:hsl(220,60%,50%);text-decoration:underline">France Pare-Brise — FAQ calibrage ADAS</a><br>
• <a href="https://www.123parebrise.fr/calibrage-camera-adas/" style="color:hsl(220,60%,50%);text-decoration:underline">123 Pare-Brise — calibrage caméra ADAS</a></p>
<p><strong>Modalités d'accès :</strong> supports numériques remis au premier jour, accès permanent pendant et après la formation ; documentation technique consultable sur le plateau technique ; vidéos accessibles depuis un poste de l'organisme ou l'équipement personnel du stagiaire ; supports adaptables sur demande (police, contraste, version imprimée), référent handicap identifié au jour 1.</p>`;

export const VITRAGE_VIDEOS = [
  { title: "Remplacement d'un pare-brise : démontage et pose", url: "https://www.youtube.com/watch?v=aBJSWh6WRBQ", description: "Enchaînement complet dépose puis pose. Support des jours 4 et 5." },
  { title: "VBSA — Processus de collage pare-brise", url: "https://www.youtube.com/watch?v=6xHrxiYqzRg", description: "Préparation, primaire, encollage, pose. Support du jour 5." },
  { title: "Tutoriel : comment démonter un pare-brise collé", url: "https://www.youtube.com/watch?v=QO7zJS3xOKg", description: "Technique de dépose d'un vitrage collé. Support du jour 4." },
  { title: "Tutoriel SmartCut — changer un pare-brise", url: "https://www.youtube.com/watch?v=B7DqlKWVtH4", description: "Mallette d'outillage complète pour une dépose rapide. Support du jour 3 (outillage)." },
  { title: "Dépose et pose de pare-brise par un seul opérateur (Fixoglass VL)", url: "https://www.youtube.com/watch?v=x7stHvdAJkg", description: "Intervention en autonomie. Support du jour 4, utile pour l'intervention mobile." },
  { title: "Comment démonter un pare-brise collé", url: "https://www.youtube.com/watch?v=D7-ZfpVmtCk", description: "Variante de méthode de découpe. Support du jour 4." },
  { title: "Remplacement du pare-brise : la technique en 20 minutes", url: "https://www.youtube.com/watch?v=LyT-Oo2RAMs", description: "Dépose à l'aide d'un câble. Support du jour 4." },
  { title: "Réparer un impact sur pare-brise avec de la résine", url: "https://www.youtube.com/watch?v=pTRSC_uEwhc", description: "Cycle complet de réparation. Support du jour 10." },
  { title: "Comment réparer un impact de pare-brise", url: "https://www.youtube.com/watch?v=jDfO95N2QyM", description: "Deuxième démonstration du cycle vide / injection / UV. Support du jour 10." },
  { title: "Kit de réparation pare-brise : mise en œuvre", url: "https://www.youtube.com/watch?v=nTF7AClpPAk", description: "Comparaison kit grand public / matériel professionnel. Support du jour 10." },
  { title: "Playlist — Vidéos techniques pose et dépose de pare-brise", url: "https://www.youtube.com/playlist?list=PLGUfGqEvX3U6FHIQpe_YVCmKXxN4sk2UI", description: "Collection mise à disposition des stagiaires pour révision." },
];

export const VITRAGE_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: BESOINS,
    syntheseHtml: SYNTHESE_HTML,
    adaptationsHtml: ADAPTATIONS_HTML,
  },
  chapters: [],
  exercises: VITRAGE_EXERCICES,
  ressources: {
    supportsHtml: RESSOURCES_SUPPORTS_HTML,
    outilsHtml: RESSOURCES_OUTILS_HTML,
    ressourcesComplHtml: RESSOURCES_COMPL_HTML,
    videos: VITRAGE_VIDEOS,
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation — QCM début / fin, cas intermédiaire, évaluation finale
// ---------------------------------------------------------------------------
const q = (question: string, options: string[], correctIndex: number): AIQCMQuestion => ({ question, options, correctIndex });

export const VITRAGE_QCM_DEBUT: AIQCMQuestion[] = [
  q("Un pare-brise automobile est constitué de :", ["Verre trempé", "Verre feuilleté (deux feuilles de verre et un film PVB)", "Polycarbonate", "Verre armé"], 1),
  q("Le temps de sécurité au décollage (SDAT) est fixé par :", ["L'atelier", "Le fabricant de la colle", "Le client", "L'assureur"], 1),
  q("Lors du ravoir, on laisse un cordon résiduel de :", ["0 mm (tôle nue)", "1 à 2 mm", "5 à 6 mm", "1 cm"], 1),
  q("Le pare-brise collé sert notamment :", ["Uniquement à protéger du vent", "D'appui à l'airbag passager et à la rigidité de la caisse", "À isoler le moteur", "De support d'antenne uniquement"], 1),
  q("Après remplacement d'un pare-brise équipé d'une caméra, il faut :", ["Ne rien faire", "Effacer les défauts", "Réaliser un calibrage selon la procédure constructeur", "Débrancher la caméra"], 2),
  q("Les colles polyuréthane monocomposant contiennent :", ["Des isocyanates", "De l'eau de javel", "De l'acétone pure", "Du plomb"], 0),
  q("Un impact situé dans le champ de vision direct du conducteur est :", ["Toujours réparable", "Non réparable : remplacement", "Réparable si petit", "Réparable après accord verbal"], 1),
  q("La référence exacte d'un vitrage se détermine à partir :", ["De la couleur du véhicule", "Du VIN et des options du véhicule", "De l'année seule", "Du nom du client"], 1),
  q("Le film PVB d'un pare-brise sert à :", ["Teinter le verre", "Retenir les morceaux de verre en cas de casse", "Chauffer le vitrage", "Coller le pare-brise"], 1),
  q("Un pare-brise usagé doit être éliminé :", ["Dans la benne à verre ménager", "Dans une filière spécifique séparant verre et PVB", "Avec les déchets banals", "Chez le client"], 1),
];

export const VITRAGE_QCM_FIN: AIQCMQuestion[] = [
  q("Le temps de flash-off correspond :", ["Au temps de séchage du primaire ou de l'activateur avant encollage", "Au temps de roulage après pose", "Au temps de découpe", "Au temps de polissage"], 0),
  q("En cas de mise à nu de la tôle lors du ravoir, il faut :", ["Coller directement", "Dégraisser, appliquer un primaire anticorrosion et respecter le temps de séchage", "Poncer et peindre", "Ajouter du mastic"], 1),
  q("Le cordon de colle doit être :", ["Discontinu pour laisser respirer", "Triangulaire, continu et d'un seul tenant", "Plat et large", "Déposé sur la tôle uniquement"], 1),
  q("Le calibrage dynamique se réalise :", ["En atelier avec des mires", "Sur route à vitesse imposée avec l'outil de diagnostic", "Sans outil", "Par le client"], 1),
  q("Le critère d'arrêt des cycles vide/pression en réparation d'impact est :", ["Cinq minutes de travail", "La disparition de l'effet miroir dans toutes les branches", "Le nombre de cycles réalisés", "Le durcissement de la résine"], 1),
  q("Les critères de réparabilité d'un impact sont :", ["Alternatifs (un seul suffit pour réparer)", "Cumulatifs (un seul critère d'exclusion impose le remplacement)", "Indicatifs", "Laissés à l'appréciation du client"], 1),
  q("Après remplacement d'une glace latérale, l'anti-pincement doit être :", ["Désactivé", "Réinitialisé selon la procédure constructeur", "Ignoré", "Remplacé"], 1),
  q("Le pare-vapeur de porte assure :", ["L'isolation phonique du moteur", "L'étanchéité de la porte et la protection de l'habitacle contre l'eau", "Le maintien de la glace", "La fixation du haut-parleur"], 1),
  q("La cession de créance permet au client :", ["De ne pas payer la franchise", "De ne pas avancer les frais pris en charge par l'assureur", "D'annuler la franchise", "De doubler la garantie"], 1),
  q("Les chiffons souillés de primaire et les cartouches de colle sont :", ["Des déchets banals", "Des déchets dangereux éliminés via un prestataire agréé avec bordereau", "Recyclables avec le verre", "À brûler sur place"], 1),
];

export const VITRAGE_EVAL_PACK: AIEvalPack = {
  qcmDebut: VITRAGE_QCM_DEBUT,
  qcmFin: VITRAGE_QCM_FIN,
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire (jour 7) — Prise en charge complète d'un véhicule vitrage",
    contexte:
      "Le 16 juin 2026 à 8 h 30, un client se présente à l'atelier avec une Peugeot 3008 de 2022 (mise en circulation 03/2022, 68 000 km). Le pare-brise présente une fissure de 25 cm partant du bord inférieur droit. Le véhicule est équipé d'une caméra frontale (aide au maintien dans la voie et freinage d'urgence), d'un capteur de pluie et d'un pare-brise athermique. Le client est assuré tous risques avec une garantie bris de glace et une franchise de 90 €. Il doit récupérer son véhicule dans la journée. La température de l'atelier est de 19 °C, l'hygrométrie de 55 %.",
    questions: [
      {
        question: "Décrivez la prise en charge du véhicule à l'accueil, jusqu'à l'ouverture de l'ordre de réparation.",
        reponseAttendue:
          "1. Accueil, reformulation du besoin et recueil des informations : circonstances, date du sinistre, contrat d'assurance, numéro de sinistre éventuel.\n2. Examen contradictoire du véhicule avec le client : relevé de l'état général, des dommages préexistants, du kilométrage, photographies datées.\n3. Constat technique : fissure de 25 cm partant du bord — non réparable (longueur et départ en bord de vitrage, zone de collage). Décision : remplacement, expliquée et montrée au client.\n4. Identification de la pièce : relevé du VIN, contrôle des options (caméra, capteur de pluie, athermique) et commande/validation de la disponibilité de la référence exacte.\n5. Annonce des conditions : durée d'immobilisation, calibrage ADAS obligatoire, temps de sécurité au décollage, heure de restitution réaliste.\n6. Volet assurance : vérification de la garantie bris de glace, annonce de la franchise de 90 €, proposition de cession de créance pour éviter l'avance de frais, recueil des pièces (carte grise, attestation, permis).\n7. Ouverture de l'OR : identification du véhicule et du client, référence du vitrage, prestations (remplacement + calibrage), montants, mention de la franchise, signature du client sur l'ordre de réparation et sur l'autorisation d'intervention.",
        points: 5,
      },
      {
        question: "Détaillez le déroulement technique de l'intervention et les points de contrôle associés.",
        reponseAttendue:
          "Protection du véhicule (sièges, tapis, planche de bord, ailes). Dépose des essuie-glaces repérés, de la grille d'auvent, des garnitures, du rétroviseur ; débranchement soigné de la caméra et du capteur de pluie.\nDécoupe du cordon (fil ou lame oscillante), extraction à deux à la ventouse double, dépose sur chevalet.\nRavoir à 1 à 2 mm réguliers, contrôle de l'absence de corrosion ; en cas de mise à nu : dégraissage, primaire anticorrosion et respect du temps de séchage.\nPréparation du vitrage neuf : contrôle de la référence et de l'intégrité, nettoyage, activateur puis primaire sur la sérigraphie, respect du temps de flash-off.\nEncollage en cordon triangulaire continu d'un seul tenant ; pose sur cales avec pression uniforme ; contrôle immédiat des jeux et de l'affleurement.\nRemontage des périphériques, reconnexion des capteurs.\nCalibrage de la caméra selon la procédure constructeur (statique et/ou dynamique) et édition du procès-verbal.\nEssai d'étanchéité à l'eau, contrôle visuel du cordon, nettoyage complet de l'habitacle et des vitrages.\nPoints de contrôle : référence conforme, cordon continu et régulier, jeux homogènes, absence de corrosion, absence de fuite, calibrage validé, propreté du véhicule.",
        points: 5,
      },
      {
        question: "À 19 °C et 55 % d'hygrométrie, quel délai annoncez-vous au client et comment le formulez-vous ? Que notez-vous sur l'ordre de réparation ?",
        reponseAttendue:
          "Le temps de sécurité au décollage est lu sur la fiche technique de la colle utilisée, à la ligne correspondant à 19 °C / 55 % (conditions favorables : valeur courte, souvent de l'ordre d'une à deux heures selon le produit). L'atelier ne fixe jamais cette valeur lui-même et ne la raccourcit jamais.\nFormulation client : « Nous posons votre pare-brise ce matin. Le fabricant de la colle impose un délai de sécurité avant de reprendre la route : compte tenu de la température de l'atelier aujourd'hui, votre véhicule sera disponible à partir de [heure de fin de pose + SDAT]. Avant cette heure, le collage n'a pas atteint sa résistance : le pare-brise participe à la tenue de la caisse et sert d'appui à l'airbag passager. Le calibrage de la caméra sera réalisé et je vous remettrai le procès-verbal. »\nMentions sur l'OR : référence du vitrage posé, numéro de lot et date de péremption de la cartouche de colle, conditions de température et d'hygrométrie, heure de fin de pose, SDAT applicable et heure de restitution, calibrage réalisé avec numéro de PV, consignes remises au client (pas de lavage haute pression pendant 48 h, entrouvrir une vitre à la fermeture des portes, ne pas retirer les adhésifs de maintien avant 24 h).",
        points: 5,
      },
      {
        question: "Le client vous demande, en fin de journée, pourquoi il doit payer 90 € alors qu'il est « assuré tous risques ». Comment répondez-vous ? Quelle prestation additionnelle pouvez-vous légitimement proposer ?",
        reponseAttendue:
          "Réponse assurance : la garantie bris de glace couvre le remplacement du vitrage, mais le contrat prévoit une franchise de 90 € qui reste à la charge de l'assuré ; c'est la part non indemnisée, prévue au contrat et indépendante de l'atelier. La cession de créance permet au client de ne régler que cette franchise, l'atelier se faisant payer directement par l'assureur pour le reste. On montre la ligne du contrat, on reste factuel et on ne critique pas l'assureur.\nPrestation additionnelle : à partir d'un constat réel effectué pendant l'intervention. Les balais d'essuie-glace du véhicule sont fendus. « J'ai vu en démontant que vos balais sont fendus. Sur un pare-brise neuf, un balai usé raye le verre et gêne la nuit sous la pluie. Le jeu est à 32 €, posé, sans immobilisation supplémentaire. Je vous laisse voir, ce n'est pas obligatoire. » En cas de refus : acceptation immédiate, note sur le dossier pour le passage suivant, aucune insistance.\nAutres propositions possibles selon constat : traitement hydrophobe du pare-brise neuf, appoint de liquide lave-glace, rénovation des optiques de phares si opacifiées.",
        points: 5,
      },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale — 5 mises en situation professionnelle (référentiel d'évaluation CQP Opérateur vitrage RNCP36223)",
    exercices: [
      {
        titre: "MSP 1 (BC01) — Dépose et repose d'un pare-brise collé sur véhicule équipé ADAS",
        consigne:
          "Durée 2 h 30. Sur le véhicule qui vous est attribué, réalisez la dépose et la repose complètes du pare-brise, déclenchez la procédure de calibrage et renseignez l'ordre de réparation. Vous travaillez en binôme pour la manutention uniquement.",
        reponseAttendue:
          "Attendus : protection du véhicule complète ; identification de la référence par le VIN ; dépose des périphériques sans dégradation et débranchement soigné des capteurs ; découpe maîtrisée sans atteinte de la tôle ni de la planche de bord ; extraction à deux à la ventouse ; ravoir régulier de 1 à 2 mm ; traitement anticorrosion si mise à nu avec respect du temps de séchage ; préparation du vitrage neuf (nettoyant, activateur, primaire, flash-off) ; cordon triangulaire continu d'un seul tenant ; pose sur cales, pression uniforme, jeux conformes ; remontage complet ; calibrage engagé selon la procédure constructeur et PV édité ; essai d'étanchéité ; OR renseigné (référence, lot de colle, SDAT, calibrage) ; poste rangé et EPI portés pendant toute l'épreuve.",
        points: 20,
      },
      {
        titre: "MSP 2 (BC01) — Remplacement d'une glace latérale et remise en service du lève-vitre",
        consigne:
          "Durée 1 h 15. Remplacez la glace latérale avant droite, remettez le mécanisme en service et effectuez les réglages et contrôles.",
        reponseAttendue:
          "Attendus : dépose de la garniture et du pare-vapeur sans casse d'agrafes ; aspiration complète des débris dans le caisson et les coulisses ; mise en place de la glace dans les pinces et serrage au couple ; réglages du parallélisme, de l'affleurement et des butées de course ; réinitialisation de l'anti-pincement selon la procédure constructeur ; repose du pare-vapeur avec son mastic butyle assurant l'étanchéité ; repose de la garniture et des commandes ; essai complet montée/descente et impulsion ; absence de bruit d'air ; habitacle nettoyé.",
        points: 20,
      },
      {
        titre: "MSP 3 (BC02) — Diagnostic de réparabilité et décision argumentée",
        consigne:
          "Durée 15 min. Trois vitrages endommagés vous sont présentés. Pour chacun, vous réalisez le diagnostic, vous décidez réparation ou remplacement et vous justifiez votre décision devant l'évaluateur.",
        reponseAttendue:
          "Attendus : nettoyage préalable de la zone ; mesure au gabarit ; observation des deux faces en lumière rasante ; contrôle des sept critères cumulatifs (taille, champ de vision du conducteur, distance au bord, absence de fissure ramifiée, zone caméra, intégrité du film PVB, propreté et ancienneté de l'impact) ; application de la règle du doute (dans le doute, remplacement) ; photographie avec repère de taille ; décision énoncée clairement et motivée par le critère bloquant ; mention portée sur l'ordre de réparation.",
        points: 15,
      },
      {
        titre: "MSP 4 (BC02) — Réparation d'un impact à la résine",
        consigne:
          "Durée 1 h 15. Réalisez la réparation complète d'un impact réparable sur pare-brise d'entraînement, jusqu'au contrôle qualité et à la traçabilité photographique.",
        reponseAttendue:
          "Attendus : vérification des conditions (vitrage sec, à température, hors plein soleil) ; nettoyage et ouverture du point d'impact ; injecteur parfaitement centré sur son support à ventouses ; cycles alternés vide/pression poursuivis jusqu'à disparition de l'effet miroir dans toutes les branches ; polymérisation UV ; résine de finition sous film puis nouveau passage UV ; arasage à la lame à plat sans rayer le verre ; polissage ; contrôle des deux faces en lumière rasante ; photographies avant/après ; information du client sur le résultat esthétique non garanti à 100 % et sur l'arrêt de l'évolution de la fissure ; EPI et gestion des déchets conformes.",
        points: 20,
      },
      {
        titre: "MSP 5 (BC03) — Accueil client, annonce d'un diagnostic et traitement du dossier assurance",
        consigne:
          "Durée 15 min. Jeu de rôle avec un évaluateur jouant le client : impact non réparable situé à 3 cm du bord, client assuré tous risques, franchise de 90 €, pressé et mécontent.",
        reponseAttendue:
          "Attendus : accueil courtois, écoute et reformulation du besoin ; examen contradictoire réalisé devant le client ; dommage physiquement montré ; critère bloquant nommé en langage simple et conséquence expliquée ; solution de remplacement proposée immédiatement avec délai, durée d'immobilisation, SDAT et prix ; vérification de la garantie bris de glace, annonce claire de la franchise et proposition de cession de créance ; gestion du mécontentement sans agressivité ni promesse intenable ; proposition d'un créneau et confirmation écrite ; éventuelle prestation additionnelle proposée à partir d'un constat réel, sans insistance et avec acceptation du refus.",
        points: 15,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille (liens réels)
// ---------------------------------------------------------------------------
export const VITRAGE_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    {
      lien: "https://www.francecompetences.fr/recherche/rncp/36223/",
      titreLien: "France Compétences — RNCP36223",
      titre: "Fiche du CQP Opérateur vitrage : blocs de compétences et modalités d'évaluation",
      date: "Mars 2026",
      commentaire: "Vérification trimestrielle de la validité de la fiche (échéance d'enregistrement au 25 février 2027), des 3 blocs de compétences et des durées d'épreuves (2 h 30 / 1 h 15 / 15 min).",
      exploitation: "Preuve : capture datée de la fiche RNCP archivée au dossier Qualiopi. Action : alignement du programme et des grilles d'évaluation sur le référentiel en vigueur.",
    },
    {
      lien: "https://www.anfa-auto.fr/rnqsa/operateur-vitrage-confirme",
      titreLien: "ANFA — Répertoire national des qualifications des services de l'automobile",
      titre: "Qualification Opérateur vitrage : positionnement conventionnel et référentiel de branche",
      date: "Février 2026",
      commentaire: "Le CQP Opérateur vitrage donne accès à l'échelon 3 de la Convention collective nationale des services de l'automobile n° 3034. Le contenu du CQP est décrit dans un référentiel établi par l'ANFA.",
      exploitation: "Preuve : référentiel CQP OV archivé et diffusé à l'équipe pédagogique. Action : mise à jour des grilles d'évaluation et du positionnement conventionnel annoncé aux stagiaires.",
    },
    {
      lien: "https://www.legifrance.gouv.fr/",
      titreLien: "Légifrance",
      titre: "Suivi des dispositions du Code de la route relatives aux vitrages et au champ de vision du conducteur",
      date: "Janvier 2026",
      commentaire: "Veille sur les exigences applicables aux vitrages du véhicule et sur les conséquences d'un dommage situé dans le champ de vision du conducteur lors du contrôle technique.",
      exploitation: "Preuve : note de veille datée remise aux stagiaires. Action : mise à jour du module « critères de réparabilité » du jour 9.",
    },
    {
      lien: "https://www.inrs.fr/",
      titreLien: "INRS",
      titre: "Prévention du risque chimique lié aux isocyanates contenus dans les colles polyuréthane",
      date: "Février 2026",
      commentaire: "Les colles polyuréthane monocomposant utilisées pour le collage des pare-brise contiennent des isocyanates, sensibilisants respiratoires et cutanés. Suivi des recommandations de prévention : ventilation, EPI, information des opérateurs.",
      exploitation: "Preuve : fiche mémo « risque chimique au poste vitrage » distribuée au jour 1. Action : renforcement de la séquence sécurité et affichage des consignes sur le plateau technique.",
    },
    {
      lien: "https://www.securite-routiere.gouv.fr/",
      titreLien: "Sécurité routière",
      titre: "Visibilité, équipements de sécurité du véhicule et systèmes d'aide à la conduite",
      date: "Mars 2026",
      commentaire: "Suivi des messages et campagnes portant sur l'état des vitrages, la visibilité et le rôle des aides à la conduite, utilisés comme support d'argumentation client.",
      exploitation: "Preuve : supports intégrés au module accueil client du jour 11. Action : construction de l'argumentaire de refus de réparation en zone de vision.",
    },
  ],
  metier: [
    {
      lien: "https://www.anfa-auto.fr/",
      titreLien: "ANFA — Observatoire des métiers des services de l'automobile",
      titre: "Évolution de l'emploi et des besoins en qualification dans la réparation et le remplacement de vitrage",
      date: "Mars 2026",
      commentaire: "Suivi des données de branche sur les effectifs, les recrutements et la montée en technicité du métier d'opérateur vitrage.",
      exploitation: "Preuve : synthèse marché remise aux stagiaires au jour 1. Action : actualisation de la présentation des débouchés et des perspectives d'évolution vers le CQP Technicien vitrage.",
    },
    {
      lien: "https://www.francetravail.fr/",
      titreLien: "France Travail",
      titre: "Offres et tensions de recrutement sur les métiers de la réparation automobile en Île-de-France",
      date: "Février 2026",
      commentaire: "Relevé trimestriel des offres publiées sur les postes de monteur et opérateur vitrage en Île-de-France, et des niveaux de rémunération observés à l'embauche.",
      exploitation: "Preuve : extraction datée jointe au dossier. Action : atelier technique de recherche d'emploi ciblé, au jour 12, pour les stagiaires sans employeur.",
    },
    {
      lien: "https://www.franceparebrise.fr/faq/les-interventions-france-pare-brise/les-systemes-de-calibration-adas-quand-et-comment-les-effectuer",
      titreLien: "France Pare-Brise — FAQ calibrage ADAS",
      titre: "Quand et comment effectuer un calibrage ADAS après remplacement de pare-brise",
      date: "Janvier 2026",
      commentaire: "Référence professionnelle sur les cas imposant un calibrage, la distinction statique / dynamique et les conditions à réunir en atelier.",
      exploitation: "Preuve : document support du module ADAS du jour 8. Action : construction de la trame de procès-verbal de calibrage remise au client.",
    },
    {
      lien: "https://formation-parebrise.fr/formation-adas/",
      titreLien: "Formation ADAS — caméra pare-brise",
      titre: "Offre de formation complémentaire au calibrage des caméras ADAS",
      date: "Février 2026",
      commentaire: "Repérage des parcours complémentaires permettant aux titulaires du CQP OV de se spécialiser sur le calibrage, compétence désormais déterminante pour l'employabilité.",
      exploitation: "Preuve : information remise aux stagiaires lors du bilan individuel. Action : intégration au plan de développement des compétences proposé en fin de parcours.",
    },
  ],
  technologique: [
    {
      lien: "https://www.123parebrise.fr/calibrage-camera-adas/",
      titreLien: "123 Pare-Brise — Calibrage caméra ADAS",
      titre: "Généralisation des caméras et capteurs embarqués sur le pare-brise",
      date: "Mars 2026",
      commentaire: "La part de véhicules équipés d'une caméra frontale continue de progresser : le remplacement de pare-brise devient une intervention à composante électronique, avec obligation de calibrage.",
      exploitation: "Preuve : séquence de démonstration de calibrage statique au jour 8. Action : ajout d'un point de contrôle « ADAS » systématique sur l'ordre de réparation.",
    },
    {
      lien: "https://www.saint-gobain-sekurit.com/",
      titreLien: "Saint-Gobain Sekurit",
      titre: "Évolution des vitrages automobiles : athermique, acoustique, chauffant, zones capteurs",
      date: "Janvier 2026",
      commentaire: "Suivi des gammes de vitrages et des fonctions intégrées, qui conditionnent l'identification de la bonne référence à partir du VIN et le prix de la pièce.",
      exploitation: "Preuve : documentation fabricant consultée en salle. Action : mise à jour de l'exercice d'identification de vitrage du jour 2.",
    },
    {
      lien: "https://www.sika.com/",
      titreLien: "Sika",
      titre: "Systèmes de collage de pare-brise : évolutions des colles polyuréthane et des temps de sécurité au décollage",
      date: "Février 2026",
      commentaire: "Suivi des fiches techniques des systèmes de collage : évolution des temps de sécurité au décollage, des primaires, et des conditions de mise en œuvre en température.",
      exploitation: "Preuve : fiches techniques et fiches de données de sécurité affichées sur le plateau technique. Action : mise à jour du tableau « SDAT selon température » utilisé au jour 6.",
    },
    {
      lien: "https://www.remplacementdeparebrise.fr/blog/comment-reparer-un-impact-sur-pare-brise/",
      titreLien: "Guide professionnel — réparation d'impact",
      titre: "Évolution des résines et des outils d'injection pour la réparation d'impact",
      date: "Mars 2026",
      commentaire: "Veille sur les kits d'injection professionnels, les résines à viscosités différenciées selon le type d'impact et les lampes UV utilisées en atelier.",
      exploitation: "Preuve : comparatif des kits présenté au jour 10. Action : renouvellement des consommables du plateau technique.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Réponses de positionnement écrites à la main — 6 stagiaires × 10 questions
// ---------------------------------------------------------------------------
export interface VitrageReponsesOuvertes {
  debut: Record<string, string[]>;
  fin: Record<string, string[]>;
  scoresDebut: Record<string, number[]>;
  scoresFin: Record<string, number[]>;
}

export const VITRAGE_REPONSES_OUVERTES: VitrageReponsesOuvertes = {
  debut: {
    FERREIRA: [
      "Je le fais tous les jours : on protège la voiture, on enlève les essuie-glaces et l'auvent, on coupe au fil, on sort le pare-brise à deux et on recolle. Après je remonte tout. Par contre l'ordre exact des produits avant l'encollage, je le fais d'instinct, je ne saurais pas l'écrire proprement.",
      "On dit au client d'attendre une heure. Je crois que c'est le temps que la colle prenne, mais je ne sais pas d'où vient ce chiffre. C'est ce que mon collègue m'a dit quand j'ai commencé.",
      "Le ravoir c'est enlever l'ancienne colle. On laisse un petit peu, je ne sais pas exactement combien, on m'a dit de ne pas tout enlever mais je ne sais pas pourquoi.",
      "Si l'impact est petit on répare, s'il est gros ou en plein devant le conducteur on remplace. C'est le chef qui tranche quand ce n'est pas évident.",
      "On perce un peu, on met la résine avec l'injecteur et on passe la lampe. Je l'ai vu faire mais je ne l'ai jamais fait tout seul.",
      "Il y a la caméra derrière le pare-brise. Je sais qu'il faut la faire régler mais chez nous on envoie la voiture ailleurs, donc je ne connais pas la procédure.",
      "On change la vitre et on la remet dans les pinces. Une fois la vitre redescendait toute seule, on a rebranché et ça a marché, je ne sais pas pourquoi.",
      "Je dis au client que ce n'est pas réparable et j'appelle le chef pour qu'il explique. Je ne suis pas très à l'aise pour ça.",
      "Je ne propose rien, ce n'est pas mon rôle, moi je suis à l'atelier.",
      "On met des gants et des lunettes. Les pare-brise usagés on les met dans la benne dehors, je ne sais pas où ça part après.",
    ],
    TRAORÉ: [
      "Je ne sais pas, je n'ai jamais fait. Je pense qu'on enlève l'ancien et qu'on colle le nouveau.",
      "Aucune idée.",
      "Je ne connais pas ce mot.",
      "Je ne sais pas. Je dirais que ça dépend de la taille de la fissure.",
      "Je crois qu'on met un produit qui remplit le trou, mais je ne sais pas comment.",
      "Je ne sais pas ce que c'est que les ADAS.",
      "Je n'ai jamais démonté une porte de voiture.",
      "Je lui dirais qu'il faut changer le pare-brise, mais je ne saurais pas expliquer pourquoi.",
      "Je ne sais pas.",
      "Il faut des gants parce que le verre coupe, et des chaussures de sécurité. Pour les déchets je ne sais pas.",
    ],
    CHAUVIN: [
      "Je vois les techniciens faire depuis l'accueil : ils protègent la voiture, ils démontent des pièces autour, ils coupent, ils sortent le pare-brise à deux et ils recollent. Je ne connais pas les produits ni l'ordre.",
      "C'est le délai avant que le client puisse repartir. Je dis toujours deux heures aux clients parce que c'est ce qu'on m'a dit, mais je ne sais pas si c'est vrai pour toutes les colles.",
      "Je ne connais pas ce terme, je ne l'entends jamais à l'accueil.",
      "Je sais qu'il y a des cas où on ne répare pas : quand c'est devant le conducteur ou quand c'est trop grand. Mais je ne connais pas la liste complète, donc je vais toujours chercher un technicien.",
      "Je sais qu'on injecte une résine et qu'on met une lampe. Je l'explique aux clients comme ça, sans détail.",
      "C'est le calibrage de la caméra. Je le facture et je remets le papier au client, mais je ne sais pas ce qui est fait exactement ni pourquoi c'est obligatoire.",
      "Je prends les rendez-vous pour les vitres latérales, mais je ne sais pas ce qui est fait dans la porte.",
      "Ça, je sais faire. J'explique au client qu'on ne peut pas réparer, je propose tout de suite un rendez-vous pour le remplacement et je regarde son contrat. Ce qui me manque, c'est de pouvoir montrer moi-même le critère technique.",
      "Oui, je propose des balais d'essuie-glace ou un traitement quand le client est réceptif. Je pars de ce que le technicien me signale.",
      "Les techniciens ont des gants et des lunettes. Pour les déchets, on me demande parfois ce que devient l'ancien pare-brise et je ne sais pas quoi répondre.",
    ],
    NGUYEN: [
      "On démonte, on coupe l'ancien joint, on sort la vitre, on nettoie et on recolle. En mécanique on va vite, je pense que c'est pareil : une heure et c'est fait.",
      "Le temps que la colle sèche. Je dirais une heure à peu près, on sent quand c'est dur.",
      "C'est le nettoyage de l'ancien joint. Moi j'aurais tendance à tout enlever pour repartir sur du propre, jusqu'à la tôle.",
      "Si c'est petit et pas devant le conducteur, on répare. Sinon on remplace. Je le fais à l'œil, je ne mesure pas.",
      "On met la résine dans le trou et on éclaire avec la lampe UV. Je ne connais pas le détail des cycles.",
      "Il faut recalibrer la caméra. Je sais que ça existe, on le sous-traite. Je ne connais pas la différence entre statique et dynamique.",
      "Ça, je connais un peu par la mécanique : on démonte la garniture, on remplace la vitre, on la remet dans les pinces. J'oublie souvent d'aspirer le verre dans la porte.",
      "Je dis que ce n'est pas réparable et que ça se change. J'annonce vite, je sais que je ne prends pas le temps.",
      "Non, je n'en propose jamais, je trouve ça gênant, j'ai l'impression de forcer.",
      "Gants et lunettes. Les fiches de sécurité des produits, je ne les lis pas, honnêtement.",
    ],
    BOUZID: [
      "Protection du véhicule, identification par le VIN, dépose des essuie-glaces, de l'auvent et des garnitures, débranchement des capteurs, découpe au fil ou à la lame, extraction à la ventouse, ravoir en laissant un peu de cordon, nettoyant, activateur, primaire, cordon triangulaire, pose sur cales, remontage et essai d'étanchéité. Je le fais depuis onze ans.",
      "C'est le délai avant que le client reprenne la route, donné par le fabricant de la colle. Je le connais, mais je dois avouer que quand un client est pressé je rends parfois les clés un peu avant en lui disant de rouler doucement.",
      "Raser le cordon en laissant un à deux millimètres. Si je mets la tôle à nu, je mets le primaire anticorrosion. Par contre, je ne respecte pas toujours le temps de séchage, je colle derrière.",
      "Taille, position par rapport au conducteur, distance au bord, pas de fissure qui part, et pas dans la zone de la caméra. Je décide à l'œil, je n'ai pas de gabarit et je ne garde aucune trace écrite.",
      "Nettoyage, ouverture de l'impact, injecteur centré, vide puis pression, lampe UV, finition et arasage. Je le fais souvent, mais je m'arrête quand ça me paraît bon, je n'ai pas de critère précis.",
      "Il faut calibrer la caméra. Je ne suis pas équipé, donc aujourd'hui je refuse ces voitures ou je les renvoie ailleurs, et je perds les dossiers.",
      "Aspirer les débris, remettre la glace dans les pinces, serrer, régler et réinitialiser l'anti-pincement. Le pare-vapeur, je le remets un peu approximativement.",
      "Je montre l'impact au client, j'explique pourquoi on ne peut pas réparer et je propose le remplacement. C'est mon métier depuis onze ans, je suis à l'aise.",
      "Oui, je propose souvent : balais, traitement. Je suis chez le client, je vois sa voiture. Mais je ne l'ai jamais formalisé.",
      "Gants anti-coupure, lunettes, chaussures. Je travaille souvent sans gants quand il fait chaud parce que je perds en précision, je sais que c'est une mauvaise habitude. Les cartouches, je les laisse parfois sur place.",
    ],
    LEMAIRE: [
      "Je devine la logique par la carrosserie : protéger, démonter les périphériques, découper, sortir la vitre, préparer le support, coller et remonter. Mais je n'ai jamais déposé un pare-brise, donc je ne connais ni l'outillage ni l'ordre exact.",
      "Je ne connais pas le terme, mais je suppose que c'est un temps de séchage. En peinture on a des temps de séchage à respecter, ça doit être la même logique.",
      "Le mot ne me parle pas, mais la préparation de surface, c'est mon métier : on dégraisse, on ne colle jamais sur une tôle nue ou corrodée, et on applique un primaire anticorrosion avec son temps de séchage.",
      "Je ne connais pas les critères précis pour un impact. En carrosserie on a des critères de réparabilité aussi, donc je suppose que ça dépend de la taille et de l'emplacement.",
      "Je n'ai jamais vu faire, je ne connais pas du tout.",
      "Je sais que les voitures ont des radars et des caméras, en carrosserie on gère les radars de pare-chocs et il faut les calibrer. Pour le pare-brise je suppose que c'est pareil.",
      "Je démonte des garnitures de porte régulièrement en carrosserie, mais je n'ai jamais remplacé une glace ni réglé un lève-vitre.",
      "Je sais expliquer un refus à un client, on le fait aussi en carrosserie, mais je n'aurais pas les arguments techniques du vitrage.",
      "Oui, on le fait en carrosserie : on montre, on explique, on ne force pas.",
      "Ça, je maîtrise : EPI complets, gants nitriles pour les produits, cabine ventilée, lecture des fiches de données de sécurité, tri des déchets dangereux avec bordereau. Le risque nouveau pour moi c'est le verre et le port du pare-brise.",
    ],
  },
  fin: {
    FERREIRA: [
      "Alors maintenant je peux le dire dans l'ordre et surtout dire pourquoi. Je protège la voiture et je bâche la planche de bord, je relève le VIN pour être sûr de la référence, je démonte essuie-glaces, auvent et baguettes et je débranche la caméra et le capteur de pluie sans tirer sur les fils. Je coupe au fil ou à la lame selon l'accès, on sort le pare-brise à deux à la ventouse. Je rase le cordon en laissant un à deux millimètres, je prépare le vitrage neuf avec le nettoyant, l'activateur et le primaire en respectant le temps de flash-off, j'encolle en un seul cordon triangulaire régulier et je pose sur les cales avec une pression bien répartie. Après je remonte tout, je fais le calibrage s'il y a une caméra, je teste l'étanchéité à l'eau, je note le lot de colle sur l'OR et j'explique le délai au client. Ce qui a changé pour moi c'est que je sais pourquoi je laisse le cordon résiduel.",
      "C'est le délai avant lequel le client ne doit pas repartir, et c'est le fabricant de la colle qui le donne, pas l'atelier. Ça dépend de la colle, de la température et de l'humidité. Tant que ce délai n'est pas passé, le pare-brise ne tient pas complètement la caisse et l'airbag passager n'a pas son appui. J'ai arrêté de dire une heure automatiquement, maintenant je regarde la cartouche.",
      "Raser le cordon en laissant un à deux millimètres bien réguliers, parce que c'est ce résidu qui accroche le mieux la colle neuve. On ne va jamais chercher la tôle exprès. Si on la met à nu par accident : dégraissage, primaire anticorrosion, et on attend le temps de séchage marqué sur la fiche avant de coller.",
      "Les critères se cumulent : la taille de l'impact, la position par rapport au regard du conducteur, la distance au bord, l'absence de fissure qui part loin, la zone caméra, le film PVB intact, et l'impact doit être propre et sec. Il suffit qu'un seul critère bloque pour qu'on remplace. Et en cas de doute on ne répare pas. Maintenant je mesure au lieu de faire à l'œil.",
      "Vitrage sec et pas brûlant, nettoyage et ouverture du point d'impact, injecteur bien centré sur le support à ventouses. Ensuite on alterne vide et pression jusqu'à ce que l'effet miroir disparaisse dans toutes les branches, polymérisation à la lampe UV, goutte de finition sous film, nouveau passage UV, arasage à la lame à plat et polissage. Contrôle des deux côtés en lumière rasante et photo avant-après. J'ai réussi mes trois réparations en TP.",
      "Quand on change le pare-brise, la caméra ne regarde plus exactement au même endroit, donc il faut la recalibrer avec la procédure du constructeur, en statique avec des mires ou en roulant, parfois les deux. Si on ne le fait pas, le freinage d'urgence et le maintien dans la voie peuvent se déclencher n'importe comment ou pas du tout, et c'est l'atelier qui est responsable. On garde le PV de calibrage.",
      "On aspire tout le verre dans la porte et dans les coulisses, sinon la vitre neuve est rayée dès la première descente. On remet la glace dans ses pinces, on serre au couple, on règle le parallélisme, l'affleurement et la course, et on réinitialise l'anti-pincement avec la procédure du constructeur, montée complète puis descente complète maintenues. Après on remet le pare-vapeur et la garniture et on teste les commandes.",
      "Je montre l'impact du doigt au client, je lui dis exactement quel critère bloque, par exemple qu'il est à trois centimètres du bord et que c'est la zone où le pare-brise est collé et travaille le plus, donc que la fissure repartirait. Ensuite je lui donne tout de suite la solution, le délai et le prix, et je regarde avec lui sa garantie bris de glace. Avant j'appelais le chef, maintenant je le fais moi-même.",
      "Je pars de ce que j'ai vu en démontant. Si les balais sont fendus, je le dis au client et je lui explique que sur un pare-brise neuf un balai usé raye et gêne la nuit sous la pluie. Je donne le prix, je précise que ça n'allonge pas l'immobilisation, et s'il dit non c'est non, je le note pour la prochaine fois.",
      "Gants anti-coupure, lunettes, chaussures de sécurité, et gants nitriles dès que je touche primaire ou colle. Poste rangé, sol dégagé, ventilation. Le pare-brise on le porte à deux ou à la ventouse double. Et pour les déchets, j'ai découvert qu'un pare-brise ne va pas dans la benne à verre : il part dans une filière spéciale parce qu'il faut séparer le verre et le film. Les cartouches et les chiffons sont des déchets dangereux.",
    ],
    TRAORÉ: [
      "Protection du véhicule, identification du vitrage avec le VIN, dépose des essuie-glaces, de la grille d'auvent et des garnitures, débranchement des capteurs. Ensuite découpe au fil, extraction à deux avec la ventouse, ravoir du cordon en laissant un à deux millimètres. Préparation du vitrage neuf : nettoyant, activateur, primaire sur la sérigraphie et on attend le temps de flash-off. Encollage en cordon triangulaire continu, pose sur les cales, pression uniforme, contrôle des jeux. Remontage, calibrage si caméra, essai d'étanchéité à l'eau, traçabilité sur l'OR et consignes au client. J'ai appris tout ça en treize jours et je suis assez fier de pouvoir le réciter dans l'ordre.",
      "C'est le temps donné par le fabricant de la colle avant que le véhicule puisse rouler en sécurité. Il change selon la température et l'humidité. C'est important parce que le pare-brise sert de structure et d'appui à l'airbag passager.",
      "Le ravoir c'est raser l'ancien cordon en gardant un à deux millimètres. Si la tôle est à nu, on dégraisse, on met le primaire anticorrosion et on respecte le temps de séchage. J'ai retenu qu'on ne colle jamais sur une tôle nue ni sur de la rouille.",
      "Taille dans les limites, hors du champ de vision du conducteur, assez loin du bord, pas de fissure ramifiée, hors zone de la caméra, verre feuilleté avec le film intact, impact propre et sec, et pas déjà réparé. Les critères sont cumulatifs, un seul suffit à imposer le remplacement, et dans le doute on ne répare pas.",
      "Nettoyer et sécher, ouvrir le point d'impact, poser l'injecteur centré, faire le vide pour sortir l'air, injecter la résine, recommencer les cycles jusqu'à ce que l'effet miroir parte, polymériser aux UV, mettre la résine de finition avec le film, repasser aux UV, araser à la lame bien à plat et polir. Puis contrôler des deux côtés. Ce que j'ai le plus retenu : si on ne fait pas le vide avant, il reste de l'air et la réparation est ratée.",
      "Il faut calibrer la caméra selon la procédure constructeur, en statique en atelier avec des mires et une surface plane, ou en dynamique en roulant avec la valise, parfois les deux. Sans calibrage les aides à la conduite ne fonctionnent pas correctement, il y a des voyants, la responsabilité de l'atelier est engagée et l'assureur réclame la preuve.",
      "Aspirer tous les débris dans le caisson de porte et les coulisses, mettre la glace dans ses pinces, serrer au couple, régler le parallélisme, l'affleurement et la course, puis réinitialiser l'anti-pincement selon la procédure constructeur. Remettre le pare-vapeur, la garniture, et vérifier les commandes et le rétroviseur.",
      "Je montre le dommage, j'explique le critère qui bloque avec des mots simples, je dis ce qui se passerait si on réparait quand même, puis je propose le remplacement avec un délai et un prix, et je vérifie la garantie bris de glace et la franchise. On ne dit jamais « c'est comme ça ».",
      "Partir d'un constat réel fait sur le véhicule, expliquer le bénéfice pour le client, annoncer clairement le prix, laisser le choix et accepter le refus sans insister. C'est ce qui m'a le plus surpris : je pensais que la vente c'était insister, en fait c'est du conseil.",
      "EPI systématiques : gants anti-coupure, lunettes, chaussures de sécurité, gants nitriles pour les produits. Ventilation du poste, lecture des fiches de données de sécurité, poste rangé. Manutention à deux ou à la ventouse double. Déchets : pare-brise feuilleté vers une filière spécifique pour séparer verre et PVB, cartouches et chiffons souillés en déchets dangereux avec bordereau.",
    ],
    CHAUVIN: [
      "Je connais maintenant les étapes : protection, identification par le VIN, dépose des périphériques et des connecteurs, découpe, extraction à la ventouse, ravoir à un ou deux millimètres, préparation du vitrage neuf avec activateur et primaire, encollage, pose, remontage, calibrage, contrôle d'étanchéité et traçabilité. Je suis encore lente sur la découpe et la pose, il me faudra de la pratique en atelier, mais je peux expliquer chaque étape à un client, et ça, ça change tout dans mon travail.",
      "Le SDAT, le temps de sécurité au décollage. C'est le fabricant de la colle qui le fixe, il dépend du produit, de la température et de l'hygrométrie. Je vais pouvoir arrêter de réciter deux heures à tous les clients et donner la vraie valeur du jour, avec l'explication : ce n'est pas du confort, c'est la tenue de la caisse et l'airbag.",
      "Raser le cordon en laissant un à deux millimètres, ne pas atteindre la tôle. En cas de mise à nu : dégraissage, primaire anticorrosion et temps de séchage. Je l'ai fait deux fois en TP et j'ai encore la main lourde sur la lame, c'est ce que je dois travailler.",
      "Je peux enfin répondre moi-même au client. Les critères : taille, position par rapport au champ de vision du conducteur, distance au bord, absence de fissure ramifiée, zone caméra ADAS exclue, PVB intact, impact propre. Ils sont cumulatifs. Et la règle d'or qu'on nous a répétée : dans le doute, on remplace.",
      "Je connais tout le cycle maintenant : préparation, ouverture de l'impact, injecteur centré, cycles vide-pression jusqu'à disparition de l'effet miroir, UV, finition, arasage, polissage, contrôle. J'en ai réalisé deux en autonomie. Je suis encore lente et j'ai besoin de refaire le geste d'arasage, mais je sais expliquer à un client exactement ce qui se passe dans son pare-brise.",
      "Maintenant je comprends le papier que l'assureur me demande. La caméra doit être recalibrée après remplacement, statique ou dynamique selon le constructeur, et le procès-verbal de calibrage est joint au dossier. Sans ça, les aides à la conduite peuvent mal réagir et notre responsabilité est engagée.",
      "Aspiration complète des débris, mise en place et serrage au couple, réglage du parallélisme, de l'affleurement et de la course, réinitialisation de l'anti-pincement selon la procédure constructeur, repose du pare-vapeur et de la garniture, contrôle des commandes. Je l'ai fait une fois en TP et la vitre redescendait toute seule : c'est justement parce que j'avais oublié la réinitialisation. Je ne l'oublierai plus.",
      "C'est le point où j'étais déjà à l'aise et où j'ai gagné en crédibilité : maintenant je peux montrer physiquement le critère bloquant au lieu d'aller chercher un technicien. J'explique, je donne la conséquence concrète, je propose immédiatement le remplacement avec un créneau, je vérifie le contrat, j'annonce la franchise et je propose la cession de créance pour qu'il n'avance rien.",
      "Je le faisais déjà d'instinct, maintenant j'ai la méthode : constat, bénéfice, prix, choix laissé au client, refus accepté et noté. J'ai construit mon argumentaire sur trois prestations que je trouve légitimes : balais, traitement hydrophobe et rénovation d'optiques. Je ne propose que ce que je proposerais à ma propre voiture.",
      "EPI complets, ventilation, fiches de données de sécurité lues avant d'utiliser un produit, poste rangé, port à deux. Filière déchets spécifique pour le vitrage feuilleté, déchets dangereux pour les cartouches et chiffons. Je vais pouvoir répondre aux clients qui demandent ce qu'on fait de leur ancien pare-brise, on me le demande souvent.",
    ],
    NGUYEN: [
      "Protection, VIN et référence, démontage des périphériques et débranchement des capteurs, découpe au fil ou lame oscillante, extraction ventouse à deux, ravoir à un-deux millimètres sans toucher la tôle, préparation du vitrage neuf avec respect du flash-off, encollage en cordon continu, pose sur cales avec pression uniforme, remontage, calibrage ADAS, essai d'étanchéité, OR et lot de colle. Ce que j'ai vraiment intégré cette semaine c'est l'auto-contrôle : avant je fonçais, maintenant je vérifie les jeux et le cordon avant de passer à la suite.",
      "Le délai fixé par le fabricant de la colle avant reprise de la route, variable selon la température et l'hygrométrie. Avant je disais au feeling, maintenant je sais qu'il faut lire la fiche technique et qu'on l'écrit sur l'ordre de réparation.",
      "Cordon résiduel de un à deux millimètres, jamais de mise à nu volontaire. Si ça arrive : dégraisser, primaire anticorrosion, respecter le séchage. Et si la corrosion est déjà installée, on la traite avant de poser, sinon ça décolle et ça fuit plus tard.",
      "Taille, localisation hors champ de vision, distance au bord, pas de fissure ramifiée, hors zone caméra, feuilleté avec PVB intact, impact propre et récent. Un seul critère d'exclusion et c'est remplacement. Dans le doute on ne répare pas, parce qu'une réparation qui repart c'est pire que rien.",
      "Vitrage sec et à température, nettoyage, ouverture du point d'impact, injecteur centré, cycles alternés vide et pression jusqu'à disparition de l'effet miroir, polymérisation UV, résine de finition sous film, UV, arasage à plat, polissage, contrôle des deux faces. Le piège c'est de vouloir aller vite sur la polymérisation, et ça je me le suis noté.",
      "Calibrage obligatoire selon la procédure du constructeur : statique avec mires sur surface calibrée et outil de diagnostic, ou dynamique en roulant à vitesse imposée, ou les deux. Sans calibrage : systèmes inopérants ou intempestifs, voyants de défaut, responsabilité de l'atelier, litige assurance.",
      "Aspiration du caisson et des coulisses, glace dans les pinces, serrage au couple, réglage parallélisme, affleurement et course, réinitialisation de l'anti-pincement, repose du pare-vapeur en état parce que c'est lui qui fait l'étanchéité de la porte, garniture, contrôle des commandes et essai en descente-montée par impulsion.",
      "Montrer le dommage, nommer le critère en langage simple, expliquer la conséquence, proposer la solution avec délai et coût, vérifier la garantie et la franchise. Ce que je dois encore travailler c'est de ralentir : j'ai tendance à annoncer trop vite et le client n'a pas le temps d'assimiler.",
      "À partir d'un constat pendant l'intervention, en expliquant le bénéfice, avec un prix annoncé et sans immobilisation supplémentaire. Et surtout accepter le non. Avant je n'en proposais aucune parce que je trouvais ça gênant ; maintenant je comprends que c'est un service si ça part d'un vrai besoin.",
      "Gants anti-coupure, lunettes, chaussures, gants nitriles pour les produits, ventilation, FDS lues, poste rangé, manutention à deux. Déchets : filière spécifique pour le feuilleté, déchets dangereux pour les cartouches et les chiffons, avec bordereau de suivi. Ce que je n'appliquais pas avant, c'est la lecture des fiches de sécurité.",
    ],
    BOUZID: [
      "Même déroulé qu'avant sauf que j'ai corrigé deux choses chez moi. Un : je ne descends plus jamais jusqu'à la tôle au ravoir, et si ça arrive j'applique le primaire anticorrosion et j'attends vraiment le temps de séchage au lieu de coller derrière. Deux : je ne pose plus si la température de l'atelier ou du produit n'est pas dans la plage de la fiche technique, même si le client attend. Le reste, protection, découpe, ventouse double, cordon d'un seul tenant, cales et pression, étanchéité, traçabilité, c'était déjà en place.",
      "C'est le point sur lequel j'ai le plus changé. Le SDAT est donné par le fabricant, il dépend de la colle, de la température et de l'humidité. Je rendais parfois les clés un peu avant en disant de rouler doucement : je ne le ferai plus, parce qu'en cas de choc c'est ma responsabilité et surtout la sécurité du client. Maintenant je l'annonce dès le devis pour que le client organise sa journée.",
      "Un à deux millimètres réguliers, et je ne force plus quand le cordon est dur : je change de lame plutôt que d'appuyer et de racler la tôle. Quand je mets à nu, je dégraisse, je mets le primaire anticorrosion et surtout j'attends le temps de séchage, ce que je ne faisais pas avant.",
      "Rien de nouveau sur le fond pour moi, mais j'ai mis des mots et une méthode dessus : je nettoie, je mesure avec un gabarit, je regarde des deux côtés en lumière rasante, je photographie avec un repère et je note ma décision sur l'OR. Avant je décidais à l'œil et je n'avais aucune trace. Maintenant j'ai de quoi justifier auprès du client et de l'assureur.",
      "Le cycle je le faisais déjà, mais j'ai enfin le critère d'arrêt que je n'avais pas : on continue les cycles vide-pression tant qu'il reste de l'effet miroir dans une branche, et pas tant que ça me paraît bon. J'ai aussi appris à ne pas réparer un pare-brise en plein soleil et à sécher l'impact avant. Mes réparations sont plus propres depuis.",
      "Calibrage obligatoire, statique ou dynamique selon le constructeur. La grande décision que j'ai prise cette semaine, c'est d'investir ou de conventionner avec un atelier équipé, parce qu'aujourd'hui je perds ces dossiers et surtout je prends un risque si je rends une voiture sans calibrage. Et je sais maintenant qu'il faut un PV tracé pour l'assureur.",
      "Aspiration systématique, serrage au couple, réglage complet et réinitialisation de l'anti-pincement. Le pare-vapeur, avant je le remettais approximativement : maintenant je sais que c'est lui qui empêche l'eau d'arriver dans l'habitacle, donc je le repose proprement avec le mastic butyle.",
      "Je montre, j'explique le critère, je donne la conséquence, je propose le remplacement, je vérifie la garantie et je propose la cession de créance. Ce que j'ai ajouté cette semaine, c'est la photo avec le repère de taille : quand le client voit la mesure, il n'y a plus de discussion.",
      "En mobile c'est encore plus simple parce que je suis chez le client et je vois sa voiture. Je pars de ce que je constate, j'explique le bénéfice, j'annonce le prix, et je laisse choisir. J'ai calculé pendant la formation ce que je laisse passer chaque mois en ne proposant rien : ça m'a convaincu.",
      "Je porte maintenant les gants même quand ça me gêne, parce qu'on a vu ce que les isocyanates font aux voies respiratoires et à la peau à force. En mobile j'ai revu mon organisation : je travaille portes ouvertes, je ne colle jamais dans un espace confiné, et j'ai mis en place un bac de collecte pour ramener les cartouches et les chiffons à l'atelier au lieu de les jeter chez le client. C'est le changement dont je suis le plus content.",
    ],
    LEMAIRE: [
      "Protection complète, identification par le VIN, dépose des périphériques et débranchement propre des capteurs, découpe, extraction à la ventouse, puis toute la partie qui me parle : ravoir en laissant un à deux millimètres, contrôle de l'absence de corrosion, et anticorrosion avec temps de séchage si je mets à nu. Préparation du vitrage neuf, encollage régulier, pose sur cales, remontage, calibrage, étanchéité, traçabilité. Ce que j'ai découvert c'est que la préparation de surface, mon métier, c'est exactement ce qui fait tenir un collage.",
      "Le temps de sécurité au décollage, donné par le fabricant de la colle et dépendant de la température et de l'hygrométrie. Ça m'a rappelé les temps de séchage en peinture : on ne les négocie pas, sinon c'est le résultat qui trinque. Ici en plus c'est de la sécurité.",
      "Raser en gardant un à deux millimètres pour l'accroche, sans atteindre la tôle. Mise à nu : dégraissage, primaire anticorrosion, séchage complet. Et si je vois de la corrosion, je la traite avant, sinon dans six mois le client revient avec une infiltration et une tôle percée. C'est la partie où je me sens la plus solide.",
      "Taille, champ de vision du conducteur, distance au bord, absence de fissure ramifiée, zone caméra, PVB intact, propreté et ancienneté de l'impact. Critères cumulatifs, un seul suffit pour remplacer. Et dans le doute on ne répare pas.",
      "Nettoyage et séchage, ouverture de l'impact, injecteur centré, cycles vide-pression jusqu'à disparition de l'effet miroir, polymérisation UV, résine de finition sous film, UV, arasage à la lame à plat, polissage et contrôle en lumière rasante. C'était totalement nouveau pour moi et c'est finalement ce que j'ai préféré.",
      "Le remplacement modifie l'angle de vue de la caméra, donc calibrage selon la procédure constructeur, statique et/ou dynamique. Sans ça, freinage d'urgence et maintien dans la voie peuvent être faux. C'est exactement la même logique qu'avec les radars de pare-chocs en carrosserie, ça je le connaissais.",
      "Aspiration complète, mise en place, serrage au couple, réglage du parallélisme, de l'affleurement et de la course, réinitialisation de l'anti-pincement selon la procédure, repose soignée du pare-vapeur et de la garniture, contrôle des commandes et de l'étanchéité.",
      "Montrer, nommer le critère bloquant simplement, expliquer ce qui se passerait si on réparait, proposer tout de suite le remplacement avec délai et prix, regarder la garantie bris de glace et la franchise, proposer la cession de créance. Jamais de refus sans explication.",
      "Constat réel, bénéfice expliqué, prix annoncé, choix laissé, refus accepté et noté pour le passage suivant. En carrosserie on a le même réflexe avec les retouches de peinture : on montre, on explique, on ne force pas.",
      "EPI complets dont gants nitriles pour les produits, ventilation, FDS lues systématiquement, poste rangé, manutention à deux ou ventouse double. Déchets : pare-brise feuilleté vers la filière spécifique, cartouches, primaires et chiffons souillés en déchets dangereux avec bordereau de suivi. C'est très proche de ce qu'on applique en carrosserie, j'étais en terrain connu.",
    ],
  },
  // Notes du positionnement d'entrée : 4 / 1,5 / 4 / 4 / 8,5 / 5 sur 10
  scoresDebut: {
    FERREIRA: [1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0],
    TRAORÉ: [0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 0, 0],
    CHAUVIN: [0.5, 0.5, 0, 0.5, 0.5, 0, 0, 1, 1, 0],
    NGUYEN: [0.5, 0.5, 0, 0.5, 0.5, 0.5, 1, 0.5, 0, 0],
    BOUZID: [1, 1, 0.5, 1, 0.5, 0.5, 1, 1, 1, 0.5],
    LEMAIRE: [0.5, 0.5, 1, 0.5, 0, 0.5, 0.5, 0.5, 1, 0],
  },
  // Notes du positionnement de fin : 9 / 9 / 8 / 9 / 10 / 9,5 sur 10
  scoresFin: {
    FERREIRA: [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5],
    TRAORÉ: [1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 1],
    CHAUVIN: [0.5, 1, 0.5, 1, 0.5, 1, 0.5, 1, 1, 1],
    NGUYEN: [1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 1],
    BOUZID: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    LEMAIRE: [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1],
  },
};

const VITRAGE_IDENTITES: Record<string, string> = {
  FERREIRA: "ANTONIO",
  "TRAORÉ": "MOUSSA",
  TRAORE: "MOUSSA",
  CHAUVIN: "SANDRINE",
  NGUYEN: "KEVIN",
  BOUZID: "SOFIANE",
  LEMAIRE: "JULIE",
};

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toUpperCase();

/** Retourne les réponses écrites à la main pour un stagiaire vitrage, ou null. */
export function getVitrageManualAnswers(
  nom: string | undefined,
  isDebut: boolean,
  prenom?: string,
): { reponses: string[]; scores: number[] } | null {
  if (!nom || !prenom) return null;
  const cleNom = norm(nom);
  const attendu = VITRAGE_IDENTITES[cleNom] || VITRAGE_IDENTITES[norm(nom)];
  if (!attendu || norm(prenom) !== norm(attendu)) return null; // nom homonyme d'une autre formation : on sort
  const bank = isDebut ? VITRAGE_REPONSES_OUVERTES.debut : VITRAGE_REPONSES_OUVERTES.fin;
  const scores = isDebut ? VITRAGE_REPONSES_OUVERTES.scoresDebut : VITRAGE_REPONSES_OUVERTES.scoresFin;
  const reponses = bank[cleNom] || bank[nom.trim().toUpperCase()];
  const sc = scores[cleNom] || scores[nom.trim().toUpperCase()];
  if (!reponses || !sc) return null;
  return { reponses, scores: sc };
}

// ---------------------------------------------------------------------------
// Seeder (aucun appel réseau)
// ---------------------------------------------------------------------------
export function seedVitrageAICaches(): void {
  try {
    setCachedContentPack(FORMATION_VITRAGE, VITRAGE_CONTENT_PACK);
    setCachedEvalPack(FORMATION_VITRAGE, VITRAGE_EVAL_PACK);
    setCachedVeillePack(FORMATION_VITRAGE, VITRAGE_VEILLE_PACK);
  } catch {
    /* sessionStorage indisponible : ignoré */
  }
}
