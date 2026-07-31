import { htmlToPdfBlob } from "@/lib/pdfExport";
import { VSSPlanning, frDate } from "@/lib/vssPlanning";
import logoAsset from "@/assets/vss-logo.png.asset.json";

const esc = (s: string) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const h = (n: number) => `${Number(n || 0).toFixed(2).replace(/\.00$/, "")} h`;

let logoCache: string | null = null;

/** Inline le logo en base64 : évite les canvas "tainted" (CORS) et les images non chargées. */
async function logoDataUrl(): Promise<string> {
  if (logoCache !== null) return logoCache;
  const raw = (logoAsset as { url: string }).url;
  const url = raw.startsWith("http") ? raw : `${window.location.origin}${raw}`;
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) throw new Error(String(res.status));
    const blob = await res.blob();
    logoCache = await new Promise<string>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result));
      fr.onerror = () => reject(fr.error);
      fr.readAsDataURL(blob);
    });
  } catch {
    logoCache = "";
  }
  return logoCache;
}


function planningHtml(p: VSSPlanning): string {
  const a = p.apprenant;
  const seances = p.seances;
  const rows = seances
    .map(
      (s, i) => `<tr style="background:${i % 2 ? "#f4f7fb" : "#ffffff"}">
        <td>S${s.semaine}</td>
        <td>${esc(s.dateFr)}</td>
        <td>${esc(s.jour)}</td>
        <td>${esc(s.creneau)}</td>
        <td style="text-align:right">${h(s.realisees)}</td>
        <td style="text-align:right">${h(s.cumulRealise)}</td>
        <td style="text-align:right">${h(s.restant)}</td>
      </tr>`,
    )
    .join("");

  const infosAll: Array<[string, string]> = [
    ["Apprenant", a.nom],
    ["Formation", a.formation || ""],
    ["Entreprise", a.entreprise || ""],
    ["Période", `${frDate(a.dateDebut)} → ${frDate(a.dateFin)}`],
    ["Heures VSS à couvrir", h(a.heuresVSS)],
    ["Heures réalisées", h(p.totalRealise)],
    ["Heures attendues à ce stade", p.heuresAttenduesStade ? h(p.heuresAttenduesStade) : ""],
    ["Total parcours", a.heuresParcours ? h(a.heuresParcours) : ""],
  ];
  const infos = infosAll.filter(([, v]) => v);

  return `<h2>Suivi du temps de connexion VSS</h2>
  <table class="infos">
    ${infos.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}
  </table>
  ${p.transmission ? `<p class="note"><strong>Transmissions internes :</strong> ${esc(p.transmission)}</p>` : ""}
  <h3>Détail des connexions réalisées</h3>
  <table class="detail">
    <thead>
      <tr>
        <th>Semaine</th><th>Date de connexion</th><th>Jour</th><th>Créneau</th>
        <th>Heures réalisées</th><th>Cumul réalisé</th><th>Heures restantes</th>
      </tr>
    </thead>
    <tbody>${rows || `<tr><td colspan="7">Aucune connexion réalisée à ce jour.</td></tr>`}</tbody>
  </table>`;
}

function wrap(bodyInner: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body { font-family: Georgia, 'Times New Roman', serif; color:#1a1a1a; font-size:11px; padding:36px 40px; }
    .hdr { display:flex; align-items:center; gap:16px; border-bottom:2px solid #8a5a33; padding-bottom:10px; margin-bottom:18px; }
    .hdr img { height:56px; }
    .hdr .t { font-size:13px; letter-spacing:1px; text-transform:uppercase; color:#8a5a33; }
    h2 { font-size:15px; margin:14px 0 10px; color:#8a5a33; }
    h3 { font-size:13px; margin:16px 0 8px; }
    table { width:100%; border-collapse:collapse; margin-bottom:12px; }
    td, th { border:1px solid #cfd8e3; padding:5px 7px; font-size:10.5px; }
    .infos th { width:34%; text-align:left; background:#eef3f9; }
    .detail thead th { background:#8a5a33; color:#fff; font-size:10px; }
    .note { font-size:10.5px; background:#f7f2ec; border-left:3px solid #8a5a33; padding:7px 9px; }
    .footer { font-size:9px; text-align:center; color:#555; }
  </style></head><body>
  <div class="hdr"><img src="${logoUrl()}" alt="Virtual Success School" /><div class="t">Virtual Success School<br/><span style="font-size:10px;letter-spacing:0">From skills to success</span></div></div>
  ${bodyInner}
  <div class="footer">Document généré le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} — Suivi du temps de connexion VSS</div>
  </body></html>`;
}

export async function pdfPlanningVSS(p: VSSPlanning): Promise<Blob> {
  return htmlToPdfBlob(wrap(planningHtml(p)));
}

export async function pdfPlanningsVSS(plannings: VSSPlanning[]): Promise<Blob> {
  const inner = plannings
    .map((p, i) => (i > 0 ? `<div class="page-break"></div>` : "") + planningHtml(p))
    .join("");
  return htmlToPdfBlob(wrap(inner));
}
