/**
 * Nomenclature stricte OPCO Mobilités.
 *
 * Format imposé par le courrier OPCO :
 *   [Année du contrôle] / [Établissement] / [Intitulé pièce] / [AAAA.MM.JJ].extension
 *
 * Implémentation pratique pour un fichier ZIP :
 *   {anneeControle}_{etablissement}_{intitule}_{AAAA.MM.JJ}.{ext}
 *
 * Et pour l'arborescence du ZIP :
 *   {anneeControle}/{etablissement}/{section}/{anneeControle}_{etablissement}_{intitule}_{AAAA.MM.JJ}.{ext}
 */

function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function sanitize(value: string): string {
  return stripDiacritics(value || "")
    .replace(/[’'`]/g, " ")
    .replace(/[(){}\[\]]/g, " ")
    .replace(/[\\\/:*?"<>|]/g, " ")
    .replace(/[\s_]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .trim();
}

function formatDateOpco(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(d.getTime())) return formatDateOpco();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export interface OpcoNamingContext {
  anneeControle: number | string;
  etablissement: string;
  refDossier?: string;
  dateMaj?: string;
}

export function buildOpcoFileName(
  ctx: OpcoNamingContext,
  intitule: string,
  extension: string,
  suffix?: string,
): string {
  const annee = String(ctx.anneeControle || new Date().getFullYear());
  const etab = sanitize(ctx.etablissement) || "ETABLISSEMENT";
  const piece = sanitize(intitule) || "DOCUMENT";
  const date = formatDateOpco(ctx.dateMaj);
  const suf = suffix ? `_${sanitize(suffix)}` : "";
  const ext = extension.startsWith(".") ? extension : `.${extension}`;
  return `${annee}_${etab}_${piece}${suf}_${date}${ext}`;
}

export function buildOpcoZipFolder(ctx: OpcoNamingContext, sectionLabel: string): string {
  const annee = String(ctx.anneeControle || new Date().getFullYear());
  const etab = sanitize(ctx.etablissement) || "ETABLISSEMENT";
  const section = sanitize(sectionLabel) || "Section";
  const root = ctx.refDossier
    ? `OPCO_Mobilites_${sanitize(ctx.refDossier)}`
    : `OPCO_Mobilites_${annee}`;
  return `${root}/${annee}_${etab}/${section}`;
}

export function buildOpcoRootName(ctx: OpcoNamingContext): string {
  const annee = String(ctx.anneeControle || new Date().getFullYear());
  const etab = sanitize(ctx.etablissement) || "ETABLISSEMENT";
  const ref = ctx.refDossier ? `_${sanitize(ctx.refDossier)}` : "";
  return `OPCO_Mobilites_${annee}_${etab}${ref}`;
}
