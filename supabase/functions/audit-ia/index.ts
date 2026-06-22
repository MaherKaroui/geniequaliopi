// Audit IA — analyse réelle du dossier Qualiopi par IA (Lovable AI Gateway)
// Reçoit le contexte complet (org, formation, stagiaires, type d'action) + liste des documents générés.
// Retourne une analyse structurée : manques, incohérences, suggestions d'amélioration par critère.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es un auditeur Qualiopi senior expert (référentiel V9, 7 critères, 32 indicateurs).
On te fournit un dossier réel (organisme, formation, stagiaires, documents générés) ET le type d'action choisi parmi :
- AF (Action de Formation classique)
- BC (Bilan de Compétences)
- VAE (Validation des Acquis de l'Expérience)
- CFA (Apprentissage)

Ta mission : auditer le dossier comme si tu étais en visite réelle.

⚠️ RÈGLE ABSOLUE — DOCUMENTS GÉNÉRÉS :
La liste "documentsGeneres" fournie est la liste EXHAUSTIVE des documents que l'application produit automatiquement pour ce dossier. Tu DOIS la considérer comme du livrable réel et présent dans le dossier.
- Ne déclare JAMAIS "manquant" un document dont le nom (ou un nom équivalent) apparaît dans documentsGeneres.
- Avant de signaler un manque, vérifie d'abord par mot-clé dans documentsGeneres (ex : "convention", "synthèse", "confidentialité", "phase préliminaire", "phase d'investigation", "phase de conclusion", "livret 1", "livret 2", "CERFA", "émargement", "bilan à chaud", "bilan à froid", "veille", "handicap", "réclamation", etc.).
- Si le document existe : ne le mets PAS dans findings. Concentre-toi sur les vraies lacunes (champs vides obligatoires, incohérences de dates, formats invalides, données incohérentes entre stagiaires et formation, etc.).

Tu dois identifier RIGOUREUSEMENT :
1. Les INFORMATIONS MANQUANTES dans les CHAMPS du dossier (org/formation/stagiaires) — pas les documents si déjà générés
2. Les INCOHÉRENCES (dates, durées, profils, doublons, valeurs improbables)
3. Les DONNÉES INCORRECTES (formats invalides : SIRET, NDA, email, téléphone, dates impossibles)
4. Les AMÉLIORATIONS QUALIOPI (preuves manquantes côté champ, indicateurs faibles)

Adapte tes contrôles au type d'action :
- AF : convention bilatérale, programme, émargements, bilans chaud/froid, certif
- BC : 3 phases (préliminaire/investigation/conclusion), 24h max, document de synthèse, confidentialité
- VAE : livret 1 et 2, 10 sessions accompagnement, jury, recevabilité France VAE
- CFA : focus EXTRÊMEMENT rigoureux — voir bloc dédié ci-dessous.

🎓 BLOC CFA — APPRENTISSAGE (à appliquer si typeAction === "CFA") :
Tu DOIS auditer point par point les 14 MISSIONS OBLIGATOIRES d'un CFA (Code du travail L.6231-2). Pour chacune, vérifie si une preuve/un dispositif existe dans le dossier (champ, document, mention). Si absent → finding "manquant" critère 3 ou 6.

Les 14 missions à contrôler une par une :
1. Définir, organiser, mettre en œuvre les enseignements (programme, REAC, blocs RNCP) → vérifier formation.programme, RNCP, blocs
2. Suivre et accompagner les apprentis (référent pédagogique, fiche de suivi)
3. Coopérer avec l'entreprise et le maître d'apprentissage (livret apprenti, visites entreprise, fiches navette)
4. Assurer la cohérence entre formation pratique et théorique (calendrier alternance, synopsis)
5. Informer apprentis et familles sur déroulement (livret d'accueil, règlement intérieur, modalités examen)
6. Accompagner l'apprenti vers la certification (préparation examen, PV blanc, mock)
7. Évaluer les compétences en lien avec entreprise (grilles CCF, bilans semestriels)
8. Assister candidats à la rupture pour en trouver un nouveau (procédure rupture, accompagnement 6 mois)
9. Favoriser la mixité, sensibiliser à l'égalité F/H et lutte contre discriminations (charte, action de sensibilisation)
10. Accompagner les apprentis en situation de handicap (référent handicap nommé, dispositifs)
11. Encourager mobilité nationale et internationale (Erasmus+, conventions mobilité)
12. Encourager engagement citoyen (action citoyenneté, valeurs République)
13. Évaluer les compétences acquises hors CFA (positionnement, VAE partielle, allègements)
14. Mettre en place un Conseil de Perfectionnement (CP) — composition, fréquence, PV de réunion

⚠️ Pour CFA tu DOIS générer au minimum 1 finding par mission manquante (ne pas regrouper). Indique clairement "Mission CFA N°X — <titre>" dans le constat.

Contrôles CFA additionnels :
- CERFA 10103 (contrat d'apprentissage) signé pour chaque apprenti
- Maître d'apprentissage : nom, fonction, expérience, attestation 2 ans
- Livret apprenti / livret de suivi tripartite renseigné
- Visites entreprise planifiées (min 1/an)
- SIA (Système d'Information sur l'Apprentissage) déclaré
- Référent mobilité, référent handicap, référent rupture nommés
- Conseil de Perfectionnement tenu (PV)
- OPCO de référence identifié
- NDA + Certification Qualiopi CFA mention apprentissage
- Données apprenti : NIR, RQTH, date naissance, niveau d'entrée, diplôme préparé, employeur, dates contrat

Réponds UNIQUEMENT en JSON valide (pas de markdown, pas de \`\`\`) avec ce schéma EXACT :
{
  "scoreGlobal": <0-100>,
  "synthese": "<2-3 phrases ton d'auditeur>",
  "findings": [
    {
      "severity": "critical" | "major" | "minor" | "info",
      "categorie": "manquant" | "incoherence" | "incorrect" | "amelioration",
      "critere": <1-7 ou 0 si transverse>,
      "indicateur": <1-32 ou 0>,
      "zone": "<Organisme|Formation|Stagiaire X|Document Y|Cohérence>",
      "constat": "<ce que tu observes>",
      "impact": "<conséquence audit Qualiopi>",
      "action": "<correction concrète à apporter>"
    }
  ]
}

Sois exhaustif (10-25 findings typiques). Ordre : critical > major > minor > info.`;

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data: userData, error: authErr } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { type, organisme, formation, stagiaires, documents } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const docList = Array.isArray(documents) ? documents : [];
    const docNames = Array.from(new Set(docList.map((d: any) => (typeof d === "string" ? d : d?.nom)).filter(Boolean))).slice(0, 150);

    const ctx = {
      typeAction: type || "AF",
      organisme: organisme || {},
      formation: formation || {},
      stagiaires: Array.isArray(stagiaires) ? stagiaires : [],
      nbStagiaires: Array.isArray(stagiaires) ? stagiaires.length : 0,
      documentsGeneres: docNames,
    };

    const isCfa = (type || "").toUpperCase() === "CFA";
    const cfaInstruction = isCfa
      ? `\n\n⚠️ TYPE CFA : tu DOIS passer en revue les 14 missions CFA UNE PAR UNE. Pour chaque mission absente ou faiblement couverte, génère un finding distinct au format constat "Mission CFA N°X — <titre> : <ce qui manque>". Vise 20-30 findings au total pour un CFA.`
      : "";
    const maxFindings = isCfa ? 30 : 15;
    const userMsg = `Audit du dossier suivant (type ${ctx.typeAction}) :\n\n${JSON.stringify(ctx, null, 2).slice(0, 18000)}\n\nFais l'audit complet maintenant. Limite-toi à ${maxFindings} findings maximum (les plus importants).${cfaInstruction}`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMsg },
        ],
        response_format: { type: "json_object" },
        max_tokens: isCfa ? 14000 : 8000,
      }),
    });

    if (resp.status === 429) return new Response(JSON.stringify({ error: "Trop de requêtes — réessaie dans quelques secondes." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (resp.status === 402) return new Response(JSON.stringify({ error: "Crédits IA épuisés. Recharge ton workspace." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!resp.ok) {
      const txt = await resp.text();
      console.log("[audit-ia] gateway error", resp.status, txt);
      return new Response(JSON.stringify({ error: txt }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try { parsed = JSON.parse(content); } catch {
      const m = content.match(/\{[\s\S]*\}/);
      if (m) { try { parsed = JSON.parse(m[0]); } catch {} }
    }
    if (!parsed || typeof parsed !== "object") parsed = {};
    if (!Array.isArray(parsed.findings)) parsed.findings = [];
    if (typeof parsed.scoreGlobal !== "number") parsed.scoreGlobal = 0;
    if (typeof parsed.synthese !== "string") parsed.synthese = "";

    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
