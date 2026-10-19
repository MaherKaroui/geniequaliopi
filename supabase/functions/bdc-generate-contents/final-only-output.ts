/** Keep the SDK's strict schema and final validation without reparsing growing JSON
 * on every token. This endpoint only returns the completed object, not partials. */
export function finalOnlyOutput<T extends { parsePartialOutput: (...args: never[]) => unknown }>(output: T): T {
  return { ...output, parsePartialOutput: async () => undefined };
}