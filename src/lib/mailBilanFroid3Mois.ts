// Mail Organisme → Stagiaire : envoi du bilan à froid 3 mois après la fin de formation
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { getStagiaireDateFin, isStagiaireFormationTerminee } from "./docBuilder";

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

export function genMailBilanFroid3Mois(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx: number,
): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Stagiaire introuvable.</p>";

  const finStr = getStagiaireDateFin(s, f);
  const fin = parseDateSafe(finStr);
  const termine = isStagiaireFormationTerminee(s, f);

  // Si formation pas terminée → on affiche un bandeau d'attente
  if (!termine || !fin) {
    return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>Bilan à froid – en attente</title></head>
<body style="margin:0;padding:24px;background:#faf9f8;font-family:'Segoe UI','Segoe UI Web',Arial,sans-serif;color:#201f1e;">
<div style="max-width:900px;margin:0 auto;background:#ffffff;border:1px solid #edebe9;padding:32px;">
  <div style="border:1px solid #fbd49b;background:#fff8e7;border-radius:6px;padding:18px 22px;">
    <div style="font-weight:700;color:#8a6d1d;font-size:16px;margin-bottom:6px;">⏳ Bilan à froid non envoyé</div>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#5c4a14;">
      La formation de <strong>${escapeHtml(s.prenom || "")} ${escapeHtml(s.nom || "")}</strong> n'est pas encore terminée.
      Le mail d'envoi du bilan à froid sera adressé <strong>3 mois après la fin de formation</strong>${fin ? ` (prévue le ${escapeHtml(fmtLongDate(fin))})` : ""}.
    </p>
  </div>
</div>
</body></html>`;
  }

  // Mail envoyé 3 mois après la fin
  const envoi = new Date(fin);
  envoi.setMonth(envoi.getMonth() + 3);
  envoi.setHours(9, 32, 0, 0);

  const dateHeader = fmtDayHeader(envoi);
  const fromName = (o.nom || "Organisme de formation").toLowerCase();
  const fromInitials = initials(o.nom || "OF");
  const civilite = (s.civilite || "").toLowerCase();
  const prefix = civilite === "mme" || civilite === "madame" ? "Madame" : "Monsieur";
  const apprenantPrenom = s.prenom || "";
  const toEmail = s.email || `${(s.prenom || "stagiaire").toLowerCase()}.${(s.nom || "").toLowerCase()}@email.fr`;
  const intitule = (f.intitule || "").toUpperCase();

  const sujet = `Bilan à froid – 3 mois après votre formation ${intitule}`;

  const pj = [
    { nom: `BILAN A FROID - ${(s.nom || "").toUpperCase()}`, taille: "188 Ko", color: "#107C41" },
  ];
  const pjHtml = pj.map(p => `
      <div style="display:inline-block;vertical-align:top;border:1px solid #e1dfdd;border-radius:4px;padding:8px 14px 8px 40px;margin:0 8px 8px 0;background:#faf9f8;position:relative;font-size:12px;max-width:100%;">
        <div style="position:absolute;left:8px;top:8px;width:24px;height:24px;background:${p.color};color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:24px;border-radius:2px;">W</div>
        <div style="color:#201f1e;font-weight:600;line-height:1.3;white-space:nowrap;">${escapeHtml(p.nom)}.docx</div>
        <div style="color:#605e5c;font-size:11px;margin-top:2px;">${escapeHtml(p.taille)}</div>
      </div>`).join("");

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

  <div style="padding:14px 24px 8px;">
    ${pjHtml}
    <div style="margin-top:6px;font-size:12px;color:#605e5c;">
      ${pj.length} pièce jointe (188 Ko) &nbsp; ☁ Tout enregistrer dans OneDrive &nbsp; ⬇ Télécharger
    </div>
  </div>

  <div style="padding:18px 24px 24px;font-size:14px;line-height:1.7;color:#201f1e;">
    <p style="margin:0 0 14px;">${escapeHtml(prefix)} ${escapeHtml(apprenantPrenom)},</p>

    <p style="margin:0 0 14px;">
      Cela fait à présent <strong>3 mois</strong> que vous avez achevé la formation <strong>${escapeHtml(intitule)}</strong> au sein de notre organisme${fin ? ` (fin le ${escapeHtml(fmtLongDate(fin))})` : ""}, et nous espérons que cette expérience contribue positivement à votre activité professionnelle.
    </p>

    <p style="margin:0 0 14px;">
      Dans le cadre de notre démarche qualité <strong>Qualiopi</strong> et de l'amélioration continue de nos prestations, nous souhaiterions recueillir votre retour à froid sur :
    </p>

    <ul style="margin:0 0 14px;padding-left:22px;list-style-type:disc;list-style-position:outside;">
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">L'<strong>impact réel</strong> de la formation sur votre activité professionnelle ;</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">L'utilité concrète des <strong>compétences acquises</strong> ;</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">Votre <strong>insertion ou évolution professionnelle</strong> depuis la fin du parcours ;</li>
      <li style="display:list-item;list-style-type:disc;margin-bottom:4px;">Vos <strong>suggestions d'amélioration</strong> pour les prochaines promotions.</li>
    </ul>

    <p style="margin:0 0 14px;">
      Nous vous remercions de bien vouloir compléter le <strong>bilan à froid</strong> joint à ce mail et de nous le retourner sous <strong>15 jours</strong>. L'opération ne vous prendra que quelques minutes.
    </p>

    <p style="margin:0 0 14px;">
      Votre retour est essentiel pour faire évoluer la qualité de nos formations.
    </p>

    <p style="margin:0 0 14px;">
      Nous vous remercions par avance pour votre contribution et restons à votre disposition pour échanger si vous le souhaitez.
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
