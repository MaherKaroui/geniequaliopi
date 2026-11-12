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
import { buildDocument, formatDate, linkUrl, isFacebookPage, getStagiaireTarif, memePersonne, referentQualiteEstDirigeant } from "../docBuilder";
import { versionReferentiel } from "../typeAudit";
import { orgVersionUlterieure, dateMax } from "../versionUlterieure";
import { referentSignalements, dateV10 } from "../referentielV10";
import { getRNCPByCode } from "../rncpData";
import { formationsIziRealisees, formatDateIzi } from "../attestationIzibusiness";
import { referencesReglementaires, genAnalyseRisquesQualite } from "../qualite2026";
import { mentionTVA } from "../mentionsLegales";
import { estFemme, dirigeanteFem, de } from "../genre";
import {
  certifVAE, profilVAE, calendrierVAE, chronoVAE, heuresVAE, frVAE, frLongVAE, parseDateVAE, estPasse, aujourdhui, graine, isoVAE, ajouterJoursOuvres,
  type SeanceVAE, type CertifVAE,
} from "./vaeProfil";

// ───────────────────────────── Aides communes ─────────────────────────────

const esc = (x: unknown) => String(x ?? "").replace(/</g, "&lt;");
const accompagnateur = (o: OrganismeInfo, f: FormationInfo, s?: StagiaireInfo) => (s?.formateur || f.formateur || o.responsablePedagogique || o.dirigeant || "").trim();
const lieuVAE = (o: OrganismeInfo, f: FormationInfo) => (f.lieu || "").trim() || "visioconférence";
const aDistance = (f: FormationInfo) => /distanciel|distance|visio/i.test(f.modalites || "") && !/pr[ée]sentiel|mixte|hybride/i.test(f.modalites || "");
/** Modalité rédigée : « 100 % à distance (visioconférence) » plutôt que le mot-clé saisi. */
const modaliteVAE = (f: FormationInfo) => {
  const m = (f.modalites || "").trim();
  if (aDistance(f)) return "100 % à distance, en visioconférence";
  if (/mixte|hybride/i.test(m) || (/distanc/i.test(m) && /pr[ée]sentiel/i.test(m))) return "mixte (présentiel et visioconférence)";
  if (/pr[ée]sentiel/i.test(m)) return "en présentiel";
  return m;
};
/** Accord en nombre : « 1 séance réalisée », « 12 séances réalisées ». */
const nb = (n: number, sing: string, plur: string) => `${n} ${n > 1 ? plur : sing}`;
/** Genre du candidat (civilité saisie). */
const femCand = (s: StagiaireInfo) => s.civilite === "Mme";
const leCandidat = (s: StagiaireInfo) => (femCand(s) ? "la candidate" : "le candidat");
const LeCandidat = (s: StagiaireInfo) => (femCand(s) ? "La candidate" : "Le candidat");
const auCandidat = (s: StagiaireInfo) => (femCand(s) ? "à la candidate" : "au candidat");
const duCandidat = (s: StagiaireInfo) => (femCand(s) ? "de la candidate" : "du candidat");
/** Genre d'une personne de l'organisme : civilité du dirigeant s'il s'agit de lui, sinon prénom. */
const femPersonne = (o: OrganismeInfo, nom?: string) => (memePersonne(nom, o.dirigeant) ? dirigeanteFem(o) : estFemme(nom));
const referentDe = (o: OrganismeInfo, nom?: string) => (femPersonne(o, nom) ? "référente" : "référent");
const Referent = (o: OrganismeInfo, nom?: string) => (femPersonne(o, nom) ? "Référente" : "Référent");
const Dirigeant = (o: OrganismeInfo) => (dirigeanteFem(o) ? "La dirigeante" : "Le dirigeant");
/** Accompagnateur ou accompagnatrice (avec article). */
const lAcc = (o: OrganismeInfo, f: FormationInfo, s?: StagiaireInfo) => (femPersonne(o, accompagnateur(o, f, s)) ? "l'accompagnatrice" : "l'accompagnateur");
const Acc = (o: OrganismeInfo, f: FormationInfo, s?: StagiaireInfo) => (femPersonne(o, accompagnateur(o, f, s)) ? "Accompagnatrice" : "Accompagnateur");
/** Première et dernière séances réelles (jours fériés sautés) : dates affichées partout. */
const bornesSeances = (s: StagiaireInfo, f: FormationInfo) => { const cal = calendrierVAE(s, f); return { debut: cal[0]?.date || parseDateVAE(f.dateDebut), fin: cal[cal.length - 1]?.date || parseDateVAE(f.dateFin) }; };
/** Prix contractuel : sans « par candidat » ; mention de TVA selon le régime de l'organisme. */
const prixVAE = (o: OrganismeInfo, tarif: string) => {
  const t = (tarif || "").replace(/\s*(?:par|\/)\s*(?:candidat|candidate|stagiaire|personne|participant|bénéficiaire)s?\b/gi, "").trim();
  // Le montant saisi est conservé tel quel ; seule la mention de TVA est ajoutée selon le régime de l'organisme.
  if (o.regimeTva === "assujetti") return /TTC/i.test(t) ? `${t} (TVA au taux en vigueur incluse)` : `${t}, TVA au taux en vigueur en sus`;
  return /261-4|TVA non applicable|exon/i.test(t) ? t : `${t} (TVA non applicable, art. 261-4-4° a du CGI)`;
};
/** « le ministère de… » : certificateur précédé de son article. */
const leCertificateur = (c: CertifVAE) => (/^minist[eè]re/i.test(c.certificateur) ? `le m${c.certificateur.slice(1)}` : c.certificateur);
const telOrg = (o: OrganismeInfo) => (o.telephone?.trim() ? ` – ${o.telephone.trim()}` : "");
const dateSysteme = (o: OrganismeInfo) => frVAE(parseDateVAE(o.dateMaj) || aujourdhui());
const anneeSysteme = (o: OrganismeInfo) => (parseDateVAE(o.dateMaj) || aujourdhui()).getFullYear();

function img(url?: string, alt = "signature") {
  return url ? `<img src="${url}" alt="${alt}" style="max-height:60px;max-width:180px;margin-top:6px">` : `<div style="height:55px"></div>`;
}

/** Bloc de signatures sans signature simulée : image réelle ou case vide ; organisme : tampon seul s'il existe, sinon signature. */
function signatures(parts: { label: string; nom: string; date?: string; sig?: string; tampon?: string }[]): string {
  return `<div class="signature-block-2">${parts.map((p) => `<div class="sig-box"><p class="sig-label">${p.label}</p><p>Nom : ${esc(p.nom) || "________________________"}</p><p>Date : ${p.date || "____ / ____ / ________"}</p><p style="margin-top:20px">Signature :</p>${p.tampon ? img(p.tampon, "cachet") : img(p.sig)}</div>`).join("")}</div>`;
}

const sigCandidat = (s: StagiaireInfo, date?: string) => ({ label: LeCandidat(s), nom: `${s.prenom} ${s.nom}`, date, sig: s.signatureUrl });
const sigOrganisme = (o: OrganismeInfo, date?: string) => ({ label: `Pour ${o.nom}, ${Dirigeant(o).toLowerCase()}`, nom: o.dirigeant, date, sig: o.signatureUrl, tampon: o.tamponUrl });
/** Signature de l'accompagnateur : la sienne ; s'il est le dirigeant, son tampon à défaut, sinon sa signature. */
const sigAccUrl = (o: OrganismeInfo, f: FormationInfo, s?: StagiaireInfo) =>
  s?.formateurSignatureUrl || f.formateurSignatureUrl || (memePersonne(accompagnateur(o, f, s), o.dirigeant) ? o.tamponUrl || o.signatureUrl : undefined);
const sigAccompagnateur = (o: OrganismeInfo, f: FormationInfo, s: StagiaireInfo, date?: string) => ({ label: `L'${Acc(o, f, s).toLowerCase()} VAE`, nom: accompagnateur(o, f, s), date, sig: sigAccUrl(o, f, s) });
/** Date de la dernière séance réalisée (case vide si aucune). */
const derniereFaite = (cal: SeanceVAE[]) => { const x = cal.filter((r) => r.realisee).pop(); return x ? frVAE(x.date) : undefined; };
/** Pièces système : visées par le dirigeant (tampon ou signature, via buildDocument). */
const sigSysteme = (o: OrganismeInfo) => ({ type: "1" as const, labels: [Dirigeant(o)], names: [o.dirigeant], dates: [dateSysteme(o)] });
/** Pièces qualité (veille, réclamations, amélioration) : référent qualité et dirigeant ; date = dernière mise à jour de la pièce. */
const sigQualite = (o: OrganismeInfo, date = dateSysteme(o)) => referentQualiteEstDirigeant(o)
  ? { type: "1" as const, labels: [`${Dirigeant(o)}, ${referentDe(o, o.dirigeant)} qualité`], names: [o.dirigeant], dates: [date] }
  : { type: "2" as const, labels: ["Le référent qualité", Dirigeant(o)], names: [o.referentQualite || o.dirigeant, o.dirigeant], dates: [date, date] };
/** V10 (IND 12) : rappel de la procédure violences / harcèlement / discriminations dans les pièces remises au candidat. */
const rappelViolences = (o: OrganismeInfo) => versionReferentiel(o) !== "V10" ? "" :
  `Toute situation de violence, y compris sexiste ou sexuelle, de harcèlement ou de discrimination peut être signalée de façon confidentielle à ${esc(referentSignalements(o))}${o.email ? ` (${esc(o.email)}${telOrg(o)})` : ""}, ${femPersonne(o, referentSignalements(o)) ? "référente chargée" : "référent chargé"} des signalements. La procédure de prévention et de traitement est remise avec le présent document ; chaque signalement est inscrit au registre des signalements.`;

const valides = (stagiaires: StagiaireInfo[]) => stagiaires.filter((s) => (s.nom || "").trim());
/** Pièce citant le référentiel 2026 (IND 12, 27, 32) : version ultérieure datée de sa mise à jour V10, jamais une V1 antérieure au décret. */
const orgV10 = (o: OrganismeInfo) => (versionReferentiel(o) === "V10" ? orgVersionUlterieure(o, dateV10(o)) : o);
/** Pièce arrêtée à une date (registre, synthèse, tableau d'amélioration) : version ultérieure datée de ce jour. */
const orgAu = (o: OrganismeInfo, d: Date) => orgVersionUlterieure(o, isoVAE(d));
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
    { heading: "Informations pratiques", content: `<p><strong>Durée :</strong> ${esc(f.duree)}<br><strong>Modalités :</strong> ${esc(modaliteVAE(f))} — ${esc(lieuVAE(o, f))}<br><strong>Tarif :</strong> ${esc(f.tarif)}<br><strong>Financement :</strong> financement personnel<br><strong>Délai d'accès :</strong> ${esc(f.delaiAcces)}<br><strong>Contact :</strong> ${esc(o.email)}${telOrg(o)}<br><strong>${Referent(o, o.responsablePedagogique)} VAE :</strong> ${esc(o.responsablePedagogique)}<br><strong>${Referent(o, o.referentHandicap)} handicap :</strong> ${esc(o.referentHandicap)}</p>`, variant: "green" },
    { heading: "Accessibilité", content: `<p>L'accompagnement est accessible aux personnes en situation de handicap : rythme, supports et modalités sont adaptés sur demande auprès ${femPersonne(o, o.referentHandicap) ? "de la référente" : "du référent"} handicap (${esc(o.referentHandicap)}).</p>` },
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
      ["Modalités et délais d'accès", `${esc(modaliteVAE(f))} — ${esc(f.delaiAcces)}`],
      ["Tarif", esc(f.tarif)],
      ["Contacts", `${esc(o.email)}${telOrg(o)} — ${referentDe(o, o.responsablePedagogique)} VAE : ${esc(o.responsablePedagogique)}`],
      ["Méthodes mobilisées", esc(f.moyensPedagogiques)],
      ["Modalités d'évaluation", `${esc(f.methodesEvaluation)} La certification est délivrée par le jury du certificateur (${esc(c.certificateur)}).`],
      ["Accessibilité handicap", `Aménagements sur demande — ${referentDe(o, o.referentHandicap)} handicap : ${esc(o.referentHandicap)}`],
      ["Certification", certifLigne(c)],
    ],
  }, sections: [
    { heading: "Supports de diffusion", content: `<p>${o.siteWeb ? `${isFacebookPage(o.siteWeb) ? "Page Facebook" : "Site internet"} : ${linkUrl(o.siteWeb)}<br>` : ""}Plaquette remise avant tout engagement ; fiche transmise par courriel à chaque demande ; présentation lors de l'entretien de faisabilité.</p>` },
  ] });
}

export function genVAEProcedureInfo(o: OrganismeInfo) {
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "PROCÉDURE D'INFORMATION DU PUBLIC – VAE", sections: [
    { heading: "Objet", content: `<p>Garantir une information accessible, détaillée et vérifiable sur l'offre d'accompagnement VAE ${esc(de(o.nom))} (indicateur 1).</p>` },
    { heading: "Canaux", content: `<p>${o.siteWeb ? `• ${isFacebookPage(o.siteWeb) ? "Page Facebook" : "Site internet"} : ${linkUrl(o.siteWeb)}<br>` : ""}• Plaquette et fiche d'information VAE<br>• Réponse écrite à chaque demande sous 48 heures ouvrées<br>• Relais : conseillers en évolution professionnelle, France Travail, OPCO, plateforme vae.gouv.fr</p>` },
    { heading: "Contenu obligatoire", content: `<p>Prérequis (expérience en rapport direct avec la certification, sans durée minimale), objectifs, durée, modalités et délais d'accès, tarif, contacts, méthodes, modalités d'évaluation (jury du certificateur), accessibilité, certification visée (intitulé, code RNCP, certificateur, date d'échéance de l'enregistrement).</p>`, variant: "green" },
    { heading: "Mise à jour", content: `<p>Revue au moins annuelle et à chaque évolution réglementaire ou de la fiche RNCP. Dernière mise à jour : ${dateSysteme(o)}.</p>` },
  ] });
}

/** Dossiers de validation déposés (date passée) par les candidats du dossier. */
function depotsValidation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): Date[] {
  return valides(stagiaires).map((s) => chronoVAE(s, f, o).depotValidation).filter((d): d is Date => !!d && estPasse(d));
}
/** « 1 dossier de validation déposé le 10/08/2026 » / « 3 dossiers de validation déposés » ; vide si aucun. */
function texteDepots(depots: Date[]): string {
  if (!depots.length) return "";
  return depots.length === 1 ? `1 dossier de validation déposé le ${frVAE(depots[0])}` : `${depots.length} dossiers de validation déposés`;
}

interface Resultats { inscrits: number; acheves: number; enCours: number; satisfaction: string; nbAvis: number }
function resultatsVAE(f: FormationInfo, stagiaires: StagiaireInfo[]): Resultats {
  const v = valides(stagiaires);
  const acheves = v.filter((s) => estPasse(parseDateVAE(s.dateFinFormation || f.dateFin)));
  const repondus = acheves.map((s) => satisfactionNotes(s, f)).filter((n) => n.length);
  const notes = repondus.flat();
  const moy = notes.length ? (notes.reduce((a, b) => a + b, 0) / notes.length) : 0;
  return { inscrits: v.length, acheves: acheves.length, enCours: v.length - acheves.length, satisfaction: notes.length ? `${moy.toFixed(1).replace(".", ",")}/5` : "—", nbAvis: repondus.length };
}

export function genVAEIndicateursResultats(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const r = resultatsVAE(f, stagiaires);
  const saisis = (f.tauxSatisfaction || "").trim();
  const jour = frVAE(aujourdhui());
  const depots = texteDepots(depotsValidation(o, f, stagiaires));
  return buildDocument({ org: o, title: "INDICATEURS DE RÉSULTATS – ACCOMPAGNEMENT VAE", subtitle: `Arrêtés au ${jour}`, table: {
    headers: ["Indicateur", "Valeur", "Source / mode de calcul"],
    rows: [
      ["Candidats accompagnés (contrats signés)", String(r.inscrits), "Contrats et conventions d'accompagnement"],
      ["Accompagnements achevés", String(r.acheves), "Date de dernière séance ≤ date du jour"],
      ["Accompagnements en cours", String(r.enCours), "Calendrier des séances"],
      ["Satisfaction des candidats (fin d'accompagnement)", saisis ? `${esc(saisis)}${f.nombreAvisSatisfaction ? ` (${esc(f.nombreAvisSatisfaction)} avis)` : ""}` : r.nbAvis ? `${r.satisfaction} (${r.nbAvis} avis)` : r.acheves ? `Mesurée par le questionnaire de fin d'accompagnement ; ${nb(r.acheves, "accompagnement achevé", "accompagnements achevés")} au ${jour} ; taux publié à partir des seules réponses signées, sans extrapolation` : `Aucun accompagnement achevé au ${jour} ; mesure par le questionnaire de fin d'accompagnement`, "Questionnaires de fin d'accompagnement"],
      ["Taux de validation totale / partielle", f.nbPresentesCertification ? `${esc(f.nbAdmisCertification || "0")} / ${esc(f.nbPresentesCertification)} présentés` : `0 décision notifiée au ${jour}${depots ? ` (${depots})` : ""} ; taux calculé dès la première décision du certificateur`, "Décisions notifiées par le certificateur"],
    ],
  }, sections: [
    { heading: "Diffusion", content: `<p>Ces indicateurs sont publiés sur les supports d'information et mis à jour à chaque fin d'accompagnement et à chaque décision de jury communiquée par un candidat. ${r.acheves === 0 ? `<strong>${esc(o.nom)} est nouvel entrant sur la VAE :</strong> aucun accompagnement n'est encore achevé ; les indicateurs seront publiés dès les premiers résultats, sans extrapolation.` : ""}</p>`, variant: "green" },
  ] });
}

export function genVAEPresentationNouvelEntrant(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const c = certifVAE(f);
  const r = resultatsVAE(f, stagiaires);
  const v = valides(stagiaires);
  const fem = v.length > 0 && v.every(femCand);
  const b = bornesSeances(v[0] || cand(stagiaires, 0), f);
  return buildDocument({ org: o, title: "PRÉSENTATION DE L'ACTIVITÉ VAE", subtitle: c.intitule, sections: [
    { heading: "Activité", content: `<p><strong>Action :</strong> accompagnement à la validation des acquis de l'expérience (article L.6313-1, 3° du Code du travail).<br><strong>Certification :</strong> ${certifLigne(c)}</p>${alerteFiche(c)}` },
    { heading: "Situation au " + frVAE(aujourdhui()), content: `<p>${nb(r.inscrits, fem ? "candidate engagée" : "candidat engagé", fem ? "candidates engagées" : "candidats engagés")}, ${nb(r.acheves, "accompagnement achevé", "accompagnements achevés")}, ${r.enCours} en cours. ${r.acheves === 0 ? "Aucun résultat historique n'est communiqué : l'organisme est nouvel entrant sur ce périmètre." : ""}</p>` },
    { heading: "Organisation de l'accompagnement", content: `<p>${heuresVAE(f)} heures en séances individuelles de 2 heures (${esc(modaliteVAE(f))}, ${esc(lieuVAE(o, f))}), réparties entre le ${frVAE(b.debut)} et le ${frVAE(b.fin)} : lancement, description des activités bloc par bloc, portefeuille de preuves, préparation à l'entretien avec le jury.</p>` },
    { heading: "Blocs de compétences du référentiel", content: blocsTable(c) },
    { heading: "Dispositif de suivi", content: `<p>Nombre de candidats, abandons, satisfaction, candidats présentés au jury, validations totales et partielles : suivis dans le tableau des indicateurs (Excel), mis à jour à chaque fin d'accompagnement et à chaque décision de jury notifiée.</p>`, variant: "green" },
  ] });
}

export function genVAETauxCertification(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const c = certifVAE(f);
  const presentes = (f.nbPresentesCertification || "").trim();
  const depots = texteDepots(depotsValidation(o, f, stagiaires));
  return buildDocument({ org: o, title: "TAUX D'OBTENTION DE LA CERTIFICATION – VAE", subtitle: c.intitule, table: {
    headers: ["Certification", "Code", "Certificateur", "Candidats présentés", "Validations (totales ou partielles)", "Taux"],
    rows: [[esc(c.intitule), esc(c.code), esc(c.certificateur), presentes || "0", presentes ? esc(f.nbAdmisCertification || "0") : "0",
      presentes && +presentes > 0 ? `${Math.round((+(f.nbAdmisCertification || 0) / +presentes) * 100)} %` : `Non calculable au ${frVAE(aujourdhui())} : aucun candidat encore présenté au jury${depots ? ` (${depots})` : ""}`]],
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
    { heading: "Rôle de chacun", content: `<p><strong>Le certificateur</strong> (${esc(c.certificateur)}) se prononce sur la recevabilité, organise le jury et délivre la certification. <strong>${esc(o.nom)}</strong> accompagne le candidat : l'organisme ne décide ni de la recevabilité ni de la validation.</p>`, variant: "green" },
  ] });
}

// ───────────────────────────── CRITÈRE 2 ─────────────────────────────

export function genVAEProcessAnalyseBesoin(o: OrganismeInfo) {
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "PROCESSUS D'ANALYSE DU BESOIN – VAE", sections: [
    { heading: "Étapes", content: `<ol><li><strong>Premier contact</strong> : envoi de la plaquette et de la fiche d'information, proposition d'un entretien de faisabilité gratuit.</li><li><strong>Entretien de faisabilité</strong> (1 heure) : parcours, activités exercées, projet, contraintes, besoins d'adaptation (dont handicap), financement.</li><li><strong>Analyse au regard du référentiel</strong> : chaque bloc professionnel est rapproché des activités décrites ; l'avis est argumenté (favorable, favorable avec vigilance, réorientation).</li><li><strong>Restitution écrite</strong> au candidat (compte rendu d'entretien de faisabilité) et aide au dépôt du dossier de faisabilité sur la plateforme France VAE (vae.gouv.fr).</li><li><strong>Contractualisation</strong> : contrat d'accompagnement signé par le candidat avant tout règlement (financement personnel).</li></ol>` },
    { heading: "Prise en compte de l'employeur", content: `<p>Lorsque le candidat est salarié et sollicite un congé VAE, ses contraintes d'emploi sont prises en compte dans le calendrier ; le candidat reste seul auteur de son dossier de validation.</p>`, variant: "green" },
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
    { heading: "Rapprochement avec le référentiel", content: `<table><thead><tr><th>Bloc</th><th>Activités décrites par ${leCandidat(s)}</th><th>Couverture estimée</th></tr></thead><tbody>${p.couverture.map((x) => `<tr><td>${esc(x.bloc.titre)}</td><td>${x.activites.map((a) => "• " + esc(a)).join("<br>")}</td><td>${x.niveau}</td></tr>`).join("")}</tbody></table>${dispenseGeneraux(c, p.diplome)}`, variant: "green" },
    { heading: "Projet et besoins", content: `<p><strong>Motivation :</strong> ${esc(p.motivation)}.<br><strong>Projet :</strong> ${esc(p.projet)}.<br><strong>Disponibilités :</strong> ${esc(p.disponibilites)}.<br><strong>Adaptation liée à un handicap :</strong> ${p.rqth ? `oui — orientation vers ${femPersonne(o, o.referentHandicap) ? "la référente" : "le référent"} handicap (${esc(o.referentHandicap)}) pour définir les aménagements` : "non signalée"}.<br><strong>Financement envisagé :</strong> ${esc(p.financeur)}.</p>` },
    { heading: "Avis de faisabilité", content: `<p><strong>${esc(p.avis)}</strong></p><p>Suite : dépôt par ${leCandidat(s)} du dossier de faisabilité sur la plateforme France VAE (vae.gouv.fr) le ${frVAE(ch.depotFaisabilite)}, puis accompagnement de ${heuresVAE(f)} heures dès la signature du contrat. La recevabilité relève du seul certificateur.</p>` },
  ], extraHtml: signatures([sigAccompagnateur(o, f, s, d), sigCandidat(s, d)]) });
}

/** Blocs d'enseignement général : dispense demandée dans le dossier de faisabilité, au vu du diplôme déclaré. */
function dispenseGeneraux(c: CertifVAE, diplome: string): string {
  const gen = c.blocs.filter((b) => !b.professionnel);
  if (!gen.length) return "";
  const codes = gen.map((b) => b.code.replace(/^RNCP\d+/i, ""));
  const connu = diplome && !/non renseign/i.test(diplome);
  return `<p><em>Blocs d'enseignement général (${esc(codes.length > 1 ? `${codes[0]} à ${codes[codes.length - 1]}` : codes[0])}) : dispense sollicitée auprès du certificateur dans le dossier de faisabilité, au vu ${connu ? `du diplôme détenu : ${esc(diplome)}` : "des diplômes détenus"}.</em></p>`;
}

/** Libellés propres à la situation de travail (salarié, indépendant, demandeur d'emploi). */
function cadreVAE(p: ReturnType<typeof profilVAE>) {
  const ind = p.cadre === "independant", dem = p.cadre === "demandeur";
  return {
    structureTableau: p.structure !== "—" ? p.structure : ind ? "En nom propre" : "Structures employeuses successives",
    structureTexte: p.structure !== "—" ? p.structure : ind ? "mon activité indépendante" : "mes emplois précédents",
    justificatifs: ind ? "avis de situation au répertoire SIRENE, factures, attestations de clients" : dem ? "certificats de travail, attestations d'employeurs, attestation France Travail" : "bulletins de salaire, attestations d'employeur",
  };
}

/** Fiche de préparation du dossier de faisabilité (remplace l'ancien « Livret 1 – recevabilité »). */
export function genVAEDossierFaisabilite(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const naissance = parseDateVAE(s.dateNaissance);
  const cv = cadreVAE(p);
  const debutExp = new Date((parseDateVAE(f.dateDebut) || aujourdhui()).getFullYear() - p.anneesLien, 0, 1).getFullYear();
  return buildDocument({ org: o, title: "DOSSIER DE FAISABILITÉ VAE", subtitle: `${esc(p.nomComplet)} — dépôt sur France VAE (vae.gouv.fr)`, sections: [
    { heading: `1. Identité ${duCandidat(s)}`, content: `<p>${esc(p.civ)} ${esc(p.nomComplet)}${naissance ? ` — né${s.civilite === "Mme" ? "e" : ""} le ${frVAE(naissance)}` : ""}<br>Courriel : ${esc(s.email)}${s.telephone?.trim() ? ` — Téléphone : ${esc(s.telephone)}` : ""}${s.adresse ? `<br>Adresse : ${esc(s.adresse)}, ${esc((s.codePostal || "").trim())} ${esc(s.commune || "")}` : ""}<br>Situation : ${esc(p.situation)}<br>Dernier diplôme : ${esc(p.diplome)}</p>` },
    { heading: "2. Certification visée", content: `<p>${certifLigne(c)}</p>${alerteFiche(c)}` },
    { heading: "3. Expérience en rapport avec la certification", content: `<table><thead><tr><th>Période</th><th>Emploi</th><th>Structure</th><th>Statut</th></tr></thead><tbody><tr><td>${debutExp} – aujourd'hui</td><td>${esc(p.poste)}</td><td>${esc(cv.structureTableau)}</td><td>${esc(p.statut)}</td></tr></tbody></table><p>Environ ${p.anneesLien} ans d'expérience en rapport direct avec la certification, sur la période indiquée ci-dessus.</p>` },
    { heading: "4. Activités exercées en rapport avec chaque bloc", content: `<table><thead><tr><th>Bloc visé</th><th>Activités que j'exerce</th><th>Couverture</th></tr></thead><tbody>${p.couverture.map((x) => `<tr><td>${esc(x.bloc.titre)}</td><td>${x.activites.map((a) => "• " + esc(a)).join("<br>")}</td><td>${x.niveau}</td></tr>`).join("")}</tbody></table>` },
    { heading: "5. Motivation et projet", content: `<p><strong>Pourquoi je demande cette certification :</strong> ${esc(p.motivation)}.<br><strong>Mon projet professionnel :</strong> ${esc(p.projet)}.<br><strong>Financement :</strong> ${esc(p.financeur)}.</p>` },
    { heading: "6. Pièces jointes", content: `<p>☒ Pièce d'identité ☒ Justificatifs d'activité (${cv.justificatifs}) ☒ Diplômes et attestations de formation ☒ CV détaillé</p>` },
    { heading: "7. Attestation sur l'honneur et dépôt", content: `<p>Je soussigné${s.civilite === "Mme" ? "e" : ""} ${esc(p.nomComplet)} certifie l'exactitude des informations du présent dossier et n'avoir déposé qu'une demande pour cette certification cette année.</p><p>Dossier déposé sur la plateforme France VAE (vae.gouv.fr) le ${frVAE(ch.depotFaisabilite)}. La décision de recevabilité relève du certificateur (${esc(c.certificateur)}).</p>`, variant: "green" },
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
    { heading: "Attentes", content: `<p><strong>Objectif :</strong> ${esc(p.motivation)}.<br><strong>Projet :</strong> ${esc(p.projet)}.<br><strong>Points d'appui :</strong> ${p.couverture.filter((x) => x.niveau === "Complète").map((x) => esc(x.bloc.titre)).join(" ; ") || "activités exercées dans chaque bloc professionnel"}.<br><strong>Points de vigilance :</strong> ${p.blocsVigilance.length ? p.blocsVigilance.map(esc).join(" ; ") : "aucun bloc identifié comme fragile"}.</p>` },
    { heading: "Financement", content: `<p>${box(p.financeur === "CPF")} CPF ${box(p.financeur === "Employeur / OPCO")} Employeur / OPCO ${box(p.financeur === "France Travail")} France Travail ${box(p.financeur === "Personnel")} Personnel ${box(p.financeur === "Région / autre")} Autre</p>${p.contratAvecEmployeur ? `<p>Attentes de l'employeur (${esc(s.entreprise)}) : reconnaissance des compétences exercées dans le poste de ${esc(p.poste)} ; elles sont reprises dans la convention tripartite.</p>` : ""}` },
    { heading: "Handicap et adaptations", content: `<p>${box(!p.rqth)} Aucun besoin signalé ${box(p.rqth)} Besoin d'aménagement : entretien avec ${femPersonne(o, o.referentHandicap) ? "la référente" : "le référent"} handicap (${esc(o.referentHandicap)}) avant la première séance.</p>` },
    { heading: "Organisation retenue", content: `<p>${heuresVAE(f)} heures en séances individuelles de 2 heures, ${esc(modaliteVAE(f))} (${esc(lieuVAE(o, f))}), du ${frVAE(ch.debut)} au ${frVAE(ch.fin)} ; disponibilités : ${esc(p.disponibilites.toLowerCase())}.</p>`, variant: "green" },
  ], extraHtml: signatures([sigCandidat(s, d), sigAccompagnateur(o, f, s, d)]) });
}

/** Phases du calendrier réel (lancement, rédaction bloc par bloc, portefeuille, préparation au jury) avec leurs heures. */
function phasesVAE(cal: SeanceVAE[]): { label: string; heures: number; seances: number[]; themes: string[] }[] {
  const out: { label: string; heures: number; seances: number[]; themes: string[] }[] = [];
  for (const x of cal) {
    const label = /portefeuille/i.test(x.theme) ? "Portefeuille de preuves" : x.phase === "Dossier de validation" ? "Rédaction du dossier de validation, bloc par bloc" : x.phase;
    const theme = x.theme.replace(/^Description des activités — /, "").replace(/\s*\(séance \d+\)$/, "");
    const der = out[out.length - 1];
    if (der && der.label === label) { der.heures += x.duree; der.seances.push(x.num); if (!der.themes.includes(theme)) der.themes.push(theme); }
    else out.push({ label, heures: x.duree, seances: [x.num], themes: [theme] });
  }
  return out;
}
const seancesTxt = (n: number[]) => (n.length > 2 ? `séances ${n[0]} à ${n[n.length - 1]}` : n.length === 2 ? `séances ${n[0]} et ${n[1]}` : `séance ${n[0]}`);

/** Programme contractuel : texte saisi si ses heures font le total, sinon programme tiré du calendrier réel. */
function programmeContrat(f: FormationInfo, cal: SeanceVAE[]): string {
  const saisi = (f.programme || "").trim();
  const heures = [...saisi.matchAll(/(\d+(?:[.,]\d+)?)\s*h(?![a-zé])/gi)].reduce((a, m) => a + parseFloat(m[1].replace(",", ".")), 0);
  if (saisi && (heures === 0 || Math.round(heures) === heuresVAE(f))) return `<p>${esc(saisi).replace(/\n\s*/g, "<br>")}</p>`;
  if (!cal.length) return "<p>Analyse du parcours et du référentiel ; choix des activités et preuves ; aide méthodologique à la rédaction du dossier ; préparation à l'entretien avec le jury ; bilan de l'accompagnement.</p>";
  const min = (a: string) => (/^[A-ZÀ-Ý][a-zà-ÿ]/.test(a) ? a.charAt(0).toLowerCase() + a.slice(1) : a);
  return `<ul>${phasesVAE(cal).map((p) => `<li><strong>${esc(p.label)} (${p.heures} h, ${seancesTxt(p.seances)})</strong> : ${esc(p.themes.map(min).join(" ; "))}.</li>`).join("")}</ul>`;
}

/** Une seule pièce contractuelle complète, choisie selon la présence d'une entreprise. */
export function genVAEContrat(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const d = frLongVAE(ch.contrat || aujourdhui());
  const tarif = prixVAE(o, getStagiaireTarif(s, f));
  const cal = calendrierVAE(s, f);
  const leC = leCandidat(s), LeC = LeCandidat(s), auC = auCandidat(s), duC = duCandidat(s);
  const il = femCand(s) ? "elle" : "il";
  // Règle : entreprise renseignée → convention tripartite ; sans entreprise → contrat (le financeur ne décide pas).
  const tripartite = !!s.entreprise?.trim();
  const titre = tripartite ? "CONVENTION D'ACCOMPAGNEMENT VAE (TRIPARTITE)" : "CONTRAT D'ACCOMPAGNEMENT VAE";
  const adresseCandidat = [s.adresse?.trim(), [s.codePostal, s.commune].filter(x => x?.trim()).map(x => x!.trim()).join(" ")].filter(Boolean).join(", ");
  const parties = `<p><strong>L'organisme accompagnateur :</strong> ${esc(o.nom)}, SIRET ${esc(o.siret)}, ${esc(o.adresse)}, ${esc(o.codePostal)} ${esc(o.ville)}${o.nda ? `, déclaration d'activité n° ${esc(o.nda)} (cet enregistrement ne vaut pas agrément de l'État)` : ""}, représenté par ${esc(o.dirigeant)}${o.email ? ` ; courriel : ${esc(o.email)}` : ""}.</p><p><strong>${LeC} :</strong> ${esc(p.civ)} ${esc(p.nomComplet)}${adresseCandidat ? `, domicilié${/^(mme|madame|mlle)/i.test(s.civilite || "") ? "e" : ""} ${esc(adresseCandidat)}` : ""}${s.email ? ` ; courriel : ${esc(s.email)}` : ""}.</p>${tripartite ? `<p><strong>L'entreprise :</strong> ${esc(s.entreprise)}${s.siretEntreprise ? `, SIRET ${esc(s.siretEntreprise)}` : ""}${s.adresseEntreprise ? `, ${esc(s.adresseEntreprise)}` : ""}${s.responsableEntreprise ? `, représentée par ${esc(s.responsableEntreprise)}` : ""}${s.emailResponsable ? ` ; courriel : ${esc(s.emailResponsable)}` : ""}.</p>` : ""}`;
  const cpf = p.financeur === "CPF";
  const personnel = p.financeur === "Personnel";
  const financement = cpf
    ? `<p>Financement CPF : commande sur Mon Compte Formation. Les montants pris en charge, la participation obligatoire éventuelle, le reste à payer et les règlements sont ceux confirmés sur la plateforme. Les conditions générales de la plateforme régissent la commande, le paiement, l'annulation et les remboursements. Aucun double paiement des mêmes prestations ne peut être demandé.${tripartite ? " La présence de l'entreprise ne vaut pas engagement de paiement supplémentaire : tout complément employeur doit être accepté par écrit." : ""}</p>`
    : personnel
      ? `<p>Financement personnel. Aucune somme ne peut être exigée avant l'expiration du délai de rétractation. Après ce délai, l'acompte demandé ne dépasse pas 30 % du prix ; le solde est échelonné au fur et à mesure du déroulement de l'accompagnement (article L.6353-6 du Code du travail). Aucun paiement intégral anticipé n'est exigé.</p>`
      : tripartite
        ? `<p>L'entreprise s'engage à régler le prix convenu, sous réserve des prises en charge effectivement accordées par son OPCO ou un autre financeur. Une subrogation de paiement nécessite un accord écrit. En l'absence de prise en charge, ou pour la part non couverte, l'entreprise reste redevable ; aucune somme n'est reportée automatiquement sur ${leC}. Facturation au fur et à mesure des prestations réalisées, sur présentation des justificatifs de réalisation.</p>`
        : `<p>Financement déclaré : ${esc(p.financeur)}. La prise en charge et les modalités de règlement sont subordonnées à l'accord écrit du financeur. Aucun reste à charge n'est présumé : une part de financement personnel doit être expressément acceptée par ${leC} et respecte les articles L.6353-5 et L.6353-6 du Code du travail.</p>`;
  const retrait = tripartite
    ? `<p>La convention lie l'organisme, l'entreprise et ${leC}. Toute annulation ou modification est notifiée par écrit aux autres parties ; le financement CPF éventuel reste soumis aux conditions de Mon Compte Formation. Aucun délai légal de rétractation propre au contrat de financement personnel n'est présenté comme applicable à l'entreprise.</p>`
    : `<p>${personnel ? `${LeC}, qui entreprend l'accompagnement à titre individuel et à ses frais, dispose` : `Lorsque ${leC} entreprend l'accompagnement à titre individuel et à ses frais, ${il} dispose`} d'un <strong>délai de rétractation de 10 jours</strong> à compter de la signature (article L.6353-5 du Code du travail), exercé par lettre recommandée avec avis de réception à l'adresse de l'organisme indiquée à l'article 1. Aucun paiement n'est exigible pendant ce délai.${cpf ? " Pour la commande CPF, les conditions et délais de rétractation de Mon Compte Formation s'appliquent ; le délai de 11 jours ouvrés avant l'entrée en accompagnement est un délai de commande, non un délai de rétractation." : ""} Les droits applicables aux contrats conclus à distance ou hors établissement demeurent réservés lorsque leurs conditions sont réunies.</p>`;
  const paragraphes = (text: string) => `<p>${esc(text).replace(/\n/g, "<br>")}</p>`;
  return buildDocument({ org: o, title: titre, subtitle: esc(p.nomComplet), sections: [
    { heading: "Article 1 – Parties et cadre juridique", content: `${parties}<p>Action de validation des acquis de l'expérience au sens de l'article L.6313-1, 3°, du Code du travail, des articles L.6411-1 et suivants et R.6412-1 et suivants.${tripartite ? " La présente convention fixe les engagements des trois parties." : ` Le présent contrat est conclu avant l'inscription définitive et tout règlement ; les articles L.6353-3 à L.6353-7 s'appliquent${personnel ? `, l'accompagnement étant entrepris à titre individuel et aux frais ${duC}` : ` lorsque l'accompagnement est entrepris à titre individuel et aux frais ${duC}`}.`}</p>` },
    { heading: "Article 2 – Objet et certification visée", content: `<p>Accompagnement méthodologique ${duC} dans la préparation de son dossier de validation et de son entretien avec le jury, en vue de la certification ${certifLigne(c)}. La recevabilité, l'organisation du jury et la décision de validation relèvent exclusivement du certificateur. L'organisme ne garantit ni recevabilité ni obtention de la certification ; une validation totale ou partielle est possible.</p>` },
    { heading: "Article 3 – Objectifs et conditions d'accès", content: `${f.objectifs.trim() ? paragraphes(f.objectifs) : "<p>Identifier les acquis de l'expérience, les rapprocher du référentiel, constituer le dossier de validation et préparer leur présentation au jury.</p>"}${f.prerequis.trim() ? `<p><strong>Prérequis :</strong> ${esc(f.prerequis)}</p>` : ""}${/durée minimale/i.test(f.prerequis) ? "<p>Les conditions propres à la certification sont vérifiées avec le certificateur.</p>" : "<p>L'expérience présentée doit être en rapport direct avec la certification. Aucune durée minimale d'expérience n'est exigée ; les conditions propres à la certification sont vérifiées avec le certificateur.</p>"}` },
    { heading: "Article 4 – Durée, période et organisation", content: `<p><strong>Durée :</strong> ${esc(f.duree)}${ch.debut ? `<br><strong>Début :</strong> ${frLongVAE(ch.debut)}` : ""}${ch.fin ? `<br><strong>Fin :</strong> ${frLongVAE(ch.fin)}` : ""}${f.modalites.trim() ? `<br><strong>Modalités :</strong> ${esc(modaliteVAE(f))}` : ""}${f.lieu.trim() ? `<br><strong>Lieu ou accès à distance :</strong> ${esc(f.lieu)}` : ""}.</p><p>Le calendrier individualisé précise les dates, horaires et durées des séances ainsi que les travaux personnels. Le temps de rédaction personnelle n'est pas assimilé automatiquement à des heures d'accompagnement facturées. Toute modification de durée, de période ou de prix nécessite un avenant accepté par les parties.</p>` },
    { heading: "Article 5 – Programme et étapes", content: `${programmeContrat(f, cal)}<p>Le programme détaillé et le calendrier individualisé font partie des documents contractuels. Les éventuels actes relevant du certificateur restent distincts de la prestation d'accompagnement.</p>` },
    { heading: "Article 6 – Moyens pédagogiques et encadrement", content: `${f.moyensPedagogiques.trim() ? paragraphes(f.moyensPedagogiques) : ""}${accompagnateur(o, f, s) ? `<p><strong>${Acc(o, f, s)} ${femPersonne(o, accompagnateur(o, f, s)) ? "désignée" : "désigné"} :</strong> ${esc(accompagnateur(o, f, s))}.</p>` : ""}<p>L'organisme met à disposition les ressources prévues au programme et assure l'assistance méthodologique. Les titres, qualités et références ${de(lAcc(o, f, s))} ont été communiqués ${auC} avant son engagement. À distance, les conditions d'accès et l'assistance technique sont communiquées avant la première séance.</p>` },
    { heading: "Article 7 – Suivi, évaluation et documents remis", content: `${f.methodesEvaluation.trim() ? paragraphes(f.methodesEvaluation) : ""}<p>Le suivi porte sur la progression du dossier et la préparation au jury, et non sur une décision de certification. Les séances réalisées sont tracées par des émargements ou justificatifs d'accompagnement. Un bilan et un certificat de réalisation indiquant les prestations effectivement réalisées sont remis à l'issue de l'accompagnement. Les justificatifs ne sont pas établis par anticipation.</p>` },
    { heading: "Article 8 – Engagements de l'organisme", content: `<p>Assurer un accompagnement individualisé conforme au programme, désigner un interlocuteur, respecter le calendrier convenu, informer rapidement de toute difficulté, garantir la confidentialité et proposer les adaptations nécessaires. L'organisme fournit une aide méthodologique sans se substituer ${auC} dans la rédaction de son expérience.</p>` },
    { heading: `Article 9 – Engagements ${duC}${tripartite ? " et de l'entreprise" : ""}`, content: `<p>${LeC} participe aux séances, réalise les travaux convenus, fournit des informations et preuves authentiques, respecte le règlement intérieur et signale les absences ou difficultés. ${femCand(s) ? "Elle demeure l'autrice de son dossier et responsable" : "Il demeure l'auteur de son dossier et responsable"} des informations déclarées au certificateur.</p>${tripartite ? "<p>L'entreprise facilite la participation selon les autorisations convenues, désigne son interlocuteur, transmet les éléments de financement et respecte ses engagements de paiement. Les autorisations d'absence et le congé VAE relèvent des dispositions applicables ; le temps consacré à la VAE n'est pas présumé autorisé par la seule signature de cette convention.</p>" : ""}` },
    { heading: "Article 10 – Prix et périmètre financier", content: `<p><strong>Prix de l'accompagnement :</strong> ${esc(tarif)}.</p><p>Ce prix couvre les prestations prévues au programme contractuel. Les frais de certification, de jury, de déplacement ou autres frais ne sont pas réputés inclus s'ils ne sont pas expressément mentionnés dans les documents remis. Aucun supplément n'est facturé sans accord préalable écrit.</p>`, variant: "green" },
    { heading: "Article 11 – Financement et modalités de paiement", content: financement },
    { heading: "Article 12 – Rétractation et annulation avant démarrage", content: retrait },
    { heading: "Article 13 – Absences, report, interruption et force majeure", content: `<p>Toute absence ou demande de report est signalée dès que possible ; un nouveau créneau est convenu par écrit selon les disponibilités et la période contractuelle. En cas d'interruption, un relevé des prestations effectivement réalisées est établi ; aucune séance non réalisée n'est attestée comme réalisée. ${personnel ? "Seules" : "Hors dispositions spécifiques du financeur ou de Mon Compte Formation, seules"} les prestations réalisées sont facturées, et les sommes perçues en trop sont régularisées. En cas de force majeure dûment reconnue empêchant ${leC} de poursuivre, seules les prestations effectivement dispensées sont dues proportionnellement à leur valeur contractuelle (${personnel ? "article L.6353-7 du Code du travail" : "article L.6353-7 lorsqu'il s'applique"}). Si l'organisme interrompt la prestation, les parties recherchent un report ou une résiliation avec régularisation des prestations non réalisées.</p>` },
    { heading: "Article 14 – Accessibilité et confidentialité", content: `<p>Les adaptations d'accueil, de rythme et de supports sont examinées individuellement${o.referentHandicap.trim() ? ` avec ${femPersonne(o, o.referentHandicap) ? "la référente" : "le référent"} handicap, ${esc(o.referentHandicap)}` : ""}. Les aménagements des épreuves sont soumis à l'accord du certificateur.</p><p>Les données sont utilisées pour l'organisation, le suivi et la justification de l'accompagnement, dans le respect du RGPD. Leur communication ${personnel ? "au certificateur" : "aux financeurs et au certificateur"} est limitée aux informations nécessaires et aux obligations applicables. Le dossier et les preuves professionnelles restent confidentiels ; leur diffusion à l'entreprise n'est pas automatique. ${LeC} conserve ses droits sur son dossier et peut exercer ses droits relatifs aux données auprès de l'organisme${o.email ? ` à ${esc(o.email)}` : ""}.</p>` },
    { heading: "Article 15 – Réclamations et règlement des différends", content: `<p>Une réclamation peut être adressée par écrit à l'organisme${o.email ? ` : ${esc(o.email)}` : ""}, ou à son adresse figurant à l'article 1. Les parties recherchent une solution amiable. ${LeC}, agissant en qualité de consommat${femCand(s) ? "rice" : "eur"}, peut recourir gratuitement à un médiateur de la consommation dans les conditions prévues aux articles L.611-1 et suivants du Code de la consommation. À défaut de résolution amiable, les juridictions compétentes sont déterminées selon les règles de droit commun, sans imposer ${auC} le tribunal du siège de l'organisme.</p>` },
    { heading: "Article 16 – Documents contractuels et acceptation", content: `<p>Le programme détaillé, le calendrier individualisé, les conditions générales, le règlement intérieur et les informations d'accès et de protection des données ont été remis ${auC} avant la signature du présent ${tripartite ? "document" : "contrat"}.${cpf || tripartite ? ` Les documents de prise en charge du financeur, lorsqu'ils existent, complètent le présent document sans modifier les droits impératifs ${duC}.` : ""} Toute modification substantielle fait l'objet d'un avenant écrit accepté par ${tripartite ? "les trois parties" : "les deux parties"}.</p><p><strong>Fait le ${d}, en ${tripartite ? "trois" : "deux"} exemplaires originaux.</strong></p>` },
  ], extraHtml: signatures([sigCandidat(s, d), ...(tripartite ? [{ label: "L'employeur", nom: s.responsableEntreprise || s.entreprise, date: d, sig: s.signatureResponsableUrl }] : []), sigOrganisme(o, d)]) });
}

export function genVAEHandicapEntretien(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "ACCUEIL D'UN CANDIDAT EN SITUATION DE HANDICAP – ENTRETIEN", sections: [
    { heading: "Objet", content: `<p>Identifier, avec le candidat qui le souhaite, les besoins de compensation pour l'accompagnement VAE et pour les épreuves du jury (aménagements demandés au certificateur).</p>` },
    { heading: "Trame", content: `<p>Nature des besoins (sans obligation de préciser le handicap) : ________________<br>Aménagements souhaités : ☐ rythme / durée des séances ☐ supports adaptés (taille, audio, sous-titrage) ☐ outils numériques ☐ présence d'un tiers ☐ autre : ________________<br>Aménagements à demander au certificateur pour le jury : ________________<br>Partenaires à mobiliser : ☐ Agefiph ☐ Cap emploi ☐ MDPH ☐ Ressource handicap formation</p>` },
    { heading: "Confidentialité", content: `<p>Les informations sont confidentielles et ne sont transmises qu'avec l'accord écrit du candidat. ${Referent(o, o.referentHandicap)} handicap : ${esc(o.referentHandicap)}.</p>`, variant: "green" },
  ] });
}
export function genVAEHandicapFormalisation(o: OrganismeInfo, f?: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const v = valides(stagiaires);
  const rqth = v.filter((s) => s.rqth === "oui");
  const rows = !v.length || !f
    ? [["", "", esc(o.referentHandicap), "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]
    : rqth.length
      ? rqth.map((s) => [`Besoin signalé par ${esc(s.prenom)} ${esc(s.nom)} (entretien de faisabilité du ${frVAE(chronoVAE(s, f, o).entretienFaisabilite)})`, "Aménagements définis avec la personne lors de l'entretien handicap", esc(o.referentHandicap), `Avant la séance 1 (${frVAE(chronoVAE(s, f, o).premiereSeance)})`, "Vérifiés avec la personne à chaque séance"])
      : v.map((s) => [`Aucun besoin d'adaptation signalé par ${esc(s.prenom)} ${esc(s.nom)} (entretien de faisabilité du ${frVAE(chronoVAE(s, f, o).entretienFaisabilite)})`, "Aucun aménagement à formaliser", esc(o.referentHandicap), "Sans objet", `Besoin vérifié de nouveau à la séance 1 (${frVAE(chronoVAE(s, f, o).premiereSeance)})`]);
  return buildDocument({ org: o, title: "FORMALISATION DES AMÉNAGEMENTS – VAE", table: { headers: ["Besoin identifié", "Aménagement décidé", "Responsable", "Échéance", "Vérification"], rows }, sections: [
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
    { heading: "Courriel type", content: `<p><strong>Objet :</strong> Votre accompagnement VAE – besoins d'adaptation</p><p>Bonjour,</p><p>Afin que votre accompagnement se déroule dans les meilleures conditions, vous pouvez nous signaler tout besoin d'adaptation (rythme, supports, outils, aménagements pour le jury). ${femPersonne(o, o.referentHandicap) ? "Notre référente" : "Notre référent"} handicap, ${esc(o.referentHandicap)}, vous propose un entretien confidentiel.</p><p>Bien cordialement,<br>${esc(o.nom)} — ${esc(o.email)}${telOrg(o)}</p>` },
  ] });
}

export function genVAEReferentielAccompagnement(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "OBJECTIFS OPÉRATIONNELS DE L'ACCOMPAGNEMENT VAE", subtitle: c.intitule, sections: [
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
    { heading: "Modalités", content: `<p>Séances individuelles, ${esc(modaliteVAE(f))} (${esc(lieuVAE(o, f))}). Travail personnel du candidat entre les séances (rédaction, collecte de preuves), non compté dans les ${heuresVAE(f)} heures. Méthodes : entretien d'explicitation, analyse du référentiel, relecture commentée, mise en situation d'entretien.</p>`, variant: "green" },
  ] });
}

/** Livret 2 — dossier de validation entièrement rédigé (réponses du candidat par bloc). */
export function genVAETrameDossierValidation(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const cal = calendrierVAE(s, f);
  const je = s.civilite === "Mme" ? "e" : "";
  const dDepot = ch.depotValidation && estPasse(ch.depotValidation) ? frVAE(ch.depotValidation) : "";
  const relect = [cal[Math.floor(cal.length / 3)], cal[Math.floor((2 * cal.length) / 3)], cal[cal.length - 1]];
  // Minuscule initiale sauf sigle (« Conseillère de vente » → « conseillère de vente », « CAP » inchangé).
  const min = (a: string) => (/^[A-ZÀ-Ý][a-zà-ÿ]/.test(a) ? a.charAt(0).toLowerCase() + a.slice(1) : a);
  const ind = p.cadre === "independant", dem = p.cadre === "demandeur";
  const cv = cadreVAE(p);
  // Textes propres à la situation : salarié (hiérarchie, collègues), indépendant (clientèle), demandeur d'emploi (emplois passés).
  const cadreTxt = ind
    ? { lieu: "dans le cadre de mon activité indépendante", finalite: "garantir la qualité des prestations, respecter les délais convenus et les exigences réglementaires du secteur, et fidéliser ma clientèle", relations: "J'interviens directement auprès de mes clients et de mes fournisseurs, et je gère seul" + je + " l'organisation de mon activité.", moyens: "Protocoles et fiches techniques, outils numériques (agenda de rendez-vous, fichier clients, facturation), documentation technique et réglementaire des produits, échanges avec les fournisseurs.", resultats: "Les prestations ont été réalisées dans les délais convenus avec les clients, et leurs retours ont été positifs ; plusieurs d'entre eux sont revenus et m'ont recommandé" + je + " à leur entourage.", preuves: "avis de situation au répertoire SIRENE, factures clients anonymisées, photographies de réalisations, fiches clients anonymisées" }
    : dem
      ? { lieu: `dans le cadre de mes emplois précédents de ${esc(min(p.poste))}`, finalite: "garantir la qualité du service rendu, respecter les délais et les exigences réglementaires du secteur", relations: "J'intervenais en lien avec mes collègues, mes responsables et les interlocuteurs externes (clients, partenaires ou fournisseurs).", moyens: "Procédures internes, outils numériques métier et bureautiques, documentation technique et réglementaire, échanges avec l'équipe.", resultats: "Les actions ont été menées dans les délais et les objectifs fixés par mes responsables ont été atteints ; les retours des interlocuteurs ont été positifs.", preuves: "certificats de travail, attestations d'employeurs, exemples de documents produits (anonymisés)" }
      : { lieu: `au sein de ${esc(cv.structureTexte)}, dans le cadre de mon poste de ${esc(min(p.poste))}`, finalite: "garantir la qualité du service rendu, respecter les délais et les exigences réglementaires du secteur, et contribuer aux objectifs fixés par ma hiérarchie", relations: "J'interviens en lien avec mes collègues, mon responsable et les interlocuteurs externes (clients, usagers, partenaires ou fournisseurs).", moyens: "Procédures internes, outils numériques métier et bureautiques (tableaux de suivi, messagerie, logiciels du service), documentation technique et réglementaire, échanges avec l'équipe et réunions de coordination.", resultats: "Les actions ont été menées dans les délais, les objectifs ont été atteints et le travail a été validé par ma hiérarchie. Les retours des interlocuteurs ont été positifs et certaines de mes propositions ont été reprises dans l'organisation du service.", preuves: `attestation d'employeur (${esc(cv.structureTexte)}), fiche de poste, exemples de documents produits (anonymisés), tableaux de suivi, courriels de validation` };
  const blocs = p.couverture.map((x, i) => {
    const acts = x.activites;
    const a0 = acts[0] || x.bloc.titre;
    return {
      heading: `Bloc ${i + 1} — ${esc(x.bloc.code)} ${esc(x.bloc.titre)}`,
      content: `
<p><strong>Situation de travail présentée :</strong> ${esc(a0)}, ${cadreTxt.lieu}${ind ? ` de ${esc(min(p.poste))}` : ""}.</p>
<p><strong>1. Contexte et finalité.</strong> J'exerce depuis environ ${p.anneesLien} ans des activités directement liées à ce bloc. Cette activité répond à un besoin concret : ${cadreTxt.finalite}. ${cadreTxt.relations}</p>
<p><strong>2. Description de ce que j'ai fait.</strong> ${acts.map((a, k) => `${k === 0 ? "D'abord" : k === acts.length - 1 ? "Enfin" : "Ensuite"}, j'ai pris en charge l'activité suivante : ${esc(min(a))}. J'ai analysé la demande, recueilli les informations nécessaires, planifié les étapes et réalisé les actions en contrôlant le résultat.`).join(" ")} Lorsqu'une difficulté est apparue (délai serré, information manquante, imprévu), j'ai réorganisé mes priorités${ind ? ", prévenu les clients concernés" : ", alerté les bonnes personnes"} et proposé une solution que j'ai mise en œuvre.</p>
<p><strong>3. Moyens et ressources mobilisés.</strong> ${cadreTxt.moyens}</p>
<p><strong>4. Résultats obtenus.</strong> ${cadreTxt.resultats}</p>
<p><strong>5. Analyse de mes compétences.</strong> Cette situation montre que je suis capable ${((xs) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}` : xs[0] || ""))(acts.map((a) => esc(de(min(a)))))}. Je sais adapter ma méthode au contexte, justifier mes choix et en tirer des enseignements : aujourd'hui, j'anticipe davantage les points de blocage et je formalise mieux le suivi de mes actions.</p>
<p><strong>Preuves jointes :</strong> ${cadreTxt.preuves}.</p>`,
    };
  });
  return buildDocument({ org: o, title: "DOSSIER DE VALIDATION VAE", subtitle: `${esc(p.nomComplet)} — ${esc(c.intitule)}`, sections: [
    { heading: `${femCand(s) ? "Candidate" : "Candidat"} et certification`, content: `<p>${esc(p.civ)} ${esc(p.nomComplet)} — ${esc(p.situation)}<br>Emploi exercé : ${esc(p.poste)}${p.structure !== "—" ? ` — ${esc(p.structure)}` : ""}<br>Certification visée : ${certifLigne(c)}<br>${Acc(o, f, s)} : ${esc(accompagnateur(o, f, s))}</p>` },
    { heading: "Mon parcours et ma motivation", content: `<p>Mon parcours professionnel représente environ ${p.anneesTotal} ans d'expérience, dont ${p.anneesLien} ans en rapport direct avec la certification. Mon dernier diplôme déclaré : ${esc(p.diplome)}.</p><p><strong>Motivation :</strong> ${esc(p.motivation)}.<br><strong>Projet :</strong> ${esc(p.projet)}.</p>` },
    ...blocs,
    { heading: `Relectures ${de(lAcc(o, f, s))}`, content: `<table><thead><tr><th>Version</th><th>Date</th><th>Observations</th></tr></thead><tbody>
<tr><td>V1</td><td>${relect[0] && relect[0].realisee ? frVAE(relect[0].date) : ""}</td><td>${relect[0]?.realisee ? "Structure conforme au référentiel ; situations à détailler (actions et résultats)." : ""}</td></tr>
<tr><td>V2</td><td>${relect[1] && relect[1].realisee ? frVAE(relect[1].date) : ""}</td><td>${relect[1]?.realisee ? "Descriptions précises et argumentées ; preuves complétées." : ""}</td></tr>
<tr><td>Version déposée</td><td>${dDepot}</td><td>${dDepot ? "Dossier finalisé et déposé auprès du certificateur." : ""}</td></tr>
</tbody></table>`, variant: "green" },
    { heading: "Attestation sur l'honneur", content: `<p>Je soussigné${je} ${esc(p.nomComplet)} atteste que les activités décrites dans ce dossier ont été exercées par moi-même et que les informations sont exactes.</p>` },
  ], extraHtml: signatures([sigCandidat(s, dDepot || undefined), sigAccompagnateur(o, f, s, dDepot || undefined)]) });
}

export function genVAESequencage(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  // Heures réelles par phase, tirées du calendrier (même découpage que le programme et le contrat).
  const phases = phasesVAE(calendrierVAE(valides(stagiaires)[0] || cand(stagiaires, 0), f));
  const total = phases.reduce((a, p) => a + p.heures, 0);
  const part = (re: RegExp, defaut: string) => {
    const p = phases.find((x) => re.test(x.label));
    return p && total ? `${p.heures} h (${Math.round((p.heures / total) * 100)} %, ${seancesTxt(p.seances)})` : defaut;
  };
  return buildDocument({ org: o, title: "SÉQUENÇAGE DE L'ACCOMPAGNEMENT VAE", table: {
    headers: ["Phase", "Objectif", "Méthodes", "Livrable", "Volume"],
    rows: [
      ["Lancement", "S'approprier le référentiel et repérer ses activités", "Entretien d'explicitation, lecture guidée du référentiel", "Tableau activités / blocs", part(/^Lancement/, "≈ 15 %")],
      ["Dossier de validation", "Décrire les situations de travail bloc par bloc", "Questionnement, relecture commentée", "Dossier rédigé par le candidat", part(/^Rédaction/, "≈ 60 %")],
      ["Portefeuille de preuves", "Organiser et vérifier les preuves", "Liste de contrôle", "Portefeuille", part(/^Portefeuille/, "≈ 10 %")],
      ["Préparation au jury", "Présenter son parcours et répondre aux questions", "Mise en situation, grille d'observation", "Grille de retour", part(/jury/i, "≈ 15 %")],
    ],
  }, sections: [
    { heading: "Individualisation", content: `<p>Toutes les séances sont individuelles (${heuresVAE(f)} heures au total) ; l'ordre des blocs et le rythme sont adaptés au profil du candidat et au calendrier du certificateur.</p>`, variant: "green" },
  ] });
}

/** Positionnement (début : IND 4 ; fin : IND 11) — par bloc, cohérent avec le profil. */
/** Échelle du positionnement VAE (même grille au début et à la fin de l'accompagnement). */
const ECHELLE_POSITIONNEMENT = [
  "1 – activité non exercée",
  "2 – activité exercée ponctuellement : situations et preuves à réunir",
  "3 – activité exercée régulièrement : description à structurer",
  "4 – activité décrite, argumentée et prouvée",
];

export function genVAEPositionnement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number, moment: "debut" | "fin") {
  const s = cand(stagiaires, si);
  const p = profilVAE(s, f);
  const c = certifVAE(f);
  const ch = chronoVAE(s, f, o);
  const cal = calendrierVAE(s, f);
  const ref = moment === "debut" ? cal[0] : cal[cal.length - 1];
  const fait = !!ref && ref.realisee;
  const d = fait ? frVAE(ref.date) : "";
  const debut = moment === "debut";
  const fem = p.civ === "Madame";
  const leCand = fem ? "la candidate" : "le candidat";
  const seancesDuBloc = (titre: string) => cal.filter((x) => x.theme.includes(titre)).map((x) => x.num);
  const liste = (n: number[]) => (n.length > 1 ? `séances ${n.slice(0, -1).join(", ")} et ${n[n.length - 1]}` : n.length ? `séance ${n[0]}` : "séances de rédaction");
  const relecture = cal.find((x) => /relecture|portefeuille/i.test(x.theme));
  const oral = cal.filter((x) => /jury/i.test(x.theme)).map((x) => x.num);

  const lignes: string[][] = [];
  for (const x of p.couverture) {
    const part = x.niveau === "Partielle";
    const seances = seancesDuBloc(x.bloc.titre);
    const comps = x.bloc.competences.length ? x.bloc.competences : [`Activités du bloc « ${x.bloc.titre} »`];
    comps.forEach((comp, k) => {
      const exercee = !part || k < Math.max(1, Math.ceil(comps.length / 2));
      const nDebut = exercee ? (part ? 2 : 3) : 2;
      const obsDebut = exercee && !part
        ? "Activité exercée régulièrement ; situations à décrire avec contexte, actions et résultats."
        : exercee
          ? "Activité exercée ponctuellement ; preuves à réunir : attestations, photographies de réalisations, fiches clients."
          : "Activité peu exercée récemment ; situations antérieures et preuves à rechercher en priorité.";
      lignes.push(debut
        ? [k === 0 ? `<strong>${esc(x.bloc.code)}</strong> ${esc(x.bloc.titre)}` : "", esc(comp), String(nDebut), obsDebut, `Description et preuves : ${liste(seances)}`]
        : [k === 0 ? `<strong>${esc(x.bloc.code)}</strong> ${esc(x.bloc.titre)}` : "", esc(comp), `${nDebut} → 4`, `Situations rédigées et preuves classées dans le dossier de validation (${liste(seances)}${relecture ? `, relecture séance ${relecture.num}` : ""}).`, "Acquis pour le dossier"]);
    });
  }
  const transversales = debut
    ? [
      ["", "Décrire une situation de travail par écrit (contexte, actions, résultats)", "2", "Expression écrite à structurer ; méthode de description travaillée dès la séance 2.", "Méthode de rédaction : séance 2, puis chaque séance de rédaction"],
      ["", "Présenter et argumenter son expérience à l'oral devant un jury", "2", "Aisance à l'oral à construire sur le vocabulaire professionnel du référentiel.", `Préparation à l'entretien : ${liste(oral)}`],
    ]
    : [
      ["", "Décrire une situation de travail par écrit (contexte, actions, résultats)", "2 → 4", "Descriptions d'activités rédigées pour chaque bloc, vocabulaire professionnel maîtrisé.", "Acquis"],
      ["", "Présenter et argumenter son expérience à l'oral devant un jury", "2 → 4", `Mise en situation d'entretien réalisée (${liste(oral)}) : présentation structurée, réponses argumentées.`, "Préparation au jury achevée"],
    ];
  const generaux = c.blocs.filter((b) => !b.professionnel);
  const forts = p.couverture.filter((x) => x.niveau === "Complète").map((x) => esc(x.bloc.titre));
  const vigilance = p.blocsVigilance.map(esc);

  const sections: { heading: string; content: string; variant?: "green" | "orange" }[] = [
    { heading: "Objet et méthode", content: `<p>${debut ? "Positionnement initial" : "Positionnement final"} de ${esc(p.civ)} ${esc(p.nomComplet)} sur le référentiel de la certification ${certifLigne(c)}, ${fait ? `réalisé le ${d} lors de la séance ${ref.num} (${esc(lieuVAE(o, f))})` : `programmé le ${frVAE(ref?.date)} (séance ${ref?.num ?? 1})`}, avec ${lAcc(o, f, s)} ${esc(accompagnateur(o, f, s))}. ${debut ? "Il s'appuie sur le compte rendu d'entretien de faisabilité et sur les activités décrites par ${leCand} ; il fixe les priorités de l'accompagnement." : "Il mesure la progression depuis le positionnement initial et vérifie que chaque bloc visé est décrit et prouvé avant le dépôt du dossier de validation."}</p><p><strong>Échelle :</strong> ${ECHELLE_POSITIONNEMENT.join(" ; ")}.</p>` },
    { heading: `Profil ${fem ? "de la candidate" : "du candidat"}`, content: `<p><strong>Situation :</strong> ${esc(p.situation)}<br><strong>Emploi exercé :</strong> ${esc(p.poste)} — expérience en lien avec la certification : ${p.anneesLien} ans<br><strong>Diplôme le plus élevé :</strong> ${esc(p.diplome)}<br><strong>Projet :</strong> ${esc(p.projet)}</p>` },
  ];
  if (generaux.length) {
    sections.push({ heading: "Domaines généraux", content: `<p>${generaux.map((b) => esc(b.titre)).join(" ; ")}. Ces domaines ne sont pas décrits dans le dossier de validation : les dispenses sont accordées par le certificateur au vu des diplômes détenus (diplôme déclaré : ${esc(p.diplome)}) ; ${lAcc(o, f, s)} a remis à ${leCand} la liste des justificatifs de diplôme qui accompagnent son dossier.</p>` });
  }
  sections.push(debut
    ? { heading: "Synthèse et objectifs de l'accompagnement", content: `<p><strong>Points forts :</strong> ${forts.length ? forts.join(" ; ") : "activités exercées dans tous les blocs professionnels"}.<br><strong>Priorités :</strong> ${vigilance.length ? `${vigilance.join(" ; ")} (preuves à réunir en premier)` : "structurer la description des situations de travail de chaque bloc"} ; méthode de rédaction ; préparation de l'oral.<br><strong>Objectifs fixés avec ${leCand} :</strong> décrire pour chaque bloc professionnel au moins deux situations de travail significatives, réunir les preuves correspondantes et finaliser le dossier de validation pour le ${frVAE(ch.depotValidation)}.</p>`, variant: "green" }
    : { heading: "Synthèse", content: `<p>Tous les blocs professionnels visés sont décrits et prouvés${vigilance.length ? ` ; le point de vigilance du début (${vigilance.join(" ; ")}) est levé par les preuves ajoutées au dossier` : ""}. Dossier de validation finalisé le ${frVAE(ch.depotValidation)} ; entretien avec le jury préparé par la mise en situation du ${d || frVAE(ref?.date)}. ${fem ? "La candidate est prête" : "Le candidat est prêt"} à se présenter devant le jury ; la décision appartient au seul jury.</p>`, variant: "green" });

  return buildDocument({ org: o, title: debut ? "POSITIONNEMENT EN DÉBUT D'ACCOMPAGNEMENT – VAE" : "POSITIONNEMENT EN FIN D'ACCOMPAGNEMENT – VAE", subtitle: `${esc(p.nomComplet)} — ${esc(c.intitule)}`, sections, table: {
    headers: debut ? ["Bloc", "Compétence du référentiel", "Niveau (1 à 4)", "Observations", "Action prévue"] : ["Bloc", "Compétence du référentiel", "Niveau début → fin", "Observations", "Résultat"],
    rows: [...lignes, ...transversales],
  }, extraHtml: signatures([sigCandidat(s, d || undefined), sigAccompagnateur(o, f, s, d || undefined)]) });
}
export function genVAELivretAccueil(o: OrganismeInfo, f: FormationInfo) {
  o = orgV10(o);
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "LIVRET D'ACCUEIL – ACCOMPAGNEMENT VAE", sections: [
    { heading: "Bienvenue", content: `<p>Ce livret présente le déroulement de votre accompagnement VAE avec ${esc(o.nom)}.</p>` },
    { heading: "Vos interlocuteurs", content: `<p>${femPersonne(o, o.responsablePedagogique) ? "Accompagnatrice / référente" : "Accompagnateur / référent"} VAE : ${esc(o.responsablePedagogique)}<br>${Referent(o, o.referentHandicap)} handicap : ${esc(o.referentHandicap)}<br>Administratif : ${esc(o.poleAdministratif)}<br>Contact : ${esc(o.email)}${telOrg(o)}</p>` },
    { heading: "Déroulement", content: `<p>${heuresVAE(f)} heures en séances individuelles de 2 heures, ${esc(modaliteVAE(f))} (${esc(lieuVAE(o, f))}). Étapes : lancement, dossier de validation bloc par bloc, portefeuille de preuves, préparation à l'entretien avec le jury. Le jury est organisé par le certificateur.</p>` },
    { heading: "Vos droits et engagements", content: `<p>Accompagnement personnalisé, confidentialité, adaptation possible, réclamation à ${esc(o.email)}. Vous restez l'unique auteur de votre dossier ; vous vous engagez à assister aux séances et à prévenir de toute absence.</p>`, variant: "green" },
    { heading: "Informations utiles", content: `<p>Plateforme France VAE : vae.gouv.fr — congé VAE (salariés) : autorisation d'absence à demander à l'employeur — règlement intérieur et conditions générales remis avec le contrat.</p>` },
    ...(rappelViolences(o) ? [{ heading: "Violences, harcèlement, discriminations", content: `<p>${rappelViolences(o)}</p>`, variant: "orange" as const }] : []),
  ] });
}

export function genVAECGV(o: OrganismeInfo) {
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "CONDITIONS GÉNÉRALES DE VENTE – ACCOMPAGNEMENT VAE", sections: [
    { heading: "1. Objet", content: `<p>Les présentes conditions s'appliquent aux prestations d'accompagnement VAE ${esc(de(o.nom))} (SIRET ${esc(o.siret)}${o.nda ? `, NDA ${esc(o.nda)}` : ""}).</p>` },
    { heading: "2. Commande", content: `<p>Financement personnel : contrat d'accompagnement signé par le candidat avant tout règlement.</p>` },
    { heading: "3. Rétractation (particuliers)", content: `<p>Délai de 10 jours à compter de la signature du contrat (article L.6353-5 du Code du travail), par lettre recommandée avec avis de réception. Aucun paiement n'est exigé avant la fin de ce délai ; acompte limité à 30 % du prix (article L.6353-6).</p>`, variant: "green" },
    { heading: "4. Prix et paiement", content: `<p>Prix indiqué au contrat. ${mentionTVA(o)} Le solde est réglé au fur et à mesure du déroulement de l'accompagnement. En cas d'abandon, ou de cessation anticipée pour force majeure dûment reconnue, seules les séances réalisées sont dues, au prorata de leur valeur prévue au contrat (article L.6353-7 du Code du travail).</p>` },
    { heading: "5. Report et annulation de séance", content: `<p>Toute séance annulée est reportée à une date convenue par écrit ; seules les séances réalisées sont facturées.</p>` },
    { heading: "6. Données personnelles", content: `<p>Traitement limité à la gestion de l'accompagnement ; droits d'accès, de rectification et d'effacement auprès ${esc(de(o.nom))}${o.email ? ` (${esc(o.email)})` : ""}.</p>` },
    { heading: "7. Réclamations et litiges", content: `<p>Réclamation écrite à ${esc(o.email)} (réponse sous 15 jours ouvrés). Le candidat consommateur peut recourir gratuitement à un médiateur de la consommation, dans les conditions prévues aux articles L.611-1 et suivants du Code de la consommation.</p>` },
  ] });
}

export function genVAEReglementInterieur(o: OrganismeInfo) {
  o = orgV10(o);
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "RÈGLEMENT INTÉRIEUR – ACCOMPAGNEMENT VAE", sections: [
    { heading: "Article 1 – Champ", content: `<p>Applicable à tout candidat accompagné par ${esc(o.nom)}, en présentiel comme à distance (articles L.6352-3 et R.6352-1 et suivants du Code du travail).</p>` },
    { heading: "Article 2 – Assiduité", content: `<p>Présence aux séances ; toute absence est signalée au moins 48 heures à l'avance. Les séances sont émargées par le candidat et l'accompagnateur.</p>` },
    { heading: "Article 3 – Comportement", content: `<p>Respect mutuel ; tout comportement violent, discriminatoire ou harcelant entraîne une procédure disciplinaire.${rappelViolences(o) ? ` ${rappelViolences(o)}` : ""}</p>` },
    { heading: "Article 4 – Hygiène et sécurité", content: `<p>En présentiel, respect des consignes affichées dans les locaux ; à distance, le candidat veille à un environnement calme et confidentiel.</p>` },
    { heading: "Article 5 – Sanctions et procédure", content: `<p>Avertissement ou exclusion après entretien préalable, dans le respect des articles R.6352-4 à R.6352-8 du Code du travail.</p>` },
    { heading: "Article 6 – Confidentialité et propriété du dossier", content: `<p>Le dossier de validation reste la propriété du candidat ; il n'est jamais diffusé sans son accord écrit.</p>`, variant: "green" },
  ] });
}

export function genVAEDroitImage(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const ch = chronoVAE(s, f, o);
  const d = estPasse(ch.contrat) ? frVAE(ch.contrat) : undefined;
  return buildDocument({ org: o, title: "AUTORISATION D'ENREGISTREMENT ET D'UTILISATION DE L'IMAGE", subtitle: `${esc(s.prenom)} ${esc(s.nom)}`, sections: [
    { heading: "Objet", content: `<p>Les mises en situation d'entretien avec le jury peuvent être enregistrées, avec l'accord ${duCandidat(s)}, pour ${femCand(s) ? "lui" : "lui"} permettre de s'observer. L'enregistrement est remis ${auCandidat(s)} et supprimé à la fin de l'accompagnement. Autorisation remise avec le contrat d'accompagnement.</p>` },
    { heading: `Choix ${duCandidat(s)}`, content: `<p>Je soussigné${femCand(s) ? "e" : s.civilite === "M." ? "" : "(e)"} ${esc(s.prenom)} ${esc(s.nom)} :</p><p>☒ J'accepte l'enregistrement de mes mises en situation, pour mon usage personnel uniquement.<br>☐ Je refuse tout enregistrement.</p>`, variant: "green" },
  ], extraHtml: signatures([sigCandidat(s, d)]) });
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
      { heading: "Statut", content: `<p>L'accompagnement se termine le ${frVAE(ch.fin)} : le certificat de réalisation sera établi à cette date, sur la base des séances émargées (${nb(heures, "heure réalisée", "heures réalisées")} au ${frVAE(aujourdhui())} sur ${heuresVAE(f)}).</p>` },
    ] });
  }
  const d = frVAE(ch.fin);
  return buildDocument({ org: o, title: "CERTIFICAT DE RÉALISATION", subtitle: "Action concourant au développement des compétences", sections: [
    { heading: "Attestation", content: `<p>Je soussigné${dirigeanteFem(o) ? "e" : ""} ${esc(o.dirigeant)}, ${dirigeanteFem(o) ? "représentante légale" : "représentant légal"} ${esc(de(o.nom))}${o.nda ? ` (déclaration d'activité n° ${esc(o.nda)})` : ""}, atteste que :</p><p><strong>${esc(s.civilite || "")} ${esc(s.prenom)} ${esc(s.nom)}</strong> a suivi l'action <strong>« Accompagnement VAE — ${esc(c.intitule)} »</strong>, de nature : <strong>action permettant de faire valider les acquis de l'expérience</strong> (article L.6313-1, 3° du Code du travail),<br>qui s'est déroulée du ${frVAE(ch.debut)} au ${frVAE(ch.fin)}, pour une durée réalisée de <strong>${heures} heures</strong> (sur ${heuresVAE(f)} heures prévues).</p><p>Sans préjudice des délais imposés par les règles fixées par le financeur, ${femCand(s) ? "la bénéficiaire" : "le bénéficiaire"} et l'organisme conservent l'ensemble des pièces justificatives ayant permis d'établir le présent certificat pendant 3 ans à compter de la fin de l'année du dernier paiement.</p>` },
  ], extraHtml: signatures([sigOrganisme(o, d)]) });
}

const mail = (o: OrganismeInfo, titre: string, objet: string, corps: string) => buildDocument({ org: o, title: `MODÈLE DE COURRIEL – ${titre}`, sections: [
  { heading: "Courriel type", content: `<p><strong>De :</strong> ${esc(o.nom)} &lt;${esc(o.email)}&gt;<br><strong>Objet :</strong> ${objet}</p><p>Bonjour,</p>${corps}<p>Bien cordialement,<br>${esc(o.responsablePedagogique || o.dirigeant)} — ${esc(o.nom)}<br>${esc(o.email)}${telOrg(o)}</p>` },
] });

export const genVAEMailIntroduction = (o: OrganismeInfo) => mail(o, "INTRODUCTION AU PARCOURS VAE", "Votre démarche VAE : les prochaines étapes", `<p>Merci pour votre intérêt. Je vous propose un entretien de faisabilité gratuit d'une heure pour examiner votre expérience au regard du référentiel de la certification visée. Vous trouverez ci-joint la plaquette d'information. La démarche s'effectue sur la plateforme France VAE (vae.gouv.fr).</p>`);
export const genVAEMailPreparationDossier = (o: OrganismeInfo) => mail(o, "PRÉPARATION DU DOSSIER DE VALIDATION", "Préparer la rédaction de votre dossier de validation", `<p>Pour notre prochaine séance, merci de réunir vos justificatifs d'activité et de noter, pour chaque bloc, deux situations de travail significatives. Vous trouverez ci-joint la trame du dossier de validation.</p>`);
export const genVAEMailRecap = (o: OrganismeInfo, f: FormationInfo) => mail(o, "RÉCAPITULATIF DE L'ACCOMPAGNEMENT", "Récapitulatif de votre accompagnement VAE", `<p>Votre accompagnement de ${heuresVAE(f)} heures se déroule en séances individuelles de 2 heures (${esc(modaliteVAE(f))}). Le calendrier des séances, le programme et le règlement intérieur sont joints.</p>`);
export const genVAEMailSuiviEvolution = (o: OrganismeInfo) => mail(o, "SUIVI DE L'AVANCEMENT DU DOSSIER", "Où en est votre dossier de validation ?", `<p>Je reviens vers vous pour faire le point sur l'avancement de votre dossier. Pouvez-vous m'adresser votre dernière version avant notre prochaine séance afin que je puisse vous faire un retour ?</p>`);
export const genVAEMailPreparationEntretien = (o: OrganismeInfo) => mail(o, "PRÉPARATION DE L'ENTRETIEN AVEC LE JURY", "Préparer votre entretien avec le jury", `<p>Nous consacrerons les dernières séances à la préparation de votre entretien avec le jury : présentation de votre parcours en 10 minutes et questions types. Pensez à vérifier sur la plateforme France VAE (vae.gouv.fr) la date et les modalités communiquées par le certificateur.</p>`);
export const genVAEMailPostValidation = (o: OrganismeInfo) => mail(o, "SUIVI APRÈS LE JURY", "Suite de votre passage devant le jury", `<p>Pourriez-vous me communiquer la décision du jury dès réception ? En cas de validation partielle, les blocs obtenus vous sont acquis définitivement et nous pourrons étudier ensemble la suite de votre parcours.</p>`);
export const genVAEMailEnvoiCertificat = (o: OrganismeInfo) => mail(o, "ENVOI DU CERTIFICAT DE RÉALISATION", "Votre certificat de réalisation", `<p>Veuillez trouver ci-joint votre certificat de réalisation, établi sur la base des séances émargées, ainsi que le questionnaire de satisfaction de fin d'accompagnement.</p>`);
export const genVAEMailRelanceAbandon = (o: OrganismeInfo) => mail(o, "RELANCE APRÈS ABSENCE", "Nous n'avons pas pu vous voir à la dernière séance", `<p>Vous n'avez pas pu assister à notre dernière séance. Tout va bien ? Je vous propose de convenir d'un nouveau créneau ; si vous rencontrez une difficulté, parlons-en : des adaptations sont possibles.</p>`);
export const genVAEMailConditionsCertification = (o: OrganismeInfo, f: FormationInfo) => mail(o, "CONDITIONS DE PRÉSENTATION À LA CERTIFICATION", "Présentation au jury : ce que demande le certificateur", `<p>Le jury de la certification « ${esc(certifVAE(f).intitule)} » est organisé par ${esc(leCertificateur(certifVAE(f)))}. Le dépôt du dossier de validation et la convocation se font selon ses modalités (plateforme France VAE, vae.gouv.fr). Si vous avez besoin d'aménagements pour l'entretien, la demande doit être faite auprès du certificateur : nous vous aidons à la formuler.</p>`);
export const genVAEMailAideConnexion = (o: OrganismeInfo) => mail(o, "AIDE À LA CONNEXION", "Votre séance à distance : mode d'emploi", `<p>La séance a lieu en visioconférence ; le lien vous est envoyé la veille. En cas de difficulté, répondez à ce courriel : je vous propose un test de connexion ou une solution de repli (téléphone).</p>`);

export function genVAEAdaptationAccompagnement(o: OrganismeInfo) {
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "ADAPTATION DE L'ACCOMPAGNEMENT VAE", sections: [
    { heading: "Leviers d'adaptation", content: `<ul><li>Ordre des blocs selon les points d'appui et de vigilance identifiés en faisabilité ;</li><li>rythme et horaires selon les contraintes du candidat ;</li><li>modalité (présentiel / distance) ;</li><li>aménagements liés au handicap (${referentDe(o, o.referentHandicap)} : ${esc(o.referentHandicap)}) ;</li><li>séance de mise en situation supplémentaire si la personne en a besoin, prise sur le volume contractuel.</li></ul>` },
    { heading: "Traçabilité", content: `<p>Chaque adaptation est notée dans la fiche de suivi individuel et, si elle modifie le contrat, fait l'objet d'un avenant.</p>`, variant: "green" },
  ] });
}

export function genVAEFichePedagogique(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  return buildDocument({ org: o, title: "FICHE PÉDAGOGIQUE – ACCOMPAGNEMENT VAE", table: {
    headers: ["Rubrique", "Contenu"],
    rows: [
      ["Certification", certifLigne(c)], ["Public", esc(f.publicVise)], ["Prérequis", esc(f.prerequis)], ["Durée", esc(f.duree)],
      ["Modalités", `${esc(modaliteVAE(f))} — ${esc(lieuVAE(o, f))}`], ["Objectifs", esc(f.objectifs).replace(/\n/g, "<br>")],
      ["Méthodes", esc(f.moyensPedagogiques)], ["Évaluation", esc(f.methodesEvaluation)], [femPersonne(o, f.formateur || o.responsablePedagogique) ? "Accompagnatrice" : "Accompagnateur", esc(f.formateur || o.responsablePedagogique)],
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
  return buildDocument({ org: o, extraHtml: signatures([sigAccompagnateur(o, f, s, derniereFaite(cal)), sigCandidat(s, derniereFaite(cal))]), title: "FICHE DE SUIVI INDIVIDUEL – VAE", subtitle: esc(p.nomComplet), table: {
    headers: ["Séance", "Date", "Horaire", "Durée", "Contenu", "Statut"], rows: seancesRows(cal),
  }, sections: [
    { heading: "Avancement", content: `<p>${nb(faites.length, "séance réalisée", "séances réalisées")} sur ${cal.length} (${faites.reduce((a, x) => a + x.duree, 0)} h / ${heuresVAE(f)} h). ${p.blocsVigilance.length ? `Priorité donnée ${p.blocsVigilance.length > 1 ? "aux blocs" : "au bloc"} ${p.blocsVigilance.map(esc).join(" ; ")}.` : ""}${p.rqth ? ` Aménagements suivis avec ${femPersonne(o, o.referentHandicap) ? "la référente" : "le référent"} handicap.` : ""}</p>`, variant: "green" },
  ] });
}

export function genVAEEntretienIntermediaire(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const p = profilVAE(s, f);
  const cal = calendrierVAE(s, f);
  const mi = cal[Math.floor((cal.length - 1) / 2)];
  const fait = !!mi && mi.realisee;
  const d = fait ? frVAE(mi.date) : "";
  // Blocs travaillés jusqu'à l'entretien intermédiaire inclus (calendrier réel).
  const decrits = mi ? p.couverture.filter((x) => cal.some((y) => y.num <= mi.num && y.theme.includes(x.bloc.titre))) : [];
  const vigil = p.blocsVigilance.map(esc);
  return buildDocument({ org: o, title: "ENTRETIEN INTERMÉDIAIRE – VAE", subtitle: esc(p.nomComplet), sections: [
    { heading: "Date", content: `<p>${fait ? `Entretien réalisé le ${d} (séance ${mi.num}).` : `Entretien prévu ${mi ? `le ${frVAE(mi.date)} (séance ${mi.num})` : "à mi-parcours"}.`}</p>` },
    { heading: "Point d'étape", content: fait
      ? `<p><strong>Blocs décrits :</strong> ${(decrits.length ? decrits : p.couverture.slice(0, 1)).map((x) => esc(x.bloc.titre)).join(" ; ")}.<br><strong>Difficultés :</strong> ${vigil.length ? `preuves encore insuffisantes pour ${vigil.length > 1 ? "les blocs" : "le bloc"} ${vigil.join(" ; ")}` : "aucune difficulté bloquante"}.<br><strong>Décisions :</strong> poursuite du calendrier ; relecture de la version suivante avant la séance ${Math.min(cal.length, mi.num + 1)}.</p>`
      : `<p>Le point d'étape (blocs décrits, difficultés, décisions) est rédigé à l'issue de la séance ${mi ? mi.num : ""} et signé par ${leCandidat(s)} et ${lAcc(o, f, s)}.</p>`, variant: "green" },
  ], extraHtml: signatures([sigCandidat(s, d || undefined), sigAccompagnateur(o, f, s, d || undefined)]) });
}

export function genVAEDossierSuiviParcours(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const etape = (label: string, d: Date | null) => [label, d ? frVAE(d) : "—", estPasse(d) ? "Réalisé" : "À venir"];
  const leC = leCandidat(s);
  const tripartite = !!s.entreprise?.trim();
  return buildDocument({ org: o, extraHtml: signatures([sigAccompagnateur(o, f, s, derniereFaite(calendrierVAE(s, f))), sigCandidat(s, derniereFaite(calendrierVAE(s, f)))]), title: "DOSSIER DE SUIVI DU PARCOURS VAE", subtitle: `${esc(p.nomComplet)} — ${esc(c.intitule)}`, table: {
    headers: ["Étape", "Date", "Statut"],
    rows: [
      etape("Entretien de faisabilité", ch.entretienFaisabilite),
      etape("Dossier de faisabilité déposé sur France VAE (vae.gouv.fr)", ch.depotFaisabilite),
      ["Décision de recevabilité (certificateur)", "Notifiée sur France VAE", `Prononcée par le certificateur (${esc(c.certificateur)}) avant la rédaction du dossier de validation ; notification conservée dans l'espace France VAE ${duCandidat(s)} et au présent dossier de suivi`],
      etape(tripartite ? "Signature de la convention d'accompagnement" : "Signature du contrat d'accompagnement", ch.contrat),
      etape("Première séance", ch.premiereSeance),
      etape("Version complète du dossier de validation relue et déposée", ch.depotValidation),
      etape("Dernière séance (mise en situation d'entretien)", ch.derniereSeance),
      ["Entretien avec le jury", `Organisé par le certificateur (${esc(c.certificateur)})`, `Convocation adressée directement à ${leC} par le certificateur, via France VAE`],
      ["Décision du jury", "Relève du seul jury", `Notifiée directement à ${leC}, qui la transmet à ${esc(o.nom)} (courriel de suivi après le jury)`],
    ],
  } });
}

export function genVAEGrilleEvaluationDossier(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const p = profilVAE(s, f);
  const ch = chronoVAE(s, f, o);
  const fait = estPasse(ch.depotValidation);
  const crit = ["Les activités décrites correspondent au bloc", "Les situations sont précises (contexte, actions, résultats)", "Le vocabulaire professionnel est maîtrisé", "Les preuves sont pertinentes et référencées"];
  const note = (bi: number, ci: number) => (p.couverture[bi]?.niveau === "Partielle" && ci === 3 ? "Satisfaisant après ajout de preuves en relecture" : "Satisfaisant");
  return buildDocument({ org: o, extraHtml: signatures([sigAccompagnateur(o, f, s, fait ? frVAE(ch.depotValidation) : undefined)]), title: "GRILLE D'ANALYSE DU DOSSIER DE VALIDATION", subtitle: `${esc(p.nomComplet)} — relecture ${de(lAcc(o, f, s))} (non décisionnelle)`, table: {
    headers: ["Bloc", ...crit],
    rows: p.couverture.map((x, bi) => [esc(x.bloc.titre), ...crit.map((_, ci) => (fait ? note(bi, ci) : ""))]),
  }, sections: [
    { heading: "Statut", content: fait ? `<p>Relecture de la version complète du ${frVAE(ch.depotValidation)}. Cette grille aide ${leCandidat(s)} à améliorer son dossier : la décision appartient au seul jury.</p>` : `<p>Relecture programmée le ${frVAE(ch.depotValidation)} ; la grille est renseignée lors de cette relecture.</p>`, variant: "green" },
  ] });
}

export function genVAEEmargement(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const cal = calendrierVAE(s, f);
  const acc = accompagnateur(o, f, s);
  const sigAcc = sigAccUrl(o, f, s);
  const cellule = (url: string | undefined, fait: boolean) => (fait && url ? `<img src="${url}" style="max-height:30px">` : fait ? "" : "—");
  return buildDocument({ org: o, extraHtml: signatures([sigOrganisme(o, derniereFaite(cal))]), title: "FEUILLE D'ÉMARGEMENT – ACCOMPAGNEMENT VAE", subtitle: `${esc(s.prenom)} ${esc(s.nom)} — ${Acc(o, f, s).toLowerCase()} : ${esc(acc)}`, table: {
    headers: ["Séance", "Date", "Horaire", "Durée", `Signature ${duCandidat(s)}`, `Signature ${de(lAcc(o, f, s))}`],
    rows: cal.map((x) => [String(x.num), frLongVAE(x.date), x.horaire, `${x.duree} h`, x.realisee ? cellule(s.signatureUrl, true) : "À venir", x.realisee ? cellule(sigAcc, true) : "À venir"]),
  }, sections: [
    { heading: "Total", content: `<p>${nb(cal.filter((x) => x.realisee).reduce((a, x) => a + x.duree, 0), "heure réalisée", "heures réalisées")} sur ${heuresVAE(f)} heures prévues. ${/distanciel|distance/i.test(f.modalites) ? `Séances à distance : chaque séance est émargée par ${leCandidat(s)} et ${lAcc(o, f, s)} ; le journal de participation de l'outil de visioconférence est conservé et présenté à l'auditeur sur demande.` : ""}</p>` },
  ] });
}

/** Relevé des séances à distance (remplace l'ancien « temps de connexion » à IP générées). */
export function genVAEReleveDistance(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const cal = calendrierVAE(s, f);
  return buildDocument({ org: o, extraHtml: signatures([sigAccompagnateur(o, f, s, derniereFaite(cal))]), title: "RELEVÉ DES SÉANCES À DISTANCE – VAE", subtitle: `${esc(s.prenom)} ${esc(s.nom)}`, table: {
    headers: ["Séance", "Date", "Horaire prévu", "Durée", "Outil", "Statut"],
    rows: cal.map((x) => [String(x.num), frVAE(x.date), x.horaire, `${x.duree} h`, esc(lieuVAE(o, f)), x.realisee ? "Réalisée — présence attestée par la double signature (feuille d'émargement)" : "À venir"]),
  }, sections: [
    { heading: "Preuve de présence", content: `<p>Les séances se sont déroulées en visioconférence. La présence ${duCandidat(s)} et ${de(lAcc(o, f, s))} est attestée, pour chaque séance, par la feuille d'émargement signée par les deux parties ; le journal de participation de chaque séance est conservé dans l'outil de visioconférence (${esc(lieuVAE(o, f))}) et présenté à l'auditeur sur demande. Aucune donnée technique n'est reconstituée.</p>`, variant: "green" },
  ] });
}

export function genVAEProcedureAbandon(o: OrganismeInfo) {
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "PROCÉDURE DE PRÉVENTION DES ABANDONS – VAE", sections: [
    { heading: "Signaux d'alerte", content: `<p>Absence non prévenue, report répété, absence de nouvelle version du dossier entre deux séances, découragement exprimé.</p>` },
    { heading: "Actions", content: `<ol><li>Relance le jour même (courriel type) et appel sous 48 heures.</li><li>Entretien de remobilisation : causes, adaptation du rythme ou des objectifs intermédiaires.</li><li>Si besoin : orientation (${referentDe(o, o.referentHandicap)} handicap, conseiller en évolution professionnelle, aides).</li><li>Abandon confirmé : entretien de sortie (guide dédié), certificat de réalisation des heures effectuées, information sur la reprise possible du parcours.</li></ol>`, variant: "green" },
  ] });
}
export function genVAEEviterEchec(o: OrganismeInfo) {
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "PRÉVENIR LES SITUATIONS D'ÉCHEC – VAE", sections: [
    { heading: "En amont", content: `<p>Entretien de faisabilité argumenté sur le référentiel ; réorientation si l'expérience ne correspond pas à la certification.</p>` },
    { heading: "Pendant", content: `<p>Priorité aux blocs fragiles, relectures régulières, portefeuille de preuves vérifié, mise en situation d'entretien.</p>` },
    { heading: "Après le jury", content: `<p>En cas de validation partielle : les blocs obtenus sont acquis définitivement ; plan d'action pour les blocs manquants (nouvelle VAE, formation).</p>`, variant: "green" },
  ] });
}
export function genVAEFavoriserEngagement(o: OrganismeInfo) {
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "FAVORISER L'ENGAGEMENT DES CANDIDATS – VAE", sections: [
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
      ? `<p>${esc(o.nom)} atteste que ${esc(s.civilite || "")} ${esc(s.prenom)} ${esc(s.nom)} a participé à ${nb(faites.length, "séance", "séances")} d'accompagnement VAE, soit ${nb(faites.reduce((a, x) => a + x.duree, 0), "heure", "heures")}, entre le ${frVAE(faites[0].date)} et le ${d}, conformément aux feuilles d'émargement.</p>`
      : `<p>Aucune séance n'est réalisée au ${frVAE(aujourdhui())} : l'attestation est établie après la première séance, sur la base des feuilles d'émargement.</p>` },
  ], extraHtml: faites.length ? signatures([sigOrganisme(o, d)]) : "" });
}

/** IND 16 — l'OF prépare et vérifie les conditions de présentation ; il ne convoque ni ne décide. */
export function genVAEProcedureJury(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "PROCÉDURE DE PRÉPARATION ET DE PRÉSENTATION AU JURY – VAE", subtitle: c.intitule, sections: [
    { heading: "Exigences du certificateur", content: `<p>Certificateur : ${esc(c.certificateur)}. Les modalités de dépôt du dossier de validation, le calendrier des jurys, la composition du jury et les éventuelles mises en situation sont fixés par le certificateur et communiqués sur la plateforme France VAE (vae.gouv.fr). ${esc(o.nom)} vérifie ces exigences au démarrage de chaque accompagnement.</p>` },
    { heading: "Rôle de l'organisme", content: `<ol><li>Informer le candidat des exigences formelles (format du dossier, pièces, délais).</li><li>Vérifier avant dépôt que le dossier est complet (liste de contrôle).</li><li>Aider à formuler une demande d'aménagement d'épreuve si nécessaire.</li><li>Préparer l'entretien avec le jury (mise en situation).</li><li>Recueillir la décision du jury auprès du candidat pour le suivi des résultats.</li></ol>`, variant: "green" },
    { heading: "Ce que l'organisme ne fait pas", content: `<p>Il ne prononce pas la recevabilité, ne convoque pas le candidat, ne siège pas au jury et ne notifie aucune décision : ces pièces émanent du certificateur, sont notifiées au candidat sur France VAE et conservées dans son dossier de suivi.</p>` },
  ] });
}

export function genVAESuiviJury(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const c = certifVAE(f);
  const ch = chronoVAE(s, f, o);
  const pret = estPasse(ch.derniereSeance);
  return buildDocument({ org: o, extraHtml: signatures([sigAccompagnateur(o, f, s, pret ? frVAE(ch.derniereSeance) : undefined)]), title: "FICHE DE SUIVI DE LA PRÉSENTATION AU JURY – VAE", subtitle: `${esc(s.prenom)} ${esc(s.nom)} — ${esc(c.intitule)}`, table: {
    headers: ["Contrôle", "Statut"],
    rows: [
      [`Exigences du certificateur communiquées ${auCandidat(s)}`, estPasse(ch.premiereSeance) ? `Oui — séance du ${frVAE(ch.premiereSeance)}` : "À venir"],
      ["Dossier de validation complet (liste de contrôle)", estPasse(ch.depotValidation) ? `Vérifié le ${frVAE(ch.depotValidation)}` : "À venir"],
      ["Demande d'aménagement d'épreuve", s.rqth === "oui" ? `Demande adressée au certificateur par ${leCandidat(s)}, avec l'aide ${de(lAcc(o, f, s))}` : "Sans objet (aucun besoin signalé)"],
      ["Mise en situation d'entretien réalisée", pret ? `Oui — ${frVAE(ch.derniereSeance)}` : "À venir"],
      ["Convocation au jury", `Relève du certificateur (${esc(c.certificateur)}) via France VAE ; la date de passage est fixée et communiquée par lui ${auCandidat(s)}`],
      ["Décision du jury", `Prononcée par le jury et notifiée ${auCandidat(s)} par le certificateur (validation totale, partielle ou refus) ; recueillie auprès ${duCandidat(s)} et consignée dans le suivi des résultats`],
    ],
  } });
}

// ───────────────────────────── CRITÈRES 4 et 5 ─────────────────────────────

export function genVAEMoyensDedies(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "MOYENS DÉDIÉS À L'ACCOMPAGNEMENT VAE", sections: [
    { heading: "Moyens humains", content: `<p>${femPersonne(o, f.formateur || o.responsablePedagogique) ? "Accompagnatrice" : "Accompagnateur"} : ${esc(f.formateur || o.responsablePedagogique)} ; ${referentDe(o, o.referentHandicap)} handicap : ${esc(o.referentHandicap)} ; administratif : ${esc(o.poleAdministratif)}.</p>` },
    { heading: "Moyens techniques", content: `<p>${[o.outilsUtilises?.trim() ? esc(o.outilsUtilises.trim()) : aDistance(f) ? `outil de visioconférence (${esc(lieuVAE(o, f))})` : "", "partage de documents sécurisé", "référentiel de certification et guides du certificateur"].filter(Boolean).join(" ; ")}.</p>` },
    { heading: "Environnement", content: `<p>${/distanciel|distance/i.test(f.modalites) ? "Séances à distance en visioconférence, sur un créneau réservé et un lien individuel ; confidentialité garantie." : `Bureau fermé garantissant la confidentialité : ${esc(o.adresse)}, ${esc(o.codePostal)} ${esc(o.ville)}.`}</p>`, variant: "green" },
  ] });
}
export function genVAEMoyensTechniquesPresentiel(o: OrganismeInfo) {
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "MOYENS TECHNIQUES ET ENVIRONNEMENT (PRÉSENTIEL)", sections: [
    { heading: "Locaux", content: `<p>${esc(o.adresse)}, ${esc(o.codePostal)} ${esc(o.ville)} : espace d'entretien fermé, poste informatique, connexion internet, impression des documents de travail. Accessibilité à vérifier avec le candidat avant la première séance ; solution à distance proposée si les locaux ne sont pas adaptés.</p>` },
  ] });
}
export function genVAECoordinationAccompagnateurs(o: OrganismeInfo) {
  const seul = memePersonne(o.responsablePedagogique, o.dirigeant) && (!o.poleAdministratif?.trim() || memePersonne(o.poleAdministratif, o.dirigeant));
  const qualiteExterne = !!o.referentQualite?.trim() && !referentQualiteEstDirigeant(o);
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "COORDINATION DES INTERVENANTS – VAE", table: { headers: ["Fonction", "Titulaire", "Rôle"], rows: [
    ["Direction", esc(o.dirigeant), "Contractualisation, validation des plannings, réclamations"],
    ["Accompagnement / pédagogie", esc(o.responsablePedagogique), "Faisabilité, séances, relectures, préparation au jury"],
    ["Handicap", esc(o.referentHandicap), "Aménagements, lien avec les partenaires"],
    ["Administratif", esc(o.poleAdministratif), "Contrats, émargements, certificats"],
    ["Qualité", esc(o.referentQualite), "Indicateurs, veille, amélioration continue"],
  ] }, sections: [
    { heading: "Coordination", content: seul
      ? `<p>Structure unipersonnelle : ${Dirigeant(o).toLowerCase()} assure l'ensemble des fonctions pédagogiques et administratives${qualiteExterne ? ` ; un point avec le référent qualité (${esc(o.referentQualite)}) a lieu avant chaque nouvel accompagnement et à chaque difficulté signalée` : ""}. Les décisions sont notées dans la fiche de suivi du candidat.</p>`
      : `<p>Point de coordination avant chaque nouvel accompagnement et à chaque difficulté signalée ; les décisions sont notées dans la fiche de suivi du candidat.</p>`, variant: "green" },
  ] });
}
export function genVAEAnnuaireContacts(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "ANNUAIRE DES CONTACTS – VAE", table: { headers: ["Contact", "Rôle", "Coordonnées"], rows: [
    [esc(o.nom), "Organisme accompagnateur", `${esc(o.email)}${telOrg(o)}`],
    [esc(o.responsablePedagogique), femPersonne(o, o.responsablePedagogique) ? "Accompagnatrice / référente VAE" : "Accompagnateur / référent VAE", esc(o.email)],
    [esc(o.referentHandicap), `${Referent(o, o.referentHandicap)} handicap`, esc(o.email)],
    ["France VAE", "Plateforme nationale de la VAE", "vae.gouv.fr"],
    ["France Travail", "Aides et financement pour les demandeurs d'emploi", "francetravail.fr"],
    ["Mon Compte Formation", "Financement CPF", "moncompteformation.gouv.fr"],
    ["Agefiph", "Compensation du handicap", "agefiph.fr"],
  ] } });
}
export function genVAEDifferentsPoles(o: OrganismeInfo) {
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "LES DIFFÉRENTS PÔLES – VAE", sections: [
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
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "FICHE DE POSTE – ACCOMPAGNATEUR VAE", sections: [
    { heading: "Missions", content: `<ul><li>Conduire l'entretien de faisabilité et argumenter l'avis ;</li><li>accompagner la description des activités sans rédiger à la place du candidat ;</li><li>relire et questionner les versions du dossier ;</li><li>préparer l'entretien avec le jury ;</li><li>tracer le suivi (émargements, fiches de suivi).</li></ul>` },
    { heading: "Compétences requises", content: `<ul><li>Maîtrise de la démarche VAE et du cadre réglementaire (loi n° 2022-1598, décret n° 2023-1275) ;</li><li>connaissance du métier et du référentiel de la certification accompagnée ;</li><li>techniques d'entretien d'explicitation et d'écoute ;</li><li>accueil des personnes en situation de handicap.</li></ul>`, variant: "green" },
  ] });
}

/** IND 21 — compétences de l'accompagnateur et justificatifs à joindre. */
export function genVAECompetencesAccompagnateur(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  const acc = f.formateur || o.responsablePedagogique || o.dirigeant;
  const fem = femPersonne(o, acc);
  const dossier = `classés au dossier ${fem ? "de l'accompagnatrice" : "de l'accompagnateur"}`;
  return buildDocument({ org: o, title: `COMPÉTENCES ${fem ? "DE L'ACCOMPAGNATRICE" : "DE L'ACCOMPAGNATEUR"} VAE ET JUSTIFICATIFS`, subtitle: esc(acc), table: {
    headers: ["Compétence requise", "Mode de vérification", "Justificatifs"],
    rows: [
      [`Connaissance du métier visé (${esc(c.intitule)})`, "Expérience professionnelle ou certification dans le domaine", `CV daté et signé, diplômes et certificats du domaine, ${dossier}`],
      ["Maîtrise de la démarche et du cadre VAE", "Formation ou pratique d'accompagnement VAE", `Attestations de formation et références d'accompagnements réalisés, ${dossier}`],
      ["Techniques d'entretien et d'explicitation", "Formation ou pratique d'entretien individuel", `Attestations et lettres de mission, ${dossier}`],
      ["Accueil des publics en situation de handicap", "Sensibilisation ou formation", `Attestation de sensibilisation, ${dossier}`],
    ],
  }, sections: [
    { heading: "Évaluation", content: `<p>Compétences vérifiées à l'entrée en fonction, puis évaluées chaque année (retours des candidats, observation d'une séance, entretien professionnel) ; les besoins identifiés alimentent le plan de développement des compétences (indicateur 22).</p>`, variant: "green" },
  ], extraHtml: signatures([{ label: fem ? "L'accompagnatrice" : "L'accompagnateur", nom: acc, date: dateSysteme(o), sig: sigAccUrl(o, f) }, sigOrganisme(o, dateSysteme(o))]) });
}

export function genVAEPlanDevAccompagnateurs(o: OrganismeInfo, f: FormationInfo) {
  // Pièce V10 (ligne IND 12) : version ultérieure ; les formations réalisées restent calculées sur le dossier d'origine.
  const oV = orgV10(o);
  const annee = anneeSysteme(oV);
  return buildDocument({ org: oV, signatures: sigSysteme(oV), title: "PLAN DE DÉVELOPPEMENT DES COMPÉTENCES – ACCOMPAGNATEURS VAE", subtitle: `Année ${annee}`, table: {
    headers: ["Besoin", "Action", "Bénéficiaire", "Échéance", "Statut"],
    rows: [
      ...formationsIziRealisees(o).map(fi => ["Gestion et automatisation du centre", `${fi.nom} — IZIBUSINESS / Nadine DENDANI — ${fi.duree}`, esc(o.dirigeant), `Du ${formatDateIzi(fi.debut)} au ${formatDateIzi(fi.fin)}`, "Réalisée — attestation commune jointe (28 heures)"]),
      ["Actualisation réglementaire VAE", "Veille et appropriation de la réforme (loi n° 2022-1598, décret n° 2023-1275, plateforme vae.gouv.fr)", esc(f.formateur || o.responsablePedagogique), `${annee}`, "Planifiée"],
      ["Référentiel qualité 2026", "Appropriation du décret n° 2026-728 (33 indicateurs)", esc(referentQualiteEstDirigeant(o) || !/extern|fd\s*certif/i.test(o.referentQualite || "") ? o.referentQualite || o.dirigeant : o.dirigeant), `${annee}`, "Planifiée"],
      ["Accueil du handicap", "Sensibilisation (ressources Agefiph)", esc(o.referentHandicap), `${annee}`, "Planifiée"],
      ...(versionReferentiel(o) === "V10" ? [["Prévention des violences (IND 12)", `Formation ${femPersonne(o, referentSignalements(o)) ? "de la référente" : "du référent"} à la prévention des violences sexistes et sexuelles, du harcèlement et des discriminations`, esc(referentSignalements(o)), `${annee}`, "Planifiée"]] : []),
      ["Actualisation métier", `Veille sur le référentiel ${esc(certifVAE(f).code)} et les pratiques du métier`, esc(f.formateur || o.responsablePedagogique), `${annee}`, "Planifiée"],
    ],
  }, sections: [
    { heading: "Suivi", content: `<p>Le statut passe à « réalisée » sur présentation d'une attestation ; les attestations sont classées au dossier ${femPersonne(o, f.formateur || o.responsablePedagogique) ? "de l'accompagnatrice" : "de l'accompagnateur"}.</p>`, variant: "green" },
  ] });
}

// ───────────────────────────── CRITÈRE 6 ─────────────────────────────

export function genVAEVeilleReglementaire(o: OrganismeInfo) {
  const refs = referencesReglementaires(o).filter((r) => r.types.includes("VAE"));
  const plancher = parseDateVAE(o.dateMaj);
  // Même règle que le tableau de veille exploitée : prise en compte 5 jours ouvrés après la parution, jamais avant la V1 ni après aujourd'hui.
  const priseD = (d: string) => {
    const x = parseDateVAE(d);
    if (!x) return null;
    let p = ajouterJoursOuvres(x, 5);
    if (plancher && p.getTime() < plancher.getTime()) p = plancher;
    return p.getTime() > aujourdhui().getTime() ? aujourdhui() : p;
  };
  const prise = (d: string) => frVAE(priseD(d));
  // Un texte pris en compte après la V1 fait passer la pièce en version ultérieure datée de cette prise en compte.
  o = orgVersionUlterieure(o, dateMax(refs.map((r) => { const p = priseD(r.date); return p ? isoVAE(p) : ""; })));
  return buildDocument({ org: o, signatures: sigQualite(o), title: "VEILLE LÉGALE ET RÉGLEMENTAIRE – VAE", table: {
    headers: ["Texte", "Publication", "Prise en compte", "Contenu", "Exploitation", "Source"],
    rows: refs.map((r) => [esc(r.texte), frVAE(parseDateVAE(r.date)), prise(r.date), esc(r.objetVAE || r.objet), r.types.length === 1 ? "Mise à jour des supports VAE (terminologie France VAE, dossier de faisabilité, dossier de validation)" : "Mise à jour du système qualité et des procédures", `<a href="${r.source}">${esc(r.source)}</a>`]),
  }, sections: [
    { heading: "Organisation", content: `<p>Sources suivies : Légifrance, vae.gouv.fr, travail-emploi.gouv.fr, France Compétences. Revue mensuelle par ${esc(o.referentQualite)} ; chaque évolution est exploitée (supports, contrats, procédures) et tracée au tableau d'amélioration continue.</p>`, variant: "green" },
  ] });
}

export function genVAEVeilleMetiers(o: OrganismeInfo, f: FormationInfo) {
  const c = certifVAE(f);
  const fiche = c.code ? getRNCPByCode(c.code) : undefined;
  const rome = fiche?.codesROME?.length ? fiche.codesROME.join(", ") : "codes ROME de la fiche France Compétences";
  return buildDocument({ org: o, signatures: sigQualite(o), title: "VEILLE SUR LES COMPÉTENCES, MÉTIERS ET EMPLOIS – VAE", subtitle: c.intitule, table: {
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
  return buildDocument({ org: o, signatures: sigQualite(o), title: "VEILLE SUR LES INNOVATIONS PÉDAGOGIQUES ET TECHNOLOGIQUES – VAE", table: {
    headers: ["Thème", "Source", "Fréquence", "Exploitation"],
    rows: [
      ["Parcours dématérialisé France VAE", "vae.gouv.fr (espace candidat et accompagnateur)", "Trimestrielle", "Mise à jour du guide de dépôt remis aux candidats"],
      ["Classes virtuelles et accessibilité numérique", "Documentation des outils utilisés, ressources Agefiph", "Semestrielle", "Paramétrage des séances à distance (sous-titrage, partage d'écran)"],
      ["Portefeuille numérique de preuves", "Communautés de pratique de l'accompagnement", "Semestrielle", "Liste de contrôle du portefeuille de preuves"],
      ["Outils d'aide à la reformulation (dont IA générative)", "Publications institutionnelles et professionnelles", "Semestrielle", "Règle interne : le candidat reste seul auteur ; l'outil ne rédige pas le dossier"],
    ],
  }, sections: [
    { heading: "Organisation", content: `<p>${o.referentQualite?.trim() && !memePersonne(o.referentQualite, o.responsablePedagogique || o.dirigeant) ? `Veille pilotée par ${esc(o.referentQualite)}, exploitée par ${esc(o.responsablePedagogique || o.dirigeant)}` : `Veille tenue par ${esc(o.responsablePedagogique || o.dirigeant)}`} ; les innovations retenues sont testées puis intégrées aux supports, et tracées au tableau d'amélioration continue.</p>`, variant: "green" },
  ] });
}

export function genVAEAccessibiliteHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "ACCESSIBILITÉ ET HANDICAP – VAE", sections: [
    { heading: `${Referent(o, o.referentHandicap)} handicap`, content: `<p>${esc(o.referentHandicap)} — ${esc(o.email)}</p>` },
    { heading: "Réseau mobilisable", content: `<p>Agefiph, Cap emploi, MDPH, Ressource handicap formation de la région, médecine du travail (salariés).</p>` },
    { heading: "Aménagements", content: `<p>Rythme et durée des séances, supports adaptés, outils numériques d'accessibilité, séances à distance, aide à la demande d'aménagement des épreuves auprès du certificateur.</p>`, variant: "green" },
  ] });
}

export function genVAEPartenaires(o: OrganismeInfo, f: FormationInfo) {
  o = orgV10(o);
  const c = certifVAE(f);
  return buildDocument({ org: o, signatures: sigSysteme(o), title: "PARTENAIRES ET CERTIFICATEUR – VAE", table: { headers: ["Partenaire", "Nature de la relation", "Formalisation"], rows: [
    [esc(c.certificateur), `Certificateur de ${esc(c.intitule)} : recevabilité, jury, délivrance`, "Relation institutionnelle via vae.gouv.fr — aucune sous-traitance"],
    ["France VAE", "Plateforme nationale du parcours", "Inscription de l'organisme en tant qu'accompagnateur selon les modalités de la plateforme"],
    ["Conseillers en évolution professionnelle / France Travail", "Orientation des candidats", "Échanges au cas par cas"],
    ["Agefiph / Cap emploi", "Compensation du handicap", "Sollicitation au cas par cas"],
  ] }, sections: [
    { heading: "Sous-traitance et portage salarial", content: memePersonne(accompagnateur(o, f), o.dirigeant)
      ? `<p>${esc(o.nom)} ne recourt ni à la sous-traitance ni au portage salarial : l'accompagnement est assuré par ${dirigeanteFem(o) ? "sa dirigeante" : "son dirigeant"}, ${esc(o.dirigeant)}. Tout recours ultérieur est inscrit au registre dédié (indicateur 27, décret n° 2026-728).</p>`
      : `<p>Tout recours à la sous-traitance ou au portage salarial est inscrit au registre dédié (indicateur 27, décret n° 2026-728).</p>` },
  ] });
}

// ───────────────────────────── CRITÈRE 7 ─────────────────────────────

const CRITERES_SATISFACTION = ["Accueil et information", "Entretien de faisabilité", "Qualité de l'accompagnement", "Ressources remises", "Préparation à l'entretien avec le jury", "Organisation et respect du calendrier"];

/** Réponses du candidat au questionnaire : jamais générées ; aucune réponse saisie → tableau vide. */
export function satisfactionNotes(_s: StagiaireInfo, _f: FormationInfo): number[] {
  return [];
}

export function genVAESatisfaction(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = cand(stagiaires, si);
  const ch = chronoVAE(s, f, o);
  const fait = estPasse(ch.fin);
  const notes = fait ? satisfactionNotes(s, f) : [];
  const repondu = notes.length === CRITERES_SATISFACTION.length;
  return buildDocument({ org: o, extraHtml: repondu ? signatures([sigCandidat(s, frVAE(ch.fin))]) : "", title: "QUESTIONNAIRE DE SATISFACTION – FIN D'ACCOMPAGNEMENT VAE", subtitle: `${esc(s.prenom)} ${esc(s.nom)}`, table: {
    headers: ["Critère", "1", "2", "3", "4", "5"],
    rows: CRITERES_SATISFACTION.map((c, i) => [c, ...[1, 2, 3, 4, 5].map((n) => (notes[i] === n ? "☒" : "☐"))]),
  }, sections: [
    { heading: "Statut", content: repondu
      ? `<p>Questionnaire rempli par le candidat le ${frVAE(ch.fin)} à l'issue de la dernière séance. Moyenne : ${(notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(1).replace(".", ",")}/5.</p>`
      : fait
        ? `<p>Questionnaire remis à ${esc(profilVAE(s, f).civ || "")} ${esc(s.nom)} le ${frVAE(ch.fin)}, à l'issue de la dernière séance, pour être rempli et signé par ${femCand(s) ? "elle seule" : "lui seul"} ; l'organisme ne complète jamais les réponses. Ses réponses alimentent la synthèse des appréciations (indicateur 30).</p>`
        : `<p>Questionnaire remis ${auCandidat(s)} à l'issue de la dernière séance, prévue le ${frVAE(ch.fin)}.</p>` },
  ] });
}

export function genVAESyntheseSatisfaction(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const acheves = valides(stagiaires).filter((s) => estPasse(parseDateVAE(s.dateFinFormation || f.dateFin)));
  if (!acheves.length) {
    return buildDocument({ org: o, signatures: sigQualite(o), title: "SYNTHÈSE DES APPRÉCIATIONS – VAE", sections: [
      { heading: "Statut", content: `<p>Aucun accompagnement n'est encore achevé au ${frVAE(aujourdhui())} : la synthèse sera établie à partir des premiers questionnaires de fin d'accompagnement.</p>` },
    ] });
  }
  const recus = acheves.filter((s) => satisfactionNotes(s, f).length === CRITERES_SATISFACTION.length);
  if (!recus.length) {
    const saisi = (f.tauxSatisfaction || "").trim();
    const un = acheves.length === 1 ? acheves[0] : null;
    return buildDocument({ org: orgAu(o, aujourdhui()), signatures: sigQualite(o, frVAE(aujourdhui())), title: "SYNTHÈSE DES APPRÉCIATIONS – VAE", subtitle: `Au ${frVAE(aujourdhui())}`, sections: [
      { heading: "Statut", content: saisi
        ? `<p>Taux de satisfaction des candidats : <strong>${esc(saisi)}</strong>${f.nombreAvisSatisfaction ? ` (${esc(f.nombreAvisSatisfaction)} avis)` : ""}, d'après les questionnaires de fin d'accompagnement reçus.</p>`
        : un
          ? `<p>Au ${frVAE(aujourdhui())}, un accompagnement est achevé (${esc(un.prenom)} ${esc(un.nom)}, dernière séance le ${frVAE(chronoVAE(un, f, o).fin)}). Le questionnaire de fin d'accompagnement ${femCand(un) ? "lui" : "lui"} a été remis ce jour-là. La synthèse est établie critère par critère à partir des seuls questionnaires remplis et signés par les candidats ; aucun taux n'est extrapolé.</p>`
          : `<p>Au ${frVAE(aujourdhui())}, ${acheves.length} accompagnements sont achevés ; le questionnaire de fin d'accompagnement a été remis à chaque candidat à l'issue de sa dernière séance. La synthèse est établie critère par critère à partir des seuls questionnaires remplis et signés par les candidats ; aucun taux n'est extrapolé.</p>` },
    ] });
  }
  const moy = CRITERES_SATISFACTION.map((_, i) => recus.reduce((a, s) => a + satisfactionNotes(s, f)[i], 0) / recus.length);
  return buildDocument({ org: orgAu(o, aujourdhui()), signatures: sigQualite(o, frVAE(aujourdhui())), title: "SYNTHÈSE DES APPRÉCIATIONS – VAE", subtitle: `${nb(recus.length, "questionnaire", "questionnaires")} — au ${frVAE(aujourdhui())}`, table: {
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

export function genVAEProcedureReclamation(o: OrganismeInfo, f?: FormationInfo) {
  o = orgV10(o);
  return buildDocument({ org: o, signatures: sigQualite(o), title: "PROCÉDURE DE TRAITEMENT DES DIFFICULTÉS, RÉCLAMATIONS ET ALÉAS – VAE", sections: [
    { heading: "Dépôt", content: `<p>Par courriel (${esc(o.email)}), par courrier (${esc(o.nom)}, ${esc(o.adresse)}, ${esc(o.codePostal)} ${esc(o.ville)}) ou oralement auprès ${femPersonne(o, o.responsablePedagogique) ? "de l'accompagnatrice" : "de l'accompagnateur"} (retranscription écrite).</p>` },
    { heading: "Traitement", content: `<p>1. Accusé de réception sous 48 heures ouvrées.<br>2. Analyse par ${esc(o.referentQualite)}.<br>3. Réponse écrite sous 15 jours ouvrés.<br>4. Action corrective si nécessaire, inscrite au tableau d'amélioration continue.<br>5. Vérification de la satisfaction du réclamant.</p>`, variant: "green" },
    { heading: "Aléas", content: `<p>Absence ${femPersonne(o, o.responsablePedagogique) ? "de l'accompagnatrice" : "de l'accompagnateur"}, incident technique, report de jury par le certificateur : information du candidat sous 24 heures et proposition d'une solution (${f && aDistance(f) ? "report de la séance, bascule sur un outil de visioconférence de secours ou sur le téléphone" : "report, séance à distance"}).</p>` },
    ...(rappelViolences(o) ? [{ heading: "Violences, harcèlement, discriminations (IND 12)", content: `<p>Ces situations ne relèvent pas de la réclamation ordinaire : elles suivent la procédure dédiée. ${rappelViolences(o)}</p>`, variant: "orange" as const }] : []),
  ] });
}

export function genVAERegistreReclamations(o: OrganismeInfo) {
  const jour = frVAE(aujourdhui());
  const ouvert = dateSysteme(o);
  o = orgAu(o, aujourdhui());
  return buildDocument({ org: o, signatures: sigQualite(o, jour), title: "REGISTRE DES RÉCLAMATIONS ET ALÉAS – VAE", subtitle: `Ouvert le ${ouvert} — arrêté au ${jour}`, table: {
    headers: ["N°", "Date", "Origine", "Objet", "Accusé de réception", "Réponse", "Action corrective", "Clôture"],
    rows: [["—", "—", "—", `Aucune réclamation ni aucun aléa enregistrés du ${ouvert} au ${jour}`, "—", "—", "—", "—"]],
  }, sections: [
    { heading: "Tenue", content: `<p>Toute réclamation ou tout aléa est inscrit dès réception. Le registre est analysé à chaque revue qualité.</p>`, variant: "green" },
  ] });
}

export function genVAEPlanAmelioration(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[] = []) {
  const annee = anneeSysteme(o);
  const jour = frVAE(aujourdhui());
  const finis = valides(stagiaires).map((s) => chronoVAE(s, f, o).fin).filter((d): d is Date => !!d && estPasse(d));
  const ouvert = dateSysteme(o);
  const o0 = o;
  o = orgAu(o, aujourdhui());
  return buildDocument({ org: o, signatures: sigQualite(o, jour), title: "TABLEAU D'AMÉLIORATION CONTINUE – VAE", subtitle: `Ouvert le ${ouvert} — mis à jour le ${jour}`, table: {
    headers: ["Origine", "Constat", "Action", "Pilote", "Échéance", "Statut"],
    rows: [
      ["Veille réglementaire", "Réforme de la VAE (loi n° 2022-1598, décret n° 2023-1275)", "Supports mis à jour : dossier de faisabilité, dossier de validation, vae.gouv.fr, suppression de la durée minimale", esc(o.responsablePedagogique), `${annee}`, "Réalisé à l'ouverture du dossier"],
      ["Référentiel qualité 2026", "Décret n° 2026-728 : analyse des risques (IND 32), portage salarial (IND 27)", "Analyse des risques qualité et registre de sous-traitance / portage établis", esc(o.referentQualite), versionReferentiel(o0) === "V10" ? formatDate(dateV10(o0)) : `${annee}`, "Réalisé"],
      ...(versionReferentiel(o) === "V10" ? [
        ["Veille réglementaire (IND 23)", "Référentiel national qualité (décret n° 2026-728) : procédure violences, harcèlement et discriminations (IND 12), audit interne et suivi des heures (IND 32)", "Procédure, registre des signalements, programme d'audit interne et suivi des heures établis", esc(o.referentQualite || o.dirigeant), formatDate(dateV10(o0)), "Réalisé"],
        ["Audit interne (IND 32)", "Audit interne annuel du dispositif VAE", "Grille d'audit interne appliquée avant chaque audit de certification", esc(o.referentQualite || o.dirigeant), "Annuelle, avant chaque audit de certification", "Planifié"],
      ] : []),
      ["Analyse des risques", "Risque de dossier rédigé à la place du candidat", "Traçabilité des versions du dossier de validation (relectures datées) et règle « le candidat reste seul auteur »", esc(o.responsablePedagogique), `Revue ${aujourdhui().getFullYear()}`, "En cours"],
      ["Appréciations", "Premiers questionnaires de fin d'accompagnement", finis.length ? `Questionnaire remis le ${frVAE(finis[0])} ; analyse critère par critère à réception de la réponse signée` : "Analyse et action sur le critère le moins bien noté", esc(o.referentQualite), "À chaque fin de parcours", finis.length ? "En cours" : "Planifié"],
    ],
  }, sections: [
    { heading: "Fonctionnement", content: `<p>Le tableau est alimenté par les appréciations (IND 30), les réclamations et aléas (IND 31), la veille (IND 23 à 25) et l'analyse des risques qualité (IND 32). Revue au moins annuelle.</p>`, variant: "green" },
  ] });
}

// ───────────────────────────── Registre 2026 ─────────────────────────────

export const genVAEAnalyseRisques = (o: OrganismeInfo, f: FormationInfo) => genAnalyseRisquesQualite(o, "VAE", f, versionReferentiel(o) === "V10" ? { dateDoc: dateV10(o) } : undefined);

/** Point d'entrée unique du switch de documentGenerator pour les templates « vae_* ». */
export function renderVAETemplate(template: string, params: Record<string, any> | undefined, o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]): string | null {
  const si = params?.stagiaireIdx ?? 0;
  switch (template) {
    case "vae_plaquette_info": return genVAEPlaquetteInfo(o, f);
    case "vae_diffusion_info": return genVAEDiffusionInfo(o, f);
    case "vae_procedure_info": return genVAEProcedureInfo(o);
    case "vae_indicateurs_resultats": return genVAEIndicateursResultats(o, f, stagiaires);
    case "vae_presentation_nouvel_entrant": return genVAEPresentationNouvelEntrant(o, f, stagiaires);
    case "vae_taux_certification": return genVAETauxCertification(o, f, stagiaires);
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
    case "vae_handicap_formalisation": return genVAEHandicapFormalisation(o, f, stagiaires);
    case "vae_handicap_bilan": return genVAEHandicapBilan(o);
    case "vae_mail_handicap": return genVAEMailHandicap(o);
    case "vae_referentiel_accompagnement": return genVAEReferentielAccompagnement(o, f);
    case "vae_engagements_respectifs": return genVAEEngagementsRespectifs(o, f);
    case "vae_programme_accompagnement": return genVAEProgrammeAccompagnement(o, f, stagiaires);
    case "vae_livret2":
    case "vae_trame_dossier_validation": return genVAETrameDossierValidation(o, f, stagiaires, si);
    case "vae_sequencage": return genVAESequencage(o, f, stagiaires);
    case "vae_positionnement_debut": return genVAEPositionnement(o, f, stagiaires, si, "debut");
    case "vae_positionnement_fin": return genVAEPositionnement(o, f, stagiaires, si, "fin");
    case "vae_livret_accueil": return genVAELivretAccueil(o, f);
    case "vae_cgv": return genVAECGV(o);
    case "vae_reglement_interieur": return genVAEReglementInterieur(o);
    case "vae_droit_image": return genVAEDroitImage(o, f, stagiaires, si);
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
    case "vae_satisfaction": return genVAESatisfaction(o, f, stagiaires, si);
    case "vae_synthese_satisfaction": return genVAESyntheseSatisfaction(o, f, stagiaires);
    case "vae_appreciations_parties_prenantes": return genVAEAppreciationsPartiesPrenantes(o);
    case "vae_procedure_reclamation": return genVAEProcedureReclamation(o, f);
    case "vae_registre_reclamations": return genVAERegistreReclamations(o);
    case "vae_plan_amelioration": return genVAEPlanAmelioration(o, f, stagiaires);
    case "vae_analyse_risques": return genVAEAnalyseRisques(o, f);
    default: return null;
  }
}
