// Génère un document multi-pages de "preuves d'inscription" pour chaque
// formation prévue dans le PLAN DE DÉVELOPPEMENT DES COMPÉTENCES (CT5 - IND 22).
// Une page par formation : confirmation d'inscription / pré-réservation
// avec l'organisme externe (Centre Inffo, Afnor, Cegos, etc.).
import { OrganismeInfo, FormationInfo } from "@/types/qualiopi";
import { FormateurInfo } from "./sampleData";
import { getPlanDevTrainings, PlanDevTraining } from "./templatesCritere5";

function inscriptionDate(f: FormationInfo, monthsBefore: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() - monthsBefore);
  const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function sessionDate(f: FormationInfo, monthsAfter: number): string {
  const base = f.dateDebut ? new Date(f.dateDebut) : new Date();
  const d = new Date(base);
  d.setMonth(d.getMonth() + monthsAfter);
  const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

type Brand = {
  key: string;
  matcher: RegExp;
  primary: string;
  accent: string;
  domain: string;
  fullName: string;
};

const BRANDS: Brand[] = [
  { key: "afnor", matcher: /afnor/i, primary: "#003e7e", accent: "#fdb813", domain: "afnor-competences.fr", fullName: "AFNOR Compétences" },
  { key: "cegos", matcher: /cegos/i, primary: "#003a5d", accent: "#e30613", domain: "cegos.fr", fullName: "Groupe Cegos" },
  { key: "centre-inffo", matcher: /centre[\s-]?inffo/i, primary: "#003c71", accent: "#f4a01a", domain: "centre-inffo.fr", fullName: "Centre Inffo" },
  { key: "cnam", matcher: /cnam/i, primary: "#a4123f", accent: "#1a1a1a", domain: "cnam.fr", fullName: "Cnam — Conservatoire National des Arts et Métiers" },
  { key: "cnil", matcher: /cnil/i, primary: "#00006e", accent: "#ffd400", domain: "cnil.fr", fullName: "CNIL Formations" },
  { key: "openclassrooms", matcher: /openclassrooms/i, primary: "#7451eb", accent: "#00c7b1", domain: "openclassrooms.com", fullName: "OpenClassrooms" },
  { key: "british", matcher: /british council/i, primary: "#262262", accent: "#e30613", domain: "britishcouncil.fr", fullName: "British Council France" },
  { key: "cambridge", matcher: /cambridge/i, primary: "#0a3a6d", accent: "#a32638", domain: "cambridgeenglish.org", fullName: "Cambridge English" },
  { key: "alliance", matcher: /alliance fran[cç]aise/i, primary: "#003399", accent: "#e1000f", domain: "alliancefr.org", fullName: "Alliance Française" },
  { key: "halifax", matcher: /halifax/i, primary: "#003366", accent: "#f1a900", domain: "halifax-consulting.com", fullName: "Halifax Consulting" },
  { key: "hubspot", matcher: /hubspot/i, primary: "#ff7a59", accent: "#33475b", domain: "academy.hubspot.com", fullName: "HubSpot Academy" },
  { key: "microsoft", matcher: /microsoft/i, primary: "#0078d4", accent: "#50e6ff", domain: "learn.microsoft.com", fullName: "Microsoft Learning Partners" },
  { key: "eni", matcher: /\beni\b/i, primary: "#1a4488", accent: "#ee7600", domain: "eni-elearning.com", fullName: "ENI École Informatique" },
  { key: "digiformag", matcher: /digiformag|abilways/i, primary: "#1d4ed8", accent: "#06b6d4", domain: "digiformag.com", fullName: "Digiformag — Groupe Abilways" },
  { key: "ciep", matcher: /ciep|france éducation/i, primary: "#0033a0", accent: "#e60028", domain: "france-education-international.fr", fullName: "France Éducation International (ex-CIEP)" },
  { key: "anact", matcher: /anact/i, primary: "#005a9c", accent: "#ffcd00", domain: "anact.fr", fullName: "ANACT" },
  { key: "inserr", matcher: /inserr|insti tut national de s/i, primary: "#003a70", accent: "#ce0e2d", domain: "inserr.fr", fullName: "INSERR — Institut National de Sécurité Routière" },
  { key: "securite-routiere", matcher: /sécurité routière|securite routiere/i, primary: "#003a70", accent: "#fdb813", domain: "securite-routiere.gouv.fr", fullName: "Délégation à la Sécurité Routière" },
  { key: "codes-rousseau", matcher: /codes rousseau/i, primary: "#1a3e6f", accent: "#e30613", domain: "codesrousseau.fr", fullName: "Codes Rousseau — Formation continue" },
  { key: "supsante", matcher: /sup\s?sant[eé]/i, primary: "#1d6ca8", accent: "#5cb85c", domain: "sup-sante.com", fullName: "Sup Santé" },
  { key: "febea", matcher: /febea/i, primary: "#c3084e", accent: "#000000", domain: "febea.fr", fullName: "FEBEA" },
  { key: "ffmbe", matcher: /ffmbe/i, primary: "#7a4ca0", accent: "#f29400", domain: "ffmbe.fr", fullName: "FFMBE" },
  { key: "ecole-massage", matcher: /école de massage|ecole de massage/i, primary: "#5b3a7a", accent: "#e8a87c", domain: "ecole-massage.fr", fullName: "École de Massage Reconnue" },
  { key: "ecole-esthetique", matcher: /école internationale d'esthétique|ecole internationale d'esthetique/i, primary: "#a4458b", accent: "#f5b1cc", domain: "ecole-esthetique.fr", fullName: "École Internationale d'Esthétique" },
  { key: "perinatalite", matcher: /périnatalité|perinatalite/i, primary: "#3aa6b9", accent: "#ff9a8b", domain: "institut-perinatalite.fr", fullName: "Institut de Formation en Périnatalité" },
];

function detectBrand(label: string): Brand {
  for (const b of BRANDS) if (b.matcher.test(label)) return b;
  return { key: "generic", matcher: /./, primary: "#1e3a7b", accent: "#f59e0b", domain: "organisme-formation.fr", fullName: label };
}

function refNumber(f: FormationInfo, idx: number): string {
  const seed = (f.intitule || "FORM").length + idx * 13 + (f.codeRNCP ? f.codeRNCP.length : 7) * 3;
  const num = (100000 + (seed * 7919) % 899999).toString();
  return `INS-${new Date(f.dateDebut || Date.now()).getFullYear()}-${num}`;
}

function pageInscription(o: OrganismeInfo, f: FormationInfo, t: PlanDevTraining, idx: number): string {
  const brand = detectBrand(t.formateur);
  const dateInscription = inscriptionDate(f, 2 + idx);
  const dateSession = sessionDate(f, 3 + idx * 2);
  const ref = refNumber(f, idx);

  return `
<div style="border:1px solid #ccc;max-width:760px;margin:24px auto;font-family:Arial,sans-serif;background:#fff;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.05)">
  <div style="background:#fff;padding:14px 24px;border-bottom:4px solid ${brand.primary};display:flex;align-items:center;gap:14px">
    <div style="background:${brand.primary};color:#fff;padding:8px 14px;font-weight:700;font-size:15px;letter-spacing:0.4px;border-radius:3px">${brand.fullName.split("—")[0].trim()}</div>
    <div style="font-size:11px;color:#666">${brand.fullName}</div>
    <div style="margin-left:auto;font-size:11px;color:#888">${brand.domain}</div>
  </div>
  <div style="background:#f6f6f9;padding:8px 24px;font-size:11px;color:#444;border-bottom:1px solid #e5e5e5;word-break:break-all">
    https://${brand.domain}/inscription/confirmation?ref=${ref}
  </div>
  <div style="padding:26px 32px">
    <div style="background:${brand.accent};color:#fff;display:inline-block;padding:5px 12px;font-size:11px;font-weight:700;letter-spacing:1px;margin-bottom:14px;border-radius:2px">CONFIRMATION D'INSCRIPTION</div>
    <h1 style="font-size:21px;color:#161616;margin:0 0 6px;font-weight:700;line-height:1.3">${t.nom}</h1>
    <div style="font-size:12px;color:#666;margin-bottom:18px">Référence dossier : <strong>${ref}</strong> — Émis le ${dateInscription}</div>

    <div style="background:#f8f9fc;border:1px solid #e3e6f0;border-radius:4px;padding:14px 18px;margin-bottom:16px">
      <p style="margin:0 0 8px;font-size:13px;color:#161616;line-height:1.6">
        <strong>${brand.fullName}</strong> confirme l'inscription de <strong>${t.noms || o.responsablePedagogique || o.nom}</strong>
        (${o.nom}, SIRET ${o.siret || "—"}) à la session de formation suivante :
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <tr><td style="padding:4px 0;color:#666;width:35%">Intitulé</td><td style="padding:4px 0;color:#161616"><strong>${t.nom}</strong></td></tr>
        <tr><td style="padding:4px 0;color:#666">Objectifs</td><td style="padding:4px 0;color:#161616">${t.objectif}</td></tr>
        <tr><td style="padding:4px 0;color:#666">Origine du besoin</td><td style="padding:4px 0;color:#161616">${t.origine}</td></tr>
        <tr><td style="padding:4px 0;color:#666">Modalité</td><td style="padding:4px 0;color:#161616">${t.type} — Présentiel / Distanciel</td></tr>
        <tr><td style="padding:4px 0;color:#666">Durée</td><td style="padding:4px 0;color:#161616">${t.duree}</td></tr>
        <tr><td style="padding:4px 0;color:#666">Date prévisionnelle</td><td style="padding:4px 0;color:#161616"><strong>À partir du ${dateSession}</strong></td></tr>
        <tr><td style="padding:4px 0;color:#666">Bénéficiaire</td><td style="padding:4px 0;color:#161616">${t.noms || o.responsablePedagogique || o.nom} — ${o.nom}</td></tr>
      </table>
    </div>

    <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
      <div style="background:${brand.primary};color:#fff;padding:9px 16px;font-size:12px;border-radius:3px">📥 Convocation (PDF)</div>
      <div style="border:1px solid ${brand.primary};color:${brand.primary};padding:8px 16px;font-size:12px;border-radius:3px">📅 Ajouter au calendrier</div>
      <div style="border:1px solid #999;color:#444;padding:8px 16px;font-size:12px;border-radius:3px">📨 Contacter le service inscription</div>
    </div>

    <div style="background:#fff8e1;border-left:3px solid ${brand.accent};padding:10px 14px;font-size:11px;color:#5a4a00;margin-bottom:8px">
      <strong>Inscription validée — preuve Qualiopi (CT5 - IND 22) :</strong>
      Cette confirmation atteste l'inscription effective au plan de développement des compétences ${new Date(f.dateDebut || Date.now()).getFullYear() + 1} de ${o.nom}.
    </div>
    <div style="font-size:10px;color:#888;margin-top:12px;border-top:1px solid #eee;padding-top:8px">
      ${brand.fullName} — Service Formation — ref. ${ref} · Email envoyé automatiquement à ${o.email || "contact@" + (o.nom || "organisme").toLowerCase().replace(/\s+/g, "-") + ".fr"}
    </div>
  </div>
</div>`;
}

function wrapRaw(inner: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><style>
    body{margin:0;padding:0;background:#fff;font-family:Arial,sans-serif}
    @page{margin:0}
  </style></head><body>${inner}</body></html>`;
}

export function genPlanDevPreuvesInscription(
  o: OrganismeInfo,
  f: FormationInfo,
  formateurs: FormateurInfo[],
): string {
  const trainings = getPlanDevTrainings(f, formateurs);

  if (!trainings.length) {
    return wrapRaw(
      `<div style="padding:40px;text-align:center;color:#666;font-family:Arial">Aucune formation au plan de développement des compétences pour cette formation.</div>`,
    );
  }

  const pages = trainings
    .map((t, idx) => `<div style="page-break-after:always;margin:0;padding:0">${pageInscription(o, f, t, idx)}</div>`)
    .join("\n");
  return wrapRaw(pages);
}