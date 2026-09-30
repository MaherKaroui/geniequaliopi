// Book Qualiopi CFA — version spécialisée du Book pour les CFA (audit initial nouvel entrant).
// Fiche mémo + guide de préparation : 33 indicateurs, 7 critères (décret n° 2026-728),
// avec pour chacun le niveau attendu V9, le script "ce qu'il faut dire", les preuves
// (croisées avec les documents générés par l'application), et les vigilances éventuelles.

import { typeAuditEffectif } from "./typeAudit";
import { OrganismeInfo, FormationInfo, StagiaireInfo, DocEntry } from "@/types/qualiopi";
import { INDICATEURS_CFA, CRITERES_CFA, TypeAuditCFA, getTypeAuditLabel } from "./qualiopiReferenceCFA";

export function generateBookQualiopiCFA(
  org: OrganismeInfo,
  formations: FormationInfo[],
  stagiaires: StagiaireInfo[],
  catalog: DocEntry[],
  typeAudit: TypeAuditCFA = typeAuditEffectif(org)
): string {
  const isNE = typeAudit === 'initial';
  const today = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  const annee = formations[0]?.dateDebut ? new Date(formations[0].dateDebut).getFullYear() : new Date().getFullYear();

  const styles = `<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a2e;line-height:1.55;font-size:13px}
.page{max-width:860px;margin:0 auto;padding:40px;min-height:100vh}
.page-break{page-break-after:always}
.cover{display:flex;flex-direction:column;justify-content:center;min-height:90vh;text-align:center;background:linear-gradient(135deg,#0b2545 0%,#1d4ed8 100%);color:white;border-radius:18px;padding:60px 40px}
.cover h1{font-size:46px;font-weight:800;letter-spacing:2px;margin-bottom:8px}
.cover .badge-cfa{display:inline-block;background:#facc15;color:#0b2545;padding:6px 18px;border-radius:20px;font-weight:700;font-size:13px;margin-bottom:18px;letter-spacing:1px}
.cover .subtitle{font-size:18px;opacity:.9;margin-bottom:14px}
.cover .org{background:rgba(255,255,255,.12);padding:14px 26px;border-radius:12px;margin-top:24px;display:inline-block}
.sec-title{font-size:22px;color:#0b2545;border-bottom:3px solid #1d4ed8;padding-bottom:10px;margin:24px 0 16px}
.crit-header{background:linear-gradient(135deg,#0b2545,#1d4ed8);color:white;padding:18px 22px;border-radius:12px;margin:18px 0 14px}
.crit-header h2{font-size:18px}
.crit-header p{font-size:12px;opacity:.85;margin-top:4px}
.ind{border:1px solid #e0e7ff;border-radius:12px;margin:14px 0;overflow:hidden;page-break-inside:avoid}
.ind .num{background:#1d4ed8;color:white;padding:10px 16px;font-weight:700;font-size:13px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.ind .num .tag{background:rgba(255,255,255,.2);padding:2px 8px;border-radius:8px;font-size:11px}
.ind .num .tag.warn{background:#facc15;color:#0b2545}
.ind .num .tag.ne{background:#fb923c;color:white}
.ind .body{padding:16px}
.ind h3{font-size:13px;color:#1d4ed8;margin:10px 0 4px}
.box{background:#f1f5f9;border-left:4px solid #1d4ed8;padding:10px 14px;border-radius:8px;margin:6px 0;font-size:12.5px}
.box.warn{border-left-color:#f59e0b;background:#fffbeb}
.box.script{background:#eff6ff;border-left-color:#3b82f6}
ul{margin:6px 0 6px 20px}
li{margin:3px 0;font-size:12.5px}
.preuve-on{color:#16a34a;font-weight:600}
.preuve-off{color:#9ca3af;font-style:italic}
.toc-item{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:12.5px}
.toc-num{background:#1d4ed8;color:white;width:28px;height:28px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;flex-shrink:0}
@media print{.page{padding:24px}.cover{min-height:100vh}}
</style>`;

  // Index docs by indicator
  const docsByInd = new Map<number, string[]>();
  catalog.forEach(d => {
    if (!docsByInd.has(d.indicateur)) docsByInd.set(d.indicateur, []);
    docsByInd.get(d.indicateur)!.push(d.nom);
  });

  let html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">${styles}</head><body>`;

  // Cover
  const logo = org.logoUrl ? `<div style="margin-bottom:18px"><img src="${org.logoUrl}" alt="Logo" style="max-height:90px;max-width:240px;object-fit:contain"/></div>` : "";
  html += `<div class="page"><div class="cover">${logo}<div class="badge-cfa">CFA · ${getTypeAuditLabel(typeAudit)}</div><h1>BOOK QUALIOPI CFA</h1><div class="subtitle">Référentiel national qualité (décret n° 2026-728, en vigueur au 01/11/2026) — 7 critères / 33 indicateurs — guide de lecture V9</div><div class="subtitle" style="font-size:14px;opacity:.75">« Quoi dire à l'auditeur · Quels documents présenter »</div><div class="org"><strong>${org.nom}</strong><br>SIRET ${org.siret} · NDA ${org.nda}</div><div style="margin-top:30px;font-size:13px;opacity:.7">Édition : ${today} · Année ${annee}</div></div></div><div class="page-break"></div>`;

  // Présentation OF / Formations / Stagiaires
  const fmt = (d?: string) => d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }) : "—";
  html += `<div class="page"><h1 class="sec-title">Présentation de l'organisme et du périmètre audité</h1>
    <h3 style="color:#1d4ed8;margin-top:14px">Organisme de formation</h3>
    <div class="box"><strong>${org.nom}</strong><br>
      SIRET : ${org.siret} · NDA : ${org.nda}<br>
      ${org.adresse || ""} ${org.codePostal || ""} ${org.ville || ""}<br>
      ${org.telephone ? `Tél. : ${org.telephone} · ` : ""}${org.email ? `Email : ${org.email}` : ""}<br>
      ${org.siteWeb ? `Site : ${org.siteWeb}<br>` : ""}
      Dirigeant : ${org.dirigeant || "—"} · Responsable pédagogique : ${org.responsablePedagogique || "—"}<br>
      Référent handicap : ${org.referentHandicap || "—"} · Référent qualité : ${org.referentQualite || "—"}<br>
      Domaines : ${org.domainesFormation || "—"}<br>
      Types d'actions : ${(org.typesActions || []).join(", ") || "—"}<br>
      Certifications : ${org.certifications || "—"}
    </div>
    <h3 style="color:#1d4ed8;margin-top:18px">Formation(s) auditée(s) (${formations.length})</h3>
    ${formations.map(f => `<div class="box"><strong>${f.intitule || "—"}</strong>${f.codeRNCP ? ` <span style="color:#64748b">(${f.codeRNCP})</span>` : ""}<br>
      Durée : ${f.duree || "—"} · Modalités : ${f.modalites || "—"}<br>
      Du ${fmt(f.dateDebut)} au ${fmt(f.dateFin)} · Lieu : ${f.lieu || "—"}<br>
      Public : ${f.publicVise || "—"} · Tarif : ${f.tarif || "—"}<br>
      Formateur : ${f.formateur || "—"}${f.rythmeAlternance ? `<br>Rythme alternance : ${f.rythmeAlternance}` : ""}
    </div>`).join("")}
    <h3 style="color:#1d4ed8;margin-top:18px">Apprenants (${stagiaires.length})</h3>
    <table style="width:100%;border-collapse:collapse;font-size:11.5px"><thead><tr style="background:#1d4ed8;color:white"><th style="padding:6px;text-align:left">Apprenant</th><th style="padding:6px;text-align:left">Entreprise</th><th style="padding:6px;text-align:left">Période</th><th style="padding:6px;text-align:left">RQTH</th></tr></thead><tbody>
    ${stagiaires.map((s, i) => `<tr style="background:${i%2?'#f1f5f9':'#fff'}"><td style="padding:6px;border-bottom:1px solid #e2e8f0">${s.civilite||""} ${s.prenom||""} ${s.nom||""}</td><td style="padding:6px;border-bottom:1px solid #e2e8f0">${s.entreprise || "—"}</td><td style="padding:6px;border-bottom:1px solid #e2e8f0">${fmt(s.dateDebutFormation)} → ${fmt(s.dateFinFormation)}</td><td style="padding:6px;border-bottom:1px solid #e2e8f0">${s.rqth === "oui" ? "Oui" : "Non"}</td></tr>`).join("")}
    </tbody></table>
  </div><div class="page-break"></div>`;

  // Mode d'emploi
  html += `<div class="page"><h1 class="sec-title">Comment utiliser ce Book</h1><p style="margin:10px 0">Pour chaque indicateur, vous trouverez : (1) le niveau attendu par l'auditeur selon le Guide V9, (2) un script de ce qu'il faut dire, (3) la liste des documents à présenter (croisée avec les documents générés par l'application), et (4) les points de vigilance.</p>
  ${isNE ? `<div class="box warn"><strong>Spécificité nouvel entrant.</strong> Étant en première année, les indicateurs <strong>${INDICATEURS_CFA.filter(i => i.nouvelEntrant).map(i => i.numero).join(", ").replace(/, (\d+)$/, " et $1")}</strong> font l'objet de modalités adaptées : à l'audit initial, l'auditeur vérifie la <strong>formalisation</strong> du processus ; la mise en œuvre effective sera contrôlée à l'audit de surveillance.</div>` : `<div class="box warn"><strong>${getTypeAuditLabel(typeAudit)}.</strong> Tous les indicateurs font l'objet d'une vérification de la <strong>mise en œuvre effective</strong> avec preuves de résultats (taux, satisfaction, insertion, amélioration continue).</div>`}
  <div class="box"><strong>Pondération.</strong> Les indicateurs <strong>${INDICATEURS_CFA.filter(i => i.ponderable).map(i => i.numero).join(", ").replace(/, (\d+)$/, " et $1")}</strong> peuvent donner lieu à une NC mineure. Les autres entraînent une NC majeure en cas de non-respect.</div>
  <div class="box script"><strong>Principe d'or :</strong> la conformité repose sur l'appréciation de l'auditeur quant à la mise en œuvre, pas sur la simple présence d'un document. Parlez d'abord de votre processus, puis montrez la preuve.</div>
  </div><div class="page-break"></div>`;

  // Sommaire
  html += `<div class="page"><h1 class="sec-title">Sommaire</h1>`;
  Object.entries(CRITERES_CFA).forEach(([num, titre]) => {
    html += `<div class="toc-item"><span class="toc-num">${num}</span><span><strong>Critère ${num}</strong> — ${titre}</span></div>`;
  });
  html += `</div><div class="page-break"></div>`;

  // Per critère & indicateur
  Object.entries(CRITERES_CFA).forEach(([cNum, cTitre]) => {
    const inds = INDICATEURS_CFA.filter(i => i.critere === parseInt(cNum));
    html += `<div class="page"><div class="crit-header"><h2>CRITÈRE ${cNum}</h2><p>${cTitre}</p></div>`;
    inds.forEach(ind => {
      const docs = docsByInd.get(ind.numero) || [];
      const tags = [
        isNE && ind.nouvelEntrant ? `<span class="tag ne">NOUVEL ENTRANT</span>` : "",
        ind.ponderable ? `<span class="tag warn">pondérable</span>` : `<span class="tag">NC majeure</span>`,
      ].filter(Boolean).join(" ");
      html += `<div class="ind"><div class="num"><span>INDICATEUR ${ind.numero}</span>${tags}</div><div class="body">
        <p style="font-style:italic;color:#475569;margin-bottom:8px">${ind.titre}</p>
        <h3>Niveau attendu (Guide V9)</h3><div class="box">${ind.niveauAttendu}</div>
        <h3>✅ Ce qu'il faut dire</h3><div class="box script">« ${ind.ceQuIlFautDire} »</div>
        <h3>📁 Documents à présenter</h3>
        <ul>${ind.preuves.map(p => {
          const matched = docs.find(d => d.toLowerCase().includes(p.toLowerCase().slice(0, 12)) || p.toLowerCase().includes(d.toLowerCase().slice(0, 12)));
          return `<li><span class="${matched ? "preuve-on" : "preuve-off"}">${matched ? "✓" : "○"}</span> ${p}${matched ? ` <span style="color:#16a34a;font-size:11px">(généré : ${matched})</span>` : ""}</li>`;
        }).join("")}</ul>
        ${docs.length > 0 ? `<h3>Documents générés par l'application pour cet indicateur (${docs.length})</h3><ul>${docs.map(d => `<li class="preuve-on">✓ ${d}</li>`).join("")}</ul>` : `<div class="box warn">Aucun document généré automatiquement pour cet indicateur — à fournir manuellement.</div>`}
        ${ind.vigilance ? `<h3>⚠ Vigilance</h3><div class="box warn">${ind.vigilance}</div>` : ""}
      </div></div>`;
    });
    html += `</div><div class="page-break"></div>`;
  });

  // Footer
  html += `<div class="page"><p style="text-align:center;font-size:11px;color:#64748b;margin-top:40px"><strong>${org.nom}</strong> · SIRET ${org.siret} · NDA ${org.nda} · Édition ${today}</p></div></body></html>`;
  return html;
}
