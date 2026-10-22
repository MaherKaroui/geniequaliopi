/**
 * Moteur du dossier « bilan de compétences » au format NEXUS : planning des séances, chronologie
 * du parcours, variables et blocs dynamiques des gabarits (nexusTemplates.ts).
 *
 * Tout dérive des données saisies : organisme, formation (intitulé, durée, tarif, consultant,
 * modalité) et fiche de chaque bénéficiaire (dates de début et de fin, financeur, identité).
 * Les réponses, notes, scores et appréciations du bénéficiaire ne sont jamais produits : les
 * rubriques correspondantes restent à renseigner. Une pièce datée après le jour de l'édition est
 * rédigée au futur (« prévu le… ») et n'est pas signée.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { getBdcDomainProfile, type BdcDomainProfile } from "@/lib/templatesBDC";
import { bcCertifieAu, parseDateAny, regionFromCodePostal, tribunalFromCodePostal } from "../bdcModel";
import { estJourOuvrable } from "@/lib/moteurDates";
import { departementDuCodePostal, dreetsUrl, regionDe } from "./departements";

/* ------------------------------------------------------------------ */
/* Dates                                                               */
/* ------------------------------------------------------------------ */

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

export const fmt = (d?: Date | null) =>
  d ? `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}` : "";
export const fmtLong = (d?: Date | null) => (d ? `${d.getDate() === 1 ? "1er" : d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}` : "");

const jour0 = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const plusJours = (d: Date, n: number) => { const x = jour0(d); x.setDate(x.getDate() + n); return x; };
const plusMois = (d: Date, n: number) => { const x = jour0(d); x.setMonth(x.getMonth() + n); return x; };
/** Jour de semaine travaillé (lundi-vendredi, hors fériés). */
const travaille = (d: Date) => d.getDay() !== 6 && estJourOuvrable(d);
const versAvant = (d: Date) => { let x = jour0(d); for (let i = 0; i < 10 && !travaille(x); i++) x = plusJours(x, -1); return x; };
const versApres = (d: Date) => { let x = jour0(d); for (let i = 0; i < 10 && !travaille(x); i++) x = plusJours(x, 1); return x; };
const passe = (d: Date, ref: Date) => jour0(d).getTime() <= jour0(ref).getTime();

/* ------------------------------------------------------------------ */
/* Planning des séances (règle du dossier NEXUS)                        */
/* ------------------------------------------------------------------ */

export type Role = "PRELIM" | "TEST" | "COMP" | "MI" | "PISTES" | "EXTRA" | "ENQ" | "CONC1" | "CONC2";

export interface SeanceNexus {
  numero: number;
  phase: 1 | 2 | 3;
  date: Date;
  debut: string;
  fin: string;
  duree: number;
  /** Étapes du déroulé couvertes par la séance (plusieurs quand le bilan est court). */
  roles: Role[];
}

/** Heures par phase : 2 h de phase préliminaire, 4 h de conclusion, le reste en investigation. */
export function heuresPhases(total: number): { p1: number; p2: number; p3: number } {
  const t = Math.min(24, Math.max(3, Math.round(total)));
  const p1 = t >= 8 ? 2 : 1;
  const p3 = t >= 10 ? 4 : t >= 6 ? 2 : 1;
  return { p1, p2: Math.max(1, t - p1 - p3), p3 };
}

/** Durées des séances : séance 1 = phase préliminaire, investigation en séances de 3 h, conclusion en séances de 2 h. */
function dureesSeances(h: { p1: number; p2: number; p3: number }): Array<{ phase: 1 | 2 | 3; duree: number }> {
  const out: Array<{ phase: 1 | 2 | 3; duree: number }> = [{ phase: 1, duree: h.p1 }];
  const n = Math.max(1, Math.floor(h.p2 / 3));
  const inv = Array.from({ length: n }, () => 3);
  let reste = h.p2 - 3 * n;
  for (let i = n - 1; reste > 0; i = (i - 1 + n) % n, reste--) inv[i] += 1;
  inv.forEach((d) => out.push({ phase: 2, duree: d }));
  const nc = Math.max(1, Math.round(h.p3 / 2));
  for (let i = 0; i < nc; i++) out.push({ phase: 3, duree: i === nc - 1 ? h.p3 - 2 * (nc - 1) : 2 });
  return out;
}

/** Répartition des étapes du déroulé sur les séances d'investigation. */
function rolesInvestigation(n: number): Role[][] {
  if (n >= 5) return [["TEST"], ["COMP"], ["MI"], ["PISTES"], ...Array.from({ length: n - 5 }, () => ["EXTRA"] as Role[]), ["ENQ"]];
  if (n === 4) return [["TEST"], ["COMP"], ["MI"], ["PISTES", "ENQ"]];
  if (n === 3) return [["TEST", "COMP"], ["MI"], ["PISTES", "ENQ"]];
  if (n === 2) return [["TEST", "COMP"], ["MI", "PISTES", "ENQ"]];
  return [["TEST", "COMP", "MI", "PISTES", "ENQ"]];
}

const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;

/**
 * Planning d'un bénéficiaire : première séance à la date de début, dernière à la date de fin,
 * les autres réparties régulièrement sur des jours travaillés ; matin pour les séances impaires,
 * après-midi pour les paires. Un créneau déjà pris par un autre bénéficiaire du même consultant
 * bascule sur l'autre demi-journée, puis sur le jour travaillé suivant.
 */
export function planifier(debut: Date, fin: Date, total: number, prises: SeanceNexus[] = []): SeanceNexus[] {
  const h = heuresPhases(total);
  const durees = dureesSeances(h);
  const n = durees.length;
  const d0 = versApres(debut);
  let d1 = versAvant(fin);
  if (d1.getTime() < d0.getTime()) d1 = d0;
  const span = Math.round((d1.getTime() - d0.getTime()) / 86400000);
  const invRoles = rolesInvestigation(durees.filter((x) => x.phase === 2).length);
  const nbConc = durees.filter((x) => x.phase === 3).length;
  const conc: Role[][] = nbConc >= 2 ? [["CONC1"], ...Array.from({ length: nbConc - 2 }, () => ["CONC1"] as Role[]), ["CONC2"]] : [["CONC1", "CONC2"]];
  const roles: Role[][] = [["PRELIM"], ...invRoles, ...conc];
  const out: SeanceNexus[] = [];
  // Trois jours de séance dans la semaine (jour de la 1re séance, le lendemain, et deux jours après) :
  // les séances intermédiaires se calent sur le premier de ces jours, quand l'amplitude le permet.
  const w0 = d0.getDay() >= 1 && d0.getDay() <= 5 ? d0.getDay() : 1;
  const jours = new Set([w0, (w0 % 5) + 1, ((w0 + 2) % 5) + 1]);
  const surJourRetenu = (x: Date, limite: Date) => {
    let y = versApres(x);
    for (let g = 0; g < 7 && !jours.has(y.getDay()); g++) y = versApres(plusJours(y, 1));
    return y.getTime() < limite.getTime() ? y : versApres(x);
  };
  let precedente: Date | null = null;
  durees.forEach((s, i) => {
    let d = i === 0 ? d0 : i === n - 1 ? d1 : surJourRetenu(plusJours(d0, Math.round((i * span) / Math.max(1, n - 1))), d1);
    if (precedente && d.getTime() <= precedente.getTime()) d = versApres(plusJours(precedente, 1));
    let matin = (i + 1) % 2 === 1;
    const occupe = (date: Date, m: boolean) =>
      [...prises, ...out].some((p) => jour0(p.date).getTime() === jour0(date).getTime() && (parseInt(p.debut, 10) < 13) === m);
    for (let g = 0; g < 20 && occupe(d, matin); g++) {
      if (!occupe(d, !matin)) { matin = !matin; break; }
      d = versApres(plusJours(d, 1));
    }
    const h0 = matin ? 9 : 14;
    out.push({ numero: i + 1, phase: s.phase, date: d, debut: hh(h0), fin: hh(h0 + s.duree), duree: s.duree, roles: roles[i] || [] });
    precedente = d;
  });
  return out;
}

/* ------------------------------------------------------------------ */
/* Contenus des séances (dossier NEXUS)                                 */
/* ------------------------------------------------------------------ */

interface Profil {
  manager: boolean;
  generique: boolean;
  domaine: BdcDomainProfile;
  obj: [string, string, string, string];
  referentiel: string;
  enquetes: string;
}

export function profilNexus(f: FormationInfo): Profil {
  const domaine = getBdcDomainProfile(f);
  const manager = /manag|encadrement|chef d.?[ée]quipe/i.test(f.intitule || "");
  const generique = !!domaine.generique;
  const cible = manager
    ? "une fonction de manager de proximité (encadrement d'une équipe)"
    : generique ? "les pistes professionnelles envisagées" : `le métier de ${domaine.metier}`;
  const obj2 = manager
    ? "Identifier ses aptitudes, ses intérêts et ses motivations, notamment au regard des dix familles de compétences du référentiel managérial"
    : generique
      ? "Identifier ses aptitudes, ses intérêts et ses motivations au regard des pistes professionnelles envisagées"
      : `Identifier ses aptitudes, ses intérêts et ses motivations, notamment au regard des exigences du métier de ${domaine.metier}`;
  return {
    manager, generique, domaine,
    obj: [
      `Analyser ses compétences professionnelles et personnelles et repérer celles qui sont transférables vers ${cible}`,
      obj2,
      "Définir un projet professionnel réaliste et, le cas échéant, un projet de formation",
      "Élaborer un plan d'action daté, hiérarchisé et assorti des ressources mobilisables",
    ],
    referentiel: manager ? "référentiel des dix compétences managériales" : "référentiel des compétences du métier visé (fiches ROME)",
    enquetes: manager ? "auprès de managers en poste" : generique ? "auprès de professionnels en poste" : "auprès de professionnels du métier visé",
  };
}

function objetRole(r: Role, p: Profil): string {
  switch (r) {
    case "PRELIM": return "accueil, cadre déontologique et modalités du bilan, analyse de la demande, des attentes et du contexte, formalisation des objectifs individualisés et présentation des méthodes et des outils d'investigation (art. R6313-4, 1°)";
    case "TEST": return "restitution du test de personnalité, analyse du parcours professionnel et extra-professionnel";
    case "COMP": return "identification des compétences (verbes d'action, réalisations selon la méthode STAR) et portefeuille de compétences";
    case "MI": return "passation et restitution du questionnaire d'intérêts professionnels, valeurs et motivations, entretien intermédiaire de suivi";
    case "PISTES": return `${p.referentiel}, émergence et hiérarchisation des pistes professionnelles, recherche documentaire (fiches ROME)`;
    case "EXTRA": return "approfondissement des pistes : recherche documentaire, préparation et conduite des enquêtes métier";
    case "ENQ": return `bilan des enquêtes métier ${p.enquetes}, contraintes et ressources, comparaison multicritère des pistes, point sur les financements`;
    case "CONC1": return "appropriation des résultats détaillés, analyse des leviers et des freins, plan d'action daté (art. R6313-4, 3°)";
    case "CONC2": return "co-rédaction et remise du document de synthèse, satisfaction à chaud, programmation du suivi à 6 mois";
  }
}

const objetSeance = (s: SeanceNexus, p: Profil) => s.roles.map((r) => objetRole(r, p)).join(" ; ");
const PHASE_LIB = { 1: "Phase préliminaire", 2: "Phase d'investigation", 3: "Phase de conclusion" } as const;

/** Mots-clés et programme de chaque étape dans la fiche pédagogique (dossier NEXUS). */
function pedaRole(r: Role, p: Profil, v: Vars): { cles: string; puces: string[] } {
  switch (r) {
    case "PRELIM": return { cles: "ACCUEILLIR — ANALYSER LA DEMANDE — FIXER LES OBJECTIFS", puces: [
      `Présentation du cadre déontologique, des modalités du bilan et des droits du bénéficiaire ; confirmation du planning signé le ${v.D_PLANNING}.`,
      "Recueil et analyse de la demande, des attentes et du contexte.",
      "Formalisation des objectifs individualisés à partir de la fiche d'analyse du besoin.",
      `Présentation des méthodes et des outils d'investigation (test de personnalité, matrices d'évaluation, questionnaire d'intérêts, ${p.referentiel}, enquêtes métier) ; consigne de travail personnel (ligne de vie).`] };
    case "TEST": return { cles: "SE CONNAÎTRE — RETRACER — RELIER", puces: [
      `Restitution du test de personnalité ${v.TEST_PASSE ? "passé" : "prévu"} le ${v.D_TEST} (matrice 04).`,
      "Analyse du parcours professionnel et extra-professionnel à partir de la ligne de vie.",
      "Matrice 01 ou 02 selon les besoins : horizons de carrière, projection professionnelle."] };
    case "COMP": return { cles: "ANALYSER — IDENTIFIER — VALORISER", puces: [
      "Identification des compétences techniques et comportementales (matrice 05, verbes d'action).",
      "Analyse de trois réalisations selon la méthode STAR (matrice 08).",
      "Construction du portefeuille de compétences."] };
    case "MI": return { cles: "EXPLORER — DIAGNOSTIQUER — AJUSTER", puces: [
      "Passation et restitution du questionnaire d'intérêts professionnels (RIASEC, matrice 06).",
      "Valeurs et critères de choix, motivation au travail (matrices 07 et 03).",
      "**Entretien intermédiaire de suivi** : adéquation du déroulé aux attentes."] };
    case "PISTES": return { cles: "ÉVALUER — DÉVELOPPER — PRÉPARER", puces: [
      `Auto-évaluation sur le ${p.referentiel} et confrontation aux situations vécues.`,
      `Émergence de deux ou trois pistes ; recherche documentaire sur les fiches ROME${p.manager ? " (M1503, M1302, D1301…)" : ""}, RNCP et le marché de l'emploi.`,
      `Préparation des enquêtes métier ${p.enquetes} (matrice 11).`] };
    case "EXTRA": return { cles: "EXPLORER — ENQUÊTER — APPROFONDIR", puces: [
      "Reprise des enquêtes métier engagées et des recherches documentaires.",
      "Approfondissement des pistes retenues : conditions d'exercice, formations, financements."] };
    case "ENQ": return { cles: "CONFRONTER — HIÉRARCHISER — SÉCURISER", puces: [
      "Bilan des enquêtes métier conduites entre les séances (matrice 11).",
      "Contraintes et ressources de la transition (matrice 10) ; comparaison multicritère des pistes (matrice 12).",
      "Point sur les démarches concrètes et les dispositifs de financement de la suite du projet."] };
    case "CONC1": return { cles: "STRUCTURER — PLANIFIER — FINANCER", puces: [
      "Appropriation des résultats détaillés de la phase d'investigation.",
      "Analyse des leviers et des freins du projet.",
      "Élaboration du plan d'action daté et des financements mobilisables ; présentation de la trame de synthèse."] };
    case "CONC2": return { cles: "SYNTHÉTISER — RESTITUER — SUIVRE", puces: [
      "Co-rédaction et remise du document de synthèse, relu avec la grille de relecture.",
      "Évaluation de l'atteinte des objectifs.",
      `Recueil des choix de conservation et de transmission ; programmation du suivi à six mois (${v.D_SUIVI}).`] };
  }
}

/* ------------------------------------------------------------------ */
/* Contexte d'un bénéficiaire                                           */
/* ------------------------------------------------------------------ */

export type CleFinancement = "personnel" | "CPF" | "employeur" | "OPCO" | "France Travail" | "autre";

export function cleFinancement(f?: string): CleFinancement {
  const v = `${f || ""}`.toLowerCase();
  if (/cpf|compte/.test(v)) return "CPF";
  if (/opco/.test(v)) return "OPCO";
  if (/entreprise|employeur|plan/.test(v)) return "employeur";
  if (/france travail|p[ôo]le emploi/.test(v)) return "France Travail";
  if (!v || /perso|particulier|autofin/.test(v)) return "personnel";
  return "autre";
}

export interface BenNexus {
  s: StagiaireInfo;
  /** null = trame vierge (aucun bénéficiaire nommé) */
  nomme: boolean;
  seances: SeanceNexus[];
  financement: CleFinancement;
  dates: {
    prealable: Date; convention: Date; planning: Date; retractation: Date; convocation: Date; test: Date;
    debut: Date; fin: Date; suivi: Date; relanceSuivi: Date; conservation: Date;
  };
}

/** Chronologie du dossier NEXUS, recalculée à partir de la première séance. */
function chronologie(seances: SeanceNexus[]) {
  const debut = seances[0].date;
  const fin = seances[seances.length - 1].date;
  const convention = versAvant(plusJours(debut, -21));
  const retractation = plusJours(convention, 14);
  const prealable = versAvant(plusJours(convention, -8));
  let planning = versAvant(plusJours(convention, 6));
  if (planning.getTime() >= retractation.getTime()) planning = versAvant(plusJours(retractation, -1));
  const convocation = versApres(plusJours(retractation, 1));
  let test = versApres(plusJours(convocation, 1));
  if (test.getTime() >= debut.getTime()) test = convocation;
  const suivi = versApres(plusMois(fin, 6));
  return {
    prealable, convention, planning, retractation, convocation, test, debut, fin, suivi,
    relanceSuivi: versAvant(plusJours(suivi, -14)),
    conservation: new Date(fin.getFullYear() + 3, fin.getMonth(), fin.getDate()),
  };
}

export function construireBeneficiaires(org: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], financeurEffectif: (s: StagiaireInfo) => string): BenNexus[] {
  const total = dureeHeures(f);
  const prises: SeanceNexus[] = [];
  const liste = stagiaires.length ? stagiaires : [{ civilite: "", nom: "", prenom: "", email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "" } as StagiaireInfo];
  return liste.map((s) => {
    const debut = parseDateAny(s.dateDebutFormation) || parseDateAny(f.dateDebut) || parseDateAny(org.dateMaj) || new Date();
    const finSaisie = parseDateAny(s.dateFinFormation) || parseDateAny(f.dateFin) || plusMois(debut, 2);
    const seances = planifier(debut, finSaisie.getTime() < debut.getTime() ? debut : finSaisie, total, prises);
    prises.push(...seances);
    return { s, nomme: !!(s.nom || s.prenom), seances, financement: cleFinancement(financeurEffectif(s)), dates: chronologie(seances) };
  });
}

export function dureeHeures(f: FormationInfo): number {
  const n = parseFloat(`${f.duree || ""}`.replace(",", ".").match(/\d+(?:\.\d+)?/)?.[0] || "");
  return Math.min(24, Math.max(3, Math.round(n || 24)));
}

/* ------------------------------------------------------------------ */
/* Variables                                                           */
/* ------------------------------------------------------------------ */

export type Vars = Record<string, string | boolean>;

const MAJ = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const MIN = (s: string) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);
const pluriel = (n: number, mot: string) => `${n} ${mot}${n > 1 ? "s" : ""}`;

function prixNum(f: FormationInfo, s?: StagiaireInfo): number {
  const brut = `${s?.tarifFormation || f.tarif || ""}`;
  const m = brut.replace(/\s/g, "").match(/(\d+(?:[.,]\d{1,2})?)/);
  return m ? parseFloat(m[1].replace(",", ".")) : 0;
}
const fmtPrix = (n: number) => `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/[\u00a0\u202f]/g, " ")} €`;

function nomExterne(rq: string): string {
  return /extern/i.test(rq) ? rq.replace(/\(\s*externe\s*\)/i, "").replace(/\s{2,}/g, " ").trim() : "";
}

function listeFr(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
}

function categoriesCertif(txt: string): string {
  const cats = `${txt || ""}`.split(/[,;\n]+/).map((x) => x.trim()).filter(Boolean).map((x) => `« ${MIN(x)} »`);
  if (!cats.length) return "";
  return cats.length === 1 ? `de la catégorie ${cats[0]}` : `des catégories ${listeFr(cats)}`;
}

export interface ContexteNexus {
  org: OrganismeInfo;
  f: FormationInfo;
  bens: BenNexus[];
  profil: Profil;
  arrete: Date;
  base: Vars;
}

export function contexteNexus(org: OrganismeInfo, f: FormationInfo, bens: BenNexus[], arrete = new Date()): ContexteNexus {
  const profil = profilNexus(f);
  const dirigeant = (org.dirigeant || "").trim();
  const consultant = (f.formateur || org.responsablePedagogique || dirigeant).trim();
  const refHandicap = (org.referentHandicap || dirigeant).trim();
  const refAdmin = (org.poleAdministratif || dirigeant).trim();
  const refCommercial = (org.relationEntreprises || dirigeant).trim();
  const externe = nomExterne(org.referentQualite || "");
  const refQualiteInterne = externe ? dirigeant : (org.referentQualite || dirigeant).trim();
  const memePersonne = [consultant, refHandicap, refAdmin, refQualiteInterne].every((x) => x === dirigeant);
  const cp = org.codePostal || "";
  const region = regionFromCodePostal(cp);
  const dept = departementDuCodePostal(cp);
  const majDate = parseDateAny(org.dateMaj);
  const certifieBC = bcCertifieAu(org, arrete);
  const num = (org.numeroCertificatQualiopi || "").trim();
  const obt = parseDateAny(org.dateObtentionQualiopi);
  const finCert = parseDateAny(org.dateFinValiditeQualiopi);
  const cats = categoriesCertif(org.certifications);
  const situationCertif = num
    ? `${org.nom} est certifié Qualiopi${org.organismeCertificateur ? ` par ${org.organismeCertificateur}` : ""} (certificat n° ${num}${obt ? ` du ${fmt(obt)}` : ""}${finCert ? `, valable jusqu'au ${fmt(finCert)}` : ""})${cats ? ` au titre ${cats}` : ""}.${certifieBC ? "" : " La catégorie « bilans de compétences » fait l'objet d'une demande d'extension."}`
    : `${org.nom} n'est pas encore certifié Qualiopi : la catégorie « bilans de compétences » fait partie de la demande de certification.`;
  const fonctions = [
    consultant === dirigeant ? "Représentant légal" : "",
    "Consultant en bilan de compétences",
    refHandicap === consultant ? "Référent handicap" : "",
    refQualiteInterne === consultant ? "Référent qualité" : "",
    refAdmin === consultant ? "Référent administratif" : "",
    consultant === dirigeant ? "Référent veille" : "",
  ].filter(Boolean);
  const termines = bens.filter((b) => b.nomme && passe(b.dates.fin, arrete)).length;
  const demarres = bens.filter((b) => b.nomme && passe(b.dates.debut, arrete)).length;
  const nommes = bens.filter((b) => b.nomme).length;
  const y = arrete.getFullYear();
  const v = String(org.version || "1").replace(/[^0-9]/g, "") || "1";
  const siretDigits = (org.siret || "").replace(/\D/g, "");
  const base: Vars = {
    ORG: org.nom || "", ORG_EMAIL: org.email || "", ORG_TEL: org.telephone || "",
    SIRET: org.siret || "", SIREN: siretDigits.slice(0, 9), NDA: org.nda || "",
    ORG_ADRESSE: org.adresse || "", ORG_CP: cp, ORG_VILLE: org.ville || "",
    ORG_ADRESSE_COMPLETE: [org.adresse, `${cp} ${org.ville || ""}`.trim()].filter(Boolean).join(", "),
    TRIBUNAL: tribunalFromCodePostal(cp), REGION: region, REGION_DE: regionDe(region), DREETS_URL: dreetsUrl(region),
    DEPT_DU: dept?.du || "du département du siège", DEPT_NUM: dept?.numero || cp.slice(0, 2),
    DIRIGEANT: dirigeant, CONSULTANT: consultant, REF_HANDICAP: refHandicap, REF_ADMIN: refAdmin, REF_COMMERCIAL: refCommercial,
    REF_QUALITE_EXTERNE: externe || "prestataire qualité externe", REF_QUALITE_INTERNE: refQualiteInterne,
    REF_QUALITE_LIGNE: externe ? `${refQualiteInterne}, avec l'appui externe de ${externe}` : refQualiteInterne,
    MEME_PERSONNE: memePersonne,
    CONSULTANT_QUALITES: consultant === dirigeant ? "consultant en bilan de compétences et représentant légal" : "consultant en bilan de compétences",
    DIRIGEANT_QUALITES: consultant === dirigeant ? "Représentant légal, consultant en bilan de compétences" : "Représentant légal",
    FONCTIONS_CONSULTANT: fonctions.join(" · "),
    REF_HANDICAP_MEME: refHandicap === consultant ? ", également référent handicap" : ` ; référent handicap : ${refHandicap}`,
    VISIO: "Google Meet", VERSION: v, DATE_MAJ: fmt(majDate), DATE_MAJ_LONG: fmtLong(majDate),
    INTITULE: (f.intitule || "Bilan de compétences").trim(),
    CERT_NUM: num, CERTIFIE_BC: certifieBC, SITUATION_CERTIF: situationCertif,
    TYPE_AUDIT_LIB: num ? (certifieBC ? "de surveillance" : "d'extension") : "initial",
    SITUATION_BILANS: nommes ? `${pluriel(nommes, "bilan")} de compétences ${nommes > 1 ? "sont engagés" : "est engagé"} à ce jour (${termines} terminé${termines > 1 ? "s" : ""}, ${nommes - termines} en cours ou à venir).` : "Aucun bilan n'est encore engagé à ce jour.",
    NB_BEN_LIB: pluriel(nommes, "bénéficiaire"),
    EFFECTIF_LIB: `${pluriel(nommes, "bénéficiaire")} : ${termines} parcours terminé${termines > 1 ? "s" : ""}, ${demarres - termines} en cours, ${nommes - demarres} à venir`,
    D_ARRETE: fmt(arrete), DEBUT_VEILLE: fmt(majDate) || fmt(arrete),
    FIN_ANNEE: `31/12/${y}`, FIN_ANNEE_SUIV: `31/12/${y + 1}`, MI_ANNEE_SUIV: `30/06/${y + 1}`,
    ANNEE_PDC: `${y}-${y + 1}`, PDC_ECHEANCE_1: `4e trimestre ${y}`, PDC_ECHEANCE_2: `1er trimestre ${y + 1}`, PDC_ECHEANCE_3: `1er semestre ${y + 1}`,
    MANAGER: profil.manager,
    OBJ1: profil.obj[0], OBJ2: profil.obj[1], OBJ3: profil.obj[2], OBJ4: profil.obj[3],
    REFERENTIEL_PROFIL: profil.referentiel, REFERENTIEL_PROFIL_MAJ: MAJ(profil.referentiel), ENQUETES_AUPRES: profil.enquetes,
    OUTIL_PROFIL: profil.manager ? "référentiel des compétences managériales, " : "",
    OUTIL_PROFIL_LIGNE: profil.manager ? "Référentiel des dix compétences managériales ; fiches ROME ; RNCP" : "Fiches ROME ; répertoires RNCP et RS",
    OUTIL_PROFIL_UTILITE: profil.manager ? "Écarts avec une fonction d'encadrement ; pistes et formations" : "Pistes professionnelles et formations",
  };
  return { org, f, bens, profil, arrete, base };
}

const LIB_FIN: Record<CleFinancement, string> = {
  personnel: "Financement personnel du bénéficiaire",
  CPF: "Compte personnel de formation du bénéficiaire (Mon Compte Formation)",
  employeur: "Plan de développement des compétences de l'employeur",
  OPCO: "Employeur, avec prise en charge de son OPCO",
  "France Travail": "Compte personnel de formation, abondement éventuel de France Travail",
  autre: "Financement indiqué à la convention",
};

/** Variables d'un bénéficiaire (ou de la trame vierge quand `b` est le modèle sans nom). */
export function varsBeneficiaire(ctx: ContexteNexus, b: BenNexus): Vars {
  const { org, f, arrete } = ctx;
  const s = b.s;
  const d = b.dates;
  const S = b.seances;
  const nom = `${s.prenom || ""} ${(s.nom || "").toUpperCase()}`.trim();
  const naiss = parseDateAny(s.dateNaissance);
  const adresse = [s.adresse, [s.codePostal, s.commune].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const ent = (s.entreprise || "").trim();
  const demandeur = /demandeur|sans emploi|ch[ôo]m/i.test(`${ent} ${s.poste || ""}`);
  const situation = demandeur ? "demandeur" : ent ? "salarie" : "";
  const fin = b.financement;
  const tripartite = fin === "employeur" || fin === "OPCO";
  const prix = prixNum(f, s);
  const prixTxt = prix ? fmtPrix(prix) : "";
  const tva = org.regimeTva === "assujetti";
  const prixLigne = prix
    ? (tva ? `${prixTxt} HT, TVA au taux en vigueur en sus` : `${prixTxt} net de taxe — exonération de TVA en application de l'article 261-4-4°a du Code général des impôts`)
    : "Prix indiqué au devis personnalisé remis au bénéficiaire, net de taxe";
  const findRole = (r: Role) => S.find((x) => x.roles.includes(r)) || S[Math.min(1, S.length - 1)];
  const sMi = findRole("MI"), sPistes = findRole("PISTES"), sEnq = findRole("ENQ"), sComp = findRole("COMP");
  const sRest = S.find((x) => x.phase === 3) || S[S.length - 1];
  const p1 = S.filter((x) => x.phase === 1), p2 = S.filter((x) => x.phase === 2), p3 = S.filter((x) => x.phase === 3);
  const h = heuresPhases(S.reduce((a, x) => a + x.duree, 0));
  const listeSeances = (xs: SeanceNexus[], court: boolean) => {
    if (!xs.length) return "";
    if (xs.length === 1) return `${court ? "séance" : "Séance"} ${xs[0].numero}`;
    if (court) return xs.length === 2 ? `séances ${xs[0].numero} et ${xs[1].numero}` : `séances ${xs[0].numero} à ${xs[xs.length - 1].numero}`;
    return `Séances ${xs.map((x) => x.numero).join(", ")}`;
  };
  const jours = [...new Set(S.map((x) => x.date.getDay()))].sort().map((j) => JOURS[j]);
  const realisees = S.filter((x) => passe(x.date, arrete)).length;
  const termine = passe(d.fin, arrete);
  const benEmployeur = ent ? `${ent}${s.siretEntreprise ? ` (SIRET ${s.siretEntreprise})` : ""}` : "l'employeur";
  const exps = (s.experiences || []).filter((e) => (e.poste || e.employeur || "").trim())
    .map((e) => `${e.poste || ""}${e.employeur ? ` — ${e.employeur}` : ""}${e.debut ? ` (${e.debut}${e.fin ? ` – ${e.fin}` : " – en cours"})` : ""}`);
  const conv: Record<"perso" | "cpf" | "tri", { titre: string; sous: string; nature: string; nom: string; annexe: string; signee: string }> = {
    perso: {
      titre: "CONVENTION DE RÉALISATION",
      sous: "Convention conclue entre un organisme et une personne physique qui finance elle-même sa prestation (art. L6353-3 à L6353-7 du Code du travail)",
      nature: fin === "personnel"
        ? "Contrat bilatéral. La démarche est engagée à l'initiative du bénéficiaire, qui la finance personnellement. Aucun employeur n'est partie au contrat : il n'y a donc pas lieu d'établir une convention tripartite au sens de l'article R6313-8 du Code du travail"
        : `Contrat bilatéral. La démarche est engagée à l'initiative du bénéficiaire (${MIN(LIB_FIN[fin])}). Aucun employeur n'est partie au contrat : il n'y a donc pas lieu d'établir une convention tripartite au sens de l'article R6313-8 du Code du travail`,
      nom: "convention de réalisation", annexe: "à la convention de réalisation", signee: "de la convention de réalisation signée",
    },
    cpf: {
      titre: "CONTRAT DE PRESTATION",
      sous: "Contrat conclu entre un organisme et le titulaire d'un compte personnel de formation, qui mobilise ses droits sur la plateforme Mon Compte Formation (art. L6323-1 et suivants, L6353-3 à L6353-7 du Code du travail)",
      nature: "Contrat bilatéral. La démarche est engagée à l'initiative du bénéficiaire, qui mobilise son compte personnel de formation ; l'inscription et la validation de la commande s'effectuent sur Mon Compte Formation, selon les conditions générales d'utilisation de la plateforme. Aucun employeur n'est partie au contrat",
      nom: "contrat de prestation", annexe: "au contrat de prestation", signee: "du contrat de prestation signé",
    },
    tri: {
      titre: "CONVENTION TRIPARTITE",
      sous: "Convention conclue entre l'organisme prestataire, l'employeur et le salarié bénéficiaire (art. L6313-4 et R6313-8 du Code du travail)",
      nature: `Convention tripartite. Le bilan est réalisé à l'initiative de l'employeur ${benEmployeur}, avec le consentement du salarié, qui peut le refuser sans que ce refus constitue une faute (art. L6313-4). L'employeur ne reçoit aucun résultat sans l'accord écrit du bénéficiaire`,
      nom: "convention tripartite", annexe: "à la convention tripartite", signee: "de la convention tripartite signée",
    },
  };
  const c = tripartite ? conv.tri : fin === "CPF" ? conv.cpf : conv.perso;
  const vars: Vars = {
    ...ctx.base,
    BEN: b.nomme ? nom : "",
    BEN_INITIALES: b.nomme ? `${(s.prenom || "").charAt(0).toUpperCase()}. ${(s.nom || "").charAt(0).toUpperCase()}.` : "",
    BEN_APPEL: !b.nomme ? "Madame, Monsieur" : s.civilite === "M." ? `Monsieur ${(s.nom || "").toUpperCase()}` : s.civilite === "Mme" ? `Madame ${(s.nom || "").toUpperCase()}` : nom,
    BEN_NAISS: fmt(naiss), BEN_NAISS_TIRET: naiss ? ` — date de naissance : ${fmt(naiss)}` : "",
    BEN_NAISS_VIRGULE: naiss ? `, date de naissance : ${fmt(naiss)}` : "", BEN_NAISS_LIGNE: naiss ? ` ⏎ Date de naissance : ${fmt(naiss)}` : "",
    BEN_ADRESSE: adresse, BEN_ADRESSE_LIGNE: adresse ? ` ⏎ ${adresse}` : "",
    BEN_TEL: s.telephone || "", BEN_TEL_LIGNE: s.telephone ? ` ⏎ Téléphone : ${s.telephone}` : "",
    BEN_EMAIL: s.email || "", BEN_EMAIL_LIGNE: s.email ? ` ⏎ Courriel : ${s.email}` : "",
    BEN_SITUATION: situation === "salarie" ? "Salarié(e)" : situation === "demandeur" ? "Demandeur d'emploi" : "",
    BEN_POSTE: [s.poste, ent && !demandeur ? ent : ""].filter(Boolean).join(" — "),
    BEN_EXPERIENCES: exps.join(" ; "),
    BEN_CARACTERISTIQUES: [situation === "salarie" ? "Salarié(e)" : situation === "demandeur" ? "Demandeur d'emploi" : "", s.poste || "", s.diplome || ""].filter(Boolean).join(" ; "),
    BEN_EMPLOYEUR: benEmployeur,
    TRIPARTITE: tripartite, FINANCEMENT_LIB: LIB_FIN[fin], FINANCEMENT_LIB_MIN: MIN(LIB_FIN[fin]),
    FINANCEUR_OPCO_LIGNE: fin === "OPCO" ? " ⏎ Prise en charge sollicitée auprès de l'OPCO de l'employeur" : "",
    CONVENTION_TITRE: c.titre, CONVENTION_SOUS_TITRE: c.sous, CONVENTION_NATURE: c.nature,
    CONVENTION_NOM: c.nom, CONVENTION_NOM_MAJ: MAJ(c.nom), CONVENTION_ANNEXE: c.annexe, CONVENTION_SIGNEE: c.signee,
    NB_EXEMPLAIRES: tripartite ? "trois" : "deux",
    PRIX: prixTxt, PRIX_CONNU: !!prix, PRIX_LIGNE: prixLigne, PRIX_PARENTHESE: prix ? ` (${prixTxt} ${tva ? "HT" : "net de taxe"})` : "",
    FINANCEUR_ARTICLE9: ({
      personnel: "Financement personnel du bénéficiaire. Aucun organisme tiers n'intervient dans le financement.",
      CPF: "Compte personnel de formation du bénéficiaire, mobilisé sur Mon Compte Formation ; le reste à charge éventuel est affiché sur la plateforme avant validation.",
      employeur: `L'employeur ${benEmployeur}, sur son plan de développement des compétences.`,
      OPCO: `L'employeur ${benEmployeur}, avec la prise en charge de son OPCO ; à défaut d'accord de prise en charge avant la première séance, la prestation est facturée à l'employeur.`,
      "France Travail": "Compte personnel de formation du bénéficiaire, avec l'abondement éventuel de France Travail.",
      autre: "Financement indiqué à la présente convention.",
    } as Record<CleFinancement, string>)[fin],
    MONTANT_DU_BEN: tripartite ? "Aucun : la prestation est réglée par l'employeur" : fin === "CPF" || fin === "France Travail" ? "Aucun, hors reste à charge éventuel affiché sur Mon Compte Formation" : prix ? `${prixTxt} ${tva ? "HT" : "net de taxe"}` : "Le prix indiqué au devis personnalisé",
    PAIEMENT_LIGNE: tripartite
      ? (fin === "OPCO" ? "Facture adressée à l'OPCO en cas de subrogation, à l'employeur à défaut, à l'issue de la prestation." : "Facture adressée à l'employeur à l'issue de la prestation.")
      : fin === "CPF" || fin === "France Travail" ? "Règlement par la Caisse des dépôts et consignations selon les conditions générales d'utilisation de Mon Compte Formation."
        : "Le solde est échelonné au fur et à mesure du déroulement de la prestation (art. L6353-6 du Code du travail), sur facture.",
    CERTIF_REMIS: ({
      personnel: "Il est remis au bénéficiaire, qui a financé personnellement la prestation.",
      CPF: "Il est remis au bénéficiaire et déposé sur Mon Compte Formation lors de la déclaration de fin de prestation.",
      employeur: "Il est remis au bénéficiaire et adressé à l'employeur financeur.",
      OPCO: "Il est remis au bénéficiaire et adressé à l'employeur ainsi qu'à l'OPCO financeur.",
      "France Travail": "Il est remis au bénéficiaire et déposé sur Mon Compte Formation lors de la déclaration de fin de prestation.",
      autre: "Il est remis au bénéficiaire et, le cas échéant, au financeur.",
    } as Record<CleFinancement, string>)[fin],
    CADRE_ADMIN_FINANCEMENT: ({
      personnel: "financement personnel, aucun dossier de prise en charge à constituer.",
      CPF: "inscription et validation sur Mon Compte Formation au moins 11 jours ouvrés avant la première séance.",
      employeur: "convention tripartite à faire signer par l'employeur avant la première séance.",
      OPCO: "demande de prise en charge à déposer par l'employeur auprès de son OPCO avant la première séance.",
      "France Travail": "inscription sur Mon Compte Formation et demande d'abondement avant la première séance.",
      autre: "pièces de financement à réunir avant la première séance.",
    } as Record<CleFinancement, string>)[fin],
    MODALITE_LIB: modaliteLib(f), DISTANCIEL: modaliteCle(f) !== "presentiel",
    LIEU_PHRASE: modaliteCle(f) === "presentiel" ? `Locaux de ${org.nom}, ${ctx.base.ORG_ADRESSE_COMPLETE}` : "Visioconférence Google Meet (lien adressé avec la convocation et rappelé avant chaque séance)",
    LIEU_COURT: modaliteCle(f) === "presentiel" ? `${ctx.base.ORG_ADRESSE_COMPLETE}` : "Google Meet (version gratuite, accessible avec un compte Google)",
    MODALITES_GENERALES: modaliteCle(f) === "presentiel"
      ? "réalisée en présentiel dans les locaux de l'organisme ou, à la demande du bénéficiaire, en visioconférence."
      : "réalisée en distanciel synchrone (visioconférence) ou, à la demande du bénéficiaire, en présentiel.",
    DUREE: String(S.reduce((a, x) => a + x.duree, 0)), NB_SEANCES: String(S.length),
    H_P1: String(h.p1), H_P2: String(h.p2), H_P3: String(h.p3),
    D_PREALABLE: fmt(d.prealable), D_CONVENTION: fmt(d.convention), D_PLANNING: fmt(d.planning), D_RETRACTATION: fmt(d.retractation),
    D_CONVOCATION: fmt(d.convocation), D_TEST: fmt(d.test), D_FIN: fmt(d.fin), D_FIN_LONG: fmtLong(d.fin), D_SUIVI: fmt(d.suivi),
    D_RELANCE_SUIVI: fmt(d.relanceSuivi), D_CONSERVATION: fmt(d.conservation),
    S1: fmt(S[0].date), S1_LONG: fmtLong(S[0].date), S2: fmt((S[1] || S[0]).date),
    S_COMP: fmt(sComp.date), S_COMP_NUM: String(sComp.numero), S_MI: fmt(sMi.date), S_MI_NUM: String(sMi.numero),
    S_PISTES: fmt(sPistes.date), S_ENQ: fmt(sEnq.date), S_ENQ_NUM: String(sEnq.numero), S_RESTITUTION: fmt(sRest.date),
    SEANCES_ENQ_LIB: sPistes.numero === sEnq.numero ? `séance ${sEnq.numero}` : `séances ${sPistes.numero} et ${sEnq.numero}`,
    SEANCES_P1: listeSeances(p1, true), SEANCES_P2: listeSeances(p2, true), SEANCES_P3: listeSeances(p3, true),
    SEANCES_P1_LISTE: listeSeances(p1, false), SEANCES_P2_LISTE: listeSeances(p2, false), SEANCES_P3_LISTE: listeSeances(p3, false),
    JOURS_SEANCES: jours.length ? `le ${listeFr(jours)}` : "",
    TERMINE: termine, SUIVI_ECHU: passe(d.suivi, arrete), TEST_PASSE: passe(d.test, arrete), MI_PASSE: passe(sMi.date, arrete),
    SUIVI_REALISATION: termine
      ? `Prestation terminée. Les ${S.length} séances ont été réalisées du ${fmt(S[0].date)} au ${fmt(d.fin)} et émargées par le bénéficiaire et le consultant (feuilles d'émargement, indicateur 11).`
      : realisees
        ? `Prestation en cours au ${fmt(arrete)} : ${realisees} séance${realisees > 1 ? "s" : ""} sur ${S.length} réalisée${realisees > 1 ? "s" : ""} et émargée${realisees > 1 ? "s" : ""} ; les suivantes sont programmées au planning signé le ${fmt(d.planning)}.`
        : `Prestation programmée : la première séance a lieu le ${fmt(S[0].date)}. Aucune séance n'est réalisée au ${fmt(arrete)} ; les feuilles sont émargées au fil des séances.`,
  };
  return vars;
}

export function modaliteCle(f: FormationInfo): "presentiel" | "distanciel" | "mixte" {
  const m = `${f.modalites || ""} ${f.lieu || ""}`.toLowerCase();
  if (/mixte|hybride|blended/.test(m)) return "mixte";
  if (/pr[ée]sentiel/.test(m) && !/distan|visio|meet|zoom|teams/.test(m)) return "presentiel";
  return "distanciel";
}
const modaliteLib = (f: FormationInfo) => ({ distanciel: "Distanciel synchrone (visioconférence)", presentiel: "Présentiel", mixte: "Mixte (présentiel et visioconférence)" })[modaliteCle(f)];

/* ------------------------------------------------------------------ */
/* Blocs dynamiques                                                    */
/* ------------------------------------------------------------------ */

const tableau = (entetes: string[], lignes: string[][]) =>
  [`| ${entetes.join(" | ")} |`, `|${entetes.map(() => "---|").join("")}`, ...lignes.map((l) => `| ${l.join(" | ")} |`)].join("\n");

export function blocs(ctx: ContexteNexus, b: BenNexus, v: Vars): Record<string, string> {
  const p = ctx.profil;
  const S = b.seances;
  const total = Number(v.DUREE);
  const arrete = ctx.arrete;
  const presentiel = modaliteCle(ctx.f) === "presentiel";
  const modCourt = presentiel ? "Présentiel" : "Distanciel synchrone";
  const lieu = presentiel ? String(v.ORG_ADRESSE_COMPLETE) : "Visioconférence";
  let cumul = 0;
  const cumuls = S.map((s) => (cumul += s.duree));
  const h = { 1: v.H_P1, 2: v.H_P2, 3: v.H_P3 } as Record<number, string | boolean>;
  const parPhase = (ph: 1 | 2 | 3) => S.filter((s) => s.phase === ph);
  const pct = (n: number) => `${(Math.round((n / total) * 1000) / 10).toString().replace(".", ",")} %`;
  const nommes = ctx.bens.filter((x) => x.nomme);
  const termines = nommes.filter((x) => passe(x.dates.fin, arrete));
  const demarres = nommes.filter((x) => passe(x.dates.debut, arrete));
  const echus = nommes.filter((x) => passe(x.dates.suivi, arrete));
  const prochainSuivi = nommes.map((x) => x.dates.suivi).filter((d) => !passe(d, arrete)).sort((a, c) => a.getTime() - c.getTime())[0];
  const veille = (code: string, x: { intitule: string; source: string; lien: string; date: string; exploitation: string }) =>
    `| ${code} | ${x.date} | ${x.source} (${x.lien.replace(/^https?:\/\//, "")}) | ${x.intitule} | ${x.exploitation} | Information intégrée aux ressources et aux entretiens des parcours concernés | ☒ Soldée |`;
  const avecNom = (x: BenNexus) => `${x.s.prenom} ${(x.s.nom || "").toUpperCase()}`.trim();

  return {
    OBJECTIFS: p.obj.map((o, i) => `**${i + 1}.**${o}`).join("\n\n"),
    CALENDRIER_PLANNING: tableau(["Séance", "Phase", "Date", "Horaires", "Durée", "Modalité", "Objet"], [
      ...S.map((s) => [String(s.numero), `${s.phase} — ${PHASE_LIB[s.phase]}`, fmt(s.date), `${s.debut} – ${s.fin}`, `${s.duree} h`, presentiel ? "Présentiel" : "Google Meet", PHASE_LIB[s.phase]]),
      ["Total", "", "", "", `${total} h`, "", ""],
    ]),
    REPARTITION_PHASES: tableau(["Phase", "Séances", "Durée", "Part du volume total"], [
      ...([1, 2, 3] as const).map((ph) => [`${ph} — ${PHASE_LIB[ph]}`, String(v[`SEANCES_P${ph}_LISTE`]).replace(/^Séances (\d+), .*, (\d+)$/, "Séances $1 à $2").replace(/^Séances (\d+), (\d+)$/, "Séances $1 et $2"), `${h[ph]} h`, pct(Number(h[ph]))]),
      ["Total", `${S.length} séances`, `${total} h`, "100 %"],
    ]),
    SEANCES_PROGRAMME: tableau(["Séance", "Date", "Durée", "Phase", "Objet"], [
      ...S.map((s) => [String(s.numero), fmt(s.date), `${s.duree} h`, `${s.phase} — ${PHASE_LIB[s.phase]}`, objetSeance(s, p)]),
      ["Total", "", `${total} h`, "", ""],
    ]),
    ...Object.fromEntries(([1, 2, 3] as const).map((ph) => [`SEANCES_PHASE_${ph}`, tableau(["Séance", "Date", "Horaires", "Durée", "Contenu"],
      parPhase(ph).map((s) => [String(s.numero), fmt(s.date), `${s.debut} – ${s.fin}`, `${s.duree} h`, objetSeance(s, p)]))])),
    SEANCES_CONVOCATION: tableau(["Séance", "Date", "Horaires", "Durée", "Phase", "Accès"], [
      ...S.map((s) => [String(s.numero), fmt(s.date), `${s.debut} – ${s.fin}`, `${s.duree} h`, PHASE_LIB[s.phase], presentiel ? String(v.ORG_ADRESSE_COMPLETE) : "Lien Google Meet de l'invitation"]),
      ["Total", "", "", `${total} h`, "", ""],
    ]),
    FICHE_PEDA_SEANCES: S.map((s, i) => {
      const parts = s.roles.map((r) => pedaRole(r, p, v));
      const fait = passe(s.date, arrete);
      return [
        `**Séance ${s.numero} — ${PHASE_LIB[s.phase]} — ${fmt(s.date)}**`, "",
        tableau(["Date et horaires", `${fmt(s.date)} — ${s.debut} – ${s.fin} (${s.duree} h)`], [
          ["Phase", `${s.phase} — ${PHASE_LIB[s.phase]}`],
          ["Modalité et lieu", `${modCourt} — ${presentiel ? lieu : "visioconférence"}`],
          ["Consultant", String(v.CONSULTANT)],
          ["Objectifs de la séance", parts[0]?.cles || ""],
        ]), "",
        "**Programme de la séance**", "",
        parts.flatMap((x) => x.puces).map((x) => `•\t${x}`).join("\n\n"), "",
        tableau(["Réalisation", fait ? `Séance réalisée — présence attestée par la feuille d'émargement signée ; cumul : ${cumuls[i]} h sur ${total} h` : `Séance programmée — cumul prévu à son issue : ${cumuls[i]} h sur ${total} h`], [
          ["Retard ou absence", fait ? "Néant" : "—"],
          ["Adaptation", fait ? "Aucune" : "—"],
        ]),
      ].join("\n");
    }).join("\n\n"),
    FICHE_PEDA_RECAP: (() => {
      const faits = S.filter((s) => passe(s.date, arrete));
      const hf = (ph?: number) => faits.filter((s) => !ph || s.phase === ph).reduce((a, s) => a + s.duree, 0);
      return tableau(["Indicateur", "Prévu", `Réalisé au ${fmt(arrete)}`], [
        ["Nombre de séances", String(S.length), String(faits.length)],
        ["Volume horaire", `${total} h`, `${hf()} h`],
        ["Phase préliminaire", `${v.H_P1} h`, `${hf(1)} h`],
        ["Phase d'investigation", `${v.H_P2} h`, `${hf(2)} h`],
        ["Phase de conclusion", `${v.H_P3} h`, `${hf(3)} h`],
      ]);
    })(),
    EMARGEMENTS: S.map((s, i) => {
      const fait = passe(s.date, arrete);
      return [
        `**Séance n° ${s.numero} sur ${S.length} — Phase ${s.phase} — ${PHASE_LIB[s.phase]}**`, "",
        tableau(["Date", "Horaires", "Durée", "Modalité", "Lieu", "Présence"], [[fmt(s.date), `${s.debut} – ${s.fin}`, `${s.duree} h`, modCourt, lieu, fait ? "☒ Présent   ☐ Absent" : "☐ Présent   ☐ Absent"]]), "",
        tableau(["Objet de la séance", `${PHASE_LIB[s.phase]} — ${objetSeance(s, p)}`], [[fait ? "Cumul des heures réalisées à l'issue de la séance" : "Cumul prévu à l'issue de la séance", `${cumuls[i]} h sur ${total} h`]]), "",
        "**Signatures**", "", `Fait à ${v.ORG_VILLE}, en deux exemplaires originaux.`, "",
        tableau([`Le bénéficiaire ⏎ ${v.BEN} ⏎ Émargement ouverture et clôture de séance ⏎ ${fait ? "Signé" : "À signer"} le ${fmt(s.date)}`, `Le consultant ⏎ ${v.CONSULTANT} ⏎ Consultant en bilan de compétences ⏎ ${fait ? "Signé" : "À signer"} le ${fmt(s.date)}`], []),
      ].join("\n");
    }).join("\n\n"),
    EMARGEMENT_RECAP: (() => {
      const faits = S.filter((s) => passe(s.date, arrete));
      const hFaites = faits.reduce((a, s) => a + s.duree, 0);
      const t = tableau(["Séance", "Date", "Phase", "Durée prévue", "Présence", "Cumul réalisé"], [
        ...S.map((s, i) => [String(s.numero), fmt(s.date), `${s.phase} — ${PHASE_LIB[s.phase]}`, `${s.duree} h`, passe(s.date, arrete) ? "☒ Présent" : "À venir", passe(s.date, arrete) ? `${cumuls[i]} h` : "—"]),
        ["Total", "", "", `${total} h`, "", `${hFaites} h`],
      ]);
      return [t, "", tableau(["Heures réalisées", `${hFaites} h sur ${total} h`], [["Séances réalisées", `${faits.length} sur ${S.length}`], ["Absences constatées", faits.length ? "Aucune" : "—"]]), "",
        tableau([`Récapitulatif établi d'après les ${faits.length} feuille${faits.length > 1 ? "s" : ""} signée${faits.length > 1 ? "s" : ""} ci-dessus.${v.TERMINE ? ` Le certificat de réalisation du ${v.D_FIN} est établi en conformité avec lui` : " Il est complété à chaque séance"}`], [])].join("\n");
    })(),
    RESULTATS_PUBLICS: tableau([`Indicateur (arrêté au ${fmt(arrete)})`, "Résultat", "Volume"], [
      ["Bilans démarrés", String(demarres.length), pluriel(nommes.length, "bénéficiaire")],
      ["Bilans menés à leur terme (synthèse remise)", String(termines.length), `${termines.length} sur ${demarres.length} démarré${demarres.length > 1 ? "s" : ""}`],
      ["Abandons", "0", `0 sur ${demarres.length}`],
      ["Satisfaction à chaud (moyenne des 8 items)", termines.length ? "Calculée sur les questionnaires renseignés" : "Aucun bilan terminé", `${termines.length} bilan${termines.length > 1 ? "s" : ""} terminé${termines.length > 1 ? "s" : ""}`],
      ["Suivi à 6 mois", echus.length ? `Échu pour ${echus.length} bilan${echus.length > 1 ? "s" : ""}` : prochainSuivi ? `Non encore échu — premier suivi programmé le ${fmt(prochainSuivi)}` : "Non encore échu", `${echus.length} échu${echus.length > 1 ? "s" : ""}`],
    ]),
    SITUATION_IND2: [
      tableau([`Effectif de ${pluriel(nommes.length, "bénéficiaire")} au ${fmt(arrete)} : ${termines.length} parcours terminé${termines.length > 1 ? "s" : ""}, ${demarres.length - termines.length} en cours, ${nommes.length - demarres.length} à venir. Les résultats sont publiés en valeur brute avec leur volume : en deçà de 10, un pourcentage n'aurait pas de valeur statistique`], []), "",
      tableau(["Indicateur", `Valeur au ${fmt(arrete)}`, "Volume", "Prochain arrêté"], [
        ["Nombre de bénéficiaires accompagnés", String(demarres.length), `${termines.length} parcours terminé${termines.length > 1 ? "s" : ""}`, `31/12/${arrete.getFullYear()}`],
        ["Bilans arrivés à leur terme", String(termines.length), `${termines.length} sur ${demarres.length} démarré${demarres.length > 1 ? "s" : ""}`, `31/12/${arrete.getFullYear()}`],
        ["Abandons", "0", `0 sur ${demarres.length}`, `31/12/${arrete.getFullYear()}`],
        ["Satisfaction à chaud", termines.length ? "Moyenne calculée à partir des questionnaires renseignés (classeur de l'indicateur 2)" : "Aucun questionnaire attendu", `${termines.length} questionnaire${termines.length > 1 ? "s" : ""} attendu${termines.length > 1 ? "s" : ""}`, `31/12/${arrete.getFullYear()}`],
        ["Suivi à 6 mois", echus.length ? `Échu pour ${echus.length} bilan${echus.length > 1 ? "s" : ""}` : prochainSuivi ? `Non encore échu — programmé le ${fmt(prochainSuivi)}` : "Non encore échu", `${echus.length} sur ${termines.length}`, `31/12/${arrete.getFullYear()}`],
      ]),
    ].join("\n"),
    SITUATION_SUIVI: tableau([`Situation au ${fmt(arrete)} : ${nommes.length ? nommes.map((x) => {
      const fin = passe(x.dates.fin, arrete);
      return `le bilan de ${avecNom(x)} ${fin ? "s'est achevé" : "s'achève"} le ${fmt(x.dates.fin)} ; l'entretien de suivi est programmé le ${fmt(x.dates.suivi)}${passe(x.dates.suivi, arrete) ? " (échu : compte rendu de suivi à établir à partir de l'entretien réalisé)" : " (non échu : aucune donnée de suivi n'est saisie par anticipation)"}`;
    }).join(" ; ") : "aucun bilan engagé"}.`], []),
    CAS_ANALYSE: tableau([nommes.length ? `Dossiers réalisés : ${nommes.map((x) => {
      const tri = x.financement === "employeur" || x.financement === "OPCO";
      return tri
        ? `la demande de ${avecNom(x)} est portée par son employeur (${x.s.entreprise || "employeur"}) : convention tripartite, l'employeur étant associé à l'analyse du besoin dans le strict respect de la confidentialité des contenus`
        : `la demande de ${avecNom(x)} est une démarche individuelle (${MIN(LIB_FIN[x.financement])}) : aucun employeur n'est partie au contrat, les rubriques relatives à l'entreprise sont documentées « sans objet » avec leur justification`;
    }).join(" ; ")}` : "Aucun dossier réalisé à ce jour : le process s'applique dès la première demande"], []),
    PARCOURS_PROFIL: p.manager
      ? `**Parcours orienté management**\n\nLe bilan proposé par ${v.ORG} s'adresse en particulier aux personnes qui exercent ou envisagent des fonctions d'encadrement : managers de proximité ou intermédiaires, référents, tuteurs ou experts pressentis pour encadrer. En phase d'investigation, le bénéficiaire situe ses compétences sur un référentiel de dix familles de compétences managériales (techniques, transversales, gestion de projet, comportementales, management d'équipe, gestion du changement, culture d'entreprise, stratégie, innovation et agilité, diversité et inclusion) et confronte ses pistes d'évolution à la réalité du métier par des enquêtes auprès de managers en poste. Les trois phases et le document de synthèse restent ceux de tout bilan de compétences : le bilan ne forme pas au management et ne présume pas du projet retenu.`
      : p.generique ? ""
        : `**Parcours orienté ${p.domaine.label}**\n\nLe bilan proposé par ${v.ORG} s'adresse en particulier aux personnes qui exercent ou envisagent le métier de ${p.domaine.metier} (${p.domaine.secteur}). En phase d'investigation, le bénéficiaire confronte ses pistes à la réalité du métier par des enquêtes auprès de professionnels en poste. Les trois phases et le document de synthèse restent ceux de tout bilan de compétences : le bilan ne forme pas au métier et ne présume pas du projet retenu.`,
    ROME_PROFIL: (() => {
      const intro = "Le Répertoire opérationnel des métiers et des emplois (ROME) de France Travail est la référence utilisée pour décrire les métiers explorés : appellations, activités, compétences, conditions d'accès, mobilités possibles.";
      if (p.manager) return `${intro} Pour le parcours orienté management, les fiches ci-dessous sont mises à disposition et sélectionnées avec le bénéficiaire selon son secteur et ses pistes.\n\n${tableau(["Code ROME", "Intitulé de la fiche métier", "Usage dans le bilan"], [
        ["M1302", "Direction de petite ou moyenne entreprise", "Piste d'évolution à terme vers la direction d'une structure"],
        ["M1503", "Management des ressources humaines", "Fonctions d'encadrement centrées sur la gestion des équipes et des compétences"],
        ["M1502", "Développement des ressources humaines", "Accompagnement des parcours, formation et développement des compétences"],
        ["M1402", "Conseil en organisation et management d'entreprise", "Pilotage de projets d'organisation et de conduite du changement"],
        ["H2502", "Management et ingénierie de production", "Encadrement d'équipes de production dans l'industrie"],
        ["D1301", "Management de magasin de détail", "Encadrement d'une équipe de vente et pilotage d'un point de vente"],
        ["G1402", "Management d'hôtel-restaurant", "Encadrement d'équipes dans l'hôtellerie et la restauration"],
        ["K1403", "Management de structure de santé, sociale ou pénitentiaire", "Encadrement dans le secteur sanitaire et social"],
        ["N1303", "Intervention technique d'exploitation logistique", "Encadrement d'équipe et organisation de l'activité en entrepôt"],
        ["M1301", "Direction de grande entreprise ou d'établissement public", "Repère sur les fonctions de direction, pour situer les étapes d'évolution"],
      ])}`;
      const codes = ctx.f.referentiel?.codesRome || [];
      if (codes.length) return `${intro} Les fiches ci-dessous correspondent au référentiel de la certification visée ; d'autres sont sélectionnées avec le bénéficiaire selon ses pistes.\n\n${tableau(["Code ROME", "Usage dans le bilan"], codes.map((c) => [c, "Fiche métier France Travail : activités, compétences, conditions d'accès et mobilités"]))}`;
      return `${intro} Les fiches sont sélectionnées avec chaque bénéficiaire selon son secteur et ses pistes, puis complétées par les comptes rendus d'enquêtes métier.`;
    })(),
    VEILLE23_CERTIF: (() => {
      const num = String(v.CERT_NUM);
      const obt = parseDateAny(ctx.org.dateObtentionQualiopi);
      const date = fmt(obt ? versApres(plusJours(obt, 3)) : parseDateAny(ctx.org.dateMaj));
      if (num && v.CERTIFIE_BC) return `| 23-01 | ${date} | ${ctx.org.organismeCertificateur || "Organisme certificateur"} — certificat Qualiopi n° ${num} ; art. L6316-1 et L6323-6 du Code du travail | ${v.ORG} est certifié Qualiopi pour la catégorie « bilans de compétences » | Le CPF, les OPCO et France Travail peuvent financer les bilans réalisés par l'organisme | Offre publiée sur Mon Compte Formation ; certificat affiché avec son périmètre exact | ☒ Soldée |`;
      if (num) return `| 23-01 | ${date} | ${ctx.org.organismeCertificateur || "Organisme certificateur"} — certificat Qualiopi n° ${num} ; art. L6316-1 et L6323-6 du Code du travail | ${v.ORG} est certifié Qualiopi ${categoriesCertif(ctx.org.certifications) ? `au titre ${categoriesCertif(ctx.org.certifications)}` : ""}, pas pour les bilans de compétences | Le CPF, les OPCO et France Travail ne peuvent pas financer un bilan réalisé par l'organisme tant que l'extension n'est pas obtenue | Offre et CGV limitées au financement personnel ou employeur ; demande d'extension à la catégorie « bilans de compétences » préparée | ☒ Soldée |`;
      return `| 23-01 | ${date} | Code du travail, art. L6316-1 et L6323-6 | ${v.ORG} n'est pas encore certifié Qualiopi | Le CPF, les OPCO et France Travail ne peuvent pas financer un bilan réalisé par l'organisme avant la certification | Offre et CGV limitées au financement personnel ou employeur ; demande de certification incluant la catégorie « bilans de compétences » préparée | ☒ Soldée |`;
    })(),
    VEILLE24_LIGNES: [veille("24-01", p.domaine.veilleMetier), veille("24-02", { intitule: "Certifications et blocs de compétences accessibles par le CPF dans les métiers explorés", source: "France Compétences — répertoires RNCP et RS", lien: "https://www.francecompetences.fr", date: p.domaine.veilleMetier.date, exploitation: "Comparaison des formations qualifiantes selon le niveau, la durée et le financement, intégrée aux plans d'action" })].join("\n"),
    VEILLE25_LIGNES: veille("25-01", p.domaine.veilleTechnologique),
    SITUATION_SATISFACTION: tableau(["Partie prenante", "Sollicitée ?", "Réponses reçues", "Prochaine échéance"], [
      ["Bénéficiaire — à chaud", termines.length ? `Oui, à l'issue de chaque bilan terminé (${termines.length})` : "Non — aucun bilan terminé", termines.length ? "Questionnaires renseignés versés aux dossiers individuels" : "—", (() => { const d = nommes.map((x) => x.dates.fin).filter((x) => !passe(x, arrete)).sort((a, c) => a.getTime() - c.getTime())[0]; return d ? fmt(d) : "—"; })()],
      ["Bénéficiaire — à froid", echus.length ? `Oui (${echus.length})` : "Non — échéance non atteinte", echus.length ? "Selon les entretiens de suivi réalisés" : "0", prochainSuivi ? fmt(prochainSuivi) : "—"],
      ["Entreprise", nommes.some((x) => x.financement === "employeur" || x.financement === "OPCO") ? "Oui, à l'issue des bilans concernés" : "Non applicable — justifié", "—", "Sans objet"],
      ["Financeur", nommes.some((x) => ["CPF", "OPCO", "France Travail"].includes(x.financement)) ? "Oui, à l'issue des bilans concernés" : "Non applicable — justifié", "—", "Sans objet"],
      ["Équipe pédagogique", v.MEME_PERSONNE ? "Non applicable — justifié" : "Oui, annuellement", "—", v.MEME_PERSONNE ? "Sans objet" : `31/12/${arrete.getFullYear()}`],
    ]),
    MENTIONS_NA: (nommes.length ? nommes : [b]).map((x) => {
      const vx = varsBeneficiaire(ctx, x);
      const tri = x.financement === "employeur" || x.financement === "OPCO";
      const tiers = ["CPF", "OPCO", "France Travail"].includes(x.financement);
      const sections: string[] = [`**${avecNom(x) || "Bénéficiaire"}**`];
      if (!tri) sections.push(`Questionnaire de satisfaction entreprise — non applicable\n\n${tableau(["Justification", `${vx.BEN} réalise son bilan à titre individuel, du ${vx.S1} au ${vx.D_FIN}. Aucun employeur n'est à l'initiative de la démarche, n'y est partie ni n'en assure le financement : le contrat est bilatéral.`], [["Pièces", `Fiche d'analyse du besoin (origine de la demande) · ${vx.CONVENTION_NOM} du ${vx.D_CONVENTION}`]])}`);
      if (!tiers) sections.push(`Questionnaire de satisfaction financeur — non applicable\n\n${tableau(["Justification", tri ? `Le financeur est l'employeur, partie à la convention tripartite : sa satisfaction est recueillie par le questionnaire entreprise.` : `Le financeur est le bénéficiaire lui-même (${MIN(String(vx.FINANCEMENT_LIB))}${vx.PRIX_PARENTHESE}). Aucun organisme financeur tiers n'intervient : sa satisfaction en tant que payeur est recueillie par le questionnaire bénéficiaire.`], [["Pièces", `${MAJ(String(vx.CONVENTION_NOM))} du ${vx.D_CONVENTION} (article 9) · CGV acceptées le ${vx.D_CONVENTION}`]])}`);
      if (v.MEME_PERSONNE) sections.push(`Questionnaire des équipes pédagogiques — non applicable\n\n${tableau(["Justification", `${v.ORG} est une structure à intervenant unique : aucun salarié, aucun sous-traitant. Le consultant étant l'organisme lui-même, son appréciation des moyens et des process est recueillie lors de l'entretien annuel (indicateur 22), et non par un questionnaire adressé à lui-même.`], [["Pièces", "Organigramme (indicateur 18) · compte rendu d'entretien annuel (indicateur 22)"]])}`);
      sections.push(passe(x.dates.suivi, arrete)
        ? `Questionnaire bénéficiaire à froid — échu\n\n${tableau(["Situation", `Recueil lors de l'entretien de suivi du ${vx.D_SUIVI} ; à défaut de réponse après deux relances, mention « sollicité sans réponse » avec la date et le canal de chaque sollicitation.`], [])}`
        : `Questionnaire bénéficiaire à froid — échéance non atteinte\n\n${tableau(["Situation", `Recueil prévu lors de l'entretien de suivi du ${vx.D_SUIVI} ; premier contact le ${vx.D_RELANCE_SUIVI}.`], [])}`);
      return sections.join("\n\n");
    }).join("\n\n"),
  };
}

/* ------------------------------------------------------------------ */
/* Résolution d'un gabarit                                             */
/* ------------------------------------------------------------------ */

export function remplir(md: string, v: Vars, bl: Record<string, string>): string {
  let out = md.replace(/\{\{#SI (\w+)\}\}([\s\S]*?)(?:\{\{#SINON\}\}([\s\S]*?))?\{\{\/SI\}\}/g, (_, k: string, oui: string, non?: string) => (v[k] ? oui : non || ""));
  out = out.replace(/\{\{BLOC:(\w+)\}\}/g, (_, k: string) => bl[k] ?? "");
  out = out.replace(/\{\{CB:(\w+)=([^}]*)\}\}/g, (_, k: string, val: string) => (String(v[`CB_${k}`] ?? "") === val ? "☒" : "☐"));
  out = out.replace(/\{\{(\w+)\}\}/g, (m, k: string) => (k in v ? String(v[k] === true ? "" : v[k] === false ? "" : v[k]) : m));
  return out;
}

/** Valeurs des cases à cocher calculées (origine, financement, modalité, situation). */
export function casesACocher(ctx: ContexteNexus, b: BenNexus, v: Vars): Vars {
  const fin = b.financement;
  return {
    CB_ORIGINE: fin === "employeur" || fin === "OPCO" ? "employeur" : b.nomme ? "beneficiaire" : "",
    CB_FIN: b.nomme ? (fin === "autre" ? "" : fin) : "",
    CB_MODALITE: modaliteCle(ctx.f),
    CB_SITUATION: v.BEN_SITUATION === "Salarié(e)" ? "salarie" : v.BEN_SITUATION === "Demandeur d'emploi" ? "demandeur" : "",
  };
}
