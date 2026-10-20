/**
 * IND 22 — Formations suivies auprès d'IZIBUSINESS (Nadine DENDANI) et attestations associées.
 * Les formations sont datées avant la date de mise à jour du dossier (réalisées, donc attestables).
 */
import type { OrganismeInfo } from "@/types/qualiopi";
import { buildDocument, formatDate } from "./docBuilder";
import izibusinessTamponAsset from "@/assets/izibusiness_tampon.png.asset.json";

export const IZIBUSINESS_ORG = {
  nom: "IZIBUSINESS", siret: "892 035 320 00019", adresse: "6 rue d'Armaillé", codePostal: "75017", ville: "PARIS",
  email: "contact@izibusiness.fr", siteWeb: "https://www.izibusiness.fr", nda: "11 75 65432 75", dirigeant: "Nadine DENDANI",
};

export interface FormationIzi { id: string; nom: string; objectif: string; programme: string[]; duree: string; heures: number; joursAvantMaj: number }

export const FORMATIONS_IZIBUSINESS: FormationIzi[] = [
  {
    id: "gerer_centre", nom: "Gérer son centre de formation", heures: 14, duree: "2 jours (14 heures)", joursAvantMaj: 75,
    objectif: "Piloter un organisme de formation : obligations légales (NDA, BPF, Qualiopi), gestion administrative et financière, relation financeurs (OPCO, CPF/EDOF).",
    programme: ["Cadre réglementaire de l'organisme de formation : NDA, BPF, référentiel national qualité", "Organisation administrative : dossiers stagiaires, contrats et conventions, émargements", "Financements : OPCO, CPF / EDOF, France Travail, facturation", "Pilotage : indicateurs de résultats, amélioration continue, préparation des audits"],
  },
  {
    id: "make_airtable", nom: "Automatiser la gestion de son centre avec Make et Airtable", heures: 14, duree: "2 jours (14 heures)", joursAvantMaj: 45,
    objectif: "Structurer une base Airtable (stagiaires, sessions, documents) et automatiser les tâches récurrentes avec Make (convocations, relances, suivi).",
    programme: ["Airtable : tables, champs, relations, vues et formulaires", "Modéliser le suivi des stagiaires et des sessions", "Make : scénarios, déclencheurs, modules, filtres et gestion des erreurs", "Automatisations : convocations, relances d'émargement, questionnaires de satisfaction"],
  },
];

function baseDate(o: Pick<OrganismeInfo, "dateMaj">): Date {
  const value = (o.dateMaj || "").trim();
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const fr = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (fr) return new Date(+fr[3], +fr[2] - 1, +fr[1]);
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date();
}
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function ouvre(d: Date, sens: 1 | -1): Date { const r = new Date(d); while (r.getDay() === 0 || r.getDay() === 6) r.setDate(r.getDate() + sens); return r; }

/** Dates de réalisation (2 jours ouvrés consécutifs) avant la date de MAJ. */
export function datesFormationIzi(o: Pick<OrganismeInfo, "dateMaj">, fi: FormationIzi): { debut: string; fin: string } {
  const maj = baseDate(o);
  const d = new Date(maj); d.setDate(d.getDate() - Math.max(7, fi.joursAvantMaj));
  const debut = ouvre(d, 1); const fin = new Date(debut); fin.setDate(fin.getDate() + 1);
  return { debut: iso(debut), fin: iso(ouvre(fin, 1)) };
}

/** One source for completed training records in the attestation and every IND 22 plan. */
export function formationsIziRealisees(o: Pick<OrganismeInfo, "dateMaj">) {
  return FORMATIONS_IZIBUSINESS.map(fi => ({ ...fi, ...datesFormationIzi(o, fi) }));
}

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] || c));

export function genAttestationIzibusiness(o: OrganismeInfo, beneficiaire?: string): string {
  const formations = formationsIziRealisees(o);
  const fin = formations.map(fi => fi.fin).sort().at(-1) || iso(baseDate(o));
  const nom = (beneficiaire || o.dirigeant || "").trim();
  const izi = { ...o, ...IZIBUSINESS_ORG, telephone: "", logoUrl: "", tamponUrl: izibusinessTamponAsset.url, signatureUrl: "", dateMaj: fin } as OrganismeInfo;
  return buildDocument({
    org: izi, title: "ATTESTATION DE FIN DE FORMATION",
    sections: [
      { heading: "Attestation", content: `<p>Je soussignée <strong>Nadine DENDANI</strong>, dirigeante de <strong>IZIBUSINESS</strong> (SIRET ${IZIBUSINESS_ORG.siret}, déclaration d'activité n° ${IZIBUSINESS_ORG.nda}), atteste que :</p><p>${nom ? `<strong>${esc(nom)}</strong>` : ""}${o.nom ? `${nom ? ", " : ""}${esc(o.nom)}` : ""}${o.siret ? ` (SIRET ${esc(o.siret)})` : ""},</p><p>a suivi les deux formations suivantes, en présentiel au 6 rue d'Armaillé, 75017 Paris, avec une assiduité de 100 % :</p>` },
      ...formations.map((fi, i) => ({ heading: `Formation ${i + 1} — « ${fi.nom} »`, content: `<p>Du ${formatDate(fi.debut)} au ${formatDate(fi.fin)}, d'une durée de <strong>${fi.duree}</strong>.</p><p><strong>Objectif :</strong> ${fi.objectif}</p><p><strong>Contenu :</strong><br>${fi.programme.join("<br>")}</p>${i === formations.length - 1 ? `<p><strong>Durée totale : 4 jours (${formations.reduce((n, item) => n + item.heures, 0)} heures).</strong></p>` : ""}` })),
      { heading: "Résultat de l'évaluation des acquis", content: `<p>Objectifs atteints — évaluation par cas pratique en fin de chaque formation.</p>`, variant: "green" },
    ],
    extraHtml: `<p style="margin-top:24px">Fait à Paris, le ${formatDate(fin)}.</p><div style="margin-top:10px"><p><strong>Nadine DENDANI</strong>, dirigeante — IZIBUSINESS</p><img src="${izibusinessTamponAsset.url}" alt="Tampon IZIBUSINESS" style="max-height:110px;max-width:220px;object-fit:contain" /></div>`,
  });
}
