// Mails hebdomadaires CFA — 1 mail par mission (14 missions Art. L6231-2),
// envoyé chaque semaine école avec le QCM correspondant en exemple.
// Style Gmail-like, identique aux autres mails du dossier (mail_pre_inscription, etc.).
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { MISSIONS_QCM } from "@/lib/templatesCFA14Missions";

/* ----- Date helpers (semaines école = 1 sem école / 3 sem entreprise par défaut) ----- */
function parseDateSafe(s?: string): Date | null {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
function startOfISOWeek(d: Date): Date {
  const dt = new Date(d);
  const day = (dt.getDay() + 6) % 7; // lundi = 0
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

/** Calcule la date d'envoi du mail QCM mission N (lundi de la N-ième semaine école). */
export function dateMailMission(f: FormationInfo, missionNumero: number): Date {
  const start = parseDateSafe(f.dateDebut) || new Date();
  const monday = startOfISOWeek(start);
  // Rythme par défaut : 1 sem école / 3 sem entreprise → 1 cycle = 4 semaines
  // Mission N envoyée la semaine école n°N (donc lundi + (N-1)*4 semaines)
  const lundiSemaineEcole = addDays(monday, (missionNumero - 1) * 28);
  // Heure d'envoi déterministe (8h05 + offset minutes selon mission)
  lundiSemaineEcole.setHours(8, 5 + (missionNumero % 7), 0, 0);
  return lundiSemaineEcole;
}

/* ----- Rendu HTML mail (style Gmail) ----- */
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderPieceJointe(missionNumero: number, missionTitre: string): string {
  // Représentation visuelle d'une pièce jointe Gmail (PDF QCM, non corrigé)
  const cleanTitre = missionTitre.replace(/^Mission \d+ — /, "");
  const fileName = `QCM_Mission_${String(missionNumero).padStart(2, "0")}_${cleanTitre.replace(/[^a-zA-Z0-9]+/g, "_").substring(0, 40)}.pdf`;
  return `
    <div style="margin:18px 0 8px;font-size:13px;color:#5f6368;">1 pièce jointe</div>
    <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;border:1px solid #dadce0;border-radius:8px;background:#fff;width:320px;max-width:100%;page-break-inside:avoid;break-inside:avoid;">
      <tr>
        <td style="width:46px;padding:10px 0 10px 14px;vertical-align:middle;">
          <div style="width:32px;height:40px;background:#d93025;color:#fff;font-size:10px;font-weight:700;text-align:center;line-height:40px;border-radius:3px;">PDF</div>
        </td>
        <td style="padding:10px 14px 10px 8px;vertical-align:middle;font-size:13px;line-height:1.3;">
          <div style="color:#202124;font-weight:500;word-break:break-word;">${escapeHtml(fileName)}</div>
          <div style="color:#5f6368;font-size:11px;margin-top:2px;">PDF · ~180 Ko</div>
        </td>
      </tr>
    </table>
  `;
}

export function genMailMissionCFA(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx: number,
  missionNumero: number,
): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Stagiaire introuvable.</p>";
  const mission = MISSIONS_QCM.find((m) => m.numero === missionNumero);
  if (!mission) return "<p>Mission introuvable.</p>";

  const dEnvoi = dateMailMission(f, missionNumero);
  const dateLong = fmtLong(dEnvoi);
  const dateCourte = fmtShort(dEnvoi);
  const heure = fmtTime(dEnvoi);
  const finSemaine = addDays(dEnvoi, 4); // vendredi de la même semaine

  const fromName = o.nom || "Centre de Formation";
  const fromEmail = o.email || `contact@${(o.nom || "cfa").toLowerCase().replace(/[^a-z0-9]/g, "")}.fr`;
  const toEmail = s.email || `${(s.prenom || "").toLowerCase()}.${(s.nom || "").toLowerCase()}@email.fr`;
  const toName = `${s.prenom || ""} ${s.nom || ""}`.trim();
  const civilite = s.civilite === "Mme" ? "Madame" : "Monsieur";

  const sujet = `[Semaine ${missionNumero}/14 — CFA] QCM Mission ${missionNumero} : ${mission.titre.replace(/^Mission \d+ — /, "")}`;

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
      J'espère que vous allez bien. Cette semaine, nous vous accueillons en centre pour la
      <strong>semaine école n°${missionNumero}</strong> de votre formation
      <strong>${escapeHtml(f.intitule || "")}</strong>.
    </p>

    <p style="margin:0 0 14px;">
      Le thème pédagogique de la semaine porte sur la <strong>${escapeHtml(mission.titre)}</strong>,
      qui s'inscrit dans le cadre des 14 missions du CFA (article L.6231-2 du Code du Travail).
    </p>

    <div style="margin:14px 0;padding:12px 14px;background:#f1f3f4;border-left:3px solid #1a73e8;border-radius:4px;font-size:13px;line-height:1.6;">
      <strong>Semaine du ${escapeHtml(dateCourte)} au ${escapeHtml(fmtShort(finSemaine))}</strong><br>
      Horaires : 09h00 – 12h30 / 13h30 – 17h00 (7h / jour)<br>
      Lieu : centre de formation
    </div>

    <p style="margin:14px 0;">
      Vous trouverez en pièce jointe le <strong>QCM de la semaine</strong> (10 questions, durée ≈ 15 min).
      Merci de le compléter et de me le retourner avant le <strong>vendredi ${escapeHtml(fmtShort(finSemaine))} à 17h00</strong>.
      Nous reviendrons ensemble sur la correction lors du bilan du vendredi après-midi.
    </p>

    ${pjHtml}

    <p style="margin:20px 0 14px;">
      En cas de difficulté pour ouvrir le document ou pour répondre, n'hésitez pas à me le
      signaler par retour de mail.
    </p>

    <p style="margin:18px 0 4px;">Bonne semaine de formation,</p>
    <p style="margin:0 0 14px;"><strong>${escapeHtml(o.dirigeant || o.nom || "L'équipe pédagogique")}</strong><br>
      <span style="color:#5f6368;font-size:13px;">${escapeHtml(o.nom || "")}</span></p>

    <hr style="border:none;border-top:1px solid #e8eaed;margin:20px 0;">
    <div style="font-size:11px;color:#5f6368;line-height:1.5;">
      ${escapeHtml(o.nom || "")} — ${escapeHtml(o.adresse || "")} ${escapeHtml(o.codePostal || "")} ${escapeHtml(o.ville || "")}<br>
      ${o.telephone ? `Tél : ${escapeHtml(o.telephone)} — ` : ""}${escapeHtml(o.email || "")}<br>
      SIRET : ${escapeHtml(o.siret || "")} — N° NDA : ${escapeHtml(o.nda || "")}<br>
      Mail automatique généré le ${escapeHtml(dateLong)}.
    </div>
  </div>
</div>
</body></html>`;
}
