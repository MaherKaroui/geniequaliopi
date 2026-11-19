import { describe, it, expect } from "vitest";
import { appliquerIndicateursAuto, calculerIndicateursAuto } from "@/lib/indicateursResultats";

const st = (nom: string, fin: string) => ({ nom, prenom: "A", dateFinFormation: fin }) as never;
const today = new Date(2026, 10, 19);

describe("indicateurs de résultats automatiques", () => {
  it("année de formation, nombre de stagiaires et 100 % quand la formation est terminée", () => {
    const r = calculerIndicateursAuto({ dateDebut: "2026-03-02", dateFin: "2026-03-06" }, [st("X", "2026-03-06"), st("Y", "2026-03-06"), st("Z", "2026-03-06")], today);
    expect(r).toEqual({ anneeIndicateurs: "2026", nombreStagiairesFormes: "3", nombreAvisSatisfaction: "3", tauxSatisfaction: "100", tauxAssiduite: "100" });
  });
  it("formation pas terminée : pas de taux ni d'avis", () => {
    const r = calculerIndicateursAuto({ dateFin: "2026-12-10" }, [st("X", "2026-12-10")], today);
    expect(r.tauxSatisfaction).toBe("");
    expect(r.nombreAvisSatisfaction).toBe("");
    expect(r.nombreStagiairesFormes).toBe("1");
  });
  it("une valeur tapée à la main n'est jamais écrasée, et le calcul suit l'ajout de stagiaires", () => {
    const f1 = appliquerIndicateursAuto({ dateFin: "2025-05-10", tauxSatisfaction: "92" } as never, [st("X", "2025-05-10")], today)!;
    expect(f1.tauxSatisfaction).toBe("92");
    expect(f1.nombreStagiairesFormes).toBe("1");
    const f2 = appliquerIndicateursAuto(f1, [st("X", "2025-05-10"), st("Y", "2025-05-10")], today)!;
    expect(f2.nombreStagiairesFormes).toBe("2");
    expect(f2.tauxSatisfaction).toBe("92");
    expect(appliquerIndicateursAuto(f2, [st("X", "2025-05-10"), st("Y", "2025-05-10")], today)).toBeNull();
  });
});
