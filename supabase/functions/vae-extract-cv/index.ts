import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function requireAuth(req: Request): Promise<Response | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data, error } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
  if (error || !data?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  return null;
}

const SYSTEM = `Tu es un expert en analyse de CV pour des dossiers VAE.
Extrais FIDÈLEMENT toutes les informations visibles du CV fourni.
N'invente rien : mets "" ou [] si l'info est absente.
Toutes les expériences professionnelles doivent être listées, avec missions détaillées.`;

const TOOL = {
  type: "function",
  function: {
    name: "extract_vae_candidat",
    description: "Extrait les infos du candidat VAE depuis son CV",
    parameters: {
      type: "object",
      properties: {
        civilite: { type: "string", enum: ["M.", "Mme", ""] },
        prenom: { type: "string" },
        nom: { type: "string" },
        dateNaissance: { type: "string" },
        lieuNaissance: { type: "string" },
        adresse: { type: "string" },
        codePostal: { type: "string" },
        ville: { type: "string" },
        telephone: { type: "string" },
        email: { type: "string" },
        emploiActuel: { type: "string" },
        employeur: { type: "string" },
        statut: { type: "string", enum: ["Salarié", "Demandeur d'emploi", "Autre", ""] },
        niveauFormation: { type: "string" },
        diplomes: {
          type: "array",
          items: {
            type: "object",
            properties: { intitule: { type: "string" }, etablissement: { type: "string" }, annee: { type: "string" } },
            required: ["intitule", "etablissement", "annee"],
          },
        },
        experiences: {
          type: "array",
          items: {
            type: "object",
            properties: {
              poste: { type: "string" }, entreprise: { type: "string" },
              dateDebut: { type: "string" }, dateFin: { type: "string" }, missions: { type: "string" },
            },
            required: ["poste", "entreprise", "dateDebut", "dateFin", "missions"],
          },
        },
        competences: { type: "array", items: { type: "string" } },
      },
      required: ["prenom", "nom", "adresse", "codePostal", "ville", "email", "emploiActuel", "statut", "diplomes", "experiences"],
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { fileDataUrl, fileName } = await req.json();
    if (!fileDataUrl || !String(fileDataUrl).startsWith("data:")) {
      return new Response(JSON.stringify({ error: "fileDataUrl required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const mimeMatch = String(fileDataUrl).match(/^data:([^;]+);base64,/);
    const mime = mimeMatch ? mimeMatch[1] : "";
    const isImage = mime.startsWith("image/");
    const isPdf = mime === "application/pdf";
    if (!isImage && !isPdf) {
      return new Response(JSON.stringify({ error: "Format non supporté : envoyez un PDF ou une image (JPG/PNG). Pour un fichier Word, exportez-le en PDF au préalable." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) throw new Error("LOVABLE_API_KEY not configured");

    const userContent: any[] = [
      { type: "text", text: "Analyse ce CV et extrait toutes les données via l'outil extract_vae_candidat." },
    ];
    if (isImage) {
      userContent.push({ type: "image_url", image_url: { url: fileDataUrl } });
    } else {
      userContent.push({ type: "file", file: { filename: fileName || "cv.pdf", file_data: fileDataUrl } });
    }

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: userContent },
        ],
        tools: [TOOL],
        tool_choice: { type: "function", function: { name: "extract_vae_candidat" } },
      }),
    });

    if (!r.ok) {
      if (r.status === 429) return new Response(JSON.stringify({ error: "Trop de requêtes" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (r.status === 402) return new Response(JSON.stringify({ error: "Crédits IA épuisés" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await r.text();
      console.error("AI error", r.status, t);
      throw new Error("AI gateway error");
    }

    const data = await r.json();
    const tc = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!tc) throw new Error("No tool call");
    const parsed = JSON.parse(tc.function.arguments);
    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("vae-extract-cv error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
