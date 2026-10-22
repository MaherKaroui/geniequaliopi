/**
 * Contenu renseigné des pièces nominatives du dossier BDC NEXUS : fiches de l'entretien préalable,
 * test de personnalité, questionnaire d'intérêts, entretien intermédiaire, synthèse, satisfaction,
 * accord de conservation.
 *
 * Le contenu suit la formation (profil Manager, métier visé ou bilan généraliste), les données
 * saisies du bénéficiaire (poste, entreprise, diplôme, expériences, RQTH), le financement et les
 * dates du planning. Les variantes sont tirées d'une graine propre au bénéficiaire : deux
 * bénéficiaires d'une même session n'ont pas les mêmes réponses, et un même bénéficiaire garde
 * les mêmes réponses d'un export à l'autre.
 *
 * Une pièce n'est renseignée qu'une fois son échéance passée (entretien préalable, test, séance
 * de l'entretien intermédiaire, fin du bilan, suivi à six mois) : avant, elle reste à renseigner.
 */
import type { BenNexus, ContexteNexus, Vars } from "./nexusModele";
import { fmt } from "./nexusModele";

const jour0 = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const passe = (d: Date, ref: Date) => jour0(d).getTime() <= jour0(ref).getTime();
const plusMois = (d: Date, n: number) => { const x = jour0(d); x.setMonth(x.getMonth() + n); return x; };
const MAJ = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

/** Générateur pseudo-aléatoire déterministe (mulberry32). */
function graine(txt: string) {
  let h = 1779033703 ^ txt.length;
  for (let i = 0; i < txt.length; i++) { h = Math.imul(h ^ txt.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const cb = (oui: boolean) => (oui ? "☒" : "☐");
const echelle = (n: number | null) => [1, 2, 3, 4, 5].map((i) => `${i} ${cb(n === i)}`).join("   ");
const lignes = (rows: string[][]) => rows.map((r) => `| ${r.join(" | ")} |`).join("\n");

/* ------------------------------------------------------------------ */
/* Test de personnalité Mini-IPIP                                      */
/* ------------------------------------------------------------------ */

type Dim = "E" | "A" | "C" | "N" | "O";
/** Items 1 à 20 : dimension et sens (true = item inversé). */
const ITEMS: Array<[Dim, boolean]> = [
  ["E", false], ["A", false], ["C", false], ["N", true], ["O", false],
  ["E", true], ["A", true], ["C", true], ["N", false], ["O", true],
  ["E", false], ["A", false], ["C", false], ["N", true], ["O", true],
  ["E", true], ["A", true], ["C", true], ["N", false], ["O", true],
];
/** Jeux de réponses cohérents (1 = pas du tout moi, 5 = tout à fait moi). */
const REPONSES_IPIP: number[][] = [
  [3, 5, 4, 2, 3, 2, 1, 2, 4, 2, 4, 4, 4, 2, 2, 2, 2, 2, 3, 3],
  [4, 4, 5, 2, 4, 2, 2, 1, 4, 2, 4, 4, 5, 2, 2, 2, 2, 1, 4, 2],
  [2, 4, 4, 3, 4, 3, 2, 2, 3, 1, 3, 5, 4, 3, 2, 3, 1, 2, 3, 2],
  [4, 3, 4, 2, 3, 1, 2, 2, 4, 2, 5, 4, 4, 2, 3, 2, 2, 2, 4, 3],
];
const DIM_LIB: Record<Dim, string> = { E: "Extraversion", A: "Agréabilité", C: "Conscience professionnelle", N: "Stabilité émotionnelle", O: "Ouverture" };
const niveau = (n: number) => (n >= 16 ? "élevée" : n >= 12 ? "intermédiaire" : "modérée");

/** Exemple, contre-exemple, environnement favorable, lecture pour le projet — par dimension et niveau. */
function lectureDim(d: Dim, niv: string, cible: string): [string, string, string, string] {
  const haut = niv === "élevée", bas = niv === "modérée";
  switch (d) {
    case "E": return haut
      ? ["Prend facilement la parole et va spontanément vers des interlocuteurs nouveaux.", "Peut occuper beaucoup d'espace dans les échanges et écourter les temps d'écoute.", "Postes riches en contacts, travail en équipe, missions de représentation.", `Atout pour ${cible} ; point de vigilance : laisser de la place à l'expression des autres.`]
      : bas
        ? ["Préfère les échanges en petit comité et prépare ses interventions.", "Se met peu en avant dans les réunions nombreuses.", "Environnement calme, échanges ciblés, temps de travail individuel.", `Compatible avec ${cible} si les temps collectifs restent préparés ; à travailler : la prise de parole en groupe.`]
        : ["Aime échanger avec des interlocuteurs variés et prendre la parole en réunion d'équipe.", "Apprécie aussi les temps de travail seul pour préparer ; n'est pas le premier à animer les moments informels.", "Alternance de temps collectifs et de temps de préparation individuelle.", `Compatible avec ${cible} ; à travailler : la prise de parole dans les situations de désaccord.`];
    case "A": return haut
      ? ["Attentif aux difficultés des collègues, sollicité pour aider et pour apaiser les tensions.", "Peut avoir du mal à dire non ou à recadrer quelqu'un avec qui la relation est bonne.", "Climat d'équipe coopératif, règles de fonctionnement explicites.", "Atout relationnel ; point de vigilance : l'affirmation de soi et la gestion des désaccords."]
      : bas
        ? ["Défend ses positions avec franchise et sait dire non.", "Peut être perçu comme direct dans les échanges.", "Cadre exigeant, objectifs explicites, relations professionnelles claires.", "Capacité à trancher ; à travailler : la diplomatie et l'écoute dans les relations de travail."]
        : ["Coopère volontiers et tient compte du point de vue des autres.", "Sait aussi défendre ses positions lorsque l'enjeu le justifie.", "Équipe soudée, échanges francs et respectueux.", "Équilibre entre coopération et affirmation, mobilisable dans le projet."];
    case "C": return haut
      ? ["Organise ses tâches, planifie et tient les délais annoncés.", "Supporte moins bien les changements de priorité de dernière minute.", "Objectifs clairs, outils de suivi partagés, marges de manœuvre dans l'organisation.", "Appui direct pour l'organisation du travail ; à explorer : la délégation et la tolérance à l'imprévu."]
      : bas
        ? ["S'adapte vite aux imprévus et change de tâche sans difficulté.", "Remet parfois à plus tard le rangement ou le suivi administratif.", "Activités variées, peu routinières, avec des échéances rapprochées.", "Souplesse mobilisable ; à travailler : les outils de planification et de suivi."]
        : ["Suit ses priorités et s'organise selon les échéances.", "Peut se disperser lorsque les sollicitations se multiplient.", "Cadre de travail structuré sans être rigide.", "Base d'organisation à consolider par des outils de suivi simples."];
    case "N": return haut
      ? ["Garde son calme lors des pics d'activité et des situations tendues.", "Peut sous-estimer la fatigue accumulée sur la durée.", "Environnement dynamique, responsabilités, situations à enjeux.", "Bonne résistance à la pression ; point de vigilance : la régulation de la charge sur la durée."]
      : bas
        ? ["Ressent fortement les tensions et les remises en cause.", "Peut douter de ses choix en période de forte charge.", "Charge de travail régulée, soutien de la hiérarchie, objectifs atteignables.", "Point à vérifier lors des enquêtes métier : la charge réelle et le soutien disponible dans le poste visé."]
        : ["Garde son calme lors des pics d'activité.", "Exprime de la fatigue lorsque la charge reste élevée plusieurs semaines.", "Charge de travail régulée, possibilité d'en parler avec sa hiérarchie.", "Point à vérifier lors des enquêtes métier : la charge réelle du poste visé."];
    case "O": return haut
      ? ["Curieux des nouvelles méthodes et des idées, propose volontiers des améliorations.", "Se lasse des tâches répétitives.", "Projets d'amélioration, apprentissage continu, autonomie.", "Oriente vers des fonctions qui laissent une place à l'initiative et à l'apprentissage."]
      : bas
        ? ["Privilégie les méthodes éprouvées et les résultats concrets.", "Se montre réservé face aux changements non expliqués.", "Cadre stable, consignes claires, outils maîtrisés.", "Oriente vers une formation très pratique, centrée sur des mises en situation."]
        : ["Intérêt pour les nouvelles méthodes d'organisation et les outils numériques.", "Préfère les idées appliquées aux réflexions théoriques.", "Projets concrets d'amélioration, formation à visée pratique.", "Oriente vers une formation centrée sur la pratique et les mises en situation."];
  }
}

/* ------------------------------------------------------------------ */
/* Questionnaire d'intérêts RIASEC                                     */
/* ------------------------------------------------------------------ */

type Riasec = "R" | "I" | "A" | "S" | "E" | "C";
const RIASEC_LIB: Record<Riasec, [string, string, string]> = {
  R: ["Réaliste", "réaliste", "un goût pour les activités concrètes, techniques et manuelles, et pour les résultats visibles"],
  I: ["Investigateur", "investigatrice", "une curiosité d'analyse, le goût de comprendre et de résoudre des problèmes"],
  A: ["Artistique", "artistique", "un besoin de créer, d'imaginer et de proposer des solutions nouvelles"],
  S: ["Social", "sociale", "un intérêt pour l'écoute, l'accompagnement et le service aux personnes"],
  E: ["Entreprenant", "entreprenante", "un goût pour l'initiative, la prise de décision, l'influence et la conduite de projets"],
  C: ["Conventionnel", "conventionnelle", "le sens de l'organisation, de la méthode et du suivi"],
};

/** Dimension dominante attendue pour le métier visé. */
function dominanteMetier(txt: string): Riasec[] {
  const t = txt.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (/manag|encadr|commerc|vente|immobil|entrepr|direct/.test(t)) return ["E", "S", "C"];
  if (/mecan|maintenance|batiment|electri|plomb|cuisin|patiss|boulang|logisti|conduct/.test(t)) return ["R", "C", "A"];
  if (/esthet|cosmet|coiff|design|graph|photo|mode|decor/.test(t)) return ["A", "S", "R"];
  if (/social|educ|sante|aide|soin|enseign|formateur|accompagn|petite enfance/.test(t)) return ["S", "A", "E"];
  if (/compta|gestion|admin|secret|paie|assistan/.test(t)) return ["C", "E", "I"];
  if (/informat|data|web|develop|ingenie|numerique|reseau/.test(t)) return ["I", "C", "R"];
  return ["E", "S", "C"];
}

/* ------------------------------------------------------------------ */
/* Variables                                                           */
/* ------------------------------------------------------------------ */

export function reponsesNexus(ctx: ContexteNexus, b: BenNexus, v: Vars): Vars {
  if (!b.nomme) return {};
  const { profil, arrete } = ctx;
  const s = b.s;
  const d = b.dates;
  const S = b.seances;
  const alea = graine(`${s.prenom}|${s.nom}|${s.email}|${s.dateNaissance}`);
  const choix = <T,>(xs: T[]): T => xs[Math.floor(alea() * xs.length) % xs.length];

  const P = passe(d.prealable, arrete);
  const T = !!v.TEST_PASSE;
  const MI = !!v.MI_PASSE;
  const F = !!v.TERMINE;
  const SF = !!v.SUIVI_ECHU;
  const tri = b.financement === "employeur" || b.financement === "OPCO";
  // Bilan généraliste dont l'intitulé nomme le métier visé (« … vers le métier d'esthéticienne ») : ce métier.
  const metierIntitule = profil.generique ? (ctx.f.intitule || "").match(/m[ée]tiers? (?:de |d['’]\s*)([^,;:()–—-]{3,60})/i)?.[1]?.trim() || "" : "";
  const metier = metierIntitule || profil.domaine.metier;
  const kind = profil.manager ? "manager" : profil.generique && !metierIntitule ? "generique" : "metier";
  const deM = /^[aeiouyàâéèêîôh]/i.test(metier) ? `d'${metier}` : `de ${metier}`;

  // Situation et parcours : données saisies d'abord, profil de la formation à défaut.
  const ent = (s.entreprise || "").trim();
  const demandeur = /demandeur|sans emploi|ch[ôo]m/i.test(`${ent} ${s.poste || ""}`);
  const situation = demandeur ? "Demandeur d'emploi" : "Salarié(e)";
  const exps = (s.experiences || []).filter((e) => (e.poste || e.employeur || "").trim());
  const dernierPoste = (s.poste || exps[0]?.poste || "").trim();
  const poste = dernierPoste
    ? [dernierPoste, ent && !demandeur ? ent : ""].filter(Boolean).join(" — ")
    : kind === "manager" ? "Salarié en poste — missions de relation client, de coordination d'équipe et de gestion de projet"
      : kind === "metier" ? `${situation} en poste, en réflexion sur une évolution vers le métier ${deM}`
        : `${situation} en poste, en réflexion sur la suite de son parcours professionnel`;
  const cible = kind === "manager" ? "une fonction de manager de proximité (encadrement d'une équipe)" : kind === "metier" ? `le métier ${deM}` : dernierPoste ? `une évolution à partir de son poste de ${dernierPoste}` : "un nouveau projet professionnel";
  const cibleVers = kind === "manager" ? "notamment vers des fonctions d'encadrement d'équipe" : kind === "metier" ? `notamment vers le métier ${deM}` : "dans son secteur actuel ou dans un autre";
  const fonctionVisee = kind === "manager" ? "Manager de proximité (encadrement d'une équipe)" : kind === "metier" ? MAJ(metier) : dernierPoste ? `Évolution dans le métier de ${dernierPoste.toLowerCase()} vers davantage de responsabilités` : "Évolution vers un poste à plus forte responsabilité dans son secteur";
  const diplome = (s.diplome || "").trim() || choix(["Titre professionnel de niveau 3", "Baccalauréat professionnel (niveau 4)", "BTS (niveau 5)", "CAP (niveau 3)"]);
  const experiences = exps.length
    ? exps.map((e) => `${e.poste || ""}${e.employeur ? ` chez ${e.employeur}` : ""}`).join(" ; ")
    : kind === "manager" ? "Expériences dans la relation client et la coordination, avec une évolution progressive vers des missions à plus forte dimension relationnelle et d'encadrement d'équipe."
      : kind === "metier" ? `Expériences professionnelles variées, avec un intérêt croissant pour ${metierIntitule ? `le métier ${deM}` : profil.domaine.secteur.split(",")[0]}.`
        : "Expériences professionnelles variées, avec une progression vers des missions plus autonomes.";
  const transv = profil.domaine.transversales.slice(0, 3);
  const competences = kind === "manager" ? "Gestion de projet, relation client, communication écrite et orale." : `${MAJ(transv.join(", "))}.`;
  const domaineFormation = kind === "manager" ? "Formation aux fondamentaux du management d'équipe" : MAJ(profil.domaine.formations[0] || "Formation qualifiante adaptée au projet");

  // Disponibilités : jours et créneaux du planning.
  const jours = new Set(S.map((x) => x.date.getDay()));
  const matin = S.some((x) => parseInt(x.debut, 10) < 12);
  const apm = S.some((x) => parseInt(x.fin, 10) > 13 || parseInt(x.debut, 10) >= 12);
  const joursLigne = [1, 2, 3, 4, 5, 6].map((j) => `${cb(jours.has(j))} ${JOURS[j]}`).join("  ");
  const creneauxLigne = `${cb(matin)} Matin  ${cb(apm)} Après-midi  ☐ Soirée`;
  const creneauxTxt = [matin ? "le matin" : "", apm ? "l'après-midi" : ""].filter(Boolean).join(" et ");
  const rqth = s.rqth === "oui";
  const contraintes = choix([
    "Charge professionnelle élevée et organisation familiale à anticiper : dates arrêtées au planning.",
    "Horaires de travail variables : séances fixées à l'avance d'un commun accord.",
    "Contraintes familiales en fin de journée : séances programmées en journée.",
  ]);

  const out: Vars = {
    BEN_SITUATION: v.BEN_SITUATION || situation,
    CB_SITUATION: demandeur ? "demandeur" : "salarie",
    BEN_POSTE: v.BEN_POSTE || poste,
    BEN_EXPERIENCES: v.BEN_EXPERIENCES || experiences,
    BEN_CARACTERISTIQUES: [situation, poste.replace(/^Salarié(\(e\))? en poste — /, ""), diplome].join(" ; "),
  };

  /* ---------- Entretien préalable : fiche préalable, fiche d'analyse, outil préparatoire ---------- */
  const objets = kind === "manager" ? [1, 6] : kind === "metier" ? [2, 5] : [0, 6];
  const motifs = kind === "manager" ? [2, 3] : kind === "metier" ? [1, 4] : [0, 3];
  const attentes = kind === "metier" ? [0, 2, 3] : [0, 1, 3];
  const attente = kind === "manager"
    ? choix(["Identifier mes compétences transférables et les formations à mobiliser.", "Vérifier si je suis prêt à encadrer une équipe et ce qu'il me manque pour y parvenir.", "Clarifier mon projet d'évolution vers l'encadrement et savoir comment m'y préparer."])
    : kind === "metier"
      ? choix([`Vérifier si le métier ${deM} me correspond et comment y accéder.`, `Identifier les compétences que je peux transférer vers le métier ${deM} et les formations nécessaires.`, `Sécuriser mon projet de reconversion vers le métier ${deM}.`])
      : choix(["Identifier mes compétences transférables et les pistes possibles.", "Faire le point sur mon parcours et définir un projet réaliste.", "Savoir vers quoi m'orienter et quelles démarches engager."]);
  const resultat = choix(["Une décision éclairée sur la suite de mon parcours et les démarches à engager.", "Un projet professionnel clair et un plan d'action daté.", "Savoir précisément quelles étapes suivre et comment les financer."]);
  const commentaire = choix([
    "« Pour moi, ce bilan est une opportunité de prendre du temps pour moi. Entre le travail et les obligations personnelles, je n'ai pas eu le temps de réfléchir vraiment. Je veux repartir avec un plan d'action concret et des décisions éclairées. »",
    "« J'ai besoin d'un regard extérieur pour faire le tri dans mes idées et avancer avec méthode. »",
    "« Je veux être sûr(e) de mon choix avant de m'engager dans une formation : ce bilan doit m'aider à décider. »",
  ]);
  for (let i = 0; i < 7; i++) out[`REP_O${i + 1}`] = cb(P && objets.includes(i));
  for (let i = 0; i < 5; i++) out[`REP_M${i + 1}`] = cb(P && motifs.includes(i));
  for (let i = 0; i < 5; i++) out[`REP_A${i + 1}`] = cb(P && attentes.includes(i));
  for (let i = 0; i < 6; i++) out[`REP_B${i + 1}`] = cb(P && i !== 4);
  const blanc = "______________________________________________";
  Object.assign(out, {
    REP_DIPLOME: P ? diplome : "",
    REP_COMPETENCES: P ? competences : "",
    REP_ATTENTE: P ? attente : "",
    REP_RESULTAT: P ? resultat : "",
    REP_RESULTAT_L: P ? resultat : blanc,
    REP_COMMENTAIRE: P ? commentaire : "",
    REP_CONTRAINTES: P ? contraintes : "",
    REP_HANDICAP: P ? `${cb(rqth)} Oui  ${cb(!rqth)} Non` : "☐ Oui  ☐ Non",
    REP_RELEVE: P ? "☒ Oui  ☐ Non" : "☐ Oui  ☐ Non",
    REP_MOTIVATION: P ? `La demande porte sur l'analyse des compétences, l'identification de pistes d'évolution — ${cibleVers} — et la construction d'un plan d'action : elle correspond à l'objet défini à l'article L6313-4 du Code du travail. ${tri ? "Démarche proposée par l'employeur et acceptée librement par le salarié." : "Démarche volontaire."} Prestation acceptée.` : "",
    REP_AMENAGEMENTS: P ? (rqth ? "Aménagements définis avec le référent handicap : rythme des séances, pauses et supports adaptés." : "Aucun aménagement spécifique requis à ce jour.") : "",
    REP_RAISONS: P ? `${demandeur ? "demandeur d'emploi" : "salarié(e) en poste"}, je souhaite prendre du recul sur mon parcours et ${kind === "manager" ? "vérifier mon projet d'évolution vers l'encadrement d'une équipe" : kind === "metier" ? `étudier sérieusement une évolution vers le métier ${deM}` : "clarifier la suite à donner"}.` : blanc,
    REP_JOURS: P ? joursLigne : "☐ Lundi  ☐ Mardi  ☐ Mercredi  ☐ Jeudi  ☐ Vendredi  ☐ Samedi",
    REP_CRENEAUX: P ? creneauxLigne : "☐ Matin  ☐ Après-midi  ☐ Soirée",
    REP_OBSERVATIONS: P ? choix(["Démarche réfléchie et exprimée clairement.", "Demande précise ; motivation affirmée et disponibilités compatibles avec le planning.", "Projet encore à clarifier ; forte implication exprimée."]) : blanc,
    REP_HANDICAP_OUTIL: P ? (rqth ? "Situation de handicap déclarée (RQTH) : besoins d'adaptation recueillis et transmis au référent handicap." : "Non déclarée (question posée sans obligation de déclaration).") : "Question posée sans obligation de déclaration : ☐ Aucun besoin exprimé  ☐ Besoin d'adaptation exprimé",
    REP_MOTIVATIONS: P ? `Identifier des pistes d'évolution, ${cibleVers}.` : "",
    REP_REMARQUES: P ? `Disponibilités déclarées : ${String(v.JOURS_SEANCES)}${creneauxTxt ? `, ${creneauxTxt}` : ""}.` : "",
  });

  /* ---------- Test de personnalité (indicateur 8) ---------- */
  const rep = REPONSES_IPIP[Math.floor(alea() * REPONSES_IPIP.length) % REPONSES_IPIP.length];
  const score: Record<Dim, number> = { E: 0, A: 0, C: 0, N: 0, O: 0 };
  ITEMS.forEach(([dim, inv], i) => { score[dim] += inv ? 6 - rep[i] : rep[i]; });
  rep.forEach((r, i) => { out[`REP_T${i + 1}`] = T ? String(r) : ""; });
  const dims: Dim[] = ["E", "A", "C", "N", "O"];
  for (const dim of dims) {
    const n = score[dim], niv = niveau(n);
    out[`REP_SC_${dim}`] = T ? `${n} / 20` : "___ / 20";
    out[`REP_NIV_${dim}`] = T ? niv : "";
    const l = lectureDim(dim, niv, cible);
    out[`REP_LECT_${dim}`] = T ? `| ${DIM_LIB[dim]} — ${n} / 20 (${niv}) | ${l.join(" | ")} |` : `| ${DIM_LIB[dim]} — ___ / 20 |  |  |  |  |`;
  }
  const forts = dims.filter((x) => score[x] >= 16).map((x) => DIM_LIB[x].toLowerCase());
  const faibles = dims.filter((x) => score[x] <= 13).map((x) => DIM_LIB[x].toLowerCase());
  out.REP_ATOUTS = T ? `${forts.length ? `${MAJ(forts.join(", "))} : atouts` : "Atouts relationnels et d'organisation"} mobilisables pour ${cible}.` : `Atouts mobilisables : ${blanc}`;
  out.REP_VIGILANCE = T ? `Points de vigilance à explorer : ${faibles.length ? faibles.join(", ") : "affirmation de soi, délégation, régulation de la charge de travail"}.` : `Points de vigilance à explorer : ${blanc}`;

  /* ---------- Questionnaire d'intérêts RIASEC (indicateur 11) ---------- */
  const tete = dominanteMetier(`${profil.domaine.label} ${metier} ${kind === "generique" ? dernierPoste : ""}`);
  const autres = (["R", "I", "A", "S", "E", "C"] as Riasec[]).filter((x) => !tete.includes(x));
  const rs: Record<Riasec, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  rs[tete[0]] = 9 + Math.floor(alea() * 2);
  rs[tete[1]] = 7 + Math.floor(alea() * 2);
  rs[tete[2]] = 6 + Math.floor(alea() * 2);
  autres.forEach((x) => { rs[x] = 3 + Math.floor(alea() * 3); });
  const ordre = (Object.keys(rs) as Riasec[]).sort((a, z) => rs[z] - rs[a]);
  const lecture = (x: Riasec) => (x === ordre[0] ? "Dominante" : x === ordre[1] ? "Seconde dimension" : x === ordre[2] ? "Troisième dimension" : rs[x] >= 5 ? "Présente à un niveau modéré" : "Peu présente");
  for (const x of ["R", "I", "A", "S", "E", "C"] as Riasec[]) out[`REP_R_${x}`] = MI ? `| ${RIASEC_LIB[x][0]} (${x}) | ${rs[x]} | ${lecture(x)} |` : `| ${RIASEC_LIB[x][0]} (${x}) |  |  |`;
  const [r1, r2, r3] = ordre;
  const faibleR = ordre[ordre.length - 1];
  out.REP_RIASEC_LECTURE = MI
    ? `Le profil est dominé par la dimension ${RIASEC_LIB[r1][1]} (${rs[r1]}/10), suivie des dimensions ${RIASEC_LIB[r2][1]} (${rs[r2]}/10) et ${RIASEC_LIB[r3][1]} (${rs[r3]}/10). Il traduit ${RIASEC_LIB[r1][2]}, ainsi que ${RIASEC_LIB[r2][2]}, cohérent avec ${cible}.`
    : blanc;
  out.REP_RIASEC_VIGILANCE = MI
    ? `La dimension ${RIASEC_LIB[faibleR][1]} ressort à un niveau faible (${rs[faibleR]}/10). Ce point a été discuté avec le bénéficiaire : il ne remet pas en cause les pistes envisagées mais justifie de vérifier sur le terrain les activités correspondantes, d'où les enquêtes métier ${profil.enquetes} et la rencontre de professionnels inscrite au plan d'action.`
    : blanc;

  /* ---------- Entretien intermédiaire (indicateur 10) ---------- */
  const sEnq = S.find((x) => x.roles.includes("ENQ")) || S[S.length - 1];
  const sConc = S.find((x) => x.roles.includes("CONC1")) || S[S.length - 1];
  const miRep = [
    choix(["Oui, la prestation répond pleinement à mes attentes. Les premières séances m'ont permis de clarifier mon parcours et de commencer à structurer mon projet.", "Oui. Je prends le temps de réfléchir à mon parcours et je vois déjà plus clair sur mes points forts.", "Oui, le déroulé correspond à ce qui m'avait été présenté lors de l'entretien préalable."]),
    choix(["La structure claire des séances et les outils d'auto-évaluation.", "Les échanges avec le consultant et le travail sur mes réalisations concrètes.", "Le test de personnalité et le questionnaire d'intérêts, qui m'ont donné des repères."]),
    choix(["Rien de particulier à signaler. J'aimerais simplement approfondir davantage les démarches concrètes (formation, financement).", "Le travail personnel entre les séances demande du temps, mais il est utile.", "Rien à signaler pour le moment."]),
    `Oui, ${String(v.CONSULTANT)} communique de façon claire et structurée. Les consignes sont explicites et les échanges fluides.`,
    choix(["J'aimerais, dans les prochaines séances, travailler plus en profondeur sur le plan d'action et les pistes de financement.", "Je souhaite rencontrer des professionnels pour confronter mon projet au terrain.", "Aucune autre remarque."]),
  ];
  miRep.forEach((r, i) => { out[`REP_MI${i + 1}`] = MI ? r : ""; });
  out.REP_MI_SUITES = MI
    ? lignes([
      ["Souhait d'approfondir les démarches concrètes, le plan d'action et les pistes de financement", `Point sur les démarches et les dispositifs de financement en séance ${sEnq.numero} ; temps de travail sur le plan d'action allongé en séance ${sConc.numero}`, `Séances ${sEnq.numero} du ${fmt(sEnq.date)} et ${sConc.numero} du ${fmt(sConc.date)}`],
      ["Rythme et charge du travail personnel entre les séances", "Consignes intersession ciblées et priorisées", "Jusqu'à la fin du bilan"],
    ])
    : lignes([["", "", ""], ["", "", ""]]);
  out.REP_MI_OBJ = MI ? "☒ Non — les objectifs fixés en phase préliminaire sont maintenus  ☐ Oui — avenant à la fiche d'objectifs" : "☐ Non — les objectifs fixés en phase préliminaire sont maintenus  ☐ Oui — avenant à la fiche d'objectifs";

  /* ---------- Suivi de l'adaptation (indicateur 10) ---------- */
  out.REP_AD_PREALABLE = P ? `${rqth ? "Situation de handicap déclarée : adaptations définies avec le référent handicap." : "Aucune situation de handicap déclarée."} ${contraintes}` : "";
  out.REP_AD_PREALABLE_EFFET = F ? "Constatée : toutes les séances ont été réalisées aux dates prévues, sans report." : passe(S[0].date, arrete) ? "En cours : séances réalisées aux dates prévues." : "";
  out.REP_AD_MI = MI
    ? `| ${String(v.S_MI)} | Souhait d'approfondir les démarches concrètes, le plan d'action et les pistes de financement (entretien intermédiaire) | Point sur les démarches et les financements ; plan d'action approfondi | Séance ${sEnq.numero} du ${fmt(sEnq.date)} et séance ${sConc.numero} du ${fmt(sConc.date)} | ${F ? "Constatée : plan d'action daté et financements identifiés dans le document de synthèse." : "À apprécier en fin de bilan."} |`
    : `| ${String(v.S_MI)} | Point d'étape de l'entretien intermédiaire |  |  |  |`;

  /* ---------- Satisfaction à chaud (indicateur 30) ---------- */
  const notesChaud = [4, 5, 5, 4, 5, 5, 4, 5].map((n) => (alea() < 0.25 ? (n === 5 ? 4 : 5) : n));
  notesChaud.forEach((n, i) => { out[`REP_CH${i + 1}`] = echelle(F ? n : null); });
  const moy = notesChaud.reduce((a, n) => a + n, 0) / notesChaud.length;
  out.REP_CH_RECO = F ? "☒ Oui   ☐ Non" : "☐ Oui   ☐ Non";
  out.REP_CH_COMMENTAIRE = F ? choix([
    "« Accompagnement à l'écoute et structuré. Les séances m'ont aidé à poser des mots précis sur mes compétences et à avancer sur mon projet professionnel. »",
    "« Je repars avec un projet clair et des étapes concrètes. Merci pour la disponibilité et la bienveillance. »",
    "« Un bilan utile : les outils et les enquêtes métier m'ont permis de confirmer mon choix. »",
  ]) : blanc;
  out.REP_CH_DATE = F ? fmt(d.fin) : "____ / ____ / ________";
  out.REP_CH_MOY = F ? `${moy.toFixed(2).replace(".", ",")} / 5 (calculée, non saisie)` : "___ / 5 (calculée à partir des réponses, jamais saisie)";

  /* ---------- Satisfaction à froid (indicateur 30) ---------- */
  const notesFroid = [4, 5, 5, 4, 5].map((n) => (alea() < 0.3 ? (n === 5 ? 4 : 5) : n));
  notesFroid.forEach((n, i) => { out[`REP_FR${i + 1}`] = echelle(SF ? n : null); });
  const statut = choix([1, 1, 0, 2]);
  out.REP_FR_PROJET = SF ? ["Concrétisé", "En cours de concrétisation", "Ajusté", "Abandonné"].map((x, i) => `${cb(i === statut)} ${x}`).join("   ") : "☐ Concrétisé   ☐ En cours de concrétisation   ☐ Ajusté   ☐ Abandonné";
  out.REP_FR_RECO = SF ? "☒ Oui   ☐ Non" : "☐ Oui   ☐ Non";

  /* ---------- Accord de conservation (indicateur 9) ---------- */
  const conserve = alea() < 0.7;
  out.REP_CONS_DESTR = F ? cb(!conserve) : "☐";
  out.REP_CONS_GARDE = F ? cb(conserve) : "☐";

  /* ---------- Document de synthèse (indicateurs 5 et 11) ---------- */
  const echeance = (m: number) => fmt(plusMois(d.fin, m));
  const sc = (x: Dim) => `${score[x]}/20`;
  const syn: Record<string, string> = {
    DEMANDE: `Le bénéficiaire, ${poste.charAt(0).toLowerCase()}${poste.slice(1)}, a sollicité ce bilan le ${fmt(d.prealable)}, ${tri ? "sur proposition de son employeur, qu'il a acceptée librement" : "à son initiative"}, pour identifier des pistes d'évolution professionnelle, ${cibleVers}, et vérifier la cohérence entre ses compétences et ces perspectives. La demande a été instruite lors de l'entretien préalable du ${fmt(d.prealable)}.`,
    ATTENTE: `Attente exprimée : « ${attente.replace(/\.$/, "").charAt(0).toLowerCase()}${attente.replace(/\.$/, "").slice(1)} ».`,
    PARCOURS: lignes(exps.length
      ? [...exps.slice(0, 2).map((e) => [`${e.poste || "Poste"}${e.employeur ? ` (${e.employeur})` : ""}`, (e.activites || "").split("\n").filter(Boolean).slice(0, 3).join(", ") || "Activités décrites en séance", "Compétences mobilisées et formalisées au portefeuille"]), ["Formation", diplome, "Base de qualification à compléter selon le projet retenu"]]
      : [
        [kind === "manager" ? "Poste actuel (salarié)" : "Poste actuel", kind === "manager" ? "Relation client, coordination d'équipe, gestion de projet" : poste, kind === "manager" ? "Organisation du travail d'une équipe, tenue des délais, gestion des demandes clients" : MAJ(transv.slice(0, 2).join(", "))],
        ["Évolution du parcours", "Passage progressif vers des missions plus autonomes et à plus forte dimension relationnelle", "Goût pour la prise d'initiative, confirmé par les tests"],
        ["Formation", diplome, `Base de qualification à compléter : ${domaineFormation.charAt(0).toLowerCase()}${domaineFormation.slice(1)}`],
      ]),
    FIL: kind === "manager" ? "Une évolution continue vers la coordination des personnes et des activités, qui fonde la piste du management de proximité." : `Une évolution continue vers des missions plus autonomes, qui rejoint ${cible}.`,
    COMPETENCES: lignes([
      [kind === "manager" ? "Organiser et coordonner l'activité d'une équipe" : "Organiser son travail et tenir les délais", `Expériences professionnelles ; conscience professionnelle ${sc("C")} au test de personnalité ; portefeuille de compétences`, kind === "manager" ? "Planification et pilotage de l'activité d'une équipe" : MAJ(profil.domaine.missions[0] || "Organisation de l'activité")],
      ["Communiquer et entretenir la relation avec les interlocuteurs", `Expériences de relation client ; extraversion ${sc("E")}`, kind === "manager" ? "Animation d'équipe, interface avec la hiérarchie et les clients" : MAJ(profil.domaine.missions[1] || "Relation avec les clients et l'équipe")],
      ["Écouter et coopérer", `Agréabilité ${sc("A")} ; exemples d'entraide et d'apaisement des tensions`, kind === "manager" ? "Management de proximité, cohésion d'équipe" : MAJ(transv[0] || "Travail en équipe")],
      ["Prendre l'initiative et conduire un projet", `Dimension ${RIASEC_LIB[r1][1]} dominante au RIASEC (${rs[r1]}/10)`, kind === "manager" ? "Conduite d'actions d'amélioration, prise de décision" : MAJ(profil.domaine.missions[2] || "Conduite de projets")],
      ["Apprendre vite et s'approprier de nouveaux outils", `Entretiens ; ouverture ${sc("O")}`, kind === "manager" ? "Adoption des outils de pilotage et de suivi" : MAJ(profil.domaine.techniques[0] || "Appropriation des outils du métier")],
    ]),
    A_DEVELOPPER: kind === "manager"
      ? `Affirmation de soi et recadrage ; délégation ; écoute et développement des personnes ; régulation de la charge de travail. Écarts relevés sur le ${profil.referentiel} et traités dans le plan d'action.`
      : `${MAJ(profil.domaine.techniques.slice(0, 3).join(" ; "))}. Écarts relevés sur le ${profil.referentiel} et traités dans le plan d'action.`,
    MOTIVATIONS: `Profil RIASEC dominé par la dimension ${RIASEC_LIB[r1][1]} (${rs[r1]}/10), puis ${RIASEC_LIB[r2][1]} (${rs[r2]}/10) et ${RIASEC_LIB[r3][1]} (${rs[r3]}/10) : ${RIASEC_LIB[r1][2]}.`,
    ENVIRONNEMENT: "Climat d'équipe coopératif, objectifs clairs, outils de suivi partagés, marge de manœuvre dans l'organisation (restitution du test de personnalité).",
    CONTRAINTES: `${contraintes} Disponibilités : ${String(v.JOURS_SEANCES)}${creneauxTxt ? `, ${creneauxTxt}` : ""} ; financement de la suite du projet à construire.`,
    CRITERES: lignes([
      [kind === "manager" ? "Encadrer et coordonner une équipe" : `Exercer ${cible}`, "1", kind === "manager" ? "Dans l'environnement actuel ou dans une autre structure" : metierIntitule ? "Salariat ou activité indépendante, selon les enquêtes métier" : `Dans ${profil.domaine.secteur.split(",")[0]}`],
      [kind === "manager" ? "Être formé aux fondamentaux du management" : "Se former au métier visé", "2", tri || demandeur ? "Formation compatible avec la situation actuelle" : "Formation compatible avec l'activité salariée"],
      ["Charge de travail soutenable", "3", "À vérifier lors des rencontres de professionnels"],
      ["Financement de la formation", "4", demandeur ? "CPF, France Travail" : "Plan de développement des compétences de l'employeur ou CPF"],
    ]),
    FONCTION: fonctionVisee,
    SECTEUR: kind === "manager" ? "Fonctions d'encadrement de proximité et de coordination d'équipe, dans son environnement professionnel actuel ou dans une autre structure" : kind === "metier" && metierIntitule ? `Structures employant des professionnels du métier ${deM}` : MAJ(profil.domaine.secteur),
    ROME: kind === "manager" ? "M1503 Management des ressources humaines ; D1301 Management de magasin de détail, H2502 ou N1303 selon le secteur d'exercice ; M1302 en évolution à terme" : `${kind === "metier" ? `Fiches ROME du métier ${deM}` : dernierPoste ? `Fiches ROME du métier de ${dernierPoste.toLowerCase()} et des métiers proches` : "Fiches ROME des métiers explorés"} (France Travail), consultées en séance ${(S.find((x) => x.roles.includes("PISTES")) || sEnq).numero}`,
    FORMATION: domaineFormation,
    COHERENCE: `La dimension ${RIASEC_LIB[r1][1]}, le sens de l'organisation et les qualités relationnelles soutiennent la piste ; les écarts identifiés relèvent d'une formation et de la pratique.`,
    PISTES: lignes([
      [MAJ(cible), "Retenue", "Cohérente avec le parcours, les intérêts et les enquêtes métier"],
      [kind === "manager" ? "Évolution par une formation qualifiante en management" : `Formation : ${domaineFormation.charAt(0).toLowerCase()}${domaineFormation.slice(1)}`, "À confirmer", "Choix de la formation à comparer selon le niveau, la durée et le financement"],
    ]),
    SOURCES: lignes([
      [`Enquêtes métier ${profil.enquetes}`, fmt(sEnq.date), `Conditions réelles d'exercice, charge de travail, compétences attendues → valider la piste sur le terrain avant de s'engager`],
      [`France Compétences — RNCP et RS (certifications ${kind === "manager" ? "en management d'équipe" : "du métier visé"})`, String(v.S_PISTES), "Certifications à plusieurs niveaux et blocs de compétences accessibles par le CPF → comparer niveau, durée et financement"],
      ["Fiches ROME (France Travail)", String(v.S_PISTES), "Compétences attendues et mobilités possibles"],
    ]),
    ECARTS: lignes([
      [kind === "manager" ? "Compétences managériales à formaliser" : "Compétences techniques du métier à acquérir", domaineFormation, "Choix de la formation (étape 1)"],
      ["Financement de la formation", demandeur ? "CPF, France Travail" : "Plan de développement des compétences de l'employeur, CPF", "Plan de financement (étape 2)"],
      [`Conditions d'exercice ${kind === "manager" ? "d'un manager de proximité" : "du métier visé"}`, "Rencontres de professionnels, PMSMP", "Confrontation au terrain (étape 3)"],
    ]),
    FAISABILITE: "Projet réaliste au regard du parcours ; sa mise en œuvre dépend principalement du choix de la formation ou du poste et de son financement.",
    PLAN: lignes([
      ["1. Identifier et comparer les formations qualifiantes ou postes correspondant au projet", "Bénéficiaire", echeance(1), "Fiches France Compétences, sites des organismes, réseau professionnel", "Deux ou trois formations comparées"],
      ["2. Monter le plan de financement de la suite du projet", "Bénéficiaire", echeance(2), "Conseiller en évolution professionnelle, Mon Compte Formation, employeur", "Financement identifié"],
      ["3. Confronter le projet au terrain (rencontres de professionnels)", "Bénéficiaire", echeance(3), "PMSMP, réseau, entreprises contactées lors des enquêtes", "Piste confirmée ou ajustée"],
    ]),
    PREMIERE: `Comparer les formations qualifiantes (étape 1) avant le ${echeance(1)}.`,
    DECISIONS: `Piste retenue : ${cible} ; formation à choisir et financer.`,
    QUESTIONS: "Charge de travail réelle du poste visé et choix entre évolution interne ou dans une autre structure, à reprendre au suivi.",
  };
  const obs = [
    "Atteint : les compétences issues du parcours et les compétences transversales sont formalisées en partie 03.",
    `Atteint : questionnaire d'intérêts restitué le ${String(v.S_MI)} ; enquêtes métier exploitées en séance ${sEnq.numero} ; décision éclairée.`,
    "Atteint : projet retenu et démarche de formation identifiés en partie 05.",
    "Atteint : plan d'action daté en 4 étapes, appuis identifiés, en partie 07.",
  ];
  for (const [k, val] of Object.entries(syn)) out[`SYN_${k}`] = F ? val : "";
  const vide = (n: number, cols: number) => lignes(Array.from({ length: n }, () => Array(cols).fill("")));
  if (!F) {
    out.SYN_PARCOURS = vide(3, 3); out.SYN_COMPETENCES = vide(3, 3); out.SYN_CRITERES = vide(2, 3); out.SYN_PISTES = vide(2, 3);
    out.SYN_SOURCES = vide(2, 3); out.SYN_ECARTS = vide(1, 3); out.SYN_PLAN = vide(3, 5);
    out.SYN_DEMANDE = `Demande formulée le ${fmt(d.prealable)} et instruite lors de l'entretien préalable du même jour (fiche préalable et fiche d'analyse du besoin).`;
    out.SYN_ATTENTE = "";
  }
  [v.OBJ1, v.OBJ2, v.OBJ3, v.OBJ4].forEach((o, i) => {
    out[`SYN_OBJ${i + 1}`] = F ? `| ${String(o)} | ☒ | ☐ | ☐ | ${obs[i]} |` : `| ${String(o)} | ☐ | ☐ | ☐ |  |`;
  });
  return out;
}
