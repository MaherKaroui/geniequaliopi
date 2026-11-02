// Automatisation EDOF — envoi réel d'un e-mail avec pièces jointes (documents d'un stagiaire).
// SMTP de l'expéditeur (Gmail : mot de passe d'application) fourni à chaque appel par l'utilisateur
// connecté ; rien n'est stocké. Port 465 (TLS) : les ports 25 et 587 sont bloqués sur les Edge Functions.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

interface Payload {
  smtp: { host?: string; port?: number; user: string; pass: string; fromName?: string };
  to: string;
  subject: string;
  text: string;
  attachments: { filename: string; base64: string }[];
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_OCTETS = 15 * 1024 * 1024;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // Réservé aux utilisateurs connectés de l'application
  const auth = req.headers.get("Authorization") || "";
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data: u } = await supabase.auth.getUser(auth.replace("Bearer ", ""));
  if (!u?.user) return json({ error: "Connexion requise pour envoyer des e-mails." }, 401);

  let p: Payload;
  try { p = await req.json(); } catch { return json({ error: "Requête invalide" }, 400); }
  if (!p?.smtp?.user || !p.smtp.pass) return json({ error: "Adresse d'envoi et mot de passe d'application requis." }, 400);
  if (!EMAIL.test(p.to || "")) return json({ error: `Adresse destinataire invalide : ${p.to || "(vide)"}` }, 400);
  if (!p.subject || !p.text) return json({ error: "Objet et message requis." }, 400);
  const pieces = (p.attachments || []).filter((a) => a?.filename && a?.base64);
  const taille = pieces.reduce((n, a) => n + a.base64.length * 0.75, 0);
  if (taille > MAX_OCTETS) return json({ error: "Pièces jointes trop lourdes (15 Mo maximum)." }, 413);

  const client = new SMTPClient({
    connection: {
      hostname: p.smtp.host || "smtp.gmail.com",
      port: p.smtp.port || 465,
      tls: true,
      auth: { username: p.smtp.user, password: p.smtp.pass },
    },
  });
  try {
    await client.send({
      from: p.smtp.fromName ? `${p.smtp.fromName.replace(/[<>"]/g, "")} <${p.smtp.user}>` : p.smtp.user,
      to: p.to,
      subject: p.subject,
      content: p.text,
      attachments: pieces.map((a) => ({ filename: a.filename, content: a.base64, encoding: "base64" as const, contentType: "application/pdf" })),
    });
    await client.close();
    return json({ ok: true });
  } catch (e) {
    try { await client.close(); } catch { /* connexion déjà fermée */ }
    const msg = String((e as Error)?.message || e);
    return json({ error: /535|auth/i.test(msg) ? "Identifiants refusés par le serveur (utilisez un mot de passe d'application Gmail)." : msg }, 502);
  }
});
