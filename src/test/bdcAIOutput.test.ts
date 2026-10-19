import { describe, expect, it, vi } from "vitest";
import { finalOnlyOutput } from "../../supabase/functions/bdc-generate-contents/final-only-output";

describe("BDC final-result-only streaming", () => {
  it("does not reparse the growing draft for each streamed fragment", async () => {
    const partialParser = vi.fn(async (_input: { text: string }) => ({ partial: {} }));
    const completeParser = vi.fn(async ({ text }: { text: string }) => JSON.parse(text));
    const responseFormat = Promise.resolve({ type: "json", schema: { type: "object", additionalProperties: false } });
    const output = finalOnlyOutput({ parsePartialOutput: partialParser, parseCompleteOutput: completeParser, responseFormat });
    for (let i = 1; i <= 2000; i++) {
      expect(await output.parsePartialOutput({ text: "x".repeat(i) })).toBeUndefined();
    }
    expect(partialParser).not.toHaveBeenCalled();
    expect(completeParser).not.toHaveBeenCalled();
    expect(output.responseFormat).toBe(responseFormat);
    expect(await output.parseCompleteOutput({ text: '{"besoins":"Contenu complet"}' })).toEqual({ besoins: "Contenu complet" });
    expect(completeParser).toHaveBeenCalledTimes(1);
  });

  it("preserves terminal final validation errors rather than returning an invalid draft", async () => {
    const validationError = new Error("Invalid final object");
    const output = finalOnlyOutput({
      parsePartialOutput: async () => ({ partial: {} }),
      parseCompleteOutput: async () => { throw validationError; },
    });
    await expect(output.parseCompleteOutput()).rejects.toBe(validationError);
  });
});