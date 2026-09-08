/**
 * AI Content Pack — pack pédagogique complet (besoins, cours, exercices, ressources)
 * généré par modèle fort (gemini-2.5-pro). Cache sessionStorage par formation.
 */
import { supabase } from "@/integrations/supabase/client";
import { FormationInfo } from "@/types/qualiopi";

export interface AIContentBesoins {
  besoinsList: string[];
  syntheseHtml: string;
  adaptationsHtml: string;
}

export interface AIContentSection {
  title: string;
  contentHtml: string;
}

export interface AIContentChapter {
  title: string;
  description: string;
  imageQuery: string;
  sections: AIContentSection[];
}

export interface AIContentExercise {
  titre: string;
  consigne: string;
  reponseAttendue: string;
  points: number;
}

export interface AIContentVideo {
  title: string;
  description: string;
  url: string;
}

export interface AIContentRessources {
  supportsHtml: string;
  outilsHtml: string;
  ressourcesComplHtml: string;
  videos: AIContentVideo[];
}

export interface AIContentPack {
  besoins: AIContentBesoins;
  chapters: AIContentChapter[];
  exercises: AIContentExercise[];
  ressources: AIContentRessources;
}

const CACHE_PREFIX = "ai_content_pack__";

function cacheKey(f: FormationInfo): string {
  const sig = (f.intitule || "").trim().toLowerCase().slice(0, 80);
  return CACHE_PREFIX + sig;
}

export function getCachedContentPack(f: FormationInfo): AIContentPack | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(f));
    if (!raw) return null;
    return JSON.parse(raw) as AIContentPack;
  } catch {
    return null;
  }
}

export function setCachedContentPack(f: FormationInfo, pack: AIContentPack): void {
  try {
    sessionStorage.setItem(cacheKey(f), JSON.stringify(pack));
  } catch {
    /* quota: ignore */
  }
}

export function clearCachedContentPack(f: FormationInfo): void {
  try {
    sessionStorage.removeItem(cacheKey(f));
  } catch {
    /* ignore */
  }
}

export async function generateAIContentPack(
  f: FormationInfo,
  opts: { force?: boolean; nbStagiaires?: number; humanizeBesoins?: boolean } = {},
): Promise<AIContentPack> {
  if (!opts.force) {
    const cached = getCachedContentPack(f);
    if (cached) return cached;
  }
  const { data, error } = await supabase.functions.invoke("generate-formation-content", {
    body: {
      intitule: f.intitule,
      objectifs: f.objectifs,
      programme: f.programme,
      publicVise: f.publicVise,
      prerequis: f.prerequis,
      nbStagiaires: opts.nbStagiaires ?? 1,
      humanizeBesoins: opts.humanizeBesoins ?? true,
      model: "google/gemini-2.5-flash",
    },
  });
  if (error) throw new Error(error.message || "Erreur appel IA contenu");
  if (!data || (data as any).error) throw new Error((data as any)?.error || "Réponse IA vide");
  const pack = (data as any).pack as AIContentPack;
  setCachedContentPack(f, pack);
  return pack;
}

// ---- Banque d'images Unsplash (mots-clés -> photos contextuelles) ----
// Stratégie : on cherche dans le pool en fonction du intitule de formation,
// puis on cycle au fil des chapitres. Pas d'appel réseau côté image (URLs publiques).
const IMG_POOLS: Record<string, string[]> = {
  default: [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80",
    "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=900&q=80",
  ],
  office: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80",
  ],
  commerce: [
    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=900&q=80",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80",
  ],
  health: [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80",
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900&q=80",
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80",
  ],
  beauty: [
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=900&q=80",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80",
    "https://images.unsplash.com/photo-1522335789203-aaaa66c1a09b?w=900&q=80",
  ],
  driving: [
    "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=900&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&q=80",
    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80",
  ],
  cooking: [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
    "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=900&q=80",
  ],
  language: [
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=900&q=80",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
  ],
  marketing: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=900&q=80",
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=900&q=80",
  ],
  ai: [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80",
    "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=900&q=80",
  ],
  social: [
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=900&q=80",
    "https://images.unsplash.com/photo-1591084728795-1149f32d9866?w=900&q=80",
  ],
  management: [
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80",
  ],
};

export function pickImagesForQuery(query: string, intitule: string): string[] {
  const t = `${query || ""} ${intitule || ""}`.toLowerCase();
  if (/office|excel|word|bureautique|powerpoint|outlook|assistant|secrétaire|secretary/.test(t)) return IMG_POOLS.office;
  if (/commerc|vente|sales|client|ntc|negotia|technico/.test(t)) return IMG_POOLS.commerce;
  if (/health|massage|infirm|aide-soig|sant|medical|nurse|petite enfance/.test(t)) return IMG_POOLS.health;
  if (/beauty|esthet|cosmet|nail|spa|hair/.test(t)) return IMG_POOLS.beauty;
  if (/driv|vtc|car|chauffeur|ecsr|sécurité routière|transport/.test(t)) return IMG_POOLS.driving;
  if (/cook|chef|restaur|cuisine|food|baker/.test(t)) return IMG_POOLS.cooking;
  if (/language|english|anglais|fle|toeic|espagnol|allemand|french/.test(t)) return IMG_POOLS.language;
  if (/market|seo|social media|réseaux sociaux|content|community/.test(t)) return IMG_POOLS.marketing;
  if (/ai|artificial|ia|chatgpt|llm|generative/.test(t)) return IMG_POOLS.ai;
  if (/social work|insertion|cip|éducateur|moniteur|médico-social/.test(t)) return IMG_POOLS.social;
  if (/management|manager|rh|leadership|encadrement/.test(t)) return IMG_POOLS.management;
  return IMG_POOLS.default;
}
