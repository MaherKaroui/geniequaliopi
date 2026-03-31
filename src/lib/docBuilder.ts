import { OrganismeInfo, FormationInfo, StagiaireInfo, DocStyleConfig, DEFAULT_DOC_STYLE } from "@/types/qualiopi";

/** Ensure a URL has a protocol prefix and return a clickable <a> tag */
export function linkUrl(url: string | undefined | null, label?: string): string {
  if (!url) return "—";
  const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  return `<a href="${href}" target="_blank" style="color:#1a56db;text-decoration:underline">${label || url}</a>`;
}

let _currentStyle: DocStyleConfig = { ...DEFAULT_DOC_STYLE };

export function setDocStyle(style: DocStyleConfig) {
  _currentStyle = { ...style };
}

export function getDocStyle(): DocStyleConfig {
  return _currentStyle;
}

export function baseStyle(): string {
  const s = _currentStyle;
  const t = s.theme || 'classique';
  const fontsUrl = "https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&family=Barlow:wght@400;500;600;700&family=Bitter:wght@400;700&family=Cabin:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;600;700&family=Crimson+Text:wght@400;700&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&family=EB+Garamond:wght@400;500;600;700&family=Figtree:wght@400;500;600;700&family=Fira+Code:wght@400;500;700&family=Fraunces:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Lato:wght@400;700&family=Lexend:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Lora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;500;600;700&family=Mulish:wght@400;500;600;700&family=Noto+Serif:wght@400;700&family=Nunito:wght@400;500;600;700&family=Open+Sans:wght@400;600;700&family=Outfit:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=PT+Serif:wght@400;700&family=Quicksand:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&family=Red+Hat+Display:wght@400;500;700&family=Roboto:wght@400;500;700&family=Rubik:wght@400;500;600;700&family=Sora:wght@400;500;600;700&family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:wght@400;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Spectral:wght@400;600;700&family=Urbanist:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap";

  // Theme-specific CSS overrides
  const themeCSS: Record<string, string> = {
    classique: `
h1{border-bottom:3px solid ${s.primaryColor};padding-bottom:10px}
h2{border-bottom:none}
table th{background:${s.primaryColor};color:white}
tr:nth-child(even){background:#f0f4fa}
tr:nth-child(odd){background:#fff}
.section{background:#f8f9fa;border-radius:8px;border-left:4px solid ${s.primaryColor}}
.sig-box{border:1px solid #ddd;border-radius:8px}
`,
    moderne: `
h1{border-bottom:none;padding-bottom:0;background:linear-gradient(135deg,${s.primaryColor},${s.secondaryColor});color:white;padding:15px 20px;border-radius:10px;margin-bottom:24px}
h2{border-bottom:none;background:${s.primaryColor}0d;padding:8px 14px;border-radius:6px;border-left:4px solid ${s.primaryColor}}
h3{color:${s.primaryColor}}
table{border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
table th{background:linear-gradient(135deg,${s.primaryColor},${s.primaryColor}dd);color:white;text-transform:uppercase;letter-spacing:0.5px;font-size:${s.fontSize - 2}px}
td{border-bottom:1px solid #eef2f7}
tr:nth-child(even){background:#f8fafd}
tr:nth-child(odd){background:#fff}
.section{background:linear-gradient(135deg,${s.primaryColor}08,${s.secondaryColor}08);border-radius:12px;border-left:5px solid ${s.primaryColor};box-shadow:0 1px 4px rgba(0,0,0,0.04)}
.sig-box{border:2px solid ${s.primaryColor}20;border-radius:12px;background:#fafbfe}
.sig-label{text-transform:uppercase;letter-spacing:0.5px;font-size:${s.fontSize - 1}px !important}
.badge{border-radius:20px;background:linear-gradient(135deg,${s.primaryColor}15,${s.secondaryColor}15)}
.footer{border-top:3px solid ${s.primaryColor}20}
`,
    elegant: `
h1{border-bottom:1px solid ${s.primaryColor}40;padding-bottom:14px;letter-spacing:-0.5px;font-weight:600}
h2{border-bottom:none;color:${s.primaryColor};font-style:italic;font-weight:600}
h3{color:#444;font-style:italic}
table{border:1px solid ${s.primaryColor}25}
table th{background:${s.primaryColor}12;color:${s.primaryColor};font-weight:600;border-bottom:2px solid ${s.primaryColor}40;text-transform:none;letter-spacing:0}
td{border-bottom:1px solid ${s.primaryColor}15;color:#333}
tr:nth-child(even){background:${s.primaryColor}05}
tr:nth-child(odd){background:#fff}
.section{background:${s.primaryColor}06;border-radius:4px;border-left:3px solid ${s.primaryColor}60;border-right:3px solid ${s.primaryColor}20}
.sig-box{border:1px solid ${s.primaryColor}30;border-radius:4px;background:${s.primaryColor}03}
.sig-label{font-style:italic}
.badge{border-radius:4px;border:1px solid ${s.primaryColor}30;background:${s.primaryColor}08}
.footer{border-top:1px solid ${s.primaryColor}30}
`,
    minimaliste: `
h1{border-bottom:none;padding-bottom:0;font-weight:800;letter-spacing:-1px;color:#111}
h2{border-bottom:none;color:#111;font-weight:700;margin-top:30px}
h3{color:#333;font-weight:600}
table{border:none}
table th{background:none;color:#111;font-weight:700;border-bottom:2px solid #111;padding:10px 8px}
td{border-bottom:1px solid #eee;padding:10px 8px;color:#444}
tr:nth-child(even){background:transparent}
tr:nth-child(odd){background:transparent}
tr:hover{background:#f5f5f5}
.section{background:transparent;border-radius:0;border-left:2px solid #111;padding:12px 16px}
.section-green{border-left-color:${s.secondaryColor}}
.sig-box{border:none;border-bottom:1px solid #ddd;border-radius:0;padding:15px 0}
.sig-label{color:#111;text-transform:uppercase;letter-spacing:1px;font-size:${s.fontSize - 2}px !important}
.badge{border-radius:0;background:#f5f5f5;color:#111;font-weight:600}
.footer{border-top:1px solid #ddd;color:#999}
`,
    bold: `
h1{border-bottom:none;padding:18px 24px;background:${s.primaryColor};color:white;border-radius:0;font-weight:800;text-transform:uppercase;letter-spacing:1px;font-size:${s.fontSize + 7}px}
h2{border-bottom:4px solid ${s.primaryColor};padding-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;font-weight:800;color:${s.primaryColor}}
h3{color:${s.secondaryColor};font-weight:700;text-transform:uppercase;font-size:${s.fontSize}px;letter-spacing:0.3px}
table{border:2px solid ${s.primaryColor}}
table th{background:${s.primaryColor};color:white;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;padding:10px 8px;font-size:${s.fontSize - 2}px}
td{border-bottom:2px solid ${s.primaryColor}20;padding:10px 8px}
tr:nth-child(even){background:${s.primaryColor}08}
tr:nth-child(odd){background:#fff}
.section{background:${s.primaryColor}08;border-radius:0;border-left:6px solid ${s.primaryColor};padding:16px 18px}
.section-green{border-left-color:${s.secondaryColor}}
.sig-box{border:2px solid ${s.primaryColor};border-radius:0;background:${s.primaryColor}05}
.sig-label{text-transform:uppercase;letter-spacing:1px;font-weight:800;font-size:${s.fontSize - 1}px !important}
.badge{border-radius:0;background:${s.primaryColor};color:white;font-weight:800;text-transform:uppercase;letter-spacing:0.5px}
.footer{border-top:4px solid ${s.primaryColor};font-weight:600}
`,
    nature: `
h1{border-bottom:none;padding:14px 20px;background:linear-gradient(to right,${s.primaryColor}15,transparent);border-left:5px solid ${s.primaryColor};border-radius:0 8px 8px 0}
h2{border-bottom:none;color:${s.primaryColor};padding-left:12px;border-left:3px solid ${s.secondaryColor}}
h3{color:${s.secondaryColor}}
table{border-radius:8px;overflow:hidden;border:1px solid ${s.primaryColor}20}
table th{background:${s.primaryColor}18;color:${s.primaryColor};font-weight:600;border-bottom:2px solid ${s.primaryColor}30}
td{border-bottom:1px solid ${s.primaryColor}10}
tr:nth-child(even){background:${s.primaryColor}05}
tr:nth-child(odd){background:transparent}
.section{background:linear-gradient(to right,${s.primaryColor}08,${s.secondaryColor}05);border-radius:8px;border-left:4px solid ${s.secondaryColor}}
.sig-box{border:1px dashed ${s.primaryColor}40;border-radius:12px;background:${s.primaryColor}03}
.sig-label{color:${s.primaryColor}}
.badge{border-radius:16px;background:${s.secondaryColor}15;color:${s.secondaryColor}}
.footer{border-top:2px solid ${s.secondaryColor}30;color:${s.primaryColor}90}
`,
    academique: `
h1{border-bottom:double 4px ${s.primaryColor};padding-bottom:12px;font-weight:600;letter-spacing:-0.3px}
h2{border-bottom:1px solid ${s.primaryColor}40;padding-bottom:5px;font-weight:600}
h3{color:${s.primaryColor};font-weight:600}
table{border:1px solid ${s.primaryColor}30}
table th{background:${s.primaryColor}10;color:${s.primaryColor};font-weight:700;border-bottom:2px solid ${s.primaryColor};border-right:1px solid ${s.primaryColor}20}
td{border-bottom:1px solid ${s.primaryColor}18;border-right:1px solid ${s.primaryColor}10}
tr:nth-child(even){background:${s.primaryColor}04}
tr:nth-child(odd){background:#fff}
.section{background:#fff;border-radius:0;border:1px solid ${s.primaryColor}25;border-left:4px solid ${s.primaryColor};padding:14px 16px}
.sig-box{border:1px solid ${s.primaryColor}35;border-radius:2px;background:white}
.sig-label{font-weight:600;border-bottom:1px solid ${s.primaryColor}30;padding-bottom:4px}
.badge{border-radius:2px;background:${s.primaryColor}10;color:${s.primaryColor};border:1px solid ${s.primaryColor}25}
.footer{border-top:double 4px ${s.primaryColor}50}
`,
    corporate: `
h1{border-bottom:none;padding:16px 22px;background:${s.primaryColor};color:white;border-radius:6px;box-shadow:0 2px 10px ${s.primaryColor}40}
h2{border-bottom:none;color:white;background:${s.primaryColor}cc;padding:8px 16px;border-radius:4px;font-size:${s.fontSize + 2}px}
h3{color:${s.primaryColor};font-weight:600;padding-left:10px;border-left:3px solid ${s.secondaryColor}}
table{box-shadow:0 1px 6px rgba(0,0,0,0.08);border-radius:6px;overflow:hidden}
table th{background:${s.primaryColor};color:white;font-weight:600;padding:10px 10px}
td{padding:10px 10px;border-bottom:1px solid #e8ecf2}
tr:nth-child(even){background:#f4f7fb}
tr:nth-child(odd){background:#fff}
.section{background:#f4f7fb;border-radius:8px;border-left:5px solid ${s.secondaryColor};box-shadow:0 1px 3px rgba(0,0,0,0.04)}
.sig-box{border:1px solid #dce3ed;border-radius:8px;background:#fafcfe;box-shadow:0 1px 3px rgba(0,0,0,0.03)}
.sig-label{color:${s.primaryColor};font-weight:700}
.badge{border-radius:6px;background:${s.secondaryColor}18;color:${s.secondaryColor};font-weight:600}
.footer{border-top:3px solid ${s.primaryColor};background:#f4f7fb;padding:15px 0;margin-top:40px;border-radius:0 0 6px 6px}
`
  };

  const themeRules = themeCSS[t] || themeCSS.classique;

  return `<style>
@import url('${fontsUrl}');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${s.fontFamily};color:#1a1a2e;line-height:1.6;padding:40px;max-width:850px;margin:0 auto;font-size:${s.fontSize}px}
h1{font-size:${s.fontSize + 9}px;color:${s.primaryColor};margin-bottom:20px;font-family:${s.headingFont}}
h2{font-size:${s.fontSize + 3}px;color:${s.primaryColor};margin:20px 0 10px;font-family:${s.headingFont}}
h3{font-size:${s.fontSize + 1}px;color:#333;margin:15px 0 8px;font-family:${s.headingFont}}
p{margin-bottom:8px;font-size:${s.fontSize}px}
.header{text-align:${s.logoPosition};margin-bottom:30px}
.header h1{border:none;background:none;color:${s.primaryColor};padding:0;box-shadow:none}
.org-name{font-size:${s.fontSize + 13}px;font-weight:700;color:${s.primaryColor};font-family:${s.headingFont}}
.subtitle{color:#666;font-size:${s.fontSize + 1}px;margin-top:4px}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:15px 0}
.info-item{font-size:${s.fontSize}px}
.info-item strong{color:${s.primaryColor}}
table{width:100%;border-collapse:collapse;margin:15px 0;font-size:${s.fontSize - 1}px}
th{padding:8px 6px;text-align:left;font-size:${s.fontSize - 1}px}
td{padding:8px 6px;vertical-align:top;font-size:${s.fontSize - 1}px}
.footer{margin-top:40px;padding-top:20px;font-size:${s.fontSize - 1}px;color:#666;text-align:center}
.signature-block{display:grid;grid-template-columns:1fr 1fr 1fr;gap:30px;margin-top:40px}
.signature-block-2{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px}
.sig-box{padding:15px;min-height:120px}
.sig-box p{margin:4px 0;font-size:${s.fontSize - 1}px}
.sig-label{font-weight:700;color:${s.primaryColor};font-size:${s.fontSize}px;margin-bottom:8px !important;font-family:${s.headingFont}}
.section{margin:20px 0;padding:15px}
.section-green{border-left-color:${s.secondaryColor}}
.section-orange{border-left-color:#e8870e}
.badge{display:inline-block;padding:3px 10px;font-size:${s.fontSize - 2}px;font-weight:600;margin:2px}
.check{color:${s.secondaryColor};font-weight:700}
.emargement-row td{height:40px}
.page-break{page-break-after:always;margin:30px 0;border-top:2px dashed #ccc}
@media print{body{padding:20px}.page-break{page-break-after:always}}
${themeRules}
${!s.showSectionBorder ? `.section{border-left:none !important} .section-green{border-left:none !important} .section-orange{border-left:none !important} h2{border-left:none !important}` : ''}
${getHeadingStyleCSS(s)}
</style>`;
}

function getHeadingStyleCSS(s: DocStyleConfig): string {
  const hs = s.headingStyle || 'line-bottom';
  const overrides: Record<string, string> = {
    'line-bottom': `
h1{border-bottom:3px solid ${s.primaryColor} !important;padding-bottom:10px !important;background:none !important;color:${s.primaryColor} !important;border-radius:0 !important;box-shadow:none !important;border-left:none !important;padding:0 0 10px 0 !important}
h2{border-bottom:2px solid ${s.primaryColor}40 !important;padding-bottom:6px !important;background:none !important;color:${s.primaryColor} !important;border-radius:0 !important;border-left:none !important;padding-left:0 !important}
`,
    'filled': `
h1{background:${s.primaryColor} !important;color:white !important;padding:14px 20px !important;border-radius:6px !important;border-bottom:none !important;border-left:none !important;box-shadow:0 2px 8px ${s.primaryColor}40 !important}
h2{background:${s.primaryColor}cc !important;color:white !important;padding:8px 16px !important;border-radius:4px !important;border-bottom:none !important;border-left:none !important}
`,
    'gradient': `
h1{background:linear-gradient(135deg,${s.primaryColor},${s.secondaryColor}) !important;color:white !important;padding:14px 20px !important;border-radius:8px !important;border-bottom:none !important;border-left:none !important;box-shadow:none !important}
h2{background:linear-gradient(135deg,${s.primaryColor}15,${s.secondaryColor}15) !important;color:${s.primaryColor} !important;padding:8px 14px !important;border-radius:6px !important;border-bottom:none !important;border-left:none !important}
`,
    'left-bar': `
h1{border-left:5px solid ${s.primaryColor} !important;padding-left:16px !important;border-bottom:none !important;background:${s.primaryColor}08 !important;padding:12px 16px !important;border-radius:0 6px 6px 0 !important;color:${s.primaryColor} !important;box-shadow:none !important}
h2{border-left:4px solid ${s.secondaryColor} !important;padding-left:12px !important;border-bottom:none !important;background:none !important;color:${s.primaryColor} !important;border-radius:0 !important}
`,
    'underline-double': `
h1{border-bottom:double 4px ${s.primaryColor} !important;padding-bottom:10px !important;background:none !important;color:${s.primaryColor} !important;border-radius:0 !important;box-shadow:none !important;border-left:none !important;padding-left:0 !important}
h2{border-bottom:double 3px ${s.primaryColor}60 !important;padding-bottom:6px !important;background:none !important;color:${s.primaryColor} !important;border-radius:0 !important;border-left:none !important;padding-left:0 !important}
`,
    'plain': `
h1{border-bottom:none !important;background:none !important;color:${s.primaryColor} !important;padding:0 !important;border-radius:0 !important;box-shadow:none !important;border-left:none !important}
h2{border-bottom:none !important;background:none !important;color:${s.primaryColor} !important;padding:0 !important;border-radius:0 !important;border-left:none !important}
`,
    'pill': `
h1{background:${s.primaryColor}12 !important;color:${s.primaryColor} !important;padding:10px 24px !important;border-radius:30px !important;border-bottom:none !important;border-left:none !important;box-shadow:none !important;display:inline-block !important;margin-bottom:20px !important}
h2{background:${s.primaryColor}08 !important;color:${s.primaryColor} !important;padding:6px 18px !important;border-radius:20px !important;border-bottom:none !important;border-left:none !important;display:inline-block !important;margin-bottom:10px !important}
`,
  };
  return overrides[hs] || '';
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "___/___/______";
  // Handle Excel serial date numbers
  if (/^\d{4,5}$/.test(dateStr.trim())) {
    const serial = parseInt(dateStr.trim(), 10);
    if (serial > 1000 && serial < 100000) {
      const excelEpoch = new Date(1899, 11, 30);
      const d = new Date(excelEpoch.getTime() + serial * 86400000);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("fr-FR");
      }
    }
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("fr-FR");
}

// French public holidays (approximate, common ones)
function getFrenchHolidays(year: number): Set<string> {
  const holidays = new Set<string>();
  const add = (m: number, d: number) => holidays.add(`${year}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
  add(1, 1);   // Jour de l'An
  add(5, 1);   // Fête du Travail
  add(5, 8);   // Victoire 1945
  add(7, 14);  // Fête Nationale
  add(8, 15);  // Assomption
  add(11, 1);  // Toussaint
  add(11, 11); // Armistice
  add(12, 25); // Noël
  // Easter Monday (approximate: using Butcher's algorithm)
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d2 = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d2 - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const easter = new Date(year, month - 1, day);
  // Easter Monday
  const easterMon = new Date(easter); easterMon.setDate(easterMon.getDate() + 1);
  holidays.add(easterMon.toISOString().slice(0, 10));
  // Ascension (Easter + 39)
  const ascension = new Date(easter); ascension.setDate(ascension.getDate() + 39);
  holidays.add(ascension.toISOString().slice(0, 10));
  // Whit Monday (Easter + 50)
  const whitMon = new Date(easter); whitMon.setDate(whitMon.getDate() + 50);
  holidays.add(whitMon.toISOString().slice(0, 10));
  return holidays;
}

/** Convert possible Excel serial date to ISO string */
function normalizeDate(dateStr: string): string {
  if (/^\d{4,5}$/.test(dateStr.trim())) {
    const serial = parseInt(dateStr.trim(), 10);
    if (serial > 1000 && serial < 100000) {
      const excelEpoch = new Date(1899, 11, 30);
      const d = new Date(excelEpoch.getTime() + serial * 86400000);
      if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
    }
  }
  return dateStr;
}

/** Subtract N business days from a date (skips weekends + French holidays) */
export function subtractBusinessDays(dateStr: string, businessDays: number): string {
  if (!dateStr) return dateStr;
  const normalized = normalizeDate(dateStr);
  const d = new Date(normalized);
  const holidays = getFrenchHolidays(d.getFullYear());
  // Also get previous year holidays in case we cross a year boundary
  const holidaysPrev = getFrenchHolidays(d.getFullYear() - 1);
  const allHolidays = new Set([...holidays, ...holidaysPrev]);
  let remaining = businessDays;
  while (remaining > 0) {
    d.setDate(d.getDate() - 1);
    const dow = d.getDay(); // 0=Sun, 6=Sat
    const iso = d.toISOString().slice(0, 10);
    if (dow !== 0 && dow !== 6 && !allHolidays.has(iso)) {
      remaining--;
    }
  }
  return d.toISOString().slice(0, 10);
}

export function htmlWrap(content: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">${baseStyle()}</head><body>${content}</body></html>`;
}

export function orgHeader(org: OrganismeInfo, subtitle?: string): string {
  const s = _currentStyle;
  const logoAlign = s.logoPosition === 'left' ? 'text-align:left' : s.logoPosition === 'right' ? 'text-align:right' : 'text-align:center';
  const logoHtml = org.logoUrl ? `<div style="margin-bottom:10px;${logoAlign}"><img src="${org.logoUrl}" alt="Logo ${org.nom}" style="max-height:80px;max-width:200px;object-fit:contain" /></div>` : "";
  return `<div class="header" style="${logoAlign}">
    ${logoHtml}
    <div class="org-name">${org.nom}</div>
    <div class="subtitle">Organisme de formation – NDA : ${org.nda} – SIRET : ${org.siret}</div>
    ${subtitle ? `<div class="subtitle" style="margin-top:8px;font-weight:600;font-size:${s.fontSize + 3}px">${subtitle}</div>` : ""}
  </div>`;
}

/** Get the formation start date for a specific stagiaire (prioritizes stagiaire-specific date, then formation-level) */
export function getStagiaireDateDebut(s: StagiaireInfo, f: FormationInfo): string {
  return normalizeDate(s.dateDebutFormation || f.dateDebut || "");
}

/** Get the formation end date for a specific stagiaire */
export function getStagiaireDateFin(s: StagiaireInfo, f: FormationInfo): string {
  return normalizeDate(s.dateFinFormation || f.dateFin || "");
}

/** Get per-stagiaire tarif (prioritizes stagiaire-specific, then formation-level) */
export function getStagiaireTarif(s: StagiaireInfo, f: FormationInfo): string {
  return s.tarifFormation || f.tarif || "";
}

/** Check if stagiaires have individual (varying) dates */
export function hasIndividualDates(stagiaires: StagiaireInfo[]): boolean {
  const withDates = stagiaires.filter(s => s.dateDebutFormation || s.dateFinFormation);
  if (withDates.length === 0) return false;
  const firsts = new Set(withDates.map(s => s.dateDebutFormation).filter(Boolean));
  const lasts = new Set(withDates.map(s => s.dateFinFormation).filter(Boolean));
  return firsts.size > 1 || lasts.size > 1;
}

/** Get display durée — shows "À définir selon le groupe" if individual dates differ */
export function getDisplayDuree(f: FormationInfo, stagiaires?: StagiaireInfo[]): string {
  if (stagiaires && hasIndividualDates(stagiaires)) return "À définir selon le groupe";
  return f.duree;
}

/** Get display tarif — shows "Tarif sur demande" if individual dates differ */
export function getDisplayTarif(f: FormationInfo, stagiaires?: StagiaireInfo[]): string {
  if (stagiaires && hasIndividualDates(stagiaires)) return "Tarif sur demande";
  return f.tarif;
}

/** Calculate individual stagiaire duration based on their dates (business days × hours/day) */
export function getStagiaireDuree(s: StagiaireInfo, f: FormationInfo): string {
  const dateDebut = s.dateDebutFormation || "";
  const dateFin = s.dateFinFormation || "";
  if (dateDebut && dateFin) {
    const start = new Date(dateDebut + "T00:00:00");
    const end = new Date(dateFin + "T00:00:00");
    let businessDays = 0;
    const current = new Date(start);
    while (current <= end) {
      if (current.getDay() !== 0 && current.getDay() !== 6) businessDays++;
      current.setDate(current.getDate() + 1);
    }
    if (businessDays > 0) {
      const hoursPerDay = 7;
      const totalHours = businessDays * hoursPerDay;
      return `${totalHours} heures (${businessDays} jours)`;
    }
  }
  return "À définir selon le groupe";
}

/** Format a formation info block for a specific stagiaire (uses their individual dates/tarif if available) */
export function formationInfoBlockStagiaire(f: FormationInfo, s: StagiaireInfo): string {
  return infoGrid({
    "Formation": f.intitule,
    "Durée": getStagiaireDuree(s, f),
    "Du": formatDate(getStagiaireDateDebut(s, f)),
    "Au": formatDate(getStagiaireDateFin(s, f)),
    "Lieu": f.lieu,
    "Modalités": f.modalites,
    "Formateur": f.formateur,
    "Tarif": getStagiaireTarif(s, f),
  });
}

export function infoGrid(items: Record<string, string>): string {
  return `<div class="info-grid">${Object.entries(items).map(([k, v]) => `<div class="info-item"><strong>${k} :</strong> ${v || "___"}</div>`).join("")}</div>`;
}

export function formationInfoBlock(f: FormationInfo, stagiaires?: StagiaireInfo[]): string {
  const hasIndiv = stagiaires && hasIndividualDates(stagiaires);
  const items: Record<string, string> = {
    "Formation": f.intitule,
    "Durée": getDisplayDuree(f, stagiaires),
  };
  if (hasIndiv) {
    items["Sessions"] = "Dates individuelles par stagiaire";
  } else if (f.dateDebut || f.dateFin) {
    items["Du"] = formatDate(f.dateDebut);
    items["Au"] = formatDate(f.dateFin);
  }
  items["Lieu"] = f.lieu;
  items["Modalités"] = f.modalites;
  items["Formateur"] = f.formateur;
  items["Tarif"] = getDisplayTarif(f, stagiaires);
  return infoGrid(items);
}

export function signatureBlock3(org: OrganismeInfo, stagiaireNom?: string, formateurNom?: string, stagiaireSignatureUrl?: string, formateurSignatureUrl?: string): string {
  const tamponHtml = org.tamponUrl ? `<img src="${org.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
  const stagSigHtml = stagiaireSignatureUrl ? `<img src="${stagiaireSignatureUrl}" alt="Signature stagiaire" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : `<p style="font-style:italic;color:#999;margin-top:15px">${stagiaireNom ? `Signé par ${stagiaireNom}` : ""}</p>`;
  // Formateur : utiliser la signature formateur dédiée si disponible, sinon celle du dirigeant
  const formateurSigHtml = formateurSignatureUrl
    ? `<img src="${formateurSignatureUrl}" alt="Signature formateur" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`
    : org.signatureUrl ? `<img src="${org.signatureUrl}" alt="Signature" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : "";
  const responsableSigHtml = org.signatureUrl ? `<img src="${org.signatureUrl}" alt="Signature" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : "";
  return `<div class="signature-block">
    <div class="sig-box"><p class="sig-label">Le/La Stagiaire</p><p>Nom : ${stagiaireNom || "________________________"}</p><p>Date : ________________________</p><p style="margin-top:20px">Signature :</p>${stagSigHtml}</div>
    <div class="sig-box"><p class="sig-label">Le/La Formateur(trice)</p><p>Nom : ${formateurNom || "________________________"}</p><p>Date : ________________________</p><p style="margin-top:20px">Signature :</p>${formateurSigHtml}</div>
    <div class="sig-box"><p class="sig-label">Le Responsable</p><p>Nom : ${org.dirigeant}</p><p>Date : ________________________</p><p style="margin-top:20px">Signature :</p>${responsableSigHtml}${tamponHtml}</div>
  </div>`;
}

export function signatureBlock2(label1: string, nom1: string, label2: string, nom2: string, signatureUrl?: string, tamponUrl?: string, stagiaireSignatureUrl?: string, dates?: string[], formateurSignatureUrl?: string): string {
  const isFormateurLabel1 = /formateur/i.test(label1);
  const isFormateurLabel2 = /formateur/i.test(label2);
  // Si le label contient "formateur", utiliser la signature formateur dédiée si disponible, sinon celle du dirigeant
  const formateurSigUrl = formateurSignatureUrl || signatureUrl;
  const sig1Html = isFormateurLabel1 && formateurSigUrl
    ? `<img src="${formateurSigUrl}" alt="Signature formateur" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`
    : stagiaireSignatureUrl
      ? `<img src="${stagiaireSignatureUrl}" alt="Signature" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`
      : `<p style="font-style:italic;color:#999;margin-top:15px">Signé par ${nom1}</p>`;
  const tamponHtml = tamponUrl ? `<img src="${tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : "";
  // Si label2 est formateur, utiliser la signature formateur
  const sig2Html = isFormateurLabel2 && formateurSigUrl
    ? `<img src="${formateurSigUrl}" alt="Signature formateur" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />`
    : signatureUrl ? `<img src="${signatureUrl}" alt="Signature" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : "";
  const date1 = dates?.[0] || "________________________";
  const date2 = dates?.[1] || "________________________";
  return `<div class="signature-block-2">
    <div class="sig-box"><p class="sig-label">${label1}</p><p>Nom : ${nom1}</p><p>Date : ${date1}</p><p style="margin-top:20px">Signature :</p>${sig1Html}</div>
    <div class="sig-box"><p class="sig-label">${label2}</p><p>Nom : ${nom2}</p><p>Date : ${date2}</p><p style="margin-top:20px">Signature :</p>${sig2Html}${tamponHtml}</div>
  </div>`;
}

export function tableHTML(headers: string[], rows: string[][]): string {
  return `<table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

export function footer(org: OrganismeInfo): string {
  const version = (org as any).version || "1";
  const dateMaj = (org as any).dateMaj
    ? new Date((org as any).dateMaj).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' });
  return `<div class="footer">
    <p style="font-weight:700;font-size:inherit;margin:0 0 4px">${org.nom}</p>
    <p style="margin:0 0 8px">Adresse: ${org.adresse}, ${org.codePostal} ${org.ville}</p>
    <p style="margin:0 0 8px">Siret: ${org.siret}</p>
    <p style="margin:0 0 8px">Nda: ${org.nda} cet enregistrement ne vaut pas agrément de l'état</p>
    <p style="margin:4px 0 0">V${version} ${dateMaj}</p>
  </div>`;
}

export function section(content: string, variant?: "green" | "orange"): string {
  return `<div class="section${variant ? ` section-${variant}` : ""}">${content}</div>`;
}

export interface DocBuildConfig {
  org: OrganismeInfo;
  title: string;
  subtitle?: string;
  formation?: FormationInfo;
  showFormationInfo?: boolean;
  sections?: { heading: string; content: string; variant?: "green" | "orange" }[];
  table?: { headers: string[]; rows: string[][] };
  extraHtml?: string;
  signatures?: { type: "3" | "2"; labels?: string[]; names?: string[]; stagiaireSignatureUrl?: string; formateurSignatureUrl?: string; dates?: string[]; noOrgSignature?: boolean };
  stagiaires?: StagiaireInfo[];
}

export function buildDocument(config: DocBuildConfig): string {
  let body = orgHeader(config.org, config.subtitle);
  body += `<h1>${config.title}</h1>`;
  if (config.formation && config.showFormationInfo) {
    body += formationInfoBlock(config.formation, config.stagiaires);
  }
  if (config.sections) {
    for (const s of config.sections) {
      body += `<h2>${s.heading}</h2>`;
      body += section(s.content, s.variant);
    }
  }
  if (config.table) {
    body += tableHTML(config.table.headers, config.table.rows);
  }
  if (config.extraHtml) {
    body += config.extraHtml;
  }
  if (config.signatures) {
    const fmtSigUrl = config.signatures.formateurSignatureUrl || config.formation?.formateurSignatureUrl;
    if (config.signatures.type === "3") {
      body += signatureBlock3(config.org, config.signatures.names?.[0], config.signatures.names?.[1], config.signatures.stagiaireSignatureUrl, fmtSigUrl);
    } else {
      body += signatureBlock2(
        config.signatures.labels?.[0] || "Partie 1",
        config.signatures.names?.[0] || "",
        config.signatures.labels?.[1] || "Partie 2",
        config.signatures.names?.[1] || "",
        config.signatures.noOrgSignature ? undefined : config.org.signatureUrl,
        config.org.tamponUrl,
        config.signatures.stagiaireSignatureUrl,
        config.signatures.dates,
        fmtSigUrl
      );
    }
  }
  body += footer(config.org);
  let result = htmlWrap(body);
  // Auto-apply gender based on first stagiaire if available
  if (config.stagiaires && config.stagiaires.length > 0) {
    result = applyGender(result, config.stagiaires[0]);
  } else {
    // Default: remove (e) with masculine form
    result = applyGender(result, null);
  }
  return result;
}

/**
 * Gender helper: returns the correct gendered form based on stagiaire civilité.
 * Usage: g(s, "inscrit", "inscrite") or g(s, "soussigné", "soussignée")
 * If civilité is empty/unknown, defaults to masculine.
 */
export function g(s: { civilite?: string } | undefined | null, masc: string, fem: string): string {
  if (!s) return masc;
  return s.civilite === "Mme" ? fem : masc;
}

/**
 * Applies gendered text replacements on an HTML string for a given stagiaire.
 * Replaces all common (e) parenthetical patterns with the correct gender form.
 */
export function applyGender(html: string, s: { civilite?: string } | undefined | null): string {
  const isFem = s?.civilite === "Mme";
  const replacements: [RegExp, string, string][] = [
    [/soussigné\(e\)/gi, "soussigné", "soussignée"],
    [/inscrit\(e\)/gi, "inscrit", "inscrite"],
    [/muni\(e\)/gi, "muni", "munie"],
    [/convoqué\(e\)/gi, "convoqué", "convoquée"],
    [/admis\(e\)/gi, "admis", "admise"],
    [/formé\(e\)/gi, "formé", "formée"],
    [/accueilli\(e\)/gi, "accueilli", "accueillie"],
    [/apprenti\(e\)/gi, "apprenti", "apprentie"],
    [/engagé\(e\)/gi, "engagé", "engagée"],
    [/employé\(e\)/gi, "employé", "employée"],
    [/salarié\(e\)/gi, "salarié", "salariée"],
    [/accompagné\(e\)/gi, "accompagné", "accompagnée"],
    [/informé\(e\)/gi, "informé", "informée"],
    [/examiné\(e\)/gi, "examiné", "examinée"],
    [/lancé\(e\)/gi, "lancé", "lancée"],
    [/présenté\(e\)/gi, "présenté", "présentée"],
    [/orienté\(e\)/gi, "orienté", "orientée"],
    [/évalué\(e\)/gi, "évalué", "évaluée"],
    [/certifié\(e\)/gi, "certifié", "certifiée"],
    [/diplômé\(e\)/gi, "diplômé", "diplômée"],
    [/intéressé\(e\)/gi, "intéressé", "intéressée"],
    [/concerné\(e\)/gi, "concerné", "concernée"],
    [/invité\(e\)/gi, "invité", "invitée"],
    [/autorisé\(e\)/gi, "autorisé", "autorisée"],
    [/tenu\(e\)/gi, "tenu", "tenue"],
    [/retenu\(e\)/gi, "retenu", "retenue"],
    [/entendu\(e\)/gi, "entendu", "entendue"],
    [/satisfait\(e\)/gi, "satisfait", "satisfaite"],
    [/prêt\(e\)/gi, "prêt", "prête"],
    [/il\/elle/gi, "il", "elle"],
    [/le\/la stagiaire/gi, "le stagiaire", "la stagiaire"],
    [/l'apprenant\(e\)/gi, "l'apprenant", "l'apprenante"],
    [/L'apprenant\(e\)/gi, "L'apprenant", "L'apprenante"],
    [/l'apprenti\(e\)/gi, "l'apprenti", "l'apprentie"],
    [/L'Apprenti\(e\)/gi, "L'Apprenti", "L'Apprentie"],
    [/praticien\(ne\)/gi, "praticien", "praticienne"],
    [/Praticien\(ne\)/gi, "Praticien", "Praticienne"],
    [/référent\(e\)/gi, "référent", "référente"],
    [/Référent\(e\)/gi, "Référent", "Référente"],
    [/consultant\(e\)/gi, "consultant", "consultante"],
    [/coordinateur\(trice\)/gi, "coordinateur", "coordinatrice"],
    [/formateur\(trice\)/gi, "formateur", "formatrice"],
    [/directeur\(trice\)/gi, "directeur", "directrice"],
    [/compétitif\(ve\)/gi, "compétitif", "compétitive"],
    [/compétitif\/ve/gi, "compétitif", "compétitive"],
    [/autonome\(e\)/gi, "autonome", "autonome"],
    [/reconnu\(e\)/gi, "reconnu", "reconnue"],
    [/amené\(e\)/gi, "amené", "amenée"],
    [/nommé\(e\)/gi, "nommé", "nommée"],
    [/chargé\(e\)/gi, "chargé", "chargée"],
    [/intégré\(e\)/gi, "intégré", "intégrée"],
    [/spécialisé\(e\)/gi, "spécialisé", "spécialisée"],
    [/pertinent\(e\)/gi, "pertinent", "pertinente"],
    [/indépendant\(e\)/gi, "indépendant", "indépendante"],
  ];
  // Generic catch-all for any remaining (e) on past participles: word ending in é(e), i(e), u(e)
  let result = html;
  for (const [regex, masc, fem] of replacements) {
    result = result.replace(regex, isFem ? fem : masc);
  }
  // Catch remaining patterns like "xxxé(e)" not in our list
  result = result.replace(/([éi])\(e\)/g, isFem ? "$1e" : "$1");
  result = result.replace(/([u])\(e\)/g, isFem ? "$1e" : "$1");
  // Catch M./Mme patterns
  result = result.replace(/M\.\/Mme/g, isFem ? "Mme" : "M.");
  // Catch "il/elle" variants with capitals
  result = result.replace(/Il\/Elle/g, isFem ? "Elle" : "Il");
  return result;
}
