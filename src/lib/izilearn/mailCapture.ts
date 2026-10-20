import type { OrganismeInfo } from "@/types/qualiopi";
import type { MailAuto } from "@/lib/mails/mailsAutomatiques";
import type { MailModele } from "./mails";
import { revisionHtml } from "./presentation";

/** Only the organizer's draft is rendered, never a simulated learner reply. */
export function mailPourCapture(m: MailModele, o: OrganismeInfo): MailAuto {
  return {
    key: m.key, titre: m.titre, subject: m.objet, date: m.dateEnvoi,
    messages: [{
      fromName: o.nom, fromEmail: o.email,
      toName: m.destinataire, toEmail: m.destinataireEmail,
      date: m.dateEnvoi,
      body: m.corpsHtml + revisionHtml(o),
      atts: m.piecesJointes.map((name) => ({ name, size: "" })),
    }],
  };
}