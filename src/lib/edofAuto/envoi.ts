/**
 * Automatisation EDOF — envoi réel des documents à chaque stagiaire (Edge Function edof-send-mail).
 * Mode test activé par défaut : tous les envois partent vers l'adresse de test, jamais vers les stagiaires.
 */
import { supabase } from "@/integrations/supabase/client";
import { frDate, type EdofCandidat } from "./candidats";
import type { FichierPack } from "./rs7650Pdf";

export const ADRESSE_TEST = "dev.qualitybusiness@gmail.com";

export interface ReglagesMail {
  expediteur: string; // adresse Gmail de l'organisme
  motDePasse: string; // mot de passe d'application (jamais enregistré)
  nomExpediteur: string;
  objet: string;
  message: string;
  modeTest: boolean;
}

export const OBJET_DEFAUT = "{formation} – vos documents d'évaluation";
export const MESSAGE_DEFAUT = `Bonjour {civilite} {nom},

Vous trouverez ci-joint vos documents d'évaluation pour la formation « {formation} » (session du {debut} au {fin}) :
{documents}

Nous restons à votre disposition pour toute question.

Cordialement,
{centre}`;

export interface VariablesMail { formation: string; centre: string }

export function remplirModele(modele: string, c: EdofCandidat, v: VariablesMail, documents: string[] = []): string {
  const valeurs: Record<string, string> = {
    civilite: c.civilite === "M." ? "Monsieur" : c.civilite === "Mme" ? "Madame" : "",
    nom: c.nom, prenom: c.prenom, formation: v.formation, centre: v.centre,
    debut: frDate(c.dateDebut), fin: frDate(c.dateFin), documents: documents.map((d) => `- ${d}`).join("\n"),
  };
  return modele.replace(/\{(\w+)\}/g, (m, k) => (k in valeurs ? valeurs[k] : m)).replace(/ {2,}/g, " ");
}

function base64(octets: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < octets.length; i += 0x8000) bin += String.fromCharCode(...octets.subarray(i, i + 0x8000));
  return btoa(bin);
}

export const nomFichier = (chemin: string) => chemin.split("/").pop() || chemin;
const libelleDocument = (chemin: string) => nomFichier(chemin).replace(/^\d+_/, "").replace(/\.pdf$/i, "").replace(/_/g, " ");

/** Envoie au stagiaire (ou à l'adresse de test) ses documents. Renvoie l'adresse réellement utilisée. */
export async function envoyerAuStagiaire(r: ReglagesMail, c: EdofCandidat, fichiers: FichierPack[], v: VariablesMail): Promise<string> {
  const destinataire = r.modeTest ? ADRESSE_TEST : c.email;
  if (!destinataire) throw new Error("Aucune adresse e-mail dans l'export EDOF pour ce stagiaire.");
  if (!fichiers.length) throw new Error("Aucun document généré pour ce stagiaire.");
  const documents = fichiers.map((f) => libelleDocument(f.chemin));
  const prefixeTest = r.modeTest ? `[TEST – destinataire réel : ${c.email || "inconnu"}] ` : "";
  const { data, error } = await supabase.functions.invoke("edof-send-mail", {
    body: {
      smtp: { user: r.expediteur.trim(), pass: r.motDePasse.replace(/\s+/g, ""), fromName: r.nomExpediteur },
      to: destinataire,
      subject: prefixeTest + remplirModele(r.objet, c, v),
      text: remplirModele(r.message, c, v, documents),
      attachments: fichiers.map((f) => ({ filename: nomFichier(f.chemin), base64: base64(f.donnees) })),
    },
  });
  if (error) {
    let detail = error.message;
    try { const j = await (error as any).context?.json?.(); if (j?.error) detail = j.error; } catch { /* corps illisible */ }
    throw new Error(detail);
  }
  if (data?.error) throw new Error(data.error);
  return destinataire;
}
