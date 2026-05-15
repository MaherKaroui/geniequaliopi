/**
 * VI - Tampons SVG ronds (Visionnaire Institute + Entreprise + signatures manuscrites simulées)
 */
import { VI_ORG, type ViApprenti } from "./viData";

const COLOR = "#0A3D7A";
const SIZE = 220;
const C = SIZE / 2;

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!));
}

function buildStamp(top: string, bottom: string, c1: string, c2: string, c3?: string, color = COLOR): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <defs>
    <path id="topArc${Math.floor(Math.random()*9999)}" d="M ${C-88},${C} A 88,88 0 0,1 ${C+88},${C}" />
    <path id="botArc${Math.floor(Math.random()*9999)}" d="M ${C-88},${C} A 88,88 0 0,0 ${C+88},${C}" />
  </defs>
  <circle cx="${C}" cy="${C}" r="95" fill="none" stroke="${color}" stroke-width="2.5"/>
  <circle cx="${C}" cy="${C}" r="80" fill="none" stroke="${color}" stroke-width="1.2"/>
  <path id="t1" d="M ${C-85},${C} A 85,85 0 0,1 ${C+85},${C}" fill="none"/>
  <path id="b1" d="M ${C-85},${C} A 85,85 0 0,0 ${C+85},${C}" fill="none"/>
  <text fill="${color}" font-family="Arial, sans-serif" font-size="11" font-weight="bold" letter-spacing="1">
    <textPath href="#t1" startOffset="50%" text-anchor="middle">${escapeXml(top.toUpperCase().slice(0,38))}</textPath>
  </text>
  <text fill="${color}" font-family="Arial, sans-serif" font-size="9" letter-spacing="0.8">
    <textPath href="#b1" startOffset="50%" text-anchor="middle">${escapeXml(bottom.toUpperCase().slice(0,30))}</textPath>
  </text>
  <text x="${C-72}" y="${C+4}" fill="${color}" font-size="14" font-weight="bold">★</text>
  <text x="${C+62}" y="${C+4}" fill="${color}" font-size="14" font-weight="bold">★</text>
  <text x="${C}" y="${C-8}" fill="${color}" font-size="9" font-weight="bold" text-anchor="middle">${escapeXml(c1)}</text>
  <text x="${C}" y="${C+6}" fill="${color}" font-size="8" text-anchor="middle">${escapeXml(c2)}</text>
  ${c3 ? `<text x="${C}" y="${C+18}" fill="${color}" font-size="7" text-anchor="middle">${escapeXml(c3)}</text>` : ""}
</svg>`;
}

export function getVIStampSvg(): string {
  return buildStamp(VI_ORG.nom, VI_ORG.ville, `SIRET ${VI_ORG.siret}`, `NDA ${VI_ORG.nda}`, `UAI ${VI_ORG.uai}`);
}

export function getEntrepriseStampSvg(a: ViApprenti): string {
  return buildStamp(a.entreprise, a.entrepriseVille || "FRANCE", `SIRET`, a.entrepriseSiret, `NAF ${a.entrepriseNaf}`, "#7A0A0A");
}

export function svgToDataUri(svg: string): string {
  const enc = encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22");
  return `data:image/svg+xml;charset=utf-8,${enc}`;
}

/** Signature manuscrite simulée (path SVG) – déterministe par nom */
export function getSignatureSvg(name: string, color = "#0033A0"): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const r = (n: number) => ((h >> n) & 0xFF) / 255;
  const path = [
    `M 10 ${30 + r(0) * 10}`,
    `Q ${20 + r(2) * 10} ${10 + r(3) * 10}, ${35 + r(4) * 10} ${30 + r(5) * 10}`,
    `T ${70 + r(6) * 10} ${35 + r(7) * 10}`,
    `Q ${100 + r(8) * 10} ${15 + r(9) * 15}, ${130 + r(10) * 10} ${30 + r(11) * 10}`,
    `t ${20 + r(12) * 10} ${5 + r(13) * 10}`,
  ].join(" ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60" width="160" height="55">
    <path d="${path}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>
    <text x="5" y="55" font-family="'Brush Script MT', cursive" font-size="13" fill="${color}">${escapeXml(name)}</text>
  </svg>`;
}
