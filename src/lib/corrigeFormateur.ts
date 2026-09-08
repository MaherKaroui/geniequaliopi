/**
 * Corrigés formateur enrichis — Indicateur 11 (évaluation des acquis en cours de formation).
 *
 * Chaque exercice généré est accompagné d'un corrigé formateur en 4 parties :
 *   1. Consigne détaillée
 *   2. Réponse attendue développée
 *   3. Critères d'évaluation et barème (/20, seuil, éliminatoires)
 *   4. Erreurs fréquentes et remédiation
 * Plus, une fois par formation, un guide de passation destiné au formateur.
 *
 * Le contenu métier vient prioritairement des packs IA (aiContentPack / aiEvalPack).
 * Les fonctions ci-dessous se contentent de le mettre en forme, avec un repli
 * structuré (jamais vide) lorsque le pack n'expose pas encore les champs enrichis.
 */
import type { FormationInfo } from "@/types/qualiopi";

export interface CritereEvaluation {
  critere: string;
  indicateur: string;
  points: number;
}

export interface ErreurFrequente {
  erreur: string;
  lacune: string;
  remediation: string;
}

/** Champs enrichis facultatifs portés par un exercice (issus du pack IA). */
export interface CorrigeFormateurData {
  consigneDetaillee?: string;
  dureeAllouee?: string;
  conditionsRealisation?: string;
  materielFourni?: string;
  livrableAttendu?: string;
  reponseDeveloppee?: string;
  criteresEvaluation?: CritereEvaluation[];
  seuilValidation?: string;
  criteresEliminatoires?: string[];
  erreursFrequentes?: ErreurFrequente[];
}

export interface ExerciceEnrichi extends CorrigeFormateurData {
  titre: string;
  consigne: string;
  reponseAttendue: string;
  points?: number;
}

const esc = (v: unknown) => String(v ?? "");

function nl2br(txt: string): string {
  return esc(txt).replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br/>");
}

/** Barème de repli : 20 points répartis sur 5 critères observables. */
function baremeParDefaut(f: FormationInfo): CritereEvaluation[] {
  const metier = f.intitule || "la formation";
  return [
    { critere: "Préparation du poste et respect des consignes de sécurité", indicateur: "EPI portés, poste et matériel préparés avant intervention, consignes rappelées appliquées", points: 4 },
    { critere: "Respect de la procédure et de l'ordre opératoire", indicateur: `Toutes les étapes de la procédure vue en formation sur « ${metier} » sont réalisées dans le bon ordre, sans omission`, points: 5 },
    { critere: "Maîtrise technique et qualité d'exécution", indicateur: "Gestes, outils, valeurs et réglages conformes aux préconisations ; livrable exploitable en l'état", points: 5 },
    { critere: "Autonomie et rythme de réalisation", indicateur: "Travail conduit dans le temps alloué, sans sollicitation du formateur au-delà de deux aides ponctuelles", points: 3 },
    { critere: "Contrôle final, traçabilité et restitution", indicateur: "Auto-contrôle réalisé, anomalies repérées et corrigées, informations tracées et restituées clairement", points: 3 },
  ];
}

function erreursParDefaut(f: FormationInfo): ErreurFrequente[] {
  const metier = f.intitule || "la formation";
  return [
    { erreur: "Démarrage de l'exercice sans avoir lu la consigne jusqu'au bout", lacune: "Analyse de la demande insuffisante ; le livrable produit ne correspond pas à l'attendu", remediation: "Faire reformuler la consigne à voix haute avant reprise, puis relancer l'exercice sur un cas court" },
    { erreur: "Étapes de la procédure inversées ou sautées", lacune: "Ordre opératoire non mémorisé", remediation: "Reprise de la fiche procédure, exercice de remise en ordre des étapes, puis nouvelle mise en situation accompagnée" },
    { erreur: "Non-respect ou oubli des règles de sécurité et des EPI", lacune: "Prévention des risques non intégrée", remediation: "Rappel individuel immédiat, arrêt de l'exercice, reprise après contrôle du poste et validation par le formateur" },
    { erreur: "Absence de contrôle final du travail réalisé", lacune: "Posture d'auto-évaluation non acquise", remediation: "Mise en place systématique de la grille d'auto-contrôle avant remise du livrable sur les exercices suivants" },
    { erreur: "Vocabulaire professionnel approximatif dans la restitution", lacune: `Terminologie propre à « ${metier} » encore fragile`, remediation: "Fiche lexique remise au stagiaire, restitution orale reprise en fin de séance" },
  ];
}

function tableHtml(headers: string[], rows: (string | number)[][]): string {
  const th = headers.map(h => `<th>${esc(h)}</th>`).join("");
  const tr = rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("");
  return `<table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
}

/**
 * Corrigé formateur complet d'un exercice, en 4 parties titrées.
 * `ex` peut porter les champs enrichis du pack IA ; sinon un repli structuré est produit.
 */
export function renderCorrigeFormateurHTML(ex: ExerciceEnrichi, f: FormationInfo, index?: number): string {
  const num = typeof index === "number" ? `${index + 1}. ` : "";
  const duree = ex.dureeAllouee || "45 minutes";
  const conditions = ex.conditionsRealisation || "Travail individuel, sur poste de travail équipé, supports de cours et fiches procédures autorisés.";
  const materiel = ex.materielFourni || "Supports de formation, fiches techniques, outillage et consommables du plateau technique.";
  const livrable = ex.livrableAttendu || "Le travail réalisé, accompagné de la justification orale ou écrite des choix opérés.";

  const criteres = ex.criteresEvaluation?.length ? ex.criteresEvaluation : baremeParDefaut(f);
  const total = criteres.reduce((a, c) => a + (Number(c.points) || 0), 0);
  const seuil = ex.seuilValidation || "12/20";
  const eliminatoires = ex.criteresEliminatoires?.length
    ? ex.criteresEliminatoires
    : ["Non-port des équipements de protection individuelle", "Non-respect d'une consigne de sécurité explicite", "Remise d'un livrable non conforme aux exigences de sécurité du poste"];
  const erreurs = ex.erreursFrequentes?.length ? ex.erreursFrequentes : erreursParDefaut(f);

  let h = `<div class="section"><h4>${num}CONSIGNE DÉTAILLÉE</h4>`;
  h += `<p>${nl2br(ex.consigneDetaillee || ex.consigne)}</p>`;
  h += tableHtml(["Élément", "Précision"], [
    ["Matériel / documents mis à disposition", materiel],
    ["Livrable attendu", livrable],
    ["Durée allouée", duree],
    ["Conditions de réalisation", conditions],
  ]);
  h += `</div>`;

  h += `<div class="section section-green"><h4>${num}RÉPONSE ATTENDUE DÉVELOPPÉE</h4>`;
  h += `<p>${nl2br(ex.reponseDeveloppee || ex.reponseAttendue)}</p>`;
  if (!ex.reponseDeveloppee) {
    h += `<p>Le déroulé attendu suit l'ordre opératoire vu en formation : préparation et sécurisation du poste, analyse de la demande et identification des références, réalisation des étapes techniques dans l'ordre, contrôle intermédiaire à chaque point critique, finition, auto-contrôle du résultat, traçabilité de l'intervention et restitution au client ou au responsable.</p>`;
  }
  h += `</div>`;

  h += `<div class="section"><h4>${num}CRITÈRES D'ÉVALUATION ET BARÈME</h4>`;
  h += tableHtml(["Critère observable", "Indicateur de réussite", "Points"],
    criteres.map(c => [c.critere, c.indicateur, `${c.points}`]));
  h += `<p><strong>Total : ${total} / 20 — Seuil de validation : ${esc(seuil)}</strong></p>`;
  h += `<p><strong>Critères éliminatoires :</strong> ${eliminatoires.map(esc).join(" ; ")}. Un critère éliminatoire entraîne la non-validation de l'exercice quel que soit le total obtenu.</p>`;
  h += `</div>`;

  h += `<div class="section"><h4>${num}ERREURS FRÉQUENTES ET REMÉDIATION</h4>`;
  h += tableHtml(["Erreur observée", "Lacune révélée", "Remédiation proposée"],
    erreurs.map(e => [e.erreur, e.lacune, e.remediation]));
  h += `</div>`;
  return h;
}

/** Guide de passation destiné au formateur — une fois par formation. */
export function renderGuidePassationHTML(f: FormationInfo, guide?: string): string {
  if (guide && guide.trim()) {
    return `<div class="section"><h3>GUIDE DE PASSATION – À L'USAGE DU FORMATEUR</h3><p>${nl2br(guide)}</p></div>`;
  }
  const metier = f.intitule || "la formation";
  let h = `<div class="section"><h3>GUIDE DE PASSATION – À L'USAGE DU FORMATEUR</h3>`;
  h += `<h4>Introduire l'exercice</h4><p>Annoncer l'objectif de l'exercice et la compétence évaluée du référentiel de « ${metier} », lire la consigne à voix haute, montrer le matériel et les documents autorisés, préciser la durée allouée et le seuil de validation, puis vérifier la bonne compréhension en faisant reformuler la consigne par un stagiaire.</p>`;
  h += `<h4>Ce que le formateur peut faire, ce qu'il ne peut pas faire</h4>`;
  h += tableHtml(["Autorisé", "Non autorisé"], [
    ["Reformuler la consigne, rappeler l'emplacement d'une ressource, interrompre pour un motif de sécurité", "Indiquer l'étape suivante, corriger un geste technique évaluable, valider une réponse en cours d'épreuve"],
    ["Répondre à une question de vocabulaire", "Réaliser tout ou partie du livrable à la place du stagiaire"],
  ]);
  h += `<h4>Tracer l'observation</h4><p>Renseigner la grille de critères au fil de l'eau, pendant la réalisation et non après : cocher chaque indicateur observé, noter l'heure de début et de fin, consigner les aides apportées et tout écart de sécurité. La grille signée et datée constitue la preuve de l'évaluation au titre de l'indicateur 11.</p>`;
  h += `<h4>Restituer au stagiaire</h4><p>Restitution individuelle dans les minutes qui suivent : rappeler le résultat critère par critère, nommer deux points forts et un axe de progrès, proposer l'action de remédiation correspondante et fixer l'échéance de reprise. La restitution est tracée dans le suivi individuel du stagiaire.</p>`;
  h += `</div>`;
  return h;
}

/** Trame vierge enrichie remise au stagiaire pour un exercice. */
export function renderTrameExerciceHTML(ex: ExerciceEnrichi, f: FormationInfo, index: number): string {
  const duree = ex.dureeAllouee || "45 minutes";
  const conditions = ex.conditionsRealisation || "Travail individuel — supports de cours et fiches procédures autorisés.";
  const livrable = ex.livrableAttendu || "Le travail réalisé et la justification de vos choix.";
  const lignes = (n: number) =>
    Array.from({ length: n }, () => `<p style="border-bottom:1px solid #bbb;height:22px;margin:0 0 10px 0;">&nbsp;</p>`).join("");

  const etapes = [
    "Étape 1 — Préparation : analyse de la demande, matériel et sécurité",
    "Étape 2 — Réalisation : décrivez chaque opération dans l'ordre",
    "Étape 3 — Contrôles effectués : valeurs, mesures, points vérifiés",
    "Étape 4 — Finition, traçabilité et restitution",
  ];

  let h = `<h3>EXERCICE ${index + 1} — ${esc(ex.titre)}</h3>`;
  h += `<div class="section"><p><strong>Consigne :</strong></p><p>${nl2br(ex.consigneDetaillee || ex.consigne)}</p>`;
  h += tableHtml(["Durée allouée", "Conditions", "Livrable attendu", "Barème"], [[duree, conditions, livrable, "/20 — validation à 12/20"]]);
  h += `</div>`;
  etapes.forEach(t => {
    h += `<p><strong>${t}</strong></p>${lignes(5)}`;
  });
  h += `<p><strong>Justification de vos choix / difficultés rencontrées :</strong></p>${lignes(4)}`;
  h += `<h4>Auto-évaluation (à compléter par le stagiaire)</h4>`;
  h += tableHtml(["Je sais…", "Acquis", "En cours", "À revoir"], [
    ["Préparer mon poste et appliquer les consignes de sécurité", "☐", "☐", "☐"],
    ["Réaliser toutes les étapes dans le bon ordre", "☐", "☐", "☐"],
    ["Utiliser les outils et les valeurs attendues", "☐", "☐", "☐"],
    ["Contrôler mon travail et corriger mes écarts", "☐", "☐", "☐"],
    ["Expliquer et tracer mon intervention", "☐", "☐", "☐"],
  ]);
  h += `<p><strong>Ce que je souhaite retravailler avec le formateur :</strong></p>${lignes(2)}`;
  return h;
}
