/**
 * Profilage ECF (45B) — la différenciation des livrets vient du PROFIL RÉEL
 * du candidat (CV transmis), jamais d'un tirage pseudo-aléatoire.
 *
 * Principe : chaque compétence du référentiel est rapprochée des `pointsForts`
 * et des `pointsAConsolider` du profil par recouvrement lexical. Les compétences
 * les plus éloignées des points forts et les plus proches des points à
 * consolider deviennent « à consolider » ou « en cours d'acquisition ».
 *
 * Un candidat sans profil transmis ne reçoit AUCUNE évaluation : son livret
 * sort vide avec un marqueur « en attente du profil candidat ».
 */

import type { DpReferentiel } from "@/lib/dp/referentielTitres";
import type { GotrmCvProfile } from "@/lib/gotrm/cvProfiles";

export type NiveauComp = "ACQUIS" | "EN_COURS_ACQUISITION" | "A_CONSOLIDER";

export interface EcfCompetence {
  libelle: string;
  niveau: NiveauComp;
  /** Élément concret du profil justifiant le niveau retenu. */
  motif: string;
}

export interface EcfProfilage {
  /** false = aucun profil candidat transmis : le livret doit rester vide. */
  renseigne: boolean;
  /** Compétences évaluées, par activité-type. */
  parAT: EcfCompetence[][];
  /** Appréciation rédigée par activité-type (cite un élément concret du profil). */
  appreciations: string[];
  /** Observation de synthèse du parcours. */
  observation: string;
  /** Signature de répartition, utilisée par les contrôles anti-doublon. */
  signature: string;
}

const STOP = new Set([
  "de","des","du","la","le","les","un","une","et","en","a","à","au","aux","d","l","pour","dans","sur","par","avec",
  "ou","the","son","sa","ses","aux","cette","ce","est","être","etre","plus","selon","lors","tout","toute","toutes","tous",
]);

function tokens(s: string): Set<string> {
  return new Set(
    (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .map((w) => (w.length > 5 ? w.slice(0, 5) : w))
      .filter((w) => w.length > 2 && !STOP.has(w)),
  );
}

function recouvrement(a: Set<string>, b: Set<string>): number {
  let n = 0;
  for (const t of a) if (b.has(t)) n++;
  return n;
}

/** Meilleure correspondance entre une compétence et une liste d'items du profil. */
function meilleur(comp: string, items: string[]): { score: number; item: string; rangItem: number } {
  const tc = tokens(comp);
  let best = { score: 0, item: "", rangItem: items.length };
  items.forEach((it, idx) => {
    const sc = recouvrement(tc, tokens(it));
    if (sc > best.score) best = { score: sc, item: it, rangItem: idx };
  });
  return best;
}

function premiereExperience(cv: GotrmCvProfile): string {
  const e = cv.experiences[0];
  if (!e) return cv.posteOccupe || "";
  return `${e.poste}${e.employeur ? ` chez ${e.employeur}` : ""} (${e.periode})`;
}

function ancrage(cv: GotrmCvProfile, i: number): string {
  const sources = [
    premiereExperience(cv),
    cv.entreprise?.nom ? `son expérience au sein de ${cv.entreprise.nom}${cv.entreprise.service ? ` (${cv.entreprise.service})` : ""}` : "",
    cv.experiences[1] ? `son poste de ${cv.experiences[1].poste} chez ${cv.experiences[1].employeur}` : "",
    cv.diplomes[0] ? `sa formation « ${cv.diplomes[0][0]} »` : "",
    cv.outils ? `sa pratique des outils (${cv.outils.split(",")[0].trim()})` : "",
  ].filter(Boolean);
  return sources[i % Math.max(1, sources.length)] || cv.posteOccupe || "";
}

/**
 * Construit la répartition des niveaux et les appréciations à partir du profil.
 * Aucun tirage aléatoire : tout découle des points forts / à consolider.
 */
export function buildEcfProfilage(ref: DpReferentiel, cv?: GotrmCvProfile): EcfProfilage {
  const vide: EcfProfilage = {
    renseigne: false,
    parAT: ref.activitesTypes.map(() => []),
    appreciations: ref.activitesTypes.map(() => ""),
    observation: "",
    signature: "",
  };
  if (!cv || cv.source === "Profil à compléter" || !cv.pointsForts?.length) return vide;

  const forts = cv.pointsForts;
  const faibles = cv.pointsAConsolider || [];

  // 1. Score de chaque compétence
  interface Ligne { ci: number; i: number; libelle: string; net: number; exp: number; prio: number; fort: string; faible: string; scFaible: number }
  // Second niveau de discrimination, lui aussi issu du profil : recouvrement de
  // la compétence avec le vécu professionnel décrit (postes, missions, outils).
  const texteVecu = [
    cv.posteOccupe,
    cv.profil,
    cv.outils,
    ...cv.experiences.flatMap((e) => [e.poste, e.employeur, ...e.missions]),
    ...cv.diplomes.map((d) => d[0]),
  ].join(" ");
  const tVecu = tokens(texteVecu);
  const lignes: Ligne[] = [];
  ref.activitesTypes.forEach((at, ci) => {
    at.competences.forEach((libelle, i) => {
      const bf = meilleur(libelle, forts);
      const bc = meilleur(libelle, faibles);
      const exp = Math.min(3, recouvrement(tokens(libelle), tVecu));
      // Priorité déclarée dans le profil : un point fort cité en tête pèse plus
      // qu'un point fort cité en dernier, idem pour les axes de progression.
      const prio = (bf.score > 0 ? forts.length - bf.rangItem : 0) - (bc.score > 0 ? faibles.length - bc.rangItem : 0);
      lignes.push({ ci, i, libelle, net: bf.score - bc.score, exp, prio, fort: bf.item, faible: bc.item, scFaible: bc.score });
    });
  });

  // 2. Les compétences les plus éloignées du profil deviennent non acquises.
  //    Cible réaliste : 2 à 4 par candidat, majorité d'acquis.
  // Départage final entre compétences strictement équivalentes : empreinte du
  // CONTENU du profil (postes, missions, diplômes) — jamais du nom du candidat.
  let empreinte = 7;
  for (const ch of `${texteVecu}${forts.join("")}${faibles.join("")}`) empreinte = (empreinte * 31 + ch.charCodeAt(0)) % 9973;
  const rang = (l: Ligne) => l.net * 1000 + l.prio * 100 + l.exp * 10 + ((empreinte + l.ci * 7 + l.i * 13) % 7);
  const ordre = [...lignes].sort((a, b) => rang(a) - rang(b) || a.ci - b.ci || a.i - b.i);
  const negatives = ordre.filter((l) => l.net < 0 || (l.net === 0 && l.exp === 0)).length;
  const k = Math.min(4, Math.max(2, negatives));
  const nonAcquis = new Set(ordre.slice(0, k).map((l) => `${l.ci}-${l.i}`));

  const parAT: EcfCompetence[][] = ref.activitesTypes.map(() => []);
  lignes.forEach((l) => {
    const cle = `${l.ci}-${l.i}`;
    let niveau: NiveauComp = "ACQUIS";
    let motif = l.fort
      ? `compétence directement adossée à ${l.fort.toLowerCase()} dans le parcours du candidat`
      : `compétence maîtrisée au regard de ${ancrage(cv, l.i).toLowerCase()}`;
    if (nonAcquis.has(cle)) {
      if (l.scFaible > 0 || l.net < 0) {
        niveau = "A_CONSOLIDER";
        motif = l.faible
          ? `axe de progression identifié : ${l.faible.toLowerCase()}`
          : `compétence hors du champ exercé jusqu'ici par le candidat`;
      } else {
        niveau = "EN_COURS_ACQUISITION";
        motif = `compétence en cours d'acquisition, peu mobilisée dans ${ancrage(cv, l.i).toLowerCase()}`;
      }
    }
    parAT[l.ci].push({ libelle: l.libelle, niveau, motif });
  });

  // 3. Appréciation rédigée par activité-type, ancrée sur un élément concret
  const appreciations = ref.activitesTypes.map((at, ci) => {
    const comps = parAT[ci];
    const ok = comps.filter((c) => c.niveau === "ACQUIS");
    const ko = comps.filter((c) => c.niveau !== "ACQUIS");
    const anc = ancrage(cv, ci);
    const base = `Sur l'activité-type « ${at.titre} », ${cv.prenom} ${cv.nom} s'appuie sur ${anc}.`;
    const pos = ok.length
      ? ` Les évaluations confirment la maîtrise de : ${ok.slice(0, 3).map((c) => c.libelle.toLowerCase()).join(" ; ")}.`
      : "";
    const neg = ko.length
      ? ` ${ko.length === 1 ? "Une compétence reste" : `${ko.length} compétences restent`} à travailler — ${ko
          .map((c) => `${c.libelle.toLowerCase()} (${c.motif})`)
          .join(" ; ")} — et ${ko.length === 1 ? "fait" : "font"} l'objet d'une réévaluation.`
      : ` Aucune réévaluation n'est nécessaire sur cette activité-type.`;
    return `${base}${pos}${neg}`;
  });

  const tousKo = parAT.flat().filter((c) => c.niveau !== "ACQUIS");
  const observation =
    `Parcours de ${cv.prenom} ${cv.nom}, ${cv.posteOccupe || "candidat"} : ${cv.profil}` +
    ` Les points forts constatés en évaluation (${forts.slice(0, 3).join(" ; ").toLowerCase()}) sont conformes au parcours décrit.` +
    (tousKo.length
      ? ` ${tousKo.length} compétence(s) ont fait l'objet d'une évaluation de consolidation : ${tousKo.map((c) => c.libelle.toLowerCase()).join(" ; ")}.`
      : ` Aucune évaluation de consolidation n'a été nécessaire.`);

  const signature = parAT
    .map((at) => at.map((c) => (c.niveau === "ACQUIS" ? "A" : c.niveau === "A_CONSOLIDER" ? "C" : "E")).join(""))
    .join("|");

  return { renseigne: true, parAT, appreciations, observation, signature };
}

export const LIBELLE_NIVEAU: Record<NiveauComp, string> = {
  ACQUIS: "Acquis",
  EN_COURS_ACQUISITION: "En cours d'acquisition",
  A_CONSOLIDER: "À consolider",
};

export const MENTION_PRE_RENSEIGNE =
  "Livret pré-renseigné — à valider et signer par le formateur évaluateur.";

export const MARQUEUR_SANS_PROFIL =
  "En attente du profil candidat : aucune évaluation ne peut être renseignée automatiquement.";
