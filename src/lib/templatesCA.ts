import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import {
  buildDocument,
  formatDate,
  getStagiaireDateDebut,
  getStagiaireDateFin,
  getStagiaireTarif,
  getStagiaireDuree,
} from "./docBuilder";

/** Date du jour en toutes lettres (français), ex : "4 novembre 2024". */
function longFrToday(): string {
  return new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Parse un montant saisi librement : "2 100 € TTC", "2100", "1 950,50 €", "2.100 €".
 * Retourne null si aucun nombre exploitable.
 */
export function parseMontant(raw?: string | null): number | null {
  if (!raw) return null;
  const cleaned = String(raw)
    .replace(/\u00A0|\u202F/g, " ")
    .replace(/[^\d,.\s]/g, " ")
    .trim();
  if (!cleaned) return null;
  // Retire les séparateurs de milliers (espaces), normalise la virgule décimale
  let normalized = cleaned.replace(/\s+/g, "");
  if (normalized.includes(",")) {
    normalized = normalized.replace(/\./g, "").replace(",", ".");
  } else {
    // "2.100" = séparateur de milliers ; "2100.50" = décimal
    const parts = normalized.split(".");
    if (parts.length > 1 && parts[parts.length - 1].length === 3) normalized = parts.join("");
  }
  const n = Number.parseFloat(normalized);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

const fmtEur = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

/**
 * CHIFFRE D'AFFAIRES – SESSION DE FORMATION.
 * Aucune valeur inventée : un tarif absent affiche "Non renseigné" et exclut le stagiaire du total.
 */
export function genChiffreAffairesSession(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
): string {
  const liste = (stagiaires || []).filter((s) => s && (s.nom || s.prenom));

  const rows: string[][] = [];
  let total = 0;
  let compted = 0;
  const parFinanceur = new Map<string, number>();

  for (const s of liste) {
    const nomComplet = `${s.civilite ? s.civilite + " " : ""}${s.prenom || ""} ${(s.nom || "").toUpperCase()}`.trim();
    const financeur = (s.financeur || "").trim();
    const entreprise = (s.entreprise || "").trim();
    const col2 = [entreprise, financeur].filter(Boolean).join(" / ") || "—";
    const debut = getStagiaireDateDebut(s, f);
    const fin = getStagiaireDateFin(s, f);
    const periode = debut && fin ? `du ${formatDate(debut)} au ${formatDate(fin)}` : "—";
    const duree = getStagiaireDuree(s, f) || "—";
    const montant = parseMontant(getStagiaireTarif(s, f));

    if (montant !== null) {
      total += montant;
      compted += 1;
      const key = financeur || "Financeur non renseigné";
      parFinanceur.set(key, (parFinanceur.get(key) || 0) + montant);
    }

    rows.push([
      nomComplet || "—",
      col2,
      periode,
      duree,
      montant !== null ? fmtEur(montant) : "Non renseigné",
    ]);
  }

  rows.push([
    "<strong>TOTAL SESSION</strong>",
    "",
    "",
    "",
    `<strong>${fmtEur(total)}</strong>`,
  ]);

  const manquants = liste.length - compted;
  const mentionTotal =
    manquants > 0
      ? `<p style="font-size:11px;color:#b45309;margin-top:6px;"><strong>Total calculé sur ${compted} stagiaire(s) sur ${liste.length} — montants manquants à compléter.</strong></p>`
      : "";

  // Répartition par financeur
  let repartition = "";
  if (parFinanceur.size > 0 && total > 0) {
    const finRows = [...parFinanceur.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([nom, montant]) => [
        nom,
        fmtEur(montant),
        `${((montant / total) * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`,
      ]);
    repartition =
      `<h2>Répartition par financeur</h2>` +
      `<table><thead><tr>` +
      ["Financeur", "Montant TTC", "Part"].map((h) => `<th>${h}</th>`).join("") +
      `</tr></thead><tbody>` +
      finRows
        .map(
          (r, i) =>
            `<tr style="background:${i % 2 === 0 ? "#ffffff" : "#eff6ff"};">` +
            r.map((c) => `<td>${c}</td>`).join("") +
            `</tr>`,
        )
        .join("") +
      `</tbody></table>`;
  }

  const rappel = `<table style="width:100%;border-collapse:collapse;margin-bottom:10px;">
    <tbody>
      <tr><td style="padding:4px 8px;font-weight:600;width:30%;">Formation</td><td style="padding:4px 8px;">${f.intitule || "—"}</td></tr>
      <tr><td style="padding:4px 8px;font-weight:600;">Période de session</td><td style="padding:4px 8px;">${f.dateDebut && f.dateFin ? `du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}` : "—"}</td></tr>
      <tr><td style="padding:4px 8px;font-weight:600;">Durée</td><td style="padding:4px 8px;">${f.duree || "—"}</td></tr>
      <tr><td style="padding:4px 8px;font-weight:600;">Modalité</td><td style="padding:4px 8px;">${f.modalites || "—"}</td></tr>
      <tr><td style="padding:4px 8px;font-weight:600;">Lieu</td><td style="padding:4px 8px;">${f.lieu || "—"}</td></tr>
      <tr><td style="padding:4px 8px;font-weight:600;">Nombre de stagiaires</td><td style="padding:4px 8px;">${liste.length}</td></tr>
    </tbody>
  </table>`;

  const mentionBas = `<p style="font-size:11px;color:#475569;margin-top:14px;">Montants issus des tarifs contractualisés (contrats et conventions de formation). Document de suivi interne de l'organisme ; il ne se substitue pas au Bilan Pédagogique et Financier (Cerfa n°10443).</p>
  <p style="font-size:11px;color:#475569;">Document établi le ${longFrToday()}.</p>`;

  return buildDocument({
    org: o,
    title: "CHIFFRE D'AFFAIRES – SESSION DE FORMATION",
    subtitle: `Suivi financier de session — établi le ${longFrToday()}`,
    extraHtml: rappel,
    table: {
      headers: ["Stagiaire", "Entreprise / financeur", "Période individuelle", "Durée", "Montant TTC"],
      rows,
    },
    sections: undefined,
    signatures: {
      type: "2",
      labels: ["L'organisme de formation", "Le dirigeant"],
      names: [o.nom || "", o.dirigeant || ""],
    },
    stagiaires: [],
  })
    // Insertion de la répartition et des mentions juste avant le bloc signatures
    .replace(
      /(<div[^>]*class="signatures"|<h2>\s*Signatures)/i,
      `${mentionTotal}${repartition}${mentionBas}$1`,
    );
}
