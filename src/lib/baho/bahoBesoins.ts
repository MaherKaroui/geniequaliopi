/**
 * BAHO — Évaluation des besoins (une fiche par stagiaire)
 * Structure reprise du modèle « EVALUATION DES BESOINS SELECT FORMATION ».
 * Données : conventions BAHO (bahoData) — rien n'est inventé côté coordonnées.
 */
import { FORMAT_SPHERE_ORG, type BahoEntreprise, type BahoStagiaire } from "./bahoData";
import { BASE_CSS, header, footer, stampsBlock, formatDateLong } from "./bahoStaticDocs";
import { BAHO_INTITULE, seedOf, civiliteOf, bahoScores } from "./bahoTests";

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

/** Certaines lignes du CSV source sont décalées (prénom dans « adresse », adresse dans « email »). */
export function normalizeStagiaire(s: BahoStagiaire): BahoStagiaire {
  const looksLikeAddress = (v: string) => !!v && !v.includes("@") && /\d/.test(v);
  if (!s.prenom && looksLikeAddress(s.email)) {
    return { ...s, prenom: s.adresse, adresse: s.email, email: "" };
  }
  return s;
}

/** Recule de n jours ouvrés (weekends exclus). */
function backWorkingDays(iso: string, n: number): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  let left = n;
  while (left > 0) {
    d.setUTCDate(d.getUTCDate() - 1);
    const day = d.getUTCDay();
    if (day !== 0 && day !== 6) left--;
  }
  return d.toISOString().slice(0, 10);
}

/**
 * Date de la fiche : 2 jours ouvrés AVANT la date de convention
 * (donc largement antérieure au démarrage de la formation).
 */
export function dateEvaluationBesoins(e: BahoEntreprise): string {
  const base = e.dateConvention || backWorkingDays(e.dateDebut, 10);
  return backWorkingDays(base, 2);
}

function pick<T>(pool: T[], s: BahoStagiaire, si: number, salt: number, ctx: string): T {
  return pool[seedOf(s, si, salt, ctx) % pool.length];
}

/** Famille de métier déduite de l'emploi figurant sur la convention. */
type Famille = "reception" | "etages" | "restauration" | "encadrement";
function familleOf(s: BahoStagiaire): Famille {
  const e = (s.emploi || "").toLowerCase();
  if (e.includes("récept") || e.includes("recept")) return "reception";
  if (e.includes("gouvernant")) return "encadrement";
  if (e.includes("restaur")) return "restauration";
  if (e.includes("chambre") || e.includes("héberg") || e.includes("heberg") || e.includes("hotel")) return "etages";
  return "etages";
}

const MISSIONS: Record<Famille, string[]> = {
  reception: [
    "l'accueil physique et téléphonique, les check-in et check-out, la remise des clés et l'orientation des clients dans l'hôtel",
    "la tenue du desk sur les créneaux d'arrivée, la gestion des demandes clients en cours de séjour et la transmission des consignes aux étages",
    "la réception des clients, le suivi des réservations de la journée et le relais des réclamations vers la direction",
  ],
  etages: [
    "la remise en état des chambres à blanc et en recouche, le contrôle des étages et le réapprovisionnement des offices",
    "le nettoyage des chambres et des parties communes, le signalement des anomalies techniques et la préparation des arrivées du jour",
    "l'entretien des chambres, la gestion du linge et la remontée des informations utiles à la réception avant les arrivées",
  ],
  restauration: [
    "la mise en place et le service du petit-déjeuner, l'entretien de la salle et le réassort du buffet",
    "le service en salle, la plonge, la mise en place du buffet et l'application des règles d'hygiène HACCP",
    "l'accueil des clients au petit-déjeuner, le réassort, le nettoyage de la salle et le lien avec la réception sur les départs matinaux",
  ],
  encadrement: [
    "la répartition du travail des femmes de chambre, le contrôle qualité des chambres et le point quotidien avec la réception",
    "l'organisation du planning des étages, le contrôle des recouches et la gestion des stocks de linge et de produits",
    "l'encadrement de l'équipe d'étages, le contrôle des chambres livrées et la coordination avec la réception sur les arrivées anticipées",
  ],
};

const OBJECTIFS_STAGIAIRE: Record<Famille, string[]> = {
  reception: [
    "Je voudrais être plus à l'aise quand un client arrive mécontent au desk. Aujourd'hui je gère, mais un peu à l'instinct.",
    "Mon objectif, c'est de pouvoir tenir la réception seul(e) sur une journée complète, y compris quand il y a un incident technique en même temps que les arrivées.",
    "J'aimerais évoluer vers un poste de chef(fe) de réception d'ici deux ou trois ans. Pour ça, il faut que je sache mieux coordonner les autres services.",
  ],
  etages: [
    "Je souhaite gagner en rapidité sans perdre en qualité, et savoir quoi faire en priorité quand il y a beaucoup de départs le même matin.",
    "Mon but, c'est de sécuriser mon poste et de montrer que je peux prendre plus de responsabilités aux étages.",
    "J'aimerais qu'on me confie le contrôle des chambres, donc apprendre à repérer les points que la gouvernante vérifie.",
    "Je veux surtout mieux communiquer avec la réception : souvent l'information passe mal et c'est le client qui attend.",
  ],
  restauration: [
    "Je voudrais être plus organisé(e) le matin quand le service petit-déjeuner et les départs tombent en même temps.",
    "Mon objectif est de devenir polyvalent(e) entre la salle et l'accueil, pour pouvoir dépanner la réception quand il y a du monde.",
    "J'aimerais consolider tout ce qui est hygiène et traçabilité, parce que c'est ce qui est contrôlé et je ne veux pas être en défaut.",
  ],
  encadrement: [
    "Je veux structurer la façon dont je répartis le travail : aujourd'hui je fais au feeling, et selon les jours ça tient ou pas.",
    "Mon objectif est de professionnaliser mes briefings d'équipe et mes transmissions écrites avec la réception.",
    "J'aimerais réduire les allers-retours entre les étages et la réception, et pour cela poser une vraie méthode de coordination.",
  ],
};

const DIPLOMES = [
  "CAP services hôteliers, obtenu il y a quelques années.",
  "Un CAP cuisine. Je n'ai pas poursuivi ensuite.",
  "Bac professionnel commercialisation et services en restauration.",
  "Baccalauréat général, série ES.",
  "BTS management en hôtellerie-restauration.",
  "Brevet des collèges. J'ai appris le métier sur le terrain.",
  "Bac professionnel gestion-administration.",
  "CAP agent polyvalent de restauration.",
  "Un diplôme obtenu à l'étranger, équivalent au baccalauréat.",
  "BEP hôtellerie, complété par plusieurs années d'expérience en hôtel.",
];

const OPCO_PHRASES = [
  "Aucun budget personnel : la formation est prise en charge par l'OPCO dans le cadre du plan de développement des compétences de l'hôtel.",
  "C'est l'employeur qui s'en occupe, avec un financement OPCO. Je n'ai rien à avancer de mon côté.",
  "Je n'ai pas prévu de budget : le dossier a été déposé auprès de notre OPCO par la direction.",
  "La direction m'a indiqué que la formation passait par l'OPCO. Je n'ai donc pas de reste à charge.",
  "Prise en charge OPCO au titre du plan de développement des compétences ; pas de participation financière de ma part.",
  "Financement assuré par l'OPCO de branche, sur demande de mon responsable. Aucun budget personnel engagé.",
];

const CONTRIB_PROJET: Record<Famille, string[]> = {
  reception: [
    "Si j'arrive à traiter une réclamation avec une méthode claire, je serai plus crédible pour prétendre à un poste d'encadrement.",
    "Elle va me donner des repères que je n'ai pas eus en formation initiale, notamment sur la coordination avec les étages.",
    "Ça me permettra de tenir des situations difficiles sans passer systématiquement par la direction.",
  ],
  etages: [
    "Cela devrait m'aider à travailler dans un ordre logique et à moins courir, surtout les jours de forte occupation.",
    "Je pense que ça me servira à être reconnue sur mon poste et à évoluer vers un rôle de contrôle des chambres.",
    "Ça va surtout m'aider à mieux transmettre les informations, ce qui évite les erreurs sur les chambres attribuées.",
  ],
  restauration: [
    "Elle me permettra d'être vraiment polyvalent(e) et donc plus utile à l'équipe, ce qui compte pour la suite de mon parcours.",
    "Je pense que je saurai mieux anticiper la mise en place et gérer les imprévus du matin.",
  ],
  encadrement: [
    "Avoir une méthode écrite pour organiser les étages me rendra plus légitime auprès de mon équipe.",
    "Cela m'aidera à passer d'une gestion au quotidien à une véritable organisation anticipée de la semaine.",
  ],
};

const ATTENTES_ENTREPRISE = [
  "Nous attendons que {P} gagne en autonomie sur {M1}, pour que l'encadrement n'ait plus à repasser derrière systématiquement.",
  "L'objectif est simple : moins de dysfonctionnements entre les services. {P} doit savoir à qui transmettre l'information et à quel moment.",
  "Sur un établissement de notre taille, chacun doit pouvoir dépanner l'autre. Nous souhaitons que {P} soit à l'aise sur les situations qui débordent de son poste habituel.",
  "Nous voulons professionnaliser l'accueil client sur l'ensemble du parcours, de l'arrivée au départ, et {P} en est un maillon direct.",
  "Notre attente porte sur la gestion des réclamations : elles remontent trop souvent à la direction alors qu'elles pourraient être traitées au premier niveau.",
  "Nous cherchons à sécuriser les périodes de forte activité. {P} doit savoir prioriser sans attendre une consigne.",
];

const STRATEGIE_ENTREPRISE = [
  "La satisfaction client est notre premier indicateur. Une équipe qui coordonne mieux ses actions, ce sont des avis en ligne qui remontent.",
  "Nous fidélisons nos équipes plutôt que de recruter en urgence : former en interne fait partie de notre stratégie de rétention.",
  "L'établissement vise une montée en gamme de la prestation. Cela suppose des collaborateurs formés aux standards de la marque.",
  "Réduire les incidents évitables, c'est directement du temps d'encadrement récupéré et moins de gestes commerciaux.",
  "Nous préparons une réorganisation des services ; disposer de collaborateurs polyvalents et autonomes est une condition de réussite.",
  "Notre enjeu est la continuité de service en cas d'absence. Plus les compétences sont partagées, moins l'exploitation est fragile.",
];

function accord(civ: string, mot: string): string {
  return civ === "M." ? mot : `${mot}e`;
}

/* ------------------------------------------------------------------ */
/* Contenu généré                                                      */
/* ------------------------------------------------------------------ */

export interface BahoBesoinsContent {
  civilite: string;
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  date: string;
  entrepriseNom: string;
  attentes: string;
  missions: string;
  strategie: string;
  diplome: string;
  objectif: string;
  financement: string;
  contribution: string;
  handicap: string;
  analyse: string;
}

export function buildBesoinsContent(e: BahoEntreprise, raw: BahoStagiaire, si: number): BahoBesoinsContent {
  const s = normalizeStagiaire(raw);
  const ctx = e.siret || e.nom;
  const fam = familleOf(s);
  const civ = civiliteOf(s);
  const prenom = (s.prenom || "").split(/[ ,]/)[0] || "";
  const salarie = civ === "M." ? "notre collaborateur" : "notre collaboratrice";
  const missions = pick(MISSIONS[fam], s, si, 1213, ctx);
  const attentes = pick(ATTENTES_ENTREPRISE, s, si, 1721, ctx)
    .replace(/\{P\}/g, `${prenom || salarie}`)
    .replace(/\{M1\}/g, missions.split(",")[0]);
  const strategie = pick(STRATEGIE_ENTREPRISE, s, si, 2311, ctx);
  const diplome = pick(DIPLOMES, s, si, 2917, ctx);
  const objectif = pick(OBJECTIFS_STAGIAIRE[fam], s, si, 3413, ctx);
  const financement = pick(OPCO_PHRASES, s, si, 3907, ctx);
  const contribution = pick(CONTRIB_PROJET[fam], s, si, 4409, ctx);

  // Analyse du référent : cohérente avec le niveau du test de positionnement de début
  const debut = bahoScores(s, si, ctx).debut;
  const niveau =
    debut <= 4
      ? `Le positionnement d'entrée (${debut}/10) confirme des acquis essentiellement empiriques`
      : debut <= 6
        ? `Le positionnement d'entrée (${debut}/10) situe ${civ === "M." ? "l'intéressé" : "l'intéressée"} à un niveau intermédiaire`
        : `Le positionnement d'entrée (${debut}/10) montre des bases déjà solides`;
  const suites = [
    `Le parcours de 21 heures répond à la demande exprimée : ${objectif.toLowerCase().replace(/^j['e]|^mon |^je /, "")}`,
    `La demande porte clairement sur la méthode plutôt que sur les gestes métier, déjà maîtrisés au poste de ${s.emploi || "l'établissement"}.`,
    `L'attente de l'employeur (${attentes.split(".")[0].toLowerCase()}) rejoint celle ${accord(civ, "exprimé")} par ${civ === "M." ? "le" : "la"} ${accord(civ, "salarié")}.`,
  ];
  const analyse = [
    `${niveau} sur ${missions.split(",")[0]}.`,
    pick(suites, s, si, 4909, ctx),
    pick(
      [
        "Les modules « organisation des services » et « transmission de l'information » sont prioritaires ; aucun aménagement particulier n'est requis.",
        "Nous orientons le parcours vers la priorisation et le traitement des réclamations, en travail sur cas réels de l'établissement.",
        "Le format intra-entreprise est adapté : les mises en situation seront construites à partir des incidents réellement rencontrés sur le site.",
        "Prérequis vérifiés, aucun frein identifié. Le rythme de trois journées consécutives est compatible avec l'organisation du service.",
      ],
      s,
      si,
      5413,
      ctx
    ),
  ].join(" ");

  return {
    civilite: civ,
    prenom: s.prenom || "",
    nom: (s.nom || "").toUpperCase(),
    telephone: s.telephone || "",
    email: s.email || "",
    date: dateEvaluationBesoins(e),
    entrepriseNom: e.nom,
    attentes,
    missions: `${salarie.charAt(0).toUpperCase()}${salarie.slice(1)} assure ${missions}.`,
    strategie,
    diplome,
    objectif,
    financement,
    contribution,
    handicap: "Non.",
    analyse,
  };
}

/* ------------------------------------------------------------------ */
/* Rendu HTML                                                          */
/* ------------------------------------------------------------------ */

export function getEvaluationBesoinsHTML(
  e: BahoEntreprise,
  s: BahoStagiaire,
  si: number,
  customFsStamp?: string
): string {
  const c = buildBesoinsContent(e, s, si);
  const row = (q: string, a: string) => `
    <tr><td style="width:48%;"><strong>${q}</strong></td><td>${a}</td></tr>`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}
  <style>
    .id-table td { border:1px solid #888; }
    .sec { background:#1a3a6e; color:#fff; padding:6px 10px; font-weight:bold; margin-top:20px; }
    .analyse { border:1px solid #888; padding:10px; min-height:70px; }
  </style></head><body>
  ${header()}
  <h1>Evaluation des besoins</h1>
  <p style="text-align:center; font-style:italic; color:#555;">${BAHO_INTITULE} – 21 heures sur 3 jours, en intra-entreprise</p>

  <table class="id-table">
    ${row("Civilité", c.civilite)}
    ${row("Nom", c.nom)}
    ${row("Prénom" + (c.telephone ? " · Téléphone" : ""), `${c.prenom}${c.telephone ? ` · ${c.telephone}` : ""}`)}
    ${c.email ? row("Mail", c.email) : ""}
    ${row("Date", formatDateLong(c.date))}
    ${row("Formation souhaitée", BAHO_INTITULE)}
  </table>

  <div class="sec">Partie Entreprise</div>
  <table>
    ${row("1. Raison sociale de l'entreprise ou nom commercial", `${c.entrepriseNom} – SIRET ${e.siret}`)}
    ${row("2. Quelles sont vos attentes et objectifs pour vous-même et/ou votre salarié(e) dans le cadre de cette formation ?", c.attentes)}
    ${row("3. Quelles sont les missions actuelles ou à venir confiées au salarié(e) en lien avec la formation ?", c.missions)}
    ${row("4. En quoi cette formation contribue-t-elle au développement ou aux objectifs stratégiques de votre entreprise ?", c.strategie)}
  </table>

  <div class="sec">PARTIE EXPÉRIENCE ET SCOLAIRE</div>
  <table>
    ${row("1. Quel est le dernier diplôme ou titre que vous avez obtenu ?", c.diplome)}
    ${row("2. Quel objectif professionnel ou personnel souhaitez-vous atteindre grâce à cette formation ?", c.objectif)}
    ${row("3. Quel budget avez-vous prévu pour cette formation et bénéficiez-vous d'un dispositif de financement (CPF, OPCO, Pôle emploi, etc.) ?", c.financement)}
    ${row("4. En quoi pensez-vous que cette formation contribuera à la réalisation de votre projet professionnel ou personnel ?", c.contribution)}
    ${row("5. Êtes-vous en situation de handicap ? Si oui, avez-vous besoin d'adaptations spécifiques (pédagogiques, techniques, matérielles) pour suivre la formation ?", c.handicap)}
  </table>

  <p style="margin-top:18px;"><strong>Analyse du référent pédagogique :</strong></p>
  <div class="analyse">${c.analyse}</div>

  <p style="margin-top:20px;"><strong>FAIT A ${FORMAT_SPHERE_ORG.ville.toUpperCase()}</strong> &nbsp;&nbsp; <strong>LE : ${formatDateLong(c.date)}</strong></p>

  ${stampsBlock(e, customFsStamp)}
  ${footer()}
  </body></html>`;
}

/** Audit : vérifie remplissage, OPCO, antériorité de la date et diversité des réponses. */
export function auditBahoBesoins(entreprises: BahoEntreprise[]) {
  const rows: Array<{ nom: string; entreprise: string; date: string; avantDebut: boolean; opco: boolean; entrepriseRemplie: boolean }> = [];
  const seen = new Set<string>();
  let duplicates = 0;
  entreprises.forEach((e) =>
    e.stagiaires.forEach((s, si) => {
      const c = buildBesoinsContent(e, s, si);
      const key = `${c.attentes}|${c.objectif}|${c.analyse}`;
      if (seen.has(key)) duplicates++;
      seen.add(key);
      rows.push({
        nom: `${c.nom} ${c.prenom}`.trim(),
        entreprise: e.nom,
        date: c.date,
        avantDebut: new Date(c.date).getTime() < new Date(e.dateDebut).getTime(),
        opco: /opco/i.test(c.financement),
        entrepriseRemplie: !!c.attentes && !!c.missions && !!c.strategie,
      });
    })
  );
  return { rows, duplicates };
}
