import { buildDocument, tableHTML } from '@/lib/docBuilder';
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from '@/types/qualiopi';
import { getFormationPreset } from './registry';
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
export function presetBlankDocument(template:string,params:Record<string,unknown>|undefined,o:OrganismeInfo,f:FormationInfo,people:StagiaireInfo[]):string|null {
 const p=getFormationPreset(f),e=p?.data.evaluations;if(!p||!e)return null;
 const learner=typeof params?.stagiaireIdx==='number'?people[params.stagiaireIdx]:people.length===1?people[0]:undefined;
 const identity=learner?`<p><strong>Stagiaire :</strong> ${esc(`${learner.prenom} ${learner.nom}`)}</p>`:'';
 const sig=learner?`<div class="sig-box"><p class="sig-label">Signature du stagiaire</p></div>`:'';
 let title='',html='';
 if(/positionnement|qcm|evaluation_finale|examen_final|exercices/.test(template)){
  if(/exercices/.test(template)) {title='EXERCICES PRATIQUES';const index=typeof params?.exerciceIdx==='number'?params.exerciceIdx:null;const exercises=index===null?e.exercices:e.exercices.slice(index,index+1);html=exercises.map((x,i)=>`<h2>${(index??0)+i+1}. ${esc(x.titre)}</h2><p>${esc(x.consigne)}</p><p>Barème : ${x.points} points</p><p>Réponse du stagiaire :</p><div style="min-height:120px"></div><p>Évaluation du formateur :</p><div style="min-height:40px"></div>`).join('');}
  else if(/evaluation_finale|examen_final/.test(template)){title='ÉVALUATION FINALE';html=`<h2>${esc(e.evaluationFinale.titre)}</h2>`+e.evaluationFinale.exercices.map(x=>`<h3>${esc(x.titre)}</h3><p>${esc(x.consigne)}</p><div style="min-height:120px"></div>`).join('')+tableHTML(['Critère','Barème','Résultat'],e.evaluationFinale.grille.map(x=>[esc(x.critere),String(x.points),'']));}
  else {const fin=/fin|final/.test(template);title=fin?'TEST DE POSITIONNEMENT — FIN':'TEST DE POSITIONNEMENT — DÉBUT';html=(fin?e.qcmFin:e.qcmDebut).map((q,i)=>`<h3>${i+1}. ${esc(q.question)}</h3><p>${q.options.map(x=>`☐ ${esc(x)}`).join('<br>')}</p>`).join('');html+=(fin?e.questionsOuvertesFin:e.questionsOuvertesDebut).map(q=>`<p><strong>${esc(q.question)}</strong></p><div style="min-height:70px"></div>`).join('');}
 }else if(/besoins/.test(template)){title='ÉVALUATION DES BESOINS';html=(p.data.plan?.besoins.besoinsList??[]).map(x=>`<p><strong>${esc(x)}</strong></p><div style="min-height:50px"></div>`).join('');}
 else if(/bilan_chaud|bilan_froid|satisfaction/.test(template)){title=/froid/.test(template)?'BILAN À FROID':'BILAN À CHAUD';html=['Atteinte des objectifs','Qualité de l’accompagnement','Mise en pratique des compétences','Commentaires'].map(x=>`<p><strong>${x}</strong></p><div style="min-height:70px"></div>`).join('');}
 else if(/grille_acquisition/.test(template)){title='GRILLE D’ACQUISITION';html=tableHTML(['Compétence','Résultat','Commentaire'],(p.data.plan?.competences??[]).map(x=>[esc(x),'','']));}
 else return null;
 return buildDocument({org:o,title,subtitle:f.intitule,formation:f,showFormationInfo:true,stagiaires:learner?[learner]:people,extraHtml:identity+html+sig});
}
