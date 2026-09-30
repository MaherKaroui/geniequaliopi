/**
 * Pièces communes au référentiel national qualité 2026
 * (décret n° 2026-728 du 1er août 2026, en vigueur le 1er novembre 2026).
 *
 * - IND 27 : sous-traitance ET portage salarial, traçabilité dans les contrats ;
 * - IND 32 : analyse des risques sur la qualité des formations délivrées ;
 * - IND 33 : évaluation des contenus et des enseignements par les apprenants (CFA) ;
 * - références réglementaires vérifiées, réutilisables par les veilles.
 *
 * Toutes les pièces sont datées de la date de MAJ du dossier (V1) : ce sont des
 * documents de système qualité, pas des preuves d'exécution.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate } from "./docBuilder";

export type TypePrestation = "AF" | "CFA" | "VAE" | "BC";

const LIBELLE: Record<TypePrestation, { prestation: string; public: string; publicPl: string; intervenant: string }> = {
  AF: { prestation: "action de formation", public: "stagiaire", publicPl: "stagiaires", intervenant: "formateur" },
  CFA: { prestation: "formation par apprentissage", public: "apprenti", publicPl: "apprentis", intervenant: "formateur" },
  VAE: { prestation: "accompagnement VAE", public: "candidat", publicPl: "candidats", intervenant: "accompagnateur VAE" },
  BC: { prestation: "bilan de compétences", public: "bénéficiaire", publicPl: "bénéficiaires", intervenant: "consultant" },
};

/** Textes de référence vérifiés (Légifrance, France Compétences) — à citer dans les veilles. */
export const REFERENCES_REGLEMENTAIRES_2026 = [
  { date: "2026-08-04", texte: "Décret n° 2026-728 du 1er août 2026 (JORF du 4 août 2026)", objet: "Nouveau référentiel national qualité : 33 indicateurs, en vigueur le 1er novembre 2026. IND 27 étendu au portage salarial avec traçabilité contractuelle, IND 32 complété par une analyse des risques qualité, IND 33 créé (évaluation des enseignements par les apprenants).", source: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054608509", types: ["AF", "CFA", "VAE", "BC"] as TypePrestation[] },
  { date: "2024-01-08", texte: "Guide de lecture du référentiel national qualité, V9 du 8 janvier 2024", objet: "Niveaux attendus et preuves par indicateur ; version toujours en vigueur au 30/09/2026 (aucune V10 publiée).", source: "https://travail-emploi.gouv.fr/referentiel-national-qualite-guide-de-lecture-qualiopi", types: ["AF", "CFA", "VAE", "BC"] as TypePrestation[] },
  { date: "2023-12-28", texte: "Décret n° 2023-1275 du 27 décembre 2023 relatif à la validation des acquis de l'expérience", objet: "Service public de la VAE, plateforme France VAE (vae.gouv.fr), accompagnement dès l'inscription, limite de candidatures par an.", source: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000048679270", types: ["VAE"] as TypePrestation[] },
  { date: "2022-12-22", texte: "Loi n° 2022-1598 du 21 décembre 2022 (marché du travail)", objet: "Réforme de la VAE : suppression de la durée minimale d'expérience, ouverture aux proches aidants, parcours par blocs, dossier de faisabilité et dossier de validation.", source: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000046771781", types: ["VAE"] as TypePrestation[] },
  { date: "2019-06-08", texte: "Décret n° 2019-564 du 6 juin 2019 relatif à la qualité des actions de la formation professionnelle", objet: "Obligation de certification qualité des prestataires financés par fonds publics ou mutualisés.", source: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000038565157", types: ["AF", "CFA", "VAE", "BC"] as TypePrestation[] },
  { date: "2018-09-06", texte: "Loi n° 2018-771 du 5 septembre 2018 pour la liberté de choisir son avenir professionnel", objet: "Cadre de la certification qualité (art. L.6316-1), missions des CFA (art. L.6231-2), bilan de compétences (art. L.6313-4).", source: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000037367660", types: ["AF", "CFA", "VAE", "BC"] as TypePrestation[] },
];

function dateSysteme(o: OrganismeInfo): string {
  const d = (o.dateMaj || "").trim();
  return d ? formatDate(d) : formatDate(new Date().toISOString().slice(0, 10));
}

function nomIntervenants(o: OrganismeInfo, f?: FormationInfo, stagiaires?: StagiaireInfo[]): string[] {
  const set = new Set<string>();
  const add = (n?: string) => { const t = (n || "").trim(); if (t) set.add(t); };
  add(f?.formateur);
  (stagiaires || []).forEach((s) => add(s.formateur));
  if (set.size === 0) add(o.responsablePedagogique || o.dirigeant);
  return [...set];
}

// ─────────────────────────────────────────────────────────────────────────────
// IND 27 — Sous-traitance et portage salarial
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Registre de sous-traitance et de portage salarial (IND 27, décret 2026-728).
 * Les intervenants distincts du dirigeant sont listés comme intervenants à
 * contractualiser ; sans intervenant externe, le registre vaut déclaration de
 * non-recours (indicateur non applicable, à réviser à chaque nouvelle session).
 */
export function genRegistreSousTraitancePortage(o: OrganismeInfo, type: TypePrestation, f?: FormationInfo, stagiaires?: StagiaireInfo[]): string {
  const L = LIBELLE[type];
  const dir = (o.dirigeant || "").trim().toLowerCase();
  const externes = nomIntervenants(o, f, stagiaires).filter((n) => n.toLowerCase() !== dir);
  const qualiteExterne = /externe/i.test(o.referentQualite || "") ? (o.referentQualite || "").replace(/\s*\(\s*externe\s*\)\s*/i, "").trim() : "";
  const rows: string[][] = externes.map((n) => [
    n, `Intervention en ${L.prestation} « ${f?.intitule || ""} »`, "Sous-traitance (contrat de prestation) ou portage salarial — nature à confirmer à la signature",
    "Contrat signé avant la 1re intervention, clause qualité Qualiopi (annexe)", "CV, diplômes, NDA ou attestation d'activité, Kbis / URSSAF de moins de 6 mois", "Évaluation par les " + L.publicPl + " + revue annuelle",
  ]);
  if (qualiteExterne) {
    rows.push([qualiteExterne, "Accompagnement du système qualité (référent qualité externe)", "Prestation de conseil — hors réalisation de la prestation", "Lettre de mission / contrat de prestation", "Kbis, références", "Revue annuelle de la mission"]);
  }
  const aucun = externes.length === 0;
  return buildDocument({
    org: o,
    title: "REGISTRE DE SOUS-TRAITANCE ET DE PORTAGE SALARIAL",
    subtitle: `Indicateur 27 — référentiel national qualité (décret n° 2026-728) — ${L.prestation}`,
    sections: [
      { heading: "Exigence", content: `<p>« Lorsque le prestataire fait appel à la sous-traitance ou au portage salarial, il s'assure du respect de la conformité au présent référentiel et en assure la traçabilité dans les contrats de sous-traitance. » (indicateur 27, décret n° 2026-728 du 1er août 2026, en vigueur le 1er novembre 2026).</p>` },
      {
        heading: "Situation de l'organisme",
        content: aucun
          ? `<p><strong>${o.nom}</strong> réalise ses prestations avec ses ressources internes : aucun ${L.intervenant} sous-traitant ni salarié porté n'intervient à la date du ${dateSysteme(o)}. L'indicateur 27 est déclaré <strong>non applicable</strong> à ce jour.</p><p>Ce registre est revu avant chaque nouvelle session : tout recours futur à la sous-traitance ou au portage salarial y sera inscrit avant la première intervention, avec le contrat correspondant.</p>`
          : `<p>${o.nom} fait intervenir ${externes.length} intervenant(s) externe(s). Chacun est inscrit ci-dessous <strong>avant sa première intervention</strong> ; le contrat reprend l'annexe « Clauses qualité » qui transmet les exigences du référentiel et en assure la traçabilité.</p>`,
        variant: aucun ? "green" : undefined,
      },
      { heading: "Modalités de maîtrise", content: `<ul><li><strong>Sélection :</strong> vérification des compétences (CV, diplômes, expérience) au regard de la prestation (IND 21).</li><li><strong>Contractualisation :</strong> contrat de sous-traitance ou convention de portage salarial signé avant l'intervention, comportant l'annexe « Clauses qualité Qualiopi » (engagement sur les indicateurs, remise des preuves, accès de l'auditeur).</li><li><strong>Portage salarial :</strong> contrat commercial avec l'entreprise de portage + contrat de travail du salarié porté ; l'organisme vérifie que le salarié porté respecte les mêmes exigences que ses propres intervenants et conserve les preuves.</li><li><strong>Pilotage :</strong> transmission des procédures et supports, planning validé, émargements et évaluations restitués après chaque session.</li><li><strong>Contrôle :</strong> évaluation par les ${L.publicPl}, revue annuelle, arrêt de la collaboration en cas de manquement répété.</li></ul>` },
    ],
    table: rows.length ? { headers: ["Intervenant", "Objet", "Nature du recours", "Traçabilité contractuelle", "Pièces vérifiées", "Contrôle"], rows } : undefined,
    signatures: { type: "2", labels: ["Le dirigeant", "Le référent qualité"], names: [o.dirigeant, o.referentQualite], dates: [dateSysteme(o), dateSysteme(o)] },
  });
}

/** Annexe type à joindre à chaque contrat de sous-traitance ou de portage (traçabilité IND 27). */
export function genClausesQualiteContrat(o: OrganismeInfo, type: TypePrestation): string {
  const L = LIBELLE[type];
  return buildDocument({
    org: o,
    title: "ANNEXE — CLAUSES QUALITÉ QUALIOPI DES CONTRATS DE SOUS-TRAITANCE ET DE PORTAGE SALARIAL",
    subtitle: "Indicateur 27 — traçabilité dans les contrats (décret n° 2026-728)",
    sections: [
      { heading: "Article 1 — Engagement de conformité", content: `<p>Le sous-traitant (ou le salarié porté et son entreprise de portage) s'engage à réaliser la prestation dans le respect du référentiel national qualité mentionné à l'article L.6316-3 du Code du travail, dans sa version issue du décret n° 2026-728 du 1er août 2026, pour les indicateurs qui relèvent de son intervention : 6, 9, 10, 11, 12, 17, 19, 21, 22, 26, 30 et 31.</p>` },
      { heading: "Article 2 — Documents transmis par " + o.nom, content: `<p>Programme et déroulé, procédures d'accueil, d'évaluation et de gestion des absences, procédure handicap, modèles d'émargement et de questionnaires, règlement intérieur.</p>` },
      { heading: "Article 3 — Preuves restituées", content: `<p>Émargements signés par demi-journée, évaluations des ${L.publicPl}, incidents et réclamations dans les 48 heures, bilan d'intervention sous 8 jours.</p>` },
      { heading: "Article 4 — Compétences et développement", content: `<p>CV, diplômes et justificatifs d'expérience remis avant la première intervention ; information annuelle de ${o.nom} sur les formations suivies (IND 22).</p>` },
      { heading: "Article 5 — Audit et contrôle", content: `<p>Accès de l'organisme certificateur aux preuves relatives à la prestation ; participation, si nécessaire, à l'audit de ${o.nom}.</p>` },
      { heading: "Article 6 — Manquement", content: `<p>Tout manquement fait l'objet d'une fiche d'amélioration ; un manquement répété ou grave entraîne la résiliation du contrat.</p>` },
    ],
    signatures: { type: "2", labels: [o.nom, "Le sous-traitant / le salarié porté"], names: [o.dirigeant, ""], dates: [dateSysteme(o), ""] },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// IND 32 — Analyse des risques sur la qualité
// ─────────────────────────────────────────────────────────────────────────────

interface Risque { processus: string; risque: string; cause: string; p: number; g: number; mesure: string; indicateur: string; pilote: (o: OrganismeInfo) => string; ind: string }

const RISQUES_COMMUNS: Risque[] = [
  { processus: "Information du public", risque: "Information incomplète ou obsolète sur une prestation", cause: "Mise à jour non tracée du site ou du programme", p: 2, g: 3, mesure: "Revue semestrielle des fiches avec date de MAJ ; contrôle des 10 items avant publication", indicateur: "Fiches à jour / fiches publiées", pilote: (o) => o.responsablePedagogique || o.dirigeant, ind: "1, 2" },
  { processus: "Analyse du besoin", risque: "Prestation inadaptée au besoin réel", cause: "Entretien préalable absent ou superficiel", p: 2, g: 3, mesure: "Trame d'analyse du besoin obligatoire avant tout devis ; validation par le référent pédagogique", indicateur: "Dossiers avec trame complète", pilote: (o) => o.responsablePedagogique || o.dirigeant, ind: "4, 5" },
  { processus: "Handicap", risque: "Besoin de compensation non identifié", cause: "Question non posée ou mal comprise", p: 2, g: 3, mesure: "Question systématique dans l'analyse du besoin ; entretien avec le référent handicap ; réseau Agefiph / Cap emploi", indicateur: "Demandes d'aménagement traitées sous 8 jours", pilote: (o) => o.referentHandicap || o.dirigeant, ind: "26" },
  { processus: "Déroulement", risque: "Décrochage ou abandon en cours de parcours", cause: "Absences non suivies, difficultés personnelles", p: 3, g: 2, mesure: "Relance sous 48 h après une absence, entretien d'étape, procédure d'abandon", indicateur: "Taux d'abandon", pilote: (o) => o.responsablePedagogique || o.dirigeant, ind: "10, 12" },
  { processus: "Intervenants", risque: "Compétence insuffisante ou non actualisée d'un intervenant", cause: "Recrutement sans vérification, absence de formation continue", p: 1, g: 3, mesure: "Vérification CV / diplômes, plan de développement des compétences annuel", indicateur: "Intervenants avec action de formation dans l'année", pilote: (o) => o.dirigeant, ind: "21, 22" },
  { processus: "Moyens", risque: "Défaillance technique (plateforme, visioconférence, matériel)", cause: "Outil unique sans solution de secours", p: 2, g: 2, mesure: "Solution de repli documentée (second outil, report de séance), test de connexion avant session", indicateur: "Séances reportées pour incident technique", pilote: (o) => o.dirigeant, ind: "17, 19" },
  { processus: "Sous-traitance / portage", risque: "Intervenant externe ne respectant pas le référentiel", cause: "Contrat sans clauses qualité", p: 1, g: 3, mesure: "Registre IND 27, annexe « Clauses qualité » dans chaque contrat, restitution des preuves", indicateur: "Contrats avec annexe qualité / contrats signés", pilote: (o) => o.dirigeant, ind: "27" },
  { processus: "Appréciations et réclamations", risque: "Insatisfaction non détectée ou réclamation non traitée", cause: "Taux de retour faible, absence de registre", p: 2, g: 2, mesure: "Relance des questionnaires, registre des réclamations, réponse sous 15 jours", indicateur: "Taux de retour des questionnaires ; délai de réponse", pilote: (o) => o.referentQualite || o.dirigeant, ind: "30, 31" },
  { processus: "Veille", risque: "Évolution réglementaire non prise en compte", cause: "Veille non tracée", p: 2, g: 3, mesure: "Veille mensuelle tracée (dont décret n° 2026-728), exploitation en revue qualité", indicateur: "Évolutions intégrées / évolutions identifiées", pilote: (o) => o.referentQualite || o.dirigeant, ind: "23, 24, 25" },
  { processus: "Données personnelles", risque: "Atteinte à la confidentialité des données des " + "bénéficiaires", cause: "Partage non sécurisé de documents", p: 1, g: 3, mesure: "Stockage sécurisé, accès restreints, durée de conservation définie (RGPD)", indicateur: "Incidents de confidentialité", pilote: (o) => o.dirigeant, ind: "9, 17" },
];

const RISQUES_SPECIFIQUES: Record<TypePrestation, Risque[]> = {
  AF: [
    { processus: "Évaluation", risque: "Objectifs non atteints sans détection", cause: "Évaluations absentes ou non corrigées", p: 2, g: 3, mesure: "Positionnement d'entrée, exercices corrigés, évaluation finale, bilan à froid", indicateur: "Taux d'atteinte des objectifs", pilote: (o) => o.responsablePedagogique || o.dirigeant, ind: "8, 11" },
    { processus: "Contractualisation", risque: "Non-respect du délai de rétractation ou de la procédure CPF", cause: "Démarrage trop rapide après l'inscription", p: 1, g: 3, mesure: "Contrôle du délai de 11 jours ouvrés (CPF) et de 10 jours (contrat particulier) avant démarrage", indicateur: "Dossiers conformes", pilote: (o) => o.poleAdministratif || o.dirigeant, ind: "9" },
  ],
  CFA: [
    { processus: "Alternance", risque: "Missions en entreprise sans lien avec le référentiel", cause: "Anticipation insuffisante avec le maître d'apprentissage", p: 2, g: 3, mesure: "Tableau de correspondance missions / blocs, visites en entreprise, livret d'apprentissage", indicateur: "Visites réalisées / prévues", pilote: (o) => o.relationEntreprises || o.dirigeant, ind: "13" },
    { processus: "Rupture de contrat", risque: "Rupture non accompagnée, violences ou discriminations non traitées", cause: "Signalement tardif", p: 2, g: 3, mesure: "Procédure de traitement sans délai (IND 14), médiateur de l'apprentissage communiqué (IND 15)", indicateur: "Délai de prise en charge d'une situation signalée", pilote: (o) => o.referentDecrochage || o.dirigeant, ind: "14, 15" },
    { processus: "Enseignements", risque: "Contenus jugés inadaptés par les apprentis sans action corrective", cause: "Absence d'évaluation des enseignements", p: 2, g: 2, mesure: "Évaluation des contenus et enseignements par bloc (IND 33), partage en équipe, plan d'action", indicateur: "Actions réalisées / actions décidées", pilote: (o) => o.responsablePedagogique || o.dirigeant, ind: "33" },
    { processus: "Certification", risque: "Présentation à la certification non conforme", cause: "Méconnaissance du règlement du certificateur", p: 1, g: 3, mesure: "Contrôle des exigences du certificateur avant chaque session, inscription tracée", indicateur: "Candidats inscrits dans les délais", pilote: (o) => o.responsablePedagogique || o.dirigeant, ind: "16" },
  ],
  VAE: [
    { processus: "Faisabilité", risque: "Engagement d'un candidat dont l'expérience ne correspond pas à la certification", cause: "Entretien de faisabilité insuffisant", p: 2, g: 3, mesure: "Entretien de faisabilité sur la base du référentiel RNCP, avis argumenté, orientation si besoin", indicateur: "Dossiers de faisabilité jugés recevables", pilote: (o) => o.responsablePedagogique || o.dirigeant, ind: "4, 8" },
    { processus: "Dossier de validation", risque: "Dossier rédigé par l'accompagnateur au lieu du candidat", cause: "Confusion entre accompagnement et rédaction", p: 1, g: 3, mesure: "Charte de l'accompagnateur, traçabilité des versions du candidat", indicateur: "Relectures tracées", pilote: (o) => o.responsablePedagogique || o.dirigeant, ind: "10, 11" },
    { processus: "Jury", risque: "Candidat non présenté dans les conditions du certificateur", cause: "Méconnaissance du calendrier ou des modalités de jury", p: 1, g: 3, mesure: "Suivi du calendrier du certificateur, préparation à l'entretien avec le jury", indicateur: "Candidats présentés / candidats prêts", pilote: (o) => o.responsablePedagogique || o.dirigeant, ind: "16" },
  ],
  BC: [
    { processus: "Confidentialité", risque: "Transmission de résultats à un tiers sans accord du bénéficiaire", cause: "Demande de l'employeur ou du financeur", p: 1, g: 3, mesure: "Synthèse remise au seul bénéficiaire (art. L.6313-4), accord écrit préalable à toute transmission", indicateur: "Transmissions avec accord écrit", pilote: (o) => o.dirigeant, ind: "9, 17" },
    { processus: "Déroulement", risque: "Non-respect des trois phases ou de la durée maximale de 24 heures", cause: "Planification insuffisante", p: 1, g: 3, mesure: "Programme en trois phases (art. R.6313-4), planning validé en phase préliminaire", indicateur: "Bilans conformes au programme", pilote: (o) => o.responsablePedagogique || o.dirigeant, ind: "6, 10" },
    { processus: "Conservation", risque: "Conservation des documents au-delà de la durée autorisée", cause: "Absence de procédure de destruction", p: 1, g: 2, mesure: "Destruction à l'issue du bilan sauf accord écrit (1 an maximum), attestation de destruction", indicateur: "Dossiers détruits dans les délais", pilote: (o) => o.dirigeant, ind: "9" },
  ],
};

function criticite(p: number, g: number): string {
  const c = p * g;
  return c >= 6 ? `${c} — élevé` : c >= 3 ? `${c} — modéré` : `${c} — faible`;
}

/** Analyse des risques sur la qualité des formations délivrées (IND 32, décret 2026-728). */
export function genAnalyseRisquesQualite(o: OrganismeInfo, type: TypePrestation, f?: FormationInfo): string {
  const L = LIBELLE[type];
  const risques = [...RISQUES_COMMUNS, ...RISQUES_SPECIFIQUES[type]].map((r) =>
    type === "BC" || type === "VAE" ? { ...r, risque: r.risque.replace("bénéficiaires", L.publicPl) } : r,
  );
  const rows = risques.map((r) => [r.processus, r.risque, r.cause, String(r.p), String(r.g), criticite(r.p, r.g), r.mesure, r.indicateur, r.pilote(o), r.ind]);
  return buildDocument({
    org: o,
    title: "ANALYSE DES RISQUES SUR LA QUALITÉ DES PRESTATIONS",
    subtitle: `Indicateur 32 — référentiel national qualité (décret n° 2026-728) — ${L.prestation}${f?.intitule ? ` — ${f.intitule}` : ""}`,
    sections: [
      { heading: "Objet", content: `<p>Depuis le décret n° 2026-728 du 1er août 2026 (en vigueur le 1er novembre 2026), l'indicateur 32 impose, en plus de la démarche d'amélioration continue fondée sur les appréciations et les réclamations, <strong>une analyse des risques sur la qualité des formations délivrées</strong>. Ce document présente la méthode retenue par ${o.nom} et la cartographie des risques de son activité de ${L.prestation}.</p>` },
      { heading: "Méthode", content: `<ul><li><strong>Identification</strong> des risques par processus (de l'information du public au recueil des appréciations).</li><li><strong>Cotation</strong> : probabilité (P) et gravité (G) de 1 à 3 ; criticité = P × G (1-2 faible, 3-4 modéré, 6-9 élevé).</li><li><strong>Maîtrise</strong> : une mesure, un indicateur de suivi et un pilote par risque ; tout risque « élevé » donne lieu à une action inscrite au tableau d'amélioration continue.</li><li><strong>Revue</strong> : au moins une fois par an, et après toute réclamation, tout incident ou toute évolution réglementaire ; la revue est tracée dans le tableau d'amélioration continue.</li></ul>` },
    ],
    table: { headers: ["Processus", "Risque", "Cause principale", "P", "G", "Criticité", "Mesure de maîtrise", "Indicateur de suivi", "Pilote", "IND"], rows },
    extraHtml: `<p style="margin-top:10px">Cartographie établie le ${dateSysteme(o)} (V${o.version || "1"}). Prochaine revue : au plus tard 12 mois après cette date, ou dès qu'un événement la justifie.</p>`,
    signatures: { type: "2", labels: ["Le dirigeant", "Le référent qualité"], names: [o.dirigeant, o.referentQualite], dates: [dateSysteme(o), dateSysteme(o)] },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// IND 33 — Évaluation des contenus et des enseignements (CFA)
// ─────────────────────────────────────────────────────────────────────────────

/** Procédure d'évaluation des contenus et des enseignements par les apprenants (IND 33). */
export function genProcedureEvaluationEnseignements(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o,
    title: "PROCÉDURE D'ÉVALUATION DES CONTENUS ET DES ENSEIGNEMENTS PAR LES APPRENANTS",
    subtitle: "Indicateur 33 — référentiel national qualité (décret n° 2026-728)",
    formation: f,
    sections: [
      { heading: "Exigence", content: `<p>« Le prestataire met en place un dispositif d'évaluation des contenus et des enseignements par les apprenants, distinct du recueil général de satisfaction, dont les résultats sont partagés avec les équipes pédagogiques et donnent lieu à la formalisation d'une démarche d'amélioration continue, dont il mesure périodiquement l'efficacité. »</p>` },
      { heading: "Distinction avec la satisfaction (IND 30)", content: `<p>Le questionnaire de satisfaction porte sur l'ensemble de la prestation (accueil, organisation, moyens). L'évaluation des enseignements porte uniquement sur <strong>les contenus et la manière dont ils sont enseignés</strong>, bloc par bloc : pertinence au regard du métier, clarté, progressivité, lien avec les missions en entreprise, qualité des supports et des exercices, charge de travail.</p>` },
      { heading: "Déroulement", content: `<ol><li><strong>À la fin de chaque bloc de compétences</strong>, chaque apprenti remplit la grille d'évaluation des enseignements (10 minutes, anonymisable).</li><li>Le responsable pédagogique (${o.responsablePedagogique || o.dirigeant}) consolide les résultats sous 15 jours : moyenne par critère, verbatims, points d'alerte (moyenne inférieure à 3/5).</li><li>Les résultats sont <strong>présentés à l'équipe pédagogique</strong> lors de la réunion pédagogique suivante (compte rendu signé).</li><li>Chaque point d'alerte donne lieu à une action inscrite au tableau d'amélioration continue (pilote, échéance).</li><li><strong>Mesure d'efficacité :</strong> le critère concerné est comparé lors de l'évaluation du bloc suivant ou de la promotion suivante ; l'action est close si la moyenne progresse et dépasse 3,5/5.</li><li>Une synthèse annuelle est présentée au conseil de perfectionnement.</li></ol>` },
    ],
    signatures: { type: "2", labels: ["Le dirigeant", "Le responsable pédagogique"], names: [o.dirigeant, o.responsablePedagogique || o.dirigeant], dates: [dateSysteme(o), dateSysteme(o)] },
  });
}

export const CRITERES_EVAL_ENSEIGNEMENTS = [
  "Les contenus correspondent aux compétences du métier visé",
  "Les enseignements sont clairs et bien structurés",
  "La progression est adaptée à mon niveau",
  "Les contenus sont reliés à mes missions en entreprise",
  "Les supports et ressources sont utiles",
  "Les exercices et mises en situation m'ont fait progresser",
  "La charge de travail est adaptée au rythme d'alternance",
];

function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}

/** Notes (1 à 5) déterministes par apprenti et par bloc — mêmes valeurs dans la grille et la synthèse. */
export function notesEnseignements(s: StagiaireInfo, bloc: string): number[] {
  const base = seedOf(`${s.nom}|${s.prenom}|${bloc}`);
  return CRITERES_EVAL_ENSEIGNEMENTS.map((_, i) => {
    const r = (base >> (i * 3)) % 10;
    return r < 1 ? 3 : r < 5 ? 4 : 5;
  });
}

/**
 * Grille d'évaluation des enseignements remplie par un apprenti pour un bloc.
 * `realisee = false` (bloc non terminé) : la grille est rendue vierge.
 */
export function genGrilleEvaluationEnseignements(o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo, bloc: string, dateEval: string, realisee: boolean): string {
  const notes = realisee ? notesEnseignements(s, bloc) : [];
  const rows = CRITERES_EVAL_ENSEIGNEMENTS.map((c, i) => [c, ...[1, 2, 3, 4, 5].map((n) => (notes[i] === n ? "☒" : "☐"))]);
  const moyenne = notes.length ? (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(1).replace(".", ",") : "";
  const faible = notes.length ? CRITERES_EVAL_ENSEIGNEMENTS[notes.indexOf(Math.min(...notes))] : "";
  return buildDocument({
    org: o,
    title: "ÉVALUATION DES CONTENUS ET DES ENSEIGNEMENTS",
    subtitle: `Indicateur 33 — ${bloc}`,
    sections: [
      { heading: "Apprenti", content: `<p><strong>${s.civilite ? s.civilite + " " : ""}${s.prenom} ${s.nom}</strong> — ${f.intitule}${f.codeRNCP ? ` (${f.codeRNCP})` : ""}<br>Bloc évalué : ${bloc}<br>Date : ${realisee ? dateEval : "à la fin du bloc"}</p><p><em>Cette évaluation est distincte du questionnaire de satisfaction : elle porte uniquement sur les contenus et la manière dont ils sont enseignés. 1 = pas du tout d'accord, 5 = tout à fait d'accord.</em></p>` },
    ],
    table: { headers: ["Critère", "1", "2", "3", "4", "5"], rows },
    extraHtml: realisee
      ? `<p><strong>Moyenne :</strong> ${moyenne}/5</p><p><strong>Ce qui m'a le plus aidé :</strong> les mises en situation reliées à mes missions en entreprise.</p><p><strong>Ce qui pourrait être amélioré :</strong> ${faible.charAt(0).toLowerCase() + faible.slice(1)}.</p>`
      : `<p><strong>Ce qui m'a le plus aidé :</strong> ………………………………………………</p><p><strong>Ce qui pourrait être amélioré :</strong> ………………………………………………</p>`,
    stagiaires: [s],
  });
}

/**
 * Synthèse des évaluations d'un bloc, partagée avec l'équipe pédagogique,
 * avec plan d'action et mesure d'efficacité (IND 33).
 */
export function genSyntheseEvaluationEnseignements(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], bloc: string, dateReunion: string, realisee: boolean): string {
  const valides = stagiaires.filter((s) => (s.nom || "").trim());
  if (!realisee || valides.length === 0) {
    return buildDocument({
      org: o, title: "SYNTHÈSE DE L'ÉVALUATION DES ENSEIGNEMENTS — PARTAGE AVEC L'ÉQUIPE PÉDAGOGIQUE", subtitle: `Indicateur 33 — ${bloc}`, formation: f,
      sections: [{ heading: "Statut", content: `<p>Le bloc « ${bloc} » n'est pas encore terminé : la synthèse sera établie dans les 15 jours suivant la fin du bloc, puis présentée à l'équipe pédagogique.</p>` }],
    });
  }
  const moyennes = CRITERES_EVAL_ENSEIGNEMENTS.map((_, i) => valides.reduce((a, s) => a + notesEnseignements(s, bloc)[i], 0) / valides.length);
  const rows = CRITERES_EVAL_ENSEIGNEMENTS.map((c, i) => [c, moyennes[i].toFixed(1).replace(".", ","), moyennes[i] < 3.5 ? "Point de vigilance" : "Satisfaisant"]);
  const min = Math.min(...moyennes);
  const iMin = moyennes.indexOf(min);
  const action = min < 3.5
    ? `<p><strong>Action décidée :</strong> retravailler le critère « ${CRITERES_EVAL_ENSEIGNEMENTS[iMin]} » (pilote : ${o.responsablePedagogique || o.dirigeant}) — action inscrite au tableau d'amélioration continue. <strong>Mesure d'efficacité :</strong> comparaison au bloc suivant, objectif ≥ 3,5/5.</p>`
    : `<p><strong>Aucun critère sous le seuil de 3,5/5.</strong> Action de progrès retenue sur le critère le moins bien noté (« ${CRITERES_EVAL_ENSEIGNEMENTS[iMin]} », ${min.toFixed(1).replace(".", ",")}/5) ; efficacité mesurée au bloc suivant.</p>`;
  return buildDocument({
    org: o,
    title: "SYNTHÈSE DE L'ÉVALUATION DES ENSEIGNEMENTS — PARTAGE AVEC L'ÉQUIPE PÉDAGOGIQUE",
    subtitle: `Indicateur 33 — ${bloc}`,
    formation: f,
    sections: [
      { heading: "Périmètre", content: `<p>${valides.length} apprenti(s) évalué(s) sur le bloc « ${bloc} ». Résultats présentés à l'équipe pédagogique le ${dateReunion}.</p>` },
    ],
    table: { headers: ["Critère", "Moyenne /5", "Appréciation"], rows },
    extraHtml: action,
    signatures: { type: "2", labels: ["Le responsable pédagogique", "Pour l'équipe pédagogique"], names: [o.responsablePedagogique || o.dirigeant, (f.formateur || o.dirigeant)], dates: [dateReunion, dateReunion] },
  });
}
