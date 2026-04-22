import type { OrganismeInfo } from "@/types/qualiopi";

/**
 * Visuel HTML A4 paysage moderne/minimaliste pour une mission CFA.
 * - Bandeau gauche : numéro de mission, titre fort, nom de l'organisme dynamique
 * - Illustration IA à droite (fond blanc)
 * - Palette de couleurs propre à chaque mission
 */

interface MissionPalette {
  num: number;
  titrePrincipal: string;
  sousTitre: string;
  bg: string;       // couleur de fond du bandeau gauche
  bgSoft: string;   // dégradé pour côté droit
  accent: string;   // couleur d'accent (n° mission, ligne)
  textOnBg: string; // couleur du texte sur le bandeau
}

const PALETTES: Record<number, MissionPalette> = {
  1:  { num: 1,  titrePrincipal: "ORIENTATION",      sousTitre: "& HANDICAP",                        bg: "#1E3A8A", bgSoft: "#EFF4FF", accent: "#60A5FA", textOnBg: "#FFFFFF" },
  2:  { num: 2,  titrePrincipal: "MIXITÉ",           sousTitre: "DES MÉTIERS",                       bg: "#7C3AED", bgSoft: "#F3EEFE", accent: "#C4B5FD", textOnBg: "#FFFFFF" },
  3:  { num: 3,  titrePrincipal: "COOPÉRATION",      sousTitre: "CFA / ENTREPRISE",                  bg: "#0E7490", bgSoft: "#ECFEFF", accent: "#67E8F9", textOnBg: "#FFFFFF" },
  4:  { num: 4,  titrePrincipal: "ACTIVITÉS",        sousTitre: "CITOYENNES & CULTURELLES",          bg: "#B45309", bgSoft: "#FEF6E7", accent: "#FCD34D", textOnBg: "#FFFFFF" },
  5:  { num: 5,  titrePrincipal: "RUPTURE",          sousTitre: "DE CONTRAT",                        bg: "#B91C1C", bgSoft: "#FEF2F2", accent: "#FCA5A5", textOnBg: "#FFFFFF" },
  6:  { num: 6,  titrePrincipal: "AIDES",            sousTitre: "SOCIALES",                          bg: "#15803D", bgSoft: "#F0FDF4", accent: "#86EFAC", textOnBg: "#FFFFFF" },
  7:  { num: 7,  titrePrincipal: "ACCOMPAGNEMENT",   sousTitre: "ÉDUCATIF & SOCIAL",                 bg: "#C2410C", bgSoft: "#FFF7ED", accent: "#FDBA74", textOnBg: "#FFFFFF" },
  8:  { num: 8,  titrePrincipal: "INSERTION",        sousTitre: "PROFESSIONNELLE",                   bg: "#1D4ED8", bgSoft: "#EFF6FF", accent: "#93C5FD", textOnBg: "#FFFFFF" },
  9:  { num: 9,  titrePrincipal: "MOBILITÉ",         sousTitre: "INTERNATIONALE — ERASMUS+",         bg: "#1E40AF", bgSoft: "#FEFCE8", accent: "#FACC15", textOnBg: "#FFFFFF" },
  10: { num: 10, titrePrincipal: "MOBILITÉ",         sousTitre: "NATIONALE",                         bg: "#0F766E", bgSoft: "#F0FDFA", accent: "#5EEAD4", textOnBg: "#FFFFFF" },
  11: { num: 11, titrePrincipal: "AIDE À LA",        sousTitre: "RECHERCHE D'EMPLOYEUR",             bg: "#EA580C", bgSoft: "#FFF7ED", accent: "#FDBA74", textOnBg: "#FFFFFF" },
  12: { num: 12, titrePrincipal: "ACCUEIL",          sousTitre: "TOUTE L'ANNÉE",                     bg: "#16A34A", bgSoft: "#F0FDF4", accent: "#86EFAC", textOnBg: "#FFFFFF" },
  13: { num: 13, titrePrincipal: "FORMATION",        sousTitre: "DES MAÎTRES D'APPRENTISSAGE",       bg: "#9A3412", bgSoft: "#FFFBEB", accent: "#FCD34D", textOnBg: "#FFFFFF" },
  14: { num: 14, titrePrincipal: "CONSEIL DE",       sousTitre: "PERFECTIONNEMENT",                  bg: "#6D28D9", bgSoft: "#FAF5FF", accent: "#C4B5FD", textOnBg: "#FFFFFF" },
};

export function genVisuelMissionCFA(
  org: OrganismeInfo,
  imageUrl: string,
  missionTitre: string,
): string {
  // Détecte le numéro de mission depuis le nom de l'image (illu_m1.jpg → 1)
  const m = imageUrl.match(/illu_m(\d+)/);
  const missionNum = m ? parseInt(m[1], 10) : 1;
  const p = PALETTES[missionNum] || PALETTES[1];

  const orgName = (org.nom || "ORGANISME").toUpperCase();
  const orgClass = orgName.length > 28 ? "xlong" : orgName.length > 20 ? "long" : "";
  const safeTitre = missionTitre.replace(/&/g, "&amp;");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="pdf-page-size" content="297x210">
<title>${safeTitre} – ${orgName}</title>
<style>
  @page { size: A4 landscape; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 297mm; height: 210mm; overflow: hidden;
    background: #ffffff;
    font-family: "Helvetica Neue", Arial, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .poster {
    position: relative;
    width: 297mm; height: 210mm;
    display: grid;
    grid-template-columns: 145mm 152mm;
  }
  /* === BANDEAU GAUCHE === */
  .left {
    position: relative;
    background: ${p.bg};
    color: ${p.textOnBg};
    padding: 22mm 18mm 18mm 22mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  /* Cercle décoratif en arrière-plan */
  .left::before {
    content: "";
    position: absolute;
    width: 180mm; height: 180mm;
    border-radius: 50%;
    background: ${p.accent};
    opacity: 0.18;
    top: -90mm; left: -90mm;
  }
  .left::after {
    content: "";
    position: absolute;
    width: 100mm; height: 100mm;
    border-radius: 50%;
    background: ${p.accent};
    opacity: 0.12;
    bottom: -50mm; right: -50mm;
  }
  .org-badge {
    position: relative;
    z-index: 2;
    display: inline-block;
    background: rgba(255,255,255,0.18);
    border: 1.5px solid rgba(255,255,255,0.35);
    color: #ffffff;
    font-weight: 700;
    font-size: 11pt;
    letter-spacing: 1.5pt;
    padding: 3mm 6mm;
    border-radius: 2mm;
    text-transform: uppercase;
    max-width: 100mm;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .org-badge.long { font-size: 9.5pt; letter-spacing: 1pt; }
  .org-badge.xlong { font-size: 8pt; letter-spacing: 0.5pt; }

  .mission-block { position: relative; z-index: 2; }
  .mission-num {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-weight: 300;
    font-size: 18pt;
    letter-spacing: 4pt;
    opacity: 0.85;
    margin-bottom: 4mm;
    text-transform: uppercase;
  }
  .mission-num strong { font-weight: 800; font-size: 22pt; color: ${p.accent}; }
  .titre-principal {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-weight: 900;
    font-size: 46pt;
    line-height: 0.95;
    letter-spacing: -0.5pt;
    margin-bottom: 2mm;
  }
  .sous-titre {
    font-family: "Helvetica Neue", Arial, sans-serif;
    font-weight: 700;
    font-size: 22pt;
    line-height: 1;
    letter-spacing: 0.5pt;
    opacity: 0.95;
  }
  .accent-line {
    position: relative; z-index: 2;
    width: 30mm; height: 2.5mm;
    background: ${p.accent};
    border-radius: 1.5mm;
    margin-top: 8mm;
  }
  .footer-left {
    position: relative; z-index: 2;
    font-size: 9pt;
    opacity: 0.75;
    letter-spacing: 0.5pt;
    text-transform: uppercase;
  }

  /* === ZONE DROITE === */
  .right {
    position: relative;
    background: linear-gradient(135deg, #ffffff 0%, ${p.bgSoft} 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18mm 14mm;
    overflow: hidden;
  }
  .right::before {
    content: "";
    position: absolute;
    width: 90mm; height: 90mm;
    border-radius: 50%;
    background: ${p.accent};
    opacity: 0.25;
    top: -30mm; right: -30mm;
  }
  .right::after {
    content: "";
    position: absolute;
    width: 60mm; height: 60mm;
    border-radius: 50%;
    background: ${p.accent};
    opacity: 0.15;
    bottom: -20mm; left: -10mm;
  }
  .illu-wrap {
    position: relative; z-index: 2;
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
  }
  .illu-wrap img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 4mm 8mm rgba(0,0,0,0.08));
  }
</style>
</head>
<body>
  <div class="poster">
    <div class="left">
      <div class="org-badge ${orgClass}">${orgName}</div>
      <div class="mission-block">
        <div class="mission-num">Mission <strong>${p.num}</strong></div>
        <div class="titre-principal">${p.titrePrincipal}</div>
        <div class="sous-titre">${p.sousTitre}</div>
        <div class="accent-line"></div>
      </div>
      <div class="footer-left">Centre de Formation d'Apprentis · Art. L6231-2</div>
    </div>
    <div class="right">
      <div class="illu-wrap">
        <img src="${imageUrl}" alt="${safeTitre}" crossorigin="anonymous" />
      </div>
    </div>
  </div>
</body>
</html>`;
}
