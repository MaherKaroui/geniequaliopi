/**
 * Sources communes aux pièces du critère 7 (IND 30-32) : un même fait (aléa de session,
 * date de l'analyse des risques, date d'arrêté des registres) est lu au même endroit par
 * toutes les pièces, pour qu'aucune ne contredise l'autre.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { entreesVeille } from "./veilleExploitee";
import { dateRevueDirection } from "./piecesTypeAudit";
import { typeAuditEffectif, sansRealisation } from "./typeAudit";
import { addBusinessDays } from "./docBuilder";
import type { TypePrestation } from "./qualite2026";

const v = (x: unknown) => (x == null ? "" : String(x).trim());
const isoLocal = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const isoDepuisFr = (d: string) => { const m = v(d).match(/^(\d{2})\/(\d{2})\/(\d{4})$/); return m ? `${m[3]}-${m[2]}-${m[1]}` : v(d).slice(0, 10); };

export function typePrestationOrganisme(o: OrganismeInfo): TypePrestation {
  const t = o.typesActions || [];
  return t.includes("apprentissage") ? "CFA" : t.includes("vae") ? "VAE" : t.includes("bilans-competences") ? "BC" : "AF";
}

export interface AleaSession { ref: string; date: string; cloture: string; partie: string; canal: string; desc: string; causes: string; action: string }

/** Enregistrement du suivi des dysfonctionnements (IND 31), repris tel quel par les autres pièces. */
export interface Dysfonctionnement extends AleaSession {
  type: "Interne" | "Externe";
  /** Risque de la cartographie (IND 32) que l'événement confirme. */
  risque: string;
}

/** Sessions du dossier (dates propres aux stagiaires, sinon dates de la formation), triées. */
function sessionsDossier(f: FormationInfo, stagiaires: StagiaireInfo[]): { debut: string; fin: string }[] {
  const brutes = stagiaires.map((s) => ({ debut: isoDepuisFr(v(s.dateDebutFormation) || v(f.dateDebut)), fin: isoDepuisFr(v(s.dateFinFormation) || v(f.dateFin)) }));
  if (!brutes.length) brutes.push({ debut: isoDepuisFr(v(f.dateDebut)), fin: isoDepuisFr(v(f.dateFin)) });
  const vues = new Map<string, { debut: string; fin: string }>();
  brutes.filter((s) => /^\d{4}-\d{2}-\d{2}$/.test(s.debut)).forEach((s) => vues.set(`${s.debut}|${s.fin}`, s));
  return [...vues.values()].sort((a, b) => a.debut.localeCompare(b.debut));
}

/**
 * Aléa de la première session commencée (IND 31) : même enregistrement dans le suivi des
 * dysfonctionnements, le tableau d'amélioration continue, le registre des réclamations, le bilan
 * formateur, l'analyse des risques et la revue de direction. Sans date de formation (dossier à
 * plusieurs sessions), la première session est celle du premier stagiaire.
 */
export function aleaSession(f: FormationInfo, stagiaires: StagiaireInfo[] = []): AleaSession | null {
  const premiere = v(f.dateDebut) ? isoDepuisFr(v(f.dateDebut)) : sessionsDossier(f, stagiaires)[0]?.debut || "";
  const debut = new Date(`${premiere}T00:00:00`);
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

const fmtFr = (iso: string) => iso.split("-").reverse().join("/");

/**
 * Dysfonctionnements propres à la préparation à l'examen VTC (T3P), datés sur les sessions du
 * dossier et rattachés à des faits vérifiés (veille IND 23) : jamais dans le futur.
 */
function dysfonctionnementsVTC(f: FormationInfo, stagiaires: StagiaireInfo[], auj: string): Omit<Dysfonctionnement, "ref">[] {
  const out: Omit<Dysfonctionnement, "ref">[] = [];
  const sessions = sessionsDossier(f, stagiaires).filter((s) => s.debut <= auj);
  const distanciel = /distanciel|distance|ligne|visio|meet|zoom/i.test(`${f.modalites} ${f.lieu}`) && !/mixte|pr[ée]sentiel/i.test(v(f.modalites));
  const terminee = sessions.find((s) => /^\d{4}-\d{2}-\d{2}$/.test(s.fin) && s.fin <= auj);
  if (distanciel && terminee) {
    const clo = addBusinessDays(terminee.fin, 10);
    out.push({
      date: fmtFr(terminee.fin), cloture: fmtFr(clo > auj ? auj : clo), type: "Interne", partie: "Stagiaire", canal: "Questionnaire de satisfaction à chaud",
      desc: "Demande de séances de conduite réelle pour préparer l'épreuve pratique d'admission : la formation à distance en travaille la méthode (simulation commentée d'une course) mais ne comprend pas de conduite en véhicule",
      causes: "Absence de conduite réelle insuffisamment expliquée lors de l'entretien préalable ; aucune solution d'entraînement en véhicule proposée au stagiaire",
      action: "Mention « conduite réelle en véhicule non incluse » portée au programme, à l'entretien préalable et à la convocation ; liste d'auto-écoles et de loueurs de véhicules VTC à double commande remise au stagiaire en fin de parcours",
      risque: "Information du public incomplète sur le contenu de la prestation",
    });
  }
  // Plateforme nationale Examen T3P (CMA France) en service depuis le 4 novembre 2025.
  const apresT3P = sessions.find((s) => s.debut >= "2025-11-04");
  if (apresT3P) {
    const clo = addBusinessDays(apresT3P.debut, 2);
    out.push({
      date: fmtFr(apresT3P.debut), cloture: fmtFr(clo > auj ? auj : clo), type: "Externe", partie: "Stagiaire ; CMA France (plateforme Examen T3P)", canal: "Oral en classe virtuelle",
      desc: "Inscription à l'examen VTC non finalisée : depuis le 04/11/2025 les inscriptions se font uniquement sur la plateforme nationale exament3p.fr et le tutoriel remis au stagiaire portait sur l'ancien site",
      causes: "Changement de plateforme d'inscription décidé par CMA France ; tutoriel interne pas encore mis à jour (action de veille en cours)",
      action: "Tutoriel refait sur exament3p.fr ; création du compte et dépôt des pièces accompagnés le premier jour ; inscription vérifiée en fin de parcours",
      risque: "Évolution réglementaire ou externe non prise en compte",
    });
  }
  return out;
}

/**
 * Tous les dysfonctionnements enregistrés (IND 31) : l'aléa de session (AC-D01) puis les
 * événements propres à la formation, numérotés AC-D02… dans l'ordre chronologique. Source unique
 * du suivi des dysfonctionnements, du tableau d'amélioration, du registre et des bilans.
 */
export function dysfonctionnements(f: FormationInfo, stagiaires: StagiaireInfo[] = [], today: Date = new Date()): Dysfonctionnement[] {
  const auj = isoLocal(today);
  const alea = aleaSession(f, stagiaires);
  const vtc = /\bvtc\b|\bt3p\b|rs\s?5637/i.test(`${v(f.intitule)} ${v(f.codeRNCP)}`);
  const autres = vtc ? dysfonctionnementsVTC(f, stagiaires, auj) : [];
  autres.sort((a, b) => isoDepuisFr(a.date).localeCompare(isoDepuisFr(b.date)));
  return [
    ...(alea ? [{ ...alea, type: "Externe" as const, risque: "Défaillance technique ou matérielle" }] : []),
    ...autres.map((d, i) => ({ ...d, ref: `AC-D${String(i + 2).padStart(2, "0")}` })),
  ];
}

/** Nombre de dysfonctionnements enregistrés — même source que le suivi des dysfonctionnements. */
export function nombreIncidents(f: FormationInfo, stagiaires: StagiaireInfo[] = []): number {
  return dysfonctionnements(f, stagiaires).length;
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
  if (!sansRealisation(typeAuditEffectif(o, today))) {
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
  if (!sansRealisation(typeAuditEffectif(o, today))) {
    const rd = isoLocal(dateRevueDirection(o, today));
    return rd < maj ? maj : rd;
  }
  const fins = [v(f.dateFin), ...stagiaires.map((s) => v(s.dateFinFormation))].map(isoDepuisFr).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && d <= auj).sort();
  const fin = fins.pop();
  return fin && fin > maj ? fin : maj;
}
