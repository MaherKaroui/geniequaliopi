import type { FormationInfo, ReferentielAnalyse, StagiaireInfo } from "@/types/qualiopi";
import { generateFakeStagiairesIDF } from "@/lib/fakeStagiaireIDF";
import type { RegionKey } from "@/lib/fakeStagiaireRegions";

export type { ReferentielAnalyse } from "@/types/qualiopi";

export function isReferentielInactif(r: ReferentielAnalyse): boolean {
  if (r.actif === false) return true;
  if (r.dateFinEnregistrement) {
    const d = new Date(r.dateFinEnregistrement);
    if (!isNaN(d.getTime()) && d.getTime() < Date.now()) return true;
  }
  return false;
}

/** Référentiel minimal déduit de l'étape Formation quand aucune fiche n'est fournie. */
export function referentielFromFormation(f: FormationInfo): ReferentielAnalyse {
  const code = (f.codeRNCP || "").toUpperCase().replace(/\s/g, "");
  const niv = /niveau\s*([3-8])/i.exec(`${f.intitule} ${f.publicVise} ${f.prerequis}`);
  return {
    code, type: code.startsWith("RNCP") ? "RNCP" : code.startsWith("RS") ? "RS" : "",
    intitule: f.intitule || "", niveau: niv ? Number(niv[1]) : null, certificateur: "",
    dateFinEnregistrement: "", actif: null, blocs: [], prerequis: f.prerequis || "",
    publicVise: f.publicVise || "", codesRome: [], metiers: f.intitule ? [f.intitule] : [], secteurs: [],
    modalitesEvaluation: f.methodesEvaluation || "",
  };
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = <T,>(a: T[], r: () => number) => a[Math.floor(r() * a.length)];

const DIPLOMES: Record<number, string[]> = {
  2: ["Diplôme national du brevet", "Sans diplôme"],
  3: ["CAP", "BEP", "Titre professionnel niveau 3"],
  4: ["Baccalauréat général", "Baccalauréat professionnel", "Baccalauréat technologique"],
  5: ["BTS", "DUT", "BUT (2 ans validés)", "Titre professionnel niveau 5"],
  6: ["Licence", "Licence professionnelle", "Bachelor"],
  7: ["Master", "Diplôme d'ingénieur"],
};

function diplomeFor(niveauVise: number | null, prerequis: string, r: () => number): string {
  const p = prerequis.toLowerCase();
  let min = 2;
  if (/bac\s*\+\s*3|licence|niveau\s*6/.test(p)) min = 6;
  else if (/bac\s*\+\s*2|bts|dut|niveau\s*5/.test(p)) min = 5;
  else if (/\bbac\b|baccalaur|niveau\s*4/.test(p)) min = 4;
  else if (/\bcap\b|niveau\s*3/.test(p)) min = 3;
  const max = niveauVise ? Math.max(2, niveauVise - 1) : 5;
  const lo = Math.min(min, max);
  const lvl = lo + Math.floor(r() * (max - lo + 1));
  return pick(DIPLOMES[Math.min(7, Math.max(2, lvl))], r);
}

function luhnOk(n: string) {
  let s = 0;
  for (let i = 0; i < n.length; i++) {
    let d = Number(n[n.length - 1 - i]);
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    s += d;
  }
  return s % 10 === 0;
}
function siret(r: () => number): string {
  const base = String(1 + Math.floor(r() * 9)) + Array.from({ length: 12 }, () => Math.floor(r() * 10)).join("");
  for (let c = 0; c < 10; c++) if (luhnOk(base + c)) return base + c;
  return base + "0";
}

const PREFIXES = ["Atelier", "Cabinet", "Groupe", "Maison", "Société", "Espace", "Studio", "Agence", "Établissements"];
const RUES = ["rue de la République", "avenue Jean Jaurès", "boulevard Victor Hugo", "rue du Commerce", "avenue de la Gare", "rue Pasteur", "ZA des Tilleuls", "rue de l'Industrie"];

function birthDate(ref: Date, minAge: number, maxAge: number, r: () => number) {
  const age = minAge + Math.floor(r() * (maxAge - minAge + 1));
  const d = new Date(ref);
  d.setFullYear(d.getFullYear() - age - 1);
  d.setDate(d.getDate() + 1 + Math.floor(r() * 360));
  return d.toISOString().slice(0, 10);
}

export interface ReferentielGenOptions {
  count: number;
  region: RegionKey | "all";
  referentiel: ReferentielAnalyse;
  formation: FormationInfo;
  seed?: number;
}

export function isApprentissage(f: FormationInfo) {
  return !!(f.rythmeAlternance && f.rythmeAlternance.trim()) || /apprenti|alternance/i.test(`${f.intitule} ${f.modalites} ${f.publicVise}`);
}

export function generateStagiairesFromReferentiel(o: ReferentielGenOptions): StagiaireInfo[] {
  const seed = o.seed ?? Math.floor(Math.random() * 2 ** 31);
  const r = rng(seed ^ 0x5f3759df);
  const f = o.formation;
  const ref = o.referentiel;
  const appr = isApprentissage(f);
  const secteur = ref.secteurs[0] || "";
  const metiers = ref.metiers.length ? ref.metiers : [ref.intitule || f.intitule || "Collaborateur"].filter(Boolean);
  const refDate = f.dateDebut ? new Date(f.dateDebut) : new Date();
  // Ratio H/F : secteurs connotés, sinon ~50 %
  const txt = `${secteur} ${metiers.join(" ")} ${ref.intitule}`.toLowerCase();
  const ratioF = /esth|ongl|beaut|coiff|petite enfance|secrétar|assistant|santé|aide|soin/.test(txt) ? 0.85
    : /bâtiment|btp|électri|mécan|plomb|transport|logist|vitrage|menuis|bouch|informati|réseau/.test(txt) ? 0.2 : 0.5;
  const base = generateFakeStagiairesIDF({ count: o.count, region: o.region, seed, genderRatio: ratioF });
  const dirigeants = generateFakeStagiairesIDF({ count: o.count, region: o.region, seed: seed + 7 });

  return base.map((s, i) => {
    const metier = pick(metiers, r);
    const hasEntreprise = appr || r() < 0.6;
    const resp = dirigeants[i];
    const entrepriseNom = hasEntreprise ? `${pick(PREFIXES, r)} ${resp.nom.charAt(0) + resp.nom.slice(1).toLowerCase()}${secteur ? ` – ${secteur}` : ""}` : "";
    const fem = s.civilite === "Mme";
    const poste = appr ? `Apprenti${fem ? "e" : ""} – ${metier}` : hasEntreprise ? metier : `En reconversion – ${metier}`;
    return {
      ...s,
      dateNaissance: appr ? birthDate(refDate, 16, 29, r) : birthDate(refDate, 18, 60, r),
      diplome: diplomeFor(ref.niveau, ref.prerequis || f.prerequis || "", r),
      poste,
      entreprise: entrepriseNom,
      responsableEntreprise: hasEntreprise ? `${resp.prenom} ${resp.nom}` : "",
      emailResponsable: hasEntreprise ? resp.email : "",
      siretEntreprise: hasEntreprise ? siret(r) : "",
      adresseEntreprise: hasEntreprise ? `${1 + Math.floor(r() * 120)} ${pick(RUES, r)}, ${s.codePostal} ${s.commune}` : "",
      financeur: appr ? "OPCO" : hasEntreprise ? pick(["OPCO", "Entreprise", "CPF"], r) : pick(["CPF", "France Travail", "Personnel"], r),
      dateDebutFormation: f.dateDebut || "",
      dateFinFormation: f.dateFin || "",
      tarifFormation: f.tarif || "",
      rqth: r() < 0.05 ? "oui" : "non",
      fictif: true,
    } as StagiaireInfo;
  });
}
