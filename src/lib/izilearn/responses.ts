import type { IzQuiz, IzReponses } from "./types";

/** A questionnaire shell is not an imported answer. Zero scores remain real. */
export function hasRecordedResponses(value?: IzReponses | null): boolean {
  return !!value && (value.reponses.some((item) => String(item.reponse ?? "").trim().length > 0)
    || String(value.score ?? "").trim().length > 0);
}

export function hasRecordedQuiz(value: IzQuiz): boolean {
  return !!value.date && (value.score != null || value.reussi != null
    || String(value.appreciation ?? "").trim().length > 0);
}