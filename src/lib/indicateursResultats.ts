import type { FormationInfo, StagiaireInfo } from "@/types/qualiopi";

const v = (x?: string) => (x || "").trim();

/** Taux de satisfaction saisi, formaté « 95 % (sur 15 avis) ». Null si non saisi. */
export function getSatisfactionLabel(f?: Partial<FormationInfo>): string | null {
  const taux = v(f?.tauxSatisfaction);
  if (!taux) return null;
  const nb = v(f?.nombreAvisSatisfaction);
  const t = taux.replace(/\s*%\s*$/, "");
  return nb ? `${t} % (sur ${nb} avis)` : `${t} %`;
}

export function getAssiduiteLabel(f?: Partial<FormationInfo>): string | null {
  const t = v(f?.tauxAssiduite);
  return t ? `${t.replace(/\s*%\s*$/, "")} %` : null;
}

export function getNombreStagiairesFormes(f?: Partial<FormationInfo>): string | null {
  return v(f?.nombreStagiairesFormes) || null;
}

/** Taux d'obtention calculé depuis admis / présentés. Null si l'un des deux est vide ou invalide. */
export function getTauxObtention(f?: Partial<FormationInfo>): { presentes: number; admis: number; taux: number } | null {
  const p = parseFloat(v(f?.nbPresentesCertification).replace(",", "."));
  const a = parseFloat(v(f?.nbAdmisCertification).replace(",", "."));
  if (!isFinite(p) || !isFinite(a) || p <= 0) return null;
  return { presentes: p, admis: a, taux: Math.round((a / p) * 100) };
}

export function getCommentaireIndicateurs(f?: Partial<FormationInfo>): string | null {
  return v(f?.commentaireIndicateurs) || null;
}

export const NON_COLLECTE = "Non collecté à ce jour";

export type RepartitionAnnee = { annee: number; parMois: number[]; total: number };

/**
 * Répartition mensuelle réelle des stagiaires, par année, à partir des dates
 * de début individuelles (repli : date de début de la formation).
 */
export function getRepartitionParAnnee(f: Partial<FormationInfo> | undefined, stagiaires: StagiaireInfo[]): RepartitionAnnee[] {
  const map = new Map<number, number[]>();
  const valides = stagiaires.filter(s => s.nom && s.nom.trim());
  valides.forEach(s => {
    const d = v(s.dateDebutFormation) || v(f?.dateDebut);
    if (!d) return;
    const pd = new Date(d + "T00:00:00");
    if (isNaN(pd.getTime())) return;
    const y = pd.getFullYear();
    if (!map.has(y)) map.set(y, new Array(12).fill(0));
    map.get(y)![pd.getMonth()]++;
  });
  return [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([annee, parMois]) => ({ annee, parMois, total: parMois.reduce((x, y2) => x + y2, 0) }));
}

type CleIndicateurAuto = "anneeIndicateurs" | "nombreStagiairesFormes" | "nombreAvisSatisfaction" | "tauxSatisfaction" | "tauxAssiduite";
const CLES_AUTO: CleIndicateurAuto[] = ["anneeIndicateurs", "nombreStagiairesFormes", "nombreAvisSatisfaction", "tauxSatisfaction", "tauxAssiduite"];

/**
 * Indicateurs de résultats (critère 1) déduits du dossier :
 * année = année de fin de la formation ; stagiaires formés = stagiaires saisis ;
 * avis = stagiaires dont la formation est terminée (questionnaire de fin rempli) ;
 * satisfaction et assiduité = 100 % dès qu'au moins une formation est terminée
 * (questionnaires et émargements du dossier) ; rien tant qu'aucune n'est terminée.
 */
export function calculerIndicateursAuto(f: Partial<FormationInfo>, stagiaires: StagiaireInfo[], aujourdhui = new Date()): Record<CleIndicateurAuto, string> {
  const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const today = iso(aujourdhui);
  const nommes = stagiaires.filter(s => v(s.nom) || v(s.prenom));
  const fin = (s?: StagiaireInfo) => v(s?.dateFinFormation).slice(0, 10) || v(f.dateFin).slice(0, 10);
  const fins = (nommes.length ? nommes.map(fin) : [v(f.dateFin).slice(0, 10)]).filter(Boolean).sort();
  const derniere = fins[fins.length - 1] || v(f.dateDebut).slice(0, 10);
  const termines = nommes.filter(s => { const d = fin(s); return !!d && d < today; });
  return {
    anneeIndicateurs: derniere ? derniere.slice(0, 4) : "",
    nombreStagiairesFormes: nommes.length ? String(nommes.length) : "",
    nombreAvisSatisfaction: termines.length ? String(termines.length) : "",
    tauxSatisfaction: termines.length ? "100" : "",
    tauxAssiduite: termines.length ? "100" : "",
  };
}

/**
 * Applique les indicateurs calculés aux seules cases vides ou encore remplies automatiquement
 * (valeur identique au dernier calcul) : une valeur tapée à la main n'est jamais écrasée.
 * Renvoie null si rien ne change.
 */
export function appliquerIndicateursAuto(f: FormationInfo, stagiaires: StagiaireInfo[], aujourdhui = new Date()): FormationInfo | null {
  const calc = calculerIndicateursAuto(f, stagiaires, aujourdhui);
  const precedent = f.indicateursAuto || {};
  const suivant: FormationInfo = { ...f };
  const auto: Partial<Record<CleIndicateurAuto, string>> = {};
  let change = false;
  for (const k of CLES_AUTO) {
    const actuel = v(f[k]);
    const estAuto = !actuel || (precedent[k] !== undefined && actuel === precedent[k]);
    if (!estAuto) continue;
    if (calc[k]) auto[k] = calc[k];
    if (actuel !== calc[k]) { suivant[k] = calc[k]; change = true; }
  }
  if (JSON.stringify(auto) !== JSON.stringify(precedent)) change = true;
  suivant.indicateursAuto = auto;
  return change ? suivant : null;
}
