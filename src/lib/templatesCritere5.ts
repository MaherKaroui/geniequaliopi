// Critère 5 — IND 21 & IND 22 generators (based on real SELECT FORMATION documents)
import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";
import { buildDocument, formatDate } from "./docBuilder";
import { FormateurInfo } from "./sampleData";

// ===== IND 21 — FICHES DE POSTE (role-based) =====

export function genFichePosteRole(o: OrganismeInfo, role: string) {
  switch (role) {
    case "referent_handicap": return genFichePosteRefHandicap(o);
    case "referent_administratif": return genFichePosteRefAdmin(o);
    case "formateur": return genFichePosteFormateur(o);
    case "dirigeant": return genFichePosteResponsablePedagogique(o);
    default: return genFichePosteFormateur(o);
  }
}

function genFichePosteRefHandicap(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FICHE DE POSTE", subtitle: "Référent Handicap", sections: [
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong></p>` },
    { heading: "Lieu d'intervention", content: `<p>La mission est réalisée exclusivement en présentiel, au sein des locaux de l'organisme de formation situés au :</p><p>${o.adresse}, ${o.codePostal} ${o.ville}.</p><p>Des échanges à distance peuvent être organisés avec les partenaires institutionnels ou les bénéficiaires lorsque la situation le nécessite.</p>` },
    { heading: "Type de contrat", content: `<p>Le poste est proposé sous l'un des statuts suivants :</p><ul><li>Salarié en contrat à durée déterminée ou indéterminée,</li><li>Vacataire,</li><li>Prestataire externe spécialisé, dans le cadre d'une mission d'accompagnement handicap.</li></ul><p>Les modalités contractuelles sont établies dans le respect du cadre réglementaire de la formation professionnelle et des exigences du Référentiel National Qualité (Qualiopi).</p>` },
    { heading: "Finalité du poste", content: `<p>Le/La Référent(e) Handicap est chargé(e) de garantir l'accessibilité des formations aux personnes en situation de handicap, d'assurer leur accueil, accompagnement et suivi, et de coordonner les aménagements pédagogiques, matériels et organisationnels nécessaires.</p><p>Il/Elle contribue à la mise en œuvre de la politique d'accessibilité de l'organisme et au respect des obligations légales et qualité.</p>` },
    { heading: "Missions principales", content: `<ul><li>Informer et orienter les personnes en situation de handicap</li><li>Analyser les besoins spécifiques des bénéficiaires en amont de la formation</li><li>Proposer et coordonner les aménagements pédagogiques, matériels et organisationnels</li><li>Assurer le suivi individualisé des stagiaires en situation de handicap</li><li>Sensibiliser les équipes pédagogiques et administratives à l'accueil des publics PSH</li><li>Mobiliser et coordonner les partenaires spécialisés (Agefiph, Cap Emploi, MDPH, etc.)</li><li>Veiller à l'accessibilité des locaux, outils et supports de formation</li><li>Mettre à jour les informations relatives à l'accessibilité sur les supports de communication</li><li>Assurer la traçabilité des actions mises en place</li><li>Participer aux audits et contrôles Qualiopi</li><li>Contribuer à l'amélioration continue de la politique handicap de l'organisme</li></ul>` },
    { heading: "Savoir-faire (compétences techniques)", content: `<ul><li>Connaître le cadre légal du handicap et de l'accessibilité</li><li>Analyser les besoins spécifiques des personnes en situation de handicap</li><li>Mettre en place des aménagements adaptés aux contraintes de formation</li><li>Mobiliser les dispositifs et acteurs du champ du handicap</li><li>Conseiller les équipes pédagogiques sur l'adaptation des parcours</li><li>Assurer la traçabilité et la confidentialité des informations</li><li>Appliquer les exigences du Référentiel National Qualité (Qualiopi)</li></ul>` },
    { heading: "Savoir-être (compétences comportementales)", content: `<ul><li>Écoute active et bienveillance</li><li>Sens de la confidentialité et du respect de la personne</li><li>Empathie et capacité d'adaptation</li><li>Rigueur et sens de l'organisation</li><li>Capacité à travailler en réseau</li><li>Communication claire et rassurante</li><li>Réactivité face aux situations particulières</li><li>Esprit d'analyse et de solution</li></ul>` },
    { heading: "Profil requis", content: `<ul><li>Sensibilité ou expérience dans l'accompagnement des personnes en situation de handicap</li><li>Connaissance du secteur de la formation professionnelle appréciée</li><li>Une formation ou une expérience en lien avec le handicap est un plus</li><li>Capacité à travailler en lien avec des partenaires institutionnels</li><li>Expérience minimum de 2 ans en tant que formateur / management en pack office word</li></ul>` },
    { heading: "Moyens et ressources mis à disposition", content: `<ul><li>Accès aux procédures internes liées à l'accessibilité</li><li>Outils de suivi et de traçabilité</li><li>Répertoire des partenaires handicap</li><li>Supports d'information et de sensibilisation</li><li>Appui de la direction et de l'équipe pédagogique</li></ul>`, variant: "green" },
    { heading: "Indicateurs de performance", content: `<ul><li>Nombre de bénéficiaires PSH accompagnés</li><li>Taux de satisfaction des bénéficiaires PSH</li><li>Pertinence des aménagements mis en place</li><li>Traçabilité des actions d'accompagnement</li><li>Résultats des audits Qualiopi</li></ul>` },
    { heading: "Positionnement hiérarchique", content: `<p>Le/La Référent(e) Handicap intervient sous l'autorité de la direction de l'organisme et travaille en collaboration étroite avec le référent pédagogique, le référent administratif et les formateurs.</p>` },
  ] });
}

function genFichePosteRefAdmin(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FICHE DE POSTE", subtitle: "Référent Administratif", sections: [
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong></p>` },
    { heading: "Lieu d'intervention", content: `<p>La mission est réalisée exclusivement en présentiel, au sein des locaux de l'organisme de formation situés au :</p><p>${o.adresse}, ${o.codePostal} ${o.ville}.</p><p>Des interventions ponctuelles peuvent être réalisées sur des sites partenaires pour des besoins administratifs liés aux actions de formation.</p>` },
    { heading: "Type de contrat", content: `<p>Le poste est proposé sous l'un des statuts suivants :</p><ul><li>Salarié en contrat à durée déterminée ou indéterminée,</li><li>Vacataire administratif,</li><li>Prestataire indépendant, dans le cadre d'une mission administrative externalisée.</li></ul><p>Les modalités contractuelles sont établies dans le respect du cadre réglementaire de la formation professionnelle et des exigences du Référentiel National Qualité (Qualiopi).</p>` },
    { heading: "Finalité du poste", content: `<p>Le/La Référent(e) Administratif(ve) assure la gestion administrative complète des actions de formation, de l'inscription des bénéficiaires jusqu'à l'archivage des dossiers, en garantissant la conformité réglementaire, la traçabilité des documents et le respect des exigences qualité de l'organisme.</p><p>Il/Elle est un acteur clé du bon fonctionnement administratif et de la conformité Qualiopi.</p>` },
    { heading: "Missions principales", content: `<ul><li>Gérer les inscriptions et le suivi administratif des stagiaires</li><li>Constituer, vérifier et archiver les dossiers administratifs de formation</li><li>Établir et suivre les documents réglementaires : contrats ou conventions de formation, convocations, règlement intérieur, conditions générales de vente</li><li>Assurer le suivi des feuilles d'émargement et des attestations de fin de formation</li><li>Gérer les délais d'accès à la formation</li><li>Assurer la relation administrative avec les stagiaires, formateurs et partenaires</li><li>Préparer et suivre les dossiers de financement (CPF, OPCO, autofinancement)</li><li>Veiller au respect des obligations réglementaires (DA, BPF, EDOF, Qualiopi)</li><li>Mettre à jour les bases de données administratives</li><li>Participer aux audits et contrôles (Qualiopi, financeurs, DREETS)</li><li>Contribuer à l'amélioration continue des processus administratifs</li></ul>` },
    { heading: "Savoir-faire (compétences techniques)", content: `<ul><li>Maîtriser les procédures administratives de la formation professionnelle</li><li>Constituer et contrôler des dossiers administratifs conformes</li><li>Utiliser les outils bureautiques (Word, Excel, messagerie)</li><li>Utiliser des outils de gestion de formation et plateformes dématérialisées</li><li>Suivre des échéanciers et respecter les délais réglementaires</li><li>Appliquer les exigences du Référentiel National Qualité (Qualiopi)</li><li>Assurer la traçabilité et l'archivage documentaire</li><li>Rédiger des courriers et documents administratifs professionnels</li></ul>` },
    { heading: "Savoir-être (compétences comportementales)", content: `<ul><li>Rigueur et sens de l'organisation</li><li>Fiabilité et discrétion professionnelle</li><li>Autonomie dans la gestion des dossiers</li><li>Sens des priorités</li><li>Esprit d'analyse et de contrôle</li><li>Qualités relationnelles et communication professionnelle</li><li>Capacité à travailler en équipe</li><li>Réactivité face aux demandes administratives</li><li>Respect des procédures et des délais</li></ul>` },
    { heading: "Profil requis", content: `<ul><li>Formation ou expérience en gestion administrative</li><li>Expérience souhaitée dans un organisme de formation</li><li>Connaissance du cadre réglementaire de la formation professionnelle appréciée</li><li>Maîtrise des outils bureautiques</li><li>Expérience minimum de 2 ans en tant que formateur / management en pack office word</li></ul>` },
    { heading: "Moyens et outils mis à disposition", content: `<ul><li>Poste informatique équipé</li><li>Logiciels bureautiques et outils de gestion administrative</li><li>Accès aux plateformes réglementaires (EDOF, OPCO, etc.)</li><li>Procédures internes et référentiels qualité</li><li>Accompagnement par l'équipe pédagogique et qualité</li></ul>`, variant: "green" },
    { heading: "Indicateurs de performance", content: `<ul><li>Taux de conformité des dossiers administratifs</li><li>Respect des délais réglementaires</li><li>Qualité des documents produits</li><li>Satisfaction des stagiaires et formateurs (partie administrative)</li><li>Résultats des audits et contrôles</li></ul>` },
    { heading: "Positionnement hiérarchique", content: `<p>Le/La Référent(e) Administratif(ve) exerce ses missions sous l'autorité de la direction de l'organisme et travaille en lien étroit avec le référent pédagogique et les formateurs.</p>` },
  ] });
}

function genFichePosteFormateur(o: OrganismeInfo) {
  return buildDocument({ org: o, title: "FICHE DE POSTE", subtitle: "Formateur / Formatrice Bureautique – Microsoft Word", sections: [
    { heading: "Organisme de formation", content: `<p><strong>${o.nom}</strong></p>` },
    { heading: "Lieu d'intervention", content: `<p>La mission est réalisée exclusivement en présentiel, au sein des locaux de l'organisme de formation situés au :</p><p>${o.adresse}, ${o.codePostal} ${o.ville}.</p><p>Des interventions ponctuelles peuvent également être organisées sur des sites partenaires, dans le cadre d'actions de formation planifiées par l'organisme.</p>` },
    { heading: "Type de contrat", content: `<p>Le poste est proposé sous l'un des statuts suivants, en fonction des besoins pédagogiques :</p><ul><li>Vacataire de la formation professionnelle, avec rémunération à l'heure ou à la journée d'intervention,</li><li>Formateur indépendant, dans le cadre d'un contrat de prestation de services,</li><li>Salarié en contrat à durée déterminée ou indéterminée, selon le volume d'activité.</li></ul><p>L'ensemble des modalités contractuelles est établi dans le respect du cadre réglementaire de la formation professionnelle continue et des exigences du Référentiel National Qualité (Qualiopi).</p>` },
    { heading: "Finalité du poste", content: `<p>Le/La formateur(trice) bureautique Microsoft Word a pour mission de concevoir, animer et évaluer des actions de formation permettant aux apprenants d'acquérir les compétences de base nécessaires à l'utilisation du logiciel Word, dans un contexte professionnel ou personnel.</p><p>Il/Elle contribue activement à la qualité des parcours de formation, à la satisfaction des stagiaires et à l'amélioration continue des pratiques pédagogiques de l'organisme.</p>` },
    { heading: "Missions principales", content: `<ul><li>Animer des sessions de formation Microsoft Word – niveau initiation, en présentiel</li><li>Présenter clairement les objectifs de formation et le déroulé pédagogique</li><li>Adapter les contenus et le rythme aux profils et niveaux des apprenants</li><li>Mettre en œuvre une pédagogie active favorisant la pratique et l'autonomie</li><li>Accompagner individuellement les stagiaires tout au long de la formation</li><li>Concevoir et utiliser des supports pédagogiques adaptés</li><li>Évaluer les acquis des stagiaires (tests, exercices, évaluations finales)</li><li>Renseigner les documents de suivi pédagogique et administratif</li><li>Réaliser les bilans à chaud et à froid</li><li>Appliquer et respecter les procédures internes et le cadre Qualiopi</li><li>Contribuer aux actions d'amélioration continue de l'organisme</li></ul>` },
    { heading: "Savoir-faire (compétences techniques et pédagogiques)", content: `<ul><li>Maîtriser les fonctionnalités essentielles de Microsoft Word, notamment : création, ouverture, enregistrement et modification de documents ; mise en forme du texte et des paragraphes ; insertion d'images, tableaux, listes et objets simples ; mise en page et préparation à l'impression</li><li>Concevoir des supports pédagogiques clairs et accessibles</li><li>Animer une formation en alternant apports théoriques et exercices pratiques</li><li>Adapter sa pédagogie à un public débutant ou peu à l'aise avec l'outil informatique</li><li>Évaluer les compétences acquises à l'aide de grilles et d'outils adaptés</li><li>Assurer un suivi pédagogique structuré</li><li>Appliquer les exigences du Référentiel National Qualité (Qualiopi)</li></ul>` },
    { heading: "Savoir-être (compétences comportementales)", content: `<ul><li>Sens de la pédagogie et de la transmission des savoirs</li><li>Patience, écoute active et bienveillance</li><li>Capacité à rassurer et accompagner des publics débutants</li><li>Adaptabilité face à des profils variés</li><li>Clarté et rigueur dans les explications</li><li>Posture professionnelle et respect du cadre de formation</li><li>Sens de l'organisation et ponctualité</li><li>Esprit d'amélioration continue</li><li>Capacité à travailler en collaboration avec l'équipe pédagogique</li></ul>` },
    { heading: "Profil requis", content: `<ul><li>Bonne maîtrise du logiciel Microsoft Word</li><li>Expérience professionnelle ou pédagogique en bureautique</li><li>Une expérience en formation pour adultes est appréciée</li><li>Connaissance du cadre de la formation professionnelle continue est un plus</li><li>Expérience minimum de 2 ans en tant que formateur / management en pack office word</li></ul>` },
    { heading: "Moyens et ressources mis à disposition", content: `<ul><li>Salle de formation équipée</li><li>Ordinateur et matériel pédagogique</li><li>Logiciel Microsoft Word (version récente)</li><li>Supports pédagogiques fournis par l'organisme</li><li>Assistance pédagogique et administrative</li></ul>`, variant: "green" },
    { heading: "Positionnement dans l'organisation", content: `<p>Le/La formateur(trice) intervient sous la responsabilité du référent pédagogique et s'inscrit dans la démarche qualité et d'amélioration continue de ${o.nom}.</p>` },
  ] });
}

function genFichePosteResponsablePedagogique(o: OrganismeInfo) {
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
    { heading: "Profil requis", content: `<ul><li>Formation ou expérience significative en ingénierie pédagogique</li><li>Expérience dans la formation professionnelle pour adultes</li><li>Connaissance approfondie du cadre réglementaire de la formation</li><li>Expérience en management ou coordination d'équipe appréciée</li><li>Expérience minimum de 2 ans en tant que formateur / management en pack office word</li></ul>` },
    { heading: "Moyens et ressources mis à disposition", content: `<ul><li>Accès aux outils pédagogiques et qualité</li><li>Plateformes de gestion de formation et supports numériques</li><li>Procédures internes et référentiels qualité</li><li>Appui de la direction et des équipes administratives</li></ul>`, variant: "green" },
    { heading: "Indicateurs de performance", content: `<ul><li>Atteinte des objectifs pédagogiques</li><li>Taux de satisfaction des bénéficiaires</li><li>Qualité des programmes et des évaluations</li><li>Résultats des audits Qualiopi</li><li>Engagement et performance des formateurs</li></ul>` },
    { heading: "Positionnement hiérarchique", content: `<p>Le/La Responsable Pédagogique est placé(e) sous l'autorité de la direction de l'organisme et travaille en lien étroit avec le référent administratif, le référent handicap et les formateurs.</p>` },
  ] });
}

// ===== IND 21 — AUTO-ÉVALUATION FORMATEUR =====

export function genAutoEvaluationFormateurV2(o: OrganismeInfo, f: FormationInfo, fmt: FormateurInfo) {
  return buildDocument({ org: o, title: "Auto-évaluation du formateur", subtitle: `${fmt.prenom} ${fmt.nom}`, sections: [
    { heading: "Informations", content: `<p><strong>Nom :</strong> ${fmt.prenom} ${fmt.nom}<br><strong>Date :</strong> ${formatDate(f.dateFin)}<br><strong>Formation concernée :</strong> ${f.intitule}</p>` },
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
  `, signatures: { type: "2", labels: ["Signature du formateur", "Le Responsable Pédagogique"], names: [fmt.prenom + " " + fmt.nom, o.responsablePedagogique], dates: [formatDate(f.dateFin), formatDate(f.dateFin)] } });
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

export function genPlanDevCompetencesExcel(o: OrganismeInfo, f: FormationInfo, formateurs: FormateurInfo[], stagiaires?: StagiaireInfo[]): string {
  // Use formation date year, fallback to current year
  const rawDate = f.dateDebut || f.dateFin || "";
  const parsedDate = rawDate ? new Date(rawDate + "T00:00:00") : null;
  const year = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.getFullYear() : new Date().getFullYear();
  const nextYear = year + 1;
  const formateurName = f.formateur || (formateurs[0] ? formateurs[0].prenom + " " + formateurs[0].nom : "");
  const stagiaireNames = stagiaires && stagiaires.length > 0
    ? stagiaires.filter(s => s.nom || s.prenom).map(s => `${s.prenom} ${s.nom}`.trim()).join(", ")
    : formateurName;
  const nbStagiaires = stagiaires ? stagiaires.filter(s => s.nom || s.prenom).length : 1;

  let html = `<tr><th colspan="9">${o.nom} – PLAN DE DÉVELOPPEMENT DES COMPÉTENCES</th></tr>`;
  html += `<tr><td><strong>Année :</strong></td><td colspan="8">${year} – ${nextYear}</td></tr>`;
  html += `<tr><td></td></tr>`;
  html += `<tr>
    <th>Origine</th>
    <th>Nom de la formation</th>
    <th>Objectifs attendus</th>
    <th>Interne / Externe</th>
    <th>Formateur / Formatrice</th>
    <th>Nb stagiaires</th>
    <th>Noms des stagiaires</th>
    <th>Durée</th>
    <th>Année</th>
  </tr>`;

  // ========== FORMATIONS RÉALISÉES (année en cours) ==========
  html += `<tr><th colspan="9" style="background:#2d8659;text-align:left;padding:10px">FORMATIONS RÉALISÉES – ${year}</th></tr>`;

  // Row 1: Formation based on current formation — Interne, with stagiaire names
  html += `<tr>
    <td>Besoin identifié lors de l'entretien annuel</td>
    <td>${f.intitule}</td>
    <td>${f.objectifs || "Maîtriser les fonctionnalités et développer les compétences pratiques"}</td>
    <td>Interne</td>
    <td>${formateurName}</td>
    <td>${nbStagiaires}</td>
    <td>${stagiaireNames}</td>
    <td>${f.duree || "21 heures"}</td>
    <td>${year}</td>
  </tr>`;

  // ========== FORMATIONS PRÉVUES (année suivante) ==========
  html += `<tr><th colspan="9" style="background:#e8870e;text-align:left;padding:10px">FORMATIONS PRÉVUES – ${nextYear}</th></tr>`;

  // Determine improvement trainings based on the current formation domain
  const intituleLower = (f.intitule || '').toLowerCase();
  const futureTrainings: Array<{ origine: string; nom: string; objectif: string; type: string; formateur: string; nb: string; noms: string; duree: string }> = [];

  if (intituleLower.includes('excel') || intituleLower.includes('bureautique') || intituleLower.includes('word') || intituleLower.includes('powerpoint')) {
    futureTrainings.push(
      { origine: "Montée en compétences suite à la formation " + f.intitule, nom: "Excel Avancé – Power Query et Power Pivot", objectif: "Maîtriser l'automatisation du traitement de données et la modélisation avancée dans Excel", type: "Externe", formateur: "Cegos – Département Bureautique", nb: String(nbStagiaires), noms: stagiaireNames, duree: "3 jours" },
      { origine: "Besoin identifié en outils collaboratifs", nom: "Microsoft 365 – Travail collaboratif (Teams, SharePoint, OneDrive)", objectif: "Optimiser le travail en équipe avec les outils cloud Microsoft 365", type: "Externe", formateur: "Orsys Formation", nb: String(nbStagiaires), noms: stagiaireNames, duree: "2 jours" },
    );
  } else if (intituleLower.includes('anglais') || intituleLower.includes('english')) {
    futureTrainings.push(
      { origine: "Perfectionnement linguistique suite à la formation " + f.intitule, nom: "Anglais professionnel – Niveau avancé (B2/C1)", objectif: "Renforcer la fluidité orale et la rédaction professionnelle en anglais pour les présentations et négociations", type: "Externe", formateur: "Wall Street English", nb: String(nbStagiaires), noms: stagiaireNames, duree: "30 heures" },
      { origine: "Préparation certification internationale", nom: "Préparation au TOEIC / Linguaskill", objectif: "Obtenir une certification reconnue attestant du niveau d'anglais professionnel", type: "Externe", formateur: "British Council France", nb: String(nbStagiaires), noms: stagiaireNames, duree: "20 heures" },
    );
  } else if (intituleLower.includes('management') || intituleLower.includes('leader')) {
    futureTrainings.push(
      { origine: "Approfondissement suite à la formation " + f.intitule, nom: "Leadership et management agile", objectif: "Développer un style de management agile et adaptatif pour accompagner le changement", type: "Externe", formateur: "Comundi – Groupe Lefebvre Dalloz", nb: String(nbStagiaires), noms: stagiaireNames, duree: "3 jours" },
      { origine: "Besoin identifié en gestion des conflits", nom: "Gestion des conflits et communication assertive", objectif: "Savoir prévenir et gérer les conflits au sein d'une équipe avec des techniques de communication assertive", type: "Externe", formateur: "Demos Formation", nb: String(nbStagiaires), noms: stagiaireNames, duree: "2 jours" },
    );
  } else if (intituleLower.includes('aide') || intituleLower.includes('soignant') || intituleLower.includes('accompagn') || intituleLower.includes('sanitaire') || intituleLower.includes('social') || intituleLower.includes('médico')) {
    futureTrainings.push(
      { origine: "Perfectionnement professionnel suite à la formation " + f.intitule, nom: "Bientraitance et accompagnement des personnes vulnérables", objectif: "Renforcer les pratiques de bientraitance et prévenir les risques de maltraitance", type: "Externe", formateur: "Grieps – Conseil et Formation Santé", nb: String(nbStagiaires), noms: stagiaireNames, duree: "2 jours" },
      { origine: "Obligation réglementaire et montée en compétences", nom: "Gestes et postures – Prévention des TMS", objectif: "Maîtriser les techniques de manutention pour prévenir les troubles musculo-squelettiques", type: "Externe", formateur: "INRS – Institut National de Recherche et de Sécurité", nb: String(nbStagiaires), noms: stagiaireNames, duree: "1 jour" },
    );
  } else if (intituleLower.includes('ia') || intituleLower.includes('intelligence artificielle') || intituleLower.includes('chatgpt') || intituleLower.includes('data')) {
    futureTrainings.push(
      { origine: "Montée en compétences suite à la formation " + f.intitule, nom: "Deep Learning et Machine Learning – Applications métier", objectif: "Comprendre et appliquer les algorithmes de ML/DL pour automatiser des processus métier", type: "Externe", formateur: "Orsys Formation", nb: String(nbStagiaires), noms: stagiaireNames, duree: "3 jours" },
      { origine: "Besoin identifié en IA générative", nom: "Prompt Engineering et IA générative avancée", objectif: "Maîtriser les techniques de prompt engineering pour optimiser l'utilisation des outils IA en entreprise", type: "Externe", formateur: "Jedha Bootcamp", nb: String(nbStagiaires), noms: stagiaireNames, duree: "2 jours" },
    );
  } else if (intituleLower.includes('fle') || intituleLower.includes('français langue') || intituleLower.includes('alphabétisation')) {
    futureTrainings.push(
      { origine: "Perfectionnement suite à la formation " + f.intitule, nom: "FLE – Niveau intermédiaire B1/B2 (communication professionnelle)", objectif: "Renforcer la maîtrise du français écrit et oral dans un contexte professionnel", type: "Externe", formateur: "Alliance Française", nb: String(nbStagiaires), noms: stagiaireNames, duree: "40 heures" },
      { origine: "Préparation à la certification", nom: "Préparation au TCF / DELF Pro", objectif: "Obtenir une certification officielle de niveau de français professionnel", type: "Externe", formateur: "France Éducation International (CIEP)", nb: String(nbStagiaires), noms: stagiaireNames, duree: "20 heures" },
    );
  } else {
    futureTrainings.push(
      { origine: "Approfondissement suite à la formation " + f.intitule, nom: f.intitule + " – Niveau avancé", objectif: "Approfondir les compétences acquises et maîtriser les aspects avancés du domaine", type: "Externe", formateur: "Cegos – Centre de formation", nb: String(nbStagiaires), noms: stagiaireNames, duree: "3 jours" },
      { origine: "Besoin identifié en digitalisation", nom: "Transformation digitale et outils numériques", objectif: "Intégrer les outils numériques dans ses pratiques professionnelles pour gagner en efficacité", type: "Externe", formateur: "Orsys Formation", nb: String(nbStagiaires), noms: stagiaireNames, duree: "2 jours" },
    );
  }

  // Formations spécifiques dirigeant : monde de la formation professionnelle
  futureTrainings.push(
    { origine: "Montée en compétences du dirigeant dans le secteur de la formation", nom: "Maîtriser la réglementation de la formation professionnelle", objectif: "Comprendre le cadre juridique (Code du travail, loi Avenir, décrets Qualiopi), les obligations déclaratives (BPF, NDA) et les droits des stagiaires", type: "Externe", formateur: "Centre Inffo – Centre de ressources de la formation", nb: "1", noms: formateurName, duree: "2 jours" },
    { origine: "Développement commercial et stratégie de l'organisme", nom: "Développer et piloter un organisme de formation", objectif: "Structurer son offre, développer sa stratégie commerciale, gérer la relation avec les OPCO et les financeurs publics", type: "Externe", formateur: "Mbusiness Consulting", nb: "1", noms: formateurName, duree: "3 jours" },
    { origine: "Veille technologique et innovation pédagogique", nom: "Intelligence Artificielle appliquée à la formation", objectif: "Intégrer les outils IA (ChatGPT, Gemini, Canva IA, etc.) dans l'ingénierie pédagogique, l'évaluation et la gestion administrative", type: "Externe", formateur: "Digiformag – Groupe Abilways", nb: "1", noms: formateurName, duree: "2 jours" },
    { origine: "Obligation qualité et préparation audit", nom: "Audit Qualiopi – Préparation et maintien de la certification RNQ V9", objectif: "Préparer l'audit de surveillance, maîtriser les non-conformités et mettre en place un plan d'amélioration continue", type: "Externe", formateur: "Afnor Compétences", nb: "1", noms: formateurName, duree: "1 jour" },
    { origine: "Montée en compétences pédagogiques", nom: "Concevoir et animer des formations pour adultes (andragogie)", objectif: "Renforcer les techniques d'animation, de gestion de groupe, d'évaluation des acquis et de scénarisation pédagogique", type: "Externe", formateur: "Cnam – Conservatoire National des Arts et Métiers", nb: "1", noms: formateurName, duree: "3 jours" },
  );

  futureTrainings.forEach(t => {
    html += `<tr>
      <td>${t.origine}</td>
      <td>${t.nom}</td>
      <td>${t.objectif}</td>
      <td>${t.type}</td>
      <td>${t.formateur}</td>
      <td>${t.nb}</td>
      <td>${t.noms}</td>
      <td>${t.duree}</td>
      <td>${nextYear}</td>
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
