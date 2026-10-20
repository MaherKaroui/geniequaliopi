/**
 * Mails de l'espace IZILearn : mêmes scénarios que la partie Qualiopi
 * (mailsAutomatiques), mais présentés comme des MODÈLES À ENVOYER.
 * Seuls les messages écrits par l'organisme sont gardés (pas de réponse
 * d'apprenant), chacun avec sa date d'envoi prévue — rien n'est présenté
 * comme déjà envoyé.
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { mailsStagiaire, typeDossier, type MessageMail } from "@/lib/mails/mailsAutomatiques";
import { esc } from "./trames";

export interface MailModele {
  key: string;
  titre: string;
  objet: string;
  dateEnvoi: Date;
  aEnvoyer: boolean;
  destinataire: string;
  destinataireEmail: string;
  corpsHtml: string;
  piecesJointes: string[];
}

const HORIZON = new Date(2100, 0, 1);

export function mailsModeles(o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo): MailModele[] {
  if (!(s.email || "").trim() || !(o.email || "").trim()) return [];
  const of = o.email.trim().toLowerCase();
  const now = Date.now();
  const out: MailModele[] = [];
  for (const m of mailsStagiaire(o, f, s, typeDossier(o), HORIZON)) {
    m.messages.filter((x: MessageMail) => x.fromEmail.trim().toLowerCase() === of).forEach((x, i) => {
      out.push({
        key: `${m.key}${i ? `_${i + 1}` : ""}`,
        titre: m.titre,
        objet: m.subject,
        dateEnvoi: x.date,
        aEnvoyer: x.date.getTime() >= now,
        destinataire: x.toName,
        destinataireEmail: x.toEmail,
        corpsHtml: x.body,
        piecesJointes: x.atts.map((a) => a.name),
      });
    });
  }
  return out.sort((a, b) => a.dateEnvoi.getTime() - b.dateEnvoi.getTime());
}

const texte = (html: string) => html
  .replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|div|li|h\d)>/gi, "\n").replace(/<li[^>]*>/gi, "• ")
  .replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/\n{3,}/g, "\n\n").trim();

export const corpsTexte = (m: MailModele) => texte(m.corpsHtml);

/** Lien « ouvrir dans ma messagerie » (corps raccourci : limite des liens mailto). */
export function lienMailto(m: MailModele): string {
  const body = corpsTexte(m) + (m.piecesJointes.length ? `\n\nPièces jointes : ${m.piecesJointes.join(", ")}` : "");
  return `mailto:${encodeURIComponent(m.destinataireEmail)}?subject=${encodeURIComponent(m.objet)}&body=${encodeURIComponent(body.slice(0, 1800))}`;
}

export function mailHtml(m: MailModele, o: OrganismeInfo): string {
  const quand = m.dateEnvoi.toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>${esc(m.objet)}</title><style>
body{font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1f2937;max-width:820px;margin:24px auto;padding:0 20px}
.meta{border:1px solid #e5e7eb;border-radius:10px;padding:12px 16px;background:#f9fafb;margin-bottom:16px}
.meta p{margin:3px 0}.etat{display:inline-block;padding:2px 8px;border-radius:99px;font-size:11px;font-weight:700}
</style></head><body>
<div class="meta">
<p><span class="etat" style="background:${m.aEnvoyer ? "#dbeafe;color:#1e40af" : "#fef3c7;color:#92400e"}">${m.aEnvoyer ? "Modèle à envoyer" : "Date d'envoi prévue dépassée — à vérifier"}</span></p>
<p><b>De :</b> ${esc(o.nom)} &lt;${esc(o.email)}&gt;</p>
<p><b>À :</b> ${esc(m.destinataire)} &lt;${esc(m.destinataireEmail)}&gt;</p>
<p><b>Objet :</b> ${esc(m.objet)}</p>
<p><b>Envoi prévu :</b> ${esc(quand)}</p>
${m.piecesJointes.length ? `<p><b>Pièces jointes :</b> ${m.piecesJointes.map(esc).join(", ")}</p>` : ""}
</div>
${m.corpsHtml}
</body></html>`;
}
