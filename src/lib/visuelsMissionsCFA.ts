import type { OrganismeInfo } from "@/types/qualiopi";

/**
 * Génère un visuel HTML A4 paysage pour une mission CFA.
 * L'image source (poster figé) est utilisée en arrière-plan, et un bandeau
 * blanc centré en haut affiche dynamiquement le nom de l'organisme à la
 * place de "CFA PERFORMER SCHOOL".
 */
export function genVisuelMissionCFA(
  org: OrganismeInfo,
  imageUrl: string,
  missionTitre: string,
): string {
  const orgName = (org.nom || "").toUpperCase();
  const safeTitre = missionTitre.replace(/&/g, "&amp;").replace(/</g, "&lt;");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="pdf-page-size" content="297x210">
<title>${safeTitre} – ${orgName}</title>
<style>
  @page { size: A4 landscape; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 297mm; height: 210mm; overflow: hidden; background: #fff; }
  .visuel {
    position: relative;
    width: 297mm;
    height: 210mm;
  }
  .visuel img.bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }
  /* Bandeau blanc qui masque le "CFA PERFORMER SCHOOL" original
     (zone centrale en haut) puis affiche le nom de l'organisme */
  .org-mask {
    position: absolute;
    top: 5mm;
    left: 50%;
    transform: translateX(-50%);
    background: #ffffff;
    padding: 6mm 18mm;
    border-radius: 4mm;
    box-shadow: 0 2mm 4mm rgba(0,0,0,0.08);
    border: 1px solid rgba(0,0,0,0.05);
    z-index: 5;
    max-width: 220mm;
    text-align: center;
  }
  .org-mask .org-name {
    font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
    color: #1e3a8a;
    font-weight: 900;
    font-size: 28pt;
    letter-spacing: 0.5pt;
    line-height: 1;
    white-space: nowrap;
  }
  .org-mask .org-name.long { font-size: 22pt; }
  .org-mask .org-name.xlong { font-size: 17pt; }
</style>
</head>
<body>
  <div class="visuel">
    <img class="bg" src="${imageUrl}" alt="${safeTitre}" crossorigin="anonymous" />
    <div class="org-mask">
      <div class="org-name ${orgName.length > 28 ? "xlong" : orgName.length > 20 ? "long" : ""}">${orgName || "ORGANISME"}</div>
    </div>
  </div>
</body>
</html>`;
}
