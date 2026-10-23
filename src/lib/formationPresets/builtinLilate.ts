import type { FormationPreset } from './registry';
import lilateEn from '@/data/tpPresets/lilate-en.json';
import lilateFle from '@/data/tpPresets/lilate-fle.json';

/**
 * Parcours LILATE de CRM LMS (anglais RS7314, FLE RS6916, certificateur LINGUEO) :
 * QCM, exercices, corrigés et support de cours repris des leçons du LMS
 * (scripts/build-lilate-presets.mjs). L'organisme prépare au test, LINGUEO le délivre.
 * RS6118 (même test anglais) est inactive depuis le 24/10/2025, remplacée par RS7314 :
 * même contenu, réservée aux dossiers de sessions antérieures à cette date.
 */
type Raw = typeof lilateEn;
/** Intitulés officiels France Compétences (fiches RS7314, RS6118, RS6916). */
export const LILATE_RS6118_TITRE = 'Test d’aptitude à travailler en anglais – LILATE (RS6118)';
const RS6118: Raw = { ...lilateEn, titre: LILATE_RS6118_TITRE, code: 'RS6118' };
const DEFS: [string, Raw, string[]][] = [
  ['lilate-en', lilateEn, ['RS7314 - Test d’aptitude à travailler en anglais - LILATE', 'Anglais professionnel — LILATE', 'LILATE Anglais', 'Anglais LILATE', 'Anglais professionnel LILATE', 'Préparation au test LILATE Anglais', 'Anglais professionnel — préparation au test LILATE', 'Test d’aptitude à travailler en anglais – LILATE']],
  ['lilate-en-rs6118', RS6118, ['RS6118 - Test d’aptitude à travailler en anglais - LILATE', 'RS6118 - Test d’aptitude à travailler en anglais', 'Test d’aptitude à travailler en anglais (RS6118)', 'LILATE Anglais RS6118']],
  ['lilate-fle', lilateFle as Raw, ['RS6916 - Test d’aptitude à travailler en français langue étrangère - LILATE', 'Français langue étrangère — LILATE', 'LILATE FLE', 'FLE LILATE', 'Français LILATE', 'Français professionnel LILATE', 'Préparation au test LILATE FLE', 'Français professionnel (FLE) — préparation au test LILATE', 'Test d’aptitude à travailler en français langue étrangère – LILATE']],
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
