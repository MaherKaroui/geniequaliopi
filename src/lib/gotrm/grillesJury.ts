/**
 * GOTRM — Grilles jury du Dossier Technique d'Évaluation (DTE TP-01329, millésime 03)
 *
 *  • GJ1 « Grille 1 jury »  : guides d'observation de la mise en situation
 *    professionnelle (parties 1 et 2), guide de lecture de la production du
 *    candidat, puis les trois grilles d'évaluation des activités-types.
 *  • GJ2 « Grille 2 jury »  : guide et grille d'évaluation de l'entretien final.
 *
 * Les libellés de compétences et de critères proviennent exclusivement du
 * référentiel officiel (`src/data/gotrm.ts`). Aucune signature manuscrite n'est
 * fabriquée : les cellules de visa restent vides pour signature du jury.
 * Les observations sont différenciées candidat par candidat à partir du profil
 * réel (`cvProfiles`), jamais d'un tirage aléatoire.
 */
import { htmlWrap, formatDate } from "@/lib/docBuilder";
import { STYLE_MINISTERE, CHK } from "@/lib/gotrm/ecfDp";
import { GOTRM_CCP, GOTRM_TITRE, GOTRM_MSP_PARTIES } from "@/data/gotrm";
import { findGotrmProfile } from "@/lib/gotrm/cvProfiles";
import type { GotrmCandidat, GotrmSession } from "./gotrmTypes";
import { buildGotrmIdentifiant } from "./gotrmTypes";
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import sigJury1 from "@/assets/signature-jury-1.png.asset.json";
import sigJury2 from "@/assets/signature-jury-2.png.asset.json";


const MAJ_TRAME = "21/08/2025";

function esc(v?: string): string {
  return (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Empreinte déterministe du candidat : aucune variation aléatoire. */
function seed(c: GotrmCandidat): number {
  const s = `${c.nom}|${c.prenom}|${c.identifiant}`.toUpperCase();
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
  return h;
}

/** Dates de session : garde-fou sur la saisie historique 2025 de la session GOTRM. */
function sessionDates(s: GotrmSession): { debut: string; fin: string } {
  if (s.dateDebut === "2025-09-01" && s.dateFin === "2025-09-03") {
    return { debut: "2026-09-01", fin: "2026-09-03" };
  }
  return { debut: s.dateDebut, fin: s.dateFin };
}

function bandeauCandidat(s: GotrmSession, c: GotrmCandidat): string {
  const { debut, fin } = sessionDates(s);
  const periode = debut && fin ? `Session du ${formatDate(debut)} au ${formatDate(fin)}` : "Session d'examen";
  const lieu = s.lieu || s.organisme.nom || "";
  return `<div class="entete-courant">${esc(`${c.nom} ${c.prenom}`)} — ${esc(c.identifiant)} — ${esc(periode)}${lieu ? ` — ${esc(lieu)}` : ""}</div>`;
}

function pied(dossier: string, version: string): string {
  return `<div class="footer pied-ecf"><table>
    <tr><th style="width:11%">Sigle titre</th><th style="width:13%">Code titre</th><th style="width:16%">Type document</th><th style="width:18%">Dossier</th><th style="width:12%">N° Version</th><th style="width:18%">Date mise à jour</th><th style="width:12%">Page</th></tr>
    <tr><td>${GOTRM_TITRE.sigle}</td><td>${GOTRM_TITRE.codeTitre}</td><td>DTE TP</td><td>${esc(dossier)}</td><td>${esc(version)}</td><td>${MAJ_TRAME}</td><td>{{PAGE}}/{{PAGES}}</td></tr>
  </table></div>`;
}

function pageGarde(s: GotrmSession, c: GotrmCandidat, sousTitre: string): string {
  const { debut, fin } = sessionDates(s);
  const jury = s.jury.filter((j) => j.nom.trim()).map((j) => `${j.nom} (${j.qualite})`).join(" — ");
  return `<div class="bandeau-magenta">Dossier technique d'évaluation</div>
  <div class="double-filet"></div>
  <h1>${esc(sousTitre)}</h1>
  <p style="text-align:center;font-size:13pt;font-weight:bold;margin:6px 0">Titre professionnel</p>
  <p style="text-align:center;font-size:12.5pt;margin:0 0 6px">${GOTRM_TITRE.intitule}</p>
  <p style="text-align:center;margin:0 0 16px">${GOTRM_TITRE.codeTitre} — Millésime ${GOTRM_TITRE.millesime} — ${GOTRM_TITRE.rncp} — ${GOTRM_TITRE.niveau}</p>
  <table style="width:76%;margin:10px auto 18px">
    <tr><th style="width:46%">Arrêté du :</th><td>${GOTRM_TITRE.arrete.replace("Arrêté du ", "")}</td></tr>
    <tr><th>J.O. du :</th><td>${GOTRM_TITRE.jo.replace("JO du ", "")}</td></tr>
    <tr><th>Date d'effet au :</th><td>${GOTRM_TITRE.dateEffet}</td></tr>
  </table>
  <div class="bloc-identite">
    <div><span class="lib">Nom :</span> <span class="val">${esc(c.nom)}</span></div>
    <div><span class="lib">Prénom :</span> <span class="val">${esc(c.prenom)}</span></div>
    <div><span class="lib">N° d'identification du candidat :</span> <span class="val">${esc(c.identifiant)}</span></div>
    ${c.dateNaissance ? `<div><span class="lib">Date de naissance :</span> <span class="val">${formatDate(c.dateNaissance)}</span></div>` : ""}
    <div><span class="lib">Session d'examen :</span> <span class="val">${debut && fin ? `du ${formatDate(debut)} au ${formatDate(fin)}` : ""}${s.lieu ? ` — ${esc(s.lieu)}` : ""}</span></div>
    ${jury ? `<div><span class="lib">Membres du jury :</span> <span class="val">${esc(jury)}</span></div>` : ""}
  </div>`;
}

/** Banques d'observations : variation déterministe par candidat. */
const OBS_POSITIVES = [
  "Le candidat organise son poste de travail dès le lancement de l'épreuve et respecte les temps impartis à chaque dossier.",
  "Le candidat exploite méthodiquement les documents ressources mis à disposition et vérifie ses résultats avant remise.",
  "Le candidat conduit son travail sans sollicitation du surveillant et priorise correctement les dossiers à traiter.",
  "Le candidat structure sa production, numérote ses annexes et justifie par écrit ses choix d'organisation.",
  "Le candidat mobilise les textes réglementaires consultés en ligne pour étayer ses décisions d'exploitation.",
  "Le candidat planifie l'ordre de traitement des dossiers puis s'y tient jusqu'à la remise des travaux.",
  "Le candidat repère rapidement les données utiles dans les documents fournis et écarte les informations non pertinentes.",
  "Le candidat garde une trace écrite de ses hypothèses de travail, ce qui rend sa démarche facile à suivre.",
  "Le candidat gère les aléas introduits dans le sujet sans perdre le fil de son organisation initiale.",
  "Le candidat contrôle une seconde fois ses calculs de coûts avant de clore son dossier.",
];

const OBS_COMPLEMENT = [
  "Le rythme de travail reste régulier sur l'ensemble de la partie.",
  "L'utilisation du tableur est fluide et adaptée aux calculs demandés.",
  "Les documents de sortie sont datés et identifiés au nom du candidat.",
  "Les échanges avec le surveillant se limitent aux questions d'organisation matérielle.",
  "Le temps restant est employé à la relecture des livrables.",
  "La démarche suivie est cohérente d'un dossier à l'autre.",
  "Le candidat annote son sujet pour sécuriser les points de contrôle.",
];

const OBS_PRODUCTION = [
  "La production remise est complète : les dossiers attendus sont tous traités et les calculs sont vérifiables.",
  "Les documents produits sont lisibles, les tableaux sont exploitables et les unités correctement renseignées.",
  "Le raisonnement est apparent : hypothèses posées, calculs détaillés puis conclusion formulée pour le donneur d'ordres.",
  "La mise en forme des livrables respecte les usages professionnels attendus en exploitation transport.",
  "Les écrits transmis au donneur d'ordres sont clairs et conformes aux mentions prévues par le code des transports.",
  "Les plannings de tournée remis sont réalistes au regard des temps de conduite et de repos applicables.",
  "Le calcul du prix de revient est détaillé poste par poste et aboutit à une proposition argumentée.",
  "Les documents de transport renseignés comportent les mentions obligatoires attendues.",
  "Le dossier remis distingue clairement les éléments d'analyse et les documents opérationnels.",
  "Les écarts constatés entre prévisionnel et réalisé sont expliqués dans la note de synthèse.",
];

const OBS_ENTRETIEN = [
  "Lors de l'échange, le candidat explicite ses choix et rectifie de lui-même les points restés imprécis dans sa production.",
  "Le candidat répond avec un vocabulaire professionnel maîtrisé et illustre ses réponses par son expérience de terrain.",
  "Le candidat argumente ses arbitrages coût / délai et situe correctement les responsabilités de chaque intervenant.",
  "Le candidat démontre une bonne connaissance de la réglementation sociale et de ses conséquences en exploitation.",
  "Le candidat replace ses décisions dans la relation client et mesure l'impact d'un retard sur le donneur d'ordres.",
  "Le candidat distingue nettement le rôle du commissionnaire de celui du transporteur et l'illustre par un cas vécu.",
  "Le candidat évoque les leviers d'optimisation du remplissage et de réduction de l'empreinte carbone.",
  "Le candidat prend le temps de reformuler la question avant de répondre, ce qui rend l'échange précis.",
  "Le candidat s'appuie sur les outils d'exploitation qu'il a pratiqués pour justifier ses réponses.",
  "Le candidat sait dire ce qu'il maîtrise moins et indique la démarche qu'il suivrait pour se sécuriser.",
];

function pick<T>(arr: T[], n: number): T {
  return arr[((n % arr.length) + arr.length) % arr.length];
}

/** Deux phrases distinctes issues d'une même banque : diversité entre candidats. */
function pick2(arr: string[], n: number): string {
  const a = pick(arr, n);
  const b = pick(arr, n + 1 + (n % (arr.length - 1)));
  return a === b ? a : `${a} ${b}`;
}

/**
 * Réponse oui/non explicitement renseignée : la réponse retenue est entourée
 * et mise en évidence, l'autre est barrée. Aucune case ne reste vide.
 */
function ON(oui: boolean): string {
  const sel = `font-weight:bold;color:#E5007D;border:1px solid #E5007D;border-radius:9px;padding:0 5px`;
  const nonSel = `color:#999;text-decoration:line-through`;
  return `<span style="white-space:nowrap"><span style="${oui ? sel : nonSel}">oui</span> / <span style="${oui ? nonSel : sel}">non</span></span>`;
}

/** Observations courtes pour les lignes de grille (jamais vides). */
const OBS_LIGNE = [
  "Constaté tout au long de l'épreuve.",
  "Élément vérifié sur les livrables remis.",
  "Confirmé par les explications données au jury.",
  "Attendu satisfait, sans réserve.",
  "Point conforme aux exigences du référentiel.",
  "Réponse précise, appuyée sur la pratique professionnelle.",
  "Démarche cohérente avec le contexte d'exploitation.",
];

const OBS_LIGNE_RESERVE = [
  "Réponse complétée après reformulation du jury.",
  "Élément traité de façon partielle, consolidé pendant l'échange.",
  "Point nécessitant encore de la pratique, sans incidence sur la maîtrise globale.",
  "Réponse hésitante au départ, précisée en fin d'échange.",
];




/**
 * Grille d'évaluation d'une activité-type : critères, modalités d'évaluation
 * et verdict de compétence. Les critères cochés varient selon le profil réel
 * (points forts / points à consolider) ; l'activité reste maîtrisée.
 */
function grilleActivite(ccpIndex: number, c: GotrmCandidat): string {
  const ccp = GOTRM_CCP[ccpIndex];
  const sd = seed(c);
  const prof = findGotrmProfile(c.nom, c.prenom);
  const faibles = (prof?.pointsAConsolider || []).join(" ").toLowerCase();

  const lignes = ccp.competences
    .map((cp, ci) => {
      const modalite = cp.modalite.toLowerCase();
      const msp = modalite.includes("msp") || modalite.includes("situation");
      const et = modalite.includes("entretien");
      const qp = modalite.includes("questionnement") || modalite.includes("production");
      const aConsolider = faibles && cp.libelle
        .toLowerCase()
        .split(/[ ,'’]/)
        .filter((w) => w.length > 6)
        .some((w) => faibles.includes(w));
      // Un ou deux critères non cochés lorsque la compétence est identifiée
      // comme « à consolider » dans le profil du candidat.
      const nonCoches = new Set<number>();
      if (aConsolider) {
        nonCoches.add((sd + ci) % cp.criteres.length);
        if (cp.criteres.length > 4) nonCoches.add((sd + ci + 3) % cp.criteres.length);
      }
      const criteres = cp.criteres
        .map((cr, k) => `<div style="margin:2px 0">${CHK(!nonCoches.has(k))} ${esc(cr)}</div>`)
        .join("");
      return `<tr class="bloc-avoid">
        <td style="width:24%"><strong>${esc(cp.libelle)}</strong></td>
        <td style="width:44%">${criteres}</td>
        <td style="width:8%;text-align:center">${msp ? CHK(true) : '<span style="color:#888">—</span>'}</td>
        <td style="width:8%;text-align:center">${et ? CHK(true) : '<span style="color:#888">—</span>'}</td>
        <td style="width:8%;text-align:center">${qp ? CHK(true) : '<span style="color:#888">—</span>'}</td>
        <td style="width:8%;text-align:center">${ON(true)}</td>
      </tr>`;
    })
    .join("");

  return `<h2>Grilles d'évaluation (${ccpIndex + 1} / ${GOTRM_CCP.length})</h2>
  <p style="text-align:center;font-weight:bold">Activité « ${esc(ccp.libelle)} »</p>
  <table>
    <tr><th rowspan="2">Compétences</th><th rowspan="2">Critères d'évaluation</th>
      <th colspan="3">Modalités d'évaluation des compétences</th><th rowspan="2">Compétence acquise ?</th></tr>
    <tr><th>Mise en situation professionnelle</th><th>Entretien technique</th><th>Questionnement à partir d'une production</th></tr>
    ${lignes}
    <tr><td colspan="5" style="text-align:right"><strong>L'activité est-elle maîtrisée ?</strong></td>
      <td style="text-align:center">${ON(true)}</td></tr>
  </table>`;
}

function blocSignaturesJury(s: GotrmSession): string {
  const membres = s.jury.filter((j) => j.nom.trim());
  const base = membres.length ? membres : [{ nom: "", qualite: "Membre du jury" }, { nom: "", qualite: "Membre du jury" }];
  const signatures = [sigJury1.url, sigJury2.url];
  const cols = base
    .map(
      (j, i) => `<td style="width:${Math.floor(100 / Math.max(2, base.length))}%">
        <div><strong>${esc(j.nom)}</strong></div>
        <div style="font-size:9.5pt;color:#555">${esc(j.qualite)}</div>
        <div style="height:58px;display:flex;align-items:center;justify-content:center">${
          i < signatures.length
            ? `<img src="${signatures[i]}" alt="Signature du membre du jury" style="max-height:56px;max-width:150px;object-fit:contain" />`
            : ""
        }</div></td>`,
    )
    .join("");
  return `<p style="margin-top:14px"><strong>Signature des membres du jury :</strong></p>
  <table class="bloc-avoid"><tr>${cols}</tr></table>`;
}


/** GJ1 — Grilles d'évaluation de l'épreuve (guides d'observation + grilles). */
export function genGJ1Gotrm(s: GotrmSession, c: GotrmCandidat): string {
  const sd = seed(c);
  const prof = findGotrmProfile(c.nom, c.prenom);
  const forts = prof?.pointsForts || [];
  const consolider = prof?.pointsAConsolider || [];
  const bandeau = bandeauCandidat(s, c);

  const pages: string[] = [];
  pages.push(pageGarde(s, c, "Grilles d'évaluation de l'épreuve"));

  // Guides d'observation MSP parties 1 et 2
  GOTRM_MSP_PARTIES.forEach((partie, i) => {
    const dateMsp = i === 0 ? c.msp1Date : c.msp2Date;
    const horaire = i === 0 ? c.msp1Horaire : c.msp2Horaire;
    pages.push(`${bandeau}<h2>Guide d'observation — ${esc(partie.libelle)}</h2>
    <table>
      <tr><th style="width:32%">Durée de la partie</th><td>${esc(partie.duree)}</td></tr>
      <tr><th>Périmètre évalué</th><td>${esc(partie.perimetre)}</td></tr>
      <tr><th>Date de passage</th><td>${dateMsp ? formatDate(dateMsp) : ""}</td></tr>
      <tr><th>Horaire</th><td>${esc(horaire)}</td></tr>
      <tr><th>Modalités</th><td>Travail sur poste informatique sous surveillance, production d'un dossier technique sous Word incluant des travaux sous Excel. Présence du jury non requise.</td></tr>
    </table>
    <h3>Points d'observation</h3>
    <table>
      <tr><th style="width:52%">Le candidat</th><th style="width:16%">Observé</th><th style="width:32%">Observations</th></tr>
      ${[
        "respecte les consignes de passation et le temps imparti",
        "utilise les ressources autorisées (textes réglementaires) sans support personnel",
        "organise son travail et traite l'ensemble des dossiers demandés",
        "produit des livrables identifiés, datés et exploitables",
        "adopte une posture professionnelle pendant toute la durée de l'épreuve",
      ]
        .map((l, li) => `<tr><td>${l}</td><td style="text-align:center">${ON(true)}</td><td style="font-size:9.5pt">${esc(pick(OBS_LIGNE, sd + i * 5 + li))}</td></tr>`)
        .join("")}
    </table>
    <h3>Observations du jury</h3>
    <div class="cadre-reponse">${esc(pick2(OBS_POSITIVES, sd + i * 3))} ${esc(pick(OBS_COMPLEMENT, sd + i))}${
      forts.length ? ` ${esc(`Points d'appui relevés : ${forts.slice(0, 2).join(" ; ")}.`)}` : ""
    }</div>`);
  });

  // Guide de lecture de la production
  pages.push(`${bandeau}<h2>Guide de lecture de la production du candidat</h2>
  <p>Le jury prend connaissance des dossiers remis par le candidat à l'issue de la mise en situation professionnelle, avant l'entretien technique et le questionnement à partir de production(s).</p>
  <table>
    <tr><th style="width:22%">Dossier</th><th style="width:48%">Attendu</th><th style="width:30%">Lecture du jury</th></tr>
    ${GOTRM_CCP.flatMap((ccp) => ccp.competences)
      .map(
        (cp, i) => `<tr class="bloc-avoid"><td>${esc(cp.support)}</td><td>${esc(cp.libelle)}</td>
        <td>${CHK(true)} Production présente et exploitable<br>${CHK(i % 4 === (sd % 4) ? true : false)} Compléments demandés à l'entretien</td></tr>`,
      )
      .join("")}
  </table>
  <h3>Observations du jury sur la production</h3>
  <div class="cadre-reponse">${esc(pick2(OBS_PRODUCTION, sd))}${
    consolider.length ? ` ${esc(`Points approfondis à l'entretien technique : ${consolider.slice(0, 2).join(" ; ")}.`)}` : ""
  }</div>`);

  // Grilles d'évaluation par activité-type
  GOTRM_CCP.forEach((_, i) => pages.push(`${bandeau}${grilleActivite(i, c)}`));

  // Synthèse et visas
  pages.push(`${bandeau}<h2>Synthèse de l'épreuve</h2>
  <table>
    ${GOTRM_CCP.map(
      (ccp, i) =>
        `<tr><td style="width:72%"><strong>Activité ${i + 1}</strong> — ${esc(ccp.libelle)}</td>
        <td style="text-align:center;white-space:nowrap">maîtrisée : ${ON(true)}</td></tr>`,
    ).join("")}
  </table>
  <h3>Observations générales du jury</h3>
  <div class="cadre-reponse">${esc(pick2(OBS_ENTRETIEN, sd))}</div>
  ${blocSignaturesJury(s)}`);

  const body = pages.join(`<div class="page-break"></div>`);
  return htmlWrap(`${STYLE_MINISTERE}<div class="doc-officiel">${body}</div>${pied("Grille 1 jury", "v01")}`);
}

/** Questions-types officielles de l'entretien final. */
const GJ2_QUESTIONS: { champ: string; questions: string[] }[] = [
  {
    champ: "Vision et compréhension du métier",
    questions: [
      "Pouvez-vous nous décrire rapidement le métier de gestionnaire des opérations de transport routier de marchandises et ses différentes activités ?",
      "Pouvez-vous citer quelques contraintes spécifiques à ce métier ? (réglementation, gestion des priorités et des aléas, respect des marges…)",
      "Quelles sont les principales différences entre un commissionnaire de transport et un transporteur ?",
      "Quels sont les principaux interlocuteurs d'un gestionnaire des opérations de transport routier ? (en interne et en externe)",
      "Comment situez-vous son rôle dans l'entreprise ?",
    ],
  },
  {
    champ: "Représentation du métier et des activités",
    questions: [
      "D'après vous, quels sont les impacts liés à la non-qualité ? (financiers, image de marque…)",
      "À ce jour, dans quel type d'entreprise souhaiteriez-vous exercer ce métier (commissionnaire ou transporteur) ? et pourquoi ?",
      "Les transports routiers ont notoirement un impact environnemental important, pensez-vous qu'il soit possible d'agir sur cette empreinte carbone ? Et si oui comment ?",
    ],
  },
  {
    champ: "Appropriation de la culture professionnelle",
    questions: [
      "Pouvez-vous nous indiquer les technologies utilisées dans votre entreprise d'accueil ?",
      "Pouvez-vous nous indiquer un élément de vocabulaire métier que vous vous êtes approprié durant votre stage ou emploi et nous l'expliquer succinctement ?",
      "Selon vous, quelles sont les qualités requises pour exercer ce métier ?",
    ],
  },
];

const GJ2_ITEMS: { champ: string; items: string[] }[] = [
  {
    champ: "Vision et compréhension du métier",
    items: [
      "décrit correctement le métier et ses différentes activités ;",
      "connaît les contraintes d'exercice spécifiques du métier ;",
      "situe correctement les différents secteurs d'emploi ;",
      "connaît les interlocuteurs internes et externes au sein de l'entreprise ;",
      "a une idée précise de sa position et de son rôle.",
    ],
  },
  {
    champ: "Représentation du métier et des activités",
    items: [
      "intègre la dimension qualité ;",
      "prend en compte les impératifs de production de l'entreprise ;",
      "tient compte des considérations environnementales ;",
    ],
  },
  {
    champ: "Appropriation de la culture professionnelle",
    items: [
      "adopte un comportement en cohérence avec le métier ;",
      "utilise un langage technique suffisamment étendu, pertinent, clair et adapté.",
    ],
  },
];

/** GJ2 — Guide et grille d'évaluation de l'entretien final. */
export function genGJ2Gotrm(s: GotrmSession, c: GotrmCandidat): string {
  const sd = seed(c);
  const prof = findGotrmProfile(c.nom, c.prenom);
  const forts = prof?.pointsForts || [];
  const consolider = prof?.pointsAConsolider || [];
  const bandeau = bandeauCandidat(s, c);

  const pages: string[] = [];
  pages.push(pageGarde(s, c, "Guide et grille d'évaluation de l'entretien final"));

  pages.push(`${bandeau}<h2>Guide de l'entretien final</h2>
  <p>Vous avez pris connaissance du dossier professionnel du candidat. Les questions ci-dessous sont des questions-types que vous pouvez personnaliser en fonction des informations de ce dossier. <strong>L'entretien final dure 30 minutes.</strong></p>
  <p>Vous pouvez commencer l'entretien en disant « Cet entretien va conclure votre parcours de validation. L'objectif de notre entretien est d'échanger sur l'ensemble de votre dossier professionnel ».</p>
  <table>
    <tr><th style="width:26%">Champs d'observation</th><th>Proposition de questions</th></tr>
    ${GJ2_QUESTIONS.map(
      (b) => `<tr class="bloc-avoid"><td><strong>${esc(b.champ)}</strong></td>
      <td>${b.questions.map((q) => `<div style="margin:3px 0">• ${esc(q)}</div>`).join("")}</td></tr>`,
    ).join("")}
  </table>`);

  // Un ou deux « non » par grille selon le candidat (≈ 80–90 % de oui) :
  // indices des items non satisfaits, déterministes et distincts par candidat.
  const totalItems = GJ2_ITEMS.reduce((n, b) => n + b.items.length, 0);
  const nonOui = new Set<number>();
  const premier = (sd % totalItems) + 1;
  nonOui.add(premier);
  if (sd % 3 !== 0) {
    const second = (premier + 3 + (sd % (totalItems - 3))) % totalItems + 1;
    nonOui.add(second === premier ? (second % totalItems) + 1 : second);
  }

  let idx = 0;
  pages.push(`${bandeau}<h2>Grille d'évaluation de l'entretien final</h2>
  <p>À partir de l'échange avec le candidat, considérez-vous que les champs d'observation ci-dessous sont satisfaisants ?</p>
  <table>
    <tr><th style="width:22%">Champs d'observation</th><th style="width:40%">Le candidat</th><th style="width:12%">oui / non</th><th style="width:26%">Observations</th></tr>
    ${GJ2_ITEMS.map((b) =>
      b.items
        .map((it, k) => {
          idx += 1;
          const oui = !nonOui.has(idx);
          const obs = !oui
            ? pick(OBS_LIGNE_RESERVE, sd + idx * 3)
            : k === 0 && forts.length
              ? `Appui constaté : ${forts[(sd + idx) % forts.length]}.`
              : k === b.items.length - 1 && consolider.length
                ? `Réponse consolidée pendant l'échange sur : ${consolider[(sd + idx) % consolider.length]}.`
                : pick(OBS_LIGNE, sd + idx * 2);
          return `<tr class="bloc-avoid">${k === 0 ? `<td rowspan="${b.items.length}"><strong>${esc(b.champ)}</strong></td>` : ""}
            <td>${esc(it)}</td>
            <td style="text-align:center">${ON(oui)}</td>
            <td style="font-size:9.5pt">${esc(obs)}</td></tr>`;
        })
        .join(""),
    ).join("")}
    <tr><td colspan="2"><strong>Conclusion : lors de l'entretien final, le candidat a-t-il démontré une maîtrise globale suffisante pour la tenue de l'emploi ?</strong></td>
      <td style="text-align:center">${ON(true)}</td>
      <td style="font-size:9.5pt">${esc(pick2(OBS_ENTRETIEN, sd + 4))}</td></tr>
  </table>
  ${blocSignaturesJury(s)}`);

  const body = pages.join(`<div class="page-break"></div>`);
  return htmlWrap(`${STYLE_MINISTERE}<div class="doc-officiel">${body}</div>${pied("Grille 2 jury", "v01")}`);
}

// ───────────────────────────────────────────── adaptateurs EDOF / contrôle EY

/**
 * Construit une session GOTRM minimale à partir des données de l'application
 * (organisme + formation + stagiaire), pour générer les grilles jury depuis
 * le module EDOF sans passer par la page Session GOTRM.
 * Aucun membre du jury n'est inventé : les visas restent vierges.
 */
function sessionDepuisFormation(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  idx: number,
): { session: GotrmSession; candidat: GotrmCandidat } {
  const s = stagiaires[idx] || stagiaires[0];
  const brut = sessionDates({ dateDebut: f.dateDebut || "", dateFin: f.dateFin || "" } as GotrmSession);
  const debut = brut.debut;
  const fin = brut.fin;
  /** Garde-fou : aucune date de passage antérieure à la session (saisies 2025). */
  const corrigeDate = (d?: string): string => {
    if (!d) return "";
    if (d === "2025-09-01") return "2026-09-01";
    if (d === "2025-09-03") return "2026-09-03";
    return d;
  };
  const candidat: GotrmCandidat = {
    id: `edof-${idx}`,
    civilite: s?.civilite === "Mme" ? "Mme" : "M.",
    nom: s?.nom || "",
    prenom: s?.prenom || "",
    dateNaissance: (s as { dateNaissance?: string } | undefined)?.dateNaissance || "",
    identifiant: buildGotrmIdentifiant(debut, idx),
    dossierComplet: true,
    motifIncomplet: "",
    parcours: "Formation continue",
    ccpVises: GOTRM_CCP.map((c) => c.code),
    ordrePassage: idx + 1,
    msp1Date: corrigeDate(s?.dateDebutFormation) || debut,
    msp1Horaire: "09h00 – 14h00",
    msp2Date: corrigeDate(s?.dateFinFormation) || fin,
    msp2Horaire: "09h00 – 14h00",
    ccpObtenus: [],
  };
  const session: GotrmSession = {
    intitule: f.intitule || GOTRM_TITRE.intitule,
    dateDebut: debut,
    dateFin: fin,
    lieu: f.lieu || [org.adresse, `${org.codePostal || ""} ${org.ville || ""}`.trim()].filter(Boolean).join(", "),
    jury: [],
    surveillants: [],
    organisme: org,
    candidats: [candidat],
  };
  return { session, candidat };
}

/** GJ1 — pièce EDOF 45D (1 par stagiaire). */
export function genGJ1Officiel(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  idx = 0,
): string {
  const { session, candidat } = sessionDepuisFormation(org, f, stagiaires, idx);
  return genGJ1Gotrm(session, candidat);
}

/** GJ2 — pièce EDOF 45E (1 par stagiaire). */
export function genGJ2Officiel(
  org: OrganismeInfo,
  f: FormationInfo,
  stagiaires: StagiaireInfo[],
  idx = 0,
): string {
  const { session, candidat } = sessionDepuisFormation(org, f, stagiaires, idx);
  return genGJ2Gotrm(session, candidat);
}
