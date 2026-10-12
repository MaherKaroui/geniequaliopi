/**
 * Données de référence d'un parcours VAE, calculées UNE fois par candidat et
 * partagées par toutes les pièces du dossier : fiche de certification, profil
 * déclaratif, calendrier unique des séances et chronologie du parcours.
 *
 * Règles :
 * - la certification (intitulé, niveau, certificateur, blocs) vient de la fiche
 *   RNCP connue (rncpData) ou de la fiche France Compétences analysée
 *   (formation.referentiel) — jamais de l'organisme ;
 * - le profil utilise d'abord les champs saisis (poste, entreprise, diplôme,
 *   financeur, RQTH) ; le reste est tiré d'une graine stable par candidat ;
 * - aucune date d'exécution postérieure à aujourd'hui n'est présentée comme réalisée.
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { getRNCPByCode, isRNCPActif } from "../rncpData";
import { estJourFerie } from "../joursFeries";
import { rapprochementVAE, dureeTexte, type RapprochementVAE } from "./vaeCandidat";

// ───────────────────────────── Dates ─────────────────────────────

/** Date locale depuis « aaaa-mm-jj », « jj/mm/aaaa » ou une date JS ; null si illisible. */
export function parseDateVAE(x?: string | null): Date | null {
  const t = (x || "").trim();
  if (!t) return null;
  let m = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
  m = t.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  const d = new Date(t);
  return isNaN(d.getTime()) ? null : new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
export const isoVAE = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const frVAE = (d: Date | null | undefined) => (d ? `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}` : "");
export const frLongVAE = (d: Date) => d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export function aujourdhui(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
export const estPasse = (d: Date | null | undefined) => !!d && d.getTime() <= aujourdhui().getTime();

const estOuvre = (d: Date) => d.getDay() !== 0 && d.getDay() !== 6 && !estJourFerie(d);

export function ajouterJoursOuvres(d: Date, n: number): Date {
  const r = new Date(d);
  let reste = Math.abs(n);
  const pas = n >= 0 ? 1 : -1;
  while (reste > 0) {
    r.setDate(r.getDate() + pas);
    if (estOuvre(r)) reste--;
  }
  return r;
}

/** Jours ouvrés (lundi-vendredi, fériés exclus) entre deux dates incluses. */
export function joursOuvresEntre(a: Date, b: Date): Date[] {
  const out: Date[] = [];
  const cur = new Date(a);
  while (cur.getTime() <= b.getTime() && out.length < 800) {
    if (estOuvre(cur)) out.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

const maxDate = (a: Date, b: Date) => (a.getTime() >= b.getTime() ? a : b);

// ───────────────────────────── Graine ─────────────────────────────

export function graine(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}

// ───────────────────────────── Certification ─────────────────────────────

export interface BlocVAE { code: string; titre: string; competences: string[]; professionnel: boolean }
export interface CertifVAE {
  code: string; intitule: string; niveau: string; certificateur: string; echeance: string;
  actif: boolean | null; remplacePar?: string; blocs: BlocVAE[]; metiers: string[]; connue: boolean;
}

/** Blocs officiels RNCP39030 (France Compétences) : BC01 à BC03 professionnels, BC04 à BC08 enseignement général. */
const BLOCS_GENERAUX_39030: BlocVAE[] = [
  { code: "RNCP39030BC04", titre: "Français et Histoire-géographie - Enseignement moral et civique", competences: [], professionnel: false },
  { code: "RNCP39030BC05", titre: "Mathématiques et physique-chimie", competences: [], professionnel: false },
  { code: "RNCP39030BC06", titre: "Éducation physique et sportive", competences: [], professionnel: false },
  { code: "RNCP39030BC07", titre: "Langue vivante étrangère", competences: [], professionnel: false },
  { code: "RNCP39030BC08", titre: "Arts appliqués et cultures artistiques (facultatif)", competences: [], professionnel: false },
];

export function certifVAE(f: FormationInfo): CertifVAE {
  const code = (f.codeRNCP || f.referentiel?.code || "").trim().toUpperCase();
  const fiche = code ? getRNCPByCode(code) : undefined;
  const ref = f.referentiel;
  const intitule = (f.intitule || ref?.intitule || fiche?.intitule || "").trim();
  if (fiche) {
    const blocs: BlocVAE[] = fiche.blocsCompetences.map((b, i) => ({
      code: `${fiche.code}BC${pad(i + 1)}`,
      titre: b.titre.replace(/^(Bloc\s*\d+|BC\s*\d+)\s*[–—:-]\s*/i, "").trim(),
      competences: b.competences,
      professionnel: true,
    }));
    if (fiche.code === "RNCP39030") blocs.push(...BLOCS_GENERAUX_39030);
    return {
      code: fiche.code, intitule, niveau: fiche.niveau, certificateur: fiche.certificateur, echeance: fiche.dateEcheance,
      actif: isRNCPActif(fiche.code), remplacePar: fiche.remplacePar, blocs, metiers: fiche.typesEmplois || [], connue: true,
    };
  }
  if (ref && (ref.blocs?.length || ref.certificateur)) {
    return {
      code: code || ref.code, intitule, niveau: ref.niveau ? `Niveau ${ref.niveau}` : "selon la fiche France Compétences",
      certificateur: ref.certificateur || "autorité de certification indiquée sur la fiche France Compétences",
      echeance: ref.dateFinEnregistrement || "", actif: ref.actif,
      blocs: (ref.blocs || []).map((b) => ({ code: b.code, titre: b.intitule, competences: [], professionnel: true })),
      metiers: ref.metiers || [], connue: true,
    };
  }
  return {
    code, intitule, niveau: "selon la fiche France Compétences", certificateur: "autorité de certification indiquée sur la fiche France Compétences",
    echeance: "", actif: null, blocs: [{ code: code ? `${code}BC01` : "Bloc 1", titre: "Activités et compétences du référentiel de certification", competences: [], professionnel: true }],
    metiers: [], connue: false,
  };
}

// ───────────────────────────── Durée et calendrier ─────────────────────────────

export function heuresVAE(f: FormationInfo): number {
  const m = (f.duree || "").replace(",", ".").match(/(\d+(?:\.\d+)?)\s*h/i) || (f.duree || "").match(/(\d+(?:\.\d+)?)/);
  const h = m ? Math.round(parseFloat(m[1])) : 24;
  return h >= 4 && h <= 200 ? h : 24;
}

export interface SeanceVAE { num: number; date: Date; horaire: string; debut: string; fin: string; duree: number; phase: string; theme: string; realisee: boolean }

function themesSeances(n: number, blocsPro: BlocVAE[]): { phase: string; theme: string }[] {
  const out: { phase: string; theme: string }[] = [];
  const redaction = Math.max(1, n - 5);
  out.push({ phase: "Lancement", theme: "Accueil, contrat d'accompagnement, appropriation du référentiel et du calendrier du certificateur" });
  if (n > 1) out.push({ phase: "Lancement", theme: "Repérage des activités significatives de l'expérience et des preuves disponibles" });
  for (let i = 0; i < redaction && out.length < n - 3; i++) {
    const b = blocsPro[i % Math.max(1, blocsPro.length)];
    out.push({ phase: "Dossier de validation", theme: `Description des activités — ${b ? b.titre : "bloc de compétences"} (séance ${Math.floor(i / Math.max(1, blocsPro.length)) + 1})` });
  }
  if (out.length < n - 2) out.push({ phase: "Dossier de validation", theme: "Portefeuille de preuves, relecture et mise en cohérence du dossier" });
  if (out.length < n - 1) out.push({ phase: "Préparation au jury", theme: "Préparation de l'entretien avec le jury : présentation orale et questions types" });
  if (out.length < n) out.push({ phase: "Préparation au jury", theme: "Mise en situation d'entretien avec le jury et bilan de l'accompagnement" });
  while (out.length < n) out.splice(out.length - 2, 0, { phase: "Dossier de validation", theme: "Relecture des descriptions d'activités et compléments de preuves" });
  return out.slice(0, n);
}

/** Calendrier unique des séances d'un candidat (jours ouvrés, fériés exclus, borné début/fin, total = durée). */
export function calendrierVAE(s: StagiaireInfo, f: FormationInfo): SeanceVAE[] {
  const debut = parseDateVAE(s.dateDebutFormation || f.dateDebut);
  const fin = parseDateVAE(s.dateFinFormation || f.dateFin);
  const total = heuresVAE(f);
  const n = Math.max(1, Math.floor(total / 2));
  const durees = Array.from({ length: n }, (_, i) => (i === n - 1 ? total - 2 * (n - 1) : 2));
  const themes = themesSeances(n, certifVAE(f).blocs.filter((b) => b.professionnel));
  if (!debut) return [];
  const jours = fin && fin.getTime() >= debut.getTime() ? joursOuvresEntre(debut, fin) : joursOuvresEntre(debut, ajouterJoursOuvres(debut, n * 5));
  if (jours.length === 0) jours.push(debut);
  const out: SeanceVAE[] = [];
  const dejaPris = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    const idx = n === 1 ? 0 : Math.round((i * (jours.length - 1)) / (n - 1));
    const d = jours[idx];
    const k = isoVAE(d);
    const rang = dejaPris.get(k) || 0;
    dejaPris.set(k, rang + 1);
    const dur = durees[i];
    const debutH = rang === 0 ? 9 : 14;
    const debutTxt = `${pad(debutH)}h${rang === 0 ? "30" : "00"}`;
    const finMin = (rang === 0 ? 9 * 60 + 30 : 14 * 60) + dur * 60;
    const finTxt = `${pad(Math.floor(finMin / 60))}h${pad(finMin % 60)}`;
    out.push({ num: i + 1, date: d, horaire: `${debutTxt} – ${finTxt}`, debut: debutTxt, fin: finTxt, duree: dur, ...themes[i], realisee: estPasse(d) });
  }
  return out;
}

// ───────────────────────────── Chronologie ─────────────────────────────

export interface ChronoVAE {
  debut: Date | null; fin: Date | null;
  entretienFaisabilite: Date | null; depotFaisabilite: Date | null; contrat: Date | null;
  premiereSeance: Date | null; derniereSeance: Date | null; depotValidation: Date | null;
}

/**
 * Chronologie : entretien de faisabilité → dépôt du dossier de faisabilité (vae.gouv.fr)
 * → contrat d'accompagnement → séances → dépôt du dossier de validation → jury (date fixée
 * par le certificateur, jamais inventée). Aucune date avant la date de MAJ du dossier.
 */
export function chronoVAE(s: StagiaireInfo, f: FormationInfo, o: OrganismeInfo): ChronoVAE {
  const debut = parseDateVAE(s.dateDebutFormation || f.dateDebut);
  const fin = parseDateVAE(s.dateFinFormation || f.dateFin);
  const seances = calendrierVAE(s, f);
  const plancher = parseDateVAE(o.dateMaj);
  if (!debut) return { debut, fin, entretienFaisabilite: null, depotFaisabilite: null, contrat: null, premiereSeance: null, derniereSeance: null, depotValidation: null };
  const borne = (d: Date) => (plancher && d.getTime() < plancher.getTime() && plancher.getTime() < debut.getTime() ? plancher : d);
  let entretien = borne(ajouterJoursOuvres(debut, -25));
  let depot = maxDate(borne(ajouterJoursOuvres(debut, -22)), ajouterJoursOuvres(entretien, 1));
  let contrat = maxDate(borne(ajouterJoursOuvres(debut, -14)), ajouterJoursOuvres(depot, 1));
  if (contrat.getTime() >= debut.getTime()) {
    // Démarrage trop proche de la date de MAJ : on resserre en gardant l'ordre.
    contrat = ajouterJoursOuvres(debut, -1);
    depot = ajouterJoursOuvres(contrat, -1);
    entretien = ajouterJoursOuvres(depot, -1);
  }
  const derniere = seances.length ? seances[seances.length - 1].date : fin;
  const avantDerniere = seances.length > 2 ? seances[seances.length - 3].date : derniere;
  return { debut, fin, entretienFaisabilite: entretien, depotFaisabilite: depot, contrat, premiereSeance: seances[0]?.date || debut, derniereSeance: derniere, depotValidation: avantDerniere };
}

// ───────────────────────────── Profil déclaratif ─────────────────────────────

export type FinanceurVAE = "CPF" | "Employeur / OPCO" | "France Travail" | "Personnel" | "Région / autre";

export function financeurVAE(s: StagiaireInfo): FinanceurVAE {
  const f = (s.financeur || "").toLowerCase();
  if (/cpf|mon compte/.test(f)) return "CPF";
  if (/opco|entreprise|employeur|plan/.test(f)) return "Employeur / OPCO";
  if (/france travail|p[ôo]le emploi/.test(f)) return "France Travail";
  if (/perso|autofin|particulier/.test(f)) return "Personnel";
  if (f) return "Région / autre";
  return s.entreprise?.trim() ? "Employeur / OPCO" : "CPF";
}

export interface ProfilVAE {
  seed: number;
  nomComplet: string;
  civ: string;
  situation: string;
  financeur: FinanceurVAE;
  contratAvecEmployeur: boolean;
  /** Emploi déclaré (fiche candidat ou expérience la plus récente) ; vide si rien n'est déclaré. */
  poste: string;
  structure: string;
  /** Durée cumulée en rapport direct, calculée sur les expériences déclarées (texte). */
  experienceLien: string;
  experienceTotale: string;
  diplome: string;
  /** Motivation et projet exprimés par le candidat ; vide si non recueillis. */
  projet: string;
  rqth: boolean;
  couverture: { bloc: BlocVAE; niveau: "Établie" | "À documenter"; activites: string[] }[];
  avis: string;
  blocsVigilance: string[];
  rapp: RapprochementVAE;
}

export function profilVAE(s: StagiaireInfo, f: FormationInfo): ProfilVAE {
  const seed = graine(`${s.nom}|${s.prenom}|${s.email}|${f.intitule}`);
  const certif = certifVAE(f);
  const financeur = financeurVAE(s);
  const ref = parseDateVAE(s.dateDebutFormation || f.dateDebut) || aujourdhui();
  const rapp = rapprochementVAE(s, certif, ref);
  const salarie = !!s.entreprise?.trim() && financeur !== "France Travail";
  const fem = s.civilite === "Mme";
  const situation = financeur === "France Travail"
    ? `Demandeu${fem ? "se" : "r"} d'emploi inscrit${fem ? "e" : ""} à France Travail`
    : salarie ? `Salarié${fem ? "e" : ""} — ${s.entreprise}` : "Situation professionnelle à préciser lors de l'entretien de faisabilité";
  const poste = (s.poste || "").trim() || rapp.experiences[0]?.poste?.trim() || "";
  const couverture = rapp.liens.map((l) => ({
    bloc: l.bloc,
    niveau: (l.etabli ? "Établie" : "À documenter") as "Établie" | "À documenter",
    activites: Array.from(new Set(l.preuves.map((p) => p.activite))).slice(0, 4),
  }));
  const vigilance = rapp.renseigne ? rapp.blocsNonCouverts : [];
  const avis = rapp.avis === "À ÉTABLIR"
    ? "À ÉTABLIR — aucune expérience n'a encore été déclarée avec ses justificatifs"
    : rapp.avis === "FAVORABLE AVEC VIGILANCE" ? `FAVORABLE — avec vigilance sur : ${vigilance.join(" ; ")}`
    : rapp.avis === "RÉSERVÉ" ? "RÉSERVÉ — aucune activité déclarée n'est en rapport direct avec les blocs professionnels de la certification"
    : "FAVORABLE";
  return {
    seed,
    nomComplet: `${s.prenom} ${s.nom}`.trim(),
    civ: s.civilite === "Mme" ? "Madame" : s.civilite === "M." ? "Monsieur" : "",
    situation,
    financeur,
    contratAvecEmployeur: financeur === "Employeur / OPCO",
    poste,
    structure: s.entreprise?.trim() || rapp.experiences[0]?.employeur?.trim() || "—",
    experienceLien: rapp.renseigne ? dureeTexte(rapp.moisLien) : "",
    experienceTotale: rapp.renseigne ? dureeTexte(rapp.moisTotal) : "",
    diplome: s.diplome?.trim() || "",
    projet: (s.projetVAE || "").trim(),
    rqth: s.rqth === "oui",
    couverture,
    avis,
    blocsVigilance: vigilance,
    rapp,
  };
}
