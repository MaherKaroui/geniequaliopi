/**
 * AI DP (Dossier Professionnel) pack client
 * - Calls edge function `generate-dp-officiel` to get realistic per-trainee examples
 * - Caches per (formation + stagiaire) in sessionStorage
 */
import { supabase } from "@/integrations/supabase/client";
import { FormationInfo, StagiaireInfo } from "@/types/qualiopi";

export interface AIDPExemple {
  intitule: string;
  tache: string;
  moyens: string;
  collegues: string;
}

export interface AIDPPack {
  exemples: AIDPExemple[]; // 1 par activité-type
}

const CACHE_PREFIX = "ai_dp_pack__";

function cacheKey(f: FormationInfo, s: StagiaireInfo): string {
  const sig = `${(f.codeRNCP || f.intitule || "").trim().toLowerCase().slice(0, 40)}__${(s.prenom || "").toLowerCase()}_${(s.nom || "").toLowerCase()}`;
  return CACHE_PREFIX + sig;
}

export function getCachedDPPack(f: FormationInfo, s: StagiaireInfo): AIDPPack | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(f, s));
    if (!raw) return null;
    return JSON.parse(raw) as AIDPPack;
  } catch {
    return null;
  }
}

export function setCachedDPPack(f: FormationInfo, s: StagiaireInfo, pack: AIDPPack): void {
  try {
    sessionStorage.setItem(cacheKey(f, s), JSON.stringify(pack));
  } catch {
    /* quota: silently ignore */
  }
}

export async function generateAIDPPack(
  f: FormationInfo,
  s: StagiaireInfo,
  activites: { titre: string; competences: string[] }[],
  domaine: string,
  periode: string,
  force = false,
): Promise<AIDPPack> {
  if (!force) {
    const cached = getCachedDPPack(f, s);
    if (cached && cached.exemples?.length === activites.length) return cached;
  }
  const { data, error } = await supabase.functions.invoke("generate-dp-officiel", {
    body: {
      intituleTitre: f.intitule || "",
      codeRNCP: f.codeRNCP || "",
      activites,
      stagiaire: { prenom: s.prenom, nom: s.nom, entreprise: s.entreprise, civilite: s.civilite },
      periode,
      domaine,
    },
  });
  if (error) throw new Error(error.message || "Erreur appel IA DP");
  if (!data || (data as any).error) throw new Error((data as any)?.error || "Réponse IA vide");
  const pack = data as AIDPPack;
  setCachedDPPack(f, s, pack);
  return pack;
}
