/**
 * Contrôles BLOQUANTS avant export des DP (45A) et ECF (45B).
 *
 * Deux familles de règles :
 *  - période d'exercice : elle doit être renseignée, durer au moins 7 jours et
 *    ne jamais coïncider avec les dates de la session de formation ;
 *  - duplication : plus de 40 caractères consécutifs identiques entre deux
 *    dossiers, ou entre deux exemples d'un même dossier, sont rédhibitoires
 *    (même mécanisme que le contrôle BDC de `src/lib/bdc/bdcCompliance.ts`).
 */

import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDpDossier, parsePeriodeFr, type DpDossierData } from "@/lib/gotrm/ecfDp";
import { getStagiaireDateDebut, getStagiaireDateFin } from "@/lib/docBuilder";
import { resolveReferentiel } from "@/lib/dp/referentielTitres";
import { findGotrmProfile } from "@/lib/gotrm/cvProfiles";
import { buildEcfProfilage } from "@/lib/dp/ecfProfilage";

export interface DpAnomalie {
  candidat: string;
  regle: string;
  message: string;
}

const SEUIL_DUPLICATION = 40;

function norm(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
}

/**
 * Bloc comparable : la rubrique rédigée dans son ensemble. Une rubrique
 * dépassant 40 caractères et strictement identique à celle d'un autre exemple
 * ou d'un autre dossier constitue une duplication bloquante.
 */
function blocs(texte: string): string[] {
  const n = norm(texte);
  return n.length > SEUIL_DUPLICATION ? [n] : [];
}

function nomCandidat(s: StagiaireInfo): string {
  return `${s?.prenom || ""} ${s?.nom || ""}`.trim() || "Candidat";
}

function memeJour(a: Date, b: Date): boolean {
  return a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
}

/** Contrôle la période d'exercice d'un dossier. */
export function controlerPeriode(d: DpDossierData, f: FormationInfo): DpAnomalie[] {
  const out: DpAnomalie[] = [];
  const nom = nomCandidat(d.stagiaire);
  if (!d.periodeConnue) {
    out.push({
      candidat: nom,
      regle: "Période d'exercice",
      message:
        "La période d'exercice professionnel n'est pas renseignée. Elle doit provenir du parcours réel du candidat (saisie ou profil transmis) et ne peut pas être déduite des dates de formation.",
    });
    return out;
  }
  const p = parsePeriodeFr(d.periodeExercice);
  if (!p) {
    out.push({
      candidat: nom,
      regle: "Période d'exercice",
      message: `Période d'exercice illisible (« ${d.periodeExercice} »). Format attendu : « Du 1er mars 2022 au 30 juin 2024 ».`,
    });
    return out;
  }
  const jours = Math.round((p.fin.getTime() - p.debut.getTime()) / 86400000);
  if (jours < 7) {
    out.push({
      candidat: nom,
      regle: "Période d'exercice",
      message: `La période d'exercice ne couvre que ${jours} jour(s). Une pratique professionnelle de moins de 7 jours ne peut pas étayer un exemple du DP.`,
    });
  }
  const dSession = getStagiaireDateDebut(d.stagiaire, f);
  const fSession = getStagiaireDateFin(d.stagiaire, f);
  if (dSession && fSession) {
    const ds = new Date(dSession);
    const fs = new Date(fSession);
    if (!isNaN(ds.getTime()) && !isNaN(fs.getTime()) && memeJour(ds, p.debut) && memeJour(fs, p.fin)) {
      out.push({
        candidat: nom,
        regle: "Période d'exercice",
        message: "La période d'exercice est identique aux dates de la session de formation. Elle doit décrire l'expérience professionnelle du candidat, pas le parcours.",
      });
    }
  }
  if (!d.entreprise.connue) {
    out.push({
      candidat: nom,
      regle: "Entreprise",
      message: "Aucune entreprise n'est renseignée pour le contexte du DP (champ « Entreprise » du stagiaire ou profil transmis).",
    });
  }
  return out;
}

/** Duplication entre les exemples d'un même dossier. */
export function controlerDuplicationInterne(d: DpDossierData): DpAnomalie[] {
  const out: DpAnomalie[] = [];
  const nom = nomCandidat(d.stagiaire);
  const vus = new Map<string, string>();
  const intitules = new Set<string>();
  for (const ex of d.exemples) {
    const cle = norm(ex.intitule);
    if (intitules.has(cle)) {
      out.push({
        candidat: nom,
        regle: "Intitulés d'exemples",
        message: `L'intitulé « ${ex.intitule} » apparaît sous plusieurs activités-types.`,
      });
    }
    intitules.add(cle);
    for (const b of [...blocs(ex.r1), ...blocs(ex.r2), ...blocs(ex.r3), ...blocs(ex.r5)]) {
      const ori = vus.get(b);
      const ref = `AT${ex.atIndex} / exemple ${ex.numero}`;
      if (ori && ori !== ref) {
        out.push({
          candidat: nom,
          regle: "Duplication interne",
          message: `Bloc identique entre ${ori} et ${ref} : « ${b.slice(0, 90)}… »`,
        });
      } else vus.set(b, ref);
    }
  }
  return out;
}

/** Duplication entre les dossiers d'une même session. */
export function controlerDuplicationSession(dossiers: DpDossierData[]): DpAnomalie[] {
  const out: DpAnomalie[] = [];
  const parCandidat = dossiers.map((d) => ({
    nom: nomCandidat(d.stagiaire),
    blocs: new Set(d.exemples.flatMap((e) => [...blocs(e.r1), ...blocs(e.r2), ...blocs(e.r3), ...blocs(e.r5)])),
  }));
  for (let i = 0; i < parCandidat.length; i++) {
    for (let j = i + 1; j < parCandidat.length; j++) {
      for (const b of parCandidat[i].blocs) {
        if (parCandidat[j].blocs.has(b)) {
          out.push({
            candidat: `${parCandidat[i].nom} / ${parCandidat[j].nom}`,
            regle: "Duplication entre candidats",
            message: `Bloc identique dans les deux dossiers : « ${b.slice(0, 90)}… »`,
          });
          break;
        }
      }
    }
  }
  return out;
}

/**
 * Contrôles propres au livret ECF (45B) :
 *  - deux livrets d'une même session ne peuvent pas avoir la même répartition
 *    de compétences (livrets superposables) ;
 *  - aucune appréciation ne peut être dupliquée entre deux candidats ;
 *  - un candidat sans profil transmis ne doit jamais ressortir avec un livret
 *    rempli automatiquement.
 */
export function controlerEcfSession(f: FormationInfo, stagiaires: StagiaireInfo[]): DpAnomalie[] {
  const out: DpAnomalie[] = [];
  const ref = resolveReferentiel(f);
  const livrets = stagiaires.map((s) => {
    const cv = findGotrmProfile(s?.nom, s?.prenom);
    return { nom: nomCandidat(s), cv, prof: buildEcfProfilage(ref, cv) };
  });

  for (const l of livrets) {
    const sansProfil = !l.cv || l.cv.source === "Profil à compléter" || !l.cv.pointsForts.length;
    if (sansProfil && l.prof.renseigne) {
      out.push({
        candidat: l.nom,
        regle: "Livret sans profil",
        message: "Le livret a été rempli automatiquement alors qu'aucun profil candidat n'a été transmis.",
      });
    }
    if (sansProfil) {
      out.push({
        candidat: l.nom,
        regle: "Profil candidat manquant",
        message: "Aucun profil (CV) transmis : le livret sort vide, en attente du profil candidat. Renseignez le profil avant l'export.",
      });
    }
  }

  const parSignature = new Map<string, string>();
  const parAppreciation = new Map<string, string>();
  for (const l of livrets) {
    if (!l.prof.renseigne) continue;
    const sig = l.prof.signature;
    const deja = parSignature.get(sig);
    if (deja) {
      out.push({
        candidat: `${deja} / ${l.nom}`,
        regle: "Livrets superposables",
        message: `Répartition de compétences strictement identique (${sig}). Les livrets doivent découler de profils distincts.`,
      });
    } else parSignature.set(sig, l.nom);

    for (const a of l.prof.appreciations) {
      for (const b of blocs(a)) {
        const ori = parAppreciation.get(b);
        if (ori && ori !== l.nom) {
          out.push({
            candidat: `${ori} / ${l.nom}`,
            regle: "Appréciation dupliquée",
            message: `Appréciation identique dans deux livrets : « ${b.slice(0, 90)}… »`,
          });
        } else parAppreciation.set(b, l.nom);
      }
    }
  }
  return out;
}

export interface DpControleResultat {
  anomalies: DpAnomalie[];
  exportAutorise: boolean;
}

/** Contrôle complet d'une session avant export ZIP. */
export function controlerSessionDp(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
): DpControleResultat {
  const dossiers = stagiaires.map((_, i) => buildDpDossier(org, f, stagiaires, i));
  const anomalies = [
    ...dossiers.flatMap((d) => controlerPeriode(d, f)),
    ...dossiers.flatMap((d) => controlerDuplicationInterne(d)),
    ...controlerDuplicationSession(dossiers),
    ...controlerEcfSession(f, stagiaires),
  ];
  return { anomalies, exportAutorise: anomalies.length === 0 };
}
