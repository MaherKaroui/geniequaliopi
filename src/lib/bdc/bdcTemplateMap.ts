/**
 * Mapping templates → substitutions pour les documents BDC NT Conseils
 * automatisés à partir des fichiers d'exemple originaux.
 *
 * Le design DOCX reste 100% identique aux fichiers source : on remplace
 * uniquement le contenu textuel variable (organisme, dirigeant, dates, etc.).
 */
import type { OrganismeInfo, StagiaireInfo, FormationInfo } from "@/types/qualiopi";
import { renderDocxTemplate, renderXlsxTemplate, type Substitution } from "./docxTemplate";

const MOIS_FR = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

function fmtLongDate(d: Date): string {
  return `${d.getDate()} ${MOIS_FR[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtShortDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
}
function parseDate(s?: string): Date | null {
  if (!s) return null;
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return new Date(+iso[1], +iso[2]-1, +iso[3]);
  const fr = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (fr) return new Date(+fr[3], +fr[2]-1, +fr[1]);
  const t = Date.parse(s);
  return isNaN(t) ? null : new Date(t);
}

/**
 * Construit les substitutions communes (organisme, dirigeant, dates, bénéficiaire).
 * Toutes les variantes connues dans les templates NT Conseils sont couvertes.
 */
export function buildCommonSubstitutions(
  org: OrganismeInfo,
  formation?: FormationInfo,
  s?: StagiaireInfo | null,
): Substitution[] {
  const orgNom = org.nom || "[Organisme]";
  const orgNomUpper = orgNom.toUpperCase();
  const dirigeant = org.dirigeant || "Le Responsable";
  const dirigeantUpper = dirigeant.toUpperCase();
  const adresse = org.adresse || "";
  const cpVille = [org.codePostal, org.ville].filter(Boolean).join(" ");
  const adresseComplete = [adresse, cpVille].filter(Boolean).join(" ");
  const siret = org.siret || "[SIRET]";
  const nda = org.nda || "[NDA]";
  const email = org.email || "contact@organisme.fr";
  const tel = org.telephone || "";
  const ville = org.ville || "";

  // Dates
  const debut = parseDate(s?.dateDebutFormation) || parseDate(formation?.dateDebut) || parseDate(org.dateMaj) || new Date();
  const fin = parseDate(s?.dateFinFormation) || parseDate(formation?.dateFin) || debut;
  const versionD = parseDate(org.dateMaj) || new Date();
  const version = org.version || "V1";

  // Bénéficiaire
  const benefPrenomNom = s ? `${s.prenom || ""} ${s.nom || ""}`.trim() : "";
  const benefCivilite = s?.civilite === "Mme" ? "Madame" : "Monsieur";

  const subs: Substitution[] = [
    // Dirigeant (ordre important : combinaisons d'abord)
    { from: "ABDOULHALIK ANTTOISSE", to: dirigeantUpper },
    { from: "ABDULHALIK ANTTOISSE", to: dirigeantUpper },
    { from: "Abdoulhalik Anttoisse", to: dirigeant },
    { from: "Abdulhalik Anttoisse", to: dirigeant },
    { from: "ABDOULHALIK", to: dirigeantUpper },
    { from: "ABDULHALIK", to: dirigeantUpper },
    { from: "ANTTOISSE", to: "" },

    // Organisme
    { from: "NT CONSEILS", to: orgNomUpper },
    { from: "NT Conseils", to: orgNom },
    { from: "Nt Conseils", to: orgNom },

    // Adresse / SIRET / NDA / email / tel
    { from: "5 rue Pleyel 93200 Saint-Denis", to: adresseComplete || "[Adresse]" },
    { from: "5 rue Pleyel, 93200 Saint-Denis", to: adresseComplete || "[Adresse]" },
    { from: "5 rue Pleyel", to: adresse || "[Adresse]" },
    { from: "93200 Saint-Denis", to: cpVille || "[CP Ville]" },
    { from: "Saint-Denis", to: ville || "[Ville]" },
    { from: "902 274 448 000 31", to: siret },
    { from: "902274448 00031", to: siret.replace(/\s/g, "") },
    { from: "902 274 448", to: siret.replace(/\s/g, "").slice(0, 9) || siret },
    { from: "11 93 09875 93", to: nda },
    { from: "11930987593", to: nda.replace(/\s/g, "") },
    { from: "contact.ntconseil@gmail.com", to: email },
    { from: "Marc.z103@gmail.com", to: email },
    { from: "06 12 34 56 78", to: tel || "" },

    // Version + dates
    { from: "V1 – 01/01/2026", to: `${version} – ${fmtShortDate(versionD)}` },
    { from: "V1 - 01/01/2026", to: `${version} - ${fmtShortDate(versionD)}` },
    { from: "01/01/2026", to: fmtShortDate(versionD) },

    // Placeholders dynamiques (si présents dans les templates)
    { from: "{DATE_DEBUT}", to: fmtLongDate(debut) },
    { from: "{DATE_FIN}", to: fmtLongDate(fin) },
    { from: "{ORGANISME}", to: orgNom },
    { from: "{DIRIGEANT}", to: dirigeant },
    { from: "{SIRET}", to: siret },
    { from: "{NDA}", to: nda },
    { from: "{VILLE}", to: ville },
  ];

  if (s) {
    subs.push(
      { from: "{BENEFICIAIRE}", to: benefPrenomNom },
      { from: "{CIVILITE}", to: benefCivilite },
      { from: "[NOM_BENEFICIAIRE]", to: benefPrenomNom },
    );
  }

  // Nettoyage : retire les doubles espaces laissés par "ANTTOISSE" supprimé
  subs.push({ from: /  +/g, to: " " });

  return subs;
}

/* ============================================================== */
/* Mapping clés BDC → templates                                   */
/* ============================================================== */

export interface BdcTemplateMapping {
  templateUrl: string;
  type: "docx" | "xlsx";
  perBeneficiaire?: boolean;
}

export const BDC_TEMPLATES: Record<string, BdcTemplateMapping> = {
  // Indicateur 1 — la présentation, le cadre légal et le process général sont rendus depuis la
  // source nettoyée (même contenu que le catalogue) : les anciens DOCX bruts portaient les données
  // d'autres organismes (anglais VTest, CIF/FONGECIF, process d'action de formation).
  "Indicateur 1/1. Calendrier annuel": {
    templateUrl: "/templates/bdc/ind1/1_calendrier_annuel.xlsx",
    type: "xlsx",
  },
};

/**
 * Si la clé a un template associé, génère le document automatisé.
 * Retourne null si aucun template n'est mappé pour cette clé.
 */
export async function renderBdcTemplateIfMapped(
  key: string,
  org: OrganismeInfo,
  formation?: FormationInfo,
  s?: StagiaireInfo | null,
): Promise<{ blob: Blob; extension: "docx" | "xlsx" } | null> {
  const mapping = BDC_TEMPLATES[key];
  if (!mapping) return null;
  const subs = buildCommonSubstitutions(org, formation, s);
  const blob = mapping.type === "xlsx"
    ? await renderXlsxTemplate(mapping.templateUrl, subs)
    : await renderDocxTemplate(mapping.templateUrl, subs);
  return { blob, extension: mapping.type };
}
