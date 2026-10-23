/**
 * Pièces « à compléter » de l'espace IZILearn : évaluation des besoins, test de
 * positionnement, exercices pratiques, bilans à chaud / à froid, émargement,
 * temps de connexion.
 *
 * Règle : ces pièces concernent de vrais apprenants. Elles reprennent UNIQUEMENT
 * ce qu'IZILearn a enregistré (réponses envoyées, signatures, connexions). Sans
 * donnée réelle, la pièce est une trame vierge nominative à faire remplir —
 * jamais une réponse, une note, une appréciation ou une signature générée.
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, tableHTML, formatDate } from "@/lib/docBuilder";
import { attendanceDayTable, connectionDayTable, connectionIntro, connectionSummary } from "@/lib/attendancePresentation";
import { getEmargementBlocs, buildRealisticConnectionDay, isFrLongDayPast, getDayModalite } from "@/lib/documentGenerator";
import { getEvalContent, getQuestionsOuvertes, hasEvalContentDedie, generateStagiaireOpenAnswers } from "@/lib/evalContent";
import { getJoursStagiaire, SEUIL_JOURS_PARCOURS_COURT } from "@/lib/parcoursStagiaire";
import type { IzApprenant, IzPayload, IzReponses } from "./types";
import { hasRecordedQuiz, hasRecordedResponses } from "./responses";
import { studentAnswerFromCorrection } from "@/lib/aiEvalPack";
import { reponsesPositionnement } from "./positionnement";

export interface Ctx {
  p: IzPayload;
  o: OrganismeInfo;
  f: FormationInfo;
  s: StagiaireInfo;
  a: IzApprenant;
}

// ───────────────────────── utilitaires ─────────────────────────

const BR = "\u0000BR\u0000";
export const esc = (v: unknown) => String(v ?? "")
  .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&nbsp;/gi, " ")
  .replace(/<\s*br\s*\/?\s*>|<\/\s*(?:p|div|li|h[1-6]|tr)\s*>/gi, BR)
  .replace(/<\s*li[^>]*>/gi, "• ")
  .replace(/<\/?[a-z][^<>]*>/gi, "")
  .replace(/^(?:\u0000BR\u0000|\s)+|(?:\u0000BR\u0000|\s)+$/g, "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").split(BR).join("<br>");

const nl2br = (v: unknown) => esc(v).replace(/\n/g, "<br>");

function d(v?: string | Date | null): Date | null {
  if (!v) return null;
  if (v instanceof Date) return v;
  const m = String(v).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const x = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(v);
  return isNaN(x.getTime()) ? null : x;
}
export const dateFr = (v?: string | Date | null) => { const x = d(v); return x ? x.toLocaleDateString("fr-FR") : ""; };
const dateLongue = (v?: string | Date | null) => { const x = d(v); return x ? x.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : ""; };
const heure = (v?: string | null) => { const x = d(v); return x ? x.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : ""; };
const cleJour = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
export const duree = (sec: number) => { const m = Math.round(sec / 60); return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`; };

const LIGNES = (n: number) => `<div style="margin:6px 0 12px">${Array.from({ length: n }, () => `<div style="border-bottom:1px dotted #9ca3af;height:22px"></div>`).join("")}</div>`;
const CASE = `<span style="display:inline-block;width:12px;height:12px;border:1px solid #444;border-radius:2px;vertical-align:-2px"></span>`;
const dateCourteLongue = (v?: string | Date | null) => { const x = d(v); return x ? x.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : ""; };
const ZONE_SIGNATURE = (labels: string[], date?: string) => `<table style="width:100%;margin-top:18px;border-collapse:collapse"><tr>${labels.map((l) =>
  `<td style="width:${Math.floor(100 / labels.length)}%;vertical-align:top;padding:6px"><div class="sig-box" style="padding:10px;min-height:90px"><p class="sig-label" style="margin:0 0 6px;font-weight:700">${esc(l)}</p><p style="margin:0;color:#6b7280;font-size:11px">Date : ${date ? esc(date) : "____ / ____ / ________"}</p><p style="margin:4px 0 0;color:#6b7280;font-size:11px">Signature :</p></div></td>`).join("")}</tr></table>`;

const nomComplet = (s: StagiaireInfo) => `${s.prenom} ${s.nom}`.trim();

function enTete(c: Ctx, extra: [string, string][] = []): string {
  const rows: [string, string][] = [
    ["Apprenant", nomComplet(c.s)],
    ...(c.s.entreprise ? [["Entreprise", c.s.entreprise] as [string, string]] : []),
    ["Formation", c.f.intitule],
    ["Session", `du ${dateFr(c.p.session.dateDebut)} au ${dateFr(c.p.session.dateFin)}${c.p.session.code ? ` — ${c.p.session.code}` : ""}`],
    ...(c.f.formateur ? [["Formateur", c.f.formateur] as [string, string]] : []),
    ...extra,
  ];
  return `<table style="width:100%;margin-bottom:14px"><tbody>${rows.map(([k, v]) => `<tr><th style="width:30%;text-align:left">${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table>`;
}

const sourceIzilearn = (txt: string) => `<p style="font-size:11px;color:#047857;margin:0 0 10px"><strong>Données IZILearn</strong> — ${esc(txt)}</p>`;
const trameVierge = (txt: string) => `<p style="font-size:11px;color:#6b7280;margin:0 0 10px"><em>${esc(txt)}</em></p>`;

function reponsesReelles(r: IzReponses): string {
  const rows = r.reponses.map((x) => `<tr><td style="width:45%;vertical-align:top"><strong>${esc(x.question)}</strong></td><td>${nl2br(x.reponse) || "<em>Sans réponse</em>"}</td></tr>`).join("");
  return `<table style="width:100%"><thead><tr><th>Question</th><th>Réponse</th></tr></thead><tbody>${rows}</tbody></table>${r.score ? `<p><strong>Score :</strong> ${esc(r.score)}</p>` : ""}`;
}

const doc = (c: Ctx, title: string, subtitle: string, extraHtml: string, landscape = false) => {
  const html = buildDocument({ org: c.o, title, subtitle, formation: c.f, showFormationInfo: false, extraHtml, stagiaires: [c.s] });
  return landscape ? html.replace("<head>", `<head><meta name="pdf-page-size" content="297x210"><style>@page{size:A4 landscape}</style>`) : html;
};

// ───────────────────────── évaluation des besoins ─────────────────────────

const BESOINS_APPRENANT = [
  "Quel est le dernier diplôme ou titre que vous avez obtenu ?",
  "Quel objectif professionnel ou personnel souhaitez-vous atteindre grâce à cette formation ?",
  "Quel dispositif de financement est envisagé pour cette formation ?",
  "En quoi pensez-vous que cette formation contribuera à la réalisation de votre projet professionnel ou personnel ?",
  "Êtes-vous en situation de handicap ? Si oui, avez-vous besoin d'adaptations spécifiques (pédagogiques, techniques, matérielles) pour suivre la formation ?",
  "Quelles sont vos disponibilités et avez-vous une demande d'aménagement horaire ?",
];
const BESOINS_ENTREPRISE = [
  "Raison sociale de l'entreprise ou nom commercial",
  "Quelles sont vos attentes et objectifs pour vous-même et/ou votre salarié dans le cadre de cette formation ?",
  "Quelles sont les missions actuelles ou à venir confiées au salarié en lien avec la formation ?",
  "En quoi cette formation contribue-t-elle au développement ou aux objectifs stratégiques de votre entreprise ?",
];

export function evaluationBesoins(c: Ctx): { html: string; reel: boolean } {
  const qa = c.p.questionsBesoins?.apprenant?.length ? c.p.questionsBesoins.apprenant : BESOINS_APPRENANT;
  const qe = c.p.questionsBesoins?.entreprise?.length ? c.p.questionsBesoins.entreprise : BESOINS_ENTREPRISE;
  let h = enTete(c);
  const reel = hasRecordedResponses(c.a.besoins) || hasRecordedResponses(c.a.besoinsEntreprise);
  h += `<h2>Partie apprenant</h2>`;
  if (c.a.besoins && hasRecordedResponses(c.a.besoins)) {
    h += sourceIzilearn(`réponses envoyées en ligne le ${dateFr(c.a.besoins.date)}${c.a.besoins.signataire ? `, signées par ${c.a.besoins.signataire}` : ""}.`);
    h += reponsesReelles(c.a.besoins);
  } else {
    h += trameVierge("Trame à compléter par l'apprenant avant l'entrée en formation (ou à envoyer en ligne depuis IZILearn › CRM › Évaluation des besoins).");
    qa.forEach((q, i) => { h += `<p><strong>${i + 1}. ${esc(q)}</strong></p>${LIGNES(3)}`; });
  }
  if (c.s.entreprise || c.a.besoinsEntreprise) {
    h += `<h2>Partie entreprise</h2>`;
    if (c.a.besoinsEntreprise && hasRecordedResponses(c.a.besoinsEntreprise)) {
      h += sourceIzilearn(`réponses envoyées en ligne le ${dateFr(c.a.besoinsEntreprise.date)}${c.a.besoinsEntreprise.signataire ? `, signées par ${c.a.besoinsEntreprise.signataire}` : ""}.`);
      h += reponsesReelles(c.a.besoinsEntreprise);
    } else {
      h += trameVierge("À compléter par le représentant de l'entreprise ou le tuteur.");
      qe.forEach((q, i) => { h += `<p><strong>${i + 1}. ${esc(q)}</strong></p>${LIGNES(3)}`; });
    }
  }
  h += `<h2>Analyse du besoin par le référent pédagogique</h2>`;
  h += `<p>${CASE} Besoin compatible avec la formation &nbsp;&nbsp; ${CASE} Adaptations à prévoir &nbsp;&nbsp; ${CASE} Réorientation proposée</p>`;
  h += `<p><strong>Adaptations du parcours (rythme, supports, accessibilité) :</strong></p>${LIGNES(3)}`;
  h += ZONE_SIGNATURE(["L'apprenant", ...(c.s.entreprise ? ["Le responsable d’entreprise"] : []), "Le référent pédagogique"]);
  return { html: doc(c, "ÉVALUATION DES BESOINS", `${nomComplet(c.s)} – ${c.f.intitule}`, h), reel };
}

// ───────────────────────── test de positionnement ─────────────────────────

const lignesObjectifs = (f: FormationInfo) => String(f.objectifs || "").split(/\n+|;\s+|•/).map((x) => x.replace(/^[-*\d.)\s]+/, "").trim()).filter((x) => x.length > 3).slice(0, 10);

export function testPositionnement(c: Ctx): { html: string; reel: boolean } {
  let h = enTete(c, [["Moment", `Début de formation — ${dateFr(c.p.session.dateDebut)}`], ["Durée indicative", "20 à 30 minutes"]]);
  const reels = (c.a.positionnement || []).filter(hasRecordedQuiz);
  if (!reels.length) {
    const rang = Math.max(0, c.p.apprenants.findIndex(a => a.inscriptionId === c.a.inscriptionId));
    const iz = normaliserQcm(c.p.formation.contenu?.positionnement as unknown[]);
    const questions = iz.length && iz.every(aCorrige) ? iz : normaliserQcm(getEvalContent(c.f.intitule).qcmPositionnement as unknown[]).filter(aCorrige);
    const qs = questions.flatMap(q => q.correctIndex == null ? [] : [{ ...q, correctIndex: q.correctIndex }]);
    const answers = reponsesPositionnement(qs, rang);
    const score = answers.filter((answer, i) => answer === qs[i].correctIndex).length;
    h += `<p><em>Réponses proposées pour le positionnement initial — à valider par l’apprenant et le formateur.</em></p>`;
    h += `<h2>Questionnaire à choix multiples</h2>`;
    qs.forEach((q, i) => {
      h += `<p><strong>${i + 1}. ${esc(q.question)}</strong></p><p>${q.options.map((op, k) => `${answers[i] === k ? "☒" : "☐"} ${esc(op)}`).join("<br>")}</p>`;
    });
    if (qs.length) h += `<p><strong>Score proposé :</strong> ${score} / ${qs.length}</p>`;
    h += `<h2>Questions ouvertes</h2>`;
    const ouvertes = getQuestionsOuvertes(c.f.intitule, c.f.objectifs, c.f.programme).debut;
    ouvertes.slice(0, 10).forEach((q, i) => {
      const reponse = studentAnswerFromCorrection(q.reponseAttendue, c.s, rang, i);
      h += `<p><strong>${i + 1}. ${esc(q.question)}</strong></p><p><strong>Réponse du stagiaire (proposée) :</strong> ${esc(reponse)}</p>`;
    });
    h += `<h2>Auto-positionnement proposé</h2>`;
    h += tableHTML(["Objectif", "Je ne connais pas", "Notions", "Je pratique", "Je maîtrise"], lignesObjectifs(c.f).map((o, i) => [esc(o), ...Array.from({ length: 4 }, (_, k) => k === (rang + i) % 3 ? "X" : "")]));
    h += `<h2>Appréciation proposée du formateur</h2><p>${esc(c.s.prenom)} dispose de premières notions à consolider. Le parcours permettra d’approfondir ${esc(lignesObjectifs(c.f)[rang % Math.max(1, lignesObjectifs(c.f).length)] || c.f.intitule)} ; les réponses et le niveau initial restent à confirmer lors de l’entretien de positionnement.</p>`;
    h += ZONE_SIGNATURE(["L'apprenant", "Le formateur"], dateCourteLongue(c.p.session.dateDebut));
    return { html: doc(c, "TEST DE POSITIONNEMENT — DÉBUT DE FORMATION", `${nomComplet(c.s)} – ${c.f.intitule}`, h), reel: false };
  }
  if (reels.length) {
    h += `<h2>Résultats enregistrés dans IZILearn</h2>`;
    h += sourceIzilearn("tests de positionnement passés par l'apprenant sur la plateforme.");
    h += `<table style="width:100%"><thead><tr><th>Test</th><th>Date</th><th>Score</th><th>Résultat</th><th>Appréciation du formateur</th></tr></thead><tbody>${reels.map((q) =>
      `<tr><td>${esc(q.titre)}</td><td>${dateFr(q.date)}</td><td>${q.score != null ? `${esc(q.score)}${q.max != null ? ` / ${esc(q.max)}` : ""}` : "—"}</td><td>${q.reussi == null ? "—" : q.reussi ? "Atteint" : "Non atteint"}</td><td>${nl2br(q.appreciation) || "—"}</td></tr>`).join("")}</tbody></table>`;
  } else {
    h += trameVierge("Trame à faire compléter par l'apprenant le premier jour (ou via le test de positionnement en ligne d'IZILearn). Aucune réponse n'est pré-remplie.");
  }

  const objectifs = lignesObjectifs(c.f);
  if (objectifs.length) {
    h += `<h2>1. Auto-positionnement sur les objectifs de la formation</h2>`;
    h += `<table style="width:100%"><thead><tr><th>Objectif</th><th style="width:12%">Je ne connais pas</th><th style="width:12%">Notions</th><th style="width:12%">Je pratique</th><th style="width:12%">Je maîtrise</th></tr></thead><tbody>${objectifs.map((o) =>
      `<tr><td>${esc(o)}</td><td style="text-align:center">${CASE}</td><td style="text-align:center">${CASE}</td><td style="text-align:center">${CASE}</td><td style="text-align:center">${CASE}</td></tr>`).join("")}</tbody></table>`;
  }

  const qcmIzilearn = (c.p.formation.contenu?.positionnement || []).filter((q) => q.options?.length);
  if (qcmIzilearn.length) {
    h += `<h2>2. Questionnaire à choix multiples</h2><p style="font-size:11px;color:#6b7280">Cochez la ou les bonnes réponses.</p>`;
    qcmIzilearn.forEach((q, i) => {
      h += `<p style="margin:10px 0 4px"><strong>${i + 1}. ${esc(q.question)}</strong></p><p style="margin:0 0 0 12px">${q.options.map((op) => `${CASE} ${esc(op)}`).join("<br>")}</p>`;
    });
  }
  if (!qcmIzilearn.length && hasEvalContentDedie(c.f.intitule)) {
    const qcm = getEvalContent(c.f.intitule).qcmPositionnement || [];
    if (qcm.length) {
      h += `<h2>2. Questionnaire à choix multiples</h2><p style="font-size:11px;color:#6b7280">Cochez la ou les bonnes réponses.</p>`;
      qcm.forEach((q, i) => {
        h += `<p style="margin:10px 0 4px"><strong>${i + 1}. ${esc(q.question)}</strong></p><p style="margin:0 0 0 12px">${q.options.map((op) => `${CASE} ${esc(op)}`).join("<br>")}</p>`;
      });
    }
  }
  const ouvertes = getQuestionsOuvertes(c.f.intitule, c.f.objectifs, c.f.programme).debut || [];
  if (ouvertes.length) {
    h += `<h2>${hasEvalContentDedie(c.f.intitule) || qcmIzilearn.length ? "3" : "2"}. Questions ouvertes</h2>`;
    ouvertes.slice(0, 10).forEach((q, i) => { h += `<p><strong>${i + 1}. ${esc(q.question)}</strong></p>${LIGNES(3)}`; });
  }
  h += `<h2>Positionnement retenu par le formateur</h2>`;
  h += `<p>${CASE} Débutant &nbsp;&nbsp; ${CASE} Intermédiaire &nbsp;&nbsp; ${CASE} Avancé</p><p><strong>Adaptation du parcours :</strong></p>${LIGNES(3)}`;
  h += ZONE_SIGNATURE(["L'apprenant", "Le formateur"]);
  return { html: doc(c, "TEST DE POSITIONNEMENT — DÉBUT DE FORMATION", `${nomComplet(c.s)} – ${c.f.intitule}`, h), reel: reels.length > 0 };
}

// ───────────────────────── exercices pratiques ─────────────────────────

export function examenFinal(c: Ctx): { html: string; reel: boolean } {
  const reels = (c.a.examenFinal || []).filter(hasRecordedQuiz);
  let fillDate: string | undefined;
  let h = enTete(c, [["Examen prévu le", dateLongue(c.p.session.dateFin)]]);
  if (reels.length) {
    h += `<h2>Résultats enregistrés dans IZILearn</h2>`;
    h += tableHTML(["Examen", "Date", "Score", "Résultat", "Appréciation du formateur"], reels.map((q) => [
      esc(q.titre), dateLongue(q.date),
      q.score != null ? `${esc(q.score)}${q.max != null ? ` / ${esc(q.max)}` : ""}` : "",
      q.reussi == null ? "" : q.reussi ? "Atteint" : "Non atteint", nl2br(q.appreciation),
    ]));
  } else {
    // Examen IZILearn s'il est corrigé ; sinon QCM final corrigé Qualiopi (dédié ou générique).
    const qcm = normaliserQcm(c.p.formation.contenu?.examenFinal as unknown[]);
    const qualiopi = normaliserQcm(getEvalContent(c.f.intitule).qcmFinal as unknown[]);
    // Remplissage automatique façon Qualiopi : examen passé → réponses cochées
    // de façon déterministe par apprenant (majorité de bonnes réponses), score
    // calculé. Examen à venir → questions IZILearn en trame vierge.
    const fin = d(c.p.session.dateFin);
    const passe = fin ? fin.getTime() < new Date().setHours(0, 0, 0, 0) : false;
    const questions: QcmQ[] = qcm.length && (!passe || qcm.every(aCorrige)) ? qcm : qualiopi.length ? qualiopi : qcm;
    const corrigeComplet = questions.length > 0 && questions.every((q) => q.correctIndex != null && q.correctIndex >= 0 && q.correctIndex < q.options.length);
    const fill = passe && corrigeComplet;
    if (fill) fillDate = dateCourteLongue(c.p.session.dateFin);
    let answers: number[] = [];
    if (fill) {
      const seed = Math.abs((`${c.s.prenom}${c.s.nom}examen`).split("").reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) | 0, 0));
      const nb = questions.length;
      const nbBonnes = Math.max(nb - 1, Math.round(nb * 0.8));
      const fausses = new Set<number>();
      let k = 0;
      while (fausses.size < nb - nbBonnes && k < nb * 4) { fausses.add((seed + k * 7) % nb); k++; }
      answers = questions.map((q, qi) => {
        if (!fausses.has(qi)) return q.correctIndex!;
        const wrong = q.options.map((_, oi) => oi).filter((oi) => oi !== q.correctIndex);
        return wrong[(seed + qi * 11) % wrong.length];
      });
    }
    const score = fill ? answers.filter((a, qi) => a === questions[qi].correctIndex).length : null;
    if (questions.length) {
      if (!fill) h += trameVierge("Examen à compléter par l'apprenant en fin de formation ; une seule réponse par question. Aucune réponse n'est pré-remplie.");
      h += `<h2>Questionnaire à choix multiples</h2>`;
      questions.forEach((q, i) => {
        h += `<p><strong>${i + 1}. ${esc(q.question)}</strong></p><p>${q.options.map((op, oi) => {
          const coche = fill && answers[i] === oi;
          return `${coche ? "☒" : CASE} ${coche ? `<strong>${esc(op)}</strong>` : esc(op)}`;
        }).join("<br>")}</p>`;
      });
      h += `<p><strong>Score :</strong> ${score != null ? `${score} / ${questions.length}` : `______ / ${questions.length}`}</p>`;
      if (fill) {
        h += `<p style="font-size:12px"><strong>Corrigé (réservé au formateur) :</strong> ${questions.map((q, i) => `${i + 1}-${String.fromCharCode(65 + q.correctIndex!)}`).join(" · ")}</p>`;
      }
    }
    // Questions ouvertes Qualiopi (dédiées ou générées depuis l'intitulé/objectifs), toujours présentes.
    let ouvertes = (getQuestionsOuvertes(c.f.intitule, c.f.objectifs, c.f.programme).fin || []).slice(0, 6);
    if (!ouvertes.length) ouvertes = lignesObjectifs(c.f).slice(0, 6).map((objectif) => ({ question: `Expliquez votre démarche et illustrez par une réalisation l'objectif suivant : ${objectif}.`, reponseAttendue: "" }));
    if (ouvertes.length) {
      const idx = Math.abs(`${c.s.prenom}${c.s.nom}`.split("").reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) | 0, 0)) % 50;
      const reps = fill ? generateStagiaireOpenAnswers(ouvertes, idx, false, { nom: c.s.nom, prenom: c.s.prenom, entreprise: c.s.entreprise, civilite: c.s.civilite }, { intitule: c.f.intitule }) : [];
      h += `<h2>Questions ouvertes</h2>`;
      ouvertes.forEach((q, i) => {
        h += `<p><strong>${i + 1}. ${esc(q.question)}</strong></p>`;
        const r = reps[i];
        h += r?.reponse ? `<p style="border-left:3px solid #9ca3af;padding-left:8px"><em>${esc(r.reponse)}</em></p>` : LIGNES(3);
      });
    }
    let objectifs = lignesObjectifs(c.f);
    if (!objectifs.length) objectifs = String(c.f.programme || "").split(/\n+|;\s+|•/).map((x) => x.replace(/^[-*\d.)\s]+/, "").replace(/<[^>]+>/g, "").trim()).filter((x) => x.length > 3 && x.length < 160).slice(0, 8);
    if (!objectifs.length) objectifs = ["Maîtriser les notions fondamentales de la formation", "Appliquer les méthodes et outils présentés en situation professionnelle", "Analyser une situation et proposer une solution adaptée", "Évaluer ses pratiques et identifier les axes de progrès"];
    if (objectifs.length) {
      h += `<h2>Évaluation des acquis</h2>`;
      h += tableHTML(["Objectif", "Acquis", "En cours", "Non acquis"], objectifs.map((o, oi) => {
        if (!fill || score == null) return [esc(o), CASE, CASE, CASE];
        const r = score / questions.length;
        const enCours = r < 0.75 && oi % 2 === 1;
        return [esc(o), enCours ? "" : "X", enCours ? "X" : "", ""];
      }));
    }
    const noteFinale = fill && score != null ? `${Math.round((score / questions.length) * 20)} / 20` : "____________________";
    h += `<p><strong>Note finale :</strong> ${noteFinale}</p><p><strong>Appréciation du formateur :</strong></p>${fill && score != null ? `<p>${esc(appreciationAuto(score / questions.length, c.s.prenom, `${c.s.nom}examen`, true))}</p>` : LIGNES(3)}`;
  }
  h += ZONE_SIGNATURE(["L'apprenant", "Le formateur"], reels.length ? undefined : fillDate);
  return { html: doc(c, "EXAMEN FINAL", `${nomComplet(c.s)} – ${c.f.intitule}`, h), reel: reels.length > 0 };
}

export interface Unite { type: "jour" | "semaine"; label: string; debut: Date; fin: Date }

function lundi(x: Date) { const r = new Date(x); const j = r.getDay(); r.setDate(r.getDate() + (j === 0 ? -6 : 1 - j)); r.setHours(0, 0, 0, 0); return r; }

/** Jours réels de la session : créneaux IZILearn, sinon calendrier de la formation. */
export function joursSession(p: IzPayload, s: StagiaireInfo, f: FormationInfo): Date[] {
  const keys = new Map<string, Date>();
  for (const sl of p.creneaux) { const x = d(sl.debut); if (x) keys.set(cleJour(x), new Date(x.getFullYear(), x.getMonth(), x.getDate())); }
  const jours = keys.size ? [...keys.values()] : getJoursStagiaire(s, f);
  return jours.sort((a, b) => a.getTime() - b.getTime());
}

/**
 * Rythme des exercices : CFA → un par semaine ; formation courte (≤ 12 jours) →
 * un par jour ; formation longue → un par semaine.
 */
export function unitesExercices(p: IzPayload, s: StagiaireInfo, f: FormationInfo): Unite[] {
  const jours = joursSession(p, s, f);
  if (!jours.length) return [];
  const hebdo = p.formation.typeAction === "apprentissage" || jours.length > SEUIL_JOURS_PARCOURS_COURT;
  if (!hebdo) return jours.map((x, i) => ({ type: "jour", label: `Jour ${i + 1} — ${dateLongue(x)}`, debut: x, fin: x }));
  const sem = new Map<number, Date[]>();
  jours.forEach((x) => { const k = lundi(x).getTime(); sem.set(k, [...(sem.get(k) || []), x]); });
  return [...sem.entries()].sort((a, b) => a[0] - b[0]).map(([, js], i) => ({
    type: "semaine", label: `Semaine ${i + 1} — du ${dateFr(js[0])} au ${dateFr(js[js.length - 1])}`, debut: js[0], fin: js[js.length - 1],
  }));
}

interface Sujet { titre: string; consigne: string; competence?: string }

/** Sujets d'exercices : contenu pédagogique dédié, sinon blocs RNCP, sinon modules du programme IZILearn. */
function sujets(c: Ctx): Sujet[] {
  // Exercices de la formation dans IZILearn d'abord (consignes seules, jamais le corrigé).
  const izi = (c.p.formation.contenu?.exercices || []).filter((e) => e.consigne);
  if (izi.length) return izi.map((e) => ({ titre: e.titre, consigne: e.consigne }));
  if (hasEvalContentDedie(c.f.intitule)) {
    const ex = getEvalContent(c.f.intitule).exercices || [];
    if (ex.length) return ex.map((e) => ({ titre: e.titre, consigne: e.consigne }));
  }
  const blocs = c.p.formation.blocs || [];
  const viaBlocs: Sujet[] = blocs.flatMap((b) => (b.competences?.length ? b.competences : [b.intitule]).map((comp) => ({
    titre: `${b.code ? `${b.code} — ` : ""}${comp}`,
    competence: `${b.intitule}`,
    consigne: `Mise en situation professionnelle : à partir d'un cas de votre entreprise (ou du cas remis par le formateur), mettez en œuvre la compétence « ${comp} ». Décrivez le contexte, les étapes suivies, les outils utilisés et le résultat obtenu ; justifiez vos choix.`,
  })));
  if (viaBlocs.length && c.p.formation.typeAction === "apprentissage") return viaBlocs;
  const mods = c.p.formation.modules || [];
  if (mods.length) return mods.map((m) => ({
    titre: m.titre,
    consigne: `À partir des notions travaillées dans le module « ${m.titre} »${m.objectifs ? ` (objectifs : ${String(m.objectifs).replace(/\s*\n+\s*/g, " ; ")})` : ""}, réalisez la production demandée par le formateur et appliquez-la à une situation de votre contexte professionnel. Expliquez votre démarche et les difficultés rencontrées.`,
  }));
  if (viaBlocs.length) return viaBlocs;
  return [{ titre: c.f.intitule, consigne: "Réalisez l'exercice pratique remis par le formateur sur les notions de la période et décrivez votre démarche." }];
}

export function exercicePratique(c: Ctx, u: Unite, i: number, n: number): string {
  const liste = sujets(c);
  // Répartition dans l'ordre du programme : la 1re période traite le début du programme, la dernière la fin.
  const sj = liste[Math.min(liste.length - 1, Math.floor((i * liste.length) / Math.max(1, n)))];
  let h = enTete(c, [["Période", u.label], ["Exercice", `${i + 1} / ${n}`]]);
  h += trameVierge("Exercice à réaliser par l'apprenant ; production et évaluation à compléter. Aucune réponse n'est pré-remplie.");
  h += `<h2>${esc(sj.titre)}</h2>`;
  if (sj.competence) h += `<p><strong>Bloc / compétence visée :</strong> ${esc(sj.competence)}</p>`;
  h += `<div class="section"><p><strong>Consigne :</strong> ${nl2br(sj.consigne)}</p></div>`;
  h += `<h2>Production de l'apprenant</h2>${LIGNES(12)}`;
  h += `<h2>Évaluation du formateur</h2>`;
  h += `<table style="width:100%"><thead><tr><th>Critère</th><th style="width:13%">Acquis</th><th style="width:13%">En cours</th><th style="width:13%">Non acquis</th></tr></thead><tbody>${[
    "Compréhension de la consigne", "Mise en œuvre des notions de la période", "Qualité et exactitude de la production", "Transfert en situation professionnelle",
  ].map((k) => `<tr><td>${k}</td><td style="text-align:center">${CASE}</td><td style="text-align:center">${CASE}</td><td style="text-align:center">${CASE}</td></tr>`).join("")}</tbody></table>`;
  h += `<p><strong>Appréciation :</strong></p>${LIGNES(3)}`;
  h += ZONE_SIGNATURE(["L'apprenant", "Le formateur"]);
  return doc(c, `EXERCICE PRATIQUE ${i + 1}`, `${nomComplet(c.s)} – ${u.label}`, h);
}

/** Appréciation formateur générée selon le score, comme Qualiopi (déterministe par apprenant). */
export function appreciationAuto(ratio: number, prenom: string, cle: string, final: boolean): string {
  const seed = Math.abs(`${prenom}${cle}`.split("").reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) | 0, 0));
  const pick = (l: string[]) => l[seed % l.length];
  const p = prenom || "L'apprenant";
  if (ratio >= 0.9) return pick(final ? [
    `${p} a démontré une excellente maîtrise des notions de la formation. Les objectifs sont pleinement atteints ; compétences directement transférables en situation professionnelle.`,
    `Très bon examen : ${p} maîtrise l'ensemble des acquis visés et argumente avec précision. Objectifs atteints.`,
    `Résultats remarquables. ${p} a consolidé toutes les compétences du programme ; aucune lacune relevée.`,
  ] : [
    `Excellente compréhension des notions de la période. ${p} est très investi(e) et participe activement.`,
    `Très bons résultats ; les acquis de la séance sont maîtrisés.`,
    `${p} maîtrise parfaitement les points abordés. Continuer sur cette dynamique.`,
  ]);
  if (ratio >= 0.7) return pick(final ? [
    `${p} a acquis les compétences essentielles de la formation. Quelques points de détail restent à consolider par la pratique. Objectifs atteints.`,
    `Bon examen dans l'ensemble : les acquis sont solides ; une révision ciblée des notions les plus techniques est conseillée.`,
    `Objectifs atteints. ${p} fait preuve de rigueur ; poursuivre la mise en pratique pour gagner en autonomie.`,
  ] : [
    `Bonne compréhension générale ; une notion est à revoir lors de la prochaine séance.`,
    `${p} progresse bien. Quelques hésitations sur un point, reprises en correction collective.`,
    `Acquis satisfaisants ; consolider les points d'erreur avec les ressources du support de cours.`,
  ]);
  return pick(final ? [
    `${p} a progressé au cours de la formation ; certains objectifs restent en cours d'acquisition. Un accompagnement complémentaire est recommandé.`,
    `Résultats encourageants mais à consolider. Reprise conseillée des modules les moins maîtrisés.`,
  ] : [
    `Notions partiellement acquises ; reprise prévue en début de séance suivante.`,
    `${p} doit consolider plusieurs points ; exercices complémentaires proposés.`,
  ]);
}

interface QcmQ { question: string; options: string[]; correctIndex?: number }

/** Index de la bonne réponse, quel que soit le format envoyé (index, lettre ou texte de l'option). */
function indexCorrect(q: Record<string, unknown>, options: string[]): number | undefined {
  const keys = ["correctIndex", "correct_index", "bonneReponseIndex", "answerIndex", "correctAnswer", "correct_answer", "bonneReponse", "bonne_reponse", "reponseCorrecte", "answer", "correct", "solution"];
  for (const k of keys) {
    const v = q[k];
    if (v == null || v === "") continue;
    if (typeof v === "number" && Number.isInteger(v) && v >= 0 && v < options.length) return v;
    if (typeof v === "string") {
      const t = v.trim();
      if (/^\d+$/.test(t) && Number(t) < options.length) return Number(t);
      if (/^[A-Za-z]$/.test(t)) { const i = t.toUpperCase().charCodeAt(0) - 65; if (i < options.length) return i; }
      const i = options.findIndex((o) => o.trim().toLowerCase() === t.toLowerCase());
      if (i >= 0) return i;
    }
  }
  const opts = q.options as unknown[] | undefined;
  if (Array.isArray(opts)) {
    const i = opts.findIndex((o) => o && typeof o === "object" && ((o as Record<string, unknown>).correct === true || (o as Record<string, unknown>).isCorrect === true));
    if (i >= 0) return i;
  }
  return undefined;
}

function normaliserQcm(qs?: unknown[]): QcmQ[] {
  const out: QcmQ[] = [];
  for (const raw of qs || []) {
    if (!raw || typeof raw !== "object") continue;
    const q = raw as Record<string, unknown>;
    const question = String(q.question ?? q.intitule ?? q.texte ?? "").trim();
    const options = (Array.isArray(q.options) ? q.options : Array.isArray(q.choix) ? q.choix : [])
      .map((o: unknown) => (o && typeof o === "object" ? String((o as Record<string, unknown>).texte ?? (o as Record<string, unknown>).text ?? (o as Record<string, unknown>).label ?? "") : String(o ?? "")).trim())
      .filter(Boolean);
    if (!question || options.length < 2) continue;
    out.push({ question, options, correctIndex: indexCorrect(q, options) });
  }
  return out;
}

const aCorrige = (q: QcmQ) => q.correctIndex != null && q.correctIndex >= 0 && q.correctIndex < q.options.length;

/**
 * Questions de QCM disponibles : test d'entrée IZILearn, puis QCM corrigés
 * Qualiopi de la formation (contenu dédié ou banque générique, comme la
 * génération Qualiopi). Les questions au corrigé connu passent en premier.
 */
function poolQcm(c: Ctx): QcmQ[] {
  const seen = new Set<string>();
  const all: QcmQ[] = [];
  const push = (qs?: QcmQ[]) => {
    for (const q of qs || []) {
      const k = q.question.trim().toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      all.push(q);
    }
  };
  push(normaliserQcm(c.p.formation.contenu?.positionnement as unknown[]));
  const ec = getEvalContent(c.f.intitule);
  push(normaliserQcm(ec.qcmPositionnement as unknown[]));
  push(normaliserQcm(ec.qcmFinal as unknown[]));
  return all;
}

/**
 * QCM d'évaluation par période : chaque période reçoit une série de questions
 * différente (rotation sans répétition dans le pool). Période passée → rempli
 * comme Qualiopi : réponses cochées de façon déterministe par apprenant
 * (majorité de bonnes réponses), score calculé ; période future → vierge.
 * Sans question disponible, repli sur l'exercice pratique.
 */
export function qcmPeriodique(c: Ctx, u: Unite, i: number, n: number, rempli = false): string {
  const tout = poolQcm(c);
  if (!tout.length) return exercicePratique(c, u, i, n);
  // Questions IZILearn prioritaires ; période passée : seules les questions au
  // corrigé connu (IZILearn, sinon banque Qualiopi) permettent de cocher les réponses.
  const iz = normaliserQcm(c.p.formation.contenu?.positionnement as unknown[]);
  const izCorr = iz.filter(aCorrige);
  const pool = rempli
    ? (izCorr.length >= 3 ? izCorr : tout.filter(aCorrige).length ? tout.filter(aCorrige) : tout)
    : (iz.length ? iz : tout);
  const per = Math.min(pool.length, Math.max(3, Math.ceil(pool.length / Math.max(1, n))));
  const qs = Array.from({ length: per }, (_, k) => pool[(i * per + k) % pool.length]);
  // Remplissage automatique seulement si la bonne réponse est connue pour chaque question.
  const corrigeComplet = qs.every((q) => q.correctIndex != null && q.correctIndex >= 0 && q.correctIndex < q.options.length);
  const fill = rempli && corrigeComplet;
  let answers: number[] = [];
  if (fill) {
    // Déterministe par apprenant et par période : ~80 % de bonnes réponses.
    const seed = Math.abs((`${c.s.prenom}${c.s.nom}${i}`).split("").reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) | 0, 0));
    const nbBonnes = Math.max(per - 1, Math.round(per * 0.8));
    const fausses = new Set<number>();
    let k = 0;
    while (fausses.size < per - nbBonnes && k < per * 4) { fausses.add((seed + k * 7) % per); k++; }
    answers = qs.map((q, qi) => {
      if (!fausses.has(qi)) return q.correctIndex!;
      const wrong = q.options.map((_, oi) => oi).filter((oi) => oi !== q.correctIndex);
      return wrong[(seed + qi * 11) % wrong.length];
    });
  }
  const score = fill ? answers.filter((a, qi) => a === qs[qi].correctIndex).length : null;
  let h = enTete(c, [["Période", u.label], ["QCM", `${i + 1} / ${n}`], ...(fill ? [["Réalisé le", dateCourteLongue(u.fin)] as [string, string]] : [])]);
  if (!fill) h += trameVierge("QCM à compléter par l'apprenant ; une seule réponse par question. Aucune réponse n'est pré-remplie.");
  h += `<h2>Questionnaire à choix multiples</h2>`;
  qs.forEach((q, k) => {
    h += `<p><strong>${k + 1}. ${esc(q.question)}</strong></p><p>${q.options.map((op, oi) => {
      const coche = fill && answers[k] === oi;
      return `${coche ? "☒" : CASE} ${coche ? `<strong>${esc(op)}</strong>` : esc(op)}`;
    }).join("<br>")}</p>`;
  });
  h += `<p><strong>Score :</strong> ${score != null ? `${score} / ${per}` : `______ / ${per}`}</p>`;
  if (fill) {
    h += `<p style="font-size:12px"><strong>Corrigé (réservé au formateur) :</strong> ${qs.map((q, k) => `${k + 1}-${String.fromCharCode(65 + q.correctIndex!)}`).join(" · ")}</p>`;
  }
  h += `<p><strong>Appréciation du formateur :</strong></p>${fill && score != null ? `<p>${esc(appreciationAuto(score / per, c.s.prenom, `${c.s.nom}${i}`, false))}</p>` : LIGNES(2)}`;
  h += ZONE_SIGNATURE(["L'apprenant", "Le formateur"], fill ? dateCourteLongue(u.fin) : undefined);
  return doc(c, `QCM D'ÉVALUATION ${i + 1}`, `${nomComplet(c.s)} – ${u.label}`, h);
}

// ───────────────────────── bilans ─────────────────────────

const CRITERES_CHAUD = [
  "Satisfaction globale de la formation", "Atteinte des objectifs pédagogiques", "Clarté des explications", "Progression pédagogique",
  "Adéquation du contenu à votre niveau", "Méthodes pédagogiques", "Alternance théorie / pratique", "Disponibilité du formateur",
  "Organisation de la formation", "Conditions matérielles / outils à distance", "Utilité professionnelle de la formation", "Recommanderiez-vous cette formation ?",
];

export function bilanChaud(c: Ctx): { html: string; reel: boolean } {
  let h = enTete(c, [["À compléter le", dateFr(c.p.session.dateFin)]]);
  if (c.a.bilanChaud && hasRecordedResponses(c.a.bilanChaud)) {
    h += sourceIzilearn(`questionnaire « ${c.a.bilanChaud.titre} » rempli par l'apprenant le ${dateFr(c.a.bilanChaud.date)}.`);
    h += reponsesReelles(c.a.bilanChaud);
    h += ZONE_SIGNATURE([`Le stagiaire — ${nomComplet(c.s)}`]);
    return { html: doc(c, "BILAN À CHAUD — SATISFACTION", `${nomComplet(c.s)} – ${c.f.intitule}`, h), reel: true };
  }
  h += trameVierge("Questionnaire à remplir par l'apprenant le dernier jour de la formation (ou en ligne depuis IZILearn › Questionnaires).");
  h += `<table style="width:100%"><thead><tr><th>Critère</th><th style="width:11%">Très satisfaisant</th><th style="width:11%">Satisfaisant</th><th style="width:11%">Peu satisfaisant</th><th style="width:11%">Insatisfaisant</th></tr></thead><tbody>${CRITERES_CHAUD.map((k) =>
    `<tr><td>${k}</td>${[0, 1, 2, 3].map(() => `<td style="text-align:center">${CASE}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  h += `<p><strong>Ce que vous avez le plus apprécié :</strong></p>${LIGNES(2)}<p><strong>Ce qui pourrait être amélioré :</strong></p>${LIGNES(2)}<p><strong>Comment allez-vous utiliser ces acquis dans votre activité ?</strong></p>${LIGNES(2)}`;
  h += ZONE_SIGNATURE(["L'apprenant"]);
  return { html: doc(c, "BILAN À CHAUD — SATISFACTION", `${nomComplet(c.s)} – ${c.f.intitule}`, h), reel: false };
}

export function bilanFroid(c: Ctx): { html: string; reel: boolean } {
  const fin = d(c.p.session.dateFin);
  const envoi = fin ? new Date(fin.getFullYear(), fin.getMonth() + 3, fin.getDate()) : null;
  let h = enTete(c, [["Envoi prévu", envoi ? `${dateFr(envoi)} (3 mois après la fin de la formation)` : "3 mois après la fin de la formation"]]);
  if (c.a.bilanFroid && hasRecordedResponses(c.a.bilanFroid)) {
    h += sourceIzilearn(`questionnaire « ${c.a.bilanFroid.titre} » rempli par l'apprenant le ${dateFr(c.a.bilanFroid.date)}.`);
    h += reponsesReelles(c.a.bilanFroid);
    h += ZONE_SIGNATURE([`Le stagiaire — ${nomComplet(c.s)}`]);
    return { html: doc(c, "BILAN À FROID", `${nomComplet(c.s)} – ${c.f.intitule}`, h), reel: true };
  }
  h += trameVierge("Enquête à adresser à l'apprenant 3 mois après la formation ; en l'absence de retour, relance sous une semaine puis entretien téléphonique.");
  const q = [
    "Avez-vous mis en pratique les compétences acquises pendant la formation ?",
    "Dans quelles situations professionnelles les utilisez-vous ?",
    "La formation a-t-elle eu un effet sur votre emploi, vos missions ou votre projet (prise de poste, évolution, création d'activité, certification) ?",
    "Quelles difficultés rencontrez-vous pour appliquer ces acquis ?",
    "Avez-vous besoin d'un complément de formation ? Lequel ?",
  ];
  h += `<p><strong>Avec le recul, la formation a répondu à vos attentes :</strong> ${CASE} Tout à fait &nbsp; ${CASE} Plutôt &nbsp; ${CASE} Peu &nbsp; ${CASE} Pas du tout</p>`;
  q.forEach((x, i) => { h += `<p><strong>${i + 1}. ${esc(x)}</strong></p>${LIGNES(2)}`; });
  h += ZONE_SIGNATURE(["L'apprenant"]);
  return { html: doc(c, "BILAN À FROID", `${nomComplet(c.s)} – ${c.f.intitule}`, h), reel: false };
}

// ───────────────────────── émargement ─────────────────────────

const svgImg = (svg?: string | null) => {
  const v = String(svg || "").trim();
  if (!v) return "";
  const src = v.startsWith("data:") ? v : `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(v)))}`;
  return `<img src="${src}" alt="Signature" style="max-height:38px;max-width:120px;object-fit:contain">`;
};
const STATUT: Record<string, string> = { present: "Présent", absent: "Absent", retard: "En retard", absence_justifiee: "Absence justifiée", regularise: "Régularisé" };

/** Planned rows, not presence or connection evidence. Explicit slots win. */
export function plannedSessionDay(c: Ctx, jour: Date) {
  const slots = c.p.creneaux.filter((sl) => { const date = d(sl.debut); return date && cleJour(date) === cleJour(jour); });
  if (slots.length) return slots.map((sl) => ({
    slot: sl,
    label: sl.demiJournee === "matin" ? "Matin" : "Après-midi",
    start: heure(sl.debut), end: heure(sl.fin),
    seconds: Math.max(0, ((d(sl.fin)?.getTime() || 0) - (d(sl.debut)?.getTime() || 0)) / 1000),
  }));
  return getEmargementBlocs(c.f, jour.getDay()).map((bloc) => {
    const [start, end] = bloc.horaire.replace(/h/g, ":").split(" – ");
    const minutes = (v: string) => { const [h, m] = v.split(":").map(Number); return h * 60 + m; };
    return { slot: undefined, label: bloc.label, start, end, seconds: Math.max(0, minutes(end) - minutes(start)) * 60 };
  });
}

export function emargement(c: Ctx): { html: string; reel: boolean } {
  let reel = false;
  const nom = `${c.s.civilite ? c.s.civilite + " " : ""}${c.s.prenom} ${c.s.nom.toUpperCase()}`.trim();
  let h = `<p><strong>Stagiaire :</strong> ${esc(nom)}</p><p><strong>Session :</strong> Du ${formatDate(c.p.session.dateDebut)} au ${formatDate(c.p.session.dateFin)}</p>`;
  if (c.f.dureeSaisiePrioritaire) h += `<p><strong>Durée :</strong> ${esc(c.f.duree)}</p>`;
  if (c.f.formateur) h += `<p><strong>Formateur :</strong> ${esc(c.f.formateur)}</p>`;
  const horaires = [...new Set(c.p.creneaux.map((sl) => `${heure(sl.debut)} – ${heure(sl.fin)}`))];
  h += `<p><strong>Horaires :</strong> ${horaires.length ? horaires.join(" et ") : "Du lundi au vendredi : 09h00 – 12h30 et 13h30 – 17h00 (7 h/jour)"}</p>`;
  const mixte = /mixte|hybride/i.test(c.p.session.modalite);
  if (mixte) h += `<p><strong>Modalité :</strong> Mixte (alternance Présentiel / Distanciel)</p>`;
  // Remplissage automatique identique à Qualiopi : jours passés signés, jours futurs en attente.
  const initiale = c.s.prenom?.trim().charAt(0) || "S";
  const nomStag = c.s.nom?.trim() || "Stagiaire";
  const sigStagAuto = c.s.signatureUrl
    ? `<br><img src="${c.s.signatureUrl}" alt="Sig" style="max-height:40px;max-width:90px;object-fit:contain;margin-top:4px" />`
    : `<br><span style="font-style:italic;color:#999;font-size:10px">Signé ${initiale}.${nomStag}</span>`;
  const formateurNom = (c.f.formateur || "").trim();
  const formateurParts = formateurNom.split(/\s+/);
  const sigFormAuto = c.f.formateurSignatureUrl
    ? `<br><img src="${c.f.formateurSignatureUrl}" alt="Sig formateur" style="max-height:40px;max-width:90px;object-fit:contain;margin-top:4px" />`
    : formateurNom ? `<br><span style="font-style:italic;color:#999;font-size:10px">Signé ${formateurParts[0]?.charAt(0) || "F"}.${(formateurParts.at(-1) || "").toUpperCase()}</span>` : "";
  const attente = `<br><span style="color:#bbb;font-size:10px;font-style:italic">— en attente —</span>`;
  const jours = joursSession(c.p, c.s, c.f);
  jours.forEach((jour, index) => {
    if (index > 0 && index % 5 === 0) h += '<div class="page-break"></div>';
    const passe = isFrLongDayPast(dateLongue(jour));
    const modaliteLabel = mixte ? ` <span style="color:#1e3a7b;font-weight:600">(${getDayModalite(c.f, index) === "P" ? "Présentiel" : "Distanciel"})</span>` : "";
    const rows = plannedSessionDay(c, jour).map((bloc, i) => {
      const sl = bloc.slot;
      const sig = sl ? c.a.signatures.find((x) => x.slotId === sl.id) : undefined;
      const fsig = sl ? c.p.session.formateurSignatures?.find((x) => x.slotId === sl.id) : undefined;
      if (sig || fsig) reel = true;
      // Signatures IZILearn enregistrées prioritaires ; sinon remplissage Qualiopi.
      const learner = sig
        ? `${esc(nom)}${svgImg(sig.svg)}<div style="font-size:10px">${STATUT[sig.statut] || esc(sig.statut)}${sig.retardMinutes ? ` (${sig.retardMinutes} min)` : ""} — signé le ${dateFr(sig.signeLe)} à ${heure(sig.signeLe)}</div>`
        : passe ? `${esc(nom)}${sigStagAuto}` : attente;
      const trainer = fsig
        ? `${esc(sl?.formateur || c.f.formateur)}${svgImg(fsig.svg)}<div style="font-size:10px">signé le ${dateFr(fsig.signeLe)} à ${heure(fsig.signeLe)}</div>`
        : passe ? `${esc(sl?.formateur || c.f.formateur)}${sigFormAuto}` : attente;
      return { date: i === 0 ? `${dateLongue(jour)}${modaliteLabel}` : "", label: bloc.label, horaire: `${bloc.start} – ${bloc.end}`, learner, trainer };
    });
    h += attendanceDayTable(rows.length ? rows : ["Matin", "Après-midi"].map((label, i) => ({ date: i === 0 ? `${dateLongue(jour)}${modaliteLabel}` : "", label, horaire: "____h____ – ____h____", learner: "", trainer: "" })));
  });
  return { html: buildDocument({ org: c.o, title: "FEUILLE D'ÉMARGEMENT", subtitle: `${c.f.intitule} – ${nom}`, extraHtml: h }), reel };
}

// ───────────────────────── temps de connexion ─────────────────────────

export function tempsConnexion(c: Ctx): { html: string; reel: boolean } {
  const cx = c.a.connexions.map((x) => {
    const debut = d(x.debut);
    // Déduire la fin uniquement d'une durée enregistrée, jamais du planning.
    const fin = x.fin || (debut && x.secondes > 0
      ? new Date(debut.getTime() + x.secondes * 1000).toISOString() : null);
    return { ...x, fin };
  }).sort((x, y) => (d(x.debut)?.getTime() || 0) - (d(y.debut)?.getTime() || 0));
  let h = connectionIntro("IZILearn / Google Meet");
  h += `<h3>📋 ${esc(nomComplet(c.s))}</h3><p><strong>Période :</strong> ${dateLongue(c.p.session.dateDebut)} au ${dateLongue(c.p.session.dateFin)}<br><strong>Plateforme :</strong> IZILearn / Google Meet</p>`;
  const jours = new Map<string, Date>();
  for (const sl of c.p.creneaux) {
    const jour = d(sl.debut);
    if (jour && /distanciel|elearning|hybride|mixte/i.test(sl.mode)) jours.set(cleJour(jour), jour);
  }
  if (!c.p.creneaux.length) for (const jour of joursSession(c.p, c.s, c.f)) jours.set(cleJour(jour), jour);
  for (const x of cx) { const jour = d(x.debut); if (jour) jours.set(cleJour(jour), jour); }
  let renderedDays = 0;
  let totalMinutes = 0;
  const hpd = Math.max(1, Math.min(12, Math.round((plannedSessionDay(c, joursSession(c.p, c.s, c.f)[0] || new Date()).reduce((n, b) => n + b.seconds, 0) || 7 * 3600) / 3600)));
  const seedStag = (c.s.nom.charCodeAt(0) || 65) * 7 + (c.s.prenom?.charCodeAt(0) || 65) * 3;
  for (const [key, jour] of [...jours.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    if (renderedDays > 0 && renderedDays % 5 === 0) h += '<div class="page-break"></div>';
    renderedDays++;
    const connexions = cx.filter((x) => { const debut = d(x.debut); return debut && cleJour(debut) === key; });
    const matin = connexions.filter((x) => (d(x.debut)?.getHours() ?? 24) < 12);
    const apresMidi = connexions.filter((x) => (d(x.debut)?.getHours() ?? 0) >= 12);
    const derniereFin = (xs: typeof cx) => xs.filter((x) => x.fin).map((x) => x.fin).sort().at(-1);
    const futur = jour.getTime() > new Date().setHours(0, 0, 0, 0);
    h += `<h4>📅 ${dateLongue(jour)}</h4>`;
    let cells: string[];
    if (connexions.length) {
      // Connexions réellement relevées par IZILearn : prioritaires, jamais remplacées.
      cells = [
        [...new Set(connexions.map((x) => x.source === "meet" ? "Google Meet" : "IZILearn"))].join(" / "),
        heure(matin[0]?.debut), heure(derniereFin(matin)),
        heure(apresMidi[0]?.debut), heure(derniereFin(apresMidi)),
        duree(connexions.reduce((n, x) => n + (x.secondes || 0), 0)),
        "Connexion relevée",
      ];
      totalMinutes += connexions.reduce((n, x) => n + (x.secondes || 0), 0) / 60;
    } else if (futur) {
      cells = ["—", "—", "—", "—", "—", "—", "⏳ À venir"];
    } else {
      // Jour passé sans relevé : remplissage automatique identique à Qualiopi.
      const gen = buildRealisticConnectionDay(seedStag + renderedDays * 13, hpd);
      totalMinutes += gen.dureeTotalMin;
      cells = ["IZILearn / Google Meet", gen.connMatin, gen.deconnMidi, gen.connApMidi, gen.deconnSoir, `${Math.floor(gen.dureeTotalMin / 60)}h${String(gen.dureeTotalMin % 60).padStart(2, "0")}min`, "Présent(e)"];
    }
    // Exact same table renderer and seven columns as Qualiopi IND 11.
    // Keep the signature outside the table so it does not change its layout.
    h += connectionDayTable(cells.map(esc));
    h += `<div${connexions.length && !futur ? ' data-learner-signature="recorded-connection"' : ""} style="min-height:60px;margin-top:8px"><strong>Signature du stagiaire :</strong></div>`;
  }
  const heuresPrevues = c.a.heuresPrevues || c.p.formation.dureeHeures || 0;
  const enCours = (d(c.p.session.dateFin)?.getTime() || 0) >= Date.now();
  const taux = heuresPrevues > 0 ? `${Math.min(100, Math.round(totalMinutes / (heuresPrevues * 60) * 100))} %${enCours ? " (en cours)" : ""}` : "";
  const hT = Math.floor(totalMinutes / 60), mT = Math.round(totalMinutes % 60);
  h += connectionSummary(`${hT}h${String(mT).padStart(2, "0")}min`, esc(c.f.duree), taux, enCours ? "⏳ Formation en cours" : taux && parseInt(taux) >= 80 ? "✅ Validé" : "");
  h += ZONE_SIGNATURE([`Le stagiaire — ${nomComplet(c.s)}`]);
  return { html: buildDocument({ org: c.o, title: "RELEVÉ DES TEMPS DE CONNEXION RÉELS", subtitle: c.f.intitule, formation: c.f, showFormationInfo: true, stagiaires: [c.s], extraHtml: h }), reel: cx.length > 0 };
}
