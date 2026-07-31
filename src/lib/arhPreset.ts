/**
 * Preset complet "Assistant ressources humaines" (ARH) — Titre professionnel RNCP35030 / TP-01284.
 * Niveau 5, Ministère du Travail — REAC du 03/08/2020 (2 CCP, 6 compétences professionnelles).
 *
 * Contenu :
 *  - Organisme (IZIBUSINESS FORMATION)
 *  - Formation ARH 455 h (2 CCP) — session passée pour générer tous les livrables remplis
 *  - 6 stagiaires cohérents (profils RH / administratif)
 *  - Pack contenu IA (évaluation des besoins humanisée voix stagiaire + exercices corrigés)
 *  - Pack évaluation IA (QCM début/fin 10 Q + cas pratique intermédiaire + évaluation finale 5 MSP)
 *  - Pack veille IA (réglementaire / métier / technologique RH)
 */
import type { FormationInfo, OrganismeInfo, StagiaireInfo } from "@/types/qualiopi";
import type { AIContentPack } from "./aiContentPack";
import type { AIEvalPack } from "./aiEvalPack";
import type { AIVeillePack } from "./aiVeillePack";
import { setCachedContentPack } from "./aiContentPack";
import { setCachedPack as setCachedEvalPack } from "./aiEvalPack";
import { setCachedVeillePack } from "./aiVeillePack";

// ---------------------------------------------------------------------------
// Organisme
// ---------------------------------------------------------------------------
export const ARH_ORG: OrganismeInfo = {
  nom: "IZIBUSINESS FORMATION",
  siret: "892 035 320 00027",
  adresse: "6 rue d'Armaillé",
  codePostal: "75017",
  ville: "PARIS",
  telephone: "01 84 88 07 42",
  email: "formation@izibusiness.fr",
  siteWeb: "https://www.izibusiness.fr",
  nda: "11 75 65432 75",
  dirigeant: "Nadine DENDANI",
  responsablePedagogique: "Nadine DENDANI",
  referentHandicap: "Nadine DENDANI",
  referentQualite: "Nadine DENDANI",
  poleAdministratif: "Nadine DENDANI",
  relationEntreprises: "Nadine DENDANI",
  referentMobilite: "Nadine DENDANI",
  domainesFormation:
    "Ressources humaines, gestion administrative du personnel, paie, recrutement, formation professionnelle, GEPP (NSF 315m)",
  typesActions: ["actions-formation"],
  certifications: "Qualiopi (Actions de formation), habilitation TP-01284 (Assistant ressources humaines)",
  outilsUtilises:
    "Silae, PayFit, Lucca, Factorial, Excel (tableaux de bord RH), DSN-Val, net-entreprises, Légifrance, Welcome to the Jungle, LinkedIn Recruiter, plateforme LMS Moodle",
  version: "1",
  dateMaj: new Date().toISOString().slice(0, 10),
};

// ---------------------------------------------------------------------------
// Formation
// ---------------------------------------------------------------------------
export const FORMATION_ARH: FormationInfo = {
  intitule: "Assistant ressources humaines (ARH) — Titre professionnel RNCP35030",
  codeRNCP: "35030",
  objectifs:
    "Préparer le Titre professionnel Assistant ressources humaines (Niveau 5, RNCP35030, TP-01284) délivré par le Ministère du Travail.\nÀ l'issue de la formation, le/la stagiaire sera capable de :\n- Assurer la gestion administrative du personnel de l'entrée à la sortie du salarié (DPAE, contrats, avenants, absences, soldes de tout compte).\n- Collecter, contrôler et transmettre les variables et paramètres de paie, et vérifier la cohérence des bulletins avec le gestionnaire de paie.\n- Mettre en place et actualiser des tableaux de bord RH (effectifs, absentéisme, turnover, masse salariale, index égalité professionnelle).\n- Contribuer au processus de recrutement et d'intégration : profil de poste, offre d'emploi, sourcing, présélection, parcours d'onboarding.\n- Contribuer à l'élaboration et au suivi du plan de développement des compétences (OPCO, CPF, financements).\n- Contribuer aux opérations liées à la gestion des emplois et carrières (entretiens professionnels, entretiens annuels, GEPP).\n- Assurer une veille juridique et sociale permanente et respecter la confidentialité (RGPD RH).",
  prerequis:
    "Être titulaire d'un diplôme de niveau 4 (baccalauréat) ou justifier d'une expérience professionnelle d'au moins 1 an dans un poste administratif. Maîtrise du français écrit et de la bureautique (Word, Excel, messagerie).",
  duree: "455 heures (dont 385 h en centre et 70 h de période d'application en entreprise)",
  modalites: "présentiel",
  tarif: "6 300 € net de taxe (éligible CPF, financement OPCO, France Travail, ou financement personnel)",
  programme:
    "CCP 1 – ASSURER LES MISSIONS OPÉRATIONNELLES DE LA GESTION DES RESSOURCES HUMAINES (245 h)\n1. Assurer la gestion administrative du personnel : DPAE, rédaction des contrats CDI/CDD et avenants, registre unique du personnel, visites médicales, gestion des absences (maladie, AT, congés), attestations, procédures de sortie et solde de tout compte, dématérialisation des dossiers salariés (RGPD).\n2. Assurer la gestion des variables et paramètres de paie : recueil et contrôle des éléments variables (heures supplémentaires, primes, absences, tickets restaurant), transmission au gestionnaire de paie, contrôle de cohérence du bulletin, DSN mensuelle et événementielle, veille conventionnelle (convention collective applicable).\n3. Mettre en place et actualiser des tableaux de bord RH : construction d'indicateurs (effectifs ETP, pyramide des âges, absentéisme, turnover, masse salariale), BDESE, index égalité professionnelle F/H, exploitation Excel (TCD, graphiques), présentation des résultats à la direction.\n\nCCP 2 – CONTRIBUER AU DÉVELOPPEMENT DES RESSOURCES HUMAINES (140 h)\n4. Contribuer au processus de recrutement et d'intégration du personnel : analyse du besoin, profil de poste, rédaction et diffusion de l'offre (job boards, LinkedIn, réseaux sociaux professionnels), sourcing, tri des candidatures, présélection téléphonique, participation aux entretiens, réponses aux candidats, parcours d'intégration et rapport d'étonnement.\n5. Contribuer à l'élaboration et au suivi du plan de développement des compétences : recueil des besoins, chiffrage, dispositifs (plan, CPF, Pro-A, VAE, alternance), montage des dossiers OPCO, convocations, évaluation des actions, bilan annuel.\n6. Contribuer aux opérations liées à la gestion des emplois et carrières : planification et suivi des entretiens professionnels (obligation tous les 2 ans / état des lieux à 6 ans) et des entretiens annuels d'évaluation, exploitation des comptes rendus, cartographie des compétences, mobilité interne, GEPP.\n\nMODULES TRANSVERSAUX\n- Veille juridique et sociale (Légifrance, convention collective, jurisprudence sociale).\n- Communication professionnelle écrite et orale, posture RH, confidentialité et déontologie.\n- Préparation à l'examen : Dossier Professionnel (DP), mise en situation professionnelle, entretien technique.",
  methodesEvaluation:
    "Test de positionnement à l'entrée (QCM 10 questions), exercices pratiques et QCM par module, cas pratique intermédiaire (traitement complet d'un dossier salarié), test de positionnement de fin (QCM 10 questions), évaluation finale (5 mises en situation professionnelle type examen) conforme au Référentiel d'évaluation TP-01284 : mise en situation professionnelle écrite et informatique, entretien technique, Dossier Professionnel (DP) et entretien final devant jury professionnel. Attestations de fin de formation, questionnaires de satisfaction à chaud et à froid.",
  moyensPedagogiques:
    "Salle équipée de postes individuels (Microsoft 365), accès démo Silae / PayFit / Lucca, modèles de contrats et documents RH réels anonymisés, trames de tableaux de bord Excel (effectifs, absentéisme, turnover, masse salariale), accès Légifrance et conventions collectives, plateforme LMS Moodle (cours, QCM auto-corrigés, tutorat asynchrone), études de cas d'entreprises partenaires, jeux de rôle recrutement et entretien professionnel filmés et débriefés.",
  publicVise:
    "Toute personne souhaitant occuper un poste d'assistant(e) RH, gestionnaire administratif du personnel, chargé(e) de recrutement junior ou assistant(e) formation : salariés en reconversion, demandeurs d'emploi, assistants administratifs souhaitant se spécialiser en RH.",
  delaiAcces: "Inscription possible jusqu'à 14 jours ouvrés avant le démarrage de la session, sous réserve de places disponibles.",
  dateDebut: "2025-09-15",
  dateFin: "2026-03-13",
  lieu: "IZIBUSINESS FORMATION — 6 rue d'Armaillé, 75017 PARIS",
  nombreParticipants: "6",
  formateur: "NADINE DENDANI",
};

// ---------------------------------------------------------------------------
// Stagiaires (6)
// ---------------------------------------------------------------------------
export const STAGIAIRES_ARH: StagiaireInfo[] = [
  { civilite: "Mme", nom: "BENALI", prenom: "Sofia", email: "sofia.benali.rh@gmail.com", telephone: "07 61 24 88 15", entreprise: "GROUPE TERRALIS (BTP, 145 salariés)", poste: "Assistante administrative", dateNaissance: "1994-03-08", adresse: "12 rue des Lilas", codePostal: "93100", commune: "MONTREUIL", dateDebutFormation: "2025-09-15", dateFinFormation: "2026-03-13", tarifFormation: "6300" },
  { civilite: "Mme", nom: "LEROUX", prenom: "Camille", email: "camille.leroux28@outlook.fr", telephone: "06 52 19 74 33", entreprise: "", poste: "En reconversion professionnelle", dateNaissance: "1990-11-21", adresse: "8 avenue Gambetta", codePostal: "75020", commune: "PARIS", dateDebutFormation: "2025-09-15", dateFinFormation: "2026-03-13", tarifFormation: "6300" },
  { civilite: "M.", nom: "N'DIAYE", prenom: "Ibrahim", email: "ibrahim.ndiaye.pro@gmail.com", telephone: "07 45 09 62 71", entreprise: "CLEANPRO SERVICES (propreté, 320 salariés)", poste: "Assistant d'exploitation", dateNaissance: "1992-06-14", adresse: "25 rue Jean Jaurès", codePostal: "94200", commune: "IVRY-SUR-SEINE", dateDebutFormation: "2025-09-15", dateFinFormation: "2026-03-13", tarifFormation: "6300" },
  { civilite: "Mme", nom: "MARCHAND", prenom: "Élodie", email: "elodie.marchand.rh@gmail.com", telephone: "06 88 37 12 40", entreprise: "MEDIALIS CONSEIL (agence conseil, 48 salariés)", poste: "Office manager", dateNaissance: "1988-01-30", adresse: "3 place de la République", codePostal: "92300", commune: "LEVALLOIS-PERRET", dateDebutFormation: "2025-09-15", dateFinFormation: "2026-03-13", tarifFormation: "6300" },
  { civilite: "Mme", nom: "PEREIRA", prenom: "Ana", email: "ana.pereira.form@outlook.fr", telephone: "07 70 55 28 96", entreprise: "", poste: "Demandeuse d'emploi (ex-vendeuse)", dateNaissance: "1996-09-05", adresse: "17 rue de Chanzy", codePostal: "93500", commune: "PANTIN", dateDebutFormation: "2025-09-15", dateFinFormation: "2026-03-13", tarifFormation: "6300" },
  { civilite: "M.", nom: "FONTAINE", prenom: "Julien", email: "julien.fontaine.rh@gmail.com", telephone: "06 14 78 90 25", entreprise: "LOGIFRET IDF (transport, 210 salariés)", poste: "Gestionnaire administratif du personnel", dateNaissance: "1991-04-19", adresse: "40 boulevard Voltaire", codePostal: "75011", commune: "PARIS", dateDebutFormation: "2025-09-15", dateFinFormation: "2026-03-13", tarifFormation: "6300" },
];

// ---------------------------------------------------------------------------
// Pack contenu (évaluation des besoins humanisée + exercices)
// ---------------------------------------------------------------------------
const ARH_CONTENT_PACK: AIContentPack = {
  besoins: {
    besoinsList: [
      "Mon objectif c'est vraiment d'obtenir le titre pour évoluer en interne : aujourd'hui je fais déjà les DPAE et les contrats mais sans le diplôme ma responsable ne peut pas me passer assistante RH officiellement.",
      "Ce qui me bloque le plus c'est la paie. Je transmets les variables à notre cabinet mais je suis incapable de vérifier si le bulletin est juste, du coup je signe sans comprendre et ça me met mal à l'aise.",
      "Franchement les contrats CDD je m'y perds : motif de recours, durée maximale, délai de carence... j'ai peur de faire une erreur qui requalifierait le contrat en CDI, on m'a raconté un contentieux prud'hommes chez un concurrent.",
      "Moi je suis en reconversion, j'ai fait 8 ans dans la vente. Mon besoin c'est tout : le vocabulaire RH, le droit du travail, les tableaux de bord. Je pars vraiment de zéro et j'ai besoin qu'on aille pas trop vite au début.",
      "Ce que j'attends surtout c'est Excel appliqué aux RH. On me demande le taux d'absentéisme du trimestre et je le calcule à la main sur un coin de feuille, alors qu'un TCD ferait ça en 2 minutes.",
      "Le recrutement m'intéresse beaucoup. J'ai déjà passé des appels de présélection mais sans méthode, je discute et à la fin je me rends compte que j'ai oublié de demander les prétentions salariales et la disponibilité.",
      "Mon vrai besoin c'est les entretiens professionnels : on est 145 dans la boîte, personne ne les a faits depuis 3 ans et je sais qu'on risque un abondement correctif de 3 000 € par salarié. Il me faut une méthode et un planning.",
      "Le plan de développement des compétences je le subis plus que je le pilote : je remplis les dossiers OPCO au dernier moment et souvent on rate les délais de prise en charge, ça coûte cher à l'entreprise.",
      "Ce qui me stresse c'est la confidentialité. On me demande parfois des infos sur les salaires de collègues et je ne sais jamais quoi répondre, j'aimerais avoir des repères clairs sur le RGPD RH.",
      "Moi je veux surtout retrouver un emploi rapidement. France Travail m'a conseillé ce titre parce qu'il y a des offres. Mon besoin c'est du concret : des vrais documents, des vrais cas, et une préparation solide au DP et au jury.",
    ],
    syntheseHtml:
      "6 stagiaires sur 6 visent le Titre professionnel Assistant ressources humaines (RNCP35030, niveau 5).<br>4 sur 6 sont déjà en poste administratif et exercent partiellement des missions RH sans en maîtriser le cadre juridique ; 2 sur 6 sont en reconversion complète (vente, demandeur d'emploi).<br>5 sur 6 citent le contrôle des variables et la lecture du bulletin de paie comme premier axe de progression.<br>4 sur 6 se disent en insécurité juridique sur les contrats (CDD, motifs de recours, période d'essai, rupture).<br>4 sur 6 ne savent pas construire un tableau de bord RH sous Excel (TCD, absentéisme, turnover, masse salariale).<br>3 sur 6 ont une pratique du recrutement empirique, sans trame d'entretien ni grille d'évaluation.<br>3 sur 6 signalent un retard sur les entretiens professionnels obligatoires dans leur entreprise (risque d'abondement correctif).<br>6 sur 6 attendent des cas pratiques réels, des trames réutilisables en poste et une préparation structurée au Dossier Professionnel et au jury.",
    adaptationsHtml:
      "• Progression 60 % pratique / 40 % apport théorique, avec documents réels anonymisés (contrats, bulletins, DSN, BDESE).<br>• Mise à niveau « socle droit du travail et vocabulaire RH » (14 h) en début de parcours pour les 2 stagiaires en reconversion, en parallèle d'ateliers d'approfondissement pour les 4 déjà en poste.<br>• Atelier Excel RH dédié (TCD, formules, graphiques) avec construction d'un tableau de bord complet réutilisable en entreprise.<br>• Chaque stagiaire travaille sur un cas fil rouge issu de sa propre entreprise (ou d'une entreprise fictive fournie pour les stagiaires sans employeur).<br>• Jeux de rôle filmés : présélection téléphonique, entretien de recrutement, entretien professionnel — débriefing individuel et grille d'auto-évaluation.<br>• Module RGPD RH et confidentialité avec cas concrets (« que puis-je dire, à qui, et sous quelle forme ? »).<br>• Accompagnement individualisé au Dossier Professionnel : 4 séances jalonnées + 1 examen blanc complet en février avec jury externe.<br>• Accessibilité : supports numériques adaptables (taille de police, contraste), pauses aménagées, référent handicap identifié.",
  },
  chapters: [],
  exercises: [
    {
      titre: "Rédiger une DPAE et un contrat CDD conforme",
      consigne:
        "L'entreprise TERRALIS embauche M. Karim HADDAD en CDD du 6 octobre 2025 au 31 janvier 2026 pour remplacer Mme Dupont en congé maternité, poste de conducteur de travaux, statut ETAM, 35 h/semaine, 2 450 € brut mensuel, convention collective du Bâtiment. Listez les formalités d'embauche dans l'ordre et indiquez les mentions obligatoires du contrat.",
      reponseAttendue:
        "FORMALITÉS, DANS L'ORDRE :\n1. DPAE via net-entreprises, au plus tôt 8 jours avant l'embauche et au plus tard dans les instants qui précèdent (accusé de réception à conserver).\n2. Rédaction et signature du CDD : remise au salarié dans les 2 jours ouvrables suivant l'embauche.\n3. Inscription au registre unique du personnel (RUP) dès l'entrée.\n4. Affiliation mutuelle et prévoyance (ou dispense écrite si cas prévu).\n5. Déclaration à la médecine du travail : visite d'information et de prévention dans les 3 mois.\n6. Ouverture du dossier salarié dématérialisé (RGPD : durée de conservation, accès restreint).\n7. Intégration en paie : création du salarié dans le logiciel, transmission au gestionnaire, DSN du mois.\n\nMENTIONS OBLIGATOIRES DU CDD :\n- Motif précis du recours : remplacement de Mme DUPONT, salariée absente pour congé maternité (nom et qualification du salarié remplacé).\n- Date de début et date de fin (ou terme imprécis = retour du salarié remplacé).\n- Poste occupé et qualification : conducteur de travaux, statut ETAM, position/coefficient conventionnel.\n- Durée de la période d'essai : 1 jour par semaine de contrat, plafonnée à 1 mois (CDD > 6 mois).\n- Rémunération : 2 450 € brut mensuel pour 35 h hebdomadaires.\n- Convention collective applicable : Bâtiment ETAM.\n- Nom et adresse de la caisse de retraite complémentaire et de l'organisme de prévoyance.\n- Indemnité de fin de contrat (10 %) sauf cas d'exclusion.\n\nPOINT DE VIGILANCE : un CDD non écrit ou sans motif est réputé conclu à durée indéterminée.",
      points: 5,
    },
    {
      titre: "Contrôler les variables de paie avant transmission",
      consigne:
        "Vous préparez la transmission des variables de novembre pour 145 salariés. Décrivez votre méthode de collecte et de contrôle, et citez 6 points de contrôle avant envoi au gestionnaire de paie.",
      reponseAttendue:
        "MÉTHODE :\n1. Rétroplanning mensuel : clôture des variables au 20 du mois, transmission au 22, bulletins au 28, virement au 30.\n2. Collecte par sources : logiciel de gestion des temps (heures, absences), managers (primes, astreintes), notes de frais, arrêts de travail, tickets restaurant.\n3. Consolidation dans un fichier unique de variables (1 ligne par salarié, colonnes normalisées).\n\n6 POINTS DE CONTRÔLE :\n1. Cohérence entrées/sorties du mois avec le registre unique du personnel (aucun salarié oublié, aucun sortant payé à tort).\n2. Contrôle des heures supplémentaires : majoration 25 % (8 premières heures) puis 50 %, respect des durées maximales (10 h/jour, 48 h/semaine).\n3. Absences : justificatif présent pour chaque absence (arrêt maladie, AT, congé), maintien de salaire selon la convention collective, subrogation IJSS.\n4. Tickets restaurant : nombre = jours travaillés effectifs, déduction des jours d'absence et de télétravail selon accord.\n5. Éléments exceptionnels : primes soumises à cotisations, remboursements de frais non soumis, respect des plafonds URSSAF.\n6. Comparatif M-1 : contrôle des écarts significatifs (> 10 %) salarié par salarié pour détecter une anomalie de saisie.\n\nAPRÈS RETOUR DES BULLETINS : contrôle du brut, du net à payer, du net imposable, du cumul congés payés, puis validation de la DSN mensuelle avant le 5 ou le 15 selon l'effectif.",
      points: 5,
    },
    {
      titre: "Construire un tableau de bord RH sous Excel",
      consigne:
        "La direction demande un tableau de bord trimestriel. Indiquez les indicateurs à retenir, leurs formules de calcul et la mise en forme Excel préconisée.",
      reponseAttendue:
        "INDICATEURS ET FORMULES :\n- Effectif inscrit (fin de période) et effectif ETP = somme des quotités de travail.\n- Taux d'absentéisme = (heures d'absence / heures théoriques travaillées) × 100. Distinguer maladie, AT, absences injustifiées.\n- Turnover = ((nombre d'entrées + nombre de sorties) / 2) / effectif moyen × 100.\n- Pyramide des âges : répartition par tranches de 10 ans et par sexe (histogramme).\n- Masse salariale brute mensuelle et évolution en % vs N-1.\n- Répartition des contrats : CDI / CDD / alternance / intérim.\n- Index égalité professionnelle F/H (obligatoire ≥ 50 salariés, publication au 1er mars).\n\nMISE EN FORME EXCEL :\n1. Une feuille « Données » brute (une ligne par salarié : matricule, sexe, date de naissance, date d'entrée, contrat, quotité, salaire brut, heures d'absence).\n2. Une feuille « TCD » avec tableaux croisés dynamiques par service et par mois.\n3. Une feuille « Tableau de bord » : 6 à 8 indicateurs clés, graphiques (histogramme pyramide, courbe absentéisme, camembert contrats), mise en forme conditionnelle (vert/orange/rouge selon seuils).\n4. Anonymisation : ne jamais diffuser de données nominatives de rémunération ; agréger par service avec un seuil minimum de 5 salariés (RGPD).\n5. Actualisation : bouton « Actualiser tout », date de mise à jour visible en en-tête, commentaire d'analyse en 5 lignes pour la direction.",
      points: 5,
    },
    {
      titre: "Rédiger une offre d'emploi et organiser la présélection",
      consigne:
        "MEDIALIS CONSEIL recrute un(e) chargé(e) de communication en CDI. Rédigez la structure de l'offre d'emploi et la trame de présélection téléphonique (10 min).",
      reponseAttendue:
        "STRUCTURE DE L'OFFRE :\n1. Titre du poste clair et recherché : « Chargé(e) de communication H/F – CDI – Levallois-Perret ».\n2. Présentation de l'entreprise en 4 lignes (activité, taille, valeurs, ambiance).\n3. Missions principales : 5 à 7 puces commençant par un verbe d'action.\n4. Profil recherché : formation, expérience, compétences techniques (Canva, réseaux sociaux, rédaction web), qualités attendues.\n5. Conditions : type de contrat, date de prise de poste, rémunération ou fourchette, télétravail, avantages (mutuelle, tickets restaurant).\n6. Processus de recrutement : « entretien RH puis entretien opérationnel, réponse sous 15 jours ».\n7. Mentions légales : non-discrimination (art. L1132-1 du Code du travail), écriture H/F, accessibilité aux personnes en situation de handicap.\n8. Diffusion : site carrière, Welcome to the Jungle, LinkedIn, APEC, cooptation interne.\n\nTRAME DE PRÉSÉLECTION TÉLÉPHONIQUE (10 min) :\n1. Se présenter, vérifier la disponibilité de l'interlocuteur (2 min).\n2. Rappeler le poste et le contexte.\n3. Questions : parcours en 3 minutes / motivation pour ce poste et cette entreprise / 2 questions techniques ciblées / outils maîtrisés.\n4. Éléments factuels à sécuriser : disponibilité et préavis, prétentions salariales, mobilité et temps de trajet, contraintes éventuelles.\n5. Présenter la suite du processus et les délais.\n6. Remplir immédiatement la grille de présélection (notation 1 à 4 sur 5 critères, avis go / no-go argumenté).\n7. Réponse à tous les candidats, y compris négative, sous 15 jours.\n\nINTERDIT : questions sur la situation familiale, la santé, la religion, l'origine, la grossesse ou l'appartenance syndicale.",
      points: 5,
    },
    {
      titre: "Planifier et exploiter les entretiens professionnels",
      consigne:
        "Aucun entretien professionnel n'a été réalisé depuis 3 ans dans une entreprise de 145 salariés. Décrivez le plan de rattrapage, le risque encouru et l'exploitation des comptes rendus.",
      reponseAttendue:
        "RISQUE : l'entretien professionnel est obligatoire tous les 2 ans, avec un état des lieux récapitulatif tous les 6 ans (art. L6315-1). Dans les entreprises d'au moins 50 salariés, le défaut d'entretien ou de formation non obligatoire ouvre droit à un abondement correctif de 3 000 € par salarié sur son CPF. Risque financier ici potentiellement très élevé, plus un risque prud'homal (manquement à l'obligation d'employabilité).\n\nPLAN DE RATTRAPAGE :\n1. Extraire la liste des 145 salariés avec date d'entrée et date du dernier entretien (fichier de suivi Excel).\n2. Prioriser : salariés à l'approche de l'échéance des 6 ans, retours de congé maternité / longue maladie / mandat, puis le reste par service.\n3. Planifier sur 4 mois : 8 à 10 entretiens par semaine répartis entre les managers.\n4. Former les managers (demi-journée) : posture, distinction entretien professionnel / entretien annuel d'évaluation, trame commune.\n5. Convoquer chaque salarié par écrit au moins 15 jours avant, avec la trame en pièce jointe pour préparation.\n6. Réaliser l'entretien : projet professionnel, souhaits de formation et de mobilité, VAE, CPF, perspectives d'évolution. Compte rendu signé par les deux parties, copie remise au salarié.\n\nEXPLOITATION :\n- Saisir les demandes dans un fichier consolidé (besoin, priorité, dispositif, coût estimé).\n- Alimenter le plan de développement des compétences N+1 et le budget prévisionnel OPCO.\n- Construire une cartographie des compétences et identifier les viviers de mobilité interne (GEPP).\n- Restituer une synthèse anonymisée à la direction et au CSE.\n- Archiver les comptes rendus dans le dossier salarié (accès restreint RH, conservation conforme RGPD).",
      points: 5,
    },
  ],
  ressources: {
    supportsHtml:
      "Support de cours ARH (plus de 30 pages) structuré par CCP : gestion administrative du personnel, variables de paie et DSN, tableaux de bord RH, recrutement et intégration, plan de développement des compétences, entretiens et GEPP.<br>Trames réutilisables : contrat CDI, contrat CDD, avenant, attestation employeur, courrier de convocation, trame d'entretien professionnel, grille de présélection, tableau de bord Excel.<br>Fiches mémo : durées de conservation des documents RH, calendrier social annuel, seuils d'effectifs (11, 50, 250 salariés).",
    outilsHtml:
      "Silae et PayFit (accès démo), Lucca (absences et congés), Excel (TCD, mise en forme conditionnelle), net-entreprises (DPAE, DSN), Légifrance et conventions collectives en ligne, LinkedIn Recruiter et Welcome to the Jungle, plateforme LMS Moodle (QCM auto-corrigés, dépôt des travaux).",
    ressourcesComplHtml:
      "<ul><li><a href=\"https://www.francecompetences.fr/recherche/rncp/35030/\">Fiche RNCP35030 — Assistant ressources humaines</a></li><li><a href=\"https://travail-emploi.gouv.fr/\">Ministère du Travail — REAC et RE TP-01284</a></li><li><a href=\"https://www.legifrance.gouv.fr/\">Légifrance — Code du travail</a></li><li><a href=\"https://www.urssaf.fr/\">URSSAF — cotisations et plafonds</a></li><li><a href=\"https://www.net-entreprises.fr/\">net-entreprises — DPAE et DSN</a></li><li><a href=\"https://www.cnil.fr/fr/la-gestion-des-ressources-humaines\">CNIL — RGPD et gestion RH</a></li></ul>",
    videos: [
      { title: "Comprendre le bulletin de paie ligne par ligne", description: "Décryptage des rubriques du bulletin simplifié et du net social.", url: "https://www.youtube.com/results?search_query=comprendre+bulletin+de+paie+2026" },
      { title: "Réussir l'entretien professionnel obligatoire", description: "Cadre légal, trame et erreurs à éviter.", url: "https://www.youtube.com/results?search_query=entretien+professionnel+obligatoire+RH" },
      { title: "Construire un tableau de bord RH sur Excel", description: "Indicateurs, TCD et graphiques de pilotage social.", url: "https://www.youtube.com/results?search_query=tableau+de+bord+RH+excel" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack évaluation (QCM + exercices + corrigés)
// ---------------------------------------------------------------------------
const q = (question: string, options: string[], correctIndex: number) => ({ question, options, correctIndex });

const ARH_EVAL_PACK: AIEvalPack = {
  qcmDebut: [
    q("La DPAE doit être transmise à l'URSSAF :", ["Dans le mois suivant l'embauche", "Au plus tôt 8 jours avant l'embauche et au plus tard avant la prise de poste", "Le jour de la première paie", "Uniquement pour les CDI"], 1),
    q("Le registre unique du personnel doit être tenu :", ["Par entreprise et par établissement", "Uniquement au siège social", "Seulement au-delà de 50 salariés", "Il n'est plus obligatoire"], 0),
    q("Un CDD conclu sans écrit est :", ["Nul", "Réputé conclu à durée indéterminée", "Valable 3 mois", "Automatiquement renouvelé"], 1),
    q("La DSN mensuelle doit être déposée au plus tard :", ["Le 5 ou le 15 du mois suivant selon l'effectif", "Le dernier jour du mois", "Le 20 de chaque mois", "Une fois par trimestre"], 0),
    q("Le taux d'absentéisme se calcule :", ["Nombre d'absents / effectif", "Heures d'absence / heures théoriques travaillées × 100", "Jours de congés / jours ouvrés", "Absences / turnover"], 1),
    q("L'entretien professionnel est obligatoire :", ["Tous les ans", "Tous les 2 ans avec un état des lieux tous les 6 ans", "Tous les 5 ans", "Uniquement à la demande du salarié"], 1),
    q("Les 8 premières heures supplémentaires hebdomadaires sont majorées de :", ["10 %", "25 %", "50 %", "100 %"], 1),
    q("L'OPCO est :", ["Un organisme paritaire qui finance la formation professionnelle", "Une caisse de retraite", "Un service de l'URSSAF", "Une mutuelle obligatoire"], 0),
    q("Lors d'un entretien de recrutement, il est interdit de demander :", ["Les prétentions salariales", "La disponibilité", "La situation familiale ou un projet de grossesse", "Les compétences techniques"], 2),
    q("Le respect du RGPD en RH impose notamment :", ["De conserver tous les dossiers indéfiniment", "De limiter la durée de conservation et l'accès aux données", "De publier les salaires en interne", "De transmettre les CV à tous les managers"], 1),
  ],
  qcmFin: [
    q("La période d'essai d'un CDD de 6 mois est au maximum de :", ["3 jours", "2 semaines", "1 mois", "3 mois"], 2),
    q("L'indemnité de fin de contrat (prime de précarité) d'un CDD est de :", ["5 % de la rémunération brute totale", "10 % de la rémunération brute totale", "20 % du dernier salaire", "Aucune indemnité"], 1),
    q("La subrogation consiste à :", ["Verser les IJSS directement au salarié", "Permettre à l'employeur de percevoir les IJSS en maintenant le salaire", "Suspendre le contrat de travail", "Réduire la rémunération pendant l'arrêt"], 1),
    q("Le turnover se calcule :", ["((entrées + sorties)/2) / effectif moyen × 100", "Sorties / entrées", "Effectif / absences", "Sorties × 12"], 0),
    q("L'index égalité professionnelle F/H doit être publié chaque année avant le :", ["1er janvier", "1er mars", "30 juin", "31 décembre"], 1),
    q("En l'absence d'entretien professionnel dans une entreprise d'au moins 50 salariés, l'abondement correctif du CPF est de :", ["500 €", "1 500 €", "3 000 €", "6 000 €"], 2),
    q("La BDESE est :", ["La base de données économiques, sociales et environnementales mise à disposition du CSE", "Un logiciel de paie", "Un registre de sécurité", "Une déclaration fiscale"], 0),
    q("Le rapport d'étonnement s'inscrit dans :", ["La procédure disciplinaire", "Le parcours d'intégration d'un nouveau collaborateur", "L'entretien de départ", "Le bilan de compétences"], 1),
    q("Le CPF peut être mobilisé :", ["Uniquement par l'employeur", "À l'initiative du salarié, avec accord de l'employeur si la formation est sur le temps de travail", "Seulement en cas de licenciement", "Uniquement pour un bilan de compétences"], 1),
    q("La durée de conservation d'un bulletin de paie par l'employeur est de :", ["1 an", "3 ans", "5 ans", "50 ans (version dématérialisée) / 5 ans minimum"], 3),
  ],
  exerciceIntermediaire: {
    titre: "Cas pratique intermédiaire — Traitement complet d'un dossier salarié (entrée à sortie)",
    contexte:
      "Vous êtes assistant(e) RH chez LOGIFRET IDF (transport, 210 salariés, convention collective des transports routiers). Le 12 janvier 2026, la direction vous informe de l'embauche de Mme Sarah MOREAU en CDI, exploitante transport, prise de poste le 2 février 2026, 39 h/semaine (35 h + 4 h supplémentaires structurelles), 2 700 € brut mensuel, statut agent de maîtrise. Le même mois, M. Alain PETIT (CDI, 12 ans d'ancienneté) démissionne avec un préavis d'un mois.",
    questions: [
      {
        question: "Détaillez toutes les formalités d'embauche de Mme MOREAU, dans l'ordre chronologique, avec les délais associés.",
        reponseAttendue:
          "1. Avant le 2 février : DPAE via net-entreprises (au plus tôt 8 jours avant, au plus tard avant la prise de poste) — conserver l'accusé de réception.\n2. Rédiger le CDI : identité des parties, poste et classification conventionnelle, lieu de travail, durée du travail 39 h avec 4 heures supplémentaires structurelles majorées à 25 %, rémunération, période d'essai (3 mois renouvelable une fois pour un agent de maîtrise, sous réserve de la convention collective), convention collective applicable, mutuelle et prévoyance, clause de confidentialité, mention RGPD.\n3. Signature avant ou le jour de la prise de poste, exemplaire remis à la salariée.\n4. Inscription au registre unique du personnel dès l'entrée (nom, emploi, qualification, dates d'entrée et de sortie).\n5. Affiliation mutuelle et prévoyance dans le mois, ou recueil d'une dispense écrite si cas prévu.\n6. Déclaration à la médecine du travail : visite d'information et de prévention dans les 3 mois (avant la prise de poste si poste à risque).\n7. Création du dossier salarié dématérialisé : pièce d'identité, RIB, attestation de sécurité sociale, diplôme, permis si nécessaire — accès restreint RH, durée de conservation définie.\n8. Création dans le logiciel de paie et transmission des éléments au gestionnaire pour la paie de février ; intégration en DSN.\n9. Préparation de l'onboarding : livret d'accueil, badge, matériel, planning d'intégration, désignation d'un référent, rapport d'étonnement à 30 jours.",
        points: 5,
      },
      {
        question: "Rédigez le courrier de réponse à la démission de M. PETIT et listez les documents de fin de contrat.",
        reponseAttendue:
          "COURRIER (LRAR ou remise en main propre contre décharge) :\n« Monsieur,\nNous accusons réception de votre courrier du [date] par lequel vous nous faites part de votre démission du poste d'exploitant transport que vous occupez depuis le [date d'entrée].\nConformément à la convention collective des transports routiers et à votre statut, votre préavis d'une durée d'un mois débutera le [date de réception] pour se terminer le [date de fin].\nVotre dernier jour travaillé sera donc le [date]. Nous vous remercions de bien vouloir restituer à cette date l'ensemble du matériel mis à votre disposition (badge, téléphone, ordinateur portable, clés).\nVos documents de fin de contrat vous seront remis à cette date.\nNous vous remercions pour votre collaboration au cours de ces douze années et vous prions d'agréer, Monsieur, l'expression de nos salutations distinguées. »\n\nDOCUMENTS DE FIN DE CONTRAT (remis le dernier jour) :\n- Certificat de travail (dates d'entrée et de sortie, emplois occupés).\n- Attestation France Travail (transmise également en ligne).\n- Reçu pour solde de tout compte détaillé, en double exemplaire.\n- État récapitulatif de l'épargne salariale, le cas échéant.\n- Information sur la portabilité de la mutuelle et de la prévoyance.\n\nSOLDE DE TOUT COMPTE : dernier salaire, indemnité compensatrice de congés payés, RTT non pris, primes au prorata. Pas d'indemnité de licenciement (démission). DSN événementielle de fin de contrat à transmettre dans les 5 jours.",
        points: 5,
      },
      {
        question: "Quelles variables de paie transmettez-vous pour le mois de février, et quels contrôles réalisez-vous à réception des bulletins ?",
        reponseAttendue:
          "VARIABLES TRANSMISES :\n- Entrée de Mme MOREAU au 2 février : salaire proratisé sur les jours travaillés, 4 heures supplémentaires structurelles hebdomadaires majorées à 25 %, tickets restaurant selon jours travaillés.\n- Sortie de M. PETIT : dernier jour travaillé, solde de congés payés, RTT restants, prime éventuelle au prorata, restitution matériel.\n- Absences du mois : arrêts maladie (avec dates et attestations), congés payés posés, absences injustifiées.\n- Heures supplémentaires réelles des conducteurs et exploitants issues du logiciel de gestion des temps.\n- Primes variables (astreintes, primes de nuit, paniers repas conventionnels).\n- Notes de frais validées et remboursements non soumis à cotisations.\n\nCONTRÔLES À RÉCEPTION :\n1. Rapprochement effectif : nombre de bulletins = effectif du registre + entrées − sorties.\n2. Bulletin de Mme MOREAU : proratisation correcte, majoration des heures supplémentaires, classification conventionnelle, mutuelle prélevée.\n3. Bulletin de M. PETIT : présence de l'indemnité compensatrice de congés payés, net à payer conforme au solde calculé.\n4. Contrôle des écarts significatifs vs janvier (> 10 %) et justification de chacun.\n5. Vérification du net social, du net imposable et des cumuls congés payés.\n6. Validation de la DSN de février avant l'échéance légale, contrôle des retours CRM (comptes rendus métier) et correction des anomalies signalées.",
        points: 5,
      },
      {
        question: "Le directeur vous demande un point sur l'absentéisme et le turnover du trimestre. Comment procédez-vous ?",
        reponseAttendue:
          "1. Extraire les données du logiciel de gestion des temps et de la paie sur janvier-mars : heures d'absence par motif, heures théoriques, entrées, sorties, effectif début et fin de période.\n2. Calculer :\n   - Taux d'absentéisme = heures d'absence / heures théoriques travaillées × 100, décliné par motif (maladie, AT, absences injustifiées) et par service.\n   - Turnover = ((entrées + sorties)/2) / effectif moyen × 100, avec un focus sur les départs en période d'essai.\n   - Ancienneté moyenne et pyramide des âges pour éclairer les résultats.\n3. Construire le tableau de bord Excel : feuille de données brutes anonymisées, TCD par service et par mois, graphiques (courbe d'absentéisme, histogramme des départs), mise en forme conditionnelle sur seuils d'alerte.\n4. Analyser : identifier les services au-dessus de la moyenne, la saisonnalité, le poids des arrêts de longue durée, les causes probables (conditions de travail, management, rémunération, trajets).\n5. Restituer une synthèse d'une page : 4 indicateurs clés, 3 constats, 3 propositions d'action (entretiens de retour d'absence, plan de prévention des TMS, révision du parcours d'intégration).\n6. Respecter la confidentialité : aucune donnée nominative, agrégation par service avec un seuil minimum de 5 salariés.",
        points: 5,
      },
    ],
  },
  evaluationFinale: {
    titre: "Évaluation finale — 5 mises en situation professionnelle (type examen TP-01284)",
    exercices: [
      {
        titre: "MSP 1 — Régulariser un dossier administratif du personnel non conforme",
        consigne:
          "Lors d'un audit interne, vous constatez : 3 contrats CDD sans motif de recours écrit, 12 salariés sans visite médicale, un registre unique du personnel non tenu à jour depuis 8 mois, et des dossiers salariés contenant des copies de cartes vitales conservées sans base légale. Rédigez votre plan de mise en conformité priorisé.",
        reponseAttendue:
          "PRIORITÉ 1 — RISQUE DE REQUALIFICATION (immédiat) : régulariser les 3 CDD. Un CDD sans motif écrit est réputé à durée indéterminée : évaluer avec la direction et le conseil juridique l'opportunité d'une requalification volontaire en CDI ou d'une régularisation par avenant si le contrat est en cours et le motif réel documenté. Mettre en place un circuit de validation : aucun salarié ne démarre sans contrat signé.\n\nPRIORITÉ 2 — SANTÉ AU TRAVAIL (sous 30 jours) : planifier les 12 visites d'information et de prévention auprès du service de prévention et de santé au travail, en commençant par les postes à risque (visite préalable obligatoire). Créer un tableau de suivi des échéances (VIP initiale, périodicité, visites de reprise).\n\nPRIORITÉ 3 — REGISTRE UNIQUE DU PERSONNEL (sous 15 jours) : reconstituer le registre par établissement à partir des DPAE, contrats et paies (nom, prénom, nationalité, date de naissance, sexe, emploi, qualification, dates d'entrée et de sortie, type de contrat). Le registre doit être tenu à disposition de l'inspection du travail : son absence est passible d'une amende de 4e classe par salarié concerné.\n\nPRIORITÉ 4 — RGPD (sous 30 jours) : supprimer les copies de cartes vitales (pas de base légale, donnée non nécessaire : seul le numéro de sécurité sociale est justifié pour la paie). Mettre à jour le registre des traitements, définir les durées de conservation (dossier salarié : 5 ans après le départ, bulletins 50 ans), restreindre les accès au service RH, informer les salariés du traitement de leurs données.\n\nPÉRENNISATION : check-list d'embauche standardisée, tableau de bord de conformité mensuel, audit semestriel, formation des managers, information du CSE.",
        points: 5,
      },
      {
        titre: "MSP 2 — Contrôler un bulletin de paie et corriger les anomalies",
        consigne:
          "Un salarié conteste son bulletin : il a effectué 6 heures supplémentaires non payées, a été absent 3 jours pour maladie avec subrogation, et constate que sa mutuelle n'apparaît pas. Décrivez la démarche de vérification et la régularisation.",
        reponseAttendue:
          "1. RECEVOIR LE SALARIÉ : écouter, noter précisément les 3 points contestés, s'engager sur un délai de réponse (5 jours ouvrés), rappeler la confidentialité de l'échange.\n\n2. VÉRIFIER LES HEURES SUPPLÉMENTAIRES : comparer le relevé du logiciel de gestion des temps, les plannings validés par le manager et les variables transmises. Si les 6 heures sont confirmées : 4 h majorées à 25 % et 2 h selon le seuil hebdomadaire dépassé. Calculer le rappel : taux horaire × 1,25 × nombre d'heures. Vérifier également l'impact sur le contingent annuel et la contrepartie obligatoire en repos.\n\n3. VÉRIFIER L'ABSENCE MALADIE : présence de l'arrêt de travail dans le dossier, transmission de l'attestation de salaire à la CPSAM, application de la subrogation (l'employeur maintient le salaire et perçoit les IJSS). Contrôler la retenue pour absence et le maintien de salaire prévu par la convention collective (conditions d'ancienneté et délai de carence).\n\n4. VÉRIFIER LA MUTUELLE : contrôler l'affiliation auprès de l'organisme, l'absence de dispense signée, la date d'effet. Si l'affiliation a été oubliée : régulariser rétroactivement, précompter la part salariale sur le bulletin suivant (en respectant la limite de la quotité saisissable), vérifier la couverture effective du salarié sur la période.\n\n5. RÉGULARISER : transmettre au gestionnaire de paie un bordereau de régularisation détaillé, faire éditer un bulletin rectificatif ou intégrer les rappels sur la paie du mois suivant avec des libellés explicites (« rappel heures supplémentaires M-1 »). Corriger la DSN par une DSN rectificative.\n\n6. RÉPONDRE AU SALARIÉ par écrit : détail des corrections, montants, date de versement, et remerciements pour son signalement.\n\n7. PRÉVENIR LA RÉCIDIVE : renforcer le contrôle croisé temps / variables avant transmission, rappel aux managers sur la validation des heures, check-list d'affiliation à l'embauche.",
        points: 5,
      },
      {
        titre: "MSP 3 — Élaborer le plan de développement des compétences et monter un dossier OPCO",
        consigne:
          "À partir des besoins remontés par les entretiens professionnels (18 demandes de formation, budget 25 000 €), construisez le plan de développement des compétences N+1 et détaillez le montage d'un dossier de prise en charge OPCO.",
        reponseAttendue:
          "CONSTRUCTION DU PLAN :\n1. Consolider les 18 demandes dans un tableau : salarié, service, besoin, origine (entretien professionnel, manager, obligation légale), dispositif envisagé, coût estimé, durée, priorité.\n2. Distinguer les formations obligatoires (habilitations, sécurité, CACES, SST) — non négociables et prioritaires — des formations de développement des compétences.\n3. Croiser avec la stratégie de l'entreprise et la cartographie des compétences (GEPP) : conserver en priorité les besoins liés aux projets de l'année et aux risques de perte de compétences.\n4. Arbitrer sous contrainte budgétaire : mutualiser les besoins identiques en sessions intra (économie de 30 à 40 %), privilégier le distanciel pour les modules courts, échelonner sur 2 exercices.\n5. Optimiser les financements : prise en charge OPCO, CPF co-construit, Pro-A, alternance, FNE si dispositif ouvert.\n6. Formaliser le plan : objectifs, calendrier trimestriel, bénéficiaires, budget par action, indicateurs d'évaluation.\n7. Consulter le CSE sur les orientations et le plan, puis diffuser aux managers.\n\nMONTAGE DU DOSSIER OPCO :\n1. Vérifier l'OPCO de rattachement (selon la convention collective) et les critères de prise en charge en vigueur.\n2. Vérifier que l'organisme de formation est certifié Qualiopi (condition de financement).\n3. Réunir les pièces : devis ou convention de formation, programme détaillé avec objectifs et modalités d'évaluation, CV du formateur, calendrier, liste nominative des participants.\n4. Déposer la demande sur l'espace en ligne de l'OPCO AVANT le début de la formation (impératif : aucune prise en charge rétroactive).\n5. Suivre l'instruction, obtenir l'accord de prise en charge, le transmettre à la comptabilité.\n6. Après la formation : transmettre feuilles d'émargement signées, attestation d'assiduité, facture et certificat de réalisation pour déclencher le remboursement.\n7. Évaluer : questionnaire à chaud, évaluation à froid à 3 mois, mesure du transfert en situation de travail, bilan annuel présenté à la direction et au CSE.",
        points: 5,
      },
      {
        titre: "MSP 4 — Conduire un processus de recrutement complet",
        consigne:
          "Votre entreprise recrute un gestionnaire de paie en CDI. Décrivez le processus complet, de l'analyse du besoin à l'intégration, en respectant le principe de non-discrimination.",
        reponseAttendue:
          "1. ANALYSE DU BESOIN : entretien avec le manager, validation du poste (création ou remplacement), budget et niveau de rémunération, date de prise de poste, arbitrage CDI / CDD / alternance / prestation.\n\n2. PROFIL DE POSTE : intitulé, rattachement hiérarchique, finalité, missions principales, compétences techniques requises (paie multi-conventions, DSN, logiciel Silae, Excel), compétences comportementales, conditions d'exercice.\n\n3. OFFRE D'EMPLOI : structure claire, missions en verbes d'action, profil, conditions, processus et délais. Mention H/F, non-discrimination (art. L1132-1), ouverture aux personnes en situation de handicap. Aucun critère lié à l'âge, l'origine, la situation familiale ou l'apparence.\n\n4. DIFFUSION ET SOURCING : site carrière, France Travail, APEC, Welcome to the Jungle, LinkedIn, cooptation interne (prime), viviers de candidatures spontanées, cabinet en dernier recours.\n\n5. TRI DES CANDIDATURES : grille de présélection objective, notation sur critères prédéfinis uniquement liés aux compétences, traçabilité des refus (motivation professionnelle) — les CV et grilles sont conservés 2 ans maximum, information des candidats non retenus.\n\n6. PRÉSÉLECTION TÉLÉPHONIQUE (10 min) : parcours, motivation, disponibilité, prétentions, mobilité.\n\n7. ENTRETIENS : entretien RH (parcours, motivation, adéquation culturelle) puis entretien technique avec le responsable paie, complété par un test pratique (contrôle d'un bulletin comportant des erreurs, 45 min). Grille d'évaluation commune, prise de notes factuelles.\n\n8. DÉCISION ET PROPOSITION : comparatif des finalistes sur la grille, prise de références avec accord du candidat, promesse d'embauche écrite (poste, rémunération, date, durée de validité).\n\n9. RÉPONSE À TOUS LES CANDIDATS sous 15 jours, y compris négative.\n\n10. INTÉGRATION : DPAE, contrat, livret d'accueil, matériel et accès prêts au jour 1, référent désigné, parcours de découverte des services sur 2 semaines, points à J+7, J+30 et J+60, rapport d'étonnement, bilan de fin de période d'essai formalisé.",
        points: 5,
      },
      {
        titre: "MSP 5 — Présenter un tableau de bord social et un plan d'action GEPP à la direction",
        consigne:
          "La direction d'une entreprise de 210 salariés constate un absentéisme de 8,4 % et un turnover de 21 % chez les moins de 2 ans d'ancienneté. Présentez votre analyse et votre plan d'action GEPP.",
        reponseAttendue:
          "1. TABLEAU DE BORD : effectif inscrit et ETP, pyramide des âges, répartition des contrats, absentéisme global 8,4 % ventilé par motif (maladie courte, longue maladie, AT) et par service, turnover global et turnover des moins de 2 ans (21 %), coût estimé du turnover (recrutement + intégration + perte de productivité ≈ 6 à 9 mois de salaire par départ).\n\n2. ANALYSE : un absentéisme supérieur à la moyenne sectorielle (4 à 6 %) concentré sur les postes opérationnels suggère des conditions de travail dégradées, des TMS ou un management de proximité en difficulté. Un turnover de 21 % sur les moins de 2 ans révèle un problème d'intégration, d'écart entre la promesse d'embauche et la réalité du poste, ou de rémunération non compétitive. Croiser avec les comptes rendus d'entretiens professionnels, les entretiens de départ et le document unique.\n\n3. PLAN D'ACTION EN 3 AXES :\nAxe 1 — Intégration : refonte de l'onboarding (livret d'accueil, parrainage, points à J+7 / J+30 / J+60, rapport d'étonnement), formation des managers à l'accueil, clarification des fiches de poste dès l'offre d'emploi.\nAxe 2 — Conditions de travail et prévention : entretiens systématiques de retour d'absence, mise à jour du DUERP, plan de prévention des TMS avec le service de santé au travail, aménagements de postes, suivi des situations RQTH avec l'AGEFIPH, enquête QVCT anonyme.\nAxe 3 — Compétences et carrières (GEPP) : cartographie des compétences par emploi, identification des emplois sensibles et des viviers, plan de développement des compétences aligné, parcours de mobilité interne, entretiens professionnels tenus à jour à 100 %.\n\n4. PILOTAGE : indicateurs mensuels (absentéisme, turnover, taux d'entretiens réalisés, satisfaction des nouveaux entrants), objectifs chiffrés à 12 mois (absentéisme < 6 %, turnover < 12 %), revue trimestrielle avec la direction, information et consultation du CSE.\n\n5. RESTITUTION : support de 6 diapositives (constat, analyse, coûts, plan, budget, indicateurs), synthèse écrite d'une page, données agrégées et anonymisées conformément au RGPD.",
        points: 5,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Pack veille
// ---------------------------------------------------------------------------
const ARH_VEILLE_PACK: AIVeillePack = {
  reglementaire: [
    { lien: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006178012/", titreLien: "Légifrance — Code du travail", titre: "Suivi des évolutions législatives sur le contrat de travail et la durée du travail", date: "Janvier 2026", commentaire: "Veille mensuelle sur les articles relatifs au CDD, à la période d'essai et aux heures supplémentaires. Impact direct sur les trames de contrats utilisées en formation.", exploitation: "Preuve : trames de contrats mises à jour et datées, remises aux stagiaires. Action : mise à jour du module CCP 1." },
    { lien: "https://www.francecompetences.fr/recherche/rncp/35030/", titreLien: "RNCP35030", titre: "Fiche du Titre professionnel Assistant ressources humaines (TP-01284)", date: "Mars 2026", commentaire: "Vérification trimestrielle de la validité de la fiche, des blocs de compétences (2 CCP) et des modalités d'évaluation.", exploitation: "Preuve : capture datée de la fiche RNCP archivée au dossier Qualiopi. Action : alignement du programme sur le REAC." },
    { lien: "https://www.urssaf.fr/accueil/actualites.html", titreLien: "URSSAF — Actualités", titre: "Plafond de la Sécurité sociale et taux de cotisations applicables en 2026", date: "Janvier 2026", commentaire: "Actualisation du PMSS, des taux de cotisations et des barèmes de saisie sur salaire utilisés dans les exercices de contrôle de paie.", exploitation: "Preuve : fiche mémo « chiffres clés paie 2026 » distribuée. Action : mise à jour des cas pratiques du module variables de paie." },
    { lien: "https://www.cnil.fr/fr/la-gestion-des-ressources-humaines", titreLien: "CNIL — RGPD RH", titre: "Recommandations CNIL sur la gestion des données des candidats et des salariés", date: "Février 2026", commentaire: "Durées de conservation (CV 2 ans, dossier salarié 5 ans après le départ, bulletins 50 ans), minimisation des données, information des personnes.", exploitation: "Preuve : atelier RGPD RH avec cas pratiques. Action : intégration au module confidentialité." },
  ],
  metier: [
    { lien: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail.html", titreLien: "France Travail — ROME M1501", titre: "Tension persistante sur les métiers de l'assistanat RH et de la paie", date: "Mars 2026", commentaire: "Les postes d'assistant RH et de gestionnaire de paie restent en tension en Île-de-France. Salaires d'entrée observés : 2 100 à 2 500 € brut selon la taille de l'entreprise.", exploitation: "Preuve : synthèse marché remise aux stagiaires. Action : atelier technique de recherche d'emploi ciblé RH." },
    { lien: "https://travail-emploi.gouv.fr/", titreLien: "Ministère du Travail", titre: "Obligations liées aux entretiens professionnels et à l'abondement correctif", date: "Décembre 2025", commentaire: "Rappel de l'obligation d'entretien tous les 2 ans et de l'état des lieux à 6 ans, sanction de 3 000 € par salarié sur le CPF dans les entreprises d'au moins 50 salariés.", exploitation: "Preuve : cas pratique « plan de rattrapage des entretiens ». Action : renforcement du module GEPP." },
    { lien: "https://www.anact.fr/", titreLien: "ANACT — QVCT", titre: "Baromètre de l'absentéisme et leviers de prévention 2026", date: "Février 2026", commentaire: "L'absentéisme moyen se stabilise autour de 5,5 % ; les entretiens de retour d'absence et la prévention des TMS restent les leviers les plus efficaces.", exploitation: "Preuve : données intégrées au module tableaux de bord RH. Action : cas pratique d'analyse d'absentéisme." },
  ],
  technologique: [
    { lien: "https://www.silae.fr/", titreLien: "Silae", titre: "Évolutions 2026 du logiciel de paie et automatisation des contrôles DSN", date: "Janvier 2026", commentaire: "Nouveaux contrôles automatiques de cohérence avant dépôt DSN, réduction des retours CRM. L'assistant RH doit savoir lire et traiter les anomalies signalées.", exploitation: "Preuve : accès démo Silae en salle. Action : atelier de traitement des anomalies DSN." },
    { lien: "https://www.net-entreprises.fr/", titreLien: "net-entreprises", titre: "Dématérialisation renforcée des déclarations sociales (DPAE, DSN, attestations)", date: "Février 2026", commentaire: "Généralisation des attestations employeur dématérialisées et des échanges automatisés avec France Travail et la CPAM.", exploitation: "Preuve : exercices de simulation de dépôt. Action : mise à jour du module gestion administrative." },
    { lien: "https://www.cnil.fr/fr/intelligence-artificielle", titreLien: "CNIL — IA et recrutement", titre: "Encadrement de l'usage de l'IA dans le tri des candidatures", date: "Mars 2026", commentaire: "Les outils de scoring automatique de CV doivent être transparents, non discriminatoires et faire l'objet d'une décision humaine finale.", exploitation: "Preuve : séquence « IA et recrutement responsable ». Action : ajout au module recrutement." },
  ],
};

// ---------------------------------------------------------------------------
// Seeder
// ---------------------------------------------------------------------------
export function seedARHAICaches(): void {
  try {
    setCachedContentPack(FORMATION_ARH, ARH_CONTENT_PACK);
    setCachedEvalPack(FORMATION_ARH, ARH_EVAL_PACK);
    setCachedVeillePack(FORMATION_ARH, ARH_VEILLE_PACK);
  } catch {
    /* sessionStorage indisponible : ignoré */
  }
}
