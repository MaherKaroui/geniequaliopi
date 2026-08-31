/**
 * Remplissage automatique du CERFA 10103*14 à partir d'APIs publiques gratuites.
 *
 * Règle commune : en cas d'échec, de quota dépassé ou de résultat vide, on renvoie
 * une valeur VIDE et un avertissement. Aucune valeur de repli n'est inventée.
 * Toutes les réponses sont mises en cache mémoire pour éviter de rappeler l'API.
 */
import { supabase } from "@/integrations/supabase/client";

const cache = new Map<string, unknown>();
async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (cache.has(key)) return cache.get(key) as T;
  const v = await fn();
  cache.set(key, v);
  return v;
}

export interface LookupResult<T> {
  data: T | null;
  avertissement?: string;
}

/* ------------------------------------------------------------------ */
/* 2.a — Entreprise (SIRET / SIREN / nom / URL Pappers)                */
/* ------------------------------------------------------------------ */

export interface EtablissementTrouve {
  denomination: string;
  siret: string;
  siren: string;
  numeroVoie: string;
  voie: string;
  complement: string;
  codePostal: string;
  commune: string;
  codeApe: string;
  trancheEffectif: string;
  formeJuridique: string;
  dirigeant: string;
  libelle: string;
}

/** Extrait un SIRET/SIREN d'une URL Pappers ou d'une saisie libre. */
export function extraireIdentifiant(saisie: string): { type: "siret" | "siren" | "texte"; valeur: string } {
  const t = (saisie || "").trim();
  const chiffres = t.replace(/\D/g, "");
  if (/pappers\.fr/i.test(t)) {
    const m = t.match(/(\d{9,14})/);
    if (m) {
      const n = m[1];
      return n.length >= 14 ? { type: "siret", valeur: n.slice(0, 14) } : { type: "siren", valeur: n.slice(0, 9) };
    }
  }
  if (chiffres.length === 14 && chiffres === t.replace(/\s/g, "")) return { type: "siret", valeur: chiffres };
  if (chiffres.length === 14) return { type: "siret", valeur: chiffres };
  if (chiffres.length === 9) return { type: "siren", valeur: chiffres };
  return { type: "texte", valeur: t };
}

const EFFECTIF_LABELS: Record<string, string> = {
  NN: "", "00": "0 salarié", "01": "1 ou 2 salariés", "02": "3 à 5 salariés", "03": "6 à 9 salariés",
  "11": "10 à 19 salariés", "12": "20 à 49 salariés", "21": "50 à 99 salariés", "22": "100 à 199 salariés",
  "31": "200 à 249 salariés", "32": "250 à 499 salariés", "41": "500 à 999 salariés", "42": "1000 à 1999 salariés",
  "51": "2000 à 4999 salariés", "52": "5000 à 9999 salariés", "53": "10000 salariés et plus",
};

function mapEtablissement(company: Record<string, any>, siege: Record<string, any>): EtablissementTrouve {
  const dir = (company.dirigeants || [])[0] || {};
  const dirigeant = [dir.prenoms || dir.prenom || "", dir.nom || dir.nom_complet || ""].join(" ").trim();
  return {
    denomination: company.nom_complet || company.nom_raison_sociale || "",
    siret: siege.siret || "",
    siren: company.siren || "",
    numeroVoie: siege.numero_voie || "",
    voie: [siege.type_voie, siege.libelle_voie].filter(Boolean).join(" ").trim(),
    complement: siege.complement_adresse || "",
    codePostal: siege.code_postal || "",
    commune: siege.libelle_commune || siege.commune || "",
    codeApe: siege.activite_principale || company.activite_principale || "",
    trancheEffectif: EFFECTIF_LABELS[String(company.tranche_effectif_salarie || "")] || "",
    formeJuridique: company.nature_juridique || "",
    dirigeant,
    libelle: `${company.nom_complet || ""} — ${siege.siret || ""} — ${siege.libelle_commune || ""}`,
  };
}

/** Recherche d'entreprise via l'API publique gratuite recherche-entreprises.api.gouv.fr */
export async function rechercherEntreprise(saisie: string): Promise<LookupResult<EtablissementTrouve[]>> {
  const { valeur } = extraireIdentifiant(saisie);
  if (!valeur) return { data: null, avertissement: "Saisie vide" };
  return cached(`ent:${valeur}`, async () => {
    try {
      const url = `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(valeur)}&per_page=10`;
      const r = await fetch(url);
      if (!r.ok) return { data: null, avertissement: `API entreprises indisponible (${r.status}) — champs laissés vides` };
      const j = await r.json();
      const results: EtablissementTrouve[] = (j.results || []).flatMap((c: Record<string, any>) => {
        const sieges = [c.siege, ...(c.matching_etablissements || [])].filter(Boolean);
        const uniques = new Map<string, EtablissementTrouve>();
        sieges.forEach((s: Record<string, any>) => {
          const e = mapEtablissement(c, s);
          if (e.siret) uniques.set(e.siret, e);
        });
        return Array.from(uniques.values());
      });
      if (!results.length) return { data: null, avertissement: "Aucune entreprise trouvée — champs laissés vides" };
      return { data: results };
    } catch {
      return { data: null, avertissement: "Appel API entreprises impossible — champs laissés vides" };
    }
  });
}

/** Convention collective (IDCC) depuis le SIRET — API publique de la Fabrique sociale. */
export async function rechercherIdcc(siret: string): Promise<LookupResult<{ idcc: string; titre: string }>> {
  const n = (siret || "").replace(/\D/g, "");
  if (n.length !== 14) return { data: null, avertissement: "SIRET incomplet — IDCC non recherché" };
  return cached(`idcc:${n}`, async () => {
    try {
      const r = await fetch(`https://siret2idcc.fabrique.social.gouv.fr/api/v2/${n}`);
      if (!r.ok) return { data: null, avertissement: "Aucune convention collective trouvée — saisir 9999 si aucune ne s'applique" };
      const j = await r.json();
      const conv = (Array.isArray(j) ? j[0]?.conventions?.[0] : j?.conventions?.[0]) || null;
      if (!conv?.num) return { data: null, avertissement: "Aucune convention collective trouvée — saisir 9999 si aucune ne s'applique" };
      return { data: { idcc: String(conv.num).padStart(4, "0"), titre: conv.title || conv.shortTitle || "" } };
    } catch {
      return { data: null, avertissement: "Aucune convention collective trouvée — saisir 9999 si aucune ne s'applique" };
    }
  });
}

/* ------------------------------------------------------------------ */
/* 2.b — NIR de l'apprenti                                             */
/* ------------------------------------------------------------------ */

export interface NirDecode {
  sexe: "M." | "Mme";
  anneeNaissance: string; // AAAA (siècle non encodé : déduit et signalé)
  moisNaissance: string; // MM
  departementNaissance: string; // 01..95, 2A/2B, 99
  codeInsee: string;
  communeNaissance: string;
  cleValide: boolean;
  neAEtranger: boolean;
}

export function cleNirValide(nir: string): boolean {
  const brut = (nir || "").toUpperCase().replace(/\s/g, "");
  if (brut.length !== 15) return false;
  const corps = brut.slice(0, 13).replace("2A", "19").replace("2B", "18");
  if (!/^\d{13}$/.test(corps)) return false;
  const cle = parseInt(brut.slice(13), 10);
  if (isNaN(cle)) return false;
  return 97 - Number(BigInt(corps) % 97n) === cle;
}

/** Décode le NIR et résout la commune de naissance via geo.api.gouv.fr. */
export async function decoderNir(nir: string, dateNaissanceSaisie?: string): Promise<LookupResult<NirDecode>> {
  const brut = (nir || "").toUpperCase().replace(/\s/g, "");
  if (brut.length !== 15) return { data: null, avertissement: "NIR incomplet (15 caractères attendus)" };
  const sexe = brut[0] === "1" ? "M." : brut[0] === "2" ? "Mme" : null;
  if (!sexe) return { data: null, avertissement: "NIR invalide : le 1er caractère doit être 1 ou 2" };
  const aa = brut.slice(1, 3);
  const mm = brut.slice(3, 5);
  const dep = brut.slice(5, 7);
  const com = brut.slice(7, 10);
  // Siècle déduit : un apprenti né après 1930 — 00-30 → 2000+, sinon 1900+
  const annee = parseInt(aa, 10) <= 30 ? `20${aa}` : `19${aa}`;
  const neAEtranger = dep === "99";
  const codeInsee = neAEtranger ? "" : `${dep}${com}`;

  let commune = "";
  let avert: string | undefined;
  if (codeInsee) {
    const res = await cached(`insee:${codeInsee}`, async () => {
      try {
        const r = await fetch(`https://geo.api.gouv.fr/communes/${codeInsee}`);
        if (!r.ok) return "";
        const j = await r.json();
        return j?.nom || "";
      } catch {
        return "";
      }
    });
    commune = res as string;
    if (!commune) avert = "Commune de naissance non résolue depuis le code INSEE — champ laissé vide";
  } else {
    avert = "Né(e) à l'étranger (département 99) — commune de naissance à saisir";
  }

  const cleValide = cleNirValide(brut);
  if (!cleValide) avert = [avert, "Clé de contrôle du NIR incorrecte"].filter(Boolean).join(" — ");
  if (dateNaissanceSaisie && /^\d{4}-\d{2}/.test(dateNaissanceSaisie)) {
    const [a, m] = dateNaissanceSaisie.split("-");
    if (a !== annee || m !== mm) {
      avert = [avert, `Date de naissance saisie (${dateNaissanceSaisie}) incohérente avec le NIR (${mm}/${annee})`]
        .filter(Boolean)
        .join(" — ");
    }
  }

  return {
    data: {
      sexe,
      anneeNaissance: annee,
      moisNaissance: mm,
      departementNaissance: dep === "2A" || dep === "2B" ? dep : dep,
      codeInsee,
      communeNaissance: commune,
      cleValide,
      neAEtranger,
    },
    avertissement: avert,
  };
}

/* ------------------------------------------------------------------ */
/* 2.c — Code RNCP                                                     */
/* ------------------------------------------------------------------ */

export interface FicheRncp {
  code: string;
  intitule: string;
  niveau: string;
  codeDiplome: string;
  active: boolean;
  dateEcheance: string;
  lien: string;
}

export async function rechercherRncp(saisie: string): Promise<LookupResult<FicheRncp>> {
  const code = (saisie || "").replace(/\D/g, "");
  if (!code) return { data: null, avertissement: "Code RNCP vide" };
  return cached(`rncp:${code}`, async () => {
    // 1) Jeu de données ouvert France Compétences (data.gouv / tabular API)
    try {
      const { data, error } = await supabase.functions.invoke("fc-rncp-lookup", { body: { query: code } });
      if (!error && data && !data.error && data.intitule) {
        const ech = String(data.dateEcheance || "");
        const echIso = ech.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/)
          ? `${ech.slice(6, 10)}-${ech.slice(3, 5)}-${ech.slice(0, 2)}`
          : "";
        return {
          data: {
            code: `RNCP${code}`,
            intitule: data.intitule as string,
            niveau: String(data.niveau || ""),
            codeDiplome: "",
            active: !echIso || echIso >= new Date().toISOString().slice(0, 10),
            dateEcheance: echIso,
            lien: (data.lien as string) || `https://www.francecompetences.fr/recherche/rncp/${code}/`,
          } as FicheRncp,
        };
      }
    } catch {
      /* on retombe sur l'avertissement */
    }
    return { data: null, avertissement: "Fiche RNCP injoignable — champs formation laissés vides" };
  });
}

/* ------------------------------------------------------------------ */
/* 2.d — Autocomplétion d'adresse                                      */
/* ------------------------------------------------------------------ */

export interface AdresseSuggestion {
  label: string;
  numero: string;
  voie: string;
  codePostal: string;
  commune: string;
  codeInsee: string;
}

export async function rechercherAdresse(saisie: string): Promise<LookupResult<AdresseSuggestion[]>> {
  const q = (saisie || "").trim();
  if (q.length < 4) return { data: null };
  return cached(`adr:${q.toLowerCase()}`, async () => {
    try {
      const r = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=6`);
      if (!r.ok) return { data: null, avertissement: "Autocomplétion d'adresse indisponible" };
      const j = await r.json();
      const data: AdresseSuggestion[] = (j.features || []).map((ft: Record<string, any>) => {
        const p = ft.properties || {};
        return {
          label: p.label || "",
          numero: p.housenumber || "",
          voie: p.street || p.name || "",
          codePostal: p.postcode || "",
          commune: p.city || "",
          codeInsee: p.citycode || "",
        };
      });
      return data.length ? { data } : { data: null, avertissement: "Aucune adresse trouvée" };
    } catch {
      return { data: null, avertissement: "Autocomplétion d'adresse indisponible" };
    }
  });
}

/* ------------------------------------------------------------------ */
/* 2.e — N° UAI du CFA depuis son SIRET                                */
/* ------------------------------------------------------------------ */

export async function rechercherUai(siret: string): Promise<LookupResult<{ uai: string; nom: string }>> {
  const n = (siret || "").replace(/\D/g, "");
  if (n.length < 9) return { data: null, avertissement: "SIRET du CFA incomplet — UAI non recherché" };
  return cached(`uai:${n}`, async () => {
    try {
      const where = encodeURIComponent(`siren_siret="${n}"`);
      const url = `https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?where=${where}&limit=1`;
      const r = await fetch(url);
      if (!r.ok) return { data: null, avertissement: "Annuaire de l'éducation indisponible — UAI laissé vide" };
      const j = await r.json();
      const rec = (j.results || [])[0];
      if (!rec?.identifiant_de_l_etablissement) {
        return { data: null, avertissement: "Aucun UAI trouvé pour ce SIRET — champ laissé vide" };
      }
      return { data: { uai: rec.identifiant_de_l_etablissement as string, nom: (rec.nom_etablissement as string) || "" } };
    } catch {
      return { data: null, avertissement: "Annuaire de l'éducation indisponible — UAI laissé vide" };
    }
  });
}
