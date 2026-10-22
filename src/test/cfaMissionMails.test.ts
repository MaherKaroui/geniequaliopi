import { describe, expect, it } from "vitest";
import { resolveCatalogMail } from "@/lib/mails/catalogMail";
import { dateMailMission } from "@/lib/mailsMissionsCFA";
import { dateMailDiffusionMission } from "@/lib/mailsDiffusionMissionsCFA";
import { ORG_TEST, FORMATIONS_TEST, STAGIAIRES_TEST } from "./dossierAudit.harness";

const o = { ...ORG_TEST, typesActions: ["apprentissage" as const] };
const f = FORMATIONS_TEST.apprentissage;
const s = STAGIAIRES_TEST[0];

describe("mails des 14 missions CFA", () => {
  it("résout les 28 mails en messages individuels avec leurs pièces jointes", () => {
    for (let n = 1; n <= 14; n++) {
      for (const template of ["mail_mission_cfa", "mail_diffusion_mission_cfa"]) {
        const r = resolveCatalogMail({ template, params: { missionNumero: n } }, o, f, s);
        expect(r?.mail.messages).toHaveLength(1);
        expect(r?.mail.messages[0].fromEmail).toBe(o.email);
        expect(r?.mail.messages[0].toEmail).toBe(s.email);
        expect(r?.mail.messages[0].atts).toHaveLength(1);
        expect(r?.mail.messages[0].atts[0].name).toContain(template === "mail_mission_cfa" ? `QCM_Mission_${String(n).padStart(2, "0")}` : `Affiche_A3_Mission_${String(n).padStart(2, "0")}`);
      }
    }
  });

  it("conserve les dates par apprenti : QCM lundi, annonce la veille", () => {
    const learner = { ...s, dateDebutFormation: "2025-01-06", dateFinFormation: "2026-12-31" };
    const formation = { ...f, dateDebut: "2024-01-08", dateFin: "2026-12-31", rythmeAlternance: "1 semaine école / 3 semaines entreprise" };
    const qcm = resolveCatalogMail({ template: "mail_mission_cfa", params: { missionNumero: 1 } }, o, formation, learner);
    const annonce = resolveCatalogMail({ template: "mail_diffusion_mission_cfa", params: { missionNumero: 1 } }, o, formation, learner);
    expect(qcm?.mail.date).toEqual(dateMailMission(formation, 1, learner));
    expect(annonce?.mail.date).toEqual(dateMailDiffusionMission(formation, 1, learner));
    expect(qcm?.mail.date.toLocaleDateString("fr-FR")).toBe("06/01/2025");
    expect(annonce?.mail.date.toLocaleDateString("fr-FR")).toBe("05/01/2025");
  });

  it("ne fabrique aucune adresse si les coordonnées sont absentes", () => {
    for (const template of ["mail_mission_cfa", "mail_diffusion_mission_cfa"]) {
      const r = resolveCatalogMail({ template, params: { missionNumero: 1 } }, { ...o, email: "", telephone: "" }, f, { ...s, email: "" });
      expect(r?.mail.messages[0].fromEmail).toBe("");
      expect(r?.mail.messages[0].toEmail).toBe("");
    }
  });
});