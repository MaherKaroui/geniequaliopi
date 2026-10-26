import { afterEach, describe, expect, it } from 'vitest';
import { getOrientaEvalBesoins } from '@/lib/orientaBesoins';
import { VTEST_FORMATIONS, PBNC_FORMATIONS } from '@/lib/orientaFormations';
import { generateDocumentById } from '@/lib/documentGenerator';
import { contexte, planPieces } from '@/lib/izilearn/pieces';
import { definirPlateforme } from '@/lib/izilearn/plateforme';
import type { IzPayload } from '@/lib/izilearn/types';
import type { StagiaireInfo } from '@/types/qualiopi';
import { ORG_TEST } from './dossierAudit.harness';

const people = Array.from({ length: 40 }, (_, i) => ({ nom: `NOM${i}`, prenom: `Prenom${i}`, civilite: 'M.', entreprise: 'ENTREPRISE TEST' } as StagiaireInfo));

describe('Réponses proposées des besoins VTest et Product Builder', () => {
  afterEach(() => definirPlateforme('izilearn'));

  it.each([...VTEST_FORMATIONS, ...PBNC_FORMATIONS])('$intitule : 40 objectifs et projets distincts', f => {
    const answers = people.map((s, i) => getOrientaEvalBesoins(s, f, i));
    expect(new Set(answers.map(a => a?.objectif)).size).toBe(40);
    expect(new Set(answers.map(a => a?.projetPro)).size).toBe(40);
    const first = answers[0];
    expect(first?.handicap).not.toMatch(/Non,|je bénéficie/);
  });

  it.each(PBNC_FORMATIONS)('$intitule : diplôme proposé Bac+2/niveau 5 conforme au prérequis, sans mention de validation', f => {
    const answers = people.map((s, i) => getOrientaEvalBesoins(s, f, i));
    expect(new Set(answers.map(a => a?.diplome)).size).toBe(5);
    for (const answer of answers) {
      expect(answer?.diplome).toContain('(Bac+2, niveau 5)');
      expect(answer?.diplome).not.toMatch(/proposition|confirmer|prérequis|admission/i);
    }
  });

  it('Product Builder : conserve le diplôme déclaré même s’il est inférieur au prérequis', () => {
    const s = { ...people[0], diplome: 'CAP déclaré' };
    expect(getOrientaEvalBesoins(s, PBNC_FORMATIONS[0], 0)?.diplome).toBe('CAP déclaré');
  });

  it('VTest : ne propose pas de diplôme, son prérequis porte sur le niveau de langue', () => {
    expect(getOrientaEvalBesoins(people[0], VTEST_FORMATIONS[0], 0)?.diplome).toBe('À préciser par l’apprenant.');
  });

  it('VTest : intentions en anglais et niveau cible du parcours, sans niveau acquis inventé', () => {
    const a = getOrientaEvalBesoins(people[0], VTEST_FORMATIONS[2], 0);
    expect(a?.objectif).toContain('I want to');
    expect(a?.objectif).toContain('B2 objectives');
    expect(a?.objectif).toContain('starting level still needs to be assessed');
  });

  it('code RS6905 seul : ne présume pas un parcours A2', () => {
    const f = { ...VTEST_FORMATIONS[0], intitule: 'Parcours VTest RS6905' };
    expect(getOrientaEvalBesoins(people[0], f, 0)?.objectif).not.toMatch(/A2|B1|B2|C1/);
  });

  it('bloc PBNC explicite prioritaire sur le code partagé RNCP41480', () => {
    const a = getOrientaEvalBesoins(people[0], PBNC_FORMATIONS[3], 0);
    expect(a?.objectif).toContain('base de données');
    expect(a?.objectif).not.toContain('Comprendre le métier');
  });

  it('Qualiopi : les 40 documents reprennent les réponses spécifiques et le diplôme saisi', () => {
    const f = PBNC_FORMATIONS[0];
    const actual = people.map(s => ({ ...s, diplome: 'Diplôme déclaré' }));
    for (let i = 0; i < actual.length; i++) {
      const answer = getOrientaEvalBesoins(actual[i], f, i);
      const html = generateDocumentById(`besoins_${i}`, 'trame_eval_besoins_combine', { stagiaireIdx: i }, ORG_TEST, f, actual);
      expect(html).toContain(answer?.objectif);
      expect(html).toContain('Diplôme déclaré');
    }
  });

  it.each(['izilearn', 'crmlms', 'orienta'] as const)('%s : réponses dédiées et réponse enregistrée prioritaire', app => {
    const p: IzPayload = {
      version: 1, source: { app, url: 'https://example.org', orgId: 'o', sessionId: 's' },
      organisme: { id: 'o', nom: 'ORGANISME TEST', siret: '12345678900011', nda: '11000000000', adresse: '1 rue de Paris', codePostal: '75001', ville: 'Paris', email: 'contact@example.org', dirigeant: 'Jean MARTIN' },
      formation: { id: 'f', intitule: VTEST_FORMATIONS[2].intitule, codeCertification: 'RS6905', typeAction: 'actions-formation', dureeHeures: 30, modules: [], blocs: [] },
      session: { id: 's', code: 'S1', dateDebut: '2026-11-02', dateFin: '2026-11-06', modalite: 'distanciel', formateur: 'Paul DURAND' },
      creneaux: [], apprenants: people.slice(0, 2).map((s, i) => ({ inscriptionId: `e${i}`, contactId: `c${i}`, prenom: s.prenom, nom: s.nom, statut: 'inscrit', signatures: [], connexions: [], ...(i === 0 ? { besoins: { titre: 'Besoins', date: '2026-10-26', reponses: [{ question: 'Quel objectif professionnel ou personnel souhaitez-vous atteindre grâce à cette formation ?', reponse: 'I want to lead technical meetings with international partners.' }] } } : {}) })),
    };
    const pieces = planPieces(contexte(p));
    expect(pieces.find(x => x.id === 'besoins_0')?.rendre()).toContain('I want to lead technical meetings with international partners.');
    const html = pieces.find(x => x.id === 'besoins_1')?.rendre();
    expect(html).toContain('I want to introduce my role');
    expect(html).toContain('B2 objectives');
    expect(html).not.toContain('I want to lead technical meetings');
  });
});