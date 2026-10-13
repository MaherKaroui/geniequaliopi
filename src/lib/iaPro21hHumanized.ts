// ---------------------------------------------------------------------------
// « Intelligence artificielle : intégrer les outils d'IA dans son activité professionnelle – 21 h »
// — moteur de réponses HUMANISÉES
// Formation professionnelle non certifiante : évaluation interne + attestation de fin de formation.
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes de
//     l'employeur…), puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes : diagnostic puis C1 à C5, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par exercice + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Les entreprises et les chiffres cités dans les copies sont fictifs.
// ---------------------------------------------------------------------------

const normalize = (s: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Intelligence artificielle : intégrer les outils d'IA dans son
 * activité professionnelle – 21 h ». L'intitulé normalisé (minuscules, sans accents, apostrophes
 * droites) doit contenir « integrer les outils d'ia », ou bien « intelligence artificielle » avec une
 * durée de 21 h. La formation du catalogue consacrée à la création de contenus par l'IA générative
 * (28 h) et les formations commerciales ne sont pas concernées.
 */
export function isIAP21Formation(intitule?: string, code?: string): boolean {
  void code;
  const t = normalize(intitule || "").toLowerCase().replace(/[’‘`´]/g, "'");
  if (t.includes("integrer les outils d'ia")) return true;
  return t.includes("intelligence artificielle") && /\b21\s*h/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function iap21Seed(nom?: string, prenom?: string): number {
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
  typeof idx === "number" && idx >= 0 ? idx : iap21Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// diagnostic, C1 fonctionnement et limites, C1 outils et cas d'usage, C2 structure de la requête,
// C2 itération et bibliothèque, C3 écrits professionnels, C3 synthèse, données et vérification,
// C4 intégration dans les outils, C4 automatisation et plan d'action, C5 usage responsable et conforme
// ---------------------------------------------------------------------------
export const IAP21_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Quelles sont vos tâches les plus fréquentes et utilisez-vous déjà un outil d'intelligence artificielle dans votre travail ?", reponseAttendue: "Tâches principales et temps estimé (mails, comptes rendus, devis, tableaux), outils d'IA déjà utilisés ou non, type de compte (personnel ou professionnel), usages réussis et déceptions, existence ou non de règles dans l'entreprise." },
    { question: "Selon vous, comment un outil comme ChatGPT produit-il ses réponses, et peut-il se tromper ?", reponseAttendue: "Modèle entraîné sur de grands volumes de textes, qui prédit la suite la plus probable à partir de la requête et du contexte (tokens, probabilités) ; il peut inventer des informations plausibles (hallucinations), ignorer les faits récents (date de connaissance) et reproduire des biais : il faut vérifier." },
    { question: "Quels outils d'IA connaissez-vous et pour quels usages professionnels les choisiriez-vous ?", reponseAttendue: "Assistants conversationnels (ChatGPT, Copilot, Gemini, Le Chat de Mistral AI, Claude), moteur de réponse connecté au web (Perplexity), fonctions IA de Canva, Copilot dans Microsoft 365, outils d'automatisation sans code ; choix selon la tâche, les limites et la confidentialité des données." },
    { question: "Comment formulez-vous une demande à un outil d'IA pour obtenir une réponse utile ?", reponseAttendue: "Requête structurée : rôle, contexte, tâche, format et contraintes ; exemple de résultat attendu ; demande de procéder par étapes ; aucune donnée personnelle ou confidentielle dans la requête." },
    { question: "Que faites-vous quand la première réponse de l'outil ne vous convient pas ?", reponseAttendue: "Itérer : préciser la cible, ajouter du contexte et des contraintes, demander une reformulation ou une autocritique, faire poser des questions par l'outil ; conserver les requêtes efficaces dans une bibliothèque partagée." },
    { question: "Comment rédigez-vous aujourd'hui vos mails clients, courriers et comptes rendus, et comment l'IA pourrait-elle vous aider ?", reponseAttendue: "Premier jet par l'IA à partir de faits exacts et anonymisés, adapté au destinataire ; relecture systématique du ton, des faits, des engagements et des coordonnées ; aucune promesse commerciale inventée." },
    { question: "Comment vérifiez-vous une information, une synthèse ou un chiffre obtenu avec un outil numérique ?", reponseAttendue: "Retour au document source, ouverture des liens cités, recoupement avec une source officielle, recalcul des chiffres ou contrôle d'un échantillon, relecture par une deuxième personne pour les documents sensibles." },
    { question: "Quelles tâches de votre poste pourraient être facilitées par l'IA dans vos outils habituels (messagerie, traitement de texte, tableur, réunions) ?", reponseAttendue: "Cartographie des tâches selon la fréquence, le gain et le risque ; Copilot dans Outlook, Word, Excel et Teams ou assistant conversationnel ; formules de tableur ; transcription de réunions avec information des participants ; point de contrôle humain." },
    { question: "Avez-vous déjà automatisé une tâche répétitive, et comment mesureriez-vous le temps gagné ?", reponseAttendue: "Automatisation sans code (Power Automate, Zapier, Make) : déclencheur, actions, données, test et surveillance ; mesure du temps avant et après, vérification comprise ; plan d'action daté avec indicateurs." },
    { question: "Quelles règles faut-il respecter pour utiliser l'IA avec les données de l'entreprise et des clients ?", reponseAttendue: "RGPD (minimisation, information, sécurité), secret des affaires, recommandations de la CNIL ; règlement européen sur l'IA (UE) 2024/1689 et son calendrier ; droit d'auteur, transparence envers les clients, charte d'usage interne." },
  ],
  fin: [
    { question: "Présentez le diagnostic de vos tâches et de vos usages de l'IA, et les priorités que vous en tirez.", reponseAttendue: "Dix tâches et temps estimés, outils et comptes utilisés, réussite et déception analysées, données sensibles repérées, 3 forces, 3 points de vigilance et 3 priorités reliées aux compétences C1 à C5." },
    { question: "Expliquez comment un grand modèle de langage produit une réponse et pourquoi il peut produire une hallucination.", reponseAttendue: "Entraînement sur de grands volumes de textes, découpage en tokens, prédiction de la suite la plus probable dans la limite de la fenêtre de contexte ; hallucinations, date de connaissance, biais ; règles de vérification." },
    { question: "Quels outils choisissez-vous selon les cas d'usage de votre poste, et avec quelles précautions ?", reponseAttendue: "Assistant conversationnel, assistant intégré à la bureautique, moteur de réponse connecté au web, création visuelle, automatisation sans code ; gains réalistes, risques, données à anonymiser, conditions d'utilisation et paramètres de confidentialité vérifiés." },
    { question: "Présentez la structure d'une requête efficace et un exemple tiré de votre poste.", reponseAttendue: "Rôle, contexte, tâche, format, contraintes ; exemple de réponse attendue ; étapes ; repères entre crochets à la place des données personnelles ; interdiction des engagements non validés." },
    { question: "Comment améliorez-vous une réponse par itération et comment organisez-vous votre bibliothèque de prompts ?", reponseAttendue: "Itérations ciblées (cible, format, contraintes), autocritique, questions préalables posées par l'outil ; fiches de requêtes testées avec variables et points de vérification ; assistant personnalisé paramétré sans document confidentiel ; mise à jour par un responsable." },
    { question: "Comment produisez-vous un mail client ou un compte rendu avec l'IA, et que vérifiez-vous à la relecture ?", reponseAttendue: "Faits exacts et anonymisés dans la requête, texte adapté au destinataire, relecture du ton, des faits, des engagements, des mentions et des coordonnées ; aucune promesse ni témoignage inventés ; validation humaine avant envoi." },
    { question: "Comment vérifiez-vous une synthèse, un visuel ou une analyse de données produits par l'IA ?", reponseAttendue: "Comparaison de chaque affirmation avec la source, lecture des liens, recalcul des chiffres, formule comprise, droits et conditions d'utilisation des visuels, mention du recours à l'IA lorsque c'est utile, conservation de la source." },
    { question: "Comment avez-vous intégré l'IA dans vos outils de travail et quels processus avez-vous modifiés ?", reponseAttendue: "Matrice fréquence / gain / risque, trois tâches retenues, nouvelles façons de faire dans Outlook, Word, Excel ou Teams avec Copilot ou un assistant, point de contrôle humain, formule de tableur, temps mesuré avant et après." },
    { question: "Présentez l'automatisation que vous avez conçue et votre plan d'action.", reponseAttendue: "Déclencheur, actions, données limitées, place de l'IA et ses limites, test, surveillance, responsable ; précautions sur les données personnelles ; plan à 30, 60 et 90 jours avec indicateurs de temps gagné." },
    { question: "Quelles règles appliquez-vous pour un usage responsable et conforme de l'IA (RGPD, règlement européen, droit d'auteur, charte) ?", reponseAttendue: "RGPD et secret des affaires, recommandations de la CNIL ; règlement (UE) 2024/1689 : entrée en vigueur le 1er août 2024, maîtrise de l'IA depuis le 2 février 2025, modèles à usage général depuis le 2 août 2025, transparence à partir du 2 août 2026, proposition « omnibus numérique » à vérifier ; droit d'auteur, transparence, biais, impact environnemental, charte d'usage." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle, 1 = juste.
// Une seule réponse à 1 dans deux questions seulement, C1 fonctionnement et C2 itération : au plus 6 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — diagnostic des tâches et des usages
  [
    ["Je n'ai jamais utilisé d'outil d'IA ; je passe beaucoup de temps sur les mails, mais je n'ai jamais compté combien.", 0],
    ["J'utilise ChatGPT sur mon téléphone, avec mon compte personnel, pour reformuler des mails. Je pense y passer quatre heures de mails par semaine.", 0.5],
    ["Mes tâches principales : devis, relances, planning. J'ai essayé l'IA une fois pour un courrier, le résultat était trop long et je l'ai abandonnée.", 0.5],
    ["Je ne vois pas à quoi l'IA pourrait me servir dans mon métier, c'est surtout pour les informaticiens.", 0],
    ["Je fais les comptes rendus de chantier le soir, cela me prend deux heures par semaine ; j'ai entendu dire que l'IA pouvait aider, sans savoir comment.", 0.5],
    ["Ma fille utilise ces outils pour ses études ; moi, je ne sais pas par où commencer.", 0],
    ["J'utilise Copilot depuis quelques semaines parce qu'il est arrivé dans notre messagerie, mais je ne sais pas trop ce qu'il fait de nos données.", 0.5],
    ["Je n'ai pas de tâches répétitives, chaque journée est différente.", 0],
    ["J'ai déjà collé un tableau de devis dans un outil gratuit pour faire un calcul ; je ne savais pas s'il y avait des règles dans l'entreprise.", 0],
    ["Je liste facilement mes tâches : mails, comptes rendus, mise à jour du tableau des chantiers. J'utilise parfois un assistant pour les mails, sans méthode.", 0.5],
    ["Je ne connais pas le temps que je passe sur chaque tâche, je n'y ai jamais réfléchi.", 0],
    ["J'ai déjà fait rédiger un post pour la page de l'entreprise ; il était correct mais je l'ai beaucoup retouché.", 0.5],
  ],
  // Q2 — C1 fonctionnement et limites
  [
    ["Je pense que l'outil cherche la bonne réponse dans une grande encyclopédie.", 0],
    ["Pour moi, si l'IA le dit, c'est que c'est vrai : elle a accès à tout internet.", 0],
    ["Je sais qu'elle peut se tromper, on me l'a dit, mais je ne sais pas pourquoi.", 0.5],
    ["Je crois qu'il y a des personnes qui répondent derrière l'écran.", 0],
    ["J'ai vu qu'elle avait inventé une référence de texte une fois ; depuis, je me méfie un peu.", 0.5],
    ["Elle apprend avec beaucoup de textes, je crois, mais je ne saurais pas expliquer plus.", 0.5],
    ["Je sais qu'elle ne connaît pas toujours l'actualité récente, sans savoir pourquoi.", 0.5],
    ["Le modèle a été entraîné sur énormément de textes ; il prédit mot après mot la suite la plus probable, donc il peut inventer quelque chose de plausible : on parle d'hallucination. Il ne connaît pas forcément les faits récents, il faut vérifier.", 1],
    ["Je pense que l'IA réfléchit comme un humain, en plus rapide.", 0],
    ["Je sais qu'elle peut avoir des biais, mais je ne sais pas d'où ils viennent.", 0.5],
    ["Je ne sais pas ce qu'est un token ni une fenêtre de contexte.", 0],
    ["Je pense qu'une IA payante ne se trompe jamais.", 0],
  ],
  // Q3 — C1 outils et cas d'usage
  [
    ["Je connais ChatGPT et Copilot de nom ; je crois que c'est la même chose.", 0.5],
    ["Je ne connais aucun outil d'IA à part les assistants vocaux du téléphone.", 0],
    ["Je pense qu'un seul outil suffit pour tout faire.", 0],
    ["Perplexity, Le Chat, Claude : je n'en ai jamais entendu parler.", 0],
    ["Je sais que Canva propose des fonctions d'IA pour les visuels ; je ne les ai jamais essayées.", 0.5],
    ["Je choisirais l'outil le plus connu, sans regarder les conditions d'utilisation.", 0],
    ["Je sais qu'il existe des outils qui citent leurs sources, mais je ne sais pas lesquels.", 0.5],
    ["Pour moi, l'IA sert surtout à faire des images amusantes.", 0],
    ["J'utilise Gemini avec mon compte Google personnel, pour des recherches ; je ne l'ai jamais utilisé pour le travail.", 0.5],
    ["Je ne sais pas si les outils gratuits gardent ce qu'on leur écrit.", 0],
    ["Je ne sais pas à quoi servent Zapier ou Make.", 0],
    ["Je pense que l'IA pourrait m'aider pour les comptes rendus, mais je ne sais pas quel outil prendre.", 0.5],
  ],
  // Q4 — C2 structure de la requête
  [
    ["J'écris ma question en quelques mots, comme dans un moteur de recherche.", 0],
    ["Je ne sais pas ce qu'est un prompt.", 0],
    ["Je donne un peu de contexte, par exemple le type de client, et le résultat est meilleur.", 0.5],
    ["Je mets le nom et l'adresse du client pour que le mail soit complet.", 0],
    ["Je précise parfois la longueur que je veux, sinon c'est trop long.", 0.5],
    ["Je copie la question telle que le client me l'a posée.", 0],
    ["J'indique le ton souhaité, « courtois » ou « ferme », et cela aide.", 0.5],
    ["J'ai entendu parler de donner un rôle à l'outil, mais je ne l'ai jamais fait.", 0.5],
    ["Je demande « fais un mail » et je corrige ensuite à la main.", 0.5],
    ["Je n'ai jamais donné d'exemple à l'outil.", 0],
    ["Je précise à qui s'adresse le texte, un client ou un collègue, sans aller plus loin.", 0.5],
    ["Je ne sais pas comment m'y prendre, j'ai peur de mal écrire.", 0],
  ],
  // Q5 — C2 itération et bibliothèque
  [
    ["Si la réponse ne me plaît pas, je ferme et je fais le travail moi-même.", 0],
    ["Je repose parfois la question autrement, et la deuxième réponse est souvent meilleure.", 0.5],
    ["Je clique sur « régénérer » jusqu'à ce que ça me plaise.", 0.5],
    ["Je ne savais pas qu'on pouvait continuer la conversation pour corriger.", 0],
    ["Je demande d'améliorer la réponse en précisant ce qui ne va pas : trop long, trop technique, pas assez poli. Je ne garde pas mes bonnes requêtes, mais je sais que je devrais les noter.", 1],
    ["Je garde quelques requêtes dans un fichier, sans les partager.", 0],
    ["Je ne connais pas les assistants personnalisés.", 0],
    ["Je demande parfois de raccourcir ou de simplifier, sans aller plus loin.", 0.5],
    ["Je ne pense pas qu'on puisse demander à l'IA de critiquer sa propre réponse.", 0],
    ["J'ajoute parfois des précisions quand la réponse est hors sujet.", 0.5],
    ["Je ne sais pas ce qu'est une bibliothèque de prompts.", 0],
    ["Je prends la première réponse, je n'ai pas le temps d'en faire plus.", 0],
  ],
  // Q6 — C3 écrits professionnels
  [
    ["J'écris tout à la main, en partant de zéro à chaque fois.", 0.5],
    ["J'utilise des modèles de courrier dans Word que je modifie.", 0.5],
    ["Je n'ai jamais fait rédiger un mail par l'IA.", 0],
    ["J'ai déjà envoyé un mail rédigé par l'IA sans le relire, il contenait une erreur de date.", 0],
    ["Je pense que l'IA pourrait faire mes comptes rendus à partir de mes notes, mais je ne sais pas si elle ajouterait des choses.", 0.5],
    ["Je ne sais pas si on doit relire, je pense que l'outil corrige tout seul.", 0],
    ["Je fais parfois reformuler un mail délicat pour qu'il soit plus poli.", 0],
    ["Je relis toujours mes écrits, mais je mets du temps sur les comptes rendus.", 0.5],
    ["Je pense qu'on peut laisser l'IA promettre un délai pour rassurer le client.", 0],
    ["J'ai déjà fait corriger l'orthographe d'un courrier par un assistant, c'était utile.", 0.5],
    ["Les posts sur les réseaux, je ne sais pas les écrire, et je n'ai pas essayé avec l'IA.", 0],
    ["Je n'ose pas utiliser l'IA pour les clients, j'ai peur que cela se voie.", 0],
  ],
  // Q7 — C3 synthèse, données et vérification
  [
    ["Je ne vérifie pas, je n'ai pas le temps.", 0],
    ["Quand j'ai un doute, je cherche sur internet pour comparer.", 0.5],
    ["Je ne sais pas comment vérifier un résumé sans relire tout le document.", 0],
    ["Je vérifie les chiffres importants avec la calculatrice.", 0.5],
    ["Je regarde si les liens cités fonctionnent, mais je ne lis pas les pages.", 0.5],
    ["Je pense que si l'outil cite une source, l'information est forcément juste.", 0],
    ["Je fais relire les documents importants par ma responsable.", 0.5],
    ["Je n'ai jamais fait de synthèse avec l'IA.", 0],
    ["Je sais qu'il faut retourner au document source, mais je ne le fais pas toujours.", 0.5],
    ["Les visuels faits par l'IA, je pense qu'on peut les utiliser librement.", 0],
    ["Je ne connais pas les formules du tableur, je compte à la main.", 0],
    ["Je compare avec une deuxième source quand il s'agit d'un texte officiel.", 0.5],
  ],
  // Q8 — C4 intégration dans les outils
  [
    ["Je ne vois pas quelles tâches pourraient être facilitées.", 0],
    ["Je pense que les comptes rendus de réunion seraient plus rapides avec l'IA.", 0],
    ["Je ne connais pas Copilot dans Word ou Excel.", 0],
    ["Je sais que Teams peut transcrire une réunion ; je ne savais pas qu'il fallait prévenir les participants.", 0.5],
    ["Mes mails prennent beaucoup de temps ; un résumé automatique des longs échanges m'aiderait.", 0.5],
    ["J'utilise un peu les suggestions d'Outlook, sans savoir si c'est de l'IA.", 0.5],
    ["Je ne sais pas faire de formule dans Excel, je demande à un collègue.", 0],
    ["Je pense que l'IA pourrait m'aider à mettre à jour le tableau des chantiers, sans savoir comment.", 0.5],
    ["Je crois que Copilot voit tous les fichiers de l'entreprise, même ceux auxquels je n'ai pas accès.", 0],
    ["Je fais déjà quelques formules simples dans le tableur, comme les sommes.", 0.5],
    ["Je ne sais pas si l'entreprise a des licences pour ces outils.", 0],
    ["Je ne veux pas changer mes habitudes, elles fonctionnent.", 0],
  ],
  // Q9 — C4 automatisation et plan d'action
  [
    ["Je n'ai jamais rien automatisé.", 0],
    ["J'utilise des règles dans ma messagerie pour classer les mails ; c'est une forme d'automatisation, je crois.", 0.5],
    ["Je ne sais pas ce que sont Power Automate, Zapier ou Make.", 0],
    ["Je recopie chaque demande du site dans un tableau ; j'aimerais que ce soit automatique.", 0.5],
    ["Je pense qu'il faut savoir programmer pour automatiser.", 0],
    ["J'ai entendu parler de Zapier par un ami, sans l'avoir essayé.", 0.5],
    ["Je ne saurais pas mesurer le temps gagné.", 0],
    ["Je pense qu'une automatisation peut fonctionner seule sans jamais être surveillée.", 0],
    ["J'ai déjà programmé des réponses automatiques d'absence ; je sais qu'il faut les tester.", 0.5],
    ["Je ne fais pas de plan, j'avance au jour le jour.", 0],
    ["Je ne vois pas quoi automatiser dans mon poste.", 0],
    ["J'aimerais automatiser les relances de devis, sans savoir comment m'y prendre ; je pourrais compter le temps que j'y passe.", 0.5],
  ],
  // Q10 — C5 usage responsable et conforme
  [
    ["Je ne connais aucune règle particulière, je pense que tout est permis.", 0],
    ["Je sais qu'il y a le RGPD pour les données personnelles, mais je ne vois pas le lien avec l'IA.", 0.5],
    ["Je ne savais pas qu'il existait un règlement européen sur l'IA.", 0],
    ["Je pense qu'il ne faut pas mettre les données des clients dans un outil gratuit, mais je ne sais pas pourquoi exactement.", 0.5],
    ["J'ai entendu parler de l'« AI Act », sans connaître les dates ni les obligations.", 0.5],
    ["Je pense que ce qui est produit par l'IA m'appartient automatiquement.", 0],
    ["Je sais qu'il faut faire attention au droit à l'image quand on publie des photos de chantier.", 0.5],
    ["La CNIL, je sais que ça existe, mais je ne connais pas ses recommandations sur l'IA.", 0.5],
    ["Je pense que l'entreprise devrait avoir des règles sur l'IA ; il n'y en a pas pour le moment.", 0.5],
    ["Je ne pense pas qu'il faille dire au client qu'un texte a été préparé avec l'IA.", 0],
    ["Je n'ai aucune idée de l'impact environnemental de ces outils.", 0],
    ["Les règles, c'est pour les grandes entreprises, pas pour une PME comme la nôtre.", 0],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  // Q1 — diagnostic
  [
    ["Mon diagnostic : quatre heures de mails et deux heures de comptes rendus par semaine, un usage de l'IA sur compte personnel sans règle. Mes priorités : requêtes structurées, vérification systématique, outils validés par l'entreprise.", 1],
    ["J'ai listé mes dix tâches avec leur temps ; trois ressortent nettement : réponses aux clients, comptes rendus, mise à jour du tableau des devis.", 1],
    ["J'ai repéré que j'avais déjà saisi des données de clients dans un outil gratuit : c'est mon premier point de vigilance.", 1],
    ["Je sais maintenant décrire mes usages ; il me reste à chiffrer plus précisément le temps de certaines tâches.", 0.5],
    ["Trois forces : aisance à l'écrit, curiosité, rigueur. Trois points de vigilance : vérification, données, temps passé à retoucher. Chaque priorité est reliée à une compétence.", 1],
    ["Mon échec de départ venait d'une requête trop vague ; ma réussite, d'un contexte bien expliqué.", 1],
    ["J'ai distingué mes usages sur compte personnel et sur compte professionnel ; seuls les seconds seront utilisés pour le travail.", 1],
    ["Mon tableau de suivi a trois colonnes : tâche, temps avant, temps après ; je le remplis chaque semaine.", 1],
    ["J'ai fait le diagnostic ; je dois encore vérifier avec ma responsable quels outils sont autorisés.", 0.5],
    ["J'ai compris que je n'utilisais l'IA que pour reformuler, alors qu'elle peut m'aider sur les synthèses et le tableur.", 1],
    ["Le diagnostic m'a fait arrêter de coller des tableaux de devis dans un outil grand public.", 0.5],
    ["Mes priorités sont écrites dans mon plan d'action, avec un point d'étape prévu avec la direction.", 1],
  ],
  // Q2 — C1 fonctionnement et limites
  [
    ["Le modèle est entraîné sur de très grands volumes de textes ; il découpe le texte en tokens et prédit la suite la plus probable selon le contexte. Il peut donc produire une hallucination : une réponse plausible mais fausse.", 1],
    ["Une hallucination vient du fonctionnement probabiliste : l'outil comble les vides. Je donne les faits et je vérifie les chiffres et les références à la source.", 1],
    ["La date de connaissance explique qu'un modèle ignore une règle récente ; une IA connectée au web peut chercher, mais il faut lire les sources.", 1],
    ["La fenêtre de contexte limite ce que l'outil prend en compte : sur un long document, il peut oublier le début.", 1],
    ["Les biais viennent des données d'entraînement : stéréotypes, droit d'un autre pays, sources surreprésentées.", 1],
    ["Je sais expliquer les tokens et les probabilités ; la différence entre IA générative et apprentissage automatique est encore un peu floue pour moi.", 0.5],
    ["Je distingue un moteur de recherche, qui renvoie vers des pages, et un assistant, qui génère un texte ; les hallucinations concernent surtout le second.", 1],
    ["Mes cinq règles : vérifier chiffres et dates, ouvrir les liens, demander les sources, croiser, faire relire.", 1],
    ["Je comprends pourquoi l'outil a inventé le montant de l'aide demandé par Karim : la donnée change souvent et l'outil n'a pas cherché à la source.", 0.5],
    ["Une IA multimodale traite aussi les images et le son, avec les mêmes risques d'hallucination.", 1],
    ["Je ne fais plus confiance à une référence de texte sans l'avoir ouverte : c'est le cas typique d'hallucination.", 0.5],
    ["J'explique à mes collègues que l'outil calcule une suite probable, il ne « sait » pas.", 1],
  ],
  // Q3 — C1 outils et cas d'usage
  [
    ["Pour les mails, un assistant conversationnel ou Copilot dans Outlook ; pour la veille, Perplexity ou un mode recherche, en lisant les sources ; pour les visuels, Canva.", 1],
    ["Pour automatiser les demandes du site, un outil sans code comme Power Automate, Zapier ou Make.", 1],
    ["Je vérifie les conditions d'utilisation et le paramétrage de confidentialité de chaque outil avant usage professionnel.", 1],
    ["J'anonymise les données dans les outils grand public et je privilégie le compte professionnel de l'entreprise.", 1],
    ["Pour un guide de 40 pages, j'utilise un assistant qui accepte les documents longs, puis je contrôle les passages clés.", 1],
    ["Je connais le panorama des outils ; je dois encore tester Le Chat de Mistral AI et Claude sur mes cas.", 0.5],
    ["Pour les notes vocales du chantier, dictée et transcription puis mise en forme par un assistant.", 1],
    ["Pour le tableau des devis, Copilot dans Excel ou un assistant sur un fichier anonymisé.", 1],
    ["Je sais choisir un outil selon la tâche ; je manque encore de recul sur les offres professionnelles.", 0.5],
    ["Un outil multimodal me permet de photographier un tableau papier au lieu de le ressaisir.", 1],
    ["J'ai noté pour chaque besoin le gain attendu et le risque principal.", 0.5],
    ["Pour la transcription d'une réunion Teams, j'informe les participants avant de lancer l'outil.", 1],
  ],
  // Q4 — C2 structure de la requête
  [
    ["Ma requête suit la structure : rôle, contexte, tâche, format, contraintes. Exemple : « Tu es assistante d'une entreprise de rénovation ; le chantier a 10 jours de retard ; rédige la réponse au client en 12 lignes ; ne promets aucune date. »", 1],
    ["Je donne toujours le contexte exact et j'interdis les engagements non validés.", 1],
    ["J'ajoute un exemple de phrase attendue pour fixer le ton.", 1],
    ["Je demande à l'outil de procéder par étapes : analyser, proposer un plan, rédiger.", 1],
    ["Je remplace le nom et les coordonnées du client par des repères entre crochets.", 1],
    ["Je maîtrise la structure ; je dois encore penser plus souvent aux contraintes de format.", 0.5],
    ["Ma requête de compte rendu précise le destinataire, les rubriques et la longueur.", 1],
    ["J'ai comparé deux réponses : la requête structurée évite les inventions et réduit la retouche.", 1],
    ["Je définis le rôle selon le destinataire : commercial, assistante, conducteur de travaux.", 0.5],
    ["Je relis ma requête avant de l'envoyer pour vérifier qu'aucune donnée sensible n'y figure.", 1],
    ["Je précise le ton, la longueur et le public visé dans chaque requête.", 1],
    ["J'ai gardé ma requête de réponse aux réclamations comme modèle.", 0.5],
  ],
  // Q5 — C2 itération et bibliothèque
  [
    ["Je fais au moins trois itérations : préciser la cible, contraindre le format, demander une autocritique des affirmations à vérifier.", 1],
    ["Je demande à l'outil quelles informations lui manquent avant de répondre.", 1],
    ["Notre bibliothèque de prompts compte cinq fiches : réclamation, relance de devis, compte rendu, post, synthèse ; chacune avec ses points de vérification.", 1],
    ["J'ai paramétré un assistant personnalisé avec notre charte rédactionnelle, sans aucun document confidentiel.", 1],
    ["Chaque itération corrige un défaut précis de la réponse précédente.", 1],
    ["Je sais itérer ; la bibliothèque partagée reste à mettre en place avec ma responsable.", 0.5],
    ["Les variables de mes fiches sont entre crochets : nom du chantier, date, prochaine étape.", 1],
    ["L'autocritique m'a fait repérer deux chiffres à vérifier dans l'argumentaire de Karim.", 1],
    ["Un responsable met à jour la bibliothèque une fois par mois avec les retours de l'équipe.", 0.5],
    ["Je n'utilise plus « régénérer » au hasard : je dis ce qui ne va pas.", 1],
    ["J'ai appris à faire simplifier une réponse trop technique pour un client particulier.", 0.5],
    ["Mes fiches indiquent pour chaque requête l'usage, l'outil et les vérifications.", 1],
  ],
  // Q6 — C3 écrits professionnels
  [
    ["Je donne à l'outil les faits exacts et anonymisés, puis je relis le ton, les faits, les engagements et les coordonnées avant envoi.", 1],
    ["Dans le mail à M. Garnier, j'ai supprimé la date de fin inventée par l'outil : aucune promesse non validée.", 1],
    ["Le compte rendu de chantier reprend les notes de Thomas sans ajout ; Thomas le relit avant envoi.", 1],
    ["Pour le post, aucune donnée personnelle et pas de photo du client sans son accord.", 1],
    ["Ma relance de devis est polie et factuelle, sans pression ni fausse urgence.", 1],
    ["Je trace mes corrections de relecture ; je gagne environ la moitié du temps sur les comptes rendus.", 1],
    ["Je produis de bons premiers jets ; je dois encore raccourcir mes relectures sans les bâcler.", 0.5],
    ["Je ne publie jamais de témoignage inventé : c'est une pratique trompeuse.", 1],
    ["Je vérifie les mentions et coordonnées de l'entreprise dans chaque courrier.", 1],
    ["Je fais valider les courriers sensibles par la direction avant envoi.", 0.5],
    ["J'adapte le niveau de langage au destinataire : client, fournisseur, collègue.", 1],
    ["L'IA m'aide pour les posts, mais c'est moi qui choisis les faits et les photos.", 1],
  ],
  // Q7 — C3 synthèse, données et vérification
  [
    ["Je vérifie chaque phrase d'une synthèse contre le document source et je recopie les chiffres depuis le document, pas depuis la réponse.", 1],
    ["J'ouvre chaque lien cité pour vérifier qu'il existe et qu'il dit bien cela.", 1],
    ["Taux de transformation = devis signés / devis émis ; j'ai fait expliquer la formule NB.SI.ENS et recalculé deux résultats à la main.", 1],
    ["Pour les visuels : conditions d'utilisation vérifiées, aucun logo ni personne réelle reconnaissable, mention de l'IA si l'image peut passer pour une photo.", 1],
    ["Les réponses de la FAQ sur les prix et les délais sont validées par la direction.", 1],
    ["Je contrôle les chiffres par recalcul ou par échantillon avant de les diffuser.", 1],
    ["Je vérifie les synthèses ; la vérification des visuels me demande encore de la pratique.", 0.5],
    ["Je conserve la source avec le document produit pour pouvoir la retrouver.", 1],
    ["Je fais relire les documents sensibles par une deuxième personne.", 0.5],
    ["Je ne demande plus de visuel « dans le style » d'un illustrateur connu.", 1],
    ["J'ai corrigé deux contresens dans la synthèse du guide en la comparant au texte.", 0.5],
    ["Je croise toute information réglementaire avec une source officielle.", 1],
  ],
  // Q8 — C4 intégration dans les outils
  [
    ["Ma matrice fréquence / gain / risque m'a fait retenir trois tâches : réponses aux mails, comptes rendus, tableau des devis. J'utilise Copilot dans Outlook et Word, avec relecture.", 1],
    ["Copilot dans Teams me donne le récapitulatif de la réunion transcrite ; les participants sont informés au début.", 1],
    ["J'ai obtenu avec l'aide de l'IA une formule SOMME.SI.ENS pour le chiffre d'affaires signé par commercial, et je l'ai comprise.", 1],
    ["Copilot accède aux documents auxquels j'ai accès : j'ai fait vérifier les droits de partage de nos dossiers.", 1],
    ["Chaque nouvelle façon de faire a un point de contrôle humain avant envoi.", 1],
    ["J'ai mesuré : compte rendu en 20 minutes au lieu de 45, relecture comprise.", 1],
    ["J'utilise un assistant conversationnel faute de licence Copilot, sur des données anonymisées.", 1],
    ["J'intègre bien l'IA dans Word et Outlook ; Excel me demande encore de la pratique.", 0.5],
    ["Les devis et contrats restent sous mon contrôle strict, l'IA ne les produit pas seule.", 1],
    ["Je résume les longs fils de mails avant d'y répondre.", 0.5],
    ["J'ai écrit la procédure dans notre classeur partagé pour les collègues.", 1],
    ["Je fais une RECHERCHEX pour retrouver un chantier dans le tableau, grâce à l'explication de l'outil.", 1],
  ],
  // Q9 — C4 automatisation et plan d'action
  [
    ["Mon automatisation : nouvelle demande du formulaire, ligne ajoutée au tableau, accusé de réception au demandeur, notification au commercial ; testée sur des demandes fictives.", 1],
    ["L'IA classe la demande par type de travaux ; elle n'envoie jamais de réponse commerciale sans relecture.", 1],
    ["Journal des exécutions, alerte en cas d'erreur et vérification chaque semaine par une personne désignée.", 1],
    ["Données limitées au nécessaire, information sur le formulaire, durée de conservation définie, registre mis à jour.", 1],
    ["Plan d'action : à 30 jours la bibliothèque de prompts, à 60 jours l'automatisation des demandes, à 90 jours le bilan du temps gagné.", 1],
    ["Mon indicateur : temps gagné par semaine, mesuré vérification comprise.", 1],
    ["J'ai conçu le scénario sur Make ; il reste à le valider avec la direction.", 0.5],
    ["Je sais construire une automatisation simple ; je dois encore apprendre à gérer les erreurs.", 0.5],
    ["Mon plan prévoit un point d'étape avec ma responsable à 60 jours.", 1],
    ["J'ai remplacé la recopie manuelle des demandes ; Julie gagnerait environ une heure par semaine selon le test.", 1],
    ["J'ai vérifié où l'outil d'automatisation stocke les données avant de l'utiliser.", 1],
    ["Les relances de devis seront automatisées, avec un texte relu et un contrôle avant chaque envoi.", 1],
  ],
  // Q10 — C5 usage responsable et conforme
  [
    ["RGPD : minimisation, information, sécurité ; je n'entre jamais de données de clients dans un outil non validé. Le règlement européen sur l'IA est entré en vigueur le 1er août 2024, l'obligation de maîtrise de l'IA s'applique depuis le 2 février 2025.", 1],
    ["Les obligations de transparence s'appliquent à partir du 2 août 2026 : le client doit savoir qu'il échange avec une IA.", 1],
    ["La proposition « omnibus numérique » de fin 2025 n'est qu'une proposition : je vérifie son état avant d'en parler.", 1],
    ["Un contenu entièrement généré peut ne pas être protégé par le droit d'auteur ; je retravaille et je n'imite pas un auteur identifiable.", 1],
    ["Notre charte d'usage compte dix règles : outils autorisés, données interdites, anonymisation, vérification, transparence, droits, biais, usage sobre, référent, mise à jour.", 1],
    ["Je consulte les recommandations de la CNIL sur l'IA pour les cas douteux.", 1],
    ["Le secret des affaires interdit de sortir les prix, marges et fichiers clients dans un outil grand public.", 1],
    ["Je connais les règles ; la partie droit d'auteur me demande encore des vérifications.", 0.5],
    ["Thermia Rénov est déployeur : l'obligation de former le personnel la concerne, d'où cette formation.", 1],
    ["Je pense à l'impact environnemental : je ne lance pas de requêtes inutiles.", 0.5],
    ["Je vérifie les biais d'une réponse avant de l'utiliser pour un recrutement ou une décision.", 1],
    ["Les modèles d'IA à usage général ont leurs obligations depuis le 2 août 2025 : elles concernent surtout les éditeurs.", 1],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [48, 51, 45, 10, 4, 58, 45, 36, 47, 42];

export function getIAP21AutoAnswers(
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
  // restent toutes différentes à la même question, et la note varie d'un stagiaire à l'autre
  // (8 stagiaires consécutifs : 8 notes différentes, jamais au-dessus de 6 / 10).
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
export function iap21NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6, soit 4 à 12/20). */
export function iap21BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((iap21NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `iap21BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function iap21ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = iap21BonnesQcmDebut(n, idx, nom, prenom);
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
 * QCM sur 10 (5 à 10), mise en situation sur 5 (2,5 à 5).
 */
const NOTES_QCM_SUR_10 = [8, 6, 9, 7, 10, 5];
const NOTES_EXERCICE_SUR_5 = [4, 3, 4.5, 3.5, 5, 2.5];
export function iap21NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie stagiaire), attentes, missions et contribution (partie entreprise).
// Le besoin principal, l'objectif et les attentes de l'employeur portent sur le même sujet.
// Métiers : commerciaux, assistants administratifs, conducteurs de travaux, chargés d'affaires et
// dirigeants de TPE/PME, surtout du bâtiment et de la rénovation énergétique.
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
    besoin: "Gagner du temps sur les réponses aux mails des clients et des fournisseurs sans perdre en qualité ni en exactitude.",
    objectif: "Je veux utiliser un assistant d'IA pour préparer mes réponses aux mails, en gardant la maîtrise du ton et des engagements.",
    projet: "Elle me permettra de libérer du temps pour le suivi des dossiers et l'accueil téléphonique des clients.",
    attentes: "L'entreprise attend des réponses aux mails plus rapides, homogènes et toujours relues avant envoi.",
    missions: "Accueil, traitement des mails clients et fournisseurs, suivi administratif des chantiers, planning.",
    contribution: "Elle doit réduire le délai de réponse aux clients, aujourd'hui de deux à trois jours.",
  },
  {
    besoin: "Rédiger plus vite des comptes rendus de chantier fiables à partir de notes prises sur le terrain.",
    objectif: "Mon objectif est de transformer mes notes vocales et écrites en comptes rendus clairs, sans y ajouter de faits inexacts.",
    projet: "Elle m'aidera à passer moins de soirées sur l'administratif et plus de temps sur les chantiers.",
    attentes: "Nous attendons des comptes rendus de chantier envoyés le jour même, structurés et exacts.",
    missions: "Conduite de travaux, réunions de chantier, coordination des équipes et des sous-traitants, réception des travaux.",
    contribution: "Elle doit améliorer l'information des clients et réduire les litiges liés aux réserves mal transmises.",
  },
  {
    besoin: "Préparer des propositions commerciales et des relances de devis plus convaincantes, sans promesse inventée.",
    objectif: "Je souhaite utiliser l'IA pour structurer mes propositions et mes relances, tout en vérifiant chaque chiffre et chaque engagement.",
    projet: "Elle me permettra de suivre davantage de prospects sans augmenter mon temps de travail administratif.",
    attentes: "L'entreprise attend des propositions et des relances plus régulières, loyales et sans engagement non validé.",
    missions: "Rendez-vous clients, chiffrage, propositions commerciales, relances, suivi des signatures.",
    contribution: "Elle doit augmenter le nombre de devis relancés à temps et donc le taux de transformation.",
  },
  {
    besoin: "Comprendre ce que l'IA peut apporter à l'entreprise et en fixer les règles d'usage pour toute l'équipe.",
    objectif: "Mon objectif est de décider où l'IA apporte un vrai gain dans l'entreprise et de rédiger une charte d'usage claire.",
    projet: "Elle m'aidera à piloter l'adoption de l'IA dans l'entreprise sans exposer nos données ni celles de nos clients.",
    attentes: "Nous attendons que {le_sal} définisse les outils autorisés, les données interdites et les règles de vérification.",
    missions: "Direction de l'entreprise, relation avec les clients importants, organisation, choix des outils et des investissements.",
    contribution: "Elle doit sécuriser les usages déjà présents dans l'équipe et les rendre utiles à l'activité.",
  },
  {
    besoin: "Exploiter le tableur avec l'aide de l'IA pour suivre les devis, les chantiers et le chiffre d'affaires.",
    objectif: "Je veux construire des tableaux de suivi fiables et comprendre les formules que l'IA me propose.",
    projet: "Elle me permettra de prendre en charge les tableaux de bord de l'activité commerciale.",
    attentes: "L'entreprise attend des tableaux de suivi des devis à jour et des chiffres vérifiés.",
    missions: "Saisie et suivi des devis, facturation, relances de paiement, tableaux de suivi de l'activité.",
    contribution: "Elle doit donner à la direction une vision fiable des devis en cours et du chiffre d'affaires signé.",
  },
  {
    besoin: "Automatiser des tâches répétitives simples comme l'enregistrement des demandes du site et les accusés de réception.",
    objectif: "Mon objectif est de mettre en place une première automatisation sans code, testée et surveillée.",
    projet: "Elle m'aidera à devenir {un} {ref} des outils numériques de l'entreprise.",
    attentes: "Nous attendons la suppression des ressaisies manuelles des demandes de devis, avec un contrôle humain conservé.",
    missions: "Traitement des demandes entrantes, mise à jour des tableaux, planification des rendez-vous commerciaux.",
    contribution: "Elle doit éviter les demandes oubliées et accélérer la prise de contact avec les prospects.",
  },
  {
    besoin: "Savoir quelles données de l'entreprise et des clients peuvent être utilisées dans un outil d'IA.",
    objectif: "Je souhaite utiliser l'IA dans le respect du RGPD et du secret des affaires, sans mettre l'entreprise en risque.",
    projet: "Elle me permettra de conseiller mes collègues sur les bons réflexes en matière de données.",
    attentes: "L'entreprise attend un usage de l'IA sans fuite de données personnelles ni d'informations confidentielles.",
    missions: "Gestion administrative et des ressources humaines, dossiers clients, relation avec le cabinet comptable.",
    contribution: "Elle doit limiter les risques juridiques et préserver la confiance des clients.",
  },
  {
    besoin: "Produire des contenus pour les réseaux sociaux et le site de l'entreprise de façon régulière et conforme.",
    objectif: "Mon objectif est de publier chaque semaine un contenu sur nos chantiers, rédigé avec l'IA et vérifié.",
    projet: "Elle m'aidera à prendre en charge la communication de l'entreprise en plus de mes missions commerciales.",
    attentes: "Nous attendons des publications régulières, exactes, respectueuses du droit à l'image et du droit d'auteur.",
    missions: "Prospection, rendez-vous, photos et présentation des chantiers terminés, animation de la page de l'entreprise.",
    contribution: "Elle doit rendre l'entreprise plus visible auprès des particuliers de son secteur.",
  },
  {
    besoin: "Résumer rapidement des documents longs (cahiers des charges, guides, textes réglementaires) et en vérifier l'exactitude.",
    objectif: "Je veux obtenir des synthèses fiables des documents que je reçois et savoir les contrôler.",
    projet: "Elle me permettra de répondre plus vite aux consultations des clients professionnels.",
    attentes: "L'entreprise attend des synthèses exactes des cahiers des charges avant chaque réponse à une consultation.",
    missions: "Réponse aux consultations, étude des cahiers des charges, chiffrage, suivi des affaires tertiaires.",
    contribution: "Elle doit réduire le temps de préparation des offres et éviter les oublis d'exigences.",
  },
  {
    besoin: "Faire une veille sourcée sur les évolutions réglementaires et techniques du secteur.",
    objectif: "Mon objectif est d'organiser une veille hebdomadaire avec un outil connecté au web, en vérifiant chaque source.",
    projet: "Elle m'aidera à informer l'équipe des changements qui concernent nos chantiers et nos clients.",
    attentes: "Nous attendons une note de veille courte et sourcée chaque mois, sans information non vérifiée.",
    missions: "Études techniques, chiffrage, appui aux commerciaux, suivi des évolutions réglementaires.",
    contribution: "Elle doit éviter que l'entreprise découvre trop tard une évolution qui la concerne.",
  },
  {
    besoin: "Prendre confiance avec les outils d'IA quand on n'en a jamais utilisé.",
    objectif: "Je souhaite apprendre à utiliser un outil d'IA pas à pas et savoir quand lui faire confiance.",
    projet: "Elle me permettra de ne pas rester à l'écart des nouveaux outils que l'équipe commence à utiliser.",
    attentes: "L'entreprise attend que {le_sal} utilise de façon autonome les outils mis à sa disposition.",
    missions: "Secrétariat, accueil, classement, saisie des bons de commande et des factures fournisseurs.",
    contribution: "Elle doit permettre à toute l'équipe administrative d'utiliser les mêmes outils et les mêmes règles.",
  },
  {
    besoin: "Utiliser Copilot dans Word, Excel, Outlook et Teams, que l'entreprise vient de déployer.",
    objectif: "Mon objectif est de tirer parti de Copilot dans mes outils quotidiens en gardant le contrôle sur chaque résultat.",
    projet: "Elle m'aidera à former mes collègues aux usages de Copilot dans l'entreprise.",
    attentes: "Nous attendons un usage effectif des licences Copilot et un gain de temps mesuré sur les tâches de bureau.",
    missions: "Coordination administrative, préparation des réunions, comptes rendus, suivi des dossiers partagés.",
    contribution: "Elle doit rentabiliser l'investissement dans les licences et harmoniser les pratiques.",
  },
  {
    besoin: "Mieux préparer les rendez-vous commerciaux et les réponses aux objections des clients avec l'aide de l'IA.",
    objectif: "Je veux utiliser l'IA pour préparer mes rendez-vous et mes argumentaires, en vérifiant tout ce que j'avance.",
    projet: "Elle me permettra de mener des rendez-vous plus structurés et plus loyaux envers les clients.",
    attentes: "L'entreprise attend des rendez-vous mieux préparés et des argumentaires sans affirmation invérifiable.",
    missions: "Prise de rendez-vous, découverte des besoins, présentation des solutions, suivi des clients.",
    contribution: "Elle doit améliorer la qualité des rendez-vous et l'image de sérieux de l'entreprise.",
  },
  {
    besoin: "Mesurer le temps réellement gagné grâce à l'IA et bâtir un plan d'action réaliste.",
    objectif: "Mon objectif est de choisir trois tâches où l'IA m'apporte un gain mesuré et de suivre ce gain dans la durée.",
    projet: "Elle m'aidera à proposer à la direction une organisation du travail plus efficace dans mon service.",
    attentes: "Nous attendons un plan d'action chiffré et un bilan du temps gagné trois mois après la formation.",
    missions: "Encadrement de l'équipe administrative, organisation, suivi des indicateurs, relation avec la direction.",
    contribution: "Elle doit libérer du temps pour des tâches à plus forte valeur pour les clients.",
  },
  {
    besoin: "Préparer des dossiers de réponse aux consultations des clients professionnels avec l'aide de l'IA.",
    objectif: "Je souhaite structurer plus vite mes mémoires techniques et mes offres, sans y laisser d'erreur ni de copie non vérifiée.",
    projet: "Elle me permettra de répondre à davantage de consultations et de développer les affaires tertiaires.",
    attentes: "L'entreprise attend {un} {collab} capable de produire des offres complètes, vérifiées et adaptées à chaque consultation.",
    missions: "Suivi des affaires, rédaction des offres et des mémoires techniques, relation avec les maîtres d'ouvrage.",
    contribution: "Elle doit augmenter le nombre d'offres déposées dans les délais.",
  },
  {
    besoin: "Utiliser l'IA de façon responsable : transparence envers les clients, droit d'auteur, biais et impact environnemental.",
    objectif: "Mon objectif est d'adopter des pratiques d'IA responsables et de savoir les expliquer aux clients et à l'équipe.",
    projet: "Elle m'aidera à porter la démarche d'usage responsable du numérique de l'entreprise.",
    attentes: "Nous attendons que {le_sal} contribue à la charte d'usage et veille à la transparence envers les clients.",
    missions: "Qualité, relation client, réclamations, suivi de la satisfaction et des avis clients.",
    contribution: "Elle doit protéger la réputation de l'entreprise et la confiance de ses clients.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilIAP21(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

export function getIAP21Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return accorder(profilIAP21(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production écrite du stagiaire (cas fil rouge ou document réel anonymisé)
// Indices : 0 diagnostic, 1 C1 fonctionnement et limites, 2 C1 outils et cas d'usage,
//           3 C2 structure de la requête, 4 C2 itération et bibliothèque, 5 C3 écrits professionnels,
//           6 C3 synthèse, visuels, données et vérification, 7 C4 intégration dans les outils,
//           8 C4 automatisation et plan d'action, 9 C5 usage responsable et charte ;
//           8 productions par banque.
// La k-ième production de chaque banque suit le même poste et la même entreprise : un stagiaire garde
// le même terrain d'un exercice à l'autre (entreprises et chiffres fictifs).
//   0 commercial, pompes à chaleur, Clermont-Ferrand · 1 assistant administratif, isolation, Tours
//   2 conducteur de travaux, rénovation globale, Rennes · 3 chargé d'affaires, génie climatique tertiaire, Lille
//   4 dirigeant, menuiserie et isolation, Metz · 5 responsable administratif et RH, négoce de matériaux, Annecy
//   6 chargé de communication, plomberie-chauffage, Bordeaux · 7 technicien de bureau d'études thermiques, Montpellier
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Diagnostic de départ
  [
    "Mon poste : commercial{e} dans une PME de pompes à chaleur de 18 salariés près de Clermont-Ferrand. Mes tâches : rendez-vous (12 h par semaine), devis (5 h), relances (2 h), mails (4 h). J'utilise ChatGPT sur mon compte personnel pour reformuler des mails ; une réussite sur une relance, une déception quand il a inventé une performance de machine. J'ai déjà collé un devis avec le nom du client : je sais maintenant que c'était une erreur, et l'entreprise n'a pas de règle. Forces : aisance à l'oral, curiosité, réactivité. Vigilance : données clients, vérification, temps de retouche. Mes priorités : requêtes structurées, vérification systématique, outil validé par l'entreprise.",
    "Je suis assistant{e} administrat{if} dans une entreprise d'isolation de Tours, 11 salariés. Mes tâches : mails clients (5 h par semaine), saisie des demandes du site (2 h), planning des poseurs (3 h), factures (3 h). Je n'avais jamais utilisé l'IA avant la formation ; une collègue utilise Copilot dans Outlook. Données : aucune saisie pour le moment. Forces : rigueur, organisation, connaissance des clients. Vigilance : prise en main, confiance excessive dans les réponses, confidentialité. Mes priorités : apprendre les bases, préparer mes mails plus vite, automatiser la saisie des demandes.",
    "Conduct{/rice} de travaux dans une entreprise de rénovation globale à Rennes. Mes tâches : réunions de chantier, coordination des sous-traitants, comptes rendus (3 h par semaine, souvent le soir), réception des travaux. J'ai essayé une fois de faire un compte rendu avec l'IA : elle a ajouté une réserve qui n'existait pas. Je dicte déjà mes notes sur mon téléphone. Forces : terrain, précision, sens de l'organisation. Vigilance : faits inventés, photos de clients, temps de relecture. Mes priorités : comptes rendus fiables à partir de mes notes, transcription, vérification.",
    "Chargé{e} d'affaires pour une entreprise de génie climatique de Lille qui travaille surtout pour des clients tertiaires. Mes tâches : étude des cahiers des charges (6 h par semaine), chiffrage, mémoires techniques, réunions. J'utilise Gemini avec mon compte personnel pour résumer des documents ; je ne vérifie pas toujours les synthèses. Données : j'ai déjà joint un cahier des charges confidentiel, ce que je ne referai pas. Forces : technique, rédaction, réseau. Vigilance : confidentialité des consultations, synthèses non vérifiées. Mes priorités : synthèses contrôlées, offres plus rapides, outils validés.",
    "Je suis dirigeant{e} d'une TPE de menuiserie et d'isolation à Metz, 6 salariés. Mes tâches : devis, rendez-vous, gestion, recrutement, comptabilité avec le cabinet. Je n'ai pas de règle sur l'IA, mais deux salariés l'utilisent déjà sur leur téléphone. Réussite : un courrier à un fournisseur ; déception : une réponse juridique fausse. Forces : vision de l'entreprise, connaissance des clients. Vigilance : données des clients, responsabilité de l'entreprise, temps disponible. Mes priorités : comprendre les outils, fixer une charte d'usage, choisir les tâches où l'IA apporte un gain.",
    "Responsable administrat{if} et des ressources humaines dans une entreprise de négoce de matériaux près d'Annecy, 25 salariés. Mes tâches : paie avec le cabinet, contrats, plannings, mails internes, tableaux de suivi (4 h par semaine). Copilot vient d'être déployé dans notre messagerie ; je l'utilise peu. Données : je manipule des données de salariés, très sensibles. Forces : rigueur, discrétion, maîtrise du tableur. Vigilance : RGPD, droits d'accès aux documents partagés. Mes priorités : usages sûrs de Copilot, règles sur les données, formules de tableur.",
    "Chargé{e} de communication et assistant{e} commercial{e} dans une entreprise de plomberie-chauffage de Bordeaux, 9 salariés. Mes tâches : posts sur les réseaux (3 h par semaine), mises à jour du site, relances de devis, accueil. J'utilise les fonctions IA de Canva et ChatGPT pour les textes des posts. Déception : un visuel qui ressemblait trop au style d'un illustrateur connu. Forces : créativité, aisance à l'écrit. Vigilance : droit à l'image, droit d'auteur, promesses dans les posts. Mes priorités : contenus réguliers et vérifiés, règles sur les visuels, transparence.",
    "Technicien{ne} dans un bureau d'études thermiques de Montpellier, 7 salariés. Mes tâches : notes de calcul, rapports d'étude (8 h par semaine), veille réglementaire, échanges avec les entreprises. J'utilise Perplexity pour la veille, sans toujours ouvrir les sources. Réussite : une synthèse de norme utile ; déception : une date d'entrée en vigueur fausse. Forces : technique, méthode. Vigilance : sources, dates, confidentialité des dossiers clients. Mes priorités : veille sourcée, rapports plus rapides, vérification des chiffres.",
  ],
  // 1 — C1 fonctionnement et limites
  [
    "Pour Karim : le modèle a été entraîné sur de très grands volumes de textes ; il découpe la requête en tokens et prédit la suite la plus probable dans la limite de sa fenêtre de contexte. Il a produit une hallucination : un montant et une référence plausibles mais inventés, parce que la donnée change souvent, qu'il ne cherchait pas sur le web et que sa date de connaissance est antérieure. Un moteur de recherche renvoie vers des pages ; une IA connectée au web les résume, sources à lire. Biais : réponses calées sur le droit d'un autre pays. Mes cinq règles : vérifier chiffres et dates à la source, ouvrir chaque lien, demander les incertitudes, croiser, faire relire.",
    "J'ai expliqué le cas de Karim à ma façon : l'outil ne cherche pas la vérité, il calcule la suite de mots la plus probable. Quand il manque d'information, il comble le vide : c'est l'hallucination. L'IA est le domaine général, l'apprentissage automatique la méthode, l'IA générative celle qui produit du texte. Biais possibles : stéréotypes sur les métiers, sources surreprésentées. Mes règles : ne rien recopier sans source officielle, ouvrir les liens, demander à l'outil ce dont il n'est pas sûr, faire relire par la responsable.",
    "Sur un chantier, je dirais que l'IA est un apprenti très rapide qui n'a jamais vu le chantier : elle prédit une réponse probable à partir de ce qu'elle a lu. D'où l'hallucination de Karim : un texte officiel inventé. La date de connaissance explique aussi qu'elle ignore les changements récents. Tokens : les morceaux de texte qu'elle traite ; la fenêtre de contexte limite ce qu'elle garde en mémoire. Biais : vocabulaire du bâtiment d'un autre pays. Règles : vérifier, ouvrir, croiser, relire, ne jamais transmettre un chiffre non vérifié au client.",
    "Les cahiers des charges que je traite sont longs : j'ai compris que la fenêtre de contexte peut faire oublier une partie du document. Pour Karim, la réponse fausse est une hallucination : prédiction plausible, sans accès à la source à jour. Une IA connectée au web aurait pu chercher, mais il aurait fallu lire la page officielle. Distinction faite entre moteur de recherche, assistant et apprentissage automatique. Biais : surreprésentation de sources anglophones. Mes règles : citer la page, vérifier la date, croiser, relire, garder la source.",
    "En tant que dirigeant{e}, je retiens que l'outil n'est pas une source : il produit un texte probable. L'hallucination de Karim aurait pu engager l'entreprise si le chiffre avait été donné au client. Date de connaissance, absence de recherche web et question sur une donnée mouvante expliquent l'erreur. Biais : réponses déséquilibrées selon les données d'entraînement. Règles pour l'équipe : aucun chiffre ni texte de loi sans source officielle, liens ouverts, incertitudes demandées, recoupement, relecture par un responsable.",
    "J'ai décrit le fonctionnement : entraînement sur des textes, tokens, probabilités, contexte. Le cas de Karim est une hallucination classique : une référence inventée mais crédible. Dans les ressources humaines, un biais peut aussi apparaître, par exemple des stéréotypes dans une offre d'emploi rédigée par l'IA. Mes règles : vérifier à la source, ouvrir chaque lien, demander les sources, comparer deux sources, relecture humaine avant toute diffusion.",
    "Pour expliquer à l'équipe : l'IA générative prédit une suite probable de mots ou de pixels ; elle peut donc produire une hallucination, comme la référence de Karim. Elle ignore parfois les faits récents à cause de sa date de connaissance. Un outil connecté au web cite des sources, qu'il faut ouvrir. Biais observé dans un visuel : des ouvriers du bâtiment représentés uniquement par des hommes. Mes règles : vérification, liens ouverts, recoupement, relecture, aucun chiffre non sourcé dans un post.",
    "Dans mon métier, la date de connaissance est un vrai piège : une IA m'a déjà donné une date d'entrée en vigueur dépassée. Pour Karim, c'est une hallucination : le modèle prédit des tokens probables et invente une référence quand il n'a pas la donnée. Je distingue IA connectée au web et assistant hors ligne. Biais : sources étrangères. Règles : texte officiel lu à la source, date vérifiée, liens ouverts, croisement, relecture par un collègue.",
  ],
  // 2 — C1 outils et cas d'usage
  [
    "Mon tableau des 8 besoins : mail mécontent avec un assistant conversationnel ou Copilot dans Outlook ; compte rendu Teams avec Copilot, participants prévenus ; veille avec Perplexity en lisant les sources ; visuel avec Canva ; tableau de devis avec Copilot dans Excel ; notes de Thomas par dictée puis mise en forme ; guide de 40 pages avec un assistant acceptant les documents longs ; demandes du site avec Power Automate. Pour chaque outil : gain, risque et données anonymisées. Le multimodal me permet de photographier un relevé au lieu de le ressaisir.",
    "J'ai associé chaque besoin à un type d'outil : assistant conversationnel pour les mails, moteur de réponse connecté au web pour la veille, outil de création visuelle pour le post, outil d'automatisation sans code pour les demandes du site. Gain attendu : premiers jets et ressaisies évitées. Risques : informations fausses, données exposées. Données : noms et coordonnées des clients retirés dans les outils grand public. Je vérifie les conditions d'utilisation et le paramètre de confidentialité de chaque outil.",
    "Pour le chantier, l'outil le plus utile est la dictée suivie d'une mise en forme par un assistant ; pour la réunion d'équipe, la transcription Teams avec information préalable. Pour la veille, Perplexity en lisant les sources officielles ; pour le guide, un assistant qui accepte les documents longs. Risque principal : des faits ajoutés. Données : pas de nom de client ni d'adresse. Le multimodal permet d'envoyer une photo de plan annoté.",
    "Pour mes affaires tertiaires : synthèse des cahiers des charges avec un assistant capable de traiter de longs documents, à condition que l'outil soit validé, car ces documents sont confidentiels ; veille avec un outil connecté au web ; tableau des offres avec Copilot dans Excel. Gains : lecture plus rapide, rien de plus sans vérification. J'ai aussi associé Canva au post et Make à l'automatisation. Données sensibles repérées pour chaque cas.",
    "J'ai comparé les outils pour l'entreprise : ChatGPT, Le Chat de Mistral AI, Claude ou Gemini pour la rédaction, Copilot si nous prenons des licences Microsoft 365, Perplexity pour la recherche sourcée, Canva pour les visuels, Zapier ou Make pour l'automatisation. Critères de choix : besoin, confidentialité, conditions d'utilisation, simplicité pour l'équipe. Je n'autorise aucun outil sans avoir lu ses conditions.",
    "Copilot étant déjà déployé chez nous, cet outil couvre les mails, les réunions Teams, les documents Word et les tableaux Excel ; je garde Perplexity pour la veille et Canva pour les visuels. Pour chaque besoin, j'ai noté le risque : données de salariés, droits d'accès aux fichiers partagés. Les notes vocales de chantier passent par la transcription. Le multimodal évite de ressaisir des bons de livraison photographiés.",
    "Pour la communication : Canva pour les visuels, un assistant conversationnel pour les textes, Perplexity pour vérifier une information. Pour les autres besoins : Copilot dans Outlook, transcription Teams, Power Automate pour les demandes du site. Risque principal pour moi : droits sur les images et données personnelles dans les photos. Je lis les conditions d'utilisation de chaque outil de création.",
    "Pour la veille réglementaire, un moteur de réponse connecté au web, à condition d'ouvrir chaque source ; pour les rapports, un assistant conversationnel sur des données anonymisées ; pour les calculs, le tableur avec l'aide de Copilot. J'ai complété le tableau des 8 besoins avec les gains, les risques et les données à retirer. Un outil multimodal m'aide à lire une photo de relevé de mesures.",
  ],
  // 3 — C2 structure de la requête
  [
    "La requête de Julie manquait de rôle, de contexte, de format et de contraintes. Ma version : « Tu es assistante d'une entreprise de rénovation énergétique. Contexte : chantier d'isolation des combles chez [client], retard de 10 jours dû à une livraison d'isolant, nouvelle date en cours de confirmation par le conducteur de travaux. Tâche : rédige la réponse au client. Format : 12 lignes au plus, avec objet. Contraintes : ton courtois et factuel, ne promets aucune date ni aucun geste commercial, propose un appel. » J'ai ajouté une phrase d'exemple et demandé de procéder par étapes. Résultat comparé : plus court, sans engagement inventé.",
    "J'ai réécrit la requête avec la structure rôle, contexte, tâche, format, contraintes, et un exemple de phrase d'excuse. La première réponse promettait une date ; la seconde propose seulement un appel. Grille de comparaison : exactitude, ton, longueur, engagements. Aucun nom ni adresse : [client], [date de livraison] entre crochets.",
    "J'ai adapté l'exercice à un compte rendu : rôle « conducteur de travaux », contexte précis du chantier, tâche, format en rubriques, contraintes « n'ajoute aucun fait absent de mes notes ». Pour la réponse à M. Garnier, même structure avec l'interdiction de promettre une date. Exemple fourni, étapes demandées. La requête structurée évite les inventions ; aucune donnée personnelle dans la requête.",
    "Dans mon métier, le contexte est essentiel : je précise le type de client, l'objet et les délais. Ma requête pour Julie : rôle, contexte du retard, tâche, mail de 12 lignes, contraintes de ton et d'engagement. J'ai ajouté un exemple et demandé un plan avant le texte. Comparaison sur la grille : la deuxième réponse est exacte et ne crée aucun engagement pour l'entreprise.",
    "J'ai analysé ce qui manquait : rôle, contexte, format et surtout l'interdiction de promettre. Ma requête structurée est devenue un modèle pour l'équipe ; les données du client sont remplacées par des crochets. J'ai comparé les deux réponses avec la grille : seule la seconde peut partir après relecture. Je demande toujours à l'outil de procéder par étapes.",
    "Ma requête : « Tu es assistante administrative. Contexte : retard de chantier de 10 jours lié à une livraison. Tâche : réponse au client. Format : 12 lignes. Contraintes : courtois, factuel, aucune date promise. » Exemple ajouté, étapes demandées. J'ai retiré du contexte toute information sur le client. Comparaison : réponse plus juste, moins de retouche.",
    "J'ai construit la requête avec un rôle, un contexte précis, une tâche, un format court et des contraintes de ton. J'ai ajouté un exemple de formulation chaleureuse mais sans promesse. Les deux réponses comparées : la première invente une date, la seconde respecte les consignes. Les données du client restent hors de la requête.",
    "Ma requête structurée précise le rôle, le contexte technique, la tâche, le format et les contraintes ; elle demande de procéder par étapes. Exemple fourni pour le ton. Comparaison avec la grille : exactitude, ton, longueur, engagements. Je n'inclus jamais les coordonnées ni les montants du client ; je les complète après coup.",
  ],
  // 4 — C2 itération et bibliothèque
  [
    "Trois itérations sur l'argumentaire de Karim : 1, cible « client particulier, maison des années 1970 » ; 2, format « 5 arguments de deux lignes » ; 3, autocritique « signale les affirmations à vérifier ». L'outil a signalé deux chiffres, que j'ai vérifiés à la source. Je lui ai d'abord fait poser ses questions. Bibliothèque : cinq fiches (réclamation, relance, compte rendu, post, synthèse) avec variables entre crochets et vérifications. Assistant personnalisé : rôle, ton, interdits, charte rédactionnelle, accès réservé à l'équipe. Mise à jour mensuelle par la responsable.",
    "Chaque itération corrige un défaut : trop long, trop technique, pas assez concret. L'autocritique fait apparaître les affirmations à contrôler. Mes cinq fiches de prompts sont prêtes, avec l'usage, la requête, les variables et les points de vérification. L'assistant personnalisé n'utilise que des documents non confidentiels. La bibliothèque sera rangée dans le dossier partagé, avec une date de révision.",
    "J'ai fait l'itération sur un compte rendu plutôt que sur l'argumentaire : précision des rubriques, longueur, puis autocritique sur les faits ajoutés. L'outil m'a posé trois questions avant de répondre. Fiches de bibliothèque : compte rendu de chantier, réponse à une réclamation, mail aux sous-traitants, relance, synthèse de notice. Assistant personnalisé : consignes de rédaction et modèle de compte rendu. Mise à jour par le conducteur de travaux principal.",
    "Itération appliquée aux synthèses de cahiers des charges : première réponse trop générale, puis demande des exigences chiffrées, puis autocritique. J'ai obtenu une liste d'exigences que j'ai contrôlée dans le document. Mes fiches : synthèse de consultation, lettre de candidature, réponse aux questions, compte rendu, relance. Assistant personnalisé : présentation de l'entreprise et références publiques seulement.",
    "J'ai demandé à l'outil de me poser ses questions avant de répondre : la réponse est bien meilleure. Trois itérations ciblées et une autocritique. La bibliothèque de prompts de l'entreprise commence avec cinq fiches validées ; un salarié référent la tient à jour chaque mois avec les retours. Assistant personnalisé limité aux documents publics de l'entreprise.",
    "Itérations : simplification, format en liste, autocritique. J'ai vérifié les deux affirmations signalées. Mes fiches de bibliothèque concernent aussi les ressources humaines : annonce d'emploi relue contre les biais, mail interne, compte rendu. Assistant personnalisé dans Copilot, sans aucune donnée de salarié. Mise à jour trimestrielle.",
    "Pour les posts, l'itération est indispensable : ton, longueur, appel à l'action, puis autocritique sur les promesses. Fiches : post chantier, réponse à un avis, relance, article de blog, légende de photo. Assistant personnalisé avec notre charte de communication. Je note dans chaque fiche ce qu'il faut vérifier avant publication.",
    "J'ai itéré sur une note technique : vocabulaire simplifié pour un client, format en cinq points, autocritique des valeurs citées. Deux valeurs à vérifier, contrôlées dans la note de calcul. Bibliothèque : synthèse de norme, rapport, mail technique, veille, réponse à une entreprise. Assistant personnalisé sans dossier client. Mise à jour par l'ingénieur responsable.",
  ],
  // 5 — C3 écrits professionnels
  [
    "Mes quatre écrits : la réponse à M. Garnier reconnaît la gêne, explique la livraison retardée et propose un appel, sans date promise ; la relance du devis rappelle l'objet et propose un échange, sans pression ; le compte rendu reprend les notes de Thomas (combles terminés, trappe à reprendre, livraison de laine mardi, 2 h prévues) sans rien ajouter ; le post présente le chantier sans donnée personnelle. Requêtes et corrections tracées : à la relecture, j'ai supprimé une date inventée et un « nous garantissons ». Vérifications : faits, ton, engagements, coordonnées, accord pour les photos, validation par la responsable.",
    "J'ai produit les quatre écrits avec un assistant, sur des données anonymisées. À la relecture : suppression d'une remise que l'outil proposait spontanément, ton du courrier de relance adouci, compte rendu raccourci. Le post ne montre pas la maison du client. Ma check-list avant envoi : faits conformes au dossier, aucune promesse, mentions et coordonnées exactes, orthographe, validation.",
    "Le compte rendu de chantier est l'écrit le plus utile pour moi : l'outil a voulu ajouter « travaux conformes », que j'ai retiré car la trappe restait à reprendre. Réponse à M. Garnier : courtoise, sans date. Relance : factuelle. Post : photo sans personne reconnaissable. J'ai tracé mes corrections de relecture et je fais relire le compte rendu par le client lors de la visite suivante.",
    "J'ai adapté les écrits à mes clients professionnels : réponse à un gestionnaire d'immeuble, relance d'une offre, compte rendu de réunion, post sur une réalisation tertiaire. Relecture : suppression d'une référence de norme inventée, vérification des délais contractuels. Aucune promesse de performance non étudiée. Validation par le responsable d'affaires avant envoi.",
    "J'ai rédigé les quatre écrits et je les ai comparés à mes anciens courriers : plus clairs, plus courts. La relecture a supprimé deux engagements que l'entreprise n'avait pas pris. Pour le post, j'ai demandé l'accord écrit du client pour la photo. Règle pour l'équipe : aucun écrit client ne part sans relecture humaine.",
    "Écrits produits avec Copilot dans Outlook et Word : réponse à la réclamation, relance, compte rendu, post. Corrections de relecture : ton trop familier, date ajoutée sans fondement, signature incomplète. Vérifications listées dans ma check-list. Je n'ai saisi aucune donnée de client réelle.",
    "Pour le post, l'outil proposait « économies garanties » : supprimé, c'est une promesse invérifiable. La réponse à M. Garnier et la relance sont sobres et polies. Le compte rendu respecte les notes. Corrections de relecture tracées pour chaque écrit. Vérification de la photo : client non reconnaissable, accord obtenu.",
    "J'ai traité les écrits avec rigueur : réponse au client sans date, relance sans pression, compte rendu fidèle, post sans chiffre non sourcé. À la relecture, j'ai corrigé une valeur technique arrondie à tort. Vérifications : faits, chiffres, ton, mentions, relecture par un collègue.",
  ],
  // 6 — C3 synthèse, visuels, données et vérification
  [
    "Synthèse du guide en 10 lignes, vérifiée phrase par phrase : un contresens corrigé et un chiffre recopié depuis le document plutôt que depuis la réponse. FAQ de 8 questions : trois réponses (prix, délais, aides) signalées pour validation. Visuel Canva : pas de logo, pas de personne réelle, mention du recours à l'IA car l'image ressemble à une photo. Tableau des 60 devis : taux de transformation par commercial avec NB.SI.ENS, deux résultats recalculés à la main, concordants. Ma méthode de vérification : source, recalcul, liens ouverts, deuxième relecture.",
    "J'ai vérifié la synthèse contre le guide et retiré une phrase que l'outil avait ajoutée. FAQ produite, questions sensibles soumises à la direction. Le visuel respecte les conditions d'utilisation de l'outil. Pour les 60 devis : taux = devis signés / devis émis ; la formule m'a été expliquée et j'ai recalculé deux lignes. Méthode retenue : toujours revenir à la source.",
    "Synthèse vérifiée, FAQ validée pour les sujets de délais. Pour le visuel, j'ai préféré une vraie photo de chantier, avec accord. Sur le tableau des devis, l'outil s'était trompé de colonne : la vérification par recalcul l'a montré, et j'ai corrigé. Ma méthode : contrôle par échantillon et conservation de la source.",
    "Je vérifie les synthèses en retrouvant chaque exigence dans le document ; ici, deux exigences manquaient. FAQ : réponses techniques validées par l'ingénieur. Analyse des devis par type de travaux avec un tableau croisé dynamique, chiffres recalculés. Visuel sans logo de marque. Ma méthode de vérification est intégrée à notre procédure d'offre.",
    "J'ai fait vérifier la synthèse par un salarié pendant que je recalculais les taux de transformation : un écart, dû à des devis annulés comptés comme émis, corrigé. FAQ : validation de toutes les réponses sur les prix. Visuel : mention de l'IA. Méthode pour l'entreprise : source, recalcul, relecture croisée.",
    "Synthèse vérifiée contre la source et FAQ validée. Pour les données, l'outil m'a proposé NB.SI.ENS et SOMME.SI.ENS ; je les ai testées sur dix lignes avant de les appliquer. Visuel : conditions d'utilisation lues. Ma méthode : vérification des chiffres par échantillon et conservation des fichiers sources.",
    "Le visuel était ma partie : image générée sans imiter un illustrateur, sans personne réelle, mention de l'IA. Synthèse vérifiée phrase par phrase. FAQ : questions sensibles validées. Tableau des devis : taux calculé et deux recalculs manuels. Ma méthode : vérification à la source avant toute publication.",
    "Synthèse du guide vérifiée avec la source : une date était fausse dans la réponse de l'outil, corrigée. FAQ claire, validée. Analyse des données avec formule expliquée et recalcul. Visuel simple sans élément protégé. Ma méthode : croiser, recalculer, citer la source.",
  ],
  // 7 — C4 intégration dans les outils
  [
    "Matrice de mes 10 tâches : trois priorités, réponses aux mails, préparation des rendez-vous, relances de devis ; les devis restent sous contrôle strict. Nouvelles façons de faire : Copilot dans Outlook pour résumer un fil de mails et proposer une réponse que je relis ; un assistant pour préparer le rendez-vous à partir de données anonymisées ; relances préparées puis validées. Formule : SOMME.SI.ENS pour le chiffre d'affaires signé par mois, comprise et testée. Temps mesuré : réponse à un mail complexe en 8 minutes au lieu de 20, relecture comprise.",
    "Ma matrice fréquence / gain / risque fait ressortir les mails, la saisie des demandes et les comptes rendus. Faute de licence Copilot, j'utilise un assistant conversationnel sur des données anonymisées, avec un point de contrôle avant chaque envoi. Formule de tableur : NB.SI.ENS pour compter les demandes par type de travaux. Temps mesuré sur un mail : 12 minutes au lieu de 25.",
    "Mes trois tâches : comptes rendus, mails aux sous-traitants, préparation des réunions. Nouvelle façon de faire : dictée sur le chantier, mise en forme dans Word avec Copilot, relecture, envoi. Copilot dans Teams pour le récapitulatif des réunions transcrites, participants informés. Formule : RECHERCHEX pour retrouver un lot dans le planning. Temps mesuré : compte rendu en 20 minutes au lieu de 45.",
    "Matrice : synthèse des cahiers des charges, préparation des offres, comptes rendus de réunion en priorité. Copilot dans Word pour une première trame de mémoire technique, contrôlée exigence par exigence ; Copilot dans Teams pour les réunions. Copilot accède aux documents auxquels j'ai accès : j'ai fait revoir les droits du dossier des consultations. Formule : tableau croisé dynamique des offres. Gain mesuré : deux heures par offre.",
    "Pour mon équipe : la matrice montre que les mails et les devis prennent le plus de temps ; je garde les devis sous mon contrôle et j'utilise Copilot dans Outlook pour les mails. Point de contrôle humain à chaque étape. Formule : SOMME.SI.ENS pour le chiffre d'affaires par type de travaux. Temps mesuré sur une semaine : trois heures gagnées, relecture comprise.",
    "Copilot étant déployé, j'ai intégré trois usages : résumé des fils de mails dans Outlook, première version des notes internes dans Word, analyse des plannings dans Excel. J'ai vérifié les droits de partage des dossiers de paie, que Copilot ne doit pas exposer. Formule NB.SI.ENS pour les absences par service, comprise. Gain mesuré : 40 minutes par jour.",
    "Mes trois tâches : textes des posts, relances, réponses aux avis. Nouvelle façon de faire : premier jet dans un assistant, relecture, validation par la direction. Copilot dans Outlook pour les relances. Formule : tableau des publications avec le nombre de contacts reçus par mois. Temps mesuré : un post en 15 minutes au lieu de 40.",
    "Matrice : rapports d'étude, veille, mails techniques. Copilot dans Word pour la structure du rapport, à partir de mes résultats ; jamais pour les valeurs calculées. Formule de tableur vérifiée sur des cas connus. Copilot dans Teams pour les réunions avec les entreprises, participants informés. Gain mesuré : une heure par rapport.",
  ],
  // 8 — C4 automatisation et plan d'action
  [
    "Automatisation des demandes du site avec Power Automate : déclencheur « nouvelle réponse au formulaire », actions « ligne ajoutée au tableau », « accusé de réception au demandeur », « notification au commercial du secteur ». L'IA classe la demande par type de travaux ; elle n'envoie aucune réponse commerciale. Test sur dix demandes fictives, journal des exécutions, contrôle chaque lundi. Données limitées au nécessaire, information sur le formulaire, durée de conservation fixée. Plan d'action : 30 jours bibliothèque de prompts, 60 jours automatisation en production, 90 jours bilan ; indicateur : temps gagné par semaine.",
    "Mon scénario d'automatisation dans Make supprime la recopie des demandes : formulaire, tableau, accusé de réception, alerte au commercial. Point de contrôle humain : vérification quotidienne des nouvelles lignes. Précautions sur les données : minimisation, accès limité, registre des traitements mis à jour. Plan d'action à 30, 60 et 90 jours ; indicateur : une heure gagnée par semaine attendue.",
    "J'ai conçu une automatisation pour mes comptes rendus : dépôt du compte rendu validé dans le dossier du chantier, envoi automatique au client et aux sous-traitants concernés, après ma validation. L'IA ne fait que la mise en forme. Test sur un chantier fictif. Données : pas de photo de personne. Plan d'action : 30 jours dictée et modèle, 60 jours automatisation, 90 jours bilan du temps gagné.",
    "Automatisation avec Zapier : chaque nouvelle consultation reçue par mail crée une fiche dans le tableau des affaires et une alerte au responsable. L'IA résume l'objet de la consultation, résumé vérifié par moi. Test et journal des exécutions. Données : documents confidentiels non transmis à l'outil d'IA. Plan d'action avec indicateur : délai entre réception et décision de répondre.",
    "Pour l'entreprise, j'ai choisi l'automatisation la plus simple : accusé de réception des demandes et alerte au commercial. Responsable désigné, vérification hebdomadaire. Précautions sur les données des prospects et choix d'un outil dont j'ai vérifié la localisation des données. Plan d'action : charte à 30 jours, automatisation à 60 jours, bilan à 90 jours.",
    "Automatisation des demandes d'absence avec Power Automate : formulaire, validation du responsable, mise à jour du planning. Aucune décision prise par l'IA. Test, journal, contrôle mensuel. Données de salariés limitées et accès restreint. Plan d'action à 30, 60 et 90 jours ; indicateur : temps de traitement d'une demande.",
    "Mon automatisation : chaque nouvel avis client publié déclenche une alerte, et l'IA propose une réponse que je relis avant publication. Rien n'est publié automatiquement. Test sur des avis fictifs. Données : aucun nom de client recopié. Plan d'action : 30 jours modèles de réponse, 60 jours automatisation, 90 jours bilan du temps gagné.",
    "J'ai automatisé la veille : les nouvelles publications des sites officiels suivis arrivent dans un tableau, et l'IA en propose un résumé que je contrôle à la source. Test sur un mois, journal, responsable désigné. Données : aucune donnée personnelle. Plan d'action avec un indicateur de temps gagné sur la veille.",
  ],
  // 9 — C5 usage responsable et charte
  [
    "Classement : devis nominatif dans un outil grand public, interdit ; résumé d'un guide public, autorisé avec vérification ; photo où l'on reconnaît le client, sous condition d'accord écrit ; transcription sans prévenir, interdit ; visuel « dans le style » d'un illustrateur, à proscrire ; témoignage inventé, interdit ; compte professionnel validé, autorisé avec relecture ; agent conversationnel non signalé, interdit. RGPD : minimisation, information, sécurité ; secret des affaires sur les prix et le fichier clients. Règlement (UE) 2024/1689 : entré en vigueur le 1er août 2024, maîtrise de l'IA depuis le 2 février 2025, transparence à partir du 2 août 2026 ; omnibus numérique : simple proposition. Charte en 10 règles rédigée.",
    "Ma charte d'usage pour Thermia Rénov : outils autorisés, données interdites, anonymisation, relecture humaine, transparence envers les clients, aucune promesse ni témoignage inventés, droits sur les images, vigilance sur les biais, usage sobre, référent. Le RGPD impose minimisation et information ; les recommandations de la CNIL servent de repère. Calendrier du règlement européen présenté avec les dates exactes et la proposition omnibus à vérifier.",
    "J'ai classé les huit situations avec justification ; la transcription sans prévenir et la photo du client sans accord me concernent directement sur les chantiers. RGPD et droit à l'image appliqués aux comptes rendus. Règlement européen : l'entreprise est déployeur, l'obligation de maîtrise de l'IA s'applique depuis février 2025. Droit d'auteur : un contenu entièrement généré peut ne pas être protégé. Ma charte reprend dix règles concrètes.",
    "Pour mes consultations, le secret des affaires est central : aucun cahier des charges confidentiel dans un outil non validé. Classement des situations fait. RGPD : base légale, minimisation, sous-traitants et transferts hors Union européenne vérifiés. Règlement (UE) 2024/1689 et ses étapes de 2024 à 2026 ; omnibus numérique présenté comme une proposition. Charte en 10 règles.",
    "En tant que dirigeant{e}, j'adopte la charte en 10 règles et je désigne un référent. Classement des situations : trois interdits majeurs, données nominatives, témoignages inventés, agent non signalé. Obligations du règlement européen : former le personnel (maîtrise de l'IA depuis le 2 février 2025), transparence à partir du 2 août 2026. RGPD et CNIL rappelés. Impact environnemental : usage sobre.",
    "Classement réalisé ; j'ajoute une situation propre aux ressources humaines : aucun tri de candidatures par l'IA sans contrôle humain, à cause des biais. RGPD : données de salariés jamais saisies dans un outil non validé. Règlement européen : calendrier exact et proposition omnibus à vérifier. Charte en 10 règles avec un volet sur les droits d'accès dans Copilot.",
    "Pour la communication : témoignage inventé interdit, visuel imitant un illustrateur à proscrire, mention de l'IA lorsqu'une image peut passer pour une photo. Droit d'auteur : protection réservée à une création originale humaine. RGPD et droit à l'image pour les photos. Transparence prévue par le règlement européen à partir du 2 août 2026. Charte en 10 règles, dont la sobriété des usages.",
    "Classement des huit situations justifié. RGPD : minimisation et sécurité ; recommandations de la CNIL et de l'ANSSI consultées. Règlement (UE) 2024/1689 : 1er août 2024, 2 février 2025, 2 août 2025, 2 août 2026 ; proposition omnibus numérique à vérifier. Droit d'auteur et biais traités. Charte en 10 règles, avec l'impact environnemental et la mise à jour annuelle.",
  ],
];

const BILANS_PERSONNELS = [
  "Ce travail m'a surtout appris à vérifier chaque information avant de l'utiliser.",
  "Le plus difficile a été de tenir dans le temps de l'atelier ; je reprendrai la fiche au bureau.",
  "J'ai montré le résultat à ma responsable, qui m'a fait deux remarques que j'ai intégrées.",
  "Cette partie servira directement pour l'évaluation finale du jour 3.",
  "J'ai comparé ma production avec celle d'un autre stagiaire en binôme, ce qui m'a fait corriger un oubli.",
  "La correction du formateur m'a permis de repérer une erreur de méthode que je ne referai plus.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de le refaire seul{e}.",
  "Je me suis appuyé{e} sur les modèles fournis, que je réutiliserai à mon poste.",
  "Je n'ai pas eu le temps de finaliser la mise en forme, mais le fond est complet.",
  "J'ai posé une question au formateur pendant l'atelier, ce qui m'a évité de partir dans la mauvaise direction.",
  "Je vais appliquer cette méthode dès mon retour en poste.",
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
  const c = t.match(/\bC([1-5])\b/);
  if (/diagnostic de d[ée]part/i.test(t)) return 0;
  if (c) {
    const k = parseInt(c[1], 10);
    if (k === 1) return /outil|cas d'usage|panorama/i.test(t) ? 2 : 1;
    if (k === 2) return /it[ée]ration|biblioth[èe]que|assistant personnalis/i.test(t) ? 4 : 3;
    if (k === 3) return /synth[èe]se|visuel|donn[ée]es|v[ée]rif/i.test(t) ? 6 : 5;
    if (k === 4) return /automatis|plan d'action/i.test(t) ? 8 : 7;
    return 9;
  }
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickIAP21ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isIAP21Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques : un stagiaire garde le même terrain d'un exercice à l'autre, et sur un groupe de
  // 8 stagiaires les 8 productions d'un même exercice sont toutes différentes. Le bilan personnel
  // change d'un exercice à l'autre. L'entreprise du stagiaire est citée quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bloc + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai rattaché l'exercice à la situation de ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "BTS Négociation et digitalisation de la relation client",
  "BTS Support à l'action managériale ; assistant{e} de direction dans le bâtiment depuis 2018",
  "CAP Monteur en installations thermiques, puis technicien{ne} chauffagiste pendant dix ans",
  "Baccalauréat STMG, puis six ans d'accueil et de secrétariat en entreprise de travaux",
  "BTS Bâtiment ; conduct{/rice} de travaux en rénovation depuis 2016",
  "Licence professionnelle Métiers de l'énergétique, de l'environnement et du génie climatique",
  "BTS Gestion de la PME",
  "DUT Génie thermique et énergie",
  "Baccalauréat professionnel Assistance à la gestion des organisations et de leurs activités",
  "BTS Technico-commercial, option énergie et environnement",
  "CAP Menuisier installateur, puis création de mon entreprise de menuiserie",
  "Baccalauréat général, puis plusieurs années de téléconseil en centre d'appels",
  "DUT Génie civil, chargé{e} d'affaires en génie climatique",
  "Licence d'économie-gestion, puis responsable administrat{if} dans une PME",
  "Baccalauréat professionnel Commerce",
  "BTS Comptabilité et gestion",
  "BTS Communication ; chargé{e} de communication dans une entreprise artisanale",
  "Master en management des PME",
  "Diplôme d'ingénieur en génie énergétique",
  "BTS Fluides, énergies, domotique",
  "Aucun diplôme dans le domaine : vingt ans d'expérience comme plombier-chauffagiste, puis dirigeant{e}",
  "Baccalauréat professionnel Technicien d'études du bâtiment",
  "Diplôme d'études supérieures obtenu à l'étranger, en cours de reconnaissance",
  "BTS Professions immobilières, reconversion dans la rénovation",
  "DUT Gestion des entreprises et des administrations",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant les trois journées.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières loin de l'écran me conviennent.",
  "Non. Je porte des lunettes et j'apprécie une taille d'affichage suffisamment grande sur le poste.",
  "Non, pas de handicap. Je précise que je suis peu à l'aise avec l'informatique ; un binôme me rassurerait les premières heures.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je souhaite seulement disposer des fiches en version numérique pour les relire.",
  "Non, aucune situation de handicap. J'ai besoin d'un peu de temps sur le tableur, je m'y préparerai.",
  "Non. Je préfère avoir les supports en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté lors de l'entretien préalable.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible les trois jours de formation, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, en salle de formation.",
  "Mon employeur a libéré les trois journées dans mon planning (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) ; mes rendez-vous sont reportés.",
  "Je suis disponible les trois jours de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. J'apporterai deux documents de travail anonymisés pour les exercices.",
  "Je peux suivre l'intégralité des trois journées en présentiel, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible les trois jours (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). Un collègue assure le suivi de mes chantiers pendant la formation.",
  "Disponibilité complète sur les trois journées (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je viendrai en covoiturage avec un collègue inscrit à la même session.",
  "Les trois jours de formation, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; l'équipe gère les urgences pendant mon absence.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> les trois jours. Je dois seulement partir à 16h45 le mardi, ce que j'ai signalé au formateur.",
  "Je suivrai les trois journées en salle (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je prévois de retravailler mes requêtes le soir.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> des trois jours. J'ai prévenu mes clients et mes fournisseurs de mon absence.",
];

/** Réponses d'évaluation des besoins propres à la formation « Intelligence artificielle – 21 h », différentes pour chaque stagiaire. */
export function getIAP21EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = iap21Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilIAP21(idx, s.nom, s.prenom);
  const pick = (arr: string[], sel: number) => accorder(arr[rang(base, sel, arr.length)], fem);
  const ent = (txt: string) =>
    accorder(
      txt
        .replace(/\{un\}/g, fem ? "une" : "un")
        .replace(/\{collab\}/g, fem ? "collaboratrice" : "collaborateur")
        .replace(/\{ref\}/g, fem ? "référente" : "référent")
        .replace(/\{le_sal\}/g, fem ? "la salariée" : "le salarié"),
      fem,
    );
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
      ? "Formation financée par l'employeur au titre du plan de développement des compétences, avec une prise en charge possible par son OPCO selon ses critères."
      : "Formation à l'initiative de l'employeur, au titre du plan de développement des compétences.",
    projetPro: ent(profil.projet),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
