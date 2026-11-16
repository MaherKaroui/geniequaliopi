/**
 * Variantes de mise en page de l'attestation de réussite (CT3 - IND 11 / IND 16).
 * Le contenu (mentions L.6353-1, résultats, dates, cachet) est identique dans toutes les
 * variantes ; seul l'habillage change. Le choix est déterministe par stagiaire/formation :
 * deux stagiaires n'ont pas le même modèle, mais un même fichier reste identique d'un export à l'autre.
 */
export interface AttestationPieces {
  color: string;
  orgName: string;
  titre: string;        // "DE RÉUSSITE" | "DE FIN DE FORMATION"
  nomComplet: string;
  formationHtml: string; // phrases + intitulé + nature/dates
  detailsHtml: string;   // objectifs + résultats + mention légale
  signatureHtml: string; // cachet + signataire
  dateHtml: string;      // "Fait à …, le …"
}

export interface AttestationVariant {
  id: string;
  render: (p: AttestationPieces, intro: string, accent: string) => string;
}

const PAGE = "width:297mm;height:210mm;box-sizing:border-box;position:relative;background:#ffffff;overflow:hidden;";
const ACCENTS = ["#b8962e", "#475569", "#0f766e", "#8b1e3f", "#a16207", "#334155"];
const INTROS = ["Le présent document atteste que", "Nous certifions par la présente que", "Il est attesté que"];

function initiales(nom: string): string {
  return nom.split(/[\s'’-]+/).filter((w) => w.length > 2 || /^[A-Z]{2,}$/.test(w)).slice(0, 3).map((w) => w[0]).join("").toUpperCase() || nom.slice(0, 2).toUpperCase();
}

const bottom = (p: AttestationPieces, left = 26, right = 26) => `
  <div style="position:absolute;bottom:18mm;right:${right}mm;text-align:center">${p.signatureHtml}</div>
  <div style="position:absolute;bottom:18mm;left:${left}mm;font-size:11px;color:#555">${p.dateHtml}</div>`;

export const ATTESTATION_VARIANTS: AttestationVariant[] = [
  {
    id: "classique",
    render: (p, intro) => `
    <div style="${PAGE}padding:16mm 22mm;font-family:'Playfair Display', Georgia, serif;">
      <div style="position:absolute;top:8mm;left:8mm;right:8mm;bottom:8mm;border:4px double ${p.color};"></div>
      <div style="position:absolute;top:11mm;left:11mm;right:11mm;bottom:11mm;border:1px solid ${p.color};opacity:0.6;"></div>
      <div style="text-align:center;margin-top:2mm">
        <div style="font-size:10px;letter-spacing:5px;color:${p.color};font-weight:600;text-transform:uppercase">— ${p.orgName} —</div>
        <h1 style="font-size:34px;letter-spacing:5px;color:${p.color};margin:6px 0 2px;font-weight:700">ATTESTATION</h1>
        <div style="font-size:16px;letter-spacing:6px;color:${p.color};margin-bottom:4px">${p.titre}</div>
        <div style="width:100px;height:2px;background:${p.color};margin:6px auto 8px"></div>
        <p style="font-size:12px;color:#555;margin:0">${intro}</p>
      </div>
      <div style="text-align:center;margin:4mm 0 3mm;font-size:26px;color:#111;font-weight:700;letter-spacing:1px">${p.nomComplet}</div>
      <div style="text-align:center;font-size:12px;color:#333;line-height:1.5;max-width:235mm;margin:0 auto">${p.formationHtml}</div>
      <div style="font-size:10.5px;color:#333;line-height:1.4;max-width:235mm;margin:3mm auto 0;text-align:left">${p.detailsHtml}</div>
      ${bottom(p)}
    </div>`,
  },
  {
    id: "bandeau-lateral",
    render: (p, intro, accent) => `
    <div style="${PAGE}padding:16mm 20mm 16mm 48mm;font-family:'Lora', Georgia, serif;">
      <div style="position:absolute;top:0;left:0;bottom:0;width:30mm;background:${p.color};"></div>
      <div style="position:absolute;top:0;left:30mm;bottom:0;width:2mm;background:${accent};"></div>
      <div style="position:absolute;top:18mm;left:0;width:30mm;text-align:center;color:#ffffff;font-family:'Montserrat', Arial, sans-serif;font-size:26px;font-weight:700;letter-spacing:2px">${initiales(p.orgName)}</div>
      <div style="position:absolute;top:8mm;right:8mm;bottom:8mm;left:40mm;border:1px solid ${p.color};opacity:0.35;"></div>
      <div style="font-family:'Montserrat', Arial, sans-serif;font-size:10px;letter-spacing:4px;color:${accent};font-weight:600;text-transform:uppercase">${p.orgName}</div>
      <h1 style="font-family:'Montserrat', Arial, sans-serif;font-size:32px;letter-spacing:3px;color:${p.color};margin:6px 0 0;font-weight:700">ATTESTATION <span style="font-weight:400">${p.titre}</span></h1>
      <div style="width:70px;height:3px;background:${accent};margin:8px 0 8px"></div>
      <p style="font-size:12px;color:#555;margin:0">${intro}</p>
      <div style="margin:3mm 0 2mm;font-size:25px;color:#111;font-weight:700">${p.nomComplet}</div>
      <div style="font-size:12px;color:#333;line-height:1.5;max-width:220mm">${p.formationHtml}</div>
      <div style="font-size:10.5px;color:#333;line-height:1.4;max-width:220mm;margin-top:3mm">${p.detailsHtml}</div>
      ${bottom(p, 48, 22)}
    </div>`,
  },
  {
    id: "entete-pleine",
    render: (p, intro, accent) => `
    <div style="${PAGE}font-family:'Libre Baskerville', Georgia, serif;">
      <div style="background:${p.color};color:#ffffff;text-align:center;padding:9mm 20mm 7mm">
        <div style="font-size:10px;letter-spacing:5px;opacity:0.9;text-transform:uppercase">${p.orgName}</div>
        <h1 style="font-size:30px;letter-spacing:6px;margin:4px 0 2px;font-weight:700;color:#ffffff">ATTESTATION</h1>
        <div style="font-size:14px;letter-spacing:6px">${p.titre}</div>
      </div>
      <div style="height:2mm;background:${accent}"></div>
      <div style="position:absolute;top:42mm;left:8mm;right:8mm;bottom:8mm;border:1px solid ${p.color};border-top:none;opacity:0.45;"></div>
      <div style="padding:5mm 24mm 0">
        <p style="text-align:center;font-size:12px;color:#555;margin:0">${intro}</p>
        <div style="text-align:center;margin:3mm 0 2mm;font-size:24px;color:#111;font-weight:700;letter-spacing:1px">${p.nomComplet}</div>
        <div style="text-align:center;font-size:12px;color:#333;line-height:1.5">${p.formationHtml}</div>
        <div style="font-size:10.5px;color:#333;line-height:1.4;margin-top:3mm">${p.detailsHtml}</div>
      </div>
      ${bottom(p)}
    </div>`,
  },
  {
    id: "coins-ornes",
    render: (p, intro, accent) => {
      const c = (pos: string) => `<div style="position:absolute;${pos}width:26mm;height:26mm;"></div>`;
      return `
    <div style="${PAGE}padding:17mm 24mm;font-family:'Cormorant Garamond', Georgia, serif;background:#fdfcf8;">
      <div style="position:absolute;top:10mm;left:10mm;right:10mm;bottom:10mm;border:1px solid ${accent};"></div>
      ${c(`top:6mm;left:6mm;border-top:4px solid ${p.color};border-left:4px solid ${p.color};`)}
      ${c(`top:6mm;right:6mm;border-top:4px solid ${p.color};border-right:4px solid ${p.color};`)}
      ${c(`bottom:6mm;left:6mm;border-bottom:4px solid ${p.color};border-left:4px solid ${p.color};`)}
      ${c(`bottom:6mm;right:6mm;border-bottom:4px solid ${p.color};border-right:4px solid ${p.color};`)}
      <div style="text-align:center">
        <div style="font-size:12px;letter-spacing:4px;color:${accent};font-weight:700;text-transform:uppercase">${p.orgName}</div>
        <h1 style="font-size:40px;letter-spacing:4px;color:${p.color};margin:2px 0 0;font-weight:700">Attestation</h1>
        <div style="font-size:17px;letter-spacing:5px;color:${accent};font-style:italic">${p.titre.toLowerCase()}</div>
        <div style="margin:5px auto 6px;color:${accent};font-size:14px;letter-spacing:8px">◆ ◆ ◆</div>
        <p style="font-size:14px;color:#555;margin:0;font-style:italic">${intro}</p>
      </div>
      <div style="text-align:center;margin:3mm 0 2mm;font-size:30px;color:#111;font-weight:700">${p.nomComplet}</div>
      <div style="text-align:center;font-size:13px;color:#333;line-height:1.45;max-width:235mm;margin:0 auto">${p.formationHtml}</div>
      <div style="font-size:11.5px;color:#333;line-height:1.35;max-width:235mm;margin:3mm auto 0">${p.detailsHtml}</div>
      ${bottom(p)}
    </div>`;
    },
  },
  {
    id: "geometrique",
    render: (p, intro, accent) => `
    <div style="${PAGE}padding:16mm 26mm;font-family:'Raleway', Arial, sans-serif;">
      <div style="position:absolute;top:0;right:0;width:0;height:0;border-top:48mm solid ${p.color};border-left:48mm solid transparent;"></div>
      <div style="position:absolute;top:0;right:0;width:0;height:0;border-top:30mm solid ${accent};border-left:30mm solid transparent;"></div>
      <div style="position:absolute;bottom:0;left:0;width:0;height:0;border-bottom:40mm solid ${p.color};border-right:40mm solid transparent;opacity:0.9;"></div>
      <div style="font-size:10px;letter-spacing:4px;color:${p.color};font-weight:700;text-transform:uppercase">${p.orgName}</div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:6px">
        <div style="width:6px;height:46px;background:${accent}"></div>
        <div>
          <h1 style="font-size:34px;letter-spacing:2px;color:#111;margin:0;font-weight:700;font-family:'Montserrat', Arial, sans-serif">ATTESTATION</h1>
          <div style="font-size:14px;letter-spacing:5px;color:${p.color};font-weight:600">${p.titre}</div>
        </div>
      </div>
      <p style="font-size:12px;color:#555;margin:6mm 0 0">${intro}</p>
      <div style="margin:2mm 0 2mm;font-size:26px;color:${p.color};font-weight:700;font-family:'Montserrat', Arial, sans-serif">${p.nomComplet}</div>
      <div style="font-size:12px;color:#333;line-height:1.5;max-width:225mm">${p.formationHtml}</div>
      <div style="font-size:10.5px;color:#333;line-height:1.4;max-width:225mm;margin-top:3mm">${p.detailsHtml}</div>
      ${bottom(p, 48)}
    </div>`,
  },
  {
    id: "medaillon",
    render: (p, intro, accent) => `
    <div style="${PAGE}padding:16mm 24mm;font-family:'EB Garamond', Georgia, serif;">
      <div style="position:absolute;top:9mm;left:9mm;right:9mm;bottom:9mm;border:2px solid ${p.color};border-radius:6mm;"></div>
      <div style="position:absolute;top:12mm;left:12mm;right:12mm;bottom:12mm;border:1px dashed ${accent};border-radius:4mm;opacity:0.7;"></div>
      <div style="text-align:center">
        <div style="font-size:11px;letter-spacing:5px;color:${p.color};font-weight:600;text-transform:uppercase">${p.orgName}</div>
        <h1 style="font-size:36px;letter-spacing:7px;color:${p.color};margin:4px 0 0;font-weight:700">ATTESTATION</h1>
        <div style="font-size:15px;letter-spacing:6px;color:${accent};font-weight:600">${p.titre}</div>
        <p style="font-size:13px;color:#555;margin:6px 0 0">${intro}</p>
      </div>
      <div style="text-align:center;margin:3mm 0 2mm;font-size:28px;color:#111;font-weight:700;letter-spacing:1px">${p.nomComplet}</div>
      <div style="text-align:center;font-size:12.5px;color:#333;line-height:1.5;max-width:235mm;margin:0 auto">${p.formationHtml}</div>
      <div style="font-size:11px;color:#333;line-height:1.4;max-width:235mm;margin:3mm auto 0">${p.detailsHtml}</div>
      <div style="position:absolute;bottom:16mm;left:135mm;width:27mm;height:27mm;border-radius:50%;border:3px double ${accent};display:flex;align-items:center;justify-content:center;text-align:center;color:${accent};font-weight:700;font-size:15px;letter-spacing:2px;line-height:1.2">${initiales(p.orgName)}<br><span style="font-size:9px">★ ★ ★</span></div>
      ${bottom(p)}
    </div>`,
  },
];

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/** Choix déterministe : même stagiaire + même formation → même modèle ; stagiaires voisins → modèles différents. */
export function choisirDesignAttestation(cle: string, rang = 0) {
  const h = hash(cle);
  const variant = ATTESTATION_VARIANTS[(h + rang) % ATTESTATION_VARIANTS.length];
  const accent = ACCENTS[(h >>> 8) % ACCENTS.length];
  const intro = INTROS[(h >>> 16) % INTROS.length];
  return { variant, accent, intro };
}

export function renderAttestationReussite(p: AttestationPieces, cle: string, rang = 0): string {
  const { variant, accent, intro } = choisirDesignAttestation(cle, rang);
  return `<!-- design:${variant.id} -->` + variant.render(p, intro, accent);
}
