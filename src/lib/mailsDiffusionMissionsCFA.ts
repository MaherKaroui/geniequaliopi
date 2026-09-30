// Mails d'envoi / d'annonce de DIFFUSION d'une mission CFA
// Envoyé la veille (J-1) de la semaine école dédiée à la mission.
// Style Gmail-like, cohérent avec mailsMissionsCFA.ts
import { lundiMission, dateQCMMission } from "@/lib/calendrierMissionsCFA";
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

/** Lundi de la semaine école où la mission est diffusée (rythme saisi, borné au contrat de l'apprenti). */
export function dateDiffusionMission(f: FormationInfo, missionNumero: number, s?: StagiaireInfo): Date {
  return lundiMission(f, missionNumero, s);
}

/** Date d'envoi du mail d'annonce = veille (J-1) de la diffusion. */
export function dateMailDiffusionMission(f: FormationInfo, missionNumero: number, s?: StagiaireInfo): Date {
  const diffusion = dateDiffusionMission(f, missionNumero, s);
  const veille = addDays(diffusion, -1); // dimanche
  // Envoi déterministe en fin de journée (17h45 + offset)
  veille.setHours(17, 45 + (missionNumero % 10), 0, 0);
  return veille;
}

function renderPieceJointe(missionNumero: number, missionTitre: string): string {
  const cleanTitre = missionTitre.replace(/[^a-zA-Z0-9]+/g, "_").substring(0, 40);
  const fileName = `Affiche_A3_Mission_${String(missionNumero).padStart(2, "0")}_${cleanTitre}.pdf`;
  return `
    <div style="margin:20px 0 8px;font-size:13px;color:#5f6368;">1 pièce jointe</div>
    <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;border:1px solid #dadce0;border-radius:4px;background:#fff;width:260px;max-width:100%;page-break-inside:avoid;break-inside:avoid;">
      <tr>
        <td style="width:46px;padding:10px 0 10px 12px;vertical-align:middle;">
          <div style="width:30px;height:36px;background:#d93025;color:#fff;font-size:9px;font-weight:700;text-align:center;line-height:36px;border-radius:2px;">PDF</div>
        </td>
        <td style="padding:8px 12px 8px 8px;vertical-align:middle;font-size:12px;line-height:1.3;">
          <div style="color:#202124;word-break:break-word;">${escapeHtml(fileName)}</div>
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

  const dEnvoi = dateMailDiffusionMission(f, missionNumero, s);
  const dDiffusion = dateDiffusionMission(f, missionNumero, s);
  const finSemaine = dateQCMMission(f, missionNumero, s);

  const dateCourt = dEnvoi.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const heure = fmtTime(dEnvoi);

  const fromName = o.nom || "Centre de Formation";
  const fromEmail = o.email || `contact@${(o.nom || "cfa").toLowerCase().replace(/[^a-z0-9]/g, "")}.fr`;
  const toEmail = s.email || `${(s.prenom || "").toLowerCase()}.${(s.nom || "").toLowerCase()}@email.fr`;
  const civilite = s.civilite === "Mme" ? "Madame" : "Monsieur";

  const sujet = `Diffusion Mission ${missionNumero} – ${mission.titre}`;
  const pjHtml = renderPieceJointe(missionNumero, mission.titre);

  const threadId = `r${(missionNumero * 8284624083642395367).toString().slice(0, 19)}`;
  const msgId = `r${(missionNumero * 712068502500123).toString().slice(0, 15)}`;
  const gmailLink = `https://mail.google.com/mail/u/0/?ik=fe5f9da148&amp;view=pt&amp;search=all&amp;permthid=thread-a:${threadId}&amp;simpl=msg-a:${msgId}…`;

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(sujet)}</title>
<style>
  body{margin:0;padding:0;background:#ffffff;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;color:#000;}
  .mail-shell{width:760px;max-width:760px;margin:0 auto;background:#ffffff;padding:24px 28px 32px;box-sizing:border-box;font-size:13px;line-height:1.5;}
  .gmail-top{font-size:11px;color:#5f6368;margin-bottom:18px;}
  .gmail-top .m{color:#d93025;font-weight:700;}
  .subject{font-size:16px;font-weight:400;color:#000;margin:0 0 18px;}
  .from-row{width:100%;border-collapse:collapse;margin-bottom:14px;}
  .from-row td{vertical-align:top;font-size:12px;}
  .from-row .from{color:#000;}
  .from-row .date{text-align:right;color:#000;white-space:nowrap;}
  .to-row{font-size:12px;color:#000;margin-bottom:18px;}
  .body p{margin:0 0 12px;font-size:13px;line-height:1.55;}
  .footer-link{font-size:10px;color:#5f6368;margin-top:28px;word-break:break-all;}
  .page-num{font-size:10px;color:#5f6368;text-align:right;margin-top:4px;}
  .pj-section{margin-top:24px;border-top:1px solid #e0e0e0;padding-top:14px;}
  .keep{page-break-inside:avoid;break-inside:avoid;}
  @media print{.mail-shell{width:100%;max-width:100%;padding:16px 20px;}}
</style></head>
<body>
<div class="mail-shell">

  <div class="gmail-top"><span class="m">M</span> Gmail - ${escapeHtml(sujet)}</div>

  <div class="subject">${escapeHtml(sujet)}</div>

  <table class="from-row" role="presentation" cellspacing="0" cellpadding="0">
    <tr>
      <td class="from"><strong>${escapeHtml(fromName)}</strong> &lt;${escapeHtml(fromEmail)}&gt;</td>
      <td class="date">${escapeHtml(dateCourt)} à ${escapeHtml(heure)}</td>
    </tr>
  </table>
  <div class="to-row">À : ${escapeHtml(toEmail)}</div>

  <div class="body keep">
    <p>Bonjour ${escapeHtml(civilite)} <strong>${escapeHtml(s.nom || "")}</strong>,</p>

    <p>Je vous informe que le CFA <strong>${escapeHtml(o.nom || "")}</strong> lancera dès demain, ${escapeHtml(fmtLong(dDiffusion))}, la diffusion officielle de la <strong>Mission ${missionNumero} – ${escapeHtml(mission.titre)}</strong>, dans le cadre des 14 missions du CFA (article L.6231-2 du Code du Travail).</p>

    <p>Cette diffusion s'inscrit dans la <strong>période au CFA consacrée à la mission n°${missionNumero}/14</strong> de votre formation <strong>${escapeHtml(f.intitule || "")}</strong> et se tiendra du ${escapeHtml(fmtShort(dDiffusion))} au ${escapeHtml(fmtShort(finSemaine))}.</p>

    <p>Les supports diffusés seront : ${escapeHtml(mission.supports)}. Ils seront mis à disposition par affichage en salle commune, dépôt sur l'ENT / LMS et envoi par mail. Vous trouverez ci-joint le visuel A3 qui sera affiché dès demain matin dans le centre.</p>

    <p>Je reste à votre disposition pour toute question ou besoin d'accompagnement complémentaire.</p>

    <p>Cordialement,</p>

    <p><strong>${escapeHtml(o.dirigeant || o.nom || "L'équipe pédagogique")}</strong><br>
    ${escapeHtml(o.nom || "")}<br>
    ${escapeHtml(o.email || "")}${o.telephone ? `<br>${escapeHtml(o.telephone)}` : ""}</p>
  </div>

  <div class="footer-link">${gmailLink}</div>
  <div class="page-num">1/1</div>

  <div class="pj-section keep">
    ${pjHtml}
  </div>

</div>
</body></html>`;
}
