// ---------------------------------------------------------------------------
// « Titre Professionnel Assistant Ressources Humaines (TP ARH) – RNCP41366 » — moteur de réponses HUMANISÉES
// Titre professionnel de niveau 5 (TP-01284), 2 blocs / CCP, 6 compétences professionnelles (CP1 à CP6),
// préparé par apprentissage (420 h au CFA, 1 semaine au CFA / 3 semaines en entreprise).
// 100 % statique (aucun appel IA / réseau).
// Chaque apprenti reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par apprenti (besoin, objectif, projet, attentes de l'entreprise…),
//     puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes, dans l'ordre des 10 mises en situation)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées)
//   • mises en situation (copie de l'apprenti, 8 productions par exercice + bilan personnel)
//   • exercices CFA par matière et missions en entreprise reliées à CP1-CP6
// Le choix suit le rang de l'apprenti dans la session par une permutation : deux apprentis d'un même
// groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Fil rouge fictif : ALTÉA SERVICES (Créteil, propreté et services, 148 salariés) ; salariés, candidats et
// entreprises d'accueil cités sont fictifs.
// ---------------------------------------------------------------------------

const normalize = (s: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Titre Professionnel Assistant Ressources Humaines (TP ARH) – RNCP41366 » :
 * l'intitulé ou le code contient « 41366 ». L'ancien exemple ARH (RNCP35030) n'est pas concerné.
 */
export function isARH41366Formation(intitule?: string, code?: string): boolean {
  return /41366/.test(intitule || "") || /41366/.test(code || "");
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function arh41366Seed(nom?: string, prenom?: string): number {
  const src = normalize(nom || "") + "|" + normalize(prenom || "");
  let h = 2166136261;
  for (let i = 0; i < src.length; i++) {
    h ^= src.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function isFeminin(civilite?: string, prenom?: string): boolean {
  const c = (civilite || "").toLowerCase();
  if (c.startsWith("mme") || c.startsWith("madame") || c.startsWith("mlle")) return true;
  if (c.startsWith("m.") || c === "m" || c.startsWith("monsieur")) return false;
  const p = (prenom || "").trim().toLowerCase();
  return p.endsWith("a") || p.endsWith("e");
}

/**
 * {e} → e au féminin ; {ne} → ne ; {le} → le ; {/rice} → rice (sinon eur) ; {if} → ive (sinon if) ;
 * {er} → ère (sinon er) ; {eur} → euse (sinon eur) ; {eux} → euse (sinon eux)
 */
function accorder(txt: string, fem: boolean): string {
  return txt
    .replace(/\{er\}/g, fem ? "ère" : "er")
    .replace(/\{eur\}/g, fem ? "euse" : "eur")
    .replace(/\{eux\}/g, fem ? "euse" : "eux")
    .replace(/\{\/rice\}/g, fem ? "rice" : "eur")
    .replace(/\{if\}/g, fem ? "ive" : "if")
    .replace(/\{ne\}/g, fem ? "ne" : "")
    .replace(/\{le\}/g, fem ? "le" : "")
    .replace(/\{e\}/g, fem ? "e" : "");
}

const PAS = [1, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];
const pgcd = (a: number, b: number): number => (b === 0 ? a : pgcd(b, a % b));

/**
 * Rang dans une banque de n réponses : permutation de l'indice de l'apprenti.
 * Pour n apprentis consécutifs, les n rangs sont tous différents ; `sel` change le pas
 * et le décalage, ce qui décorrèle les questions (et les champs) entre eux.
 */
function rang(idx: number, sel: number, n: number): number {
  if (n <= 1) return 0;
  let pas = PAS[sel % PAS.length] % n || 1;
  while (pgcd(pas, n) !== 1) pas++;
  const r = (idx * pas + sel * 7 + Math.floor(sel / 3)) % n;
  return (r + n) % n;
}

/** Indice de travail : le rang dans la session s'il est connu, sinon l'empreinte nom + prénom. */
const baseIndex = (idx: number | undefined, nom?: string, prenom?: string) =>
  typeof idx === "number" && idx >= 0 ? idx : arh41366Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// 1 diagnostic, 2 CP1 embauche et dossier du personnel, 3 CP1 temps de travail, fin de contrat et CSE,
// 4 CP2 variables de paie, 5 CP3 tableau de bord, 6 CP3 obligations liées à l'effectif,
// 7 CP4 entretiens professionnels, 8 CP5 profil de poste et offre, 9 CP5 entretien et intégration,
// 10 CP6 développement des compétences
// ---------------------------------------------------------------------------
export const ARH41366_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Quel est votre parcours et que connaissez-vous déjà du service ressources humaines de votre entreprise d'apprentissage ?", reponseAttendue: "Diplôme et expériences (stages, emplois administratifs), taille et activité de l'entreprise d'accueil, organisation du service RH, outils utilisés (SIRH, logiciel de paie, tableur), premières missions confiées, motivations pour le métier d'assistant RH." },
    { question: "Quelles formalités faut-il accomplir lors de l'embauche d'un salarié et que contient son dossier individuel ?", reponseAttendue: "DPAE avant la prise de poste, inscription au registre unique du personnel, contrat écrit (obligatoire pour un CDD ou un temps partiel), affiliation à la complémentaire santé et à la prévoyance, visite d'information et de prévention ; dossier : pièces d'identité et d'autorisation de travail, contrat et avenants, diplômes utiles au poste, entretiens, formations ; accès restreint et durées de conservation (RGPD)." },
    { question: "Que savez-vous du suivi du temps de travail, des absences et des fins de contrat ? Quel est le rôle du CSE ?", reponseAttendue: "Durées maximales et repos, heures supplémentaires, justificatifs d'absence ; modes de rupture (démission, licenciement, rupture conventionnelle, fin de CDD), indemnités et documents de fin de contrat ; CSE dès 11 salariés, élections tous les 4 ans, consultations et informations." },
    { question: "Quels éléments variables faut-il transmettre chaque mois pour établir les bulletins de paie ?", reponseAttendue: "Entrées et sorties, heures supplémentaires et complémentaires, absences (maladie, congés payés, absences injustifiées), primes, acomptes, saisies sur salaire, adhésions ou dispenses de mutuelle ; justificatifs, contrôle et respect de la date de transmission au service paie interne ou externe ; confidentialité." },
    { question: "Quels indicateurs RH connaissez-vous et comment calculeriez-vous un taux d'absentéisme ?", reponseAttendue: "Effectif, ETP, effectif moyen, entrées et sorties, turnover, absentéisme, ancienneté, pyramide des âges, masse salariale ; absentéisme = heures d'absence / heures théoriques de travail × 100 ; sources (SIRH, paie, DSN), périodicité, graphiques, confidentialité." },
    { question: "Quelles obligations de déclaration ou d'information RH dépendent de l'effectif de l'entreprise ?", reponseAttendue: "CSE dès 11 salariés et attributions élargies dès 50, BDESE et index de l'égalité professionnelle dès 50 salariés, obligation d'emploi des travailleurs handicapés dès 20 salariés (6 %), bilan social dès 300 salariés, reporting de durabilité pour les entreprises entrant dans le champ de la CSRD." },
    { question: "À quoi sert l'entretien professionnel et en quoi diffère-t-il de l'entretien annuel d'évaluation ?", reponseAttendue: "L'entretien de parcours professionnel (loi du 24 octobre 2025) porte sur les perspectives d'évolution professionnelle (qualifications, emploi, formation, VAE, CPF) : premier entretien dans l'année suivant l'embauche, puis tous les 4 ans, état des lieux récapitulatif à 8 ans, entretien de mi-carrière et entretien avant 60 ans ; l'entretien annuel évalue le travail et fixe des objectifs ; planning, supports, compte rendu remis au salarié, exploitation pour la gestion des emplois et des parcours." },
    { question: "Comment rédigeriez-vous une offre d'emploi et où la diffuseriez-vous ?", reponseAttendue: "Recueil du besoin avec le manager, profil de poste (missions, compétences, conditions), offre en français, sans critère discriminatoire ni limite d'âge, mentions utiles (contrat, lieu, horaires, rémunération) ; diffusion sur France Travail, jobboards, réseaux sociaux, cooptation, selon le poste ; grille de présélection." },
    { question: "Comment prépareriez-vous un entretien de recrutement et l'accueil d'un nouveau salarié ?", reponseAttendue: "Guide d'entretien structuré, questions identiques pour tous les candidats, grille d'évaluation reliée au profil, posture neutre, synthèse écrite ; information des candidats, réponses à tous, conservation limitée des données ; programme d'intégration (acteurs, étapes, outils, livret d'accueil, formation à la sécurité, suivi de la période d'essai)." },
    { question: "Comment recueilleriez-vous les besoins de formation des salariés et quels dispositifs de financement connaissez-vous ?", reponseAttendue: "Entretiens professionnels, demandes des managers, obligations réglementaires, orientations de la direction ; plan de développement des compétences (actions obligatoires et non obligatoires), CPF, période de reconversion, projet de transition professionnelle, VAE, bilan de compétences ; rôle de l'OPCO ; logistique, suivi budgétaire et évaluation des actions." },
  ],
  fin: [
    { question: "Présentez votre diagnostic de départ et la progression réalisée au CFA et en entreprise.", reponseAttendue: "Situation de départ, missions confiées en entreprise, progression sur CP1 à CP6, compétences transversales, éléments du dossier professionnel, axes restant à travailler avant la session de validation." },
    { question: "Décrivez les formalités d'embauche et la tenue des dossiers du personnel que vous pratiquez.", reponseAttendue: "DPAE, registre unique du personnel, contrat et mentions obligatoires (CDD, temps partiel), remise du CDD dans les 2 jours ouvrables, mutuelle et prévoyance, visite d'information et de prévention dans les 3 mois ; dossier individuel complet, classement, accès restreint, durées de conservation, RGPD." },
    { question: "Comment gérez-vous le suivi du temps de travail, une fin de contrat et la préparation des élections du CSE ?", reponseAttendue: "Durées maximales (10 h par jour, 48 h par semaine, 44 h en moyenne sur 12 semaines), repos de 11 h ; calcul de l'indemnité légale de licenciement (1/4 de mois par année jusqu'à 10 ans, 1/3 au-delà), procédure de rupture conventionnelle (rétractation 15 jours calendaires, homologation) ; certificat de travail, solde de tout compte, attestation France Travail ; information du personnel, protocole d'accord préélectoral, listes et procès-verbaux." },
    { question: "Expliquez votre méthode de collecte et de contrôle des variables de paie.", reponseAttendue: "Calendrier de paie, tableau des variables avec justificatifs, contrôles de cohérence (absences, congés payés, heures supplémentaires, entrées et sorties), arrêts de travail et signalement en DSN, acomptes et saisies, mutuelle, transmission au service paie dans les délais, contrôle des bulletins, échéance de la DSN, confidentialité et classement protégé." },
    { question: "Présentez le tableau de bord RH que vous avez construit et l'analyse que vous en tirez.", reponseAttendue: "Indicateurs choisis selon l'objectif et le destinataire, formules exactes (turnover, absentéisme, ETP, effectif moyen, masse salariale), sources, périodicité, graphiques adaptés, éléments significatifs repérés et commentés, confidentialité des données." },
    { question: "Quelles obligations liées à l'effectif suivez-vous et comment les préparez-vous ?", reponseAttendue: "BDESE, index de l'égalité professionnelle (publication au 1er mars, mesures correctives sous 75 points, objectifs de progression sous 85), transparence salariale (directive (UE) 2023/970), obligation d'emploi des travailleurs handicapés (6 %, déclaration en DSN), bilan social dès 300 salariés, CSRD selon les seuils ; calendrier annuel des obligations." },
    { question: "Comment organisez-vous et exploitez-vous les entretiens professionnels ?", reponseAttendue: "Cadre de l'article L6315-1 du Code du travail, planning et relances, supports distincts de l'entretien d'évaluation, rythme issu de la loi du 24 octobre 2025 (année suivant l'embauche, puis tous les 4 ans, état des lieux à 8 ans, mi-carrière, avant 60 ans), abondement du CPF dans les entreprises d'au moins 50 salariés, synthèse des souhaits pour la gestion des emplois et des parcours, mise à jour des fiches de postes, confidentialité." },
    { question: "Présentez le profil de poste, l'offre et le plan de sourcing que vous avez réalisés.", reponseAttendue: "Besoin recueilli avec le manager, profil précis et synthétique, offre conforme (français, non-discrimination, pas de limite d'âge, rémunération ou fourchette), canaux de diffusion justifiés, grille de présélection cohérente avec le profil." },
    { question: "Comment conduisez-vous un entretien de recrutement et organisez-vous l'intégration du nouveau collaborateur ?", reponseAttendue: "Guide et grille d'entretien, questions comportementales, posture neutre et bienveillante, synthèse factuelle pour la décision ; information des candidats, réponses, conservation limitée des données ; programme d'intégration avec acteurs, étapes et outils, rapport d'étonnement, suivi de la période d'essai." },
    { question: "Comment contribuez-vous au plan de développement des compétences et au suivi des formations ?", reponseAttendue: "Recueil des besoins, actions obligatoires et non obligatoires, dispositifs (CPF et participation forfaitaire, période de reconversion, projet de transition professionnelle, VAE), calcul des coûts, consultation des organismes de formation, convocations, conventions, émargements, attestations, suivi budgétaire, évaluations à chaud et à froid, information du CSE." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle, 1 = juste.
// Une réponse à 1 dans deux questions seulement (CP1 embauche et CP3 indicateurs) : au plus 6 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — diagnostic de départ
  [
    ["Je sors d'un bac général et je n'ai jamais travaillé en entreprise ; je ne sais pas encore comment est organisé le service RH.", 0],
    ["J'ai un bac pro AGORA ; dans mon entreprise, le service RH compte deux personnes et utilise un logiciel pour les congés, je ne connais pas encore son nom.", 0.5],
    ["J'ai fait un an de licence de droit ; l'entreprise a 180 salariés et la paie est faite par un cabinet comptable, c'est tout ce que je sais.", 0.5],
    ["Pour moi, les RH, c'est surtout recruter des gens, je n'ai pas d'autre idée du métier.", 0],
    ["J'ai travaillé un an comme agent{e} administrat{if} dans une agence d'intérim ; je saisissais les contrats de mission et les relevés d'heures.", 0.5],
    ["Je ne connais pas encore mon entreprise, je commence la semaine prochaine.", 0],
    ["Je suis titulaire d'un BTS SAM ; j'ai fait mon stage dans un service du personnel où je classais les dossiers et préparais les badges.", 0.5],
    ["Je pense que l'assistant RH fait la paie tout seul, c'est pour ça que je suis là.", 0],
    ["Je viens de la vente ; j'ai choisi les RH parce que j'aime le contact, mais je ne connais rien au droit du travail.", 0],
    ["Mon entreprise est une PME de 95 salariés ; la responsable RH m'a présenté le registre du personnel et le planning des entretiens annuels.", 0.5],
    ["Je ne sais pas ce qu'est un SIRH.", 0],
    ["J'ai une licence de psychologie ; j'ai fait passer des entretiens de stage, mais jamais dans un vrai processus de recrutement.", 0.5],
  ],
  // Q2 — CP1 : embauche et dossier du personnel
  [
    ["On fait signer le contrat au salarié le jour où il commence, c'est tout.", 0],
    ["Je crois qu'il faut déclarer l'embauche à l'URSSAF, mais je ne sais pas quand.", 0.5],
    ["Le dossier contient le CV et la photo du salarié, et on le garde dans une armoire.", 0],
    ["Je sais qu'il existe un registre du personnel, sans connaître ce qu'on y écrit.", 0.5],
    ["Il faut déclarer l'embauche par une DPAE avant la prise de poste, inscrire le salarié sur le registre unique du personnel, lui remettre un contrat écrit s'il est en CDD ou à temps partiel, l'affilier à la mutuelle et organiser la visite d'information et de prévention. Le dossier contient le contrat, les avenants, les pièces justificatives et les documents de suivi, avec un accès limité aux personnes habilitées.", 1],
    ["On peut demander au candidat sa situation familiale pour remplir le dossier.", 0],
    ["Je sais qu'il y a une visite médicale à l'embauche, je ne connais pas le délai.", 0.5],
    ["Le contrat de travail doit toujours être écrit, même pour un CDI à temps plein.", 0],
    ["Il faut vérifier la pièce d'identité et, pour un étranger, l'autorisation de travail ; je ne sais pas ce qu'on doit faire ensuite.", 0.5],
    ["Le dossier du personnel peut être consulté par tous les managers.", 0],
    ["Je crois que les dossiers doivent être conservés un certain temps après le départ, je ne sais pas combien.", 0.5],
    ["Je ne connais pas la DPAE.", 0],
  ],
  // Q3 — CP1 : temps de travail, fin de contrat, CSE
  [
    ["Un salarié peut travailler autant d'heures qu'il le veut s'il est d'accord.", 0],
    ["Je sais que la durée légale est de 35 heures par semaine et qu'au-delà ce sont des heures supplémentaires.", 0.5],
    ["Le CSE, c'est le comité qui organise les sorties et les chèques-cadeaux.", 0],
    ["Pour une rupture conventionnelle, je crois qu'il faut une validation de l'administration.", 0.5],
    ["Je ne sais pas ce qu'est un solde de tout compte.", 0],
    ["À la fin d'un CDD, le salarié touche une prime de précarité, je crois de 10 %.", 0.5],
    ["Un salarié qui démissionne n'a droit à aucun document.", 0],
    ["Je sais qu'il y a des élections pour le CSE, mais je ne sais pas qui les organise.", 0.5],
    ["Je ne connais pas les règles de repos entre deux journées de travail.", 0],
    ["On remet un certificat de travail à la fin du contrat ; je ne connais pas les autres documents.", 0.5],
    ["L'indemnité de licenciement est toujours d'un mois de salaire.", 0],
    ["Les absences sont notées dans le logiciel de temps ; je ne sais pas comment elles sont justifiées.", 0.5],
  ],
  // Q4 — CP2 : variables de paie
  [
    ["Le logiciel calcule tout seul, il n'y a rien à transmettre.", 0],
    ["Il faut transmettre les heures supplémentaires et les absences du mois.", 0.5],
    ["Je ne sais pas ce qu'est un élément variable de paie.", 0],
    ["Les congés payés ne changent rien au bulletin.", 0],
    ["Je crois qu'il faut envoyer les arrêts maladie au cabinet qui fait la paie.", 0.5],
    ["Un acompte, c'est une prime donnée en fin d'année.", 0],
    ["On transmet les primes décidées par la direction et les nouveaux salariés du mois.", 0.5],
    ["La paie peut être transmise quand on a le temps, le cabinet s'adapte.", 0],
    ["Je sais qu'il faut un justificatif pour chaque absence, comme un arrêt de travail.", 0.5],
    ["Je n'ai jamais entendu parler de saisie sur salaire.", 0],
    ["Je pense que les informations de paie sont confidentielles et qu'il ne faut pas les laisser traîner.", 0.5],
    ["Les heures supplémentaires sont payées sans majoration.", 0],
  ],
  // Q5 — CP3 : indicateurs et tableau de bord
  [
    ["Le taux d'absentéisme, c'est le nombre de salariés absents ce jour-là.", 0],
    ["Je connais l'effectif et le nombre d'embauches, mais pas d'autres indicateurs.", 0.5],
    ["Je ne sais pas ce qu'est un indicateur RH.", 0],
    ["Le taux d'absentéisme se calcule en divisant les heures d'absence par les heures théoriques de travail, multiplié par 100. On suit aussi l'effectif, les ETP, le turnover et la masse salariale, avec des graphiques adaptés.", 1],
    ["Le turnover, c'est le nombre de démissions de l'année.", 0],
    ["J'ai déjà fait des tableaux sur Excel avec des sommes et des moyennes, sans indicateurs RH.", 0.5],
    ["Un ETP veut dire « en temps partiel ».", 0],
    ["Je sais qu'on peut faire une pyramide des âges, je n'en ai jamais construit.", 0.5],
    ["Les indicateurs servent à surveiller les salariés un par un.", 0],
    ["Je pense que l'absentéisme se mesure en pourcentage, sans connaître la formule.", 0.5],
    ["La masse salariale, c'est le salaire du directeur.", 0],
    ["Je sais faire un graphique en secteurs, mais je ne sais pas lequel choisir selon les données.", 0.5],
  ],
  // Q6 — CP3 : obligations liées à l'effectif
  [
    ["Toutes les entreprises ont les mêmes obligations, quelle que soit leur taille.", 0],
    ["Je sais qu'il existe un index de l'égalité entre les femmes et les hommes, sans savoir qui est concerné.", 0.5],
    ["Je ne connais pas la BDESE.", 0],
    ["Je crois qu'il faut employer un certain pourcentage de personnes handicapées à partir d'une certaine taille.", 0.5],
    ["Le bilan social est obligatoire pour toutes les entreprises.", 0],
    ["Je sais que le CSE existe à partir de 11 salariés.", 0.5],
    ["Ces obligations concernent seulement les entreprises publiques.", 0],
    ["J'ai entendu parler de la CSRD mais je ne sais pas ce que c'est.", 0.5],
    ["Je ne sais pas ce que signifie « effectif » dans ce cas.", 0],
    ["Je pense que l'index égalité doit être publié chaque année, je ne sais pas quand.", 0.5],
    ["Ce sont des obligations de la comptabilité, pas des RH.", 0],
    ["Je sais qu'au-delà de 50 salariés il y a plus d'obligations, sans pouvoir les citer.", 0.5],
  ],
  // Q7 — CP4 : entretien professionnel
  [
    ["C'est la même chose que l'entretien annuel d'évaluation.", 0],
    ["L'entretien professionnel parle de l'avenir du salarié et de ses formations, je crois.", 0.5],
    ["Je ne connais pas l'entretien professionnel.", 0],
    ["Il a lieu une fois tous les dix ans.", 0],
    ["Je sais qu'il doit avoir lieu régulièrement, sans connaître la fréquence.", 0.5],
    ["C'est le moment où le manager fixe les objectifs et la prime.", 0],
    ["On y parle de formation, de mobilité et de VAE ; je ne connais pas la fréquence.", 0.5],
    ["Il n'est obligatoire que pour les cadres.", 0],
    ["Je sais qu'on remet un compte rendu au salarié, sans en connaître le contenu.", 0.5],
    ["Le salarié peut refuser, donc ce n'est pas important de l'organiser.", 0],
    ["Je crois qu'il existe une sanction si l'entreprise ne les fait pas, sans savoir laquelle.", 0.5],
    ["L'assistant RH n'intervient pas dans les entretiens.", 0],
  ],
  // Q8 — CP5 : profil de poste et offre
  [
    ["Je copierais une offre trouvée sur internet pour aller plus vite.", 0],
    ["Je demanderais au manager les missions du poste et le profil recherché avant d'écrire l'offre.", 0.5],
    ["On peut écrire « jeune et dynamique » pour attirer des candidats motivés.", 0],
    ["Je diffuserais l'offre sur Indeed et sur le site de France Travail.", 0.5],
    ["Je ne sais pas ce qu'est un profil de poste.", 0],
    ["On peut préciser qu'on cherche plutôt un homme pour un poste physique.", 0],
    ["Je sais qu'une offre ne doit pas être discriminatoire, sans connaître toutes les règles.", 0.5],
    ["L'offre peut être rédigée en anglais pour tous les postes.", 0],
    ["J'indiquerais le type de contrat, le lieu, les horaires et le salaire.", 0.5],
    ["Je diffuserais uniquement sur les réseaux sociaux personnels des salariés.", 0],
    ["Je ne sais pas ce qu'est un jobboard.", 0],
    ["Je préparerais une liste de critères pour trier les CV, comme l'expérience et les diplômes demandés.", 0.5],
  ],
  // Q9 — CP5 : entretien et intégration
  [
    ["Je poserais les questions qui me viennent selon le candidat.", 0],
    ["Je préparerais une liste de questions sur le parcours et les motivations du candidat.", 0.5],
    ["On peut demander au candidat s'il a des enfants pour savoir s'il sera disponible.", 0],
    ["J'organiserais un pot d'accueil le premier jour, c'est l'essentiel.", 0],
    ["Je sais qu'il faut prévenir les candidats non retenus, je ne sais pas comment conserver leurs données.", 0.5],
    ["On garde tous les CV reçus sans limite de durée au cas où.", 0],
    ["Je préparerais le poste de travail, les accès et un livret d'accueil pour le nouvel arrivant.", 0.5],
    ["Je ne sais pas ce qu'est une grille d'évaluation.", 0],
    ["Je pense qu'il faut noter les réponses du candidat pour comparer ensuite.", 0.5],
    ["L'intégration, c'est le travail du manager, pas des RH.", 0],
    ["Je prévoirais un point avec le nouveau salarié avant la fin de sa période d'essai.", 0.5],
    ["Je ne sais pas ce qu'on doit vérifier avant le premier jour.", 0],
  ],
  // Q10 — CP6 : développement des compétences
  [
    ["Les salariés choisissent leurs formations seuls, sans passer par les RH.", 0],
    ["Je sais qu'il existe un compte personnel de formation, le CPF.", 0.5],
    ["Je ne connais aucun dispositif de formation.", 0],
    ["Toutes les formations sont payées par l'État.", 0],
    ["On peut demander aux managers les besoins de formation de leur équipe.", 0.5],
    ["Je sais que l'OPCO peut financer certaines formations, sans savoir lesquelles.", 0.5],
    ["Une formation obligatoire se fait en dehors du temps de travail.", 0],
    ["Je sais qu'il y a un plan de formation dans les entreprises, je ne sais pas comment il est construit.", 0.5],
    ["Je n'ai jamais entendu parler de la VAE.", 0],
    ["Après une formation, on fait remplir un questionnaire de satisfaction aux participants.", 0.5],
    ["Le CPF peut être utilisé sans aucun reste à charge pour tout le monde.", 0],
    ["Je ne sais pas comment se calcule le coût d'une formation.", 0],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  // Q1 — diagnostic et progression
  [
    ["Au départ je ne connaissais que le classement des dossiers ; aujourd'hui je réalise seul{e} les formalités d'embauche, je prépare les variables de paie et je tiens le tableau de bord mensuel. Il me reste à gagner en aisance sur le plan de développement des compétences.", 1],
    ["Mon diagnostic montrait des bases en bureautique mais aucune en droit social ; j'ai travaillé chaque CP au CFA puis en entreprise, et mon dossier professionnel présente une situation par compétence.", 1],
    ["Ma progression la plus nette concerne la paie : je contrôle maintenant les absences et les congés avant chaque transmission au cabinet.", 1],
    ["Je sais situer mon niveau sur chaque compétence ; le recrutement reste mon point faible, je n'ai mené que deux entretiens.", 0.5],
    ["J'ai relié mes missions en entreprise aux six compétences du titre : embauches, variables de paie, indicateurs, entretiens professionnels, recrutement et formation.", 1],
    ["J'ai appris à vérifier la source juridique avant de répondre à un salarié, grâce à la veille faite chaque semaine.", 1],
    ["Je suis plus rigour{eux} et j'ai pris l'habitude de contrôler mes saisies ; il me reste à travailler la rédaction de notes de synthèse.", 0.5],
    ["Mes ECF des deux CCP sont validées et ma MSP blanche m'a montré qu'il fallait mieux gérer mon temps sur 3 h 30.", 1],
    ["Je réponds maintenant aux questions des salariés sur leurs congés et leurs absences en m'appuyant sur le Code du travail et la convention collective.", 1],
    ["Mon tuteur me confie désormais les DPAE et la mise à jour du registre unique du personnel en autonomie.", 1],
    ["Je maîtrise mieux les outils (SIRH, tableur), même si je dois encore progresser sur les tableaux croisés dynamiques.", 0.5],
    ["Mon objectif de départ était de comprendre la paie ; je l'ai atteint et j'ai découvert que j'aimais aussi la formation.", 1],
  ],
  // Q2 — CP1 : embauche et dossier du personnel
  [
    ["Je fais la DPAE sur net-entreprises au plus tôt 8 jours avant l'embauche et toujours avant la prise de poste, puis j'inscris le salarié au registre unique du personnel.", 1],
    ["Pour un CDD, je vérifie le motif précis, le terme, la période d'essai et je transmets le contrat au plus tard dans les 2 jours ouvrables suivant l'embauche.", 1],
    ["Pour un temps partiel, le contrat écrit précise la durée hebdomadaire, sa répartition entre les jours de la semaine et les limites des heures complémentaires.", 1],
    ["Le dossier individuel est numérisé dans le SIRH, avec un accès réservé au service RH ; les données sont conservées pendant des durées définies, puis supprimées.", 1],
    ["J'organise la visite d'information et de prévention dans les 3 mois suivant la prise de poste.", 1],
    ["Je fais signer la demande écrite de dispense de mutuelle lorsque le salarié est dans un cas prévu par les textes ; sinon je l'affilie dès l'embauche.", 1],
    ["Je vérifie l'autorisation de travail des salariés étrangers avant l'embauche, comme l'exige la réglementation.", 1],
    ["Le registre unique du personnel est conservé 5 ans après le départ du salarié.", 1],
    ["Je fais toutes les formalités, mais je dois encore relire les mentions obligatoires du contrat avec ma tutrice.", 0.5],
    ["Je ne collecte que les informations qui ont un lien direct avec l'emploi, conformément au RGPD.", 1],
    ["J'utilise une check-list d'embauche qui reprend chaque formalité avec son échéance.", 1],
    ["Je remets au salarié les informations sur les éléments essentiels de sa relation de travail dans les délais prévus.", 1],
  ],
  // Q3 — CP1 : temps de travail, fin de contrat, CSE
  [
    ["Je contrôle les durées maximales : 10 h par jour, 48 h sur une semaine et 44 h en moyenne sur 12 semaines, avec 11 h de repos quotidien.", 1],
    ["Pour l'indemnité légale de licenciement, je compte 1/4 de mois de salaire par année jusqu'à 10 ans, puis 1/3 au-delà, sur le salaire de référence le plus favorable.", 1],
    ["Pour une rupture conventionnelle, je respecte le délai de rétractation de 15 jours calendaires puis je fais la demande d'homologation sur TéléRC.", 1],
    ["À la sortie, je prépare le certificat de travail, le reçu pour solde de tout compte et l'attestation France Travail transmise par la DSN.", 1],
    ["Pour les élections du CSE, j'informe le personnel, j'invite les syndicats à négocier le protocole préélectoral et je prépare les listes électorales.", 1],
    ["Je sais calculer l'indemnité, mais je vérifie toujours la convention collective, qui peut être plus favorable.", 1],
    ["Depuis la loi du 22 avril 2024, un salarié en arrêt maladie acquiert 2 jours ouvrables de congés payés par mois, dans la limite de 24 jours.", 1],
    ["Je suis les heures supplémentaires de chaque salarié par rapport au contingent annuel.", 1],
    ["Je prépare les dossiers de consultation du CSE à partir des informations fournies par la direction.", 1],
    ["Je connais les documents de fin de contrat ; le calcul des indemnités me demande encore de l'aide.", 0.5],
    ["Le reçu pour solde de tout compte peut être dénoncé dans les 6 mois suivant sa signature.", 1],
    ["Les absences sont saisies dans le SIRH avec leur justificatif, puis contrôlées avant la paie.", 1],
  ],
  // Q4 — CP2 : variables de paie
  [
    ["Je tiens un tableau des variables du mois avec, pour chaque ligne, le justificatif et la date de réception.", 1],
    ["Avant la transmission au cabinet, je compare les absences du SIRH avec les justificatifs et les plannings.", 1],
    ["Pour un arrêt maladie, je fais le signalement en DSN pour l'attestation de salaire et je vérifie les règles de maintien de salaire.", 1],
    ["Je vérifie que l'acompte versé est bien déduit sur le bulletin du mois.", 1],
    ["Une saisie des rémunérations est transmise au gestionnaire de paie, qui applique le barème des quotités saisissables.", 1],
    ["Je contrôle les entrées et sorties du mois pour que les salaires soient calculés au prorata.", 1],
    ["Je respecte le calendrier de paie : variables transmises avant la date fixée, contrôle des bulletins, puis DSN le 5 du mois suivant.", 1],
    ["Je classe les dossiers de paie dans un espace protégé, accessible au seul service RH et paie.", 1],
    ["Je transmets les variables à temps, mais je dois encore apprendre à contrôler les bulletins reçus.", 0.5],
    ["Je vérifie les majorations des heures supplémentaires : 25 % pour les 8 premières, 50 % au-delà, sauf accord.", 1],
    ["Je fais valider les primes exceptionnelles par la direction avant de les transmettre.", 1],
    ["Je contrôle les dates de congés payés posées et le solde de chaque salarié.", 1],
  ],
  // Q5 — CP3 : tableau de bord
  [
    ["Mon tableau de bord suit l'effectif, les ETP, les entrées et sorties, le turnover et l'absentéisme, avec la formule et la source de chaque indicateur.", 1],
    ["Le taux d'absentéisme est égal aux heures d'absence divisées par les heures théoriques, multiplié par 100.", 1],
    ["J'ai choisi une courbe pour l'évolution mensuelle de l'absentéisme et un histogramme pour la pyramide des âges.", 1],
    ["Le turnover se calcule avec la moyenne des entrées et des sorties divisée par l'effectif moyen.", 1],
    ["J'ai rédigé une note de synthèse pour la direction qui commente les écarts significatifs.", 1],
    ["Je contrôle la cohérence des résultats avant diffusion, par exemple l'effectif du SIRH par rapport à la DSN.", 1],
    ["Les données nominatives restent dans le fichier source ; le tableau diffusé ne contient que des données agrégées.", 1],
    ["J'adapte les indicateurs au destinataire : la direction, les managers ou le CSE n'ont pas les mêmes besoins.", 1],
    ["Je sais calculer les indicateurs ; le commentaire écrit me demande encore du temps.", 0.5],
    ["J'ai automatisé la mise à jour mensuelle à partir de l'export du SIRH.", 1],
    ["J'ai calculé l'ETP en rapportant la durée du contrat de chaque salarié à la durée de référence.", 1],
    ["J'ai suivi la masse salariale par mois pour repérer les écarts par rapport au budget.", 1],
  ],
  // Q6 — CP3 : obligations liées à l'effectif
  [
    ["L'index de l'égalité professionnelle est publié au plus tard le 1er mars dans les entreprises d'au moins 50 salariés.", 1],
    ["Sous 75 points, l'entreprise doit prendre des mesures de correction ; sous 85 points, elle fixe des objectifs de progression.", 1],
    ["La BDESE est obligatoire dès 50 salariés et alimente les consultations du CSE.", 1],
    ["L'obligation d'emploi des travailleurs handicapés est de 6 % de l'effectif dès 20 salariés, déclarée en DSN.", 1],
    ["Le bilan social ne concerne que les entreprises d'au moins 300 salariés.", 1],
    ["Je suis la transposition de la directive européenne sur la transparence des rémunérations, attendue au plus tard le 7 juin 2026.", 1],
    ["J'ai construit un calendrier annuel des obligations RH avec les échéances et les responsables.", 1],
    ["La CSRD dépend de seuils et a été reportée pour une partie des entreprises en 2025 ; je vérifie si mon entreprise est concernée.", 1],
    ["Je connais les seuils principaux ; je dois encore préparer seul{e} les indicateurs de l'index.", 0.5],
    ["Les informations de la BDESE sont mises à jour à partir des indicateurs du tableau de bord.", 1],
    ["Je vérifie l'effectif selon les règles de calcul applicables avant de conclure qu'une obligation s'applique.", 1],
    ["Je prépare les données de l'index à partir de la paie, puis je fais vérifier le calcul par la responsable RH.", 1],
  ],
  // Q7 — CP4 : entretiens professionnels
  [
    ["Depuis la loi du 24 octobre 2025, l'entretien de parcours professionnel a lieu dans l'année suivant l'embauche puis tous les 4 ans ; il porte sur les perspectives d'évolution, pas sur l'évaluation du travail.", 1],
    ["Au bout de 8 ans, un état des lieux récapitulatif vérifie le parcours du salarié.", 1],
    ["Dans les entreprises d'au moins 50 salariés, un abondement de 3 000 € sur le CPF est dû si les conditions ne sont pas remplies.", 1],
    ["J'ai construit le planning des entretiens dans le SIRH avec des relances automatiques aux managers.", 1],
    ["Le compte rendu est remis au salarié et conservé dans son dossier, avec un accès limité.", 1],
    ["J'ai fait une synthèse des souhaits de formation et de mobilité pour la responsable RH.", 1],
    ["Je planifie aussi l'entretien de mi-carrière, dans les 2 mois suivant la visite médicale des 45 ans, et l'entretien dans les 2 ans précédant les 60 ans.", 1],
    ["J'ai mis à jour les fiches de postes après les entretiens, à la demande des managers.", 1],
    ["Je sais organiser les entretiens ; l'exploitation des comptes rendus reste à améliorer.", 0.5],
    ["J'ai préparé deux supports distincts : l'entretien professionnel et l'entretien d'évaluation.", 1],
    ["J'informe les salariés des dispositifs abordés : VAE, bilan de compétences, CPF, conseil en évolution professionnelle.", 1],
    ["J'ai rédigé une note aux managers pour rappeler le cadre et la confidentialité des échanges.", 1],
  ],
  // Q8 — CP5 : profil de poste, offre, sourcing
  [
    ["Je commence par un entretien avec le manager pour recueillir le besoin : missions, compétences, conditions, échéance.", 1],
    ["Le profil de poste est court et précis : missions, compétences requises, conditions d'exercice, rattachement.", 1],
    ["L'offre est rédigée en français, sans critère discriminatoire ni limite d'âge, avec le contrat, le lieu, les horaires et la rémunération.", 1],
    ["J'ai choisi les canaux selon le poste : France Travail et Indeed pour les agents, LinkedIn et la cooptation pour l'encadrement.", 1],
    ["Ma grille de présélection reprend les critères du profil de poste, avec des critères indispensables et souhaités.", 1],
    ["Je prépare l'entreprise à l'information sur la rémunération demandée par la directive sur la transparence salariale.", 1],
    ["Je vérifie chaque offre avant publication pour éviter toute mention discriminatoire.", 1],
    ["J'ai suivi les candidatures dans un tableau de bord par canal pour mesurer leur efficacité.", 1],
    ["Je rédige bien l'offre ; le choix des canaux me demande encore l'avis de ma tutrice.", 0.5],
    ["J'ai adapté le vocabulaire de l'offre au public visé pour qu'elle soit lisible.", 1],
    ["Je transmets l'offre aux salariés pour la cooptation, selon la procédure interne.", 1],
    ["Je ne demande que les informations utiles pour apprécier les compétences du candidat.", 1],
  ],
  // Q9 — CP5 : entretien et intégration
  [
    ["J'utilise un guide d'entretien identique pour tous les candidats et une grille d'évaluation reliée au profil.", 1],
    ["Je pose des questions comportementales sur des situations vécues pour évaluer les compétences.", 1],
    ["Je rédige une synthèse factuelle de chaque entretien pour faciliter la décision du manager.", 1],
    ["Je réponds à tous les candidats et je ne conserve leurs données que pendant la durée autorisée.", 1],
    ["Le programme d'intégration prévoit les acteurs, les étapes et les outils, du jour d'arrivée à la fin de la période d'essai.", 1],
    ["Je prépare le livret d'accueil, les accès et la formation pratique à la sécurité du nouvel arrivant.", 1],
    ["Je fais un point d'étape avec le nouveau collaborateur et son manager avant la fin de la période d'essai.", 1],
    ["Je reste neutre et bienveillant{e} pendant l'entretien, sans question sur la vie privée.", 1],
    ["Je mène les entretiens avec la grille ; la synthèse écrite doit encore gagner en concision.", 0.5],
    ["Je recueille un rapport d'étonnement après quelques semaines pour améliorer l'accueil.", 1],
    ["J'informe les candidats des méthodes de recrutement utilisées avant leur mise en œuvre.", 1],
    ["J'organise la logistique : convocations, salles ou visioconférence, remboursement éventuel des frais.", 1],
  ],
  // Q10 — CP6 : développement des compétences
  [
    ["Je recueille les besoins à partir des entretiens professionnels, des demandes des managers et des obligations réglementaires.", 1],
    ["Le plan distingue les actions obligatoires, qui sont du temps de travail effectif, et les autres actions.", 1],
    ["Je calcule le coût complet d'une action : coût pédagogique, salaires maintenus et frais annexes.", 1],
    ["Pour un projet de reconversion, j'oriente le salarié vers le projet de transition professionnelle géré par Transitions Pro.", 1],
    ["Depuis le 2 mai 2024, le titulaire du CPF paie une participation forfaitaire, sauf exceptions comme l'abondement de l'employeur.", 1],
    ["J'envoie les convocations, je fais signer les émargements et je récupère les attestations de fin de formation.", 1],
    ["J'ai construit un questionnaire d'évaluation à chaud et un questionnaire à froid à trois mois.", 1],
    ["Je suis le budget de formation par action et je signale les écarts.", 1],
    ["Je sais monter le dossier d'une action ; le choix du dispositif reste plus difficile pour moi.", 0.5],
    ["Pour une VAE, j'informe le salarié sur le service public France VAE.", 1],
    ["Je compare plusieurs organismes de formation avant de proposer une action au manager.", 1],
    ["Je prépare les informations sur la formation pour la consultation du CSE sur la politique sociale.", 1],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [19, 34, 51, 34, 44, 29, 50, 1, 15, 48];

export function getARH41366AutoAnswers(
  nom: string | undefined,
  prenom: string | undefined,
  civilite: string | undefined,
  isDebut: boolean,
  nbQuestions = 10,
  idx?: number,
): { reponses: string[]; scores: number[] } {
  const base = baseIndex(idx, nom, prenom);
  const fem = isFeminin(civilite, prenom);
  const bank = isDebut ? DEBUT : FIN;

  // Au début, chaque question a son propre décalage de permutation (SEL_DEBUT) : les réponses
  // restent toutes différentes à la même question, et la note varie d'un apprenti à l'autre
  // (jamais au-dessus de 6 / 10).
  const reponses: string[] = [];
  const scores: number[] = [];
  for (let q = 0; q < nbQuestions; q++) {
    const pool = bank[q % bank.length];
    const sel = isDebut ? SEL_DEBUT[q % SEL_DEBUT.length] : q + 5;
    const [txt, score] = pool[rang(base, sel, pool.length)];
    reponses.push(accorder(txt, fem));
    scores.push(score);
  }
  return { reponses, scores };
}

/**
 * Note du QCM de positionnement de DÉBUT, sur 20 : jamais au-dessus de 12, et différente pour
 * 8 apprentis consécutifs (rang dans la session, sinon empreinte du nom).
 */
const NOTES_DEBUT_SUR_20 = [10, 7, 12, 8, 5, 11, 6, 9];
export function arh41366NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6, soit 4 à 12/20). */
export function arh41366BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((arh41366NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `arh41366BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function arh41366ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = arh41366BonnesQcmDebut(n, idx, nom, prenom);
  const base = baseIndex(idx, nom, prenom);
  const justes = new Set<number>();
  for (let k = 0; justes.size < bonnes && k < n * 4; k++) justes.add(rang(base + k, 47, n));
  return questions.map((q, qi) => {
    if (justes.has(qi)) return q.correctIndex;
    const fausses = q.options.map((_, i) => i).filter(i => i !== q.correctIndex);
    return fausses[rang(base, qi + 3, fausses.length)];
  });
}

/**
 * Notes des exercices, différentes d'un apprenti à l'autre pour un même exercice :
 * QCM sur 10 (5 à 10), mise en situation sur 5 (2,5 à 5).
 */
const NOTES_QCM_SUR_10 = [8, 6, 9, 7, 10, 5];
const NOTES_EXERCICE_SUR_5 = [4, 3, 4.5, 3.5, 5, 2.5];
export function arh41366NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par apprenti : besoin principal (analyse des besoins),
// objectif et projet (partie apprenti), attentes, missions et contribution (partie entreprise).
// Public : apprentis de 16 à 29 ans en contrat d'apprentissage dans une entreprise dotée d'une
// fonction RH ; financement par l'OPCO de l'employeur (NPEC du RNCP41366).
// ---------------------------------------------------------------------------
interface ProfilBesoin {
  besoin: string;
  objectif: string;
  projet: string;
  attentes: string;
  missions: string;
  contribution: string;
}

const PROFILS: ProfilBesoin[] = [
  {
    besoin: "Acquérir les bases du droit social pour sécuriser les formalités d'embauche et la tenue des dossiers du personnel que l'on me confie.",
    objectif: "Je veux obtenir le titre professionnel d'assistant{e} ressources humaines et devenir autonome sur l'administration du personnel.",
    projet: "Il me permettra d'être recruté{e} à l'issue de mon contrat comme assistant{e} RH dans mon entreprise ou une entreprise du même secteur.",
    attentes: "L'entreprise attend que {le_sal} réalise les DPAE, les contrats et la mise à jour des dossiers sans erreur et dans les délais.",
    missions: "Formalités d'embauche, mise à jour du registre unique du personnel et des dossiers individuels, accueil administratif des nouveaux salariés.",
    contribution: "La formation doit fiabiliser l'administration du personnel d'une PME industrielle qui recrute une trentaine de personnes par an.",
  },
  {
    besoin: "Comprendre les éléments variables de paie et les contrôler avant leur transmission au cabinet qui établit les bulletins.",
    objectif: "Mon objectif est de maîtriser la collecte des variables de paie et la gestion des absences, puis d'évoluer vers un poste d'assistant{e} RH et paie.",
    projet: "Il m'aidera à préparer ensuite une spécialisation en paie.",
    attentes: "La clinique attend {un} {collab} capable de préparer chaque mois des variables de paie fiables pour 180 salariés en horaires décalés.",
    missions: "Saisie des absences et des congés, collecte des heures supplémentaires et des primes, préparation des fichiers transmis au cabinet comptable.",
    contribution: "Elle doit réduire les erreurs de paie liées aux plannings et aux absences.",
  },
  {
    besoin: "Construire des indicateurs RH fiables et les présenter clairement à la direction.",
    objectif: "Je souhaite savoir construire un tableau de bord RH complet et rédiger des notes d'analyse utiles à la décision.",
    projet: "Il me permettra d'évoluer vers un poste de chargé{e} de reporting social.",
    attentes: "Le réseau de magasins attend un suivi mensuel de l'absentéisme et du turnover par magasin, avec des commentaires exploitables.",
    missions: "Extraction des données du SIRH, mise à jour des tableaux de bord, préparation des indicateurs pour les réunions de direction.",
    contribution: "Elle doit doter l'entreprise d'un pilotage social aujourd'hui fait à la main par chaque magasin.",
  },
  {
    besoin: "Participer au recrutement des compagnons et des chefs de chantier, de l'offre d'emploi à l'intégration.",
    objectif: "Mon objectif est de maîtriser toutes les étapes du recrutement et de l'intégration, dans le respect de la non-discrimination.",
    projet: "Il m'aidera à devenir chargé{e} de recrutement dans le secteur du bâtiment.",
    attentes: "L'entreprise attend {un} {collab} capable de diffuser les offres, de présélectionner les candidatures et d'organiser l'accueil des nouveaux arrivants.",
    missions: "Rédaction et diffusion des offres, tri des candidatures, organisation des entretiens, préparation des dossiers d'accueil et de sécurité.",
    contribution: "Elle doit raccourcir les délais de recrutement sur des métiers en tension.",
  },
  {
    besoin: "Organiser les entretiens professionnels et suivre les souhaits d'évolution de salariés répartis sur de nombreux domiciles d'intervention.",
    objectif: "Je veux savoir planifier et exploiter les entretiens professionnels et contribuer à la gestion des emplois et des parcours.",
    projet: "Il me permettra de devenir gestionnaire des emplois et des carrières dans le secteur médico-social.",
    attentes: "L'association attend que {le_sal} rattrape le retard des entretiens professionnels et suive les demandes de formation.",
    missions: "Planification des entretiens, relances aux responsables de secteur, saisie des comptes rendus, suivi des demandes de VAE.",
    contribution: "Elle doit permettre à l'association de respecter ses obligations et de fidéliser ses intervenants.",
  },
  {
    besoin: "Comprendre la réglementation sociale pour répondre aux questions des clients du cabinet sur l'embauche et les absences.",
    objectif: "Mon objectif est de maîtriser l'administration du personnel et les variables de paie pour plusieurs entreprises clientes.",
    projet: "Il m'aidera à évoluer vers un poste de gestionnaire de paie et d'administration du personnel en cabinet.",
    attentes: "Le cabinet attend {un} {collab} fiable sur la collecte des variables et les formalités d'embauche de ses clients.",
    missions: "Collecte des variables auprès des clients, préparation des DPAE, mise à jour des fiches salariés, classement des justificatifs.",
    contribution: "Elle doit soulager les gestionnaires de paie pendant les pics de fin de mois.",
  },
  {
    besoin: "Gérer le suivi des formations obligatoires des conducteurs et préparateurs de commandes.",
    objectif: "Je souhaite maîtriser le plan de développement des compétences, les dispositifs de formation et le suivi administratif des actions.",
    projet: "Il me permettra de devenir assistant{e} formation dans une entreprise de transport et de logistique.",
    attentes: "L'entreprise attend que {le_sal} assure le suivi des échéances de formation obligatoire et la logistique des sessions.",
    missions: "Suivi des échéances de formation obligatoire, convocations, émargements, relations avec les organismes de formation.",
    contribution: "Elle doit éviter les ruptures d'habilitation qui bloquent l'activité.",
  },
  {
    besoin: "Structurer l'accueil et l'intégration de saisonniers et d'extras dans un hôtel où le turnover est élevé.",
    objectif: "Mon objectif est de construire un parcours d'intégration et de suivre les indicateurs de turnover de l'établissement.",
    projet: "Il m'aidera à devenir assistant{e} RH dans l'hôtellerie de luxe.",
    attentes: "L'hôtel attend {un} {collab} capable d'organiser les embauches, l'accueil et le suivi des contrats courts.",
    missions: "Contrats courts et DPAE, livrets d'accueil, planning des visites d'information et de prévention, suivi du turnover.",
    contribution: "Elle doit améliorer la fidélisation des équipes et réduire les départs pendant la période d'essai.",
  },
  {
    besoin: "Préparer les obligations liées à l'effectif : index de l'égalité, BDESE et obligation d'emploi des travailleurs handicapés.",
    objectif: "Je veux savoir préparer les données de l'index et de la BDESE et suivre les nouvelles règles sur la transparence des rémunérations.",
    projet: "Il me permettra de me spécialiser dans les données sociales et le reporting.",
    attentes: "L'entreprise de services numériques attend des données sociales fiables pour ses publications et ses consultations du CSE.",
    missions: "Préparation des indicateurs de l'index, mise à jour de la BDESE, suivi de l'obligation d'emploi des travailleurs handicapés.",
    contribution: "Elle doit sécuriser les publications obligatoires de l'entreprise.",
  },
  {
    besoin: "Me reconvertir vers les ressources humaines après une première expérience dans la vente, en acquérant des bases solides.",
    objectif: "Mon objectif est d'obtenir le titre et de trouver ma place dans un service RH, en commençant par le recrutement.",
    projet: "Il m'aidera à changer de métier durablement.",
    attentes: "L'agence d'emploi attend {un} {collab} capable de présélectionner les candidats et de gérer les formalités des contrats de mission.",
    missions: "Présélection de candidats, préparation des contrats de mission, relevés d'heures, accueil des intérimaires.",
    contribution: "Elle doit renforcer l'agence sur la gestion administrative des intérimaires.",
  },
  {
    besoin: "Comprendre le rôle du CSE et préparer les dossiers d'information et de consultation qui me sont confiés.",
    objectif: "Je souhaite maîtriser les relations avec les représentants du personnel et la préparation des élections professionnelles.",
    projet: "Il me permettra d'évoluer vers un poste de chargé{e} des relations sociales.",
    attentes: "L'entreprise attend que {le_sal} prépare les élections du CSE et les documents des réunions.",
    missions: "Préparation des ordres du jour et des documents du CSE, suivi des heures de délégation, mise à jour de l'affichage obligatoire.",
    contribution: "Elle doit sécuriser le calendrier social de l'entreprise.",
  },
  {
    besoin: "Adapter l'accueil et les postes de travail des salariés en situation de handicap et suivre leur maintien dans l'emploi.",
    objectif: "Mon objectif est de maîtriser l'administration du personnel en intégrant le suivi de l'obligation d'emploi et les aménagements de poste.",
    projet: "Il m'aidera à devenir référent{e} handicap au sein d'un service RH.",
    attentes: "L'entreprise attend un suivi rigoureux des reconnaissances de handicap et des aménagements demandés par la médecine du travail.",
    missions: "Suivi des RQTH, relations avec le service de prévention et de santé au travail, préparation de la déclaration annuelle.",
    contribution: "Elle doit améliorer le maintien dans l'emploi et le taux d'emploi des travailleurs handicapés.",
  },
];

/** Profil de l'apprenti : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilARH41366(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

const remplirProfil = (txt: string, fem: boolean) =>
  accorder(
    txt
      .replace(/\{un\}/g, fem ? "une" : "un")
      .replace(/\{collab\}/g, fem ? "collaboratrice" : "collaborateur")
      .replace(/\{le_sal\}/g, fem ? "l'apprentie" : "l'apprenti"),
    fem,
  );

export function getARH41366Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return remplirProfil(profilARH41366(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production écrite de l'apprenti (fil rouge ALTÉA SERVICES)
// Indices : 0 diagnostic, 1 CP1 embauche, 2 CP1 temps / fin de contrat / CSE, 3 CP2 variables,
//           4 CP3 tableau de bord, 5 CP3 obligations, 6 CP4 entretiens, 7 CP5 offre,
//           8 CP5 entretien et intégration, 9 CP6 développement des compétences ; 8 productions par banque.
// La k-ième production de chaque banque suit le même terrain (entreprise d'accueil fictive) :
//   0 PME industrielle de mécanique, Meaux (210 salariés) · 1 clinique privée, Créteil (180 salariés)
//   2 réseau de magasins de bricolage, Évry (160 salariés) · 3 entreprise du BTP, Nanterre (95 salariés)
//   4 association d'aide à domicile, Melun (120 salariés) · 5 cabinet d'expertise comptable, Vincennes (40 salariés)
//   6 transport et logistique, Roissy (230 salariés) · 7 hôtel, Paris 15e (85 salariés)
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Diagnostic de départ
  [
    "Titulaire d'un bac STMG, je suis apprenti{e} dans une PME de mécanique de précision à Meaux (210 salariés, convention collective de la métallurgie). Le service RH compte trois personnes ; la paie est faite en interne. On m'a déjà confié le classement des dossiers et la préparation des badges. Autoévaluation : CP1 2/4, CP2 1/4, CP3 2/4, CP4 1/4, CP5 2/4, CP6 1/4. Forces : rigueur, aisance sur Excel, discrétion. Vigilance : droit social, paie, prise de parole. Objectifs : réaliser seul{e} les formalités d'embauche d'ici trois mois, réussir l'ECF du CCP1, constituer mon dossier professionnel au fil de l'année.",
    "J'ai un BTS SAM et je suis apprenti{e} dans une clinique privée de Créteil (180 salariés, travail en horaires décalés). La paie est externalisée chez un cabinet ; le service RH utilise un logiciel de planning. Je saisis les absences et je prépare les dossiers des remplaçants. Autoévaluation : CP1 2/4, CP2 2/4, CP3 1/4, CP4 1/4, CP5 1/4, CP6 1/4. Forces : organisation, contact avec les soignants. Vigilance : règles sur les absences et les congés, calcul des indicateurs. Objectifs : fiabiliser les variables de paie, comprendre les plannings en 12 heures, préparer le CCP1.",
    "Après un bac pro commerce, je suis apprenti{e} au siège d'un réseau de 12 magasins de bricolage à Évry (160 salariés). Le service RH est centralisé et chaque magasin envoie ses absences par mail. On me confie la mise à jour du fichier du personnel. Autoévaluation : CP1 1/4, CP2 1/4, CP3 2/4, CP4 1/4, CP5 2/4, CP6 1/4. Forces : tableaux Excel, relation avec les magasins. Vigilance : réglementation, rédaction. Objectifs : construire un tableau de bord mensuel par magasin, sécuriser les embauches saisonnières, valider les deux CCP.",
    "Je suis titulaire d'un bac général et d'une première année de licence de droit ; je suis apprenti{e} dans une entreprise du BTP à Nanterre (95 salariés, conventions du bâtiment). La responsable RH gère seule le personnel ; elle m'a confié les offres d'emploi et l'accueil sécurité des nouveaux. Autoévaluation : CP1 2/4, CP2 1/4, CP3 1/4, CP4 1/4, CP5 2/4, CP6 2/4. Forces : bases juridiques, aisance à l'écrit. Vigilance : paie, tableur. Objectifs : maîtriser le recrutement des compagnons, suivre les formations sécurité, réussir la mise en situation de 3 h 30.",
    "Apprenti{e} dans une association d'aide à domicile à Melun (120 salariés, beaucoup de temps partiels), je travaille avec la responsable RH et deux responsables de secteur. On m'a confié la planification des entretiens professionnels, très en retard. J'ai un bac ST2S. Autoévaluation : CP1 1/4, CP2 1/4, CP3 1/4, CP4 2/4, CP5 1/4, CP6 2/4. Forces : écoute, organisation. Vigilance : droit du travail, indicateurs. Objectifs : rattraper les entretiens professionnels, suivre les demandes de VAE des intervenants, préparer le CCP2.",
    "J'ai un bac pro AGORA et je suis apprenti{e} au service social d'un cabinet d'expertise comptable à Vincennes (40 salariés) qui gère la paie et l'administration du personnel de 70 entreprises clientes. Je collecte les variables et je prépare des DPAE. Autoévaluation : CP1 2/4, CP2 2/4, CP3 1/4, CP4 1/4, CP5 1/4, CP6 1/4. Forces : rapidité de saisie, rigueur. Vigilance : diversité des conventions collectives des clients, indicateurs. Objectifs : maîtriser les contrôles de variables, comprendre les fins de contrat, valider le CCP1.",
    "Je suis apprenti{e} dans une entreprise de transport et de logistique à Roissy (230 salariés, conducteurs et préparateurs de commandes). Je suis rattaché{e} à l'assistante formation : suivi des formations obligatoires des conducteurs et des autorisations de conduite des chariots. J'ai un BTS GPME. Autoévaluation : CP1 2/4, CP2 1/4, CP3 2/4, CP4 1/4, CP5 1/4, CP6 2/4. Forces : suivi des échéances, Excel. Vigilance : paie, entretien de recrutement. Objectifs : construire le plan de formation de l'année, suivre les échéances, réussir l'ECF du CCP2.",
    "Après une expérience de serv{eur} saisonni{er}, je suis apprenti{e} dans un hôtel 4 étoiles à Paris 15e (85 salariés, nombreux contrats courts et extras). Je prépare les contrats, les DPAE et les livrets d'accueil. Autoévaluation : CP1 2/4, CP2 1/4, CP3 1/4, CP4 1/4, CP5 2/4, CP6 1/4. Forces : connaissance des métiers de l'hôtellerie, contact. Vigilance : réglementation des CDD et des extras, indicateurs. Objectifs : sécuriser les contrats courts, construire un parcours d'intégration, suivre le turnover.",
  ],
  // 1 — CP1 : embauche et dossier du personnel (M. Yanis CHÉRIF chez ALTÉA SERVICES)
  [
    "Formalités pour M. CHÉRIF : DPAE sur net-entreprises au plus tôt 8 jours avant le 2 novembre et avant sa prise de poste ; inscription au registre unique du personnel le jour de l'embauche ; contrat CDD écrit remis au plus tard dans les 2 jours ouvrables ; affiliation à la mutuelle et à la prévoyance ; demande de visite d'information et de prévention dans les 3 mois. Mentions du CDD : motif précis (accroissement temporaire d'activité lié au nouveau site d'Ivry), terme, poste, période d'essai de 2 semaines maximum, rémunération, convention collective, caisses de retraite et de prévoyance ; pour le temps partiel : 24 h, répartition par jour, heures complémentaires. Dossier dans Lucca, accès limité au service RH. Dans mon entreprise de mécanique, nous utilisons la même check-list.",
    "J'ai fait un tableau « formalité / échéance / responsable / preuve » : DPAE avant la prise de poste, registre unique du personnel, contrat signé dans les 2 jours ouvrables, mutuelle, visite d'information et de prévention dans les 3 mois. J'ai vérifié que 24 h correspond à la durée minimale du temps partiel. Le dossier contient l'identité, le contrat, la DPAE, les justificatifs utiles et les documents de suivi ; il est conservé 5 ans après le départ pour le registre et selon les durées du référentiel interne pour le reste. Mail au chef de site : date et heure d'arrivée, EPI à remettre, consignes de sécurité du site d'Ivry. À la clinique, j'ajoute la vérification des diplômes exigés pour les soignants.",
    "Pour le CDD de M. CHÉRIF, j'ai d'abord vérifié le motif : un nouveau contrat de nettoyage justifie l'accroissement temporaire d'activité. Mentions : motif, date de fin, poste, convention collective des entreprises de propreté (IDCC 3043), période d'essai, salaire, caisses de retraite. Pour le temps partiel, j'ai précisé les 24 h par semaine et leur répartition du lundi au vendredi. J'ai oublié au départ l'information sur les heures complémentaires, ajoutée après la correction. Dossier : je ne garde que les données utiles au poste, comme le demande le RGPD. Dans les magasins, les saisonniers sont gérés de la même façon.",
    "Mon planning d'embauche : J-8 au plus tôt, DPAE ; J-1, préparation du contrat et du dossier Lucca ; J, accueil, signature, registre unique du personnel ; J+2 ouvrables au plus tard, CDD remis ; avant 3 mois, visite d'information et de prévention. Le dossier est numérique, chaque pièce est nommée selon une règle commune. Seules les personnes habilitées y accèdent. Mail au manager rédigé avec la liste des documents à remettre au salarié : contrat, livret d'accueil, informations sur la mutuelle. Dans le BTP, j'ajoute l'accueil sécurité avant toute intervention sur chantier.",
    "J'ai listé les formalités dans l'ordre : vérification de l'identité, DPAE, registre unique du personnel, contrat écrit avec les mentions du CDD et du temps partiel, affiliation à la mutuelle sauf dispense écrite prévue par les textes, visite d'information et de prévention. Dossier individuel : partie administrative, partie contrat, partie formation ; aucune donnée sans lien avec l'emploi. Confidentialité : armoire fermée pour le papier, droits limités dans le SIRH. Mail au chef de site avec un ton clair et la date de la visite de prise de poste. À l'association, les intervenants reçoivent aussi leur planning de domiciles.",
    "Pour M. CHÉRIF, j'ai préparé la DPAE comme je le fais pour les clients du cabinet. Contrat : motif précis, terme au 30 avril 2027, période d'essai calculée à raison d'un jour par semaine dans la limite de deux semaines, 24 h hebdomadaires réparties, majoration éventuelle des heures complémentaires selon la convention. Registre : nom, emploi, qualification, date d'entrée, type de contrat. Conservation : registre 5 ans après le départ. J'ai rappelé dans le mail que le salarié doit recevoir son contrat signé dans les 2 jours ouvrables.",
    "Check-list d'embauche ALTÉA : DPAE, registre, contrat, mutuelle, prévoyance, visite d'information et de prévention, remise des EPI et de la fiche de poste, création du compte Lucca. Pour le dossier, j'ai prévu des droits d'accès par profil et une durée de conservation pour chaque catégorie de pièces. Confidentialité : pas d'envoi des pièces d'identité par mail non sécurisé. Le mail au chef de site précise la formation pratique à la sécurité à organiser le premier jour. Chez nous, la même logique s'applique aux conducteurs, avec la vérification du permis.",
    "Pour un CDD de 6 mois à temps partiel, j'ai rappelé que le contrat écrit est obligatoire et j'ai listé ses mentions. J'ai précisé la règle des 2 jours ouvrables pour la remise du contrat et la DPAE avant la prise de poste. Le dossier contient uniquement les documents nécessaires ; la copie du titre de séjour n'est conservée que si elle est exigée. Mail au manager : accueil à 7 h sur le site d'Ivry, présentation de l'équipe, remise du livret d'accueil. À l'hôtel, je fais la même chose pour les extras, avec une DPAE pour chaque vacation.",
  ],
  // 2 — CP1 : temps de travail, fin de contrat, CSE, congés pendant la maladie
  [
    "Indemnité légale de Mme LEFEVRE (11 ans et 10 mois d'ancienneté, 2 400 €) : 2 400 × 1/4 × 10 = 6 000 € ; 2 400 × 1/3 × 1,83 = 1 466,67 € ; total 7 466,67 €, sauf indemnité conventionnelle plus favorable. Procédure : entretien, signature de la convention, rétractation de 15 jours calendaires, demande d'homologation sur TéléRC, 15 jours ouvrables d'instruction, rupture au plus tôt le lendemain de l'homologation. Documents : certificat de travail, reçu pour solde de tout compte, attestation France Travail via la DSN. Temps de travail : 11 h dépasse la durée quotidienne maximale de 10 h ; 49 h dépasse les 48 h hebdomadaires.",
    "J'ai calculé 7 466,67 € d'indemnité minimale et vérifié la convention collective. Calendrier : signature le 16 novembre, fin de rétractation le 1er décembre, envoi TéléRC le 2 décembre, homologation tacite avant le 31 décembre. Réponse au chef de site : rappel des 10 h par jour, 48 h par semaine, 44 h en moyenne sur 12 semaines et 11 h de repos quotidien ; demande de régulariser le planning. Pour le salarié malade : 2 jours ouvrables de congés par mois d'arrêt, dans la limite de 24 jours par période. À la clinique, je contrôle aussi les gardes de 12 h.",
    "Pour la fin de contrat, j'ai fait un rétroplanning et la liste des documents. Mon premier calcul de l'indemnité était faux car j'avais appliqué 1/3 à toutes les années ; corrigé : 6 000 € + 1 466,67 € = 7 466,67 €. Élections du CSE : information du personnel, invitation des syndicats à négocier le protocole d'accord préélectoral, listes électorales par collège, affichages, procès-verbaux transmis après le scrutin. Réponse écrite au salarié en arrêt sur ses congés acquis, avec la date limite pour les prendre.",
    "Temps de travail : j'ai rédigé un mail au chef de site qui rappelle les règles (10 h par jour, 48 h par semaine, repos de 11 h) et demande la correction du planning de l'agent. Fin de contrat : indemnité de 7 466,67 €, délai de rétractation, homologation par la DREETS. Documents de sortie préparés dans Lucca. CSE : les mandats durent 4 ans ; j'ai préparé le calendrier des élections avec les échéances. Dans le BTP, je vérifie aussi les heures sur les chantiers éloignés.",
    "J'ai répondu par écrit au salarié en arrêt de travail : depuis la loi du 22 avril 2024, il acquiert 2 jours ouvrables de congés payés par mois d'arrêt pour maladie non professionnelle, dans la limite de 24 jours ; l'entreprise l'informe à sa reprise du nombre de jours et de la date limite pour les prendre. Indemnité de Mme LEFEVRE : 7 466,67 € minimum. Documents de fin de contrat listés. Élections : protocole d'accord préélectoral, listes, vote électronique possible si un accord ou la décision de l'employeur le prévoit. À l'association, les intervenantes à domicile ont souvent des journées coupées : je vérifie l'amplitude.",
    "Calcul de l'indemnité : ancienneté jusqu'à la fin du contrat, salaire de référence le plus favorable entre la moyenne des 12 et des 3 derniers mois, 1/4 de mois jusqu'à 10 ans puis 1/3. Résultat : 7 466,67 €. J'ai ajouté la contribution patronale sur l'indemnité de rupture conventionnelle, à vérifier avec le gestionnaire de paie. Documents : certificat de travail, solde de tout compte (dénonçable 6 mois), attestation France Travail. Au cabinet, je prépare ces documents pour plusieurs clients chaque mois.",
    "Mon tableau de contrôle des temps compare les heures badgées aux durées maximales. Pour l'agent à 11 h, j'ai alerté le chef de site et la responsable RH. Rupture conventionnelle : entretiens, convention, rétractation, homologation, puis documents de sortie. Indemnité : 7 466,67 €. CSE : information du personnel et invitation des syndicats, en tenant compte du nombre de collèges. Réponse au salarié en arrêt rédigée avec la référence de la loi. Chez nous, les conducteurs ont aussi des règles spécifiques de temps de conduite, gérées par l'exploitation.",
    "Pour Mme LEFEVRE, j'ai calculé l'ancienneté (1er mars 2015 au 31 décembre 2026) et l'indemnité minimale de 7 466,67 €. J'ai bien noté que la rupture ne peut pas intervenir avant l'homologation. Documents remis le dernier jour. Temps de travail : rappel écrit des règles au chef de site. Pour les congés pendant la maladie, j'ai d'abord répondu 2,5 jours par mois, puis corrigé : 2 jours ouvrables par mois pour une maladie non professionnelle. À l'hôtel, je suis attent{if} aux extras qui enchaînent les services.",
  ],
  // 3 — CP2 : variables de paie d'octobre 2026
  [
    "Tableau des variables d'octobre : Mme LEFEVRE, 10 heures supplémentaires (8 à 25 %, 2 à 50 %), justificatif = relevé validé par le chef de site ; M. TRAORÉ, arrêt maladie du 6 au 15 octobre, avis d'arrêt reçu, signalement en DSN ; Mme MARCHAND, 5 jours de congés payés validés dans Lucca ; M. DUBOIS, acompte de 600 € à déduire ; Mme SY, saisie des rémunérations notifiée par un commissaire de justice ; M. GIRARD, entrée le 12 octobre, salaire au prorata et affiliation à la mutuelle ; M. LAMBERT, prime exceptionnelle de 150 € validée par la direction. Transmission au cabinet avant le 22 octobre, contrôle des bulletins, DSN le 5 novembre.",
    "J'ai contrôlé chaque variable avant envoi : heures supplémentaires rapprochées des plannings, arrêt de M. TRAORÉ (3 jours de carence pour les indemnités journalières, maintien de salaire selon le Code du travail ou la convention collective si elle est plus favorable), congés de Mme MARCHAND déduits de son solde. L'acompte de M. DUBOIS est repris sur le bulletin. La saisie de Mme SY est transmise au cabinet avec l'acte ; la retenue suit le barème des quotités saisissables. Dossiers de paie dans un dossier protégé. À la clinique, je vérifie aussi les heures de nuit.",
    "Mon tableau comporte les colonnes salarié, élément, quantité, période, justificatif, contrôle, commentaire. J'ai relevé une incohérence : un agent noté en congés payés et présent au planning le même jour ; j'ai fait corriger avant la transmission. Pour M. GIRARD, entré le 12 octobre, j'ai transmis la date exacte pour le calcul au prorata. Échéance DSN : le 5 du mois suivant pour une entreprise d'au moins 50 salariés. Confidentialité : envoi au cabinet par la plateforme sécurisée, jamais par mail ouvert.",
    "Variables transmises : heures supplémentaires de Mme LEFEVRE, absence maladie de M. TRAORÉ, congés de Mme MARCHAND, acompte de M. DUBOIS, saisie de Mme SY, entrée de M. GIRARD, prime de M. LAMBERT. J'ai oublié au départ la mutuelle de M. GIRARD ; la correction m'a rappelé de vérifier aussi les adhésions et les dispenses. Pour l'arrêt maladie : signalement en DSN dans les délais et vérification de l'ancienneté pour le maintien de salaire. Dans le BTP, les intempéries ajoutent d'autres variables.",
    "Contrôles réalisés : cumul des heures supplémentaires par rapport au contingent annuel, majorations (25 % puis 50 %), cohérence des absences, solde de congés, dates d'entrée. Acompte : un salarié mensualisé peut demander un acompte correspondant à la moitié de sa rémunération mensuelle ; il est déduit à la paie. Saisie : depuis le 1er juillet 2025, la procédure est conduite par un commissaire de justice ; l'employeur verse les sommes retenues selon l'acte. Les bulletins reçus sont contrôlés avant leur mise à disposition dans le coffre-fort numérique. À l'association, beaucoup de variables viennent des plannings d'intervention.",
    "Au cabinet, je reçois ce type de fichier de nos clients. J'ai donc construit un modèle de collecte pour ALTÉA, avec une ligne par événement et la pièce justificative jointe. J'ai rappelé au client la date limite de transmission et la règle : pas de variable sans justificatif. Pour l'arrêt de M. TRAORÉ, j'ai demandé la date de reprise. Confidentialité : chaque dossier client est cloisonné dans le logiciel de paie.",
    "J'ai préparé la transmission au cabinet sur Silae avec un récapitulatif signé par Karim BENSAÏD. Arrêt maladie : délai de carence de 3 jours pour les indemnités journalières, maintien employeur après un an d'ancienneté selon l'article L1226-1, convention collective à vérifier. Prime de M. LAMBERT : validation écrite de la direction jointe. Bulletin de M. DUBOIS : acompte de 600 € déduit. Chez nous, les primes de nuit des préparateurs sont contrôlées de la même façon.",
    "Les variables d'octobre sont classées par type : temps (heures supplémentaires, congés, absences), événements (entrée, arrêt), éléments financiers (acompte, prime, saisie). J'ai vérifié que les 5 jours de congés de Mme MARCHAND correspondent bien à sa demande validée. Pour Mme SY, j'ai informé seulement le gestionnaire de paie, par respect de la confidentialité. Calendrier : transmission le 21 octobre, contrôle des bulletins le 28, DSN le 5 novembre. À l'hôtel, les extras sont payés à la vacation et demandent un contrôle supplémentaire.",
  ],
  // 4 — CP3 : tableau de bord RH ALTÉA 2025
  [
    "Calculs ALTÉA 2025 : turnover = ((37 + 31) / 2) / 145 = 23,4 % ; absentéisme = 13 850 / 195 090 × 100 = 7,1 % ; taux de féminisation = 96 / 148 = 64,9 % ; salaire brut moyen annuel par ETP = 3 064 000 / 121,4 = 25 239 €. Tableau de bord : indicateur, formule, valeur, source (Lucca, Silae, DSN), périodicité, destinataire. Graphiques : courbe mensuelle de l'absentéisme, histogramme de la pyramide des âges. Note à la direction : absentéisme élevé, turnover concentré sur les agents en CDD, actions à étudier sur l'intégration.",
    "J'ai d'abord vérifié la cohérence des données (effectif Lucca et DSN). Résultats : turnover 23,4 %, absentéisme 7,1 %, 64,9 % de femmes, 25 239 € brut annuel moyen par ETP. Pour la direction, j'ai mis les quatre indicateurs en tête avec une flèche d'évolution ; pour les chefs de site, l'absentéisme par site. Note : l'absentéisme dépasse le niveau de l'année précédente ; je propose d'analyser les motifs et la durée des arrêts. Les données nominatives restent dans le fichier source.",
    "Mon tableau de bord est construit sur Google Sheets avec un onglet de données et un onglet de restitution. Formules : effectif moyen, ETP, turnover, absentéisme, masse salariale. J'avais d'abord calculé le turnover avec l'effectif de fin d'année ; corrigé avec l'effectif moyen (145) : 23,4 %. Graphiques : barres par site pour l'absentéisme, secteurs pour la répartition par type de contrat. Dans le réseau de magasins, j'ai repris le même modèle par magasin.",
    "Indicateurs calculés : 23,4 % de turnover, 7,1 % d'absentéisme, 64,9 % de féminisation, 25 239 € par ETP. J'ai précisé la source et la date d'extraction de chaque donnée. Note de synthèse de 10 lignes : chiffres clés, points d'alerte, hypothèses, propositions (entretien de retour après absence, suivi des départs pendant la période d'essai). Diffusion : direction et responsable RH uniquement ; version agrégée pour le CSE. Dans le BTP, j'ajouterais le taux de fréquence des accidents du travail.",
    "Pour l'association, l'ETP est essentiel car les temps partiels sont nombreux, comme chez ALTÉA (121,4 ETP pour 148 salariés). J'ai calculé l'absentéisme sur les heures théoriques et non sur les jours : 7,1 %. Turnover 23,4 %. Salaire moyen par ETP : 25 239 €. J'ai choisi une courbe sur 12 mois pour faire apparaître la saisonnalité des absences. Ma note propose de suivre l'absentéisme par site et par motif.",
    "J'ai construit un tableau de bord type que le cabinet pourrait proposer à ses clients. Formules documentées dans un onglet « méthode ». Résultats ALTÉA : turnover 23,4 %, absentéisme 7,1 %, féminisation 64,9 %, 25 239 € par ETP. J'ai ajouté un contrôle automatique qui signale un écart entre l'effectif du SIRH et celui de la paie. La note est courte, chiffrée, avec trois recommandations.",
    "Turnover 23,4 %, absentéisme 7,1 %, féminisation 64,9 %, salaire moyen par ETP 25 239 €. Graphiques : pyramide des âges en histogramme horizontal par sexe, courbe de l'absentéisme. J'ai repéré que les sorties se concentrent dans les six premiers mois : c'est l'élément significatif de ma note. Confidentialité : aucun nom dans le tableau diffusé. Chez nous, le même tableau existe par entrepôt.",
    "J'ai présenté le tableau de bord avec la formule de chaque indicateur pour qu'il soit vérifiable. Mes résultats sont exacts sauf le salaire moyen, que j'avais d'abord calculé par salarié au lieu de l'ETP ; corrigé : 25 239 €. Note à la direction : un turnover de 23,4 % coûte en recrutement et en formation ; je propose un parcours d'intégration renforcé. À l'hôtel, le turnover est encore plus élevé chez les extras.",
  ],
  // 5 — CP3 : obligations liées à l'effectif (ALTÉA, 148 salariés)
  [
    "Obligations d'ALTÉA (148 salariés) : CSE avec attributions des entreprises d'au moins 50 salariés, BDESE, index de l'égalité professionnelle publié au plus tard le 1er mars, obligation d'emploi des travailleurs handicapés (6 % de 148 = 8,88, soit 8 bénéficiaires), règlement intérieur, consultations récurrentes du CSE. Pas de bilan social (seuil de 300 salariés). CSRD : ALTÉA n'atteint pas les seuils, à vérifier selon les textes en vigueur. Index de 78/100 : au-dessus de 75, donc pas de mesures de correction obligatoires, mais objectifs de progression à fixer car sous 85.",
    "J'ai fait un calendrier annuel : janvier, préparation des données de l'index ; 1er mars, publication de l'index et transmission à l'administration ; DSN annuelle pour l'obligation d'emploi des travailleurs handicapés ; consultations du CSE sur les orientations stratégiques, la situation économique et la politique sociale. Pour la directive (UE) 2023/970, j'ai listé ce qui change : information sur la rémunération avant l'entretien, interdiction de demander l'historique salarial, droit à l'information des salariés, rapport sur les écarts.",
    "Index de 78 : je pensais qu'il fallait des mesures de correction, mais elles ne sont obligatoires que sous 75 points ; sous 85, il faut publier des objectifs de progression. BDESE : obligatoire dès 50 salariés. Obligation d'emploi : 8 bénéficiaires attendus ; si ALTÉA en emploie moins, une contribution est due, sauf modalités d'acquittement prévues. Je n'ai pas inclus le bilan social, réservé aux entreprises d'au moins 300 salariés.",
    "Pour la transparence salariale, j'ai noté que la directive devait être transposée au plus tard le 7 juin 2026 et qu'il faut suivre le texte français. Actions à anticiper chez ALTÉA : grilles de rémunération et critères objectifs, fourchettes dans les offres, procédure de réponse aux demandes d'information des salariés. Obligations actuelles : index, BDESE, obligation d'emploi, consultations du CSE. Dans mon entreprise du BTP (95 salariés), les mêmes seuils s'appliquent.",
    "J'ai classé les obligations par seuil : dès 11 salariés, CSE ; dès 20, obligation d'emploi des travailleurs handicapés ; dès 50, BDESE, index, attributions élargies du CSE, règlement intérieur ; dès 300, bilan social. ALTÉA est concernée jusqu'au seuil de 50. Calcul : 6 % de 148 = 8,88, arrondi à 8. Index 78 : objectifs de progression par indicateur et publication. À l'association, la gestion des seuils est la même.",
    "Au cabinet, plusieurs clients ont moins de 50 salariés : ils n'ont ni BDESE ni index. Pour ALTÉA, j'ai listé : index publié au 1er mars, BDESE à jour, déclaration annuelle de l'obligation d'emploi en DSN, consultations du CSE. J'ai préparé un tableau « obligation / seuil / échéance / source des données / responsable ». CSRD : non concernée à ce stade, avec une veille sur l'évolution des seuils.",
    "Index 78/100 : pas de mesures de correction obligatoires, mais objectifs de progression pour les indicateurs où ALTÉA n'a pas la note maximale. Directive transparence : préparer les fourchettes de salaire et la méthode d'évaluation des emplois. Obligation d'emploi : 8 bénéficiaires, suivi des RQTH avec leur accord. BDESE : alimentée par le tableau de bord. Chez nous (230 salariés), le bilan social n'est pas encore obligatoire non plus.",
    "J'ai répondu question par question. J'ai d'abord cité la CSRD comme obligatoire, puis corrigé après la veille : ALTÉA n'entre pas dans le champ, et le calendrier a été décalé en 2025 pour plusieurs catégories d'entreprises. Index, BDESE, obligation d'emploi et consultations du CSE sont bien obligatoires. Calendrier construit avec les échéances. À l'hôtel (85 salariés), l'index est aussi publié chaque année.",
  ],
  // 6 — CP4 : entretiens professionnels (37 salariés en retard)
  [
    "Cadre : depuis la loi du 24 octobre 2025, entretien de parcours professionnel (article L6315-1 du Code du travail) dans l'année suivant l'embauche puis tous les 4 ans, consacré aux perspectives d'évolution, état des lieux récapitulatif à 8 ans, entretien de mi-carrière et entretien avant 60 ans ; dans une entreprise d'au moins 50 salariés, abondement de 3 000 € sur le CPF si les conditions ne sont pas remplies. Planning de rattrapage sur 4 mois : les 6 salariés proches de l'état des lieux en novembre, puis par site. Trame distincte de l'évaluation : parcours, compétences, souhaits, formation, VAE, CPF, conseil en évolution professionnelle. Synthèse des souhaits transmise à la responsable RH.",
    "J'ai extrait de Lucca la liste des 37 salariés avec la date du dernier entretien et la date d'entrée. Priorité aux 6 salariés concernés par l'état des lieux en 2027. Planning : 10 entretiens par mois, relance des managers à J-7 et J-1. Compte rendu remis au salarié. Exploitation : tableau des souhaits (formation, mobilité, VAE), mise à jour des fiches de postes, information du plan de développement des compétences. À la PME, la même méthode a servi pour 60 salariés.",
    "Mon planning était trop serré au départ (15 entretiens par semaine pour des chefs de site déjà très occupés) ; je l'ai étalé sur 4 mois. Trame : bilan du parcours, formations suivies, compétences, projets, besoins de formation, dispositifs. Note aux managers : l'entretien professionnel n'évalue pas le travail. Confidentialité : comptes rendus accessibles au salarié, à son manager et au service RH seulement.",
    "J'ai construit le support en deux parties : l'entretien de parcours tous les 4 ans et, pour les salariés concernés, l'état des lieux à 8 ans (entretiens réalisés, formation suivie, certification ou progression). J'ai préparé un mail d'information aux salariés avec le cadre et la date. L'exploitation alimente la gestion prévisionnelle des emplois et des parcours. Dans le BTP, les entretiens sont souvent faits sur les chantiers : je prévois une version courte imprimable.",
    "À l'association, j'ai le même retard à rattraper. Pour ALTÉA, planning sur 4 mois dans Lucca avec alertes, trame distincte de l'évaluation, compte rendu signé et remis. Les souhaits sont regroupés : 9 demandes de formation, 4 projets de VAE, 2 souhaits de mobilité vers l'encadrement. J'ai proposé de mettre à jour la fiche de poste « chef d'équipe » à partir des entretiens.",
    "Rappel du cadre et du risque : abondement de 3 000 € par salarié concerné dans les entreprises d'au moins 50 salariés. Planning de rattrapage, trame, compte rendu, puis synthèse anonymisée pour la direction. J'ai prévu la communication : note aux chefs de site, mail aux salariés, point en réunion d'encadrement. Au cabinet, je conseille aussi les clients sur ce calendrier.",
    "J'ai rattaché chaque entretien à une date limite. Pour l'exploitation, j'ai fait un tableau par salarié : souhaits, formations proposées, suite donnée, échéance. Ce tableau alimente le plan de développement des compétences de 2027. J'ai repéré les salariés qui atteignent 45 ans pour l'entretien de mi-carrière, organisé dans les 2 mois suivant leur visite médicale. Chez nous, le même suivi concerne les conducteurs.",
    "Planning : 37 entretiens en 4 mois, priorité aux échéances de l'état des lieux. Trame : parcours, compétences, projet, formation, dispositifs. Je n'avais pas prévu de remettre le compte rendu au salarié ; c'est corrigé. Exploitation : souhaits de mobilité transmis à la responsable RH, mise à jour des fiches de postes. À l'hôtel, les entretiens tiennent compte des saisons.",
  ],
  // 7 — CP5 : profil de poste, offre, sourcing (chef d'équipe propreté)
  [
    "Recueil du besoin avec Nathalie ROUSSEL et le responsable d'exploitation : missions, nombre d'agents encadrés, sites de Créteil et Vitry, horaires (début à 6 h), compétences, date d'arrivée. Profil de poste : encadrer 12 agents, organiser les plannings, contrôler la qualité, appliquer les règles de sécurité, être le relais des clients. Offre en français, sans critère discriminatoire ni limite d'âge, avec CDI, 35 h, lieu, horaires et rémunération. Sourcing : France Travail, Indeed, cooptation interne, LinkedIn pour les profils d'encadrement. Grille de présélection : expérience d'encadrement, connaissance des techniques de propreté, permis B souhaité.",
    "Mes questions au manager : pourquoi ce recrutement, quelles missions prioritaires, quelles compétences indispensables, quelles conditions de travail, quelle rémunération. Profil rédigé en une page. Offre relue pour éviter « jeune », « dynamique » ou toute mention liée au sexe ou à l'âge. J'ai prévu d'indiquer la fourchette de rémunération pour préparer la transparence salariale. Canaux : France Travail et Indeed pour le volume, Welcome to the Jungle pour l'image employeur. À la PME, nous recrutons de la même façon les chefs d'équipe d'atelier.",
    "Profil de poste : finalité, missions, activités, compétences, rattachement, conditions. Offre : titre clair, présentation d'ALTÉA, missions, profil, conditions. J'avais d'abord écrit « débutants s'abstenir » ; je l'ai remplacé par « expérience d'encadrement d'au moins deux ans ». Grille : critères indispensables (encadrement, sécurité, propreté) et souhaités (permis B, logiciel de planning). Sourcing justifié par le public visé.",
    "J'ai construit le profil à partir de la fiche de poste existante et du recueil du besoin. L'offre est publiée sur le site de France Travail et sur Indeed, puis partagée aux salariés pour la cooptation. Mentions : contrat, lieu, horaires, salaire, avantages (mutuelle, véhicule de service). Grille de présélection en 6 critères notés de 0 à 2. Dans le BTP, je diffuse aussi les offres aux écoles et aux centres de formation.",
    "Pour éviter toute discrimination, j'ai vérifié chaque critère : il doit être lié à l'emploi. L'offre est en français. Pas de photo demandée. Canaux : France Travail, Indeed, groupement d'employeurs local, cooptation. Grille de présélection cohérente avec le profil, utilisée pour toutes les candidatures. À l'association, nous diffusons aussi auprès des missions locales.",
    "Recueil du besoin réalisé avec une trame de 10 questions. Profil précis et synthétique. Offre conforme au Code du travail (article L1132-1 pour la non-discrimination, offre en français). Pour la rémunération, j'ai indiqué une fourchette. Canaux choisis selon le coût et le public. Au cabinet, nous recrutons surtout par jobboards spécialisés.",
    "Profil de poste et offre rédigés ; j'ai ajouté une phrase sur l'accessibilité du poste et l'accueil des candidats en situation de handicap. Sourcing : France Travail, Indeed, salons de l'emploi du Val-de-Marne, cooptation. Grille : expérience, encadrement, sécurité, relation client, disponibilité sur les horaires du poste. Chez nous, les mêmes canaux servent pour les chefs de quai.",
    "J'ai rédigé l'offre en pensant au candidat : missions concrètes, horaires annoncés, rémunération indiquée. Les critères sont tous liés au poste. Canaux : Indeed et France Travail pour toucher un large public, LinkedIn pour les candidats déjà en encadrement. J'avais oublié la grille de présélection ; je l'ai ajoutée avec 5 critères pondérés. À l'hôtel, nous recrutons beaucoup par cooptation.",
  ],
  // 8 — CP5 : entretien, synthèse, gestion administrative, intégration
  [
    "Guide d'entretien : accueil, présentation du poste, parcours, questions comportementales (« Racontez une situation où un agent n'a pas respecté une consigne de sécurité »), motivation, questions du candidat, conclusion. Grille d'évaluation : 6 critères notés de 1 à 4. Synthèse pour Mme Clara MENDES : 5 ans d'encadrement en propreté hospitalière, bonne maîtrise des protocoles, à confirmer sur les outils de planning ; avis favorable. Gestion : réponse à tous les candidats, conservation des données 2 ans au plus après le dernier contact. Intégration : J-7 préparation, J accueil et sécurité, S1 binôme, M1 point, avant la fin de la période d'essai bilan.",
    "Mon guide pose les mêmes questions à tous les candidats, avec la méthode STAR (situation, tâche, action, résultat). Posture : neutre, bienveillante, aucune question sur la vie privée. Synthèse factuelle, séparant les faits et l'appréciation. Logistique : convocations, visioconférence pour le premier tour, réponses aux candidats non retenus sous 10 jours. Programme d'intégration avec acteurs (RH, manager, tuteur), étapes et outils (livret d'accueil, check-list, rapport d'étonnement). À la PME, le même programme existe pour les techniciens.",
    "J'ai mené l'entretien simulé avec la grille. Ma première synthèse était trop longue et donnait mon impression personnelle ; je l'ai réécrite en 10 lignes factuelles. Gestion administrative : information préalable des candidats sur les méthodes utilisées, données conservées au plus 2 ans, puis supprimées. Intégration : formation pratique à la sécurité, visite d'information et de prévention, présentation aux clients des sites.",
    "Guide et grille construits à partir du profil de poste. Synthèse de Mme MENDES : points forts (encadrement, sécurité), point de vigilance (horaires très matinaux à confirmer avec elle), recommandation. DPAE préparée dès l'acceptation de l'offre. Parcours d'intégration : livret d'accueil, rencontre avec chaque équipe, tutorat par un chef d'équipe expérimenté, rapport d'étonnement à 1 mois. Dans le BTP, l'accueil sécurité est la première étape.",
    "Je pose des questions ouvertes et des questions sur des situations vécues. La grille comporte les mêmes critères que la présélection. Synthèse transmise au manager pour décision. Réponses : un mail personnalisé à chaque candidat. Conservation des CV : 2 ans au plus avec information du candidat. Intégration sur 3 mois avec points d'étape. À l'association, nous ajoutons une journée d'observation avec une intervenante expérimentée.",
    "Guide d'entretien, grille et synthèse réalisés. J'ai ajouté un tableau de suivi des candidatures (date, canal, étape, réponse) pour la gestion administrative. Programme d'intégration : avant l'arrivée (accès, matériel, planning), le jour d'arrivée (accueil, sécurité, présentation), le premier mois (formation, binôme), la fin de la période d'essai (bilan). Au cabinet, l'intégration d'un gestionnaire de paie suit la même logique.",
    "Ma grille note la compétence, l'expérience, la motivation et la cohérence avec le poste. Synthèse de Mme MENDES : profil adapté, disponibilité dans un mois. Je n'avais pas prévu l'information préalable des candidats sur les techniques d'évaluation ; c'est ajouté. Intégration : livret d'accueil, formation sécurité, visite d'information et de prévention, rapport d'étonnement. Chez nous, les nouveaux conducteurs ont aussi une journée en double.",
    "Guide en 6 étapes, questions comportementales, grille de 5 critères. Synthèse : faits observés, appréciation, recommandation. Les candidats non retenus reçoivent une réponse ; leurs données sont supprimées au bout de 2 ans au plus. Programme d'intégration de la nouvelle cheffe d'équipe sur 3 mois, avec un parrain. À l'hôtel, j'ai mis en place un rapport d'étonnement pour tous les nouveaux arrivants.",
  ],
  // 9 — CP6 : développement des compétences
  [
    "Recueil des besoins : synthèse des entretiens professionnels, demandes des chefs de site, obligations réglementaires (sécurité, produits chimiques), orientations de la direction. Plan 2027 : actions obligatoires (temps de travail effectif) et autres actions. Coût de « Encadrer une équipe de propreté » : 1 890 € de coût pédagogique + 2 016 € de salaires maintenus (6 × 21 h × 16 €) + 240 € de frais = 4 146 €, soit 691 € par participant. Demandes individuelles : VAE du CAP agent de propreté et d'hygiène (France VAE), projet de transition professionnelle vers aide-soignante (Transitions Pro), permis B par le CPF avec participation forfaitaire.",
    "J'ai classé les besoins par priorité et par public. Calcul du coût : 4 146 € au total, 691 € par stagiaire. Logistique : choix de l'organisme après comparaison de trois devis, convention, convocations, émargements, attestations. Évaluation : questionnaire à chaud le dernier jour, à froid à trois mois avec le manager. Information du CSE lors de la consultation sur la politique sociale. À la PME, le plan est construit de la même façon.",
    "Pour les trois demandes, j'ai orienté chaque salarié vers le bon dispositif. J'avais d'abord proposé le CPF pour la reconversion en aide-soignante, mais le projet de transition professionnelle permet de garder sa rémunération pendant la formation, sous réserve d'acceptation par Transitions Pro. Coût de l'action collective : 4 146 €. Questionnaire d'évaluation construit en 8 questions.",
    "Plan de développement des compétences 2027 : tableau action, public, objectif, durée, coût, dispositif, période. Coût calculé : coût pédagogique, salaires maintenus et frais annexes, soit 4 146 €. Suivi budgétaire mensuel. J'ai rappelé que l'OPCO finance le plan seulement pour les entreprises de moins de 50 salariés ; ALTÉA finance donc son plan, hors dispositifs spécifiques. Dans le BTP, les formations sécurité sont prioritaires.",
    "J'ai recueilli les besoins à partir des 37 entretiens professionnels rattrapés. Pour le permis B, le CPF est mobilisable ; depuis le 2 mai 2024, le titulaire paie une participation forfaitaire, sauf exceptions comme l'abondement de l'employeur. VAE : information sur France VAE. Coût de l'action : 691 € par participant. Évaluation à chaud et à froid. À l'association, les intervenants demandent surtout des formations sur l'accompagnement des personnes âgées.",
    "Au cabinet, j'aide les clients à monter leurs dossiers de formation. Pour ALTÉA : plan 2027, coût complet de l'action (4 146 €), dispositifs adaptés à chaque demande, convocations et attestations. Questionnaire d'évaluation à froid envoyé au manager et au salarié à trois mois. Les informations sont transmises au CSE de façon agrégée.",
    "Mon plan distingue les formations obligatoires des conducteurs et les autres actions ; pour ALTÉA, j'ai appliqué la même logique aux formations sécurité. Coût de l'action d'encadrement : 4 146 €. J'ai préparé le tableau de suivi des échéances. Demandes individuelles traitées avec les bons dispositifs. Évaluation : satisfaction à chaud, transfert en situation de travail à froid.",
    "Besoins recueillis, plan construit, coût calculé (4 146 €, 691 € par stagiaire). J'ai oublié au départ les frais de déplacement ; corrigé. Logistique complète : convocation, convention, émargement par demi-journée, attestation. Questionnaire à chaud de 6 questions et bilan à froid. À l'hôtel, les formations ont lieu hors saison.",
  ],
];

const BILANS_PERSONNELS = [
  "Ce travail m'a surtout appris à vérifier la source juridique avant de répondre.",
  "Le plus difficile a été de respecter le temps imparti ; je m'entraînerai encore en conditions d'examen.",
  "J'ai montré ma production à ma tutrice en entreprise, qui m'a fait deux remarques que j'ai intégrées.",
  "Cette mise en situation me servira directement pour mon dossier professionnel.",
  "J'ai comparé mon travail avec celui d'un autre apprenti, ce qui m'a fait corriger un oubli.",
  "La correction du formateur m'a permis de repérer une erreur de méthode que je ne referai plus.",
  "J'avais des doutes sur ce sujet en arrivant ; je me sens maintenant capable de le refaire seul{e}.",
  "Je me suis appuyé{e} sur les fiches méthode du cours, que je réutilise dans mon entreprise.",
  "Je n'ai pas eu le temps de mettre en forme toute la note, mais la démarche est complète.",
  "J'ai posé une question pendant la classe virtuelle, ce qui m'a évité de partir dans la mauvaise direction.",
  "Je vais appliquer cette méthode dès ma prochaine période en entreprise.",
  "Je dois encore gagner en rapidité, mais la démarche est claire pour moi.",
];

/** Banque de la mise en situation à partir de son titre (ou de sa consigne), sinon de son rang. */
function blocExercice(contexte: string, exerciceIdx: number): number {
  const t = contexte || "";
  const num = t.match(/\bExercice\s+(\d{1,2})\b/i);
  if (num) {
    const n = parseInt(num[1], 10);
    if (n >= 1 && n <= EXERCICES_PRODUCTIONS.length) return n - 1;
  }
  if (/diagnostic de d[ée]part/i.test(t)) return 0;
  const c = t.match(/\bCP([1-6])\b/);
  if (c) return [1, 3, 4, 6, 7, 9][parseInt(c[1], 10) - 1];
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

/** Production de l'apprenti pour la mise en situation `bloc` (0 à 9), avec son bilan personnel. */
export function arh41366Production(
  bloc: number,
  stagiaireIdx: number,
  s: { civilite?: string; prenom?: string; entreprise?: string },
  bilanSel = bloc,
): string {
  const fem = isFeminin(s.civilite, s.prenom);
  const pool = EXERCICES_PRODUCTIONS[((bloc % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length];
  // Même décalage pour toutes les banques : un apprenti garde le même terrain d'un exercice à l'autre,
  // et sur un groupe de 8 apprentis les 8 productions d'un même exercice sont toutes différentes.
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bilanSel + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai aussi relié l'exercice à mes missions chez ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

export function pickARH41366ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isARH41366Formation(intitule, code)) return null;
  return arh41366Production(blocExercice(contexte || "", exerciceIdx), stagiaireIdx, s);
}

// ---------------------------------------------------------------------------
// Exercices CFA par matière (5 par matière du référentiel) : chaque matière renvoie aux mises en
// situation de sa compétence ; la séance précise l'étape de travail.
// ---------------------------------------------------------------------------
const SEANCES_CFA = [
  "Séance 1/5 — production initiale en classe virtuelle",
  "Séance 2/5 — reprise après la correction collective",
  "Séance 3/5 — application aux données de votre entreprise d'accueil",
  "Séance 4/5 — préparation de l'évaluation en cours de formation (ECF)",
  "Séance 5/5 — entraînement en temps limité, conditions de la mise en situation professionnelle",
];

/** Mises en situation (indices 0 à 9) travaillées dans une matière du référentiel RNCP41366, null si inconnue. */
export function arh41366MisesEnSituationMatiere(matiereTitre: string): number[] | null {
  const t = (matiereTitre || "").toLowerCase().replace(/’/g, "'");
  if (/m[ée]thodologie de l'alternance|accueil, int[ée]gration/.test(t)) return [0];
  if (/pr[ée]paration au titre/.test(t)) return [1, 3, 4, 7, 9];
  if (/gestion administrative du personnel/.test(t)) return [1, 2];
  if (/variables et param[èe]tres de paie/.test(t)) return [3];
  if (/indicateurs ressources humaines/.test(t)) return [4, 5];
  if (/gestion des emplois et carri[èe]res/.test(t)) return [6];
  if (/recrutement et d'int[ée]gration/.test(t)) return [7, 8];
  if (/d[ée]veloppement des comp[ée]tences du personnel/.test(t)) return [9];
  return null;
}

/** Séance d'exercice CFA n° `exInMatiere` (0 à 4) d'une matière : indice de mise en situation et libellé. */
export function arh41366SeanceCFA(matiereTitre: string, exInMatiere: number): { miseEnSituation: number; seance: string } | null {
  const mes = arh41366MisesEnSituationMatiere(matiereTitre);
  if (!mes) return null;
  const k = ((exInMatiere % 5) + 5) % 5;
  return { miseEnSituation: mes[k % mes.length], seance: SEANCES_CFA[k] };
}

// ---------------------------------------------------------------------------
// Missions confiées en entreprise, reliées aux compétences CP1 à CP6 (tableau IND 13)
// ---------------------------------------------------------------------------
const MISSIONS_ENTREPRISE: [RegExp, string][] = [
  [/gestion administrative du personnel/i, "Réaliser les formalités d'embauche (DPAE, registre unique du personnel, contrat, affiliation mutuelle), tenir les dossiers individuels dans le SIRH, suivre les temps et les absences, préparer les documents de fin de contrat et les dossiers du CSE"],
  [/variables et param[èe]tres de paie/i, "Collecter et contrôler chaque mois les éléments variables de paie avec leurs justificatifs, les transmettre au service paie dans les délais et contrôler les bulletins"],
  [/indicateurs ressources humaines/i, "Mettre à jour le tableau de bord RH mensuel (effectif, ETP, turnover, absentéisme, masse salariale), préparer les données de l'index de l'égalité et de la BDESE"],
  [/gestion des emplois et carri[èe]res/i, "Planifier et relancer les entretiens professionnels, en exploiter les comptes rendus et actualiser les fiches de postes"],
  [/recrutement et d.int[ée]gration/i, "Rédiger le profil de poste et l'offre, présélectionner les candidatures avec une grille, organiser les entretiens et le programme d'intégration"],
  [/d[ée]veloppement des comp[ée]tences du personnel/i, "Recueillir les demandes de formation, préparer les dossiers et la logistique des actions, suivre le budget et les évaluations à chaud et à froid"],
];

/** Mission en entreprise correspondant à une compétence du RNCP41366, null si la compétence n'est pas reconnue. */
export function arh41366MissionEntreprise(competence: string): string | null {
  const c = (competence || "").replace(/’/g, "'");
  const m = MISSIONS_ENTREPRISE.find(([re]) => re.test(c));
  return m ? m[1] : null;
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par apprenti
// ============================================================

const BESOINS_DIPLOMES = [
  "Baccalauréat professionnel AGORA (assistance à la gestion des organisations et de leurs activités)",
  "Baccalauréat technologique STMG, spécialité ressources humaines et communication",
  "BTS Support à l'action managériale",
  "BTS Gestion de la PME",
  "Baccalauréat général, puis une première année de licence de droit",
  "Baccalauréat général, puis une licence de psychologie",
  "Baccalauréat technologique ST2S",
  "Baccalauréat professionnel Métiers du commerce et de la vente, puis un an d'expérience en magasin",
  "Titre professionnel Secrétaire assistant, puis un an comme agent{e} administrat{if}",
  "Baccalauréat général, puis deux ans d'expérience comme agent{e} d'accueil",
  "Baccalauréat professionnel AGORA, puis un emploi d'assistant{e} en agence d'intérim",
  "DUT puis BUT Gestion des entreprises et des administrations, parcours non terminé",
  "Baccalauréat technologique STMG, puis une expérience de saisonni{er} dans l'hôtellerie",
  "Licence d'administration économique et sociale",
  "Baccalauréat professionnel Logistique, puis un emploi administratif dans le transport",
  "Diplôme étranger de niveau baccalauréat, reconnu en France, et un an d'emploi de bureau",
  "Baccalauréat général, puis une année de BTS Comptabilité et gestion",
  "Titre professionnel Assistant de comptabilité et d'administration",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant les classes virtuelles.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières pendant les journées en ligne me conviennent.",
  "Non. Je porte des lunettes ; des supports avec une police assez grande m'aident pour le travail sur écran.",
  "Oui, je suis dyslexique : un temps majoré pour les évaluations écrites et les supports en PDF me sont utiles.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je souhaite seulement disposer des enregistrements ou des diaporamas pour revoir certaines séances.",
  "Oui, une RQTH pour des douleurs dorsales : je dois pouvoir me lever régulièrement pendant les classes virtuelles.",
  "Non. Je préfère avoir les supports en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté lors de l'entretien d'admission.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suivrai le rythme prévu au contrat : une semaine au CFA, en classe virtuelle de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>, puis trois semaines en entreprise.",
  "Mon employeur a validé le calendrier d'alternance ; je suis disponible toutes les semaines CFA sur les créneaux <strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>.",
  "Pendant les semaines au CFA, je me connecte depuis chez moi de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; mon tuteur ne me confie pas de mission ces semaines-là.",
  "Je suis disponible sur l'ensemble des semaines au CFA (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) ; je dispose d'un ordinateur et d'une connexion stable.",
  "Je suivrai les classes virtuelles depuis une salle mise à disposition par mon entreprise, aux horaires <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>.",
  "Le rythme une semaine au CFA, trois semaines en entreprise me convient ; je n'ai pas de contrainte horaire sur les créneaux <strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>.",
  "Je suis disponible toutes les semaines CFA de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. Je dois seulement partir à 16h45 le vendredi pour mon train, ce que j'ai signalé.",
  "Je me connecterai aux classes virtuelles aux horaires prévus (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je prévois du travail personnel le soir pour le dossier professionnel.",
  "Aucune contrainte pendant les semaines au CFA (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) ; mon entreprise a intégré le calendrier dans le planning du service.",
  "Je suis disponible sur les semaines au CFA ; je souhaite un ordinateur prêté par le CFA, mon matériel personnel étant ancien. Horaires : <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>.",
];

/** Réponses d'évaluation des besoins propres au RNCP41366, différentes pour chaque apprenti. */
export function getARH41366EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = arh41366Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilARH41366(idx, s.nom, s.prenom);
  const pick = (arr: string[], sel: number) => accorder(arr[rang(base, sel, arr.length)], fem);
  const ent = (txt: string) => remplirProfil(txt, fem);
  const civilite = s.civilite === "Mme" ? "Madame" : s.civilite === "M." ? "Monsieur" : (s.civilite || "Madame");

  return {
    civilite,
    raisonSociale: hasEntreprise ? (s.entreprise as string) : "/",
    attentes: ent(profil.attentes),
    missions: ent(profil.missions),
    contribution: ent(profil.contribution),
    diplome: pick(BESOINS_DIPLOMES, 4),
    objectif: ent(profil.objectif),
    budget: hasEntreprise
      ? "Contrat d'apprentissage : formation prise en charge par l'OPCO de mon employeur selon le niveau de prise en charge du RNCP41366, sans aucun frais pour moi."
      : "Contrat d'apprentissage en cours de signature : la formation sera prise en charge par l'OPCO de l'employeur selon le niveau de prise en charge du RNCP41366, sans frais pour moi.",
    projetPro: ent(profil.projet),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom de l'apprenti : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
