// Pack de veilles (réglementaire / métier / technologique) généré par IA
// et mis en cache sessionStorage pour rester cohérent avec la formation pendant la session.
import { supabase } from "@/integrations/supabase/client";
import type { FormationInfo } from "@/types/qualiopi";

export interface AIVeilleRow {
  lien: string;          // URL https
  titreLien: string;     // libellé du lien
  titre: string;         // titre complet de l'article
  date: string;          // "Mois AAAA"
  commentaire: string;   // 2-3 phrases métier
  exploitation: string;  // "Preuve : ... Action : ..."
}

export interface AIVeillePack {
  reglementaire: AIVeilleRow[];
  metier: AIVeilleRow[];
  technologique: AIVeilleRow[];
}

const CACHE_PREFIX = "ai_veille_pack__";

function cacheKey(f: FormationInfo): string {
  const sig = (f.intitule || "").trim().toLowerCase().slice(0, 80);
  return CACHE_PREFIX + sig;
}

export function getCachedVeillePack(f: FormationInfo): AIVeillePack | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(f));
    if (!raw) return null;
    return JSON.parse(raw) as AIVeillePack;
  } catch {
    return null;
  }
}

export function setCachedVeillePack(f: FormationInfo, pack: AIVeillePack): void {
  try {
    sessionStorage.setItem(cacheKey(f), JSON.stringify(pack));
  } catch {
    /* quota: ignore */
  }
}

export function clearCachedVeillePack(f: FormationInfo): void {
  try {
    sessionStorage.removeItem(cacheKey(f));
  } catch {
    /* ignore */
  }
}

export async function generateAIVeillePack(f: FormationInfo, force = false): Promise<AIVeillePack> {
  if (!force) {
    const cached = getCachedVeillePack(f);
    if (cached) return cached;
  }
  const { data, error } = await supabase.functions.invoke("generate-veille-ai", {
    body: {
      intitule: f.intitule,
      objectifs: f.objectifs,
      programme: f.programme,
      publicVise: f.publicVise,
      codeRNCP: f.codeRNCP,
    },
  });
  if (error) throw new Error(error.message || "Erreur appel IA veilles");
  if (!data || (data as any).error) throw new Error((data as any)?.error || "Réponse IA vide");
  const pack = data as AIVeillePack;
  setCachedVeillePack(f, pack);
  return pack;
}

/** Convertit le pack IA en lignes string[][] compatibles avec les générateurs V2 (5 colonnes). */
export function veilleRowsToTable(rows: AIVeilleRow[]): string[][] {
  return rows.map((r) => [
    `<a href="${r.lien}" target="_blank" rel="noopener">${r.titreLien}</a>`,
    r.titre,
    r.date,
    r.commentaire,
    r.exploitation,
  ]);
}
