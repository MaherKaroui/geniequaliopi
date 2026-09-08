// Critère 5 — IND 21 & IND 22 generators (based on real SELECT FORMATION documents)
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate } from "./docBuilder";
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
  return buildDocument({ org: o, title: "FICHE DE POSTE", subtitle: "Référent Qualité Externe – Nadine DENDANI", sections: [
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong></p>` },
    { heading: "Identité du référent qualité externe", content: `<p><strong>Madame Nadine DENDANI</strong></p><p>Consultante indépendante – Référente Qualité externe mandatée par l'organisme de formation pour le pilotage et le suivi de la démarche qualité Qualiopi.</p>` },
    { heading: "Lieu d'intervention", content: `<p>La mission est réalisée principalement à distance, avec des interventions ponctuelles en présentiel au sein des locaux de l'organisme situés au :</p><p>${o.adresse}, ${o.codePostal} ${o.ville}.</p><p>Des échanges réguliers (visioconférence, téléphone, messagerie) sont organisés avec la direction et l'équipe pédagogique.</p>` },
    { heading: "Type de contrat", content: `<p>Prestataire externe spécialisée, dans le cadre d'un contrat de prestation de services pour l'accompagnement et le pilotage de la démarche qualité Qualiopi.</p><p>Les modalités contractuelles sont établies dans le respect du cadre réglementaire de la formation professionnelle continue et des exigences du Référentiel National Qualité (Qualiopi).</p>` },
    { heading: "Finalité du poste", content: `<p>La Référente Qualité externe est garante de la conformité de l'organisme aux exigences du Référentiel National Qualité (Qualiopi) et au Décret Qualité du 30 juin 2015.</p><p>Elle accompagne la direction dans la mise en œuvre, le suivi et l'amélioration continue du système de management de la qualité, et prépare l'organisme aux audits initiaux, de surveillance et de renouvellement.</p>` },
    { heading: "Missions principales", content: `<ul><li>Concevoir, déployer et faire vivre le système qualité de l'organisme</li><li>Garantir la conformité aux 7 critères et 32 indicateurs du Référentiel National Qualité</li><li>Réaliser des audits internes réguliers et formaliser des plans d'actions correctives</li><li>Préparer et accompagner les audits Qualiopi (initial, surveillance, renouvellement)</li><li>Accompagner la direction lors des audits externes et lever les non-conformités</li><li>Mettre à jour les procédures, processus, modes opératoires et documents qualité</li><li>Former et sensibiliser l'équipe pédagogique et administrative aux exigences Qualiopi</li><li>Analyser les indicateurs qualité (satisfaction, abandons, réclamations, résultats)</li><li>Piloter la veille légale, réglementaire et qualité de la formation professionnelle</li><li>Suivre et exploiter les enquêtes de satisfaction à chaud et à froid</li><li>Gérer le traitement des réclamations et des actions correctives</li><li>Animer la revue de direction annuelle et formaliser le plan d'amélioration continue</li><li>Conseiller la direction sur les évolutions réglementaires et leurs impacts</li></ul>` },
    { heading: "Savoir-faire (compétences techniques)", content: `<ul><li>Maîtrise approfondie du Référentiel National Qualité (Qualiopi) et de ses 32 indicateurs</li><li>Connaissance complète du cadre réglementaire de la formation professionnelle continue</li><li>Conduite d'audits internes et préparation aux audits externes</li><li>Rédaction de procédures, processus et documents qualité</li><li>Analyse de données qualité et construction d'indicateurs de pilotage</li><li>Animation de revues de direction et de revues de processus</li><li>Maîtrise des outils bureautiques et de gestion documentaire</li><li>Pédagogie et transmission auprès des équipes</li></ul>` },
    { heading: "Savoir-être (compétences comportementales)", content: `<ul><li>Rigueur, méthode et sens du détail</li><li>Sens de l'écoute et capacité d'analyse</li><li>Diplomatie et capacité à fédérer autour de la démarche qualité</li><li>Autonomie et sens de l'initiative</li><li>Confidentialité et discrétion professionnelle</li><li>Capacité à travailler à distance et en mode projet</li><li>Esprit pédagogique et bienveillant</li><li>Force de proposition dans l'amélioration continue</li></ul>` },
    { heading: "Profil requis", content: `<ul><li>Expérience confirmée dans le pilotage de la démarche qualité en organisme de formation</li><li>Maîtrise approfondie du Référentiel National Qualité (Qualiopi)</li><li>Expérience de plusieurs audits Qualiopi (initial, surveillance, renouvellement)</li><li>Bonne connaissance du secteur de la formation professionnelle continue, de l'apprentissage et des financeurs (OPCO, CPF, France Travail)</li><li>Expérience en accompagnement et conseil auprès d'organismes de formation</li></ul>` },
    { heading: "Moyens et ressources mis à disposition", content: `<ul><li>Accès aux procédures internes, documents qualité et outils de pilotage</li><li>Accès aux plateformes utilisées par l'organisme (LMS, EDOF, dossiers stagiaires)</li><li>Appui de la direction et de l'équipe pédagogique</li><li>Documentation réglementaire et veille qualité</li></ul>`, variant: "green" },
    { heading: "Indicateurs de performance", content: `<ul><li>Conformité aux 32 indicateurs Qualiopi</li><li>Résultats des audits internes et externes (nombre de non-conformités levées)</li><li>Délai de mise en œuvre des actions correctives</li><li>Taux de satisfaction des bénéficiaires</li><li>Mise à jour effective de la veille légale et réglementaire</li><li>Tenue de la revue de direction annuelle</li></ul>` },
    { heading: "Positionnement", content: `<p>Madame Nadine DENDANI intervient en qualité de prestataire externe sous l'autorité fonctionnelle de la direction de ${o.nom}. Elle travaille en lien étroit avec le dirigeant, le responsable pédagogique, le référent administratif et le référent handicap.</p>` },
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

/** Returns the contextual training list used in the IND 22 PDC, filtered by formation type. */
export function getPlanDevTrainings(f: FormationInfo, formateurs: FormateurInfo[]): PlanDevTraining[] {
  const formateurName = f.formateur || (formateurs[0] ? formateurs[0].prenom + " " + formateurs[0].nom : "");
  // Re-use the same generator to keep a single source of truth, then parse out the planned training rows.
  const html = genPlanDevCompetencesExcel({ nom: "" } as OrganismeInfo, f, formateurs, []);
  // Columns: dateInsc, origine, nom, objectif, type, formateur, nb, noms, duree, dateDebut, annee
  const rowRegex = /<tr>\s*<td>([^<]*)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]*)<\/td>\s*<td>[^<]*<\/td>\s*<\/tr>/g;
  const trainings: PlanDevTraining[] = [];
  let match: RegExpExecArray | null;
  while ((match = rowRegex.exec(html)) !== null) {
    trainings.push({
      dateInscription: match[1].trim(),
      origine: match[2].trim(),
      nom: match[3].trim(),
      objectif: match[4].trim(),
      type: match[5].trim(),
      formateur: match[6].trim(),
      nb: match[7].trim(),
      noms: match[8].trim() || formateurName,
      duree: match[9].trim(),
      dateDebut: match[10].trim(),
    });
  }
  return trainings;
}

export function genPlanDevCompetencesExcel(o: OrganismeInfo, f: FormationInfo, formateurs: FormateurInfo[], stagiaires?: StagiaireInfo[]): string {
  // Use formation date year, fallback to current year
  const rawDate = f.dateDebut || f.dateFin || "";
  const parsedDate = rawDate ? new Date(rawDate + "T00:00:00") : null;
  const dateDebutFormation = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : new Date();
  const year = dateDebutFormation.getFullYear();
  const prevYear = year - 1;
  // Date d'inscription par défaut = 1 an avant le début de la formation
  const dateInscriptionDefault = new Date(dateDebutFormation);
  dateInscriptionDefault.setFullYear(dateInscriptionDefault.getFullYear() - 1);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const fmtDate = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  const dateInscriptionStr = fmtDate(dateInscriptionDefault);
  const dateDebutStr = fmtDate(dateDebutFormation);
  const formateurName = f.formateur || (formateurs[0] ? formateurs[0].prenom + " " + formateurs[0].nom : "");
  const stagiaireNames = stagiaires && stagiaires.length > 0
    ? stagiaires.filter(s => s.nom || s.prenom).map(s => `${s.prenom} ${s.nom}`.trim()).join(", ")
    : formateurName;
  const nbStagiaires = stagiaires ? stagiaires.filter(s => s.nom || s.prenom).length : 1;

  let html = `<tr><th colspan="11">${o.nom} – PLAN DE DÉVELOPPEMENT DES COMPÉTENCES</th></tr>`;
  html += `<tr><td><strong>Année :</strong></td><td colspan="10">${prevYear} – ${year}</td></tr>`;
  html += `<tr><td></td></tr>`;
  html += `<tr>
    <th>Date d'inscription</th>
    <th>Origine</th>
    <th>Nom de la formation</th>
    <th>Objectifs attendus</th>
    <th>Interne / Externe</th>
    <th>Formateur / Organisme</th>
    <th>Nb stagiaires</th>
    <th>Noms des stagiaires</th>
    <th>Durée</th>
    <th>Date de début</th>
    <th>Année</th>
  </tr>`;

  // ========== FORMATIONS PRÉVUES (année suivante) ==========

  const t = (f.intitule || "").toLowerCase();
  const code = (f.codeRNCP || "").toLowerCase();
  const isECSR = t.includes("conduite") || t.includes("ecsr") || t.includes("enseignant de la conduite") || code.includes("35329");
  const isMassage = !isECSR && (t.includes("massage") || t.includes("prénatal") || t.includes("prenatal"));
  const isEsth = !isECSR && (t.includes("esthétique") || t.includes("cosmétique") || t.includes("beauté") || t.includes("parfumerie"));
  const isAnglaisA1 = (t.includes("anglais") && (t.includes("a1") || t.includes("débutant") || t.includes("debutant")));
  const isAnglais = !isAnglaisA1 && (t.includes("anglais") || t.includes("toeic") || t.includes("vtest") || t.includes("v-test") || t.includes("rs6905"));
  const isIA = t.includes("intelligence artificielle") || t.includes(" ia ") || t.includes("chatgpt") || t.includes("prompt");
  const isCRM = t.includes("crm") || t.includes("hubspot") || t.includes("automation");
  const isNTC = t.includes("négociateur") || t.includes("technico-commercial");
  const isCommercial = !isNTC && (t.includes("commercial") || t.includes("vente") || t.includes("prospection") || t.includes("relation client"));
  const isSAMA = t.includes("secrétaire assistant") || t.includes("médico");
  const isWebmark = t.includes("webmarketing") || t.includes("marketing de contenus") || t.includes("réseaux sociaux") || t.includes("marketing digital");
  const isFLE = t.includes("français") || t.includes("fle");
  const isManagement = t.includes("management") || t.includes("encadrement") || t.includes("leadership") || t.includes("manager");
  const isWord = t.includes("word");

  const futureTrainings: Array<{ origine: string; nom: string; objectif: string; type: string; formateur: string; nb: string; noms: string; duree: string }> = [];

  if (isECSR) {
    futureTrainings.push(
      { origine: "Montée en compétences pédagogiques conduite", nom: "Perfectionnement à la pédagogie de la conduite et de la sécurité routière", objectif: "Approfondir les techniques pédagogiques d'enseignement de la conduite : gestion du stress, conduite commentée, éco-conduite et conduite en conditions difficiles", type: "Externe", formateur: "INSERR – Institut National de Sécurité Routière", nb: "1", noms: formateurName, duree: "3 jours" },
      { origine: "Veille réglementaire sécurité routière", nom: "Évolutions réglementaires du Code de la route et du permis de conduire", objectif: "Maîtriser les dernières modifications du Code de la route, les nouvelles sanctions et les évolutions du permis (permis numérique, réforme 2024)", type: "Externe", formateur: "Sécurité Routière – Formation continue", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique conduite", nom: "Simulateurs de conduite et outils numériques pour la formation ECSR", objectif: "Maîtriser l'utilisation des simulateurs de conduite, des applications e-learning et des outils de suivi pédagogique numérique", type: "Externe", formateur: "Codes Rousseau – Formation continue", nb: "1", noms: formateurName, duree: "2 jours" },
    );
  } else if (isAnglaisA1) {
    futureTrainings.push(
      { origine: "Montée en compétences du formateur en anglais débutant", nom: "Enseigner l'anglais aux grands débutants – Approches ludiques et CECRL A1", objectif: "Maîtriser les techniques d'enseignement pour un public débutant : supports visuels, répétition espacée, phonétique de base et mise en confiance", type: "Externe", formateur: "British Council – Teacher Development", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Veille pédagogique langues étrangères", nom: "Nouveaux outils numériques pour l'apprentissage des langues – Niveau débutant", objectif: "Découvrir et intégrer les applications adaptées au niveau A1 (Duolingo, Busuu, Memrise) et les plateformes d'exercices interactifs", type: "Externe", formateur: "Digiformag – Groupe Abilways", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique inclusive", nom: "Phonétique anglaise et prononciation pour francophones débutants", objectif: "Maîtriser l'alphabet phonétique international (IPA) appliqué à l'anglais, les paires minimales et les exercices de discrimination auditive pour le niveau A1", type: "Externe", formateur: "Alliance Française – Formation de formateurs en langues", nb: "1", noms: formateurName, duree: "2 jours" },
    );
  } else if (isAnglais) {
    futureTrainings.push(
      { origine: "Montée en compétences du formateur en anglais professionnel", nom: "Business English avancé – Préparation aux certifications (TOEIC, VTest, Linguaskill)", objectif: "Maîtriser les méthodologies de préparation aux certifications d'anglais professionnel et les techniques d'évaluation des 4 compétences (listening, reading, writing, speaking)", type: "Externe", formateur: "British Council – Teacher Development", nb: "1", noms: formateurName, duree: "3 jours" },
      { origine: "Veille pédagogique langues étrangères", nom: "Outils numériques et IA pour l'enseignement des langues", objectif: "Intégrer les plateformes adaptatives (Babbel, Busuu), les chatbots conversationnels et les outils de speech-to-text dans l'enseignement de l'anglais", type: "Externe", formateur: "Digiformag – Groupe Abilways", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique", nom: "Gamification et apprentissage immersif de l'anglais", objectif: "Créer des scénarios d'apprentissage immersifs : jeux de rôle professionnels, simulations de réunions, négociations en anglais", type: "Externe", formateur: "Cambridge English – Formation de formateurs", nb: "1", noms: formateurName, duree: "2 jours" },
    );
  } else if (isMassage) {
    futureTrainings.push(
      { origine: "Montée en compétences massage et bien-être", nom: "Aromathérapie et huiles essentielles pour la grossesse et le post-partum", objectif: "Maîtriser les huiles essentielles compatibles avec la grossesse, les protocoles d'application et les contre-indications spécifiques", type: "Externe", formateur: "FFMBE – Fédération Française de Massage Bien-Être", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Veille métier bien-être prénatal", nom: "Accompagnement périnatal et nouvelles pratiques de relaxation", objectif: "Découvrir les évolutions des pratiques de bien-être maternel : sophrologie prénatale, hypnose, réflexologie plantaire adaptée", type: "Externe", formateur: "Institut de Formation en Périnatalité", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique", nom: "Anatomie palpatoire et physiologie de la grossesse – Approfondissement", objectif: "Approfondir les connaissances en anatomie du bassin, physiologie des fascias et adaptations corporelles pendant la grossesse", type: "Externe", formateur: "École de massage reconnue", nb: "1", noms: formateurName, duree: "3 jours" },
    );
  } else if (isEsth) {
    futureTrainings.push(
      { origine: "Montée en compétences esthétique", nom: "Techniques avancées en soins du visage et cosmétologie", objectif: "Maîtriser les dernières techniques de soins esthétiques : micro-needling, LED-thérapie, cosmétiques bio et personnalisés", type: "Externe", formateur: "École Internationale d'Esthétique", nb: "1", noms: formateurName, duree: "3 jours" },
      { origine: "Veille réglementaire cosmétiques", nom: "Réglementation cosmétique européenne et normes d'hygiène en institut", objectif: "Maîtriser le règlement CE 1223/2009, les obligations d'étiquetage, la traçabilité des produits et les protocoles d'hygiène", type: "Externe", formateur: "FEBEA – Fédération des Entreprises de la Beauté", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation numérique beauté", nom: "Digitalisation du secteur beauté et réseaux sociaux pour esthéticiennes", objectif: "Maîtriser Instagram, TikTok et les outils de prise de rendez-vous en ligne pour développer son activité", type: "Externe", formateur: "Digiformag – Groupe Abilways", nb: "1", noms: formateurName, duree: "2 jours" },
    );
  } else if (isManagement) {
    futureTrainings.push(
      { origine: "Montée en compétences managériales", nom: "Leadership et management d'équipe – Approches contemporaines", objectif: "Maîtriser le management situationnel, la gestion des conflits, le feedback constructif et le management hybride (présentiel/distanciel)", type: "Externe", formateur: "Groupe Cegos – Parcours Management", nb: "1", noms: formateurName, duree: "3 jours" },
      { origine: "Veille RH et management", nom: "Qualité de Vie et Conditions de Travail (QVCT) – Enjeux managériaux", objectif: "Comprendre les obligations légales QVCT, les outils de prévention des RPS et le rôle du manager dans le bien-être au travail", type: "Externe", formateur: "ANACT – Agence nationale pour l'amélioration des conditions de travail", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique", nom: "Coaching et accompagnement managérial – Outils et postures", objectif: "Acquérir les techniques de coaching pour accompagner les collaborateurs : écoute active, questionnement puissant, co-développement", type: "Externe", formateur: "Cnam – Conservatoire National des Arts et Métiers", nb: "1", noms: formateurName, duree: "2 jours" },
    );
  } else if (isCommercial) {
    futureTrainings.push(
      { origine: "Montée en compétences commerciales", nom: "Techniques de vente et négociation commerciale avancée", objectif: "Maîtriser les techniques de vente consultative, la gestion des objections, le closing et la fidélisation client", type: "Externe", formateur: "Halifax Consulting", nb: "1", noms: formateurName, duree: "3 jours" },
      { origine: "Veille commerciale et digitale", nom: "Social Selling et prospection digitale B2B", objectif: "Maîtriser LinkedIn Sales Navigator, l'inbound marketing et les outils de prospection automatisée (CRM, séquences email)", type: "Externe", formateur: "Groupe Cegos", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique", nom: "Concevoir et animer des formations pour adultes (andragogie)", objectif: "Renforcer les techniques d'animation, de gestion de groupe et de scénarisation pédagogique", type: "Externe", formateur: "Cnam – Conservatoire National des Arts et Métiers", nb: "1", noms: formateurName, duree: "3 jours" },
    );
  } else if (isIA) {
    futureTrainings.push(
      { origine: "Montée en compétences IA avancée", nom: "IA Générative avancée – Prompt engineering et fine-tuning", objectif: "Maîtriser les techniques avancées de prompt engineering, le fine-tuning de modèles et les RAG (Retrieval-Augmented Generation)", type: "Externe", formateur: "OpenClassrooms – Parcours IA", nb: "1", noms: formateurName, duree: "3 jours" },
      { origine: "Veille réglementaire IA", nom: "AI Act européen et éthique de l'IA – Cadre juridique", objectif: "Comprendre les obligations du règlement européen sur l'IA, les niveaux de risque et les bonnes pratiques éthiques", type: "Externe", formateur: "CNIL Formations", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique", nom: "Concevoir des formations avec l'IA (ChatGPT, Gemini, Midjourney)", objectif: "Utiliser l'IA pour créer des supports, évaluer les acquis et personnaliser les parcours de formation", type: "Externe", formateur: "Digiformag – Groupe Abilways", nb: "1", noms: formateurName, duree: "2 jours" },
    );
  } else if (isNTC) {
    futureTrainings.push(
      { origine: "Montée en compétences commerciales", nom: "Négociation complexe et vente stratégique grands comptes", objectif: "Maîtriser la vente consultative, la négociation multi-interlocuteurs et les techniques de closing avancées", type: "Externe", formateur: "Halifax Consulting", nb: "1", noms: formateurName, duree: "3 jours" },
      { origine: "Veille commerciale et digitale", nom: "Social Selling et prospection digitale B2B", objectif: "Maîtriser LinkedIn Sales Navigator, l'inbound marketing et les outils de prospection automatisée", type: "Externe", formateur: "Groupe Cegos", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique", nom: "Concevoir et animer des formations pour adultes (andragogie)", objectif: "Renforcer les techniques d'animation, de gestion de groupe et de scénarisation pédagogique", type: "Externe", formateur: "Cnam – Conservatoire National des Arts et Métiers", nb: "1", noms: formateurName, duree: "3 jours" },
    );
  } else if (isSAMA) {
    futureTrainings.push(
      { origine: "Montée en compétences secrétariat médical", nom: "Terminologie médicale avancée et codification CCAM/NGAP", objectif: "Approfondir la terminologie par spécialité, maîtriser la codification des actes et la facturation T2A", type: "Externe", formateur: "Sup Santé – École de secrétariat médical", nb: "1", noms: formateurName, duree: "3 jours" },
      { origine: "Veille réglementaire santé", nom: "RGPD et gestion du dossier patient informatisé (DPI)", objectif: "Maîtriser les obligations RGPD en établissement de santé et les bonnes pratiques du DPI", type: "Externe", formateur: "CNIL Formations", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique numérique", nom: "Logiciels médicaux et outils de gestion de cabinet", objectif: "Maîtriser Doctolib Pro, les logiciels de facturation et la télétransmission", type: "Externe", formateur: "Digiformag – Groupe Abilways", nb: "1", noms: formateurName, duree: "2 jours" },
    );
  } else if (isWebmark) {
    futureTrainings.push(
      { origine: "Montée en compétences marketing digital", nom: "Stratégie de contenu avancée et SEO technique", objectif: "Maîtriser le référencement technique, la stratégie de content marketing et les algorithmes des réseaux sociaux", type: "Externe", formateur: "Groupe Cegos – Parcours Marketing Digital", nb: "1", noms: formateurName, duree: "3 jours" },
      { origine: "Veille technologique réseaux sociaux", nom: "TikTok, Instagram Reels et vidéo courte pour les marques", objectif: "Maîtriser la création de contenu vidéo court, les algorithmes de recommandation et les stratégies d'engagement", type: "Externe", formateur: "Digiformag – Groupe Abilways", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique", nom: "Intelligence Artificielle appliquée au marketing (ChatGPT, Canva IA)", objectif: "Utiliser l'IA pour automatiser la création de contenu, l'analyse de données et la personnalisation des campagnes", type: "Externe", formateur: "OpenClassrooms", nb: "1", noms: formateurName, duree: "2 jours" },
    );
  } else if (isFLE) {
    futureTrainings.push(
      { origine: "Montée en compétences FLE", nom: "Didactique du FLE – Approche actionnelle et CECRL", objectif: "Maîtriser l'approche actionnelle, la conception de tâches communicatives et l'évaluation selon le CECRL", type: "Externe", formateur: "Alliance Française – Formation de formateurs", nb: "1", noms: formateurName, duree: "3 jours" },
      { origine: "Veille pédagogique FLE", nom: "FLE et interculturalité – Accompagner les publics migrants", objectif: "Adapter la pédagogie aux publics allophones, gérer l'hétérogénéité et favoriser l'intégration", type: "Externe", formateur: "CIEP – Centre International d'Études Pédagogiques", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation numérique", nom: "Outils numériques pour l'enseignement du FLE (LMS, IA)", objectif: "Intégrer les plateformes de e-learning et les outils IA dans l'enseignement du français", type: "Externe", formateur: "Digiformag – Groupe Abilways", nb: "1", noms: formateurName, duree: "2 jours" },
    );
  } else if (isWord) {
    futureTrainings.push(
      { origine: "Montée en compétences bureautique", nom: "Microsoft 365 avancé – Word, Excel, PowerPoint et Copilot", objectif: "Maîtriser les fonctions avancées de la suite Office 365, y compris l'assistant IA Copilot", type: "Externe", formateur: "ENI – École Nationale d'Informatique", nb: "1", noms: formateurName, duree: "3 jours" },
      { origine: "Veille technologique", nom: "Copilot et IA dans Microsoft Office – Intégration pédagogique", objectif: "Comprendre et enseigner l'utilisation de Copilot dans Word, Excel et PowerPoint", type: "Externe", formateur: "Microsoft Learning Partners", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique", nom: "Concevoir et animer des formations pour adultes (andragogie)", objectif: "Renforcer les techniques d'animation, de gestion de groupe et de scénarisation pédagogique", type: "Externe", formateur: "Cnam – Conservatoire National des Arts et Métiers", nb: "1", noms: formateurName, duree: "3 jours" },
    );
  } else if (isCRM) {
    futureTrainings.push(
      { origine: "Montée en compétences CRM", nom: "HubSpot CRM avancé – Automatisation et reporting", objectif: "Maîtriser les workflows avancés, le lead scoring, le reporting personnalisé et les intégrations API", type: "Externe", formateur: "HubSpot Academy – Certification avancée", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Veille technologique CRM", nom: "CRM et Intelligence Artificielle – Scoring prédictif et chatbots", objectif: "Comprendre l'intégration de l'IA dans les CRM (scoring, chatbots, recommandations)", type: "Externe", formateur: "Digiformag – Groupe Abilways", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Innovation pédagogique", nom: "Concevoir et animer des formations pour adultes (andragogie)", objectif: "Renforcer les techniques d'animation, de gestion de groupe et de scénarisation pédagogique", type: "Externe", formateur: "Cnam – Conservatoire National des Arts et Métiers", nb: "1", noms: formateurName, duree: "3 jours" },
    );
  } else {
    futureTrainings.push(
      { origine: "Montée en compétences du dirigeant dans le secteur de la formation", nom: "Maîtriser la réglementation de la formation professionnelle", objectif: "Comprendre le cadre juridique (Code du travail, loi Avenir, décrets Qualiopi), les obligations déclaratives (BPF, NDA) et les droits des stagiaires", type: "Externe", formateur: "Centre Inffo – Centre de ressources de la formation", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Veille technologique et innovation pédagogique", nom: "Intelligence Artificielle appliquée à la formation", objectif: "Intégrer les outils IA (ChatGPT, Gemini, Canva IA, etc.) dans l'ingénierie pédagogique, l'évaluation et la gestion administrative", type: "Externe", formateur: "Digiformag – Groupe Abilways", nb: "1", noms: formateurName, duree: "2 jours" },
      { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance, maîtriser les non-conformités et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
      { origine: "Montée en compétences pédagogiques", nom: "Concevoir et animer des formations pour adultes (andragogie)", objectif: "Renforcer les techniques d'animation, de gestion de groupe, d'évaluation des acquis et de scénarisation pédagogique", type: "Externe", formateur: "Cnam – Conservatoire National des Arts et Métiers", nb: "1", noms: formateurName, duree: "3 jours" },
    );
  }

  // ===== Entrée systématique : accompagnement Qualiopi FD CERTIF EXPERT =====
  // (sous-traitance / accompagnement dirigeant assuré par FD CERTIF EXPERT — ex IZIBUSINESS / Nadine Dendani)
  futureTrainings.unshift({
    origine: "Automatisation gestion administrative",
    nom: "Inscription sur Make et Airtable pour créer un CRM pour l'automatisation de la gestion administrative",
    objectif: "Mise en place de la stratégie d'automatisation (workflows Make, base Airtable, CRM, suivi qualité Qualiopi)",
    type: "Externe",
    formateur: "NADINE DENDANI",
    nb: "1",
    noms: o.dirigeant || formateurName,
    duree: "6 mois",
  });

  // Ne conserver que l'entrée FD CERTIF EXPERT (Automatisation gestion administrative)
  const fdOnly = futureTrainings.filter(t => /nadine\s*dendani/i.test(t.formateur));

  fdOnly.forEach(t => {
    // Pour FD CERTIF : la formation se déroule AVANT la formation principale (date début = date d'inscription),
    // sur 6 mois, afin de rester cohérent avec l'attestation de fin de formation.
    const rowDateDebut = dateInscriptionStr;
    const rowDuree = "6 mois";
    html += `<tr>
      <td>${dateInscriptionStr}</td>
      <td>${t.origine}</td>
      <td>${t.nom}</td>
      <td>${t.objectif}</td>
      <td>${t.type}</td>
      <td>${t.formateur}</td>
      <td>${t.nb}</td>
      <td>${t.noms}</td>
      <td>${rowDuree}</td>
      <td>${rowDateDebut}</td>
      <td>${prevYear}</td>
    </tr>`;
  });

  // Excel wrapper
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Plan Dev Compétences</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
<style>
  table { border-collapse: collapse; font-family: Calibri, Arial, sans-serif; font-size: 11pt; }
  th { background-color: #1e3a7b; color: white; padding: 8px 12px; text-align: left; font-weight: bold; border: 1px solid #1e3a7b; }
  td { padding: 6px 10px; border: 1px solid #d0d0d0; vertical-align: top; }
  tr:nth-child(even) { background-color: #f2f6fc; }
</style>
</head><body><table>${html}</table></body></html>`;
}
