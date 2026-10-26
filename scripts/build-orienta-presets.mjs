#!/usr/bin/env node
/**
 * Construit les presets intégrés des parcours d'Orienta Campus :
 *  - VTest Business English – 4 Skills (RS6905) : parcours A2 (21 h), B1 (21 h), B2 (30 h), C1 (50 h) ;
 *  - Product Builder No-Code (RNCP41480) : titre complet (420 h) et blocs 1 à 4 (105 h chacun).
 * Usage : node scripts/build-orienta-presets.mjs <english-business-lms/content> <english-business-lms-lovable/content/pbnc>
 * Rien n'est inventé : cours, QCM, exercices et corrigés viennent des contenus des deux LMS ;
 * les compétences reprennent les fiches France Compétences (vérifiées le 26/10/2026).
 * Les mentions propres à un organisme (nom, référente, téléphone, liens de téléchargement) sont retirées.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [enSrc, pbSrc] = process.argv.slice(2);
if (!enSrc || !pbSrc) { console.error('Usage : node scripts/build-orienta-presets.mjs <english-lms/content> <content/pbnc>'); process.exit(1); }
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'tpPresets', 'orienta');
mkdirSync(out, { recursive: true });
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));

// ---------- Nettoyage et conversion ----------
const ORG = /ORIENTA|Orienta|Rahma GARY|GARY|orienta-campus|07 54 83|outlook\.com|Roissy/;
function clean(s) {
  return String(s ?? '')
    .replace(/\[([^\]]*)\]\(https?:\/\/[^)]*orienta[^)]*\)/g, '')
    .replace(/Orienta Campus/g, 'la plateforme de formation')
    .replace(/ORIENTA CONSULT/g, "l'organisme de formation");
}
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*\s][^*]*)\*/g, '<em>$1</em>').replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '$1');

/** Markdown simple (titres, listes, tableaux, gras) → HTML. */
function md(text) {
  const lines = clean(text).split(/\r?\n/);
  const html = []; let list = null; let table = null; let para = [];
  const flushP = () => { if (para.length) { html.push(`<p>${para.map(inline).join('<br>')}</p>`); para = []; } };
  const flushL = () => { if (list) { html.push(`<${list.t}>${list.items.map((l) => `<li>${inline(l)}</li>`).join('')}</${list.t}>`); list = null; } };
  const flushT = () => {
    if (table) {
      const rows = table.filter((r) => !/^\|?\s*:?-{2,}/.test(r)).map((r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
      const [h, ...b] = rows;
      html.push(`<table><thead><tr>${h.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${b.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
      table = null;
    }
  };
  const flush = () => { flushP(); flushL(); flushT(); };
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) { flush(); continue; }
    if (/^!\[/.test(l)) continue;
    if (/^\|/.test(l)) { flushP(); flushL(); (table ??= []).push(l); continue; }
    flushT();
    let m;
    if ((m = l.match(/^(#{1,6})\s+(.*)/))) { flush(); const n = Math.min(6, Math.max(3, m[1].length + 1)); html.push(`<h${n}>${inline(m[2])}</h${n}>`); continue; }
    if ((m = l.match(/^[-•*]\s+(.*)/))) { flushP(); if (list?.t !== 'ul') { flushL(); list = { t: 'ul', items: [] }; } list.items.push(m[1]); continue; }
    if ((m = l.match(/^\d+[.)]\s+(.*)/))) { flushP(); if (list?.t !== 'ol') { flushL(); list = { t: 'ol', items: [] }; } list.items.push(m[1]); continue; }
    flushL(); para.push(l);
  }
  flush();
  return html.join('\n');
}
/** Markdown → texte brut lisible (consignes et corrigés des documents). */
function plain(text) {
  return clean(text).split(/\r?\n/)
    .filter((l) => !/^\s*\|?\s*:?-{2,}[-|: ]*$/.test(l))
    .map((l) => l.replace(/^#{1,6}\s+/, '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/^\|\s*|\s*\|$/g, '').replace(/\s*\|\s*/g, ' | '))
    .join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
const qcm = (q, options, answer, explication) => ({ question: clean(q).trim(), options: options.map((o) => clean(o)), correctIndex: answer, ...(explication !== undefined ? { explication: clean(explication) } : {}) });
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const STOP = new Set('les des une un du de la le et en au aux pour par sur dans avec afin que qui son sa ses leur leurs est sont produit numerique outils code no reposant projet'.split(' '));
const words = (s) => new Set(norm(s).split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !STOP.has(w)));
const overlap = (a, b) => { let n = 0; for (const w of a) if (b.has(w)) n++; return n; };

/** Répartit des questions entre compétences (10 chacune, sans réemploi), par proximité lexicale. */
function allocate(comps, poolFor, n = 10) {
  const used = new Set(); const res = new Map();
  const order = [...comps].sort((a, b) => poolFor(a).length - poolFor(b).length);
  for (const c of order) {
    const cw = words(c.texte);
    const pool = poolFor(c).filter((q) => !used.has(q.question)).map((q, i) => ({ q, s: overlap(cw, words(q.question + ' ' + (q.explication || ''))) - i / 1000 }));
    pool.sort((a, b) => b.s - a.s);
    const pick = pool.slice(0, n).map((x) => x.q);
    if (pick.length < n) throw new Error(`${c.code} : ${pick.length} questions seulement`);
    pick.forEach((q) => used.add(q.question));
    res.set(c.code, pick);
  }
  return { qcmCompetences: comps.map((c) => ({ competence: `${c.code} — ${c.texte}`, questions: res.get(c.code) })), used };
}

// ---------- Veille (sources officielles, vérifiables) ----------
const v = (lien, titreLien, titre, date, commentaire, exploitation) => ({ lien, titreLien, titre, date, commentaire, exploitation });
const VEILLE_VTEST = {
  reglementaire: [
    v('https://www.francecompetences.fr/recherche/rs/6905/', 'France Compétences – RS6905', 'Fiche RS6905 – VTest Business English – 4 Skills (certificateur EXASSESS)', 'Novembre 2024', "Enregistrement au Répertoire spécifique le 28/11/2024 pour 3 ans (échéance 28/11/2027, dernière délivrance possible le 27/05/2028). La fiche décrit les 4 compétences évaluées (C1 à C4) et les niveaux A2 à C1 ; le niveau A2 est requis pour valider la certification.", "Preuve : fiche consultée et archivée dans le dossier qualité. Action : programmes, test de positionnement et livret d'accueil alignés sur les 4 compétences et sur le prérequis A2 à la validation."),
    v('https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049496613', 'Légifrance – décret n° 2024-394', 'Décret n° 2024-394 du 29 avril 2024 relatif à la participation obligatoire du titulaire d’un compte personnel de formation', 'Avril 2024', "Depuis le 2 mai 2024, le titulaire d'un CPF acquitte une participation forfaitaire lors de l'achat d'une formation, sauf cas d'exonération (demandeurs d'emploi, abondement employeur…).", "Preuve : décret archivé. Action : information du stagiaire sur le reste à charge lors de l'entretien d'entrée et dans les conditions générales de vente."),
    v('https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000037367660', 'Légifrance – loi n° 2018-771', 'Loi n° 2018-771 du 5 septembre 2018 pour la liberté de choisir son avenir professionnel', 'Septembre 2018', "La loi fonde l'éligibilité au CPF des certifications enregistrées au RNCP ou au Répertoire spécifique et l'obligation de certification qualité des organismes financés sur fonds publics ou mutualisés.", "Preuve : texte archivé. Action : vérification annuelle de la validité de l'enregistrement RS6905 avant toute ouverture de session financée par le CPF."),
  ],
  metier: [
    v('https://www.coe.int/fr/web/common-european-framework-reference-languages', 'Conseil de l’Europe – CECRL', 'Cadre européen commun de référence pour les langues (CECRL) et son volume complémentaire', 'Février 2018', "Le volume complémentaire du CECRL actualise les descripteurs (médiation, interaction en ligne, compétences plurilingues). Le VTest affine l'échelle en 10 niveaux de A2 à C1.", "Preuve : descripteurs utilisés dans la grille de positionnement. Action : objectifs de chaque parcours rédigés avec les descripteurs du niveau visé."),
    v('https://candidate.vtest.com/', 'Plateforme VTest', 'Espace candidat VTest – passage du test en ligne', 'Octobre 2026', "Le test se passe en ligne : compréhension orale et écrite adaptatives, expression orale notée automatiquement, rédaction en 30 minutes avec un nombre minimal de mots selon le niveau (80, 150 ou 200 mots).", "Preuve : description des épreuves reprise dans le livret stagiaire. Action : entraînements chronométrés au format des 4 épreuves en fin de parcours."),
    v('https://www.francecompetences.fr/', 'France Compétences', 'Répertoire spécifique : liste des organismes préparant à la certification RS6905', 'Octobre 2026', "La fiche publie la liste des organismes préparant à la certification ; l'organisme vérifie son inscription et les conditions fixées par le certificateur.", "Preuve : capture de la liste. Action : convention ou accord avec le certificateur tenu à jour dans le dossier qualité."),
  ],
  technologique: [
    v('https://www.coe.int/fr/web/common-european-framework-reference-languages/level-descriptions', 'Conseil de l’Europe – descripteurs', 'Description des niveaux communs de référence du CECRL', 'Février 2018', "Les descripteurs « interaction en ligne » et « médiation » s'appliquent aux réunions à distance et aux échanges écrits instantanés, désormais courants en contexte professionnel.", "Preuve : grille d'entraînement à la visioconférence. Action : mises en situation de réunion en ligne intégrées aux classes virtuelles."),
    v('https://www.w3.org/TR/WCAG22/', 'W3C – WCAG 2.2', 'Web Content Accessibility Guidelines (WCAG) 2.2 – recommandation W3C', 'Octobre 2023', "Les ressources audio et vidéo de la plateforme doivent être accompagnées de transcriptions et de sous-titres pour rester accessibles.", "Preuve : transcriptions disponibles pour chaque dialogue et audio. Action : contrôle de la présence des transcriptions à chaque mise à jour des contenus."),
  ],
};
const VEILLE_PBNC = {
  reglementaire: [
    v('https://www.francecompetences.fr/recherche/rncp/41480/', 'France Compétences – RNCP41480', 'Fiche RNCP41480 – Product builder no-code (niveau 6, certificateur CONSULTING SCHOOL)', 'Octobre 2025', "Titre enregistré le 27/10/2025 jusqu'au 27/10/2028 (dernière délivrance possible le 26/10/2032), en 4 blocs de compétences évalués par mise en situation professionnelle : dossier ou produit réalisé, puis soutenance orale devant le jury.", "Preuve : fiche archivée. Action : parcours, évaluations de synthèse et dossiers de certification alignés sur les 32 compétences des 4 blocs ; habilitation du certificateur vérifiée avant chaque session."),
    v('https://eur-lex.europa.eu/eli/reg/2016/679/oj', 'EUR-Lex – RGPD', 'Règlement (UE) 2016/679 du 27 avril 2016 (RGPD)', 'Avril 2016', "Les produits no-code traitent des données personnelles hébergées chez des éditeurs tiers : base légale, minimisation, sous-traitance (art. 28) et transferts hors UE doivent être documentés.", "Preuve : chapitres sécurité et données du support. Action : registre des traitements et analyse des sous-traitants exigés dans les exercices du bloc 3."),
    v('https://eur-lex.europa.eu/eli/reg/2024/1689/oj', 'EUR-Lex – règlement IA', 'Règlement (UE) 2024/1689 établissant des règles harmonisées concernant l’intelligence artificielle', 'Juillet 2024', "Les briques d'IA intégrées aux outils no-code sont concernées par les obligations de transparence et, selon l'usage, par les obligations applicables aux systèmes à haut risque, avec une entrée en application progressive.", "Preuve : texte archivé. Action : point d'attention ajouté à la grille de choix des outils (benchmark du bloc 1)."),
  ],
  metier: [
    v('https://accessibilite.numerique.gouv.fr/', 'DINUM – RGAA', 'Référentiel général d’amélioration de l’accessibilité (RGAA 4.1)', 'Juin 2023', "Le RGAA traduit les WCAG en critères vérifiables ; le référentiel exige d'intégrer l'accessibilité dès les wireframes et lors de la construction des interfaces.", "Preuve : audit RGAA de maquette demandé à l'exercice B1-E3. Action : critères RGAA intégrés à la Definition of Done des exercices de développement."),
    v('https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/', 'Numérique responsable – RGESN', 'Référentiel général d’écoconception de services numériques (RGESN)', 'Mai 2024', "Le RGESN, publié par l'Arcom et l'Arcep en mai 2024, fixe des critères d'écoconception que le Product Builder doit intégrer au cadrage et aux spécifications.", "Preuve : critères repris dans le chapitre objectifs et périmètre. Action : grille d'écoconception utilisée lors du benchmark et de la recette."),
    v('https://www.w3.org/TR/WCAG22/', 'W3C – WCAG 2.2', 'Web Content Accessibility Guidelines (WCAG) 2.2', 'Octobre 2023', "WCAG 2.2 ajoute notamment des critères sur la taille des cibles, l'aide cohérente et l'authentification accessible, directement applicables aux composants des outils no-code.", "Preuve : extrait commenté dans le support. Action : contrôle des nouveaux critères lors des tests utilisateurs du bloc 4."),
  ],
  technologique: [
    v('https://cyber.gouv.fr/publications/recommandations-de-securite-pour-un-systeme-dia-generative', 'ANSSI – IA générative', 'Recommandations de sécurité pour un système d’IA générative', 'Avril 2024', "L'ANSSI formule des recommandations (cloisonnement, gestion des secrets, journalisation, contrôle des données d'entraînement) transposables aux automatisations no-code qui appellent des modèles d'IA.", "Preuve : recommandations citées au chapitre sécurité. Action : gestion des clés d'API et des journaux d'accès évaluée dans l'exercice B3-E4."),
    v('https://eur-lex.europa.eu/eli/reg/2023/2854/oj', 'EUR-Lex – Data Act', 'Règlement (UE) 2023/2854 sur les données (Data Act)', 'Décembre 2023', "Applicable depuis le 12 septembre 2025, le Data Act facilite le changement de fournisseur de services cloud et la portabilité des données, ce qui renforce l'enjeu de réversibilité des produits no-code.", "Preuve : chapitre réversibilité du bloc 4. Action : plan de réversibilité et export des données exigés dans l'exercice B4-E5."),
  ],
};

// ======================================================================
// VTest RS6905
// ======================================================================
const VTEST_COMPS = [
  { code: 'C1', texte: "Écouter et comprendre un ensemble d'énoncés, de dialogues et de monologues en anglais afin de repérer, distinguer, identifier, sélectionner et apprécier des informations qui permettent de valider le degré de compréhension de la langue anglaise parlée nécessaire dans un contexte professionnel" },
  { code: 'C2', texte: "Comprendre et analyser un ensemble de textes, emails et articles en anglais afin de repérer, distinguer, identifier, sélectionner et apprécier des informations qui permettent de répondre à des questions avec précision dans un contexte professionnel" },
  { code: 'C3', texte: "S'exprimer et communiquer à l'oral en anglais afin d'apprécier les aptitudes à échanger, décrire, formuler, argumenter sur un ensemble de sujets dans un contexte professionnel" },
  { code: 'C4', texte: "Rédiger en anglais avec un vocabulaire et des tournures grammaticales appropriées afin de mesurer les aptitudes à écrire, décrire, formuler, questionner, argumenter, structurer ses idées sur un sujet donné dans un contexte professionnel" },
];
const transcript = (audio) => (audio || []).map((a) => `${a.speaker || 'Speaker'}: ${a.line}`).join(' / ');
const LEVELS = { A2: ['A2.1', 'A2.2'], B1: ['B1.1', 'B1.2'], B2: ['B2.1', 'B2.2'], C1: ['C1.1', 'C1.2'] };

/** Items d'entraînement → QCM autonomes (transcription ou texte cité dans la question). */
function itemQcms(it) {
  const res = [];
  const ctx = it.type === 'listen_mcq' ? `Transcription de l'écoute : « ${transcript(it.audio)} »` : it.type === 'read_mcq' ? `${it.text_type ? `Document (${it.text_type})` : 'Document'} : « ${String(it.text).replace(/\s*\n\s*/g, ' ')} »` : '';
  if (it.type === 'listen_mcq' || it.type === 'read_mcq') {
    (it.questions || []).forEach((q, i) => { if (q.options?.length === 4) res.push({ ...qcm(`${i === 0 ? ctx + ' — ' : ''}${q.q}`, q.options, q.answer, q.explanation), _ctx: ctx, _q: q.q, _lvl: it.level, _c: it.competency, _first: i === 0 }); });
  } else if (it.type === 'gap_fill') {
    const gaps = it.gaps || [];
    gaps.forEach((g, i) => {
      if (!g.options || g.options.length !== 4) return;
      const ans = g.options.findIndex((o) => norm(o) === norm(g.accepted?.[0] ?? ''));
      if (ans < 0) return;
      let k = 0;
      const text = String(it.text).replace(/\[\[(\d+)\]\]/g, (_, n) => { const j = Number(n) - 1; k++; return j === i ? '_____' : (gaps[j]?.accepted?.[0] ?? '…'); });
      res.push({ ...qcm(`${it.instructions ? it.instructions.replace(/\.$/, '') + ' : ' : 'Complétez : '}« ${text.replace(/\s*\n\s*/g, ' ')} »`, g.options, ans, g.explanation), _lvl: it.level, _c: it.competency, _first: true });
    });
  }
  return res;
}
/** On ne garde la question 2+ d'un item que si elle se comprend avec le contexte : on le recopie. */
const withCtx = (q) => (q._first || !q._ctx ? q : { ...q, question: `${q._ctx} — ${q._q}` });
const strip = ({ _ctx, _q, _lvl, _c, _first, ...q }) => q;

function vtestItemHtml(it, n) {
  const p = [`<h4>Exercice ${n} — ${esc(it.code)} (${esc(it.competency)}, ${esc(it.level)})</h4>`];
  if (it.instructions) p.push(`<p><em>${inline(it.instructions)}</em></p>`);
  const corr = [];
  switch (it.type) {
    case 'listen_mcq': case 'listen_constructed':
      p.push(`<p><strong>Transcription :</strong></p><table><tbody>${(it.audio || []).map((a) => `<tr><td><strong>${esc(a.speaker)}</strong></td><td>${esc(a.line)}</td></tr>`).join('')}</tbody></table>`);
      (it.questions || []).forEach((q, i) => { p.push(`<p>${i + 1}. ${esc(q.q)}${q.options ? `<br>${q.options.map((o, k) => `${'ABCD'[k]}. ${esc(o)}`).join('<br>')}` : ''}</p>`); corr.push(`${i + 1}. ${q.options ? `${'ABCD'[q.answer]} — ${esc(q.options[q.answer])}` : esc((q.accepted || []).join(' / '))}. ${esc(q.explanation || '')}`); });
      break;
    case 'read_mcq':
      p.push(`<blockquote>${md(it.text)}</blockquote>`);
      (it.questions || []).forEach((q, i) => { p.push(`<p>${i + 1}. ${esc(q.q)}<br>${q.options.map((o, k) => `${'ABCD'[k]}. ${esc(o)}`).join('<br>')}</p>`); corr.push(`${i + 1}. ${'ABCD'[q.answer]} — ${esc(q.options[q.answer])}. ${esc(q.explanation || '')}`); });
      break;
    case 'gap_fill':
      p.push(`<p>${esc(it.text).replace(/\[\[(\d+)\]\]/g, '<strong>[$1] _____</strong>').replace(/\n/g, '<br>')}</p>`);
      (it.gaps || []).forEach((g, i) => { if (g.options) p.push(`<p>[${i + 1}] ${g.options.map(esc).join(' / ')}</p>`); corr.push(`[${i + 1}] ${esc((g.accepted || []).join(' / '))}. ${esc(g.explanation || '')}`); });
      break;
    case 'read_aloud':
      p.push(`<blockquote><p>${esc(it.text)}</p></blockquote>`);
      if (it.focus) corr.push(`Points de prononciation : ${esc(Array.isArray(it.focus) ? it.focus.join(' ; ') : it.focus)}`);
      break;
    case 'listen_repeat':
      p.push(`<ol>${(it.sentences || []).map((s) => `<li>${esc(s.line)}</li>`).join('')}</ol>`);
      corr.push('Répéter chaque phrase en respectant le rythme, l’accentuation et la liaison ; s’enregistrer et comparer au modèle.');
      break;
    case 'open_speaking':
      p.push(`<p><strong>Question :</strong> ${esc(it.question)} <em>(préparation ${it.prep_seconds ?? 0} s, réponse ${it.answer_seconds} s)</em></p>`);
      if (it.useful_language?.length) p.push(`<p><strong>Langue utile :</strong> ${it.useful_language.map(esc).join(' · ')}</p>`);
      if (it.criteria?.length) corr.push(`Critères : ${it.criteria.map(esc).join(' ; ')}`);
      if (it.model_answer) corr.push(`Réponse modèle : ${esc(it.model_answer)}`);
      break;
    case 'writing':
      p.push(`<p><strong>Sujet :</strong> ${inline(it.task)}</p><p><em>${esc(it.text_type || '')} — ${it.min_words} mots minimum${it.time_minutes ? `, ${it.time_minutes} minutes` : ''}</em></p>`);
      if (it.checklist?.length) p.push(`<ul>${it.checklist.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>`);
      if (it.criteria?.length) corr.push(`Critères : ${it.criteria.map(esc).join(' ; ')}`);
      if (it.model_answer) corr.push(`Production modèle :<br>${esc(it.model_answer).replace(/\n/g, '<br>')}`);
      break;
  }
  if (corr.length) p.push(`<div class="corrige"><p><strong>Corrigé</strong></p><p>${corr.join('<br>')}</p></div>`);
  return p.join('\n');
}

function vtestLessonHtml(l) {
  const p = [];
  if (l.objectives?.length) p.push(`<p><strong>Objectifs :</strong></p><ul>${l.objectives.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>`);
  p.push(`<p><em>Compétence ${esc(l.competency)} — niveau ${esc(l.level)} — ${l.minutes} min${l.mode === 'sync' ? ' — classe virtuelle' : ''}</em></p>`);
  p.push(md(l.explanation));
  if (l.key_language?.length) p.push(`<h4>Langue clé</h4><table><thead><tr><th>Anglais</th><th>Français</th><th>Usage</th></tr></thead><tbody>${l.key_language.map((k) => `<tr><td>${esc(k.en)}</td><td>${esc(k.fr)}</td><td>${esc(k.use)}</td></tr>`).join('')}</tbody></table>`);
  if (l.vocabulary?.length) p.push(`<h4>Vocabulaire</h4><table><thead><tr><th>Terme</th><th>Traduction</th><th>Exemple</th></tr></thead><tbody>${l.vocabulary.map((w) => `<tr><td>${esc(w.term)}</td><td>${esc(w.fr)}</td><td>${esc(w.example)}</td></tr>`).join('')}</tbody></table>`);
  if (l.video?.script?.length) p.push(`<h4>Dialogue : ${esc(l.video.title)}</h4>${l.video.setting ? `<p><em>${esc(l.video.setting)}</em></p>` : ''}<table><thead><tr><th>Personnage</th><th>Réplique</th><th>Traduction</th></tr></thead><tbody>${l.video.script.map((r) => `<tr><td><strong>${esc(r.speaker)}</strong></td><td>${esc(r.line)}</td><td>${esc(r.fr || '')}</td></tr>`).join('')}</tbody></table>`);
  if (l.sync_plan?.agenda?.length) p.push(`<h4>Déroulé de la classe virtuelle</h4><ol>${l.sync_plan.agenda.map((a) => `<li>${esc(a)}</li>`).join('')}</ol>`);
  if (l.items?.length) p.push(`<h4>Exercices corrigés</h4>`, ...l.items.map((it, i) => vtestItemHtml(it, i + 1)));
  return p.join('\n');
}

const VTEST_TITRES = { A2: 'Parcours A2 — 21 h', B1: 'Parcours B1 — 21 h', B2: 'Parcours B2 — 30 h', C1: 'Parcours C1 — 50 h' };
const VTEST_BESOINS = {
  A2: ["Situer son niveau d'anglais sur l'échelle du CECRL et viser le niveau A2 exigé pour valider le VTest.", "Se présenter et présenter son poste en phrases simples.", "Comprendre des consignes de travail, des annonces et des messages vocaux simples.", "Repérer l'information utile dans des messages, notes et affichages courts.", "Accueillir un visiteur et identifier sa demande en anglais.", "Téléphoner et prendre un message simple (noms, chiffres, horaires).", "Formuler une demande simple à un collègue ou à un service.", "Écrire un message ou un email court d'au moins 80 mots.", "Gagner en assurance à l'oral malgré un vocabulaire encore limité.", "Se familiariser avec le format des 4 épreuves du VTest."],
  B1: ["Situer son niveau d'anglais et viser le niveau B1 au VTest.", "Présenter son activité et son entreprise de façon structurée.", "Comprendre des conversations professionnelles courantes au téléphone et en réunion.", "Lire et exploiter des emails et documents professionnels.", "Participer à un point d'équipe et répondre à une objection simple.", "Traiter un message vocal pour un collègue absent.", "Rédiger des emails et comptes rendus de 150 mots.", "Gagner en fluidité et en précision grammaticale à l'oral.", "Enrichir son vocabulaire professionnel par secteur.", "S'entraîner aux épreuves du VTest en temps limité."],
  B2: ["Situer son niveau d'anglais et viser le niveau B2 au VTest.", "Présenter un projet et défendre une position face à des objections.", "Comprendre des échanges complexes à plusieurs interlocuteurs.", "Analyser des rapports et documents professionnels longs.", "Conduire une réunion de décision et une négociation.", "Rédiger un dossier de recommandation structuré de 200 mots et plus.", "Nuancer son discours et choisir un registre adapté.", "Prendre des notes efficaces pendant une réunion en anglais.", "Réduire les erreurs grammaticales récurrentes à l'écrit.", "S'entraîner aux 4 épreuves du VTest au niveau B2."],
  C1: ["Situer son niveau d'anglais et viser le niveau C1 au VTest.", "Adapter un message stratégique à plusieurs auditoires.", "Saisir les nuances, sous-entendus et prises de position dans un discours.", "Analyser de façon critique un dossier documentaire complexe.", "Argumenter et négocier en comité face aux objections les plus dures.", "Rédiger un rapport de recommandation et un document préparatoire à une revue.", "Animer une revue de projet et synthétiser une réunion à plusieurs voix.", "Maîtriser les registres formel et informel dans des échanges sensibles.", "Développer une argumentation orale de 2 minutes sans notes.", "S'entraîner aux épreuves du VTest au niveau C1."],
};

function buildVtest(level) {
  const dir = join(enSrc, level.toLowerCase());
  const programs = read(join(enSrc, 'programs.json')).programs;
  const prog = programs.find((p) => p.level === level);
  const modules = readdirSync(dir).filter((f) => /^m\d+\.json$/.test(f)).sort().map((f) => read(join(dir, f)));
  const lessons = modules.flatMap((m, mi) => m.lessons.map((l) => ({ ...l, mi })));
  const items = lessons.flatMap((l) => l.items.map((it) => ({ ...it, mi: l.mi })));
  const bank = read(join(enSrc, 'placement', 'bank.json')).items;

  // Positionnement : banque commune, 10 questions du niveau visé et des niveaux voisins.
  const lvlOrder = ['A2', 'B1', 'B2', 'C1'];
  const li = lvlOrder.indexOf(level);
  const near = (q) => Math.abs(lvlOrder.indexOf(q._lvl.slice(0, 2)) - li);
  const bankQ = bank.flatMap((it) => itemQcms(it)).filter((q) => q._first);
  const sortedBank = [...bankQ].sort((a, b) => near(a) - near(b));
  const byComp = (arr, c) => arr.filter((q) => q._c === c);
  const pickSpread = (arr, n, skip = new Set()) => { const r = []; let k = 0; const per = VTEST_COMPS.map((c) => byComp(arr, c.code).filter((q) => !skip.has(q.question))); while (r.length < n && per.some((x) => x.length)) { const x = per[k++ % 4]; if (x.length) r.push(x.shift()); } return r; };
  const qcmDebut = pickSpread(sortedBank, 10).map(strip).map(({ explication, ...q }) => q);
  const usedBank = new Set(qcmDebut.map((q) => q.question));

  // QCM par compétence : quiz de module et exercices des leçons, sans réemploi.
  const all = [...modules.flatMap((m, mi) => m.quiz.map((it) => ({ ...it, mi }))), ...items].flatMap((it) => itemQcms(it).map(withCtx));
  const quizLast = modules[modules.length - 1].quiz.flatMap((it) => itemQcms(it).map(withCtx));
  const qcmFin = pickSpread([...quizLast, ...sortedBank.filter((q) => !usedBank.has(q.question))], 10).map(strip).map(({ explication, ...q }) => q);
  const usedFin = new Set(qcmFin.map((q) => q.question));
  const { qcmCompetences } = allocate(VTEST_COMPS, (c) => all.filter((q) => q._c === c.code && !usedFin.has(q.question)).map(strip));

  // Productions corrigées (écrit et oral) : exercices, questions ouvertes, évaluations.
  const prod = (it) => it.type === 'writing'
    ? { titre: `${it.text_type ? it.text_type[0].toUpperCase() + it.text_type.slice(1) : 'Rédaction'} — ${it.code} (${it.level})`, consigne: `${plain(it.task)}\n${it.min_words} mots minimum${it.time_minutes ? `, en ${it.time_minutes} minutes` : ''}.${it.criteria?.length ? `\nCritères : ${it.criteria.join(' ; ')}.` : ''}`, reponseAttendue: clean(it.model_answer) }
    : { titre: `Expression orale — ${it.code} (${it.level})`, consigne: `${clean(it.question)}\nPréparation ${it.prep_seconds ?? 0} s, réponse orale de ${it.answer_seconds} s.${it.criteria?.length ? `\nCritères : ${it.criteria.join(' ; ')}.` : ''}`, reponseAttendue: clean(it.model_answer) };
  const prods = items.filter((it) => (it.type === 'writing' || it.type === 'open_speaking') && it.model_answer);
  const usedP = new Set();
  const take = (filter, n) => { const r = []; for (const it of prods) { if (r.length >= n) break; if (!usedP.has(it.code) && filter(it)) { usedP.add(it.code); r.push(it); } } return r; };
  const last = modules.length - 1;
  const alternate = (arr) => { const w = arr.filter((x) => x.type === 'writing'), s = arr.filter((x) => x.type !== 'writing'); const r = []; while (w.length || s.length) { if (s.length) r.push(s.shift()); if (w.length) r.push(w.shift()); } return r; };
  const comp = (it) => (it.type === 'listen_mcq' || it.type === 'read_mcq') && it.questions?.length;
  const qcmTxt = (it) => (it.questions || []).map((q, i) => `${i + 1}. ${q.q}\n${q.options.map((o, k) => `${'ABCD'[k]}. ${o}`).join('\n')}`).join('\n');
  const qcmCorr = (it) => (it.questions || []).map((q, i) => `${i + 1}. ${'ABCD'[q.answer]} — ${q.options[q.answer]}. ${q.explanation || ''}`).join('\n');
  const finItem = (it) => {
    if (it.type === 'listen_mcq') return { titre: `C1 — Compréhension orale (${it.level})`, consigne: `Écoutez l'enregistrement (transcription réservée au formateur : ${transcript(it.audio)}), puis répondez.\n${qcmTxt(it)}`, reponseAttendue: clean(qcmCorr(it)), points: 5 };
    if (it.type === 'read_mcq') return { titre: `C2 — Compréhension écrite (${it.level})`, consigne: `Lisez le document, puis répondez.\n${plain(it.text)}\n${qcmTxt(it)}`, reponseAttendue: clean(qcmCorr(it)), points: 5 };
    const p = prod(it); return { ...p, titre: `${it.type === 'writing' ? 'C4 — Expression écrite' : 'C3 — Expression orale'} (${it.level})`, points: 5 };
  };
  // Ordre de priorité : exercices (hors dernier module), évaluation finale, évaluation intermédiaire.
  const exercices = alternate(take((it) => it.mi < last, 10)).concat(take(() => true, 10)).slice(0, 10).map((it) => ({ ...prod(it), points: 10 }));
  const finale = [
    items.find((it) => it.mi === last && it.type === 'listen_mcq'),
    items.find((it) => it.mi === last && it.type === 'read_mcq'),
    ...['open_speaking', 'writing'].map((t) => take((it) => it.type === t, 1)[0] ?? [...prods].reverse().find((it) => it.type === t)),
  ].filter(Boolean);
  const finEx = finale.map(finItem);
  const usedC = new Set(finale.map((it) => it.code));
  const inter = take((it) => it.mi >= 1, 4);
  for (const it of items) { if (inter.length >= 4) break; if (comp(it) && it.mi >= 1 && it.mi < last && !usedC.has(it.code)) { usedC.add(it.code); inter.push(it); } }
  // Questions ouvertes : début = banque de positionnement, fin = productions et compréhension du parcours.
  const openOf = (it) => {
    if (it.type === 'open_speaking') return [{ question: clean(it.question), reponseAttendue: clean(it.model_answer) }];
    if (it.type === 'writing') return [{ question: plain(it.task), reponseAttendue: clean(it.model_answer) }];
    const ctx = it.type === 'read_mcq' ? `Document : « ${plain(it.text).replace(/\s*\n\s*/g, ' ')} »` : `Transcription de l'écoute : « ${transcript(it.audio)} »`;
    return (it.questions || []).map((q) => ({ question: `${ctx} — ${q.q}`, reponseAttendue: clean(`${q.options ? q.options[q.answer] : (q.accepted || []).join(' / ')}. ${q.explanation || ''}`) }));
  };
  const openPool = (arr) => [...arr.filter((it) => (it.type === 'open_speaking' || it.type === 'writing') && it.model_answer), ...arr.filter((it) => it.type === 'listen_constructed'), ...arr.filter(comp)].flatMap(openOf);
  const nearItems = [...bank].sort((a, b) => Math.abs(lvlOrder.indexOf(a.level.slice(0, 2)) - li) - Math.abs(lvlOrder.indexOf(b.level.slice(0, 2)) - li));
  const questionsOuvertesDebut = openPool(nearItems).slice(0, 10);
  const questionsOuvertesFin = openPool(items.filter((it) => it.mi >= Math.floor(last / 2))).filter((q) => !questionsOuvertesDebut.some((d) => d.question === q.question)).slice(0, 10);

  // Support de cours : un chapitre par leçon, puis le bilan corrigé de chaque module.
  const chapters = [];
  modules.forEach((m) => {
    m.lessons.forEach((l) => chapters.push({
      title: `${m.code} — ${l.title}`, description: (l.objectives || []).join(' '), imageQuery: `business English ${l.title}`,
      sections: [{ title: `${l.code} — ${l.title}`, contentHtml: vtestLessonHtml(l) }],
    }));
    const pa = m.practical_activity;
    chapters.push({
      title: `${m.code} — Bilan du module : ${m.title}`, description: clean(m.summary || ''), imageQuery: `business English ${m.title}`,
      sections: [
        { title: 'Quiz de validation du module (corrigé)', contentHtml: `<p>Seuil de réussite : ${m.pass_mark ?? 70} %.</p>${m.quiz.map((it, i) => vtestItemHtml(it, i + 1)).join('\n')}` },
        ...(pa ? [{ title: `Mise en situation : ${pa.title}`, contentHtml: `<p><em>Compétence ${esc(pa.competency)} — ${pa.minutes} min</em></p>${md(pa.brief)}<p><strong>Livrable :</strong> ${inline(pa.deliverable)}</p><p><strong>Critères d'évaluation :</strong></p><ul>${pa.criteria.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` }] : []),
      ],
    });
  });

  // Entraînement au format du test : la banque de positionnement (A2 à C1), corrigée, par compétence.
  chapters.push({
    title: 'Entraînement au format VTest — banque de positionnement corrigée (A2 à C1)', description: "Les 4 familles d'épreuves (écoute, lecture, oral, écrit) du niveau A2 au niveau C1, avec corrigés commentés, pour situer sa progression avant le passage du test.", imageQuery: 'online English test practice',
    sections: VTEST_COMPS.map((c) => ({ title: `${c.code} — ${c.texte.split(' afin')[0]}`, contentHtml: bank.filter((it) => it.competency === c.code).map((it, i) => vtestItemHtml(it, i + 1)).join(String.fromCharCode(10)) })),
  });
  const titre = `VTest Business English (RS6905) — ${VTEST_TITRES[level]}`;
  return {
    id: `vtest-${level.toLowerCase()}`, titre, heures: prog.hours, niveau: level,
    aliases: [`VTest Business English – 4 Skills (RS6905) — ${VTEST_TITRES[level]}`, `Anglais professionnel VTest — ${VTEST_TITRES[level]}`, `${VTEST_TITRES[level]} (VTest RS6905)`],
    programme: { ...prog, module_files: undefined, modules: modules.map((m) => ({ code: m.code, titre: m.title, heures: m.hours, competences: m.competencies, objectifs: m.objectives })) },
    competences: VTEST_COMPS.map((c) => `${c.code} — ${c.texte}.`),
    besoinsList: VTEST_BESOINS[level],
    syntheseHtml: `• Parcours ${level} (${prog.hours} h) préparant au VTest Business English – 4 Skills (RS6905, Répertoire spécifique, certificateur EXASSESS, enregistrement du 28/11/2024 au 28/11/2027) ; le test est passé en ligne sur la plateforme VTest, l'organisme assure la préparation.<br>• Les 4 compétences du référentiel sont travaillées : ${VTEST_COMPS.map((c) => `${c.code} — ${c.texte.split(' afin')[0]}`).join(' ; ')}.<br>• ${modules.length} modules (${lessons.length} leçons) : cours, langue clé, vocabulaire, dialogues, exercices auto-corrigés, studio oral et atelier d'écriture corrigés par le formateur, quiz de validation à 70 %.<br>• Le niveau A2 du CECRL est le minimum requis pour valider la certification : le test de positionnement d'entrée oriente vers le parcours adapté.`,
    adaptationsHtml: "• Niveau de départ fixé par le test de positionnement ; le parcours peut être complété par les leçons du niveau inférieur ou supérieur.<br>• Rythme libre en e-learning, réécoute des audios et reprise des exercices ; classes virtuelles pour l'oral.<br>• Transcriptions et traductions disponibles pour chaque dialogue.<br>• Situation de handicap : le référent handicap étudie les aménagements (police agrandie, contrastes, temps majorés en entraînement, sous-titres) ; les aménagements de l'examen officiel relèvent du certificateur.<br>• Les sujets d'expression orale et écrite peuvent être rapprochés du poste du stagiaire.",
    qcmDebut, qcmFin, qcmCompetences, questionsOuvertesDebut, questionsOuvertesFin, exercices,
    exerciceIntermediaire: { titre: 'Évaluation intermédiaire — 4 productions notées sur 20', contexte: `Évaluation à mi-parcours (modules ${modules[1].code} à ${modules[Math.max(2, last - 2)].code}) : productions orales et écrites corrigées par le formateur avec les critères de chaque sujet.`, questions: inter.map((it) => { const p = comp(it) ? finItem(it) : prod(it); return { question: `${p.titre} — ${p.consigne}`, reponseAttendue: p.reponseAttendue, points: 5 }; }) },
    evaluationFinale: { titre: `Évaluation finale interne — 4 épreuves (C1 à C4) notées sur 20, au format d'entraînement du VTest`, exercices: finEx, grille: VTEST_COMPS.map((c) => ({ critere: `${c.code} — ${c.texte.split(' afin')[0]} : informations exactes, compréhension ou production adaptée au niveau ${level}.`, points: 5 })) },
    sources: { veille: VEILLE_VTEST, ressources: { supportsHtml: `<p>• Support de cours du parcours ${level} : ${chapters.length} chapitres (leçons, langue clé, vocabulaire, dialogues traduits, exercices et quiz corrigés)<br>• Fichiers audio des dialogues et des écoutes, avec transcriptions<br>• Modèles de productions écrites et orales commentés</p>`, outilsHtml: '<p>• Plateforme e-learning (leçons, audio, studio oral, atelier d’écriture)<br>• Classe virtuelle (Google Meet ou Zoom)<br>• Plateforme officielle VTest pour le passage du test</p>', ressourcesComplHtml: '<p>• <strong>Fiche officielle :</strong> francecompetences.fr/recherche/rs/6905/<br>• <strong>CECRL :</strong> coe.int – Cadre européen commun de référence pour les langues<br>• <strong>Test :</strong> candidate.vtest.com</p>', videos: [] } },
    chapters,
  };
}

// ======================================================================
// Product Builder No-Code RNCP41480
// ======================================================================
const PBNC_BLOCS = [
  ['RNCP41480BC01', 'Concevoir un produit numérique reposant sur des outils no-code', [
    "Cadrer le besoin d'un commanditaire en identifiant les enjeux métiers et techniques, en structurant les échanges avec les parties prenantes concernées, et en formulant des préconisations formalisées et priorisées, afin de co-construire une note de cadrage stratégique validée par les décisionnaires du projet",
    "Conduire une recherche utilisateur en élaborant un protocole d'investigation quantitative et qualitative conforme à la réglementation sur la gestion des données, afin de recueillir les besoins des publics cibles et de formuler un problème à résoudre par le produit numérique reposant sur des outils no-code",
    "Réaliser une veille sur l'écosystème et les technologies no-code en définissant des sources pertinentes et en analysant les informations collectées, afin d'anticiper les usages émergents et de formuler des recommandations alignées avec l'état de l'art",
    "Structurer les parcours utilisateurs des publics cibles en modélisant, pour chaque persona, un user journey afin de projeter les interactions avec les fonctionnalités du produit numérique conçu avec des outils no-code",
    "Définir les objectifs d'un projet numérique en exploitant les résultats du cadrage et en intégrant les standards en matière d'accessibilité, de sécurité, de gestion des données et de numérique responsable, afin de valider avec le commanditaire le périmètre fonctionnel et technique du produit à concevoir avec des outils no-code",
    "Réaliser un benchmark d'outils no-code en construisant une grille d'analyse fondée sur des critères objectifs et opérationnels, afin d'identifier les solutions les plus adaptées aux besoins du commanditaire et des utilisateurs finaux",
    "Définir l'architecture logicielle d'un produit numérique en évaluant plusieurs scénarios d'implémentation, en argumentant les choix d'outils no-code et de connecteurs au regard des exigences fonctionnelles, techniques, économiques et réglementaires du projet, afin de proposer une stack technique adaptée au besoin à couvrir",
    "Rédiger les spécifications fonctionnelles et techniques d'un projet en décrivant les caractéristiques des fonctionnalités à créer et les modalités d'implémentation des outils no-code, afin d'en formaliser les conditions de réalisation",
    "Concevoir l'ergonomie des interfaces d'un produit numérique à l'aide d'outils no-code en réalisant des wireframes conformes aux standards d'ergonomie, d'utilisabilité, d'accessibilité et de référencement en vigueur, afin de matérialiser les parcours utilisateurs définis pour chaque persona",
    "Concevoir un dispositif de tests automatisés en élaborant, à partir des spécifications validées, des scénarios de test exploitant des outils no-code, afin de garantir la stabilité et le maintien en condition opérationnelle du produit numérique",
  ]],
  ['RNCP41480BC02', "Piloter la réalisation d'un produit numérique reposant sur des outils no-code", [
    "Déterminer les modalités agiles de pilotage d'un projet no-code en sélectionnant une méthode adaptée au contexte et en structurant les rituels, les outils de suivi et les indicateurs de performance, afin d'aligner les parties prenantes sur un cadre de gestion projet commun et d'assurer une progression mesurable",
    "Structurer le backlog de production d'un produit numérique en décomposant son périmètre fonctionnel et technique en features et en user stories priorisées, afin de planifier et d'organiser méthodiquement les tâches à réaliser avec des outils no-code",
    "Constituer une équipe projet pluridisciplinaire en identifiant les profils nécessaires au regard des objectifs du produit, en sélectionnant ou en recrutant les parties prenantes internes et/ou externes adaptées, et en favorisant la collaboration transversale, afin de garantir la complémentarité des expertises et la capacité collective à délivrer les livrables attendus",
    "Gérer la collaboration entre les parties prenantes d'un projet numérique reposant sur des outils no-code en instaurant un cadre de coopération aligné sur les objectifs du produit, en animant des points d'arbitrage fonctionnel et/ou technique, et en organisant la transparence des échanges, afin de garantir une progression fluide, consensuelle et conforme aux enjeux",
    "Communiquer sur l'avancement d'un projet numérique reposant sur des outils no-code en partageant, à un rythme adapté et au moyen de supports formalisés, les livrables produits par l'équipe mobilisée afin d'informer le commanditaire et les parties prenantes impliquées de l'avancement et des évolutions du projet",
  ]],
  ['RNCP41480BC03', 'Développer un produit numérique avec des outils no-code', [
    "Créer une base de données à l'aide d'outils no-code en structurant les tables et en implémentant les relations définies dans les spécifications techniques du projet, afin de stocker et de servir, dans le respect des standards de sécurité et de gestion des données, les données nécessaires au bon fonctionnement du produit numérique",
    "Interfacer un produit numérique avec une API tierce grâce à des outils no-code, en exploitant les opérations CRUD disponibles et en respectant les standards de sécurité et de gestion des données, afin de mettre en place les fonctionnalités attendues par le commanditaire",
    "Configurer l'automatisation d'un processus en définissant, avec des outils no-code, des règles d'exécution et des événements de déclenchement, afin d'assurer la réalisation autonome de tâches contribuant au bon fonctionnement du produit numérique",
    "Créer le prototype fonctionnel d'un produit numérique en configurant les outils no-code et les connecteurs de la stack technique validée, afin de proposer au commanditaire un démonstrateur testable centré sur les fonctionnalités critiques du projet",
    "Construire les interfaces d'un produit numérique avec des outils no-code, en configurant leurs composants visuels et les interactions, dans le respect des standards d'ergonomie, d'accessibilité, d'utilisabilité, de référencement et d'éco-conception en vigueur, afin de permettre aux utilisateurs finaux de réaliser leurs parcours depuis tout type de terminal",
    "Configurer les outils de la stack technique d'un produit numérique no-code en paramétrant les composants adaptés via les interfaces d'administration des outils no-code, dans le respect des spécifications validées et des bonnes pratiques d'accessibilité, de sécurité, de gestion des données et de performance environnementale, afin d'assurer la mise en œuvre des fonctionnalités attendues",
    "Sécuriser l'accès et les flux de données d'un produit numérique no-code en définissant une politique de sécurité conforme à la réglementation en vigueur, en configurant les rôles, les droits et les journaux d'accès, et en documentant les règles de circulation de données, afin d'anticiper les risques juridiques et techniques et d'assurer la conformité du système",
    "Réaliser la recette fonctionnelle et technique d'un produit numérique reposant sur des outils no-code en implémentant des scénarios de tests automatisés et en centralisant les anomalies éventuellement détectées dans un outil de gestion, afin de valider la stabilité du produit, corriger les dysfonctionnements et garantir son bon fonctionnement dans la durée",
    "Documenter le fonctionnement d'un produit numérique no-code en formalisant les choix et les modalités d'implémentation réalisés, dans le respect des règles de nommage et des conventions sémantiques en vigueur, à l'aide d'un outil collaboratif, afin d'en faciliter la maintenance et l'évolutivité",
  ]],
  ['RNCP41480BC04', "Déployer et faire évoluer un produit numérique réalisé à partir d'outils no-code", [
    "Concevoir une démarche de tests utilisateurs en structurant un protocole adapté aux personas et aux parcours définis, afin de recueillir des retours d'expérience quantitatifs et qualitatifs sur l'usage du produit numérique reposant sur des outils no-code",
    "Organiser la montée en compétences de publics cibles en structurant des parcours de formation et de mise en pratique, afin de leur permettre d'utiliser, de manière autonome et dans le respect des règles de droits définis, un produit numérique reposant sur des outils no-code",
    "Réaliser une démonstration du fonctionnement d'un produit numérique reposant sur du no-code en structurant une présentation adaptée aux besoins et aux usages des publics ciblés afin de faciliter sa prise en main et encourager son adoption",
    "Analyser les données quantitatives et qualitatives de trafic et d'usage d'un produit numérique reposant sur du no-code en configurant les fonctionnalités d'une console de monitoring spécialisée afin d'identifier des pistes d'amélioration continue",
    "Piloter l'amélioration continue d'un produit numérique reposant sur des outils no-code en structurant, à partir de l'analyse des retours utilisateurs, des données de performance et des incidents, un dispositif d'itérations priorisées, et en animant une gouvernance produit partagée, afin d'optimiser la valeur, la qualité et la durabilité de la solution livrée",
    "Structurer une architecture de serveurs adaptée aux besoins d'un produit numérique reposant sur des outils no-code en dimensionnant les ressources nécessaires et configurant les produits et les services requis, dans le respect des standards de sécurité et de gestion des données en vigueur, afin de proposer un hébergement souverain",
    "Livrer un produit numérique reposant sur des outils no-code sur un serveur autogéré en transférant son code source et sa base de données via des scripts, afin de permettre son utilisation par les utilisateurs finaux à partir de leurs terminaux de consultation",
    "Accompagner les parties prenantes d'un projet no-code dans une démarche de réversibilité en structurant un plan de transfert incluant la documentation stratégique, les dépendances critiques et les scénarios de redéveloppement, afin de garantir la continuité fonctionnelle, la maintenabilité et la souveraineté des données",
  ]],
];
const PBNC_COURT = ['Concevoir', 'Piloter', 'Développer', 'Déployer'];

/** Découpe un énoncé-corrigé d'exercice (markdown) en situation, questions + corrigés et critères. */
function parseExercise(lesson) {
  const key = lesson.items[0].key; const ma = clean(key.model_answer || key.trainer_notes || '');
  const sit = ma.split('### Mise en situation et documents')[1]?.split('### Questions et corrigé')[0]?.trim() ?? '';
  const body = ma.split('### Questions et corrigé')[1] ?? '';
  const [qpart, crit = ''] = body.split("### Critères d'évaluation");
  const questions = qpart.split(/^### Question\s+/m).slice(1).map((blk) => {
    const head = blk.split('\n')[0]; const pts = Number((head.match(/\(([\d,]+)\s*pts?\)/) || [])[1]?.replace(',', '.') || 0);
    const [q, ...c] = blk.split(/^### Corrigé\s*$/m);
    return { num: head.match(/^\d+/)?.[0], pts, question: q.split('\n').slice(1).join('\n').trim(), corrige: c.join('\n').trim() };
  });
  return { code: lesson.code, titre: clean(lesson.title).replace(/^Exercice\s+/, ''), situation: sit, questions, criteres: crit.trim() };
}
const exConsigne = (e, qs = e.questions) => `${plain(e.situation)}\n\nQuestions :\n${qs.map((q) => `Question ${q.num}${q.pts ? ` (${String(q.pts).replace('.', ',')} pts)` : ''} — ${plain(q.question)}`).join('\n\n')}`;
const exCorrige = (qs) => qs.map((q) => `Question ${q.num} — ${plain(q.corrige)}`).join('\n\n');
const exHtml = (e) => `${md(e.situation)}\n${e.questions.map((q) => `<h4>Question ${q.num}${q.pts ? ` (${String(q.pts).replace('.', ',')} pts)` : ''}</h4>${md(q.question)}<div class="corrige"><p><strong>Corrigé</strong></p>${md(q.corrige)}</div>`).join('\n')}${e.criteres ? `<h4>Critères d'évaluation</h4>${md(e.criteres)}` : ''}`;
const premierParagraphe = (e) => plain(e.situation).split(/\n\n/)[0];

function pbncData() {
  const payload = read(join(pbSrc, 'payload.json'));
  const q = {}; for (const b of [1, 2, 3, 4]) Object.assign(q, read(join(pbSrc, 'qcm', `B${b}.json`)));
  const modules = payload.modules.filter((m) => /^B\dM\d$/.test(m.code));
  const pos = payload.modules[0].lessons[0].items;
  const comps = PBNC_BLOCS.flatMap(([code, , cs], b) => cs.map((t, i) => ({ code: `BC0${b + 1}-C${i + 1}`, bloc: b + 1, n: i + 1, texte: t })));
  const mods = modules.map((m) => {
    const lessons = m.lessons;
    const exL = lessons.find((l) => /^B\d-E\d$/.test(l.code));
    const ex = parseExercise(exL);
    const cs = [...(exL.explanation.match(/compétences travaillées\s*:([^\n]*)/)?.[1] ?? '').matchAll(/C(\d+)\s*[–-]/g)].map((x) => Number(x[1]));
    const vids = lessons.filter((l) => /^B\dM\dV\d$/.test(l.code));
    const mq = (q[m.code]?.quiz || []).map((x) => qcm(x.q, x.options, x.answer, x.explanation));
    const vq = vids.flatMap((l) => (q[l.code]?.questions || []).map((x) => qcm(`Situation : ${q[l.code].case} — ${x.q}`, x.options, x.answer, x.explanation)));
    return { code: m.code, bloc: Number(m.code[1]), num: Number(m.code[3]), titre: clean(m.title), heures: m.hours, objectifs: m.objectives, cs, ex, vids, cvs: lessons.filter((l) => /CV\d$/.test(l.code)), mq, vq, pa: m.practical_activity };
  });
  const evals = Object.fromEntries(payload.modules.flatMap((m) => m.lessons).filter((l) => /^B\d-EVAL$/.test(l.code)).map((l) => [Number(l.code[1]), parseExercise(l)]));
  const posQ = pos.map((it) => it.content.questions.map((x, i) => qcm(x.q, x.options, it.key.questions[i].answer)));
  return { payload, modules: mods, comps, evals, posQ };
}

function videoHtml(l, quiz) {
  const p = [];
  if (l.objectives?.length) p.push(`<p><strong>Objectifs :</strong></p><ul>${l.objectives.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>`);
  p.push(md(l.explanation));
  if (quiz?.questions?.length) {
    p.push(`<h4>Quiz d'autoévaluation (corrigé)</h4><p><em>Situation : ${esc(clean(quiz.case))}</em></p>`);
    quiz.questions.forEach((x, i) => p.push(`<p>${i + 1}. ${esc(clean(x.q))}<br>${x.options.map((o, k) => `${'ABCD'[k]}. ${esc(clean(o))}`).join('<br>')}</p><div class="corrige"><p><strong>Corrigé :</strong> ${'ABCD'[x.answer]} — ${esc(clean(x.explanation))}</p></div>`));
  }
  return p.join('\n');
}
function moduleSections(m, qAll) {
  const quiz = qAll[m.code]?.quiz || [];
  return [
    ...m.vids.map((l) => ({ title: clean(l.title), contentHtml: videoHtml(l, qAll[l.code]) })),
    { title: 'Classes virtuelles du module', contentHtml: m.cvs.map((l) => `<h4>${esc(clean(l.title))}</h4><ol>${(l.sync_plan?.agenda || []).map((a) => `<li>${esc(clean(a))}</li>`).join('')}</ol>`).join('\n') },
    { title: 'Quiz de validation du module (corrigé)', contentHtml: `<p>Seuil de réussite : 70 %.</p>${quiz.map((x, i) => `<p>${i + 1}. ${esc(clean(x.q))}<br>${x.options.map((o, k) => `${'ABCD'[k]}. ${esc(clean(o))}`).join('<br>')}</p><div class="corrige"><p><strong>Corrigé :</strong> ${'ABCD'[x.answer]} — ${esc(clean(x.explanation))}</p></div>`).join('\n')}` },
    { title: `Cas pratique corrigé — ${m.ex.titre}`, contentHtml: exHtml(m.ex) },
  ];
}

const PBNC_BESOINS = [
  "Comprendre le métier de Product Builder no-code et les attendus du titre RNCP41480 (niveau 6).",
  "Cadrer la demande d'un commanditaire et formaliser une note de cadrage.",
  "Conduire une recherche utilisateur conforme au RGPD et en tirer des personas et des parcours.",
  "Comparer des outils no-code avec une grille objective et justifier une stack technique.",
  "Rédiger des spécifications fonctionnelles et techniques exploitables.",
  "Piloter un projet no-code en mode agile : backlog, sprints, indicateurs et communication.",
  "Construire une base de données relationnelle, des automatisations et des intégrations d'API sans code.",
  "Concevoir des interfaces accessibles (RGAA) et sécuriser les accès et les flux de données.",
  "Recetter, documenter, déployer et accompagner les utilisateurs d'un produit numérique.",
  "Préparer le dossier professionnel et la soutenance orale devant le jury de certification.",
];
const PBNC_BESOINS_BLOC = [
  ["Cadrer la demande d'un commanditaire et formaliser une note de cadrage.", "Conduire une recherche utilisateur conforme au RGPD.", "Construire des personas et des parcours utilisateurs.", "Fixer des objectifs SMART et un périmètre MVP.", "Organiser une veille sur l'écosystème no-code.", "Comparer des outils no-code avec une grille objective.", "Définir et justifier l'architecture d'une solution no-code.", "Concevoir des wireframes accessibles et conformes au RGAA.", "Rédiger des spécifications fonctionnelles et techniques.", "Préparer le dossier professionnel et la soutenance du bloc 1."],
  ["Choisir un cadre agile adapté au projet et à l'équipe.", "Définir les rôles, la roadmap et une matrice RACI.", "Construire un product backlog en épics et user stories INVEST.", "Rédiger des critères d'acceptation (Gherkin) et une Definition of Done.", "Prioriser et estimer le backlog.", "Coordonner des parties prenantes et animer les rituels.", "Suivre l'avancement : vélocité, burndown, burnup.", "Gérer les risques, le budget et les demandes de changement.", "Préparer un comité de pilotage et ses supports.", "Préparer le dossier professionnel et la soutenance du bloc 2."],
  ["Structurer une base de données relationnelle no-code.", "Configurer l'environnement technique et les outils de la stack.", "Automatiser un processus métier et fiabiliser un scénario.", "Interfacer le produit avec une API tierce (opérations CRUD).", "Construire des interfaces accessibles et responsives.", "Réaliser un prototype fonctionnel démontrable.", "Sécuriser les droits d'accès, les secrets et les flux de données.", "Recetter le produit et suivre les anomalies.", "Documenter le produit pour la maintenance.", "Préparer la réalisation et la soutenance du bloc 3."],
  ["Préparer le déploiement et la bascule vers le nouveau produit.", "Concevoir et analyser des tests utilisateurs.", "Prononcer la recette à partir de critères objectifs.", "Organiser la formation et la prise en main par les utilisateurs.", "Réaliser une démonstration adaptée au public.", "Configurer une console de monitoring et analyser l'usage.", "Gérer incidents, maintenance et engagements de service.", "Piloter l'amélioration continue du produit.", "Dimensionner un hébergement souverain et livrer sur un serveur autogéré.", "Organiser la réversibilité et clôturer le projet."],
];

function buildPbnc(D, bloc /* 0 = titre complet */) {
  const qAll = {}; for (const b of [1, 2, 3, 4]) Object.assign(qAll, read(join(pbSrc, 'qcm', `B${b}.json`)));
  const mods = D.modules.filter((m) => !bloc || m.bloc === bloc);
  const comps = D.comps.filter((c) => !bloc || c.bloc === bloc);
  // Positionnement (40 questions, 10 par bloc) : début ; fin = quiz de module réservés.
  const qcmDebut = bloc ? D.posQ[bloc - 1].slice(0, 10) : D.posQ.flatMap((qs, b) => qs.filter((_, i) => i % 4 === (b % 2)).slice(0, b < 2 ? 3 : 2));
  const finPick = bloc ? mods.flatMap((m) => m.mq.slice(-2)) : mods.filter((m) => [1, 3, 5].includes(m.num)).flatMap((m, i) => m.mq.slice(-1 - (i % 2 === 0 && i < 4 ? 1 : 0)).slice(-1)).slice(0, 10);
  const qcmFin = finPick.slice(0, 10).map(({ explication, ...x }) => x);
  const reserved = new Set(qcmFin.map((x) => x.question));
  const { qcmCompetences } = allocate(comps, (c) => mods.filter((m) => m.bloc === c.bloc && m.cs.includes(c.n)).flatMap((m) => [...m.mq, ...m.vq]).filter((x) => !reserved.has(x.question)));

  // Exercices : titre complet = 10 cas pratiques entiers ; bloc = chaque cas en 2 parties.
  let exercices;
  if (!bloc) {
    const sel = ['B1-E1', 'B1-E3', 'B1-E5', 'B2-E2', 'B2-E4', 'B3-E1', 'B3-E3', 'B3-E5', 'B4-E2', 'B4-E4'];
    exercices = sel.map((code) => D.modules.find((m) => m.ex.code === code).ex).map((e) => ({ titre: e.titre, consigne: exConsigne(e), reponseAttendue: exCorrige(e.questions), points: 10 }));
  } else {
    exercices = mods.flatMap((m) => { const qs = m.ex.questions; const h = Math.ceil(qs.length / 2); return [qs.slice(0, h), qs.slice(h)].filter((x) => x.length).map((part, i) => ({ titre: `${m.ex.titre} — partie ${i + 1}`, consigne: exConsigne(m.ex, part), reponseAttendue: exCorrige(part), points: 10 })); }).slice(0, 10);
  }
  // Questions ouvertes : questions des cas pratiques avec le contexte du cas.
  const oq = (ms) => ms.flatMap((m) => m.ex.questions.filter((x) => !/document\s*\d/i.test(x.question)).map((x) => ({ question: `Cas « ${m.ex.titre} » — ${premierParagraphe(m.ex)}\n${plain(x.question)}`, reponseAttendue: plain(x.corrige) })));
  const half = Math.ceil(mods.length / 2);
  const fillTo = (arr, more) => arr.concat(more.filter((x) => !arr.some((y) => y.question === x.question))).slice(0, 10);
  const all = oq(mods);
  const questionsOuvertesDebut = fillTo(oq(mods.slice(0, half)), all);
  const questionsOuvertesFin = fillTo(oq(mods.slice(half)), [...all].reverse());

  const ev = (e, pts) => ({ titre: e.titre, consigne: exConsigne(e), reponseAttendue: exCorrige(e.questions), points: pts });
  const interE = bloc ? mods[2].ex : D.evals[2];
  const exerciceIntermediaire = { titre: `Évaluation intermédiaire — ${interE.titre}`, contexte: plain(interE.situation), questions: interE.questions.map((x) => ({ question: plain(x.question), reponseAttendue: plain(x.corrige), points: x.pts || 4 })) };
  const finales = bloc ? [D.evals[bloc]] : [D.evals[1], D.evals[3], D.evals[4]];
  const evaluationFinale = {
    titre: bloc ? `Évaluation de synthèse du bloc ${bloc} — mise en situation notée sur 20, préparatoire à l'épreuve de certification (dossier puis soutenance orale)` : 'Évaluation finale interne — 3 mises en situation de synthèse (blocs 1, 3 et 4 ; le bloc 2 est évalué à mi-parcours), note sur 20',
    exercices: bloc ? finales[0].questions.map((x) => ({ titre: `${finales[0].titre} — question ${x.num}`, consigne: `${premierParagraphe(finales[0])}\n${plain(x.question)}`, reponseAttendue: plain(x.corrige), points: x.pts || 4 })) : finales.map((e, i) => ev(e, [7, 7, 6][i])),
    grille: (bloc ? [PBNC_BLOCS[bloc - 1]] : PBNC_BLOCS).map(([code, lib], i, arr) => ({ critere: `${code} — ${lib} : livrables conformes aux compétences du bloc, choix justifiés à partir des données du cas, respect des standards (accessibilité, sécurité, données, numérique responsable).`, points: 20 / arr.length })),
  };

  // Support de cours : titre complet = un chapitre par module ; bloc = un chapitre par capsule + la mise en pratique de chaque module.
  const chapters = bloc
    ? mods.flatMap((m) => [
      ...m.vids.map((l) => ({ title: `${m.titre.replace(/^Bloc \d · /, '')} — ${clean(l.title)}`, description: (l.objectives || []).join(' '), imageQuery: `no-code product ${clean(l.title)}`, sections: [{ title: clean(l.title), contentHtml: videoHtml(l, qAll[l.code]) }] })),
      { title: `${m.titre.replace(/^Bloc \d · /, '')} — Mise en pratique`, description: `Classes virtuelles, quiz de validation et cas pratique corrigé du module.`, imageQuery: 'no-code project workshop', sections: moduleSections(m, qAll).slice(-3) },
    ])
    : mods.map((m) => ({ title: m.titre, description: m.objectifs.join(' ; ') + '.', imageQuery: `no-code ${m.titre.split('—')[1] || m.titre}`, sections: moduleSections(m, qAll) }));

  const [bc, blib] = bloc ? PBNC_BLOCS[bloc - 1] : [];
  const prog = D.payload.programs[bloc];
  return {
    id: bloc ? `pbnc-bc0${bloc}` : 'pbnc-420',
    titre: bloc ? `Product Builder No-Code (RNCP41480) — Bloc ${bloc} : ${PBNC_COURT[bloc - 1]} (105 h)` : 'Product Builder No-Code (RNCP41480) — titre complet (420 h)',
    aliases: bloc ? [clean(prog.title), `${bc} – ${blib}`, `RNCP41480 – Bloc ${bloc} : ${blib}`] : [clean(prog.title), 'Product builder no-code', 'Product Builder No-Code', 'RNCP41480 – Product builder no-code', 'Product builder no-code (RNCP41480)'],
    heures: prog.hours, sync: prog.sync_hours, async: prog.async_hours, bloc,
    modules: mods.map((m) => ({ code: m.code, titre: m.titre, heures: m.heures, competences: m.cs.map((n) => `BC0${m.bloc}-C${n}`) })),
    competences: comps.map((c) => `${c.code} — ${c.texte}.`),
    besoinsList: bloc ? PBNC_BESOINS_BLOC[bloc - 1] : PBNC_BESOINS,
    syntheseHtml: `• ${bloc ? `Bloc ${bc} « ${blib} » du titre` : 'Formation préparant au titre'} RNCP41480 – Product builder no-code (niveau 6, certificateur CONSULTING SCHOOL, enregistré du 27/10/2025 au 27/10/2028). L'organisme doit être habilité par le certificateur à préparer et, le cas échéant, à organiser l'évaluation.<br>• ${comps.length} compétences du référentiel officiel, travaillées sur le cas fil rouge fictif « Le Panier Compiégnois » (association de producteurs locaux et son application de click & collect).<br>• ${mods.length} modules de 21 h : 14 h de classes virtuelles et 7 h en ligne (7 capsules vidéo avec quiz, lectures guidées, cas pratique corrigé), quiz de validation à 70 %, évaluation de synthèse notée sur 20 par bloc.<br>• Certification : mise en situation professionnelle par bloc (dossier professionnel ou produit réalisé, puis soutenance orale synchrone devant un jury) ; chaque bloc peut être validé séparément.<br>• Accès : certification de niveau 5 ou Bac+2, ou certification de niveau inférieur dans le domaine et 2 ans d'expérience dans un métier du numérique ; aucun prérequis en programmation.`,
    adaptationsHtml: "• Positionnement d'entrée par bloc : allègement ou renforcement des modules selon l'expérience (gestion de projet, outils no-code déjà pratiqués).<br>• Cas pratiques transposables au projet professionnel ou à l'entreprise du stagiaire.<br>• Capsules sous-titrées et transcriptions ; revisionnage illimité.<br>• Situation de handicap : le référent handicap étudie les aménagements (supports adaptés, horaires et pauses, temps majoré aux évaluations) ; les aménagements des épreuves de certification sont demandés au certificateur.<br>• Rendez-vous individuels de suivi et retour écrit sur chaque cas pratique déposé.",
    qcmDebut, qcmFin, qcmCompetences, questionsOuvertesDebut, questionsOuvertesFin, exercices, exerciceIntermediaire, evaluationFinale,
    sources: { veille: VEILLE_PBNC, ressources: { supportsHtml: `<p>• Support de cours : ${chapters.length} chapitres (capsules rédigées, quiz d'autoévaluation et de validation corrigés, cas pratiques corrigés)<br>• Énoncés des cas pratiques et des évaluations de synthèse<br>• Modèles de livrables : note de cadrage, personas, backlog, spécifications, plan de recette, plan de réversibilité</p>`, outilsHtml: '<p>• Outils no-code : Airtable, Softr, Make, Stripe, Brevo<br>• Outils de conception et de pilotage : wireframes, tableau Kanban, outil de suivi des anomalies<br>• Classe virtuelle (Google Meet ou Zoom) et plateforme e-learning</p>', ressourcesComplHtml: '<p>• <strong>Fiche officielle :</strong> francecompetences.fr/recherche/rncp/41480/<br>• <strong>Accessibilité :</strong> accessibilite.numerique.gouv.fr (RGAA)<br>• <strong>Données personnelles :</strong> cnil.fr<br>• <strong>Écoconception :</strong> ecoresponsable.numerique.gouv.fr (RGESN)</p>', videos: [] } },
    chapters,
  };
}

// ---------- Écriture ----------
const report = [];
function write(p) {
  const { chapters, ...rest } = p;
  const s = JSON.stringify(p);
  const hits = s.match(new RegExp(ORG.source, 'g'));
  if (hits) throw new Error(`${p.id} : mention d'organisme restante (${[...new Set(hits)].join(', ')})`);
  writeFileSync(join(out, `${p.id}.json`), JSON.stringify(rest, null, 1) + '\n');
  // Les blocs PBNC réutilisent les chapitres du titre complet (découpés dans builtinOrienta.ts).
  if (!/^pbnc-bc/.test(p.id)) writeFileSync(join(out, `${p.id}.chapters.json`), JSON.stringify(chapters) + '\n');
  const html = chapters.flatMap((c) => c.sections.map((x) => x.contentHtml)).join('');
  const bad = (qs) => qs.filter((q) => q.options.length !== 4 || q.correctIndex < 0 || q.correctIndex > 3).length;
  const pos = (qs) => [0, 1, 2, 3].map((k) => qs.filter((q) => q.correctIndex === k).length).join('/');
  const allQ = [...p.qcmDebut, ...p.qcmFin, ...p.qcmCompetences.flatMap((c) => c.questions)];
  report.push({ id: p.id, h: p.heures, chap: chapters.length, html: html.length, debut: p.qcmDebut.length, fin: p.qcmFin.length, comp: p.qcmCompetences.map((c) => c.questions.length).join(','), bad: bad(allQ), pos: pos(allQ), ex: p.exercices.length, qo: `${p.questionsOuvertesDebut.length}/${p.questionsOuvertesFin.length}`, inter: p.exerciceIntermediaire.questions.length, fin_: p.evaluationFinale.exercices.length });
}
for (const lv of ['A2', 'B1', 'B2', 'C1']) write(buildVtest(lv));
const D = pbncData();
for (const b of [0, 1, 2, 3, 4]) write(buildPbnc(D, b));
console.table(report);
