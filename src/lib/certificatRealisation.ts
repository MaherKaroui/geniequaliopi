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

/** « Fait à Ville, le date » sans « à » vide. */
export function faitALe(o: Partial<OrganismeInfo>, date: string): string {
  return t(o.ville) ? `Fait à ${t(o.ville)}, le ${date}` : `Fait le ${date}`;
}

/** Bloc de fin du certificat : uniquement le cachet de l'organisme (tampon, à défaut signature). */
export function cachetCertificatHtml(o: OrganismeInfo): string {
  const img = cachetDirigeantHtml(o);
  return `<div style="display:flex;justify-content:flex-end;margin-top:14px;page-break-inside:avoid;break-inside:avoid">
    <div style="min-width:230px;text-align:center">
      <p style="margin:0 0 4px;font-weight:700;text-transform:uppercase;font-size:0.9em">Cachet de l'organisme</p>
      <p style="margin:0 0 4px">${o.nom || ""}</p>
      <div style="min-height:70px;display:flex;align-items:center;justify-content:center">${img || ""}</div>
    </div>
  </div>`;
}
