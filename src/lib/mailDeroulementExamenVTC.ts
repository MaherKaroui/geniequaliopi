// Mail Organisme → Stagiaire : explication détaillée du déroulement de l'examen VTC (RS5637)
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { getStagiaireDateDebut } from "./docBuilder";

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
  if (!parts.length) return "OF";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function genMailDeroulementExamenVTC(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx: number,
): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Stagiaire introuvable.</p>";

  const debutStr = getStagiaireDateDebut(s, f);
  const debut = parseDateSafe(debutStr) || new Date();
  // Mail envoyé 10 jours après le début de formation à 11h08
  const envoi = new Date(debut);
  envoi.setDate(envoi.getDate() + 10);
  envoi.setHours(11, 8, 0, 0);

  const dateHeader = fmtDayHeader(envoi);
  const fromName = (o.nom || "Organisme de formation").toLowerCase();
  const fromInitials = initials(o.nom || "OF");
  const civilite = (s.civilite || "").toLowerCase();
  const prefix = civilite === "mme" || civilite === "madame" ? "Madame" : "Monsieur";
  const apprenantPrenom = s.prenom || "";
  const toEmail = s.email || `${(s.prenom || "stagiaire").toLowerCase()}.${(s.nom || "").toLowerCase()}@email.fr`;

  const sujet = `Déroulement de l'examen VTC (RS5637) – Toutes les informations utiles`;

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
      Dans le cadre de votre préparation à la <strong>certification VTC – RS5637</strong>, vous trouverez ci-dessous l'ensemble des informations relatives au déroulement officiel de l'examen organisé par les <strong>Chambres de Métiers et de l'Artisanat (CMA)</strong>.
    </p>

    <p style="margin:0 0 14px;">
      Les modalités d'évaluation reposent sur la réussite à un <strong>examen obligatoire en deux phases complémentaires</strong> : une épreuve théorique d'admissibilité et une épreuve pratique d'admission.
    </p>

    <h3 style="margin:18px 0 8px;font-size:15px;color:#0078d4;">1. Épreuve théorique d'admissibilité</h3>
    <p style="margin:0 0 10px;">
      Elle se déroule sous forme d'exercices écrits comprenant des <strong>questionnaires à choix multiples (QCM)</strong> et des <strong>questions à réponses courtes (QRC)</strong>, permettant d'évaluer vos connaissances en :
    </p>
    <ul style="margin:0 0 14px;padding-left:22px;list-style-type:disc;list-style-position:outside;">
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">Réglementation du transport public particulier de personnes (T3P) ;</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">Gestion d'entreprise (statuts juridiques, fiscalité, comptabilité) ;</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">Sécurité routière ;</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">Langue française et langue anglaise (niveau A2) ;</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">Développement commercial et relation client.</li>
    </ul>

    <h3 style="margin:18px 0 8px;font-size:15px;color:#0078d4;">2. Épreuve pratique d'admission</h3>
    <p style="margin:0 0 10px;">
      Elle consiste en une <strong>mise en situation professionnelle réelle</strong> de transport de personnes, incluant :
    </p>
    <ul style="margin:0 0 14px;padding-left:22px;list-style-type:disc;list-style-position:outside;">
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">Une <strong>phase de conduite en circulation</strong> : évaluation de la sécurité de conduite, du respect du code de la route et du confort passager ;</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">Une <strong>simulation de prise en charge client</strong> : accueil, qualité de service, relation client, gestion d'incident.</li>
    </ul>

    <p style="margin:0 0 14px;">
      La validation de la certification est conditionnée par la <strong>réussite aux deux épreuves</strong>, conformément au référentiel fixé par l'<strong>arrêté du 6 avril 2017</strong>.
    </p>

    <div style="border:1px solid #c7e0f4;background:#eff6fc;border-radius:4px;padding:12px 16px;margin:0 0 16px;">
      <div style="font-weight:600;color:#0078d4;margin-bottom:6px;">⏱️ Durée totale de l'examen</div>
      <div>• Épreuve théorique : <strong>3h50</strong></div>
      <div>• Épreuve pratique : <strong>environ 25 minutes</strong></div>
    </div>

    <div style="border:1px solid #f5c6cb;background:#fdecea;border-radius:4px;padding:12px 16px;margin:0 0 16px;">
      <div style="font-weight:600;color:#a4262c;margin-bottom:6px;">💶 Tarif de l'examen</div>
      <div><strong>241 €</strong> à régler <strong>directement auprès de la Chambre de Métiers et de l'Artisanat</strong> (non inclus dans le tarif de la formation).</div>
    </div>

  </div>
</div>

<div style="max-width:900px;margin:0 auto;background:#ffffff;border:1px solid #edebe9;page-break-before:always;break-before:page;">
  <div style="padding:18px 24px 24px;font-size:14px;line-height:1.7;color:#201f1e;">
    <h3 style="margin:0 0 8px;font-size:15px;color:#0078d4;">📋 Inscription à l'examen</h3>
    <p style="margin:0 0 10px;"><strong>Organisateur :</strong> Chambres de Métiers et de l'Artisanat (CMA)</p>
    <p style="margin:0 0 10px;">
      <strong>Plus d'informations :</strong><br>
      <a href="https://www.artisanat.fr/nous-connaitre/vous-accompagner/examens-taxi-vtc-vmdtr" style="color:#0078d4;">https://www.artisanat.fr/nous-connaitre/vous-accompagner/examens-taxi-vtc-vmdtr</a>
    </p>
    <p style="margin:0 0 14px;">
      <strong>Création de compte et inscription :</strong><br>
      <a href="https://www.exament3p.fr/inscription?code=VTC" style="color:#0078d4;">https://www.exament3p.fr/inscription?code=VTC</a>
    </p>

    <p style="margin:0 0 14px;">
      Vous devez créer votre <strong>compte personnel</strong> sur la plateforme officielle <strong>EXAMEN T3P</strong>, puis vous inscrire à une session d'examen VTC. Notre centre de formation vous accompagne dans cette démarche en amont du passage des épreuves – n'hésitez pas à nous solliciter pour toute aide.
    </p>

    <p style="margin:0 0 14px;">
      Nous restons à votre disposition pour toute question complémentaire.
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
