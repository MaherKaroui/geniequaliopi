/**
 * Sources communes aux pièces du critère 7 (IND 30-32) : un même fait (aléa de session,
 * date de l'analyse des risques, date d'arrêté des registres) est lu au même endroit par
 * toutes les pièces, pour qu'aucune ne contredise l'autre.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { entreesVeille } from "./veilleExploitee";
import { dateRevueDirection } from "./piecesTypeAudit";
import { typeAuditEffectif } from "./typeAudit";
import type { TypePrestation } from "./qualite2026";

const v = (x: unknown) => (x == null ? "" : String(x).trim());
const isoLocal = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const isoDepuisFr = (d: string) => { const m = v(d).match(/^(\d{2})\/(\d{2})\/(\d{4})$/); return m ? `${m[3]}-${m[2]}-${m[1]}` : v(d).slice(0, 10); };

export function typePrestationOrganisme(o: OrganismeInfo): TypePrestation {
  const t = o.typesActions || [];
  return t.includes("apprentissage") ? "CFA" : t.includes("vae") ? "VAE" : t.includes("bilans-competences") ? "BC" : "AF";
}

export interface AleaSession { ref: string; date: string; cloture: string; partie: string; canal: string; desc: string; causes: string; action: string }

/**
 * Aléa de la première session commencée (IND 31) : même enregistrement dans le suivi des
 * dysfonctionnements, le tableau d'amélioration continue, le registre des réclamations, le bilan
 * formateur, l'analyse des risques et la revue de direction.
 */
export function aleaSession(f: FormationInfo): AleaSession | null {
  const debut = new Date(`${(f.dateDebut || "").slice(0, 10)}T00:00:00`);
  if (isNaN(debut.getTime())) return null;
  const now = new Date();
  if (debut > now) return null;
  const plus2 = new Date(debut);
  let k = 2;
  while (k > 0) { plus2.setDate(plus2.getDate() + 1); if (plus2.getDay() !== 0 && plus2.getDay() !== 6) k--; }
  const fmt = (d: Date) => `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  const distanciel = /distanciel|distance|ligne|visio|meet|zoom/i.test(`${f.modalites} ${f.lieu}`);
  const cloture = fmt(plus2 > now ? now : plus2);
  return distanciel
    ? { ref: "AC-D01", date: fmt(debut), cloture, partie: "Stagiaire", canal: "Email", desc: "Coupures de connexion d'un participant pendant la classe virtuelle", causes: "Connexion internet instable du participant ; lien de secours non communiqué", action: "Envoi systématique d'un second lien et du support avant chaque séance ; test de connexion la veille" }
    : { ref: "AC-D01", date: fmt(debut), cloture, partie: "Stagiaire", canal: "Oral en formation", desc: "Nuisances sonores dans la salle de formation", causes: "Travaux imprévus à proximité de la salle", action: "Changement de salle et vérification des conditions d'accueil la veille de chaque session" };
}

/** Nombre d'aléas enregistrés (0 ou 1) — même source que le suivi des dysfonctionnements. */
export function nombreIncidents(f: FormationInfo): number {
  return aleaSession(f) ? 1 : 0;
}

/**
 * Date de l'analyse des risques (IND 32). Elle se fonde sur le décret n° 2026-728 : elle ne peut pas
 * précéder sa prise en compte. Date retenue : réalisation de l'action de veille sur le décret, jamais
 * avant la V1 et, hors nouvel entrant, au plus tard la veille de la revue de direction.
 */
export function dateAnalyseRisques(o: OrganismeInfo, f: FormationInfo, today: Date = new Date()): string {
  const maj = v(o.dateMaj).slice(0, 10) || isoLocal(today);
  const decret = entreesVeille(o, f, "reglementaire", typePrestationOrganisme(o)).find((e) => /2026-728/.test(e.titre));
  if (!decret) return maj;
  let d = isoDepuisFr(decret.statut === "Réalisé" ? decret.echeance : decret.priseEnCompte);
  if (d < maj) d = maj;
  if (typeAuditEffectif(o, today) !== "initial") {
    const rd = dateRevueDirection(o, today);
    const veille = new Date(rd);
    do { veille.setDate(veille.getDate() - 1); } while (veille.getDay() === 0 || veille.getDay() === 6);
    const veilleIso = isoLocal(veille);
    if (d > veilleIso && veilleIso >= "2026-08-04" && veilleIso >= maj) d = veilleIso;
  }
  return d;
}

/**
 * Date d'arrêté du registre des réclamations : jour de la revue de direction (hors nouvel entrant),
 * sinon fin de la dernière session terminée, sinon date de MAJ — jamais après aujourd'hui.
 */
export function dateArreteRegistre(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = [], today: Date = new Date()): string {
  const maj = v(o.dateMaj).slice(0, 10) || isoLocal(today);
  const auj = isoLocal(today);
  if (typeAuditEffectif(o, today) !== "initial") {
    const rd = isoLocal(dateRevueDirection(o, today));
    return rd < maj ? maj : rd;
  }
  const fins = [v(f.dateFin), ...stagiaires.map((s) => v(s.dateFinFormation))].map(isoDepuisFr).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && d <= auj).sort();
  const fin = fins.pop();
  return fin && fin > maj ? fin : maj;
}
