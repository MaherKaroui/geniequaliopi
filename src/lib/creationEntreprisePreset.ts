/**
 * Preset "Création d'entreprise" — réponses humanisées (IND 4, IND 8, IND 11).
 * Commentaires stagiaires pour les QCM de début/fin, productions d'exercices,
 * et pools de réponses pour l'évaluation des besoins.
 */
import type { StagiaireInfo } from "@/types/qualiopi";

export function isCreationEntrepriseFormation(intitule: string): boolean {
  const t = (intitule || "").toLowerCase();
  return (
    t.includes("création d'entreprise") ||
    t.includes("creation d'entreprise") ||
    t.includes("création entreprise") ||
    t.includes("creation entreprise") ||
    t.includes("créateur d'entreprise") ||
    t.includes("createur d'entreprise") ||
    t.includes("créer son entreprise") ||
    t.includes("creer son entreprise") ||
    t.includes("porteur de projet") ||
    (t.includes("business plan") && t.includes("entrepre"))
  );
}

/* ------------------------------------------------------------------ */
/* QCM — commentaires humanisés (10 questions début, 10 questions fin) */
/* ------------------------------------------------------------------ */

export const CREA_QCM_HUMAN_COMMENTS: { debut: string[][]; fin: string[][] } = {
  debut: [
    [ // Q1 – Business Model Canvas
      "J'en ai entendu parler dans une vidéo, je crois que c'est un tableau pour poser son projet, mais je ne l'ai jamais rempli.",
      "Pour moi c'est une sorte de grille avec plusieurs cases pour résumer son activité. Je répondrai mieux après le module.",
      "Je pense que ce n'est pas un logiciel, ça ressemble plus à un outil de réflexion sur le projet.",
      "Franchement je devine : ça doit être la fameuse feuille avec les 9 cases que mon conseiller m'a montrée.",
    ],
    [ // Q2 – Guichet unique
      "Je pensais qu'il fallait encore passer par la CCI, mais on m'a parlé d'un site unique depuis peu.",
      "Je crois que tout se fait en ligne maintenant, sur un site de l'État, mais je ne connais pas le nom exact.",
      "J'hésite avec l'URSSAF parce que c'est eux qui m'avaient immatriculée en auto-entrepreneur il y a longtemps.",
      "Je réponds guichet unique INPI, c'est ce qu'un ami a utilisé l'an dernier pour sa société.",
    ],
    [ // Q3 – ARCE
      "Je confonds toutes ces aides. Je sais qu'il y en a une qui verse une partie du chômage en capital.",
      "Je crois que c'est l'ARCE, ma conseillère France Travail m'en a parlé au dernier rendez-vous.",
      "Je dirais ARCE, mais je ne sais pas du tout à quel pourcentage on a droit.",
      "Je tente ARCE. L'ACRE c'est plutôt les cotisations je crois.",
    ],
    [ // Q4 – ACRE
      "Pour moi c'est une aide sur les charges quand on démarre, mais je ne connais pas le détail.",
      "Je sais que ça allège les cotisations la première année, c'est déjà ça de gagné au départ.",
      "Je réponds au feeling : exonération de cotisations pour les créateurs.",
      "J'ai retenu qu'il fallait la demander au moment de la création, sinon c'est trop tard.",
    ],
    [ // Q5 – Plafond micro-entreprise services
      "Aucune idée précise, je sais juste qu'il y a un plafond à ne pas dépasser en micro.",
      "Je dirais autour de 77 000 € pour les services, j'ai vu ce chiffre sur le site de l'URSSAF.",
      "Je confonds avec le plafond de la vente de marchandises qui est beaucoup plus haut.",
      "Je réponds 77 700 €, c'est le chiffre qui revient dans tous les articles que j'ai lus.",
    ],
    [ // Q6 – SASU
      "Je sais qu'il y a EURL et SASU pour être seul, mais je ne vois pas la différence.",
      "Je réponds SASU parce qu'on m'a dit que le dirigeant est traité comme un salarié.",
      "J'hésite avec l'EURL, honnêtement le juridique c'est ce qui me fait le plus peur.",
      "Je crois SASU, c'est ce que mon comptable m'a conseillé de regarder.",
    ],
    [ // Q7 – Plan de trésorerie
      "Je pense que ça sert à voir si on a assez d'argent chaque mois pour payer les charges.",
      "Pour moi c'est le tableau des entrées et des sorties, mois par mois.",
      "Je réponds suivi des encaissements et décaissements, ça me paraît logique.",
      "Je ne l'ai jamais fait, mais je sais que beaucoup d'entreprises coulent par manque de trésorerie.",
    ],
    [ // Q8 – Seuil de rentabilité
      "Le seuil de rentabilité, pour moi c'est le moment où on commence à gagner de l'argent.",
      "Je dirais le chiffre d'affaires minimum pour couvrir les charges, sans bénéfice encore.",
      "Je crois que c'est le point mort dont parlait l'intervenant à la réunion d'information.",
      "Je réponds le CA minimum à faire, mais je ne saurais pas le calculer aujourd'hui.",
    ],
    [ // Q9 – Régime social SASU
      "Je ne sais pas, je pensais que tous les dirigeants étaient travailleurs indépendants.",
      "Je réponds assimilé salarié, on m'a dit qu'on cotise plus mais qu'on est mieux couvert.",
      "J'hésite vraiment, la différence TNS / assimilé salarié n'est pas claire pour moi.",
      "Je crois assimilé salarié, mais sans droit au chômage, ce qui me pose question.",
    ],
    [ // Q10 – Contenu business plan
      "Pour moi c'est surtout les chiffres à donner à la banque, mais il doit y avoir plus.",
      "Je pense qu'il faut se présenter, parler du marché et mettre les prévisions financières.",
      "Je réponds la version complète : porteur, marché, offre, modèle économique et finances.",
      "Je n'en ai jamais rédigé, c'est justement pour ça que je viens en formation.",
    ],
  ],
  fin: [
    [ // Q1 – Choix statut conseil 60 k€
      "Avec 60 000 € de CA en conseil, je reste sous le plafond BNC : la micro est clairement la plus simple pour démarrer.",
      "J'ai fait le calcul pendant l'exercice : en micro je suis sous les 77 700 €, donc pas besoin de créer une société tout de suite.",
      "Je choisis la micro-entreprise, quitte à basculer en SASU quand je dépasserai le plafond ou que j'aurai des charges à déduire.",
      "La SARL ou la SA n'ont aucun sens ici : je suis seule, sans salarié et sans gros investissement.",
    ],
    [ // Q2 – SASU vs EURL
      "La grosse différence que j'ai retenue, c'est le statut du dirigeant : assimilé salarié en SASU, TNS en EURL.",
      "En SASU les dividendes ne supportent pas les cotisations sociales, c'est ce qui m'a marquée dans le module juridique.",
      "Je réponds régime social assimilé salarié : meilleure protection, mais des charges plus lourdes.",
      "Le coût de création est quasiment identique, la vraie différence est sociale, pas administrative.",
    ],
    [ // Q3 – Marge brute
      "Marge brute = CA moins le coût d'achat des marchandises vendues, je l'ai appliqué dans mon prévisionnel.",
      "Je ne confonds plus avec le résultat net : la marge brute se calcule avant les charges fixes.",
      "Sur mon projet de services, ma marge brute est très élevée car j'ai peu d'achats directs.",
      "C'est la première ligne que la banque regarde, donc je l'ai bien détaillée dans mon business plan.",
    ],
    [ // Q4 – EBE
      "L'EBE mesure ce que l'activité dégage avant amortissements, frais financiers et impôts.",
      "J'ai compris que c'est l'indicateur de la performance pure de l'exploitation, sans le financement.",
      "Dans mon prévisionnel, mon EBE devient positif au mois 8, c'est mon vrai point de bascule.",
      "Ce n'est pas le bénéfice net : il reste les amortissements et l'impôt à retirer derrière.",
    ],
    [ // Q5 – Annonce légale
      "C'est l'avis de constitution : dénomination, forme, capital, siège, objet, durée et dirigeants.",
      "Je l'ai rédigé pendant l'exercice de création de société, il faut être précis sinon le greffe refuse.",
      "Le business plan ne se publie évidemment pas, c'est un document confidentiel.",
      "J'ai retenu le budget aussi : environ 150 à 200 € selon le département.",
    ],
    [ // Q6 – TVA services
      "20 % de TVA par défaut sur les prestations de services, sauf cas particuliers.",
      "Je démarre en franchise en base, mais dès le dépassement je facturerai à 20 %.",
      "J'ai bien noté qu'il faut raisonner en HT dans le prévisionnel pour ne pas se tromper.",
      "Le 5,5 % et le 10 % concernent d'autres activités, pas mon conseil.",
    ],
    [ // Q7 – BFR
      "BFR = stocks + créances clients − dettes fournisseurs. C'est ce que l'activité immobilise.",
      "J'ai calculé mon BFR sur l'année 1 : mes délais de paiement clients à 30 jours pèsent lourd.",
      "C'est le besoin en fonds de roulement, il faut le financer dès le départ sinon on est étranglé.",
      "Avec les acomptes que je vais demander, mon BFR reste faible, c'est un vrai avantage.",
    ],
    [ // Q8 – Prêt d'honneur
      "C'est un prêt à taux zéro accordé au porteur, pas à l'entreprise, et il rassure la banque.",
      "J'ai un rendez-vous prévu avec Initiative France : l'effet de levier annoncé est de 1 pour 7.",
      "Ce n'est pas une subvention, il faut bien le rembourser, mais sans intérêts ni garantie.",
      "Le passage devant le comité m'oblige à préparer sérieusement mon pitch et mon prévisionnel.",
    ],
    [ // Q9 – RC Pro
      "La RC Pro couvre les dommages causés aux clients : dans mon activité c'est indispensable.",
      "J'ai demandé trois devis pendant la formation, je suis autour de 25 € par mois.",
      "Pour certaines activités elle est obligatoire, pour les autres elle reste fortement recommandée.",
      "Je l'ai budgétée dans mes charges fixes, comme la comptabilité et la banque pro.",
    ],
    [ // Q10 – ACRE
      "L'ACRE, c'est une exonération partielle des cotisations sociales sur les 12 premiers mois.",
      "Ça allège sérieusement ma première année, j'en ai tenu compte dans mon plan de trésorerie.",
      "Ce n'est ni une subvention ni une exonération d'impôt, c'est bien sur les cotisations.",
      "J'ai noté qu'il faut la demander dans les 45 jours suivant la création, je l'ai mis dans mon rétroplanning.",
    ],
  ],
};

export function pickCreaComment(mode: "debut" | "fin", qi: number, seed: number): string {
  const bank = mode === "debut" ? CREA_QCM_HUMAN_COMMENTS.debut : CREA_QCM_HUMAN_COMMENTS.fin;
  const list = bank[qi % bank.length];
  if (!list || !list.length) return "";
  return list[Math.abs(seed + qi * 7) % list.length];
}

/* ------------------------------------------------------------------ */
/* Exercices — productions humanisées (IND 8 / IND 11)                 */
/* ------------------------------------------------------------------ */

const CREA_EXO_ANSWERS: string[][] = [
  [ // Étude de marché
    "J'ai commencé par définir ma cliente type : une dirigeante de TPE de 35-50 ans, à Saint-Denis et alentours, qui n'a pas le temps de gérer sa communication. Côté demande, j'ai repris les chiffres INSEE du département : plus de 12 000 entreprises de moins de 10 salariés, avec une croissance des créations chaque année. J'ai étudié trois concurrents (une agence locale, une freelance et une plateforme en ligne) : la première est trop chère pour ma cible, la deuxième est complète mais saturée, la troisième est bon marché mais impersonnelle. Je me positionne donc au milieu, autour de 450 € le pack mensuel. Mon SWOT : forces = mon réseau et mon expérience terrain ; faiblesses = pas encore de références ni de trésorerie ; opportunités = digitalisation des TPE et aides à la création ; menaces = concurrence des plateformes low cost et baisse des budgets communication.",
    "Ma cible, ce sont les particuliers de 30 à 55 ans du secteur, plutôt actifs, qui cherchent un service de proximité rapide. J'ai interrogé 22 personnes sur le marché du samedi : 17 se disent prêtes à payer entre 30 et 45 € la prestation. J'ai analysé trois concurrents en faisant un tableau prix / horaires / accueil : deux sont fermés le samedi après-midi, ce qui est ma vraie porte d'entrée. Le mapping montre un trou sur le créneau « prix moyen mais grande amplitude horaire ». Mon SWOT : forces = disponibilité et bouche-à-oreille déjà lancé ; faiblesses = local à trouver et budget serré ; opportunités = deux concurrents proches de la retraite ; menaces = hausse des loyers commerciaux.",
    "J'ai construit mon persona à partir de mon ancien poste : un responsable technique de PME industrielle, 40 ans, qui cherche un prestataire fiable et réactif. Le marché est porteur, les carnets de commandes du secteur sont pleins d'après les données de la fédération professionnelle. Sur les trois concurrents étudiés, aucun ne propose d'intervention sous 48 h : c'est mon axe de différenciation, avec un tarif 10 % au-dessus du marché assumé. SWOT : forces = quinze ans de métier et un carnet d'adresses ; faiblesses = je démarre seul et je ne pourrai pas tout absorber ; opportunités = départs à la retraite chez les concurrents ; menaces = dépendance à deux ou trois gros clients au départ.",
  ],
  [ // Business Model Canvas
    "Segments clients : TPE de services de moins de 10 salariés en Seine-Saint-Denis. Proposition de valeur : leur libérer du temps en gérant leur communication de A à Z pour un forfait clair, sans engagement long. Canaux : LinkedIn, recommandations, partenariat avec deux experts-comptables. Relation client : un point mensuel de 30 minutes et un accès WhatsApp direct. Revenus : forfait 450 €/mois (objectif 8 clients), plus des missions ponctuelles à 600 €. Ressources clés : moi, mon ordinateur, mes abonnements Canva et Meta Business. Activités clés : création de contenus, publications, reporting. Partenaires : comptable, graphiste freelance, imprimeur local. Coûts : abonnements 90 €/mois, assurance 25 €, comptable 90 €, soit environ 205 € de charges fixes.",
    "J'ai rempli les 9 blocs sur mon projet d'atelier de réparation. Clients : particuliers du quartier et deux ou trois petits pros. Valeur : réparation rapide, transparente sur le prix, avec devis avant intervention. Canaux : boutique en rue passante, Google Business et Facebook local. Relation : suivi par SMS quand la réparation est prête. Revenus : 60 % réparations, 30 % ventes d'accessoires, 10 % contrats d'entretien. Ressources : le local, l'outillage et mon stock de départ. Activités : diagnostic, réparation, conseil. Partenaires : deux grossistes et un artisan spécialisé pour ce que je ne sais pas faire. Coûts : loyer 700 € (fixe), achats de pièces (variable), assurance et énergie.",
    "Mon canvas tient sur une page et je l'ai retravaillé deux fois. Le déclic a été de comprendre que ma proposition de valeur devait répondre à un problème précis : mes clients perdent des heures sur leur administratif. Du coup j'ai resserré mon offre sur un forfait unique de 350 € par mois, facile à vendre. Les coûts fixes sont volontairement bas (pas de local, travail à domicile la première année) et mes coûts variables se limitent aux déplacements. Mon partenaire clé est un cabinet comptable qui m'apporte les premiers clients contre une commission de 10 %.",
  ],
  [ // Statut juridique
    "J'ai comparé la micro-entreprise et la SASU. Responsabilité : limitée dans les deux cas depuis la réforme de l'EI, mais plus lisible en SASU. Fiscalité : abattement de 34 % en micro contre imposition à l'IS et possibilité de déduire mes vraies charges en SASU. Social : cotisations simples à 21,2 % du CA en micro, contre environ 80 % du net en assimilé salarié. Coût de gestion : quasi nul en micro, autour de 1 200 €/an de comptable en SASU. Évolution : la SASU permet d'accueillir des associés. Avec un CA prévisionnel de 42 000 € la première année et très peu de charges, je choisis la micro-entreprise, quitte à basculer en SASU dès que je dépasserai 60 000 € ou que j'embaucherai.",
    "Ma note compare l'EURL et la SASU. Je retiens la SASU pour trois raisons : la protection sociale du régime général qui compte pour moi (j'ai des problèmes de santé suivis), l'absence de cotisations sociales sur les dividendes, et l'image plus solide vis-à-vis de mes futurs clients grands comptes. Le coût supplémentaire de cotisations est réel, mais je le compense en me versant une rémunération faible la première année et en complétant par des dividendes. Je démarre avec un capital de 1 000 € et des statuts rédigés avec un modèle validé par mon comptable.",
    "Étant demandeur d'emploi indemnisé, j'ai raisonné différemment : je garde mes ARE et je crée en micro-entreprise pour tester l'activité sans risque. La comparaison micro / EURL montre que l'EURL n'a d'intérêt qu'à partir du moment où j'aurai des charges importantes à déduire, ce qui n'est pas le cas la première année. Je fais aussi la demande d'ACRE pour alléger mes cotisations sur 12 mois. Décision : micro-entreprise maintenant, réévaluation à 12 mois avec mon conseiller.",
  ],
  [ // Compte de résultat prévisionnel
    "J'ai construit mon tableau sur trois ans avec des hypothèses que j'assume : année 1 à 42 000 € de CA (8 clients en moyenne sur l'année), année 2 à 58 000 € (+38 %, deux clients supplémentaires et une hausse de tarif de 5 %), année 3 à 70 000 €. Mes charges variables se limitent à la sous-traitance graphique (8 % du CA). Charges fixes : abonnements 1 080 €, assurance 300 €, comptable 1 100 €, banque 240 €, téléphone/internet 480 €. Pas de masse salariale avant l'année 3. Amortissement du matériel informatique sur 3 ans (600 €/an). Résultat d'exploitation : 4 900 € en année 1, 18 300 € en année 2, 26 800 € en année 3. Toutes les cellules sont calculées par formules pour pouvoir tester d'autres scénarios.",
    "Mon prévisionnel est volontairement prudent : je pars sur 55 % du potentiel estimé la première année. CA : 68 000 € puis 84 000 € puis 95 000 €. Les achats de marchandises représentent 42 % du CA, ce qui me donne une marge brute de 58 %. Côté fixe, le loyer (8 400 €) est mon poste principal, suivi de l'énergie et de l'assurance. Je me verse 1 400 € net par mois à partir du mois 4. Le résultat net devient positif en année 2 : c'est logique pour un commerce avec local, et j'ai prévu la trésorerie pour tenir les 14 premiers mois.",
    "J'ai fait deux versions : une réaliste et une pessimiste avec 25 % de CA en moins. Dans la version réaliste, mon EBE est de 9 200 € en année 1 et je passe au-dessus de 20 000 € en année 3. Dans la version pessimiste, l'année 1 est déficitaire de 2 100 €, ce que mon apport personnel de 8 000 € permet d'absorber. Ce travail m'a surtout appris à distinguer les charges fixes des charges variables, et à ne pas oublier les cotisations du dirigeant, que j'avais complètement zappées dans ma première version.",
  ],
  [ // Plan de trésorerie
    "Mon plan de trésorerie sur 12 mois montre clairement mon point critique : les mois 3 et 4. Mes clients paient à 30 jours, donc j'encaisse toujours avec un mois de décalage, alors que mes charges tombent chaque mois. Le solde cumulé descend à −1 850 € au mois 4 avant de remonter. Pour l'éviter, j'ai décidé de demander 40 % d'acompte à la commande et de négocier le paiement trimestriel de mon assurance. J'ai aussi intégré la TVA : collectée sur mes ventes, déductible sur mes achats, et reversée chaque trimestre — un décaissement de 1 100 € au mois 4 qui explique en partie le creux.",
    "Le tableau fait apparaître un besoin de trésorerie maximum de 6 400 € au mois 5, correspondant au stock de départ et aux trois premiers loyers. J'ai donc calibré mon prêt bancaire à 10 000 € sur 5 ans (mensualité de 178 €) plutôt qu'à 7 000 € comme prévu au départ. À partir du mois 7, le solde mensuel est systématiquement positif. Ce que je retiens : la trésorerie, ce n'est pas le bénéfice, on peut être rentable et se retrouver à sec.",
    "J'ai construit les 12 colonnes avec des formules, en séparant encaissements et décaissements. Ce qui m'a surpris, c'est le poids des cotisations sociales du trimestre 2, que je ne visualisais pas du tout. Mon mois le plus tendu est décembre, à cause de la baisse d'activité et de l'échéance URSSAF au même moment. Ma parade : constituer une réserve de 1 500 € dès les premiers mois et proposer une offre promotionnelle en novembre pour lisser l'activité.",
  ],
  [ // Pitch
    "J'ai pitché en 4 minutes 50. J'ai commencé par le problème : les dirigeants de TPE que je rencontre passent en moyenne 6 heures par semaine sur des tâches qu'ils détestent. Ma solution : un forfait mensuel unique et lisible. Mon marché : 12 000 TPE dans le département, avec une cible réaliste de 15 clients d'ici 18 mois. Mon modèle : 450 € par mois, récurrent, avec un objectif de 8 clients pour atteindre l'équilibre. Mes besoins : un prêt d'honneur de 8 000 € et deux mises en relation avec des experts-comptables. Le jury m'a interrogée sur la fidélisation : j'ai répondu par le contrat de 6 mois renouvelable et le point mensuel systématique.",
    "Mon pitch tenait en 6 slides. Le plus dur a été de résister à l'envie de tout dire : j'ai coupé toute la partie technique pour garder le message principal. J'ai été à l'aise sur le problème, le marché et le besoin de financement, un peu moins sur les chiffres de rentabilité, où j'ai dû relire mes notes. Les questions du jury portaient sur mon délai de rentabilité et sur ce qui se passe si je perds mon plus gros client : j'ai expliqué ma règle des 30 % maximum de CA par client, que j'ai fixée pendant la formation.",
    "Je suis quelqu'un de timide, donc ce pitch était mon vrai défi. Je l'ai répété huit fois, dont deux devant ma famille. Le jour J, j'ai fini en 5 minutes 10 sans lire mes notes. Le retour du formateur : discours clair et sincère, mais un débit trop rapide sur la partie financière. J'ai retenu de ralentir et de m'appuyer sur un seul chiffre fort par slide. Cette préparation m'a servi une semaine après, pour mon rendez-vous bancaire.",
  ],
];

/**
 * Production humanisée du stagiaire pour un exercice « Création d'entreprise ».
 * Retourne null si la formation n'est pas concernée.
 */
export function pickCreationExerciceAnswer(
  intitule: string,
  exerciceIdx: number,
  stagiaireIdx: number,
  s?: StagiaireInfo | null,
): string | null {
  if (!isCreationEntrepriseFormation(intitule)) return null;
  const bank = CREA_EXO_ANSWERS[exerciceIdx % CREA_EXO_ANSWERS.length];
  if (!bank || !bank.length) return null;
  const seed =
    (s?.prenom || "").length * 13 +
    (s?.nom || "").length * 7 +
    stagiaireIdx * 5 +
    exerciceIdx * 11;
  return bank[Math.abs(seed) % bank.length];
}

/* ------------------------------------------------------------------ */
/* IND 4 — pools de réponses « évaluation des besoins »                */
/* ------------------------------------------------------------------ */

export const CREA_BESOINS = {
  diplomes: [
    "Baccalauréat professionnel Commerce, puis 8 ans en tant que vendeuse puis responsable de rayon",
    "Baccalauréat général, avec une expérience de 6 ans comme salarié dans le bâtiment",
    "BTS Management des unités commerciales, actuellement en recherche d'emploi",
    "Baccalauréat technologique STMG, complété par plusieurs missions en intérim dans la logistique",
    "CAP puis Bac professionnel, avec 12 ans d'expérience métier sur le terrain",
  ],
  objectifs: [
    "Ouvrir ma propre activité dans les six mois qui suivent la formation, avec un projet chiffré et un statut juridique choisi en connaissance de cause.",
    "Sortir de la formation avec un business plan complet, présentable à ma banque et à un réseau d'accompagnement type Initiative France.",
    "Tester mon idée sérieusement avant de me lancer : savoir si mon projet tient debout financièrement, et arrêter de naviguer à vue.",
    "Transformer mon activité d'appoint actuelle en véritable entreprise déclarée, avec des prix justes et une gestion propre.",
    "Reprendre une petite structure existante dans mon secteur : je veux comprendre le prévisionnel, la valorisation et le montage du financement.",
  ],
  projetPro: [
    "Cela fait deux ans que j'y pense sans oser me lancer. Il me manque la méthode : l'étude de marché, les chiffres, le choix du statut. C'est exactement ce que je viens chercher.",
    "J'ai l'expérience du métier, mais pas celle du chef d'entreprise. Savoir lire un prévisionnel et calculer mon seuil de rentabilité, c'est ce qui va me permettre de démarrer sereinement.",
    "Après un licenciement économique, je préfère créer mon activité plutôt que de repartir sur un poste que je ne choisis pas. Cette formation, c'est ma préparation avant de mobiliser mon ARCE.",
    "Je vends déjà mes créations en dehors de tout cadre légal, ce qui me bloque : pas de factures, pas de clients professionnels. Me structurer va m'ouvrir un vrai marché.",
    "Mon projet est mûr dans ma tête, mais je bute sur le juridique et le financement. J'ai besoin d'être accompagnée pour arbitrer entre micro-entreprise et société.",
  ],
  handicap: [
    "Non, je ne suis pas en situation de handicap et je n'ai besoin d'aucun aménagement particulier.",
    "Non. Si une difficulté apparaissait en cours de formation, je préviendrais immédiatement le référent handicap.",
    "Non, aucune situation de handicap déclarée. Je suis disponible sur toutes les modalités proposées, y compris les temps de travail personnel.",
  ],
  attentes: [
    "Nous attendons que ${prenom} acquière une vision claire du modèle économique de notre activité afin de prendre en charge le pilotage budgétaire et le suivi de la rentabilité.",
    "Notre objectif est que ${prenom} maîtrise la construction d'un prévisionnel et le suivi de trésorerie, pour sécuriser le développement de notre structure.",
    "Nous souhaitons que ${prenom} soit en mesure de monter les dossiers de financement (banque, prêt d'honneur, aides) et de défendre nos projets devant nos partenaires.",
  ],
  missions: [
    "${prenom} intervient sur le développement commercial et la gestion administrative. À l'issue de la formation, ${prenom} prendra en charge le suivi du prévisionnel et le pilotage de la trésorerie.",
    "Les missions confiées à ${prenom} : structuration de l'offre, chiffrage des devis, suivi des marges et préparation des dossiers de financement de nos projets de développement.",
    "${prenom} accompagne la création d'une nouvelle activité au sein de la structure : étude de marché, modèle économique, choix juridique et fiscal, plan de financement.",
  ],
  contribution: [
    "Cette montée en compétences nous permet de piloter notre développement sur des bases chiffrées plutôt qu'à l'intuition, et de sécuriser nos décisions d'investissement.",
    "Disposer en interne d'une personne capable de construire et défendre un business plan est un vrai atout face à nos partenaires bancaires.",
    "La formation contribue directement à notre projet d'ouverture d'une seconde activité, dont ${prenom} portera le montage économique et juridique.",
  ],
};
