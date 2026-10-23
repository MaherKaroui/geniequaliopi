#!/usr/bin/env node
/**
 * Construit src/data/tpPresets/lilate-en.json et lilate-fle.json à partir des
 * contenus LMS de CRM LMS (content/lms/<parcours>/course.json + leçons).
 * Usage : node scripts/build-lilate-presets.mjs <chemin vers crmlms/content/lms>
 * Rien n'est inventé : QCM, exercices, corrigés et cours viennent des leçons.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = process.argv[2];
if (!src) { console.error('Usage : node scripts/build-lilate-presets.mjs <crmlms/content/lms>'); process.exit(1); }
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'tpPresets');

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
const META = /dialogue|vid[ée]o|enregistrement|audio|[ée]coutez/i;

/** Cours en texte brut → HTML : titres sur une ligne seule, listes « - », paragraphes. */
function coursHtml(text, lessonTitle) {
  const lines = String(text || '').split(/\r?\n/);
  const html = []; let list = [];
  const flush = () => { if (list.length) { html.push(`<ul>${list.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>`); list = []; } };
  lines.forEach((raw, i) => {
    const l = raw.trim();
    if (!l) { flush(); return; }
    if (i === 0 && l === lessonTitle) return;
    if (/^[-•]\s+/.test(l)) { list.push(l.replace(/^[-•]\s+/, '')); return; }
    flush();
    const heading = l.length <= 90 && !/[.:;!?»”)]$/.test(l) && !/ : /.test(l);
    html.push(heading ? `<h4>${esc(l)}</h4>` : `<p>${esc(l)}</p>`);
  });
  flush();
  return html.join('\n');
}

function sectionHtml(lesson, langue) {
  const parts = [`<p><strong>Objectif :</strong> ${esc(lesson.objectif)}</p>`];
  if (lesson.niveau) parts.push(`<p><em>Niveau de référence de la leçon : ${esc(lesson.niveau)} — durée indicative ${lesson.minutes} min.</em></p>`);
  parts.push(coursHtml(lesson.cours, lesson.titre));
  if (lesson.vocabulaire?.length) {
    const col = langue === 'en' ? 'Traduction' : 'Sens';
    parts.push(`<h4>Vocabulaire clé</h4><table><thead><tr><th>Terme</th><th>${col}</th><th>Exemple</th><th>Niveau</th></tr></thead><tbody>${lesson.vocabulaire.map((v) => `<tr><td>${esc(v.terme)}</td><td>${esc(v.traduction)}</td><td>${esc(v.exemple)}</td><td>${esc(v.niveau)}</td></tr>`).join('')}</tbody></table>`);
  }
  const d = lesson.dialogue;
  if (d?.repliques?.length) {
    parts.push(`<h4>Dialogue : ${esc(d.titre)}</h4>${d.contexte ? `<p><em>${esc(d.contexte)}</em></p>` : ''}<table><tbody>${d.repliques.map((r) => `<tr><td><strong>${esc(r.locuteur)}</strong></td><td>${esc(r.texte)}</td></tr>`).join('')}</tbody></table>`);
  }
  if (lesson.consignes) parts.push(`<h4>Comment travailler cette leçon</h4><p>${esc(lesson.consignes).replace(/\n/g, '<br>')}</p>`);
  return parts.join('\n');
}

const qcm = (q, withExpl) => ({ question: q.question, options: q.options, correctIndex: q.correctIndex, ...(withExpl ? { explication: q.explication || '' } : {}) });
const titreExo = (lesson, e) => `${lesson.titre} — exercice ${e.type === 'oral' ? 'oral' : 'écrit'} ${e.key.replace('e', '')}`;

const TEXTES = {
  'lilate-en': {
    langue: 'en',
    besoins: [
      'Situer son niveau d’anglais professionnel actuel sur l’échelle du CECRL et identifier le niveau visé.',
      'Accueillir en anglais un visiteur ou un client, en face à face ou au téléphone.',
      'Identifier un interlocuteur anglophone et comprendre l’objet de sa demande.',
      'Recueillir, reformuler et confirmer des informations exprimées en anglais.',
      'Prendre un message téléphonique fiable (noms, chiffres, coordonnées).',
      'Rédiger des emails professionnels courts et adaptés au destinataire.',
      'Transmettre en anglais des consignes, des procédures ou des informations.',
      'Lire et exploiter des documents professionnels rédigés en anglais.',
      'Participer à une réunion ou à un échange avec des collaborateurs anglophones.',
      'Traiter une réclamation ou une situation délicate en anglais et se préparer au test LILATE.',
    ],
    synthese: (c) => `• Le parcours prépare au Test d’aptitude à travailler en anglais – LILATE (${c.referentiel.code}), certification enregistrée au Répertoire spécifique ; le test est délivré par le certificateur ${c.referentiel.certificateur}, l’organisme de formation en assure la préparation.<br>• Le référentiel comporte 4 compétences : ${Object.entries(c.referentiel.competences).map(([k, v]) => `${k} — ${v}`).join(' ; ')}.<br>• Le parcours compte 12 modules en e-learning (vidéo, cours, vocabulaire, dialogue, exercices écrits et oraux, QCM), ouvert par un test de niveau et clôturé par un examen blanc.<br>• Les besoins sont recueillis individuellement avant l’entrée en formation ; le niveau de départ et les situations professionnelles du stagiaire orientent la progression.`,
    adaptations: '• Niveau de départ fixé par le test de niveau ou par l’organisme : les QCM de chaque leçon sont proposés dans la bande de niveau du stagiaire (A1–A2, B1, B2–C1).<br>• Rythme libre en e-learning, avec possibilité de revoir les vidéos, d’écouter les dialogues et de refaire les exercices.<br>• Sous-titres et transcriptions des vidéos et dialogues pour faciliter la compréhension.<br>• Besoins liés à une situation de handicap : à signaler au référent handicap, qui examine les adaptations possibles (temps, supports, modalités).<br>• Les situations de travail citées dans les exercices peuvent être rapprochées du poste du stagiaire lors des échanges avec le formateur.',
  },
  'lilate-fle': {
    langue: 'fr',
    besoins: [
      'Situer son niveau de français professionnel actuel sur l’échelle du CECRL et identifier le niveau visé.',
      'Se présenter et échanger simplement en français dans son environnement de travail.',
      'Améliorer sa prononciation et sa compréhension orale des échanges professionnels.',
      'Accueillir en français un client ou un usager et identifier sa demande.',
      'Poser des questions, reformuler et confirmer des informations exprimées en français.',
      'Enrichir son vocabulaire professionnel et l’utiliser à bon escient.',
      'Lire et comprendre des documents professionnels rédigés en français.',
      'Rédiger des messages et emails professionnels simples et clairs.',
      'Transmettre en français des consignes ou des procédures à un collègue ou un client.',
      'Communiquer en équipe, gérer une situation professionnelle courante et se préparer au test LILATE.',
    ],
    synthese: (c) => `• Le parcours prépare au Test d’aptitude à travailler en français langue étrangère – LILATE (${c.referentiel.code}), certification enregistrée au Répertoire spécifique ; le test est délivré par le certificateur ${c.referentiel.certificateur}, l’organisme de formation en assure la préparation.<br>• Le référentiel comporte 4 compétences : ${Object.entries(c.referentiel.competences).map(([k, v]) => `${k} — ${v}`).join(' ; ')}.<br>• Le parcours compte 12 modules en e-learning (vidéo, cours, vocabulaire, dialogue, exercices écrits et oraux, QCM), entièrement en français, ouvert par un test de niveau et clôturé par un examen blanc.<br>• Les besoins sont recueillis individuellement avant l’entrée en formation ; le niveau de départ et les situations professionnelles du stagiaire orientent la progression.`,
    adaptations: '• Niveau de départ fixé par le test de niveau ou par l’organisme : les QCM de chaque leçon sont proposés dans la bande de niveau du stagiaire (A1–A2, B1, B2–C1).<br>• Narration en français simple, rythme libre en e-learning, possibilité de revoir les vidéos et de réécouter les dialogues.<br>• Sous-titres et transcriptions des vidéos et dialogues pour faciliter la compréhension.<br>• Besoins liés à une situation de handicap : à signaler au référent handicap, qui examine les adaptations possibles (temps, supports, modalités).<br>• Les situations de travail citées dans les exercices peuvent être rapprochées du poste du stagiaire lors des échanges avec le formateur.',
  },
};

function build(parcours) {
  const dir = join(src, parcours);
  const course = read(join(dir, 'course.json'));
  const T = TEXTES[parcours];
  const comps = course.referentiel.competences;
  const modules = course.modules.map((m) => ({ ...m, lessons: m.lessons.map((l) => read(join(dir, `${l.key}.json`))) }));
  const all = modules.flatMap((m) => m.lessons.map((l) => ({ ...l, module: m.key, mIndex: Number(m.key.slice(1)) })));
  const pos = all.find((l) => l.type === 'positionnement');
  const exam = all.find((l) => l.type === 'examen');
  const lecons = all.filter((l) => l.type === 'lecon');

  const qcmDebut = pos.qcm.slice(0, 10).map((q) => qcm(q));
  const qcmFin = exam.qcm.filter((q) => !META.test(q.question)).slice(0, 10).map((q) => qcm(q));
  if (qcmFin.length < 10) throw new Error(`${parcours} : moins de 10 questions d'examen hors dialogue`);

  // QCM par compétence : 2 questions B1 puis 1 B2–C1 par leçon rattachée, sans réutilisation.
  const used = new Set();
  const qcmCompetences = Object.entries(comps).map(([code, libelle]) => {
    const questions = [];
    for (const l of lecons.filter((x) => x.competences.includes(code))) {
      const pool = l.qcm.filter((q) => !META.test(q.question) && !used.has(q.question));
      const pick = [...pool.filter((q) => q.niveau === 'B1').slice(0, 1), ...pool.filter((q) => /B2|C1/.test(q.niveau)).slice(0, 1)];
      for (const q of pick) { used.add(q.question); questions.push(qcm(q, true)); }
      if (questions.length >= 8) break;
    }
    return { competence: `${code} — ${libelle}`, questions };
  });

  // Exercices pratiques : un par module 2 à 12 (8 modules répartis), en alternant écrit et oral.
  const usedEx = new Set();
  const pickEx = (l, type) => {
    const e = l.exercices.find((x) => x.type === type && !usedEx.has(l.key + x.key)) ?? l.exercices.find((x) => !usedEx.has(l.key + x.key));
    if (e) usedEx.add(l.key + e.key);
    return e;
  };
  const exModules = [2, 3, 4, 5, 7, 8, 9, 11];
  const exercices = exModules.map((mi, i) => {
    const l = lecons.find((x) => x.mIndex === mi);
    const e = pickEx(l, i % 2 ? 'oral' : 'ecrit');
    return { titre: titreExo(l, e), consigne: e.enonce, reponseAttendue: e.corrige, points: 10 };
  });

  const ouvertes = (from, to) => {
    const res = [];
    for (const l of lecons.filter((x) => x.mIndex >= from && x.mIndex <= to)) {
      const e = pickEx(l, 'ecrit');
      if (e) res.push({ question: e.enonce, reponseAttendue: e.corrige });
      if (res.length >= 10) break;
    }
    return res;
  };
  const questionsOuvertesDebut = ouvertes(1, 6);
  const questionsOuvertesFin = ouvertes(7, 12);

  const inter = lecons.filter((x) => x.mIndex === 6 || x.mIndex === 7);
  const interQs = [];
  for (const l of inter) for (const t of ['ecrit', 'oral']) { const e = pickEx(l, t); if (e && interQs.length < 4) interQs.push({ question: e.enonce, reponseAttendue: e.corrige, points: 5 }); }
  const mod = (k) => modules.find((m) => m.key === k).titre;
  const exerciceIntermediaire = {
    titre: 'Évaluation intermédiaire — 4 exercices notés sur 20',
    contexte: `Évaluation à mi-parcours portant sur les modules « ${mod('m6')} » et « ${mod('m7')} ». Les exercices reprennent des situations de travail du parcours ; les exercices oraux se préparent par écrit puis se disent à voix haute (enregistrement possible).`,
    questions: interQs,
  };

  const evaluationFinale = {
    titre: `${exam.titre} — 4 exercices (un par compétence ${Object.keys(comps).join(', ')}) notés sur 20`,
    exercices: exam.exercices.map((e) => ({ titre: e.enonce.split(/\n/)[0].split('.')[0].trim() || `Exercice ${e.key}`, consigne: e.enonce, reponseAttendue: e.corrige, points: 5 })),
    grille: Object.entries(comps).map(([code, libelle]) => ({ critere: `${code} — ${libelle} : message compréhensible, informations exactes, registre adapté à l’interlocuteur.`, points: 5 })),
  };

  // Support de cours : un chapitre par module, une section par leçon (cours, vocabulaire, dialogue).
  const chapters = modules.map((m) => ({
    title: m.titre,
    description: m.lessons.map((l) => l.objectif).filter(Boolean).join(' '),
    imageQuery: `${T.langue === 'en' ? 'business English' : 'français professionnel'} ${m.titre}`,
    sections: m.lessons.map((l) => ({ title: l.titre, contentHtml: sectionHtml(l, T.langue) })),
  }));

  const minutes = all.reduce((a, l) => a + (l.minutes || 0), 0);
  const res = {
    titre: course.titre, code: course.referentiel.code, certificateur: course.referentiel.certificateur, minutes,
    modules: course.modules.map((m) => ({ titre: m.titre, lecons: m.lessons.map((l) => l.titre) })),
    competences: Object.entries(comps).map(([k, v]) => `${k} — ${v}`),
    besoinsList: T.besoins, syntheseHtml: T.synthese(course), adaptationsHtml: T.adaptations,
    qcmDebut, qcmFin, qcmCompetences, questionsOuvertesDebut, questionsOuvertesFin, exercices,
    exerciceIntermediaire, evaluationFinale, chapters,
  };
  writeFileSync(join(out, `${parcours}.json`), JSON.stringify(res, null, 1) + '\n');
  console.log(parcours, { minutes, qcmDebut: qcmDebut.length, qcmFin: qcmFin.map((q) => q.correctIndex).join(''), qcmComp: qcmCompetences.map((c) => c.questions.length), ouvertes: [questionsOuvertesDebut.length, questionsOuvertesFin.length], exercices: exercices.length, inter: interQs.length, finale: evaluationFinale.exercices.length, chapters: chapters.length });
}

build('lilate-en');
build('lilate-fle');
