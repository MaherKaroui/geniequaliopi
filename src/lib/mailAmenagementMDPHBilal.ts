// Mail conversation Stagiaire (Bilal Nouira) → Start Formation
// Demande d'aménagement MDPH (tiers-temps) + réponse de l'organisme
// Style Outlook (Microsoft 365), cohérent avec mailQuestionsFormationVTC.
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";

const STAGIAIRE_NOM = "Bilal Nouira";
const STAGIAIRE_PRENOM = "Bilal";
const STAGIAIRE_EMAIL = "bilal.nouira@email.fr";

const ORG_NOM = "Start Formation";
const ORG_EMAIL = "contact@startformation.fr";

function fmtDateShort(d: Date): string {
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function fmtTime(d: Date): string {
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
function fmtDayHeader(d: Date): string {
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  return `${days[d.getDay()]} ${fmtDateShort(d)} ${fmtTime(d)}`;
}
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Échange Bilal Nouira ↔ Start Formation : demande d'aménagement MDPH (tiers-temps).
 * Dates fixées au 12 et 13 mars 2024 (réalistes, cohérentes audit Qualiopi IND 26).
 */
export function genMailAmenagementMDPHBilal(
  _o: OrganismeInfo,
  _f: FormationInfo,
  _stagiaires: StagiaireInfo[],
): string {
  // Dates fixes pour cohérence (échange daté antérieur à l'audit)
  const dateStagiaire = new Date(2026, 2, 12, 14, 8, 0); // 12 mars 2026 14h08
  const dateOrg = new Date(2026, 2, 13, 9, 42, 0); // 13 mars 2026 09h42

  const stagiaireInitials = initials(STAGIAIRE_NOM);
  const orgInitials = initials(ORG_NOM);

  const sujet1 = "Demande d'aménagement pour les évaluations";
  const sujet2 = "Prise en compte de votre demande d'aménagement";

  // Pièce jointe pour le mail du stagiaire
  const pjHtml = `
    <table style="border-collapse:collapse;border:1px solid #e1dfdd;background:#faf9f8;margin:8px 0 14px;">
      <tr>
        <td style="padding:8px 10px 8px 12px;vertical-align:middle;">
          <div style="width:28px;height:28px;background:#d13438;color:#fff;border-radius:2px;text-align:center;line-height:28px;font-size:10px;font-weight:700;">PDF</div>
        </td>
        <td style="padding:8px 14px 8px 4px;vertical-align:middle;font-size:12.5px;color:#201f1e;">
          <div style="font-weight:600;">Certificat médical MDPH - Bilal NOUIRA.pdf</div>
          <div style="color:#605e5c;font-size:11px;">142 Ko</div>
        </td>
      </tr>
    </table>
  `;

  const renderMail = (opts: {
    sujet: string;
    fromName: string;
    fromInitials: string;
    fromColor: string;
    toEmail: string;
    dateHeader: string;
    body: string;
  }) => `
<div style="width:100%;max-width:760px;margin:0 auto 18px;background:#ffffff;border:1px solid #edebe9;page-break-inside:avoid;break-inside:avoid;">
  <div style="background:#ffffff;border-bottom:1px solid #edebe9;padding:6px 14px;font-size:12px;color:#605e5c;">
    <span style="color:#a4262c;margin-right:14px;">↩ Répondre à tous</span>
    <span style="margin-right:14px;">✉ Lu / non lu</span>
    <span style="color:#a4262c;margin-right:14px;">⚑ Marquer</span>
    <span style="float:right;">⋯</span>
    <div style="clear:both;"></div>
  </div>

  <div style="padding:14px 20px 10px;border-bottom:1px solid #edebe9;font-size:17px;font-weight:600;color:#201f1e;">
    ${escapeHtml(opts.sujet)}
  </div>

  <table style="width:100%;border-collapse:collapse;border-bottom:1px solid #edebe9;">
    <tr>
      <td style="width:54px;padding:12px 0 12px 20px;vertical-align:top;">
        <div style="width:38px;height:38px;border-radius:50%;background:${opts.fromColor};color:#fff;text-align:center;line-height:38px;font-weight:600;font-size:13px;">${escapeHtml(opts.fromInitials)}</div>
      </td>
      <td style="padding:12px 12px 12px 10px;vertical-align:top;font-size:13px;line-height:1.5;">
        <div style="font-weight:600;color:#201f1e;">${escapeHtml(opts.fromName)}</div>
        <div style="color:#605e5c;">À : ${escapeHtml(opts.toEmail)}</div>
      </td>
      <td style="padding:12px 20px 12px 0;vertical-align:top;text-align:right;font-size:12px;color:#605e5c;white-space:nowrap;">
        ${escapeHtml(opts.dateHeader)}
      </td>
    </tr>
  </table>

  <div style="padding:16px 20px 20px;font-size:13.5px;line-height:1.65;color:#201f1e;">
    ${opts.body}
    <div style="margin-top:18px;">
      <span style="display:inline-block;border:1px solid #d1d1d1;border-radius:2px;padding:5px 14px;margin-right:6px;font-size:12px;color:#a4262c;">↩ Répondre</span>
      <span style="display:inline-block;border:1px solid #d1d1d1;border-radius:2px;padding:5px 14px;font-size:12px;color:#0078d4;">→ Transférer</span>
    </div>
  </div>
</div>`;

  // ===== MAIL 1 — Stagiaire Bilal → Start Formation =====
  const bodyStagiaire = `
    <p style="margin:0 0 14px;">Bonjour,</p>
    <p style="margin:0 0 14px;">Je me permets de vous contacter concernant les modalités de passage des prochaines évaluations.</p>
    <p style="margin:0 0 14px;">Suite à une reconnaissance par la <strong>MDPH</strong>, je bénéficie d'un aménagement spécifique, notamment un <strong>tiers temps supplémentaire</strong> lors des examens. Vous trouverez en pièce jointe le certificat médical justificatif.</p>
    ${pjHtml}
    <p style="margin:0 0 14px;">Je vous remercie par avance de bien vouloir prendre en compte cette situation dans l'organisation des évaluations.</p>
    <p style="margin:0 0 14px;">Restant à votre disposition pour tout échange,</p>
    <p style="margin:18px 0 0;">Cordialement,<br>${escapeHtml(STAGIAIRE_NOM)}</p>
  `;

  // ===== MAIL 2 — Start Formation → Bilal =====
  const bodyOrg = `
    <p style="margin:0 0 14px;">Bonjour Monsieur Nouira,</p>
    <p style="margin:0 0 14px;">Je vous remercie pour votre message ainsi que pour la transmission du certificat médical.</p>
    <p style="margin:0 0 14px;">Votre demande a bien été <strong>prise en compte</strong>. Conformément aux préconisations indiquées, un aménagement des conditions de passage des évaluations sera mis en place, incluant un <strong>tiers temps supplémentaire</strong>.</p>
    <p style="margin:0 0 14px;">Nous veillerons à adapter l'organisation des examens afin de garantir le bon déroulement de votre parcours de formation dans des conditions équitables.</p>
    <p style="margin:0 0 14px;">N'hésitez pas à revenir vers moi si vous avez des besoins complémentaires ou des questions.</p>
    <p style="margin:18px 0 0;">Cordialement,<br>${escapeHtml(ORG_NOM)}<br><span style="color:#605e5c;font-size:13px;">Référent Handicap</span></p>
  `;

  const mail1 = renderMail({
    sujet: sujet1,
    fromName: STAGIAIRE_NOM.toLowerCase(),
    fromInitials: stagiaireInitials,
    fromColor: "#0078d4",
    toEmail: ORG_EMAIL,
    dateHeader: fmtDayHeader(dateStagiaire),
    body: bodyStagiaire,
  });

  const mail2 = renderMail({
    sujet: sujet2,
    fromName: ORG_NOM.toLowerCase(),
    fromInitials: orgInitials,
    fromColor: "#107c10",
    toEmail: STAGIAIRE_EMAIL,
    dateHeader: fmtDayHeader(dateOrg),
    body: bodyOrg,
  });

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(sujet1)}</title></head>
<body style="margin:0;padding:16px;background:#faf9f8;font-family:'Segoe UI','Segoe UI Web',Arial,sans-serif;color:#201f1e;">
${mail1}
${mail2}
</body></html>`;
}
