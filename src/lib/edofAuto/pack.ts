/**
 * Automatisation EDOF — génération du pack de toutes les certifications d'un export.
 * RS7650 : PDF officiels EYES PERFECT remplis ; toute autre RS / RNCP : documents construits
 * sur la fiche France Compétences (generique.ts). Une fiche absente de la base (certification
 * échue ou inconnue) ne peut pas être générée : elle est signalée par l'interface.
 */
import { loadFicheFC, type FicheFC } from "@/lib/franceCompetences";
import type { SessionExamen } from "./candidats";
import { genererSessionGenerique } from "./generique";
import { chargeurHttp, documentsCommunsRS7650, genererSessionRS7650, type ChargeurModele, type ContexteRS7650, type FichierPack } from "./rs7650Pdf";

export type ContexteEvaluation = ContexteRS7650;

/** Certifications dont le certificateur a fourni ses propres documents (remplis tels quels). */
export const MODELES_OFFICIELS: Record<string, string> = { RS7650: "EYES PERFECT (documents officiels du certificateur)" };

export const estCodeCertification = (code: string) => /^(RS|RNCP)\d+$/.test(code);


/** Charge les fiches France Compétences des codes présents (null = absente / échue). */
export async function chargerFiches(codes: string[]): Promise<Record<string, FicheFC | null>> {
  const out: Record<string, FicheFC | null> = {};
  for (const code of [...new Set(codes)]) out[code] = estCodeCertification(code) ? await loadFicheFC(code) : null;
  return out;
}

export const generable = (code: string, fiches: Record<string, FicheFC | null>) => !!MODELES_OFFICIELS[code] || !!fiches[code];

export async function genererPack(
  sessions: SessionExamen[],
  contextes: Record<string, ContexteEvaluation>,
  fiches: Record<string, FicheFC | null>,
  charger: ChargeurModele = chargeurHttp,
  progression?: (fait: number, total: number) => void,
): Promise<FichierPack[]> {
  const fichiers: FichierPack[] = [];
  const aGenerer = sessions.filter((s) => generable(s.codeCertif, fiches));
  const total = aGenerer.reduce((n, s) => n + s.candidats.length, 0);
  let fait = 0;
  const tick = () => progression?.(++fait, total);
  for (const code of [...new Set(aGenerer.map((s) => s.codeCertif))]) {
    const ctx = contextes[code];
    for (const s of aGenerer.filter((x) => x.codeCertif === code)) {
      const dossier = `${code}/Session_${s.dateExamen}`;
      fichiers.push(...(code === "RS7650"
        ? await genererSessionRS7650(dossier, s, ctx, charger, tick)
        : await genererSessionGenerique(dossier, s, fiches[code]!, ctx, tick)));
    }
    if (code === "RS7650") fichiers.push(...(await documentsCommunsRS7650(`${code}/_Commun`, charger)));
  }
  return fichiers;
}
