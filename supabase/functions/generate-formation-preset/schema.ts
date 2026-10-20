import { z } from 'npm:zod@3';
const text=z.string();
export const question=z.object({question:text,options:z.array(text).length(4),correctIndex:z.number().int().min(0).max(3)});
const open=z.object({question:text,reponseAttendue:text});
const exercise=z.object({titre:text,consigne:text,reponseAttendue:text,points:z.number().positive()});
export const planSchema=z.object({formation:z.object({objectifs:text,prerequis:text,publicVise:text,modalites:text,moyensPedagogiques:text,methodesEvaluation:text,programme:text,accessibilite:text}),competences:z.array(text).min(1).max(20),besoins:z.object({besoinsList:z.array(text),syntheseHtml:text,adaptationsHtml:text}),chapters:z.array(z.object({title:text,description:text,sections:z.array(text).min(6).max(12)})).length(16)});
export const evalSchema=z.object({exercices:z.array(exercise).length(10),qcmCompetences:z.array(z.object({competence:text,questions:z.array(question.extend({explication:text})).length(10)})),qcmDebut:z.array(question).length(10),qcmFin:z.array(question).length(10),questionsOuvertesDebut:z.array(open).length(10),questionsOuvertesFin:z.array(open).length(10),exerciceIntermediaire:z.object({titre:text,contexte:text,questions:z.array(open.extend({points:z.number().positive()})).min(4)}),evaluationFinale:z.object({titre:text,exercices:z.array(exercise).min(1),grille:z.array(z.object({critere:text,points:z.number().positive()})).min(1)})});
export const chapterSchema=z.object({title:text,description:text,imageQuery:text,sections:z.array(z.object({title:text,contentHtml:text})).min(6).max(12),quiz:z.array(question.extend({explication:text})).length(10),casPratique:exercise});
const source=z.object({lien:text,titreLien:text,titre:text,date:text,commentaire:text,exploitation:text});
export const sourcesSchema=z.object({veille:z.object({reglementaire:z.array(source),metier:z.array(source),technologique:z.array(source)}),ressources:z.object({supportsHtml:text,outilsHtml:text,ressourcesComplHtml:text,videos:z.array(z.object({title:text,description:text,url:text}))})});
export const bodySchema=z.discriminatedUnion('action',[
 z.object({action:z.literal('start'),formation:z.object({intitule:z.string().min(3).max(400),codeRNCP:z.string().max(30).optional(),duree:z.string().max(200),typeAction:z.enum(['actions-formation','apprentissage','vae','bilans-competences']),modalites:z.string().max(500),objectifs:z.string().max(20000).optional(),programme:z.string().max(20000).optional()})}),
 z.object({action:z.literal('step'),id:z.string().uuid(),step:z.string().regex(/^(plan|evaluations|sources|chapter_\d{1,2})$/)}),
 z.object({action:z.enum(['resume','validate','finalize']),id:z.string().uuid()}),
 z.object({action:z.literal('regenerate'),id:z.string().uuid(),index:z.number().int().min(0).max(15)})
]);
