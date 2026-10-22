import type { DocEntry, FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { mailMissionCFA } from "@/lib/mailsMissionsCFA";
import { mailDiffusionMissionCFA } from "@/lib/mailsDiffusionMissionsCFA";
import { retrouverMail, type MailAuto } from "./mailsAutomatiques";

export const isCaptureMailTemplate = (template: string) =>
  ["mail_capture", "mail_mission_cfa", "mail_diffusion_mission_cfa"].includes(template);

/** The same structured mail feeds previews, individual downloads and every ZIP. */
export function resolveCatalogMail(doc: Pick<DocEntry, "template" | "params">, o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo): { mail: MailAuto; precedents: MailAuto[] } | null {
  const n = typeof doc.params?.missionNumero === "number" ? doc.params.missionNumero : 1;
  if (doc.template === "mail_mission_cfa" || doc.template === "mail_diffusion_mission_cfa") {
    const mail = doc.template === "mail_mission_cfa" ? mailMissionCFA(o, f, s, n) : mailDiffusionMissionCFA(o, f, s, n);
    return mail ? { mail, precedents: [] } : null;
  }
  return doc.template === "mail_capture" ? retrouverMail(o, f, s, String(doc.params?.mailKey || "")) : null;
}