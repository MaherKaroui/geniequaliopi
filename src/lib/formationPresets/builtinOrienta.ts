import type { FormationPreset } from './registry';
import vA2 from '@/data/tpPresets/orienta/vtest-a2.json';
import vB1 from '@/data/tpPresets/orienta/vtest-b1.json';
import vB2 from '@/data/tpPresets/orienta/vtest-b2.json';
import vC1 from '@/data/tpPresets/orienta/vtest-c1.json';
import chA2 from '@/data/tpPresets/orienta/vtest-a2.chapters.json';
import chB1 from '@/data/tpPresets/orienta/vtest-b1.chapters.json';
import chB2 from '@/data/tpPresets/orienta/vtest-b2.chapters.json';
import chC1 from '@/data/tpPresets/orienta/vtest-c1.chapters.json';
import p420 from '@/data/tpPresets/orienta/pbnc-420.json';
import pB1 from '@/data/tpPresets/orienta/pbnc-bc01.json';
import pB2 from '@/data/tpPresets/orienta/pbnc-bc02.json';
import pB3 from '@/data/tpPresets/orienta/pbnc-bc03.json';
import pB4 from '@/data/tpPresets/orienta/pbnc-bc04.json';
import ch420 from '@/data/tpPresets/orienta/pbnc-420.chapters.json';

/**
 * Parcours d'Orienta Campus (scripts/build-orienta-presets.mjs) :
 * VTest Business English – 4 Skills (RS6905, EXASSESS) en parcours A2, B1, B2 et C1,
 * Product Builder No-Code (RNCP41480, CONSULTING SCHOOL) en titre complet et par bloc.
 * Pas de code RNCP / RS sur le preset : il n'est trouvé que par son intitulé, pour ne pas
 * remplacer le contenu des dossiers RS6905 existants (exemple « Anglais Professionnel – Certification VTest »).
 */
type Raw = Record<string, any>;
type Chapter = { title: string; description: string; imageQuery: string; sections: { title: string; contentHtml: string }[] };
const norm = (v: string) => v.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** Bloc PBNC : chapitres du titre complet, une capsule par chapitre puis la mise en pratique du module. */
function chapitresBloc(bloc: number): Chapter[] {
  const mods = (ch420 as Chapter[]).filter((c) => c.title.startsWith(`Bloc ${bloc} `));
  return mods.flatMap((m) => {
    const titre = m.title.replace(/^Bloc \d · /, '');
    return [
      ...m.sections.slice(0, -3).map((s) => ({ title: `${titre} — ${s.title}`, description: m.description, imageQuery: m.imageQuery, sections: [s] })),
      { title: `${titre} — Mise en pratique`, description: 'Classes virtuelles, quiz de validation et cas pratique corrigé du module.', imageQuery: 'no-code project workshop', sections: m.sections.slice(-3) },
    ];
  });
}

const DEFS: [Raw, Chapter[]][] = [
  [vA2, chA2 as Chapter[]], [vB1, chB1 as Chapter[]], [vB2, chB2 as Chapter[]], [vC1, chC1 as Chapter[]],
  [p420, ch420 as Chapter[]], [pB1, chapitresBloc(1)], [pB2, chapitresBloc(2)], [pB3, chapitresBloc(3)], [pB4, chapitresBloc(4)],
];

function build(d: Raw, chapters: Chapter[], title: string): FormationPreset {
  const ch = Object.fromEntries(chapters.map((c, i) => [`chapter_${i}`, c]));
  return {
    id: `${d.id}-${norm(title)}`, intitule: d.titre, intitule_normalise: norm(title), code_rncp: null, duree_heures: d.heures,
    type_action: 'actions-formation', statut: 'valide', created_by: 'builtin', updated_at: '',
    data: {
      plan: {
        formation: {}, competences: d.competences,
        besoins: { besoinsList: d.besoinsList, syntheseHtml: d.syntheseHtml, adaptationsHtml: d.adaptationsHtml },
        chapters: chapters.map((c) => ({ title: c.title, description: c.description, sections: c.sections.map((s) => s.title) })),
        reference: null,
      },
      evaluations: {
        exercices: d.exercices, qcmCompetences: d.qcmCompetences, qcmDebut: d.qcmDebut, qcmFin: d.qcmFin,
        questionsOuvertesDebut: d.questionsOuvertesDebut, questionsOuvertesFin: d.questionsOuvertesFin,
        exerciceIntermediaire: d.exerciceIntermediaire, evaluationFinale: d.evaluationFinale,
      },
      sources: d.sources,
      ...ch,
    },
    progression: { completed: ['plan', 'evaluations', ...Object.keys(ch), 'sources'], leases: {}, paused: false },
  };
}

/** Données brutes (programme, modules, heures) pour le catalogue des formations. */
export const ORIENTA_RAW = { vtest: [vA2, vB1, vB2, vC1] as Raw[], pbnc: [p420, pB1, pB2, pB3, pB4] as Raw[] };

/** Accepté sous l'intitulé du catalogue et sous les intitulés d'Orienta Campus. */
export const BUILTIN_ORIENTA_PRESETS: FormationPreset[] = DEFS.flatMap(([d, chapters]) => [...new Set([d.titre, ...d.aliases])].map((t) => build(d, chapters, t)));
