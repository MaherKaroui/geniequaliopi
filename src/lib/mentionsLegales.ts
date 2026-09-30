import type { OrganismeInfo } from "@/types/qualiopi";

/**
 * Mention TVA des pièces contractuelles. L'exonération (art. 261-4-4° a du CGI)
 * n'est acquise qu'avec l'attestation délivrée par la DREETS : un organisme
 * assujetti renseigne `regimeTva: "assujetti"`.
 */
export function mentionTVA(o: Partial<OrganismeInfo>): string {
  return o.regimeTva === "assujetti"
    ? "Prix exprimés TTC, TVA au taux en vigueur."
    : "TVA non applicable – exonération de l'article 261-4-4° a du CGI (formation professionnelle continue).";
}
