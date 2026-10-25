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
import chGotrmA from '@/data/tpPresets/chapters/gotrm-a.json';
import chGotrmB from '@/data/tpPresets/chapters/gotrm-b.json';
import chGotrmC from '@/data/tpPresets/chapters/gotrm-c.json';
import chEtrmA from '@/data/tpPresets/chapters/etrm-a.json';
import chEtrmB from '@/data/tpPresets/chapters/etrm-b.json';
import chEtrmC from '@/data/tpPresets/chapters/etrm-c.json';
import chGcfA from '@/data/tpPresets/chapters/gcf-a.json';
import chGcfB from '@/data/tpPresets/chapters/gcf-b.json';
import chGcfC from '@/data/tpPresets/chapters/gcf-c.json';
import chGpA from '@/data/tpPresets/chapters/gp-a.json';
import chGpB from '@/data/tpPresets/chapters/gp-b.json';
import chGpC from '@/data/tpPresets/chapters/gp-c.json';
import fTmsPr from '@/data/tpPresets/fipu-tms-pr.json';
import fTmsCp from '@/data/tpPresets/fipu-tms-cp.json';
import fTmsFormPr from '@/data/tpPresets/fipu-tms-form-pr.json';
import fTmsFormCp from '@/data/tpPresets/fipu-tms-form-cp.json';
import fPrapIbc from '@/data/tpPresets/fipu-prap-ibc.json';
import fPrap2s from '@/data/tpPresets/fipu-prap-2s.json';
import fPrapIbcForm from '@/data/tpPresets/fipu-prap-ibc-formateur.json';
import fPrap2sForm from '@/data/tpPresets/fipu-prap-2s-formateur.json';
import chTmsBase from '@/data/tpPresets/chapters/tms-base.json';
import chTmsPr from '@/data/tpPresets/chapters/tms-pr.json';
import chTmsCp from '@/data/tpPresets/chapters/tms-cp.json';
import chTmsForm from '@/data/tpPresets/chapters/tms-form.json';
import chPrapBase from '@/data/tpPresets/chapters/prap-base.json';
import chPrapIbc from '@/data/tpPresets/chapters/prap-ibc.json';
import chPrap2s from '@/data/tpPresets/chapters/prap-2s.json';
import chPrapForm from '@/data/tpPresets/chapters/prap-form.json';

/** Contenus intégrés des titres professionnels transport / comptabilité / paie (questions, corrigés, besoins). */
type Raw = Record<string, any>;
type Chapter = { title: string; description: string; imageQuery: string; sections: { title: string; contentHtml: string }[] };
// Support de cours par CCP (≥ 15 chapitres par titre) : les blocs communs à CA et SC (opérations courantes, périodiques) sont partagés.
const DEFS: [string, string, string, number, Raw, Chapter[]?][] = [
  ['tp-gotrm', 'TP Gestionnaire des opérations de transport routier de marchandises', 'RNCP40990', 744, gotrm, [...chGotrmA, ...chGotrmB, ...chGotrmC] as Chapter[]],
  ['tp-etrm', 'TP Exploitant en transport routier de marchandises', 'RNCP40992', 744, etrm, [...chEtrmA, ...chEtrmB, ...chEtrmC] as Chapter[]],
  ['tp-gcf', 'TP Gestionnaire comptable et fiscal', 'RNCP37949', 712, gcf, [...chGcfA, ...chGcfB, ...chGcfC] as Chapter[]],
  ['tp-gp', 'TP Gestionnaire de paie', 'RNCP37948', 712, gp, [...chGpA, ...chGpB, ...chGpC] as Chapter[]],
  ['tp-ca', 'TP Comptable assistant', 'RNCP37121', 744, ca, [...chOcq, ...chOcp, ...chFin] as Chapter[]],
  ['tp-sc', 'TP Secrétaire comptable', 'RNCP37123', 712, sc, [...chSec, ...chOcq, ...chOcp] as Chapter[]],
  // Formations de prévention INRS (dossiers FIPU d'IZILearn) : sans code RNCP / RS, blocs de chapitres partagés.
  ['fipu-tms-pr', 'Devenir personne ressource du projet de prévention des TMS de l’entreprise', '', 42, fTmsPr, [...chTmsBase, ...chTmsPr] as Chapter[]],
  ['fipu-tms-cp', 'Devenir chargé(e) de prévention des TMS de l’établissement', '', 28, fTmsCp, [...chTmsBase, ...chTmsCp] as Chapter[]],
  ['fipu-tms-form-pr', 'Formation de formateurs « Devenir personne ressource du projet de prévention des TMS »', '', 88, fTmsFormPr, [...chTmsBase, ...chTmsPr, ...chTmsForm] as Chapter[]],
  ['fipu-tms-form-cp', 'Formation de formateurs « Devenir chargé(e) de prévention des TMS »', '', 88, fTmsFormCp, [...chTmsBase, ...chTmsCp, ...chTmsForm] as Chapter[]],
  ['fipu-prap-ibc', 'PRAP IBC — industrie, BTP, commerce et activités de bureau', '', 14, fPrapIbc, [...chPrapBase, ...chPrapIbc] as Chapter[]],
  ['fipu-prap-2s', 'PRAP 2S — secteur sanitaire et social', '', 28, fPrap2s, [...chPrapBase, ...chPrap2s] as Chapter[]],
  ['fipu-prap-ibc-form', 'Formation de formateurs PRAP IBC', '', 70, fPrapIbcForm, [...chPrapBase, ...chPrapIbc, ...chPrapForm] as Chapter[]],
  ['fipu-prap-2s-form', 'Formation de formateurs PRAP 2S', '', 98, fPrap2sForm, [...chPrapBase, ...chPrap2s, ...chPrapForm] as Chapter[]],
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
  if (!def[0].startsWith('tp-')) {
    // Prévention INRS : intitulé IZILearn, et forme courte « PRAP IBC » / « PRAP 2S » avant le tiret.
    const court = def[1].split(' — ')[0];
    return [...new Set([def[1], court, `Acteur ${court}`])].filter(t => t === def[1] || /^(Acteur )?PRAP/.test(t)).map(t => build(def, t));
  }
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
