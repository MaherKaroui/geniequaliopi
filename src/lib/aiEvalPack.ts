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
 * Strategy : ~80–90% correct (debut), ~90–95% correct (fin).
 * OPCO début : score < 7/10 (4 à 6 bonnes réponses, déterministe).
 * Variation déterministe par stagiaire.
 */
export function answersForQCM(qcm: AIQCMQuestion[], si: number, s: StagiaireInfo, mode: "debut" | "fin", isOpco: boolean = false, targetCorrect?: number): number[] {
  const n = qcm.length;

  // Si une cible de bonnes réponses est imposée → on force exactement ce nombre
  if (typeof targetCorrect === "number") {
    const seedBase = stagSeed(s, si, 9123);
    const correctCount = Math.max(0, Math.min(n, Math.round(targetCorrect)));
    const wrongCount = n - correctCount;
    const wrongSet = new Set<number>();
    let k = 0;
    while (wrongSet.size < wrongCount && k < n * 8) {
      const idx = (seedBase + k * 13) % n;
      wrongSet.add(idx);
      k++;
    }
    return qcm.map((q, qi) => {
      if (!wrongSet.has(qi)) return q.correctIndex;
      const seed = stagSeed(s, si, qi * 7);
      const wrongOptions = [0, 1, 2, 3].filter((i) => i !== q.correctIndex);
      return wrongOptions[seed % wrongOptions.length];
    });
  }

  // OPCO début : score garanti < 7/10 (4 à 6 fausses)
  if (isOpco && mode === "debut") {
    const seedBase = stagSeed(s, si, 7777);
    const wrongCount = Math.min(n, 4 + (seedBase % 3));
    const wrongSet = new Set<number>();
    let k = 0;
    while (wrongSet.size < wrongCount && k < n * 4) {
      const idx = stagSeed(s, si, 3000 + k * 11) % n;
      wrongSet.add(idx);
      k++;
    }
    return qcm.map((q, qi) => {
      if (!wrongSet.has(qi)) return q.correctIndex;
      const seed = stagSeed(s, si, qi * 7);
      const wrongOptions = [0, 1, 2, 3].filter((i) => i !== q.correctIndex);
      return wrongOptions[seed % wrongOptions.length];
    });
  }

  // Comportement par défaut (Qualiopi, EY, etc.)
  const correctRate = mode === "fin" ? 0.92 : 0.78;
  return qcm.map((q, qi) => {
    const seed = stagSeed(s, si, qi * 7 + (mode === "fin" ? 1000 : 0));
    const rand = ((seed * 9301 + 49297) % 233280) / 233280;
    if (rand < correctRate) return q.correctIndex;
    const wrongOptions = [0, 1, 2, 3].filter((i) => i !== q.correctIndex);
    return wrongOptions[seed % wrongOptions.length];
  });
}

/** Returns a per-stagiaire student answer derived from corrected response, humanized (oral tone, hesitations, first-person). */
export function studentAnswerFromCorrection(reponseAttendue: string, s: StagiaireInfo, si: number, qIdx: number): string {
  // Quality varies per stagiaire (0.65 → 0.95) to produce natural variety:
  // some answers concise/partial, some complete, all in oral first-person tone.
  const seed = stagSeed(s, si, qIdx * 13);
  const quality = 0.65 + ((seed % 31) / 31) * 0.30;
  return humanizedStudentAnswer(reponseAttendue, s, si, qIdx, quality);
}


/** Note /points pour une question ouverte (selon stagiaire). 70% des cas = max - 1, 30% = max. */
export function noteForOpenQuestion(maxPoints: number, s: StagiaireInfo, si: number, qIdx: number): number {
  const seed = stagSeed(s, si, qIdx * 17 + 5);
  const rand = ((seed * 9301 + 49297) % 233280) / 233280;
  if (rand < 0.4) return maxPoints; // top
  if (rand < 0.85) return Math.max(maxPoints - 1, Math.ceil(maxPoints * 0.8));
  return Math.max(Math.ceil(maxPoints * 0.7), 1);
}

/** Note ascendante : jour 1 ~55%, dernier jour ~95%. Déterministe par stagiaire. */
export function noteForDayProgression(maxPoints: number, dayIdx: number, totalDays: number, s: StagiaireInfo, si: number): number {
  if (maxPoints <= 0) return 0;
  const t = totalDays <= 1 ? 1 : dayIdx / (totalDays - 1);
  const baseRatio = 0.55 + t * 0.40; // 0.55 → 0.95
  const seed = stagSeed(s, si, dayIdx * 23 + 7);
  const jitter = (((seed % 100) / 100) - 0.5) * 0.06; // ±3%
  const ratio = Math.max(0.45, Math.min(1, baseRatio + jitter));
  return Math.max(1, Math.min(maxPoints, Math.round(maxPoints * ratio)));
}

/** Transformations "orales" pour casser le ton manuel scolaire. */
function humanizeText(text: string, _seed: number, quality: number): string {
  let t = text;
  const swaps: [RegExp, string][] = [
    [/\bIl convient de\b/gi, "il faut"],
    [/\bIl est nécessaire de\b/gi, "on doit"],
    [/\bIl est important de\b/gi, "c'est important de"],
    [/\bAfin de\b/gi, "pour"],
    [/\bnotamment\b/gi, "surtout"],
    [/\bpar conséquent\b/gi, "du coup"],
    [/\bainsi\b/gi, "comme ça"],
    [/\bcependant\b/gi, "mais"],
    [/\btoutefois\b/gi, "mais"],
    [/\bnéanmoins\b/gi, "quand même"],
    [/\bC'est-à-dire\b/gi, "c'est à dire"],
    [/\beffectivement\b/gi, "en vrai"],
    [/\bpermet de\b/gi, "ça sert à"],
    [/\bconsiste à\b/gi, "c'est"],
  ];
  swaps.forEach(([re, rep]) => { t = t.replace(re, rep); });
  if (quality < 0.7) {
    t = t.replace(/\bil y a\b/gi, "ya").replace(/\bcela\b/gi, "ça").replace(/\bnous\b/gi, "on");
  } else if (quality < 0.85) {
    t = t.replace(/\bcela\b/gi, "ça").replace(/\bnous\b/gi, "on");
  }
  t = t.replace(/;\s*/g, ". ").replace(/\s+/g, " ").trim();
  return t;
}

/** Réponse humanisée : ton oral, hésitations, formulations propres au stagiaire, parfois plus courte. */
export function humanizedStudentAnswer(reponseAttendue: string, s: StagiaireInfo, si: number, dayIdx: number, quality: number): string {
  const seed = stagSeed(s, si, dayIdx * 19 + 3);
  const openings = [
    `Pour moi, `, `Je pense que `, `Si j'ai bien compris en cours, `, `Alors, `,
    `Moi je dirais que `, `À mon avis, `, `Je crois que `, `Bon, `,
    `D'après ce qu'on a vu, `, `Je vais essayer : `,
  ];
  const closings = [
    ` Voilà ce que j'ai retenu.`,
    ` C'est ce que le formateur nous a expliqué.`,
    ` J'espère que ma réponse est correcte.`,
    ` En tout cas c'est comme ça que je le comprends.`,
    ` Après je sais pas si c'est exactement ça.`,
    ``, ``,
    ` Je vais continuer à m'entraîner pour mieux maîtriser.`,
  ];
  const hesitations = ["euh, ", "alors, ", "en fait, ", "bon, ", "", "", ""];

  const open = openings[seed % openings.length];
  const close = closings[(seed >> 3) % closings.length];
  const hesit = hesitations[(seed >> 5) % hesitations.length];

  const sentences = reponseAttendue.split(/(?<=[.!?])\s+/).filter(Boolean);
  let kept = sentences;
  if (quality < 0.65) kept = sentences.slice(0, Math.max(1, Math.ceil(sentences.length * 0.45)));
  else if (quality < 0.8) kept = sentences.slice(0, Math.max(1, Math.ceil(sentences.length * 0.7)));
  else if (quality < 0.92) kept = sentences.slice(0, Math.max(1, Math.ceil(sentences.length * 0.9)));

  let body = humanizeText(kept.join(" "), seed, quality);
  if (body) body = body.charAt(0).toLowerCase() + body.slice(1);

  const parts = body.split(/(?<=\.)\s+/);
  if (parts.length > 1 && (seed % 3 === 0)) {
    const mid = Math.floor(parts.length / 2);
    parts[mid] = (hesitations[(seed >> 2) % hesitations.length] || "") + parts[mid];
    body = parts.join(" ");
  }

  return `${open}${hesit}${body}${close}`.trim().replace(/\s+([.,])/g, "$1");
}

/** Variante humanisée d'une justification de réponse QCM. */
export function humanizedQCMComment(correct: boolean, s: StagiaireInfo, si: number, dayIdx: number): string {
  const seed = stagSeed(s, si, dayIdx * 11 + 1);
  const ok = [
    "Je suis sûr de ma réponse, on l'a vu en cours.",
    "Je pense que c'est la bonne, le formateur l'a expliqué hier.",
    "Pour moi c'est évident, j'ai bien retenu cette partie.",
    "Je coche celle-ci, c'est ce qui correspond le mieux à mon avis.",
    "Ça me paraît logique, je vais avec celle-là.",
    "J'ai bien révisé hier soir, je suis confiant.",
  ];
  const ko = [
    "Je ne suis pas sûr, je tente celle-ci.",
    "J'hésite mais je choisis cette réponse, on verra bien.",
    "Je crois que c'est celle-là, à confirmer avec le formateur.",
    "Je n'ai pas bien compris cette notion, je réponds au mieux.",
    "Bon, je tente ma chance avec cette option.",
    "Pas évident pour moi, je coche au feeling.",
  ];
  return (correct ? ok : ko)[seed % (correct ? ok.length : ko.length)];
}

/** Appréciation formateur humanisée par exercice. */
export function humanizedTeacherFeedback(note: number, max: number, s: StagiaireInfo, si: number, dayIdx: number): string {
  const ratio = max > 0 ? note / max : 0;
  const seed = stagSeed(s, si, dayIdx * 29 + 11);
  const top = [
    "Très bonne réponse, les notions clés sont bien restituées.",
    "Excellent travail, raisonnement clair et structuré.",
    "Bonne maîtrise du sujet, continuez ainsi.",
    "Parfait, vous avez bien intégré le cours.",
  ];
  const mid = [
    "Réponse correcte dans l'ensemble, à approfondir sur les détails techniques.",
    "Bonne base, il manque quelques éléments pour être complet.",
    "Sur la bonne voie, pensez à structurer davantage la réponse.",
    "Globalement juste, attention au vocabulaire professionnel.",
  ];
  const low = [
    "Réponse partielle, revoir la partie correspondante du cours.",
    "Quelques notions à reprendre, n'hésitez pas à poser des questions.",
    "Bon début mais incomplet, à retravailler.",
    "Compréhension à consolider, je vous accompagne sur ce point.",
  ];
  const pool = ratio >= 0.85 ? top : ratio >= 0.6 ? mid : low;
  return pool[seed % pool.length];
}

