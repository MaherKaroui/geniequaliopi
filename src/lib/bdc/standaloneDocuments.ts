import { buildDocument, tableHTML } from "@/lib/docBuilder";
import { withActiveDossierStyle } from "@/lib/dossierDesign";
import { formatDuree, formatPrix, typeContrat, parseDateAny } from "./bdcModel";
import { bdcEffectiveDates, bdcFollowupDate, bdcFollowupDue, bdcIsFinished, standaloneBdcContext } from "./standaloneModel";
import type { StandaloneBdcData, BdcDeclarations } from "./standaloneTypes";
import { BDC_QUESTIONS, BDC_SATISFACTION_CRITERIA, bdcQuestionKey, type BdcQuestionGroup } from "./standaloneQuestions";
import { bdcHeldSessions } from "./standaloneAI";

export const BDC_STANDALONE_DOCUMENTS = [
  { id: "besoins", title: "Recueil des besoins" },
  { id: "devis", title: "Devis" },
  { id: "entretien", title: "Compte rendu d’entretien préalable" },
  { id: "programme", title: "Programme BDC" },
  { id: "contrat", title: "Contrat ou convention" },
  { id: "planning", title: "Planning individuel" },
  { id: "accueil", title: "Livret d’accueil et règlement intérieur" },
  { id: "parcours", title: "Questionnaire de parcours professionnel" },
  { id: "competences", title: "Grille d’analyse des compétences" },
  { id: "motivations", title: "Questionnaire motivations et intérêts" },
  { id: "metiers", title: "Fiches d’exploration des métiers" },
  { id: "carnet", title: "Carnet de bord et exercices" },
  { id: "emargement", title: "Feuilles d’émargement" },
  { id: "seances", title: "Comptes rendus des séances" },
  { id: "planAction", title: "Plan d’action professionnel" },
  { id: "synthese", title: "Document de synthèse confidentiel" },
  { id: "satisfaction", title: "Questionnaire de satisfaction à chaud" },
  { id: "suivi", title: "Questionnaire et compte rendu de suivi à six mois" },
] as const;
export type BdcDocumentId = typeof BDC_STANDALONE_DOCUMENTS[number]["id"];

export function bdcEscape(value: string | undefined): string {
  return (value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
// One paragraph per line so long answers can flow across PDF pages.
const text = (value: string) => value.split(/\n+/).map(line => line.trim()).filter(Boolean).map(line => `<p>${bdcEscape(line)}</p>`).join("") || "<p></p>";
const h = (title: string, content: string) => `<h2>${bdcEscape(title)}</h2>${content}`;
const blank = () => `<p class="bdc-answer">À compléter par le bénéficiaire et le consultant.</p><div class="bdc-writing"></div>`;
const answer = (title: string, value: string) => h(title, value.trim() ? text(value) : blank());
const rows = (headers: string[], data: string[][]) => tableHTML(headers.map(bdcEscape), data.map(row => row.map(bdcEscape)));

const safeImage = (src?: string) => src && (/^data:image\/(png|jpeg|webp);base64,/i.test(src) || /^https:\/\//i.test(src)) ? bdcEscape(src) : "";
const longDate = (value: Date | null) => value ? value.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "";

function signatures(d: StandaloneBdcData, beneficiary = true, company = false, actual = true) {
  const parties = [{ label: "L’organisme — représentant légal", name: d.organisme.dirigeant, image: actual ? d.organisme.tamponUrl || d.organisme.signatureUrl : "" }];
  if (beneficiary) parties.push({ label: "Le bénéficiaire", name: `${d.beneficiaire.prenom} ${d.beneficiaire.nom}`, image: actual ? d.beneficiaire.signatureUrl : "" });
  if (company) parties.push({ label: "L’entreprise", name: `${d.beneficiaire.entreprise} — ${d.beneficiaire.responsableEntreprise || ""}`, image: actual ? d.beneficiaire.signatureResponsableUrl : "" });
  return `<div class="bdc-signatures"><h2>Signatures / visa</h2><table class="bdc-signature-table"><tbody><tr>${parties.map(p => `<td><strong>${p.label}</strong><p>${bdcEscape(p.name)}</p>${safeImage(p.image) ? `<img src="${safeImage(p.image)}" alt="${p.label}" width="170" height="90">` : '<div class="bdc-signature-space"></div>'}</td>`).join("")}</tr></tbody></table></div>`;
}

export function bdcDocumentTitle(id: BdcDocumentId, d: StandaloneBdcData) {
  if (id === "contrat") return typeContrat(standaloneBdcContext(d).prestation).libelle;
  return BDC_STANDALONE_DOCUMENTS.find(item => item.id === id)?.title || "Bilan de compétences";
}

export function buildStandaloneBdcDocument(d: StandaloneBdcData, id: BdcDocumentId): string {
  const ctx = standaloneBdcContext(d), p = ctx.prestation;
  const o = d.organisme, b = d.beneficiaire, c = d.declarations;
  const dates = bdcEffectiveDates(d), finished = bdcIsFinished(d);
  const date = (v: string) => longDate(parseDateAny(v));
  const followup = longDate(bdcFollowupDate(d));
  const confidentiality = "Les résultats détaillés et le document de synthèse sont remis au seul bénéficiaire. Aucune transmission à un tiers sans son accord écrit. Le consultant est tenu au secret professionnel (art. L6313-4 du Code du travail). Les documents sont détruits au terme du bilan, sauf accord écrit de conservation motivé par le suivi, pour trois ans au plus (art. R6313-7).";
  const programme = rows(["Phase", "Objectifs et méthodes", "Livrables"], [
    ["Préliminaire", "Analyser la demande ; définir conjointement le format, les objectifs et les modalités du bilan ; entretien individuel.", "Recueil des besoins, objectifs et planning individualisé"],
    ["Investigation", "Analyser le parcours, les compétences, les aptitudes et les motivations ; explorer les métiers et vérifier la faisabilité des pistes ou construire des alternatives.", "Portefeuille de compétences, questionnaires, fiches d’enquête métier"],
    ["Conclusion", "S’approprier les résultats, identifier les facteurs favorables et les freins ; définir les étapes de mise en œuvre.", "Plan d’action et document de synthèse confidentiel"],
  ]);
  const planning = rows(["Séance / phase", "Date", "Horaires", "Durée", "Objet"], d.sessions.map(s => [`${s.numero} — ${s.phase === 1 ? "Préliminaire" : s.phase === 2 ? "Investigation" : "Conclusion"}`, date(s.date), `${s.heureDebut} – ${s.heureFin}`, `${s.duree} h`, s.objet]));
  const contact = [o.email, o.telephone.trim() ? `Téléphone : ${o.telephone}` : ""].filter(Boolean).join(" — ");
  const confirmed = (key: keyof BdcDeclarations) => finished ? c[key] : "";
  const questions = (group: BdcQuestionGroup, filled = true) => BDC_QUESTIONS[group].map((item, i) => answer(`${i + 1}. ${item}`, filled ? d.reponses?.[bdcQuestionKey(group, i)] || "" : "")).join("");
  const tableOr = (filled: string[][] | undefined, width: number, count: number) => filled?.length ? filled.map(r => Array.from({ length: width }, (_, i) => r[i] || "")) : Array.from({ length: count }, () => ["À renseigner", ...Array(width - 1).fill("")]);
  const financeur = `${b.financeur || ""}`.toLowerCase();
  const paiement = d.paiement.trim() || (/cpf|compte formation/.test(financeur)
    ? "Prise en charge via Mon Compte Formation : le règlement est effectué par la Caisse des Dépôts et Consignations selon les conditions générales d’utilisation de la plateforme. Aucun reste à charge n’est demandé au bénéficiaire en dehors de celui éventuellement affiché lors de l’inscription."
    : b.entreprise.trim() || /opco|entreprise|employeur|france travail|p[oô]le emploi/.test(financeur)
      ? `Facture adressée ${b.entreprise.trim() ? `à ${b.entreprise}` : "au financeur"}${/opco/.test(financeur) ? " ou directement à l’OPCO en cas de subrogation de paiement" : ""} à l’issue de la prestation, accompagnée des feuilles d’émargement. Règlement par virement à 30 jours à réception de facture.`
      : `Aucune somme n’est exigée avant l’expiration du délai de rétractation. Un acompte limité à 30 % du prix peut ensuite être versé ; le solde est réglé de façon échelonnée au fur et à mesure du déroulement du bilan, par virement ou chèque à l’ordre de ${o.nom}.`);
  const held = bdcHeldSessions(d);
  let content = "";
  let sign = signatures(d);
  switch (id) {
    case "besoins":
      content = answer("Demande initiale", c.besoins) + answer("Attentes et objectifs personnels", c.attentes) + answer("Contraintes et aménagements", c.contraintes) + questions("besoins"); break;
    case "devis":
      content = h("Prestation proposée", text(d.formation.intitule) + text(formatDuree(p)) + text(`Période : du ${date(dates.debut)} au ${date(dates.fin)}`)) + h("Prix", text(formatPrix(ctx.organisme, p))) + h("Financement déclaré", text(b.financeur || "")) + h("Inclus dans le bilan", text("Entretiens individuels, outils et supports de travail, document de synthèse confidentiel, proposition de suivi à six mois.")) + h("Modalités de règlement", text(paiement)) + h("Acceptation", text(`Devis établi le ${date(d.dateEntretien) || date(o.dateMaj)}. La prestation est encadrée par le contrat ou la convention signé et le planning individuel annexé.`)); break;
    case "entretien":
      content = h("Date de l’entretien préalable", text(date(d.dateEntretien))) + answer("Demande et attentes", [c.besoins, c.attentes].filter(Boolean).join("\n")) + answer("Compte rendu recueilli", c.entretien) + answer("Contraintes identifiées", c.contraintes) + questions("entretien"); break;
    case "programme":
      content = h("Objectifs du bilan", text(d.formation.objectifs || "Analyser ses compétences professionnelles et personnelles, ses aptitudes et ses motivations ; définir un projet professionnel et, le cas échéant, un projet de formation (art. L6313-4).")) + h("Les trois phases — art. R6313-4", programme) + (d.formation.programme ? answer("Contenu adapté", d.formation.programme) : "") + h("Répartition individuelle des séances", planning) + h("Suivi à six mois", text(`Un suivi est proposé à partir du ${followup}, hors heures d’accompagnement facturées.`)) + h("Assistance technique et pédagogique", text(`${d.formation.formateur} — ${contact}`)) + h("Confidentialité", text(confidentiality)); break;
    case "contrat": {
      const contract = typeContrat(p);
      content = h("Entre les parties", rows(["Partie", "Identité"], [["Organisme", `${o.nom} — ${o.adresse} ${o.codePostal} ${o.ville} — SIRET ${o.siret} — ${o.dirigeant}`], ["Bénéficiaire", `${b.prenom} ${b.nom} — ${b.adresse || ""} ${b.codePostal || ""} ${b.commune || ""}`], ...(b.entreprise.trim() ? [["Entreprise", `${b.entreprise} — ${b.adresseEntreprise || ""} — ${b.responsableEntreprise || ""}`]] : [])])) + h("Article 1 — Objet et consentement", text(`Prestation de bilan de compétences au sens de l’art. L6313-4, dans une démarche volontaire. ${contract.base}.`)) + h("Article 2 — Conditions de réalisation", text(`${d.formation.intitule}\n${formatDuree(p)}\nDu ${date(dates.debut)} au ${date(dates.fin)}\nModalité : ${d.formation.modalites}\nConsultant : ${d.formation.formateur}\nLieu : ${p.lieu}`)) + h("Article 3 — Objectifs et trois phases", programme + (c.attentes ? text(`Objectifs déclarés : ${c.attentes}`) : "")) + h("Article 4 — Moyens et modalités", text("Entretiens individuels, analyse du parcours et des réalisations, questionnaires d’intérêts, enquêtes métier et recherches documentaires. Le planning annexé détaille les séances.")) + h("Article 5 — Engagements des parties", text("L’organisme assure un accompagnement individuel, la neutralité, l’accessibilité et la confidentialité. Le bénéficiaire participe aux rendez-vous et prévient en cas d’empêchement. La présence aux séances est attestée par les feuilles d’émargement signées.")) + h("Article 6 — Confidentialité et propriété", text(confidentiality)) + h("Article 7 — Prix et financement", text(`${formatPrix(ctx.organisme, p)}\nFinanceur déclaré : ${b.financeur || ""}`) + h("Modalités de paiement convenues", text(paiement))) + h("Article 8 — Acceptation et rétractation", text(contract.delai)) + h("Article 9 — Report, interruption et absence", text("Tout report ou interruption fait l’objet d’un échange écrit et, si nécessaire, d’un avenant. Les séances non réalisées ne sont pas attestées comme réalisées. Le règlement est proportionné aux prestations effectivement réalisées, sous réserve des dispositions légales et des conditions applicables du financeur.")) + h("Article 10 — Données personnelles", text("Les informations sont utilisées pour l’accompagnement et sa gestion. Le bénéficiaire peut exercer ses droits d’accès, rectification et, dans les limites légales, effacement auprès de l’organisme : " + o.email)) + h("Article 11 — Suivi à six mois", text(`Le consultant propose un suivi à partir du ${followup} pour faire le point sur la mise en œuvre du plan d’action.`)) + h("Article 12 — Réclamations et médiation", text(`Les réclamations sont adressées à ${o.email}. Une résolution amiable est recherchée avant le recours aux juridictions légalement compétentes.`) + (d.mediateur ? text(`Médiateur désigné : ${d.mediateur}`) : "")) + h("Article 13 — Annexes", text("Devis, programme, planning individuel, livret d’accueil et règlement intérieur.")) + h("Article 14 — Établissement", text(`Établi à ${o.ville}, le ${date(d.dateSignature)}.`));
      sign = signatures(d, true, !!b.entreprise.trim()); break;
    }
    case "planning": content = h("Planning individuel prévisionnel", planning) + h("Durée totale", text(formatDuree(p))) + h("Disponibilités déclarées", text(`${d.jours.join(", ")} — ${d.creneaux.join(", ")}`)) + h("Suivi proposé", text(followup)); break;
    case "accueil":
      content = h("Bienvenue", text(`Votre interlocuteur pour le bilan : ${d.formation.formateur}.\nContact : ${contact}\nLieu : ${p.lieu}`)) + h("Déroulement et ressources", programme) + h("Accessibilité et assistance", text(`Assistance technique et pédagogique : ${contact}${o.referentHandicap ? `\nRéférent handicap : ${o.referentHandicap}` : ""}. Les besoins d’aménagement sont étudiés individuellement.`)) + h("Règlement intérieur", text(d.reglement || "Respect des personnes et confidentialité des échanges ; ponctualité et information en cas d’absence ; respect des consignes de santé et de sécurité du lieu d’accueil ; utilisation des équipements et supports uniquement dans le cadre du bilan ; interdiction de diffuser les données d’autrui. Tout incident est signalé au consultant. Une mesure disciplinaire éventuelle respecte les garanties prévues par le Code du travail.")) + h("Confidentialité et réclamations", text(confidentiality) + text(`Contact pour les réclamations : ${o.email}`)); break;
    case "parcours": content = answer("Parcours déclaré", c.parcours) + questions("parcours"); break;
    case "competences": content = answer("Compétences déclarées", c.competences) + h("Analyse des réalisations — méthode STAR", rows(["Situation / tâche", "Actions réalisées", "Résultats et preuves", "Compétences transférables"], tableOr(d.star, 4, 6))) + questions("competences"); break;
    case "motivations": content = answer("Motivations et intérêts déclarés", c.motivations) + questions("motivations") + text("Ce questionnaire est un support d’entretien, pas un test psychométrique étalonné. Aucun score n’est déduit automatiquement."); break;
    case "metiers": content = answer("Pistes déclarées", c.metiers) + answer("Enquêtes et sources recueillies", c.enquete) + questions("metiers"); break;
    case "carnet": content = answer("Travaux consignés", c.carnet) + h("Exercices d’investigation", text("1. Construire une ligne de vie professionnelle et repérer les transitions.\n2. Décrire trois réalisations avec la méthode STAR.\n3. Hiérarchiser ses valeurs et critères de choix.\n4. Comparer deux pistes et conduire une enquête métier.\n5. Préparer un plan d’action avec échéances et ressources.")) + h("Journal de travail", rows(["Date", "Exercice / recherche", "Enseignement", "Suite à donner"], d.journal?.length && held.length ? held.map((s, i) => [date(s.date), ...(d.journal![i] || ["", "", ""])]).filter(r => r.slice(1).some(Boolean)) : Array.from({ length: 6 }, () => ["À renseigner", "", "", ""]))); break;
    case "emargement":
      content = d.sessions.map(s => {
        const past = !!parseDateAny(s.date) && new Date(`${s.date}T23:59:59`) < new Date();
        return `<div class="bdc-session">${h(`Séance ${s.numero}`, rows(["Date", "Horaires", "Durée", "Modalité"], [[date(s.date), `${s.heureDebut} – ${s.heureFin}`, `${s.duree} h`, s.modalite === "presentiel" ? "Présentiel" : "Distanciel"]]))}${text(s.objet)}${text(past && s.presence ? "Présence confirmée dans le dossier." : "Présence non confirmée — à renseigner à la séance.")}${signatures(d, true, false, past && s.presence)}</div>`;
      }).join(""); sign = ""; break;
    case "seances": content = d.sessions.map(s => h(`Séance ${s.numero} — ${date(s.date)}`, text(s.objet) + (parseDateAny(s.date) && new Date(`${s.date}T23:59:59`) < new Date() ? (s.compteRendu ? text(s.compteRendu) : blank()) : text("Séance à venir — compte rendu à renseigner après l’entretien.")))).join(""); sign = signatures(d, true, false, held.some(s => !!s.compteRendu.trim())); break;
    case "planAction": content = answer("Plan d’action déclaré", c.planAction) + h("Étapes de mise en œuvre", rows(["Action", "Échéance", "Ressources / interlocuteurs", "Résultat attendu"], tableOr(d.actions, 4, 5))) + h("Point de suivi proposé", text(followup)); break;
    case "synthese":
      content = text("CONFIDENTIEL — propriété exclusive du bénéficiaire.") + (!finished ? text("Bilan en cours : synthèse à établir lors de la phase de conclusion.") : "") + answer("1. Circonstances et demande", [c.besoins, c.attentes].filter(Boolean).join("\n")) + answer("2. Compétences et aptitudes identifiées", confirmed("competences")) + answer("3. Perspectives et projet professionnel", confirmed("metiers")) + answer("4. Facteurs favorables, freins et faisabilité", confirmed("contraintes")) + answer("5. Principales étapes de mise en œuvre", confirmed("planAction")) + answer("6. Conclusion et restitution", confirmed("synthese")) + h("Propriété, secret et conservation", text(confidentiality)); sign = signatures(d, true, false, finished && !!c.synthese.trim()); break;
    case "satisfaction":
      content = (!finished ? text("Bilan en cours — questionnaire à recueillir en fin de bilan.") : "") + answer("Réponses recueillies", confirmed("satisfaction")) + h("Votre appréciation", rows(["Critère", "Note de 1 (pas satisfait) à 5 (très satisfait)"], BDC_SATISFACTION_CRITERIA.map((label, i) => [label, finished && d.notesSatisfaction?.[i] ? `${d.notesSatisfaction[i]} / 5` : "À renseigner"]))) + questions("satisfaction", finished); sign = signatures(d, true, false, finished && !!c.satisfaction.trim()); break;
    case "suivi":
      content = h("Date du suivi proposé", text(followup)) + (!bdcFollowupDue(d) ? text("Suivi non encore échu : aucune réponse ni réalisation n’est présumée.") : "") + answer("Réponses et compte rendu recueillis", bdcFollowupDue(d) ? c.suivi : "") + questions("suivi", bdcFollowupDue(d)) + h("Compte rendu de suivi", rows(["Date réelle de l’entretien", "Modalité", "Consultant", "Suites convenues"], [["À renseigner", "", d.formation.formateur, ""]])); sign = signatures(d, true, false, bdcFollowupDue(d) && !!c.suivi.trim()); break;
  }
  const identity = rows(["Dossier individuel", "Informations"], [["Bénéficiaire", `${b.prenom} ${b.nom}`], ["Consultant", d.formation.formateur], ["Période", `Du ${date(dates.debut)} au ${date(dates.fin)}`], ["Durée", formatDuree(p)], ["Modalité", d.formation.modalites], ["Document établi le", date(o.dateMaj)]]);
  const escapedOrg = Object.fromEntries(Object.entries(o).map(([key, value]) => [key, typeof value === "string" && !key.endsWith("Url") ? bdcEscape(value) : value])) as typeof o;
  escapedOrg.logoUrl = safeImage(o.logoUrl);
  let html = buildDocument({ org: escapedOrg, title: bdcDocumentTitle(id, d), extraHtml: identity + content + sign });
  html = withActiveDossierStyle(html);
  return html.replace("</head>", `<style data-bdc-standalone>body{padding:32px 42px 0!important;letter-spacing:0}table{table-layout:fixed;width:100%}td,th{overflow-wrap:anywhere}tr{break-inside:avoid}.bdc-writing{height:48px;border-bottom:1px solid currentColor;margin-bottom:14px;opacity:.3}.bdc-answer{font-style:italic}.bdc-signatures{break-inside:avoid;page-break-inside:avoid;margin-top:20px}.bdc-signature-table td{background:transparent!important;vertical-align:top}.bdc-signature-table tr{background:transparent!important}.bdc-signature-table img{display:block;object-fit:contain;max-width:100%}.bdc-signature-space{height:90px}.bdc-session{break-before:page}.bdc-session:first-of-type{break-before:auto}</style></head>`);
}