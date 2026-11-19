/**
 * Audit EDOF — analyse d'un export « Tous les dossiers » de Mon Compte Formation.
 *
 * Même méthode que les audits HR CONSEIL / HR FORMATION / ORIENTA CONSULT (skill /audit-edof) :
 * - tout l'export dans un seul rapport, chiffre d'affaires séparé par année ;
 * - CA = montant facturable des « Service fait validé », rangé par année de FIN de session ;
 * - même personne = NOM + PRÉNOM + date de naissance ;
 * - prix de référence = prix le plus fréquent de l'action (approximation : l'export ne donne pas le catalogue) ;
 * - jours ouvrés = lundi à vendredi hors jours fériés ; règle CPF : 11 jours ouvrés minimum avant l'entrée.
 * Les constats décrivent des signaux de risque, jamais une fraude. La nationalité et le lieu de naissance
 * ne sont jamais utilisés.
 */
import { getCol, parseEdofDate, readEdofRows } from "@/lib/edofParser";
import { getIndexFC, getMetaFC, loadFicheFC, loadHabilitationsFC, loadIndexFC, type FicheFC, type HabilitationsFC, type IndexFC } from "@/lib/franceCompetences";
import type { EntrepriseInfo } from "@/lib/bpfAnalyse";

export type Niveau = "ÉLEVÉ" | "MOYEN" | "FAIBLE";

export interface DossierEdof {
  numero: string; nom: string; prenom: string; nomComplet: string; naissance: string; cle: string;
  adresse: string; cp: string; ville: string; cleAdresse: string; email: string; tel: string;
  cert: string; intituleCert: string; numFormation: string; action: string; session: string; intituleFormation: string;
  debut: string; fin: string; lieuCp: string; lieuVille: string; statut: string; derniereAction: string;
  enControle: boolean; abondementFT: string; inscription: string; taux: number | null; forceMajeure: boolean;
  montant: number | null; facturable: number | null; facture: number | null;
}

export interface Tableau { entetes: string[]; lignes: string[][]; poids: number[] }

export interface Constat {
  id: string; titre: string; niveau: Niveau; resume: string; ampleur: string;
  constat: string; lecture: string; aFaire: string; tableaux: { titre?: string; t: Tableau }[];
  plan: { action: string; dossiers: string; piece: string };
}

export interface ReferentielCode { index: IndexFC | null; fiche: FicheFC | null; hab: HabilitationsFC | null }

export interface ContexteAudit {
  siret: string;
  nomFichier?: string;
  entreprise?: EntrepriseInfo | null;
  referentiels: Record<string, ReferentielCode>;
  /** Date du rapport (aujourd'hui par défaut). */
  dateRapport?: string;
}

export interface AuditEdof {
  organisme: string; siret: string; entreprise: EntrepriseInfo | null; dateReferentiel: string; dateExport: string; dateRapport: string; annees: number[]; anneeEnCours: number | null;
  dossiers: DossierEdof[]; personnes: number; premiereInscription: string; derniereInscription: string;
  servicesFaits: number; ca: number; caParAnnee: Record<number, number>;
  enCours: { n: number; montant: number; liste: DossierEdof[] };
  statuts: { statut: string; n: number; montant: number }[];
  parCertif: { cert: string; intitule: string; dossiers: number; payes: number; ca: Record<number, number>; total: number; prix: number[]; etat: string }[];
  parMois: { mois: string; n: number; ca: number }[];
  departements: { dep: string; dossiers: number; payes: number }[];
  parAction: { cert: string; action: string; n: number; prix: number[]; durees: number[]; ca: number }[];
  constats: Constat[];
  conformes: string[];
  qualite: string[];
  synthese: string;
  conclusion: string;
}

/* ---------------- utilitaires ---------------- */

const JOUR = 86400000;
const num = (iso: string) => (iso ? Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / JOUR : NaN);
const an = (iso: string) => (iso ? +iso.slice(0, 4) : NaN);
const jours = (a: string, b: string) => num(b) - num(a);

function paques(y: number): number {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(y, mo - 1, da) / JOUR;
}
const feriesCache = new Map<number, Set<number>>();
function feries(y: number): Set<number> {
  let s = feriesCache.get(y);
  if (!s) {
    const p = paques(y), d = (m: number, j: number) => Date.UTC(y, m - 1, j) / JOUR;
    s = new Set([d(1, 1), p + 1, d(5, 1), d(5, 8), p + 39, p + 50, d(7, 14), d(8, 15), d(11, 1), d(11, 11), d(12, 25)]);
    feriesCache.set(y, s);
  }
  return s;
}
/** Jours ouvrés dans [a, b[ (comme numpy.busday_count) : lundi-vendredi hors fériés. */
export function joursOuvres(a: string, b: string): number {
  const x = num(a), y = num(b);
  if (isNaN(x) || isNaN(y)) return NaN;
  let n = 0;
  for (let d = Math.min(x, y); d < Math.max(x, y); d++) {
    const wd = new Date(d * JOUR).getUTCDay();
    if (wd !== 0 && wd !== 6 && !feries(new Date(d * JOUR).getUTCFullYear()).has(d)) n++;
  }
  return x <= y ? n : -n;
}

const montantDe = (v: unknown): number | null => {
  if (v === "" || v === null || v === undefined) return null;
  if (typeof v === "number") return v;
  const n = parseFloat(String(v).replace(/\s/g, "").replace(",", "."));
  return isNaN(n) ? null : n;
};
const sansAccent = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const titre = (s: string) => s.toLowerCase().replace(/(^|[\s'-])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase());
const somme = (xs: (number | null)[]) => xs.reduce<number>((s, x) => s + (x ?? 0), 0);
const uniques = <T,>(xs: T[]) => [...new Set(xs)];
const grouper = <T,>(xs: T[], k: (x: T) => string) => {
  const m = new Map<string, T[]>();
  for (const x of xs) { const c = k(x); if (!m.has(c)) m.set(c, []); m.get(c)!.push(x); }
  return m;
};
const mode = (xs: number[]) => {
  const c = new Map<number, number>();
  xs.forEach((x) => c.set(x, (c.get(x) || 0) + 1));
  return [...c.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0]?.[0];
};
const mediane = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : NaN;
};

/** 12 345,6 → « 12 345 € » (espaces simples : les polices PDF standard n'ont pas l'espace fine). */
export function eur(n: number | null | undefined, decimales = false): string {
  if (n === null || n === undefined || isNaN(n)) return "–";
  const d = decimales || Math.abs(n % 1) > 0.001 ? 2 : 0;
  const [e, f] = Math.abs(n).toFixed(d).split(".");
  return `${n < 0 ? "-" : ""}${e.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}${f ? "," + f : ""} €`;
}
export const entier = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
export const pct = (a: number, b: number) => (b ? `${Math.round((100 * a) / b)} %` : "–");
/** 2026-03-05 → 05/03/2026 ; court : 05/03/26. */
export const fr = (iso: string, court = false) => (iso && /^\d{4}-\d{2}-\d{2}/.test(iso) ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${court ? iso.slice(2, 4) : iso.slice(0, 4)}` : "–");
const periode = (d: DossierEdof) => (d.debut ? `${fr(d.debut, true)} – ${fr(d.fin, true)}` : "–");
const pluriel = (n: number, s: string, p = s + "s") => `${entier(n)} ${n > 1 ? p : s}`;
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
export const moisLabel = (ym: string) => `${MOIS[+ym.slice(5, 7) - 1]} ${ym.slice(0, 4)}`;
const departement = (cp: string) => (/^97|^98/.test(cp) ? cp.slice(0, 3) : /^20/.test(cp) ? (+cp < 20200 ? "2A" : "2B") : cp.slice(0, 2));
/** Coupe au dernier mot entier avant `n` caractères. */
const court = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, "") + "…");
const listeNoms = (xs: string[], max = 8) => (xs.length > max ? `${xs.slice(0, max).join(", ")}…` : xs.join(", "));
const prixListe = (ps: number[]) => uniques(ps.filter((p) => p !== null)).sort((a, b) => a - b).map((p) => eur(p)).join(" / ");

const estPaye = (d: DossierEdof) => d.statut === "Service fait validé";
const estKo = (d: DossierEdof) => /annul|refus/i.test(d.statut);
const estEnCours = (d: DossierEdof) => !estPaye(d) && !estKo(d);
const estVae = (d: DossierEdof) => /^CPF200/.test(d.cert) || /\bVAE\b|validation des acquis/i.test(d.intituleCert);
const estCertifiante = (c: string) => /^(RS|RNCP)\d+/.test(c);

/* ---------------- lecture ---------------- */

export function lireDossiersEdof(data: ArrayBuffer): DossierEdof[] {
  return readEdofRows(data).map((row) => {
    const s = (...k: string[]) => String(getCol(row, ...k) ?? "").replace(/\\/g, "").trim();
    const nom = s("NOM").toUpperCase(), prenom = titre(s("PRENOM")), naissance = parseEdofDate(getCol(row, "DATE_DE_NAISSANCE"));
    const adresse = s("ADRESSE_POSTALE"), cp = s("ADRESSE_CODE_POSTAL");
    const cleAdresse = adresse
      ? sansAccent(adresse.toLowerCase())
          .replace(/\b(rue|rte|route|gr|de la|du|des|de|av|avenue|bd|boulevard|all|allee|pl|place|imp|impasse|chem|chemin|rle|ld|mai|bis|ter)\b/g, "")
          .replace(/[^a-z0-9]/g, "") + cp
      : "";
    return {
      numero: s("NUMERO_DOSSIER"), nom, prenom, nomComplet: `${nom} ${prenom}`.trim(), naissance,
      cle: `${sansAccent(nom)}|${sansAccent(prenom.toUpperCase())}|${naissance}`,
      adresse, cp, ville: s("ADRESSE_VILLE"), cleAdresse,
      email: s("COURRIEL").toLowerCase(), tel: s("NUMERO_TELEPHONE_PORTABLE").replace(/\D/g, ""),
      cert: s("CODE_CERTIF/THEM", "CODE_CERTIF").toUpperCase(), intituleCert: s("INTITULE_CERTIF/THEM"),
      numFormation: s("NUMERO_FORMATION"), action: s("NUMERO_ACTION"), session: s("NUMERO_SESSION"), intituleFormation: s("INTITULE_FORMATION"),
      debut: parseEdofDate(getCol(row, "DATE_DEBUT_SESSION")), fin: parseEdofDate(getCol(row, "DATE_FIN_SESSION")),
      lieuCp: s("LIEU_FORMATION_CODE_POSTAL"), lieuVille: s("LIEU_FORMATION_VILLE"),
      statut: s("STATUT_DOSSIER"), derniereAction: parseEdofDate(getCol(row, "DATE_DERNIERE_ACTION")),
      enControle: /^oui$/i.test(s("EN_CONTROLE")), abondementFT: s("ABONDEMENT_FT"),
      inscription: parseEdofDate(getCol(row, "DATE_INSCRIPTION")), taux: montantDe(getCol(row, "TAUX_REALISATION_SAISI")),
      forceMajeure: /^oui$/i.test(s("CAS_FORCE_MAJEURE_TITULAIRE")),
      montant: montantDe(getCol(row, "MONTANT_FORMATION")), facturable: montantDe(getCol(row, "MONTANT_FACTURABLE")), facture: montantDe(getCol(row, "MONTANT_FACTURE")),
    };
  }).filter((d) => d.numero || d.nom);
}

/** Codes RS / RNCP vendus (hors refus et annulations), à vérifier dans la base France Compétences. */
export const codesAVerifier = (ds: DossierEdof[]) => uniques(ds.map((d) => d.cert).filter(estCertifiante));

/** Date de l'export : « …_<SIRET>_<AAAAMMJJ>.csv », sinon dernière date connue dans le fichier. */
export function dateDeLExport(ds: DossierEdof[], nomFichier = ""): string {
  const m = nomFichier.match(/_(20\d{2})(\d{2})(\d{2})(?:\D|$)/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  return ds.flatMap((d) => [d.derniereAction, d.inscription]).filter(Boolean).sort().pop() || "";
}

/* ---------------- habilitations ---------------- */

const LIB_HAB: Record<string, string> = { F: "habilitation pour former", E: "habilitation pour organiser l'évaluation", FE: "habilitation pour former et organiser l'évaluation" };

interface EtatHabilitation { verifiable: boolean; statut: "certificateur" | "habilite" | "fin" | "autre-etablissement" | "absent"; libelle: string; dateDebut: string; dateFin: string; nbPartenaires: number }

function habilitation(siret: string, ref: ReferentielCode | undefined): EtatHabilitation {
  const hab = ref?.hab;
  if (!hab) return { verifiable: false, statut: "absent", libelle: "liste non disponible", dateDebut: "", dateFin: "", nbPartenaires: 0 };
  const siren = siret.slice(0, 9);
  const parts = hab.p.map((s) => { const [si, h, a, d1, d2] = s.split("|"); return { siret: si, h, actif: a === "1", debut: d1, maj: d2 }; });
  const nb = parts.filter((p) => p.actif).length;
  if (hab.cs.some((c) => c === siret || c.slice(0, 9) === siren))
    return { verifiable: true, statut: "certificateur", libelle: "organisme certificateur", dateDebut: "", dateFin: "", nbPartenaires: nb };
  const memes = parts.filter((p) => p.siret === siret);
  const actif = memes.find((p) => p.actif);
  if (actif) return { verifiable: true, statut: "habilite", libelle: LIB_HAB[actif.h] || "habilité", dateDebut: actif.debut, dateFin: "", nbPartenaires: nb };
  const ancien = memes.sort((a, b) => (b.maj || "").localeCompare(a.maj || ""))[0];
  if (ancien) return { verifiable: true, statut: "fin", libelle: `${LIB_HAB[ancien.h] || "habilitation"} inactive`, dateDebut: ancien.debut, dateFin: ancien.maj, nbPartenaires: nb };
  const autre = parts.find((p) => p.siret.slice(0, 9) === siren && p.actif);
  if (autre) return { verifiable: true, statut: "autre-etablissement", libelle: `${LIB_HAB[autre.h] || "habilité"} sous le SIRET ${autre.siret}`, dateDebut: autre.debut, dateFin: "", nbPartenaires: nb };
  return { verifiable: true, statut: "absent", libelle: `absent de la liste (${pluriel(nb, "partenaire actif", "partenaires actifs")})`, dateDebut: "", dateFin: "", nbPartenaires: nb };
}

/* ---------------- analyse ---------------- */

export function analyserEdof(tous: DossierEdof[], ctx: ContexteAudit): AuditEdof {
  const ent = ctx.entreprise;
  const organisme = ent?.nom || "Organisme de formation";
  const siret = ctx.siret.replace(/\s/g, "");
  const dateExport = dateDeLExport(tous, ctx.nomFichier);
  const dateRapport = ctx.dateRapport || new Date().toISOString().slice(0, 10);
  const ds = [...tous].sort((a, b) => (a.debut || "9").localeCompare(b.debut || "9") || a.inscription.localeCompare(b.inscription));
  const payes = ds.filter(estPaye), ko = ds.filter(estKo), enCours = ds.filter(estEnCours);
  const ca = somme(payes.map((d) => d.facturable ?? d.montant));
  const caDe = (d: DossierEdof) => d.facturable ?? d.montant ?? 0;
  const annees = uniques([...payes.map((d) => an(d.fin)), ...ds.map((d) => an(d.inscription))].filter((y) => !isNaN(y))).sort();
  const anneeExport = an(dateExport);
  const anneeEnCours = annees.includes(anneeExport) ? anneeExport : null;
  const caParAnnee: Record<number, number> = {};
  annees.forEach((y) => (caParAnnee[y] = somme(payes.filter((d) => an(d.fin) === y).map(caDe))));
  const anneesCa = annees.filter((y) => caParAnnee[y] > 0);
  const caAnnees = anneesCa.map((y) => `${eur(caParAnnee[y])} en ${y}${y === anneeEnCours ? ` (au ${fr(dateExport)})` : ""}`).join(", ");
  const parCle = grouper(ds, (d) => d.cle);
  const nomDe = (d: DossierEdof) => d.nomComplet;

  /* statuts, CA par certification, par mois, par département */
  const statuts = [...grouper(ds, (d) => d.statut || "(vide)").entries()]
    .map(([statut, xs]) => ({ statut, n: xs.length, montant: somme(xs.map((d) => (estPaye(d) ? caDe(d) : d.montant))) }))
    .sort((a, b) => b.n - a.n);
  const ref = (c: string) => ctx.referentiels[c];
  const etatFiche = (c: string) => {
    const r = ref(c);
    const e = r?.fiche || r?.index;
    if (!e) return estCertifiante(c) ? "absente de la base" : "";
    return e.on ? `active${e.fin ? `, échéance ${fr(e.fin)}` : ""}` : `inactive${e.fin ? ` depuis le ${fr(e.fin)}` : ""}${e.new?.length ? `, remplacée par ${e.new.join(", ")}` : ""}`;
  };
  const parCertif = [...grouper(ds, (d) => d.cert || "(sans code)").entries()].map(([cert, xs]) => {
    const p = xs.filter(estPaye);
    const caC: Record<number, number> = {};
    annees.forEach((y) => (caC[y] = somme(p.filter((d) => an(d.fin) === y).map(caDe))));
    return {
      cert, intitule: xs[0].intituleCert || xs[0].intituleFormation, dossiers: xs.length, payes: p.length, ca: caC,
      total: somme(p.map(caDe)), prix: uniques(xs.filter((d) => !estKo(d)).map((d) => d.montant).filter((m): m is number => m !== null)).sort((a, b) => a - b),
      etat: etatFiche(cert),
    };
  }).sort((a, b) => b.total - a.total || b.dossiers - a.dossiers);
  const parMois = [...grouper(payes.filter((d) => d.fin), (d) => d.fin.slice(0, 7)).entries()]
    .map(([mois, xs]) => ({ mois, n: xs.length, ca: somme(xs.map(caDe)) })).sort((a, b) => a.mois.localeCompare(b.mois));
  const departements = [...grouper(ds.filter((d) => d.cp), (d) => departement(d.cp)).entries()]
    .map(([dep, xs]) => ({ dep, dossiers: xs.length, payes: xs.filter(estPaye).length })).sort((a, b) => b.payes - a.payes || b.dossiers - a.dossiers);
  const vendus = ds.filter((d) => !estKo(d));
  const parAction = [...grouper(vendus, (d) => `${d.cert}|${d.action}`).entries()].map(([k, xs]) => ({
    cert: k.split("|")[0], action: k.split("|")[1], n: xs.length,
    prix: uniques(xs.map((d) => d.montant).filter((m): m is number => m !== null)).sort((a, b) => a - b),
    durees: uniques(xs.filter((d) => d.debut && d.fin).map((d) => jours(d.debut, d.fin) + 1)).sort((a, b) => a - b),
    ca: somme(xs.filter(estPaye).map(caDe)),
  })).sort((a, b) => a.cert.localeCompare(b.cert) || a.action.localeCompare(b.action));

  const constats: Constat[] = [];
  const conformes: string[] = [];
  const qualite: string[] = [];

  /* 1. Habilitations et validité des fiches */
  {
    const lignes: string[][] = [];
    const problemes: string[] = [];
    let niveau: Niveau | null = null;
    let caRisque = 0, nbRisque = 0;
    const ok: string[] = [];
    for (const c of codesAVerifier(vendus)) {
      const xs = vendus.filter((d) => d.cert === c);
      const r = ref(c), e = r?.fiche || r?.index;
      const h = habilitation(siret, r);
      const certifs = r?.fiche?.cert?.join(", ") || r?.index?.cert?.join(", ") || "–";
      lignes.push([`${c} ${court(e?.i || xs[0].intituleCert, 60)}`, etatFiche(c) || "–", certifs, h.verifiable ? (h.statut === "habilite" ? `Oui (${h.libelle}${h.dateDebut ? ` depuis le ${fr(h.dateDebut)}` : ""})` : h.statut === "certificateur" ? "Oui (certificateur)" : h.statut === "fin" ? `Plus depuis le ${fr(h.dateFin)} (${h.libelle})` : h.statut === "autre-etablissement" ? `À vérifier (${h.libelle})` : `Non (${h.libelle})`) : "Non vérifiable"]);
      const p = xs.filter(estPaye);
      const ministere = /MINIST/i.test(certifs);
      if (h.verifiable && h.statut === "absent" && ministere) {
        niveau = niveau || "MOYEN";
        problemes.push(`${c} : titre du ministère, ${pluriel(xs.length, "dossier")} dont ${pluriel(p.length, "service fait", "services faits")} pour ${eur(somme(p.map(caDe)))} ; l'organisme ne figure pas parmi les ${pluriel(h.nbPartenaires, "centre agréé", "centres agréés")} publiés. Pour ces titres, la liste recense les centres agréés pour les sessions d'examen : il faut montrer avec quel centre agréé les candidats ont passé le titre.`);
      } else if (h.verifiable && h.statut === "absent") {
        niveau = "ÉLEVÉ"; nbRisque += xs.length; caRisque += somme(p.map(caDe));
        problemes.push(`${c} : ${pluriel(xs.length, "dossier vendu", "dossiers vendus")} (inscrits du ${fr(xs.map((d) => d.inscription).sort()[0])} au ${fr(xs.map((d) => d.inscription).sort().pop()!)}), dont ${pluriel(p.length, "service fait", "services faits")} pour ${eur(somme(p.map(caDe)))} ; l'organisme ne figure pas parmi les ${pluriel(h.nbPartenaires, "partenaire habilité", "partenaires habilités")} publiés par France Compétences${r?.fiche?.cert?.length ? ` (certificateur : ${r.fiche.cert.join(", ")})` : ""}.`);
      } else if (h.statut === "fin") {
        const apres = xs.filter((d) => d.inscription > h.dateFin);
        if (apres.length) {
          niveau = "ÉLEVÉ"; nbRisque += apres.length; caRisque += somme(apres.filter(estPaye).map(caDe));
          problemes.push(`${c} : habilitation inactive depuis le ${fr(h.dateFin)}, ${pluriel(apres.length, "dossier inscrit", "dossiers inscrits")} après cette date (${listeNoms(apres.map(nomDe), 5)}).`);
        } else ok.push(`${c} : tous les dossiers ont été inscrits pendant l'habilitation (fin le ${fr(h.dateFin)}).`);
      } else if (h.statut === "autre-etablissement") {
        niveau = niveau || "MOYEN";
        problemes.push(`${c} : l'habilitation publiée porte sur un autre établissement de la même entreprise (${h.libelle}).`);
      } else if (h.statut === "habilite" && h.dateDebut) {
        const avant = xs.filter((d) => d.inscription && d.inscription < h.dateDebut);
        if (avant.length) {
          niveau = niveau || "MOYEN";
          problemes.push(`${c} : ${pluriel(avant.length, "dossier inscrit", "dossiers inscrits")} avant la date d'habilitation publiée (${fr(h.dateDebut)}) : ${listeNoms(avant.map(nomDe), 5)}.`);
        } else ok.push(`${c} : l'organisme figure sur la liste des partenaires habilités (${h.libelle}).`);
      } else if (h.statut === "habilite" || h.statut === "certificateur") ok.push(`${c} : l'organisme ${h.statut === "certificateur" ? "est le certificateur" : `figure sur la liste des partenaires habilités (${h.libelle})`}.`);
      // Fiche échue : dossiers dont la session commence après la fin d'enregistrement.
      if (e && !e.on && e.fin) {
        const apres = xs.filter((d) => d.inscription > e.fin);
        if (apres.length) {
          niveau = "ÉLEVÉ"; nbRisque += apres.length; caRisque += somme(apres.filter(estPaye).map(caDe));
          problemes.push(`${c} : fiche inactive depuis le ${fr(e.fin)}${e.new?.length ? ` (remplacée par ${e.new.join(", ")})` : ""}, mais ${pluriel(apres.length, "dossier inscrit", "dossiers inscrits")} après cette date.`);
        } else ok.push(`${c} : fiche échue le ${fr(e.fin)}, mais tous les dossiers ont été inscrits avant.`);
      }
    }
    conformes.push(...ok);
    if (niveau) {
      constats.push({
        id: "habilitation", titre: "Habilitations et validité des certifications", niveau,
        resume: niveau === "ÉLEVÉ" ? "Certification vendue sans habilitation publiée ou après la fin de la fiche" : "Habilitation à confirmer",
        ampleur: nbRisque ? `${pluriel(nbRisque, "dossier")}, ${eur(caRisque)} payés` : "voir détail",
        constat: problemes.join("\n"),
        lecture: "Pour vendre une certification au CPF, l'organisme doit être le certificateur ou un partenaire habilité déclaré à France Compétences. Une habilitation sur une ancienne fiche ne se transfère pas automatiquement à la fiche qui la remplace. Si la convention n'existe pas, la Caisse des Dépôts peut considérer ces formations comme non éligibles et demander le remboursement. Il se peut aussi que la convention existe mais n'ait pas encore été déclarée : c'est à vérifier en premier.",
        aFaire: "Retrouver, pour chaque certification concernée, la convention d'habilitation signée avec le certificateur (date, périmètre) et la preuve de sa déclaration à France Compétences. À défaut, suspendre la vente et préparer la réponse sur les dossiers payés.",
        tableaux: [{ t: { entetes: ["Certification", "État (France Compétences)", "Certificateur", "L'organisme sur la liste ?"], lignes, poids: [3, 2.4, 1.8, 2.8] } }],
        plan: { action: "Prouver l'habilitation sur chaque certification vendue", dossiers: nbRisque ? pluriel(nbRisque, "dossier") : "voir section", piece: "Convention avec le certificateur, déclaration à France Compétences" },
      });
    } else if (lignes.length) {
      // Pas de risque : le tableau va quand même dans « Points conformes » via les phrases ok.
    }
  }

  /* 2. Dirigeant inscrit à sa propre formation */
  {
    const dirs = (ent?.dirigeants || []).filter((d) => d.nom);
    const hits = ds.filter((d) => dirs.some((x) => {
      const n = sansAccent(x.nom.toUpperCase());
      const pr = sansAccent(x.prenoms.toUpperCase()).split(/[\s,-]+/);
      return sansAccent(d.nom) === n && pr.includes(sansAccent(d.prenom.toUpperCase()).split(/[\s-]+/)[0]);
    }));
    if (hits.length) {
      constats.push({
        id: "dirigeant", titre: "Dirigeant inscrit à sa propre formation", niveau: "ÉLEVÉ",
        resume: "Le dirigeant de l'organisme a un dossier CPF chez son propre organisme",
        ampleur: `${pluriel(hits.length, "dossier")} (${uniques(hits.map((d) => d.statut)).join(", ")})`,
        constat: `L'export contient ${pluriel(hits.length, "dossier")} au nom d'un dirigeant inscrit aujourd'hui au registre des entreprises (${uniques(hits.map(nomDe)).join(", ")}), même nom et même prénom.`,
        lecture: "Un dirigeant qui mobilise son CPF dans son propre organisme se trouve en conflit d'intérêts : la Caisse des Dépôts considère ce cas comme un signal fort. Même refusé ou annulé, le dossier doit être expliqué. Le registre donne les dirigeants actuels : vérifier d'abord qu'il s'agit bien de la même personne et qu'elle dirigeait déjà l'organisme à la date de l'inscription.",
        aFaire: "Note écrite du dirigeant sur l'origine du dossier ; vérifier qu'aucun proche n'est inscrit ; en cas de service fait, envisager le remboursement.",
        tableaux: [{ t: { entetes: ["N° dossier", "Stagiaire", "Certif.", "Inscrit le", "Session", "Statut", "Prix"], lignes: hits.map((d) => [d.numero, nomDe(d), d.cert, fr(d.inscription), periode(d), d.statut, eur(d.montant)]), poids: [1.6, 2, 1, 1.1, 1.8, 1.6, 1] } }],
        plan: { action: "Expliquer l'inscription du dirigeant", dossiers: hits.map((d) => d.numero).join(", "), piece: "Note écrite du dirigeant ; liste des proches éventuellement inscrits" },
      });
    }
  }

  /* 3. Prix par action */
  {
    const vendusP = vendus.filter((d) => d.montant !== null);
    const nonRonds = vendusP.filter((d) => (d.montant as number) % 100 !== 0);
    const centimes = vendusP.filter((d) => (d.montant as number) % 1 !== 0);
    const multi = parAction.filter((a) => a.prix.length > 1);
    if (multi.length || nonRonds.length) {
      const modes = new Map(parAction.map((a) => [`${a.cert}|${a.action}`, mode(vendusP.filter((d) => d.cert === a.cert && d.action === a.action).map((d) => d.montant as number))]));
      const hors = vendusP.filter((d) => d.montant !== modes.get(`${d.cert}|${d.action}`));
      const niveau: Niveau = nonRonds.length ? "ÉLEVÉ" : "MOYEN";
      const lignesActions = multi.map((a) => {
        const xs = vendusP.filter((d) => d.cert === a.cert && d.action === a.action);
        const detail = a.prix.map((p) => `${eur(p)} × ${xs.filter((d) => d.montant === p).length}`).join(" ; ");
        return [a.cert, a.action, detail, a.durees.length ? `${a.durees[0]} à ${a.durees[a.durees.length - 1]} j` : "–", `${fr(xs.map((d) => d.debut).filter(Boolean).sort()[0] || "", true)} – ${fr(xs.map((d) => d.debut).filter(Boolean).sort().pop() || "", true)}`];
      });
      const ex = multi[0];
      constats.push({
        id: "prix", titre: "Prix différents pour une même action", niveau,
        resume: nonRonds.length ? "Montants non ronds : prix possiblement calé sur le solde CPF" : "Même action vendue à plusieurs prix",
        ampleur: `${pluriel(multi.length, "action")} à plusieurs prix ; ${pluriel(hors.length, "dossier")} hors prix majoritaire${nonRonds.length ? ` ; ${pluriel(nonRonds.length, "montant non rond", "montants non ronds")}` : ""}`,
        constat: `${pluriel(multi.length, "action est vendue", "actions sont vendues")} à plusieurs prix${ex ? ` (par exemple ${ex.cert}, action ${ex.action} : ${prixListe(ex.prix)})` : ""}. ${pluriel(hors.length, "dossier")} ${hors.length > 1 ? "sont" : "est"} hors du prix le plus fréquent de son action.${nonRonds.length ? ` ${pluriel(nonRonds.length, "montant n'est pas un multiple", "montants ne sont pas des multiples")} de 100 €${centimes.length ? `, dont ${entier(centimes.length)} avec des centimes` : ""} : ${listeNoms(nonRonds.map((d) => `${nomDe(d)} ${eur(d.montant)}`), 6)}.` : ""}`,
        lecture: `Une action EDOF correspond à un programme, une durée et un prix publiés. Plusieurs prix sur la même action ne s'expliquent que par des versions successives du catalogue ou des formats différents (durée, distanciel / présentiel), qu'il faut pouvoir montrer.${nonRonds.length ? " Un prix non rond, ou à centimes, est le signal typique d'un tarif ajusté au solde du compte CPF du stagiaire, que la Caisse des Dépôts recherche en priorité." : ""} Le prix de référence retenu ici (le plus fréquent) est une approximation : l'export ne donne pas le catalogue.`,
        aFaire: "Pour chaque action concernée : historique des versions EDOF (prix, durée, programme) aux dates des inscriptions ; justifier chaque écart individuel (format, durée, devis).",
        tableaux: [
          { titre: "Actions vendues à plusieurs prix", t: { entetes: ["Certif.", "Action", "Prix pratiqués (nombre de dossiers)", "Durées", "Sessions"], lignes: lignesActions, poids: [1.1, 0.8, 3.4, 1.1, 1.8] } },
          ...(hors.length ? [{ titre: "Dossiers hors prix majoritaire de leur action", t: { entetes: ["Stagiaire", "Certif.", "Act.", "Session", "Statut", "Prix", "Prix majoritaire"], lignes: hors.slice(0, 60).map((d) => [nomDe(d), d.cert, d.action, periode(d), d.statut, eur(d.montant), eur(modes.get(`${d.cert}|${d.action}`))]), poids: [2.2, 1, 0.6, 1.8, 1.7, 1, 1.1] } }] : []),
        ],
        plan: { action: "Justifier les prix différents d'une même action", dossiers: pluriel(hors.length, "dossier"), piece: "Versions EDOF de l'action, programmes, devis" },
      });
    } else if (vendusP.length) conformes.push(`Prix : un seul prix par action, tous multiples de 100 €, aucun montant à centimes.`);
    if (!nonRonds.length && multi.length && vendusP.length) conformes.push(`Prix : tous multiples de 100 €, aucun montant à centimes.`);
  }

  /* 4. Recréations après refus / annulation */
  {
    const rec: string[][] = [];
    let autrePrix = 0;
    for (const xs of parCle.values()) {
      for (const a of xs.filter(estKo)) {
        for (const b of xs.filter((b) => b.cert === a.cert && b.numero !== a.numero && b.inscription >= a.inscription && jours(a.inscription, b.inscription) <= 7)) {
          if (b.montant !== a.montant) autrePrix++;
          rec.push([nomDe(a), a.cert, fr(a.inscription, true), a.statut, eur(a.montant), fr(b.inscription, true), b.statut, eur(b.montant)]);
        }
      }
    }
    if (rec.length) {
      constats.push({
        id: "recreations", titre: "Dossiers recréés après un refus ou une annulation", niveau: autrePrix ? "ÉLEVÉ" : "FAIBLE",
        resume: autrePrix ? "Nouveau dossier dans les 7 jours, à un autre prix" : "Nouveau dossier dans les 7 jours, même prix",
        ampleur: `${pluriel(rec.length, "recréation")}${autrePrix ? `, dont ${entier(autrePrix)} à un autre prix` : ""}`,
        constat: `${pluriel(rec.length, "dossier refusé ou annulé est suivi", "dossiers refusés ou annulés sont suivis")}, dans les 7 jours, d'un nouveau dossier sur la même certification pour la même personne${autrePrix ? ` ; ${entier(autrePrix)} fois le prix change` : ", au même prix"}.`,
        lecture: autrePrix ? "Un refus du stagiaire suivi d'un nouveau dossier à un prix différent laisse penser que le tarif a été ajusté au solde du compte CPF. C'est un motif fréquent de contrôle." : "Un dossier recréé au même prix correspond le plus souvent à une erreur de saisie ou à un changement de date : le risque est faible si l'échange avec le stagiaire est conservé.",
        aFaire: "Conserver les échanges écrits avec le stagiaire expliquant le refus et la nouvelle proposition (date, format, prix).",
        tableaux: [{ t: { entetes: ["Stagiaire", "Certif.", "1er dossier", "Statut", "Prix", "Nouveau", "Statut", "Prix"], lignes: rec, poids: [2, 1, 0.9, 1.6, 0.9, 0.9, 1.6, 0.9] } }],
        plan: { action: "Expliquer les dossiers recréés", dossiers: pluriel(rec.length, "dossier"), piece: "Échanges écrits avec les stagiaires, motif du refus" },
      });
    }
  }

  /* 5. Multi-certifications et dossiers multiples */
  {
    const nbPayes = new Map<string, DossierEdof[]>();
    payes.forEach((d) => nbPayes.set(d.cle, [...(nbPayes.get(d.cle) || []), d]));
    const multiCerts = [...nbPayes.values()].filter((xs) => xs.length > 1);
    const doublons = [...grouper(payes, (d) => `${d.cle}|${d.cert}`).values()].filter((xs) => xs.length > 1);
    const plusieurs = [...parCle.values()].filter((xs) => xs.length > 1);
    const chevauchements: string[][] = [];
    let memeJour = 0;
    for (const xs of multiCerts) {
      if (uniques(xs.map((d) => d.inscription)).length === 1) memeJour++;
      for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) {
        const a = xs[i], b = xs[j];
        if (a.debut && b.debut && a.debut <= b.fin && b.debut <= a.fin) chevauchements.push([nomDe(a), a.cert, periode(a), b.cert, periode(b)]);
      }
    }
    if (multiCerts.length || doublons.length) {
      const montantMulti = somme(multiCerts.flat().map(caDe));
      const niveau: Niveau = doublons.length || chevauchements.length || memeJour || multiCerts.some((xs) => uniques(xs.map((d) => d.cert)).length >= 3) ? "ÉLEVÉ" : "MOYEN";
      constats.push({
        id: "multi", titre: "Personnes formées plusieurs fois", niveau,
        resume: doublons.length ? "Même certification payée deux fois" : "Plusieurs certifications payées pour la même personne",
        ampleur: `${pluriel(multiCerts.length, "personne")}, ${pluriel(multiCerts.flat().length, "dossier")}, ${eur(montantMulti)}`,
        constat: `${pluriel(multiCerts.length, "personne a", "personnes ont")} plusieurs services faits (${eur(montantMulti)}, ${pct(montantMulti, ca)} du chiffre d'affaires).${memeJour ? ` ${pluriel(memeJour, "personne a", "personnes ont")} tout commandé le même jour.` : ""}${chevauchements.length ? ` ${pluriel(chevauchements.length, "chevauchement")} de sessions : la même personne est en formation sur deux certifications aux mêmes dates.` : ""}${doublons.length ? ` ${pluriel(doublons.length, "personne a", "personnes ont")} la même certification payée deux fois : ${listeNoms(doublons.map((xs) => `${nomDe(xs[0])} (${xs[0].cert})`))}.` : ""}`,
        lecture: "Plusieurs certifications sans lien, commandées ensemble et enchaînées, sont le schéma type de l'épuisement des droits CPF que la Caisse des Dépôts contrôle. Deux sessions aux mêmes dates ne peuvent pas avoir été suivies toutes les deux à temps plein.",
        aFaire: "Pour chaque personne : projet professionnel justifiant les certifications, émargements des sessions, résultats aux certifications ; expliquer chaque chevauchement.",
        tableaux: [
          { titre: "Services faits par personne", t: { entetes: ["Stagiaire", "Certifications payées", "Inscriptions", "Sessions", "Total"], lignes: multiCerts.map((xs) => [nomDe(xs[0]), xs.map((d) => d.cert).join(", "), uniques(xs.map((d) => fr(d.inscription, true))).join(", "), xs.map(periode).join(" ; "), eur(somme(xs.map(caDe)))]), poids: [2, 2, 1.6, 3.2, 1] } },
          ...(chevauchements.length ? [{ titre: "Sessions qui se chevauchent", t: { entetes: ["Stagiaire", "Certif. 1", "Session 1", "Certif. 2", "Session 2"], lignes: chevauchements, poids: [2, 1, 1.8, 1, 1.8] } }] : []),
        ],
        plan: { action: "Justifier les parcours multi-certifications", dossiers: pluriel(multiCerts.length, "personne"), piece: "Projet professionnel, émargements, résultats aux certifications" },
      });
    } else if (payes.length) conformes.push("Pas de double paiement : chaque personne n'a qu'un seul service fait validé ; aucune multi-certification.");
    const autres = plusieurs.filter((xs) => xs.filter(estPaye).length <= 1);
    if (autres.length) qualite.push(`${pluriel(autres.length, "personne a", "personnes ont")} plusieurs dossiers dont un seul au plus payé (recréations, refus, changements de session) : ${listeNoms(autres.map((xs) => xs[0].nomComplet))}.`);
  }

  /* 6. Durées des sessions */
  {
    const avecDuree = payes.filter((d) => d.debut && d.fin).map((d) => ({ d, j: jours(d.debut, d.fin) + 1 }));
    const ecarts = parAction.filter((a) => a.durees.length > 1 && a.durees[a.durees.length - 1] >= 2 * a.durees[0] && a.prix.length >= 1);
    const courtes = avecDuree.filter((x) => x.j <= 3 && (x.d.montant ?? 0) >= 1500);
    if (ecarts.length || courtes.length) {
      const top = [...avecDuree].sort((a, b) => (b.d.montant ?? 0) / b.j - (a.d.montant ?? 0) / a.j).slice(0, 12);
      constats.push({
        id: "durees", titre: "Durées des sessions", niveau: "MOYEN",
        resume: "Même action sur des durées très différentes, ou sessions très courtes",
        ampleur: `${pluriel(ecarts.length, "action")} à durées variables${courtes.length ? ` ; ${pluriel(courtes.length, "session")} de 3 jours ou moins à 1 500 € et plus` : ""}`,
        constat: `${ecarts.map((a) => `${a.cert} action ${a.action} : de ${a.durees[0]} à ${a.durees[a.durees.length - 1]} jours (${prixListe(a.prix)})`).join(" ; ")}${ecarts.length && courtes.length ? ". " : ""}${courtes.length ? `${pluriel(courtes.length, "session")} de 3 jours calendaires ou moins pour 1 500 € ou plus.` : "."} Médiane des sessions payées : ${mediane(avecDuree.map((x) => x.j))} jours.`,
        lecture: "La durée de la session (du premier au dernier jour) ne donne pas le nombre d'heures, absent de l'export. Mais le même prix pour une session deux fois plus courte, ou un prix élevé pour quelques jours, appelle la question de la réalité des heures facturées.",
        aFaire: "Programmes et plannings des sessions concernées, avec le nombre d'heures ; émargements ou relevés de connexion.",
        tableaux: [{ titre: "Sessions payées les plus chères par jour", t: { entetes: ["Stagiaire", "Certif.", "Act.", "Session", "Durée", "Prix", "€ / jour"], lignes: top.map(({ d, j }) => [nomDe(d), d.cert, d.action, periode(d), `${j} j`, eur(d.montant), eur(Math.round((d.montant ?? 0) / j))]), poids: [2.2, 1, 0.6, 1.8, 0.8, 1, 1] } }],
        plan: { action: "Justifier la durée réelle des sessions", dossiers: pluriel(courtes.length + ecarts.reduce((s, a) => s + a.n, 0), "dossier"), piece: "Programmes, plannings, heures, émargements" },
      });
    }
  }

  /* 7. Taux de réalisation */
  {
    const t = payes.filter((d) => d.taux !== null);
    const cent = t.filter((d) => (d.taux as number) >= 100);
    if (t.length >= 5 && cent.length === t.length) {
      constats.push({
        id: "taux", titre: "Taux de réalisation de 100 % partout", niveau: "MOYEN",
        resume: "Toutes les formations déclarées réalisées à 100 %",
        ampleur: `${entier(cent.length)} / ${entier(t.length)} services faits`,
        constat: `Les ${entier(t.length)} services faits portent tous un taux de réalisation de 100 %. Aucune absence, aucun abandon partiel n'est déclaré.`,
        lecture: "Un taux uniforme de 100 % est statistiquement rare et cible les contrôles : la Caisse des Dépôts demande alors les preuves d'assiduité (émargements, connexions) pour un échantillon de dossiers.",
        aFaire: "Tenir prêtes, dossier par dossier, les preuves de réalisation : émargements signés par demi-journée, relevés de connexion, travaux rendus, évaluation finale.",
        tableaux: [],
        plan: { action: "Preuves de réalisation à 100 %", dossiers: pluriel(t.length, "service fait", "services faits"), piece: "Émargements, connexions, évaluations" },
      });
    } else if (t.length) conformes.push(`Taux de réalisation variés (${uniques(t.map((d) => d.taux)).length} valeurs différentes) : pas de déclaration uniforme à 100 %.`);
  }

  /* 8. Contacts partagés et concentration géographique */
  {
    const groupes: string[][] = [];
    const vus = new Set<string>();
    for (const [col, lib] of [["cleAdresse", "Adresse"], ["email", "Courriel"], ["tel", "Téléphone"]] as const) {
      for (const [v, xs] of grouper(ds.filter((d) => d[col]), (d) => d[col]).entries()) {
        const pers = uniques(xs.map((d) => d.cle));
        if (pers.length < 2) continue;
        const k = pers.sort().join("+");
        if (vus.has(k)) continue;
        vus.add(k);
        groupes.push([lib, col === "cleAdresse" ? `${xs[0].adresse}, ${xs[0].cp} ${xs[0].ville}` : v, uniques(xs.map(nomDe)).join(", "), uniques(xs.map((d) => d.cert)).join(", "), `${xs.filter(estPaye).length} / ${xs.length}`]);
      }
    }
    const depSiege = ent?.codePostal ? departement(ent.codePostal) : "";
    const top = departements[0];
    const concentre = top && payes.length >= 5 && top.payes / payes.length > 0.5 && top.dep !== depSiege;
    if (groupes.length || concentre) {
      constats.push({
        id: "geo", titre: "Foyers, contacts partagés et origine géographique", niveau: "MOYEN",
        resume: concentre ? `Plus de la moitié des stagiaires formés dans le ${top.dep}, loin du siège` : "Adresse, courriel ou téléphone communs à plusieurs personnes",
        ampleur: `${pluriel(groupes.length, "groupe")} de contacts partagés${concentre ? ` ; ${pct(top.payes, payes.length)} des services faits dans le ${top.dep}` : ""}`,
        constat: `${groupes.length ? `${pluriel(groupes.length, "adresse, courriel ou téléphone est partagé", "adresses, courriels ou téléphones sont partagés")} entre personnes différentes (tableau ci-dessous).` : ""}${concentre ? ` ${entier(top.payes)} services faits sur ${entier(payes.length)} concernent des stagiaires domiciliés dans le département ${top.dep}${depSiege ? `, alors que le siège est dans le ${depSiege}` : ""}.` : ""}`.trim(),
        lecture: "Un même foyer peut légitimement suivre des formations. Mais des contacts communs à plusieurs stagiaires, ou un recrutement concentré loin du siège, peuvent révéler un relais local ou un démarchage, interdit pour le CPF depuis la loi du 19 décembre 2022.",
        aFaire: "Pour chaque groupe : lien entre les personnes, canal par lequel elles ont connu l'organisme ; justifier le recrutement dans le département concerné (partenaire, lieu de formation).",
        tableaux: groupes.length ? [{ t: { entetes: ["Partagé", "Valeur", "Personnes", "Certif.", "Payés / dossiers"], lignes: groupes, poids: [1, 2.6, 3, 1.4, 1] } }] : [],
        plan: { action: "Origine des stagiaires et contacts partagés", dossiers: pluriel(groupes.length, "groupe"), piece: "Canal d'acquisition, liens entre stagiaires" },
      });
    } else if (ds.length) conformes.push("Aucune adresse, aucun courriel ni aucun téléphone n'est partagé entre deux personnes différentes.");
  }

  /* 9. Prérequis des certifications */
  {
    const lignes: string[][] = [];
    for (const c of codesAVerifier(payes)) {
      const f = ref(c)?.fiche;
      if (!f?.prerequis) continue;
      const pr = court(f.prerequis, 380);
      lignes.push([`${c} ${court(f.i, 50)}`, pr, entier(payes.filter((d) => d.cert === c).length)]);
    }
    if (lignes.length) {
      constats.push({
        id: "prerequis", titre: "Prérequis des certifications", niveau: "MOYEN",
        resume: "Prérequis d'entrée de la fiche à prouver pour chaque stagiaire",
        ampleur: `${pluriel(lignes.length, "certification")}, ${pluriel(somme(lignes.map((l) => +l[2].replace(/\s/g, ""))), "service fait", "services faits")}`,
        constat: "Les fiches France Compétences de ces certifications fixent des prérequis d'entrée (tableau). L'export ne dit rien du niveau, du diplôme ni de l'expérience des stagiaires.",
        lecture: "Un stagiaire qui n'avait pas les prérequis au moment de l'entrée peut faire juger la formation non éligible. Le positionnement d'entrée doit donc les vérifier et en garder la trace.",
        aFaire: "Pour chaque dossier : test de positionnement, CV, diplôme ou attestation d'employeur prouvant les prérequis ; convocation et résultat de l'évaluation.",
        tableaux: [{ t: { entetes: ["Certification", "Prérequis (fiche France Compétences)", "Payés"], lignes, poids: [2, 6, 0.8] } }],
        plan: { action: "Prouver les prérequis d'entrée", dossiers: pluriel(somme(lignes.map((l) => +l[2].replace(/\s/g, ""))), "service fait", "services faits"), piece: "Positionnement, CV, diplômes, attestations" },
      });
    }
  }

  /* 10. Accompagnement VAE */
  {
    const vae = ds.filter(estVae);
    if (vae.length) {
      const p = vae.filter(estPaye);
      const intitules = uniques(vae.map((d) => d.intituleFormation).filter(Boolean));
      constats.push({
        id: "vae", titre: "Accompagnement VAE", niveau: "MOYEN",
        resume: "Activité VAE : catégorie Qualiopi et diplômes visés à justifier",
        ampleur: `${pluriel(vae.length, "dossier")}, ${pluriel(intitules.length, "intitulé")}, ${pluriel(p.length, "payé")} (${eur(somme(p.map(caDe)))})`,
        constat: `${pluriel(vae.length, "dossier")} d'accompagnement VAE depuis le ${fr(vae.map((d) => d.inscription).sort()[0])}, sur ${pluriel(intitules.length, "intitulé")} : ${listeNoms(intitules, 6)}.`,
        lecture: "L'accompagnement VAE financé par le CPF exige la certification Qualiopi dans la catégorie « VAE ». Des diplômes visés très éloignés les uns des autres demandent des accompagnateurs compétents sur chaque métier. La recevabilité (livret 1) doit précéder l'accompagnement.",
        aFaire: "Certificat Qualiopi mentionnant la VAE ; pour chaque candidat : recevabilité, entretiens d'accompagnement, livret 2, convocation au jury ; CV des accompagnateurs.",
        tableaux: [{ t: { entetes: ["Candidat", "Intitulé", "Inscrit le", "Session", "Statut", "Prix"], lignes: vae.map((d) => [nomDe(d), court(d.intituleFormation, 70), fr(d.inscription, true), periode(d), d.statut, eur(d.montant)]), poids: [2, 3.2, 1, 1.8, 1.6, 0.9] } }],
        plan: { action: "Dossier VAE complet", dossiers: pluriel(vae.length, "candidat"), piece: "Qualiopi catégorie VAE, recevabilité, entretiens, jury" },
      });
    }
  }

  /* 11. Délai de 11 jours ouvrés */
  {
    const avec = ds.filter((d) => d.inscription && d.debut).map((d) => ({ d, o: joursOuvres(d.inscription, d.debut) }));
    const courts = avec.filter((x) => x.o < 11);
    const courtsVendus = courts.filter((x) => !estKo(x.d));
    if (courtsVendus.length) {
      constats.push({
        id: "delai", titre: "Entrée en formation avant 11 jours ouvrés", niveau: "ÉLEVÉ",
        resume: "Délai CPF de 11 jours ouvrés non respecté",
        ampleur: pluriel(courtsVendus.length, "dossier"),
        constat: `${pluriel(courtsVendus.length, "dossier payé ou en cours commence", "dossiers payés ou en cours commencent")} moins de 11 jours ouvrés après la demande d'inscription.`,
        lecture: "Les conditions générales de Mon Compte Formation imposent au moins 11 jours ouvrés entre la demande et l'entrée en formation (délai de rétractation). Un dossier qui ne le respecte pas peut être rejeté au moment du paiement.",
        aFaire: "Vérifier ces dossiers dans EDOF (date réelle d'acceptation, report de session) ; corriger le paramétrage des sessions.",
        tableaux: [{ t: { entetes: ["Stagiaire", "Certif.", "Inscrit le", "Début", "Jours ouvrés", "Statut"], lignes: courtsVendus.map(({ d, o }) => [nomDe(d), d.cert, fr(d.inscription), fr(d.debut), String(o), d.statut]), poids: [2.2, 1, 1.1, 1.1, 1, 1.8] } }],
        plan: { action: "Expliquer les entrées avant 11 jours ouvrés", dossiers: pluriel(courtsVendus.length, "dossier"), piece: "Historique EDOF des dossiers" },
      });
    } else if (avec.length) {
      const o = avec.filter((x) => estPaye(x.d)).map((x) => x.o);
      conformes.push(`11 jours ouvrés : respectés pour tous les dossiers payés ou en cours${o.length ? ` (minimum ${Math.min(...o)}, médiane ${mediane(o)})` : ""}.${courts.length ? ` Les ${entier(courts.length)} dossiers sous 11 jours ont tous été refusés ou annulés.` : ""}`);
    }
  }

  /* 12. Service fait, contrôle, mineurs */
  {
    const avant = payes.filter((d) => d.derniereAction && d.fin && d.derniereAction < d.fin);
    const delais = payes.filter((d) => d.derniereAction && d.fin).map((d) => jours(d.fin, d.derniereAction));
    if (avant.length) {
      constats.push({
        id: "serviceFait", titre: "Service fait déclaré avant la fin de la session", niveau: "ÉLEVÉ",
        resume: "Déclaration du service fait antérieure à la fin de formation",
        ampleur: pluriel(avant.length, "dossier"),
        constat: `Pour ${pluriel(avant.length, "dossier")}, la dernière action EDOF (déclaration du service fait) est antérieure à la date de fin de session : ${listeNoms(avant.map((d) => `${nomDe(d)} (${fr(d.derniereAction, true)} pour une fin le ${fr(d.fin, true)})`), 5)}.`,
        lecture: "Le service fait ne peut être déclaré qu'après la fin de la formation. Une déclaration anticipée laisse penser que la formation n'a pas été suivie jusqu'au bout.",
        aFaire: "Vérifier l'historique EDOF des dossiers ; si la fin de session a été avancée, garder la trace de la modification et de son motif.",
        tableaux: [],
        plan: { action: "Expliquer les services faits anticipés", dossiers: pluriel(avant.length, "dossier"), piece: "Historique EDOF, émargements" },
      });
    } else if (delais.length) conformes.push(`Service fait : toujours déclaré après la fin de session (${Math.min(...delais)} à ${Math.max(...delais)} jours après).`);
    const controle = ds.filter((d) => d.enControle);
    if (controle.length) {
      constats.push({
        id: "controle", titre: "Dossiers déjà en contrôle", niveau: "ÉLEVÉ",
        resume: "La Caisse des Dépôts a ouvert un contrôle", ampleur: pluriel(controle.length, "dossier"),
        constat: `${pluriel(controle.length, "dossier est marqué", "dossiers sont marqués")} « en contrôle » dans l'export : ${listeNoms(controle.map((d) => `${nomDe(d)} (${d.numero})`))}.`,
        lecture: "Un contrôle en cours bloque le paiement de ces dossiers et peut s'étendre aux autres dossiers de l'organisme.",
        aFaire: "Réunir immédiatement, pour ces dossiers, toutes les pièces demandées (programme, émargements, évaluations, factures) et répondre dans le délai fixé.",
        tableaux: [], plan: { action: "Répondre au contrôle en cours", dossiers: controle.map((d) => d.numero).join(", "), piece: "Dossier complet par stagiaire" },
      });
    } else if (ds.length) conformes.push("Contrôle : aucun dossier n'est « en contrôle » dans l'export.");
    const ages = ds.filter((d) => d.naissance && (d.debut || d.inscription)).map((d) => ({ d, a: jours(d.naissance, d.debut || d.inscription) / 365.25 }));
    const mineurs = ages.filter((x) => x.a < 18);
    if (mineurs.length) qualite.push(`${pluriel(mineurs.length, "stagiaire mineur", "stagiaires mineurs")} à l'entrée : ${listeNoms(mineurs.map((x) => nomDe(x.d)))} (autorisation du représentant légal à conserver).`);
    else if (ages.length) conformes.push(`Âges : ${Math.floor(Math.min(...ages.map((x) => x.a)))} à ${Math.floor(Math.max(...ages.map((x) => x.a)))} ans ; aucun mineur.`);
  }

  /* 13. Annulations */
  if (ko.length) {
    const cdc = ko.filter((d) => /CDC|caisse/i.test(d.statut));
    const tard = ko.filter((d) => /sans suite/i.test(d.statut) && d.fin && d.derniereAction > d.fin);
    const parStatut = [...grouper(ko, (d) => d.statut).entries()].map(([s, xs]) => `${entier(xs.length)} « ${s} »`).join(", ");
    constats.push({
      id: "annulations", titre: "Refus et annulations", niveau: "FAIBLE",
      resume: "Dossiers non aboutis, dont annulations après la date de session",
      ampleur: `${entier(ko.length)} sur ${entier(ds.length)} (${pct(ko.length, ds.length)})${tard.length ? ` ; ${entier(tard.length)} après la fin de session` : ""}`,
      constat: `${pluriel(ko.length, "dossier n'aboutit", "dossiers n'aboutissent")} pas : ${parStatut}.${tard.length ? ` ${pluriel(tard.length, "« annulé sans suite » l'est", "« annulés sans suite » le sont")} après la fin de la session prévue.` : ""}${cdc.length ? ` Annulés par la Caisse des Dépôts : ${listeNoms(cdc.map(nomDe))}.` : ""}`,
      lecture: "Une annulation « sans suite » après la date de session signifie en général que le stagiaire ne s'est pas présenté. Une annulation par la Caisse des Dépôts peut révéler un dossier jugé non conforme : le motif est à connaître.",
      aFaire: "Garder la preuve que ces stagiaires ne se sont pas présentés ; demander le motif des annulations par la Caisse des Dépôts.",
      tableaux: tard.length ? [{ titre: "Annulés sans suite après la fin de session", t: { entetes: ["Stagiaire", "Certif.", "Session prévue", "Annulé le", "Jours après la fin"], lignes: tard.map((d) => [nomDe(d), d.cert, periode(d), fr(d.derniereAction), String(jours(d.fin, d.derniereAction))]), poids: [2.2, 1, 1.8, 1.2, 1.2] } }] : [],
      plan: { action: "Annulations après la session et par la CDC", dossiers: `${entier(tard.length)} + ${entier(cdc.length)}`, piece: "Preuve d'absence, motif CDC" },
    });
  }

  /* Qualité des données */
  {
    const factureVide = ds.filter((d) => d.facture === null).length;
    if (factureVide === ds.length) qualite.push("Montant « facturé » vide partout : les factures ne sont pas saisies dans EDOF.");
    else if (factureVide) qualite.push(`Montant « facturé » vide pour ${pluriel(factureVide, "dossier")}.`);
    const lieuVide = ds.filter((d) => !d.lieuVille && !d.lieuCp).length;
    if (lieuVide) qualite.push(`Lieu de formation vide pour ${pluriel(lieuVide, "dossier")} : à renseigner (ou indiquer « à distance »).`);
    const sessions = [...grouper(ds.filter((d) => d.session && d.debut), (d) => `${d.cert}|${d.action}|${d.session}`).entries()]
      .map(([k, xs]) => ({ k: k.split("|")[2], cal: uniques(xs.map((d) => `${d.debut}|${d.fin}`)).length })).filter((x) => x.cal > 1);
    if (sessions.length) qualite.push(`Même code de session pour des dates différentes : ${listeNoms(sessions.map((s) => `${s.k} (${s.cal} calendriers)`), 6)}.`);
    const montantVide = ds.filter((d) => d.montant === null).length;
    if (montantVide) qualite.push(`Montant vide sur ${pluriel(montantVide, "dossier")}.`);
    const absents = codesAVerifier(ds).filter((c) => !ref(c)?.index && !ref(c)?.fiche);
    if (absents.length) qualite.push(`Codes absents de la base France Compétences locale : ${absents.join(", ")} (fiche à vérifier).`);
    const intitulesAction = [...grouper(ds, (d) => `${d.cert}|${d.action}`).entries()].filter(([, xs]) => uniques(xs.map((d) => d.intituleFormation)).length > 1);
    if (intitulesAction.length) qualite.push(`Plusieurs intitulés de formation pour la même action : ${listeNoms(intitulesAction.map(([k, xs]) => `${k.replace("|", " action ")} (${uniques(xs.map((d) => d.intituleFormation)).length})`), 5)}.`);
    const ft = ds.filter((d) => d.abondementFT && !/^(non|0|0\.00)$/i.test(d.abondementFT));
    if (ft.length) qualite.push(`Abondement France Travail sur ${pluriel(ft.length, "dossier")}.`);
    const fm = ds.filter((d) => d.forceMajeure).length;
    if (fm) qualite.push(`${pluriel(fm, "cas", "cas")} de force majeure déclarés par le titulaire.`);
    if (!ft.length && !fm) conformes.push("Aucun abondement France Travail ; aucun cas de force majeure.");
  }

  /* tri des constats : ÉLEVÉ, MOYEN, FAIBLE */
  const ordre: Record<Niveau, number> = { "ÉLEVÉ": 0, MOYEN: 1, FAIBLE: 2 };
  constats.sort((a, b) => ordre[a.niveau] - ordre[b.niveau]);

  /* synthèse et conclusion */
  const principale = parCertif.filter((c) => c.total > 0)[0];
  const caEnCours = somme(enCours.map((d) => d.montant));
  const eleves = constats.filter((c) => c.niveau === "ÉLEVÉ");
  const moyens = constats.filter((c) => c.niveau === "MOYEN");
  const absentsSignaux = [
    !constats.some((c) => c.id === "multi") && "pas de multi-certification",
    !constats.some((c) => c.id === "prix" && c.niveau === "ÉLEVÉ") && "pas de prix calé sur le solde du compte",
    !constats.some((c) => c.id === "geo") && "pas de foyer ni de contact partagé",
    !constats.some((c) => c.id === "delai") && "délais respectés",
  ].filter(Boolean) as string[];
  const synthese = `Sur l'ensemble de l'export, ${pluriel(payes.length, "dossier est", "dossiers sont")} en service fait validé, pour ${eur(ca)}${anneesCa.length > 1 ? ` : ${caAnnees}` : anneesCa.length ? ` (${caAnnees})` : ""}. ${enCours.length ? `${pluriel(enCours.length, "dossier est", "dossiers sont")} en cours pour ${eur(caEnCours)}. ` : ""}${ds.every((d) => d.facture === null) ? "Aucun montant « facturé » n'est renseigné. " : ""}${principale ? `L'activité repose d'abord sur ${principale.cert} « ${principale.intitule} » (${pct(principale.total, ca)} du chiffre d'affaires validé).` : ""}${absentsSignaux.length ? ` Signaux absents : ${absentsSignaux.join(", ")}.` : ""}`;
  const conclusion = `${organisme} a réalisé ${eur(ca)} de chiffre d'affaires CPF validé${anneesCa.length ? ` (${caAnnees})` : ""}. ${absentsSignaux.length ? `Plusieurs signaux recherchés par la Caisse des Dépôts sont absents : ${absentsSignaux.join(", ")}. ` : ""}${eleves.length ? `${eleves.length > 1 ? `${entier(eleves.length)} points demandent` : "Un point demande"} une réponse rapide : ${eleves.map((c) => c.titre.toLowerCase()).join(" ; ")}. ` : "Aucun constat de niveau élevé n'a été relevé. "}${moyens.length ? `Il faut aussi tenir prêtes, dossier par dossier, les preuves sur : ${moyens.map((c) => c.titre.toLowerCase()).join(" ; ")}.` : ""}`;

  return {
    organisme, siret, entreprise: ent || null, dateReferentiel: getMetaFC()?.exportDate || "", dateExport, dateRapport, annees, anneeEnCours, dossiers: ds,
    personnes: parCle.size,
    premiereInscription: ds.map((d) => d.inscription).filter(Boolean).sort()[0] || "",
    derniereInscription: ds.map((d) => d.inscription).filter(Boolean).sort().pop() || "",
    servicesFaits: payes.length, ca, caParAnnee,
    enCours: { n: enCours.length, montant: caEnCours, liste: enCours },
    statuts, parCertif, parMois, departements, parAction, constats, conformes, qualite, synthese, conclusion,
  };
}

/** Nom de fichier du rapport : Audit_EDOF_2025-2026_NOM_OF.pdf */
export function nomRapport(a: AuditEdof): string {
  const ans = a.annees.length ? (a.annees.length > 1 ? `${a.annees[0]}-${a.annees[a.annees.length - 1]}` : `${a.annees[0]}`) : "";
  const nom = sansAccent(a.organisme).toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_|_$/g, "");
  return `Audit_EDOF_${ans}_${nom || a.siret}.pdf`;
}

/** Fiche, entrée d'index et habilitations France Compétences de chaque code RS / RNCP de l'export. */
export async function chargerReferentiels(ds: DossierEdof[]): Promise<Record<string, ReferentielCode>> {
  await loadIndexFC();
  const out: Record<string, ReferentielCode> = {};
  await Promise.all(codesAVerifier(ds).map(async (c) => {
    const [fiche, hab] = await Promise.all([loadFicheFC(c), loadHabilitationsFC(c)]);
    out[c] = { index: getIndexFC(c), fiche, hab };
  }));
  return out;
}
