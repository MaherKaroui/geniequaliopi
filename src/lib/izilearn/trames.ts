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
import { buildDocument, tableHTML } from "@/lib/docBuilder";
import { getEvalContent, getQuestionsOuvertes, hasEvalContentDedie } from "@/lib/evalContent";
import { getJoursStagiaire, SEUIL_JOURS_PARCOURS_COURT } from "@/lib/parcoursStagiaire";
import type { IzApprenant, IzPayload, IzReponses } from "./types";
import { hasRecordedQuiz, hasRecordedResponses } from "./responses";

export interface Ctx {
  p: IzPayload;
  o: OrganismeInfo;
  f: FormationInfo;
  s: StagiaireInfo;
  a: IzApprenant;
}

// ───────────────────────── utilitaires ─────────────────────────

export const esc = (v: unknown) => String(v ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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
const ZONE_SIGNATURE = (labels: string[]) => `<table style="width:100%;margin-top:18px;border-collapse:collapse"><tr>${labels.map((l) =>
  `<td style="width:${Math.floor(100 / labels.length)}%;vertical-align:top;padding:6px"><div class="sig-box" style="padding:10px;min-height:90px"><p class="sig-label" style="margin:0 0 6px;font-weight:700">${esc(l)}</p><p style="margin:0;color:#6b7280;font-size:11px">Date : ____ / ____ / ________</p><p style="margin:4px 0 0;color:#6b7280;font-size:11px">Signature :</p></div></td>`).join("")}</tr></table>`;

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
  let h = enTete(c, [["Examen prévu le", dateLongue(c.p.session.dateFin)]]);
  if (reels.length) {
    h += `<h2>Résultats enregistrés dans IZILearn</h2>`;
    h += tableHTML(["Examen", "Date", "Score", "Résultat", "Appréciation du formateur"], reels.map((q) => [
      esc(q.titre), dateLongue(q.date),
      q.score != null ? `${esc(q.score)}${q.max != null ? ` / ${esc(q.max)}` : ""}` : "",
      q.reussi == null ? "" : q.reussi ? "Atteint" : "Non atteint", nl2br(q.appreciation),
    ]));
  } else {
    const qcm = (c.p.formation.contenu?.examenFinal || []).filter((q) => q.options?.length);
    const questions = qcm.length ? qcm : hasEvalContentDedie(c.f.intitule) ? getEvalContent(c.f.intitule).qcmFinal : [];
    if (questions.length) {
      h += `<h2>Questionnaire à choix multiples</h2>`;
      questions.forEach((q, i) => {
        h += `<p><strong>${i + 1}. ${esc(q.question)}</strong></p><p>${q.options.map((op) => `${CASE} ${esc(op)}`).join("<br>")}</p>`;
      });
    }
    const ouvertes = getQuestionsOuvertes(c.f.intitule, c.f.objectifs, c.f.programme).fin || [];
    if (ouvertes.length) {
      h += `<h2>Questions ouvertes</h2>`;
      ouvertes.slice(0, 10).forEach((q, i) => { h += `<p><strong>${i + 1}. ${esc(q.question)}</strong></p>${LIGNES(3)}`; });
    }
    const objectifs = lignesObjectifs(c.f);
    if (objectifs.length) {
      h += `<h2>Évaluation des acquis</h2>`;
      h += tableHTML(["Objectif", "Acquis", "En cours", "Non acquis"], objectifs.map((o) => [esc(o), CASE, CASE, CASE]));
    }
    h += `<p><strong>Note finale :</strong> ____________________</p><p><strong>Appréciation du formateur :</strong></p>${LIGNES(3)}`;
  }
  h += ZONE_SIGNATURE(["L'apprenant", "Le formateur"]);
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

export function emargement(c: Ctx): { html: string; reel: boolean } {
  const maintenant = Date.now();
  let reel = false;
  const rows = c.p.creneaux.map((sl) => {
    const sig = c.a.signatures.find((x) => x.slotId === sl.id);
    const fsig = c.p.session.formateurSignatures?.find((x) => x.slotId === sl.id);
    const passe = (d(sl.fin)?.getTime() || 0) < maintenant;
    if (sig || fsig) reel = true;
    const cellA = sig
      ? `${svgImg(sig.svg)}<div style="font-size:10px;color:#047857">${STATUT[sig.statut] || esc(sig.statut)}${sig.retardMinutes ? ` (${sig.retardMinutes} min)` : ""} — signé le ${dateFr(sig.signeLe)} à ${heure(sig.signeLe)}</div>`
      : passe ? `<span style="font-size:10px;color:#b91c1c">Non signé dans IZILearn</span>` : "";
    const cellF = fsig ? `${svgImg(fsig.svg)}<div style="font-size:10px;color:#047857">signé le ${dateFr(fsig.signeLe)} à ${heure(fsig.signeLe)}</div>` : "";
    return `<tr><td>${dateLongue(sl.debut)}</td><td>${sl.demiJournee === "matin" ? "Matin" : "Après-midi"}</td><td>${heure(sl.debut)} – ${heure(sl.fin)}</td><td style="height:46px">${cellA}</td><td>${esc(sl.formateur || c.f.formateur)}<br>${cellF}</td></tr>`;
  });
  let h = enTete(c, [["Lieu / modalité", c.f.lieu || c.f.modalites]]);
  h += reel ? sourceIzilearn("signatures électroniques horodatées enregistrées dans IZILearn ; les cases vides correspondent à des demi-journées à venir.")
    : trameVierge("Feuille à faire signer par demi-journée (ou émargement électronique depuis IZILearn › Session › Émargement).");
  if (rows.length) {
    h += `<table style="width:100%"><thead><tr><th>Date</th><th>Demi-journée</th><th>Horaires</th><th style="width:26%">Signature de l'apprenant</th><th style="width:22%">Formateur</th></tr></thead><tbody>${rows.join("")}</tbody></table>`;
  } else {
    const jours = joursSession(c.p, c.s, c.f);
    h += `<table style="width:100%"><thead><tr><th>Date</th><th>Demi-journée</th><th>Horaires</th><th style="width:26%">Signature de l'apprenant</th><th style="width:22%">Signature du formateur</th></tr></thead><tbody>${jours.flatMap((x) =>
      ["Matin", "Après-midi"].map((dj) => `<tr><td>${dateLongue(x)}</td><td>${dj}</td><td>____h____ – ____h____</td><td style="height:46px"></td><td></td></tr>`)).join("")}</tbody></table>`;
  }
  return { html: doc(c, "FEUILLE D'ÉMARGEMENT", `${nomComplet(c.s)} – ${c.f.intitule}`, h), reel };
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
  const total = cx.reduce((n, x) => n + (x.secondes || 0), 0);
  let h = `<h3>📋 ${esc(nomComplet(c.s))}</h3><p><strong>Période :</strong> ${dateLongue(c.p.session.dateDebut)} au ${dateLongue(c.p.session.dateFin)}<br><strong>Plateforme :</strong> IZILearn / Google Meet</p>`;
  const jours = new Map<string, Date>();
  for (const sl of c.p.creneaux) {
    const jour = d(sl.debut);
    if (jour && /distanciel|elearning|hybride|mixte/i.test(sl.mode)) jours.set(cleJour(jour), jour);
  }
  if (!c.p.creneaux.length) for (const jour of joursSession(c.p, c.s, c.f)) jours.set(cleJour(jour), jour);
  for (const x of cx) { const jour = d(x.debut); if (jour) jours.set(cleJour(jour), jour); }
  const headers = ["Outil", "Connexion matin", "Déconnexion midi", "Reconnexion", "Déconnexion soir", "Durée totale", "Statut"];
  let renderedDays = 0;
  for (const [key, jour] of [...jours.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    if (renderedDays > 0 && renderedDays % 5 === 0) h += '<div class="page-break"></div>';
    renderedDays++;
    const connexions = cx.filter((x) => { const debut = d(x.debut); return debut && cleJour(debut) === key; });
    const matin = connexions.filter((x) => (d(x.debut)?.getHours() ?? 24) < 12);
    const apresMidi = connexions.filter((x) => (d(x.debut)?.getHours() ?? 0) >= 12);
    const derniereFin = (xs: typeof cx) => xs.filter((x) => x.fin).map((x) => x.fin).sort().at(-1);
    const futur = jour.getTime() > new Date().setHours(0, 0, 0, 0);
    h += `<h4>📅 ${dateLongue(jour)}</h4>`;
    const cells = [
      connexions.length ? [...new Set(connexions.map((x) => x.source === "meet" ? "Google Meet" : "IZILearn"))].join(" / ") : "IZILearn / Google Meet",
      heure(matin[0]?.debut), heure(derniereFin(matin)), heure(apresMidi[0]?.debut), heure(derniereFin(apresMidi)),
      connexions.length ? duree(connexions.reduce((n, x) => n + (x.secondes || 0), 0)) : "",
      connexions.length ? "Connexion relevée" : futur ? "À venir" : "Non relevé",
    ];
    // Exact same table renderer and seven columns as Qualiopi IND 11.
    // Keep the signature outside the table so it does not change its layout.
    h += tableHTML(headers, [cells.map(esc)]);
    h += `<div${connexions.length && !futur ? ' data-learner-signature="recorded-connection"' : ""} style="min-height:60px;margin-top:8px"><strong>Signature du stagiaire :</strong></div>`;
  }
  h += `<p><strong>Temps total relevé :</strong> ${duree(total)} · <strong>Durée formation :</strong> ${esc(c.f.duree)}</p>`;
  const heuresPrevues = c.a.heuresPrevues || c.p.formation.dureeHeures || 0;
  if (heuresPrevues > 0) h += `<p><strong>Taux de connexion relevé :</strong> ${Math.min(100, Math.round(total / (heuresPrevues * 3600) * 100))} %${(d(c.p.session.dateFin)?.getTime() || 0) >= Date.now() ? " (en cours)" : ""}</p>`;
  h += ZONE_SIGNATURE([`Le stagiaire — ${nomComplet(c.s)}`]);
  return { html: buildDocument({ org: c.o, title: "RELEVÉ DES TEMPS DE CONNEXION RÉELS", subtitle: c.f.intitule, formation: c.f, showFormationInfo: true, stagiaires: [c.s], extraHtml: h }), reel: cx.length > 0 };
}
