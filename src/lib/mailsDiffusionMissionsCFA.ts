// Mails d'envoi / d'annonce de DIFFUSION d'une mission CFA
// Envoyé la veille (J-1) de la semaine école dédiée à la mission.
// Style Gmail-like, cohérent avec mailsMissionsCFA.ts
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";

const MISSIONS_DIFFUSION: { num: number; titre: string; supports: string }[] = [
  { num: 1,  titre: "Orientation, réorientation & Handicap",          supports: "Affiche A3 Mission 1 + Livret référent handicap" },
  { num: 2,  titre: "Aide à la recherche d'un employeur",             supports: "Affiche A3 Mission 2 + Procédure aide à la recherche d'employeur" },
  { num: 3,  titre: "Cohérence CFA / Entreprise",                     supports: "Affiche A3 Mission 3 + Procédure coopération CFA / Entreprise" },
  { num: 4,  titre: "Droits, devoirs & Santé-Sécurité au travail",    supports: "Affiche A3 Mission 4 + Note d'information SST" },
  { num: 5,  titre: "Rupture de contrat",                             supports: "Affiche A3 Mission 5 + Procédure maintien 6 mois" },
  { num: 6,  titre: "Accompagnement social & matériel",               supports: "Affiche A3 Mission 6 + Cartes aides régionales (ARA, Imagine R, Santé Psy)" },
  { num: 7,  titre: "Mixité Femmes – Hommes",                         supports: "Affiche A3 Mission 7 + Plan d'actions mixité F/H" },
  { num: 8,  titre: "Égalité professionnelle & mixité des métiers",   supports: "Affiche A3 Mission 8 + Plan mixité des métiers" },
  { num: 9,  titre: "Diversité & lutte contre les discriminations",   supports: "Affiche A3 Mission 9 + Plan diversité" },
  { num: 10, titre: "Mobilité nationale & internationale",            supports: "Affiche A3 Mission 10 + Convention inter-CFA + Fiche de demande" },
  { num: 11, titre: "Suivi de la formation à distance",               supports: "Affiche A3 Mission 11 + Procédure de suivi à distance" },
  { num: 12, titre: "Évaluation des compétences acquises",            supports: "Affiche A3 Mission 12 + Attestation formation MA" },
  { num: 13, titre: "Accompagnement post-formation",                  supports: "Affiche A3 Mission 13 + Procédure accompagnement post-formation" },
  { num: 14, titre: "Accès aux aides des apprentis",                  supports: "Affiche A3 Mission 14 + Procédure accès aux aides" },
];

function parseDateSafe(s?: string): Date | null {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
function startOfISOWeek(d: Date): Date {
  const dt = new Date(d);
  const day = (dt.getDay() + 6) % 7;
  dt.setDate(dt.getDate() - day);
  dt.setHours(0, 0, 0, 0);
  return dt;
}
function addDays(d: Date, n: number): Date { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function fmtLong(d: Date): string {
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function fmtShort(d: Date): string {
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function fmtTime(d: Date): string {
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Lundi de la N-ième semaine école (rythme 1 sem école / 3 sem entreprise → +28j par mission). */
export function dateDiffusionMission(f: FormationInfo, missionNumero: number): Date {
  const start = parseDateSafe(f.dateDebut) || new Date();
  const monday = startOfISOWeek(start);
  return addDays(monday, (missionNumero - 1) * 28);
}

/** Date d'envoi du mail d'annonce = veille (J-1) de la diffusion. */
export function dateMailDiffusionMission(f: FormationInfo, missionNumero: number): Date {
  const diffusion = dateDiffusionMission(f, missionNumero);
  const veille = addDays(diffusion, -1); // dimanche
  // Envoi déterministe en fin de journée (17h45 + offset)
  veille.setHours(17, 45 + (missionNumero % 10), 0, 0);
  return veille;
}

function renderPieceJointe(missionNumero: number, missionTitre: string): string {
  const cleanTitre = missionTitre.replace(/[^a-zA-Z0-9]+/g, "_").substring(0, 40);
  const fileName = `Affiche_A3_Mission_${String(missionNumero).padStart(2, "0")}_${cleanTitre}.pdf`;
  return `
    <div style="margin:18px 0 8px;font-size:13px;color:#5f6368;">1 pièce jointe</div>
    <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;border:1px solid #dadce0;border-radius:8px;background:#fff;width:320px;max-width:100%;page-break-inside:avoid;break-inside:avoid;">
      <tr>
        <td style="width:46px;padding:10px 0 10px 14px;vertical-align:middle;">
          <div style="width:32px;height:40px;background:#d93025;color:#fff;font-size:10px;font-weight:700;text-align:center;line-height:40px;border-radius:3px;">PDF</div>
        </td>
        <td style="padding:10px 14px 10px 8px;vertical-align:middle;font-size:13px;line-height:1.3;">
          <div style="color:#202124;font-weight:500;word-break:break-word;">${escapeHtml(fileName)}</div>
          <div style="color:#5f6368;font-size:11px;margin-top:2px;">PDF · ~220 Ko</div>
        </td>
      </tr>
    </table>
  `;
}

export function genMailDiffusionMissionCFA(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx: number,
  missionNumero: number,
): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Stagiaire introuvable.</p>";
  const mission = MISSIONS_DIFFUSION.find((m) => m.num === missionNumero);
  if (!mission) return "<p>Mission introuvable.</p>";

  const dEnvoi = dateMailDiffusionMission(f, missionNumero);
  const dDiffusion = dateDiffusionMission(f, missionNumero);
  const finSemaine = addDays(dDiffusion, 4);
  const dateLong = fmtLong(dEnvoi);
  const heure = fmtTime(dEnvoi);

  const fromName = o.nom || "Centre de Formation";
  const fromEmail = o.email || `contact@${(o.nom || "cfa").toLowerCase().replace(/[^a-z0-9]/g, "")}.fr`;
  const toEmail = s.email || `${(s.prenom || "").toLowerCase()}.${(s.nom || "").toLowerCase()}@email.fr`;
  const toName = `${s.prenom || ""} ${s.nom || ""}`.trim();
  const civilite = s.civilite === "Mme" ? "Madame" : "Monsieur";

  const sujet = `[Diffusion CFA — J-1] Demain ${fmtShort(dDiffusion)} : lancement Mission ${missionNumero} – ${mission.titre}`;
  const pjHtml = renderPieceJointe(missionNumero, mission.titre);

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(sujet)}</title><style>body{margin:0;padding:0;background:#ffffff}.mail-shell{width:760px;max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #dadce0;border-radius:6px;overflow:hidden;font-family:'Google Sans','Segoe UI',Roboto,Arial,sans-serif;color:#202124;box-sizing:border-box}.mail-body{padding:22px 24px 24px;font-size:14px;line-height:1.62;color:#202124}.mail-meta{font-size:13px;line-height:1.45;color:#5f6368}.keep{page-break-inside:avoid;break-inside:avoid}@media print{.mail-shell{width:100%;max-width:100%;border-radius:0}.mail-body{padding:20px 24px}}</style></head>
<body>
<div class="mail-shell">

  <div style="background:#f1f3f4;padding:10px 16px;border-bottom:1px solid #dadce0;font-size:13px;color:#5f6368;">
    <span style="color:#d93025;font-weight:700;">M</span> Gmail &nbsp;·&nbsp; Boîte de réception
  </div>

  <div class="keep" style="padding:18px 24px 8px;border-bottom:1px solid #f1f3f4;">
    <div style="font-size:20px;font-weight:500;color:#202124;line-height:1.3;">${escapeHtml(sujet)}</div>
    <div style="margin-top:6px;display:inline-block;background:#e8f0fe;color:#1967d2;font-size:11px;font-weight:600;padding:2px 8px;border-radius:10px;">Boîte de réception</div>
  </div>

  <table role="presentation" cellspacing="0" cellpadding="0" class="keep" style="width:100%;border-collapse:collapse;border-bottom:1px solid #f1f3f4;">
    <tr>
      <td style="width:56px;padding:14px 0 14px 24px;vertical-align:top;">
        <div style="width:40px;height:40px;border-radius:50%;background:#1a73e8;color:#fff;text-align:center;line-height:40px;font-weight:700;font-size:16px;">${escapeHtml((o.nom || "C")[0].toUpperCase())}</div>
      </td>
      <td class="mail-meta" style="padding:14px 24px 14px 8px;vertical-align:top;">
        <div><strong style="color:#202124;">${escapeHtml(fromName)}</strong> <span style="color:#5f6368;">&lt;${escapeHtml(fromEmail)}&gt;</span></div>
        <div style="color:#5f6368;">À : <strong style="color:#202124;">${escapeHtml(toName)}</strong> &lt;${escapeHtml(toEmail)}&gt;</div>
        <div style="color:#5f6368;">${escapeHtml(dateLong)} à ${escapeHtml(heure)}</div>
      </td>
    </tr>
  </table>

  <div class="mail-body">
    <p style="margin:0 0 14px;">Bonjour ${escapeHtml(civilite)} <strong>${escapeHtml(s.nom || "")}</strong>,</p>

    <p style="margin:0 0 14px;">
      Petit message d'information à la veille du lancement de la <strong>semaine école n°${missionNumero}/14</strong>
      de votre formation <strong>${escapeHtml(f.intitule || "")}</strong>.
    </p>

    <p style="margin:0 0 14px;">
      <strong>Dès demain ${escapeHtml(fmtLong(dDiffusion))}</strong>, le CFA <strong>${escapeHtml(o.nom || "")}</strong>
      lance la diffusion officielle de la <strong>Mission ${missionNumero} – ${escapeHtml(mission.titre)}</strong>,
      dans le cadre des 14 missions du CFA (article <strong>L.6231-2 du Code du Travail</strong>).
    </p>

    <div style="margin:14px 0;padding:12px 14px;background:#f1f3f4;border-left:3px solid #1a73e8;border-radius:4px;font-size:13px;line-height:1.6;">
      <strong>Semaine de diffusion :</strong> du ${escapeHtml(fmtShort(dDiffusion))} au ${escapeHtml(fmtShort(finSemaine))}<br>
      <strong>Supports diffusés :</strong> ${escapeHtml(mission.supports)}<br>
      <strong>Canaux :</strong> affichage en salle commune + ENT / LMS + mail apprenti<br>
      <strong>Horaires école :</strong> 09h00 – 12h30 / 13h30 – 17h00 (7h / jour)
    </div>

    <p style="margin:14px 0;">
      Vous trouverez en pièce jointe le <strong>visuel A3</strong> qui sera affiché dès demain matin dans la salle
      commune du centre. Merci d'en prendre connaissance avant votre arrivée.
    </p>

    ${pjHtml}

    <p style="margin:20px 0 14px;">
      Le QCM de la mission vous sera transmis séparément en début de semaine. En cas de question
      ou de difficulté, n'hésitez pas à me répondre directement à ce mail.
    </p>

    <p style="margin:18px 0 4px;">Bonne préparation et à demain,</p>
    <p style="margin:0 0 14px;"><strong>${escapeHtml(o.dirigeant || o.nom || "L'équipe pédagogique")}</strong><br>
      <span style="color:#5f6368;font-size:13px;">${escapeHtml(o.nom || "")}</span></p>

    <hr style="border:none;border-top:1px solid #e8eaed;margin:20px 0;">
    <div style="font-size:11px;color:#5f6368;line-height:1.5;">
      ${escapeHtml(o.nom || "")} — ${escapeHtml(o.adresse || "")} ${escapeHtml(o.codePostal || "")} ${escapeHtml(o.ville || "")}<br>
      ${o.telephone ? `Tél : ${escapeHtml(o.telephone)} — ` : ""}${escapeHtml(o.email || "")}<br>
      SIRET : ${escapeHtml(o.siret || "")} — N° NDA : ${escapeHtml(o.nda || "")}<br>
      Mail automatique d'annonce de diffusion généré le ${escapeHtml(dateLong)}.
    </div>
  </div>
</div>
</body></html>`;
}
