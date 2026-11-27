import { supabase } from "@/integrations/supabase/client";
import type { CVData } from "@/lib/cvGenerator";

export const CV_AUTH_REQUIRED_MESSAGE = "La génération IA nécessite un compte. Connectez-vous, puis réessayez ; la saisie manuelle et les exports restent disponibles sans compte.";

export type CVGenerationRequest = {
  description?: string;
  fileDataUrl?: string;
  fileType?: string;
};

export async function getCVGenerationErrorMessage(error: unknown): Promise<string> {
  const functionError = error as { message?: string; context?: Response } | null;
  const status = functionError?.context?.status;
  let serverMessage = "";

  try {
    const payload = await functionError?.context?.clone().json() as { error?: unknown } | undefined;
    if (typeof payload?.error === "string") serverMessage = payload.error;
  } catch {
    // Le message générique est remplacé ci-dessous si la réponse n'est pas du JSON.
  }

  if (status === 401 || serverMessage === "Unauthorized") {
    return "Votre session a expiré. Reconnectez-vous, puis relancez la génération du CV.";
  }
  if (status === 429) return "Trop de générations rapprochées. Patientez un instant avant de réessayer.";
  if (status === 402 || serverMessage === "Crédits IA épuisés.") return "Les crédits IA sont épuisés. Rechargez-les avant de relancer la génération.";
  if (serverMessage && !["AI gateway error", "No tool call in response"].includes(serverMessage)) return serverMessage;
  return "Le service de génération du CV est momentanément indisponible. Votre saisie est conservée ; réessayez dans un instant.";
}

export async function generateCVWithAI(body: CVGenerationRequest): Promise<Partial<CVData>> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error(CV_AUTH_REQUIRED_MESSAGE);

  const { data, error } = await supabase.functions.invoke("generate-cv", { body });
  if (error) throw new Error(await getCVGenerationErrorMessage(error));
  if (data?.error) {
    if (data.error === "Unauthorized") throw new Error(CV_AUTH_REQUIRED_MESSAGE);
    throw new Error(typeof data.error === "string" ? data.error : "La génération du CV a échoué.");
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Le service a renvoyé un CV illisible. Votre saisie est conservée ; réessayez.");
  }
  return data as Partial<CVData>;
}
