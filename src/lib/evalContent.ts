// Formation-specific QCM questions, exercises, and evaluation content

export interface QCMQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface QuestionOuverte {
  question: string;
  reponseAttendue: string;  // correct/expected answer for grading
}

export interface ExercicePratique {
  titre: string;
  consigne: string;
  reponseAttendue: string;
}

interface FormationEvalContent {
  qcmPositionnement: QCMQuestion[];
  qcmFinal: QCMQuestion[];
  exercices: ExercicePratique[];
  competences: string[];
  appreciations: string[];
  questionsOuvertesDebut?: QuestionOuverte[];
  questionsOuvertesFin?: QuestionOuverte[];
}

const EVAL_CONTENT: Record<string, FormationEvalContent> = {
  "Excel Professionnel": {
    qcmPositionnement: [
      { question: "Quelle fonction permet de rechercher une valeur dans un tableau ?", options: ["SOMME", "RECHERCHEV", "SI", "NB.SI"], correctIndex: 1 },
      { question: "Quel raccourci permet de figer une cellule dans une formule ?", options: ["Ctrl+C", "F4 ($)", "Alt+F1", "Ctrl+F"], correctIndex: 1 },
      { question: "Qu'est-ce qu'un tableau croisé dynamique ?", options: ["Un tableau en couleur", "Un outil de synthèse de données", "Un graphique 3D", "Un filtre automatique"], correctIndex: 1 },
      { question: "Quelle fonction renvoie le rang d'une valeur ?", options: ["RANG", "INDEX", "EQUIV", "DECALER"], correctIndex: 0 },
      { question: "Comment appelle-t-on une formule qui fait référence à elle-même ?", options: ["Formule itérative", "Référence circulaire", "Macro VBA", "Formule matricielle"], correctIndex: 1 },
      { question: "Quel outil permet d'automatiser des tâches répétitives dans Excel ?", options: ["Mise en forme conditionnelle", "Validation des données", "Macros VBA", "Filtre avancé"], correctIndex: 2 },
      { question: "Quelle est la syntaxe correcte de la fonction SI ?", options: ["SI(condition;valeur_si_vrai;valeur_si_faux)", "SI(valeur;condition;résultat)", "SI(test;oui;non;sinon)", "SI(A1=B1)"], correctIndex: 0 },
      { question: "Que fait la fonction SOMMEPROD ?", options: ["Additionne des cellules", "Multiplie puis additionne des plages", "Calcule un produit", "Compte les cellules"], correctIndex: 1 },
      { question: "Comment protéger une feuille Excel ?", options: ["Fichier > Enregistrer sous", "Révision > Protéger la feuille", "Affichage > Verrouiller", "Insertion > Protection"], correctIndex: 1 },
      { question: "Quelle fonction combine INDEX et EQUIV ?", options: ["Une recherche matricielle avancée", "Un tri automatique", "Un filtre dynamique", "Une mise en forme"], correctIndex: 0 },
    ],
    qcmFinal: [
      { question: "Quelle formule est correcte pour une RECHERCHEV ?", options: ["=RECHERCHEV(A1;B:D;3;FAUX)", "=RECHERCHEV(A1;3;B:D)", "=RECHV(A1;B:D;3)", "=RECHERCHE(A1;B;D;3)"], correctIndex: 0 },
      { question: "Dans un TCD, où place-t-on les champs numériques ?", options: ["Lignes", "Colonnes", "Filtres", "Valeurs"], correctIndex: 3 },
      { question: "Quelle fonction imbriquée permet de gérer les erreurs ?", options: ["SIERREUR", "SI.NON.DISP", "ESTERREUR seulement", "NB.SI"], correctIndex: 0 },
      { question: "Comment créer un graphique sparkline ?", options: ["Insertion > Graphique", "Insertion > Sparkline", "Mise en page > Sparkline", "Données > Sparkline"], correctIndex: 1 },
      { question: "Quelle touche lance l'éditeur VBA ?", options: ["F5", "Alt+F11", "Ctrl+F9", "F12"], correctIndex: 1 },
      { question: "Comment faire un SI imbriqué sur 3 niveaux ?", options: ["=SI(A1>10;\"Haut\";SI(A1>5;\"Moyen\";\"Bas\"))", "=SI(A1>10;A1>5;A1<5)", "=SI3(A1;10;5;0)", "=CHOISIR(A1;10;5;0)"], correctIndex: 0 },
      { question: "Quelle est la limite de lignes dans Excel 365 ?", options: ["65 536", "1 048 576", "500 000", "2 000 000"], correctIndex: 1 },
      { question: "Comment actualiser un TCD ?", options: ["Clic droit > Actualiser", "F5", "Ctrl+R", "Données > Trier"], correctIndex: 0 },
      { question: "Que fait la mise en forme conditionnelle ?", options: ["Trie les données", "Change l'apparence selon des règles", "Filtre les doublons", "Protège les cellules"], correctIndex: 1 },
      { question: "Comment nommer une plage de cellules ?", options: ["Zone de nom + Entrée", "Ctrl+N", "Format > Nommer", "Affichage > Nommer"], correctIndex: 0 },
    ],
    exercices: [
      { titre: "Exercice 1 : Tableau de bord commercial", consigne: "Créez un tableau de bord avec RECHERCHEV, SOMMEPROD et graphique dynamique à partir des données de ventes fournies.", reponseAttendue: "Le stagiaire doit créer un TCD avec filtre par région, un graphique en barres des ventes mensuelles, et utiliser RECHERCHEV pour afficher le détail client." },
      { titre: "Exercice 2 : Formules imbriquées", consigne: "Utilisez des SI imbriqués pour catégoriser les performances des commerciaux : Excellent (>100%), Bon (80-100%), Insuffisant (<80%).", reponseAttendue: "=SI(B2>100%;\"Excellent\";SI(B2>=80%;\"Bon\";\"Insuffisant\")) appliqué à toute la colonne avec mise en forme conditionnelle." },
      { titre: "Exercice 3 : Analyse de données avec TCD", consigne: "À partir du fichier de données RH fourni (250 salariés), créez un tableau croisé dynamique affichant la masse salariale par département et par ancienneté, avec un segment (slicer) pour filtrer par site géographique.", reponseAttendue: "TCD avec Département en lignes, Ancienneté (regroupée par tranches) en colonnes, Salaire en valeurs (Somme). Ajout d'un segment sur le champ Site. Mise en forme du TCD avec style professionnel." },
      { titre: "Exercice 4 : Graphiques avancés et mise en forme conditionnelle", consigne: "Créez un graphique combiné (barres + courbe) comparant le CA réalisé vs objectif par mois, puis appliquez une mise en forme conditionnelle avec barres de données et jeux d'icônes sur le tableau source.", reponseAttendue: "Graphique combiné avec axe secondaire pour la courbe d'objectif. Mise en forme conditionnelle : barres de données sur le CA, jeux d'icônes (flèches) sur l'écart %. Titre et légende correctement configurés." },
      { titre: "Exercice 5 : INDEX/EQUIV et validation de données", consigne: "Créez un formulaire de recherche avec INDEX/EQUIV permettant de trouver un produit par référence et afficher automatiquement le prix, le stock et le fournisseur. Ajoutez une liste déroulante de validation.", reponseAttendue: "=INDEX(Produits!C:C;EQUIV(B2;Produits!A:A;0)) pour chaque champ. Liste déroulante via Données > Validation > Liste. Gestion des erreurs avec SIERREUR pour les références inexistantes." },
      { titre: "Exercice 6 : Macro VBA simple", consigne: "Enregistrez une macro qui met en forme un tableau (bordures, en-têtes en gras, alternance de couleurs) et affectez-la à un bouton.", reponseAttendue: "Sub MiseEnForme() – Sélection du tableau, application de bordures, mise en gras de la 1ère ligne, alternance de couleur gris/blanc. Bouton assigné via Développeur > Insérer > Bouton." },
    ],
    competences: ["Formules avancées (RECHERCHEV, INDEX/EQUIV)", "Tableaux croisés dynamiques", "Graphiques et tableaux de bord", "Mise en forme conditionnelle", "Introduction aux macros VBA"],
    appreciations: [
      "Excellente maîtrise des formules avancées. Très bonne capacité d'analyse. A su réaliser le tableau de bord de façon autonome.",
      "Bonne progression sur les TCD. Les formules imbriquées sont bien comprises. La macro VBA nécessite encore de la pratique.",
      "Très bon niveau d'ensemble. Exercices réalisés avec soin et rigueur. Autonome sur INDEX/EQUIV.",
      "Niveau correct. Les fondamentaux sont acquis. Doit encore consolider les formules SI imbriquées sur cas complexes.",
      "Excellente participation. Maîtrise remarquable des TCD et des graphiques. A aidé ses pairs durant les exercices.",
      "Bonne compréhension générale. L'exercice macro VBA a été bien réalisé. Quelques hésitations sur SOMMEPROD.",
      "Solide sur les formules de base et intermédiaires. Les TCD sont bien maîtrisés. Progression visible jour après jour.",
      "Très bonne implication. A terminé tous les exercices en avance. Capacité d'analyse au-dessus de la moyenne.",
      "Bon niveau, exercices pratiques bien réussis. La mise en forme conditionnelle avancée est acquise.",
      "Progression remarquable entre le positionnement et l'évaluation finale. Les objectifs sont atteints.",
    ],
  },
  "Anglais Professionnel": {
    qcmPositionnement: [
      { question: "Choose the correct sentence:", options: ["She don't like coffee", "She doesn't likes coffee", "She doesn't like coffee", "She not like coffee"], correctIndex: 2 },
      { question: "Which is the past tense of 'to meet'?", options: ["Meeted", "Met", "Meted", "Meeting"], correctIndex: 1 },
      { question: "'I have been working here ___ 5 years'", options: ["since", "for", "during", "while"], correctIndex: 1 },
      { question: "Which word means 'to postpone'?", options: ["To bring forward", "To put off", "To set up", "To carry on"], correctIndex: 1 },
      { question: "Select the correct conditional:", options: ["If I will go, I tell you", "If I go, I will tell you", "If I go, I told you", "If I went, I will tell"], correctIndex: 1 },
      { question: "What does 'ASAP' stand for?", options: ["As soon as possible", "Always send a package", "After starting a project", "At some appointed place"], correctIndex: 0 },
      { question: "'We need to ___ the meeting to next week'", options: ["reschedule", "remeeting", "replan", "recommit"], correctIndex: 0 },
      { question: "Which is formal?", options: ["Hey, what's up?", "Dear Sir, I am writing to...", "Yo, check this out", "Wanna grab coffee?"], correctIndex: 1 },
      { question: "'The report ___ by tomorrow'", options: ["must be finished", "must finished", "must be finish", "must finishing"], correctIndex: 0 },
      { question: "Choose the correct preposition: 'I'm responsible ___'", options: ["of", "for", "to", "about"], correctIndex: 1 },
    ],
    qcmFinal: [
      { question: "'Could you ___ me the details?'", options: ["forward", "forwarding", "to forward", "forwards"], correctIndex: 0 },
      { question: "Which phrase opens a formal presentation?", options: ["So, let me tell you about...", "Good morning, I'd like to present...", "Hey everyone, check this...", "OK so basically..."], correctIndex: 1 },
      { question: "What is a 'benchmark' in business?", options: ["A type of office furniture", "A standard of comparison", "A financial penalty", "A quarterly bonus"], correctIndex: 1 },
      { question: "'The stakeholders ___ informed regularly'", options: ["should be", "should being", "should been", "should is"], correctIndex: 0 },
      { question: "Choose the correct email closing:", options: ["See ya!", "Kind regards,", "Bye bye,", "Whatever,"], correctIndex: 1 },
      { question: "'We need to ___ an agreement'", options: ["reach", "do", "make", "get"], correctIndex: 0 },
      { question: "Which TOEIC section tests listening?", options: ["Part 1-4", "Part 5-7", "Part 8-10", "Writing section"], correctIndex: 0 },
      { question: "'Despite ___ the rain, they continued'", options: ["of", "—", "to", "for"], correctIndex: 0 },
      { question: "What does ROI mean?", options: ["Return On Investment", "Rate Of Interest", "Revenue Of Income", "Range Of Impact"], correctIndex: 0 },
      { question: "'I look forward to ___ from you'", options: ["hear", "hearing", "heard", "hears"], correctIndex: 1 },
    ],
    exercices: [
      { titre: "Exercise 1: Business Email Writing", consigne: "Write a formal email to a client requesting a meeting to discuss a new partnership opportunity. Include subject, greeting, body, and closing.", reponseAttendue: "Subject: Partnership Meeting Request – Body with formal tone, clear request, proposed dates, professional closing with 'Kind regards'." },
      { titre: "Exercise 2: Negotiation Role Play", consigne: "Prepare and perform a negotiation dialogue between a supplier and a buyer discussing pricing and delivery terms.", reponseAttendue: "Use of polite negotiation language: 'Would you consider...', 'We could offer...', 'What if we agreed on...'. Final compromise reached." },
      { titre: "Exercise 3: Meeting Minutes", consigne: "Listen to the recorded meeting extract and write professional meeting minutes including: attendees, agenda items discussed, decisions made, and action items with deadlines.", reponseAttendue: "Structured minutes with header (date, attendees), agenda items as numbered sections, clear decisions recorded, action items table (Who/What/When). Professional English throughout." },
      { titre: "Exercise 4: Complaint Handling", consigne: "Write a formal response to a customer complaint about a delayed delivery. Acknowledge the issue, explain the situation, propose a solution, and maintain the business relationship.", reponseAttendue: "Dear [Customer], Thank you for bringing this to our attention. We sincerely apologize for the delay... We have investigated and... As compensation, we would like to offer... We value your partnership. Kind regards." },
      { titre: "Exercise 5: Presentation Skills", consigne: "Prepare a 5-minute oral presentation introducing your company's new product to potential investors.", reponseAttendue: "Structured presentation with introduction, key features, market analysis, competitive advantage, and call to action. Professional vocabulary and confident delivery." },
      { titre: "Exercise 6: Cross-cultural Communication", consigne: "Analyze the case study about a failed international negotiation and identify the cultural misunderstandings. Write recommendations for improving cross-cultural business communication.", reponseAttendue: "Identification of cultural dimensions (Hofstede): direct vs indirect communication, high/low context. Recommendations: research partner's culture, adapt communication style, use clear language, confirm understanding." },
    ],
    competences: ["Communication orale professionnelle", "Rédaction d'emails professionnels", "Négociation en anglais", "Présentations professionnelles", "Compréhension TOEIC"],
    appreciations: [
      "Excellent niveau oral. S'exprime avec aisance et confiance. Vocabulaire riche et précis. Score TOEIC blanc : 890.",
      "Bonne progression en rédaction professionnelle. L'email formel est maîtrisé. Quelques erreurs de grammaire à corriger.",
      "Très bon niveau de compréhension. La négociation en anglais a été bien menée. Accent à améliorer.",
      "Participation active et motivée. Bon niveau intermédiaire consolidé. Score TOEIC blanc : 785.",
      "Excellente maîtrise de l'anglais écrit. Les présentations orales sont structurées et convaincantes.",
      "Bon niveau d'ensemble. Le vocabulaire business est acquis. Doit encore pratiquer les conditional sentences.",
      "Très bonne écoute et compréhension. Les exercices TOEIC sont bien réussis. Progression visible.",
      "Solide en communication professionnelle. L'exercice de négociation a été remarquable.",
      "Bonne capacité de rédaction. Les emails sont clairs et professionnels. Grammaire en progression.",
      "Excellent résultat global. A atteint le score TOEIC visé. Autonome en anglais professionnel.",
    ],
  },
  "FLE Médico-Social": {
    qcmPositionnement: [
      { question: "Comment dit-on 'bonjour' de manière formelle à un usager ?", options: ["Salut !", "Bonjour Madame / Monsieur", "Coucou", "Hey"], correctIndex: 1 },
      { question: "Quel professionnel s'occupe des soins infirmiers ?", options: ["L'éducateur", "L'IDE (infirmier)", "Le psychologue", "Le cuisinier"], correctIndex: 1 },
      { question: "Que signifie 'EHPAD' ?", options: ["École d'Hébergement pour Adolescents", "Établissement d'Hébergement pour Personnes Âgées Dépendantes", "Entreprise Hospitalière", "Établissement Hautement Protégé"], correctIndex: 1 },
      { question: "Quelle est la formule correcte : 'Je ___ aide-soignant(e)' ?", options: ["suis", "est", "a", "ont"], correctIndex: 0 },
      { question: "Comment demander poliment à un résident de s'asseoir ?", options: ["Assieds-toi !", "Vous pouvez vous asseoir, s'il vous plaît", "Assis !", "Va t'asseoir"], correctIndex: 1 },
      { question: "Quel document retrace les observations quotidiennes sur un résident ?", options: ["Le CV", "Le cahier de liaison / transmissions", "Le contrat de travail", "La fiche de paie"], correctIndex: 1 },
      { question: "Que veut dire 'PSH' ?", options: ["Personnel de Santé Hospitalier", "Personne en Situation de Handicap", "Protocole de Sécurité Hygiène", "Plan Social Humain"], correctIndex: 1 },
      { question: "Comment conjugue-t-on 'prendre' au présent avec 'nous' ?", options: ["Nous prennons", "Nous prenons", "Nous prendons", "Nous prends"], correctIndex: 1 },
      { question: "Que faut-il faire en cas de chute d'un résident ?", options: ["Ne rien faire", "Appeler l'infirmière et sécuriser la personne", "Relever la personne immédiatement seul(e)", "Partir chercher le directeur"], correctIndex: 1 },
      { question: "Quel est le rôle d'un AES ?", options: ["Comptable", "Accompagnant Éducatif et Social", "Architecte", "Agent d'entretien"], correctIndex: 1 },
    ],
    qcmFinal: [
      { question: "Comment rédiger une transmission correcte ?", options: ["Date + nom du résident + faits observés + actions + signature", "Juste écrire 'ça va'", "Envoyer un SMS au chef", "Ne rien écrire"], correctIndex: 0 },
      { question: "Quel est le temps verbal pour raconter un événement passé ?", options: ["Le futur", "Le passé composé", "Le conditionnel", "L'impératif"], correctIndex: 1 },
      { question: "Que signifie 'secret professionnel' ?", options: ["Dire tout à tout le monde", "Ne pas divulguer d'informations sur les usagers en dehors du cadre professionnel", "Garder un secret personnel", "Ne jamais parler au travail"], correctIndex: 1 },
      { question: "Comment reformuler pour vérifier la compréhension ?", options: ["Répéter exactement la même chose", "Dire 'Si je comprends bien, vous dites que…'", "Ignorer l'interlocuteur", "Changer de sujet"], correctIndex: 1 },
      { question: "Quel document présente la structure à un nouvel arrivant ?", options: ["Le projet personnalisé", "Le livret d'accueil", "Le bilan comptable", "Le planning"], correctIndex: 1 },
      { question: "Comment exprimer poliment un désaccord en réunion ?", options: ["Tu as tort !", "Je comprends votre point de vue, mais je pense que…", "C'est n'importe quoi", "Je refuse de discuter"], correctIndex: 1 },
      { question: "Que contient un projet personnalisé (PIA) ?", options: ["Le salaire du résident", "Les objectifs et moyens d'accompagnement de l'usager", "Les horaires de travail", "Le menu de la semaine"], correctIndex: 1 },
      { question: "Complétez : 'Mme Martin ___ bien dormi cette nuit.'", options: ["à", "a", "as", "est"], correctIndex: 1 },
      { question: "Que signifie MDPH ?", options: ["Maison de la Danse et du Patrimoine Historique", "Maison Départementale des Personnes Handicapées", "Ministère du Développement et du Plan Humain", "Module de Diagnostic Professionnel"], correctIndex: 1 },
      { question: "Quelle attitude adopter avec les familles des résidents ?", options: ["Ignorer leurs questions", "Être factuel, professionnel et rassurant", "Donner son avis personnel", "Critiquer les collègues"], correctIndex: 1 },
    ],
    exercices: [
      { titre: "Exercice 1 : Rédaction de transmission", consigne: "Rédigez une transmission pour la situation suivante : ce matin à 8h, M. Dupont a refusé de prendre son petit-déjeuner. Il a dit qu'il avait mal à l'estomac. Vous avez pris sa température (37,5°C) et prévenu l'infirmière.", reponseAttendue: "08/01/2024 – 8h – M. DUPONT : A refusé le petit-déjeuner ce matin. Se plaint de douleurs à l'estomac. Température prise : 37,5°C. Infirmière prévenue. Signé : le stagiaire." },
      { titre: "Exercice 2 : Jeu de rôle – Accueil", consigne: "Vous accueillez une nouvelle résidente, Mme Leroy, 82 ans, accompagnée de son fils. Préparez votre discours d'accueil : présentez-vous, montrez la chambre, expliquez les horaires et les activités.", reponseAttendue: "Bonjour Mme Leroy, bienvenue dans notre établissement. Je suis votre accompagnant(e), aide-soignant(e). Je vais vous montrer votre chambre... Les repas sont servis à 8h, 12h et 19h. Nous proposons des activités chaque jour..." },
      { titre: "Exercice 3 : Compréhension de protocole", consigne: "Lisez le protocole d'urgence ci-dessous et répondez aux questions : En cas de chute : 1) Sécuriser la personne, 2) Ne pas la relever seul, 3) Appeler l'infirmière, 4) Noter l'heure et les circonstances.", reponseAttendue: "1. On sécurise d'abord la personne. 2. On ne la relève pas seul pour éviter d'aggraver une éventuelle blessure. 3. On appelle l'infirmière. 4. On note les circonstances pour la traçabilité." },
      { titre: "Exercice 4 : Vocabulaire médico-social", consigne: "Associez chaque sigle à sa signification : AES, IDE, EHPAD, MDPH, CVS, PIA.", reponseAttendue: "AES = Accompagnant Éducatif et Social, IDE = Infirmier Diplômé d'État, EHPAD = Établissement d'Hébergement pour Personnes Âgées Dépendantes, MDPH = Maison Départementale des Personnes Handicapées, CVS = Conseil de la Vie Sociale, PIA = Projet Individuel d'Accompagnement." },
      { titre: "Exercice 5 : Communication avec les familles", consigne: "La fille de Mme Martin vous appelle pour demander des nouvelles. Mme Martin est tombée hier mais va bien. Préparez votre réponse téléphonique en respectant le secret professionnel.", reponseAttendue: "Bonjour Madame, ici l'équipe soignante de l'établissement. Votre maman va bien aujourd'hui. Elle a eu une petite chute hier mais le médecin l'a examinée et tout va bien. Elle se repose dans sa chambre. Souhaitez-vous parler à l'infirmière pour plus de détails ?" },
      { titre: "Exercice 6 : Compte rendu de réunion", consigne: "Rédigez un court compte rendu de la réunion d'équipe du 15/01/2024. Thème : situation de M. Garcia, nouveau résident depuis 1 semaine. Points abordés : intégration progressive, participation aux activités.", reponseAttendue: "Compte rendu – Réunion du 15/01/2024. Présents : l'équipe pluridisciplinaire. Point : Situation de M. Garcia. Constat : bonne intégration, participation à l'atelier peinture. Décision : poursuivre l'accompagnement, proposer l'atelier jardinage. Prochaine réunion : 22/01/2024." },
      { titre: "Exercice 7 : Lecture d'un protocole de soins", consigne: "Lisez le protocole suivant et répondez : En cas de fièvre > 38,5°C : 1) Prendre la température, 2) Prévenir l'IDE, 3) Découvrir légèrement le résident, 4) Proposer de l'eau, 5) Surveiller toutes les 30 min. Question : Que faites-vous en premier ? Qui prévenez-vous ? À quelle fréquence surveillez-vous ?", reponseAttendue: "1. En premier, je prends la température avec le thermomètre auriculaire. 2. Je préviens l'IDE (infirmière diplômée d'État) de service. 3. Je surveille le résident toutes les 30 minutes et je note les observations dans les transmissions." },
      { titre: "Exercice 8 : Rédaction d'un email professionnel", consigne: "Rédigez un email au médecin traitant de Mme Dupont pour l'informer que sa patiente présente une perte d'appétit depuis une semaine et demander un rendez-vous.", reponseAttendue: "Objet : Suivi de Mme Dupont – Perte d'appétit. Bonjour Docteur, je me permets de vous contacter au sujet de Mme Dupont, résidente dans notre structure. Nous observons depuis une semaine une perte d'appétit significative : elle ne consomme qu'un tiers de ses repas. Serait-il possible de programmer une consultation ? Cordialement, [Nom, Fonction, Structure]." },
      { titre: "Exercice 9 : Gestion de conflit avec une famille", consigne: "Le fils de M. Leroy est en colère car il estime que son père n'est pas assez accompagné lors des repas. Préparez votre réponse orale pour le rassurer et proposer une solution.", reponseAttendue: "Monsieur, je comprends votre inquiétude concernant l'accompagnement de votre père pendant les repas. Nous prenons votre remarque très au sérieux. Je vais en parler au chef de service pour voir comment nous pouvons renforcer la présence auprès de votre père durant les repas. Souhaitez-vous que nous organisions un rendez-vous pour en discuter ensemble ?" },
      { titre: "Exercice 10 : Analyse d'un projet personnalisé", consigne: "À partir des informations suivantes, rédigez un objectif pour le projet personnalisé de Mme Bernard : 85 ans, isolée, ne sort plus de sa chambre depuis 2 semaines, ancien goût pour le jardinage.", reponseAttendue: "Objectif : Favoriser la socialisation de Mme Bernard en lui proposant de participer à l'atelier jardinage 2 fois par semaine. Moyens : accompagnement individualisé par l'AES référent, encouragement progressif, aménagement d'un espace jardinage accessible. Évaluation : observer sa participation et son état émotionnel après 1 mois." },
    ],
    competences: ["Communication orale en français professionnel", "Rédaction de transmissions", "Vocabulaire médico-social", "Participation aux réunions d'équipe", "Communication avec les familles", "Lecture et application des protocoles", "Communication avec les partenaires", "Rédaction d'emails professionnels"],
    appreciations: [
      "Excellente progression en français professionnel. Les transmissions sont claires et bien structurées. Participation active aux jeux de rôle.",
      "Bon niveau de compréhension orale et écrite. Le vocabulaire médico-social est bien maîtrisé. Quelques erreurs de conjugaison à corriger.",
      "Très bonne implication. Les mises en situation d'accueil sont réussies. La rédaction progresse significativement.",
      "Niveau satisfaisant. Les bases de la communication professionnelle sont acquises. Doit encore travailler la rédaction des comptes rendus.",
      "Excellente capacité d'écoute et de reformulation. Le secret professionnel est bien compris. Vocabulaire riche et approprié.",
      "Bonne progression sur les écrits professionnels. Les transmissions sont factuelles. L'expression orale est fluide.",
      "Très bon résultat. Maîtrise du vocabulaire spécialisé. Les protocoles sont bien compris et expliqués.",
      "Participation active et motivée. Les exercices de rédaction sont bien réalisés. Bonne capacité d'adaptation au contexte.",
      "Solide acquisition des compétences linguistiques professionnelles. Les jeux de rôle montrent une aisance croissante.",
      "Progression remarquable entre le début et la fin de formation. Les objectifs B1 sont atteints dans le contexte professionnel.",
    ],
  },
  "IA Générative": {
    qcmPositionnement: [
      { question: "Qu'est-ce que l'IA générative ?", options: ["Un robot physique", "Un algorithme capable de créer du contenu nouveau", "Un moteur de recherche", "Un réseau social"], correctIndex: 1 },
      { question: "Quel outil est spécialisé dans la génération de texte ?", options: ["Photoshop", "ChatGPT", "Excel", "Canva classique"], correctIndex: 1 },
      { question: "Qu'est-ce qu'un 'prompt' ?", options: ["Un type d'image", "Une instruction donnée à l'IA", "Un logiciel de design", "Un réseau social"], correctIndex: 1 },
      { question: "Quel outil génère des images par IA ?", options: ["Word", "Midjourney", "Outlook", "PowerPoint"], correctIndex: 1 },
      { question: "Que signifie RGPD ?", options: ["Règlement Général sur la Protection des Données", "Réseau Global de Production Digitale", "Registre Général des Produits Dérivés", "Rapport Graphique de Performance"], correctIndex: 0 },
      { question: "Qu'est-ce qu'une 'hallucination' de l'IA ?", options: ["Un bug d'affichage", "L'IA qui invente des faits inexistants", "Une image floue", "Un problème de connexion"], correctIndex: 1 },
      { question: "Quel est le principal risque lié à l'utilisation de l'IA en rédaction ?", options: ["Écrire trop vite", "Publier du contenu non vérifié ou inexact", "Avoir trop d'idées", "Manquer de papier"], correctIndex: 1 },
      { question: "Que peut-on faire avec Canva IA ?", options: ["Uniquement du texte", "Générer des images et du design graphique", "De la comptabilité", "Du montage vidéo avancé"], correctIndex: 1 },
      { question: "L'IA peut-elle remplacer totalement un rédacteur humain ?", options: ["Oui, complètement", "Non, elle reste un outil d'assistance", "Seulement pour les emails", "Uniquement en anglais"], correctIndex: 1 },
      { question: "Quel format d'image est adapté aux réseaux sociaux ?", options: ["A4 portrait", "Carré (1:1) pour Instagram, 16:9 pour bannières", "A3 paysage", "Pas de format spécifique"], correctIndex: 1 },
    ],
    qcmFinal: [
      { question: "Quels sont les 5 éléments d'un bon prompt ?", options: ["Rôle, Contexte, Tâche, Contraintes, Format", "Titre, Image, Lien, Couleur, Police", "Date, Lieu, Heure, Nom, Prénom", "Sujet, Verbe, COD, COI, CC"], correctIndex: 0 },
      { question: "Quelle technique consiste à donner des exemples à l'IA ?", options: ["Zero-shot", "Few-shot prompting", "Brainstorming", "Mind mapping"], correctIndex: 1 },
      { question: "Que dit l'AI Act européen ?", options: ["L'IA est interdite", "Des obligations de transparence pour les contenus IA", "Seuls les Européens peuvent utiliser l'IA", "L'IA est libre de tout cadre"], correctIndex: 1 },
      { question: "Comment maintenir une cohérence visuelle avec l'IA ?", options: ["Utiliser un outil différent à chaque fois", "Créer un prompt template avec ses constantes visuelles", "Ne jamais utiliser d'images", "Changer de style chaque semaine"], correctIndex: 1 },
      { question: "Que faut-il faire avant de publier un texte généré par IA ?", options: ["Le publier immédiatement", "Le vérifier, le relire et l'enrichir", "Le traduire", "Le supprimer"], correctIndex: 1 },
      { question: "Quel outil est intégré à la suite Adobe pour l'IA ?", options: ["Midjourney", "DALL-E", "Adobe Firefly", "Canva"], correctIndex: 2 },
      { question: "Peut-on saisir des données personnelles dans ChatGPT ?", options: ["Oui, sans limite", "Non, cela enfreint le RGPD", "Seulement les emails", "Seulement les noms"], correctIndex: 1 },
      { question: "Quel est l'avantage du prompting itératif ?", options: ["Obtenir un résultat parfait du premier coup", "Affiner progressivement le résultat", "Écrire moins", "Utiliser moins de tokens"], correctIndex: 1 },
      { question: "Comment citer l'utilisation de l'IA dans un contenu ?", options: ["Ne rien mentionner", "'Contenu rédigé avec l'aide de l'IA et vérifié par [nom]'", "Mettre 'copié d'Internet'", "Écrire 'fait par robot'"], correctIndex: 1 },
      { question: "Quel est le workflow recommandé pour un article avec IA ?", options: ["Copier-coller directement", "Brief → Plan → Rédaction par section → Enrichissement → Relecture → SEO", "Écrire tout soi-même puis demander à l'IA de corriger", "Laisser l'IA faire tout automatiquement"], correctIndex: 1 },
    ],
    exercices: [
      { titre: "Exercice 1 : Rédaction d'un prompt structuré", consigne: "Rédigez un prompt complet (avec Rôle, Contexte, Tâche, Contraintes, Format) pour demander à ChatGPT de rédiger un article de blog sur les bienfaits de la formation continue.", reponseAttendue: "Prompt incluant un rôle (rédacteur web expert), un contexte (blog d'un organisme de formation), une tâche (article 800 mots), des contraintes (ton professionnel, 3 H2, données chiffrées) et un format (markdown)." },
      { titre: "Exercice 2 : Création de posts réseaux sociaux", consigne: "Utilisez ChatGPT pour créer 3 posts LinkedIn avec 3 angles différents (informatif, storytelling, chiffres) pour promouvoir une formation en management.", reponseAttendue: "3 posts distincts de 150-300 mots chacun. Post 1 : informatif avec programme et bénéfices. Post 2 : témoignage/histoire de transformation. Post 3 : statistiques et données concrètes. Chacun avec CTA et hashtags." },
      { titre: "Exercice 3 : Génération d'image professionnelle", consigne: "Rédigez 3 prompts pour Midjourney ou DALL-E pour créer : 1) Une bannière de formation, 2) Une illustration de travail d'équipe, 3) Un visuel pour une newsletter.", reponseAttendue: "3 prompts structurés avec sujet, style, ambiance, composition et paramètres techniques. Bannière en 16:9, illustration cohérente avec charte graphique, visuel newsletter épuré." },
      { titre: "Exercice 4 : Adaptation de ton", consigne: "Prenez un paragraphe technique sur l'IA et demandez à ChatGPT de le réécrire dans 3 tons différents : soutenu, professionnel courant, décontracté.", reponseAttendue: "3 versions du même contenu avec vocabulaire, structure de phrases et expressions adaptés à chaque registre. Le sens reste identique mais le style change significativement." },
      { titre: "Exercice 5 : Vérification et fact-checking", consigne: "ChatGPT a généré un article contenant 5 faits. Vérifiez chaque fait en croisant les sources. Identifiez les hallucinations éventuelles et corrigez-les.", reponseAttendue: "Chaque fait est vérifié avec au moins 2 sources fiables. Les hallucinations sont identifiées et corrigées avec les bonnes informations. Les sources sont citées." },
      { titre: "Exercice 6 : Campagne de communication complète", consigne: "Créez une mini-campagne de communication pour annoncer le lancement d'une nouvelle formation : 1 article de blog, 1 post LinkedIn, 1 email, 1 visuel. Documentez vos prompts.", reponseAttendue: "4 livrables cohérents en message et en style. Fiche de traçabilité avec les prompts utilisés, les outils, les modifications apportées manuellement. Mentions IA appropriées." },
    ],
    competences: ["Prompt engineering", "Rédaction assistée par IA", "Création visuelle par IA", "Cadre juridique IA (RGPD, droit d'auteur)", "Workflow intégré texte + image"],
    appreciations: [
      "Excellente maîtrise du prompt engineering. Les contenus produits sont de grande qualité et bien personnalisés. Très bonne compréhension du cadre éthique.",
      "Bonne progression sur la création de contenus. Les prompts sont bien structurés. Doit encore travailler la vérification systématique des faits.",
      "Très bon niveau d'ensemble. La campagne finale est créative et cohérente. Usage responsable de l'IA bien intégré.",
      "Niveau satisfaisant. Les bases du prompting sont acquises. Les visuels générés sont pertinents. Doit approfondir les aspects juridiques.",
      "Excellente créativité dans l'utilisation des outils IA. Les adaptations de ton sont remarquables. Participation très active.",
      "Bonne compréhension des outils et de leurs limites. Le fact-checking est rigoureux. Les contenus sont professionnels.",
      "Très bonne implication. Le workflow texte + image est bien maîtrisé. Bonne documentation des prompts.",
      "Solide acquisition des compétences. Les exercices de création de contenu sont bien réalisés. Progression visible.",
      "Bon résultat. L'utilisation de Canva IA et ChatGPT est fluide. Les mentions obligatoires sont respectées.",
      "Progression remarquable. De novice en IA à un usage confiant et responsable. Les objectifs sont pleinement atteints.",
    ],
  },
};

// Default content for formations not specifically mapped
const DEFAULT_CONTENT: FormationEvalContent = {
  qcmPositionnement: [
    { question: "Quel est l'objectif principal de cette formation ?", options: ["Développer des compétences spécifiques", "Obtenir un diplôme uniquement", "Se divertir", "Aucun objectif"], correctIndex: 0 },
    { question: "Quelle méthode pédagogique est la plus efficace ?", options: ["Cours magistral seul", "Alternance théorie/pratique", "Lecture individuelle", "Pas de méthode"], correctIndex: 1 },
    { question: "Comment évaluer l'atteinte d'un objectif pédagogique ?", options: ["Par l'assiduité", "Par une évaluation formative et sommative", "Par la durée de présence", "Par le nombre de questions posées"], correctIndex: 1 },
    { question: "Qu'est-ce qu'un prérequis de formation ?", options: ["Un document administratif", "Un niveau ou compétence nécessaire avant la formation", "Le lieu de formation", "Le tarif de la formation"], correctIndex: 1 },
    { question: "Que signifie 'compétence' dans le contexte professionnel ?", options: ["Savoir uniquement", "Savoir, savoir-faire et savoir-être", "Diplôme obtenu", "Ancienneté dans le poste"], correctIndex: 1 },
    { question: "Quel document formalise les objectifs de la formation ?", options: ["Le devis", "Le programme de formation", "La facture", "Le contrat de travail"], correctIndex: 1 },
    { question: "Quelle est la différence entre évaluation formative et sommative ?", options: ["Aucune", "Formative = en cours / Sommative = finale", "Formative = écrite / Sommative = orale", "Elles sont identiques"], correctIndex: 1 },
    { question: "Comment mesure-t-on la satisfaction des stagiaires ?", options: ["Par les résultats uniquement", "Par un questionnaire de satisfaction", "Par l'assiduité", "Par le formateur"], correctIndex: 1 },
    { question: "Qu'est-ce que l'individualisation du parcours ?", options: ["Formation identique pour tous", "Adaptation au profil et besoins de chaque stagiaire", "Choix du formateur", "Réduction de durée"], correctIndex: 1 },
    { question: "Quel est le rôle du référent handicap ?", options: ["Gérer la comptabilité", "Accompagner les personnes en situation de handicap", "Recruter les formateurs", "Enseigner uniquement"], correctIndex: 1 },
  ],
  qcmFinal: [
    { question: "Les objectifs fixés en début de formation ont-ils été atteints ?", options: ["Totalement", "Partiellement", "Pas du tout", "Non évalués"], correctIndex: 0 },
    { question: "Quelle compétence clé avez-vous développée ?", options: ["Compétence technique principale", "Aucune compétence", "Compétence non liée", "Ne sait pas"], correctIndex: 0 },
    { question: "Êtes-vous capable d'appliquer les acquis en situation professionnelle ?", options: ["Oui, en autonomie", "Oui, avec accompagnement", "Non", "Peut-être"], correctIndex: 0 },
    { question: "Quel outil/méthode de la formation utiliseriez-vous en priorité ?", options: ["Les outils présentés en cours", "Aucun outil", "Des outils non abordés", "Ne sait pas"], correctIndex: 0 },
    { question: "Comment évaluez-vous votre progression ?", options: ["Très significative", "Moyenne", "Faible", "Nulle"], correctIndex: 0 },
    { question: "Recommanderiez-vous cette formation ?", options: ["Oui, fortement", "Oui, avec réserves", "Non", "Ne sait pas"], correctIndex: 0 },
    { question: "Quels axes d'amélioration identifiez-vous ?", options: ["Pratique régulière des acquis", "Aucun besoin", "Tout est à revoir", "Formation trop courte"], correctIndex: 0 },
    { question: "Évaluez votre maîtrise des outils présentés :", options: ["Bonne maîtrise", "Maîtrise partielle", "Aucune maîtrise", "Non concerné"], correctIndex: 0 },
    { question: "La méthodologie proposée est-elle transférable ?", options: ["Oui, directement applicable", "Partiellement", "Non", "Ne sait pas"], correctIndex: 0 },
    { question: "Quel est votre plan d'action post-formation ?", options: ["Mise en pratique immédiate", "Formation complémentaire", "Aucun plan", "À définir"], correctIndex: 0 },
  ],
  exercices: [
    { titre: "Exercice 1 : Mise en situation professionnelle", consigne: "À partir du cas pratique fourni, appliquez la méthodologie vue en formation pour résoudre la problématique présentée.", reponseAttendue: "Application structurée de la méthodologie en 4 étapes : analyse du contexte, identification des enjeux, proposition de solutions, plan d'action." },
    { titre: "Exercice 2 : Étude de cas", consigne: "Analysez le cas d'entreprise présenté et proposez des recommandations argumentées.", reponseAttendue: "Diagnostic complet, identification de 3 axes d'amélioration, recommandations avec argumentaire et planning de mise en œuvre." },
    { titre: "Exercice 3 : Analyse critique", consigne: "Évaluez la situation décrite dans le document fourni. Identifiez les points forts et les points faibles, puis proposez un plan d'amélioration en 5 points.", reponseAttendue: "Analyse SWOT ou similaire avec au minimum 3 forces et 3 faiblesses identifiées. Plan d'amélioration en 5 actions avec indicateurs de suivi et échéancier." },
    { titre: "Exercice 4 : Travail collaboratif", consigne: "En binôme, réalisez une synthèse des acquis de la formation sous forme de fiche mémo réutilisable en situation professionnelle.", reponseAttendue: "Fiche mémo structurée : titre, objectif, étapes clés de la méthodologie, outils à utiliser, erreurs à éviter, ressources complémentaires. Présentation claire et concise." },
    { titre: "Exercice 5 : Projet pratique", consigne: "Réalisez le livrable demandé en utilisant les outils et techniques vus en formation.", reponseAttendue: "Livrable conforme aux attentes : structure claire, utilisation des outils, qualité du rendu, respect des consignes." },
    { titre: "Exercice 6 : Restitution et argumentation", consigne: "Préparez une restitution orale de 5 minutes présentant votre projet et argumentez vos choix méthodologiques devant le groupe.", reponseAttendue: "Présentation structurée (intro, contexte, démarche, résultats, conclusion). Argumentation des choix basée sur les enseignements de la formation. Réponses aux questions du groupe." },
  ],
  competences: ["Compétence technique 1", "Compétence technique 2", "Compétence méthodologique", "Autonomie professionnelle", "Capacité d'analyse"],
  appreciations: [
    "Très bon niveau d'ensemble. Les objectifs sont pleinement atteints. Participation active et travail rigoureux.",
    "Bonne progression tout au long de la formation. Les exercices pratiques sont bien réalisés. Quelques points à consolider.",
    "Excellent travail. Fait preuve d'initiative et d'autonomie. Les compétences clés sont acquises.",
    "Niveau satisfaisant. Les fondamentaux sont maîtrisés. Doit poursuivre la pratique pour consolider les acquis.",
    "Très bonne implication. Les mises en situation sont réussies. Capacité d'adaptation remarquable.",
    "Bon résultat. L'étude de cas a été particulièrement bien traitée. Axes de progression identifiés.",
    "Solide acquisition des compétences visées. Travail soigné et méthodique.",
    "Bonne participation. Les exercices sont réussis avec un bon niveau de qualité. En bonne voie.",
    "Progression significative entre le début et la fin de formation. Objectifs atteints.",
    "Excellent résultat final. Maîtrise complète des outils et méthodes présentés.",
  ],
};

// Map formation intitulé to content key
function getContentKey(intitule: string): string {
  const lower = intitule.toLowerCase();
  if (lower.includes("excel")) return "Excel Professionnel";
  if (lower.includes("anglais")) return "Anglais Professionnel";
  if (lower.includes("informatique") || lower.includes("admin") || lower.includes("réseau") || lower.includes("système")) return "Informatique";
  if (lower.includes("management") || lower.includes("leadership")) return "Management";
  if (lower.includes("digital") || lower.includes("marketing") || lower.includes("seo")) return "Digital Marketing";
  if (lower.includes("bureautique") || lower.includes("word") || lower.includes("pack office")) return "Bureautique";
  if (lower.includes("esthétique") || lower.includes("cosmétique") || lower.includes("cap")) return "CAP Esthétique";
  if (lower.includes("français") || lower.includes("médico-social") || lower.includes("social")) return "FLE Médico-Social";
  if (lower.includes("intelligence artificielle") || lower.includes("ia générative") || lower.includes("contenus rédactionnels")) return "IA Générative";
  return "";
}

export function getEvalContent(formationIntitule: string): FormationEvalContent {
  const key = getContentKey(formationIntitule);
  return EVAL_CONTENT[key] || DEFAULT_CONTENT;
}

// ===== STAGIAIRE PROFILE SYSTEM =====
// Each stagiaire gets a unique "profile" that determines their answer patterns,
// strengths, weaknesses, and overall performance level.

interface StagiaireProfile {
  level: 'excellent' | 'bon' | 'moyen' | 'debutant';
  strongAreas: number[];  // indices of questions where they're strong
  weakAreas: number[];    // indices of questions where they struggle
  errorRate: number;      // 0.0 to 0.5
  hesitationRate: number; // chance of picking adjacent-to-correct answer
}

function buildStagiaireProfile(stagiaireIndex: number, totalQuestions: number): StagiaireProfile {
  // Use a hash-like function to create unique but deterministic profiles
  const hash = (n: number) => ((n * 2654435761) >>> 0) % 100;
  const h = hash(stagiaireIndex * 31 + 17);

  // Determine level based on hash
  let level: StagiaireProfile['level'];
  let errorRate: number;
  if (h < 20) { level = 'excellent'; errorRate = 0.05 + (h % 10) * 0.01; }
  else if (h < 55) { level = 'bon'; errorRate = 0.15 + (h % 15) * 0.01; }
  else if (h < 80) { level = 'moyen'; errorRate = 0.25 + (h % 10) * 0.01; }
  else { level = 'debutant'; errorRate = 0.35 + (h % 15) * 0.01; }

  // Determine strong/weak areas (unique per stagiaire)
  const strongAreas: number[] = [];
  const weakAreas: number[] = [];
  for (let i = 0; i < totalQuestions; i++) {
    const qHash = hash(stagiaireIndex * 37 + i * 13 + 7);
    if (qHash < 25) strongAreas.push(i);
    else if (qHash > 80) weakAreas.push(i);
  }

  const hesitationRate = level === 'debutant' ? 0.6 : level === 'moyen' ? 0.4 : 0.2;

  return { level, strongAreas, weakAreas, errorRate, hesitationRate };
}

// Generate stagiaire answers with truly varied patterns per person
export function generateStagiaireAnswers(questions: QCMQuestion[], stagiaireIndex: number): number[] {
  const profile = buildStagiaireProfile(stagiaireIndex, questions.length);
  const hash = (a: number, b: number) => ((a * 2654435761 + b * 1597334677) >>> 0) % 1000;

  return questions.map((q, qi) => {
    const qSeed = hash(stagiaireIndex, qi);
    const isStrong = profile.strongAreas.includes(qi);
    const isWeak = profile.weakAreas.includes(qi);

    // Adjust error chance based on strength/weakness
    let effectiveErrorRate = profile.errorRate;
    if (isStrong) effectiveErrorRate *= 0.2; // Much less likely to err on strong areas
    if (isWeak) effectiveErrorRate = Math.min(0.7, effectiveErrorRate * 2.5); // Much more likely on weak areas

    const willError = (qSeed / 1000) < effectiveErrorRate;

    if (!willError) {
      return q.correctIndex;
    }

    // Wrong answer: sometimes picks adjacent option (hesitation), sometimes random
    const willHesitate = ((qSeed * 3) % 1000) / 1000 < profile.hesitationRate;
    if (willHesitate) {
      // Pick adjacent to correct (common mistake pattern)
      const offset = ((qSeed % 2) === 0) ? 1 : -1;
      return ((q.correctIndex + offset) + q.options.length) % q.options.length;
    } else {
      // Pick a random wrong answer
      const wrongOptions = q.options.map((_, i) => i).filter(i => i !== q.correctIndex);
      return wrongOptions[(qSeed * 7) % wrongOptions.length];
    }
  });
}

export function computeQCMScore(questions: QCMQuestion[], answers: number[]): { score: number; total: number; details: { correct: boolean }[] } {
  let score = 0;
  const details = questions.map((q, i) => {
    const correct = answers[i] === q.correctIndex;
    if (correct) score++;
    return { correct };
  });
  return { score, total: questions.length, details };
}

// Get a unique appreciation for a stagiaire based on their profile and score
export function getStagiaireAppreciation(appreciations: string[], stagiaireIndex: number, scorePercent: number): string {
  // Map score to an appreciation range
  let poolStart: number;
  if (scorePercent >= 90) poolStart = 0; // Top appreciations
  else if (scorePercent >= 75) poolStart = 2;
  else if (scorePercent >= 60) poolStart = 4;
  else poolStart = 6;

  // Pick from a 3-appreciation window, using stagiaireIndex to vary
  const poolSize = Math.min(3, appreciations.length - poolStart);
  const idx = (poolStart + (stagiaireIndex % poolSize)) % appreciations.length;
  return appreciations[idx];
}

// ===== QUESTIONS OUVERTES PAR FORMATION =====

interface QuestionsOuvertesFormation {
  debut: QuestionOuverte[];
  fin: QuestionOuverte[];
}

const QUESTIONS_OUVERTES: Record<string, QuestionsOuvertesFormation> = {
  "Excel Professionnel": {
    debut: [
      { question: "À quoi sert le logiciel Microsoft Excel ?", reponseAttendue: "Microsoft Excel est un tableur qui permet de créer des tableaux, effectuer des calculs, analyser des données, créer des graphiques et gérer des bases de données." },
      { question: "Quel onglet contient les outils de mise en forme des cellules (police, taille, couleur) ?", reponseAttendue: "L'onglet Accueil du ruban contient les outils de mise en forme des cellules." },
      { question: "Comment enregistre-t-on un classeur sous un autre nom ?", reponseAttendue: "Il faut cliquer sur Fichier puis Enregistrer sous, choisir l'emplacement et saisir un nouveau nom de fichier." },
      { question: "Citez trois éléments de l'interface d'Excel.", reponseAttendue: "Le ruban, la barre de formule, les onglets de feuilles, la zone de nom, la grille de cellules." },
      { question: "Comment insérer un graphique dans une feuille Excel ?", reponseAttendue: "Il faut sélectionner les données, aller dans l'onglet Insertion, puis choisir le type de graphique souhaité." },
      { question: "Quel est le raccourci clavier pour copier une cellule ?", reponseAttendue: "Ctrl + C pour copier et Ctrl + V pour coller." },
      { question: "À quoi sert la barre de formule en haut de la feuille ?", reponseAttendue: "La barre de formule affiche et permet de modifier le contenu de la cellule active (texte, nombre ou formule)." },
      { question: "Comment faire la somme d'une colonne de chiffres dans Excel ?", reponseAttendue: "On utilise la fonction =SOMME(plage) ou le bouton Somme automatique dans l'onglet Accueil." },
      { question: "Qu'est-ce qu'une référence de cellule dans Excel ?", reponseAttendue: "Une référence de cellule est l'identifiant d'une cellule composé de la lettre de colonne et du numéro de ligne (ex : A1, B3)." },
      { question: "Que faut-il vérifier avant d'imprimer une feuille Excel ?", reponseAttendue: "Il faut vérifier la zone d'impression, les marges, l'orientation de la page, l'aperçu avant impression et les sauts de page." },
    ],
    fin: [
      { question: "Comment enregistrer une copie d'un classeur sous un autre format (PDF par exemple) ?", reponseAttendue: "Il faut cliquer sur Fichier, puis Enregistrer sous, et choisir le format PDF dans le menu déroulant du type de fichier." },
      { question: "Quelle est la syntaxe de la fonction RECHERCHEV ?", reponseAttendue: "=RECHERCHEV(valeur_cherchée; tableau; numéro_colonne; FAUX) – FAUX pour une correspondance exacte." },
      { question: "Expliquez comment créer un tableau croisé dynamique.", reponseAttendue: "Sélectionner les données, aller dans Insertion > Tableau croisé dynamique, choisir l'emplacement, puis glisser les champs dans les zones Lignes, Colonnes, Valeurs et Filtres." },
      { question: "Quelles sont les étapes pour appliquer une mise en forme conditionnelle ?", reponseAttendue: "Sélectionner les cellules, aller dans Accueil > Mise en forme conditionnelle, choisir le type de règle et définir les conditions et formats." },
      { question: "À quoi sert la fonction SI dans Excel ? Donnez un exemple.", reponseAttendue: "La fonction SI permet de tester une condition et retourner une valeur si VRAI, une autre si FAUX. Exemple : =SI(A1>10;\"OK\";\"NON\")." },
      { question: "Citez deux façons de figer des cellules dans une formule.", reponseAttendue: "1. Utiliser le signe $ devant la référence (ex : $A$1 pour référence absolue). 2. Appuyer sur F4 pour basculer entre les types de références." },
      { question: "Quelle est la différence entre une référence relative et absolue ?", reponseAttendue: "Une référence relative (A1) s'adapte quand on copie la formule. Une référence absolue ($A$1) reste fixe quel que soit l'endroit où on copie la formule." },
      { question: "Expliquez la fonction du volet de filtre dans un TCD.", reponseAttendue: "Le volet de filtre permet de filtrer les données du tableau croisé dynamique pour n'afficher qu'une partie des données selon un critère choisi." },
      { question: "Comment protéger une feuille Excel contre les modifications ?", reponseAttendue: "Aller dans Révision > Protéger la feuille, définir un mot de passe optionnel et cocher les actions autorisées." },
      { question: "Qu'avez-vous appris pendant cette formation ?", reponseAttendue: "J'ai appris à utiliser les formules avancées (RECHERCHEV, SI imbriqués), créer des TCD, faire de la mise en forme conditionnelle et automatiser des tâches." },
    ],
  },
  "Anglais Professionnel": {
    debut: [
      { question: "How do you introduce yourself in a professional context?", reponseAttendue: "Good morning, my name is [Name], I am [position] at [company]. I am responsible for [tasks]." },
      { question: "What is the difference between 'formal' and 'informal' English?", reponseAttendue: "Formal English uses polite expressions, complete sentences and professional vocabulary. Informal English uses contractions, slang and casual tone." },
      { question: "How do you write a professional email greeting?", reponseAttendue: "Dear Mr/Mrs [Name], or Dear Sir/Madam for unknown recipients." },
      { question: "What does the acronym 'ASAP' mean?", reponseAttendue: "As Soon As Possible – used to indicate urgency in professional communication." },
      { question: "Translate into English: 'Je voudrais planifier une réunion la semaine prochaine.'", reponseAttendue: "I would like to schedule a meeting next week." },
      { question: "What is the past tense of 'to write', 'to meet' and 'to send'?", reponseAttendue: "Wrote, met, sent." },
      { question: "How do you politely ask for information in English?", reponseAttendue: "Could you please provide me with... / Would you be so kind as to... / I would appreciate if you could..." },
      { question: "What is a 'deadline' in a business context?", reponseAttendue: "A deadline is the latest date or time by which something must be completed." },
      { question: "Complete: 'I have been working here ___ 5 years.' (since/for)", reponseAttendue: "For – 'for' is used with a duration (5 years), 'since' is used with a specific point in time." },
      { question: "What skills do you want to improve during this training?", reponseAttendue: "Open question – expected answer about oral communication, writing, vocabulary, grammar, TOEIC preparation, etc." },
    ],
    fin: [
      { question: "Write a professional email to reschedule a meeting.", reponseAttendue: "Subject: Meeting Rescheduling – Dear [Name], I am writing to inform you that I need to reschedule our meeting... Could we meet on [date] instead? Kind regards." },
      { question: "What is the difference between 'affect' and 'effect'?", reponseAttendue: "Affect is a verb (to affect = influencer), effect is a noun (the effect = l'effet). Example: The change will affect the team. The effect was positive." },
      { question: "How do you express disagreement politely in a professional meeting?", reponseAttendue: "I see your point, however... / I respectfully disagree because... / That's an interesting perspective, but I think..." },
      { question: "Explain what 'ROI' means and give an example.", reponseAttendue: "Return On Investment – it measures the profitability of an investment. Example: If you invest €1000 and earn €1500, the ROI is 50%." },
      { question: "What are the key elements of a professional presentation introduction?", reponseAttendue: "Greeting, self-introduction, topic announcement, agenda overview, expected duration, invitation for questions." },
      { question: "Translate: 'Nous devons atteindre un accord avant la fin du trimestre.'", reponseAttendue: "We need to reach an agreement before the end of the quarter." },
      { question: "What is the structure of a formal business letter?", reponseAttendue: "Sender's address, date, recipient's address, subject line, salutation, body paragraphs, closing (Yours faithfully/sincerely), signature." },
      { question: "Explain the difference between 'must', 'should' and 'could' in professional requests.", reponseAttendue: "Must = obligation, should = recommendation/advice, could = polite possibility/suggestion." },
      { question: "How do you close a negotiation in English? Give two useful phrases.", reponseAttendue: "1. 'Let's agree on these terms.' 2. 'I think we've reached a fair compromise.' Also: 'Shall we finalize the contract?'" },
      { question: "What have you learned during this training?", reponseAttendue: "Open question – expected answer about improved professional communication, email writing, negotiation skills, TOEIC preparation, etc." },
    ],
  },
  "Informatique": {
    debut: [
      { question: "Qu'est-ce qu'un système d'exploitation ? Citez-en deux.", reponseAttendue: "Un système d'exploitation est un logiciel qui gère le matériel informatique et permet d'exécuter des applications. Exemples : Windows Server, Linux (Ubuntu, CentOS)." },
      { question: "Quelle est la différence entre un serveur et un poste client ?", reponseAttendue: "Un serveur fournit des services (fichiers, applications, web) à d'autres machines. Un poste client est une machine utilisateur qui consomme ces services." },
      { question: "Que signifie l'acronyme TCP/IP ?", reponseAttendue: "Transmission Control Protocol / Internet Protocol – c'est l'ensemble des protocoles de communication utilisés sur Internet et les réseaux locaux." },
      { question: "Qu'est-ce qu'une adresse IP ? Donnez un exemple.", reponseAttendue: "Une adresse IP est un identifiant numérique attribué à chaque appareil connecté à un réseau. Exemple : 192.168.1.1 (IPv4) ou 2001:db8::1 (IPv6)." },
      { question: "À quoi sert le service DNS ?", reponseAttendue: "Le DNS (Domain Name System) traduit les noms de domaine (ex : google.com) en adresses IP pour que les machines puissent communiquer entre elles." },
      { question: "Qu'est-ce qu'un pare-feu (firewall) ?", reponseAttendue: "Un pare-feu est un dispositif de sécurité qui filtre le trafic réseau entrant et sortant selon des règles définies pour protéger le réseau contre les accès non autorisés." },
      { question: "Quelle commande permet de tester la connectivité réseau vers une machine distante ?", reponseAttendue: "La commande ping permet de tester la connectivité en envoyant des paquets ICMP à une machine distante et en mesurant le temps de réponse." },
      { question: "Qu'est-ce que la virtualisation ?", reponseAttendue: "La virtualisation permet de créer des versions virtuelles de ressources informatiques (serveurs, stockage, réseaux) sur un même matériel physique grâce à un hyperviseur." },
      { question: "Citez trois services réseau courants.", reponseAttendue: "DHCP (attribution automatique d'adresses IP), DNS (résolution de noms), HTTP/HTTPS (web), FTP (transfert de fichiers), SMTP (email)." },
      { question: "Quelles sont vos attentes pour cette formation en administration systèmes et réseaux ?", reponseAttendue: "Réponse ouverte : maîtriser l'administration Windows/Linux, comprendre les réseaux, apprendre la cybersécurité, etc." },
    ],
    fin: [
      { question: "Décrivez les étapes pour configurer un serveur DHCP sous Windows Server.", reponseAttendue: "1. Installer le rôle DHCP via le Gestionnaire de serveur. 2. Créer une étendue (plage d'adresses). 3. Configurer les options (passerelle, DNS). 4. Activer l'étendue. 5. Autoriser le serveur dans Active Directory." },
      { question: "Quelle est la différence entre les permissions NTFS et les permissions de partage ?", reponseAttendue: "Les permissions NTFS s'appliquent localement et à distance, sont plus granulaires. Les permissions de partage ne s'appliquent qu'aux accès réseau. En cas de conflit, la permission la plus restrictive s'applique." },
      { question: "Comment configurer une règle de pare-feu sous Linux avec iptables ?", reponseAttendue: "Exemple : iptables -A INPUT -p tcp --dport 80 -j ACCEPT (autorise le trafic HTTP entrant). -A ajoute une règle, -p spécifie le protocole, --dport le port, -j l'action." },
      { question: "Expliquez le concept de sous-réseau (subnetting) et son utilité.", reponseAttendue: "Le subnetting divise un réseau en sous-réseaux plus petits pour optimiser l'utilisation des adresses IP, améliorer la sécurité et réduire le trafic broadcast. On utilise un masque de sous-réseau (ex : /24 = 255.255.255.0)." },
      { question: "Qu'est-ce qu'un VPN et quels sont ses avantages ?", reponseAttendue: "Un VPN (Virtual Private Network) crée un tunnel chiffré entre deux points à travers Internet. Avantages : sécurité des données, accès distant au réseau d'entreprise, confidentialité des communications." },
      { question: "Décrivez la procédure pour créer un utilisateur et l'ajouter à un groupe sous Linux.", reponseAttendue: "1. useradd -m nom_utilisateur (créer le compte). 2. passwd nom_utilisateur (définir le mot de passe). 3. usermod -aG nom_groupe nom_utilisateur (ajouter au groupe)." },
      { question: "Quels sont les avantages de la virtualisation avec VMware ou Hyper-V ?", reponseAttendue: "Consolidation des serveurs, réduction des coûts matériels, flexibilité de déploiement, snapshots pour la sauvegarde, haute disponibilité, migration à chaud des VMs." },
      { question: "Expliquez la différence entre RAID 1 et RAID 5.", reponseAttendue: "RAID 1 : miroir (copie exacte sur 2 disques, tolérance à la panne d'1 disque, capacité = 50%). RAID 5 : striping avec parité (minimum 3 disques, tolérance à la panne d'1 disque, meilleure utilisation de l'espace)." },
      { question: "Comment sécuriser un serveur Linux après installation ?", reponseAttendue: "Mettre à jour les paquets, désactiver les services inutiles, configurer le firewall (iptables/ufw), changer le port SSH, désactiver le login root SSH, installer fail2ban, configurer les logs." },
      { question: "Qu'avez-vous appris pendant cette formation ?", reponseAttendue: "J'ai appris à administrer Windows Server et Linux, configurer les services réseau (DNS, DHCP), sécuriser les systèmes, et mettre en place des environnements virtualisés." },
    ],
  },
  "Management": {
    debut: [
      { question: "Comment définiriez-vous le management ?", reponseAttendue: "Le management est l'art de diriger, organiser, planifier et contrôler les ressources (humaines, matérielles, financières) pour atteindre les objectifs de l'organisation." },
      { question: "Quels sont les différents styles de management que vous connaissez ?", reponseAttendue: "Directif (autoritaire), participatif (collaboratif), délégatif (responsabilisant), persuasif (explicatif). Le management situationnel adapte le style au contexte." },
      { question: "Qu'est-ce que le leadership selon vous ?", reponseAttendue: "Le leadership est la capacité à influencer, motiver et guider un groupe de personnes vers un objectif commun. Il se distingue du management par l'aspect inspiration et vision." },
      { question: "Comment gérez-vous habituellement un conflit au sein d'une équipe ?", reponseAttendue: "Écouter les parties, identifier les causes du conflit, chercher un terrain d'entente, proposer des solutions, faire un suivi. Approche constructive et neutre." },
      { question: "Qu'est-ce qu'un feedback constructif ?", reponseAttendue: "Un feedback constructif est un retour factuel, bienveillant et orienté vers l'amélioration. Il décrit les faits, leur impact, et propose des pistes d'évolution." },
      { question: "Comment motivez-vous vos collaborateurs ?", reponseAttendue: "Reconnaissance, responsabilisation, fixation d'objectifs clairs, communication, développement des compétences, écoute active, valorisation des réussites." },
      { question: "Quelle différence faites-vous entre urgence et importance dans la gestion des priorités ?", reponseAttendue: "L'urgence concerne le temps (deadline proche). L'importance concerne l'impact (contribution aux objectifs). La matrice d'Eisenhower aide à prioriser : important+urgent, important+non urgent, etc." },
      { question: "Qu'est-ce que la délégation et quels en sont les principes ?", reponseAttendue: "La délégation consiste à confier une tâche ou responsabilité à un collaborateur. Principes : choisir la bonne personne, définir les objectifs, donner les moyens, fixer les échéances, assurer le suivi." },
      { question: "Comment conduisez-vous un entretien individuel avec un collaborateur ?", reponseAttendue: "Préparation, accueil, bilan de la période, écoute, fixation des objectifs, identification des besoins, plan d'action, conclusion positive." },
      { question: "Quels sont vos objectifs pour cette formation management ?", reponseAttendue: "Réponse ouverte : améliorer son leadership, mieux gérer les conflits, développer la communication managériale, etc." },
    ],
    fin: [
      { question: "Décrivez les 4 styles de management situationnel de Hersey et Blanchard.", reponseAttendue: "S1 Directif : fort en direction, faible en soutien. S2 Persuasif : fort en direction et soutien. S3 Participatif : faible en direction, fort en soutien. S4 Délégatif : faible en direction et soutien. Le choix dépend de la maturité du collaborateur." },
      { question: "Comment préparer et conduire une réunion d'équipe efficace ?", reponseAttendue: "Définir l'ordre du jour, inviter les bonnes personnes, fixer la durée, animer les échanges, prendre des décisions, rédiger un compte-rendu avec plan d'action." },
      { question: "Expliquez la méthode DESC pour gérer un conflit.", reponseAttendue: "D = Décrire les faits objectivement. E = Exprimer ses émotions/ressentis. S = Spécifier les solutions souhaitées. C = Conclure sur les conséquences positives. Méthode de communication non violente." },
      { question: "Quels sont les leviers de motivation non financiers ?", reponseAttendue: "Reconnaissance, autonomie, sens du travail, développement des compétences, qualité de vie au travail, responsabilisation, esprit d'équipe, perspectives d'évolution." },
      { question: "Comment accompagner un collaborateur en difficulté ?", reponseAttendue: "Identifier les signes, organiser un entretien bienveillant, comprendre les causes, proposer un plan d'accompagnement personnalisé, fixer des objectifs intermédiaires, assurer un suivi régulier." },
      { question: "Décrivez le processus de conduite du changement.", reponseAttendue: "1. Diagnostic (pourquoi changer). 2. Communication de la vision. 3. Implication des acteurs clés. 4. Plan d'action et formation. 5. Accompagnement et suivi. 6. Ancrage dans la culture." },
      { question: "Comment donner un feedback négatif de manière constructive ?", reponseAttendue: "Choisir le bon moment, s'appuyer sur des faits précis, utiliser le 'je', expliquer l'impact, écouter la réponse, co-construire des solutions, terminer positivement." },
      { question: "Qu'est-ce que l'intelligence émotionnelle en management ?", reponseAttendue: "Capacité à reconnaître, comprendre et gérer ses propres émotions et celles des autres. Composantes : conscience de soi, maîtrise de soi, empathie, compétences sociales." },
      { question: "Comment évaluez-vous la performance d'un collaborateur ?", reponseAttendue: "Fixer des objectifs SMART en amont, utiliser des indicateurs mesurables, mener des entretiens réguliers, combiner résultats quantitatifs et qualitatifs, prendre en compte le contexte." },
      { question: "Qu'avez-vous appris pendant cette formation management ?", reponseAttendue: "J'ai appris le management situationnel, la gestion des conflits (DESC), les techniques de feedback, la conduite du changement et les leviers de motivation d'équipe." },
    ],
  },
  "Digital Marketing": {
    debut: [
      { question: "Qu'est-ce que le marketing digital ?", reponseAttendue: "Le marketing digital regroupe l'ensemble des techniques marketing utilisant les canaux numériques : site web, réseaux sociaux, email, SEO/SEA, publicité en ligne, content marketing." },
      { question: "Quelle est la différence entre SEO et SEA ?", reponseAttendue: "SEO (Search Engine Optimization) = référencement naturel (gratuit, long terme). SEA (Search Engine Advertising) = référencement payant (publicité, résultats immédiats via Google Ads)." },
      { question: "Citez trois réseaux sociaux utilisés en marketing professionnel.", reponseAttendue: "LinkedIn (B2B, recrutement), Instagram (visuel, B2C), Facebook (communauté, publicité ciblée). Aussi : Twitter/X, TikTok, YouTube." },
      { question: "Qu'est-ce qu'un KPI en marketing digital ?", reponseAttendue: "KPI (Key Performance Indicator) = indicateur clé de performance. Exemples : taux de conversion, taux de clics, coût par acquisition, taux d'engagement, ROI." },
      { question: "À quoi sert Google Analytics ?", reponseAttendue: "Google Analytics est un outil d'analyse web qui mesure le trafic d'un site, le comportement des visiteurs, les sources de trafic et les conversions." },
      { question: "Qu'est-ce qu'un persona en marketing ?", reponseAttendue: "Un persona est un profil fictif représentant un segment de clientèle cible, basé sur des données réelles (démographie, comportements, motivations, freins)." },
      { question: "Qu'est-ce que le content marketing ?", reponseAttendue: "Le content marketing est une stratégie consistant à créer et diffuser du contenu de valeur (articles, vidéos, infographies) pour attirer et fidéliser une audience cible." },
      { question: "Comment fonctionne la publicité sur les réseaux sociaux ?", reponseAttendue: "On définit un objectif (notoriété, trafic, conversions), une audience cible (critères démographiques, intérêts), un budget, et un format publicitaire. L'algorithme optimise la diffusion." },
      { question: "Qu'est-ce qu'un taux de conversion ?", reponseAttendue: "Le taux de conversion est le pourcentage de visiteurs qui réalisent l'action souhaitée (achat, inscription, téléchargement) par rapport au nombre total de visiteurs." },
      { question: "Quels sont vos objectifs pour cette formation en marketing digital ?", reponseAttendue: "Réponse ouverte : maîtriser le SEO, apprendre la publicité en ligne, créer une stratégie social media, etc." },
    ],
    fin: [
      { question: "Décrivez les étapes pour optimiser le SEO d'un site web.", reponseAttendue: "Audit technique (vitesse, mobile), recherche de mots-clés, optimisation on-page (titres, méta-descriptions, contenu), maillage interne, création de backlinks, suivi des positions." },
      { question: "Comment créer une campagne Google Ads efficace ?", reponseAttendue: "Définir l'objectif, rechercher les mots-clés, créer des groupes d'annonces, rédiger les annonces (titre, description, CTA), configurer le budget et les enchères, suivre les conversions." },
      { question: "Expliquez comment mesurer le ROI d'une campagne sur les réseaux sociaux.", reponseAttendue: "ROI = (Gains - Coûts) / Coûts × 100. Mesurer : engagement, portée, clics, conversions, chiffre d'affaires généré. Utiliser les pixels de suivi et UTM tags." },
      { question: "Qu'est-ce qu'un tunnel de conversion (funnel) et quelles sont ses étapes ?", reponseAttendue: "Awareness (prise de conscience) → Interest (intérêt) → Consideration (considération) → Conversion (achat) → Loyalty (fidélisation). Chaque étape nécessite un contenu adapté." },
      { question: "Comment construire une stratégie d'email marketing efficace ?", reponseAttendue: "Segmenter la base, personnaliser les messages, soigner l'objet, créer du contenu de valeur, inclure un CTA clair, tester (A/B), analyser les taux (ouverture, clic, désabonnement)." },
      { question: "Quels indicateurs suivre dans Google Analytics pour évaluer un site ?", reponseAttendue: "Sessions, utilisateurs uniques, taux de rebond, durée moyenne, pages/session, sources de trafic, taux de conversion, objectifs réalisés." },
      { question: "Comment créer un calendrier éditorial pour les réseaux sociaux ?", reponseAttendue: "Définir les objectifs, identifier les thématiques, choisir les formats, planifier la fréquence par plateforme, anticiper les temps forts, utiliser un outil de planification (Hootsuite, Buffer)." },
      { question: "Qu'est-ce que le remarketing et comment le mettre en place ?", reponseAttendue: "Le remarketing cible les utilisateurs ayant déjà visité votre site. Mise en place : installer le pixel (Google/Facebook), créer des audiences, concevoir des annonces personnalisées." },
      { question: "Comment analyser la concurrence en marketing digital ?", reponseAttendue: "Outils : SEMrush, Ahrefs, SimilarWeb. Analyser : mots-clés, backlinks, contenu, présence social media, publicité, positionnement, points forts/faibles." },
      { question: "Qu'avez-vous appris pendant cette formation en marketing digital ?", reponseAttendue: "J'ai appris à optimiser le SEO, créer des campagnes Google Ads et social media, analyser les données avec Google Analytics, et construire une stratégie de content marketing." },
    ],
  },
  "Bureautique": {
    debut: [
      { question: "À quoi sert le logiciel Microsoft Word ?", reponseAttendue: "Microsoft Word est un traitement de texte qui permet de créer, modifier et mettre en forme des documents professionnels (lettres, rapports, CV)." },
      { question: "Quel onglet contient les outils de mise en forme du texte (police, taille, couleur) ?", reponseAttendue: "L'onglet Accueil du ruban contient les outils de mise en forme du texte." },
      { question: "Comment enregistre-t-on un document sous un autre nom ?", reponseAttendue: "Il faut cliquer sur le menu Fichier, puis sélectionner Enregistrer sous et choisir un nouveau nom pour le document." },
      { question: "Citez trois éléments de l'interface de Word.", reponseAttendue: "Le ruban, les onglets, la barre de titre, la zone de texte, la barre d'état, la règle." },
      { question: "Comment insérer une image dans un document Word ?", reponseAttendue: "Il faut cliquer sur l'onglet Insertion, puis sur Images, choisir l'image depuis l'ordinateur et l'insérer dans le document." },
      { question: "Quel est le raccourci clavier pour coller du texte ?", reponseAttendue: "Ctrl + V permet de coller du texte préalablement copié (Ctrl + C) ou coupé (Ctrl + X)." },
      { question: "À quoi sert la barre d'état en bas de Word ?", reponseAttendue: "La barre d'état affiche des informations sur le document : numéro de page, nombre de mots, langue, mode d'affichage et zoom." },
      { question: "Comment insérer un tableau dans un document Word ?", reponseAttendue: "Il faut aller dans l'onglet Insertion, cliquer sur Tableau et choisir le nombre de lignes et colonnes souhaité." },
      { question: "Qu'est-ce qu'un paragraphe dans Word ?", reponseAttendue: "Un paragraphe est un bloc de texte délimité par un retour à la ligne (touche Entrée). Chaque paragraphe peut avoir sa propre mise en forme (alignement, espacement, retrait)." },
      { question: "Que faut-il vérifier avant d'imprimer un document Word ?", reponseAttendue: "Il faut vérifier la mise en page, les marges, l'aperçu avant impression, le nombre de pages, l'orientation et la taille du papier." },
    ],
    fin: [
      { question: "Comment enregistrer une copie d'un document sous un autre nom ?", reponseAttendue: "Il faut cliquer sur Fichier, puis Enregistrer sous, choisir l'emplacement et saisir un nouveau nom de fichier." },
      { question: "Où se trouvent les outils de mise en forme du texte (gras, italique, souligné, etc.) ?", reponseAttendue: "Les outils de mise en forme se trouvent dans l'onglet Accueil du ruban, dans le groupe Police." },
      { question: "Expliquez comment insérer une image dans un document Word.", reponseAttendue: "Il faut cliquer sur l'onglet Insertion, puis sur Images, choisir l'image depuis l'ordinateur et l'insérer dans le document. On peut ensuite la redimensionner et l'habiller avec du texte." },
      { question: "Quelles sont les étapes pour modifier les marges d'un document ?", reponseAttendue: "Il faut aller dans l'onglet Disposition (ou Mise en page), cliquer sur Marges et choisir le type de marges souhaité ou personnaliser les valeurs." },
      { question: "À quoi sert le menu 'Insertion' dans Word ? Donnez deux exemples.", reponseAttendue: "Le menu Insertion permet d'ajouter des éléments au document. Exemples : images, tableaux, en-têtes/pieds de page, liens hypertexte, formes, graphiques." },
      { question: "Citez deux façons de sélectionner un paragraphe dans Word.", reponseAttendue: "1. Cliquer trois fois dans le paragraphe. 2. Cliquer au début du paragraphe et faire glisser la souris jusqu'à la fin." },
      { question: "Quelle est la différence entre l'enregistrement local et l'enregistrement sur OneDrive ?", reponseAttendue: "L'enregistrement local sauvegarde le document sur l'ordinateur. OneDrive permet de sauvegarder le document en ligne (cloud) pour y accéder depuis n'importe quel appareil." },
      { question: "Expliquez la fonction du volet de navigation.", reponseAttendue: "Le volet de navigation permet de se déplacer rapidement dans le document à l'aide des titres (styles Titre 1, 2, 3) et de rechercher du texte." },
      { question: "Comment ajuster l'espacement entre les lignes d'un paragraphe ?", reponseAttendue: "Il faut sélectionner le paragraphe, puis utiliser l'outil Interligne dans l'onglet Accueil ou aller dans Paragraphe > Espacement." },
      { question: "Qu'avez-vous appris pendant cette formation ?", reponseAttendue: "J'ai appris à créer des documents Word, à les mettre en forme, à insérer des images et des tableaux, et à préparer un document pour l'impression." },
    ],
  },
  "CAP Esthétique": {
    debut: [
      { question: "Quels sont les différents types de peau ?", reponseAttendue: "Peau normale, peau sèche, peau grasse, peau mixte, peau sensible. Chaque type nécessite des soins adaptés." },
      { question: "Qu'est-ce que l'épiderme ?", reponseAttendue: "L'épiderme est la couche la plus superficielle de la peau. Il assure une fonction de protection et se renouvelle en environ 28 jours." },
      { question: "Citez trois soins esthétiques du visage.", reponseAttendue: "Nettoyage de peau, soin hydratant, gommage, masque, modelage du visage, soin anti-âge." },
      { question: "Qu'est-ce qu'un cosmétique ?", reponseAttendue: "Un cosmétique est un produit destiné à être mis en contact avec les parties superficielles du corps humain pour les nettoyer, parfumer, protéger, maintenir en bon état ou modifier l'aspect." },
      { question: "Quelles sont les règles d'hygiène essentielles en institut de beauté ?", reponseAttendue: "Lavage des mains, port de gants si nécessaire, désinfection du matériel, stérilisation des instruments, utilisation de linge propre, propreté de l'espace de travail." },
      { question: "Qu'est-ce que la manucure ?", reponseAttendue: "La manucure est un soin des mains et des ongles comprenant le limage, le repoussement des cuticules, l'application de vernis et le soin de la peau des mains." },
      { question: "Quelles sont les différentes techniques d'épilation ?", reponseAttendue: "Épilation à la cire (chaude, tiède, froide), à la pince, au fil, au laser, à la lumière pulsée, à la crème dépilatoire." },
      { question: "Comment accueillir un(e) client(e) en institut ?", reponseAttendue: "Sourire, salutation, prise en charge rapide, installation confortable, diagnostic de peau, explication du soin, mise en confiance." },
      { question: "Qu'est-ce que le conseil en vente de produits cosmétiques ?", reponseAttendue: "C'est la capacité à identifier les besoins du client et à recommander les produits adaptés à son type de peau, ses attentes et son budget." },
      { question: "Quels sont vos objectifs pour cette formation en esthétique ?", reponseAttendue: "Réponse ouverte : obtenir le CAP, maîtriser les techniques de soins, se préparer à travailler en institut, etc." },
    ],
    fin: [
      { question: "Décrivez le protocole complet d'un soin du visage.", reponseAttendue: "1. Accueil et diagnostic. 2. Démaquillage. 3. Gommage. 4. Extraction des comédons. 5. Modelage. 6. Masque adapté au type de peau. 7. Application du soin de jour/nuit. 8. Conseil produits." },
      { question: "Quelles sont les couches de la peau et leurs fonctions ?", reponseAttendue: "Épiderme (protection, barrière), derme (soutien, élasticité, vascularisation), hypoderme (réserve énergétique, amortisseur, isolation thermique)." },
      { question: "Expliquez les précautions à prendre avant une épilation à la cire chaude.", reponseAttendue: "Vérifier la température de la cire, s'assurer de l'absence de contre-indications (varices, peau irritée, coup de soleil), tester sur une petite zone, respecter le sens du poil." },
      { question: "Comment réaliser un maquillage professionnel de jour ?", reponseAttendue: "Base de teint, fond de teint adapté, poudre, blush naturel, ombres à paupières neutres, mascara, gloss ou rouge à lèvres discret. Résultat naturel et lumineux." },
      { question: "Quels sont les principaux ingrédients actifs en cosmétologie ?", reponseAttendue: "Acide hyaluronique (hydratation), rétinol (anti-âge), vitamine C (éclat), niacinamide (pores), AHA/BHA (exfoliation), céramides (barrière cutanée)." },
      { question: "Décrivez la technique de la manucure complète.", reponseAttendue: "Retrait du vernis, limage, bain adoucissant, repoussement des cuticules, gommage, massage des mains, base, vernis (2 couches), top coat." },
      { question: "Comment gérer une réaction allergique chez un(e) client(e) ?", reponseAttendue: "Retirer immédiatement le produit, rincer abondamment, appliquer un soin apaisant, noter l'incident, orienter vers un médecin si nécessaire, signaler dans le dossier client." },
      { question: "Expliquez les techniques de vente en institut de beauté.", reponseAttendue: "Écoute active, diagnostic personnalisé, présentation des bénéfices produits, démonstration sur la main, proposition de vente complémentaire, suivi client." },
      { question: "Quelles sont les normes d'hygiène et de sécurité en institut ?", reponseAttendue: "Stérilisation du matériel, désinfection des surfaces, utilisation de consommables à usage unique, respect de la chaîne du froid pour les produits, affichage des compositions." },
      { question: "Qu'avez-vous appris pendant cette formation en esthétique ?", reponseAttendue: "J'ai appris les techniques de soins du visage, l'épilation, la manucure, le maquillage professionnel, la vente conseil et les normes d'hygiène en institut." },
    ],
  },
  "FLE Médico-Social": {
    debut: [
      { question: "Comment vous présentez-vous en arrivant au travail ?", reponseAttendue: "Bonjour, je suis [Prénom Nom], je suis [fonction : aide-soignant(e), AES, etc.] dans le service [nom du service]." },
      { question: "Quels mots utilisez-vous pour accueillir un résident ?", reponseAttendue: "Bonjour Madame/Monsieur, bienvenue, comment allez-vous, installez-vous, je suis là pour vous aider." },
      { question: "Que signifie le sigle EHPAD ?", reponseAttendue: "Établissement d'Hébergement pour Personnes Âgées Dépendantes." },
      { question: "Comment demander poliment à quelqu'un de s'asseoir ?", reponseAttendue: "Vous pouvez vous asseoir, s'il vous plaît. / Je vous en prie, asseyez-vous." },
      { question: "Citez trois professionnels du secteur médico-social.", reponseAttendue: "Aide-soignant(e), infirmier(ère), éducateur(trice) spécialisé(e), psychologue, médecin, ergothérapeute." },
      { question: "Qu'est-ce qu'une transmission dans le secteur médico-social ?", reponseAttendue: "Une transmission est une note écrite qui décrit ce qui s'est passé avec un résident/usager pour informer les autres membres de l'équipe." },
      { question: "Comment conjuguez-vous le verbe 'accompagner' au présent ?", reponseAttendue: "J'accompagne, tu accompagnes, il/elle accompagne, nous accompagnons, vous accompagnez, ils/elles accompagnent." },
      { question: "Que faites-vous si un résident tombe ?", reponseAttendue: "Je sécurise la personne, je ne la relève pas seul(e), j'appelle l'infirmière, je note l'heure et les circonstances." },
      { question: "Quel est le rôle d'un AES ?", reponseAttendue: "L'Accompagnant Éducatif et Social accompagne les personnes en situation de handicap ou de dépendance dans les actes de la vie quotidienne." },
      { question: "Quels sont vos objectifs pour cette formation de français ?", reponseAttendue: "Réponse ouverte : mieux communiquer au travail, écrire des transmissions, comprendre les protocoles, participer aux réunions." },
    ],
    fin: [
      { question: "Rédigez une transmission pour un résident qui a refusé son repas.", reponseAttendue: "[Date] – [Heure] – Le résident [Nom] a refusé le déjeuner. Le résident a dit ne pas avoir faim. A bu un verre d'eau. L'infirmière a été informée. Signé : [Nom, Fonction]." },
      { question: "Comment reformuler pour vérifier que vous avez bien compris ?", reponseAttendue: "Si je comprends bien, vous dites que… / Vous voulez dire que… / Est-ce que c'est bien cela ?" },
      { question: "Expliquez ce qu'est le secret professionnel.", reponseAttendue: "Le secret professionnel interdit de révéler des informations sur les usagers en dehors du cadre professionnel. On partage uniquement avec les collègues concernés (secret partagé)." },
      { question: "Que contient un livret d'accueil ?", reponseAttendue: "Le livret d'accueil présente la structure, ses services, les horaires, les droits des usagers, le règlement, les contacts, la charte des droits et libertés." },
      { question: "Comment participez-vous à une réunion d'équipe ?", reponseAttendue: "J'écoute, je prends des notes, je donne mon avis quand on me le demande, je rapporte mes observations de manière factuelle, je respecte le temps de parole des autres." },
      { question: "Qu'est-ce qu'un projet personnalisé (PIA) ?", reponseAttendue: "Le PIA est un document qui décrit les besoins, les objectifs et les moyens d'accompagnement d'un usager. Il est revu régulièrement avec l'usager et sa famille." },
      { question: "Comment annoncer une mauvaise nouvelle à une famille ?", reponseAttendue: "Avec tact et empathie : 'Je vous appelle pour vous informer que... Le médecin l'a examiné(e)... Tout est sous contrôle...' Être factuel et rassurant." },
      { question: "Conjuguez 'prendre' et 'écrire' au passé composé.", reponseAttendue: "J'ai pris, tu as pris, il/elle a pris, nous avons pris. J'ai écrit, tu as écrit, il/elle a écrit, nous avons écrit." },
      { question: "Expliquez la différence entre un EHPAD et un FAM.", reponseAttendue: "EHPAD : accueille des personnes âgées dépendantes. FAM (Foyer d'Accueil Médicalisé) : accueille des adultes en situation de handicap nécessitant un suivi médical." },
      { question: "Qu'avez-vous appris pendant cette formation ?", reponseAttendue: "J'ai appris à rédiger des transmissions, à utiliser le vocabulaire médico-social, à participer aux réunions d'équipe, à communiquer avec les familles en respectant le secret professionnel." },
    ],
  },
  "IA Générative": {
    debut: [
      { question: "Qu'est-ce que l'intelligence artificielle générative selon vous ?", reponseAttendue: "L'IA générative est un type d'intelligence artificielle capable de créer du contenu nouveau (texte, images, vidéos) à partir d'instructions données par l'utilisateur." },
      { question: "Connaissez-vous des outils d'IA générative ? Lesquels ?", reponseAttendue: "ChatGPT (OpenAI), Midjourney, DALL-E, Claude (Anthropic), Gemini (Google), Canva IA, Adobe Firefly, Stable Diffusion." },
      { question: "Qu'est-ce qu'un prompt ?", reponseAttendue: "Un prompt est l'instruction ou la consigne que l'on donne à un outil d'IA pour lui indiquer ce que l'on souhaite obtenir comme résultat." },
      { question: "Quels types de contenus peut-on créer avec l'IA générative ?", reponseAttendue: "Des textes (articles, posts, emails), des images (illustrations, photos, logos), des vidéos, du code, des présentations, des traductions." },
      { question: "Que signifie RGPD ?", reponseAttendue: "Règlement Général sur la Protection des Données – cadre européen qui protège les données personnelles des citoyens." },
      { question: "Quels risques identifiez-vous dans l'utilisation de l'IA pour la création de contenus ?", reponseAttendue: "Hallucinations (faits inventés), plagiat, violation du droit d'auteur, fuite de données confidentielles, contenus biaisés, manque d'originalité." },
      { question: "Avez-vous déjà utilisé un outil d'IA pour créer du contenu ? Décrivez votre expérience.", reponseAttendue: "Réponse ouverte décrivant l'expérience personnelle avec des outils d'IA." },
      { question: "Quelle est la différence entre un contenu généré par IA et un contenu créé par un humain ?", reponseAttendue: "Le contenu IA est statistiquement probable mais peut manquer de nuance, d'originalité et d'expertise. Le contenu humain apporte l'expérience, la créativité et la vérification." },
      { question: "Qu'est-ce qu'une charte graphique ?", reponseAttendue: "Une charte graphique est un document qui définit les règles visuelles d'une marque : couleurs, polices, logo, style d'images, pour assurer la cohérence visuelle." },
      { question: "Quels sont vos objectifs pour cette formation ?", reponseAttendue: "Réponse ouverte : maîtriser les outils IA, créer des contenus professionnels, comprendre le cadre juridique, etc." },
    ],
    fin: [
      { question: "Décrivez les 5 composantes d'un bon prompt.", reponseAttendue: "1. Rôle (qui est l'IA), 2. Contexte (cadre), 3. Tâche (ce qu'elle doit faire), 4. Contraintes (règles), 5. Format (format de sortie)." },
      { question: "Qu'est-ce que le few-shot prompting ? Donnez un exemple.", reponseAttendue: "Le few-shot prompting consiste à donner des exemples du résultat attendu dans le prompt. Ex : 'Voici 2 exemples d'accroches... Maintenant crée 5 accroches similaires pour...'." },
      { question: "Quelles sont les obligations légales pour les contenus générés par IA ?", reponseAttendue: "AI Act : transparence obligatoire, mentionner l'IA pour les contenus publicitaires, interdiction des deepfakes sans consentement, respect du RGPD pour les données personnelles." },
      { question: "Comment maintenir la cohérence visuelle quand on utilise l'IA ?", reponseAttendue: "Créer un prompt template avec les constantes visuelles, utiliser les mêmes paramètres de style, garder une bibliothèque de référence, utiliser Style Reference dans Midjourney." },
      { question: "Quel workflow recommandez-vous pour rédiger un article avec l'IA ?", reponseAttendue: "Brief → Plan (H2/H3) → Rédaction section par section → Enrichissement personnel → Vérification des faits → Optimisation SEO → Relecture finale." },
      { question: "Pourquoi ne faut-il jamais saisir de données personnelles dans un outil IA public ?", reponseAttendue: "Les données peuvent être stockées et réutilisées pour l'entraînement du modèle. Cela viole le RGPD et expose l'entreprise à des risques juridiques et de confidentialité." },
      { question: "Comparez DALL-E et Midjourney pour la génération d'images.", reponseAttendue: "DALL-E : intégré à ChatGPT, bon pour le texte dans les images, libre de droits. Midjourney : qualité artistique supérieure, fonctionne via Discord, plus de paramètres de style." },
      { question: "Comment vérifier qu'un contenu généré par IA ne contient pas d'hallucinations ?", reponseAttendue: "Croiser avec au moins 2 sources fiables, vérifier les chiffres et dates, confirmer l'existence des sources citées, utiliser des outils de fact-checking." },
      { question: "Rédigez une mention appropriée pour un contenu créé avec l'aide de l'IA.", reponseAttendue: "'Contenu rédigé avec l'assistance de l'intelligence artificielle et vérifié par [Nom, Fonction]' ou 'Visuel généré par IA – illustration non contractuelle'." },
      { question: "Qu'avez-vous appris pendant cette formation ?", reponseAttendue: "J'ai appris le prompt engineering, la création de contenus texte et visuels avec l'IA, le cadre juridique (RGPD, droit d'auteur, AI Act), et l'importance de la vérification humaine." },
    ],
  },
};

const DEFAULT_QUESTIONS_OUVERTES: QuestionsOuvertesFormation = {
  debut: [
    { question: "Que savez-vous déjà sur le sujet de cette formation ?", reponseAttendue: "Le stagiaire exprime ses connaissances préalables sur le domaine de la formation." },
    { question: "Quels outils ou logiciels avez-vous déjà utilisés dans ce domaine ?", reponseAttendue: "Liste des outils et logiciels que le stagiaire connaît ou a déjà pratiqués." },
    { question: "Décrivez votre expérience professionnelle en lien avec cette formation.", reponseAttendue: "Description de l'expérience professionnelle passée en rapport avec le contenu de la formation." },
    { question: "Quels sont vos objectifs principaux pour cette formation ?", reponseAttendue: "Objectifs personnels et professionnels clairement formulés." },
    { question: "Avez-vous déjà suivi une formation similaire ? Si oui, laquelle ?", reponseAttendue: "Historique des formations antérieures dans le même domaine." },
    { question: "Quel est votre niveau de connaissances actuel dans ce domaine ? (Débutant / Intermédiaire / Avancé)", reponseAttendue: "Auto-évaluation du niveau avec justification." },
    { question: "Dans quel contexte professionnel souhaitez-vous appliquer les compétences acquises ?", reponseAttendue: "Description du contexte professionnel et des cas d'utilisation prévus." },
    { question: "Quelles difficultés avez-vous déjà rencontrées dans ce domaine ?", reponseAttendue: "Identification des points de blocage et difficultés passées." },
    { question: "Comment définiriez-vous les termes clés liés à cette formation ?", reponseAttendue: "Définitions des concepts fondamentaux du domaine de la formation." },
    { question: "Qu'attendez-vous concrètement de cette formation ?", reponseAttendue: "Attentes claires et mesurables en termes de compétences à acquérir." },
  ],
  fin: [
    { question: "Quelles compétences clés avez-vous acquises durant cette formation ?", reponseAttendue: "Énumération des compétences principales développées au cours de la formation." },
    { question: "Décrivez la méthode ou l'outil le plus utile que vous avez découvert.", reponseAttendue: "Description détaillée d'un outil ou méthode clé avec son utilité pratique." },
    { question: "Comment allez-vous appliquer ces acquis dans votre activité professionnelle ?", reponseAttendue: "Plan d'action concret pour la mise en œuvre des compétences acquises." },
    { question: "Quels sont les points que vous devez encore approfondir ?", reponseAttendue: "Identification honnête des lacunes restantes et plan d'amélioration." },
    { question: "Résumez en quelques phrases les concepts essentiels de la formation.", reponseAttendue: "Synthèse structurée des principaux concepts abordés." },
    { question: "Évaluez votre progression entre le début et la fin de cette formation.", reponseAttendue: "Auto-évaluation avec comparaison avant/après et éléments concrets de progression." },
    { question: "Quel exercice ou mise en pratique vous a le plus aidé ? Pourquoi ?", reponseAttendue: "Identification de l'exercice le plus formateur avec explication de son apport." },
    { question: "Recommanderiez-vous cette formation ? Justifiez.", reponseAttendue: "Recommandation argumentée avec points forts et éventuels axes d'amélioration." },
    { question: "Quelles ressources complémentaires comptez-vous utiliser pour continuer à progresser ?", reponseAttendue: "Identification de ressources (livres, sites, formations, pratique) pour poursuivre l'apprentissage." },
    { question: "Qu'avez-vous appris pendant cette formation ?", reponseAttendue: "Synthèse personnelle des apprentissages avec exemples concrets." },
  ],
};

export function getQuestionsOuvertes(formationIntitule: string): QuestionsOuvertesFormation {
  const key = getContentKey(formationIntitule);
  return QUESTIONS_OUVERTES[key] || DEFAULT_QUESTIONS_OUVERTES;
}

// ===== GENERATE STAGIAIRE OPEN-ENDED ANSWERS =====
// Uses cognitive profile to generate realistic text answers with varying quality

interface StagiaireOpenAnswer {
  reponse: string;
  score: number;       // 0, 0.5, or 1
  feedback: string;    // "Bonne réponse", "Réponse partielle", etc.
}

export function generateStagiaireOpenAnswers(
  questions: QuestionOuverte[],
  stagiaireIndex: number,
  isDebut: boolean,
  stagiaireInfo?: { nom?: string; prenom?: string; entreprise?: string; poste?: string }
): StagiaireOpenAnswer[] {
  const profile = getStagiaireTestProfile(stagiaireIndex);
  
  // First pass: generate raw answers
  const rawAnswers = questions.map((q, qi) => {
    const seed = (stagiaireIndex * 31 + qi * 17 + (isDebut ? 0 : 1000)) % 100;
    
    let quality: 'full' | 'partial' | 'wrong' | 'empty';
    
    if (isDebut) {
      if (profile.level === 'excellent') {
        quality = seed < 50 ? 'full' : seed < 85 ? 'partial' : 'wrong';
      } else if (profile.level === 'bon') {
        quality = seed < 35 ? 'full' : seed < 70 ? 'partial' : seed < 90 ? 'wrong' : 'empty';
      } else if (profile.level === 'moyen') {
        quality = seed < 20 ? 'full' : seed < 50 ? 'partial' : seed < 80 ? 'wrong' : 'empty';
      } else {
        quality = seed < 10 ? 'full' : seed < 30 ? 'partial' : seed < 70 ? 'wrong' : 'empty';
      }
    } else {
      if (profile.level === 'excellent') {
        quality = seed < 85 ? 'full' : 'partial';
      } else if (profile.level === 'bon') {
        quality = seed < 70 ? 'full' : seed < 95 ? 'partial' : 'wrong';
      } else if (profile.level === 'moyen') {
        quality = seed < 50 ? 'full' : seed < 85 ? 'partial' : 'wrong';
      } else {
        quality = seed < 35 ? 'full' : seed < 70 ? 'partial' : seed < 90 ? 'wrong' : 'empty';
      }
    }
    
    return { quality, seed, qi, question: q };
  });

  // Second pass: adjust to target score range
  // Calculate raw score
  const scoreOf = (q: 'full' | 'partial' | 'wrong' | 'empty') => q === 'full' ? 1 : q === 'partial' ? 0.5 : 0;
  let totalRaw = rawAnswers.reduce((s, a) => s + scoreOf(a.quality), 0);
  
  // Target: each stagiaire gets a unique score
  // Début: 5-7 range, Fin: 8-10 range (good scores after training)
  const targetScoresDebut = [5, 5.5, 6, 6.5, 7, 5.5, 6, 7, 6.5, 5];
  const targetScoresFin = [8, 8.5, 9, 9.5, 10, 8.5, 9, 10, 9.5, 8];
  const targetScores = isDebut ? targetScoresDebut : targetScoresFin;
  const target = targetScores[stagiaireIndex % targetScores.length];
  
  // Adjust answers to hit target score
  const adjustedQualities = rawAnswers.map(a => a.quality);
  let currentScore = totalRaw;
  
  // If too high, downgrade some answers
  while (currentScore > target + 0.25) {
    // Find a 'full' answer to downgrade to 'partial'
    const fullIdx = adjustedQualities.findIndex((q, i) => q === 'full' && (rawAnswers[i].seed + stagiaireIndex) % 3 !== 0);
    if (fullIdx >= 0) {
      adjustedQualities[fullIdx] = 'partial';
      currentScore -= 0.5;
      continue;
    }
    // Find a 'partial' to downgrade to 'wrong'
    const partialIdx = adjustedQualities.findIndex(q => q === 'partial');
    if (partialIdx >= 0) {
      adjustedQualities[partialIdx] = 'wrong';
      currentScore -= 0.5;
      continue;
    }
    break;
  }
  
  // If too low, upgrade some answers
  while (currentScore < target - 0.25) {
    // Find a 'wrong' or 'empty' to upgrade to 'partial'
    const wrongIdx = adjustedQualities.findIndex(q => q === 'wrong' || q === 'empty');
    if (wrongIdx >= 0) {
      adjustedQualities[wrongIdx] = 'partial';
      currentScore += 0.5;
      continue;
    }
    // Find a 'partial' to upgrade to 'full'
    const partialIdx = adjustedQualities.findIndex(q => q === 'partial');
    if (partialIdx >= 0) {
      adjustedQualities[partialIdx] = 'full';
      currentScore += 0.5;
      continue;
    }
    break;
  }

  // Generate final answers with adjusted qualities
  return rawAnswers.map((raw, i) => {
    const quality = adjustedQualities[i];
    const expected = raw.question.reponseAttendue;
    let reponse: string;
    let score: number;
    let feedback: string;
    
    switch (quality) {
      case 'full':
        reponse = generateFullAnswer(expected, stagiaireIndex, raw.qi, stagiaireInfo);
        score = 1;
        feedback = "Bonne réponse";
        break;
      case 'partial':
        reponse = generatePartialAnswer(expected, raw.seed, stagiaireIndex, raw.qi, stagiaireInfo);
        score = 0.5;
        const partialFeedbacks = ["Réponse partielle", "Réponse incomplète", "Réponse acceptable", "Réponse partiellement correcte"];
        feedback = partialFeedbacks[(raw.seed + stagiaireIndex) % partialFeedbacks.length];
        break;
      case 'wrong':
        reponse = generateWrongAnswer(expected, raw.seed, stagiaireIndex, raw.qi);
        score = 0;
        const wrongFeedbacks = ["Réponse insuffisante", "Réponse incorrecte", "Réponse hors sujet", "Réponse erronée"];
        feedback = wrongFeedbacks[(raw.seed + stagiaireIndex) % wrongFeedbacks.length];
        break;
      case 'empty':
      default:
        const emptyResponses = [
          "Je ne sais pas.",
          "Je ne sais pas exactement.", 
          "/",
          "Je n'ai pas assez de connaissances pour répondre.",
          "Aucune idée.",
          "Je ne me souviens plus.",
        ];
        reponse = emptyResponses[(raw.seed + stagiaireIndex * 3 + raw.qi * 7) % emptyResponses.length];
        score = 0;
        feedback = "Pas de réponse";
        break;
    }
    
    return { reponse, score, feedback };
  });
}

// Clean brackets from expected answers and replace with realistic values
function cleanBrackets(text: string, stagiaireNom?: string, stagiairePrenom?: string, entreprise?: string, poste?: string): string {
  const nom = stagiaireNom || 'Martin';
  const prenom = stagiairePrenom || 'Sophie';
  return text
    .replace(/\[Name\]/gi, `${prenom} ${nom}`)
    .replace(/\[Nom[^\]]*\]/gi, `${prenom} ${nom}`)
    .replace(/Mme Dupont/gi, `Mme ${nom}`)
    .replace(/M\. Dupont/gi, `M. ${nom}`)
    .replace(/\[company\]/gi, entreprise || 'mon entreprise')
    .replace(/\[position\]/gi, poste || 'mon poste actuel')
    .replace(/\[tasks?\]/gi, 'la gestion des projets et le suivi des équipes')
    .replace(/\[date\]/gi, 'le 15 du mois prochain')
    .replace(/\[X\]/gi, '3')
    .replace(/\[Area\]/gi, 'la gestion de projet')
    .replace(/\[Department\]/gi, 'le service commercial')
    .replace(/\[Responsibility\]/gi, 'la coordination des équipes')
    .replace(/\[Job Title\]/gi, poste || 'responsable de projet')
    .replace(/Le stagiaire doit /gi, 'J\'ai ')
    .replace(/Le stagiaire /gi, 'J\'ai ')
    .replace(/L['']apprenant doit /gi, 'J\'ai ')
    .replace(/doit créer/gi, 'ai créé')
    .replace(/doit utiliser/gi, 'ai utilisé')
    .replace(/doit rédiger/gi, 'ai rédigé')
    .replace(/doit appliquer/gi, 'ai appliqué')
    .replace(/doit identifier/gi, 'ai identifié')
    .replace(/doit réaliser/gi, 'ai réalisé')
    .replace(/\[.*?\]/g, '');
}

// Generate a "correct" answer that's unique per stagiaire (rephrased) — LONG and realistic
function generateFullAnswer(expected: string, stagiaireIndex: number, questionIndex: number, stagiaireInfo?: { nom?: string; prenom?: string; entreprise?: string; poste?: string }): string {
  const cleaned = cleanBrackets(expected, stagiaireInfo?.nom, stagiaireInfo?.prenom, stagiaireInfo?.entreprise, stagiaireInfo?.poste);
  const sentences = cleaned.split(/(?<=[.!])\s+/).filter(s => s.trim());
  const seed = (stagiaireIndex * 13 + questionIndex * 7) % 8;
  
  const expansions = [
    ' Cela permet d\'assurer un travail de qualité au quotidien.',
    ' C\'est essentiel pour être efficace en situation professionnelle.',
    ' C\'est directement applicable dans le cadre de mon travail.',
    ' C\'est un élément fondamental à connaître et à savoir appliquer.',
    '',
    '',
    '',
    '',
  ];
  
  const varied = sentences.map((s, i) => {
    const sv = (stagiaireIndex * 13 + questionIndex * 7 + i * 3) % 5;
    let result = s;
    if (sv === 1) result = result.replace('Il faut', 'On doit').replace('il faut', 'on doit');
    if (sv === 2) result = result.replace('permet de', 'sert à').replace('Il faut', 'Il est nécessaire de');
    if (sv === 3) result = result.replace('par exemple', 'notamment').replace('Exemple :', 'Par exemple :');
    if (sv === 4) result = result.replace('c\'est', 'il s\'agit de').replace('C\'est', 'Il s\'agit de');
    return result;
  });
  
  // Swap two sentences for variety
  if ((stagiaireIndex + questionIndex) % 3 === 0 && varied.length > 2) {
    const tmp = varied[1]; varied[1] = varied[2]; varied[2] = tmp;
  }
  
  return varied.join(' ') + expansions[seed];
}

function generatePartialAnswer(expected: string, seed: number, stagiaireIndex: number, questionIndex: number, stagiaireInfo?: { nom?: string; prenom?: string; entreprise?: string; poste?: string }): string {
  const cleaned = cleanBrackets(expected, stagiaireInfo?.nom, stagiaireInfo?.prenom, stagiaireInfo?.entreprise, stagiaireInfo?.poste);
  const sentences = cleaned.split(/(?<=[.!])\s+/).filter(s => s.trim());
  const variation = (stagiaireIndex * 11 + questionIndex * 3) % 3;
  
  let mainContent: string;
  if (sentences.length > 2) {
    if (variation === 0) mainContent = sentences[0];
    else if (variation === 1) mainContent = sentences[sentences.length - 1];
    else mainContent = sentences.slice(0, Math.ceil(sentences.length / 2)).join(' ');
  } else if (sentences.length === 2) {
    mainContent = sentences[variation % 2];
  } else {
    const words = cleaned.split(' ');
    const cuts = [0.4, 0.5, 0.6];
    const cutoff = Math.max(3, Math.floor(words.length * cuts[variation]));
    mainContent = words.slice(0, cutoff).join(' ');
  }
  
  return mainContent + '.';
}

function generateWrongAnswer(expected: string, seed: number, stagiaireIndex: number, questionIndex: number): string {
  const vaguePool = [
    "Il faut suivre un protocole spécifique mais les étapes exactes ne sont pas claires pour moi.",
    "Il y a plusieurs éléments à prendre en compte mais je ne saurais pas les détailler précisément.",
    "Il faut en parler à un responsable, c'est la première chose à faire.",
    "Il faut appliquer les règles qu'on a vues mais je ne me souviens plus de l'ordre exact.",
    "Le principe général est de respecter les consignes de sécurité et d'hygiène.",
    "Il faut documenter la situation et suivre le protocole en place.",
    "La procédure demande de vérifier plusieurs points avant d'agir.",
    "Il faut se référer aux fiches de procédure et appliquer les consignes.",
  ];
  return vaguePool[(seed + stagiaireIndex * 3 + questionIndex * 5) % vaguePool.length];
}

function getStagiaireTestProfile(stagiaireIndex: number): { level: 'excellent' | 'bon' | 'moyen' | 'debutant' } {
  const profiles: Array<'excellent' | 'bon' | 'moyen' | 'debutant'> = [
    'bon', 'excellent', 'moyen', 'bon', 'debutant',
    'excellent', 'bon', 'moyen', 'bon', 'moyen'
  ];
  return { level: profiles[stagiaireIndex % profiles.length] };
}
