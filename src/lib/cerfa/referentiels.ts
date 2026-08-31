/**
 * Référentiels éditables du CERFA 10103*14 :
 *  - smic_references      : SMIC mensuel 35h par date d'effet (saisi par l'administrateur, jamais prérempli)
 *  - baremes_apprentissage: pourcentages par tranche d'âge / année de contrat
 *
 * Aucune valeur n'est codée en dur ici : si la base ne contient pas la donnée,
 * les fonctions renvoient null et l'appelant doit bloquer la génération.
 */
import { supabase } from "@/integrations/supabase/client";

export interface SmicReference {
  id: string;
  date_effet: string; // YYYY-MM-DD
  montant_mensuel_35h: number;
  source: string;
}

export type TrancheAge = "-18" | "18-20" | "21-25" | "26+";

export interface BaremeApprentissage {
  id: string;
  tranche_age: TrancheAge;
  annee_contrat: number;
  pourcentage: number;
}

export interface CerfaReferentiels {
  smic: SmicReference[];
  baremes: BaremeApprentissage[];
}

let cache: CerfaReferentiels | null = null;
let inflight: Promise<CerfaReferentiels> | null = null;

export function invalidateCerfaReferentiels() {
  cache = null;
  inflight = null;
}

export async function loadCerfaReferentiels(force = false): Promise<CerfaReferentiels> {
  if (!force && cache) return cache;
  if (!force && inflight) return inflight;
  inflight = (async () => {
    const [smicRes, baremeRes] = await Promise.all([
      supabase.from("smic_references").select("*").order("date_effet", { ascending: true }),
      supabase.from("baremes_apprentissage").select("*").order("annee_contrat", { ascending: true }),
    ]);
    const smic: SmicReference[] = (smicRes.data || []).map((r: any) => ({
      id: r.id,
      date_effet: r.date_effet,
      montant_mensuel_35h: Number(r.montant_mensuel_35h),
      source: r.source || "",
    }));
    const baremes: BaremeApprentissage[] = (baremeRes.data || []).map((r: any) => ({
      id: r.id,
      tranche_age: r.tranche_age as TrancheAge,
      annee_contrat: Number(r.annee_contrat),
      pourcentage: Number(r.pourcentage),
    }));
    cache = { smic, baremes };
    return cache;
  })();
  return inflight;
}

/** SMIC applicable à une date donnée (dernière référence dont la date d'effet <= date). */
export function smicEnVigueur(refs: SmicReference[], dateIso: string | undefined): SmicReference | null {
  if (!dateIso) return null;
  const applicables = refs
    .filter((r) => r.date_effet <= dateIso)
    .sort((a, b) => (a.date_effet < b.date_effet ? -1 : 1));
  return applicables.length ? applicables[applicables.length - 1] : null;
}

/** Revalorisations du SMIC prenant effet strictement pendant le contrat. */
export function revalorisationsPendant(
  refs: SmicReference[],
  debut: string | undefined,
  fin: string | undefined,
): SmicReference[] {
  if (!debut || !fin) return [];
  return refs.filter((r) => r.date_effet > debut && r.date_effet <= fin);
}

export function pourcentageBareme(
  baremes: BaremeApprentissage[],
  tranche: TrancheAge,
  anneeContrat: number,
): number | null {
  const annee = Math.min(Math.max(anneeContrat, 1), 3);
  const b = baremes.find((x) => x.tranche_age === tranche && x.annee_contrat === annee);
  return b ? b.pourcentage : null;
}
