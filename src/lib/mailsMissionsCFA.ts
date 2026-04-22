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
function dateMailMission(f: FormationInfo, missionNumero: number): Date {
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
    <div style="display:inline-block;border:1px solid #dadce0;border-radius:8px;padding:10px 14px;background:#fff;min-width:260px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:32px;height:40px;background:#d93025;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:3px;flex-shrink:0;">PDF</div>
        <div style="font-size:13px;line-height:1.3;">
          <div style="color:#202124;font-weight:500;">${escapeHtml(fileName)}</div>
          <div style="color:#5f6368;font-size:11px;margin-top:2px;">PDF · ~180 Ko</div>
        </div>
      </div>
    </div>
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

  const qcmHtml = renderQCMExemple(mission.questions);

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(sujet)}</title></head>
<body style="margin:0;padding:24px;background:#f6f8fa;font-family:'Google Sans','Segoe UI',Roboto,Arial,sans-serif;color:#202124;">
<div style="max-width:780px;margin:0 auto;background:#ffffff;border:1px solid #dadce0;border-radius:8px;overflow:hidden;">

  <!-- Barre Gmail -->
  <div style="background:#f1f3f4;padding:10px 16px;border-bottom:1px solid #dadce0;font-size:13px;color:#5f6368;">
    <span style="color:#d93025;font-weight:700;">M</span> Gmail &nbsp;·&nbsp; Boîte de réception
  </div>

  <!-- Sujet -->
  <div style="padding:18px 24px 8px;border-bottom:1px solid #f1f3f4;">
    <div style="font-size:20px;font-weight:500;color:#202124;line-height:1.3;">${escapeHtml(sujet)}</div>
    <div style="margin-top:6px;display:inline-block;background:#e8f0fe;color:#1967d2;font-size:11px;font-weight:600;padding:2px 8px;border-radius:10px;">Boîte de réception</div>
  </div>

  <!-- En-tête expéditeur -->
  <div style="padding:14px 24px;display:flex;align-items:flex-start;gap:12px;border-bottom:1px solid #f1f3f4;">
    <div style="width:40px;height:40px;border-radius:50%;background:#1a73e8;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0;">
      ${escapeHtml((o.nom || "C")[0].toUpperCase())}
    </div>
    <div style="flex:1;font-size:13px;line-height:1.5;">
      <div><strong style="color:#202124;">${escapeHtml(fromName)}</strong> <span style="color:#5f6368;">&lt;${escapeHtml(fromEmail)}&gt;</span></div>
      <div style="color:#5f6368;">À : <strong style="color:#202124;">${escapeHtml(toName)}</strong> &lt;${escapeHtml(toEmail)}&gt;</div>
      <div style="color:#5f6368;">${escapeHtml(dateLong)} à ${escapeHtml(heure)}</div>
    </div>
  </div>

  <!-- Corps du mail -->
  <div style="padding:24px;font-size:14px;line-height:1.65;color:#202124;">
    <p style="margin:0 0 14px;">Bonjour ${escapeHtml(civilite)} <strong>${escapeHtml(s.nom || "")}</strong>,</p>

    <p style="margin:0 0 14px;">
      Dans le cadre de votre formation <strong>${escapeHtml(f.intitule || "")}</strong> au sein du CFA <strong>${escapeHtml(o.nom || "")}</strong>,
      cette semaine est consacrée à la <strong>${escapeHtml(mission.titre)}</strong> — l'une des
      <strong>14 missions officielles</strong> du CFA (article L.6231-2 du Code du Travail).
    </p>

    <div style="margin:14px 0;padding:12px 14px;background:#fff8e1;border-left:4px solid #fbbc04;border-radius:4px;font-size:13px;">
      📅 <strong>Semaine école n°${missionNumero}</strong> — du <strong>${escapeHtml(dateCourte)}</strong> au <strong>${escapeHtml(fmtShort(finSemaine))}</strong><br>
      ⏰ Horaires : 09h00–12h30 / 13h30–17h00 (7 h / jour)<br>
      📍 En centre de formation
    </div>

    <p style="margin:14px 0;">
      Vous trouverez ci-dessous un <strong>QCM de 10 questions</strong> à réaliser avant
      <strong>${escapeHtml(fmtShort(finSemaine))}</strong>. Ce questionnaire valide les acquis pédagogiques de la mission
      et constitue une <em>preuve d'évaluation</em> dans votre dossier Qualiopi.
    </p>

    ${qcmHtml}

    <p style="margin:18px 0 14px;">
      <strong>Modalités :</strong><br>
      • Durée estimée : 15 minutes<br>
      • Note de passage : 12/20<br>
      • Tentatives : illimitées jusqu'au vendredi de la semaine école<br>
      • Correction & restitution : pendant le bilan hebdomadaire le vendredi
    </p>

    <p style="margin:14px 0;">
      En cas de difficulté, n'hésitez pas à solliciter votre formateur référent
      ou à répondre directement à ce mail.
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
