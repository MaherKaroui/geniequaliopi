import type { QCMQuestion } from "@/lib/evalContent";

/** Distinct proposed copies, not recorded learner results. */
export function reponsesPositionnement(qs: QCMQuestion[], rang: number): number[] {
  if (!qs.length) return [];
  const n = Math.min(qs.length, 10);
  const masks = Array.from({ length: 2 ** n }, (_, mask) => mask).filter(mask => {
    const correct = Array.from({ length: n }, (_, i) => (mask >> i) & 1).reduce((a, b) => a + b, 0);
    return correct >= Math.ceil(n * 0.5) && correct <= Math.ceil(n * 0.7);
  });
  const index = Math.max(0, Math.floor(rang));
  const mask = masks[index % masks.length] ?? 0;
  return qs.map((q, i) => {
    if (i >= n || ((mask >> i) & 1)) return q.correctIndex;
    const wrong = q.options.map((_, k) => k).filter(k => k !== q.correctIndex);
    return wrong[(Math.floor(index / masks.length) + i) % wrong.length] ?? q.correctIndex;
  });
}