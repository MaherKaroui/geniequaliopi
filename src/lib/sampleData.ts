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
  poleAdministratif: "Marie Lecomte",
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
  { civilite: "M.", nom: "Petit", prenom: "Karim", email: "karim.petit@translog.fr", telephone: "06 11 22 33 44", entreprise: "TransLog Express", poste: "Agent logistique", dateNaissance: "1996-04-10" },
  { civilite: "Mme", nom: "Haddad", prenom: "Leïla", email: "leila.haddad@beautyspa.fr", telephone: "06 55 66 77 88", entreprise: "Beauty Spa Paris", poste: "Esthéticienne", dateNaissance: "1991-11-02" },
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
  { nom: "Mendy", prenom: "Fideline", specialite: "Massage prénatal, Thérapies africaines, Bien-être", diplomes: "Spécialiste des thérapies africaines – École du Toucher Bien-naître", experience: "15 ans d'expérience en massages et techniques de bien-être prénatal", email: "f.mendy@naturoafricaine.com" },
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
    objectifs: "Développer les compétences en anglais professionnel : communication orale et écrite en contexte business, négociation internationale, animation de réunions, présentations professionnelles, rédaction de documents commerciaux, préparation intensive au TOEIC avec score visé ≥ 785.",
    prerequis: "Niveau B1 minimum (intermédiaire) – Test de positionnement réalisé avant l'entrée en formation",
    duree: "74 heures (11 jours)",
    modalites: "distanciel",
    tarif: "1 443 € HT par stagiaire",
    programme: "Jour 1 : Accueil, test de positionnement, objectifs individuels, révisions grammaticales fondamentales (temps, modaux, voix passive)\nJour 2 : Professional English Fundamentals – Greetings, introductions, téléphone professionnel, vocabulaire corporate\nJour 3 : Business Writing – Structure des emails professionnels, rapports, comptes rendus, registres de langue\nJour 4 : Business Writing avancé – False friends, collocations, rédaction de propositions commerciales\nJour 5 : Meetings & Presentations – Animer et participer à une réunion en anglais, expressions clés, prise de parole\nJour 6 : Presentations avancées – Structurer un pitch, slide design, gestion des Q&A, persuasion\nJour 7 : Negotiation & Persuasion – Techniques de négociation, softening language, méthode PEE\nJour 8 : Cross-Cultural Communication – Dimensions de Hofstede, management interculturel, étiquette internationale\nJour 9 : TOEIC Préparation Listening – Stratégies Listening, exercices chronométrés, pièges courants\nJour 10 : TOEIC Préparation Reading – Stratégies Reading, grammar points TOEIC, gestion du temps\nJour 11 : TOEIC blanc complet (2h), correction détaillée, bilan individuel, plan de progression, évaluation finale",
    methodesEvaluation: "Test de positionnement initial, mises en situation professionnelles (jeux de rôle), évaluations intermédiaires par module, TOEIC blanc chronométré, évaluation finale orale et écrite, grille d'acquisition des compétences",
    moyensPedagogiques: "Plateforme LMS avec classe virtuelle, casques audio, manuels Cambridge Business English, exercices TOEIC officiels (ETS), supports vidéo et audio authentiques, fiches méthodologiques, accès e-learning 24/7",
    publicVise: "Cadres, managers, commerciaux, chefs de projet et employés ayant besoin de l'anglais dans leur contexte professionnel international",
    delaiAcces: "14 jours après inscription",
    dateDebut: "2026-12-01",
    dateFin: "2026-12-15",
    lieu: "Formation à distance – Plateforme LMS + Classe virtuelle Zoom",
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
    codeRNCP: "RS6776",
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
  {
    intitule: "Initiation Word",
    objectifs: "Identifier l'interface du logiciel Microsoft Word. Créer, enregistrer, ouvrir et modifier un document Word. Mettre en forme du texte et des paragraphes. Insérer des objets simples (images, tableaux, formes). Mettre en page un document en vue de son impression.",
    prerequis: "Savoir utiliser un ordinateur (clavier, souris, navigation simple). Aucun prérequis en bureautique n'est exigé. Formation accessible aux débutants.",
    duree: "14 heures (2 jours)",
    modalites: "présentiel",
    tarif: "700 € TTC",
    programme: "Jour 1 – Découverte et bases (7h) :\n09h00–09h30 : Accueil, présentation de la formation et des objectifs\n09h30–10h30 : Découverte de l'interface de Microsoft Word et test de positionnement\n10h30–11h30 : Création, ouverture et enregistrement d'un document\n11h30–13h00 : Saisie et modification de texte\n14h00–15h30 : Mise en forme du texte (police, taille, couleur, alignement)\n15h30–16h00 : Gestion des paragraphes et interlignes\n16h00–17h00 : Exercices pratiques guidés\n\nJour 2 – Mise en forme et documents professionnels (7h) :\n09h00–11h00 : Insertion d'images, tableaux et formes simples\n11h00–12h00 : Création de listes à puces et numérotées\n13h00–14h30 : Mise en page (marges, orientation, en-têtes, pieds de page)\n14h30–15h30 : Préparation d'un document pour l'impression et test de positionnement fin de formation\n15h30–16h30 : Évaluation finale et bilan de formation\n16h30–17h00 : Grille d'acquisition",
    methodesEvaluation: "Test de positionnement en début et fin de formation, cas pratiques et mises en situation professionnelle, évaluation finale, grille d'acquisition des compétences",
    moyensPedagogiques: "Ordinateur individuel par stagiaire, logiciel Microsoft Word (version récente), vidéoprojecteur ou écran de projection, supports pédagogiques numériques, exercices pratiques fournis par le formateur, connexion Internet, support de stockage (clé USB ou espace cloud), assistance pédagogique continue",
    publicVise: "Débutants en bureautique, salariés, demandeurs d'emploi, indépendants, toute personne souhaitant acquérir les bases de Word",
    delaiAcces: "14 jours après validation de la préinscription et réception du dossier complet",
    dateDebut: "2025-09-16",
    dateFin: "2025-09-17",
    lieu: "9 rue Hélène Boucher, 91550 Paray-Vieille-Poste",
    nombreParticipants: "8",
    formateur: "Philippe Martin",
  },
  {
    intitule: "Titre Professionnel Négociateur Technico-Commercial (TP NTC)",
    objectifs: "Former les apprenants aux techniques de prospection commerciale multicanale, de négociation technico-commerciale et de fidélisation client. Maîtriser l'élaboration d'une stratégie commerciale, la gestion d'un portefeuille clients et l'utilisation d'outils CRM. Préparer aux deux blocs de compétences du titre professionnel NTC (RNCP39063, niveau 5).",
    prerequis: "Niveau Bac ou équivalent. Appétence pour les métiers commerciaux. Maîtrise des outils bureautiques de base. Permis B souhaité.",
    duree: "420 heures (60 jours)",
    modalites: "presentiel",
    tarif: "6 300 € HT par apprenti",
    programme: "Bloc 1 – Élaborer une stratégie de prospection et la mettre en œuvre (210h) :\nModule 1 (35h) : Veille commerciale et analyse de marché – Étude sectorielle, benchmark concurrentiel, outils de veille (Google Alerts, LinkedIn Sales Navigator)\nModule 2 (35h) : Stratégie de prospection multicanale – Plan de prospection, ciblage, approche téléphonique, emailing, social selling\nModule 3 (35h) : Techniques de prise de rendez-vous et de découverte client – Méthodes SPIN, SONCAS, écoute active\nModule 4 (35h) : Outils numériques et CRM – Paramétrage CRM, gestion pipeline, tableaux de bord commerciaux, reporting\nModule 5 (35h) : Communication commerciale – Argumentaire, pitch, présentation de solutions technico-commerciales\nModule 6 (35h) : Droit commercial et environnement réglementaire – CGV, contrats, RGPD, RSE\nBloc 2 – Négocier et réaliser une vente technico-commerciale et la fidélisation (210h) :\nModule 7 (35h) : Analyse des besoins et élaboration de solutions techniques – Cahier des charges, proposition commerciale\nModule 8 (35h) : Techniques de négociation – Méthode Harvard, gestion des objections, closing\nModule 9 (35h) : Chiffrage et proposition commerciale – Calcul de marge, remise, conditions de paiement\nModule 10 (35h) : Contractualisation et suivi de commande – Processus de vente, ADV, satisfaction post-vente\nModule 11 (35h) : Fidélisation et développement de portefeuille – Plan de fidélisation, cross-selling, up-selling, NPS\nModule 12 (35h) : Projet professionnel et préparation au titre – Dossier professionnel, mise en situation, oral devant jury",
    methodesEvaluation: "Évaluations formatives continues, mises en situation professionnelle, jeux de rôles commerciaux, études de cas, dossier professionnel, épreuve de synthèse devant jury",
    moyensPedagogiques: "Salle de formation équipée, ordinateurs individuels, logiciel CRM (HubSpot/Salesforce), vidéoprojecteur, supports pédagogiques numériques, accès LinkedIn Learning, cas pratiques d'entreprises partenaires",
    publicVise: "Apprentis de 16 à 29 ans, demandeurs d'emploi, salariés en reconversion souhaitant obtenir un titre professionnel de niveau 5 en commerce B2B",
    delaiAcces: "14 jours après signature du contrat d'apprentissage",
    dateDebut: "2025-09-01",
    dateFin: "2026-08-31",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris",
    nombreParticipants: "12",
    formateur: "Jean-Pierre Blanc",
    codeRNCP: "RNCP39063",
    rythmeAlternance: "2 jours CFA / 3 jours entreprise",
  },
  {
    intitule: "Accompagnement VAE – Négociateur Technico-Commercial (RNCP39063)",
    objectifs: "Accompagner le candidat dans sa démarche de Validation des Acquis de l'Expérience pour l'obtention du titre professionnel Négociateur Technico-Commercial (niveau 5). Analyser le parcours professionnel, constituer le livret 1 de recevabilité, rédiger le livret 2 en lien avec le référentiel RNCP39063, et préparer le candidat à l'entretien devant le jury.",
    prerequis: "Justifier d'au moins 1 an d'expérience en rapport avec la certification visée (activités commerciales, négociation, prospection, relation client). Avoir un projet VAE validé.",
    duree: "24 heures (4 semaines)",
    modalites: "mixte",
    tarif: "2 400 € HT par candidat",
    programme: "Semaine 1 (6h) : Analyse du parcours professionnel, aide à la constitution du livret 1 (recevabilité), positionnement du candidat par rapport au référentiel RNCP39063\nSemaine 2 (6h) : Début de rédaction du livret 2, identification et formalisation des compétences acquises, structuration des expériences professionnelles\nSemaine 3 (8h) : Rédaction approfondie du livret 2, mise en lien systématique avec les blocs de compétences du référentiel RNCP39063 (stratégie de prospection, négociation et fidélisation)\nSemaine 4 (6h) : Finalisation du dossier, préparation à l'oral devant le jury, simulation d'entretien avec feedback",
    methodesEvaluation: "Évaluation continue de la progression du livret, grille de positionnement par bloc de compétences, simulation d'entretien jury avec grille d'observation, auto-évaluation du candidat",
    moyensPedagogiques: "Accompagnement individuel, référentiel RNCP39063 complet, modèles de livrets 1 et 2, grilles d'analyse des compétences, supports méthodologiques de rédaction, visioconférence pour les séances à distance",
    publicVise: "Professionnels commerciaux, vendeurs, indépendants, chargés de clientèle souhaitant faire reconnaître leurs compétences par un titre professionnel de niveau 5",
    delaiAcces: "14 jours après validation du projet VAE",
    dateDebut: "2026-02-02",
    dateFin: "2026-02-27",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Salle A1 + accompagnement à distance",
    nombreParticipants: "1",
    formateur: "Jean-Pierre Blanc",
    codeRNCP: "RNCP39063",
  },
  {
    intitule: "Accompagnement VAE – CAP Esthétique Cosmétique Parfumerie (RNCP31041)",
    objectifs: "Accompagner le candidat dans sa démarche de Validation des Acquis de l'Expérience pour l'obtention du CAP Esthétique Cosmétique Parfumerie (niveau 3). Analyser le parcours professionnel en esthétique, constituer le livret 1 de recevabilité, rédiger le livret 2 en lien avec le référentiel RNCP31041 (soins du visage, épilations, maquillage, manucure, conseil et vente), et préparer le candidat à l'entretien devant le jury.",
    prerequis: "Justifier d'au moins 1 an d'expérience (1 607 heures) en rapport direct avec la certification visée : activités d'esthétique, cosmétique, parfumerie (soins du visage et du corps, épilations, maquillage, conseil et vente de produits cosmétiques). Avoir un projet VAE validé par un conseiller en évolution professionnelle (CEP) ou lors de l'entretien de faisabilité.",
    duree: "24 heures (4 semaines)",
    modalites: "mixte",
    tarif: "2 200 € HT par candidat",
    programme: "Semaine 1 (6h) : Analyse du parcours professionnel en esthétique, aide à la constitution du livret 1 (recevabilité), positionnement du candidat par rapport au référentiel RNCP31041 (3 blocs de compétences)\nSemaine 2 (6h) : Début de rédaction du livret 2, identification et formalisation des compétences acquises (soins visage, épilations, maquillage, manucure, vente), structuration des expériences professionnelles\nSemaine 3 (8h) : Rédaction approfondie du livret 2, mise en lien systématique avec les 3 blocs de compétences du référentiel RNCP31041 (techniques esthétiques visage/mains/pieds, techniques liées aux phanères, conduite d'institut/conseil et vente)\nSemaine 4 (6h) : Finalisation du dossier, constitution du portefeuille de preuves (photos, attestations employeur, certificats), préparation à l'oral devant le jury, simulation d'entretien avec feedback",
    methodesEvaluation: "Évaluation continue de la progression du livret, grille de positionnement par bloc de compétences RNCP31041, simulation d'entretien jury avec grille d'observation, auto-évaluation du candidat",
    moyensPedagogiques: "Accompagnement individuel, référentiel RNCP31041 complet, modèles de livrets 1 et 2, grilles d'analyse des compétences esthétiques, supports méthodologiques de rédaction, visioconférence pour les séances à distance",
    publicVise: "Esthéticien(ne)s, conseiller(ère)s en parfumerie, prothésistes ongulaires, spa praticien(ne)s, coiffeur(se)s avec expérience en esthétique, toute personne justifiant d'une expérience significative dans les métiers de l'esthétique, de la cosmétique et de la parfumerie",
    delaiAcces: "14 jours après validation du projet VAE et de l'entretien de faisabilité",
    dateDebut: "2026-03-02",
    dateFin: "2026-03-27",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Salle A1 + accompagnement à distance",
    nombreParticipants: "1",
    formateur: "Catherine Dubois",
    codeRNCP: "RNCP31041",
  },
  {
    intitule: "Développer son activité avec le webmarketing",
    objectifs: "Définir et déployer une stratégie de marketing de contenus et de réseaux sociaux pour développer la visibilité, l'audience et l'activité commerciale. Maîtriser la création de contenus digitaux (rédaction web, visuels, vidéos), gérer les réseaux sociaux, mettre en place des tunnels de vente et analyser les performances pour optimiser sa stratégie.",
    prerequis: "Disposer d'un ordinateur avec accès Internet. Maîtriser les bases de l'utilisation d'un ordinateur et de la navigation web. Aucune compétence technique en marketing digital n'est requise.",
    duree: "74 heures (11 jours)",
    modalites: "mixte",
    tarif: "1 443 € par stagiaire",
    programme: "Jour 1-2 : Stratégie webmarketing – Audit digital, analyse de marché, personas, objectifs SMART, plan de communication digitale, choix des canaux\nJour 3-4 : Rédaction web & SEO – Techniques de rédaction optimisée, structure de contenu, mots-clés, méta-descriptions, outils SEO\nJour 5-6 : Création visuelle & vidéo – Design graphique pour le web, Canva, formats visuels par plateforme, charte graphique digitale, production vidéo courte (Reels, TikTok, Shorts)\nJour 7-8 : Community management – Gestion des réseaux sociaux (LinkedIn, Instagram, Facebook, TikTok), animation de communauté, programmation de contenu, calendrier éditorial\nJour 9 : Publicité en ligne – Facebook Ads, Google Ads, ciblage, retargeting, budget publicitaire\nJour 10 : Email marketing & tunnel de vente – Landing pages, lead magnets, séquences automatisées, plateformes d'emailing\nJour 11 : Analytics & optimisation – Google Analytics 4, KPI, rapports de performance, veille digitale, évaluation finale et soutenance",
    methodesEvaluation: "QCM de positionnement initial et final, exercices pratiques par module, production d'un portefeuille de contenus (articles SEO, visuels, vidéos, calendrier éditorial), création d'un tunnel de vente complet, rapport d'analyse de performance, soutenance devant jury",
    moyensPedagogiques: "Salle informatique équipée, ordinateur individuel avec accès Internet, vidéoprojecteur, accès aux outils (Canva Pro, Mailchimp, Google Analytics, Meta Business Suite, Buffer), supports de cours numériques, exercices pratiques et études de cas",
    publicVise: "Entrepreneurs, indépendants, commerciaux, créateurs de contenu, responsables communication, personnes en reconversion professionnelle vers le marketing digital",
    delaiAcces: "14 jours après validation de l'inscription",
    dateDebut: "2024-12-16",
    dateFin: "2024-12-31",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris – Salle Numérique B3",
    nombreParticipants: "10",
    formateur: "Alexandre Petit",
    codeRNCP: "RS6702",
  },
  {
    intitule: "Anglais Niveau A1 – Débutant",
    objectifs: "Acquérir les bases de la langue anglaise au niveau A1 du CECRL : se présenter, comprendre et utiliser des expressions familières et quotidiennes, poser des questions simples, décrire son environnement immédiat, rédiger des messages courts en anglais.",
    prerequis: "Aucun prérequis en anglais. Formation accessible aux vrais débutants.",
    duree: "74 heures (11 jours)",
    modalites: "distanciel",
    tarif: "1 443 € HT par stagiaire",
    programme: "Jour 1 : Accueil, test de positionnement, alphabet, phonétique de base, salutations et présentations\nJour 2 : Nombres 1-100, jours, mois, dates, heure, verbe TO BE (affirmatif, négatif, interrogatif)\nJour 3 : Vocabulaire de la vie quotidienne (famille, nourriture, vêtements, couleurs, corps)\nJour 4 : Verbe TO HAVE, articles (a/an/the), pronoms personnels et possessifs\nJour 5 : Present Simple – habitudes et routines, adverbes de fréquence, décrire sa journée\nJour 6 : Métiers et professions, parler de son travail, vocabulaire du bureau\nJour 7 : Conversations pratiques – au magasin, au restaurant, à l'hôtel, demander des directions\nJour 8 : Chez le médecin, au téléphone, demander de l'aide, expressions de politesse\nJour 9 : Écrire un email simple, parler de son emploi du temps, communication au travail\nJour 10 : Révisions intensives, dialogues pratiques, erreurs courantes des francophones\nJour 11 : Évaluation finale (QCM + oral + exercices écrits), bilan individuel, plan de progression",
    methodesEvaluation: "Test de positionnement initial, exercices pratiques en continu, mises en situation (jeux de rôle), évaluation intermédiaire, évaluation finale écrite et orale, grille d'acquisition des compétences A1",
    moyensPedagogiques: "Plateforme LMS avec classe virtuelle, supports audio et vidéo, fiches de vocabulaire illustrées, exercices interactifs, jeux de rôle, accès e-learning 24/7",
    publicVise: "Tout public débutant en anglais : salariés, demandeurs d'emploi, indépendants, personnes en reconversion souhaitant acquérir les bases de l'anglais",
    delaiAcces: "14 jours après inscription",
    dateDebut: "2026-11-02",
    dateFin: "2026-11-16",
    lieu: "Formation à distance – Plateforme LMS + Classe virtuelle Zoom",
    nombreParticipants: "12",
    formateur: "Catherine Dubois",
  },
  {
    intitule: "Utiliser les automations et un CRM",
    objectifs: "Maîtriser les outils d'automatisation marketing et de gestion de la relation client (CRM). Configurer des workflows automatisés pour la prospection, le suivi client et la fidélisation. Exploiter un CRM pour centraliser les données clients, segmenter les contacts et piloter l'activité commerciale. Mettre en place des scénarios d'automation (emailing, relances, scoring) pour optimiser le tunnel de vente.",
    prerequis: "Maîtriser les bases de l'utilisation d'un ordinateur et de la navigation web. Avoir une activité professionnelle impliquant de la relation client ou de la prospection commerciale. Aucune compétence technique en programmation n'est requise.",
    duree: "107 heures (15 jours)",
    modalites: "distanciel",
    tarif: "2 086,50 € par stagiaire",
    programme: "Jour 1-2 : Introduction aux CRM – Qu'est-ce qu'un CRM, panorama des solutions (HubSpot, Pipedrive, Salesforce, Zoho), choix d'un CRM adapté à son activité, création et configuration du compte\nJour 3-4 : Gestion des contacts et segmentation – Import et structuration des données clients, création de fiches contacts/entreprises, segmentation avancée (tags, listes, filtres), pipeline de vente, étapes du tunnel commercial\nJour 5-6 : Suivi commercial dans le CRM – Gestion des opportunités et des deals, tableaux de bord commerciaux, prévisions de vente, rapports d'activité, gestion des tâches et relances\nJour 7-8 : Introduction aux automations marketing – Principes de l'automation, mapping des parcours clients, déclencheurs et actions, outils d'automation (HubSpot Workflows, Brevo, ActiveCampaign, Make/Zapier)\nJour 9-10 : Email marketing automatisé – Création de séquences email automatisées, personnalisation dynamique, A/B testing, lead nurturing, scoring des prospects\nJour 11-12 : Automations avancées et intégrations – Connexion CRM + outils tiers (formulaires, calendrier, facturation), automatisation multi-canal (email + SMS + réseaux sociaux), scénarios de relance et fidélisation\nJour 13-14 : Analyse et optimisation – KPI CRM (taux de conversion, cycle de vente, valeur client), tableaux de bord analytics, optimisation des workflows, RGPD et gestion des données personnelles\nJour 15 : Projet final et évaluation – Mise en place d'un CRM complet avec automations pour un cas réel, soutenance et évaluation finale",
    methodesEvaluation: "QCM de positionnement initial et final, exercices pratiques par module (configuration CRM, création de workflows), projet final évalué (mise en place complète d'un CRM avec automations), soutenance devant jury",
    moyensPedagogiques: "Plateforme de visioconférence (Zoom/Teams), accès aux outils CRM (HubSpot gratuit, Brevo), outils d'automation (Make/Zapier), supports de cours numériques, tutoriels vidéo, exercices pratiques sur cas réels, accompagnement individuel à distance",
    publicVise: "Entrepreneurs, indépendants, commerciaux, responsables marketing, chargés de clientèle, personnes en reconversion vers les métiers du digital et de la relation client",
    delaiAcces: "14 jours après validation de l'inscription",
    dateDebut: "2024-11-04",
    dateFin: "2024-11-22",
    lieu: "Formation à distance – Plateforme Zoom + espace collaboratif en ligne",
    nombreParticipants: "2",
    formateur: "Alexandre Petit",
  },
  {
    intitule: "Massage & Relaxation Prénatals",
    objectifs: "Savoir mettre en place et appliquer des séances de relaxation pendant la grossesse grâce à différentes pratiques. Permettre à la femme enceinte de visualiser son schéma corporel en toute douceur à travers des techniques de respiration et palpation afin de vivre la naissance en toute conscience.",
    prerequis: "Aucun",
    duree: "13 heures (2 jours)",
    modalites: "présentiel",
    tarif: "580 € en participation individuelle / 480 € pour les demandeurs d'emploi",
    programme: "Jour 1 (8h30-12h30 / 13h30-18h30 – 9h) : Pratique de recentrage avec exercices de respiration, vivre sa grossesse en pleine conscience, les apports du massage prénatal, les fascias et les liquides, les points sensibles, les conditions du masseur, les produits de massage pour femme enceinte, apprentissage d'un protocole de massage spécifique pendant la période prénatale, adaptation du protocole en fonction du stade et état de grossesse, les contre-indications, l'ergonomie\nJour 2 (8h30-12h30 – 4h) : Prise de conscience du grand et petit bassin (théorie et pratique), prise de conscience des muscles du périnée (théorie et pratique), prise de conscience du col de l'utérus (théorie et pratique), relaxation avec exercices de respirations, présence à soi et au bébé, construction d'une séance de massage prénatal, construction d'une séance de massage et relaxation prénatal 'Maternité en toute sérénité', évaluation continue et évaluation écrite",
    methodesEvaluation: "Évaluation continue des pratiques mises en place lors de la formation, évaluation écrite en fin de formation, mise en situation pratique",
    moyensPedagogiques: "Alternance de parties théoriques et pratiques, pratique de recentrage et apport d'énergie en début de journée, guide pédagogique complet et détaillé, attestation de présence, matériel de massage (tables, huiles, coussins)",
    publicVise: "Professionnels du bien-être, praticiens en massage, sages-femmes, toute personne souhaitant se former au massage prénatal",
    delaiAcces: "1 semaine dans la limite des places disponibles",
    dateDebut: "2026-05-12",
    dateFin: "2026-05-13",
    lieu: "78 Avenue des Champs-Élysées, 75008 Paris",
    nombreParticipants: "4",
    formateur: "Fideline Mendy",
  },
  {
    intitule: "TP - Enseignant de la conduite et de la sécurité routière (ECSR)",
    objectifs: "Préparer à l'obtention du TP ECSR (RNCP35329), former des enseignants de la conduite et de la sécurité routière capables d'assurer l'apprentissage théorique et pratique en sécurité, dans le respect des cadres réglementaires en vigueur.",
    prerequis: "Être titulaire du permis B en cours de validité. Casier judiciaire vierge (bulletin n°2). Bonne maîtrise du français (écrit et oral). Bonne condition physique (visite médicale obligatoire).",
    duree: "1190 heures (910h centre + 280h entreprise)",
    modalites: "présentiel",
    tarif: "5 733,11 € HT",
    programme: "CCP1 – Former des apprenants conducteurs (560h centre + 140h entreprise) :\n- Construction et préparation de séances de formation\n- Animation de séances collectives (Code de la route)\n- Animation de séances individuelles de conduite (véhicule léger)\n- Évaluation des compétences des apprenants\n- Encadrement de tiers (AAC / conduite supervisée)\n- Remédiation des difficultés d'apprentissage\n- Analyse de l'environnement routier\n\nCCP2 – Sensibiliser à la sécurité routière (350h centre + 140h entreprise) :\n- Analyse de demandes de sensibilisation\n- Conception d'actions de sensibilisation\n- Animation de séances de sensibilisation tous publics\n- Analyse et évolution des pratiques professionnelles",
    methodesEvaluation: "QCM réglementaire (semaine 2 et 4), exercice oral conduite commentée (semaine 3), animation pédagogique (semaine 6), examen blanc complet (semaine 8), mise en situation professionnelle, entretien technique, dossier professionnel",
    moyensPedagogiques: "Salle équipée vidéoprojecteur, plateau technique, véhicule à double commande, supports REMC, livret de suivi ECSR, guide du formateur, Livret ECSR Codes Rousseau, classeurs de réglementation, accès e-learning (codesrousseau.fr)",
    publicVise: "Toute personne souhaitant exercer en tant qu'enseignant de la conduite et de la sécurité routière, demandeurs d'emploi, salariés en reconversion",
    delaiAcces: "15 jours avant le début",
    dateDebut: "2025-05-26",
    dateFin: "2026-05-18",
    lieu: "Tour A, 130 rue du 8 mai 1945, 92000 Nanterre",
    nombreParticipants: "12",
    formateur: "Ouachek Abdelhakim",
    codeRNCP: "RNCP35329",
    rythmeAlternance: "Alternance théorie/pratique répartie sur 8 mois (CCP1 : 560h centre + 140h entreprise / CCP2 : 350h centre + 140h entreprise)",
  },
  {
    intitule: "Anglais Professionnel – Certification VTest Business English (RS6905)",
    objectifs: "Développer et certifier les compétences en anglais professionnel à l'oral comme à l'écrit (niveaux A2 à C2 CECRL). Préparer à la certification VTest Business English – 4 Skills (RS6905) : compréhension écrite, compréhension orale, expression écrite, expression orale.",
    prerequis: "Niveau A1 minimum en anglais (test de positionnement réalisé avant l'entrée en formation). Motivation à interagir en anglais.",
    duree: "40 heures (6 jours)",
    modalites: "distanciel",
    tarif: "999 € HT par stagiaire",
    programme: "Jour 1 : Test de positionnement, objectifs individuels, compréhension écrite (emails, rapports, documents RH)\nJour 2 : Compréhension orale (appels téléphoniques, réunions, présentations, consignes)\nJour 3 : Expression écrite (emails professionnels, comptes rendus, propositions commerciales, faux-amis)\nJour 4 : Expression orale (présentation professionnelle, participation en réunion, pitch, négociation)\nJour 5 : Grammaire et vocabulaire professionnel (temps, modaux, vocabulaire thématique, phrasal verbs)\nJour 6 : Préparation certification VTest (format d'examen, stratégies par compétence, simulation complète, bilan)",
    methodesEvaluation: "Test de positionnement initial, exercices pratiques par compétence, mises en situation professionnelles, simulation VTest chronométrée, évaluation finale orale et écrite, grille d'acquisition des compétences",
    moyensPedagogiques: "Plateforme LMS avec classe virtuelle, supports numériques interactifs, études de cas concrets, documents professionnels authentiques, accès démo VTest en ligne, suivi personnalisé avec expert dédié",
    publicVise: "Professionnels souhaitant évoluer dans un environnement anglophone, salariés, demandeurs d'emploi, indépendants",
    delaiAcces: "14 jours après inscription",
    dateDebut: "2026-09-07",
    dateFin: "2026-09-14",
    lieu: "Formation à distance – Plateforme LMS + Classe virtuelle",
    nombreParticipants: "10",
    formateur: "Catherine Dubois",
    codeRNCP: "RS6905",
    rythmeAlternance: "",
  },
  {
    intitule: "Conseiller en Insertion Professionnelle (CIP)",
    objectifs: "Accueillir et diagnostiquer les publics en insertion. Accompagner les parcours d'insertion sociale et professionnelle. Développer et entretenir des relations avec les employeurs et les partenaires du territoire.",
    prerequis: "Niveau Bac ou équivalent, expérience dans le domaine social ou de l'accompagnement souhaitée",
    duree: "497 heures (71 jours)",
    modalites: "présentiel",
    tarif: "6 500 € HT",
    programme: "CCP 1 – Accueillir pour analyser la demande des personnes et poser les bases d'un diagnostic partagé\n• Informer une personne ou un groupe sur les ressources en matière d'insertion\n• Analyser la demande de la personne et poser les bases d'un diagnostic partagé\n• Exercer une veille informationnelle, technique et prospective\n• Travailler en équipe, en réseau et en partenariat\n\nCCP 2 – Accompagner les personnes dans leur parcours d'insertion sociale et professionnelle\n• Contractualiser et suivre avec la personne son parcours d'insertion professionnelle\n• Accompagner une personne à l'élaboration de son projet professionnel\n• Accompagner la réalisation des projets professionnels\n• Concevoir des ateliers thématiques favorisant l'insertion professionnelle\n• Préparer et animer des ateliers de technique de recherche d'emploi\n• Analyser sa pratique professionnelle\n\nCCP 3 – Mettre en œuvre une offre de services auprès des employeurs pour favoriser l'insertion professionnelle\n• Déployer, dans une démarche projet, des actions de prospection avec les employeurs\n• Apporter un appui technique aux employeurs en matière de recrutement\n• Faciliter l'intégration et le maintien du salarié dans son environnement professionnel\n• Inscrire ses actes professionnels dans une démarche de développement durable et inclusive",
    methodesEvaluation: "Évaluations en cours de formation (ECF) par CCP, mise en situation professionnelle (MSP), dossier professionnel (DP), entretien avec le jury, évaluation par le tuteur en entreprise",
    moyensPedagogiques: "Salle de formation équipée, plateforme LMS, outils de simulation d'entretien, fiches techniques ROME/IMT, accès aux bases Pôle emploi et partenaires institutionnels, études de cas réels",
    publicVise: "Demandeurs d'emploi, salariés en reconversion, travailleurs sociaux souhaitant se spécialiser dans l'insertion professionnelle",
    delaiAcces: "30 jours avant le début de la session",
    dateDebut: "2026-09-01",
    dateFin: "2027-06-30",
    lieu: "25 avenue de la Formation Professionnelle, 75008 Paris",
    nombreParticipants: "12",
    formateur: "Sophie Laurent",
    codeRNCP: "RNCP37274",
    rythmeAlternance: "1 semaine CFA / 3 semaines entreprise",
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
  "Initiation Word": [5, 5, 4, 5, 4, 5, 5, 4],
  "Anglais A1": [5, 4, 5, 4, 5, 5, 4, 5],
  "Massage Prénatal": [5, 5, 5, 5, 4, 5, 5, 5],
  "ECSR": [5, 4, 5, 5, 5, 4, 5, 5],
  "VTest": [5, 5, 4, 5, 5, 4, 5, 5],
};

// Evaluation scores per stagiaire (good scores 8-10/10)
export const EVAL_SCORES: number[][] = [
  [9, 10, 8, 9, 10], // Martin Dupont
  [10, 9, 10, 9, 9], // Sophie Bernard
  [8, 9, 9, 10, 8], // Lucas Moreau
  [9, 8, 9, 8, 9], // Emma Lefebvre
  [10, 10, 9, 10, 10], // Hugo Roux
  [8, 9, 8, 9, 8], // Léa Fournier
  [9, 9, 10, 9, 9], // Antoine Girard
  [10, 8, 9, 9, 10], // Camille Durand
  [9, 10, 9, 10, 9], // Thomas Mercier
  [10, 9, 10, 9, 10], // Julie Lambert
  [8, 9, 8, 10, 9],  // Karim Petit
  [9, 10, 9, 8, 10],  // Leïla Haddad
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
