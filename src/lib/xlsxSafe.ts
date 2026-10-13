/** Excel limite une cellule à 32 767 caractères : on tronque proprement. */
export const XLSX_CELL_MAX = 32767;
export function clampCells<T extends unknown[][]>(rows: T): T {
  const suffix = "\n… (liste tronquée — voir le dossier ZIP pour l'intégralité)";
  for (const r of rows) for (let i = 0; i < r.length; i++) {
    const v = r[i];
    if (typeof v === "string" && v.length > XLSX_CELL_MAX) r[i] = v.slice(0, XLSX_CELL_MAX - suffix.length) + suffix;
  }
  return rows;
}
