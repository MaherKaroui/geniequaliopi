// Suivi du temps de connexion VSS — planification 1 jour / semaine
// Source de données : export "SUIVI PARCOURS APPRENANT – VSS" (AKTO)
import * as XLSX from "xlsx";

export interface VSSApprenant {
  id: string;
  nom: string;
  email?: string;
  entreprise?: string;
  formation?: string;
  promotion?: string;
  dateDebut: string; // ISO yyyy-mm-dd
  dateFin: string;   // ISO yyyy-mm-dd
  heuresVSS: number; // total d'heures de connexion à couvrir
  heuresRealisees?: number;
}

export type VSSStatut = "réalisé" | "prévu" | "manquant";

export interface VSSSeance {
  semaine: number;
  date: string;        // ISO
  dateFr: string;      // jj/mm/aaaa
  jour: string;        // libellé jour
  heures: number;      // heures prévues ce jour
  cumul: number;       // cumul des heures prévues
  restant: number;     // heures restantes après cette séance
  statut: VSSStatut;
}

export interface VSSPlanning {
  apprenant: VSSApprenant;
  seances: VSSSeance[];
  totalPlanifie: number;
  totalAttendu: number;
  ecart: number;
  semainesDisponibles: number;
  capaciteMax: number;      // semaines * MAX_H_JOUR
  alertes: string[];
  valide: boolean;
}

export const MAX_H_JOUR = 7;
const PAS = 0.5; // arrondi au demi-heure

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

export function toISO(v: any): string {
  if (!v) return "";
  if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString().slice(0, 10);
  const s = String(v).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const m = s.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})/);
  if (m) {
    let y = m[3];
    if (y.length === 2) y = Number(y) > 50 ? `19${y}` : `20${y}`;
    return `${y}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  }
  const n = Number(s);

  if (Number.isFinite(n) && n > 1000 && n < 100000) {
    const d = new Date(Date.UTC(1899, 11, 30) + n * 86400000);
    return d.toISOString().slice(0, 10);
  }
  return "";
}

export function frDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/**
 * Génère le planning de connexion VSS : 1 jour par semaine entre dateDebut et dateFin,
 * en répartissant exactement `heuresVSS` sur les semaines disponibles.
 */
export function genererPlanningVSS(a: VSSApprenant, today = new Date()): VSSPlanning {
  const alertes: string[] = [];
  const total = Math.max(0, Number(a.heuresVSS) || 0);
  const debut = a.dateDebut ? new Date(a.dateDebut + "T00:00:00") : null;
  const fin = a.dateFin ? new Date(a.dateFin + "T00:00:00") : null;

  if (!debut || !fin || isNaN(debut.getTime()) || isNaN(fin.getTime())) {
    return {
      apprenant: a, seances: [], totalPlanifie: 0, totalAttendu: total,
      ecart: -total, semainesDisponibles: 0, capaciteMax: 0,
      alertes: ["Dates de début et/ou de fin manquantes ou invalides."], valide: false,
    };
  }
  if (fin < debut) {
    return {
      apprenant: a, seances: [], totalPlanifie: 0, totalAttendu: total,
      ecart: -total, semainesDisponibles: 0, capaciteMax: 0,
      alertes: ["La date de fin est antérieure à la date de début."], valide: false,
    };
  }

  const nbSemaines = Math.max(1, Math.floor((fin.getTime() - debut.getTime()) / (7 * 86400000)) + 1);
  const capacite = nbSemaines * MAX_H_JOUR;

  if (total > capacite) {
    alertes.push(
      `Période insuffisante : ${total} h à couvrir mais seulement ${nbSemaines} semaine(s) disponible(s) ` +
      `(capacité max ${capacite} h à raison d'un jour de ${MAX_H_JOUR} h par semaine). ` +
      `Élargir la période ou augmenter le rythme hebdomadaire.`
    );
  }

  // Répartition égale + méthode du plus fort reste, arrondie au pas de 0,5 h
  const unitesTotal = Math.round(total / PAS);
  const base = Math.floor(unitesTotal / nbSemaines);
  const reste = unitesTotal - base * nbSemaines;

  const seances: VSSSeance[] = [];
  let cumul = 0;
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  for (let i = 0; i < nbSemaines; i++) {
    const d = new Date(debut.getTime() + i * 7 * 86400000);
    if (d > fin) break;
    const unites = base + (i < reste ? 1 : 0);
    const heures = unites * PAS;
    cumul += heures;
    const iso = d.toISOString().slice(0, 10);
    const passe = d.getTime() <= t0;
    const realiseesCumul = a.heuresRealisees ?? null;
    let statut: VSSStatut = passe ? "réalisé" : "prévu";
    if (passe && realiseesCumul != null && realiseesCumul < cumul) statut = "manquant";
    seances.push({
      semaine: i + 1,
      date: iso,
      dateFr: frDate(iso),
      jour: JOURS[d.getDay()],
      heures: Math.round(heures * 100) / 100,
      cumul: Math.round(cumul * 100) / 100,
      restant: Math.round((total - cumul) * 100) / 100,
      statut,
    });
  }

  const totalPlanifie = Math.round(seances.reduce((s, x) => s + x.heures, 0) * 100) / 100;
  const ecart = Math.round((totalPlanifie - total) * 100) / 100;

  if (ecart < 0) alertes.push(`Total planifié inférieur aux heures attendues : ${totalPlanifie} h / ${total} h (manque ${Math.abs(ecart)} h).`);
  if (ecart > 0) alertes.push(`Total planifié supérieur aux heures attendues : ${totalPlanifie} h / ${total} h (dépassement de ${ecart} h).`);
  if (total === 0) alertes.push("Aucune heure de connexion VSS renseignée pour cet apprenant.");

  return {
    apprenant: a, seances, totalPlanifie, totalAttendu: total, ecart,
    semainesDisponibles: nbSemaines, capaciteMax: capacite,
    alertes, valide: alertes.length === 0,
  };
}

/* ---------------- Import Excel (export suivi parcours VSS) ---------------- */

function getCol(row: Record<string, any>, ...keys: string[]): any {
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
  for (const k of keys) {
    const kn = norm(k);
    for (const c of Object.keys(row)) {
      if (norm(c) === kn && row[c] !== "" && row[c] != null) return row[c];
    }
  }
  return "";
}

export function parseSuiviVSSXlsx(data: ArrayBuffer): VSSApprenant[] {
  const wb = XLSX.read(data, { type: "array", cellDates: true });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const matrix: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", raw: true });

  let headerIdx = 0;
  for (let i = 0; i < Math.min(matrix.length, 15); i++) {
    const r = matrix[i].map((c) => String(c).toLowerCase());
    if (r.some((c) => c === "name" || c === "nom") && r.some((c) => c.includes("heures de connexion"))) {
      headerIdx = i; break;
    }
  }
  const headers = matrix[headerIdx].map((h) => String(h).trim());
  const rows = matrix.slice(headerIdx + 1)
    .filter((r) => r.some((c) => c !== "" && c != null))
    .map((r) => {
      const o: Record<string, any> = {};
      headers.forEach((h, i) => { if (h) o[h] = r[i] ?? ""; });
      return o;
    });

  return rows.map((row, i) => {
    const nom = String(getCol(row, "Name", "Nom", "Apprenant", "Nom prénom") || "").trim();
    if (!nom) return null;
    return {
      id: `vss-${i}-${nom.replace(/\s+/g, "_")}`,
      nom,
      email: String(getCol(row, "Email apprenant", "Email", "Courriel") || ""),
      entreprise: String(getCol(row, "Entreprise", "Nom employeur") || ""),
      formation: String(getCol(row, "Formation") || ""),
      promotion: String(getCol(row, "Promotion") || ""),
      dateDebut: toISO(getCol(row, "Période de formation - Start", "Periode de formation Start", "Date de début", "Date de début DOKEOS")),
      dateFin: toISO(getCol(row, "Période de formation - End", "Periode de formation End", "Date de fin")),
      heuresVSS: Number(String(getCol(row, "Nombre heures de connexion", "Heures de connexion", "Heures VSS") || 0).replace(",", ".")) || 0,
      heuresRealisees: undefined,
    } as VSSApprenant;
  }).filter(Boolean) as VSSApprenant[];
}

/* ---------------- Export Excel ---------------- */

export function exportPlanningsVSSXlsx(plannings: VSSPlanning[]): Blob {
  const wb = XLSX.utils.book_new();

  const synth = [
    ["Apprenant", "Entreprise", "Formation", "Date de début", "Date de fin", "Semaines", "Heures VSS prévues", "Total planifié", "Écart", "Statut"],
    ...plannings.map((p) => [
      p.apprenant.nom, p.apprenant.entreprise || "", p.apprenant.formation || "",
      frDate(p.apprenant.dateDebut), frDate(p.apprenant.dateFin),
      p.semainesDisponibles, p.totalAttendu, p.totalPlanifie, p.ecart,
      p.valide ? "Conforme" : p.alertes[0] || "Alerte",
    ]),
  ];
  const wsS = XLSX.utils.aoa_to_sheet(synth);
  wsS["!cols"] = [{ wch: 26 }, { wch: 22 }, { wch: 18 }, { wch: 14 }, { wch: 14 }, { wch: 10 }, { wch: 18 }, { wch: 14 }, { wch: 10 }, { wch: 46 }];
  XLSX.utils.book_append_sheet(wb, wsS, "Synthèse VSS");

  const detail = [
    ["Apprenant", "Date de début", "Date de fin", "Semaine", "Date prévue de connexion", "Jour", "Heures prévues", "Total cumulé", "Heures restantes", "Statut"],
  ];
  plannings.forEach((p) => {
    p.seances.forEach((s) => {
      detail.push([
        p.apprenant.nom, frDate(p.apprenant.dateDebut), frDate(p.apprenant.dateFin),
        `S${s.semaine}` as any, s.dateFr, s.jour, s.heures as any, s.cumul as any, s.restant as any, s.statut,
      ]);
    });
  });
  const wsD = XLSX.utils.aoa_to_sheet(detail);
  wsD["!cols"] = [{ wch: 26 }, { wch: 14 }, { wch: 14 }, { wch: 10 }, { wch: 24 }, { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 16 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, wsD, "Détail connexions");

  const out = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  return new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}

/** Convertit des stagiaires du formulaire en apprenants VSS (heures par défaut = 0) */
export function stagiairesToVSS(
  stagiaires: { nom: string; prenom: string; entreprise?: string; dateDebutFormation?: string; dateFinFormation?: string }[],
  fallbackDebut: string,
  fallbackFin: string,
  heuresParDefaut = 0,
): VSSApprenant[] {
  return stagiaires.map((s, i) => ({
    id: `stg-${i}`,
    nom: `${s.nom || ""} ${s.prenom || ""}`.trim() || `Apprenant ${i + 1}`,
    entreprise: s.entreprise || "",
    dateDebut: toISO(s.dateDebutFormation || fallbackDebut),
    dateFin: toISO(s.dateFinFormation || fallbackFin),
    heuresVSS: heuresParDefaut,
  }));
}
