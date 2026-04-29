// Mail Organisme → Stagiaire : envoi du Contrat de formation, de la Convocation et du Règlement Intérieur.
// Style Outlook (Microsoft 365).
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";

function parseDateSafe(s?: string): Date | null {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
function addBusinessDays(d: Date, n: number): Date {
  const x = new Date(d);
  let added = 0;
  const dir = n >= 0 ? 1 : -1;
  while (added < Math.abs(n)) {
    x.setDate(x.getDate() + dir);
    const day = x.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return x;
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
function fmtLong(d: Date): string {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "OF";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Envoi ~14 jours ouvrés avant le début, à 10h12. */
function dateMailEnvoi(s: StagiaireInfo, f: FormationInfo): Date {
  const start = parseDateSafe(s.dateDebutFormation || f.dateDebut) || new Date();
  const envoi = addBusinessDays(start, -14);
  envoi.setHours(10, 12, 0, 0);
  return envoi;
}

export function genMailEnvoiContratConvocationRI(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx: number,
): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Stagiaire introuvable.</p>";

  const envoi = dateMailEnvoi(s, f);
  const dateHeader = fmtDayHeader(envoi);

  const civilite = (s.civilite || "").toLowerCase();
  const civPrefix = civilite === "mme" || civilite === "madame" ? "Madame" : "Monsieur";
  const apprenantPrenom = s.prenom || "";
  const apprenantNom = s.nom || "";
  const apprenantNomComplet = `${apprenantPrenom} ${apprenantNom}`.trim();
  const toEmail = s.email || `${(s.prenom || "stagiaire").toLowerCase()}.${(s.nom || "").toLowerCase()}@email.fr`;

  const fromName = o.nom || "Organisme de formation";
  const fromEmail = o.email || "contact@organisme.fr";
  const fromInitials = initials(fromName);

  const intitule = f.intitule || "votre formation";
  const dateDebut = parseDateSafe(s.dateDebutFormation || f.dateDebut);
  const dateFin = parseDateSafe(s.dateFinFormation || f.dateFin);

  const sujet = `Envoi des documents contractuels – ${intitule}`;

  const nomUpper = apprenantNom.toUpperCase();
  const pj = [
    { nom: `CONTRAT DE FORMATION - ${nomUpper}.pdf`, taille: "312 Ko", color: "#D93025" },
    { nom: `CONVOCATION - ${nomUpper}.pdf`, taille: "187 Ko", color: "#D93025" },
    { nom: `REGLEMENT INTERIEUR - ${o.nom || "ORGANISME"}.pdf`.toUpperCase(), taille: "224 Ko", color: "#D93025" },
  ];

  const pjHtml = pj
    .map(
      (p) => `
      <div style="display:inline-block;vertical-align:top;border:1px solid #e1dfdd;border-radius:4px;padding:8px 28px 8px 38px;margin:0 8px 8px 0;background:#faf9f8;min-width:200px;position:relative;font-size:12px;">
        <div style="position:absolute;left:8px;top:8px;width:22px;height:22px;background:${p.color};color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:2px;">P</div>
        <div style="color:#201f1e;font-weight:600;line-height:1.3;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(p.nom)}</div>
        <div style="color:#605e5c;font-size:11px;margin-top:2px;">${escapeHtml(p.taille)}</div>
      </div>`
    )
    .join("");

  const periode = dateDebut && dateFin
    ? `du <strong>${fmtLong(dateDebut)}</strong> au <strong>${fmtLong(dateFin)}</strong>`
    : dateDebut
    ? `à compter du <strong>${fmtLong(dateDebut)}</strong>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(sujet)}</title></head>
<body style="margin:0;padding:24px;background:#faf9f8;font-family:'Segoe UI','Segoe UI Web',Arial,sans-serif;color:#201f1e;">
<div style="max-width:900px;margin:0 auto;background:#ffffff;border:1px solid #edebe9;">

  <!-- Barre actions Outlook -->
  <div style="background:#ffffff;border-bottom:1px solid #edebe9;padding:8px 16px;font-size:13px;color:#323130;">
    <span style="color:#a4262c;">↩ Répondre</span> &nbsp;
    <span style="color:#a4262c;">↩ Répondre à tous</span> &nbsp;
    <span style="color:#0078d4;">→ Transférer</span> &nbsp;
    <span>✉ Lu / non lu</span> &nbsp;
    <span style="color:#a4262c;">⚑ Marquer</span>
  </div>

  <!-- Sujet -->
  <div style="padding:18px 24px;border-bottom:1px solid #edebe9;font-size:18px;font-weight:600;color:#201f1e;">
    ${escapeHtml(sujet)}
  </div>

  <!-- Expéditeur -->
  <div style="padding:14px 24px;border-bottom:1px solid #edebe9;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="width:54px;vertical-align:top;">
          <div style="width:40px;height:40px;border-radius:50%;background:#0078d4;color:#fff;text-align:center;line-height:40px;font-weight:600;font-size:14px;">
            ${escapeHtml(fromInitials)}
          </div>
        </td>
        <td style="vertical-align:top;font-size:13px;line-height:1.5;">
          <div style="font-weight:600;color:#201f1e;">${escapeHtml(fromName)} &lt;${escapeHtml(fromEmail)}&gt;</div>
          <div style="color:#605e5c;">À : ${escapeHtml(apprenantNomComplet)} &lt;${escapeHtml(toEmail)}&gt;</div>
        </td>
        <td style="text-align:right;vertical-align:top;font-size:12px;color:#605e5c;white-space:nowrap;">${escapeHtml(dateHeader)}</td>
      </tr>
    </table>
  </div>

  <!-- Pièces jointes -->
  <div style="padding:14px 24px 8px;">
    ${pjHtml}
    <div style="margin-top:6px;font-size:12px;color:#605e5c;">
      ${pj.length} pièces jointes &nbsp; ☁ Tout enregistrer dans OneDrive &nbsp; ⬇ Télécharger tout
    </div>
  </div>

  <!-- Corps -->
  <div style="padding:18px 24px 24px;font-size:14px;line-height:1.7;color:#201f1e;">
    <p style="margin:0 0 14px;">${escapeHtml(civPrefix)} ${escapeHtml(apprenantNom)},</p>

    <p style="margin:0 0 14px;">
      Suite à la validation de votre inscription à la formation <strong>${escapeHtml(intitule)}</strong>${periode ? ", " + periode : ""},
      nous vous transmettons par le présent message l'ensemble des documents contractuels relatifs à votre entrée en formation.
    </p>

    <p style="margin:0 0 8px;"><strong>Vous trouverez ci-joint :</strong></p>
    <ul style="margin:0 0 14px;padding-left:22px;">
      <li>Le <strong>contrat de formation professionnelle</strong>, à dater, signer et nous retourner ;</li>
      <li>Votre <strong>convocation</strong> précisant la date, les horaires et le lieu de la formation ;</li>
      <li>Le <strong>règlement intérieur</strong> applicable au sein de notre organisme, dont nous vous demandons de prendre connaissance.</li>
    </ul>

    <p style="margin:0 0 14px;">
      Nous vous remercions de bien vouloir nous retourner le contrat signé dans les meilleurs délais, et au plus tard
      <strong>5 jours avant le début de la formation</strong>, par retour de mail.
    </p>

    <p style="margin:0 0 14px;">
      Notre équipe pédagogique reste à votre entière disposition pour toute question concernant le déroulement de la formation,
      les modalités d'accès, ou un éventuel besoin d'aménagement (situation de handicap, accessibilité…).
    </p>

    <p style="margin:0 0 14px;">
      Nous vous souhaitons une excellente formation et restons à votre écoute.
    </p>

    <p style="margin:18px 0 0;">
      Cordialement,<br>
      <strong>${escapeHtml(o.dirigeant || fromName)}</strong><br>
      ${escapeHtml(fromName)}<br>
      ${o.telephone ? `Tél. : ${escapeHtml(o.telephone)}<br>` : ""}
      ${escapeHtml(fromEmail)}
    </p>

    <!-- Boutons Outlook -->
    <div style="margin-top:26px;">
      <span style="display:inline-block;border:1px solid #d1d1d1;border-radius:2px;padding:6px 16px;margin-right:8px;font-size:13px;color:#a4262c;">↩ Répondre</span>
      <span style="display:inline-block;border:1px solid #d1d1d1;border-radius:2px;padding:6px 16px;font-size:13px;color:#0078d4;">→ Transférer</span>
    </div>
  </div>
</div>
</body></html>`;
}
