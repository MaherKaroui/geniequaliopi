/**
 * BLOC 3 — Garde-fous anti-fabrication
 * BLOC 5 — Contenu juridique à jour
 * BLOC 6 — Vocabulaire et clauses spécifiques catégorie BC
 * BLOC 9 — Corrections de rendu
 *
 * Pipeline unique appliqué à TOUT document BDC avant export ou affichage.
 */
import type { BdcContext } from "./bdcModel";

/* ================================================================== */
/* BLOC 6 — Dictionnaire de substitution BC                            */
/* ================================================================== */

/**
 * MESSAGE 17 — Liste d'exclusion : aucune substitution ne s'applique à
 * l'intérieur de ces chaînes (noms de dispositifs, institutions, libellés
 * réglementaires et mentions légales obligatoires).
 */
export const PHRASES_PROTEGEES: string[] = [
  "Mon Compte Formation",
  "formation professionnelle continue",
  "la formation professionnelle",
  "ne vaut pas agrément de l'État",
  "agrément de l'État",
  "Action de formation par apprentissage",
  "Action de formation",
  "Ressource Handicap Formation",
  "plan de développement des compétences",
  "Organisme de formation",
  "organisme de formation",
  "France Travail",
  "Transitions Pro",
  "CNPM",
  "exercice des droits",
  "Exercice des droits",
  "en cours",
  "En cours",
  "compte personnel de formation",
  "Compte personnel de formation",
  "certificat de réalisation",
  "Certificat de réalisation",
];

const TOKEN = (i: number) => `\u0001PROT${i}\u0001`;

/** Remplace les chaînes protégées par des jetons avant toute substitution. */
function protegerPhrases(texte: string): { texte: string; jetons: string[] } {
  const jetons: string[] = [];
  let out = texte;
  PHRASES_PROTEGEES.forEach((phrase) => {
    const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    out = out.replace(re, (m) => {
      jetons.push(m);
      return TOKEN(jetons.length - 1);
    });
  });
  return { texte: out, jetons };
}

function restaurerPhrases(texte: string, jetons: string[]): string {
  return texte.replace(/\u0001PROT(\d+)\u0001/g, (_m, i) => jetons[Number(i)] ?? "");
}

export const BDC_VOCABULAIRE_INTERDIT: Array<[RegExp, string]> = [
  [/\bapprenant(e)?s?\b/gi, "bénéficiaire"],
  [/\bélèves?\b/gi, "bénéficiaire"],
  [/\bstagiaires?\b/gi, "bénéficiaire"],
  [/\bsessions? de formation\b/gi, "séance"],
  [/\bstages?\b/gi, "prestation"],
  [/\bformateur(s|rice|rices)?\b/gi, "consultant"],
  [/\bcentres? de formation\b/gi, "cabinet"],
  [/\bécoles?\b/gi, "cabinet"],
  [/\bévaluations? finales?\b/gi, "entretien de conclusion"],
  [/\bcorrections? des réponses\b/gi, "remise du document de synthèse"],
  [/\bQCM\b/g, "investigation"],
  [/\bexercices?\b/gi, "exploration"],
  [/\bcompétences acquises\b/gi, "compétences identifiées"],
  [/\bacquis\b/gi, "restitution"],
  [/\bmodules?\b/gi, "séance"],
  [/\bcours\b/gi, "phase"],
  [/\bformations?\b/gi, "prestation"],
];

/**
 * MESSAGE 17 — Corrections de non-régression : réparation des textes déjà
 * corrompus par une substitution appliquée en aveugle.
 */
export const CORRECTIONS_SUBSTITUTION: Array<[RegExp, string]> = [
  [/ne vaut pas (déclaration d'activité|agr[ée]ment) de l'[ÉE]tat/gi, "ne vaut pas agrément de l'État"],
  [/Action de prestation par apprentissage/gi, "Action de formation par apprentissage"],
  [/Action de prestation/gi, "Action de formation"],
  [/Mon Compte prestation/gi, "Mon Compte Formation"],
  [/(la |une |de )?prestation professionnelle continue/gi, "la formation professionnelle continue"],
  [/prestation professionnelle/gi, "formation professionnelle"],
  [/exploration des droits/gi, "Exercice des droits"],
  [/Ressource Handicap prestation/gi, "Ressource Handicap Formation"],
  [/une prestation, une prestation ou un secteur/gi, "une prestation, une formation ou un secteur"],
  [/☐\s*En phase\s*☐\s*Soldée/g, "☐ En cours ☐ Soldée"],
  [/\ben phase de traitement\b/gi, "en cours de traitement"],
  [/Organisme de prestation/g, "Organisme de formation"],
  [/organisme de prestation/g, "organisme de formation"],
  [/\bmes prestation\b/gi, "mes formations"],
  [/\bdéclaration d'activité de l'[ÉE]tat\b/gi, "agrément de l'État"],
];

/** MESSAGE 17 — chaînes interdites après correction (contrôle de non-régression). */
export const REGRESSIONS_INTERDITES: string[] = [
  "prestation professionnelle", "Mon Compte prestation", "Action de prestation",
  "Organisme de prestation", "organisme de prestation", "Handicap prestation",
  "exploration des droits", "En phase ☐", "déclaration d'activité de l'État",
  "mes prestation", "une prestation, une prestation",
];

/** Retourne les régressions de substitution présentes dans un texte rendu. */
export function findRegressionsSubstitution(texte: string): string[] {
  return REGRESSIONS_INTERDITES.filter((s) => texte.includes(s));
}

/** Termes dont la présence dans un document BC déclenche une alerte bloquante. */
export const BDC_TERMES_BLOQUANTS = [
  "apprenant", "élève", "stagiaire", "stage", "formateur", "école",
  "centre de formation", "évaluation finale", "QCM", "compétences acquises",
];

/** Clauses inadaptées au bilan de compétences (retirées intégralement). */
const CLAUSES_A_RETIRER = [
  /machines? et ateliers?/i, /entretien du matériel/i, /vestiaires?/i,
  /parc de stationnement/i, /commission de discipline/i,
  /représentants? des (apprenants|bénéficiaires)/i, /conseil de perfectionnement/i,
  /formations? linguistiques?/i, /hébergement du sous-traitant/i,
  /mobilité (nationale|internationale)/i,
];


/* ================================================================== */
/* BLOC 5 — Contenu juridique abrogé                                   */
/* ================================================================== */

export const MENTIONS_ABROGEES: Array<[RegExp, string]> = [
  [/\bCIF\b|congé individuel de formation/gi, "projet de transition professionnelle"],
  [/\bOPACIF\b|\bFONGECIF\b/gi, "association Transitions Pro"],
  [/\bOPCA\b/g, "OPCO"],
  [/\bDIF\b(\s+portable)?/g, "CPF"],
  [/pôle\s*emploi/gi, "France Travail"],
  [/\bdatadock\b/gi, "Qualiopi"],
  [/organisme agréé/gi, "organisme déclaré"],
  [/\bagréments?\b/gi, "déclaration d'activité"],
  [/plan de formation/gi, "plan de développement des compétences"],
  [/attestation de fin de formation/gi, "certificat de réalisation"],
  [/attestation de présence/gi, "certificat de réalisation"],
  [/articles?\s*R\.?\s*6322-\d+(\s*(à|et)\s*R\.?\s*6322-\d+)?/gi, "articles L6313-4 et R6313-4 à R6313-8"],
  [/décret n[°o]\s*92-478 du 29[\/ ]0?5[\/ ]1992/gi, "décret n° 2006-1386 (interdiction de fumer et de vapoter)"],
  [/correspondant à la protection des données/gi, "délégué à la protection des données"],
  [/(cinq|5)\s*ans? (d')?ancienneté[^.]*\./gi, ""],
  [/(vingt-quatre|24)\s*mois[^.]*(CDD)[^.]*\./gi, ""],
  [/délai de franchise[^.]*\./gi, ""],
];

/* ================================================================== */
/* BLOC 9 — Orthographe & rendu                                        */
/* ================================================================== */

const FAUTES: Array<[RegExp, string]> = [
  [/\bà suivi\b/g, "a suivi"],
  [/n'hésitez-pas/gi, "n'hésitez pas"],
  [/\bcession(s)? (de formation|pédagogique)/gi, "session$1 $2"],
  [/\brétraction\b/gi, "rétractation"],
  [/\bposes\b(?= de)/gi, "pauses"],
  [/\bdu apprenant\b/gi, "de l'apprenant"],
  [/Différents éventuels/g, "Différends éventuels"],
  [/\bprécisément\b(?=\s*(ce|le|les)?\s*document)/gi, "précieusement"],
  [/\bfournis\b(?=\s+(le|la|les|un|une)\b)/g, "fournit"],
  [/en double exemplaires/gi, "en deux exemplaires"],
];

/** Supprime les résidus Markdown visibles après conversion. */
export function stripMarkdownResidues(text: string): string {
  return text
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^\s*>{1,3}\s?/gm, "")
    .replace(/^\s{0,3}#{1,6}\s*$/gm, "")
    .replace(/\*\*\s*\*\*/g, "")
    .replace(/\\'/g, "'")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{4,}/g, "\n\n\n");
}

/** Normalise toutes les dates ISO résiduelles en JJ/MM/AAAA. */
export function normalizeDates(text: string): string {
  return text.replace(/\b(\d{4})-(\d{2})-(\d{2})\b/g, (_m, y, mo, d) => `${d}/${mo}/${y}`);
}

/** Supprime les doublons de lignes consécutives ou répétées dans un même bloc. */
export function dedupeLines(text: string): string {
  const lines = text.split("\n");
  const out: string[] = [];
  const seen = new Set<string>();
  for (const l of lines) {
    const key = l.trim().toLowerCase().replace(/\s+/g, " ");
    const isSignificant = key.length > 25 && !key.startsWith("|");
    if (isSignificant && seen.has(key)) continue;
    if (isSignificant) seen.add(key);
    out.push(l);
  }
  return out.join("\n");
}

/** Répare les blocs de signature cassés (« Le sous-trai NOM | ant, »). */
export function repairSignatureBlocks(text: string): string {
  return text.replace(
    /\bLe\s+([a-zéèêîôûç-]+?)\s+([A-ZÉÈÀÂÎÔÛÇ0-9][^|\n]{2,60}?)\s*\|\s*([a-zéèêîôûç]+),/g,
    (_m, a, nom, b) => `Le ${a}${b}, ${String(nom).trim()},`,
  );
}

/* ================================================================== */
/* BLOC 3 — Anti-fabrication                                           */
/* ================================================================== */

export const FILIGRANE_BENEFICIAIRE = "_[À compléter par le bénéficiaire]_";
export const FILIGRANE_TIERS = "_[À compléter par la personne concernée]_";

/** Documents dont le contenu déclaratif ne doit JAMAIS être généré. */
export function isDocumentDeclaratif(titre: string): boolean {
  return /(satisfaction|verbatim|témoignage|questionnaire|test de positionnement|entretien (interm[ée]diaire|annuel|de recrutement)|analyse (du|de) besoin|fiche d'analyse de besoin|enqu[êe]te|appr[ée]ciation)/i.test(titre);
}

export type StatutRubrique = "RENSEIGNE" | "NON_APPLICABLE" | "SOLLICITE_SANS_REPONSE";

export function mentionStatut(statut: StatutRubrique, opts?: { dateSollicitation?: string; dateConstat?: string; motif?: string }): string {
  switch (statut) {
    case "NON_APPLICABLE":
      return `**Sans objet** : ${opts?.motif || "démarche individuelle sans employeur"}. Mention établie le ${opts?.dateConstat || ""}.\n\nSignature du consultant : ______________________`;
    case "SOLLICITE_SANS_REPONSE":
      return `**Sollicité sans réponse** : sollicitation adressée le ${opts?.dateSollicitation || "__/__/____"}, restée sans réponse au ${opts?.dateConstat || "__/__/____"}.\n\n_Joindre ici la capture de la sollicitation (en-tête complet : expéditeur, destinataire, date, objet)._\n\nSignature du consultant : ______________________`;
    default:
      return "";
  }
}

export const MENTION_CPF_SATISFACTION =
  "Le financeur CPF ne répond pas aux enquêtes de satisfaction. Documenter cette rubrique en « sollicité sans réponse » ou en « non applicable ».";

/**
 * Neutralise tout contenu déclaratif pré-rempli : réponses de questionnaires,
 * verbatims, comptes rendus d'entretien. Les zones deviennent vides + filigrane.
 */
export function blankDeclarativeContent(md: string, filigrane = FILIGRANE_BENEFICIAIRE): string {
  let out = md;

  // Lignes de tableau : ne conserver que l'en-tête et l'intitulé de la question.
  out = out.replace(/^\|(.+)\|\s*$/gm, (line) => {
    if (/^\|[\s:\-|]+\|$/.test(line)) return line;
    const cells = line.split("|").slice(1, -1);
    if (cells.length < 2) return line;
    const isHeader = cells.every((c) => /\*\*/.test(c) || /^[\s A-ZÉÈÀÇ0-9'’()\/-]+$/.test(c));
    if (isHeader) return line;
    const kept = cells.map((c, i) => (i === 0 ? c : " "));
    return `|${kept.join("|")}|`;
  });

  // Croix pré-cochées et échelles pré-remplies
  out = out.replace(/☒/g, "☐").replace(/\[\s*[xX]\s*\]/g, "[ ]");
  out = out.replace(/(\bNote\s*:\s*)\d+([.,]\d+)?\s*\/\s*\d+/gi, "$1___/5");

  // Paragraphes libres > 120 caractères sous une rubrique déclarative
  out = out.replace(/^(?!\||#|\s*[-*]\s|\s*$)(.{120,})$/gm, filigrane);

  // Réponses courtes après ":" dans les listes
  out = out.replace(/^(\s*[-*]\s*[^:\n]{3,60}:)\s*.+$/gm, `$1 ${"_".repeat(30)}`);

  return out;
}

/** Échelle de satisfaction continue 1 → 5 (le générateur produisait 1–2–4–5). */
export const ECHELLE_SATISFACTION = "1 ☐  2 ☐  3 ☐  4 ☐  5 ☐";

/* ================================================================== */
/* Détecteur de duplication (BLOC 3)                                   */
/* ================================================================== */

export interface DuplicationHit {
  beneficiaireA: string;
  beneficiaireB: string;
  extrait: string;
}

function normalizeBlock(s: string): string {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
}

/** Compare les champs libres entre bénéficiaires : bloc identique > 40 caractères = blocage. */
export function detectDuplication(docsParBeneficiaire: Record<string, string[]>): DuplicationHit[] {
  const names = Object.keys(docsParBeneficiaire);
  const blocksByName: Record<string, Set<string>> = {};
  for (const n of names) {
    const set = new Set<string>();
    for (const doc of docsParBeneficiaire[n]) {
      for (const para of doc.split(/\n{2,}|\n\|/)) {
        const norm = normalizeBlock(para);
        // on ignore les clauses contractuelles communes (mêmes pour tous par nature)
        if (norm.length > 40 && !/^(article|clause|conform|le présent|conditions|art\.)/.test(norm)) set.add(norm);
      }
    }
    blocksByName[n] = set;
  }
  const hits: DuplicationHit[] = [];
  for (let i = 0; i < names.length; i++) {
    for (let j = i + 1; j < names.length; j++) {
      for (const b of blocksByName[names[i]]) {
        if (blocksByName[names[j]].has(b)) {
          hits.push({ beneficiaireA: names[i], beneficiaireB: names[j], extrait: b.slice(0, 120) });
          break;
        }
      }
    }
  }
  return hits;
}

/* ================================================================== */
/* Pipeline principal                                                  */
/* ================================================================== */

export interface SanitizeOptions {
  titre: string;
  categorieAction?: "BC" | "AF" | "VAE" | "APP";
  antiFabrication?: boolean;
}

/** Applique l'ensemble des corrections à un markdown de document BDC. */
export function sanitizeBdcMarkdown(md: string, opts: SanitizeOptions): string {
  let out = md;

  // MESSAGE 17 — protection des libellés réglementaires et noms de dispositifs
  const { texte: protege, jetons } = protegerPhrases(out);
  out = protege;

  // BLOC 5 — droit abrogé
  for (const [re, rep] of MENTIONS_ABROGEES) out = out.replace(re, rep);

  // BLOC 6 — vocabulaire BC + clauses inadaptées (mot entier uniquement)
  if (!opts.categorieAction || opts.categorieAction === "BC") {
    for (const [re, rep] of BDC_VOCABULAIRE_INTERDIT) out = out.replace(re, rep);
    out = out
      .split("\n")
      .filter((line) => !CLAUSES_A_RETIRER.some((re) => re.test(line)))
      .join("\n");
  }

  out = restaurerPhrases(out, jetons);
  // MESSAGE 17 — réparation des substitutions abusives héritées des trames
  for (const [re, rep] of CORRECTIONS_SUBSTITUTION) out = out.replace(re, rep);


  // BLOC 3 — anti-fabrication
  if (opts.antiFabrication ?? isDocumentDeclaratif(opts.titre)) {
    out = blankDeclarativeContent(out);
  }

  // BLOC 9 — rendu
  for (const [re, rep] of FAUTES) out = out.replace(re, rep);
  out = repairSignatureBlocks(out);
  out = normalizeDates(out);
  out = stripMarkdownResidues(out);
  out = dedupeLines(out);

  // Champs de fusion non résolus → marqueur explicite (détecté par V15)
  out = out.replace(/«\s*»/g, "[à compléter]").replace(/\bXXXX?X?\b/g, "[à compléter]");

  return out;
}

/** Détecte les champs de fusion non substitués dans un rendu final (V15). */
export function findUnresolvedMergeFields(text: string): string[] {
  const hits = new Set<string>();
  const patterns = [/\{\{[^}]*\}\}/g, /\[à compléter\]/gi, /«\s*»/g, /\bXXXX\b/g, /\$\{[^}]*\}/g];
  for (const p of patterns) for (const m of text.match(p) || []) hits.add(m.trim());
  return [...hits];
}

/** Détecte le nom d'un organisme tiers dans un rendu (V16). */
const ORGANISMES_TIERS = ["NT CONSEILS", "BAKERY SOFYIA", "SELECT FORMATION", "IZIBUSINESS", "FORMAT SPHERE", "VISIONNAIRE INSTITUTE"];
export function findOrganismesTiers(text: string, raisonSociale: string): string[] {
  const self = raisonSociale.trim().toUpperCase();
  const up = text.toUpperCase();
  return ORGANISMES_TIERS.filter((o) => o !== self && up.includes(o));
}

/** Détecte le vocabulaire interdit en catégorie BC. */
export function findVocabulaireInterdit(text: string): string[] {
  const low = text.toLowerCase();
  return BDC_TERMES_BLOQUANTS.filter((t) => low.includes(t.toLowerCase()));
}

/** Détecte des mentions juridiques abrogées résiduelles. */
export function findMentionsAbrogees(text: string): string[] {
  const hits: string[] = [];
  const checks: Array<[RegExp, string]> = [
    [/\bCIF\b/, "CIF"], [/\bOPCA\b/, "OPCA"], [/\bFONGECIF\b/i, "FONGECIF"],
    [/\bOPACIF\b/i, "OPACIF"], [/\bDIF\b/, "DIF"], [/pôle\s*emploi/i, "Pôle emploi"],
    [/datadock/i, "Datadock"], [/plan de formation/i, "plan de formation"],
    [/attestation de (présence|fin de formation)/i, "attestation de présence/fin de formation"],
    [/R\.?\s*6322-/, "articles R6322-*"], [/organisme agréé/i, "organisme agréé"],
  ];
  for (const [re, label] of checks) if (re.test(text)) hits.push(label);
  return hits;
}

/** Contexte non utilisé directement mais exporté pour cohérence de signature. */
export type { BdcContext };
