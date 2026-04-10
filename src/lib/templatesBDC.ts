/**
 * Templates "Bilans de Compétences" (BDC)
 * Vocabulaire : bénéficiaire (pas stagiaire), consultant(e) (pas formateur),
 *               phases d'accompagnement (pas modules de cours)
 */
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, subtractBusinessDays, tableHTML, section, getStagiaireDateDebut, getStagiaireDateFin, getStagiaireTarif, getStagiaireDuree, g, getDocStyle, footer, orgHeader, htmlWrap, applyGender } from "./docBuilder";
import { FormateurInfo, parseDuree } from "./sampleData";

// ---------- helpers ----------
function consultantName(o: OrganismeInfo): string {
  return o.responsablePedagogique || o.dirigeant || "Le/la consultant(e)";
}
function beneficiaireLabel(s: StagiaireInfo): string {
  return `${s.prenom || "Prénom"} ${s.nom || "NOM"}`;
}
function sigDateBDC(s: StagiaireInfo | undefined, f: FormationInfo): string {
  const ref = s?.dateDebutFormation || f.dateDebut || "";
  return ref ? formatDate(subtractBusinessDays(ref, 14)) : new Date().toLocaleDateString("fr-FR");
}
function endDate(s: StagiaireInfo | undefined, f: FormationInfo): string {
  return formatDate(s?.dateFinFormation || f.dateFin || "");
}
function startDate(s: StagiaireInfo | undefined, f: FormationInfo): string {
  return formatDate(s?.dateDebutFormation || f.dateDebut || "");
}
function dureeLabel(f: FormationInfo): string {
  return f.duree || "24 heures";
}
function phasesDates(f: FormationInfo) {
  const d0 = new Date(f.dateDebut || Date.now());
  const dEnd = new Date(f.dateFin || Date.now());
  const total = dEnd.getTime() - d0.getTime();
  const p1End = new Date(d0.getTime() + total * 0.2);
  const p2Start = new Date(p1End.getTime() + 86400000);
  const p2End = new Date(d0.getTime() + total * 0.75);
  const p3Start = new Date(p2End.getTime() + 86400000);
  const fmt = (d: Date) => d.toLocaleDateString("fr-FR");
  return { p1: { start: fmt(d0), end: fmt(p1End) }, p2: { start: fmt(p2Start), end: fmt(p2End) }, p3: { start: fmt(p3Start), end: fmt(dEnd) } };
}

// ===== CR1 - IND 1 : Programme du bilan =====
export function genProgrammeBDC(o: OrganismeInfo, f: FormationInfo) {
  const ph = phasesDates(f);
  const { totalHours } = parseDuree(f.duree || "24h");
  const hPrelim = Math.round(totalHours * 0.125);
  const hInvest = Math.round(totalHours * 0.625);
  const hConcl = totalHours - hPrelim - hInvest;
  return buildDocument({ org: o, title: "PROGRAMME DE BILAN DE COMPÉTENCES", subtitle: `Domaine : ${f.intitule}`, sections: [
    { heading: "Objectifs du bilan de compétences", content: `<p>• Identifier les compétences, aptitudes et motivations du bénéficiaire dans le domaine de ${f.intitule}.<br>• Élaborer un projet professionnel réaliste, durable et aligné avec les compétences.<br>• Analyser les opportunités d'évolution professionnelle.<br>• Définir un plan d'action personnalisé pour la mise en œuvre du projet.</p>` },
    { heading: "Prérequis", content: `<p>• Aucun diplôme ou niveau scolaire requis.<br>• Maîtrise orale du français souhaitée.<br>• Projet de reconversion ou questionnement professionnel en lien avec ${f.intitule}.</p>` },
    { heading: `Phase préliminaire (${hPrelim}h) – ${ph.p1.start} au ${ph.p1.end}`, content: "<p>• Analyse de la demande et des attentes.<br>• Présentation des modalités du bilan et contractualisation.<br>• Définition des objectifs personnalisés.</p>" },
    { heading: `Phase d'investigation (${hInvest}h) – ${ph.p2.start} au ${ph.p2.end}`, content: `<p>• Exploration du parcours personnel et professionnel.<br>• Identification des compétences techniques et transversales en ${f.intitule}.<br>• Analyse des motivations et des intérêts professionnels.<br>• Étude des métiers du secteur.<br>• Identification des formations et certifications possibles.</p>` },
    { heading: `Phase de conclusion (${hConcl}h) – ${ph.p3.start} au ${ph.p3.end}`, content: "<p>• Élaboration du projet professionnel ou de reconversion.<br>• Définition du plan d'action.<br>• Rédaction de la synthèse finale confidentielle remise au bénéficiaire.</p>" },
    { heading: "Modalités", content: `<p><strong>Durée totale :</strong> ${dureeLabel(f)}<br><strong>Dates :</strong> du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br><strong>Modalité :</strong> ${f.modalites || "Présentiel"}<br><strong>Lieu :</strong> ${o.adresse || "Locaux de l'organisme"}<br><strong>Consultant(e) :</strong> ${consultantName(o)}</p>` },
    { heading: "Confidentialité", content: "<p>Le contenu des entretiens, des tests et du document de synthèse est strictement confidentiel, conformément aux articles L6313-10 à L6313-12 du Code du travail.</p>" },
  ] });
}

// ===== CR2 - IND 4 : Évaluation des besoins (per bénéficiaire) =====
export function genEvaluationBesoins(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const ref = s?.dateDebutFormation || f.dateDebut || "";
  const dt = ref ? formatDate(subtractBusinessDays(ref, 20)) : new Date().toLocaleDateString("fr-FR");
  return buildDocument({ org: o, title: "ÉVALUATION DES BESOINS", subtitle: `Bilan de compétences – ${f.intitule}`, stagiaires: [s], sections: [
    { heading: "Identification", content: `<p><strong>Date :</strong> ${dt}<br><strong>Nom :</strong> ${s.nom}<br><strong>Prénom :</strong> ${s.prenom}<br><strong>E-mail :</strong> ${s.email || "—"}<br><strong>Formation souhaitée :</strong> Bilan de compétences – ${f.intitule}</p>` },
    { heading: "1) Éléments à prendre en considération (handicap, problème de santé, besoin particulier)", content: "<p>Aucun besoin particulier signalé.</p>" },
    { heading: "2) Nos adaptations possibles", content: "<p>• Handicap / Maladie : adaptation des rythmes et contenus<br>• Contenus : outils et méthodes adaptés<br>• Accompagnement : durée, emploi du temps, rythme personnalisé</p>" },
    { heading: "3) Quel est votre objectif professionnel à travers ce bilan ?", content: `<p>Faire le point sur mon parcours en ${f.intitule} afin d'envisager une évolution professionnelle. Identifier mes atouts, axes d'amélioration et opportunités d'évolution.</p>`, variant: "green" },
    { heading: "4) Domaines spécifiques à approfondir ?", content: `<p>• Renforcement des compétences techniques en ${f.intitule}<br>• Développement de compétences transversales : communication, gestion du stress, leadership</p>` },
    { heading: "5) Format préféré ?", content: `<p>${f.modalites || "Présentiel"}</p>` },
    { heading: "6) Préférences horaires ?", content: "<p>En journée</p>" },
    { heading: "7) Moyens de financement envisagés ?", content: "<p>CPF / Autofinancement</p>" },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)], dates: [dt, dt] } });
}

// ===== CR2 - IND 5 : Document de synthèse (pièce centrale!) =====
export function genDocumentSynthese(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const ph = phasesDates(f);
  return buildDocument({ org: o, title: "DOCUMENT DE SYNTHÈSE", subtitle: `Bilan de compétences – ${beneficiaireLabel(s)}`, stagiaires: [s], sections: [
    { heading: "Rappel de la conformité réglementaire", content: `<p>Conformément aux articles <strong>L6313-10 à L6313-12</strong> du Code du travail, ce bilan de compétences s'est déroulé dans un cadre légal et déontologique. Le bénéficiaire a été informé préalablement des <strong>objectifs</strong>, des <strong>modalités de mise en œuvre</strong> et des <strong>conditions de restitution des résultats</strong>, lesquels ne peuvent être transmis à un tiers qu'avec son accord.</p>` },
    { heading: "1. Les circonstances du bilan", content: `<p>${beneficiaireLabel(s)}, souhaitant faire le point sur ses compétences dans le domaine de ${f.intitule}, a sollicité ce bilan dans le cadre d'une démarche personnelle. L'objectif est de confirmer ses compétences, valider la faisabilité d'un projet professionnel et définir un plan d'action concret.</p>` },
    { heading: "2. Objectifs du bilan", content: `<p>• Identifier et valoriser les <strong>compétences techniques et transversales</strong> en ${f.intitule}.<br>• Préciser un projet professionnel réaliste dans le secteur.<br>• Vérifier la <strong>cohérence</strong> entre motivations, contraintes personnelles et réalités du métier.<br>• Élaborer un <strong>plan d'action concret</strong> : formation complémentaire, recherche d'emploi ou accompagnement à la création d'activité.</p>`, variant: "green" },
    { heading: "3. Modalités de réalisation", content: `<p>Le bilan s'est déroulé <strong>en ${(f.modalites || "présentiel").toLowerCase()}</strong> du <strong>${startDate(s, f)}</strong> au <strong>${endDate(s, f)}</strong>, pour une durée totale de <strong>${dureeLabel(f)}</strong>.</p><p><strong>Phase préliminaire (${ph.p1.start} – ${ph.p1.end}) :</strong><br>• Analyse de la demande et des attentes<br>• Définition du cadre méthodologique et validation de l'engagement</p><p><strong>Phase d'investigation (${ph.p2.start} – ${ph.p2.end}) :</strong><br>• Analyse du parcours, des compétences et des motivations<br>• Tests de positionnement métier et échanges approfondis<br>• Recherches sur les métiers du secteur</p><p><strong>Phase de conclusion (${ph.p3.start} – ${ph.p3.end}) :</strong><br>• Clarification du projet professionnel<br>• Préconisations personnalisées<br>• Rédaction et remise du présent document de synthèse</p>` },
    { heading: "4. Compétences identifiées", content: `<p><strong>Compétences techniques :</strong><br>• Maîtrise des fondamentaux du secteur ${f.intitule}<br>• Capacité d'organisation et de gestion<br>• Application des normes et procédures<br><br><strong>Compétences transversales :</strong><br>• Sens de l'organisation et rigueur<br>• Créativité et sens esthétique<br>• Communication et travail en équipe<br>• Adaptabilité et gestion du stress</p>`, variant: "green" },
    { heading: "5. Projet professionnel retenu", content: `<p>Le projet professionnel validé est en cohérence avec les compétences identifiées et les aspirations exprimées par ${g(s, "le", "la")} bénéficiaire. Il s'agit d'une évolution professionnelle dans le domaine de ${f.intitule}, avec un plan de formation ciblé.</p>` },
    { heading: "6. Plan d'action", content: "<p><strong>Court terme (0-3 mois) :</strong><br>• Formation complémentaire ciblée<br>• Mise à jour du CV et du profil professionnel<br>• Prise de contact avec le réseau professionnel<br><br><strong>Moyen terme (3-12 mois) :</strong><br>• Certification ou qualification complémentaire<br>• Recherche active d'opportunités<br>• Point de suivi à 6 mois avec le consultant</p>" },
    { heading: "Confidentialité", content: "<p>Ce document est la propriété exclusive du bénéficiaire. Il ne peut être communiqué à un tiers sans son autorisation écrite préalable.</p>" },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)] } });
}

// ===== CR2 - IND 6 : Déroulé et modalités =====
export function genDerouleModalitesBDC(o: OrganismeInfo, f: FormationInfo) {
  const ph = phasesDates(f);
  const { totalHours } = parseDuree(f.duree || "24h");
  return buildDocument({ org: o, title: `DÉROULÉ ET MODALITÉS DU BILAN DE COMPÉTENCES`, subtitle: `Domaine : ${f.intitule}`, sections: [
    { heading: "Objectif du bilan", content: `<p>Le bilan de compétences vise à accompagner un(e) professionnel(le) souhaitant :<br>• faire un point global sur son parcours professionnel,<br>• identifier ses forces et ses axes d'amélioration,<br>• valider un projet d'évolution (spécialisation, reconversion, entrepreneuriat…),<br>• ou confirmer ses motivations à créer ou reprendre une activité dans le secteur de ${f.intitule}.</p>` },
    { heading: "1. Phase préliminaire (2 à 3 heures)", content: "<p>• Recueil de la demande spécifique<br>• Présentation du déroulement du bilan<br>• Définition des objectifs personnalisés<br>• Planification des séances</p>" },
    { heading: "2. Phase d'investigation (15 à 17 heures)", content: `<p>Cette phase approfondit les compétences acquises dans le domaine de ${f.intitule} et explore les pistes de valorisation et d'évolution :<br>• Analyse du parcours professionnel et des réalisations concrètes<br>• Identification des compétences clés (techniques, organisationnelles, relationnelles)<br>• Évaluation des motivations et du projet de vie<br>• Enquêtes métier<br>• Analyse des possibilités : retour en formation, VAE, création d'entreprise, mobilité</p>`, variant: "green" },
    { heading: "3. Phase de conclusion (4 à 5 heures)", content: "<p>• Synthèse du travail réalisé<br>• Validation d'un ou plusieurs projets professionnels adaptés<br>• Élaboration d'un plan d'action détaillé<br>• Rédaction du <strong>document de synthèse</strong> confidentiel<br>• Prévision d'un <strong>entretien de suivi</strong> dans les 6 mois</p>" },
    { heading: "Méthodes utilisées", content: "<p>• Entretiens individuels (présentiel et/ou visioconférence)<br>• Outils de positionnement et d'analyse (grilles de compétences, tests de motivation, ligne de vie professionnelle)<br>• Exercices pratiques adaptés<br>• Recherches encadrées sur les métiers et formations du secteur<br>• Accompagnement personnalisé par un(e) consultant(e)</p>" },
    { heading: "Modalités pratiques", content: `<p><strong>Durée totale :</strong> ${dureeLabel(f)}<br><strong>Dates :</strong> du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}<br><strong>Lieu :</strong> ${o.adresse || "Locaux de l'organisme"} ou en distanciel<br><strong>Rythme :</strong> 2 à 3 séances par semaine<br><strong>Consultant(e) :</strong> ${consultantName(o)}</p>` },
    { heading: "Confidentialité", content: "<p>L'ensemble des échanges, productions et résultats reste <strong>strictement confidentiel</strong>. Le document de synthèse est la propriété exclusive du bénéficiaire.</p>" },
  ] });
}

// ===== CR2 - IND 6 : Questionnaire enquête métier =====
export function genEnqueteMetierBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  return buildDocument({ org: o, title: "BILAN DE COMPÉTENCES – ENQUÊTE MÉTIER", subtitle: `Domaine exploré : ${f.intitule}`, stagiaires: [s], sections: [
    { heading: "1. Identification du bénéficiaire", content: `<p><strong>Nom :</strong> ${s.nom}<br><strong>Prénom :</strong> ${s.prenom}<br><strong>Date de naissance :</strong> ${s.dateNaissance ? formatDate(s.dateNaissance) : "—"}<br><strong>E-mail :</strong> ${s.email || "—"}<br><strong>Téléphone :</strong> ${s.telephone || "—"}</p>` },
    { heading: "2. Cadre du bilan", content: `<p><strong>Consultant(e) :</strong> ${consultantName(o)}<br><strong>Organisme :</strong> ${o.nom}<br><strong>Domaine exploré :</strong> ${f.intitule}<br><strong>Date de l'entretien :</strong> ${startDate(s, f)}</p>` },
    { heading: "3. Objectifs de l'enquête métier", content: `<p>• Comprendre les missions et responsabilités principales du métier visé dans le domaine de ${f.intitule}.<br>• Identifier les compétences techniques et transversales indispensables.<br>• Évaluer la cohérence entre le projet professionnel du bénéficiaire et les exigences du secteur.<br>• Mettre en lumière les contraintes, conditions de travail et opportunités d'évolution.<br>• Valider la motivation et définir les pistes de formation nécessaires.</p>`, variant: "green" },
    { heading: "4. Présentation du métier", content: `<p>Le métier dans le domaine de ${f.intitule} implique :<br>• Maîtrise des techniques spécifiques au secteur<br>• Application des normes et réglementations en vigueur<br>• Gestion de la relation client/usager<br>• Veille sectorielle et formation continue</p>` },
    { heading: "5. Compétences requises", content: "<p><strong>Techniques professionnelles :</strong><br>• Maîtrise des techniques de base et avancées du secteur<br>• Utilisation des outils et équipements spécifiques<br>• Connaissance des normes réglementaires<br><br><strong>Compétences transversales :</strong><br>• Organisation et gestion du temps<br>• Communication et travail en équipe<br>• Adaptabilité et résolution de problèmes</p>" },
    { heading: "6. Formations recommandées", content: `<p>• Certifications et diplômes du secteur de ${f.intitule}<br>• Stages de perfectionnement<br>• Formation continue et mise à jour des compétences</p>` },
    { heading: "7. Perspectives d'emploi", content: `<p>• Secteur dynamique avec des opportunités variées<br>• Évolutions possibles : spécialisation, management, création d'entreprise<br>• Cohérence avec le projet du bénéficiaire validée</p>` },
    { heading: "8. Conclusion", content: `<p>Le métier est en cohérence avec le projet de reconversion ou d'évolution exprimé par ${g(s, "le", "la")} bénéficiaire. Les compétences identifiées et les formations recommandées sont documentées dans le plan d'action.</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)] } });
}

// ===== CR3 - IND 9 : CGV Bilan =====
export function genCGVBilanCompetences(o: OrganismeInfo, f: FormationInfo) {
  const tarif = f.tarif ? `${f.tarif} € TTC` : "1 500 € TTC";
  return buildDocument({ org: o, title: "CONDITIONS GÉNÉRALES DE VENTE – BILAN DE COMPÉTENCES", sections: [
    { heading: "Article 1 – Objet", content: `<p>Les présentes conditions générales ont pour objet de définir les modalités et conditions dans lesquelles l'organisme <strong>${o.nom}</strong> fournit une prestation de <strong>bilan de compétences</strong> à ses clients.</p>` },
    { heading: "Article 2 – Nature de la prestation", content: "<p>La prestation entre dans le champ d'application des <strong>articles L6313-1 à L6313-12</strong> du Code du travail. Elle se compose de 3 phases (préliminaire, investigation, conclusion) et donne lieu à la remise d'un <strong>document de synthèse confidentiel</strong> au bénéficiaire.</p>" },
    { heading: "Article 3 – Modalités d'inscription", content: "<p>L'inscription devient définitive à réception :<br>• du contrat de formation signé,<br>• de l'éventuel accord de financement,<br>• et/ou du règlement de la prestation en cas d'autofinancement.</p>" },
    { heading: "Article 4 – Tarifs", content: `<p>Le tarif applicable est celui en vigueur au moment de la signature du contrat : <strong>${tarif} pour ${dureeLabel(f)} de bilan en ${(f.modalites || "présentiel").toLowerCase()}</strong>.<br><br>Ce tarif comprend :<br>• les entretiens individuels,<br>• les outils utilisés,<br>• la rédaction du document de synthèse,<br>• les frais administratifs.<br><br>Aucun frais supplémentaire ne sera appliqué sans accord préalable.</p>` },
    { heading: "Article 5 – Financement", content: "<p>Le bilan peut être financé via : <strong>CPF, autofinancement, employeur, OPCO</strong>.<br>En cas de refus de prise en charge par un financeur, le bénéficiaire reste redevable du montant dû.</p>" },
    { heading: "Article 6 – Délai de rétractation", content: "<p>Conformément à l'article L221-18 du Code de la consommation, le bénéficiaire dispose d'un <strong>délai de rétractation de 14 jours</strong> à compter de la signature du contrat. Toute prestation démarrée avant la fin de ce délai ne pourra faire l'objet d'un remboursement sauf cas de force majeure.</p>" },
    { heading: "Article 7 – Annulation / Report", content: `<p>• En cas d'annulation par le bénéficiaire <strong>moins de 5 jours</strong> avant le début, 30 % du montant restera dû.<br>• En cas d'annulation <strong>sans justification</strong>, le solde peut être facturé.<br>• En cas d'annulation par l'organisme, la totalité de la somme versée est remboursée ou reportée.</p>` },
    { heading: "Article 8 – Confidentialité", content: "<p>Le contenu des entretiens, des tests et du document de synthèse est <strong>strictement confidentiel</strong>. Aucune information ne peut être transmise à un tiers sans l'accord écrit du bénéficiaire.</p>" },
    { heading: "Article 9 – Données personnelles", content: `<p>Les données personnelles sont traitées conformément au RGPD. Elles sont conservées pendant la durée légale de conservation et ne sont pas transmises à des tiers sauf obligation légale.</p>` },
    { heading: "Article 10 – Litiges", content: `<p>En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le tribunal compétent sera celui du ressort du siège de l'organisme.</p>` },
  ], signatures: { type: "2", labels: ["Le Prestataire", "Le Bénéficiaire"], names: [consultantName(o), ""] } });
}

// ===== CR3 - IND 9 : Contrat de bilan =====
export function genContratBilanCompetences(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const tarif = getStagiaireTarif(s, f) || f.tarif || "1 500";
  return buildDocument({ org: o, title: "CONTRAT DE BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "Entre les soussignés", content: `<p><strong>1. L'organisme prestataire :</strong><br>RAISON SOCIALE : ${o.nom}<br>Adresse : ${o.adresse}<br>Représenté par : ${consultantName(o)}<br>Contact : ${o.email || "—"} | ${o.telephone || "—"}<br>N° SIRET : ${o.siret || "—"}<br><br>Ci-après dénommé "le Prestataire"<br><br><strong>ET</strong><br><br><strong>2. ${g(s, "Le bénéficiaire", "La bénéficiaire")} du bilan de compétences :</strong><br>Nom : ${s.nom}<br>Prénom : ${s.prenom}<br>${s.dateNaissance ? `Né(e) le : ${formatDate(s.dateNaissance)}<br>` : ""}${s.email ? `Mail : ${s.email}<br>` : ""}${s.telephone ? `Tél : ${s.telephone}<br>` : ""}<br>Ci-après dénommé(e) "${g(s, "le Bénéficiaire", "la Bénéficiaire")}"</p>` },
    { heading: "Article 1 – Objet du contrat", content: "<p>Le présent contrat a pour objet la réalisation d'un <strong>bilan de compétences</strong> conformément aux dispositions des articles L6313-1 à L6313-12 du Code du travail.</p>" },
    { heading: "Article 2 – Durée et dates", content: `<p>Le bilan de compétences se déroule sur la période <strong>du ${startDate(s, f)} au ${endDate(s, f)}</strong>, pour une durée totale de <strong>${dureeLabel(f)}</strong>, réparties selon un planning défini en accord entre les parties.</p>` },
    { heading: "Article 3 – Lieu de réalisation", content: `<p>Le bilan sera réalisé <strong>en ${(f.modalites || "présentiel").toLowerCase()}</strong> dans les locaux du Prestataire :<br><strong>${o.nom}</strong> – ${o.adresse}</p>` },
    { heading: "Article 4 – Modalités de réalisation", content: "<p>Le bilan comprend trois phases d'accompagnement :<br>• <strong>Phase préliminaire</strong> : analyse des attentes et validation de l'engagement.<br>• <strong>Phase d'investigation</strong> : identification des compétences, motivations, valeurs professionnelles.<br>• <strong>Phase de conclusion</strong> : définition du projet professionnel et remise du document de synthèse.</p>", variant: "green" },
    { heading: "Article 5 – Confidentialité", content: `<p>Les informations communiquées par ${g(s, "le", "la")} Bénéficiaire sont strictement confidentielles. Le Prestataire s'engage à ne divulguer aucune information sans accord écrit.</p>` },
    { heading: "Article 6 – Restitution", content: `<p>À l'issue du bilan, un <strong>document de synthèse</strong> sera remis ${g(s, "au Bénéficiaire", "à la Bénéficiaire")}. Ce document ne pourra être transmis à un tiers qu'avec son consentement écrit.</p>` },
    { heading: "Article 7 – Modalités financières", content: `<p>Le coût total du bilan est de <strong>${tarif} € TTC</strong>.</p>` },
  ], signatures: { type: "2", labels: ["Le Prestataire", `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)] } });
}

// ===== CR3 - IND 9 : Convention de bilan =====
export function genConventionBilanCompetences(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const tarif = getStagiaireTarif(s, f) || f.tarif || "1 500";
  return buildDocument({ org: o, title: "CONVENTION DE BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "Entre", content: `<p><strong>L'organisme prestataire :</strong> ${o.nom}, SIRET : ${o.siret || "—"}, représenté par ${consultantName(o)}<br><br><strong>ET</strong><br><br><strong>${g(s, "Le bénéficiaire", "La bénéficiaire")} :</strong> ${beneficiaireLabel(s)}</p>` },
    { heading: "Article 1 – Objet", content: "<p>La présente convention a pour objet la mise en œuvre d'un bilan de compétences conformément aux articles L6313-1 à L6313-12 du Code du travail.</p>" },
    { heading: "Article 2 – Programme", content: "<p>Le bilan se déroule en trois phases :<br>• Phase préliminaire : analyse de la demande<br>• Phase d'investigation : identification des compétences et motivations<br>• Phase de conclusion : projet professionnel et plan d'action</p>" },
    { heading: "Article 3 – Durée et calendrier", content: `<p>Durée : ${dureeLabel(f)}<br>Du ${startDate(s, f)} au ${endDate(s, f)}</p>` },
    { heading: "Article 4 – Coût et financement", content: `<p>Coût total : ${tarif} € TTC<br>Financement : CPF / Autofinancement / Employeur / OPCO</p>` },
    { heading: "Article 5 – Confidentialité", content: "<p>Le document de synthèse est la propriété exclusive du bénéficiaire et ne peut être communiqué à un tiers qu'avec son accord écrit.</p>" },
  ], signatures: { type: "2", labels: ["Le Prestataire", `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)] } });
}

// ===== CR3 - IND 9 : Formulaire d'attentes et objectifs =====
export function genFormulaireAttentesBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  return buildDocument({ org: o, title: "FORMULAIRE D'ATTENTES ET OBJECTIFS", subtitle: `Bilan de compétences – Domaine : ${f.intitule}`, stagiaires: [s], sections: [
    { heading: "1. Identification du bénéficiaire", content: `<p>• Nom : ${s.nom}<br>• Prénom : ${s.prenom}<br>${s.dateNaissance ? `• Date de naissance : ${formatDate(s.dateNaissance)}<br>` : ""}${s.email ? `• E-mail : ${s.email}<br>` : ""}${s.telephone ? `• Téléphone : ${s.telephone}` : ""}</p>` },
    { heading: "2. Cadre du bilan", content: `<p>• Consultant(e) : ${consultantName(o)}<br>• Organisme : ${o.nom}<br>• Domaine exploré : ${f.intitule}</p>` },
    { heading: "3. Motivations et attentes", content: `<p><strong>Q1 : Quel est votre principal objectif professionnel ?</strong><br>Valider mes compétences en ${f.intitule} et définir un projet professionnel clair pour évoluer vers un poste à responsabilités ou créer mon activité.<br><br><strong>Q2 : Qu'est-ce qui vous motive ?</strong><br>Renforcer mes techniques, acquérir de nouvelles compétences et maîtriser les aspects professionnels du secteur.<br><br><strong>Q3 : Quels résultats attendez-vous ?</strong><br>Mieux connaître mes forces et axes d'amélioration, obtenir un plan personnalisé et définir les étapes pour atteindre mes objectifs.</p>`, variant: "green" },
    { heading: "4. Compétences à développer", content: `<p><strong>Q4 : Compétences techniques à renforcer ?</strong><br>Approfondir les compétences spécifiques au domaine de ${f.intitule}.<br><br><strong>Q5 : Compétences transversales ?</strong><br>Améliorer la gestion du temps, la communication et les compétences en management.</p>` },
    { heading: "5. Conditions et contraintes", content: `<p><strong>Q6 : Contraintes à prendre en compte ?</strong><br>Formation en journée, organisation flexible.<br><br><strong>Q7 : Préférences pédagogiques ?</strong><br>Entretiens individuels et mises en situation, complétés par des apports théoriques.</p>` },
    { heading: "6. Perspectives professionnelles", content: `<p><strong>Q8 : Quel poste ou secteur visez-vous ?</strong><br>Poste à responsabilités dans le secteur de ${f.intitule} ou création d'entreprise.<br><br><strong>Q9 : Entreprises identifiées ?</strong><br>Recherches en cours dans le secteur.</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)] } });
}

// ===== CR3 - IND 10 : Convocation au bilan =====
export function genConvocationBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const dt = sigDateBDC(s, f);
  return buildDocument({ org: o, title: "CONVOCATION AU BILAN DE COMPÉTENCES", subtitle: `Émise le ${dt}`, stagiaires: [s], sections: [
    { heading: "Organisme prestataire", content: `<p><strong>${o.nom}</strong><br>${o.adresse}<br>SIRET : ${o.siret || "—"}<br>${o.email || ""} | ${o.telephone || ""}<br>Consultant(e) : ${consultantName(o)}</p>` },
    { heading: "Destinataire", content: `<p><strong>${g(s, "M.", "Mme")} ${beneficiaireLabel(s)}</strong><br>${s.email || ""} | ${s.telephone || ""}</p>` },
    { heading: "Objet : Convocation au bilan de compétences", content: `<p>${g(s, "Monsieur", "Madame")},<br><br>Nous avons le plaisir de vous convoquer pour la réalisation de votre <strong>bilan de compétences – ${f.intitule}</strong>, que vous effectuerez auprès de notre organisme <strong>${o.nom}</strong>.</p>` },
    { heading: "Informations sur la prestation", content: `<p>• <strong>Intitulé :</strong> Bilan de compétences – ${f.intitule}<br>• <strong>Date de début :</strong> ${startDate(s, f)}<br>• <strong>Date de fin :</strong> ${endDate(s, f)}<br>• <strong>Durée totale :</strong> ${dureeLabel(f)} (en ${(f.modalites || "présentiel").toLowerCase()})<br>• <strong>Lieu :</strong> ${o.adresse || "Locaux de l'organisme"}<br>• <strong>Consultant(e) :</strong> ${consultantName(o)}</p>`, variant: "green" },
    { heading: "Documents à apporter", content: "<p>• Pièce d'identité<br>• Copie du contrat de formation signé<br>• CV ou tout document utile à l'analyse de votre parcours</p>" },
    { heading: "Informations pratiques", content: `<p>Merci de vous présenter <strong>10 minutes avant l'heure de votre premier rendez-vous</strong>.<br>En cas d'empêchement, merci de nous prévenir au plus tôt au ${o.telephone || "—"}.</p><p>Cordialement,<br>${consultantName(o)}<br>${o.nom}</p>` },
  ] });
}

// ===== CR3 - IND 10 : Synopsis =====
export function genSynopsisBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const ph = phasesDates(f);
  return buildDocument({ org: o, title: "SYNOPSIS – BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "Informations générales", content: `<p><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br><strong>Domaine :</strong> ${f.intitule}<br><strong>Organisme :</strong> ${o.nom}<br><strong>Période :</strong> Du ${startDate(s, f)} au ${endDate(s, f)}</p>` },
    { heading: "Objectif général", content: `<p>Accompagner ${beneficiaireLabel(s)} dans l'évaluation et le développement de ses compétences professionnelles en ${f.intitule} afin de consolider son projet professionnel, renforcer ses savoir-faire et définir un plan d'action clair pour sa carrière future.</p>` },
    { heading: `Phase 1 : Phase préliminaire (${ph.p1.start} – ${ph.p1.end})`, content: "<p>• <strong>Accueil et présentation du bilan</strong> : explication des étapes, modalités et objectifs.<br>• <strong>Recueil des attentes et motivations</strong> : entretien individuel approfondi.<br>• <strong>Analyse du parcours professionnel et personnel</strong> : identification des compétences acquises.</p>" },
    { heading: `Phase 2 : Phase d'investigation (${ph.p2.start} – ${ph.p2.end})`, content: `<p>• <strong>Identification des compétences techniques</strong> : évaluation des savoir-faire en ${f.intitule}.<br>• <strong>Analyse des compétences transversales</strong> : communication, organisation, gestion du temps.<br>• <strong>Tests pratiques et mises en situation</strong> : observation des compétences en conditions réelles.<br>• <strong>Étude du marché et des opportunités professionnelles</strong>.</p>`, variant: "green" },
    { heading: `Phase 3 : Phase de conclusion (${ph.p3.start} – ${ph.p3.end})`, content: "<p>• <strong>Synthèse des résultats</strong> : bilan des compétences et points d'amélioration.<br>• <strong>Définition du projet professionnel</strong> : validation ou ajustement du projet initial.<br>• <strong>Élaboration du plan d'action</strong> : recommandations et étapes à suivre.<br>• <strong>Entretien de restitution</strong> : présentation et validation du bilan.</p>" },
    { heading: "Modalités d'accompagnement", content: "<p>• Entretiens individuels réguliers (en présentiel ou visioconférence)<br>• Support documentaire et outils d'auto-évaluation<br>• Suivi personnalisé et conseils adaptés</p>" },
    { heading: "Résultats attendus", content: `<p>• Clarification du projet professionnel<br>• Identification précise des compétences maîtrisées et à développer<br>• Plan d'action réaliste et adapté<br>• Meilleure connaissance du marché de ${f.intitule} et des opportunités</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)] } });
}

// ===== CR3 - IND 11 : Grille de suivi =====
export function genGrilleSuiviBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const d0 = new Date(s.dateDebutFormation || f.dateDebut || Date.now());
  const dEnd = new Date(s.dateFinFormation || f.dateFin || Date.now());
  const total = dEnd.getTime() - d0.getTime();
  const rows: string[][] = [];
  const steps = [
    { pct: 0, label: "Accueil et présentation du bilan", action: "Présentation du déroulé, objectifs et attentes", obs: "Bénéficiaire motivé(e), objectifs définis" },
    { pct: 0.05, label: "Entretien individuel", action: "Recueil du parcours professionnel et personnel", obs: "Parcours riche, expériences diversifiées" },
    { pct: 0.1, label: "Analyse des compétences techniques", action: "Évaluation des savoir-faire", obs: "Compétences solides identifiées" },
    { pct: 0.2, label: "Tests pratiques", action: "Exercices techniques et mises en situation", obs: "Bon niveau, axes de perfectionnement identifiés" },
    { pct: 0.35, label: "Analyse des compétences transversales", action: "Évaluation soft skills", obs: "Communication et gestion du temps à renforcer" },
    { pct: 0.5, label: "Enquête métier", action: "Recueil des attentes métiers et opportunités", obs: "Informations précieuses collectées" },
    { pct: 0.65, label: "Étude du marché", action: "Analyse des opportunités professionnelles", obs: "Plusieurs pistes envisagées" },
    { pct: 0.75, label: "Synthèse des résultats", action: "Bilan des compétences et points d'amélioration", obs: "Projet professionnel confirmé" },
    { pct: 0.85, label: "Élaboration du plan d'action", action: "Recommandations et formations complémentaires", obs: "Plan d'action formalisé" },
    { pct: 1.0, label: "Entretien de restitution", action: "Présentation finale et validation du bilan", obs: "Bénéficiaire satisfait(e) et engagé(e)" },
  ];
  for (const step of steps) {
    const d = new Date(d0.getTime() + total * step.pct);
    rows.push([d.toLocaleDateString("fr-FR"), step.label, step.action, step.obs]);
  }
  return buildDocument({ org: o, title: "GRILLE DE SUIVI DU BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "Informations", content: `<p><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br><strong>Domaine :</strong> ${f.intitule}<br><strong>Organisme :</strong> ${o.nom}<br><strong>Période :</strong> ${startDate(s, f)} – ${endDate(s, f)}</p>` },
  ], table: { headers: ["Date", "Étapes du bilan", "Actions réalisées", "Observations"], rows }, signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)] } });
}

// ===== CR3 - IND 11 : Questionnaire suivi post-bilan =====
export function genSuiviPostBilanBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SUIVI POST BILAN DE COMPÉTENCES", subtitle: "À remplir 6 mois après la fin du bilan", stagiaires: [s], sections: [
    { heading: "Identification", content: `<p><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br><strong>Consultant(e) :</strong> ${consultantName(o)}<br><strong>Date du bilan :</strong> du ${startDate(s, f)} au ${endDate(s, f)}<br><strong>Date du questionnaire :</strong> ____/____/________</p>` },
    { heading: "1. Avez-vous mis en œuvre votre plan d'action ?", content: "<p>☐ Oui, intégralement<br>☐ Oui, partiellement<br>☐ Non, pas encore<br>Précisions : _______________________________</p>" },
    { heading: "2. Votre projet professionnel a-t-il évolué ?", content: "<p>☐ Je poursuis le même projet<br>☐ J'ai modifié mon projet<br>☐ J'ai abandonné mon projet<br>Précisions : _______________________________</p>" },
    { heading: "3. Avez-vous suivi une formation complémentaire ?", content: "<p>☐ Oui – Laquelle : _______________________________<br>☐ Non</p>" },
    { heading: "4. Votre situation professionnelle actuelle", content: "<p>☐ En poste (même employeur)<br>☐ En poste (nouvel employeur)<br>☐ En recherche d'emploi<br>☐ En formation<br>☐ Création d'entreprise<br>☐ Autre : _______________________________</p>" },
    { heading: "5. Le bilan vous a-t-il aidé dans vos démarches ?", content: "<p>☐ Très utile<br>☐ Assez utile<br>☐ Peu utile<br>☐ Pas utile</p>" },
    { heading: "6. Commentaires libres", content: "<p>_______________________________<br>_______________________________<br>_______________________________</p>" },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)] } });
}

// ===== CR3 - IND 12 : Procédure d'adaptation =====
export function genProcedureAdaptationBDC(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "PROCÉDURE D'ADAPTATION DE L'ACCOMPAGNEMENT POUR LES BÉNÉFICIAIRES", sections: [
    { heading: "1. Objectif", content: "<p>L'objectif de cette procédure est d'assurer que chaque bénéficiaire d'un bilan de compétences bénéficie d'un accompagnement adapté à ses besoins spécifiques, ses compétences, son rythme et ses contraintes.</p>" },
    { heading: "2. Identification des besoins spécifiques", content: "<p><strong>2.1. Pré-entretien ou questionnaire d'accueil :</strong><br>• Identifier les objectifs professionnels et personnels<br>• Recueillir les informations relatives au parcours<br>• Détecter les besoins spécifiques : handicap, contraintes personnelles, préférences d'apprentissage<br><br><strong>2.2. Documents complémentaires :</strong><br>• Recueil d'attestations médicales si nécessaire (avec consentement)</p>" },
    { heading: "3. Analyse et diagnostic", content: "<p>• Identifier les écarts entre compétences actuelles et objectifs visés<br>• Détecter les obstacles potentiels<br>• Prioriser les adaptations : contenus, rythme, modalités d'évaluation, accompagnement spécifique</p>", variant: "green" },
    { heading: "4. Élaboration du plan d'adaptation", content: "<p>• Co-construction avec le bénéficiaire<br>• Objectifs spécifiques adaptés<br>• Méthodes adaptées (supports audio, vidéo, interactifs)<br>• Aménagements organisationnels (temps modulé, pauses, horaires)<br>• Tutorats personnalisés, coaching motivationnel</p>" },
    { heading: "5. Mise en œuvre", content: "<p>• Informer tous les intervenants<br>• Assurer la confidentialité<br>• Suivi régulier avec le bénéficiaire<br>• Évaluations formatives adaptées</p>" },
    { heading: "6. Suivi et évaluation", content: "<p>• Évaluer régulièrement la progression<br>• Recueillir les retours du bénéficiaire et du consultant<br>• Ajuster le plan si nécessaire<br>• Archiver les données pour l'amélioration continue</p>" },
  ] });
}

// ===== CR4 - IND 19 : Exploration métier =====
export function genExplorationMetierBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  return buildDocument({ org: o, title: "EXPLORATION MÉTIER – BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "1. Contexte et objectif", content: `<p>${g(s, "Le bénéficiaire", "La bénéficiaire")} de ce bilan de compétences exprime un intérêt pour une évolution dans le domaine de <strong>${f.intitule}</strong>. L'objectif est de vérifier la faisabilité du projet professionnel en explorant les exigences du métier, les compétences à acquérir, les formations possibles et les débouchés.</p>` },
    { heading: "2. Métier exploré", content: `<p><strong>Domaine :</strong> ${f.intitule}<br><br><strong>Compétences requises :</strong><br>• <strong>Techniques</strong> : maîtrise des techniques spécifiques au secteur, respect des normes<br>• <strong>Transversales</strong> : rigueur, créativité, organisation, gestion du temps<br>• <strong>Relationnelles</strong> : communication, travail en équipe, gestion de la relation client</p>` },
    { heading: "3. Formations recommandées", content: `<p>• Certifications et diplômes spécifiques au secteur de ${f.intitule}<br>• Stages de perfectionnement<br>• Formation continue et mise à jour des compétences réglementaires</p>`, variant: "green" },
    { heading: "4. Perspectives d'emploi", content: `<p>• Secteur dynamique avec des opportunités variées<br>• Évolutions possibles : spécialisation, management, création d'entreprise<br>• Le métier est en cohérence avec le projet de ${g(s, "le", "la")} bénéficiaire</p>` },
    { heading: "5. Formalisation pour l'audit", content: "<p>Preuves archivées :<br>• Formulaire d'attentes complété en début de bilan<br>• Résultats de l'enquête métier (entretien, fiches ROME)<br>• Plan d'action incluant contacts avec des centres de formation<br>• Synthèse intégrée dans le dossier final<br>• Questionnaire de satisfaction renseigné</p>" },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)] } });
}

// ===== CR5 - IND 21 : Fiche de poste consultant bilan =====
export function genFichePosteConsultantBDC(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FICHE DE POSTE – CONSULTANT(E) BILAN DE COMPÉTENCES", sections: [
    { heading: "Intitulé du poste", content: `<p>Consultant(e) en bilan de compétences<br><strong>Organisme :</strong> ${o.nom}<br><strong>Rattachement :</strong> Direction pédagogique</p>` },
    { heading: "Missions principales", content: "<p>• Conduire des bilans de compétences conformément aux articles L6313-1 à L6313-12 du Code du travail<br>• Accompagner les bénéficiaires dans les trois phases du bilan (préliminaire, investigation, conclusion)<br>• Rédiger les documents de synthèse confidentiels<br>• Assurer le suivi à 6 mois<br>• Réaliser les enquêtes métier et les recherches sectorielles<br>• Garantir la confidentialité des données</p>" },
    { heading: "Compétences requises", content: "<p>• Maîtrise des techniques d'entretien et d'écoute active<br>• Connaissance approfondie du marché de l'emploi et des dispositifs de formation<br>• Capacité d'analyse et de synthèse<br>• Maîtrise des outils d'évaluation (tests, grilles de compétences)<br>• Connaissance du cadre réglementaire (Qualiopi, RGPD)</p>", variant: "green" },
    { heading: "Qualifications", content: "<p>• Diplôme de niveau Bac+3 minimum en psychologie du travail, RH, sciences de l'éducation ou équivalent<br>• Expérience d'au moins 3 ans en accompagnement professionnel<br>• Formation continue en bilan de compétences</p>" },
    { heading: "Conditions", content: `<p>• Lieu : ${o.adresse || "Locaux de l'organisme"}<br>• Disponibilité pour entretiens en présentiel et distanciel<br>• Respect strict de la déontologie et de la confidentialité</p>` },
  ] });
}

// ===== CR5 - IND 21 : Compte rendu de fin de bilan =====
export function genCompteRenduFinBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  return buildDocument({ org: o, title: "COMPTE RENDU DE FIN DE BILAN DE COMPÉTENCES", stagiaires: [s], sections: [
    { heading: "Informations", content: `<p><strong>Organisme :</strong> ${o.nom}<br><strong>Consultant(e) :</strong> ${consultantName(o)}<br><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br>${s.dateNaissance ? `<strong>Date de naissance :</strong> ${formatDate(s.dateNaissance)}<br>` : ""}<strong>Dates du bilan :</strong> du ${startDate(s, f)} au ${endDate(s, f)}<br><strong>Domaine :</strong> ${f.intitule}</p>` },
    { heading: "1. Introduction", content: `<p>${beneficiaireLabel(s)} a intégré le dispositif de bilan de compétences avec l'objectif de faire le point sur son parcours professionnel et de valider son projet dans le domaine de ${f.intitule}. Dès le premier entretien, ${g(s, "il", "elle")} a exprimé une forte motivation et une volonté claire de s'investir dans une carrière en lien avec ses valeurs et ses compétences.</p>` },
    { heading: "2. Déroulement du bilan", content: `<p>Le bilan s'est déroulé sur la période prévue, dans le respect des trois phases :<br><br><strong>Phase préliminaire :</strong><br>• Définition des objectifs<br>• Analyse des attentes et clarification du contexte<br>• Validation de la pertinence de la démarche<br><br><strong>Phase d'investigation :</strong><br>• Exploration du parcours et identification des compétences<br>• Tests de personnalité et d'aptitudes<br>• Enquête métier avec un professionnel du secteur<br><br><strong>Phase de conclusion :</strong><br>• Validation du projet professionnel<br>• Élaboration d'un plan d'action détaillé<br>• Remise du document de synthèse</p>`, variant: "green" },
    { heading: "3. Appréciation du consultant", content: `<p>Tout au long du parcours, ${beneficiaireLabel(s)} a fait preuve d'un excellent engagement. ${g(s, "Il", "Elle")} a abordé chaque exercice avec sérieux, curiosité et sens critique. Son sens de l'analyse, sa rigueur et sa capacité à se remettre en question ont été particulièrement appréciés.<br><br>${beneficiaireLabel(s)} a su mettre en évidence de nombreuses compétences transférables :<br>• Sens de l'organisation<br>• Créativité et adaptabilité<br>• Rigueur et méthode<br>• Esprit d'équipe et sens du service</p>` },
    { heading: "4. Conclusion", content: `<p>Le bilan de compétences s'est déroulé dans de bonnes conditions. ${g(s, "Le", "La")} bénéficiaire repart avec un projet professionnel validé et un plan d'action concret. Un entretien de suivi est prévu dans les 6 mois suivant la fin du bilan.</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)] } });
}

// ===== CR5 - IND 21 : Fiche intervenant externe =====
export function genFicheIntervenantExterneBDC(o: OrganismeInfo, f: FormationInfo) {
  return buildDocument({ org: o, title: "FICHE INTERVENANT EXTERNE", subtitle: `Bilan de compétences – ${f.intitule}`, sections: [
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong><br>Adresse : ${o.adresse}<br>SIRET : ${o.siret || "—"}<br>Consultant(e) : ${consultantName(o)}<br>Contact : ${o.email || "—"} – ${o.telephone || "—"}<br>Formation concernée : Bilan de compétences – ${f.intitule}<br>Dates : du ${formatDate(f.dateDebut)} au ${formatDate(f.dateFin)}</p>` },
    { heading: "Identité de l'intervenant externe", content: "<p>• <strong>Nom :</strong> (à compléter)<br>• <strong>Prénom :</strong> (à compléter)<br>• <strong>Entreprise / Structure :</strong> (à compléter)<br>• <strong>SIRET :</strong> (à compléter)<br>• <strong>Fonction :</strong> Professionnel du secteur / Formateur spécialisé<br>• <strong>E-mail :</strong> (à compléter)<br>• <strong>Téléphone :</strong> (à compléter)</p>" },
    { heading: "Compétences et qualifications", content: `<p>• <strong>Diplôme :</strong> Qualification dans le domaine de ${f.intitule}<br>• <strong>Expérience :</strong> Minimum 1 an dans le secteur<br>• <strong>Expérience en transmission :</strong> Ateliers, formation professionnelle ou encadrement</p>`, variant: "green" },
    { heading: "Rôle dans le bilan", content: "<p>• Intervention lors de la <strong>phase d'investigation</strong> du bilan<br>• Présentation du métier : conditions, débouchés, réalités terrain<br>• Partage d'expérience et retour constructif<br>• Participation à la validation du projet du bénéficiaire</p>" },
    { heading: "Modalités d'intervention", content: "<p>• <strong>Type :</strong> Présentiel / Visio<br>• <strong>Durée estimée :</strong> 2 à 4 heures<br>• <strong>Supports fournis :</strong> Témoignage oral, fiche métier, démonstration éventuelle</p>" },
  ], signatures: { type: "2", labels: ["Le Prestataire", "L'Intervenant externe"], names: [consultantName(o), ""] } });
}

// ===== CR7 - IND 30 : Satisfaction à chaud BDC =====
export function genSatisfactionChaudBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[], si: number) {
  const s = stagiaires[si] || stagiaires[0];
  const satisfactionTable = (title: string, questions: string[]) => {
    const headers = ["Questions", "Très satisfait(e)", "Satisfait(e)", "Moyennement", "Pas satisfait(e)"];
    const rows = questions.map((q, i) => [q, i < 3 ? "✓" : "", i >= 3 ? "✓" : "", "", ""]);
    return `<h2>${title}</h2>${tableHTML(headers, rows)}`;
  };
  const body = orgHeader(o);
  let content = `<h1>QUESTIONNAIRE DE SATISFACTION À CHAUD – BILAN DE COMPÉTENCES</h1>`;
  content += `<p><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br><strong>Date du bilan :</strong> du ${startDate(s, f)} au ${endDate(s, f)}<br><strong>Consultant(e) :</strong> ${consultantName(o)}<br><strong>Organisme :</strong> ${o.nom}</p>`;
  content += `<p>Merci de répondre aux questions suivantes en cochant la case correspondant à votre ressenti.</p>`;
  content += satisfactionTable("1. Déroulement du bilan", [
    "L'accueil de l'organisme", "La disponibilité du/de la consultant(e)", "Le respect du calendrier établi", "Le cadre et l'organisation générale"
  ]);
  content += satisfactionTable("2. Contenu du bilan", [
    "Les outils utilisés (tests, entretiens, enquêtes)", "La clarté des informations reçues", "L'adaptation de l'accompagnement à vos besoins", "L'aide à la définition de votre projet professionnel"
  ]);
  content += satisfactionTable("3. Résultats et utilité", [
    "La pertinence du document de synthèse", "La clarté du plan d'action", "L'utilité du bilan pour votre avenir professionnel", "Votre satisfaction globale"
  ]);
  content += `<h2>4. Commentaires</h2><p>Ce qui vous a le plus apporté : ___________________________<br><br>Suggestions d'amélioration : ___________________________<br><br>Recommanderiez-vous ce bilan ? ☐ Oui ☐ Non</p>`;
  
  return buildDocument({ org: o, title: "QUESTIONNAIRE DE SATISFACTION À CHAUD – BILAN DE COMPÉTENCES", stagiaires: [s], extraHtml: content.replace(/<h1>.*?<\/h1>/, ""), sections: [
    { heading: "", content: `<p><strong>Bénéficiaire :</strong> ${beneficiaireLabel(s)}<br><strong>Date du bilan :</strong> du ${startDate(s, f)} au ${endDate(s, f)}<br><strong>Consultant(e) :</strong> ${consultantName(o)}</p>` },
  ], signatures: { type: "2", labels: [`${g(s, "Le Consultant", "La Consultante")}`, `${g(s, "Le Bénéficiaire", "La Bénéficiaire")}`], names: [consultantName(o), beneficiaireLabel(s)] } });
}

// ===== CR7 - IND 31 : Formulaire de réclamation BDC =====
export function genFormulaireReclamationBDC(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FORMULAIRE DE DÉPÔT DE RÉCLAMATION", sections: [
    { heading: "Identification", content: "<p>Nom : ___________________________<br>Prénom : ___________________________<br>Date de naissance : ___________________________<br>Adresse : ___________________________<br>Téléphone : ___________________________<br>Mail : ___________________________<br>Date du bilan : ___________________________<br>Intitulé du bilan : ___________________________</p>" },
    { heading: "Description de la réclamation", content: "<p>Veuillez détailler de manière la plus précise possible votre réclamation :<br>___________________________<br>___________________________<br>___________________________<br>___________________________</p>" },
    { heading: "Autorisation", content: `<p>J'autorise le centre ${o.nom} à conserver ce formulaire pour améliorer la qualité des prestations et à reprendre contact avec moi :<br><br>☐ Oui &nbsp;&nbsp;&nbsp;&nbsp; ☐ Non</p>` },
  ], signatures: { type: "2", labels: ["Le Prestataire", "Le Bénéficiaire"], names: [consultantName(o), ""] } });
}

// ===== CR7 - IND 31 : Gestion des réclamations BDC =====
export function genGestionReclamationsBDC(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "GESTION DES RÉCLAMATIONS ET DES DYSFONCTIONNEMENTS", sections: [
    { heading: "1. Objet", content: "<p>Cette procédure décrit les modalités de traitement des réclamations et dysfonctionnements signalés par les bénéficiaires de bilans de compétences.</p>" },
    { heading: "2. Recueil des réclamations", content: "<p>Les réclamations peuvent être transmises par :<br>• Formulaire de dépôt de réclamation (papier ou numérique)<br>• Courrier électronique<br>• Appel téléphonique (consigné par écrit)</p>" },
    { heading: "3. Traitement", content: "<p>• Accusé de réception sous 48h<br>• Analyse de la réclamation par le responsable qualité<br>• Enquête interne si nécessaire<br>• Réponse apportée sous 15 jours ouvrés<br>• Actions correctives mises en place</p>", variant: "green" },
    { heading: "4. Suivi", content: "<p>• Enregistrement dans le tableau de suivi des dysfonctionnements<br>• Analyse trimestrielle des réclamations<br>• Intégration dans le processus d'amélioration continue</p>" },
  ] });
}

// ===== CR7 - IND 32 : Tableau actions correctives =====
export function genActionsCorrectivesBDC(o: OrganismeInfo) {
  const rows = [
    ["Retard de restitution synthèse", "10/01/2025", "Réorganisation planning", "Consultant", "Terminé", "30/01/2025"],
    ["Demande d'adaptation horaires", "15/01/2025", "Flexibilité des créneaux", "Direction", "En cours", "—"],
    ["Difficulté d'accès distanciel", "20/01/2025", "Vérification outil visio", "IT", "Terminé", "25/01/2025"],
  ];
  return buildDocument({ org: o, title: "TABLEAU ACTIONS CORRECTIVES – TRAITEMENT DES RÉCLAMATIONS", table: { headers: ["Réclamation", "Date", "Action corrective", "Responsable", "Statut", "Date clôture"], rows } });
}

// ===== CT2 - IND 4 : Bilan mensuel des abandons / ruptures =====
export function genBilanAbandonsRupturesBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const period = `${formatDate(f.dateDebut || "")} – ${formatDate(f.dateFin || "")}`;
  const rows = stagiaires.map((s, i) => [
    String(i + 1),
    beneficiaireLabel(s),
    "",
    "",
    "",
    "",
  ]);
  return buildDocument({
    org: o,
    title: "BILAN MENSUEL DES ABANDONS / RUPTURES",
    sections: [
      { heading: "Informations générales", content: `
        <p><strong>Période :</strong> ${period}</p>
        <p><strong>Nombre de bénéficiaires :</strong> ${stagiaires.length}</p>
        <p><strong>Nombre d'abandons :</strong> 0</p>
        <p><strong>Nombre d'interruptions en cours de prestation :</strong> 0</p>
      ` },
      { heading: "Analyse suivi des abandons et d'interruptions en cours de prestation", content: "" },
    ],
    table: {
      headers: ["N°", "Nom et prénom du bénéficiaire", "Abandon", "Rupture", "Date", "Motif"],
      rows,
    },
  });
}

// ===== CT2 - IND 4 : Bilan mensuel =====
export function genBilanMensuelBDC(o: OrganismeInfo, f: FormationInfo, stagiaires: StagiaireInfo[]) {
  const period = `${formatDate(f.dateDebut || "")} – ${formatDate(f.dateFin || "")}`;
  const tarif = stagiaires[0] ? getStagiaireTarif(stagiaires[0], f) : (f.tarif || "0");
  const rows: string[][] = [
    ["Intitulé de la formation", f.intitule || "", "", "", ""],
    ["Date de la formation", `${formatDate(f.dateDebut || "")} au ${formatDate(f.dateFin || "")}`, "", "", ""],
    ["Nombre de bénéficiaires", String(stagiaires.length), "", "", ""],
    ["Formation particulier", "", "", "", ""],
    ["Formation entreprise", "", "", "", ""],
    ["Financement", "", "", "", ""],
    ["Opco CPF", "", "", "", ""],
    ["Personnel", "", "", "", ""],
    ["Tarif", tarif + " €", "", "", ""],
    ["", "", "", "", ""],
    ["Nombre total bénéficiaires", String(stagiaires.length), "", "", ""],
    ["[CPF] Nombre total", "", "", "", ""],
    ["[OPCO] Nombre total", "", "", "", ""],
    ["Financement Pôle emploi", "", "", "", ""],
    ["[Financement personnel] Nombre total", "", "", "", ""],
    ["Autre (employeur)", "", "", "", ""],
    ["Tarif total", tarif + " €", "", "", ""],
  ];
  return buildDocument({
    org: o,
    title: "BILAN MENSUEL",
    sections: [
      { heading: "Période", content: `<p>${period}</p>` },
    ],
    table: {
      headers: ["", "Formation 1", "Formation 2", "Formation 3", "Formation 4"],
      rows,
    },
  });
}
