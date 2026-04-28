// Mail conversation Élève → Formateur Nabih (questions sur la formation VTC)
// + Réponse du formateur Nabih
// Style Outlook (Microsoft 365), cohérent avec les autres mails.
// Généré pour UN SEUL stagiaire (le premier de la liste).
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { getStagiaireDateDebut } from "./docBuilder";

const FORMATEUR_NOM = "Nabih Ouardani";
const FORMATEUR_PRENOM = "Nabih";
const FORMATEUR_EMAIL = "nabih.ouardani@gmail.com";

function parseDateSafe(s?: string): Date | null {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
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
 * Échange de mails élève ↔ formateur Nabih Ouardani concernant la formation VTC.
 * - Mail 1 : élève pose 3 questions (réglementation, pratique, gestion).
 * - Mail 2 : réponse du formateur Nabih.
 *
 * Dates : ~10 et 9 jours avant le début de la formation du stagiaire.
 */
export function genMailQuestionsFormationVTC(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx: number = 0,
): string {
  // On ne prend qu'UN SEUL stagiaire (le 1er par défaut)
  const s = stagiaires[stagiaireIdx] || stagiaires[0];
  if (!s) return "<p>Stagiaire introuvable.</p>";

  const debutStr = getStagiaireDateDebut(s, f);
  const debut = parseDateSafe(debutStr) || new Date();

  // Mail élève : 10 jours avant la formation à 18h32
  const dateEleve = new Date(debut);
  dateEleve.setDate(dateEleve.getDate() - 10);
  dateEleve.setHours(18, 32, 0, 0);

  // Réponse formateur : lendemain à 09h17
  const dateFormateur = new Date(dateEleve);
  dateFormateur.setDate(dateFormateur.getDate() + 1);
  dateFormateur.setHours(9, 17, 0, 0);

  const eleveNomComplet = `${s.prenom || ""} ${s.nom || ""}`.trim() || "Stagiaire";
  const eleveEmail = s.email || `${(s.prenom || "stagiaire").toLowerCase()}.${(s.nom || "").toLowerCase()}@email.fr`;
  const eleveInitials = initials(eleveNomComplet);
  const formateurInitials = initials(FORMATEUR_NOM);
  const orgEmail = o.email || `contact@${(o.nom || "organisme").toLowerCase().replace(/\s+/g, "")}.fr`;

  const sujet1 = "Questions concernant la formation VTC";
  const sujet2 = "Re: Questions concernant la formation VTC";

  // Bloc d'un mail (réutilisable)
  const renderMail = (opts: {
    sujet: string;
    fromName: string;
    fromInitials: string;
    fromColor: string;
    toEmail: string;
    dateHeader: string;
    body: string;
  }) => `
<div style="max-width:900px;margin:0 auto 28px;background:#ffffff;border:1px solid #edebe9;page-break-inside:avoid;">
  <div style="background:#ffffff;border-bottom:1px solid #edebe9;padding:8px 16px;font-size:13px;color:#323130;display:flex;align-items:center;gap:18px;flex-wrap:wrap;">
    <span style="color:#a4262c;">↩ Répondre à tous</span>
    <span>✉ Lu / non lu</span>
    <span style="color:#a4262c;">⚑ Marquer / démarquer</span>
    <span>⊞</span>
    <span>👥 Découvrez des groupes</span>
    <span style="color:#a19f9d;">↶ Annuler</span>
    <span style="margin-left:auto;">⋯</span>
  </div>

  <div style="padding:18px 24px;border-bottom:1px solid #edebe9;font-size:18px;font-weight:600;color:#201f1e;">
    ${escapeHtml(opts.sujet)}
  </div>

  <div style="padding:14px 24px;display:flex;align-items:flex-start;gap:14px;border-bottom:1px solid #edebe9;">
    <div style="width:40px;height:40px;border-radius:50%;background:${opts.fromColor};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;flex-shrink:0;">
      ${escapeHtml(opts.fromInitials)}
    </div>
    <div style="flex:1;font-size:13px;line-height:1.5;">
      <div style="font-weight:600;color:#201f1e;">${escapeHtml(opts.fromName)}</div>
      <div style="color:#605e5c;">À : ${escapeHtml(opts.toEmail)}</div>
    </div>
    <div style="font-size:12px;color:#605e5c;white-space:nowrap;">${escapeHtml(opts.dateHeader)}</div>
  </div>

  <div style="padding:18px 24px 24px;font-size:14px;line-height:1.7;color:#201f1e;">
    ${opts.body}
    <div style="margin-top:26px;">
      <span style="display:inline-block;border:1px solid #d1d1d1;border-radius:2px;padding:6px 16px;margin-right:8px;font-size:13px;color:#a4262c;">↩ Répondre</span>
      <span style="display:inline-block;border:1px solid #d1d1d1;border-radius:2px;padding:6px 16px;font-size:13px;color:#0078d4;">→ Transférer</span>
    </div>
  </div>
</div>`;

  // ===== MAIL 1 — Élève → Formateur =====
  const bodyEleve = `
    <p style="margin:0 0 14px;">Bonjour ${escapeHtml(FORMATEUR_PRENOM)},</p>
    <p style="margin:0 0 14px;">J'espère que vous allez bien.</p>
    <p style="margin:0 0 14px;">Je me permets de vous contacter concernant la formation <strong>VTC</strong>. J'aurais besoin de quelques précisions :</p>
    <ul style="margin:0 0 14px;padding-left:22px;list-style-type:disc;list-style-position:outside;">
      <li style="display:list-item;list-style-type:disc;margin-bottom:6px;">Est-ce que les <strong>modules de réglementation</strong> sont suffisants pour réussir l'examen théorique ou faut-il compléter avec du travail personnel ?</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:6px;">Concernant la <strong>pratique</strong>, combien d'heures sont prévues avant le passage de l'examen ?</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:6px;">Avez-vous des conseils pour mieux se préparer à l'épreuve de <strong>gestion et développement commercial</strong> ?</li>
    </ul>
    <p style="margin:0 0 14px;">Je vous remercie par avance pour votre retour.</p>
    <p style="margin:18px 0 0;">Cordialement,<br>${escapeHtml(eleveNomComplet)}</p>
  `;

  // ===== MAIL 2 — Formateur Nabih → Élève =====
  const bodyFormateur = `
    <p style="margin:0 0 14px;">Bonjour ${escapeHtml(s.prenom || "")},</p>
    <p style="margin:0 0 14px;">Merci pour votre message.</p>
    <p style="margin:0 0 14px;">Concernant vos questions :</p>
    <ul style="margin:0 0 14px;padding-left:22px;list-style-type:disc;list-style-position:outside;">
      <li style="display:list-item;list-style-type:disc;margin-bottom:6px;">Les <strong>modules de réglementation</strong> couvrent l'ensemble du référentiel de l'examen. Toutefois, un travail personnel est recommandé (révisions, QCM, entraînements).</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:6px;">Pour la <strong>pratique</strong>, nous prévoyons généralement plusieurs mises en situation ainsi que des heures de conduite adaptées au niveau de chaque stagiaire avant l'examen.</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:6px;">Pour l'épreuve de <strong>gestion</strong>, je vous conseille de bien maîtriser les bases (calculs simples, rentabilité, charges) et de vous entraîner avec des cas pratiques que nous verrons en formation.</li>
    </ul>
    <p style="margin:0 0 14px;">N'hésitez pas à revenir vers moi si vous avez besoin d'accompagnement supplémentaire.</p>
    <p style="margin:0 0 14px;">À bientôt en formation.</p>
    <p style="margin:18px 0 0;">Cordialement,<br>${escapeHtml(FORMATEUR_PRENOM)}<br><span style="color:#605e5c;font-size:13px;">Formateur VTC</span></p>
  `;

  const mail1 = renderMail({
    sujet: sujet1,
    fromName: eleveNomComplet.toLowerCase(),
    fromInitials: eleveInitials,
    fromColor: "#0078d4",
    toEmail: FORMATEUR_EMAIL,
    dateHeader: fmtDayHeader(dateEleve),
    body: bodyEleve,
  });

  const mail2 = renderMail({
    sujet: sujet2,
    fromName: FORMATEUR_NOM.toLowerCase(),
    fromInitials: formateurInitials,
    fromColor: "#107c10",
    toEmail: eleveEmail,
    dateHeader: fmtDayHeader(dateFormateur),
    body: bodyFormateur,
  });

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(sujet1)}</title></head>
<body style="margin:0;padding:24px;background:#faf9f8;font-family:'Segoe UI','Segoe UI Web',Arial,sans-serif;color:#201f1e;">
${mail1}
${mail2}
</body></html>`;
}
