/**
 * AI evaluation pack client (C6 OPCO / EDOF EY / Qualiopi IND 11)
 * - Calls edge function `generate-eval-c6` to get a formation-coherent pack
 * - Caches per formation in sessionStorage
 * - Provides deterministic per-stagiaire variation
 */
import { supabase } from "@/integrations/supabase/client";
import { FormationInfo, StagiaireInfo } from "@/types/qualiopi";

export interface AIQCMQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface AIOpenQuestion {
  question: string;
  reponseAttendue: string;
  points: number;
}

export interface AIExerciceIntermediaire {
  titre: string;
  contexte: string;
  questions: AIOpenQuestion[]; // 4
}

export interface AIExercicePratique {
  titre: string;
  consigne: string;
  reponseAttendue: string;
  points: number;
}

export interface AIEvaluationFinale {
  titre: string;
  exercices: AIExercicePratique[]; // 5
}

export interface AIEvalPack {
  qcmDebut: AIQCMQuestion[];      // 10
  qcmFin: AIQCMQuestion[];        // 10
  exerciceIntermediaire: AIExerciceIntermediaire;
  evaluationFinale: AIEvaluationFinale;
}

const CACHE_PREFIX = "ai_eval_pack__";

function cacheKey(f: FormationInfo): string {
  const sig = (f.intitule || "").trim().toLowerCase().slice(0, 80);
  return CACHE_PREFIX + sig;
}

export function getCachedPack(f: FormationInfo): AIEvalPack | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(f));
    if (!raw) return null;
    return JSON.parse(raw) as AIEvalPack;
  } catch {
    return null;
  }
}

export function setCachedPack(f: FormationInfo, pack: AIEvalPack): void {
  try {
    sessionStorage.setItem(cacheKey(f), JSON.stringify(pack));
  } catch {
    /* quota: silently ignore */
  }
}

export function clearCachedPack(f: FormationInfo): void {
  try {
    sessionStorage.removeItem(cacheKey(f));
  } catch {
    /* ignore */
  }
}

export async function generateAIEvalPack(f: FormationInfo, force = false): Promise<AIEvalPack> {
  if (!force) {
    const cached = getCachedPack(f);
    if (cached) return cached;
  }
  const { data, error } = await supabase.functions.invoke("generate-eval-c6", {
    body: {
      intitule: f.intitule,
      objectifs: f.objectifs,
      contenu: f.programme,
      publicVise: f.publicVise,
      prerequis: f.prerequis,
    },
  });
  if (error) throw new Error(error.message || "Erreur appel IA");
  if (!data || (data as any).error) throw new Error((data as any)?.error || "Réponse IA vide");
  const pack = data as AIEvalPack;
  setCachedPack(f, pack);
  return pack;
}

// ---- Per-stagiaire deterministic variation ----

/** Returns a small int seed derived from stagiaire info + offset */
function stagSeed(s: StagiaireInfo, si: number, offset = 0): number {
  const base = `${s?.prenom || ""}${s?.nom || ""}${si}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) | 0;
  return Math.abs(h + offset);
}

/**
 * For each QCM question, return the index chosen by stagiaire si.
 * Strategy : score garanti > 7/10 (8 ou 9 correctes) pour le début,
 * et ≥ 9/10 pour la fin. Variation déterministe par stagiaire.
 */
export function answersForQCM(qcm: AIQCMQuestion[], si: number, s: StagiaireInfo, mode: "debut" | "fin", isOpco: boolean = false): number[] {
  const n = qcm.length;
  // Nombre de réponses fausses ciblé (déterministe par stagiaire)
  const seedBase = stagSeed(s, si, mode === "fin" ? 999 : 0);
  let wrongCount: number;
  if (mode === "fin") {
    // 0 ou 1 faux (score ≥ 9/10)
    wrongCount = seedBase % 2;
  } else if (isOpco) {
    // OPCO début : score < 7/10 → 4 à 6 fausses (note 4, 5 ou 6 sur 10)
    wrongCount = 4 + (seedBase % 3);
  } else {
    // 1 ou 2 faux → score 8 ou 9 / 10 (> 7)
    wrongCount = 1 + (seedBase % 2);
  }
  wrongCount = Math.min(wrongCount, n);

  // Choisir les indices de questions fausses de manière déterministe
  const wrongSet = new Set<number>();
  let k = 0;
  while (wrongSet.size < wrongCount && k < n * 4) {
    const idx = stagSeed(s, si, (mode === "fin" ? 5000 : 2000) + k * 11) % n;
    wrongSet.add(idx);
    k++;
  }

  return qcm.map((q, qi) => {
    if (!wrongSet.has(qi)) return q.correctIndex;
    const seed = stagSeed(s, si, qi * 7 + (mode === "fin" ? 1000 : 0));
    const wrongOptions = [0, 1, 2, 3].filter((i) => i !== q.correctIndex);
    return wrongOptions[seed % wrongOptions.length];
  });
}

/** Returns a per-stagiaire student answer derived from corrected response, slightly varied. */
export function studentAnswerFromCorrection(reponseAttendue: string, s: StagiaireInfo, si: number, qIdx: number): string {
  // Simple variations: paraphrase prefix + sometimes truncate
  const variants = [
    `${s?.prenom || ""} ${s?.nom || ""} – Réponse :\n${reponseAttendue}`,
    `D'après mon analyse :\n${reponseAttendue}`,
    `Je propose la solution suivante :\n${reponseAttendue}`,
    `Voici ma proposition :\n${reponseAttendue}`,
  ];
  const seed = stagSeed(s, si, qIdx * 13);
  return variants[seed % variants.length];
}

/** Note /points pour une question ouverte (selon stagiaire). 70% des cas = max - 1, 30% = max. */
export function noteForOpenQuestion(maxPoints: number, s: StagiaireInfo, si: number, qIdx: number): number {
  const seed = stagSeed(s, si, qIdx * 17 + 5);
  const rand = ((seed * 9301 + 49297) % 233280) / 233280;
  if (rand < 0.4) return maxPoints; // top
  if (rand < 0.85) return Math.max(maxPoints - 1, Math.ceil(maxPoints * 0.8));
  return Math.max(Math.ceil(maxPoints * 0.7), 1);
}
