/**
 * Réglages d'administration liés au CERFA d'apprentissage.
 * Stockés localement (aucune valeur en dur dans le code métier).
 */
export interface SmicSetting {
  /** Montant brut mensuel du SMIC, saisi par l'administrateur (ex: "1801.80") */
  montant: string;
  /** Date d'effet du montant (ISO YYYY-MM-DD) */
  dateEffet: string;
}

const KEY = "cerfa.smic";

export function getSmicSetting(): SmicSetting {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { montant: "", dateEffet: "" };
    const p = JSON.parse(raw);
    return { montant: String(p.montant ?? ""), dateEffet: String(p.dateEffet ?? "") };
  } catch {
    return { montant: "", dateEffet: "" };
  }
}

export function setSmicSetting(s: SmicSetting) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch { /* stockage indisponible */ }
}

/** Montant numérique ou null si le réglage n'est pas saisi */
export function getSmicMontant(): number | null {
  const { montant } = getSmicSetting();
  const n = parseFloat((montant || "").replace(",", "."));
  return isFinite(n) && n > 0 ? n : null;
}
