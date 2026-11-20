// ---------------------------------------------------------------------------
// « Hygiène alimentaire en restauration commerciale – 14 h » — moteur de réponses HUMANISÉES
// Formation professionnelle non certifiante : évaluation interne, attestation de formation spécifique en
// hygiène alimentaire et certificat de réalisation. 14 h sur 2 jours (7 h par jour), à distance en classe
// virtuelle, 1 à 12 participants d'établissements de restauration commerciale.
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes de
//     l'employeur…), puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes, dans l'ordre des 10 mises en situation, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par mise en situation + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Le Comptoir Gourmand, cité dans les copies, est le snack-restaurant FICTIF du support de cours.
// ---------------------------------------------------------------------------

const normalize = (s?: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Hygiène alimentaire en restauration commerciale – 14 h ».
 * Reconnue par son INTITULÉ seulement : « hygiène alimentaire », « hygiene alimentaire »,
 * « hygiène et sécurité alimentaire », « HACCP » (accents et casse indifférents).
 * Jamais pour un diplôme ou une formation longue de la restauration (CAP, bac, BTS, CQP, TP…), même si
 * son programme parle d'HACCP, ni quand un code de répertoire est saisi.
 * À tester AVANT les règles génériques « restauration », « cuisine », « haccp ».
 */
export function isHYG14Formation(intitule?: string, code?: string): boolean {
  const c = (code || "").toUpperCase().replace(/\s/g, "");
  if (/^R[N]CP\d|^R[S]\d/.test(c)) return false;
  const t = normalize(intitule).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[^a-z0-9']+/g, " ").trim();
  if (!t) return false;
  if (/\b(cap|bac|bts|cqp|tp|r[n]cp|r[s] ?\d{3,4}|titre pro|diplome|bilan de competences|vae)\b/.test(t)) return false;
  return /\bhygiene (et (de la )?securite )?alimentaires?\b/.test(t) || /\bhaccp\b/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function hyg14Seed(nom?: string, prenom?: string): number {
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
  typeof idx === "number" && idx >= 0 ? idx : hyg14Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// dangers et TIAC, temps-température, germes, obligations, contrôle officiel, bonnes pratiques,
// températures et allergènes, HACCP, traçabilité et rappel, plan de maîtrise sanitaire et plan d'action
// ---------------------------------------------------------------------------
export const HYG14_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Selon vous, quels dangers un aliment peut-il présenter pour la santé d'un client ?", reponseAttendue: "Distinction des dangers biologiques (bactéries, virus, parasites, toxines), chimiques (produits de nettoyage, résidus), physiques (verre, métal, bois, plastique) et allergènes ; idée qu'une intoxication peut toucher plusieurs clients à la fois (toxi-infection alimentaire collective)." },
    { question: "Que se passe-t-il, d'après vous, quand un plat cuisiné reste plusieurs heures à température ambiante ?", reponseAttendue: "Multiplication des micro-organismes favorisée par la température, le temps, l'humidité, un pH peu acide et la présence de nutriments ; zone de danger entre +4 °C et +63 °C environ ; le froid ralentit, la cuisson détruit une partie des germes mais pas toutes les toxines." },
    { question: "Connaissez-vous des microbes responsables d'intoxications alimentaires ? Dans quelles situations peuvent-ils se trouver ?", reponseAttendue: "Germes cités et reliés à une situation : salmonelles et œufs crus ou volailles, Listeria et produits conservés longtemps au froid, staphylocoque et mains ou plaies des manipulateurs, Clostridium perfringens et grands volumes refroidis lentement, norovirus et salarié malade, E. coli STEC et viande hachée peu cuite, Bacillus cereus et riz cuit, Campylobacter et volaille crue, Clostridium botulinum et conserves." },
    { question: "Quelles obligations un restaurant doit-il respecter en matière d'hygiène alimentaire, à votre connaissance ?", reponseAttendue: "Responsabilité de l'exploitant ; déclaration d'activité ; formation en hygiène alimentaire d'au moins une personne de l'effectif ; plan de maîtrise sanitaire ; respect des températures ; information écrite sur les 14 allergènes ; traçabilité." },
    { question: "Savez-vous comment se passe un contrôle sanitaire dans un restaurant et ce qui peut en découler ?", reponseAttendue: "Contrôle inopiné par les services de l'État (DDPP ou DDETS-PP), visite des locaux, observation des pratiques, examen des documents ; publication des résultats sur Alim'confiance ; suites possibles graduées jusqu'à la fermeture administrative." },
    { question: "Quelles règles d'hygiène appliquez-vous, ou voyez-vous appliquer, au quotidien en cuisine ?", reponseAttendue: "Tenue propre et coiffe, mains sans bijoux, lavage des mains aux bons moments, état de santé signalé, marche en avant, nettoyage-désinfection selon un plan, lutte contre les nuisibles, gestion des déchets." },
    { question: "À quelles températures conservez-vous les produits frais, surgelés et les plats chauds, et comment gérez-vous les allergènes ?", reponseAttendue: "+3 °C pour les préparations élaborées à l'avance, températures de l'étiquette pour les denrées périssables, -18 °C pour les surgelés, +63 °C au moins pour le maintien au chaud ; refroidissement rapide et remise en température maîtrisés ; décongélation au froid ; allergènes identifiés, contaminations croisées évitées, information écrite du client." },
    { question: "Avez-vous déjà entendu parler de la méthode HACCP ? Que savez-vous de son principe ?", reponseAttendue: "Méthode d'analyse des dangers et de maîtrise des points critiques ; 7 principes ; identification des étapes où un danger doit absolument être maîtrisé (cuisson, refroidissement…), avec une limite, une surveillance, une action corrective et un enregistrement." },
    { question: "Que feriez-vous si vous appreniez qu'un produit que vous avez en stock est rappelé par son fabricant ?", reponseAttendue: "Retrouver le lot grâce à la traçabilité (bons de livraison, étiquettes), retirer et isoler le produit, retirer les préparations concernées, suivre les consignes du rappel, informer l'équipe, enregistrer la non-conformité ; RappelConso comme source officielle." },
    { question: "Votre établissement dispose-t-il de documents d'hygiène (plan de maîtrise sanitaire, relevés, plan de nettoyage…) ? Lesquels vous manquent ?", reponseAttendue: "Connaissance du contenu du plan de maîtrise sanitaire (bonnes pratiques, procédures HACCP, traçabilité, non-conformités) et des enregistrements associés ; diagnostic honnête de ce qui existe et de ce qui manque ; idée d'un plan d'action." },
  ],
  fin: [
    { question: "Quels dangers alimentaires savez-vous maintenant repérer, et qu'est-ce qu'une TIAC ?", reponseAttendue: "Dangers biologiques, chimiques, physiques et allergènes repérés dans des situations concrètes ; TIAC = au moins deux cas groupés de symptômes similaires, en général digestifs, rapportés à une même origine alimentaire, avec déclaration obligatoire ; conséquences sanitaires, juridiques et commerciales." },
    { question: "Comment expliquez-vous la multiplication des micro-organismes et la zone de danger de température ?", reponseAttendue: "Facteurs : température, temps, humidité, pH, oxygène, nutriments ; zone de danger entre +4 °C et +63 °C environ ; le froid ralentit ou bloque sans détruire, la cuisson à cœur détruit les formes végétatives mais pas forcément les spores et certaines toxines ; d'où la rapidité du refroidissement et le maintien des températures." },
    { question: "Quels germes pathogènes reliez-vous à quelles situations de cuisine ?", reponseAttendue: "Associations exactes entre germes et situations (staphylocoque et plaies, perfringens et grands volumes refroidis lentement, Listeria et froid prolongé, Bacillus cereus et riz, norovirus et salarié malade, salmonelles et œufs crus, E. coli STEC et viande hachée, Campylobacter et volaille, botulisme et conserves) avec une mesure de prévention pour chacun." },
    { question: "Quelles obligations réglementaires l'exploitant doit-il respecter ?", reponseAttendue: "Paquet hygiène et responsabilité de l'exploitant ; déclaration d'activité Cerfa 13984 ; formation d'au moins une personne de l'effectif ou dispense justifiée ; plan de maîtrise sanitaire ; températures de l'arrêté du 21 décembre 2009 ; information écrite sur les 14 allergènes ; GBPH du restaurateur comme appui." },
    { question: "Comment se déroule un contrôle officiel et comment l'établissement s'y prépare-t-il ?", reponseAttendue: "Contrôle inopiné, visite, observation, documents demandés, échange de fin de visite ; publication Alim'confiance en quatre niveaux ; suites graduées ; préparation : enregistrements à jour, documents rassemblés, équipe informée." },
    { question: "Quelles bonnes pratiques d'hygiène appliquez-vous désormais en cuisine ?", reponseAttendue: "Méthode des 5 M ; tenue, coiffe, absence de bijoux ; lavage des mains complet aux bons moments ; écartement en cas de maladie ; marche en avant ; plan de nettoyage-désinfection et TACT ; lutte contre les nuisibles ; déconditionnement en zone dédiée." },
    { question: "Comment maîtrisez-vous les températures et les allergènes dans votre établissement ?", reponseAttendue: "+3 °C, températures de l'étiquette, -18 °C, +63 °C ; refroidissement de +63 °C à +10 °C en moins de 2 heures ; remise en température à +63 °C en moins d'une heure ; décongélation au froid ; contrôle à réception ; fiches techniques et tableau des 14 allergènes ; prévention des contaminations croisées ; information écrite y compris en vente à emporter." },
    { question: "Comment appliquez-vous la méthode HACCP à une de vos préparations ?", reponseAttendue: "Diagramme de fabrication, analyse des dangers à chaque étape, CCP justifiés, limite critique, surveillance au thermomètre, action corrective, vérification et enregistrement ; les 7 principes et les 12 étapes cités." },
    { question: "Comment organisez-vous la traçabilité et la gestion d'un rappel ou d'une non-conformité ?", reponseAttendue: "Bons de livraison et étiquettes conservés, produits entamés et préparations étiquetés ; procédure de retrait-rappel : identifier le lot, retirer, isoler, suivre les consignes, informer ; fiche de non-conformité ; information de l'autorité si l'établissement a lui-même mis sur le marché un produit dangereux ; consultation de RappelConso." },
    { question: "Quel plan de maîtrise sanitaire et quel plan d'action avez-vous construits pour votre établissement ?", reponseAttendue: "Plan de maîtrise sanitaire adapté à la taille de l'établissement ; documents et enregistrements identifiés ; plan d'action de cinq actions avec responsable, échéance et preuve ; priorité aux dangers immédiats ; documents prêts pour un contrôle officiel." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle.
// Aucune réponse à 1 au début : au plus 5 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — dangers et TIAC
  [
    ["Les microbes, surtout quand la viande n'est pas fraîche.", 0.5],
    ["Je ne sais pas trop, si le produit sent bon il n'y a pas de danger.", 0],
    ["Les bactéries, et aussi un morceau de verre ou d'os qui tombe dans l'assiette.", 0.5],
    ["Une intoxication alimentaire, mais je ne saurais pas dire d'où elle vient.", 0],
    ["Les allergies, comme les arachides ; et les produits pas assez cuits.", 0.5],
    ["Je pense que le danger vient surtout des produits périmés.", 0],
    ["Il y a les microbes et les produits ménagers mal rincés. J'ai entendu parler d'intoxications collectives sans savoir ce que ça veut dire exactement.", 0.5],
    ["Aucun danger si on achète chez un bon fournisseur.", 0],
    ["La salmonelle, je crois, et les allergies au gluten.", 0.5],
    ["Je n'y ai jamais vraiment réfléchi, je fais confiance au chef.", 0],
    ["Un client peut tomber malade ou se casser une dent sur un corps étranger.", 0.5],
    ["Les aliments ne sont dangereux que s'ils sont moisis.", 0],
  ],
  // Q2 — temps, température, multiplication
  [
    ["Il risque de tourner, mais quelques heures ce n'est pas grave.", 0],
    ["Les microbes se multiplient avec la chaleur, il faut remettre au frigo vite.", 0.5],
    ["Si on le réchauffe bien après, il n'y a plus de problème.", 0],
    ["Je sais qu'il y a une zone de température dangereuse, sans connaître les chiffres.", 0.5],
    ["Ça dépend du plat, mais je ne saurais pas dire lequel est le plus risqué.", 0],
    ["On laisse refroidir à température ambiante avant de mettre au frigo, pour ne pas abîmer le frigo.", 0],
    ["Les bactéries aiment la chaleur et l'humidité ; plus on attend, plus il y en a.", 0.5],
    ["Le froid tue les microbes, donc une fois au frigo c'est réglé.", 0],
    ["Je crois qu'entre le froid et le chaud il ne faut pas laisser traîner les plats.", 0.5],
    ["Pas de risque pour les plats cuits, seulement pour la viande crue.", 0],
    ["Je sais qu'on doit garder les plats chauds au chaud, mais je ne sais pas à quelle température.", 0.5],
    ["Je ne sais pas.", 0],
  ],
  // Q3 — germes
  [
    ["La salmonelle, avec les œufs.", 0.5],
    ["Je n'en connais pas.", 0],
    ["La listeria, pour les femmes enceintes, mais je ne sais pas dans quels aliments.", 0.5],
    ["Les microbes viennent surtout des clients.", 0],
    ["Le staphylocoque, je crois que ça vient des mains.", 0.5],
    ["Le botulisme, dans les conserves, j'en ai entendu parler aux informations.", 0.5],
    ["Les virus de l'hiver, mais ça n'a rien à voir avec la cuisine.", 0],
    ["E. coli, avec les steaks hachés pas assez cuits.", 0.5],
    ["Je connais le mot bactérie, pas les noms.", 0],
    ["La gastro peut se transmettre par un cuisinier malade, je pense.", 0.5],
    ["Les microbes sont tous détruits à la cuisson, donc peu importe leur nom.", 0],
    ["La salmonelle dans le poulet, c'est tout ce que je connais.", 0.5],
  ],
  // Q4 — obligations de l'exploitant
  [
    ["Il faut que la cuisine soit propre, c'est tout ce que je sais.", 0],
    ["Je sais qu'il faut une formation hygiène pour ouvrir un restaurant, mais pas pour qui.", 0.5],
    ["Il faut un extincteur et une licence pour l'alcool.", 0],
    ["Il faut afficher les allergènes, je crois.", 0.5],
    ["C'est le fournisseur qui est responsable si un produit pose problème.", 0],
    ["Il faut des relevés de température du frigo, on me l'a dit à mon ancien travail.", 0.5],
    ["Je ne sais pas, c'est le comptable qui s'occupe des papiers.", 0],
    ["Il faut déclarer le restaurant quelque part, sans savoir où.", 0.5],
    ["Il n'y a pas d'obligation pour un petit snack.", 0],
    ["Il faut un classeur HACCP, je crois que c'est obligatoire.", 0.5],
    ["Je pense que la mairie donne une autorisation et c'est tout.", 0],
    ["L'exploitant est responsable de ce qu'il sert, je pense, mais je ne connais pas les textes.", 0.5],
  ],
  // Q5 — contrôle officiel
  [
    ["Je n'ai jamais vu de contrôle.", 0],
    ["Des inspecteurs viennent sans prévenir et regardent la cuisine et les frigos.", 0.5],
    ["Ils préviennent une semaine avant, donc on a le temps de nettoyer.", 0],
    ["Je sais qu'on peut voir le résultat des contrôles sur internet, mais je ne connais pas le site.", 0.5],
    ["Le contrôle, c'est l'URSSAF.", 0],
    ["Ils peuvent fermer le restaurant si c'est très sale.", 0.5],
    ["Ils donnent une amende et c'est tout.", 0],
    ["Ils demandent des documents, je crois, comme les températures.", 0.5],
    ["Je ne sais pas qui fait ces contrôles.", 0],
    ["Il y a une note affichée sur certaines vitrines, je pense que c'est lié.", 0.5],
    ["Les contrôles ne concernent que les grands restaurants.", 0],
    ["Ils regardent les dates sur les produits et la propreté.", 0.5],
  ],
  // Q6 — bonnes pratiques d'hygiène
  [
    ["Je me lave les mains quand elles sont sales.", 0],
    ["Tenue propre, cheveux attachés, lavage des mains en arrivant.", 0.5],
    ["On nettoie à la fin du service, ça suffit.", 0],
    ["Je mets une charlotte et je ne porte pas de bijoux, mais je ne connais pas la marche en avant.", 0.5],
    ["J'utilise un torchon pour tout, c'est plus pratique.", 0],
    ["On sépare la viande crue et les légumes, je crois que c'est important.", 0.5],
    ["Je travaille même quand je suis malade, sinon l'équipe est en difficulté.", 0],
    ["On a un planning de ménage, mais personne ne le signe.", 0.5],
    ["Je ne sais pas ce que veut dire désinfecter par rapport à nettoyer.", 0],
    ["Je me lave les mains après les toilettes et après avoir touché la viande crue.", 0.5],
    ["Les gants suffisent, pas besoin de se laver les mains.", 0],
    ["On a déjà eu des souris, on a mis des pièges, sans plus.", 0.5],
  ],
  // Q7 — températures et allergènes
  [
    ["Le frigo est réglé, je ne regarde pas la température.", 0],
    ["Le frais au frigo vers +4 °C, le surgelé au congélateur, je ne sais pas pour le chaud.", 0.5],
    ["On décongèle sur le plan de travail le matin, c'est plus rapide.", 0],
    ["Je crois qu'il faut garder les plats chauds au-dessus de +60 °C.", 0.5],
    ["Les allergènes, ce n'est pas mon problème, le client doit le dire.", 0],
    ["On a une liste des allergènes quelque part, mais elle n'est pas à jour.", 0.5],
    ["Je ne connais pas les températures, je fais au toucher.", 0],
    ["Le congélateur doit être à -18 °C, je l'ai lu sur un emballage.", 0.5],
    ["On remet les plats au frigo encore chauds, couvercle fermé.", 0],
    ["Pour un client allergique, on enlève l'ingrédient de l'assiette.", 0],
    ["Je sais qu'il faut refroidir vite un plat cuisiné, mais je ne sais pas comment.", 0.5],
    ["Il y a des allergènes à signaler, comme le gluten et les fruits à coque, mais je ne sais pas combien.", 0.5],
  ],
  // Q8 — HACCP
  [
    ["Jamais entendu parler.", 0],
    ["C'est un classeur avec des fiches à remplir.", 0.5],
    ["C'est un diplôme, je crois.", 0],
    ["C'est une méthode pour éviter les intoxications, mais je ne connais pas les étapes.", 0.5],
    ["C'est une marque de produit d'entretien.", 0],
    ["J'ai entendu parler de points critiques, comme la cuisson.", 0.5],
    ["Je ne sais pas.", 0],
    ["Il faut noter les températures, c'est ça l'HACCP pour moi.", 0.5],
    ["C'est pour les usines, pas pour un snack.", 0],
    ["C'est une méthode d'analyse des dangers, j'ai vu le mot dans une offre d'emploi.", 0.5],
    ["C'est le contrôle de l'inspecteur.", 0],
    ["Je sais qu'il y a sept principes, sans pouvoir les citer.", 0.5],
  ],
  // Q9 — traçabilité et rappel
  [
    ["Je le cuis bien et je l'utilise quand même.", 0],
    ["Je le jette et je préviens mon responsable.", 0.5],
    ["Je ne saurais pas comment le savoir.", 0],
    ["Je mets le produit de côté et j'appelle le fournisseur.", 0.5],
    ["Je le vends rapidement avant que ça se sache.", 0],
    ["Je regarde le numéro de lot, si je l'ai encore.", 0.5],
    ["On ne garde pas les bons de livraison, donc on ne pourrait pas savoir.", 0],
    ["J'ai déjà vu des rappels au supermarché, je pense qu'il faut ramener le produit.", 0.5],
    ["Je ne sais pas ce qu'est un rappel.", 0],
    ["On garde les étiquettes des produits entamés, ça doit servir à ça.", 0.5],
    ["Ça n'arrive jamais avec nos fournisseurs.", 0],
    ["Je retire le produit et je vérifie si on l'a déjà utilisé dans des plats.", 0.5],
  ],
  // Q10 — documents et plan de maîtrise sanitaire
  [
    ["Je ne sais pas ce qu'est un plan de maîtrise sanitaire.", 0],
    ["On a des relevés de températures du frigo, c'est tout.", 0.5],
    ["Pas de documents, on n'en a jamais eu besoin.", 0],
    ["Il y a un classeur hygiène, mais personne ne le remplit vraiment.", 0.5],
    ["Le patron s'en occupe, je ne sais pas.", 0],
    ["Je crée mon établissement, je n'ai encore aucun document.", 0.5],
    ["Les documents ne servent qu'en cas de contrôle.", 0],
    ["On a un plan de nettoyage affiché, mais pas de traçabilité.", 0.5],
    ["Je ne vois pas à quoi servirait un plan d'action.", 0],
    ["On a une liste des allergènes et des relevés, il manque sûrement d'autres choses.", 0.5],
    ["Tout est dans la tête du chef.", 0],
    ["J'aimerais savoir quels documents sont obligatoires pour être prêt{e} en cas de contrôle.", 0.5],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  [
    ["Quatre familles de dangers : biologiques, chimiques, physiques et allergènes. Une TIAC, c'est au moins deux cas groupés de symptômes similaires rapportés à une même origine alimentaire.", 1],
    ["Biologique : une bactérie ; chimique : un produit de nettoyage ; physique : un éclat de verre ; allergène : des fruits à coque dans un pesto.", 1],
    ["Une TIAC doit être déclarée à l'autorité sanitaire ; pour le restaurant, elle peut entraîner une enquête, une fermeture et une perte de clientèle.", 1],
    ["J'ai appris qu'un aliment contaminé peut avoir un aspect, une odeur et un goût normaux.", 1],
    ["Les allergènes sont un danger à part entière : 14 allergènes majeurs à signaler aux clients.", 1],
    ["Dans le cas du Comptoir Gourmand, j'ai repéré la planche de poulet cru réutilisée pour les crudités : danger biologique par contamination croisée.", 1],
    ["Les dangers physiques, ce sont les agrafes, le verre, les morceaux de plastique : on déconditionne les cartons hors de la cuisine.", 0.5],
    ["Une intoxication collective a des conséquences sanitaires, juridiques et commerciales pour l'établissement.", 1],
    ["Les résidus de désinfectant sur une planche mal rincée sont un danger chimique.", 0.5],
    ["Je sais maintenant classer un danger et dire la conséquence pour le client.", 0.5],
    ["Une TIAC n'est pas un cas isolé : il faut au moins deux personnes malades après le même repas.", 1],
    ["Les dangers peuvent venir des matières premières, du personnel, du matériel, des locaux et des méthodes.", 1],
  ],
  [
    ["Les bactéries se multiplient surtout entre +4 °C et +63 °C, avec le temps, l'humidité et un aliment peu acide.", 1],
    ["Le froid ralentit les bactéries sans les tuer ; la cuisson en détruit beaucoup, mais pas toujours les toxines.", 1],
    ["Un plat en grand volume refroidit lentement : on le répartit en petits bacs peu profonds ou on utilise la cellule de refroidissement.", 1],
    ["Plus un plat reste longtemps dans la zone de danger, plus les bactéries se multiplient : il faut la traverser vite.", 1],
    ["Les facteurs de multiplication : température, temps, humidité, pH, oxygène.", 1],
    ["La salade de riz au poulet doit rester au froid et sortir par petites quantités.", 0.5],
    ["Certaines bactéries forment des spores qui résistent à la cuisson.", 1],
    ["La multiplication est la plus rapide autour de la température du corps.", 0.5],
    ["L'acidité freine les bactéries, c'est pour ça que certaines préparations se conservent mieux.", 0.5],
    ["Réchauffer un plat ne rattrape pas une mauvaise conservation, car certaines toxines résistent.", 1],
    ["J'ai compris pourquoi on ne laisse pas refroidir les plats toute la nuit sur le plan de travail.", 0.5],
    ["Le congélateur bloque la multiplication, mais les bactéries repartent à la décongélation.", 1],
  ],
  [
    ["Staphylocoque : mains, nez, plaies ; sa toxine résiste à la chaleur, donc on protège les plaies.", 1],
    ["Clostridium perfringens : plats en sauce en grand volume refroidis lentement.", 1],
    ["Listeria se multiplie même au réfrigérateur : on respecte les dates après ouverture.", 1],
    ["Bacillus cereus : riz cuit laissé à température ambiante.", 1],
    ["Norovirus : un salarié malade doit être écarté de la manipulation des aliments.", 1],
    ["Salmonelles : œufs crus et volailles ; on utilise des ovoproduits pasteurisés pour les préparations sans cuisson.", 1],
    ["E. coli STEC : steak haché pas assez cuit, risque grave chez l'enfant.", 1],
    ["Campylobacter : volaille crue, planches séparées pour éviter la contamination croisée.", 1],
    ["Clostridium botulinum : conserves mal stérilisées, sans oxygène.", 1],
    ["Je relie maintenant chaque germe à une situation de cuisine, même si je dois encore revoir quelques noms.", 0.5],
    ["Les germes viennent des aliments, du personnel et de l'environnement : la prévention passe par les bonnes pratiques.", 0.5],
    ["Le staphylocoque et le Bacillus cereus produisent des toxines : la cuisson après coup ne suffit pas.", 1],
  ],
  [
    ["L'exploitant est responsable de la sécurité des aliments qu'il sert, selon le paquet hygiène.", 1],
    ["Déclaration d'activité Cerfa 13984 auprès de la DDPP ou de la DDETS-PP, à mettre à jour en cas de changement.", 1],
    ["Au moins une personne de l'effectif doit être formée en hygiène alimentaire, sauf dispense prévue par les textes.", 1],
    ["Information écrite sur les 14 allergènes pour les plats non préemballés, y compris à emporter.", 1],
    ["Les températures sont fixées par l'arrêté du 21 décembre 2009.", 1],
    ["Il faut un plan de maîtrise sanitaire : bonnes pratiques, HACCP, traçabilité, non-conformités.", 1],
    ["Le GBPH du restaurateur aide à construire le plan de maîtrise sanitaire.", 0.5],
    ["La formation doit durer 14 heures et l'attestation n'est reconnue que si l'organisme est enregistré auprès de la DRAAF.", 1],
    ["Une dispense est possible avec trois ans d'expérience comme gestionnaire ou exploitant dans le secteur alimentaire.", 1],
    ["Le règlement 852/2004 impose des procédures fondées sur les principes HACCP.", 0.5],
    ["Si je vends une partie de mes préparations à d'autres professionnels, je dois vérifier si un agrément ou une dérogation est nécessaire.", 1],
    ["Je sais maintenant quelles démarches faire avant la reprise de mon établissement.", 0.5],
  ],
  [
    ["Le contrôle est inopiné : visite des locaux, observation des pratiques, températures, documents.", 1],
    ["Les résultats sont publiés sur Alim'confiance en quatre niveaux, de très satisfaisant à corriger de manière urgente.", 1],
    ["Les suites vont de l'avertissement à la mise en demeure, jusqu'à la fermeture en cas de danger.", 1],
    ["Depuis 2024, la sécurité sanitaire des aliments relève d'une police unique sous l'autorité du ministère chargé de l'agriculture.", 1],
    ["Pour être prêts, on tient les enregistrements chaque jour et on range les documents au même endroit.", 1],
    ["L'inspecteur peut demander l'attestation de formation en hygiène et le plan de maîtrise sanitaire.", 1],
    ["J'accueille l'inspecteur et je préviens tout de suite le responsable.", 0.5],
    ["Le niveau Alim'confiance est visible par les clients, c'est un enjeu d'image.", 0.5],
    ["En restauration commerciale, ce sont la DDPP ou la DDETS-PP qui contrôlent.", 1],
    ["Un procès-verbal et des poursuites sont possibles si les manquements sont graves.", 1],
    ["Le contrôle n'est pas une sanction automatique : il y a un échange en fin de visite.", 0.5],
    ["Je sais lire une fiche Alim'confiance et comprendre ce qu'elle signifie.", 0.5],
  ],
  [
    ["Je classe les écarts avec les 5 M : main-d'œuvre, milieu, matériel, matières premières, méthodes.", 1],
    ["Lavage des mains complet : eau, savon, frottage, rinçage, essuie-mains à usage unique, aux bons moments.", 1],
    ["Tenue propre, coiffe, pas de bijoux, et je signale toute maladie à mon responsable.", 1],
    ["Marche en avant : du sale vers le propre sans croisement, dans l'espace ou dans le temps.", 1],
    ["Nettoyage-désinfection selon le TACT : température, action mécanique, concentration, temps de contact.", 1],
    ["Je dilue le désinfectant selon la fiche technique, plus au jugé.", 1],
    ["On déconditionne les cartons dans une zone dédiée avant d'entrer en cuisine.", 1],
    ["Lutte contre les nuisibles : pièges, relevés, prestataire ou procédure interne.", 0.5],
    ["Fini le torchon multi-usage : essuie-mains à usage unique.", 0.5],
    ["Les gants ne remplacent pas le lavage des mains.", 1],
    ["Poubelles à commande non manuelle, vidées et nettoyées régulièrement.", 0.5],
    ["Le plan de nettoyage est affiché et signé après chaque tâche.", 0.5],
  ],
  [
    ["+3 °C pour les préparations élaborées à l'avance, -18 °C pour les surgelés, +63 °C au moins pour le chaud.", 1],
    ["Refroidissement de +63 °C à +10 °C en moins de 2 heures, puis stockage au froid.", 1],
    ["Remise en température à +63 °C au moins en moins d'une heure.", 1],
    ["Décongélation au réfrigérateur ou en chambre froide, jamais sur le plan de travail.", 1],
    ["À réception, je contrôle la température ; un produit frais trop chaud est refusé ou mis à l'écart, et je remplis une fiche.", 1],
    ["Tableau des 14 allergènes par plat, mis à jour à chaque changement de recette.", 1],
    ["Pour un client allergique : poste nettoyé, ustensiles propres, préparation séparée, emballage identifié.", 1],
    ["En vente à emporter aussi, l'information sur les allergènes est donnée par écrit avant l'achat.", 1],
    ["Les denrées périssables sont conservées à la température indiquée sur l'étiquette.", 0.5],
    ["En cas de doute sur un allergène, je ne garantis pas son absence.", 0.5],
    ["Je relève les températures des enceintes froides chaque jour.", 0.5],
    ["Les préparations sont étiquetées avec leur date de fabrication et leur date limite.", 0.5],
  ],
  [
    ["HACCP : analyse des dangers et points critiques pour leur maîtrise, avec 7 principes.", 1],
    ["Les 7 principes : analyser les dangers, déterminer les CCP, fixer les limites, surveiller, corriger, vérifier, documenter.", 1],
    ["Pour le burger maison, le CCP est la cuisson à cœur de la viande hachée.", 1],
    ["Si la limite n'est pas atteinte, je poursuis la cuisson ou j'écarte le produit, et j'enregistre.", 1],
    ["Je commence toujours par le diagramme de fabrication de la recette.", 1],
    ["La sonde du thermomètre est désinfectée avant chaque mesure.", 0.5],
    ["Un CCP est une étape où la maîtrise est essentielle pour éliminer ou réduire un danger.", 1],
    ["Les autres étapes sont maîtrisées par les bonnes pratiques d'hygiène.", 0.5],
    ["La méthode compte 12 étapes, dont les 7 principes.", 1],
    ["Pour le plat du jour cuisiné la veille, le refroidissement rapide est un point critique.", 1],
    ["Sans enregistrement, la surveillance ne peut pas être prouvée.", 0.5],
    ["Je sais maintenant faire une analyse des dangers simple sur une de mes recettes.", 0.5],
  ],
  [
    ["Je garde les bons de livraison et les étiquettes pour retrouver un lot.", 1],
    ["En cas de rappel : je vérifie le lot, je retire, j'isole avec « ne pas utiliser » et je suis les consignes.", 1],
    ["Je consulte RappelConso, le site officiel des rappels.", 1],
    ["Les produits entamés et les préparations sont étiquetés avec la date d'ouverture ou de fabrication.", 1],
    ["Chaque non-conformité est notée sur une fiche : produit, lot, actions, responsable.", 1],
    ["Si j'ai moi-même mis sur le marché un produit dangereux, je le retire et j'informe l'autorité.", 1],
    ["Je retire aussi les préparations qui contiennent le produit rappelé.", 0.5],
    ["La traçabilité relie le lot du fournisseur aux plats servis.", 1],
    ["Je préviens l'équipe dès qu'un produit est retiré.", 0.5],
    ["Une photo de l'étiquette suffit si je ne garde pas l'emballage.", 0.5],
    ["Je vérifie aussi ce qui a déjà été utilisé et les dates de service.", 0.5],
    ["La procédure de retrait-rappel fait partie du plan de maîtrise sanitaire.", 0.5],
  ],
  [
    ["Mon plan de maîtrise sanitaire regroupe bonnes pratiques, HACCP, traçabilité et non-conformités.", 1],
    ["Mon plan d'action a cinq actions, chacune avec un responsable, une échéance et une preuve.", 1],
    ["Priorité aux dangers immédiats : températures, état de santé du personnel, allergènes.", 1],
    ["J'ai listé les documents à présenter lors d'un contrôle officiel.", 1],
    ["Les autocontrôles prouvent que l'établissement maîtrise l'hygiène au quotidien.", 1],
    ["Le plan de maîtrise sanitaire évolue avec la carte, les équipements et l'équipe.", 1],
    ["J'ai commencé par le tableau des allergènes et les relevés de températures.", 0.5],
    ["L'attestation de formation est classée avec le plan de maîtrise sanitaire.", 0.5],
    ["Je m'appuie sur le GBPH du restaurateur pour adapter mon plan à la taille de mon établissement.", 1],
    ["J'ai prévu de revoir mon plan d'action dans un mois.", 0.5],
    ["La culture de la sécurité des aliments, c'est l'engagement de toute l'équipe, direction comprise.", 1],
    ["Mon plan d'action est daté et affiché dans le bureau.", 0.5],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [54, 51, 45, 45, 4, 8, 57, 36, 47, 13];

export function getHYG14AutoAnswers(
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
export function hyg14NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6). */
export function hyg14BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((hyg14NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `hyg14BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function hyg14ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = hyg14BonnesQcmDebut(n, idx, nom, prenom);
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
export function hyg14NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie stagiaire), attentes, missions et contribution (partie employeur).
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
    besoin: "Répondre à l'obligation de formation en hygiène alimentaire avant la reprise d'un snack-restaurant.",
    objectif: "Je veux connaître toutes mes obligations d'exploitant et repartir avec un plan de maîtrise sanitaire adapté à mon futur établissement.",
    projet: "Elle me permettra d'ouvrir mon établissement en règle et de former ensuite mon équipe aux bonnes pratiques.",
    attentes: "L'entreprise attend que {le_sal} mette en place le plan de maîtrise sanitaire de l'établissement dès l'ouverture.",
    missions: "Gestion de l'établissement, achats, organisation de la cuisine et du service, relations avec les fournisseurs.",
    contribution: "Elle doit sécuriser l'ouverture de l'établissement et préparer le premier contrôle officiel.",
  },
  {
    besoin: "Maîtriser les températures de cuisson, de refroidissement et de remise en température des plats préparés à l'avance.",
    objectif: "Mon objectif est de savoir refroidir et réchauffer correctement le plat du jour et de tenir les enregistrements sans y passer des heures.",
    projet: "Elle m'aidera à prendre davantage de responsabilités en cuisine.",
    attentes: "Nous attendons que {le_sal} applique et fasse appliquer les règles de températures en cuisine.",
    missions: "Préparation des plats du jour, cuissons, organisation du poste chaud, réception des marchandises.",
    contribution: "Elle doit réduire les pertes et les risques liés aux plats préparés à l'avance.",
  },
  {
    besoin: "Comprendre les règles d'hygiène de base pour les appliquer sans erreur au quotidien.",
    objectif: "Je souhaite comprendre pourquoi on applique les règles d'hygiène, pas seulement les suivre parce qu'on me le demande.",
    projet: "Elle me permettra d'évoluer vers un poste plus qualifié en cuisine.",
    attentes: "L'entreprise attend que {le_sal} respecte les bonnes pratiques d'hygiène à son poste.",
    missions: "Mise en place, préparations froides, plonge, nettoyage des postes de travail.",
    contribution: "Elle doit fiabiliser l'hygiène du poste de préparation froide.",
  },
  {
    besoin: "Adapter les règles d'hygiène et de températures à un food-truck, avec peu d'espace et sans chambre froide.",
    objectif: "Mon objectif est d'organiser mon food-truck pour respecter la chaîne du froid et la marche en avant malgré le manque de place.",
    projet: "Elle m'aidera à développer mon activité sur les marchés et les événements en toute sécurité.",
    attentes: "L'entreprise attend que {le_sal} sécurise la chaîne du froid lors des déplacements et des événements.",
    missions: "Préparation et vente sur place, approvisionnement, transport des denrées, nettoyage du véhicule.",
    contribution: "Elle doit permettre de répondre aux exigences des organisateurs d'événements et des contrôles.",
  },
  {
    besoin: "Savoir informer correctement les clients sur les allergènes, en salle comme à emporter.",
    objectif: "Je veux pouvoir répondre avec certitude à un client allergique et savoir quand je ne dois pas garantir l'absence d'un allergène.",
    projet: "Elle me permettra d'être plus à l'aise face aux demandes particulières des clients.",
    attentes: "Nous attendons que {le_sal} sache renseigner les clients sur les allergènes et transmettre leurs demandes à la cuisine.",
    missions: "Accueil et service en salle, prise de commande, service au bar, vente à emporter.",
    contribution: "Elle doit éviter tout incident allergique et rassurer la clientèle.",
  },
  {
    besoin: "Préparer un projet de création de restaurant : démarches, locaux et organisation sanitaire.",
    objectif: "Mon objectif est de concevoir mon futur local et mon organisation en respectant la marche en avant et les obligations dès le départ.",
    projet: "Elle m'aidera à présenter un projet solide à ma banque et à mes futurs associés.",
    attentes: "Nous attendons que {le_sal} intègre les exigences sanitaires dans le projet de création.",
    missions: "Étude du projet, choix du local et des équipements, démarches administratives.",
    contribution: "Elle doit éviter des travaux de mise en conformité coûteux après l'ouverture.",
  },
  {
    besoin: "Sécuriser la préparation et la livraison de plats de traiteur à l'avance.",
    objectif: "Je souhaite maîtriser le refroidissement, le transport et la remise en température des plats livrés aux clients.",
    projet: "Elle me permettra d'accepter des commandes plus importantes en toute sécurité.",
    attentes: "L'entreprise attend que {le_sal} maîtrise la chaîne du froid et du chaud de la préparation à la livraison.",
    missions: "Préparation des commandes de traiteur, conditionnement, livraison, relation client.",
    contribution: "Elle doit fiabiliser les livraisons et la traçabilité des plats préparés.",
  },
  {
    besoin: "Gérer l'hygiène du rayon traiteur et de la préparation sur place d'une supérette.",
    objectif: "Mon objectif est de mettre en place des relevés de températures, un étiquetage correct et une traçabilité simple pour le rayon.",
    projet: "Elle m'aidera à prendre en charge le rayon frais de manière autonome.",
    attentes: "Nous attendons que {le_sal} tienne les enregistrements d'hygiène du rayon traiteur.",
    missions: "Préparation de sandwichs et de salades, mise en rayon, contrôle des dates, nettoyage du laboratoire.",
    contribution: "Elle doit réduire la casse et sécuriser le rayon en cas de contrôle.",
  },
  {
    besoin: "Comprendre la méthode HACCP pour construire les procédures de l'établissement.",
    objectif: "Je veux savoir faire une analyse des dangers sur nos recettes principales et définir les points critiques.",
    projet: "Elle me permettra d'assurer le rôle de référent{e} hygiène de l'équipe.",
    attentes: "L'entreprise attend que {le_sal} formalise les procédures HACCP de la cuisine.",
    missions: "Encadrement de la cuisine, élaboration des fiches techniques, commandes, contrôle de la qualité.",
    contribution: "Elle doit doter l'établissement de procédures écrites et suivies.",
  },
  {
    besoin: "Se préparer à un contrôle officiel après un premier contrôle avec des remarques.",
    objectif: "Mon objectif est de corriger les écarts relevés lors du dernier contrôle et d'obtenir un meilleur niveau sur Alim'confiance.",
    projet: "Elle m'aidera à reprendre en main l'organisation sanitaire de l'établissement.",
    attentes: "Nous attendons que {le_sal} mette en œuvre les mesures correctives demandées lors du dernier contrôle.",
    missions: "Responsabilité de l'établissement, encadrement de l'équipe, suivi administratif.",
    contribution: "Elle doit améliorer le résultat du prochain contrôle et l'image de l'établissement.",
  },
  {
    besoin: "Organiser la traçabilité et savoir réagir à un rappel de produit.",
    objectif: "Je souhaite mettre en place une façon simple de garder les étiquettes et les bons de livraison et de retrouver un lot rapidement.",
    projet: "Elle me permettra de gérer les stocks et les réceptions en toute autonomie.",
    attentes: "L'entreprise attend que {le_sal} organise la réception, le stockage et la traçabilité des marchandises.",
    missions: "Réception des livraisons, rangement des réserves, inventaires, gestion des dates.",
    contribution: "Elle doit sécuriser les réceptions et faciliter la gestion d'un éventuel rappel.",
  },
  {
    besoin: "Mettre à jour ses connaissances en hygiène après plusieurs années sans formation.",
    objectif: "Mon objectif est de revoir les températures, les germes et les règles récentes sur les allergènes et les contrôles.",
    projet: "Elle m'aidera à transmettre des pratiques à jour aux nouveaux salariés.",
    attentes: "L'entreprise attend que {le_sal} actualise ses pratiques et les transmette à l'équipe.",
    missions: "Production en cuisine, accueil et formation des nouveaux, plan de nettoyage.",
    contribution: "Elle doit harmoniser les pratiques d'hygiène de toute l'équipe.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilHYG14(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

function entAccords(txt: string, fem: boolean): string {
  return accorder(txt.replace(/\{le_sal\}/g, fem ? "la salariée" : "le salarié"), fem);
}

export function getHYG14Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return entAccords(profilHYG14(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production du stagiaire sur le Comptoir Gourmand puis son établissement
// Indices : 0 dangers et TIAC, 1 temps-température, 2 germes, 3 obligations, 4 contrôle officiel,
//           5 bonnes pratiques, 6 températures et allergènes, 7 HACCP, 8 traçabilité, 9 PMS et plan d'action ;
//           8 productions par banque.
// La k-ième production de chaque banque suit le même participant fictif : un stagiaire garde le même
// poste d'un exercice à l'autre.
//   0 gérant·e de snack · 1 cuisinier·ère · 2 commis · 3 exploitant·e de food-truck
//   4 serveur·se en café-brasserie · 5 porteur·se de projet · 6 traiteur · 7 responsable de rayon traiteur
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Dangers et TIAC
  [
    "Je gère un snack. Au Comptoir Gourmand, j'ai classé la livraison laissée au soleil et la planche du poulet cru en danger biologique, le dégraissant en danger chimique, l'agrafe en danger physique et le pesto en danger allergène. Chez moi, le danger le plus fréquent est la livraison posée devant la porte avant l'ouverture. Une TIAC, ce sont au moins deux clients malades après le même repas : enquête, fermeture possible et perte de clientèle.",
    "Je travaille en cuisine. J'ai repéré cinq dangers dans la matinée du Comptoir Gourmand ; le plus grave pour moi est la planche réutilisée, danger biologique par contamination croisée. Dans ma cuisine, le danger chimique vient des produits rangés au-dessus du plan de travail. J'ai retenu qu'une TIAC doit être déclarée et peut coûter très cher à l'établissement.",
    "Je suis commis. Je ne savais pas qu'une agrafe était un danger physique : chez nous, on ouvre les sachets de salade sur le plan de travail. Danger allergène : le pesto avec des fruits à coque. Conséquence d'une TIAC pour le restaurant : des clients malades, un contrôle et une mauvaise réputation.",
    "J'exploite un food-truck. Pour moi, le danger biologique principal est la rupture du froid pendant le transport, comme la livraison au soleil du Comptoir Gourmand. Danger chimique : le bidon de produit rangé près des denrées faute de place. Une TIAC lors d'un événement toucherait beaucoup de clients d'un coup.",
    "Je travaille en salle et au bar dans un café-brasserie. Le danger que je rencontre le plus est le danger allergène : la question du client sur le pesto m'arrive souvent. J'ai aussi classé l'agrafe en danger physique et le dégraissant en danger chimique. Une TIAC entraîne des conséquences sanitaires, juridiques et commerciales.",
    "Je prépare un projet de reprise de restaurant. Sur le cas du Comptoir Gourmand, j'ai classé les quatre types de dangers et compris qu'un aliment contaminé peut avoir l'air normal. Pour mon futur établissement, je prévois une zone de réception à l'ombre et une zone de déconditionnement. Une TIAC pourrait mettre fin à mon projet.",
    "Je prépare des plats de traiteur. Danger biologique : les plats transportés sans maintien au froid, comme la livraison laissée au soleil. Danger physique : les agrafes et les morceaux d'emballage. Une TIAC lors d'un buffet de mariage aurait des conséquences graves pour ma clientèle et mon image.",
    "Je m'occupe du rayon traiteur d'une supérette. J'ai repéré le danger chimique du dégraissant et le danger biologique de la planche de poulet cru. Dans notre laboratoire, les produits ménagers sont rangés trop près des sandwichs. Une TIAC liée au rayon ferait fuir les clients du magasin.",
  ],
  // 1 — Temps, température, multiplication
  [
    "La salade de riz au poulet laissée cinq heures sur le passe-plat est en pleine zone de danger, entre +4 °C et +63 °C : humide, riche, peu acide, elle favorise la multiplication. Le bac de sauce fermé et volumineux refroidit trop lentement. Chez moi, je prévois une vitrine réfrigérée pour la vente à emporter et un refroidissement rapide de la température de cuisson à +10 °C en moins de 2 heures.",
    "Le bac de sauce du plat du jour garde longtemps une température favorable aux bactéries. J'utiliserais la cellule de refroidissement ou des petits bacs peu profonds. Le froid ne tue pas les bactéries, il les ralentit ; la cuisson détruit beaucoup de germes mais pas toutes les toxines.",
    "Je ne savais pas que la température du corps est la plus favorable aux bactéries. Facteurs retenus : température, temps, humidité, pH, oxygène. Pour la salade de riz, je la garderais à +3 °C et je la sortirais par petites quantités.",
    "Dans mon food-truck, la température monte vite l'été : j'ai compris qu'il faut limiter le temps hors du froid. La salade de riz doit rester en vitrine réfrigérée. Le plat en sauce préparé la veille doit être refroidi rapidement avant le transport.",
    "En salle, je vois parfois des plats attendre sur le passe : c'est la zone de danger de température. J'ai noté la règle : refroidissement de +63 °C à +10 °C en moins de 2 heures. La cuisson à cœur détruit les formes végétatives, pas forcément les spores.",
    "Pour mon futur restaurant, je prévois une cellule de refroidissement, car le bac de sauce refroidi toute la nuit est une erreur fréquente. Les bactéries se multiplient avec le temps et la température ; le froid ralentit sans détruire.",
    "Pour le traiteur, le risque principal est le temps entre la cuisson et la livraison. Je refroidis rapidement, je transporte en caisson réfrigéré et je contrôle la température à la livraison. L'acidité freine les bactéries, mais ne suffit pas à elle seule.",
    "Au rayon traiteur, les salades composées restent parfois trop longtemps hors du froid pendant la mise en rayon. Je retiens la zone de température dangereuse et je limite le temps de préparation à température ambiante à de petites quantités.",
  ],
  // 2 — Germes
  [
    "Mes associations : Staphylococcus aureus et la plaie au doigt, Clostridium perfringens et le bœuf bourguignon refroidi lentement, Listeria et le saumon fumé gardé longtemps. Chez moi, le germe le plus probable est le staphylocoque : je prévois pansements et gants pour les plaies.",
    "En cuisine, le germe que je crains le plus est Clostridium perfringens, car je prépare des plats en sauce la veille. J'ai aussi relié Bacillus cereus au riz cuit et les salmonelles au tiramisu aux œufs crus. Prévention : refroidissement rapide et ovoproduits pasteurisés.",
    "J'ai appris le nom de chaque germe : le norovirus pour le salarié malade, Campylobacter pour la planche de volaille crue, E. coli STEC pour le steak haché rosé servi à un enfant. Je ne viendrai plus travailler malade sans prévenir.",
    "Pour mon food-truck, les germes à surveiller sont E. coli STEC sur les steaks hachés et Bacillus cereus sur le riz. J'ai associé le botulisme aux conserves maison : je ne ferai plus de bocaux moi-même.",
    "Au bar, le germe qui me concerne est le staphylocoque, transmis par les mains. Listeria peut se multiplier au réfrigérateur, ce qui m'a surpris{e}. Prévention : lavage des mains et respect des dates après ouverture.",
    "Pour mon projet, j'ai noté les neuf germes et une mesure de prévention pour chacun. Le germe le plus important pour une carte de burgers est E. coli STEC : cuisson à cœur de la viande hachée.",
    "En traiteur, les germes à risque sont Clostridium perfringens pour les grands volumes et Listeria pour les produits conservés longtemps au froid. Je refroidis vite et je limite les durées de conservation.",
    "Pour le rayon traiteur, Listeria est le germe principal, car les produits restent plusieurs jours au froid. J'ai aussi relié les salmonelles aux œufs et Campylobacter à la volaille crue. Prévention : dates respectées, planches séparées.",
  ],
  // 3 — Obligations de l'exploitant
  [
    "Mes obligations d'exploitant : déclaration d'activité Cerfa 13984 auprès de la DDPP, à mettre à jour à la reprise ; au moins une personne formée en hygiène alimentaire ; plan de maîtrise sanitaire ; information écrite sur les 14 allergènes ; respect des températures. Je suis responsable de la sécurité de ce que je sers.",
    "Je ne savais pas que l'obligation de formation concerne au moins une personne de l'effectif. Chez nous, c'est le gérant ; je suivrai aussi la formation pour le remplacer. Textes : paquet hygiène, arrêté du 21 décembre 2009 pour les températures.",
    "J'ai retenu que l'exploitant est responsable, mais que chaque salarié applique les règles. L'obligation d'information sur les allergènes vient du règlement 1169/2011 et du décret 2015-447.",
    "Pour mon food-truck, j'ai vérifié mes obligations : déclaration d'activité, formation, plan de maîtrise sanitaire adapté, information sur les allergènes. Je dois mettre à jour ma déclaration si je change d'activité.",
    "Au café-brasserie, l'obligation qui me concerne le plus est l'information écrite sur les allergènes. Le gérant détient l'attestation de formation. Le GBPH du restaurateur aide à construire le plan de maîtrise sanitaire.",
    "Pour ma reprise, je ferai la déclaration d'activité avant l'ouverture et je garderai mon attestation de formation. Je n'ai pas trois ans d'expérience comme exploitant, donc je ne suis pas dispensé{e} de cette obligation.",
    "En traiteur, si je vends des plats à d'autres professionnels, je dois vérifier si un agrément sanitaire ou une dérogation est nécessaire : c'est une obligation que je ne connaissais pas.",
    "Pour la supérette, la déclaration d'activité couvre le rayon de préparation ; la formation est une obligation pour au moins une personne. Je ferai le point avec le responsable du magasin.",
  ],
  // 4 — Contrôle officiel et Alim'confiance
  [
    "Lors du contrôle au Comptoir Gourmand, l'inspecteur visiterait les locaux, relèverait les températures et demanderait le plan de maîtrise sanitaire, les relevés et l'attestation de formation. Les résultats sont publiés sur Alim'confiance en quatre niveaux. Mes consignes : enregistrements chaque jour, documents au même endroit, prévenir le responsable.",
    "Je ne savais pas que le contrôle est inopiné. Suites possibles : avertissement, mise en demeure, fermeture en cas de danger. Pour me préparer, je remplis les relevés de températures à chaque service.",
    "J'ai appris qu'en restauration commerciale le contrôle est fait par la DDPP ou la DDETS-PP. Si un inspecteur arrive, je l'accueille et je préviens le gérant. Le niveau Alim'confiance est visible par les clients.",
    "Pour mon food-truck, un contrôle peut avoir lieu sur un marché. Je garde mes documents dans le véhicule : déclaration d'activité, attestation de formation, relevés de températures.",
    "En salle, je pourrais être la première personne à accueillir l'inspecteur lors d'un contrôle. J'ai lu une fiche Alim'confiance : niveaux très satisfaisant, satisfaisant, à améliorer, à corriger de manière urgente.",
    "Pour mon projet, je prépare dès maintenant un classeur pour le contrôle : déclaration, attestation de formation, plan de maîtrise sanitaire. Une fermeture administrative serait catastrophique au démarrage.",
    "En traiteur, le contrôle porte aussi sur le transport et les étiquettes des plats livrés. Je garderai les relevés de température des caissons de livraison.",
    "Pour le rayon traiteur, l'inspecteur contrôlerait les dates, les températures des vitrines et la traçabilité. Le résultat Alim'confiance concerne tout le magasin.",
  ],
  // 5 — Bonnes pratiques d'hygiène
  [
    "Méthode des 5 M appliquée au service du Comptoir Gourmand : main-d'œuvre (tenue, bijoux, lavage des mains), milieu (cartons, poubelle, rongeurs), matériel (torchon), matières premières, méthodes (dilution au jugé). Bonnes pratiques retenues : coiffe, essuie-mains à usage unique, poubelle à pédale, plan de lutte contre les nuisibles.",
    "En cuisine, je vais changer deux pratiques : plus de torchon multi-usage et une dilution du désinfectant selon la fiche technique. Le lavage des mains se fait à la prise de poste, après les produits crus, les déchets et les toilettes.",
    "J'ai appris les bonnes pratiques du lavage des mains : paumes, dos, entre les doigts, ongles, poignets, puis séchage à usage unique. La marche en avant va du sale vers le propre sans croisement. TACT : température, action mécanique, concentration, temps de contact.",
    "Dans mon food-truck, la marche en avant se fait dans le temps, avec nettoyage entre deux activités. Bonnes pratiques retenues : tenue propre, mains sans bijoux, déconditionnement avant de monter dans le camion.",
    "En salle, j'applique les bonnes pratiques : lavage des mains après avoir encaissé et débarrassé, cheveux attachés, pas de torchon sur l'épaule.",
    "Pour mon futur local, je prévois les bonnes pratiques dès les plans : marche en avant, une zone de déconditionnement, des lave-mains à commande non manuelle et un plan de nettoyage-désinfection affiché.",
    "En traiteur, les bonnes pratiques comptent aussi pendant la livraison : caissons propres, tenue propre, mains lavées avant de dresser un buffet.",
    "Au laboratoire de la supérette, j'ai repéré les écarts des 5 M : cartons dans la zone de préparation et produit désinfectant dilué au jugé. Je propose de meilleures pratiques : un plan de nettoyage signé et une zone de déconditionnement.",
  ],
  // 6 — Températures et allergènes
  [
    "Fiche de températures : +3 °C pour les préparations élaborées à l'avance, température de l'étiquette pour les denrées périssables, -18 °C pour les surgelés, +63 °C au moins pour le chaud. La crème livrée à +9 °C est refusée ou mise à l'écart, avec une fiche de non-conformité. Pour le burger sans gluten : poste nettoyé, préparation séparée, emballage identifié.",
    "Pour le plat du jour : refroidissement de +63 °C à +10 °C en moins de 2 heures, stockage à +3 °C, remise en température à +63 °C en moins d'une heure. Les steaks surgelés sont décongelés au réfrigérateur.",
    "J'ai appris à décongeler au froid positif, au réfrigérateur à +4 °C au plus, pas sur le plan de travail. Pour un client allergique, j'utilise des ustensiles propres et je vérifie les étiquettes ; en cas de doute, on ne garantit pas l'absence d'un allergène.",
    "Dans mon food-truck, je contrôle la température du réfrigérateur, qui doit rester au plus à +4 °C pour mes produits frais, et celle du bac-marie à +63 °C au moins. Le tableau des 14 allergènes est affiché sur le comptoir pour la vente à emporter.",
    "En salle, je donne l'information sur les allergènes par écrit grâce au tableau par plat ; je transmets toute demande particulière à la cuisine. Les plats chauds sont servis à plus de +63 °C.",
    "Pour mon projet, je prévois une cellule de refroidissement, des enceintes froides à +3 °C et un congélateur à -18 °C, avec relevés quotidiens. L'information sur les allergènes sera intégrée à la carte.",
    "En traiteur, je refroidis les plats en moins de 2 heures jusqu'à +10 °C, je livre en caisson réfrigéré et le client réchauffe à +63 °C au moins. Chaque plat livré porte l'information sur les allergènes.",
    "Au rayon traiteur, les vitrines doivent rester à +3 °C au plus pour les préparations. À réception, je contrôle la température des produits frais. L'étiquette de chaque sandwich mentionne les allergènes.",
  ],
  // 7 — HACCP
  [
    "Diagramme du burger maison : réception, stockage au froid, cuisson, assemblage, service ou vente à emporter. Analyse des dangers à chaque étape. CCP : cuisson à cœur de la viande hachée, limite fixée dans le plan de maîtrise sanitaire, surveillance au thermomètre à sonde, action corrective, enregistrement. Je connais les 7 principes de la méthode HACCP.",
    "J'ai appliqué la méthode HACCP au bœuf bourguignon : CCP cuisson et CCP refroidissement rapide. Si la limite n'est pas atteinte, je poursuis la cuisson ou j'écarte le produit, et j'enregistre.",
    "Pour moi, la méthode HACCP semblait compliquée ; avec le diagramme du burger, j'ai compris qu'on cherche l'étape qui élimine le danger : la cuisson. La sonde du thermomètre est désinfectée avant chaque mesure.",
    "Dans mon food-truck, j'ai fait l'analyse HACCP de mes burgers : CCP cuisson, et maintien au froid des steaks pendant le transport comme point de vigilance. Enregistrement sur une fiche simple.",
    "En salle, je ne cuisine pas, mais j'ai compris l'analyse HACCP : les allergènes sont un danger à chaque étape, de la réception au service.",
    "Pour mon projet, j'ai rédigé l'analyse HACCP de mes trois plats principaux avec leurs CCP. Les 7 principes et les 12 étapes de la méthode me serviront à rédiger mon plan de maîtrise sanitaire.",
    "En traiteur, mon analyse HACCP fait ressortir deux CCP : la cuisson et le refroidissement rapide avant livraison. Chaque surveillance est enregistrée sur la fiche de production.",
    "Pour le rayon traiteur, j'ai appliqué la méthode HACCP aux sandwichs : pas de cuisson, donc la maîtrise repose sur les températures, les dates et les bonnes pratiques.",
  ],
  // 8 — Traçabilité et rappel
  [
    "Le fromage râpé est rappelé : je vérifie le lot en stock, je retire et j'isole avec « ne pas utiliser », je retire les salades qui en contiennent, je suis les consignes du rappel et je préviens l'équipe. La traçabilité par les bons de livraison et les étiquettes permet de retrouver le lot. Fiche de non-conformité remplie.",
    "J'ai appris à étiqueter les produits entamés avec la date d'ouverture : c'est la base de la traçabilité. En cas de rappel, je retire aussi les préparations du jour qui contiennent le produit.",
    "Je ne savais pas que RappelConso était le site officiel des rappels. Pour la traçabilité, je garderai l'étiquette ou une photo de l'étiquette de chaque produit entamé.",
    "Dans mon food-truck, je photographie les étiquettes et les bons de livraison : traçabilité simple, sans papier. En cas de rappel, je vérifie le lot et j'isole le produit.",
    "En salle, si un produit est rappelé, je préviens les collègues et je retire de la carte les plats concernés. La traçabilité relie le lot du fournisseur aux plats servis.",
    "Pour mon projet, je prévois une procédure de retrait-rappel écrite et un classeur de traçabilité. Si je mettais moi-même sur le marché un produit dangereux, je devrais le retirer et informer l'autorité.",
    "En traiteur, la traçabilité doit aller jusqu'au client livré : date de fabrication, lots utilisés, client et date de livraison sur la fiche de production.",
    "Au rayon traiteur, la fiche de non-conformité indique la date, le produit, le lot, les quantités retirées et la personne responsable. La traçabilité permet de retrouver les sandwichs préparés avec le lot rappelé.",
  ],
  // 9 — Plan de maîtrise sanitaire et plan d'action
  [
    "Mon plan de maîtrise sanitaire : bonnes pratiques d'hygiène, procédures HACCP, traçabilité, gestion des non-conformités. Mon plan d'action compte cinq actions : relevés de températures quotidiens, plan de nettoyage signé, tableau des allergènes, procédure de retrait-rappel, attestation de formation classée ; chacune avec un responsable, une échéance et une preuve.",
    "Dans ma cuisine, il existe des relevés de températures mais pas de fiche de refroidissement. Mon plan d'action : créer la fiche de cuisson et de refroidissement d'ici quinze jours, avec le chef comme responsable.",
    "Mon plan d'action personnel : signer le plan de nettoyage après chaque tâche et signaler toute température anormale au responsable. Preuve : fiches remplies chaque jour.",
    "Pour mon food-truck, mon plan de maîtrise sanitaire tient en un classeur : relevés, traçabilité par photos, allergènes, nettoyage. Mon plan d'action : un thermomètre enregistreur dans le réfrigérateur d'ici un mois.",
    "Ma contribution au plan d'action du café-brasserie : mettre à jour le tableau des allergènes à chaque changement de carte, avec une date de vérification.",
    "Pour mon projet, j'ai listé tous les documents du plan de maîtrise sanitaire à créer avant l'ouverture et les documents à présenter lors d'un contrôle. Mon plan d'action est daté, avec moi comme responsable de chaque action.",
    "En traiteur, mon plan d'action porte sur la chaîne du froid en livraison : caisson réfrigéré, relevé de température à chaque livraison, fiche de production complétée.",
    "Pour le rayon traiteur, mon plan d'action prévoit des relevés des vitrines deux fois par jour, un plan de nettoyage du laboratoire et une fiche de non-conformité disponible. Responsable : moi ; vérification par le directeur du magasin.",
  ],
];

const BILANS_PERSONNELS = [
  "Cette mise en situation m'a surtout appris à expliquer les règles plutôt qu'à les appliquer sans comprendre.",
  "Le plus difficile a été de tout faire dans le temps imparti ; je reprendrai la fiche dans mon établissement.",
  "J'ai comparé ma réponse avec celle d'un autre participant en sous-groupe, ce qui m'a fait corriger un oubli.",
  "Je vais appliquer cette méthode dès mon retour au travail.",
  "Le corrigé du formateur m'a permis de repérer une erreur de température que je faisais sans le savoir.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de l'expliquer à un collègue.",
  "Je me suis appuyé{e} sur le modèle de document fourni dans l'espace e-learning, que je vais adapter.",
  "Je n'ai pas eu le temps de tout détailler, mais l'essentiel est là.",
  "J'ai posé une question au formateur pendant la classe virtuelle, ce qui m'a évité une erreur.",
  "Je vais ajouter ce point à mon plan d'action.",
  "Je dois encore revoir quelques notions, mais je sais où trouver les réponses.",
  "J'ai pris des notes que je vais afficher dans la cuisine.",
];

/** Banque de la mise en situation à partir de son titre (ou de sa consigne), sinon de son rang. */
function blocExercice(contexte: string, exerciceIdx: number): number {
  const t = contexte || "";
  const num = t.match(/\bExercice\s+(\d{1,2})\b/i);
  if (num) {
    const n = parseInt(num[1], 10);
    if (n >= 1 && n <= EXERCICES_PRODUCTIONS.length) return n - 1;
  }
  if (/germe/i.test(t)) return 2;
  if (/obligation/i.test(t)) return 3;
  if (/contr[ôo]le officiel|alim'confiance/i.test(t)) return 4;
  if (/bonnes pratiques|5 M/i.test(t)) return 5;
  if (/allerg|cha[îi]ne du froid/i.test(t)) return 6;
  if (/HACCP/i.test(t)) return 7;
  if (/tra[çc]abilit|rappel/i.test(t)) return 8;
  if (/plan de ma[îi]trise|plan d'action/i.test(t)) return 9;
  if (/temps|multiplication/i.test(t)) return 1;
  if (/danger|TIAC/i.test(t)) return 0;
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickHYG14ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isHYG14Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques : un stagiaire garde le même poste d'un exercice à l'autre, et sur un groupe de
  // 8 stagiaires les 8 productions d'un même exercice sont toutes différentes. Le bilan personnel
  // change d'un exercice à l'autre. L'établissement du stagiaire est cité quand il est renseigné.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bloc + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai transposé la mise en situation à mon établissement, ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "Baccalauréat général",
  "BTS Management commercial opérationnel",
  "CAP Équipier polyvalent du commerce",
  "Baccalauréat professionnel Métiers du commerce et de la vente",
  "Licence d'économie et gestion",
  "Brevet des collèges, puis expérience en restauration rapide",
  "BTS Négociation et digitalisation de la relation client",
  "Diplôme obtenu à l'étranger en gestion, puis expérience en salle",
  "Licence de langues étrangères appliquées",
  "Baccalauréat STMG",
  "Aucun diplôme : plusieurs années d'expérience comme employé{e} en restauration",
  "BTS Comptabilité et gestion",
  "Master en marketing, reconversion vers la restauration",
  "CAP Agent de sécurité, reconversion vers la restauration",
  "Baccalauréat professionnel Logistique",
  "DUT Techniques de commercialisation",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir le support à l'avance pour le lire avant chaque journée.",
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
  "Je suis disponible les deux jours de formation, en classe virtuelle, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>.",
  "Je bloque les deux jours de formation dans mon planning (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) ; un collègue me remplace au service du midi.",
  "Je suis disponible les deux jours de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>, depuis un endroit calme avec une bonne connexion.",
  "Je peux suivre l'intégralité des deux jours de formation à distance, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible les deux jours (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). Mon établissement est fermé ces jours-là, je suivrai la formation depuis le bureau.",
  "Disponibilité complète sur les deux jours de formation (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). J'ai fait le test de connexion proposé.",
  "Les deux jours de formation, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; mes livraisons ont été décalées.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> les deux jours, et je consulterai l'espace e-learning le soir.",
  "Je suivrai les deux jours de formation en classe virtuelle (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je prévois de revoir les fiches à retenir entre les deux journées.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> des deux jours. Mon employeur a validé mon absence de poste.",
];

/** Réponses d'évaluation des besoins propres à la formation Hygiène alimentaire 14 h, différentes pour chaque stagiaire. */
export function getHYG14EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = hyg14Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilHYG14(idx, s.nom, s.prenom);
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
