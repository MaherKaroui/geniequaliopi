// ---------------------------------------------------------------------------
// « Techniques de maquillage semi-permanent (RS6459) – 21 h » — moteur de réponses HUMANISÉES
// Certification inscrite au Répertoire spécifique (RS6459) : QCM et études de cas, cas pratiques sur
// peau latex 3D et sur modèle, mise en situation devant un jury (2 prestations : manuelle et électrique).
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes…),
//     puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes : diagnostic puis C1 à C11, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par exercice + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Fil rouge fictif : « Institut Ligne & Teint » (Argenteuil) et ses clientes fictives ; aucun
// institut réel, aucune marque de pigments ni de matériel n'est citée.
// ---------------------------------------------------------------------------

const normalize = (s: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/**
 * Vrai pour la formation exemple « Techniques de maquillage semi-permanent (RS6459) – 21 h » :
 * code RS6459 (casse et espaces ignorés), ou intitulé normalisé (minuscules, sans accents) contenant
 * « maquillage semi-permanent », « maquillage semi permanent » ou « rs6459 ». Les formations de
 * maquilleur professionnel, de prothésie ongulaire ou de pose de vernis semi-permanent ne sont pas
 * concernées.
 */
export function isMSP21Formation(intitule?: string, code?: string): boolean {
  const c = (code || "").replace(/\s+/g, "").toUpperCase();
  if (c === "RS6459") return true;
  const t = normalize(intitule || "").toLowerCase().replace(/[‐‑‒–—]/g, "-");
  if (/rs\s*6459/.test(t)) return true;
  return /maquillage\s+semi[\s-]*permanent/.test(t);
}

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function msp21Seed(nom?: string, prenom?: string): number {
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
  typeof idx === "number" && idx >= 0 ? idx : msp21Seed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// diagnostic, C1+C2 entretien et documents légaux, C3 poste et hygiène, C4+C5 zone et pigments,
// C6 dermographe et aiguilles, C7 sourcils, C8 eye-liner, C9 lèvres, C10 taches de rousseur,
// C11 soins post-prestation
// ---------------------------------------------------------------------------
export const MSP21_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Quelle est votre expérience dans l'esthétique et avez-vous déjà pratiqué ou observé des prestations de maquillage semi-permanent ?", reponseAttendue: "Parcours et années d'expérience en esthétique ou en beauté, prestations maîtrisées, contact éventuel avec la dermopigmentation (observation, pratique, formation antérieure), situation au regard de la formation hygiène et salubrité, projet d'activité et zones visées." },
    { question: "Comment menez-vous l'entretien avec une cliente qui souhaite un maquillage semi-permanent, et quels documents lui remettez-vous ?", reponseAttendue: "Écoute des besoins, attentes et motivations, observation de la morphologie et de la peau, recherche des contre-indications avec renvoi vers le médecin en cas de doute, offre personnalisée et devis ; information préalable sur les risques et les soins, consentement éclairé, fiche cliente, autorisation écrite pour les photos ; consentement écrit de l'autorité parentale pour une mineure." },
    { question: "Comment préparez-vous votre poste de travail et quelles règles d'hygiène appliquez-vous pour une prestation par effraction cutanée ?", reponseAttendue: "Hygiène des mains, gants à usage unique, champ et matériel stériles à usage unique, protection du dermographe et du cordon, désinfection des surfaces, antisepsie de la peau, tri des DASRI dans un collecteur piquants-coupants, traçabilité des lots ; ergonomie et adaptation du poste à une situation de handicap." },
    { question: "Comment préparez-vous la zone à traiter et comment choisissez-vous la couleur du pigment ?", reponseAttendue: "Démaquillage, antisepsie, dessin préparatoire mesuré et symétrique validé par la cliente ; phototype de Fitzpatrick, carnation et sous-ton, cercle chromatique, complémentaires et neutralisation, familles de pigments et risque de virage." },
    { question: "Que savez-vous du dermographe, des aiguilles et de la profondeur d'effraction ?", reponseAttendue: "Dermographes rotatifs et à cartouches, configurations d'aiguilles selon le trait ou l'ombrage, vitesse, angle, tension de la peau, mouvement et pression ; dépôt dans l'épiderme jusqu'à la jonction dermo-épidermique : trop profond = migration, flou, virage bleuté ; trop superficiel = mauvaise tenue." },
    { question: "Comment réaliseriez-vous une correction ou un embellissement des sourcils ?", reponseAttendue: "Visagisme et morphologie du sourcil (tête, arc, queue), dessin validé, choix entre technique manuelle (microblading), technique électrique (ombré, poudré) ou combinée, adaptation au type de peau, correction d'un ancien maquillage par neutralisation." },
    { question: "Quelles précautions prendriez-vous pour réaliser un eye-liner ?", reponseAttendue: "Contre-indications oculaires (infection, chirurgie récente) avec avis médical, retrait des lentilles, trait adapté (ras de cils, fin, étiré) et validé, tension maîtrisée de la paupière, sécurité de la zone oculaire, aucun produit anesthésiant médicamenteux fourni." },
    { question: "Comment aborderiez-vous une prestation sur les lèvres ?", reponseAttendue: "Antécédents d'herpès labial et avis médical, injections récentes, dessin du contour validé, choix entre contour, remplissage ou effet « lip blush », neutralisation des lèvres foncées, couleur adaptée à la carnation." },
    { question: "Comment créer des taches de rousseur qui paraissent naturelles ?", reponseAttendue: "Répartition irrégulière et naturelle validée au crayon, tailles et intensités variées, couleur adaptée au phototype, densité progressive, exposition solaire et protection après la prestation." },
    { question: "Quels soins et quelles consignes donnez-vous après la prestation ?", reponseAttendue: "Consignes écrites remises, soins de la zone, évolution de la couleur pendant la cicatrisation (environ 4 à 6 semaines), retouche après cicatrisation complète, protection solaire, suivi, gestion des complications et des réclamations." },
  ],
  fin: [
    { question: "Présentez votre diagnostic de départ et les priorités de progression que vous en avez tirées.", reponseAttendue: "Expérience et prestations maîtrisées, situation au regard de la formation hygiène et salubrité et de la déclaration à l'ARS, forces et points de vigilance, priorités reliées aux compétences C1 à C11 et projet d'activité." },
    { question: "Présentez votre conduite d'entretien conseil et les documents légaux remis à la cliente.", reponseAttendue: "Besoins, attentes, motivations et morphologie ; évaluation de la peau ; contre-indications et renvoi vers le médecin ; offre et devis personnalisés ; information préalable (arrêté du 3 décembre 2008), consentement éclairé, fiche cliente conforme au RGPD, autorisation de droit à l'image, consentement parental pour une mineure." },
    { question: "Décrivez la préparation de votre poste et votre chaîne d'hygiène, y compris en cas de situation de handicap.", reponseAttendue: "Bonnes pratiques de l'arrêté du 11 mars 2009 : mains, gants, matériel stérile à usage unique, protection du dermographe, désinfection, antisepsie, DASRI (collecteur, convention, bordereaux), traçabilité des lots ; ergonomie et adaptation du poste à la praticienne ou à la cliente." },
    { question: "Comment préparez-vous la zone et choisissez-vous les pigments selon le phototype ?", reponseAttendue: "Démaquillage, antisepsie, dessin mesuré et symétrique validé ; phototypes I à VI, carnation et sous-ton, complémentaires et neutralisation, pigments organiques et inorganiques, virage, mélanges ; pigments conformes (REACH, règlement (UE) 2020/2081, étiquetage et lot)." },
    { question: "Comment choisissez-vous et réglez-vous le dermographe et les aiguilles selon la zone et l'effet attendu ?", reponseAttendue: "Type de dermographe, configuration d'aiguilles selon le trait ou l'ombrage, vitesse, angle, tension, mouvement et pression adaptés à chaque zone ; profondeur limitée à la jonction dermo-épidermique et conséquences d'une erreur." },
    { question: "Présentez la réalisation d'une correction ou d'un embellissement des sourcils.", reponseAttendue: "Visagisme, dessin validé, choix de la technique manuelle ou électrique selon la peau et l'effet, pigment adapté, correction d'un ancien maquillage viré par neutralisation, photos avec autorisation, consignes." },
    { question: "Expliquez comment vous réalisez un eye-liner en sécurité.", reponseAttendue: "Contre-indications oculaires et avis médical, retrait des lentilles, trait choisi et validé, protection de l'œil, tension de la paupière, réglages adaptés, aucun anesthésiant médicamenteux fourni, consignes spécifiques à la zone." },
    { question: "Présentez la réalisation d'une correction ou d'un embellissement des lèvres.", reponseAttendue: "Herpès labial et avis médical, injections récentes, contour dessiné et validé, neutralisation des lèvres foncées, contour et remplissage ou « lip blush », couleur adaptée à la carnation, consignes." },
    { question: "Comment créez-vous des taches de rousseur naturelles ?", reponseAttendue: "Répartition irrégulière validée, tailles et intensités variées, couleur adaptée au phototype, densité progressive complétée à la retouche, protection solaire." },
    { question: "Quels soins post-prestation et quelles bonnes pratiques communiquez-vous, et comment gérez-vous une complication ou une réclamation ?", reponseAttendue: "Consignes écrites, évolution de la couleur, cicatrisation d'environ 4 à 6 semaines, retouche après cicatrisation complète, tenue de plusieurs années variable, suivi, renvoi vers le médecin en cas de signe anormal, traitement écrit et traçé des réclamations." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle, 1 = juste.
// Une seule réponse à 1 dans deux questions seulement (C1+C2 et C6) : au plus 6 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — diagnostic de départ
  [
    ["Je suis esthéticien{ne} depuis peu et je n'ai jamais vu de dermopigmentation en vrai ; je ne sais pas encore quelles prestations je veux proposer.", 0],
    ["Je travaille en institut depuis quatre ans (soins du visage, épilation, beauté des mains) ; j'ai assisté une collègue lors de deux prestations de sourcils poudrés.", 0.5],
    ["Je suis prothésiste ongulaire et je veux ajouter les sourcils à ma carte ; je n'ai pas encore suivi la formation hygiène et salubrité, je sais qu'il faudra la faire.", 0.5],
    ["Pour moi, le maquillage semi-permanent, c'est surtout du dessin, donc ce sera facile.", 0],
    ["Je fais du microblading depuis un an après une formation courte en ligne ; je veux me certifier, mais je doute de mes bases en hygiène.", 0.5],
    ["Je n'ai pas d'objectif précis, c'est mon employeur qui m'a conseillé cette formation.", 0],
    ["Je suis coiff{eur} en salon et des clientes me demandent souvent les sourcils ; je voudrais proposer le poudré dans un espace séparé du salon.", 0.5],
    ["Je ne vois pas la différence entre maquillage permanent et semi-permanent, pour moi c'est du tatouage classique.", 0],
    ["J'ai déjà essayé sur une amie avec un kit acheté sur internet ; la couleur a viré et je ne sais pas pourquoi.", 0],
    ["Je gère un institut avec deux salariées ; je veux ouvrir la dermopigmentation, je sais qu'il faut déclarer l'activité à l'ARS, sans connaître les autres démarches.", 0.5],
    ["Je ne connais pas les prérequis, je pensais que cette formation suffisait pour exercer.", 0],
    ["Je suis esthéticien{ne} en spa, à l'aise avec le maquillage classique et un peu de colorimétrie ; je n'ai jamais tenu un dermographe.", 0.5],
  ],
  // Q2 — C1 et C2 : entretien, peau, documents légaux
  [
    ["Je demande à la cliente ce qu'elle veut et je commence la prestation le jour même.", 0],
    ["Je ne remets pas de document particulier, la cliente signe seulement le devis.", 0],
    ["Je lui demande ce qu'elle souhaite et nous regardons des photos ensemble ; je crois qu'il faut lui faire signer un consentement.", 0.5],
    ["Je ne pose pas de questions sur sa santé, ce n'est pas mon rôle.", 0],
    ["Je sais qu'il y a des contre-indications comme la grossesse, mais je ne connais pas les autres.", 0.5],
    ["Je remplis une fiche cliente avec ses coordonnées et ses allergies, comme pour une épilation à la cire.", 0.5],
    ["Je prends une photo avant la prestation pour comparer, mais je ne demande pas d'autorisation écrite.", 0.5],
    ["J'écoute ses attentes et ses motivations, j'observe la morphologie et la peau, je recherche les contre-indications (grossesse, anticoagulants, diabète, herpès pour les lèvres…) et je l'oriente vers son médecin en cas de doute. Je lui remets l'information sur les risques et les soins, je fais signer le consentement éclairé et une autorisation pour les photos.", 1],
    ["Je pense qu'une cliente mineure peut venir seule si elle a plus de seize ans.", 0],
    ["Je propose un devis selon la zone, mais je ne sais pas quels documents sont obligatoires.", 0.5],
    ["Je ne sais pas ce qu'est un consentement éclairé.", 0],
    ["Si la cliente insiste, je fais la prestation même s'il y a une contre-indication.", 0],
  ],
  // Q3 — C3 : poste de travail et hygiène
  [
    ["Je me lave les mains, je mets des gants et je désinfecte la table entre deux clientes.", 0.5],
    ["Je nettoie mes aiguilles à l'alcool pour pouvoir les réutiliser.", 0],
    ["Je jette les aiguilles dans la poubelle classique, bien emballées dans du papier.", 0],
    ["Je ne savais pas qu'il fallait adapter le poste pour une cliente en fauteuil roulant.", 0],
    ["Je sais qu'il existe un collecteur pour les objets piquants-coupants, mais je ne sais pas ce qu'il devient ensuite.", 0.5],
    ["L'hygiène, c'est comme pour l'épilation, il n'y a rien de plus.", 0],
    ["J'utilise des lames de microblading à usage unique, je les jette après chaque cliente.", 0.5],
    ["Je pense que la formation hygiène et salubrité est facultative.", 0],
    ["Je protège mon appareil avec du film, sans savoir si c'est suffisant.", 0.5],
    ["Je ne note jamais les numéros de lot des produits.", 0],
    ["Je laisse mes flacons de pigment ouverts sur le plan de travail pendant toute la journée.", 0],
    ["Je règle la hauteur de la table pour ne pas avoir mal au dos ; je sais que la posture compte.", 0.5],
  ],
  // Q4 — C4 et C5 : zone et pigments
  [
    ["Je prends la couleur qui ressemble à celle des cheveux de la cliente.", 0],
    ["Je ne fais pas de dessin préparatoire, je travaille directement à main levée.", 0],
    ["Je démaquille la zone et je fais un dessin au crayon que la cliente valide dans le miroir.", 0.5],
    ["Je ne connais pas les phototypes.", 0],
    ["Je sais qu'il existe des phototypes de I à VI, mais je ne sais pas les relier au choix du pigment.", 0.5],
    ["Je pense qu'un pigment noir convient à toutes les clientes brunes.", 0],
    ["Je sais qu'on utilise une couleur complémentaire pour neutraliser, comme le vert contre les rougeurs en maquillage.", 0.5],
    ["Je mesure les sourcils avec une réglette pour la symétrie, sans méthode précise.", 0.5],
    ["J'ai remarqué que d'anciens sourcils deviennent gris ou bleus, sans en connaître la raison.", 0.5],
    ["Je ne savais pas qu'il fallait désinfecter la peau avant de commencer.", 0],
    ["Je regarde si la peau a un sous-ton chaud ou froid, comme pour choisir un fond de teint.", 0.5],
    ["Je mélange les pigments au hasard jusqu'à obtenir la bonne couleur.", 0],
  ],
  // Q5 — C6 : dermographe, aiguilles, profondeur
  [
    ["Je ne connais pas le dermographe, je n'ai fait que du dessin.", 0],
    ["Je sais qu'il existe plusieurs aiguilles selon le trait, sans connaître les configurations.", 0.5],
    ["Je sais qu'il ne faut pas piquer trop profond, sinon la couleur bave.", 0.5],
    ["Je pense que plus on appuie, mieux la couleur tient.", 0],
    ["Le pigment doit être déposé dans l'épiderme jusqu'à la jonction dermo-épidermique : trop profond, il migre et vire au bleu ; trop superficiel, il ne tient pas. On adapte l'aiguille, la vitesse et la pression à la zone. Je ne connais pas encore les réglages des appareils.", 1],
    ["Une seule aiguille suffit pour toutes les zones.", 0],
    ["Je ne sais pas ce qu'est la tension de la peau.", 0],
    ["Je sais qu'il existe des dermographes rotatifs et à cartouches ; je n'ai utilisé ni l'un ni l'autre.", 0.5],
    ["Je crois que le microblading se fait aussi au dermographe.", 0],
    ["J'ai vu une praticienne tendre la peau avec ses doigts pendant qu'elle travaillait.", 0.5],
    ["Je pense qu'on règle la vitesse au maximum pour aller plus vite.", 0],
    ["Je pense qu'on reconnaît la bonne profondeur quand la peau saigne.", 0],
  ],
  // Q6 — C7 : sourcils
  [
    ["Je ferais un dessin selon la forme du visage et je le ferais valider avant de commencer.", 0.5],
    ["Je connais le microblading, poil à poil, et le poudré, plus maquillé, sans savoir quand choisir l'un ou l'autre.", 0.5],
    ["Je dessine toujours la même forme de sourcil, celle qui est à la mode.", 0],
    ["Je repasserais par-dessus un ancien maquillage gris avec la même couleur.", 0],
    ["Je sais qu'il faut placer la tête, l'arc et la queue du sourcil, je l'ai appris en épilation.", 0.5],
    ["Je pense qu'on peut faire du microblading sur toutes les peaux sans exception.", 0],
    ["Je ne sais pas comment corriger un ancien sourcil.", 0],
    ["Je ferais un poudré léger pour une cliente qui veut un effet maquillé.", 0.5],
    ["Je n'ai jamais entendu parler de technique combinée.", 0],
    ["Je prendrais des photos avant pour comparer avec le résultat.", 0.5],
    ["Je pense que la retouche n'est jamais nécessaire.", 0],
    ["Je ferais les sourcils très épais pour que le résultat se voie bien.", 0],
  ],
  // Q7 — C8 : eye-liner
  [
    ["Je ferais l'eye-liner comme un maquillage classique, avec un trait épais.", 0],
    ["Je sais que la zone de l'œil est fragile et qu'il faut être très prudent{e}.", 0.5],
    ["La cliente peut garder ses lentilles, ce n'est pas un problème.", 0],
    ["Je demanderais si la cliente a été opérée des yeux récemment.", 0.5],
    ["Je proposerais un trait ras de cils, plus discret.", 0.5],
    ["Je ne connais pas les contre-indications pour les yeux.", 0],
    ["Je sais qu'il faut tendre la paupière, mais je ne sais pas comment.", 0.5],
    ["Je pense que je peux fournir moi-même une crème anesthésiante à appliquer sur la paupière.", 0],
    ["Je proposerais un trait fin pour une première prestation, quitte à l'épaissir à la retouche.", 0.5],
    ["J'étirerais le trait jusqu'à la tempe pour toutes les clientes.", 0],
    ["Je ne sais pas quel pigment utiliser pour un eye-liner.", 0],
    ["Je demanderais à la cliente de garder les yeux fermés et de ne pas bouger.", 0.5],
  ],
  // Q8 — C9 : lèvres
  [
    ["Je ferais un rouge vif pour toutes les clientes.", 0],
    ["Je ne savais pas qu'on pouvait faire les lèvres en maquillage semi-permanent.", 0],
    ["Sur des lèvres foncées, je poserais directement le rose choisi par la cliente.", 0],
    ["Je sais que l'herpès peut poser problème pour les lèvres, mais je ne sais pas quoi faire.", 0.5],
    ["Je ferais d'abord le contour, puis le remplissage.", 0.5],
    ["J'ai entendu parler du « lip blush », un effet léger et rosé.", 0.5],
    ["Je pense que les lèvres cicatrisent en deux jours.", 0],
    ["Je demanderais si la cliente a eu des injections dans les lèvres.", 0.5],
    ["Je ne fais pas de dessin pour les lèvres, je suis le contour naturel à l'œil.", 0],
    ["Je sais qu'il faut adapter la couleur à la carnation de la cliente.", 0.5],
    ["Je pense qu'on peut agrandir beaucoup la bouche en dépassant largement le contour.", 0],
    ["Je ne sais pas comment on neutralise des lèvres foncées.", 0],
  ],
  // Q9 — C10 : taches de rousseur
  [
    ["Je ferais des points tous de la même taille, bien alignés.", 0],
    ["Je ferais des points de tailles différentes pour que ce soit naturel.", 0.5],
    ["Je prendrais un pigment noir pour que les taches se voient.", 0],
    ["Je placerais les taches surtout sur le nez et les pommettes.", 0.5],
    ["Je n'ai jamais vu cette prestation.", 0],
    ["Je choisirais une couleur proche des taches naturelles de la cliente.", 0.5],
    ["Je pense qu'il faut en mettre beaucoup pour que ça dure.", 0],
    ["Je croyais que les fausses taches de rousseur se faisaient seulement au crayon.", 0],
    ["Je ferais valider la répartition au crayon avant de commencer.", 0.5],
    ["Je ne sais pas si le soleil a un effet sur les taches après la prestation.", 0],
    ["Je pense que la même couleur convient à toutes les clientes, quel que soit le phototype.", 0],
    ["Je commencerais avec peu de taches, quitte à en ajouter à la retouche.", 0.5],
  ],
  // Q10 — C11 : soins post-prestation
  [
    ["Je dis à la cliente de ne rien faire de spécial.", 0],
    ["Je lui conseille d'éviter le soleil et la piscine pendant quelques jours.", 0.5],
    ["Je pense que la retouche peut se faire la semaine suivante.", 0],
    ["Je sais qu'il y a une retouche, sans savoir quand la programmer.", 0.5],
    ["Je conseille une crème cicatrisante, comme après un tatouage.", 0.5],
    ["Je ne donne pas de consignes écrites, je les explique à l'oral.", 0],
    ["Je lui explique que la couleur va foncer puis s'éclaircir pendant la cicatrisation.", 0.5],
    ["Je lui dis de ne pas gratter les petites croûtes.", 0.5],
    ["Je lui laisse mon numéro en cas de problème.", 0.5],
    ["Si la cliente se plaint, je refais la prestation tout de suite.", 0],
    ["Je ne sais pas combien de temps dure la cicatrisation.", 0],
    ["Je pense que le résultat est définitif.", 0],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  // Q1 — diagnostic
  [
    ["Au départ, je maîtrisais le visagisme et l'épilation mais pas l'hygiène de l'effraction cutanée. Mes priorités étaient la chaîne d'hygiène, la colorimétrie et le geste au dermographe ; elles sont travaillées et je prépare la déclaration de mon activité à l'ARS.", 1],
    ["Mon diagnostic montrait trois forces (dessin, relation cliente, rigueur) et trois points de vigilance (profondeur, choix des pigments, documents légaux) ; chaque priorité est reliée à une compétence.", 1],
    ["J'ai constaté que je pratiquais le microblading sans traçabilité ni consentement écrit : c'est corrigé, ma fiche cliente et mes documents sont prêts.", 1],
    ["Je sais maintenant situer mon niveau ; il me reste à gagner en régularité sur les lèvres.", 0.5],
    ["Ma formation hygiène et salubrité est programmée : c'est un prérequis à la validation de la certification et une obligation pour exercer.", 1],
    ["Mon projet est précis : sourcils et lèvres en premier, eye-liner quand j'aurai plus de pratique sur modèle.", 1],
    ["J'ai distingué ce que je sais faire sur latex et ce que je sais faire sur modèle ; mes objectifs suivent cette différence.", 1],
    ["Je tiens un carnet de pratique avec chaque prestation, la zone, le pigment, les réglages et le résultat cicatrisé.", 1],
    ["Mon diagnostic est fait ; je dois encore organiser mon espace de travail avant de recevoir mes premières clientes.", 0.5],
    ["J'ai compris que mon expérience en coiffure m'aidait pour la colorimétrie, mais pas pour l'hygiène, que j'ai dû reprendre entièrement.", 1],
    ["Le diagnostic m'a fait arrêter de pratiquer sur des proches avec du matériel non conforme.", 0.5],
    ["Mes priorités sont écrites dans mon plan de progression, avec des séances d'entraînement sur latex chaque semaine.", 1],
  ],
  // Q2 — C1 et C2
  [
    ["J'écoute les attentes, les motivations et les habitudes de maquillage, j'observe la morphologie et la peau (type, épaisseur, cicatrices), je recherche les contre-indications et j'oriente vers le médecin en cas de doute. Je remets l'information préalable sur les risques et les soins, je fais signer le consentement éclairé et l'autorisation de photos.", 1],
    ["Pour Mme VIDAL, phototype II et sourcils clairsemés, j'ai proposé un microblading naturel, un devis détaillé avec la retouche, et j'ai remis les documents avant la prestation.", 1],
    ["Ma fiche cliente contient des données de santé : je recueille le consentement, je limite les informations au nécessaire, je fixe une durée de conservation et je la range de façon sécurisée.", 1],
    ["Pour une mineure, aucune prestation sans le consentement écrit d'une personne titulaire de l'autorité parentale.", 1],
    ["Contre-indications que je recherche : grossesse, allaitement, anticoagulants, diabète non équilibré, chéloïdes, affection cutanée sur la zone, isotrétinoïne, chimiothérapie, allergies, injections récentes.", 1],
    ["Je sais mener l'entretien ; je dois encore gagner en aisance pour présenter le devis.", 0.5],
    ["L'information préalable est affichée dans la cabine et remise par écrit, comme le prévoit l'arrêté du 3 décembre 2008.", 1],
    ["Je reformule la demande de la cliente et je lui montre le dessin avant tout engagement.", 1],
    ["Les photos avant et après ne sont prises et utilisées qu'avec une autorisation écrite de droit à l'image.", 1],
    ["Je refuse ou reporte la prestation quand une contre-indication n'est pas levée par le médecin.", 0.5],
    ["Mon offre personnalisée précise la technique, la couleur envisagée, la retouche et le tarif.", 1],
    ["Je laisse à la cliente un temps de réflexion avant de signer le consentement.", 0.5],
  ],
  // Q3 — C3
  [
    ["Friction hydroalcoolique, gants à usage unique, champ stérile, aiguilles et cartouches stériles à usage unique, protection du dermographe et de son cordon, surfaces désinfectées entre chaque cliente : c'est la chaîne d'hygiène de l'arrêté du 11 mars 2009.", 1],
    ["Les DASRI sont triés à la source : piquants-coupants dans un collecteur dédié, convention avec un prestataire de collecte et bordereaux de suivi conservés.", 1],
    ["Je note sur la fiche cliente les numéros de lot des pigments et des aiguilles utilisés.", 1],
    ["Pour Mme BELKACEM, qui se déplace en fauteuil roulant, j'ai libéré l'accès, prévu l'espace de giration et je lui ai demandé si elle préférait rester dans son fauteuil ou être installée sur la table réglable.", 1],
    ["J'organise le poste en zone propre et zone sale, et je prépare tout le matériel avant de mettre mes gants.", 1],
    ["Je maîtrise la chaîne d'hygiène ; je dois encore être plus rapide pour la remise en état du poste.", 0.5],
    ["Je règle la hauteur de la table et de mon siège pour garder le dos droit, et je fais des pauses entre deux prestations longues.", 1],
    ["L'antisepsie de la peau est faite après le démaquillage et avant le dessin définitif.", 1],
    ["Je vérifie l'étiquetage des pigments : mention réservée aux tatouages ou maquillages permanents, ingrédients et numéro de lot.", 1],
    ["Je n'ouvre le matériel stérile que devant la cliente, au moment de la prestation.", 0.5],
    ["J'ai adapté mon poste à ma propre tendinite : appui de l'avant-bras et pauses programmées.", 1],
    ["Je change de gants dès que je touche autre chose que la zone ou le matériel stérile.", 0.5],
  ],
  // Q4 — C4 et C5
  [
    ["Démaquillage, antisepsie, puis dessin préparatoire mesuré pour la symétrie et validé par la cliente dans le miroir. Pour le pigment : phototype, carnation, sous-ton, puis cercle chromatique pour anticiper le virage.", 1],
    ["Pour Mme LEROY, sourcils virés au gris-bleu, j'ai d'abord prévu un pigment correcteur orangé, complémentaire du bleu, avant la couleur définitive.", 1],
    ["Pour Mme VIDAL, phototype II à sous-ton froid, j'ai choisi un brun taupe légèrement réchauffé pour éviter un virage gris.", 1],
    ["Les pigments inorganiques sont plus stables mais ont tendance à virer vers le chaud ; les organiques sont plus vifs : j'en tiens compte dans mes mélanges.", 1],
    ["Je n'utilise que des pigments conformes à REACH et à la restriction du règlement (UE) 2020/2081, avec leur numéro de lot.", 1],
    ["Je sais choisir un pigment pour les sourcils ; je manque encore de pratique pour les lèvres foncées.", 0.5],
    ["J'utilise un compas de proportions et des repères pour la tête, l'arc et la queue du sourcil.", 1],
    ["Je fais un test de couleur sur la fiche avant de mélanger, et je note la recette exacte.", 1],
    ["Je relie les phototypes de Fitzpatrick I à VI à l'intensité et à la chaleur du pigment.", 0.5],
    ["Je ne commence jamais sans la validation du dessin par la cliente.", 1],
    ["Je neutralise une couleur indésirable avec sa complémentaire avant de rechercher la teinte finale.", 1],
    ["J'ai appris à lire le sous-ton sur le poignet et le contour du visage.", 0.5],
  ],
  // Q5 — C6
  [
    ["Le pigment est déposé dans l'épiderme jusqu'à la jonction dermo-épidermique. J'adapte la configuration d'aiguilles (une pointe pour un trait, plusieurs pointes groupées pour un ombrage), la vitesse, l'angle, la tension et la pression à chaque zone.", 1],
    ["Trop profond : migration, flou, virage bleuté ; trop superficiel : mauvaise tenue. Je contrôle la profondeur par la tension de la peau et la régularité du geste.", 1],
    ["Pour le poudré, mouvement pendulaire léger et passages progressifs ; pour le contour des lèvres, trait lent et précis.", 1],
    ["Je travaille plus doucement sur la paupière, peau fine, que sur le sourcil.", 1],
    ["Je connais les dermographes rotatifs et à cartouches, et je protège l'appareil et le cordon par une housse à usage unique.", 1],
    ["Je règle bien l'appareil sur latex ; sur modèle, je dois encore stabiliser ma pression.", 0.5],
    ["Le microblading est une technique manuelle à la lame ; le microshading et le poudré se font au dermographe.", 1],
    ["J'ai noté dans ma fiche de réglages, pour chaque zone, l'aiguille, la vitesse et l'effet obtenu.", 1],
    ["J'adapte l'angle selon que je trace un trait ou que je dépose un ombrage.", 0.5],
    ["Je tends la peau à trois points pour éviter que l'aiguille ne glisse.", 1],
    ["Je contrôle la saturation au fur et à mesure en essuyant la zone.", 0.5],
    ["Je ne repasse pas indéfiniment au même endroit pour ne pas abîmer la peau.", 1],
  ],
  // Q6 — C7
  [
    ["Visagisme, dessin mesuré et validé, puis choix de la technique : microblading pour une peau fine et un effet naturel, poudré ou combiné pour une peau grasse ou un effet maquillé. Pigment adapté au phototype, photos avec autorisation, consignes écrites.", 1],
    ["Pour Mme VIDAL, j'ai dessiné des poils dans le sens de la pousse pour combler les zones clairsemées et rééquilibrer l'asymétrie, effet naturel comme elle le souhaitait.", 1],
    ["Pour Mme LEROY, j'ai d'abord neutralisé le gris-bleu, puis proposé un ombré doux, en la prévenant qu'il faudrait peut-être plusieurs séances.", 1],
    ["Je choisis la technique selon la peau : sur une peau très grasse, les traits de microblading risquent de flouter, je préfère le poudré.", 1],
    ["J'ai réalisé une prestation manuelle et une électrique sur modèle, comme à l'épreuve devant le jury.", 1],
    ["Je maîtrise le dessin ; le microblading demande encore de l'entraînement pour des traits réguliers.", 0.5],
    ["La retouche se fait après cicatrisation complète, pour ajuster la densité et la couleur.", 1],
    ["Je respecte la forme naturelle et je ne suis pas la mode quand elle ne convient pas au visage.", 1],
    ["La technique combinée associe des traits au départ du sourcil et un ombrage sur le reste.", 0.5],
    ["Je compare toujours les photos avant et après à la même lumière.", 1],
    ["J'explique à la cliente que le rendu juste après est plus foncé qu'après cicatrisation.", 0.5],
    ["Je refuse de travailler sur un ancien maquillage trop foncé sans correction préalable.", 1],
  ],
  // Q7 — C8
  [
    ["Je recherche les contre-indications oculaires (infection, chirurgie récente des yeux) et je demande l'avis médical en cas de doute. Lentilles retirées, trait ras de cils dessiné et validé, paupière tendue doucement, réglages légers, consignes spécifiques.", 1],
    ["Pour Mme MARCHAND, porteuse de lentilles et presbyte, les lentilles ont été retirées et elle a validé le tracé avec ses lunettes avant la prestation.", 1],
    ["Je ne fournis ni n'applique aucun anesthésiant relevant du médicament ; je renvoie la cliente vers son médecin ou son pharmacien.", 1],
    ["Je commence par un trait fin au ras des cils et je laisse l'épaississement éventuel à la retouche.", 1],
    ["Je protège l'œil et je travaille avec une tension douce, sans jamais appuyer sur le globe.", 1],
    ["Je sais réaliser le trait ras de cils ; le trait étiré me demande encore de la pratique.", 0.5],
    ["Je demande à la cliente de garder les yeux fermés et je fais des pauses régulières.", 1],
    ["Je choisis un pigment adapté à la zone, conforme et tracé, et je l'indique sur la fiche.", 1],
    ["Je prévois un trait plus discret pour une paupière tombante.", 0.5],
    ["Je donne des consignes : pas de maquillage des yeux ni de lentilles sans l'accord de son ophtalmologiste pendant la cicatrisation.", 1],
    ["Je n'accepte pas la prestation si l'œil est irrité le jour du rendez-vous.", 0.5],
    ["J'ai travaillé l'eye-liner sur latex avant de le réaliser sur modèle.", 1],
  ],
  // Q8 — C9
  [
    ["Je recherche un antécédent d'herpès labial et je demande l'avis du médecin, qui peut prescrire un traitement préventif ; je vérifie aussi les injections récentes. Contour dessiné et validé, puis contour et remplissage ou « lip blush », couleur adaptée à la carnation.", 1],
    ["Pour Mme DIALLO, phototype V, lèvres à pigmentation inégale : neutralisation des zones foncées avec un correcteur chaud, puis contour pour redonner de la netteté.", 1],
    ["Je préviens la cliente que la neutralisation peut demander plusieurs séances avant la couleur souhaitée.", 1],
    ["Je reste sur le contour naturel ou très près, sans agrandissement artificiel de la bouche.", 1],
    ["Le « lip blush » donne un effet léger et rosé ; il convient aux clientes qui veulent un résultat naturel.", 1],
    ["Je sais faire le contour ; le remplissage homogène demande encore de la pratique.", 0.5],
    ["Je dessine le contour au crayon et je fais valider la symétrie de face et de profil.", 1],
    ["J'explique que les lèvres gonflent et que la couleur est plus vive les premiers jours.", 1],
    ["Je choisis le pigment en tenant compte de la couleur naturelle des lèvres et du sous-ton.", 0.5],
    ["Mes consignes : hydratation de la zone, éviter les aliments épicés les premiers jours, pas de gommage.", 1],
    ["Je reporte la prestation en cas de bouton de fièvre sur la zone.", 1],
    ["J'ai pris des photos avant et après avec l'autorisation écrite de la cliente.", 0.5],
  ],
  // Q9 — C10
  [
    ["Je dessine une répartition irrégulière au crayon, validée par la cliente, puis je réalise des points de tailles et d'intensités variées, avec une couleur adaptée au phototype. Je reste discrète et je complète à la retouche si besoin.", 1],
    ["Pour Mme NGUYEN, phototype III, j'ai choisi un brun clair chaud, des points plus denses sur le nez et le haut des pommettes, plus espacés vers les tempes.", 1],
    ["J'évite tout alignement ou motif régulier, qui trahit l'artifice.", 1],
    ["Je conseille une protection solaire, car le soleil atténue la couleur et peut assombrir la peau autour.", 1],
    ["Je varie la profondeur de dépôt pour obtenir des taches plus ou moins marquées, toujours sans dépasser la jonction dermo-épidermique.", 1],
    ["Je sais faire la répartition ; je dois encore varier davantage les tailles.", 0.5],
    ["Je prends comme modèle les taches naturelles de la cliente quand elle en a.", 1],
    ["Je fais une photo du dessin validé pour le comparer au résultat cicatrisé.", 1],
    ["Je choisis une couleur légèrement plus claire que prévu, car elle fonce pendant les premiers jours.", 0.5],
    ["Je commence avec peu de taches et j'en ajoute à la retouche.", 1],
    ["Je préviens que l'effet s'atténue avec le temps et selon l'exposition au soleil.", 0.5],
    ["J'ai réalisé la prestation sur latex puis sur modèle avec un résultat naturel validé par la formatrice.", 1],
  ],
  // Q10 — C11
  [
    ["Je remets des consignes écrites : soins de la zone, pas de grattage, pas de soleil, de piscine ni de sauna pendant la cicatrisation, qui dure environ 4 à 6 semaines. La retouche est programmée après cicatrisation complète.", 1],
    ["J'explique l'évolution de la couleur : plus foncée au début, puis plus claire, avant de se stabiliser.", 1],
    ["La tenue est de plusieurs années avec une atténuation progressive, variable selon la peau, le soleil et les soins.", 1],
    ["En cas de rougeur qui s'aggrave, de gonflement ou de signe d'infection, j'oriente la cliente vers son médecin sans attendre.", 1],
    ["Une réclamation est notée par écrit, analysée avec les photos et la fiche de traçabilité, et une réponse est apportée à la cliente.", 1],
    ["Je donne de bonnes consignes ; je dois encore mettre en place un suivi systématique par message.", 0.5],
    ["Je conserve la fiche cliente avec les lots, les réglages et les consignes remises.", 1],
    ["Je propose un rendez-vous de suivi pour vérifier la cicatrisation avant la retouche.", 1],
    ["Je rappelle que la retouche n'est pas faite avant cicatrisation complète.", 0.5],
    ["Mes consignes sont adaptées à la zone : lèvres, yeux ou sourcils.", 1],
    ["Je conseille une protection solaire pour préserver la couleur dans le temps.", 0.5],
    ["Je ne recommande aucun médicament : je renvoie vers le médecin ou le pharmacien.", 1],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [48, 51, 45, 10, 4, 58, 45, 36, 47, 42];

export function getMSP21AutoAnswers(
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
 * 8 stagiaires consécutifs (rang dans la session, sinon empreinte du nom).
 */
const NOTES_DEBUT_SUR_20 = [10, 7, 12, 8, 5, 11, 6, 9];
export function msp21NoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6, soit 4 à 12/20). */
export function msp21BonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((msp21NoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `msp21BonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function msp21ReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = msp21BonnesQcmDebut(n, idx, nom, prenom);
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
export function msp21NoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie stagiaire), attentes, missions et contribution (partie structure).
// Publics : professionnels de l'esthétique et de la beauté, salariés ou indépendants ;
// financement CPF.
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
    besoin: "Acquérir les techniques de dermopigmentation des sourcils pour répondre aux demandes des clientes de l'institut où je suis salarié{e}.",
    objectif: "Je veux maîtriser le microblading et le poudré des sourcils, dans le respect des règles d'hygiène, et obtenir la certification RS6459.",
    projet: "Elle me permettra de prendre en charge la nouvelle cabine de maquillage semi-permanent de l'institut.",
    attentes: "L'institut attend que {le_sal} réalise des prestations de sourcils sûres, conformes et bien conseillées.",
    missions: "Soins du visage et du corps, épilations, beauté des mains et des pieds, conseil et vente de produits.",
    contribution: "Elle doit permettre à l'institut de proposer une prestation aujourd'hui orientée vers d'autres établissements.",
  },
  {
    besoin: "Ajouter le maquillage semi-permanent à mon activité d'esthéticien{ne} indépendant{e} à domicile, dans un cadre conforme.",
    objectif: "Mon objectif est d'exercer la dermopigmentation des sourcils et des lèvres dans un local aménagé, après déclaration à l'ARS.",
    projet: "Elle m'aidera à développer un chiffre d'affaires complémentaire et à fidéliser ma clientèle.",
    attentes: "Ma clientèle attend des prestations naturelles, réalisées avec une hygiène irréprochable et un suivi personnalisé.",
    missions: "Prestations d'esthétique à domicile et dans un local professionnel, gestion des rendez-vous, comptabilité.",
    contribution: "Elle doit diversifier mon offre et réduire ma dépendance aux prestations saisonnières.",
  },
  {
    besoin: "Me reconvertir de la prothésie ongulaire vers la dermopigmentation en acquérant des bases solides en hygiène, colorimétrie et geste technique.",
    objectif: "Je souhaite maîtriser les techniques manuelle et électrique et obtenir une certification reconnue avant de changer d'activité.",
    projet: "Elle me permettra d'ouvrir un espace de maquillage semi-permanent à côté de mon activité d'ongles.",
    attentes: "Mes clientes attendent une prestation conseillée, adaptée à leur visage et réalisée en toute sécurité.",
    missions: "Pose et entretien d'ongles, nail art, accueil et conseil des clientes, gestion du salon.",
    contribution: "Elle doit assurer la transition de mon activité sans perte de clientèle.",
  },
  {
    besoin: "Proposer des sourcils poudrés et du « lip blush » dans le salon de coiffure où je travaille, avec un espace dédié et conforme.",
    objectif: "Mon objectif est de réaliser des prestations de sourcils et de lèvres adaptées au phototype de chaque cliente.",
    projet: "Elle m'aidera à compléter l'offre beauté du salon et à évoluer vers un poste de référent{e} beauté.",
    attentes: "Le salon attend {un} {collab} capable de conseiller et de réaliser des prestations de dermopigmentation conformes.",
    missions: "Coupes, colorations, soins capillaires, conseil en image et vente de produits.",
    contribution: "Elle doit augmenter le panier moyen des clientes du salon et attirer une nouvelle clientèle.",
  },
  {
    besoin: "Ouvrir un espace de dermopigmentation dans mon institut et en maîtriser moi-même les techniques et les obligations.",
    objectif: "Je veux maîtriser l'ensemble des prestations (sourcils, eye-liner, lèvres, taches de rousseur) et les règles d'hygiène pour encadrer cette activité.",
    projet: "Elle me permettra de lancer la nouvelle prestation et, plus tard, de transmettre les bonnes pratiques à mes salariées.",
    attentes: "L'institut attend une offre de maquillage semi-permanent rentable, conforme et sans risque pour les clientes.",
    missions: "Gestion de l'institut, encadrement de deux salariées, soins, relation fournisseurs, communication.",
    contribution: "Elle doit développer une nouvelle ligne de prestations à forte valeur ajoutée.",
  },
  {
    besoin: "Faire certifier une pratique du microblading acquise en autodidacte et corriger mes lacunes en hygiène et en colorimétrie.",
    objectif: "Mon objectif est d'obtenir la certification RS6459 et de sécuriser ma pratique : traçabilité, documents légaux, choix des pigments.",
    projet: "Elle m'aidera à rassurer mes clientes et à élargir mon offre au poudré et aux lèvres.",
    attentes: "Mes clientes attendent un résultat durable, sans virage de couleur, et une pratique transparente.",
    missions: "Prestations de microblading, réseaux sociaux, gestion des rendez-vous et des retouches.",
    contribution: "Elle doit réduire les retouches correctives et les réclamations liées au virage des couleurs.",
  },
  {
    besoin: "Diversifier les prestations du spa où je travaille avec un maquillage semi-permanent discret et sécurisé.",
    objectif: "Je souhaite réaliser des sourcils, des eye-liners ras de cils et des taches de rousseur naturelles pour la clientèle du spa.",
    projet: "Elle me permettra de devenir la personne référente de la dermopigmentation au sein de l'équipe.",
    attentes: "Le spa attend des prestations haut de gamme, conformes aux règles d'hygiène et parfaitement conseillées.",
    missions: "Soins du visage et du corps, modelages, maquillage, accueil de la clientèle de l'établissement.",
    contribution: "Elle doit enrichir la carte du spa et augmenter la fréquentation hors saison.",
  },
  {
    besoin: "Savoir corriger d'anciens maquillages permanents virés et répondre aux clientes mécontentes d'une prestation précédente.",
    objectif: "Mon objectif est de maîtriser la colorimétrie et la neutralisation pour proposer des corrections de sourcils et de lèvres.",
    projet: "Elle m'aidera à me spécialiser dans les corrections, peu proposées dans mon secteur.",
    attentes: "Le centre attend que {le_sal} sache analyser un ancien maquillage et proposer une correction réaliste.",
    missions: "Soins esthétiques, épilation, maquillage, accueil et conseil des clientes du centre esthétique.",
    contribution: "Elle doit permettre au centre de répondre à des demandes aujourd'hui refusées.",
  },
  {
    besoin: "Comprendre les obligations réglementaires et sanitaires de la dermopigmentation avant de me lancer.",
    objectif: "Je veux connaître le cadre (déclaration à l'ARS, formation hygiène et salubrité, information des clientes, DASRI) et savoir l'appliquer.",
    projet: "Elle me permettra d'ouvrir mon activité sans risque pour mes clientes ni pour moi.",
    attentes: "Ma future clientèle attend une praticienne fiable, transparente sur les risques et les soins.",
    missions: "Prestations d'esthétique en institut, préparation d'un projet de création d'activité.",
    contribution: "Elle doit sécuriser le lancement de mon activité de dermopigmentation.",
  },
  {
    besoin: "Proposer des prestations adaptées à toutes les carnations, en particulier aux peaux foncées.",
    objectif: "Mon objectif est de maîtriser le choix des pigments selon les phototypes I à VI et la neutralisation des lèvres foncées.",
    projet: "Elle m'aidera à répondre à une clientèle diverse aujourd'hui mal servie dans mon secteur.",
    attentes: "L'institut attend des prestations réussies sur tous les phototypes, sans virage de couleur.",
    missions: "Soins du visage, épilation au fil et à la cire, maquillage, conseil en produits.",
    contribution: "Elle doit élargir la clientèle de l'institut et renforcer sa réputation.",
  },
  {
    besoin: "Accompagner des clientes qui ont perdu leurs sourcils ou souhaitent retrouver confiance en elles, avec une prestation adaptée.",
    objectif: "Je souhaite réaliser des sourcils naturels en respectant les contre-indications et en orientant vers le médecin quand c'est nécessaire.",
    projet: "Elle me permettra de proposer une prestation de bien-être et d'image de soi dans mon institut.",
    attentes: "L'institut attend un accompagnement bienveillant et sûr, avec des documents d'information clairs.",
    missions: "Soins esthétiques, conseil en image, accueil des clientes, suivi des rendez-vous.",
    contribution: "Elle doit faire de l'institut une adresse de confiance pour les clientes fragilisées.",
  },
  {
    besoin: "Adapter mon poste de travail et ma pratique à une situation de handicap, la mienne ou celle de mes clientes.",
    objectif: "Mon objectif est d'exercer la dermopigmentation avec un poste ergonomique et accessible, sans compromis sur l'hygiène.",
    projet: "Elle m'aidera à accueillir toutes les clientes, y compris celles à mobilité réduite.",
    attentes: "Ma clientèle attend un accueil accessible et des prestations réalisées en toute sécurité.",
    missions: "Prestations d'esthétique, aménagement de la cabine, gestion de l'activité indépendante.",
    contribution: "Elle doit rendre mon activité durable et accessible.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilMSP21(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

export function getMSP21Besoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return accorder(profilMSP21(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production écrite du stagiaire (fil rouge Institut Ligne & Teint)
// Indices : 0 diagnostic, 1 C1+C2, 2 C3, 3 C4+C5, 4 C6, 5 C7, 6 C8, 7 C9, 8 C10, 9 C11 ;
//           8 productions par banque.
// La k-ième production de chaque banque suit le même profil : un stagiaire garde le même terrain
// d'un exercice à l'autre (profils et clientes fictifs).
//   0 esthéticienne salariée en institut, Pontoise · 1 esthéticienne indépendante à domicile, Cergy
//   2 prothésiste ongulaire en reconversion, Rouen · 3 coiffeuse en salon, Versailles
//   4 gérante d'institut, Orléans · 5 praticienne de microblading autodidacte, Lille
//   6 esthéticienne en spa d'hôtel, Reims · 7 esthéticienne en centre esthétique, Amiens
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Diagnostic de départ
  [
    "Je suis esthéticien{ne} salarié{e} dans un institut de Pontoise depuis cinq ans, titulaire d'un CAP et d'un BP esthétique. Je maîtrise l'épilation des sourcils et le maquillage ; je n'ai jamais pratiqué la dermopigmentation. Ma formation hygiène et salubrité de 21 h est prévue le mois prochain. Forces : visagisme, relation cliente, précision. Vigilance : geste au dermographe, colorimétrie, documents légaux. Priorités : C3, C5 et C7, pour ouvrir la cabine de sourcils de l'institut.",
    "Esthéticien{ne} indépendant{e} à domicile près de Cergy depuis trois ans, je reçois aussi dans un petit local. Je veux ajouter les sourcils et les lèvres. Je sais qu'il faudra déclarer l'activité à l'ARS et que le local devra permettre la chaîne d'hygiène. Je n'ai pas encore l'attestation hygiène et salubrité. Forces : fidélité de ma clientèle, organisation. Vigilance : DASRI, traçabilité, choix des pigments. Priorités : cadre réglementaire, hygiène, sourcils puis lèvres.",
    "Prothésiste ongulaire à Rouen depuis six ans, je veux me reconvertir vers la dermopigmentation. Je connais l'hygiène du salon d'ongles, mais pas celle de l'effraction cutanée. J'ai observé deux prestations de poudré chez une consœur. Forces : précision du geste, sens des couleurs, patience. Vigilance : profondeur, contre-indications, documents à remettre. Priorités : C3, C6 et C1-C2, puis sourcils.",
    "Coiff{eur} en salon à Versailles, titulaire d'un BP coiffure, je pratique la coloration depuis dix ans. Mes clientes me demandent les sourcils. Je n'ai aucune expérience de la peau ni de l'effraction. Forces : colorimétrie des cheveux, conseil en image. Vigilance : la peau n'est pas le cheveu, les pigments virent différemment ; hygiène ; prérequis d'expérience en esthétique à vérifier avec la formatrice. Priorités : C2, C5 et C3.",
    "Gérant{e} d'un institut à Orléans avec deux salariées, je veux ouvrir un espace de dermopigmentation. Je pratique l'esthétique depuis quinze ans. J'ai déjà les devis du matériel, mais pas de convention de collecte des DASRI. Forces : expérience, gestion, connaissance de la clientèle. Vigilance : obligations réglementaires, formation hygiène de mes salariées, assurance. Priorités : cadre réglementaire, toutes les zones, organisation de la traçabilité.",
    "Je pratique le microblading à Lille depuis un an, après une formation courte en ligne. Environ deux clientes par semaine. Je n'utilise pas de consentement écrit et je ne note pas les lots ; une cliente est revenue avec des sourcils virés au gris. Forces : dessin, réseaux sociaux. Vigilance : hygiène, colorimétrie, documents légaux. Priorités : C2, C3, C5, puis le poudré pour les peaux grasses.",
    "Esthéticien{ne} dans le spa d'un hôtel de Reims, titulaire d'un BTS esthétique. Je maîtrise les soins du visage et le maquillage. Le spa veut proposer une prestation discrète : sourcils, eye-liner ras de cils, taches de rousseur. Forces : connaissance de la peau, colorimétrie de base. Vigilance : zone oculaire, réglages du dermographe. Priorités : C6, C8 et C10.",
    "Esthéticien{ne} en centre esthétique à Amiens, j'ai un bac pro esthétique et quatre ans d'expérience. Beaucoup de clientes viennent avec d'anciens maquillages permanents ratés. Je veux apprendre la correction. Forces : écoute, épilation au fil, maquillage. Vigilance : neutralisation, choix des pigments, limites de la correction. Priorités : C5, C7 et C9.",
  ],
  // 1 — C1 et C2 : entretien conseil, peau, documents légaux
  [
    "Entretien avec Mme Laura VIDAL, 34 ans : elle veut combler des sourcils clairsemés et asymétriques après des années d'épilation excessive, avec un effet naturel. Observation : phototype II, sous-ton froid, peau fine et normale. Questionnaire santé : pas de grossesse, pas de traitement, pas d'allergie connue. Proposition : microblading poil à poil, retouche après cicatrisation, devis détaillé (tarif fictif). Documents remis : information préalable sur les risques et les soins, consentement éclairé, fiche cliente, autorisation écrite de photos.",
    "Entretien avec Mme Clara NGUYEN, 27 ans, qui souhaite des taches de rousseur discrètes. Phototype III, peau mixte, aucune lésion sur la zone. Je l'ai interrogée sur les contre-indications : elle allaite. J'ai reporté la prestation et je l'ai invitée à en parler à son médecin. Je lui ai remis l'information préalable et un devis (tarif fictif) valable pour un rendez-vous ultérieur. Fiche cliente créée avec son consentement, données limitées au nécessaire.",
    "Entretien avec Mme Sophie MARCHAND, 52 ans, porteuse de lentilles et presbyte, qui veut un trait d'eye-liner ras de cils. Je lui ai demandé si elle avait une infection ou une chirurgie récente des yeux : non. Elle prend un traitement anticoagulant ; je lui ai demandé l'avis de son médecin avant toute prestation. Proposition : trait fin ras de cils, devis fictif. Documents remis : information préalable, consentement à signer après l'avis médical, autorisation de photos.",
    "Entretien avec Mme Aïcha DIALLO, 41 ans, qui veut corriger des lèvres à pigmentation inégale et un contour flou. Phototype V. Elle a des antécédents d'herpès labial : je lui ai conseillé de consulter son médecin, qui pourra prescrire un traitement préventif. Pas d'injection récente. Proposition : neutralisation en une ou plusieurs séances puis contour, devis fictif. Je lui ai remis l'information sur les risques, le consentement éclairé et l'autorisation de photos.",
    "Entretien avec Mme Martine LEROY, 63 ans : ancien maquillage permanent des sourcils viré au gris-bleu. Elle souhaite une couleur brun doux. J'ai observé une peau mature et fine, une ancienne pigmentation dense. Pas de contre-indication déclarée, diabète équilibré selon son médecin. Proposition : neutralisation puis ombré doux, plusieurs séances possibles, devis fictif. Documents : information préalable, consentement éclairé, fiche cliente conforme au RGPD, photos avec autorisation.",
    "J'ai repris l'entretien de Mme VIDAL avec la grille de la formation. Avant, je ne posais aucune question de santé : cette fois, j'ai vérifié grossesse, traitements, cicatrisation, allergies et affections cutanées. J'ai reformulé sa demande (« naturel, pas trop marqué »), montré deux exemples de dessins, puis remis l'information préalable, le consentement éclairé et l'autorisation de droit à l'image. Devis fictif signé après un temps de réflexion.",
    "Entretien avec Mme Aïcha DIALLO pour la clientèle du spa : écoute de ses attentes (lèvres plus homogènes, résultat naturel), évaluation de la peau, recherche des contre-indications, herpès labial signalé et avis médical demandé. Offre personnalisée : neutralisation puis « lip blush » léger. Documents remis : information préalable, consentement éclairé, fiche cliente et autorisation de photos.",
    "Entretien avec Mme Martine LEROY : je lui ai expliqué pourquoi son ancien pigment a viré (pigment trop froid, probablement déposé trop profond). Elle prend un traitement que je ne connaissais pas : je lui ai demandé l'avis de son médecin avant de fixer le rendez-vous. Proposition réaliste : neutralisation, puis couleur brun chaud, sans promesse de résultat en une seule séance. Documents légaux remis et expliqués.",
  ],
  // 2 — C3 : poste de travail et chaîne d'hygiène
  [
    "Préparation du poste pour Mme VIDAL : surfaces désinfectées, friction hydroalcoolique, gants à usage unique, champ stérile, lame de microblading stérile à usage unique ouverte devant la cliente, pigments en godets individuels. Zone propre et zone sale séparées. Collecteur pour piquants-coupants à portée de main. Lots des pigments et de la lame notés sur la fiche. Table réglée à ma hauteur pour garder le dos droit.",
    "Pour mon local de Cergy, j'ai tracé la chaîne d'hygiène : lavage puis friction des mains, gants, matériel stérile à usage unique, housse de protection sur le dermographe et le cordon, désinfection des surfaces entre chaque cliente. DASRI : collecteur dédié, convention avec un prestataire de collecte, bordereaux conservés. Pour Mme BELKACEM, j'ai vérifié l'accès du local à un fauteuil roulant et dégagé l'espace de rotation.",
    "Le salon d'ongles m'avait habitué{e} à désinfecter, mais pas à travailler stérile. Pour l'exercice : poste dégagé, plan désinfecté, champ stérile, aiguilles et cartouches stériles à usage unique, protection du dermographe, antisepsie de la peau, gants changés dès que je touche autre chose. Déchets triés : piquants-coupants dans le collecteur, le reste en DASRI mous. Traçabilité des lots sur la fiche de Mme BELKACEM.",
    "Pour Mme Yasmine BELKACEM, 38 ans, en fauteuil roulant : je lui ai demandé comment elle préférait être installée. Elle a choisi de rester dans son fauteuil ; j'ai réglé mon siège et l'éclairage, prévu un appui-tête et organisé le chariot à ma droite pour garder la chaîne d'hygiène. Matériel stérile à usage unique, housse sur le dermographe, désinfection des surfaces, collecteur DASRI, lots notés.",
    "J'ai rédigé la procédure d'hygiène de l'espace de dermopigmentation de l'institut, d'après l'arrêté du 11 mars 2009 : mains, gants, champ et matériel stériles à usage unique, protection du dermographe, désinfection des surfaces, antisepsie, DASRI avec convention et bordereaux, traçabilité des lots. Accessibilité : cabine de plain-pied et table électrique réglable pour accueillir Mme BELKACEM.",
    "Avant la formation, je réutilisais le manche de ma lame et je jetais tout à la poubelle. J'ai corrigé : lames stériles à usage unique, collecteur pour piquants-coupants, convention de collecte des DASRI, bordereaux conservés. Je note désormais les lots des pigments et des lames. Pour Mme BELKACEM, j'ai prévu l'installation dans son fauteuil et adapté la hauteur de mon plan de travail.",
    "Poste préparé en cabine de spa : surfaces désinfectées, éclairage froid sans ombre, champ stérile, cartouches stériles à usage unique, housse sur le dermographe et le cordon. Pour Mme BELKACEM, transfert proposé sur la table électrique abaissée, qu'elle a refusé : prestation réalisée dans son fauteuil, avec un repose-tête. Collecteur DASRI, fiche de traçabilité complétée.",
    "Pour la correction de Mme LEROY, poste préparé avec deux pigments (correcteur et couleur) en godets individuels, lots notés. Hygiène des mains, gants, matériel stérile à usage unique, housse sur le dermographe, antisepsie après démaquillage. Je souffre du poignet : j'ai installé un appui pour l'avant-bras et prévu des pauses. Cabine réorganisée pour accueillir Mme BELKACEM en fauteuil.",
  ],
  // 3 — C4 et C5 : zone et pigments
  [
    "Pour Mme VIDAL : démaquillage, antisepsie, puis dessin préparatoire au crayon avec repères de la tête, de l'arc et de la queue, mesure de symétrie au compas. Validation dans le miroir. Phototype II, sous-ton froid : j'ai choisi un brun taupe légèrement réchauffé, car un pigment trop froid risque de virer au gris. Lot noté sur la fiche.",
    "Pour Mme NGUYEN, phototype III : zone démaquillée et désinfectée, répartition des taches dessinée au crayon. Pigment brun clair chaud. J'ai vérifié l'étiquette : mention « Mélange destiné à être utilisé dans des tatouages ou des maquillages permanents », liste des ingrédients, numéro de lot. Mélange noté sur la fiche.",
    "Pour Mme LEROY, sourcils gris-bleu : sur le cercle chromatique, le complémentaire du bleu est l'orangé ; j'ai donc prévu un correcteur orangé avant la couleur. Préparation : démaquillage, antisepsie, nouveau dessin qui recouvre l'ancien tracé. Mme LEROY a validé la forme. Je n'ai pas encore l'habitude de doser le correcteur : la formatrice m'a fait réduire la quantité.",
    "Pour Mme DIALLO, phototype V : lèvres démaquillées et désinfectées, contour dessiné au crayon et validé de face et de profil. Les zones foncées tirent vers le violet-bleu : neutralisation avec un correcteur chaud avant la couleur. Ma pratique de la coloration m'a aidé{e}, mais la peau réagit autrement : la couleur cicatrisée sera plus claire que sur le godet.",
    "J'ai préparé une fiche de choix des pigments pour l'institut : phototypes I à VI, sous-ton, couleur conseillée par zone, correcteurs. Cas de Mme VIDAL : brun taupe réchauffé ; Mme LEROY : correcteur orangé puis brun chaud ; Mme DIALLO : correcteur chaud sur les lèvres. Pigments conformes à REACH et au règlement (UE) 2020/2081, lots tracés.",
    "Avant, je prenais la couleur des cheveux. Pour Mme VIDAL, j'ai suivi la méthode : phototype II, sous-ton froid repéré au poignet, brun taupe légèrement réchauffé. Le virage gris de mon ancienne cliente venait sans doute d'un pigment trop froid et trop profond. Préparation : démaquillage, antisepsie, dessin mesuré et validé.",
    "Pour Mme MARCHAND, préparation de l'eye-liner : démaquillage doux sans produit gras, lentilles retirées, antisepsie adaptée à la zone, trait dessiné et validé avec ses lunettes. Pigment noir conforme, lot noté. Pour Mme NGUYEN, j'ai préparé en parallèle un brun clair chaud pour ses taches de rousseur.",
    "Pour Mme LEROY : analyse de l'ancien pigment (gris-bleu, dense, légèrement flou), correcteur orangé, puis brun chaud adapté à sa carnation. Les pigments inorganiques ont tendance à virer vers le chaud, ce qui aide dans son cas. Préparation : démaquillage, antisepsie, nouveau dessin, validation. J'ai noté la recette et les lots.",
  ],
  // 4 — C6 : dermographe et aiguilles
  [
    "Fiche de réglages : sourcils poudrés, aiguille à plusieurs pointes, vitesse moyenne, mouvement pendulaire léger ; contour des lèvres, une pointe, trait lent ; eye-liner, une pointe fine, pression très légère. Profondeur : épiderme jusqu'à la jonction dermo-épidermique. Sur latex 3D, mon poudré était trop saturé au début : j'ai allégé la pression.",
    "J'ai comparé un dermographe rotatif et un dermographe à cartouches : la cartouche à membrane limite la remontée de pigment et se change entièrement à chaque cliente. Pour chaque zone : configuration d'aiguilles, vitesse, angle et tension. Housse à usage unique sur le corps de l'appareil et le cordon.",
    "Mon geste d'ongles m'aide pour la précision, mais la tension de la peau est nouvelle. Sur latex : trait d'eye-liner avec une pointe, angle presque perpendiculaire ; ombrage du sourcil avec plusieurs pointes groupées, angle plus couché. Trop profond, le pigment migre et vire au bleu : la formatrice m'a fait ralentir.",
    "Sur latex, j'ai réglé le dermographe pour les lèvres de Mme DIALLO : contour avec une pointe, remplissage avec des pointes groupées, passages réguliers et légers. Je tends la peau à trois points. J'ai du mal à garder la même pression sur la courbe de la lèvre supérieure.",
    "J'ai rédigé pour l'institut un tableau des réglages par zone et par effet, avec le rappel : dépôt dans l'épiderme jusqu'à la jonction dermo-épidermique, trop profond = migration et virage bleuté, trop superficiel = mauvaise tenue. Chaque réglage utilisé est noté sur la fiche cliente avec le lot des aiguilles.",
    "Je ne connaissais que la lame. J'ai découvert le dermographe pour le poudré : plusieurs pointes groupées, vitesse moyenne, mouvement circulaire léger. Sur peau grasse, le poudré tient mieux que les traits de microblading. Sur latex, j'ai trouvé le bon rythme au troisième essai.",
    "Réglages pour la prestation du spa : eye-liner ras de cils avec une pointe fine et pression très légère ; taches de rousseur avec une pointe, piqûres brèves de profondeur variable sans dépasser la jonction. Tension douce sur la paupière. Sur latex, mes points de taches étaient trop réguliers : j'ai varié la durée.",
    "Pour la correction de Mme LEROY : ombrage léger avec plusieurs pointes groupées, passages progressifs pour ne pas surcharger une peau déjà pigmentée, angle couché. Peau mature et fine : vitesse modérée et tension douce. J'ai contrôlé la saturation en essuyant régulièrement.",
  ],
  // 5 — C7 : sourcils
  [
    "Prestation sur Mme VIDAL (modèle) : dessin validé, microblading poil à poil dans le sens de la pousse, densité plus forte sur le sourcil gauche pour corriger l'asymétrie. Brun taupe réchauffé. Résultat naturel, symétrie contrôlée en fin de séance. Photos avec autorisation, consignes écrites remises, retouche programmée après cicatrisation complète.",
    "J'ai réalisé un poudré léger sur latex, puis sur modèle. Choix de la technique électrique car la peau du modèle est grasse. Ombrage progressif plus clair à la tête du sourcil. Pour l'épreuve devant le jury, je m'entraîne aussi au microblading : mes traits manquent encore de finesse.",
    "Sur latex, microblading puis ombré. Mes premiers traits étaient trop longs et trop rapprochés ; j'ai corrigé en suivant le dessin de la pousse. Sur modèle, ombré doux validé par la formatrice. J'ai bien noté la différence entre l'effet juste après et l'effet attendu après cicatrisation.",
    "Prestation combinée sur modèle : traits manuels à la tête du sourcil, ombrage au dermographe sur le corps et la queue. Couleur choisie selon le phototype. La formatrice m'a fait reprendre la queue du sourcil gauche, trop épaisse. Photos et consignes remises.",
    "Correction de Mme LEROY (cas d'étude sur latex) : première séance de neutralisation au correcteur orangé, puis ombré brun chaud lors d'une séance ultérieure. J'ai expliqué à la cliente que la correction peut demander plusieurs séances et que le résultat n'est pas garanti en une fois.",
    "Ma pratique autodidacte m'avait habitué{e} à des traits très marqués. Pour Mme VIDAL, j'ai travaillé plus fin et plus espacé, selon le dessin validé. J'ai aussi réalisé mon premier poudré au dermographe sur modèle. La retouche est fixée après cicatrisation complète.",
    "Sourcils naturels sur modèle pour le spa : microblading léger sur la tête, poudré très doux sur le reste. Couleur claire adaptée à un phototype II. Résultat discret. J'ai rempli la fiche : technique, pigment, lot, réglages, consignes remises.",
    "Correction d'un sourcil ancien sur modèle : analyse, neutralisation, puis ombré. J'ai refusé de foncer davantage, la zone étant déjà chargée. Mme LEROY (cas fil rouge) : plan de correction en plusieurs séances, retouche après cicatrisation complète, photos avec autorisation.",
  ],
  // 6 — C8 : eye-liner
  [
    "Prestation sur latex puis cas de Mme MARCHAND : contre-indications vérifiées (pas d'infection ni de chirurgie récente des yeux), lentilles retirées, trait ras de cils dessiné et validé avec ses lunettes. Paupière tendue doucement, une pointe fine, pression très légère. Aucun anesthésiant fourni. Consignes spécifiques remises.",
    "Eye-liner ras de cils sur modèle : yeux fermés, pauses régulières, trait fin régulier entre les cils. J'ai dû reprendre l'angle externe, irrégulier. Consignes : pas de maquillage des yeux pendant la cicatrisation et pas de lentilles sans l'accord de l'ophtalmologiste.",
    "Sur latex, trois traits : ras de cils, fin et étiré. Le ras de cils est le plus sûr pour une première prestation. Pour Mme MARCHAND, sous traitement anticoagulant, j'ai attendu l'avis de son médecin avant de proposer un rendez-vous.",
    "Je n'avais jamais travaillé sur une paupière : sur latex, j'ai appris à tendre sans tirer. Pour Mme MARCHAND : trait ras de cils, pigment noir conforme, lot noté. Elle a demandé une crème anesthésiante : je l'ai renvoyée vers son médecin ou son pharmacien.",
    "Procédure eye-liner pour l'institut : contre-indications oculaires, avis médical en cas de doute, retrait des lentilles, dessin validé, protection de l'œil, réglages légers, consignes spécifiques. Prestation réalisée sur latex, puis observée et commentée sur modèle par la formatrice.",
    "L'eye-liner était nouveau pour moi. Sur latex, j'ai trouvé la pression juste au deuxième essai. Pour Mme MARCHAND, presbyte, validation du tracé avec ses lunettes avant de commencer. Trait fin, régulier, sans déborder sur la muqueuse.",
    "Prestation sur modèle au spa : trait ras de cils discret, adapté à une paupière légèrement tombante. Lentilles retirées, yeux fermés, tension douce. Pas d'anesthésiant médicamenteux. Consignes écrites remises et expliquées.",
    "Cas de Mme MARCHAND : je lui ai expliqué les risques de la zone oculaire et lui ai remis l'information préalable. Trait ras de cils dessiné, validé, puis réalisé sur latex selon le même tracé. J'ai mieux maîtrisé l'angle externe que lors de l'exercice précédent.",
  ],
  // 7 — C9 : lèvres
  [
    "Cas de Mme DIALLO, phototype V : avis médical obtenu pour l'herpès labial, traitement préventif prescrit par son médecin. Contour dessiné et validé, neutralisation des zones foncées avec un correcteur chaud, puis contour pour retrouver une lèvre nette. Sur latex, remplissage homogène ; la couleur finale est prévue à une séance ultérieure.",
    "« Lip blush » sur modèle : contour léger, remplissage rosé, effet naturel. J'ai vérifié les injections récentes : aucune. Consignes : hydratation, éviter les aliments épicés les premiers jours, pas de gommage. Lèvres gonflées après la séance, comme je l'avais annoncé.",
    "Sur latex : contour avec une pointe, remplissage avec des pointes groupées. Mon contour de la lèvre supérieure manquait de symétrie ; j'ai repris le dessin de profil. Pour Mme DIALLO, j'ai expliqué que la neutralisation pouvait demander plusieurs séances.",
    "Pour Mme DIALLO, ma connaissance des couleurs m'a aidé{e} : zones bleutées neutralisées par un correcteur chaud, puis couleur proche de sa teinte naturelle. Contour validé, aucun agrandissement de la bouche. Photos avec autorisation écrite.",
    "Prestation de lèvres sur modèle à l'institut : contour et remplissage, couleur adaptée à la carnation. J'ai reporté une autre cliente qui avait un bouton de fièvre le jour du rendez-vous. La procédure lèvres de l'institut prévoit la question de l'herpès dès l'entretien.",
    "Je n'avais jamais fait de lèvres. Sur latex, contour puis remplissage ; sur modèle, « lip blush » léger. Pour Mme DIALLO, j'ai d'abord travaillé la neutralisation sur latex, avec un correcteur chaud, avant de choisir la couleur.",
    "Pour le spa, prestation « lip blush » discrète sur modèle : contour dessiné de face et de profil, remplissage léger, couleur rosée adaptée. Consignes remises. Pour Mme DIALLO, plan en deux temps : neutralisation puis contour.",
    "Correction des lèvres de Mme DIALLO : analyse des zones foncées, avis médical pour l'herpès, neutralisation avec un correcteur chaud, puis contour pour corriger le flou. Je l'ai prévenue que le résultat se juge après cicatrisation complète, avant la retouche.",
  ],
  // 8 — C10 : taches de rousseur
  [
    "Pour Mme NGUYEN, phototype III : répartition dessinée au crayon, plus dense sur l'arête du nez et le haut des pommettes, plus espacée vers les tempes. Pigment brun clair chaud. Points de tailles et d'intensités différentes. Validation avant de commencer, photo du dessin, consignes de protection solaire.",
    "Sur latex, mes premières taches étaient alignées. J'ai recommencé en variant les tailles et les écarts. Sur modèle : peu de taches à la première séance, ajout prévu à la retouche. Couleur légèrement plus claire que prévu, car elle fonce les premiers jours.",
    "Pour Mme NGUYEN : repères pris sur ses quelques taches naturelles, couleur proche, répartition irrégulière. J'ai varié la durée de piqûre pour obtenir des taches plus ou moins marquées, sans dépasser la jonction dermo-épidermique.",
    "J'ai réalisé les taches de rousseur sur latex, puis sur modèle. Le choix de la couleur selon le phototype m'a paru proche de la coloration, mais le rendu sur peau est plus chaud. Consignes : protection solaire, pas de gommage pendant la cicatrisation.",
    "Prestation taches de rousseur pour la carte de l'institut : procédure écrite (dessin validé, répartition naturelle, couleur selon le phototype, densité progressive, retouche). Cas de Mme NGUYEN réalisé sur latex selon cette procédure.",
    "Je n'avais jamais proposé cette prestation. Sur latex : points irréguliers, couleur brun clair chaud, densité modérée. Pour Mme NGUYEN, j'ai photographié le dessin validé pour le comparer au résultat cicatrisé.",
    "Prestation phare du spa : taches discrètes sur modèle, répartition naturelle sur le nez et les pommettes, tailles variées. La formatrice a validé le rendu naturel. Consignes écrites remises, protection solaire recommandée.",
    "Pour Mme NGUYEN : dessin validé, couleur adaptée au phototype III, densité progressive. J'ai expliqué que l'effet s'atténue avec le temps et selon l'exposition au soleil, et qu'une retouche est possible après cicatrisation complète.",
  ],
  // 9 — C11 : soins post-prestation, retouche, bonnes pratiques
  [
    "Fiche de consignes pour Mme VIDAL : soins de la zone, ne pas gratter, pas de soleil, de piscine ni de sauna pendant la cicatrisation, environ 4 à 6 semaines. Couleur plus foncée au début, puis plus claire. Retouche après cicatrisation complète. En cas de rougeur qui s'aggrave ou de signe d'infection : consulter son médecin. Fiche cliente complétée : lots, réglages, consignes remises.",
    "J'ai préparé des consignes écrites par zone (sourcils, lèvres, yeux) et un message de suivi envoyé quelques jours après la prestation. Réclamation de cas : une cliente trouve ses sourcils trop foncés le lendemain ; je lui rappelle l'évolution normale de la couleur et lui propose un rendez-vous de contrôle avant la retouche.",
    "Consignes pour Mme MARCHAND après l'eye-liner : pas de maquillage des yeux pendant la cicatrisation, pas de lentilles sans l'accord de son ophtalmologiste, ne pas frotter. En cas de gêne oculaire inhabituelle, consulter un médecin. Retouche après cicatrisation complète.",
    "Consignes pour Mme DIALLO après les lèvres : hydratation de la zone, éviter les aliments épicés et les boissons très chaudes les premiers jours, pas de gommage. Traitement préventif de l'herpès selon la prescription de son médecin. Retouche programmée après cicatrisation complète.",
    "Procédure de suivi de l'institut : consignes écrites remises et signées, rendez-vous de contrôle, retouche après cicatrisation complète, registre des réclamations avec analyse (photos, fiche de traçabilité) et réponse écrite. Tenue expliquée : plusieurs années, atténuation progressive variable selon la peau, le soleil et les soins.",
    "Avant, je donnais les consignes à l'oral. Désormais, chaque cliente repart avec une fiche écrite. Réclamation de cas : sourcils virés après un an ; j'analyse la fiche (pigment, lot, réglages) et je propose une correction réaliste, sans promettre un résultat en une séance.",
    "Consignes pour la clientèle du spa : protection solaire, pas de hammam ni de sauna pendant la cicatrisation, pas de gommage. Je rappelle qu'aucun médicament n'est conseillé : la cliente s'adresse à son médecin ou à son pharmacien. Suivi par message et retouche après cicatrisation complète.",
    "Consignes pour Mme LEROY après la neutralisation : la couleur peut paraître orangée au début, avant la séance de couleur. Soins de la zone, pas de soleil. Suivi à mi-parcours, puis séance suivante après cicatrisation complète. Réclamation éventuelle traitée par écrit, à partir des photos et de la fiche.",
  ],
];

const BILANS_PERSONNELS = [
  "Ce travail m'a surtout appris à vérifier chaque étape avant de passer à la suivante.",
  "Le plus difficile a été de garder un geste régulier ; je continuerai à m'entraîner sur latex.",
  "J'ai montré le résultat à la formatrice, qui m'a fait deux remarques que j'ai intégrées.",
  "Cette partie me servira directement pour l'évaluation de fin de formation du jour 3.",
  "J'ai comparé mon travail avec celui d'une autre stagiaire, ce qui m'a fait corriger un oubli.",
  "La correction de la formatrice m'a permis de repérer une erreur de méthode que je ne referai plus.",
  "J'avais des doutes sur ce sujet en arrivant ; je me sens maintenant capable de le refaire seul{e}.",
  "Je me suis appuyé{e} sur les fiches fournies, que je réutiliserai dans ma cabine.",
  "Je n'ai pas eu le temps de finaliser toutes les photos, mais la démarche est complète.",
  "J'ai posé une question à la formatrice pendant l'atelier, ce qui m'a évité de partir dans la mauvaise direction.",
  "Je vais appliquer cette méthode dès mes premières clientes.",
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
  const c = t.match(/\bC(1[01]|[1-9])\b/);
  if (c) {
    const k = parseInt(c[1], 10);
    if (k <= 2) return 1;
    if (k === 3) return 2;
    if (k <= 5) return 3;
    return k - 2; // C6 → 4, C7 → 5, C8 → 6, C9 → 7, C10 → 8, C11 → 9
  }
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickMSP21ExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isMSP21Formation(intitule, code)) return null;
  const fem = isFeminin(s.civilite, s.prenom);
  const bloc = blocExercice(contexte || "", exerciceIdx);

  // Production tirée par permutation du rang du stagiaire, avec le même décalage pour toutes les
  // banques : un stagiaire garde le même terrain d'un exercice à l'autre, et sur un groupe de
  // 8 stagiaires les 8 productions d'un même exercice sont toutes différentes. Le bilan personnel
  // change d'un exercice à l'autre. La structure du stagiaire est citée quand elle est renseignée.
  const pool = EXERCICES_PRODUCTIONS[bloc];
  const production = pool[rang(stagiaireIdx, 3, pool.length)];
  const bilan = BILANS_PERSONNELS[rang(stagiaireIdx, bloc + 11, BILANS_PERSONNELS.length)];
  const entreprise = (s.entreprise || "").trim();
  const contexteEnt = entreprise && entreprise.toLowerCase() !== "entreprise"
    ? `J'ai aussi pensé l'exercice pour ma pratique chez ${entreprise}. `
    : "";
  return accorder(`${contexteEnt}${production} ${bilan}`, fem);
}

// ============================================================
// ÉVALUATION DES BESOINS — réponses humanisées, une par stagiaire
// ============================================================

const BESOINS_DIPLOMES = [
  "CAP Esthétique, cosmétique, parfumerie ; esthéticien{ne} en institut depuis 2019",
  "BP Esthétique, cosmétique, parfumerie",
  "BTS Métiers de l'esthétique, de la cosmétique et de la parfumerie",
  "Baccalauréat professionnel Esthétique, cosmétique, parfumerie",
  "CAP Esthétique, puis BP ; gérant{e} d'institut depuis 2014",
  "CAP Métiers de la coiffure, puis BP Coiffure ; coiff{eur} en salon depuis dix ans",
  "Certification de prothésiste ongulaire ; activité en salon depuis 2018",
  "CAP Esthétique, cosmétique, parfumerie, obtenu en reconversion après un parcours dans la vente",
  "BTS Métiers de l'esthétique ; esthéticien{ne} en spa d'hôtel",
  "Baccalauréat professionnel Esthétique, puis attestation de formation hygiène et salubrité (21 h)",
  "CAP Esthétique ; microblading pratiqué depuis un an après une formation courte non certifiante",
  "BP Esthétique, cosmétique, parfumerie ; esthéticien{ne} indépendant{e} à domicile",
  "CAP Esthétique et certificat de qualification professionnelle en maquillage ; centre esthétique depuis 2020",
  "Baccalauréat général, puis CAP Esthétique en apprentissage",
  "BTS Métiers de l'esthétique, option management ; responsable d'institut",
  "CAP Esthétique ; huit ans d'expérience en parfumerie-institut",
  "Diplôme d'esthétique obtenu à l'étranger, en cours de reconnaissance, et expérience en institut en France",
  "BP Coiffure, puis CAP Esthétique pour élargir mon activité",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant la formation.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières pendant les ateliers pratiques me conviennent.",
  "Non. Je porte des lunettes de près ; une lampe loupe sur le poste de pratique m'aiderait.",
  "Oui, une tendinite au poignet droit reconnue : un appui pour l'avant-bras et des pauses pendant les ateliers me seraient utiles.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je souhaite seulement disposer des fiches techniques en version numérique pour les relire.",
  "Oui, des douleurs lombaires : un siège réglable en hauteur et la possibilité de me lever régulièrement me conviennent.",
  "Non. Je préfère avoir les supports en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté lors de l'entretien préalable.",
  "Non. Aucune situation de handicap ; je signalerai à la formatrice toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible les trois jours de formation, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, en présentiel.",
  "J'ai bloqué les trois journées dans mon planning (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) ; mes rendez-vous clientes sont reportés.",
  "Je suis disponible les trois jours de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. Je peux venir avec un modèle pour les journées de pratique.",
  "Je peux suivre l'intégralité des trois journées en présentiel, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible les trois jours (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). Une collègue assure mes rendez-vous à l'institut pendant la formation.",
  "Disponibilité complète sur les trois journées (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). J'ai fermé mon activité à domicile sur cette période.",
  "Les trois jours de formation, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; le salon a adapté le planning de l'équipe.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> les trois jours. Je dois seulement partir à 16h45 un mercredi, ce que j'ai signalé à la formatrice.",
  "Je suivrai les trois journées en salle (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je prévois de m'entraîner sur latex le soir.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> des trois jours. J'ai prévenu mes clientes de mon absence.",
];

/** Réponses d'évaluation des besoins propres à la formation « Techniques de maquillage semi-permanent (RS6459) – 21 h », différentes pour chaque stagiaire. */
export function getMSP21EvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = msp21Seed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilMSP21(idx, s.nom, s.prenom);
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
      ? "Formation financée par mon compte personnel de formation (CPF, Mon Compte Formation), à mon initiative ; les journées de formation ont été organisées avec ma structure."
      : "Formation financée par mon compte personnel de formation (CPF, Mon Compte Formation), à mon initiative.",
    projetPro: ent(profil.projet),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
