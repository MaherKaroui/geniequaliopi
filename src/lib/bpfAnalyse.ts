import type { OrganismeInfo } from "@/types/qualiopi";

export type Num = number | null;
export interface NH { nombre: Num; heures: Num }
export interface BpfData {
  exerciceDebut: string; exerciceFin: string;
  denomination: string; siret: string; nda: string; adresse: string; codePostal: string; ville: string; formeJuridique: string;
  cadreC: { entreprises: Num; opco: Num; cpf: Num; franceTravail: Num; pouvoirsPublics: Num; particuliers: Num; sousTraitance: Num; autres: Num; total: Num };
  cadreD: { totalCharges: Num; salairesFormateurs: Num; achatsSousTraitance: Num };
  cadreE: { internesNombre: Num; internesHeures: Num; externesNombre: Num; externesHeures: Num };
  cadreF1: { type: string; nombre: Num; heures: Num }[];
  cadreF1Total: NH;
  cadreF2: NH;
  cadreF3: { rncpNiveau: { niveau: string; nombre: Num; heures: Num }[]; rs: NH; cqp: NH; autres: NH; bilans: NH; vae: NH; total: NH };
  cadreF4: { specialite: string; nombre: Num; heures: Num }[];
  cadreF4Total: NH;
  cadreG: NH;
}

const nh = (): NH => ({ nombre: null, heures: null });
export function emptyBpf(): BpfData {
  return {
    exerciceDebut: "", exerciceFin: "", denomination: "", siret: "", nda: "", adresse: "", codePostal: "", ville: "", formeJuridique: "",
    cadreC: { entreprises: null, opco: null, cpf: null, franceTravail: null, pouvoirsPublics: null, particuliers: null, sousTraitance: null, autres: null, total: null },
    cadreD: { totalCharges: null, salairesFormateurs: null, achatsSousTraitance: null },
    cadreE: { internesNombre: null, internesHeures: null, externesNombre: null, externesHeures: null },
    cadreF1: [], cadreF1Total: nh(), cadreF2: nh(),
    cadreF3: { rncpNiveau: [], rs: nh(), cqp: nh(), autres: nh(), bilans: nh(), vae: nh(), total: nh() },
    cadreF4: [], cadreF4Total: nh(), cadreG: nh(),
  };
}
/** Fusion profonde tolérante (données IA partielles). */
export function normalizeBpf(x: any): BpfData {
  const e = emptyBpf();
  const merge = (a: any, b: any): any => {
    if (Array.isArray(a)) return Array.isArray(b) ? b : a;
    if (a && typeof a === "object") { const o: any = { ...a }; for (const k of Object.keys(a)) o[k] = merge(a[k], b?.[k]); return o; }
    if (a === null) return typeof b === "number" && isFinite(b) ? b : (typeof b === "string" && b.trim() !== "" && !isNaN(Number(b)) ? Number(b) : null);
    return typeof b === "string" ? b : a;
  };
  return merge(e, x || {});
}

export const C_LINES: { key: keyof BpfData["cadreC"]; label: string }[] = [
  { key: "entreprises", label: "Entreprises (salariés)" },
  { key: "opco", label: "OPCO" },
  { key: "cpf", label: "CPF (Caisse des Dépôts)" },
  { key: "franceTravail", label: "Pôle emploi / France Travail" },
  { key: "pouvoirsPublics", label: "Pouvoirs publics" },
  { key: "particuliers", label: "Particuliers" },
  { key: "sousTraitance", label: "Sous-traitance (autres OF)" },
  { key: "autres", label: "Autres produits" },
];

const v = (n: Num) => (typeof n === "number" && isFinite(n) ? n : 0);
export const eur = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
export const int = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 0 });
export const pct = (n: number) => `${(n * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`;
export const longDate = (iso: string) => {
  const d = new Date(iso); return isNaN(d.getTime()) ? iso : d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};
export const exerciceLabel = (b: BpfData) =>
  b.exerciceDebut || b.exerciceFin ? `${b.exerciceDebut ? longDate(b.exerciceDebut) : "?"} – ${b.exerciceFin ? longDate(b.exerciceFin) : "?"}` : "Exercice non renseigné";

export interface EntrepriseInfo { nom: string; siren: string; dateCreation: string; dirigeant: string; etat: string; activite: string; adresse: string }

export type Level = "ok" | "warn" | "error" | "info";
export interface Check { level: Level; label: string; detail: string }
export interface BpfResult {
  chiffres: { ca: number; stagiaires: number; heures: number; caParStagiaire: number | null; eurParHeure: number | null; partCpf: number | null; partSousTraitance: number | null; formateurs: number; heuresFormateurs: number };
  typesActions: OrganismeInfo["typesActions"];
  typesMotifs: string[];
  checks: Check[];
  todo: string[];
  evolution: { exercice: string; ca: number; stagiaires: number; heures: number }[];
}

export function analyseBpf(b: BpfData, all: BpfData[], ent?: EntrepriseInfo | null): BpfResult {
  const sumC = C_LINES.reduce((s, l) => s + v(b.cadreC[l.key]), 0);
  const ca = v(b.cadreC.total) || sumC;
  const f1 = v(b.cadreF1Total.nombre) || b.cadreF1.reduce((s, r) => s + v(r.nombre), 0);
  const f1h = v(b.cadreF1Total.heures) || b.cadreF1.reduce((s, r) => s + v(r.heures), 0);
  const f3 = b.cadreF3;
  const f3sum = f3.rncpNiveau.reduce((s, r) => s + v(r.nombre), 0) + v(f3.rs.nombre) + v(f3.cqp.nombre) + v(f3.autres.nombre) + v(f3.bilans.nombre) + v(f3.vae.nombre);
  const f3tot = v(f3.total.nombre) || f3sum;
  const f4tot = v(b.cadreF4Total.nombre) || b.cadreF4.reduce((s, r) => s + v(r.nombre), 0);
  const stagiaires = f1 || f3tot || f4tot;
  const heures = f1h || v(f3.total.heures) || v(b.cadreF4Total.heures);
  const formateurs = v(b.cadreE.internesNombre) + v(b.cadreE.externesNombre);
  const heuresFormateurs = v(b.cadreE.internesHeures) + v(b.cadreE.externesHeures);

  const checks: Check[] = [];
  const add = (level: Level, label: string, detail: string) => checks.push({ level, label, detail });

  // Cadre C
  if (b.cadreC.total == null) add("warn", "Total cadre C", `Total non renseigné ; somme des lignes = ${eur(sumC)}.`);
  else if (Math.abs(v(b.cadreC.total) - sumC) > 1) add("error", "Total cadre C ≠ somme des lignes", `Total déclaré ${eur(v(b.cadreC.total))} / somme des lignes ${eur(sumC)} (écart ${eur(v(b.cadreC.total) - sumC)}).`);
  else add("ok", "Total cadre C", `Cohérent : ${eur(sumC)}.`);

  // Stagiaires F1 / F3 / F4
  const trio = [f1, f3tot, f4tot];
  if (trio.every(x => x === 0)) add("warn", "Stagiaires F-1 / F-3 / F-4", "Aucun stagiaire déclaré.");
  else if (new Set(trio).size === 1) add("ok", "Stagiaires F-1 = F-3 = F-4", `${int(f1)} stagiaires sur les trois cadres.`);
  else add("error", "Stagiaires F-1 / F-3 / F-4 incohérents", `F-1 : ${int(f1)} · F-3 : ${int(f3tot)} · F-4 : ${int(f4tot)}. Les trois totaux doivent être identiques.`);

  // Heures
  if (stagiaires > 0) {
    const hMoy = heures / stagiaires;
    if (heures === 0) add("error", "Heures stagiaires", "Des stagiaires sont déclarés mais aucune heure.");
    else if (hMoy < 1 || hMoy > 2000) add("error", "Heures par stagiaire", `${int(hMoy)} h en moyenne : valeur aberrante.`);
    else if (hMoy < 3 || hMoy > 1600) add("warn", "Heures par stagiaire", `${int(hMoy)} h en moyenne : à vérifier.`);
    else add("ok", "Heures par stagiaire", `${int(hMoy)} h en moyenne.`);
  }
  // CA vs stagiaires
  if (ca > 0 && stagiaires === 0) add("error", "CA sans stagiaire", `${eur(ca)} de CA déclaré mais aucun stagiaire.`);
  else if (ca === 0 && stagiaires > 0) add("error", "Stagiaires sans CA", `${int(stagiaires)} stagiaires mais aucun produit déclaré en cadre C.`);
  // Sous-traitance F2 vs D
  const f2 = v(b.cadreF2.nombre), dST = v(b.cadreD.achatsSousTraitance), g = v(b.cadreG.nombre);
  if (g > 0 && dST === 0) add("error", "Sous-traitance confiée (G) sans achat (D)", `${int(g)} stagiaires confiés à un autre OF mais aucun achat de prestation en cadre D.`);
  else if (dST > 0 && g === 0) add("warn", "Achats de sous-traitance (D) sans cadre G", `${eur(dST)} d'achats de prestations de formation mais aucun stagiaire en cadre G.`);
  if (f2 > 0 && v(b.cadreC.sousTraitance) === 0) add("error", "Sous-traitance reçue (F-2) sans produit (C)", `${int(f2)} stagiaires reçus en sous-traitance mais aucun produit « autres OF » en cadre C.`);
  else if (v(b.cadreC.sousTraitance) > 0 && f2 === 0) add("warn", "Produit sous-traitance (C) sans F-2", `${eur(v(b.cadreC.sousTraitance))} de produits d'autres OF mais cadre F-2 vide.`);
  else if (f2 > 0 || g > 0) add("ok", "Sous-traitance", "Cadres C, D, F-2 et G concordants.");
  // Formateurs
  if (heures > 0 && formateurs === 0) add("error", "Formateurs à 0", "Des heures de formation sont déclarées sans aucun formateur en cadre E.");
  else if (formateurs > 0 && heuresFormateurs === 0) add("warn", "Heures formateurs", "Formateurs déclarés sans heures dispensées.");
  else if (formateurs > 0) add("ok", "Formateurs (cadre E)", `${int(formateurs)} formateur(s), ${int(heuresFormateurs)} h dispensées.`);
  // Ancienneté
  if (ent?.dateCreation) {
    const ageMois = (Date.now() - new Date(ent.dateCreation).getTime()) / (30.44 * 864e5);
    if (ageMois < 12) add("warn", "OF de moins d'un an", `Création le ${longDate(ent.dateCreation)} : un BPF complet est inhabituel ; vérifiez l'exercice déclaré et l'audit initial Qualiopi.`);
    else add("ok", "Ancienneté", `Création le ${longDate(ent.dateCreation)}.`);
  }
  if (ent && /ferm|cess/i.test(ent.etat)) add("error", "Établissement fermé", "L'API Recherche d'entreprises indique un établissement cessé.");
  if (ent && b.denomination && ent.nom && !ent.nom.toLowerCase().includes(b.denomination.toLowerCase().slice(0, 6))) add("warn", "Dénomination", `BPF : « ${b.denomination} » / registre : « ${ent.nom} ».`);

  // Types d'actions
  const types = new Set<OrganismeInfo["typesActions"][0]>();
  const motifs: string[] = [];
  const rncpCount = f3.rncpNiveau.reduce((s, r) => s + v(r.nombre), 0);
  if (rncpCount + v(f3.rs.nombre) + v(f3.cqp.nombre) + v(f3.autres.nombre) > 0 || ca > 0) { types.add("actions-formation"); motifs.push("Actions de formation (F-3 RNCP/RS/CQP/autres)"); }
  const apprF1 = b.cadreF1.find(r => /apprenti/i.test(r.type) && v(r.nombre) > 0);
  if (apprF1) { types.add("apprentissage"); motifs.push(`Apprentissage (${int(v(apprF1.nombre))} apprentis en F-1)`); }
  if (v(f3.vae.nombre) > 0) { types.add("vae"); motifs.push(`VAE (${int(v(f3.vae.nombre))} en F-3)`); }
  if (v(f3.bilans.nombre) > 0) { types.add("bilans-competences"); motifs.push(`Bilans de compétences (${int(v(f3.bilans.nombre))} en F-3)`); }

  if (types.has("apprentissage")) add("info", "Périmètre apprentissage", "Qualiopi « actions de formation par apprentissage » : indicateurs 13 à 15 (alternance, accompagnement, droits et devoirs) + 14 missions du CFA.");
  if (types.has("vae")) add("info", "Périmètre VAE", "Qualiopi « VAE » : preuves d'accompagnement du candidat (livret 2, entretiens, préparation au jury).");
  if (types.has("bilans-competences")) add("info", "Périmètre bilans de compétences", "Qualiopi « bilans de compétences » : trois phases, synthèse remise au bénéficiaire, confidentialité.");
  if (v(b.cadreC.cpf) > 0) add("info", "CPF", "Financements CPF : la certification Qualiopi est obligatoire pour EDOF ; prévoir les preuves Mon Compte Formation (EDOF, conditions générales).");

  // Évolution
  const evolution = [...all]
    .sort((a, c) => (a.exerciceFin || "").localeCompare(c.exerciceFin || ""))
    .map(x => { const r = quick(x); return { exercice: exerciceLabel(x), ...r }; });
  if (evolution.length > 1) {
    const [p, c] = evolution.slice(-2);
    const dCa = p.ca ? (c.ca - p.ca) / p.ca : 0;
    const lvl: Level = Math.abs(dCa) > 1 ? "warn" : "ok";
    add(lvl, "Évolution entre exercices", `CA ${eur(p.ca)} → ${eur(c.ca)} (${dCa >= 0 ? "+" : ""}${pct(dCa)}), stagiaires ${int(p.stagiaires)} → ${int(c.stagiaires)}.`);
  }

  // À préparer
  const todo: string[] = [
    "BPF de l'exercice signé et déposé sur Mon Activité Formation (preuve de dépôt).",
    "Extrait Kbis / avis de situation SIRENE de moins de 3 mois et récépissé de déclaration d'activité (NDA).",
  ];
  checks.filter(c => c.level === "error").forEach(c => todo.push(`Corriger dans le BPF : ${c.label} — ${c.detail}`));
  if (types.has("actions-formation")) todo.push("Catalogue / programmes de formation à jour, conventions, émargements, évaluations (IND 1 à 11).");
  if (types.has("apprentissage")) todo.push("Contrats d'apprentissage (CERFA 10103), calendriers d'alternance, livrets d'apprentissage, preuves des 14 missions CFA.");
  if (types.has("vae")) todo.push("Dossiers VAE : recevabilité (livret 1), accompagnement (livret 2), comptes rendus d'entretiens.");
  if (types.has("bilans-competences")) todo.push("Conventions de bilan, documents de synthèse signés, engagement de confidentialité.");
  if (g > 0 || dST > 0) todo.push("Contrats de sous-traitance et preuves de contrôle qualité des sous-traitants (IND 27).");
  if (f2 > 0) todo.push("Conventions de sous-traitance reçues des OF donneurs d'ordre.");
  if (formateurs > 0) todo.push(`CV et preuves de compétences des ${int(formateurs)} formateur(s) (IND 21-22), contrats des formateurs externes.`);
  if (v(b.cadreC.cpf) > 0) todo.push("Extractions EDOF des dossiers CPF de l'exercice.");
  todo.push("Indicateurs de résultats publiés (satisfaction, taux de réussite) cohérents avec le BPF (IND 2).");

  return {
    chiffres: {
      ca, stagiaires, heures, formateurs, heuresFormateurs,
      caParStagiaire: stagiaires ? ca / stagiaires : null,
      eurParHeure: heures ? ca / heures : null,
      partCpf: ca ? v(b.cadreC.cpf) / ca : null,
      partSousTraitance: ca ? (v(b.cadreC.sousTraitance) + v(b.cadreD.achatsSousTraitance)) / ca : null,
    },
    typesActions: [...types],
    typesMotifs: motifs,
    checks, todo, evolution,
  };
}

function quick(b: BpfData) {
  const sumC = C_LINES.reduce((s, l) => s + v(b.cadreC[l.key]), 0);
  return {
    ca: v(b.cadreC.total) || sumC,
    stagiaires: v(b.cadreF1Total.nombre) || b.cadreF1.reduce((s, r) => s + v(r.nombre), 0) || v(b.cadreF3.total.nombre),
    heures: v(b.cadreF1Total.heures) || b.cadreF1.reduce((s, r) => s + v(r.heures), 0) || v(b.cadreF3.total.heures),
  };
}

export async function fetchEntreprise(siret: string): Promise<EntrepriseInfo | null> {
  const q = siret.replace(/\s/g, "");
  if (!/^\d{9,14}$/.test(q)) throw new Error("SIRET invalide (9 à 14 chiffres)");
  const r = await fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${q}&page=1&per_page=1`);
  if (r.status === 429) throw new Error("API Recherche d'entreprises saturée, réessayez dans quelques secondes.");
  if (!r.ok) throw new Error(`API Recherche d'entreprises : erreur ${r.status}`);
  const j = await r.json();
  const e = j.results?.[0];
  if (!e) return null;
  const d = e.dirigeants?.[0];
  return {
    nom: e.nom_complet || e.nom_raison_sociale || "",
    siren: e.siren || "",
    dateCreation: e.date_creation || "",
    dirigeant: d ? (d.nom ? `${d.prenoms || ""} ${d.nom}`.trim() : d.denomination || "") + (d.qualite ? ` (${d.qualite})` : "") : "",
    etat: e.etat_administratif === "A" ? "Active" : e.etat_administratif === "C" ? "Cessée" : (e.etat_administratif || ""),
    activite: e.activite_principale || "",
    adresse: e.siege?.adresse || "",
  };
}
