/**
 * Adapte le vocabulaire d'un document HTML au type d'action choisi
 * (VAE, bilan de compétences, apprentissage). N'agit que sur le texte
 * visible (hors balises/attributs). "actions-formation" = inchangé.
 */
type Rule = [RegExp, string];

const RULES: Record<string, Rule[]> = {
  vae: [
    [/CONTRAT DE FORMATION PROFESSIONNELLE/g, "CONTRAT D'ACCOMPAGNEMENT VAE"],
    [/CONVENTION DE FORMATION/g, "CONVENTION D'ACCOMPAGNEMENT VAE"],
    [/PROGRAMME DE (LA )?FORMATION/g, "PROGRAMME DE L'ACCOMPAGNEMENT VAE"],
    [/[Aa]ctions? de formation/g, "accompagnement à la VAE"],
    [/Programme de (la )?formation/g, "Programme de l'accompagnement VAE"],
    [/Contrat de formation professionnelle/g, "Contrat d'accompagnement VAE"],
    [/Convention de formation/g, "Convention d'accompagnement VAE"],
    [/organisme de formation/g, "organisme accompagnateur"],
    [/\bSTAGIAIRES\b/g, "BÉNÉFICIAIRES"], [/\bSTAGIAIRE\b/g, "BÉNÉFICIAIRE"],
    [/\bStagiaires\b/g, "Bénéficiaires"], [/\bStagiaire\b/g, "Bénéficiaire"],
    [/\bstagiaires\b/g, "bénéficiaires"], [/\bstagiaire\b/g, "bénéficiaire"],
  ],
  "bilans-competences": [
    [/CONTRAT DE FORMATION PROFESSIONNELLE/g, "CONTRAT DE BILAN DE COMPÉTENCES"],
    [/CONVENTION DE FORMATION/g, "CONVENTION DE BILAN DE COMPÉTENCES"],
    [/PROGRAMME DE (LA )?FORMATION/g, "PROGRAMME DU BILAN DE COMPÉTENCES"],
    [/[Aa]ctions? de formation/g, "bilan de compétences"],
    [/Programme de (la )?formation/g, "Programme du bilan de compétences"],
    [/Contrat de formation professionnelle/g, "Contrat de bilan de compétences"],
    [/Convention de formation/g, "Convention de bilan de compétences"],
    [/organisme de formation/g, "prestataire de bilan"],
    [/\bSTAGIAIRES\b/g, "BÉNÉFICIAIRES"], [/\bSTAGIAIRE\b/g, "BÉNÉFICIAIRE"],
    [/\bStagiaires\b/g, "Bénéficiaires"], [/\bStagiaire\b/g, "Bénéficiaire"],
    [/\bstagiaires\b/g, "bénéficiaires"], [/\bstagiaire\b/g, "bénéficiaire"],
  ],
  apprentissage: [
    [/CONTRAT DE FORMATION PROFESSIONNELLE/g, "CONTRAT DE FORMATION PAR APPRENTISSAGE"],
    [/CONVENTION DE FORMATION/g, "CONVENTION DE FORMATION PAR APPRENTISSAGE"],
    [/[Aa]ctions? de formation(?! par apprentissage)/g, "action de formation par apprentissage"],
    [/organisme de formation/g, "CFA"],
    [/\bSTAGIAIRES\b/g, "APPRENTIS"], [/\bSTAGIAIRE\b/g, "APPRENTI"],
    [/\bStagiaires\b/g, "Apprentis"], [/\bStagiaire\b/g, "Apprenti"],
    [/\bstagiaires\b/g, "apprentis"], [/\bstagiaire\b/g, "apprenti"],
  ],
};

export function adaptHtmlToTypeAction(html: string, typeAction?: string): string {
  const rules = typeAction ? RULES[typeAction] : undefined;
  if (!rules || !html) return html;
  // Ne remplace que le texte entre balises (ni attributs, ni CSS/scripts).
  return html.replace(/(<(style|script)[\s\S]*?<\/\2>)|(<[^>]+>)|([^<]+)/gi, (m, block, _t, tag, text) => {
    if (block || tag) return m;
    let out = text as string;
    for (const [re, rep] of rules) out = out.replace(re, rep);
    return out;
  });
}

export const PACK_LABELS: Record<string, Record<string, string>> = {
  vae: { programme: "Programme de l'accompagnement VAE", contrat: "Contrat d'accompagnement VAE", convention: "Convention d'accompagnement VAE" },
  "bilans-competences": { programme: "Programme du bilan de compétences", contrat: "Contrat de bilan de compétences", convention: "Convention de bilan de compétences" },
  apprentissage: { contrat: "Contrat de formation par apprentissage", convention: "Convention de formation par apprentissage" },
};
