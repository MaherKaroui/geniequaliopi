// Référentiel national qualité (décret n° 2026-728, en vigueur au 01/11/2026) — Spécialisation CFA
// Guide de lecture V9 du 08/01/2024 — 33 indicateurs avec niveau attendu,
// script "ce qu'il faut dire", preuves attendues, statut nouvel entrant et pondération.

export interface IndicateurCFA {
  numero: number;
  critere: number;
  titre: string;
  nouvelEntrant: boolean;
  ponderable: boolean; // true = NC mineure possible, false = NC majeure
  niveauAttendu: string;
  ceQuIlFautDire: string;
  preuves: string[];
  vigilance?: string;
}

export const CRITERES_CFA: Record<number, string> = {
  1: "Information du public sur les prestations, délais d'accès et résultats",
  2: "Identification des objectifs et adaptation aux publics (conception)",
  3: "Adaptation aux publics : accueil, accompagnement, suivi, évaluation",
  4: "Adéquation des moyens pédagogiques, techniques et d'encadrement",
  5: "Qualification et développement des compétences des personnels",
  6: "Inscription et investissement dans l'environnement professionnel",
  7: "Recueil et prise en compte des appréciations et réclamations",
};

export const INDICATEURS_CFA: IndicateurCFA[] = [
  // ===== CRITÈRE 1 =====
  { numero: 1, critere: 1, titre: "Information accessible, détaillée et vérifiable sur les prestations",
    nouvelEntrant: false, ponderable: true,
    niveauAttendu: "Donner une information accessible, exhaustive et à jour sur l'intégralité des items : prérequis, objectifs, durée, modalités et délais d'accès, tarifs, contacts, méthodes mobilisées, modalités d'évaluation, accessibilité PSH. Pour une formation certifiante : libellé exact, code RNCP/RS, nom du certificateur et date d'enregistrement.",
    ceQuIlFautDire: "Notre information est diffusée en amont de toute contractualisation, sur notre site web et nos supports commerciaux. Chaque fiche formation présente les 9 items obligatoires : prérequis, objectifs, durée, modalités et délais d'accès, tarifs, contacts, méthodes, modalités d'évaluation et accessibilité aux PSH. Pour le titre RNCP, nous affichons le libellé exact, le code RNCP, le certificateur et la date d'enregistrement.",
    preuves: ["Fiche formation / Programme CFA", "Plaquette commerciale CFA", "Procédure d'inscription CFA", "CGV CFA", "Livret d'accueil CFA", "Pages site web (captures datées)"] },
  { numero: 2, critere: 1, titre: "Indicateurs de résultats adaptés",
    nouvelEntrant: true, ponderable: true,
    niveauAttendu: "Donner une information chiffrée permettant de suivre les résultats. CFA : indicateurs de l'article L.6111-8 (réussite, insertion, poursuite d'études, rupture), publiés via InserJeunes ; à défaut, calculés et diffusés par le CFA. Nouvel entrant : indicateurs pré-identifiés à l'audit initial.",
    ceQuIlFautDire: "En tant que nouveau CFA, nous n'avons pas encore de cohorte sortie. Nous avons identifié les indicateurs que nous publierons (taux de réussite, d'insertion, de poursuite d'études, de rupture) et nous renvoyons vers InserJeunes pour leur diffusion officielle. Voici notre tableau de bord d'indicateurs et l'emplacement prévu de publication.",
    preuves: ["Tableau des indicateurs de résultats CFA", "Capture page web de publication", "Lien InserJeunes"],
    vigilance: "Un seul document couvre cet indicateur — préparer aussi la capture de la page web où ces indicateurs seront affichés." },
  { numero: 3, critere: 1, titre: "Information sur l'obtention des certifications",
    nouvelEntrant: true, ponderable: true,
    niveauAttendu: "Informer sur les taux d'obtention des certifications préparées, les possibilités de valider des blocs, les équivalences, passerelles, suites de parcours et débouchés. Nouvel entrant : la communication sur les taux est auditée à la surveillance.",
    ceQuIlFautDire: "Pour le titre RNCP, nous communiquons la possibilité de valider par blocs de compétences, les passerelles et débouchés à partir de la fiche RNCP. Étant nouveau CFA, les taux d'obtention réels seront publiés après la première session.",
    preuves: ["Fiche titre RNCP", "Matière / blocs du titre", "Tableau croisé compétences / programme"] },

  // ===== CRITÈRE 2 =====
  { numero: 4, critere: 2, titre: "Analyse du besoin du bénéficiaire",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "Démontrer comment le besoin est analysé en fonction de la finalité. CFA/alternance : analyse prévue en amont de la contractualisation alternant/entreprise, vérifiant l'adéquation des missions de l'entreprise avec le diplôme. PSH : prise en compte des situations de handicap et besoins de compensation. NC MAJEURE.",
    ceQuIlFautDire: "Avant l'entrée, nous analysons le besoin via un entretien individuel et une fiche d'évaluation des besoins, côté apprenant ET côté entreprise. Nous vérifions que les missions proposées par l'employeur correspondent au référentiel du titre. Pour un candidat PSH, une fiche dédiée recense les besoins de compensation.",
    preuves: ["Grille d'entretien individuel candidat", "Procédure d'évaluation des besoins", "Fiche évaluation besoins PSH", "Procédure vérification missions entreprise/certification", "Dossier candidature + trames besoins", "Tableau de suivi du parcours et adaptations (Excel)"] },
  { numero: 5, critere: 2, titre: "Objectifs opérationnels et évaluables",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "Démontrer que les objectifs spécifiques sont définis et évaluables. CFA : objectifs exprimés en compétences/capacités professionnelles et/ou certifications visées. Certifiant : conformes au RNCP/RS. NC MAJEURE.",
    ceQuIlFautDire: "Nos objectifs sont exprimés en compétences professionnelles, directement issus du REAC/référentiel du titre. Chaque module a des objectifs opérationnels et évaluables. La convention de formation par apprentissage et le livret d'apprentissage les formalisent.",
    preuves: ["Convention de formation par apprentissage", "Livret d'apprentissage", "Documents certificateurs CFA", "Synopsis de formation", "Référentiel REAC"] },
  { numero: 6, critere: 2, titre: "Contenus et modalités adaptés",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "Démontrer que contenus et modalités sont adaptés aux objectifs et aux publics. Certifiant : cohérence avec le référentiel RNCP/RS. PSH : prise en compte dans la conception. NC MAJEURE.",
    ceQuIlFautDire: "Notre découpage de formation, notre calendrier annuel et notre support de cours sont conçus à partir du référentiel RNCP. La modalité (présentiel/distanciel/alternance) est ajustée au public et aux contraintes du métier.",
    preuves: ["Découpage de formation CFA (Excel)", "Calendrier annuel CFA", "Support de cours CFA"] },
  { numero: 7, critere: 2, titre: "Adéquation contenus / exigences de la certification",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "Démontrer l'adéquation du contenu aux compétences ciblées et aux épreuves d'évaluation de la certification. La prestation doit être conforme aux référentiels d'activité, de compétences et d'évaluation. NC MAJEURE.",
    ceQuIlFautDire: "Nous présentons le tableau croisé compétences/programme qui démontre que chaque bloc du RNCP est couvert, et que les modalités d'évaluation préparent aux épreuves de certification.",
    preuves: ["Tableau croisé compétences/programme", "Référentiel d'évaluation du certificateur", "Matières du titre"] },
  { numero: 8, critere: 2, titre: "Procédures de positionnement et d'évaluation à l'entrée",
    nouvelEntrant: false, ponderable: true,
    niveauAttendu: "Démontrer l'existence de procédures de positionnement et d'évaluation des acquis à l'entrée, adaptées aux publics. Certifiant : prérequis cohérents avec ceux du RNCP/RS. NC mineure si dispositif incomplet.",
    ceQuIlFautDire: "À l'entrée, chaque apprenant passe un test de positionnement, encadré par une procédure d'évaluation de début de formation et une grille de niveaux.",
    preuves: ["Test de positionnement début de formation", "Procédure d'évaluation de début de formation", "Grille de niveaux", "Tests début & fin nominatifs"] },

  // ===== CRITÈRE 3 =====
  { numero: 9, critere: 3, titre: "Information sur les conditions de déroulement",
    nouvelEntrant: false, ponderable: true,
    niveauAttendu: "Les modalités d'accueil et conditions de déroulement sont formalisées et diffusées (RI, livret d'accueil, convocation, CGU, référents, aspects périphériques). Public mineur : information aux responsables légaux. NC mineure si information partielle.",
    ceQuIlFautDire: "Le règlement intérieur, le livret d'accueil et la convocation détaillent les conditions de déroulement (horaires, locaux, référents, aspects périphériques). Tout est remis à l'apprenti dès l'inscription.",
    preuves: ["Règlement intérieur CFA", "Livret d'accueil CFA", "Convocation CFA", "Convention de formation par apprentissage", "Affichages réglementaires"] },
  { numero: 10, critere: 3, titre: "Mise en œuvre et adaptation de l'accompagnement et du suivi",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "La prestation est adaptée aux situations et profils (contenus, accompagnement, suivi, durées, rythmes) lorsque l'analyse du besoin l'établit. CFA : mise en œuvre des missions d'accompagnement de l'apprenti (art. L.6231-2).",
    ceQuIlFautDire: "Nous adaptons l'accompagnement à chaque apprenti : tableau de suivi parcours, accompagnement distanciel, gestion des absences/abandons, missions des CFA déployées (orientation, social, mobilité).",
    preuves: ["Procédure d'accueil & adaptation CFA", "Accompagnement distanciel CFA", "Tableau de suivi du parcours bénéficiaires", "14 missions CFA — supports déployés"] },
  { numero: 11, critere: 3, titre: "Évaluation de l'atteinte des objectifs",
    nouvelEntrant: true, ponderable: false,
    niveauAttendu: "Démontrer qu'un processus d'évaluation existe, est formalisé et mis en œuvre, et permet d'apprécier l'atteinte des objectifs (à chaud/à froid, auto-évaluation, livret de compétences, preuves de certification). Nouvel entrant : processus formalisé ; mise en œuvre auditée à la surveillance. NC MAJEURE.",
    ceQuIlFautDire: "Notre processus d'évaluation est formalisé : tests début/fin, exercices pratiques par bloc, examen blanc, grille d'acquisition, auto-évaluation, dossier professionnel et livret ECF. En tant que nouveau CFA, la mise en œuvre complète sera vérifiée à la surveillance.",
    preuves: ["Tests début/fin nominatifs", "Exercices pratiques par bloc", "Examen blanc", "Grille d'acquisition / fiche auto-évaluation", "Attestation de réussite, Dossier professionnel"] },
  { numero: 12, critere: 3, titre: "Engagement des bénéficiaires et prévention des ruptures",
    nouvelEntrant: false, ponderable: true,
    niveauAttendu: "Démontrer que des mesures formalisées existent et sont mises en œuvre (gestion des abandons, relances, assiduité, anti-décrochage). > 2 jours. CFA : accompagnement en lien avec le SPE. NC mineure si mise en œuvre partielle.",
    ceQuIlFautDire: "Nous avons une procédure d'abandons, un suivi des logs de connexion, un guide d'entretien des abandons et un accompagnement à la recherche de contrat. Tout est tracé dans nos tableaux de suivi.",
    preuves: ["Procédure d'abandon/absences CFA", "Mesures pour favoriser l'engagement", "Guide d'entretien des abandons", "Logs de connexion CFA", "Suivi public/bénéficiaire (Excel), Tableau PFMP"] },
  { numero: 13, critere: 3, titre: "[Alternance] Coordination centre / entreprise / tuteur",
    nouvelEntrant: true, ponderable: true,
    niveauAttendu: "Démontrer que les principes de la pédagogie de l'alternance sont mis en œuvre via un processus formalisé d'articulation itérative entre centre et entreprise. Nouvel entrant : processus formalisé ; mise en œuvre à la surveillance. NC mineure si mise en œuvre partielle.",
    ceQuIlFautDire: "L'articulation centre/entreprise est formalisée : livret d'apprentissage support du dialogue avec le maître d'apprentissage, grille de compétences alternance, fiches de suivi en entreprise et outil de suivi numérique.",
    preuves: ["Contrat d'apprentissage nominatif", "Grille compétences alternance nominative", "Suivi en entreprise nominatif", "Outils de suivi alternance (Excel)"] },
  { numero: 14, critere: 3, titre: "[Spécifique] Accompagnement socio-professionnel, éducatif et citoyen",
    nouvelEntrant: true, ponderable: false,
    niveauAttendu: "Démontrer que l'accompagnement socio-professionnel, éducatif et relatif à la citoyenneté est formalisé et mis en œuvre via des projets spécifiques (mission des CFA, art. L.6231-2). Nouvel entrant : formalisé ; mise en œuvre à la surveillance. NC MAJEURE.",
    ceQuIlFautDire: "Nous déployons un accompagnement éducatif et citoyen : webinaires, ressources citoyenneté, planning de diffusion des 14 missions, aides au logement (Mobili-Jeune, Visale, Loca-Pass), mobilité, fonds social, prime d'activité et aides régionales.",
    preuves: ["Planning de diffusion des 14 missions CFA", "Ressources citoyenneté", "Webinaires formation", "Notices aides", "QCM 14 missions rempli par l'apprenti"] },
  { numero: 15, critere: 3, titre: "[Spécifique] Information droits/devoirs et santé-sécurité",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "Démontrer que les apprentis sont informés de leurs droits et devoirs (salarié/apprenti) et des règles de santé et sécurité au travail (art. L.6231-2). NC MAJEURE.",
    ceQuIlFautDire: "Le livret d'accueil et la charte intègrent un volet droits/devoirs. Un document dédié couvre les règles de santé et sécurité en milieu professionnel, complété par le livret SST et une attestation de remise signée.",
    preuves: ["Fiche conditions d'accueil / Charte", "Droits et devoirs de l'apprenti", "Règles SST en milieu professionnel", "Livret SST", "Attestation de remise du livret SST signée"] },
  { numero: 16, critere: 3, titre: "[Spécifique] Présentation à la certification conforme aux exigences",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "Le prestataire respecte les exigences formelles de l'autorité de certification lorsqu'il présente des candidats (habilitation, référentiel d'évaluation, règlement d'examen, PV de session, aménagements PSH). NC MAJEURE.",
    ceQuIlFautDire: "Nous respectons les exigences du certificateur : habilitation/convention, référentiel d'évaluation, inscription aux sessions et aménagements PSH. L'attestation de réussite et le livret de suivi en témoignent.",
    preuves: ["Convention/habilitation certificateur", "Livret d'apprentissage nominatif", "Fiche suivi tuteur", "PV de session générique", "Attestation de réussite"] },

  // ===== CRITÈRE 4 =====
  { numero: 17, critere: 4, titre: "Moyens humains, techniques et environnement appropriés",
    nouvelEntrant: false, ponderable: true,
    niveauAttendu: "Démontrer que locaux, équipements et moyens humains sont en adéquation avec les objectifs. CBC : confidentialité. NC mineure si défaut ponctuel.",
    ceQuIlFautDire: "Nos moyens techniques sont opérationnels : licences logiciel, équipements pédagogiques, locaux conformes. Notre inventaire daté détaille l'ensemble.",
    preuves: ["Inventaire daté des moyens (matériel, licences, locaux)", "Plan des locaux", "Photos / attestations de conformité"] },
  { numero: 18, critere: 4, titre: "Coordination des intervenants",
    nouvelEntrant: false, ponderable: true,
    niveauAttendu: "Le prestataire identifie, selon les fonctions nécessaires, les intervenants dont il assure la coordination (organigramme, fiches de poste, CR de réunions). Un indépendant peut assurer seul les fonctions. NC mineure.",
    ceQuIlFautDire: "Nous avons un organigramme, des fiches de poste détaillées par fonction, et des comptes-rendus de réunions pédagogiques mensuels qui tracent la coordination.",
    preuves: ["Organigramme CFA", "Fiches de poste CFA", "CR réunions pédagogiques datés"] },
  { numero: 19, critere: 4, titre: "Ressources pédagogiques et appropriation",
    nouvelEntrant: true, ponderable: true,
    niveauAttendu: "Démontrer que les ressources sont cohérentes avec les objectifs, disponibles, et que des dispositions permettent aux bénéficiaires de se les approprier. FOAD : assistance technique et pédagogique (art. D.6313-3-1). Nouvel entrant : ressources prêtes ; appropriation auditée à la surveillance. NC mineure.",
    ceQuIlFautDire: "Nous mettons à disposition supports de cours, plateforme LMS et guide d'assistance technique et pédagogique FOAD conforme à l'art. D.6313-3-1.",
    preuves: ["Support de cours CFA", "Découpage de formation CFA (Excel)", "Ressources pédagogiques", "Guide d'assistance FOAD"] },
  { numero: 20, critere: 4, titre: "[Spécifique] Personnels dédiés : mobilité, handicap, conseil de perfectionnement",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "Le prestataire présente : liste des membres du conseil de perfectionnement + dernier CR/PV ; personnes dédiées à la mobilité + actions ; référent handicap + ses actions. NC MAJEURE.",
    ceQuIlFautDire: "Nos lettres de mission désignent formellement le référent mobilité et le référent handicap. Le conseil de perfectionnement est constitué et son PV est disponible.",
    preuves: ["Lettre de mission Référent mobilité", "Lettre de mission Référent handicap", "PV du conseil de perfectionnement", "Fiche référent mobilité CFA"] },

  // ===== CRITÈRE 5 =====
  { numero: 21, critere: 5, titre: "Détermination, mobilisation et évaluation des compétences des intervenants",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "Démontrer que les compétences requises sont définies en amont, adaptées, et que leur maîtrise est vérifiée (CV, diplômes, expérience, processus de recrutement, grilles). NC MAJEURE.",
    ceQuIlFautDire: "Nous avons une grille de recrutement formateur, une procédure de sélection, et une grille d'évaluation pédagogique annuelle des intervenants. CV et diplômes sont collectés en amont.",
    preuves: ["Grille de recrutement formateur", "Procédure de sélection formateur", "Grille d'évaluation pédagogique", "CV et diplômes formateurs"] },
  { numero: 22, critere: 5, titre: "Développement et actualisation des compétences des intervenants",
    nouvelEntrant: true, ponderable: false,
    niveauAttendu: "Démontrer la mobilisation de leviers de formation/professionnalisation (plan de développement, entretiens pro, analyse de pratiques). Indépendant : démarche de formation continue. Nouvel entrant : audité à la surveillance. NC MAJEURE.",
    ceQuIlFautDire: "Nous avons un plan de développement des compétences et un dispositif d'entretien professionnel annuel pour chaque intervenant.",
    preuves: ["Plan de développement des compétences", "Entretien professionnel annuel intervenant", "Preuves d'inscription à des formations"] },

  // ===== CRITÈRE 6 =====
  { numero: 23, critere: 6, titre: "Veille légale et réglementaire",
    nouvelEntrant: false, ponderable: true,
    niveauAttendu: "Démontrer une veille légale/réglementaire (champ formation), sa prise en compte et sa communication interne. NC mineure si absence d'exploitation.",
    ceQuIlFautDire: "Nous réalisons une veille structurée (abonnements France Compétences, DRIEETS, Centre Inffo) consignée dans une fiche de veille consolidée, exploitée en revue qualité.",
    preuves: ["Fiche de veille consolidée CFA (réglementaire)", "Sources d'abonnement", "CR exploitation veille"] },
  { numero: 24, critere: 6, titre: "Veille métiers, compétences et emplois",
    nouvelEntrant: true, ponderable: true,
    niveauAttendu: "Démontrer une veille sur l'évolution des compétences/métiers/emplois et son impact. Nouvel entrant : veille en place ; impact à la surveillance. NC mineure.",
    ceQuIlFautDire: "Nous suivons les évolutions du secteur via branches, OPCO, observatoires. La fiche de veille consolidée trace les sources et l'impact prévu sur nos contenus.",
    preuves: ["Fiche de veille consolidée CFA (métiers)", "Échanges avec branches/OPCO", "Études observatoires"] },
  { numero: 25, critere: 6, titre: "Veille innovations pédagogiques et technologiques",
    nouvelEntrant: true, ponderable: true,
    niveauAttendu: "Démontrer une veille sur les innovations pédagogiques/technologiques et son impact. Nouvel entrant : veille en place ; impact à la surveillance. NC mineure.",
    ceQuIlFautDire: "Nous réalisons une veille techno-pédagogique (tableau dédié, newsletters spécialisées dont IA).",
    preuves: ["Fiche de veille consolidée CFA (pédagogique)", "Newsletters spécialisées", "Benchmark outils numériques"] },
  { numero: 26, critere: 6, titre: "Mobilisation autour du handicap",
    nouvelEntrant: true, ponderable: false,
    niveauAttendu: "Démontrer l'identification d'un réseau de partenaires/experts du handicap mobilisable. PSH : modalités de recours et mesures spécifiques. Nouvel entrant : réseau en place. NC MAJEURE.",
    ceQuIlFautDire: "Notre référent handicap dispose d'un réseau (Agefiph, RHF, MDPH, Cap emploi) et d'outils : procédure PSH, annuaire des partenaires handicap apprentissage, fiches pratiques.",
    preuves: ["Procédure d'accueil PSH spécifique CFA", "Annuaire partenaires handicap apprentissage (Agefiph alternance, missions handicap OPCO)", "Référentiel handicap"] },
  { numero: 27, critere: 6, titre: "Sous-traitance / portage salarial",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "Démontrer les dispositions mises en place pour vérifier la conformité au référentiel du sous-traitant (contrats, sélection, pilotage, charte). NC MAJEURE.",
    ceQuIlFautDire: "Nous encadrons nos formateurs externes par un contrat de sous-traitance, une charte qualité formateur et un mandat Qualiopi, avec une checklist de session.",
    preuves: ["Contrat de sous-traitance de formateur", "Charte qualité formateur externe", "Mandat Qualiopi", "Checklist formateur"] },
  { numero: 28, critere: 6, titre: "[Spécifique] Mobilisation du réseau socio-économique (ingénierie)",
    nouvelEntrant: false, ponderable: true,
    niveauAttendu: "Démontrer l'existence d'un réseau de partenaires socio-économiques mobilisé tout au long de la prestation (coconstruction de l'ingénierie, accueil en entreprise). NC mineure.",
    ceQuIlFautDire: "Nous mobilisons un réseau socio-économique (entreprises partenaires, maîtres d'apprentissage, branches pro). Notre annuaire et le CR de coconstruction avec la branche en témoignent.",
    preuves: ["Annuaire entreprises partenaires CFA", "CR coconstruction avec une branche pro", "Fiche maître d'apprentissage"] },

  { numero: 29, critere: 6, titre: "[Spécifique] Insertion professionnelle et poursuite d'études",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "Démontrer la mise en œuvre d'actions concourant à l'insertion professionnelle ou à la poursuite d'études des apprentis (aide à la recherche d'employeur, préparation aux entretiens, suivi des sortants, publication InserJeunes). NC MAJEURE.",
    ceQuIlFautDire: "Nous accompagnons chaque apprenti vers l'emploi ou la poursuite d'études : ateliers CV et entretien, mise en relation avec nos entreprises partenaires, suivi des sortants à 3 et 6 mois. Nos résultats sont publiés via InserJeunes.",
    preuves: ["Procédure insertion professionnelle et poursuite d'études", "Suivi des sortants à 3 et 6 mois", "Questionnaire d'insertion", "Ateliers CV / entretien", "Lien InserJeunes"] },

  // ===== CRITÈRE 7 =====
  { numero: 30, critere: 7, titre: "Recueil des appréciations des parties prenantes",
    nouvelEntrant: false, ponderable: false,
    niveauAttendu: "Démontrer la sollicitation des appréciations à une fréquence pertinente (bénéficiaires, financeurs, équipes pédagogiques, entreprises). Financeur : au moins une fois par an. NC MAJEURE si une partie prenante n'est pas sollicitée.",
    ceQuIlFautDire: "Nous recueillons les appréciations de chaque partie prenante avec des questionnaires distincts : apprenant, entreprise / maître d'apprentissage, financeur (OPCO) et équipe pédagogique.",
    preuves: ["Questionnaire satisfaction apprenant", "Questionnaire satisfaction entreprise / maître d'apprentissage", "Questionnaire satisfaction financeur (OPCO)", "Questionnaire équipe pédagogique"],
    vigilance: "Préparer un questionnaire distinct par partie prenante." },
  { numero: 31, critere: 7, titre: "Traitement des difficultés, réclamations et aléas",
    nouvelEntrant: false, ponderable: true,
    niveauAttendu: "Démontrer la mise en place de modalités de traitement des aléas, difficultés et réclamations (accusé de réception, réponse, registre, suivi). NC mineure.",
    ceQuIlFautDire: "Toute réclamation est enregistrée, accusée, traitée et tracée dans notre registre ; les aléas de session sont consignés et analysés en revue qualité.",
    preuves: ["Formulaire de réclamation", "Procédure de traitement des réclamations", "Registre / suivi des dysfonctionnements", "Compte rendu de formation"] },
  { numero: 32, critere: 7, titre: "Amélioration continue et analyse des risques qualité",
    nouvelEntrant: true, ponderable: false,
    niveauAttendu: "Démontrer une démarche d'amélioration continue alimentée par l'analyse des appréciations et des réclamations, ET (décret 2026-728) une analyse des risques sur la qualité des formations délivrées : cartographie, cotation, mesures de maîtrise, pilotes, revue. Nouvel entrant : démarche formalisée. NC MAJEURE.",
    ceQuIlFautDire: "Nos appréciations et réclamations alimentent un tableau d'amélioration continue. Depuis le décret 2026-728, nous tenons aussi une analyse des risques qualité (probabilité × gravité, mesures, pilote, échéance) revue à chaque conseil de perfectionnement.",
    preuves: ["Tableau d'amélioration continue", "Analyse des risques sur la qualité des formations", "Procédure d'amélioration continue", "Plan d'action insertion / réduction des ruptures"] },
  { numero: 33, critere: 7, titre: "[Spécifique] Évaluation des contenus et des enseignements par les apprenants",
    nouvelEntrant: true, ponderable: true,
    niveauAttendu: "Démontrer un dispositif d'évaluation des contenus et des enseignements par les apprenants, DISTINCT du questionnaire de satisfaction ; le partage des résultats avec l'équipe pédagogique ; la démarche d'amélioration qui en découle et la mesure périodique de son efficacité. Indicateur créé par le décret 2026-728 (pondération à confirmer par le guide de lecture à paraître).",
    ceQuIlFautDire: "À la fin de chaque bloc, les apprentis évaluent les contenus et les enseignements avec une grille dédiée, distincte de la satisfaction. Les résultats sont présentés à l'équipe pédagogique, donnent lieu à un plan d'action, dont nous mesurons l'efficacité à l'évaluation suivante.",
    preuves: ["Procédure d'évaluation des contenus et des enseignements", "Grille d'évaluation des enseignements par apprenant", "Synthèse partagée avec l'équipe pédagogique", "Plan d'action et mesure d'efficacité"],
    vigilance: "Ne pas confondre avec le questionnaire de satisfaction (IND 30) : l'auditeur vérifiera que les deux outils sont distincts." },
];

export function getIndicateurCFA(num: number): IndicateurCFA | undefined {
  return INDICATEURS_CFA.find(i => i.numero === num);
}

export function getIndicateursByCritere(crit: number): IndicateurCFA[] {
  return INDICATEURS_CFA.filter(i => i.critere === crit);
}

export type TypeAuditCFA = 'initial' | 'surveillance' | 'renouvellement';

export function getTypeAuditLabel(t: TypeAuditCFA): string {
  if (t === 'initial') return "AUDIT INITIAL · NOUVEL ENTRANT";
  if (t === 'surveillance') return "AUDIT DE SURVEILLANCE";
  return "AUDIT DE RENOUVELLEMENT";
}

export function getPonderationLabel(ind: IndicateurCFA, isNouvelEntrant: boolean = true): string {
  const ne = isNouvelEntrant && ind.nouvelEntrant;
  if (ne && ind.ponderable) return "NOUVEL ENTRANT · pondérable (NC mineure)";
  if (ne) return "NOUVEL ENTRANT · NC majeure";
  return ind.ponderable ? "pondérable (NC mineure)" : "NC majeure";
}
