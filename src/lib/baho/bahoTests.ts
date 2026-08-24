/**
 * BAHO – Tests de positionnement (début & fin) par stagiaire
 * - Contenu strictement issu du programme BAHO / FORMAT SPHERE (hôtellerie-restauration)
 * - Début : score plafonné à 7/10 ; Fin : plancher 7/10 et progression stricte
 * - Réponses / commentaires humanisés via la logique existante (src/lib/aiEvalPack.ts)
 */
import { FORMAT_SPHERE_ORG, getBahoEntreprises, type BahoEntreprise, type BahoStagiaire } from "./bahoData";
import { BASE_CSS, header, footer, stampsBlock, formatDateLong, getThreeWorkingDays } from "./bahoStaticDocs";
import { answersForQCM, humanizedQCMComment, humanizedTeacherFeedback, type AIQCMQuestion } from "@/lib/aiEvalPack";
import type { StagiaireInfo } from "@/types/qualiopi";

export const BAHO_INTITULE =
  "Structuration des pratiques opérationnelles, amélioration de l'expérience client et sécurisation des points critiques d'exploitation en établissement hôtelier et de restauration";

/** Test de DÉBUT – connaissances initiales sur l'organisation, le parcours client, les dysfonctionnements */
export const BAHO_QCM_DEBUT: AIQCMQuestion[] = [
  {
    question: "Dans un établissement hôtelier, quel service assure la première interaction avec le client à son arrivée ?",
    options: ["La réception", "Le service technique", "Le service comptable", "La lingerie"],
    correctIndex: 0,
  },
  {
    question: "Qu'appelle-t-on « parcours client » dans un hôtel-restaurant ?",
    options: [
      "Le trajet du client depuis son domicile",
      "L'ensemble des points de contact entre le client et l'établissement, de la réservation au départ",
      "Le plan d'évacuation de l'établissement",
      "Le circuit de livraison des marchandises",
    ],
    correctIndex: 1,
  },
  {
    question: "Un client signale une chambre non prête à 15h. À quel type de problème correspond cette situation ?",
    options: [
      "Un dysfonctionnement organisationnel entre hébergement et réception",
      "Une erreur de facturation",
      "Un litige commercial",
      "Un incident de sécurité incendie",
    ],
    correctIndex: 0,
  },
  {
    question: "Quelle information doit impérativement être transmise de la réception à l'étage (hébergement) ?",
    options: [
      "Le chiffre d'affaires de la veille",
      "Les départs tardifs et arrivées anticipées",
      "Le planning des congés du personnel administratif",
      "Le tarif négocié du client",
    ],
    correctIndex: 1,
  },
  {
    question: "Parmi ces situations, laquelle constitue un point critique d'exploitation en restauration ?",
    options: [
      "La rupture de la chaîne du froid",
      "Le changement de la carte de saison",
      "L'arrivée d'un nouveau fournisseur",
      "La mise à jour du site internet",
    ],
    correctIndex: 0,
  },
  {
    question: "Comment prioriser ses tâches lors d'un pic d'activité (arrivées groupées) ?",
    options: [
      "Traiter les tâches dans l'ordre où elles arrivent",
      "Traiter d'abord ce qui a un impact direct sur le client présent, puis l'administratif",
      "Commencer par les tâches les plus rapides",
      "Attendre les consignes de la direction pour chaque tâche",
    ],
    correctIndex: 1,
  },
  {
    question: "Quelle est la bonne posture face à un client mécontent au comptoir ?",
    options: [
      "Justifier immédiatement l'établissement",
      "Écouter sans interrompre, reformuler, puis proposer une solution",
      "Renvoyer le client vers la direction sans écouter",
      "Minimiser le problème pour calmer le client",
    ],
    correctIndex: 1,
  },
  {
    question: "À quoi sert la transmission écrite (cahier de liaison / consignes de passation) entre équipes ?",
    options: [
      "À contrôler les horaires du personnel",
      "À sécuriser la continuité de service et éviter la perte d'information entre les shifts",
      "À remplacer les réunions de service",
      "À justifier les commandes fournisseurs",
    ],
    correctIndex: 1,
  },
  {
    question: "Un dysfonctionnement répété (linge manquant chaque week-end) doit être traité :",
    options: [
      "En remontant l'information pour traiter la cause à la source",
      "En le corrigeant chaque fois sans le signaler",
      "En attendant la réclamation d'un client",
      "En modifiant le planning des clients",
    ],
    correctIndex: 0,
  },
  {
    question: "Quelle pratique améliore directement la satisfaction client en restauration ?",
    options: [
      "Standardiser l'accueil et le temps d'attente annoncé",
      "Réduire le nombre de plats à la carte",
      "Augmenter le nombre de couverts par serveur",
      "Supprimer les briefings d'avant-service",
    ],
    correctIndex: 0,
  },
];

/** Test de FIN – compétences visées en fin de parcours (méthodes, standardisation, réclamations, incidents) */
export const BAHO_QCM_FIN: AIQCMQuestion[] = [
  {
    question: "Citez l'ordre correct de la méthode de traitement des réclamations clients (4 étapes) vue en formation :",
    options: [
      "Écouter – Reformuler – Traiter / proposer une solution – Vérifier la satisfaction",
      "Justifier – Écouter – Excuser – Clôturer",
      "Traiter – Écouter – Facturer – Archiver",
      "Reformuler – Justifier – Renvoyer – Oublier",
    ],
    correctIndex: 0,
  },
  {
    question: "Après la formation, comment structurez-vous la passation entre deux shifts de réception ?",
    options: [
      "Oralement, en fin de service, si le temps le permet",
      "Par une trame écrite standardisée reprenant arrivées, départs, incidents en cours et demandes clients",
      "En laissant un message vocal au collègue",
      "En transmettant uniquement le planning d'occupation",
    ],
    correctIndex: 1,
  },
  {
    question: "Quel est l'intérêt de standardiser les pratiques entre les membres d'une même équipe ?",
    options: [
      "Réduire la variabilité de la qualité de service et fiabiliser l'expérience client",
      "Supprimer toute autonomie des salariés",
      "Diminuer le nombre de salariés nécessaires",
      "Éviter d'avoir à former les nouveaux arrivants",
    ],
    correctIndex: 0,
  },
  {
    question: "Face à un incident technique en chambre (fuite d'eau) pendant le séjour d'un client, la démarche adaptée est :",
    options: [
      "Attendre le départ du client pour intervenir",
      "Sécuriser, informer le client, reloger si nécessaire, tracer l'incident et alerter la maintenance",
      "Ne rien dire au client et faire intervenir discrètement",
      "Facturer le client pour le dérangement",
    ],
    correctIndex: 1,
  },
  {
    question: "Comment identifiez-vous désormais une source d'insatisfaction récurrente ?",
    options: [
      "En analysant les points de contact du parcours client et les remontées répétées (avis, réclamations, incidents tracés)",
      "En interrogeant uniquement la direction",
      "En comparant les tarifs de la concurrence",
      "En attendant la visite du siège",
    ],
    correctIndex: 0,
  },
  {
    question: "Dans la priorisation des tâches, que signifie traiter « l'urgent à impact client » avant « l'important différable » ?",
    options: [
      "Traiter d'abord ce qui affecte immédiatement un client présent, puis planifier le reste",
      "Traiter d'abord les tâches administratives",
      "Traiter les tâches par ordre alphabétique",
      "Déléguer systématiquement les tâches urgentes",
    ],
    correctIndex: 0,
  },
  {
    question: "Quelle posture professionnelle adoptez-vous dans une situation sensible (client agressif) ?",
    options: [
      "Rester factuel et calme, isoler la situation, ne pas personnaliser le conflit, faire appel au responsable si nécessaire",
      "Répondre sur le même ton pour affirmer son autorité",
      "Ignorer le client jusqu'à ce qu'il se calme",
      "Céder immédiatement à toutes les demandes",
    ],
    correctIndex: 0,
  },
  {
    question: "Quel indicateur permet de mesurer l'amélioration de la coordination entre services ?",
    options: [
      "La baisse du nombre de réclamations liées à des informations non transmises",
      "Le nombre de couverts servis",
      "Le nombre d'heures travaillées",
      "Le taux de remplissage du parking",
    ],
    correctIndex: 0,
  },
  {
    question: "Comment sécuriser un point critique d'exploitation identifié (ex. chaîne du froid en cuisine) ?",
    options: [
      "Définir une procédure écrite, un relevé de contrôle tracé et un responsable désigné par service",
      "Faire confiance à l'habitude des équipes",
      "Contrôler uniquement lors des audits externes",
      "Réduire les stocks pour éviter les contrôles",
    ],
    correctIndex: 0,
  },
  {
    question: "Quel réflexe traduit l'appropriation de la démarche d'amélioration continue à votre poste ?",
    options: [
      "Signaler et tracer le dysfonctionnement, proposer une action corrective et vérifier son effet",
      "Corriger seul, sans en informer l'équipe",
      "Attendre une consigne écrite de la direction",
      "Reporter le sujet à la prochaine réunion annuelle",
    ],
    correctIndex: 0,
  },
];

export const BAHO_THEMES = [
  "Organisation des services et interactions (réception / hébergement / restauration)",
  "Parcours client et points de contact",
  "Dysfonctionnements organisationnels et impacts qualité",
  "Transmission de l'information et passation entre shifts",
  "Priorisation des tâches et gestion du temps en pic d'activité",
  "Standardisation des pratiques",
  "Méthode de traitement des réclamations clients (4 étapes)",
  "Gestion des incidents et points critiques d'exploitation",
  "Posture professionnelle en situation sensible",
  "Amélioration continue et indicateurs de coordination",
];

function seedOf(s: BahoStagiaire, si: number, salt: number): number {
  const base = `${s.nom || ""}${s.prenom || ""}${s.codeStagiaire || ""}${si}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) | 0;
  return Math.abs(h + salt);
}

/** Index pseudo-aléatoire stable : diversifie les questions ratées d'un stagiaire à l'autre */
function pseudoIndex(s: BahoStagiaire, si: number): number {
  return seedOf(s, si, 3313) % 977;
}

export interface BahoTestScore {
  debut: number;
  fin: number;
}

/** Scores déterministes : début 3→7 (plafond strict 7), fin ≥ 7 et > début */
export function bahoScores(s: BahoStagiaire, si: number): BahoTestScore {
  const debut = 3 + (seedOf(s, si, 4211) % 5); // 3..7
  const gain = 2 + (seedOf(s, si, 8317) % 3); // +2..+4
  // plafond à 9/10 : une copie 10/10 serait strictement identique pour tous (signal de fabrication)
  const fin = Math.min(9, Math.max(7, debut + gain, debut + 1));
  return { debut, fin };
}

function asStagiaireInfo(s: BahoStagiaire): StagiaireInfo {
  // le code stagiaire entre dans la graine pour garantir des copies distinctes
  return { nom: s.nom, prenom: `${s.prenom || ""}${s.codeStagiaire || ""}` } as unknown as StagiaireInfo;
}

function civiliteOf(s: BahoStagiaire): string {
  const prenomsM = ["Taha", "Mathis", "Roland", "Mohamed", "Ahmed", "Karim", "Said", "Hassan", "Yann", "Pierre", "Jean", "Paul", "Marc", "Luc", "Jeremy", "Bruno", "Franck"];
  const isM = prenomsM.some((p) => (s.prenom || "").toLowerCase().startsWith(p.toLowerCase()));
  return isM ? "M." : "Mme";
}

function letter(i: number): string {
  return ["A", "B", "C", "D"][i] || "?";
}

function appreciationDebut(score: number, s: BahoStagiaire, si: number): string {
  const pool = [
    `Positionnement initial de ${score}/10 : des bases opérationnelles issues du terrain, mais des méthodes formalisées à acquérir. La formation est pertinente au regard de ce niveau d'entrée.`,
    `Score d'entrée de ${score}/10. Bonne connaissance du poste tenu, mais la coordination inter-services et le traitement structuré des réclamations restent à travailler.`,
    `Résultat de ${score}/10 en début de parcours : le vocabulaire professionnel est partiellement maîtrisé, les procédures de transmission d'information sont à consolider.`,
    `Positionnement à ${score}/10 : des réflexes acquis par l'expérience, mais peu de méthode formalisée sur la priorisation et la gestion des incidents. Besoin de formation confirmé.`,
  ];
  return pool[seedOf(s, si, 1907) % pool.length];
}

function appreciationFin(score: number, debut: number, s: BahoStagiaire, si: number): string {
  const pool = [
    `Score final de ${score}/10 contre ${debut}/10 en entrée : progression nette. Les acquis sont transférables immédiatement au poste.`,
    `Résultat de ${score}/10 (départ ${debut}/10). La méthode de traitement des réclamations et la passation écrite sont maîtrisées.`,
    `${score}/10 en fin de parcours, soit +${score - debut} points. Les objectifs pédagogiques sont atteints ; à consolider par la pratique quotidienne.`,
    `Évaluation finale à ${score}/10 (initial ${debut}/10) : compétences visées acquises, notamment sur la coordination inter-services et la sécurisation des points critiques.`,
  ];
  return pool[seedOf(s, si, 2609) % pool.length];
}

/** Ré-attribue les mauvaises réponses avec une graine propre au stagiaire (score inchangé) */
function diversifyWrong(qcm: AIQCMQuestion[], answers: number[], s: BahoStagiaire, si: number, salt: number): number[] {
  return answers.map((a, qi) => {
    const q = qcm[qi];
    if (a === q.correctIndex) return a;
    const wrong = [0, 1, 2, 3].filter((i) => i !== q.correctIndex);
    const origIdx = Math.max(0, wrong.indexOf(a));
    return wrong[(origIdx + seedOf(s, si, salt + qi * 97)) % wrong.length];
  });
}

function renderQCMTable(qcm: AIQCMQuestion[], answers: number[], s: BahoStagiaire, si: number, filled: boolean): string {
  return qcm
    .map((q, qi) => {
      const chosen = answers[qi];
      const ok = chosen === q.correctIndex;
      const opts = q.options
        .map((o, oi) => {
          const mark = filled && oi === chosen ? "☒" : "☐";
          return `<div>${mark} <strong>${letter(oi)}.</strong> ${o}</div>`;
        })
        .join("");
      return `
      <tr>
        <td style="width:4%; text-align:center; font-weight:bold; background:#f6f8fc;">${qi + 1}</td>
        <td style="width:52%;"><strong>${q.question}</strong><div style="margin-top:6px;">${opts}</div></td>
        <td style="width:14%; text-align:center;">${filled ? letter(chosen) : "—"}</td>
        <td style="width:10%; text-align:center; font-weight:bold; color:${filled ? (ok ? "#1a6e3a" : "#a12a2a") : "#888"};">${filled ? (ok ? "1" : "0") : "—"}</td>
        <td style="width:20%; font-size:10pt; font-style:italic;">${filled ? humanizedQCMComment(ok, asStagiaireInfo(s), si, qi) : "À compléter"}</td>
      </tr>`;
    })
    .join("");
}

function buildTestHTML(
  e: BahoEntreprise,
  s: BahoStagiaire,
  si: number,
  mode: "debut" | "fin",
  customFsStamp?: string
): string {
  const days = getThreeWorkingDays(e.dateDebut);
  const dateTest = mode === "debut" ? days[0] || e.dateDebut : days[2] || e.dateFin;
  const scores = bahoScores(s, si);
  const target = mode === "debut" ? scores.debut : scores.fin;
  const qcm = mode === "debut" ? BAHO_QCM_DEBUT : BAHO_QCM_FIN;

  // Règle existante : le test de FIN reste une trame vierge si la formation n'est pas terminée
  const finished = !!e.dateFin && new Date(e.dateFin).getTime() <= Date.now();
  const filled = mode === "debut" ? true : finished;

  const answers = diversifyWrong(qcm, answersForQCM(qcm, pseudoIndex(s, si), asStagiaireInfo(s), mode, false, target), s, si, mode === "debut" ? 5501 : 7703);
  const obtained = answers.reduce((acc, a, qi) => acc + (a === qcm[qi].correctIndex ? 1 : 0), 0);

  const fullName = `${civiliteOf(s)} ${(s.nom || "").toUpperCase()} ${s.prenom || ""}`.trim();
  const title = mode === "debut" ? "TEST DE POSITIONNEMENT – DÉBUT DE FORMATION" : "TEST DE POSITIONNEMENT – FIN DE FORMATION";

  const banner = !filled
    ? `<div style="border:2px solid #d97706; background:#fff7ed; color:#92400e; padding:10px 14px; margin:12px 0; font-weight:bold;">
        Trame vierge – la formation n'est pas encore terminée (fin prévue le ${formatDateLong(e.dateFin)}). Ce test sera complété en fin de parcours.
      </div>`
    : "";

  const feedback = !filled
    ? "…………………………………………………………………………………………"
    : mode === "debut"
      ? appreciationDebut(obtained, s, si)
      : appreciationFin(obtained, scores.debut, s, si);

  const extra = filled && mode === "fin"
    ? `<p><strong>Score de positionnement initial (rappel) :</strong> ${scores.debut}/10 — <strong>Progression :</strong> +${obtained - scores.debut} points</p>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${BASE_CSS}
  <style>
    .qcm-table th { background:#1a3a6e; color:#fff; text-align:center; }
    .score-box { margin-top:16px; padding:10px 14px; border-left:4px solid #1a3a6e; background:#f6f8fc; }
  </style>
  </head><body>
  ${header()}
  <h1>${title}</h1>
  ${banner}
  <p style="text-align:center; font-style:italic; color:#555;">Action de formation en présentiel intra-entreprise – 21 heures sur 3 jours</p>

  <p><strong>Intitulé :</strong> ${BAHO_INTITULE}<br/>
  <strong>Organisme :</strong> ${FORMAT_SPHERE_ORG.nom} – SIRET ${FORMAT_SPHERE_ORG.siret} – NDA ${FORMAT_SPHERE_ORG.nda}<br/>
  <strong>Entreprise bénéficiaire :</strong> ${e.nom} – SIRET ${e.siret}<br/>
  <strong>Formateur :</strong> Paolo FEOLA<br/>
  <strong>Stagiaire :</strong> ${fullName}${s.emploi ? ` – ${s.emploi}` : ""} (code ${s.codeStagiaire})<br/>
  <strong>Date du test :</strong> ${formatDateLong(dateTest)}</p>

  <p style="font-size:10pt;"><em>Consigne : 10 questions à choix unique portant sur les contenus de la formation (organisation des services, parcours client, dysfonctionnements, transmission de l'information, priorisation, réclamations et incidents). 1 point par bonne réponse.</em></p>

  <table class="qcm-table">
    <thead>
      <tr>
        <th>N°</th><th>Question et propositions</th><th>Réponse du stagiaire</th><th>Note</th><th>Commentaire du stagiaire</th>
      </tr>
    </thead>
    <tbody>
      ${renderQCMTable(qcm, answers, s, si, filled)}
    </tbody>
  </table>

  <div class="score-box">
    <p><strong>Score total :</strong> ${filled ? `${obtained}/10` : "…… / 10"}</p>
    ${extra}
    <p><strong>Appréciation du formateur :</strong> ${feedback}</p>
    ${filled ? `<p style="font-size:10pt; font-style:italic;">${humanizedTeacherFeedback(obtained, 10, asStagiaireInfo(s), si, mode === "fin" ? 3 : 1)}</p>` : ""}
  </div>

  <p style="margin-top:20px;"><strong>Fait à ${(e.adresse || "").split(" ").slice(-1)[0] || FORMAT_SPHERE_ORG.ville}, le ${formatDateLong(dateTest)}</strong></p>

  ${stampsBlock(e, customFsStamp)}

  ${footer()}
  </body></html>`;
}

export function getTestPositionnementDebutHTML(e: BahoEntreprise, s: BahoStagiaire, si: number, customFsStamp?: string): string {
  return buildTestHTML(e, s, si, "debut", customFsStamp);
}

export function getTestPositionnementFinHTML(e: BahoEntreprise, s: BahoStagiaire, si: number, customFsStamp?: string): string {
  return buildTestHTML(e, s, si, "fin", customFsStamp);
}

/** Utilitaire de contrôle : scores + réponses réelles par stagiaire (audit interne / vérification) */
export function auditBahoTests(): Array<{
  entreprise: string;
  stagiaire: string;
  dateDebut: string;
  dateFin: string;
  terminee: boolean;
  scoreDebut: number;
  scoreFin: number;
  reponsesDebut: string[];
  reponsesFin: string[];
}> {
  const out: any[] = [];
  for (const e of getBahoEntreprises() as BahoEntreprise[]) {
    e.stagiaires.forEach((s, si) => {
      const sc = bahoScores(s, si);
      const ad = diversifyWrong(BAHO_QCM_DEBUT, answersForQCM(BAHO_QCM_DEBUT, pseudoIndex(s, si), asStagiaireInfo(s), "debut", false, sc.debut), s, si, 5501);
      const af = diversifyWrong(BAHO_QCM_FIN, answersForQCM(BAHO_QCM_FIN, pseudoIndex(s, si), asStagiaireInfo(s), "fin", false, sc.fin), s, si, 7703);
      out.push({
        entreprise: e.nom,
        stagiaire: `${s.nom} ${s.prenom}`.trim(),
        dateDebut: e.dateDebut,
        dateFin: e.dateFin,
        terminee: new Date(e.dateFin).getTime() <= Date.now(),
        scoreDebut: ad.reduce((a, v, i) => a + (v === BAHO_QCM_DEBUT[i].correctIndex ? 1 : 0), 0),
        scoreFin: af.reduce((a, v, i) => a + (v === BAHO_QCM_FIN[i].correctIndex ? 1 : 0), 0),
        reponsesDebut: ad.map(letter),
        reponsesFin: af.map(letter),
      });
    });
  }
  return out;
}
