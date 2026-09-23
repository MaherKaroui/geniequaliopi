import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import {
  buildDocument,
  formatDate,
  tableHTML,
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
 * Retourne null si aucun nombre exploitable (aucune valeur n'est inventée).
 */
export function parseMontant(raw?: string | null): number | null {
  if (!raw) return null;
  const cleaned = String(raw)
    .replace(/[\u00A0\u202F]/g, " ")
    .replace(/[^\d,.\s]/g, " ")
    .trim();
  if (!cleaned) return null;
  let normalized = cleaned.replace(/\s+/g, "");
  if (normalized.includes(",")) {
    normalized = normalized.replace(/\./g, "").replace(",", ".");
  } else {
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
    const col2 = [entreprise, financeur].filter(Boolean).join(" / ") || "Non renseigné";
    const debut = getStagiaireDateDebut(s, f);
    const fin = getStagiaireDateFin(s, f);
    const periode = debut && fin ? `du ${formatDate(debut)} au ${formatDate(fin)}` : "Non renseignée";
    const duree = getStagiaireDuree(s, f) || "Non renseignée";
    const montant = parseMontant(getStagiaireTarif(s, f));

    if (montant !== null) {
      total += montant;
      compted += 1;
      const key = financeur || "Financeur non renseigné";
      parFinanceur.set(key, (parFinanceur.get(key) || 0) + montant);
    }

    rows.push([
      nomComplet || "Non renseigné",
      col2,
      periode,
      duree,
      montant !== null ? fmtEur(montant) : "Non renseigné",
    ]);
  }

  rows.push(["<strong>TOTAL SESSION</strong>", "", "", "", `<strong>${fmtEur(total)}</strong>`]);

  const manquants = liste.length - compted;
  const mentionTotal =
    manquants > 0
      ? `<p style="font-size:12px;color:#b45309;margin-top:8px;"><strong>Total calculé sur ${compted} stagiaire(s) sur ${liste.length} — montants manquants à compléter.</strong></p>`
      : "";

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
      tableHTML(["Financeur", "Montant TTC", "Part"], finRows);
  }

  const mentionBas = `<p style="font-size:12px;color:#475569;margin-top:14px;">Montants issus des tarifs contractualisés (contrats et conventions de formation). Document de suivi interne de l'organisme ; il ne se substitue pas au Bilan Pédagogique et Financier (Cerfa n°10443).</p>
  <p style="font-size:12px;color:#475569;">Document établi le ${longFrToday()}.</p>`;

  const rappel = `<table style="width:100%;border-collapse:collapse;">
    <tbody>
      <tr><td style="padding:4px 8px;font-weight:600;width:32%;">Formation</td><td style="padding:4px 8px;">${f.intitule || "Non renseignée"}</td></tr>
      <tr><td style="padding:4px 8px;font-weight:600;">Période de session</td><td style="padding:4px 8px;">${f.dateDebut && f.dateFin ? `du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}` : "Non renseignée"}</td></tr>
      <tr><td style="padding:4px 8px;font-weight:600;">Durée</td><td style="padding:4px 8px;">${f.duree || "Non renseignée"}</td></tr>
      <tr><td style="padding:4px 8px;font-weight:600;">Modalité</td><td style="padding:4px 8px;">${f.modalites || "Non renseignée"}</td></tr>
      <tr><td style="padding:4px 8px;font-weight:600;">Lieu</td><td style="padding:4px 8px;">${f.lieu || "Non renseigné"}</td></tr>
      <tr><td style="padding:4px 8px;font-weight:600;">Nombre de stagiaires</td><td style="padding:4px 8px;">${liste.length}</td></tr>
    </tbody>
  </table>`;

  return buildDocument({
    org: o,
    title: "CHIFFRE D'AFFAIRES – SESSION DE FORMATION",
    subtitle: `Suivi financier de session — établi le ${longFrToday()}`,
    sections: [{ heading: "Rappel de la session", content: rappel }],
    table: {
      headers: ["Stagiaire", "Entreprise / financeur", "Période individuelle", "Durée", "Montant TTC"],
      rows,
    },
    extraHtml: `${mentionTotal}${repartition}${mentionBas}`,
    signatures: {
      type: "2",
      labels: ["L'organisme de formation", "Le dirigeant"],
      names: [o.nom || "", o.dirigeant || ""],
    },
  });
}
