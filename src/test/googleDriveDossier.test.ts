import JSZip from "jszip";
import { afterEach, describe, expect, it, vi } from "vitest";
import { envoyerZipDansDrive } from "@/lib/googleDrive";

vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: { getSession: async () => ({ data: { session: null } }) } } }));

describe("envoi direct du dossier dans Google Drive", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("recrée l'arborescence du ZIP et envoie chaque fichier une fois", async () => {
    const zip = new JSZip();
    zip.file("BOOK_QUALIOPI.pdf", "book");
    zip.file("Critere_1/Indicateur_1/PROGRAMME_OF_V1_2024_11_28.pdf", "p");
    zip.file("Critere_3/Indicateur_10/14_MISSIONS_CFA/Mission_9_Diversite_Discriminations/Sarah_ZIANI/MISSION_9_QCM_EXERCICE_Sarah_ZIANI_OF_V1_2024_11_28.pdf", "q1");
    zip.file("Critere_3/Indicateur_10/14_MISSIONS_CFA/Mission_9_Diversite_Discriminations/Leo_LEROY/MISSION_9_QCM_EXERCICE_Leo_LEROY_OF_V1_2024_11_28.pdf", "q2");
    const blob = await zip.generateAsync({ type: "blob" });

    const dossiers: { id: string; name: string; parent: string | null }[] = [];
    const fichiers: { name: string; parent: string }[] = [];
    let quota = true;
    vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit) => {
      expect((init.headers as Record<string, string>).Authorization).toBe("Bearer TOKEN");
      if (url.includes("/upload/")) {
        // Un premier refus de quota doit être réessayé.
        if (quota) { quota = false; return new Response("rateLimitExceeded", { status: 429 }); }
        const metaBlob = (init.body as FormData).get("metadata") as Blob;
        const meta = JSON.parse(await new Promise<string>((ok) => {
          const lecteur = new FileReader();
          lecteur.onload = () => ok(String(lecteur.result));
          lecteur.readAsText(metaBlob);
        }));
        fichiers.push({ name: meta.name, parent: meta.parents[0] });
        return new Response(JSON.stringify({ id: `f${fichiers.length}` }));
      }
      const meta = JSON.parse(String(init.body));
      const id = `d${dossiers.length}`;
      dossiers.push({ id, name: meta.name, parent: meta.parents?.[0] ?? null });
      return new Response(JSON.stringify({ id }));
    }));
    const res = await envoyerZipDansDrive(blob, "DOSSIER_QUALIOPI_COMPLET_OF_V1_2024_11_28", "TOKEN");

    expect(res.envoyes).toBe(4);
    expect(fichiers).toHaveLength(4);
    const chemin = (id: string): string => {
      const d = dossiers.find((x) => x.id === id)!;
      return d.parent ? `${chemin(d.parent)}/${d.name}` : d.name;
    };
    const cheminsDossiers = dossiers.map((d) => chemin(d.id));
    expect(new Set(cheminsDossiers).size).toBe(cheminsDossiers.length);
    expect(fichiers.map((f) => `${chemin(f.parent)}/${f.name}`).sort()).toEqual([
      "DOSSIER_QUALIOPI_COMPLET_OF_V1_2024_11_28/BOOK_QUALIOPI.pdf",
      "DOSSIER_QUALIOPI_COMPLET_OF_V1_2024_11_28/Critere_1/Indicateur_1/PROGRAMME_OF_V1_2024_11_28.pdf",
      "DOSSIER_QUALIOPI_COMPLET_OF_V1_2024_11_28/Critere_3/Indicateur_10/14_MISSIONS_CFA/Mission_9_Diversite_Discriminations/Leo_LEROY/MISSION_9_QCM_EXERCICE_Leo_LEROY_OF_V1_2024_11_28.pdf",
      "DOSSIER_QUALIOPI_COMPLET_OF_V1_2024_11_28/Critere_3/Indicateur_10/14_MISSIONS_CFA/Mission_9_Diversite_Discriminations/Sarah_ZIANI/MISSION_9_QCM_EXERCICE_Sarah_ZIANI_OF_V1_2024_11_28.pdf",
    ]);
    expect(res.webViewLink).toBe("https://drive.google.com/drive/folders/d0");
  }, 15000);
});
