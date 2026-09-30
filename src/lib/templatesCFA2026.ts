/**
 * Pièces CFA complémentaires — référentiel national qualité 2026
 * (décret n° 2026-728, en vigueur le 1er novembre 2026).
 * IND 13, 14, 15, 20, 21, 23, 29 : procédures et tableaux générés à partir des
 * données saisies (organisme, formation, fiche RNCP, apprentis). Aucune pièce
 * émise par un tiers n'est fabriquée.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, tableHTML, getStagiaireDateDebut, getStagiaireDateFin } from "./docBuilder";
import { getRNCPByCode } from "./rncpData";
import { REFERENCES_REGLEMENTAIRES_2026 } from "./qualite2026";
import { semainesEcole, cycleAlternance } from "./calendrierMissionsCFA";

function dateSysteme(o: OrganismeInfo): string {
  return formatDate((o.dateMaj || "").trim() || new Date().toISOString().slice(0, 10));
}
const fr = (d: Date) => d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
const nomApprenti = (s: StagiaireInfo) => `${s.civilite ? s.civilite + " " : ""}${s.prenom || ""} ${s.nom || ""}`.trim();

/** Blocs de compétences réels de la certification (fiche RNCP connue ou analysée), sinon modules du programme. */
export function blocsCertification(f: FormationInfo): { titre: string; competences: string[] }[] {
  const fiche = getRNCPByCode(f.codeRNCP || "");
  if (fiche?.blocsCompetences?.length) return fiche.blocsCompetences.map((b) => ({ titre: b.titre, competences: b.competences }));
  const ref = f.referentiel?.blocs || [];
  if (ref.length) return ref.map((b) => ({ titre: `${b.code} — ${b.intitule}`, competences: [] }));
  const mods = (f.programme || "").split("\n").map((l) => l.trim()).filter((l) => /^(bloc|module)/i.test(l));
  return (mods.length ? mods : [f.intitule]).map((t) => ({ titre: t, competences: [] }));
}

/**
 * Date de fin de chaque bloc pour un apprenti : les blocs se succèdent sur la
 * durée de son contrat, au prorata du nombre de blocs.
 */
export function finBlocApprenti(f: FormationInfo, s: StagiaireInfo, blocIdx: number, nbBlocs: number): Date {
  const deb = new Date(getStagiaireDateDebut(s, f) + "T00:00:00");
  const fin = new Date(getStagiaireDateFin(s, f) + "T00:00:00");
  if (isNaN(deb.getTime()) || isNaN(fin.getTime())) return new Date();
  const d = new Date(deb.getTime() + ((fin.getTime() - deb.getTime()) * (blocIdx + 1)) / Math.max(1, nbBlocs));
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1);
  return d;
}

// ───────────────────────── IND 13 — Coordination de l'alternance ─────────────────────────

export function genProcedureCoordinationAlternanceCFA(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({
    org: o, title: "PROCÉDURE DE COORDINATION CFA – ENTREPRISE – APPRENTI", subtitle: "Indicateur 13 — anticipation des missions et progressivité des apprentissages", formation: f,
    sections: [
      { heading: "Objet", content: `<p>Organiser l'articulation entre les enseignements au CFA et les missions confiées en entreprise, en lien avec le maître d'apprentissage, pour assurer la progressivité des apprentissages vers la certification « ${f.intitule}${f.codeRNCP ? ` (${f.codeRNCP})` : ""} ».</p>` },
      { heading: "Étapes", content: `<ol><li><strong>Avant la signature du contrat</strong> : vérification que les missions proposées par l'employeur permettent d'acquérir les compétences du référentiel (trame d'évaluation des besoins – partie entreprise).</li><li><strong>Dans le premier mois</strong> : entretien tripartite (apprenti, maître d'apprentissage, formateur référent) ; le <strong>tableau des missions ↔ blocs de compétences</strong> fixe les missions à court (1er trimestre), moyen (fin de 1re année) et long terme (fin de contrat).</li><li><strong>À chaque période</strong> : le livret d'apprentissage relie les séquences CFA et les activités en entreprise ; le calendrier d'alternance est remis à l'entreprise.</li><li><strong>Au moins une fois par semestre</strong> : visite ou entretien de suivi en entreprise, compte rendu signé, ajustement des missions.</li><li><strong>En cas d'écart</strong> (missions sans lien avec le référentiel, difficulté) : entretien sous 15 jours, plan d'action, information de l'OPCO si nécessaire.</li></ol>` },
      { heading: "Rythme d'alternance", content: `<p>${f.rythmeAlternance ? `Rythme retenu : <strong>${f.rythmeAlternance}</strong>.` : "Rythme défini dans la convention de formation."} Les semaines au CFA sont communiquées à l'entreprise dans le calendrier d'alternance nominatif.</p>` },
      { heading: "Acteurs", content: `<p>Responsable pédagogique : ${o.responsablePedagogique || o.dirigeant} — relation entreprises : ${o.relationEntreprises || o.dirigeant}.</p>` },
    ],
    signatures: { type: "2", labels: ["Le Directeur du CFA", "Le Responsable pédagogique"], names: [o.dirigeant, o.responsablePedagogique || o.dirigeant], dates: [dateSysteme(o), dateSysteme(o)] },
  });
}

export function genTableauMissionsBlocsCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const blocs = blocsCertification(f);
  const horizons = ["Court terme (1er trimestre)", "Moyen terme (fin de 1re année)", "Long terme (fin de contrat)"];
  const rows: string[][] = [];
  blocs.forEach((b, bi) => {
    const comps = b.competences.length ? b.competences : [b.titre];
    comps.slice(0, 4).forEach((c, ci) => {
      const h = horizons[Math.min(2, Math.floor(((bi * 4 + ci) * 3) / Math.max(1, blocs.length * 4)))];
      rows.push([b.titre, c, `Réaliser en entreprise, sous la responsabilité du maître d'apprentissage : ${c.charAt(0).toLowerCase() + c.slice(1)}`, h]);
    });
  });
  return buildDocument({
    org: o, title: "TABLEAU DE CORRESPONDANCE MISSIONS EN ENTREPRISE ↔ BLOCS DE COMPÉTENCES", subtitle: `Indicateur 13 — ${nomApprenti(s)}`, formation: f,
    sections: [{ heading: "Apprenti et entreprise", content: `<p><strong>${nomApprenti(s)}</strong> — ${s.entreprise || "entreprise d'accueil"}${s.responsableEntreprise ? ` — maître d'apprentissage : ${s.responsableEntreprise}` : ""}<br>Contrat du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}.</p>` }],
    table: { headers: ["Bloc", "Compétence du référentiel", "Mission confiée en entreprise", "Échéance"], rows },
    signatures: { type: "3", names: [`${s.prenom} ${s.nom}`, f.formateur || o.responsablePedagogique], stagiaireSignatureUrl: s.signatureUrl, responsableEntrepriseSignatureUrl: s.signatureResponsableUrl },
    stagiaires: [s],
  });
}

export function genCalendrierAlternanceCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const semaines = semainesEcole(f, s);
  const [, entreprise] = cycleAlternance(f.rythmeAlternance);
  const rows = semaines.map((l, i) => {
    const fin = new Date(l); fin.setDate(fin.getDate() + (entreprise > 0 ? 4 : 0));
    return [String(i + 1), entreprise > 0 ? `du ${fr(l)} au ${fr(fin)}` : `${fr(l)} (journée CFA)`, "CFA", "Entreprise le reste du temps"];
  });
  return buildDocument({
    org: o, title: "CALENDRIER D'ALTERNANCE", subtitle: `Indicateur 13 — ${nomApprenti(s)}`, formation: f,
    sections: [{ heading: "Rythme", content: `<p>${f.rythmeAlternance || "1 semaine CFA / 3 semaines entreprise"} — contrat du ${formatDate(getStagiaireDateDebut(s, f))} au ${formatDate(getStagiaireDateFin(s, f))}. Calendrier remis à l'apprenti et à l'entreprise (${s.entreprise || "entreprise d'accueil"}).</p>` }],
    table: { headers: ["N°", "Période au CFA", "Lieu", "Hors période CFA"], rows },
    stagiaires: [s],
  });
}

// ───────────────────────── IND 14 — Ruptures, violences, discriminations ─────────────────────────

export function genProcedureRupturesSansDelaiCFA(o: OrganismeInfo) {
  const ref = o.referentDecrochage || o.responsablePedagogique || o.dirigeant;
  return buildDocument({
    org: o, title: "PROCÉDURE DE TRAITEMENT SANS DÉLAI DES SITUATIONS DE RUPTURE", subtitle: "Indicateur 14 — difficultés, violences ou discriminations subies en formation ou en entreprise",
    sections: [
      { heading: "Exigence", content: `<p>Le prestataire « dispose d'une procédure de traitement sans délai des situations de rupture liées à des difficultés, violences ou discriminations subies par l'apprenant en formation ou dans l'entreprise d'accueil » (indicateur 14, décret n° 2026-728).</p>` },
      { heading: "Signalement", content: `<p>Tout apprenti, parent, formateur ou maître d'apprentissage peut signaler une situation à ${ref} (${o.email || "adresse du CFA"}${o.telephone ? `, ${o.telephone}` : ""}), oralement ou par écrit. Le signalement peut être anonyme ; il est enregistré le jour même.</p>` },
      { heading: "Traitement", content: `<ol><li><strong>Le jour même</strong> : prise de contact avec l'apprenti, mise en sécurité si nécessaire (y compris suspension de la présence en entreprise en lien avec l'employeur).</li><li><strong>Sous 48 heures</strong> : entretien individuel, recueil des faits, information du représentant légal pour un mineur.</li><li><strong>Selon la nature des faits</strong> : orientation vers les interlocuteurs compétents (médiateur de l'apprentissage de la chambre consulaire, inspection du travail, services sociaux, forces de l'ordre) ; en cas de violence ou de discrimination au CFA, procédure disciplinaire.</li><li><strong>En cas de rupture du contrat</strong> : maintien en formation au CFA jusqu'à 6 mois et recherche d'un nouvel employeur (art. L.6222-18-2 du Code du travail).</li><li><strong>Suivi</strong> : point à 15 jours puis mensuel jusqu'à la résolution ; traçabilité dans le registre des situations.</li></ol>`, variant: "green" },
      { heading: "Confidentialité", content: `<p>Les informations sont partagées avec les seules personnes nécessaires au traitement de la situation.</p>` },
    ],
    signatures: { type: "2", labels: ["Le Directeur du CFA", "Le référent"], names: [o.dirigeant, ref], dates: [dateSysteme(o), dateSysteme(o)] },
  });
}

// ───────────────────────── IND 15 — Information des apprentis ─────────────────────────

export function genInformationViolencesMediateurCFA(o: OrganismeInfo) {
  return buildDocument({
    org: o, title: "PRÉVENTION ET SIGNALEMENT DES VIOLENCES, HARCÈLEMENT ET DISCRIMINATIONS — MÉDIATEUR DE L'APPRENTISSAGE", subtitle: "Indicateur 15 — information remise à chaque apprenti",
    sections: [
      { heading: "Vos droits", content: `<p>En tant qu'apprenti et salarié, vous bénéficiez des mêmes droits que les autres salariés de l'entreprise. Aucun salarié ne doit subir des agissements de harcèlement moral ou sexuel, d'agissements sexistes ou de discriminations (articles L.1152-1, L.1153-1, L.1142-2-1 et L.1132-1 du Code du travail). Les apprentis mineurs bénéficient de règles renforcées (durée du travail, travail de nuit, travaux interdits).</p>` },
      { heading: "À qui s'adresser au CFA", content: `<p>Référent : <strong>${o.referentDecrochage || o.responsablePedagogique || o.dirigeant}</strong> — ${o.email || ""}${o.telephone ? ` — ${o.telephone}` : ""}. Référent handicap : ${o.referentHandicap || o.dirigeant}. Toute situation est traitée sans délai (procédure IND 14).</p>` },
      { heading: "Médiateur de l'apprentissage", content: `<p>En cas de différend avec votre employeur (exécution ou rupture du contrat), vous pouvez saisir gratuitement le <strong>médiateur de l'apprentissage</strong> de la chambre consulaire dont relève votre employeur : chambre de commerce et d'industrie, chambre de métiers et de l'artisanat ou chambre d'agriculture. Ses coordonnées figurent sur le site de la chambre concernée ; le CFA vous aide à l'identifier.</p>` },
      { heading: "Numéros nationaux", content: `<ul><li><strong>119</strong> — Allô Enfance en danger (mineurs), gratuit, 24 h/24.</li><li><strong>3919</strong> — Violences Femmes Info, gratuit et anonyme.</li><li><strong>3018</strong> — cyberharcèlement et violences numériques.</li><li><strong>3928</strong> — Défenseur des droits (discriminations).</li><li><strong>17</strong> ou <strong>112</strong> — urgence.</li></ul>` },
      { heading: "Inspection du travail", content: `<p>Le CFA signale à l'inspection du travail (DREETS / DDETS) les dysfonctionnements constatés dans l'entreprise d'accueil (santé, sécurité, harcèlement, non-respect des règles applicables aux mineurs).</p>`, variant: "green" },
    ],
  });
}

// ───────────────────────── IND 20 — Intervenants permanents ─────────────────────────

export function genPartHeuresPermanentsCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const internes = new Set([o.dirigeant, o.responsablePedagogique].map((x) => (x || "").trim().toLowerCase()).filter(Boolean));
  const noms = Array.from(new Set([f.formateur, ...stagiaires.map((s) => s.formateur)].map((x) => (x || "").trim()).filter(Boolean)));
  const rows = (noms.length ? noms : [o.responsablePedagogique || o.dirigeant]).map((n) => [n, internes.has(n.toLowerCase()) ? "Permanent (dirigeant / salarié du CFA)" : "Intervenant externe (sous-traitance ou portage)"]);
  const nbExt = rows.filter((r) => r[1].startsWith("Intervenant externe")).length;
  return buildDocument({
    org: o, title: "PART DES HEURES ASSURÉES PAR DES INTERVENANTS PERMANENTS ET SUPERVISION PÉDAGOGIQUE", subtitle: "Indicateur 20 — gouvernance et pilotage de la formation", formation: f,
    sections: [
      { heading: "Intervenants de la formation", content: tableHTML(["Intervenant", "Statut"], rows) },
      { heading: "Analyse", content: nbExt === 0
        ? `<p>Les enseignements sont assurés par des intervenants permanents du CFA : la part d'heures réalisées par des permanents est de 100 %, au-dessus du seuil fixé par arrêté du ministre chargé de la formation professionnelle.</p>`
        : `<p>${nbExt} intervenant(s) externe(s) interviennent. La part d'heures assurées par des permanents est calculée à chaque session à partir des émargements ; si elle est inférieure au seuil fixé par arrêté du ministre chargé de la formation professionnelle, les modalités renforcées ci-dessous s'appliquent.</p>` },
      { heading: "Modalités de supervision pédagogique et de contrôle", content: `<ul><li>Validation préalable des supports et du déroulé par le responsable pédagogique (${o.responsablePedagogique || o.dirigeant}).</li><li>Observation d'au moins une séance par intervenant externe et par an, avec grille d'évaluation pédagogique.</li><li>Analyse des évaluations des enseignements par les apprentis (IND 33) pour chaque intervenant.</li><li>Réunion pédagogique trimestrielle avec compte rendu.</li></ul>`, variant: "green" },
      { heading: "Participation à la gouvernance", content: `<p>Les apprentis (délégués élus), les formateurs et les entreprises d'accueil sont représentés au conseil de perfectionnement, qui se réunit au moins une fois par an.</p>` },
    ],
    signatures: { type: "2", labels: ["Le Directeur du CFA", "Le Responsable pédagogique"], names: [o.dirigeant, o.responsablePedagogique || o.dirigeant], dates: [dateSysteme(o), dateSysteme(o)] },
  });
}

// ───────────────────────── IND 21 — Justificatifs des intervenants ─────────────────────────

export function genJustificatifsIntervenantsCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const noms = Array.from(new Set([f.formateur, o.responsablePedagogique, ...stagiaires.map((s) => s.formateur)].map((x) => (x || "").trim()).filter(Boolean)));
  const fiche = getRNCPByCode(f.codeRNCP || "");
  const rows = noms.map((n) => [n, n === (f.formateur || "").trim() ? "Formateur" : "Responsable pédagogique", fiche ? `Expérience professionnelle dans le métier visé (${fiche.intitule}) et expérience de formation d'adultes` : `Expertise dans le domaine « ${f.intitule} » et expérience de formation d'adultes`, "CV daté et signé ; diplômes / titres ; attestations d'expérience ; attestations de formation continue"]);
  return buildDocument({
    org: o, title: "DOSSIER DE COMPÉTENCES DES INTERVENANTS — JUSTIFICATIFS", subtitle: "Indicateur 21 — détermination, mobilisation et évaluation des compétences", formation: f,
    sections: [
      { heading: "Compétences requises", content: `<p>Pour intervenir sur « ${f.intitule} », ${o.nom} exige : une expérience professionnelle dans le métier visé, une expérience ou une formation en pédagogie d'adultes et la maîtrise des modalités d'évaluation de la certification${fiche ? ` (${fiche.code}, ${fiche.certificateur})` : ""}. Pour un titre professionnel, les formateurs connaissent le référentiel emploi-activités-compétences (REAC) et le référentiel d'évaluation.</p>` },
      { heading: "Évaluation", content: `<p>Les compétences sont vérifiées au recrutement (grille de recrutement), puis évaluées chaque année (observation de séance, évaluations des enseignements par les apprentis, entretien annuel).</p>` },
    ],
    table: { headers: ["Intervenant", "Fonction", "Compétences requises", "Pièces conservées au dossier"], rows },
  });
}

// ───────────────────────── IND 23 — Veille réglementaire sourcée ─────────────────────────

export function genVeilleSourceeCFA(o: OrganismeInfo, f: FormationInfo) {
  const dateConsult = dateSysteme(o);
  const refs = REFERENCES_REGLEMENTAIRES_2026.filter((r) => r.types.includes("CFA"));
  const rows = refs.map((r) => [formatDate(r.date), r.texte, r.objet, `<a href="${r.source}" target="_blank">${r.source.replace(/^https?:\/\//, "")}</a>`, dateConsult]);
  const sources = [
    ["Légifrance", "https://www.legifrance.gouv.fr", "Textes législatifs et réglementaires (Code du travail, JORF)"],
    ["France Compétences", "https://www.francecompetences.fr", "Fiches RNCP / RS, niveaux de prise en charge des contrats d'apprentissage"],
    ["Ministère du Travail", "https://travail-emploi.gouv.fr", "Référentiel national qualité, guide de lecture, apprentissage"],
    ["Portail de l'alternance", "https://www.alternance.emploi.gouv.fr", "Contrats, aides, démarches employeurs et apprentis"],
    ["InserJeunes", "https://www.inserjeunes.education.gouv.fr", "Indicateurs de résultats des formations en apprentissage"],
    ["Centre Inffo", "https://www.centre-inffo.fr", "Actualité juridique de la formation professionnelle"],
  ];
  return buildDocument({
    org: o, title: "VEILLE LÉGALE ET RÉGLEMENTAIRE — TABLEAU SOURCÉ", subtitle: `Indicateur 23 — ${f.intitule}`,
    sections: [
      { heading: "Organisation de la veille", content: `<p>Veille mensuelle assurée par ${o.referentQualite || o.dirigeant} à partir des sources officielles ci-dessous. Chaque texte est consigné avec sa source et sa date de consultation, puis exploité en réunion pédagogique (mise à jour des procédures, information de l'équipe).</p>${tableHTML(["Source", "Adresse", "Objet"], sources.map(([a, b, c]) => [a, `<a href="${b}" target="_blank">${b.replace(/^https?:\/\//, "")}</a>`, c]))}` },
      { heading: "Textes suivis et exploitation", content: tableHTML(["Publication", "Texte", "Objet et exploitation", "Source", "Consulté le"], rows) },
      { heading: "Exploitation du décret n° 2026-728", content: `<ul><li>Référentiel qualité mis à jour : 33 indicateurs, application aux audits à compter du 1er novembre 2026.</li><li>IND 14 et 15 : procédure de traitement sans délai des situations de rupture et information renforcée des apprentis (violences, harcèlement, médiateur de l'apprentissage).</li><li>IND 20 : suivi de la part d'heures assurées par des intervenants permanents.</li><li>IND 27 : clause qualité dans chaque contrat de sous-traitance ou de portage salarial.</li><li>IND 32 : analyse des risques qualité ; IND 33 : évaluation des enseignements par les apprentis.</li></ul>`, variant: "green" },
    ],
  });
}

// ───────────────────────── IND 29 — Insertion et poursuite d'études ─────────────────────────

export function genProcedureInsertionPoursuiteEtudesCFA(o: OrganismeInfo, f: FormationInfo) {
  const fiche = getRNCPByCode(f.codeRNCP || "");
  return buildDocument({
    org: o, title: "PROCÉDURE INSERTION PROFESSIONNELLE ET POURSUITE D'ÉTUDES", subtitle: "Indicateur 29", formation: f,
    sections: [
      { heading: "Objet", content: `<p>Décrire les actions de ${o.nom} qui concourent à l'insertion professionnelle ou à la poursuite d'études des apprentis de la formation « ${f.intitule} ».</p>` },
      { heading: "Pendant la formation", content: `<ul><li>Ateliers CV, lettre de motivation et préparation aux entretiens d'embauche.</li><li>Information sur les débouchés${fiche?.typesEmplois?.length ? ` (${fiche.typesEmplois.slice(0, 4).join(", ")})` : ""} et sur les poursuites d'études possibles.</li><li>Mise en relation avec les entreprises partenaires du CFA.</li><li>Trois mois avant la fin du contrat : entretien de projet (embauche, nouveau contrat, poursuite d'études).</li></ul>` },
      { heading: "Après la formation", content: `<ul><li>Suivi des sortants à 3 mois et à 6 mois (questionnaire d'insertion).</li><li>Accompagnement des apprentis n'ayant pas obtenu la certification (mission 13, art. L.6231-2).</li><li>Publication des taux d'insertion et de poursuite d'études via InserJeunes (art. L.6111-8).</li></ul>`, variant: "green" },
      { heading: "Pilotage", content: `<p>Résultats présentés chaque année au conseil de perfectionnement ; actions d'amélioration inscrites au tableau d'amélioration continue. Référent : ${o.relationEntreprises || o.dirigeant}.</p>` },
    ],
    signatures: { type: "2", labels: ["Le Directeur du CFA", "Le Responsable pédagogique"], names: [o.dirigeant, o.responsablePedagogique || o.dirigeant], dates: [dateSysteme(o), dateSysteme(o)] },
  });
}
