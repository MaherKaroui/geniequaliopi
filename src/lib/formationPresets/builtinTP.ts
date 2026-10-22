import type { FormationPreset } from './registry';
import gotrm from '@/data/tpPresets/gotrm.json';
import etrm from '@/data/tpPresets/etrm.json';
import gcf from '@/data/tpPresets/gcf.json';
import gp from '@/data/tpPresets/gp.json';

/** Contenus intégrés des titres professionnels transport / comptabilité / paie (questions, corrigés, besoins). */
type Raw = Record<string, any>;
const DEFS: [string, string, string, number, Raw][] = [
  ['tp-gotrm', 'TP Gestionnaire des opérations de transport routier de marchandises', 'RNCP40990', 744, gotrm],
  ['tp-etrm', 'TP Exploitant en transport routier de marchandises', 'RNCP40992', 744, etrm],
  ['tp-gcf', 'TP Gestionnaire comptable et fiscal', 'RNCP37949', 712, gcf],
  ['tp-gp', 'TP Gestionnaire de paie', 'RNCP37948', 712, gp],
];
const norm = (v: string) => v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function build([id, intitule, code, h, d]: (typeof DEFS)[number], title: string): FormationPreset {
  return {
    id: `${id}-${norm(title)}`, intitule, intitule_normalise: norm(title), code_rncp: code, duree_heures: h,
    type_action: 'actions-formation', statut: 'valide', created_by: 'builtin', updated_at: '',
    data: {
      plan: { formation: {}, competences: d.competences, besoins: { besoinsList: d.besoinsList, syntheseHtml: d.syntheseHtml, adaptationsHtml: d.adaptationsHtml }, chapters: [], reference: null },
      evaluations: {
        exercices: d.exercices, qcmCompetences: d.qcmCompetences, qcmDebut: d.qcmDebut, qcmFin: d.qcmFin,
        questionsOuvertesDebut: d.questionsOuvertesDebut, questionsOuvertesFin: d.questionsOuvertesFin,
        exerciceIntermediaire: d.exerciceIntermediaire, evaluationFinale: d.evaluationFinale,
      },
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
  const p = BUILTIN_TP_PRESETS.find(x => (code && x.code_rncp === code.toUpperCase().replace(/\s/g, '')) || x.intitule_normalise === norm(intitule));
  const list = p?.data.plan?.besoins.besoinsList; if (!list?.length) return null;
  void nom; void prenom;
  const k = ((i % 40) + 40) % 40;
  const b = list[k % list.length].replace(/\.$/, '');
  return `${b}, ${CONTEXTES[(Math.floor(k / list.length) * 2 + (k % 2)) % CONTEXTES.length]}.`;
}
