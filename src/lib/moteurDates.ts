/**
 * MESSAGE 14 — MOTEUR DE DATES
 *
 * Toutes les dates d'un dossier dérivent des seules dates saisies dans le
 * formulaire Formation (dateDebut, dateFin, dureeTotaleH). Aucun document ne
 * re-saisit une date : il consomme le résultat de `calculerDatesDossier`.
 */

export type TypeContractualisation = "individuel" | "cpf" | "tripartite";

export interface EntreeDates {
  dateDebut: Date;
  dateFin: Date;
  dureeTotaleH: number;
  typeContrat?: TypeContractualisation;
  /** true = destruction des documents dès la fin de la prestation */
  destructionImmediate?: boolean;
  /** Date de réalisation effective du suivi à 6 mois, si déjà réalisé */
  suiviRealise?: Date | null;
}

export interface DatesDossier {
  entretienPrealable: Date;
  analyseBesoin: Date;
  envoiContrat: Date;
  contractualisation: Date;
  delaiRetractationJours: number;
  finDelaiRetractation: Date;
  remiseLivretAccueil: Date;
  remiseReglementInterieur: Date;
  remiseProcedureReclamation: Date;
  testPositionnement: Date;
  seance1: Date;
  derniereSeance: Date;
  entretienIntermediaire: Date;
  remiseDocumentSynthese: Date;
  certificatRealisation: Date;
  satisfactionChaud: Date;
  satisfactionChaudLimite: Date;
  suivi6Mois: Date;
  suivi6MoisMin: Date;
  suivi6MoisMax: Date;
  satisfactionFroid: Date;
  relance1Suivi: Date | null;
  relance2Suivi: Date | null;
  destructionDocuments: Date;
}

/* ------------------------------------------------------------------ */
/* Calendrier : dimanches et jours fériés français                      */
/* ------------------------------------------------------------------ */

/** Dimanche de Pâques (algorithme de Meeus/Jones/Butcher). */
function paques(annee: number): Date {
  const a = annee % 19, b = Math.floor(annee / 100), c = annee % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * m + 114) / 31);
  const jour = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(annee, mois - 1, jour);
}

const cacheFeries = new Map<number, string[]>();

function cle(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/** Liste des jours fériés légaux français (métropole) pour une année. */
export function joursFeriesFR(annee: number): string[] {
  const hit = cacheFeries.get(annee);
  if (hit) return hit;
  const p = paques(annee);
  const plus = (n: number) => { const x = new Date(p); x.setDate(x.getDate() + n); return x; };
  const liste = [
    new Date(annee, 0, 1),    // Jour de l'an
    plus(1),                  // Lundi de Pâques
    new Date(annee, 4, 1),    // Fête du travail
    new Date(annee, 4, 8),    // Victoire 1945
    plus(39),                 // Ascension
    plus(50),                 // Lundi de Pentecôte
    new Date(annee, 6, 14),   // Fête nationale
    new Date(annee, 7, 15),   // Assomption
    new Date(annee, 10, 1),   // Toussaint
    new Date(annee, 10, 11),  // Armistice
    new Date(annee, 11, 25),  // Noël
  ].map(cle);
  cacheFeries.set(annee, liste);
  return liste;
}

export function estFerie(d: Date): boolean {
  return joursFeriesFR(d.getFullYear()).includes(cle(d));
}

export function estDimanche(d: Date): boolean {
  return d.getDay() === 0;
}

/** Aucune séance ne peut être posée un dimanche ou un jour férié. */
export function estJourOuvrable(d: Date): boolean {
  return !estDimanche(d) && !estFerie(d);
}

/** Décale la date au prochain jour ouvrable (dimanche / férié exclus). */
export function prochainJourOuvrable(d: Date): Date {
  const x = new Date(d);
  let guard = 0;
  while (!estJourOuvrable(x) && guard < 30) { x.setDate(x.getDate() + 1); guard++; }
  return x;
}

function addJours(d: Date, n: number): Date {
  const x = new Date(d); x.setDate(x.getDate() + n); return x;
}

function addMois(d: Date, n: number): Date {
  const x = new Date(d); x.setMonth(x.getMonth() + n); return x;
}

/** Retire n jours ouvrés (lundi-vendredi, hors fériés). */
function moinsJoursOuvres(d: Date, n: number): Date {
  const x = new Date(d);
  let restants = n;
  while (restants > 0) {
    x.setDate(x.getDate() - 1);
    if (x.getDay() !== 0 && x.getDay() !== 6 && !estFerie(x)) restants--;
  }
  return x;
}

/** Délai de rétractation applicable selon le mode de contractualisation. */
export function delaiRetractation(type: TypeContractualisation): { jours: number; ouvres: boolean; libelle: string } {
  if (type === "cpf") return { jours: 4, ouvres: true, libelle: "4 jours ouvrés (inscription Mon Compte Formation)" };
  if (type === "tripartite") return { jours: 10, ouvres: false, libelle: "10 jours d'acceptation de la convention tripartite (art. R6313-7)" };
  return { jours: 14, ouvres: false, libelle: "14 jours de rétractation (art. L6353-5)" };
}

/* ------------------------------------------------------------------ */
/* Dérivation                                                          */
/* ------------------------------------------------------------------ */

export function calculerDatesDossier(p: EntreeDates): DatesDossier {
  const type = p.typeContrat || "individuel";
  const dr = delaiRetractation(type);

  const contractualisation = dr.ouvres
    ? moinsJoursOuvres(p.dateDebut, dr.jours)
    : addJours(p.dateDebut, -dr.jours);
  const envoiContrat = addJours(contractualisation, -2);
  const entretienPrealable = addJours(contractualisation, -7);
  const finDelaiRetractation = dr.ouvres ? p.dateDebut : addJours(contractualisation, dr.jours);

  // Test de positionnement : à mi-chemin entre contractualisation et début.
  const testPositionnement = prochainJourOuvrable(
    new Date((contractualisation.getTime() + p.dateDebut.getTime()) / 2),
  );

  const milieu = new Date((p.dateDebut.getTime() + p.dateFin.getTime()) / 2);
  const suivi = addMois(p.dateFin, 6);

  return {
    entretienPrealable,
    analyseBesoin: entretienPrealable,
    envoiContrat,
    contractualisation,
    delaiRetractationJours: dr.jours,
    finDelaiRetractation,
    remiseLivretAccueil: p.dateDebut,
    remiseReglementInterieur: p.dateDebut,
    remiseProcedureReclamation: p.dateDebut,
    testPositionnement,
    seance1: p.dateDebut,
    derniereSeance: p.dateFin,
    entretienIntermediaire: prochainJourOuvrable(milieu),
    remiseDocumentSynthese: p.dateFin,
    certificatRealisation: p.dateFin,
    satisfactionChaud: p.dateFin,
    satisfactionChaudLimite: addJours(p.dateFin, 7),
    suivi6Mois: suivi,
    suivi6MoisMin: addJours(suivi, -30),
    suivi6MoisMax: addJours(suivi, 30),
    satisfactionFroid: suivi,
    relance1Suivi: p.suiviRealise ? null : addJours(suivi, 7),
    relance2Suivi: p.suiviRealise ? null : addJours(suivi, 15),
    destructionDocuments: p.destructionImmediate ? p.dateFin : addMois(p.dateFin, 12),
  };
}

/* ------------------------------------------------------------------ */
/* Contraintes bloquantes                                              */
/* ------------------------------------------------------------------ */

export interface AnomalieDate {
  code: string;
  message: string;
}

export interface EvenementDeclare {
  libelle: string;
  date: Date;
  realise?: boolean;
}

export interface EntreeSortie {
  libelle: string;
  entree: Date;
  sortie: Date;
}

/** Renvoie la liste des anomalies bloquantes ; vide = génération autorisée. */
export function controlerDates(
  p: EntreeDates,
  d: DatesDossier,
  opts?: { mouvements?: EntreeSortie[]; evenements?: EvenementDeclare[]; aujourdhui?: Date },
): AnomalieDate[] {
  const a: AnomalieDate[] = [];
  const now = opts?.aujourdhui || new Date();

  if (!(p.dateFin > p.dateDebut)) {
    a.push({ code: "D01", message: "La date de fin doit être postérieure à la date de début de la prestation." });
  }
  if (!(d.contractualisation <= addJours(p.dateDebut, -d.delaiRetractationJours))) {
    a.push({
      code: "D02",
      message: `La contractualisation doit intervenir au plus tard le ${d.contractualisation.toLocaleDateString("fr-FR")} pour respecter le délai de ${d.delaiRetractationJours} jours.`,
    });
  }
  for (const m of opts?.mouvements || []) {
    if (m.sortie < m.entree) {
      a.push({ code: "D03", message: `${m.libelle} : la date de sortie est antérieure à la date d'entrée.` });
    }
  }
  const ecartMois = (d.suivi6Mois.getTime() - p.dateFin.getTime()) / (30.44 * 86400000);
  if (ecartMois < 5 || ecartMois > 8) {
    a.push({ code: "D04", message: "Le suivi doit être réalisé entre 5 et 8 mois après la fin de la prestation." });
  }
  for (const e of opts?.evenements || []) {
    if (e.realise && e.date > now) {
      a.push({ code: "D06", message: `${e.libelle} est déclaré réalisé alors que sa date (${e.date.toLocaleDateString("fr-FR")}) est postérieure à aujourd'hui.` });
    }
  }
  if (p.suiviRealise && (d.relance1Suivi || d.relance2Suivi)) {
    a.push({ code: "D05", message: "Aucune relance ne peut être datée après un suivi déjà déclaré réalisé." });
  }
  return a;
}

/** Récapitulatif « X documents mis à jour » après modification des dates. */
export function diffDates(avant: DatesDossier, apres: DatesDossier): string[] {
  const modifs: string[] = [];
  (Object.keys(apres) as Array<keyof DatesDossier>).forEach((k) => {
    const va = avant[k], vb = apres[k];
    if (va instanceof Date && vb instanceof Date && va.getTime() !== vb.getTime()) {
      modifs.push(`${k} : ${va.toLocaleDateString("fr-FR")} → ${vb.toLocaleDateString("fr-FR")}`);
    }
  });
  return modifs;
}

/**
 * Une signature apposée avant un recalcul de dates devient caduque :
 * elle ne peut jamais être reportée sur la nouvelle version du document.
 */
export function signaturesInvalidees(
  signatures: Array<{ piece: string; role: string; dateApposition: Date }>,
  dateRecalcul: Date,
): Array<{ piece: string; role: string }> {
  return signatures
    .filter((s) => s.dateApposition < dateRecalcul)
    .map((s) => ({ piece: s.piece, role: s.role }));
}
