// ---------------------------------------------------------------------------
// « Cohésion d'équipe en entreprise – 21 h » — moteur de réponses HUMANISÉES
// Formation professionnelle non certifiante : évaluation interne + attestation de fin de formation.
// 21 h sur 3 jours (7 h par jour), présentiel intra-entreprise, 4 à 12 participants d'une même équipe.
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes de
//     l'entreprise…), puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes, dans l'ordre des 10 ateliers, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par atelier + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Maison Lumen, citée dans certaines copies, est l'entreprise FICTIVE du support de cours.
// ---------------------------------------------------------------------------

const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Cohésion d'équipe en entreprise – 21 h ».
 * Reconnue par son intitulé seulement : « cohésion d'équipe », « cohesion equipe »,
 * « Cohésion de l'équipe… », « cohésion des équipes » (accents, apostrophes et casse indifférents).
 * À tester AVANT les règles génériques (« management », « entreprise », « communication »…).
 */
export function isCOH21Formation(intitule?: string, code?: string): boolean {
  void code;
  const t = normalize(intitule).toLowerCase().replace(/[’‘`´]/g, "'").replace(/\s+/g, " ");
  return /\bcohesion (d ?' ?|de l ?' ?|de la |de |des |du |en |d )?equipes?\b/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function coh21Seed(nom?: string, prenom?: string): number {
  const src = normalize(nom) + "|" + normalize(prenom);
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

/** {e} → e au féminin ; {le} → le ; {ne} → ne ; {/rice} → rice (sinon eur) */
function accorder(txt: string, fem: boolean): string {
  return txt
    .replace(/\{\/rice\}/g, fem ? "rice" : "eur")
    .replace(/\{le\}/g, fem ? "le" : "")
    .replace(/\{ne\}/g, fem ? "ne" : "")
    .replace(/\{e\}/g, fem ? "e" : "");
}

const PAS = [1, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];
const pgcd = (a: number, b: number): number => (b === 0 ? a : pgcd(b, a % b));

/**
 * Rang dans une banque de n réponses : permutation de l'indice du stagiaire.
 * Pour n stagiaires consécutifs, les n rangs sont tous différents ; `sel` change le pas
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
  typeof idx === "number" && idx >= 0 ? idx : coh21Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 ateliers (mises en situation) :
// diagnostic, curseurs, premières impressions / intégration, écoute, feedback, rôles,
// décision / réunions / hybride, tensions, conversation difficile / alerte, charte / plan d'action
// ---------------------------------------------------------------------------
export const COH21_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Selon vous, votre service fonctionne-t-il comme un groupe ou comme une équipe, et comment décririez-vous son ambiance aujourd'hui ?", reponseAttendue: "Distinction entre groupe (objectifs juxtaposés) et équipe (but commun, complémentarité, responsabilité partagée du résultat), appuyée sur des faits observés ; repérage d'une étape de développement (formation, tension, normalisation, performance) ; capacité à dire si l'on peut signaler un problème ou une erreur sans crainte." },
    { question: "Comment décririez-vous votre propre façon de travailler, et en quoi est-elle différente de celle de vos collègues ?", reponseAttendue: "Préférences décrites avec des exemples (rythme, niveau de détail, façon d'échanger, organisation, besoin de cadre), sans étiquette ; reconnaissance que les différences peuvent devenir des complémentarités ; besoins exprimés envers les collègues." },
    { question: "Comment se passe l'arrivée d'un nouveau collègue dans votre équipe, et comment vous faites-vous une idée d'une personne que vous ne connaissez pas encore ?", reponseAttendue: "Description de l'accueil réel (référent, missions progressives, points réguliers, rapport d'étonnement ou absence de tout cela) ; conscience que les premières impressions reposent sur peu d'informations (effet de halo, biais de confirmation) ; réflexe de vérifier par des faits et des questions." },
    { question: "Quand un collègue vous raconte un problème, que faites-vous en premier ?", reponseAttendue: "Écouter sans interrompre, poser des questions ouvertes, reformuler pour vérifier sa compréhension avant de conseiller ; distinguer les faits, les opinions et les ressentis dans ce qui est dit." },
    { question: "Comment faites-vous savoir à un collègue que quelque chose ne va pas, ou au contraire qu'il a fait du bon travail ?", reponseAttendue: "Feedback donné rapidement, en privé, à partir de faits précis et de leurs effets, avec une demande concrète ; méthode structurée (SBI : situation, comportement, impact ; ou DESC : décrire, exprimer, suggérer, conclure) ; feedback positif précis ; capacité à recevoir un feedback sans se défendre." },
    { question: "Sur vos projets communs, sait-on toujours clairement qui fait quoi et qui décide ?", reponseAttendue: "Repérage des zones floues ; clarification par une matrice RACI (R réalise, A approuve et rend des comptes, C consulté avant, I informé après) avec un seul A par tâche ; conséquences concrètes des rôles flous sur le travail." },
    { question: "Comment sont prises les décisions et comment se passent les réunions dans votre équipe, y compris avec les collègues à distance ?", reponseAttendue: "Modes de décision identifiés et annoncés (décision du responsable, consultation, consentement, consensus) ; réunions avec objectif, ordre du jour, rôles et relevé de décisions ; règles pour le travail hybride (informations partagées, parole donnée aux personnes à distance)." },
    { question: "Lorsqu'une tension apparaît entre collègues, comment la repérez-vous et comment réagissez-vous en général ?", reponseAttendue: "Distinction entre désaccord utile et conflit dégradé ; recherche de la source (tâches, relations, valeurs, organisation) ; repérage des signaux faibles (silence, « eux » et « nous », copies multiples) ; connaissance de son mode spontané parmi les cinq modes de Thomas et Kilmann et choix d'un mode adapté." },
    { question: "Comment aborderiez-vous une conversation difficile avec un collègue, et que feriez-vous face à une situation plus grave ?", reponseAttendue: "Préparation (faits, effets, version de l'autre, objectif, moment et lieu), un seul sujet, faits sans généralisation, écoute et reformulation, accord précis et daté ; situations d'alerte reconnues (propos dénigrants répétés, souffrance, santé) et orientation vers le manager, les RH ou la direction, le CSE, le médecin du travail." },
    { question: "Votre équipe a-t-elle des règles communes écrites, et comment s'assure-t-elle de les appliquer dans la durée ?", reponseAttendue: "Charte d'équipe co-construite, courte et révisable : raison d'être, valeurs traduites en comportements observables, règles de fonctionnement, engagements réciproques ; rituels (météo, point court, rétrospective) ; plan d'action SMART suivi à 30, 60 et 90 jours." },
  ],
  fin: [
    { question: "Quel diagnostic portez-vous maintenant sur votre équipe : groupe ou équipe, étape de développement, sécurité psychologique ?", reponseAttendue: "Diagnostic appuyé sur des faits : but commun et responsabilité partagée, étape de Tuckman justifiée (la tension est une étape normale), ingrédients de la cohésion solides et fragiles, signes de sécurité psychologique, contribution de chacun et rôle du manager." },
    { question: "Qu'avez-vous appris sur vos préférences de fonctionnement et sur les complémentarités de l'équipe ?", reponseAttendue: "Position sur les cinq curseurs illustrée par des exemples, apports et points de vigilance, besoins exprimés aux autres ; une complémentarité concrète mise en œuvre et une friction relue à la lumière des préférences, sans étiquette." },
    { question: "Comment évitez-vous désormais les jugements hâtifs et comment l'équipe accueillera-t-elle le prochain arrivant ?", reponseAttendue: "Séparer faits et interprétations, nommer les biais (effet de halo, primauté, confirmation, affinité, erreur fondamentale d'attribution), poser la question directement ; parcours d'intégration en quatre temps avec référent, immersion dans un autre métier, accueil à distance et rapport d'étonnement." },
    { question: "Comment pratiquez-vous l'écoute active au quotidien ?", reponseAttendue: "Laisser finir, questions ouvertes et de précision, au moins une reformulation dont un ressenti avant toute réponse, aucun conseil prématuré ; repérage des faits, des opinions et des ressentis ; attention aux généralisations comme « toujours »." },
    { question: "Comment préparez-vous et donnez-vous un feedback, et comment le recevez-vous ?", reponseAttendue: "Préparation selon SBI ou la méthode DESC, faits sans généralisation, impact en « je », demande concrète et négociable, en privé et rapidement ; feedback positif précis ; en réception, reformuler avant de répondre, ne pas contre-attaquer, accueillir un compliment sans le minimiser." },
    { question: "Comment clarifiez-vous les rôles sur un projet de l'équipe ?", reponseAttendue: "Matrice RACI construite à partir de tâches formulées par un verbe, remplie d'abord individuellement, écarts discutés en se demandant ce qui est utile au client et à l'équipe, un seul A par ligne, gardien de la matrice désigné." },
    { question: "Comment l'équipe décide-t-elle et organise-t-elle ses réunions et son fonctionnement hybride ?", reponseAttendue: "Mode de décision annoncé avant chaque sujet ; décision par consentement (proposition, clarification, réactions, objections argumentées, validation avec période d'essai et date de bilan) ; réunions avec ordre du jour, rôles et relevé de décisions ; espace d'information partagé et parole donnée d'abord aux personnes à distance." },
    { question: "Comment analysez-vous une tension et choisissez-vous un mode de gestion adapté ?", reponseAttendue: "Source principale et secondaire identifiées (souvent l'organisation), signaux faibles, marche de l'escalade, modes de Thomas et Kilmann nommés, préférence pour la collaboration quand l'enjeu le justifie plutôt qu'un compromis qui ne satisfait personne, première action datée." },
    { question: "Comment conduisez-vous une conversation difficile et quand faut-il alerter plutôt que médier ?", reponseAttendue: "Fiche de préparation en cinq questions, un seul sujet, intention annoncée, faits sans jugement, écoute de l'autre, passage des positions aux besoins, accord précis et daté ; comportements répétés, dénigrants, sexistes ou souffrance relèvent de l'alerte : écouter, noter, orienter vers manager, RH ou direction, CSE, médecin du travail." },
    { question: "Quelle charte et quel plan d'action avez-vous construits, et comment les ferez-vous vivre ?", reponseAttendue: "Charte version 1 : raison d'être, valeurs traduites en comportements observables, règles (communication, réunions, décisions, désaccords, hybride, accueil), engagements réciproques dont ceux du manager, date de révision ; plan collectif et plan individuel SMART avec binôme de suivi et points à 30, 60 et 90 jours ; rituels lancés." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle.
// Aucune réponse à 1 au début : au plus 5 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — groupe ou équipe, ambiance
  [
    ["On est un service, donc une équipe. L'ambiance est correcte tant qu'il n'y a pas de rush.", 0],
    ["Chacun fait son travail de son côté ; on se croise à la machine à café. Je dirais plutôt un groupe, mais je ne sais pas bien faire la différence.", 0.5],
    ["L'ambiance dépend des semaines. Quand ça se tend, on évite de se parler.", 0],
    ["On a un objectif commun sur le papier, mais chacun le comprend à sa façon. Je pense qu'on est entre les deux.", 0.5],
    ["Je n'ai jamais entendu parler d'étapes de développement d'une équipe. Pour moi, une équipe marche ou ne marche pas.", 0],
    ["On s'entend bien, mais quand quelqu'un se trompe, on cherche d'abord qui l'a fait. Je ne suis pas sûr{e} qu'on ose tout se dire.", 0.5],
    ["C'est au chef de faire la cohésion, ce n'est pas vraiment mon sujet.", 0],
    ["Depuis l'arrivée des nouveaux et le télétravail, j'ai l'impression qu'on est moins soudés qu'avant.", 0.5],
    ["Tout va bien, il n'y a pas de problème particulier dans l'équipe.", 0],
    ["On se rend service entre collègues, mais les reproches entre services reviennent souvent. On est plutôt un groupe.", 0.5],
    ["Je ne sais pas trop, je suis arrivé{e} il y a peu de temps.", 0],
    ["En réunion, peu de gens parlent vraiment ; les vrais échanges se font après, à deux. Ce n'est pas très bon signe.", 0.5],
  ],
  // Q2 — préférences de fonctionnement
  [
    ["Je travaille normalement, comme tout le monde.", 0],
    ["Je suis plutôt rapide, j'aime avancer. Certains collègues trouvent que je ne prépare pas assez.", 0.5],
    ["J'ai déjà fait un test de personnalité qui m'a donné une couleur, mais je ne m'en souviens plus.", 0],
    ["J'ai besoin d'avoir tous les détails avant de commencer, ce qui agace parfois ceux qui veulent aller vite.", 0.5],
    ["Les différences entre collègues, c'est surtout une question de caractère, on ne peut rien y faire.", 0],
    ["Je réfléchis mieux seul{e} avant une réunion ; quand on me demande mon avis à chaud, je n'ose pas toujours.", 0.5],
    ["Je ne vois pas pourquoi on parlerait de ça au travail.", 0],
    ["J'aime planifier ; les imprévus de dernière minute me stressent beaucoup.", 0.5],
    ["Certains collègues sont lents, c'est comme ça.", 0],
    ["Je préfère qu'on me laisse de l'autonomie ; j'oublie parfois de rendre compte de ce que je fais.", 0.5],
    ["Je fais ce qu'on me demande, je n'ai pas vraiment de préférence.", 0],
    ["Je pense en parlant, et je me rends compte que je prends beaucoup de place en réunion.", 0.5],
  ],
  // Q3 — premières impressions et intégration
  [
    ["Le nouveau arrive, on lui montre son bureau et il apprend sur le tas.", 0],
    ["Je me fie à ma première impression, elle est rarement fausse.", 0],
    ["Il n'y a pas vraiment d'accueil organisé ; ça dépend de qui est disponible ce jour-là.", 0.5],
    ["Quand je suis arrivé{e}, j'ai mis plusieurs semaines à savoir à qui demander quoi.", 0.5],
    ["L'accueil, c'est le rôle des ressources humaines.", 0],
    ["Il m'est déjà arrivé de juger trop vite un collègue sur une erreur, et de me rendre compte ensuite que je m'étais trompé{e}.", 0.5],
    ["Les nouveaux doivent faire leurs preuves avant qu'on leur fasse confiance.", 0],
    ["On donne un classeur de procédures le premier jour, ça suffit en général.", 0],
    ["Je sais qu'il existe des biais, mais je ne saurais pas les nommer.", 0.5],
    ["On désigne parfois quelqu'un pour aider le nouveau, mais il n'a pas de temps prévu pour ça.", 0.5],
    ["Avec le télétravail, les nouveaux sont souvent seuls les premiers jours.", 0.5],
    ["Je ne me pose pas la question, je ne suis pas concerné{e} par l'accueil.", 0],
  ],
  // Q4 — écoute active
  [
    ["Je cherche tout de suite une solution, c'est ce qu'on attend de moi.", 0],
    ["Je lui raconte ce qui m'est arrivé dans une situation semblable, pour qu'il se sente moins seul.", 0],
    ["J'écoute, mais j'ai tendance à finir les phrases à sa place quand je vois où il veut en venir.", 0.5],
    ["Je lui dis que ce n'est pas grave et qu'il ne faut pas s'en faire.", 0],
    ["Je pose quelques questions pour comprendre, puis je donne mon avis.", 0.5],
    ["Ça dépend du moment ; si je suis occupé{e}, je l'écoute d'une oreille en continuant mon travail.", 0],
    ["J'essaie de comprendre son point de vue, mais je ne vérifie pas vraiment si j'ai bien compris.", 0.5],
    ["Je lui dis ce qu'il aurait dû faire.", 0],
    ["Je le laisse parler, mais j'ai du mal à ne pas couper quand je ne suis pas d'accord.", 0.5],
    ["J'ai entendu parler de reformulation, mais je trouve ça artificiel.", 0.5],
    ["Je transmets directement le problème au responsable.", 0],
    ["Je lui demande ce qui s'est passé, mais je mélange souvent ce qu'il a vu et ce qu'il en pense.", 0.5],
  ],
  // Q5 — feedback
  [
    ["Je ne dis rien, ça finit par passer.", 0],
    ["Je le dis franchement, devant tout le monde, comme ça c'est réglé.", 0],
    ["J'envoie un mail avec le responsable en copie, pour garder une trace.", 0],
    ["Je corrige l'erreur moi-même sans rien dire, pour ne pas vexer la personne.", 0],
    ["Je le dis à l'oral, mais je m'énerve parfois et je dis « tu fais toujours ça ».", 0.5],
    ["Pour le positif, je dis « merci, c'est bien », sans trop détailler.", 0.5],
    ["Je ne connais pas de méthode particulière pour faire une remarque.", 0],
    ["J'essaie de parler des faits, mais j'ai du mal à dire ce que ça m'a fait.", 0.5],
    ["Quand on me fait un reproche, je me justifie tout de suite.", 0.5],
    ["Je préfère en parler au responsable pour qu'il s'en charge.", 0],
    ["Je fais une remarque en privé, mais souvent longtemps après, quand j'ai accumulé.", 0.5],
    ["Les compliments, on n'en fait pas vraiment chez nous, c'est le travail normal.", 0],
  ],
  // Q6 — rôles et responsabilités
  [
    ["Tout le monde sait ce qu'il a à faire, il n'y a pas de souci.", 0],
    ["Sur certaines tâches, deux personnes pensent en être responsables, et parfois personne.", 0.5],
    ["C'est le responsable qui décide de tout, donc c'est clair.", 0],
    ["Je découvre parfois après coup que j'étais censé{e} faire quelque chose.", 0.5],
    ["Je n'ai jamais entendu parler de matrice RACI.", 0],
    ["On a des fiches de poste, mais elles ne disent rien sur les projets communs.", 0.5],
    ["Quand il y a un oubli, on se renvoie la balle.", 0],
    ["On sait qui réalise, mais pas toujours qui valide ni qui doit être prévenu.", 0.5],
    ["Ce n'est pas un sujet pour moi, je fais mes tâches.", 0],
    ["On consulte parfois trop de monde avant de décider, et ça ralentit tout.", 0.5],
    ["Les rôles changent selon qui est présent ce jour-là.", 0],
    ["Je sais ce que je fais, mais je ne sais pas toujours qui décide à la fin.", 0.5],
  ],
  // Q7 — décisions, réunions, hybride
  [
    ["On vote à main levée et la majorité l'emporte.", 0],
    ["Les réunions sont longues et on ne sait pas toujours ce qui a été décidé à la fin.", 0.5],
    ["Le responsable décide, on applique.", 0],
    ["On a une réunion le lundi, surtout pour transmettre des informations.", 0.5],
    ["Les collègues en télétravail se débrouillent, ils lisent les mails.", 0],
    ["On ne sait pas toujours si notre avis est demandé ou si la décision est déjà prise.", 0.5],
    ["Les décisions importantes se prennent souvent à la machine à café.", 0],
    ["Il n'y a pas d'ordre du jour, on parle de ce qui vient.", 0.5],
    ["Je n'ai jamais entendu parler de décision par consentement.", 0],
    ["En visio, ceux qui sont à distance parlent peu ; on les oublie un peu.", 0.5],
    ["On n'a pas besoin de règles pour le télétravail, chacun s'organise.", 0],
    ["On invite tout le monde à toutes les réunions par précaution.", 0],
  ],
  // Q8 — tensions
  [
    ["J'évite le sujet en espérant que ça se calme.", 0],
    ["Je le vois quand quelqu'un ne dit plus bonjour ou se met à tout écrire par mail.", 0.5],
    ["Pour moi, un conflit, c'est une question de personnalités incompatibles.", 0],
    ["Je dis ce que je pense, fort, et on passe à autre chose.", 0],
    ["Je cède souvent pour avoir la paix.", 0],
    ["Je pense que beaucoup de tensions viennent de l'organisation, mais je ne saurais pas l'expliquer.", 0.5],
    ["Les tensions, c'est normal dans une équipe, il ne faut pas s'en occuper.", 0],
    ["Je remarque quand un collègue se tait en réunion, mais je n'ose pas lui en parler.", 0.5],
    ["Je propose de couper la poire en deux pour que tout le monde soit content.", 0.5],
    ["C'est au manager de régler les conflits.", 0],
    ["J'en parle aux autres collègues pour savoir ce qu'ils en pensent.", 0],
    ["Je fais la différence entre un désaccord sur le travail et une attaque personnelle, mais je réagis pareil aux deux.", 0.5],
  ],
  // Q9 — conversation difficile, alerte
  [
    ["Je dis tout ce que j'ai sur le cœur, en une fois, pour vider mon sac.", 0],
    ["Je repousse ce genre de conversation le plus longtemps possible.", 0],
    ["J'essaie de choisir un moment calme, mais je ne prépare pas vraiment ce que je vais dire.", 0.5],
    ["Si c'est grave, j'organise moi-même une discussion entre les deux personnes.", 0],
    ["Je préfère passer par un mail, c'est plus simple.", 0],
    ["Je sais qu'il faut parler de faits, mais je glisse vite vers les reproches.", 0.5],
    ["Pour une situation grave, je ne saurais pas à qui m'adresser.", 0],
    ["Je pense que le manager ou les RH doivent être prévenus si quelqu'un est vraiment mal, mais je ne sais pas comment faire.", 0.5],
    ["J'attends que la personne vienne me voir.", 0],
    ["Je mène ma propre enquête auprès des collègues pour être sûr{e} de moi.", 0],
    ["Je prépare deux ou trois phrases, mais je ne sais pas comment conclure.", 0.5],
    ["Je sais qu'il existe un CSE et un médecin du travail, mais je ne vois pas bien leur rôle dans ces situations.", 0.5],
  ],
  // Q10 — charte et plan d'action
  [
    ["Non, on n'a pas de règles écrites, et je ne suis pas sûr{e} que ce soit utile.", 0],
    ["Il y a un règlement intérieur, ça suffit.", 0],
    ["On a des habitudes, mais elles ne sont écrites nulle part.", 0.5],
    ["On a eu une charte il y a quelques années, rédigée par la direction ; plus personne ne la lit.", 0.5],
    ["Les valeurs de l'entreprise sont affichées dans l'entrée, c'est ça la charte.", 0],
    ["On prend de bonnes résolutions après les séminaires, mais on ne fait pas de suivi.", 0.5],
    ["Je ne sais pas ce qu'est un plan d'action SMART.", 0],
    ["On fait parfois un point d'équipe, mais il n'est pas régulier.", 0.5],
    ["Les règles, c'est au responsable de les fixer.", 0],
    ["On se fixe des objectifs, mais ils restent vagues, du genre « mieux communiquer ».", 0.5],
    ["Je ne vois pas comment des règles écrites changeraient l'ambiance.", 0],
    ["Je serais d'accord pour écrire des règles, si tout le monde participe.", 0.5],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["Nous étions un groupe : chacun défendait sa partie. Nous avons maintenant un but commun écrit dans la charte et une responsabilité partagée du résultat client.", 1],
    ["Je situe l'équipe à l'étape de tension de Tuckman, relancée par l'arrivée des nouveaux et le télétravail. Ce n'est pas un échec, c'est une étape à accompagner.", 1],
    ["La frise m'a montré qu'on ne percevait pas tous la même étape ; cet écart est une information en soi.", 1],
    ["La sécurité psychologique était fragile : on n'osait pas signaler une erreur. J'ai décidé de remercier celui qui signale un problème plutôt que de chercher un coupable.", 1],
    ["Nos ingrédients solides sont la confiance entre anciens et la communication orale ; les fragiles, les rôles et les règles.", 0.5],
    ["La cohésion, ce n'est pas que l'affaire du manager : chacun y contribue par ses comportements quotidiens.", 1],
    ["Je dirais qu'on passe de la tension à la normalisation, puisqu'on vient de se donner des règles communes.", 1],
    ["Mon engagement « Je peux… » : poser ma question en réunion au lieu d'attendre la fin.", 0.5],
    ["Une équipe, c'est un but commun, des compétences complémentaires et une responsabilité partagée ; on avait surtout des objectifs juxtaposés.", 1],
    ["Le diagnostic partagé m'a aidé{e} à parler de faits plutôt que de reproches.", 0.5],
    ["Le manager a reconnu avoir validé un plan trop vite : depuis, j'ose davantage dire quand quelque chose ne va pas.", 1],
    ["Nos deux priorités : clarifier les rôles et se donner des règles pour l'hybride.", 0.5],
  ],
  [
    ["Je suis plutôt rapide et vue d'ensemble ; je sais maintenant que mon collègue préparé et précis protège nos projets des erreurs.", 1],
    ["Sur le curseur de l'échange, je réfléchis seul{e} d'abord : j'ai demandé à recevoir l'ordre du jour la veille.", 1],
    ["Une préférence n'est pas une compétence : je peux agir vite en urgence même si je préfère préparer.", 1],
    ["On a formé un binôme rapide et préparé pour les devis urgents, c'est notre complémentarité.", 1],
    ["J'ai compris que ma friction avec un collègue venait de nos rythmes différents, pas de sa mauvaise volonté.", 1],
    ["Je ne colle plus d'étiquette du genre « c'est un lent » ; je parle de besoins.", 0.5],
    ["Je planifie beaucoup ; j'ai demandé qu'on me prévienne plus tôt des changements, et j'accepte mieux l'imprévu.", 0.5],
    ["Mon besoin écrit sur le panneau : « que l'on m'appelle plutôt qu'un long message écrit ».", 0.5],
    ["L'équipe est très regroupée sur le curseur « s'adapter » : on risque de manquer d'anticipation, on l'a noté.", 1],
    ["Je pense à voix haute ; je laisse maintenant un temps de réflexion aux collègues avant de relancer.", 1],
    ["Les cinq curseurs ouvrent le dialogue, ce n'est pas un test qui enferme.", 0.5],
    ["J'ai besoin d'autonomie, mais je rends compte chaque vendredi pour que les autres aient de la visibilité.", 1],
  ],
  [
    ["Je sépare maintenant le fait de l'interprétation : « il part à dix-sept heures trente » est un fait, « il n'est pas impliqué » est une interprétation.", 1],
    ["J'ai reconnu chez moi l'effet de halo : une première erreur avait coloré tout mon jugement sur une collègue.", 1],
    ["Plutôt que de supposer, je pose la question directement à la personne.", 1],
    ["Notre parcours d'intégration a quatre temps : avant l'arrivée, premier jour, premières semaines, fin de période, avec un référent.", 1],
    ["Je me suis proposé{e} comme référent{e} pour le prochain arrivant.", 0.5],
    ["Le parcours prévoit une immersion dans un autre métier de l'équipe et un rapport d'étonnement.", 1],
    ["Pour l'accueil à distance : outils testés avant l'arrivée et premier appel vidéo de bienvenue.", 1],
    ["Le biais de confirmation me fait chercher ce qui confirme mon idée ; je croise maintenant mon avis avec d'autres collègues.", 1],
    ["Un nouvel arrivant qui n'ose pas poser de questions est un signal à prendre au sérieux.", 0.5],
    ["Le rapport d'étonnement aide aussi l'équipe à progresser, pas seulement le nouveau.", 0.5],
    ["Les différences entre générations s'expliquent souvent plus par le moment de vie ou le métier que par l'âge.", 0.5],
    ["J'évite de juger un collègue sur une première impression : je décris d'abord ce que j'ai observé.", 1],
  ],
  [
    ["Je laisse finir, puis je reformule : « Si je comprends bien, le plan est arrivé trop tard pour que vous l'intégriez ? ».", 1],
    ["Je pose des questions ouvertes : « Qu'est-ce qui vous a posé problème ? » plutôt que « Le plan est validé ? ».", 1],
    ["Je reformule aussi le ressenti : « Vous vous êtes senti mis en difficulté devant le client ».", 1],
    ["Je ne donne plus de conseil avant d'avoir vérifié que j'ai compris.", 1],
    ["Je repère les faits, les opinions et les ressentis dans ce que me dit un collègue.", 1],
    ["Quand j'entends « toujours » ou « jamais », je reviens au fait précis.", 1],
    ["Le trio d'écoute m'a montré qu'il est difficile de se retenir de conseiller.", 0.5],
    ["Je supporte mieux les silences, ils laissent l'autre aller au bout de sa pensée.", 0.5],
    ["Ma formule à réutiliser : « Si je vous suis bien… ».", 0.5],
    ["J'arrête mon travail quand un collègue vient me parler, pour vraiment l'écouter.", 0.5],
    ["Je vérifie ma compréhension avant de répondre, surtout au téléphone.", 1],
    ["L'écoute active consiste à comprendre avant de répondre, c'est ce que j'essaie de faire.", 1],
  ],
  [
    ["Je prépare avec SBI : situation, comportement, impact, puis une demande concrète.", 1],
    ["Avec la méthode DESC : je décris, j'exprime, je suggère, je conclus.", 1],
    ["Je donne un feedback correctif en privé, de vive voix et rapidement après les faits.", 1],
    ["Je décris les faits sans généraliser : plus de « tu fais toujours ça ».", 1],
    ["Je fais aussi des feedbacks positifs précis : ce que la personne a fait et l'effet que ça a eu.", 1],
    ["Quand je reçois un reproche, je reformule avant de donner ma version.", 1],
    ["Ma demande est négociable : l'autre peut en discuter ou proposer autre chose.", 1],
    ["J'ai préparé un feedback réel à donner à un collègue dans les deux semaines.", 0.5],
    ["J'accueille un compliment sans le minimiser, je dis simplement merci.", 0.5],
    ["J'exprime l'impact en « je » : « je me suis retrouvé{e} à improviser ».", 1],
    ["Corriger le travail de quelqu'un sans le lui dire n'aide pas ; je préviens et je montre.", 0.5],
    ["L'équipe a décidé d'une règle simple : un feedback se donne dans la semaine, en privé.", 0.5],
  ],
  [
    ["On a fait une matrice RACI sur notre projet en cours : un seul A par tâche.", 1],
    ["R réalise, A approuve et rend des comptes, C est consulté avant, I est informé après.", 1],
    ["Les tâches sont formulées par un verbe, par exemple « valider le plan final ».", 1],
    ["On a d'abord rempli seuls la grille, puis comparé : les écarts étaient nombreux.", 1],
    ["J'ai découvert que j'étais attendu{e} en A sur une tâche sans le savoir.", 0.5],
    ["En cas de désaccord, on s'est demandé ce qui était le plus utile pour le client et pour l'équipe.", 1],
    ["Le responsable ne s'attribue pas tous les A : on regarde qui a l'information pour décider.", 1],
    ["On a désigné un gardien de la matrice pour la tenir à jour.", 0.5],
    ["Trop de C ralentit tout : on a réduit le nombre de personnes consultées.", 0.5],
    ["Des rôles clairs évitent qu'on se renvoie la balle après un oubli.", 0.5],
    ["La matrice décrit d'abord la réalité, puis la version cible.", 1],
    ["Les écarts découverts ont alimenté la charte d'équipe.", 0.5],
  ],
  [
    ["Avant chaque sujet, on annonce le mode de décision : le responsable décide, on consulte ou on décide par consentement.", 1],
    ["En consentement, la décision passe si personne n'a d'objection argumentée ; une préférence n'est pas une objection.", 1],
    ["On a pris une vraie décision par consentement, avec une période d'essai, un responsable et une date de bilan.", 1],
    ["Nos réunions ont un ordre du jour minuté, un animateur, un gardien du temps et un relevé de décisions.", 1],
    ["On donne la parole d'abord aux collègues à distance en visio.", 1],
    ["Les informations sont dans un espace partagé, plus à la machine à café.", 1],
    ["Le défi coopératif m'a montré que l'information se perd vite quand chacun garde ses cartes.", 0.5],
    ["On n'invite plus tout le monde à toutes les réunions.", 0.5],
    ["Chacun peut redire avec ses mots la décision prise, c'est notre test.", 0.5],
    ["Une objection a vraiment amélioré notre proposition sur les jours de présence commune.", 1],
    ["Je fais la différence entre consentement et consensus.", 0.5],
    ["La personne « en télétravail » du défi a été oubliée : on en a tiré une règle pour nos réunions.", 1],
  ],
  [
    ["Je cherche d'abord la source : tâches, relations, valeurs ou organisation. Souvent, c'est l'organisation.", 1],
    ["Deux priorités contradictoires sans règle d'arbitrage, c'est un problème d'organisation, pas de personne.", 1],
    ["Je repère les signaux faibles : un collègue qui se tait, le « eux » et « nous », les mails avec copies.", 1],
    ["Mon mode spontané est l'évitement ; je sais maintenant quand il me dessert.", 1],
    ["Le compromis « on coupe la poire en deux » peut ne satisfaire personne ; la collaboration cherche une vraie solution.", 1],
    ["J'identifie la marche de l'escalade : gêne, malentendu, crispation, affrontement, rupture.", 1],
    ["Un désaccord sur le travail est utile ; il devient conflit quand on attaque la personne.", 1],
    ["Je propose une première action concrète, avec qui et quand.", 0.5],
    ["Je n'analyse plus une tension en cherchant le coupable mais en regardant le système.", 0.5],
    ["La compétition a sa place en urgence, mais pas comme mode habituel.", 0.5],
    ["On a écrit nos « premiers réflexes » face à une tension.", 0.5],
    ["J'accommode souvent pour avoir la paix ; j'essaie maintenant d'affirmer mon besoin.", 1],
  ],
  [
    ["Je prépare avec la fiche : faits, effets, version de l'autre, objectif, moment et lieu.", 1],
    ["Un seul sujet par conversation, avec des faits récents, pas l'inventaire des griefs.", 1],
    ["J'annonce le sujet et mon intention dès le début, puis je laisse l'autre donner sa version.", 1],
    ["On passe des positions aux besoins, et on conclut par un accord précis et daté.", 1],
    ["Des propos dénigrants répétés relèvent de l'alerte : j'écoute, je note les faits, j'oriente vers le manager, les RH, le CSE ou le médecin du travail.", 1],
    ["Je ne mène pas ma propre enquête : ce n'est pas mon rôle.", 0.5],
    ["Une collègue qui ne dort plus et pleure avant de venir : c'est une alerte santé, avec son accord.", 1],
    ["Un désaccord sur un outil ou sur un client se traite par une conversation ou une médiation.", 1],
    ["J'ai noté une conversation que je vais avoir dans les quinze prochains jours.", 0.5],
    ["En médiation, le médiateur facilite et ne tranche qu'en dernier recours.", 0.5],
    ["Je reformule avant de répondre, même quand je suis touché{e}.", 0.5],
    ["Ma phrase d'ouverture : « Je voudrais qu'on parle de mardi, pour trouver une règle qui nous aide tous les deux ».", 1],
  ],
  [
    ["On a écrit notre charte version 1 : raison d'être, trois valeurs traduites en comportements, règles et engagements.", 1],
    ["Chaque valeur dit ce qu'on fera lundi matin, par exemple : un désaccord se dit d'abord à la personne concernée.", 1],
    ["Le manager a pris lui aussi des engagements, comme annoncer le mode de décision.", 1],
    ["Mon plan individuel a trois actions SMART, un binôme de suivi et des points à 30, 60 et 90 jours.", 1],
    ["À 30 jours on démarre, à 60 on installe, à 90 on évalue et on ajuste.", 1],
    ["On lance la météo d'équipe au point du lundi et une rétrospective chaque mois.", 1],
    ["La charte sera relue à une date fixée et à chaque arrivée dans l'équipe.", 1],
    ["Le plan collectif compte quatre actions, chacune avec un responsable unique.", 0.5],
    ["Une action SMART dit quoi, qui, comment vérifier et pour quand.", 1],
    ["En rétrospective, on analyse le fonctionnement, pas les personnes.", 0.5],
    ["J'ai signé la charte ; je sais que c'est une version révisable.", 0.5],
    ["On a désigné un gardien de la charte, rôle qui tournera.", 0.5],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [54, 51, 45, 45, 4, 8, 57, 36, 47, 13];

export function getCOH21AutoAnswers(
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
 * 8 stagiaires consécutifs (rang dans la session, sinon empreinte du nom).
 */
const NOTES_DEBUT_SUR_20 = [10, 7, 12, 8, 5, 11, 6, 9];
export function coh21NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6, soit 4 à 12/20). */
export function coh21BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((coh21NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `coh21BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function coh21ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = coh21BonnesQcmDebut(n, idx, nom, prenom);
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
 * Notes des exercices, différentes d'un stagiaire à l'autre pour un même exercice :
 * QCM de module (6 questions : 3 à 6 bonnes réponses), mise en situation sur 5 (2,5 à 5).
 */
const NOTES_QCM_SUR_6 = [5, 4, 6, 3];
const NOTES_EXERCICE_SUR_5 = [4, 3, 4.5, 3.5, 5, 2.5];
export function coh21NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_6 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie stagiaire), attentes, missions et contribution (partie entreprise).
// Tous les participants appartiennent à la même équipe ou à des services qui travaillent ensemble.
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
    besoin: "Animer une équipe aux métiers différents et installer des règles communes acceptées par tous.",
    objectif: "Je veux donner à l'équipe un cadre clair : rôles, modes de décision annoncés, réunions utiles et une charte que nous aurons écrite ensemble.",
    projet: "Elle m'aidera à tenir mon rôle de responsable d'équipe avec plus d'assurance, notamment face aux tensions.",
    attentes: "L'entreprise attend que {le_sal} installe des rituels d'équipe et une charte suivie dans la durée.",
    missions: "Encadrement de l'équipe, organisation du travail, arbitrage des priorités, réunions d'équipe.",
    contribution: "Elle doit réduire les tensions entre les métiers de l'équipe et rendre les réunions plus efficaces.",
  },
  {
    besoin: "Mieux coordonner avec la conception et la réalisation les engagements pris auprès des clients.",
    objectif: "Mon objectif est de vérifier les délais avec les collègues concernés avant de m'engager auprès d'un client, sans perdre en réactivité commerciale.",
    projet: "Elle me permettra de suivre des projets plus importants en m'appuyant davantage sur l'équipe.",
    attentes: "Nous attendons que {le_sal} consulte les personnes qui réalisent avant tout engagement de date.",
    missions: "Relation client, chiffrage, suivi commercial des projets, transmission des demandes à la conception.",
    contribution: "Elle doit limiter les engagements de délais intenables et les reproches qui en découlent.",
  },
  {
    besoin: "Être informé{e} à temps des modifications et faire remonter les difficultés du terrain sans conflit.",
    objectif: "Je souhaite qu'on se donne une règle claire pour les changements de dernière minute et savoir dire ce qui ne va pas sans m'énerver.",
    projet: "Elle m'aidera à transmettre mon expérience du terrain aux collègues du bureau.",
    attentes: "L'entreprise attend que {le_sal} exprime les difficultés du terrain de façon constructive.",
    missions: "Interventions chez les clients, préparation du matériel, retours d'information au bureau.",
    contribution: "Elle doit réduire les reprises de travail dues à des informations arrivées trop tard.",
  },
  {
    besoin: "Gérer les demandes simultanées de plusieurs collègues et savoir qui décide des priorités.",
    objectif: "Mon objectif est de pouvoir demander un arbitrage clair quand je reçois deux urgences contradictoires, au lieu de tout commencer sans rien finir.",
    projet: "Elle me permettra d'organiser mon poste avec moins de stress et plus de visibilité.",
    attentes: "Nous attendons que {le_sal} signale les priorités contradictoires et participe à la règle d'arbitrage.",
    missions: "Administration des ventes, commandes, facturation, suivi des dossiers clients.",
    contribution: "Elle doit fluidifier le traitement des commandes et des demandes internes.",
  },
  {
    besoin: "Recevoir les informations du client de façon complète et ne plus être mis{e} en cause pour des retards qui ne dépendent pas de moi.",
    objectif: "Je veux qu'on clarifie qui transmet quoi entre le commercial, la conception et la pose, et pouvoir le dire calmement.",
    projet: "Elle m'aidera à travailler plus sereinement avec les autres métiers de l'équipe.",
    attentes: "L'entreprise attend que {le_sal} participe à la clarification des rôles sur les projets.",
    missions: "Conception des plans, modifications demandées par les clients, transmission aux équipes de réalisation.",
    contribution: "Elle doit limiter les plans refaits et les malentendus entre bureau et terrain.",
  },
  {
    besoin: "S'intégrer dans l'équipe, savoir à qui demander quoi et oser poser ses questions.",
    objectif: "Mon objectif est de trouver ma place dans l'équipe et d'oser dire quand je ne sais pas ou quand je me suis trompé{e}.",
    projet: "Elle me permettra de devenir rapidement autonome sur mon poste.",
    attentes: "Nous attendons que {le_sal} s'intègre rapidement et apporte son regard neuf sur notre fonctionnement.",
    missions: "Prise de poste, apprentissage des outils et des procédures, premiers dossiers en autonomie.",
    contribution: "Elle doit réussir l'intégration de {un} {collab} récemment arrivé{e} et nourrir notre futur parcours d'accueil.",
  },
  {
    besoin: "Transmettre son expérience aux nouveaux arrivants et faire reconnaître son savoir-faire.",
    objectif: "Je souhaite devenir un vrai tuteur pour les nouveaux, avec du temps prévu pour ça, et qu'on reconnaisse ce que j'apporte.",
    projet: "Elle m'aidera à jouer un rôle de référent{e} dans l'équipe.",
    attentes: "L'entreprise attend que {le_sal} accompagne les nouveaux arrivants avec bienveillance.",
    missions: "Réalisation des chantiers les plus techniques, conseils aux collègues, accueil des nouveaux.",
    contribution: "Elle doit préserver et transmettre le savoir-faire de l'équipe.",
  },
  {
    besoin: "Ne pas être tenu{e} à l'écart quand je travaille à distance et recevoir les informations en même temps que les autres.",
    objectif: "Mon objectif est qu'on fixe des règles pour le travail hybride : jours de présence commune, disponibilité, délai de réponse, partage des informations.",
    projet: "Elle me permettra de concilier télétravail et vraie participation à la vie de l'équipe.",
    attentes: "Nous attendons que {le_sal} contribue aux règles de fonctionnement de l'équipe hybride.",
    missions: "Gestion administrative et facturation, en partie en télétravail.",
    contribution: "Elle doit éviter les pertes d'information entre collègues sur site et à distance.",
  },
  {
    besoin: "Tenir des réunions d'équipe plus courtes et qui aboutissent à des décisions suivies.",
    objectif: "Je veux apprendre à préparer un ordre du jour, annoncer le mode de décision et rédiger un relevé de décisions.",
    projet: "Elle m'aidera à animer certaines réunions de l'équipe à la place du responsable.",
    attentes: "L'entreprise attend que {le_sal} contribue à rendre les réunions plus efficaces.",
    missions: "Coordination de projets, planification, préparation des points d'équipe.",
    contribution: "Elle doit faire gagner du temps à l'équipe et améliorer le suivi des décisions.",
  },
  {
    besoin: "Savoir dire un désaccord sans créer de conflit et donner un feedback à un collègue.",
    objectif: "Mon objectif est d'oser parler directement aux collègues concernés plutôt que de garder pour moi ou d'en parler aux autres.",
    projet: "Elle me permettra d'avoir des relations de travail plus simples et plus franches.",
    attentes: "Nous attendons que {le_sal} exprime ses désaccords directement et de façon constructive.",
    missions: "Préparation et contrôle des commandes, relations avec les autres services.",
    contribution: "Elle doit réduire les malentendus et les non-dits entre services.",
  },
  {
    besoin: "Comprendre les façons de travailler de chacun pour mieux coopérer avec les autres services.",
    objectif: "Je souhaite mieux comprendre pourquoi certains collègues travaillent différemment de moi et en faire une force.",
    projet: "Elle m'aidera à travailler en transversal sur les projets qui mobilisent plusieurs services.",
    attentes: "L'entreprise attend que {le_sal} coopère plus facilement avec les autres services sur les projets communs.",
    missions: "Suivi qualité, contrôle des réalisations, retours clients, coordination avec les autres services.",
    contribution: "Elle doit améliorer la coopération entre les services de l'entreprise.",
  },
  {
    besoin: "Repérer tôt les tensions dans l'équipe et savoir quand et vers qui orienter une situation grave.",
    objectif: "Mon objectif est de savoir réagir face à une tension avant qu'elle ne s'installe, et connaître les bons interlocuteurs si la situation dépasse un désaccord.",
    projet: "Elle m'aidera dans mon rôle de relais auprès de mes collègues.",
    attentes: "Nous attendons que {le_sal} contribue à un climat d'équipe serein et sache orienter vers les bons interlocuteurs.",
    missions: "Planification des interventions, relation avec les clients et les fournisseurs, appui au responsable.",
    contribution: "Elle doit prévenir la dégradation des relations de travail dans l'équipe.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilCOH21(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

function entAccords(txt: string, fem: boolean): string {
  return accorder(
    txt
      .replace(/\{un\}/g, fem ? "une" : "un")
      .replace(/\{collab\}/g, fem ? "collaboratrice" : "collaborateur")
      .replace(/\{le_sal\}/g, fem ? "la salariée" : "le salarié"),
    fem,
  );
}

export function getCOH21Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return entAccords(profilCOH21(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production du stagiaire sur la situation réelle de son équipe
// Indices : 0 diagnostic, 1 curseurs, 2 premières impressions / intégration, 3 trio d'écoute,
//           4 feedback, 5 RACI, 6 défi coopératif / consentement, 7 tensions, 8 conversation
//           difficile / alerte, 9 charte / plan d'action ; 8 productions par banque.
// La k-ième production de chaque banque suit le même salarié fictif : un stagiaire garde le même
// poste d'un exercice à l'autre.
//   0 responsable d'équipe · 1 chargé·e d'affaires · 2 technicien·ne d'intervention
//   3 assistant·e administration des ventes · 4 concepteur·rice au bureau d'études
//   5 nouvel·le arrivant·e · 6 salarié·e présent·e depuis longtemps · 7 gestionnaire en télétravail partiel
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Diagnostic partagé
  [
    "Je suis responsable de l'équipe. Sur le cas Maison Lumen, j'ai vu un groupe plus qu'une équipe : chacun défend sa partie et les reproches circulent entre bureau et terrain. Pour nous, je me suis placé{e} à l'étape de tension sur la frise ; plusieurs collègues se sont placés en normalisation, ce qui m'a surpris{e}. Ingrédient le plus fragile selon le groupe : les règles. Ma fiche « Le manager peut… » : annoncer avant chaque réunion ce qui sera décidé et comment.",
    "Je suis chargé{e} d'affaires. Dans le cas fictif, le service est revenu à l'étape de tension avec le télétravail et l'arrivée de deux nouveaux. Chez nous, je situe l'équipe au même endroit : les délais promis aux clients créent des frictions avec la pose. Ingrédient à consolider : les rôles. Ma fiche « Je peux… » : appeler la personne qui réalise avant de confirmer une date au client, dès la semaine prochaine.",
    "Je suis technicien{ne} d'intervention. Le silence de Maëlle sur l'erreur de cotes m'a rappelé des situations réelles : on préfère réparer sans rien dire. J'ai placé l'équipe à l'étape de tension, avec un fait : la semaine dernière, une modification nous est arrivée le matin même. Ingrédient rouge pour moi : la communication. Ma fiche « Je peux… » : signaler le jour même un problème de chantier au bureau, par téléphone.",
    "Je suis assistant{e} à l'administration des ventes. Le cas Maison Lumen montre un groupe : objectifs juxtaposés, peu de responsabilité partagée. Pour notre équipe, je me suis placé{e} sur la frise entre l'étape de tension et celle de normalisation. Le groupe a retenu deux ingrédients prioritaires : les rôles et la reconnaissance. Ma fiche « Je peux… » : dire merci précisément quand un collègue m'aide sur un dossier urgent.",
    "Je suis concept{/rice} au bureau d'études. Sur le cas, j'ai noté que les reproches visent les personnes alors que le problème vient de la transmission des informations. Pour nous, j'ai choisi l'étape de tension sur la frise, avec un exemple de plan refait trois fois. La sécurité psychologique me paraît fragile : on hésite à dire qu'on n'a pas compris. Ma fiche « Je peux… » : poser ma question en réunion au lieu d'attendre la fin.",
    "Je suis nouvel{le} arrivant{e} dans l'équipe. Dans le cas Maison Lumen, je me suis reconnu{e} dans Maëlle qui n'ose pas poser sa question. Sur la frise, je ne savais pas trop où me placer ; j'ai choisi l'étape de formation, parce que pour moi tout est encore nouveau. Ingrédient que j'ai coloré en orange : les règles, que je ne connais pas encore. Ma fiche « Je peux… » : demander à mon référent un point de quinze minutes chaque vendredi.",
    "Je suis dans l'entreprise depuis longtemps. J'ai dit au groupe que l'équipe a connu une période de performance, et qu'elle est revenue à l'étape de tension avec les changements récents ; Tuckman explique que ça arrive. Le groupe a choisi la confiance et les règles comme priorités. Ma fiche « Je peux… » : prendre le temps d'expliquer aux nouveaux pourquoi on fait les choses ainsi, au lieu de corriger sans rien dire.",
    "Je suis gestionnaire, en télétravail une partie de la semaine. Sur le cas, j'ai relevé que les collègues à distance sont les derniers informés, ce qui relance la tension. J'ai placé notre équipe à l'étape de tension sur la frise. Ingrédient rouge pour moi : la communication à distance. Ma fiche « Je peux… » : poser dans l'espace partagé, chaque soir, les informations utiles aux autres.",
  ],
  // 1 — Curseurs de fonctionnement
  [
    "Mes curseurs : rythme rapide (4), vue d'ensemble (4), je pense en parlant (5), j'aime planifier (3), autonomie (4). Ce que j'apporte : je débloque les situations. Ce qui peut gêner : je décide parfois avant que les autres aient eu le temps de réfléchir. Mon besoin : qu'on me dise quand je vais trop vite. Complémentarité trouvée en trio : je lance, un collègue plus préparé sécurise. Sur le panneau, j'ai écrit : « Me signaler un oubli tout de suite ».",
    "Sur le curseur du rythme je suis à 5, très rapide ; sur le niveau de détail à 2, plutôt vue d'ensemble. Exemple : je réponds aux clients dans l'heure, quitte à préciser après. Ce qui peut gêner : les collègues de la conception reçoivent des informations incomplètes. Mon besoin : qu'on me dise ce qui manque, sans reproche. En trio, on a trouvé une complémentarité : un binôme rapide et préparé pour les devis urgents.",
    "Mes positions sur les curseurs : rythme préparé (2), précision (4), je réfléchis seul{e} d'abord (2), je m'adapte (4), autonomie (5). Exemple : sur le terrain, je m'adapte à ce que je trouve. Ce que j'apporte : je trouve des solutions sur place. Ce qui peut gêner : je rends peu compte. Mon besoin écrit sur le panneau : « que l'on m'appelle plutôt qu'un long message écrit ». Friction relue : mon agacement avec le bureau vient aussi de nos rythmes différents.",
    "Curseur de l'organisation : je planifie (1). Curseur du cadre : consignes précises (2). Exemple : je prépare ma liste de tâches chaque matin et les imprévus me déstabilisent. Ce que j'apporte : fiabilité et suivi. Ce qui peut gêner : je peux paraître rigide dans l'urgence. Mon besoin : être prévenu{e} des changements le plus tôt possible. Complémentarité trouvée avec un collègue qui s'adapte facilement : il prend les urgences, je sécurise le suivi.",
    "Sur le curseur du niveau de détail, je suis très précis{e} (5) ; sur celui du rythme, je prépare avant d'agir (1). Exemple : je vérifie toutes les cotes avant d'envoyer un plan. Ce que j'apporte : j'évite les erreurs coûteuses. Ce qui peut gêner : je parais lent{e} quand tout le monde est pressé. En trio, on a compris que ma différence avec le chargé d'affaires protège nos projets. Mon besoin : recevoir les informations du client en une seule fois.",
    "J'ai hésité à me positionner sur les lignes au sol ; le formateur a rappelé qu'on pouvait rester à l'écart, ce qui m'a rassuré{e}. Sur ma fiche : je réfléchis seul{e} d'abord (1), consignes précises (2). Exemple : je n'ose pas répondre à chaud en réunion. Ce que j'apporte : des avis réfléchis. Mon besoin, écrit sur le panneau : « recevoir l'ordre du jour la veille ». Les curseurs m'ont aidé{e} à dire ce besoin sans me sentir jugé{e}.",
    "Sur le curseur du cadre, je suis à 5 : j'aime l'autonomie. Sur le rythme, plutôt préparé. Exemple : je règle les problèmes techniques sans attendre qu'on me le demande. Ce qui peut gêner : j'oublie de prévenir les autres, et les nouveaux ne comprennent pas ce que je fais. Ce que j'apporte : de l'expérience. Mon besoin : qu'on me laisse le temps d'expliquer. On a noté que l'équipe est très regroupée sur l'autonomie, ce qui peut créer des oublis de transmission.",
    "Mes curseurs : rythme préparé (2), précision (4), je réfléchis seul{e} d'abord (2), je planifie (2), autonomie (4). Exemple : en télétravail, j'organise ma journée seul{e}. Ce que j'apporte : un suivi rigoureux de la facturation. Ce qui peut gêner : je réponds tard aux messages quand je suis concentré{e}. Mon besoin : que les informations importantes soient écrites dans l'espace partagé, pas seulement dites à l'oral.",
  ],
  // 2 — Premières impressions et parcours d'intégration
  [
    "Phrase analysée : « Léo part tous les jours à dix-sept heures trente, il n'est pas impliqué ». Fait : il part à dix-sept heures trente. Interprétation : il n'est pas impliqué. Biais : erreur fondamentale d'attribution. Question à poser : « Comment s'organisent tes journées ? ». Pour notre parcours d'intégration, je me suis engagé{e} à préparer avant l'arrivée le poste, les accès et le planning de la première semaine, et à fixer un point à la fin de la période d'intégration avec le rapport d'étonnement.",
    "Phrase : « Léo a tout de suite proposé un nouvel outil, il veut se faire remarquer ». Fait : il a proposé un outil. Interprétation : il veut se faire remarquer. Biais d'affinité ou de confirmation selon qui juge. Question : « Qu'est-ce que cet outil changerait pour nous ? ». Dans notre parcours d'intégration, j'ai proposé une immersion d'une demi-journée avec moi chez un client, pour que le nouvel arrivant comprenne la relation commerciale.",
    "Phrase : « Maëlle vient de l'hôtellerie, elle aura du mal avec la technique ». Fait : elle vient de l'hôtellerie. Interprétation : elle aura du mal. Biais : effet de halo. Je me suis rendu compte que j'avais pensé la même chose d'un ancien collègue, qui s'est révélé excellent. Pour le parcours d'intégration, j'accueille une immersion sur le terrain dans les premières semaines, avec du temps prévu pour expliquer.",
    "Phrase : « Maëlle ne pose jamais de questions, elle ne s'intéresse pas au métier ». Fait : elle ne pose pas de questions en réunion. Interprétation : elle ne s'intéresse pas au métier. Biais : erreur fondamentale d'attribution. Question à poser : « Qu'est-ce qui t'aiderait à poser tes questions ? ». Dans le parcours d'intégration, j'ai pris en charge le premier jour : accueil, présentation de l'équipe et des outils, et la liste « à qui demander quoi ».",
    "J'ai reconnu l'effet de halo : une première erreur sur un plan peut colorer tout le jugement sur un nouveau. Fait et interprétation séparés pour les six phrases avec mon binôme. Pour notre parcours d'intégration, j'ai proposé que le nouvel arrivant passe une journée au bureau d'études pour comprendre comment un plan est fait, et que le rapport d'étonnement soit lu en réunion d'équipe.",
    "Étant arrivé{e} récemment, j'ai pu dire ce qui m'avait manqué : savoir à qui demander quoi, et un référent disponible. Dans l'exercice faits ou interprétations, j'ai repéré le biais de confirmation. Pour le parcours d'intégration, j'ai proposé une liste des interlocuteurs par sujet et un point chaque semaine avec le référent pendant les premières semaines. Je rédigerai mon propre rapport d'étonnement.",
    "Je me suis proposé{e} comme référent{e} pour le prochain arrivant, à condition d'avoir du temps prévu pour ça. Sur les phrases, j'ai reconnu que j'avais jugé trop vite une nouvelle collègue sur une seule erreur : effet de halo. Dans le parcours d'intégration, j'ai ajouté une règle : quand je corrige le travail d'un nouveau, je le préviens et je lui montre comment faire.",
    "Pour le parcours d'intégration, je me suis occupé{e} de l'accueil à distance : accès aux outils testés avant l'arrivée, premier appel vidéo de bienvenue, binôme joignable par messagerie les jours de télétravail. Sur les premières impressions, j'ai repéré qu'on juge vite les collègues qu'on voit peu ; la question directe reste le meilleur réflexe.",
  ],
  // 3 — Trio d'écoute
  [
    "En écoutant{e} sur la situation de Thomas, j'ai eu envie de proposer une solution dès la deuxième minute. Je me suis retenu{e} et j'ai reformulé : « Si je comprends bien, le plan est arrivé trop tard pour que vous l'intégriez ? ». L'observateur a noté deux reformulations, mais aucune sur le ressenti. Fait central : plan reçu à 8 h 30 pour une pose à 9 h. Le mot « toujours » généralise. Ma formule à réutiliser : « Si je vous suis bien… ».",
    "En narrat{/rice}, j'ai joué Élodie. Je me suis senti{e} compris{e} quand l'écoutant a reformulé : « Vous recevez les informations par bribes et c'est vous qu'on accuse ». En écoutant{e}, j'ai posé une question ouverte : « Qu'est-ce qui vous aiderait ? ». J'ai trouvé difficile de ne pas donner mon avis. Faits, opinions et ressentis repérés par l'observateur. Ma formule : « Vous voulez dire que… ? ».",
    "J'ai observé un trio : l'écoutant laissait finir les phrases et a reformulé un ressenti, « vous vous êtes senti mis en difficulté devant le client ». Dans la situation de Thomas, j'ai noté le fait (plan arrivé à 8 h 30), l'opinion (« au bureau, ils ne se rendent pas compte ») et le ressenti (gêne). En écoutant{e}, j'ai eu du mal à supporter le silence.",
    "En écoutant{e} sur la situation de Maëlle, j'ai reformulé deux fois : « Vous ne savez pas encore à qui demander quoi » et « Vous vous demandez si Bruno est fâché ». La narratrice a dit que la deuxième reformulation l'avait aidée à continuer. J'ai appris à vérifier ma compréhension avant de répondre. Ma formule à réutiliser : « Si je comprends bien, vous ressentez… ».",
    "Comme écoutant{e}, je me suis surpris{e} à finir les phrases du narrateur. L'observateur l'a noté. Au deuxième tour, j'ai laissé des silences et posé des questions ouvertes : « Comment ça s'est passé ensuite ? ». J'ai reformulé un fait et un ressenti. Je retiens qu'une reformulation exacte calme l'échange plus vite qu'une solution.",
    "Narrat{/rice} sur la situation de Maëlle, je me suis senti{e} écouté{e} quand on ne m'a pas coupé{e}. En écoutant{e}, j'ai osé deux reformulations, ce qui n'est pas naturel pour moi. Dans la grille, l'observateur a coché « aucun conseil, aucun jugement ». Ma formule : « Si je vous suis bien, vous auriez aimé être prévenu{e} ? ».",
    "En écoutant{e}, j'ai eu beaucoup de mal à ne pas conseiller : j'ai l'habitude de donner la solution. J'ai finalement reformulé : « Vous recevez les changements par message vocal et vous devez tout refaire ». L'observateur a relevé que j'avais posé une question fermée au début. Je retiens de commencer par « qu'est-ce que » ou « comment ».",
    "En observat{/rice}, j'ai rempli la grille : au moins deux reformulations, questions ouvertes, pas de jugement. Le ressenti n'a été reformulé qu'au troisième tour. Dans la situation de Thomas, le fait central est le plan reçu une demi-heure avant la pose ; « c'est toujours pareil » est une généralisation. Je retiens que la reformulation marche aussi en visio, à condition de laisser des silences.",
  ],
  // 4 — Feedback SBI / DESC
  [
    "J'ai joué Sonia face à Karim, scénario de la promesse au client. Préparation en DESC : décrire (une pose promise en fin de semaine sans consulter le planning), exprimer (je suis inquiet{e} pour l'équipe de pose), suggérer (vérifier le planning avec l'assistante avant tout engagement), conclure (on garde le client et l'équipe). Mon feedback réel : remercier précisément un collègue pour le tableau des dates, dans la semaine.",
    "J'ai joué Karim en récepteur. Mon défi : reformuler avant de me défendre. J'ai dit : « Si je comprends bien, tu voudrais que je vérifie le planning avant de donner une date ». L'observateur a noté que je n'avais pas contre-attaqué. Pour mon feedback réel, je prépare un SBI pour un collègue de la conception : situation, comportement, impact, et une demande négociable.",
    "J'ai joué Thomas face à Élodie. Ma préparation SBI : situation (lundi, chantier Bertin), comportement (le plan modifié m'est arrivé à 8 h 30 par message), impact (j'ai improvisé devant le client). Demande : être prévenu{e} par téléphone pour toute modification tardive. J'ai évité « toujours ». Mon feedback réel : à un collègue du bureau, en privé, cette semaine.",
    "J'ai joué Inès et donné le feedback positif à Léo : la semaine dernière, tu as créé un tableau partagé des dates de pose, mis à jour chaque soir ; depuis, je réponds aux clients sans chercher. Le récepteur a dit « oh, ce n'est rien », puis s'est repris. Mon feedback réel : un feedback positif précis à un collègue qui m'a aidé{e} sur une commande urgente.",
    "J'ai joué Élodie en récepteur. Ma tendance est de me justifier ; j'ai d'abord reformulé : « Le plan est arrivé trop tard pour vous ». Puis j'ai donné ma version : la date de pose n'apparaît pas dans mon outil. On a trouvé un accord. Mon feedback réel, préparé avec la méthode DESC : demander au chargé d'affaires de me transmettre les demandes clients en une seule fois.",
    "J'ai joué Maëlle face à Bruno. Ma préparation : situation (le devis de mardi), comportement (tu l'as corrigé sans m'en parler), impact (je l'ai découvert par hasard et je crains de refaire l'erreur), demande (me prévenir et me montrer). Le récepteur a reformulé et proposé de me montrer la remise. Mon feedback réel : remercier mon référent pour son aide, de façon précise.",
    "J'ai joué Bruno en récepteur. J'ai découvert que ma bonne intention, corriger sans rien dire pour ne pas embêter, avait eu l'effet inverse. J'ai proposé de montrer la correction à la prochaine erreur. Mon feedback réel : dire à un nouveau collègue ce qu'il a bien fait sur un chantier, avec les faits et l'effet.",
    "J'ai été observat{/rice} puis émett{/rice}. Ma préparation SBI pour un scénario de transmission d'information : situation, comportement observé, impact sur mon travail à distance, demande concrète. J'ai donné le feedback de vive voix, pas par écrit. Mon feedback réel : demander à un collègue de poser les décisions de réunion dans l'espace partagé.",
  ],
  // 5 — Matrice RACI
  [
    "Projet choisi : la préparation d'un chantier type. Nous avons listé dix tâches formulées par un verbe. En comparant les grilles RACI individuelles, j'ai découvert que je m'étais mis{e} en A sur presque tout ; le formateur a demandé « qui a réellement l'information pour décider ? ». J'ai laissé le A de « valider le plan final » à la conception. Gardien de la matrice : un collègue volontaire.",
    "Sur notre matrice RACI, la ligne « confirmer la date au client » était la plus divergente : je me mettais en R et en A, sans C. Après discussion, je reste R, l'assistante est C pour vérifier le planning, la pose est C, et le A revient au responsable d'équipe. Écart découvert : personne ne vérifiait la faisabilité avant l'engagement.",
    "Dans la grille RACI, j'ai découvert que j'étais I sur les modifications de plan, c'est-à-dire informé{e} après coup. On a décidé que la personne qui pose est C avant toute modification tardive. Un seul A par ligne, au moins un R. Ma phrase pour la charte : « les modifications de dernière minute sont signalées par téléphone à la personne qui réalise ».",
    "Sur la matrice RACI de notre projet, la colonne de mon poste était trop pleine de C : on me consultait sur tout. On a retiré les C inutiles. La tâche « saisir la commande » avait deux A : on n'en a gardé qu'un. Écart découvert : chacun pensait que l'autre prévenait le client du retard.",
    "Matrice RACI sur un projet récent. J'ai été surpris{e} : trois personnes se mettaient en A sur « transmettre les informations client à la conception ». Arbitrage : le chargé d'affaires est R et A, la conception est C. Je suis maintenant C sur la date de pose, ce qui règle mon problème de délais. Gardien de la matrice désigné.",
    "C'était ma première matrice RACI. En remplissant seul{e} ma grille, je ne savais pas qui était A sur la moitié des tâches ; l'exercice m'a montré que c'était flou pour d'autres aussi. J'ai découvert que j'étais attendu{e} en R sur la mise à jour du tableau des commandes. Écart noté pour la charte.",
    "Sur notre grille RACI, j'étais R sur des tâches que personne ne savait que je faisais, comme le contrôle des fixations. On l'a écrit. On a ajouté la tâche « accompagner le nouvel arrivant sur un chantier », avec moi en R et le responsable en A. Écart découvert : l'accompagnement des nouveaux n'était attribué à personne.",
    "Pour la matrice RACI, nous avons utilisé un tableur partagé, car deux collègues étaient à distance. Écart principal : la tâche « informer l'équipe des décisions de réunion » n'avait pas de R. Je suis devenu{e} R, avec un dépôt dans l'espace partagé le jour même. Règle respectée : un seul A, pas trop de C.",
  ],
  // 6 — Défi coopératif et décision par consentement
  [
    "Pendant le défi, j'ai pris le rôle d'animat{/rice} sans qu'on me le demande, et j'ai décidé seul{e} de la structure. La personne « en télétravail » n'a donné sa règle qu'à la fin, car personne ne l'a interrogée. Enseignements : partager toutes les cartes au début, désigner un gardien du temps, solliciter la personne à distance. Décision par consentement : point du lundi limité à trente minutes, à l'essai un mois, bilan à date fixée.",
    "Dans le défi, j'avais la carte sur la distance de la cible et je l'ai oubliée jusqu'au test. Au changement du client, on a tout démonté. Enseignement : l'information se perd quand chacun garde ses cartes. En décision par consentement, j'ai formulé une objection : la règle proposée empêchait de répondre aux clients le matin. La proposition a été bonifiée.",
    "J'ai été la personne « en télétravail » du défi : je ne pouvais pas toucher le matériel et personne ne m'a demandé ma règle pendant dix minutes. Je me suis senti{e} exclu{e}. Enseignement : donner la parole d'abord à la personne à distance. En consentement, on a adopté une règle de transmission des modifications de plan, avec période d'essai et responsable du suivi.",
    "Pendant le défi, j'ai joué le rôle de gardien{ne} du temps. Les décisions se prenaient par celui qui parlait le plus fort. En décision par consentement, j'ai rédigé la proposition sur les jours de présence commune ; une objection argumentée l'a améliorée : garder une demi-journée sans réunion. Décision validée avec une date de bilan.",
    "Dans le défi, j'ai voulu tout calculer avant de construire ; l'équipe m'a trouvé{e} lent{e}, puis ma vérification a évité une chute. Enseignement : nos préférences sont complémentaires sous contrainte. En consentement, j'ai distingué une préférence d'une objection quand le formateur a demandé « en quoi cela nuirait-il à l'équipe ? ».",
    "C'était la première fois que je participais à une décision par consentement. On a commencé les tours par moi, ce qui m'a permis de m'exprimer avant les anciens. Pendant le défi, j'avais une carte importante mais je n'osais pas la lire à voix haute. Enseignement : demander à chacun ses informations au début. Je peux redire la décision avec mes mots.",
    "Pendant le défi, j'ai construit la base de la structure ; j'ai remarqué que deux personnes seulement pouvaient toucher le matériel, ce qui obligeait à se parler. En consentement, j'ai d'abord voulu imposer mon idée, puis j'ai compris qu'une objection devait être argumentée. La décision prise : format de la réunion du lundi, à l'essai.",
    "Dans le défi, j'étais à distance et j'ai dû transmettre la règle de l'orientation de la lampe sans montrer ma carte. On ne m'a sollicité{e} qu'après le changement du client. En consentement, notre décision porte sur les règles d'usage de la messagerie : délai de réponse dans la demi-journée, à l'essai, avec un responsable et une date de bilan.",
  ],
  // 7 — Décoder une tension
  [
    "Scénario « La date promise » : source principale l'organisation (engagement pris sans consulter la pose), source secondaire les valeurs (sécurité contre réactivité commerciale). Modes : compétition pour Karim et Thomas, compromis pour Sonia. Je me suis reconnu{e} dans ce compromis qui ne satisfait personne. Mode adapté : la collaboration, par exemple un phasage de la pose. Première action : je fixe une règle d'arbitrage des dates dès lundi.",
    "Scénario « La date promise » : je comprends mieux le point de vue de la pose. Source principale : l'organisation. Marche de l'escalade atteinte : l'affrontement. Mode de Karim : compétition. Mode plus adapté : collaboration, avec un renfort ponctuel. Mon mode spontané face au client est la compétition ; je veux consulter avant de m'engager.",
    "Scénario « Le plan du lundi soir » : source principale l'organisation (pas de règle de transmission), source secondaire les relations (la remarque à la cantonade). Signaux faibles : Élodie n'envoie plus que des mails avec copie. Mode de Thomas : compétition ; mode d'Élodie : évitement. Mode adapté : collaboration. Première action : une règle de transmission, adoptée en réunion.",
    "Scénario « Deux urgences pour une seule Inès » : source principale l'organisation, deux priorités contradictoires sans règle d'arbitrage. Signaux faibles : réponse sèche, déjeuner seule. Marche : crispation. Mode d'Inès : accommodation puis compétition. Mode adapté : collaboration avec un arbitrage demandé au responsable. Je me suis reconnu{e} dans cette situation.",
    "Scénario « Le plan du lundi soir » : je me suis reconnu{e} dans Élodie. Source principale : l'organisation ; source secondaire : les relations. Signaux faibles : passage à l'écrit, copies au responsable. Mon mode spontané est l'évitement, utile pour calmer le jeu mais piège si le sujet ne revient jamais. Première action : en parler directement, dans les quarante-huit heures.",
    "Scénario « On ne fait pas comme ça ici » : source principale les relations, source secondaire les valeurs (expérience contre nouveauté). Signaux faibles : Maëlle ne dit plus rien en réunion et ne pose plus de questions. Mode de Maëlle : évitement ; mode de Bruno : compétition. Mode adapté : collaboration, en faisant de Bruno un tuteur.",
    "Scénario « On ne fait pas comme ça ici » : j'ai compris que ma façon de corriger les nouveaux devant un client peut les faire taire. Source : relations. Marche : malentendu puis gêne durable. Mode de Bruno : compétition. Mode adapté : collaboration, expliquer pourquoi la fixation ne convient pas, en privé. Première action : reprendre la discussion avec la nouvelle collègue.",
    "Scénario « Léo ne répond jamais » : source principale l'organisation (pas d'accès au logiciel à distance), source secondaire les relations (Karim interprète sans demander). Signaux faibles : silence pendant quatre heures, peur de paraître incompétent. Mode de Léo : évitement. Mode adapté : collaboration, avec une règle de signalement des problèmes techniques. Je me suis reconnu{e} dans Léo.",
  ],
  // 8 — Conversation difficile, médiation ou alerte
  [
    "J'ai joué Sonia face à Bruno. Préparation : faits (Maëlle ne parle plus en réunion depuis la visite chez le client), effet (on perd ses idées), version de l'autre (il se sent peu reconnu), objectif (qu'il devienne tuteur), moment et lieu (en privé, lundi). La conversation est passée des positions aux besoins : du temps pour former. Accord daté. Cartes : 2 et 5 en alerte, 4 en alerte santé.",
    "J'ai joué Karim dans la médiation avec Thomas. La médiatrice a annoncé qu'elle ne trancherait qu'en dernier recours. On est passés des positions (dix jours contre quinze) aux besoins (garder le client, travailler en sécurité) : phasage de la pose. Pour moi, la conversation réelle à avoir dans les quinze jours : avec la responsable du planning.",
    "J'ai joué Thomas dans la conversation difficile avec Élodie. J'ai annoncé le sujet et mon intention, décrit les faits sans « jamais » ni « toujours », reconnu que ma remarque avait été injuste. Accord : appel téléphonique pour toute modification après seize heures la veille, bilan dans un mois. Cartes « Médiation ou alerte ? » : 1, 3 et 6 en médiation.",
    "En observat{/rice}, j'ai noté une phrase efficace : « Je voudrais qu'on trouve une règle qui nous aide tous les deux ». Puis j'ai préparé ma conversation réelle : un seul sujet, les demandes contradictoires de la semaine dernière, en privé. Pour les cartes, j'ai compris que des messages moqueurs répétés relèvent de l'alerte, pas d'une médiation entre collègues.",
    "J'ai joué Élodie. Mon objectif : une solution, si la remarque injuste était reconnue. L'autre a reformulé ma blessure, ce qui a tout débloqué. Accord précis et daté. Sur les cartes, une collègue qui pleure chaque matin relève d'une alerte santé : médecin du travail, manager ou RH avec son accord. Ma conversation réelle est prévue dans les quinze jours.",
    "J'ai préféré être observat{/rice} au premier jeu, ce qui était permis. J'ai noté les étapes : sujet annoncé, faits, effet, version de l'autre, besoins, accord. Pour les cartes, j'ai appris qu'on ne mène pas sa propre enquête : on écoute, on note les faits et on oriente. Ma conversation réelle : demander à un collègue de me prévenir quand il corrige mon travail.",
    "J'ai joué Bruno face à Sonia, dans la conversation difficile du jeu 2. J'ai dit que je n'avais pas le temps de former les nouveaux et que mon savoir-faire n'était plus reconnu. Sonia a reformulé avant de répondre. Accord : une demi-journée par semaine pour le tutorat, à l'essai un mois. Pour les cartes, je n'aurais pas pensé que des remarques répétées sur la tenue d'une collègue relevaient de l'alerte.",
    "J'ai préparé une conversation réelle avec la fiche en cinq questions : les informations reçues trop tard les jours de télétravail. Faits récents, un seul sujet, moment en présentiel, objectif concret. Dans le jeu, j'ai eu du mal à conclure ; on a fini par un accord daté. Cartes : je retiens les interlocuteurs en cas d'alerte (manager, RH ou direction, CSE, médecin du travail).",
  ],
  // 9 — Charte et plan d'action SMART
  [
    "Ma contribution à la charte : la valeur « fiabilité », traduite en « ce qui est promis au client a d'abord été validé avec la personne qui réalise ». Mon engagement de responsable : annoncer le mode de décision avant chaque discussion importante. Plan individuel SMART : d'ici trente jours, lancer la météo d'équipe au point du lundi ; d'ici quatre-vingt-dix jours, animer la première rétrospective. Binôme de suivi désigné.",
    "Règle proposée pour la charte, domaine décisions : aucune date n'est confirmée au client sans vérification du planning. Plan individuel SMART : d'ici trente jours, appeler systématiquement la pose avant toute promesse de date ; indicateur : nombre de dates modifiées après engagement. Points à 30, 60 et 90 jours avec mon binôme.",
    "Valeur proposée : « respect », traduite en « on ne critique pas un collègue absent, on lui parle directement ». Règle du domaine désaccords : un désaccord se dit d'abord à la personne concernée, dans les quarante-huit heures. Plan SMART : d'ici quarante-cinq jours, faire un retour hebdomadaire au bureau sur les difficultés de chantier, par téléphone le vendredi.",
    "Ma contribution à la charte, domaine communication : quel canal pour quoi (téléphone pour l'urgent, espace partagé pour l'information, messagerie pour le non urgent). Plan individuel SMART : d'ici trente jours, demander un arbitrage écrit au responsable dès que je reçois deux priorités contradictoires ; vérification avec mon binôme à 30, 60 et 90 jours.",
    "Valeur « entraide », traduite en « on demande de l'aide tôt et on remercie précisément ». Règle de la charte : les demandes clients sont transmises à la conception en une seule fois, avec la date de pose. Plan individuel SMART : d'ici soixante jours, tenir un tableau partagé des modifications de plan, mis à jour chaque soir. Binôme de suivi désigné.",
    "Ma contribution à la charte, domaine accueil des nouveaux : un référent désigné et un rapport d'étonnement à la fin de la période d'intégration. Plan individuel SMART : d'ici trente jours, poser au moins une question en réunion chaque semaine ; d'ici quatre-vingt-dix jours, présenter mon rapport d'étonnement à l'équipe.",
    "Ma contribution : traduire « transmission » en comportements, par exemple « quand je corrige le travail d'un collègue, je le préviens et je lui montre ». Plan SMART : d'ici quarante-cinq jours, rédiger avec une collègue un livret d'accueil de deux pages, relu par les derniers arrivés. Points prévus à 30, 60 et 90 jours.",
    "Règle de la charte, domaine travail hybride : jours de présence commune, disponibilité aux horaires définis, réponse dans la demi-journée, décisions de réunion déposées dans l'espace partagé le jour même. Plan individuel SMART : d'ici trente jours, vérifier chaque vendredi que l'espace partagé est à jour ; indicateur : aucune information manquée signalée en rétrospective.",
  ],
];

const BILANS_PERSONNELS = [
  "Cet atelier m'a surtout appris à parler de faits plutôt que de reproches.",
  "Le plus difficile a été de tenir le temps de l'exercice ; je reprendrai ces idées avec l'équipe la semaine prochaine.",
  "J'ai montré ma production à mon binôme de suivi, qui m'a fait une remarque que j'ai intégrée.",
  "Je vais réutiliser cette méthode dès lundi dans l'équipe.",
  "J'ai comparé ma production avec celle d'un collègue, ce qui m'a fait corriger un oubli.",
  "Le retour du formateur m'a permis de repérer une généralisation que je faisais sans m'en rendre compte.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de le refaire.",
  "Je me suis appuyé{e} sur la fiche de travail fournie, que je garderai sur mon bureau.",
  "Je n'ai pas eu le temps de tout détailler, mais l'essentiel est là.",
  "J'ai posé une question au formateur pendant l'atelier, ce qui m'a évité une erreur d'analyse.",
  "Je vais ajouter cet engagement à mon plan d'action individuel.",
  "Je dois encore m'entraîner, mais je sais maintenant comment m'y prendre.",
];

/** Banque de la mise en situation à partir de son titre (ou de sa consigne), sinon de son rang. */
function blocExercice(contexte: string, exerciceIdx: number): number {
  const t = contexte || "";
  const num = t.match(/\bExercice\s+(\d{1,2})\b/i);
  if (num) {
    const n = parseInt(num[1], 10);
    if (n >= 1 && n <= EXERCICES_PRODUCTIONS.length) return n - 1;
  }
  if (/diagnostic/i.test(t)) return 0;
  if (/curseur/i.test(t)) return 1;
  if (/impression|int[ée]gration/i.test(t)) return 2;
  if (/[ée]coute/i.test(t)) return 3;
  if (/feedback/i.test(t)) return 4;
  if (/RACI/i.test(t)) return 5;
  if (/consentement|coop[ée]ratif/i.test(t)) return 6;
  if (/tension/i.test(t)) return 7;
  if (/conversation|m[ée]diation|alerte/i.test(t)) return 8;
  if (/charte|plan d'action/i.test(t)) return 9;
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickCOH21ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isCOH21Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques : un stagiaire garde le même poste d'un exercice à l'autre, et sur un groupe de
  // 8 stagiaires les 8 productions d'un même exercice sont toutes différentes. Le bilan personnel
  // change d'un exercice à l'autre. L'entreprise du stagiaire est citée quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bloc + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai rattaché l'atelier à la situation réelle de notre équipe chez ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "BTS Management commercial opérationnel",
  "Baccalauréat professionnel Métiers de l'électricité et de ses environnements connectés",
  "BTS Gestion de la PME",
  "Licence professionnelle Management des organisations",
  "DUT Génie électrique et informatique industrielle",
  "Baccalauréat STMG, puis expérience en administration des ventes",
  "BTS Conception de produits industriels",
  "Master en gestion des ressources humaines",
  "CAP Électricien, puis évolution interne",
  "BTS Comptabilité et gestion",
  "Diplôme d'école de commerce",
  "Licence d'arts appliqués, spécialité design d'espace",
  "Baccalauréat général, puis expérience dans l'hôtellerie avant une reconversion",
  "BTS Support à l'action managériale",
  "Aucun diplôme supérieur : longue expérience dans le métier",
  "Diplôme d'ingénieur en génie industriel",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant chaque journée.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières pendant les trois jours me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des supports en police suffisamment grande.",
  "Non, pas de handicap. J'entends moins bien dans les pièces bruyantes : des sous-groupes un peu éloignés les uns des autres m'aideront.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Les capsules vidéo sous-titrées me conviennent bien pour revoir les notions.",
  "Non, aucune situation de handicap. Je préfère ne pas me déplacer physiquement lors des exercices au sol, je le signalerai si besoin.",
  "Non. Je préfère avoir les fiches en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté avant la formation.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible les trois jours de formation, dans les locaux de l'entreprise, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>.",
  "Je bloque les trois jours de formation dans mon agenda (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) ; un collègue d'un autre service reprend les urgences.",
  "Je suis disponible les trois jours de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>, avec toute l'équipe réunie dans la salle prévue par l'entreprise.",
  "Je peux suivre l'intégralité des trois jours de formation en présentiel, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible les trois jours (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). J'ai décalé mes jours de télétravail pour être présent{e} sur site.",
  "Disponibilité complète sur les trois jours de formation (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). J'ai prévenu mes interlocuteurs habituels que je ne serai pas joignable.",
  "Les trois jours de formation, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; mes interventions ont été replanifiées.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> les trois jours, et je consulterai les capsules de l'espace e-learning entre les journées.",
  "Je suivrai les trois jours de formation avec l'équipe (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je prévois un moment pour revoir les fiches à retenir le soir.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> des trois jours. Mon responsable a validé mon absence de poste.",
];

/** Réponses d'évaluation des besoins propres à la formation Cohésion d'équipe 21 h, différentes pour chaque stagiaire. */
export function getCOH21EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = coh21Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilCOH21(idx, s.nom, s.prenom);
  const pick = (arr: string[], sel: number) => accorder(arr[rang(base, sel, arr.length)], fem);
  const civilite = s.civilite === "Mme" ? "Madame" : s.civilite === "M." ? "Monsieur" : (s.civilite || "Madame");

  return {
    civilite,
    raisonSociale: hasEntreprise ? (s.entreprise as string) : "/",
    attentes: entAccords(profil.attentes, fem),
    missions: entAccords(profil.missions, fem),
    contribution: entAccords(profil.contribution, fem),
    diplome: pick(BESOINS_DIPLOMES, 4),
    objectif: entAccords(profil.objectif, fem),
    budget: hasEntreprise
      ? "Formation financée par l'entreprise dans le cadre de son plan de développement des compétences."
      : "Financement personnel",
    projetPro: entAccords(profil.projet, fem),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
