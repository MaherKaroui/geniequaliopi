import { OrganismeInfo, FormationInfo, StagiaireInfo } from "@/types/qualiopi";

export const SAMPLE_ORGANISME: OrganismeInfo = {
  nom: "FormaPro Excellence",
  siret: "892 456 789 00015",
  adresse: "25 avenue de la Formation Professionnelle",
  codePostal: "75008",
  ville: "Paris",
  telephone: "01 42 68 93 14",
  email: "contact@formapro-excellence.fr",
  siteWeb: "www.formapro-excellence.fr",
  nda: "11 75 123456 75",
  dirigeant: "Jean-Marc Beaumont",
  responsablePedagogique: "Dr. Catherine Moreau",
  referentHandicap: "Isabelle Fontaine",
  referentQualite: "Laurent Vasseur",
  domainesFormation: "Bureautique, Langues, Management, Digital, Esthétique, Informatique",
  typesActions: ["actions-formation", "bilans-competences"],
  certifications: "Qualiopi, RS, RNCP",
  outilsUtilises: "Moodle LMS, Zoom, Google Workspace, Digiforma",
  version: "1",
  dateMaj: new Date().toISOString().slice(0, 10),
};

export const SAMPLE_STAGIAIRES: StagiaireInfo[] = [
  { civilite: "M.", nom: "Dupont", prenom: "Martin", email: "martin.dupont@techsolutions.fr", telephone: "06 12 34 56 78", entreprise: "Tech Solutions SAS", poste: "Comptable", dateNaissance: "1990-03-15" },
  { civilite: "Mme", nom: "Bernard", prenom: "Sophie", email: "sophie.bernard@innovcorp.fr", telephone: "06 23 45 67 89", entreprise: "Innov'Corp", poste: "Assistante RH", dateNaissance: "1985-07-22" },
  { civilite: "M.", nom: "Moreau", prenom: "Lucas", email: "lucas.moreau@greentech.fr", telephone: "06 34 56 78 90", entreprise: "GreenTech SA", poste: "Chef de projet", dateNaissance: "1992-11-08" },
  { civilite: "Mme", nom: "Lefebvre", prenom: "Emma", email: "emma.lefebvre@mediasphere.fr", telephone: "06 45 67 89 01", entreprise: "MediaSphère", poste: "Chargée de communication", dateNaissance: "1988-05-30" },
  { civilite: "M.", nom: "Roux", prenom: "Hugo", email: "hugo.roux@buildpro.fr", telephone: "06 56 78 90 12", entreprise: "BuildPro", poste: "Technicien", dateNaissance: "1995-01-17" },
  { civilite: "Mme", nom: "Fournier", prenom: "Léa", email: "lea.fournier@santeplus.fr", telephone: "06 67 89 01 23", entreprise: "Santé Plus", poste: "Infirmière coordinatrice", dateNaissance: "1991-09-25" },
  { civilite: "M.", nom: "Girard", prenom: "Antoine", email: "antoine.girard@logifrance.fr", telephone: "06 78 90 12 34", entreprise: "LogiFrance", poste: "Responsable logistique", dateNaissance: "1987-12-03" },
  { civilite: "Mme", nom: "Durand", prenom: "Camille", email: "camille.durand@eduservices.fr", telephone: "06 89 01 23 45", entreprise: "EduServices", poste: "Formatrice junior", dateNaissance: "1993-06-14" },
  { civilite: "M.", nom: "Mercier", prenom: "Thomas", email: "thomas.mercier@financegroup.fr", telephone: "06 90 12 34 56", entreprise: "Finance Group", poste: "Analyste financier", dateNaissance: "1989-08-19" },
  { civilite: "Mme", nom: "Lambert", prenom: "Julie", email: "julie.lambert@artisanat.fr", telephone: "06 01 23 45 67", entreprise: "Artisanat & Co", poste: "Gérante", dateNaissance: "1994-02-28" },
];

export interface FormateurInfo {
  nom: string;
  prenom: string;
  specialite: string;
  diplomes: string;
  experience: string;
  email: string;
}

export const SAMPLE_FORMATEURS: FormateurInfo[] = [
  { nom: "Martin", prenom: "Philippe", specialite: "Bureautique, Excel avancé", diplomes: "Master Informatique de Gestion – Université Paris-Dauphine", experience: "15 ans d'expérience en formation bureautique", email: "p.martin@formapro-excellence.fr" },
  { nom: "Dubois", prenom: "Catherine", specialite: "Anglais professionnel, TOEIC", diplomes: "Master TESOL – University of Cambridge", experience: "12 ans d'enseignement de l'anglais professionnel", email: "c.dubois@formapro-excellence.fr" },
  { nom: "Fontaine", prenom: "Marie", specialite: "Esthétique, Cosmétique", diplomes: "CAP/BEP Esthétique + DU Cosmétologie", experience: "18 ans dans le secteur esthétique", email: "m.fontaine@formapro-excellence.fr" },
  { nom: "Blanc", prenom: "Jean-Pierre", specialite: "Management, Leadership", diplomes: "MBA HEC Paris", experience: "20 ans de direction et formation en management", email: "jp.blanc@formapro-excellence.fr" },
  { nom: "Petit", prenom: "Alexandre", specialite: "Digital Marketing, Informatique", diplomes: "Master Marketing Digital – ESSEC", experience: "10 ans en stratégie digitale et formation", email: "a.petit@formapro-excellence.fr" },
];

export const SAMPLE_FORMATIONS: FormationInfo[] = [
  {
    intitule: "Excel Professionnel – Niveau Avancé",
    objectifs: "Maîtriser les tableaux croisés dynamiques, les formules avancées (RECHERCHEV, INDEX/EQUIV, SI imbriqués), les macros VBA de base, et la création de tableaux de bord professionnels.",
    prerequis: "Connaissance de base d'Excel (niveau intermédiaire requis)",
    duree: "21 heures (3 jours)",
    modalites: "présentiel",
    tarif: "1 500 € HT par stagiaire",
    programme: "Jour 1 : Fonctions avancées (RECHERCHEV, INDEX/EQUIV, SI imbriqués, SOMMEPROD)\nJour 2 : Tableaux croisés dynamiques, graphiques avancés, mise en forme conditionnelle\nJour 3 : Introduction aux macros VBA, automatisation de tâches, tableaux de bord",
    methodesEvaluation: "QCM de positionnement en début de formation, exercices pratiques en continu, évaluation finale sur cas pratique, questionnaire de satisfaction",
    moyensPedagogiques: "Salle équipée de PC individuels, vidéoprojecteur, supports de cours numériques et papier, exercices sur fichiers Excel réels",
    publicVise: "Salariés, demandeurs d'emploi, indépendants souhaitant perfectionner leur maîtrise d'Excel",
    delaiAcces: "14 jours après inscription",
    dateDebut: "2024-01-15",
    dateFin: "2024-01-17",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Salle A1",
    nombreParticipants: "10",
    formateur: "Philippe Martin",
  },
  {
    intitule: "Anglais Professionnel – Préparation TOEIC",
    objectifs: "Développer les compétences en anglais professionnel : communication orale et écrite, négociation, présentations, préparation au TOEIC avec score visé ≥ 785.",
    prerequis: "Niveau B1 minimum (intermédiaire)",
    duree: "35 heures (5 jours)",
    modalites: "mixte",
    tarif: "2 200 € HT par stagiaire",
    programme: "Jour 1-2 : Communication professionnelle orale\nJour 3 : Rédaction professionnelle (emails, rapports)\nJour 4 : Négociation et réunions en anglais\nJour 5 : Entraînement TOEIC et évaluation",
    methodesEvaluation: "Test de niveau initial, mises en situation, TOEIC blanc, évaluation continue",
    moyensPedagogiques: "Salle multimédia, casques audio, plateforme e-learning, manuels Cambridge, exercices TOEIC",
    publicVise: "Cadres et employés ayant besoin de l'anglais dans leur contexte professionnel",
    delaiAcces: "14 jours après inscription",
    dateDebut: "2024-02-05",
    dateFin: "2024-02-09",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Salle B2",
    nombreParticipants: "8",
    formateur: "Catherine Dubois",
  },
  {
    intitule: "CAP Esthétique – Cosmétique – Parfumerie",
    objectifs: "Préparer au diplôme CAP Esthétique Cosmétique Parfumerie : soins du visage, épilation, maquillage, manucure, vente conseil en parfumerie.",
    prerequis: "Niveau 3ème minimum, motivation pour le secteur",
    duree: "600 heures (sur 6 mois)",
    modalites: "présentiel",
    tarif: "4 500 € HT",
    programme: "Module 1 : Biologie cutanée et cosmétologie\nModule 2 : Techniques esthétiques (soins visage, corps)\nModule 3 : Maquillage professionnel\nModule 4 : Vente et conseil\nModule 5 : Stage pratique en entreprise",
    methodesEvaluation: "Contrôle continu, examens blancs, évaluation pratique sur modèle, épreuve écrite",
    moyensPedagogiques: "Plateaux techniques équipés, produits professionnels, cabines individuelles, mannequins",
    publicVise: "Personnes en reconversion, jeunes en insertion, salariés du secteur beauté",
    delaiAcces: "30 jours avant le début de la session",
    dateDebut: "2024-01-08",
    dateFin: "2024-06-28",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Espace Esthétique",
    nombreParticipants: "12",
    formateur: "Marie Fontaine",
  },
  {
    intitule: "Formation Bureautique – Pack Office Essentiel",
    objectifs: "Acquérir les bases de Word, Excel et PowerPoint pour une utilisation professionnelle quotidienne efficace.",
    prerequis: "Aucun prérequis spécifique",
    duree: "14 heures (2 jours)",
    modalites: "présentiel",
    tarif: "900 € HT par stagiaire",
    programme: "Jour 1 : Word (mise en forme, tableaux, publipostage) et Excel (formules de base, tableaux, graphiques)\nJour 2 : PowerPoint (créer des présentations, animations) et bonnes pratiques numériques",
    methodesEvaluation: "QCM avant/après, exercices pratiques, évaluation de satisfaction",
    moyensPedagogiques: "PC individuels avec Pack Office installé, vidéoprojecteur, supports imprimés",
    publicVise: "Tout public souhaitant maîtriser les outils bureautiques",
    delaiAcces: "7 jours après inscription",
    dateDebut: "2024-03-11",
    dateFin: "2024-03-12",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Salle A2",
    nombreParticipants: "10",
    formateur: "Philippe Martin",
  },
  {
    intitule: "Formation Management – Leadership et Gestion d'Équipe",
    objectifs: "Développer les compétences managériales : leadership situationnel, communication, gestion des conflits, motivation d'équipe, conduite du changement.",
    prerequis: "Expérience en poste de responsabilité souhaitée",
    duree: "28 heures (4 jours)",
    modalites: "mixte",
    tarif: "2 800 € HT par stagiaire",
    programme: "Jour 1 : Styles de management et leadership situationnel\nJour 2 : Communication managériale et feedback\nJour 3 : Gestion des conflits et négociation\nJour 4 : Motivation, délégation et conduite du changement",
    methodesEvaluation: "Autodiagnostic managérial, mises en situation filmées, études de cas, évaluation 360°",
    moyensPedagogiques: "Salle de formation, caméra vidéo, cas pratiques réels, outils d'autoévaluation",
    publicVise: "Managers, chefs de projet, responsables d'équipe",
    delaiAcces: "14 jours après inscription",
    dateDebut: "2024-02-19",
    dateFin: "2024-02-22",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Salle C1",
    nombreParticipants: "8",
    formateur: "Jean-Pierre Blanc",
  },
  {
    intitule: "Formation Digital Marketing – Stratégie et Outils",
    objectifs: "Maîtriser les fondamentaux du marketing digital : SEO/SEA, réseaux sociaux, content marketing, Google Analytics, email marketing, publicité en ligne.",
    prerequis: "Connaissances de base en informatique et navigation web",
    duree: "21 heures (3 jours)",
    modalites: "distanciel",
    tarif: "1 800 € HT par stagiaire",
    programme: "Jour 1 : SEO/SEA et Google Analytics\nJour 2 : Réseaux sociaux (stratégie, community management)\nJour 3 : Content marketing, email marketing, publicité en ligne",
    methodesEvaluation: "Quiz en ligne, projet digital personnel, évaluation finale sur cas pratique",
    moyensPedagogiques: "Plateforme Moodle, visioconférence Zoom, tutoriels vidéo, accès aux outils Google",
    publicVise: "Responsables marketing, entrepreneurs, chargés de communication",
    delaiAcces: "7 jours après inscription",
    dateDebut: "2024-03-18",
    dateFin: "2024-03-20",
    lieu: "Formation à distance – Plateforme Moodle + Zoom",
    nombreParticipants: "15",
    formateur: "Alexandre Petit",
  },
  {
    intitule: "Formation Informatique – Administration Systèmes et Réseaux",
    objectifs: "Acquérir les compétences en administration de systèmes Windows/Linux, gestion de réseaux, cybersécurité de base et virtualisation.",
    prerequis: "Connaissances de base en informatique, notions réseau souhaitées",
    duree: "35 heures (5 jours)",
    modalites: "distanciel",
    tarif: "2 500 € HT par stagiaire",
    programme: "Jour 1 : Administration Windows Server\nJour 2 : Administration Linux (Ubuntu/CentOS)\nJour 3 : Réseaux (TCP/IP, DNS, DHCP, VPN)\nJour 4 : Cybersécurité fondamentale\nJour 5 : Virtualisation et Cloud (VMware, Azure)",
    methodesEvaluation: "Labs pratiques en ligne, QCM par module, projet final d'infrastructure",
    moyensPedagogiques: "Environnements virtuels de labs, plateforme Moodle, machines virtuelles cloud, documentation technique",
    publicVise: "Techniciens IT, administrateurs systèmes juniors, personnes en reconversion IT",
    delaiAcces: "14 jours après inscription",
    dateDebut: "2024-04-08",
    dateFin: "2024-04-12",
    lieu: "Formation à distance – Plateforme Moodle + Labs virtuels",
    nombreParticipants: "10",
    formateur: "Alexandre Petit",
  },
  {
    intitule: "Communiquer en français dans les secteurs du social et du médico-social (niveau B1)",
    objectifs: "Développer les compétences de communication orale et écrite en français à un niveau B1 dans le contexte professionnel du social et du médico-social : accueil des usagers, rédaction de transmissions, participation aux réunions d'équipe, compréhension des protocoles.",
    prerequis: "Niveau A2 en français (élémentaire), être en poste ou en projet d'insertion dans le secteur social ou médico-social",
    duree: "70 heures (10 jours)",
    modalites: "présentiel",
    tarif: "3 500 € HT par stagiaire",
    programme: "Jour 1-2 : Communication orale professionnelle (accueil, écoute active, reformulation)\nJour 3-4 : Vocabulaire spécifique du secteur médico-social (soins, accompagnement, handicap)\nJour 5-6 : Rédaction professionnelle (transmissions, comptes rendus, cahier de liaison)\nJour 7-8 : Compréhension des documents institutionnels (protocoles, projets personnalisés, chartes)\nJour 9 : Participation aux réunions d'équipe et communication avec les familles\nJour 10 : Évaluation finale et bilan de compétences linguistiques",
    methodesEvaluation: "Test de positionnement initial, mises en situation professionnelles, évaluation continue, examen final écrit et oral de niveau B1",
    moyensPedagogiques: "Salle de formation équipée, supports authentiques du secteur médico-social, jeux de rôle, fiches méthodologiques, plateforme e-learning complémentaire",
    publicVise: "Professionnels du secteur social et médico-social (aides-soignants, AES, auxiliaires de vie, agents de service) dont le français n'est pas la langue maternelle",
    delaiAcces: "21 jours avant le début de la session",
    dateDebut: "2024-05-06",
    dateFin: "2024-05-21",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Salle D1",
    nombreParticipants: "10",
    formateur: "Catherine Dubois",
    codeRNCP: "RS6674",
  },
  {
    intitule: "Création de contenus rédactionnels et visuels par l'usage responsable de l'intelligence artificielle générative",
    objectifs: "Maîtriser les outils d'IA générative (ChatGPT, Midjourney, DALL-E, Canva IA) pour créer des contenus rédactionnels et visuels professionnels de qualité, dans le respect de l'éthique, du droit d'auteur et des bonnes pratiques RGPD.",
    prerequis: "Connaissance de base en informatique et navigation web, aucune compétence en programmation requise",
    duree: "28 heures (4 jours)",
    modalites: "mixte",
    tarif: "3 800 € HT par stagiaire",
    programme: "Jour 1 : Fondamentaux de l'IA générative (fonctionnement, limites, enjeux éthiques), introduction au prompt engineering\nJour 2 : Prompt engineering avancé pour la rédaction (articles, posts réseaux sociaux, newsletters, fiches produit) et création visuelle par IA (Midjourney, DALL-E, Canva IA)\nJour 3 : Retouche et adaptation des visuels, charte graphique, workflow intégré rédactionnel + visuel, cadre juridique (droit d'auteur, RGPD, AI Act, mentions obligatoires)\nJour 4 : Projet final : création d'une campagne de communication complète, soutenance et évaluation",
    methodesEvaluation: "QCM de positionnement initial, exercices pratiques par module, projet final évalué (campagne de communication), questionnaire de satisfaction",
    moyensPedagogiques: "Salle informatique équipée, accès aux outils IA (ChatGPT, Midjourney, Canva Pro), supports de cours numériques, tutoriels vidéo, guides de prompt engineering",
    publicVise: "Responsables communication, community managers, rédacteurs, marketeurs, entrepreneurs, formateurs souhaitant intégrer l'IA dans leur production de contenus",
    delaiAcces: "14 jours après inscription",
    dateDebut: "2024-06-03",
    dateFin: "2024-06-06",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Salle Numérique B3",
    nombreParticipants: "12",
    formateur: "Alexandre Petit",
  },
  {
    intitule: "Gestion Administrative du Personnel & Obligations Légales",
    objectifs: "Assurer la gestion administrative du personnel de l'entrée à la sortie, appliquer les obligations légales liées au contrat de travail, mettre à jour et sécuriser les dossiers salariés, rédiger les documents RH obligatoires, respecter les procédures, délais et règles du Code du travail.",
    prerequis: "Aucun prérequis spécifique, une expérience en poste administratif est un plus",
    duree: "14 heures (2 jours)",
    modalites: "présentiel",
    tarif: "600 € TTC par participant",
    programme: "Jour 1 : Cadre juridique et documents RH obligatoires, formalités d'embauche (DPAE, registre du personnel, mutuelle), constitution et gestion du dossier salarié\nJour 2 : Gestion des absences, congés et arrêts maladie, rédaction des documents administratifs RH (avenants, certificats), conformité RGPD et archivage, obligations légales de fin de contrat",
    methodesEvaluation: "QCM de validation, mises en situation professionnelles, exercices pratiques sur cas réels",
    moyensPedagogiques: "Salle de formation équipée, supports de cours numériques et papier, modèles de documents RH, cas pratiques",
    publicVise: "Assistants RH, gestionnaires de paie, secrétaires administratifs, responsables de PME/TPE",
    delaiAcces: "7 jours après inscription",
    dateDebut: "2024-12-09",
    dateFin: "2024-12-10",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Salle A2",
    nombreParticipants: "10",
    formateur: "Philippe Martin",
  },
  {
    intitule: "Titre Professionnel Secrétaire Assistant(e) Médico-Administratif(ve) (TP SAMA)",
    objectifs: "Former des professionnels capables d'assurer la gestion administrative et l'accueil au sein de structures médicales ou médico-sociales, dans le respect des protocoles et de la confidentialité des informations.",
    prerequis: "Niveau 3 (CAP ou équivalent) ou expérience professionnelle dans le secteur administratif, médico-social ou hospitalier. Entretien individuel et test de positionnement.",
    duree: "400 heures",
    modalites: "mixte",
    tarif: "6 950 € – Contrat d'apprentissage",
    programme: "Module 1 : Gestion administrative des rendez-vous, admissions et dossiers médicaux\nModule 2 : Rédaction et mise en forme de documents professionnels\nModule 3 : Accueil et orientation des patients ou usagers\nModule 4 : Collaboration avec les professionnels de santé\nModule 5 : Communication écrite et orale adaptée au secteur médical",
    methodesEvaluation: "Quiz, cas pratiques et mises en situation professionnelles, travaux pratiques de rédaction et de gestion de dossiers, examen final : dossier professionnel, mise en situation, entretien avec jury",
    moyensPedagogiques: "Salle équipée (tableau, connexion internet), plateforme LMS avec classe virtuelle, supports pédagogiques numériques et imprimés, accompagnement individualisé (suivi en entreprise et tutorat pédagogique)",
    publicVise: "Personnes en reconversion, jeunes en insertion, salariés du secteur médico-social ou administratif",
    delaiAcces: "30 jours avant le début de la session",
    dateDebut: "2024-09-02",
    dateFin: "2025-06-30",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Salle D2",
    nombreParticipants: "15",
    formateur: "Catherine Dubois",
    codeRNCP: "RNCP36805",
  },
];

// Satisfaction scores (pre-filled realistic data)
export const SATISFACTION_SCORES: Record<string, number[]> = {
  "Excel Professionnel": [5, 4, 5, 5, 4, 5, 4, 5],
  "Anglais Professionnel": [4, 5, 4, 4, 5, 4, 5, 5],
  "CAP Esthétique": [5, 5, 5, 4, 5, 5, 5, 5],
  "Bureautique": [4, 4, 5, 4, 5, 4, 4, 5],
  "Management": [5, 5, 4, 5, 5, 5, 4, 5],
  "Digital Marketing": [5, 4, 5, 5, 4, 5, 5, 4],
  "Informatique": [4, 5, 5, 4, 5, 4, 5, 5],
  "Communiquer en français": [5, 4, 5, 4, 5, 5, 4, 5],
  "Création de contenus": [5, 5, 4, 5, 5, 4, 5, 5],
  "Gestion Administrative": [4, 5, 4, 5, 4, 5, 5, 4],
  "TP SAMA": [5, 4, 5, 5, 4, 5, 4, 5],
};

// Evaluation scores per stagiaire (realistic 6-10/10)
export const EVAL_SCORES: number[][] = [
  [8, 9, 7, 8, 9], // Martin Dupont
  [9, 8, 9, 8, 8], // Sophie Bernard
  [7, 8, 8, 9, 7], // Lucas Moreau
  [8, 7, 8, 7, 8], // Emma Lefebvre
  [9, 9, 8, 9, 9], // Hugo Roux
  [7, 8, 7, 8, 7], // Léa Fournier
  [8, 8, 9, 8, 8], // Antoine Girard
  [9, 7, 8, 8, 9], // Camille Durand
  [8, 9, 8, 9, 8], // Thomas Mercier
  [10, 8, 9, 8, 9], // Julie Lambert
];

// Connection times for distanciel - 7h/jour (default)
export const CONNECTION_TIMES_7H = [
  { heureConnexion: "08:55", heureDeconnexion: "12:05", duree: "3h10" },
  { heureConnexion: "13:28", heureDeconnexion: "17:02", duree: "3h34" },
  { heureConnexion: "09:02", heureDeconnexion: "12:15", duree: "3h13" },
  { heureConnexion: "13:30", heureDeconnexion: "16:58", duree: "3h28" },
  { heureConnexion: "08:58", heureDeconnexion: "12:10", duree: "3h12" },
  { heureConnexion: "13:32", heureDeconnexion: "17:05", duree: "3h33" },
];

// Connection times for distanciel - 6h/jour
export const CONNECTION_TIMES_6H = [
  { heureConnexion: "09:00", heureDeconnexion: "12:05", duree: "3h05" },
  { heureConnexion: "13:00", heureDeconnexion: "15:58", duree: "2h58" },
  { heureConnexion: "09:02", heureDeconnexion: "12:08", duree: "3h06" },
  { heureConnexion: "13:02", heureDeconnexion: "15:55", duree: "2h53" },
  { heureConnexion: "08:58", heureDeconnexion: "12:03", duree: "3h05" },
  { heureConnexion: "13:05", heureDeconnexion: "16:02", duree: "2h57" },
];

// Backward compat
export const CONNECTION_TIMES = CONNECTION_TIMES_7H;

/** Parse total hours and number of days from duree string like "24 heures (4 jours)" */
export function parseDuree(duree: string): { totalHours: number; days: number; hoursPerDay: number } {
  const hMatch = duree.match(/(\d+)\s*heures?/i);
  const dMatch = duree.match(/(\d+)\s*jours?/i);
  const totalHours = hMatch ? parseInt(hMatch[1]) : 21;
  const days = dMatch ? parseInt(dMatch[1]) : 3;
  const hoursPerDay = days > 0 ? totalHours / days : 7;
  return { totalHours, days, hoursPerDay };
}

/** Get appropriate connection times based on hours per day */
export function getConnectionTimes(f: FormationInfo): typeof CONNECTION_TIMES_7H {
  const { hoursPerDay } = parseDuree(f.duree);
  return hoursPerDay <= 6 ? CONNECTION_TIMES_6H : CONNECTION_TIMES_7H;
}

export function getFormationDays(f: FormationInfo): string[] {
  if (!f.dateDebut || !f.dateFin) return ["Jour 1", "Jour 2", "Jour 3"];
  const start = new Date(f.dateDebut);
  const end = new Date(f.dateFin);
  const days: string[] = [];
  const current = new Date(start);
  while (current <= end) {
    if (current.getDay() !== 0 && current.getDay() !== 6) {
      days.push(current.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    }
    current.setDate(current.getDate() + 1);
  }
  return days.length > 0 ? days : ["Jour 1", "Jour 2", "Jour 3"];
}

export function mergeOrganisme(userOrg: OrganismeInfo): OrganismeInfo {
  const merged = { ...SAMPLE_ORGANISME };
  for (const key of Object.keys(userOrg) as (keyof OrganismeInfo)[]) {
    const val = userOrg[key];
    if (val && ((typeof val === "string" && val.trim() !== "") || (Array.isArray(val) && val.length > 0))) {
      (merged as any)[key] = val;
    }
  }
  return merged;
}

export function mergeStagiaires(userStagiaires: StagiaireInfo[]): StagiaireInfo[] {
  return userStagiaires;
}
