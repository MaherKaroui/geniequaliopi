/**
 * Automatisation EDOF — historique par utilisateur : une ligne par export traité
 * (table saved_edof_automatisations) et le ZIP des documents (bucket privé edof-automatisations).
 */
import JSZip from "jszip";
import { supabase } from "@/integrations/supabase/client";
import type { FichierPack } from "./rs7650Pdf";

const BUCKET = "edof-automatisations";
// Table créée par la migration 20261102170000 (absente des types générés tant que Lovable ne les régénère pas)
const table = () => (supabase as any).from("saved_edof_automatisations");

export interface EnvoiMail { candidat: string; email: string; statut: "envoye" | "erreur"; date: string; erreur?: string; test?: boolean }

export interface Automatisation {
  id: string;
  name: string;
  export_name: string;
  siret: string;
  centre: { nom: string; adresse: string; ville: string };
  jurys: Record<string, unknown>;
  resume: { formations: { code: string; intitule: string; nb: number }[]; candidats: unknown[] };
  fichiers: { chemin: string; candidat?: string }[];
  zip_path: string | null;
  envois: EnvoiMail[];
  created_at: string;
}

export async function zipper(fichiers: FichierPack[]): Promise<Blob> {
  const zip = new JSZip();
  for (const f of fichiers) zip.file(f.chemin, f.donnees);
  return zip.generateAsync({ type: "blob" });
}

export async function enregistrer(userId: string, a: Omit<Automatisation, "id" | "zip_path" | "created_at" | "fichiers" | "envois">, fichiers: FichierPack[]): Promise<Automatisation> {
  const id = crypto.randomUUID();
  const zip_path = `${userId}/${id}.zip`;
  const { error: errUp } = await supabase.storage.from(BUCKET).upload(zip_path, await zipper(fichiers), { contentType: "application/zip" });
  if (errUp) throw new Error(`Stockage du ZIP : ${errUp.message}`);
  const ligne = { id, user_id: userId, ...a, zip_path, envois: [], fichiers: fichiers.map((f) => ({ chemin: f.chemin, candidat: f.candidat })) };
  const { data, error } = await table().insert(ligne).select().single();
  if (error) {
    await supabase.storage.from(BUCKET).remove([zip_path]);
    throw new Error(error.message);
  }
  return data as Automatisation;
}

export async function lister(): Promise<Automatisation[]> {
  const { data, error } = await table().select("*").order("created_at", { ascending: false }).limit(100);
  if (error) throw new Error(error.message);
  return (data || []) as Automatisation[];
}

/** Recharge les PDF d'une automatisation enregistrée (avec le stagiaire de chaque fichier). */
export async function chargerFichiers(a: Automatisation): Promise<FichierPack[]> {
  if (!a.zip_path) return [];
  const { data, error } = await supabase.storage.from(BUCKET).download(a.zip_path);
  if (error || !data) throw new Error(`ZIP introuvable : ${error?.message || a.zip_path}`);
  const zip = await JSZip.loadAsync(await data.arrayBuffer());
  const candidatDe = new Map(a.fichiers.map((f) => [f.chemin, f.candidat]));
  const out: FichierPack[] = [];
  for (const chemin of Object.keys(zip.files).filter((k) => !zip.files[k].dir).sort()) {
    out.push({ chemin, donnees: await zip.files[chemin].async("uint8array"), candidat: candidatDe.get(chemin) });
  }
  return out;
}

export async function ajouterEnvois(id: string, envois: EnvoiMail[]): Promise<void> {
  const { error } = await table().update({ envois, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function supprimer(a: Automatisation): Promise<void> {
  if (a.zip_path) await supabase.storage.from(BUCKET).remove([a.zip_path]);
  const { error } = await table().delete().eq("id", a.id);
  if (error) throw new Error(error.message);
}
