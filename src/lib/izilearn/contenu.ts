/**
 * Formation inconnue de Génie Qualiopi : on utilise le contenu de la formation
 * dans IZILearn (leçons du LMS, exercices, test d'entrée). S'il manquait, IZILearn
 * l'a créé automatiquement avec son IA avant d'envoyer la session.
 * Les générateurs existants (support de cours, questions) le lisent via le pack
 * de contenu (getCachedContentPack).
 */
import { setCachedContentPack, clearCachedContentPack, type AIContentPack } from "@/lib/aiContentPack";
import { hasEvalContentDedie } from "@/lib/evalContent";
import type { FormationInfo } from "@/types/qualiopi";
import type { IzPayload } from "./types";

/** Formation dont Génie Qualiopi a un contenu rédigé (utilisé si IZILearn n'en a pas). */
export const formationConnue = (f: FormationInfo) => hasEvalContentDedie(f.intitule);

export type EtatContenu = "dedie" | "izilearn" | "aucun";

export function packDepuisIzilearn(p: IzPayload): AIContentPack | null {
  const c = p.formation.contenu;
  if (!c || (!c.chapitres?.length && !c.exercices?.length)) return null;
  return {
    besoins: { besoinsList: [], syntheseHtml: "", adaptationsHtml: "" },
    chapters: (c.chapitres || []).filter((ch) => ch.sections?.length).map((ch) => ({
      title: ch.titre, description: ch.description || "", imageQuery: ch.titre,
      sections: ch.sections.map((s) => ({ title: s.titre, contentHtml: s.html })),
    })),
    exercises: (c.exercices || []).map((e) => ({ titre: e.titre, consigne: e.consigne, reponseAttendue: e.reponseAttendue || "", points: 1 })),
    ressources: { supportsHtml: "", outilsHtml: "", ressourcesComplHtml: "", videos: [] },
  };
}

/** À appeler avant de rendre les pièces : installe (ou retire) le contenu IZILearn de la formation. */
// Le contenu IZILearn est celui de CETTE formation : il prime sur le contenu rédigé de
// Génie Qualiopi, retrouvé seulement par mots de l'intitulé (« digital » → webmarketing…).
export function installerContenu(p: IzPayload, f: FormationInfo): EtatContenu {
  const pack = packDepuisIzilearn(p);
  if (pack) { setCachedContentPack(f, pack); return "izilearn"; }
  clearCachedContentPack(f);
  return formationConnue(f) ? "dedie" : "aucun";
}
