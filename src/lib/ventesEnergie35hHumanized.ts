// ---------------------------------------------------------------------------
// « Techniques de vente dans le secteur des travaux énergétiques – 35 h » — moteur de réponses HUMANISÉES
// Formation professionnelle non certifiante : évaluation interne + attestation de fin de formation.
// 100 % statique (aucun appel IA / réseau).
// Chaque stagiaire reçoit des réponses DIFFÉRENTES et cohérentes :
//   • évaluation des besoins : un profil par stagiaire (besoin, objectif, projet, attentes de
//     l'employeur…), puis parcours / diplôme, handicap et disponibilités tirés à part
//   • test de positionnement de DÉBUT (10 questions ouvertes : diagnostic puis C1 à C6, 12 variantes)
//   • test de positionnement de FIN (mêmes thèmes, réponses maîtrisées, 12 variantes)
//   • mises en situation (copie du stagiaire, 8 productions par exercice + bilan personnel)
// Le choix suit le rang du stagiaire dans la session par une permutation : deux stagiaires
// d'un même groupe (jusqu'à la taille de la banque) n'ont jamais la même réponse à la même question.
// La civilité du formulaire stagiaire pilote les accords (M. / Mme).
// Les entreprises et les chiffres cités dans les copies sont fictifs.
// ---------------------------------------------------------------------------

/**
 * Vrai pour la formation exemple « Techniques de vente dans le secteur des travaux énergétiques – 35 h ».
 * Il faut à la fois « techniques de vente » et une mention de l'énergie (énergétique, énergie…) :
 * les autres formations commerciales (NTC, MCO, vente conseil en institut…) ne sont pas concernées.
 */
export function isTVTEFormation(intitule?: string, code?: string): boolean {
  void code;
  const t = (intitule || "").toLowerCase();
  return t.includes("techniques de vente") && /[ée]nerg/.test(t);
}

const normalize = (s: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

/** Empreinte déterministe et bien répartie à partir du nom + prénom. */
export function tvteSeed(nom?: string, prenom?: string): number {
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
 * {e} → e au féminin ; {le} → le ; {/ve} → ve ; {/se} → se ; {/rice} → rice (sinon eur) ;
 * {er} → ère (sinon er) ; {eur} → euse (sinon eur) ; {eux} → euse (sinon eux)
 */
function accorder(txt: string, fem: boolean): string {
  return txt
    .replace(/\{er\}/g, fem ? "ère" : "er")
    .replace(/\{eur\}/g, fem ? "euse" : "eur")
    .replace(/\{eux\}/g, fem ? "euse" : "eux")
    .replace(/\{\/rice\}/g, fem ? "rice" : "eur")
    .replace(/\{\/ve\}/g, fem ? "ve" : "")
    .replace(/\{\/se\}/g, fem ? "se" : "")
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
  typeof idx === "number" && idx >= 0 ? idx : tvteSeed(nom, prenom) % 9973;

// ---------------------------------------------------------------------------
// Questions ouvertes de positionnement — ordre des 10 mises en situation :
// diagnostic, C1 cadre technique, C1 aides, C2 découverte B2C, C2 B2B tertiaire,
// C3 argumentaire, C3 devis, C4 objections, C5 prospection, C6 conclusion et fidélisation
// ---------------------------------------------------------------------------
export const TVTE_QUESTIONS_OUVERTES: {
  debut: { question: string; reponseAttendue: string }[];
  fin: { question: string; reponseAttendue: string }[];
} = {
  debut: [
    { question: "Comment se déroulent aujourd'hui vos rendez-vous de vente, de la prise de contact à la signature, et d'où viennent vos clients ?", reponseAttendue: "Description des étapes réellement pratiquées (prise de contact, découverte, visite technique, proposition, devis, relance, signature), origine des contacts (demandes entrantes, prescripteurs, salons, parrainage), indicateurs connus ou non (taux de transformation, annulations)." },
    { question: "Que savez-vous du DPE, de la qualification RGE et des principaux travaux de rénovation énergétique que vous proposez ?", reponseAttendue: "DPE : étiquettes A à G, document opposable, calendrier d'interdiction de location des passoires thermiques ; qualification RGE exigée pour que le client accède à la plupart des aides ; gestes : isolation de l'enveloppe d'abord, puis ventilation et équipements (pompe à chaleur, chauffe-eau thermodynamique, solaire)." },
    { question: "Quelles aides à la rénovation énergétique connaissez-vous et comment les présentez-vous au client ?", reponseAttendue: "MaPrimeRénov' (Anah, selon les revenus et le projet), CEE (primes des fournisseurs d'énergie), éco-PTZ, TVA à 5,5 %, aides locales ; Mon Accompagnateur Rénov' pour la rénovation d'ampleur ; aides présentées comme estimations à vérifier selon le barème en vigueur, sans montant garanti." },
    { question: "Comment découvrez-vous les besoins d'un client particulier lors d'un premier rendez-vous ?", reponseAttendue: "Guide d'entretien, questions ouvertes, écoute active, reformulation ; motivations d'achat selon SONCAS ; situation du logement, usages, confort, budget, décideurs, délais ; contraintes de la copropriété le cas échéant." },
    { question: "En quoi la vente à un client professionnel diffère-t-elle de la vente à un particulier, et que savez-vous du décret tertiaire ?", reponseAttendue: "B2B : plusieurs décideurs, cycle plus long, raisonnement en coût global ; décret tertiaire : bâtiments tertiaires de 1 000 m² et plus, réduction de la consommation d'énergie finale de 40 % en 2030, 50 % en 2040, 60 % en 2050, déclaration sur OPERAT." },
    { question: "Comment construisez-vous vos arguments et comment calculez-vous ce que le client paiera réellement et en combien de temps il sera remboursé ?", reponseAttendue: "Méthode CAP / BAC, arguments reliés aux motivations du client, preuves vérifiables ; reste à charge = coût TTC − aides estimées ; temps de retour simple = reste à charge / économie annuelle estimée ; aucune promesse invérifiable." },
    { question: "Que doit contenir un devis de travaux de rénovation énergétique et comment présentez-vous votre proposition ?", reponseAttendue: "Mentions générales du devis (identité, SIRET, assurance décennale, désignation, quantités, prix HT, TVA, TTC, validité, délais, paiement) et mentions exigées pour les aides (qualification RGE, caractéristiques et performances des équipements et isolants) ; proposition qui part du besoin du client." },
    { question: "Comment réagissez-vous quand un client vous dit « c'est trop cher » ou « j'ai peur de me faire arnaquer » ?", reponseAttendue: "Écouter, reformuler, répondre par un argument ou une preuve (coût global, reste à charge, qualification RGE, assurances, références), vérifier l'adhésion ; concessions seulement contre une contrepartie ; jamais de pression ni de fausse urgence." },
    { question: "Comment trouvez-vous de nouveaux clients, et quelles règles s'appliquent à la prospection dans votre secteur ?", reponseAttendue: "Interdiction de la prospection téléphonique des consommateurs pour la rénovation énergétique (loi n° 2020-901 du 24 juillet 2020, art. L. 223-1 du code de la consommation) ; prescripteurs, partenariats, salons, parrainage, réseaux sociaux, site et avis ; RGPD et consentement pour l'emailing aux particuliers." },
    { question: "Comment concluez-vous une vente au domicile du client et que faites-vous après la signature ?", reponseAttendue: "Signaux d'achat, technique de conclusion sans pression ; contrat hors établissement : information précontractuelle, rétractation de 14 jours, formulaire type, aucun paiement avant 7 jours ; suivi de chantier, réception, satisfaction, entretien, recommandation." },
  ],
  fin: [
    { question: "Présentez le diagnostic de votre pratique commerciale et les priorités de progrès que vous en tirez.", reponseAttendue: "Portefeuille d'offres décrit, déroulé réel des rendez-vous et étapes manquantes, origine des contacts conforme, indicateurs chiffrés (rendez-vous, taux de transformation, annulations), 3 forces, 3 axes de progrès, 3 priorités reliées aux compétences C1 à C6." },
    { question: "Comment situez-vous un projet client dans son cadre technique et réglementaire : DPE, gestes, qualification RGE, audit énergétique ?", reponseAttendue: "Lecture du DPE et de ses conséquences (location des logements G depuis 2025, F en 2028, E en 2034), bouquet cohérent enveloppe puis équipements, qualification RGE vérifiable, audit énergétique obligatoire à la vente des maisons classées F, G puis E, points de la visite technique." },
    { question: "Comment présentez-vous les aides et le plan de financement de principe d'un ménage ?", reponseAttendue: "Principe de MaPrimeRénov', des CEE, de l'éco-PTZ, de la TVA à 5,5 % et des aides locales ; rôle de Mon Accompagnateur Rénov' ; plan de financement fondé sur les simulateurs officiels et le barème en vigueur ; précautions : estimations, demande avant travaux, montant notifié par l'organisme." },
    { question: "Décrivez votre méthode d'entretien de découverte avec un client particulier.", reponseAttendue: "Guide d'entretien en entonnoir, questions ouvertes, écoute active, prise de notes, motivations SONCAS identifiées, reformulation de synthèse validée, distinction parties communes et privatives en copropriété." },
    { question: "Comment abordez-vous un client professionnel soumis au décret tertiaire ?", reponseAttendue: "Rappel des obligations (1 000 m² et plus, − 40 % en 2030, − 50 % en 2040, − 60 % en 2050, OPERAT), interlocuteurs et attentes, questions B2B, démarche diagnostic puis plan d'actions et propositions, raisonnement en coût global." },
    { question: "Présentez votre argumentaire et votre calcul du reste à charge et du temps de retour.", reponseAttendue: "Arguments CAP / BAC reliés aux motivations SONCAS, preuves vérifiables, reste à charge = coût TTC − aides estimées, temps de retour simple = reste à charge / économie annuelle estimée, hypothèses écrites, liste des promesses interdites." },
    { question: "Quelles mentions avez-vous vérifiées sur votre devis et comment présentez-vous la proposition ?", reponseAttendue: "Mentions générales (SIRET, assurance décennale, désignation, prix, TVA, validité, délais, paiement) et mentions pour les aides (RGE, caractéristiques et performances) ; proposition structurée : besoin, solution, bénéfices, financement, planning, garanties, prochaine étape." },
    { question: "Comment traitez-vous les objections et menez-vous une négociation ?", reponseAttendue: "Écouter, reformuler, répondre, vérifier ; réponses adaptées au prix, à la confiance, au délai, aux aides et à la technique ; concessions limitées contre contreparties ; aucune pression ni fausse urgence." },
    { question: "Présentez votre plan de prospection conforme à la réglementation.", reponseAttendue: "Interdiction de la prospection téléphonique en rénovation énergétique et exception du contrat en cours ; au moins 6 actions conformes (prescripteurs, partenariats, salons, parrainage, réseaux sociaux, site et avis) avec cible, message, coût et indicateur ; RGPD ; objectifs chiffrés." },
    { question: "Comment concluez-vous la vente dans les règles et fidélisez-vous le client ?", reponseAttendue: "Signaux d'achat et technique de conclusion ; information précontractuelle, droit de rétractation de 14 jours, formulaire type, aucun paiement avant 7 jours, demande expresse si démarrage anticipé ; suivi jusqu'à la réception avec procès-verbal, satisfaction, entretien, recommandation." },
  ],
};

// ---------------------------------------------------------------------------
// Positionnement de DÉBUT — 10 questions × 12 variantes [réponse, score]
// Le score suit le contenu : 0 = ne sait pas ou se trompe, 0,5 = notion partielle, 1 = juste.
// Une seule réponse à 1 dans deux questions seulement, C1 cadre et C2 professionnels : au plus 6 / 10.
// ---------------------------------------------------------------------------
type Rep = [string, number];

const DEBUT: Rep[][] = [
  // Q1 — diagnostic de la pratique commerciale
  [
    ["Je fais les rendez-vous que l'assistante me cale, je présente la pompe à chaleur et je laisse le devis. Je n'ai jamais vraiment réfléchi aux étapes.", 0],
    ["Les contacts viennent surtout du site et des recommandations. Je relance par téléphone quand le devis n'est pas signé au bout de deux semaines.", 0.5],
    ["Je sais que je signe à peu près un devis sur quatre, mais je ne sais pas pourquoi les trois autres ne signent pas.", 0.5],
    ["Avant, chez mon ancien employeur, on appelait des particuliers à partir d'une liste. Je pensais que c'était normal dans le métier.", 0],
    ["Mon rendez-vous type : visite technique, prise de mesures, puis le devis par mail le lendemain. Je ne parle presque jamais du budget pendant la visite.", 0.5],
    ["Je viens du commerce automobile, je découvre le secteur. Je n'ai pas encore de méthode propre aux travaux.", 0],
    ["J'ai eu cinq annulations après signature l'an dernier ; je pense que c'est le délai de rétractation, mais je ne sais pas comment l'éviter.", 0.5],
    ["Je ne suis aucun indicateur, c'est la direction qui regarde les chiffres.", 0],
    ["Je suis technicien à la base, je vends parce que je connais le produit. Le côté commercial, je le fais à l'instinct.", 0],
    ["Nos clients viennent beaucoup des salons et de la foire de printemps. Ensuite, je fais le rendez-vous chez eux et je reviens avec le devis.", 0.5],
    ["Je n'ai pas de déroulé fixe ; ça dépend du client et de mon humeur, honnêtement.", 0],
    ["Je sais que la découverte est importante, mais en pratique je parle surtout du matériel parce que c'est ce que je maîtrise.", 0.5],
  ],
  // Q2 — C1 DPE, RGE, gestes
  [
    ["Le DPE, c'est la note de la maison sur la facture d'électricité, je crois.", 0],
    ["RGE, c'est un label qu'on a sur nos camions ; je ne saurais pas dire à quoi il sert exactement.", 0],
    ["Je sais que le DPE va de A à G et que F et G sont les passoires thermiques ; le reste du calendrier, je ne le connais pas bien.", 0.5],
    ["Pour moi, il faut d'abord changer la chaudière, l'isolation c'est secondaire.", 0],
    ["Je sais que sans entreprise RGE le client n'a pas certaines aides, mais je ne sais pas lesquelles exactement.", 0.5],
    ["Je connais bien les pompes à chaleur air/eau ; l'isolation et la ventilation, beaucoup moins.", 0.5],
    ["J'ai entendu dire que certains logements ne pourront plus être loués, sans savoir lesquels ni quand.", 0.5],
    ["Le DPE classe les logements de A à G ; il est opposable depuis 2021 ; les logements G ne peuvent plus être mis en location depuis 2025, puis ce sera F en 2028 et E en 2034. On isole d'abord, on change le chauffage ensuite, et il faut être RGE pour que le client ait les aides.", 1],
    ["L'audit énergétique et le DPE, pour moi c'est la même chose.", 0],
    ["Je sais qu'on doit vérifier les radiateurs avant de proposer une pompe à chaleur, pour la température de l'eau ; j'ignore la partie réglementaire.", 0.5],
    ["Je ne connais pas les organismes qui délivrent la qualification RGE.", 0],
    ["Je ne pense pas que le DPE serve à quelque chose dans la vente ; les clients ne le lisent pas.", 0],
  ],
  // Q3 — C1 aides et financement
  [
    ["Je connais MaPrimeRénov' et les primes énergie, mais je mélange souvent les deux.", 0.5],
    ["Je donne au client le montant que m'indique mon responsable, sans vérifier.", 0],
    ["Je crois que les aides sont les mêmes pour tout le monde.", 0],
    ["L'éco-PTZ, je n'en ai jamais entendu parler.", 0],
    ["Je sais que les aides dépendent des revenus du ménage ; je ne connais pas les barèmes.", 0.5],
    ["Je dis souvent au client que l'aide est garantie, pour le rassurer.", 0],
    ["Je sais qu'il faut faire la demande d'aide avant de commencer les travaux, mais je ne sais pas expliquer pourquoi.", 0.5],
    ["Mon Accompagnateur Rénov', je ne vois pas ce que c'est.", 0],
    ["Je sais que la TVA est réduite pour certains travaux de rénovation, à 5,5 % je crois, sans connaître les conditions.", 0.5],
    ["Je laisse le client se débrouiller avec les aides, ce n'est pas mon travail.", 0],
    ["Les CEE, je pensais que c'était une aide de l'État versée par les impôts.", 0],
    ["J'utilise parfois le simulateur de France Rénov' avec le client, mais je ne sais pas toujours interpréter le résultat.", 0.5],
  ],
  // Q4 — C2 découverte d'un client particulier
  [
    ["Je commence par présenter l'entreprise et nos produits, ensuite je demande ce qu'il veut.", 0],
    ["Je pose surtout des questions techniques : surface, type de chauffage, année de construction.", 0],
    ["J'essaie de poser des questions ouvertes, mais je coupe souvent la parole quand je pense avoir compris.", 0.5],
    ["SONCAS, je ne connais pas.", 0],
    ["Je demande au client pourquoi il nous a contactés et ce qui le gêne aujourd'hui dans sa maison.", 0.5],
    ["Je ne parle jamais du budget, ça me met mal à l'aise.", 0],
    ["Je sais que la reformulation est importante, je le fais à la fin mais pas toujours.", 0.5],
    ["J'écoute le client, je prends quelques notes, et je vérifie si les deux conjoints sont présents pour décider.", 0.5],
    ["En copropriété, je pense que le copropriétaire peut décider seul d'isoler sa façade.", 0.5],
    ["Je ne prépare pas mes rendez-vous, je découvre le client en arrivant.", 0],
    ["Je fais une visite technique complète, mais je ne demande pas au client ce qui compte le plus pour lui.", 0.5],
    ["Je pense que le client sait ce qu'il veut, mon rôle c'est de lui donner un prix.", 0],
  ],
  // Q5 — C2 client professionnel et décret tertiaire
  [
    ["Je n'ai jamais vendu à des professionnels, seulement à des particuliers.", 0],
    ["Je sais qu'il y a plusieurs décideurs chez un professionnel, ça prend plus de temps.", 0.5],
    ["Le décret tertiaire, j'en ai entendu parler, je crois qu'il concerne les grands bureaux.", 0.5],
    ["Pour moi un professionnel achète comme un particulier, c'est juste plus gros.", 0],
    ["Le décret tertiaire concerne les bâtiments tertiaires de 1 000 m² et plus ; il faut réduire la consommation de 40 % d'ici 2030, puis 50 % et 60 %, et déclarer les consommations chaque année sur OPERAT. Je ne l'ai encore jamais utilisé en rendez-vous.", 1],
    ["OPERAT, je ne sais pas ce que c'est.", 0],
    ["Je pense que le décret tertiaire oblige à installer des panneaux solaires.", 0],
    ["Les professionnels regardent surtout le retour sur investissement, ça je l'ai compris.", 0.5],
    ["Je ne sais pas qui contacter dans une entreprise : le dirigeant, le comptable, le gestionnaire ?", 0],
    ["Je sais qu'en B2B il y a souvent un cahier des charges et une mise en concurrence.", 0.5],
    ["Je n'ai pas d'idée de la différence entre propriétaire et locataire dans les obligations.", 0],
    ["Je confonds le décret tertiaire et la réglementation des bâtiments neufs.", 0],
  ],
  // Q6 — C3 argumentaire, reste à charge, temps de retour
  [
    ["Mon argument principal, c'est que la pompe à chaleur fait faire des économies.", 0.5],
    ["Je présente les caractéristiques techniques de la machine, la puissance et la marque.", 0.5],
    ["La méthode CAP, je ne connais pas.", 0],
    ["Je dis au client qu'il va diviser sa facture par trois, c'est ce qu'on m'a appris.", 0],
    ["Je sais calculer le reste à charge : le prix moins les aides. Pour le temps de retour, je ne sais pas faire.", 0.5],
    ["Je ne fais pas de calcul, j'envoie le devis et le client voit.", 0],
    ["Je mets parfois en avant l'écologie, mais je ne sais pas si ça compte pour le client.", 0],
    ["J'utilise les avis de nos clients comme preuve, ça rassure.", 0.5],
    ["Je crois que les travaux peuvent être presque gratuits avec les aides, je le dis parfois.", 0],
    ["J'essaie d'adapter mes arguments à ce que le client m'a dit, mais sans méthode.", 0.5],
    ["Je ne sais pas ce qu'est un bénéfice client par rapport à un avantage.", 0],
    ["Le temps de retour, je le donne au hasard, autour de huit ans.", 0],
  ],
  // Q7 — C3 devis et proposition
  [
    ["Le devis est fait par le logiciel, je ne regarde pas les mentions.", 0],
    ["Je sais qu'il faut le prix HT, la TVA et le TTC, et une date de validité.", 0.5],
    ["Je ne sais pas ce qu'il faut mettre sur le devis pour que le client ait les aides.", 0],
    ["Je mets le numéro RGE en bas du devis parce que c'est demandé, sans savoir pourquoi.", 0.5],
    ["L'assurance décennale doit apparaître, je crois, avec le nom de l'assureur.", 0.5],
    ["Je n'ai jamais fait de proposition commerciale écrite, seulement des devis.", 0],
    ["Je présente le devis ligne par ligne et je vérifie au moins la désignation des travaux et les quantités.", 0.5],
    ["Pour moi, un devis n'engage à rien, on peut le modifier après la signature.", 0],
    ["Je sais qu'il faut détailler les équipements, la marque et la référence.", 0.5],
    ["Je ne sais pas ce que veut dire SIRET.", 0],
    ["Je fais des devis très courts pour que ce soit lisible ; je ne mets pas les performances des isolants.", 0],
    ["J'explique le devis au client et je lui laisse le temps de le relire.", 0.5],
  ],
  // Q8 — C4 objections et négociation
  [
    ["Quand c'est trop cher, je propose tout de suite une remise.", 0],
    ["Si le client veut réfléchir, je lui dis que l'offre n'est valable qu'aujourd'hui.", 0],
    ["Je réponds que nos concurrents font du mauvais travail.", 0],
    ["Face à la peur des arnaques, je montre notre qualification RGE et nos avis.", 0.5],
    ["J'essaie de comprendre ce qui est trop cher : le total ou la mensualité.", 0.5],
    ["Je reformule parfois l'objection, mais je ne vérifie pas que ma réponse a convaincu.", 0.5],
    ["Je n'aime pas les objections, j'ai l'impression que le client m'attaque.", 0],
    ["Je sais qu'on ne doit pas donner une remise sans rien obtenir en échange, mais je le fais quand même.", 0.5],
    ["Je réponds à l'objection technique avec beaucoup de détails, parfois trop.", 0],
    ["Je laisse parler le client quand il objecte, puis je réponds avec l'exemple d'un chantier comparable.", 0.5],
    ["Quand le client parle des travaux à 1 €, je ne sais pas quoi répondre.", 0],
    ["Je préfère partir que négocier.", 0],
  ],
  // Q9 — C5 prospection et réglementation
  [
    ["On a une liste de numéros achetée, j'appelle des particuliers le matin.", 0],
    ["Je sais qu'il est interdit d'appeler les particuliers pour certains travaux, je crois que c'est l'isolation.", 0.5],
    ["Je pense que si le numéro n'est pas sur Bloctel, on peut appeler.", 0],
    ["On trouve nos clients par les salons et par les recommandations des anciens clients.", 0.5],
    ["Je ne prospecte pas, j'attends les demandes du site.", 0],
    ["Je sais qu'il y a une loi de 2020 sur le démarchage dans la rénovation, sans connaître le détail.", 0.5],
    ["Je publie parfois nos chantiers sur Facebook, mais ce n'est pas organisé.", 0],
    ["Le RGPD, c'est pour les grandes entreprises, je ne pense pas que ça nous concerne.", 0],
    ["Les architectes et les agences immobilières nous envoient parfois des clients ; on ne les remercie pas vraiment.", 0.5],
    ["Je ne sais pas ce qu'est un prescripteur.", 0],
    ["Je pense qu'on peut envoyer des emails commerciaux à toutes les adresses qu'on trouve.", 0],
    ["Je sais qu'on peut rappeler un client qui nous a demandé de le rappeler ; pour le reste, je ne suis pas sûr{e}.", 0.5],
  ],
  // Q10 — C6 conclusion, rétractation, fidélisation
  [
    ["Je fais signer le bon de commande à la fin du rendez-vous et je prends un acompte.", 0],
    ["Je sais que le client peut se rétracter, je crois que c'est 14 jours.", 0.5],
    ["Je ne connais pas le formulaire de rétractation.", 0],
    ["Je sais qu'en vente à domicile on n'encaisse rien pendant quelques jours, sans savoir combien.", 0.5],
    ["Je demande au client s'il préfère démarrer en mars ou en avril ; ça marche bien.", 0.5],
    ["Après la signature, c'est le chef de chantier qui prend le relais, je ne revois plus le client.", 0],
    ["Je sais que la réception des travaux fait partir les garanties, mais je n'y assiste jamais.", 0.5],
    ["Je demande parfois des avis Google aux clients contents.", 0.5],
    ["Je propose le contrat d'entretien de la pompe à chaleur à la mise en service.", 0.5],
    ["Je ne sais pas reconnaître le moment où le client est prêt à signer.", 0],
    ["Je pense que le délai de rétractation ne s'applique pas si le client nous a appelés.", 0],
    ["Je n'ai jamais demandé de recommandation à un client.", 0],
  ],
];

// ---------------------------------------------------------------------------
// Positionnement de FIN — 10 questions × 12 variantes [réponse, score]
// ---------------------------------------------------------------------------
const FIN: Rep[][] = [
  // Q1 — diagnostic
  [
    ["Mon diagnostic : je signe un devis sur quatre, j'ai eu cinq annulations l'an dernier et je ne faisais pas de vraie découverte. Mes priorités : guide de découverte, plan de financement de principe à chaque rendez-vous, check-list de conclusion conforme.", 1],
    ["J'ai décrit mon portefeuille : pompes à chaleur air/eau, chauffe-eau thermodynamiques, un peu d'isolation ; 80 % de particuliers. J'ai repéré que je n'abordais jamais le budget.", 1],
    ["Mes contacts viennent du site, des salons et de deux agences immobilières ; aucun appel à froid, ce qui est conforme.", 1],
    ["Je sais maintenant décrire mon rendez-vous étape par étape ; je dois encore mettre en place le suivi de mes indicateurs.", 0.5],
    ["Trois forces : connaissance technique, réactivité, avis clients. Trois axes : découverte, objections, conclusion. Chaque priorité est reliée à une compétence.", 1],
    ["J'ai calculé mon taux de transformation sur six mois : 22 %. Mon objectif est 30 % d'ici la fin de l'année.", 1],
    ["J'ai identifié que mes annulations venaient de signatures trop rapides, sans plan de financement clair.", 1],
    ["Mon tableau de suivi a quatre colonnes : rendez-vous, devis, signatures, annulations ; je le remplis chaque semaine.", 1],
    ["J'ai fait le diagnostic ; il me manque encore des chiffres fiables sur l'origine de mes contacts.", 0.5],
    ["J'ai compris que je parlais trop du matériel et pas assez du client : c'est ma priorité n° 1.", 1],
    ["Le diagnostic m'a fait arrêter de relancer par téléphone des personnes qui n'avaient rien demandé.", 0.5],
    ["Mes priorités sont écrites dans mon plan de progrès, avec une date de bilan avec ma responsable.", 1],
  ],
  // Q2 — C1 cadre technique et réglementaire
  [
    ["Le DPE va de A à G, il est opposable depuis 2021 ; les logements G sont exclus de la location depuis 2025, F le seront en 2028 et E en 2034. Je l'explique au client avec son propre DPE.", 1],
    ["Je propose toujours l'enveloppe d'abord : combles, murs, planchers bas, ventilation, puis la pompe à chaleur dimensionnée sur les besoins réduits.", 1],
    ["J'explique que notre qualification RGE est vérifiable sur l'annuaire de France Rénov' et qu'elle conditionne la plupart des aides.", 1],
    ["L'audit énergétique est obligatoire à la vente des maisons classées F ou G, et E depuis 2025 ; il est aussi utile pour une rénovation d'ampleur.", 1],
    ["Ma check-list de visite : isolation, menuiseries, ventilation, émetteurs, puissance électrique, emplacement de l'unité extérieure, ballon d'eau chaude.", 1],
    ["Je maîtrise le DPE et le RGE ; je dois encore revoir les points techniques de la ventilation.", 0.5],
    ["Je distingue maintenant le DPE, qui estime la performance du logement, et l'audit, qui propose des scénarios de travaux.", 1],
    ["Pour les Ferrand, maison de 1978 étiquette F : isolation des combles et des murs, VMC, puis pompe à chaleur à la place du fioul, et je leur explique l'échéance de 2028 pour la location.", 1],
    ["Je connais les organismes de qualification : Qualibat, Qualit'EnR, Qualifelec.", 0.5],
    ["Je ne vends plus une pompe à chaleur sans avoir vérifié l'isolation et les émetteurs.", 1],
    ["J'explique le DPE simplement, avec les deux critères : énergie et gaz à effet de serre.", 0.5],
    ["Je relie l'étiquette du DPE au projet du client : vendre, louer ou rester.", 1],
  ],
  // Q3 — C1 aides
  [
    ["Je présente MaPrimeRénov' versée par l'Anah selon les revenus et le projet, les CEE financés par les fournisseurs d'énergie, l'éco-PTZ sans intérêts, la TVA à 5,5 % et les aides locales.", 1],
    ["Pour la rénovation d'ampleur, j'explique que Mon Accompagnateur Rénov' est obligatoire et ce qu'il fait pour le ménage.", 1],
    ["Mon plan de financement part du simulateur officiel ; j'écris toujours « barème en vigueur à vérifier sur france-renov.gouv.fr ».", 1],
    ["Je dis trois choses au client : ce sont des estimations, la demande se fait avant les travaux, le montant est notifié par l'organisme.", 1],
    ["Je ne promets plus aucun montant ; je montre la simulation et je la date.", 1],
    ["Je fais la différence entre MaPrimeRénov' et les CEE ; je dois encore pratiquer l'éco-PTZ avec la banque.", 1],
    ["La TVA à 5,5 % s'applique aux travaux d'amélioration énergétique des logements de plus de deux ans ; je le vérifie sur chaque devis.", 1],
    ["J'oriente vers l'espace conseil France Rénov' quand le client a un doute sur son éligibilité.", 0.5],
    ["Je présente le reste à charge et le prêt éventuel, pas seulement les aides.", 1],
    ["Je sais présenter les aides ; les aides locales de ma région me demandent encore des recherches.", 0.5],
    ["Je n'utilise plus le mot « gratuit », même quand le reste à charge est faible.", 1],
    ["Je garde une copie de la simulation dans le dossier du client.", 1],
  ],
  // Q4 — C2 découverte B2C
  [
    ["Je prépare un guide d'entretien : logement, usages, confort, budget, décideurs, délais, expériences passées.", 1],
    ["Je pose des questions ouvertes du type « Comment se passe l'hiver chez vous ? » et je laisse parler.", 1],
    ["Je repère les motivations SONCAS : souvent Sécurité et Argent, parfois Confort.", 1],
    ["Je termine par une reformulation et je demande au client si j'ai bien compris.", 1],
    ["Je parle du budget pendant la découverte, sans gêne, en demandant une fourchette.", 1],
    ["Je fais la découverte avec méthode ; je dois encore apprendre à me taire plus longtemps.", 0.5],
    ["En copropriété, je distingue les travaux votés en assemblée générale et ceux qui relèvent du copropriétaire.", 1],
    ["Je vérifie que tous les décideurs sont présents, sinon je propose un second rendez-vous.", 1],
    ["J'utilise la grille SONCAS ; je dois encore mieux relier chaque motivation à mes arguments.", 0.5],
    ["Je note les mots du client pour les reprendre dans la proposition.", 1],
    ["Je fais la visite technique après la découverte, pas avant.", 1],
    ["Ma découverte dure maintenant vingt minutes au lieu de cinq.", 1],
  ],
  // Q5 — C2 B2B et décret tertiaire
  [
    ["Décret tertiaire : bâtiments de 1 000 m² et plus, − 40 % en 2030, − 50 % en 2040, − 60 % en 2050 par rapport à une année de référence, déclaration annuelle sur OPERAT.", 1],
    ["J'identifie le propriétaire, les locataires et le gestionnaire, et ce que chacun attend.", 1],
    ["Je pose des questions sur les consommations, l'année de référence, les contrats d'exploitation et le circuit de décision.", 1],
    ["Je propose une démarche : données, diagnostic, plan d'actions hiérarchisé, propositions chiffrées, suivi.", 1],
    ["En B2B, je raisonne en coût global et en retour sur investissement.", 1],
    ["Je comprends le décret tertiaire ; je n'ai pas encore mené de vrai rendez-vous B2B.", 0.5],
    ["Pour la SCI Les Tilleuls, j'ai préparé dix questions et un plan en trois étapes.", 1],
    ["Je sais que les obligations sont partagées entre propriétaire et locataires.", 0.5],
    ["Je distingue maintenant clairement la vente aux particuliers et aux professionnels.", 1],
    ["Je commence par la régulation et le pilotage avant les gros travaux, c'est souvent plus rentable.", 0.5],
    ["Je propose un premier rendez-vous de collecte des données avant tout chiffrage.", 1],
    ["J'ai noté que les professionnels mettent souvent plusieurs entreprises en concurrence.", 1],
  ],
  // Q6 — C3 argumentaire et calculs
  [
    ["Mes arguments suivent la méthode CAP puis BAC : caractéristique, avantage, preuve, puis le bénéfice pour le client.", 1],
    ["Je relie chaque argument à une motivation SONCAS repérée pendant la découverte.", 1],
    ["Reste à charge = coût TTC − aides estimées ; je l'écris avec les hypothèses.", 1],
    ["Temps de retour simple = reste à charge / économie annuelle estimée ; je le présente comme un ordre de grandeur.", 1],
    ["Je n'emploie plus les mots « gratuit » ni « garanti » pour les aides et les économies.", 1],
    ["Mes preuves : étude thermique, fiche technique, avis clients vérifiables, qualification RGE.", 1],
    ["Je sais construire l'argumentaire ; mes calculs de temps de retour doivent encore être relus.", 1],
    ["J'ai réécrit mes cinq arguments principaux, chacun avec une preuve.", 0.5],
    ["Je parle confort et valeur du bien autant qu'économies.", 1],
    ["Je fais le calcul avec le client sur le tableur, il voit les chiffres.", 0.5],
    ["Je sais quelles promesses sont interdites, comme se dire mandaté par l'État.", 1],
    ["Je prépare deux scénarios chiffrés pour laisser le choix au client.", 1],
  ],
  // Q7 — C3 devis et proposition
  [
    ["Je vérifie sur le devis : SIRET, assurance décennale et assureur, désignation, quantités, prix HT, TVA, TTC, validité, délais, paiement.", 1],
    ["Pour les aides, j'ajoute la qualification RGE, les marques, références et performances des équipements et la résistance thermique des isolants.", 1],
    ["Ma proposition suit un plan : besoin, solution, bénéfices, financement, planning, garanties, prochaine étape.", 1],
    ["Je présente la proposition en dix minutes, en reprenant les mots du client.", 1],
    ["J'ai une check-list de devis que je passe avant chaque envoi.", 1],
    ["Je relis le devis d'un collègue avec la même check-list ; on a trouvé trois oublis.", 1],
    ["Je fais des propositions écrites maintenant, pas seulement des devis.", 1],
    ["Je maîtrise les mentions générales ; pour les mentions liées aux aides, je m'aide encore de la fiche.", 0.5],
    ["Je présente le devis après avoir rappelé le besoin, jamais en premier.", 1],
    ["Je fixe toujours la prochaine étape à la fin de la présentation.", 0.5],
    ["Je joins l'attestation d'assurance à la proposition.", 1],
    ["J'explique la durée de validité du devis sans en faire un argument de pression.", 1],
  ],
  // Q8 — C4 objections
  [
    ["J'écoute, je reformule, je réponds avec une preuve, puis je vérifie que la réponse convient.", 1],
    ["« C'est trop cher » : je fais préciser, puis je parle de coût global, de reste à charge et de mensualité.", 1],
    ["« On m'a déjà arnaqué » : je montre la qualification RGE vérifiable, les assurances, les références et j'explique le délai de 7 jours sans paiement.", 1],
    ["Les travaux à 1 € : j'explique loyalement que ces offres ont donné lieu à des fraudes et que le démarchage téléphonique est interdit pour ces travaux.", 1],
    ["Je ne donne aucune remise sans contrepartie : signature, recommandation ou souplesse de planning.", 1],
    ["« Je veux réfléchir » : je cherche ce qui reste à éclaircir et je fixe une date de rappel convenue.", 1],
    ["Je n'utilise plus la fausse urgence.", 1],
    ["Je traite bien le prix ; les objections techniques sur la pompe à chaleur par grand froid me demandent encore de la pratique.", 0.5],
    ["Pour les aides, j'oriente vers la simulation officielle et je présente les montants comme des estimations.", 1],
    ["Je prépare mes réponses aux six objections les plus fréquentes.", 1],
    ["Je reste calme face aux objections, je les vois comme des questions.", 0.5],
    ["En négociation, je connais à l'avance ma marge de manœuvre.", 1],
  ],
  // Q9 — C5 prospection
  [
    ["La prospection téléphonique des particuliers est interdite pour la rénovation énergétique depuis la loi du 24 juillet 2020, article L. 223-1 du code de la consommation, sauf contrat en cours.", 1],
    ["Mon plan : deux agences immobilières et un syndic comme prescripteurs, la foire de printemps, une réunion d'information en mairie, le parrainage, les réseaux sociaux et les avis Google.", 1],
    ["Pour chaque action : cible, message, moyens, coût, indicateur.", 1],
    ["RGPD : information des personnes, durée de conservation, consentement pour l'emailing aux particuliers, droit d'opposition.", 1],
    ["Objectifs : 20 demandes entrantes par mois, 12 rendez-vous, 8 devis, 3 signatures.", 1],
    ["Je remercie systématiquement les prescripteurs et je leur donne des nouvelles du chantier.", 1],
    ["J'ai supprimé le fichier de numéros acheté par mon ancien employeur.", 1],
    ["Je connais l'interdiction ; je dois encore construire mes partenariats.", 0.5],
    ["Je publie un chantier par semaine sur les réseaux, avec l'accord du client.", 1],
    ["Je sais que rappeler un client qui l'a demandé reste possible.", 0.5],
    ["Je mesure l'origine de chaque contact pour savoir quelle action marche.", 1],
    ["Bloctel, c'est fini depuis août 2026 (il faut le consentement préalable) ; et pour la rénovation énergétique, c'est une interdiction pure et simple.", 1],
  ],
  // Q10 — C6 conclusion et fidélisation
  [
    ["Je repère les signaux d'achat, comme une question sur la date de démarrage, puis je conclus par l'alternative.", 1],
    ["Au domicile : information précontractuelle, contrat daté et signé, droit de rétractation de 14 jours expliqué, formulaire type joint.", 1],
    ["Aucun paiement ni chèque encaissé avant 7 jours après la signature.", 1],
    ["Si le client veut démarrer avant la fin du délai, je lui demande une demande expresse écrite.", 1],
    ["Je suis le client jusqu'à la réception des travaux, avec procès-verbal avec ou sans réserves.", 1],
    ["Après la réception, j'envoie le questionnaire de satisfaction et je propose le contrat d'entretien.", 1],
    ["Je demande une recommandation après une réception réussie, jamais avant.", 1],
    ["Je maîtrise la conclusion ; la partie suivi de chantier dépend encore beaucoup de mon collègue.", 0.5],
    ["Je n'accepte plus d'acompte le jour de la signature à domicile.", 1],
    ["Je relis la check-list de conclusion avant chaque rendez-vous.", 1],
    ["Mon taux d'annulation a baissé depuis que j'explique clairement la rétractation.", 1],
    ["Je propose le parrainage aux clients satisfaits, avec des avis authentiques.", 1],
  ],
];

/** Décalages de permutation des 10 questions ouvertes de début (choisis pour étaler les notes). */
const SEL_DEBUT = [48, 51, 45, 10, 4, 58, 45, 36, 47, 42];

export function getTVTEAutoAnswers(
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
export function tvteNoteDebutSur20(idx?: number, nom?: string, prenom?: string): number {
  return NOTES_DEBUT_SUR_20[rang(baseIndex(idx, nom, prenom), 23, NOTES_DEBUT_SUR_20.length)];
}

/** Bonnes réponses au QCM de positionnement de début (10 questions → 2 à 6, soit 4 à 12/20). */
export function tvteBonnesQcmDebut(nbQuestions: number, idx?: number, nom?: string, prenom?: string): number {
  return Math.floor((tvteNoteDebutSur20(idx, nom, prenom) / 20) * nbQuestions);
}

/**
 * Réponses au QCM de positionnement de début : exactement le nombre de bonnes réponses de
 * `tvteBonnesQcmDebut`, les autres sur une option fausse (déterministe).
 */
export function tvteReponsesQcmDebut(
  questions: { options: string[]; correctIndex: number }[],
  idx: number,
  nom?: string,
  prenom?: string,
): number[] {
  const n = questions.length;
  const bonnes = tvteBonnesQcmDebut(n, idx, nom, prenom);
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
export function tvteNoteExercice(stagiaireIdx: number, exerciceIdx: number, estQcm: boolean): number {
  const notes = estQcm ? NOTES_QCM_SUR_10 : NOTES_EXERCICE_SUR_5;
  return notes[rang(stagiaireIdx, exerciceIdx + 31, notes.length)];
}

// ---------------------------------------------------------------------------
// Profils de besoins — un projet cohérent par stagiaire : besoin principal (analyse des besoins),
// objectif et projet (partie stagiaire), attentes, missions et contribution (partie entreprise).
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
    besoin: "Passer d'une vente centrée sur la pompe à chaleur à une vraie découverte des besoins du client avant toute proposition.",
    objectif: "Je veux structurer mes rendez-vous chez les particuliers : découverte, visite technique, proposition chiffrée, conclusion dans les règles.",
    projet: "Elle me permettra de mieux transformer les demandes que reçoit l'entreprise et de devenir référent{e} commercial{e} pour les pompes à chaleur.",
    attentes: "L'entreprise attend une hausse du taux de transformation des devis de pompes à chaleur et moins de devis envoyés sans suite.",
    missions: "Rendez-vous chez les particuliers, visites techniques, devis, suivi des dossiers jusqu'à la mise en service.",
    contribution: "Elle doit améliorer le chiffre d'affaires de l'activité pompes à chaleur sans augmenter le nombre de rendez-vous.",
  },
  {
    besoin: "Expliquer clairement le DPE, la qualification RGE et les aides sans annoncer de montant non vérifié.",
    objectif: "Mon objectif est de maîtriser le cadre réglementaire et les aides pour conseiller les ménages avec exactitude et gagner leur confiance.",
    projet: "Elle m'aidera à évoluer vers un poste de conseill{er} en rénovation énergétique au sein de l'entreprise.",
    attentes: "Nous attendons {un} {collab} capable de présenter un plan de financement de principe fiable et des dossiers d'aides complets.",
    missions: "Accueil des demandes, premiers rendez-vous, simulations d'aides, constitution des dossiers.",
    contribution: "Elle doit réduire les dossiers d'aides incomplets ou refusés, qui retardent les chantiers.",
  },
  {
    besoin: "Répondre aux objections sur le prix et sur la confiance, dans un secteur marqué par les fraudes.",
    objectif: "Je souhaite savoir traiter les objections sans baisser systématiquement le prix et rassurer les clients méfiants.",
    projet: "Elle me permettra de préserver nos marges tout en signant davantage de chantiers d'isolation.",
    attentes: "L'entreprise attend moins de remises accordées et un discours rassurant fondé sur des preuves vérifiables.",
    missions: "Présentation des devis d'isolation, négociation, relances, signature des contrats.",
    contribution: "Elle doit limiter les remises, qui pèsent aujourd'hui sur la rentabilité des chantiers.",
  },
  {
    besoin: "Trouver de nouveaux clients sans démarchage téléphonique, interdit pour la rénovation énergétique.",
    objectif: "Mon objectif est de construire un réseau de prescripteurs et un plan de prospection conforme pour remplir mon agenda.",
    projet: "Elle me prépare à prendre en charge le développement commercial de l'agence que l'entreprise ouvre l'an prochain.",
    attentes: "Nous attendons que {le_sal} développe des partenariats avec des agences immobilières, des syndics et des architectes.",
    missions: "Prospection, partenariats, salons, animation des réseaux sociaux de l'agence, rendez-vous.",
    contribution: "Elle doit réduire notre dépendance aux plateformes de mise en relation, coûteuses par contact.",
  },
  {
    besoin: "Conclure les ventes au domicile dans le respect du contrat hors établissement et réduire les annulations.",
    objectif: "Je veux maîtriser la conclusion et les règles de la vente à domicile pour que les ventes signées tiennent.",
    projet: "Elle me permettra de sécuriser mes ventes et de mieux accompagner les clients jusqu'à la réception des travaux.",
    attentes: "L'entreprise attend une baisse des annulations après signature et des contrats toujours conformes.",
    missions: "Rendez-vous au domicile, signature des contrats, coordination avec le chef de chantier.",
    contribution: "Elle doit sécuriser le carnet de commandes et éviter les litiges avec les clients.",
  },
  {
    besoin: "Vendre aux professionnels, notamment aux propriétaires de bâtiments tertiaires soumis au décret tertiaire.",
    objectif: "Mon objectif est de développer la clientèle professionnelle de l'entreprise : bureaux, commerces, petits bâtiments tertiaires.",
    projet: "Elle m'aidera à devenir chargé{e} d'affaires pour les clients professionnels.",
    attentes: "Nous attendons {un} {collab} capable de mener un rendez-vous B2B et de présenter les obligations du décret tertiaire.",
    missions: "Rendez-vous avec des gestionnaires et des dirigeants, collecte des données, propositions chiffrées.",
    contribution: "Elle doit ouvrir un nouveau marché, plus stable que la clientèle de particuliers.",
  },
  {
    besoin: "Construire un argumentaire chiffré : reste à charge, temps de retour, bénéfices pour le client.",
    objectif: "Je souhaite présenter des propositions claires et chiffrées qui donnent envie au client de passer à l'action.",
    projet: "Elle me permettra de faire des propositions de rénovation globale et pas seulement de geste par geste.",
    attentes: "L'entreprise attend des propositions écrites complètes avec plan de financement de principe.",
    missions: "Chiffrage, rédaction des propositions et des devis, présentation aux clients.",
    contribution: "Elle doit augmenter le panier moyen grâce à des bouquets de travaux cohérents.",
  },
  {
    besoin: "Acquérir les bases de la vente après une reconversion venue d'un métier technique.",
    objectif: "Je viens du chantier et je découvre la vente : je veux apprendre une méthode complète, de la découverte à la conclusion.",
    projet: "Elle m'aidera à réussir ma reconversion vers un poste de technico-commercial{e}.",
    attentes: "Nous attendons que {le_sal} transforme sa connaissance technique en atout commercial auprès des clients.",
    missions: "Visites techniques, conseil, préparation des devis, premiers rendez-vous de vente accompagnés.",
    contribution: "Elle doit renforcer l'équipe commerciale avec un profil technique crédible auprès des clients.",
  },
  {
    besoin: "Rédiger des devis complets et conformes, avec les mentions exigées pour les aides.",
    objectif: "Mon objectif est de produire des devis et des propositions sans oubli, qui ne bloquent pas les dossiers d'aides.",
    projet: "Elle me permettra de prendre en charge l'administration des ventes de l'entreprise.",
    attentes: "L'entreprise attend des devis vérifiés avec une check-list et des dossiers d'aides acceptés du premier coup.",
    missions: "Préparation des devis, vérification des mentions, suivi administratif des dossiers d'aides.",
    contribution: "Elle doit raccourcir les délais entre la signature et le démarrage des chantiers.",
  },
  {
    besoin: "Fidéliser les clients après chantier et obtenir des recommandations.",
    objectif: "Je veux organiser le suivi des clients jusqu'à la réception et au-delà, pour développer les contrats d'entretien et le parrainage.",
    projet: "Elle m'aidera à mettre en place un service de suivi client dans l'entreprise.",
    attentes: "Nous attendons davantage de contrats d'entretien et de recommandations de clients satisfaits.",
    missions: "Suivi de chantier côté client, mise en service, questionnaires de satisfaction, contrats d'entretien.",
    contribution: "Elle doit développer un chiffre d'affaires récurrent avec les contrats d'entretien.",
  },
  {
    besoin: "Prendre confiance en rendez-vous et oser parler du budget avec le client.",
    objectif: "Mon objectif est d'être à l'aise en rendez-vous, d'aborder le budget sans gêne et de mieux écouter le client.",
    projet: "Elle me permettra de mener seul{e} mes rendez-vous, sans être accompagné{e} par ma responsable.",
    attentes: "L'entreprise attend que {le_sal} devienne autonome en rendez-vous d'ici trois mois.",
    missions: "Rendez-vous chez les particuliers, découverte, présentation des solutions, relances.",
    contribution: "Elle doit libérer du temps à la responsable commerciale, qui accompagne encore chaque rendez-vous.",
  },
  {
    besoin: "Vendre le photovoltaïque en autoconsommation de façon loyale, sans promesse de rendement invérifiable.",
    objectif: "Je souhaite présenter le solaire en autoconsommation avec des chiffres honnêtes et des arguments adaptés à chaque foyer.",
    projet: "Elle m'aidera à développer l'activité solaire que l'entreprise vient de lancer.",
    attentes: "Nous attendons {un} {collab} capable de présenter des estimations de production prudentes et de rassurer les clients.",
    missions: "Rendez-vous, étude de la toiture et des consommations, propositions, suivi des raccordements.",
    contribution: "Elle doit faire décoller la nouvelle activité solaire sans exposer l'entreprise à des litiges.",
  },
];

/** Profil du stagiaire : même résultat dans l'analyse des besoins et dans l'évaluation des besoins. */
function profilTVTE(idx: number | undefined, nom?: string, prenom?: string): ProfilBesoin {
  return PROFILS[rang(baseIndex(idx, nom, prenom), 2, PROFILS.length)];
}

export function getTVTEBesoin(nom?: string, prenom?: string, civilite?: string, idx?: number): string {
  return accorder(profilTVTE(idx, nom, prenom).besoin, isFeminin(civilite, prenom));
}

// ---------------------------------------------------------------------------
// Mises en situation — production écrite du stagiaire (cas fil rouge ou dossier réel anonymisé)
// Indices : 0 diagnostic, 1 C1 cadre technique, 2 C1 aides, 3 C2 découverte B2C, 4 C2 B2B tertiaire,
//           5 C3 argumentaire, 6 C3 devis, 7 C4 objections, 8 C5 prospection, 9 C6 conclusion ;
//           8 productions par banque.
// La k-ième production de chaque banque suit la même entreprise : un stagiaire garde le même
// terrain d'un exercice à l'autre (entreprises et chiffres fictifs).
//   0 pompes à chaleur, Clermont-Ferrand · 1 isolation, Tours · 2 photovoltaïque, Montpellier
//   3 menuiseries et isolation, Metz · 4 rénovation globale, Rennes · 5 génie climatique tertiaire, Lille
//   6 chauffage bois, Annecy · 7 plomberie-chauffage, Bordeaux
// ---------------------------------------------------------------------------
const EXERCICES_PRODUCTIONS: string[][] = [
  // 0 — Diagnostic de départ
  [
    "Mon poste : technico-commercial{e} dans une entreprise de chauffage de 18 salariés près de Clermont-Ferrand, qualifiée RGE. Portefeuille : pompes à chaleur air/eau surtout, chauffe-eau thermodynamiques. Mes rendez-vous : visite technique, puis devis envoyé par mail ; je ne parle presque jamais du budget. Contacts : site et salon de l'habitat. Indicateurs : 9 rendez-vous par semaine, un devis signé sur quatre, 4 annulations cette année. Forces : technique, réactivité, avis clients. À améliorer : découverte, plan de financement, conclusion. Mes priorités : un guide de découverte, un plan de financement de principe à chaque rendez-vous, une check-list de conclusion.",
    "Je suis conseill{er} commercial{e} dans une entreprise d'isolation de Tours (combles, isolation des murs par l'extérieur), 11 salariés. Je fais surtout des rendez-vous chez des particuliers venus par le site et par deux agences immobilières. Je présente la technique et les aides tout de suite, sans découverte. Taux de transformation estimé : 30 %, mais je ne le suis pas. Forces : connaissance des isolants, aisance orale. À améliorer : questions ouvertes, traitement du prix, suivi des chiffres. Priorités : tenir un tableau de suivi, structurer la découverte, préparer les réponses aux objections de prix.",
    "Commercial{e} dans une entreprise de photovoltaïque en autoconsommation à Montpellier. J'ai été formé{e} par un ancien employeur qui appelait des particuliers à partir de listes : j'ai compris que ce n'était pas conforme pour ces travaux. Aujourd'hui, mes contacts viennent du site et de la foire. Indicateurs : 6 rendez-vous par semaine, 2 signatures, beaucoup de questions sur la rentabilité. Forces : enthousiasme, maîtrise du produit. À améliorer : estimations de production prudentes, argumentaire chiffré, conformité. Priorités : prospection conforme, calcul honnête du temps de retour, conclusion dans les règles.",
    "Je travaille comme conseill{er} en rénovation chez un fabricant-poseur de menuiseries qui fait aussi de l'isolation, à Metz. Rendez-vous en showroom et au domicile. Je vends bien les fenêtres mais je ne propose jamais l'isolation en complément. Contacts : showroom, parrainage, salon. Indicateurs : panier moyen bas, peu de bouquets de travaux. Forces : accueil, relation client. À améliorer : vision globale du logement, aides, proposition écrite. Priorités : comprendre le DPE, proposer des bouquets cohérents, rédiger des propositions complètes.",
    "Chargé{e} d'affaires dans une entreprise de rénovation globale à Rennes qui travaille avec un bureau d'études. Nos clients sont des ménages en rénovation d'ampleur accompagnés par Mon Accompagnateur Rénov'. Rendez-vous longs, dossiers complexes. Indicateurs : 3 signatures par mois, délai moyen de décision de deux mois. Forces : technique, dossiers d'aides. À améliorer : découverte des motivations, présentation orale de la proposition, relances. Priorités : SONCAS, argumentaire orienté bénéfices, suivi des relances.",
    "Technico-commercial{e} en génie climatique pour une entreprise de Lille qui travaille surtout pour des professionnels : bureaux, commerces, petits bâtiments tertiaires. Mes contacts viennent de gestionnaires d'immeubles et d'appels d'offres. Je connais mal le décret tertiaire, que les clients évoquent de plus en plus. Indicateurs : 5 propositions par mois, 1 à 2 signées. Forces : technique, réseau. À améliorer : démarche B2B structurée, coût global, présentation aux décideurs. Priorités : maîtriser le décret tertiaire, préparer des questions B2B, raisonner en retour sur investissement.",
    "Vend{eur} en showroom dans une entreprise de chauffage au bois près d'Annecy : poêles à granulés, inserts, chaudières à granulés. Les clients viennent en magasin ; je fais ensuite la visite technique. Je ne fais pas de vraie découverte : je montre les modèles exposés. Indicateurs : bon taux de signature en magasin, mais des annulations après les visites à domicile. Forces : connaissance des produits, contact. À améliorer : découverte, aides, conclusion à domicile. Priorités : guide de découverte, explication des aides, règles du contrat hors établissement.",
    "Assistant{e} commercial{e} dans une entreprise de plomberie-chauffage de Bordeaux, 8 salariés : chauffe-eau thermodynamiques, VMC, pompes à chaleur. Je prépare les devis et je commence à faire des rendez-vous seul{e}. Contacts : clients existants, site, recommandations. Indicateurs : je ne les connais pas, c'est le gérant qui suit. Forces : rigueur administrative, connaissance des clients. À améliorer : confiance en rendez-vous, argumentation, budget. Priorités : préparer mes rendez-vous, oser parler budget, suivre mes propres indicateurs.",
  ],
  // 1 — C1 cadre technique et réglementaire (projet Ferrand)
  [
    "Pour les Ferrand, maison de 1978 étiquette F : j'explique que le DPE estime la consommation d'énergie et les émissions de gaz à effet de serre, de A à G, et qu'il est opposable depuis 2021. En F, ils ne pourront plus louer à partir de 2028. Bouquet : isolation des combles et des murs, VMC, puis pompe à chaleur air/eau dimensionnée après isolation. Notre qualification RGE est vérifiable sur l'annuaire France Rénov'. Visite : isolation existante, radiateurs, puissance électrique, emplacement de l'unité extérieure, bruit pour les voisins.",
    "J'ai expliqué le DPE aux Ferrand avec leur propre document : deux critères, énergie et climat, étiquette F. Calendrier de location : G exclus depuis 2025, F en 2028, E en 2034. Je propose d'abord l'isolation des combles perdus et des murs, puis le chauffage. L'audit énergétique serait obligatoire s'ils vendaient la maison classée F ; il est utile pour une rénovation d'ampleur. La qualification RGE conditionne la plupart des aides : je la montre avec son numéro.",
    "Projet Ferrand : étiquette F, chaudière fioul. Je commence par le DPE, document opposable, et l'échéance de 2028 pour louer. Je propose isolation de l'enveloppe, ventilation, pompe à chaleur ; le photovoltaïque n'est pas prioritaire tant que la maison n'est pas isolée. RGE : qualification par domaine de travaux, vérifiable en ligne. Audit : obligatoire à la vente des maisons F et G, et E depuis 2025.",
    "Pour les Ferrand, je relie le DPE au projet de location : étiquette F, location impossible à partir de 2028 sans travaux. Ordre des gestes : menuiseries en mauvais état et isolation des murs, combles, VMC, puis pompe à chaleur. J'explique que le DPE est une estimation et que l'audit énergétique propose des scénarios de travaux. RGE : Qualibat pour l'isolation, Qualit'EnR ou Qualibat pour la pompe à chaleur.",
    "Les Ferrand sont dans le cas type d'une rénovation d'ampleur : étiquette F, chauffage au fioul, maison de 1978. DPE opposable, interdiction de location en 2028. Scénario : isolation complète de l'enveloppe, ventilation, pompe à chaleur, chauffe-eau thermodynamique, avec un audit énergétique préalable. Notre qualification RGE couvre tous les gestes ; Mon Accompagnateur Rénov' sera nécessaire pour les aides à la rénovation d'ampleur.",
    "Je n'ai pas de client particulier dans mon activité, j'ai donc traité le cas Ferrand. DPE de A à G, opposable depuis 2021 ; étiquette F donc location interdite dès 2028. Je raisonne comme en tertiaire : réduire d'abord les besoins par l'enveloppe et la ventilation, puis choisir l'équipement. Qualification RGE indispensable pour les aides. Points de visite : isolation, réseau de chauffage, émetteurs, ventilation, électricité.",
    "Pour les Ferrand, j'ai comparé pompe à chaleur et chaudière à granulés après isolation. J'explique le DPE, étiquette F, et le calendrier de location jusqu'en 2028. Isolation d'abord, ventilation, puis chauffage. RGE : Qualibois pour le bois, vérifiable sur France Rénov'. Visite : conduit de fumée, local de stockage des granulés, radiateurs.",
    "J'ai préparé l'explication du DPE pour les Ferrand en mots simples : la maison est classée F, c'est une passoire thermique, et en 2028 elle ne pourra plus être louée. Je propose isolation des combles, VMC, pompe à chaleur et chauffe-eau thermodynamique à la place du ballon électrique. Je montre notre qualification RGE. Je vérifie à la visite la ventilation existante et la place pour le chauffe-eau.",
  ],
  // 2 — C1 aides et plan de financement
  [
    "Aides présentées aux Ferrand : MaPrimeRénov' versée par l'Anah selon leurs revenus et le projet, CEE financés par les fournisseurs d'énergie, éco-PTZ sans intérêts, TVA à 5,5 %, aide éventuelle de la métropole. Pour une rénovation d'ampleur, Mon Accompagnateur Rénov' est obligatoire. Plan de financement de principe : coût TTC du cas, aides issues du simulateur France Rénov', reste à charge financé par l'éco-PTZ. J'ai écrit « barème en vigueur à vérifier sur france-renov.gouv.fr ». Mes trois précautions : estimations, demande avant travaux, montant notifié par l'organisme.",
    "Je distingue les aides : MaPrimeRénov' de l'Anah, les primes CEE, l'éco-PTZ et la TVA réduite pour les logements de plus de deux ans. Plan de financement : coût TTC, aides estimées avec le simulateur officiel, reste à charge. Je ne garantis aucun montant : le montant définitif est notifié par l'organisme. Mon Accompagnateur Rénov' accompagne le ménage dans la rénovation d'ampleur.",
    "Pour le solaire, j'ai vérifié les aides applicables dans le cas et j'ai traité le dossier Ferrand pour la partie isolation et chauffage : MaPrimeRénov', CEE, éco-PTZ, TVA à 5,5 %. Plan de financement de principe à partir du simulateur, sans montant inventé, avec la mention du barème à vérifier. Je rappelle que la demande d'aide se fait avant de signer le démarrage des travaux.",
    "Plan de financement Ferrand : je liste les aides par principe, MaPrimeRénov', CEE, éco-PTZ, TVA à 5,5 %, aides locales de la collectivité. Je n'écris aucun montant sans la simulation officielle. Mon Accompagnateur Rénov' intervient pour une rénovation d'ampleur. Je présente le reste à charge et la mensualité d'un éco-PTZ éventuel.",
    "Dans notre activité, tous les dossiers passent par Mon Accompagnateur Rénov' : j'ai expliqué son rôle aux Ferrand, définir le projet et monter le dossier MaPrimeRénov' de rénovation d'ampleur. CEE et éco-PTZ en complément. Plan de financement fondé sur l'audit et la simulation officielle. Précautions : conditions de ressources, accord de l'Anah avant travaux, montant notifié par l'organisme.",
    "En tertiaire, les aides aux ménages ne s'appliquent pas, mais les CEE existent aussi pour les bâtiments professionnels. Pour le cas Ferrand : MaPrimeRénov', CEE, éco-PTZ, TVA à 5,5 %, Mon Accompagnateur Rénov' pour une rénovation d'ampleur. Plan de financement de principe avec la mention du barème à vérifier et les trois précautions.",
    "Pour une chaudière à granulés chez les Ferrand, j'ai listé les aides par principe : MaPrimeRénov' par geste selon les revenus, CEE, éco-PTZ, TVA à 5,5 %. Je ne donne pas de montant sans la simulation officielle, que je date. Je rappelle que l'entreprise doit être RGE pour le geste concerné.",
    "J'ai fait la simulation des aides des Ferrand sur le simulateur officiel avec le formateur. Aides : MaPrimeRénov', CEE, éco-PTZ, TVA réduite. Je présente le reste à charge, pas seulement les aides. Je dis clairement que le montant n'est pas garanti par l'entreprise et qu'il sera confirmé par l'organisme.",
  ],
  // 3 — C2 découverte d'un client particulier (Mme Lopez)
  [
    "Guide de découverte pour Mme Lopez : logement, chauffage, factures, confort l'hiver, projets, budget, décideurs, craintes. Pendant le jeu, j'ai laissé des silences et reformulé deux fois. Motivations SONCAS : Sécurité en premier (peur des arnaques), Argent (factures électriques), Confort. Reformulation : « Si je vous comprends bien, vous voulez réduire vos factures sans risque et être sûre de l'entreprise. » En copropriété, l'isolation de la façade relève de l'assemblée générale ; le remplacement des radiateurs relève de Mme Lopez.",
    "J'ai préparé dix questions ouvertes en entonnoir. Mme Lopez a parlé de son froid dans la chambre et d'une mauvaise expérience avec un démarcheur. SONCAS : Sécurité, Confort, Argent. Ma reformulation a été validée. Observateur : j'ai coupé la parole une fois. Copropriété : je lui ai conseillé de demander l'inscription de l'isolation à l'ordre du jour de l'assemblée générale.",
    "Découverte de Mme Lopez : je n'ai pas parlé du solaire, qui ne concerne pas son appartement. Questions sur les usages, les factures, le confort et le calendrier. SONCAS : Argent et Sécurité. J'ai reformulé ses priorités et proposé un second rendez-vous avec son fils, qui l'aide à décider. Parties communes votées en assemblée générale, équipements privatifs à sa charge.",
    "Mon guide de découverte reprend la grille SONCAS. Mme Lopez : Sécurité (arnaques), Confort (fenêtres froides), Argent. Je l'ai fait parler de ses fenêtres : simple vitrage dans deux pièces. Reformulation validée. Les fenêtres sont privatives dans son règlement de copropriété, mais l'aspect extérieur peut être soumis à autorisation.",
    "Entretien de découverte : j'ai commencé par « Qu'est-ce qui vous a amenée à nous contacter ? ». Écoute active, prise de notes. SONCAS : Sécurité et Argent dominants. Reformulation de synthèse validée. Pour la copropriété, j'ai expliqué que les travaux collectifs se votent en assemblée générale et qu'un audit de la copropriété peut être utile.",
    "J'ai joué Mme Lopez puis le vendeur. En découverte, je pose des questions plus ouvertes qu'en B2B, et j'aborde ses craintes. SONCAS : Sécurité, Argent, Confort. Reformulation validée. Copropriété : isolation par l'extérieur votée en assemblée générale ; radiateurs à sa charge.",
    "Découverte de Mme Lopez sans montrer le catalogue. Questions ouvertes sur l'hiver, les factures, les priorités. SONCAS : Sécurité et Confort. J'ai reformulé et vérifié qu'elle était seule décisionnaire. Le chauffage au bois n'est pas adapté à son appartement : je l'ai dit honnêtement et proposé une autre piste.",
    "J'étais stressé{e} mais j'ai suivi mon guide : six thèmes, questions ouvertes, reformulation. Mme Lopez exprime surtout Sécurité et Argent selon SONCAS. J'ai osé demander une fourchette de budget. En copropriété, je distingue les parties communes, votées en assemblée générale, et les équipements privatifs.",
  ],
  // 4 — C2 client professionnel et décret tertiaire (SCI Les Tilleuls)
  [
    "SCI Les Tilleuls, bureaux de 1 200 m² : le décret tertiaire s'applique car la surface dépasse 1 000 m². Objectifs : − 40 % en 2030, − 50 % en 2040, − 60 % en 2050 par rapport à une année de référence postérieure à 2009, ou une valeur absolue. Déclaration annuelle sur OPERAT. Interlocuteurs : le gérant (patrimoine), les trois locataires (confort, charges). Démarche : données, diagnostic, plan d'actions, propositions. Différence avec le B2C : plusieurs décideurs, cycle long, coût global.",
    "Pour la SCI Les Tilleuls, j'ai préparé dix questions : consommations par usage, année de référence, accès à OPERAT, contrats d'exploitation, horaires d'occupation, budget, calendrier, décideurs. Décret tertiaire : obligations partagées entre propriétaire et locataires. Démarche en quatre étapes avec un premier rendez-vous de collecte des données.",
    "Je ne vends qu'à des particuliers, mais le cas des Tilleuls m'a appris le décret tertiaire : bâtiments tertiaires de 1 000 m² et plus, objectifs 2030, 2040, 2050, déclaration sur OPERAT. Le photovoltaïque peut contribuer en autoconsommation, mais la réduction des consommations passe d'abord par le pilotage et l'enveloppe.",
    "SCI Les Tilleuls : j'ai identifié trois interlocuteurs et leurs attentes. Décret tertiaire : − 40 % d'ici 2030 et déclaration sur OPERAT. Pour les menuiseries, je proposerais un diagnostic puis un remplacement par étapes, chiffré en coût global. En B2B, j'aurai un cahier des charges et de la concurrence.",
    "Démarche pour les Tilleuls : collecte des données OPERAT, audit énergétique, plan d'actions hiérarchisé (régulation, éclairage, isolation, pompe à chaleur), propositions chiffrées en coût global. Le décret tertiaire fixe − 40 %, − 50 %, − 60 % ; les obligations sont partagées avec les locataires. Cycle de décision long : je prévois un calendrier de rendez-vous.",
    "C'est mon cœur de métier. SCI Les Tilleuls : 1 200 m², donc soumis au décret tertiaire ; je vérifie l'année de référence et les déclarations OPERAT. Je propose d'abord la gestion technique du bâtiment et la régulation, rentables vite, puis la rénovation des équipements. Je présente au gérant un plan sur cinq ans aligné sur l'échéance de 2030.",
    "Les Tilleuls : décret tertiaire, surface de plus de 1 000 m², objectifs de réduction et OPERAT. Le chauffage au bois collectif peut être une piste, mais je commence par les données de consommation. Questions B2B : décideurs, budget, contrats en cours. Différence avec le particulier : décision collective et raisonnement en retour sur investissement.",
    "Je n'avais jamais entendu parler du décret tertiaire avant cette formation. Pour les Tilleuls : bâtiments tertiaires de 1 000 m² et plus, − 40 % en 2030, déclaration sur OPERAT. J'ai préparé dix questions et je propose de commencer par un chauffe-eau thermodynamique et la ventilation, après un diagnostic.",
  ],
  // 5 — C3 argumentaire, reste à charge, temps de retour
  [
    "Arguments CAP / BAC pour les Ferrand : pompe à chaleur air/eau (caractéristique), chauffe sans fioul (avantage), étude thermique du cas (preuve), donc fin des livraisons de fioul et des factures imprévisibles (bénéfice Argent et Confort). Reste à charge = coût TTC fictif de 24 000 € moins les aides estimées du cas ; temps de retour simple = reste à charge divisé par l'économie annuelle estimée, présenté comme un ordre de grandeur. Promesses interdites : « gratuit », économies garanties, se dire mandaté par l'État.",
    "Cinq arguments, chacun relié à SONCAS : isolation des combles = moins de déperditions = étude thermique = maison plus chaude et factures réduites. Reste à charge calculé à partir des aides estimées du cas, hypothèses écrites. Temps de retour simple calculé et présenté avec précaution, car il dépend du prix de l'énergie. Je n'emploie jamais le mot « garanti ».",
    "Pour le solaire, je fais très attention : estimation de production prudente, part autoconsommée, temps de retour simple = reste à charge / économie annuelle estimée. Pour les Ferrand, j'ai calculé le reste à charge du cas et le temps de retour, en rappelant qu'ils dépendent des usages. Arguments CAP / BAC reliés à Argent et Nouveauté.",
    "Argumentaire : fenêtres et isolation (caractéristique), confort et silence (avantage), fiches techniques et avis clients (preuve), bénéfice Confort et valeur du bien. Reste à charge = coût TTC − aides estimées du cas. Temps de retour : je le calcule mais je mets en avant le confort, plus parlant pour ce client.",
    "En rénovation d'ampleur, je présente trois bénéfices : confort, maîtrise des factures, valeur du logement. CAP / BAC appliqués à chaque geste. Reste à charge = coût TTC − aides estimées ; temps de retour simple calculé sur l'économie estimée par l'audit. Je liste les promesses interdites dans ma trame.",
    "Même en particulier, je raisonne en coût global : reste à charge = coût TTC − aides estimées, temps de retour = reste à charge / économie annuelle estimée. Arguments CAP / BAC reliés à Argent et Sécurité. Preuves : étude thermique, garanties, références.",
    "Pour la chaudière à granulés : caractéristique rendement, avantage énergie locale, preuve fiche technique, bénéfice indépendance face au fioul. Reste à charge et temps de retour simple calculés avec les données du cas. Je n'avance aucune économie garantie.",
    "J'ai rédigé mes arguments avec la méthode CAP puis BAC ; c'était nouveau pour moi. Reste à charge calculé : coût TTC du cas moins aides estimées. Temps de retour simple calculé avec l'aide du formateur. Je retiens qu'on présente toujours des estimations.",
  ],
  // 6 — C3 proposition commerciale et devis conforme
  [
    "Proposition pour les Ferrand : rappel du besoin avec leurs mots, solution, bénéfices, plan de financement de principe, planning, garanties, prochaine étape. Devis : SIRET, assurance décennale et assureur, désignation, quantités, prix unitaires, HT, TVA à 5,5 %, TTC, validité, délai, conditions de paiement ; pour les aides : qualification RGE avec organisme et numéro, marque, référence et performances de la pompe à chaleur, résistance thermique des isolants. En relisant le devis de ma voisine, j'ai signalé l'assureur manquant, la référence de l'isolant et la durée de validité.",
    "Ma proposition tient en trois pages : besoin, solution, financement, planning. Devis complet avec la check-list ; j'ai ajouté la résistance thermique et la surface isolée, souvent oubliées. Présentation orale en dix minutes, prochaine étape proposée : rendez-vous avec le simulateur d'aides.",
    "Devis photovoltaïque et devis Ferrand vérifiés avec la check-list : mentions générales, qualification RGE, caractéristiques des équipements. Ma proposition explique la production estimée avec prudence. Relecture croisée : trois corrections sur le devis d'un collègue.",
    "Proposition écrite pour les Ferrand avec le bouquet menuiseries et isolation. Devis : performances des fenêtres, résistance thermique des isolants, RGE, assurance décennale. Je présente d'abord le besoin, puis la solution, puis le prix.",
    "Proposition de rénovation d'ampleur : besoin, scénario de l'audit, bénéfices, plan de financement avec Mon Accompagnateur Rénov', planning, garanties. Devis par lot, chacun avec les mentions exigées pour les aides. Relecture croisée : j'ai signalé un taux de TVA erroné.",
    "Pour la SCI, la proposition comporte un plan d'actions pluriannuel ; pour les Ferrand, un devis classique. Mentions vérifiées : SIRET, décennale, désignation, prix, TVA, validité, délais, RGE, performances. Présentation orale en dix minutes devant le groupe.",
    "Devis de chaudière à granulés pour les Ferrand : marque, référence, rendement, RGE, décennale, TVA, validité. Proposition structurée avec la prochaine étape. Relecture du devis d'un autre stagiaire : oubli du délai d'exécution et des conditions de paiement.",
    "J'ai rédigé ma première proposition commerciale complète. Devis vérifié avec la check-list : je savais pour le prix et la TVA, j'ai appris les mentions pour les aides et l'assurance décennale. Présentation orale un peu rapide, mais complète.",
  ],
  // 7 — C4 objections et négociation
  [
    "« C'est trop cher » : j'écoute, je reformule (« trop cher par rapport à quoi ? »), je réponds en coût global et en reste à charge, je vérifie. « Travaux à 1 € » : j'explique loyalement que ces offres ont donné lieu à de nombreuses fraudes. « On m'a arnaqué » : RGE vérifiable, assurances, références, aucun paiement avant 7 jours. « Réfléchir » : je cherche le point bloquant et fixe une date. « Aides » : simulation officielle. « Grand froid » : dimensionnement et appoint. Négociation : aucune remise sans contrepartie. Chaque objection traitée en quatre temps.",
    "Mon observateur a noté que je réponds trop vite. J'ai repris chaque objection en quatre temps : écouter, reformuler, répondre, vérifier. Pour le prix, je compare le coût de l'inaction. Pour la confiance, je montre les preuves. Concession possible : planning plus souple contre une signature à la date prévue.",
    "Objection fréquente en solaire : « la rentabilité est trop longue ». Je reformule, je montre le calcul prudent et la production estimée, je vérifie. Pour les travaux à 1 € et l'arnaque, je rappelle que le démarchage téléphonique est interdit pour ces travaux et je montre nos preuves de sérieux.",
    "Pour les menuiseries, l'objection prix est la plus fréquente. Je traite en quatre temps et je présente le confort et la valeur du bien. Pour la confiance : avis vérifiables, garanties. Négociation : une option offerte seulement en échange d'une recommandation.",
    "En rénovation d'ampleur, l'objection principale est le délai : « on verra l'an prochain ». Je reformule, je montre le coût de l'attente avec prudence, je vérifie. Les autres objections traitées avec la même méthode. Aucune fausse urgence.",
    "En B2B, l'objection principale est le budget de l'année. Je reformule, je propose un phasage, je vérifie. Pour les six objections du cas particulier, j'ai appliqué la méthode en quatre temps ; l'observateur m'a conseillé d'être plus chaleur{eux} sur la confiance.",
    "Objection sur le bois : « c'est contraignant de stocker les granulés ». Je reformule, je réponds avec le volume réel et l'autonomie du silo, je vérifie. Prix et confiance traités avec preuves. Pas de remise sans contrepartie.",
    "J'avais peur des objections. En trinôme, j'ai traité les six : écouter, reformuler, répondre, vérifier. Le plus difficile : « travaux à 1 € ». Je retiens qu'une concession s'échange toujours contre une contrepartie.",
  ],
  // 8 — C5 plan de prospection conforme
  [
    "Rappel : la prospection téléphonique des consommateurs pour des travaux de rénovation énergétique est interdite par la loi n° 2020-901 du 24 juillet 2020 (article L. 223-1 du code de la consommation), sauf contrat en cours ; aucun démarchage téléphonique à froid. Plan sur 3 mois : deux agences immobilières et un syndic en prescripteurs, stand à la foire de printemps, réunion d'information en mairie, parrainage, une publication de chantier par semaine, demandes d'avis après réception. Pour chaque action : cible, message, coût, indicateur. RGPD : consentement pour l'emailing aux particuliers. Objectifs : 20 demandes entrantes par mois.",
    "Plan de prospection sans démarchage téléphonique : partenariats avec trois architectes et deux couvreurs, salon de l'habitat, parrainage, contenus sur les réseaux, fiche Google et avis. Tableau d'actions avec cible, message, moyens, coût, indicateur. RGPD : information des prospects, durée de conservation, droit d'opposition.",
    "J'ai tiré un trait sur les appels à froid : le démarchage téléphonique pour ces travaux est interdit. Plan : foire, partenariat avec un électricien, réunions de quartier, parrainage, site avec simulateur de production prudent. Objectifs chiffrés et indicateur par action.",
    "Plan de prospection : showroom, salon, partenariat avec deux agences immobilières, parrainage, réseaux sociaux. Aucun démarchage téléphonique : interdit pour la rénovation énergétique. RGPD pour notre fichier clients et l'emailing.",
    "Nos prescripteurs naturels : les accompagnateurs, les notaires, les agences immobilières. Plan sur 3 mois avec six actions, sans démarchage téléphonique, conforme à l'article L. 223-1. Indicateurs : demandes entrantes, rendez-vous, signatures.",
    "En B2B, la règle sur le démarchage vise les consommateurs, mais j'ai construit le plan particulier demandé : prescripteurs, salons, parrainage, réseaux, avis. Pour les professionnels : gestionnaires d'immeubles, réunions d'information sur le décret tertiaire. RGPD pour les deux cibles.",
    "Plan de prospection conforme : pas de démarchage téléphonique, interdit pour ces travaux. Actions : journées portes ouvertes au showroom, foire, partenariat avec un ramoneur, parrainage, avis. Chaque action avec cible, coût et indicateur.",
    "Je ne savais pas que le démarchage téléphonique était interdit pour la rénovation énergétique. Mon plan : relance des anciens clients pour le parrainage, partenariat avec une agence immobilière, publications de chantier, salon. Indicateur principal : nombre de demandes entrantes.",
  ],
  // 9 — C6 conclusion conforme et fidélisation
  [
    "Signaux d'achat chez les Ferrand : « Vous pourriez commencer quand ? » et l'accord des deux. Conclusion par l'alternative (début mars ou début avril). Avant signature : information précontractuelle, contrat daté et signé, droit de rétractation de 14 jours expliqué, formulaire type de rétractation joint. Aucun paiement ni chèque encaissé avant 7 jours. S'ils veulent démarrer plus tôt : demande expresse écrite. Suivi : dossier d'aides, chantier, réception avec procès-verbal, mise en service, satisfaction, contrat d'entretien. Recommandation demandée après la réception réussie.",
    "J'ai repéré trois signaux d'achat dans le dialogue. Conclusion par récapitulation des bénéfices. Check-list hors établissement : information précontractuelle, rétractation de 14 jours, formulaire, pas de paiement pendant 7 jours. Plan de suivi jusqu'à la réception et questionnaire de satisfaction à un mois.",
    "Conclusion sans pression, question directe après récapitulation. J'explique la rétractation de 14 jours et je joins le formulaire. Aucun acompte avant 7 jours. Suivi : raccordement, mise en service, premier relevé de production, satisfaction. Parrainage proposé après la mise en service.",
    "Signaux d'achat : choix de la couleur des fenêtres, questions sur les délais. Conclusion par l'alternative. Contrat hors établissement : rétractation de 14 jours, formulaire, aucun paiement pendant 7 jours. Suivi : pose, réception, réglages, avis client.",
    "En rénovation d'ampleur, la conclusion intervient souvent après l'accord de l'Anah. Contrat au domicile : rétractation de 14 jours expliquée, formulaire, pas de paiement avant 7 jours. Suivi long : chantier par étapes, réception de chaque lot, satisfaction finale, recommandation.",
    "Pour le cas Ferrand : signaux d'achat repérés, conclusion par récapitulation. Règles du hors établissement appliquées : information, rétractation de 14 jours, formulaire, aucun paiement avant 7 jours. En B2B, ces règles ne s'appliquent pas de la même façon, mais je garde la même rigueur de suivi.",
    "Conclusion à domicile : je n'encaisse plus d'acompte le jour même, aucun paiement avant 7 jours. Droit de rétractation de 14 jours et formulaire expliqués. Suivi : installation, premier allumage, entretien annuel, ramonage, satisfaction, parrainage.",
    "J'ai appris les règles du contrat hors établissement : information précontractuelle, rétractation de 14 jours, formulaire type, aucun paiement avant 7 jours. Conclusion par l'alternative. Après la réception, je propose le contrat d'entretien du chauffe-eau et je demande un avis.",
  ],
];

const BILANS_PERSONNELS = [
  "Ce travail m'a surtout appris à justifier chaque proposition par la situation réelle du client.",
  "Le plus difficile a été de tenir dans le temps de l'atelier ; je reprendrai la fiche au bureau.",
  "J'ai montré le résultat à ma responsable, qui m'a fait deux remarques que j'ai intégrées.",
  "Cette partie servira directement pour l'évaluation finale du jour 5.",
  "J'ai comparé ma production avec celle d'un autre stagiaire en binôme, ce qui m'a fait corriger un oubli.",
  "La correction du formateur m'a permis de repérer une erreur de méthode que je ne referai plus.",
  "J'avais des doutes sur ce sujet en arrivant, je me sens maintenant capable de le refaire seul{e}.",
  "Je me suis appuyé{e} sur les modèles fournis, que je réutiliserai en rendez-vous.",
  "Je n'ai pas eu le temps de finaliser la mise en forme, mais le fond est complet.",
  "J'ai posé une question au formateur pendant l'atelier, ce qui m'a évité de partir dans la mauvaise direction.",
  "Je vais appliquer cette méthode dès mon prochain rendez-vous.",
  "Je dois encore gagner en aisance à l'oral, mais la démarche est claire pour moi.",
];

/** Banque de la mise en situation à partir de son titre (ou de sa consigne), sinon de son rang. */
function blocExercice(contexte: string, exerciceIdx: number): number {
  const t = contexte || "";
  const num = t.match(/\bExercice\s+(\d{1,2})\b/i);
  if (num) {
    const n = parseInt(num[1], 10);
    if (n >= 1 && n <= EXERCICES_PRODUCTIONS.length) return n - 1;
  }
  const c = t.match(/\bC([1-6])\b/);
  if (/diagnostic de d[ée]part/i.test(t)) return 0;
  if (c) {
    const k = parseInt(c[1], 10);
    if (k === 1) return /aide|financement/i.test(t) ? 2 : 1;
    if (k === 2) return /professionnel|tertiaire|B2B/i.test(t) ? 4 : 3;
    if (k === 3) return /devis|proposition commerciale/i.test(t) ? 6 : 5;
    if (k === 4) return 7;
    if (k === 5) return 8;
    return 9;
  }
  return ((exerciceIdx % EXERCICES_PRODUCTIONS.length) + EXERCICES_PRODUCTIONS.length) % EXERCICES_PRODUCTIONS.length;
}

export function pickTVTEExerciceAnswer(
  intitule: string,
  code: string | undefined,
  exerciceIdx: number,
  stagiaireIdx: number,
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  contexte?: string,
): string | null {
  if (!isTVTEFormation(intitule, code)) return null;
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
  "CAP Monteur en installations thermiques, puis brevet professionnel ; technicien chauffagiste pendant dix ans",
  "BTS Négociation et digitalisation de la relation client",
  "BTS Fluides, énergies, domotique, option génie climatique et fluidique",
  "Baccalauréat STMG, puis huit ans de vente en magasin de bricolage",
  "Titre professionnel Technicien d'intervention en froid et climatisation",
  "Licence professionnelle Métiers de l'énergétique, de l'environnement et du génie climatique",
  "BTS Management commercial opérationnel ; vend{eur} en concession automobile pendant six ans",
  "DUT Génie thermique et énergie",
  "Baccalauréat professionnel Technicien en installation des systèmes énergétiques et climatiques",
  "BTS Technico-commercial, option énergie et environnement",
  "CAP Menuisier installateur, puis poseur de menuiseries extérieures",
  "Baccalauréat général, puis plusieurs années de téléconseil en centre d'appels",
  "BTS Bâtiment, conduct{/rice} de travaux dans le second œuvre",
  "Licence d'économie-gestion, reconversion dans la rénovation énergétique",
  "Baccalauréat professionnel Commerce",
  "CAP Couvreur, puis chef d'équipe en isolation des combles",
  "BTS Support à l'action managériale ; assistant{e} commercial{e} dans le bâtiment depuis 2019",
  "Master en développement durable, chargé{e} de mission énergie dans une collectivité",
  "Diplôme d'ingénieur en génie énergétique",
  "BTS Électrotechnique, installat{/rice} photovoltaïque",
  "Aucun diplôme dans le commerce : quinze ans d'expérience comme plombier-chauffagiste",
  "Baccalauréat professionnel Vente, puis conseill{er} de vente en grande surface de bricolage",
  "Diplôme d'études supérieures obtenu à l'étranger, en cours de reconnaissance",
  "BTS Professions immobilières, reconversion dans la rénovation",
  "DUT Techniques de commercialisation",
];

const BESOINS_HANDICAP = [
  "Non, je n'ai aucune situation de handicap et je n'ai pas besoin d'adaptation particulière.",
  "Non. Je souhaite simplement recevoir les supports à l'avance pour les lire avant les cinq journées.",
  "Non, aucune situation de handicap déclarée. Des pauses régulières pendant les journées me conviennent.",
  "Non. Je porte des lunettes et j'apprécie des supports imprimés en police suffisamment grande.",
  "Non, pas de handicap. Je précise que je suis mal à l'aise à l'idée d'être filmé{e} pendant les jeux de rôle ; je préférerais être observé{e} sans caméra.",
  "Non. Aucun aménagement nécessaire.",
  "Non, je ne suis pas en situation de handicap. Je sais que je peux solliciter le référent handicap à tout moment.",
  "Non. Je souhaite seulement disposer des fiches techniques en version numérique pour les relire.",
  "Non, aucune situation de handicap. J'ai besoin d'un peu de temps pour les calculs sur tableur, je m'y préparerai.",
  "Non. Je préfère avoir les supports en PDF pour les annoter.",
  "Non, pas de besoin particulier. Le référent handicap m'a été présenté lors de l'entretien préalable.",
  "Non. Aucune situation de handicap ; je signalerai au formateur toute difficulté éventuelle.",
];

const BESOINS_DISPOS = [
  "Je suis disponible les cinq jours de formation, sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, en salle de formation.",
  "Mon employeur a libéré les cinq journées dans mon planning (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) ; mes rendez-vous clients sont reportés.",
  "Je suis disponible les cinq jours de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong>. J'apporterai deux dossiers clients anonymisés pour les exercices.",
  "Je peux suivre l'intégralité des cinq journées en présentiel, sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>, sans contrainte particulière.",
  "Je suis disponible les cinq jours (<strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong>). Ma responsable a confié mes visites techniques à un collègue pendant la semaine.",
  "Disponibilité complète sur les cinq journées (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>). Je viendrai en covoiturage avec un collègue inscrit à la même session.",
  "Les cinq jours de formation, je suis disponible de <strong>09h00 à 12h30</strong> et de <strong>13h30 à 17h00</strong> ; l'équipe gère les urgences clients pendant mon absence.",
  "Je suis disponible sur les plages <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> les cinq jours. Je dois seulement partir à 16h45 le mercredi, ce que j'ai signalé au formateur.",
  "Je suivrai les cinq journées en salle (<strong>09h00 – 12h30</strong> / <strong>13h30 – 17h00</strong>) et je prévois de retravailler mes fiches le soir.",
  "Aucune contrainte sur les créneaux <strong>09h00 – 12h30</strong> et <strong>13h30 – 17h00</strong> des cinq jours. J'ai prévenu mes clients en cours de mon absence.",
];

/** Réponses d'évaluation des besoins propres à la formation « Techniques de vente – travaux énergétiques », différentes pour chaque stagiaire. */
export function getTVTEEvalBesoins(
  s: { nom?: string; prenom?: string; civilite?: string; entreprise?: string },
  hasEntreprise: boolean,
  idx?: number,
) {
  const seed = tvteSeed(s.nom, s.prenom);
  const fem = isFeminin(s.civilite, s.prenom);
  const base = baseIndex(idx, s.nom, s.prenom);
  const profil = profilTVTE(idx, s.nom, s.prenom);
  const pick = (arr: string[], sel: number) => accorder(arr[rang(base, sel, arr.length)], fem);
  const ent = (txt: string) =>
    accorder(
      txt
        .replace(/\{un\}/g, fem ? "une" : "un")
        .replace(/\{collab\}/g, fem ? "collaboratrice" : "collaborateur")
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
      ? "Formation financée par l'employeur avec l'appui de son OPCO, au titre du plan de développement des compétences."
      : "Formation à l'initiative de l'employeur, au titre du plan de développement des compétences.",
    projetPro: ent(profil.projet),
    handicap: pick(BESOINS_HANDICAP, 6),
    // Les disponibilités suivent le nom du stagiaire : elles sont aussi lues hors de la session
    // (getDisponibilitesAnswer), sans rang, et doivent rester identiques partout.
    disponibilites: accorder(BESOINS_DISPOS[seed % BESOINS_DISPOS.length], fem),
  };
}
