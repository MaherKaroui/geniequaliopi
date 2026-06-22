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
Tu DOIS auditer point par point les 14 MISSIONS OBLIGATOIRES d'un CFA telles que définies par l'Article L.6231-2 du Code du travail (source DREETS Normandie). Pour chacune, vérifie si une preuve/un dispositif existe dans le dossier (champ, document, mention). Si absente → finding "manquant" (critère 3 ou 6 selon le cas).

LES 14 MISSIONS OFFICIELLES (libellés exacts à reprendre dans le constat) :

1. **Accompagner les personnes** (y compris handicap) souhaitant s'orienter par l'apprentissage — développer connaissances/compétences, faciliter intégration emploi. ⇒ Vérifier : référent handicap nommé, adaptations proposées, projet professionnel formalisé.
2. **Appuyer et accompagner les postulants** dans leur recherche d'un employeur. ⇒ Vérifier : cellule placement, ateliers CV, partenariats entreprises.
3. **Assurer la cohérence** entre formation CFA et formation en entreprise — coopération formateurs / maîtres d'apprentissage. ⇒ Vérifier : livret apprenti, fiches navette, visites entreprise, calendrier alternance.
4. **Informer les apprentis de leurs droits et devoirs** (statut apprenti + salarié + règles santé/sécurité). ⇒ Vérifier : livret d'accueil, règlement intérieur signé, module droits/devoirs.
5. **Apprentis en rupture de contrat** : poursuite formation 6 mois + accompagnement recherche nouvel employeur (lien avec SPE). ⇒ Vérifier : procédure rupture, référent rupture, affiliation sécurité sociale documentée.
6. **Accompagnement social et matériel** (en lien avec missions locales/SPE) — prévention difficultés mettant en péril le contrat. ⇒ Vérifier : référent social, partenariat mission locale, dispositifs aides matérielles.
7. **Favoriser la mixité** F/H — sensibilisation égalité, prévention harcèlement sexuel, lutte contre répartition sexuée des métiers. ⇒ Vérifier : charte mixité, actions sensibilisation, politique orientation.
8. **Mixité des métiers et égalité professionnelle** — actions d'information dédiées. ⇒ Vérifier : interventions, supports, comptes-rendus.
9. **Diversité** au-delà F/H — sensibilisation égalité des chances et lutte contre discriminations. ⇒ Vérifier : charte diversité, actions, politique orientation.
10. **Mobilité nationale et internationale** — référent mobilité, programmes UE (Erasmus+), mention période mobilité dans le contenu. ⇒ Vérifier : référent mobilité nommé, conventions Erasmus, mentions au programme.
11. **Suivi et accompagnement** des apprentis si formation à distance (FOAD). ⇒ Vérifier : dispositif suivi distanciel, plateforme LMS, hotline, planning connexions.
12. **Évaluer les compétences acquises** (y compris contrôle continu, dans le respect de l'organisme certificateur). ⇒ Vérifier : grilles CCF, PV évaluations, bulletins semestriels.
13. **Accompagner les apprentis ayant interrompu leur formation ou sans diplôme** vers organismes pouvant les aider à définir un projet de poursuite. ⇒ Vérifier : procédure orientation post-rupture/post-échec, partenariats.
14. **Accompagner les apprentis dans leurs démarches pour accéder aux aides** (logement, transport, équipement, etc.). ⇒ Vérifier : guide aides, accompagnement administratif, fiches récap.

⚠️ Pour CFA tu DOIS produire au minimum 1 finding par mission absente ou faiblement couverte. Format obligatoire du constat : "Mission CFA N°X — <titre court> : <ce qui manque concrètement>". Ne regroupe JAMAIS plusieurs missions dans un seul finding.

OBLIGATIONS CFA COMPLÉMENTAIRES (à auditer aussi, en plus des 14 missions — critère 1/4/6) :
- **Déclaration d'activité** enregistrée + mention "apprentissage" dans les statuts (Art. L.6231-5/6, R.6351-8-1)
- **Code UAI** obtenu auprès de l'Éducation nationale (nécessaire enregistrement contrats)
- **Principe de gratuité** : aucune contrepartie financière demandée à l'apprenti/représentant légal (Art. L.6211-1, L.6221-2)
- **Convention de formation par apprentissage** tripartite (Art. L.6353-1, D.6353-1) — intitulé, objectif, contenu, moyens, durée, prix, modalités règlement
- **Conseil de Perfectionnement** institué (Art. L.6231-3, R.6231-3 à R.6231-5) — présidé par le directeur, examine projet pédago, accueil, mixité, mobilité, conventions, investissements
- **Règlement intérieur** écrit (Art. L.6352-3, R.6352-1) — santé, sécurité, discipline, représentation stagiaires/apprentis, fonctionnement du CP
- **Références à la Nation** (Art. L.6231-7) — devise République, drapeau tricolore + européen sur façade, DDHC 1789 affichée
- **Comptabilité analytique** (Art. L.6231-4) obligatoire
- **Certification qualité (Qualiopi)** obtenue
- CERFA 10103 signé pour chaque apprenti ; maître d'apprentissage (nom, expérience 2 ans min, attestation) ; SIA / DPAE ; OPCO de référence ; données apprenti complètes (NIR, RQTH, date naissance, niveau entrée, diplôme préparé, employeur, dates contrat)

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
