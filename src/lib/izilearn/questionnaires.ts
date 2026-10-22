import { buildDocument, tableHTML } from '@/lib/docBuilder';
import { getEvalContent, getQuestionsOuvertes, generateStagiaireOpenAnswers } from '@/lib/evalContent';
import { formationConnue } from './contenu';
import type { Ctx } from './trames';
import type { QCMQuestion } from '@/lib/evalContent';

const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const formatDate = (value: string) => { const date = new Date(`${value}T12:00:00`); return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }); };
const seedFor = (c: Ctx) => Array.from(`${c.a.inscriptionId}|${c.s.prenom}|${c.s.nom}|${c.f.intitule}`).reduce((n, ch) => (Math.imul(n, 31) + ch.charCodeAt(0)) >>> 0, 0);

/** Only topics supplied for this formation; never a fuzzy catalogue match. */
export function questionnaireTopics(c: Ctx): string[] {
  const raw = [c.f.objectifs, ...c.p.formation.modules.flatMap(m => [m.titre, m.objectifs]),
    ...(c.p.formation.contenu?.chapitres || []).flatMap(ch => [ch.titre, ...ch.sections.map(s => s.titre)]),
    ...c.p.formation.blocs.flatMap(b => b.competences?.length ? b.competences : [b.intitule])];
  const topics = raw.flatMap(v => String(v || '').split(/\n|;/)).map(v => v.replace(/<[^>]*>/g, '').replace(/^[-•*\d.)\s]+/, '').trim()).filter(Boolean);
  return [...new Set(topics)].slice(0, 16).length ? [...new Set(topics)].slice(0, 16) : [c.f.intitule];
}

export function proposedNeedAnswer(c: Ctx, question: string, index: number, entreprise = false): string | null {
  const key = question.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const seed = seedFor(c);
  const topics = questionnaireTopics(c);
  const topic = topics[(seed + index) % topics.length];
  const pick = (values: string[]) => values[(seed + index) % values.length];
  // Administrative facts are never inferred from narrative proposals.
  if (/diplome|titre.*obtenu|qualification|naissance/.test(key)) return null;
  if (/financ|prise en charge/.test(key)) return c.s.financeur || null;
  if (/handicap|adaptations specifiques/.test(key)) return c.a.handicap ? c.a.handicap.declare ? c.a.handicap.details || null : 'Non' : null;
  if (/disponibil|horaire|amenagement/.test(key)) return null;
  if (/raison sociale|nom commercial/.test(key)) return c.s.entreprise || null;
  if (entreprise) {
    if (/missions actuelles|missions.*confie/.test(key)) return c.s.poste || null;
    return pick([
      `Nous souhaitons que cette formation aide notre collaborateur à gagner en autonomie sur « ${topic} ». L'important pour nous est de pouvoir reprendre les méthodes dans des situations concrètes.`,
      `Notre priorité est de renforcer les compétences liées à « ${topic} », avec des repères simples pour vérifier la qualité du travail et progresser au quotidien.`,
      `Nous attendons surtout une mise en pratique de « ${topic} ». Des exemples proches de notre activité permettront de faire le lien entre la formation et les besoins de l'entreprise.`,
      `Nous aimerions disposer d'une démarche plus claire pour « ${topic} » et de points de contrôle que le salarié pourra réutiliser après la formation.`,
    ]);
  }
  return pick([
    `J'aimerais être plus à l'aise avec « ${topic} ». Ce qui m'intéresse, c'est de comprendre la démarche, puis de pouvoir essayer sur un exemple concret sans rester bloqué à chaque étape.`,
    `Pour moi, le plus utile serait de travailler « ${topic} » pas à pas. Je voudrais repartir avec des repères simples et savoir quoi vérifier quand j'applique la méthode.`,
    `Je souhaite surtout gagner en autonomie sur « ${topic} ». J'apprécierais des exercices concrets, avec le temps de comprendre mes erreurs et de poser mes questions.`,
    `Mon attente est de mieux comprendre « ${topic} » et de faire le lien avec la pratique. Des exemples expliqués, puis un essai de mon côté, m'aideraient à avancer.`,
    `J'aimerais que « ${topic} » devienne plus clair pour moi. Mon objectif est de pouvoir expliquer mes choix et refaire la démarche, plutôt que retenir seulement une suite d'étapes.`,
    `Je voudrais me donner une méthode pour « ${topic} ». Ce serait utile de comparer plusieurs exemples et de comprendre dans quels cas adapter la façon de faire.`,
  ]);
}

export function positioningProposal(c: Ctx) {
  const seed = seedFor(c);
  const topics = questionnaireTopics(c);
  const dedicated = formationConnue(c.f);
  const explicit = (c.p.formation.contenu?.positionnement || []).filter(q => q.question && q.options?.length > 1);
  const generated: QCMQuestion[] = Array.from({ length: 10 }, (_, i) => {
    const topic = topics[i % topics.length];
    const patterns = [
      { question: `Pour aborder « ${topic} », quelle démarche est la plus pertinente ?`, options: ['Clarifier le résultat attendu avant de choisir les étapes', 'Reproduire un exemple sans vérifier le contexte', 'Commencer sans définir le besoin', 'Écarter les contraintes de la situation'] },
      { question: `Comment vérifier votre travail sur « ${topic} » ?`, options: ['Comparer le résultat aux critères attendus et repérer les écarts', 'Se limiter à la présentation du résultat', 'Supposer que toute première tentative est correcte', 'Éviter de relire les étapes suivies'] },
      { question: `En cas de difficulté sur « ${topic} », que faites-vous en priorité ?`, options: ['Identifier le point bloquant et reprendre la méthode sur un cas simple', 'Changer toutes les étapes au hasard', 'Ignorer la difficulté et valider le résultat', 'Renoncer à vérifier les informations disponibles'] },
      { question: `Pour réutiliser « ${topic} » dans un nouveau contexte, que faut-il faire ?`, options: ['Adapter la méthode aux besoins et contraintes du nouveau cas', 'Copier le résultat précédent sans ajustement', 'Supprimer systématiquement les contrôles', 'Appliquer la même solution quelle que soit la demande'] },
    ];
    const pattern = patterns[Math.floor(i / topics.length) % patterns.length];
    const shift = i % 4;
    return { question: pattern.question, options: pattern.options.map((_, j) => pattern.options[(j + shift) % 4]), correctIndex: (4 - shift) % 4 };
  });
  const catalogue = dedicated ? getEvalContent(c.f.intitule).qcmPositionnement : [];
  const questions = explicit.length ? explicit : catalogue.length ? catalogue : generated;
  const correctable = questions.every(q => q.correctIndex != null && q.correctIndex >= 0 && q.correctIndex < q.options.length);
  const target = 5 + seed % 3;
  const correctCount = Math.round(questions.length * target / 10);
  const wrongOrder = [...questions.keys()].sort((a, b) => ((a + seed % questions.length) % questions.length) - ((b + seed % questions.length) % questions.length));
  const wrong = new Set(wrongOrder.slice(0, questions.length - correctCount));
  const answers = questions.map((q, i) => {
    if (!correctable || q.correctIndex == null) return null;
    if (!wrong.has(i)) return q.correctIndex;
    const choices = q.options.map((_, j) => j).filter(j => j !== q.correctIndex);
    return choices[(seed + i) % choices.length];
  });
  const prompts = [
    (topic: string) => `Avec vos mots, comment aborderiez-vous « ${topic} » ?`,
    (topic: string) => `Quels points vérifieriez-vous dans une première tentative sur « ${topic} » ?`,
    (topic: string) => `Qu'est-ce qui vous ferait hésiter sur « ${topic} », et quelle aide vous serait utile ?`,
    (topic: string) => `Comment organiseriez-vous les étapes pour travailler « ${topic} » ?`,
    (topic: string) => `Qu'aimeriez-vous comprendre en priorité à propos de « ${topic} » ?`,
    (topic: string) => `Comment expliqueriez-vous votre démarche sur « ${topic} » à une autre personne ?`,
    (topic: string) => `Quelles informations chercheriez-vous avant de travailler « ${topic} » ?`,
    (topic: string) => `Comment réagiriez-vous si votre résultat sur « ${topic} » ne correspondait pas à la consigne ?`,
    (topic: string) => `Comment adapteriez-vous « ${topic} » à un nouveau cas ?`,
    (topic: string) => `Quels repères vous aideraient à devenir plus autonome sur « ${topic} » ?`,
  ];
  const openQuestions = dedicated ? getQuestionsOuvertes(c.f.intitule, c.f.objectifs, c.f.programme).debut.slice(0, 10)
    : Array.from({ length: 10 }, (_, i) => ({ question: prompts[i](topics[i % topics.length]), reponseAttendue: '' }));
  const shared = dedicated ? generateStagiaireOpenAnswers(openQuestions, seed % 50, true, c.s, c.f) : [];
  const openings = ["Je commencerais par clarifier ce qu'on attend", "Pour ma part, je reprendrais la consigne étape par étape", "J'aurais besoin d'un exemple simple pour démarrer", "Je chercherais d'abord à repérer les informations utiles", "Je préfère poser les étapes avant de me lancer", "Je partirais du résultat attendu pour organiser mon travail"];
  const endings = ["Ensuite, je vérifierais le résultat avec les critères de la consigne. J'aimerais travailler ce point pendant la formation.", "Je demanderais un retour sur mon premier essai pour savoir ce qui doit être amélioré.", "Je comparerais ma démarche à un exemple expliqué. Ce serait utile pour comprendre où je dois faire attention.", "Je prendrais le temps de revoir les points qui me font hésiter, avant de passer à un cas plus complexe."];
  const openAnswers = openQuestions.map((q, i) => shared[i]?.reponse || `${openings[(seed + i) % openings.length]} pour « ${topics[i % topics.length]} ». ${endings[(Math.floor(seed / 7) + i) % endings.length]}`);
  return { questions, answers, score: correctable ? answers.filter((a, i) => a === questions[i].correctIndex).length : null, openQuestions, openAnswers, topics };
}

export function automaticPositioningHtml(c: Ctx): string {
  const model = positioningProposal(c);
  const h = `<p><strong>Apprenant :</strong> ${esc(`${c.s.prenom} ${c.s.nom}`)}</p><p><strong>Date :</strong> ${esc(formatDate(c.p.session.dateDebut))}</p>`
    + '<h2>Questionnaire à choix multiples</h2>' + model.questions.map((q, i) => `<p><strong>${i + 1}. ${esc(q.question)}</strong></p><p>${q.options.map((op, j) => `${model.answers[i] === j ? '☒' : '☐'} ${esc(op)}`).join('<br>')}</p>`).join('')
    + `<p><strong>Score :</strong> ${model.score == null ? 'À compléter' : `${model.score} / ${model.questions.length}`}</p>`
    + '<h2>Questions ouvertes</h2>' + model.openQuestions.map((q, i) => `<p><strong>${i + 1}. ${esc(q.question)}</strong></p><p><strong>Réponse du stagiaire :</strong> ${esc(model.openAnswers[i])}</p>`).join('')
    + '<h2>Positionnement sur les objectifs</h2>' + tableHTML(['Objectif', 'Notions à consolider', 'Pratique à développer'], model.topics.map((topic, i) => [esc(topic), i % 2 ? '' : 'X', i % 2 ? 'X' : '']))
    + `<h2>Adaptation du parcours</h2><p>Prévoir une mise en pratique progressive de « ${esc(model.topics[0])} », puis un retour individualisé sur les points à consolider.</p>`
    + `<table><tr>${["L'apprenant", 'Le formateur'].map(label => `<td><div class="sig-box"><p class="sig-label">${label}</p><p>Date : ${esc(formatDate(c.p.session.dateDebut))}</p></div></td>`).join('')}</tr></table>`;
  return buildDocument({ org: c.o, title: 'TEST DE POSITIONNEMENT — DÉBUT DE FORMATION', subtitle: c.f.intitule, formation: c.f, showFormationInfo: false, stagiaires: [c.s], extraHtml: h });
}