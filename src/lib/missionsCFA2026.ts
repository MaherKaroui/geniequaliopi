/**
 * Les 14 missions des CFA (article L.6231-2 du Code du travail, texte vérifié sur
 * code.travail.gouv.fr le 30/09/2026) : fiche par mission, procédures manquantes
 * (missions 6 et 12), émargement des ateliers, tableau de bord et plan annuel.
 *
 * Toutes les dates viennent du calendrier d'alternance réel de chaque apprenti
 * (calendrierMissionsCFA.ts) ; rien n'est présenté comme réalisé après aujourd'hui.
 */
import type { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, tableHTML } from "./docBuilder";
import { lundiMission, dateQCMMission } from "./calendrierMissionsCFA";
import { MISSIONS_QCM, pickStudentAnswers } from "./templatesCFA14Missions";

export interface MissionRef {
  n: number;
  alinea: string;          // mission telle que fixée par l'article L.6231-2
  titre: string;
  responsable: (o: OrganismeInfo) => string;
  actions: string[];
  preuves: string[];
  indicateur: string;
  qualiopi: number[];
}

const pick = (...v: (string | undefined)[]) => v.map((x) => (x || "").trim()).find(Boolean) || "";

export const MISSIONS_REF: MissionRef[] = [
  { n: 1, alinea: "Accompagner les personnes, y compris celles en situation de handicap, souhaitant s'orienter ou se réorienter par la voie de l'apprentissage, en développant leurs connaissances et leurs compétences et en facilitant leur intégration en emploi, en cohérence avec leur projet professionnel ; le CFA désigne un référent chargé de l'intégration des personnes en situation de handicap.",
    titre: "Orientation, réorientation et accompagnement (y compris handicap)", responsable: (o) => pick(o.referentHandicap, o.dirigeant),
    actions: ["Entretien d'orientation et de positionnement avant l'entrée", "Question systématique sur le besoin de compensation, entretien avec le référent handicap", "Adaptations de parcours (rythme, supports, évaluations) formalisées"],
    preuves: ["Livret référent handicap", "Évaluation des besoins (apprenant et entreprise)", "Fiche d'évaluation des besoins PSH", "QCM Mission 1"], indicateur: "Part des demandes d'aménagement traitées sous 8 jours", qualiopi: [4, 10, 20, 26] },
  { n: 2, alinea: "Appuyer et accompagner les postulants à l'apprentissage dans leur recherche d'un employeur.",
    titre: "Appui à la recherche d'un employeur", responsable: (o) => pick(o.relationEntreprises, o.dirigeant),
    actions: ["Atelier CV, lettre et simulation d'entretien", "Diffusion des offres des entreprises partenaires", "Suivi des candidats sans contrat (3 mois au plus en formation sans contrat)"],
    preuves: ["Procédure d'aide à la recherche d'employeur", "Tableau de suivi des candidats sans contrat", "QCM Mission 2"], indicateur: "Part des candidats ayant signé un contrat dans les 3 mois", qualiopi: [10, 12, 29] },
  { n: 3, alinea: "Assurer la cohérence entre la formation dispensée en leur sein et celle dispensée au sein de l'entreprise, en particulier en organisant la coopération entre les formateurs et les maîtres d'apprentissage.",
    titre: "Cohérence CFA / entreprise et coopération avec les maîtres d'apprentissage", responsable: (o) => pick(o.responsablePedagogique, o.dirigeant),
    actions: ["Tableau missions en entreprise ↔ blocs de compétences par apprenti", "Livret d'apprentissage et visites de suivi en entreprise", "Information et formation des maîtres d'apprentissage"],
    preuves: ["Procédure de coopération CFA / entreprise", "Tableau missions ↔ blocs", "Livret du maître d'apprentissage", "QCM Mission 3"], indicateur: "Visites en entreprise réalisées / prévues", qualiopi: [13, 18] },
  { n: 4, alinea: "Informer, dès le début de leur formation, les apprentis de leurs droits et devoirs en tant qu'apprentis et en tant que salariés et des règles applicables en matière de santé et de sécurité en milieu professionnel.",
    titre: "Droits et devoirs, santé et sécurité au travail", responsable: (o) => pick(o.responsablePedagogique, o.dirigeant),
    actions: ["Séance d'information à la rentrée (droits et devoirs, santé-sécurité, mesures renforcées pour les mineurs)", "Information sur la prévention et le signalement des violences, du harcèlement et des discriminations, et sur le médiateur de l'apprentissage (IND 15, décret n° 2026-728)", "Remise tracée du livret SST"],
    preuves: ["Information droits et devoirs / santé-sécurité", "Attestation de remise du livret SST", "Information violences et médiateur", "QCM Mission 4"], indicateur: "Part des apprentis ayant signé l'attestation de remise dans le premier mois", qualiopi: [9, 15] },
  { n: 5, alinea: "Permettre aux apprentis en rupture de contrat la poursuite de leur formation pendant six mois tout en les accompagnant dans la recherche d'un nouvel employeur.",
    titre: "Poursuite de la formation après une rupture de contrat (6 mois)", responsable: (o) => pick(o.referentDecrochage, o.responsablePedagogique, o.dirigeant),
    actions: ["Procédure de traitement sans délai des ruptures (IND 14, décret n° 2026-728)", "Maintien en formation jusqu'à 6 mois et recherche d'un nouvel employeur", "Entretien individuel dans la semaine suivant la rupture"],
    preuves: ["Procédure de maintien en formation", "Les cas de rupture du contrat", "QCM Mission 5"], indicateur: "Part des apprentis en rupture ayant retrouvé un employeur dans les 6 mois", qualiopi: [12, 14] },
  { n: 6, alinea: "Apporter, en lien avec le service public de l'emploi, en particulier avec les missions locales, un accompagnement aux apprentis pour prévenir ou résoudre les difficultés d'ordre social et matériel susceptibles de mettre en péril le déroulement du contrat.",
    titre: "Accompagnement social et matériel", responsable: (o) => pick(o.referentDecrochage, o.poleAdministratif, o.dirigeant),
    actions: ["Repérage des difficultés (logement, transport, santé, ressources) lors des entretiens de suivi", "Orientation vers la mission locale, France Travail, la CAF, Action Logement", "Suivi de la situation jusqu'à sa résolution"],
    preuves: ["Procédure d'accompagnement social et matériel", "QCM Mission 6"], indicateur: "Situations repérées et orientées / situations résolues", qualiopi: [10, 14] },
  { n: 7, alinea: "Favoriser la mixité au sein de leurs structures en sensibilisant les formateurs, les maîtres d'apprentissage et les apprentis à la question de l'égalité entre les femmes et les hommes et en menant une politique d'information des apprentis sur la prévention du harcèlement sexuel et des agissements sexistes.",
    titre: "Mixité et égalité femmes-hommes, prévention du harcèlement sexuel", responsable: (o) => pick(o.dirigeant),
    actions: ["Sensibilisation des formateurs, maîtres d'apprentissage et apprentis", "Information sur la prévention du harcèlement sexuel et des agissements sexistes", "Suivi de la répartition femmes-hommes par formation"],
    preuves: ["Plan d'actions mixité et égalité F/H", "Affichages harcèlement", "QCM Mission 7"], indicateur: "Part d'apprentis sensibilisés", qualiopi: [14, 15] },
  { n: 8, alinea: "Encourager la mixité des métiers et l'égalité professionnelle entre les femmes et les hommes en organisant des actions d'information sur ces sujets à destination des apprentis.",
    titre: "Mixité des métiers et égalité professionnelle", responsable: (o) => pick(o.dirigeant),
    actions: ["Action d'information sur la mixité des métiers préparés", "Témoignages de professionnel(le)s", "Analyse des candidatures par sexe"],
    preuves: ["Plan d'actions mixité des métiers", "QCM Mission 8"], indicateur: "Nombre d'actions d'information réalisées", qualiopi: [14, 29] },
  { n: 9, alinea: "Favoriser, au-delà de l'égalité entre les femmes et les hommes, la diversité au sein de leurs structures et apporter un accompagnement aux apprentis victimes de discriminations.",
    titre: "Diversité et lutte contre les discriminations", responsable: (o) => pick(o.dirigeant),
    actions: ["Charte et affichages (laïcité, racisme, discriminations)", "Écoute et accompagnement des apprentis victimes", "Signalement et traitement sans délai (IND 14)"],
    preuves: ["Plan diversité et lutte contre les discriminations", "QCM Mission 9"], indicateur: "Signalements traités sans délai / signalements reçus", qualiopi: [14, 26] },
  { n: 10, alinea: "Encourager la mobilité nationale et internationale des apprentis en nommant un personnel dédié, qui peut comprendre un référent chargé de la mobilité.",
    titre: "Mobilité nationale et internationale", responsable: (o) => pick(o.referentMobilite, o.responsablePedagogique, o.dirigeant),
    actions: ["Désignation du référent mobilité", "Information sur la mobilité nationale (inter-CFA) et européenne (Erasmus+)", "Accompagnement des projets de mobilité"],
    preuves: ["Lettre de mission du référent mobilité", "Plan de mobilité nationale", "Fiche de demande de mobilité", "QCM Mission 10"], indicateur: "Apprentis informés / projets de mobilité accompagnés", qualiopi: [20] },
  { n: 11, alinea: "Assurer le suivi et l'accompagnement des apprentis quand la formation est dispensée en tout ou partie à distance.",
    titre: "Suivi et accompagnement de la formation à distance", responsable: (o) => pick(o.referentNumerique, o.responsablePedagogique, o.dirigeant),
    actions: ["Assistance technique et pédagogique (art. D.6313-3-1)", "Relevé des connexions et relance en cas d'absence", "Point individuel à chaque période"],
    preuves: ["Procédure de suivi à distance", "Relevés de connexion", "QCM Mission 11"], indicateur: "Délai de réponse aux demandes d'assistance", qualiopi: [10, 19] },
  { n: 12, alinea: "Évaluer les compétences acquises par les apprentis, y compris sous la forme d'un contrôle continu, dans le respect des règles définies par chaque organisme certificateur.",
    titre: "Évaluation des compétences acquises", responsable: (o) => pick(o.responsablePedagogique, o.dirigeant),
    actions: ["Positionnement à l'entrée, évaluations formatives par bloc, examen blanc", "Contrôle en cours de formation selon les règles du certificateur", "Évaluation des enseignements par les apprentis (IND 33)"],
    preuves: ["Procédure d'évaluation des compétences", "Évaluations par bloc", "Grilles d'évaluation des enseignements", "QCM Mission 12"], indicateur: "Taux de réussite aux évaluations par bloc", qualiopi: [8, 11, 33] },
  { n: 13, alinea: "Accompagner les apprentis ayant interrompu leur formation et ceux n'ayant pas, à l'issue de leur formation, obtenu de diplôme ou de titre à finalité professionnelle, pour leur permettre de poursuivre une formation, d'accéder à l'emploi ou de faire reconnaître leurs acquis.",
    titre: "Accompagnement après interruption ou échec", responsable: (o) => pick(o.referentDecrochage, o.relationEntreprises, o.dirigeant),
    actions: ["Entretien de sortie et plan d'action", "Orientation vers une nouvelle session, la validation par blocs ou la VAE", "Suivi des sortants à 3 et 6 mois"],
    preuves: ["Procédure d'accompagnement post-formation", "Suivi des sortants", "QCM Mission 13"], indicateur: "Part des sortants sans diplôme ayant une solution à 6 mois", qualiopi: [12, 29] },
  { n: 14, alinea: "Accompagner les apprentis dans leurs démarches pour accéder aux aides auxquelles ils peuvent prétendre au regard de la législation et de la réglementation en vigueur.",
    titre: "Accès aux aides", responsable: (o) => pick(o.poleAdministratif, o.dirigeant),
    actions: ["Information sur les aides dès l'entrée (logement, transport, équipement, prime d'activité)", "Aide à la constitution des dossiers (CAF, Action Logement…)", "Mise à jour de la liste des aides au fil de la veille (ex. suppression de l'aide de 500 € au permis de conduire des apprentis au 21/02/2026, loi n° 2026-103)"],
    preuves: ["Procédure d'accompagnement à l'accès aux aides", "QCM Mission 14"], indicateur: "Dossiers d'aide accompagnés", qualiopi: [14] },
];

const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fr = (d: Date) => formatDate(iso(d));
const valides = (st: StagiaireInfo[]) => st.filter((s) => (s.nom || "").trim());

/** Date de l'atelier / du QCM de la mission pour chaque apprenti. */
function datesApprentis(f: FormationInfo, stagiaires: StagiaireInfo[], n: number) {
  return valides(stagiaires).map((s) => ({ s, date: dateQCMMission(f, n, s) }));
}

function dateSysteme(o: OrganismeInfo): string {
  return formatDate((o.dateMaj || iso(today0())).slice(0, 10));
}

/** Fiche mission : qui, quoi, quand, comment, preuves, indicateur (une par mission). */
export function genFicheMissionCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], n: number): string {
  const m = MISSIONS_REF.find((x) => x.n === n) || MISSIONS_REF[0];
  const dates = datesApprentis(f, stagiaires, n).map((x) => x.date).sort((a, b) => a.getTime() - b.getTime());
  const premiere = dates[0] || lundiMission(f, n);
  return buildDocument({
    org: o,
    title: `FICHE MISSION ${n} — ${m.titre.toUpperCase()}`,
    subtitle: `Article L.6231-2 du Code du travail, ${n}° — indicateurs Qualiopi ${m.qualiopi.join(", ")}`,
    sections: [
      { heading: "Ce que prévoit la loi", content: `<p>${m.alinea}</p>` },
      { heading: "Qui", content: `<p><strong>Responsable :</strong> ${m.responsable(o)}<br><strong>Appui :</strong> équipe pédagogique, maîtres d'apprentissage${n === 6 || n === 13 ? ", mission locale, France Travail" : ""}${n === 1 ? ", Agefiph, Cap emploi, MDPH" : ""}</p>` },
      { heading: "Quoi — actions", content: `<ul>${m.actions.map((a) => `<li>${a}</li>`).join("")}</ul>` },
      { heading: "Quand", content: `<p>Diffusion de la mission pendant la semaine école du ${fr(premiere)}${dates.length > 1 ? ` (calendrier propre à chaque apprenti)` : ""} : annonce la veille, newsletter, atelier et QCM le même jour ; rappel à chaque entretien de suivi.</p>` },
      { heading: "Comment", content: `<p>Newsletter et visuel dédiés, atelier collectif avec émargement, QCM individuel corrigé, entretien individuel si besoin. Les résultats sont analysés en réunion pédagogique et présentés au conseil de perfectionnement.</p>` },
      { heading: "Preuves conservées", content: `<ul>${m.preuves.map((p) => `<li>${p}</li>`).join("")}<li>Émargement de l'atelier Mission ${n}</li></ul>` },
      { heading: "Indicateur de suivi", content: `<p>${m.indicateur}. Consolidé dans le tableau de bord des 14 missions.</p>`, variant: "green" },
    ],
    signatures: { type: "2", labels: ["Le directeur du CFA", "Le responsable de la mission"], names: [o.dirigeant, m.responsable(o)], dates: [dateSysteme(o), dateSysteme(o)] },
  });
}

/** Mission 6 — procédure d'accompagnement social et matériel (en lien avec le service public de l'emploi). */
export function genProcedureAccompagnementSocialCFA(o: OrganismeInfo): string {
  const r = MISSIONS_REF[5].responsable(o);
  return buildDocument({
    org: o,
    title: "PROCÉDURE — ACCOMPAGNEMENT SOCIAL ET MATÉRIEL DES APPRENTIS (MISSION 6)",
    subtitle: "Article L.6231-2, 6° — indicateurs Qualiopi 10 et 14",
    sections: [
      { heading: "Objet", content: `<p>Prévenir ou résoudre, en lien avec le service public de l'emploi et en particulier les missions locales, les difficultés d'ordre social et matériel susceptibles de mettre en péril le contrat d'apprentissage.</p>` },
      { heading: "1. Repérage", content: `<p>Lors de l'entretien d'entrée et de chaque entretien de suivi, le formateur ou ${r} aborde : logement, transport, santé, ressources, garde d'enfant, équipement. Tout signal (absences répétées, retards, fatigue, isolement) est transmis au responsable dans les 48 heures.</p>` },
      { heading: "2. Entretien individuel", content: `<p>Entretien confidentiel sous 5 jours ouvrés : besoins, solutions possibles, accord de l'apprenti pour toute orientation. Pour un apprenti mineur, les représentants légaux sont associés.</p>` },
      { heading: "3. Orientation", content: `<ul><li>Mission locale (apprentis de 16 à 25 ans) et France Travail</li><li>CAF (aides au logement, prime d'activité selon les ressources)</li><li>Action Logement (aides au logement des alternants)</li><li>Services sociaux du département, centre communal d'action sociale</li><li>Aides de la Région et de l'OPCO (transport, hébergement, restauration, premier équipement) selon les règles en vigueur</li></ul><p>La liste est mise à jour au fil de la veille réglementaire (IND 23).</p>` },
      { heading: "4. Suivi", content: `<p>Chaque situation est inscrite dans le registre de suivi social (date, besoin, orientation, résultat) et revue à l'entretien suivant jusqu'à sa résolution. Le maître d'apprentissage est informé si l'apprenti l'accepte.</p>` },
      { heading: "5. Indicateurs", content: `<p>Situations repérées, orientées, résolues ; ruptures évitées. Bilan présenté au conseil de perfectionnement.</p>`, variant: "green" },
    ],
    signatures: { type: "2", labels: ["Le directeur du CFA", "Le responsable"], names: [o.dirigeant, r], dates: [dateSysteme(o), dateSysteme(o)] },
  });
}

/** Mission 12 — procédure d'évaluation des compétences acquises (y compris contrôle continu). */
export function genProcedureEvaluationCompetencesCFA(o: OrganismeInfo, f: FormationInfo): string {
  return buildDocument({
    org: o,
    title: "PROCÉDURE — ÉVALUATION DES COMPÉTENCES ACQUISES PAR LES APPRENTIS (MISSION 12)",
    subtitle: "Article L.6231-2, 12° — indicateurs Qualiopi 8, 11 et 33",
    formation: f,
    sections: [
      { heading: "Objet", content: `<p>Évaluer les compétences acquises par les apprentis, y compris sous la forme d'un contrôle continu, dans le respect des règles définies par le certificateur${f.codeRNCP ? ` de la certification ${f.codeRNCP}` : ""}.</p>` },
      { heading: "1. À l'entrée", content: `<p>Test de positionnement et entretien : niveau de départ, adaptation éventuelle de la durée du contrat (art. L.6222-7-1).</p>` },
      { heading: "2. En cours de formation", content: `<p>Évaluations formatives à la fin de chaque séquence, évaluation par bloc de compétences avec grille critériée et corrigé, examen blanc avant la session de certification. Les résultats sont restitués individuellement et partagés avec le maître d'apprentissage lors des visites.</p>` },
      { heading: "3. Contrôle continu et certification", content: `<p>Lorsque le règlement du certificateur prévoit un contrôle en cours de formation, le CFA respecte ses modalités (épreuves, grilles, jurys, procès-verbaux). Les candidats sont inscrits dans les délais fixés par le certificateur (IND 16).</p>` },
      { heading: "4. Évaluation des enseignements par les apprentis", content: `<p>À la fin de chaque bloc, les apprentis évaluent les contenus et les enseignements (grille distincte de la satisfaction, IND 33) ; les résultats sont partagés avec l'équipe pédagogique.</p>` },
      { heading: "5. Remédiation", content: `<p>Toute compétence non acquise (note inférieure à 12/20) donne lieu à une remédiation formalisée avant la certification.</p>`, variant: "green" },
    ],
    signatures: { type: "2", labels: ["Le directeur du CFA", "Le responsable pédagogique"], names: [o.dirigeant, MISSIONS_REF[11].responsable(o)], dates: [dateSysteme(o), dateSysteme(o)] },
  });
}

/** Émargement de l'atelier collectif d'une mission (preuve de mise en œuvre par apprenti). */
export function genEmargementAtelierMissionCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], n: number): string {
  const m = MISSIONS_REF.find((x) => x.n === n) || MISSIONS_REF[0];
  const t = today0();
  const rows = datesApprentis(f, stagiaires, n).map(({ s, date }) => {
    const passe = date.getTime() <= t.getTime();
    const sig = passe && s.signatureUrl ? `<img src="${s.signatureUrl}" alt="signature" style="max-height:34px">` : passe ? "" : "<em>à venir</em>";
    return [`${s.civilite ? s.civilite + " " : ""}${s.prenom} ${s.nom}`, fr(date), "13 h 30 – 14 h 30", passe ? "Présent(e)" : "Prévu", sig];
  });
  return buildDocument({
    org: o,
    title: `ÉMARGEMENT — ATELIER MISSION ${n}`,
    subtitle: `${m.titre} — article L.6231-2, ${n}°`,
    formation: f,
    sections: [{ heading: "Atelier", content: `<p>Animé par ${m.responsable(o)} pendant la semaine école de chaque apprenti ; présentation de la mission, échanges, puis QCM individuel.</p>` }],
    table: { headers: ["Apprenti", "Date", "Horaire", "Statut", "Signature"], rows },
  });
}

/** Taux de réussite moyen des QCM déjà passés pour une mission. */
function statsQCM(f: FormationInfo, stagiaires: StagiaireInfo[], n: number) {
  const mission = MISSIONS_QCM.find((x) => x.numero === n);
  const t = today0();
  const passes = datesApprentis(f, stagiaires, n).filter((x) => x.date.getTime() <= t.getTime());
  if (!mission || passes.length === 0) return { passes: 0, total: valides(stagiaires).length, taux: null as number | null, derniere: null as Date | null };
  const scores = passes.map(({ s }) => {
    const a = pickStudentAnswers(s, n, mission.questions);
    return a.filter((x, i) => x === mission.questions[i].correctIndex).length / mission.questions.length;
  });
  const derniere = passes.map((x) => x.date).sort((a, b) => b.getTime() - a.getTime())[0];
  return { passes: passes.length, total: valides(stagiaires).length, taux: Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100), derniere };
}

/** Tableau de bord des 14 missions (une ligne par mission). */
export function genTableauBord14MissionsCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const rows = MISSIONS_REF.map((m) => {
    const st = statsQCM(f, stagiaires, m.n);
    const realise = st.passes > 0;
    return [
      `${m.n}° — ${m.titre}`,
      m.responsable(o),
      realise ? `Newsletter, atelier et QCM réalisés pour ${st.passes}/${st.total} apprenti(s)` : "Programmée (semaine école à venir)",
      m.preuves.join(" ; "),
      `${m.indicateur}${st.taux !== null ? ` — réussite QCM : ${st.taux} %` : ""}`,
      st.derniere ? fr(st.derniere) : "—",
      m.qualiopi.join(", "),
    ];
  });
  const faites = MISSIONS_REF.filter((m) => statsQCM(f, stagiaires, m.n).passes > 0).length;
  return buildDocument({
    org: o,
    title: "TABLEAU DE BORD DES 14 MISSIONS DU CFA",
    subtitle: `Article L.6231-2 du Code du travail — situation au ${fr(today0())}`,
    formation: f,
    sections: [{ heading: "Synthèse", content: `<p>${faites} mission(s) sur 14 déjà mises en œuvre auprès des apprentis de la session ; les autres sont programmées dans leurs semaines école. Le tableau est revu en réunion pédagogique et présenté au conseil de perfectionnement.</p>` }],
    table: { headers: ["Mission", "Responsable", "Actions menées", "Preuves", "Indicateurs", "Dernière action", "IND Qualiopi"], rows },
  });
}

/** Plan annuel des 14 missions calé sur la session. */
export function genPlanAnnuel14MissionsCFA(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string {
  const t = today0();
  const rows = MISSIONS_REF.map((m) => {
    const dates = datesApprentis(f, stagiaires, m.n).map((x) => x.date);
    const d = dates.length ? dates.sort((a, b) => a.getTime() - b.getTime())[0] : lundiMission(f, m.n);
    return [`${m.n}° — ${m.titre}`, `Semaine école du ${fr(lundiMission(f, m.n, valides(stagiaires)[0]))}`, m.actions[0], m.responsable(o), d.getTime() <= t.getTime() ? "Réalisée" : "Planifiée"];
  });
  return buildDocument({
    org: o,
    title: "PLAN ANNUEL DES 14 MISSIONS DU CFA",
    subtitle: "Une mission par semaine école, réparties sur toute la durée de la session",
    formation: f,
    sections: [{ heading: "Principe", content: `<p>Chaque mission est diffusée pendant une semaine école réelle de l'apprenti (rythme d'alternance : ${f.rythmeAlternance || "non précisé"}) : annonce la veille, newsletter, atelier émargé, QCM individuel corrigé. Le plan est arrêté le ${dateSysteme(o)} et ajusté si le calendrier d'un apprenti change.</p>` }],
    table: { headers: ["Mission", "Période", "Action principale", "Responsable", "Statut"], rows },
  });
}
