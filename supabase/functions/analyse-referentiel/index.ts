import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { aiJson, AiError, arr, json, obj, requireAuth, S, userContent } from "../_shared/aiJson.ts";

const SCHEMA = obj({
  code: S("Code RNCPxxxxx ou RSxxxx, vide si inconnu"),
  type: { type: "string", enum: ["RNCP", "RS", ""] },
  intitule: S(),
  niveau: { type: ["integer", "null"], description: "Niveau 3 à 8, null si absent (RS)" },
  certificateur: S(),
  dateFinEnregistrement: S("YYYY-MM-DD ou vide"),
  actif: { type: ["boolean", "null"], description: "false si fiche inactive / enregistrement terminé" },
  blocs: arr(obj({ code: S(), intitule: S() })),
  prerequis: S("Conditions d'accès / prérequis"),
  publicVise: S(),
  codesRome: arr(S()),
  metiers: arr(S("Métiers / emplois visés")),
  secteurs: arr(S("Secteurs d'activité")),
  modalitesEvaluation: S(),
});

const SYSTEM = `Tu analyses une fiche France Compétences (RNCP ou RS). Extrait UNIQUEMENT les informations présentes dans la source. N'invente rien : chaîne vide, tableau vide ou null si absent. Dates au format YYYY-MM-DD. Réponds en français.`;

function htmlToText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<(br|\/p|\/div|\/li|\/h\d|\/tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#039;|&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const authErr = await requireAuth(req);
  if (authErr) return authErr;
  try {
    const body = await req.json().catch(() => ({}));
    const url = typeof body.url === "string" ? body.url.trim() : "";
    const fileDataUrl = typeof body.fileDataUrl === "string" ? body.fileDataUrl : "";
    const text = typeof body.text === "string" ? body.text.slice(0, 120000) : "";
    const filename = typeof body.filename === "string" ? body.filename : "referentiel.pdf";

    let sourceText = text;
    if (url) {
      if (!/^https:\/\/(www\.)?francecompetences\.fr\/recherche\/(rncp|rs)\/\d+/i.test(url)) {
        return json({ error: "Lien invalide : utilisez un lien francecompetences.fr/recherche/rncp/… ou /rs/…" }, 400);
      }
      try {
        const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; QualiopiGenerator/1.0)", Accept: "text/html" } });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        sourceText = htmlToText(await r.text()).slice(0, 120000);
        if (sourceText.length < 300) throw new Error("page vide");
      } catch (e) {
        console.error("fetch FC failed", e);
        return json({ error: "Impossible de récupérer la fiche France Compétences. Téléchargez le PDF de la fiche (bouton « Imprimer » sur le site) et importez-le ici.", fetchFailed: true }, 422);
      }
    }
    if (!sourceText && !fileDataUrl) return json({ error: "Fournissez un lien, un fichier ou un texte." }, 400);

    const content = userContent(
      sourceText ? `Fiche à analyser${url ? ` (${url})` : ""} :\n\n${sourceText}` : "Analyse la fiche référentiel jointe.",
      sourceText ? undefined : fileDataUrl,
      filename,
    );
    const result = await aiJson(req, SYSTEM, content, "referentiel", SCHEMA);
    return json(result);
  } catch (e) {
    if (e instanceof AiError) return json({ error: e.message }, e.status);
    console.error("analyse-referentiel", e);
    return json({ error: e instanceof Error ? e.message : "Erreur inconnue" }, 500);
  }
});
