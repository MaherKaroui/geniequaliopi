import { describe, expect, it } from 'vitest';
import { contexte, planPieces } from '@/lib/izilearn/pieces';
import { positioningProposal, proposedNeedAnswer, questionnaireTopics } from '@/lib/izilearn/questionnaires';
import type { IzPayload } from '@/lib/izilearn/types';

const payload = (): IzPayload => ({
  version: 1, source: { app: 'izilearn', url: 'http://localhost:8080', orgId: 'org-test', sessionId: 'session-test' },
  organisme: { id: 'org-test', nom: 'Organisme de contrôle' },
  formation: { id: 'course-test', intitule: 'Restaurer les archives photographiques', typeAction: 'actions-formation', objectifs: 'Identifier les altérations\nNumériser les négatifs\nClasser les archives', modules: [{ titre: 'Conservation préventive' }], blocs: [] },
  session: { id: 'session-test', dateDebut: '2026-10-01', dateFin: '2026-10-02', modalite: 'presentiel' }, creneaux: [],
  apprenants: [
    { inscriptionId: 'enrol-alice', contactId: 'alice', prenom: 'Alice', nom: 'MARTIN', statut: 'inscrit', signatures: [], connexions: [] },
    { inscriptionId: 'enrol-benoit', contactId: 'benoit', prenom: 'Benoît', nom: 'DUPONT', statut: 'inscrit', signatures: [], connexions: [] },
  ],
});
function context(p: IzPayload, index = 0) { const cx = contexte(p); return { ...cx, s: cx.stagiaires[index], a: p.apprenants[index] }; }

describe('Propositions de questionnaires IZILearn', () => {
  it('génère dix questions adaptées à une formation absente du catalogue', () => {
    const c = context(payload());
    const model = positioningProposal(c);
    expect(questionnaireTopics(c)).toEqual(['Identifier les altérations', 'Numériser les négatifs', 'Classer les archives', 'Conservation préventive']);
    expect(model.questions).toHaveLength(10);
    expect(model.questions.every(q => model.topics.some(t => q.question.includes(t)))).toBe(true);
    expect(model.openAnswers).toHaveLength(10);
    expect(model.score).toBeGreaterThanOrEqual(5);
    expect(model.score).toBeLessThanOrEqual(7);
  });
  it('varie les propositions selon l’identité et reste stable lors des exports', () => {
    const p = payload(), first = context(p), second = context(p, 1);
    expect(proposedNeedAnswer(first, 'Quel objectif souhaitez-vous atteindre ?', 1)).not.toEqual(proposedNeedAnswer(second, 'Quel objectif souhaitez-vous atteindre ?', 1));
    expect(positioningProposal(first).openAnswers).not.toEqual(positioningProposal(second).openAnswers);
    expect(positioningProposal(first)).toEqual(positioningProposal(context(p)));
  });
  it('n’invente pas de diplôme, handicap, financement ou disponibilité', () => {
    const c = context(payload());
    for (const question of ['Dernier diplôme obtenu ?', 'Handicap ?', 'Quel financement ?', 'Vos disponibilités ?']) expect(proposedNeedAnswer(c, question, 0)).toBeNull();
  });
  it('conserve les questions explicites sans inventer leur corrigé', () => {
    const p = payload();
    p.formation.contenu = { chapitres: [], exercices: [], positionnement: [{ question: 'Comment conserver un négatif ?', options: ['A', 'B'] }] };
    const model = positioningProposal(context(p));
    expect(model.questions).toEqual(p.formation.contenu.positionnement);
    expect(model.answers).toEqual([null]);
    expect(model.score).toBeNull();
  });
  it('ne modifie pas les réponses et résultats réellement enregistrés', () => {
    const p = payload();
    p.apprenants[0].besoins = { titre: 'Besoins', date: '2026-09-20', reponses: [{ question: 'Objectif ?', reponse: 'Conserver le fonds familial' }] };
    p.apprenants[0].positionnement = [{ titre: 'Positionnement', date: '2026-10-01', score: 0, max: 10 }];
    const original = structuredClone(p);
    const pieces = planPieces(contexte(p));
    pieces.find(x => x.id === 'besoins_0')?.rendre();
    pieces.find(x => x.id === 'positionnement_0')?.rendre();
    expect(p).toEqual(original);
    expect(pieces.find(x => x.id === 'besoins_0')?.source).toBe('izilearn');
    expect(pieces.find(x => x.id === 'positionnement_0')?.source).toBe('izilearn');
  });
});