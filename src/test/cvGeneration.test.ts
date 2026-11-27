import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getSession: vi.fn(),
  invoke: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: { getSession: mocks.getSession },
    functions: { invoke: mocks.invoke },
  },
}));

import { CV_AUTH_REQUIRED_MESSAGE, generateCVWithAI, getCVGenerationErrorMessage } from "@/lib/cvGeneration";

describe("génération IA du CV", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getSession.mockResolvedValue({ data: { session: { access_token: "session" } } });
    mocks.invoke.mockResolvedValue({ data: { prenom: "Nadia" }, error: null });
  });

  it("n'appelle pas le service sans compte et explique comment continuer", async () => {
    mocks.getSession.mockResolvedValue({ data: { session: null } });

    await expect(generateCVWithAI({ description: "Formateur bureautique" })).rejects.toThrow(CV_AUTH_REQUIRED_MESSAGE);
    expect(mocks.invoke).not.toHaveBeenCalled();
  });

  it("transforme une réponse 401 en consigne de reconnexion au lieu de non-2xx", async () => {
    const error = {
      message: "Edge Function returned a non-2xx status code",
      context: new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 }),
    };

    await expect(getCVGenerationErrorMessage(error)).resolves.toBe("Votre session a expiré. Reconnectez-vous, puis relancez la génération du CV.");
  });

  it("conserve la saisie et propose une nouvelle tentative si le service est indisponible", async () => {
    mocks.invoke.mockResolvedValue({
      data: null,
      error: {
        message: "Edge Function returned a non-2xx status code",
        context: new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500 }),
      },
    });

    await expect(generateCVWithAI({ description: "Formateur management" })).rejects.toThrow("Votre saisie est conservée ; réessayez dans un instant.");
  });

  it("refuse une réponse vide au lieu d'effacer le formulaire", async () => {
    mocks.invoke.mockResolvedValue({ data: null, error: null });

    await expect(generateCVWithAI({ description: "Formateur anglais" })).rejects.toThrow("Le service a renvoyé un CV illisible.");
  });
});
