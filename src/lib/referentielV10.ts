/**
 * Pièces propres au guide de lecture V10 du référentiel national qualité (novembre 2026),
 * ajoutées au dossier lorsque versionReferentiel(o) === "V10" (par défaut : nouvel entrant).
 *
 * - IND 12 : prévention et traitement des violences, dont sexistes et sexuelles, du harcèlement
 *   et des discriminations (procédure connue de tous, référent, traçabilité) ;
 * - IND 23 : note de veille sur le guide V10 et vérification du dépôt des comptes ;
 * - IND 32 : audit interne et suivi des heures non réalisées et reportées.
 *
 * Aucun résultat n'est inventé : les constats d'audit et les signalements restent à saisir,
 * les heures ne sont calculées que depuis les données du dossier (durée, assiduité saisie).
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, isStagiaireFormationTerminee } from "./docBuilder";
import { orgVersionUlterieure } from "./versionUlterieure";
import { versionReferentiel, typeAuditEffectif, LIBELLES_AUDIT } from "./typeAudit";
import { typePrestation, type TypePrestation } from "./piecesTypeAudit";
import { INDICATEURS_REFERENCE } from "./qualiopiReference";
import { parseDuree } from "./sampleData";
import { getAssiduiteLabel } from "./indicateursResultats";
import { calendrierVAE } from "./vae/vaeProfil";

const v = (x?: string) => (x || "").trim();
const PUBLIC: Record<TypePrestation, [string, string]> = { AF: ["stagiaire", "stagiaires"], CFA: ["apprenti", "apprentis"], VAE: ["candidat", "candidats"], BC: ["bénéficiaire", "bénéficiaires"] };
const PREFIXE: Record<TypePrestation, string> = { AF: "af", CFA: "cfa", VAE: "vae", BC: "bdc" };
const ACTION_REF: Record<TypePrestation, string> = { AF: "OF", CFA: "CFA", VAE: "VAE", BC: "CBC" };
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Date des pièces V10 : application du nouveau référentiel (01/11/2026), jamais avant la V1 ni après aujourd'hui. */
export function dateV10(o: OrganismeInfo, today: Date = new Date()): string {
  const maj = v(o.dateMaj).slice(0, 10);
  const auj = iso(today);
  const d = "2026-11-01" > auj ? auj : "2026-11-01";
  return maj && maj > d ? maj : d;
}

/** Référent chargé des signalements (IND 12) : le dirigeant. */
export const referentSignalements = (o: OrganismeInfo) => v(o.dirigeant) || v(o.referentQualite);
const referent = referentSignalements;
const contacts = (o: OrganismeInfo) => [v(o.email), v(o.telephone)].filter(Boolean).join(" — ");

/** Entrées de catalogue ajoutées en V10 (une série par type de prestation du dossier). */
export function entreesCatalogueReferentiel(o: OrganismeInfo): { id: string; nom: string; critere: number; indicateur: number; template: string; params?: Record<string, unknown> }[] {
  if (versionReferentiel(o) !== "V10") return [];
  const types = new Set<TypePrestation>();
  const t = o.typesActions || [];
  if (t.length === 0 || t.includes("actions-formation")) types.add("AF");
  if (t.includes("apprentissage")) types.add("CFA");
  if (t.includes("vae")) types.add("VAE");
  if (t.includes("bilans-competences")) types.add("BC");
  return [...types].flatMap((tp) => {
    const p = PREFIXE[tp];
    return [
      { id: `${p}_c3i12_v10_procedure_violences`, nom: "CT3 - IND 12 PROCÉDURE DE PRÉVENTION ET DE TRAITEMENT DES VIOLENCES, DU HARCÈLEMENT ET DES DISCRIMINATIONS", critere: 3, indicateur: 12, template: "v10_procedure_violences", params: { type: tp } },
      { id: `${p}_c3i12_v10_registre_signalements`, nom: "CT3 - IND 12 REGISTRE DES SIGNALEMENTS", critere: 3, indicateur: 12, template: "v10_registre_signalements", params: { type: tp } },
      { id: `${p}_c6i23_v10_note_veille`, nom: "CT6 - IND 23 NOTE DE VEILLE – RÉFÉRENTIEL NATIONAL QUALITÉ 2026 ET DÉPÔT DES COMPTES", critere: 6, indicateur: 23, template: "v10_note_veille", params: { type: tp } },
      { id: `${p}_c7i32_v10_audit_interne`, nom: "CT7 - IND 32 PROGRAMME ET GRILLE D'AUDIT INTERNE", critere: 7, indicateur: 32, template: "v10_audit_interne", params: { type: tp } },
      { id: `${p}_c7i32_v10_suivi_heures`, nom: "CT7 - IND 32 SUIVI DES HEURES NON RÉALISÉES ET REPORTÉES", critere: 7, indicateur: 32, template: "v10_suivi_heures", params: { type: tp } },
    ];
  });
}

/** En V10, le PDF du guide V9 n'est plus la référence de l'indicateur 23. */
export function retirePiecesV9<T extends { template: string; params?: Record<string, any> }>(o: OrganismeInfo, entrees: T[]): T[] {
  if (versionReferentiel(o) !== "V10") return entrees;
  return entrees.filter((d) => !(d.template === "pdf_static" && /v9_guide_lecture/i.test(String(d.params?.pdfFile || ""))));
}

// ─────────────────────────────────────────────────────────────────────────────
// IND 12 — Violences, harcèlement, discriminations
// ─────────────────────────────────────────────────────────────────────────────

export function genProcedureViolences(oDossier: OrganismeInfo, tp: TypePrestation, f?: FormationInfo): string {
  const o = orgVersionUlterieure(oDossier, dateV10(oDossier));
  const [pub, pubPl] = PUBLIC[tp];
  const ref = referent(o);
  const distanciel = /distanciel|distance|visio|meet|zoom|ligne/i.test(`${f?.modalites || ""} ${f?.lieu || ""}`);
  return buildDocument({
    org: o,
    title: "PROCÉDURE DE PRÉVENTION ET DE TRAITEMENT DES VIOLENCES, DU HARCÈLEMENT ET DES DISCRIMINATIONS",
    subtitle: "Indicateur 12 — référentiel national qualité (décret n° 2026-728)",
    sections: [
      { heading: "Objet et champ d'application", content: `<p>${o.nom} prévient et traite toute situation de violence, dont les violences sexistes et sexuelles, de harcèlement et de discrimination qui concerne un ${pub}, un intervenant ou toute personne présente${distanciel ? ", y compris pendant les classes virtuelles, dans les messageries et sur les outils numériques de la formation" : " pendant la formation"}${tp === "CFA" ? ", au centre comme dans l'entreprise d'accueil" : ""}. La procédure est remise à chaque ${pub} avec le livret d'accueil et le règlement intérieur, et rappelée à l'ouverture de chaque session.</p>` },
      { heading: "Ce qui est visé", content: `<ul><li><strong>Violences sexistes et sexuelles</strong> : agissement sexiste (art. L. 1142-2-1 du code du travail), outrage sexiste, harcèlement sexuel (art. 222-33 du code pénal), agression sexuelle.</li><li><strong>Harcèlement moral</strong> : agissements répétés dégradant les conditions de formation (art. 222-33-2 du code pénal).</li><li><strong>Discriminations</strong> : traitement défavorable fondé sur un critère prohibé (origine, sexe, handicap, âge, religion, orientation sexuelle… — art. 225-1 du code pénal).</li><li><strong>Violences physiques ou verbales</strong>, menaces, cyberharcèlement.</li></ul>` },
      { heading: "Référent et canaux de signalement", content: `<p><strong>Référent chargé des signalements :</strong> ${ref}${contacts(o) ? ` — ${contacts(o)}` : ""}.</p><p>Tout ${pub}, intervenant ou témoin peut signaler une situation par courriel, par téléphone, lors d'un entretien individuel ou par le formulaire de réclamation. Le signalement peut être fait sans témoin et reste confidentiel : seules les personnes nécessaires à son traitement en ont connaissance.</p>` },
      { heading: "Traitement", content: `<ol><li><strong>Accusé de réception</strong> sous 48 heures ouvrées et entretien d'écoute avec la personne qui signale.</li><li><strong>Mesures conservatoires</strong> immédiates si nécessaire : séparation des personnes, suspension d'un accès${distanciel ? " à la classe virtuelle" : ""}, exclusion temporaire selon le règlement intérieur (le mis en cause est entendu avant toute sanction).</li><li><strong>Orientation</strong> de la victime : 17 ou 112 en cas d'urgence (114 par SMS), 3919 (violences faites aux femmes), 119 (mineur en danger), Défenseur des droits (09 69 39 00 00), dépôt de plainte${tp === "CFA" ? ", médiateur de l'apprentissage et inspection du travail pour une situation en entreprise" : ""}.</li><li><strong>Information</strong> de l'employeur ou du financeur uniquement lorsque c'est nécessaire et avec l'accord de la victime, sauf obligation légale.</li><li><strong>Clôture</strong> : décision écrite, sanction éventuelle, suivi de la victime jusqu'à la fin de son parcours.</li></ol>` },
      { heading: "Traçabilité et amélioration", content: `<p>Chaque signalement est inscrit au <strong>registre des signalements</strong> (date, canal, nature, mesures, orientation, clôture), conservé de façon confidentielle par le référent. Chaque cas clôturé est analysé : la cause et l'action de prévention retenue sont reportées, sans donnée nominative, au tableau d'amélioration continue (IND 32). Le référent suit une action de formation sur la prévention des violences sexistes et sexuelles (plan de développement des compétences, IND 22).</p>` },
    ],
    signatures: { type: "1", labels: ["Le dirigeant, référent"], names: [ref], dates: [formatDate(dateV10(oDossier))] },
  });
}

export function genRegistreSignalements(oDossier: OrganismeInfo, tp: TypePrestation): string {
  const o = orgVersionUlterieure(oDossier, dateV10(oDossier));
  const [pub] = PUBLIC[tp];
  return buildDocument({
    org: o,
    title: "REGISTRE DES SIGNALEMENTS — VIOLENCES, HARCÈLEMENT, DISCRIMINATIONS",
    subtitle: `Indicateur 12 — tenu par ${referent(o)} (document confidentiel)`,
    sections: [{ heading: "Règles de tenue", content: `<p>Une ligne par signalement, dès sa réception. Les personnes sont désignées par un code (ex. ${pub.charAt(0).toUpperCase()}1) ; la correspondance nominative est conservée à part, avec accès réservé au référent.</p>` }],
    table: {
      headers: ["N°", "Date de réception", "Canal", "Personne concernée (code)", "Nature", "Mesures conservatoires", "Orientation", "Date de clôture", "Action d'amélioration (IND 32)"],
      rows: [["—", formatDate(dateV10(oDossier)), "—", "—", `Aucun signalement reçu à la date d'ouverture du registre`, "—", "—", "—", "—"]],
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// IND 23 — Note de veille V10 et dépôt des comptes
// ─────────────────────────────────────────────────────────────────────────────

const EVOLUTIONS_V10: { ind: number; exigence: string; types?: TypePrestation[] }[] = [
  { ind: 1, exigence: "Préciser le type de reconnaissance obtenue et les modalités de financement ; ne jamais induire le public en erreur." },
  { ind: 2, exigence: "Indicateurs de résultats publiés avec leur méthode de calcul (ex. taux de réalisation des heures)." },
  { ind: 8, exigence: "Positionnement adapté aux personnes en situation de handicap ; à distance, vérification des compétences et outils numériques.", types: ["AF", "CFA", "BC"] },
  { ind: 9, exigence: "Information renforcée pour la formation à distance (ressources, activités, rythme) et pour les personnes en situation de handicap." },
  { ind: 12, exigence: "Procédure de prévention et de traitement des violences, dont sexistes et sexuelles, du harcèlement et des discriminations ; référent ; traçabilité." },
  { ind: 15, exigence: "Information des apprentis mineurs, signalement des violences, médiateur de l'apprentissage, inspection du travail.", types: ["CFA"] },
  { ind: 17, exigence: "Visite d'une session par l'auditeur ou accès observateur à la formation à distance." },
  { ind: 19, exigence: "Suivi effectif des modules à distance (assiduité, progression)." },
  { ind: 22, exigence: "Formation des équipes, notamment à la pédagogie et aux violences sexistes et sexuelles ; auditée dès l'audit initial pour un nouvel entrant." },
  { ind: 23, exigence: "Vérification du dépôt des comptes lorsqu'il est applicable." },
  { ind: 26, exigence: "Partenaires du handicap du territoire, dont la Ressource Handicap Formation et sa charte d'engagement." },
  { ind: 27, exigence: "Conformité de la sous-traitance tracée dans les contrats." },
  { ind: 30, exigence: "Appréciations des financeurs recueillies le cas échéant." },
  { ind: 32, exigence: "Analyse des risques, audit interne, suivi des heures non réalisées et reportées ; audité dès l'audit initial pour un nouvel entrant." },
  { ind: 33, exigence: "Évaluation des contenus et des enseignements par les apprenants, distincte de la satisfaction.", types: ["CFA"] },
];

export function genNoteVeilleV10(oDossier: OrganismeInfo, tp: TypePrestation): string {
  const d = dateV10(oDossier);
  const o = orgVersionUlterieure(oDossier, d);
  const audit = typeAuditEffectif(oDossier);
  const rows = EVOLUTIONS_V10.filter((e) => !e.types || e.types.includes(tp)).map((e) => [`IND ${e.ind}`, e.exigence, "Pièce du dossier mise à jour ou ajoutée", referent(o)]);
  return buildDocument({
    org: o,
    title: "NOTE DE VEILLE — RÉFÉRENTIEL NATIONAL QUALITÉ 2026 ET DÉPÔT DES COMPTES",
    subtitle: "Indicateur 23 — veille légale et réglementaire",
    sections: [
      { heading: "Textes pris en compte", content: `<ul><li>Décret n° 2026-728 du 1er août 2026 : nouveau référentiel national qualité, en vigueur le 1er novembre 2026.</li><li>Arrêté du 28 octobre 2026 : modalités d'audit et période transitoire jusqu'au 31 décembre 2026.</li></ul><p>Référentiel appliqué au dossier : <strong>référentiel national qualité (décret n° 2026-728)</strong> — ${LIBELLES_AUDIT[audit]}.</p>` },
      { heading: "Dépôt des comptes (IND 23)", content: `<p>Le dirigeant vérifie, à la clôture de chaque exercice, que les comptes annuels de ${o.nom} sont déposés au greffe dans le délai légal (dans le mois suivant leur approbation, au plus tard sept mois après la clôture) et conserve avec la présente note le justificatif de dépôt délivré par le greffe. Tant qu'aucun exercice n'est clos, la vérification est programmée à la clôture du premier exercice.</p>` },
    ],
    table: { headers: ["Indicateur", "Évolution du référentiel", "Exploitation", "Pilote"], rows },
    signatures: { type: "1", labels: ["Le référent qualité"], names: [v(o.referentQualite) || referent(o)], dates: [formatDate(d)] },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// IND 32 — Audit interne et suivi des heures
// ─────────────────────────────────────────────────────────────────────────────

export function genAuditInterne(oDossier: OrganismeInfo, tp: TypePrestation, f?: FormationInfo): string {
  const d = dateV10(oDossier);
  const o = orgVersionUlterieure(oDossier, d);
  const certifiante = /^(RS|RNCP)\d+$/i.test(v(f?.codeRNCP).replace(/\s+/g, ""));
  const inds = INDICATEURS_REFERENCE.filter((i) => i.applicableActions.includes(ACTION_REF[tp]))
    .filter((i) => tp !== "AF" || certifiante || ![3, 7, 16].includes(i.numero));
  const rows = inds.map((i) => [`IND ${i.numero}`, i.intitule.length > 110 ? `${i.intitule.slice(0, 107)}…` : i.intitule, "☐ Conforme ☐ Écart", "", ""]);
  return buildDocument({
    org: o,
    title: "PROGRAMME ET GRILLE D'AUDIT INTERNE",
    subtitle: "Indicateur 32 — référentiel national qualité (décret n° 2026-728)",
    sections: [
      { heading: "Programme", content: `<ul><li><strong>Périmètre :</strong> ${tp === "AF" ? "actions de formation" : tp === "CFA" ? "actions de formation par apprentissage" : tp === "VAE" ? "accompagnement VAE" : "bilans de compétences"}${f?.intitule ? ` — ${f.intitule}` : ""}.</li><li><strong>Fréquence :</strong> au moins une fois par an, et avant chaque audit de certification.</li><li><strong>Auditeur interne :</strong> ${v(o.referentQualite) || referent(o)} ; un auditeur ne juge pas seul une pièce qu'il a rédigée : la revue est validée par le dirigeant.</li><li><strong>Méthode :</strong> pour chaque indicateur applicable, vérification d'un échantillon de pièces datées et cohérentes entre elles (identité, dates, durées, montants) ; tout écart ouvre une action au tableau d'amélioration continue.</li></ul>` },
    ],
    table: { headers: ["Indicateur", "Exigence", "Constat", "Pièces vérifiées / écart relevé", "Action (réf. tableau d'amélioration)"], rows },
    extraHtml: `<h2>Synthèse</h2><p>Programme établi le ${formatDate(d)}. La grille est complétée à chaque audit interne (au moins une fois par an et avant chaque audit de certification) ; chaque écart relevé est reporté au tableau d'amélioration continue avec son action et son échéance.</p>`,
    signatures: { type: "2", labels: ["L'auditeur interne", "Le dirigeant"], names: [v(o.referentQualite) || referent(o), v(o.dirigeant)], dates: [formatDate(d), formatDate(d)] },
  });
}

export function genSuiviHeures(oDossier: OrganismeInfo, tp: TypePrestation, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const d = dateV10(oDossier);
  const o = orgVersionUlterieure(oDossier, d);
  const [pub, pubPl] = PUBLIC[tp];
  const prevues = parseDuree(f?.duree || "").totalHours;
  const assid = v(getAssiduiteLabel(f) || "");
  const complet = /^100\s*%$/.test(assid);
  const rows = stagiaires.filter((s) => v(s.nom)).map((s) => {
    if (tp === "VAE") {
      // VAE : heures relevées depuis le calendrier des séances, comme la feuille d'émargement.
      const cal = calendrierVAE(s, f);
      const prev = cal.reduce((a, x) => a + x.duree, 0);
      const faites = cal.filter((x) => x.realisee);
      const real = faites.reduce((a, x) => a + x.duree, 0);
      const periode = cal.length ? `${formatDate(iso(cal[0].date))} → ${formatDate(iso(cal[cal.length - 1].date))}` : "—";
      const statut = faites.length === cal.length ? `${real} h` : `${real} h au ${formatDate(d)} (${cal.length - faites.length} séance(s) à venir)`;
      return [`${s.prenom} ${s.nom}`, periode, `${prev} h`, statut, "0 h", "—", "—"];
    }
    const periode = `${formatDate(v(s.dateDebutFormation) || v(f.dateDebut))} → ${formatDate(v(s.dateFinFormation) || v(f.dateFin))}`;
    const termine = isStagiaireFormationTerminee(s, f);
    const h = prevues ? `${prevues} h` : "—";
    if (!termine) return [`${s.prenom} ${s.nom}`, periode, h, "Session à venir ou en cours", "—", "—", "—"];
    if (complet && prevues) return [`${s.prenom} ${s.nom}`, periode, h, `${prevues} h`, "0 h", "—", "—"];
    return [`${s.prenom} ${s.nom}`, periode, h, "À reporter depuis les émargements / relevés de connexion", "", "", ""];
  });
  return buildDocument({
    org: o,
    title: "SUIVI DES HEURES NON RÉALISÉES ET REPORTÉES",
    subtitle: "Indicateur 32 — référentiel national qualité (décret n° 2026-728)",
    sections: [
      { heading: "Règle de suivi", content: `<ul><li>Les heures réalisées sont relevées par demi-journée (émargements${/distanciel|distance|meet|zoom/i.test(`${f?.modalites || ""} ${f?.lieu || ""}`) ? " et relevés de connexion à la classe virtuelle" : ""}).</li><li>Toute heure non réalisée (absence, retard, incident technique, annulation) est inscrite avec son motif ; un report est proposé au ${pub} et tracé avec sa date de réalisation.</li><li>Heures non reportées : facturation au prorata des heures réalisées et information du financeur le cas échéant ; analyse de la cause et action au tableau d'amélioration continue lorsqu'un motif se répète.</li></ul>` },
    ],
    table: { headers: [`${pub.charAt(0).toUpperCase()}${pub.slice(1)}`, "Période", "Heures prévues", "Heures réalisées", "Heures non réalisées", "Motif", "Heures reportées (date)"], rows: rows.length ? rows : [[`Aucun ${pub} enregistré`, "—", "—", "—", "—", "—", "—"]] },
    extraHtml: `<p style="margin-top:10px">Situation au ${formatDate(d)} pour les ${pubPl} du dossier${assid ? ` ; taux d'assiduité déclaré : ${assid}` : ""}.</p>`,
    signatures: { type: "1", labels: ["Le référent qualité"], names: [v(o.referentQualite) || referent(o)], dates: [formatDate(d)] },
  });
}

/** Rendu des pièces « v10_* » (null si le modèle n'est pas concerné). */
export function renderReferentielTemplate(template: string, params: Record<string, any> | undefined, o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string | null {
  if (!template.startsWith("v10_")) return null;
  const tp: TypePrestation = params?.type || typePrestation(o);
  switch (template) {
    case "v10_procedure_violences": return genProcedureViolences(o, tp, f);
    case "v10_registre_signalements": return genRegistreSignalements(o, tp);
    case "v10_note_veille": return genNoteVeilleV10(o, tp);
    case "v10_audit_interne": return genAuditInterne(o, tp, f);
    case "v10_suivi_heures": return genSuiviHeures(o, tp, f, stagiaires);
    default: return null;
  }
}
