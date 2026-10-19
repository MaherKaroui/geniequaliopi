// Critère 5 — IND 21 & IND 22 generators (based on real SELECT FORMATION documents)
import { typeAuditEffectif } from "./typeAudit";
import { mot } from "./resolveurFormation";
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate, cachetDirigeantHtml } from "./docBuilder";
import { FormateurInfo } from "./sampleData";

// ===== IND 21 — FICHES DE POSTE (role-based) =====

export function genFichePosteRole(o: OrganismeInfo, role: string, formateurNom?: string, f?: FormationInfo) {
  switch (role) {
    case "referent_handicap": return genFichePosteRefHandicap(o, f);
    case "referent_administratif": return genFichePosteRefAdmin(o, f);
    case "referent_qualite_externe": return genFichePosteRefQualiteExterne(o);
    case "formateur": return genFichePosteFormateurNom(o, formateurNom, f);
    case "dirigeant": return genFichePosteResponsablePedagogique(o, f);
    default: return genFichePosteFormateurNom(o, formateurNom, f);
  }
}

/** Domaine de la formation, utilisé pour contextualiser les fiches de poste. */
function domaineFormation(f?: FormationInfo): string {
  const t = (f?.intitule || "").trim();
  return t || "la formation dispensée par l'organisme";
}

/** Ligne « Profil requis » d'expérience, contextualisée à la formation. */
function ligneExperience(f?: FormationInfo): string {
  return `<li>Expérience minimum de 2 ans dans le domaine « ${domaineFormation(f)} » ou en formation d'adultes sur ce domaine</li>`;
}

function genFichePosteRefQualiteExterne(o: OrganismeInfo) {
  const brut = (o.referentQualite || o.dirigeant || "").trim();
  const externe = /externe/i.test(brut);
  const nomRQ = brut.replace(/\s*\(\s*externe\s*\)\s*/i, "").trim() || o.dirigeant;
  return buildDocument({ org: o, title: "FICHE DE POSTE", subtitle: `Référent qualité${externe ? " externe" : ""} – ${nomRQ}`, sections: [
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong></p>` },
    { heading: "Identité du référent qualité", content: `<p><strong>${nomRQ}</strong></p><p>${externe ? "Prestataire externe mandaté par l'organisme de formation pour le pilotage et le suivi de la démarche qualité Qualiopi (voir registre de sous-traitance, IND 27)." : `Fonction assurée en interne au sein de ${o.nom}.`}</p>` },
    { heading: "Lieu d'intervention", content: `<p>La mission est réalisée principalement à distance, avec des interventions ponctuelles en présentiel au sein des locaux de l'organisme situés au :</p><p>${o.adresse}, ${o.codePostal} ${o.ville}.</p><p>Des échanges réguliers (visioconférence, téléphone, messagerie) sont organisés avec la direction et l'équipe pédagogique.</p>` },
    { heading: "Type de contrat", content: `<p>${externe ? "Prestataire externe, dans le cadre d'un contrat de prestation de services pour l'accompagnement et le pilotage de la démarche qualité Qualiopi." : "Fonction interne exercée par le dirigeant ou un salarié de l'organisme."}</p><p>Les modalités contractuelles sont établies dans le respect du cadre réglementaire de la formation professionnelle continue et des exigences du Référentiel National Qualité (Qualiopi).</p>` },
    { heading: "Finalité du poste", content: `<p>Le référent qualité est garant de la conformité de l'organisme au référentiel national qualité (article L.6316-3 du Code du travail), dans sa version issue du décret n° 2026-728 du 1er août 2026 (33 indicateurs, en vigueur le 1er novembre 2026).</p><p>Elle accompagne la direction dans la mise en œuvre, le suivi et l'amélioration continue du système de management de la qualité, et prépare l'organisme aux audits initiaux, de surveillance et de renouvellement.</p>` },
    { heading: "Missions principales", content: `<ul><li>Concevoir, déployer et faire vivre le système qualité de l'organisme</li><li>Garantir la conformité aux 7 critères et 33 indicateurs du Référentiel National Qualité</li><li>Réaliser des audits internes réguliers et formaliser des plans d'actions correctives</li><li>Préparer et accompagner les audits Qualiopi (initial, surveillance, renouvellement)</li><li>Accompagner la direction lors des audits externes et lever les non-conformités</li><li>Mettre à jour les procédures, processus, modes opératoires et documents qualité</li><li>Former et sensibiliser l'équipe pédagogique et administrative aux exigences Qualiopi</li><li>Analyser les indicateurs qualité (satisfaction, abandons, réclamations, résultats)</li><li>Piloter la veille légale, réglementaire et qualité de la formation professionnelle</li><li>Suivre et exploiter les enquêtes de satisfaction à chaud et à froid</li><li>Gérer le traitement des réclamations et des actions correctives</li><li>Animer la revue de direction annuelle et formaliser le plan d'amélioration continue</li><li>Conseiller la direction sur les évolutions réglementaires et leurs impacts</li></ul>` },
    { heading: "Savoir-faire (compétences techniques)", content: `<ul><li>Maîtrise approfondie du Référentiel National Qualité (Qualiopi) et de ses 33 indicateurs</li><li>Connaissance complète du cadre réglementaire de la formation professionnelle continue</li><li>Conduite d'audits internes et préparation aux audits externes</li><li>Rédaction de procédures, processus et documents qualité</li><li>Analyse de données qualité et construction d'indicateurs de pilotage</li><li>Animation de revues de direction et de revues de processus</li><li>Maîtrise des outils bureautiques et de gestion documentaire</li><li>Pédagogie et transmission auprès des équipes</li></ul>` },
    { heading: "Savoir-être (compétences comportementales)", content: `<ul><li>Rigueur, méthode et sens du détail</li><li>Sens de l'écoute et capacité d'analyse</li><li>Diplomatie et capacité à fédérer autour de la démarche qualité</li><li>Autonomie et sens de l'initiative</li><li>Confidentialité et discrétion professionnelle</li><li>Capacité à travailler à distance et en mode projet</li><li>Esprit pédagogique et bienveillant</li><li>Force de proposition dans l'amélioration continue</li></ul>` },
    { heading: "Profil requis", content: `<ul><li>Expérience confirmée dans le pilotage de la démarche qualité en organisme de formation</li><li>Maîtrise approfondie du Référentiel National Qualité (Qualiopi)</li><li>Expérience de plusieurs audits Qualiopi (initial, surveillance, renouvellement)</li><li>Bonne connaissance du secteur de la formation professionnelle continue, de l'apprentissage et des financeurs (OPCO, CPF, France Travail)</li><li>Expérience en accompagnement et conseil auprès d'organismes de formation</li></ul>` },
    { heading: "Moyens et ressources mis à disposition", content: `<ul><li>Accès aux procédures internes, documents qualité et outils de pilotage</li><li>Accès aux plateformes utilisées par l'organisme (LMS, EDOF, dossiers stagiaires)</li><li>Appui de la direction et de l'équipe pédagogique</li><li>Documentation réglementaire et veille qualité</li></ul>`, variant: "green" },
    { heading: "Indicateurs de performance", content: `<ul><li>Conformité aux 33 indicateurs Qualiopi</li><li>Résultats des audits internes et externes (nombre de non-conformités levées)</li><li>Délai de mise en œuvre des actions correctives</li><li>Taux de satisfaction des bénéficiaires</li><li>Mise à jour effective de la veille légale et réglementaire</li><li>Tenue de la revue de direction annuelle</li></ul>` },
    { heading: "Positionnement", content: `<p>${nomRQ} intervient ${externe ? "en qualité de prestataire externe " : ""}sous l'autorité de la direction de ${o.nom}, en lien étroit avec le responsable pédagogique, le référent administratif et le référent handicap.</p>` },
  ] });
}

function genFichePosteRefHandicap(o: OrganismeInfo, f?: FormationInfo) {
  return buildDocument({ org: o, title: "FICHE DE POSTE", subtitle: "Référent Handicap", sections: [
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong></p>` },
    { heading: "Lieu d'intervention", content: `<p>La mission est réalisée exclusivement en présentiel, au sein des locaux de l'organisme de formation situés au :</p><p>${o.adresse}, ${o.codePostal} ${o.ville}.</p><p>Des échanges à distance peuvent être organisés avec les partenaires institutionnels ou les bénéficiaires lorsque la situation le nécessite.</p>` },
    { heading: "Type de contrat", content: `<p>Le poste est proposé sous l'un des statuts suivants :</p><ul><li>Salarié en contrat à durée déterminée ou indéterminée,</li><li>Vacataire,</li><li>Prestataire externe spécialisé, dans le cadre d'une mission d'accompagnement handicap.</li></ul><p>Les modalités contractuelles sont établies dans le respect du cadre réglementaire de la formation professionnelle et des exigences du Référentiel National Qualité (Qualiopi).</p>` },
    { heading: "Finalité du poste", content: `<p>Le/La Référent(e) Handicap est chargé(e) de garantir l'accessibilité des formations aux personnes en situation de handicap, d'assurer leur accueil, accompagnement et suivi, et de coordonner les aménagements pédagogiques, matériels et organisationnels nécessaires.</p><p>Il/Elle contribue à la mise en œuvre de la politique d'accessibilité de l'organisme et au respect des obligations légales et qualité.</p>` },
    { heading: "Missions principales", content: `<ul><li>Informer et orienter les personnes en situation de handicap</li><li>Analyser les besoins spécifiques des bénéficiaires en amont de la formation</li><li>Proposer et coordonner les aménagements pédagogiques, matériels et organisationnels</li><li>Assurer le suivi individualisé des stagiaires en situation de handicap</li><li>Sensibiliser les équipes pédagogiques et administratives à l'accueil des publics PSH</li><li>Mobiliser et coordonner les partenaires spécialisés (Agefiph, Cap Emploi, MDPH, etc.)</li><li>Veiller à l'accessibilité des locaux, outils et supports de formation</li><li>Mettre à jour les informations relatives à l'accessibilité sur les supports de communication</li><li>Assurer la traçabilité des actions mises en place</li><li>Participer aux audits et contrôles Qualiopi</li><li>Contribuer à l'amélioration continue de la politique handicap de l'organisme</li></ul>` },
    { heading: "Savoir-faire (compétences techniques)", content: `<ul><li>Connaître le cadre légal du handicap et de l'accessibilité</li><li>Analyser les besoins spécifiques des personnes en situation de handicap</li><li>Mettre en place des aménagements adaptés aux contraintes de formation</li><li>Mobiliser les dispositifs et acteurs du champ du handicap</li><li>Conseiller les équipes pédagogiques sur l'adaptation des parcours</li><li>Assurer la traçabilité et la confidentialité des informations</li><li>Appliquer les exigences du Référentiel National Qualité (Qualiopi)</li></ul>` },
    { heading: "Savoir-être (compétences comportementales)", content: `<ul><li>Écoute active et bienveillance</li><li>Sens de la confidentialité et du respect de la personne</li><li>Empathie et capacité d'adaptation</li><li>Rigueur et sens de l'organisation</li><li>Capacité à travailler en réseau</li><li>Communication claire et rassurante</li><li>Réactivité face aux situations particulières</li><li>Esprit d'analyse et de solution</li></ul>` },
    { heading: "Profil requis", content: `<ul><li>Sensibilité ou expérience dans l'accompagnement des personnes en situation de handicap</li><li>Connaissance du secteur de la formation professionnelle appréciée</li><li>Une formation ou une expérience en lien avec le handicap est un plus</li><li>Capacité à travailler en lien avec des partenaires institutionnels</li>${ligneExperience(f)}</ul>` },
    { heading: "Moyens et ressources mis à disposition", content: `<ul><li>Accès aux procédures internes liées à l'accessibilité</li><li>Outils de suivi et de traçabilité</li><li>Répertoire des partenaires handicap</li><li>Supports d'information et de sensibilisation</li><li>Appui de la direction et de l'équipe pédagogique</li></ul>`, variant: "green" },
    { heading: "Indicateurs de performance", content: `<ul><li>Nombre de bénéficiaires PSH accompagnés</li><li>Taux de satisfaction des bénéficiaires PSH</li><li>Pertinence des aménagements mis en place</li><li>Traçabilité des actions d'accompagnement</li><li>Résultats des audits Qualiopi</li></ul>` },
    { heading: "Positionnement hiérarchique", content: `<p>Le/La Référent(e) Handicap intervient sous l'autorité de la direction de l'organisme et travaille en collaboration étroite avec le référent pédagogique, le référent administratif et les formateurs.</p>` },
  ] });
}

function genFichePosteRefAdmin(o: OrganismeInfo, f?: FormationInfo) {
  return buildDocument({ org: o, title: "FICHE DE POSTE", subtitle: "Référent Administratif", sections: [
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong></p>` },
    { heading: "Lieu d'intervention", content: `<p>La mission est réalisée exclusivement en présentiel, au sein des locaux de l'organisme de formation situés au :</p><p>${o.adresse}, ${o.codePostal} ${o.ville}.</p><p>Des interventions ponctuelles peuvent être réalisées sur des sites partenaires pour des besoins administratifs liés aux actions de formation.</p>` },
    { heading: "Type de contrat", content: `<p>Le poste est proposé sous l'un des statuts suivants :</p><ul><li>Salarié en contrat à durée déterminée ou indéterminée,</li><li>Vacataire administratif,</li><li>Prestataire indépendant, dans le cadre d'une mission administrative externalisée.</li></ul><p>Les modalités contractuelles sont établies dans le respect du cadre réglementaire de la formation professionnelle et des exigences du Référentiel National Qualité (Qualiopi).</p>` },
    { heading: "Finalité du poste", content: `<p>Le/La Référent(e) Administratif(ve) assure la gestion administrative complète des actions de formation, de l'inscription des bénéficiaires jusqu'à l'archivage des dossiers, en garantissant la conformité réglementaire, la traçabilité des documents et le respect des exigences qualité de l'organisme.</p><p>Il/Elle est un acteur clé du bon fonctionnement administratif et de la conformité Qualiopi.</p>` },
    { heading: "Missions principales", content: `<ul><li>Gérer les inscriptions et le suivi administratif des stagiaires</li><li>Constituer, vérifier et archiver les dossiers administratifs de formation</li><li>Établir et suivre les documents réglementaires : contrats ou conventions de formation, convocations, règlement intérieur, conditions générales de vente</li><li>Assurer le suivi des feuilles d'émargement et des attestations de fin de formation</li><li>Gérer les délais d'accès à la formation</li><li>Assurer la relation administrative avec les stagiaires, formateurs et partenaires</li><li>Préparer et suivre les dossiers de financement (CPF, OPCO, autofinancement)</li><li>Veiller au respect des obligations réglementaires (DA, BPF, EDOF, Qualiopi)</li><li>Mettre à jour les bases de données administratives</li><li>Participer aux audits et contrôles (Qualiopi, financeurs, DREETS)</li><li>Contribuer à l'amélioration continue des processus administratifs</li></ul>` },
    { heading: "Savoir-faire (compétences techniques)", content: `<ul><li>Maîtriser les procédures administratives de la formation professionnelle</li><li>Constituer et contrôler des dossiers administratifs conformes</li><li>Utiliser les outils bureautiques (Word, Excel, messagerie)</li><li>Utiliser des outils de gestion de formation et plateformes dématérialisées</li><li>Suivre des échéanciers et respecter les délais réglementaires</li><li>Appliquer les exigences du Référentiel National Qualité (Qualiopi)</li><li>Assurer la traçabilité et l'archivage documentaire</li><li>Rédiger des courriers et documents administratifs professionnels</li></ul>` },
    { heading: "Savoir-être (compétences comportementales)", content: `<ul><li>Rigueur et sens de l'organisation</li><li>Fiabilité et discrétion professionnelle</li><li>Autonomie dans la gestion des dossiers</li><li>Sens des priorités</li><li>Esprit d'analyse et de contrôle</li><li>Qualités relationnelles et communication professionnelle</li><li>Capacité à travailler en équipe</li><li>Réactivité face aux demandes administratives</li><li>Respect des procédures et des délais</li></ul>` },
    { heading: "Profil requis", content: `<ul><li>Formation ou expérience en gestion administrative</li><li>Expérience souhaitée dans un organisme de formation</li><li>Connaissance du cadre réglementaire de la formation professionnelle appréciée</li><li>Maîtrise des outils bureautiques</li>${ligneExperience(f)}</ul>` },
    { heading: "Moyens et outils mis à disposition", content: `<ul><li>Poste informatique équipé</li><li>Logiciels bureautiques et outils de gestion administrative</li><li>Accès aux plateformes réglementaires (EDOF, OPCO, etc.)</li><li>Procédures internes et référentiels qualité</li><li>Accompagnement par l'équipe pédagogique et qualité</li></ul>`, variant: "green" },
    { heading: "Indicateurs de performance", content: `<ul><li>Taux de conformité des dossiers administratifs</li><li>Respect des délais réglementaires</li><li>Qualité des documents produits</li><li>Satisfaction des stagiaires et formateurs (partie administrative)</li><li>Résultats des audits et contrôles</li></ul>` },
    { heading: "Positionnement hiérarchique", content: `<p>Le/La Référent(e) Administratif(ve) exerce ses missions sous l'autorité de la direction de l'organisme et travaille en lien étroit avec le référent pédagogique et les formateurs.</p>` },
  ] });
}

function genFichePosteFormateurNom(o: OrganismeInfo, formateurNom?: string, f?: FormationInfo) {
  const dom = domaineFormation(f);
  const subtitleName = formateurNom
    ? `Formateur / Formatrice – ${formateurNom}${f?.intitule ? ` – ${f.intitule}` : ""}`
    : `Formateur / Formatrice – ${dom}`;
  // Compétences techniques : issues des objectifs saisis de la formation, sinon formulation générique
  const objectifsList = (f?.objectifs || "")
    .split(/\r?\n|;/)
    .map(l => l.replace(/^[-•\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 8);
  const savoirFaireMetier = objectifsList.length
    ? objectifsList.map(l => `<li>Maîtriser et transmettre : ${l}</li>`).join("")
    : `<li>Maîtriser les savoirs, gestes et techniques professionnels du domaine « ${dom} »</li>`;
  const moyens = (f?.moyensPedagogiques || "")
    .split(/\r?\n|;/)
    .map(l => l.replace(/^[-•\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 6);
  const moyensList = moyens.length
    ? moyens.map(l => `<li>${l}</li>`).join("")
    : `<li>Salle et/ou plateau technique équipé pour le domaine « ${dom} »</li><li>Matériels, équipements et consommables nécessaires aux mises en situation</li>`;
  return buildDocument({ org: o, title: "FICHE DE POSTE", subtitle: subtitleName, sections: [
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong></p>` },
    { heading: "Formation concernée", content: `<p><strong>${dom}</strong>${f?.codeRNCP ? ` — ${f.codeRNCP}` : ""}${f?.duree ? `<br/>Durée : ${f.duree}` : ""}${f?.modalites ? `<br/>Modalités : ${f.modalites}` : ""}</p>` },
    { heading: "Lieu d'intervention", content: `<p>La mission est réalisée${f?.lieu ? ` au sein du lieu de formation : ${f.lieu}` : " au sein des locaux de l'organisme de formation situés au :"}</p><p>${o.adresse}, ${o.codePostal} ${o.ville}.</p><p>Des interventions ponctuelles peuvent également être organisées sur des sites partenaires, dans le cadre d'actions de formation planifiées par l'organisme.</p>` },
    { heading: "Type de contrat", content: `<p>Le poste est proposé sous l'un des statuts suivants, en fonction des besoins pédagogiques :</p><ul><li>Vacataire de la formation professionnelle, avec rémunération à l'heure ou à la journée d'intervention,</li><li>Formateur indépendant, dans le cadre d'un contrat de prestation de services,</li><li>Salarié en contrat à durée déterminée ou indéterminée, selon le volume d'activité.</li></ul><p>L'ensemble des modalités contractuelles est établi dans le respect du cadre réglementaire de la formation professionnelle continue et des exigences du Référentiel National Qualité (Qualiopi).</p>` },
    { heading: "Finalité du poste", content: `<p>Le/La formateur(trice) a pour mission de concevoir, animer et évaluer les actions de formation « ${dom} », afin de permettre aux bénéficiaires d'acquérir les compétences visées par le programme et de les mettre en œuvre en situation professionnelle.</p><p>Il/Elle contribue activement à la qualité des parcours de formation, à la satisfaction des stagiaires et à l'amélioration continue des pratiques pédagogiques de l'organisme.</p>` },
    { heading: "Missions principales", content: `<ul><li>Animer les sessions de la formation « ${dom} »${f?.modalites ? ` (${f.modalites})` : ""}</li><li>Présenter clairement les objectifs de formation et le déroulé pédagogique</li><li>Adapter les contenus et le rythme aux profils et niveaux des apprenants</li><li>Mettre en œuvre une pédagogie active favorisant la pratique et l'autonomie</li><li>Accompagner individuellement les stagiaires tout au long de la formation</li><li>Concevoir et utiliser des supports pédagogiques adaptés au domaine</li><li>Évaluer les acquis des stagiaires (positionnement, exercices, évaluations finales)</li><li>Renseigner les documents de suivi pédagogique et administratif</li><li>Réaliser les bilans à chaud et à froid</li><li>Appliquer et respecter les procédures internes et le cadre Qualiopi</li><li>Contribuer aux actions d'amélioration continue de l'organisme</li></ul>` },
    { heading: "Savoir-faire (compétences techniques et pédagogiques)", content: `<ul>${savoirFaireMetier}<li>Concevoir des supports pédagogiques clairs et accessibles</li><li>Animer une formation en alternant apports théoriques et mises en pratique</li><li>Adapter sa pédagogie aux publics accueillis${f?.publicVise ? ` : ${f.publicVise}` : ""}</li><li>Évaluer les compétences acquises à l'aide de grilles et d'outils adaptés</li><li>Assurer un suivi pédagogique structuré</li><li>Appliquer les exigences du Référentiel National Qualité (Qualiopi)</li></ul>` },
    { heading: "Savoir-être (compétences comportementales)", content: `<ul><li>Sens de la pédagogie et de la transmission des savoirs</li><li>Patience, écoute active et bienveillance</li><li>Capacité à rassurer et accompagner des publics débutants</li><li>Adaptabilité face à des profils variés</li><li>Clarté et rigueur dans les explications</li><li>Posture professionnelle et respect du cadre de formation</li><li>Sens de l'organisation et ponctualité</li><li>Esprit d'amélioration continue</li><li>Capacité à travailler en collaboration avec l'équipe pédagogique</li></ul>` },
    { heading: "Profil requis", content: `<ul><li>Maîtrise professionnelle confirmée du domaine « ${dom} »</li><li>Expérience professionnelle et/ou pédagogique dans ce domaine</li><li>Une expérience en formation pour adultes est appréciée</li><li>Connaissance du cadre de la formation professionnelle continue est un plus</li>${ligneExperience(f)}</ul>` },
    { heading: "Moyens et ressources mis à disposition", content: `<ul>${moyensList}<li>Supports pédagogiques fournis par l'organisme</li><li>Assistance pédagogique et administrative</li></ul>`, variant: "green" },
    { heading: "Positionnement dans l'organisation", content: `<p>Le/La formateur(trice) intervient sous la responsabilité du référent pédagogique et s'inscrit dans la démarche qualité et d'amélioration continue de ${o.nom}.</p>` },
  ] });
}

function genFichePosteResponsablePedagogique(o: OrganismeInfo, f?: FormationInfo) {
  return buildDocument({ org: o, title: "FICHE DE POSTE", subtitle: "Responsable Pédagogique", sections: [
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong></p>` },
    { heading: "Lieu d'intervention", content: `<p>La fonction est exercée principalement en présentiel, au sein des locaux de l'organisme situés au :</p><p>${o.adresse}, ${o.codePostal} ${o.ville}.</p><p>Des échanges ponctuels à distance peuvent avoir lieu avec les formateurs, partenaires ou bénéficiaires, selon les besoins pédagogiques et organisationnels.</p>` },
    { heading: "Type de contrat", content: `<p>Le poste est proposé sous l'un des statuts suivants :</p><ul><li>Salarié en contrat à durée déterminée ou indéterminée,</li><li>Cadre dirigeant ou cadre pédagogique,</li><li>Prestataire externe, dans le cadre d'une mission de pilotage pédagogique.</li></ul><p>Les modalités contractuelles sont définies dans le respect du cadre réglementaire de la formation professionnelle continue et des exigences du Référentiel National Qualité (Qualiopi).</p>` },
    { heading: "Finalité du poste", content: `<p>Le/La Responsable Pédagogique est garant(e) de la qualité pédagogique des formations proposées par l'organisme.</p><p>Il/Elle conçoit, pilote, coordonne et évalue les dispositifs de formation, en veillant à l'alignement entre objectifs, contenus, méthodes pédagogiques, évaluations et besoins des bénéficiaires.</p><p>Il/Elle joue un rôle central dans la démarche qualité Qualiopi et dans l'amélioration continue des actions de formation.</p>` },
    { heading: "Missions principales – Pilotage pédagogique", content: `<ul><li>Définir et structurer l'offre de formation de l'organisme</li><li>Élaborer et mettre à jour les programmes de formation</li><li>Garantir la cohérence pédagogique des parcours</li><li>Veiller à l'adéquation entre objectifs, contenus, méthodes et évaluations</li></ul>` },
    { heading: "Missions principales – Coordination des formateurs", content: `<ul><li>Recruter, intégrer et accompagner les formateurs</li><li>Superviser les pratiques pédagogiques</li><li>Organiser des réunions pédagogiques et temps d'échange</li><li>Apporter un appui pédagogique aux formateurs</li></ul>` },
    { heading: "Missions principales – Qualité et conformité", content: `<ul><li>Mettre en œuvre et suivre les exigences du Référentiel National Qualité (Qualiopi)</li><li>Préparer et participer aux audits qualité</li><li>Suivre les indicateurs de performance pédagogique</li><li>Analyser les bilans à chaud et à froid</li><li>Proposer et piloter des actions d'amélioration continue</li></ul>` },
    { heading: "Missions principales – Suivi des bénéficiaires", content: `<ul><li>Veiller à la qualité de l'accueil, de l'accompagnement et du suivi des stagiaires</li><li>S'assurer de la prise en compte des besoins spécifiques, notamment PSH</li><li>Garantir l'objectivité et la traçabilité des évaluations</li></ul>` },
    { heading: "Savoir-faire (compétences techniques et pédagogiques)", content: `<ul><li>Concevoir et structurer des dispositifs de formation</li><li>Définir des objectifs pédagogiques mesurables</li><li>Mettre en œuvre des méthodes pédagogiques adaptées aux adultes</li><li>Piloter des évaluations des acquis et de la satisfaction</li><li>Analyser des données pédagogiques et qualité</li><li>Appliquer le Référentiel National Qualité (Qualiopi)</li><li>Encadrer et accompagner des équipes de formateurs</li><li>Utiliser les outils bureautiques et plateformes de formation</li></ul>` },
    { heading: "Savoir-être (compétences comportementales)", content: `<ul><li>Leadership pédagogique</li><li>Sens de l'organisation et de la planification</li><li>Rigueur et sens des responsabilités</li><li>Capacité d'analyse et de prise de décision</li><li>Qualités relationnelles et communication professionnelle</li><li>Esprit d'écoute et de coopération</li><li>Adaptabilité et réactivité</li><li>Engagement dans une démarche d'amélioration continue</li></ul>` },
    { heading: "Profil requis", content: `<ul><li>Formation ou expérience significative en ingénierie pédagogique</li><li>Expérience dans la formation professionnelle pour adultes</li><li>Connaissance approfondie du cadre réglementaire de la formation</li><li>Expérience en management ou coordination d'équipe appréciée</li>${ligneExperience(f)}</ul>` },
    { heading: "Moyens et ressources mis à disposition", content: `<ul><li>Accès aux outils pédagogiques et qualité</li><li>Plateformes de gestion de formation et supports numériques</li><li>Procédures internes et référentiels qualité</li><li>Appui de la direction et des équipes administratives</li></ul>`, variant: "green" },
    { heading: "Indicateurs de performance", content: `<ul><li>Atteinte des objectifs pédagogiques</li><li>Taux de satisfaction des bénéficiaires</li><li>Qualité des programmes et des évaluations</li><li>Résultats des audits Qualiopi</li><li>Engagement et performance des formateurs</li></ul>` },
    { heading: "Positionnement hiérarchique", content: `<p>Le/La Responsable Pédagogique est placé(e) sous l'autorité de la direction de l'organisme et travaille en lien étroit avec le référent administratif, le référent handicap et les formateurs.</p>` },
  ] });
}

// ===== IND 21 — AUTO-ÉVALUATION FORMATEUR =====

export function genAutoEvaluationFormateurV2(o: OrganismeInfo, f: FormationInfo, fmt: FormateurInfo, stagiaires: StagiaireInfo[] = [], sessionDates?: { debut?: string; fin?: string }) {
  const formateurNom = `${fmt.prenom} ${fmt.nom}`.trim();
  // Find matching stagiaire for this formateur to get their specific signature
  const matchingStagiaire = stagiaires.find(s => s.formateur === formateurNom || s.formateur === f.formateur);
  const fmtSigUrl = matchingStagiaire?.formateurSignatureUrl || f.formateurSignatureUrl;
  const sessionLabel = sessionDates && (sessionDates.debut || sessionDates.fin)
    ? `Session du ${formatDate(sessionDates.debut || "")} au ${formatDate(sessionDates.fin || "")}`
    : "";
  const subtitle = sessionLabel ? `${formateurNom} – ${sessionLabel}` : formateurNom;
  const sessionLine = sessionLabel ? `<br><strong>Session :</strong> du ${formatDate(sessionDates!.debut || "")} au ${formatDate(sessionDates!.fin || "")}` : "";
  const dateSig = sessionDates?.fin || f.dateFin;
  return buildDocument({ org: o, title: "Auto-évaluation du formateur", subtitle, sections: [
    { heading: "Informations", content: `<p><strong>Nom :</strong> ${formateurNom}<br><strong>Date :</strong> ${formatDate(dateSig)}<br><strong>Formation concernée :</strong> ${f.intitule}${sessionLine}</p>` },
  ], table: {
    headers: ["Critères", "Évaluation (1 à 5)", "Commentaires / Remarques"],
    rows: [
      ["Prise de connaissance du programme de formation", "5", "Programme maîtrisé, objectifs clairement identifiés et respectés tout au long de la formation."],
      ["Préparation des supports pédagogiques", "4", "Supports pédagogiques adaptés à un public débutant, clairs et progressifs."],
      ["Adaptation des modalités pédagogiques", "4", "Méthode progressive favorisant la compréhension et la mise en pratique immédiate."],
      ["Clarté des consignes données", "5", "Consignes claires, reformulées si nécessaire pour assurer la compréhension de tous."],
      ["Utilisation de méthodes variées", "5", "Alternance entre démonstrations en direct, exercices pratiques et échanges oraux."],
      ["Encouragement de la participation", "5", "Participation active encouragée, échanges réguliers avec les stagiaires."],
      ["Adaptation au rythme des stagiaires", "4", "Souplesse dans le déroulé afin de s'adapter aux niveaux et aux besoins individuels."],
      ["Utilisation des outils pédagogiques", "5", "Utilisation du matériel informatique, vidéoprojecteur et supports papier/numériques."],
      ["Suivi individualisé", "5", "Accompagnement personnalisé tout au long de la formation."],
      ["Évaluations mises en œuvre", "5", "Test de positionnement, exercices pratiques et évaluation finale réalisés."],
      ["Suivi de la progression", "5", "Grille d'acquisition des compétences complétée et commentée."],
    ]
  }, extraHtml: `
    <div class="section"><h3>Analyse du formateur</h3>
    <p>La formation s'est déroulée dans de bonnes conditions en présentiel, permettant un accompagnement de proximité et une interaction constante avec le stagiaire. Les objectifs pédagogiques ont été atteints grâce à une approche progressive, orientée vers la pratique. Le suivi individualisé a permis d'adapter le rythme et les explications en fonction des besoins identifiés lors du test de positionnement initial. Les évaluations mises en place ont confirmé la montée en compétences du stagiaire et la bonne assimilation des notions abordées.</p></div>
    <div class="section"><h3>Propositions d'amélioration</h3>
    <p>Développer des supports complémentaires en autonomie (fiches mémo, tutoriels courts).</p>
    <p>Renforcer encore la pratique sur des cas professionnels concrets.</p></div>
    <p><strong>Organisme de formation :</strong> ${o.nom}</p>
    <div class="signature-block-2">
      <div class="sig-box"><p class="sig-label">Signature du formateur</p><p>Nom : ${formateurNom}</p><p>Date : ${formatDate(dateSig)}</p><p style="margin-top:20px">Signature :</p>${fmtSigUrl ? `<img src="${fmtSigUrl}" alt="Signature formateur" style="max-height:50px;max-width:120px;object-fit:contain;margin-top:5px" />` : ""}</div>
      <div class="sig-box"><p class="sig-label">Le Responsable Pédagogique</p><p>Nom : ${o.responsablePedagogique}</p><p>Date : ${formatDate(dateSig)}</p><p style="margin-top:20px">Cachet :</p>${o.tamponUrl ? `<img src="${o.tamponUrl}" alt="Tampon" style="max-height:60px;max-width:140px;object-fit:contain;margin-top:5px;opacity:0.85" />` : ""}</div>
    </div>
  ` });
}

// ===== IND 21 — PROCESSUS DE RECRUTEMENT =====

export function genProcessusRecrutementV2(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "DESCRIPTION DU PROCESSUS DE RECRUTEMENT ET D'INTÉGRATION DES FORMATEURS", sections: [
    { heading: "Objectif du processus", content: `<p>Assurer une sélection rigoureuse et une intégration efficace des formateurs afin de garantir la qualité des prestations dispensées aux stagiaires.</p>` },
    { heading: "Processus de recrutement", content: `
      <h3>1. Analyse des besoins</h3>
      <ul><li>Identification des compétences et qualifications requises pour chaque domaine d'intervention.</li><li>Évaluation des besoins en termes de volume horaire et de disponibilité des formateurs.</li></ul>
      <h3>2. Publication de l'offre</h3>
      <ul><li>Rédaction d'une offre claire précisant : le profil recherché, les compétences et qualifications exigées, le contexte de l'intervention (type de formation, publics cibles)</li><li>Diffusion de l'offre sur des plateformes spécialisées, réseaux sociaux professionnels et sites partenaires.</li></ul>
      <h3>3. Présélection des candidats</h3>
      <ul><li>Analyse des CV et lettres de motivation.</li><li>Pré-qualification des candidats via des entretiens téléphoniques ou visioconférences.</li></ul>
      <h3>4. Entretien de sélection</h3>
      <ul><li>Organisation d'entretiens approfondis pour évaluer : les compétences pédagogiques et techniques, les capacités relationnelles et l'adaptabilité, l'adéquation avec les valeurs de l'organisme</li><li>Présentation d'une simulation ou d'un échantillon de cours.</li></ul>
      <h3>5. Vérification des références</h3>
      <ul><li>Contact des précédents employeurs ou partenaires pour confirmer les compétences et l'expérience du candidat.</li></ul>
      <h3>6. Validation et proposition</h3>
      <ul><li>Validation du choix final par le responsable de la formation.</li><li>Envoi d'une proposition contractuelle au candidat retenu.</li></ul>` },
    { heading: "Processus d'intégration", content: `
      <h3>1. Préparation administrative</h3>
      <ul><li>Signature du contrat de collaboration.</li><li>Fourniture des documents nécessaires (diplômes, certificats, RIB, etc.).</li></ul>
      <h3>2. Session d'accueil</h3>
      <ul><li>Présentation de l'organisme, des valeurs et des objectifs.</li><li>Introduction aux outils et ressources pédagogiques disponibles.</li><li>Explication des procédures internes (planification, évaluations, suivi des stagiaires).</li></ul>
      <h3>3. Accompagnement initial</h3>
      <ul><li>Formation aux spécificités des programmes dispensés.</li><li>Mise à disposition d'un tuteur ou référent pour les premières semaines.</li></ul>
      <h3>4. Observation et évaluation initiales</h3>
      <ul><li>Participation à une ou plusieurs sessions de formation en tant qu'observateur.</li><li>Évaluation des premières prestations par un responsable pédagogique.</li></ul>
      <h3>5. Feedback et ajustements</h3>
      <ul><li>Entretien de retour d'expérience pour identifier les besoins en accompagnement.</li><li>Ajustement des méthodes et support si nécessaire.</li></ul>
      <h3>6. Intégration continue</h3>
      <ul><li>Participation aux réunions pédagogiques et aux formations continues.</li><li>Intégration dans les équipes de travail collaboratif.</li></ul>` },
    { heading: "Rôles et responsabilités", content: `
      <p><strong>1. Responsable de la formation :</strong></p>
      <ul><li>Supervise le recrutement et l'intégration.</li><li>Valide les candidatures finales.</li></ul>
      <p><strong>2. Coordinateur pédagogique :</strong></p>
      <ul><li>Organise les entretiens et sessions d'accueil.</li><li>Suivi et évaluation des formateurs pendant la période d'intégration.</li></ul>
      <p><strong>3. Formateurs référents :</strong></p>
      <ul><li>Accompagnent les nouveaux formateurs durant leurs premières interventions.</li></ul>`, variant: "green" },
  ] });
}

// ===== IND 22 — PLAN DE DÉVELOPPEMENT DES COMPÉTENCES (Excel) =====

export interface PlanDevTraining {
  origine: string;
  nom: string;
  objectif: string;
  type: string;
  formateur: string;
  nb: string;
  noms: string;
  duree: string;
  dateInscription?: string;
  dateDebut?: string;
}

/** Action du plan : un besoin identifié → une action → un critère d'efficacité. */
export interface PlanDevAction {
  ref: string;
  famille: "metier" | "pedagogie" | "qualite" | "reglementaire" | "handicap" | "numerique" | "specifique";
  besoin: string;         // besoin identifié et sa source
  indicateurs: string;    // indicateurs Qualiopi concernés
  nom: string;
  objectif: string;
  beneficiaires: string;
  modalite: string;       // interne / externe, présentiel / distanciel
  prestataire: string;
  duree: string;
  periode: string;
  financement: string;
  priorite: "Haute" | "Moyenne" | "Normale";
  efficacite: string;     // critère d'évaluation de l'efficacité
}

type Metier = { origine: string; nom: string; objectif: string; type: string; formateur: string; duree: string };

/** Formations « métier » adaptées au domaine de la formation dispensée. */
function formationsMetier(f: FormationInfo): Metier[] {
  const t = (f.intitule || "").toLowerCase();
  const code = (f.codeRNCP || "").toLowerCase();
  const isECSR = t.includes("conduite") || t.includes("ecsr") || t.includes("enseignant de la conduite") || code.includes("35329");
  const isMassage = !isECSR && (t.includes("massage") || t.includes("prénatal") || t.includes("prenatal"));
  const isEsth = !isECSR && (t.includes("esthétique") || t.includes("cosmétique") || t.includes("beauté") || t.includes("parfumerie"));
  const isAnglaisA1 = (t.includes("anglais") && (t.includes("a1") || t.includes("débutant") || t.includes("debutant")));
  const isAnglais = !isAnglaisA1 && (t.includes("anglais") || t.includes("toeic") || t.includes("vtest") || t.includes("v-test") || t.includes("rs6905"));
  const isIA = t.includes("intelligence artificielle") || mot(t, "ia") || t.includes("chatgpt") || t.includes("prompt");
  const isCRM = mot(t, "crm") || t.includes("hubspot") || t.includes("automation");
  const isNTC = t.includes("négociateur") || t.includes("technico-commercial");
  const isCommercial = !isNTC && (t.includes("commercial") || t.includes("vente") || t.includes("prospection") || t.includes("relation client"));
  const isSAMA = t.includes("secrétaire assistant") || t.includes("médico");
  const isWebmark = t.includes("webmarketing") || t.includes("marketing de contenus") || t.includes("réseaux sociaux") || t.includes("marketing digital");
  const isFLE = t.includes("français") || mot(t, "fle");
  const isManagement = t.includes("management") || t.includes("encadrement") || t.includes("leadership") || t.includes("manager");
  const isWord = mot(t, "word") || t.includes("bureautique");
  const E = "Externe";
  if (isECSR) return [
    { origine: "Montée en compétences pédagogiques conduite", nom: "Perfectionnement à la pédagogie de la conduite et de la sécurité routière", objectif: "Approfondir la conduite commentée, la gestion du stress de l'élève et l'éco-conduite", type: E, formateur: "Organisme de formation continue des enseignants de la conduite", duree: "3 jours" },
    { origine: "Veille réglementaire sécurité routière", nom: "Évolutions du Code de la route et de l'examen du permis de conduire", objectif: "Intégrer les dernières évolutions réglementaires dans les contenus de formation", type: E, formateur: "Délégation à la sécurité routière / organisme agréé", duree: "1 jour" },
    { origine: "Innovation pédagogique conduite", nom: "Simulateurs de conduite et outils numériques de suivi pédagogique", objectif: "Utiliser simulateurs, e-learning code et livret numérique d'apprentissage", type: E, formateur: "Éditeur de solutions pédagogiques conduite", duree: "2 jours" },
  ];
  if (isAnglaisA1) return [
    { origine: "Pédagogie des grands débutants", nom: "Enseigner l'anglais niveau A1 – approches ludiques et CECRL", objectif: "Maîtriser les techniques de mise en confiance, supports visuels et répétition espacée", type: E, formateur: "Organisme de formation de formateurs en langues", duree: "2 jours" },
    { origine: "Veille pédagogique langues", nom: "Outils numériques pour l'apprentissage des langues (niveau débutant)", objectif: "Intégrer applications et plateformes d'exercices interactifs adaptées au A1", type: E, formateur: "Organisme de formation au numérique éducatif", duree: "1 jour" },
    { origine: "Phonétique", nom: "Phonétique anglaise et prononciation pour francophones", objectif: "Utiliser l'alphabet phonétique et la discrimination auditive au niveau A1", type: E, formateur: "Organisme de formation de formateurs en langues", duree: "2 jours" },
  ];
  if (isAnglais) return [
    { origine: "Préparation aux certifications", nom: "Anglais professionnel : méthodologie de préparation aux certifications", objectif: "Maîtriser les formats d'épreuves et l'évaluation des 4 compétences", type: E, formateur: "Organisme de formation de formateurs en langues", duree: "3 jours" },
    { origine: "Veille pédagogique langues", nom: "Outils numériques et IA pour l'enseignement des langues", objectif: "Intégrer plateformes adaptatives et outils de reconnaissance vocale", type: E, formateur: "Organisme de formation au numérique éducatif", duree: "2 jours" },
    { origine: "Innovation pédagogique", nom: "Simulations professionnelles et apprentissage immersif en anglais", objectif: "Concevoir jeux de rôle, simulations de réunion et de négociation", type: E, formateur: "Organisme de formation de formateurs en langues", duree: "2 jours" },
  ];
  if (isMassage) return [
    { origine: "Montée en compétences bien-être", nom: "Aromathérapie : précautions pendant la grossesse et le post-partum", objectif: "Connaître les huiles compatibles, les protocoles et les contre-indications", type: E, formateur: "École ou fédération de massage bien-être", duree: "2 jours" },
    { origine: "Veille métier", nom: "Accompagnement périnatal et pratiques de relaxation", objectif: "Actualiser ses connaissances sur les pratiques de bien-être maternel", type: E, formateur: "Organisme de formation en périnatalité", duree: "2 jours" },
    { origine: "Approfondissement technique", nom: "Anatomie palpatoire et physiologie de la grossesse", objectif: "Approfondir l'anatomie du bassin et les adaptations corporelles", type: E, formateur: "École de massage", duree: "3 jours" },
  ];
  if (isEsth) return [
    { origine: "Montée en compétences esthétique", nom: "Techniques actuelles de soins du visage et cosmétologie", objectif: "Actualiser les protocoles de soins et la connaissance des actifs cosmétiques", type: E, formateur: "École d'esthétique / marque professionnelle", duree: "3 jours" },
    { origine: "Veille réglementaire cosmétiques", nom: "Règlement (CE) n° 1223/2009 et hygiène en institut", objectif: "Maîtriser étiquetage, traçabilité des produits et protocoles d'hygiène", type: E, formateur: "Organisme professionnel de la filière beauté", duree: "1 jour" },
    { origine: "Numérique métier", nom: "Outils numériques de l'institut : prise de rendez-vous et réseaux sociaux", objectif: "Intégrer les outils de gestion et de communication dans les contenus", type: E, formateur: "Organisme de formation au numérique", duree: "2 jours" },
  ];
  if (isManagement) return [
    { origine: "Montée en compétences managériales", nom: "Management d'équipe : approches actuelles et management hybride", objectif: "Actualiser les contenus : management situationnel, feedback, conflits", type: E, formateur: "Organisme de formation au management", duree: "3 jours" },
    { origine: "Veille RH", nom: "Qualité de vie et des conditions de travail (QVCT) et prévention des RPS", objectif: "Intégrer les obligations et outils QVCT dans les contenus managériaux", type: E, formateur: "Réseau ANACT-ARACT / organisme spécialisé", duree: "2 jours" },
    { origine: "Posture d'accompagnement", nom: "Coaching et co-développement : outils et postures", objectif: "Acquérir l'écoute active, le questionnement et l'animation de co-développement", type: E, formateur: "Organisme de formation au coaching", duree: "2 jours" },
  ];
  if (isCommercial || isNTC) return [
    { origine: "Montée en compétences commerciales", nom: isNTC ? "Négociation complexe et vente grands comptes" : "Techniques de vente et négociation commerciale avancée", objectif: "Actualiser vente consultative, traitement des objections et closing", type: E, formateur: "Organisme de formation commerciale", duree: "3 jours" },
    { origine: "Veille commerciale et digitale", nom: "Prospection digitale B2B et social selling", objectif: "Intégrer réseaux professionnels, CRM et séquences de prospection", type: E, formateur: "Organisme de formation commerciale", duree: "2 jours" },
    { origine: "Pratiques du secteur", nom: "Relation client omnicanale et expérience client", objectif: "Intégrer les attentes clients actuelles dans les mises en situation", type: E, formateur: "Organisme de formation commerciale", duree: "2 jours" },
  ];
  if (isIA) return [
    { origine: "Montée en compétences IA", nom: "IA générative avancée : conception de requêtes et usages professionnels", objectif: "Actualiser les techniques de requêtes, les limites et les usages métier", type: E, formateur: "Organisme de formation au numérique", duree: "3 jours" },
    { origine: "Veille réglementaire IA", nom: "Règlement européen sur l'IA (AI Act) et protection des données", objectif: "Intégrer les obligations et bonnes pratiques dans les contenus", type: E, formateur: "Organisme de formation juridique / CNIL", duree: "1 jour" },
    { origine: "Innovation pédagogique", nom: "Concevoir des formations avec l'IA", objectif: "Utiliser l'IA pour concevoir des supports et personnaliser les parcours", type: E, formateur: "Organisme de formation au numérique éducatif", duree: "2 jours" },
  ];
  if (isSAMA) return [
    { origine: "Montée en compétences secrétariat médical", nom: "Terminologie médicale et codification des actes", objectif: "Actualiser la terminologie par spécialité et la codification", type: E, formateur: "École de secrétariat médical", duree: "3 jours" },
    { origine: "Veille réglementaire santé", nom: "RGPD et dossier patient informatisé", objectif: "Maîtriser les obligations de confidentialité en santé", type: E, formateur: "Organisme de formation juridique / CNIL", duree: "1 jour" },
    { origine: "Numérique métier", nom: "Logiciels de gestion de cabinet et télétransmission", objectif: "Intégrer les outils utilisés en cabinet dans les exercices", type: E, formateur: "Organisme de formation au numérique", duree: "2 jours" },
  ];
  if (isWebmark) return [
    { origine: "Montée en compétences marketing digital", nom: "Stratégie de contenu et référencement naturel", objectif: "Actualiser SEO, stratégie éditoriale et mesure de performance", type: E, formateur: "Organisme de formation au marketing digital", duree: "3 jours" },
    { origine: "Veille réseaux sociaux", nom: "Vidéo courte et algorithmes des réseaux sociaux", objectif: "Intégrer les formats et pratiques actuels dans les contenus", type: E, formateur: "Organisme de formation au marketing digital", duree: "2 jours" },
    { origine: "Innovation", nom: "IA appliquée au marketing", objectif: "Utiliser l'IA pour la création de contenu et l'analyse de données", type: E, formateur: "Organisme de formation au numérique", duree: "2 jours" },
  ];
  if (isFLE) return [
    { origine: "Montée en compétences FLE", nom: "Didactique du FLE : approche actionnelle et CECRL", objectif: "Concevoir des tâches communicatives et évaluer selon le CECRL", type: E, formateur: "Organisme de formation de formateurs FLE", duree: "3 jours" },
    { origine: "Publics allophones", nom: "Interculturalité et accompagnement des publics migrants", objectif: "Adapter la pédagogie à l'hétérogénéité des publics", type: E, formateur: "Organisme de formation de formateurs FLE", duree: "2 jours" },
    { origine: "Numérique", nom: "Outils numériques pour l'enseignement du FLE", objectif: "Intégrer plateformes et ressources numériques", type: E, formateur: "Organisme de formation au numérique éducatif", duree: "2 jours" },
  ];
  if (isCRM) return [
    { origine: "Montée en compétences CRM", nom: "CRM avancé : automatisation et tableaux de bord", objectif: "Actualiser workflows, lead scoring et reporting", type: E, formateur: "Éditeur de CRM / organisme partenaire", duree: "2 jours" },
    { origine: "Veille technologique CRM", nom: "CRM et intelligence artificielle", objectif: "Comprendre scoring prédictif et assistants conversationnels", type: E, formateur: "Organisme de formation au numérique", duree: "2 jours" },
  ];
  if (isWord) return [
    { origine: "Montée en compétences bureautique", nom: "Suite bureautique : fonctions avancées et nouveautés (dont assistants IA)", objectif: "Actualiser la maîtrise des fonctions avancées et des nouveautés de la suite", type: E, formateur: "Organisme de formation bureautique", duree: "3 jours" },
    { origine: "Veille technologique", nom: "Assistants IA intégrés aux logiciels bureautiques", objectif: "Comprendre et enseigner leur usage responsable", type: E, formateur: "Organisme de formation au numérique", duree: "1 jour" },
  ];
  return [
    { origine: "Montée en compétences dans le secteur de la formation", nom: "Réglementation de la formation professionnelle", objectif: "Maîtriser le cadre juridique, les obligations déclaratives (BPF, NDA) et les droits des stagiaires", type: E, formateur: "Centre Inffo ou organisme spécialisé", duree: "2 jours" },
    { origine: `Actualisation des compétences techniques « ${f.intitule || "domaine de formation"} »`, nom: `Actualisation technique dans le domaine « ${f.intitule || "enseigné"} »`, objectif: "Maintenir une expertise technique à jour dans le domaine enseigné", type: E, formateur: "Organisme professionnel du secteur", duree: "2 jours" },
    { origine: "Innovation pédagogique", nom: "Intelligence artificielle appliquée à la formation", objectif: "Intégrer les outils d'IA dans l'ingénierie pédagogique et l'évaluation", type: E, formateur: "Organisme de formation au numérique éducatif", duree: "2 jours" },
  ];
}

function intervenantsDe(o: OrganismeInfo, f: FormationInfo, stagiaires?: StagiaireInfo[]): string[] {
  return Array.from(new Set([f.formateur, ...(stagiaires || []).map((s) => s.formateur), o.responsablePedagogique, o.dirigeant]
    .map((n) => String(n || "").trim()).filter((n) => n && !/externe/i.test(n))));
}

/** Actions du plan (données communes au tableau Excel et aux autres pièces IND 22). */
export function planDevActions(o: OrganismeInfo, f: FormationInfo, formateurs: FormateurInfo[], stagiaires?: StagiaireInfo[]): PlanDevAction[] {
  const types = o.typesActions || [];
  const isCFA = types.includes("apprentissage");
  const isVAE = types.includes("vae");
  const isBC = types.includes("bilans-competences");
  const intervenants = intervenantsDe(o, f, stagiaires);
  const formateursNoms = Array.from(new Set([f.formateur, ...(stagiaires || []).map((s) => s.formateur)].map((n) => String(n || "").trim()).filter(Boolean)));
  const tous = intervenants.join(", ") || o.dirigeant || "";
  const peda = (formateursNoms.join(", ") || tous);
  const distanciel = /distanciel|distance|visio|meet|zoom|mixte/i.test(`${f.modalites} ${f.lieu}`);
  const certifiante = /^(RS|RNCP)\d+$/i.test(String(f.codeRNCP || "").replace(/\s+/g, ""));
  const financement = "OPCO / fonds d'assurance formation selon le statut";
  const out: PlanDevAction[] = [];
  const add = (a: Omit<PlanDevAction, "ref">) => out.push({ ref: "", ...a });

  // 1. Compétences métier (IND 21-22 : expertise à jour dans le domaine enseigné)
  if (!isVAE && !isBC) {
    formationsMetier(f).forEach((m) => add({
      famille: "metier", besoin: `${m.origine} — issu de l'entretien professionnel et de la veille métier (IND 24)`, indicateurs: "21, 22, 24",
      nom: m.nom, objectif: m.objectif, beneficiaires: peda, modalite: `${m.type} — distanciel ou présentiel`, prestataire: m.formateur,
      duree: m.duree, periode: "", financement, priorite: "Moyenne", efficacite: "Mise à jour des supports et exercices ; évolution de la satisfaction sur les contenus (IND 30)",
    }));
  }
  // 2. Spécifique au type de prestation
  if (isVAE) {
    add({ famille: "specifique", besoin: "Réforme de la VAE (loi n° 2022-1598, décret n° 2023-1275) — veille réglementaire (IND 23)", indicateurs: "10, 21, 22, 23", nom: "Accompagner un parcours VAE depuis la réforme : France VAE, dossier de faisabilité et dossier de validation", objectif: "Maîtriser le nouveau parcours, la plateforme vae.gouv.fr et le rôle d'accompagnateur", beneficiaires: tous, modalite: "Externe — distanciel", prestataire: "Organisme de professionnalisation des acteurs de la VAE", duree: "2 jours", periode: "", financement, priorite: "Haute", efficacite: "Procédures VAE mises à jour ; taux de dossiers de faisabilité recevables" });
    add({ famille: "specifique", besoin: "Accompagnement à l'écrit réflexif — retours des candidats (IND 30)", indicateurs: "10, 11, 22", nom: "Méthodes d'accompagnement à l'écriture du dossier de validation et à l'entretien avec le jury", objectif: "Aider le candidat à décrire ses activités (contexte, actions, résultats) sans rédiger à sa place", beneficiaires: tous, modalite: "Externe — distanciel", prestataire: "Organisme de formation des accompagnateurs VAE", duree: "2 jours", periode: "", financement, priorite: "Moyenne", efficacite: "Taux de validation totale ; satisfaction des candidats sur l'accompagnement" });
  }
  if (isBC) {
    add({ famille: "specifique", besoin: "Qualité de l'accompagnement — obligation de supervision de la pratique", indicateurs: "21, 22", nom: "Analyse de pratiques / supervision des consultants en bilan de compétences", objectif: "Prendre du recul sur les situations d'accompagnement et sécuriser la posture déontologique", beneficiaires: tous, modalite: "Externe — séances trimestrielles", prestataire: "Superviseur ou psychologue du travail", duree: "4 × 2 heures", periode: "", financement, priorite: "Haute", efficacite: "Comptes rendus de supervision ; satisfaction des bénéficiaires" });
    add({ famille: "specifique", besoin: "Outils d'investigation utilisés en phase 2 (R.6313-4)", indicateurs: "17, 21, 22", nom: "Habilitation / actualisation aux outils d'évaluation des intérêts, de la personnalité et des compétences", objectif: "Utiliser et restituer les outils d'investigation dans le respect de leurs conditions d'usage", beneficiaires: tous, modalite: "Externe", prestataire: "Éditeur de tests / organisme habilité", duree: "2 jours", periode: "", financement, priorite: "Moyenne", efficacite: "Attestation d'habilitation ; qualité des synthèses" });
    add({ famille: "specifique", besoin: "Veille emploi et métiers pour les projets des bénéficiaires (IND 24)", indicateurs: "22, 24", nom: "Marché du travail, métiers en tension et dispositifs de reconversion", objectif: "Actualiser la connaissance des métiers et des dispositifs (CPF, PTP, VAE)", beneficiaires: tous, modalite: "Autoformation — webinaires de sources officielles", prestataire: "France Travail, ONISEP, Carif-Oref", duree: "1 jour", periode: "", financement: "Sans coût (ressources publiques)", priorite: "Normale", efficacite: "Fiches de veille exploitées dans les bilans" });
  }
  if (isCFA) {
    add({ famille: "specifique", besoin: "Missions des CFA (art. L.6231-2) et coordination centre / entreprise (IND 13)", indicateurs: "13, 20, 22", nom: "Pédagogie de l'alternance et coordination avec les maîtres d'apprentissage", objectif: "Articuler missions en entreprise et blocs de compétences, conduire les visites de suivi", beneficiaires: tous, modalite: "Externe", prestataire: "Réseau des CFA / organisme spécialisé", duree: "2 jours", periode: "", financement, priorite: "Haute", efficacite: "Visites réalisées / prévues ; grille de coordination renseignée" });
    add({ famille: "specifique", besoin: "Décret n° 2026-728 : traitement sans délai des ruptures, violences et discriminations (IND 14, 15)", indicateurs: "14, 15, 22", nom: "Prévenir et traiter les violences, le harcèlement et les discriminations envers les apprentis", objectif: "Repérer, recueillir un signalement, orienter vers les interlocuteurs et le médiateur de l'apprentissage", beneficiaires: tous, modalite: "Externe — distanciel", prestataire: "Organisme spécialisé en prévention des violences", duree: "1 jour", periode: "", financement, priorite: "Haute", efficacite: "Procédure appliquée ; délai de prise en charge des situations signalées" });
    add({ famille: "specifique", besoin: "Mobilité nationale et internationale des apprentis (IND 20)", indicateurs: "20, 22", nom: "Monter un projet de mobilité Erasmus+ pour des apprentis", objectif: "Connaître les financements, conventions et accompagnements possibles", beneficiaires: o.referentMobilite || tous, modalite: "Externe — webinaire", prestataire: "Agence Erasmus+ France Éducation Formation", duree: "0,5 jour", periode: "", financement: "Sans coût (webinaire institutionnel)", priorite: "Normale", efficacite: "Nombre de projets de mobilité étudiés / engagés" });
  }
  // 3. Pédagogie
  if (!isBC) add({ famille: "pedagogie", besoin: "Évaluations des stagiaires et observation des séances (IND 11, 30)", indicateurs: "6, 10, 11, 22", nom: isVAE ? "Techniques d'entretien d'explicitation" : "Concevoir et animer des formations pour adultes ; construire des évaluations", objectif: isVAE ? "Faire expliciter l'expérience du candidat avec précision" : "Varier les méthodes actives, individualiser, construire des évaluations critériées avec corrigés", beneficiaires: peda, modalite: "Externe", prestataire: "Organisme de formation de formateurs", duree: "3 jours", periode: "", financement, priorite: "Moyenne", efficacite: "Grille d'observation de séance ; progression positionnement entrée / sortie" });
  if (distanciel) add({ famille: "numerique", besoin: "Prestations à distance (art. D.6313-3-1) — assistance technique et pédagogique (IND 17, 19)", indicateurs: "17, 19, 22, 25", nom: "Animer une classe virtuelle et rendre les supports accessibles (RGAA)", objectif: "Maîtriser l'animation à distance, l'engagement des participants et l'accessibilité numérique", beneficiaires: peda, modalite: "Externe — distanciel", prestataire: "Organisme de formation au numérique éducatif", duree: "1 jour", periode: "", financement, priorite: "Moyenne", efficacite: "Taux d'assiduité en distanciel ; incidents techniques par session" });
  // 4. Certification (IND 7 et 16)
  if (certifiante && !isBC) add({ famille: "specifique", besoin: `Exigences de la certification ${f.codeRNCP} — référentiel d'évaluation du certificateur (IND 7, 16)`, indicateurs: "7, 16, 22", nom: `Référentiel d'évaluation et modalités d'épreuves de la certification ${f.codeRNCP}`, objectif: "Aligner les évaluations formatives sur les épreuves et respecter les exigences formelles du certificateur", beneficiaires: peda, modalite: "Externe ou réunion d'information du certificateur", prestataire: "Certificateur de la fiche (voir fiche France Compétences)", duree: "0,5 jour", periode: "", financement: "Selon le certificateur", priorite: "Haute", efficacite: "Tableau croisé à jour ; taux de réussite à la certification" });
  // 5. Handicap (IND 26)
  add({ famille: "handicap", besoin: "Accueil des personnes en situation de handicap — référent handicap (IND 26)", indicateurs: "26, 22", nom: "Référent handicap : accueil, compensation et mobilisation du réseau", objectif: "Identifier les besoins de compensation, mobiliser les partenaires (Agefiph, Cap emploi, MDPH) et adapter la prestation", beneficiaires: o.referentHandicap || o.dirigeant || tous, modalite: "Externe — distanciel", prestataire: "Ressource Handicap Formation (RHF) de la région / Agefiph", duree: "1 jour", periode: "", financement: "Sans coût ou OPCO selon l'offre régionale", priorite: "Haute", efficacite: "Demandes d'aménagement traitées sous 8 jours" });
  // 6. Qualité et réglementation (IND 23, 27, 32)
  add({ famille: "reglementaire", besoin: "Veille réglementaire : décret n° 2026-728 du 1er août 2026, en vigueur le 1er novembre 2026 (IND 23)", indicateurs: "23, 27, 32, 33", nom: "Référentiel national qualité 2026 : indicateurs 27, 32 et 33", objectif: "Intégrer la traçabilité sous-traitance / portage, l'analyse des risques qualité et, pour un CFA, l'évaluation des enseignements", beneficiaires: tous, modalite: "Autoformation (texte du décret, guide de lecture) + réunion interne", prestataire: /externe/i.test(o.referentQualite || "") ? `Référent qualité externe — ${(o.referentQualite || "").replace(/\s*\(\s*externe\s*\)\s*/i, "")}` : `Interne — ${o.referentQualite || o.dirigeant}`, duree: "0,5 jour", periode: "", financement: "Sans coût", priorite: "Haute", efficacite: "Registre IND 27 et analyse des risques IND 32 à jour" });
  // 7. Gestion du centre et automatisation (IZIBUSINESS — Nadine DENDANI), attestations jointes.
  const dirigeantOuTous = o.dirigeant || tous;
  add({ famille: "qualite", besoin: "Pilotage administratif, financier et réglementaire de l'organisme (IND 22, 32)", indicateurs: "22, 32", nom: "Gérer son centre de formation", objectif: "Piloter l'organisme : NDA, BPF, Qualiopi, financements OPCO / CPF, indicateurs", beneficiaires: dirigeantOuTous, modalite: "Externe — présentiel", prestataire: "IZIBUSINESS — Nadine DENDANI", duree: "2 jours (14 heures)", periode: "", financement, priorite: "Haute", efficacite: "Attestation de fin de formation IZIBUSINESS jointe ; BPF et indicateurs à jour" });
  add({ famille: "numerique", besoin: "Automatisation du suivi administratif des stagiaires (IND 22, 32)", indicateurs: "22, 32", nom: "Automatiser la gestion de son centre avec Make et Airtable", objectif: "Structurer une base Airtable et automatiser convocations, relances et suivi avec Make", beneficiaires: dirigeantOuTous, modalite: "Externe — présentiel", prestataire: "IZIBUSINESS — Nadine DENDANI", duree: "2 jours (14 heures)", periode: "", financement, priorite: "Haute", efficacite: "Attestation de fin de formation IZIBUSINESS jointe ; scénarios Make en production" });
  add({ famille: "qualite", besoin: "Démarche d'amélioration continue et préparation de l'audit (IND 30 à 32)", indicateurs: "30, 31, 32", nom: "Piloter la démarche qualité : appréciations, réclamations, analyse des risques", objectif: "Exploiter les appréciations et réclamations et suivre le plan d'amélioration", beneficiaires: tous, modalite: "Interne — revue qualité", prestataire: /externe/i.test(o.referentQualite || "") ? `Référent qualité externe — ${(o.referentQualite || "").replace(/\s*\(\s*externe\s*\)\s*/i, "")}` : `Interne — ${o.referentQualite || o.dirigeant}`, duree: "0,5 jour par semestre", periode: "", financement: "Sans coût", priorite: "Moyenne", efficacite: "Actions d'amélioration closes dans les délais" });

  // Références et périodes : répartition sur l'année du plan, priorités en premier.
  const ordre = { Haute: 0, Moyenne: 1, Normale: 2 } as const;
  out.sort((a, b) => ordre[a.priorite] - ordre[b.priorite]);
  const maj = (o.dateMaj || "").trim();
  const an = maj ? Number(maj.slice(0, 4)) : new Date().getFullYear();
  const moisDebut = maj ? Number(maj.slice(5, 7)) : 1;
  out.forEach((a, i) => {
    a.ref = `PDC-${String(i + 1).padStart(2, "0")}`;
    const trimIdx = Math.floor((moisDebut - 1) / 3) + Math.floor(i / 2);
    a.periode = `T${(trimIdx % 4) + 1} ${an + Math.floor(trimIdx / 4)}`;
  });
  void formateurs;
  return out;
}

/** Liste simplifiée (compatibilité avec les pièces qui lisent le plan). */
export function getPlanDevTrainings(f: FormationInfo, formateurs: FormateurInfo[]): PlanDevTraining[] {
  return planDevActions({ nom: "", dirigeant: f.formateur || "" } as OrganismeInfo, f, formateurs, []).map((a) => ({
    origine: a.besoin, nom: a.nom, objectif: a.objectif, type: a.modalite.split(" — ")[0], formateur: a.prestataire,
    nb: String(a.beneficiaires.split(",").filter(Boolean).length || 1), noms: a.beneficiaires, duree: a.duree, dateDebut: a.periode,
  }));
}

export function genPlanDevCompetencesExcel(o: OrganismeInfo, f: FormationInfo, formateurs: FormateurInfo[], stagiaires?: StagiaireInfo[]): string {
  const actions = planDevActions(o, f, formateurs, stagiaires);
  const intervenants = intervenantsDe(o, f, stagiaires);
  const maj = (o.dateMaj || "").trim();
  const dateEtab = maj ? formatDate(maj) : formatDate(new Date().toISOString().slice(0, 10));
  const an = maj ? Number(maj.slice(0, 4)) : new Date().getFullYear();
  const initial = typeAuditEffectif(o) === "initial";
  const statut = initial
    ? "Prévue — attestation à joindre après réalisation"
    : "Voir bilan de réalisation (IND 22) : réalisée avec attestation ou reportée avec motif";
  const C = 12;
  const sec = (t: string) => `<tr><th colspan="${C}" style="background:#2d5aa0">${t}</th></tr>`;
  const ligne = (label: string, val: string) => `<tr><td><strong>${label}</strong></td><td colspan="${C - 1}">${val}</td></tr>`;
  let h = `<tr><th colspan="${C}">${o.nom} – PLAN DE DÉVELOPPEMENT DES COMPÉTENCES ${an} – ${an + 1}</th></tr>`;
  h += ligne("Établi le", `${dateEtab} (V${o.version || "1"}) par ${o.responsablePedagogique || o.dirigeant} — validé par ${o.dirigeant}`);
  h += ligne("Périmètre", `Ensemble des personnes intervenant dans les prestations : ${intervenants.join(", ") || o.dirigeant}${/externe/i.test(o.referentQualite || "") ? ` ; accompagnement qualité externe : ${o.referentQualite}` : ""}. Les intervenants sous-traitants ou en portage salarial transmettent leurs attestations de formation (IND 27).`);
  h += ligne("Référence", "Indicateur 22 du référentiel national qualité (décret n° 2026-728) : « Le prestataire entretient et développe les compétences de ses salariés, adaptées aux prestations qu'il délivre. » Un indépendant démontre sa propre démarche de formation continue.");
  h += ligne("Financement", "OPCO de branche pour les salariés ; fonds d'assurance formation selon le statut pour le dirigeant non salarié (à confirmer à la demande de prise en charge) ; ressources gratuites institutionnelles lorsque c'est indiqué.");
  h += ligne("Situation d'audit", initial ? "Nouvel entrant : plan prévisionnel ; sa mise en œuvre sera vérifiée à l'audit de surveillance." : "Surveillance / renouvellement : la réalisation de chaque action est tracée dans le bilan de réalisation du plan (IND 22).");

  h += sec("1. RECENSEMENT DES BESOINS DE COMPÉTENCES");
  h += `<tr><th>Source</th><th colspan="5">Ce qui est analysé</th><th colspan="6">Besoins identifiés</th></tr>`;
  const sources: [string, string, string][] = [
    ["Entretien professionnel annuel", "Parcours, compétences, souhaits d'évolution de chaque intervenant", "Actualisation technique dans le domaine enseigné ; développement pédagogique"],
    ["Appréciations des bénéficiaires (IND 30)", "Commentaires sur les contenus, l'animation et les supports", "Méthodes actives, individualisation, qualité des supports"],
    ["Veilles légale, métiers et innovations (IND 23 à 25)", "Évolutions réglementaires, du métier et des outils", "Référentiel 2026, évolutions du métier, outils numériques"],
    ["Analyse des risques qualité (IND 32)", "Risques « compétence insuffisante ou non actualisée d'un intervenant »", "Plan de formation continue annuel pour chaque intervenant"],
    ["Handicap (IND 26)", "Demandes d'aménagement reçues et réseau mobilisé", "Formation du référent handicap"],
  ];
  if (/^(RS|RNCP)\d+$/i.test(String(f.codeRNCP || "").replace(/\s+/g, ""))) sources.push(["Certification visée (IND 7, 16)", `Évolutions de la fiche ${f.codeRNCP} et exigences du certificateur`, "Maîtrise du référentiel d'évaluation"]);
  sources.forEach(([a, b, c]) => { h += `<tr><td>${a}</td><td colspan="5">${b}</td><td colspan="6">${c}</td></tr>`; });

  h += sec("2. ACTIONS DE DÉVELOPPEMENT DES COMPÉTENCES");
  h += `<tr><th>Réf.</th><th>Besoin identifié (source)</th><th>Action</th><th>Objectifs attendus</th><th>Bénéficiaire(s)</th><th>Modalité</th><th>Prestataire / animateur</th><th>Durée</th><th>Période</th><th>Financement</th><th>Critère d'efficacité</th><th>Statut</th></tr>`;
  actions.forEach((a) => {
    h += `<tr><td>${a.ref}</td><td>${a.besoin}</td><td>${a.nom}</td><td>${a.objectif}</td><td>${a.beneficiaires}</td><td>${a.modalite}</td><td>${a.prestataire}</td><td>${a.duree}</td><td>${a.periode}</td><td>${a.financement}</td><td>${a.efficacite}</td><td>${a.priorite === "Haute" ? "Prioritaire — " : ""}${statut}</td></tr>`;
  });

  h += sec("3. AUTRES LEVIERS DE PROFESSIONNALISATION");
  h += `<tr><th>Levier</th><th colspan="5">Modalités</th><th colspan="3">Fréquence</th><th colspan="3">Trace conservée</th></tr>`;
  const leviers: [string, string, string, string][] = [
    ["Réunions pédagogiques", "Retour sur les sessions, partage des difficultés, mise à jour des supports", "Mensuelle ou après chaque session", "Compte rendu (IND 18)"],
    ["Analyse de pratiques", "Étude de situations vécues avec les stagiaires, recherche de solutions", "Trimestrielle", "Fiche de synthèse"],
    ["Autoformation et veille", "Lecture des sources de veille, webinaires institutionnels (Centre Inffo, France Compétences, Carif-Oref)", "Continue", "Registre de veille (IND 23 à 25)"],
    ["Réseaux professionnels", "Participation aux réseaux régionaux de la formation et de la branche", "Au moins 2 fois par an", "Invitations, comptes rendus"],
    ["Entretien professionnel", "Bilan des compétences, besoins et projet de chaque intervenant", "Annuel (et bilan à 6 ans pour les salariés)", "Fiche d'entretien signée"],
  ];
  leviers.forEach(([a, b, c, d]) => { h += `<tr><td>${a}</td><td colspan="5">${b}</td><td colspan="3">${c}</td><td colspan="3">${d}</td></tr>`; });

  h += sec("4. ÉVALUATION DE L'EFFICACITÉ DU PLAN");
  h += `<tr><th>Niveau</th><th colspan="5">Méthode</th><th colspan="3">Moment</th><th colspan="3">Responsable</th></tr>`;
  const eff: [string, string, string, string][] = [
    ["Satisfaction", "Évaluation à chaud de chaque action suivie par l'intervenant", "Fin de l'action", o.responsablePedagogique || o.dirigeant],
    ["Acquis", "Attestation de fin de formation / certificat de réalisation joint au dossier", "Fin de l'action", o.responsablePedagogique || o.dirigeant],
    ["Transfert", "Mise à jour constatée des supports, exercices et procédures", "Dans les 3 mois", o.responsablePedagogique || o.dirigeant],
    ["Impact", "Évolution des appréciations des stagiaires sur les contenus et l'animation (IND 30) et des taux de réussite (IND 2, 3)", "Revue annuelle", o.dirigeant],
  ];
  eff.forEach(([a, b, c, d]) => { h += `<tr><td>${a}</td><td colspan="5">${b}</td><td colspan="3">${c}</td><td colspan="3">${d}</td></tr>`; });
  h += ligne("Révision", `Plan revu chaque année après les entretiens professionnels et la revue qualité, et à chaque arrivée d'un nouvel intervenant. Prochaine révision : au plus tard le ${formatDate(`${an + 1}${maj ? maj.slice(4) : "-01-01"}`)}.`);

  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Plan Dev Compétences</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
<style>
  table { border-collapse: collapse; font-family: Calibri, Arial, sans-serif; font-size: 11pt; }
  th { background-color: #1e3a7b; color: white; padding: 8px 12px; text-align: left; font-weight: bold; border: 1px solid #1e3a7b; }
  td { padding: 6px 10px; border: 1px solid #d0d0d0; vertical-align: top; }
  tr:nth-child(even) { background-color: #f2f6fc; }
</style>
</head><body><table>${h}</table></body></html>`;
}
