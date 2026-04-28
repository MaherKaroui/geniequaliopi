// Mail Organisme → Stagiaire : 1er rendez-vous (évaluation des besoins + test de positionnement)
// Style Outlook (Microsoft 365), cohérent avec mailEnvoiEvaluationPrealable.
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { getStagiaireDateDebut, subtractBusinessDays } from "./docBuilder";

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
function fmtLongDate(d: Date): string {
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
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

/**
 * Date du RDV évaluation des besoins : ~14 jours ouvrés avant le début de formation, à 14h00.
 * Date d'envoi du mail : ~7 jours avant le RDV à 10h12.
 */
export function genMailRdvEvaluationBesoins(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx: number,
): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Stagiaire introuvable.</p>";

  const debutStr = getStagiaireDateDebut(s, f);
  const debut = parseDateSafe(debutStr) || new Date();

  // RDV évaluation : 14 jours ouvrés avant le début
  const rdvStr = subtractBusinessDays(debutStr, 14);
  const rdv = parseDateSafe(rdvStr) || new Date(debut);
  rdv.setHours(14, 0, 0, 0);

  // Envoi du mail : 7 jours avant le RDV
  const envoi = new Date(rdv);
  envoi.setDate(envoi.getDate() - 7);
  envoi.setHours(10, 12, 0, 0);

  const dateHeader = fmtDayHeader(envoi);
  const fromName = (o.nom || "Organisme de formation").toLowerCase();
  const fromInitials = initials(o.nom || "OF");
  const civilite = (s.civilite || "").toLowerCase();
  const prefix = civilite === "mme" || civilite === "madame" ? "Madame" : "Monsieur";
  const apprenantPrenom = s.prenom || "";
  const toEmail = s.email || `${(s.prenom || "stagiaire").toLowerCase()}.${(s.nom || "").toLowerCase()}@email.fr`;

  const sujet = `Convocation au rendez-vous d'évaluation des besoins et test de positionnement`;
  const lieu = `${o.adresse || ""}${o.codePostal || o.ville ? ` – ${o.codePostal || ""} ${o.ville || ""}` : ""}`.trim();
  const intitule = (f.intitule || "").toUpperCase();

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(sujet)}</title></head>
<body style="margin:0;padding:24px;background:#faf9f8;font-family:'Segoe UI','Segoe UI Web',Arial,sans-serif;color:#201f1e;">
<div style="max-width:900px;margin:0 auto;background:#ffffff;border:1px solid #edebe9;">

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
    ${escapeHtml(sujet)}
  </div>

  <div style="padding:14px 24px;display:flex;align-items:flex-start;gap:14px;border-bottom:1px solid #edebe9;">
    <div style="width:40px;height:40px;border-radius:50%;background:#5b5fc7;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;flex-shrink:0;">
      ${escapeHtml(fromInitials)}
    </div>
    <div style="flex:1;font-size:13px;line-height:1.5;">
      <div style="font-weight:600;color:#201f1e;">${escapeHtml(fromName)}</div>
      <div style="color:#605e5c;">À : ${escapeHtml(toEmail)}</div>
    </div>
    <div style="font-size:12px;color:#605e5c;white-space:nowrap;">${escapeHtml(dateHeader)}</div>
  </div>

  <div style="padding:18px 24px 24px;font-size:14px;line-height:1.7;color:#201f1e;">
    <p style="margin:0 0 14px;">${escapeHtml(prefix)} ${escapeHtml(apprenantPrenom)},</p>

    <p style="margin:0 0 14px;">
      Faisant suite à votre demande d'inscription à la formation <strong>${escapeHtml(intitule)}</strong>, nous avons le plaisir de vous convier à un premier rendez-vous au sein de notre centre de formation.
    </p>

    <p style="margin:0 0 14px;">
      Ce rendez-vous nous permettra de finaliser l'analyse de votre projet et de votre profil à travers les éléments suivants :
    </p>

    <ul style="margin:0 0 14px;padding-left:22px;">
      <li>Un <strong>entretien individuel d'évaluation des besoins</strong> ;</li>
      <li>Un <strong>test de positionnement</strong> permettant d'évaluer votre niveau de départ ;</li>
      <li>Un <strong>test de culture générale</strong> ;</li>
      <li>La présentation détaillée du <strong>programme de formation</strong> et des modalités pédagogiques.</li>
    </ul>

    <div style="border:1px solid #c7e0f4;background:#eff6fc;border-radius:4px;padding:12px 16px;margin:0 0 16px;">
      <div style="font-weight:600;color:#0078d4;margin-bottom:4px;">📅 Rendez-vous fixé</div>
      <div><strong>Date :</strong> ${escapeHtml(fmtLongDate(rdv))}</div>
      <div><strong>Horaire :</strong> ${escapeHtml(fmtTime(rdv))} (durée estimée : 1h30)</div>
      ${lieu ? `<div><strong>Lieu :</strong> ${escapeHtml(lieu)}</div>` : ""}
    </div>

    <p style="margin:0 0 14px;">
      Nous vous remercions de bien vouloir vous présenter <strong>15 minutes avant l'horaire prévu</strong>, muni(e) d'une pièce d'identité ainsi que de votre permis B.
    </p>

    <p style="margin:0 0 14px;">
      En cas d'empêchement, merci de nous prévenir au plus tôt afin de convenir d'un nouveau créneau.
    </p>

    <p style="margin:0 0 14px;">
      Nous restons à votre disposition pour toute information complémentaire.
    </p>

    <p style="margin:18px 0 0;">Cordialement,<br>${escapeHtml(o.nom || "")}</p>

    <div style="margin-top:26px;">
      <span style="display:inline-block;border:1px solid #d1d1d1;border-radius:2px;padding:6px 16px;margin-right:8px;font-size:13px;color:#a4262c;">↩ Répondre</span>
      <span style="display:inline-block;border:1px solid #d1d1d1;border-radius:2px;padding:6px 16px;font-size:13px;color:#0078d4;">→ Transférer</span>
    </div>
  </div>
</div>
</body></html>`;
}
