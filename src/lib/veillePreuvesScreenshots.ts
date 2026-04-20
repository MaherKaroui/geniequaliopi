// Génère des "captures d'écran" HTML automatiques pour CHAQUE ligne
// de la veille réglementaire de la formation (Indicateur 23).
// La fonction lit les lignes réelles de veille (cache IA en priorité,
// sinon les lignes hardcodées par type de formation) et produit
// une capture adaptée à la source détectée via l'URL.

import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { getCachedVeillePack, AIVeilleRow } from "./aiVeillePack";
import { getVeilleReglementaireRowsForFormation } from "./templatesCritere6";

// ---------- Helpers ----------
function stripTags(s: string): string {
  return (s || "").replace(/<[^>]+>/g, "").trim();
}

function extractHref(html: string): string {
  const m = (html || "").match(/href="([^"]+)"/i);
  return m ? m[1] : "";
}

function extractLinkText(html: string): string {
  const m = (html || "").match(/>([^<]+)</);
  return m ? m[1].trim() : stripTags(html);
}

interface VeilleEntry {
  url: string;
  sourceLabel: string;
  titre: string;
  date: string;
  description: string;
  exploitation: string;
}

function rowToEntry(row: string[]): VeilleEntry {
  return {
    url: extractHref(row[0] || ""),
    sourceLabel: extractLinkText(row[0] || ""),
    titre: stripTags(row[1] || ""),
    date: stripTags(row[2] || ""),
    description: stripTags(row[3] || ""),
    exploitation: stripTags(row[4] || ""),
  };
}

function aiRowToEntry(r: AIVeilleRow): VeilleEntry {
  return {
    url: r.lien || "",
    sourceLabel: r.titreLien || "",
    titre: r.titre || "",
    date: r.date || "",
    description: r.commentaire || "",
    exploitation: r.exploitation || "",
  };
}

// ---------- Détection de la source ----------
type SourceKind =
  | "legifrance"
  | "ministere"
  | "centre-inffo"
  | "france-competences"
  | "dreets"
  | "cnil"
  | "moncompteformation"
  | "dendreo"
  | "dgccrf"
  | "generic";

function detectSource(url: string, label: string): SourceKind {
  const u = (url + " " + label).toLowerCase();
  if (u.includes("legifrance")) return "legifrance";
  if (u.includes("travail-emploi") || u.includes("ministère") || u.includes("ministere")) return "ministere";
  if (u.includes("centre-inffo")) return "centre-inffo";
  if (u.includes("francecompetences") || u.includes("france-competences") || u.includes("france compétences")) return "france-competences";
  if (u.includes("dreets") || u.includes("driee")) return "dreets";
  if (u.includes("cnil")) return "cnil";
  if (u.includes("moncompteformation") || u.includes("mcf")) return "moncompteformation";
  if (u.includes("dendreo")) return "dendreo";
  if (u.includes("dgccrf") || u.includes("economie.gouv")) return "dgccrf";
  return "generic";
}

// ---------- Templates de captures ----------
function captureLegifrance(o: OrganismeInfo, e: VeilleEntry): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:'Marianne',Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:12px 24px;border-bottom:3px solid #000091;display:flex;align-items:center;gap:14px">
    <div style="display:flex;flex-direction:column;line-height:1">
      <span style="font-size:11px;font-weight:700;letter-spacing:1px">RÉPUBLIQUE</span>
      <span style="font-size:11px;font-weight:700;letter-spacing:1px">FRANÇAISE</span>
      <span style="font-size:9px;font-style:italic;color:#666;margin-top:2px">Liberté · Égalité · Fraternité</span>
    </div>
    <div style="height:42px;width:1px;background:#ddd"></div>
    <div style="font-size:24px;font-weight:700;color:#000091;letter-spacing:0.5px">Légifrance</div>
    <div style="margin-left:auto;font-size:11px;color:#666">Le service public de la diffusion du droit</div>
  </div>
  <div style="background:#f6f6f6;padding:8px 24px;font-size:11px;color:#444;border-bottom:1px solid #e5e5e5;word-break:break-all">
    ${e.url || "legifrance.gouv.fr"}
  </div>
  <div style="padding:24px 30px">
    <div style="background:#000091;color:#fff;display:inline-block;padding:4px 10px;font-size:11px;font-weight:600;margin-bottom:10px">EN VIGUEUR</div>
    <h1 style="font-size:20px;color:#161616;margin:0 0 6px;font-weight:700;line-height:1.3">${e.titre}</h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">${e.date} · Source : ${e.sourceLabel}</div>
    <div style="font-size:13px;line-height:1.7;color:#161616;border-left:3px solid #000091;padding:8px 16px;background:#f9f9fc;margin-bottom:18px">
      ${e.description}
    </div>
    <div style="display:flex;gap:10px;margin-bottom:16px">
      <div style="background:#000091;color:#fff;padding:8px 16px;font-size:12px;border-radius:2px">📥 Télécharger le PDF</div>
      <div style="border:1px solid #000091;color:#000091;padding:8px 16px;font-size:12px;border-radius:2px">🔗 Lien permanent</div>
      <div style="border:1px solid #000091;color:#000091;padding:8px 16px;font-size:12px;border-radius:2px">⭐ Mes favoris</div>
    </div>
    <div style="background:#fff8e1;border-left:3px solid #f4c542;padding:10px 14px;font-size:11px;color:#5a4a00">
      <strong>Exploitation chez ${o.nom} :</strong> ${e.exploitation}
    </div>
  </div>
</div>`;
}

function captureMinistere(o: OrganismeInfo, e: VeilleEntry): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:'Marianne',Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:12px 24px;border-bottom:3px solid #000091;display:flex;align-items:center;gap:14px">
    <div style="display:flex;flex-direction:column;line-height:1">
      <span style="font-size:11px;font-weight:700;letter-spacing:1px">RÉPUBLIQUE</span>
      <span style="font-size:11px;font-weight:700;letter-spacing:1px">FRANÇAISE</span>
    </div>
    <div style="height:42px;width:1px;background:#ddd"></div>
    <div style="font-size:14px;font-weight:600;color:#161616;line-height:1.3">
      Ministère du Travail,<br/>de la Santé, des Solidarités et des Familles
    </div>
  </div>
  <div style="background:#f6f6f6;padding:8px 24px;font-size:11px;color:#444;border-bottom:1px solid #e5e5e5;word-break:break-all">
    ${e.url || "travail-emploi.gouv.fr"}
  </div>
  <div style="padding:26px 30px">
    <div style="font-size:11px;color:#000091;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Publication officielle</div>
    <h1 style="font-size:22px;color:#161616;margin:0 0 10px;font-weight:700;line-height:1.25">${e.titre}</h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">${e.date}</div>
    <div style="display:flex;gap:14px;margin-bottom:18px">
      <div style="background:#000091;color:#fff;padding:10px 18px;font-size:12px;font-weight:600;border-radius:2px">📄 Télécharger le guide (PDF)</div>
      <div style="border:1px solid #000091;color:#000091;padding:10px 18px;font-size:12px;border-radius:2px">🔔 S'abonner aux mises à jour</div>
    </div>
    <div style="background:#f6f6f6;padding:14px 18px;border-left:3px solid #000091;font-size:12px;line-height:1.6;color:#333;margin-bottom:14px">
      ${e.description}
    </div>
    <div style="background:#e8f0fe;border:1px solid #c2d4f5;padding:12px 16px;font-size:11px;color:#1e3a8a;border-radius:3px">
      <strong>Exploitation chez ${o.nom} :</strong> ${e.exploitation}
    </div>
  </div>
</div>`;
}

function captureCentreInffo(o: OrganismeInfo, e: VeilleEntry): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:Georgia,'Times New Roman',serif;background:#fff;overflow:hidden">
  <div style="background:#003c71;padding:14px 24px;color:#fff;display:flex;align-items:center;gap:14px">
    <div style="background:#fff;color:#003c71;padding:5px 10px;font-weight:700;font-size:14px;font-family:Arial,sans-serif">CENTRE INFFO</div>
    <span style="font-size:12px;font-family:Arial,sans-serif">L'expertise au service de la formation</span>
    <div style="margin-left:auto;font-size:11px;font-family:Arial,sans-serif">Actualités · Droit</div>
  </div>
  <div style="background:#f0f3f7;padding:8px 24px;font-size:11px;color:#444;font-family:Arial,sans-serif;word-break:break-all">
    ${e.url || "centre-inffo.fr"}
  </div>
  <div style="padding:26px 32px">
    <div style="font-size:11px;color:#003c71;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;margin-bottom:8px">Actualité réglementaire</div>
    <h1 style="font-size:24px;color:#1a1a1a;margin:0 0 8px;line-height:1.25;font-weight:700">${e.titre}</h1>
    <div style="font-size:11px;color:#888;margin-bottom:16px;font-family:Arial,sans-serif">${e.date} · Par la rédaction de Centre Inffo</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px">
      ${e.description}
    </div>
    <div style="display:flex;gap:10px;font-family:Arial,sans-serif;margin-bottom:14px">
      <div style="background:#003c71;color:#fff;padding:8px 16px;font-size:12px">📧 Newsletter</div>
      <div style="border:1px solid #003c71;color:#003c71;padding:8px 16px;font-size:12px">💾 Sauvegarder</div>
      <div style="border:1px solid #003c71;color:#003c71;padding:8px 16px;font-size:12px">🖨️ Imprimer</div>
    </div>
    <div style="background:#fff8e1;border-left:3px solid #f4c542;padding:10px 14px;font-size:11px;color:#5a4a00;font-family:Arial,sans-serif">
      <strong>Exploitation chez ${o.nom} :</strong> ${e.exploitation}
    </div>
  </div>
</div>`;
}

function captureFranceCompetences(o: OrganismeInfo, e: VeilleEntry): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:14px 24px;border-bottom:3px solid #003DA5;display:flex;align-items:center;gap:14px">
    <div style="display:flex;align-items:center;gap:6px">
      <div style="width:26px;height:26px;background:#003DA5;border-radius:50%"></div>
      <div style="width:26px;height:26px;background:#0077CC;border-radius:50%"></div>
      <div style="width:26px;height:26px;background:#00AACC;border-radius:50%"></div>
    </div>
    <div style="font-weight:bold;color:#003DA5;font-size:18px;line-height:1">FRANCE<br/>compétences</div>
    <div style="margin-left:auto;font-size:11px;color:#666">L'agence de la formation professionnelle</div>
  </div>
  <div style="background:#f6f6f6;padding:8px 24px;font-size:11px;color:#444;word-break:break-all">
    ${e.url || "francecompetences.fr"}
  </div>
  <div style="padding:26px 32px">
    <div style="background:#003DA5;color:#fff;display:inline-block;padding:4px 12px;font-size:11px;font-weight:600;margin-bottom:10px;border-radius:2px">NOTE D'INFORMATION</div>
    <h1 style="font-size:22px;color:#161616;margin:0 0 8px;font-weight:700;line-height:1.25">${e.titre}</h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">${e.date} · Direction de la certification professionnelle</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px">
      ${e.description}
    </div>
    <div style="background:#e8f0fe;border:1px solid #c2d4f5;padding:12px 16px;font-size:12px;color:#003DA5;border-radius:3px;margin-bottom:14px">
      🔎 <strong>Exploitation chez ${o.nom} :</strong> ${e.exploitation}
    </div>
    <div style="display:flex;gap:10px">
      <div style="background:#003DA5;color:#fff;padding:9px 16px;font-size:12px;border-radius:20px">📥 Télécharger la note</div>
      <div style="border:2px solid #003DA5;color:#003DA5;padding:8px 16px;font-size:12px;border-radius:20px">🔔 S'abonner</div>
    </div>
  </div>
</div>`;
}

function captureDREETS(o: OrganismeInfo, e: VeilleEntry): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:'Marianne',Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:12px 24px;border-bottom:3px solid #000091;display:flex;align-items:center;gap:12px">
    <div style="display:flex;flex-direction:column;line-height:1">
      <span style="font-size:10px;font-weight:700;letter-spacing:1px">RÉPUBLIQUE</span>
      <span style="font-size:10px;font-weight:700;letter-spacing:1px">FRANÇAISE</span>
    </div>
    <div style="height:38px;width:1px;background:#ddd"></div>
    <div style="font-weight:700;color:#000091;font-size:14px">DREETS</div>
    <span style="font-size:11px;color:#666">Direction Régionale de l'Économie, de l'Emploi, du Travail et des Solidarités</span>
  </div>
  <div style="background:#f6f6f6;padding:8px 24px;font-size:11px;color:#444;word-break:break-all">
    ${e.url || "dreets.gouv.fr"}
  </div>
  <div style="padding:24px 30px">
    <div style="background:#fde7e7;color:#a30000;display:inline-block;padding:4px 12px;font-size:11px;font-weight:700;margin-bottom:10px">⚠️ NOTE DE SERVICE</div>
    <h1 style="font-size:21px;color:#161616;margin:0 0 8px;font-weight:700;line-height:1.25">${e.titre}</h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">${e.date}</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px">
      ${e.description}
    </div>
    <div style="background:#fff8e1;border-left:3px solid #f4c542;padding:10px 14px;font-size:11px;color:#5a4a00">
      <strong>Exploitation chez ${o.nom} :</strong> ${e.exploitation}
    </div>
  </div>
</div>`;
}

function captureCNIL(o: OrganismeInfo, e: VeilleEntry): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:14px 24px;border-bottom:3px solid #00006e;display:flex;align-items:center;gap:14px">
    <div style="background:#00006e;color:#fff;padding:8px 14px;font-weight:700;font-size:18px;letter-spacing:1px">CNIL</div>
    <span style="font-size:12px;color:#444">Commission Nationale de l'Informatique et des Libertés</span>
    <div style="margin-left:auto;font-size:11px;color:#888">cnil.fr</div>
  </div>
  <div style="background:#f6f6f6;padding:8px 24px;font-size:11px;color:#444;word-break:break-all">
    ${e.url || "cnil.fr"}
  </div>
  <div style="padding:26px 32px">
    <div style="font-size:11px;color:#00006e;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">Recommandation</div>
    <h1 style="font-size:22px;color:#161616;margin:0 0 8px;font-weight:700;line-height:1.25">${e.titre}</h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">${e.date}</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px">
      ${e.description}
    </div>
    <div style="background:#f0f0fa;border-left:3px solid #00006e;padding:12px 16px;font-size:12px;color:#333;margin-bottom:14px">
      📋 <strong>Exploitation chez ${o.nom} :</strong> ${e.exploitation}
    </div>
    <div style="display:flex;gap:10px">
      <div style="background:#00006e;color:#fff;padding:9px 16px;font-size:12px">📄 Télécharger la recommandation</div>
      <div style="border:1px solid #00006e;color:#00006e;padding:8px 16px;font-size:12px">🔗 Voir sur cnil.fr</div>
    </div>
  </div>
</div>`;
}

function captureMonCompteFormation(o: OrganismeInfo, e: VeilleEntry): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:'Marianne',Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:14px 24px;border-bottom:3px solid #e1000f;display:flex;align-items:center;gap:14px">
    <div style="background:#e1000f;color:#fff;padding:8px 14px;font-weight:700;font-size:14px">Mon Compte Formation</div>
    <span style="font-size:12px;color:#444">Espace Organismes de formation</span>
    <div style="margin-left:auto;font-size:11px;color:#888">moncompteformation.gouv.fr</div>
  </div>
  <div style="background:#f6f6f6;padding:8px 24px;font-size:11px;color:#444;word-break:break-all">
    ${e.url || "of.moncompteformation.gouv.fr"}
  </div>
  <div style="padding:26px 32px">
    <div style="background:#e1000f;color:#fff;display:inline-block;padding:4px 12px;font-size:11px;font-weight:700;margin-bottom:10px">ACTUALITÉ EDOF</div>
    <h1 style="font-size:22px;color:#161616;margin:0 0 8px;font-weight:700;line-height:1.25">${e.titre}</h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">${e.date} · Caisse des Dépôts</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px">
      ${e.description}
    </div>
    <div style="background:#fde7e7;border-left:3px solid #e1000f;padding:12px 16px;font-size:12px;color:#5a0000">
      <strong>Exploitation chez ${o.nom} :</strong> ${e.exploitation}
    </div>
  </div>
</div>`;
}

function captureDendreo(o: OrganismeInfo, e: VeilleEntry): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:'Helvetica Neue',Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#1a1a2e;padding:14px 24px;color:#fff;display:flex;align-items:center;gap:14px">
    <div style="background:#7c3aed;color:#fff;padding:6px 12px;font-weight:700;font-size:16px;border-radius:4px">Dendreo</div>
    <span style="font-size:12px">Le blog de la formation professionnelle</span>
    <div style="margin-left:auto;font-size:11px;opacity:0.8">dendreo.com/blog</div>
  </div>
  <div style="background:#f5f5fa;padding:8px 24px;font-size:11px;color:#444;word-break:break-all">
    ${e.url || "dendreo.com"}
  </div>
  <div style="padding:26px 32px">
    <div style="font-size:11px;color:#7c3aed;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px">Veille formation pro</div>
    <h1 style="font-size:23px;color:#1a1a2e;margin:0 0 8px;font-weight:700;line-height:1.25">${e.titre}</h1>
    <div style="font-size:12px;color:#888;margin-bottom:16px">${e.date} · 8 min de lecture</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px">
      ${e.description}
    </div>
    <div style="background:#f3eeff;border-left:3px solid #7c3aed;padding:12px 16px;font-size:12px;color:#3b1976">
      <strong>Exploitation chez ${o.nom} :</strong> ${e.exploitation}
    </div>
  </div>
</div>`;
}

function captureDGCCRF(o: OrganismeInfo, e: VeilleEntry): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:'Marianne',Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#fff;padding:12px 24px;border-bottom:3px solid #000091;display:flex;align-items:center;gap:14px">
    <div style="display:flex;flex-direction:column;line-height:1">
      <span style="font-size:11px;font-weight:700;letter-spacing:1px">RÉPUBLIQUE</span>
      <span style="font-size:11px;font-weight:700;letter-spacing:1px">FRANÇAISE</span>
    </div>
    <div style="height:42px;width:1px;background:#ddd"></div>
    <div style="font-weight:700;color:#000091;font-size:14px">DGCCRF</div>
    <span style="font-size:11px;color:#666">Direction générale de la concurrence, de la consommation et de la répression des fraudes</span>
  </div>
  <div style="background:#f6f6f6;padding:8px 24px;font-size:11px;color:#444;word-break:break-all">
    ${e.url || "economie.gouv.fr/dgccrf"}
  </div>
  <div style="padding:26px 32px">
    <div style="font-size:11px;color:#000091;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Fiche pratique</div>
    <h1 style="font-size:22px;color:#161616;margin:0 0 8px;font-weight:700;line-height:1.25">${e.titre}</h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">${e.date}</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px">
      ${e.description}
    </div>
    <div style="background:#e8f0fe;border-left:3px solid #000091;padding:12px 16px;font-size:12px;color:#1e3a8a">
      <strong>Exploitation chez ${o.nom} :</strong> ${e.exploitation}
    </div>
  </div>
</div>`;
}

function captureGeneric(o: OrganismeInfo, e: VeilleEntry): string {
  return `
<div style="border:1px solid #ccc;max-width:760px;margin:20px auto;font-family:Arial,sans-serif;background:#fff;overflow:hidden">
  <div style="background:#1e3a7b;padding:14px 24px;color:#fff;display:flex;align-items:center;gap:14px">
    <div style="font-weight:700;font-size:16px">${e.sourceLabel || "Source veille"}</div>
    <div style="margin-left:auto;font-size:11px;opacity:0.85">${(e.url || "").replace(/^https?:\/\//, "").split("/")[0]}</div>
  </div>
  <div style="background:#f6f6f6;padding:8px 24px;font-size:11px;color:#444;word-break:break-all">
    ${e.url || "—"}
  </div>
  <div style="padding:26px 32px">
    <div style="font-size:11px;color:#1e3a7b;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">Article / Publication</div>
    <h1 style="font-size:22px;color:#161616;margin:0 0 8px;font-weight:700;line-height:1.25">${e.titre}</h1>
    <div style="font-size:12px;color:#666;margin-bottom:16px">${e.date}</div>
    <div style="font-size:13px;line-height:1.7;color:#333;margin-bottom:14px">
      ${e.description}
    </div>
    <div style="background:#eef2ff;border-left:3px solid #1e3a7b;padding:12px 16px;font-size:12px;color:#1e3a7b">
      <strong>Exploitation chez ${o.nom} :</strong> ${e.exploitation}
    </div>
  </div>
</div>`;
}

function renderCapture(o: OrganismeInfo, e: VeilleEntry): string {
  const kind = detectSource(e.url, e.sourceLabel);
  switch (kind) {
    case "legifrance": return captureLegifrance(o, e);
    case "ministere": return captureMinistere(o, e);
    case "centre-inffo": return captureCentreInffo(o, e);
    case "france-competences": return captureFranceCompetences(o, e);
    case "dreets": return captureDREETS(o, e);
    case "cnil": return captureCNIL(o, e);
    case "moncompteformation": return captureMonCompteFormation(o, e);
    case "dendreo": return captureDendreo(o, e);
    case "dgccrf": return captureDGCCRF(o, e);
    default: return captureGeneric(o, e);
  }
}

// ---------- Wrapper ----------
const wrapRaw = (inner: string) =>
  `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{margin:0;padding:0;background:#fff;font-family:Arial,sans-serif}
    @page{margin:0}
  </style></head><body>${inner}</body></html>`;

// =====================================================
// Générateur principal : une capture par ligne de veille
// =====================================================
export function genPreuvesVeilleReglementaire(o: OrganismeInfo, f: FormationInfo): string {
  // 1) Priorité au pack IA (cohérent avec le tableau de veille de la formation)
  let entries: VeilleEntry[] = [];
  const aiPack = getCachedVeillePack(f);
  if (aiPack?.reglementaire?.length) {
    entries = aiPack.reglementaire.map(aiRowToEntry);
  } else {
    // 2) Fallback : lignes hardcodées par type de formation
    const rows = getVeilleReglementaireRowsForFormation(f);
    entries = rows.map(rowToEntry);
  }

  if (!entries.length) {
    return wrapRaw(`<div style="padding:40px;text-align:center;color:#666;font-family:Arial">Aucune ligne de veille réglementaire disponible.</div>`);
  }

  const screenshots = entries.map((e) => renderCapture(o, e));
  const inner = screenshots
    .map((s) => `<div style="page-break-after:always;margin:0;padding:0">${s}</div>`)
    .join("\n");
  return wrapRaw(inner);
}
