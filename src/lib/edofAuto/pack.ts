/**
 * Automatisation EDOF — génération du pack pour TOUTES les formations d'un export.
 *
 * Référentiel retenu pour chaque formation (clé = code certification, ou intitulé si l'export n'en donne pas) :
 * 1. RS7650 : PDF officiels EYES PERFECT remplis tels quels ;
 * 2. fiche France Compétences active du code ;
 * 3. fiche échue : sa remplaçante désignée par France Compétences, sinon la fiche active au même intitulé ;
 * 4. rien dans la base (accompagnement VAE, formation non certifiante…) : compétences formulées sur l'intitulé.
 */
import { getIndexFC, loadFicheFC, loadIndexFC, rechercherFC } from "@/lib/franceCompetences";
import { cleFormation, type EdofCandidat, type SessionExamen } from "./candidats";
import { genererSessionGenerique, sourceDepuisFiche, sourceDepuisIntitule, type SourceReferentiel } from "./generique";
import { chargeurHttp, documentsCommunsRS7650, genererSessionRS7650, slug, type ChargeurModele, type ContexteRS7650, type FichierPack } from "./rs7650Pdf";

export type ContexteEvaluation = ContexteRS7650;

/** Certifications dont le certificateur a fourni ses propres documents (remplis tels quels). */
export const MODELES_OFFICIELS: Record<string, string> = { RS7650: "documents officiels EYES PERFECT" };

export type ReferentielOfficiel = { officiel: true; origine: string };
export type Referentiel = ReferentielOfficiel | SourceReferentiel;
export const estOfficiel = (r: Referentiel): r is ReferentielOfficiel => "officiel" in r && r.officiel === true;

const estCodeCertification = (code: string) => /^(RS|RNCP)\d+$/.test(code);
const norm = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
const MOTS_VIDES = new Set("de du la le les des d l et en a au aux un une pour par sur avec".split(" "));

/** Fiche active dont l'intitulé contient tous les mots significatifs de l'intitulé EDOF. */
async function ficheParIntitule(intitule: string, type: string) {
  const mots = (norm(intitule.replace(/\([^)]*\)/g, " ")).match(/[a-z0-9]+/g) || []).filter((m) => m.length > 2 && !MOTS_VIDES.has(m));
  if (mots.length < 2) return null;
  const cand = rechercherFC(mots.join(" "), 20).filter((e) => e.on && (!type || e.c.startsWith(type)));
  for (const e of cand) {
    const f = await loadFicheFC(e.c);
    if (f) return f;
  }
  return null;
}

async function resoudre(c: EdofCandidat): Promise<Referentiel> {
  const code = c.codeCertif;
  if (MODELES_OFFICIELS[code]) return { officiel: true, origine: MODELES_OFFICIELS[code] };
  if (estCodeCertification(code)) {
    const fiche = await loadFicheFC(code);
    if (fiche) return sourceDepuisFiche(fiche);
    for (const remplacante of getIndexFC(code)?.new || []) {
      const f = await loadFicheFC(remplacante);
      if (f) return { ...sourceDepuisFiche(f, code, c.intitule || f.i), origine: `fiche ${code} échue : référentiel de sa remplaçante ${f.c}` };
    }
  }
  const proche = c.intitule ? await ficheParIntitule(c.intitule, code.replace(/\d+$/, "")) : null;
  if (proche) return sourceDepuisFiche(proche, code, c.intitule);
  return sourceDepuisIntitule(code, c.intitule);
}

/** Référentiel de chaque formation présente (clé = cleFormation). */
export async function resoudreReferentiels(candidats: EdofCandidat[]): Promise<Record<string, Referentiel>> {
  await loadIndexFC();
  const out: Record<string, Referentiel> = {};
  for (const c of candidats) {
    const cle = cleFormation(c);
    if (!out[cle]) out[cle] = await resoudre(c);
  }
  return out;
}

export async function genererPack(
  sessions: SessionExamen[],
  contextes: Record<string, ContexteEvaluation>,
  referentiels: Record<string, Referentiel>,
  charger: ChargeurModele = chargeurHttp,
  progression?: (fait: number, total: number) => void,
): Promise<FichierPack[]> {
  const fichiers: FichierPack[] = [];
  const total = sessions.reduce((n, s) => n + s.candidats.length, 0);
  let fait = 0;
  const tick = () => progression?.(++fait, total);
  for (const cle of [...new Set(sessions.map((s) => s.codeCertif))]) {
    const ref = referentiels[cle];
    if (!ref) continue;
    const ctx = contextes[cle];
    const racine = slug(cle).slice(0, 60) || "Formation";
    for (const s of sessions.filter((x) => x.codeCertif === cle)) {
      const dossier = `${racine}/Session_${s.dateExamen}`;
      fichiers.push(...(estOfficiel(ref)
        ? await genererSessionRS7650(dossier, s, ctx, charger, tick)
        : await genererSessionGenerique(dossier, s, ref, ctx, tick)));
    }
    if (estOfficiel(ref)) fichiers.push(...(await documentsCommunsRS7650(`${racine}/_Commun`, charger)));
  }
  return fichiers;
}
