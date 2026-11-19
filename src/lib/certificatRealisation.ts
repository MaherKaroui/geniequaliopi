import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { cachetDirigeantHtml } from "./docBuilder";

const t = (x?: string) => (x || "").trim();

/** Adresse de l'organisme sur une ligne (vide si aucune partie saisie). */
export function adresseOrganisme(o: Partial<OrganismeInfo>): string {
  const ville = [t(o.codePostal), t(o.ville)].filter(Boolean).join(" ");
  return [t(o.adresse), ville].filter(Boolean).join(", ");
}

/**
 * Lieu de réalisation à faire figurer sur le certificat : uniquement si la formation a lieu
 * (au moins en partie) en présentiel. Lieu saisi dans la formation (ou du stagiaire), sinon
 * l'adresse de l'organisme. Formation entièrement à distance : rien.
 */
export function lieuRealisationCertificat(o: Partial<OrganismeInfo>, f: Partial<FormationInfo>, s?: Partial<StagiaireInfo>): string {
  const mod = t(f.modalites).toLowerCase();
  const lieuSaisi = t((s as { lieu?: string } | undefined)?.lieu) || t(f.lieu);
  const distance = /distanciel|distance|foad|e-?learning|classe virtuelle/i;
  const presentiel = /pr[ée]sentiel|mixte|hybride|blended/.test(mod) || (!mod && !!lieuSaisi && !distance.test(lieuSaisi));
  if (!presentiel) return "";
  const lieu = lieuSaisi && !distance.test(lieuSaisi) ? lieuSaisi : adresseOrganisme(o);
  return lieu;
}

/**
 * Mise en page compacte commune aux certificats : le certificat doit tenir sur UNE page A4,
 * quelle que soit la charte graphique (en-tête avec logo, grands titres).
 */
export const CERTIF_BLOC_STYLE = "padding:8px 14px;margin-top:8px;margin-bottom:8px;font-size:0.92em;line-height:1.32;page-break-inside:avoid;break-inside:avoid";
/** Signale à l'export PDF que chaque certificat doit tenir sur une seule page. */
export const CERTIF_UNE_PAGE_META = '<meta name="pdf-une-page" content="1">';
export const CERTIF_P_STYLE = "margin:0 0 5px";

/** Applique l'espacement compact à tous les paragraphes sans style propre. */
export function compacterParagraphes(html: string): string {
  return CERTIF_UNE_PAGE_META + html.replace(/<p>/g, `<p style="${CERTIF_P_STYLE}">`);
}

/** « Fait à Ville, le date » sans « à » vide. */
export function faitALe(o: Partial<OrganismeInfo>, date: string): string {
  return t(o.ville) ? `Fait à ${t(o.ville)}, le ${date}` : `Fait le ${date}`;
}

/** Bloc de fin du certificat : uniquement le cachet de l'organisme (tampon, à défaut signature). */
export function cachetCertificatHtml(o: OrganismeInfo): string {
  const img = cachetDirigeantHtml(o);
  return `<div style="display:flex;justify-content:flex-end;margin-top:6px;page-break-inside:avoid;break-inside:avoid">
    <div style="min-width:230px;text-align:center">
      <p style="margin:0 0 2px;font-weight:700;text-transform:uppercase;font-size:0.9em">Cachet de l'organisme</p>
      <p style="margin:0 0 2px">${o.nom || ""}</p>
      <div style="height:72px;overflow:hidden;display:flex;align-items:center;justify-content:center">${img || ""}</div>
    </div>
  </div>`;
}
