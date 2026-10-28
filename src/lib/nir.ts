// Clé NIR : 97 - (13 chiffres mod 97) ; Corse 2A → 19, 2B → 18.
export function cleNir(base13: string): string | null {
  const b = base13.replace(/\s/g, "").toUpperCase();
  if (!/^[12378]\d{4}(\d{2}|2A|2B)\d{6}$/.test(b)) return null;
  const num = BigInt(b.replace("2A", "19").replace("2B", "18"));
  return String(97n - (num % 97n)).padStart(2, "0");
}

/** Ajoute la clé si 13 caractères saisis ; sinon renvoie la saisie inchangée. */
export function completerNir(saisie: string): string {
  const b = saisie.replace(/\s/g, "").toUpperCase();
  if (b.length !== 13) return saisie;
  const k = cleNir(b);
  return k ? b + k : saisie;
}

/** Début du NIR déduit de la fiche : sexe, année, mois, département de naissance. */
export function debutNir(civilite: string, dateNaissance: string, departement: string): string {
  const sexe = /mme|madame|mlle/i.test(civilite) ? "2" : /^m/i.test(civilite.trim()) ? "1" : "";
  const m = dateNaissance.match(/^(\d{4})-(\d{2})/) || dateNaissance.match(/\d{2}\/(\d{2})\/(\d{4})/);
  let yy = "", mm = "";
  if (m) { if (m[1].length === 4) { yy = m[1].slice(2); mm = m[2]; } else { mm = m[1]; yy = m[2].slice(2); } }
  const d = departement.trim().toUpperCase().match(/^(2A|2B|97\d|\d{2})/)?.[1] || "";
  if (!sexe || !yy) return "";
  return sexe + yy + mm + d;
}
