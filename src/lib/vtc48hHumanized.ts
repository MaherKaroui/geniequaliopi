// ---------------------------------------------------------------------------
// « Préparation à l'examen d'accès à la profession de conducteur VTC (RS5637) – 48 h » — moteur de réponses HUMANISÉES
// Formation certifiante (Répertoire spécifique RS5637) : 48 h sur 7 jours en classe virtuelle (jours 1 à 6 de 7 h,
// jour 7 de 6 h), 1 à 12 stagiaires,
// examen organisé par la CMA (inscription individuelle du candidat).
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes…), puis parcours /
//     diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes, dans l'ordre des 10 mises en situation, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par mise en situation + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Samir, cité dans les copies, est le futur chauffeur VTC FICTIF du support de cours ; ses clients sont fictifs.
// ---------------------------------------------------------------------------

const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Préparation à l'examen d'accès à la profession de conducteur VTC (RS5637) – 48 h ».
 * Il faut à la fois : (le code RS5637, ou un intitulé qui contient « VTC », « voiture de transport avec chauffeur »
 * ou « RS5637 ») ET un intitulé qui précise la durée de 48 heures (« 48 h », « 48h », « 48 heures »).
 * Accents et casse indifférents. Une autre formation VTC (autre durée, ex. « Habilitation VTC – Préparation à
 * l'examen (RS5637) » de la liste d'exemples) n'est donc jamais captée.
 * Jamais pour : un autre code de répertoire saisi (taxi, deux ou trois roues motorisés, titre…), un intitulé qui parle de taxi
 * ou de VMDTR, la formation continue des conducteurs en activité, un bilan de compétences ou une VAE.
 * À tester AVANT les règles génériques « vtc », « t3p », « transport de personnes ».
 */
export function isVTC48Formation(intitule?: string, code?: string): boolean {
  const c = (code || "").toUpperCase().replace(/\s/g, "");
  const t = normalize(intitule).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[^a-z0-9']+/g, " ").trim();
  if (!t) return false;
  // La durée de 48 heures doit figurer dans l'intitulé (« 48 h », « 48h », « 48 heures »)
  if (!/\b48 ?h(eures?)?\b/.test(t)) return false;
  if (c === "RS5637") return true;
  if (/^R[N]CP\d|^R[S]\d/.test(c)) return false;
  if (/\b(taxis?|vmdtr|rs ?5635|formation continue|bilan de competences|vae)\b/.test(t)) return false;
  if (/\brs ?5637\b/.test(t)) return true;
  return /\bvtc\b/.test(t) || /\bvoitures? de transport avec chauffeurs?\b/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function vtc48Seed(nom?: string, prenom?: string): number {
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
  typeof idx === "number" && idx >= 0 ? idx : vtc48Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// professions et conditions d'accès, réservation et maraude, statut juridique, prix de revient et seuil,
// accident, fatigue et alcool, français et anglais, développement commercial, plateformes et réglementation
// spécifique, épreuve pratique
// ---------------------------------------------------------------------------
export const VTC48_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Selon vous, quelles conditions faut-il remplir pour devenir conducteur VTC, et qui organise l'examen ?", reponseAttendue: "Permis B hors période probatoire, honorabilité, réussite à l'examen organisé par les chambres de métiers et de l'artisanat, carte professionnelle délivrée par le préfet après aptitude médicale et formation aux premiers secours ; professions du T3P : taxi, VTC, deux ou trois roues motorisés." },
    { question: "Qu'est-ce qui distingue, à votre connaissance, un VTC d'un taxi dans la façon de trouver des clients ?", reponseAttendue: "Le VTC travaille uniquement sur réservation préalable et doit pouvoir la justifier ; la maraude, y compris électronique, est réservée aux taxis ; sans réservation, retour au lieu d'établissement ou stationnement hors chaussée autorisé." },
    { question: "Sous quel statut pensez-vous exercer, et pourquoi ?", reponseAttendue: "Présentation des statuts possibles (entreprise individuelle et micro-entreprise, EURL, SASU) et de leurs conséquences sur le patrimoine, le régime social, la fiscalité et la comptabilité ; choix argumenté selon le chiffre d'affaires et les charges prévus." },
    { question: "Comment fixeriez-vous le prix de vos courses pour gagner votre vie ?", reponseAttendue: "Distinction des charges fixes et variables, calcul du prix de revient d'une course, de la marge sur coûts variables et du seuil de rentabilité ; prix fixé au-dessus du prix de revient et cohérent avec le marché." },
    { question: "Que feriez-vous si vous étiez témoin d'un accident avec un blessé, des clients à bord ?", reponseAttendue: "Protéger, alerter, secourir : sécuriser les lieux et les passagers, appeler le 112, le 15 ou le 18 avec un message précis, gestes adaptés à l'état de la victime, ne pas la déplacer sauf danger immédiat." },
    { question: "Quels risques la fatigue, l'alcool ou certains médicaments font-ils courir à un conducteur professionnel ?", reponseAttendue: "Baisse de vigilance, allongement du temps de réaction, réduction du champ visuel, risque d'endormissement ; pauses régulières, respect du taux d'alcool autorisé, aucune conduite après usage de stupéfiants, pictogrammes des médicaments et avis médical." },
    { question: "Comment évaluez-vous votre français écrit et votre anglais pour accueillir des clients ?", reponseAttendue: "Auto-évaluation honnête ; capacité à comprendre un texte réglementaire, à rédiger un message clair au client et à accueillir un client en anglais : salutation, destination, bagages, durée, prix, ceinture." },
    { question: "Comment comptez-vous trouver et fidéliser vos clients ?", reponseAttendue: "Étude de marché, clientèles visées, canaux en plus des plateformes (entreprises, hôtels, recommandation, site), devis aux mentions complètes, tableau de bord commercial, actions de fidélisation." },
    { question: "Que savez-vous des règles qui encadrent le travail des conducteurs VTC avec les plateformes ?", reponseAttendue: "Prix fixé à la réservation ; information sur la distance et le prix minimal garanti avant d'accepter une course ; droit de refuser sans pénalité ; signalétique, véhicule et assurance conformes ; dialogue social organisé par l'ARPE." },
    { question: "Comment imaginez-vous le déroulé d'une course réussie, de l'accueil du client à son départ ?", reponseAttendue: "Itinéraire préparé avec une alternative, accueil courtois et vérification de la réservation, aide aux bagages, conduite souple, information du client, note ou facture complète, vérification des objets oubliés et prise de congé." },
  ],
  fin: [
    { question: "Quelles sont les conditions d'accès à la profession de conducteur VTC et les démarches après l'examen ?", reponseAttendue: "Permis B hors période probatoire, honorabilité, examen organisé par la CMA, carte professionnelle délivrée par le préfet après aptitude médicale et formation aux premiers secours, création de l'entreprise, inscription au registre des exploitants VTC, assurance adaptée, signalétique ; formation continue pour le renouvellement de la carte." },
    { question: "Comment appliquez-vous la règle de la réservation préalable et que faites-vous entre deux courses ?", reponseAttendue: "Aucune prise en charge sans réservation préalable, justificatif papier ou électronique présentable lors d'un contrôle ; pas de maraude ni de maraude électronique ; retour au lieu d'établissement ou stationnement hors chaussée autorisé ; jamais sur une station de taxis." },
    { question: "Quel statut juridique avez-vous retenu pour votre projet, et pour quelles raisons ?", reponseAttendue: "Statut choisi et argumenté (patrimoine, régime social, fiscalité, comptabilité, niveau des charges) ; limites de la micro-entreprise pour une activité aux charges élevées ; seuils et taux vérifiés sur les sites officiels ; conseil d'un expert-comptable." },
    { question: "Comment avez-vous calculé votre prix de revient et votre seuil de rentabilité ?", reponseAttendue: "Charges classées en fixes et variables ; marge sur coûts variables = prix moins charges variables ; seuil = charges fixes divisées par la marge par course ; prix de revient complet ; décision argumentée sur les courses à bas prix." },
    { question: "Comment intervenez-vous sur un accident, et comment alertez-vous les secours ?", reponseAttendue: "Ordre protéger, alerter, secourir ; numéros 112, 15, 17, 18 et 114 ; message complet ; position latérale de sécurité pour une victime inconsciente qui respire ; passagers mis à l'abri ; constat amiable en cas d'accrochage sans blessé." },
    { question: "Comment organisez-vous vos journées pour conduire en sécurité ?", reponseAttendue: "Amplitude raisonnable, pause toutes les deux heures environ, sommeil suffisant ; alcool, stupéfiants et médicaments : effets sur la conduite, règles du code de la route, pictogrammes ; téléphone jamais tenu en main ; distances de sécurité." },
    { question: "Comment rédigez-vous un message à un client et comment l'accueillez-vous en anglais ?", reponseAttendue: "Message clair, poli, complet et sans faute ; accueil en anglais : salutation, vérification du nom et de la destination, bagages, durée estimée, prix, confort, ceinture, prise de congé." },
    { question: "Quel plan de développement commercial avez-vous construit pour votre activité ?", reponseAttendue: "Étude de marché du secteur ; plusieurs canaux d'acquisition en plus des plateformes ; devis aux mentions complètes ; tableau de bord commercial suivi chaque mois ; actions de fidélisation." },
    { question: "Quelles règles propres au VTC et aux plateformes appliquez-vous désormais ?", reponseAttendue: "Prix fixé à la réservation ou mode de calcul communiqué ; distance et prix minimal garanti communiqués par la plateforme, droit de refus sans pénalité ; signalétique, véhicule conforme, assurance transport de personnes à titre onéreux ; ARPE." },
    { question: "Comment préparez-vous l'épreuve pratique d'admission ?", reponseAttendue: "Méthode complète : itinéraire et délestage, accueil, vérification de la réservation, bagages, conduite souple, information du client, note ou facture aux mentions complètes, objets oubliés, prise de congé ; points personnels à travailler avant l'épreuve." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle.
// Aucune réponse à 1 au début : au plus 5 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — conditions d'accès et examen
  [
    ["Il faut le permis depuis quelques années et passer un examen, je crois à la préfecture.", 0.5],
    ["Il suffit de s'inscrire sur une application de réservation.", 0],
    ["Il faut une carte professionnelle, mais je ne sais pas qui la donne.", 0.5],
    ["Je pense qu'il n'y a pas d'examen, seulement une formation.", 0],
    ["Il faut réussir un examen organisé par la chambre de métiers, d'après ce qu'on m'a dit.", 0.5],
    ["Il faut avoir une belle voiture, c'est tout.", 0],
    ["Le permis ne doit plus être probatoire, et il faut un casier judiciaire correct.", 0.5],
    ["C'est l'auto-école qui délivre l'autorisation.", 0],
    ["Je sais qu'il faut un examen avec une partie écrite et une partie pratique, sans connaître le détail.", 0.5],
    ["Je ne sais pas du tout.", 0],
    ["Il faut le permis B et une visite médicale, je crois.", 0.5],
    ["Il faut d'abord travailler comme taxi pendant un an.", 0],
  ],
  // Q2 — réservation préalable et maraude
  [
    ["Le taxi peut prendre des clients dans la rue, le VTC passe par une application.", 0.5],
    ["Aucune différence, les deux prennent les clients qui font signe.", 0],
    ["Le VTC doit avoir une réservation, mais je ne sais pas comment le prouver.", 0.5],
    ["Le VTC peut attendre aux stations de taxis s'il est en règle.", 0],
    ["Je crois que le VTC n'a pas le droit de chercher des clients en roulant dans la rue.", 0.5],
    ["Le VTC a le droit de prendre un client sans réservation la nuit.", 0],
    ["Le taxi a un compteur, le VTC donne son prix avant la course.", 0.5],
    ["Je ne connais pas la différence.", 0],
    ["Entre deux courses, je pense qu'il faut retourner quelque part, mais je ne sais pas où.", 0.5],
    ["Le VTC peut attendre devant les gares comme il veut.", 0],
    ["Le VTC travaille sur commande, le taxi peut être hélé.", 0.5],
    ["C'est la plateforme qui décide de tout, il n'y a pas de règle.", 0],
  ],
  // Q3 — statut juridique
  [
    ["Auto-entrepreneur, parce que c'est le plus simple.", 0.5],
    ["Je n'y ai pas encore réfléchi.", 0],
    ["Je pensais à une société, mais je ne connais pas la différence entre EURL et SASU.", 0.5],
    ["Salarié de la plateforme, je crois que c'est automatique.", 0],
    ["Micro-entreprise pour commencer, on m'a dit qu'il y a moins de papiers.", 0.5],
    ["Le statut n'a pas d'importance, c'est la même chose partout.", 0],
    ["Je sais qu'en société mes biens personnels sont plus protégés, sans plus.", 0.5],
    ["Mon comptable choisira à ma place.", 0],
    ["J'hésite entre micro-entreprise et SASU, je ne sais pas laquelle coûte le moins cher.", 0.5],
    ["Je ne sais pas ce qu'est un statut juridique.", 0],
    ["J'ai entendu dire qu'en micro-entreprise on paie des cotisations sur le chiffre d'affaires.", 0.5],
    ["Je compte travailler sans déclarer au début.", 0],
  ],
  // Q4 — prix de revient et seuil de rentabilité
  [
    ["Je regarderai les prix des autres chauffeurs et je ferai pareil.", 0],
    ["Il faut que le prix couvre l'essence et la voiture, je pense.", 0.5],
    ["C'est l'application qui fixe le prix, je n'ai pas à calculer.", 0],
    ["Je sais qu'il y a des charges fixes et des charges variables, sans savoir calculer.", 0.5],
    ["Plus je fais de courses, plus je gagne, peu importe le prix.", 0],
    ["Il faut enlever la commission de la plateforme et le carburant du prix de la course.", 0.5],
    ["Je ne sais pas.", 0],
    ["J'ai entendu parler du seuil de rentabilité, mais je ne sais pas le calculer.", 0.5],
    ["Je prendrai toutes les courses, même les moins chères.", 0],
    ["Il faut compter l'assurance et le crédit de la voiture dans le prix.", 0.5],
    ["Le prix dépend seulement de la distance.", 0],
    ["Je ferai un tableau de mes dépenses du mois pour voir combien il faut gagner.", 0.5],
  ],
  // Q5 — accident
  [
    ["J'appelle les pompiers, mais je ne connais pas le numéro.", 0],
    ["Je m'arrête, je mets les warnings et j'appelle les secours.", 0.5],
    ["Je sors le blessé de la voiture tout de suite.", 0],
    ["Je fais sortir mes clients et j'appelle le 15 ou le 18.", 0.5],
    ["Je continue ma route, mes clients sont pressés.", 0],
    ["J'ai entendu parler de protéger, alerter, secourir, sans connaître les gestes.", 0.5],
    ["Je donne à boire au blessé.", 0],
    ["Je crois qu'il faut appeler le 112.", 0.5],
    ["Je ne sais pas, je n'ai jamais eu de formation.", 0],
    ["Je mets un gilet jaune et je préviens les secours.", 0.5],
    ["J'attends que quelqu'un d'autre s'arrête.", 0],
    ["Je sais qu'il ne faut pas bouger un blessé, mais je ne sais pas quoi faire d'autre.", 0.5],
  ],
  // Q6 — fatigue, alcool, médicaments
  [
    ["Un verre ou deux ne changent rien à la conduite.", 0],
    ["La fatigue fait baisser l'attention, il faut s'arrêter.", 0.5],
    ["Avec du café, on peut conduire toute la journée.", 0],
    ["Certains médicaments font dormir, il y a un dessin sur la boîte je crois.", 0.5],
    ["Je conduis bien même fatigué{e}, j'ai l'habitude.", 0],
    ["L'alcool ralentit les réflexes, je ne bois jamais avant de conduire.", 0.5],
    ["Je ne sais pas.", 0],
    ["Il faut faire des pauses, mais je ne sais pas à quelle fréquence.", 0.5],
    ["Les médicaments sur ordonnance n'ont aucun effet sur la conduite.", 0],
    ["Je sais qu'il y a un taux d'alcool à ne pas dépasser, je ne connais pas le chiffre.", 0.5],
    ["La nuit, il n'y a personne sur la route, donc moins de risques.", 0],
    ["La fatigue peut faire s'endormir au volant, même sur un trajet court.", 0.5],
  ],
  // Q7 — français et anglais
  [
    ["Mon français est correct à l'oral, l'écrit est plus difficile.", 0.5],
    ["Je ne parle pas anglais du tout.", 0],
    ["Je sais dire bonjour et merci en anglais.", 0.5],
    ["Je n'écris jamais de messages aux clients, l'application le fait.", 0],
    ["J'ai un niveau scolaire en anglais, je comprends les phrases simples.", 0.5],
    ["L'anglais ne sert à rien pour un chauffeur.", 0],
    ["Je fais des fautes d'orthographe dans mes messages.", 0.5],
    ["Je ne sais pas comment je me débrouillerais.", 0],
    ["Je peux demander la destination en anglais, pas beaucoup plus.", 0.5],
    ["Je comprends mal les textes de loi.", 0],
    ["Je lis bien le français, mais l'anglais me stresse.", 0.5],
    ["J'utiliserai un traducteur sur mon téléphone en conduisant.", 0],
  ],
  // Q8 — développement commercial
  [
    ["Je travaillerai seulement avec les applications.", 0],
    ["Je pense démarcher les hôtels près de chez moi.", 0.5],
    ["Les clients viendront tout seuls.", 0],
    ["Je donnerai des cartes de visite aux clients contents.", 0.5],
    ["Je ne sais pas comment trouver des clients.", 0],
    ["Je voudrais travailler avec des entreprises pour les trajets vers l'aéroport.", 0.5],
    ["Je baisserai mes prix pour avoir plus de clients que les autres.", 0],
    ["Je pense créer une page sur les réseaux sociaux.", 0.5],
    ["Je compte sur le bouche-à-oreille, sans rien préparer.", 0],
    ["Je sais qu'il faut faire des devis pour les entreprises, sans savoir quoi y mettre.", 0.5],
    ["La fidélisation, c'est pour les commerçants, pas pour les chauffeurs.", 0],
    ["Je garderai le contact de mes clients réguliers.", 0.5],
  ],
  // Q9 — plateformes et réglementation spécifique
  [
    ["Les plateformes prennent une commission, c'est tout ce que je sais.", 0.5],
    ["On n'a pas le droit de refuser une course.", 0],
    ["Je crois qu'il y a une loi qui protège les chauffeurs depuis quelques années.", 0.5],
    ["Le chauffeur est salarié de la plateforme.", 0],
    ["Il faut un macaron sur la voiture, je crois.", 0.5],
    ["Il n'y a aucune règle pour la voiture, n'importe laquelle convient.", 0],
    ["Le prix est annoncé au client avant la course.", 0.5],
    ["Je ne sais pas.", 0],
    ["Il faut une assurance spéciale pour transporter des clients.", 0.5],
    ["L'assurance de ma voiture personnelle suffit.", 0],
    ["On peut se déconnecter quand on veut, je pense.", 0.5],
    ["La plateforme peut imposer mes horaires.", 0],
  ],
  // Q10 — épreuve pratique et course réussie
  [
    ["Je dis bonjour et je démarre.", 0],
    ["Il faut être poli, aider avec les bagages et conduire calmement.", 0.5],
    ["Je mets ma musique pour détendre l'ambiance.", 0],
    ["Je vérifie l'adresse avec le client avant de partir.", 0.5],
    ["L'important est d'arriver le plus vite possible.", 0],
    ["Je propose de l'eau et je demande si la température convient.", 0.5],
    ["Je ne sais pas ce qui est évalué à l'épreuve pratique.", 0],
    ["À la fin, il faut donner un reçu au client, je crois.", 0.5],
    ["Le client n'a pas besoin de facture.", 0],
    ["Je prépare mon trajet sur le GPS avant que le client monte.", 0.5],
    ["Je parle beaucoup pour que le client ne s'ennuie pas.", 0],
    ["Je vérifie qu'il n'oublie rien en descendant.", 0.5],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["Permis B hors période probatoire, honorabilité, examen organisé par la CMA, puis carte professionnelle délivrée par le préfet.", 1],
    ["Après l'examen : carte professionnelle, création de l'entreprise, inscription au registre des exploitants VTC, assurance adaptée et signalétique.", 1],
    ["Le T3P regroupe les taxis, les VTC et les deux ou trois roues motorisés ; chaque profession a ses règles.", 1],
    ["Pour la carte, la préfecture demande une aptitude médicale et une formation aux premiers secours.", 1],
    ["Je m'inscris moi-même à l'examen auprès de la CMA, en candidature individuelle.", 0.5],
    ["La carte professionnelle doit être renouvelée, avec une formation continue.", 1],
    ["J'ai listé mes démarches dans l'ordre, de l'inscription à l'examen jusqu'à ma première course.", 1],
    ["L'examen comprend des épreuves d'admissibilité puis une épreuve pratique d'admission.", 1],
    ["Sans inscription au registre, je ne peux pas exploiter mon véhicule en VTC.", 0.5],
    ["Mon casier doit être compatible avec la profession, c'est vérifié pour la carte.", 0.5],
    ["L'examen ne suffit pas : il faut la carte professionnelle avant de transporter des clients.", 1],
    ["Les modalités des épreuves sont fixées par l'arrêté du 6 avril 2017, je les vérifie sur le site de la CMA.", 1],
  ],
  [
    ["Je ne prends jamais un client qui me fait signe : uniquement sur réservation préalable.", 1],
    ["Je garde le justificatif de réservation sur mon téléphone pour le présenter en cas de contrôle.", 1],
    ["Entre deux courses, je retourne au lieu d'établissement ou je stationne hors de la chaussée, là où c'est autorisé.", 1],
    ["La maraude, y compris électronique, est réservée aux taxis.", 1],
    ["Je ne m'arrête jamais sur une station de taxis.", 0.5],
    ["Si un voyageur me hèle, je refuse poliment et je lui propose de réserver.", 1],
    ["Je n'affiche pas ma position et ma disponibilité aux clients avant une réservation.", 1],
    ["Je sais que prendre un client sans réservation m'expose à des sanctions sur ma carte.", 0.5],
    ["Je présente ma carte professionnelle et mon justificatif de réservation lors d'un contrôle.", 1],
    ["Je ne tourne pas autour des gares en attendant un client.", 0.5],
    ["La réservation préalable peut être faite par téléphone, application ou site, tant qu'elle est justifiable.", 1],
    ["Le taxi peut être hélé, pas le VTC : c'est la différence principale.", 1],
  ],
  [
    ["J'ai choisi la SASU pour séparer mon patrimoine et avoir un régime assimilé salarié.", 1],
    ["Je commence en micro-entreprise, en sachant que mes charges réelles ne seront pas déduites.", 1],
    ["J'ai comparé entreprise individuelle, EURL et SASU sur le patrimoine, le social et la comptabilité.", 1],
    ["Avec un véhicule acheté à crédit, le régime réel est plus adapté que la micro-entreprise.", 1],
    ["Je vérifie les seuils et les taux sur les sites officiels avant de décider.", 0.5],
    ["J'ai pris rendez-vous avec un expert-comptable pour valider mon statut.", 0.5],
    ["En EURL, le gérant associé unique est en principe travailleur indépendant.", 1],
    ["La micro-entreprise calcule les cotisations sur le chiffre d'affaires, pas sur le bénéfice.", 1],
    ["Mon choix dépend du chiffre d'affaires prévu et du niveau de mes charges.", 1],
    ["Je reste salarié{e} d'une société de VTC la première année, avant de m'installer.", 0.5],
    ["La SASU demande une comptabilité complète, j'ai prévu son coût.", 1],
    ["J'ai choisi un statut et je sais expliquer pourquoi devant un banquier.", 0.5],
  ],
  [
    ["Marge sur coûts variables : prix de la course moins charges variables ; seuil : charges fixes divisées par cette marge.", 1],
    ["Pour Samir : 30 moins 9, soit 21 € de marge, et 1 050 divisé par 21, soit 50 courses par mois.", 1],
    ["J'ai classé mes charges : location, assurance et comptable en fixes ; carburant et commission en variables.", 1],
    ["Je refuse les courses durablement en dessous de mon prix de revient complet.", 1],
    ["Une course à bas prix peut dépanner si elle couvre les charges variables, pas en habitude.", 1],
    ["J'ai calculé mon prix de revient pour 120 courses par mois.", 0.5],
    ["Au seuil de rentabilité, je ne gagne rien : il faut le dépasser pour me rémunérer.", 1],
    ["J'ai intégré l'amortissement du véhicule dans mes charges fixes.", 1],
    ["Mon tableau de calcul me sert à vérifier les offres des plateformes.", 0.5],
    ["Je refais le calcul chaque trimestre avec mes vrais chiffres.", 0.5],
    ["Le prix de revient complet, c'est la part de charges fixes plus les charges variables de la course.", 1],
    ["J'ai trouvé mon seuil de rentabilité et le nombre de courses qu'il me faut par semaine.", 1],
  ],
  [
    ["Protéger, alerter, secourir : je sécurise, j'appelle le 112, puis j'aide la victime.", 1],
    ["Je mets mes passagers à l'abri derrière la glissière avant toute chose.", 1],
    ["Le message d'alerte : lieu précis, nature de l'accident, nombre et état des victimes.", 1],
    ["Une victime inconsciente qui respire : position latérale de sécurité et surveillance.", 1],
    ["Je ne déplace pas la victime, sauf danger immédiat comme un incendie.", 1],
    ["15 pour le SAMU, 17 pour la police, 18 pour les pompiers, 112 partout en Europe.", 1],
    ["Le 114 permet d'alerter par SMS pour les personnes sourdes ou malentendantes.", 0.5],
    ["En cas d'accrochage sans blessé, nous remplissons un constat amiable avec un croquis.", 1],
    ["Gilet de haute visibilité et feux de détresse avant de sortir du véhicule.", 0.5],
    ["Je ne raccroche jamais le premier avec les secours.", 0.5],
    ["Je rassure mes clients et j'organise la suite de leur trajet quand c'est possible.", 0.5],
    ["J'ai appris les gestes de premiers secours en vue du PSC1 demandé pour la carte.", 1],
  ],
  [
    ["Je fais une pause d'un quart d'heure environ toutes les deux heures de conduite.", 1],
    ["Je ne prends pas le volant après un médicament qui porte un pictogramme de niveau 3.", 1],
    ["Le café ne remplace pas le sommeil : en cas de somnolence, je m'arrête.", 1],
    ["Alcool et stupéfiants allongent le temps de réaction : zéro consommation quand je travaille.", 1],
    ["Je règle mon application avant de partir et je ne touche pas mon téléphone en roulant.", 1],
    ["Je garde au moins deux secondes de distance avec le véhicule qui précède.", 1],
    ["Je limite l'amplitude de mes journées, même pendant les salons.", 0.5],
    ["Je demande l'avis du pharmacien quand je prends un nouveau traitement.", 0.5],
    ["Je fais attacher mes passagers avant de démarrer.", 0.5],
    ["Mon planning de réservations prévoit les temps de trajet et les pauses.", 1],
    ["La conduite de nuit demande plus de pauses et plus de prudence.", 0.5],
    ["Je connais les règles du code de la route sur l'alcool et je les applique.", 1],
  ],
  [
    ["Mon message de confirmation donne la date, l'heure, le lieu, le véhicule et mon numéro.", 1],
    ["« Good morning, I'm your driver. Where would you like to go? » : je sais accueillir en anglais.", 1],
    ["J'annonce la durée en anglais : « The journey will take about thirty minutes. »", 1],
    ["Je relis mes messages pour éviter les fautes et les abréviations.", 0.5],
    ["« Please fasten your seatbelt » et « Do you have any luggage? » sont devenus des réflexes.", 1],
    ["Je comprends mieux les textes réglementaires en repérant les mots clés.", 0.5],
    ["Je sais répondre à « How much is the fare? » en donnant le prix fixé à la réservation.", 1],
    ["Je vouvoie toujours le client et j'utilise des phrases courtes.", 0.5],
    ["J'ai une fiche de phrases anglaises pour l'aéroport, la gare et le paiement.", 1],
    ["Je reformule un article de loi avec mes mots sans en changer le sens.", 1],
    ["Je demande en anglais si le client veut la climatisation ou de la musique.", 1],
    ["Mon anglais reste simple, mais je suis capable d'accueillir un client poliment.", 0.5],
  ],
  [
    ["J'ai trois canaux en plus des plateformes : hôtels, entreprises et recommandation.", 1],
    ["Mon étude de marché vise les voyageurs d'affaires de Créteil et les transferts vers Orly.", 1],
    ["Mon modèle de devis comporte toutes les mentions : entreprise, client, date, lieux, prestation, prix.", 1],
    ["Je suis chaque mois mon chiffre d'affaires par canal dans un tableau de bord.", 1],
    ["Je fidélise mes clients réguliers avec une réservation directe simple et un service constant.", 1],
    ["Je ne dépends plus d'une seule plateforme.", 0.5],
    ["J'ai préparé une présentation pour démarcher les hôtels de mon secteur.", 0.5],
    ["Je suis les kilomètres à vide pour mesurer ma rentabilité.", 1],
    ["J'ai créé une fiche d'établissement en ligne pour recevoir des réservations.", 0.5],
    ["Je ne dénigre jamais la concurrence devant un client.", 0.5],
    ["Mon plan d'action commercial est daté, avec un objectif de clients directs.", 1],
    ["Les avis clients sont suivis et j'y réponds avec courtoisie.", 0.5],
  ],
  [
    ["La plateforme doit m'indiquer la distance et le prix minimal garanti avant que j'accepte.", 1],
    ["Je peux refuser une course proposée par une plateforme sans pénalité.", 1],
    ["Le prix est fixé à la réservation, ou son mode de calcul est communiqué au client.", 1],
    ["Mon véhicule porte la signalétique VTC et mon assurance couvre le transport de personnes à titre onéreux.", 1],
    ["L'ARPE organise le dialogue social entre plateformes et conducteurs indépendants.", 1],
    ["Je suis libre de me connecter ou non et de choisir mes horaires.", 0.5],
    ["Pour les caractéristiques du véhicule, je me réfère au code des transports et à ses arrêtés.", 1],
    ["Je compare les offres des plateformes à mon prix de revient avant d'accepter.", 0.5],
    ["Contrôle technique et entretien à jour font partie de mes obligations.", 0.5],
    ["Je garde mes justificatifs de réservation pour chaque course.", 0.5],
    ["La loi d'orientation des mobilités a renforcé l'information des conducteurs.", 1],
    ["Un VTC n'a pas de taximètre : son prix est annoncé à la réservation.", 1],
  ],
  [
    ["Je prépare l'itinéraire et un trajet de délestage avant l'arrivée du client.", 1],
    ["Accueil : salutation, vérification du nom et de la réservation, aide aux bagages, ceinture.", 1],
    ["Je conduis de façon souple et j'informe le client de la durée et des imprévus.", 1],
    ["Je remets une note ou une facture avec l'identité de l'entreprise, la date, les lieux et le prix.", 1],
    ["Je vérifie qu'aucun objet n'est oublié et je prends congé poliment.", 1],
    ["Je propose la température et la musique au client.", 0.5],
    ["Je respecte strictement le code de la route, même si le client est pressé.", 1],
    ["Je me suis entraîné{e} sur la grille d'auto-évaluation de la simulation.", 0.5],
    ["J'arrête le véhicule en lieu sûr pour le paiement.", 0.5],
    ["Je sais quelles erreurs pénalisent : infraction, accueil négligé, facture incomplète.", 1],
    ["J'ai noté les points à retravailler avant l'épreuve pratique.", 0.5],
    ["Une course réussie, c'est la sécurité, le confort et une facturation juste.", 1],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [54, 51, 45, 45, 4, 8, 57, 36, 47, 13];

export function getVTC48AutoAnswers(
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
export function vtc48NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6). */
export function vtc48BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((vtc48NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `vtc48BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function vtc48ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = vtc48BonnesQcmDebut(n, idx, nom, prenom);
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
 * QCM de compétence (10 questions : 6 à 10 bonnes réponses), mise en situation sur 5 (2,5 à 5).
 */
const NOTES_QCM_SUR_10 = [8, 7, 9, 6, 10];
const NOTES_EXERCICE_SUR_5 = [4, 3, 4.5, 3.5, 5, 2.5];
export function vtc48NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie stagiaire), attentes, missions et contribution (partie employeur ou financeur).
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
    besoin: "Réussir l'examen VTC du premier coup pour s'installer comme conducteur indépendant après une période sans emploi.",
    objectif: "Je veux réussir les épreuves écrites et l'épreuve pratique à la première session qui suit la formation.",
    projet: "Elle me permettra de créer mon entreprise de VTC et de retrouver une activité stable.",
    attentes: "Il est attendu que {le_sal} se présente à l'examen à l'issue de la formation et prépare son installation.",
    missions: "Préparation de l'examen, constitution du dossier d'inscription auprès de la CMA, étude du projet d'installation.",
    contribution: "Elle doit permettre un retour à l'emploi par la création d'activité.",
  },
  {
    besoin: "Comprendre la réglementation du transport public particulier de personnes, point faible identifié au positionnement.",
    objectif: "Mon objectif est de ne plus confondre les règles du taxi et celles du VTC et de maîtriser la réservation préalable.",
    projet: "Elle m'aidera à exercer sans risque de sanction sur ma carte professionnelle.",
    attentes: "Il est attendu que {le_sal} maîtrise les règles d'exercice et les démarches liées à la carte professionnelle.",
    missions: "Révision de la réglementation T3P et de la réglementation spécifique VTC, entraînement aux QCM.",
    contribution: "Elle doit sécuriser l'exercice de la future activité.",
  },
  {
    besoin: "Apprendre à calculer un prix de revient et un seuil de rentabilité avant d'acheter un véhicule.",
    objectif: "Je souhaite savoir à partir de combien de courses par mois mon activité devient rentable.",
    projet: "Elle me permettra de décider entre achat, location ou location avec option d'achat du véhicule.",
    attentes: "Il est attendu que {le_sal} présente un projet chiffré et réaliste.",
    missions: "Prévisionnel de l'activité, choix du véhicule, choix du statut juridique.",
    contribution: "Elle doit éviter un investissement mal dimensionné.",
  },
  {
    besoin: "Améliorer son anglais pour accueillir la clientèle internationale des aéroports et des hôtels.",
    objectif: "Mon objectif est de réussir l'épreuve d'anglais et de savoir accueillir un client étranger avec aisance.",
    projet: "Elle m'aidera à travailler avec les hôtels et la clientèle d'affaires.",
    attentes: "Il est attendu que {le_sal} sache accueillir et informer un client en anglais.",
    missions: "Accueil des clients, transferts aéroport et gare, relation avec les hôtels partenaires.",
    contribution: "Elle doit ouvrir l'accès à une clientèle à plus forte valeur.",
  },
  {
    besoin: "Préparer l'épreuve pratique d'admission : accueil, itinéraire, conduite souple et facturation.",
    objectif: "Je veux connaître ce qui est attendu à l'épreuve pratique et m'entraîner sur des simulations de course.",
    projet: "Elle me permettra d'aborder l'épreuve pratique sereinement.",
    attentes: "Il est attendu que {le_sal} réalise une course complète conforme aux attentes de l'épreuve.",
    missions: "Préparation des itinéraires, accueil et prise en charge du client, facturation.",
    contribution: "Elle doit sécuriser la réussite à l'épreuve d'admission.",
  },
  {
    besoin: "Construire un projet d'entreprise de VTC à deux associés et choisir le bon statut.",
    objectif: "Mon objectif est de comparer les statuts de société et de bâtir un prévisionnel avec mon associé.",
    projet: "Elle m'aidera à créer une petite société de transport avec chauffeur.",
    attentes: "Il est attendu que {le_sal} présente un projet de société cohérent et chiffré.",
    missions: "Étude juridique et financière du projet, démarches de création, recherche de clients professionnels.",
    contribution: "Elle doit poser des bases solides pour la future société.",
  },
  {
    besoin: "Revoir le code de la route et les gestes de premiers secours après de longues années de conduite.",
    objectif: "Je souhaite remettre à jour mes connaissances du code de la route et savoir réagir en cas d'accident.",
    projet: "Elle me permettra de transporter des passagers en toute sécurité.",
    attentes: "Il est attendu que {le_sal} maîtrise les règles de sécurité et la conduite à tenir en cas d'accident.",
    missions: "Révision du code de la route, sécurité des passagers, préparation au PSC1 demandé pour la carte.",
    contribution: "Elle doit réduire les risques pour les passagers et pour l'entreprise.",
  },
  {
    besoin: "Développer une clientèle directe pour ne pas dépendre uniquement des plateformes.",
    objectif: "Mon objectif est de construire un plan commercial avec des clients d'entreprise et des hôtels.",
    projet: "Elle m'aidera à stabiliser mon chiffre d'affaires dès la première année.",
    attentes: "Il est attendu que {le_sal} élabore un plan de développement commercial réaliste.",
    missions: "Étude de marché, prospection, devis, suivi du tableau de bord commercial.",
    contribution: "Elle doit diversifier les sources de chiffre d'affaires.",
  },
  {
    besoin: "Se reconvertir après un emploi dans le commerce et sécuriser cette reconversion par la certification.",
    objectif: "Je veux obtenir l'habilitation VTC pour changer de métier tout en gardant un revenu régulier.",
    projet: "Elle me permettra de devenir conduct{/rice} VTC salarié{e} puis, plus tard, indépendant{e}.",
    attentes: "Il est attendu que {le_sal} obtienne la certification et prépare son entrée dans le métier.",
    missions: "Préparation de l'examen, recherche d'un premier poste de conducteur salarié.",
    contribution: "Elle doit sécuriser la reconversion professionnelle.",
  },
  {
    besoin: "Améliorer son français écrit pour l'épreuve de français et pour les échanges écrits avec les clients.",
    objectif: "Mon objectif est d'écrire des messages clairs et sans fautes et de mieux comprendre les textes réglementaires.",
    projet: "Elle m'aidera à communiquer de façon professionnelle avec les entreprises clientes.",
    attentes: "Il est attendu que {le_sal} produise des écrits professionnels clairs.",
    missions: "Messages de confirmation, devis et notes de course, échanges avec les clients professionnels.",
    contribution: "Elle doit améliorer l'image professionnelle de l'activité.",
  },
  {
    besoin: "Comprendre ses droits et obligations dans le travail avec les plateformes de réservation.",
    objectif: "Je souhaite savoir ce que la plateforme doit m'indiquer, ce que je peux refuser et comment calculer si une course est rentable.",
    projet: "Elle me permettra de travailler avec les plateformes sans subir leurs conditions.",
    attentes: "Il est attendu que {le_sal} connaisse le cadre légal des relations avec les plateformes.",
    missions: "Activité sur plateformes, comparaison des offres, suivi de la rentabilité.",
    contribution: "Elle doit améliorer la rentabilité des courses acceptées.",
  },
  {
    besoin: "Organiser son temps de travail pour conduire en sécurité tout en atteignant ses objectifs de chiffre d'affaires.",
    objectif: "Mon objectif est d'organiser mes journées avec des pauses suffisantes et un planning de réservations réaliste.",
    projet: "Elle m'aidera à durer dans le métier sans mettre ma santé en danger.",
    attentes: "Il est attendu que {le_sal} concilie sécurité et organisation de l'activité.",
    missions: "Planification des réservations, gestion des temps de conduite et de repos, suivi de l'activité.",
    contribution: "Elle doit prévenir les risques liés à la fatigue au volant.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilVTC48(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

function entAccords(txt: string, fem: boolean): string {
  return accorder(txt.replace(/\{le_sal\}/g, fem ? "la stagiaire" : "le stagiaire"), fem);
}

export function getVTC48Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return entAccords(profilVTC48(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production du stagiaire sur le cas de Samir puis son propre projet
// Indices : 0 professions et conditions d'accès, 1 réservation et maraude, 2 statut juridique,
//           3 prix de revient et seuil, 4 accident, 5 fatigue et sécurité, 6 français et anglais,
//           7 développement commercial, 8 plateformes et réglementation spécifique, 9 épreuve pratique ;
//           8 productions par banque.
// La k-ième production de chaque banque suit le même stagiaire fictif : un stagiaire garde le même
// parcours d'un exercice à l'autre.
//   0 ancien·ne livreur·se · 1 salarié·e du commerce en reconversion · 2 demandeur·se d'emploi
//   3 ancien·ne agent de sécurité · 4 ancien·ne réceptionniste d'hôtel · 5 porteur·se d'un projet de société
//   6 conducteur·rice salarié·e de transport de personnes · 7 jeune conducteur·rice hors période probatoire
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Professions et conditions d'accès
  [
    "J'ai travaillé dix ans dans la livraison. Comme Samir, je dois d'abord réussir l'examen de la CMA, puis demander ma carte professionnelle à la préfecture, avec la visite médicale et le PSC1. J'ai remis mes démarches dans l'ordre : examen, carte, entreprise, registre, assurance, signalétique.",
    "Je travaille dans le commerce et je prépare ma reconversion. J'ai distingué les trois professions du T3P et retenu que la carte professionnelle est délivrée par le préfet, pas par la CMA. Mon permis n'est plus probatoire depuis longtemps, mon casier est vierge : il me reste l'examen.",
    "Je suis inscrit{e} à France Travail. Je pensais qu'une inscription sur une application suffisait ; j'ai compris qu'il faut l'examen, la carte professionnelle et l'inscription de l'entreprise au registre des exploitants VTC avant la première course.",
    "J'ai travaillé dans la sécurité privée, je connais les contrôles d'honorabilité. Pour Samir, j'ai listé les conditions : permis B hors période probatoire, casier compatible, examen, carte professionnelle avec aptitude médicale et premiers secours.",
    "J'ai été réceptionniste dans un hôtel. Ce qui distingue le taxi du VTC, c'est la maraude réservée au taxi. Pour moi, l'ordre des démarches est clair : examen auprès de la CMA, carte professionnelle, création de l'entreprise, registre, assurance.",
    "Je prépare une société de VTC avec un associé. Nous devrons chacun obtenir notre carte professionnelle, et la société devra être inscrite au registre des exploitants. J'ai aussi noté que la carte se renouvelle avec une formation continue.",
    "Je suis déjà conduct{/rice} salarié{e} dans le transport de personnes, mais pas en VTC. J'ai appris que l'examen ne suffit pas : sans carte professionnelle, je ne peux pas transporter de clients en VTC, même pour un employeur.",
    "J'ai mon permis depuis quatre ans, il n'est plus probatoire. J'ai vérifié chaque condition pour mon cas et préparé la liste des pièces pour la carte professionnelle : aptitude médicale, attestation de premiers secours, justificatifs.",
  ],
  // 1 — Réservation préalable, maraude et contrôle
  [
    "Devant la gare, je refuse poliment le voyageur qui me fait signe : sans réservation préalable, je n'ai pas le droit de le prendre. Je retourne ensuite à mon lieu d'établissement, comme Samir aurait dû le faire.",
    "J'ai listé ce que je présente lors d'un contrôle : carte professionnelle, justificatif de réservation sur mon téléphone, permis, attestation d'assurance et preuve d'inscription au registre.",
    "Je croyais pouvoir attendre devant la gare entre deux courses. Sans nouvelle réservation, je dois retourner au lieu d'établissement ou stationner hors de la chaussée, là où c'est autorisé.",
    "La maraude électronique, c'est montrer sa position et sa disponibilité à un client avant toute réservation : c'est interdit, car cela revient à faire du taxi. Je garde chaque justificatif de réservation.",
    "Au voyageur qui me hèle, je propose de réserver par l'application ou je lui indique la station de taxis. Une course prise sans réservation peut me coûter ma carte.",
    "Pour notre future société, chaque conducteur devra garder ses justificatifs de réservation pour les contrôles. Nous ne stationnerons jamais sur une station de taxis.",
    "Dans mon emploi actuel, les courses sont planifiées à l'avance : en VTC, la réservation préalable fonctionne de la même façon, avec un justificatif à présenter.",
    "Le cas de Samir m'a montré qu'un geste de bonne volonté peut être une infraction. Je retiens trois règles : réservation préalable, justificatif, pas d'attente sur la voie publique.",
  ],
  // 2 — Statut juridique
  [
    "Je démarre en micro-entreprise pour la simplicité, mais j'ai compris que mes charges réelles ne seront pas déduites : je ferai le point avec un expert-comptable au bout d'un an.",
    "J'ai comparé les trois statuts. Je choisis la SASU pour le régime assimilé salarié et la protection de mon patrimoine, en acceptant une comptabilité complète.",
    "Je ne savais pas ce qu'était un statut juridique. Je retiens que l'entreprise individuelle n'a pas de personnalité morale, contrairement à l'EURL et à la SASU, et que mon choix dépend de mes charges.",
    "Avec un véhicule acheté à crédit, mes charges seront élevées : la micro-entreprise ne me convient pas. Je m'oriente vers une entreprise individuelle au régime réel.",
    "Je resterai salarié{e} d'une société de VTC la première année, puis je choisirai mon statut d'indépendant{e} quand je connaîtrai mon chiffre d'affaires réel.",
    "Avec mon associé, nous créerons une SAS : nous avons comparé la responsabilité, le régime social du président et le coût de la comptabilité.",
    "En EURL, le gérant associé unique est en principe travailleur indépendant. J'ai fait le tableau comparatif et je vérifierai les seuils et taux sur les sites officiels.",
    "Pour Samir, je recommande une société ou le régime réel, car sa location de véhicule et ses commissions pèsent lourd. Pour moi, je commence en micro-entreprise avec un véhicule loué.",
  ],
  // 3 — Prix de revient et seuil de rentabilité
  [
    "Pour Samir : 30 moins 9, soit 21 € de marge sur coûts variables par course ; 1 050 divisé par 21, soit un seuil de rentabilité de 50 courses par mois.",
    "J'ai refait le calcul avec mes propres chiffres : mes charges fixes sont plus élevées que celles de Samir, mon seuil de rentabilité est d'environ 60 courses par mois.",
    "Je ne savais pas calculer un seuil de rentabilité. Maintenant je classe mes charges, je calcule la marge par course et je divise les charges fixes par cette marge.",
    "Pour 120 courses, le prix de revient d'une course de Samir est de 17,75 € : la course à 14 € ne couvre pas tout, je ne l'accepterais qu'exceptionnellement, au-dessus du seuil.",
    "J'ai intégré l'amortissement du véhicule dans mes charges fixes ; mon seuil de rentabilité a augmenté, mais il est réaliste.",
    "Pour notre société, nous avons calculé un seuil par conducteur et un seuil global. Le tableau nous servira à fixer les prix des devis.",
    "Je compare désormais chaque offre de course à mon prix de revient : au-delà du seuil, une course qui couvre les charges variables reste utile pour remplir un creux.",
    "Au-dessus de mon seuil de rentabilité, mon résultat prévisionnel pour 120 courses est positif, mais je dois encore payer mes cotisations personnelles : je garde une marge de sécurité dans mes prix.",
  ],
  // 4 — Accident
  [
    "Je protège d'abord : feux de détresse, arrêt en sécurité, gilet, passagers derrière la glissière. Puis j'alerte le 112 avec le lieu exact, et je surveille la victime.",
    "Mon message d'alerte : autoroute A86, sens et repère, un véhicule contre la glissière, un conducteur inconscient qui respire. Je ne raccroche pas le premier.",
    "Après avoir protégé et alerté, je voulais sortir le blessé du véhicule ; j'ai appris qu'on ne le déplace pas sauf danger immédiat. S'il est inconscient et respire, je le mets en position latérale de sécurité.",
    "J'ai déjà vu des accidents dans mon ancien métier. Je retiens l'ordre : protéger, alerter, secourir, et les numéros 15, 17, 18, 112 et 114.",
    "Je rassure mes clients, je les mets à l'abri, puis j'alerte les secours. Quand c'est possible, j'organise la suite de leur trajet vers l'aéroport.",
    "S'il y a un blessé, j'alerte les secours ; si l'accrochage est sans blessé, nous remplissons un constat amiable avec un croquis et je le transmets à l'assureur. Notre société aura une procédure écrite.",
    "Je transporte déjà des passagers : leur sécurité passe avant tout. Je les fais sortir côté opposé à la circulation, puis j'alerte.",
    "Je n'avais aucune formation en secourisme. Je vais suivre le PSC1 demandé pour la carte, et je connais déjà les étapes pour alerter les secours.",
  ],
  // 5 — Fatigue, alcool, médicaments
  [
    "Je réduis mes journées pendant les salons et je fais une pause d'un quart d'heure toutes les deux heures. Le café ne remplace pas le sommeil.",
    "Je ne conduis pas sous traitement qui provoque de la somnolence : je demande l'avis du pharmacien et je vérifie le pictogramme sur la boîte. Je planifie mes pauses dans mes réservations.",
    "Je pensais pouvoir enchaîner les courses ; je prévois maintenant une vraie pause pour le repas et une sieste courte si je sens la fatigue.",
    "J'ai l'habitude des horaires de nuit. La nuit, je fais plus souvent une pause et je garde au moins deux secondes de distance avec le véhicule qui précède.",
    "Je règle l'application avant de partir et je ne touche plus mon téléphone en roulant ; je m'arrête en lieu sûr à chaque pause pour consulter mes réservations.",
    "Dans notre société, le planning prévoit des pauses obligatoires et une amplitude limitée pour chaque conducteur.",
    "Alcool et stupéfiants allongent le temps de réaction : zéro consommation quand je travaille. Je fais une pause dès que ma vigilance baisse.",
    "J'ai construit une journée type avec mes pauses toutes les deux heures environ, et je vérifie que mes passagers sont attachés avant de démarrer.",
  ],
  // 6 — Français et anglais
  [
    "Mon message à Mme Durand donne la date, l'heure, le lieu, le véhicule et mon numéro. En anglais, je sais accueillir M. Smith, vérifier sa destination et proposer de l'aider avec ses bagages.",
    "J'ai reformulé l'article sur la réservation préalable sans contresens. En anglais, j'annonce la durée : « The journey will take about forty minutes. »",
    "Mon anglais était très faible ; j'ai appris les phrases d'accueil, de bagages et de ceinture. Pour le français, je relis chaque message avant de l'envoyer.",
    "J'ai joué l'accueil en anglais à l'aéroport en sous-groupe ; mon point faible reste la prononciation, mais les phrases sont justes.",
    "Grâce à mon ancien travail à l'hôtel, l'anglais est facile pour moi ; j'ai travaillé l'écrit en français, surtout les accords.",
    "Pour notre société, j'ai rédigé un modèle de message de confirmation en français et en anglais pour les clients d'entreprise.",
    "Je propose en anglais la climatisation ou la musique ; en français, j'ai corrigé mes abréviations dans les messages aux clients.",
    "En anglais, je réponds à « How much is the fare? » en rappelant le prix fixé à la réservation. Mon message en français est court et poli.",
  ],
  // 7 — Développement commercial
  [
    "Mon étude de marché vise les entreprises de Créteil et les transferts vers Orly. Je démarcherai trois hôtels et deux entreprises le premier mois pour trouver des clients directs.",
    "J'ai préparé un modèle de devis complet pour un client d'entreprise : identité, date, lieux, prestation, prix, conditions d'annulation et durée de validité.",
    "Je ne savais pas comment trouver des clients ; j'ai maintenant trois canaux en plus des plateformes et un tableau de bord pour suivre mon chiffre d'affaires par canal.",
    "Je vise les entreprises qui organisent des événements ; ma fidélisation passe par un contact direct et un service constant pour chaque client.",
    "Mes contacts dans l'hôtellerie seront mon premier canal : je proposerai aux réceptions un service fiable pour leurs clients.",
    "Avec mon associé, nous ciblons les clients d'entreprise de la zone d'activités. Notre tableau de bord suivra les kilomètres à vide et la marge par client.",
    "Je connais déjà des établissements dont les clients ont besoin de transport régulier ; je leur proposerai un devis et une réservation directe simple.",
    "J'ai créé une fiche d'établissement en ligne et des cartes de visite ; mon objectif est d'avoir des clients directs réguliers d'ici six mois.",
  ],
  // 8 — Plateformes et réglementation spécifique
  [
    "Avant d'accepter une course, la plateforme doit m'indiquer la distance et le prix minimal garanti ; je peux refuser sans pénalité.",
    "Le prix d'une course VTC est fixé à la réservation, contrairement au taxi et à son tarif réglementé. Je compare chaque offre de la plateforme à mon prix de revient.",
    "Je pensais que la plateforme imposait mes horaires ; je suis libre de me connecter ou non et de refuser une course proposée.",
    "Que je travaille ou non avec une plateforme, mon véhicule devra porter la signalétique VTC et mon assurance couvrir le transport de personnes à titre onéreux ; pour les caractéristiques techniques, je me réfère au code des transports.",
    "L'ARPE organise le dialogue social entre les plateformes et les conducteurs indépendants : je suivrai les accords du secteur.",
    "Pour notre société, nous travaillerons avec deux plateformes au plus et nous garderons une clientèle directe pour ne pas dépendre d'elles.",
    "Je garde la trace de chaque course de la plateforme et de son prix pour vérifier mes revenus et mes justificatifs de réservation.",
    "J'ai appris que la loi d'orientation des mobilités oblige la plateforme à m'informer avant l'acceptation : je refuserai les courses non rentables.",
  ],
  // 9 — Épreuve pratique
  [
    "Pour Mme Lefèvre, j'ai préparé l'itinéraire et un trajet de délestage. À l'arrivée, je remets une facture avec l'identité de l'entreprise, la date, les lieux et le prix, puis je vérifie qu'elle n'oublie rien.",
    "Ma simulation : accueil, vérification de la réservation, valise, ceinture, conduite souple, information sur la durée, paiement par carte et note de course facturée correctement.",
    "Je pensais qu'il suffisait de conduire ; j'ai appris que l'accueil, l'information du client et la facturation comptent aussi à l'épreuve pratique.",
    "Mon point faible est la conduite souple : je dois anticiper davantage. La facturation et l'accueil sont maîtrisés.",
    "L'accueil est mon point fort grâce à l'hôtellerie ; je dois travailler la préparation de l'itinéraire et la facture complète.",
    "Nous utiliserons la même grille d'auto-évaluation pour former les futurs conducteurs de notre société : accueil, conduite, facturation, prise de congé.",
    "Je suis habitué{e} à transporter des passagers, mais pas à facturer : j'ai appris les mentions de la note de course.",
    "J'ai listé les erreurs qui pénalisent : infraction au code de la route, accueil négligé, facture incomplète. Je m'entraîne sur ces trois points.",
  ],
];

const BILANS_PERSONNELS = [
  "Cette mise en situation m'a surtout appris à justifier mes réponses avec la règle exacte.",
  "Le plus difficile a été de tout faire dans le temps imparti ; je refais l'exercice dans l'espace e-learning.",
  "J'ai comparé ma réponse avec celle d'un autre stagiaire en sous-groupe, ce qui m'a fait corriger un oubli.",
  "Je vais appliquer cette méthode dans la préparation de mon installation.",
  "Le corrigé du formateur m'a permis de repérer une confusion entre taxi et VTC que je faisais sans le savoir.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de l'expliquer.",
  "Je me suis appuyé{e} sur le modèle fourni dans l'espace e-learning, que je vais adapter à mon projet.",
  "Je n'ai pas eu le temps de tout détailler, mais l'essentiel est là.",
  "J'ai posé une question au formateur pendant la classe virtuelle, ce qui m'a évité une erreur.",
  "Je vais retravailler ce point avec les QCM d'entraînement avant l'examen.",
  "Je dois encore revoir quelques notions, mais je sais où trouver les textes officiels.",
  "J'ai pris des notes que je relirai la veille de l'examen.",
];

/** Banque de la mise en situation à partir de son titre (ou de sa consigne), sinon de son rang. */
function blocExercice(contexte: string, exerciceIdx: number): number {
  const t = contexte || "";
  const num = t.match(/\bExercice\s+(\d{1,2})\b/i);
  if (num) {
    const n = parseInt(num[1], 10);
    if (n >= 1 && n <= EXERCICES_PRODUCTIONS.length) return n - 1;
  }
  if (/[ée]preuve pratique|simulation/i.test(t)) return 9;
  if (/plateforme/i.test(t)) return 8;
  if (/commercial/i.test(t)) return 7;
  if (/anglais|fran[çc]ais/i.test(t)) return 6;
  if (/fatigue|alcool|journ[ée]es/i.test(t)) return 5;
  if (/accident/i.test(t)) return 4;
  if (/seuil|prix de revient/i.test(t)) return 3;
  if (/statut/i.test(t)) return 2;
  if (/r[ée]servation|maraude/i.test(t)) return 1;
  if (/conditions d'acc[èe]s|T3P/i.test(t)) return 0;
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickVTC48ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isVTC48Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques : un stagiaire garde le même parcours d'un exercice à l'autre, et sur un groupe de
  // 8 stagiaires les 8 productions d'un même exercice sont toutes différentes. Le bilan personnel
  // change d'un exercice à l'autre. L'entreprise du stagiaire est citée quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bloc + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai transposé la mise en situation à mon projet, au sein de ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "Baccalauréat professionnel Logistique",
  "CAP Opérateur logistique",
  "Baccalauréat général",
  "BTS Management commercial opérationnel",
  "Aucun diplôme : plusieurs années d'expérience dans la livraison",
  "Brevet des collèges, puis expérience dans la sécurité privée",
  "BTS Tourisme",
  "Diplôme obtenu à l'étranger, puis expérience dans le transport",
  "Baccalauréat STMG",
  "CAP Agent de sécurité",
  "Licence d'économie et gestion",
  "Baccalauréat professionnel Métiers de l'accueil",
  "DUT Gestion logistique et transport",
  "Titre de conducteur salarié obtenu en entreprise, sans diplôme scolaire",
  "Baccalauréat professionnel Métiers du commerce et de la vente",
  "Master en commerce international, reconversion vers le transport de personnes",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant chaque journée.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières devant l'écran me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des supports en police suffisamment grande.",
  "Non, pas de handicap. J'entends moins bien avec certains casques : j'aimerais pouvoir activer les sous-titres.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je lis plus lentement en français : j'apprécie que les consignes soient aussi lues à voix haute.",
  "Non, aucune situation de handicap. Je préfère répondre à l'oral pendant les mises en situation.",
  "Non. Je préfère avoir les fiches en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté avant la formation.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible pour les 7 jours en classe virtuelle, de <strong>09h00 à 17h00</strong> (16h00 le dernier jour), samedi compris.",
  "J'ai bloqué les 7 jours dans mon planning (<strong>09h00 – 12h30 / 13h30 – 17h00</strong>) et je réviserai les QCM le soir.",
  "Je suis disponible de <strong>09h00 à 17h00</strong> pendant les 7 jours, depuis un endroit calme avec une bonne connexion.",
  "Je peux suivre l'intégralité des 7 jours à distance, de <strong>09h00 à 17h00</strong>, samedi inclus, sans contrainte particulière.",
  "Je suis disponible pour les 7 jours (<strong>09h00 – 17h00</strong>) ; j'ai décalé mes rendez-vous de recherche d'emploi après la formation.",
  "Disponibilité complète pour les 7 jours, de <strong>09h00 à 17h00</strong>. J'ai fait le test de connexion proposé.",
  "Pour les 7 jours, je suis disponible de <strong>09h00 à 17h00</strong> ; j'ai organisé la garde de mes enfants, y compris le samedi.",
  "Je suis disponible de <strong>09h00 à 17h00</strong> pendant les 7 jours, et je consulterai l'espace e-learning le soir.",
  "Je suivrai les 7 jours en classe virtuelle (<strong>09h00 – 17h00</strong>, 16h00 le dernier jour) et je prévois de refaire les examens blancs le soir.",
  "Aucune contrainte sur les 7 jours, de <strong>09h00 à 17h00</strong>, samedi compris. Mon employeur a validé mon absence.",
];

/** Réponses d'évaluation des besoins propres à la formation VTC 48 h, différentes pour chaque stagiaire. */
export function getVTC48EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = vtc48Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilVTC48(idx, s.nom, s.prenom);
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
