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

export interface DpAnomalie {
  candidat: string;
  regle: string;
  message: string;
}

const SEUIL_DUPLICATION = 40;

function norm(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
}

/** Découpe un texte en fenêtres normalisées de plus de 40 caractères. */
function blocs(texte: string): string[] {
  return norm(texte)
    .split(/(?<=[.!?])\s+/)
    .map((x) => x.trim())
    .filter((x) => x.length > SEUIL_DUPLICATION);
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
  ];
  return { anomalies, exportAutorise: anomalies.length === 0 };
}
