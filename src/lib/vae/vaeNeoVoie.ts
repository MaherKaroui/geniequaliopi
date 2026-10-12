/**
 * Pièces VAE ajoutées pour aligner le dossier sur le format NEO VOIE (dossier de référence
 * du skill /vae) : CV du candidat orienté certification, planning individuel, suivi de la
 * recevabilité, accusé de remise, pièces « jury » de l'organisme (jamais celles du
 * certificateur), registres et procédures manquants, pilotage (dossier QUALIOPI).
 *
 * Les pièces nominatives ne reprennent que les données déclarées du candidat ; sans
 * déclaration, elles restent des trames à compléter.
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument } from "../docBuilder";
import {
  certifVAE, profilVAE, calendrierVAE, chronoVAE, heuresVAE, frVAE, frLongVAE, parseDateVAE, estPasse, aujourdhui,
} from "./vaeProfil";
import { libelleMois, dureeTexte } from "./vaeCandidat";

const esc = (x: unknown) => String(x ?? "").replace(/</g, "&lt;");
const LIGNE = "________________________________________";
const lignes = (n: number) => Array.from({ length: n }, () => LIGNE).join("<br>");
const accompagnateur = (o: OrganismeInfo, f: FormationInfo, s?: StagiaireInfo) => (s?.formateur || f.formateur || o.responsablePedagogique || o.dirigeant || "").trim();
const cand = (stagiaires: StagiaireInfo[], si: number) => stagiaires[si] || stagiaires[0] || ({ civilite: "", nom: "", prenom: "", email: "", telephone: "", entreprise: "", poste: "", dateNaissance: "" } as StagiaireInfo);

function img(url?: string, alt = "signature") {
  return url ? `<img src="${url}" alt="${alt}" style="max-height:60px;max-width:180px;margin-top:6px">` : `<div style="height:55px"></div>`;
}
function signatures(parts: { label: string; nom: string; date?: string; sig?: string; tampon?: string }[]): string {
  return `<div class="signature-block-2">${parts.map((p) => `<div class="sig-box"><p class="sig-label">${p.label}</p><p>Nom : ${esc(p.nom) || "________________________"}</p><p>Date : ${p.date || "____ / ____ / ________"}</p><p style="margin-top:20px">Signature :</p>${p.tampon ? img(p.tampon, "cachet") : img(p.sig)}</div>`).join("")}</div>`;
}
const sigCandidat = (s: StagiaireInfo, date?: string) => ({ label: "Le candidat", nom: `${s.prenom} ${s.nom}`.trim(), date, sig: s.signatureUrl });
const sigAccompagnateur = (o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo, date?: string) => ({ label: "L'accompagnateur VAE", nom: accompagnateur(o, f, s), date, sig: s.formateurSignatureUrl || f.formateurSignatureUrl });
/** Dirigeant : tampon seul s'il existe, sinon signature (jamais les deux). */
const sigOrganisme = (o: OrganismeInfo, date?: string) => ({ label: `Pour ${o.nom}, le dirigeant`, nom: o.dirigeant, date, sig: o.signatureUrl, tampon: o.tamponUrl });

// ───────────────────────────── CV du candidat ─────────────────────────────

/**
 * CV du candidat orienté vers la certification visée : expériences déclarées, diplômes,
 * puis rapprochement de chaque activité avec les blocs de compétences de la fiche RNCP.
 * Aucune expérience, aucune date ni aucun employeur n'est inventé.
 */
export function genVAECVCandidat(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const p = profilVAE(s, f);
  const accent = "#1F3564";
  const ex = p.rapp.experiences;
  const coord = [s.email, s.telephone, [s.adresse, s.codePostal, s.commune].filter(Boolean).join(" ")].map((x) => (x || "").trim()).filter(Boolean).map(esc).join(" · ");
  const entete = `<div style="border-left:6px solid ${accent};padding:8px 14px;margin:8px 0 14px">
<div style="font-size:20px;font-weight:bold;color:${accent}">${esc(p.nomComplet) || "Prénom NOM"}</div>
<div style="font-size:13px;margin-top:2px">${esc(p.poste) || "Emploi actuel : ____________________"}</div>
<div style="font-size:12px;color:#444;margin-top:4px">${coord || "Coordonnées : ____________________"}</div>
<div style="font-size:12px;margin-top:6px"><strong>Certification visée par la VAE :</strong> ${esc(c.intitule)}${c.code ? ` (${esc(c.code)})` : ""} — ${esc(c.niveau)}</div></div>`;
  const experiences = ex.length
    ? ex.map((e) => `<div style="margin:0 0 10px"><div><strong>${esc(e.poste)}</strong>${e.employeur ? ` — ${esc(e.employeur)}` : ""}</div><div style="font-size:11px;color:#555">${esc(libelleMois(e.debutDate))}${e.debutDate ? ` – ${e.finDate ? esc(libelleMois(e.finDate)) : "aujourd'hui"}` : ""}${e.mois !== null ? ` (${esc(dureeTexte(e.mois))})` : ""}</div>${e.activitesListe.length ? `<ul style="margin:4px 0 0 16px">${e.activitesListe.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : ""}</div>`).join("")
    : `<table><thead><tr><th>Période</th><th>Emploi / fonction</th><th>Employeur ou structure</th><th>Activités principales</th></tr></thead><tbody>${Array.from({ length: 4 }, () => "<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>").join("")}</tbody></table><p><em>À compléter par le candidat : aucune expérience n'a encore été déclarée. Chaque ligne devra être justifiée (attestation d'employeur, bulletins de salaire, contrat, attestation d'activité bénévole).</em></p>`;
  const diplomes = s.diplome?.trim() ? `<p>${esc(s.diplome)}</p>` : `<p>${lignes(2)}</p>`;
  const synthese = p.rapp.renseigne
    ? `<p>Expérience déclarée en rapport direct avec la certification : <strong>${esc(p.experienceLien)}</strong> sur ${esc(p.experienceTotale)} d'expérience déclarée.${p.rapp.metierVise ? ` Emploi correspondant à un métier visé par la fiche : ${esc(p.rapp.metierVise)}.` : ""}</p>`
    : "";
  const rapprochement = `<table><thead><tr><th>Bloc de compétences (${esc(c.code || "fiche")})</th><th>Activités du CV en rapport</th><th>Lien</th></tr></thead><tbody>${p.couverture.map((x) => `<tr><td>${esc(x.bloc.titre)}${x.bloc.competences.length ? `<br><span style="font-size:10px;color:#555">${x.bloc.competences.slice(0, 4).map(esc).join(" ; ")}</span>` : ""}</td><td>${x.activites.length ? x.activites.map((a) => "• " + esc(a)).join("<br>") : p.rapp.renseigne ? "<em>Aucune activité déclarée en rapport</em>" : "&nbsp;"}</td><td>${p.rapp.renseigne ? x.niveau : ""}</td></tr>`).join("")}</tbody></table>${p.rapp.renseigne && p.blocsVigilance.length ? `<p><strong>Blocs sans activité déclarée :</strong> ${p.blocsVigilance.map(esc).join(" ; ")} — à documenter en entretien de faisabilité (ou à viser en validation partielle).</p>` : ""}${c.blocs.some((b) => !b.professionnel) ? `<p><em>Blocs d'enseignement général : dispenses possibles selon les diplômes détenus, à vérifier auprès du certificateur.</em></p>` : ""}`;
  return buildDocument({ org: o, title: "CV DU CANDIDAT – ORIENTÉ CERTIFICATION", subtitle: `${esc(p.nomComplet)} — ${esc(c.intitule)}`, sections: [
    { heading: "Candidat", content: entete },
    { heading: "Expériences professionnelles et extra-professionnelles", content: experiences + synthese },
    { heading: "Diplômes et formations", content: diplomes },
    { heading: "Rapprochement avec le référentiel de la certification", content: rapprochement, variant: "green" },
    { heading: "Attestation", content: `<p>Je certifie l'exactitude des informations de ce CV ; les justificatifs correspondants sont joints à mon dossier de faisabilité.</p>` },
  ], extraHtml: signatures([sigCandidat(s)]) });
}

// ───────────────────────────── Pièces nominatives ─────────────────────────────

export function genVAEPlanningIndividuel(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const cal = calendrierVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const d = ch.contrat ? frVAE(ch.contrat) : "";
  return buildDocument({ org: o, title: "PLANNING INDIVIDUEL D'ACCOMPAGNEMENT – VAE", subtitle: `${esc(`${s.prenom} ${s.nom}`.trim())} — ${heuresVAE(f)} heures`, table: {
    headers: ["Séance", "Date", "Horaire", "Durée", "Phase", "Contenu"],
    rows: cal.length ? cal.map((x) => [String(x.num), frLongVAE(x.date), x.horaire, `${x.duree} h`, x.phase, esc(x.theme)]) : [["", "", "", "", "", ""], ["", "", "", "", "", ""]],
  }, sections: [
    { heading: "Modalités", content: `<p>Séances individuelles de 2 heures, ${esc(f.modalites)} (${esc((f.lieu || "").trim() || "Google Meet / Zoom")}). Toute modification est convenue avec le candidat et notée dans la fiche de suivi individuel. L'entretien avec le jury est fixé par le certificateur et n'est pas compté dans ce volume.</p>`, variant: "green" },
  ], extraHtml: signatures([sigCandidat(s, d || undefined), sigAccompagnateur(o, f, s, d || undefined)]) });
}

export function genVAEFicheSuiviRecevabilite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const ch = chronoVAE(s, f, o);
  return buildDocument({ org: o, title: "FICHE DE SUIVI DE LA RECEVABILITÉ – VAE", subtitle: `${esc(`${s.prenom} ${s.nom}`.trim())} — ${esc(c.intitule)}`, table: {
    headers: ["Étape", "Date", "Pièce / observation"],
    rows: [
      ["Entretien de faisabilité", ch.entretienFaisabilite ? frVAE(ch.entretienFaisabilite) : "", "Compte rendu signé (indicateur 4)"],
      ["Vérification de complétude avant dépôt", ch.depotFaisabilite ? frVAE(ch.depotFaisabilite) : "", "Appui à la demande de recevabilité"],
      ["Dépôt du dossier de faisabilité par le candidat (vae.gouv.fr)", "", "Accusé de dépôt de la plateforme à joindre"],
      ["Décision de recevabilité", "", `Notification de ${esc(c.certificateur)} à joindre (copie)`],
      ["Validité de la recevabilité", "", "Selon la notification du certificateur"],
    ],
  }, sections: [
    { heading: "Rôle de l'organisme", content: `<p>${esc(o.nom)} aide le candidat à constituer sa demande et classe une copie de la décision. Il ne prononce pas la recevabilité et ne produit aucune pièce au nom du certificateur.</p>`, variant: "green" },
  ] });
}

export function genVAEAccuseRemiseDocuments(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const ch = chronoVAE(s, f, o);
  const d = ch.contrat ? frVAE(ch.contrat) : "";
  const docs = ["Livret d'accueil du candidat", "Règlement intérieur", "Conditions générales de vente", "Programme et séquençage de l'accompagnement", "Planning individuel des séances", "Engagements respectifs", "Informations pratiques et aides"];
  return buildDocument({ org: o, title: "ACCUSÉ DE REMISE DES DOCUMENTS – VAE", subtitle: esc(`${s.prenom} ${s.nom}`.trim()), table: {
    headers: ["Document remis", "Reçu"], rows: docs.map((x) => [x, "☐"]),
  }, sections: [
    { heading: "Déclaration", content: `<p>Je reconnais avoir reçu les documents cochés ci-dessus avant le début de l'accompagnement et en avoir pris connaissance.</p>` },
  ], extraHtml: signatures([sigCandidat(s, d || undefined), sigAccompagnateur(o, f, s, d || undefined)]) });
}

export function genVAESimulationJury(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number, trame = false) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const cal = calendrierVAE(s, f);
  const der = cal[cal.length - 1];
  const crit = ["Présentation du parcours (clarté, durée)", "Liens entre activités et référentiel", "Précision des exemples", "Vocabulaire professionnel", "Réponses aux questions", "Gestion du stress et posture"];
  return buildDocument({ org: o, title: trame ? "GRILLE DE RETOUR – SIMULATION D'ENTRETIEN AVEC LE JURY" : "COMPTE RENDU DE SIMULATION D'ENTRETIEN AVEC LE JURY", subtitle: trame ? esc(c.intitule) : `${esc(`${s.prenom} ${s.nom}`.trim())} — ${esc(c.intitule)}`, table: {
    headers: ["Critère observé", "Acquis", "À consolider", "Conseil"], rows: crit.map((x) => [x, "☐", "☐", ""]),
  }, sections: [
    { heading: "Séance", content: `<p>${!trame && der ? `Mise en situation prévue à la séance ${der.num} du ${frVAE(der.date)}.` : "Date : ____ / ____ / ________"} Les observations sont portées par l'accompagnateur pendant la simulation ; elles ne préjugent pas de la décision du jury.</p>` },
    { heading: "Points forts et axes de travail", content: `<p>${lignes(4)}</p>`, variant: "green" },
  ], extraHtml: trame ? "" : signatures([sigCandidat(s), sigAccompagnateur(o, f, s)]) });
}

export function genVAEAccompagnementConvocation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  return buildDocument({ org: o, title: "PRÉPARATION AU JURY – SUIVI DE LA CONVOCATION ÉMISE PAR LE CERTIFICATEUR", subtitle: `${esc(`${s.prenom} ${s.nom}`.trim())} — ${esc(c.intitule)}`, table: {
    headers: ["Vérification", "Fait", "Observation"],
    rows: [
      ["Convocation reçue du certificateur (copie classée)", "☐", ""],
      ["Date, lieu et modalités de l'entretien relus avec le candidat", "☐", ""],
      ["Pièces demandées par le certificateur rassemblées", "☐", ""],
      ["Demande d'aménagement d'épreuve transmise (si besoin)", s.rqth === "oui" ? "☐" : "Sans objet", ""],
      ["Trajet / connexion préparés", "☐", ""],
    ],
  }, sections: [
    { heading: "Rappel", content: `<p>La convocation est émise par ${esc(c.certificateur)} : ${esc(o.nom)} n'en produit aucune et se limite à aider le candidat à s'y préparer.</p>`, variant: "green" },
  ] });
}

export function genVAESuiviPostJury(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  return buildDocument({ org: o, title: "COMPTE RENDU DE SUIVI APRÈS LE JURY – VAE", subtitle: `${esc(`${s.prenom} ${s.nom}`.trim())} — ${esc(c.intitule)}`, sections: [
    { heading: "Décision communiquée par le candidat", content: `<p>Date de l'entretien avec le jury : ____ / ____ / ________<br>Décision : ☐ Validation totale ☐ Validation partielle ☐ Refus — copie de la notification du certificateur jointe ☐</p><p>Blocs validés : ${lignes(1)}</p>` },
    { heading: "Suite du parcours", content: `<p>${lignes(3)}</p><p><em>En cas de validation partielle, les blocs obtenus sont acquis définitivement ; un plan d'action est proposé pour les blocs restants.</em></p>`, variant: "green" },
  ], extraHtml: signatures([sigAccompagnateur(o, f, s)]) });
}

// ───────────────────────────── Pièces de l'organisme ─────────────────────────────

export function genVAERegistreDiffusion(o: OrganismeInfo, f: FormationInfo) {
  const site = (o.siteWeb || "").trim();
  return buildDocument({ org: o, title: "REGISTRE DE DIFFUSION DE L'INFORMATION – VAE", subtitle: esc(certifVAE(f).intitule), table: {
    headers: ["Support", "Contenu diffusé", "Date de mise en ligne / de mise à jour", "Responsable"],
    rows: [
      [site ? esc(site) : "Site internet (à indiquer)", "Fiche d'information de la prestation VAE (indicateur 1)", "", esc(o.dirigeant)],
      ["Plaquette", "Plaquette de présentation remise avant engagement", "", esc(o.dirigeant)],
      ["Réponse aux demandes", "Courriel type d'introduction au parcours + plaquette", "", esc(o.responsablePedagogique || o.dirigeant)],
      ["vae.gouv.fr", "Référencement de l'organisme accompagnateur", "", esc(o.dirigeant)],
    ],
  }, sections: [
    { heading: "Règle", content: `<p>Chaque mise en ligne ou mise à jour est datée dans ce registre ; les captures d'écran correspondantes sont conservées.</p>`, variant: "green" },
  ] });
}

export function genVAEProcedureIndicateurs(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE DE SUIVI ET DE PUBLICATION DES INDICATEURS DE RÉSULTATS – VAE", sections: [
    { heading: "Indicateurs suivis", content: `<p>Candidats engagés, accompagnements achevés, abandons, satisfaction des candidats (questionnaire de fin d'accompagnement), candidats présentés au jury, validations totales et partielles (décisions notifiées par le certificateur et communiquées par le candidat).</p>` },
    { heading: "Mise à jour", content: `<p>À chaque fin d'accompagnement et à chaque décision de jury connue ; consolidation annuelle dans le tableau de bord. Aucun résultat n'est publié sans parcours achevé : un nouvel entrant le précise.</p>`, variant: "green" },
    { heading: "Publication", content: `<p>Les indicateurs sont publiés sur la fiche d'information de la prestation et ${o.siteWeb ? `sur ${esc(o.siteWeb)}` : "sur le site internet de l'organisme"}.</p>` },
  ] });
}

export function genVAEProcedureAccueilHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ACCUEIL DES CANDIDATS EN SITUATION DE HANDICAP – VAE", sections: [
    { heading: "Repérage", content: `<p>La question du besoin d'adaptation est posée dès l'entretien de faisabilité et rappelée dans le livret d'accueil. Référent handicap : ${esc(o.referentHandicap || o.dirigeant)}.</p>` },
    { heading: "Étapes", content: `<ol><li>Entretien avec le référent handicap (trame dédiée).</li><li>Formalisation des aménagements retenus (rythme, supports, modalité, outils).</li><li>Demande d'aménagement d'épreuve auprès du certificateur si nécessaire.</li><li>Inscription au registre des demandes d'aménagement et bilan en fin d'accompagnement.</li></ol>`, variant: "green" },
    { heading: "Réseau", content: `<p>Agefiph, Cap emploi, ressources handicap de la Région : sollicités au cas par cas (indicateur 26).</p>` },
  ] });
}

export function genVAERegistreAmenagements(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "REGISTRE DES DEMANDES D'AMÉNAGEMENT – VAE", table: {
    headers: ["Date de la demande", "Candidat", "Besoin exprimé", "Aménagement retenu", "Demande au certificateur", "Bilan"],
    rows: [["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""]],
  }, sections: [
    { heading: "Tenue", content: `<p>Registre tenu par le référent handicap (${esc(o.referentHandicap || o.dirigeant)}) ; une ligne par demande, y compris lorsque aucun aménagement n'est finalement nécessaire.</p>`, variant: "green" },
  ] });
}

export function genVAEProcedureEvaluationObjectifs(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ÉVALUATION DE L'ATTEINTE DES OBJECTIFS – VAE", sections: [
    { heading: "Objectifs évalués", content: `<p>Dossier de validation complet et argumenté bloc par bloc ; candidat préparé à l'entretien avec le jury. La certification elle-même est évaluée par le seul jury du certificateur.</p>` },
    { heading: "Outils", content: `<ul><li>Autopositionnement initial (indicateur 4) ;</li><li>fiche de suivi individuel et entretien intermédiaire (indicateur 10) ;</li><li>grille d'analyse du dossier de validation, relectures datées ;</li><li>simulation d'entretien avec le jury (indicateur 16) ;</li><li>bilan de fin d'accompagnement ;</li><li>feuilles d'émargement et relevés de connexion.</li></ul>`, variant: "green" },
  ] });
}

export function genVAERegistreAleas(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "REGISTRE DES ALÉAS ET RUPTURES DE PARCOURS – VAE", table: {
    headers: ["Date", "Candidat", "Aléa / signal d'alerte", "Action engagée", "Issue", "Action d'amélioration"],
    rows: [["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""]],
  }, sections: [
    { heading: "Tenue", content: `<p>Une ligne par absence non prévenue, report, interruption ou abandon ; les causes internes alimentent le tableau d'amélioration continue (indicateur 32).</p>`, variant: "green" },
  ] });
}

export function genVAEProcedureAssistanceTechnique(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ASSISTANCE TECHNIQUE – SÉANCES À DISTANCE", sections: [
    { heading: "Avant la première séance", content: `<p>Envoi du lien (${esc((f.lieu || "").trim() || "Google Meet / Zoom")}) et du courriel d'aide à la connexion ; test de connexion proposé.</p>` },
    { heading: "Pendant une séance", content: `<p>En cas de coupure : rappel par téléphone ou nouveau lien sous 10 minutes ; si la séance ne peut reprendre, elle est reportée et notée dans la fiche de suivi.</p>` },
    { heading: "Contact", content: `<p>Assistance : ${esc(o.email)}${o.telephone?.trim() ? ` — ${esc(o.telephone)}` : ""}, réponse dans la journée ouvrée.</p>`, variant: "green" },
  ] });
}

export function genVAEFormulaireReclamation(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FORMULAIRE DE RÉCLAMATION", sections: [
    { heading: "Réclamant", content: `<p>Nom : ${lignes(1)}<br>Qualité : ☐ Candidat ☐ Employeur ☐ Financeur ☐ Autre<br>Courriel : ${lignes(1)}</p>` },
    { heading: "Objet de la réclamation", content: `<p>${lignes(4)}</p>` },
    { heading: "Traitement (réservé à l'organisme)", content: `<p>Reçue le : ____ / ____ / ________ — accusé de réception sous 48 heures ouvrées<br>Analyse et réponse : ${lignes(2)}<br>Clôturée le : ____ / ____ / ________</p>`, variant: "green" },
  ] });
}

export function genVAERevueDirection(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const v = stagiaires.filter((s) => (s.nom || "").trim());
  const acheves = v.filter((s) => estPasse(parseDateVAE(s.dateFinFormation || f.dateFin))).length;
  return buildDocument({ org: o, title: "COMPTE RENDU DE REVUE DE DIRECTION – VAE", subtitle: "Revue annuelle du système qualité", sections: [
    { heading: "Date et participants", content: `<p>Date : ____ / ____ / ________<br>Participants : ${esc(o.dirigeant)} (dirigeant)${o.referentQualite ? `, ${esc(o.referentQualite)} (référent qualité)` : ""}</p>` },
    { heading: "Données d'entrée", content: `<p>Candidats engagés : ${v.length} ; accompagnements achevés au ${frVAE(aujourdhui())} : ${acheves}. Réclamations, aléas, appréciations des parties prenantes, veilles (indicateurs 23 à 25), analyse des risques (indicateur 32).</p>` },
    { heading: "Analyse et décisions", content: `<p>${lignes(5)}</p>`, variant: "green" },
  ], extraHtml: signatures([sigOrganisme(o)]) });
}

// ───────────────────────────── Pilotage (dossier QUALIOPI) ─────────────────────────────

const NON_APPLICABLES: Record<number, string> = {
  7: "Adéquation du contenu aux exigences d'une certification pour une action de formation : la VAE n'a pas de contenu de formation ; le lien avec la certification est traité aux indicateurs 3, 5 et 16.",
  8: "Positionnement à l'entrée d'une formation : en VAE, l'analyse de l'expérience est faite à l'entretien de faisabilité (indicateur 4, autopositionnement initial).",
  13: "Alternance (apprentissage / contrat de professionnalisation) : non concerné.",
  14: "Exercice de la citoyenneté (CFA) : non concerné.",
  15: "Droits et devoirs de l'apprenti (CFA) : non concerné.",
  20: "Référents mobilité, insertion, handicap propres aux CFA : non concerné.",
  28: "Formations en situation de travail : non concerné.",
  29: "Insertion professionnelle et poursuite d'études (CFA) : non concerné.",
  33: "Indicateur propre aux CFA dans le référentiel 2026 : non concerné.",
};

export function genVAETableauApplicabilite(o: OrganismeInfo) {
  const rows = Array.from({ length: 33 }, (_, i) => i + 1).map((n) => [String(n), NON_APPLICABLES[n] ? "Non applicable" : "Applicable", NON_APPLICABLES[n] || "Pièces classées dans le dossier de l'indicateur"]);
  return buildDocument({ org: o, title: "TABLEAU D'APPLICABILITÉ DES INDICATEURS – VAE", subtitle: "Référentiel national qualité (décret n° 2026-728)", table: { headers: ["Indicateur", "Applicabilité", "Justification / pièces"], rows } });
}

export function genVAENoteNouvelEntrant(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const v = stagiaires.filter((s) => (s.nom || "").trim());
  const acheves = v.filter((s) => estPasse(parseDateVAE(s.dateFinFormation || f.dateFin))).length;
  return buildDocument({ org: o, title: "NOTE DE POSITION – NOUVEL ENTRANT SUR LA VAE", subtitle: esc(certifVAE(f).intitule), sections: [
    { heading: "Situation", content: `<p>Au ${frVAE(aujourdhui())}, ${esc(o.nom)} compte ${v.length} candidat(s) engagé(s) et ${acheves} accompagnement(s) achevé(s) en VAE.</p>` },
    { heading: "Conséquences pour l'audit", content: `<p>Pour un audit initial, les indicateurs 2, 3, 11, 30 et 32 sont présentés avec leur dispositif (procédures, trames, tableaux) sans résultats extrapolés. Les pièces d'exécution n'existent que pour les séances réellement tenues ; les trames TRAME_ classées à la racine de chaque indicateur montrent les outils qui seront utilisés.</p>`, variant: "green" },
  ] });
}

export function genVAENoticeTrames(o: OrganismeInfo, trames: { chemin: string; libelle: string }[]) {
  return buildDocument({ org: o, title: "NOTICE D'UTILISATION DES TRAMES – VAE", table: {
    headers: ["Trame", "Emplacement", "Quand l'utiliser"], rows: trames.map((t) => [esc(t.libelle), esc(t.chemin), "À chaque parcours, à la date de l'étape concernée"]),
  }, sections: [
    { heading: "Principe", content: `<p>Les trames sont des modèles vierges. Une trame remplie devient une pièce nominative : elle est enregistrée dans le sous-dossier Prénom_NOM du candidat de l'indicateur concerné, datée et signée le jour de l'étape. Aucune trame n'est remplie à l'avance.</p>`, variant: "green" },
  ] });
}

export function genVAESommaire(o: OrganismeInfo, entrees: { chemin: string; libelle: string }[]) {
  return buildDocument({ org: o, title: "SOMMAIRE DU DOSSIER QUALIOPI – VAE", table: {
    headers: ["Emplacement", "Pièce"], rows: entrees.map((e) => [esc(e.chemin), esc(e.libelle)]),
  } });
}
