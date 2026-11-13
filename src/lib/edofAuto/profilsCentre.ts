/**
 * Automatisation EDOF — profil enregistré par centre de formation (table edof_centre_profils) :
 * jury habituel, formateur et signatures fournies par l'utilisateur, repris automatiquement
 * dès que le même centre revient. Seules des images déjà fournies sont reprises, jamais inventées.
 */
import { supabase } from "@/integrations/supabase/client";
import type { Jure } from "./rs7650Pdf";

const table = () => (supabase as any).from("edof_centre_profils");

const plat = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/** « ACADEMY BY DJIKA (ACADEMY BY DJIKA) » et « Academy by Djika » donnent la même clé. */
export const cleCentre = (nom: string) => plat(nom.replace(/\([^)]*\)/g, " ")).replace(/[^a-z0-9]+/g, "");

/** « NGHA Lydia » et « Lydia NGHA » désignent la même personne. */
export const clePersonne = (nom: string) => plat(nom).split(/[^a-z0-9]+/).filter(Boolean).sort().join(" ");

export interface SignaturesProfil {
  /** signature de chaque juré, par clePersonne(nom) */
  jures?: Record<string, string>;
  formateur?: string;
  tampon?: string;
  signatureCentre?: string;
}

export interface ProfilCentre {
  cle: string;
  centre: { nom: string; adresse: string; ville: string };
  jury: Jure[];
  formateur: string;
  signatures: SignaturesProfil;
}

export async function chargerProfil(nomCentre: string): Promise<ProfilCentre | null> {
  const cle = cleCentre(nomCentre);
  if (!cle) return null;
  const { data, error } = await table().select("cle, centre, jury, formateur, signatures").eq("cle", cle).maybeSingle();
  if (error) throw new Error(error.message);
  return (data as ProfilCentre) || null;
}

/** Fusionne avec le profil existant : une signature absente cette fois ne supprime pas celle déjà enregistrée. */
export async function enregistrerProfil(userId: string, p: Omit<ProfilCentre, "cle">): Promise<void> {
  const cle = cleCentre(p.centre.nom);
  if (!cle) return;
  const avant = await chargerProfil(p.centre.nom);
  const signatures: SignaturesProfil = {
    ...avant?.signatures,
    ...Object.fromEntries(Object.entries(p.signatures).filter(([k, v]) => k !== "jures" && v)),
    jures: { ...avant?.signatures?.jures, ...p.signatures.jures },
  };
  const jury = p.jury.some((j) => j.nom) ? p.jury : avant?.jury || [];
  const { error } = await table().upsert(
    { user_id: userId, cle, centre: p.centre, jury, formateur: p.formateur || avant?.formateur || "", signatures, updated_at: new Date().toISOString() },
    { onConflict: "user_id,cle" },
  );
  if (error) throw new Error(error.message);
}

/** Signatures des jurés dans l'ordre du jury affiché (par nom, pas par position). */
export const signaturesDuJury = (jury: Jure[], s?: SignaturesProfil) => jury.map((j) => (j.nom ? s?.jures?.[clePersonne(j.nom)] : undefined));
