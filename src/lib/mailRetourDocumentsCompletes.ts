// Mail Stagiaire → Organisme : retour des documents complétés (évaluation préalable).
// Style Outlook (Microsoft 365), inspiré du visuel de référence fourni par l'utilisateur.
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";

/* ----- Date helpers ----- */
function parseDateSafe(s?: string): Date | null {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "JB";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Date d'envoi du mail retour : ~13 jours avant le début de formation,
 * à 09h54 (le lendemain de l'envoi par l'organisme).
 */
function dateMailRetour(f: FormationInfo): Date {
  const start = parseDateSafe(f.dateDebut) || new Date();
  const envoi = addDays(start, -13);
  envoi.setHours(9, 54, 0, 0);
  return envoi;
}

export function genMailRetourDocumentsCompletes(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx: number,
): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Stagiaire introuvable.</p>";

  const envoi = dateMailRetour(f);
  const dateHeader = fmtDayHeader(envoi);

  const civilite = (s.civilite || "").toLowerCase();
  const civPrefix = civilite === "mme" || civilite === "madame" ? "Madame" : "Monsieur";
  const apprenantPrenom = s.prenom || "";
  const apprenantNom = s.nom || "";
  const apprenantNomComplet = `${civPrefix} ${apprenantPrenom} ${apprenantNom}`.trim();
  const fromEmail = s.email || `${(s.prenom || "stagiaire").toLowerCase()}.${(s.nom || "").toLowerCase()}@email.fr`;
  const fromInitials = initials(`${apprenantPrenom} ${apprenantNom}`);

  const sujet = `Retour des documents complétés`;

  // Pièces jointes (3 documents — sans le programme)
  const pj = [
    { nom: `TEST DE POSITIONNEMENT - ${apprenantNom.toUpperCase()}`, taille: "2 Mo", color: "#107C41" },
    { nom: `TEST DE CULTURE GÉNÉRALE - ${apprenantNom.toUpperCase()}`, taille: "13 Ko", color: "#107C41" },
    { nom: `EVALUATION DES BESOINS - ${apprenantNom.toUpperCase()}`, taille: "277 Ko", color: "#107C41" },
  ];

  const pjHtml = pj
    .map(
      (p) => `
      <div style="display:inline-block;vertical-align:top;border:1px solid #e1dfdd;border-radius:4px;padding:8px 28px 8px 38px;margin:0 8px 8px 0;background:#faf9f8;min-width:170px;position:relative;font-size:12px;">
        <div style="position:absolute;left:8px;top:8px;width:22px;height:22px;background:${p.color};color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:2px;">W</div>
        <div style="color:#201f1e;font-weight:600;line-height:1.3;max-width:170px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(p.nom)}</div>
        <div style="color:#605e5c;font-size:11px;margin-top:2px;">${escapeHtml(p.taille)}</div>
      </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(sujet)}</title></head>
<body style="margin:0;padding:24px;background:#faf9f8;font-family:'Segoe UI','Segoe UI Web',Arial,sans-serif;color:#201f1e;">
<div style="max-width:900px;margin:0 auto;background:#ffffff;border:1px solid #edebe9;">

  <!-- Barre actions Outlook -->
  <div style="background:#ffffff;border-bottom:1px solid #edebe9;padding:8px 16px;font-size:13px;color:#323130;display:flex;align-items:center;gap:18px;flex-wrap:wrap;">
    <span style="color:#a4262c;">↩ Répondre à tous</span>
    <span>✉ Lu / non lu</span>
    <span style="color:#a4262c;">⚑ Marquer / démarquer</span>
    <span>⊞</span>
    <span>👥 Découvrez des groupes</span>
    <span style="color:#a19f9d;">↶ Annuler</span>
    <span style="margin-left:auto;">⋯</span>
  </div>

  <!-- Sujet -->
  <div style="padding:18px 24px;border-bottom:1px solid #edebe9;font-size:18px;font-weight:600;color:#201f1e;">
    ${escapeHtml(sujet)}
  </div>

  <!-- Expéditeur (le stagiaire) -->
  <div style="padding:14px 24px;display:flex;align-items:flex-start;gap:14px;border-bottom:1px solid #edebe9;">
    <div style="width:40px;height:40px;border-radius:50%;background:#5b5fc7;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;flex-shrink:0;">
      ${escapeHtml(fromInitials)}
    </div>
    <div style="flex:1;font-size:13px;line-height:1.5;">
      <div style="font-weight:600;color:#201f1e;">${escapeHtml(fromEmail)}</div>
      <div style="color:#605e5c;">À : vous</div>
    </div>
    <div style="font-size:12px;color:#605e5c;white-space:nowrap;">${escapeHtml(dateHeader)}</div>
  </div>

  <!-- Pièces jointes -->
  <div style="padding:14px 24px 8px;">
    ${pjHtml}
    <div style="margin-top:6px;font-size:12px;color:#605e5c;">
      ${pj.length} pièces jointes (2 Mo) &nbsp; ☁ Tout enregistrer dans OneDrive &nbsp; ⬇ Télécharger tout
    </div>
  </div>

  <!-- Corps -->
  <div style="padding:18px 24px 24px;font-size:14px;line-height:1.7;color:#201f1e;">
    <p style="margin:0 0 14px;">Madame, Monsieur,</p>

    <p style="margin:0 0 14px;">
      Suite à votre envoi, vous trouverez en pièces jointes l'ensemble des documents complétés, à savoir :
    </p>

    <ul style="margin:0 0 14px;padding-left:22px;">
      <li>L'évaluation des besoins ;</li>
      <li>Le test de culture générale ;</li>
      <li>Le test de positionnement.</li>
    </ul>

    <p style="margin:0 0 14px;">
      Je vous remercie pour la transmission du programme de formation, dont j'ai pris connaissance.
    </p>

    <p style="margin:0 0 14px;">
      Je reste à votre disposition pour tout complément d'information et me tiens dans l'attente de votre retour concernant la suite de ma candidature.
    </p>

    <p style="margin:18px 0 0;">Cordialement,<br>${escapeHtml(apprenantNomComplet)}</p>

    <!-- Boutons Outlook -->
    <div style="margin-top:26px;">
      <span style="display:inline-block;border:1px solid #d1d1d1;border-radius:2px;padding:6px 16px;margin-right:8px;font-size:13px;color:#a4262c;">↩ Répondre</span>
      <span style="display:inline-block;border:1px solid #d1d1d1;border-radius:2px;padding:6px 16px;font-size:13px;color:#0078d4;">→ Transférer</span>
    </div>
  </div>
</div>
</body></html>`;
}
