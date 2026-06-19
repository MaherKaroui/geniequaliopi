// Guide audit CFA — « Quoi dire à l'auditeur » — HTML (export Word/PDF)
// Réplique le DOCX Dreamers Team : 1 fiche par indicateur avec niveau attendu,
// script, documents à présenter et points de vigilance.

import { OrganismeInfo, FormationInfo, DocEntry } from "@/types/qualiopi";
import { INDICATEURS_CFA, CRITERES_CFA, getPonderationLabel } from "./qualiopiReferenceCFA";

export function generateGuideAuditCFA(
  org: OrganismeInfo,
  formations: FormationInfo[],
  catalog: DocEntry[]
): string {
  const today = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  const docsByInd = new Map<number, string[]>();
  catalog.forEach(d => {
    if (!docsByInd.has(d.indicateur)) docsByInd.set(d.indicateur, []);
    docsByInd.get(d.indicateur)!.push(d.nom);
  });

  const styles = `<style>
body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a2e;line-height:1.55;font-size:13px;max-width:900px;margin:0 auto;padding:30px}
h1.title{font-size:30px;color:#0b2545;text-align:center;margin-bottom:6px}
.sub{text-align:center;color:#475569;font-size:14px;margin-bottom:30px}
.intro{background:#eff6ff;border-left:4px solid #1d4ed8;padding:16px;border-radius:8px;margin-bottom:24px}
h2.crit{font-size:20px;color:white;background:linear-gradient(135deg,#0b2545,#1d4ed8);padding:14px 20px;border-radius:10px;margin-top:34px}
h3.ind{font-size:15px;color:#0b2545;margin-top:22px;border-bottom:2px solid #1d4ed8;padding-bottom:6px}
.tag{display:inline-block;font-size:11px;padding:2px 10px;border-radius:10px;margin-left:6px;font-weight:600;vertical-align:middle}
.tag.ne{background:#fb923c;color:white}
.tag.maj{background:#dc2626;color:white}
.tag.min{background:#f59e0b;color:white}
.lvl{background:#f1f5f9;padding:10px 14px;border-radius:8px;margin:8px 0;font-size:12.5px}
.dire{background:#eff6ff;border-left:4px solid #3b82f6;padding:10px 14px;border-radius:8px;margin:8px 0;font-style:italic}
.docs{margin:8px 0}
.docs li{margin:3px 0}
.vigilance{background:#fffbeb;border-left:4px solid #f59e0b;padding:10px 14px;border-radius:8px;margin:8px 0;font-size:12.5px}
.footer{margin-top:50px;text-align:center;color:#64748b;font-size:11px;border-top:1px solid #e2e8f0;padding-top:16px}
.preuve-ok{color:#16a34a;font-weight:600}
</style>`;

  let html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${styles}</head><body>`;
  html += `<h1 class="title">GUIDE DE PRÉPARATION À L'AUDIT QUALIOPI</h1>
  <div class="sub">CFA — ${org.nom} · Audit initial · Nouvel entrant<br>Référentiel National Qualité V9 — 7 critères / 32 indicateurs · Édition ${today}</div>
  <div class="intro">
    <strong>Comment utiliser ce guide.</strong> Pour chaque indicateur, vous trouverez : (1) le niveau attendu par l'auditeur selon le Guide V9, (2) un script de ce qu'il faut dire, (3) la liste des documents à présenter (croisée avec ceux générés par l'application), et (4) les points de vigilance.
    <br><br><strong>Spécificité nouvel entrant.</strong> Pour les indicateurs 2, 3, 11, 13, 14, 19, 22, 24, 25, 26 et 32, à l'audit initial l'auditeur vérifie la <strong>formalisation</strong> du processus ; la mise en œuvre effective est contrôlée à la surveillance.
    <br><br><strong>Principe d'or :</strong> la conformité repose sur l'appréciation de l'auditeur quant à la mise en œuvre, pas sur la simple présence d'un document. Parlez de votre processus, puis montrez la preuve.
  </div>`;

  Object.entries(CRITERES_CFA).forEach(([cNum, cTitre]) => {
    html += `<h2 class="crit">Critère ${cNum} — ${cTitre}</h2>`;
    INDICATEURS_CFA.filter(i => i.critere === parseInt(cNum)).forEach(ind => {
      const docs = docsByInd.get(ind.numero) || [];
      const tagsHtml = [
        ind.nouvelEntrant ? `<span class="tag ne">NOUVEL ENTRANT</span>` : "",
        ind.ponderable ? `<span class="tag min">pondérable</span>` : `<span class="tag maj">NC majeure</span>`,
      ].filter(Boolean).join("");
      html += `<h3 class="ind">Indicateur ${ind.numero} — ${ind.titre} ${tagsHtml}</h3>
      <p style="color:#475569;font-size:12px"><em>${getPonderationLabel(ind)}</em></p>
      <div class="lvl"><strong>Niveau attendu :</strong> ${ind.niveauAttendu}</div>
      <div class="dire"><strong>✅ Ce qu'il faut dire :</strong> « ${ind.ceQuIlFautDire} »</div>
      <p><strong>📁 Documents à présenter</strong></p>
      <ul class="docs">${ind.preuves.map(p => `<li>${p}</li>`).join("")}</ul>
      ${docs.length > 0 ? `<p><strong>Documents générés par l'application (${docs.length}) :</strong></p><ul class="docs">${docs.map(d => `<li class="preuve-ok">✓ ${d}</li>`).join("")}</ul>` : ""}
      ${ind.vigilance ? `<div class="vigilance">⚠ <strong>Point de vigilance :</strong> ${ind.vigilance}</div>` : ""}`;
    });
  });

  html += `<div class="footer"><strong>${org.nom}</strong> · SIRET ${org.siret} · NDA ${org.nda} · Édition ${today}</div></body></html>`;
  return html;
}
