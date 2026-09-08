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
