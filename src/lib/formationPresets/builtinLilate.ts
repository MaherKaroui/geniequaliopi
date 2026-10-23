import type { FormationPreset } from './registry';
import lilateEn from '@/data/tpPresets/lilate-en.json';
import lilateFle from '@/data/tpPresets/lilate-fle.json';

/**
 * Parcours LILATE de CRM LMS (anglais RS7314, FLE RS6916, certificateur LINGUEO) :
 * QCM, exercices, corrigés et support de cours repris des leçons du LMS
 * (scripts/build-lilate-presets.mjs). L'organisme prépare au test, LINGUEO le délivre.
 */
type Raw = typeof lilateEn;
const DEFS: [string, Raw, string[]][] = [
  ['lilate-en', lilateEn, ['Anglais professionnel — LILATE', 'LILATE Anglais', 'Anglais LILATE', 'Anglais professionnel LILATE', 'Préparation au test LILATE Anglais', 'Anglais professionnel — préparation au test LILATE', 'Test d’aptitude à travailler en anglais – LILATE']],
  ['lilate-fle', lilateFle as Raw, ['Français langue étrangère — LILATE', 'LILATE FLE', 'FLE LILATE', 'Français LILATE', 'Français professionnel LILATE', 'Préparation au test LILATE FLE', 'Français professionnel (FLE) — préparation au test LILATE', 'Test d’aptitude à travailler en français langue étrangère – LILATE']],
];
const norm = (v: string) => v.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function build(id: string, d: Raw, title: string): FormationPreset {
  const chapters = Object.fromEntries(d.chapters.map((c, i) => [`chapter_${i}`, c]));
  return {
    id: `${id}-${norm(title)}`, intitule: d.titre, intitule_normalise: norm(title), code_rncp: d.code, duree_heures: Math.round(d.minutes / 60),
    type_action: 'actions-formation', statut: 'valide', created_by: 'builtin', updated_at: '',
    data: {
      plan: {
        formation: {}, competences: d.competences,
        besoins: { besoinsList: d.besoinsList, syntheseHtml: d.syntheseHtml, adaptationsHtml: d.adaptationsHtml },
        chapters: d.chapters.map((c) => ({ title: c.title, description: c.description, sections: c.sections.map((s) => s.title) })),
        reference: null,
      },
      evaluations: {
        exercices: d.exercices, qcmCompetences: d.qcmCompetences, qcmDebut: d.qcmDebut, qcmFin: d.qcmFin,
        questionsOuvertesDebut: d.questionsOuvertesDebut, questionsOuvertesFin: d.questionsOuvertesFin,
        exerciceIntermediaire: d.exerciceIntermediaire, evaluationFinale: d.evaluationFinale,
      },
      ...chapters,
    },
    progression: { completed: ['plan', 'evaluations', ...Object.keys(chapters), 'sources'], leases: {}, paused: false },
  };
}

/** Accepté sous l'intitulé complet du parcours et sous les intitulés courts usuels. */
export const BUILTIN_LILATE_PRESETS: FormationPreset[] = DEFS.flatMap(([id, d, aliases]) => [d.titre, ...aliases].map((t) => build(id, d, t)));
