// Mail CFA → Entreprise pour planifier une visite de suivi en entreprise
// (visite du maître d'apprentissage / suivi pédagogique en milieu professionnel).
// Style Gmail-like, identique aux autres mails du dossier.
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";

/* ----- Date helpers ----- */
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

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * Date d'envoi du mail : ~6 semaines après le début de formation, le mardi à 9h12.
 * Date proposée pour la visite : 3 semaines plus tard (un jeudi).
 */
function dateMailVisite(f: FormationInfo): { envoi: Date; visite: Date } {
  const start = parseDateSafe(f.dateDebut) || new Date();
  const baseMonday = startOfISOWeek(start);
  const envoi = addDays(baseMonday, 6 * 7 + 1); // mardi 6 semaines après
  envoi.setHours(9, 12, 0, 0);
  // Visite : 3 semaines plus tard, le jeudi
  const visite = addDays(baseMonday, 9 * 7 + 3);
  visite.setHours(14, 0, 0, 0);
  return { envoi, visite };
}

export function genMailVisiteEntrepriseCFA(
  o: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  stagiaireIdx: number,
): string {
  const s = stagiaires[stagiaireIdx];
  if (!s) return "<p>Apprenti introuvable.</p>";

  const { envoi, visite } = dateMailVisite(f);
  const dateLong = fmtLong(envoi);
  const heure = fmtTime(envoi);
  const dateVisiteLong = fmtLong(visite);
  const heureVisite = fmtTime(visite);
  const finVisite = new Date(visite); finVisite.setHours(15, 30, 0, 0);

  const fromName = o.nom || "Centre de Formation";
  const fromEmail = o.email || `contact@${(o.nom || "cfa").toLowerCase().replace(/[^a-z0-9]/g, "")}.fr`;
  const entreprise = s.entreprise || "Entreprise d'accueil";
  const responsable = s.responsableEntreprise || "Maître d'apprentissage";
  const posteResp = s.poste || "Maître d'apprentissage";
  const adrEntreprise = s.adresseEntreprise || "";

  // Email professionnel reconstitué de manière déterministe
  const slugEntreprise = (s.entreprise || "entreprise").toLowerCase().replace(/[^a-z0-9]+/g, "");
  const slugResp = (responsable || "contact").toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");
  const toEmail = `${slugResp || "contact"}@${slugEntreprise || "entreprise"}.fr`;

  const apprentiNom = `${s.prenom || ""} ${s.nom || ""}`.trim();
  const civiliteResp = "Madame, Monsieur";

  const sujet = `Visite de suivi en entreprise — ${apprentiNom} (apprenti·e ${escapeHtml(f.intitule || "")})`;

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(sujet)}</title><style>body{margin:0;padding:0;background:#ffffff}.mail-shell{width:760px;max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #dadce0;border-radius:6px;overflow:hidden;font-family:'Google Sans','Segoe UI',Roboto,Arial,sans-serif;color:#202124;box-sizing:border-box}.mail-body{padding:22px 24px 24px;font-size:14px;line-height:1.62;color:#202124}.mail-meta{font-size:13px;line-height:1.45;color:#5f6368}.keep{page-break-inside:avoid;break-inside:avoid}@media print{.mail-shell{width:100%;max-width:100%;border-radius:0}.mail-body{padding:20px 24px}}</style></head>
<body>
<div class="mail-shell">

  <div style="background:#f1f3f4;padding:10px 16px;border-bottom:1px solid #dadce0;font-size:13px;color:#5f6368;">
    <span style="color:#d93025;font-weight:700;">M</span> Gmail &nbsp;·&nbsp; Messages envoyés
  </div>

  <div class="keep" style="padding:18px 24px 8px;border-bottom:1px solid #f1f3f4;">
    <div style="font-size:20px;font-weight:500;color:#202124;line-height:1.3;">${escapeHtml(sujet)}</div>
    <div style="margin-top:6px;display:inline-block;background:#fef7e0;color:#b06000;font-size:11px;font-weight:600;padding:2px 8px;border-radius:10px;">Suivi alternance</div>
  </div>

  <table role="presentation" cellspacing="0" cellpadding="0" class="keep" style="width:100%;border-collapse:collapse;border-bottom:1px solid #f1f3f4;">
    <tr>
      <td style="width:56px;padding:14px 0 14px 24px;vertical-align:top;">
        <div style="width:40px;height:40px;border-radius:50%;background:#1a73e8;color:#fff;text-align:center;line-height:40px;font-weight:700;font-size:16px;">${escapeHtml((o.nom || "C")[0].toUpperCase())}</div>
      </td>
      <td class="mail-meta" style="padding:14px 24px 14px 8px;vertical-align:top;">
        <div><strong style="color:#202124;">${escapeHtml(fromName)}</strong> <span style="color:#5f6368;">&lt;${escapeHtml(fromEmail)}&gt;</span></div>
        <div style="color:#5f6368;">À : <strong style="color:#202124;">${escapeHtml(responsable)}</strong> &lt;${escapeHtml(toEmail)}&gt;</div>
        ${s.email ? `<div style="color:#5f6368;">Cc : <strong style="color:#202124;">${escapeHtml(apprentiNom)}</strong> &lt;${escapeHtml(s.email)}&gt;</div>` : ""}
        <div style="color:#5f6368;">${escapeHtml(dateLong)} à ${escapeHtml(heure)}</div>
      </td>
    </tr>
  </table>

  <div class="mail-body">
    <p style="margin:0 0 14px;">${escapeHtml(civiliteResp)},</p>

    <p style="margin:0 0 14px;">
      Dans le cadre du suivi pédagogique de notre apprenti·e
      <strong>${escapeHtml(apprentiNom)}</strong>, inscrit·e en formation
      <strong>${escapeHtml(f.intitule || "")}</strong> au sein de notre CFA,
      je me permets de vous contacter afin de planifier la
      <strong>visite de suivi en entreprise</strong> prévue dans le cadre de la convention
      tripartite (CFA / Entreprise / Apprenti·e).
    </p>

    <p style="margin:0 0 14px;">
      Cette visite, d'une durée d'environ <strong>1h30</strong>, a pour objectifs :
    </p>
    <ul style="margin:0 0 14px;padding-left:22px;">
      <li>Faire le point avec vous sur l'<strong>intégration</strong> et les <strong>missions confiées</strong> à l'apprenti·e ;</li>
      <li>Évaluer la <strong>progression des compétences</strong> en lien avec le référentiel de la formation ;</li>
      <li>Échanger sur l'<strong>articulation centre / entreprise</strong> et l'avancement du livret d'apprentissage ;</li>
      <li>Recueillir vos observations en vue du prochain <strong>bilan intermédiaire</strong>.</li>
    </ul>

    <div style="margin:18px 0;padding:14px 16px;background:#e8f0fe;border-left:3px solid #1a73e8;border-radius:4px;font-size:13px;line-height:1.7;">
      <strong style="color:#1967d2;">Proposition de rendez-vous</strong><br>
      📅 <strong>${escapeHtml(dateVisiteLong)}</strong><br>
      🕑 De <strong>${escapeHtml(heureVisite)}</strong> à <strong>${escapeHtml(fmtTime(finVisite))}</strong><br>
      📍 ${escapeHtml(adrEntreprise || `Sur site — ${entreprise}`)}<br>
      👥 Présents : ${escapeHtml(responsable)} (${escapeHtml(posteResp)}), ${escapeHtml(apprentiNom)} (apprenti·e), ${escapeHtml(o.dirigeant || "Référent CFA")} (CFA)
    </div>

    <p style="margin:14px 0;">
      Si ce créneau ne vous convient pas, n'hésitez pas à me proposer
      <strong>2 ou 3 disponibilités</strong> sur les semaines suivantes :
      je m'adapterai à votre organisation.
    </p>

    <p style="margin:14px 0;">
      Je vous transmettrai, en amont de la visite, la <strong>grille de suivi des
      compétences</strong> ainsi qu'un <strong>extrait du livret d'apprentissage</strong>
      pour préparer ensemble nos échanges.
    </p>

    <p style="margin:14px 0;">
      Je reste à votre entière disposition pour toute question, et vous remercie
      par avance pour votre accueil et votre implication dans la réussite du
      parcours de ${escapeHtml(s.prenom || "")}.
    </p>

    <p style="margin:18px 0 4px;">Bien cordialement,</p>
    <p style="margin:0 0 14px;"><strong>${escapeHtml(o.dirigeant || o.nom || "L'équipe pédagogique")}</strong><br>
      <span style="color:#5f6368;font-size:13px;">Référent·e pédagogique CFA — ${escapeHtml(o.nom || "")}</span></p>

    <hr style="border:none;border-top:1px solid #e8eaed;margin:20px 0;">
    <div style="font-size:11px;color:#5f6368;line-height:1.5;">
      ${escapeHtml(o.nom || "")} — ${escapeHtml(o.adresse || "")} ${escapeHtml(o.codePostal || "")} ${escapeHtml(o.ville || "")}<br>
      ${o.telephone ? `Tél : ${escapeHtml(o.telephone)} — ` : ""}${escapeHtml(o.email || "")}<br>
      SIRET : ${escapeHtml(o.siret || "")} — N° NDA : ${escapeHtml(o.nda || "")}<br>
      Mail envoyé le ${escapeHtml(dateLong)}.
    </div>
  </div>
</div>
</body></html>`;
}
