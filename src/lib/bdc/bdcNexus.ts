/**
 * Pièces du dossier BDC alignées sur le dossier de référence audité « NEXUS - PDF »
 * (test de personnalité Mini-IPIP à l'entrée, convocation, matrices d'évaluation, repères et
 * trame de la synthèse, process manquants, fiches de poste, questionnaires des autres
 * parties prenantes, registres).
 *
 * Règle : seules les données du dossier (organisme, consultant, planning, dates, financement)
 * sont reprises. Les réponses, notes, scores et appréciations du bénéficiaire ou du consultant
 * ne sont jamais produits : les pièces nominatives restent des trames datées à compléter.
 */
import type { OrganismeInfo } from "@/types/qualiopi";
import type { BdcContext, Beneficiaire, Prestation } from "./bdcModel";
import { fmtDateFR, prestationFor, seancesFor, typeContrat } from "./bdcModel";

const Z = "______________________________________________";

function consultantNom(ctx: BdcContext): string {
  return ctx.prestation.consultant.nom || ctx.organisme.representantLegal.nom || "le consultant";
}

function libFinancement(p: Prestation): string {
  return ({
    CPF: "Compte personnel de formation du bénéficiaire",
    employeur: "Financement par l'employeur",
    OPCO: "Financement par l'employeur avec participation de son OPCO",
    personnel: "Financement personnel du bénéficiaire",
    "France Travail": "Compte personnel de formation, abondement éventuel de France Travail",
    "Transitions Pro": "Prise en charge Transitions Pro",
    Région: "Dispositif régional",
  } as Record<string, string>)[p.financeur] || "Selon la convention";
}

function libModalite(p: Prestation): string {
  return p.modalite === "distanciel" ? "Distanciel synchrone (visioconférence)" : p.modalite === "mixte" ? "Mixte (présentiel et visioconférence)" : "Présentiel";
}

function dureeTxt(ctx: BdcContext, b: Beneficiaire | null): string {
  const p = prestationFor(ctx, b);
  const n = seancesFor(ctx, b).length;
  return `${p.dureeEntretiensH} heures d'accompagnement individuel avec le consultant, réparties sur ${n} séances. Le travail personnel guidé réalisé entre les séances n'est ni décompté de ces ${p.dureeEntretiensH} heures ni facturé.`;
}

/** Bloc d'identification commun aux pièces nominatives (comme NEXUS). */
function enteteBen(ctx: BdcContext, b: Beneficiaire | null): string {
  const o = ctx.organisme;
  const p = prestationFor(ctx, b);
  const naissance = b?.dateNaissance ? ` — date de naissance : ${fmtDateFR(b.dateNaissance)}` : "";
  return `| | |
|---|---|
| Organisme | ${o.raisonSociale}${o.siret ? ` — SIRET ${o.siret}` : ""}${o.nda ? ` — NDA ${o.nda}` : ""} |
| Adresse | ${[o.adresse, `${o.codePostal} ${o.ville}`.trim()].filter(Boolean).join(", ")} |
| Consultant référent | ${consultantNom(ctx)} — Consultant en bilan de compétences |
| Bénéficiaire | ${b ? `${b.prenom} ${b.nom}${naissance}` : Z} |
| Période de la prestation | du ${fmtDateFR(p.dateDebut)} au ${fmtDateFR(p.dateFin)} |
| Durée | ${dureeTxt(ctx, b)} |
| Modalité | ${libModalite(p)} |
| Financement | ${libFinancement(p)} |
`;
}

function signaturesBen(ctx: BdcContext, b: Beneficiaire | null): string {
  const ville = ctx.organisme.ville || "";
  return `**Signatures**

Fait${ville ? ` à ${ville}` : ""}, en deux exemplaires originaux.

| Le bénéficiaire | Le consultant |
|---|---|
| ${b ? `${b.prenom} ${b.nom}` : ""} | ${consultantNom(ctx)} |
| Signé le ____ / ____ / ________ | Signé le ____ / ____ / ________ |
`;
}

const fmtH = (h: string) => h.replace("h", ":");

// ───────────────────────────── IND 8 — Test de personnalité (Mini-IPIP) ─────────────────────────────

/** Mini-IPIP (Donnellan et al., 2006) — 20 items de l'IPIP, domaine public ; version française de travail. */
export const MINI_IPIP: Array<{ n: number; texte: string; dim: "E" | "A" | "C" | "N" | "O"; inverse: boolean }> = [
  { n: 1, texte: "Je suis l'animateur des moments de convivialité.", dim: "E", inverse: false },
  { n: 2, texte: "Je suis sensible à ce que ressentent les autres.", dim: "A", inverse: false },
  { n: 3, texte: "Je fais les tâches qui m'incombent sans attendre.", dim: "C", inverse: false },
  { n: 4, texte: "Mon humeur change souvent.", dim: "N", inverse: true },
  { n: 5, texte: "J'ai une imagination fertile.", dim: "O", inverse: false },
  { n: 6, texte: "Je ne parle pas beaucoup.", dim: "E", inverse: true },
  { n: 7, texte: "Les problèmes des autres ne m'intéressent pas.", dim: "A", inverse: true },
  { n: 8, texte: "J'oublie souvent de ranger les choses à leur place.", dim: "C", inverse: true },
  { n: 9, texte: "Je suis détendu(e) la plupart du temps.", dim: "N", inverse: false },
  { n: 10, texte: "Les idées abstraites ne m'intéressent pas.", dim: "O", inverse: true },
  { n: 11, texte: "Je parle à beaucoup de personnes différentes lors d'un événement.", dim: "E", inverse: false },
  { n: 12, texte: "Je ressens les émotions des autres.", dim: "A", inverse: false },
  { n: 13, texte: "J'aime l'ordre.", dim: "C", inverse: false },
  { n: 14, texte: "Je me contrarie facilement.", dim: "N", inverse: true },
  { n: 15, texte: "J'ai du mal à comprendre les idées abstraites.", dim: "O", inverse: true },
  { n: 16, texte: "Je reste en retrait.", dim: "E", inverse: true },
  { n: 17, texte: "Je ne m'intéresse pas vraiment aux autres.", dim: "A", inverse: true },
  { n: 18, texte: "Je mets du désordre dans ce que je fais.", dim: "C", inverse: true },
  { n: 19, texte: "Je me sens rarement abattu(e).", dim: "N", inverse: false },
  { n: 20, texte: "Je n'ai pas beaucoup d'imagination.", dim: "O", inverse: true },
];
const DIMENSIONS: Array<{ code: "E" | "A" | "C" | "N" | "O"; libelle: string }> = [
  { code: "E", libelle: "Extraversion" },
  { code: "A", libelle: "Agréabilité" },
  { code: "C", libelle: "Conscience professionnelle" },
  { code: "N", libelle: "Stabilité émotionnelle" },
  { code: "O", libelle: "Ouverture" },
];
const itemsDim = (d: string) => MINI_IPIP.filter((i) => i.dim === d).map((i) => `${i.n}${i.inverse ? " (inv.)" : ""}`).join(", ");

export function mdProcessTestPersonnalite(ctx: BdcContext): string {
  const o = ctx.organisme.raisonSociale;
  const c = consultantNom(ctx);
  return `# PROCESS — TEST DE PERSONNALITÉ À L'ENTRÉE

_Indicateur 8 — Positionnement à l'entrée de la prestation et adaptation du parcours_

## 1. Principe

À l'entrée d'un bilan de compétences, il ne s'agit pas d'évaluer des connaissances. ${o} fait passer à chaque bénéficiaire, avant la première séance, un test de personnalité qui fournit des repères sur ses modes de fonctionnement au travail. Ces repères sont restitués et discutés au début de la phase d'investigation et orientent le choix des outils et l'intensité des étapes suivantes.

## 2. Outil utilisé

| | |
|---|---|
| Instrument | Mini-IPIP : 20 affirmations, 4 par dimension, réponses sur une échelle de 1 (pas du tout moi) à 5 (tout à fait moi) |
| Dimensions | Extraversion · Agréabilité · Conscience professionnelle · Stabilité émotionnelle · Ouverture (modèle des cinq grands facteurs) |
| Statut | Items issus de l'International Personality Item Pool (IPIP), ressource du domaine public ; version française de travail de l'organisme |
| Durée de passation | 10 minutes environ, en ligne, avant la séance 1 |
| Cotation | Score brut de 4 à 20 par dimension (items inversés recodés). Aucun étalonnage français n'est revendiqué : les scores sont des repères de discussion, jamais un diagnostic. |

## 3. Déroulé

| Étape | Action | Responsable | Trace |
|---|---|---|---|
| 1 | Envoi du test avec la convocation, consignes et durée indicative | ${c} | Courriel « test de personnalité » archivé |
| 2 | Passation par le bénéficiaire lui-même, sans limite de temps | Le bénéficiaire | Questionnaire renseigné et daté |
| 3 | Cotation des cinq dimensions | ${c} | Tableau des scores |
| 4 | Restitution orale en séance 2 : chaque dimension est discutée avec un exemple et un contre-exemple (matrice 04) | ${c} | Restitution écrite signée |
| 5 | Report des repères retenus dans le programme de la phase d'investigation (choix des matrices, points de vigilance) | ${c} | Fiche pédagogique |

## 4. Exploitation

| Constat | Conséquence sur le parcours |
|---|---|
| Repère confirmé par des exemples vécus | Mobilisé comme atout dans l'analyse des compétences et du projet. |
| Repère nuancé ou contesté par le bénéficiaire | Exploré par une matrice complémentaire (énergie dans les activités, réalisations STAR) ; c'est l'avis du bénéficiaire qui prévaut. |
| Point de vigilance pour le projet | Traité dans la confrontation au terrain (enquêtes métier) et dans le plan d'action (formation, conditions de travail recherchées). |

Le test ne sert jamais à sélectionner, à exclure ou à conclure à une aptitude ou une inaptitude. Les résultats sont confidentiels, remis au seul bénéficiaire et ne figurent dans la synthèse qu'avec son accord.
`;
}

export function mdMailTestPersonnalite(ctx: BdcContext, b: Beneficiaire): string {
  const o = ctx.organisme;
  const s = seancesFor(ctx, b);
  const p = prestationFor(ctx, b);
  const s2 = s[1] || s[0];
  return `# COURRIEL — TEST DE PERSONNALITÉ

_Indicateur 8 — Adressé avec la convocation, avant la première séance_

| | |
|---|---|
| Destinataire | ${b.prenom} ${b.nom}${b.email ? ` — ${b.email}` : ""} |
| Objet | Votre bilan de compétences — test de personnalité à compléter avant la séance 1 |
| Date d'envoi | ____ / ____ / ________ |

**Corps du message**

Bonjour ${b.prenom} ${b.nom},

Votre bilan de compétences démarre le ${fmtDateFR(p.dateDebut)}. Avant notre première séance, merci de compléter le test de personnalité joint : 20 affirmations, à noter de 1 (pas du tout moi) à 5 (tout à fait moi). Comptez une dizaine de minutes ; il n'y a ni bonne ni mauvaise réponse.

Ce test n'est pas un examen : il nous donnera des repères sur votre façon de travailler, que nous discuterons ensemble lors de la séance ${s2 ? `${s2.numero} du ${fmtDateFR(s2.date)}` : "2"}. Vos réponses restent strictement confidentielles.

Je reste joignable${o.telephoneContact ? ` au ${o.telephoneContact}` : ""}${o.emailContact ? ` ou à ${o.emailContact}` : ""} pour toute question.

Bien cordialement,

| | |
|---|---|
| Consultant | ${consultantNom(ctx)} |
| Organisme | ${o.raisonSociale} |
| Pièce jointe | Test de personnalité (Mini-IPIP) — bilan de compétences |
`;
}

export function mdTestPersonnalite(ctx: BdcContext, b: Beneficiaire): string {
  const s = seancesFor(ctx, b);
  const s2 = s[1] || s[0];
  return `# TEST DE PERSONNALITÉ ET RESTITUTION

_Indicateur 8 — Passé par le bénéficiaire avant la séance 1, restitué en séance ${s2 ? `${s2.numero} (prévue le ${fmtDateFR(s2.date)})` : "2"}_

${enteteBen(ctx, b)}
Les réponses de la partie 1 sont renseignées par le bénéficiaire lui-même. La cotation et la restitution sont conduites avec le consultant et validées par le bénéficiaire.

| | |
|---|---|
| Outil | Mini-IPIP — 20 items de l'International Personality Item Pool (domaine public), version française de travail |
| Date et conditions de passation | ____ / ____ / ________ — ${Z} |
| Échelle | 1 = pas du tout moi · 2 = plutôt pas moi · 3 = ni l'un ni l'autre · 4 = plutôt moi · 5 = tout à fait moi |

## Partie 1 — Réponses du bénéficiaire

| N° | Affirmation | Réponse (1-5) |
|---|---|---|
${MINI_IPIP.map((i) => `| ${i.n} | ${i.texte} |  |`).join("\n")}

## Partie 2 — Cotation

Score brut de 4 à 20 par dimension ; les items formulés à l'inverse sont recodés (6 − réponse). Repères de lecture : 4 à 9 zone basse, 10 à 15 zone intermédiaire, 16 à 20 zone élevée. Aucun étalonnage n'est revendiqué.

| Dimension | Items | Score brut | Zone |
|---|---|---|---|
${DIMENSIONS.map((d) => `| ${d.libelle} | ${itemsDim(d.code)} | ___ / 20 |  |`).join("\n")}

## Partie 3 — Restitution (matrice 04 « Personnalité : restitution »)

Restitution orale conduite en séance : chaque résultat est discuté avec un exemple et un contre-exemple tirés du parcours du bénéficiaire, puis reformulé avec lui.

| Dimension et résultat | Exemple qui va dans ce sens | Nuance ou contre-exemple | Condition de travail utile | Conséquence pour le projet |
|---|---|---|---|---|
${DIMENSIONS.map((d) => `| ${d.libelle} — ___ / 20 |  |  |  |  |`).join("\n")}

**Repères retenus pour la suite du bilan**

${Z}

${Z}

Ce test fournit des repères de discussion. Il ne mesure ni une aptitude ni une inaptitude et ne permet pas de déduire un métier. Résultats remis au seul bénéficiaire.

${signaturesBen(ctx, b)}`;
}

// ───────────────────────────── IND 9 / 10 — Convocation ─────────────────────────────

export function mdConvocation(ctx: BdcContext, b: Beneficiaire, finRetractation: Date): string {
  const o = ctx.organisme;
  const p = prestationFor(ctx, b);
  const s = seancesFor(ctx, b);
  const c = consultantNom(ctx);
  const outil = (ctx.formation?.lieu || "").trim();
  const dist = p.modalite !== "presentiel";
  const contact = [o.telephoneContact, o.emailContact].filter(Boolean).join(" — ");
  const phaseLib = (n: number) => (n === 1 ? "Phase préliminaire" : n === 2 ? "Phase d'investigation" : "Phase de conclusion");
  const acces = (x: { modalite: string }) => (x.modalite === "distanciel" ? `Lien ${outil || "de visioconférence"} de l'invitation` : `${o.adresse}, ${o.codePostal} ${o.ville}`);
  const tripartite = typeContrat(p).type !== "bipartite";
  return `# CONVOCATION AU BILAN DE COMPÉTENCES

_Indicateur 9 — Adressée ${tripartite ? "après la signature de la convention par les trois parties" : `après l'expiration du délai de rétractation (le ${fmtDateFR(finRetractation)})`}_

| | |
|---|---|
| Destinataire | ${b.prenom} ${b.nom}${[b.adresse, `${b.codePostal} ${b.ville}`.trim()].filter(Boolean).length ? ` — ${[b.adresse, `${b.codePostal} ${b.ville}`.trim()].filter(Boolean).join(", ")}` : ""}${b.email ? ` — ${b.email}` : ""} |
| Prestation | ${ctx.formation?.intitule ? `Bilan de compétences — ${ctx.formation.intitule.replace(/^bilan de comp[ée]tences\s*[-–:]?\s*/i, "")}` : "Bilan de compétences"} |
| Période | du ${fmtDateFR(p.dateDebut)} au ${fmtDateFR(p.dateFin)} |
| Durée | ${dureeTxt(ctx, b)} |
| Modalité | ${libModalite(p)}${dist && outil ? ` — ${outil}` : ""} |
| Consultant référent | ${c}${contact ? ` — ${contact}` : ""} |

Bonjour ${b.prenom} ${b.nom},

${tripartite ? "La convention ayant été signée par les trois parties" : "Votre délai de rétractation ayant expiré"}, nous avons le plaisir de vous convoquer à votre bilan de compétences, selon le planning prévisionnel annexé à votre ${tripartite ? "convention" : "contrat"}.

**Objectifs de votre bilan**

Conformément à l'article L6313-4 du Code du travail, le bilan de compétences permet au bénéficiaire d'analyser ses compétences professionnelles et personnelles, ses aptitudes et ses motivations ; de définir un projet professionnel et, le cas échéant, un projet de formation ; d'utiliser ses atouts comme instrument de négociation pour un emploi, une formation ou une évolution de carrière. Vos objectifs individualisés figurent dans la fiche « Objectifs individualisés du bilan ».

**Vos séances**

| Séance | Date | Horaires | Durée | Phase | Accès |
|---|---|---|---|---|---|
${s.map((x) => `| ${x.numero} | ${fmtDateFR(x.date)} | ${fmtH(x.heureDebut)} – ${fmtH(x.heureFin)} | ${x.duree} h | ${phaseLib(x.phase)} | ${acces(x)} |`).join("\n")}
| Total | | | ${s.reduce((a, x) => a + x.duree, 0)} h | | |
${dist ? `
**Rejoindre vos séances à distance**

Le lien de chaque séance vous parvient par une invitation envoyée${b.email ? ` à ${b.email}` : ""} et il vous est rappelé la veille de la séance. Il est personnel : merci de ne pas le partager. Quelques minutes avant l'heure, cliquez sur le lien, autorisez l'accès à la caméra et au micro, puis rejoignez la réunion : ${c} vous y admet. Un test de connexion vous est proposé avant la séance 1.
` : ""}
**Assistance pendant votre bilan**

- Assistance technique et pédagogique : ${c}${contact ? `, ${contact}` : ""} ; réponse sous 48 heures ouvrées entre les séances.

**Avant la première séance**

- Compléter le test de personnalité joint (10 minutes environ) : il sera discuté en séance ${s[1]?.numero ?? 2}.
- ${dist ? "Prévoir un lieu calme garantissant la confidentialité de nos échanges et une connexion stable." : "Prévoir votre trajet jusqu'au lieu de la séance."}
- Relire le livret d'accueil et le programme remis avec votre ${tripartite ? "convention" : "contrat"}.

En cas d'empêchement, merci de prévenir au moins 48 heures à l'avance${contact ? ` (${contact})` : ""} : la séance sera reprogrammée sans frais.

Bien cordialement,

**Signatures**

Fait${o.ville ? ` à ${o.ville}` : ""}.

| Pour ${o.raisonSociale} |
|---|
| ${c} |
| Signé le ____ / ____ / ________ |
`;
}

// ───────────────────────────── IND 6 / 11 — Évaluation, repères et trame de synthèse ─────────────────────────────

export function mdProcessEvaluationObjectifs(ctx: BdcContext): string {
  const s = ctx.prestation.seances;
  const mi = s[Math.floor((s.length - 1) / 2)];
  const der = s[s.length - 1];
  return `# PROCESS — ÉVALUATION DE L'ATTEINTE DES OBJECTIFS

_Indicateur 11 — Évaluation de l'atteinte des objectifs de la prestation_

## 1. Principe

L'atteinte des objectifs du bilan de compétences est évaluée objectif par objectif, à partir des objectifs individualisés contractualisés en phase préliminaire. Chaque évaluation est adossée à une preuve matérielle produite au cours de la prestation. L'évaluation est portée au document de synthèse, co-rédigé avec le bénéficiaire et signé des deux parties.

## 2. Dispositif d'évaluation

| Moment | Objet de l'évaluation | Outil | Trace |
|---|---|---|---|
| Entrée — avant la séance 1 | Repères de personnalité au travail (cinq grands facteurs) | Test de personnalité Mini-IPIP et sa restitution | Test restitué et signé |
| Continu — chaque séance | Progression sur les livrables attendus et réalisation du travail personnel | Fiche pédagogique | Rubrique « déroulé réalisé » de chaque séance |
| Mi-parcours — séance ${mi?.numero ?? "médiane"} | Adéquation du déroulé aux attentes ; pertinence des objectifs | Guide d'entretien intermédiaire | Compte rendu de l'entretien |
| Sortie — séance ${der?.numero ?? "finale"} | Atteinte de chacun des objectifs contractualisés | Grille d'évaluation du document de synthèse | Document de synthèse signé |
| À froid — six mois après la fin du bilan | Mise en œuvre effective du plan d'action et pertinence du projet avec le recul | Compte rendu de suivi à 6 mois et questionnaire à froid | Compte rendu signé |

## 3. Échelle d'évaluation

| Niveau | Définition | Conséquence |
|---|---|---|
| Atteint | Le résultat attendu est produit et la preuve correspondante figure au dossier. | Mention portée au document de synthèse |
| Partiellement atteint | Le résultat attendu est produit de façon incomplète, ou la preuve ne couvre qu'une partie de l'objectif. | Observation motivée et, le cas échéant, préconisation portée au plan d'action |
| Non atteint | Le résultat attendu n'est pas produit. | Observation motivée, analyse de la cause et report au tableau d'amélioration continue |

## 4. Règles

- L'évaluation ne porte jamais sur la personne : elle porte sur la production des résultats attendus définis contractuellement.
- Aucune évaluation n'est renseignée par anticipation : chaque rubrique est complétée à la date prévue au planning.
- Toute mention « atteint » doit renvoyer à une pièce identifiable du dossier.
- Le bilan de compétences étant soumis à une obligation de moyens, l'évaluation porte sur les objectifs du bilan, et non sur l'obtention d'un emploi ou d'une certification.
- Les résultats agrégés alimentent les indicateurs de résultats de l'indicateur 2.
`;
}

export function mdReperesSynthese(ctx: BdcContext): string {
  const o = ctx.organisme.raisonSociale;
  return `# REPÈRES QUALITÉ ET FEUILLE DE ROUTE DU DOCUMENT DE SYNTHÈSE

_Les incontournables, la trame, la feuille de route et la grille de relecture_

Ce document fixe les exigences de ${o} pour la rédaction du document de synthèse : un document personnalisé, argumenté et utilisable après l'accompagnement. Il est présenté au bénéficiaire en phase de conclusion et sert de grille de relecture avant la remise.

## 1. Le socle réglementaire

- Trois phases : préliminaire, investigation, conclusion ; la conclusion prévoit les conditions et les étapes de réalisation du projet et la possibilité d'un entretien de suivi (art. R6313-4 du Code du travail).
- La synthèse reprend l'analyse des compétences, le projet professionnel, les moyens de le réaliser et les étapes de mise en œuvre ; elle est discutée avec le bénéficiaire.
- Les résultats détaillés et la synthèse sont remis au seul bénéficiaire ; leur communication à un tiers nécessite son accord (art. L6313-4).

## 2. Les dix incontournables

| Incontournable | Contenu attendu | Repère de qualité |
|---|---|---|
| 01 Une demande de départ explicite | Situation initiale, raisons du bilan, questions à traiter, attentes prioritaires ; cadre de travail : période, modalités, méthodes. | On comprend pourquoi le bilan a été engagé et ce qu'il devait clarifier. |
| 02 Un parcours analysé | Expériences utiles au projet, réalisations, transitions, apprentissages, activités appréciées ou non. | Le récit explique les choix actuels ; il dépasse la chronologie du CV. |
| 03 Des compétences précises et étayées | Savoir-faire décrits par des verbes d'action ; pour les atouts majeurs : situation, rôle, résultat, utilité dans le projet. | « Capacité d'organisation » est illustrée par un exemple vécu et contextualisé. |
| 04 Les motivations et les critères de choix | Intérêts, valeurs, besoins, conditions de travail recherchées, critères hiérarchisés. | Les préférences guident les arbitrages ; les compromis possibles sont visibles. |
| 05 Un projet suffisamment défini | Métier ou fonction visée, missions, contexte d'exercice, maturité du projet, éléments à confirmer. | Le projet peut être décrit concrètement. |
| 06 Des choix argumentés | Lien entre l'orientation retenue, les compétences, les motivations et les critères ; pistes explorées, motifs de sélection ou d'abandon ; alternative si utile. | Le lecteur comprend pourquoi l'orientation est pertinente, ses limites et ses compromis. |
| 07 Une faisabilité documentée | Confrontation à des informations actuelles : activités réelles, conditions d'accès, exigences, territoire ; sources datées. | Faits vérifiés, témoignages et hypothèses sont distingués. |
| 08 Les écarts et les moyens nécessaires | Acquis mobilisables, compétences à développer, prérequis, obstacles ; chaque moyen relié à un besoin. | Une formation répond à un écart identifié. |
| 09 Un plan d'action utilisable | Actions ordonnées : objectif, qui agit, échéance, ressources, résultat attendu ; première étape nommée. | Le bénéficiaire sait quoi faire dès la remise du document. |
| 10 Une conclusion partagée et un suivi prévu | Retour aux attentes initiales, décisions, questions restantes ; synthèse discutée ; modalités du suivi. | La personne se reconnaît dans les conclusions. |

## 3. Trame proposée (environ 8 pages)

| Pages | Partie | Contenu prioritaire |
|---|---|---|
| 1 | Contexte et démarche | Demande, objectifs, période, modalités, méthodes |
| 1 | Parcours et expériences | Faits marquants, réalisations, apprentissages |
| 2 | Compétences et aspirations | Atouts illustrés, transférabilité, motivations, critères |
| 2 | Projet et faisabilité | Projet retenu, choix argumentés, pistes explorées, vérifications |
| 2 | Mise en œuvre et conclusion | Écarts, moyens, plan d'action, décisions, suivi |

## 4. Feuille de route du consultant

| Étape | Travail à réaliser | Livrable ou décision attendue |
|---|---|---|
| 1. Cadrer | Reformuler les attentes, les questions prioritaires et le format | Demande partagée, plan de synthèse convenu |
| 2. Rassembler | Sélectionner expériences, exemples de compétences, résultats des tests et des matrices ; relever les manques | Base factuelle suffisante |
| 3. Confronter les pistes | Croiser atouts et aspirations avec les conditions réelles d'exercice (fiches ROME, enquêtes) | Pistes retenues, écartées ou à confirmer |
| 4. Rédiger | Première version selon la trame ; relier constats, choix et actions | Version complète à discuter |
| 5. Relire ensemble | Vérifier exactitude, compréhension, formulations ; ajuster le plan | Synthèse discutée, plan réaliste |
| 6. Remettre et prévoir le suivi | Remettre la synthèse et les résultats détaillés ; convenir du suivi | Document daté et versionné ; prochaine étape claire |

## 5. Grille de relecture avant la remise

- ☐ La demande initiale et les attentes prioritaires sont clairement formulées.
- ☐ Les atouts principaux reposent sur des exemples précis du parcours.
- ☐ Les motivations et les conditions de travail recherchées sont hiérarchisées.
- ☐ Le projet est décrit concrètement et les choix sont expliqués.
- ☐ Les informations de faisabilité sont sourcées, datées et contextualisées.
- ☐ Les écarts, les obstacles et les questions ouvertes sont visibles.
- ☐ Le plan précise actions, responsables, échéances et résultats attendus.
- ☐ Le bénéficiaire se reconnaît dans les conclusions et connaît sa première action.
- ☐ La remise des résultats détaillés et les modalités du suivi sont prévues.

Test final : le bénéficiaire peut expliquer ses atouts, les raisons de son orientation et les prochaines étapes en s'appuyant sur le document ; les points à vérifier sont identifiés.
`;
}

export function mdTrameSynthese(ctx: BdcContext): string {
  const o = ctx.organisme;
  const champ = (l: string) => `| ${l} |  |`;
  const vide = (cols: number, n: number) => Array.from({ length: n }, () => `|${" |".repeat(cols)}`).join("\n");
  return `# TRAME DU DOCUMENT DE SYNTHÈSE

_Modèle à compléter avec le bénéficiaire (art. R6313-4, 3°)_

Trame à compléter par le consultant avec le bénéficiaire. Rédiger de façon synthétique ; les contenus plus longs peuvent être développés dans des annexes numérotées. Les résultats et la synthèse sont destinés au seul bénéficiaire ; toute communication à un tiers nécessite son accord écrit (art. L6313-4).

## 01 — Cadre et demande

| | |
|---|---|
${champ("Nom et prénom du bénéficiaire")}
${champ("Nom du consultant")}
| Organisme prestataire | ${o.raisonSociale}${o.siret ? ` — SIRET ${o.siret}` : ""} |
${champ("Référence ou version du document")}
${champ("Début du bilan")}
${champ("Fin du bilan")}
${champ("Durée réalisée")}
${champ("Situation initiale et raisons du bilan")}
${champ("Attentes et objectifs prioritaires")}
${champ("Démarche et méthodes utilisées (entretiens, test de personnalité, matrices, enquêtes, outils) et leur utilité")}

## 02 — Parcours : expériences et apprentissages

| Expérience | Période et contexte | Activités et rôle | Réalisations ou résultats | Apprentissages |
|---|---|---|---|---|
${vide(5, 3)}

| | |
|---|---|
${champ("Fil conducteur et transitions")}
${champ("Autres expériences pertinentes")}

## 03 — Compétences : atouts mobilisables

| Compétence précise | Situation, rôle et résultat | Utilité dans le projet |
|---|---|---|
${vide(3, 4)}

| | |
|---|---|
${champ("Aptitudes et autres atouts utiles")}
${champ("Compétences à développer ou à vérifier")}

## 04 — Motivations et aspirations

| | |
|---|---|
${champ("Motivations, intérêts et valeurs")}
${champ("Environnement de travail recherché")}
${champ("Contraintes et ressources à prendre en compte")}

| Critère prioritaire | Priorité (1 à 4) | Compromis possible ou condition |
|---|---|---|
${vide(3, 4)}

| | |
|---|---|
${champ("Arbitrages retenus")}

## 05 — Projet et choix

| | |
|---|---|
${champ("Métier, fonction ou activité visée (code ROME)")}
${champ("Secteur et contexte d'exercice")}
${champ("Zone géographique visée")}
${champ("Horizon de réalisation envisagé")}
${champ("Activités et conditions d'exercice envisagées")}
${champ("Cohérence avec les atouts et les aspirations")}

| Piste ou alternative | Statut : retenue / écartée / à confirmer | Motifs et enseignements |
|---|---|---|
${vide(3, 3)}

| | |
|---|---|
${champ("Points à confirmer et alternative utile")}

## 06 — Faisabilité

| Source, contact ou investigation | Date | Information utile et conséquence |
|---|---|---|
${vide(3, 3)}

| | |
|---|---|
${champ("Réalité du métier et conditions d'accès")}

| Écart ou obstacle | Moyen ou réponse proposée | Vérification ou condition restante |
|---|---|---|
${vide(3, 3)}

| | |
|---|---|
${champ("Formation éventuelle, budget et financement")}
${champ("Appréciation de la faisabilité")}

## 07 — Plan d'action

| Objectif et action précise | Qui agit ? | Échéance | Moyens / interlocuteurs | Résultat attendu |
|---|---|---|---|---|
${vide(5, 4)}

| | |
|---|---|
${champ("Première action à engager")}
${champ("Conditions et points de vigilance")}

## 08 — Conclusion et restitution

| | |
|---|---|
${champ("Réponses aux attentes initiales (objectifs atteints ou à approfondir)")}
${champ("Décisions et orientations retenues")}
${champ("Questions ouvertes et observations du bénéficiaire")}
${champ("Date de l'entretien de restitution")}
${champ("Date de remise de la synthèse")}
${champ("Entretien de suivi : modalités et date envisagée")}
${champ("Résultats détaillés et annexes remis")}

Synthèse discutée avec le bénéficiaire ; repère de volume : 6 à 10 pages hors annexes, ajustable au contenu utile.

**Signatures**

Fait${o.ville ? ` à ${o.ville}` : ""}, en deux exemplaires originaux.

| Le bénéficiaire — Lu et approuvé | Le consultant — Consultant en bilan de compétences |
|---|---|
| Le ____ / ____ / ________ | Le ____ / ____ / ________ |
`;
}

// ───────────────────────────── IND 5 / 11 — Matrices d'évaluation ─────────────────────────────

interface Matrice {
  code: string; titre: string; onglet: string;
  objectif: string; consigne: string; echelle: string; exemple: string; lecture: string;
  sousTitre: string; colonnes: string[]; lignes: string[]; contexte: string[]; guide: string;
}

export const MATRICES: Matrice[] = [
  { code: "01", titre: "Horizons de carrière", onglet: "01 Horizons", objectif: "Relier les intérêts du rapport à des activités et à des pistes professionnelles.", consigne: "Renseigner l'outil, sa version, sa date et les unités du rapport. Adapter les domaines à l'édition utilisée.", echelle: "Conserver les scores et les unités du rapport. Aucun score de remplacement.", exemple: "Innovateur : intérêt exprimé pour concevoir des supports ; exemple vécu : créer une formation ; piste à vérifier : conception pédagogique.", lecture: "Croiser le résultat avec les expériences et les nuances du bénéficiaire avant d'explorer un métier.", sousTitre: "Restitution d'un inventaire existant", colonnes: ["Domaine / échelle", "Résultat original et unité", "Accord ou nuance", "Exemple vécu", "Piste à explorer", "Vérification à conduire"], lignes: ["Pratique", "Scientifique", "Innovateur", "Conciliateur", "Organisateur", "Autre domaine du rapport", "Autre domaine du rapport"], contexte: ["Outil, édition et date de passation", "Référence du rapport et population de comparaison"], guide: "20 à 30 min de restitution. Les cinq premiers domaines sont des repères de HC-R. Adapter aux échelles réellement présentes dans le rapport. Le questionnaire officiel n'est pas reproduit. À reporter dans la synthèse : Compétences et aspirations ; projet et choix." },
  { code: "02", titre: "Projection professionnelle", onglet: "02 Projection", objectif: "Transformer des aspirations et des figures d'inspiration en hypothèses concrètes.", consigne: "Décrire ce qui attire, puis les activités ou les conditions que cela représente pour vous.", echelle: "Analyse qualitative. Aucune prédiction ni typologie psychologique.", exemple: "Une personne qui transmet un savoir m'inspire : j'apprécie la pédagogie ; hypothèse : animer un atelier ; première vérification : coanimer une séance.", lecture: "Le sens d'une image ou d'une figure est formulé par le bénéficiaire, puis traduit en une expérience à tester.", sousTitre: "Exercice original de projection", colonnes: ["Point de départ", "Figure / image / récit", "Ce qui attire ou questionne", "Besoin ou valeur associé", "Traduction professionnelle", "Petit test à réaliser"], lignes: ["Personne ou rôle qui m'inspire", "Situation professionnelle idéale", "Réussite que j'aimerais vivre", "Situation que je veux éviter", "Ce que je veux préserver", "Ce que je souhaite explorer"], contexte: ["Support de projection utilisé (image, récit, figure inspirante)", "Horizon de projection choisi"], guide: "20 à 30 min. Cette grille est une proposition originale de l'organisme. À reporter dans la synthèse : Motivations, aspirations et critères de choix." },
  { code: "03", titre: "Motivation au travail", onglet: "03 Motivation", objectif: "Repérer les moteurs importants et leur présence dans la situation professionnelle actuelle.", consigne: "Noter l'importance et la présence actuelle pour chaque moteur, puis illustrer les écarts.", echelle: "Importance : 1 faible à 5 essentielle. Présence actuelle : 1 absente à 5 très présente.", exemple: "Autonomie : importance 5, présence 2, écart 3. Exemple : toute décision exige une validation. Action : préciser la marge de décision recherchée.", lecture: "Écart = importance - présence actuelle. Une valeur positive ouvre un sujet d'échange ; elle ne constitue pas un diagnostic.", sousTitre: "Grille d'entretien originale", colonnes: ["Moteur", "Importance 1-5", "Présence 1-5", "Écart calculé", "Situation concrète", "Ajustement ou piste"], lignes: ["Autonomie", "Apprentissage et progression", "Relations et appartenance", "Utilité et sens", "Reconnaissance", "Rémunération", "Stabilité et sécurité", "Créativité et variété", "Responsabilités et influence", "Équilibre de vie"], contexte: ["Situation professionnelle évaluée", "Période de référence"], guide: "20 à 30 min. Les notes sont des repères subjectifs d'entretien. Ne pas additionner les écarts pour produire un niveau global de motivation. À reporter dans la synthèse : Motivations et conditions de travail recherchées." },
  { code: "04", titre: "Personnalité : restitution", onglet: "04 Personnalité", objectif: "Mettre les résultats d'un test de personnalité en relation avec des comportements observés.", consigne: "Indiquer le nom et la version du test, puis reporter les dimensions et les résultats exacts.", echelle: "Conserver l'unité, les normes et les limites du test. Aucun profil automatique dans cette matrice.", exemple: "Ouverture aux expériences, si cette dimension existe dans le test : exemple de nouveauté appréciée ; nuance : besoin d'un cadre clair en début de mission.", lecture: "Discuter chaque résultat avec un exemple et un contre-exemple ; préciser les contextes où il est utile.", sousTitre: "Restitution du test réellement utilisé", colonnes: ["Dimension du test", "Résultat, unité et norme", "Exemple qui va dans ce sens", "Nuance ou contre-exemple", "Condition de travail utile", "Conséquence pour le projet"], lignes: ["", "", "", "", ""], contexte: ["Nom, version, langue et date du test", "Référence du rapport et conditions de passation"], guide: "30 à 45 min de restitution. Ne pas déduire un métier, une aptitude ou une incapacité d'un seul résultat. Cette matrice ne remplace pas le questionnaire et sa restitution. À reporter dans la synthèse : Atouts, conditions de mobilisation et points de vigilance." },
  { code: "05", titre: "Verbes d'action", onglet: "05 Verbes action", objectif: "Passer d'une qualité générale à une action observable et transférable.", consigne: "Choisir un verbe, raconter une action réellement menée et préciser le résultat.", echelle: "Envie : 1 faible à 5 forte. Maîtrise : 0 non pratiqué, 1 accompagné, 2 autonome, 3 capable de transmettre.", exemple: "Organiser : préparer un atelier pour 12 personnes ; résultat : séance réalisée à la date prévue ; transfert : coordination d'événements.", lecture: "Une envie forte avec peu de pratique indique une exploration possible ; la compétence est étayée par la situation.", sousTitre: "Repérage des compétences par l'expérience", colonnes: ["Famille et verbes proposés", "Action réellement menée", "Résultat / preuve", "Envie 1-5", "Maîtrise 0-3", "Transfert possible"], lignes: ["Analyser, diagnostiquer, comparer", "Organiser, planifier, coordonner", "Créer, concevoir, améliorer", "Expliquer, former, transmettre", "Écouter, conseiller, accompagner", "Négocier, convaincre, mobiliser", "Réaliser, produire, réparer", "Contrôler, vérifier, sécuriser"], contexte: ["Expériences mobilisées", "Période ou contexte de référence"], guide: "25 à 35 min. Les verbes sont une banque d'exemples. Choisir le verbe précis qui correspond à votre action et contextualiser le niveau de maîtrise. À reporter dans la synthèse : Compétences étayées et transférabilité." },
  { code: "06", titre: "Intérêts professionnels", onglet: "06 Intérêts RIASEC", objectif: "Explorer des familles d'activités en distinguant l'envie et l'expérience déjà acquise.", consigne: "Évaluer l'envie d'explorer ces activités et décrire un exemple ou une question à vérifier.", echelle: "Envie : 1 faible à 5 forte. Exposition : 0 jamais, 1 occasionnelle, 2 plusieurs expériences, 3 régulière.", exemple: "Social : envie 5 et exposition 1 ; exemple : aide ponctuelle à un collègue ; exploration : observer ou coanimer un atelier.", lecture: "Une faible exposition ne signifie pas un manque d'aptitude. Vérifier les intérêts par des activités concrètes.", sousTitre: "Exploration originale des familles RIASEC", colonnes: ["Famille RIASEC", "Activités proposées", "Envie 1-5", "Exposition 0-3", "Exemple / question", "Exploration suivante"], lignes: ["Réaliste | Construire, manipuler, réparer", "Investigateur | Chercher, comprendre, analyser", "Artistique | Créer, imaginer, exprimer", "Social | Aider, expliquer, accompagner", "Entreprenant | Convaincre, négocier, mobiliser", "Conventionnel | Classer, organiser, fiabiliser"], contexte: ["Activités ou métiers déjà explorés", "Période de référence"], guide: "20 à 30 min. La structure des six familles sert de repère. Cette grille originale n'est pas le questionnaire O*NET et ne produit pas un code RIASEC standardisé. À reporter dans la synthèse : Intérêts professionnels et pistes à explorer." },
  { code: "07", titre: "Valeurs et critères de choix", onglet: "07 Valeurs", objectif: "Traduire les valeurs importantes en critères de choix observables.", consigne: "Préciser le sens personnel de chaque valeur, puis les signes qui permettraient de la retrouver au travail.", echelle: "Importance : 1 faible à 5 essentielle. Condition indispensable : Oui, Non ou À préciser.", exemple: "Équité : procédures de décision explicites ; signal à vérifier : règles de répartition des missions ; compromis : modalités discutables, principe essentiel.", lecture: "Une condition indispensable se vérifie séparément ; elle ne doit pas disparaître dans une moyenne.", sousTitre: "Clarification des priorités", colonnes: ["Valeur / critère", "Sens pour le bénéficiaire", "Importance 1-5", "Condition indispensable", "Signal observable", "Compromis possible"], lignes: ["Utilité sociale", "Équité", "Apprentissage", "Autonomie", "Qualité du travail", "Collectif et coopération", "Stabilité", "Équilibre de vie"], contexte: ["Contexte du choix à faire", "Critères déjà identifiés"], guide: "20 à 30 min. Les valeurs peuvent être reformulées ou remplacées. Ne pas imposer une hiérarchie universelle. À reporter dans la synthèse : Critères prioritaires, compromis et arbitrages." },
  { code: "08", titre: "Réalisations et preuves", onglet: "08 Réalisations", objectif: "Étayer les compétences avec des réalisations et le rôle effectivement joué.", consigne: "Décrire la situation, la tâche, les actions personnelles et les résultats. Repérer ensuite la compétence mobilisée.", echelle: "Analyse qualitative. Séparer le résultat collectif de la contribution personnelle.", exemple: "Situation : retard d'un dossier. Tâche : rétablir le calendrier. Action : prioriser et coordonner. Résultat : livraison à la date convenue.", lecture: "Retenir les compétences appuyées par une action identifiable et un résultat ou un enseignement concret.", sousTitre: "Analyse originale de situations selon STAR", colonnes: ["Situation / contexte", "Tâche et objectif", "Actions personnelles", "Résultat / enseignement", "Compétence démontrée", "Preuve / transfert"], lignes: ["", "", "", ""], contexte: ["Expériences choisies", "Période de référence"], guide: "30 à 45 min. Une réalisation utile peut être un succès ou une difficulté qui a produit un apprentissage. Ne pas inventer d'indicateur absent. À reporter dans la synthèse : Compétences, aptitudes et exemples du parcours." },
  { code: "09", titre: "Énergie dans les activités", onglet: "09 Énergie", objectif: "Repérer les activités et les contextes qui donnent de l'élan ou qui coûtent de l'énergie.", consigne: "Choisir une situation récente. Évaluer l'énergie avant et après, puis noter les facteurs de contexte.", echelle: "Énergie ressentie : 0 très basse à 10 très haute, sur la même situation.", exemple: "Animer un atelier : avant 4, après 7, écart +3 ; contexte : groupe volontaire et sujet maîtrisé ; test : renouveler avec un autre public.", lecture: "Écart = après - avant. Lire plusieurs situations ; un écart isolé dépend aussi du contexte et de la fatigue.", sousTitre: "Observation originale de situations de travail", colonnes: ["Activité / situation", "Avant 0-10", "Après 0-10", "Écart calculé", "Facteurs de contexte", "Ajustement à tester"], lignes: ["Résoudre un problème", "Créer ou concevoir", "Transmettre ou former", "Accompagner ou écouter", "Coordonner ou gérer", "Réaliser ou produire"], contexte: ["Période observée", "Mode de recueil : situation ou journal"], guide: "15 à 25 min. Cette observation porte sur les activités et leur contexte. Elle ne constitue pas une mesure médicale ou un test de personnalité. À reporter dans la synthèse : Conditions de mobilisation et activités recherchées." },
  { code: "10", titre: "Contraintes et ressources", onglet: "10 Transition", objectif: "Rendre visibles les conditions de réalisation du projet et les appuis disponibles.", consigne: "Décrire la situation actuelle, la condition à respecter et une réponse possible.", echelle: "Statut : Indispensable, Négociable ou À préciser. Chiffrer les seuils seulement quand ils sont connus.", exemple: "Mobilité : déplacement limité à 45 minutes ; ressource : transports disponibles ; action : vérifier les horaires et lieux des postes visés.", lecture: "Une contrainte appelle une adaptation ou une vérification ; elle peut conduire à revoir le calendrier ou la piste.", sousTitre: "Préparation de la transition professionnelle", colonnes: ["Dimension", "Situation / seuil concret", "Statut de la condition", "Ressource ou appui", "Réponse / action", "À vérifier"], lignes: ["Localisation et mobilité", "Horaires et disponibilité", "Revenu minimal", "Temps de formation", "Budget de transition", "Conditions d'exercice", "Réseau et appuis", "Autre condition utile"], contexte: ["Projet ou piste concernée", "Horizon de transition envisagé"], guide: "25 à 35 min. Recueillir uniquement les informations pertinentes pour le projet. Le bénéficiaire définit ses seuils et ses marges de négociation. À reporter dans la synthèse : Conditions, moyens et obstacles à traiter." },
  { code: "11", titre: "Enquêtes métiers", onglet: "11 Enquêtes métiers", objectif: "Vérifier les activités réelles, les conditions d'accès et les possibilités du territoire.", consigne: "Préparer les questions, recueillir les faits et distinguer un témoignage d'une information confirmée.", echelle: "Analyse qualitative. Date de recueil au format date.", exemple: "Entretien avec un professionnel : déplacements plus fréquents que prévu ; conséquence : vérifier les offres locales et discuter la mobilité.", lecture: "Comparer plusieurs sources lorsque c'est utile et noter l'incidence des informations sur la piste.", sousTitre: "Confrontation des pistes au terrain", colonnes: ["Métier / piste", "Source / contact", "Date", "Question et fait recueilli", "Conséquence pour la piste", "Vérification suivante"], lignes: ["", "", "", ""], contexte: ["Pistes à investiguer", "Questions prioritaires"], guide: "20 à 30 min de préparation puis restitution. Conserver le contexte du témoignage et les références des informations. Une seule expérience ne représente pas tout un métier. À reporter dans la synthèse : Faisabilité documentée et points à confirmer." },
  { code: "12", titre: "Comparer les projets", onglet: "12 Comparaison", objectif: "Comparer jusqu'à trois projets à partir des mêmes critères et des informations disponibles.", consigne: "Nommer les projets. Attribuer un poids à chaque critère et une correspondance à chaque projet.", echelle: "Poids : 1 secondaire à 5 prioritaire. Correspondance : 0 nulle à 5 forte. Une information inconnue reste vide.", exemple: "Poids 3 × note 4 = 12. Une condition indispensable non respectée doit être traitée séparément, même si la moyenne est élevée.", lecture: "Moyenne sur 5 : somme(poids × notes) / somme(poids). Compléter les six critères. Vérifier les conditions indispensables séparément.", sousTitre: "Aide multicritère au choix", colonnes: ["Critère", "Poids 1-5", "Projet A : 0-5", "Projet B : 0-5", "Projet C : 0-5", "Preuve / information manquante"], lignes: ["Intérêts et activités", "Compétences mobilisables", "Valeurs et motivations", "Conditions de travail", "Accès et formation", "Opportunités vérifiées", "Moyenne pondérée sur 5"], contexte: ["Projet A", "Projet B", "Projet C", "Condition indispensable 1", "Condition indispensable 2", "Décision argumentée", "Vérification prioritaire"], guide: "25 à 35 min. Calcul d'aide à la discussion, sans seuil de réussite. Ne pas remplacer une information inconnue par zéro. La décision finale doit être argumentée. À reporter dans la synthèse : Choix argumentés, alternative et plan d'action." },
];

const GUIDE_GENERAL: Array<[string, string]> = [
  ["Mode d'emploi", "Choisir les matrices utiles à la demande. Les cellules vides sont à compléter pendant l'entretien. Les écarts et les moyennes sont calculés à partir des notes saisies."],
  ["Démarche", "Pour chaque matrice : recueillir la réponse, demander un exemple, examiner une nuance ou contradiction, puis décider d'une vérification. Compléter ensuite la Synthèse."],
  ["Tests et exercices", "Les matrices 01 et 04 restituent les résultats d'un outil réellement utilisé. Les autres grilles sont des exercices originaux d'entretien. Leurs notes ne sont pas des scores psychométriques étalonnés."],
  ["Données manquantes", "Laisser une note vide si elle n'est pas renseignée. Zéro est une réponse valable uniquement lorsque l'échelle l'autorise. Les exemples fictifs servent de modèle et ne décrivent pas le bénéficiaire."],
  ["Comparaison des projets", "Nommer chaque projet utilisé, compléter les six poids et ses six notes. Une condition indispensable non respectée ne doit pas être compensée par la moyenne."],
];
const REFERENCES: Array<[string, string]> = [
  ["Horizons de carrière-R : présentation de l'éditeur — https://sites.google.com/site/editionstestallia/horizons-de-carriere", "Repères pour restituer un inventaire existant, sans reproduire ses items ou ses barèmes."],
  ["O*NET : Interest Profiler — https://www.onetcenter.org/IP.html", "Référence pour les six familles RIASEC. La matrice 06 est un exercice original d'exploration."],
  ["IPIP : ressources sur la personnalité — https://ipip.ori.org/", "Référence de ressources de mesure. La matrice 04 sert à consigner et discuter les résultats du test réellement utilisé."],
  ["Théorie de l'autodétermination — https://selfdeterminationtheory.org/the-theory/", "Repères conceptuels : autonomie, compétence et relations. La matrice 03 est une grille d'entretien originale."],
];

/** Matrices en PDF (outil vierge, IND 5 et 11). */
export function mdMatrices(ctx: BdcContext): string {
  const o = ctx.organisme.raisonSociale;
  const parts = [`# MATRICES D'ÉVALUATION DU BILAN

_Outils d'entretien de la phase d'investigation — classeur vierge (version Excel jointe)_

## Guide d'utilisation

| Rubrique | Contenu |
|---|---|
${GUIDE_GENERAL.map(([a, b]) => `| ${a} | ${b} |`).join("\n")}

| Matrice | Utilisation et point d'attention |
|---|---|
${MATRICES.map((m) => `| ${m.code} ${m.titre} | ${m.guide} |`).join("\n")}

| Référence | Source et usage |
|---|---|
${REFERENCES.map(([a, b]) => `| ${a} | ${b} |`).join("\n")}

Conception des grilles : matrices d'entretien de ${o}. Adapter les questions au besoin et au travail réalisé.
`];
  for (const m of MATRICES) {
    parts.push(`## ${m.code} ${m.titre}

| | |
|---|---|
| Objectif | ${m.objectif} |
| Consigne | ${m.consigne} |
| Échelle | ${m.echelle} |
| Exemple fictif | ${m.exemple} |
| Lecture | ${m.lecture} |

**${m.sousTitre}**

| ${m.colonnes.join(" | ")} |
|${m.colonnes.map(() => "---").join("|")}|
${m.lignes.map((l) => {
    const cells = l.split(" | ");
    return `| ${cells.join(" | ")} |${" |".repeat(m.colonnes.length - cells.length)}`;
  }).join("\n")}

| | |
|---|---|
${m.contexte.map((c) => `| ${c} |  |`).join("\n")}
`);
  }
  parts.push(`## Synthèse croisée

| Matrice | Constat retenu | Preuve ou expérience | Nuance / contradiction | Conséquence / action |
|---|---|---|---|---|
${MATRICES.map((m) => `| ${m.code} ${m.titre} |  |  |  |  |`).join("\n")}

| | |
|---|---|
| Projet ou piste retenue |  |
| Raisons du choix |  |
| Première action, responsable et échéance |  |
| Question à reprendre au suivi |  |
`);
  return parts.join("\n");
}

const escHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/**
 * Classeur des matrices (une feuille par matrice) au format HTML multi-feuilles lu par
 * htmlToXlsxBlob. Version « renseignée » : seules les cellules d'identification sont
 * remplies avec les données du dossier ; aucune note ni aucun constat n'est produit.
 */
export function htmlClasseurMatrices(ctx: BdcContext, org: OrganismeInfo, b?: Beneficiaire | null): string {
  const v = String(org.version || "1").replace(/[^0-9]/g, "") || "1";
  const maj = ctx.organisme.dateMaj ? fmtDateFR(ctx.organisme.dateMaj) : "";
  const tete = `${ctx.organisme.raisonSociale} — Version ${v}${maj ? ` · Mise à jour du ${maj}` : ""}`;
  const tr = (cells: string[], th = false) => `<tr>${cells.map((c) => (th ? `<th>${escHtml(c)}</th>` : `<td>${escHtml(c)}</td>`)).join("")}</tr>`;
  const p = b ? prestationFor(ctx, b) : null;
  const sheets: Array<{ name: string; rows: string }> = [];
  sheets.push({ name: "Synthèse", rows: [
    tr([tete]), tr(["Synthèse croisée"]),
    ...(b ? [tr(["Bénéficiaire", `Copie anonymisée — ${b.prenom.charAt(0)}. ${b.nom.charAt(0)}.`]), tr(["Période", `du ${fmtDateFR(p!.dateDebut)} au ${fmtDateFR(p!.dateFin)}`])] : [tr([""])]),
    tr(["Matrice", "Constat retenu", "Preuve ou expérience", "Nuance / contradiction", "Conséquence / action"], true),
    ...MATRICES.map((m) => tr([`${m.code} ${m.titre}`, "", "", "", ""])),
    tr(["Projet ou piste retenue", ""]), tr(["Raisons du choix", ""]), tr(["Première action, responsable et échéance", ""]), tr(["Question à reprendre au suivi", ""]),
  ].join("") });
  for (const m of MATRICES) {
    sheets.push({ name: m.onglet, rows: [
      tr([tete]), tr([`${m.code} ${m.titre}`]),
      tr(["Objectif", m.objectif]), tr(["Consigne", m.consigne]), tr(["Échelle", m.echelle]), tr(["Exemple fictif", m.exemple]), tr(["Lecture", m.lecture]),
      tr([m.sousTitre]),
      tr(m.colonnes, true),
      ...m.lignes.map((l) => {
        const cells = l.split(" | ");
        return tr([...cells, ...Array.from({ length: m.colonnes.length - cells.length }, () => "")]);
      }),
      ...m.contexte.map((c) => tr([c, ""])),
    ].join("") });
  }
  sheets.push({ name: "Guide", rows: [
    tr([tete]), tr(["Guide d'utilisation"]),
    tr(["Bénéficiaire", b ? `Copie anonymisée — ${b.prenom.charAt(0)}. ${b.nom.charAt(0)}.` : ""]), tr(["Consultant", consultantNom(ctx)]), tr(["Date de travail", ""]),
    ...GUIDE_GENERAL.map(([a, c]) => tr([a, c])),
    tr(["Matrice", "Utilisation et point d'attention"], true),
    ...MATRICES.map((m) => tr([`${m.code} ${m.titre}`, m.guide])),
    tr(["Référence", "Source et usage"], true),
    ...REFERENCES.map(([a, c]) => tr([a, c])),
  ].join("") });
  const noms = sheets.map((s) => `<x:ExcelWorksheet><x:Name>${escHtml(s.name)}</x:Name></x:ExcelWorksheet>`).join("");
  return `<html><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>${noms}</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>${sheets.map((s, i) => `<div id="sheet${i + 1}"><table>${s.rows}</table></div>`).join("")}</body></html>`;
}

/** Fusionne plusieurs classeurs HTML (une feuille chacun) en un classeur multi-feuilles. */
export function fusionnerClasseurs(classeurs: Array<{ nom: string; html: string }>, intro?: { nom: string; lignes: string[] }): string {
  const tables: Array<{ nom: string; table: string }> = [];
  if (intro) tables.push({ nom: intro.nom, table: `<table>${intro.lignes.map((l) => `<tr><td>${escHtml(l)}</td></tr>`).join("")}</table>` });
  for (const c of classeurs) {
    const t = c.html.match(/<table[\s\S]*?<\/table>/i);
    if (t) tables.push({ nom: c.nom, table: t[0] });
  }
  const noms = tables.map((t) => `<x:ExcelWorksheet><x:Name>${escHtml(t.nom)}</x:Name></x:ExcelWorksheet>`).join("");
  return `<html><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>${noms}</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>${tables.map((t, i) => `<div id="sheet${i + 1}">${t.table}</div>`).join("")}</body></html>`;
}

// ───────────────────────────── IND 12 / 31 — Registres ─────────────────────────────

export function htmlRegistreAbandons(ctx: BdcContext, org: OrganismeInfo, arrete: Date): string {
  const n = ctx.beneficiaires.length;
  const tete = `${ctx.organisme.raisonSociale} — Abandons et aléas`;
  const v = String(org.version || "1").replace(/[^0-9]/g, "") || "1";
  const id = [ctx.organisme.siret ? `SIRET ${ctx.organisme.siret}` : "", ctx.organisme.nda ? `NDA ${ctx.organisme.nda}` : "", `Version ${v}`, ctx.organisme.dateMaj ? `Mise à jour du ${fmtDateFR(ctx.organisme.dateMaj)}` : ""].filter(Boolean).join(" · ");
  const cols = ["Réf.", "Date du constat", "Bénéficiaire", "Nature", "Description", "Entretien réalisé le", "Cause retenue", "Adaptation proposée", "Décision", "Statut"];
  const tr = (c: string[], th = false) => `<tr>${c.map((x) => (th ? `<th>${escHtml(x)}</th>` : `<td>${escHtml(x)}</td>`)).join("")}</tr>`;
  return `<html><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Abandons et aléas</x:Name></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><div id="sheet1"><table>${[
    tr([tete]), tr([id]), tr([`Arrêté au ${fmtDateFR(arrete)} — effectif : ${n} bénéficiaire${n > 1 ? "s" : ""}.`]),
    tr(cols, true), tr(cols.map(() => "")), tr(cols.map(() => "")), tr(cols.map(() => "")),
    tr(["Nature : abandon définitif · suspension temporaire · absence · report de séance"]),
    tr(["Chaque ligne est inscrite le jour du constat, à partir des feuilles d'émargement et des échanges avec le bénéficiaire ; voir le process de prévention et de traitement des abandons (indicateur 12)"]),
  ].join("")}</table></div></body></html>`;
}

export function mdRegistreReclamations(ctx: BdcContext, arrete: Date): string {
  const tenu = ctx.organisme.representantLegal.nom || consultantNom(ctx);
  return `# REGISTRE DES RÉCLAMATIONS

_Indicateur 31 — Arrêté au ${fmtDateFR(arrete)}_

Le registre est ouvert, opérationnel et tenu par ${tenu}. Chaque réclamation y est inscrite le jour de sa réception ; à défaut de ligne renseignée, aucune réclamation n'a été reçue à la date d'arrêté.

| N° | Date de réception | Origine | Auteur | Objet | Accusé de réception | Réponse adressée | Action corrective | Statut |
|---|---|---|---|---|---|---|---|---|
${Array.from({ length: 6 }, () => "|  |  |  |  |  |  |  |  |  |").join("\n")}

**Mode d'emploi**

| Colonne | Ce qu'il faut y inscrire |
|---|---|
| Origine | Courriel, courrier, oral formalisé, questionnaire de satisfaction, entretien intermédiaire |
| Auteur | Bénéficiaire, entreprise, financeur, intervenant |
| Accusé de réception | Date de l'accusé — à adresser sous 48 heures ouvrées |
| Réponse adressée | Date de la réponse écrite motivée — sous 15 jours calendaires |
| Action corrective | Référence de la ligne correspondante du Tableau d'amélioration continue |
| Statut | En cours ou soldée |

**Articulation avec les autres registres**

- Les difficultés et aléas qui ne constituent pas une réclamation formelle sont consignés au Tableau des dysfonctionnements.
- Les abandons sont consignés au Registre des abandons et des aléas (indicateur 12).
- Toute action corrective décidée est reportée au Tableau d'amélioration continue (indicateur 32).
`;
}

// ───────────────────────────── IND 18 / 21 / 23-25 ─────────────────────────────

export function mdProcessCoordination(ctx: BdcContext, org: OrganismeInfo): string {
  const o = ctx.organisme.raisonSociale;
  const c = consultantNom(ctx);
  const dir = ctx.organisme.representantLegal.nom;
  const qualite = (org.referentQualite || "").trim();
  const unique = !dir || c === dir;
  return `# PROCESS — COORDINATION DES INTERVENANTS

_Indicateur 18 — Mobilisation et coordination des intervenants internes et externes_

## 1. Périmètre

${o} réalise ses bilans de compétences avec ${unique ? "un intervenant interne unique" : "les intervenants désignés ci-dessous"}. Le recours à un intervenant externe est possible dans deux cas : la sous-traitance d'une prestation (indicateur 27) et l'appui spécialisé sur la démarche qualité ou sur l'adaptation au handicap.

## 2. Intervenants et rôles

| Intervenant | Statut | Rôle | Modalité de coordination |
|---|---|---|---|
| ${c} | Interne${unique ? " — représentant légal" : ""} | Conduite des bilans${unique ? ", fonctions de référent handicap, qualité et administratif" : ""} | Revue mensuelle des dossiers en cours ; tableau de bord des parcours |
${!unique ? `| ${dir} | Interne — représentant légal | Pilotage de l'organisme, contractualisation | Revue mensuelle des dossiers en cours |\n` : ""}${qualite && !/^(?:\s*)$/.test(qualite) && qualite !== c && qualite !== dir ? `| ${qualite} | Externe — prestataire | Appui sur la démarche qualité, la veille réglementaire et la préparation des audits | Point trimestriel ; transmission des comptes rendus de veille ; revue annuelle du système qualité |\n` : ""}| Consultants sous-traitants | Externe — le cas échéant | Conduite de bilans pour le compte de ${o} en cas de surcroît d'activité ou d'indisponibilité | Contrat de sous-traitance, charte des consultants, transmission des comptes rendus et des émargements |
| Partenaires handicap | Externe — réseau | Appui à l'adaptation, réorientation si nécessaire | Contacts formalisés dans le tableau « Contacts et suivi handicap » |

## 3. Modalités de coordination

| Moment | Objet | Trace |
|---|---|---|
| À l'entrée d'un bénéficiaire | Affectation du consultant, vérification de sa disponibilité sur tout le planning | Tableau de suivi des bénéficiaires |
| Avant chaque séance | Préparation de la séance à partir de la fiche pédagogique et du dossier individuel | Fiche pédagogique |
| Mensuel | Revue des dossiers en cours : avancement, absences, adaptations, alertes | Tableau de suivi des parcours |
| Trimestriel | Point qualité : veille, satisfaction, réclamations, actions correctives | Compte rendu de point qualité, tableau d'amélioration continue |
| Annuel | Revue du système qualité, entretien annuel, plan de développement des compétences | Compte rendu de revue annuelle |
| En cas de sous-traitance | Transmission du cadre, des objectifs, des supports et des obligations ; contrôle des retours | Contrat, charte, comptes rendus |

## 4. Information circulant entre intervenants

Limite de confidentialité : aucune information relative au contenu d'un bilan n'est échangée entre intervenants. Seules circulent les données strictement nécessaires à la coordination : identité, dates, volume horaire, avancement, besoins d'adaptation. Le consultant en charge du bilan est le seul destinataire des contenus.
`;
}

const EVAL_POSTE = `**Modalités d'évaluation des compétences**

- À l'entrée dans la fonction : entretien de recrutement structuré et vérification des pièces justificatives (diplômes, certifications, expériences).
- En continu : suivi des indicateurs de résultats et des retours de satisfaction des parties prenantes.
- Annuellement : entretien individuel annuel, évaluation des savoirs, savoir-faire et savoir-être, définition des objectifs de l'année suivante (indicateur 22).
- Le cas échéant : plan de développement des compétences assorti d'actions de formation tracées.
`;

export function fichesDePosteNexus(ctx: BdcContext, org: OrganismeInfo): Array<{ nom: string; md: string }> {
  const dir = ctx.organisme.representantLegal.nom || org.dirigeant || "";
  const c = consultantNom(ctx);
  const maj = ctx.organisme.dateMaj ? fmtDateFR(ctx.organisme.dateMaj) : "";
  const tit = (x?: string) => (x || "").trim() || dir;
  const postes: Array<{ fonction: string; titulaire: string; missions: string[]; competences: string[]; savoirEtre: string[] }> = [
    { fonction: "Consultant en bilan de compétences", titulaire: c, missions: ["Conduire les trois phases réglementaires du bilan (art. R6313-4)", "Analyser la demande et formaliser les objectifs individualisés avec le bénéficiaire", "Mobiliser les outils d'investigation et en restituer les résultats", "Rédiger conjointement le document de synthèse et le remettre au bénéficiaire", "Assurer le suivi à six mois", "Garantir la confidentialité, la neutralité et l'absence de conflit d'intérêts", "Tracer l'ensemble des actes dans le dossier individuel"], competences: ["Titre, diplôme ou expérience en psychologie du travail, conseil en évolution professionnelle, accompagnement ou ressources humaines", "Maîtrise des outils d'exploration des intérêts, des valeurs et des compétences", "Connaissance du cadre légal et réglementaire du bilan de compétences", "Connaissance des dispositifs de formation et de financement", "Conduite d'entretien : écoute active, reformulation, questionnement, explicitation"], savoirEtre: ["Écoute et disponibilité", "Neutralité et absence de jugement", "Rigueur dans la traçabilité", "Respect strict de la confidentialité"] },
    { fonction: "Référent administratif", titulaire: tit(org.poleAdministratif), missions: ["Établir les conventions, les CGV, les plannings et les annexes contractuelles", "Suivre les délais de rétractation et les dates de démarrage", "Collecter et archiver les feuilles d'émargement", "Établir les certificats de réalisation et les factures", "Constituer et suivre les dossiers de financement", "Tenir les tableaux de suivi des bénéficiaires et des parcours", "Préparer le bilan pédagogique et financier"], competences: ["Gestion administrative de la formation professionnelle", "Connaissance des règles de financement (CPF, OPCO, France Travail)", "Maîtrise des outils bureautiques et collaboratifs", "Expression écrite et orthographe irréprochables"], savoirEtre: ["Fiabilité", "Organisation", "Respect des délais", "Discrétion"] },
    { fonction: "Référent commercial et communication", titulaire: tit(org.relationEntreprises), missions: ["Diffuser l'information sur l'offre conformément à l'indicateur 1", "Actualiser la fiche de présentation et, le cas échéant, l'offre publiée sur Mon Compte Formation", "Répondre aux demandes entrantes sous 48 heures ouvrées et les tracer", "Garantir la cohérence et l'exactitude des informations diffusées", "Développer le réseau de partenaires et d'acteurs socio-économiques"], competences: ["Connaissance du secteur de la formation professionnelle", "Maîtrise des règles d'information du public applicables aux organismes de formation", "Capacité rédactionnelle"], savoirEtre: ["Fiabilité de l'information diffusée", "Sens du contact", "Honnêteté commerciale"] },
    { fonction: "Référent handicap", titulaire: tit(org.referentHandicap), missions: ["Poser systématiquement la question de l'adaptation lors de l'analyse du besoin", "Recueillir les besoins d'adaptation sans exiger de déclaration de statut", "Définir, mettre en œuvre et tracer les aménagements", "Mobiliser les partenaires spécialisés (Agefiph, Cap emploi, MDPH, RHF)", "Orienter vers un partenaire compétent lorsque l'adaptation dépasse les moyens de l'organisme, et tracer cette orientation", "Évaluer l'efficacité des adaptations mises en œuvre"], competences: ["Connaissance des dispositifs de compensation du handicap", "Connaissance du réseau des acteurs spécialisés", "Capacité à formaliser un plan d'adaptation individualisé", "Actualisation régulière par la formation et la veille"], savoirEtre: ["Discrétion", "Absence de préjugé", "Sens de l'écoute"] },
    { fonction: "Référent qualité", titulaire: (() => { const q = (org.referentQualite || "").trim(); return q && q !== dir ? `${dir}, avec l'appui externe de ${q.replace(/\s*\(\s*externe\s*\)\s*/i, "")}` : dir; })(), missions: ["Piloter le système qualité et la conformité au référentiel national qualité", "Tenir le registre des réclamations et le tableau des dysfonctionnements", "Tenir et exploiter le tableau d'amélioration continue", "Organiser la veille légale et réglementaire, métier et pédagogique, et en tracer l'impact", "Calculer et publier les indicateurs de résultats", "Préparer les audits et suivre les actions correctives"], competences: ["Maîtrise du référentiel national qualité et de son guide de lecture", "Capacité d'analyse des indicateurs de performance", "Méthode d'analyse de cause et de construction d'actions correctives"], savoirEtre: ["Rigueur", "Esprit d'analyse", "Capacité à documenter"] },
  ];
  return postes.map((p) => ({
    nom: `Fiche de poste - ${p.fonction}`,
    md: `# FICHE DE POSTE — ${p.fonction.toUpperCase()}

_Indicateur 21 — Détermination des compétences requises pour la fonction_

| | |
|---|---|
| Intitulé de la fonction | ${p.fonction} |
| Titulaire${maj ? ` au ${maj}` : ""} | ${p.titulaire} |
| Rattachement | ${dir}, représentant légal de ${ctx.organisme.raisonSociale} |
| Date d'établissement de la fiche | ${maj} |

**Missions principales**

${p.missions.map((x) => `- ${x}`).join("\n")}

**Compétences requises**

${p.competences.map((x) => `- ${x}`).join("\n")}

**Savoir-être attendus**

${p.savoirEtre.map((x) => `- ${x}`).join("\n")}

${EVAL_POSTE}`,
  }));
}

export function processVeilleNexus(ctx: BdcContext, org: OrganismeInfo): Array<{ ind: 23 | 24 | 25; nom: string; md: string }> {
  const o = ctx.organisme.raisonSociale;
  const ref = `${ctx.organisme.representantLegal.nom || consultantNom(ctx)}${ctx.organisme.emailContact ? ` — ${ctx.organisme.emailContact}` : ""}`;
  const q = (org.referentQualite || "").trim().replace(/\s*\(\s*externe\s*\)\s*/i, "");
  const appui = q && q !== ctx.organisme.representantLegal.nom ? `| Appui externe | ${q}, prestataire externe, transmet ses notes d'actualité et participe au point qualité trimestriel |\n` : "";
  const deroule = `## 4. Déroulé de la veille

1. Consulter — les sources sont consultées selon la fréquence définie ci-dessus.
2. Qualifier — chaque information repérée est qualifiée : concerne-t-elle ${o} ? Est-elle applicable, et à quelle échéance ?
3. Enregistrer — l'information retenue est inscrite au registre de veille avec sa date, sa source et son objet.
4. Analyser l'impact — l'impact est apprécié sur les prestations, les documents, les process ou les compétences.
5. Décider — une décision explicite est prise : aucune action, mise à jour documentaire, modification de process, action de formation.
6. Mettre en œuvre et tracer — la décision est exécutée, datée et tracée. Si elle constitue une amélioration, elle est reportée au Tableau d'amélioration continue (indicateur 32).
7. Diffuser — la veille est diffusée aux intervenants internes et externes lors du point trimestriel et, pour les sous-traitants, par transmission écrite.
`;
  const build = (ind: 23 | 24 | 25, titre: string, objet: string, themes: string[], sources: Array<[string, string, string]>) => `# PROCESS — ${titre.toUpperCase()}

_Indicateur ${ind} — ${objet}_

## 1. Responsable et organisation

| | |
|---|---|
| Référent veille | ${ref} |
${appui}| Fréquence de consultation | Mensuelle, avec une revue de synthèse trimestrielle |
| Support de traçabilité | Registre de veille — indicateur ${ind} |

## 2. Thèmes suivis

${themes.map((t) => `- ${t}`).join("\n")}

## 3. Sources identifiées

| Source | Nature | Fréquence de consultation |
|---|---|---|
${sources.map((s) => `| ${s.join(" | ")} |`).join("\n")}

${deroule}
Le point attendu par l'indicateur ${ind} n'est pas la veille elle-même mais son exploitation. Le registre de veille comporte donc, pour chaque information retenue, une colonne « impact analysé » et une colonne « décision et mise en œuvre », renseignées et datées.
`;
  return [
    { ind: 23, nom: "Process Veille légale et réglementaire", md: build(23, "Veille légale et réglementaire", "Veille légale et réglementaire sur le champ de la formation professionnelle, et son intégration dans les prestations", ["Évolutions du cadre légal et réglementaire du bilan de compétences (art. L6313-4, R6313-4 à R6313-8)", "Évolutions du référentiel national qualité et de son guide de lecture", "Évolutions des règles de financement et des conditions générales d'utilisation de Mon Compte Formation", "Évolutions du contrat de formation professionnelle et du délai de rétractation", "Obligations en matière de protection des données et d'information du public", "Obligations déclaratives : bilan pédagogique et financier, déclaration d'activité"], [["Légifrance — Code du travail, sixième partie", "Texte officiel", "Mensuelle"], ["Ministère du Travail — rubrique formation professionnelle", "Institutionnel", "Mensuelle"], ["France Compétences — publications et délibérations", "Institutionnel", "Mensuelle"], ["Caisse des dépôts — espace des organismes de formation (EDOF)", "Institutionnel", "Mensuelle"], [`DREETS ${ctx.organisme.regionPrefecture || "de la région"} — actualités et instructions`, "Institutionnel", "Mensuelle"], ["Centre Inffo — actualité du droit de la formation", "Presse spécialisée", "Mensuelle"], ["CNIL — recommandations applicables au secteur", "Institutionnel", "Trimestrielle"], ["Organisme certificateur — notes d'information sur le référentiel", "Certificateur", "À chaque publication"]]) },
    { ind: 24, nom: "Process Veille sur les compétences, les métiers et les emplois", md: build(24, "Veille sur les compétences, les métiers et les emplois", "Veille sur l'évolution des compétences, des métiers et des emplois dans les secteurs d'intervention, et son intégration dans les prestations", ["Évolution des compétences attendues sur les métiers explorés par les bénéficiaires", "Métiers en tension et perspectives de recrutement sur le bassin d'emploi", "Apparition, transformation ou disparition de métiers", "Évolution des certifications professionnelles et de leurs voies d'accès", "Conditions réelles d'exercice des métiers visés, recueillies par les enquêtes terrain"], [["France Travail — fiches ROME et statistiques du marché du travail", "Institutionnel", "Mensuelle"], ["France Travail — enquête Besoins en main-d'œuvre (BMO)", "Étude", "Annuelle"], ["DARES — études et statistiques sur l'emploi et les métiers", "Étude", "Trimestrielle"], ["France Stratégie — prospective des métiers et des qualifications", "Étude", "Annuelle"], ["France Compétences — répertoires RNCP et RS", "Institutionnel", "Mensuelle"], ["Observatoires prospectifs des métiers et des qualifications des branches", "Branche professionnelle", "Trimestrielle"], ["ONISEP — fiches métiers et voies d'accès", "Institutionnel", "Trimestrielle"], ["Enquêtes métier conduites par les bénéficiaires eux-mêmes", "Terrain", "À chaque parcours"]]) },
    { ind: 25, nom: "Process Veille sur les innovations pédagogiques et technologiques", md: build(25, "Veille sur les innovations pédagogiques et technologiques", "Veille sur les innovations pédagogiques et technologiques permettant une évolution des prestations", ["Nouveaux outils d'exploration des intérêts, des valeurs et des compétences", "Évolutions des pratiques d'accompagnement à distance et d'émargement électronique", "Outils numériques d'aide à la construction du portefeuille de compétences", "Accessibilité numérique des supports remis aux bénéficiaires", "Modalités de restitution et de co-rédaction du document de synthèse"], [["Centre Inffo — ingénierie et innovation pédagogique", "Presse spécialisée", "Mensuelle"], ["Publications de la Fédération de la formation professionnelle", "Organisation professionnelle", "Trimestrielle"], ["Travaux et publications sur les outils d'orientation et de bilan", "Recherche et édition spécialisée", "Trimestrielle"], ["Éditeurs d'outils d'évaluation et d'orientation professionnelle", "Fournisseur", "Semestrielle"], ["Salons et événements professionnels du secteur de la formation", "Événement", "Annuelle"], ["Retours des bénéficiaires sur les outils mobilisés", "Terrain", "À chaque questionnaire de satisfaction"]]) },
  ];
}

// ───────────────────────────── IND 30 — Autres parties prenantes ─────────────────────────────

const QUESTIONS_PARTIE: Record<"entreprise" | "financeur" | "interne", string[]> = {
  entreprise: ["Clarté de l'information reçue avant l'engagement", "Respect du cadre de la convention tripartite", "Qualité des échanges avec l'organisme", "Respect de la confidentialité due au salarié", "Utilité de la démarche pour l'évolution du salarié", "Satisfaction globale"],
  financeur: ["Conformité des pièces transmises", "Respect des délais administratifs", "Qualité des échanges avec l'organisme", "Satisfaction globale"],
  interne: ["Adéquation des moyens mis à disposition", "Clarté des process et des outils", "Qualité de la coordination", "Charge de travail et organisation", "Satisfaction globale"],
};

/**
 * Questionnaire d'une autre partie prenante : trame vierge si la partie prenante existe dans le
 * dossier, mention de non-applicabilité motivée sinon. Aucune réponse n'est jamais produite.
 */
export function mdQuestionnairePartie(ctx: BdcContext, b: Beneficiaire, kind: "entreprise" | "financeur" | "interne", arrete: Date): { nom: string; md: string } {
  const o = ctx.organisme.raisonSociale;
  const p = prestationFor(ctx, b);
  const c = consultantNom(ctx);
  const titre = `QUESTIONNAIRE DE SATISFACTION ${kind.toUpperCase()}`;
  const nom = `Questionnaire de satisfaction ${kind}`;
  const tiers = ["CPF", "OPCO", "France Travail", "Transitions Pro", "Région"].includes(p.financeur);
  const employeur = p.origineDemande === "employeur" || p.financeur === "employeur" || p.financeur === "OPCO";
  const unique = !ctx.organisme.representantLegal.nom || c === ctx.organisme.representantLegal.nom;
  const applicable = kind === "entreprise" ? employeur : kind === "financeur" ? tiers : !unique;
  if (!applicable) {
    const motif = kind === "entreprise"
      ? `${b.prenom} ${b.nom} réalise son bilan à titre individuel, du ${fmtDateFR(p.dateDebut)} au ${fmtDateFR(p.dateFin)}. Aucun employeur n'est à l'initiative de la démarche, n'y est partie ni n'en assure le financement : le contrat est bilatéral.`
      : kind === "financeur"
        ? `Le financeur est le bénéficiaire lui-même (${libFinancement(p).toLowerCase()}). Aucun organisme financeur tiers n'intervient : sa satisfaction en tant que payeur est recueillie par le questionnaire bénéficiaire.`
        : `${o} est une structure à intervenant unique pour ce bilan : le consultant est le représentant légal de l'organisme. Son appréciation des moyens et des process est recueillie lors de l'entretien annuel (indicateur 22), et non par un questionnaire adressé à lui-même.`;
    return { nom, md: `# ${titre}

_Indicateur 30 — Non applicable pour ce dossier_

${enteteBen(ctx, b)}
Non applicable. ${motif}

${o} ne produit jamais de réponse à la place d'une partie prenante. Le modèle de questionnaire est conservé au système documentaire pour les dossiers dans lesquels cette partie prenante existe.

| | |
|---|---|
| Mention établie le | ${fmtDateFR(arrete)} |
| Par | ${c} |
` };
  }
  const destinataire = kind === "entreprise" ? (b.employeur?.raisonSociale || b.entreprise || "l'employeur") : kind === "financeur" ? libFinancement(p) : c;
  return { nom, md: `# ${titre}

_Indicateur 30 — À adresser à la fin du bilan (${fmtDateFR(p.dateFin)}), relance à J+7_

${enteteBen(ctx, b)}
| | |
|---|---|
| Destinataire | ${destinataire} |
| Date d'envoi | ____ / ____ / ________ |
| Date de réponse | ____ / ____ / ________ |

Échelle de 1 (très insatisfait) à 5 (très satisfait). Réponses portées par la partie prenante elle-même ; sans réponse après relance, la sollicitation est consignée dans les mentions de l'indicateur 30.

| Question | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
${QUESTIONS_PARTIE[kind].map((q) => `| ${q} | ☐ | ☐ | ☐ | ☐ | ☐ |`).join("\n")}

**Commentaire libre**

${Z}

${Z}
` };
}

