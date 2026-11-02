// ---------------------------------------------------------------------------
// « Préparation à la Certification en langue française Le Robert (RS7013) » — moteur de réponses
// HUMANISÉES. Formation certifiante (Répertoire spécifique RS7013) de 21 h, 100 % à distance.
// Public : salariés, demandeurs d'emploi, agents publics, indépendants qui écrivent dans leur travail.
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes…),
//     puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes : diagnostic puis C1 et C2, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par exercice + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Les entreprises, les personnes et les chiffres cités dans les copies sont fictifs.
// ---------------------------------------------------------------------------

const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Préparation à la Certification en langue française Le Robert ».
 * Code RS7013, ou intitulé normalisé (minuscules, sans accents) contenant « le robert » ou « rs7013 ».
 * Les formations de français langue étrangère ou à visée professionnelle (RS6674, LILATE RS6916…)
 * ne sont pas concernées.
 */
export function isLRBFormation(intitule?: string, code?: string): boolean {
  const c = (code || "").replace(/\s+/g, "").toUpperCase();
  if (c === "RS7013") return true;
  const t = normalize(intitule).toLowerCase().replace(/[’‘`´]/g, "'").replace(/\s+/g, " ");
  if (/\brs ?7013\b/.test(t)) return true;
  return /\ble robert\b/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function lrbSeed(nom?: string, prenom?: string): number {
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
  typeof idx === "number" && idx >= 0 ? idx : lrbSeed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// diagnostic, C1 orthographe lexicale, C1 homophones grammaticaux, C1 accords, C1 participe passé,
// C1 modes et temps, C1 ponctuation et typographie, C2 vocabulaire, C2 construction des phrases,
// C2 registres et restitution d'un message oral
// ---------------------------------------------------------------------------
export const LRB_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Quels écrits et quelles situations orales votre poste comporte-t-il, et quelles difficultés rencontrez-vous en français ?", reponseAttendue: "Types d'écrits (courriels, comptes rendus, courriers, devis, rapports), destinataires et fréquence, situations orales (téléphone, réunions, accueil), difficultés reliées à des règles précises (accords, homophones, conjugaison, ponctuation, choix des mots)." },
    { question: "Comment vérifiez-vous l'orthographe d'un mot en cas de doute ?", reponseAttendue: "Dictionnaire de langue, famille du mot, listes d'exceptions (pluriels en -oux, -aux), mots invariables, homophones lexicaux (censé / sensé, davantage / d'avantage), graphies rectifiées de 1990 admises ; ne pas se fier au seul correcteur automatique." },
    { question: "Comment distinguez-vous « a » et « à », « et » et « est », « ces » et « ses » ?", reponseAttendue: "Tests de remplacement : « a » par « avait », « est » par « était », « ces » par « ces… -là », « ses » par « les siens » ; même méthode pour ou / où, ce / se, c'est / s'est, leur / leurs, peu / peut, sans / s'en, quelle / qu'elle." },
    { question: "Quelles règles appliquez-vous pour accorder les adjectifs, les nombres et le verbe avec son sujet ?", reponseAttendue: "Accord de l'adjectif avec le nom, adjectifs de couleur (noms employés comme adjectifs et couleurs composées invariables), cent et vingt, tout, même, demi ; accord du verbe avec le noyau du sujet, après « la plupart des », avec l'antécédent de « qui », avec « chacun »." },
    { question: "Comment accordez-vous le participe passé employé avec « être » et avec « avoir » ?", reponseAttendue: "Avec « être », accord avec le sujet ; avec « avoir », accord avec le COD placé avant le verbe ; verbes pronominaux selon la fonction de « se » ; participe suivi d'un infinitif ; invariabilité avec « en » et avec un complément de mesure." },
    { question: "Quand employez-vous le futur, le conditionnel et le subjonctif dans vos écrits professionnels ?", reponseAttendue: "Futur pour un engagement, conditionnel pour la politesse et l'hypothèse, pas de conditionnel après « si » de condition, subjonctif après « il faut que » et « bien que », indicatif après « après que », concordance des temps, impératif et futurs irréguliers." },
    { question: "Quelles règles de ponctuation et de présentation appliquez-vous dans un courriel professionnel ?", reponseAttendue: "Objet précis, formule d'appel, paragraphes courts, formule de politesse ; espace insécable avant les signes doubles, majuscules, abréviations (M., Mme, n°), nombres et symboles (1 250 €), heures (14 h 30), relecture avant envoi." },
    { question: "Comment choisissez-vous le mot juste ? Que savez-vous des paronymes, des pléonasmes et des anglicismes ?", reponseAttendue: "Paronymes (conjoncture / conjecture, imminent / éminent), pléonasmes (prévoir à l'avance), impropriétés (pallier à), anglicismes et équivalents français recommandés (courriel, remue-méninges), vérification dans le dictionnaire et dans FranceTerme." },
    { question: "Quelles constructions de phrases vous semblent difficiles (pronoms relatifs, négation, interrogation) ?", reponseAttendue: "Pronoms relatifs dont et lequel selon la construction du verbe, négation complète à l'écrit, interrogation directe (inversion, t euphonique) et indirecte, prépositions, découpage des phrases trop longues." },
    { question: "Comment adaptez-vous votre registre de langue à l'oral et à l'écrit selon votre interlocuteur ?", reponseAttendue: "Registres familier, courant et soutenu, choix selon le destinataire et le support, formules de politesse adaptées, reformulation au téléphone, prise de notes et restitution fidèle d'un message oral." },
  ],
  fin: [
    { question: "Présentez le diagnostic de vos écrits professionnels, votre score cible et vos priorités de révision.", reponseAttendue: "Erreurs les plus fréquentes identifiées et reliées aux règles, score cible justifié au regard des niveaux de la certification (450, 600, 750, 900 points), priorités et plan de révision daté." },
    { question: "Comment fiabilisez-vous l'orthographe lexicale et d'usage de vos écrits ?", reponseAttendue: "Dictionnaire, familles de mots, consonnes doubles, accents, mots invariables, pluriels particuliers, homophones lexicaux, graphies rectifiées de 1990 admises, liste personnelle de mots pièges." },
    { question: "Comment distinguez-vous les homophones grammaticaux ?", reponseAttendue: "Test de remplacement appliqué à chaque paire : a / à, et / est, ou / où, ce / se, ces / ses / c'est / s'est, leur / leurs, quelle / qu'elle, peu / peut, sans / s'en." },
    { question: "Quelles règles appliquez-vous pour les accords dans le groupe nominal et l'accord du verbe ?", reponseAttendue: "Adjectifs de couleur, nombres (cent, vingt, mille), tout, même, demi ; noyau du sujet, « la plupart des », antécédent de « qui », « chacun » ; graphies rectifiées admises pour les nombres." },
    { question: "Comment accordez-vous le participe passé, y compris avec les verbes pronominaux ?", reponseAttendue: "Être : accord avec le sujet ; avoir : accord avec le COD placé avant ; pronominaux selon la fonction de « se » ; essentiellement pronominaux accordés avec le sujet ; « fait » suivi d'un infinitif invariable ; « en » et compléments de mesure." },
    { question: "Comment choisissez-vous le mode et le temps des verbes dans vos écrits ?", reponseAttendue: "Si + imparfait ou plus-que-parfait, conditionnel dans la principale ; subjonctif après « il faut que » et « bien que » ; indicatif après « après que » ; concordance des temps ; impératif ; futurs irréguliers." },
    { question: "Quelles règles de ponctuation et de typographie appliquez-vous dans un courriel professionnel ?", reponseAttendue: "Espaces insécables, majuscules, abréviations, nombres et symboles, heures, traits d'union de l'inversion, « à la suite de », structure du courriel et formule de politesse adaptée." },
    { question: "Comment choisissez-vous le mot juste (paronymes, pléonasmes, anglicismes) ?", reponseAttendue: "Paronymes distingués par leur sens, pléonasmes supprimés, impropriétés corrigées, équivalents français recommandés, vérification dans le dictionnaire, FranceTerme et « Dire, ne pas dire »." },
    { question: "Comment construisez-vous des phrases correctes et claires ?", reponseAttendue: "Relatif choisi selon la construction du verbe (dont, lequel), négation complète, interrogation directe et indirecte correctes, prépositions exactes, phrases longues découpées." },
    { question: "Comment adaptez-vous votre registre et restituez-vous un message oral ?", reponseAttendue: "Registre choisi selon le destinataire et le support, transpositions du familier au soutenu, formules de politesse, prise de notes structurée (qui, quoi, quand, où, actions) et restitution fidèle." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle, 1 = juste.
// Une seule réponse à 1 dans deux questions seulement (C1 homophones, C2 vocabulaire) : au plus 6 / 10.
// Les formes fautives citées entre guillemets sont celles du stagiaire en début de formation.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — diagnostic des écrits du poste
  [
    ["J'écris surtout des courriels à des clients ; je fais des fautes, mais je ne sais pas lesquelles.", 0.5],
    ["Je n'écris presque pas dans mon travail, je ne vois pas bien mes difficultés.", 0],
    ["Je rédige des comptes rendus de réunion ; on me reproche des phrases trop longues.", 0.5],
    ["Je fais confiance au correcteur automatique, je ne relis pas.", 0],
    ["Je suis technicien{ne} ; j'écris des rapports d'intervention et j'hésite souvent sur les accords.", 0.5],
    ["Je réponds au téléphone toute la journée ; à l'écrit, je ne suis pas sûr{e} de moi.", 0.5],
    ["Je pense que je n'ai pas de difficulté particulière.", 0],
    ["Le français n'est pas ma langue maternelle ; je comprends bien, mais j'hésite sur la conjugaison.", 0.5],
    ["Je ne sais pas, je verrai pendant la formation.", 0],
    ["J'écris des devis et des relances ; mes collègues me demandent parfois de relire leurs textes.", 0.5],
    ["En recherche d'emploi, je veux surtout soigner mon CV et mes lettres de candidature.", 0.5],
    ["J'écris comme je parle, c'est plus simple.", 0],
  ],
  // Q2 — C1 orthographe lexicale et d'usage
  [
    ["Je vérifie dans un dictionnaire quand j'ai un doute.", 0.5],
    ["Je tape le mot dans un moteur de recherche et je prends le premier résultat.", 0],
    ["J'hésite toujours sur les consonnes doubles, comme dans « occurrence ».", 0.5],
    ["Je ne vérifie pas, je pense que l'orthographe n'est pas très importante.", 0],
    ["Je confonds « censé » et « sensé ».", 0.5],
    ["J'écris « parmis » avec un s, je crois que c'est juste.", 0],
    ["Je sais qu'il existe des rectifications de l'orthographe, mais je ne les connais pas.", 0.5],
    ["Je laisse le correcteur décider.", 0],
    ["Je me trompe souvent sur les accents, par exemple dans « événement ».", 0.5],
    ["Je ne sais pas comment vérifier un mot.", 0],
    ["Je cherche des mots de la même famille pour m'aider.", 0.5],
    ["J'évite les mots difficiles pour ne pas me tromper.", 0],
  ],
  // Q3 — C1 homophones grammaticaux
  [
    ["Je remplace « a » par « avait » et « est » par « était » pour vérifier ; pour « ces » et « ses », je me demande si l'on peut dire « les siens ».", 1],
    ["Je confonds souvent « a » et « à ».", 0],
    ["Je sais qu'on peut remplacer « a » par « avait », mais pour le reste je n'ai pas de méthode.", 0.5],
    ["Je mets « à » quand cela sonne bien.", 0],
    ["« Ces » et « ses », c'est la même chose pour moi.", 0],
    ["Je fais la différence entre « et » et « est », mais pas entre « c'est » et « s'est ».", 0.5],
    ["Je ne connais pas de méthode.", 0],
    ["Je pense que « leur » prend toujours un s au pluriel.", 0],
    ["Je sais que « où » avec un accent indique le lieu.", 0.5],
    ["J'écris « peut » partout, sauf dans « peu à peu ».", 0],
    ["Je vérifie « on » et « ont » en les remplaçant par « il » et « avaient ».", 0.5],
    ["Je ne vois pas la différence entre « quelle » et « qu'elle ».", 0],
  ],
  // Q4 — C1 accords dans le groupe nominal et accord du verbe
  [
    ["J'accorde l'adjectif avec le nom, mais je ne sais pas faire pour les couleurs.", 0.5],
    ["Je n'accorde pas les adjectifs, je les laisse au singulier.", 0],
    ["Je sais que le verbe s'accorde avec le sujet, mais quand le sujet est loin, je me trompe.", 0.5],
    ["Je mets toujours un s à « cent ».", 0],
    ["J'hésite sur « demi » : je ne sais jamais quand il s'accorde.", 0.5],
    ["Je ne sais pas ce qu'est un groupe nominal.", 0],
    ["Après « la plupart », je mets toujours le verbe au singulier.", 0],
    ["Je sais que « même » s'accorde parfois, sans savoir quand.", 0.5],
    ["Je ne fais pas attention aux accords quand j'écris vite.", 0],
    ["J'accorde bien en général, mais « tout » me pose problème.", 0.5],
    ["Je pense que les nombres ne s'accordent jamais.", 0],
    ["Je relis mes phrases en cherchant le sujet de chaque verbe.", 0.5],
  ],
  // Q5 — C1 participe passé
  [
    ["Avec « être », j'accorde avec le sujet ; avec « avoir », je ne sais plus.", 0.5],
    ["Je n'accorde jamais le participe passé.", 0],
    ["Je sais qu'avec « avoir » on regarde le COD, mais je ne sais pas le trouver.", 0.5],
    ["J'accorde toujours avec le sujet, quel que soit l'auxiliaire.", 0],
    ["Je remplace par « pris » ou « prendre » pour choisir entre « é » et « er ».", 0.5],
    ["Les verbes pronominaux, je n'y comprends rien.", 0],
    ["Je mets « é » partout, c'est plus simple.", 0],
    ["Je sais que « ils se sont rendu compte » s'écrit sans s, sans savoir pourquoi.", 0.5],
    ["Je ne connais pas la différence entre participe passé et infinitif.", 0],
    ["Avec « avoir », je sais qu'il n'y a souvent pas d'accord.", 0.5],
    ["Je n'ai jamais entendu parler de la règle du COD.", 0],
    ["Je choisis entre « é » et « ée » à l'oreille.", 0],
  ],
  // Q6 — C1 modes et temps
  [
    ["J'utilise le conditionnel pour être poli{e} : « je souhaiterais ».", 0.5],
    ["Je ne fais pas la différence entre « je serai » et « je serais ».", 0],
    ["Je sais qu'après « il faut que » on met le subjonctif, mais je me trompe sur les formes.", 0.5],
    ["J'écris « si j'aurais » quand je fais une hypothèse.", 0],
    ["Je n'utilise que le présent et le passé composé.", 0],
    ["Je remplace par « nous » pour choisir entre futur et conditionnel, mais je ne suis pas sûr{e} de moi.", 0.5],
    ["Le passé simple, je ne l'utilise jamais et je ne le connais pas.", 0],
    ["Je sais que le futur d'« envoyer » est « j'enverrai ».", 0.5],
    ["Je mets le subjonctif après « après que ».", 0],
    ["J'hésite sur l'impératif : « envoie » ou « envoies ».", 0.5],
    ["Je ne sais pas ce qu'est un mode.", 0],
    ["J'utilise le conditionnel dans mes demandes et le futur pour mes engagements.", 0.5],
  ],
  // Q7 — C1 ponctuation, typographie et courriel
  [
    ["Je mets un objet, une formule d'appel et une formule de politesse.", 0.5],
    ["Je ne mets presque pas de ponctuation dans mes courriels, ce n'est pas utile.", 0],
    ["Je sais qu'il y a une espace avant le point d'interrogation en français, sans connaître les autres règles.", 0.5],
    ["J'écris les jours et les mois avec une majuscule.", 0],
    ["J'utilise « Mr » pour Monsieur.", 0],
    ["Je relis mon courriel avant de l'envoyer.", 0.5],
    ["Je fais de longues phrases avec beaucoup de virgules.", 0],
    ["Je commence toujours par « Suite à », je pensais que c'était recommandé.", 0],
    ["Je sépare les milliers par un point, comme dans « 1.250 € ».", 0],
    ["Je sais qu'on écrit « n° » pour numéro.", 0.5],
    ["J'aère mes courriels avec des paragraphes courts.", 0.5],
    ["Je termine par « Cordialement », sans réfléchir au destinataire.", 0.5],
  ],
  // Q8 — C2 vocabulaire et précision lexicale
  [
    ["Les paronymes sont des mots qui se ressemblent sans avoir le même sens, comme « conjecture » et « conjoncture » ; un pléonasme répète une idée, comme « monter en haut » ; je remplace « e-mail » par « courriel ».", 1],
    ["Je ne connais pas ces mots.", 0],
    ["Je sais ce qu'est un pléonasme, mais j'en fais sans m'en rendre compte.", 0.5],
    ["J'utilise beaucoup de mots anglais, tout le monde les comprend.", 0],
    ["Je confonds « éminent » et « imminent ».", 0.5],
    ["Je dis « au jour d'aujourd'hui », je pensais que c'était plus fort.", 0],
    ["Je cherche un synonyme dans le dictionnaire quand je répète un mot.", 0.5],
    ["Pour moi, « pallier à » est correct.", 0],
    ["Je sais qu'il existe des équivalents français officiels, sans savoir où les trouver.", 0.5],
    ["Je ne fais pas attention au choix des mots.", 0],
    ["Je dis « deadline » et « meeting » au travail.", 0],
    ["Je relis pour remplacer les mots vagues comme « truc » ou « chose ».", 0.5],
  ],
  // Q9 — C2 construction des phrases
  [
    ["« Dont » me pose problème ; je le remplace souvent par « que ».", 0.5],
    ["Je ne vois pas de difficulté dans la construction des phrases.", 0],
    ["J'oublie le « ne » de la négation à l'écrit.", 0.5],
    ["J'écris « je me demande qu'est-ce qu'il veut ».", 0],
    ["Je fais des phrases très longues, avec plusieurs « qui » et « que ».", 0.5],
    ["Je ne sais pas ce qu'est une interrogation indirecte.", 0],
    ["Je dis « le projet que je travaille dessus ».", 0],
    ["Je sais que l'inversion du sujet est plus soutenue : « Avez-vous reçu… ».", 0.5],
    ["Je mets une apostrophe dans « a-t'il ».", 0],
    ["J'hésite sur les prépositions : « aller au fournisseur » ou « chez le fournisseur ».", 0.5],
    ["Je construis mes phrases à l'instinct, sans vérifier.", 0],
    ["Je découpe mes phrases quand elles deviennent trop longues.", 0.5],
  ],
  // Q10 — C2 registres et message oral
  [
    ["Je vouvoie les clients et je tutoie mes collègues.", 0.5],
    ["Je parle de la même façon à tout le monde.", 0],
    ["À l'oral, je me relâche et j'utilise des expressions familières.", 0.5],
    ["Je ne connais pas les registres de langue.", 0],
    ["Je sais qu'il existe des registres familier, courant et soutenu, sans savoir les utiliser.", 0.5],
    ["Je dis « ça marche » aux clients, je trouve cela sympathique.", 0],
    ["Au téléphone, je reformule la demande du client.", 0.5],
    ["J'écris « Salut » à mes clients habituels.", 0],
    ["Je prends des notes pendant les appels, mais j'ai du mal à les relire.", 0.5],
    ["Je ne vois pas pourquoi changer de façon de parler.", 0],
    ["Je choisis une formule de politesse plus formelle pour un courrier que pour un courriel.", 0.5],
    ["Je n'ose pas prendre la parole en réunion de peur de faire des fautes.", 0],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  // Q1 — diagnostic et score cible
  [
    ["Mon diagnostic : beaucoup d'erreurs sur les participes passés et les homophones ; je vise 600 points, le niveau qui atteste que je rédige de façon autonome ; mes priorités sont les accords, le subjonctif et la relecture.", 1],
    ["J'ai relevé mes erreurs les plus fréquentes dans mes courriels : « a » et « à », les participes passés, la ponctuation ; je vise 750 points.", 1],
    ["Mon score cible est d'au moins 450 points, car en dessous la certification n'est pas délivrée ; je travaillerai d'abord la conjugaison.", 1],
    ["Je connais maintenant mes erreurs ; il me reste à fixer un score cible réaliste.", 0.5],
    ["Trois forces : vocabulaire, aisance à l'oral, relecture. Trois points de vigilance : accords, typographie, phrases longues. Score visé : 600 points.", 1],
    ["Je vise 900 points, car je relis les documents de toute mon équipe ; mes priorités sont les cas difficiles du participe passé et la typographie.", 1],
    ["Mon diagnostic montre que je maîtrise l'orthographe d'usage, mais pas la concordance des temps ; je vise 750 points.", 1],
    ["J'ai un plan de révision de trois semaines avant la certification, avec un exercice par jour.", 1],
    ["Je dois encore comparer mes résultats à l'examen blanc pour choisir mon score cible.", 0.5],
    ["Mon objectif est d'atteindre au moins 600 points pour valoriser mes candidatures.", 1],
    ["Je vise d'abord le niveau de 450 à 599 points ; je viserai plus haut ensuite.", 0.5],
    ["Mes priorités : homophones, accord du verbe avec son sujet, formules de politesse ; score visé : 600 points.", 1],
  ],
  // Q2 — orthographe lexicale et d'usage
  [
    ["Je vérifie dans un dictionnaire, je rattache le mot à sa famille et je sais que les graphies rectifiées comme « évènement » sont admises.", 1],
    ["Je retiens les consonnes doubles par familles : « rémunérer », « rémunération ».", 1],
    ["Je distingue les homophones lexicaux : « censé » signifie supposé, « sensé » signifie raisonnable.", 1],
    ["Je sais écrire « des travaux », « des bijoux », « des pneus ».", 1],
    ["« Parmi » ne prend jamais de s ; « quelquefois » s'écrit en un mot quand il signifie parfois.", 1],
    ["Je relis lentement, mot à mot, en cas de doute.", 0.5],
    ["Je vérifie les accents avec le dictionnaire et je ne me fie plus seulement au correcteur.", 1],
    ["« D'ores et déjà » et « au fur et à mesure » ne me posent plus de difficulté.", 1],
    ["Je fais attention à « davantage », qui signifie plus, et à « d'avantage », qui signifie de bénéfice.", 1],
    ["Je connais mieux les mots invariables, mais je dois encore les réviser.", 0.5],
    ["J'ai une liste de mes mots pièges que je relis avant d'envoyer un document.", 1],
    ["Je sais que « dilemme » s'écrit avec deux m et « occurrence » avec deux c et deux r.", 1],
  ],
  // Q3 — homophones grammaticaux
  [
    ["Je remplace « a » par « avait », « est » par « était », « on » par « il » ; ces tests me suffisent dans la plupart des cas.", 1],
    ["« Ces » se remplace par « ces… -là », « ses » par « les siens » ; « c'est » par « cela est », « s'est » par « je me suis ».", 1],
    ["« Leur » devant un verbe est un pronom invariable ; « leurs » devant un nom pluriel prend un s.", 1],
    ["« Quelle que » s'accorde avec le sujet du verbe « être » ; « qu'elle » se remplace par « qu'il ».", 1],
    ["« Peut » se remplace par « pouvait », « peu » par « beaucoup ».", 1],
    ["« Sans » est le contraire d'« avec » ; « s'en » se remplace par « m'en ».", 1],
    ["« Où » indique le lieu ou le temps ; « ou » se remplace par « ou bien ».", 1],
    ["« Ce » se remplace par « cela » ou précède un nom ; « se » est un pronom réfléchi.", 1],
    ["J'applique les tests, mais j'hésite encore sur « quel que ».", 0.5],
    ["Je vérifie systématiquement « a » et « à » en relisant mes courriels.", 1],
    ["Je fais la différence entre « on » et « ont » avec le test « il » / « avaient ».", 1],
    ["J'ai encore besoin de réfléchir pour « c'est » et « s'est », mais je trouve la bonne réponse.", 0.5],
  ],
  // Q4 — accords
  [
    ["Je cherche le noyau du sujet : « le personnel des agences est convoqué » ; après « la plupart des », j'accorde avec le complément.", 1],
    ["Les noms employés comme adjectifs de couleur restent invariables : « des fauteuils marron ».", 1],
    ["« Cent » et « vingt » prennent un s seulement s'ils sont multipliés et terminent le nombre.", 1],
    ["« Demi » placé devant le nom est invariable ; après le nom, il s'accorde en genre : « deux heures et demie ».", 1],
    ["« Tout » adverbe varie seulement devant un adjectif féminin commençant par une consonne ou un h aspiré.", 1],
    ["« C'est nous qui avons préparé » : j'accorde avec l'antécédent de « qui ».", 1],
    ["« Chacun » est singulier : « chacun des collaborateurs a reçu son badge ».", 1],
    ["« Même » s'accorde après un pronom pluriel : « eux-mêmes ».", 1],
    ["Je repère bien le sujet, même éloigné du verbe.", 1],
    ["Je maîtrise les accords courants ; les adjectifs de couleur composés me demandent encore de la réflexion.", 0.5],
    ["J'accorde l'adjectif avec tous les noms qu'il qualifie, au masculin pluriel si les genres sont mélangés.", 1],
    ["Je sais que « mille » est invariable.", 0.5],
  ],
  // Q5 — participe passé
  [
    ["Avec « être », j'accorde avec le sujet ; avec « avoir », avec le COD placé avant ; sinon, pas d'accord.", 1],
    ["Pour un verbe pronominal, je cherche la fonction de « se » : « elles se sont téléphoné », mais « elles se sont plaintes ».", 1],
    ["« Fait » suivi d'un infinitif reste invariable : « les mesures que nous avons fait appliquer ».", 1],
    ["Avec « en », le participe passé reste invariable : « des réclamations, nous en avons reçu ».", 1],
    ["« Les deux heures que la réunion a duré » : complément de mesure, pas d'accord.", 1],
    ["« Ils se sont rendu compte » : « compte » est le COD, donc « rendu » ne s'accorde pas.", 1],
    ["Je remplace par « pris » pour choisir entre participe passé et infinitif.", 1],
    ["Je repère le COD en posant la question « quoi ? » après le verbe.", 1],
    ["Je maîtrise les auxiliaires « être » et « avoir » ; je dois encore réviser les verbes pronominaux.", 0.5],
    ["« Les offres que nous avons reçues » : le COD « que » est placé avant, j'accorde.", 1],
    ["Je sais que le participe passé suivi d'un infinitif s'accorde si le COD fait l'action.", 1],
    ["Je relis chaque participe passé de mes comptes rendus avant de les diffuser.", 0.5],
  ],
  // Q6 — modes et temps
  [
    ["Après « si » de condition, jamais de conditionnel : « si j'avais su, je vous aurais prévenu ».", 1],
    ["Subjonctif après « il faut que » et « bien que » ; indicatif après « après que » : « après que le client aura signé ».", 1],
    ["Pour choisir entre futur et conditionnel, je remplace par « nous » : « nous pourrons » ou « nous pourrions ».", 1],
    ["Le conditionnel exprime la politesse ou l'hypothèse ; le futur, un engagement.", 1],
    ["À l'impératif, pas de s aux verbes en -er, sauf devant « en » et « y » : « penses-y ».", 1],
    ["Je connais les futurs irréguliers : « j'enverrai », « je courrai », « vous acquerrez ».", 1],
    ["Je respecte la concordance des temps : « il affirmait qu'il avait envoyé le devis ».", 1],
    ["Je reconnais le passé simple dans les textes : « il convainquit », « ils vinrent ».", 0.5],
    ["J'utilise le bon mode, mais je vérifie encore certaines formes du subjonctif.", 0.5],
    ["« Il faut que vous fassiez », « bien que le délai soit court » : je ne me trompe plus.", 1],
    ["Je choisis le temps selon que l'action est antérieure ou simultanée.", 1],
    ["Je vérifie dans un conjugueur les verbes dont je ne suis pas sûr{e}.", 1],
  ],
  // Q7 — ponctuation et typographie
  [
    ["Espace insécable avant « : ; ! ? », pas de majuscule aux jours et aux mois, « M. » pour Monsieur, « n° », « 1 250 € ».", 1],
    ["Je ne commence plus par « Suite à », mais par « À la suite de ».", 1],
    ["Mon courriel a un objet précis, une formule d'appel, des paragraphes courts et une formule de politesse adaptée.", 1],
    ["J'écris les heures « 14 h 30 » et je sépare les milliers par une espace.", 1],
    ["Je mets une virgule après un complément placé en tête de phrase.", 1],
    ["Je n'écris plus « Mr » : l'abréviation de Monsieur est « M. ».", 1],
    ["Je mets un trait d'union dans l'inversion : « Pourriez-vous ».", 1],
    ["Je relis la ponctuation à voix haute pour vérifier le rythme des phrases.", 0.5],
    ["Je connais les règles principales ; je dois encore retenir l'usage des guillemets français.", 0.5],
    ["Le symbole « € » se place après le nombre, séparé de lui par une espace.", 1],
    ["Je termine chaque phrase par un point, sans espace avant.", 1],
    ["Je signe avec mon prénom, mon nom, ma fonction et le nom de l'entreprise.", 1],
  ],
  // Q8 — vocabulaire
  [
    ["Je distingue les paronymes : « conjoncture » et « conjecture », « prolongation » et « prolongement ».", 1],
    ["J'évite les pléonasmes comme « prévoir à l'avance » ou « collaborer ensemble ».", 1],
    ["Je remplace « e-mail » par « courriel » et « brainstorming » par « remue-méninges », deux termes recommandés que l'on trouve dans FranceTerme.", 1],
    ["J'écris « pallier un manque », sans « à ».", 1],
    ["On invoque un argument, on évoque un souvenir : je ne confonds plus ces deux verbes.", 1],
    ["Je dis « se révéler faux » plutôt que « s'avérer faux ».", 1],
    ["Je vérifie le sens d'un mot dans le dictionnaire avant de l'employer.", 1],
    ["J'ai une liste d'anglicismes à remplacer dans mes courriels.", 1],
    ["Je repère mieux les pléonasmes, mais certains m'échappent encore à l'oral.", 0.5],
    ["On se rappelle quelque chose, mais on se souvient de quelque chose.", 1],
    ["Je consulte la rubrique « Dire, ne pas dire » de l'Académie française.", 1],
    ["Je choisis des mots précis plutôt que « truc » ou « chose ».", 0.5],
  ],
  // Q9 — construction des phrases
  [
    ["« Le dossier dont je vous ai parlé », « le projet sur lequel nous travaillons » : je choisis le relatif selon la construction du verbe.", 1],
    ["À l'écrit, la négation est complète : « nous n'avons pas reçu le colis ».", 1],
    ["L'interrogation indirecte se passe de « est-ce que » : « je me demande ce qu'il veut ».", 1],
    ["« Quand a-t-il appelé ? » : le t euphonique s'écrit entre deux traits d'union.", 1],
    ["Je découpe les phrases trop longues en deux ou trois phrases claires.", 1],
    ["On va « chez le fournisseur » et non « au fournisseur ».", 1],
    ["« C'est de cela qu'il s'agit » : je n'emploie plus « dont » avec « de ».", 1],
    ["Je vérifie dans le dictionnaire la préposition qui suit un verbe.", 1],
    ["L'inversion du sujet me permet de poser une question dans un registre soutenu.", 1],
    ["Je maîtrise les relatifs simples ; « lequel » me demande encore de la réflexion.", 0.5],
    ["Je relis mes phrases pour vérifier qu'un lecteur pressé les comprend.", 0.5],
    ["« Le client est intéressé par notre offre » : j'emploie la bonne préposition.", 1],
  ],
  // Q10 — registres et message oral
  [
    ["J'adapte mon registre : soutenu avec un client, courant avec un collègue ; je dis « C'est entendu, je m'en charge ».", 1],
    ["Pour restituer un message, je relève qui, quoi, quand, où et les actions à mener.", 1],
    ["Je reprends la formule d'appel dans la formule finale d'un courrier : « Je vous prie d'agréer, Madame, … ».", 1],
    ["Je remplace « Y a un souci » par « Un problème se pose ».", 1],
    ["Au téléphone, je reformule la demande et je la confirme par écrit.", 1],
    ["Je choisis « Bien cordialement » pour un courriel et une formule complète pour un courrier.", 1],
    ["Je prends des notes structurées pendant l'appel et je les relis aussitôt.", 1],
    ["Je n'utilise plus d'expressions familières avec les clients.", 1],
    ["Je restitue un message oral en une minute, sans oublier d'information.", 1],
    ["Je fais mieux la différence entre les registres, mais à l'oral je me relâche encore.", 0.5],
    ["« Pourriez-vous me rappeler ? » remplace « Vous pouvez me rappeler ? ».", 1],
    ["Je choisis le tutoiement ou le vouvoiement selon l'usage de l'entreprise.", 0.5],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [63, 29, 44, 29, 28, 58, 37, 2, 53, 12];

export function getLRBAutoAnswers(
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
export function lrbNoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6, soit 4 à 12/20). */
export function lrbBonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((lrbNoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `lrbBonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function lrbReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = lrbBonnesQcmDebut(n, idx, nom, prenom);
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
export function lrbNoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet, attentes, situation actuelle et apport attendu de la formation.
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
    besoin: "Fiabiliser mes courriels et mes comptes rendus et faire attester mon niveau de français par la Certification Le Robert.",
    objectif: "Je veux supprimer les fautes d'accord et de conjugaison de mes écrits et obtenir au moins 750 points à la certification.",
    projet: "Évoluer vers un poste d'assistant{e} de direction dans une entreprise plus grande.",
    attentes: "J'attends des règles claires sur le participe passé et le subjonctif, et un entraînement aux exercices de l'épreuve.",
    missions: "Assistanat d'une équipe de direction : courriels, comptes rendus de réunion, courriers, organisation des agendas.",
    contribution: "La formation doit me rendre autonome dans la relecture des documents de la direction.",
  },
  {
    besoin: "Écrire à mes clients sans faute et dans le bon registre.",
    objectif: "Mon objectif est de rédiger des relances et des propositions commerciales irréprochables et d'atteindre 600 points.",
    projet: "Renforcer ma crédibilité auprès des clients et préparer une évolution vers un poste de responsable d'agence.",
    attentes: "J'attends des modèles de courriels et des exercices sur les homophones et les formules de politesse.",
    missions: "Prospection, suivi de portefeuille, relances écrites et téléphoniques, comptes rendus de rendez-vous.",
    contribution: "La formation doit améliorer l'image que mes écrits donnent de l'entreprise.",
  },
  {
    besoin: "Rédiger des rapports d'intervention clairs et corrects.",
    objectif: "Je souhaite maîtriser les accords et la ponctuation et obtenir au moins 450 points, puis 600 points.",
    projet: "Accéder à un poste de chef d'équipe, qui demande davantage d'écrits.",
    attentes: "J'attends des méthodes simples pour relire mes rapports et des exercices adaptés à mon niveau.",
    missions: "Maintenance d'équipements chez les clients, rapports d'intervention, messages aux clients et au service technique.",
    contribution: "La formation doit me donner confiance pour écrire aux clients.",
  },
  {
    besoin: "Répondre aux usagers par écrit sans faute et avec le bon registre.",
    objectif: "Mon objectif est de rédiger des courriels et des courriers administratifs corrects et d'atteindre 600 points.",
    projet: "Me présenter à un concours administratif qui comporte des épreuves écrites.",
    attentes: "J'attends un entraînement régulier sur l'orthographe et la typographie des courriers.",
    missions: "Accueil physique et téléphonique du public, courriels aux usagers, formulaires et courriers types.",
    contribution: "La formation doit améliorer la qualité des réponses envoyées aux usagers.",
  },
  {
    besoin: "Valoriser ma candidature en faisant certifier mon niveau de français.",
    objectif: "Je veux obtenir au moins 600 points pour l'indiquer sur mon CV.",
    projet: "Retrouver un emploi dans le secrétariat ou l'accueil après une reconversion.",
    attentes: "J'attends un entraînement complet à l'épreuve et une relecture de mes lettres de candidature.",
    missions: "Recherche d'emploi après dix ans dans la vente ; préparation d'une reconversion vers le secrétariat.",
    contribution: "La formation doit m'aider à décrocher des entretiens grâce à des candidatures sans faute.",
  },
  {
    besoin: "Atteindre un niveau d'expertise pour relire les textes de toute mon équipe.",
    objectif: "Mon objectif est d'obtenir 900 points et de maîtriser les cas rares du participe passé et de la typographie.",
    projet: "Devenir la personne référente pour la relecture des publications de l'association.",
    attentes: "J'attends des règles fines, des cas difficiles et un examen blanc exigeant.",
    missions: "Rédaction d'articles, de lettres d'information et de messages pour les réseaux sociaux d'une association.",
    contribution: "La formation doit fiabiliser toutes nos publications.",
  },
  {
    besoin: "Rédiger des devis et des courriels qui rassurent mes clients sur mon professionnalisme.",
    objectif: "Je souhaite éliminer les homophones mal choisis et les phrases trop longues, et atteindre 750 points.",
    projet: "Développer ma clientèle d'entreprises dans le cadre de mon activité indépendante.",
    attentes: "J'attends des fiches mémo rapides à consulter quand j'écris à mes clients.",
    missions: "Activité indépendante de graphisme : devis, factures, courriels et propositions aux clients.",
    contribution: "La formation doit rendre mes écrits aussi soignés que mes créations.",
  },
  {
    besoin: "Consolider ma conjugaison et mes constructions de phrases en français, appris à l'âge adulte.",
    objectif: "Mon objectif est d'écrire des convocations et des courriels corrects et d'atteindre 600 points.",
    projet: "Évoluer vers un poste de chargé{e} de ressources humaines.",
    attentes: "J'attends des explications sur le subjonctif, les prépositions et les accords, avec beaucoup d'exemples.",
    missions: "Assistanat en ressources humaines : convocations, courriels aux salariés, suivi administratif des dossiers.",
    contribution: "La formation doit me permettre d'écrire sans faire relire chaque document.",
  },
  {
    besoin: "Rédiger des comptes rendus de réunion clairs, précis et sans faute.",
    objectif: "Je veux structurer mes comptes rendus et maîtriser la concordance des temps.",
    projet: "Prendre en charge le secrétariat des réunions du comité de direction.",
    attentes: "J'attends une méthode de prise de notes et de rédaction de comptes rendus.",
    missions: "Secrétariat de service : prise de notes, comptes rendus, diffusion des informations.",
    contribution: "La formation doit faire gagner du temps à la relecture de mes comptes rendus.",
  },
  {
    besoin: "Choisir le mot juste et éviter les anglicismes dans mes écrits professionnels.",
    objectif: "Mon objectif est d'enrichir mon vocabulaire professionnel et d'atteindre 750 points.",
    projet: "Rédiger les supports de présentation de mon service en français soigné.",
    attentes: "J'attends des listes de paronymes, de pléonasmes et d'équivalents français des termes anglais.",
    missions: "Coordination de projets informatiques, comptes rendus et présentations, nombreux termes anglais au quotidien.",
    contribution: "La formation doit rendre mes documents plus précis et plus lisibles pour tous.",
  },
  {
    besoin: "Gagner en aisance à l'oral et adapter mon registre au téléphone et en réunion.",
    objectif: "Je souhaite reformuler et restituer les messages avec précision et dans le bon registre.",
    projet: "Évoluer vers un poste de conseill{er} clientèle à distance.",
    attentes: "J'attends des mises en situation orales et des exercices de compréhension de messages enregistrés.",
    missions: "Accueil téléphonique, prise de messages, orientation des appels vers les services.",
    contribution: "La formation doit améliorer la qualité de mes échanges avec les clients.",
  },
  {
    besoin: "Préparer la certification après plusieurs années sans écrire régulièrement.",
    objectif: "Mon objectif est de revoir les règles de base et d'obtenir au moins 450 points.",
    projet: "Reprendre un emploi de bureau après une longue interruption.",
    attentes: "J'attends une remise à niveau progressive et des encouragements.",
    missions: "Interruption d'activité de plusieurs années ; expérience antérieure d'employé{e} administrati{if}.",
    contribution: "La formation doit me redonner confiance à l'écrit.",
  },
  {
    besoin: "Rédiger des courriers administratifs et des notes conformes aux usages.",
    objectif: "Je veux maîtriser la présentation des courriers, les formules de politesse et la typographie.",
    projet: "Accéder à un poste de gestionnaire administrati{if} dans une collectivité.",
    attentes: "J'attends des modèles de courriers commentés et des exercices de typographie.",
    missions: "Agent{e} administrati{if} dans un service public : courriers, notes internes, tableaux de suivi.",
    contribution: "La formation doit rendre mes courriers conformes sans relecture systématique.",
  },
  {
    besoin: "Éviter les fautes dans les documents que je remets aux clients après chaque chantier.",
    objectif: "Mon objectif est de rédiger des comptes rendus de chantier corrects et d'atteindre 600 points.",
    projet: "Créer ma propre entreprise de rénovation dans deux ans.",
    attentes: "J'attends des exercices courts et concrets, adaptés à mes écrits de chantier.",
    missions: "Conduite de petits chantiers de rénovation, devis, comptes rendus et courriels aux clients.",
    contribution: "La formation doit donner une image professionnelle de mes documents.",
  },
  {
    besoin: "Faire attester mon niveau de français dans mon dossier d'évolution professionnelle.",
    objectif: "Je souhaite obtenir un score d'au moins 750 points, reconnu par mon employeur.",
    projet: "Préparer un entretien professionnel et une demande de mobilité interne.",
    attentes: "J'attends un examen blanc dans les conditions de l'épreuve et un plan de révision.",
    missions: "Gestion de dossiers clients dans une compagnie d'assurance, nombreux courriers et courriels.",
    contribution: "La formation doit appuyer ma demande de mobilité par un résultat reconnu.",
  },
  {
    besoin: "Comprendre les règles du participe passé que je n'ai jamais bien maîtrisées.",
    objectif: "Mon objectif est d'accorder sans hésiter le participe passé, y compris avec les verbes pronominaux.",
    projet: "Rédiger seul{e} les comptes rendus de l'atelier dont j'ai la responsabilité.",
    attentes: "J'attends des tests simples et beaucoup d'exercices corrigés.",
    missions: "Responsable d'atelier dans une entreprise de fabrication, rapports et consignes écrites.",
    contribution: "La formation doit fiabiliser les consignes écrites transmises à l'équipe.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilLRB(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

export function getLRBBesoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return accorder(profilLRB(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production écrite du stagiaire (cas fil rouge ou écrits personnels)
// Indices : 0 diagnostic, 1 C1 orthographe lexicale et dictée, 2 C1 homophones, 3 C1 accords,
//           4 C1 participe passé, 5 C1 modes et temps, 6 C1 ponctuation et typographie,
//           7 C2 vocabulaire, 8 C2 construction des phrases, 9 C2 registres et message oral ;
//           8 productions par banque.
// La k-ième production de chaque banque suit le même stagiaire : il garde le même terrain d'un
// exercice à l'autre (entreprises et personnes fictives).
//   0 assistant(e) de direction, PME de logistique, Rennes · 1 conseiller ou conseillère commerciale,
//   agence immobilière, Angers · 2 technicien(ne) de maintenance, Saint-Nazaire · 3 agent(e) d'accueil
//   en mairie, Nantes · 4 demandeur ou demandeuse d'emploi en reconversion, Laval · 5 chargé(e) de
//   communication d'une association, Tours · 6 graphiste indépendant(e), La Roche-sur-Yon
//   7 assistant(e) RH ayant appris le français à l'âge adulte, Le Mans
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Diagnostic de départ
  [
    "Assistant{e} de direction dans une PME de logistique à Rennes, j'écris chaque jour des courriels, des comptes rendus et des courriers. Sur les dix phrases, j'en ai corrigé huit ; j'ai laissé passer « les documents que vous m'avez demandé » et j'ai cru fausse la phrase j, qui était correcte. Mon courriel de retard était clair, mais il manquait une solution. Je vise 750 points. Forces : vocabulaire, présentation, rigueur. Vigilance : participes passés, subjonctif, typographie. Priorités : participe passé, conjugaison, relecture.",
    "Conseill{er} commercial{e} dans une agence immobilière à Angers, j'écris des relances, des comptes rendus de visite et des messages courts. J'ai corrigé six phrases sur dix : « malgré que », « quelque soit » et « si j'aurais » m'ont échappé. Mon courriel était trop familier. Je vise 600 points pour attester que je rédige de façon autonome. Forces : aisance à l'oral, réactivité, sens du client. Vigilance : registre écrit, homophones, conditionnel. Priorités : homophones, modes, formules de politesse.",
    "Technicien{ne} de maintenance à Saint-Nazaire, je rédige surtout des rapports d'intervention et des messages aux clients. J'ai corrigé cinq phrases ; les accords et le participe passé sont mes points faibles. Mon courriel était court mais compréhensible. Je vise d'abord 450 points, le seuil de délivrance, puis 600 points. Forces : précision technique, phrases courtes, vocabulaire du métier. Vigilance : accords, ponctuation, conjugaison. Priorités : accords, participe passé, ponctuation.",
    "Agent{e} d'accueil dans une mairie de Nantes, je réponds au téléphone, je rédige des courriels et je remplis des formulaires. J'ai corrigé sept phrases ; j'hésite encore sur « ci-joint » et sur le subjonctif. Mon courriel était poli et bien structuré. Je vise 600 points. Forces : politesse, écoute, clarté. Vigilance : participes passés, « ci-joint », typographie. Priorités : participe passé, typographie, vocabulaire administratif.",
    "Demand{eur} d'emploi en reconversion vers le secrétariat, à Laval, j'écris mes candidatures et je m'entraîne à rédiger des courriers. J'ai corrigé six phrases ; le conditionnel après « si » et les homophones me posent problème. Mon courriel manquait de formule d'appel. Je vise 600 points pour valoriser mon CV. Forces : motivation, orthographe d'usage, organisation. Vigilance : homophones, conjugaison, formules. Priorités : homophones, modes et temps, courriel professionnel.",
    "Chargé{e} de communication dans une association à Tours, j'écris des articles, des lettres d'information et des messages pour les réseaux sociaux. J'ai corrigé neuf phrases ; je n'ai hésité que sur la phrase j. Mon courriel était bien rédigé. Je vise 900 points, car je relis les textes de toute l'équipe. Forces : style, vocabulaire, relecture. Vigilance : cas rares du participe passé, anglicismes, typographie. Priorités : participe passé, anglicismes, typographie fine.",
    "Graphiste indépendant{e} à La Roche-sur-Yon, j'écris des devis, des factures et des courriels à mes clients. J'ai corrigé six phrases ; « quelque soit » et « ont vous rappellera » m'ont échappé. Mon courriel était trop long. Je vise 750 points pour rassurer mes clients sur la qualité de mes écrits. Forces : présentation, sens visuel, rigueur des devis. Vigilance : homophones, phrases longues, accords. Priorités : homophones, construction des phrases, accords.",
    "Assistant{e} RH au Mans, j'ai appris le français en arrivant en France il y a six ans et j'ai aujourd'hui un niveau B2. J'écris des convocations et des courriels aux salariés. J'ai corrigé cinq phrases ; le subjonctif et les prépositions sont difficiles pour moi. Mon courriel était correct mais simple. Je vise 600 points. Forces : régularité, vocabulaire des ressources humaines, motivation. Vigilance : subjonctif, prépositions, accords. Priorités : conjugaison, constructions verbales, accords.",
  ],
  // 1 — C1 orthographe lexicale et d'usage, dictée de mots
  [
    "Dictée : quatorze mots justes sur quinze ; j'avais écrit « occurence ». Orthographe : dilemme, occurrence, rémunération, parmi, connexion. Pluriels : travaux, détails, bijoux, pneus, journaux, bals. Homophones : censé, davantage, prêt, voie, compte, session. Mes astuces : la famille du mot (rémunérer), la liste des exceptions en -ou, le dictionnaire en cas de doute.",
    "J'ai fait trois erreurs à la dictée : « rendez-vous » sans trait d'union, « néanmoins » sans s, « quelquefois » en deux mots. J'ai corrigé avec le dictionnaire. J'ai confondu « censé » et « sensé ». Pluriels justes. Mon astuce : « quelquefois » s'écrit en un mot quand il signifie parfois.",
    "Dictée : douze mots justes ; « dilemme » et « intervalle » étaient mal écrits, et j'avais oublié l'apostrophe de « d'ores et déjà ». Je retiens désormais les consonnes doubles par familles. J'ai écrit « des détaux » avant de vérifier : « détail » fait « détails ». L'orthographe des mots invariables reste à revoir.",
    "Dictée : treize mots justes ; j'ai hésité sur « acompte », que j'écrivais avec deux c. Choix : tous justes, sauf « connection », écrit à l'anglaise. Homophones : tous justes. Je vérifierai dans le dictionnaire les mots de mes formulaires.",
    "J'ai obtenu onze mots justes à la dictée ; « aujourd'hui » et « au fur et à mesure » m'ont posé problème. J'ai appris que « parmi » ne prend jamais de s. Pour les pluriels, j'ai retenu la liste bijou, caillou, chou, genou, hibou, joujou, pou. Je ferai une fiche d'orthographe avec mes mots pièges.",
    "Dictée sans faute ; j'ai écrit « évènement » et j'ai appris que cette graphie rectifiée de 1990 est admise, comme « événement ». Tous les choix sont justes. Je retiens surtout la différence entre « davantage » et « d'avantage ». J'utilise le dictionnaire pour vérifier les graphies rectifiées.",
    "Dictée : douze mots justes ; j'ai écrit « rénumération », sans faire le lien avec « rémunérer ». Pluriels : j'avais un doute sur « des bals », c'était juste. Homophones : j'ai confondu « voie » et « voix ». Je garderai un dictionnaire ouvert quand je rédige mes devis.",
    "Dictée : dix mots justes ; les accents et les consonnes doubles sont difficiles pour moi. J'ai appris des familles de mots : connecter, connexion ; rémunérer, rémunération. Homophones : quatre justes sur six. Je relirai mes convocations avec un dictionnaire pour l'orthographe des mots difficiles.",
  ],
  // 2 — C1 homophones grammaticaux
  [
    "1. a, à ; 2. est, et ; 3. où, ou ; 4. Ce, se ; 5. Ces, ses, C'est, s'est ; 6. leur, leurs ; 7. Quelle, qu'elle ; 8. peut, peu ; 9. s'en, sans. Mes tests : je remplace « a » par « avait », « est » par « était », « ses » par « les siens », « peut » par « pouvait ».",
    "Toutes les phrases sont justes sauf la septième, où j'avais écrit « quel que soit la décision » ; « quel » s'accorde avec « décision ». Je remplace maintenant « qu'elle » par « qu'il » pour vérifier.",
    "J'ai fait deux erreurs : « leurs » devant le verbe à la phrase 6 et « ses dossiers-là » à la phrase 5. Je retiens : « leur » devant un verbe est invariable, et je remplace « ces » par « ces… -là » pour le reconnaître.",
    "Sept phrases justes sur neuf ; « s'en » et « sans » m'ont fait hésiter. Je remplace « s'en » par « m'en » et « sans » par son contraire, « avec ». Pour « où », je vérifie s'il indique le lieu ou le temps.",
    "J'ai utilisé les tests de remplacement pour chaque phrase : « avait », « était », « ou bien », « cela ». Seule la phrase 5 m'a demandé du temps : je remplace « c'est » par « cela est » et « s'est » par « je me suis ».",
    "Tout est juste. Pour expliquer la méthode à mes collègues, je remplace chaque mot par un autre de même nature : « a » par « avait », « peu » par « beaucoup », « leur » par « lui » devant un verbe.",
    "J'ai confondu « ce » et « se » à la phrase 4. « Ce » précède ici un nom, « document » ; « se » précède un verbe et je le remplace par « me » : « je me trouve ».",
    "Six phrases justes ; « peut » et « peu » se prononcent de la même façon et je me trompais souvent. Je remplace « peut » par « pouvait » : « le client pouvait attendre » fonctionne, donc j'écris « peut ».",
  ],
  // 3 — C1 accords dans le groupe nominal et accord du verbe
  [
    "Corrections : « des fauteuils marron » ; « trois cent vingt » ; phrase 3 correcte ; « eux-mêmes » ; « deux heures et demie » ; « la plupart des clients sont satisfaits » ; « c'est nous qui avons préparé » ; « le personnel est convoqué » ; « chacun a reçu » ; phrase 10 correcte. Chaque accord est justifié par la règle.",
    "J'avais corrigé à tort la phrase 3 en « toutes entières » : devant une voyelle, « tout » adverbe reste invariable. Le reste est juste. Je retiens l'accord du verbe avec le complément après « la plupart des ».",
    "Quatre erreurs : j'ai laissé « marrons », « trois cents vingt », « demi » et « sont convoqués ». J'ai revu les règles : nom de couleur invariable, « cent » sans s devant un autre nombre, accord de « demi » en genre après le nom, accord avec le noyau du sujet.",
    "Huit justes sur dix ; « eux-même » et « chacun ont » m'avaient échappé. Pour l'accord du verbe, je cherche maintenant le noyau du sujet et je le souligne.",
    "J'ai trouvé les erreurs des phrases 1, 2, 4, 5 et 6 ; les phrases 7, 8 et 9 étaient plus difficiles. « C'est nous qui avons » : l'accord se fait avec l'antécédent de « qui ».",
    "Tout est juste, y compris les deux phrases correctes. J'ai ajouté que les rectifications de 1990 admettent « trois-cent-vingt » avec des traits d'union. Je ferai une fiche sur l'accord des adjectifs de couleur pour l'équipe.",
    "Sept justes ; j'ai cru que « mille » prenait un s. « Mille » est invariable, « cents » prend un s quand il termine le nombre. L'accord des nombres est maintenant clair pour mes devis.",
    "Six justes ; les phrases avec « la plupart » et « le personnel » étaient difficiles. J'accorde avec le noyau du sujet, sauf après « la plupart des », où le verbe s'accorde avec le complément.",
  ],
  // 4 — C1 participe passé
  [
    "1. reçues ; 2. arrivées ; 3. envoyé ; 4. téléphoné ; 5. partagé ; 6. plaintes ; 7. entendue ; 8. fait ; 9. reçu ; 10. duré. Pour chaque participe passé, j'ai indiqué l'auxiliaire, le COD et sa place.",
    "Neuf justes ; j'avais écrit « téléphonés » : on téléphone à quelqu'un, « se » est complément indirect et le participe passé ne s'accorde pas.",
    "Six justes ; les verbes pronominaux m'ont piégé{e} : « partagé » sans accord, car le COD « les dossiers » est placé après, mais « plaintes », car « se plaindre » est essentiellement pronominal. Je reverrai les règles du participe passé.",
    "Huit justes ; « en » et « durer » m'avaient trompé{e}. Avec « en », le participe passé reste invariable ; « deux heures » répond à la question « combien de temps ? », ce n'est pas un COD.",
    "Sept justes ; je pose maintenant la question « quoi ? » après le verbe pour trouver le COD avant d'accorder le participe passé.",
    "Tout est juste. J'ai précisé que « fait » suivi d'un infinitif reste invariable et que les rectifications de 1990 étendent cette règle à « laissé ». J'expliquerai ces cas du participe passé à l'équipe.",
    "Sept justes ; « entendue » m'a fait hésiter : c'est la comptable qui présente, donc le participe passé s'accorde avec le COD placé avant.",
    "Six justes ; avec « être », j'accorde bien ; avec « avoir », je dois encore chercher le COD. Je m'entraîne chaque jour avec une phrase sur le participe passé.",
  ],
  // 5 — C1 modes et temps
  [
    "1. pourrons ; 2. aurions signé ; 3. fassiez ; 4. soit ; 5. aura signé ; 6. avait envoyé ; 7. Envoie-moi, penses-y ; 8. enverrons, courrai, acquerrez ; 9. convainquit, vinrent ; 10. « Si j'avais le temps, je relirais le rapport. » Le subjonctif suit « il faut que » et « bien que », jamais « après que ».",
    "Huit justes ; j'avais mis « ait signé » après « après que ». « Après que » se construit avec l'indicatif ; c'est « avant que » qui demande le subjonctif.",
    "Sept justes ; j'ai hésité entre « pourrons » et « pourrions » : avec « si » et le présent, c'est le futur, pas le conditionnel. Le passé simple « convainquit » m'a demandé une vérification dans le conjugueur.",
    "Neuf justes ; seule la forme « acquerrez » m'a échappé. J'ai retenu la règle : pas de conditionnel après « si » exprimant une condition.",
    "Six justes ; je confondais « envoie » et « envoies » à l'impératif. J'ai aussi revu le subjonctif de « faire » : « que vous fassiez ».",
    "Tout est juste. J'ai ajouté que le conditionnel de politesse convient aux demandes (« nous souhaiterions ») et que le futur exprime un engagement.",
    "Sept justes ; « avait envoyé » m'a fait réfléchir : dans un récit au passé, l'action antérieure se met au plus-que-parfait. Je vérifie le subjonctif avec « il faut que ».",
    "Six justes ; les futurs irréguliers et le subjonctif sont difficiles pour moi. J'apprends « j'enverrai », « je courrai » et « que vous fassiez » avec des fiches.",
  ],
  // 6 — C1 ponctuation, typographie et courriel
  [
    "J'ai corrigé : « Bonjour Monsieur Lefèvre », « À la suite de », « mardi », « n° 2451 », « lundi 7 décembre à 14 h 30 », « 1 250 € TTC », « Pourriez-vous », « livraison ? », le point final et « Cordialement, ». Règles : espace insécable avant les signes doubles, pas de majuscule aux jours et aux mois, nombres par tranches de trois chiffres. Ma réponse au client présente des excuses et une date de régularisation.",
    "J'ai trouvé presque toutes les erreurs ; j'avais laissé « Suite à » et l'espace avant le point. Ma réponse au client était trop familière au début ; je l'ai reprise dans un registre soutenu.",
    "J'ai repéré les erreurs de majuscules et de nombres, mais pas l'espace insécable avant le point d'interrogation. Ma réponse au client est courte et claire.",
    "J'ai repéré toutes les erreurs sauf « Mr ». Je retiens : « M. » avec un point, « Monsieur » en toutes lettres dans la formule d'appel, une espace entre le nombre et le symbole « € ».",
    "J'ai corrigé dix erreurs ; la typographie des heures, « 14 h 30 », était nouvelle pour moi. Ma réponse au client respecte la structure : accusé de réception, explication, excuses, solution.",
    "J'ai repéré toutes les erreurs ; j'ai ajouté les guillemets français avec leurs espaces insécables et vérifié la signature. Ma réponse est rédigée dans un registre soutenu, sans faute.",
    "J'ai corrigé neuf erreurs ; je mettais des majuscules aux mois dans mes devis. J'applique maintenant la typographie française à tous mes documents.",
    "J'ai corrigé huit erreurs ; l'espace avant les deux-points et le point d'interrogation n'existe pas dans ma langue d'origine, j'y fais attention maintenant.",
  ],
  // 7 — C2 vocabulaire et précision lexicale
  [
    "Paronymes : imminent, conjoncture, prolongation, infraction, invoqué, acceptation. Pléonasmes corrigés : monter, prévoir, aujourd'hui, collaborer, voire, comme. Impropriétés : pallier ce manque, je me rappelle votre demande, se révèle faux, résolu. Anglicismes : courriel, date limite, réunion, retour d'information, remue-méninges, lettre d'information, parangonnage. Je vérifierai dans le dictionnaire et dans FranceTerme.",
    "Cinq paronymes justes sur six ; j'avais choisi « évoqué ». J'emploie souvent « deadline » et « meeting » avec mes clients ; je les remplace par « échéance » et « réunion » pour éviter l'anglicisme.",
    "Quatre paronymes justes ; « conjecture » et « conjoncture » m'étaient inconnus. Les pléonasmes étaient faciles à repérer une fois la liste lue ; « collaborer ensemble » m'a surpris{e}.",
    "Tous les paronymes sont justes. J'utilisais « pallier à » dans les courriers de la mairie ; je corrige en « pallier ce manque ». J'ai noté chaque pléonasme relevé dans nos modèles de lettres.",
    "Cinq paronymes justes ; j'ai découvert que « s'avérer faux » est critiqué. Je fais une liste des anglicismes à éviter dans mes candidatures.",
    "Tout est juste. J'ai proposé d'ajouter à notre guide de rédaction les termes recommandés « courriel », « remue-méninges » et « parangonnage », pour limiter les anglicismes dans la lettre d'information de l'association.",
    "Quatre paronymes justes ; avec mes clients, j'emploie « brainstorming » et « feedback ». Je les remplace par « remue-méninges » et « retour d'information » ; les pléonasmes « voire même » et « comme par exemple » disparaissent de mes devis.",
    "Quatre paronymes justes ; « acception » et « acceptation » se ressemblent beaucoup. Les pléonasmes sont plus faciles pour moi que les impropriétés comme « se rappeler de ».",
  ],
  // 8 — C2 construction des phrases
  [
    "1. dont je vous ai parlé ; 2. c'est de cela qu'il s'agit ; 3. sur lequel nous travaillons ; 4. je me demande ce qu'il veut ; 5. on n'a pas reçu ; 6. a-t-il ; 7. chez le fournisseur ; 8. intéressé par notre offre ; 9. « Avez-vous reçu le devis ? » ; 10. la phrase longue est découpée en deux phrases : la réunion et la réduction du budget, puis les actions à mener.",
    "Huit justes ; j'avais écrit « c'est cela qu'il s'agit ». Pour la phrase longue, j'ai fait trois phrases courtes, plus lisibles pour mes clients.",
    "Sept justes ; « dont » et « lequel » m'ont demandé de réfléchir à la préposition du verbe. Ma phrase réécrite est claire, mais un peu sèche.",
    "Huit justes ; j'oublie souvent le « ne » à l'écrit, car on ne le prononce pas toujours. J'ai réécrit la phrase longue en deux phrases.",
    "Six justes ; l'interrogation indirecte « je me demande ce qu'il veut » était nouvelle pour moi. Je découpe désormais mes phrases trop longues.",
    "Tout est juste. J'ai proposé deux versions de la phrase longue, l'une pour un compte rendu, l'autre pour un message interne.",
    "Sept justes ; « a-t'il » avec une apostrophe était une habitude. Mes phrases de devis sont maintenant plus courtes.",
    "Six justes ; les prépositions après les verbes sont difficiles pour moi : « intéressé par », « chez le fournisseur ». Je note chaque construction dans un carnet et je relis mes phrases avant l'envoi.",
  ],
  // 9 — C2 registres, compréhension orale et restitution
  [
    "Informations : réunion avec le cabinet Vasseur avancée à jeudi 10 h ; prévenir Karim, réserver la salle du premier étage, envoyer l'ordre du jour avant mercredi midi avec le compte rendu de la dernière réunion. Message à Karim rédigé dans un registre courant. Transpositions : « C'est entendu, je m'en charge », « Pourriez-vous me rappeler ? », « La facture présente une anomalie », « Je vous adresserai le document demain », « Nous nous sommes trompés de date ».",
    "J'avais oublié le compte rendu à joindre. Mes transpositions sont justes ; j'ai bien distingué le registre d'un courrier à une cliente de celui d'un courriel à un partenaire habituel.",
    "J'ai noté toutes les informations, mais mon message à Karim était trop long. Les transpositions dans un registre soutenu m'ont aidé{e} à éviter les mots familiers.",
    "Restitution orale fidèle ; à l'accueil, je reformule déjà les demandes. J'ai choisi la formule « Je vous prie d'agréer, Madame, l'expression de mes salutations distinguées » et je garde un registre soutenu avec le public.",
    "J'ai relevé les informations dans l'ordre : qui, quoi, quand, où. Pour « Y a un souci », j'ai proposé « Un problème se pose », plus adapté au registre professionnel.",
    "Toutes les informations sont relevées ; mon message à Karim est bref et complet. J'ai expliqué que le registre se choisit selon le destinataire et le support, écrit ou oral.",
    "J'écrivais « Ça marche » à mes clients ; je le remplace par « C'est entendu ». Ma restitution orale a duré un peu plus d'une minute, mais le registre était adapté.",
    "J'ai bien compris le message lu ; l'heure et la salle étaient justes. Les expressions familières comme « on s'est planté » sont difficiles à repérer pour moi ; je fais une liste des registres familier, courant et soutenu.",
  ],
];

const BILANS_PERSONNELS = [
  "Ce travail m'a surtout appris à vérifier chaque règle avant de l'appliquer.",
  "Le plus difficile a été de tenir dans le temps de l'exercice ; je reprendrai la fiche chez moi.",
  "J'ai comparé ma production avec le corrigé partagé à l'écran, ce qui m'a fait corriger deux oublis.",
  "Ces règles serviront directement pour l'examen blanc du troisième jour.",
  "J'ai travaillé en binôme dans une salle de sous-groupe, ce qui m'a fait voir mes erreurs autrement.",
  "La correction de la formatrice m'a permis de repérer une erreur que je ne referai plus.",
  "J'avais des doutes sur ce point en arrivant ; je me sens maintenant capable de l'appliquer seul{e}.",
  "Je me suis appuyé{e} sur les fiches mémo, que je garderai près de moi pour réviser.",
  "Je n'ai pas eu le temps de tout relire, mais les règles sont claires pour moi.",
  "J'ai posé une question dans la discussion de la classe virtuelle, ce qui m'a évité une erreur.",
  "Je vais appliquer cette méthode dès mon prochain courriel professionnel.",
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
  const c = t.match(/\bC([12])\b/);
  if (c) {
    if (c[1] === "1") {
      if (/homophone/i.test(t)) return 2;
      if (/participe/i.test(t)) return 4;
      if (/conjug|mode|temps/i.test(t)) return 5;
      if (/ponctuation|typographi|courriel/i.test(t)) return 6;
      if (/accord/i.test(t)) return 3;
      return 1;
    }
    if (/construi|construction/i.test(t)) return 8;
    if (/registre|oral|message/i.test(t)) return 9;
    return 7;
  }
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickLRBExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isLRBFormation(intitule, code)) return null;
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
    ? `J'ai rattaché l'exercice aux écrits de ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "BTS Support à l'action managériale ; huit ans d'assistanat de direction",
  "BTS Négociation et digitalisation de la relation client ; conseill{er} commercial{e} depuis six ans",
  "Bac professionnel Maintenance des systèmes de production connectés ; technicien{ne} depuis dix ans",
  "Baccalauréat général ; agent{e} d'accueil dans une collectivité depuis cinq ans",
  "CAP Employé de vente spécialisé, puis dix ans dans la vente ; en reconversion",
  "Licence d'information et communication ; chargé{e} de communication",
  "Diplôme national des métiers d'art et du design ; graphiste indépendant{e}",
  "Licence de gestion obtenue à l'étranger ; français appris à l'âge adulte, niveau B2",
  "BTS Gestion de la PME",
  "DUT Gestion des entreprises et des administrations",
  "Titre professionnel Secrétaire assistant",
  "Bac professionnel Assistance à la gestion des organisations et de leurs activités",
  "Licence professionnelle Métiers de la gestion des ressources humaines",
  "BTS Comptabilité et gestion",
  "CAP Maçon, puis conduite de petits chantiers de rénovation",
  "Master en informatique ; coordination de projets",
  "Baccalauréat technologique STMG",
  "CAP Équipier polyvalent du commerce, puis reconversion vers l'accueil",
  "Licence de lettres modernes",
  "Diplôme d'école de commerce",
  "BTS Assurance ; gestionnaire de dossiers clients",
  "Bac professionnel Métiers de l'accueil",
  "Aucun diplôme ; quinze ans d'expérience comme employé{e} administrati{if}",
  "DELF B2 et diplôme d'études secondaires obtenu à l'étranger",
  "Titre professionnel Préparateur de commandes en entrepôt ; chef d'équipe en logistique",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant chaque journée.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières loin de l'écran me conviennent.",
  "Non. Je porte des lunettes et j'apprécie une taille d'affichage suffisante pour les documents partagés.",
  "Non, pas de handicap. J'aimerais que les dictées soient lues à un rythme posé.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je souhaite seulement disposer des fiches mémo en version numérique.",
  "Non, aucune situation de handicap. J'ai besoin d'un casque pour bien entendre les enregistrements, j'en ai un.",
  "Non. Je préfère avoir les supports en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté lors de l'entretien préalable.",
  "Non. Aucune situation de handicap ; je signalerai à la formatrice toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible les trois journées consécutives, de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>, en classe virtuelle depuis mon domicile.",
  "J'ai bloqué les trois jours de formation (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) ; je me connecterai depuis une salle calme de mon entreprise.",
  "Je suis disponible sur les trois journées, de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. Ma connexion et mon casque ont été testés.",
  "Je peux suivre les trois journées à distance, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible les trois jours (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>) ; j'ai organisé la garde de mes enfants pendant la formation.",
  "Disponibilité complète sur les trois journées consécutives (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je me connecterai avec ma webcam activée.",
  "Les trois jours de formation, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; je consulterai mes messages pendant les pauses seulement.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> les trois jours. Je dois seulement m'absenter dix minutes le deuxième jour, ce que je signalerai à l'avance.",
  "Je suivrai les trois journées en classe virtuelle (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je réviserai les fiches mémo le soir.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> pendant les trois jours. J'ai prévenu mon équipe de mon indisponibilité.",
];

/** Réponses d'évaluation des besoins propres à la préparation à la Certification Le Robert, différentes pour chaque stagiaire. */
export function getLRBEvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = lrbSeed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilLRB(idx, s.nom, s.prenom);
  const pick = (arr: string[], sel: number) => accorder(arr[rang(base, sel, arr.length)], fem);
  const ent = (txt: string) => accorder(txt, fem);
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
      ? "Formation financée par mon employeur au titre du plan de développement des compétences, ou par mon compte personnel de formation avec son accord si elle se déroule sur le temps de travail ; via Mon Compte Formation, l'entrée en formation intervient au plus tôt 11 jours ouvrés après la validation de la demande."
      : "Formation financée par mon compte personnel de formation, via Mon Compte Formation : l'entrée en formation intervient au plus tôt 11 jours ouvrés après la validation de ma demande.",
    projetPro: ent(profil.projet),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
