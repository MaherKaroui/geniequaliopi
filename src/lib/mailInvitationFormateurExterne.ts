// Mail Organisme → Formateur externe : invitation à animer une session de formation
// Style Outlook (Microsoft 365), cohérent avec les autres mails (mailRdvEvaluationBesoins, etc.)
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { getStagiaireDateDebut, getStagiaireDateFin } from "./docBuilder";

const FORMATEUR_EXTERNE_NOM = "Nabih Ouardani";
const FORMATEUR_EXTERNE_EMAIL = "nabih.ouardani@gmail.com";

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
 * Mail d'invitation envoyé au formateur externe Nabih Ouardani pour une session de formation.
 * Une session = un stagiaire (avec ses dates individuelles ou les dates globales).
 * Date d'envoi : ~21 jours avant le début de la session, à 09h45.
 */
export function genMailInvitationFormateurExterne(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx: number,
): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Stagiaire introuvable.</p>";

  const debutStr = getStagiaireDateDebut(s, f);
  const finStr = getStagiaireDateFin(s, f);
  const debut = parseDateSafe(debutStr) || new Date();
  const fin = parseDateSafe(finStr) || new Date(debut);

  // Envoi du mail : 21 jours avant le début de session
  const envoi = new Date(debut);
  envoi.setDate(envoi.getDate() - 21);
  envoi.setHours(9, 45, 0, 0);

  const dateHeader = fmtDayHeader(envoi);
  const fromName = (o.nom || "Organisme de formation").toLowerCase();
  const fromInitials = initials(o.nom || "OF");

  const apprenant = `${s.prenom || ""} ${s.nom || ""}`.trim() || "le stagiaire";
  const intitule = (f.intitule || "").toUpperCase();
  const lieu = `${o.adresse || ""}${o.codePostal || o.ville ? ` – ${o.codePostal || ""} ${o.ville || ""}` : ""}`.trim();
  const duree = f.duree || "";
  const modalites = f.modalites || "";

  const sujet = `Invitation à animer la session de formation – ${apprenant}`;

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
      <div style="color:#605e5c;">À : ${escapeHtml(FORMATEUR_EXTERNE_EMAIL)}</div>
    </div>
    <div style="font-size:12px;color:#605e5c;white-space:nowrap;">${escapeHtml(dateHeader)}</div>
  </div>

  <div style="padding:18px 24px 24px;font-size:14px;line-height:1.7;color:#201f1e;">
    <p style="margin:0 0 14px;">Bonjour ${escapeHtml(FORMATEUR_EXTERNE_NOM)},</p>

    <p style="margin:0 0 14px;">
      Dans le cadre de notre collaboration, nous avons le plaisir de vous solliciter pour <strong>animer une nouvelle session de formation</strong> au sein de notre organisme.
    </p>

    <p style="margin:0 0 14px;">
      Nous vous remercions par avance de bien vouloir confirmer votre disponibilité sur les dates indiquées ci-dessous.
    </p>

    <div style="border:1px solid #c7e0f4;background:#eff6fc;border-radius:4px;padding:12px 16px;margin:0 0 16px;">
      <div style="font-weight:600;color:#0078d4;margin-bottom:6px;">📚 Session de formation</div>
      <div><strong>Intitulé :</strong> ${escapeHtml(intitule)}</div>
      <div><strong>Apprenant :</strong> ${escapeHtml(apprenant)}</div>
      <div><strong>Date de début :</strong> ${escapeHtml(fmtLongDate(debut))}</div>
      <div><strong>Date de fin :</strong> ${escapeHtml(fmtLongDate(fin))}</div>
      ${duree ? `<div><strong>Durée :</strong> ${escapeHtml(duree)}</div>` : ""}
      ${modalites ? `<div><strong>Modalités :</strong> ${escapeHtml(modalites)}</div>` : ""}
      ${lieu ? `<div><strong>Lieu :</strong> ${escapeHtml(lieu)}</div>` : ""}
    </div>

    <p style="margin:0 0 14px;">
      Vous trouverez ci-joint le programme détaillé ainsi que les supports pédagogiques associés. Nous vous remercions de bien vouloir prendre connaissance des objectifs visés et des modalités d'évaluation prévues afin de préparer au mieux les séances.
    </p>

    <p style="margin:0 0 14px;">
      Conformément à nos engagements qualité (référentiel Qualiopi), nous vous rappelons l'importance :
    </p>

    <ul style="margin:0 0 14px;padding-left:22px;list-style-type:disc;list-style-position:outside;">
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">de respecter le <strong>programme et la progression pédagogique</strong> validés ;</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">de faire <strong>émarger l'apprenant</strong> à chaque demi-journée ;</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">de compléter les <strong>fiches de suivi pédagogique</strong> et les évaluations en fin de session ;</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">de nous signaler toute <strong>difficulté, absence ou demande d'aménagement</strong> dans les meilleurs délais.</li>
    </ul>

    <p style="margin:0 0 14px;">
      Merci de bien vouloir nous retourner votre <strong>confirmation par retour de mail</strong>, accompagnée le cas échéant de votre <strong>convention de sous-traitance signée</strong> et de votre <strong>attestation de qualification de formateur</strong> à jour.
    </p>

    <p style="margin:0 0 14px;">
      Nous restons à votre entière disposition pour tout complément d'information ou échange préparatoire avant le démarrage de la session.
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
