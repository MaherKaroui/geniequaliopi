import { describe, it, expect } from "vitest";
import { FORMATION_DRI21, FORMATION_DRI47, DRI21_MODULES } from "@/lib/droitInstitutions47hPreset";
import { isDRI21Formation, isDRI47Formation, getDRI47EvalBesoins } from "@/lib/droitInstitutions47hHumanized";
import { getDroitInstitutions21hChapters, getDroitInstitutions47hChapters } from "@/lib/courseContentDroitInstitutions47h";
import { getCourseChapters } from "@/lib/courseContent";
import { SAMPLE_FORMATIONS } from "@/lib/sampleData";

const texte = (chs: ReturnType<typeof getDroitInstitutions21hChapters>) =>
  chs.map((c) => [c.title, c.description, ...c.sections.map((s) => s.title + s.content)].join("\n")).join("\n");

describe("Initiation au droit et aux institutions politiques — 21 h", () => {
  it("est reconnue comme variante de la formation droit (mêmes contenus) sans capter la 47 h", () => {
    expect(isDRI21Formation(FORMATION_DRI21.intitule)).toBe(true);
    expect(isDRI47Formation(FORMATION_DRI21.intitule)).toBe(true);
    expect(isDRI21Formation(FORMATION_DRI47.intitule)).toBe(false);
    expect(isDRI21Formation("Initiation Word")).toBe(false);
  });

  it("fiche conforme au contrat : 21 h, 6 modules de 3 h 30, 1 000 €, distanciel, non certifiante", () => {
    expect(FORMATION_DRI21.duree).toMatch(/^21 heures/);
    expect(FORMATION_DRI21.codeRNCP).toBe("");
    expect(FORMATION_DRI21.modalites).toBe("distanciel");
    expect(FORMATION_DRI21.tarif).toMatch(/^1 000 €/);
    const modules = FORMATION_DRI21.programme.split("\n");
    expect(modules).toHaveLength(6);
    modules.forEach((m, i) => expect(m).toMatch(new RegExp(`^Module ${i + 1} — .*\\(C${i + 1}, 3 h 30\\)`)));
    expect(DRI21_MODULES).toHaveLength(6);
    expect(SAMPLE_FORMATIONS.some((f) => f.intitule === FORMATION_DRI21.intitule)).toBe(true);
  });

  it("support de cours : mêmes chapitres que la 47 h, sans aucune trace du calendrier de 47 h", () => {
    const chs = getDroitInstitutions21hChapters();
    expect(getCourseChapters(FORMATION_DRI21.intitule)).toEqual(chs);
    expect(chs).toHaveLength(6);
    const t = texte(chs);
    expect(t.length).toBeGreaterThan(500_000);
    for (const interdit of [/\b47 ?h/, /47 heures/, /fondamentaux du droit et des institutions/, /\(\s*8 h\)/, /\b8 heures\b/, /Module \d \(\d+ h\)/, /Demi-journée \d \(4 h\)/, /480 min/, /\(7 h\)/, /8 \+ 8/, /\b(six|6) (journées|jours)\b/]) {
      expect(t, String(interdit)).not.toMatch(interdit);
    }
    chs.forEach((c, i) => {
      expect(c.title).toContain("(3 h 30)");
      expect(c.sections[0].content).toContain(`le module ${i + 1} a lieu le <strong>jour ${DRI21_MODULES[i].jour}`);
    });
    // la 47 h est inchangée
    expect(texte(getDroitInstitutions47hChapters())).toMatch(/47 heures/);
  });

  it("les disponibilités des stagiaires ne citent plus de durée en dur", () => {
    const d = getDRI47EvalBesoins({ nom: "MARTIN", prenom: "Sarah", civilite: "Mme" }, false, 0).disponibilites;
    expect(d).not.toMatch(/47/);
  });
});
