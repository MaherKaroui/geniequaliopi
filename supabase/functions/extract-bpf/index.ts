import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { aiJson, AiError, arr, json, N, obj, requireAuth, S, userContent } from "../_shared/aiJson.ts";

const SCHEMA = obj({
  exerciceDebut: S("YYYY-MM-DD"),
  exerciceFin: S("YYYY-MM-DD"),
  denomination: S(), siret: S(), nda: S(), adresse: S(), codePostal: S(), ville: S(), formeJuridique: S(),
  cadreC: obj({
    entreprises: N("Produits des entreprises pour la formation de leurs salariés"),
    opco: N("Total des OPCO (plan, alternance, pro-A, etc.)"),
    cpf: N("Instance de gestion du CPF / Caisse des Dépôts"),
    franceTravail: N("Pôle emploi / France Travail"),
    pouvoirsPublics: N("Pouvoirs publics (Etat, régions, autres)"),
    particuliers: N("Contrats conclus avec des personnes à titre individuel"),
    sousTraitance: N("Contrats avec d'autres organismes de formation (sous-traitance reçue)"),
    autres: N("Autres produits au titre de la formation"),
    total: N("Total des produits réalisés au titre de la formation professionnelle"),
  }),
  cadreD: obj({ totalCharges: N(), salairesFormateurs: N(), achatsSousTraitance: N("Achats de prestations de formation / sous-traitance") }),
  cadreE: obj({ internesNombre: N(), internesHeures: N(), externesNombre: N(), externesHeures: N() }),
  cadreF1: arr(obj({ type: S("Type de stagiaire (salariés, apprentis, demandeurs d'emploi, particuliers, autres)"), nombre: N(), heures: N() })),
  cadreF1Total: obj({ nombre: N(), heures: N() }),
  cadreF2: obj({ nombre: N("Stagiaires confiés par un autre OF"), heures: N() }),
  cadreF3: obj({
    rncpNiveau: arr(obj({ niveau: S("ex: 3, 4, 5, 6, 7, 8"), nombre: N(), heures: N() })),
    rs: obj({ nombre: N(), heures: N() }),
    cqp: obj({ nombre: N(), heures: N() }),
    autres: obj({ nombre: N(), heures: N() }),
    bilans: obj({ nombre: N(), heures: N() }),
    vae: obj({ nombre: N(), heures: N() }),
    total: obj({ nombre: N(), heures: N() }),
  }),
  cadreF4: arr(obj({ specialite: S(), nombre: N(), heures: N() })),
  cadreF4Total: obj({ nombre: N(), heures: N() }),
  cadreG: obj({ nombre: N("Stagiaires dont la formation a été confiée à un autre OF"), heures: N() }),
});

const SYSTEM = `Tu es expert du Bilan Pédagogique et Financier (cerfa n°10443) des organismes de formation.
Extrait fidèlement les valeurs du document fourni. N'invente JAMAIS : null pour un nombre absent, "" pour un texte absent.
Montants en euros (nombre, sans symbole). Heures = heures stagiaires. Dates au format YYYY-MM-DD.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const authErr = await requireAuth(req);
  if (authErr) return authErr;
  try {
    const { fileDataUrl, filename } = await req.json().catch(() => ({}));
    if (typeof fileDataUrl !== "string" || !fileDataUrl.startsWith("data:")) return json({ error: "fileDataUrl requis" }, 400);
    if (fileDataUrl.length > 25_000_000) return json({ error: "Fichier trop volumineux (max ~18 Mo)" }, 400);
    const data = await aiJson(
      req, SYSTEM,
      userContent("Extrait toutes les données de ce BPF.", fileDataUrl, typeof filename === "string" ? filename : "bpf.pdf"),
      "bpf", SCHEMA,
    );
    return json(data);
  } catch (e) {
    if (e instanceof AiError) return json({ error: e.message }, e.status);
    console.error("extract-bpf", e);
    return json({ error: e instanceof Error ? e.message : "Erreur inconnue" }, 500);
  }
});
