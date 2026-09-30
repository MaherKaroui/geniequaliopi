/**
 * Type d'audit Qualiopi applicable au dossier : audit initial (nouvel entrant),
 * audit de surveillance (entre le 14e et le 22e mois du cycle) ou audit de
 * renouvellement (fin du cycle de 3 ans).
 *
 * Saisi dans organisme.typeAudit ; « auto » (défaut) le déduit du certificat.
 */
import type { OrganismeInfo } from "@/types/qualiopi";

export type TypeAudit = "initial" | "surveillance" | "renouvellement";
export type TypeAuditSaisi = TypeAudit | "auto";

/** Indicateurs audités en « nouvel entrant » (formalisation seule), guide de lecture V9 ; 33 ajouté (décret 2026-728). */
export const INDICATEURS_NOUVEL_ENTRANT = [2, 3, 11, 13, 14, 19, 22, 24, 25, 26, 32, 33];

export const LIBELLES_AUDIT: Record<TypeAudit, string> = {
  initial: "Audit initial (nouvel entrant)",
  surveillance: "Audit de surveillance",
  renouvellement: "Audit de renouvellement",
};

function parseDate(v?: string): Date | null {
  const t = (v || "").trim();
  if (!t) return null;
  const m = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const d = m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date(`${t.slice(0, 10)}T00:00:00`);
  return isNaN(d.getTime()) ? null : d;
}

/** Nombre de mois pleins entre deux dates. */
export function moisEntre(a: Date, b: Date): number {
  let m = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (b.getDate() < a.getDate()) m--;
  return m;
}

/**
 * Type d'audit effectif :
 * - valeur saisie si elle n'est pas « auto » ;
 * - sans certificat Qualiopi (numéro ou date d'obtention) : audit initial ;
 * - certificat obtenu depuis moins de 30 mois : surveillance ;
 * - au-delà : renouvellement.
 */
export function typeAuditEffectif(o?: Partial<OrganismeInfo> | null, today: Date = new Date()): TypeAudit {
  const saisi = (o?.typeAudit || "auto") as TypeAuditSaisi;
  if (saisi !== "auto") return saisi;
  const obtention = parseDate(o?.dateObtentionQualiopi);
  const numero = (o?.numeroCertificatQualiopi || "").trim();
  if (!obtention) return numero ? "surveillance" : "initial";
  return moisEntre(obtention, today) < 30 ? "surveillance" : "renouvellement";
}

export const estNouvelEntrant = (o?: Partial<OrganismeInfo> | null, today?: Date) => typeAuditEffectif(o, today) === "initial";

/** Niveau de preuve attendu selon le type d'audit (phrase courte, guide V9). */
export function attenduSelonAudit(type: TypeAudit, indicateur: number): string {
  const ne = INDICATEURS_NOUVEL_ENTRANT.includes(indicateur);
  if (type === "initial") {
    return ne
      ? "Nouvel entrant : l'auditeur vérifie la formalisation du processus (procédures, outils, trames) ; la mise en œuvre sera vérifiée à l'audit de surveillance."
      : "Audit initial : processus formalisé ET premières preuves de mise en œuvre lorsqu'une prestation a déjà été réalisée.";
  }
  if (type === "surveillance") {
    return "Surveillance : l'auditeur vérifie la mise en œuvre effective sur la période écoulée depuis l'audit initial (preuves datées, résultats, actions réalisées).";
  }
  return "Renouvellement : l'auditeur vérifie la mise en œuvre sur l'ensemble du cycle de 3 ans et l'amélioration démontrée (évolution des résultats, efficacité des actions).";
}
