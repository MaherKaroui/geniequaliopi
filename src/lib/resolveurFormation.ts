/**
 * Reconnaissance du domaine d'une formation à partir de son intitulé.
 *
 * Remplace les tests `intitule.includes("cap")` qui capturaient à tort des intitulés
 * voisins : « handicap » ou « capacité » → CAP Esthétique, « principes » → CIP,
 * « entreprise » → EPR (restauration), « WordPress » → Word, « Excellence » → Excel,
 * « administratif » → Informatique, « réseaux sociaux » → Informatique…
 * Un terme est désormais reconnu comme MOT ENTIER ; seuls les radicaux explicitement
 * listés ci-dessous acceptent une terminaison (esthét → esthétique, esthéticienne…).
 */
const LETTRE = "a-z0-9à-öø-ÿœæ";

const RADICAUX = new Set([
  "esthet", "esthét", "cap esthet", "cap esthét", "socio esthéti", "socio-esthéti", "entrepre",
  "cosmétique", "cosmetique", "massage", "manager", "prénatal", "prenatal", "infographi",
]);

const cache = new Map<string, RegExp>();

/** Vrai si `terme` apparaît dans `texte` comme mot entier (ou comme radical autorisé). */
export function mot(texte: string, terme: string): boolean {
  const t = terme.trim().toLowerCase();
  if (!t) return false;
  let re = cache.get(t);
  if (!re) {
    const echappe = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const fin = RADICAUX.has(t) ? "" : `(?![${LETTRE}])`;
    re = new RegExp(`(?<![${LETTRE}])${echappe}${fin}`, "i");
    cache.set(t, re);
  }
  return re.test(texte);
}
