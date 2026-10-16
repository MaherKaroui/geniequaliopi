/**
 * Dossier Qualiopi VAE — pièces générées pour le catalogue principal (docCatalog, section VAE).
 *
 * Cadre : loi n° 2022-1598 du 21 décembre 2022, décret n° 2023-1275 du 27 décembre 2023,
 * Code du travail L.6411-1 et suivants, R.6412-1 et suivants ; référentiel national qualité
 * (décret n° 2026-728, en vigueur le 1er novembre 2026).
 *
 * Principes :
 * - toutes les pièces s'appuient sur le même profil, le même calendrier et la même chronologie
 *   par candidat (vaeProfil.ts) ;
 * - l'organisme ne produit jamais de pièce au nom du certificateur (recevabilité, convocation,
 *   procès-verbal, décision) : il en prévoit l'emplacement ;
 * - aucune pièce d'exécution n'est présentée comme réalisée après la date du jour ;
 * - pas de signature simulée : image réelle ou case vide.
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, linkUrl, isFacebookPage, getStagiaireTarif } from "../docBuilder";
import { getRNCPByCode } from "../rncpData";
import { REFERENCES_REGLEMENTAIRES_2026, genAnalyseRisquesQualite, genRegistreSousTraitancePortage, genClausesQualiteContrat } from "../qualite2026";
import {
  certifVAE, profilVAE, calendrierVAE, chronoVAE, heuresVAE, frVAE, frLongVAE, parseDateVAE, estPasse, aujourdhui, graine,
  type SeanceVAE, type CertifVAE,
} from "./vaeProfil";

// ───────────────────────────── Aides communes ─────────────────────────────

const esc = (x: unknown) => String(x ?? "").replace(/</g, "&lt;");
const accompagnateur = (o: OrganismeInfo, f: FormationInfo, s?: StagiaireInfo) => (s?.formateur || f.formateur || o.responsablePedagogique || o.dirigeant || "").trim();
const lieuVAE = (o: OrganismeInfo, f: FormationInfo) => (f.lieu || "").trim() || "Google Meet / Zoom";
const telOrg = (o: OrganismeInfo) => (o.telephone?.trim() ? ` – ${o.telephone.trim()}` : "");
const dateSysteme = (o: OrganismeInfo) => frVAE(parseDateVAE(o.dateMaj) || aujourdhui());
const anneeSysteme = (o: OrganismeInfo) => (parseDateVAE(o.dateMaj) || aujourdhui()).getFullYear();

function img(url?: string, alt = "signature") {
  return url ? `<img src="${url}" alt="${alt}" style="max-height:60px;max-width:180px;margin-top:6px">` : `<div style="height:55px"></div>`;
}

/** Bloc de signatures sans signature simulée : image réelle ou case vide. */
function signatures(parts: { label: string; nom: string; date?: string; sig?: string; tampon?: string }[]): string {
  return `<div class="signature-block-2">${parts.map((p) => `<div class="sig-box"><p class="sig-label">${p.label}</p><p>Nom : ${esc(p.nom) || "________________________"}</p><p>Date : ${p.date || "____ / ____ / ________"}</p><p style="margin-top:20px">Signature :</p>${p.tampon ? img(p.tampon, "cachet") : ""}${img(p.sig)}</div>`).join("")}</div>`;
}

const sigCandidat = (s: StagiaireInfo, date?: string) => ({ label: "Le candidat", nom: `${s.prenom} ${s.nom}`, date, sig: s.signatureUrl });
const sigOrganisme = (o: OrganismeInfo, date?: string) => ({ label: `Pour ${o.nom}, le dirigeant`, nom: o.dirigeant, date, sig: o.signatureUrl, tampon: o.tamponUrl });
const sigAccompagnateur = (o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo, date?: string) => ({ label: "L'accompagnateur VAE", nom: accompagnateur(o, f, s), date, sig: s.formateurSignatureUrl || f.formateurSignatureUrl });

const valides = (stagiaires: StagiaireInfo[]) => stagiaires.filter((s) => (s.nom || "").trim());
const cand = (stagiaires: StagiaireInfo[], si: number) => stagiaires[si] || stagiaires[0] || ({ civilite: "", nom: "", prenom: "", email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "" } as StagiaireInfo);

function blocsTable(c: CertifVAE): string {
  return `<table><thead><tr><th>Code</th><th>Bloc de compétences</th><th>Nature</th></tr></thead><tbody>${c.blocs.map((b) => `<tr><td>${esc(b.code)}</td><td>${esc(b.titre)}</td><td>${b.professionnel ? "Professionnel" : "Enseignement général"}</td></tr>`).join("")}</tbody></table>`;
}

function certifLigne(c: CertifVAE): string {
  return `<strong>${esc(c.intitule)}</strong>${c.code ? ` (${esc(c.code)})` : ""} — ${esc(c.niveau)} — Certificateur : ${esc(c.certificateur)}${c.echeance ? ` — enregistrement valable jusqu'au ${esc(c.echeance)}` : ""}`;
}

function alerteFiche(c: CertifVAE): string {
  if (c.actif === false) return `<p style="color:#b00020"><strong>Attention :</strong> la fiche ${esc(c.code)} n'est plus active${c.remplacePar ? ` ; elle est remplacée par ${esc(c.remplacePar)}` : ""}. Aucun nouveau parcours ne doit être engagé sur cette fiche.</p>`;
  return "";
}

const CADRE_LEGAL = `<p>La validation des acquis de l'expérience (articles L.6411-1 et suivants et R.6412-1 et suivants du Code du travail, dans leur rédaction issue de la loi n° 2022-1598 du 21 décembre 2022 et du décret n° 2023-1275 du 27 décembre 2023) permet à toute personne justifiant d'une activité en rapport direct avec une certification enregistrée au RNCP d'obtenir tout ou partie de cette certification. <strong>Aucune durée minimale d'expérience n'est exigée.</strong> Le parcours est engagé sur la plateforme France VAE (<strong>vae.gouv.fr</strong>) ; le candidat peut être accompagné dès son inscription. Les blocs de compétences validés sont <strong>acquis définitivement</strong>.</p>`;

// ───────────────────────────── CRITÈRE 1 ─────────────────────────────

export function genVAEPlaquetteInfo(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  return buildDocument({ org: o, title: "PLAQUETTE D'INFORMATION – ACCOMPAGNEMENT VAE", subtitle: c.intitule, sections: [
    { heading: "La VAE en bref", content: CADRE_LEGAL },
    { heading: "Certification visée", content: `<p>${certifLigne(c)}</p>${alerteFiche(c)}` },
    { heading: "Pour qui ?", content: `<p>Salariés, indépendants, demandeurs d'emploi, bénévoles, proches aidants, sportifs de haut niveau : toute personne dont l'expérience (professionnelle ou non) est en rapport direct avec la certification visée.</p><p><strong>Prérequis :</strong> ${esc(f.prerequis)}</p>` },
    { heading: "Les étapes avec " + esc(o.nom), content: `<ol><li><strong>Entretien de faisabilité</strong> (gratuit) : analyse du parcours au regard du référentiel.</li><li><strong>Dossier de faisabilité</strong> déposé par le candidat sur vae.gouv.fr ; la recevabilité est prononcée par le certificateur.</li><li><strong>Accompagnement individuel</strong> (${heuresVAE(f)} heures) : aide méthodologique à la rédaction du dossier de validation, bloc par bloc.</li><li><strong>Préparation à l'entretien avec le jury</strong> (mise en situation).</li><li><strong>Jury</strong> organisé par le certificateur : validation totale ou partielle (blocs acquis définitivement).</li></ol>` },
    { heading: "Informations pratiques", content: `<p><strong>Durée :</strong> ${esc(f.duree)}<br><strong>Modalités :</strong> ${esc(f.modalites)} — ${esc(lieuVAE(o, f))}<br><strong>Tarif :</strong> ${esc(f.tarif)}<br><strong>Financements :</strong> CPF, employeur / OPCO, France Travail, Région, financement personnel<br><strong>Délai d'accès :</strong> ${esc(f.delaiAcces)}<br><strong>Contact :</strong> ${esc(o.email)}${telOrg(o)}<br><strong>Référent VAE :</strong> ${esc(o.responsablePedagogique)}<br><strong>Référent handicap :</strong> ${esc(o.referentHandicap)}</p>`, variant: "green" },
    { heading: "Accessibilité", content: `<p>L'accompagnement est accessible aux personnes en situation de handicap : rythme, supports et modalités sont adaptés sur demande auprès du référent handicap (${esc(o.referentHandicap)}).</p>` },
  ] });
}

export function genVAEDiffusionInfo(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  return buildDocument({ org: o, title: "INFORMATION DU PUBLIC SUR L'ACCOMPAGNEMENT VAE", subtitle: `Fiche publiée — mise à jour du ${dateSysteme(o)}`, table: {
    headers: ["Item (indicateur 1)", "Information diffusée"],
    rows: [
      ["Prérequis", esc(f.prerequis)],
      ["Objectifs", esc(f.objectifs).replace(/\n/g, "<br>")],
      ["Durée", esc(f.duree)],
      ["Modalités et délais d'accès", `${esc(f.modalites)} — ${esc(f.delaiAcces)}`],
      ["Tarif", esc(f.tarif)],
      ["Contacts", `${esc(o.email)}${telOrg(o)} — référent VAE : ${esc(o.responsablePedagogique)}`],
      ["Méthodes mobilisées", esc(f.moyensPedagogiques)],
      ["Modalités d'évaluation", `${esc(f.methodesEvaluation)} La certification est délivrée par le jury du certificateur (${esc(c.certificateur)}).`],
      ["Accessibilité handicap", `Aménagements sur demande — référent handicap : ${esc(o.referentHandicap)}`],
      ["Certification", certifLigne(c)],
    ],
  }, sections: [
    { heading: "Supports de diffusion", content: `<p>${o.siteWeb ? `${isFacebookPage(o.siteWeb) ? "Page Facebook" : "Site internet"} : ${linkUrl(o.siteWeb)}<br>` : ""}Plaquette remise avant tout engagement ; fiche transmise par courriel à chaque demande ; présentation lors de l'entretien de faisabilité.</p>` },
  ] });
}

export function genVAEProcedureInfo(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'INFORMATION DU PUBLIC – VAE", sections: [
    { heading: "Objet", content: `<p>Garantir une information accessible, détaillée et vérifiable sur l'offre d'accompagnement VAE de ${esc(o.nom)} (indicateur 1).</p>` },
    { heading: "Canaux", content: `<p>${o.siteWeb ? `• ${isFacebookPage(o.siteWeb) ? "Page Facebook" : "Site internet"} : ${linkUrl(o.siteWeb)}<br>` : ""}• Plaquette et fiche d'information VAE<br>• Réponse écrite à chaque demande sous 48 heures ouvrées<br>• Relais : conseillers en évolution professionnelle, France Travail, OPCO, plateforme vae.gouv.fr</p>` },
    { heading: "Contenu obligatoire", content: `<p>Prérequis (expérience en rapport direct avec la certification, sans durée minimale), objectifs, durée, modalités et délais d'accès, tarif, contacts, méthodes, modalités d'évaluation (jury du certificateur), accessibilité, certification visée (intitulé, code RNCP, certificateur, date d'échéance de l'enregistrement).</p>`, variant: "green" },
    { heading: "Mise à jour", content: `<p>Revue au moins annuelle et à chaque évolution réglementaire ou de la fiche RNCP. Dernière mise à jour : ${dateSysteme(o)}.</p>` },
  ] });
}

interface Resultats { inscrits: number; acheves: number; enCours: number; satisfaction: string; nbAvis: number }
function resultatsVAE(f: FormationInfo, stagiaires: StagiaireInfo[]): Resultats {
  const v = valides(stagiaires);
  const acheves = v.filter((s) => estPasse(parseDateVAE(s.dateFinFormation || f.dateFin)));
  const notes = acheves.map((s) => satisfactionNotes(s, f)).flat();
  const moy = notes.length ? (notes.reduce((a, b) => a + b, 0) / notes.length) : 0;
  return { inscrits: v.length, acheves: acheves.length, enCours: v.length - acheves.length, satisfaction: notes.length ? `${moy.toFixed(1).replace(".", ",")}/5` : "—", nbAvis: acheves.length };
}

export function genVAEIndicateursResultats(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const r = resultatsVAE(f, stagiaires);
  const saisis = (f.tauxSatisfaction || "").trim();
  return buildDocument({ org: o, title: "INDICATEURS DE RÉSULTATS – ACCOMPAGNEMENT VAE", subtitle: `Arrêtés au ${frVAE(aujourdhui())}`, table: {
    headers: ["Indicateur", "Valeur", "Source / mode de calcul"],
    rows: [
      ["Candidats accompagnés (contrats signés)", String(r.inscrits), "Contrats et conventions d'accompagnement"],
      ["Accompagnements achevés", String(r.acheves), "Date de dernière séance ≤ date du jour"],
      ["Accompagnements en cours", String(r.enCours), "Calendrier des séances"],
      ["Satisfaction des candidats (fin d'accompagnement)", saisis ? `${esc(saisis)}${f.nombreAvisSatisfaction ? ` (${esc(f.nombreAvisSatisfaction)} avis)` : ""}` : r.nbAvis ? `${r.satisfaction} (${r.nbAvis} avis)` : "Aucun accompagnement achevé", "Questionnaires de fin d'accompagnement"],
      ["Taux de validation totale / partielle", f.nbPresentesCertification ? `${esc(f.nbAdmisCertification || "0")} / ${esc(f.nbPresentesCertification)} présentés` : "Aucun résultat de jury communiqué à ce jour", "Décisions notifiées par le certificateur"],
    ],
  }, sections: [
    { heading: "Diffusion", content: `<p>Ces indicateurs sont publiés sur les supports d'information et mis à jour à chaque fin d'accompagnement et à chaque décision de jury communiquée par un candidat. ${r.acheves === 0 ? `<strong>${esc(o.nom)} est nouvel entrant sur la VAE :</strong> aucun accompagnement n'est encore achevé ; les indicateurs seront publiés dès les premiers résultats, sans extrapolation.` : ""}</p>`, variant: "green" },
  ] });
}

export function genVAEPresentationNouvelEntrant(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const c = certifVAE(f);
  const r = resultatsVAE(f, stagiaires);
  return buildDocument({ org: o, title: "PRÉSENTATION DE L'ACTIVITÉ VAE", subtitle: c.intitule, sections: [
    { heading: "Activité", content: `<p><strong>Action :</strong> accompagnement à la validation des acquis de l'expérience (article L.6313-1, 3° du Code du travail).<br><strong>Certification :</strong> ${certifLigne(c)}</p>${alerteFiche(c)}` },
    { heading: "Situation au " + frVAE(aujourdhui()), content: `<p>${r.inscrits} candidat(s) engagé(s), ${r.acheves} accompagnement(s) achevé(s), ${r.enCours} en cours. ${r.acheves === 0 ? "Aucun résultat historique n'est communiqué : l'organisme est nouvel entrant sur ce périmètre." : ""}</p>` },
    { heading: "Organisation de l'accompagnement", content: `<p>${heuresVAE(f)} heures en séances individuelles de 2 heures (${esc(f.modalites)}, ${esc(lieuVAE(o, f))}), réparties entre le ${formatDate(f.dateDebut)} et le ${formatDate(f.dateFin)} : lancement, description des activités bloc par bloc, portefeuille de preuves, préparation à l'entretien avec le jury.</p>` },
    { heading: "Blocs de compétences du référentiel", content: blocsTable(c) },
    { heading: "Dispositif de suivi", content: `<p>Nombre de candidats, abandons, satisfaction, candidats présentés au jury, validations totales et partielles : suivis dans le tableau des indicateurs (Excel) et publiés dès qu'ils sont disponibles.</p>`, variant: "green" },
  ] });
}

export function genVAETauxCertification(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  const presentes = (f.nbPresentesCertification || "").trim();
  return buildDocument({ org: o, title: "TAUX D'OBTENTION DE LA CERTIFICATION – VAE", subtitle: c.intitule, table: {
    headers: ["Certification", "Code", "Certificateur", "Candidats présentés", "Validations (totales ou partielles)", "Taux"],
    rows: [[esc(c.intitule), esc(c.code), esc(c.certificateur), presentes || "0", presentes ? esc(f.nbAdmisCertification || "0") : "—",
      presentes && +presentes > 0 ? `${Math.round((+(f.nbAdmisCertification || 0) / +presentes) * 100)} %` : "Aucun candidat présenté à ce jour"]],
  }, sections: [
    { heading: "Validation par blocs", content: `<p>La certification est composée des blocs ci-dessous. Chaque bloc validé par le jury est <strong>acquis définitivement</strong> ; en cas de validation partielle, le candidat peut compléter les blocs manquants par une nouvelle démarche VAE ou par la formation.</p>${blocsTable(c)}` },
    { heading: "Équivalences, passerelles, suites de parcours", content: `<p>La certification obtenue par VAE a la même valeur que par la formation. Les équivalences et passerelles sont celles indiquées sur la fiche France Compétences ${c.code ? `(https://www.francecompetences.fr/recherche/rncp/${c.code.replace(/^RNCP/i, "")}/)` : ""}. Métiers visés : ${c.metiers.length ? esc(c.metiers.join(", ")) : "voir la fiche France Compétences"}.</p>` },
  ] });
}

export function genVAEInfoCertification(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  const fiche = c.code ? getRNCPByCode(c.code) : undefined;
  return buildDocument({ org: o, title: "INFORMATION SUR LA CERTIFICATION VISÉE", subtitle: c.intitule, sections: [
    { heading: "Identification", content: `<p>${certifLigne(c)}</p>${alerteFiche(c)}${fiche?.resume ? `<p>${esc(fiche.resume)}</p>` : ""}` },
    { heading: "Blocs de compétences", content: blocsTable(c) },
    { heading: "Rôle de chacun", content: `<p><strong>Le certificateur</strong> (${esc(c.certificateur)}) se prononce sur la recevabilité, organise le jury et délivre la certification. <strong>${esc(o.nom)}</strong> accompagne le candidat : il ne décide ni de la recevabilité ni de la validation.</p>`, variant: "green" },
  ] });
}

// ───────────────────────────── CRITÈRE 2 ─────────────────────────────

export function genVAEProcessAnalyseBesoin(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCESSUS D'ANALYSE DU BESOIN – VAE", sections: [
    { heading: "Étapes", content: `<ol><li><strong>Premier contact</strong> : envoi de la plaquette et de la fiche d'information, proposition d'un entretien de faisabilité gratuit.</li><li><strong>Entretien de faisabilité</strong> (1 heure) : parcours, activités exercées, projet, contraintes, besoins d'adaptation (dont handicap), financement.</li><li><strong>Analyse au regard du référentiel</strong> : chaque bloc professionnel est rapproché des activités décrites ; l'avis est argumenté (favorable, favorable avec vigilance, réorientation).</li><li><strong>Restitution écrite</strong> au candidat (compte rendu d'entretien de faisabilité) et aide au dépôt du dossier de faisabilité sur vae.gouv.fr.</li><li><strong>Contractualisation</strong> : contrat (financement personnel ou CPF) ou convention tripartite (employeur / OPCO).</li></ol>` },
    { heading: "Prise en compte de l'employeur ou du financeur", content: `<p>Lorsque l'employeur finance, ses attentes sont recueillies dans la convention ; le candidat reste seul auteur de son dossier de validation.</p>`, variant: "green" },
  ] });
}

export function genVAEEntretienFaisabiliteTrame(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  return buildDocument({ org: o, title: "TRAME D'ENTRETIEN DE FAISABILITÉ – VAE", subtitle: c.intitule, sections: [
    { heading: "Candidat", content: `<p>Nom / prénom : ________________ — Téléphone : ________________ — Courriel : ________________<br>Situation : ☐ Salarié ☐ Demandeur d'emploi ☐ Indépendant ☐ Bénévole / proche aidant ☐ Autre<br>Financement envisagé : ☐ CPF ☐ Employeur / OPCO ☐ France Travail ☐ Personnel ☐ Autre</p>` },
    { heading: "Activités au regard du référentiel", content: `<table><thead><tr><th>Bloc</th><th>Activités exercées (où, quand, fréquence)</th><th>Preuves disponibles</th><th>Couverture</th></tr></thead><tbody>${c.blocs.filter((b) => b.professionnel).map((b) => `<tr><td>${esc(b.titre)}</td><td></td><td></td><td>☐ complète ☐ partielle ☐ insuffisante</td></tr>`).join("")}</tbody></table>` },
    { heading: "Projet, contraintes, adaptations", content: `<p>Motivation : ________________<br>Projet après la certification : ________________<br>Disponibilités : ________________<br>Besoin d'adaptation (handicap, rythme, supports) : ☐ non ☐ oui : ________________</p>` },
    { heading: "Avis", content: `<p>☐ Favorable ☐ Favorable avec vigilance ☐ Réorientation (autre certification / formation)<br>Argumentaire : ________________</p>`, variant: "green" },
  ] });
}

/** Compte rendu d'entretien de faisabilité (diagnostic) — rempli à partir du profil du candidat. */
export function genVAEDiagnosticFaisabilite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const d = frVAE(ch.entretienFaisabilite);
  return buildDocument({ org: o, title: "COMPTE RENDU D'ENTRETIEN DE FAISABILITÉ – VAE", subtitle: `${esc(p.nomComplet)} — ${esc(c.intitule)}`, sections: [
    { heading: "Candidat", content: `<p><strong>${esc(p.civ)} ${esc(p.nomComplet)}</strong><br>Situation : ${esc(p.situation)}<br>Emploi exercé : ${esc(p.poste)}${p.structure !== "—" ? ` — ${esc(p.structure)}` : ""}<br>Dernier diplôme déclaré : ${esc(p.diplome)}<br>Certification visée : ${certifLigne(c)}<br>Date de l'entretien : ${d} — mené par ${esc(accompagnateur(o, f, s))}</p>${alerteFiche(c)}` },
    { heading: "Expérience en rapport direct avec la certification", content: `<p>Expérience déclarée en rapport avec la certification : environ ${p.anneesLien} ans (expérience professionnelle totale : ${p.anneesTotal} ans). La loi n'impose aucune durée minimale : l'analyse porte sur la nature des activités.</p>` },
    { heading: "Rapprochement avec le référentiel", content: `<table><thead><tr><th>Bloc</th><th>Activités décrites par le candidat</th><th>Couverture estimée</th></tr></thead><tbody>${p.couverture.map((x) => `<tr><td>${esc(x.bloc.titre)}</td><td>${x.activites.map((a) => "• " + esc(a)).join("<br>")}</td><td>${x.niveau}</td></tr>`).join("")}</tbody></table>${c.blocs.some((b) => !b.professionnel) ? `<p><em>Blocs d'enseignement général : des dispenses peuvent s'appliquer selon les diplômes déjà détenus ; à vérifier auprès du certificateur lors du dépôt du dossier de faisabilité.</em></p>` : ""}`, variant: "green" },
    { heading: "Projet et besoins", content: `<p><strong>Motivation :</strong> ${esc(p.motivation)}.<br><strong>Projet :</strong> ${esc(p.projet)}.<br><strong>Disponibilités :</strong> ${esc(p.disponibilites)}.<br><strong>Adaptation liée à un handicap :</strong> ${p.rqth ? "oui — orientation vers le référent handicap (" + esc(o.referentHandicap) + ") pour définir les aménagements" : "non signalée"}.<br><strong>Financement envisagé :</strong> ${esc(p.financeur)}.</p>` },
    { heading: "Avis de faisabilité", content: `<p><strong>${esc(p.avis)}</strong></p><p>Suite : dépôt par le candidat du dossier de faisabilité sur vae.gouv.fr (préparé le ${frVAE(ch.depotFaisabilite)}), puis accompagnement de ${heuresVAE(f)} heures dès la signature du contrat. La recevabilité relève du seul certificateur.</p>` },
  ], extraHtml: signatures([sigAccompagnateur(o, f, s, d), sigCandidat(s, d)]) });
}

/** Fiche de préparation du dossier de faisabilité (remplace l'ancien « Livret 1 – recevabilité »). */
export function genVAEDossierFaisabilite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const naissance = parseDateVAE(s.dateNaissance);
  const structure = p.structure !== "—" ? p.structure : "ma structure";
  const debutExp = new Date((parseDateVAE(f.dateDebut) || aujourdhui()).getFullYear() - p.anneesLien, 0, 1).getFullYear();
  return buildDocument({ org: o, title: "LIVRET 1 – DOSSIER DE FAISABILITÉ VAE", subtitle: `${esc(p.nomComplet)} — dépôt sur vae.gouv.fr`, sections: [
    { heading: "1. Identité du candidat", content: `<p>${esc(p.civ)} ${esc(p.nomComplet)}${naissance ? ` — né${s.civilite === "Mme" ? "e" : ""} le ${frVAE(naissance)}` : ""}<br>Courriel : ${esc(s.email)}${s.telephone?.trim() ? ` — Téléphone : ${esc(s.telephone)}` : ""}${s.adresse ? `<br>Adresse : ${esc(s.adresse)} ${esc(s.codePostal || "")} ${esc(s.commune || "")}` : ""}<br>Situation : ${esc(p.situation)}<br>Dernier diplôme : ${esc(p.diplome)}</p>` },
    { heading: "2. Certification visée", content: `<p>${certifLigne(c)}</p>${alerteFiche(c)}` },
    { heading: "3. Expérience en rapport avec la certification", content: `<table><thead><tr><th>Période</th><th>Emploi</th><th>Structure</th><th>Statut</th></tr></thead><tbody><tr><td>${debutExp} – aujourd'hui</td><td>${esc(p.poste)}</td><td>${esc(structure)}</td><td>${esc(p.situation.split(" — ")[0])}</td></tr></tbody></table><p>Environ ${p.anneesLien} ans d'expérience en rapport direct avec la certification (${p.anneesTotal} ans d'expérience totale).</p>` },
    { heading: "4. Activités exercées en rapport avec chaque bloc", content: `<table><thead><tr><th>Bloc visé</th><th>Activités que j'exerce</th><th>Couverture</th></tr></thead><tbody>${p.couverture.map((x) => `<tr><td>${esc(x.bloc.titre)}</td><td>${x.activites.map((a) => "• " + esc(a)).join("<br>")}</td><td>${x.niveau}</td></tr>`).join("")}</tbody></table>` },
    { heading: "5. Motivation et projet", content: `<p><strong>Pourquoi je demande cette certification :</strong> ${esc(p.motivation)}.<br><strong>Mon projet professionnel :</strong> ${esc(p.projet)}.<br><strong>Financement :</strong> ${esc(p.financeur)}.</p>` },
    { heading: "6. Pièces jointes", content: `<p>☒ Pièce d'identité ☒ Justificatifs d'activité (bulletins de salaire, attestations d'employeur) ☒ Diplômes et attestations de formation ☒ CV détaillé</p>` },
    { heading: "7. Attestation sur l'honneur et dépôt", content: `<p>Je soussigné${s.civilite === "Mme" ? "e" : ""} ${esc(p.nomComplet)} certifie l'exactitude des informations du présent dossier et n'avoir déposé qu'une demande pour cette certification cette année.</p><p>Dossier déposé sur vae.gouv.fr le ${frVAE(ch.depotFaisabilite)}. La décision de recevabilité relève du certificateur (${esc(c.certificateur)}).</p>`, variant: "green" },
  ], extraHtml: signatures([sigCandidat(s, frVAE(ch.depotFaisabilite)), sigAccompagnateur(o, f, s, frVAE(ch.depotFaisabilite))]) });
}

/** Analyse du besoin — remplie à partir des données du candidat. */
export function genVAEAnalyseBesoin(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const d = frVAE(ch.entretienFaisabilite);
  const box = (b: boolean) => (b ? "☒" : "☐");
  return buildDocument({ org: o, title: "ANALYSE DU BESOIN DU CANDIDAT – VAE", subtitle: esc(p.nomComplet), sections: [
    { heading: "Situation", content: `<p>${esc(p.situation)} — Emploi : ${esc(p.poste)} — Diplôme déclaré : ${esc(p.diplome)}</p>` },
    { heading: "Attentes", content: `<p><strong>Objectif :</strong> ${esc(p.motivation)}.<br><strong>Projet :</strong> ${esc(p.projet)}.<br><strong>Points d'appui :</strong> ${p.couverture.filter((x) => x.niveau === "Complète").map((x) => esc(x.bloc.titre)).join(" ; ") || "à préciser"}.<br><strong>Points de vigilance :</strong> ${p.blocsVigilance.length ? p.blocsVigilance.map(esc).join(" ; ") : "aucun bloc identifié comme fragile"}.</p>` },
    { heading: "Financement", content: `<p>${box(p.financeur === "CPF")} CPF ${box(p.financeur === "Employeur / OPCO")} Employeur / OPCO ${box(p.financeur === "France Travail")} France Travail ${box(p.financeur === "Personnel")} Personnel ${box(p.financeur === "Région / autre")} Autre</p>${p.contratAvecEmployeur ? `<p>Attentes de l'employeur (${esc(s.entreprise)}) : reconnaissance des compétences exercées dans le poste de ${esc(p.poste)} ; elles sont reprises dans la convention tripartite.</p>` : ""}` },
    { heading: "Handicap et adaptations", content: `<p>${box(!p.rqth)} Aucun besoin signalé ${box(p.rqth)} Besoin d'aménagement : entretien avec le référent handicap (${esc(o.referentHandicap)}) avant la première séance.</p>` },
    { heading: "Organisation retenue", content: `<p>${heuresVAE(f)} heures en séances individuelles de 2 heures, ${esc(f.modalites)} (${esc(lieuVAE(o, f))}), du ${frVAE(ch.debut)} au ${frVAE(ch.fin)} ; disponibilités : ${esc(p.disponibilites.toLowerCase())}.</p>`, variant: "green" },
  ], extraHtml: signatures([sigCandidat(s, d), sigAccompagnateur(o, f, s, d)]) });
}

/** Une seule pièce contractuelle complète, choisie selon la présence d'une entreprise. */
export function genVAEContrat(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const d = frLongVAE(ch.contrat || aujourdhui());
  const tarif = getStagiaireTarif(s, f);
  // Règle : entreprise renseignée → convention tripartite ; sans entreprise → contrat (le financeur ne décide pas).
  const tripartite = !!s.entreprise?.trim();
  const titre = tripartite ? "CONVENTION D'ACCOMPAGNEMENT VAE (TRIPARTITE)" : "CONTRAT D'ACCOMPAGNEMENT VAE";
  const adresseCandidat = [s.adresse, s.codePostal, s.commune].filter(x => x?.trim()).join(" ");
  const parties = `<p><strong>L'organisme accompagnateur :</strong> ${esc(o.nom)}, SIRET ${esc(o.siret)}, ${esc(o.adresse)}, ${esc(o.codePostal)} ${esc(o.ville)}${o.nda ? `, déclaration d'activité n° ${esc(o.nda)} (cet enregistrement ne vaut pas agrément de l'État)` : ""}, représenté par ${esc(o.dirigeant)}${o.email ? ` ; courriel : ${esc(o.email)}` : ""}.</p><p><strong>Le bénéficiaire :</strong> ${esc(p.civ)} ${esc(p.nomComplet)}${adresseCandidat ? `, domicilié à ${esc(adresseCandidat)}` : ""}${s.email ? ` ; courriel : ${esc(s.email)}` : ""}.</p>${tripartite ? `<p><strong>L'entreprise :</strong> ${esc(s.entreprise)}${s.siretEntreprise ? `, SIRET ${esc(s.siretEntreprise)}` : ""}${s.adresseEntreprise ? `, ${esc(s.adresseEntreprise)}` : ""}${s.responsableEntreprise ? `, représentée par ${esc(s.responsableEntreprise)}` : ""}${s.emailResponsable ? ` ; courriel : ${esc(s.emailResponsable)}` : ""}.</p>` : ""}`;
  const cpf = p.financeur === "CPF";
  const personnel = !tripartite && p.financeur === "Personnel";
  const financement = cpf
    ? `<p>Financement CPF : commande sur Mon Compte Formation. Les montants pris en charge, la participation obligatoire éventuelle, le reste à payer et les règlements sont ceux confirmés sur la plateforme. Les conditions générales de la plateforme régissent la commande, le paiement, l'annulation et les remboursements. Aucun double paiement des mêmes prestations ne peut être demandé.${tripartite ? " La présence de l'entreprise ne vaut pas engagement de paiement supplémentaire : tout complément employeur doit être accepté par écrit." : ""}</p>`
    : tripartite
      ? `<p>L'entreprise s'engage à régler le prix convenu, sous réserve des prises en charge effectivement accordées par son OPCO ou un autre financeur. Une subrogation de paiement nécessite un accord écrit. En l'absence de prise en charge, ou pour la part non couverte, l'entreprise reste redevable ; aucune somme n'est reportée automatiquement sur le bénéficiaire. Facturation au fur et à mesure des prestations réalisées, sur présentation des justificatifs de réalisation.</p>`
      : personnel
        ? `<p>Financement personnel. Aucune somme ne peut être exigée avant l'expiration du délai de rétractation. Après ce délai, un acompte éventuel ne peut dépasser 30 % du prix ; le solde est échelonné au fur et à mesure du déroulement de l'accompagnement (article L.6353-6 du Code du travail). Aucun paiement intégral anticipé n'est exigé.</p>`
        : `<p>Financement déclaré : ${esc(p.financeur)}. La prise en charge et les modalités de règlement sont subordonnées à l'accord écrit du financeur. Aucun reste à charge n'est présumé : une part de financement personnel doit être expressément acceptée par le bénéficiaire et respecte les articles L.6353-5 et L.6353-6 du Code du travail.</p>`;
  const retrait = tripartite
    ? `<p>La convention lie l'organisme, l'entreprise et le bénéficiaire. Toute annulation ou modification est notifiée par écrit aux autres parties ; le financement CPF éventuel reste soumis aux conditions de Mon Compte Formation. Aucun délai légal de rétractation propre au contrat de financement personnel n'est présenté comme applicable à l'entreprise.</p>`
    : `<p>Lorsque le bénéficiaire entreprend l'accompagnement à titre individuel et à ses frais, il dispose d'un <strong>délai de rétractation de 10 jours</strong> à compter de la signature (article L.6353-5 du Code du travail), exercé par lettre recommandée avec avis de réception à l'adresse de l'organisme indiquée à l'article 1. Aucun paiement n'est exigible pendant ce délai.${cpf ? " Pour la commande CPF, les conditions et délais de rétractation de Mon Compte Formation s'appliquent ; le délai de 11 jours ouvrés avant l'entrée en accompagnement est un délai de commande, non un délai de rétractation." : ""} Les droits applicables aux contrats à distance ou hors établissement demeurent réservés lorsqu'ils sont réunis.</p>`;
  const paragraphes = (text: string) => `<p>${esc(text).replace(/\n/g, "<br>")}</p>`;
  return buildDocument({ org: o, title: titre, subtitle: esc(p.nomComplet), sections: [
    { heading: "Article 1 – Parties et cadre juridique", content: `${parties}<p>Action de validation des acquis de l'expérience au sens de l'article L.6313-1, 3°, du Code du travail, des articles L.6411-1 et suivants et R.6412-1 et suivants.${tripartite ? " La présente convention fixe les engagements des trois parties." : " Le présent contrat est conclu avant l'inscription définitive et tout règlement ; les articles L.6353-3 à L.6353-7 s'appliquent lorsque l'accompagnement est entrepris à titre individuel et aux frais du bénéficiaire."}</p>` },
    { heading: "Article 2 – Objet et certification visée", content: `<p>Accompagnement méthodologique du bénéficiaire dans la préparation de son dossier de validation et de son entretien avec le jury, en vue de la certification ${certifLigne(c)}. La recevabilité, l'organisation du jury et la décision de validation relèvent exclusivement du certificateur. L'organisme ne garantit ni recevabilité ni obtention de la certification ; une validation totale ou partielle est possible.</p>` },
    { heading: "Article 3 – Objectifs et conditions d'accès", content: `${f.objectifs.trim() ? paragraphes(f.objectifs) : "<p>Identifier les acquis de l'expérience, les rapprocher du référentiel, constituer le dossier de validation et préparer leur présentation au jury.</p>"}${f.prerequis.trim() ? `<p><strong>Prérequis :</strong> ${esc(f.prerequis)}</p>` : ""}<p>L'expérience présentée doit être en rapport direct avec la certification. Aucune durée minimale d'expérience n'est exigée ; les conditions propres à la certification sont vérifiées avec le certificateur.</p>` },
    { heading: "Article 4 – Durée, période et organisation", content: `<p><strong>Durée :</strong> ${esc(f.duree)}${ch.debut ? `<br><strong>Début :</strong> ${frLongVAE(ch.debut)}` : ""}${ch.fin ? `<br><strong>Fin :</strong> ${frLongVAE(ch.fin)}` : ""}${f.modalites.trim() ? `<br><strong>Modalités :</strong> ${esc(f.modalites)}` : ""}${f.lieu.trim() ? `<br><strong>Lieu ou accès à distance :</strong> ${esc(f.lieu)}` : ""}.</p><p>Le calendrier individualisé précise les dates, horaires et durées des séances ainsi que les travaux personnels. Le temps de rédaction personnelle n'est pas assimilé automatiquement à des heures d'accompagnement facturées. Toute modification de durée, de période ou de prix nécessite un avenant accepté par les parties.</p>` },
    { heading: "Article 5 – Programme et étapes", content: `${f.programme.trim() ? paragraphes(f.programme) : "<p>Analyse du parcours et du référentiel ; choix des activités et preuves ; aide méthodologique à la rédaction du dossier ; préparation à l'entretien avec le jury ; bilan de l'accompagnement.</p>"}<p>Le programme détaillé et le calendrier individualisé font partie des documents contractuels. Les éventuels actes relevant du certificateur restent distincts de la prestation d'accompagnement.</p>` },
    { heading: "Article 6 – Moyens pédagogiques et encadrement", content: `${f.moyensPedagogiques.trim() ? paragraphes(f.moyensPedagogiques) : ""}${accompagnateur(o, f, s) ? `<p><strong>Accompagnateur désigné :</strong> ${esc(accompagnateur(o, f, s))}.</p>` : ""}<p>L'organisme met à disposition les ressources prévues au programme et assure l'assistance méthodologique. Les titres, qualités et références de l'intervenant sont communiqués au bénéficiaire avant son engagement. À distance, les conditions d'accès et l'assistance technique sont communiquées avant la première séance.</p>` },
    { heading: "Article 7 – Suivi, évaluation et documents remis", content: `${f.methodesEvaluation.trim() ? paragraphes(f.methodesEvaluation) : ""}<p>Le suivi porte sur la progression du dossier et la préparation au jury, et non sur une décision de certification. Les séances réalisées sont tracées par des émargements ou justificatifs d'accompagnement. Un bilan et un certificat de réalisation indiquant les prestations effectivement réalisées sont remis à l'issue de l'accompagnement. Les justificatifs ne sont pas établis par anticipation.</p>` },
    { heading: "Article 8 – Engagements de l'organisme", content: `<p>Assurer un accompagnement individualisé conforme au programme, désigner un interlocuteur, respecter le calendrier convenu, informer rapidement de toute difficulté, garantir la confidentialité et proposer les adaptations nécessaires. L'organisme fournit une aide méthodologique sans se substituer au bénéficiaire dans la rédaction de son expérience.</p>` },
    { heading: `Article 9 – Engagements du bénéficiaire${tripartite ? " et de l'entreprise" : ""}`, content: `<p>Le bénéficiaire participe aux séances, réalise les travaux convenus, fournit des informations et preuves authentiques, respecte le règlement intérieur et signale les absences ou difficultés. Il demeure l'auteur de son dossier et responsable des informations déclarées au certificateur.</p>${tripartite ? "<p>L'entreprise facilite la participation selon les autorisations convenues, désigne son interlocuteur, transmet les éléments de financement et respecte ses engagements de paiement. Les autorisations d'absence et le congé VAE relèvent des dispositions applicables ; le temps consacré à la VAE n'est pas présumé autorisé par la seule signature de cette convention.</p>" : ""}` },
    { heading: "Article 10 – Prix et périmètre financier", content: `<p><strong>Prix de l'accompagnement :</strong> ${esc(tarif)}.</p><p>Ce prix couvre les prestations prévues au programme contractuel. Les frais de certification, de jury, de déplacement ou autres frais ne sont pas réputés inclus s'ils ne sont pas expressément mentionnés dans les documents remis. Aucun supplément n'est facturé sans accord préalable écrit. La mention de TVA ou d'exonération est celle du tarif convenu.</p>`, variant: "green" },
    { heading: "Article 11 – Financement et modalités de paiement", content: financement },
    { heading: "Article 12 – Rétractation et annulation avant démarrage", content: retrait },
    { heading: "Article 13 – Absences, report, interruption et force majeure", content: `<p>Toute absence ou demande de report est signalée dès que possible ; un nouveau créneau est convenu par écrit selon les disponibilités et la période contractuelle. En cas d'interruption, un relevé des prestations effectivement réalisées est établi ; aucune séance non réalisée n'est attestée comme réalisée. Hors dispositions spécifiques du financeur ou de Mon Compte Formation, seules les prestations réalisées sont facturées, et les sommes perçues en trop sont régularisées. En cas de force majeure dûment reconnue empêchant le bénéficiaire de poursuivre, seules les prestations effectivement dispensées sont dues proportionnellement à leur valeur contractuelle (article L.6353-7 lorsqu'il s'applique). Si l'organisme interrompt la prestation, les parties recherchent un report ou une résiliation avec régularisation des prestations non réalisées.</p>` },
    { heading: "Article 14 – Accessibilité et confidentialité", content: `<p>Les adaptations d'accueil, de rythme et de supports sont examinées individuellement${o.referentHandicap.trim() ? ` avec le référent handicap ${esc(o.referentHandicap)}` : ""}. Les aménagements des épreuves sont soumis à l'accord du certificateur.</p><p>Les données sont utilisées pour l'organisation, le suivi et la justification de l'accompagnement, dans le respect du RGPD. Leur communication aux financeurs et au certificateur est limitée aux informations nécessaires et aux obligations applicables. Le dossier et les preuves professionnelles restent confidentiels ; leur diffusion à l'entreprise n'est pas automatique. Le bénéficiaire conserve ses droits sur son dossier et peut exercer ses droits relatifs aux données auprès de l'organisme${o.email ? ` à ${esc(o.email)}` : ""}.</p>` },
    { heading: "Article 15 – Réclamations et règlement des différends", content: `<p>Une réclamation peut être adressée par écrit à l'organisme${o.email ? ` : ${esc(o.email)}` : ""}, ou à son adresse figurant à l'article 1. Les parties recherchent une solution amiable. Le bénéficiaire agissant en qualité de consommateur peut recourir gratuitement au médiateur de la consommation désigné par l'organisme, dont les coordonnées doivent lui être communiquées dans les informations précontractuelles. À défaut de résolution amiable, les juridictions compétentes sont déterminées selon les règles de droit commun, sans imposer au bénéficiaire le tribunal du siège de l'organisme.</p>` },
    { heading: "Article 16 – Documents contractuels et acceptation", content: `<p>Le programme détaillé, le calendrier individualisé, les conditions générales, le règlement intérieur et les informations d'accès et de protection des données sont à remettre avant l'engagement. Les documents de prise en charge du financeur, lorsqu'ils existent, complètent le présent document sans modifier les droits impératifs du bénéficiaire. Toute modification substantielle fait l'objet d'un avenant écrit accepté par ${tripartite ? "les trois parties" : "les deux parties"}. Chaque partie reçoit un exemplaire signé. La date ci-dessous est la date de préparation du document ; les signatures ne sont apposées que par les parties concernées.</p><p><strong>Document établi le ${d}.</strong></p>` },
  ], extraHtml: signatures([sigCandidat(s, d), ...(tripartite ? [{ label: "L'employeur", nom: s.responsableEntreprise || s.entreprise, date: d, sig: s.signatureResponsableUrl }] : []), sigOrganisme(o, d)]) });
}

export function genVAEHandicapEntretien(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "ACCUEIL D'UN CANDIDAT EN SITUATION DE HANDICAP – ENTRETIEN", sections: [
    { heading: "Objet", content: `<p>Identifier, avec le candidat qui le souhaite, les besoins de compensation pour l'accompagnement VAE et pour les épreuves du jury (aménagements demandés au certificateur).</p>` },
    { heading: "Trame", content: `<p>Nature des besoins (sans obligation de préciser le handicap) : ________________<br>Aménagements souhaités : ☐ rythme / durée des séances ☐ supports adaptés (taille, audio, sous-titrage) ☐ outils numériques ☐ présence d'un tiers ☐ autre : ________________<br>Aménagements à demander au certificateur pour le jury : ________________<br>Partenaires à mobiliser : ☐ Agefiph ☐ Cap emploi ☐ MDPH ☐ Ressource handicap formation</p>` },
    { heading: "Confidentialité", content: `<p>Les informations sont confidentielles et ne sont transmises qu'avec l'accord écrit du candidat. Référent handicap : ${esc(o.referentHandicap)}.</p>`, variant: "green" },
  ] });
}
export function genVAEHandicapFormalisation(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FORMALISATION DES AMÉNAGEMENTS – VAE", table: { headers: ["Besoin identifié", "Aménagement décidé", "Responsable", "Échéance", "Vérification"], rows: [["", "", esc(o.referentHandicap), "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] }, sections: [
    { heading: "Principe", content: `<p>Chaque aménagement décidé avec le candidat est inscrit ici, mis en œuvre avant la séance concernée et vérifié avec lui.</p>` },
  ] });
}
export function genVAEHandicapBilan(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "BILAN DES AMÉNAGEMENTS – VAE", sections: [
    { heading: "Bilan avec le candidat", content: `<p>Aménagements mis en œuvre : ________________<br>Efficacité perçue : ☐ satisfaisante ☐ à ajuster<br>Ajustements décidés : ________________<br>Aménagements obtenus pour le jury : ________________</p>` },
    { heading: "Exploitation", content: `<p>Le bilan alimente la veille handicap (indicateur 26) et le tableau d'amélioration continue (indicateur 32).</p>`, variant: "green" },
  ] });
}
export function genVAEMailHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "MODÈLE DE COURRIEL – BESOIN D'ADAPTATION", sections: [
    { heading: "Courriel type", content: `<p><strong>Objet :</strong> Votre accompagnement VAE – besoins d'adaptation</p><p>Bonjour,</p><p>Afin que votre accompagnement se déroule dans les meilleures conditions, vous pouvez nous signaler tout besoin d'adaptation (rythme, supports, outils, aménagements pour le jury). Notre référent handicap, ${esc(o.referentHandicap)}, vous propose un entretien confidentiel.</p><p>Bien cordialement,<br>${esc(o.nom)} — ${esc(o.email)}${telOrg(o)}</p>` },
  ] });
}

export function genVAEReferentielAccompagnement(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  return buildDocument({ org: o, title: "OBJECTIFS OPÉRATIONNELS DE L'ACCOMPAGNEMENT VAE", subtitle: c.intitule, sections: [
    { heading: "Objectifs opérationnels et évaluables", content: `<table><thead><tr><th>À l'issue de l'accompagnement, le candidat est capable de…</th><th>Évaluation</th></tr></thead><tbody>
      <tr><td>Relier ses activités aux blocs du référentiel ${esc(c.code)}</td><td>Tableau activités / blocs validé en séance 2</td></tr>
      <tr><td>Décrire précisément une situation de travail par compétence (contexte, actions, résultats)</td><td>Grille d'analyse du dossier de validation</td></tr>
      <tr><td>Réunir des preuves pertinentes et organisées</td><td>Portefeuille de preuves relu</td></tr>
      <tr><td>Présenter son parcours et répondre aux questions du jury</td><td>Mise en situation d'entretien avec grille d'observation</td></tr>
    </tbody></table>` },
    { heading: "Blocs concernés", content: blocsTable(c), variant: "green" },
  ] });
}

export function genVAEEngagementsRespectifs(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "ENGAGEMENTS RESPECTIFS – ACCOMPAGNEMENT VAE", sections: [
    { heading: "L'organisme s'engage à", content: `<ul><li>proposer un accompagnement individuel de ${heuresVAE(f)} heures, adapté au profil et au rythme du candidat ;</li><li>apporter une aide méthodologique sans jamais rédiger le dossier à la place du candidat ;</li><li>préparer le candidat à l'entretien avec le jury ;</li><li>respecter la confidentialité et le RGPD ;</li><li>traiter toute difficulté ou réclamation sous 15 jours ouvrés.</li></ul>` },
    { heading: "Le candidat s'engage à", content: `<ul><li>être présent aux séances ou prévenir 48 heures à l'avance ;</li><li>rédiger personnellement son dossier de validation et réunir ses preuves ;</li><li>respecter le calendrier convenu et les échéances du certificateur ;</li><li>signaler toute difficulté.</li></ul>`, variant: "green" },
  ] });
}

export function genVAEProgrammeAccompagnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const c = certifVAE(f);
  const s0 = valides(stagiaires)[0] || cand(stagiaires, 0);
  const cal = calendrierVAE(s0, f);
  return buildDocument({ org: o, title: "PROGRAMME D'ACCOMPAGNEMENT VAE", subtitle: `${esc(c.intitule)} — ${heuresVAE(f)} heures`, table: {
    headers: ["Séance", "Phase", "Contenu", "Durée"],
    rows: cal.map((x) => [String(x.num), x.phase, esc(x.theme), `${x.duree} h`]),
  }, sections: [
    { heading: "Modalités", content: `<p>Séances individuelles, ${esc(f.modalites)} (${esc(lieuVAE(o, f))}). Travail personnel du candidat entre les séances (rédaction, collecte de preuves), non compté dans les ${heuresVAE(f)} heures. Méthodes : entretien d'explicitation, analyse du référentiel, relecture commentée, mise en situation d'entretien.</p>`, variant: "green" },
  ] });
}

/** Livret 2 — dossier de validation entièrement rédigé (réponses du candidat par bloc). */
export function genVAETrameDossierValidation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const cal = calendrierVAE(s, f);
  const structure = p.structure !== "—" ? p.structure : "ma structure";
  const je = s.civilite === "Mme" ? "e" : "";
  const dDepot = ch.depotValidation && estPasse(ch.depotValidation) ? frVAE(ch.depotValidation) : "";
  const relect = [cal[Math.floor(cal.length / 3)], cal[Math.floor((2 * cal.length) / 3)], cal[cal.length - 1]];
  const blocs = p.couverture.map((x, i) => {
    const acts = x.activites;
    const a0 = acts[0] || x.bloc.titre;
    return {
      heading: `Bloc ${i + 1} — ${esc(x.bloc.code)} ${esc(x.bloc.titre)}`,
      content: `
<p><strong>Situation de travail présentée :</strong> ${esc(a0)} au sein de ${esc(structure)}, dans le cadre de mon poste de ${esc(p.poste)}.</p>
<p><strong>1. Contexte et finalité.</strong> J'exerce depuis environ ${p.anneesLien} ans des activités directement liées à ce bloc. Dans ${esc(structure)}, cette activité répond à un besoin concret : garantir la qualité du service rendu, respecter les délais et les exigences réglementaires du secteur, et contribuer aux objectifs fixés par ma hiérarchie. J'interviens en lien avec mes collègues, mon responsable et les interlocuteurs externes (clients, usagers, partenaires ou fournisseurs).</p>
<p><strong>2. Description de ce que j'ai fait.</strong> ${acts.map((a, k) => `${k === 0 ? "D'abord" : k === acts.length - 1 ? "Enfin" : "Ensuite"}, j'ai pris en charge l'activité suivante : ${esc(a.charAt(0).toLowerCase() + a.slice(1))}. J'ai analysé la demande, recueilli les informations nécessaires, planifié les étapes et réalisé les actions en contrôlant le résultat.`).join(" ")} Lorsqu'une difficulté est apparue (délai serré, information manquante, imprévu), j'ai réorganisé mes priorités, alerté les bonnes personnes et proposé une solution que j'ai mise en œuvre.</p>
<p><strong>3. Moyens et ressources mobilisés.</strong> Procédures internes, outils numériques métier et bureautiques (tableaux de suivi, messagerie, logiciels du service), documentation technique et réglementaire, échanges avec l'équipe et réunions de coordination.</p>
<p><strong>4. Résultats obtenus.</strong> Les actions ont été menées dans les délais, les objectifs ont été atteints et le travail a été validé par ma hiérarchie. Les retours des interlocuteurs ont été positifs et certaines de mes propositions ont été reprises dans l'organisation du service.</p>
<p><strong>5. Analyse de mes compétences.</strong> Cette situation montre que je suis capable${je ? "" : ""} de ${acts.map((a) => esc(a.charAt(0).toLowerCase() + a.slice(1))).join(", de ")}. Je sais adapter ma méthode au contexte, justifier mes choix et en tirer des enseignements : aujourd'hui, j'anticipe davantage les points de blocage et je formalise mieux le suivi de mes actions.</p>
<p><strong>Preuves jointes :</strong> attestation d'employeur (${esc(structure)}), fiche de poste, exemples de documents produits (anonymisés), tableaux de suivi, courriels de validation.</p>`,
    };
  });
  return buildDocument({ org: o, title: "LIVRET 2 – DOSSIER DE VALIDATION VAE", subtitle: `${esc(p.nomComplet)} — ${esc(c.intitule)}`, sections: [
    { heading: "Candidat et certification", content: `<p>${esc(p.civ)} ${esc(p.nomComplet)} — ${esc(p.situation)}<br>Emploi exercé : ${esc(p.poste)}${p.structure !== "—" ? ` — ${esc(p.structure)}` : ""}<br>Certification visée : ${certifLigne(c)}<br>Accompagnateur : ${esc(accompagnateur(o, f, s))}</p>` },
    { heading: "Mon parcours et ma motivation", content: `<p>Mon parcours professionnel représente environ ${p.anneesTotal} ans d'expérience, dont ${p.anneesLien} ans en rapport direct avec la certification. Mon dernier diplôme déclaré : ${esc(p.diplome)}.</p><p><strong>Motivation :</strong> ${esc(p.motivation)}.<br><strong>Projet :</strong> ${esc(p.projet)}.</p>` },
    ...blocs,
    { heading: "Relectures de l'accompagnateur", content: `<table><thead><tr><th>Version</th><th>Date</th><th>Observations</th></tr></thead><tbody>
<tr><td>V1</td><td>${relect[0] && relect[0].realisee ? frVAE(relect[0].date) : ""}</td><td>${relect[0]?.realisee ? "Structure conforme au référentiel ; situations à détailler (actions et résultats)." : ""}</td></tr>
<tr><td>V2</td><td>${relect[1] && relect[1].realisee ? frVAE(relect[1].date) : ""}</td><td>${relect[1]?.realisee ? "Descriptions précises et argumentées ; preuves complétées." : ""}</td></tr>
<tr><td>Version déposée</td><td>${dDepot}</td><td>${dDepot ? "Dossier finalisé et déposé auprès du certificateur." : ""}</td></tr>
</tbody></table>`, variant: "green" },
    { heading: "Attestation sur l'honneur", content: `<p>Je soussigné${je} ${esc(p.nomComplet)} atteste que les activités décrites dans ce dossier ont été exercées par moi-même et que les informations sont exactes.</p>` },
  ], extraHtml: signatures([sigCandidat(s, dDepot || undefined), sigAccompagnateur(o, f, s, dDepot || undefined)]) });
}

export function genVAESequencage(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "SÉQUENÇAGE DE L'ACCOMPAGNEMENT VAE", table: {
    headers: ["Phase", "Objectif", "Méthodes", "Livrable", "Part du volume"],
    rows: [
      ["Lancement", "S'approprier le référentiel et repérer ses activités", "Entretien d'explicitation, lecture guidée du référentiel", "Tableau activités / blocs", "≈ 15 %"],
      ["Dossier de validation", "Décrire les situations de travail bloc par bloc", "Questionnement, relecture commentée", "Dossier rédigé par le candidat", "≈ 60 %"],
      ["Portefeuille de preuves", "Organiser et vérifier les preuves", "Liste de contrôle", "Portefeuille", "≈ 10 %"],
      ["Préparation au jury", "Présenter son parcours et répondre aux questions", "Mise en situation, grille d'observation", "Grille de retour", "≈ 15 %"],
    ],
  }, sections: [
    { heading: "Individualisation", content: `<p>Toutes les séances sont individuelles (${heuresVAE(f)} heures au total) ; l'ordre des blocs et le rythme sont adaptés au profil du candidat et au calendrier du certificateur.</p>`, variant: "green" },
  ] });
}

/** Positionnement (début : IND 4 ; fin : IND 11) — par bloc, cohérent avec le profil. */
export function genVAEPositionnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number, moment: "debut" | "fin") {
  const s = cand(stagiaires, si);
  const p = profilVAE(s, f);
  const cal = calendrierVAE(s, f);
  const ref = moment === "debut" ? cal[0] : cal[cal.length - 1];
  const fait = !!ref && ref.realisee;
  const d = fait ? frVAE(ref.date) : "";
  const niveau = (x: { niveau: string }) => moment === "debut" ? (x.niveau === "Complète" ? "Activités identifiées, description à construire" : "Activités partielles, preuves à rechercher") : (x.niveau === "Complète" ? "Description complète et argumentée" : "Description complète, preuves complétées");
  return buildDocument({ org: o, title: moment === "debut" ? "POSITIONNEMENT EN DÉBUT D'ACCOMPAGNEMENT – VAE" : "POSITIONNEMENT EN FIN D'ACCOMPAGNEMENT – VAE", subtitle: esc(p.nomComplet), table: {
    headers: ["Bloc", "Niveau", "Observations"],
    rows: [
      ...p.couverture.map((x) => [esc(x.bloc.titre), fait ? niveau(x) : "", fait ? (x.niveau === "Partielle" ? "Point de vigilance travaillé en priorité" : "") : ""]),
      ["Rédaction (décrire une situation de travail)", fait ? (moment === "debut" ? "À développer" : "Acquis") : "", ""],
      ["Présentation orale devant un jury", fait ? (moment === "debut" ? "À développer" : "Préparé (mise en situation réalisée)") : "", ""],
    ],
  }, sections: [
    { heading: "Statut", content: fait ? `<p>Positionnement réalisé le ${d} lors de la séance ${ref.num}.</p>` : `<p>Positionnement prévu ${ref ? `le ${frVAE(ref.date)} (séance ${ref.num})` : "à la séance concernée"} : grille à compléter à cette date.</p>`, variant: "green" },
  ], extraHtml: signatures([sigCandidat(s, d || undefined), sigAccompagnateur(o, f, s, d || undefined)]) });
}

// ───────────────────────────── CRITÈRE 3 ─────────────────────────────

export function genVAELivretAccueil(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "LIVRET D'ACCUEIL – ACCOMPAGNEMENT VAE", sections: [
    { heading: "Bienvenue", content: `<p>Ce livret présente le déroulement de votre accompagnement VAE avec ${esc(o.nom)}.</p>` },
    { heading: "Vos interlocuteurs", content: `<p>Accompagnateur / référent VAE : ${esc(o.responsablePedagogique)}<br>Référent handicap : ${esc(o.referentHandicap)}<br>Administratif : ${esc(o.poleAdministratif)}<br>Contact : ${esc(o.email)}${telOrg(o)}</p>` },
    { heading: "Déroulement", content: `<p>${heuresVAE(f)} heures en séances individuelles de 2 heures, ${esc(f.modalites)} (${esc(lieuVAE(o, f))}). Étapes : lancement, dossier de validation bloc par bloc, portefeuille de preuves, préparation à l'entretien avec le jury. Le jury est organisé par le certificateur.</p>` },
    { heading: "Vos droits et engagements", content: `<p>Accompagnement personnalisé, confidentialité, adaptation possible, réclamation à ${esc(o.email)}. Vous restez seul auteur de votre dossier ; vous vous engagez à être présent et à prévenir de toute absence.</p>`, variant: "green" },
    { heading: "Informations utiles", content: `<p>Plateforme France VAE : vae.gouv.fr — congé VAE (salariés) : autorisation d'absence à demander à l'employeur — règlement intérieur et conditions générales remis avec le contrat.</p>` },
  ] });
}

export function genVAECGV(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "CONDITIONS GÉNÉRALES DE VENTE – ACCOMPAGNEMENT VAE", sections: [
    { heading: "1. Objet", content: `<p>Les présentes conditions s'appliquent aux prestations d'accompagnement VAE de ${esc(o.nom)} (SIRET ${esc(o.siret)}${o.nda ? `, NDA ${esc(o.nda)}` : ""}).</p>` },
    { heading: "2. Commande", content: `<p>CPF : commande sur Mon Compte Formation, conditions générales de la plateforme applicables (délai de 11 jours ouvrés avant l'entrée). Financement employeur / OPCO : convention tripartite. Financement personnel : contrat d'accompagnement.</p>` },
    { heading: "3. Rétractation (particuliers)", content: `<p>Délai de 10 jours à compter de la signature du contrat (article L.6353-5 du Code du travail), par lettre recommandée avec avis de réception. Aucun paiement n'est exigé avant la fin de ce délai ; acompte limité à 30 % du prix (article L.6353-6).</p>`, variant: "green" },
    { heading: "4. Prix et paiement", content: `<p>Prix indiqué au contrat, net de taxe ou TTC selon le régime de TVA de l'organisme. Abandon : seules les séances réalisées sont dues, sauf cas de force majeure dûment justifié.</p>` },
    { heading: "5. Report et annulation de séance", content: `<p>Toute séance annulée moins de 48 heures à l'avance sans motif légitime peut être considérée comme due.</p>` },
    { heading: "6. Données personnelles", content: `<p>Traitement limité à la gestion de l'accompagnement ; droits d'accès, de rectification et d'effacement auprès de ${esc(o.email)}.</p>` },
    { heading: "7. Réclamations et litiges", content: `<p>Réclamation écrite à ${esc(o.email)} (réponse sous 15 jours ouvrés). Le candidat consommateur peut recourir gratuitement à un médiateur de la consommation.</p>` },
  ] });
}

export function genVAEReglementInterieur(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "RÈGLEMENT INTÉRIEUR – ACCOMPAGNEMENT VAE", sections: [
    { heading: "Article 1 – Champ", content: `<p>Applicable à tout candidat accompagné par ${esc(o.nom)}, en présentiel comme à distance (articles L.6352-3 et R.6352-1 et suivants du Code du travail).</p>` },
    { heading: "Article 2 – Assiduité", content: `<p>Présence aux séances ; toute absence est signalée au moins 48 heures à l'avance. Les séances sont émargées par le candidat et l'accompagnateur.</p>` },
    { heading: "Article 3 – Comportement", content: `<p>Respect mutuel ; tout comportement violent, discriminatoire ou harcelant entraîne une procédure disciplinaire.</p>` },
    { heading: "Article 4 – Hygiène et sécurité", content: `<p>En présentiel, respect des consignes affichées dans les locaux ; à distance, le candidat veille à un environnement calme et confidentiel.</p>` },
    { heading: "Article 5 – Sanctions et procédure", content: `<p>Avertissement ou exclusion après entretien préalable, dans le respect des articles R.6352-4 à R.6352-8 du Code du travail.</p>` },
    { heading: "Article 6 – Confidentialité et propriété du dossier", content: `<p>Le dossier de validation reste la propriété du candidat ; il n'est jamais diffusé sans son accord écrit.</p>`, variant: "green" },
  ] });
}

export function genVAEDroitImage(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "AUTORISATION D'ENREGISTREMENT ET D'UTILISATION DE L'IMAGE", sections: [
    { heading: "Objet", content: `<p>Les mises en situation d'entretien avec le jury peuvent être enregistrées, avec l'accord du candidat, pour lui permettre de s'observer. L'enregistrement est remis au candidat et supprimé à la fin de l'accompagnement.</p>` },
    { heading: "Choix du candidat", content: `<p>☐ J'accepte l'enregistrement de mes mises en situation, pour mon usage personnel uniquement.<br>☐ Je refuse tout enregistrement.</p><p>Nom : ________________ Date : ____ / ____ / ________ Signature :</p>`, variant: "green" },
  ] });
}

export function genVAEInfosPeripheriques(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "INFORMATIONS PÉRIPHÉRIQUES À L'ACCOMPAGNEMENT", sections: [
    { heading: "À distance", content: `<p>Lien de connexion envoyé avant chaque séance ; test de connexion proposé avant la première ; assistance technique par courriel (${esc(o.email)}).</p>` },
    { heading: "En présentiel", content: `<p>${esc(o.adresse)}, ${esc(o.codePostal)} ${esc(o.ville)} — accès et accessibilité précisés sur demande ; aménagements possibles.</p>` },
    { heading: "Aides et droits", content: `<p>Congé VAE (salariés), aides de France Travail, de la Région ou de l'OPCO, abondement du CPF : informations délivrées lors de l'entretien de faisabilité.</p>`, variant: "green" },
  ] });
}

export function genVAECertificatRealisation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const cal = calendrierVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const termine = estPasse(ch.fin);
  const heures = cal.filter((x) => x.realisee).reduce((a, x) => a + x.duree, 0);
  if (!termine) {
    return buildDocument({ org: o, title: "CERTIFICAT DE RÉALISATION", subtitle: esc(`${s.prenom} ${s.nom}`), sections: [
      { heading: "Statut", content: `<p>L'accompagnement se termine le ${frVAE(ch.fin)} : le certificat de réalisation sera établi à cette date, sur la base des séances émargées (${heures} heure(s) réalisée(s) à ce jour sur ${heuresVAE(f)}).</p>` },
    ] });
  }
  const d = frVAE(ch.fin);
  return buildDocument({ org: o, title: "CERTIFICAT DE RÉALISATION", subtitle: "Action concourant au développement des compétences", sections: [
    { heading: "Attestation", content: `<p>Je soussigné(e) ${esc(o.dirigeant)}, représentant légal de ${esc(o.nom)}${o.nda ? ` (déclaration d'activité n° ${esc(o.nda)})` : ""}, atteste que :</p><p><strong>${esc(s.civilite || "")} ${esc(s.prenom)} ${esc(s.nom)}</strong> a suivi l'action <strong>« Accompagnement VAE — ${esc(c.intitule)} »</strong>, de nature : <strong>action permettant de faire valider les acquis de l'expérience</strong> (article L.6313-1, 3° du Code du travail),<br>qui s'est déroulée du ${frVAE(ch.debut)} au ${frVAE(ch.fin)}, pour une durée réalisée de <strong>${heures} heures</strong> (sur ${heuresVAE(f)} heures prévues).</p><p>Sans préjudice des délais imposés par les règles fixées par le financeur, le bénéficiaire et l'organisme conservent l'ensemble des pièces justificatives ayant permis d'établir le présent certificat pendant 3 ans à compter de la fin de l'année du dernier paiement.</p>` },
  ], extraHtml: signatures([sigOrganisme(o, d)]) });
}

const mail = (o: OrganismeInfo, titre: string, objet: string, corps: string) => buildDocument({ org: o, title: `MODÈLE DE COURRIEL – ${titre}`, sections: [
  { heading: "Courriel type", content: `<p><strong>De :</strong> ${esc(o.nom)} &lt;${esc(o.email)}&gt;<br><strong>Objet :</strong> ${objet}</p><p>Bonjour,</p>${corps}<p>Bien cordialement,<br>${esc(o.responsablePedagogique || o.dirigeant)} — ${esc(o.nom)}<br>${esc(o.email)}${telOrg(o)}</p>` },
] });

export const genVAEMailIntroduction = (o: OrganismeInfo) => mail(o, "INTRODUCTION AU PARCOURS VAE", "Votre démarche VAE : les prochaines étapes", `<p>Merci pour votre intérêt. Je vous propose un entretien de faisabilité gratuit d'une heure pour examiner votre expérience au regard du référentiel de la certification visée. Vous trouverez ci-joint la plaquette d'information. La démarche s'effectue sur la plateforme France VAE (vae.gouv.fr).</p>`);
export const genVAEMailPreparationDossier = (o: OrganismeInfo) => mail(o, "PRÉPARATION DU DOSSIER DE VALIDATION", "Préparer la rédaction de votre dossier de validation", `<p>Pour notre prochaine séance, merci de réunir vos justificatifs d'activité et de noter, pour chaque bloc, deux situations de travail significatives. Vous trouverez ci-joint la trame du dossier de validation.</p>`);
export const genVAEMailRecap = (o: OrganismeInfo, f: FormationInfo) => mail(o, "RÉCAPITULATIF DE L'ACCOMPAGNEMENT", "Récapitulatif de votre accompagnement VAE", `<p>Votre accompagnement de ${heuresVAE(f)} heures se déroule en séances individuelles de 2 heures (${esc(f.modalites)}). Le calendrier des séances, le programme et le règlement intérieur sont joints.</p>`);
export const genVAEMailSuiviEvolution = (o: OrganismeInfo) => mail(o, "SUIVI DE L'AVANCEMENT DU DOSSIER", "Où en est votre dossier de validation ?", `<p>Je reviens vers vous pour faire le point sur l'avancement de votre dossier. Pouvez-vous m'adresser votre dernière version avant notre prochaine séance afin que je puisse vous faire un retour ?</p>`);
export const genVAEMailPreparationEntretien = (o: OrganismeInfo) => mail(o, "PRÉPARATION DE L'ENTRETIEN AVEC LE JURY", "Préparer votre entretien avec le jury", `<p>Nous consacrerons les dernières séances à la préparation de votre entretien avec le jury : présentation de votre parcours en 10 minutes et questions types. Pensez à vérifier sur vae.gouv.fr la date et les modalités communiquées par le certificateur.</p>`);
export const genVAEMailPostValidation = (o: OrganismeInfo) => mail(o, "SUIVI APRÈS LE JURY", "Suite de votre passage devant le jury", `<p>Pourriez-vous nous transmettre la décision du jury dès réception ? En cas de validation partielle, les blocs obtenus vous sont acquis définitivement et nous pouvons étudier ensemble la suite de votre parcours.</p>`);
export const genVAEMailEnvoiCertificat = (o: OrganismeInfo) => mail(o, "ENVOI DU CERTIFICAT DE RÉALISATION", "Votre certificat de réalisation", `<p>Veuillez trouver ci-joint votre certificat de réalisation, établi sur la base des séances émargées, ainsi que le questionnaire de satisfaction de fin d'accompagnement.</p>`);
export const genVAEMailRelanceAbandon = (o: OrganismeInfo) => mail(o, "RELANCE APRÈS ABSENCE", "Nous n'avons pas pu vous voir à la dernière séance", `<p>Vous n'étiez pas présent(e) à notre dernière séance. Tout va bien ? Je vous propose de convenir d'un nouveau créneau ; si vous rencontrez une difficulté, parlons-en : des adaptations sont possibles.</p>`);
export const genVAEMailConditionsCertification = (o: OrganismeInfo, f: FormationInfo) => mail(o, "CONDITIONS DE PRÉSENTATION À LA CERTIFICATION", "Présentation au jury : ce que demande le certificateur", `<p>Le jury de la certification « ${esc(certifVAE(f).intitule)} » est organisé par ${esc(certifVAE(f).certificateur)}. Le dépôt du dossier de validation et la convocation se font selon ses modalités (plateforme vae.gouv.fr). Si vous avez besoin d'aménagements pour l'entretien, la demande doit être faite auprès du certificateur : nous vous aidons à la formuler.</p>`);
export const genVAEMailAideConnexion = (o: OrganismeInfo) => mail(o, "AIDE À LA CONNEXION", "Votre séance à distance : mode d'emploi", `<p>La séance aura lieu en visioconférence ; le lien vous est envoyé la veille. En cas de difficulté, répondez à ce courriel : nous vous proposons un test de connexion ou une solution de repli (téléphone).</p>`);

export function genVAEAdaptationAccompagnement(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "ADAPTATION DE L'ACCOMPAGNEMENT VAE", sections: [
    { heading: "Leviers d'adaptation", content: `<ul><li>Ordre des blocs selon les points d'appui et de vigilance identifiés en faisabilité ;</li><li>rythme et horaires selon les contraintes du candidat ;</li><li>modalité (présentiel / distance) ;</li><li>aménagements liés au handicap (référent : ${esc(o.referentHandicap)}) ;</li><li>séance supplémentaire de mise en situation si le candidat en a besoin, dans la limite du volume contractuel.</li></ul>` },
    { heading: "Traçabilité", content: `<p>Chaque adaptation est notée dans la fiche de suivi individuel et, si elle modifie le contrat, fait l'objet d'un avenant.</p>`, variant: "green" },
  ] });
}

export function genVAEFichePedagogique(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  return buildDocument({ org: o, title: "FICHE PÉDAGOGIQUE – ACCOMPAGNEMENT VAE", table: {
    headers: ["Rubrique", "Contenu"],
    rows: [
      ["Certification", certifLigne(c)], ["Public", esc(f.publicVise)], ["Prérequis", esc(f.prerequis)], ["Durée", esc(f.duree)],
      ["Modalités", `${esc(f.modalites)} — ${esc(lieuVAE(o, f))}`], ["Objectifs", esc(f.objectifs).replace(/\n/g, "<br>")],
      ["Méthodes", esc(f.moyensPedagogiques)], ["Évaluation", esc(f.methodesEvaluation)], ["Accompagnateur", esc(f.formateur || o.responsablePedagogique)],
    ],
  } });
}

function seancesRows(cal: SeanceVAE[]) {
  return cal.map((x) => [String(x.num), frVAE(x.date), x.horaire, `${x.duree} h`, esc(x.theme), x.realisee ? "Réalisée" : "À venir"]);
}

export function genVAEFicheSuiviIndividuel(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const p = profilVAE(s, f);
  const cal = calendrierVAE(s, f);
  const faites = cal.filter((x) => x.realisee);
  return buildDocument({ org: o, title: "FICHE DE SUIVI INDIVIDUEL – VAE", subtitle: esc(p.nomComplet), table: {
    headers: ["Séance", "Date", "Horaire", "Durée", "Contenu", "Statut"], rows: seancesRows(cal),
  }, sections: [
    { heading: "Avancement", content: `<p>${faites.length} séance(s) réalisée(s) sur ${cal.length} (${faites.reduce((a, x) => a + x.duree, 0)} h / ${heuresVAE(f)} h). ${p.blocsVigilance.length ? `Priorité donnée à : ${p.blocsVigilance.map(esc).join(" ; ")}.` : ""}${p.rqth ? " Aménagements suivis avec le référent handicap." : ""}</p>`, variant: "green" },
  ] });
}

export function genVAEEntretienIntermediaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const p = profilVAE(s, f);
  const cal = calendrierVAE(s, f);
  const mi = cal[Math.floor((cal.length - 1) / 2)];
  const fait = !!mi && mi.realisee;
  const d = fait ? frVAE(mi.date) : "";
  return buildDocument({ org: o, title: "ENTRETIEN INTERMÉDIAIRE – VAE", subtitle: esc(p.nomComplet), sections: [
    { heading: "Date", content: `<p>${fait ? `Entretien réalisé le ${d} (séance ${mi.num}).` : `Entretien prévu ${mi ? `le ${frVAE(mi.date)} (séance ${mi.num})` : "à mi-parcours"}.`}</p>` },
    { heading: "Point d'étape", content: fait
      ? `<p><strong>Blocs décrits :</strong> ${p.couverture.slice(0, Math.max(1, Math.ceil(p.couverture.length / 2))).map((x) => esc(x.bloc.titre)).join(" ; ")}.<br><strong>Difficultés :</strong> ${p.blocsVigilance.length ? `preuves à compléter pour ${p.blocsVigilance.map(esc).join(" ; ")}` : "aucune difficulté bloquante"}.<br><strong>Décisions :</strong> poursuite du calendrier ; relecture de la version suivante avant la séance ${Math.min(cal.length, mi.num + 1)}.</p>`
      : `<p>Blocs décrits : ________________<br>Difficultés : ________________<br>Décisions : ________________</p>`, variant: "green" },
  ], extraHtml: signatures([sigCandidat(s, d || undefined), sigAccompagnateur(o, f, s, d || undefined)]) });
}

export function genVAEDossierSuiviParcours(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const etape = (label: string, d: Date | null, externe = false) => [label, d ? frVAE(d) : "—", externe ? "Pièce du certificateur à joindre" : estPasse(d) ? "Réalisé" : "À venir"];
  return buildDocument({ org: o, title: "DOSSIER DE SUIVI DU PARCOURS VAE", subtitle: `${esc(p.nomComplet)} — ${esc(c.intitule)}`, table: {
    headers: ["Étape", "Date", "Statut"],
    rows: [
      etape("Entretien de faisabilité", ch.entretienFaisabilite),
      etape("Dossier de faisabilité préparé pour dépôt sur vae.gouv.fr", ch.depotFaisabilite),
      ["Décision de recevabilité (certificateur)", "—", "Pièce du certificateur à joindre"],
      etape("Signature du contrat / de la convention", ch.contrat),
      etape("Première séance", ch.premiereSeance),
      etape("Dossier de validation finalisé", ch.depotValidation),
      etape("Dernière séance (mise en situation d'entretien)", ch.derniereSeance),
      ["Entretien avec le jury", "Date fixée par le certificateur", "Convocation du certificateur à joindre"],
      ["Décision du jury", "—", "Notification du certificateur à joindre"],
    ],
  } });
}

export function genVAEGrilleEvaluationDossier(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const fait = estPasse(ch.depotValidation);
  const crit = ["Les activités décrites correspondent au bloc", "Les situations sont précises (contexte, actions, résultats)", "Le vocabulaire professionnel est maîtrisé", "Les preuves sont pertinentes et référencées"];
  const note = (bi: number, ci: number) => (p.couverture[bi]?.niveau === "Partielle" && ci === 3 ? "À renforcer" : "Satisfaisant");
  return buildDocument({ org: o, title: "GRILLE D'ANALYSE DU DOSSIER DE VALIDATION", subtitle: `${esc(p.nomComplet)} — relecture de l'accompagnateur (non décisionnelle)`, table: {
    headers: ["Bloc", ...crit],
    rows: p.couverture.map((x, bi) => [esc(x.bloc.titre), ...crit.map((_, ci) => (fait ? note(bi, ci) : ""))]),
  }, sections: [
    { heading: "Statut", content: fait ? `<p>Relecture de la version finalisée le ${frVAE(ch.depotValidation)}. Cette grille aide le candidat à améliorer son dossier : la décision appartient au seul jury.</p>` : `<p>Relecture prévue le ${frVAE(ch.depotValidation)} : grille à compléter à cette date.</p>`, variant: "green" },
  ] });
}

export function genVAEEmargement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const cal = calendrierVAE(s, f);
  const acc = accompagnateur(o, f, s);
  const sigAcc = s.formateurSignatureUrl || f.formateurSignatureUrl;
  const cellule = (url: string | undefined, fait: boolean) => (fait && url ? `<img src="${url}" style="max-height:30px">` : fait ? "" : "—");
  return buildDocument({ org: o, title: "FEUILLE D'ÉMARGEMENT – ACCOMPAGNEMENT VAE", subtitle: `${esc(s.prenom)} ${esc(s.nom)} — accompagnateur : ${esc(acc)}`, table: {
    headers: ["Séance", "Date", "Horaire", "Durée", "Signature du candidat", "Signature de l'accompagnateur"],
    rows: cal.map((x) => [String(x.num), frLongVAE(x.date), x.horaire, `${x.duree} h`, x.realisee ? cellule(s.signatureUrl, true) : "À venir", x.realisee ? cellule(sigAcc, true) : "À venir"]),
  }, sections: [
    { heading: "Total", content: `<p>${cal.filter((x) => x.realisee).reduce((a, x) => a + x.duree, 0)} heure(s) réalisée(s) sur ${heuresVAE(f)} heures prévues. ${/distanciel|distance/i.test(f.modalites) ? "Séances à distance : l'émargement est complété par l'export du journal de connexion de l'outil de visioconférence." : ""}</p>` },
  ] });
}

/** Relevé des séances à distance (remplace l'ancien « temps de connexion » à IP générées). */
export function genVAEReleveDistance(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const cal = calendrierVAE(s, f);
  return buildDocument({ org: o, title: "RELEVÉ DES SÉANCES À DISTANCE – VAE", subtitle: `${esc(s.prenom)} ${esc(s.nom)}`, table: {
    headers: ["Séance", "Date", "Horaire prévu", "Durée", "Outil", "Statut"],
    rows: cal.map((x) => [String(x.num), frVAE(x.date), x.horaire, `${x.duree} h`, esc(lieuVAE(o, f)), x.realisee ? "Réalisée — journal de connexion à joindre" : "À venir"]),
  }, sections: [
    { heading: "Preuve de connexion", content: `<p>Pour chaque séance réalisée à distance, l'export du journal de participation de l'outil de visioconférence (heures d'entrée et de sortie) est joint à ce relevé. Aucune donnée technique n'est reconstituée.</p>`, variant: "green" },
  ] });
}

export function genVAEProcedureAbandon(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE PRÉVENTION DES ABANDONS – VAE", sections: [
    { heading: "Signaux d'alerte", content: `<p>Absence non prévenue, report répété, absence de nouvelle version du dossier entre deux séances, découragement exprimé.</p>` },
    { heading: "Actions", content: `<ol><li>Relance le jour même (courriel type) et appel sous 48 heures.</li><li>Entretien de remobilisation : causes, adaptation du rythme ou des objectifs intermédiaires.</li><li>Si besoin : orientation (référent handicap, conseiller en évolution professionnelle, aides).</li><li>Abandon confirmé : entretien de sortie (guide dédié), certificat de réalisation des heures effectuées, information sur la reprise possible du parcours.</li></ol>`, variant: "green" },
  ] });
}
export function genVAEEviterEchec(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PRÉVENIR LES SITUATIONS D'ÉCHEC – VAE", sections: [
    { heading: "En amont", content: `<p>Entretien de faisabilité argumenté sur le référentiel ; réorientation si l'expérience ne correspond pas à la certification.</p>` },
    { heading: "Pendant", content: `<p>Priorité aux blocs fragiles, relectures régulières, portefeuille de preuves vérifié, mise en situation d'entretien.</p>` },
    { heading: "Après le jury", content: `<p>En cas de validation partielle : les blocs obtenus sont acquis définitivement ; plan d'action pour les blocs manquants (nouvelle VAE, formation).</p>`, variant: "green" },
  ] });
}
export function genVAEFavoriserEngagement(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FAVORISER L'ENGAGEMENT DES CANDIDATS – VAE", sections: [
    { heading: "Leviers", content: `<ul><li>Calendrier partagé dès la signature, rappel la veille de chaque séance ;</li><li>objectifs intermédiaires concrets (un bloc décrit par étape) ;</li><li>retours écrits sous 5 jours ouvrés sur chaque version ;</li><li>valorisation des progrès lors de l'entretien intermédiaire.</li></ul>` },
  ] });
}
export function genVAEGuideEntretienAbandons(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "GUIDE D'ENTRETIEN EN CAS D'ABANDON – VAE", sections: [
    { heading: "Questions", content: `<p>1. Qu'est-ce qui vous amène à interrompre la démarche ?<br>2. Une adaptation (rythme, modalité, objectifs) permettrait-elle de continuer ?<br>3. Souhaitez-vous reprendre plus tard ? À quelle échéance ?<br>4. Qu'aurions-nous pu faire autrement ?</p>` },
    { heading: "Suites", content: `<p>Compte rendu, certificat de réalisation des heures effectuées, fiche d'amélioration si une cause interne est identifiée.</p>`, variant: "green" },
  ] });
}

export function genVAEAttestationAssiduite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const cal = calendrierVAE(s, f);
  const faites = cal.filter((x) => x.realisee);
  const d = faites.length ? frVAE(faites[faites.length - 1].date) : "";
  return buildDocument({ org: o, title: "ATTESTATION D'ASSIDUITÉ – VAE", subtitle: `${esc(s.prenom)} ${esc(s.nom)}`, sections: [
    { heading: "Attestation", content: faites.length
      ? `<p>${esc(o.nom)} atteste que ${esc(s.civilite || "")} ${esc(s.prenom)} ${esc(s.nom)} a participé à ${faites.length} séance(s) d'accompagnement VAE, soit ${faites.reduce((a, x) => a + x.duree, 0)} heure(s), entre le ${frVAE(faites[0].date)} et le ${d}, conformément aux feuilles d'émargement.</p>`
      : `<p>Aucune séance n'est encore réalisée : l'attestation sera établie sur la base des feuilles d'émargement.</p>` },
  ], extraHtml: faites.length ? signatures([sigOrganisme(o, d)]) : "" });
}

/** IND 16 — l'OF prépare et vérifie les conditions de présentation ; il ne convoque ni ne décide. */
export function genVAEProcedureJury(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  return buildDocument({ org: o, title: "PROCÉDURE DE PRÉPARATION ET DE PRÉSENTATION AU JURY – VAE", subtitle: c.intitule, sections: [
    { heading: "Exigences du certificateur", content: `<p>Certificateur : ${esc(c.certificateur)}. Les modalités de dépôt du dossier de validation, le calendrier des jurys, la composition du jury et les éventuelles mises en situation sont fixés par le certificateur et communiqués via vae.gouv.fr. ${esc(o.nom)} vérifie ces exigences au démarrage de chaque accompagnement.</p>` },
    { heading: "Rôle de l'organisme", content: `<ol><li>Informer le candidat des exigences formelles (format du dossier, pièces, délais).</li><li>Vérifier avant dépôt que le dossier est complet (liste de contrôle).</li><li>Aider à formuler une demande d'aménagement d'épreuve si nécessaire.</li><li>Préparer l'entretien avec le jury (mise en situation).</li><li>Recueillir la décision du jury auprès du candidat pour le suivi des résultats.</li></ol>`, variant: "green" },
    { heading: "Ce que l'organisme ne fait pas", content: `<p>Il ne prononce pas la recevabilité, ne convoque pas le candidat, ne siège pas au jury et ne notifie aucune décision : ces pièces émanent du certificateur et sont jointes au dossier du candidat.</p>` },
  ] });
}

export function genVAESuiviJury(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const ch = chronoVAE(s, f, o);
  const pret = estPasse(ch.derniereSeance);
  return buildDocument({ org: o, title: "FICHE DE SUIVI DE LA PRÉSENTATION AU JURY – VAE", subtitle: `${esc(s.prenom)} ${esc(s.nom)} — ${esc(c.intitule)}`, table: {
    headers: ["Contrôle", "Statut"],
    rows: [
      ["Exigences du certificateur communiquées au candidat", estPasse(ch.premiereSeance) ? `Oui — séance du ${frVAE(ch.premiereSeance)}` : "À venir"],
      ["Dossier de validation complet (liste de contrôle)", estPasse(ch.depotValidation) ? `Vérifié le ${frVAE(ch.depotValidation)}` : "À venir"],
      ["Demande d'aménagement d'épreuve", s.rqth === "oui" ? "À formuler auprès du certificateur avec le candidat" : "Sans objet (aucun besoin signalé)"],
      ["Mise en situation d'entretien réalisée", pret ? `Oui — ${frVAE(ch.derniereSeance)}` : "À venir"],
      ["Convocation au jury", "Émise par le certificateur — à joindre"],
      ["Décision du jury", "Notifiée par le certificateur — à joindre (validation totale / partielle / refus)"],
    ],
  } });
}

// ───────────────────────────── CRITÈRES 4 et 5 ─────────────────────────────

export function genVAEMoyensDedies(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "MOYENS DÉDIÉS À L'ACCOMPAGNEMENT VAE", sections: [
    { heading: "Moyens humains", content: `<p>Accompagnateur : ${esc(f.formateur || o.responsablePedagogique)} ; référent handicap : ${esc(o.referentHandicap)} ; administratif : ${esc(o.poleAdministratif)}.</p>` },
    { heading: "Moyens techniques", content: `<p>${esc(o.outilsUtilises)} ; partage de documents sécurisé ; référentiel de certification et guides du certificateur.</p>` },
    { heading: "Environnement", content: `<p>${/distanciel|distance/i.test(f.modalites) ? "Séances à distance en visioconférence, sur un créneau réservé et un lien individuel ; confidentialité garantie." : `Bureau fermé garantissant la confidentialité : ${esc(o.adresse)}, ${esc(o.codePostal)} ${esc(o.ville)}.`}</p>`, variant: "green" },
  ] });
}
export function genVAEMoyensTechniquesPresentiel(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "MOYENS TECHNIQUES ET ENVIRONNEMENT (PRÉSENTIEL)", sections: [
    { heading: "Locaux", content: `<p>${esc(o.adresse)}, ${esc(o.codePostal)} ${esc(o.ville)} : espace d'entretien fermé, poste informatique, connexion internet, impression des documents de travail. Accessibilité à vérifier avec le candidat avant la première séance ; solution à distance proposée si les locaux ne sont pas adaptés.</p>` },
  ] });
}
export function genVAECoordinationAccompagnateurs(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "COORDINATION DES INTERVENANTS – VAE", table: { headers: ["Fonction", "Titulaire", "Rôle"], rows: [
    ["Direction", esc(o.dirigeant), "Contractualisation, validation des plannings, réclamations"],
    ["Accompagnement / pédagogie", esc(o.responsablePedagogique), "Faisabilité, séances, relectures, préparation au jury"],
    ["Handicap", esc(o.referentHandicap), "Aménagements, lien avec les partenaires"],
    ["Administratif", esc(o.poleAdministratif), "Contrats, émargements, certificats"],
    ["Qualité", esc(o.referentQualite), "Indicateurs, veille, amélioration continue"],
  ] }, sections: [
    { heading: "Coordination", content: `<p>Point de coordination avant chaque nouvel accompagnement et à chaque difficulté signalée ; les décisions sont notées dans la fiche de suivi du candidat. ${o.responsablePedagogique === o.dirigeant ? "Structure unipersonnelle : le dirigeant assure l'ensemble des fonctions pédagogiques et administratives." : ""}</p>`, variant: "green" },
  ] });
}
export function genVAEAnnuaireContacts(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "ANNUAIRE DES CONTACTS – VAE", table: { headers: ["Contact", "Rôle", "Coordonnées"], rows: [
    [esc(o.nom), "Organisme accompagnateur", `${esc(o.email)}${telOrg(o)}`],
    [esc(o.responsablePedagogique), "Accompagnateur / référent VAE", esc(o.email)],
    [esc(o.referentHandicap), "Référent handicap", esc(o.email)],
    ["France VAE", "Plateforme nationale de la VAE", "vae.gouv.fr"],
    ["France Travail", "Aides et financement pour les demandeurs d'emploi", "francetravail.fr"],
    ["Mon Compte Formation", "Financement CPF", "moncompteformation.gouv.fr"],
    ["Agefiph", "Compensation du handicap", "agefiph.fr"],
  ] } });
}
export function genVAEDifferentsPoles(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "LES DIFFÉRENTS PÔLES – VAE", sections: [
    { heading: "Pôle pédagogique", content: `<p>${esc(o.responsablePedagogique)} — faisabilité, accompagnement, préparation au jury.</p>` },
    { heading: "Pôle administratif", content: `<p>${esc(o.poleAdministratif)} — contrats, financement, émargements, certificats.</p>` },
    { heading: "Pôle qualité et handicap", content: `<p>${esc(o.referentQualite)} (qualité) — ${esc(o.referentHandicap)} (handicap).</p>`, variant: "green" },
  ] });
}
export function genVAERessources(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  return buildDocument({ org: o, title: "RESSOURCES MISES À DISPOSITION DU CANDIDAT – VAE", table: { headers: ["Ressource", "Usage", "Mise à disposition"], rows: [
    [`Référentiel ${esc(c.code || "de la certification")}`, "Relier ses activités aux compétences", "Remis à la 1re séance"],
    ["Trame du dossier de validation", "Structurer la description des activités", "Remise à la 2e séance"],
    ["Guide « décrire une situation de travail »", "Méthode contexte / actions / résultats", "Remis à la 2e séance"],
    ["Liste de contrôle du portefeuille de preuves", "Vérifier les pièces avant dépôt", "Avant la relecture finale"],
    ["Questions types d'entretien avec le jury", "Préparer l'oral", "Phase de préparation au jury"],
    ["Fiche France Compétences de la certification", "Blocs, métiers, passerelles", c.code ? `https://www.francecompetences.fr/recherche/rncp/${c.code.replace(/^RNCP/i, "")}/` : "francecompetences.fr"],
  ] }, sections: [
    { heading: "Appropriation", content: `<p>Chaque ressource est présentée en séance et utilisée sur un exemple tiré de l'expérience du candidat ; assistance par courriel entre les séances.</p>`, variant: "green" },
  ] });
}
export function genVAEFichePosteAccompagnateur(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FICHE DE POSTE – ACCOMPAGNATEUR VAE", sections: [
    { heading: "Missions", content: `<ul><li>Conduire l'entretien de faisabilité et argumenter l'avis ;</li><li>accompagner la description des activités sans rédiger à la place du candidat ;</li><li>relire et questionner les versions du dossier ;</li><li>préparer l'entretien avec le jury ;</li><li>tracer le suivi (émargements, fiches de suivi).</li></ul>` },
    { heading: "Compétences requises", content: `<ul><li>Maîtrise de la démarche VAE et du cadre réglementaire (loi n° 2022-1598, décret n° 2023-1275) ;</li><li>connaissance du métier et du référentiel de la certification accompagnée ;</li><li>techniques d'entretien d'explicitation et d'écoute ;</li><li>accueil des personnes en situation de handicap.</li></ul>`, variant: "green" },
  ] });
}

/** IND 21 — compétences de l'accompagnateur et justificatifs à joindre. */
export function genVAECompetencesAccompagnateur(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  const acc = f.formateur || o.responsablePedagogique || o.dirigeant;
  return buildDocument({ org: o, title: "COMPÉTENCES DE L'ACCOMPAGNATEUR VAE ET JUSTIFICATIFS", subtitle: esc(acc), table: {
    headers: ["Compétence requise", "Mode de vérification", "Justificatif joint"],
    rows: [
      [`Connaissance du métier visé (${esc(c.intitule)})`, "Expérience professionnelle ou certification dans le domaine", "CV daté et signé ; diplômes / certificats"],
      ["Maîtrise de la démarche et du cadre VAE", "Formation ou pratique d'accompagnement VAE", "Attestation de formation ou références d'accompagnements"],
      ["Techniques d'entretien et d'explicitation", "Formation ou pratique d'entretien individuel", "Attestation ou lettre de mission antérieure"],
      ["Accueil des publics en situation de handicap", "Sensibilisation ou formation", "Attestation"],
    ],
  }, sections: [
    { heading: "Évaluation", content: `<p>Compétences vérifiées à l'entrée en fonction, puis évaluées chaque année (retours des candidats, observation d'une séance, entretien professionnel) ; les besoins identifiés alimentent le plan de développement des compétences (indicateur 22).</p>`, variant: "green" },
  ], extraHtml: signatures([{ label: "L'accompagnateur", nom: acc, date: dateSysteme(o), sig: f.formateurSignatureUrl }, sigOrganisme(o, dateSysteme(o))]) });
}

export function genVAEPlanDevAccompagnateurs(o: OrganismeInfo, f: FormationInfo) {
  const annee = anneeSysteme(o);
  return buildDocument({ org: o, title: "PLAN DE DÉVELOPPEMENT DES COMPÉTENCES – ACCOMPAGNATEURS VAE", subtitle: `Année ${annee}`, table: {
    headers: ["Besoin", "Action", "Bénéficiaire", "Échéance", "Statut"],
    rows: [
      ["Actualisation réglementaire VAE", "Veille et appropriation de la réforme (loi n° 2022-1598, décret n° 2023-1275, plateforme vae.gouv.fr)", esc(f.formateur || o.responsablePedagogique), `${annee}`, "Planifiée"],
      ["Référentiel qualité 2026", "Appropriation du décret n° 2026-728 (33 indicateurs)", esc(o.referentQualite), `${annee}`, "Planifiée"],
      ["Accueil du handicap", "Sensibilisation (ressources Agefiph)", esc(o.referentHandicap), `${annee}`, "Planifiée"],
      ["Actualisation métier", `Veille sur le référentiel ${esc(certifVAE(f).code)} et les pratiques du métier`, esc(f.formateur || o.responsablePedagogique), `${annee}`, "Planifiée"],
    ],
  }, sections: [
    { heading: "Suivi", content: `<p>Le statut passe à « réalisée » sur présentation d'une attestation ; les attestations sont jointes au dossier de l'accompagnateur.</p>`, variant: "green" },
  ] });
}

// ───────────────────────────── CRITÈRE 6 ─────────────────────────────

export function genVAEVeilleReglementaire(o: OrganismeInfo) {
  const refs = REFERENCES_REGLEMENTAIRES_2026.filter((r) => r.types.includes("VAE"));
  const plancher = parseDateVAE(o.dateMaj);
  const prise = (d: string) => { const x = parseDateVAE(d); return frVAE(x && plancher && x.getTime() < plancher.getTime() ? plancher : x); };
  return buildDocument({ org: o, title: "VEILLE LÉGALE ET RÉGLEMENTAIRE – VAE", table: {
    headers: ["Texte", "Publication", "Prise en compte", "Contenu", "Exploitation", "Source"],
    rows: refs.map((r) => [esc(r.texte), frVAE(parseDateVAE(r.date)), prise(r.date), esc(r.objet), r.types.length === 1 ? "Mise à jour des supports VAE (terminologie, étapes, prérequis)" : "Mise à jour du système qualité et des procédures", `<a href="${r.source}">${esc(r.source)}</a>`]),
  }, sections: [
    { heading: "Organisation", content: `<p>Sources suivies : Légifrance, vae.gouv.fr, travail-emploi.gouv.fr, France Compétences. Revue mensuelle par ${esc(o.referentQualite)} ; chaque évolution est exploitée (supports, contrats, procédures) et tracée au tableau d'amélioration continue.</p>`, variant: "green" },
  ] });
}

export function genVAEVeilleMetiers(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  const fiche = c.code ? getRNCPByCode(c.code) : undefined;
  const rome = fiche?.codesROME?.length ? fiche.codesROME.join(", ") : "codes ROME de la fiche France Compétences";
  return buildDocument({ org: o, title: "VEILLE SUR LES COMPÉTENCES, MÉTIERS ET EMPLOIS – VAE", subtitle: c.intitule, table: {
    headers: ["Source", "Objet suivi", "Fréquence", "Exploitation"],
    rows: [
      [`Fiche France Compétences ${esc(c.code)}`, "Évolution du référentiel, date d'échéance, fiche de remplacement", "Trimestrielle", "Mise à jour des supports et de la trame du dossier de validation"],
      [`Fiches métiers France Travail (ROME ${esc(rome)})`, "Compétences et conditions d'exercice du métier", "Semestrielle", "Actualisation des questions de faisabilité et de préparation au jury"],
      ["Observatoire de la branche professionnelle", "Besoins en compétences, tensions de recrutement", "Annuelle", "Argumentaire sur les débouchés (indicateur 3)"],
      ["Retours des candidats et des jurys", "Attentes constatées lors des entretiens", "À chaque fin de parcours", "Ajustement de la préparation à l'entretien"],
    ],
  }, sections: [
    { heading: "Traçabilité", content: `<p>Chaque constat est daté et relié à une action dans le tableau d'amélioration continue. Métiers visés : ${c.metiers.length ? esc(c.metiers.join(", ")) : "voir la fiche France Compétences"}.</p>`, variant: "green" },
  ] });
}

export function genVAEVeilleInnovations(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "VEILLE SUR LES INNOVATIONS PÉDAGOGIQUES ET TECHNOLOGIQUES – VAE", table: {
    headers: ["Thème", "Source", "Fréquence", "Exploitation"],
    rows: [
      ["Parcours dématérialisé France VAE", "vae.gouv.fr (espace candidat et accompagnateur)", "Trimestrielle", "Mise à jour du guide de dépôt remis aux candidats"],
      ["Classes virtuelles et accessibilité numérique", "Documentation des outils utilisés, ressources Agefiph", "Semestrielle", "Paramétrage des séances à distance (sous-titrage, partage d'écran)"],
      ["Portfolio numérique de preuves", "Communautés de pratique de l'accompagnement", "Semestrielle", "Liste de contrôle du portefeuille de preuves"],
      ["Outils d'aide à la reformulation (dont IA générative)", "Publications institutionnelles et professionnelles", "Semestrielle", "Règle interne : le candidat reste seul auteur ; l'outil ne rédige pas le dossier"],
    ],
  }, sections: [
    { heading: "Organisation", content: `<p>Veille tenue par ${esc(o.responsablePedagogique || o.dirigeant)} ; les innovations retenues sont testées puis intégrées aux supports, et tracées au tableau d'amélioration continue.</p>`, variant: "green" },
  ] });
}

export function genVAEAccessibiliteHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "ACCESSIBILITÉ ET HANDICAP – VAE", sections: [
    { heading: "Référent handicap", content: `<p>${esc(o.referentHandicap)} — ${esc(o.email)}</p>` },
    { heading: "Réseau mobilisable", content: `<p>Agefiph, Cap emploi, MDPH, Ressource handicap formation de la région, médecine du travail (salariés).</p>` },
    { heading: "Aménagements", content: `<p>Rythme et durée des séances, supports adaptés, outils numériques d'accessibilité, séances à distance, aide à la demande d'aménagement des épreuves auprès du certificateur.</p>`, variant: "green" },
  ] });
}

export function genVAEPartenaires(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  return buildDocument({ org: o, title: "PARTENAIRES ET CERTIFICATEUR – VAE", table: { headers: ["Partenaire", "Nature de la relation", "Formalisation"], rows: [
    [esc(c.certificateur), `Certificateur de ${esc(c.intitule)} : recevabilité, jury, délivrance`, "Relation institutionnelle via vae.gouv.fr — aucune sous-traitance"],
    ["France VAE", "Plateforme nationale du parcours", "Inscription de l'organisme en tant qu'accompagnateur selon les modalités de la plateforme"],
    ["Conseillers en évolution professionnelle / France Travail", "Orientation des candidats", "Échanges au cas par cas"],
    ["Agefiph / Cap emploi", "Compensation du handicap", "Sollicitation au cas par cas"],
  ] }, sections: [
    { heading: "Sous-traitance et portage salarial", content: `<p>Le recours éventuel à la sous-traitance ou au portage salarial est tracé dans le registre dédié (indicateur 27, décret n° 2026-728).</p>` },
  ] });
}

// ───────────────────────────── CRITÈRE 7 ─────────────────────────────

const CRITERES_SATISFACTION = ["Accueil et information", "Entretien de faisabilité", "Qualité de l'accompagnement", "Ressources remises", "Préparation à l'entretien avec le jury", "Organisation et respect du calendrier"];

export function satisfactionNotes(s: StagiaireInfo, f: FormationInfo): number[] {
  const g = graine(`sat|${s.nom}|${s.prenom}|${f.intitule}`);
  return CRITERES_SATISFACTION.map((_, i) => ((g >>> (i * 2)) % 4 === 0 ? 4 : 5));
}

export function genVAESatisfaction(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const ch = chronoVAE(s, f, o);
  const fait = estPasse(ch.fin);
  const notes = fait ? satisfactionNotes(s, f) : [];
  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SATISFACTION – FIN D'ACCOMPAGNEMENT VAE", subtitle: `${esc(s.prenom)} ${esc(s.nom)}`, table: {
    headers: ["Critère", "1", "2", "3", "4", "5"],
    rows: CRITERES_SATISFACTION.map((c, i) => [c, ...[1, 2, 3, 4, 5].map((n) => (notes[i] === n ? "☒" : "☐"))]),
  }, sections: [
    { heading: "Statut", content: fait ? `<p>Questionnaire rempli le ${frVAE(ch.fin)} à l'issue de la dernière séance. Moyenne : ${(notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(1).replace(".", ",")}/5. Recommanderiez-vous ${esc(o.nom)} ? ☒ Oui ☐ Non</p>` : `<p>Questionnaire à remplir à la fin de l'accompagnement (${frVAE(ch.fin)}).</p>` },
  ] });
}

export function genVAESyntheseSatisfaction(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const acheves = valides(stagiaires).filter((s) => estPasse(parseDateVAE(s.dateFinFormation || f.dateFin)));
  if (!acheves.length) {
    return buildDocument({ org: o, title: "SYNTHÈSE DES APPRÉCIATIONS – VAE", sections: [
      { heading: "Statut", content: `<p>Aucun accompagnement n'est encore achevé au ${frVAE(aujourdhui())} : la synthèse sera établie à partir des premiers questionnaires de fin d'accompagnement.</p>` },
    ] });
  }
  const moy = CRITERES_SATISFACTION.map((_, i) => acheves.reduce((a, s) => a + satisfactionNotes(s, f)[i], 0) / acheves.length);
  return buildDocument({ org: o, title: "SYNTHÈSE DES APPRÉCIATIONS – VAE", subtitle: `${acheves.length} questionnaire(s) — au ${frVAE(aujourdhui())}`, table: {
    headers: ["Critère", "Moyenne /5"], rows: CRITERES_SATISFACTION.map((c, i) => [c, moy[i].toFixed(1).replace(".", ",")]),
  }, sections: [
    { heading: "Analyse", content: `<p>Critère le moins bien noté : « ${CRITERES_SATISFACTION[moy.indexOf(Math.min(...moy))]} » — action de progrès inscrite au tableau d'amélioration continue.</p>`, variant: "green" },
  ] });
}

/** IND 30 — appréciations des autres parties prenantes (financeur, employeur, accompagnateur). */
export function genVAEAppreciationsPartiesPrenantes(o: OrganismeInfo) {
  const q = (titre: string, items: string[]) => `<h3>${titre}</h3><table><thead><tr><th>Question</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody>${items.map((i) => `<tr><td>${i}</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>`).join("")}</tbody></table><p>Commentaire libre : ………………………………………………</p>`;
  return buildDocument({ org: o, title: "RECUEIL DES APPRÉCIATIONS DES PARTIES PRENANTES – VAE", sections: [
    { heading: "Dispositif", content: `<p>Candidats : questionnaire de fin d'accompagnement. Employeurs financeurs : questionnaire à la fin de chaque parcours financé. Financeurs (OPCO, France Travail, Région) : sollicitation au moins une fois par an. Accompagnateurs : bilan à chaque fin de parcours. Relance à J+7 ; les réponses sont consolidées dans la synthèse annuelle.</p>` },
  ], extraHtml: q("Questionnaire employeur", ["Clarté de l'information reçue", "Prise en compte de vos attentes", "Suivi de l'avancement", "Utilité de la démarche pour votre structure"])
    + q("Questionnaire financeur", ["Conformité des pièces transmises", "Respect des délais", "Qualité des échanges"])
    + q("Bilan de l'accompagnateur", ["Adéquation du volume d'heures", "Qualité des ressources", "Coordination interne"]) });
}

export function genVAEProcedureReclamation(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE TRAITEMENT DES DIFFICULTÉS, RÉCLAMATIONS ET ALÉAS – VAE", sections: [
    { heading: "Dépôt", content: `<p>Par courriel (${esc(o.email)}), par courrier (${esc(o.nom)}, ${esc(o.adresse)}, ${esc(o.codePostal)} ${esc(o.ville)}) ou oralement auprès de l'accompagnateur (retranscription écrite).</p>` },
    { heading: "Traitement", content: `<p>1. Accusé de réception sous 48 heures ouvrées.<br>2. Analyse par ${esc(o.referentQualite)}.<br>3. Réponse écrite sous 15 jours ouvrés.<br>4. Action corrective si nécessaire, inscrite au tableau d'amélioration continue.<br>5. Vérification de la satisfaction du réclamant.</p>`, variant: "green" },
    { heading: "Aléas", content: `<p>Absence de l'accompagnateur, incident technique, report de jury par le certificateur : information du candidat sous 24 heures et proposition d'une solution (report, séance à distance).</p>` },
  ] });
}

export function genVAERegistreReclamations(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "REGISTRE DES RÉCLAMATIONS ET ALÉAS – VAE", subtitle: `Ouvert le ${dateSysteme(o)}`, table: {
    headers: ["N°", "Date", "Origine", "Objet", "Accusé de réception", "Réponse", "Action corrective", "Clôture"],
    rows: [["—", "—", "—", "Aucune réclamation enregistrée à ce jour", "—", "—", "—", "—"]],
  }, sections: [
    { heading: "Tenue", content: `<p>Toute réclamation ou tout aléa est inscrit dès réception. Le registre est analysé à chaque revue qualité.</p>`, variant: "green" },
  ] });
}

export function genVAEPlanAmelioration(o: OrganismeInfo, f: FormationInfo) {
  const annee = anneeSysteme(o);
  return buildDocument({ org: o, title: "TABLEAU D'AMÉLIORATION CONTINUE – VAE", subtitle: `Ouvert le ${dateSysteme(o)}`, table: {
    headers: ["Origine", "Constat", "Action", "Pilote", "Échéance", "Statut"],
    rows: [
      ["Veille réglementaire", "Réforme de la VAE (loi n° 2022-1598, décret n° 2023-1275)", "Supports mis à jour : dossier de faisabilité, dossier de validation, vae.gouv.fr, suppression de la durée minimale", esc(o.responsablePedagogique), `${annee}`, "Réalisé à l'ouverture du dossier"],
      ["Référentiel qualité 2026", "Décret n° 2026-728 : analyse des risques (IND 32), portage salarial (IND 27)", "Analyse des risques qualité et registre de sous-traitance / portage établis", esc(o.referentQualite), `${annee}`, "Réalisé à l'ouverture du dossier"],
      ["Analyse des risques", "Risque de dossier rédigé par l'accompagnateur", "Charte de l'accompagnateur et traçabilité des versions", esc(o.responsablePedagogique), `${annee}`, "En cours"],
      ["Appréciations", "Premiers questionnaires de fin d'accompagnement", "Analyse et action sur le critère le moins bien noté", esc(o.referentQualite), "À chaque fin de parcours", "Planifié"],
    ],
  }, sections: [
    { heading: "Fonctionnement", content: `<p>Le tableau est alimenté par les appréciations (IND 30), les réclamations et aléas (IND 31), la veille (IND 23 à 25) et l'analyse des risques qualité (IND 32). Revue au moins annuelle.</p>`, variant: "green" },
  ] });
}

// ───────────────────────────── Registre 2026 ─────────────────────────────

export const genVAEAnalyseRisques = (o: OrganismeInfo, f: FormationInfo) => genAnalyseRisquesQualite(o, "VAE", f);

/** Point d'entrée unique du switch de documentGenerator pour les templates « vae_* ». */
export function renderVAETemplate(template: string, params: Record<string, any> | undefined, o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string | null {
  const si = params?.stagiaireIdx ?? 0;
  switch (template) {
    case "vae_plaquette_info": return genVAEPlaquetteInfo(o, f);
    case "vae_diffusion_info": return genVAEDiffusionInfo(o, f);
    case "vae_procedure_info": return genVAEProcedureInfo(o);
    case "vae_indicateurs_resultats": return genVAEIndicateursResultats(o, f, stagiaires);
    case "vae_presentation_nouvel_entrant": return genVAEPresentationNouvelEntrant(o, f, stagiaires);
    case "vae_taux_certification": return genVAETauxCertification(o, f);
    case "vae_info_certification": return genVAEInfoCertification(o, f);
    case "vae_process_analyse_besoin": return genVAEProcessAnalyseBesoin(o);
    case "vae_entretien_faisabilite": return genVAEEntretienFaisabiliteTrame(o, f);
    case "vae_analyse_besoin": return genVAEAnalyseBesoin(o, f, stagiaires, si);
    case "vae_diagnostic_faisabilite": return genVAEDiagnosticFaisabilite(o, f, stagiaires, si);
    case "vae_livret1_recevabilite":
    case "vae_dossier_faisabilite": return genVAEDossierFaisabilite(o, f, stagiaires, si);
    case "vae_contrat_accompagnement":
    case "vae_convention_tripartite":
    case "vae_convention_accompagnement": return genVAEContrat(o, f, stagiaires, si);
    case "vae_handicap_entretien": return genVAEHandicapEntretien(o);
    case "vae_handicap_formalisation": return genVAEHandicapFormalisation(o);
    case "vae_handicap_bilan": return genVAEHandicapBilan(o);
    case "vae_mail_handicap": return genVAEMailHandicap(o);
    case "vae_referentiel_accompagnement": return genVAEReferentielAccompagnement(o, f);
    case "vae_engagements_respectifs": return genVAEEngagementsRespectifs(o, f);
    case "vae_programme_accompagnement": return genVAEProgrammeAccompagnement(o, f, stagiaires);
    case "vae_livret2":
    case "vae_trame_dossier_validation": return genVAETrameDossierValidation(o, f, stagiaires, si);
    case "vae_sequencage": return genVAESequencage(o, f);
    case "vae_positionnement_debut": return genVAEPositionnement(o, f, stagiaires, si, "debut");
    case "vae_positionnement_fin": return genVAEPositionnement(o, f, stagiaires, si, "fin");
    case "vae_livret_accueil": return genVAELivretAccueil(o, f);
    case "vae_cgv": return genVAECGV(o);
    case "vae_reglement_interieur": return genVAEReglementInterieur(o);
    case "vae_droit_image": return genVAEDroitImage(o);
    case "vae_infos_peripheriques": return genVAEInfosPeripheriques(o);
    case "vae_certificat_realisation": return genVAECertificatRealisation(o, f, stagiaires, si);
    case "vae_mail_introduction": return genVAEMailIntroduction(o);
    case "vae_mail_preparation_dossier": return genVAEMailPreparationDossier(o);
    case "vae_mail_recap": return genVAEMailRecap(o, f);
    case "vae_mail_suivi_evolution": return genVAEMailSuiviEvolution(o);
    case "vae_mail_preparation_entretien": return genVAEMailPreparationEntretien(o);
    case "vae_mail_post_validation": return genVAEMailPostValidation(o);
    case "vae_mail_envoi_certificat": return genVAEMailEnvoiCertificat(o);
    case "vae_adaptation_accompagnement": return genVAEAdaptationAccompagnement(o);
    case "vae_fiche_pedagogique": return genVAEFichePedagogique(o, f);
    case "vae_fiche_suivi_individuel": return genVAEFicheSuiviIndividuel(o, f, stagiaires, si);
    case "vae_entretien_intermediaire": return genVAEEntretienIntermediaire(o, f, stagiaires, si);
    case "vae_dossier_suivi_parcours": return genVAEDossierSuiviParcours(o, f, stagiaires, si);
    case "vae_grille_evaluation_dossier": return genVAEGrilleEvaluationDossier(o, f, stagiaires, si);
    case "vae_emargement": return genVAEEmargement(o, f, stagiaires, si);
    case "vae_temps_connexion":
    case "vae_rapport_connexion":
    case "vae_releve_distance": return genVAEReleveDistance(o, f, stagiaires, si);
    case "vae_procedure_abandon": return genVAEProcedureAbandon(o);
    case "vae_eviter_echec": return genVAEEviterEchec(o);
    case "vae_favoriser_engagement": return genVAEFavoriserEngagement(o);
    case "vae_guide_entretien_abandons": return genVAEGuideEntretienAbandons(o);
    case "vae_mail_relance_abandon": return genVAEMailRelanceAbandon(o);
    case "vae_attestation_assiduite": return genVAEAttestationAssiduite(o, f, stagiaires, si);
    case "vae_procedure_jury": return genVAEProcedureJury(o, f);
    case "vae_mail_conditions_certification": return genVAEMailConditionsCertification(o, f);
    case "vae_convocation_jury":
    case "vae_pv_jury":
    case "vae_notification_decision":
    case "vae_suivi_jury": return genVAESuiviJury(o, f, stagiaires, si);
    case "vae_moyens_dedies": return genVAEMoyensDedies(o, f);
    case "vae_mail_aide_connexion": return genVAEMailAideConnexion(o);
    case "vae_moyens_techniques_presentiel": return genVAEMoyensTechniquesPresentiel(o);
    case "vae_coordination_accompagnateurs": return genVAECoordinationAccompagnateurs(o);
    case "vae_annuaire_contacts": return genVAEAnnuaireContacts(o);
    case "vae_differents_poles": return genVAEDifferentsPoles(o);
    case "vae_ressources": return genVAERessources(o, f);
    case "vae_fiche_poste_accompagnateur": return genVAEFichePosteAccompagnateur(o);
    case "vae_competences_accompagnateur": return genVAECompetencesAccompagnateur(o, f);
    case "vae_plan_dev_accompagnateurs": return genVAEPlanDevAccompagnateurs(o, f);
    case "vae_veille_reglementaire": return genVAEVeilleReglementaire(o);
    case "vae_veille_metiers": return genVAEVeilleMetiers(o, f);
    case "vae_veille_innovations": return genVAEVeilleInnovations(o);
    case "vae_accessibilite_handicap": return genVAEAccessibiliteHandicap(o);
    case "vae_partenaires": return genVAEPartenaires(o, f);
    case "vae_registre_sous_traitance": return genVAERegistreSousTraitance(o, f, stagiaires);
    case "vae_clauses_qualite": return genVAEClausesQualite(o);
    case "vae_satisfaction": return genVAESatisfaction(o, f, stagiaires, si);
    case "vae_synthese_satisfaction": return genVAESyntheseSatisfaction(o, f, stagiaires);
    case "vae_appreciations_parties_prenantes": return genVAEAppreciationsPartiesPrenantes(o);
    case "vae_procedure_reclamation": return genVAEProcedureReclamation(o);
    case "vae_registre_reclamations": return genVAERegistreReclamations(o);
    case "vae_plan_amelioration": return genVAEPlanAmelioration(o, f);
    case "vae_analyse_risques": return genVAEAnalyseRisques(o, f);
    default: return null;
  }
}
