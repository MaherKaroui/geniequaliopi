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
  // Traçabilité import (debug)
  rawDebut?: string;
  rawFin?: string;
  colDebut?: string;
  colFin?: string;
  source?: string; // feuille / section d'origine
}


export type VSSStatut = "réalisé" | "prévu" | "manquant";

export interface VSSSeance {
  semaine: number;
  date: string;        // ISO
  dateFr: string;      // jj/mm/aaaa
  jour: string;        // libellé jour
  heures: number;      // heures prévues ce jour
  realisees: number;   // heures effectivement réalisées (séances passées)
  cumul: number;       // cumul des heures prévues
  cumulRealise: number; // cumul des heures réalisées
  restant: number;     // heures restantes après cette séance
  statut: VSSStatut;
  creneau: string;     // plage horaire réaliste (ex. 09:00 - 12:30)
}

export interface VSSPlanning {
  apprenant: VSSApprenant;
  seances: VSSSeance[];
  totalPlanifie: number;
  totalRealise: number;     // heures déjà effectuées à ce jour
  totalAttendu: number;
  ecart: number;
  semainesDisponibles: number;
  capaciteMax: number;      // semaines * MAX_H_JOUR
  alertes: string[];
  notes?: string[];  // informations non bloquantes (rythme > 7 h/jour, etc.)
  valide: boolean;

}

export const MAX_H_JOUR = 7;
const PAS = 0.5; // arrondi au demi-heure


const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

const MOIS_FR: Record<string, number> = {
  janvier: 1, janv: 1, jan: 1, fevrier: 2, fev: 2, feb: 2, mars: 3, mar: 3,
  avril: 4, avr: 4, apr: 4, mai: 5, may: 5, juin: 6, jun: 6, juillet: 7, juil: 7, jul: 7,
  aout: 8, aug: 8, septembre: 9, sept: 9, sep: 9, octobre: 10, oct: 10,
  novembre: 11, nov: 11, decembre: 12, dec: 12,
};

/** Normalise n'importe quelle valeur de date (Date, série Excel, texte FR/ISO) en yyyy-mm-dd. */
export function toISO(v: any): string {
  if (v == null || v === "") return "";

  // Vraie date Excel / JS
  if (v instanceof Date && !isNaN(v.getTime())) {
    // Les dates lues par xlsx sont en UTC : on utilise les composantes UTC pour éviter le décalage
    const y = v.getUTCFullYear(), m = v.getUTCMonth() + 1, d = v.getUTCDate();
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  // Nombre de série Excel
  if (typeof v === "number" && Number.isFinite(v) && v > 20 && v < 100000) {
    const d = new Date(Date.UTC(1899, 11, 30) + Math.round(v) * 86400000);
    return d.toISOString().slice(0, 10);
  }

  // Texte : nettoyage des caractères invisibles / espaces insécables
  const s = String(v)
    .replace(/[\u200B-\u200D\uFEFF\u00A0\u202F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!s) return "";

  // ISO (avec ou sans heure)
  let m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;

  // jj/mm/aaaa, jj-mm-aa, jj.mm.aaaa
  m = s.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})/);
  if (m) {
    let y = m[3];
    if (y.length === 2) y = Number(y) > 50 ? `19${y}` : `20${y}`;
    const day = Number(m[1]), mon = Number(m[2]);
    if (day >= 1 && day <= 31 && mon >= 1 && mon <= 12) {
      return `${y}-${String(mon).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
    return "";
  }

  // 1er septembre 2025 / 1 sept 2025
  m = s.match(/^(\d{1,2})(?:er)?\s+([a-zA-Zéûôàè.]+)\s+(\d{4})/);
  if (m) {
    const key = m[2].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\./g, "");
    const mon = MOIS_FR[key];
    if (mon) return `${m[3]}-${String(mon).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  }

  // Chaîne numérique = série Excel
  const n = Number(s.replace(",", "."));
  if (Number.isFinite(n) && n > 20 && n < 100000) {
    const d = new Date(Date.UTC(1899, 11, 30) + Math.round(n) * 86400000);
    return d.toISOString().slice(0, 10);
  }

  // Dernier recours : parsing natif
  const nat = new Date(s);
  if (!isNaN(nat.getTime()) && nat.getFullYear() > 1950 && nat.getFullYear() < 2200) {
    return `${nat.getFullYear()}-${String(nat.getMonth() + 1).padStart(2, "0")}-${String(nat.getDate()).padStart(2, "0")}`;
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
    const detail: string[] = [];
    if (!debut || isNaN(debut.getTime())) {
      detail.push(`début — colonne « ${a.colDebut || "Date de début"} » : valeur importée « ${a.rawDebut || "(vide)"} »`);
    }
    if (!fin || isNaN(fin.getTime())) {
      detail.push(`fin — colonne « ${a.colFin || "Date de fin"} » : valeur importée « ${a.rawFin || "(vide)"} »`);
    }
    return {
      apprenant: a, seances: [], totalPlanifie: 0, totalAttendu: total,
      ecart: -total, semainesDisponibles: 0, capaciteMax: 0,
      alertes: [`${a.nom || "Apprenant"} — date(s) invalide(s) : ${detail.join(" ; ")}.`],
      valide: false,
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

  const notes: string[] = [];
  if (total > capacite) {
    const rythme = Math.round((total / nbSemaines) * 10) / 10;
    notes.push(
      `Rythme renforcé : ${total} h réparties sur ${nbSemaines} semaine(s), soit ${rythme} h par jour de connexion ` +
      `(au-delà du repère de ${MAX_H_JOUR} h/jour). Le total reste couvert intégralement.`
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
    alertes, notes, valide: alertes.length === 0,
  };
}


/* ---------------- Import Excel (export suivi parcours VSS) ---------------- */

const norm = (s: any) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u200B-\u200D\uFEFF\u00A0\u202F]/g, " ")
    .replace(/[^a-z0-9]/g, "");

const isNomHeader = (h: string) =>
  ["name", "nom", "apprenant", "nomprenom", "prenomnom", "stagiaire", "nomapprenant", "nomdelapprenant"].includes(h);
const isDebutHeader = (h: string) =>
  (h.includes("start") && (h.includes("periode") || h.includes("formation"))) ||
  h === "startdate" || h === "start" ||
  (h.includes("date") && h.includes("debut"));
const isFinHeader = (h: string) =>
  (h.includes("end") && (h.includes("periode") || h.includes("formation"))) ||
  h === "enddate" || h === "end" ||
  (h.includes("date") && h.includes("fin"));
const isHeuresHeader = (h: string) =>
  (h.includes("heure") && (h.includes("connexion") || h.includes("vss") || h.includes("couvrir"))) ||
  h === "heuresvss" || h === "nombreheures";

interface ColMap {
  nom: number; debut: number; fin: number; heures: number;
  email: number; entreprise: number; formation: number; promotion: number;
  labels: string[];
}

function mapHeader(row: any[]): ColMap | null {
  const h = row.map(norm);
  const find = (fn: (x: string) => boolean) => h.findIndex((x) => x && fn(x));
  const map: ColMap = {
    nom: find(isNomHeader),
    debut: find(isDebutHeader),
    fin: find(isFinHeader),
    heures: find(isHeuresHeader),
    email: find((x) => x.includes("email") || x.includes("courriel")),
    entreprise: h.findIndex((x) => x === "entreprise" || x === "nomemployeur"),
    formation: h.findIndex((x) => x === "formation"),
    promotion: h.findIndex((x) => x === "promotion"),
    labels: row.map((c) => String(c ?? "").trim()),
  };
  // Un en-tête valide identifie au moins le nom + une date
  if (map.nom < 0 || (map.debut < 0 && map.fin < 0)) return null;
  return map;
}

/** Ligne de titre de section / total / ligne d'en-tête répétée ? */
function isJunkRow(nomBrut: string): boolean {
  const n = norm(nomBrut);
  if (!n) return true;
  if (isNomHeader(n)) return true;
  const bad = ["total", "suiviactif", "miseengarde", "avertissement", "traitementrupture", "portefeuille", "qualification", "suiviparcours"];
  return bad.some((b) => n.startsWith(b) || n.includes(b));
}

export function parseSuiviVSSXlsx(data: ArrayBuffer): VSSApprenant[] {
  const wb = XLSX.read(data, { type: "array", cellDates: true });
  const out: VSSApprenant[] = [];

  wb.SheetNames.forEach((sheetName) => {
    const matrix: any[][] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
      header: 1, defval: "", raw: false, cellDates: true, blankrows: false,
    } as any);
    // raw:false convertirait les dates en texte ; on relit en brut pour garder les Date
    const matrixRaw: any[][] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
      header: 1, defval: "", raw: true, blankrows: false,
    } as any);

    let map: ColMap | null = null;
    let section = sheetName;

    for (let i = 0; i < matrixRaw.length; i++) {
      const rowRaw = matrixRaw[i] || [];
      const rowTxt = matrix[i] || [];

      const maybe = mapHeader(rowRaw);
      if (maybe) { map = maybe; continue; }
      if (!map) {
        const label = String(rowRaw[0] ?? "").trim();
        if (label) section = label;
        continue;
      }

      const nomBrut = String(rowRaw[map.nom] ?? "").trim();
      if (isJunkRow(nomBrut)) {
        if (nomBrut) section = nomBrut;
        continue;
      }

      const pick = (idx: number) => {
        if (idx < 0) return { raw: "", val: "" as any };
        const v = rowRaw[idx];
        const t = rowTxt[idx];
        const val = v !== "" && v != null ? v : t;
        const raw = v instanceof Date ? frDate(toISO(v)) : String(t ?? v ?? "").trim();
        return { raw, val };
      };

      const dDeb = pick(map.debut);
      const dFin = pick(map.fin);
      let isoDeb = toISO(dDeb.val) || toISO(dDeb.raw);
      let isoFin = toISO(dFin.val) || toISO(dFin.raw);

      const heuresBrut = map.heures >= 0 ? (rowRaw[map.heures] ?? rowTxt[map.heures]) : 0;
      const heures = Number(String(heuresBrut ?? 0).replace(/[^\d,.-]/g, "").replace(",", ".")) || 0;

      out.push({
        id: `vss-${sheetName}-${i}-${nomBrut.replace(/\s+/g, "_")}`,
        nom: nomBrut,
        email: map.email >= 0 ? String(rowRaw[map.email] ?? "").trim() : "",
        entreprise: map.entreprise >= 0 ? String(rowRaw[map.entreprise] ?? "").trim() : "",
        formation: map.formation >= 0 ? String(rowRaw[map.formation] ?? "").trim() : "",
        promotion: map.promotion >= 0 ? String(rowRaw[map.promotion] ?? "").trim() : "",
        dateDebut: isoDeb,
        dateFin: isoFin,
        heuresVSS: heures,
        rawDebut: dDeb.raw,
        rawFin: dFin.raw,
        colDebut: map.debut >= 0 ? map.labels[map.debut] : "(colonne introuvable)",
        colFin: map.fin >= 0 ? map.labels[map.fin] : "(colonne introuvable)",
        source: section,
      });
    }
  });

  return out;
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
