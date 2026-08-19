/**
 * MESSAGE 15 — GÉNÉRATEUR DE PLANNING
 *
 * Le planning est CALCULÉ à partir de la durée saisie dans le formulaire
 * Formation. Aucun document ne saisit ni ne réécrit une durée : tous
 * consomment `genererPlanning` et `phraseDuree`.
 */
import type { Beneficiaire, Prestation, Seance, Jour, Creneau } from "./bdc/bdcModel";
import { estJourOuvrable } from "./moteurDates";

export interface RepartitionPhases {
  preliminaire: number;
  investigation: number;
  conclusion: number;
}

export const REPARTITION_PAR_DEFAUT: RepartitionPhases = {
  preliminaire: 0.15,
  investigation: 0.6,
  conclusion: 0.25,
};

export interface OptionsPlanning {
  dureeSeanceMaxH?: number;
  repartition?: RepartitionPhases;
  /** Séances déjà posées pour le même consultant (autres bénéficiaires) */
  seancesConsultant?: Seance[];
  /** Décalage de départ propre au bénéficiaire (rang dans la liste) */
  rang?: number;
}

export interface Intersession {
  apresSeance: number;
  avantSeance: number;
  consigne: string;
  livrable: string;
  volumeH: number;
}

export interface ResultatPlanning {
  ok: boolean;
  seances: Seance[];
  intersessions: Intersession[];
  /** Heures planifiées en entretiens (doit égaler prestation.dureeEntretiensH) */
  heuresPlanifiees: number;
  decalages: string[];
  erreurs: string[];
}

const JOURS_FR: Jour[] = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

const CRENEAUX: Record<Creneau, { debut: number; fin: number }> = {
  matin: { debut: 9, fin: 12 },
  "apres-midi": { debut: 14, fin: 17 },
  soir: { debut: 18, fin: 20 },
};

const OBJETS: Record<1 | 2 | 3, string> = {
  1: "Phase préliminaire — analyse de la demande et du besoin, information sur les conditions de déroulement (art. R6313-4)",
  2: "Phase d'investigation — exploration des motivations, identification des compétences, aptitudes et possibilités d'évolution",
  3: "Phase de conclusion — appropriation des résultats, projet et remise du document de synthèse",
};

const arrondiDemi = (h: number) => Math.round(h * 2) / 2;
const hhmm = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;

/** Découpe une durée de phase en séances de `max` heures, jamais sous 1 heure. */
function decouper(dureePhase: number, max: number): number[] {
  const out: number[] = [];
  let reste = arrondiDemi(dureePhase);
  while (reste >= max) { out.push(max); reste = arrondiDemi(reste - max); }
  if (reste >= 1) out.push(reste);
  else if (reste > 0 && out.length) out[out.length - 1] = arrondiDemi(out[out.length - 1] + reste);
  else if (reste > 0) out.push(1);
  return out;
}

function memeJour(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function collision(date: Date, debut: number, duree: number, prises: Seance[]): boolean {
  return prises.some((s) => {
    if (!memeJour(s.date, date)) return false;
    const sd = parseFloat(s.heureDebut.replace(":30", ".5").replace(":00", ""));
    return debut < sd + s.duree && sd < debut + duree;
  });
}

export function genererPlanning(
  p: Prestation,
  b?: Beneficiaire | null,
  opts: OptionsPlanning = {},
): ResultatPlanning {
  const erreurs: string[] = [];
  const decalages: string[] = [];
  const max = opts.dureeSeanceMaxH ?? 3;
  const rep = opts.repartition || REPARTITION_PAR_DEFAUT;

  if (Math.abs(p.dureeEntretiensH + p.dureeTravailPersoH - p.dureeTotaleH) > 0.01) {
    erreurs.push(
      `Durées incohérentes : ${p.dureeEntretiensH} h d'entretiens + ${p.dureeTravailPersoH} h de travail personnel ≠ ${p.dureeTotaleH} h annoncées. Corrigez le formulaire Formation avant de générer.`,
    );
  }
  if (p.categorieAction === "BC" && p.dureeTotaleH > 24) {
    erreurs.push("Le bilan de compétences ne peut excéder 24 heures (art. R6313-4).");
  }
  if (erreurs.length) return { ok: false, seances: [], intersessions: [], heuresPlanifiees: 0, decalages, erreurs };

  // 1) Répartition par phase, arrondie à la demi-heure, reliquat sur l'investigation.
  const total = p.dureeEntretiensH;
  const h1 = arrondiDemi(total * rep.preliminaire);
  const h3 = arrondiDemi(total * rep.conclusion);
  const h2 = arrondiDemi(total - h1 - h3);

  // 2) Découpage en séances.
  const decoupes: Array<{ phase: 1 | 2 | 3; duree: number }> = [
    ...decouper(h1, max).map((d) => ({ phase: 1 as const, duree: d })),
    ...decouper(h2, max).map((d) => ({ phase: 2 as const, duree: d })),
    ...decouper(h3, max).map((d) => ({ phase: 3 as const, duree: d })),
  ];

  // 3) Placement sur les jours et créneaux déclarés disponibles.
  const jours = b?.joursDisponibles?.length ? b.joursDisponibles : (["lundi", "mardi", "mercredi", "jeudi", "vendredi"] as Jour[]);
  const creneaux = b?.creneauxDisponibles?.length ? b.creneauxDisponibles : (["matin", "apres-midi"] as Creneau[]);
  const prises = [...(opts.seancesConsultant || [])];
  const rang = opts.rang ?? 0;

  const spanJours = Math.max(1, Math.round((p.dateFin.getTime() - p.dateDebut.getTime()) / 86400000));
  const pas = Math.max(1, Math.floor(spanJours / Math.max(1, decoupes.length)));

  const seances: Seance[] = [];
  // La première séance démarre à la date de début déclarée : la différenciation
  // entre bénéficiaires se fait par le créneau horaire, jamais par un décalage de jour.
  const curseur = new Date(p.dateDebut);

  for (let i = 0; i < decoupes.length; i++) {
    const { phase, duree } = decoupes[i];
    let place = false;
    let garde = 0;
    while (!place && garde < 400) {
      garde++;
      const jourOk = jours.includes(JOURS_FR[curseur.getDay()]) && estJourOuvrable(curseur);
      if (jourOk) {
        for (let c = 0; c < creneaux.length && !place; c++) {
          const cr = CRENEAUX[creneaux[(c + rang + i) % creneaux.length]];
          if (!cr || cr.fin - cr.debut < duree) continue;
          const debut = cr.debut;
          if (collision(curseur, debut, duree, prises)) {
            decalages.push(
              `Séance ${i + 1} : créneau ${hhmm(debut)} du ${curseur.toLocaleDateString("fr-FR")} déjà occupé par le consultant, décalage appliqué.`,
            );
            continue;
          }
          const s: Seance = {
            numero: seances.length + 1,
            phase,
            date: new Date(curseur),
            heureDebut: hhmm(debut),
            heureFin: hhmm(debut + duree),
            duree,
            modalite: p.modalite === "distanciel" ? "distanciel" : "presentiel",
            objet: OBJETS[phase],
          };
          seances.push(s);
          prises.push(s);
          place = true;
        }
      }
      curseur.setDate(curseur.getDate() + (place ? pas : 1));
      if (place) continue;
      if (curseur > p.dateFin) break;
    }
    if (!place) {
      erreurs.push(
        `La période et les disponibilités déclarées ne permettent pas de placer les ${decoupes.length} séances. Élargir la période, ajouter un jour de disponibilité, ou augmenter la durée des séances.`,
      );
      break;
    }
  }

  // Caler la dernière séance sur la date de fin quand c'est possible.
  if (!erreurs.length && seances.length) {
    const derniere = seances[seances.length - 1];
    if (derniere.date < p.dateFin && estJourOuvrable(p.dateFin) && jours.includes(JOURS_FR[p.dateFin.getDay()])) {
      derniere.date = new Date(p.dateFin);
    }
  }

  // 4) Travail personnel guidé réparti sur les intersessions.
  const nbInter = Math.max(0, seances.length - 1);
  const parInter = nbInter ? arrondiDemi(p.dureeTravailPersoH / nbInter) : 0;
  const intersessions: Intersession[] = [];
  let cumul = 0;
  for (let i = 0; i < nbInter; i++) {
    const dernier = i === nbInter - 1;
    const volume = dernier ? Math.max(0, arrondiDemi(p.dureeTravailPersoH - cumul)) : parInter;
    cumul += volume;
    intersessions.push({
      apresSeance: seances[i].numero,
      avantSeance: seances[i + 1].numero,
      consigne: consigneIntersession(seances[i].phase),
      livrable: livrableIntersession(seances[i].phase),
      volumeH: volume,
    });
  }

  const heuresPlanifiees = seances.reduce((a, s) => a + s.duree, 0);
  return { ok: erreurs.length === 0, seances, intersessions, heuresPlanifiees, decalages, erreurs };
}

function consigneIntersession(phase: 1 | 2 | 3): string {
  if (phase === 1) return "Formaliser par écrit le besoin et les attentes, rassembler les pièces du parcours (CV, fiches de poste, attestations).";
  if (phase === 2) return "Compléter les questionnaires et tests remis en séance, conduire une enquête métier auprès d'un professionnel.";
  return "Relire le projet de document de synthèse et préparer le plan d'action à 6 mois.";
}

function livrableIntersession(phase: 1 | 2 | 3): string {
  if (phase === 1) return "Fiche de besoin complétée + parcours documenté";
  if (phase === 2) return "Questionnaires renseignés + compte rendu d'enquête métier";
  return "Plan d'action daté et hiérarchisé";
}

/* ------------------------------------------------------------------ */
/* Phrase de durée — UNIQUE source pour tous les documents             */
/* ------------------------------------------------------------------ */

export function phraseDuree(p: Prestation, nbSeances?: number): string {
  const mois = Math.max(
    1,
    Math.round((p.dateFin.getTime() - p.dateDebut.getTime()) / (30.44 * 86400000)),
  );
  const seances = nbSeances ?? p.seances?.length ?? 0;
  const partSeances = seances ? ` en ${seances} séance${seances > 1 ? "s" : ""}` : "";
  return (
    `${p.dureeTotaleH} heures réparties sur ${mois} mois : ${p.dureeEntretiensH} heures d'entretiens individuels${partSeances} ` +
    `et ${p.dureeTravailPersoH} heures de travail personnel guidé. L'entretien préalable d'information (1 heure, gratuit) ` +
    `et l'entretien de suivi à 6 mois ne sont pas décomptés de ces ${p.dureeTotaleH} heures.`
  );
}

/** Contrôle « durée annoncée / durée planifiée » du bandeau de l'écran planning. */
export function controleDuree(p: Prestation, seances: Seance[]): { ok: boolean; annoncee: number; planifiee: number; message: string } {
  const planifiee = seances.reduce((a, s) => a + s.duree, 0);
  const ok = Math.abs(planifiee - p.dureeEntretiensH) < 0.01;
  return {
    ok,
    annoncee: p.dureeEntretiensH,
    planifiee,
    message: ok
      ? `Durée planifiée conforme : ${planifiee} h d'entretiens sur ${p.dureeTotaleH} h annoncées.`
      : `Écart bloquant : ${planifiee} h planifiées pour ${p.dureeEntretiensH} h annoncées d'entretiens.`,
  };
}
