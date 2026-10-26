import type { FormationInfo, StagiaireInfo } from '@/types/qualiopi';
import { BUILTIN_ORIENTA_PRESETS } from './formationPresets/builtinOrienta';

const norm = (v: string) => v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const EN_BESOINS = [
  'assess my listening, reading, speaking and writing skills and prepare for the VTest format',
  'introduce my role and explain my responsibilities clearly in English',
  'understand instructions and identify key information in professional conversations',
  'read work emails and identify the action, deadline and person concerned',
  'welcome a visitor, clarify their request and provide an appropriate answer',
  'handle a phone call and take an accurate message',
  'ask for clarification and respond to questions during a team discussion',
  'write clear professional emails with an appropriate tone',
  'speak with more confidence and improve the accuracy of my vocabulary',
  'manage my time across the four VTest skills and check my answers carefully',
];
const EN_CONTEXTES = [
  'I would like to practise with short, concrete workplace situations and receive feedback on my errors.',
  'My priority is to apply these skills in realistic exchanges rather than memorise isolated rules.',
  'I need progressive exercises, followed by a chance to reformulate my answers independently.',
  'I would like to practise under timed conditions and identify what I should review between sessions.',
];
const FR_CONTEXTES = [
  'Je souhaite travailler sur un cas concret et comprendre les choix effectués à chaque étape.',
  'Ma priorité est de pouvoir réutiliser la méthode sur un produit numérique, pas seulement suivre une démonstration.',
  'J’ai besoin d’exercices progressifs et de retours précis pour corriger ma démarche de manière autonome.',
  'Je souhaite justifier mes décisions et m’entraîner à présenter les livrables attendus pour la certification.',
];
const PBNC_DIPLOMES_PROPOSES = [
  'BTS Services informatiques aux organisations (Bac+2, niveau 5)',
  'BTS Support à l’action managériale (Bac+2, niveau 5)',
  'BTS Gestion de la PME (Bac+2, niveau 5)',
  'BTS Négociation et digitalisation de la relation client (Bac+2, niveau 5)',
  'DUT Informatique (Bac+2, niveau 5)',
];

/** Resolve a named pathway first; a certification code alone never implies a CECRL level or a PBNC block. */
export function orientaBesoinsParcours(f: Pick<FormationInfo, 'intitule' | 'codeRNCP'>) {
  const exact = BUILTIN_ORIENTA_PRESETS.find(p => p.intitule_normalise === norm(f.intitule));
  if (exact) return { anglais: exact.id.startsWith('vtest-'), preset: exact };
  const code = (f.codeRNCP || '').toUpperCase().replace(/\s/g, '');
  if (code === 'RS6905') return { anglais: true, preset: undefined };
  if (code === 'RNCP41480') return { anglais: false, preset: BUILTIN_ORIENTA_PRESETS.find(p => p.id.startsWith('pbnc-420-')) };
  return null;
}

/** Drafted educational intentions only: never infer qualifications, funding, disability or current employment. */
export function getOrientaEvalBesoins(s: StagiaireInfo, f: FormationInfo, idx: number) {
  const parcours = orientaBesoinsParcours(f);
  if (!parcours) return null;
  const k = ((idx % 40) + 40) % 40;
  const besoins = parcours.preset?.data.plan?.besoins.besoinsList ?? [];
  const besoin = (besoins[k % (besoins.length || 1)] || 'Développer les compétences du parcours').replace(/[.。]$/, '');
  const niveau = parcours.anglais ? parcours.preset?.intitule.match(/Parcours (A2|B1|B2|C1)/)?.[1] : undefined;
  const contexte = (parcours.anglais ? EN_CONTEXTES : FR_CONTEXTES)[Math.floor(k / 10)];
  const objectif = parcours.anglais
    ? `I want to ${EN_BESOINS[k % 10]}.${niveau ? ` I would like to work towards the ${niveau} objectives of this pathway; my starting level still needs to be assessed.` : ''} ${contexte}`
    : `Je souhaite apprendre à ${besoin.charAt(0).toLowerCase() + besoin.slice(1)}. ${contexte}`;
  return {
    civilite: s.civilite === 'Mme' ? 'Madame' : s.civilite === 'M.' ? 'Monsieur' : s.civilite || '',
    raisonSociale: s.entreprise || '',
    diplome: s.diplome?.trim() || (parcours.anglais
      ? 'À préciser par l’apprenant.'
      : PBNC_DIPLOMES_PROPOSES[k % PBNC_DIPLOMES_PROPOSES.length]),
    objectif,
    projetPro: parcours.anglais
      ? `I would like to use these skills in professional English situations, especially to ${EN_BESOINS[(k + 3) % 10]}. ${contexte}`
      : `Ce parcours doit m’aider à passer d’un besoin utilisateur à un livrable no-code vérifiable. Mon axe prioritaire est : ${besoin.charAt(0).toLowerCase() + besoin.slice(1)}. ${contexte}`,
    budget: '', // The shared generator applies the existing funding rule.
    handicap: 'À préciser avec l’apprenant et le référent handicap si des adaptations sont nécessaires.',
    disponibilites: 'Les disponibilités et les éventuelles contraintes horaires sont à confirmer avec l’apprenant à partir du planning de la session.',
    attentes: parcours.anglais
      ? `L’objectif proposé pour ${s.prenom} est de renforcer les échanges professionnels en anglais dans les quatre compétences du VTest, avec un travail ciblé sur l’axe ${k % 10 + 1} du parcours. ${FR_CONTEXTES[Math.floor(k / 10)]}`
      : `L’objectif proposé pour ${s.prenom} est de développer la compétence suivante : ${besoin.charAt(0).toLowerCase() + besoin.slice(1)}. ${contexte}`,
    missions: parcours.anglais
      ? 'Applications envisagées : échanges oraux, appels, lecture de documents et rédaction de messages professionnels en anglais. Les missions effectivement confiées restent à confirmer avec l’entreprise.'
      : `Application envisagée : ${besoin.charAt(0).toLowerCase() + besoin.slice(1)}. Les missions effectivement confiées restent à confirmer avec l’entreprise.`,
    contribution: parcours.anglais
      ? 'La montée en compétences vise des échanges plus clairs et plus fiables en anglais ; les objectifs propres à l’entreprise sont à valider avec son représentant.'
      : 'La montée en compétences vise des produits no-code mieux cadrés, testés et documentés ; les objectifs propres à l’entreprise sont à valider avec son représentant.',
  };
}