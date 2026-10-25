import type { FormationInfo } from "@/types/qualiopi";

/**
 * Formations de prévention du dispositif INRS / Assurance maladie – Risques professionnels proposées
 * dans les dossiers FIPU d'IZILearn (TMS Pros, PRAP). Fiches INRS vérifiées le 23/10/2026
 * (TMS 002, TMS 003, N11302, PRAP-IBC 002/003, PRAP-2S 003/004). Les anciennes fiches RS (RS1026,
 * RS1037, RS1040, RS1261) sont inactives depuis le 31/12/2021 : aucune mention RNCP / RS / CPF.
 * Contenu (besoins, QCM, mises en situation, support) : presets intégrés de formationPresets/builtinTP.
 */
type Def = {
  intitule: string; heures: number; rythme: string; public: string; prerequis: string;
  objectif: string; competences: string[]; programme: string[]; validation: string;
};

const ENGAGEMENT = "Lettre d'engagement du chef d'établissement sur un projet global de prévention des TMS (rédigée notamment à l'issue de la journée « Initier, piloter et manager son projet de prévention des TMS » organisée par les Carsat, Cramif ou CGSS) ; connaissances de base en prévention : attestation de réussite de l'autoformation INRS @01001 « Acquérir des bases en prévention des risques professionnels », ou formation équivalente des caisses régionales, ou expérience suffisante.";
const FORMATEURS_TMS = "Autoformation INRS @01001 réussie ; formation pédagogique ou au moins 2 ans de pratique régulière de la formation d'adultes (8 jours de face à face par an minimum pour les formateurs d'organisme) ; connaissances en approche ergonomique des situations de travail, en conduite de projet de prévention et en démarche de prévention des TMS ; au moins 2 ans d'interventions ergonomiques en entreprise dans le domaine des TMS.";
const STRUCTURE_PRAP = "Structure engagée dans une démarche globale de prévention des risques professionnels ; il est vivement recommandé que le dirigeant (ou son représentant) suive au préalable la formation spécifique proposée par les organismes habilités ou les Carsat, Cramif, CGSS.";
const FORMATEURS_PRAP = "Autoformation INRS @01001 « Acquérir des bases en prévention des risques professionnels » réussie (ou formation « Obtenir des compétences de base en prévention » des caisses régionales) ; capacités relationnelles, d'animation et d'expression ; si possible, certificat d'acteur PRAP correspondant. ";
const ATTESTATION = "attestation de validation des acquis délivrée par l'organisme de formation habilité par l'Assurance maladie – Risques professionnels et l'INRS";

const DEFS: Def[] = [
  {
    intitule: "Devenir personne ressource du projet de prévention des TMS de l’entreprise", heures: 42,
    rythme: "6 jours modulables : 5 jours en présentiel (2 j + 2 j + 1 j) et 2 demi-journées d'accompagnement sur site pendant les intersessions",
    public: "Toute personne (manager, fonctionnel sécurité, etc.) appelée à exercer dans son établissement la fonction de personne ressource du projet de prévention des TMS ; 10 stagiaires maximum par session.",
    prerequis: ENGAGEMENT,
    objectif: "organiser et animer le projet de prévention des troubles musculosquelettiques de l'établissement et mettre en œuvre les étapes de la démarche (référentiel INRS TMS 003, programme TMS Pros)",
    competences: ["Élaborer et animer un projet de prévention des TMS en concertation avec les acteurs concernés", "Mettre en œuvre une démarche de repérage, d'analyse et d'évaluation des situations de travail à risque de TMS", "Établir un diagnostic mettant en lien l'ensemble des facteurs de risque et leurs déterminants", "Participer à la recherche d'axes de prévention visant la transformation des situations de travail et à l'élaboration d'un plan d'actions", "Accompagner l'établissement dans la mise en œuvre, le suivi et l'évaluation des mesures de prévention", "Assurer une veille dans le temps sur la maîtrise des risques de TMS"],
    programme: ["Méthodologie de projet et rôle de la personne ressource", "Atteintes de l'appareil locomoteur liées à l'activité professionnelle (AT/MP) et programme TMS Pros", "Facteurs de risque biomécaniques, psychosociaux et d'ambiances physiques ; liens avec les déterminants, notamment organisationnels", "Repérage, analyse et évaluation des situations de travail à risque de TMS (méthodes et outils)", "Pistes de transformation des situations de travail et construction du plan d'actions", "Suivi d'indicateurs de veille et reporting TMS Pros"],
    validation: ATTESTATION,
  },
  {
    intitule: "Devenir chargé(e) de prévention des TMS de l’établissement", heures: 28,
    rythme: "4 jours : 3 jours en face à face pédagogique et 2 demi-journées d'accompagnement sur site",
    public: "Toute personne (manager, fonctionnel sécurité, etc.) appelée à exercer la fonction de chargé(e) de prévention des TMS, dans un établissement de moins de 150 salariés (ou d'un établissement disposant déjà d'une personne ressource formée) ; 10 stagiaires maximum par session.",
    prerequis: ENGAGEMENT,
    objectif: "mettre en œuvre de façon opérationnelle les étapes de la démarche de prévention des TMS dans un projet construit et piloté par le chef d'établissement (référentiel INRS TMS 002, programme TMS Pros)",
    competences: ["Identifier le risque de TMS et les points structurants d'une action de prévention des TMS", "Déployer les étapes d'une démarche de prévention des TMS dans le cadre d'un projet piloté par le chef d'établissement", "Participer à la recherche de pistes de solution visant l'amélioration des conditions de travail", "Identifier des perspectives pour ancrer la démarche de façon pérenne"],
    programme: ["Enjeux de la prévention des TMS, programme TMS Pros et dispositif de formation", "Atteintes à la santé et à la performance de l'entreprise", "Facteurs de risque et liens avec les déterminants", "Éléments structurants d'une démarche de prévention des TMS", "Repérage, analyse et évaluation des situations de travail à risque", "Pistes de transformation et reporting TMS Pros"],
    validation: ATTESTATION,
  },
  {
    intitule: "Formation de formateurs « Devenir personne ressource du projet de prévention des TMS »", heures: 88,
    rythme: "Environ 12,5 jours : 8,5 jours en présentiel en sessions non consécutives et environ 4 jours à distance (format du stage INRS N11302)",
    public: "Formateurs d'organismes de formation ou d'entreprises souhaitant former les personnes ressources du projet de prévention des TMS dans le cadre du programme TMS Pros.",
    prerequis: FORMATEURS_TMS,
    objectif: "concevoir, animer et évaluer la formation « Devenir personne ressource du projet de prévention des TMS de l'établissement » et accompagner sur site les projets des participants. La formation de formateurs officielle et la certification des formateurs relèvent de l'INRS et de l'Assurance maladie – Risques professionnels",
    competences: ["Situer le dispositif de formation TMS Pros et le rôle du formateur certifié", "Concevoir et organiser le parcours de formation de la personne ressource (6 jours et intersessions)", "Animer les séquences et accompagner sur site la conduite du projet de prévention des TMS", "Évaluer les acquis des personnes ressources et le déploiement de leur projet"],
    programme: ["Document de référence et cahier des charges du dispositif TMS Pros", "Contenus de la formation personne ressource : démarche, facteurs de risque, analyse, diagnostic, plan d'actions, veille", "Ingénierie du parcours : progression, intersessions, travaux à produire", "Animation d'adultes, études de cas et mises en situation", "Accompagnement sur site et posture de conseil", "Validation des acquis, suivi des projets et reporting"],
    validation: "certification du formateur délivrée par le réseau Prévention (INRS et Assurance maladie – Risques professionnels) après les épreuves certificatives, pour les seuls stages réalisés par l'INRS ; à défaut, attestation de fin de formation",
  },
  {
    intitule: "Formation de formateurs « Devenir chargé(e) de prévention des TMS »", heures: 88,
    rythme: "Environ 12,5 jours : 8,5 jours en présentiel en sessions non consécutives et environ 4 jours à distance (format du stage INRS N11302)",
    public: "Formateurs d'organismes de formation ou d'entreprises souhaitant former les chargés de prévention des TMS des établissements de moins de 150 salariés dans le cadre du programme TMS Pros.",
    prerequis: FORMATEURS_TMS,
    objectif: "concevoir, animer et évaluer la formation « Devenir chargé(e) de prévention des TMS de l'établissement » et accompagner sur site la démarche pilotée par le chef d'établissement. La formation de formateurs officielle et la certification des formateurs relèvent de l'INRS et de l'Assurance maladie – Risques professionnels",
    competences: ["Situer le dispositif de formation TMS Pros et le rôle du formateur certifié auprès des établissements de moins de 150 salariés", "Concevoir et organiser le parcours du chargé de prévention (4 jours et intersession)", "Animer les séquences et accompagner sur site le déploiement de la démarche pilotée par le chef d'établissement", "Évaluer les acquis des chargés de prévention et le reporting TMS Pros"],
    programme: ["Document de référence et cahier des charges du dispositif TMS Pros", "Contenus de la formation chargé de prévention : repérage, analyse, pistes de solution, ancrage de la démarche", "Ingénierie du parcours : progression, intersession, travaux à produire", "Animation d'adultes, études de cas et mises en situation", "Accompagnement sur site des TPE-PME", "Validation des acquis et reporting TMS Pros"],
    validation: "certification du formateur délivrée par le réseau Prévention (INRS et Assurance maladie – Risques professionnels) après les épreuves certificatives, pour les seuls stages réalisés par l'INRS ; à défaut, attestation de fin de formation",
  },
  {
    intitule: "PRAP IBC — industrie, BTP, commerce et activités de bureau", heures: 14,
    rythme: "2 jours en présentiel (12 heures effectives minimum, 14 heures conseillées), séances réparties possibles",
    public: "Tous les salariés, opérateurs et agents des secteurs de l'industrie, du BTP, du commerce et des activités de bureau.",
    prerequis: STRUCTURE_PRAP,
    objectif: "prévenir les risques liés à l'activité physique dans sa situation de travail au sein d'une entreprise des secteurs IBC (référentiel INRS PRAP-IBC 003)",
    competences: ["Se situer en tant qu'acteur de prévention des risques liés à l'activité physique dans son entreprise", "Observer et analyser sa situation de travail en s'appuyant sur le fonctionnement du corps humain afin d'identifier les atteintes à la santé encourues", "Participer à la maîtrise du risque en proposant à son encadrement des améliorations d'ordre technique, organisationnel ou humain"],
    programme: ["Situation de travail, danger, situation dangereuse, risque, dommage ; AT, MP et leurs préjudices", "Anatomie et physiologie de l'appareil locomoteur ; lombalgies, TMS", "Facteurs de risque biomécaniques, psychosociaux et d'environnement physique (vibrations, froid, chaleur, bruit)", "Observation et analyse d'une situation de travail, identification des risques", "Propositions d'amélioration et remontée d'informations", "Principes de sécurité physique et d'économie d'effort, mises en situation au plus près de l'activité réelle"],
    validation: "certificat d'acteur PRAP IBC délivré par l'Assurance maladie – Risques professionnels et l'INRS (valable 24 mois, prolongé par un MAC de 7 heures), si l'organisme et le formateur sont habilités ; à défaut, attestation de fin de formation",
  },
  {
    intitule: "PRAP 2S — secteur sanitaire et social", heures: 28,
    rythme: "4 jours en présentiel (séances de 3 à 4 heures possibles)",
    public: "Tous les salariés, opérateurs et agents du secteur sanitaire et médico-social (établissements de santé, structures d'aide et de soins à la personne, EHPAD, etc.).",
    prerequis: STRUCTURE_PRAP,
    objectif: "prévenir les risques liés à l'activité physique dans sa situation de travail au sein d'un établissement du secteur sanitaire et médico-social, en accompagnant la mobilité de la personne aidée (référentiel INRS PRAP-2S 004)",
    competences: ["Se situer en tant qu'acteur de prévention des risques liés à l'activité physique dans son établissement", "Observer et analyser sa situation de travail en s'appuyant sur le fonctionnement du corps humain afin d'identifier les atteintes à la santé encourues", "Participer à la maîtrise du risque en proposant à son encadrement des améliorations d'ordre technique, organisationnel ou humain", "Accompagner la mobilité de la personne aidée en prenant soin de l'autre et de soi (ALM)"],
    programme: ["Situation de travail, danger, risque, dommage ; AT, MP et leurs préjudices pour l'établissement", "Anatomie et physiologie de l'appareil locomoteur ; lombalgies, TMS", "Facteurs de risque biomécaniques, psychosociaux et d'environnement physique", "Observation et analyse d'une situation de travail, propositions d'amélioration, remontée d'informations", "Principes de sécurité physique et d'économie d'effort", "Démarche ALM : déplacements naturels, évaluation de la situation et des capacités de la personne aidée, modalités d'assistance, aides techniques"],
    validation: "certificat d'acteur PRAP 2S délivré par l'Assurance maladie – Risques professionnels et l'INRS (valable 24 mois, prolongé par un MAC de 14 heures), si l'organisme et le formateur sont habilités ; à défaut, attestation de fin de formation",
  },
  {
    intitule: "Formation de formateurs PRAP IBC", heures: 70,
    rythme: "10 jours en présentiel répartis sur 3 semaines non consécutives, en alternance avec des travaux d'intersession (3 jours)",
    public: "Personnels des entreprises des secteurs IBC (industrie, BTP, commerce et activités de bureau) et des organismes de formation.",
    prerequis: FORMATEURS_PRAP + STRUCTURE_PRAP,
    objectif: "mettre en œuvre des formations d'acteur PRAP IBC dans le cadre d'un projet d'entreprise (référentiel INRS PRAP-IBC 002)",
    competences: ["Élaborer et animer un projet de formation-action PRAP intégré à une démarche de prévention de l'entreprise", "Observer et analyser les risques liés à l'activité physique d'une situation de travail pour proposer des pistes d'amélioration et suivre leur mise en place", "Organiser, animer et évaluer une formation-action des salariés à la prévention des risques liés à l'activité physique"],
    programme: ["Méthodologie de projet et étapes d'un projet de formation-action à la prévention", "Anatomie et physiologie de l'appareil locomoteur", "Risques d'atteinte à la santé : facteurs biomécaniques, psychosociaux, environnement physique", "Analyse des déterminants de l'activité physique ; formalisation et hiérarchisation des pistes d'amélioration", "Conception, organisation, animation et évaluation d'une formation-action PRAP pour les salariés des secteurs IBC"],
    validation: "certificat de formateur PRAP IBC délivré par l'Assurance maladie – Risques professionnels et l'INRS (valable 36 mois, prolongé par un MAC de 21 heures), si la formation est assurée par un formateur de formateurs certifié d'une structure habilitée ; à défaut, attestation de fin de formation",
  },
  {
    intitule: "Formation de formateurs PRAP 2S", heures: 98,
    rythme: "14 jours en présentiel en sessions non consécutives, en alternance avec des travaux d'intersession (3 jours)",
    public: "Personnels des établissements du secteur sanitaire et médico-social et des organismes de formation.",
    prerequis: FORMATEURS_PRAP + "Idéalement, diplôme ou expérience professionnelle en lien avec le secteur. " + STRUCTURE_PRAP,
    objectif: "mettre en œuvre des formations d'acteur PRAP 2S dans le cadre d'un projet d'établissement (référentiel INRS PRAP-2S 003)",
    competences: ["Élaborer et animer un projet de formation-action PRAP intégré à une démarche de prévention de l'établissement", "Observer et analyser les risques liés à l'activité physique d'une situation de travail pour proposer des pistes d'amélioration et suivre leur mise en place", "Organiser, animer et évaluer une formation-action des salariés intégrant l'accompagnement de la mobilité de la personne aidée (ALM)"],
    programme: ["Méthodologie de projet et étapes d'un projet de formation-action à la prévention", "Anatomie et physiologie de l'appareil locomoteur ; facteurs de risque", "Analyse des déterminants de l'activité physique ; pistes d'amélioration", "Enjeux de l'accompagnement de la mobilité de la personne aidée : déplacements naturels, évaluation, modalités d'assistance, aides techniques", "Conception, organisation, animation et évaluation d'une formation-action PRAP pour les salariés du secteur 2S"],
    validation: "certificat de formateur PRAP 2S délivré par l'Assurance maladie – Risques professionnels et l'INRS (valable 36 mois), si la formation est assurée par un formateur de formateurs certifié d'une structure habilitée ; à défaut, attestation de fin de formation",
  },
];

function formation(d: Def): FormationInfo {
  return {
    intitule: d.intitule,
    objectifs: `Formation non certifiante (dispositif de formation du réseau Prévention INRS / Assurance maladie – Risques professionnels).\nObjectif général : ${d.objectif}.\nÀ l'issue de la formation, le stagiaire sera capable de :\n${d.competences.map((c) => `- ${c}.`).join("\n")}`,
    prerequis: d.prerequis,
    duree: `${d.heures} heures`,
    dureeSaisiePrioritaire: true,
    modalites: "présentiel",
    tarif: "",
    programme: `${d.rythme}.\n${d.programme.map((p) => `- ${p}.`).join("\n")}`,
    methodesEvaluation: `Positionnement en début de formation (QCM et questions ouvertes), mises en situation et analyses de situations de travail corrigées, QCM par compétence, évaluation intermédiaire et évaluation finale selon les grilles du dispositif INRS, questionnaires de satisfaction à chaud et à froid. Validation : ${d.validation}.`,
    moyensPedagogiques: "Apports de connaissances, études de cas issus de l'expérience des participants, mises en situation au plus près de l'activité réelle, analyse de situations de travail, supports de cours numériques avec quiz et cas pratiques corrigés, échanges de pratiques ; ressources INRS (brochures, outils de repérage et d'analyse).",
    publicVise: d.public,
    delaiAcces: "14 jours minimum entre la demande d'inscription et l'entrée en formation",
    dateDebut: "",
    dateFin: "",
    lieu: "",
    nombreParticipants: "",
    formateur: "",
    typeAction: "actions-formation",
  };
}

export const [
  FORMATION_TMS_PR, FORMATION_TMS_CP, FORMATION_TMS_FORM_PR, FORMATION_TMS_FORM_CP,
  FORMATION_PRAP_IBC, FORMATION_PRAP_2S, FORMATION_PRAP_IBC_FORM, FORMATION_PRAP_2S_FORM,
] = DEFS.map(formation);
export const FIPU_FORMATIONS: FormationInfo[] = DEFS.map(formation);
