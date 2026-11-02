/**
 * Automatisation EDOF — documents d'évaluation pour N'IMPORTE QUELLE formation de l'export dont le
 * certificateur n'a pas fourni de modèle : construits sur la fiche officielle France Compétences
 * (blocs, compétences, prérequis, certificateur), ou à défaut sur l'intitulé de la formation.
 *
 * Mêmes 5 pièces que pour la RS7650 : questionnaire de positionnement, attestation sur l'honneur,
 * évaluation des connaissances, grille d'évaluation des compétences, PV de session.
 * Le sujet est identique pour tous les candidats d'une certification ; les réponses, notes et
 * cases cochées sont propres à chaque candidat (graine n° de dossier + nom), toujours au-dessus du seuil.
 */
import { unitesFC, type FicheFC } from "@/lib/franceCompetences";
import { CRITERES, ETAPES, famille, type Famille } from "@/lib/referentielPedagogie";
import { ageAu, frDate, type EdofCandidat, type SessionExamen } from "./candidats";
import { DocPdf, type Cellule } from "./pdfMiseEnPage";
import { rng } from "./rs7650Reponses";
import { slug, type ContexteRS7650 as ContexteEval, type FichierPack } from "./rs7650Pdf";
import { cleCandidat, marqueCentre } from "./signatures";

const pick = <T,>(r: () => number, arr: T[]): T => arr[Math.floor(r() * arr.length)];
const shuffle = <T,>(r: () => number, arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
const sansPoint = (t: string) => t.replace(/[.;:\s]+$/, "").replace(/^[-•*\s]+/, "");
const lower1 = (t: string) => (t ? t.charAt(0).toLowerCase() + t.slice(1) : t);

// ─── Sujet (commun à tous les candidats d'une certification) ──────────────────

export interface CompetenceEval { unite: string; uniteTitre: string; libelle: string; famille: Famille; criteres: string[] }
export interface QuestionQcm { competence: string; enonce: string; options: string[]; bonne: number }
export interface QuestionOuverte { unite: string; enonce: string; etapes: string[] }
export interface SujetCertification {
  code: string;
  intitule: string;
  certificateur: string;
  prerequis: string;
  domaine: string;
  unites: { code: string; titre: string; nb: number }[];
  competences: CompetenceEval[];
  qcm: QuestionQcm[];
  ouvertes: QuestionOuverte[];
  noteMax: number;
  seuil: number;
}

/** Mauvaises pratiques servant de distracteurs (clairement fausses pour un professionnel). */
const DISTRACTEURS = [
  "Commencer directement sans recueillir d'information ni relire les consignes",
  "Appliquer la même solution standard quelle que soit la situation",
  "Laisser la personne concernée décider seule, sans conseil ni explication",
  "Ne rien consigner une fois la tâche terminée",
  "Ignorer les procédures internes pour gagner du temps",
  "Attendre qu'un problème survienne pour vérifier le résultat",
  "Déléguer entièrement la tâche sans en suivre le résultat",
  "Se fier uniquement à son intuition, sans critère ni contrôle",
  "Passer à l'étape suivante sans valider la précédente",
  "Reporter la vérification à une date ultérieure non fixée",
];

const MAX_QCM = 16;

/** Énoncé lisible : la compétence jusqu'à sa première virgule (les fiches détaillent ensuite le contexte). */
function libelleCourt(lib: string): string {
  const coupe = lib.split(/,\s|\s\(/)[0].replace(/…$/, "");
  return coupe.length >= 20 ? coupe : lib.replace(/…$/, "");
}
const MAX_PAR_UNITE = 8;

/** Référentiel sur lequel le sujet est construit (fiche France Compétences ou intitulé seul). */
export interface SourceReferentiel {
  code: string;
  intitule: string;
  certificateur: string;
  prerequis: string;
  domaine: string;
  unites: { code: string; titre: string; competences: string[] }[];
  /** D'où vient le référentiel (affiché dans l'interface). */
  origine: string;
}

export function sourceDepuisFiche(fiche: FicheFC, code = fiche.c, intitule = fiche.i): SourceReferentiel {
  return {
    code,
    intitule,
    certificateur: fiche.cert.join(", "),
    prerequis: (fiche.prerequis || "").replace(/\s+/g, " ").trim(),
    domaine: (fiche.rome?.[0]?.libelle || fiche.i).replace(/''/g, "'"),
    unites: unitesFC(fiche),
    origine: code === fiche.c ? `fiche France Compétences ${fiche.c}` : `référentiel de la fiche active ${fiche.c} (${fiche.i})`,
  };
}

/**
 * Formation sans fiche exploitable (accompagnement VAE, formation non certifiante, fiche échue sans
 * remplaçante) : compétences génériques formulées sur l'intitulé de la formation.
 */
export function sourceDepuisIntitule(code: string, intitule: string): SourceReferentiel {
  const t = intitule.trim() || "la formation";
  const vae = /(^|[^a-z])vae([^a-z]|$)|validation des acquis/i.test(t);
  const competences = vae
    ? [
        "Analyser son parcours professionnel et identifier les expériences en lien avec la certification visée",
        "Organiser la rédaction du dossier de validation et planifier les étapes de la démarche",
        "Rédiger le dossier de validation en décrivant précisément ses activités et ses résultats",
        "Contrôler la cohérence du dossier avec le référentiel de la certification visée",
        "Présenter et argumenter son expérience lors de l'entretien avec le jury",
      ]
    : [
        `Identifier le cadre, les enjeux et le vocabulaire professionnel de : ${lower1(t)}`,
        `Analyser une situation professionnelle relevant de : ${lower1(t)}`,
        `Organiser et planifier les activités liées à : ${lower1(t)}`,
        `Réaliser les tâches clés de la formation « ${t} » en respectant les règles applicables`,
        "Contrôler la qualité du résultat obtenu et proposer des améliorations",
        "Communiquer sur son activité et rendre compte des résultats obtenus",
      ];
  return {
    code,
    intitule: t,
    certificateur: "",
    prerequis: "",
    domaine: t,
    unites: [{ code: code || "FORMATION", titre: t, competences }],
    origine: "référentiel construit sur l'intitulé de la formation (aucune fiche France Compétences active)",
  };
}

export function construireSujet(source: SourceReferentiel): SujetCertification {
  const unites = source.unites;
  const competences: CompetenceEval[] = [];
  for (const u of unites) {
    for (const c of u.competences.slice(0, MAX_PAR_UNITE)) {
      const lib = sansPoint(c);
      if (!lib) continue;
      const fam = famille(lib);
      competences.push({ unite: u.code, uniteTitre: u.titre, libelle: lib, famille: fam, criteres: CRITERES[fam] });
    }
  }
  // QCM : une question par compétence (répartie sur les blocs), 16 au plus
  const r = rng(`sujet|${source.code}|${source.intitule}`);
  const choisies: CompetenceEval[] = [];
  for (let k = 0; choisies.length < Math.min(MAX_QCM, competences.length); k++) {
    for (const u of unites) {
      const cs = competences.filter((c) => c.unite === u.code);
      if (cs[k] && choisies.length < MAX_QCM) choisies.push(cs[k]);
    }
  }
  // Peu de compétences (la plupart des RS) : deux questions par compétence (début et fin de démarche)
  const paires = choisies.length < 8 ? choisies.flatMap((c) => [c, c]) : choisies;
  const qcm = paires.map((c0, i): QuestionQcm => {
    const c = { ...c0, libelle: libelleCourt(c0.libelle) };
    const derniere = i % 2 === 1;
    const juste = ETAPES[c.famille][derniere ? 3 : 0];
    const options = shuffle(r, [juste, ...shuffle(r, DISTRACTEURS).slice(0, 3)]);
    return {
      competence: c.libelle,
      enonce: derniere
        ? `Pour « ${lower1(c.libelle)} », quelle étape conclut la démarche attendue ?`
        : `Pour « ${lower1(c.libelle)} », par quoi commencez-vous ?`,
      options,
      bonne: options.indexOf(juste),
    };
  });
  const ouvertes = unites.slice(0, 4).map((u): QuestionOuverte => {
    const c = competences.find((x) => x.unite === u.code)!;
    return { unite: u.code, enonce: `Décrivez, étape par étape, votre démarche pour : ${lower1(libelleCourt(c.libelle))}.`, etapes: ETAPES[c.famille] };
  }).filter((q) => q.etapes);
  const noteMax = qcm.length + ouvertes.length * 2;
  return {
    code: source.code,
    intitule: source.intitule,
    certificateur: source.certificateur,
    prerequis: source.prerequis,
    domaine: source.domaine,
    unites: unites.map((u) => ({ code: u.code, titre: u.titre, nb: competences.filter((c) => c.unite === u.code).length })),
    competences,
    qcm,
    ouvertes,
    noteMax,
    seuil: Math.ceil(noteMax / 2),
  };
}

// ─── Réponses propres à chaque candidat ───────────────────────────────────────

export interface ReponsesGeneriques {
  qcm: number[]; // option cochée
  ouvertes: { texte: string; points: number }[];
  noteTheo: number;
  pratique: boolean[][]; // par compétence, par critère : true = acquis
  competencesValidees: boolean[];
  admis: boolean;
  commentaire: string;
  positionnement: {
    age: number | null; activite: boolean; activiteDetail: string; demandeurDepuis: string;
    diplome: string; experience: string; justificationPrerequis: string;
    autoEval: number[]; objectifs: number[]; besoins: number[]; attentes: string;
  };
}

const CONNECTEURS = [["D'abord", "Ensuite", "Puis", "Enfin"], ["Je commence par", "Je poursuis en", "Je veille ensuite à", "Je termine en"], ["1)", "2)", "3)", "4)"]];
const DIPLOMES = [
  { nom: "BTS Management commercial opérationnel", age: 20 }, { nom: "BTS Gestion de la PME", age: 20 },
  { nom: "BUT Gestion des entreprises et des administrations", age: 21 }, { nom: "Licence professionnelle Commerce", age: 21 },
  { nom: "Licence Économie-gestion", age: 21 }, { nom: "Master Management", age: 23 }, { nom: "Baccalauréat STMG", age: 18 },
  { nom: "Bac Pro Métiers du commerce et de la vente", age: 18 }, { nom: "DUT Techniques de commercialisation", age: 20 },
];
const ATTENTES = [
  "Obtenir une certification reconnue pour valoriser mon expérience.",
  "Structurer mes pratiques et gagner en assurance dans mon poste.",
  "Acquérir des méthodes concrètes, directement applicables.",
  "Préparer une évolution de poste ou une reconversion.",
  "Mettre à jour mes connaissances et sécuriser mon parcours professionnel.",
];
const COMMENTAIRES = [
  "Démarche structurée et argumentée, vocabulaire professionnel maîtrisé. Les mises en situation sont traitées avec méthode.",
  "Bonne compréhension des attendus du référentiel. Les choix sont justifiés et les livrables complets.",
  "Candidat(e) à l'aise sur l'ensemble des compétences ; quelques imprécisions à l'oral sans incidence sur la validation.",
  "Travail rigoureux, respect des consignes et du temps imparti. Résultats conformes aux exigences de la certification.",
  "Analyse pertinente des situations proposées et propositions adaptées. Compétences démontrées de manière autonome.",
];

/** Réponse rédigée juste (4 étapes) ou incomplète (2 étapes) à une question ouverte. */
function redaction(r: () => number, etapes: string[], complete: boolean): string {
  const co = pick(r, CONNECTEURS);
  const pris = complete ? etapes : etapes.slice(0, 2);
  return pris.map((e, i) => `${co[i]} ${co[i].endsWith(")") ? e : lower1(e)}`).join(". ") + ".";
}

export function genererReponsesGeneriques(sujet: SujetCertification, c: EdofCandidat): ReponsesGeneriques {
  const r = rng(`${sujet.code}|${c.numeroDossier}|${c.nom}|${c.prenom}|${c.dateNaissance}`);
  // Théorie : 70 % à 100 % des points, jamais sous le seuil
  const cible = Math.max(sujet.seuil + 1, Math.round(sujet.noteMax * (0.7 + r() * 0.3)));
  let aPerdre = sujet.noteMax - cible;
  const ordre = shuffle(r, [...sujet.qcm.map((_, i) => `q${i}`), ...sujet.ouvertes.map((_, i) => `o${i}`)]);
  const fausses = new Set<string>();
  // chaque erreur coûte 1 point (QCM faux, ou question rédigée incomplète : 1/2)
  for (const k of ordre) {
    if (aPerdre <= 0) break;
    fausses.add(k); aPerdre--;
  }
  const qcm = sujet.qcm.map((q, i) => {
    if (!fausses.has(`q${i}`)) return q.bonne;
    return pick(r, q.options.map((_, k) => k).filter((k) => k !== q.bonne));
  });
  const ouvertes = sujet.ouvertes.map((q, i) => {
    const complete = !fausses.has(`o${i}`);
    return { texte: redaction(r, q.etapes, complete), points: complete ? 2 : 1 };
  });
  const noteTheo = qcm.filter((x, i) => x === sujet.qcm[i].bonne).length + ouvertes.reduce((s, o) => s + o.points, 0);
  // Pratique : au plus un critère non acquis sur quelques compétences (≤ 50 % : compétence validée)
  const pratique = sujet.competences.map((comp) => {
    const crit = comp.criteres.map(() => true);
    if (r() < 0.15) crit[Math.floor(r() * crit.length)] = false;
    return crit;
  });
  const competencesValidees = pratique.map((crit) => crit.filter((a) => !a).length <= crit.length / 2);

  const age = ageAu(c.dateNaissance, c.dateDebut);
  const anneeDebut = +(c.dateDebut || new Date().toISOString()).slice(0, 4);
  const anneeNaissance = /^\d{4}/.test(c.dateNaissance) ? +c.dateNaissance.slice(0, 4) : anneeDebut - 30;
  const d = pick(r, DIPLOMES);
  const anneeDiplome = Math.min(anneeDebut - 1, anneeNaissance + d.age + Math.floor(r() * 6));
  const ansExp = Math.max(1, Math.min(anneeDebut - anneeDiplome, 2 + Math.floor(r() * 10)));
  const activite = r() < 0.7;
  const objectifs = [...new Set([0, pick(r, [1, 2, 3, 4])])].sort();
  const besoins = [...new Set([pick(r, [0, 1, 2, 3]), pick(r, [0, 1, 2, 3])])].sort();
  return {
    qcm, ouvertes, noteTheo, pratique, competencesValidees,
    admis: noteTheo >= sujet.seuil && competencesValidees.every(Boolean),
    commentaire: pick(r, COMMENTAIRES),
    positionnement: {
      age,
      activite,
      activiteDetail: activite ? `${pick(r, ["CDI", "CDI", "CDD", "Indépendant(e)"])} – en poste dans le domaine visé (${lower1(sujet.domaine)})` : "",
      demandeurDepuis: activite ? "" : `${pick(r, [3, 4, 6, 9, 12])} mois`,
      diplome: `${d.nom} – ${anneeDiplome}`,
      experience: `${ansExp} an${ansExp > 1 ? "s" : ""} d'expérience professionnelle en lien avec la certification (${lower1(sujet.domaine)})`,
      justificationPrerequis: `Oui : ${d.nom} (${anneeDiplome}) et ${ansExp} an${ansExp > 1 ? "s" : ""} d'expérience dans le domaine.`,
      autoEval: sujet.competences.map(() => 1 + Math.floor(r() * 3)), // 1 à 3 sur 5 avant la formation
      objectifs,
      besoins,
      attentes: pick(r, ATTENTES),
    },
  };
}

// ─── Documents ────────────────────────────────────────────────────────────────

const nomComplet = (c: EdofCandidat) => `${c.prenom} ${c.nom}`.trim();
const juryNoms = (ctx: ContexteEval) => ctx.jury.filter((j) => j.nom).map((j) => `${j.civilite} ${j.nom}`.trim()).join(", ");

function enteteCandidat(doc: DocPdf, ctx: ContexteEval, c: EdofCandidat, avecJury: boolean) {
  doc.tableau(
    ["Candidat", "Date d'entrée en formation", "Date de sortie de formation", avecJury ? "Date de l'épreuve" : "N° de dossier CPF"],
    [[{ t: `${c.civilite} ${nomComplet(c)}`.trim(), reponse: true }, { t: frDate(c.dateDebut), reponse: true, centre: true }, { t: frDate(c.dateFin), reponse: true, centre: true }, { t: avecJury ? frDate(c.dateFin) : c.numeroDossier, reponse: true, centre: true }]],
    [3, 2, 2, 2],
  );
  doc.tableau(
    avecJury ? ["Centre de formation", "Jury"] : ["Centre de formation", "Adresse"],
    [[{ t: ctx.centre.nom, reponse: true }, { t: avecJury ? juryNoms(ctx) : ctx.centre.adresse, reponse: true }]],
    [1, 1],
  );
}

const certifiante = (sujet: SujetCertification) => /^(RS|RNCP)\d+$/.test(sujet.code);
/** « la certification RS7332 « … » » ou « la formation « … » » (VAE, formation sans code RS/RNCP). */
const designation = (sujet: SujetCertification) =>
  certifiante(sujet) ? `la certification ${sujet.code} « ${sujet.intitule} »` : `la formation « ${sujet.intitule} »`;

const entete = (ctx: ContexteEval, sujet: SujetCertification, titre: string, ref: string) => ({
  organisme: ctx.centre.nom,
  titre,
  sousTitre: sujet.code ? `${sujet.code} – ${sujet.intitule}` : sujet.intitule,
  reference: `${ref} – ${sujet.code || "FORMATION"}`,
});

export async function docPositionnement(ctx: ContexteEval, sujet: SujetCertification, c: EdofCandidat, rep: ReponsesGeneriques) {
  const p = rep.positionnement;
  const doc = await DocPdf.creer(entete(ctx, sujet, "QUESTIONNAIRE DE POSITIONNEMENT", "POS"));
  doc.paragraphe("Ce questionnaire évalue vos connaissances, votre expérience et vos attentes avant le début de la formation, afin d'adapter l'accompagnement et les modalités pédagogiques à votre profil.", { size: 9 });
  enteteCandidat(doc, ctx, c, false);
  doc.titreSection("Profil général");
  doc.questionLibre("Nom et prénom", nomComplet(c));
  doc.questionLibre("Âge", p.age !== null ? `${p.age} ans` : "");
  doc.choix("Avez-vous une activité professionnelle actuelle ?", ["Oui", "Non"], [p.activite ? 0 : 1], { enLigne: true, precision: p.activiteDetail });
  if (!p.activite) doc.choix("Êtes-vous demandeur d'emploi ?", ["Oui", "Non"], [0], { enLigne: true, precision: `Depuis ${p.demandeurDepuis}` });
  doc.questionLibre("Dernier diplôme obtenu et année d'obtention", p.diplome);
  doc.titreSection("Expérience et prérequis");
  doc.choix(`Avez-vous une expérience dans le domaine (${sujet.domaine}) ?`, ["Oui", "Non"], [0], { enLigne: true, precision: p.experience });
  if (sujet.prerequis) doc.paragraphe(`Prérequis de la certification (fiche France Compétences) : ${sujet.prerequis}`, { size: 8.5 });
  doc.choix("Avez-vous pris connaissance des prérequis ?", ["Oui", "Non"], [0], { enLigne: true });
  doc.choix("Selon vous, répondez-vous à ces prérequis ?", ["Oui", "Partiellement", "Non"], [0], { enLigne: true, precision: p.justificationPrerequis });
  doc.titreSection("Auto-évaluation des compétences visées (1 = débutant, 5 = expert)");
  doc.tableau(
    ["Compétence du référentiel", "1", "2", "3", "4", "5"],
    sujet.competences.map((comp, i) => [comp.libelle, ...[1, 2, 3, 4, 5].map((n): Cellule => ({ t: p.autoEval[i] === n ? "X" : "", reponse: true, centre: true }))]),
    [10, 1, 1, 1, 1, 1],
    { size: 8 },
  );
  doc.titreSection("Objectifs et besoins");
  doc.choix("Quels sont vos objectifs ?", ["Obtenir la certification", "Évoluer dans mon poste actuel", "Préparer une reconversion", "Créer ou développer mon activité", "Sécuriser mon parcours professionnel"], p.objectifs);
  doc.choix("Souhaitez-vous être accompagné(e) sur :", ["La méthodologie de l'épreuve de certification", "La mise en pratique en situation professionnelle", "La confiance en soi à l'oral", "L'organisation du travail personnel"], p.besoins);
  doc.questionLibre("Quelles sont vos attentes vis-à-vis de la formation ?", p.attentes);
  doc.choix("Avez-vous besoin d'un aménagement particulier (handicap, trouble d'apprentissage, adaptation pédagogique) ?", ["Oui", "Non"], [1], { enLigne: true });
  doc.titreSection("Engagement");
  doc.choix("Confirmez-vous que les informations fournies sont exactes et sincères ?", ["Oui", "Non"], [0], { enLigne: true });
  doc.choix("Acceptez-vous qu'elles servent à adapter votre parcours (durée, rythme, contenu) ?", ["Oui", "Non"], [0], { enLigne: true });
  doc.paragraphe(`Fait le ${frDate(c.dateDebut)}`, { reponse: true });
  await doc.signatures(["Signature du candidat"], [nomComplet(c)], [ctx.signatures?.candidats?.[cleCandidat(c)]]);
  return doc.enregistrer();
}

export async function docAttestation(ctx: ContexteEval, sujet: SujetCertification, c: EdofCandidat) {
  const doc = await DocPdf.creer(entete(ctx, sujet, "ATTESTATION SUR L'HONNEUR", "ATT"));
  doc.paragraphe(`La présente attestation a pour objet de confirmer que le candidat remplit les conditions d'accès à ${designation(sujet)}${certifiante(sujet) && sujet.certificateur ? `, conformément au référentiel enregistré par France Compétences (certificateur : ${sujet.certificateur})` : ""}. Elle est établie dans le cadre de l'inscription et permet au centre de s'assurer que le candidat satisfait aux prérequis avant sa présentation à l'évaluation finale.`);
  doc.titreSection("Identité du candidat");
  doc.tableau(["Rubrique", "Information"], [
    ["Nom et prénom", { t: `${c.civilite} ${nomComplet(c)}`.trim(), reponse: true }],
    ["Date de naissance", { t: frDate(c.dateNaissance), reponse: true }],
    ["Adresse", { t: [c.adresse, `${c.codePostal} ${c.ville}`.trim()].filter(Boolean).join(", "), reponse: true }],
    ["E-mail", { t: c.email, reponse: true }],
    ["Téléphone", { t: c.telephone, reponse: true }],
  ], [1, 3]);
  if (sujet.prerequis) { doc.titreSection("Prérequis de la certification"); doc.paragraphe(sujet.prerequis, { size: 9 }); }
  doc.titreSection("Déclaration");
  doc.paragraphe(`Je soussigné(e) ${nomComplet(c)}, atteste sur l'honneur avoir pris connaissance des prérequis exigés pour ${designation(sujet)}${certifiante(sujet) ? ", tels que définis dans la fiche officielle de France Compétences" : ""}. Je déclare sur l'honneur remplir ces prérequis et reconnais que toute fausse déclaration de ma part pourra entraîner l'annulation de mon inscription.`);
  doc.titreSection("Contrôle par le centre habilité");
  doc.paragraphe(`L'organisme habilité ${ctx.centre.nom} certifie avoir vérifié les pièces justificatives permettant de s'assurer que le candidat remplit les conditions d'accès à ${designation(sujet)} et atteste avoir pris les mesures nécessaires à cette vérification.`);
  doc.paragraphe(`Fait à ${ctx.centre.ville}, le ${frDate(c.dateDebut)}`, { reponse: true });
  await doc.signatures(["Signature du candidat et nom du candidat", "Signature du représentant du centre habilité"], [nomComplet(c), ""], [ctx.signatures?.candidats?.[cleCandidat(c)], marqueCentre(ctx.signatures)]);
  return doc.enregistrer();
}

export async function docTheorie(ctx: ContexteEval, sujet: SujetCertification, c: EdofCandidat, rep: ReponsesGeneriques) {
  const doc = await DocPdf.creer(entete(ctx, sujet, "ÉVALUATION DES CONNAISSANCES", "EVAL-T"));
  enteteCandidat(doc, ctx, c, true);
  doc.paragraphe(`Consignes : répondre sans aucun support. QCM : une seule bonne réponse par question (1 point). Questions rédigées : 2 points si la démarche est complète, 1 point si elle est partielle. Note sur ${sujet.noteMax} ; seuil de réussite : ${sujet.seuil}/${sujet.noteMax}.`, { size: 8.5 });
  doc.titreSection(`Partie 1 – Questionnaire à choix multiples (${sujet.qcm.length} points)`);
  sujet.qcm.forEach((q, i) => {
    const ok = rep.qcm[i] === q.bonne;
    doc.choix(`${i + 1}. ${q.enonce}   [${ok ? 1 : 0}/1]`, q.options, [rep.qcm[i]]);
  });
  if (sujet.ouvertes.length) {
    doc.titreSection(`Partie 2 – Questions rédigées (${sujet.ouvertes.length * 2} points)`);
    sujet.ouvertes.forEach((q, i) => doc.questionLibre(`${sujet.qcm.length + i + 1}. ${q.enonce}   [${rep.ouvertes[i].points}/2]`, rep.ouvertes[i].texte, 3));
  }
  doc.titreSection("Résultat");
  doc.tableau(["Note obtenue", "Seuil", "Résultat", "Correcteur"], [[
    { t: `${rep.noteTheo}/${sujet.noteMax}`, reponse: true, centre: true },
    { t: `${sujet.seuil}/${sujet.noteMax}`, centre: true },
    { t: rep.noteTheo >= sujet.seuil ? "Validé" : "Non validé", reponse: true, centre: true },
    { t: juryNoms(ctx), reponse: true },
  ]], [1, 1, 1, 3]);
  return doc.enregistrer();
}

export async function docGrille(ctx: ContexteEval, sujet: SujetCertification, c: EdofCandidat, rep: ReponsesGeneriques) {
  const doc = await DocPdf.creer(entete(ctx, sujet, "GRILLE D'ÉVALUATION DES COMPÉTENCES", "EVAL-P"), true);
  enteteCandidat(doc, ctx, c, true);
  doc.paragraphe("Mise en situation professionnelle : le jury coche, pour chaque critère, Acquis (A) ou Non acquis (NA). Une compétence est refusée si les critères non acquis dépassent 50 % de ses critères.", { size: 8.5 });
  let uniteCourante = "";
  sujet.competences.forEach((comp, i) => {
    if (comp.unite !== uniteCourante) { uniteCourante = comp.unite; doc.titreSection(`${comp.unite} – ${comp.uniteTitre}`); }
    const crit = rep.pratique[i];
    const nbA = crit.filter(Boolean).length;
    doc.tableau(
      [`Compétence ${i + 1} : ${comp.libelle}`, "NA", "A"],
      [
        ...comp.criteres.map((cr, k): Cellule[] => [cr, { t: crit[k] ? "" : "X", reponse: true, centre: true }, { t: crit[k] ? "X" : "", reponse: true, centre: true }]),
        [{ t: "Nombre de cases cochées", gras: true }, { t: `${crit.length - nbA}/${crit.length}`, reponse: true, centre: true }, { t: `${nbA}/${crit.length}`, reponse: true, centre: true }],
      ],
      [12, 1, 1],
    );
  });
  doc.titreSection("Synthèse et avis du jury");
  const validees = rep.competencesValidees.filter(Boolean).length;
  doc.tableau(["Compétences validées", "Évaluation des connaissances", "Avis du jury", "Commentaire du jury"], [[
    { t: `${validees}/${sujet.competences.length}`, reponse: true, centre: true },
    { t: `${rep.noteTheo}/${sujet.noteMax}`, reponse: true, centre: true },
    { t: rep.admis ? "Favorable" : "Défavorable", reponse: true, centre: true },
    { t: rep.commentaire, reponse: true },
  ]], [1, 1, 1, 4]);
  await doc.signatures(ctx.jury.slice(0, 3).map((j, k) => `${k === 0 ? "Président(e) du jury" : "Membre du jury"} – ${j.qualite}`), ctx.jury.slice(0, 3).map((j) => `${j.civilite} ${j.nom}`.trim()), ctx.signatures?.jurys || []);
  return doc.enregistrer();
}

export async function docPV(ctx: ContexteEval, sujet: SujetCertification, session: SessionExamen, reps: ReponsesGeneriques[]) {
  const doc = await DocPdf.creer(entete(ctx, sujet, "PROCÈS-VERBAL DE SESSION D'EXAMEN", "PV"), true);
  doc.tableau(["Centre organisateur", "Adresse", "Date et lieu du jury", "Certificateur"], [[
    { t: ctx.centre.nom, reponse: true }, { t: ctx.centre.adresse, reponse: true },
    { t: `le ${frDate(session.dateExamen)} à ${ctx.centre.ville}`, reponse: true }, sujet.certificateur,
  ]], [2, 3, 2, 2]);
  const parUnite = sujet.unites.length > 1 && sujet.unites.length <= 6;
  const entetes = ["N°", "Nom et prénom", ...(parUnite ? sujet.unites.map((u) => `${u.code.replace(sujet.code, "") || u.code}`) : ["Compétences validées"]), "Théorie", "Pratique", "Décision", "Observations"];
  const lignes = session.candidats.map((c, i): Cellule[] => {
    const rep = reps[i];
    const validees = (code?: string) => sujet.competences.map((comp, k) => (!code || comp.unite === code) && rep.competencesValidees[k]).filter(Boolean).length;
    return [
      { t: String(i + 1), centre: true },
      { t: `${c.nom} ${c.prenom}`, reponse: true },
      ...(parUnite ? sujet.unites.map((u): Cellule => ({ t: `${validees(u.code)}/${u.nb}`, reponse: true, centre: true })) : [{ t: `${validees()}/${sujet.competences.length}`, reponse: true, centre: true } as Cellule]),
      { t: `${rep.noteTheo}/${sujet.noteMax}`, reponse: true, centre: true },
      { t: `${validees()}/${sujet.competences.length}`, reponse: true, centre: true },
      { t: rep.admis ? "Admis" : "Ajourné", reponse: true, centre: true },
      { t: rep.admis ? "Acquis" : "Non acquis", reponse: true },
    ];
  });
  doc.titreSection("Candidats");
  doc.tableau(entetes, lignes, [0.6, 3, ...(parUnite ? sujet.unites.map(() => 1) : [1.4]), 1.2, 1.2, 1.2, 1.6]);
  doc.titreSection("Composition du jury");
  doc.tableau(["Civilité", "Nom et prénom", "Statut", "Qualité"],
    ctx.jury.slice(0, 3).map((j): Cellule[] => [{ t: j.civilite, reponse: true, centre: true }, { t: j.nom, reponse: true }, { t: j.statut, reponse: true }, { t: j.qualite, reponse: true }]),
    [1, 3, 2, 3]);
  await doc.signatures(ctx.jury.slice(0, 3).map((_, k) => (k === 0 ? "Signature – président(e)" : `Signature – juré ${k + 1}`)), ctx.jury.slice(0, 3).map((j) => `${j.civilite} ${j.nom}`.trim()), ctx.signatures?.jurys || []);
  const pres = ctx.jury[0];
  if (pres) {
    doc.place(150); // tableau et signatures du président sur la même page
    doc.titreSection("Président du jury et cachet");
    doc.tableau(["Civilité", "Nom et prénom", "Statut", "Qualité"],
      [[{ t: pres.civilite, reponse: true, centre: true }, { t: pres.nom, reponse: true }, { t: "Président(e) du jury", reponse: true }, { t: pres.qualite, reponse: true }]],
      [1, 3, 2, 3]);
    await doc.signatures(["Signature du président(e) du jury", "Cachet du centre organisateur"], [`${pres.civilite} ${pres.nom}`.trim(), ctx.centre.nom], [ctx.signatures?.jurys?.[0], ctx.signatures?.tamponCentre]);
  }
  return doc.enregistrer();
}


/** Pack d'une session pour une certification sans modèle du certificateur. */
export async function genererSessionGenerique(
  dossier: string, session: SessionExamen, source: SourceReferentiel, ctx: ContexteEval, progression?: () => void,
): Promise<FichierPack[]> {
  const sujet = construireSujet(source);
  const reps = session.candidats.map((c) => genererReponsesGeneriques(sujet, c));
  const out: FichierPack[] = [];
  for (let i = 0; i < session.candidats.length; i++) {
    const c = session.candidats[i];
    const base = `${dossier}/${String(i + 1).padStart(2, "0")}_${slug(`${c.nom}_${c.prenom}`)}`;
    out.push({ chemin: `${base}/1_Questionnaire_de_positionnement.pdf`, donnees: await docPositionnement(ctx, sujet, c, reps[i]) });
    out.push({ chemin: `${base}/2_Attestation_sur_l_honneur.pdf`, donnees: await docAttestation(ctx, sujet, c) });
    out.push({ chemin: `${base}/3_Evaluation_des_connaissances.pdf`, donnees: await docTheorie(ctx, sujet, c, reps[i]) });
    out.push({ chemin: `${base}/4_Grille_evaluation_des_competences.pdf`, donnees: await docGrille(ctx, sujet, c, reps[i]) });
    progression?.();
  }
  out.push({ chemin: `${dossier}/PV_session_${session.dateExamen}.pdf`, donnees: await docPV(ctx, sujet, session, reps) });
  return out;
}
