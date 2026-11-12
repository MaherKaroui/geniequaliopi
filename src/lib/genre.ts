/**
 * Accords de genre et élisions pour les pièces générées.
 *
 * Le genre d'une personne de l'organisme (dirigeant, accompagnateur, référent) n'est
 * pas saisi : il est déduit de la civilité quand elle existe (`civiliteDirigeant`),
 * sinon d'une liste explicite de prénoms féminins et de terminaisons sans ambiguïté
 * (« -ette », « -elle », « -ienne », « -anne », « -ine » hors exceptions). À défaut,
 * le masculin générique est conservé.
 */
import type { OrganismeInfo } from "@/types/qualiopi";

const PRENOMS_FEMININS = new Set([
  "agnes", "aicha", "aissatou", "alexandra", "alice", "amandine", "amelie", "amina", "aminata", "anais", "angelique", "anne", "annie", "assia",
  "audrey", "aurelie", "awa", "barbara", "beatrice", "berivan", "bintou", "brigitte", "camille", "carole", "caroline", "catherine", "cecile", "celia",
  "celine", "chantal", "charlotte", "chloe", "christelle", "christine", "claire", "claudia", "clemence", "corinne", "cynthia", "delphine", "diane",
  "dominique", "dorra", "edith", "elena", "eliane", "elisa", "elisabeth", "elise", "elodie", "elsa", "emilie", "emma", "estelle", "eva", "eve",
  "fabienne", "fanny", "farida", "fatima", "fatou", "fatoumata", "florence", "francoise", "gaelle", "genevieve", "helene", "hanane", "hawa",
  "ines", "imane", "ingrid", "irene", "isabelle", "jade", "jeanne", "jennifer", "jessica", "josiane", "julia", "julie", "juliette", "justine",
  "kadiatou", "karima", "karine", "katia", "khadija", "laetitia", "laura", "laure", "laurence", "lea", "leila", "lina", "linda", "lisa",
  "louise", "lucie", "lydia", "magali", "malika", "manon", "margaux", "maria", "mariam", "marie", "marina", "marine", "marion", "martine",
  "mathilde", "maud", "mayssa", "melanie", "melissa", "mireille", "monique", "morgane", "muriel", "myriam", "nadia", "nadine", "nathalie",
  "nawal", "nawel", "nicole", "nora", "oceane", "ophelie", "pascale", "patricia", "pauline", "rachida", "rahma", "rokia", "rose", "sabrina",
  "salima", "samia", "samira", "sandra", "sandrine", "sarah", "severine", "sofia", "sonia", "sophie", "soraya", "stephanie", "sylvie", "valerie",
  "vanessa", "veronique", "virginie", "yasmina", "yasmine", "zoe", "zohra",
]);
/** Prénoms masculins à terminaison « féminine » : jamais féminisés. */
const PRENOMS_MASCULINS = new Set(["yassine", "amine", "hocine", "sofiane", "ilyes", "lionel", "noel", "michel", "daniel", "emmanuel", "gabriel", "raphael", "samuel", "joel", "abdelmalek", "jean", "yann", "fabien", "adrien", "julien", "bastien", "sebastien", "lucien", "christian", "sacha", "luca", "andrea", "nicolas", "jules", "slimane", "amine", "lamine", "hassine", "habib", "zine"]);

const sansAccent = (x: string) => x.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Vrai si le premier prénom de « Prénom NOM » est féminin ; null si on ne peut pas le dire. */
export function prenomFeminin(nomComplet?: string | null): boolean | null {
  const mots = (nomComplet || "").trim().split(/\s+/).filter(Boolean);
  // Prénom = premier mot qui n'est pas entièrement en capitales (« Juliette CASANOVA »), sinon le premier mot.
  const prenom = mots.find((m) => m !== m.toUpperCase()) || mots[0] || "";
  const p = sansAccent(prenom.split("-")[0]);
  if (!p) return null;
  if (PRENOMS_MASCULINS.has(p)) return false;
  if (PRENOMS_FEMININS.has(p)) return true;
  if (/(ette|elle|ienne|anne|ine)$/.test(p)) return true;
  return null;
}

/** La personne nommée est-elle une femme ? Civilité d'abord, sinon prénom ; masculin générique à défaut. */
export function estFemme(nom?: string | null, civilite?: string | null): boolean {
  if (civilite) return /^(mme|madame|mlle)/i.test(civilite.trim());
  return prenomFeminin(nom) === true;
}

/** Dirigeant(e) de l'organisme. */
export const dirigeanteFem = (o: Partial<OrganismeInfo>) => estFemme(o.dirigeant, o.civiliteDirigeant);

/** Accord : g(fem, "dirigeant", "dirigeante"). */
export const g = (fem: boolean, m: string, f: string) => (fem ? f : m);

/** « de » + mot : élision devant voyelle ou h muet (« d'ORAVYS », « d'accueillir »). */
export const de = (mot: string) => (/^[aeiouyàâäéèêëîïôöùûüh]/i.test((mot || "").trim()) ? `d'${mot.trim()}` : `de ${(mot || "").trim()}`);
/** « le / la » + mot : élision devant voyelle (« l'accompagnateur »). */
export const le = (mot: string) => (/^[aeiouyàâäéèêëîïôöùûüh]/i.test((mot || "").trim()) ? `l'${mot.trim()}` : `le ${(mot || "").trim()}`);


/** Dossier VAE seul (toutes les prestations de l'organisme sont de la VAE) : vocabulaire de l'accompagnement. */
export const dossierVAESeul = (o: Partial<OrganismeInfo>) => (o.typesActions || []).length > 0 && (o.typesActions || []).every((t) => t === "vae");
