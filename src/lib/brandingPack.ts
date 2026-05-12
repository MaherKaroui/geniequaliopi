// Branding Auto Pack — génère charte graphique + signature email + cartes de visite
// à partir du logo et de la couleur principale de l'organisme.

import { downloadAsPdf } from "./pdfExport";
import { OrganismeInfo } from "@/types/qualiopi";

// HSL helpers ----------------------------------------------------------------
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
function hslStr(h: number, s: number, l: number) { return `hsl(${h.toFixed(0)},${s.toFixed(0)}%,${l.toFixed(0)}%)`; }

function buildPalette(primaryHex: string) {
  const { h, s } = hexToHsl(primaryHex);
  return {
    primary: primaryHex,
    primaryLight: hslStr(h, s, 92),
    primaryDark: hslStr(h, s, 25),
    accent: hslStr((h + 30) % 360, Math.max(40, s - 10), 55),
    neutral900: "#1a1a1a", neutral700: "#4a4a4a", neutral400: "#9a9a9a",
    neutral200: "#e5e5e5", neutral100: "#f5f5f5",
  };
}

// === 1. CHARTE GRAPHIQUE PDF ================================================
export function buildCharteGraphiqueHtml(org: OrganismeInfo, primaryHex: string, logoDataUrl?: string): string {
  const p = buildPalette(primaryHex);
  const today = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/>
<style>
body{font-family:'Helvetica Neue',Arial,sans-serif;color:${p.neutral900};margin:0;line-height:1.5}
.cover{height:1100px;background:linear-gradient(135deg,${p.primary} 0%,${p.primaryDark} 100%);color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:60px}
.cover h1{font-size:56px;font-weight:300;letter-spacing:-1px;margin:20px 0 10px}
.cover h2{font-size:24px;font-weight:300;opacity:.9;margin:0}
.cover .meta{margin-top:80px;font-size:13px;opacity:.7;letter-spacing:2px;text-transform:uppercase}
.section{padding:60px 70px;page-break-before:always}
.section h2{font-size:36px;font-weight:300;color:${p.primary};margin:0 0 8px;border-bottom:3px solid ${p.primary};padding-bottom:10px;display:inline-block}
.section .lead{color:${p.neutral700};font-size:14px;margin:8px 0 30px}
.swatches{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:30px}
.swatch{border-radius:8px;overflow:hidden;border:1px solid ${p.neutral200}}
.swatch .color{height:140px}
.swatch .info{padding:12px;background:#fff}
.swatch .name{font-weight:600;font-size:13px;margin-bottom:4px}
.swatch .code{font-size:11px;color:${p.neutral700};font-family:monospace}
.fonts{margin-top:30px}
.font-block{padding:25px;border-left:4px solid ${p.primary};background:${p.neutral100};margin-bottom:15px;border-radius:0 8px 8px 0}
.font-block .label{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:${p.primary};font-weight:600}
.font-block .sample{font-size:32px;margin-top:8px}
.logo-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:30px}
.logo-cell{border:1px solid ${p.neutral200};border-radius:8px;padding:30px;text-align:center;min-height:160px;display:flex;flex-direction:column;justify-content:center}
.logo-cell.dark{background:${p.neutral900}}
.logo-cell.color{background:${p.primary}}
.logo-cell img{max-width:100%;max-height:80px;object-fit:contain;margin-bottom:10px}
.logo-cell .lbl{font-size:11px;color:${p.neutral400};text-transform:uppercase;letter-spacing:1.5px}
.dont{color:#c0392b}
.do{color:#27ae60}
table{width:100%;border-collapse:collapse;margin-top:20px}
td,th{padding:10px 14px;text-align:left;border-bottom:1px solid ${p.neutral200};font-size:13px}
th{background:${p.primaryLight};color:${p.primaryDark};font-weight:600}
.footer{position:fixed;bottom:20px;left:0;right:0;text-align:center;font-size:10px;color:${p.neutral400}}
</style></head><body>

<div class="cover">
  ${logoDataUrl ? `<img src="${logoDataUrl}" alt="logo" style="max-height:120px;max-width:300px;background:rgba(255,255,255,.1);padding:20px;border-radius:12px"/>` : ""}
  <h1>${org.nom || "Organisme"}</h1>
  <h2>Charte graphique</h2>
  <div class="meta">Version 1.0 · ${today}</div>
</div>

<div class="section">
  <h2>1. Identité</h2>
  <p class="lead">Notre identité visuelle reflète notre engagement qualité et notre expertise pédagogique.</p>
  <p style="font-size:14px;color:${p.neutral700};line-height:1.7">
    <strong>${org.nom || "Notre organisme"}</strong> ${org.nda ? `(NDA ${org.nda})` : ""} est un organisme de formation professionnelle certifié Qualiopi.
    Notre charte graphique garantit une communication cohérente sur l'ensemble de nos supports : documents pédagogiques,
    contrats, conventions, sites web, réseaux sociaux et signalétique.
  </p>
</div>

<div class="section">
  <h2>2. Palette colorimétrique</h2>
  <p class="lead">Couleur primaire et déclinaisons. Toujours respecter les codes ci-dessous pour assurer la reconnaissance.</p>
  <div class="swatches">
    <div class="swatch"><div class="color" style="background:${p.primary}"></div><div class="info"><div class="name">Primaire</div><div class="code">${p.primary.toUpperCase()}</div></div></div>
    <div class="swatch"><div class="color" style="background:${p.primaryDark}"></div><div class="info"><div class="name">Primaire foncé</div><div class="code">${p.primaryDark}</div></div></div>
    <div class="swatch"><div class="color" style="background:${p.primaryLight}"></div><div class="info"><div class="name">Primaire clair</div><div class="code">${p.primaryLight}</div></div></div>
    <div class="swatch"><div class="color" style="background:${p.accent}"></div><div class="info"><div class="name">Accent</div><div class="code">${p.accent}</div></div></div>
    <div class="swatch"><div class="color" style="background:${p.neutral900}"></div><div class="info"><div class="name">Neutre 900</div><div class="code">${p.neutral900}</div></div></div>
    <div class="swatch"><div class="color" style="background:${p.neutral400};border:1px solid #ddd"></div><div class="info"><div class="name">Neutre 400</div><div class="code">${p.neutral400}</div></div></div>
  </div>
</div>

<div class="section">
  <h2>3. Typographies</h2>
  <p class="lead">Hiérarchie typographique recommandée pour l'ensemble des supports.</p>
  <div class="fonts">
    <div class="font-block"><div class="label">Titrage · Helvetica Bold</div><div class="sample" style="font-weight:700">Aa Bb Cc 1234567890</div></div>
    <div class="font-block"><div class="label">Texte courant · Helvetica Regular</div><div class="sample" style="font-weight:400">Aa Bb Cc 1234567890</div></div>
    <div class="font-block"><div class="label">Accent · Helvetica Light Italic</div><div class="sample" style="font-weight:300;font-style:italic">Aa Bb Cc 1234567890</div></div>
  </div>
</div>

<div class="section">
  <h2>4. Logo</h2>
  <p class="lead">Déclinaisons autorisées du logo selon les fonds.</p>
  <div class="logo-grid">
    <div class="logo-cell">${logoDataUrl ? `<img src="${logoDataUrl}"/>` : `<div style="font-size:32px;font-weight:700;color:${p.primary}">${(org.nom || "LOGO").slice(0, 12)}</div>`}<div class="lbl">Sur fond clair</div></div>
    <div class="logo-cell dark">${logoDataUrl ? `<img src="${logoDataUrl}"/>` : `<div style="font-size:32px;font-weight:700;color:#fff">${(org.nom || "LOGO").slice(0, 12)}</div>`}<div class="lbl">Sur fond sombre</div></div>
    <div class="logo-cell color">${logoDataUrl ? `<img src="${logoDataUrl}"/>` : `<div style="font-size:32px;font-weight:700;color:#fff">${(org.nom || "LOGO").slice(0, 12)}</div>`}<div class="lbl">Sur fond couleur</div></div>
    <div class="logo-cell">
      <div style="width:100px;height:100px;border:2px dashed ${p.neutral400};margin:0 auto;display:flex;align-items:center;justify-content:center;color:${p.neutral400};font-size:11px">Zone de respect<br/>min. 20px</div>
    </div>
  </div>
  <table>
    <tr><th>Règle</th><th>Description</th></tr>
    <tr><td class="do">✅ À FAIRE</td><td>Respecter la zone de protection autour du logo (équivalente à la hauteur du "O").</td></tr>
    <tr><td class="do">✅ À FAIRE</td><td>Conserver les proportions originales lors du redimensionnement.</td></tr>
    <tr><td class="dont">⛔ À ÉVITER</td><td>Étirer, déformer, faire pivoter ou recolorier le logo.</td></tr>
    <tr><td class="dont">⛔ À ÉVITER</td><td>Placer le logo sur un fond chargé sans réserve blanche.</td></tr>
  </table>
</div>

<div class="section">
  <h2>5. Application aux documents</h2>
  <p class="lead">Cette charte s'applique automatiquement à tous les documents Qualiopi générés depuis le portail.</p>
  <table>
    <tr><th>Élément</th><th>Spécification</th></tr>
    <tr><td>En-tête de document</td><td>Bandeau ${p.primary} avec logo blanc à gauche</td></tr>
    <tr><td>Titres H1</td><td>${p.primary} · 24pt · semibold</td></tr>
    <tr><td>Titres H2</td><td>${p.primaryDark} · 18pt · medium</td></tr>
    <tr><td>Tableaux</td><td>Lignes alternées blanc / ${p.primaryLight}</td></tr>
    <tr><td>Pied de page</td><td>${org.nom || "Organisme"} · SIRET ${org.siret || "—"} · NDA ${org.nda || "—"}</td></tr>
  </table>
</div>

<div class="footer">${org.nom || "Organisme"} · Charte graphique v1.0 · ${today}</div>

</body></html>`;
}

// === 2. SIGNATURE EMAIL HTML ================================================
export function buildEmailSignatureHtml(org: OrganismeInfo, primaryHex: string, logoDataUrl: string | undefined, person: { nom: string; fonction: string; email: string; tel?: string }): string {
  const p = buildPalette(primaryHex);
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Signature email — ${person.nom}</title>
<style>body{font-family:Arial,sans-serif;padding:40px;background:#f5f5f5}.card{background:#fff;padding:30px;border-radius:8px;max-width:560px;margin:0 auto;box-shadow:0 2px 12px rgba(0,0,0,.08)}.instructions{font-size:12px;color:#666;margin-bottom:20px;padding:12px;background:#fffbe6;border-left:3px solid #f0c000;border-radius:4px}</style></head>
<body>
<div class="instructions">📋 <strong>Instructions :</strong> sélectionne tout le bloc ci-dessous (Ctrl+A dans l'aperçu) puis copie-colle dans Gmail / Outlook → Paramètres → Signature.</div>
<div class="card">

<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:13px;color:#333;border-collapse:collapse">
  <tr>
    ${logoDataUrl ? `<td style="padding-right:18px;border-right:3px solid ${p.primary};vertical-align:top"><img src="${logoDataUrl}" alt="${org.nom}" style="width:90px;height:auto;display:block"/></td>` : ""}
    <td style="padding-left:18px;vertical-align:top">
      <div style="font-size:16px;font-weight:700;color:${p.primaryDark};margin-bottom:2px">${person.nom}</div>
      <div style="font-size:12px;color:${p.primary};font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">${person.fonction}</div>
      <div style="font-size:13px;color:#555;line-height:1.5">
        <strong style="color:${p.neutral900}">${org.nom || ""}</strong>${org.nda ? ` · NDA ${org.nda}` : ""}<br/>
        ${org.adresse ? `${org.adresse}, ${org.codePostal || ""} ${org.ville || ""}<br/>` : ""}
        📧 <a href="mailto:${person.email}" style="color:${p.primary};text-decoration:none">${person.email}</a>
        ${person.tel ? ` &nbsp;·&nbsp; 📞 ${person.tel}` : ""}
        ${org.siteWeb ? `<br/>🌐 <a href="${org.siteWeb}" style="color:${p.primary};text-decoration:none">${org.siteWeb.replace(/^https?:\/\//, "")}</a>` : ""}
      </div>
      <div style="margin-top:10px;padding:6px 10px;background:${p.primaryLight};color:${p.primaryDark};border-radius:4px;display:inline-block;font-size:11px;font-weight:600">✓ Organisme certifié Qualiopi</div>
    </td>
  </tr>
</table>

</div></body></html>`;
}

// === 3. CARTES DE VISITE PDF (8.5x5.5cm) ====================================
export function buildBusinessCardsHtml(org: OrganismeInfo, primaryHex: string, logoDataUrl: string | undefined, people: Array<{ nom: string; fonction: string; email: string; tel?: string }>): string {
  const p = buildPalette(primaryHex);
  const card = (person: { nom: string; fonction: string; email: string; tel?: string }) => `
<div style="width:340px;height:200px;background:linear-gradient(135deg,#fff 50%,${p.primaryLight} 50%);border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.1);position:relative;overflow:hidden;font-family:'Helvetica Neue',Arial,sans-serif;page-break-inside:avoid;display:inline-block;margin:8px">
  <div style="position:absolute;top:0;left:0;right:0;height:6px;background:${p.primary}"></div>
  ${logoDataUrl ? `<img src="${logoDataUrl}" style="position:absolute;top:18px;left:18px;width:60px;height:auto"/>` : `<div style="position:absolute;top:18px;left:18px;font-size:18px;font-weight:700;color:${p.primary}">${(org.nom || "").slice(0, 14)}</div>`}
  <div style="position:absolute;bottom:18px;left:18px;right:18px">
    <div style="font-size:15px;font-weight:700;color:${p.primaryDark};margin-bottom:1px">${person.nom}</div>
    <div style="font-size:9px;color:${p.primary};font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">${person.fonction}</div>
    <div style="font-size:9px;color:#444;line-height:1.5">
      ${person.email}${person.tel ? `<br/>${person.tel}` : ""}
      ${org.siteWeb ? `<br/>${org.siteWeb.replace(/^https?:\/\//, "")}` : ""}
    </div>
  </div>
  <div style="position:absolute;top:18px;right:18px;font-size:8px;color:${p.primaryDark};text-align:right;line-height:1.4">
    <div style="background:${p.primary};color:#fff;padding:3px 6px;border-radius:3px;font-weight:600;font-size:8px">QUALIOPI ✓</div>
    ${org.nda ? `<div style="margin-top:4px">NDA ${org.nda}</div>` : ""}
  </div>
</div>`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<style>body{margin:0;padding:30px;background:#f0f0f0;font-family:Arial}h2{color:${p.primaryDark};font-weight:300;margin-bottom:20px}.grid{display:flex;flex-wrap:wrap;justify-content:flex-start}</style>
</head><body>
<h2>Cartes de visite — ${org.nom || ""}</h2>
<div class="grid">${people.map(card).join("")}</div>
</body></html>`;
}

// === API ====================================================================
export async function exportCharteGraphique(org: OrganismeInfo, primaryHex: string, logoDataUrl?: string) {
  const html = buildCharteGraphiqueHtml(org, primaryHex, logoDataUrl);
  await downloadAsPdf(html, `Charte-Graphique-${(org.nom || "organisme").replace(/\s+/g, "-")}.pdf`);
}

export async function exportBusinessCards(org: OrganismeInfo, primaryHex: string, logoDataUrl: string | undefined, people: Array<{ nom: string; fonction: string; email: string; tel?: string }>) {
  const html = buildBusinessCardsHtml(org, primaryHex, logoDataUrl, people);
  await downloadAsPdf(html, `Cartes-Visite-${(org.nom || "organisme").replace(/\s+/g, "-")}.pdf`);
}

export function downloadEmailSignature(org: OrganismeInfo, primaryHex: string, logoDataUrl: string | undefined, person: { nom: string; fonction: string; email: string; tel?: string }) {
  const html = buildEmailSignatureHtml(org, primaryHex, logoDataUrl, person);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Signature-Email-${person.nom.replace(/\s+/g, "-")}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
