/**
 * Expérience réelle d'un candidat VAE et rapprochement avec la certification visée.
 *
 * Règle (dossier NEO VOIE / skill /vae) : les pièces nominatives ne reprennent que ce que
 * le candidat a déclaré (StagiaireInfo.experiences, poste, entreprise, diplôme, projetVAE).
 * Aucune durée, aucun employeur ni aucune activité n'est déduit d'une graine : sans
 * déclaration, la pièce reste une trame à compléter lors de l'entretien de faisabilité.
 */
import type { ExperienceDeclaree, StagiaireInfo } from "@/types/qualiopi";
import type { BlocVAE, CertifVAE } from "./vaeProfil";

export interface ExperienceVAE extends ExperienceDeclaree {
  activitesListe: string[];
  debutDate: Date | null;
  finDate: Date | null;
  /** Durée en mois (fin vide = jusqu'à la date de référence). null si dates absentes. */
  mois: number | null;
}

export interface LienBloc {
  bloc: BlocVAE;
  /** Activités déclarées rapprochées du bloc, avec l'expérience d'origine. */
  preuves: { activite: string; experience: ExperienceVAE }[];
  etabli: boolean;
}

export interface RapprochementVAE {
  experiences: ExperienceVAE[];
  renseigne: boolean;
  liens: LienBloc[];
  /** Mois cumulés des expériences rapprochées d'au moins un bloc (chevauchements fusionnés). */
  moisLien: number | null;
  moisTotal: number | null;
  /** Emploi déclaré correspondant à un métier visé par la fiche RNCP. */
  metierVise: string | null;
  avis: "FAVORABLE" | "FAVORABLE AVEC VIGILANCE" | "RÉSERVÉ" | "À ÉTABLIR";
  blocsNonCouverts: string[];
}

// ───────────────────────────── Lecture des dates ─────────────────────────────

function parseMois(x?: string): Date | null {
  const t = (x || "").trim();
  if (!t) return null;
  let m = t.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (m) return new Date(+m[1], +m[2] - 1, m[3] ? +m[3] : 1);
  m = t.match(/^(\d{2})\/(\d{4})$/);
  if (m) return new Date(+m[2], +m[1] - 1, 1);
  m = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
  m = t.match(/^(\d{4})$/);
  if (m) return new Date(+m[1], 0, 1);
  return null;
}

const moisEntre = (a: Date, b: Date) => Math.max(0, (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1);

export function libelleMois(d: Date | null): string {
  return d ? d.toLocaleDateString("fr-FR", { month: "2-digit", year: "numeric" }) : "";
}

export function dureeTexte(mois: number | null): string {
  if (mois === null) return "durée non renseignée";
  const a = Math.floor(mois / 12);
  const m = mois % 12;
  const parts = [];
  if (a) parts.push(`${a} an${a > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mois`);
  return parts.join(" et ") || "moins d'un mois";
}

// ───────────────────────────── Expériences ─────────────────────────────

export function experiencesVAE(s: StagiaireInfo, reference: Date = new Date()): ExperienceVAE[] {
  return (s.experiences || [])
    .filter((e) => (e.poste || "").trim() || (e.activites || "").trim())
    .map((e) => {
      const debutDate = parseMois(e.debut);
      const finDate = parseMois(e.fin);
      const fin = finDate || (debutDate ? reference : null);
      return {
        ...e,
        activitesListe: (e.activites || "").split(/\r?\n|;|•/).map((a) => a.replace(/^[-–\s]+/, "").trim()).filter(Boolean),
        debutDate,
        finDate,
        mois: debutDate && fin ? moisEntre(debutDate, fin) : null,
      };
    })
    .sort((a, b) => (b.debutDate?.getTime() || 0) - (a.debutDate?.getTime() || 0));
}

// ───────────────────────────── Rapprochement ─────────────────────────────

const MOTS_VIDES = new Set("avec dans pour selon leurs leur des les une sur aux par plus tout tous toute toutes etre faire mettre oeuvre ensemble cadre activite activites competence competences realiser assurer situation professionnelle professionnel professionnelle bloc relatif relatives relatifs".split(" "));

function racines(t: string): Set<string> {
  return new Set(
    t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 5 && !MOTS_VIDES.has(w))
      .map((w) => w.slice(0, 6)),
  );
}

function score(a: Set<string>, b: Set<string>): number {
  let n = 0;
  a.forEach((x) => { if (b.has(x)) n++; });
  return n;
}

function fusionMois(exps: ExperienceVAE[], reference: Date): number | null {
  const iv = exps.filter((e) => e.debutDate).map((e) => [e.debutDate!.getTime(), (e.finDate || reference).getTime()] as [number, number]).sort((x, y) => x[0] - y[0]);
  if (!iv.length) return null;
  let total = 0;
  let [d, f] = iv[0];
  for (const [a, b] of iv.slice(1)) {
    if (a <= f) f = Math.max(f, b);
    else { total += moisEntre(new Date(d), new Date(f)); [d, f] = [a, b]; }
  }
  return total + moisEntre(new Date(d), new Date(f));
}

export function rapprochementVAE(s: StagiaireInfo, certif: CertifVAE, reference: Date = new Date()): RapprochementVAE {
  const experiences = experiencesVAE(s, reference);
  const pro = certif.blocs.filter((b) => b.professionnel);
  // Mots non discriminants : ceux de l'intitulé de la certification et ceux communs à tous les blocs
  // (ex. « esthétique » pour le CAP Esthétique) — ils rattacheraient n'importe quelle activité à tous les blocs.
  const parBloc = pro.map((b) => racines([b.titre, ...b.competences].join(" ")));
  const communs = new Set<string>(racines(certif.intitule));
  if (parBloc.length > 1) parBloc[0].forEach((r) => { if (parBloc.every((x) => x.has(r))) communs.add(r); });
  const liens: LienBloc[] = pro.map((bloc, bi) => {
    const cible = new Set([...parBloc[bi]].filter((r) => !communs.has(r)));
    const preuves: LienBloc["preuves"] = [];
    for (const e of experiences) {
      const lignes = e.activitesListe.length ? e.activitesListe : [e.poste];
      for (const a of lignes) {
        // Activité décrite en 3 mots significatifs ou plus : il faut au moins 2 mots communs avec le bloc.
        const r = racines(a);
        if (score(r, cible) >= (r.size >= 3 ? 2 : 1)) preuves.push({ activite: a, experience: e });
      }
    }
    return { bloc, preuves, etabli: preuves.length > 0 };
  });
  const lieesIdx = new Set(liens.flatMap((l) => l.preuves.map((p) => experiences.indexOf(p.experience))));
  const liees = experiences.filter((_, i) => lieesIdx.has(i));
  const postes = [s.poste, ...experiences.map((e) => e.poste)].filter((x): x is string => !!(x || "").trim());
  const metierVise = certif.metiers.find((m) => postes.some((p) => score(racines(p), racines(m)) >= 1)) || null;
  const renseigne = experiences.length > 0;
  const couverts = liens.filter((l) => l.etabli).length;
  const avis: RapprochementVAE["avis"] = !renseigne ? "À ÉTABLIR"
    : couverts === 0 ? "RÉSERVÉ"
    : couverts === liens.length ? "FAVORABLE" : "FAVORABLE AVEC VIGILANCE";
  return {
    experiences, renseigne, liens,
    moisLien: renseigne ? fusionMois(liees, reference) : null,
    moisTotal: renseigne ? fusionMois(experiences, reference) : null,
    metierVise,
    avis,
    blocsNonCouverts: liens.filter((l) => !l.etabli).map((l) => l.bloc.titre),
  };
}
