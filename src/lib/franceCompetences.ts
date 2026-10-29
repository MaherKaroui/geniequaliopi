/**
 * Base locale RNCP / RS synchronisée avec France Compétences.
 *
 * Les fichiers de public/france-competences/ sont produits par
 * scripts/sync_france_competences.py à partir de l'export open data quotidien
 * (data.gouv.fr). Ils sont chargés à la demande, par paquet de codes, puis gardés
 * en mémoire : les générateurs (synchrones) lisent le cache via getFicheFC().
 */
import type { ReferentielAnalyse } from "@/types/qualiopi";

export interface BlocFC { code: string; libelle: string; competences: string[]; modalites: string }
export interface FicheFC {
  c: string; i: string; a: string; n: string; t: "RNCP" | "RS"; on: boolean; fin: string; cert: string[]; new?: string[];
  abregeLibelle: string; dateDecision: string; dateEffet: string; typeEnregistrement: string;
  objectifs: string; activites: string[]; capacites: string[]; modalitesEvaluation: string;
  prerequis: string; prerequisValidation: string; secteurs: string; typesEmplois: string;
  rome: { code: string; libelle: string }[]; formacodes: { code: string; libelle: string }[]; nsf: { code: string; libelle: string }[];
  blocs: BlocFC[]; voies: string[];
  stats: { annee: string; certifies: string; certifiesVae: string; insertion6mois: string; insertionMetier2ans: string }[];
  anciennes: string[]; url: string;
}
export interface IndexFC { c: string; i: string; a?: string; n?: string; t?: string; on: boolean; fin: string; cert?: string[]; new?: string[] }
export interface MetaFC { source: string; exportDate: string; syncDate: string; fiches: number; actives: number }

const BASE = "/france-competences";
const fiches = new Map<string, FicheFC | null>();
const shardsLoaded = new Map<string, Promise<void>>();
let index: Map<string, IndexFC> | null = null;
let indexPromise: Promise<void> | null = null;
let meta: MetaFC | null = null;

/** Lecteur de fichier (navigateur : fetch ; tests : lecture disque injectée). */
type Reader = (path: string) => Promise<Uint8Array | null>;
let reader: Reader = async (path) => {
  try {
    const r = await fetch(`${BASE}/${path}`);
    if (!r.ok) return null;
    return new Uint8Array(await r.arrayBuffer());
  } catch {
    return null;
  }
};
export function setFranceCompetencesReader(r: Reader) { reader = r; }

async function gunzipJson<T>(bytes: Uint8Array): Promise<T> {
  // Certains hébergeurs décompressent déjà : on ne décompresse que si l'en-tête gzip est présent.
  if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
    const DS = (globalThis as any).DecompressionStream;
    if (DS) {
      try {
        const body = new Response(bytes as unknown as BodyInit).body;
        if (body) return JSON.parse(await new Response(body.pipeThrough(new DS("gzip"))).text());
      } catch { /* environnement sans flux (tests) : repli zlib */ }
    }
    const zlib = await import(/* @vite-ignore */ "zlib" as string);
    return JSON.parse(zlib.gunzipSync(bytes).toString("utf-8"));
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export function normaliserCode(code?: string): string {
  const t = (code || "").toUpperCase().replace(/\s+/g, "");
  const m = t.match(/^(RNCP|RS)(\d+)$/);
  return m ? `${m[1]}${m[2]}` : "";
}

function shardKey(code: string): string {
  const m = code.match(/^([A-Z]+)(\d+)$/);
  if (!m) return "divers";
  return m[1] === "RNCP" ? `RNCP${m[2].slice(0, 3)}` : `${m[1]}${m[2].slice(0, 2)}`;
}

/** Charge (une fois) le paquet contenant la fiche et la renvoie ; null si inconnue ou inactive. */
export async function loadFicheFC(code?: string): Promise<FicheFC | null> {
  const c = normaliserCode(code);
  if (!c) return null;
  if (fiches.has(c)) return fiches.get(c) ?? null;
  const key = shardKey(c);
  if (!shardsLoaded.has(key)) {
    shardsLoaded.set(key, (async () => {
      const bytes = await reader(`fiches/${key}.fcz`);
      if (!bytes) return;
      const data = await gunzipJson<Record<string, FicheFC>>(bytes);
      for (const [k, v] of Object.entries(data)) fiches.set(k, v);
    })().catch(() => { shardsLoaded.delete(key); }));
  }
  await shardsLoaded.get(key);
  if (!fiches.has(c)) fiches.set(c, null);
  return fiches.get(c) ?? null;
}

/** Fiche en cache (synchrone) — appeler loadFicheFC avant la génération. */
export function getFicheFC(code?: string): FicheFC | null {
  const c = normaliserCode(code);
  return c ? fiches.get(c) ?? null : null;
}

export async function loadIndexFC(): Promise<void> {
  if (index) return;
  if (!indexPromise) {
    indexPromise = (async () => {
      const bytes = await reader("index.fcz");
      const list = bytes ? await gunzipJson<IndexFC[]>(bytes) : [];
      index = new Map(list.map((e) => [e.c, e]));
      const m = await reader("meta.json");
      meta = m ? JSON.parse(new TextDecoder().decode(m)) : null;
    })().catch(() => { indexPromise = null; });
  }
  await indexPromise;
}

export function getIndexFC(code?: string): IndexFC | null {
  const c = normaliserCode(code);
  return c && index ? index.get(c) ?? null : null;
}
export function getMetaFC(): MetaFC | null { return meta; }

/** Recherche plein texte dans l'index (intitulé ou code), fiches actives d'abord. */
export function rechercherFC(q: string, limit = 20): IndexFC[] {
  if (!index) return [];
  const n = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const terms = n(q).split(/\s+/).filter(Boolean);
  const out: IndexFC[] = [];
  for (const e of index.values()) {
    const hay = n(`${e.c} ${e.a || ""} ${e.i}`);
    if (terms.every((t) => hay.includes(t))) out.push(e);
  }
  return out.sort((a, b) => Number(b.on) - Number(a.on)).slice(0, limit);
}

const MOTS_VIDES = new Set("titre professionnel tp de du la le les des d l et en a au aux niveau rncp vae accompagnement".split(" "));

/**
 * Code RNCP le plus probable pour un titre visé (« Titre professionnel Agent magasinier ») : tous les mots
 * significatifs doivent figurer dans l'intitulé ; fiche active d'abord, puis niveau demandé, puis la plus récente.
 * L'index doit être chargé (loadIndexFC). Vide si aucune fiche ne correspond.
 */
export function codeRNCPPourTitre(titre: string, niveau = ""): string {
  if (!index) return "";
  const n = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const mots = (n(titre.replace(/\([^)]*\)/g, " ")).match(/[a-z0-9]+/g) || []).filter((m) => m.length > 1 && !MOTS_VIDES.has(m));
  if (!mots.length) return "";
  const num = (c: string) => Number(c.replace(/\D/g, "")) || 0;
  const trouves = [...index.values()]
    .filter((e) => e.c.startsWith("RNCP") && mots.every((m) => n(`${e.a || ""} ${e.i}`).includes(m)))
    .sort((a, b) => Number(b.on) - Number(a.on) || Number(b.n === niveau) - Number(a.n === niveau) || num(b.c) - num(a.c));
  return trouves[0]?.c || "";
}

/** Précharge l'index et la fiche d'une formation (à appeler avant génération / export). */
export async function preloadFranceCompetences(code?: string): Promise<FicheFC | null> {
  await loadIndexFC();
  return loadFicheFC(code);
}

/** Statut réglementaire lisible (actif, échu, remplacé) — pour alertes et veille. */
export function statutFC(code?: string, today: Date = new Date()): { connu: boolean; actif: boolean; fin: string; remplacePar: string[]; alerte: string } {
  const c = normaliserCode(code);
  const f = getFicheFC(c);
  const e = getIndexFC(c);
  const fin = f?.fin || e?.fin || "";
  const actif = !!(f?.on ?? e?.on);
  const remplacePar = (f?.new || e?.new || []).filter(Boolean);
  if (!f && !e) return { connu: false, actif: false, fin: "", remplacePar: [], alerte: c ? `Code ${c} introuvable dans l'export France Compétences.` : "" };
  let alerte = "";
  if (!actif) alerte = `Fiche ${c} INACTIVE${fin ? ` (fin d'enregistrement le ${fin.split("-").reverse().join("/")})` : ""}${remplacePar.length ? ` — remplacée par ${remplacePar.join(", ")}` : ""}.`;
  else if (fin) {
    const d = new Date(fin);
    const mois = (d.getTime() - today.getTime()) / (30.44 * 86400000);
    if (mois < 12) alerte = `Fiche ${c} : fin d'enregistrement le ${fin.split("-").reverse().join("/")} (moins de 12 mois) — surveiller le renouvellement.`;
  }
  return { connu: true, actif, fin, remplacePar, alerte };
}

/** Conversion vers le format ReferentielAnalyse déjà stocké dans formation.referentiel. */
export function ficheToReferentiel(f: FicheFC): ReferentielAnalyse {
  return {
    code: f.c, type: f.t, intitule: f.a ? `${f.a} - ${f.i}` : f.i,
    niveau: f.n ? Number(f.n) || null : null,
    certificateur: f.cert.join(", "), dateFinEnregistrement: f.fin, actif: f.on,
    blocs: f.blocs.map((b) => ({ code: b.code, intitule: b.libelle })),
    prerequis: f.prerequis, publicVise: "",
    codesRome: f.rome.map((r) => `${r.code} – ${r.libelle}`),
    metiers: f.typesEmplois ? f.typesEmplois.split(/[,;]\s*/).filter((x) => x.length > 2).slice(0, 12) : [],
    secteurs: f.secteurs ? [f.secteurs] : [],
    modalitesEvaluation: f.modalitesEvaluation || f.blocs.map((b) => b.modalites).filter(Boolean)[0] || "",
  };
}

/**
 * Unités pédagogiques d'une fiche : ses blocs (avec compétences) ou, pour une fiche
 * sans bloc (la plupart des RS), ses capacités attestées regroupées en une unité.
 */
export function unitesFC(f: FicheFC): { code: string; titre: string; competences: string[]; modalites: string }[] {
  const blocs = f.blocs.filter((b) => b.libelle);
  // Les blocs d'enseignement général (diplômes EN) ne servent pas à l'évaluation professionnelle.
  const pro = blocs.filter((b) => !/fran[cç]ais|histoire|math[ée]matiques|physique|[ée]ducation physique|langue vivante|arts appliqu|pr[ée]vention.sant[ée].environnement|[ée]conomie.droit|culture g[ée]n[ée]rale/i.test(b.libelle));
  const src = (pro.length ? pro : blocs).map((b) => ({
    code: b.code, titre: b.libelle,
    competences: b.competences.length ? b.competences : [b.libelle],
    modalites: b.modalites,
  }));
  if (src.length) return src;
  const caps = f.capacites.length ? f.capacites : f.activites;
  return caps.length ? [{ code: f.c, titre: f.i, competences: caps, modalites: f.modalitesEvaluation }] : [];
}
