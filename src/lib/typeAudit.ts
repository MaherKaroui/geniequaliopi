/**
 * Type d'audit Qualiopi applicable au dossier : audit initial (nouvel entrant),
 * audit de surveillance (entre le 14e et le 22e mois du cycle) ou audit de
 * renouvellement (fin du cycle de 3 ans), ou audit complémentaire (extension du
 * certificat à une nouvelle catégorie d'action, auditée comme un nouvel entrant).
 *
 * Saisi dans organisme.typeAudit ; « auto » (défaut) le déduit du certificat.
 */
import type { OrganismeInfo } from "@/types/qualiopi";

export type TypeAudit = "initial" | "complementaire" | "surveillance" | "renouvellement";
export type TypeAuditSaisi = TypeAudit | "auto";

/** Version du guide de lecture du référentiel national qualité. */
export type VersionReferentiel = "V9" | "V10";

/** Indicateurs audités en « nouvel entrant » (formalisation seule), guide de lecture V9 ; 33 ajouté (décret 2026-728). */
export const INDICATEURS_NOUVEL_ENTRANT = [2, 3, 11, 13, 14, 19, 22, 24, 25, 26, 32, 33];
/** Guide de lecture V10 (novembre 2026) : les indicateurs 22 et 32 sortent de la liste, ils sont audités dès l'audit initial. */
export const INDICATEURS_NOUVEL_ENTRANT_V10 = [2, 3, 11, 13, 14, 19, 24, 25, 26];

export const indicateursNouvelEntrant = (version: VersionReferentiel = "V9") =>
  version === "V10" ? INDICATEURS_NOUVEL_ENTRANT_V10 : INDICATEURS_NOUVEL_ENTRANT;

export const LIBELLES_AUDIT: Record<TypeAudit, string> = {
  initial: "Audit initial (nouvel entrant)",
  complementaire: "Audit complémentaire (extension de périmètre)",
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

/** Audit sans réalisation attendue sur la catégorie : audit initial, ou audit complémentaire d'une nouvelle catégorie. */
export const sansRealisation = (t: TypeAudit) => t === "initial" || t === "complementaire";

export const estNouvelEntrant = (o?: Partial<OrganismeInfo> | null, today?: Date) => sansRealisation(typeAuditEffectif(o, today));

export const LIBELLES_REFERENTIEL: Record<VersionReferentiel, string> = {
  V9: "Guide de lecture V9 (8 janvier 2024)",
  V10: "Guide de lecture V10 (novembre 2026)",
};

/**
 * Version du guide de lecture appliquée au dossier :
 * - valeur saisie si elle n'est pas « auto » ;
 * - nouvel entrant (audit initial ou complémentaire) : V10 ;
 * - surveillance ou renouvellement : V9 (audit possible dans les conditions au 31/10/2026 jusqu'au 31/12/2026).
 */
export function versionReferentiel(o?: Partial<OrganismeInfo> | null, today?: Date): VersionReferentiel {
  const saisi = o?.referentielQualiopi || "auto";
  if (saisi !== "auto") return saisi;
  return estNouvelEntrant(o, today) ? "V10" : "V9";
}

/** Niveau de preuve attendu selon le type d'audit (phrase courte, guide V9 ou V10). */
export function attenduSelonAudit(type: TypeAudit, indicateur: number, version: VersionReferentiel = "V9"): string {
  const ne = indicateursNouvelEntrant(version).includes(indicateur);
  if (sansRealisation(type)) {
    if (ne) return `${type === "complementaire" ? "Extension de périmètre (nouvelle catégorie auditée comme un nouvel entrant)" : "Nouvel entrant"} : l'auditeur vérifie la formalisation du processus (procédures, outils, trames) ; la mise en œuvre sera vérifiée à l'audit de surveillance.`;
    if (version === "V10" && (indicateur === 22 || indicateur === 32)) {
      return "Nouvel entrant (décret n° 2026-728) : indicateur audité dès l'audit initial — processus formalisé ET preuves de mise en œuvre (actions de développement des compétences réalisées ; analyse des risques, audit interne et suivi des heures non réalisées).";
    }
    return `${type === "complementaire" ? "Audit complémentaire" : "Audit initial"} : processus formalisé ET premières preuves de mise en œuvre lorsqu'une prestation a déjà été réalisée.`;
  }
  if (type === "surveillance") {
    return "Surveillance : l'auditeur vérifie la mise en œuvre effective sur la période écoulée depuis l'audit initial (preuves datées, résultats, actions réalisées).";
  }
  return "Renouvellement : l'auditeur vérifie la mise en œuvre sur l'ensemble du cycle de 3 ans et l'amélioration démontrée (évolution des résultats, efficacité des actions).";
}
