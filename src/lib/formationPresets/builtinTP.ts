import type { FormationPreset } from './registry';
import { BUILTIN_LILATE_PRESETS } from './builtinLilate';
import gotrm from '@/data/tpPresets/gotrm.json';
import etrm from '@/data/tpPresets/etrm.json';
import gcf from '@/data/tpPresets/gcf.json';
import gp from '@/data/tpPresets/gp.json';
import ca from '@/data/tpPresets/ca.json';
import sc from '@/data/tpPresets/sc.json';
import chSec from '@/data/tpPresets/chapters/sec.json';
import chOcq from '@/data/tpPresets/chapters/ocq.json';
import chOcp from '@/data/tpPresets/chapters/ocp.json';
import chFin from '@/data/tpPresets/chapters/fin.json';

/** Contenus intégrés des titres professionnels transport / comptabilité / paie (questions, corrigés, besoins). */
type Raw = Record<string, any>;
type Chapter = { title: string; description: string; imageQuery: string; sections: { title: string; contentHtml: string }[] };
// Support de cours par CCP : les blocs communs aux deux titres (opérations courantes, périodiques) sont partagés.
const DEFS: [string, string, string, number, Raw, Chapter[]?][] = [
  ['tp-gotrm', 'TP Gestionnaire des opérations de transport routier de marchandises', 'RNCP40990', 744, gotrm],
  ['tp-etrm', 'TP Exploitant en transport routier de marchandises', 'RNCP40992', 744, etrm],
  ['tp-gcf', 'TP Gestionnaire comptable et fiscal', 'RNCP37949', 712, gcf],
  ['tp-gp', 'TP Gestionnaire de paie', 'RNCP37948', 712, gp],
  ['tp-ca', 'TP Comptable assistant', 'RNCP37121', 744, ca, [...chOcq, ...chOcp, ...chFin] as Chapter[]],
  ['tp-sc', 'TP Secrétaire comptable', 'RNCP37123', 712, sc, [...chSec, ...chOcq, ...chOcp] as Chapter[]],
];
const norm = (v: string) => v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function build([id, intitule, code, h, d, chapters = []]: (typeof DEFS)[number], title: string): FormationPreset {
  return {
    id: `${id}-${norm(title)}`, intitule, intitule_normalise: norm(title), code_rncp: code, duree_heures: h,
    type_action: 'actions-formation', statut: 'valide', created_by: 'builtin', updated_at: '',
    data: {
      plan: { formation: {}, competences: d.competences, besoins: { besoinsList: d.besoinsList, syntheseHtml: d.syntheseHtml, adaptationsHtml: d.adaptationsHtml }, chapters: chapters.map(c => ({ title: c.title, description: c.description, sections: c.sections.map(x => x.title) })), reference: null },
      evaluations: {
        exercices: d.exercices, qcmCompetences: d.qcmCompetences, qcmDebut: d.qcmDebut, qcmFin: d.qcmFin,
        questionsOuvertesDebut: d.questionsOuvertesDebut, questionsOuvertesFin: d.questionsOuvertesFin,
        exerciceIntermediaire: d.exerciceIntermediaire, evaluationFinale: d.evaluationFinale,
      },
      ...Object.fromEntries(chapters.map((c, i) => [`chapter_${i}`, c])),
    },
    progression: { completed: [], leases: {}, paused: false },
  };
}
/** Accepté avec ou sans préfixe « TP » / « Titre professionnel ». */
export const BUILTIN_TP_PRESETS: FormationPreset[] = DEFS.flatMap(def => {
  const bare = def[1].replace(/^TP\s+/, '');
  return [def[1], bare, `Titre professionnel ${bare}`].map(t => build(def, t));
});

const CONTEXTES = [
  "suite à une reconversion professionnelle", "pour consolider une première expérience en poste",
  "à la demande de son employeur", "afin de valider officiellement ses acquis",
  "pour évoluer vers des responsabilités supérieures", "après une période d'inactivité",
  "pour sécuriser sa pratique au quotidien", "en vue d'un projet de mobilité interne",
];
/** 40 besoins individuels distincts (10 besoins × contextes), déterministes par stagiaire. */
export function getTPBesoin(intitule: string, code: string | undefined, nom: string, prenom: string, i: number): string | null {
  const p = [...BUILTIN_TP_PRESETS, ...BUILTIN_LILATE_PRESETS].find(x => (code && x.code_rncp === code.toUpperCase().replace(/\s/g, '')) || x.intitule_normalise === norm(intitule));
  const list = p?.data.plan?.besoins.besoinsList; if (!list?.length) return null;
  void nom; void prenom;
  const k = ((i % 40) + 40) % 40;
  const b = list[k % list.length].replace(/\.$/, '');
  return `${b}, ${CONTEXTES[(Math.floor(k / list.length) * 2 + (k % 2)) % CONTEXTES.length]}.`;
}
